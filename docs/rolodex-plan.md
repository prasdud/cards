# COMPREHENSIVE ROLODEX COMPONENT BUILD GUIDE FOR AI AGENTS

## 🎯 PRIMARY OBJECTIVE
Build a React component that mimics a **physical office rolodex** with premium styling, realistic 3D flip animations, and full keyboard/button navigation. The component must feel tactile, responsive, and professional.

---

## CORE CONCEPT & MENTAL MODEL

Think of this like a **Rolodex Rotary File** from the 1980s-2000s:
- A spinning cylinder with cards stacked on a spring-loaded rod
- You push a lever UP to reveal the previous card
- You push a lever DOWN to reveal the next card
- Each card has contact information written on it
- There's a counter showing your position (e.g., "Card 5 of 42")
- You can see the edges of cards above and below the current one

**Your component should:**
1. Display ONE card at a time in a prominent 3D view
2. Have UP/DOWN buttons below the card for navigation
3. Flip with a smooth 3D rotation animation (like the card is flipping in real space)
4. Support keyboard navigation (arrow keys)
5. Loop around (last card → first card when going down)
6. Show position counter
7. Fetch card data from your existing backend API
8. Handle loading and error states gracefully

---

## TECHNICAL ARCHITECTURE

### State Variables (Required)
```
cards → Array of card objects from API
currentIndex → Integer (0 to cards.length - 1)
isFlipping → Boolean (prevents rapid clicks during animation)
isLoading → Boolean (API fetch state)
error → String or null (error message if fetch fails)
cardFlipAngle → Number (0-180 for CSS transform)
```

### Data Flow
1. Component mounts
2. Fetch cards from `/api/cards` (or your existing endpoint)
3. Parse response and populate `cards` state
4. Display card at `currentIndex`
5. User clicks UP/DOWN or presses keyboard
6. Update `currentIndex` with circular logic
7. Trigger flip animation (600ms duration)
8. On animation complete, unlock interaction (isFlipping = false)

---

## ANIMATION REQUIREMENTS

### The 3D Flip Effect (CRITICAL)
- **Perspective**: 1000px (creates depth illusion)
- **Axis**: Rotate on X-axis (horizontal flip)
- **Duration**: 600ms
- **Easing**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (spring/bounce feel)
- **Starting rotation**: 0deg (front showing)
- **Ending rotation**: 180deg (back showing? or new front showing?)

**Animation Sequence:**
1. Press DOWN arrow
2. Card rotates 180deg on X-axis smoothly
3. While card is at 90deg mid-rotation, swap the displayed content
4. User sees the new card when rotation completes
5. Card settles at 180deg, then IMMEDIATELY rotates back to 0deg for the NEW card
6. Alternative: Rotate -180deg (upward flip) for DOWN and +180deg (downward flip) for UP

### Visual Details
- Cards have subtle shadows that change during animation
- Gold accent glow on buttons during hover
- Smooth easing prevents jerky movements
- No lag, no frame drops (use GPU acceleration with `will-change: transform`)

---

## STYLING & DESIGN SYSTEM

### Color Palette
| Element | Color | Use |
|---------|-------|-----|
| Background | `#1a1a1a` (deep charcoal) | Main container background |
| Card Background | `#f8f7f3` (cream/ivory) | Card surface |
| Card Text | `#2c2c2c` (dark gray) | Text on cards |
| Primary Accent | `#d4af37` (brushed gold) | Buttons, highlights |
| Hover Accent | `#e8e5db` (warm off-white) | Button hover state |
| Shadow Color | `rgba(0, 0, 0, 0.15)` | Depth/shadows |

### Typography
- **Display Font**: Syne (Google Fonts) - For headers, counter, button labels
- **Body Font**: Lora (Google Fonts) - For card content
- **Font Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Card Name**: 1.5rem, bold, dark gray
- **Card Fields**: 0.95rem, regular, medium gray
- **Card Labels**: 0.85rem, semibold, gold accent
- **Counter**: 1.5rem, bold, gold

