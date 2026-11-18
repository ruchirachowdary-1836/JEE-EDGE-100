import { requireUser } from "@/lib/auth";
import { examDateFor } from "@/lib/queries";
import { PageHeader } from "@/components/ui";
import { SettingsForms } from "./SettingsForms";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireUser();
  const { date, profile, settings } = await examDateFor(user.id);
  const iso = new Date(date.getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" subtitle="Your exam date drives the countdown and the 60-day plan." />
      <SettingsForms
        name={user.name}
        email={user.email}
        examDate={iso}
        presets={settings.examDates}
        dailyHours={profile?.dailyHours ?? 6}
        dailyQuestionTarget={profile?.dailyQuestionTarget ?? 60}
      />
    </div>
  );
}
