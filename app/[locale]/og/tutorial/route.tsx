import { ImageResponse } from "next/og"

import { SITE_URL } from "@/lib/constants"

export function GET(request: Request) {
  const url = new URL(request.url)

  // Extract values from URL params (now required)
  const title = url.searchParams.get("title")
  const subtitle = url.searchParams.get("subtitle")
  const author = url.searchParams.get("author")
  // const date = url.searchParams.get("date")
  const estimatedReadTime = url.searchParams.get("timeToRead")
  const skill = url.searchParams.get("skill")

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
        >
          {/* Dark overlay for better contrast */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // background: "rgba(0, 0, 0, 0.6)",

              background: "linear-gradient(to top, #7c3aed80, transparent)",
            }}
          />
          <div
            style={{
              width: "300px",
              height: "300px",
              background: "linear-gradient(to bottom, #320b75, #14052e)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <svg width="180" height="180" viewBox="0 0 80 80" fill="none">
              <g clipPath="url(#clip0_8145_137)">
                <path
                  d="M77.6469 80.0002V70.0269C77.6469 62.6625 69.458 57.8047 62.0914 57.8047H35.4247C28.0625 57.8047 19.8691 62.6625 19.8691 70.0269V80.0002H77.6469Z"
                  fill="#CCD6DD"
                />
                <path
                  d="M48.6371 9.06885C57.7571 9.06885 72.9638 13.6311 72.9638 33.3955C72.9638 53.1622 72.9638 57.7244 68.4016 57.7244C63.8394 57.7244 57.7571 53.1622 48.6349 53.1622C39.5127 53.1622 33.5571 57.7244 28.8682 57.7244C23.786 57.7244 24.306 39.4777 24.306 33.3955C24.306 13.6311 39.5127 9.06885 48.6371 9.06885Z"
                  fill="#FFAC33"
                />
                <path
                  d="M40.5996 63.3113C43.8574 65.6757 53.6352 65.6757 56.8929 63.3113V50.7246H40.5996V63.3113Z"
                  fill="#FFDC5D"
                />
                <path
                  d="M40.5859 53.7554C42.857 56.3243 45.6748 57.0198 48.737 57.0198C51.8015 57.0198 54.6193 56.3265 56.8926 53.7554V47.231H40.5859V53.7554Z"
                  fill="#F9CA55"
                />
                <path
                  d="M30.3887 32.7311C30.3887 19.7667 38.5576 9.25781 48.6353 9.25781C58.7087 9.25781 66.8776 19.7689 66.8776 32.7311C66.8776 45.6934 58.7087 55.5845 48.6353 55.5845C38.5598 55.5867 30.3887 45.6934 30.3887 32.7311Z"
                  fill="#FFDC5D"
                />
                <path
                  d="M48.6372 50.1224C45.0683 50.1224 43.1994 48.3557 42.9994 48.1557C42.4038 47.5602 42.4038 46.5979 42.9994 46.0068C43.5905 45.4157 44.5372 45.4113 45.135 45.9891C45.2127 46.0624 46.3594 47.0824 48.6372 47.0824C50.9438 47.0824 52.0927 46.0313 52.1394 45.9891C52.7461 45.4202 53.7016 45.4379 54.2794 46.0335C54.8572 46.6291 54.8572 47.5691 54.2705 48.1557C54.0705 48.3557 52.2038 50.1224 48.6372 50.1224Z"
                  fill="#DF1F32"
                />
                <path
                  d="M25.9259 40.0269C25.8792 37.8047 25.8281 39.5291 25.8281 38.9936C25.8281 31.3891 30.3903 40.0913 30.3903 34.6758C30.3903 29.2558 33.4303 28.7136 36.4703 25.6736C37.9925 24.1536 41.0325 21.1713 41.0325 21.1713C41.0325 21.1713 48.6347 25.7647 54.717 25.7647C60.797 25.7647 66.8814 28.8202 66.8814 34.9024C66.8814 40.9824 71.4436 31.3824 71.4436 38.9847C71.4436 39.5269 71.3947 37.8047 71.3547 40.0269H72.9525C72.9659 35.5824 72.9659 35.7513 72.9659 32.9113C72.9659 13.1447 57.7614 5.78467 48.637 5.78467C39.517 5.78467 24.3103 13.0224 24.3103 32.7891C24.3103 34.5513 24.2659 35.5824 24.3281 40.0269H25.9259Z"
                  fill="#FFAC33"
                />
                <path
                  d="M34.1907 33.2156C34.1907 36.4334 32.5596 39.0423 30.5485 39.0423C28.5374 39.0423 26.9062 36.4334 26.9062 33.2156C26.9062 29.9978 28.5374 27.3867 30.5485 27.3867C32.5596 27.3867 34.1907 29.9978 34.1907 33.2156ZM70.6085 33.2156C70.6085 36.4334 68.9796 39.0423 66.9663 39.0423C64.9551 39.0423 63.324 36.4334 63.324 33.2156C63.324 29.9978 64.9529 27.3867 66.9663 27.3867C68.9796 27.3867 70.6085 29.9978 70.6085 33.2156Z"
                  fill="#FFDC5D"
                />
                <path
                  d="M41.2218 37.5511C40.1885 37.5511 39.3418 36.7045 39.3418 35.6689V33.7911C39.3418 32.7578 40.1885 31.9111 41.2218 31.9111C42.2573 31.9111 43.104 32.7578 43.104 33.7911V35.6689C43.1018 36.7067 42.2573 37.5511 41.2218 37.5511ZM56.2551 37.5511C55.2218 37.5511 54.3751 36.7045 54.3751 35.6689V33.7911C54.3751 32.7578 55.2218 31.9111 56.2551 31.9111C57.2885 31.9111 58.1351 32.7578 58.1351 33.7911V35.6689C58.1329 36.7067 57.2862 37.5511 56.2551 37.5511Z"
                  fill="#662113"
                />
                <path
                  d="M50.6155 43.3599H46.8599C46.3421 43.3599 45.9199 42.9399 45.9199 42.4177V42.0799C45.9199 41.5599 46.3399 41.1377 46.8599 41.1377H50.6155C51.1333 41.1377 51.5577 41.5599 51.5577 42.0799V42.4177C51.5577 42.9377 51.1355 43.3599 50.6155 43.3599Z"
                  fill="#C1694F"
                />
                <path
                  d="M42.2225 79.9998L39.8691 59.5132C39.8691 59.5132 43.0025 63.1687 48.758 63.1687C54.5136 63.1687 58.1336 59.5132 58.1336 59.5132L55.418 79.9998H42.2225Z"
                  fill="#66757F"
                />
                <path
                  d="M39.8683 56.111C41.1283 57.3687 46.3549 79.9998 46.3549 79.9998H39.3416L35.5549 74.3065L39.3416 68.0065L34.8594 66.5976L35.4238 57.8043C35.4238 57.8043 39.266 55.5087 39.8683 56.111ZM57.6327 56.111C56.3727 57.3687 51.146 79.9998 51.146 79.9998H58.1594L61.946 74.3065L58.1594 68.0065L62.6416 66.5976L62.0771 57.8043C62.0771 57.8043 58.2327 55.5087 57.6327 56.111Z"
                  fill="#F5F8FA"
                />
                <path
                  opacity="0.4"
                  d="M32.7852 28.3335H65.0074V40.0002H32.7852V28.3335Z"
                  fill="white"
                />
                <path
                  d="M64.4447 26.6665H33.3336C31.1113 26.6665 31.1113 28.8887 31.1113 28.8887V37.7776C31.1113 41.0243 36.2958 42.2221 40.0002 42.2221C43.7047 42.2221 45.7758 39.9998 48.8891 39.9998C52.0024 39.9998 54.0736 42.2221 57.778 42.2221C61.4824 42.2221 66.6669 41.0243 66.6669 37.7776V28.8887C66.6669 26.6643 64.4447 26.6665 64.4447 26.6665ZM64.4447 35.5554C64.4447 38.4998 62.5513 39.9998 57.778 39.9998C54.358 39.9998 51.5469 37.7776 48.8891 37.7776C46.2313 37.7776 43.4202 39.9998 40.0002 39.9998C35.2269 39.9998 33.3336 38.4998 33.3336 35.5554V28.8887H64.4447V35.5554Z"
                  fill="#F5F8FA"
                />
                <path
                  d="M11 33.25L14 29.25L11 30.25L8 29.25L11 33.25Z"
                  fill="#9266CC"
                />
                <path d="M11 30L14 29L11 25L8 29L11 30Z" fill="#9266CC" />
                <path
                  d="M15 24.25L18 20.25L15 21.25L12 20.25L15 24.25Z"
                  fill="#9266CC"
                />
                <path d="M15 21L18 20L15 16L12 20L15 21Z" fill="#9266CC" />
                <path
                  d="M18 34.25L21 30.25L18 31.25L15 30.25L18 34.25Z"
                  fill="#9266CC"
                />
                <path d="M18 31L21 30L18 26L15 30L18 31Z" fill="#9266CC" />
                <path
                  d="M22.2222 40H11.1111C11.1111 40 6.66667 40 6.66667 44.4444C6.66667 48.8889 11.1111 48.8889 11.1111 48.8889V60L2.22222 71.1111C0.26 73.5644 0 75.1578 0 75.5556C0 80 4.44444 80 4.44444 80H28.8889C28.8889 80 33.3333 80 33.3333 75.5556C33.3333 75.2578 33.6733 74.3133 31.1111 71.1111L22.2222 60V48.8889C22.2222 48.8889 26.6667 48.8889 26.6667 44.4444C26.6667 40 22.2222 40 22.2222 40Z"
                  fill="#A8BCCC"
                />
                <path
                  d="M19.9998 60.7799V46.6666H22.222C23.2198 46.6399 24.4442 46.2355 24.4442 44.4444C24.4442 42.6599 23.2287 42.2511 22.2042 42.2222H11.1109C10.1109 42.2488 8.88867 42.6533 8.88867 44.4444C8.88867 46.2355 10.1109 46.6399 11.1376 46.6666L13.3042 46.7199L13.3331 60.7799L9.12423 66.0422L16.6664 73.82L24.2087 66.0422L19.9998 60.7799Z"
                  fill="#E1E8ED"
                />
                <path
                  d="M2.2207 75.6309C2.22293 77.3464 3.44515 77.7509 4.47181 77.7775H28.8896C29.8874 77.7509 31.1118 77.3464 31.1118 75.5553V75.4642L31.1251 75.282C31.1251 75.2753 31.0029 74.5331 29.3763 72.4998L24.2096 66.042H9.12515L3.95848 72.4998C2.3607 74.4975 2.2207 75.6198 2.2207 75.6309Z"
                  fill="#9266CC"
                />
              </g>
              <defs>
                <clipPath id="clip0_8145_137">
                  <rect width="80" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "60px",
              height: "60px",
              background: colors.primary,
              borderRadius: "50%",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "80px",
              width: "40px",
              height: "40px",
              background: colors.accentA,
              borderRadius: "50%",
              opacity: 0.4,
            }}
          />
        </div>
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
