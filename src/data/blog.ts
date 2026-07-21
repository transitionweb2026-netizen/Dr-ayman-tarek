export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  image: string;
}

const IMG = {
  brain: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj_BLuiyILw1YhqAC3tRIDF2988vEFMbdp2CShPuVIiDUoHM1kMzpKG_4i0s5CUQUmeVMDWsJnumLQFXXrf0m-Mjl34wizujbVZdXvUYuolvYMi8YyTkj8UyYy6owS1CMhwr6GhKZvbQVx4zQYVu5JL4WeKrZ9IM5Qa-npZXsG-RmAevHAwlFxJCgUchdKulNiNaTwgXXFMihF3Ca3g_TTGj18eVkdNijbGyFBcA_Ydb9qTxI01BtA",
  spine: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTn3cyqUNe0ocnTjAZNiU5K9DqBl7NhprA_LEZLFZdsfYHOSUvWgG4z5ly_9fRYrWBfOch68eVi6fVDiJRcEZ9QKfi5Hj6oqaqOVKEMusztlkmYqVhxRwvogyhNcuiel8bNSOj3TtidYMdw9NdHd_55yE7p3rVGC-iaOvAyZV5tB3ohCj8Zkhed11RQnRdpdNgf5A1NfHSeO6erTwhaMrdCajgAonxI05DC1TiGTJj3Yd5T0EZsOmC",
  suite: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9",
  epilepsy: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP6klrdOkaqLvlrfoMX7AfD2Ic6H8jgwmKRZypU2FjhK07NPZMQ2pij14DYs6TqVdsQ22uvX0yGm-3_Mz9rDK-ZvQOTzYvMUCqWdenca9F4lD5Ocq8LJiVMMuxbuzeH-nT1oHMiyczcIdSqFeExP1eGrfiAs7NB-VsTV1HlmTpETg9JIRyWRIiFQg5F79aCEvZkhTKDZBF-NMypOxuu7ASYLJexGp_rWY6OSjF8d8G_LLu6Ze9dc1",
  disc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC42DEKTaJe4KxQbrNk7_4N3r0uR17-UWvsiLQT9WN28BJjyNIf9oMv97lm1Q8CGg8qn6Up0qmxsaW4aC2ssTp6J-he9nwGHBfzPwnpUe76ZruS-_QHzTZPRVLGzDOgRIPW8_HAbZlOQuWwmDQTLgUMu-aKclM0mZFCe-rJ-OelKL5pLACXDbF6hkocNBqDF7npayc5mKjEOOMjgdOjrHIO0mnQXNstc-VUj9lgw_gxArPZFJUD8htb",
  diagnostic: "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk",
};

export const FEATURED_ARTICLE: BlogArticle = {
  id: "future-of-neurosurgery",
  title: "The Future of Neurosurgery: Where Robotics Meets Precision",
  category: "Technology",
  date: "Dec 2, 2024",
  readingTime: "7 min read",
  excerpt:
    "From AI-assisted diagnostics to sub-millimeter robotic navigation, the tools reshaping modern neurosurgery are changing what's possible for patients with even the most complex conditions. Here's a look at the technologies moving from research labs into daily practice, and what they mean for surgical outcomes over the next decade.",
  image: IMG.diagnostic,
};

export const ARTICLES: BlogArticle[] = [
  {
    id: "robotic-neurosurgery-explained",
    title: "Robotic Neurosurgery Explained",
    category: "Robotic Neurosurgery",
    date: "Nov 24, 2024",
    readingTime: "5 min read",
    excerpt:
      "How robotic navigation systems give surgeons real-time 3D guidance during complex cranial and spinal procedures, translating into fewer complications and more predictable recovery times.",
    image: IMG.diagnostic,
  },
  {
    id: "spine-surgery-options",
    title: "Understanding Your Spine Surgery Options",
    category: "Spine Surgery",
    date: "Nov 16, 2024",
    readingTime: "6 min read",
    excerpt:
      "From minimally invasive fusion to artificial disc replacement, a clear breakdown of the modern surgical options available for chronic back and neck pain, and how surgeons decide between them.",
    image: IMG.spine,
  },
  {
    id: "brain-tumor-diagnosis",
    title: "What Happens After a Brain Tumor Diagnosis",
    category: "Brain Tumors",
    date: "Nov 8, 2024",
    readingTime: "8 min read",
    excerpt:
      "A patient-friendly guide to the weeks following diagnosis — how imaging determines the treatment plan, the difference between benign and malignant tumors, and what to ask at your first consultation.",
    image: IMG.brain,
  },
  {
    id: "epilepsy-surgery-candidates",
    title: "Who Is a Candidate for Epilepsy Surgery?",
    category: "Epilepsy Surgery",
    date: "Oct 30, 2024",
    readingTime: "5 min read",
    excerpt:
      "Drug-resistant epilepsy doesn't always mean a lifetime of seizures. Here's how video-EEG monitoring and functional imaging identify candidates for resective surgery or neuromodulation.",
    image: IMG.epilepsy,
  },
  {
    id: "ai-in-neurosurgery",
    title: "How AI Is Changing Pre-Surgical Planning",
    category: "AI in Neurosurgery",
    date: "Oct 21, 2024",
    readingTime: "6 min read",
    excerpt:
      "Machine-learning-assisted imaging analysis is helping surgical teams map critical structures with greater confidence before the first incision is ever made — here's how it fits into modern practice.",
    image: IMG.disc,
  },
  {
    id: "recovery-after-surgery",
    title: "What Recovery Really Looks Like After Surgery",
    category: "Recovery",
    date: "Oct 13, 2024",
    readingTime: "5 min read",
    excerpt:
      "A realistic, week-by-week look at recovery after neurosurgical procedures — pain management, physical therapy milestones, and the warning signs that warrant a call to your surgical team.",
    image: IMG.suite,
  },
];
