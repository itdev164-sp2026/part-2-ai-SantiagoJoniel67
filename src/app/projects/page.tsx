import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

type ProjectRecord = {
  id: string | number
  title: string | null
  description: string | null
  status: string | null
}

const statusStyles: Record<string, string> = {
  active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  completed: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  archived: "border-border bg-muted text-muted-foreground",
}

function getStatusClassName(status: string | null) {
  const normalizedStatus = status?.toLowerCase() ?? "archived"

  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
    statusStyles[normalizedStatus] ?? statusStyles.archived
  )
}

function getProjectTitle(title: string | null) {
  return title?.trim() || "Untitled project"
}

function getProjectDescription(description: string | null) {
  return description?.trim() || "No description provided yet."
}

export default async function ProjectsPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, status")

  if (error) {
    return (
      <div className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Projects </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A focused view for featured work, case studies, and ongoing builds.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              Supabase returned an error while fetching the projects table.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const projects = (data ?? []) as ProjectRecord[]

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Project Dashboard</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              A focused view for featured work, case studies, and ongoing builds.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
        </div>
      </section>

      {projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No projects found</CardTitle>
            <CardDescription>
              Add records to the projects table in Supabase to populate this view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This dashboard section is ready for content, but the table is currently empty.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="transition-shadow duration-200 hover:shadow-md">
              <CardHeader>
                <span className={getStatusClassName(project.status)}>
                  {project.status?.toLowerCase() ?? "archived"}
                </span>
                <CardTitle>{getProjectTitle(project.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{getProjectDescription(project.description)}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}