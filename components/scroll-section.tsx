"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [horizontalScrollRange, setHorizontalScrollRange] = useState(0);
  const [clientHeight, setClientHeight] = useState(0); // New state for client height

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [100, 0, 0, -100]);
  const x = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, -horizontalScrollRange / 2, -horizontalScrollRange, -horizontalScrollRange]
  );

  useEffect(() => {
    if (horizontalRef.current) {
      setScrollRange(horizontalRef.current.scrollWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (horizontalRef.current) {
        setHorizontalScrollRange(horizontalRef.current.scrollWidth - window.innerWidth);
      }
      setClientHeight(window.innerHeight); // Update client height on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${scrollRange + clientHeight * 4}px` }} // Use clientHeight from state
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ ...{ opacity, scale, y } }} className="flex h-full flex-col items-center justify-center px-4">
          <div className="container max-w-6xl">
            <div className="mx-auto mb-12 w-full max-w-3xl">
              <svg viewBox="0 0 400 100" className="w-full stroke-white/20" fill="none" strokeWidth="1">
                <rect x="50" y="20" width="300" height="60" />
                <text x="200" y="60" className="fill-white/20 text-2xl" textAnchor="middle" dominantBaseline="middle">
                  Mission Zero
                </text>
              </svg>
            </div>
            <h2 className="text-balance text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The world&apos;s most versatile direct air capture technology
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/70">
              Our plug-and-play electrochemical solution can efficiently recover historic CO<sub>2</sub> emissions
              anywhere with access to electricity.
            </p>
          </div>
        </motion.div>

        <motion.div ref={horizontalRef} style={{ x }} className="absolute top-0 flex h-screen w-[300vw]">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex h-full w-screen items-center justify-center">
              <div className="container max-w-6xl">
                <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Carbon that works for climate - Section {index}
                </h2>
                <p className="mb-12 max-w-2xl text-lg text-white/70">
                  That CO<sub>2</sub> is then permanently removed or used to displace fossil carbons in products and
                  processes.
                </p>
                <div className="flex gap-6 overflow-x-auto pb-6">
                  {[
                    {
                      title: `Permanent removal ${index}`,
                      description: "Locking historic CO2 emissions into rock underground.",
                      image: "/placeholder.svg?height=400&width=600",
                    },
                    {
                      title: `Building material ${index}`,
                      description: "Using atmospheric carbon to create urban carbon sinks.",
                      image: "/placeholder.svg?height=400&width=600",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="relative flex-none rounded-lg bg-white/5 backdrop-blur-sm"
                      style={{ width: "min(400px, 80vw)" }}
                    >
                      <Image width={600} height={400}
                        src={card.image || "/placeholder.svg"}
                        alt=""
                        className="aspect-[3/2] rounded-t-lg object-cover"
                      />
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-semibold text-white">{card.title}</h3>
                        <p className="text-white/70">{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      
    </section>
  );
}
