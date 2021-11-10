import { createTheme } from "@mui/material/styles";

interface BackgroundForeground {
  background: string;
  foreground: string;
}

interface Badges {
  elite: BackgroundForeground;
  high: BackgroundForeground;
  medium: BackgroundForeground;
  low: BackgroundForeground;
  none: BackgroundForeground;
}

declare module "@mui/material/styles" {
  interface Palette {
    badges?: Badges;
  }
  interface PaletteOptions {
    badges: Badges;
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "#111111",
      paper: "#222222",
    },
    badges: {
      elite: {
        background: "#51A6FF",
        foreground: "#103EFF",
      },
      high: {
        background: "#7DE97C",
        foreground: "#008A06",
      },
      low: {
        background: "#FF8064",
        foreground: "#D70000",
      },
      medium: {
        background: "#FAFF94",
        foreground: "#8C8D00",
      },
      none: {
        background: "#C9C9C9",
        foreground: "#3E3E3E",
      },
    },
    error: {
      main: "#CC0000",
    },
    mode: "dark",
    primary: {
      main: "#103EFF",
    },
  },
});

export default theme;
