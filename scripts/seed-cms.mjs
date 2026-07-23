#!/usr/bin/env node
/**
 * Seeds the CMS database with every piece of content that used to live in
 * src/i18n/dictionaries/{en,ar}.ts and src/data/*.ts. Imports those files
 * directly (via --experimental-strip-types) rather than re-transcribing
 * their content by hand, so the seeded DB is guaranteed byte-for-byte
 * faithful to the site's existing, hand-tuned bilingual copy.
 *
 * Idempotent-ish: uses upsert-by-slug for collections and update-by-key for
 * singleton/section rows, so re-running after a partial failure is safe.
 * Uses the service_role key (bypasses RLS) since this seeds `status:
 * 'published'` rows an anon key couldn't read back to verify.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { en } from "../src/i18n/dictionaries/en.ts";
import { ar } from "../src/i18n/dictionaries/ar.ts";
import { SERVICES_EN, SERVICES_AR } from "../src/data/services.ts";
import { SPECIALTIES_EN, SPECIALTIES_AR } from "../src/data/specialties.ts";
import { VIDEOS_EN, VIDEOS_AR } from "../src/data/videos.ts";
import { FEATURED_ARTICLE_EN, FEATURED_ARTICLE_AR, ARTICLES_EN, ARTICLES_AR } from "../src/data/blog.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    if (!line.includes("=") || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

let opCount = 0;
async function run(label, fn) {
  try {
    await fn();
    opCount++;
    console.log(`  ok  ${label}`);
  } catch (err) {
    console.error(`  ERR ${label}:`, err.message || err);
  }
}

// ---------------------------------------------------------------------
// 1. Site Settings (singleton)
// ---------------------------------------------------------------------
async function seedSiteSettings() {
  console.log("\n[site_settings]");
  await run("site_settings", async () => {
    const { error } = await supabase
      .from("site_settings")
      .update({
        doctor_name_en: en.meta.brand,
        doctor_name_ar: ar.meta.brand,
        clinic_name_en: en.meta.brand,
        clinic_name_ar: ar.meta.brand,
        phone: "+20 100 000 0000",
        whatsapp: "201000000000",
        emergency_phone: en.contact.emergency.phone,
        email: en.contact.quickInfo.email.value,
        address_en: en.contact.quickInfo.visit.value,
        address_ar: ar.contact.quickInfo.visit.value,
        business_hours: [
          { label_en: en.contact.clinicHours.weekdays, label_ar: ar.contact.clinicHours.weekdays, value_en: en.contact.clinicHours.weekdaysValue, value_ar: ar.contact.clinicHours.weekdaysValue },
          { label_en: en.contact.clinicHours.friday, label_ar: ar.contact.clinicHours.friday, value_en: en.contact.clinicHours.fridayValue, value_ar: ar.contact.clinicHours.fridayValue },
          { label_en: en.contact.clinicHours.critical, label_ar: ar.contact.clinicHours.critical, value_en: en.contact.clinicHours.criticalValue, value_ar: ar.contact.clinicHours.criticalValue },
        ],
        social_links: [
          { platform: "facebook", url: "#" },
          { platform: "instagram", url: "#" },
          { platform: "whatsapp", url: "https://wa.me/201000000000" },
        ],
        google_maps_embed_url: "",
        google_maps_address_en: en.contact.map.address,
        google_maps_address_ar: ar.contact.map.address,
        footer_description_en: en.footer.description,
        footer_description_ar: ar.footer.description,
        footer_copyright_en: en.footer.copyright,
        footer_copyright_ar: ar.footer.copyright,
      })
      .eq("id", 1);
    if (error) throw error;
  });
}

// ---------------------------------------------------------------------
// 2. Navigation links (header + 2 footer groups)
// ---------------------------------------------------------------------
async function seedNavLinks() {
  console.log("\n[nav_links]");
  const { count } = await supabase.from("nav_links").select("*", { count: "exact", head: true });
  if (count > 0) {
    console.log("  skip nav_links (already seeded)");
    return;
  }

  const header = [
    ["home", "/"], ["drAymanTarek", "/dr-ayman-tarek"], ["services", "/services"],
    ["videos", "/videos"], ["blog", "/blog"], ["contact", "/contact"],
  ].map(([key, href], i) => ({
    label_en: en.nav[key], label_ar: ar.nav[key], href, location: "header", display_order: i,
  }));

  const footerExpertise = ["neurosurgery", "neurology", "spineCare", "neuroOncology"].map((key, i) => ({
    label_en: en.footer.expertise[key], label_ar: ar.footer.expertise[key], href: "#", location: "footer_expertise", display_order: i,
  }));

  const footerJourney = ["firstVisit", "research", "recovery", "insurance"].map((key, i) => ({
    label_en: en.footer.patientJourney[key], label_ar: ar.footer.patientJourney[key], href: "#", location: "footer_journey", display_order: i,
  }));

  await run("nav_links (header + footer x2)", async () => {
    const { error } = await supabase.from("nav_links").insert([...header, ...footerExpertise, ...footerJourney]);
    if (error) throw error;
  });
}

// ---------------------------------------------------------------------
// 3. Page sections
// ---------------------------------------------------------------------
async function getPageId(slug) {
  const { data, error } = await supabase.from("pages").select("id").eq("slug", slug).single();
  if (error) throw error;
  return data.id;
}

async function upsertSection(pageId, sectionKey, contentEn, contentAr) {
  const { data: existing } = await supabase.from("page_sections").select("id").eq("page_id", pageId).eq("section_key", sectionKey).maybeSingle();
  const content = { en: contentEn, ar: contentAr };
  if (existing) {
    const { error } = await supabase.from("page_sections").update({ content }).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("page_sections").insert({ page_id: pageId, section_key: sectionKey, content });
    if (error) throw error;
  }
}

async function seedPageSections() {
  console.log("\n[page_sections]");

  // ---- Home ----
  const homeId = await getPageId("home");
  await run("home.hero", () => upsertSection(homeId, "hero", en.home.hero, ar.home.hero));
  await run("home.stats", () =>
    upsertSection(
      homeId,
      "stats",
      { items: [
        { icon: "workspace_premium", value: "20", suffix: "+", label: en.home.stats.yearsExpertise },
        { icon: "medical_services", value: "8000", suffix: "+", label: en.home.stats.surgeriesDone },
        { icon: "favorite", value: "98", suffix: "%", label: en.home.stats.successRate },
        { icon: "support_agent", value: "24", suffix: "/7", label: en.home.stats.criticalCare },
      ] },
      { items: [
        { icon: "workspace_premium", value: "20", suffix: "+", label: ar.home.stats.yearsExpertise },
        { icon: "medical_services", value: "8000", suffix: "+", label: ar.home.stats.surgeriesDone },
        { icon: "favorite", value: "98", suffix: "%", label: ar.home.stats.successRate },
        { icon: "support_agent", value: "24", suffix: "/7", label: ar.home.stats.criticalCare },
      ] },
    ),
  );
  await run("home.about", () => upsertSection(homeId, "about", en.home.about, ar.home.about));
  await run("home.specialties", () => {
    const meta = [
      ["brainTumors", "grain"], ["spineSurgery", "pin"], ["neurology", "neurology"], ["neuroEndoscopy", "biotech"],
    ];
    const build = (dict) => ({
      eyebrow: dict.home.specialties.eyebrow,
      title: dict.home.specialties.title,
      subtitle: dict.home.specialties.subtitle,
      items: meta.map(([key, icon]) => ({ icon, title: dict.home.specialties.items[key].title, desc: dict.home.specialties.items[key].desc, cta: dict.home.specialties.items[key].cta })),
    });
    return upsertSection(homeId, "specialties", build(en), build(ar));
  });
  await run("home.testimonialsPanel", () => {
    const build = (dict) => ({
      title: dict.home.testimonialsPanel.title,
      viewAll: dict.home.testimonialsPanel.viewAll,
      milestonesTitle: dict.home.testimonialsPanel.milestonesTitle,
      milestones: dict.home.testimonialsPanel.milestones,
    });
    return upsertSection(homeId, "testimonialsPanel", build(en), build(ar));
  });
  await run("home.insightsFaq", () => {
    const build = (dict) => ({
      insightsHeading: dict.home.insightsFaq.insightsHeading,
      viewAll: dict.home.insightsFaq.viewAll,
      faqHeading: dict.home.insightsFaq.faqHeading,
    });
    return upsertSection(homeId, "insightsFaq", build(en), build(ar));
  });
  await run("home.videoSeries", () => upsertSection(homeId, "videoSeries", en.home.videoSeries, ar.home.videoSeries));
  await run("home.finalCta", () => upsertSection(homeId, "finalCta", en.home.finalCta, ar.home.finalCta));

  // ---- Dr. Ayman Tarek ----
  const drId = await getPageId("dr-ayman-tarek");
  await run("dr.hero", () => upsertSection(drId, "hero", en.drAymanTarek.hero, ar.drAymanTarek.hero));
  await run("dr.about", () => upsertSection(drId, "about", en.drAymanTarek.about, ar.drAymanTarek.about));
  await run("dr.certificates", () => {
    const meta = [
      ["europeanBoard", "workspace_premium"], ["isapsFellowship", "verified"], ["burnsDiploma", "local_hospital"],
      ["injectables", "colorize"], ["egyptianSociety", "groups"], ["bodyContouringAward", "military_tech"],
    ];
    const build = (dict) => ({
      title: dict.drAymanTarek.certificates.title,
      subtitle: dict.drAymanTarek.certificates.subtitle,
      items: meta.map(([key, icon]) => ({ icon, title: dict.drAymanTarek.certificates.items[key].title, desc: dict.drAymanTarek.certificates.items[key].desc })),
    });
    return upsertSection(drId, "certificates", build(en), build(ar));
  });
  await run("dr.specialties", () => {
    const build = (dict) => ({ title: dict.drAymanTarek.specialties.title, subtitle: dict.drAymanTarek.specialties.subtitle });
    return upsertSection(drId, "specialties", build(en), build(ar));
  });
  await run("dr.achievements", () => {
    const meta = [["experience", "timeline"], ["speaker", "podium"], ["research", "science"], ["international", "public"]];
    const build = (dict) => ({
      title: dict.drAymanTarek.achievements.title,
      subtitle: dict.drAymanTarek.achievements.subtitle,
      items: meta.map(([key, icon]) => ({ icon, title: dict.drAymanTarek.achievements.items[key].title, desc: dict.drAymanTarek.achievements.items[key].desc })),
    });
    return upsertSection(drId, "achievements", build(en), build(ar));
  });
  await run("dr.stats", () => {
    const meta = [
      ["successfulSurgeries", "workspace_premium", "4000", "+"], ["yearsOfExperience", "military_tech", "15", "+"],
      ["happyPatients", "favorite", "6000", "+"], ["internationalConferences", "groups", "30", "+"],
      ["scientificPublications", "science", "12", "+"],
    ];
    const build = (dict) => ({ items: meta.map(([key, icon, value, suffix]) => ({ icon, value, suffix, label: dict.drAymanTarek.stats[key] })) });
    return upsertSection(drId, "stats", build(en), build(ar));
  });
  await run("dr.testimonials", () => {
    const build = (dict) => ({ title: dict.drAymanTarek.testimonials.title });
    return upsertSection(drId, "testimonials", build(en), build(ar));
  });
  await run("dr.finalCta", () => {
    const build = (dict) => ({
      heading: dict.drAymanTarek.finalCta.heading, subtitle: dict.drAymanTarek.finalCta.subtitle,
      bookConsultation: dict.drAymanTarek.finalCta.bookConsultation, chatWhatsapp: dict.drAymanTarek.finalCta.chatWhatsapp,
    });
    return upsertSection(drId, "finalCta", build(en), build(ar));
  });

  // ---- Services ----
  const servicesId = await getPageId("services");
  await run("services.hero", () => upsertSection(servicesId, "hero", en.services.hero, ar.services.hero));
  await run("services.grid", () => upsertSection(servicesId, "grid", en.services.grid, ar.services.grid));
  await run("services.whyChoose", () => {
    const meta = [
      ["personalized", "tune"], ["experienced", "workspace_premium"], ["technology", "precision_manufacturing"], ["international", "public"],
      ["facilities", "domain"], ["recovery", "bolt"], ["patientCentered", "volunteer_activism"], ["safety", "shield"],
    ];
    const build = (dict) => ({
      eyebrow: dict.services.whyChoose.eyebrow, title: dict.services.whyChoose.title, subtitle: dict.services.whyChoose.subtitle,
      items: meta.map(([key, icon]) => ({ icon, title: dict.services.whyChoose.items[key].title, desc: dict.services.whyChoose.items[key].desc })),
    });
    return upsertSection(servicesId, "whyChoose", build(en), build(ar));
  });
  await run("services.techShowcase", () => upsertSection(servicesId, "techShowcase", en.services.techShowcase, ar.services.techShowcase));
  await run("services.finalCta", () => upsertSection(servicesId, "finalCta", en.services.finalCta, ar.services.finalCta));

  // ---- Videos ----
  const videosId = await getPageId("videos");
  await run("videos.hero", () => upsertSection(videosId, "hero", en.videos.hero, ar.videos.hero));
  await run("videos.library", () => upsertSection(videosId, "library", en.videos.library, ar.videos.library));
  await run("videos.finalCta", () => upsertSection(videosId, "finalCta", en.videos.finalCta, ar.videos.finalCta));

  // ---- Blog ----
  const blogId = await getPageId("blog");
  await run("blog.hero", () => upsertSection(blogId, "hero", en.blog.hero, ar.blog.hero));
  await run("blog.finalCta", () => upsertSection(blogId, "finalCta", en.blog.finalCta, ar.blog.finalCta));

  // ---- Contact ----
  const contactId = await getPageId("contact");
  await run("contact.hero", () => upsertSection(contactId, "hero", en.contact.hero, ar.contact.hero));
  await run("contact.quickInfo", () => {
    const build = (dict) => ({
      callLabel: dict.contact.quickInfo.call.label, emailLabel: dict.contact.quickInfo.email.label,
      visitLabel: dict.contact.quickInfo.visit.label, hoursLabel: dict.contact.quickInfo.hours.label,
    });
    return upsertSection(contactId, "quickInfo", build(en), build(ar));
  });
  await run("contact.clinicHours", () => {
    const build = (dict) => ({ title: dict.contact.clinicHours.title });
    return upsertSection(contactId, "clinicHours", build(en), build(ar));
  });
  await run("contact.emergency", () => {
    const build = (dict) => ({ title: dict.contact.emergency.title, description: dict.contact.emergency.description });
    return upsertSection(contactId, "emergency", build(en), build(ar));
  });
  await run("contact.form", () => {
    const build = (dict) => ({
      title: dict.contact.form.title, subtitle: dict.contact.form.subtitle,
      fullName: dict.contact.form.fullName, fullNamePlaceholder: dict.contact.form.fullNamePlaceholder,
      phone: dict.contact.form.phone, phonePlaceholder: dict.contact.form.phonePlaceholder,
      email: dict.contact.form.email, emailPlaceholder: dict.contact.form.emailPlaceholder,
      service: dict.contact.form.service, message: dict.contact.form.message,
      messagePlaceholder: dict.contact.form.messagePlaceholder, submit: dict.contact.form.submit,
      successMessage: dict.contact.form.successMessage,
    });
    return upsertSection(contactId, "form", build(en), build(ar));
  });
  await run("contact.faq", () => {
    const build = (dict) => ({ title: dict.contact.faq.title });
    return upsertSection(contactId, "faq", build(en), build(ar));
  });
  await run("contact.finalCta", () => upsertSection(contactId, "finalCta", en.contact.finalCta, ar.contact.finalCta));

  // ---- SEO (root metadata -> home; per-page titles) ----
  const seoByPage = {
    home: { title_en: "Dr. Ayman Tarek | Elite Neurosurgery & Neurology", title_ar: "د. أيمن طارق | التميز العالمي في جراحة الأعصاب", desc_en: en.home.hero.description, desc_ar: ar.home.hero.description },
    "dr-ayman-tarek": { title_en: "Cosmetic Surgery", title_ar: "جراحة تجميلية", desc_en: en.drAymanTarek.hero.subtitle, desc_ar: ar.drAymanTarek.hero.subtitle },
    services: { title_en: en.services.hero.title, title_ar: ar.services.hero.title, desc_en: en.services.hero.subtitle, desc_ar: ar.services.hero.subtitle },
    videos: { title_en: en.videos.hero.title, title_ar: ar.videos.hero.title, desc_en: en.videos.hero.subtitle, desc_ar: ar.videos.hero.subtitle },
    blog: { title_en: en.blog.hero.title, title_ar: ar.blog.hero.title, desc_en: en.blog.hero.subtitle, desc_ar: ar.blog.hero.subtitle },
    contact: { title_en: en.contact.hero.title, title_ar: ar.contact.hero.title, desc_en: en.contact.hero.subtitle, desc_ar: ar.contact.hero.subtitle },
  };
  for (const [slug, meta] of Object.entries(seoByPage)) {
    await run(`page_seo.${slug}`, async () => {
      const pageId = await getPageId(slug);
      const { data: existing } = await supabase.from("page_seo").select("id").eq("page_id", pageId).maybeSingle();
      const patch = { seo_title_en: meta.title_en, seo_title_ar: meta.title_ar, seo_description_en: meta.desc_en, seo_description_ar: meta.desc_ar };
      if (existing) {
        const { error } = await supabase.from("page_seo").update(patch).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("page_seo").insert({ ...patch, page_id: pageId });
        if (error) throw error;
      }
    });
  }
}

// ---------------------------------------------------------------------
// 4. Services collection
// ---------------------------------------------------------------------
async function seedServices() {
  console.log("\n[services]");
  for (let i = 0; i < SERVICES_EN.length; i++) {
    const e = SERVICES_EN[i];
    const a = SERVICES_AR[i];
    await run(`service: ${e.id}`, async () => {
      const row = {
        slug: e.id, title_en: e.title, title_ar: a.title,
        short_description_en: e.shortDescription, short_description_ar: a.shortDescription,
        full_description_en: e.description, full_description_ar: a.description,
        image_media_id: null, image_url: e.image, icon: null,
        recovery_en: e.recovery, recovery_ar: a.recovery, duration_en: e.duration, duration_ar: a.duration,
        display_order: i, status: "published",
      };
      const { data: existing } = await supabase.from("services").select("id").eq("slug", e.id).maybeSingle();
      let serviceId;
      if (existing) {
        const { error } = await supabase.from("services").update(row).eq("id", existing.id);
        if (error) throw error;
        serviceId = existing.id;
      } else {
        const { data: created, error } = await supabase.from("services").insert(row).select("id").single();
        if (error) throw error;
        serviceId = created.id;
      }
      await supabase.from("service_benefits").delete().eq("service_id", serviceId);
      await supabase.from("service_process_steps").delete().eq("service_id", serviceId);
      await supabase.from("service_benefits").insert(e.benefits.map((text_en, idx) => ({ service_id: serviceId, text_en, text_ar: a.benefits[idx], display_order: idx })));
      await supabase.from("service_process_steps").insert(e.process.map((text_en, idx) => ({ service_id: serviceId, text_en, text_ar: a.process[idx], display_order: idx })));
    });
  }
}

// ---------------------------------------------------------------------
// 5. Specialties collection
// ---------------------------------------------------------------------
async function seedSpecialties() {
  console.log("\n[specialties]");
  for (let i = 0; i < SPECIALTIES_EN.length; i++) {
    const e = SPECIALTIES_EN[i];
    const a = SPECIALTIES_AR[i];
    await run(`specialty: ${e.id}`, async () => {
      const row = {
        slug: e.id, title_en: e.title, title_ar: a.title,
        short_description_en: e.shortDescription, short_description_ar: a.shortDescription,
        description_en: e.description, description_ar: a.description,
        image_media_id: null, image_url: e.image, recovery_en: e.recovery, recovery_ar: a.recovery, duration_en: e.duration, duration_ar: a.duration,
        display_order: i, status: "published",
      };
      const { data: existing } = await supabase.from("specialties").select("id").eq("slug", e.id).maybeSingle();
      if (existing) {
        const { error } = await supabase.from("specialties").update(row).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("specialties").insert(row);
        if (error) throw error;
      }
    });
  }
}

// ---------------------------------------------------------------------
// 6. Videos collection
// ---------------------------------------------------------------------
async function seedVideos() {
  console.log("\n[videos]");
  for (let i = 0; i < VIDEOS_EN.length; i++) {
    const e = VIDEOS_EN[i];
    const a = VIDEOS_AR[i];
    await run(`video: ${e.id}`, async () => {
      const row = {
        slug: e.id, title_en: e.title, title_ar: a.title,
        short_description_en: e.shortDescription, short_description_ar: a.shortDescription,
        description_en: e.description, description_ar: a.description,
        thumbnail_media_id: null, thumbnail_url: e.thumbnail, youtube_url: "", duration: e.duration,
        category_en: e.category, category_ar: a.category,
        is_featured: i < 3, display_order: i, status: "published", published_at: new Date().toISOString(),
      };
      const { data: existing } = await supabase.from("videos").select("id").eq("slug", e.id).maybeSingle();
      if (existing) {
        const { error } = await supabase.from("videos").update(row).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("videos").insert(row);
        if (error) throw error;
      }
    });
  }
}

// ---------------------------------------------------------------------
// 7. Blog posts
// ---------------------------------------------------------------------
function toRichTextJson(text) {
  return { type: "doc", content: text.split("\n").filter(Boolean).map((p) => ({ type: "paragraph", content: [{ type: "text", text: p }] })) };
}

async function seedBlog() {
  console.log("\n[blog_posts]");
  const allEn = [{ ...FEATURED_ARTICLE_EN, featured: true }, ...ARTICLES_EN.map((a) => ({ ...a, featured: false }))];
  const allAr = [FEATURED_ARTICLE_AR, ...ARTICLES_AR];

  for (let i = 0; i < allEn.length; i++) {
    const e = allEn[i];
    const a = allAr[i];
    await run(`post: ${e.id}`, async () => {
      const row = {
        slug: e.id, title_en: e.title, title_ar: a.title,
        excerpt_en: e.excerpt, excerpt_ar: a.excerpt,
        content_en: toRichTextJson(e.excerpt), content_ar: toRichTextJson(a.excerpt),
        featured_image_media_id: null, featured_image_url: e.image, category_en: e.category, category_ar: a.category,
        author_name: "Dr. Ayman Tarek", reading_time_minutes: parseInt(e.readingTime) || null,
        is_featured: e.featured, status: "published", published_at: new Date().toISOString(),
      };
      const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", e.id).maybeSingle();
      if (existing) {
        const { error } = await supabase.from("blog_posts").update(row).eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(row);
        if (error) throw error;
      }
    });
  }
}

// ---------------------------------------------------------------------
// 8. FAQ items (home = general, contact = contact)
// ---------------------------------------------------------------------
async function seedFaq() {
  console.log("\n[faq_items]");
  const { count } = await supabase.from("faq_items").select("*", { count: "exact", head: true });
  if (count > 0) {
    console.log("  skip faq_items (already seeded)");
    return;
  }
  const general = en.home.insightsFaq.faqItems.map((item, i) => ({
    question_en: item.question, question_ar: ar.home.insightsFaq.faqItems[i].question,
    answer_en: item.answer, answer_ar: ar.home.insightsFaq.faqItems[i].answer,
    category: "general", display_order: i, status: "published",
  }));
  const contact = en.contact.faq.items.map((item, i) => ({
    question_en: item.question, question_ar: ar.contact.faq.items[i].question,
    answer_en: item.answer, answer_ar: ar.contact.faq.items[i].answer,
    category: "contact", display_order: i, status: "published",
  }));
  await run("faq_items (general + contact)", async () => {
    const { error } = await supabase.from("faq_items").insert([...general, ...contact]);
    if (error) throw error;
  });
}

// ---------------------------------------------------------------------
// 9. Testimonials (home + dr-ayman-tarek)
// ---------------------------------------------------------------------
async function seedTestimonials() {
  console.log("\n[testimonials]");
  const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true });
  if (count > 0) {
    console.log("  skip testimonials (already seeded)");
    return;
  }
  const home = en.home.testimonialsPanel.testimonials.map((item, i) => ({
    patient_name: item.name, role_en: item.role, role_ar: ar.home.testimonialsPanel.testimonials[i].role,
    review_en: item.quote, review_ar: ar.home.testimonialsPanel.testimonials[i].quote,
    rating: 5, placements: ["home"], display_order: i, status: "published",
  }));
  const dr = en.drAymanTarek.testimonials.items.map((item, i) => ({
    patient_name: item.name, role_en: item.role, role_ar: ar.drAymanTarek.testimonials.items[i].role,
    review_en: item.quote, review_ar: ar.drAymanTarek.testimonials.items[i].quote,
    rating: 5, placements: ["dr-ayman-tarek"], display_order: i, status: "published",
  }));
  await run("testimonials (home + dr-ayman-tarek)", async () => {
    const { error } = await supabase.from("testimonials").insert([...home, ...dr]);
    if (error) throw error;
  });
}

async function main() {
  console.log("Seeding CMS from existing dictionaries/data files...");
  await seedSiteSettings();
  await seedNavLinks();
  await seedPageSections();
  await seedServices();
  await seedSpecialties();
  await seedVideos();
  await seedBlog();
  await seedFaq();
  await seedTestimonials();
  console.log(`\nDone. ${opCount} operations completed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
