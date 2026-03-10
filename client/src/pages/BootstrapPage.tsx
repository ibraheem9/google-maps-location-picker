/**
 * Geo Blueprint Design — Bootstrap 5 Integration Page
 * Complete Bootstrap 5 location picker documentation with full code.
 */
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import LiveDemo from "@/components/LiveDemo";
import ApiKeyBanner from "@/components/ApiKeyBanner";
import { Layers, AlertTriangle } from "lucide-react";

const bootstrapFullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Picker - Bootstrap 5</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
          rel="stylesheet">
    <style>
        #mapCanvas { width: 100%; height: 450px; border-radius: 0 0 0.375rem 0.375rem; }
        .location-card { border-radius: 0.75rem; overflow: hidden; }
    </style>
</head>
<body class="bg-light py-4">

<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-9">
            <!-- Location Picker Card -->
            <div class="card location-card shadow-sm">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                        Select Location
                    </h5>
                </div>
                <div class="card-body">
                    <!-- Search Row -->
                    <div class="row g-2 mb-3">
                        <div class="col-md-7">
                            <div class="input-group">
                                <input type="text" class="form-control" id="address"
                                       placeholder="Search for an address..."
                                       onkeyup="return keyup(event)">
                                <button class="btn btn-primary" type="button"
                                        onclick="codeAddress();">
                                    <i class="bi bi-search me-1"></i> Search
                                </button>
                            </div>
                        </div>
                        <div class="col-md-5 d-flex gap-2">
                            <button class="btn btn-outline-secondary flex-fill"
                                    id="current_location_btn" type="button">
                                <i class="bi bi-crosshair me-1"></i> My Location
                            </button>
                        </div>
                    </div>

                    <!-- Coordinates Row -->
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="lati" class="form-label fw-semibold small text-muted">
                                LATITUDE
                            </label>
                            <input type="text" class="form-control font-monospace" id="lati"
                                   placeholder="Latitude" onkeyup="return keyupl(event)">
                        </div>
                        <div class="col-md-6">
                            <label for="longi" class="form-label fw-semibold small text-muted">
                                LONGITUDE
                            </label>
                            <input type="text" class="form-control font-monospace" id="longi"
                                   placeholder="Longitude" onkeyup="return keyupl(event)">
                        </div>
                    </div>

                    <!-- Status -->
                    <div id="markerStatus" class="text-primary small mb-2"
                         style="display:none;"></div>
                </div>

                <!-- Map -->
                <div id="mapCanvas"></div>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
// ============================================================
//  CONFIGURATION — Replace this with your own Google Maps API key
// ============================================================
var API_KEY = 'YOUR_API_KEY';
// ============================================================

var geocoder, map, marker, infoWindow;
var startLat = 24.7282, startLng = 46.7622;
var mapLoaded = false;

/**
 * Reverse geocode a position to get the formatted address
 */
function geocodePosition(pos) {
    geocoder.geocode({ latLng: pos }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

/**
 * Show/hide the marker status badge
 */
function updateMarkerStatus(str) {
    var el = document.getElementById('markerStatus');
    el.innerHTML = str;
    el.style.display = str ? 'block' : 'none';
}

/**
 * Update the latitude and longitude form inputs
 */
function updateMarkerPosition(latLng) {
    document.getElementById('lati').value = latLng.lat();
    document.getElementById('longi').value = latLng.lng();
}

/**
 * Update the address search input
 */
function updateMarkerAddress(str) {
    document.getElementById('address').value = str;
}

/**
 * Initialize the Google Map (called by Maps API callback)
 */
function initMap() {
    mapLoaded = true;
    geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(startLat, startLng);

    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 8, center: latLng, mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    marker = new google.maps.Marker({
        position: latLng, title: 'Drag to select location',
        map: map, draggable: true
    });

    updateMarkerPosition(latLng);
    geocodePosition(latLng);

    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerStatus('<span class="badge bg-primary">Dragging...</span>');
        updateMarkerPosition(marker.getPosition());
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('');
        geocodePosition(marker.getPosition());
    });
}

function onMapError() {
    console.error('Google Maps failed to load.');
    document.getElementById('mapCanvas').innerHTML =
        '<div class="p-5 text-center text-danger">' +
        '<h5>Google Maps Failed to Load</h5>' +
        '<p>Check your API_KEY and ensure Maps JavaScript API is enabled.</p></div>';
}

/**
 * Geocode the address from the search input
 */
function codeAddress() {
    if (!mapLoaded) return;
    var address = document.getElementById("address").value;
    if (!address) return;

    geocoder.geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            map.setCenter(location);
            marker.setPosition(location);
            document.getElementById("lati").value = location.lat();
            document.getElementById("longi").value = location.lng();
        } else {
            // Bootstrap alert
            alert("Geocode was not successful: " + status);
        }
    });
}

/**
 * Move marker to manually entered coordinates
 */
function post_value() {
    if (!mapLoaded) return;
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
    document.getElementById("lati").value = lat;
    document.getElementById("longi").value = lng;
    geocodePosition(pos);
}

