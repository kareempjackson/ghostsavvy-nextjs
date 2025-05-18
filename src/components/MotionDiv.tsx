"use client";

import { motion } from "framer-motion";

/**
 * MotionDiv component wraps Framer Motion's motion.div with 'use client' directive
 * This allows us to use animations in server components by isolating the client code
 */
export const MotionDiv = motion.div;
