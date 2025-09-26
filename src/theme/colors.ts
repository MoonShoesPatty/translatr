// Custom color utilities for easy access to your theme colors
export const colors = {
  warmWhite: {
    lightest: 'var(--mantine-color-warmWhite-0)',
    light: 'var(--mantine-color-warmWhite-3)',
    main: 'var(--mantine-color-warmWhite-5)',
    dark: 'var(--mantine-color-warmWhite-7)',
    darkest: 'var(--mantine-color-warmWhite-9)',
  },
  electricBlue: {
    lightest: 'var(--mantine-color-electricBlue-0)',
    light: 'var(--mantine-color-electricBlue-3)',
    main: 'var(--mantine-color-electricBlue-5)',
    dark: 'var(--mantine-color-electricBlue-7)',
    darkest: 'var(--mantine-color-electricBlue-9)',
  },
  neutralGrey: {
    lightest: 'var(--mantine-color-neutralGrey-0)',
    light: 'var(--mantine-color-neutralGrey-3)',
    main: 'var(--mantine-color-neutralGrey-5)',
    dark: 'var(--mantine-color-neutralGrey-7)',
    darkest: 'var(--mantine-color-neutralGrey-9)',
  },
  darkAlmostBlack: {
    lightest: 'var(--mantine-color-darkAlmostBlack-0)',
    light: 'var(--mantine-color-darkAlmostBlack-3)',
    main: 'var(--mantine-color-darkAlmostBlack-5)',
    dark: 'var(--mantine-color-darkAlmostBlack-7)',
    darkest: 'var(--mantine-color-darkAlmostBlack-9)',
  },
} as const;

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number) => {
  return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
};

// Common color combinations for your app
export const colorCombinations = {
  primary: {
    background: colors.warmWhite.main,
    text: colors.darkAlmostBlack.darkest,
    accent: colors.electricBlue.main,
  },
  secondary: {
    background: colors.neutralGrey.light,
    text: colors.darkAlmostBlack.darkest,
    accent: colors.electricBlue.dark,
  },
  dark: {
    background: colors.darkAlmostBlack.darkest,
    text: colors.warmWhite.main,
    accent: colors.electricBlue.light,
  },
  card: {
    background: colors.warmWhite.light,
    border: colors.neutralGrey.light,
    text: colors.darkAlmostBlack.darkest,
  },
} as const;
