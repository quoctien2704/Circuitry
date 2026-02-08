export type ThemeConfig = {
  colors: {
    [key: string]: ThemeModeData
  },
  config: {
    header_sticky: boolean
    theme_mode: string
  }
}

export interface ThemeModeData {
      primary: string
      secondary: string
      background: string;
      foreground: string;
}