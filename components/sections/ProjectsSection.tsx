"use client";

import { useTranslations } from "@/contexts/i18n-context";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

type ProjectsSectionProps = {};

export default function ProjectsSection({}: ProjectsSectionProps) {
  const t = useTranslations();
  const { theme } = useTheme();

  return (
    <section
      id="projects"
      className="min-h-screen flex items-start justify-center bg-slate-100 dark:bg-stone-800 pt-24"
    >
      <div className="w-full max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <Tilt
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={800}
            tiltEnable={true}
          >
            <div className="p-4 rounded-lg bg-slate-300 dark:bg-stone-500 inline-block">
              <h2 className="font-mono font-bold text-2xl md:text-4xl text-slate-800 dark:text-stone-100">
                {t("section.projects")}
              </h2>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
