import {
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lightbulb,
  School,
  ShieldCheck,
  Stethoscope,
  Users
} from "lucide-react";

const icons = {
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lightbulb,
  School,
  ShieldCheck,
  Stethoscope,
  Users
};

export type IconName = keyof typeof icons;

type FeatureCardProps = {
  icon?: string;
  title: string;
  text: string;
};

export function FeatureCard({
  icon = "CheckCircle",
  title,
  text
}: FeatureCardProps) {
  const Icon = icons[(icon as IconName) in icons ? (icon as IconName) : "CheckCircle"];

  return (
    <article className="feature-card">
      <div className="feature-card__icon" aria-hidden="true">
        <Icon size={24} strokeWidth={2} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
