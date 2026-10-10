export const colors = {
  primary: '#D8F36A',

  // Temporary placeholder only.
  // Original brand value #1822431 is invalid.
  secondaryPlaceholder: '#182243',

  tertiary: '#F59E0B',
  neutral: '#101A25',

  background: '#F5F7F4',
  surface: '#FFFFFF',
  text: '#101A25',
  textMuted: '#667085',
  border: '#E2E7DF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
} as const;

export const typography = {
  headline: 'Geist',
  body: 'Geist',
  mono: 'JetBrainsMono',
} as const;