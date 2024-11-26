/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

type AnimatedComponentProps = {
  variants: Variants; 
  children: ReactNode; 
  stagger?: boolean;
  className?: string; 
};

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  variants,
  children,
  stagger = false,
  className = "",
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, 
    triggerOnce: false, 
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={stagger ? parentVariant : variants}
      className={stagger ? className : undefined}
    >
      {children}
    </motion.div>
  );
};

const createSlideInVariant = (direction: "left" | "right" | "up" | "down"): Variants => {
  const distance = 100;
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

const parentVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
    },
  },
};

const childVariant: Variants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 2 } }, 
};

export {
  AnimatedComponent,
  fadeIn,
  scaleUp,
  rotateIn,
  createSlideInVariant,
  parentVariant,
  childVariant,
};
