"use client";

import { useTranslations } from "@/contexts/i18n-context";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import SkillIcon from "@/components/SkillIcon";
import CategoryFilter from "@/components/CategoryFilter";
import { useMemo } from "react";
import { useSkills } from "@/contexts/skills-context";

type SkillsSectionProps = {};

export default function SkillsSection({}: SkillsSectionProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const { filteredSkills, loading } = useSkills();

  const generateNonOverlappingPositions = (
    count: number,
    iconSize = 64,
    padding = 20,
    maxAttempts = 10000
  ): Array<{ x: number; y: number }> => {
    const spacing = iconSize + padding;
    const estimatedCols = Math.ceil(Math.sqrt(count));
    const areaSize = estimatedCols * spacing * 1.2;

    const positions: Array<{ x: number; y: number }> = [];
    let attempts = 0;

    while (positions.length < count && attempts < maxAttempts) {
      const candidates: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 10; i++) {
        const x = (Math.random() - 0.5) * areaSize;
        const y = (Math.random() - 0.5) * areaSize;
        candidates.push({ x, y });
      }
      candidates.sort((a, b) => {
        const da = Math.sqrt(a.x * a.x + a.y * a.y);
        const db = Math.sqrt(b.x * b.x + b.y * b.y);
        return da - db;
      });
      const selected = candidates.find(({ x, y }) => {
        return !positions.some((p) => {
          const dx = p.x - x;
          const dy = p.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < spacing;
        });
      });
      if (selected) positions.push(selected);
      attempts++;
    }
    return positions;
  };

  const iconCount = filteredSkills.reduce((acc, cat) => acc + cat.skills.length, 0);
  const organicPositions = useMemo(
    () => generateNonOverlappingPositions(iconCount),
    [iconCount, filteredSkills]
  );

  if (loading) {
    return (
      <section
        id="skills"
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
              <div className="font-mono font-bold text-xl text-slate-800 dark:bg-stone-100">
                Loading Skills...
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
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
                {t("section.skills")}
              </h2>
            </div>
          </Tilt>
        </motion.div>

        {filteredSkills.length > 0 && (
          <>
            <div className="mt-8 mb-8">
              <CategoryFilter />
            </div>

            <div className="w-full max-w-4xl mx-auto">
              {/* Desktop: Organic Layout */}
              <div className="hidden md:block relative min-h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {filteredSkills.map((category, categoryIndex) =>
                      category.skills.map((skill, skillIndex) => {
                        const globalIndex =
                          filteredSkills
                            .slice(0, categoryIndex)
                            .reduce((acc, cat) => acc + cat.skills.length, 0) + skillIndex;
                        const position = organicPositions[globalIndex] || { x: 0, y: 0 };

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
                            <SkillIcon
                              skill={skill}
                              category={category.category}
                              index={globalIndex}
                              className="z-0"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile: Grid Layout */}
              <div className="md:hidden">
                {filteredSkills.map((category, categoryIndex) => (
                  <div key={category.category} className="mb-8">
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
                        <h3 className="font-mono font-bold text-xl text-slate-800 dark:text-stone-100 mb-4 text-center">
                          {t(`section.skills.${category.category}`)}
                        </h3>
                      </Tilt>
                    </motion.div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillIcon
                          key={skill.name}
                          skill={skill}
                          category={category.category}
                          index={skillIndex}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
