import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects, getProjectBySlug } from "@/data/projects"
import { MapPinIcon, CalendarIcon, ArrowRightIcon } from "lucide-react"

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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

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
              />
            </div>
          ))}
        </div>
      </section>

      {/* Project Info */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
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
            <Badge variant="outline">{project.style}</Badge>
            <Badge variant="outline">{project.room}</Badge>
            <Badge variant="outline">{project.budget}</Badge>
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>{project.longDescription}</p>
          </div>
        </div>
      </section>

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
