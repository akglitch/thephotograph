'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { 
  CameraIcon, 
  HeartIcon, 
  SparklesIcon,
  EyeIcon,
  ClockIcon,
  TrophyIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { number: 8, suffix: '+', label: 'Years of Excellence', description: 'Mastering the craft' },
    { number: 500, suffix: '+', label: 'Projects Completed', description: 'Memories created' },
    { number: 50, suffix: '+', label: 'Awards Won', description: 'Industry recognition' },
    { number: 100, suffix: '%', label: 'Client Satisfaction', description: 'Happy customers' }
  ];

  const values = [
    {
      icon: EyeIcon,
      title: 'Artistic Vision',
      description: 'Seeing beyond the obvious to capture the extraordinary in everyday moments.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HeartIcon,
      title: 'Emotional Connection',
      description: 'Creating images that resonate deeply and tell authentic human stories.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: SparklesIcon,
      title: 'Creative Innovation',
      description: 'Pushing boundaries with unique perspectives and cutting-edge techniques.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ClockIcon,
      title: 'Timeless Quality',
      description: 'Crafting images that remain beautiful and meaningful for generations.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const journey = [
    {
      year: '2016',
      title: 'The Beginning',
      description: 'Started with a simple passion for capturing life\'s beautiful moments'
    },
    {
      year: '2018',
      title: 'First Studio',
      description: 'Opened first professional studio in New York City'
    },
    {
      year: '2020',
      title: 'International Recognition',
      description: 'Awarded International Photography Award for portraiture'
    },
    {
      year: '2024',
      title: 'Present Day',
      description: 'Continuing to create timeless imagery for clients worldwide'
    }
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-4 text-sm uppercase tracking-widest text-white/60 mb-6"
              >
                <div className="w-12 h-px bg-white/30"></div>
                THE ARTIST BEHIND THE LENS
                <div className="w-12 h-px bg-white/30"></div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tight">
                <span className="block">Hello, I'm</span>
                <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  Kaytee
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl"
              >
                A visual storyteller dedicated to transforming fleeting moments into 
                eternal memories. With a camera as my brush and light as my palette, 
                I create art that speaks to the heart and stands the test of time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-6 text-white/60"
              >
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  <span>Based in New York</span>
                </div>
                <div className="flex items-center gap-2">
                  <CameraIcon className="h-5 w-5" />
                  <span>Available Worldwide</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                {/* Main Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <CameraIcon className="h-16 w-16 mx-auto mb-4" />
                    <p>Professional Portrait</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl">
                  <TrophyIcon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl -rotate-12 flex items-center justify-center shadow-2xl">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white/60 text-sm uppercase tracking-widest mb-4 text-center">
            My Story
          </div>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mx-auto">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-8xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              <span className="block">By The</span>
              <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-3">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-4 text-sm uppercase tracking-widest text-gray-500 mb-6">
                  <div className="w-8 h-px bg-gray-300"></div>
                  MY PHILOSOPHY
                  <div className="w-8 h-px bg-gray-300"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  More Than <span className="italic font-serif">Photography</span>
                </h2>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                Photography, for me, is not just about capturing what we see—it's about 
                revealing what we feel. It's the intersection of technical precision and 
                emotional intuition, where light becomes language and moments transform 
                into memories.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Every click of the shutter is a conversation between the seen and the unseen, 
                the said and the unsaid. I believe that the most powerful images are those 
                that continue to speak long after the moment has passed, telling stories 
                that words could never fully capture.
              </p>

              <div className="pt-8">
                <blockquote className="text-2xl font-light text-gray-700 italic border-l-4 border-gray-300 pl-6">
                  "We are making photographs to understand what our lives mean to us."
                </blockquote>
                <cite className="block mt-4 text-gray-500">- Ralph Hattersley</cite>
              </div>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group"
                >
                  <div className={`bg-gradient-to-r ${value.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              <span className="block">My Creative</span>
              <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Journey
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-900 to-gray-300"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">{item.year}</div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Year Marker */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${
                    index % 2 === 0 ? 'translate-x-12' : '-translate-x-12'
                  } bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap`}>
                    {item.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Let's Create <span className="italic font-serif">Together</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your story is unique, and it deserves to be told through images that capture 
              its true essence. Let's collaborate to create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}