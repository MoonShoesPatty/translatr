import { createTheme } from '@mantine/core';

export const customTheme = createTheme({
  colors: {
    // Custom color palette
    warmWhite: [
      '#fefefe', // 0 - lightest
      '#fdfcfb', // 1
      '#faf9f7', // 2
      '#f7f5f2', // 3
      '#f4f1ed', // 4
      '#f1ede8', // 5 - main warm off-white
      '#ede8e2', // 6
      '#e8e2db', // 7
      '#e2dbd3', // 8
      '#dbd3ca', // 9 - darkest
    ],
    electricBlue: [
      '#e6f4ff', // 0 - lightest
      '#bae0ff', // 1
      '#8cc8ff', // 2
      '#5db0ff', // 3
      '#2e98ff', // 4
      '#0080ff', // 5 - main electric blue
      '#0066cc', // 6
      '#004d99', // 7
      '#003366', // 8
      '#001a33', // 9 - darkest
    ],
    neutralGrey: [
      '#f8f9fa', // 0 - lightest
      '#e9ecef', // 1
      '#dee2e6', // 2
      '#ced4da', // 3
      '#adb5bd', // 4
      '#6c757d', // 5 - main neutral grey
      '#495057', // 6
      '#343a40', // 7
      '#212529', // 8
      '#0d1117', // 9 - darkest
    ],
    darkAlmostBlack: [
      '#f6f6f6', // 0 - lightest (rarely used)
      '#e6e6e6', // 1
      '#cccccc', // 2
      '#999999', // 3
      '#666666', // 4
      '#333333', // 5
      '#1a1a1a', // 6
      '#0d0d0d', // 7
      '#080808', // 8
      '#000000', // 9 - main dark almost-black
    ],
  },
  primaryColor: 'electricBlue',
  primaryShade: { light: 5, dark: 6 },
  defaultRadius: 'md',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
  other: {
    // Custom color utilities
    warmWhite: 'var(--mantine-color-warmWhite-5)',
    electricBlue: 'var(--mantine-color-electricBlue-5)',
    neutralGrey: 'var(--mantine-color-neutralGrey-5)',
    darkAlmostBlack: 'var(--mantine-color-darkAlmostBlack-9)',
  },
});
