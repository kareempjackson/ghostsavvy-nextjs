"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className='bg-brand-forest text-brand-white py-20 md:py-32'>
      <div className='container mx-auto px-5vw'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto text-center'
        >
          {/* Section headline */}
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
            Let&apos;s Build Your AI Advantage
          </h2>

          {/* Subtext */}
          <p className='text-lg md:text-xl text-brand-white/80 mb-10 max-w-3xl mx-auto'>
            We&apos;ll scope your use case, define what your agent should do,
            and bring it to life in weeks — not quarters.
          </p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href='/contact'
              className='inline-block bg-brand-sage text-brand-white py-4 px-8 rounded-[4px] font-semibold text-lg hover:bg-brand-sage/90 transition-colors'
            >
              Book Discovery Call
            </Link>
          </motion.div>

          {/* Optional secondary text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='mt-6 text-brand-white/50 text-sm'
          >
            No long-term commitment required. Start with a conversation about
            your goals.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
