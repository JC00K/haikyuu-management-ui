export const theme = {
  colors: {
    // Primary (Karasuno)
    primary: {
      main: "#FF6600", // Bright Orange
      light: "#FF8533", // Lighter Orange
      dark: "#CC5200", // Darker Orange
      contrast: "#FFFFFF", // White text on orange
    },

    // Secondary (Black)
    secondary: {
      main: "#1a1a1a", // Deep Black
      light: "#2d2d2d", // Light Black
      dark: "#000000", // Pure Black
      contrast: "#FFFFFF", // White text on black
    },

    // Accent colors for different roles
    roles: {
      player: "#FF6600", // Orange
      coach: "#1976D2", // Blue
      management: "#7B1FA2", // Purple
      fan: "#E91E63", // Pink
      alumni: "#795548", // Brown (nostalgic)
    },

    // Court colors
    court: {
      green: "#2E7D32", // Volleyball court green
      lines: "#FFFFFF", // Court lines
    },

    // Semantic colors
    success: "#2E7D32", // Green
    error: "#D32F2F", // Red
    warning: "#F57C00", // Orange
    info: "#1976D2", // Blue

    // Neutrals
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
      dark: "#121212",
    },

    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
      disabled: "#999999",
      inverse: "#FFFFFF",
    },

    divider: "#E0E0E0",

    // Position colors (for player positions)
    positions: {
      SETTER: "#1976D2", // Blue
      MIDDLE_BLOCKER: "#D32F2F", // Red
      WING_SPIKER: "#F57C00", // Orange
      OUTSIDE_HITTER: "#7B1FA2", // Purple
      LIBERO: "#2E7D32", // Green
      NONE: "#9E9E9E", // Gray
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    card: "0 2px 8px rgba(0, 0, 0, 0.1)",
    cardHover: "0 8px 16px rgba(0, 0, 0, 0.15)",
  },

  typography: {
    fontFamily: {
      heading: "'Bebas Neue', 'Oswald', sans-serif",
      body: "'Inter', 'Roboto', sans-serif",
      accent: "'Permanent Marker', cursive",
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
      "5xl": "48px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    aiChat: 9999, // AI chat should be on top
  },

  transitions: {
    fast: "150ms ease-in-out",
    base: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
} as const;

/**
 * Generate dynamic school theme colors
 */
export const generateSchoolTheme = (schoolColors: string) => {
  // Parse school colors (assuming format like "Black, Orange" or "#000000, #FF6600")
  const colors = schoolColors.split(",").map((c) => c.trim());

  return {
    primary: colors[0] || theme.colors.primary.main,
    secondary: colors[1] || theme.colors.secondary.main,
    accent: colors[2] || theme.colors.primary.light,
  };
};

/**
 * Get color for role
 */
export const getRoleColor = (role: string): string => {
  const roleColors = theme.colors.roles as Record<string, string>;
  return roleColors[role.toLowerCase()] || theme.colors.primary.main;
};

/**
 * Get color for position
 */
export const getPositionColor = (position: string): string => {
  const positionColors = theme.colors.positions as Record<string, string>;
  return positionColors[position] || theme.colors.positions.NONE;
};

export type Theme = typeof theme;
