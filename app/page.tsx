"use client"

import { useTheme } from "next-themes"
import Header from "@/components/Header"
import LandingSection from "@/components/sections/LandingSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ResumeSection from "@/components/sections/ResumeSection"
import ContactSection from "@/components/sections/ContactSection"
import { motion } from "framer-motion"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-100 dark:bg-stone-800"
    >
      <Header />
      <main className="pt-20">
        <LandingSection />
        <SkillsSection />
        <div id="tooltip-root"></div>
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </motion.div>
  )
}
