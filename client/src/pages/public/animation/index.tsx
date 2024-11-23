/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Props for the AnimatedComponent
type AnimatedComponentProps = {
  variants: Variants; // Animation variants
  children: ReactNode; // Content to wrap
};

// Main AnimatedComponent
const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ variants, children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Dynamic Slide-In Variant Generator
const createSlideInVariant = (direction: "left" | "right" | "up" | "down"): Variants => {
  const distance = 100; // Distance to slide (in pixels)
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  };

  return {
    hidden: { opacity: 0, ...directions[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8 } },
  };
};

// Other Variants
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -45 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.8 } },
};

export { AnimatedComponent, fadeIn, scaleUp, rotateIn, createSlideInVariant };
