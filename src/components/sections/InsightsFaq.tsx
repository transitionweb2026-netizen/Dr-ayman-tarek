import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { Accordion } from "@/components/ui/Accordion";
import { NeonIcon } from "@/components/ui/NeonIcon";
import { Reveal } from "@/components/motion/Reveal";

const ARTICLES = [
  {
    tag: "Research",
    date: "Oct 12, 2024",
    title: "Innovations in Robotic Neurosurgery",
    excerpt: "How AI and robotic navigation are redefining the success rates of complex cranial procedures...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCj_BLuiyILw1YhqAC3tRIDF2988vEFMbdp2CShPuVIiDUoHM1kMzpKG_4i0s5CUQUmeVMDWsJnumLQFXXrf0m-Mjl34wizujbVZdXvUYuolvYMi8YyTkj8UyYy6owS1CMhwr6GhKZvbQVx4zQYVu5JL4WeKrZ9IM5Qa-npZXsG-RmAevHAwlFxJCgUchdKulNiNaTwgXXFMihF3Ca3g_TTGj18eVkdNijbGyFBcA_Ydb9qTxI01BtA",
  },
  {
    tag: "Patient Care",
    date: "Sep 28, 2024",
    title: "Managing Chronic Back Pain Effectively",
    excerpt: "A comprehensive guide on when to transition from conservative therapy to surgical intervention...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTn3cyqUNe0ocnTjAZNiU5K9DqBl7NhprA_LEZLFZdsfYHOSUvWgG4z5ly_9fRYrWBfOch68eVi6fVDiJRcEZ9QKfi5Hj6oqaqOVKEMusztlkmYqVhxRwvogyhNcuiel8bNSOj3TtidYMdw9NdHd_55yE7p3rVGC-iaOvAyZV5tB3ohCj8Zkhed11RQnRdpdNgf5A1NfHSeO6erTwhaMrdCajgAonxI05DC1TiGTJj3Yd5T0EZsOmC",
  },
  {
    tag: "Neurology",
    date: "Nov 3, 2024",
    title: "Advances in Epilepsy Surgery",
    excerpt: "New diagnostic mapping techniques are helping identify surgical candidates earlier and with greater precision...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP6klrdOkaqLvlrfoMX7AfD2Ic6H8jgwmKRZypU2FjhK07NPZMQ2pij14DYs6TqVdsQ22uvX0yGm-3_Mz9rDK-ZvQOTzYvMUCqWdenca9F4lD5Ocq8LJiVMMuxbuzeH-nT1oHMiyczcIdSqFeExP1eGrfiAs7NB-VsTV1HlmTpETg9JIRyWRIiFQg5F79aCEvZkhTKDZBF-NMypOxuu7ASYLJexGp_rWY6OSjF8d8G_LLu6Ze9dc1",
  },
];

const FAQ_ITEMS = [
  { question: "What is the recovery time for spine surgery?", answer: "Recovery varies by procedure — from a few days for minimally invasive treatments to several weeks for complex reconstructive surgery." },
  { question: "Do you offer second opinions?", answer: "Yes, we offer virtual and in-person second-opinion consultations for patients diagnosed elsewhere." },
  { question: "How do I prepare for a neuro-consultation?", answer: "Bring any prior imaging, a list of current medications, and relevant medical records." },
  { question: "What insurance providers are accepted?", answer: "We work with most major insurance providers — our team can confirm your specific coverage before your visit." },
  { question: "Are robotic surgeries safer?", answer: "Robotic-assisted procedures offer sub-millimeter accuracy and, for eligible cases, a reduced complication rate compared to traditional techniques." },
  { question: "How soon can I schedule a consultation?", answer: "Most new patients are seen within 3–5 business days; urgent cases are prioritized and can often be accommodated sooner." },
  { question: "What should I expect during my first visit?", answer: "Your first visit includes a detailed review of your medical history, a physical examination, and a discussion of any imaging or test results you bring with you." },
];

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  return (
    <GlassCard radius="2xl" className="flex flex-col p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-card-title text-white">Latest Insights</h2>
        <button className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">View All</button>
      </div>
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-2xl">
        <Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 hover:scale-110" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-small text-primary">
            {article.tag}
          </span>
          <span className="text-xs text-on-surface-variant">{article.date}</span>
        </div>
        <h3 className="text-card-title text-white">{article.title}</h3>
        <p className="line-clamp-2 text-body text-on-surface-variant">{article.excerpt}</p>
      </div>
      <a className="flex items-center gap-2 pt-4 text-small text-primary" href="#">
        Read Story <NeonIcon name="open_in_new" className="text-sm" />
      </a>
    </GlassCard>
  );
}

export function InsightsFaq() {
  return (
    <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile pb-section-gap-sm md:px-margin-desktop lg:grid-cols-[3.2fr_1.3fr] lg:items-stretch">
      <div className="grid grid-cols-1 items-start gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article, index) => (
          <Reveal key={article.title} delay={index * 0.1}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={ARTICLES.length * 0.1}>
        <GlassCard radius="2xl" className="flex flex-col p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-card-title text-white">Common Questions</h2>
            <button className="shrink-0 border-b border-primary/30 pb-0.5 text-small text-primary">View All</button>
          </div>
          <Accordion items={FAQ_ITEMS.slice(0, 6)} />
        </GlassCard>
      </Reveal>
    </section>
  );
}

export { FAQ_ITEMS };
