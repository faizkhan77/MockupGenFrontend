import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// --- Pricing Tier Data ---
// This makes it easy to add or modify plans later.
const pricingData = [
  {
    planName: 'Starter',
    price: '₹0',
    pricePeriod: '/month',
    description: 'Perfect for trying things out and personal projects.',
    features: [
      '10 Mockup Generations per Month',
      'Standard Quality Renders',
      'Access to Core Mockup Library',
      'Includes a Watermark',
    ],
    ctaText: 'Start for Free',
    highlighted: false,
  },
  {
    planName: 'Pro',
    price: '₹499',
    pricePeriod: '/month',
    description: 'For freelancers, designers, and small businesses.',
    features: [
      '200 Mockup Generations per Month',
      'High-Resolution 4K Exports',
      'No Watermarks',
      'Full Mockup Library Access',
      'Priority Email Support',
    ],
    ctaText: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    planName: 'Business',
    price: '₹1,999',
    pricePeriod: '/month',
    description: 'For agencies and teams with demanding needs.',
    features: [
      'Unlimited Mockup Generations',
      'Team Collaboration (3 Seats)',
      'Shared Asset Library',
      'Dedicated Support Manager',
      'Early Access to New Features',
    ],
    ctaText: 'Choose Business',
    highlighted: false,
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* --- Main Container with Animated Background --- */}
      <div className="relative isolate pt-32 pb-24">
        {/* Aurora Background Effect */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <motion.div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00ffff] to-[#0d00ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            animate={{
              x: [0, 100, 0],
              rotate: [30, 45, 30],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* --- Hero Section --- */}
        <div className="mx-auto max-w-2xl text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Simple, transparent pricing. Unlock the full power of AI-driven mockups and elevate your brand.
          </motion.p>
        </div>

        {/* --- Pricing Cards Grid --- */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="isolate grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingData.map((plan, index) => (
              <motion.div
                key={plan.planName}
                className={`relative rounded-3xl p-8 border ${
                  plan.highlighted
                    ? 'border-cyan-400/50 bg-gray-900/40 ring-2 ring-cyan-400/80 shadow-2xl shadow-cyan-500/20'
                    : 'border-white/10 bg-white/5'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={!plan.highlighted ? { y: -10, scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' } : {}}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-white">
                      <Zap size={14} /> Most Popular
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-semibold leading-7">{plan.planName}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">{plan.pricePeriod}</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <CheckCircle className="h-6 w-5 flex-none text-cyan-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-10 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-cyan-500 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline-cyan-500'
                      : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;