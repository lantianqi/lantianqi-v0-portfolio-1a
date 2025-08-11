"use client";

import { useTranslations } from "@/contexts/i18n-context";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState, useEffect } from "react";
import { Download, ZoomIn, ZoomOut, RotateCw, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResumeSectionProps = {};

export default function ResumeSection({}: ResumeSectionProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set the PDF URL
    setPdfUrl('/resume.pdf');
    setIsLoading(false);
  }, []);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      id="resume"
      className="min-h-screen flex items-start justify-center bg-slate-100 dark:bg-stone-800 pt-24"
    >
      <div className="w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8"
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
                {t("section.resume")}
              </h2>
            </div>
          </Tilt>
        </motion.div>

        {/* PDF Viewer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <div className="bg-white dark:bg-stone-900 rounded-lg shadow-lg overflow-hidden">
            {/* PDF Viewer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-slate-600 dark:text-stone-400" />
                <span className="font-medium text-slate-800 dark:text-stone-200">
                  Resume
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="w-full h-[600px] md:h-[800px] bg-slate-100 dark:bg-stone-800">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-600 dark:text-stone-400 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-stone-400">Loading resume...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0"
                    title="Resume PDF"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setError('Failed to load PDF');
                      setIsLoading(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* PDF Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800">
              <p className="text-sm text-slate-600 dark:text-stone-400 text-center">
                Click the download button above to save a copy of the resume
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}