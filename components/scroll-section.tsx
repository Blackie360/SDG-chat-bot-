"use client"

import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import { ProjectCarousel } from "@/components/project-carousel"
import { useHorizontalScroll } from "./use-horizontal-scroll"
import { ScrollHero } from "./scroll-hero"
import { SolutionsSection } from "./solutions-section"

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  const { scrollRange, horizontalScrollRange } = useHorizontalScroll(horizontalRef)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Animation transforms
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [100, 0, 0, -100])
  const x = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, -horizontalScrollRange / 2, -horizontalScrollRange])

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${scrollRange + window.innerHeight * 3}px` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <ScrollHero style={{ opacity, scale, y }} />
        <SolutionsSection style={{ x }} horizontalRef={horizontalRef} />
      </div>

      <div className="relative h-screen">
        <ProjectCarousel />
      </div>
    </section>
  )
}

