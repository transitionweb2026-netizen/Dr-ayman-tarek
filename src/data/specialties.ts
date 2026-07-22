import type { ProcedureCardItem } from "@/components/sections/ProcedureCardGrid";
import type { Language } from "@/i18n/LanguageProvider";

export const SPECIALTIES_EN: ProcedureCardItem[] = [
  {
    id: "liposuction",
    title: "Liposuction & Body Contouring",
    shortDescription: "Precision body sculpting with faster recovery times.",
    image: "/illustrations/dr-ayman-tarek/card-liposuction.svg",
    description:
      "Precision fat removal and body sculpting using advanced techniques that target stubborn fat deposits while contouring a smoother, more proportionate silhouette — with faster recovery than traditional methods.",
    recovery: "2 – 4 weeks",
    duration: "2 – 3 hours",
  },
  {
    id: "rhinoplasty",
    title: "Rhinoplasty",
    shortDescription: "Natural balance between form and breathing function.",
    image: "/illustrations/dr-ayman-tarek/card-rhinoplasty.svg",
    description:
      "A carefully balanced approach to reshaping the nose that respects both aesthetics and airway function, delivering natural-looking results tailored to each patient's facial proportions.",
    recovery: "1 – 2 weeks",
    duration: "1.5 – 3 hours",
  },
  {
    id: "facelift",
    title: "Facelift & Neck Lift",
    shortDescription: "A more youthful look with virtually invisible scarring.",
    image: "/illustrations/dr-ayman-tarek/card-facelift.svg",
    description:
      "Comprehensive facial rejuvenation that restores a firmer, more youthful contour to the face and neck, using refined techniques designed to keep scarring virtually undetectable.",
    recovery: "2 – 3 weeks",
    duration: "3 – 5 hours",
  },
  {
    id: "breast",
    title: "Breast Augmentation & Reduction",
    shortDescription: "Tailored solutions balancing proportion and comfort.",
    image: "/illustrations/dr-ayman-tarek/card-breast.svg",
    description:
      "Personalized breast surgery — augmentation or reduction — planned around each patient's body proportions and goals, balancing natural aesthetics with long-term comfort.",
    recovery: "1 – 2 weeks",
    duration: "1.5 – 2.5 hours",
  },
  {
    id: "burn-reconstructive",
    title: "Burn & Reconstructive Surgery",
    shortDescription: "Rebuilding damaged tissue with high surgical precision.",
    image: "/illustrations/dr-ayman-tarek/card-burn-reconstructive.svg",
    description:
      "Advanced reconstructive techniques that rebuild damaged tissue after burns, trauma, or prior surgery, combining surgical precision with a focus on restoring both function and appearance.",
    recovery: "Varies by severity",
    duration: "Varies by procedure",
  },
  {
    id: "botox-fillers",
    title: "Botox & Dermal Fillers",
    shortDescription: "Non-surgical solutions for immediate, natural-looking results.",
    image: "/illustrations/dr-ayman-tarek/card-botox-fillers.svg",
    description:
      "Non-surgical injectable treatments that smooth fine lines and restore facial volume, delivering immediate, natural-looking results with virtually no downtime.",
    recovery: "No downtime",
    duration: "15 – 30 minutes",
  },
  {
    id: "tummy-tuck",
    title: "Tummy Tuck (Abdominoplasty)",
    shortDescription: "A firmer, flatter abdominal contour with a tailored approach.",
    image: "/illustrations/dr-ayman-tarek/card-tummy-tuck.svg",
    description:
      "Removes excess skin and tightens weakened abdominal muscles to restore a firmer, flatter contour — often combined with liposuction for a more complete result after pregnancy or major weight loss.",
    recovery: "3 – 5 weeks",
    duration: "2 – 3 hours",
  },
  {
    id: "scar-revision",
    title: "Scar Revision",
    shortDescription: "Refined techniques to minimize the appearance of scarring.",
    image: "/illustrations/dr-ayman-tarek/card-scar-revision.svg",
    description:
      "Advanced surgical and non-surgical techniques to improve the appearance of scars from prior surgery, injury, or burns — softening texture and color for a smoother, more natural-looking result.",
    recovery: "1 – 3 weeks",
    duration: "30 – 90 minutes",
  },
];