// Keyboard handlers
function keyup(e) { if (e.keyCode === 13) codeAddress(); return false; }
function keyupl(e) { if (e.keyCode === 13) post_value(); return false; }

document.getElementById('current_location_btn').addEventListener('click', function() {
    if (!mapLoaded) return;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker.setPosition(pos);
            map.setCenter(pos);
            document.getElementById("lati").value = pos.lat;
            document.getElementById("longi").value = pos.lng;
            geocodePosition(pos);
        }, function() {
            alert('Geolocation service failed.');
        });
    } else {
        alert('Browser does not support geolocation.');
    }
});

// Load Google Maps asynchronously with error handling
(function() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key='
        + API_KEY + '&callback=initMap&loading=async';
    script.async = true;
    script.defer = true;
    script.onerror = onMapError;
    document.head.appendChild(script);
    setTimeout(function() { if (!mapLoaded) onMapError(); }, 10000);
})();
</script>

</body>
</html>`;

export default function BootstrapPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: "oklch(0.88 0.015 250)" }}>
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.55 0.2 290 / 0.12)" }}>
              <Layers className="w-6 h-6" style={{ color: "oklch(0.55 0.2 290)" }} />
            </div>
            <div>
              <div className="stamp-badge mb-2" style={{ color: "oklch(0.55 0.2 290)" }}>
                Bootstrap 5
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Bootstrap 5 Integration
              </h1>
            </div>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "oklch(0.4 0.02 250)" }}>
            A location picker built with Bootstrap 5 components including cards, input groups, grid system,
            and utility classes. Uses Bootstrap Icons for a polished look. Fully responsive out of the box.
          </p>
        </div>
      </section>

      {/* Live Demo */}
      <section className="py-12 md:py-16" style={{ background: "oklch(0.97 0.005 250)" }}>
        <div className="container max-w-4xl">
          <SectionHeader
            badge="Live Demo"
            badgeColor="oklch(0.55 0.2 290)"
            title="Try It Live"
            description="Interact with the Bootstrap 5 location picker below. Drag the marker, search for addresses, or use your current location."
          />
          <LiveDemo src="/demos/bootstrap-demo.html" title="Bootstrap 5" accentColor="oklch(0.55 0.2 290)" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <SectionHeader
            badge="Dependencies"
            badgeColor="oklch(0.55 0.2 290)"
            title="What You Need"
            description="This example uses Bootstrap 5 via CDN. No build tools required."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="p-4 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Bootstrap 5 CSS
              </h4>
              <code className="text-xs font-mono block break-all" style={{ color: "oklch(0.55 0.15 250)" }}>
                bootstrap@5.3.0/dist/css/bootstrap.min.css
              </code>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Bootstrap Icons
              </h4>
              <code className="text-xs font-mono block break-all" style={{ color: "oklch(0.55 0.15 250)" }}>
                bootstrap-icons@1.11.0/font/bootstrap-icons.css
              </code>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Bootstrap 5 JS Bundle
              </h4>
              <code className="text-xs font-mono block break-all" style={{ color: "oklch(0.55 0.15 250)" }}>
                bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js
              </code>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Google Maps API
              </h4>
              <code className="text-xs font-mono block break-all" style={{ color: "oklch(0.55 0.15 250)" }}>
                maps.googleapis.com/maps/api/js?key=YOUR_KEY
              </code>
            </div>
          </div>

          {/* API Key */}
          <ApiKeyBanner />

          {/* Bootstrap Features */}
          <SectionHeader
            badge="Bootstrap Features Used"
            badgeColor="oklch(0.55 0.2 290)"
            title="Bootstrap 5 Components"
            description="This example leverages these Bootstrap 5 components and utilities."
          />

          <div className="space-y-3 mb-10">
            {[
              { title: "Card Component", desc: "The entire picker is wrapped in a .card with .card-header and .card-body for structure." },
              { title: "Input Group", desc: "The search bar uses .input-group to combine the text input with the search button." },
              { title: "Grid System", desc: "Uses .row and .col-md-* for responsive layout of search and coordinate fields." },
              { title: "Form Controls", desc: ".form-control and .form-label for styled inputs with .font-monospace for coordinate values." },
              { title: "Buttons", desc: ".btn-primary for search, .btn-outline-secondary for the location button with Bootstrap Icons." },
              { title: "Utilities", desc: ".shadow-sm, .bg-light, .py-4, .g-2 gap utilities for spacing and visual polish." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
                <span className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                  style={{ background: "oklch(0.55 0.2 290 / 0.1)", color: "oklch(0.55 0.2 290)", fontFamily: "Archivo, sans-serif" }}>
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

          {/* Full Code */}
          <SectionHeader
            badge="Full Code"
            badgeColor="oklch(0.55 0.2 290)"
            title="Complete Bootstrap 5 File"
            description="Copy this entire file and save it as index.html. All Bootstrap assets are loaded via CDN."
          />
          <CodeBlock code={bootstrapFullCode} language="html" filename="index.html (Bootstrap 5)" />
        </div>
      </section>
    </PageLayout>
  );
}
