import { GetStaticProps } from "next"
import { Html, Head, Main, NextScript } from "next/document"
import { useRouter } from "next/router"

export const getStaticProps: GetStaticProps = async () => {
  const { locale } = useRouter()
  return { props: { locale } }
}

export default function Document({ locale }) {
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
