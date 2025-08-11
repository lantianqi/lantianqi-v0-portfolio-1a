"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Locale = "en" | "zh";

interface Translations {
  en: Record<string, string>;
  zh: Record<string, string>;
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.resume": "Resume",
    "nav.contact": "Contact",
    "section.landing": "Landing Page",
    "section.landing.tagline": "I am Tianqi Lan. I can do AI & fullstack development",
    "section.landing.viewmywork": "View My Work",
    "section.landing.hireme": "Hire Me",
    "section.skills": "Skills",
    "section.skills.fullstack": "Full-Stack",
    "section.skills.database": "Database",
    "section.skills.ml": "Machine Learning",
    "section.projects": "Projects",
    "projects.proj1.title": "Disparity Map - Stereo Images",
    "projects.proj1.desc": "Traditional CV algorithms. Stereo matching. Sliding window. ssd. Cost planes. Cost Volumes. Disparity maps. rms. errors within threshold.",
    "projects.proj1.img": "/assets/images/project1.png",
    "projects.proj2.title": "Twitter Rumor Detector based on BERT",
    "projects.proj2.desc": "Leveraging BERT for natural language processing to identify and mitigate the spread of misinformation on social media platforms.",
    "projects.proj2.img": "/assets/images/project2.png",
    "projects.proj3.title": "Lane Detection",
    "projects.proj3.desc": "Traditional CV algorithms. Color space transformations. Edge detection. Hough transform. Region of interest. Perspective transformation.",
    "projects.proj3.img": "/assets/images/project3.png",
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
    "section.landing.tagline": "我是兰添淇。我可以做AI和全栈开发",
    "section.landing.viewmywork": "我的工作",
    "section.landing.hireme": "与我合作",
    "section.skills": "技能",
    "section.skills.fullstack": "全栈开发",
    "section.skills.database": "数据库",
    "section.skills.ml": "机器学习",
    "section.projects": "项目",
    "projects.proj1.title": "视差图 - 立体图像",
    "projects.proj1.desc": "传统计算机视觉算法。立体匹配。滑动窗口。SSD。代价平面。代价体。视差图。均方根误差。阈值内误差。",
    "projects.proj1.img": "/assets/images/project1.png",
    "projects.proj2.title": "基于BERT的推特谣言检测",
    "projects.proj2.desc": "利用BERT进行自然语言处理，识别并遏制社交媒体平台上的虚假信息传播。",
    "projects.proj2.img": "/assets/images/project2.png",
    "projects.proj3.title": "车道线检测",
    "projects.proj3.desc": "传统计算机视觉算法。颜色空间变换。边缘检测。霍夫变换。感兴趣区域。透视变换。",
    "projects.proj3.img": "/assets/images/project3.png",
    "section.resume": "简历",
    "section.contact": "联系方式",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslations must be used within an I18nProvider");
  }
  return context.t;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
