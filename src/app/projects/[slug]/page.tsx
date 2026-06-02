import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { projects, getProjectBySlug, styles, rooms } from "@/data/projects"
import {
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Rod's Interior`,
      description: project.description,
      images: [{ url: project.images[0]?.src ?? "" }],
    },
  }
}

/** Determine if a tag matches a known style or room for filtering links */
function getTagFilterLink(tag: string): string {
  const encoded = encodeURIComponent(tag)
  if (styles.includes(tag)) return `/projects?style=${encoded}`
  if (rooms.includes(tag)) return `/projects?room=${encoded}`
  return `/projects?q=${encoded}`
}

/** Find related projects: same style or room, excluding current */
function getRelatedProjects(current: typeof projects[number], max: number = 4) {
  return projects
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.style === current.style || p.room === current.room)
    )
    .slice(0, max)
}

/** Find prev/next siblings in the full projects array */
function getSiblingProjects(currentId: number) {
  const idx = projects.findIndex((p) => p.id === currentId)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const siblings = getSiblingProjects(project.id)
  const related = getRelatedProjects(project)

  return (
    <>
      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl bg-muted ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="h-full w-full object-cover"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Project Info */}
      <section id="project-info" className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Clickable Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Link key={tag} href={getTagFilterLink(tag)}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="size-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              {project.year}
            </span>
            <Link href={`/projects?style=${encodeURIComponent(project.style)}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-colors">
                {project.style}
              </Badge>
            </Link>
            <Link href={`/projects?room=${encodeURIComponent(project.room)}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-colors">
                {project.room}
              </Badge>
            </Link>
            <Link href={`/projects?budget=${encodeURIComponent(project.budget)}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-colors">
                {project.budget}
              </Badge>
            </Link>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>{project.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-t pt-8">
          <div>
            {siblings.prev ? (
              <Link
                href={`/projects/${siblings.prev.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground/60">Previous</p>
                  <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                    {siblings.prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <Link
            href="/projects"
            className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            All Projects
          </Link>
          <div>
            {siblings.next ? (
              <Link
                href={`/projects/${siblings.next.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
              >
                <div className="text-right">
                  <p className="text-xs text-muted-foreground/60">Next</p>
                  <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                    {siblings.next.title}
                  </p>
                </div>
                <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((rp) => (
              <Link key={rp.id} href={`/projects/${rp.slug}`} className="group">
                <Card className="overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {rp.images[0] && (
                      <Image
                        src={rp.images[0].src}
                        alt={rp.images[0].alt}
                        width={rp.images[0].width}
                        height={rp.images[0].height}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-medium truncate">{rp.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
                        {rp.style}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-auto">
                        {rp.room}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="font-heading text-2xl font-semibold">Love This Style?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Let&apos;s bring a similar vision to your space. Reach out for a consultation.
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button variant="secondary" size="lg" className="gap-2">
              Start Your Project
              <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
