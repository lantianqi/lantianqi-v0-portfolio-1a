"use client";

import { useTranslations } from "@/contexts/i18n-context";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Button } from "@/components/ui/button";

type LandingSectionProps = {};

export default function LandingSection({}: LandingSectionProps) {
  const t = useTranslations();
  const { theme } = useTheme();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Get the element's position relative to the document
      const elementTop = el.offsetTop;
      // Scroll to position the section at the top of the viewport (below the header)
      // This ensures all sections start from the same position when scrolled to
      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="landing"
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
              <h1 className="font-mono font-bold text-2xl md:text-4xl text-slate-800 dark:text-stone-100">
                {t("section.landing")}
              </h1>
            </div>
          </Tilt>
        </motion.div>

        <div className="w-full flex flex-col items-center justify-center text-center">
          <p className="mt-6 font-sans font-normal text-slate-600 dark:text-stone-200 text-base md:text-lg max-w-2xl">
            {t("section.landing.tagline")}
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              aria-label={t("section.landing.viewmywork")}
              onClick={() => handleScrollTo("projects")}
              className="bg-slate-800 text-slate-100 hover:bg-slate-700 dark:bg-stone-500 dark:text-stone-100 dark:hover:bg-stone-400"
            >
              {t("section.landing.viewmywork")}
            </Button>
            <Button
              aria-label={t("section.landing.hireme")}
              variant="outline"
              onClick={() => handleScrollTo("contact")}
              className="border-slate-800 text-slate-800 hover:bg-slate-200 dark:border-stone-300 dark:text-stone-100 dark:hover:bg-stone-600"
            >
              {t("section.landing.hireme")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
