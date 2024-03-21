import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

import theme from "@/@chakra-ui/theme"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return await NextDocument.getInitialProps(ctx)
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

    return (
      <Html dir={dir} lang={locale}>
        <Head>
          {/* favicon */}
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
          {/* manifest */}
          <link rel="manifest" href="/manifest.json" />
          {/* preload inter static web fonts */}
          <link
            rel="preload"
            href="/fonts/inter/latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