### Sizing
- **Card**: 320px wide × 480px tall (golden ratio)
- **Button**: 48px × 48px, circular
- **Button Icon**: 1.5rem font size
- **Border Radius**: 8px (cards), 50% (buttons)
- **Gap Between Elements**: 24px (large), 16px (medium), 12px (small)

### Shadows (Layered Depth)
```
Soft: 0 8px 24px rgba(0, 0, 0, 0.08)
Medium: 0 16px 48px rgba(0, 0, 0, 0.12)
Gold Glow: 0 0 20px rgba(212, 175, 55, 0.2)
Inset Light: inset 0 1px 0 rgba(255, 255, 255, 0.5)
```

---

## COMPONENT STRUCTURE (JSX Layout)

```
RolodexContainer (main wrapper, dark background, centered)
  ├── LoadingState (if isLoading)
  ├── ErrorState (if error)
  └── MainContent
      ├── CardFlipContainer (3D perspective parent)
      │   └── Card (the actual card with flip animation)
      │       ├── CardHeader
      │       │   └── Name / Title
      │       ├── CardBody
      │       │   ├── Field (Title)
      │       │   ├── Field (Company)
      │       │   ├── Field (Email)
      │       │   ├── Field (Phone)
      │       │   ├── Field (Address)
      │       │   └── Field (Notes)
      │       └── CardFooter
      │           └── Card Counter (e.g., "5 of 24")
      └── NavigationControls
          ├── UpButton (↑)
          ├── CardCounter Display
          └── DownButton (↓)
```

---

## CARD DATA MODEL

### Expected Card Object Structure
```javascript
{
  id: "string",              // Unique identifier
  name: "string",            // Person's name (REQUIRED)
  title: "string",           // Job title
  company: "string",         // Company name
  email: "string",           // Email address
  phone: "string",           // Phone number
  address: "string",         // Physical address
  notes: "string",           // Additional notes
  category: "string",        // Optional: type/category for color coding
  dateAdded: "ISO string",   // Optional: creation date
  lastModified: "ISO string" // Optional: last edit date
}
```

### Display Logic
- **Always Show**: name, title, company, email, phone
- **Show If Available**: address, notes
- **Field Label**: Show in gold, smaller, above the value
- **Missing Fields**: Show as "(Not provided)" or simply omit the row

---

## NAVIGATION LOGIC

### Button Click Handlers
```javascript
// UP Button (Previous Card)
handlePrevious = () => {
  if (isFlipping) return; // Prevent spam clicking
  
  setIsFlipping(true);
  setCurrentIndex(prev => 
    prev === 0 ? cards.length - 1 : prev - 1
  );
  
  // Unlock after animation completes
  setTimeout(() => setIsFlipping(false), 600);
}

// DOWN Button (Next Card)
handleNext = () => {
  if (isFlipping) return; // Prevent spam clicking
  
  setIsFlipping(true);
  setCurrentIndex(prev => 
    prev === cards.length - 1 ? 0 : prev + 1
  );
  
  setTimeout(() => setIsFlipping(false), 600);
}
```

### Keyboard Support
```javascript
// Listen for keyboard events
// ArrowUp or PageUp → handlePrevious()
// ArrowDown or PageDown → handleNext()
// Escape → (optional: blur or clear focus)

// Attach listener on mount, remove on unmount
// Use useEffect cleanup to prevent memory leaks
```

### Button States
- **Disabled**: Never disable (circular navigation)
- **Hover**: Slight scale up (1.05x), gold glow shadow
- **Active/Pressed**: Scale down (0.95x), solid background
- **During Flip**: Visually disabled (opacity: 0.6, cursor: not-allowed) for 600ms

---

## API INTEGRATION (FOLLOW YOUR EXISTING BACKEND)

### Fetch Pattern
```javascript
useEffect(() => {
  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use YOUR existing endpoint (likely /api/cards or /api/contacts)
      const response = await fetch('/api/cards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include auth headers if required (Bearer token, etc.)
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // IMPORTANT: Map response to expected card structure
      // If your API returns { data: [...] }, extract it
      // If your API returns { cards: [...] }, use that
      // Handle whatever structure you have
      
      const cardList = data.cards || data.data || data;
      setCards(Array.isArray(cardList) ? cardList : []);
      
    } catch (err) {
      setError(err.message || 'Failed to load cards');
      setCards([]); // Clear cards on error
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchCards();
}, []);
```

