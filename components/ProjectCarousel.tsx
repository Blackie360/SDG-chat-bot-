"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface Project {
  id: number;
  location: string;
  title: string;
  description: string;
  subtitle?: string;
  metrics: {
    value: string;
    label: string;
  }[];
  imageUrl: string;
  background?: string;
}

const projects: Project[] = [
  {
    id: 1,
    location: "Canada",
    title: "Deep Sky",
    subtitle: "Eliminating CO₂",
    description: "Scaling a world-leading carbon removal hub in Canada that turns CO₂ into rock.",
    metrics: [
      { value: "250tCO₂", label: "Annual removal capacity" },
      { value: "2024", label: "Scheduled delivery" },
    ],
    imageUrl: "/deep-sky.jpg",
  },
  {
    id: 2,
    location: "UK",
    title: "O.C.O Technology",
    subtitle: "Building with air",
    description: "Developing pathways to turn historic CO₂ into carbon-negative building materials.",
    metrics: [
      { value: "250tCO₂", label: "Annual removal capacity" },
      { value: "2024", label: "Scheduled delivery" },
    ],
    imageUrl: "/oco-tech.webp",
  },
  {
    id: 3,
    location: "UK",
    title: "O.C.O Technology",
    subtitle: "Building with air",
    description: "Developing pathways to turn historic CO₂ into carbon-negative building materials.",
    metrics: [
      { value: "250tCO₂", label: "Annual removal capacity" },
      { value: "2024", label: "Scheduled delivery" },
    ],
    imageUrl: "/plant.jpg",
  },
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) =>
      (prevIndex + newDirection + projects.length) % projects.length
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <div className="overflow-hidden relative h-[600px] md:h-[700px] rounded-3xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute w-full h-full"
          >
            <Card className="w-full h-full overflow-hidden border-0 shadow-none">
              <CardContent className="p-0 h-full">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="p-12 md:p-16 flex flex-col justify-center bg-slate-700">
                    <div className="space-y-8">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white text-sm font-medium">
                        {projects[currentIndex].location}
                      </span>
                      <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold text-white">
                          {projects[currentIndex].title}
                        </h2>
                        {projects[currentIndex].subtitle && (
                          <h3 className="text-3xl md:text-4xl font-bold text-white">
                            {projects[currentIndex].subtitle}
                          </h3>
                        )}
                        <div className="relative">
                          <div className="absolute inset-0 bg-black opacity-50"></div>
                          <div className="relative z-10">
                            <p className="text-lg md:text-xl text-white/90">
                              {projects[currentIndex].description}
                            </p>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                              {projects[currentIndex].metrics.map((metric, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="text-4xl font-bold text-white">
                                    {metric.value}
                                  </div>
                                  <div className="text-sm text-white/80">
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-full bg-cover bg-center relative cursor-pointer"
                    style={{
                      backgroundImage: `url(${projects[currentIndex].imageUrl})`,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <AnimatePresence>
                      {isHovering && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute"
                          style={{ 
                            x: mousePosition.x - 48, 
                            y: mousePosition.y - 48 
                          }}
                        >
                          <Button className="w-24 h-24 rounded-full bg-[#E5FF44] hover:bg-[#E5FF44]/90 text-black">
                            View
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black hover:bg-gray-100"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black hover:bg-gray-100"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCarousel;