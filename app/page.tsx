import { SiteHeader } from "@/components/site-header"
import { CarbonSection } from "@/components/carbon-section"
import { ScrollSection } from "@/components/scroll-section"
import { LabNotesSection } from "@/components/lab-notes-section"
import { PlantSection } from "@/components/plant-section"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ProjectCarousel } from "@/components/project-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative min-h-screen overflow-hidden">
        <SiteHeader />
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-50">
          <source src="https://r2.vidzflow.com/v/dyEQLCzq4u_1080p_1707341914.mp4" type="video/mp4" />
        </video>
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="container px-4 py-32 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
                We are reinventing carbon
                <br />
                for a thriving planet
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/90">
                We develop technology to efficiently recover CO<sub>2</sub> from our atmosphere — anywhere, at any
                scale.
              </p>
              <Button variant="secondary" size="lg" className="bg-[#E6FF00] text-black hover:bg-[#E6FF00]/90">
                Contact
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CarbonSection />
      <ScrollSection />
      <div className="relative h-screen">
        <ProjectCarousel />
      </div>
      <LabNotesSection />
      <PlantSection />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}

