import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import StickyCTA from "@/components/StickyCTA"
import ProjectsClient from "@/components/ProjectsClient"
import { projects } from "@/data/projects"
import { ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of interior design projects across styles, rooms, and budgets.",
}

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Projects
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our portfolio of {projects.length} projects across diverse styles and spaces.
          </p>
        </div>

        <ProjectsClient />
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-muted/50 p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-semibold">Have a Project in Mind?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Let&apos;s create something beautiful together. Tell us about your vision.
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button size="lg" className="gap-2">
              Start Your Project
              <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      <StickyCTA />
    </>
  )
}
