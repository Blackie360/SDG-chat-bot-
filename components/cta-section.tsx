"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E5E0DA] to-[#D8D3CD] px-4 py-24 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(230,255,0,0.05),transparent_50%)]" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-2"
        >
          <div>
            <div className="relative">
              <div className="absolute -left-4 top-0 h-16 w-1 bg-[#E6FF00]" />
              <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                Reinvent carbon with us
              </h2>
            </div>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg lg:hidden">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(45deg,rgba(230,255,0,0.1),transparent_50%)]" />
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Scientist working in lab"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/5" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-balance text-xl leading-relaxed text-black/80">
              We partner with pioneering CO<sub>2</sub> users, project developers, engineers, and scientists around the
              world to turn historic carbon waste into new climate value.
            </p>
            <Button
              size="lg"
              className="group mt-8 w-fit rounded-full bg-black text-white transition-all hover:bg-black/90 hover:pr-12"
            >
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-16 hidden aspect-[2/1] overflow-hidden rounded-lg lg:block"
        >
          <div className="absolute inset-0 z-10 bg-[linear-gradient(45deg,rgba(230,255,0,0.1),transparent_50%)]" />
          <img
            src="/placeholder.svg?height=600&width=1200"
            alt="Scientist working in lab"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

