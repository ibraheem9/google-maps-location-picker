/**
 * Geo Blueprint Design — Vue.js Integration Page
 * Complete Vue 3 Composition API location picker documentation.
 */
import PageLayout from "@/components/PageLayout";
import SectionHeader from "@/components/SectionHeader";
import CodeBlock from "@/components/CodeBlock";
import LiveDemo from "@/components/LiveDemo";
import ApiKeyBanner from "@/components/ApiKeyBanner";
import { AlertTriangle } from "lucide-react";

const vueFullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Location Picker - Vue 3</title>
    <!-- Vue 3 CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"><\/script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f0fdf4; color: #1e293b; padding: 20px;
        }
        .location-picker {
            max-width: 800px; margin: 0 auto; background: #fff;
            border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            overflow: hidden; border: 1px solid #e2e8f0;
        }
        .picker-header {
            padding: 16px 20px; border-bottom: 1px solid #e2e8f0;
            display: flex; align-items: center; justify-content: space-between;
        }
        .picker-header h2 { font-size: 18px; font-weight: 700; color: #166534; }
        .status-badge {
            padding: 4px 10px; border-radius: 9999px; font-size: 12px;
            font-weight: 600; background: #dcfce7; color: #166534;
        }
        .controls { padding: 16px 20px; }
        .search-group { display: flex; gap: 8px; margin-bottom: 12px; }
        .search-group input {
            flex: 1; padding: 10px 14px; border: 1px solid #d1d5db;
            border-radius: 8px; font-size: 14px; outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-group input:focus {
            border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
        }
        .btn {
            padding: 10px 16px; border: none; border-radius: 8px;
            font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
            white-space: nowrap;
        }
        .btn-vue { background: #22c55e; color: white; }
        .btn-vue:hover { background: #16a34a; }
        .btn-outline {
            background: white; color: #475569;
            border: 1px solid #d1d5db;
        }
        .btn-outline:hover { background: #f1f5f9; }
        .coords-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .coord-field label {
            display: block; font-size: 11px; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.05em;
            color: #6b7280; margin-bottom: 4px;
        }
        .coord-field input {
            width: 100%; padding: 8px 12px; border: 1px solid #d1d5db;
            border-radius: 8px; font-size: 14px; font-family: monospace;
            outline: none; background: #f9fafb;
        }
        .coord-field input:focus { border-color: #22c55e; background: white; }
        .address-display {
            margin-top: 12px; padding: 10px 14px; background: #f0fdf4;
            border-radius: 8px; font-size: 13px; color: #166534;
            border: 1px solid #bbf7d0;
        }
        #mapCanvas { width: 100%; height: 420px; }
    </style>
</head>
<body>

<div id="app">
    <div class="location-picker">
        <div class="picker-header">
            <h2>Vue Location Picker</h2>
            <span class="status-badge" v-if="isDragging">Dragging...</span>
            <span class="status-badge" v-else>Ready</span>
        </div>

        <div class="controls">
            <!-- Search -->
            <div class="search-group">
                <input type="text" v-model="searchAddress"
                       @keyup.enter="searchLocation"
                       placeholder="Search for an address...">
                <button class="btn btn-vue" @click="searchLocation">Search</button>
                <button class="btn btn-outline" @click="getCurrentLocation">
                    My Location
                </button>
            </div>

            <!-- Coordinates -->
            <div class="coords-grid">
                <div class="coord-field">
                    <label>Latitude</label>
                    <input type="text" v-model="latitude"
                           @keyup.enter="goToCoordinates">
                </div>
                <div class="coord-field">
                    <label>Longitude</label>
                    <input type="text" v-model="longitude"
                           @keyup.enter="goToCoordinates">
                </div>
            </div>

            <!-- Address Display -->
            <div class="address-display" v-if="resolvedAddress">
                <strong>Address:</strong> {{ resolvedAddress }}
            </div>
        </div>

        <div id="mapCanvas"></div>
    </div>
</div>

<!-- Google Maps API - Replace YOUR_API_KEY -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"><\/script>

<script>
// ============================================
// Location Picker - Vue 3 Composition API
// ============================================

const { createApp, ref, onMounted } = Vue;

const app = createApp({
    setup() {
        // Reactive state
        const latitude = ref('24.7282');
        const longitude = ref('46.7622');
        const searchAddress = ref('');
        const resolvedAddress = ref('');
        const isDragging = ref(false);

        // Non-reactive references (Google Maps objects)
        let map = null;
        let marker = null;
        let geocoder = null;

        /**
         * Reverse geocode a position to get the address
         */
        function reverseGeocode(pos) {
            geocoder.geocode({ location: pos }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    resolvedAddress.value = results[0].formatted_address;
                    searchAddress.value = results[0].formatted_address;
                } else {
                    resolvedAddress.value = 'Cannot determine address.';
                }
            });
        }

        /**
         * Update coordinates from a LatLng object
         */
        function updateCoords(latLng) {
            latitude.value = (typeof latLng.lat === 'function')
                ? latLng.lat().toFixed(6)
                : latLng.lat.toFixed(6);
            longitude.value = (typeof latLng.lng === 'function')
                ? latLng.lng().toFixed(6)
                : latLng.lng.toFixed(6);
        }

        /**
         * Initialize the map on component mount
         */
        onMounted(() => {
            const startPos = new google.maps.LatLng(24.7282, 46.7622);
            geocoder = new google.maps.Geocoder();

            // Create map
            map = new google.maps.Map(document.getElementById('mapCanvas'), {
                zoom: 8,
                center: startPos,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // Create draggable marker
            marker = new google.maps.Marker({
                position: startPos,
                map: map,
                draggable: true,
                title: 'Drag to select location'
            });

            // Initial reverse geocode
            reverseGeocode(startPos);

            // Drag events
            marker.addListener('dragstart', () => {
                isDragging.value = true;
            });

            marker.addListener('drag', () => {
                updateCoords(marker.getPosition());
            });

            marker.addListener('dragend', () => {
                isDragging.value = false;
                const pos = marker.getPosition();
                updateCoords(pos);
                reverseGeocode(pos);
            });
        });

        /**
         * Search for an address
         */
        function searchLocation() {
            if (!searchAddress.value || !geocoder) return;

            geocoder.geocode({ address: searchAddress.value }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    map.setCenter(location);
                    marker.setPosition(location);
                    updateCoords(location);
                    resolvedAddress.value = results[0].formatted_address;
                } else {
                    alert('Geocode failed: ' + status);
                }
            });
        }

        /**
         * Navigate to manually entered coordinates
         */
        function goToCoordinates() {
            const lat = parseFloat(latitude.value);
            const lng = parseFloat(longitude.value);
            if (isNaN(lat) || isNaN(lng)) return;

            const pos = new google.maps.LatLng(lat, lng);
            map.setCenter(pos);
            marker.setPosition(pos);
            reverseGeocode(pos);
        }

        /**
         * Get current location using HTML5 Geolocation
         */
        function getCurrentLocation() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported.');
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                marker.setPosition(pos);
                updateCoords(pos);
                reverseGeocode(pos);
            }, () => {
                alert('Geolocation service failed.');
            });
        }

        /**
         * Programmatically set marker position (callable from outside)
         */
        function setMarkerPosition(lat, lng) {
            const pos = { lat, lng };
            map.setCenter(pos);
            marker.setPosition(pos);
            latitude.value = lat.toFixed(6);
            longitude.value = lng.toFixed(6);
            reverseGeocode(pos);
        }

        return {
            latitude, longitude, searchAddress, resolvedAddress,
            isDragging, searchLocation, goToCoordinates,
            getCurrentLocation, setMarkerPosition
        };
    }
});

app.mount('#app');
<\/script>

</body>
</html>`;

const vueSfcCode = `<template>
  <div class="location-picker">
    <div class="picker-header">
      <h2>Vue Location Picker</h2>
      <span class="status-badge" v-if="isDragging">Dragging...</span>
    </div>

    <div class="controls">
      <div class="search-group">
        <input v-model="searchAddress" @keyup.enter="searchLocation"
               placeholder="Search for an address...">
        <button @click="searchLocation">Search</button>
        <button @click="getCurrentLocation">My Location</button>
      </div>

      <div class="coords-grid">
        <div class="coord-field">
          <label>Latitude</label>
          <input v-model="latitude" @keyup.enter="goToCoordinates">
        </div>
        <div class="coord-field">
          <label>Longitude</label>
          <input v-model="longitude" @keyup.enter="goToCoordinates">
        </div>
      </div>

      <div v-if="resolvedAddress" class="address-display">
        <strong>Address:</strong> {{ resolvedAddress }}
      </div>
    </div>

    <div ref="mapContainer" style="width:100%;height:420px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const latitude = ref('24.7282');
const longitude = ref('46.7622');
const searchAddress = ref('');
const resolvedAddress = ref('');
const isDragging = ref(false);
const mapContainer = ref(null);

let map = null;
let marker = null;
let geocoder = null;

function reverseGeocode(pos) {
  geocoder.geocode({ location: pos }, (results, status) => {
    if (status === 'OK' && results[0]) {
      resolvedAddress.value = results[0].formatted_address;
      searchAddress.value = results[0].formatted_address;
    }
  });
}

function updateCoords(latLng) {
  latitude.value = (typeof latLng.lat === 'function')
    ? latLng.lat().toFixed(6) : latLng.lat.toFixed(6);
  longitude.value = (typeof latLng.lng === 'function')
    ? latLng.lng().toFixed(6) : latLng.lng.toFixed(6);
}

onMounted(() => {
  const startPos = new google.maps.LatLng(24.7282, 46.7622);
  geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(mapContainer.value, {
    zoom: 8, center: startPos,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  marker = new google.maps.Marker({
    position: startPos, map, draggable: true,
    title: 'Drag to select location'
  });

  reverseGeocode(startPos);

  marker.addListener('dragstart', () => isDragging.value = true);
  marker.addListener('drag', () => updateCoords(marker.getPosition()));
  marker.addListener('dragend', () => {
    isDragging.value = false;
    updateCoords(marker.getPosition());
    reverseGeocode(marker.getPosition());
  });
});

function searchLocation() {
  if (!searchAddress.value) return;
  geocoder.geocode({ address: searchAddress.value }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const loc = results[0].geometry.location;
      map.setCenter(loc); marker.setPosition(loc);
      updateCoords(loc);
      resolvedAddress.value = results[0].formatted_address;
    }
  });
}

function goToCoordinates() {
  const lat = parseFloat(latitude.value);
  const lng = parseFloat(longitude.value);
  if (isNaN(lat) || isNaN(lng)) return;
  const pos = new google.maps.LatLng(lat, lng);
  map.setCenter(pos); marker.setPosition(pos);
  reverseGeocode(pos);
}

function getCurrentLocation() {
  if (!navigator.geolocation) return alert('Not supported');
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
    map.setCenter(pos); marker.setPosition(pos);
    updateCoords(pos); reverseGeocode(pos);
  });
}
<\/script>`;

export default function VuePage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="py-12 md:py-16 border-b" style={{ borderColor: "oklch(0.88 0.015 250)" }}>
        <div className="container">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.6 0.2 155 / 0.12)" }}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M2 3h3.5L12 15 18.5 3H22L12 21 2 3z" fill="oklch(0.6 0.2 155)" />
              </svg>
            </div>
            <div>
              <div className="stamp-badge mb-2" style={{ color: "oklch(0.6 0.2 155)" }}>
                Vue 3
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.15 0.02 250)" }}>
                Vue.js Integration
              </h1>
            </div>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "oklch(0.4 0.02 250)" }}>
            A reactive location picker using Vue 3 Composition API. All map data (coordinates, address, drag state)
            is managed as reactive refs, making it easy to integrate with your Vue application's state management.
            Includes both CDN and Single File Component (SFC) versions.
          </p>
        </div>
      </section>

      {/* Live Demo */}
      <section className="py-12 md:py-16" style={{ background: "oklch(0.97 0.005 250)" }}>
        <div className="container max-w-4xl">
          <SectionHeader
            badge="Live Demo"
            badgeColor="oklch(0.6 0.2 155)"
            title="Try It Live"
            description="Interact with the Vue 3 location picker below. Drag the marker, search for addresses, or use your current location."
          />
          <LiveDemo src="/demos/vue-demo.html" title="Vue 3" accentColor="oklch(0.6 0.2 155)" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          {/* Vue Advantages */}
          <SectionHeader
            badge="Why Vue?"
            badgeColor="oklch(0.6 0.2 155)"
            title="Vue 3 Advantages"
            description="Using Vue's reactivity system with the location picker provides several benefits."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Reactive Coordinates", desc: "Latitude, longitude, and address are reactive refs that automatically update the UI when changed." },
              { title: "Template Bindings", desc: "v-model for two-way binding on inputs, @keyup.enter for keyboard events, v-if for conditional rendering." },
              { title: "Composition API", desc: "Clean separation of concerns with setup() function. Easy to extract into a composable (useLocationPicker)." },
              { title: "Lifecycle Hooks", desc: "onMounted() ensures the map initializes after the DOM is ready, preventing timing issues." },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
                <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: "oklch(0.45 0.02 250)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* API Key */}
          <ApiKeyBanner />

          {/* CDN Version */}
          <SectionHeader
            badge="CDN Version"
            badgeColor="oklch(0.6 0.2 155)"
            title="Complete CDN File"
            description="A single HTML file using Vue 3 via CDN. No build tools needed. Perfect for quick prototypes."
          />
          <CodeBlock code={vueFullCode} language="vue" filename="index.html (Vue 3 CDN)" />

          {/* SFC Version */}
          <SectionHeader
            badge="SFC Version"
            badgeColor="oklch(0.6 0.2 155)"
            title="Single File Component"
            description="For Vue projects using Vite or Vue CLI. This is a .vue Single File Component with <script setup>."
          />
          <CodeBlock code={vueSfcCode} language="vue" filename="LocationPicker.vue" />

          {/* Key Concepts */}
          <SectionHeader
            badge="Key Concepts"
            badgeColor="oklch(0.6 0.2 155)"
            title="How It Works in Vue"
            description="Understanding the reactive data flow in the Vue location picker."
          />

          <div className="space-y-6">
            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Reactive State
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                All user-facing data is stored in Vue refs. When the marker is dragged, the refs update automatically,
                and the template re-renders. Google Maps objects (map, marker, geocoder) are stored as plain variables
                since they manage their own rendering.
              </p>
              <CodeBlock code={`// Reactive state (triggers UI updates)
