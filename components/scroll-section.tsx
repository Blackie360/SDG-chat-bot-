"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [horizontalScrollRange, setHorizontalScrollRange] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

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
      setClientHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${scrollRange + clientHeight * 4}px` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="flex h-full flex-col items-center justify-center px-4">
          <div className="container max-w-6xl">
            <div className="mx-auto mb-12 w-full max-w-3xl">
              <svg viewBox="0 0 400 100" className="w-full stroke-white/20" fill="none" strokeWidth="1">
                <rect x="50" y="20" width="300" height="60" />
                <text x="200" y="60" className="fill-white/20 text-4xl font-bold" textAnchor="middle" dominantBaseline="middle">
                  Mission Zero
                </text>
              </svg>
            </div>
            <h2 className="text-balance text-center text-6xl font-bold tracking-tight text-white lg:text-7xl">
              The world&apos;s most versatile direct air capture technology
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-center text-xl text-white/70">
              Our plug-and-play electrochemical solution can efficiently recover historic CO<sub>2</sub> emissions
              anywhere with access to electricity.
            </p>
          </div>
        </motion.div>

        <motion.div ref={horizontalRef} style={{ x }} className="absolute top-0 flex h-screen w-[300vw]">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex h-full w-screen items-center justify-center">
              <div className="container max-w-7xl px-6">
                <h2 className="mb-6 text-balance text-7xl font-bold tracking-tight text-white">
                  Carbon that works for climate
                </h2>
                <p className="mb-12 max-w-2xl text-xl text-white/70">
                  That CO<sub>2</sub> is then permanently removed or used to displace fossil carbons in products and
                  processes.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      width={800}
                      height={600}
                      src="/placeholder.svg"
                      alt="Permanent removal illustration"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="bg-white/10 backdrop-blur-lg p-8">
                      <h3 className="text-3xl font-semibold text-white mb-4">Permanent removal</h3>
                      <p className="text-lg text-white/70">Locking historic CO<sub>2</sub> emissions into rock underground.</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden">
                    <Image
                      width={800}
                      height={600}
                      src="/placeholder.svg"
                      alt="Building materials illustration"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="bg-white/10 backdrop-blur-lg p-8">
                      <h3 className="text-3xl font-semibold text-white mb-4">Building materials</h3>
                      <p className="text-lg text-white/70">Using atmospheric carbon to create urban carbon sinks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}