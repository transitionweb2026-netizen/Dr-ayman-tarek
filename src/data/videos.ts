export interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  thumbnail: string;
  shortDescription: string;
  description: string;
}

export const VIDEOS: Video[] = [
  {
    id: "epilepsy",
    title: "Understanding Epilepsy",
    category: "Epilepsy",
    duration: "6:24",
    date: "October 8, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGP6klrdOkaqLvlrfoMX7AfD2Ic6H8jgwmKRZypU2FjhK07NPZMQ2pij14DYs6TqVdsQ22uvX0yGm-3_Mz9rDK-ZvQOTzYvMUCqWdenca9F4lD5Ocq8LJiVMMuxbuzeH-nT1oHMiyczcIdSqFeExP1eGrfiAs7NB-VsTV1HlmTpETg9JIRyWRIiFQg5F79aCEvZkhTKDZBF-NMypOxuu7ASYLJexGp_rWY6OSjF8d8G_LLu6Ze9dc1",
    shortDescription: "Surgical options explained — when medication isn't enough and what surgery can offer.",
    description:
      "A clear, patient-friendly walkthrough of drug-resistant epilepsy — how it's diagnosed through video-EEG monitoring, and when surgical treatment becomes a realistic option. Dr. Tarek explains the evaluation process, the range of surgical techniques available, and what patients can expect from consultation through recovery.",
  },
  {
    id: "disc-replacement",
    title: "Disc Replacement",
    category: "Spine Care",
    duration: "5:10",
    date: "September 22, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC42DEKTaJe4KxQbrNk7_4N3r0uR17-UWvsiLQT9WN28BJjyNIf9oMv97lm1Q8CGg8qn6Up0qmxsaW4aC2ssTp6J-he9nwGHBfzPwnpUe76ZruS-_QHzTZPRVLGzDOgRIPW8_HAbZlOQuWwmDQTLgUMu-aKclM0mZFCe-rJ-OelKL5pLACXDbF6hkocNBqDF7npayc5mKjEOOMjgdOjrHIO0mnQXNstc-VUj9lgw_gxArPZFJUD8htb",
    shortDescription: "Minimally invasive progress — how artificial disc replacement restores mobility.",
    description:
      "How artificial disc replacement compares to traditional spinal fusion — and why preserving natural spinal motion matters for long-term mobility. This video covers who's a good candidate, what the minimally invasive procedure involves, and typical recovery timelines.",
  },
  {
    id: "robotic-precision",
    title: "Robotic Precision",
    category: "Technology",
    duration: "7:45",
    date: "September 5, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA10COCVRZUzCR5poskQ_iQU3hcQgw2sADo1ajqYliBOgACwocRoZU3uix5Xve7zyPzkt_E85jdr-kBekmHVNZ4fvQy183PKBufdMAH-66Q7_PSQWyYn_uGqt_rG-RngbcUBOneis0gsVCQqM8cifMFpihIw3kJyxeO1Pzjq9dd71nbuECfqO4nZUVZ44miHviRxUktulScPme416YaPYOZqENDae0l-LYab63hUjlOPRtHhSMHHyvk",
    shortDescription: "Inside the modern OR — how robotic navigation improves surgical accuracy.",
    description:
      "A behind-the-scenes look at the robotic navigation systems used in complex spinal and cranial procedures, and how sub-millimeter guided accuracy translates into fewer complications and a faster return to daily life for patients.",
  },
  {
    id: "brain-tumors",
    title: "Understanding Brain Tumors",
    category: "Neuro-Oncology",
    duration: "8:12",
    date: "August 19, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCj_BLuiyILw1YhqAC3tRIDF2988vEFMbdp2CShPuVIiDUoHM1kMzpKG_4i0s5CUQUmeVMDWsJnumLQFXXrf0m-Mjl34wizujbVZdXvUYuolvYMi8YyTkj8UyYy6owS1CMhwr6GhKZvbQVx4zQYVu5JL4WeKrZ9IM5Qa-npZXsG-RmAevHAwlFxJCgUchdKulNiNaTwgXXFMihF3Ca3g_TTGj18eVkdNijbGyFBcA_Ydb9qTxI01BtA",
    shortDescription: "What every patient should know about diagnosis, treatment options, and outlook.",
    description:
      "What every patient should know after a brain tumor diagnosis — the difference between benign and malignant tumors, how imaging guides the treatment plan, and the surgical and non-surgical options available today.",
  },
  {
    id: "back-pain",
    title: "Living With Chronic Back Pain",
    category: "Spine Care",
    duration: "6:50",
    date: "August 2, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTn3cyqUNe0ocnTjAZNiU5K9DqBl7NhprA_LEZLFZdsfYHOSUvWgG4z5ly_9fRYrWBfOch68eVi6fVDiJRcEZ9QKfi5Hj6oqaqOVKEMusztlkmYqVhxRwvogyhNcuiel8bNSOj3TtidYMdw9NdHd_55yE7p3rVGC-iaOvAyZV5tB3ohCj8Zkhed11RQnRdpdNgf5A1NfHSeO6erTwhaMrdCajgAonxI05DC1TiGTJj3Yd5T0EZsOmC",
    shortDescription: "When to consider surgery, and what to try before you do.",
    description:
      "A practical guide to chronic back pain — the conservative treatments worth trying first, the warning signs that suggest something more serious, and how to know when it's time to discuss surgery with a specialist.",
  },
  {
    id: "surgical-suite",
    title: "Inside Our Surgical Suite",
    category: "Facility",
    duration: "4:35",
    date: "July 14, 2024",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDT02aCXBfYCWE8rbwfhuNv_I8eAL7C0AlQUQu0RKPoG3OhOWu6zfPyjGgq6Qkpe2JmNyY7TwRfJL6EBx4DbAF4W2hmpO-4Ry2B7rM4AjafcZGL2IeszWF0bwHj5d_PD_XKC75OpP0uK1lA7CfiRyYNqh3dbKtKci2TnVpbQke6eRod8-2rocqS6KQ8U-UHLgPOjFc8QUlrxDDOZSwI70YJB9TE252FVlkjWd77tdI5MWTU1lFV_yb9",
    shortDescription: "A tour of the advanced neurosurgical technology behind every procedure.",
    description:
      "A short tour of the operating suite where every procedure takes place — from intraoperative imaging equipment to the neuro-critical care unit that supports patients immediately after surgery.",
  },
];
