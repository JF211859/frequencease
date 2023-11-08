// Note: Don't use these outside of the file, use APP_THEME instead
export const COLORS = {
  LIGHT_BLUE: "#A4D3FF",
  MEDIUM_BLUE: "#92C3F0",
  DARK_BLUE: "#258EEF",
  PURPLE: "#B89ADF",
  GREEN: "#90BC57",
  TEAL: "#6EBF9D",
  RED: "#F87272",
  LIGHT_GREY: "#F6F3F3",
  GREY: "#DCDCDC",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
};

export const APP_THEME = {
  BACKGROUND: COLORS.WHITE,
  TEXT_STANDARD: COLORS.BLACK,
  TEXT_SECONDARY: COLORS.GREY,
  TEXT_TERTIARY: COLORS.LIGHT_GREY,
  APP_BLUE: COLORS.LIGHT_BLUE,
  APP_BLUE_MED: COLORS.MEDIUM_BLUE,
  APP_BLUE_DARK: COLORS.DARK_BLUE,
  CONFIRM: COLORS.GREEN,
  CANCEL: COLORS.RED,
  PHASE_1: COLORS.MEDIUM_BLUE,
  PHASE_2: COLORS.PURPLE,
  PHASE_3: COLORS.TEAL,
};

export const getTheme = () => APP_THEME;
