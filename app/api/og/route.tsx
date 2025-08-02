/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const slugString = searchParams.get("slug")
  const imageParam = searchParams.get("image")

  const src = (() => {
    if (!imageParam) return DEFAULT_OG_IMAGE
    return imageParam.startsWith("http")
      ? imageParam
      : new URL(imageParam, SITE_URL).toString()
  })()

  // Load Roboto fonts (Inter variable and woff2 not supported in ImageResponse)
  const [regularFontResponse, boldFontResponse] = await Promise.all([
    fetch(new URL("/fonts/Roboto-Regular.ttf", SITE_URL)),
    fetch(new URL("/fonts/Roboto-Bold.ttf", SITE_URL)),
  ])

  const [regularFontData, boldFontData] = await Promise.all([
    regularFontResponse.arrayBuffer(),
    boldFontResponse.arrayBuffer(),
  ])

  const imageResponse = new ImageResponse(
    (
      <div tw="relative w-full h-full font-sans flex">
        <div
          tw="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(160deg, transparent, #0F9971, transparent, #6C24DF, #F6109E, transparent)",
          }}
        />
        {/* Background image layer */}
        <img
          src={src}
          alt=""
          tw="absolute inset-0"
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
        />

        {/* Content overlay with safe zones -- image only if empty slug */}
        {slugString?.length && (
          <div tw="absolute inset-0 flex flex-col justify-between p-12">
            <div
              tw="w-2/3 bg-black bg-opacity-90 rounded-2xl p-12 text-white flex flex-col max-h-full"
              style={{
                boxShadow:
                  "0px 2px 12px 1px hsla(263, 77%, 31%, 0.1), 0px 16px 12px -3px hsla(263, 77%, 31%, 0.08), 0px 32px 24px -6px hsla(263, 77%, 31%, 0.16), 0px 40px 40px -12px hsla(263, 74%, 41%, 0.06), 0px -64px 120px 80px hsla(263, 100%, 94%, 0.06)",
              }}
            >
              {/* Logo and breadcrumb */}
              <div tw="flex items-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.7334 27.123L23.9922 48V36.279L39.7334 27.123Z"
                    fill="#C8B2F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25292 27.123L23.9941 48V36.279L8.25292 27.123Z"
                    fill="#EECBC0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.24996 24.7035L23.9941 17.7031V33.6616L8.24996 24.7035Z"
                    fill="#87A9F0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.7383 24.7035L23.9941 17.7031V33.6616L39.7383 24.7035Z"
                    fill="#CAB3F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25292 24.7032L23.9941 0V17.7029L8.25292 24.7032Z"
                    fill="#EECBC0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.7354 24.7032L23.9941 0V17.7029L39.7354 24.7032Z"
                    fill="#B8FBF6"
                  />
                </svg>
                <p tw="text-4xl mx-4">
                  ethereum.org/{slugString.split("/")[0]}
                </p>
              </div>

              {/* Main title */}
              {title && (
                <h1 tw="text-7xl font-bold leading-tight">
                  {title.split(" | ")[0]}
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Roboto",
          data: regularFontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Roboto",
          data: boldFontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )

  // Set cache headers to prevent stale content
  const response = new Response(imageResponse.body, {
    headers: {
      ...imageResponse.headers,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })

  return response
}
