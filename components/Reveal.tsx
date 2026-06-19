"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 1, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 1, y: 14, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={reduce ? undefined : groupVariants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return <MotionTag className={className} variants={reduce ? undefined : itemVariants}>{children}</MotionTag>;
}

export function RevealHeading({
  text,
  className,
  as = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <MotionTag className={className}>{text}</MotionTag>;
  }

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 1, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: EASE,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {text.split(" ").map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="mr-[0.22em] inline-block">
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function RevealEyebrow({
  children,
  className,
  as = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 1, x: -8 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealSubtext({
  children,
  className,
  delay = 0.1,
  as = "p",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "p" | "div" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 1, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
