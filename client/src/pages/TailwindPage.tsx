/**
 * Geo Blueprint Design — Tailwind CSS Integration Page
 * Complete Tailwind CSS location picker documentation with full code.
 */
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import { AlertTriangle } from "lucide-react";

const tailwindFullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Picker - Tailwind CSS</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        mono: ['JetBrains Mono', 'monospace'],
                    }
                }
            }
        }
    <\/script>
    <style>
        #mapCanvas { width: 100%; height: 450px; }
    </style>
</head>
<body class="bg-slate-50 min-h-screen p-4 md:p-8">

<div class="max-w-3xl mx-auto">
    <!-- Card Container -->
    <div class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden
                border border-slate-200/60">

        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                </div>
                <h2 class="text-lg font-bold text-slate-800">Select Location</h2>
            </div>
            <div id="statusBadge"
                 class="hidden px-3 py-1 bg-sky-50 text-sky-600 text-xs font-semibold
                        rounded-full">
                Dragging...
            </div>
        </div>

        <!-- Controls -->
        <div class="p-5 space-y-4">
            <!-- Search Row -->
            <div class="flex flex-col sm:flex-row gap-2">
                <div class="flex-1 flex">
                    <input type="text" id="address"
                           class="flex-1 px-4 py-2.5 border border-slate-200 rounded-l-xl
                                  text-sm text-slate-700 placeholder-slate-400
                                  focus:outline-none focus:ring-2 focus:ring-sky-500/20
                                  focus:border-sky-500 transition-all"
                           placeholder="Search for an address..."
                           onkeyup="return keyup(event)">
                    <button onclick="codeAddress();"
                            class="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white
                                   text-sm font-semibold rounded-r-xl transition-colors
                                   flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        Search
                    </button>
                </div>
                <button id="current_location_btn"
                        class="px-4 py-2.5 bg-white border border-slate-200
                               hover:bg-slate-50 text-slate-600 text-sm font-medium
                               rounded-xl transition-colors flex items-center gap-2
                               justify-center whitespace-nowrap">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    My Location
                </button>
            </div>

            <!-- Coordinates -->
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider
                                  text-slate-400 mb-1.5">
                        Latitude
                    </label>
                    <input type="text" id="lati"
                           class="w-full px-3 py-2 bg-slate-50 border border-slate-200
                                  rounded-lg text-sm font-mono text-slate-700
                                  focus:outline-none focus:ring-2 focus:ring-sky-500/20
                                  focus:border-sky-500 transition-all"
                           placeholder="Latitude"
                           onkeyup="return keyupl(event)">
                </div>
                <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider
                                  text-slate-400 mb-1.5">
                        Longitude
                    </label>
                    <input type="text" id="longi"
                           class="w-full px-3 py-2 bg-slate-50 border border-slate-200
                                  rounded-lg text-sm font-mono text-slate-700
                                  focus:outline-none focus:ring-2 focus:ring-sky-500/20
                                  focus:border-sky-500 transition-all"
                           placeholder="Longitude"
                           onkeyup="return keyupl(event)">
                </div>
            </div>

            <!-- Address Display -->
            <div id="addressDisplay"
                 class="hidden px-4 py-3 bg-sky-50 border border-sky-100
                        rounded-xl text-sm text-sky-700">
            </div>
        </div>

        <!-- Map -->
        <div id="mapCanvas" class="border-t border-slate-100"></div>
    </div>

    <!-- Footer Note -->
    <p class="text-center text-xs text-slate-400 mt-4">
        Built with Tailwind CSS + Google Maps API
    </p>
</div>

<!-- Google Maps API - Replace YOUR_API_KEY -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"><\/script>

<script>
// ============================================
// Location Picker - Tailwind CSS Version
// ============================================

var geocoder, map, marker, infoWindow;
var startLat = 24.7282, startLng = 46.7622;

geocoder = new google.maps.Geocoder();

/**
 * Reverse geocode a position to get the formatted address
 */
function geocodePosition(pos) {
    geocoder.geocode({ latLng: pos }, function(responses) {
        if (responses && responses.length > 0) {
            var address = responses[0].formatted_address;
            document.getElementById('address').value = address;
            // Show address in the display div
            var display = document.getElementById('addressDisplay');
            display.textContent = address;
            display.classList.remove('hidden');
        } else {
            document.getElementById('address').value =
                'Cannot determine address at this location.';
        }
    });
}

