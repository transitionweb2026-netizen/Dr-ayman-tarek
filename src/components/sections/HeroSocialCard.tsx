"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppGlyph, InstagramGlyph, FacebookGlyph } from "@/components/ui/SocialGlyph";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/** Bounded magnetic pull toward the cursor — spring-eased, resets on mouse leave. */
function MagneticIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });
  const isExternal = href.startsWith("http");

  function handleMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="icon-badge-neon flex h-12 w-12 items-center justify-center rounded-full"
    >
      {children}
    </motion.a>
  );
}

/** Premium glass "Connect With Us" card — social icons + phone, floated inside the Home hero.
 * WhatsApp/phone come straight from Site Settings; Instagram/Facebook are looked up from the
 * same CMS social-links list the Footer uses — a platform with no configured URL is left out
 * entirely rather than shown as a dead "#" link. */
export function HeroSocialCard() {
  const { t, contact } = useLanguage();
  const findSocial = (platform: string) => contact.socialLinks.find((s) => s.platform.toLowerCase() === platform)?.url;
  const instagramUrl = findSocial("instagram");
  const facebookUrl = findSocial("facebook");
  const socials: { labelKey: string; href: string; render: (className: string) => ReactNode }[] = [
    { labelKey: "heroSocialCard.whatsapp", href: `https://wa.me/${contact.whatsapp}`, render: (c) => <WhatsAppGlyph className={c} /> },
    ...(instagramUrl ? [{ labelKey: "heroSocialCard.instagram", href: instagramUrl, render: (c: string) => <InstagramGlyph className={c} /> }] : []),
    ...(facebookUrl ? [{ labelKey: "heroSocialCard.facebook", href: facebookUrl, render: (c: string) => <FacebookGlyph className={c} /> }] : []),
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass relative w-full max-w-xs overflow-hidden rounded-[28px] border-primary/20 p-6 shadow-glow"
    >
      {/* Soft diagonal glass reflection */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />

      <p className="relative mb-5 text-micro font-semibold uppercase tracking-[0.2em] text-primary">
        {t("heroSocialCard.connectWithUs")}
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={staggerContainer}
        className="relative mb-5 flex items-center gap-4"
      >
        {socials.map((social) => (
          <motion.div key={social.labelKey} variants={staggerItem}>
            <MagneticIcon href={social.href} label={t(social.labelKey)}>
              {social.render("icon-neon h-5 w-5")}
            </MagneticIcon>
          </motion.div>
        ))}
      </motion.div>

      <a
        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        className="group relative flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-4 py-3 backdrop-blur-md transition-all duration-300 ease-premium hover:border-primary/40 hover:bg-primary/10 hover:shadow-glow"
      >
        <span className="icon-badge-neon flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-premium group-hover:scale-110">
          <Phone className="icon-neon h-4 w-4" strokeWidth={2} />
        </span>
        <span dir="ltr" className="text-body font-bold text-white">{contact.phone}</span>
      </a>
    </motion.div>
  );
}
