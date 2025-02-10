export function PlantSection() {
  return (
    <section className="relative bg-black py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Take a closer look at our first plant
            </h2>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="https://r2.vidzflow.com/v/KuagvzoUPR_1080p_1732807499.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

