export function CarbonSection() {
  return (
    <section className="relative bg-black py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-video overflow-hidden rounded-lg lg:aspect-square">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="https://r2.vidzflow.com/v/k2YrMV9fpN_1080p_1708033986.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl">
              From carbon waste to climate value
            </h2>
            <p className="text-balance text-xl leading-relaxed text-white/90">
              The CO<sub>2</sub> in our air can be much more than just harmful waste. In fact, it can make almost
              anything you can think of. If we can turn the atmosphere into the world's default carbon source, we can
              quit fossil fuels and rebalance our climate. At Mission Zero we are already deploying the keystone
              technology for the post-fossil era.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

