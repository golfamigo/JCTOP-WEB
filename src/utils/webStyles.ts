import { Platform, ViewStyle } from 'react-native';

/**
 * Helper to create cross-platform shadow styles
 * Works on both iOS and Web
 */
export const createShadow = (level: 1 | 2 | 3 = 1): ViewStyle => {
  const shadows = {
    1: {
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
      },
      android: {
        elevation: 2,
      },
    },
    2: {
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      web: {
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      },
      android: {
        elevation: 4,
      },
    },
    3: {
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
      },
      android: {
        elevation: 8,
      },
    },
  };

  return Platform.select({
    ios: shadows[level].ios,
    android: shadows[level].android,
    web: shadows[level].web as any,
    default: {},
  }) as ViewStyle;
};

/**
 * Helper for responsive dimensions
 */
export const responsive = {
  width: (percentage: number) => `${percentage}%` as any,
  maxWidth: (pixels: number) => ({ maxWidth: pixels }),
  minWidth: (pixels: number) => ({ minWidth: pixels }),
};

/**
 * Web-specific style helpers
 */
export const webOnly = (styles: ViewStyle): ViewStyle => {
  return Platform.OS === 'web' ? styles : {};
};

/**
 * Mobile-specific style helpers
 */
export const mobileOnly = (styles: ViewStyle): ViewStyle => {
  return Platform.OS !== 'web' ? styles : {};
};