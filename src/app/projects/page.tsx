export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A focused view for featured work, case studies, and ongoing builds.
        </p>
      </section>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Project content can be added here as the dashboard grows.
        </p>
      </div>
    </div>
  );
}