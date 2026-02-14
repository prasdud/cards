# VISUAL REFERENCE & CODE EXAMPLES FOR ROLODEX BUILD

## 📐 LAYOUT VISUAL

```
┌─────────────────────────────────────────────────────────────┐
│                    DARK BACKGROUND (#1a1a1a)               │
│                                                             │
│                                                             │
│                   ╔═══════════════════════╗                │
│                   ║                       ║                │
│                   ║      CARD (320×480)   ║  ← Cream/Ivory│
│                   ║    showing contact    ║     Background │
│                   ║     information       ║                │
│                   ║                       ║                │
│                   ║   Name                ║                │
│                   ║   Title               ║                │
│                   ║   Company             ║                │
│                   ║   Email               ║                │
│                   ║   Phone               ║                │
│                   ║                       ║                │
│                   ║      5 of 24          ║  ← Gold counter│
│                   ╚═══════════════════════╝                │
│                                                             │
│                    ↑          5 of 24         ↓            │
│                 [Button]    [Counter]      [Button]        │
│                (48×48px)                   (48×48px)        │
│                  Gold                        Gold           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 COLOR REFERENCE

```
BACKGROUND:
#1a1a1a = Deep Charcoal (main dark background)

CARD:
#f8f7f3 = Cream/Ivory (card surface)
#2c2c2c = Dark Gray (text on card)

ACCENTS:
#d4af37 = Brushed Gold (buttons, highlights)
#e8e5db = Warm Off-White (hover state)

SHADOWS:
rgba(0, 0, 0, 0.08) = Soft shadow
rgba(0, 0, 0, 0.12) = Medium shadow
rgba(212, 175, 55, 0.2) = Gold glow

Visual Example (in text):
┌──────────────────┐
│ Gold Button      │ ← #d4af37 background, #1a1a1a text
│ ↑               │
└──────────────────┘

┌──────────────────┐
│                  │
│   Cream Card     │ ← #f8f7f3 background
│   Dark Text      │ ← #2c2c2c text
│   Gold Labels    │ ← #d4af37 labels
│                  │
└──────────────────┘
```

## 🎭 ANIMATION TIMING

```
FLIP ANIMATION TIMELINE (600ms total):

Time    Card Angle   Opacity   What Happens
0ms     0°          1.0       Initial state, card showing front
150ms   45°         0.95      Card spinning, starting to fade
300ms   90°         0.8       Card perpendicular, content swap happens
450ms   135°        0.95      Card spinning back into view
600ms   180°        1.0       New card front showing, animation complete

CSS: transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
     └─ Spring bounce effect (slight overshoot for tactile feel)
```

## 🔄 STATE FLOW DIAGRAM

```
INITIAL STATE:
cards = []
currentIndex = 0
isFlipping = false
isLoading = true
error = null

↓ [Component Mounts]

FETCH STATE:
isLoading = true (show spinner)

↓ [API responds successfully]

SUCCESS STATE:
cards = [Card1, Card2, Card3, ...] (from API)
currentIndex = 0
isFlipping = false
isLoading = false (hide spinner)
error = null

↓ [User clicks DOWN]

ANIMATING STATE:
isFlipping = true (lock navigation)
currentIndex = 1 (updated)

↓ [600ms passes]

READY STATE:
isFlipping = false (unlock navigation)
Card displays new content

↓ [User clicks UP]

ANIMATING STATE:
isFlipping = true
currentIndex = 0 (back to first)

[Cycle repeats...]

↓ [If API fetch fails]

ERROR STATE:
cards = []
currentIndex = 0
isFlipping = false
isLoading = false
error = "Failed to load cards: [reason]"
Shows error message + Retry button
```

## 💻 COMPONENT PSEUDOCODE

```javascript
// ============================================
// MAIN COMPONENT STRUCTURE
// ============================================

