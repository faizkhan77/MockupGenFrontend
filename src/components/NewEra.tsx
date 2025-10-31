import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useEffect,useState } from 'react';

// Redesigned NewEra component for MockupGen
// - Modern, responsive, AI-driven mockup generation theme
// - Smooth visuals and transitions with no hard component separation

export default function NewEra() {
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
  return (
    <section className="relative text-white overflow-hidden bg-black/95 py-24 md:py-36">
      {/* Background visuals */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#001219" stopOpacity="1" />
              <stop offset="60%" stopColor="#00131a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
            <filter id="grain">
              <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise" />
              <feColorMatrix type="saturate" values="0" />
              <feBlend in="SourceGraphic" />
            </filter>
            <radialGradient id="orb" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#58fbd8" stopOpacity="0.18" />
              <stop offset="45%" stopColor="#4cc9f0" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2b6cb0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.02" />
          <circle cx="85%" cy="18%" r="180" fill="url(#orb)" />
          <circle cx="10%" cy="80%" r="140" fill="#0ea5a6" opacity="0.03" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left Section: Text */}
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
                generates realistic, high-quality product mockups in seconds. From digital previews to
                photorealistic renders — we make creativity effortless.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-3 bg-white text-black rounded-full px-5 py-3 font-medium shadow-2xl hover:shadow-2xl transition-shadow"
                  onClick={handleGetStartedClick} 
                >
                  Try MockupGen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </motion.a>

               
              </div>

              {/* <div className="mt-6 text-sm text-gray-500">
                <span className="inline-block mr-4">Trusted by creators at</span>
                <div className="inline-flex items-center gap-4 opacity-80">
                  <div className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center text-xs">AI</div>
                  <div className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center text-xs">UX</div>
                  <div className="w-8 h-8 rounded-md bg-white/6 flex items-center justify-center text-xs">DEV</div>
                </div>
              </div> */}
            </motion.div>
          </div>

          {/* Right Section: Visual Representation */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative w-full max-w-lg"
            >
              <div className="absolute -left-8 -top-12 w-48 h-28 rounded-2xl bg-gradient-to-r from-white/4 to-transparent blur-xl transform rotate-6" />

              <div className="relative z-20">
                <div className="rounded-2xl bg-gradient-to-b from-white/6 via-white/4 to-transparent backdrop-blur-md border border-white/6 p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/40 to-blue-500/30 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                        <path d="M8 2v2"></path>
                      </svg>
                    </div>

                    <div>
                      <div className="text-sm text-gray-200 font-semibold">AI Mockup Engine</div>
                      <div className="mt-1 text-xs text-gray-400">Create high-quality designs from your logo instantly.</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <div className="rounded-md overflow-hidden">
                        <div className="aspect-video bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center text-xs text-gray-400">AI Preview</div>
                      </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-3">
                      <div className="rounded-md aspect-square bg-white/6 flex items-center justify-center text-xs text-gray-300">Logo</div>
                      <div className="rounded-md aspect-square bg-white/6 flex items-center justify-center text-xs text-gray-300">Render</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <div>2.4k creators</div>
                    <div className="inline-flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20l9-12H3z"/></svg>
                      <span>Realtime AI</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-8 -bottom-6 bg-gradient-to-br from-cyan-400/20 to-blue-500/12 border border-white/6 rounded-full px-4 py-2 text-xs text-gray-200 shadow-md"
                >
                  Live Mockup
                </motion.div>
              </div>

              <div className="absolute right-[-12%] top-[-8%] w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/8 to-transparent blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-white font-semibold">98.9%</span>
              <span className="text-gray-400">AI Accuracy</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold">Under 3s</span>
              <span className="text-gray-400">Mockup generation</span>
            </div>
          </div>

          {/* <div className="flex items-center gap-6 opacity-80">
            <div className="text-gray-400">Powered by AI-driven creativity</div>
            <a className="underline text-gray-300" href="#">Explore technology</a>
          </div> */}
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-16 -z-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0 0 C 300 40 900 40 1200 0 L1200 60 L0 60 Z" fill="rgba(255,255,255,0.02)" />
        </svg>
      </div>
    </section>
  );
}