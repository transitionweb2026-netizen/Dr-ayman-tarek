import type { Metadata } from "next";
import { VideosContent } from "./VideosContent";

export const metadata: Metadata = { title: "Videos" };

export default function VideosPage() {
  return <VideosContent />;
}
