"use client"

import { FaReact, FaJs, FaNodeJs, FaPython } from "react-icons/fa"
import {
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
} from "react-icons/si"
import { Code } from "lucide-react"

interface DynamicIconProps {
  iconName: string
  size?: number
  className?: string
}

const iconMap = {
  FaReact,
  FaJs,
  FaNodeJs,
  FaPython,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiScikitLearn: SiScikitlearn,
  SiPandas,
}

export function DynamicIcon({ iconName, size = 24, className = "" }: DynamicIconProps) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Code

  return <IconComponent size={size} className={className} />
}

export default DynamicIcon
