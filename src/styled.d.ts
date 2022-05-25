// import original module declarations
import "styled-components"

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    // TODO: to be defined better when we implement a UI lib
    isDark: boolean
    colors: any
    fonts: {
      monospace: string
    }
    fontSizes: {
      xs: string
      s: string
      m: string
      r: string
      l: string
      xl: string
    }
    breakpoints: {
      xs: string
      s: string
      m: string
      l: string
      xl: string
    }
    variables: {
      maxPageWidth: string
      navHeight: string
      navBannerHeightDesktop: string
      navBannerHeightTablet: string
      navBannerHeightMobile: string
      navSubNavHeightDesktop: string
      navSideNavHeightMobile: string
    }
  }
}
