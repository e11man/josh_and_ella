# Josh & Ell Wedding Website - Project Rules & Design System

## Code Reusability Rules

### MANDATORY: Component-Based Architecture
**Rule**: Every UI element must be created as a reusable component. NO duplicate code allowed.

#### Required Reusable Components:
1. **Button Component** - One button component with variants:
   - Primary (main actions like RSVP submit)
   - Secondary (navigation, less important actions)
   - Outline (alternative styling)
   - Size variants: small, medium, large
   - State variants: default, hover, active, disabled

2. **Card Component** - Single card layout for:
   - Wedding party member cards
   - Event detail cards
   - Photo gallery items
   - RSVP confirmation cards

3. **Input Component** - Standardized form inputs:
   - Text input
   - Textarea
   - Select dropdown
   - File upload
   - Checkbox/radio variants

4. **Modal Component** - Reusable for:
   - Photo lightbox
   - RSVP confirmation
   - Error messages
   - Success notifications

5. **Navigation Component** - Consistent across all pages

6. **Section Container** - Standardized content sections with consistent spacing

### Code Organization Rules:
- **Components Folder**: All reusable components in `/components/`
- **Utilities Folder**: Shared functions in `/utils/`
- **Constants File**: All text content, colors, and configuration
- **No Inline Styles**: All styling through CSS classes or styled components
- **Single CSS/Style File**: Centralized styling system

### Development Standards:
- **DRY Principle**: Don't Repeat Yourself - maximum code reuse
- **Component Props**: Make components flexible through props, not duplication
- **Consistent Naming**: Use same naming conventions throughout
- **Shared Utilities**: Create utility functions for common operations (date formatting, image optimization, etc.)

---

## Design System & Color Scheme

### Primary Color Palette
```css
/* Earthy Neutrals - Primary */
--cream-white: #FEFCF7        /* Main background */
--warm-white: #FAF7F0         /* Secondary background */
--paper-white: #F5F2E8        /* Card backgrounds */

/* Earthy Accents */
--sage-green: #9CAF88         /* Primary accent */
--dusty-olive: #7A8471        /* Secondary accent */
--warm-beige: #E8DCC0         /* Subtle highlights */

/* Neutral Grays - Supporting */
--charcoal: #2C2C2C           /* Primary text */
--warm-gray: #6B6B6B          /* Secondary text */
--light-gray: #D4D0C8         /* Borders, dividers */

/* Feedback Colors */
--success-green: #8BA888      /* Confirmations */
--error-earth: #A67B5B        /* Errors - earthy brown */
--warning-gold: #B8A082       /* Warnings - muted gold */
```

### Typography System

#### Font Stack:
```css
/* Primary Font - Elegant Serif for Headings */
--font-primary: 'Playfair Display', 'Georgia', serif;

/* Secondary Font - Clean Sans-serif for Body */
--font-secondary: 'Inter', 'Helvetica Neue', sans-serif;

/* Script Font - Special Occasions (Names, Quotes) */
--font-script: 'Dancing Script', 'Brush Script MT', cursive;
```

#### Typography Scale:
```css
/* Heading Sizes */
--text-h1: 2.5rem;     /* 40px - Main titles */
--text-h2: 2rem;       /* 32px - Section headers */
--text-h3: 1.5rem;     /* 24px - Subsections */
--text-h4: 1.25rem;    /* 20px - Card titles */

/* Body Sizes */
--text-large: 1.125rem;  /* 18px - Important body text */
--text-base: 1rem;       /* 16px - Standard body text */
--text-small: 0.875rem;  /* 14px - Captions, labels */
--text-xs: 0.75rem;      /* 12px - Fine print */

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-loose: 1.8;
```

### Spacing System
```css
/* Consistent Spacing Scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
```

---

## Component Specifications

### Button Component Rules:
```css
/* Base Button - Reuse for ALL buttons */
.btn-base {
  font-family: var(--font-secondary);
  font-weight: 500;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: var(--space-sm) var(--space-lg);
}

/* Button Variants - NO gradients */
.btn-primary {
  background-color: var(--sage-green);
  color: var(--cream-white);
}

.btn-secondary {
  background-color: var(--warm-beige);
  color: var(--charcoal);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--dusty-olive);
  color: var(--dusty-olive);
}
```

