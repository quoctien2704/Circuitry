export type ThemeConfig = {
  colors: {
    [key: string]:{
      primary: string
      secondary: string
      background: string;
      foreground: string;
    }
  },
  config: {
    header_sticky: boolean
    theme_mode: string
  }
}