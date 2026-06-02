"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import MasonryGrid from "@/components/MasonryGrid"
import FilterBar from "@/components/FilterBar"
import { projects as allProjects, getFilteredProjects } from "@/data/projects"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"

interface ProjectsClientProps {
  initialStyle?: string
  initialRoom?: string
  initialBudget?: string
  initialQuery?: string
}

export default function ProjectsClient({
  initialStyle,
  initialRoom,
  initialBudget,
  initialQuery,
}: ProjectsClientProps) {
  const router = useRouter()
  const [style, setStyle] = useState(initialStyle ?? "all")
  const [room, setRoom] = useState(initialRoom ?? "all")
  const [budget, setBudget] = useState(initialBudget ?? "all")
  const [query, setQuery] = useState(initialQuery ?? "")

  const filtered = useMemo(() => {
    let result = getFilteredProjects(
      style === "all" ? undefined : style,
      room === "all" ? undefined : room,
      budget === "all" ? undefined : budget
    )

    // Text search across title, style, room, tags, description, location
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q) ||
          p.room.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      )
    }

    return result
  }, [style, room, budget, query])

  const handleStyleChange = useCallback(
    (val: string | null) => {
      const v = val ?? "all"
      setStyle(v)
      if (v !== "all") router.push(`/projects?style=${encodeURIComponent(v)}`, { scroll: false })
      else router.push("/projects", { scroll: false })
    },
    [router]
  )

  const handleRoomChange = useCallback(
    (val: string | null) => {
      const v = val ?? "all"
      setRoom(v)
      if (v !== "all") router.push(`/projects?room=${encodeURIComponent(v)}`, { scroll: false })
      else router.push("/projects", { scroll: false })
    },
    [router]
  )

  const handleBudgetChange = useCallback(
    (val: string | null) => {
      const v = val ?? "all"
      setBudget(v)
      if (v !== "all") router.push(`/projects?budget=${encodeURIComponent(v)}`, { scroll: false })
      else router.push("/projects", { scroll: false })
    },
    [router]
  )

  const clearFilters = useCallback(() => {
    setStyle("all")
    setRoom("all")
    setBudget("all")
    setQuery("")
    router.push("/projects", { scroll: false })
  }, [router])

  const hasActiveFilters = style !== "all" || room !== "all" || budget !== "all" || query.trim() !== ""

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <FilterBar
          style={style}
          room={room}
          budget={budget}
          onStyleChange={handleStyleChange}
          onRoomChange={handleRoomChange}
          onBudgetChange={handleBudgetChange}
        />
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length} of {allProjects.length} projects match
          {style !== "all" && <span className="font-medium"> &middot; Style: {style}</span>}
          {room !== "all" && <span className="font-medium"> &middot; Room: {room}</span>}
          {budget !== "all" && <span className="font-medium"> &middot; Budget: {budget}</span>}
          {query.trim() && <span className="font-medium"> &middot; &quot;{query}&quot;</span>}
          {" "}
          <button
            onClick={clearFilters}
            className="text-primary underline hover:no-underline"
          >
            Clear all
          </button>
        </p>
      )}

      <div className="mt-8">
        {filtered.length > 0 ? (
          <MasonryGrid projects={filtered} />
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">No projects match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-sm text-primary underline hover:no-underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}
