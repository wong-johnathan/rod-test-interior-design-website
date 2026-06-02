"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
        style={{ aspectRatio: width / height }}
      >
        <span className="text-xs text-muted-foreground">{alt}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setErrored(true)}
    />
  )
}
