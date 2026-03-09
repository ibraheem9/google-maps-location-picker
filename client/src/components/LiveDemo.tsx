/**
 * Geo Blueprint Design — LiveDemo
 * Embeds a standalone HTML demo in an iframe with a styled container.
 */
import { useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";

interface LiveDemoProps {
  src: string;
  title: string;
  accentColor?: string;
}

export default function LiveDemo({ src, title, accentColor = "oklch(0.55 0.15 250)" }: LiveDemoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-8">
      <div className="rounded-xl overflow-hidden border"
        style={{
          borderColor: "oklch(0.85 0.02 250)",
          boxShadow: "0 4px 24px oklch(0.15 0.02 250 / 0.08)",
        }}>
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3"
          style={{ background: "oklch(0.15 0.03 250)", borderBottom: "1px solid oklch(0.25 0.03 250)" }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.2 25)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.75 0.15 85)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.15 150)" }} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: accentColor, fontFamily: "Archivo, sans-serif" }}>
              Live Demo — {title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all duration-200 hover:brightness-125"
              style={{ color: "oklch(0.65 0.03 250)", background: "oklch(0.22 0.03 250)" }}
            >
              {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              {expanded ? "Collapse" : "Expand"}
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all duration-200 hover:brightness-125 no-underline"
              style={{ color: "oklch(0.65 0.03 250)", background: "oklch(0.22 0.03 250)" }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open
            </a>
          </div>
        </div>
        {/* Iframe */}
        <iframe
          src={src}
          title={`${title} Live Demo`}
          className="w-full border-0"
          style={{
            height: expanded ? "700px" : "520px",
            transition: "height 0.3s ease",
            background: "white",
          }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
