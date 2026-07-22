import type { ProcedureCardItem } from "@/components/sections/ProcedureCardGrid";
import type { Language } from "@/i18n/LanguageProvider";

export interface Service extends ProcedureCardItem {
  benefits: string[];
  process: string[];
}

const IMG = {
  brain: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj_BLuiyILw1YhqAC3tRIDF2988vEFMbdp2CShPuVIiDUoHM1kMzpKG_4i0s5CUQUmeVMDWsJnumLQFXXrf0m-Mjl34wizujbVZdXvUYuolvYMi8YyTkj8UyYy6owS1CMhwr6GhKZvbQVx4zQYVu5JL4WeKrZ9IM5Qa-npZXsG-RmAevHAwlFxJCgUchdKulNiNaTwgXXFMihF3Ca3g_TTGj18eVkdNijbGyFBcA_Ydb9qTxI01BtA",
  spine: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTn3cyqUNe0ocnTjAZNiU5K9DqBl7NhprA_LEZLFZdsfYHOSUvWgG4z5ly_9fRYrWBfOch68eVi6fVDiJRcEZ9QKfi5Hj6oqaqOVKEMusztlkmYqVhxRwvogyhNcuiel8bNSOj3TtidYMdw9NdHd_55yE7p3rVGC-iaOvAyZV5tB3ohCj8Zkhed11RQnRdpdNgf5A1NfHSeO6erTwhaMrdCajgAonxI05DC1TiGTJj3Yd5T0EZsOmC",
  suite: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9",
  epilepsy: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP6klrdOkaqLvlrfoMX7AfD2Ic6H8jgwmKRZypU2FjhK07NPZMQ2pij14DYs6TqVdsQ22uvX0yGm-3_Mz9rDK-ZvQOTzYvMUCqWdenca9F4lD5Ocq8LJiVMMuxbuzeH-nT1oHMiyczcIdSqFeExP1eGrfiAs7NB-VsTV1HlmTpETg9JIRyWRIiFQg5F79aCEvZkhTKDZBF-NMypOxuu7ASYLJexGp_rWY6OSjF8d8G_LLu6Ze9dc1",
  disc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC42DEKTaJe4KxQbrNk7_4N3r0uR17-UWvsiLQT9WN28BJjyNIf9oMv97lm1Q8CGg8qn6Up0qmxsaW4aC2ssTp6J-he9nwGHBfzPwnpUe76ZruS-_QHzTZPRVLGzDOgRIPW8_HAbZlOQuWwmDQTLgUMu-aKclM0mZFCe-rJ-OelKL5pLACXDbF6hkocNBqDF7npayc5mKjEOOMjgdOjrHIO0mnQXNstc-VUj9lgw_gxArPZFJUD8htb",
  diagnostic: "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk",
};

