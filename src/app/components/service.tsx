"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

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
      illustration: "/images/TJsurya-02.webp",
      position: "right"
    },
    {
      number: 3,
      title: "Personalized Flight Planning",
      description: "We understand that every trip has unique requirements, ensuring a seamless and efficient travel experience as per private jet flights.",
      illustration: "/images/TJsurya-03.webp",
      position: "left"
    },
    {
      number: 4,
      title: "Customized Experiences",
      description: "Whether it's celebrating a special occasion or seeking a truly one-of-a-kind adventure, our team is dedicated to turning your dreams into reality during your private jet flights.",
      illustration: "/images/Nakastra3.webp",
      position: "right"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 ">
      <h2 
        ref={titleRef}
        className={`text-4xl font-bold text-center text-gray-900 mb-16 transition-all duration-1000 ease-out ${
          titleAnimated 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        Our Services
      </h2>
      
      <div className="relative">
        {/* Animated Zigzag Connecting Line */}
        <div ref={lineRef} className="hidden md:block absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2">
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
        </div>

        {steps.map((step, index) => (
          <div 
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            data-step={step.number}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              step.position === 'right' ? 'md:flex-row-reverse' : ''
            } transition-all duration-1000 ease-out ${
              animatedSteps.includes(step.number) 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : step.position === 'right' 
                  ? 'opacity-0 translate-y-12 translate-x-12' 
                  : 'opacity-0 translate-y-12 -translate-x-12'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Step Number Circle */}
            <div className="flex-shrink-0 mb-6 md:mb-0 relative z-10">
              <div className={`w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg transition-all duration-700 ease-out ${
                animatedSteps.includes(step.number) 
                  ? 'scale-100 rotate-0' 
                  : 'scale-75 rotate-180'
              }`} style={{ transitionDelay: `${index * 300 + 100}ms` }}>
                {step.number}
              </div>
            </div>

            {/* Step Content */}
            <div className={`flex-1 px-6 md:px-12 ${step.position === 'right' ? 'md:text-right' : 'md:text-left'} transition-all duration-800 ease-out ${
              animatedSteps.includes(step.number) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`} style={{ transitionDelay: `${index * 300 + 200}ms` }}>
              <h3 className="text-2xl font-bold underline text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                {step.description}
              </p>
            </div>

            {/* Step Illustration */}
            <div className="flex-shrink-0 mt-6 md:mt-0">
              <div className={`relative transition-all duration-800 ease-out ${
                animatedSteps.includes(step.number) 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-95 rotate-3'
              }`} style={{ transitionDelay: `${index * 300 + 300}ms` }}>
                <Image 
                  src={step.illustration} 
                  alt={`Step ${step.number}`} 
                  width={300} 
                  height={300}
                  className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
                />
                {/* Decorative elements */}
                {/* <div className={`absolute -top-4 -right-4 w-8 h-8 bg-teal-100 rounded-full opacity-60 transition-all duration-600 ${
                  animatedSteps.includes(step.number) ? 'scale-100' : 'scale-0'
                }`} style={{ transitionDelay: `${index * 300 + 500}ms` }}></div>
                <div className={`absolute -bottom-4 -left-4 w-6 h-6 bg-blue-100 rounded-full opacity-60 transition-all duration-600 ${
                  animatedSteps.includes(step.number) ? 'scale-100' : 'scale-0'
                }`} style={{ transitionDelay: `${index * 300 + 600}ms` }}></div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;