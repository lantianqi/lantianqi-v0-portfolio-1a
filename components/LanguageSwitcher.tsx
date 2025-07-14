"use client"

import { useI18n } from "@/contexts/i18n-context"
import { Languages } from "lucide-react"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="p-2 rounded-lg bg-slate-300 dark:bg-stone-500 text-slate-800 dark:text-stone-100 hover:bg-slate-400 dark:hover:bg-stone-400 transition-colors flex items-center gap-2"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-mono font-bold">{locale.toUpperCase()}</span>
    </button>
  )
}
