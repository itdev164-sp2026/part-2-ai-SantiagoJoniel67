import {
  Code,
  Cpu,
  Database,
  Layout,
  Palette,
  Rocket,
} from "lucide-react";

const skills = [
  {
    id: 1,
    name: "TypeScript",
    description: "Type-safe JavaScript development",
    icon: Code,
  },
  {
    id: 2,
    name: "React",
    description: "Building interactive user interfaces",
    icon: Layout,
  },
  {
    id: 3,
    name: "Next.js",
    description: "Full-stack React framework",
    icon: Rocket,
  },
  {
    id: 4,
    name: "Tailwind CSS",
    description: "Utility-first CSS styling",
    icon: Palette,
  },
  {
    id: 5,
    name: "Node.js",
    description: "Backend JavaScript runtime",
    icon: Cpu,
  },
  {
    id: 6,
    name: "SQL & Databases",
    description: "Data management and queries",
    icon: Database,
  },
];

export default function DeveloperProfile() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Joniel Santiago</h1>
          <p className="text-lg text-muted-foreground">
            Web Development Student
          </p>
        </div>
        <p className="max-w-2xl text-base leading-relaxed">
          Passionate about building modern web applications with Next.js and
          React. I&apos;m learning full-stack development and exploring
          AI-native development practices to create scalable, user-centric solutions.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ id, name, description, icon: Icon }) => (
            <div
              key={id}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted transition-colors group-hover:bg-primary/10">
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
  );
}
