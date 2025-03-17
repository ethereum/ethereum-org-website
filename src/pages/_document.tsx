import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    // TODO: Fix this! Hacky way to get locale to fix search
    // Get locale from query
    const locale = ctx.query?.locale || "en"
    return { ...initialProps, locale }
  }

  render() {
    const locale = this.props.locale || "en"
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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