export const SERVICES_EN: Service[] = [
  {
    id: "brain-tumor",
    title: "Brain Tumor Surgery",
    shortDescription: "Advanced micro-surgical resection of complex neuro-oncology cases with maximum tissue preservation.",
    image: IMG.brain,
    description:
      "Advanced micro-surgical resection of benign and malignant brain tumors, combining intraoperative imaging with neuronavigation to maximize tumor removal while protecting healthy tissue and critical brain function.",
    benefits: [
      "Maximum tumor removal with minimal impact on healthy tissue",
      "Real-time intraoperative imaging for precision",
      "Multidisciplinary tumor board review for every case",
      "Reduced risk of neurological complications",
    ],
    process: [
      "Initial consultation and full neurological assessment",
      "Advanced MRI/CT imaging and 3D surgical planning",
      "Microsurgical tumor resection under neuronavigation",
      "Post-operative monitoring and pathology review",
    ],
    recovery: "2 – 6 weeks",
    duration: "3 – 6 hours",
  },
  {
    id: "spinal-fusion",
    title: "Spinal Fusion & Disc Replacement",
    shortDescription: "Minimally invasive spinal fusion and artificial disc replacement to restore stability and mobility.",
    image: IMG.disc,
    description:
      "Minimally invasive stabilization or artificial disc replacement for degenerative disc disease, herniated discs, and spinal instability, restoring mobility while relieving chronic pain.",
    benefits: [
      "Smaller incisions and less muscle disruption",
      "Preserved spinal mobility with disc replacement options",
      "Significant, lasting pain relief",
      "Shorter hospital stay than traditional open surgery",
    ],
    process: [
      "Consultation with spinal imaging review",
      "Non-surgical treatment trial where appropriate",
      "Minimally invasive fusion or disc replacement procedure",
      "Guided physical therapy and follow-up",
    ],
    recovery: "4 – 8 weeks",
    duration: "2 – 4 hours",
  },
  {
    id: "neuro-endoscopy",
    title: "Minimally Invasive Neuro-Endoscopy",
    shortDescription: "Keyhole endoscopic techniques for faster recovery and reduced surgical trauma.",
    image: IMG.epilepsy,
    description:
      "Keyhole endoscopic access for pituitary tumors, hydrocephalus, and select cranial conditions — treating deep-seated pathology through natural corridors with minimal tissue disruption.",
    benefits: [
      "No visible scarring in most cases",
      "Significantly reduced surgical trauma",
      "Shorter operating time for eligible cases",
      "Faster return to daily activities",
    ],
    process: [
      "Detailed imaging to confirm endoscopic eligibility",
      "Pre-operative planning with the surgical team",
      "Endoscopic procedure through a natural or minimal-access corridor",
      "Same-day or next-day mobilization",
    ],
    recovery: "1 – 3 weeks",
    duration: "1.5 – 3 hours",
  },
  {
    id: "epilepsy",
    title: "Epilepsy & Movement Disorder Surgery",
    shortDescription: "Precision diagnostics and surgical treatment for drug-resistant epilepsy and movement disorders.",
    image: IMG.diagnostic,
    description:
      "Precision diagnostic mapping and surgical treatment for drug-resistant epilepsy and movement disorders such as Parkinson's disease, including resective surgery and deep brain stimulation.",
    benefits: [
      "Seizure freedom or major reduction in seizure frequency",
      "Reduced dependence on high-dose medication",
      "Improved motor control for movement disorders",
      "Comprehensive pre-surgical seizure mapping",
    ],
    process: [
      "Video-EEG monitoring and seizure mapping",
      "Multidisciplinary epilepsy team review",
      "Resective surgery or device implantation",
      "Long-term neurological follow-up",
    ],
    recovery: "2 – 4 weeks",
    duration: "3 – 5 hours",
  },
  {
    id: "pediatric",
    title: "Pediatric Neurosurgery",
    shortDescription: "Specialized surgical care for congenital and acquired neurological conditions in children.",
    image: IMG.suite,
    description:
      "Specialized surgical care for congenital and acquired neurological conditions in infants and children, delivered in a facility built for pediatric comfort and safety.",
    benefits: [
      "Child-specific surgical protocols and equipment",
      "Family-centered communication throughout care",
      "Coordinated care with pediatric specialists",
      "Long-term developmental follow-up",
    ],
    process: [
      "Pediatric neurological assessment",
      "Age-appropriate imaging and planning",
      "Surgery with dedicated pediatric anesthesia support",
      "Developmental follow-up program",
    ],
    recovery: "Varies by procedure",
    duration: "Varies by procedure",
  },
  {
    id: "peripheral-nerve",
    title: "Peripheral Nerve Surgery",
    shortDescription: "Microsurgical repair and reconstruction of injured or compressed peripheral nerves.",
    image: IMG.spine,
    description:
      "Microsurgical repair, decompression, and reconstruction of injured or compressed peripheral nerves, restoring sensation and motor function affected by trauma or entrapment.",
    benefits: [
      "Restored sensation and motor function",
      "Relief from chronic nerve-related pain",
      "Microsurgical precision under high magnification",
      "Individualized rehabilitation planning",
    ],
    process: [
      "Nerve conduction studies and clinical evaluation",
      "Surgical planning based on injury type",
      "Microsurgical repair or decompression",
      "Structured rehabilitation and nerve recovery monitoring",
    ],
    recovery: "6 – 12 weeks",
    duration: "1.5 – 4 hours",
  },
  {
    id: "stroke",
    title: "Stroke & Cerebrovascular Surgery",
    shortDescription: "Emergency and elective treatment of aneurysms, AVMs, and cerebrovascular disease.",
    image: IMG.brain,
    description:
      "Emergency and elective surgical treatment of aneurysms, arteriovenous malformations (AVMs), and other cerebrovascular disease, backed by a rapid-response stroke care protocol.",
    benefits: [
      "Rapid-response emergency stroke protocol",
      "Advanced vascular imaging for precise planning",
      "Both microsurgical and endovascular treatment options",
      "Coordinated stroke rehabilitation support",
    ],
    process: [
      "Emergency or elective vascular imaging (CTA/MRA)",
      "Vascular team treatment planning",
      "Microsurgical or endovascular intervention",
      "Post-treatment neurological monitoring and rehabilitation",
    ],
    recovery: "Varies by case severity",
    duration: "2 – 6 hours",
  },
  {
    id: "robotic-spine",
    title: "Robotic-Assisted Spine Surgery",
    shortDescription: "Sub-millimeter surgical accuracy powered by robotic navigation and real-time imaging.",
    image: IMG.disc,
    description:
      "Sub-millimeter surgical accuracy powered by robotic navigation and real-time 3D imaging, improving implant placement accuracy for complex spinal reconstructions.",
    benefits: [
      "Sub-millimeter implant placement accuracy",
      "Reduced radiation exposure with advanced imaging",
      "Smaller incisions than conventional instrumentation",
      "Lower risk of instrumentation-related complications",
    ],
    process: [
      "3D spinal imaging and robotic surgical planning",
      "Patient-specific instrumentation mapping",
      "Robotic-guided instrumentation and fusion",
      "Early mobilization and guided rehabilitation",
    ],
    recovery: "4 – 8 weeks",
    duration: "3 – 5 hours",
  },
];

