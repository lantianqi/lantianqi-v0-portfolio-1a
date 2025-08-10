"use client"

import { useTranslations } from "@/contexts/i18n-context"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import SkillIcon from "@/components/SkillIcon"
import CategoryFilter from "@/components/CategoryFilter"
import { useMemo } from "react"
import { useSkills } from "@/contexts/skills-context"

type SkillsSectionProps = {}

export default function SkillsSection({}: SkillsSectionProps) {
  const t = useTranslations()
  const { theme } = useTheme()
  const { filteredSkills, loading } = useSkills()

  const generateNonOverlappingPositions = (
    count: number,
    iconSize = 64,
    padding = 20,
    maxAttempts = 10000,
  ): Array<{ x: number; y: number }> => {
    const spacing = iconSize + padding
    const estimatedCols = Math.ceil(Math.sqrt(count))
    const areaSize = estimatedCols * spacing * 1.2

    const positions: Array<{ x: number; y: number }> = []
    let attempts = 0

    while (positions.length < count && attempts < maxAttempts) {
      const candidates: Array<{ x: number; y: number }> = []
      for (let i = 0; i < 10; i++) {
        const x = (Math.random() - 0.5) * areaSize
        const y = (Math.random() - 0.5) * areaSize
        candidates.push({ x, y })
      }
      candidates.sort((a, b) => {
        const da = Math.sqrt(a.x * a.x + a.y * a.y)
        const db = Math.sqrt(b.x * b.x + b.y * b.y)
        return da - db
      })
      const selected = candidates.find(({ x, y }) => {
        return !positions.some((p) => {
          const dx = p.x - x
          const dy = p.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)
          return dist < spacing
        })
      })
      if (selected) positions.push(selected)
      attempts++
    }
    return positions
  }

  const iconCount = filteredSkills.reduce((acc, cat) => acc + cat.skills.length, 0)
  const organicPositions = useMemo(() => generateNonOverlappingPositions(iconCount), [iconCount, filteredSkills])

  if (loading) {
    return (
      <section id="skills" className="min-h-screen flex items-start justify-center bg-slate-100 dark:bg-stone-800 pt-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="font-mono font-bold text-xl text-slate-800 dark:text-stone-100">Loading Skills...</div>
        </motion.div>
      </section>
    )
  }

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-start justify-start bg-slate-100 dark:bg-stone-800 pt-8"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="text-center mb-8 w-full flex justify-center"
        >
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={800}>
            <div className="p-4 rounded-lg bg-slate-300 dark:bg-stone-500 inline-block">
              <h2 className="font-mono font-bold text-2xl md:text-4xl text-slate-800 dark:text-stone-100">
                {t("section.skills")}
              </h2>
            </div>
          </Tilt>
        </motion.div>

        {filteredSkills.length > 0 && (
          <>
            <CategoryFilter />

            <div className="max-w-6xl mx-auto">
              {/* Desktop: Organic Layout */}
              <div className="hidden md:block relative min-h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {filteredSkills.map((category, categoryIndex) =>
                      category.skills.map((skill, skillIndex) => {
                        const globalIndex =
                          filteredSkills.slice(0, categoryIndex).reduce((acc, cat) => acc + cat.skills.length, 0) +
                          skillIndex
                        const position = organicPositions[globalIndex] || { x: 0, y: 0 }

                        return (
                          <div
                            key={`${category.category}-${skill.name}`}
                            className="absolute z-0"
                            style={{
                              left: `calc(50% + ${position.x}px)`,
                              top: `calc(50% + ${position.y}px)`,
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <SkillIcon skill={skill} category={category.category} index={globalIndex} className="z-0" />
                          </div>
                        )
                      }),
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile: Grid Layout */}
              <div className="md:hidden">
                {filteredSkills.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="font-mono font-bold text-xl text-slate-800 dark:text-stone-100 mb-4 text-center">
                      {t(`section.skills.${category.category}`)}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillIcon key={skill.name} skill={skill} category={category.category} index={skillIndex} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
