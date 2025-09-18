"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Service from "./components/service";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0); // First FAQ open by default
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for contact field - only allow 10 digits
    if (name === 'contact') {
      // Remove any non-digit characters and limit to 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  const faqs = [
    {
      question: "How far in advance should I book a flight?",
      answer: "While we can accommodate last-minute requests, we recommend booking at least 4-6 hours in advance for domestic flights and 12-24 hours for international flights to ensure aircraft availability and proper flight planning."
    },
    {
      question: "What's included in the charter price?",
      answer: "Our charter prices include the aircraft, crew, fuel, standard catering, ground handling, and basic insurance. Additional services like premium catering, ground transportation, and overnight crew expenses may incur extra charges."
    },
    {
      question: "Can I bring pets on board?",
      answer: "Yes, we welcome well-behaved pets on our aircraft. Please inform us during booking so we can make appropriate arrangements. Some restrictions may apply based on destination requirements."
    },
    {
      question: "What safety certifications do you have?",
      answer: "All our aircraft and operations are certified by relevant aviation authorities. Our pilots undergo regular training and our aircraft receive comprehensive maintenance following strict industry standards."
    },
    {
      question: "Do you offer empty leg flights?",
      answer: "Yes, we offer empty leg flights at discounted rates when aircraft need to reposition. These flights offer excellent value but have limited flexibility in terms of timing and routing."
    }
  ];

  // Loading screen
  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2 
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            KLAS Aviation
          </motion.h2>
          <motion.p 
            className="text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Elevating your journey...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}>
        <nav className={`container mx-auto px-6 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}>
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              KLAS Aviation
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>About</Link>
              <Link href="#fleet" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>Our Fleet</Link>
              <Link href="#services" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>Services</Link>
              <Link href="#faq" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}>FAQ</Link>
              <Link href="#contact" className={`px-6 py-1 rounded-lg font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-gray-800'
              }`}>Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-800 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className={`py-4 space-y-4 ${
              isScrolled 
                ? 'bg-white/95 backdrop-blur-sm rounded-lg shadow-lg' 
                : 'bg-black/20 backdrop-blur-sm rounded-lg'
            }`}>
              <Link 
                href="#about" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#fleet" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Fleet
              </Link>
              <Link 
                href="#services" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#faq" 
                className={`block px-4 py-2 transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="#contact" 
                className={`block mx-4 px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white hover:text-gray-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-teal-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section 0: About */}
     
      {/* Section 1: Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/bg1.png"
            alt="Luxury Aviation Background"
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        <motion.div 
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Elevate Your Journey
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Experience luxury aviation redefined. Premium private jet services connecting you to the world with unparalleled comfort and sophistication.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button 
              className="bg-blue-600 cursor-pointer text-white px-8 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Book Your Flight
            </motion.button>
            <motion.button 
              className="border-2 border-white cursor-pointer text-white px-8 py-2 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              View Fleet
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      <motion.section 
        id="about" 
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Transworld Jets
                </motion.h2>
                <motion.div 
                  className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: "6rem" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
              
              <motion.div 
                className="prose prose-lg text-gray-600 leading-relaxed space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-xl text-gray-700 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Transworld Jets&apos; hyper-personalized luxury fleet caters to ultra-high-net-worth business and luxury travelers seeking discretion, uncompromising luxury, and bespoke experiences.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Currently, we operate flights to Europe and the Middle East. Our fleet of super midsize business jets will connect Europe, Africa to Asia & the Middle East.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  Our fleet of private jets offers unparalleled comfort, style, and sophistication, ensuring that every journey is a truly unforgettable experience. Additionally, we believe that luxury should extend to every aspect of your journey, including your in-flight dining experience.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Right Content - Aircraft Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/3] relative bg-gradient-to-br from-slate-800 to-slate-900">
                  <Image
                    src="/images/Nakastra1.webp"
                    alt="Nakastra Aircraft - Premium Fleet"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <motion.div 
                    className="absolute bottom-6 left-6 text-white z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Premium Fleet</h3>
                    <p className="text-white/80">Luxury redefined in the skies</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Stats Cards */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Luxury</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Section 2: Our Fleet */}
      <motion.section 
        id="fleet" 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our Premium Fleet
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Discover our collection of world-class aircraft, each meticulously maintained and equipped with the finest amenities for your ultimate comfort.
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Jet Card 1 - TJ Nakashtra */}
            <motion.div 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/TJ-Nakashtra.png"
                  alt="TJ Nakashtra"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Title - hidden on hover */}
                <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-2xl font-bold text-white mb-2">TJ Nakashtra</h3>
                </div>
                
                {/* Hover details */}
                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">TJ Nakashtra</h3>
                  <p className="text-white/90 mb-6 text-center text-sm leading-relaxed">Ultra-long range luxury jet with exceptional comfort and advanced avionics.</p>
                  <div className="text-sm text-white/80 space-y-2 text-center">
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Range: 6,000+ miles
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Capacity: 12-14 passengers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jet Card 2 - TJ Aakash */}
            <motion.div 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/TJ-Aakash.webp"
                  alt="TJ Aakash"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Title - hidden on hover */}
                <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-2xl font-bold text-white mb-2">TJ Aakash</h3>
                </div>
                
                {/* Hover details */}
                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">TJ Aakash</h3>
                  <p className="text-white/90 mb-6 text-center text-sm leading-relaxed">Mid-size excellence with superior performance and luxurious interiors.</p>
                  <div className="text-sm text-white/80 space-y-2 text-center">
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Range: 4,500+ miles
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Capacity: 8-10 passengers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jet Card 3 - TJ Surya */}
            <motion.div 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/TJ-Pushpak.webp"
                  alt="TJ Surya"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Title - hidden on hover */}
                <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-2xl font-bold text-white mb-2">TJ Surya</h3>
                </div>
                
                {/* Hover details */}
                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">TJ Surya</h3>
                  <p className="text-white/90 mb-6 text-center text-sm leading-relaxed">Light jet perfection for short to medium range flights with style.</p>
                  <div className="text-sm text-white/80 space-y-2 text-center">
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Range: 2,500+ miles
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Capacity: 6-8 passengers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jet Card 4 - TJ Vayu */}
            <motion.div 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative h-80">
                <Image
                  src="/images/tj-vayu.webp"
                  alt="TJ Vayu"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Title - hidden on hover */}
                <div className="absolute bottom-6 left-6 right-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="text-2xl font-bold text-white mb-2">TJ Vayu</h3>
                </div>
                
                {/* Hover details */}
                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">TJ Vayu</h3>
                  <p className="text-white/90 mb-6 text-center text-sm leading-relaxed">Super-light jet with exceptional efficiency and modern amenities.</p>
                  <div className="text-sm text-white/80 space-y-2 text-center">
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Range: 1,800+ miles
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      Capacity: 4-6 passengers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Section 4: Call to Action */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/bg2.png"
            alt="Call to Action Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </motion.div>
        <motion.div 
          className="relative z-10 container mx-auto px-6 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Soar Above the Ordinary?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            Experience the pinnacle of luxury aviation. Book your private jet today and discover a new standard of travel excellence.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.button>
            <motion.button 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Call +1 (555) 123-4567
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

    <section id="services">
    <Service/>
    </section>
      {/* Section 3: Our Services */}
      {/* <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From luxury air travel to personalized concierge services, we provide comprehensive solutions for your aviation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Charter Flights</h3>
              <p className="text-gray-600">On-demand private jet charter services to any destination worldwide with flexible scheduling.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Concierge Services</h3>
              <p className="text-gray-600">Personalized travel assistance including ground transportation, hotel bookings, and dining reservations.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Safety & Security</h3>
              <p className="text-gray-600">Highest safety standards with certified pilots, regular maintenance, and comprehensive insurance coverage.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support and flight operations team available for all your travel needs.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Corporate Solutions</h3>
              <p className="text-gray-600">Tailored aviation solutions for businesses including executive travel and corporate jet management.</p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Luxury Amenities</h3>
              <p className="text-gray-600">Premium in-flight services including gourmet catering, entertainment systems, and comfortable seating.</p>
            </div>
          </div>
        </div>
      </section> */}

      
      {/* Section 5: FAQ */}
      <motion.section 
        id="faq" 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Find answers to common questions about our private jet services and booking process.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.01, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    <motion.svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {openFaq === index ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                      )}
                    </motion.svg>
                  </div>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <motion.p 
                        className="text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section 
        id="contact" 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/bg3.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to elevate your journey? Contact us today and let us create an unforgettable aviation experience tailored just for you.
            </motion.p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <label htmlFor="contact" className="block text-white text-sm font-medium mb-2">
                  Contact Number
                </label>
                <motion.input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full px-4 py-3 bg-transparent border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg"
                  placeholder="Enter 10-digit phone number"
                  whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/40 rounded-lg resize-none"
                  placeholder="Tell us about your travel requirements..."
                  whileFocus={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.6)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  className="bg-white text-gray-900 px-8 py-2 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Submit Message
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">KLAS Aviation</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Elevating your journey with premium private jet services. Experience luxury, comfort, and reliability with every flight.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#fleet" className="hover:text-white transition-colors">Our Fleet</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@klasaviation.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Aviation Blvd<br />Airport City, AC 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KLAS Aviation. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
