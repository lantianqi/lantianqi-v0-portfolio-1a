"use client";

import { useTranslations } from "@/contexts/i18n-context";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

type ProjectsSectionProps = {};

export default function ProjectsSection({}: ProjectsSectionProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      key: "proj1",
      color: "from-slate-400 to-slate-600 dark:from-stone-400 dark:to-stone-600",
    },
    {
      id: 2,
      key: "proj2",
      color: "from-slate-400 to-slate-600 dark:from-stone-400 dark:to-stone-600",
    },
    {
      id: 3,
      key: "proj3",
      color: "from-slate-400 to-slate-600 dark:from-stone-400 dark:to-stone-600",
    },
  ];

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

        {/* Project Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.1)",
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                animate={{
                  scale: 1,
                  filter: "brightness(1)",
                  transition: { duration: 0.05, ease: "easeOut" },
                }}
                onClick={() => setSelectedProject(project.id)}
                className={`
                  group relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-200 ease-out
                  bg-slate-300 dark:bg-stone-500 border-slate-400 dark:border-stone-600
                  hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50
                  ${
                    selectedProject === project.id
                      ? "ring-4 ring-slate-400 dark:ring-slate-600"
                      : ""
                  }
                `}
              >
                {/* Project Image */}
                <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={t(`projects.${project.key}.img`)}
                    alt={t(`projects.${project.key}.title`)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Project Title */}
                <h3 className="font-mono font-bold text-xl text-slate-800 dark:text-stone-100 mb-3">
                  {t(`projects.${project.key}.title`)}
                </h3>

                {/* Project Description */}
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed">
                  {t(`projects.${project.key}.desc`)}
                </p>

                {/* Click Indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-slate-400 dark:bg-stone-600 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popup Modal for Selected Project */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-200 dark:bg-stone-700 text-slate-600 dark:text-stone-400 hover:bg-slate-300 dark:hover:bg-stone-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Project Content */}
                <div className="p-8">
                  {(() => {
                    const project = projects.find((p) => p.id === selectedProject);
                    if (!project) return null;
                    return (
                      <>
                        {/* Large Project Image */}
                        <div
                          className={`w-full h-64 md:h-80 rounded-xl bg-gradient-to-br ${project.color} mb-6 flex items-center justify-center`}
                        >
                          {/* <span className="text-white font-bold text-3xl md:text-4xl">
                            {t(`projects.${project.key}.img`)}
                          </span> */}
                          <img
                            src={t(`projects.${project.key}.img`)}
                            alt={t(`projects.${project.key}.title`)}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Project Title */}
                        <h2 className="font-mono font-bold text-3xl md:text-4xl text-slate-800 dark:text-stone-100 mb-4">
                          {t(`projects.${project.key}.title`)}
                        </h2>

                        {/* Project Description */}
                        <p className="text-slate-600 dark:text-stone-300 text-lg leading-relaxed">
                          {t(`projects.${project.key}.desc`)}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
