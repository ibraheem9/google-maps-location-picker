/**
 * Geo Blueprint Design — SectionHeader
 * Section header with stamp badge and description.
 */

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  description: string;
}

export default function SectionHeader({ badge, badgeColor = "oklch(0.55 0.15 250)", title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {badge && (
        <div className="stamp-badge mb-4" style={{ color: badgeColor }}>
          {badge}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3"
        style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
        {title}
      </h2>
      <p className="text-base leading-relaxed max-w-2xl"
        style={{ color: "oklch(0.45 0.02 250)" }}>
        {description}
      </p>
    </div>
  );
}
