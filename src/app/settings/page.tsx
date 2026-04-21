export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage personal preferences and dashboard configuration here.
        </p>
      </section>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Settings content can be expanded here later.
        </p>
      </div>
    </div>
  );
}