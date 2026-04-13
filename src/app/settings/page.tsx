export default function SettingsPage() {
  return (
    <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
        Settings
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Workspace preferences</h1>
      <p className="max-w-2xl text-muted-foreground">
        Use this area for account settings, course preferences, and dashboard configuration.
      </p>
    </section>
  );
}