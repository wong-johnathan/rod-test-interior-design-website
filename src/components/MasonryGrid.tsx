"use client"

import { useState, useRef, useEffect, useCallback, Fragment } from "react"
import ProjectCard from "@/components/ProjectCard"
import CTACard from "@/components/CTACard"
import type { Project } from "@/data/projects"
import { Loader2 } from "lucide-react"

const BATCH_SIZE = 20
const CTA_INTERVAL = 6

interface MasonryGridProps {
  projects: Project[]
  /** Show a fixed count instead of infinite scroll (e.g. on homepage) */
  fixedCount?: number
}

/** Build interleaved items: project cards + CTAs at every CTA_INTERVAL */
function buildInterleaved(projects: Project[], count: number) {
  const items: Array<{ type: "project"; project: Project } | { type: "cta" }> = []
  const visible = projects.slice(0, count)
  visible.forEach((p, i) => {
    items.push({ type: "project", project: p })
    if ((i + 1) % CTA_INTERVAL === 0) {
      items.push({ type: "cta" })
    }
  })
  return items
}

export default function MasonryGrid({ projects, fixedCount }: MasonryGridProps) {
  const initialCount = fixedCount ?? BATCH_SIZE
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Reset when projects list changes (e.g. filtering on /projects page)
  useEffect(() => {
    setVisibleCount(initialCount)
  }, [projects.length, initialCount])

  const loadMore = useCallback(() => {
    if (loading) return
    setLoading(true)
    // Use requestAnimationFrame to batch the render
    requestAnimationFrame(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, projects.length))
      setLoading(false)
    })
  }, [loading, projects.length])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (fixedCount) return // No infinite scroll if fixed count

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && visibleCount < projects.length && !loading) {
          loadMore()
        }
      },
      {
        rootMargin: "400px", // Start loading before user reaches the bottom
        threshold: 0,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visibleCount, projects.length, loading, loadMore, fixedCount])

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = !fixedCount && visibleCount < projects.length
  const itemsRemaining = projects.length - visibleCount

  return (
    <>
      {/* Mobile / tablet: CSS columns (compact, masonry flow) */}
      <div className="columns-1 gap-4 sm:columns-2 lg:hidden [column-fill:_balance]">
        {visibleProjects.map((project, index) => (
          <Fragment key={project.id}>
            <ProjectCard project={project} priority={index < 8} />
            {(index + 1) % CTA_INTERVAL === 0 && <CTACard key={`cta-mobile-${index}`} />}
          </Fragment>
        ))}
      </div>

      {/* Desktop (lg+): CSS grid — CTAs span full width */}
      <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
        {buildInterleaved(visibleProjects, visibleCount).map((item, idx) => {
          if (item.type === "cta") {
            return (
              <div key={`cta-${idx}`} className="lg:col-span-3 xl:col-span-4">
                <CTACard />
              </div>
            )
          }
          return <ProjectCard key={item.project.id} project={item.project} priority={idx < 8} />
        })}
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="mt-8 flex items-center justify-center">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading more projects...
          </div>
        )}
        {!loading && hasMore && (
          <button
            onClick={loadMore}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Show {Math.min(itemsRemaining, BATCH_SIZE)} more projects ({itemsRemaining} remaining)
          </button>
        )}
        {!hasMore && !fixedCount && visibleCount > 0 && (
          <p className="text-sm text-muted-foreground/60">
            Showing all {projects.length} projects
          </p>
        )}
      </div>
    </>
  )
}
