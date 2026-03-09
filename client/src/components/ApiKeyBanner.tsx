/**
 * Geo Blueprint Design — ApiKeyBanner
 * Displays the Google Maps API key with copy functionality.
 */
import { useState, useCallback } from "react";
import { Copy, Check, Key } from "lucide-react";

const API_KEY = "AIzaSyAqPAlqD2AE9wvm2Ou19B8dqiD7FVUhyC4";

export default function ApiKeyBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(API_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="my-6 rounded-lg overflow-hidden border"
      style={{ borderColor: "oklch(0.75 0.1 70)", background: "oklch(0.97 0.02 70)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "oklch(0.93 0.04 70)", borderBottom: "1px solid oklch(0.85 0.06 70)" }}>
        <Key className="w-4 h-4" style={{ color: "oklch(0.55 0.15 70)" }} />
        <span className="text-sm font-bold" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.35 0.06 70)" }}>
          Google Maps API Key
        </span>
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <code className="text-sm font-mono break-all" style={{ color: "oklch(0.35 0.04 70)" }}>
          {API_KEY}
        </code>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          style={{
            background: copied ? "oklch(0.65 0.15 150)" : "oklch(0.55 0.15 70)",
            color: "white",
          }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Key"}
        </button>
      </div>
      <div className="px-4 pb-3">
        <p className="text-xs leading-relaxed" style={{ color: "oklch(0.5 0.03 70)" }}>
          Use this API key in the <code className="px-1 py-0.5 rounded text-xs" style={{ background: "oklch(0.9 0.03 70)" }}>script</code> tag
          when loading the Google Maps JavaScript API. Replace it with your own key for production use.
        </p>
      </div>
    </div>
  );
}
