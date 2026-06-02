"use client"

import { useState, useMemo } from "react"
import MasonryGrid from "@/components/MasonryGrid"
import FilterBar from "@/components/FilterBar"
import { projects as allProjects, getFilteredProjects } from "@/data/projects"

export default function ProjectsClient() {
  const [style, setStyle] = useState("all")
  const [room, setRoom] = useState("all")
  const [budget, setBudget] = useState("all")

  const filtered = useMemo(() => {
    return getFilteredProjects(
      style === "all" ? undefined : style,
      room === "all" ? undefined : room,
      budget === "all" ? undefined : budget
    )
  }, [style, room, budget])

  return (
    <>
      <FilterBar
        style={style}
        room={room}
        budget={budget}
        onStyleChange={(v) => setStyle(v ?? "all")}
        onRoomChange={(v) => setRoom(v ?? "all")}
        onBudgetChange={(v) => setBudget(v ?? "all")}
      />
      <div className="mt-8">
        <MasonryGrid projects={filtered} />
      </div>
    </>
  )
}
