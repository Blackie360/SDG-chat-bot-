"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"



const projects = [
  {
    location: "UK",
    title: "O.C.O Technology",
    subtitle: "Building with air",
    description: "Developing pathways to turn historic CO₂ into carbon-negative building materials.",
    stats: [
      { value: "250tCO₂", label: "Annual removal capacity" },
      { value: "2024", label: "Scheduled delivery" },
    ],
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    location: "Norway",
    title: "Northern Lights",
    subtitle: "Deep storage",
    description: "Permanent geological storage of CO₂ beneath the North Sea.",
    stats: [
      { value: "1.5Mt", label: "Annual storage capacity" },
      { value: "2025", label: "Launch date" },
    ],
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    location: "Germany",
    title: "Carbon Hub",
    subtitle: "Industrial integration",
    description: "Converting captured CO₂ into valuable chemical products.",
    stats: [
      { value: "100kt", label: "Processing capacity" },
      { value: "2024", label: "Operational start" },
    ],
    image: "/placeholder.svg?height=1080&width=1920",
  },
]

function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % projects.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            scale: currentIndex === index ? 1 : 1.1,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: currentIndex === index ? "auto" : "none",
          }}
        >
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-8 md:p-12 lg:p-16">
            <div className="mb-8">
              <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-medium text-black">
                {project.location}
              </span>
            </div>
            <div className="max-w-4xl space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.subtitle}</h3>
              <p className="max-w-2xl text-lg text-white/90">{project.description}</p>
            </div>
            <div className="mt-8 flex gap-8">
              {project.stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="absolute right-1/2 top-1/2 flex h-24 w-24 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#E6FF00] text-black transition-transform hover:scale-110">
              View
            </button>
          </div>
        </motion.div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/40"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/40"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-8" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}

