import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// --- Your Demo Image Data ---
// Add up to 10 or more images here. They will be automatically distributed.
const mockupData = [
  { src: '/demos/img1.png', title: 'T-Shirt & Packaging', category: 'Apparel' },
  { src: '/demos/img2.png', title: 'Ceramic Mug', category: 'Drinkware' },
  { src: '/demos/img3.png', title: 'Laptop Sticker Set', category: 'Stationery' },
  { src: '/demos/img4.png', title: 'Branded Tote Bag', category: 'Accessories' },
  { src: '/demos/img5.png', title: 'Coffee Cup Sleeve', category: 'Packaging' },
  { src: '/demos/img6.png', title: 'iPhone Case Design', category: 'Tech' },
  { src: '/demos/img7.png', title: 'Hardcover Notebook', category: 'Stationery' },
  { src: '/demos/img8.png', title: 'Cosmetic Bottle Label', category: 'Product' },
  { src: '/demos/img9.png', title: 'Minimalist Poster Frame', category: 'Decor' },
  { src: '/demos/img10.png', title: 'Business Card Stack', category: 'Branding' },
];

// A reusable Image Card component for our grid
const ImageCard = ({ src, title, category, index }: { src: string; title: string; category: string; index: number }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 group"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
    >
      <img src={src} alt={title} className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-300 opacity-80">{category}</p>
      </div>
    </motion.div>
  );
};

const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  // Refs for the columns to apply GSAP animations
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    // GSAP Parallax Scroll Animation
    const ctx = gsap.context(() => {
      // Use matchMedia for responsive animations
      ScrollTrigger.matchMedia({
        // Desktop animation
        "(min-width: 768px)": function() {
          gsap.fromTo(column1Ref.current, 
            { y: -50 }, 
            { y: 50, ease: 'none', scrollTrigger: { trigger: ".gallery-container", scrub: 1 }}
          );
          gsap.fromTo(column3Ref.current, 
            { y: 50 }, 
            { y: -50, ease: 'none', scrollTrigger: { trigger: ".gallery-container", scrub: 1 }}
          );
        }
      });
    });
    
    // Cleanup GSAP context on component unmount
    return () => ctx.revert();
  }, []);

  // Distribute images into three columns
  const columns = [[], [], []] as typeof mockupData[];
  mockupData.forEach((mockup, index) => {
    columns[index % 3].push(mockup);
  });
  
  const handleCTAClick = () => {
    navigate(isLoggedIn ? '/generate' : '/register');
  };

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-40 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08)_0%,rgba(0,0,50,0.7)_90%)] blur-3xl opacity-50" />
        <div className="relative z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-white to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore the Possibilities
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See what our AI can create. From apparel to packaging, every mockup is a masterpiece waiting to happen.
          </motion.p>
        </div>
      </div>
      
      {/* Parallax Gallery */}
      <div className="gallery-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div ref={column1Ref} className="flex flex-col gap-6">{columns[0].map((mockup, i) => <ImageCard key={i} {...mockup} index={i} />)}</div>
          <div ref={column2Ref} className="flex flex-col gap-6 pt-0 md:pt-16">{columns[1].map((mockup, i) => <ImageCard key={i} {...mockup} index={i} />)}</div>
          <div ref={column3Ref} className="flex flex-col gap-6">{columns[2].map((mockup, i) => <ImageCard key={i} {...mockup} index={i} />)}</div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-32 text-center overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06)_0%,rgba(0,0,50,0.6)_90%)]" />
         <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Create Your Own?</h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                Join thousands of creators and bring your brand's vision to life in seconds.
            </p>
            <motion.button
                onClick={handleCTAClick}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-cyan-500 text-white font-semibold py-3 px-10 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-cyan-500/30"
            >
                Get Started for Free
            </motion.button>
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default DemoPage;