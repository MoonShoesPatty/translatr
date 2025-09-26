# Custom Mantine Theme

This directory contains the custom color theme for the Translatr application using Mantine UI components.

## Color Palette

### Warm Off-White (`warmWhite`)
- A warm, creamy off-white color perfect for backgrounds
- Range from `warmWhite.0` (lightest) to `warmWhite.9` (darkest)
- Main color: `warmWhite.5`

### Electric Blue (`electricBlue`)
- A vibrant, electric blue color for accents and primary elements
- Range from `electricBlue.0` (lightest) to `electricBlue.9` (darkest)
- Main color: `electricBlue.5`
- Used as the primary color in the theme

### Neutral Grey (`neutralGrey`)
- A balanced, neutral grey for secondary elements
- Range from `neutralGrey.0` (lightest) to `neutralGrey.9` (darkest)
- Main color: `neutralGrey.5`

### Dark Almost-Black (`darkAlmostBlack`)
- A very dark, almost black color for text and high-contrast elements
- Range from `darkAlmostBlack.0` (lightest) to `darkAlmostBlack.9` (darkest)
- Main color: `darkAlmostBlack.9`

## Usage

### In Mantine Components
```tsx
import { Text, Button, Card } from '@mantine/core';

// Using color props
<Text c="electricBlue.5">Electric blue text</Text>
<Button color="electricBlue">Primary button</Button>
<Card bg="warmWhite.1">Card with warm background</Card>
```

### With Custom Color Utilities
```tsx
import { colors, colorCombinations } from './theme/colors';

// Direct color access
<div style={{ backgroundColor: colors.electricBlue.main }}>

// Pre-defined combinations
<div style={{ 
  backgroundColor: colorCombinations.primary.background,
  color: colorCombinations.primary.text 
}}>
```

### CSS Custom Properties
```css
.my-component {
  background-color: var(--mantine-color-warmWhite-5);
  color: var(--mantine-color-darkAlmostBlack-9);
  border: 1px solid var(--mantine-color-neutralGrey-3);
}
```

## Theme Configuration

The theme is configured in `theme.ts` and includes:
- Custom color definitions
- Primary color set to electric blue
- Custom font family (Inter)
- Component default props
- Custom radius settings

## Files

- `theme.ts` - Main theme configuration
- `colors.ts` - Color utilities and helpers
- `README.md` - This documentation

## Examples

See `ThemeShowcase.tsx` component for a complete demonstration of all colors and components using the custom theme.
