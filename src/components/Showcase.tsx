
import gsap from 'gsap';
import React, { useRef, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Showcase: React.FC = () => {
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

  // Use useEffect to run the animation code once the component mounts
  useEffect(() => {
    // A simple, continuous floating animation
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -20, // Move up by 20px
        duration: 3,
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Animate back and forth
        ease: 'power1.inOut', // Smooth easing
      });
    }
  }, []);

  return (
    <section className="relative bg-black text-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Column 1: Text Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            State-of-the-Art AI Mockups, <br /> Instantly.
          </h2>
          <p className="text-gray-400 max-w-lg">
            Welcome to MockupGen. Transform your brand's logo into stunning, professional mockups in seconds. Our advanced AI analyzes your design to generate unique, photorealistic scenes on a variety of products, giving you the perfect visuals for your marketing campaigns.
          </p>
          <button onClick={handleGetStartedClick} className="mt-8 bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors">
            Try The Generator
          </button>
        </div>

        {/* Column 2: Animated Image */}
        <div className="relative flex justify-center items-center">
          {/* Background Aura Effect */}
          {/* A radial gradient that creates the spotlight effect */}
          <div className="absolute w-[600px] h-[600px] bg-radial-gradient from-gray-900/80 via-gray-900/40 to-transparent rounded-full blur-2xl"></div>

          {/* Grain Overlay for the Aura */}
          <div className="absolute inset-0 z-0 opacity-15" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 800 800\' xmlns=\'http://www.w.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.25\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>

          {/* The actual image */}
          <img
            ref={imageRef}
            src="/test.png" // Assumes test.png is in the /public folder
            alt="AI generated art and logos"
            className="relative z-10 w-full max-w-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Showcase;