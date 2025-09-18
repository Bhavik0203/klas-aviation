"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Service = () => {
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);
  const [lineAnimated, setLineAnimated] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepNumber = parseInt(entry.target.getAttribute('data-step') || '0');
            setAnimatedSteps(prev => {
              if (!prev.includes(stepNumber)) {
                return [...prev, stepNumber];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observer for the connecting line
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !lineAnimated) {
            setLineAnimated(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -200px 0px'
      }
    );

    // Observer for the title
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimated) {
            setTitleAnimated(true);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (lineRef.current) {
      lineObserver.observe(lineRef.current);
    }

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
      lineObserver.disconnect();
      titleObserver.disconnect();
    };
  }, [lineAnimated, titleAnimated]);

  const steps = [
    {
      number: 1,
      title: "Luxury in the Air",
      description: "Our luxury aircraft boasts both various cutting-edge technology, and unmatched comfort, ensuring you have the best of everything during your flight to any destination.",
      illustration: "/images/Nakastra2.jpeg",
      position: "left"
    },
    {
      number: 2,
      title: "Fine Dining and Catering",
      description: "From gourmet meals using the finest ingredients to bespoke menus tailored to your preferences, our flying chefs are committed to making each dining experience an unforgettable journey above the clouds.",
      illustration: "/images/means.jpg",
      position: "right"
    },
    {
      number: 3,
      title: "Customized Experiences",
      description: "Whether it's celebrating a special occasion or seeking a truly one-of-a-kind adventure, our team is dedicated to turning your dreams into reality during your private jet flights.",
      illustration: "/images/Nakastra3.webp",
      position: "left"
    },
    {
      number: 4,
      title: "Personalized Flight Planning",
      description: "We understand that every trip has unique requirements, ensuring a seamless and efficient travel experience as per private jet flights.",
      illustration: "/images/TJsurya-02.webp",
      position: "right"
    },
   
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 ">
      <motion.h2 
        className="text-4xl font-bold text-center text-gray-900 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Our Services
      </motion.h2>
      
      <div className="relative">
        {/* Animated Zigzag Connecting Line */}
        <motion.div 
          className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <svg 
            className="w-1 h-full" 
            viewBox="0 0 2 1200" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
                <stop offset="50%" stopColor="#0d9488" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 1 0 
                 L 1 120 
                 L 1 240 
                 L 1 360 
                 L 1 480 
                 L 1 600 
                 L 1 720 
                 L 1 840 
                 L 1 960 
                 L 1 1080 
                 L 1 1200"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeDasharray="12,6"
              fill="none"
              filter="url(#glow)"
              className={`transition-all duration-3000 ease-out ${
                lineAnimated ? 'opacity-100 stroke-dashoffset-0' : 'opacity-0 stroke-dashoffset-100'
              }`}
              style={{
                strokeDashoffset: lineAnimated ? 0 : 100,
                animation: lineAnimated ? 'drawLine 2s ease-in-out' : 'none'
              }}
            />
          </svg>
          <style jsx>{`
            @keyframes drawLine {
              from {
                stroke-dashoffset: 100;
                opacity: 0;
              }
              to {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }
          `}</style>
        </motion.div>

        {steps.map((step, index) => (
          <motion.div 
            key={step.number}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              step.position === 'right' ? 'md:flex-row-reverse' : ''
            }`}
            initial={{ 
              opacity: 0, 
              y: 50, 
              x: step.position === 'right' ? 50 : -50 
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              x: 0 
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Step Number Circle */}
            <motion.div 
              className="flex-shrink-0 mb-6 md:mb-0 relative z-10"
              initial={{ scale: 0.5, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.3,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg"
                whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(20, 184, 166, 0.4)" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {step.number}
              </motion.div>
            </motion.div>

            {/* Step Content */}
            <motion.div 
              className={`flex-1 px-6 md:px-12 ${step.position === 'right' ? 'md:text-right' : 'md:text-left'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.4,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl font-bold underline text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.5
                }}
                viewport={{ once: true }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.6
                }}
                viewport={{ once: true }}
              >
                {step.description}
              </motion.p>
            </motion.div>

            {/* Step Illustration */}
            <motion.div 
              className="flex-shrink-0 mt-6 md:mt-0"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.2 + 0.5,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image 
                  src={step.illustration} 
                  alt={`Step ${step.number}`} 
                  width={300} 
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;