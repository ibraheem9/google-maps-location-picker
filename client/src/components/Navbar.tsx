/**
 * Geo Blueprint Design — Navbar
 * Fixed top navigation with framework links and blueprint styling.
 */
import { Link, useLocation } from "wouter";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/html", label: "HTML" },
  { href: "/bootstrap", label: "Bootstrap 5" },
  { href: "/vue", label: "Vue.js" },
  { href: "/tailwind", label: "Tailwind CSS" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[oklch(0.3_0.04_250)]"
      style={{ background: "oklch(0.14 0.03 250 / 0.95)", backdropFilter: "blur(12px)" }}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.55 0.15 250)" }}>
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-heading font-bold text-sm leading-tight tracking-wide"
              style={{ fontFamily: "Archivo, sans-serif" }}>
              Location Picker
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] leading-tight"
              style={{ color: "oklch(0.6 0.03 250)" }}>
              Documentation
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium no-underline transition-all duration-200
                  ${isActive
                    ? "text-white"
                    : "hover:text-white"
                  }`}
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  color: isActive ? "white" : "oklch(0.65 0.03 250)",
                  background: isActive ? "oklch(0.25 0.04 250)" : "transparent",
                }}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[oklch(0.3_0.04_250)] pb-4 px-4"
          style={{ background: "oklch(0.14 0.03 250)" }}>
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium no-underline mt-1
                  ${isActive ? "text-white" : ""}`}
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  color: isActive ? "white" : "oklch(0.65 0.03 250)",
                  background: isActive ? "oklch(0.25 0.04 250)" : "transparent",
                }}>
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
