/**
 * Geo Blueprint Design — Home / Overview Page
 * Hero section with blueprint background, live map demo, features grid, and API reference.
 */
import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import {
  MapPin, Search, Navigation, GripVertical,
  ArrowRight, Crosshair, Globe, Zap
} from "lucide-react";
import { MapView } from "@/components/Map";
import PageLayout from "@/components/PageLayout";
import FeatureCard from "@/components/FeatureCard";
import ApiTable from "@/components/ApiTable";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663367720512/MPSPeMEtee9p2HXE8qM2pD/hero-blueprint-bg-WjduuiSebHgGBVTiMFVfRf.webp";

const features = [
  { icon: GripVertical, title: "Draggable Marker", description: "Users can drag the map marker to select any location. Coordinates update in real-time as the marker moves." },
  { icon: Search, title: "Address Search", description: "Search for any address using Google Geocoding API. The map automatically centers on the found location." },
  { icon: Navigation, title: "Current Location", description: "One-click geolocation using the browser's built-in HTML5 Geolocation API to detect the user's current position." },
  { icon: Crosshair, title: "Coordinate Input", description: "Manually enter latitude and longitude values. Press Enter to navigate the map to the specified coordinates." },
  { icon: Globe, title: "Reverse Geocoding", description: "Automatically resolves coordinates to human-readable addresses when the marker is placed or dragged." },
  { icon: Zap, title: "Framework Agnostic", description: "Works with plain HTML, Bootstrap 5, Vue.js, and Tailwind CSS. Full code examples for each framework." },
];

const apiMethods = [
  { name: "initialize()", type: "function", description: "Initializes the map, marker, and geocoder. Called automatically on window load." },
  { name: "codeAddress()", type: "function", description: "Geocodes the address from the search input and moves the map/marker to that location." },
  { name: "post_value()", type: "function", description: "Reads latitude/longitude from inputs and repositions the marker on the map." },
  { name: "geocodePosition(pos)", type: "function", description: "Reverse geocodes a LatLng position and updates the address input field." },
  { name: "setMarkerPosition(lat, lng)", type: "function", description: "Programmatically sets the marker position and updates all related fields." },
];

const apiProperties = [
  { name: "map", type: "google.maps.Map", description: "The Google Maps instance. Use to control zoom, center, and map type." },
  { name: "marker", type: "google.maps.Marker", description: "The draggable marker instance placed on the map." },
  { name: "geocoder", type: "google.maps.Geocoder", description: "The Geocoder service for address lookups and reverse geocoding." },
  { name: "startLat", type: "number", description: "Initial latitude for the map center (default: 24.7282)." },
  { name: "startLng", type: "number", description: "Initial longitude for the map center (default: 46.7622)." },
];

// Framework SVG icons for visual distinction
function HtmlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M4 2l2.4 26.4L16 32l9.6-3.6L28 2H4z" fill="oklch(0.65 0.2 25)" opacity="0.15"/>
      <path d="M16 29.2l7.7-2.9L25.7 4H16v25.2z" fill="oklch(0.65 0.2 25)" opacity="0.25"/>
      <text x="16" y="21" textAnchor="middle" fill="oklch(0.65 0.2 25)" fontSize="12" fontWeight="bold" fontFamily="Archivo, sans-serif">&lt;/&gt;</text>
    </svg>
  );
}

function BootstrapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="6" fill="oklch(0.55 0.2 290)" opacity="0.15"/>
      <text x="16" y="22" textAnchor="middle" fill="oklch(0.55 0.2 290)" fontSize="16" fontWeight="bold" fontFamily="Archivo, sans-serif">B</text>
    </svg>
  );
}

function VueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M2 4l14 24L30 4h-6l-8 13.6L8 4H2z" fill="oklch(0.6 0.2 155)" opacity="0.2"/>
      <path d="M8 4l8 13.6L24 4h-5l-3 5.1L13 4H8z" fill="oklch(0.6 0.2 155)" opacity="0.4"/>
      <text x="16" y="22" textAnchor="middle" fill="oklch(0.6 0.2 155)" fontSize="10" fontWeight="bold" fontFamily="Archivo, sans-serif">V</text>
    </svg>
  );
}

function TailwindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 6c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25.57.14.98.58 1.43 1.05C16.22 11.9 17.5 13.25 20.5 13.25c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.57-.14-.98-.58-1.43-1.05C20.28 7.35 19 6 16 6zM11.5 13.25c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25.57.14.98.58 1.43 1.05 1.04 1.1 2.32 2.45 5.32 2.45 4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.57-.14-.98-.58-1.43-1.05-1.04-1.1-2.32-2.45-5.32-2.45z" fill="oklch(0.6 0.15 230)"/>
    </svg>
  );
}

const frameworkLinks = [
  { href: "/html", label: "HTML", color: "oklch(0.65 0.2 25)", desc: "Pure HTML + JavaScript", IconComponent: HtmlIcon },
  { href: "/bootstrap", label: "Bootstrap 5", color: "oklch(0.55 0.2 290)", desc: "Bootstrap 5 components", IconComponent: BootstrapIcon },
  { href: "/vue", label: "Vue.js", color: "oklch(0.6 0.2 155)", desc: "Vue 3 Composition API", IconComponent: VueIcon },
  { href: "/tailwind", label: "Tailwind CSS", color: "oklch(0.6 0.15 230)", desc: "Tailwind utility classes", IconComponent: TailwindIcon },
];

function AnimateIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const [lat, setLat] = useState("24.7282");
  const [lng, setLng] = useState("46.7622");
  const [address, setAddress] = useState("");

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    const geocoder = new google.maps.Geocoder();
    geocoderRef.current = geocoder;

    const marker = new google.maps.Marker({
      position: { lat: 24.7282, lng: 46.7622 },
      map,
      draggable: true,
      title: "Drag to select location",
    });
    markerRef.current = marker;

    geocoder.geocode({ location: { lat: 24.7282, lng: 46.7622 } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      }
    });

    marker.addListener("drag", () => {
      const pos = marker.getPosition();
      if (pos) {
        setLat(pos.lat().toFixed(6));
        setLng(pos.lng().toFixed(6));
      }
    });

    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) {
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            setAddress(results[0].formatted_address);
          }
        });
      }
    });
  }, []);

  const handleSearch = useCallback(() => {
    if (!geocoderRef.current || !mapRef.current || !markerRef.current || !address) return;
    geocoderRef.current.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const loc = results[0].geometry.location;
        mapRef.current!.setCenter(loc);
        markerRef.current!.setPosition(loc);
        setLat(loc.lat().toFixed(6));
        setLng(loc.lng().toFixed(6));
      }
    });
  }, [address]);

  const handleCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        mapRef.current?.setCenter(pos);
        markerRef.current?.setPosition(pos);
        setLat(pos.lat.toFixed(6));
        setLng(pos.lng.toFixed(6));
        geocoderRef.current?.geocode({ location: pos }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            setAddress(results[0].formatted_address);
          }
        });
      });
    }
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.12 0.04 250 / 0.88), oklch(0.18 0.04 250 / 0.78))" }} />
          <div className="absolute inset-0 blueprint-grid opacity-20" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="stamp-badge mb-6" style={{ color: "oklch(0.65 0.15 70)" }}>
              Google Maps Component
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "Archivo, sans-serif" }}>
              Location Picker
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: "oklch(0.8 0.02 250)", fontFamily: "Source Sans 3, sans-serif" }}>
              A complete, ready-to-use Google Maps location picker component with address search,
              draggable markers, reverse geocoding, and current location detection.
              Available for HTML, Bootstrap 5, Vue.js, and Tailwind CSS.
            </p>
            <div className="flex flex-wrap gap-3">
              {frameworkLinks.map((fw) => (
                <Link key={fw.href} href={fw.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: fw.color,
                    color: "white",
                    fontFamily: "Archivo, sans-serif",
                  }}>
                  {fw.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.97 0.005 250)" }}>
        <div className="container">
          <AnimateIn>
            <div className="text-center mb-10">
              <div className="stamp-badge mx-auto mb-4" style={{ color: "oklch(0.55 0.15 250)" }}>
                Live Demo
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Try It Now
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
                Drag the marker, search for an address, or use your current location.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border"
              style={{ borderColor: "oklch(0.85 0.02 250)", boxShadow: "0 4px 24px oklch(0.15 0.02 250 / 0.08)" }}>
              {/* Controls */}
              <div className="p-4 md:p-5 space-y-4" style={{ background: "white" }}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search for an address..."
                      className="flex-1 px-4 py-2.5 border rounded-l-lg text-sm outline-none focus:ring-2"
                      style={{
                        borderColor: "oklch(0.88 0.015 250)",
                        fontFamily: "Source Sans 3, sans-serif",
                        color: "oklch(0.2 0.02 250)",
                      }}
                    />
                    <button onClick={handleSearch}
                      className="px-4 py-2.5 rounded-r-lg flex items-center gap-2 text-sm font-medium text-white transition-colors hover:brightness-110"
                      style={{ background: "oklch(0.55 0.15 250)" }}>
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>
                  <button onClick={handleCurrentLocation}
                    className="px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium border transition-colors whitespace-nowrap hover:bg-[oklch(0.95_0.01_250)]"
                    style={{
                      borderColor: "oklch(0.85 0.02 250)",
                      color: "oklch(0.35 0.03 250)",
                      background: "oklch(0.97 0.005 250)",
                    }}>
                    <Navigation className="w-4 h-4" />
                    My Location
                  </button>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: "oklch(0.5 0.02 250)", fontFamily: "Archivo, sans-serif" }}>
                      Latitude
                    </label>
                    <input type="text" value={lat} readOnly
                      className="w-full px-3 py-2 border rounded-lg text-sm font-mono"
                      style={{ borderColor: "oklch(0.88 0.015 250)", color: "oklch(0.3 0.02 250)", background: "oklch(0.97 0.005 250)" }} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                      style={{ color: "oklch(0.5 0.02 250)", fontFamily: "Archivo, sans-serif" }}>
                      Longitude
                    </label>
                    <input type="text" value={lng} readOnly
                      className="w-full px-3 py-2 border rounded-lg text-sm font-mono"
                      style={{ borderColor: "oklch(0.88 0.015 250)", color: "oklch(0.3 0.02 250)", background: "oklch(0.97 0.005 250)" }} />
                  </div>
                </div>
              </div>
              {/* Map */}
              <MapView
                className="h-[400px]"
                initialCenter={{ lat: 24.7282, lng: 46.7622 }}
                initialZoom={8}
                onMapReady={handleMapReady}
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <AnimateIn>
            <div className="text-center mb-12">
              <div className="stamp-badge mx-auto mb-4" style={{ color: "oklch(0.65 0.15 70)" }}>
                Features
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Everything You Need
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
                A fully-featured location picker with all the essentials built in.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <FeatureCard {...f} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Framework Cards Section */}
      <section className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: "oklch(0.15 0.03 250)" }}>
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="container relative z-10">
          <AnimateIn>
            <div className="text-center mb-12">
              <div className="stamp-badge mx-auto mb-4" style={{ color: "oklch(0.65 0.15 70)" }}>
                Integrations
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3"
                style={{ fontFamily: "Archivo, sans-serif" }}>
                Choose Your Framework
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "oklch(0.65 0.03 250)" }}>
                Complete, copy-paste-ready code for each framework. Every example includes
                the full HTML, CSS, and JavaScript needed to get started.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {frameworkLinks.map((fw, i) => (
              <AnimateIn key={fw.href} delay={i * 100}>
                <Link href={fw.href}
                  className="group block p-6 rounded-xl border no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{
                    background: "oklch(0.2 0.03 250)",
                    borderColor: "oklch(0.3 0.04 250)",
                  }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `color-mix(in oklch, ${fw.color} 15%, transparent)` }}>
                    <fw.IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1"
                    style={{ fontFamily: "Archivo, sans-serif" }}>
                    {fw.label}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "oklch(0.6 0.03 250)" }}>
                    {fw.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                    style={{ color: fw.color }}>
                    View Code <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <AnimateIn>
            <div className="text-center mb-12">
              <div className="stamp-badge mx-auto mb-4" style={{ color: "oklch(0.55 0.15 250)" }}>
                API Reference
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Methods & Properties
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "oklch(0.45 0.02 250)" }}>
                All available functions and properties exposed by the location picker component.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="max-w-4xl mx-auto">
              <ApiTable title="Methods" rows={apiMethods} />
              <ApiTable title="Properties" rows={apiProperties} />
            </div>
          </AnimateIn>
        </div>
      </section>
    </PageLayout>
  );
}