export const SPECIALTIES_AR: ProcedureCardItem[] = [
  {
    id: "liposuction",
    title: "شفط الدهون ونحت الجسم",
    shortDescription: "نحت دقيق للجسم مع فترة تعافٍ أسرع.",
    image: "/illustrations/dr-ayman-tarek/card-liposuction.svg",
    description:
      "إزالة دقيقة للدهون ونحت للجسم باستخدام تقنيات متقدمة تستهدف تجمعات الدهون العنيدة مع تحقيق قوام أكثر انسيابية وتناسقًا — وبتعافٍ أسرع من الطرق التقليدية.",
    recovery: "2 – 4 أسابيع",
    duration: "2 – 3 ساعات",
  },
  {
    id: "rhinoplasty",
    title: "تجميل الأنف",
    shortDescription: "توازن طبيعي بين الشكل ووظيفة التنفس.",
    image: "/illustrations/dr-ayman-tarek/card-rhinoplasty.svg",
    description:
      "أسلوب متوازن بعناية لإعادة تشكيل الأنف يراعي الجمال ووظيفة التنفس معًا، لتحقيق نتائج طبيعية المظهر تتناسب مع ملامح وجه كل مريض.",
    recovery: "1 – 2 أسابيع",
    duration: "1.5 – 3 ساعات",
  },
  {
    id: "facelift",
    title: "شد الوجه والرقبة",
    shortDescription: "مظهر أكثر شبابًا مع ندبات تكاد لا تُرى.",
    image: "/illustrations/dr-ayman-tarek/card-facelift.svg",
    description:
      "تجديد شامل لملامح الوجه يعيد للوجه والرقبة قوامًا أكثر شدًا وشبابًا، باستخدام تقنيات دقيقة تجعل أثر الندبات غير ملحوظ تقريبًا.",
    recovery: "2 – 3 أسابيع",
    duration: "3 – 5 ساعات",
  },
  {
    id: "breast",
    title: "تكبير وتصغير الثدي",
    shortDescription: "حلول مخصصة توازن بين التناسق والراحة.",
    image: "/illustrations/dr-ayman-tarek/card-breast.svg",
    description:
      "جراحة ثدي مخصصة — سواء تكبير أو تصغير — تُخطَّط حسب تناسب جسم كل مريضة وأهدافها، بما يوازن بين الجمال الطبيعي والراحة على المدى الطويل.",
    recovery: "1 – 2 أسابيع",
    duration: "1.5 – 2.5 ساعات",
  },
  {
    id: "burn-reconstructive",
    title: "جراحة الحروق والترميم",
    shortDescription: "إعادة بناء الأنسجة التالفة بدقة جراحية عالية.",
    image: "/illustrations/dr-ayman-tarek/card-burn-reconstructive.svg",
    description:
      "تقنيات ترميمية متقدمة لإعادة بناء الأنسجة التالفة بعد الحروق أو الإصابات أو الجراحات السابقة، تجمع بين الدقة الجراحية والتركيز على استعادة الوظيفة والمظهر معًا.",
    recovery: "تختلف حسب شدة الحالة",
    duration: "تختلف حسب نوع العملية",
  },
  {
    id: "botox-fillers",
    title: "البوتوكس والفيلر",
    shortDescription: "حلول غير جراحية لنتائج فورية وطبيعية المظهر.",
    image: "/illustrations/dr-ayman-tarek/card-botox-fillers.svg",
    description:
      "علاجات غير جراحية بالحقن تُنعّم الخطوط الدقيقة وتستعيد امتلاء الوجه، مع نتائج فورية وطبيعية المظهر ودون فترة توقف تقريبًا.",
    recovery: "بدون فترة توقف",
    duration: "15 – 30 دقيقة",
  },
  {
    id: "tummy-tuck",
    title: "شد البطن",
    shortDescription: "قوام بطن أكثر شدًا واستواءً بأسلوب مخصص.",
    image: "/illustrations/dr-ayman-tarek/card-tummy-tuck.svg",
    description:
      "إزالة الجلد الزائد وشد عضلات البطن المرتخية لاستعادة قوام أكثر شدًا واستواءً — وغالبًا ما تُجرى مع شفط الدهون لنتيجة أكثر اكتمالًا بعد الحمل أو فقدان الوزن الكبير.",
    recovery: "3 – 5 أسابيع",
    duration: "2 – 3 ساعات",
  },
  {
    id: "scar-revision",
    title: "إزالة وتحسين الندبات",
    shortDescription: "تقنيات دقيقة لتقليل ظهور الندبات.",
    image: "/illustrations/dr-ayman-tarek/card-scar-revision.svg",
    description:
      "تقنيات جراحية وغير جراحية متقدمة لتحسين مظهر الندبات الناتجة عن جراحة سابقة أو إصابة أو حروق — لتنعيم الملمس واللون وتحقيق نتيجة أكثر سلاسة وطبيعية.",
    recovery: "1 – 3 أسابيع",
    duration: "30 – 90 دقيقة",
  },
];

export function getSpecialties(lang: Language): ProcedureCardItem[] {
  return lang === "ar" ? SPECIALTIES_AR : SPECIALTIES_EN;
}
