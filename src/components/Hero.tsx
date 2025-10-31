'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLImageElement | null)[]>([]);
  const circleRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Entrance animation for orbs
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const fromDir = i % 2 === 0 ? -150 : 150;
        gsap.fromTo(
          orb,
          { x: fromDir, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            delay: i * 0.15,
          }
        );
      }
    });

    // Subtle floating on scroll
    orbRefs.current.forEach((orb) => {
      if (orb) {
        const movementX = (Math.random() - 0.5) * 30;
        const movementY = (Math.random() - 0.5) * 30;

        gsap.to(orb, {
          x: movementX,
          y: movementY,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    });

    // Subtle pulsing animation for the circle
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        scale: 1.05,
        duration: 6,
        ease: 'easeInOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center bg-black overflow-hidden"
    >
      {/* Half Circle Background Image */}
      <img
        ref={circleRef}
        src="/circle.png"
        alt="Background Circle"
        className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[110vw] md:w-[85vw] h-auto object-contain opacity-90 z-0 pointer-events-none"
      />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 800 800\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      {/* Floating Orbs */}
      <img
        ref={(el) => (orbRefs.current[0] = el)}
        src="/ball.png"
        alt="orb"
        className="absolute top-[15%] left-[8%] sm:left-[12%] w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 opacity-90"
      />
      <img
        ref={(el) => (orbRefs.current[1] = el)}
        src="/ball.png"
        alt="orb"
        className="absolute top-[20%] right-[8%] sm:right-[15%] w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-90"
      />
      <img
        ref={(el) => (orbRefs.current[2] = el)}
        src="/ball.png"
        alt="orb"
        className="absolute bottom-[15%] left-[14%] sm:left-[20%] w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 opacity-90"
      />
      <img
        ref={(el) => (orbRefs.current[3] = el)}
        src="/ball.png"
        alt="orb"
        className="absolute bottom-[20%] right-[20%] sm:right-[25%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-90"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 sm:px-0">
        <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-tight tracking-tight">
          MockupGen
        </h1>
        <p className="text-gray-300 mt-6 max-w-lg sm:max-w-xl text-base sm:text-lg md:text-xl font-medium leading-relaxed">
          Generate advanced, high-quality mockups instantly from your logo, powered by state-of-the-art AI model that understands design aesthetics like a pro.
        </p>
        <button className="mt-10 bg-cyan-500 text-white font-semibold py-3 px-10 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-cyan-500/30">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
