'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CameraIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Portfolio', href: '/gallery' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Wedding Photography', href: '/services#wedding' },
        { name: 'Portrait Sessions', href: '/services#portrait' },
        { name: 'Commercial Photography', href: '/services#commercial' },
        { name: 'Event Coverage', href: '/services#events' },
        { name: 'Photo Editing', href: '/services#editing' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Instagram', href: 'https://instagram.com/kaytee' },
        { name: 'Facebook', href: 'https://facebook.com/kaytee' },
        { name: 'Pinterest', href: 'https://pinterest.com/kaytee' },
        { name: '500px', href: 'https://500px.com/kaytee' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      text: 'hello@kaytee.com',
      href: 'mailto:hello@kaytee.com'
    },
    {
      icon: PhoneIcon,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPinIcon,
      text: 'New York, NY',
      href: '#'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="xl:col-span-2"
          >
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <CameraIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-light text-white tracking-tight">
                    Kaytee
                  </span>
                  <span className="text-xs tracking-widest uppercase text-white/60">
                    Photography
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              Capturing life's most precious moments with artistic vision and technical excellence. 
              Creating timeless imagery that tells your unique story.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 group"
                >
                  <item.icon className="h-4 w-4 text-white/60 group-hover:text-white transition-colors duration-200" />
                  <span className="text-sm">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 + 0.2 }}
              className="xl:col-span-1"
            >
              <h3 className="font-semibold text-white mb-6 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) + 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white transition-colors duration-200"></div>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="xl:col-span-2"
          >
            <h3 className="font-semibold text-white mb-6 text-lg">
              Stay Inspired
            </h3>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Subscribe to receive exclusive photography tips, behind-the-scenes content, 
              and special offers delivered to your inbox.
            </p>
            
            <form className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-200 text-white placeholder-white/40 text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-white/40 text-xs">
                No spam, unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-8xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/50 text-sm"
            >
              © {currentYear} Kaytee Photography. All rights reserved.
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-6 text-sm"
            >
              <Link href="/privacy" className="text-white/50 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/50 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </motion.div>

            {/* Made With Love */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/40 text-sm flex items-center gap-2"
            >
              <span>Captured with</span>
              <div className="w-4 h-4 bg-red-500 rounded-full relative">
                <div className="absolute inset-1 bg-white rounded-full"></div>
              </div>
              <span>in New York</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </footer>
  );
}