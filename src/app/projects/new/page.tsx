import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">New Project</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Create a new project and save it to the projects table.
        </p>
      </section>

      <div className="max-w-2xl">
        <ProjectForm />
      </div>
    </div>
  )
}