### Card Component Rules:
```css
.card-base {
  background-color: var(--paper-white);
  border-radius: 4px;
  padding: var(--space-lg);
  box-shadow: 0 2px 8px rgba(44, 44, 44, 0.1);
  border: 1px solid var(--light-gray);
}
```

---

## Iconography Guidelines

### Icon Style Rules:
- **Style**: Outline/stroke icons only (no filled icons)
- **Weight**: 1.5px stroke width
- **Size**: 16px, 20px, 24px standard sizes
- **Color**: Match text color (--charcoal for primary, --warm-gray for secondary)
- **Source**: Use consistent icon library (Feather Icons or Lucide React recommended)

### Required Icons:
- Navigation: Menu, Close, Arrow Right, Arrow Left
- Actions: Heart, Share, Download, Upload, Calendar
- Communication: Mail, Phone, Map Pin
- Social: Instagram, Facebook (if needed)
- Interface: Check, X, Info, Warning

---

## Layout & Spacing Rules

### Grid System:
- **Container Max Width**: 1200px
- **Grid Columns**: 12-column system
- **Gutters**: var(--space-lg) between columns
- **Section Spacing**: var(--space-3xl) between major sections

### Responsive Breakpoints:
```css
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--large: 1200px;
```

### White Space Rules:
- **Generous spacing** - Don't crowd elements
- **Consistent vertical rhythm** using spacing scale
- **Section padding**: var(--space-2xl) minimum
- **Element margins**: Use spacing scale only, no custom values

---

## Design Principles

### Visual Hierarchy:
1. **Contrast through size and weight**, not color
2. **Consistent spacing** creates rhythm
3. **Typography scale** establishes importance
4. **White space** provides breathing room

### Interaction States:
- **Hover**: Subtle opacity change (0.8) or slight darken
- **Active**: Slight inset shadow effect
- **Focus**: Outline using --dusty-olive
- **Disabled**: 50% opacity, no hover effects

### NO Gradients Policy:
- **Backgrounds**: Solid colors only
- **Buttons**: Flat design with hover states
- **Cards**: Simple shadows, no gradient overlays
- **Images**: No gradient masks or overlays

---

## Implementation Instructions

### For Developers/AI:
1. **Create a design tokens file** with all CSS variables defined above
2. **Build component library first** before any page layouts
3. **Use TypeScript interfaces** for component props consistency
4. **Implement responsive utilities** using breakpoint system
5. **Test components in isolation** before integration

### Component Creation Order:
1. Base typography and spacing utilities
2. Button component with all variants
3. Input components
4. Card component
5. Modal component
6. Navigation component
7. Layout containers

### Validation Rules:
- **NO duplicate styling code**
- **ALL colors from defined palette**
- **ALL spacing from spacing scale**
- **ALL typography from typography system**
- **Components must accept props for customization**

---

## Content Guidelines

### Photography Style:
- **Natural lighting** preferred
- **Consistent editing** - warm, earthy tones
- **No heavy filters** - maintain natural colors
- **High contrast** between subjects and backgrounds

### Text Tone:
- **Warm and welcoming**
- **Clear and concise**
- **Elegant but not overly formal**
- **Personal and authentic**

### Visual Balance:
- **Asymmetrical layouts** allowed but balanced
- **Consistent alignment** throughout
- **Generous white space**
- **Clear visual hierarchy**

---

## Quality Assurance Checklist

Before any component is considered complete:
- [ ] Uses design system colors only
- [ ] Uses spacing scale values only
- [ ] Uses typography system only
- [ ] Has all required interaction states
- [ ] Is fully responsive
- [ ] Follows component naming convention
- [ ] Can be reused with different props
- [ ] Has no duplicate code
- [ ] Matches earthy, formal aesthetic
- [ ] Contains no gradients

This design system ensures consistency, maintainability, and the elegant earthy aesthetic you want while enforcing strict code reusability.