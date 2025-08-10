"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/contexts/i18n-context"
import { useSkills } from "@/contexts/skills-context"

export default function CategoryFilter() {
  const { skills, selectedCategory, setSelectedCategory } = useSkills()
  const t = useTranslations()

  if (skills.length === 0) {
    return null
  }

  const categories = ["all", ...skills.map((cat) => cat.category)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setSelectedCategory(category === "all" ? null : category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full font-sans font-normal text-sm transition-colors ${
            (category === "all" && selectedCategory === null) || selectedCategory === category
              ? "bg-slate-800 dark:bg-stone-200 text-slate-100 dark:text-stone-800"
              : "bg-slate-300 dark:bg-stone-500 text-slate-800 dark:text-stone-100 hover:bg-slate-400 dark:hover:bg-stone-400"
          }`}
        >
          {category === "all" ? "All" : t(`section.skills.${category}`)}
        </motion.button>
      ))}
    </motion.div>
  )
}
