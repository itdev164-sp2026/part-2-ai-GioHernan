import {
  Braces,
  Database,
  FileCode2,
  GitBranch,
  Paintbrush2,
  Cpu,
} from "lucide-react";

const skills = [
  {
    name: "CSS",
    icon: Paintbrush2,
  },
  {
    name: "HTML",
    icon: FileCode2,
  },
  {
    name: "JavaScript",
    icon: Braces,
  },
  {
    name: "Git",
    icon: GitBranch,
  },
  {
    name: "SQL",
    icon: Database,
  },
  {
    name: "C++",
    icon: Cpu,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Developer Profile
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Marco Giovanni Flores Hernandez</h1>
        <p className="max-w-2xl text-muted-foreground">
          I am a web development student focused on building clean,
          responsive, and user-friendly websites. I enjoy learning modern
          tools and turning ideas into practical full-stack applications.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="font-medium">{name}</p>
            </div>
          </div>
          ))}
        </div>
      </section>
    </div>
  );
}
