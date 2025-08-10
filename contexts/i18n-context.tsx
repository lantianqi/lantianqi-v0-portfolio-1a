"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Locale = "en" | "zh"

interface Translations {
  en: Record<string, string>
  zh: Record<string, string>
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.resume": "Resume",
    "nav.contact": "Contact",
    "section.landing": "Landing Page",
    "section.landing.tagline": "Landing Page",
    "section.landing.viewmywork": "Landing Page",
    "section.landing.hireme": "Landing Page",
    "section.skills": "Skills",
    "section.skills.fullstack": "Full-Stack",
    "section.skills.database": "Database",
    "section.skills.ml": "Machine Learning",
    "section.projects": "Projects",
    "section.resume": "Resume",
    "section.contact": "Contact",
  },
  zh: {
    "nav.home": "首页",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.resume": "简历",
    "nav.contact": "联系",
    "section.landing": "首页",
    "section.landing.tagline": "Landing Page",
    "section.landing.viewmywork": "Landing Page",
    "section.landing.hireme": "Landing Page",
    "section.skills": "技能",
    "section.skills.fullstack": "全栈开发",
    "section.skills.database": "数据库",
    "section.skills.ml": "机器学习",
    "section.projects": "项目",
    "section.resume": "简历",
    "section.contact": "联系方式",
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = (key: string): string => {
    return translations[locale][key] || key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useTranslations() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useTranslations must be used within an I18nProvider")
  }
  return context.t
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
