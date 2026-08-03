/** The clinic's physical branches and its footer/CTA contact email — literal
 * copy the client supplied verbatim (multiple locations, distinct from the
 * single `settings.address` used for maps/schema.org), shared by the
 * Footer's Contact column and the Dr. Ayman Tarek page's final CTA so both
 * stay in sync rather than duplicating the same three lines twice. */
export const CLINIC_LOCATIONS: { en: string; ar: string }[] = [
  { en: "45 El Tamez Street, Dokki, Cairo", ar: "45 ش الدقي – ميدان الدقي" },
  { en: "Centrada Mall, Juhayna Square, Sheikh Zayed", ar: "مول سنترادا - ميدان جهينه - الشيخ زايد" },
  { en: "Nasr City Clinic", ar: "عيادة مدينة نصر" },
];

export const CLINIC_EMAIL = "Aymantarek84@gmail.com";
