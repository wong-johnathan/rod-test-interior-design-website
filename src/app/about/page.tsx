import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Studio Rod — our philosophy, our process, and the people behind the designs.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Designed with
              <br />
              <span className="text-muted-foreground">Intention</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Studio Rod was founded on a simple belief: great design transforms how we live, work,
              and feel. Every project begins with listening — to the space, to the light, and most
              importantly, to you.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              With over a decade of experience spanning residential, commercial, and hospitality
              projects across three continents, we bring a global perspective to every interior we
              create.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <div
              className="h-full w-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center"
            >
              <span className="font-heading text-6xl font-bold text-muted-foreground/20">SR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-semibold text-center">Our Philosophy</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Listen First",
                description:
                  "We start every project by understanding your lifestyle, tastes, and how you want to feel in your space.",
              },
              {
                title: "Design with Purpose",
                description:
                  "Every element earns its place. We believe in beauty that works — furniture you live in, layouts that flow, details that delight.",
              },
              {
                title: "Sustainable Thinking",
                description:
                  "From material selection to construction practices, we prioritize sustainability without compromising on aesthetics.",
              },
              {
                title: "Collaborative Process",
                description:
                  "You're part of the team. We keep you involved at every stage, from mood boards to final installation.",
              },
              {
                title: "Global Inspiration",
                description:
                  "Our team draws from travels across Japan, Scandinavia, Italy, and beyond — bringing world-class ideas to every project.",
              },
              {
                title: "Details Matter",
                description:
                  "The difference between good and extraordinary is in the details — the way light falls, the feel of a fabric, the perfect proportion.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border bg-background p-6"
              >
                <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-center">Our Process</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Discovery", desc: "We learn about your needs, style preferences, and budget." },
            { step: "02", title: "Concept", desc: "We develop mood boards, layouts, and material palettes." },
            { step: "03", title: "Execution", desc: "We manage procurement, contractors, and installation." },
            { step: "04", title: "Reveal", desc: "We style and photograph your finished space." },
          ].map((phase) => (
            <div key={phase.step} className="rounded-xl border bg-background p-6 text-center">
              <span className="font-heading text-3xl font-bold text-muted-foreground/30">
                {phase.step}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold">{phase.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="font-heading text-2xl font-semibold">Ready to Start?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            We&apos;d love to hear about your project. Book a free consultation today.
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button variant="secondary" size="lg" className="gap-2">
              Get in Touch
              <ArrowRightIcon className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
