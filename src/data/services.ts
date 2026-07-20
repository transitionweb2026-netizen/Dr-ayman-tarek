import type { ProcedureCardItem } from "@/components/sections/ProcedureCardGrid";

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

export const SERVICES: Service[] = [
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
