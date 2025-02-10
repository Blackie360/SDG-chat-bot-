import { motion } from "framer-motion"

interface ScrollHeroProps {
  style: {
    opacity: any
    scale: any
    y: any
  }
}

export function ScrollHero({ style }: ScrollHeroProps) {
  return (
    <motion.div style={style} className="flex h-full flex-col items-center justify-center px-4">
      <div className="container max-w-6xl">
        <div className="mx-auto mb-12 w-full max-w-3xl">
          <svg viewBox="0 0 400 100" className="w-full stroke-white/20" fill="none" strokeWidth="1">
            <rect x="50" y="20" width="300" height="60" />
            <text x="200" y="60" className="fill-white/20 text-2xl" textAnchor="middle" dominantBaseline="middle">
              Mission Zero
            </text>
          </svg>
        </div>
        <h2 className="text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          The world's most versatile direct air capture technology
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/70">
          Our plug-and-play electrochemical solution can efficiently recover historic CO<sub>2</sub> emissions anywhere
          with access to electricity.
        </p>
      </div>
    </motion.div>
  )
}

