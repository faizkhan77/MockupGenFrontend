import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// --- NEW: Array of your demo images ---
// Add or remove image paths here as needed.
const demoImages = [
  '/demos/img5.png',
  '/demos/img2.png',
  '/demos/img3.png',
  '/demos/img4.png', 
];

export default function NewEra() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // --- NEW: Auto-play slideshow logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % demoImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/generate');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="relative text-white overflow-hidden bg-black/95 py-24 md:py-36">
      {/* Background visuals (no changes) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* ... existing SVG background ... */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Section: Text (no changes) */}
          <div className="md:col-span-7 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-white/6 text-xs font-semibold tracking-wide">Introducing • MockupGen</span>
                <span className="text-xs text-gray-400">AI Innovation 2025</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Generate stunning mockups
                <br />
                with the power of AI
              </h2>

              <p className="mt-6 text-gray-300 max-w-xl leading-relaxed">
                MockupGen brings your brand to life. Simply upload your logo, and our advanced AI model
                generates realistic, high-quality product mockups in seconds.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-3 bg-white text-black rounded-full px-5 py-3 font-medium shadow-2xl hover:shadow-cyan-400/30 transition-shadow cursor-pointer"
                  onClick={handleGetStartedClick} 
                >
                  Try MockupGen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT SECTION: UPDATED WITH IMAGE SHOWCASE --- */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true, amount: 0.4 }}
              className="w-full max-w-md" // Adjusted max-width for better fit
            >
              <div className="relative rounded-2xl bg-gradient-to-b from-white/6 via-white/4 to-transparent backdrop-blur-md border border-white/10 p-4 shadow-2xl shadow-black/30">
                {/* Main Image Display */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-900/50">
                  <AnimatePresence>
                    <motion.img
                      key={currentImageIndex}
                      src={demoImages[currentImageIndex]}
                      alt={`Demo Mockup ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnail Previews */}
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {demoImages.map((imgSrc, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-md overflow-hidden transition-all duration-300 ring-2 ring-transparent hover:ring-cyan-400 focus:outline-none focus:ring-cyan-400 ${
                        currentImageIndex === index ? 'ring-cyan-400' : 'ring-white/10'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-black transition-opacity ${currentImageIndex === index ? 'opacity-0' : 'opacity-40 hover:opacity-20'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ... existing bottom SVG curve ... */}
    </section>
  );
}