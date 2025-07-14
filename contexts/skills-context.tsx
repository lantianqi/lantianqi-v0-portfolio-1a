"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Skill {
  name: string
  proficiency: number
  icon: string
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

interface SkillsContextType {
  skills: SkillCategory[]
  loading: boolean
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  filteredSkills: SkillCategory[]
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined)

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch("/data/skills.json")
        const data = await response.json()
        setSkills(data)
      } catch (error) {
        console.error("Failed to load skills data:", error)
        // Fallback data in case of error
        setSkills([])
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  const filteredSkills = selectedCategory ? skills.filter((category) => category.category === selectedCategory) : skills

  return (
    <SkillsContext.Provider
      value={{
        skills,
        loading,
        selectedCategory,
        setSelectedCategory,
        filteredSkills,
      }}
    >
      {children}
    </SkillsContext.Provider>
  )
}

export function useSkills() {
  const context = useContext(SkillsContext)
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider")
  }
  return context
}
