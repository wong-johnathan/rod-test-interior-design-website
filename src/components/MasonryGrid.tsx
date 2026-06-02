import ProjectCard from "@/components/ProjectCard"
import CTACard from "@/components/CTACard"
import type { Project } from "@/data/projects"

interface MasonryGridProps {
  projects: Project[]
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {projects.map((project, index) => (
        <>
          <ProjectCard key={project.id} project={project} />
          {(index + 1) % 6 === 0 && <CTACard key={`cta-${index}`} />}
        </>
      ))}
    </div>
  )
}
