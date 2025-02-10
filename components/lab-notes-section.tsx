import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    title: "What is direct air capture?",
    date: "January 24, 2025",
    image: "/placeholder.svg?height=600&width=800",
    href: "/lab-notes/what-is-direct-air-capture",
  },
  {
    title: "What sets Mission Zero apart?",
    date: "January 10, 2025",
    image: "/placeholder.svg?height=600&width=800",
    href: "/lab-notes/mission-zero-difference",
  },
]

export function LabNotesSection() {
  return (
    <section className="bg-[#E6FF00] px-4 py-24 lg:py-32">
      <div className="container">
        <div className="mb-16 space-y-8">
          <div className="inline-block rounded-full bg-white px-4 py-1 text-sm font-medium">Lab Notes</div>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Notes on the carbon revolution
          </h2>
          <Button
            variant="outline"
            className="rounded-full border-2 border-black bg-black text-white transition-colors hover:bg-black/90"
          >
            View more
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-6 md:p-8">
                <time className="text-sm font-medium">{article.date}</time>
                <h3 className="text-xl font-semibold md:text-2xl">{article.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

