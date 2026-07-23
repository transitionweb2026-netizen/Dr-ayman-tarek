"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui/Card";
import { Tabs } from "@/components/admin/ui/Tabs";
import { ContactSectionsTab } from "./ContactSectionsTab";
import { MessagesTab } from "./MessagesTab";

export default function ContactPageAdmin() {
  const [tab, setTab] = useState("sections");

  return (
    <div>
      <PageHeader title="Contact" description="The /contact page — sections and incoming appointment requests." />
      <div className="mb-6">
        <Tabs tabs={[{ key: "sections", label: "Page Sections" }, { key: "messages", label: "Messages" }]} active={tab} onChange={setTab} />
      </div>
      {tab === "sections" ? <ContactSectionsTab /> : <MessagesTab />}
    </div>
  );
}
