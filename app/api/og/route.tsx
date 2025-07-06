/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants"

// http://localhost:3000/api/og/?title=Title&description=Description&author=Paul&slugString=security

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const description = searchParams.get("description")
  const author = searchParams.get("author")
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
    fetch(new URL("/fonts/Roboto-Black.ttf", SITE_URL)),
  ])

  const [regularFontData, boldFontData] = await Promise.all([
    regularFontResponse.arrayBuffer(),
    boldFontResponse.arrayBuffer(),
  ])

  return new ImageResponse(
    (
      <div tw="relative w-full h-full font-sans flex">
        <div tw="absolute inset-0" />
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

        {/* Content overlay with safe zones */}
        <div tw="absolute inset-0 flex flex-col justify-between p-12">
          {/* Content box with 50% width, safe zones */}
          <div tw="w-2/3 bg-black bg-opacity-90 rounded-2xl p-12 text-white flex flex-col gap-6">
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
              {slugString && (
                <span tw="text-4xl block mx-4">
                  ethereum.org/{slugString.split("/")[0]}
                </span>
              )}
            </div>

            {/* Main content */}
            <div tw="flex flex-col gap-4">
              {title && (
                <h1 tw="text-7xl font-bold leading-tight">
                  {title.split(" | ")[0]}
                </h1>
              )}

              {description && (
                <p tw="text-3xl text-gray-200 leading-snug">
                  {description.length > 160
                    ? description.slice(0, 120).replace(/\s+\S*$/, "") + "..."
                    : description}
                </p>
              )}

              {author && <p tw="text-base text-gray-300">By {author}</p>}
            </div>
          </div>
        </div>
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
}
