# Google Maps Location Picker

A ready-to-use Google Maps location picker with live demos and full integration guides for **HTML**, **Bootstrap 5**, **Vue.js**, and **Tailwind CSS**. Features address search, reverse geocoding, draggable marker, and geolocation support.

---

## Features

- **Address Search** — Search any address using Google Geocoder and auto-position the marker.
- **Reverse Geocoding** — Drag the marker and get the address automatically.
- **Draggable Marker** — Click and drag to select any location on the map.
- **Geolocation** — Use the browser's geolocation API to detect the user's current position.
- **Coordinate Input** — Manually enter latitude and longitude values to navigate the map.
- **4 Framework Integrations** — Complete, copy-paste-ready code for HTML, Bootstrap 5, Vue 3, and Tailwind CSS.

---

## Live Documentation Site

The documentation site includes live interactive demos for each framework. You can view it online or run it locally.

---

## Prerequisites

Before running the project locally, make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org/) (LTS recommended) |
| **pnpm** | v8 or higher | See installation below |

### Installing Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/). Choose the **LTS** version. This will also install **npm** automatically.

Verify the installation:

```bash
node -v
npm -v
```

### Installing pnpm

After Node.js is installed, install pnpm globally:

**Via npm (all platforms):**

```bash
npm install -g pnpm
```

**Via PowerShell (Windows):**

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**Via curl (macOS / Linux):**

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

After installing pnpm, **close and reopen your terminal** to ensure the command is recognized.

Verify the installation:

```bash
pnpm -v
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ibraheem9/google-maps-location-picker.git
cd google-maps-location-picker
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm dev
```

The site will be available at **http://localhost:3000** (or the port shown in your terminal).

---

## Project Structure

```
google-maps-location-picker/
├── client/
│   ├── public/
│   │   └── demos/                  # Standalone HTML demo files
│   │       ├── html-demo.html      # Pure HTML demo
│   │       ├── bootstrap-demo.html # Bootstrap 5 demo
│   │       ├── vue-demo.html       # Vue 3 demo
│   │       └── tailwind-demo.html  # Tailwind CSS demo
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ApiKeyBanner.tsx    # API key display with copy button
│   │   │   ├── ApiTable.tsx        # API reference table
│   │   │   ├── CodeBlock.tsx       # Syntax-highlighted code block
│   │   │   ├── FeatureCard.tsx     # Feature highlight card
│   │   │   ├── LiveDemo.tsx        # Iframe-based live demo container
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── PageLayout.tsx      # Page wrapper layout
│   │   │   └── SectionHeader.tsx   # Section title component
│   │   ├── pages/                  # Documentation pages
│   │   │   ├── Home.tsx            # Overview with live demo & features
│   │   │   ├── HtmlPage.tsx        # HTML integration guide
│   │   │   ├── BootstrapPage.tsx   # Bootstrap 5 integration guide
│   │   │   ├── VuePage.tsx         # Vue.js integration guide
│   │   │   └── TailwindPage.tsx    # Tailwind CSS integration guide
│   │   ├── App.tsx                 # Routes & layout
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles & design tokens
│   └── index.html                  # HTML template
├── server/                         # Express server (production)
├── package.json
└── README.md
```

---

## Standalone Demo Files

If you only need the location picker without the documentation site, you can use the standalone HTML files directly. They are located in `client/public/demos/`:

| File | Framework | Description |
|------|-----------|-------------|
| `html-demo.html` | Pure HTML | No dependencies beyond Google Maps API |
| `bootstrap-demo.html` | Bootstrap 5 | Uses Bootstrap 5 CDN for styling |
| `vue-demo.html` | Vue 3 | Uses Vue 3 CDN with Composition API |
| `tailwind-demo.html` | Tailwind CSS | Uses Tailwind CSS CDN for utility classes |

Each file is self-contained — just open it in a browser and it works.

---

## Google Maps API Key

The demos use the following API key:

```
AIzaSyAqPAlqD2AE9wvm2Ou19B8dqiD7FVUhyC4
```

For **production use**, replace this key with your own:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Maps JavaScript API** and **Geocoding API**
4. Go to **Credentials** and create an API key
5. Replace `YOUR_API_KEY` in the code with your new key

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm check` | Run TypeScript type checking |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework for the documentation site |
| Tailwind CSS 4 | Styling the documentation site |
| Vite | Build tool and dev server |
| Prism.js | Syntax highlighting in code blocks |
| Framer Motion | Scroll animations |
| Google Maps API | Map rendering, geocoding, and geolocation |

---

## License

MIT

---

## Author

Built by [ibraheem9](https://github.com/ibraheem9)