export default function Rolodex() {
  // STATE
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // EFFECTS
  useEffect(() => {
    // Fetch cards from API on mount
    fetchCards();
  }, []);

  useEffect(() => {
    // Add keyboard listeners
    addKeyboardListeners();
    // Cleanup on unmount
    return removeKeyboardListeners;
  }, [cards.length, isFlipping]);

  // HANDLERS
  function handlePrevious() {
    if (isFlipping || cards.length === 0) return;

    setIsFlipping(true);
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));

    setTimeout(() => setIsFlipping(false), 600);
  }

  function handleNext() {
    if (isFlipping || cards.length === 0) return;

    setIsFlipping(true);
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

    setTimeout(() => setIsFlipping(false), 600);
  }

  function fetchCards() {
    // Call API, map data, handle errors
  }

  function addKeyboardListeners() {
    // Listen for arrow keys
  }

  function removeKeyboardListeners() {
    // Cleanup
  }

  // RENDER
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchCards} />;
  if (!cards.length) return <EmptyState />;

  const currentCard = cards[currentIndex];

  return (
    <div className="rolodex-wrapper">
      <div className="card-flip-container">
        <Card
          card={currentCard}
          isFlipping={isFlipping}
          index={currentIndex}
          total={cards.length}
        />
      </div>

      <div className="navigation-controls">
        <button
          onClick={handlePrevious}
          disabled={isFlipping}
          aria-label="Previous Card"
        >
          ↑
        </button>

        <span className="card-counter">
          {currentIndex + 1} of {cards.length}
        </span>

        <button
          onClick={handleNext}
          disabled={isFlipping}
          aria-label="Next Card"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
```

## 🃏 CARD COMPONENT EXAMPLE

```javascript
function Card({ card, isFlipping, index, total }) {
  return (
    <div className={`card ${isFlipping ? "flipping" : ""}`}>
      <div className="card-header">
        <h2 className="card-name">{card.name}</h2>
      </div>

      <div className="card-body">
        {card.title && (
          <div className="card-field">
            <span className="field-label">Title</span>
            <span className="field-value">{card.title}</span>
          </div>
        )}

        {card.company && (
          <div className="card-field">
            <span className="field-label">Company</span>
            <span className="field-value">{card.company}</span>
          </div>
        )}

        {card.email && (
          <div className="card-field">
            <span className="field-label">Email</span>
            <span className="field-value email">{card.email}</span>
          </div>
        )}

        {card.phone && (
          <div className="card-field">
            <span className="field-label">Phone</span>
            <span className="field-value">{card.phone}</span>
          </div>
        )}

        {card.address && (
          <div className="card-field">
            <span className="field-label">Address</span>
            <span className="field-value">{card.address}</span>
          </div>
        )}

        {card.notes && (
          <div className="card-field">
            <span className="field-label">Notes</span>
            <span className="field-value">{card.notes}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="card-index">
          {index + 1} of {total}
        </span>
      </div>
    </div>
  );
}
```

## 🎨 CSS MODULE TEMPLATE

```css
/* ============================================
   GLOBALS
   ============================================ */

@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Lora:wght@400;600;700&display=swap");

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

/* ============================================
   MAIN CONTAINER
   ============================================ */

.rolodex-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem;
  gap: 3rem;
  font-family: "Lora", serif;
}

/* ============================================
   CARD CONTAINER & 3D SETUP
   ============================================ */

.card-flip-container {
  position: relative;
  width: 320px;
  height: 480px;
  perspective: 1000px;
  filter: drop-shadow(var(--shadow-medium));
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--card-bg);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transform-origin: center;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  will-change: transform;
}

.card.flipping {
  transform: rotateX(180deg);
}

/* ============================================
   CARD CONTENT
   ============================================ */

.card-header {
  border-bottom: 2px solid var(--accent-gold);
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  font-family: "Syne", sans-serif;
  margin: 0;
  letter-spacing: -0.5px;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.card-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field-value {
  font-size: 0.95rem;
  color: var(--text-dark);
  line-height: 1.4;
  word-break: break-word;
}

.card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  text-align: center;
}

.card-index {
  font-size: 0.85rem;
  color: var(--text-dark);
  font-weight: 600;
  font-family: "Syne", sans-serif;
}

/* ============================================
   NAVIGATION BUTTONS
   ============================================ */

.navigation-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.navigation-controls button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-gold);
  border: 2px solid var(--accent-gold);
  color: var(--primary-dark);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: var(--shadow-soft);
  will-change: transform;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: "Syne", sans-serif;
}

