"use client"

import * as LucideIcons from "lucide-react"
import * as ReactIcons from "react-icons/si"

interface DynamicIconProps {
  iconName: string
  size?: number
  className?: string
}

export function DynamicIcon({ iconName, size = 24, className = "" }: DynamicIconProps) {
  // Try Lucide icons first
  const LucideIcon = (LucideIcons as any)[iconName]
  if (LucideIcon) {
    return <LucideIcon size={size} className={className} />
  }

  // Try React Icons (Simple Icons)
  const ReactIcon = (ReactIcons as any)[iconName]
  if (ReactIcon) {
    return <ReactIcon size={size} className={className} />
  }

  // Fallback to a default icon
  return <LucideIcons.Code size={size} className={className} />
}

// Also export as default for backward compatibility
export default DynamicIcon
