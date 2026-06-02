import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/data/blog-posts"
import { CalendarIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | Rod's Interior Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="size-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="size-4" />
            {post.readTime}
          </span>
          <span>{post.author}</span>
        </div>
      </header>

      {/* Featured image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted mb-10">
        <Image
          src={`https://picsum.photos/seed/${post.imageSeed}/1200/675`}
          alt={post.title}
          width={1200}
          height={675}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div
        className="prose prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:font-semibold prose-a:text-primary prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="mt-12 rounded-xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
        <h2 className="font-heading text-xl font-semibold">Ready to Transform Your Space?</h2>
        <p className="mx-auto mt-2 max-w-md text-primary-foreground/80 text-sm">
          Get a free consultation and let's bring your vision to life.
        </p>
        <Link href="/contact" className="mt-5 inline-block">
          <Button variant="secondary" size="lg">
            Book Your Free Consultation
          </Button>
        </Link>
      </div>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between border-t pt-8">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground/60">Previous</p>
              <p className="text-sm font-medium truncate max-w-[200px]">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <div className="text-right">
              <p className="text-xs text-muted-foreground/60">Next</p>
              <p className="text-sm font-medium truncate max-w-[200px]">{next.title}</p>
            </div>
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  )
}
