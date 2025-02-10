"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projects = [
  {
    location: "Canada",
    title: "Deep Sky",
    subtitle: "Eliminating CO₂",
    description: "Scaling a world-leading carbon removal hub in Canada that turns CO₂ into rock.",
    stats: [
      { value: "1Mt", label: "Annual removal capacity" },
      { value: "2024", label: "Launch date" },
    ],
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    location: "UK",
    title: "University",
    subtitle: "Creating pioneer fuels",
    description: "Pioneering a UK ecosystem for sustainable aviation fuel made from air.",
    stats: [
      { value: "50tCO₂", label: "Annual removal capacity" },
      { value: "2023", label: "Deployed" },
    ],
    image: "/placeholder.svg?height=1080&width=1920",
  },
]

export function ProjectCarousel() {
  return (
    <Carousel className="relative h-screen w-full">
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={index} className="relative h-screen">
            <div className="relative h-full w-full">
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
                    <div key={i} className="overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                        <div className="text-sm text-white/70">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2" />
    </Carousel>
  )
}

