import { motion } from 'framer-motion';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
}

const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  bounce: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }
};

export function ScrollAnimatedSection({
  children,
  className = "",
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  triggerOnce = false
}: ScrollAnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, 
    triggerOnce 
  });

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation component
interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
}

export function StaggeredList({
  children,
  className = "",
  staggerDelay = 0.1,
  animation = 'fadeUp'
}: StaggeredListProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const variants = animationVariants[animation];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Hover animation wrapper
interface HoverAnimationProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
  rotate?: number;
}

export function HoverAnimation({
  children,
  className = "",
  scale = 1.05,
  y = -5,
  rotate = 0
}: HoverAnimationProps) {
  return (
    <motion.div
      whileHover={{ 
        scale, 
        y, 
        rotate,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}