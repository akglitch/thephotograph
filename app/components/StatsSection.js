'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [counted, setCounted] = useState(false);

  const stats = [
    { 
      number: 8, 
      suffix: '+', 
      label: 'Years Excellence', 
      description: 'Mastering visual storytelling',
      icon: '🎯'
    },
    { 
      number: 500, 
      suffix: '+', 
      label: 'Projects Completed', 
      description: 'Memories crafted worldwide',
      icon: '✨'
    },
    { 
      number: 100, 
      suffix: '%', 
      label: 'Client Satisfaction', 
      description: 'Exceeding expectations always',
      icon: '⭐'
    },
    { 
      number: 50, 
      suffix: '+', 
      label: 'Awards Received', 
      description: 'Industry recognition earned',
      icon: '🏆'
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="max-w-8xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-4 text-sm uppercase tracking-widest text-white/60 mb-6"
          >
            <div className="w-12 h-px bg-white/30"></div>
            TRUSTED EXCELLENCE
            <div className="w-12 h-px bg-white/30"></div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            <span className="block">Numbers That</span>
            <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Speak Volumes
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Behind every statistic lies a story of dedication, passion, and unwavering commitment to capturing life's most precious moments.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-700 transform hover:-translate-y-3 hover:scale-105">
                
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5, type: "spring" }}
                  className="text-3xl mb-6"
                >
                  {stat.icon}
                </motion.div>

                {/* Animated Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-4"
                >
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.2 + 1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {stat.number}{stat.suffix}
                  </motion.span>
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.2 }}
                  className="text-lg font-semibold text-white mb-3"
                >
                  {stat.label}
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.4 }}
                  className="text-white/60 text-sm leading-relaxed"
                >
                  {stat.description}
                </motion.div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ 
                      x: Math.random() * 100 + '%', 
                      y: Math.random() * 100 + '%',
                      scale: 0 
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 text-white/50">
            <div className="w-16 h-px bg-white/30"></div>
            <span className="text-sm uppercase tracking-widest">Ready to Create Your Story?</span>
            <div className="w-16 h-px bg-white/30"></div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 -left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 -right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    </section>
  );
}