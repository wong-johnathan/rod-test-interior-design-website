"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)
  const primaryImage = project.images[0]

  return (
    <Link href={`/projects/${project.slug}`} className="group block break-inside-avoid mb-4">
      <div className="relative overflow-hidden rounded-xl bg-muted">
        {primaryImage && !imgError ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={primaryImage.width}
            height={primaryImage.height}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-muted"
            style={{ aspectRatio: "4/3" }}
          >
            <span className="text-sm text-muted-foreground">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-sm font-medium text-white truncate">{project.title}</p>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium leading-tight">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-auto">
            {project.style}
          </Badge>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-auto">
            {project.room}
          </Badge>
        </div>
      </div>
    </Link>
  )
}