### Important Notes
- **Authentication**: If your API requires auth tokens, add them to headers
- **Error Handling**: Show user-friendly error message, NOT raw errors
- **Empty State**: If no cards returned, show appropriate message
- **Retry Logic**: Add a "Retry" button in error state
- **Response Mapping**: Adapt to YOUR existing API response format

---

## CSS/STYLING APPROACH

### Framework/Method
- **Preferred**: Tailwind CSS + Custom CSS-in-JS or CSS modules
- **Alternative**: Plain CSS with CSS variables
- **Requirement**: Import Syne and Lora from Google Fonts

### Critical Animations
```css
/* 3D Flip Animation */
@keyframes flipDown {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(180deg);
  }
}

/* Button Hover Glow */
@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }
  100% {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### CSS Variables (For consistency)
```css
:root {
  --primary-dark: #1a1a1a;
  --card-bg: #f8f7f3;
  --text-dark: #2c2c2c;
  --accent-gold: #d4af37;
  --accent-light: #e8e5db;
  --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 16px 48px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(212, 175, 55, 0.2);
}
```

---

## RESPONSIVE DESIGN

### Breakpoints
| Device | Width | Card Size | Button Size | Adjustments |
|--------|-------|-----------|-------------|-------------|
| Mobile | < 640px | 280px × 420px | 40px | Reduced padding, smaller fonts |
| Tablet | 640-1024px | 300px × 450px | 44px | Standard layout |
| Desktop | > 1024px | 320px × 480px | 48px | Full effects, hover states |

### Mobile Considerations
- Stack vertically (buttons below counter below card)
- Reduce shadow intensity
- Keep animations smooth (no jank on older devices)
- Touch targets: minimum 44px × 44px
- Adjust font sizes proportionally

---

## LOADING STATE

### Display While Fetching
- Centered spinner animation (rotating ring or dots)
- Text: "Loading your rolodex..."
- No interaction possible
- Duration: Typically 0.5-3 seconds

### Spinner Animation
```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

---

## ERROR STATE

### Display If Fetch Fails
- Error icon (⚠️ or similar)
- Clear error message: "Failed to load cards: [specific error]"
- "Retry" button that calls fetch again
- Optional: Suggestion to check internet connection
- Same dark background as main component

---

## ACCESSIBILITY REQUIREMENTS

### Keyboard Navigation
- Arrow keys work (↑ previous, ↓ next)
- Tab through buttons
- Enter/Space to activate buttons
- Clear visual focus indicators (gold outline)

### Screen Reader Support
- Buttons have `aria-label`: e.g., "Previous Card", "Next Card"
- Card content marked with semantic HTML (h2 for name, etc.)
- Counter read as: "Card 5 of 24"

### Visual Accessibility
- High contrast: Gold on charcoal meets WCAG AAA
- No color-only information (use icons + text)
- Focus indicators minimum 2px

---

## PERFORMANCE CHECKLIST

1. **GPU Acceleration**: Add `will-change: transform` to animated elements
2. **Debouncing**: `isFlipping` flag prevents rapid clicks
3. **Memory**: Cleanup event listeners in useEffect return
4. **Memoization**: Wrap CardDisplay in `React.memo()` if list is 100+
5. **Image Loading**: If cards have photos, use lazy loading

---

## FILE STRUCTURE

```
src/
├── components/
│   └── Rolodex/
│       ├── Rolodex.jsx (main component)
│       ├── Rolodex.module.css (styles)
│       ├── Card.jsx (individual card)
│       ├── Card.module.css
│       ├── NavigationControls.jsx
│       └── NavigationControls.module.css
├── hooks/
│   └── useRolodex.js (custom hook for logic)
└── styles/
    └── globals.css (fonts, variables)
```

---

## IMPLEMENTATION STEPS (IN ORDER)