/**
 * Show/hide the dragging status badge
 */
function updateMarkerStatus(str) {
    var badge = document.getElementById('statusBadge');
    if (str) {
        badge.textContent = str;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

/**
 * Update the latitude and longitude inputs
 */
function updateMarkerPosition(latLng) {
    document.getElementById('lati').value = latLng.lat().toFixed(6);
    document.getElementById('longi').value = latLng.lng().toFixed(6);
}

/**
 * Initialize the Google Map with Tailwind-styled container
 */
function initialize() {
    var latLng = new google.maps.LatLng(startLat, startLng);

    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 8,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Minimal map UI for clean Tailwind look
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
    });

    marker = new google.maps.Marker({
        position: latLng,
        title: 'Drag to select location',
        map: map,
        draggable: true
    });

    updateMarkerPosition(latLng);
    geocodePosition(latLng);

    // Drag events
    google.maps.event.addListener(marker, 'dragstart', function() {
        updateMarkerStatus('Dragging...');
    });

    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerPosition(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('');
        geocodePosition(marker.getPosition());
    });
}

/**
 * Search for an address and reposition the map
 */
function codeAddress() {
    var address = document.getElementById("address").value;
    if (!address) return;

    geocoder.geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            map.setCenter(location);
            marker.setPosition(location);
            document.getElementById("lati").value = location.lat().toFixed(6);
            document.getElementById("longi").value = location.lng().toFixed(6);
            // Update address display
            var display = document.getElementById('addressDisplay');
            display.textContent = results[0].formatted_address;
            display.classList.remove('hidden');
        } else {
            alert("Geocode failed: " + status);
        }
    });
}

/**
 * Move marker to manually entered coordinates
 */
function post_value() {
    var lat = parseFloat(document.getElementById("lati").value);
    var lng = parseFloat(document.getElementById("longi").value);
    if (isNaN(lat) || isNaN(lng)) return;

    var latLng = new google.maps.LatLng(lat, lng);
    marker.setPosition(latLng);
    map.setCenter(latLng);
    geocodePosition(latLng);
}

/**
 * Programmatically set marker position
 */
function setMarkerPosition(lat, lng) {
    var pos = { lat: lat, lng: lng };
    marker.setPosition(pos);
    map.setCenter(pos);
    document.getElementById("lati").value = lat.toFixed(6);
    document.getElementById("longi").value = lng.toFixed(6);
    geocodePosition(pos);
}

// Keyboard handlers
function keyup(e) { if (e.keyCode === 13) codeAddress(); return false; }
function keyupl(e) { if (e.keyCode === 13) post_value(); return false; }

// Initialize on load
google.maps.event.addDomListener(window, 'load', initialize);

// Current location button
infoWindow = new google.maps.InfoWindow();

document.getElementById('current_location_btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker.setPosition(pos);
            map.setCenter(pos);
            document.getElementById("lati").value = pos.lat.toFixed(6);
            document.getElementById("longi").value = pos.lng.toFixed(6);
            geocodePosition(pos);
        }, function() {
            alert('Geolocation service failed.');
        });
    } else {
        alert('Browser does not support geolocation.');
    }
});
<\/script>

