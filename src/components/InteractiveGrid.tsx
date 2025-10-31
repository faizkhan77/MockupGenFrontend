import React, { useRef, useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const InteractiveGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

    const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

    const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/generate');
    } else {
      navigate('/register');
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Create highly optimized GSAP functions to update the image's transform
    const xTo = gsap.quickTo(image, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(image, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = section.getBoundingClientRect();
      
      // Calculate mouse position relative to the section's center (-0.5 to 0.5)
      const xPercent = (clientX - left) / width - 0.5;
      const yPercent = (clientY - top) / height - 0.5;

      // Define the maximum movement in pixels
      const maxMove = 40;

      xTo(xPercent * maxMove);
      yTo(yPercent * maxMove);
    };

    const handleMouseLeave = () => {
      // Animate back to the center
      xTo(0);
      yTo(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Column 1: Text Content */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            From a Single Logo to a Full Brand Ecosystem.
          </h2>
          <p className="text-gray-400 max-w-lg">
            Your brand is more than just a logo. It's an identity. With MockupGen, you can instantly visualize your assets across a universe of applications—from digital storefronts and social media profiles to Web3 collectibles and community assets. Curate your public image and build a powerful, cohesive brand presence.
          </p>
          <button onClick={handleGetStartedClick} className="mt-8 bg-cyan-500 text-black font-bold py-3 px-6 rounded-full hover:bg-cyan-400 transition-transform hover:scale-105">
            Build Your Digital Identity
          </button>
        </motion.div>

        {/* Column 2: Interactive Image Grid */}
        <div className="relative flex justify-center items-center h-96">
          {/* Background Aura */}
          <div className="absolute w-[600px] h-[600px] bg-radial-gradient from-purple-900/40 via-black to-transparent rounded-full blur-3xl"></div>

          {/* Static Background Grid placeholders */}
          <div className="absolute w-[80%] h-[80%] grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl"></div>
            ))}
          </div>
          
          {/* Floating Parallax Image */}
          <motion.img
            ref={imageRef}
            src="/test3.png" // Assumes test3.png is in /public
            alt="Showcase of digital assets and brand profiles"
            className="relative z-10 w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </div>

      </div>
    </section>
  );
};

export default InteractiveGrid;