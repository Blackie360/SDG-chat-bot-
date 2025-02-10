import { motion } from "framer-motion"
import { SolutionCard } from "./solution-card"
import type React from "react"

interface SolutionsSectionProps {
  style: {
    x: any
  }
  horizontalRef: React.RefObject<HTMLDivElement>
}

const solutions = [
  {
    title: "Permanent removal",
    description: "Locking historic CO₂ emissions into rock underground.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eVVkpkJjLEV5lnzakQy8rzmRb3sK4f.png",
  },
  {
    title: "Building materials",
    description: "Using atmospheric carbon to create urban carbon sinks.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eVVkpkJjLEV5lnzakQy8rzmRb3sK4f.png",
  },
  {
    title: "E-fuels",
    description: "Creating sustainable fuels from air instead of oil.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eVVkpkJjLEV5lnzakQy8rzmRb3sK4f.png",
  },
]

export function SolutionsSection({ style, horizontalRef }: SolutionsSectionProps) {
  return (
    <motion.div ref={horizontalRef} style={style} className="absolute top-0 flex h-screen w-[200vw]">
      {[1, 2].map((index) => (
        <div key={index} className="flex h-full w-screen items-center justify-center">
          <div className="container max-w-6xl">
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Carbon that works for climate - Section {index}
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-white/70">
              That CO<sub>2</sub> is then permanently removed or used to displace fossil carbons in products and
              processes.
            </p>
            <div className="flex gap-6 overflow-x-auto pb-6">
              {solutions.map((solution, i) => (
                <SolutionCard key={i} {...solution} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

