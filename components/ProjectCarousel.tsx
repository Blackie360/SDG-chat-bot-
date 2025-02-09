"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

interface Project {
  id: number;
  location: string;
  title: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    location: 'Canada',
    title: 'Deep Sky',
    description: 'Eliminating CO₂\nScaling a world-leading carbon removal hub in Canada that turns CO₂ into rock.',
    metrics: [
      {
        value: '250',
        label: 'Annual removal capacity'
      },
      {
        value: '2024',
        label: 'Scheduled delivery'
      }
    ],
    imageUrl: '/project-image.jpg' // Replace with your image path
  },
  // Add more projects as needed
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      <div className="overflow-hidden relative h-[600px] md:h-[700px] rounded-xl">
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
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <Card className="w-full h-full overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-slate-100">
                    <div className="space-y-6">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white text-sm font-medium">
                        {projects[currentIndex].location}
                      </span>
                      <h2 className="text-4xl md:text-6xl font-bold">
                        {projects[currentIndex].title}
                      </h2>
                      <p className="text-lg md:text-xl text-gray-600 whitespace-pre-line">
                        {projects[currentIndex].description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        {projects[currentIndex].metrics.map((metric, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="text-4xl font-bold">{metric.value}</div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${projects[currentIndex].imageUrl})` }}
                  />
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
          className="rounded-full bg-white hover:bg-gray-100"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white hover:bg-gray-100"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCarousel;