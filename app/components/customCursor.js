'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'view', 'hide'
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check what we are hovering over
      const target = e.target;
      if (!target) return;

      if (target.closest('article')) {
        setCursorState('view');
      } else if (target.closest('button') || target.closest('a') || target.tagName === 'BUTTON') {
        setCursorState('hover');
      } else if (target.closest('.lightbox-image')) {
          setCursorState('default');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setCursorState('hide');
    const handleMouseEnter = () => setCursorState('default');

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseleave', handleMouseLeave);
      document.body.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      border: '0px solid rgba(255, 255, 255, 0)',
    },
    hover: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    view: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '0px solid rgba(255, 255, 255, 0)',
    },
    hide: {
      opacity: 0,
      scale: 0,
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      {cursorState === 'view' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] font-sans font-bold tracking-[0.2em] text-black"
        >
          VIEW
        </motion.span>
      )}
    </motion.div>
  );
}
