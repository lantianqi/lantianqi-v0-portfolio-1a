"use client"

import { useTranslations } from "@/contexts/i18n-context"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

type ContactSectionProps = {}

export default function ContactSection({}: ContactSectionProps) {
  const t = useTranslations()

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-stone-800">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1000}>
          <div className="p-8 rounded-lg bg-slate-300 dark:bg-stone-500">
            <h2 className="font-mono font-bold text-4xl md:text-6xl text-slate-800 dark:text-stone-100">
              {t("section.contact")}
            </h2>
          </div>
        </Tilt>
      </motion.div>
    </section>
  )
}
