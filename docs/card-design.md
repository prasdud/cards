# Comprehensive Card Design Schema

This document outlines the detailed schema for the "Card Engine". This engine allows for hyper-customization of digital business cards, simulating physical materials, printing techniques, and premium finishes using modern web technologies (CSS, SVG, Framer Motion).

## 1. Core Concept

The card is composed of multiple layers rendered in a 3D-perspectived container (`CardCanvas`).
1.  **Base Layer**: The "material" (Paper, Metal, Plastic).
2.  **Texture Layer**: Surface irregularities (Grain, Noise, Brushed finish).
3.  **Content Layer**: Typography and Layout.
4.  **Finish Layer**: Special printing effects (Foil, Emboss, Spot UV).
5.  **Atmosphere Layer**: Lighting, reflections, and holographic overlays.

---

## 2. The Data Schema (JSON)

This is the object structure that will be stored in the backend and passed to the frontend renderer.

```typescript
export interface CardDesign {
  // 1. Dimensions & Shape
  layout: {
    aspectRatio: "1.586" | "1" | "0.7"; // Standard (Credit Card), Square, Portrait
    borderRadius: number; // 0 to 24px
    padding: number; // Internal spacing
  };

  // 2. Base Material (The "Physical" Card)
  material: {
    type: "paper" | "metal" | "glass" | "plastic" | "holographic";
    baseColor: string; // Hex or CSS Variable
    opacity: number; // 0.1 to 1.0 (for Glass/Plastic)
    roughness: number; // 0.0 (Glossy) to 1.0 (Matte)
    metalness: number; // 0.0 to 1.0 (affects reflection intensity)
  };

  // 3. Surface Texture (The "Feel")
  texture: {
    type: "none" | "noise" | "canvas" | "linen" | "leather" | "brushed_metal" | "dot_grid";
    intensity: number; // 0.0 to 1.0 (Opacity of the texture overlay)
    scale: number; // Scaling factor for the noise/pattern SVG
    blendMode: "overlay" | "multiply" | "soft-light" | "color-burn";
  };

  // 4. Typography System
  typography: {
    fontFamily: {
      heading: string; // e.g., "Inter", "Playfair Display", "Space Mono"
      body: string;
    };
    scale: number; // Base size multiplier (0.8 to 1.5)
    weight: {
      heading: 100 | 400 | 700 | 900;
      body: 300 | 400 | 500;
    };
    // Special text treatments
    finish: "ink" | "foil_gold" | "foil_silver" | "letterpress" | "embossed";
  };

  // 5. Visual Identity & Graphics
  graphics: {
    logo: {
      url?: string;
      position: "top-left" | "top-center" | "top-right" | "center" | "bottom-left" | "bottom-right";
      scale: number; // 0.5 to 2.0
      blendMode: "normal" | "multiply" | "screen";
      finish?: "inherit" | "foil" | "spot_uv"; // Inherit text finish or custom
    };
    backgroundImage?: {
      url: string;
      opacity: number;
      filters: {
        blur: number; // px
        grayscale: number; // %
      };
    };
  };

  // 6. Interaction & Atmosphere
  effects: {
    enableGyro: boolean; // Mobile only: tilt moves glare
    glareOpacity: number; // Intensity of the shiny reflection
    borderGlow: {
      color?: string;
      intensity: number;
    };
  };
}
```

---

## 3. Implementation Details (The "How-To")

All effects must be achievable with **Tailwind CSS**, **CSS Modules**, and **Framer Motion**. We avoid WebGL for now to keep the bundle size small and performance high on mobile.

### A. Materials & Lighting

**Simulating "Paper":**
- Use a white or off-white `baseColor`.
- High `roughness` (low distinct reflections).
- `noise` texture at varying scales.

**Simulating "Metal" (e.g., Brushed Steel):**
- Use linear-gradient backgrounds to simulate anisotropic reflections.
- `texture: brushed_metal` (an SVG repeating pattern of fine lines).
- High specular highlights (CSS `box-shadow` inset).

