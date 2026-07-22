import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactContent />;
}
