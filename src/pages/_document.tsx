import { Lang } from "@/lib/types"
import { isLangRightToLeft } from "@/lib/utils/translations"
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

import theme from "@/@chakra-ui/theme"

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return await NextDocument.getInitialProps(ctx)
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

    return (
      <Html dir={dir} lang={locale}>
        <Head />
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
