import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { STORAGE_KEY } from "./_app"

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
          <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
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
          {/*
            Still needed to insert the chakra specific classname on the `body` (`chakra-ui-light` & `chakra-ui-dark`)
            and avoid color mode flashing
          */}
          <ColorModeScript initialColorMode="system" storageKey={STORAGE_KEY} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