.navigation-controls button:hover:not(:disabled) {
  background: var(--accent-light);
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.navigation-controls button:active:not(:disabled) {
  transform: scale(0.95);
}

.navigation-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ============================================
   COUNTER DISPLAY
   ============================================ */

.card-counter {
  font-family: "Syne", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-gold);
  letter-spacing: 0.05em;
  min-width: 120px;
  text-align: center;
}

/* ============================================
   LOADING STATE
   ============================================ */

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  gap: 2rem;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(212, 175, 55, 0.2);
  border-top-color: var(--accent-gold);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: var(--accent-gold);
  font-size: 1.2rem;
  font-family: "Syne", sans-serif;
}

/* ============================================
   ERROR STATE
   ============================================ */

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  gap: 2rem;
  padding: 2rem;
}

.error-message {
  background: rgba(212, 175, 55, 0.1);
  border: 2px solid var(--accent-gold);
  border-radius: 8px;
  padding: 2rem;
  color: var(--accent-light);
  text-align: center;
  max-width: 500px;
  font-size: 1.1rem;
}

.error-state button {
  padding: 0.8rem 1.5rem;
  background: var(--accent-gold);
  color: var(--primary-dark);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.error-state button:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

@media (max-width: 640px) {
  .card-flip-container {
    width: 280px;
    height: 420px;
  }

  .card {
    padding: 1.5rem;
  }

  .card-name {
    font-size: 1.25rem;
  }

  .navigation-controls button {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  .card-counter {
    font-size: 1.25rem;
  }

  .rolodex-wrapper {
    gap: 2rem;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .card-flip-container {
    width: 300px;
    height: 450px;
  }
}
```

## 🔌 KEYBOARD EVENT LISTENER

```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    // Prevent default browser behavior
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case "ArrowUp":
      case "PageUp":
        handlePrevious();
        break;
      case "ArrowDown":
      case "PageDown":
        handleNext();
        break;
      default:
        break;
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  return () => {
    window.removeEventListener("keydown", handleKeyPress);
  };
}, [cards.length, isFlipping]);
```

## 🔄 API FETCH IMPLEMENTATION

```javascript
async function fetchCards() {
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch("/api/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add auth if needed:
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle different response structures
    let cardList = data.cards || data.data || data;
    if (!Array.isArray(cardList)) {
      cardList = [];
    }

    // Validate and filter cards
    const validCards = cardList.filter((card) => card.name);

    if (validCards.length === 0) {
      setError("No cards found");
      setCards([]);
    } else {
      setCards(validCards);
      setCurrentIndex(0);
    }
  } catch (err) {
    setError(err.message || "Failed to load cards");
    setCards([]);
  } finally {
    setIsLoading(false);
  }
}
```

---

## 📝 KEY IMPLEMENTATION NOTES FOR AGENT

1. **3D Perspective**: The parent `.card-flip-container` needs `perspective: 1000px`
2. **Transform Origin**: Set to `center` for proper flip
3. **Backface Visibility**: Optional but helps with performance
4. **GPU Acceleration**: Use `will-change: transform` on animated elements
5. **Animation Timing**: 600ms with spring easing (cubic-bezier) for feel
6. **State Lock**: Set `isFlipping = true` before animation, `false` after
7. **Circular Navigation**: Use modulo logic to wrap around
8. **Event Cleanup**: Always remove listeners in useEffect return
9. **Loading/Error**: Show appropriate UI states before main component
10. **Mobile First**: Design responsive from smallest screen up

---

This is your detailed blueprint. Use these visuals, code examples, and specifications to build the perfect rolodex.
