import {
  Award,
  Brain,
  Cloud,
  Code,
  Compass,
  Eye,
  FileText,
  FlaskConical,
  Globe,
  Handshake,
  HeadphonesIcon,
  Heart,
  LifeBuoy,
  Lightbulb,
  LineChart,
  Network,
  Palette,
  PenTool,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Globe,
  Smartphone,
  LayoutDashboard: LineChart,
  Lightbulb,
  LifeBuoy,
  Network,
  PenTool,
  Rocket,
  Brain,
  Cloud,
  ShoppingCart,
  Award,
  Zap,
  Users,
  Eye,
  TrendingUp,
  Shield,
  ShieldCheck,
  Compass,
  Search,
  FileText,
  Palette,
  FlaskConical,
  HeadphonesIcon,
  Handshake,
  Heart,
  Wallet,
  LineChart,
  BadgeCheck: Award,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = iconMap[name] || Code;
  return <Icon className={className} aria-hidden="true" />;
}