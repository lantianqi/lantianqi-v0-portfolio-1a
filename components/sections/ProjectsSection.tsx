"use client"

import { useTranslations } from "@/contexts/i18n-context"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

type ProjectsSectionProps = {}

export default function ProjectsSection({}: ProjectsSectionProps) {
  const t = useTranslations()
  const { theme } = useTheme()

  return (
    <section id="projects" className="min-h-screen flex items-start justify-center bg-slate-100 dark:bg-stone-800 pt-8">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={800}>
          <div className="p-4 rounded-lg bg-slate-300 dark:bg-stone-500">
            <h2 className="font-mono font-bold text-2xl md:text-4xl text-slate-800 dark:text-stone-100">
              {t("section.projects")}
            </h2>
          </div>
        </Tilt>
      </motion.div>
    </section>
  )
}
