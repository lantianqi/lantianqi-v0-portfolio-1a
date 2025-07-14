"use client"

import { useTranslations } from "@/contexts/i18n-context"
import { useTheme } from "next-themes"
import ThemeSwitcher from "./ThemeSwitcher"
import LanguageSwitcher from "./LanguageSwitcher"
import { motion } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

type HeaderProps = {}

export default function Header({}: HeaderProps) {
  const t = useTranslations()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { key: "nav.home", href: "#landing" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.resume", href: "#resume" },
    { key: "nav.contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-100/90 dark:bg-stone-800/90 backdrop-blur-xl border-b border-slate-300 dark:border-stone-500"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-mono font-bold text-xl text-slate-800 dark:text-stone-100"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-sans font-normal text-slate-600 dark:text-stone-200 hover:text-slate-800 dark:hover:text-stone-100 transition-colors"
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-300 dark:bg-stone-500 text-slate-800 dark:text-stone-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 px-4 font-sans font-normal text-slate-600 dark:text-stone-200 hover:text-slate-800 dark:hover:text-stone-100 hover:bg-slate-300 dark:hover:bg-stone-500 rounded-lg transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
