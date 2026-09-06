import {
  Code,
  Globe,
  Smartphone,
  LayoutDashboard,
  Lightbulb,
  LifeBuoy,
  Network,
  PenTool,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Globe,
  Smartphone,
  LayoutDashboard,
  Lightbulb,
  LifeBuoy,
  Network,
  PenTool,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = iconMap[name] || Code;
  return <Icon className={className} aria-hidden="true" />;
}