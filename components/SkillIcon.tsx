"use client"

import { useState, useRef, useLayoutEffect } from "react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"
import { DynamicIcon } from "@/components/DynamicIcon"

interface Skill {
  name: string
  icon: string
  proficiency: number
}

interface SkillIconProps {
  skill: Skill
  category: string
  index: number
  className?: string
}

export default function SkillIcon({ skill, category, index, className = "" }: SkillIconProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const iconRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (showTooltip && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      const tooltipWidth = 120 // Approximate tooltip width
      const tooltipHeight = 40 // Approximate tooltip height

      setTooltipPosition({
        x: rect.left + rect.width / 2 - tooltipWidth / 2,
        y: rect.top - tooltipHeight - 8, // 8px gap above the icon
      })
    }
  }, [showTooltip])

  const containerSize = Math.max(48, 48 + (skill.proficiency / 10) * 16) // Scale from 48px to 64px based on proficiency
  const circumference = 2 * Math.PI * ((containerSize - 4) / 2)
  const strokeDashoffset = circumference - (skill.proficiency / 10) * circumference

  return (
    <>
      <motion.div
        ref={iconRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`relative cursor-pointer ${className}`}
        style={{ width: containerSize, height: containerSize }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Proficiency Ring */}
        <svg className="absolute inset-0 -rotate-90" width={containerSize} height={containerSize}>
          {/* Background circle */}
          <circle
            cx={containerSize / 2}
            cy={containerSize / 2}
            r={(containerSize - 4) / 2}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-slate-300 dark:text-stone-600"
          />
          {/* Progress circle */}
          <motion.circle
            cx={containerSize / 2}
            cy={containerSize / 2}
            r={(containerSize - 4) / 2}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-blue-500"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, delay: index * 0.05 + 0.5 }}
            strokeLinecap="round"
          />
        </svg>

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <DynamicIcon
            iconName={skill.icon}
            size={Math.floor(containerSize * 0.4)}
            className="text-slate-800 dark:text-stone-100"
          />
        </div>
      </motion.div>

      {/* Tooltip */}
      {showTooltip &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed z-50 px-2 py-1 text-sm font-medium text-white bg-slate-900 rounded shadow-lg pointer-events-none"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            {skill.name} ({skill.proficiency}/10)
          </div>,
          document.getElementById("tooltip-root") || document.body,
        )}
    </>
  )
}
