import { ImageResponse } from "next/og"

import { SITE_URL } from "@/lib/constants"

export function GET(request: Request) {
  const url = new URL(request.url)

  // Extract values from URL params (now required)
  const title = url.searchParams.get("title")
  let subtitle = url.searchParams.get("subtitle")
  const author = url.searchParams.get("author")
  // const date = url.searchParams.get("date")
  const estimatedReadTime = url.searchParams.get("timeToRead")
  const skill = url.searchParams.get("skill")

  const MAX_DESCRIPTION_LENGTH = 150
  if (subtitle && subtitle.length > MAX_DESCRIPTION_LENGTH) {
    // Find the last space before the MAX_DESCRIPTION_LENGTH character limit
    const lastSpaceIndex = subtitle.lastIndexOf(" ", MAX_DESCRIPTION_LENGTH)
    // If a space was found, truncate at that position, otherwise just truncate at MAX_DESCRIPTION_LENGTH
    const truncateIndex =
      lastSpaceIndex > 0 ? lastSpaceIndex : MAX_DESCRIPTION_LENGTH
    subtitle = subtitle.slice(0, truncateIndex) + "..."
  }

  // Handle tags - can be passed as comma-separated string
  const tagsParam = url.searchParams.get("tags")
  const tags = tagsParam ? tagsParam.split(",").map((tag) => tag.trim()) : null

  // Simple hex colors that work with Next.js ImageResponse
  const colors = {
    background: "#000000",
    backgroundHigh: "#1c1c1c",
    backgroundMedium: "#212121",
    backgroundHighlight: "#f7f7f7",
    body: "#ffffff",
    bodyMedium: "#8c8c8c",
    bodyLight: "#cfcfcf",
    primary: "#7c3aed",
    primaryHighContrast: "#5b21b6",
    primaryLowContrast: "#f3e8ff",
    primaryHover: "#8b5cf6",
    accentA: "#3b82f6",
    accentAHover: "#60a5fa",
    accentB: "#ec4899",
    accentC: "#0d9488",
    success: "#059669",
    successLight: "#dcfce7",
    border: "#cfcfcf",
    borderHighContrast: "#8c8c8c",
    borderLowContrast: "#f3f3f3",
  }

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.background,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            flex: 1,
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
            <div
              style={{
                fontSize: "32px",
                color: colors.body,
                fontWeight: "600",
              }}
            >
              ethereum.org/developers
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {title && (
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "700",
                  color: colors.body,
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                style={{
                  fontSize: "28px",
                  color: colors.bodyMedium,
                  margin: 0,
                  lineHeight: "1.3",
                }}
              >
                {subtitle}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                {tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: colors.primaryLowContrast,
                      color: colors.primaryHighContrast,
                      padding: "6px 12px",
                      borderRadius: "16px",
                      fontSize: "18px",
                      border: `1px solid ${colors.primary}`,
                      textTransform: "uppercase",
                      fontWeight: "600",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 5 && (
                  <span
                    style={{
                      color: colors.bodyMedium,
                      fontSize: "18px",
                      padding: "6px 0",
                    }}
                  >
                    +{tags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              {author && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: colors.bodyMedium,
                    fontSize: "20px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M0.666016 14.0001C0.665911 13.0298 0.901142 12.0738 1.35156 11.2143C1.80197 10.3549 2.45402 9.61732 3.25195 9.06521C4.04986 8.51314 4.96993 8.16293 5.93294 8.04438C6.83586 7.93327 7.75155 8.02932 8.61068 8.32368L8.7819 8.38488L8.8444 8.41222C9.14682 8.56271 9.29215 8.92068 9.17057 9.2436C9.04881 9.56672 8.70302 9.73991 8.3763 9.65311L8.31185 9.63227L8.04427 9.54113C7.41549 9.34674 6.75168 9.28735 6.09635 9.36795C5.34741 9.46012 4.63164 9.73227 4.01107 10.1616C3.39042 10.591 2.88288 11.165 2.53255 11.8334C2.18227 12.5019 1.99927 13.2454 1.99935 14.0001L1.99609 14.0678C1.96215 14.4042 1.67797 14.6667 1.33268 14.6668C0.987594 14.6668 0.703521 14.4045 0.669271 14.0685L0.666016 14.0001Z"
                      fill={colors.bodyMedium}
                    />
                    <path
                      d="M13.9956 10.0085C13.9785 9.837 13.903 9.67565 13.7801 9.55273C13.6571 9.42982 13.4958 9.35431 13.3243 9.33724L13.2501 9.33333C13.0761 9.33333 12.9083 9.39384 12.7749 9.50326L12.7202 9.55273L10.047 12.2272C9.98753 12.2866 9.93964 12.3569 9.90636 12.4336L9.87837 12.5124L9.49035 13.8418L10.8204 13.4538C10.9276 13.4224 11.0253 13.3648 11.1043 13.2858L13.7801 10.6126L13.8295 10.5579C13.9389 10.4245 13.9995 10.2567 13.9995 10.0827L13.9956 10.0085ZM15.3302 10.1862C15.3046 10.7009 15.0889 11.1892 14.7228 11.5553L12.047 14.2285C11.8095 14.466 11.5159 14.6396 11.1935 14.7337L9.28006 15.2923C9.10803 15.3425 8.92565 15.3452 8.75207 15.3008C8.5784 15.2563 8.41984 15.1658 8.29308 15.0391C8.16634 14.9123 8.07585 14.7537 8.03136 14.5801C7.98693 14.4065 7.98967 14.2241 8.03983 14.0521L8.59842 12.1387L8.63748 12.0189C8.73713 11.7434 8.89576 11.4923 9.10363 11.2845L11.7775 8.61003L11.8523 8.53906C12.2344 8.19308 12.7322 8 13.2501 8L13.3536 8.0026C13.8683 8.0282 14.3566 8.24393 14.7228 8.61003C15.1133 9.0006 15.3328 9.53033 15.3328 10.0827L15.3302 10.1862Z"
                      fill={colors.bodyMedium}
                    />
                    <path
                      d="M9.33268 5.3335C9.33268 3.86074 8.13878 2.66683 6.66602 2.66683C5.19326 2.66683 3.99935 3.86074 3.99935 5.3335C3.99935 6.80626 5.19326 8.00016 6.66602 8.00016C8.13878 8.00016 9.33268 6.80626 9.33268 5.3335ZM10.666 5.3335C10.666 7.54264 8.87515 9.3335 6.66602 9.3335C4.45688 9.3335 2.66602 7.54264 2.66602 5.3335C2.66602 3.12436 4.45688 1.3335 6.66602 1.3335C8.87515 1.3335 10.666 3.12436 10.666 5.3335Z"
                      fill={colors.bodyMedium}
                    />
                  </svg>
                  {author}
                </div>
              )}

              {estimatedReadTime && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: colors.bodyMedium,
                    fontSize: "20px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7.33333"
                      stroke={colors.bodyMedium}
                      strokeWidth="1.33333"
                    />
                    <path
                      d="M8 4.66667V8L10.6667 10.6667"
                      stroke={colors.bodyMedium}
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {estimatedReadTime}
                </div>
              )}
            </div>

            {skill && (
              <div
                style={{
                  background: colors.successLight,
                  color: colors.success,
                  border: `1px solid ${colors.success}`,
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                }}
              >
                {skill}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Visual */}
        <div
          style={{
            width: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${SITE_URL}/images/heroes/developers-hub-hero.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
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
