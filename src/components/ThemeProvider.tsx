import {ThemeProvider as NextThemesProvider} from 'next-themes'
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Primary theming wrapper with use with color mode. Uses the theme provider
 * from `next-themes`.
 * 
 * Applied to _app.tsx as the main provider for the project, and supplied as the 
 * primary decorator to Storybook.
 */
export const ThemeProvider = ({children}: Pick<ThemeProviderProps, 'children'>) => {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
        </NextThemesProvider>
    )
}