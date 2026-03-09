/**
 * Geo Blueprint Design — PageLayout
 * Shared layout wrapper with navbar and footer for all pages.
 */
import Navbar from "./Navbar";
import { MapPin } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 250)" }}>
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <footer className="border-t" style={{ borderColor: "oklch(0.88 0.015 250)", background: "oklch(0.14 0.03 250)" }}>
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.55 0.15 250)" }}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-sm" style={{ fontFamily: "Archivo, sans-serif" }}>
                  Location Picker
                </span>
                <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.03 250)" }}>
                  Google Maps Location Picker Component
                </p>
              </div>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.5 0.03 250)" }}>
              Built with Google Maps JavaScript API. Replace <code className="font-mono px-1 py-0.5 rounded text-xs"
                style={{ background: "oklch(0.2 0.03 250)", color: "oklch(0.65 0.15 70)" }}>YOUR_API_KEY</code> with your own key.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
