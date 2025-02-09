import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-black shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">MissionZero</span>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden gap-10 md:flex">
          {["Technology", "About", "Projects", "Lab Notes", "Careers"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <Button
          variant="secondary"
          className="bg-[#E6FF00] text-black hover:bg-[#E6FF00]/90 transition-colors"
        >
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
    </header>
  )
}
