import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureHighlight: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const decoShapesRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for decorative shapes
  const imageGlowRef = useRef<HTMLDivElement>(null); // Ref for the image glow

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Initial Scroll-Triggered Entrance Animation ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(imageContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
      });

      tl.from(decoShapesRef.current, { // Animate the shapes in
        opacity: 0,
        scale: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, "-=0.7");

      tl.from('.text-anim', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=1.2");

      // --- Continuous Animations (After initial load or scroll-in) ---

      // Continuous subtle float and rotation for decorative shapes
      decoShapesRef.current.forEach((shape, index) => {
        if (shape) {
          gsap.to(shape, {
            y: (Math.random() * 20 - 10), // -10 to 10px vertical movement
            rotation: (index % 2 === 0 ? 5 : -5), // Rotate slightly
            duration: 5 + Math.random() * 3, // Random duration for varied movement
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2, // Stagger start times
          });
        }
      });

      // Subtle pulse/scale for the image glow
      if (imageGlowRef.current) {
        gsap.to(imageGlowRef.current, {
          scale: 1.05,
          opacity: 0.9,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Column 1: Animated Image */}
        <div ref={imageContainerRef} className="relative flex justify-center items-center">
          {/* Cyan Glow Effect - now has a ref */}
          <div ref={imageGlowRef} className="absolute w-[110%] h-[110%] bg-radial-gradient from-cyan-900/80 via-cyan-900/30 to-transparent rounded-full blur-3xl opacity-80"></div>
          
          {/* Decorative Shapes - now using the ref to collect them */}
          <div ref={el => decoShapesRef.current[0] = el} className="absolute -top-10 -left-10 w-24 h-24 bg-gray-800 rounded-2xl -rotate-12"></div>
          <div ref={el => decoShapesRef.current[1] = el} className="absolute -bottom-12 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full"></div>
          <div ref={el => decoShapesRef.current[2] = el} className="absolute top-1/2 -right-16 w-16 h-16 bg-gray-700 rounded-lg rotate-12"></div>
          <div ref={el => decoShapesRef.current[3] = el} className="absolute bottom-10 left-5 w-20 h-20 bg-purple-500/10 rounded-xl rotate-45"></div>

          <img
            src="/test2.png"
            alt="Advanced Mockup Generation"
            className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl"
          />
        </div>

        {/* Column 2: Text Content */}
        <div ref={textContentRef} className="relative z-10">
          <h2 className="text-anim text-4xl md:text-5xl font-bold leading-tight mb-6">
            Where Creativity Meets Automation
          </h2>
          <p className="text-anim text-gray-400 max-w-lg mb-8">
            MockupGen eliminates the tedious parts of design. Simply upload your logo and provide a prompt. Our AI handles the complexities of lighting, perspective, and placement, delivering pixel-perfect results every time.
          </p>
          <ul className="space-y-4">
            <li className="text-anim flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
              <span>Generate 5 unique mockups concurrently.</span>
            </li>
            <li className="text-anim flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
              <span>Photorealistic and high-resolution outputs.</span>
            </li>
            <li className="text-anim flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-cyan-400" />
              <span>Powered by the state-of-the-art Gemini Model.</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default FeatureHighlight;