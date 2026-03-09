/**
 * Geo Blueprint Design — HTML Integration Page
 * Complete HTML + vanilla JavaScript location picker documentation.
 */
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import ApiTable from "@/components/ApiTable";
import { FileCode, AlertTriangle } from "lucide-react";

const htmlFullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Picker - Pure HTML</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f8fafc; color: #1e293b; padding: 20px;
        }
        .location-picker {
            max-width: 800px; margin: 0 auto; background: #fff;
            border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden;
        }
        .picker-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; }
        .picker-header h2 { font-size: 18px; font-weight: 700; }
        .search-row { display: flex; gap: 8px; padding: 16px 20px; }
        .search-row input {
            flex: 1; padding: 10px 14px; border: 1px solid #e2e8f0;
            border-radius: 8px; font-size: 14px; outline: none;
        }
        .search-row input:focus { border-color: #3b82f6; }
        .btn {
            padding: 10px 18px; border: none; border-radius: 8px;
            font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-secondary { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
        .btn-secondary:hover { background: #e2e8f0; }
        .coords-row { display: flex; gap: 12px; padding: 0 20px 16px; }
        .coord-group { flex: 1; }
        .coord-group label {
            display: block; font-size: 12px; font-weight: 600;
            text-transform: uppercase; color: #64748b; margin-bottom: 6px;
        }
        .coord-group input {
            width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0;
            border-radius: 8px; font-size: 14px; font-family: monospace; outline: none;
        }
        #mapCanvas { width: 100%; height: 400px; }
        #markerStatus { padding: 8px 20px; font-size: 13px; color: #3b82f6; display: none; }
    </style>
</head>
<body>

<div class="location-picker">
    <div class="picker-header">
        <h2>Select Location</h2>
    </div>
    <div class="search-row">
        <input type="text" id="address" placeholder="Search for an address..."
               onkeyup="return keyup(event)">
        <button class="btn btn-primary" onclick="codeAddress();">Search</button>
        <button class="btn btn-secondary" id="current_location_btn">My Location</button>
    </div>
    <div class="coords-row">
        <div class="coord-group">
            <label>Latitude</label>
            <input type="text" id="lati" placeholder="Latitude" onkeyup="return keyupl(event)">
        </div>
        <div class="coord-group">
            <label>Longitude</label>
            <input type="text" id="longi" placeholder="Longitude" onkeyup="return keyupl(event)">
        </div>
    </div>
    <div id="markerStatus"></div>
    <div id="mapCanvas"></div>
</div>

<!-- Replace YOUR_API_KEY with your actual Google Maps API key -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
<script>
var geocoder, map, marker, infoWindow;
var startLat = 24.7282, startLng = 46.7622;
geocoder = new google.maps.Geocoder();

function geocodePosition(pos) {
    geocoder.geocode({ latLng: pos }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(str) {
    var el = document.getElementById('markerStatus');
    el.innerHTML = str;
    el.style.display = str ? 'block' : 'none';
}

function updateMarkerPosition(latLng) {
    document.getElementById('lati').value = latLng.lat();
    document.getElementById('longi').value = latLng.lng();
}

function updateMarkerAddress(str) {
    document.getElementById('address').value = str;
}

function initialize() {
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

    google.maps.event.addListener(marker, 'dragstart', function() {
        updateMarkerStatus('Dragging...');
    });
    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerStatus('Dragging...');
        updateMarkerPosition(marker.getPosition());
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('');
        geocodePosition(marker.getPosition());
    });
}

function codeAddress() {
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
            alert("Geocode failed: " + status);
        }
    });
}

function post_value() {
    var lat = parseFloat(document.getElementById("lati").value);
    var lng = parseFloat(document.getElementById("longi").value);
    if (isNaN(lat) || isNaN(lng)) return;
    var latLng = new google.maps.LatLng(lat, lng);
    marker.setPosition(latLng);
    map.setCenter(latLng);
    geocodePosition(latLng);
}

function setMarkerPosition(lat, lng) {
    var pos = { lat: lat, lng: lng };
    marker.setPosition(pos);
    map.setCenter(pos);
    document.getElementById("lati").value = lat;
    document.getElementById("longi").value = lng;
    geocodePosition(pos);
}

function keyup(e) { if (e.keyCode === 13) codeAddress(); return false; }
function keyupl(e) { if (e.keyCode === 13) post_value(); return false; }

google.maps.event.addDomListener(window, 'load', initialize);
infoWindow = new google.maps.InfoWindow();

document.getElementById('current_location_btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
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
</script>
</body>
</html>`;

const stepRows = [
  { name: "Step 1", type: "Setup", description: "Include the Google Maps JavaScript API script with your API key in a <script> tag." },
  { name: "Step 2", type: "HTML", description: "Create the search input, coordinate fields, and a div with id='mapCanvas' for the map." },
  { name: "Step 3", type: "Initialize", description: "On window load, create the Map, Geocoder, and a draggable Marker at default coordinates." },
  { name: "Step 4", type: "Events", description: "Listen to marker drag/dragend events to update coordinates and reverse geocode the address." },
  { name: "Step 5", type: "Search", description: "Use Geocoder.geocode() with the address input to search and reposition the marker." },
];

export default function HtmlPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: "oklch(0.88 0.015 250)" }}>
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.65 0.2 25 / 0.12)" }}>
              <FileCode className="w-6 h-6" style={{ color: "oklch(0.65 0.2 25)" }} />
            </div>
            <div>
              <div className="stamp-badge mb-2" style={{ color: "oklch(0.65 0.2 25)" }}>
                HTML + JavaScript
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Pure HTML Integration
              </h1>
            </div>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "oklch(0.4 0.02 250)" }}>
            The simplest way to add a location picker to any webpage. No frameworks, no build tools,
            no dependencies beyond jQuery (optional) and the Google Maps API. Just copy, paste, and customize.
          </p>
        </div>
      </section>

      {/* Quick Start Steps */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <SectionHeader
            badge="Quick Start"
            badgeColor="oklch(0.65 0.2 25)"
            title="Implementation Steps"
            description="Follow these steps to add the location picker to your HTML page."
          />
          <ApiTable title="Implementation Steps" rows={stepRows} />

          {/* Important Note */}
          <div className="flex items-start gap-3 p-4 rounded-lg border my-8"
            style={{ background: "oklch(0.98 0.02 85)", borderColor: "oklch(0.85 0.08 85)" }}>
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.65 0.15 70)" }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "oklch(0.35 0.05 85)" }}>
                API Key Required
              </p>
              <p className="text-sm" style={{ color: "oklch(0.45 0.03 85)" }}>
                Replace <code className="font-mono px-1 py-0.5 rounded text-xs"
                  style={{ background: "oklch(0.92 0.03 85)", color: "oklch(0.4 0.08 85)" }}>YOUR_API_KEY</code> with
                your Google Maps API key. Enable the Maps JavaScript API and Geocoding API in your Google Cloud Console.
              </p>
            </div>
          </div>

          {/* Full Code */}
          <SectionHeader
            badge="Full Code"
            badgeColor="oklch(0.65 0.2 25)"
            title="Complete HTML File"
            description="Copy this entire file and save it as index.html. Replace YOUR_API_KEY with your Google Maps API key."
          />
          <CodeBlock code={htmlFullCode} language="html" filename="index.html" />

          {/* How It Works */}
          <SectionHeader
            badge="Explanation"
            badgeColor="oklch(0.65 0.2 25)"
            title="How It Works"
            description="A breakdown of the key parts of the location picker."
          />

          <div className="space-y-6">
            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                1. Map Initialization
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                The <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.95 0.01 250)", color: "oklch(0.55 0.15 250)" }}>initialize()</code> function
                creates a Google Map centered at the default coordinates with a draggable marker.
              </p>
              <CodeBlock code={`function initialize() {
    var latLng = new google.maps.LatLng(startLat, startLng);
    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 8,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker = new google.maps.Marker({
        position: latLng,
        title: 'Drag to select location',
        map: map,
        draggable: true   // This makes the marker draggable
    });
}`} language="javascript" filename="initialize()" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                2. Drag Events
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                Three event listeners track the marker's drag lifecycle: start, during, and end. On drag end,
                the position is reverse geocoded to get the address.
              </p>
              <CodeBlock code={`// Update coordinates while dragging
google.maps.event.addListener(marker, 'drag', function() {
    updateMarkerPosition(marker.getPosition());
});

// Reverse geocode when drag ends
google.maps.event.addListener(marker, 'dragend', function() {
    geocodePosition(marker.getPosition());
});`} language="javascript" filename="Drag Events" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                3. Address Search
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                The <code className="font-mono text-xs px-1 py-0.5 rounded" style={{ background: "oklch(0.95 0.01 250)", color: "oklch(0.55 0.15 250)" }}>codeAddress()</code> function
                uses the Geocoder to convert an address string into coordinates and repositions the map and marker.
              </p>
              <CodeBlock code={`function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            map.setCenter(location);
            marker.setPosition(location);
            document.getElementById("lati").value = location.lat();
            document.getElementById("longi").value = location.lng();
        }
    });
}`} language="javascript" filename="codeAddress()" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                4. Current Location
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                Uses the browser's HTML5 Geolocation API to detect the user's current position and move the marker there.
              </p>
              <CodeBlock code={`document.getElementById('current_location_btn').addEventListener('click', function() {
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
        });
    }
});`} language="javascript" filename="Current Location" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
