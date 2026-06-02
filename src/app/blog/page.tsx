import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Interior Design Tips & Guides",
  description:
    "Singapore interior design tips, HDB renovation guides, cost breakdowns, and style inspiration from Rod's Interior.",
}

export default function BlogPage() {
  if (blogPosts.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Blog posts coming soon. Check back for interior design tips, renovation guides, and style inspiration.
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Interior Design Blog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Tips, guides, and inspiration for your Singapore home renovation journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border bg-card transition-shadow hover:shadow-md overflow-hidden"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={`https://picsum.photos/seed/${post.imageSeed}/600/338`}
                alt={post.title}
                width={600}
                height={338}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="font-heading text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="size-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