### Phase 1: Structure
1. Create base component with container and layout
2. Create Card subcomponent with sample data
3. Set up navigation buttons (non-functional)
4. Import fonts from Google Fonts
5. Apply color scheme via CSS variables

### Phase 2: State & Logic
1. Add state variables (cards, currentIndex, isFlipping, isLoading, error)
2. Implement handleNext() and handlePrevious() functions
3. Connect buttons to handlers
4. Add keyboard event listener
5. Test navigation with mock data

### Phase 3: API Integration
1. Create useEffect hook for data fetching
2. Implement fetch logic with error handling
3. Map API response to card structure
4. Update state with real data
5. Test with actual backend

### Phase 4: Animations
1. Create 3D flip animation (CSS @keyframes or CSS-in-JS)
2. Apply animation to card on navigation
3. Adjust easing and timing
4. Test smoothness across browsers
5. Add GPU acceleration optimizations

### Phase 5: Polish
1. Add loading state UI
2. Add error state UI with retry
3. Implement responsive design
4. Add hover/focus states
5. Test accessibility (keyboard, screen reader)
6. Cross-browser testing

### Phase 6: Refinement
1. Adjust shadows and depth
2. Fine-tune animation curves
3. Optimize performance
4. Test edge cases (empty cards, long text)
5. Mobile testing

---

## COMMON PITFALLS TO AVOID

❌ **Don't:**
- Use `rotate()` instead of `rotateX()` (creates wrong animation)
- Forget to prevent clicks during animation (causes double-flips)
- Hardcode card data instead of fetching from API
- Use `alert()` for errors instead of UI components
- Forget keyboard event cleanup (memory leak)
- Use `transform: scaleX(-1)` instead of 3D rotation (looks flat)
- Make animation too fast/slow (feels wrong)

✅ **Do:**
- Use `rotateX()` for realistic flip
- Set `isFlipping = true` during animation, `false` after
- Always fetch from backend API
- Show graceful error messages
- Remove event listeners on unmount
- Use perspective for true 3D effect
- Test animation timing on various devices

---

## FINAL CHECKLIST FOR AI AGENT

- [ ] Component loads and displays one card
- [ ] UP button moves to previous card
- [ ] DOWN button moves to next card
- [ ] Animation is smooth 3D flip (600ms, spring easing)
- [ ] Keyboard navigation works (arrow keys)
- [ ] Cards loop (last → first, first → last)
- [ ] Counter shows position (e.g., "5 of 24")
- [ ] API fetch works and maps data correctly
- [ ] Loading state displays while fetching
- [ ] Error state shows if API fails, with retry
- [ ] Buttons disabled/locked during animation
- [ ] Hover effects on buttons (scale, glow)
- [ ] Mobile responsive (tests at 375px, 768px, 1024px)
- [ ] Keyboard accessible (focus visible, arrow keys work)
- [ ] No console errors or warnings
- [ ] Animation smooth on low-end devices
- [ ] No rapid-click bugs
- [ ] Card shadows look natural
- [ ] Typography matches design system
- [ ] All colors match palette

---

## STYLE.XML INTEGRATION

**If your project has a style.xml:**
- Import/respect existing color variables
- If animations are restricted, prioritize the flip effect above all else
- Override restrictions for `transform` and `transition` properties
- Maintain responsive breakpoints defined in style.xml
- Use custom CSS for 3D effects if needed
- Don't break design system but prioritize user experience

---

## SUCCESS CRITERIA

Your rolodex is complete when:
1. It looks and feels like a physical rolodex from the 80s-2000s
2. Animations are smooth and satisfying
3. Navigation is intuitive (arrows, buttons, keyboard)
4. Data comes from your backend API
5. It works perfectly on mobile, tablet, desktop
6. Code is clean, maintainable, and well-commented
7. No performance issues or lag
8. Accessible to keyboard and screen reader users
9. Error handling is graceful
10. It's something you're genuinely proud to show

---

**Remember:** This is a high-attention detail component. Polish matters. Test thoroughly. Prioritize the user experience above all else.