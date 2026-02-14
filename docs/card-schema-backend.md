# Card Backend Schema

To support the customizable, themed cards in the Rolodex and Profile views, the backend API should return data structured as follows.

## API Response Structure

**Endpoint**: `GET /api/rolodex`
**Response**: `Array<CardObject>`

```json
[
  {
    "id": "card_123xyz",
    "owner_id": "user_456",
    "content": {
      "name": "Patrick Bateman",
      "role": "Vice President",
      "company": "Pierce & Pierce",
      "email": "patrick.b@pierce.com",
      "phone": "+1 555 0199",
      "website": "www.pierceandpierce.com"
    },
    "style": {
      "theme_variant": "monochrome", 
      "texture": "lines",
      "typography": {
        "header_font": "Playfair Display",
        "body_font": "Source Serif 4"
      },
      "custom_colors": {
        "background": "#ffffff",
        "foreground": "#000000",
        "accent": "#000000"
      }
    },
    "created_at": "2026-02-14T12:00:00Z",
    "updated_at": "2026-02-14T12:00:00Z"
  }
]
```

## Field Definitions

### 1. `content` (The Data)
Standard contact information displayed on the card face.
- `name`: (Required) Full display name.
- `role`: Job title or primary descriptor.
- `company`: Organization name.
- `email`: Contact email.

### 2. `style` (The Visuals)
Controls the rendering logic in `RolodexCard`.

*   **`theme_variant`**: Maps to CSS class presets.
    *   `monochrome`: Standard white/black.
    *   `cyberpunk`: Black/Neon Green, monospace.
    *   `luxury`: Dark Gray/Gold, serif.
    *   `brutalist`: Light Gray/Black, bold borders.

*   **`texture`**: Background SVG pattern.
    *   `noise`
    *   `grid`
    *   `lines`
    *   `circuit`

## Frontend Mapping (TypeScript)

This JSON structure maps to the `ContactCard` interface used in `types/card.ts`:

```typescript
export interface ContactCard {
    id: string;
    // ... maps from content.*
    theme: {
        variant: CardTheme; // maps from style.theme_variant
        texture: CardTexture; // maps from style.texture
        // ...
    }
}
```
