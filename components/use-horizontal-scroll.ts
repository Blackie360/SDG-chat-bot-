"use client"

import { useEffect, useState } from "react"

export function useHorizontalScroll(horizontalRef: React.RefObject<HTMLDivElement>) {
  const [scrollRange, setScrollRange] = useState(0)
  const [horizontalScrollRange, setHorizontalScrollRange] = useState(0)

  useEffect(() => {
    if (horizontalRef.current) {
      setScrollRange(horizontalRef.current.scrollWidth)
    }
  }, [horizontalRef.current]) // Added horizontalRef.current to dependencies

  useEffect(() => {
    const handleResize = () => {
      if (horizontalRef.current) {
        setHorizontalScrollRange(horizontalRef.current.scrollWidth - window.innerWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [horizontalRef.current]) // Added horizontalRef.current to dependencies

  return { scrollRange, horizontalScrollRange }
}

