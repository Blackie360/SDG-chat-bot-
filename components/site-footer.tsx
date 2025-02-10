"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function SiteFooter() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative bg-[#E5E0DA] px-4 pb-32 pt-24 lg:pb-48 lg:pt-32">
      <div className="container relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-24 grid gap-16 lg:grid-cols-2"
        >
          <motion.div variants={item}>
            <Link href="/" className="group mb-16 block w-fit">
              <svg className="h-8" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="20" className="text-2xl font-bold">
                  MissionZero
                </text>
              </svg>
              <div className="h-0.5 w-0 bg-black transition-all group-hover:w-full" />
            </Link>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              The carbon narrative rewritten
            </h2>
          </motion.div>
          <motion.div variants={item} className="flex flex-col justify-end">
            <h3 className="mb-6 text-2xl font-semibold">Sign up to our newsletter</h3>
            <div className="flex max-w-md flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-full border-2 border-black bg-transparent px-6 transition-colors focus:bg-white"
              />
              <Button
                size="lg"
                className="group rounded-full bg-black text-white transition-all hover:bg-black/90 hover:pr-12"
              >
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 border-t border-black/10 pt-8 lg:grid-cols-[1fr,auto,auto]"
        >
          <motion.div variants={item} className="flex flex-wrap gap-8">
            {["Technology", "About", "Projects", "Lab Notes", "Careers"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`} className="group text-sm">
                {item}
                <div className="h-0.5 w-0 bg-black transition-all group-hover:w-full" />
              </Link>
            ))}
          </motion.div>
          <motion.div variants={item} className="flex items-center gap-8">
            <Link href="#" className="group text-sm">
              Legal
              <div className="h-0.5 w-0 bg-black transition-all group-hover:w-full" />
            </Link>
            <div className="flex gap-6">
              <Link href="https://twitter.com" className="rounded-full p-2 transition-colors hover:bg-black/5">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="rounded-full p-2 transition-colors hover:bg-black/5">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
          <motion.div variants={item} className="text-sm text-black/60">
            Copyright Mission Zero Technologies 2025
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1440 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 157.999L48 143.721C96 129.443 192 100.888 288 86.6097C384 72.3317 480 72.3317 576 86.6097C672 100.888 768 129.443 864 129.443C960 129.443 1056 100.888 1152 72.3317C1248 43.7756 1344 14.2781 1392 0L1440 -14.2781V157.999H1392C1344 157.999 1248 157.999 1152 157.999C1056 157.999 960 157.999 864 157.999C768 157.999 672 157.999 576 157.999C480 157.999 384 157.999 288 157.999C192 157.999 96 157.999 48 157.999H0Z"
              fill="#E6FF00"
            />
          </svg>
        </motion.div>
      </div>
    </footer>
  )
}

