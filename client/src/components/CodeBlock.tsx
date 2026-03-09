/**
 * Geo Blueprint Design — CodeBlock
 * Code block with copy-to-clipboard and Prism.js syntax highlighting.
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const langMap: Record<string, string> = {
  html: "markup",
  vue: "markup",
  xml: "markup",
  javascript: "javascript",
  js: "javascript",
  css: "css",
};

export default function CodeBlock({ code, language = "html", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const prismLang = langMap[language] || "markup";

  const highlighted = useMemo(() => {
    const grammar = Prism.languages[prismLang];
    if (!grammar) {
      // Fallback: just escape HTML
      return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    return Prism.highlight(code, grammar, prismLang);
  }, [code, prismLang]);

  return (
    <div className="code-block my-4">
      <div className="code-header">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.2 25)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.75 0.15 85)" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.15 150)" }} />
          </div>
          {filename && (
            <span className="text-xs font-mono" style={{ color: "oklch(0.6 0.03 250)" }}>
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-all duration-200"
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            color: copied ? "oklch(0.72 0.15 150)" : "oklch(0.6 0.03 250)",
            background: "oklch(0.25 0.03 250)",
          }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={`language-${prismLang}`}>
        <code
          className={`language-${prismLang}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
