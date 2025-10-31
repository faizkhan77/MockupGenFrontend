'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#030712] via-[#050b18] to-black text-white border-t border-white/10">
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,255,255,0.1),transparent_70%)]"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating gradient lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col gap-16">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MockupGen
            </h3>
            <p className="text-gray-400 mt-2 max-w-xs leading-relaxed">
              Generate stunning mockups instantly using AI — turn your logo into a visual masterpiece.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-cyan-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="/generate" className="hover:text-cyan-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Generator
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-cyan-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Register
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-cyan-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Login
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
              Connect
            </h4>
            <a
              href="https://brainfog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200"
            >
              Careers @ Brainfog
            </a>
            <div className="flex justify-center md:justify-end space-x-5 mt-4">
              <motion.a
                href="https://instagram.com/brainfog"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={22} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/brainfog"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={22} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider Glow Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} MockupGen. All rights reserved.</p>
            <p className="mt-1">
              Crafted with ❤️ by{" "}
              <a
                href="https://brainfog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cyan-400"
              >
                Brainfog
              </a>
            </p>
          </div>
          <div className="flex space-x-5">
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