</body>
</html>`;

export default function TailwindPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: "oklch(0.88 0.015 250)" }}>
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.6 0.15 230 / 0.12)" }}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="oklch(0.6 0.15 230)">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
              </svg>
            </div>
            <div>
              <div className="stamp-badge mb-2" style={{ color: "oklch(0.6 0.15 230)" }}>
                Tailwind CSS
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Tailwind CSS Integration
              </h1>
            </div>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "oklch(0.4 0.02 250)" }}>
            A utility-first approach to the location picker using Tailwind CSS. Every element is styled
            with Tailwind utility classes for maximum customizability. Uses the Tailwind CDN for zero-config setup,
            with inline SVG icons instead of an icon library.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          {/* Tailwind Highlights */}
          <SectionHeader
            badge="Highlights"
            badgeColor="oklch(0.6 0.15 230)"
            title="Tailwind CSS Features"
            description="Key Tailwind features used in this implementation."
          />

          <div className="space-y-3 mb-10">
            {[
              { title: "Utility-First Styling", desc: "Every element is styled with Tailwind utility classes. No custom CSS needed except for the map container height." },
              { title: "Responsive Design", desc: "Uses sm: and md: breakpoints for responsive layouts. The search row stacks on mobile and goes horizontal on larger screens." },
              { title: "Focus States", desc: "Custom focus rings using focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 for accessible, branded focus indicators." },
              { title: "Transitions", desc: "Smooth transitions on hover and focus with transition-colors and transition-all utilities." },
              { title: "Modern Shadows", desc: "Uses shadow-lg shadow-slate-200/50 for subtle, modern elevation effects on the card container." },
              { title: "Inline SVG Icons", desc: "No icon library dependency. All icons are inline SVGs styled with Tailwind's w-*, h-*, and text-* utilities." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
                <span className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                  style={{ background: "oklch(0.6 0.15 230 / 0.1)", color: "oklch(0.6 0.15 230)", fontFamily: "Archivo, sans-serif" }}>
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold mb-0.5" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* API Key Note */}
          <div className="flex items-start gap-3 p-4 rounded-lg border mb-10"
            style={{ background: "oklch(0.98 0.02 85)", borderColor: "oklch(0.85 0.08 85)" }}>
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.65 0.15 70)" }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.35 0.05 85)" }}>
                API Key Required
              </p>
              <p className="text-sm" style={{ color: "oklch(0.45 0.03 85)" }}>
                Replace <code className="font-mono px-1 py-0.5 rounded text-xs"
                  style={{ background: "oklch(0.92 0.03 85)", color: "oklch(0.4 0.08 85)" }}>YOUR_API_KEY</code> with
                your Google Maps API key.
              </p>
            </div>
          </div>

          {/* Tailwind Config */}
          <SectionHeader
            badge="Configuration"
            badgeColor="oklch(0.6 0.15 230)"
            title="Tailwind Configuration"
            description="The CDN version allows inline configuration. For production, use the Tailwind CLI or PostCSS."
          />

          <CodeBlock code={`<!-- Tailwind CSS CDN (for development/prototyping) -->
<script src="https://cdn.tailwindcss.com"><\/script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    mono: ['JetBrains Mono', 'monospace'],
                }
            }
        }
    }
<\/script>

<!-- For production, install via npm: -->
<!-- npm install -D tailwindcss -->
<!-- npx tailwindcss init -->`} language="html" filename="Tailwind Setup" />

          {/* Key Classes */}
          <SectionHeader
            badge="Key Classes"
            badgeColor="oklch(0.6 0.15 230)"
            title="Important Utility Patterns"
            description="Common Tailwind patterns used in the location picker."
          />

          <div className="space-y-6 mb-10">
            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Card Container
              </h4>
              <CodeBlock code={`<!-- Rounded card with subtle shadow -->
<div class="bg-white rounded-2xl shadow-lg shadow-slate-200/50
            overflow-hidden border border-slate-200/60">
    <!-- Content -->
</div>`} language="html" filename="Card Pattern" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Input with Focus Ring
              </h4>
              <CodeBlock code={`<!-- Styled input with focus state -->
<input class="flex-1 px-4 py-2.5 border border-slate-200 rounded-l-xl
              text-sm text-slate-700 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-500/20
              focus:border-sky-500 transition-all"
       placeholder="Search for an address...">`} language="html" filename="Input Pattern" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Responsive Search Row
              </h4>
              <CodeBlock code={`<!-- Stacks on mobile, horizontal on sm+ -->
<div class="flex flex-col sm:flex-row gap-2">
    <div class="flex-1 flex">
        <input class="..." placeholder="Search...">
        <button class="...">Search</button>
    </div>
    <button class="...">My Location</button>
</div>`} language="html" filename="Responsive Layout" />
            </div>
          </div>

          {/* Full Code */}
          <SectionHeader
            badge="Full Code"
            badgeColor="oklch(0.6 0.15 230)"
            title="Complete Tailwind CSS File"
            description="Copy this entire file and save it as index.html. Tailwind CSS is loaded via CDN."
          />
          <CodeBlock code={tailwindFullCode} language="html" filename="index.html (Tailwind CSS)" />
        </div>
      </section>
    </PageLayout>
  );
}
