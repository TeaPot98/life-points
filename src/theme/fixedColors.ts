import { ShadedColor } from "./types";

export const FIXED_COLORS = {
  blue: {
    main: "#82dbde",
    dark: "#376263",
    contrastText: "#376263",
  },
  purple: {
    main: "#8297de",
    dark: "#374163",
    contrastText: "#374163",
  },
  red: {
    main: "#de8282",
    dark: "#633737",
    contrastText: "#633737",
  },
  orange: {
    main: "#dec282",
    dark: "#635637",
    contrastText: "#635637",
  },
  green: {
    main: "#b3de82",
    dark: "#4f6337",
    contrastText: "#4f6337",
  },
  pink: {
    main: "#de82b8",
    dark: "#633751",
    contrastText: "#633751",
  },
  yellow: {
    main: "#d8de82",
    dark: "#606337",
    contrastText: "#606337",
  },
} satisfies Record<string, ShadedColor>;
