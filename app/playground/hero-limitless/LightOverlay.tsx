'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

type Props = {
  src: string
  alt?: string
  className?: string
}

export default function LightOverlay({ src, alt = "", className }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100) // delay for effect
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`
        absolute inset-0 z-0 pointer-events-none
        hidden lg:block
        transition-opacity duration-[3000ms] ease-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <Image
        src={src}
        alt={alt}
        priority
        width={1180}
        height={900}
        className={`object-cover object-left ${className ?? ""}`}
        sizes="100vw"
      />
    </div>
  )
}