**Simulating "Aerogel / Glass":**
- `backdrop-filter: blur(20px)`
- `opacity: 0.2`
- White borders with variable opacity to simulate thickness/edges.

### B. Textures (The Grain)

We will use a library of **SVG Filters** and **CSS Background Patterns**.

**Example: Noise Texture**
Implementation: A tiled SVG with `<feTurbulence>` filter, absolutely positioned over the card `div` with `pointer-events-none`.

```css
.texture-noise {
  background-image: url("data:image/svg+xml,...");
  mix-blend-mode: overlay;
  opacity: var(--texture-intensity);
}
```

**Example: Letterpress (Inset Text)**
Implementation: CSS `text-shadow`.
```css
.finish-letterpress {
  color: transparent;
  background-color: #333;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(255,255,255,0.1), -1px -1px 2px rgba(0,0,0,0.8) inset;
}
```

**Example: Gold Foil**
Implementation: CSS Gradient + Background Clip + Animation.
```css
.finish-foil-gold {
  background: linear-gradient(
    45deg, 
    #BF953F, 
    #FCF6BA, 
    #B38728, 
    #FBF5B7, 
    #AA771C
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Optional: Animate gradient position on hover/tilt */
}
```

### C. The logo

Users can upload an SVG or PNG.
- **Spot UV Effect**:
  - Render the logo image.
  - Apply `filter: drop-shadow(0 0 0 rgba(0,0,0,0))` initially.
  - Apply a high-contrast "glare" overlay using a masking layer that moves with the mouse/gyro to simulate glossy varnish on a matte card.

---

## 4. Animation & Interactivity

**Hover State**:
We use `framer-motion`'s `useMotionValue` to track mouse position relative to the card center.
- **Rotation**: Card tilts X and Y axis based on mouse position.
- **Glare**: A radial gradient overlay (`background: radial-gradient(...)`) moves in the *opposite* direction of the mouse to simulate a light source reflection moving across the surface.

**Intro Animation**:
- **"The Deal"**: Card slides in from the bottom, rotates from flat (X: 90deg) to upright (X: 0deg), accompanied by a "whoosh" easing function.

---

## 5. Example Configuration: "The American Psycho"

```json
{
  "layout": {
    "aspectRatio": "1.586",
    "borderRadius": 0,
    "padding": 24
  },
  "material": {
    "type": "paper",
    "baseColor": "#FAF9F6", // Bone
    "opacity": 1,
    "roughness": 0.9,
    "metalness": 0
  },
  "texture": {
    "type": "linen", // Subtle weaving
    "intensity": 0.15,
    "scale": 1,
    "blendMode": "multiply"
  },
  "typography": {
    "fontFamily": {
      "heading": "Cinzel", // Silian Rail substitute
      "body": "Garamond"
    },
    "scale": 1.0,
    "weight": { "heading": 400, "body": 400 },
    "finish": "letterpress" // Embossed ink look
  },
  "effects": {
    "enableGyro": true,
    "glareOpacity": 0.1, // Very subtle sheen
    "borderGlow": { "intensity": 0 }
  }
}
```

## 6. Example Configuration: "Cyberpunk Netrunner"

```json
{
  "layout": {
    "aspectRatio": "1.586",
    "borderRadius": 12,
    "padding": 20
  },
  "material": {
    "type": "glass",
    "baseColor": "#000000",
    "opacity": 0.6,
    "roughness": 0.2, // Glossy
    "metalness": 0.8
  },
  "texture": {
    "type": "circuit", 
    "intensity": 0.1,
    "scale": 0.5,
    "blendMode": "overlay"
  },
  "typography": {
    "fontFamily": {
      "heading": "Orbitron",
      "body": "Share Tech Mono"
    },
    "scale": 1.1,
    "finish": "foil_silver" // Chromatic aberration effect could be added here
  },
  "effects": {
    "enableGyro": true,
    "glareOpacity": 0.8,
    "borderGlow": { 
      "color": "#00FF00", // Neon Green
      "intensity": 0.8 
    }
  }
}
```