export const SERVICES_AR: Service[] = [
  {
    id: "brain-tumor",
    title: "جراحة أورام المخ",
    shortDescription: "استئصال دقيق بالمجهر الجراحي لحالات أورام الجهاز العصبي المعقدة، مع أقصى قدر من الحفاظ على الأنسجة.",
    image: IMG.brain,
    description:
      "استئصال دقيق بالمجهر الجراحي للأورام الحميدة والخبيثة بالمخ، يجمع بين التصوير أثناء العملية والملاحة العصبية لتحقيق أقصى استئصال ممكن للورم مع حماية الأنسجة السليمة والوظائف الحيوية للمخ.",
    benefits: [
      "أقصى استئصال للورم مع أقل تأثير على الأنسجة السليمة",
      "تصوير لحظي أثناء العملية لتحقيق أعلى دقة",
      "مراجعة من فريق متعدد التخصصات لكل حالة",
      "تقليل مخاطر المضاعفات العصبية",
    ],
    process: [
      "استشارة أولية وتقييم عصبي كامل",
      "تصوير متقدم بالرنين المغناطيسي والأشعة المقطعية وتخطيط جراحي ثلاثي الأبعاد",
      "استئصال الورم بالمجهر الجراحي تحت الملاحة العصبية",
      "متابعة ما بعد العملية ومراجعة نتيجة الفحص النسيجي",
    ],
    recovery: "2 – 6 أسابيع",
    duration: "3 – 6 ساعات",
  },
  {
    id: "spinal-fusion",
    title: "دمج الفقرات واستبدال الأقراص",
    shortDescription: "دمج فقرات واستبدال أقراص طفيف التوغل لاستعادة الثبات والحركة.",
    image: IMG.disc,
    description:
      "تثبيت طفيف التوغل أو استبدال الأقراص الصناعية لعلاج تنكس الأقراص، والانزلاق الغضروفي، وعدم ثبات العمود الفقري، لاستعادة الحركة مع تخفيف الألم المزمن.",
    benefits: [
      "شقوق أصغر وتلف أقل بالعضلات",
      "خيارات استبدال الأقراص للحفاظ على حركة العمود الفقري",
      "تخفيف كبير ودائم للألم",
      "إقامة أقصر بالمستشفى مقارنة بالجراحة المفتوحة التقليدية",
    ],
    process: [
      "استشارة مع مراجعة صور العمود الفقري",
      "تجربة علاج غير جراحي عند الاقتضاء",
      "إجراء دمج الفقرات أو استبدال القرص طفيف التوغل",
      "علاج طبيعي موجّه ومتابعة دورية",
    ],
    recovery: "4 – 8 أسابيع",
    duration: "2 – 4 ساعات",
  },
  {
    id: "neuro-endoscopy",
    title: "المناظير العصبية طفيفة التوغل",
    shortDescription: "تقنيات المنظار بفتحات دقيقة لتعافٍ أسرع وتقليل الرضح الجراحي.",
    image: IMG.epilepsy,
    description:
      "الوصول بالمنظار عبر فتحات دقيقة لعلاج أورام الغدة النخامية واستسقاء الدماغ وبعض الحالات القحفية المختارة — علاج الحالات العميقة عبر ممرات طبيعية بأقل تأثير على الأنسجة.",
    benefits: [
      "دون ندوب ظاهرة في معظم الحالات",
      "تقليل كبير في الرضح الجراحي",
      "وقت عملية أقصر للحالات المؤهلة",
      "عودة أسرع للأنشطة اليومية",
    ],
    process: [
      "تصوير تفصيلي لتأكيد مدى ملاءمة العلاج بالمنظار",
      "تخطيط ما قبل العملية مع الفريق الجراحي",
      "إجراء المنظار عبر ممر طبيعي أو بأقل تدخل",
      "الحركة في نفس اليوم أو اليوم التالي للعملية",
    ],
    recovery: "1 – 3 أسابيع",
    duration: "1.5 – 3 ساعات",
  },
  {
    id: "epilepsy",
    title: "جراحة الصرع واضطرابات الحركة",
    shortDescription: "تشخيص دقيق وعلاج جراحي للصرع المقاوم للأدوية واضطرابات الحركة.",
    image: IMG.diagnostic,
    description:
      "رسم تشخيصي دقيق وعلاج جراحي للصرع المقاوم للأدوية واضطرابات الحركة مثل مرض باركنسون، بما يشمل الجراحة الاستئصالية والتحفيز العميق للمخ.",
    benefits: [
      "التخلص من النوبات أو تقليل تكرارها بشكل كبير",
      "تقليل الاعتماد على جرعات الأدوية العالية",
      "تحسن في التحكم الحركي لاضطرابات الحركة",
      "رسم شامل للنوبات قبل الجراحة",
    ],
    process: [
      "مراقبة بالفيديو وتخطيط كهربية المخ ورسم النوبات",
      "مراجعة الفريق متعدد التخصصات المعني بالصرع",
      "الجراحة الاستئصالية أو زراعة الجهاز",
      "متابعة عصبية طويلة الأمد",
    ],
    recovery: "2 – 4 أسابيع",
    duration: "3 – 5 ساعات",
  },
  {
    id: "pediatric",
    title: "جراحة الأعصاب للأطفال",
    shortDescription: "رعاية جراحية متخصصة للحالات العصبية الخلقية والمكتسبة لدى الأطفال.",
    image: IMG.suite,
    description:
      "رعاية جراحية متخصصة للحالات العصبية الخلقية والمكتسبة لدى الرضع والأطفال، تُقدَّم في بيئة مصممة لراحة الطفل وسلامته.",
    benefits: [
      "بروتوكولات وتجهيزات جراحية مخصصة للأطفال",
      "تواصل يضع الأسرة في محور الاهتمام طوال الرعاية",
      "رعاية منسّقة مع أطباء الأطفال المتخصصين",
      "متابعة طويلة الأمد للنمو والتطور",
    ],
    process: [
      "تقييم عصبي مخصص للأطفال",
      "تصوير وتخطيط ملائم لعمر الطفل",
      "الجراحة مع دعم تخدير مخصص للأطفال",
      "برنامج متابعة للنمو والتطور",
    ],
    recovery: "تختلف حسب نوع العملية",
    duration: "تختلف حسب نوع العملية",
  },
  {
    id: "peripheral-nerve",
    title: "جراحة الأعصاب الطرفية",
    shortDescription: "إصلاح وترميم دقيق بالمجهر الجراحي للأعصاب الطرفية المصابة أو المضغوطة.",
    image: IMG.spine,
    description:
      "إصلاح وتخفيف ضغط وترميم دقيق بالمجهر الجراحي للأعصاب الطرفية المصابة أو المضغوطة، لاستعادة الإحساس والوظيفة الحركية المتأثرة بالإصابة أو الانحباس العصبي.",
    benefits: [
      "استعادة الإحساس والوظيفة الحركية",
      "تخفيف الألم العصبي المزمن",
      "دقة جراحية دقيقة تحت التكبير العالي",
      "خطة تأهيل مخصصة لكل حالة",
    ],
    process: [
      "دراسات التوصيل العصبي والتقييم السريري",
      "التخطيط الجراحي حسب نوع الإصابة",
      "إصلاح أو تخفيف الضغط بالمجهر الجراحي",
      "تأهيل منظم ومتابعة تعافي الأعصاب",
    ],
    recovery: "6 – 12 أسبوعًا",
    duration: "1.5 – 4 ساعات",
  },
  {
    id: "stroke",
    title: "جراحة السكتة الدماغية والأوعية الدموية العصبية",
    shortDescription: "علاج طارئ واختياري لتمدد الأوعية الدموية والتشوهات الشريانية الوريدية وأمراض الأوعية الدموية العصبية.",
    image: IMG.brain,
    description:
      "علاج جراحي طارئ واختياري لتمدد الأوعية الدموية والتشوهات الشريانية الوريدية وأمراض الأوعية الدموية العصبية الأخرى، مدعوم ببروتوكول استجابة سريعة لحالات السكتة الدماغية.",
    benefits: [
      "بروتوكول استجابة طارئة سريعة للسكتة الدماغية",
      "تصوير وعائي متقدم لتخطيط دقيق",
      "خيارات علاج جراحية مجهرية وقسطرة وعائية",
      "دعم تأهيلي منسّق بعد العلاج",
    ],
    process: [
      "تصوير وعائي طارئ أو اختياري (CTA/MRA)",
      "تخطيط علاجي من فريق الأوعية الدموية",
      "تدخل جراحي مجهري أو بالقسطرة الوعائية",
      "مراقبة عصبية وتأهيل بعد العلاج",
    ],
    recovery: "تختلف حسب شدة الحالة",
    duration: "2 – 6 ساعات",
  },
  {
    id: "robotic-spine",
    title: "جراحة العمود الفقري بمساعدة الروبوت",
    shortDescription: "دقة جراحية دون المليمتر مدعومة بالملاحة الروبوتية والتصوير اللحظي.",
    image: IMG.disc,
    description:
      "دقة جراحية دون المليمتر مدعومة بالملاحة الروبوتية والتصوير ثلاثي الأبعاد اللحظي، لتحسين دقة وضع المسامير والدعامات في عمليات ترميم العمود الفقري المعقدة.",
    benefits: [
      "دقة دون المليمتر في وضع المسامير والدعامات",
      "تقليل التعرض للإشعاع بفضل التصوير المتقدم",
      "شقوق أصغر مقارنة بالأدوات التقليدية",
      "مخاطر أقل من مضاعفات الأدوات الجراحية",
    ],
    process: [
      "تصوير ثلاثي الأبعاد للعمود الفقري وتخطيط جراحي روبوتي",
      "رسم خرائط الأدوات الجراحية المخصصة للمريض",
      "تركيب الأدوات والدمج بالتوجيه الروبوتي",
      "حركة مبكرة وتأهيل موجّه",
    ],
    recovery: "4 – 8 أسابيع",
    duration: "3 – 5 ساعات",
  },
];

export function getServices(lang: Language): Service[] {
  return lang === "ar" ? SERVICES_AR : SERVICES_EN;
}