const latitude = ref('24.7282');
const longitude = ref('46.7622');
const searchAddress = ref('');
const resolvedAddress = ref('');
const isDragging = ref(false);

// Non-reactive (Google Maps manages its own rendering)
let map = null;
let marker = null;
let geocoder = null;`} language="javascript" filename="Reactive vs Non-reactive" />
            </div>

            <div className="p-5 rounded-lg border" style={{ borderColor: "oklch(0.88 0.015 250)", background: "white" }}>
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.2 0.02 250)" }}>
                Template Bindings
              </h4>
              <p className="text-sm mb-3" style={{ color: "oklch(0.45 0.02 250)" }}>
                Vue's template syntax makes the HTML clean and declarative. v-model provides two-way binding,
                and event modifiers like @keyup.enter handle keyboard events elegantly.
              </p>
              <CodeBlock code={`<!-- Two-way binding with v-model -->
<input v-model="searchAddress" @keyup.enter="searchLocation"
       placeholder="Search for an address...">

<!-- Conditional rendering -->
<span v-if="isDragging" class="status-badge">Dragging...</span>

<!-- Reactive text interpolation -->
<div v-if="resolvedAddress">
  <strong>Address:</strong> {{ resolvedAddress }}
</div>`} language="vue" filename="Template Bindings" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
