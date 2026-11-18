import { getSettings } from "@/lib/config";
import { PageHeader } from "@/components/ui";
import { SettingsEditor } from "./SettingsEditor";

export const metadata = { title: "Admin · Exam configuration" };

export default async function AdminSettings() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader title="Exam configuration" subtitle="Update these when NTA publishes the official JEE Main 2027 information bulletin. Every change is validated before saving." />
      <SettingsEditor settings={settings} />
    </div>
  );
}
