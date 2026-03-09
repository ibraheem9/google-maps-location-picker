/**
 * Geo Blueprint Design — FeatureCard
 * Card component for displaying features on the overview page.
 * Includes hover glow effect and icon color transition.
 */
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1 h-full"
      style={{
        background: "oklch(1 0 0)",
        borderColor: "oklch(0.88 0.015 250)",
        boxShadow: "0 1px 3px oklch(0.15 0.02 250 / 0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px oklch(0.55 0.15 250 / 0.1)";
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.75 0.08 250)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px oklch(0.15 0.02 250 / 0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.015 250)";
      }}
    >
      <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: "oklch(0.95 0.02 250)" }}>
        <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: "oklch(0.55 0.15 250)" }} />
      </div>
      <h3 className="text-base font-bold mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 250)" }}>
        {description}
      </p>
    </div>
  );
}
