import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MasonryGrid from "@/components/MasonryGrid"
import StickyCTA from "@/components/StickyCTA"
import { projects } from "@/data/projects"
import { ArrowRightIcon } from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-4">
            Award-Winning Design Studio
          </Badge>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Spaces That
            <br />
            <span className="text-muted-foreground">Tell Your Story</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We craft interiors that balance beauty with function — transforming houses into homes and
            commercial spaces into destinations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/projects">
              <Button size="lg" className="gap-2">
                View Portfolio
                <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline-flex items-center gap-1"
          >
            View All <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
        <MasonryGrid projects={projects} />
      </section>

      <StickyCTA />
    </>
  )
}
