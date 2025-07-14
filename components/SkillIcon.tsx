"use client"

import { motion } from "framer-motion"
import { useState, useRef, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import DynamicIcon from "./DynamicIcon"
import { useTranslations } from "@/contexts/i18n-context"
import type { Skill } from "@/contexts/skills-context"

interface SkillIconProps {
  skill: Skill
  category: string
  index: number
}

export default function SkillIcon({ skill, category, index }: SkillIconProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const iconRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  // Scale icon size based on proficiency (1-10 scale)
  const baseSize = 40
  const scaleFactor = (skill.proficiency / 10) * 0.8 + 0.4 // Scale between 0.4 and 1.2
  const iconSize = Math.round(baseSize * scaleFactor)
  const containerSize = Math.round(iconSize * 1.5)

  // Get category translation
  const getCategoryTranslation = (cat: string) => {
    return t(`section.skills.${cat}`)
  }

  // Set tooltip position when shown
  useLayoutEffect(() => {
    if (showTooltip && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setTooltipPos({
        x: rect.left + rect.width / 2,
        y: rect.top,
      })
    }
  }, [showTooltip])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        <motion.div
          ref={iconRef}
          className="relative flex items-center justify-center rounded-full bg-slate-300 dark:bg-stone-500 hover:bg-slate-400 dark:hover:bg-stone-400 transition-colors cursor-pointer shadow-lg"
          style={{
            width: containerSize,
            height: containerSize,
          }}
          onClick={() => setShowTooltip(!showTooltip)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <DynamicIcon iconName={skill.icon} size={iconSize} className="text-slate-800 dark:text-stone-100" />

          {/* Proficiency ring */}
          <svg className="absolute inset-0 -rotate-90" width={containerSize} height={containerSize}>
            <circle
              cx={containerSize / 2}
              cy={containerSize / 2}
              r={(containerSize - 4) / 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-200 dark:text-stone-600"
            />
            <motion.circle
              cx={containerSize / 2}
              cy={containerSize / 2}
              r={(containerSize - 4) / 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-blue-500 dark:text-blue-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: skill.proficiency / 10 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              style={{
                strokeDasharray: `${2 * Math.PI * ((containerSize - 4) / 2)}`,
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
      {/* Tooltip rendered in portal */}
      {showTooltip &&
        typeof window !== "undefined" &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="p-3 bg-slate-800 dark:bg-stone-200 text-slate-100 dark:text-stone-800 rounded-lg shadow-lg whitespace-nowrap min-w-max"
            style={{
              position: "fixed",
              left: tooltipPos.x - 10,
              top: tooltipPos.y - 50,
              transform: "translate(-50%, -100%)",
              pointerEvents: "auto",
              zIndex: 9999,
            }}
          >
            <div className="text-sm font-mono font-bold">{skill.name}</div>
            <div className="text-xs font-sans font-normal opacity-80">{getCategoryTranslation(category)}</div>
            <div className="text-xs font-sans font-normal">Proficiency: {skill.proficiency}/10</div>
            <div
              className="absolute left-1/2"
              style={{
                top: "100%",
                transform: "translateX(-50%)",
                borderWidth: 4,
                borderStyle: "solid",
                borderColor: "transparent",
                borderTopColor:
                  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "#e7e5e4"
                    : "#1e293b",
              }}
            />
          </motion.div>,
          document.body
        )}
    </>
  )
}
