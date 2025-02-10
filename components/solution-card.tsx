import Image from "next/image"

interface SolutionCardProps {
  title: string
  description: string
  image: string
}

export function SolutionCard({ title, description, image }: SolutionCardProps) {
  return (
    <div
      className="group relative aspect-square flex-none overflow-hidden rounded-3xl bg-black"
      style={{ width: "min(400px, 80vw)" }}
    >
      <Image
        src="/plant.jpg"
        width={400}
        height={400}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="rounded-2xl bg-white p-6">
          <h3 className="mb-2 text-xl font-semibold text-black">{title}</h3>
          <p className="text-black/70">{description}</p>
        </div>
      </div>
    </div>
  )
}

