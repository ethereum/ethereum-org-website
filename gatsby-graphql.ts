export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type File = Node & {
  sourceInstanceName: Scalars["String"]
  absolutePath: Scalars["String"]
  relativePath: Scalars["String"]
  extension: Scalars["String"]
  size: Scalars["Int"]
  prettySize: Scalars["String"]
  modifiedTime: Scalars["Date"]
  accessTime: Scalars["Date"]
  changeTime: Scalars["Date"]
  birthTime: Scalars["Date"]
  root: Scalars["String"]
  dir: Scalars["String"]
  base: Scalars["String"]
  ext: Scalars["String"]
  name: Scalars["String"]
  relativeDirectory: Scalars["String"]
  dev: Scalars["Int"]
  mode: Scalars["Int"]
  nlink: Scalars["Int"]
  uid: Scalars["Int"]
  gid: Scalars["Int"]
  rdev: Scalars["Int"]
  ino: Scalars["Float"]
  atimeMs: Scalars["Float"]
  mtimeMs: Scalars["Float"]
  ctimeMs: Scalars["Float"]
  atime: Scalars["Date"]
  mtime: Scalars["Date"]
  ctime: Scalars["Date"]
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars["Date"]>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars["Float"]>
  blksize?: Maybe<Scalars["Int"]>
  blocks?: Maybe<Scalars["Int"]>
  fields?: Maybe<FileFields>
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars["String"]>
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>
  /** Returns all children nodes filtered by type ConsensusBountyHuntersCsv */
  childrenConsensusBountyHuntersCsv?: Maybe<
    Array<Maybe<ConsensusBountyHuntersCsv>>
  >
  /** Returns the first child node of type ConsensusBountyHuntersCsv or null if there are no children of given type on this node */
  childConsensusBountyHuntersCsv?: Maybe<ConsensusBountyHuntersCsv>
  /** Returns all children nodes filtered by type WalletsCsv */
  childrenWalletsCsv?: Maybe<Array<Maybe<WalletsCsv>>>
  /** Returns the first child node of type WalletsCsv or null if there are no children of given type on this node */
  childWalletsCsv?: Maybe<WalletsCsv>
  /** Returns all children nodes filtered by type ExchangesByCountryCsv */
  childrenExchangesByCountryCsv?: Maybe<Array<Maybe<ExchangesByCountryCsv>>>
  /** Returns the first child node of type ExchangesByCountryCsv or null if there are no children of given type on this node */
  childExchangesByCountryCsv?: Maybe<ExchangesByCountryCsv>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type FileModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileAccessTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileChangeTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileBirthTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileAtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileMtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type FileCtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

/** Node Interface */
export type Node = {
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type Internal = {
  content?: Maybe<Scalars["String"]>
  contentDigest: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  fieldOwners?: Maybe<Array<Maybe<Scalars["String"]>>>
  ignoreType?: Maybe<Scalars["Boolean"]>
  mediaType?: Maybe<Scalars["String"]>
  owner: Scalars["String"]
  type: Scalars["String"]
}

export type FileFields = {
  gitLogLatestAuthorName?: Maybe<Scalars["String"]>
  gitLogLatestAuthorEmail?: Maybe<Scalars["String"]>
  gitLogLatestDate?: Maybe<Scalars["Date"]>
}

export type FileFieldsGitLogLatestDateArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type Directory = Node & {
  sourceInstanceName: Scalars["String"]
  absolutePath: Scalars["String"]
  relativePath: Scalars["String"]
  extension: Scalars["String"]
  size: Scalars["Int"]
  prettySize: Scalars["String"]
  modifiedTime: Scalars["Date"]
  accessTime: Scalars["Date"]
  changeTime: Scalars["Date"]
  birthTime: Scalars["Date"]
  root: Scalars["String"]
  dir: Scalars["String"]
  base: Scalars["String"]
  ext: Scalars["String"]
  name: Scalars["String"]
  relativeDirectory: Scalars["String"]
  dev: Scalars["Int"]
  mode: Scalars["Int"]
  nlink: Scalars["Int"]
  uid: Scalars["Int"]
  gid: Scalars["Int"]
  rdev: Scalars["Int"]
  ino: Scalars["Float"]
  atimeMs: Scalars["Float"]
  mtimeMs: Scalars["Float"]
  ctimeMs: Scalars["Float"]
  atime: Scalars["Date"]
  mtime: Scalars["Date"]
  ctime: Scalars["Date"]
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars["Date"]>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars["Float"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type DirectoryModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryAccessTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryChangeTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryBirthTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryAtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryMtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type DirectoryCtimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type Site = Node & {
  buildTime?: Maybe<Scalars["Date"]>
  siteMetadata?: Maybe<SiteSiteMetadata>
  port?: Maybe<Scalars["Int"]>
  host?: Maybe<Scalars["String"]>
  flags?: Maybe<SiteFlags>
  polyfill?: Maybe<Scalars["Boolean"]>
  pathPrefix?: Maybe<Scalars["String"]>
  jsxRuntime?: Maybe<Scalars["String"]>
  trailingSlash?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type SiteFlags = {
  FAST_DEV?: Maybe<Scalars["Boolean"]>
}

export type SiteSiteMetadata = {
  title?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  url?: Maybe<Scalars["String"]>
  siteUrl?: Maybe<Scalars["String"]>
  author?: Maybe<Scalars["String"]>
  defaultLanguage?: Maybe<Scalars["String"]>
  supportedLanguages?: Maybe<Array<Maybe<Scalars["String"]>>>
  editContentUrl?: Maybe<Scalars["String"]>
}

export type SiteFunction = Node & {
  functionRoute: Scalars["String"]
  pluginName: Scalars["String"]
  originalAbsoluteFilePath: Scalars["String"]
  originalRelativeFilePath: Scalars["String"]
  relativeCompiledFilePath: Scalars["String"]
  absoluteCompiledFilePath: Scalars["String"]
  matchPath?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SitePage = Node & {
  path: Scalars["String"]
  component: Scalars["String"]
  internalComponentName: Scalars["String"]
  componentChunkName: Scalars["String"]
  matchPath?: Maybe<Scalars["String"]>
  pageContext?: Maybe<Scalars["JSON"]>
  pluginCreator?: Maybe<SitePlugin>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SitePlugin = Node & {
  resolve?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  nodeAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  browserAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  ssrAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  pluginFilepath?: Maybe<Scalars["String"]>
  pluginOptions?: Maybe<Scalars["JSON"]>
  packageJson?: Maybe<Scalars["JSON"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildMetadata = Node & {
  buildTime?: Maybe<Scalars["Date"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: InputMaybe<Scalars["String"]>
  fromNow?: InputMaybe<Scalars["Boolean"]>
  difference?: InputMaybe<Scalars["String"]>
  locale?: InputMaybe<Scalars["String"]>
}

export type MdxFrontmatter = {
  title: Scalars["String"]
}

export type MdxHeadingMdx = {
  value?: Maybe<Scalars["String"]>
  depth?: Maybe<Scalars["Int"]>
}

export type HeadingsMdx = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type MdxWordCount = {
  paragraphs?: Maybe<Scalars["Int"]>
  sentences?: Maybe<Scalars["Int"]>
  words?: Maybe<Scalars["Int"]>
}

export type Mdx = Node & {
  rawBody: Scalars["String"]
  fileAbsolutePath: Scalars["String"]
  frontmatter?: Maybe<Frontmatter>
  slug?: Maybe<Scalars["String"]>
  body: Scalars["String"]
  excerpt: Scalars["String"]
  headings?: Maybe<Array<Maybe<MdxHeadingMdx>>>
  html?: Maybe<Scalars["String"]>
  mdxAST?: Maybe<Scalars["JSON"]>
  tableOfContents?: Maybe<Scalars["JSON"]>
  timeToRead?: Maybe<Scalars["Int"]>
  wordCount?: Maybe<MdxWordCount>
  fields?: Maybe<MdxFields>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type MdxExcerptArgs = {
  pruneLength?: InputMaybe<Scalars["Int"]>
  truncate?: InputMaybe<Scalars["Boolean"]>
}

export type MdxHeadingsArgs = {
  depth?: InputMaybe<HeadingsMdx>
}

export type MdxTableOfContentsArgs = {
  maxDepth?: InputMaybe<Scalars["Int"]>
}

export type MdxFields = {
  readingTime?: Maybe<MdxFieldsReadingTime>
  isOutdated?: Maybe<Scalars["Boolean"]>
  slug?: Maybe<Scalars["String"]>
  relativePath?: Maybe<Scalars["String"]>
}

export type MdxFieldsReadingTime = {
  text?: Maybe<Scalars["String"]>
  minutes?: Maybe<Scalars["Float"]>
  time?: Maybe<Scalars["Int"]>
  words?: Maybe<Scalars["Int"]>
}

export type GatsbyImageFormat =
  | "NO_CHANGE"
  | "AUTO"
  | "JPG"
  | "PNG"
  | "WEBP"
  | "AVIF"

export type GatsbyImageLayout = "FIXED" | "FULL_WIDTH" | "CONSTRAINED"

export type GatsbyImagePlaceholder =
  | "DOMINANT_COLOR"
  | "TRACED_SVG"
  | "BLURRED"
  | "NONE"

export type ImageFormat = "NO_CHANGE" | "AUTO" | "JPG" | "PNG" | "WEBP" | "AVIF"

export type ImageFit = "COVER" | "CONTAIN" | "FILL" | "INSIDE" | "OUTSIDE"

export type ImageLayout = "FIXED" | "FULL_WIDTH" | "CONSTRAINED"

export type ImageCropFocus =
  | "CENTER"
  | "NORTH"
  | "NORTHEAST"
  | "EAST"
  | "SOUTHEAST"
  | "SOUTH"
  | "SOUTHWEST"
  | "WEST"
  | "NORTHWEST"
  | "ENTROPY"
  | "ATTENTION"

export type DuotoneGradient = {
  highlight: Scalars["String"]
  shadow: Scalars["String"]
  opacity?: InputMaybe<Scalars["Int"]>
}

export type PotraceTurnPolicy =
  | "TURNPOLICY_BLACK"
  | "TURNPOLICY_WHITE"
  | "TURNPOLICY_LEFT"
  | "TURNPOLICY_RIGHT"
  | "TURNPOLICY_MINORITY"
  | "TURNPOLICY_MAJORITY"

export type Potrace = {
  turnPolicy?: InputMaybe<PotraceTurnPolicy>
  turdSize?: InputMaybe<Scalars["Float"]>
  alphaMax?: InputMaybe<Scalars["Float"]>
  optCurve?: InputMaybe<Scalars["Boolean"]>
  optTolerance?: InputMaybe<Scalars["Float"]>
  threshold?: InputMaybe<Scalars["Int"]>
  blackOnWhite?: InputMaybe<Scalars["Boolean"]>
  color?: InputMaybe<Scalars["String"]>
  background?: InputMaybe<Scalars["String"]>
}

export type ImageSharp = Node & {
  fixed?: Maybe<ImageSharpFixed>
  fluid?: Maybe<ImageSharpFluid>
  gatsbyImageData: Scalars["JSON"]
  original?: Maybe<ImageSharpOriginal>
  resize?: Maybe<ImageSharpResize>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type ImageSharpFixedArgs = {
  width?: InputMaybe<Scalars["Int"]>
  height?: InputMaybe<Scalars["Int"]>
  base64Width?: InputMaybe<Scalars["Int"]>
  jpegProgressive?: InputMaybe<Scalars["Boolean"]>
  pngCompressionSpeed?: InputMaybe<Scalars["Int"]>
  grayscale?: InputMaybe<Scalars["Boolean"]>
  duotone?: InputMaybe<DuotoneGradient>
  traceSVG?: InputMaybe<Potrace>
  quality?: InputMaybe<Scalars["Int"]>
  jpegQuality?: InputMaybe<Scalars["Int"]>
  pngQuality?: InputMaybe<Scalars["Int"]>
  webpQuality?: InputMaybe<Scalars["Int"]>
  toFormat?: InputMaybe<ImageFormat>
  toFormatBase64?: InputMaybe<ImageFormat>
  cropFocus?: InputMaybe<ImageCropFocus>
  fit?: InputMaybe<ImageFit>
  background?: InputMaybe<Scalars["String"]>
  rotate?: InputMaybe<Scalars["Int"]>
  trim?: InputMaybe<Scalars["Float"]>
}

export type ImageSharpFluidArgs = {
  maxWidth?: InputMaybe<Scalars["Int"]>
  maxHeight?: InputMaybe<Scalars["Int"]>
  base64Width?: InputMaybe<Scalars["Int"]>
  grayscale?: InputMaybe<Scalars["Boolean"]>
  jpegProgressive?: InputMaybe<Scalars["Boolean"]>
  pngCompressionSpeed?: InputMaybe<Scalars["Int"]>
  duotone?: InputMaybe<DuotoneGradient>
  traceSVG?: InputMaybe<Potrace>
  quality?: InputMaybe<Scalars["Int"]>
  jpegQuality?: InputMaybe<Scalars["Int"]>
  pngQuality?: InputMaybe<Scalars["Int"]>
  webpQuality?: InputMaybe<Scalars["Int"]>
  toFormat?: InputMaybe<ImageFormat>
  toFormatBase64?: InputMaybe<ImageFormat>
  cropFocus?: InputMaybe<ImageCropFocus>
  fit?: InputMaybe<ImageFit>
  background?: InputMaybe<Scalars["String"]>
  rotate?: InputMaybe<Scalars["Int"]>
  trim?: InputMaybe<Scalars["Float"]>
  sizes?: InputMaybe<Scalars["String"]>
  srcSetBreakpoints?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>
}

export type ImageSharpGatsbyImageDataArgs = {
  layout?: InputMaybe<ImageLayout>
  width?: InputMaybe<Scalars["Int"]>
  height?: InputMaybe<Scalars["Int"]>
  aspectRatio?: InputMaybe<Scalars["Float"]>
  placeholder?: InputMaybe<ImagePlaceholder>
  blurredOptions?: InputMaybe<BlurredOptions>
  tracedSVGOptions?: InputMaybe<Potrace>
  formats?: InputMaybe<Array<InputMaybe<ImageFormat>>>
  outputPixelDensities?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>
  breakpoints?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>
  sizes?: InputMaybe<Scalars["String"]>
  quality?: InputMaybe<Scalars["Int"]>
  jpgOptions?: InputMaybe<JpgOptions>
  pngOptions?: InputMaybe<PngOptions>
  webpOptions?: InputMaybe<WebPOptions>
  avifOptions?: InputMaybe<AvifOptions>
  transformOptions?: InputMaybe<TransformOptions>
  backgroundColor?: InputMaybe<Scalars["String"]>
}

export type ImageSharpResizeArgs = {
  width?: InputMaybe<Scalars["Int"]>
  height?: InputMaybe<Scalars["Int"]>
  quality?: InputMaybe<Scalars["Int"]>
  jpegQuality?: InputMaybe<Scalars["Int"]>
  pngQuality?: InputMaybe<Scalars["Int"]>
  webpQuality?: InputMaybe<Scalars["Int"]>
  jpegProgressive?: InputMaybe<Scalars["Boolean"]>
  pngCompressionLevel?: InputMaybe<Scalars["Int"]>
  pngCompressionSpeed?: InputMaybe<Scalars["Int"]>
  grayscale?: InputMaybe<Scalars["Boolean"]>
  duotone?: InputMaybe<DuotoneGradient>
  base64?: InputMaybe<Scalars["Boolean"]>
  traceSVG?: InputMaybe<Potrace>
  toFormat?: InputMaybe<ImageFormat>
  cropFocus?: InputMaybe<ImageCropFocus>
  fit?: InputMaybe<ImageFit>
  background?: InputMaybe<Scalars["String"]>
  rotate?: InputMaybe<Scalars["Int"]>
  trim?: InputMaybe<Scalars["Float"]>
}

export type ImageSharpFixed = {
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  width: Scalars["Float"]
  height: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
}

export type ImageSharpFluid = {
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  sizes: Scalars["String"]
  originalImg?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
  presentationWidth: Scalars["Int"]
  presentationHeight: Scalars["Int"]
}

export type ImagePlaceholder =
  | "DOMINANT_COLOR"
  | "TRACED_SVG"
  | "BLURRED"
  | "NONE"

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width?: InputMaybe<Scalars["Int"]>
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat?: InputMaybe<ImageFormat>
}

export type JpgOptions = {
  quality?: InputMaybe<Scalars["Int"]>
  progressive?: InputMaybe<Scalars["Boolean"]>
}

export type PngOptions = {
  quality?: InputMaybe<Scalars["Int"]>
  compressionSpeed?: InputMaybe<Scalars["Int"]>
}

export type WebPOptions = {
  quality?: InputMaybe<Scalars["Int"]>
}

export type AvifOptions = {
  quality?: InputMaybe<Scalars["Int"]>
  lossless?: InputMaybe<Scalars["Boolean"]>
  speed?: InputMaybe<Scalars["Int"]>
}

export type TransformOptions = {
  grayscale?: InputMaybe<Scalars["Boolean"]>
  duotone?: InputMaybe<DuotoneGradient>
  rotate?: InputMaybe<Scalars["Int"]>
  trim?: InputMaybe<Scalars["Float"]>
  cropFocus?: InputMaybe<ImageCropFocus>
  fit?: InputMaybe<ImageFit>
}

export type ImageSharpOriginal = {
  width?: Maybe<Scalars["Float"]>
  height?: Maybe<Scalars["Float"]>
  src?: Maybe<Scalars["String"]>
}

export type ImageSharpResize = {
  src?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  originalName?: Maybe<Scalars["String"]>
}

export type Frontmatter = {
  sidebar?: Maybe<Scalars["Boolean"]>
  sidebarDepth?: Maybe<Scalars["Int"]>
  incomplete?: Maybe<Scalars["Boolean"]>
  template?: Maybe<Scalars["String"]>
  summaryPoint1: Scalars["String"]
  summaryPoint2: Scalars["String"]
  summaryPoint3: Scalars["String"]
  summaryPoint4: Scalars["String"]
  position?: Maybe<Scalars["String"]>
  compensation?: Maybe<Scalars["String"]>
  location?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  link?: Maybe<Scalars["String"]>
  address?: Maybe<Scalars["String"]>
  skill?: Maybe<Scalars["String"]>
  published?: Maybe<Scalars["String"]>
  sourceUrl?: Maybe<Scalars["String"]>
  source?: Maybe<Scalars["String"]>
  author?: Maybe<Scalars["String"]>
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
  isOutdated?: Maybe<Scalars["Boolean"]>
  title?: Maybe<Scalars["String"]>
  lang?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  emoji?: Maybe<Scalars["String"]>
  image?: Maybe<File>
  alt?: Maybe<Scalars["String"]>
}

export type ConsensusBountyHuntersCsv = Node & {
  username?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  score?: Maybe<Scalars["Int"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type WalletsCsv = Node & {
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  name?: Maybe<Scalars["String"]>
  url?: Maybe<Scalars["String"]>
  brand_color?: Maybe<Scalars["String"]>
  has_mobile?: Maybe<Scalars["String"]>
  has_desktop?: Maybe<Scalars["String"]>
  has_web?: Maybe<Scalars["String"]>
  has_hardware?: Maybe<Scalars["String"]>
  has_card_deposits?: Maybe<Scalars["String"]>
  has_explore_dapps?: Maybe<Scalars["String"]>
  has_defi_integrations?: Maybe<Scalars["String"]>
  has_bank_withdrawals?: Maybe<Scalars["String"]>
  has_limits_protection?: Maybe<Scalars["String"]>
  has_high_volume_purchases?: Maybe<Scalars["String"]>
  has_multisig?: Maybe<Scalars["String"]>
  has_dex_integrations?: Maybe<Scalars["String"]>
}

export type ExchangesByCountryCsv = Node & {
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  country?: Maybe<Scalars["String"]>
  coinmama?: Maybe<Scalars["String"]>
  bittrex?: Maybe<Scalars["String"]>
  simplex?: Maybe<Scalars["String"]>
  wyre?: Maybe<Scalars["String"]>
  moonpay?: Maybe<Scalars["String"]>
  coinbase?: Maybe<Scalars["String"]>
  kraken?: Maybe<Scalars["String"]>
  gemini?: Maybe<Scalars["String"]>
  binance?: Maybe<Scalars["String"]>
  binanceus?: Maybe<Scalars["String"]>
  bitbuy?: Maybe<Scalars["String"]>
  rain?: Maybe<Scalars["String"]>
  cryptocom?: Maybe<Scalars["String"]>
  itezcom?: Maybe<Scalars["String"]>
  coinspot?: Maybe<Scalars["String"]>
  bitvavo?: Maybe<Scalars["String"]>
  mtpelerin?: Maybe<Scalars["String"]>
  wazirx?: Maybe<Scalars["String"]>
  bitflyer?: Maybe<Scalars["String"]>
  easycrypto?: Maybe<Scalars["String"]>
  okx?: Maybe<Scalars["String"]>
  kucoin?: Maybe<Scalars["String"]>
  ftx?: Maybe<Scalars["String"]>
  huobiglobal?: Maybe<Scalars["String"]>
  gateio?: Maybe<Scalars["String"]>
  bitfinex?: Maybe<Scalars["String"]>
  bybit?: Maybe<Scalars["String"]>
  bitkub?: Maybe<Scalars["String"]>
  bitso?: Maybe<Scalars["String"]>
  ftxus?: Maybe<Scalars["String"]>
}

export type Query = {
  file?: Maybe<File>
  allFile: FileConnection
  directory?: Maybe<Directory>
  allDirectory: DirectoryConnection
  site?: Maybe<Site>
  allSite: SiteConnection
  siteFunction?: Maybe<SiteFunction>
  allSiteFunction: SiteFunctionConnection
  sitePage?: Maybe<SitePage>
  allSitePage: SitePageConnection
  sitePlugin?: Maybe<SitePlugin>
  allSitePlugin: SitePluginConnection
  siteBuildMetadata?: Maybe<SiteBuildMetadata>
  allSiteBuildMetadata: SiteBuildMetadataConnection
  mdx?: Maybe<Mdx>
  allMdx: MdxConnection
  imageSharp?: Maybe<ImageSharp>
  allImageSharp: ImageSharpConnection
  consensusBountyHuntersCsv?: Maybe<ConsensusBountyHuntersCsv>
  allConsensusBountyHuntersCsv: ConsensusBountyHuntersCsvConnection
  walletsCsv?: Maybe<WalletsCsv>
  allWalletsCsv: WalletsCsvConnection
  exchangesByCountryCsv?: Maybe<ExchangesByCountryCsv>
  allExchangesByCountryCsv: ExchangesByCountryCsvConnection
}

export type QueryFileArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>
  absolutePath?: InputMaybe<StringQueryOperatorInput>
  relativePath?: InputMaybe<StringQueryOperatorInput>
  extension?: InputMaybe<StringQueryOperatorInput>
  size?: InputMaybe<IntQueryOperatorInput>
  prettySize?: InputMaybe<StringQueryOperatorInput>
  modifiedTime?: InputMaybe<DateQueryOperatorInput>
  accessTime?: InputMaybe<DateQueryOperatorInput>
  changeTime?: InputMaybe<DateQueryOperatorInput>
  birthTime?: InputMaybe<DateQueryOperatorInput>
  root?: InputMaybe<StringQueryOperatorInput>
  dir?: InputMaybe<StringQueryOperatorInput>
  base?: InputMaybe<StringQueryOperatorInput>
  ext?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>
  dev?: InputMaybe<IntQueryOperatorInput>
  mode?: InputMaybe<IntQueryOperatorInput>
  nlink?: InputMaybe<IntQueryOperatorInput>
  uid?: InputMaybe<IntQueryOperatorInput>
  gid?: InputMaybe<IntQueryOperatorInput>
  rdev?: InputMaybe<IntQueryOperatorInput>
  ino?: InputMaybe<FloatQueryOperatorInput>
  atimeMs?: InputMaybe<FloatQueryOperatorInput>
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>
  atime?: InputMaybe<DateQueryOperatorInput>
  mtime?: InputMaybe<DateQueryOperatorInput>
  ctime?: InputMaybe<DateQueryOperatorInput>
  birthtime?: InputMaybe<DateQueryOperatorInput>
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>
  blksize?: InputMaybe<IntQueryOperatorInput>
  blocks?: InputMaybe<IntQueryOperatorInput>
  fields?: InputMaybe<FileFieldsFilterInput>
  publicURL?: InputMaybe<StringQueryOperatorInput>
  childrenMdx?: InputMaybe<MdxFilterListInput>
  childMdx?: InputMaybe<MdxFilterInput>
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>
  childImageSharp?: InputMaybe<ImageSharpFilterInput>
  childrenConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterListInput>
  childConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>
  childrenWalletsCsv?: InputMaybe<WalletsCsvFilterListInput>
  childWalletsCsv?: InputMaybe<WalletsCsvFilterInput>
  childrenExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterListInput>
  childExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllFileArgs = {
  filter?: InputMaybe<FileFilterInput>
  sort?: InputMaybe<FileSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryDirectoryArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>
  absolutePath?: InputMaybe<StringQueryOperatorInput>
  relativePath?: InputMaybe<StringQueryOperatorInput>
  extension?: InputMaybe<StringQueryOperatorInput>
  size?: InputMaybe<IntQueryOperatorInput>
  prettySize?: InputMaybe<StringQueryOperatorInput>
  modifiedTime?: InputMaybe<DateQueryOperatorInput>
  accessTime?: InputMaybe<DateQueryOperatorInput>
  changeTime?: InputMaybe<DateQueryOperatorInput>
  birthTime?: InputMaybe<DateQueryOperatorInput>
  root?: InputMaybe<StringQueryOperatorInput>
  dir?: InputMaybe<StringQueryOperatorInput>
  base?: InputMaybe<StringQueryOperatorInput>
  ext?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>
  dev?: InputMaybe<IntQueryOperatorInput>
  mode?: InputMaybe<IntQueryOperatorInput>
  nlink?: InputMaybe<IntQueryOperatorInput>
  uid?: InputMaybe<IntQueryOperatorInput>
  gid?: InputMaybe<IntQueryOperatorInput>
  rdev?: InputMaybe<IntQueryOperatorInput>
  ino?: InputMaybe<FloatQueryOperatorInput>
  atimeMs?: InputMaybe<FloatQueryOperatorInput>
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>
  atime?: InputMaybe<DateQueryOperatorInput>
  mtime?: InputMaybe<DateQueryOperatorInput>
  ctime?: InputMaybe<DateQueryOperatorInput>
  birthtime?: InputMaybe<DateQueryOperatorInput>
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllDirectoryArgs = {
  filter?: InputMaybe<DirectoryFilterInput>
  sort?: InputMaybe<DirectorySortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QuerySiteArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>
  port?: InputMaybe<IntQueryOperatorInput>
  host?: InputMaybe<StringQueryOperatorInput>
  flags?: InputMaybe<SiteFlagsFilterInput>
  polyfill?: InputMaybe<BooleanQueryOperatorInput>
  pathPrefix?: InputMaybe<StringQueryOperatorInput>
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>
  trailingSlash?: InputMaybe<StringQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllSiteArgs = {
  filter?: InputMaybe<SiteFilterInput>
  sort?: InputMaybe<SiteSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QuerySiteFunctionArgs = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>
  pluginName?: InputMaybe<StringQueryOperatorInput>
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>
  matchPath?: InputMaybe<StringQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllSiteFunctionArgs = {
  filter?: InputMaybe<SiteFunctionFilterInput>
  sort?: InputMaybe<SiteFunctionSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QuerySitePageArgs = {
  path?: InputMaybe<StringQueryOperatorInput>
  component?: InputMaybe<StringQueryOperatorInput>
  internalComponentName?: InputMaybe<StringQueryOperatorInput>
  componentChunkName?: InputMaybe<StringQueryOperatorInput>
  matchPath?: InputMaybe<StringQueryOperatorInput>
  pageContext?: InputMaybe<JsonQueryOperatorInput>
  pluginCreator?: InputMaybe<SitePluginFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllSitePageArgs = {
  filter?: InputMaybe<SitePageFilterInput>
  sort?: InputMaybe<SitePageSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QuerySitePluginArgs = {
  resolve?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  version?: InputMaybe<StringQueryOperatorInput>
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>
  browserAPIs?: InputMaybe<StringQueryOperatorInput>
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>
  packageJson?: InputMaybe<JsonQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllSitePluginArgs = {
  filter?: InputMaybe<SitePluginFilterInput>
  sort?: InputMaybe<SitePluginSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QuerySiteBuildMetadataArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter?: InputMaybe<SiteBuildMetadataFilterInput>
  sort?: InputMaybe<SiteBuildMetadataSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryMdxArgs = {
  rawBody?: InputMaybe<StringQueryOperatorInput>
  fileAbsolutePath?: InputMaybe<StringQueryOperatorInput>
  frontmatter?: InputMaybe<FrontmatterFilterInput>
  slug?: InputMaybe<StringQueryOperatorInput>
  body?: InputMaybe<StringQueryOperatorInput>
  excerpt?: InputMaybe<StringQueryOperatorInput>
  headings?: InputMaybe<MdxHeadingMdxFilterListInput>
  html?: InputMaybe<StringQueryOperatorInput>
  mdxAST?: InputMaybe<JsonQueryOperatorInput>
  tableOfContents?: InputMaybe<JsonQueryOperatorInput>
  timeToRead?: InputMaybe<IntQueryOperatorInput>
  wordCount?: InputMaybe<MdxWordCountFilterInput>
  fields?: InputMaybe<MdxFieldsFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllMdxArgs = {
  filter?: InputMaybe<MdxFilterInput>
  sort?: InputMaybe<MdxSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryImageSharpArgs = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>
  fluid?: InputMaybe<ImageSharpFluidFilterInput>
  gatsbyImageData?: InputMaybe<JsonQueryOperatorInput>
  original?: InputMaybe<ImageSharpOriginalFilterInput>
  resize?: InputMaybe<ImageSharpResizeFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllImageSharpArgs = {
  filter?: InputMaybe<ImageSharpFilterInput>
  sort?: InputMaybe<ImageSharpSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryConsensusBountyHuntersCsvArgs = {
  username?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  score?: InputMaybe<IntQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type QueryAllConsensusBountyHuntersCsvArgs = {
  filter?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>
  sort?: InputMaybe<ConsensusBountyHuntersCsvSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryWalletsCsvArgs = {
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
  name?: InputMaybe<StringQueryOperatorInput>
  url?: InputMaybe<StringQueryOperatorInput>
  brand_color?: InputMaybe<StringQueryOperatorInput>
  has_mobile?: InputMaybe<StringQueryOperatorInput>
  has_desktop?: InputMaybe<StringQueryOperatorInput>
  has_web?: InputMaybe<StringQueryOperatorInput>
  has_hardware?: InputMaybe<StringQueryOperatorInput>
  has_card_deposits?: InputMaybe<StringQueryOperatorInput>
  has_explore_dapps?: InputMaybe<StringQueryOperatorInput>
  has_defi_integrations?: InputMaybe<StringQueryOperatorInput>
  has_bank_withdrawals?: InputMaybe<StringQueryOperatorInput>
  has_limits_protection?: InputMaybe<StringQueryOperatorInput>
  has_high_volume_purchases?: InputMaybe<StringQueryOperatorInput>
  has_multisig?: InputMaybe<StringQueryOperatorInput>
  has_dex_integrations?: InputMaybe<StringQueryOperatorInput>
}

export type QueryAllWalletsCsvArgs = {
  filter?: InputMaybe<WalletsCsvFilterInput>
  sort?: InputMaybe<WalletsCsvSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type QueryExchangesByCountryCsvArgs = {
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
  country?: InputMaybe<StringQueryOperatorInput>
  coinmama?: InputMaybe<StringQueryOperatorInput>
  bittrex?: InputMaybe<StringQueryOperatorInput>
  simplex?: InputMaybe<StringQueryOperatorInput>
  wyre?: InputMaybe<StringQueryOperatorInput>
  moonpay?: InputMaybe<StringQueryOperatorInput>
  coinbase?: InputMaybe<StringQueryOperatorInput>
  kraken?: InputMaybe<StringQueryOperatorInput>
  gemini?: InputMaybe<StringQueryOperatorInput>
  binance?: InputMaybe<StringQueryOperatorInput>
  binanceus?: InputMaybe<StringQueryOperatorInput>
  bitbuy?: InputMaybe<StringQueryOperatorInput>
  rain?: InputMaybe<StringQueryOperatorInput>
  cryptocom?: InputMaybe<StringQueryOperatorInput>
  itezcom?: InputMaybe<StringQueryOperatorInput>
  coinspot?: InputMaybe<StringQueryOperatorInput>
  bitvavo?: InputMaybe<StringQueryOperatorInput>
  mtpelerin?: InputMaybe<StringQueryOperatorInput>
  wazirx?: InputMaybe<StringQueryOperatorInput>
  bitflyer?: InputMaybe<StringQueryOperatorInput>
  easycrypto?: InputMaybe<StringQueryOperatorInput>
  okx?: InputMaybe<StringQueryOperatorInput>
  kucoin?: InputMaybe<StringQueryOperatorInput>
  ftx?: InputMaybe<StringQueryOperatorInput>
  huobiglobal?: InputMaybe<StringQueryOperatorInput>
  gateio?: InputMaybe<StringQueryOperatorInput>
  bitfinex?: InputMaybe<StringQueryOperatorInput>
  bybit?: InputMaybe<StringQueryOperatorInput>
  bitkub?: InputMaybe<StringQueryOperatorInput>
  bitso?: InputMaybe<StringQueryOperatorInput>
  ftxus?: InputMaybe<StringQueryOperatorInput>
}

export type QueryAllExchangesByCountryCsvArgs = {
  filter?: InputMaybe<ExchangesByCountryCsvFilterInput>
  sort?: InputMaybe<ExchangesByCountryCsvSortInput>
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
}

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars["String"]>
  ne?: InputMaybe<Scalars["String"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>
  regex?: InputMaybe<Scalars["String"]>
  glob?: InputMaybe<Scalars["String"]>
}

export type IntQueryOperatorInput = {
  eq?: InputMaybe<Scalars["Int"]>
  ne?: InputMaybe<Scalars["Int"]>
  gt?: InputMaybe<Scalars["Int"]>
  gte?: InputMaybe<Scalars["Int"]>
  lt?: InputMaybe<Scalars["Int"]>
  lte?: InputMaybe<Scalars["Int"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>
}

export type DateQueryOperatorInput = {
  eq?: InputMaybe<Scalars["Date"]>
  ne?: InputMaybe<Scalars["Date"]>
  gt?: InputMaybe<Scalars["Date"]>
  gte?: InputMaybe<Scalars["Date"]>
  lt?: InputMaybe<Scalars["Date"]>
  lte?: InputMaybe<Scalars["Date"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>
}

export type FloatQueryOperatorInput = {
  eq?: InputMaybe<Scalars["Float"]>
  ne?: InputMaybe<Scalars["Float"]>
  gt?: InputMaybe<Scalars["Float"]>
  gte?: InputMaybe<Scalars["Float"]>
  lt?: InputMaybe<Scalars["Float"]>
  lte?: InputMaybe<Scalars["Float"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>
}

export type FileFieldsFilterInput = {
  gitLogLatestAuthorName?: InputMaybe<StringQueryOperatorInput>
  gitLogLatestAuthorEmail?: InputMaybe<StringQueryOperatorInput>
  gitLogLatestDate?: InputMaybe<DateQueryOperatorInput>
}

export type MdxFilterListInput = {
  elemMatch?: InputMaybe<MdxFilterInput>
}

export type MdxFilterInput = {
  rawBody?: InputMaybe<StringQueryOperatorInput>
  fileAbsolutePath?: InputMaybe<StringQueryOperatorInput>
  frontmatter?: InputMaybe<FrontmatterFilterInput>
  slug?: InputMaybe<StringQueryOperatorInput>
  body?: InputMaybe<StringQueryOperatorInput>
  excerpt?: InputMaybe<StringQueryOperatorInput>
  headings?: InputMaybe<MdxHeadingMdxFilterListInput>
  html?: InputMaybe<StringQueryOperatorInput>
  mdxAST?: InputMaybe<JsonQueryOperatorInput>
  tableOfContents?: InputMaybe<JsonQueryOperatorInput>
  timeToRead?: InputMaybe<IntQueryOperatorInput>
  wordCount?: InputMaybe<MdxWordCountFilterInput>
  fields?: InputMaybe<MdxFieldsFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type FrontmatterFilterInput = {
  sidebar?: InputMaybe<BooleanQueryOperatorInput>
  sidebarDepth?: InputMaybe<IntQueryOperatorInput>
  incomplete?: InputMaybe<BooleanQueryOperatorInput>
  template?: InputMaybe<StringQueryOperatorInput>
  summaryPoint1?: InputMaybe<StringQueryOperatorInput>
  summaryPoint2?: InputMaybe<StringQueryOperatorInput>
  summaryPoint3?: InputMaybe<StringQueryOperatorInput>
  summaryPoint4?: InputMaybe<StringQueryOperatorInput>
  position?: InputMaybe<StringQueryOperatorInput>
  compensation?: InputMaybe<StringQueryOperatorInput>
  location?: InputMaybe<StringQueryOperatorInput>
  type?: InputMaybe<StringQueryOperatorInput>
  link?: InputMaybe<StringQueryOperatorInput>
  address?: InputMaybe<StringQueryOperatorInput>
  skill?: InputMaybe<StringQueryOperatorInput>
  published?: InputMaybe<StringQueryOperatorInput>
  sourceUrl?: InputMaybe<StringQueryOperatorInput>
  source?: InputMaybe<StringQueryOperatorInput>
  author?: InputMaybe<StringQueryOperatorInput>
  tags?: InputMaybe<StringQueryOperatorInput>
  isOutdated?: InputMaybe<BooleanQueryOperatorInput>
  title?: InputMaybe<StringQueryOperatorInput>
  lang?: InputMaybe<StringQueryOperatorInput>
  description?: InputMaybe<StringQueryOperatorInput>
  emoji?: InputMaybe<StringQueryOperatorInput>
  image?: InputMaybe<FileFilterInput>
  alt?: InputMaybe<StringQueryOperatorInput>
}

export type BooleanQueryOperatorInput = {
  eq?: InputMaybe<Scalars["Boolean"]>
  ne?: InputMaybe<Scalars["Boolean"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>
}

export type FileFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>
  absolutePath?: InputMaybe<StringQueryOperatorInput>
  relativePath?: InputMaybe<StringQueryOperatorInput>
  extension?: InputMaybe<StringQueryOperatorInput>
  size?: InputMaybe<IntQueryOperatorInput>
  prettySize?: InputMaybe<StringQueryOperatorInput>
  modifiedTime?: InputMaybe<DateQueryOperatorInput>
  accessTime?: InputMaybe<DateQueryOperatorInput>
  changeTime?: InputMaybe<DateQueryOperatorInput>
  birthTime?: InputMaybe<DateQueryOperatorInput>
  root?: InputMaybe<StringQueryOperatorInput>
  dir?: InputMaybe<StringQueryOperatorInput>
  base?: InputMaybe<StringQueryOperatorInput>
  ext?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>
  dev?: InputMaybe<IntQueryOperatorInput>
  mode?: InputMaybe<IntQueryOperatorInput>
  nlink?: InputMaybe<IntQueryOperatorInput>
  uid?: InputMaybe<IntQueryOperatorInput>
  gid?: InputMaybe<IntQueryOperatorInput>
  rdev?: InputMaybe<IntQueryOperatorInput>
  ino?: InputMaybe<FloatQueryOperatorInput>
  atimeMs?: InputMaybe<FloatQueryOperatorInput>
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>
  atime?: InputMaybe<DateQueryOperatorInput>
  mtime?: InputMaybe<DateQueryOperatorInput>
  ctime?: InputMaybe<DateQueryOperatorInput>
  birthtime?: InputMaybe<DateQueryOperatorInput>
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>
  blksize?: InputMaybe<IntQueryOperatorInput>
  blocks?: InputMaybe<IntQueryOperatorInput>
  fields?: InputMaybe<FileFieldsFilterInput>
  publicURL?: InputMaybe<StringQueryOperatorInput>
  childrenMdx?: InputMaybe<MdxFilterListInput>
  childMdx?: InputMaybe<MdxFilterInput>
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>
  childImageSharp?: InputMaybe<ImageSharpFilterInput>
  childrenConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterListInput>
  childConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>
  childrenWalletsCsv?: InputMaybe<WalletsCsvFilterListInput>
  childWalletsCsv?: InputMaybe<WalletsCsvFilterInput>
  childrenExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterListInput>
  childExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type ImageSharpFilterListInput = {
  elemMatch?: InputMaybe<ImageSharpFilterInput>
}

export type ImageSharpFilterInput = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>
  fluid?: InputMaybe<ImageSharpFluidFilterInput>
  gatsbyImageData?: InputMaybe<JsonQueryOperatorInput>
  original?: InputMaybe<ImageSharpOriginalFilterInput>
  resize?: InputMaybe<ImageSharpResizeFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type ImageSharpFixedFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>
  tracedSVG?: InputMaybe<StringQueryOperatorInput>
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>
  width?: InputMaybe<FloatQueryOperatorInput>
  height?: InputMaybe<FloatQueryOperatorInput>
  src?: InputMaybe<StringQueryOperatorInput>
  srcSet?: InputMaybe<StringQueryOperatorInput>
  srcWebp?: InputMaybe<StringQueryOperatorInput>
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>
  originalName?: InputMaybe<StringQueryOperatorInput>
}

export type ImageSharpFluidFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>
  tracedSVG?: InputMaybe<StringQueryOperatorInput>
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>
  src?: InputMaybe<StringQueryOperatorInput>
  srcSet?: InputMaybe<StringQueryOperatorInput>
  srcWebp?: InputMaybe<StringQueryOperatorInput>
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>
  sizes?: InputMaybe<StringQueryOperatorInput>
  originalImg?: InputMaybe<StringQueryOperatorInput>
  originalName?: InputMaybe<StringQueryOperatorInput>
  presentationWidth?: InputMaybe<IntQueryOperatorInput>
  presentationHeight?: InputMaybe<IntQueryOperatorInput>
}

export type JsonQueryOperatorInput = {
  eq?: InputMaybe<Scalars["JSON"]>
  ne?: InputMaybe<Scalars["JSON"]>
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>
  nin?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>
  regex?: InputMaybe<Scalars["JSON"]>
  glob?: InputMaybe<Scalars["JSON"]>
}

export type ImageSharpOriginalFilterInput = {
  width?: InputMaybe<FloatQueryOperatorInput>
  height?: InputMaybe<FloatQueryOperatorInput>
  src?: InputMaybe<StringQueryOperatorInput>
}

export type ImageSharpResizeFilterInput = {
  src?: InputMaybe<StringQueryOperatorInput>
  tracedSVG?: InputMaybe<StringQueryOperatorInput>
  width?: InputMaybe<IntQueryOperatorInput>
  height?: InputMaybe<IntQueryOperatorInput>
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>
  originalName?: InputMaybe<StringQueryOperatorInput>
}

export type NodeFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type NodeFilterListInput = {
  elemMatch?: InputMaybe<NodeFilterInput>
}

export type InternalFilterInput = {
  content?: InputMaybe<StringQueryOperatorInput>
  contentDigest?: InputMaybe<StringQueryOperatorInput>
  description?: InputMaybe<StringQueryOperatorInput>
  fieldOwners?: InputMaybe<StringQueryOperatorInput>
  ignoreType?: InputMaybe<BooleanQueryOperatorInput>
  mediaType?: InputMaybe<StringQueryOperatorInput>
  owner?: InputMaybe<StringQueryOperatorInput>
  type?: InputMaybe<StringQueryOperatorInput>
}

export type ConsensusBountyHuntersCsvFilterListInput = {
  elemMatch?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>
}

export type ConsensusBountyHuntersCsvFilterInput = {
  username?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  score?: InputMaybe<IntQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type WalletsCsvFilterListInput = {
  elemMatch?: InputMaybe<WalletsCsvFilterInput>
}

export type WalletsCsvFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
  name?: InputMaybe<StringQueryOperatorInput>
  url?: InputMaybe<StringQueryOperatorInput>
  brand_color?: InputMaybe<StringQueryOperatorInput>
  has_mobile?: InputMaybe<StringQueryOperatorInput>
  has_desktop?: InputMaybe<StringQueryOperatorInput>
  has_web?: InputMaybe<StringQueryOperatorInput>
  has_hardware?: InputMaybe<StringQueryOperatorInput>
  has_card_deposits?: InputMaybe<StringQueryOperatorInput>
  has_explore_dapps?: InputMaybe<StringQueryOperatorInput>
  has_defi_integrations?: InputMaybe<StringQueryOperatorInput>
  has_bank_withdrawals?: InputMaybe<StringQueryOperatorInput>
  has_limits_protection?: InputMaybe<StringQueryOperatorInput>
  has_high_volume_purchases?: InputMaybe<StringQueryOperatorInput>
  has_multisig?: InputMaybe<StringQueryOperatorInput>
  has_dex_integrations?: InputMaybe<StringQueryOperatorInput>
}

export type ExchangesByCountryCsvFilterListInput = {
  elemMatch?: InputMaybe<ExchangesByCountryCsvFilterInput>
}

export type ExchangesByCountryCsvFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
  country?: InputMaybe<StringQueryOperatorInput>
  coinmama?: InputMaybe<StringQueryOperatorInput>
  bittrex?: InputMaybe<StringQueryOperatorInput>
  simplex?: InputMaybe<StringQueryOperatorInput>
  wyre?: InputMaybe<StringQueryOperatorInput>
  moonpay?: InputMaybe<StringQueryOperatorInput>
  coinbase?: InputMaybe<StringQueryOperatorInput>
  kraken?: InputMaybe<StringQueryOperatorInput>
  gemini?: InputMaybe<StringQueryOperatorInput>
  binance?: InputMaybe<StringQueryOperatorInput>
  binanceus?: InputMaybe<StringQueryOperatorInput>
  bitbuy?: InputMaybe<StringQueryOperatorInput>
  rain?: InputMaybe<StringQueryOperatorInput>
  cryptocom?: InputMaybe<StringQueryOperatorInput>
  itezcom?: InputMaybe<StringQueryOperatorInput>
  coinspot?: InputMaybe<StringQueryOperatorInput>
  bitvavo?: InputMaybe<StringQueryOperatorInput>
  mtpelerin?: InputMaybe<StringQueryOperatorInput>
  wazirx?: InputMaybe<StringQueryOperatorInput>
  bitflyer?: InputMaybe<StringQueryOperatorInput>
  easycrypto?: InputMaybe<StringQueryOperatorInput>
  okx?: InputMaybe<StringQueryOperatorInput>
  kucoin?: InputMaybe<StringQueryOperatorInput>
  ftx?: InputMaybe<StringQueryOperatorInput>
  huobiglobal?: InputMaybe<StringQueryOperatorInput>
  gateio?: InputMaybe<StringQueryOperatorInput>
  bitfinex?: InputMaybe<StringQueryOperatorInput>
  bybit?: InputMaybe<StringQueryOperatorInput>
  bitkub?: InputMaybe<StringQueryOperatorInput>
  bitso?: InputMaybe<StringQueryOperatorInput>
  ftxus?: InputMaybe<StringQueryOperatorInput>
}

export type MdxHeadingMdxFilterListInput = {
  elemMatch?: InputMaybe<MdxHeadingMdxFilterInput>
}

export type MdxHeadingMdxFilterInput = {
  value?: InputMaybe<StringQueryOperatorInput>
  depth?: InputMaybe<IntQueryOperatorInput>
}

export type MdxWordCountFilterInput = {
  paragraphs?: InputMaybe<IntQueryOperatorInput>
  sentences?: InputMaybe<IntQueryOperatorInput>
  words?: InputMaybe<IntQueryOperatorInput>
}

export type MdxFieldsFilterInput = {
  readingTime?: InputMaybe<MdxFieldsReadingTimeFilterInput>
  isOutdated?: InputMaybe<BooleanQueryOperatorInput>
  slug?: InputMaybe<StringQueryOperatorInput>
  relativePath?: InputMaybe<StringQueryOperatorInput>
}

export type MdxFieldsReadingTimeFilterInput = {
  text?: InputMaybe<StringQueryOperatorInput>
  minutes?: InputMaybe<FloatQueryOperatorInput>
  time?: InputMaybe<IntQueryOperatorInput>
  words?: InputMaybe<IntQueryOperatorInput>
}

export type FileConnection = {
  totalCount: Scalars["Int"]
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<FileGroupConnection>
}

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: FileFieldsEnum
}

export type FileEdge = {
  next?: Maybe<File>
  node: File
  previous?: Maybe<File>
}

export type PageInfo = {
  currentPage: Scalars["Int"]
  hasPreviousPage: Scalars["Boolean"]
  hasNextPage: Scalars["Boolean"]
  itemCount: Scalars["Int"]
  pageCount: Scalars["Int"]
  perPage?: Maybe<Scalars["Int"]>
  totalCount: Scalars["Int"]
}

export type FileFieldsEnum =
  | "sourceInstanceName"
  | "absolutePath"
  | "relativePath"
  | "extension"
  | "size"
  | "prettySize"
  | "modifiedTime"
  | "accessTime"
  | "changeTime"
  | "birthTime"
  | "root"
  | "dir"
  | "base"
  | "ext"
  | "name"
  | "relativeDirectory"
  | "dev"
  | "mode"
  | "nlink"
  | "uid"
  | "gid"
  | "rdev"
  | "ino"
  | "atimeMs"
  | "mtimeMs"
  | "ctimeMs"
  | "atime"
  | "mtime"
  | "ctime"
  | "birthtime"
  | "birthtimeMs"
  | "blksize"
  | "blocks"
  | "fields___gitLogLatestAuthorName"
  | "fields___gitLogLatestAuthorEmail"
  | "fields___gitLogLatestDate"
  | "publicURL"
  | "childrenMdx"
  | "childrenMdx___rawBody"
  | "childrenMdx___fileAbsolutePath"
  | "childrenMdx___frontmatter___sidebar"
  | "childrenMdx___frontmatter___sidebarDepth"
  | "childrenMdx___frontmatter___incomplete"
  | "childrenMdx___frontmatter___template"
  | "childrenMdx___frontmatter___summaryPoint1"
  | "childrenMdx___frontmatter___summaryPoint2"
  | "childrenMdx___frontmatter___summaryPoint3"
  | "childrenMdx___frontmatter___summaryPoint4"
  | "childrenMdx___frontmatter___position"
  | "childrenMdx___frontmatter___compensation"
  | "childrenMdx___frontmatter___location"
  | "childrenMdx___frontmatter___type"
  | "childrenMdx___frontmatter___link"
  | "childrenMdx___frontmatter___address"
  | "childrenMdx___frontmatter___skill"
  | "childrenMdx___frontmatter___published"
  | "childrenMdx___frontmatter___sourceUrl"
  | "childrenMdx___frontmatter___source"
  | "childrenMdx___frontmatter___author"
  | "childrenMdx___frontmatter___tags"
  | "childrenMdx___frontmatter___isOutdated"
  | "childrenMdx___frontmatter___title"
  | "childrenMdx___frontmatter___lang"
  | "childrenMdx___frontmatter___description"
  | "childrenMdx___frontmatter___emoji"
  | "childrenMdx___frontmatter___image___sourceInstanceName"
  | "childrenMdx___frontmatter___image___absolutePath"
  | "childrenMdx___frontmatter___image___relativePath"
  | "childrenMdx___frontmatter___image___extension"
  | "childrenMdx___frontmatter___image___size"
  | "childrenMdx___frontmatter___image___prettySize"
  | "childrenMdx___frontmatter___image___modifiedTime"
  | "childrenMdx___frontmatter___image___accessTime"
  | "childrenMdx___frontmatter___image___changeTime"
  | "childrenMdx___frontmatter___image___birthTime"
  | "childrenMdx___frontmatter___image___root"
  | "childrenMdx___frontmatter___image___dir"
  | "childrenMdx___frontmatter___image___base"
  | "childrenMdx___frontmatter___image___ext"
  | "childrenMdx___frontmatter___image___name"
  | "childrenMdx___frontmatter___image___relativeDirectory"
  | "childrenMdx___frontmatter___image___dev"
  | "childrenMdx___frontmatter___image___mode"
  | "childrenMdx___frontmatter___image___nlink"
  | "childrenMdx___frontmatter___image___uid"
  | "childrenMdx___frontmatter___image___gid"
  | "childrenMdx___frontmatter___image___rdev"
  | "childrenMdx___frontmatter___image___ino"
  | "childrenMdx___frontmatter___image___atimeMs"
  | "childrenMdx___frontmatter___image___mtimeMs"
  | "childrenMdx___frontmatter___image___ctimeMs"
  | "childrenMdx___frontmatter___image___atime"
  | "childrenMdx___frontmatter___image___mtime"
  | "childrenMdx___frontmatter___image___ctime"
  | "childrenMdx___frontmatter___image___birthtime"
  | "childrenMdx___frontmatter___image___birthtimeMs"
  | "childrenMdx___frontmatter___image___blksize"
  | "childrenMdx___frontmatter___image___blocks"
  | "childrenMdx___frontmatter___image___publicURL"
  | "childrenMdx___frontmatter___image___childrenMdx"
  | "childrenMdx___frontmatter___image___childrenImageSharp"
  | "childrenMdx___frontmatter___image___childrenConsensusBountyHuntersCsv"
  | "childrenMdx___frontmatter___image___childrenWalletsCsv"
  | "childrenMdx___frontmatter___image___childrenExchangesByCountryCsv"
  | "childrenMdx___frontmatter___image___id"
  | "childrenMdx___frontmatter___image___children"
  | "childrenMdx___frontmatter___alt"
  | "childrenMdx___slug"
  | "childrenMdx___body"
  | "childrenMdx___excerpt"
  | "childrenMdx___headings"
  | "childrenMdx___headings___value"
  | "childrenMdx___headings___depth"
  | "childrenMdx___html"
  | "childrenMdx___mdxAST"
  | "childrenMdx___tableOfContents"
  | "childrenMdx___timeToRead"
  | "childrenMdx___wordCount___paragraphs"
  | "childrenMdx___wordCount___sentences"
  | "childrenMdx___wordCount___words"
  | "childrenMdx___fields___readingTime___text"
  | "childrenMdx___fields___readingTime___minutes"
  | "childrenMdx___fields___readingTime___time"
  | "childrenMdx___fields___readingTime___words"
  | "childrenMdx___fields___isOutdated"
  | "childrenMdx___fields___slug"
  | "childrenMdx___fields___relativePath"
  | "childrenMdx___id"
  | "childrenMdx___parent___id"
  | "childrenMdx___parent___parent___id"
  | "childrenMdx___parent___parent___children"
  | "childrenMdx___parent___children"
  | "childrenMdx___parent___children___id"
  | "childrenMdx___parent___children___children"
  | "childrenMdx___parent___internal___content"
  | "childrenMdx___parent___internal___contentDigest"
  | "childrenMdx___parent___internal___description"
  | "childrenMdx___parent___internal___fieldOwners"
  | "childrenMdx___parent___internal___ignoreType"
  | "childrenMdx___parent___internal___mediaType"
  | "childrenMdx___parent___internal___owner"
  | "childrenMdx___parent___internal___type"
  | "childrenMdx___children"
  | "childrenMdx___children___id"
  | "childrenMdx___children___parent___id"
  | "childrenMdx___children___parent___children"
  | "childrenMdx___children___children"
  | "childrenMdx___children___children___id"
  | "childrenMdx___children___children___children"
  | "childrenMdx___children___internal___content"
  | "childrenMdx___children___internal___contentDigest"
  | "childrenMdx___children___internal___description"
  | "childrenMdx___children___internal___fieldOwners"
  | "childrenMdx___children___internal___ignoreType"
  | "childrenMdx___children___internal___mediaType"
  | "childrenMdx___children___internal___owner"
  | "childrenMdx___children___internal___type"
  | "childrenMdx___internal___content"
  | "childrenMdx___internal___contentDigest"
  | "childrenMdx___internal___description"
  | "childrenMdx___internal___fieldOwners"
  | "childrenMdx___internal___ignoreType"
  | "childrenMdx___internal___mediaType"
  | "childrenMdx___internal___owner"
  | "childrenMdx___internal___type"
  | "childMdx___rawBody"
  | "childMdx___fileAbsolutePath"
  | "childMdx___frontmatter___sidebar"
  | "childMdx___frontmatter___sidebarDepth"
  | "childMdx___frontmatter___incomplete"
  | "childMdx___frontmatter___template"
  | "childMdx___frontmatter___summaryPoint1"
  | "childMdx___frontmatter___summaryPoint2"
  | "childMdx___frontmatter___summaryPoint3"
  | "childMdx___frontmatter___summaryPoint4"
  | "childMdx___frontmatter___position"
  | "childMdx___frontmatter___compensation"
  | "childMdx___frontmatter___location"
  | "childMdx___frontmatter___type"
  | "childMdx___frontmatter___link"
  | "childMdx___frontmatter___address"
  | "childMdx___frontmatter___skill"
  | "childMdx___frontmatter___published"
  | "childMdx___frontmatter___sourceUrl"
  | "childMdx___frontmatter___source"
  | "childMdx___frontmatter___author"
  | "childMdx___frontmatter___tags"
  | "childMdx___frontmatter___isOutdated"
  | "childMdx___frontmatter___title"
  | "childMdx___frontmatter___lang"
  | "childMdx___frontmatter___description"
  | "childMdx___frontmatter___emoji"
  | "childMdx___frontmatter___image___sourceInstanceName"
  | "childMdx___frontmatter___image___absolutePath"
  | "childMdx___frontmatter___image___relativePath"
  | "childMdx___frontmatter___image___extension"
  | "childMdx___frontmatter___image___size"
  | "childMdx___frontmatter___image___prettySize"
  | "childMdx___frontmatter___image___modifiedTime"
  | "childMdx___frontmatter___image___accessTime"
  | "childMdx___frontmatter___image___changeTime"
  | "childMdx___frontmatter___image___birthTime"
  | "childMdx___frontmatter___image___root"
  | "childMdx___frontmatter___image___dir"
  | "childMdx___frontmatter___image___base"
  | "childMdx___frontmatter___image___ext"
  | "childMdx___frontmatter___image___name"
  | "childMdx___frontmatter___image___relativeDirectory"
  | "childMdx___frontmatter___image___dev"
  | "childMdx___frontmatter___image___mode"
  | "childMdx___frontmatter___image___nlink"
  | "childMdx___frontmatter___image___uid"
  | "childMdx___frontmatter___image___gid"
  | "childMdx___frontmatter___image___rdev"
  | "childMdx___frontmatter___image___ino"
  | "childMdx___frontmatter___image___atimeMs"
  | "childMdx___frontmatter___image___mtimeMs"
  | "childMdx___frontmatter___image___ctimeMs"
  | "childMdx___frontmatter___image___atime"
  | "childMdx___frontmatter___image___mtime"
  | "childMdx___frontmatter___image___ctime"
  | "childMdx___frontmatter___image___birthtime"
  | "childMdx___frontmatter___image___birthtimeMs"
  | "childMdx___frontmatter___image___blksize"
  | "childMdx___frontmatter___image___blocks"
  | "childMdx___frontmatter___image___publicURL"
  | "childMdx___frontmatter___image___childrenMdx"
  | "childMdx___frontmatter___image___childrenImageSharp"
  | "childMdx___frontmatter___image___childrenConsensusBountyHuntersCsv"
  | "childMdx___frontmatter___image___childrenWalletsCsv"
  | "childMdx___frontmatter___image___childrenExchangesByCountryCsv"
  | "childMdx___frontmatter___image___id"
  | "childMdx___frontmatter___image___children"
  | "childMdx___frontmatter___alt"
  | "childMdx___slug"
  | "childMdx___body"
  | "childMdx___excerpt"
  | "childMdx___headings"
  | "childMdx___headings___value"
  | "childMdx___headings___depth"
  | "childMdx___html"
  | "childMdx___mdxAST"
  | "childMdx___tableOfContents"
  | "childMdx___timeToRead"
  | "childMdx___wordCount___paragraphs"
  | "childMdx___wordCount___sentences"
  | "childMdx___wordCount___words"
  | "childMdx___fields___readingTime___text"
  | "childMdx___fields___readingTime___minutes"
  | "childMdx___fields___readingTime___time"
  | "childMdx___fields___readingTime___words"
  | "childMdx___fields___isOutdated"
  | "childMdx___fields___slug"
  | "childMdx___fields___relativePath"
  | "childMdx___id"
  | "childMdx___parent___id"
  | "childMdx___parent___parent___id"
  | "childMdx___parent___parent___children"
  | "childMdx___parent___children"
  | "childMdx___parent___children___id"
  | "childMdx___parent___children___children"
  | "childMdx___parent___internal___content"
  | "childMdx___parent___internal___contentDigest"
  | "childMdx___parent___internal___description"
  | "childMdx___parent___internal___fieldOwners"
  | "childMdx___parent___internal___ignoreType"
  | "childMdx___parent___internal___mediaType"
  | "childMdx___parent___internal___owner"
  | "childMdx___parent___internal___type"
  | "childMdx___children"
  | "childMdx___children___id"
  | "childMdx___children___parent___id"
  | "childMdx___children___parent___children"
  | "childMdx___children___children"
  | "childMdx___children___children___id"
  | "childMdx___children___children___children"
  | "childMdx___children___internal___content"
  | "childMdx___children___internal___contentDigest"
  | "childMdx___children___internal___description"
  | "childMdx___children___internal___fieldOwners"
  | "childMdx___children___internal___ignoreType"
  | "childMdx___children___internal___mediaType"
  | "childMdx___children___internal___owner"
  | "childMdx___children___internal___type"
  | "childMdx___internal___content"
  | "childMdx___internal___contentDigest"
  | "childMdx___internal___description"
  | "childMdx___internal___fieldOwners"
  | "childMdx___internal___ignoreType"
  | "childMdx___internal___mediaType"
  | "childMdx___internal___owner"
  | "childMdx___internal___type"
  | "childrenImageSharp"
  | "childrenImageSharp___fixed___base64"
  | "childrenImageSharp___fixed___tracedSVG"
  | "childrenImageSharp___fixed___aspectRatio"
  | "childrenImageSharp___fixed___width"
  | "childrenImageSharp___fixed___height"
  | "childrenImageSharp___fixed___src"
  | "childrenImageSharp___fixed___srcSet"
  | "childrenImageSharp___fixed___srcWebp"
  | "childrenImageSharp___fixed___srcSetWebp"
  | "childrenImageSharp___fixed___originalName"
  | "childrenImageSharp___fluid___base64"
  | "childrenImageSharp___fluid___tracedSVG"
  | "childrenImageSharp___fluid___aspectRatio"
  | "childrenImageSharp___fluid___src"
  | "childrenImageSharp___fluid___srcSet"
  | "childrenImageSharp___fluid___srcWebp"
  | "childrenImageSharp___fluid___srcSetWebp"
  | "childrenImageSharp___fluid___sizes"
  | "childrenImageSharp___fluid___originalImg"
  | "childrenImageSharp___fluid___originalName"
  | "childrenImageSharp___fluid___presentationWidth"
  | "childrenImageSharp___fluid___presentationHeight"
  | "childrenImageSharp___gatsbyImageData"
  | "childrenImageSharp___original___width"
  | "childrenImageSharp___original___height"
  | "childrenImageSharp___original___src"
  | "childrenImageSharp___resize___src"
  | "childrenImageSharp___resize___tracedSVG"
  | "childrenImageSharp___resize___width"
  | "childrenImageSharp___resize___height"
  | "childrenImageSharp___resize___aspectRatio"
  | "childrenImageSharp___resize___originalName"
  | "childrenImageSharp___id"
  | "childrenImageSharp___parent___id"
  | "childrenImageSharp___parent___parent___id"
  | "childrenImageSharp___parent___parent___children"
  | "childrenImageSharp___parent___children"
  | "childrenImageSharp___parent___children___id"
  | "childrenImageSharp___parent___children___children"
  | "childrenImageSharp___parent___internal___content"
  | "childrenImageSharp___parent___internal___contentDigest"
  | "childrenImageSharp___parent___internal___description"
  | "childrenImageSharp___parent___internal___fieldOwners"
  | "childrenImageSharp___parent___internal___ignoreType"
  | "childrenImageSharp___parent___internal___mediaType"
  | "childrenImageSharp___parent___internal___owner"
  | "childrenImageSharp___parent___internal___type"
  | "childrenImageSharp___children"
  | "childrenImageSharp___children___id"
  | "childrenImageSharp___children___parent___id"
  | "childrenImageSharp___children___parent___children"
  | "childrenImageSharp___children___children"
  | "childrenImageSharp___children___children___id"
  | "childrenImageSharp___children___children___children"
  | "childrenImageSharp___children___internal___content"
  | "childrenImageSharp___children___internal___contentDigest"
  | "childrenImageSharp___children___internal___description"
  | "childrenImageSharp___children___internal___fieldOwners"
  | "childrenImageSharp___children___internal___ignoreType"
  | "childrenImageSharp___children___internal___mediaType"
  | "childrenImageSharp___children___internal___owner"
  | "childrenImageSharp___children___internal___type"
  | "childrenImageSharp___internal___content"
  | "childrenImageSharp___internal___contentDigest"
  | "childrenImageSharp___internal___description"
  | "childrenImageSharp___internal___fieldOwners"
  | "childrenImageSharp___internal___ignoreType"
  | "childrenImageSharp___internal___mediaType"
  | "childrenImageSharp___internal___owner"
  | "childrenImageSharp___internal___type"
  | "childImageSharp___fixed___base64"
  | "childImageSharp___fixed___tracedSVG"
  | "childImageSharp___fixed___aspectRatio"
  | "childImageSharp___fixed___width"
  | "childImageSharp___fixed___height"
  | "childImageSharp___fixed___src"
  | "childImageSharp___fixed___srcSet"
  | "childImageSharp___fixed___srcWebp"
  | "childImageSharp___fixed___srcSetWebp"
  | "childImageSharp___fixed___originalName"
  | "childImageSharp___fluid___base64"
  | "childImageSharp___fluid___tracedSVG"
  | "childImageSharp___fluid___aspectRatio"
  | "childImageSharp___fluid___src"
  | "childImageSharp___fluid___srcSet"
  | "childImageSharp___fluid___srcWebp"
  | "childImageSharp___fluid___srcSetWebp"
  | "childImageSharp___fluid___sizes"
  | "childImageSharp___fluid___originalImg"
  | "childImageSharp___fluid___originalName"
  | "childImageSharp___fluid___presentationWidth"
  | "childImageSharp___fluid___presentationHeight"
  | "childImageSharp___gatsbyImageData"
  | "childImageSharp___original___width"
  | "childImageSharp___original___height"
  | "childImageSharp___original___src"
  | "childImageSharp___resize___src"
  | "childImageSharp___resize___tracedSVG"
  | "childImageSharp___resize___width"
  | "childImageSharp___resize___height"
  | "childImageSharp___resize___aspectRatio"
  | "childImageSharp___resize___originalName"
  | "childImageSharp___id"
  | "childImageSharp___parent___id"
  | "childImageSharp___parent___parent___id"
  | "childImageSharp___parent___parent___children"
  | "childImageSharp___parent___children"
  | "childImageSharp___parent___children___id"
  | "childImageSharp___parent___children___children"
  | "childImageSharp___parent___internal___content"
  | "childImageSharp___parent___internal___contentDigest"
  | "childImageSharp___parent___internal___description"
  | "childImageSharp___parent___internal___fieldOwners"
  | "childImageSharp___parent___internal___ignoreType"
  | "childImageSharp___parent___internal___mediaType"
  | "childImageSharp___parent___internal___owner"
  | "childImageSharp___parent___internal___type"
  | "childImageSharp___children"
  | "childImageSharp___children___id"
  | "childImageSharp___children___parent___id"
  | "childImageSharp___children___parent___children"
  | "childImageSharp___children___children"
  | "childImageSharp___children___children___id"
  | "childImageSharp___children___children___children"
  | "childImageSharp___children___internal___content"
  | "childImageSharp___children___internal___contentDigest"
  | "childImageSharp___children___internal___description"
  | "childImageSharp___children___internal___fieldOwners"
  | "childImageSharp___children___internal___ignoreType"
  | "childImageSharp___children___internal___mediaType"
  | "childImageSharp___children___internal___owner"
  | "childImageSharp___children___internal___type"
  | "childImageSharp___internal___content"
  | "childImageSharp___internal___contentDigest"
  | "childImageSharp___internal___description"
  | "childImageSharp___internal___fieldOwners"
  | "childImageSharp___internal___ignoreType"
  | "childImageSharp___internal___mediaType"
  | "childImageSharp___internal___owner"
  | "childImageSharp___internal___type"
  | "childrenConsensusBountyHuntersCsv"
  | "childrenConsensusBountyHuntersCsv___username"
  | "childrenConsensusBountyHuntersCsv___name"
  | "childrenConsensusBountyHuntersCsv___score"
  | "childrenConsensusBountyHuntersCsv___id"
  | "childrenConsensusBountyHuntersCsv___parent___id"
  | "childrenConsensusBountyHuntersCsv___parent___parent___id"
  | "childrenConsensusBountyHuntersCsv___parent___parent___children"
  | "childrenConsensusBountyHuntersCsv___parent___children"
  | "childrenConsensusBountyHuntersCsv___parent___children___id"
  | "childrenConsensusBountyHuntersCsv___parent___children___children"
  | "childrenConsensusBountyHuntersCsv___parent___internal___content"
  | "childrenConsensusBountyHuntersCsv___parent___internal___contentDigest"
  | "childrenConsensusBountyHuntersCsv___parent___internal___description"
  | "childrenConsensusBountyHuntersCsv___parent___internal___fieldOwners"
  | "childrenConsensusBountyHuntersCsv___parent___internal___ignoreType"
  | "childrenConsensusBountyHuntersCsv___parent___internal___mediaType"
  | "childrenConsensusBountyHuntersCsv___parent___internal___owner"
  | "childrenConsensusBountyHuntersCsv___parent___internal___type"
  | "childrenConsensusBountyHuntersCsv___children"
  | "childrenConsensusBountyHuntersCsv___children___id"
  | "childrenConsensusBountyHuntersCsv___children___parent___id"
  | "childrenConsensusBountyHuntersCsv___children___parent___children"
  | "childrenConsensusBountyHuntersCsv___children___children"
  | "childrenConsensusBountyHuntersCsv___children___children___id"
  | "childrenConsensusBountyHuntersCsv___children___children___children"
  | "childrenConsensusBountyHuntersCsv___children___internal___content"
  | "childrenConsensusBountyHuntersCsv___children___internal___contentDigest"
  | "childrenConsensusBountyHuntersCsv___children___internal___description"
  | "childrenConsensusBountyHuntersCsv___children___internal___fieldOwners"
  | "childrenConsensusBountyHuntersCsv___children___internal___ignoreType"
  | "childrenConsensusBountyHuntersCsv___children___internal___mediaType"
  | "childrenConsensusBountyHuntersCsv___children___internal___owner"
  | "childrenConsensusBountyHuntersCsv___children___internal___type"
  | "childrenConsensusBountyHuntersCsv___internal___content"
  | "childrenConsensusBountyHuntersCsv___internal___contentDigest"
  | "childrenConsensusBountyHuntersCsv___internal___description"
  | "childrenConsensusBountyHuntersCsv___internal___fieldOwners"
  | "childrenConsensusBountyHuntersCsv___internal___ignoreType"
  | "childrenConsensusBountyHuntersCsv___internal___mediaType"
  | "childrenConsensusBountyHuntersCsv___internal___owner"
  | "childrenConsensusBountyHuntersCsv___internal___type"
  | "childConsensusBountyHuntersCsv___username"
  | "childConsensusBountyHuntersCsv___name"
  | "childConsensusBountyHuntersCsv___score"
  | "childConsensusBountyHuntersCsv___id"
  | "childConsensusBountyHuntersCsv___parent___id"
  | "childConsensusBountyHuntersCsv___parent___parent___id"
  | "childConsensusBountyHuntersCsv___parent___parent___children"
  | "childConsensusBountyHuntersCsv___parent___children"
  | "childConsensusBountyHuntersCsv___parent___children___id"
  | "childConsensusBountyHuntersCsv___parent___children___children"
  | "childConsensusBountyHuntersCsv___parent___internal___content"
  | "childConsensusBountyHuntersCsv___parent___internal___contentDigest"
  | "childConsensusBountyHuntersCsv___parent___internal___description"
  | "childConsensusBountyHuntersCsv___parent___internal___fieldOwners"
  | "childConsensusBountyHuntersCsv___parent___internal___ignoreType"
  | "childConsensusBountyHuntersCsv___parent___internal___mediaType"
  | "childConsensusBountyHuntersCsv___parent___internal___owner"
  | "childConsensusBountyHuntersCsv___parent___internal___type"
  | "childConsensusBountyHuntersCsv___children"
  | "childConsensusBountyHuntersCsv___children___id"
  | "childConsensusBountyHuntersCsv___children___parent___id"
  | "childConsensusBountyHuntersCsv___children___parent___children"
  | "childConsensusBountyHuntersCsv___children___children"
  | "childConsensusBountyHuntersCsv___children___children___id"
  | "childConsensusBountyHuntersCsv___children___children___children"
  | "childConsensusBountyHuntersCsv___children___internal___content"
  | "childConsensusBountyHuntersCsv___children___internal___contentDigest"
  | "childConsensusBountyHuntersCsv___children___internal___description"
  | "childConsensusBountyHuntersCsv___children___internal___fieldOwners"
  | "childConsensusBountyHuntersCsv___children___internal___ignoreType"
  | "childConsensusBountyHuntersCsv___children___internal___mediaType"
  | "childConsensusBountyHuntersCsv___children___internal___owner"
  | "childConsensusBountyHuntersCsv___children___internal___type"
  | "childConsensusBountyHuntersCsv___internal___content"
  | "childConsensusBountyHuntersCsv___internal___contentDigest"
  | "childConsensusBountyHuntersCsv___internal___description"
  | "childConsensusBountyHuntersCsv___internal___fieldOwners"
  | "childConsensusBountyHuntersCsv___internal___ignoreType"
  | "childConsensusBountyHuntersCsv___internal___mediaType"
  | "childConsensusBountyHuntersCsv___internal___owner"
  | "childConsensusBountyHuntersCsv___internal___type"
  | "childrenWalletsCsv"
  | "childrenWalletsCsv___id"
  | "childrenWalletsCsv___parent___id"
  | "childrenWalletsCsv___parent___parent___id"
  | "childrenWalletsCsv___parent___parent___children"
  | "childrenWalletsCsv___parent___children"
  | "childrenWalletsCsv___parent___children___id"
  | "childrenWalletsCsv___parent___children___children"
  | "childrenWalletsCsv___parent___internal___content"
  | "childrenWalletsCsv___parent___internal___contentDigest"
  | "childrenWalletsCsv___parent___internal___description"
  | "childrenWalletsCsv___parent___internal___fieldOwners"
  | "childrenWalletsCsv___parent___internal___ignoreType"
  | "childrenWalletsCsv___parent___internal___mediaType"
  | "childrenWalletsCsv___parent___internal___owner"
  | "childrenWalletsCsv___parent___internal___type"
  | "childrenWalletsCsv___children"
  | "childrenWalletsCsv___children___id"
  | "childrenWalletsCsv___children___parent___id"
  | "childrenWalletsCsv___children___parent___children"
  | "childrenWalletsCsv___children___children"
  | "childrenWalletsCsv___children___children___id"
  | "childrenWalletsCsv___children___children___children"
  | "childrenWalletsCsv___children___internal___content"
  | "childrenWalletsCsv___children___internal___contentDigest"
  | "childrenWalletsCsv___children___internal___description"
  | "childrenWalletsCsv___children___internal___fieldOwners"
  | "childrenWalletsCsv___children___internal___ignoreType"
  | "childrenWalletsCsv___children___internal___mediaType"
  | "childrenWalletsCsv___children___internal___owner"
  | "childrenWalletsCsv___children___internal___type"
  | "childrenWalletsCsv___internal___content"
  | "childrenWalletsCsv___internal___contentDigest"
  | "childrenWalletsCsv___internal___description"
  | "childrenWalletsCsv___internal___fieldOwners"
  | "childrenWalletsCsv___internal___ignoreType"
  | "childrenWalletsCsv___internal___mediaType"
  | "childrenWalletsCsv___internal___owner"
  | "childrenWalletsCsv___internal___type"
  | "childrenWalletsCsv___name"
  | "childrenWalletsCsv___url"
  | "childrenWalletsCsv___brand_color"
  | "childrenWalletsCsv___has_mobile"
  | "childrenWalletsCsv___has_desktop"
  | "childrenWalletsCsv___has_web"
  | "childrenWalletsCsv___has_hardware"
  | "childrenWalletsCsv___has_card_deposits"
  | "childrenWalletsCsv___has_explore_dapps"
  | "childrenWalletsCsv___has_defi_integrations"
  | "childrenWalletsCsv___has_bank_withdrawals"
  | "childrenWalletsCsv___has_limits_protection"
  | "childrenWalletsCsv___has_high_volume_purchases"
  | "childrenWalletsCsv___has_multisig"
  | "childrenWalletsCsv___has_dex_integrations"
  | "childWalletsCsv___id"
  | "childWalletsCsv___parent___id"
  | "childWalletsCsv___parent___parent___id"
  | "childWalletsCsv___parent___parent___children"
  | "childWalletsCsv___parent___children"
  | "childWalletsCsv___parent___children___id"
  | "childWalletsCsv___parent___children___children"
  | "childWalletsCsv___parent___internal___content"
  | "childWalletsCsv___parent___internal___contentDigest"
  | "childWalletsCsv___parent___internal___description"
  | "childWalletsCsv___parent___internal___fieldOwners"
  | "childWalletsCsv___parent___internal___ignoreType"
  | "childWalletsCsv___parent___internal___mediaType"
  | "childWalletsCsv___parent___internal___owner"
  | "childWalletsCsv___parent___internal___type"
  | "childWalletsCsv___children"
  | "childWalletsCsv___children___id"
  | "childWalletsCsv___children___parent___id"
  | "childWalletsCsv___children___parent___children"
  | "childWalletsCsv___children___children"
  | "childWalletsCsv___children___children___id"
  | "childWalletsCsv___children___children___children"
  | "childWalletsCsv___children___internal___content"
  | "childWalletsCsv___children___internal___contentDigest"
  | "childWalletsCsv___children___internal___description"
  | "childWalletsCsv___children___internal___fieldOwners"
  | "childWalletsCsv___children___internal___ignoreType"
  | "childWalletsCsv___children___internal___mediaType"
  | "childWalletsCsv___children___internal___owner"
  | "childWalletsCsv___children___internal___type"
  | "childWalletsCsv___internal___content"
  | "childWalletsCsv___internal___contentDigest"
  | "childWalletsCsv___internal___description"
  | "childWalletsCsv___internal___fieldOwners"
  | "childWalletsCsv___internal___ignoreType"
  | "childWalletsCsv___internal___mediaType"
  | "childWalletsCsv___internal___owner"
  | "childWalletsCsv___internal___type"
  | "childWalletsCsv___name"
  | "childWalletsCsv___url"
  | "childWalletsCsv___brand_color"
  | "childWalletsCsv___has_mobile"
  | "childWalletsCsv___has_desktop"
  | "childWalletsCsv___has_web"
  | "childWalletsCsv___has_hardware"
  | "childWalletsCsv___has_card_deposits"
  | "childWalletsCsv___has_explore_dapps"
  | "childWalletsCsv___has_defi_integrations"
  | "childWalletsCsv___has_bank_withdrawals"
  | "childWalletsCsv___has_limits_protection"
  | "childWalletsCsv___has_high_volume_purchases"
  | "childWalletsCsv___has_multisig"
  | "childWalletsCsv___has_dex_integrations"
  | "childrenExchangesByCountryCsv"
  | "childrenExchangesByCountryCsv___id"
  | "childrenExchangesByCountryCsv___parent___id"
  | "childrenExchangesByCountryCsv___parent___parent___id"
  | "childrenExchangesByCountryCsv___parent___parent___children"
  | "childrenExchangesByCountryCsv___parent___children"
  | "childrenExchangesByCountryCsv___parent___children___id"
  | "childrenExchangesByCountryCsv___parent___children___children"
  | "childrenExchangesByCountryCsv___parent___internal___content"
  | "childrenExchangesByCountryCsv___parent___internal___contentDigest"
  | "childrenExchangesByCountryCsv___parent___internal___description"
  | "childrenExchangesByCountryCsv___parent___internal___fieldOwners"
  | "childrenExchangesByCountryCsv___parent___internal___ignoreType"
  | "childrenExchangesByCountryCsv___parent___internal___mediaType"
  | "childrenExchangesByCountryCsv___parent___internal___owner"
  | "childrenExchangesByCountryCsv___parent___internal___type"
  | "childrenExchangesByCountryCsv___children"
  | "childrenExchangesByCountryCsv___children___id"
  | "childrenExchangesByCountryCsv___children___parent___id"
  | "childrenExchangesByCountryCsv___children___parent___children"
  | "childrenExchangesByCountryCsv___children___children"
  | "childrenExchangesByCountryCsv___children___children___id"
  | "childrenExchangesByCountryCsv___children___children___children"
  | "childrenExchangesByCountryCsv___children___internal___content"
  | "childrenExchangesByCountryCsv___children___internal___contentDigest"
  | "childrenExchangesByCountryCsv___children___internal___description"
  | "childrenExchangesByCountryCsv___children___internal___fieldOwners"
  | "childrenExchangesByCountryCsv___children___internal___ignoreType"
  | "childrenExchangesByCountryCsv___children___internal___mediaType"
  | "childrenExchangesByCountryCsv___children___internal___owner"
  | "childrenExchangesByCountryCsv___children___internal___type"
  | "childrenExchangesByCountryCsv___internal___content"
  | "childrenExchangesByCountryCsv___internal___contentDigest"
  | "childrenExchangesByCountryCsv___internal___description"
  | "childrenExchangesByCountryCsv___internal___fieldOwners"
  | "childrenExchangesByCountryCsv___internal___ignoreType"
  | "childrenExchangesByCountryCsv___internal___mediaType"
  | "childrenExchangesByCountryCsv___internal___owner"
  | "childrenExchangesByCountryCsv___internal___type"
  | "childrenExchangesByCountryCsv___country"
  | "childrenExchangesByCountryCsv___coinmama"
  | "childrenExchangesByCountryCsv___bittrex"
  | "childrenExchangesByCountryCsv___simplex"
  | "childrenExchangesByCountryCsv___wyre"
  | "childrenExchangesByCountryCsv___moonpay"
  | "childrenExchangesByCountryCsv___coinbase"
  | "childrenExchangesByCountryCsv___kraken"
  | "childrenExchangesByCountryCsv___gemini"
  | "childrenExchangesByCountryCsv___binance"
  | "childrenExchangesByCountryCsv___binanceus"
  | "childrenExchangesByCountryCsv___bitbuy"
  | "childrenExchangesByCountryCsv___rain"
  | "childrenExchangesByCountryCsv___cryptocom"
  | "childrenExchangesByCountryCsv___itezcom"
  | "childrenExchangesByCountryCsv___coinspot"
  | "childrenExchangesByCountryCsv___bitvavo"
  | "childrenExchangesByCountryCsv___mtpelerin"
  | "childrenExchangesByCountryCsv___wazirx"
  | "childrenExchangesByCountryCsv___bitflyer"
  | "childrenExchangesByCountryCsv___easycrypto"
  | "childrenExchangesByCountryCsv___okx"
  | "childrenExchangesByCountryCsv___kucoin"
  | "childrenExchangesByCountryCsv___ftx"
  | "childrenExchangesByCountryCsv___huobiglobal"
  | "childrenExchangesByCountryCsv___gateio"
  | "childrenExchangesByCountryCsv___bitfinex"
  | "childrenExchangesByCountryCsv___bybit"
  | "childrenExchangesByCountryCsv___bitkub"
  | "childrenExchangesByCountryCsv___bitso"
  | "childrenExchangesByCountryCsv___ftxus"
  | "childExchangesByCountryCsv___id"
  | "childExchangesByCountryCsv___parent___id"
  | "childExchangesByCountryCsv___parent___parent___id"
  | "childExchangesByCountryCsv___parent___parent___children"
  | "childExchangesByCountryCsv___parent___children"
  | "childExchangesByCountryCsv___parent___children___id"
  | "childExchangesByCountryCsv___parent___children___children"
  | "childExchangesByCountryCsv___parent___internal___content"
  | "childExchangesByCountryCsv___parent___internal___contentDigest"
  | "childExchangesByCountryCsv___parent___internal___description"
  | "childExchangesByCountryCsv___parent___internal___fieldOwners"
  | "childExchangesByCountryCsv___parent___internal___ignoreType"
  | "childExchangesByCountryCsv___parent___internal___mediaType"
  | "childExchangesByCountryCsv___parent___internal___owner"
  | "childExchangesByCountryCsv___parent___internal___type"
  | "childExchangesByCountryCsv___children"
  | "childExchangesByCountryCsv___children___id"
  | "childExchangesByCountryCsv___children___parent___id"
  | "childExchangesByCountryCsv___children___parent___children"
  | "childExchangesByCountryCsv___children___children"
  | "childExchangesByCountryCsv___children___children___id"
  | "childExchangesByCountryCsv___children___children___children"
  | "childExchangesByCountryCsv___children___internal___content"
  | "childExchangesByCountryCsv___children___internal___contentDigest"
  | "childExchangesByCountryCsv___children___internal___description"
  | "childExchangesByCountryCsv___children___internal___fieldOwners"
  | "childExchangesByCountryCsv___children___internal___ignoreType"
  | "childExchangesByCountryCsv___children___internal___mediaType"
  | "childExchangesByCountryCsv___children___internal___owner"
  | "childExchangesByCountryCsv___children___internal___type"
  | "childExchangesByCountryCsv___internal___content"
  | "childExchangesByCountryCsv___internal___contentDigest"
  | "childExchangesByCountryCsv___internal___description"
  | "childExchangesByCountryCsv___internal___fieldOwners"
  | "childExchangesByCountryCsv___internal___ignoreType"
  | "childExchangesByCountryCsv___internal___mediaType"
  | "childExchangesByCountryCsv___internal___owner"
  | "childExchangesByCountryCsv___internal___type"
  | "childExchangesByCountryCsv___country"
  | "childExchangesByCountryCsv___coinmama"
  | "childExchangesByCountryCsv___bittrex"
  | "childExchangesByCountryCsv___simplex"
  | "childExchangesByCountryCsv___wyre"
  | "childExchangesByCountryCsv___moonpay"
  | "childExchangesByCountryCsv___coinbase"
  | "childExchangesByCountryCsv___kraken"
  | "childExchangesByCountryCsv___gemini"
  | "childExchangesByCountryCsv___binance"
  | "childExchangesByCountryCsv___binanceus"
  | "childExchangesByCountryCsv___bitbuy"
  | "childExchangesByCountryCsv___rain"
  | "childExchangesByCountryCsv___cryptocom"
  | "childExchangesByCountryCsv___itezcom"
  | "childExchangesByCountryCsv___coinspot"
  | "childExchangesByCountryCsv___bitvavo"
  | "childExchangesByCountryCsv___mtpelerin"
  | "childExchangesByCountryCsv___wazirx"
  | "childExchangesByCountryCsv___bitflyer"
  | "childExchangesByCountryCsv___easycrypto"
  | "childExchangesByCountryCsv___okx"
  | "childExchangesByCountryCsv___kucoin"
  | "childExchangesByCountryCsv___ftx"
  | "childExchangesByCountryCsv___huobiglobal"
  | "childExchangesByCountryCsv___gateio"
  | "childExchangesByCountryCsv___bitfinex"
  | "childExchangesByCountryCsv___bybit"
  | "childExchangesByCountryCsv___bitkub"
  | "childExchangesByCountryCsv___bitso"
  | "childExchangesByCountryCsv___ftxus"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type FileGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<FileGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum
}

export type FileGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: FileFieldsEnum
}

export type FileSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SortOrderEnum = "ASC" | "DESC"

export type DirectoryConnection = {
  totalCount: Scalars["Int"]
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<DirectoryGroupConnection>
}

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: DirectoryFieldsEnum
}

export type DirectoryEdge = {
  next?: Maybe<Directory>
  node: Directory
  previous?: Maybe<Directory>
}

export type DirectoryFieldsEnum =
  | "sourceInstanceName"
  | "absolutePath"
  | "relativePath"
  | "extension"
  | "size"
  | "prettySize"
  | "modifiedTime"
  | "accessTime"
  | "changeTime"
  | "birthTime"
  | "root"
  | "dir"
  | "base"
  | "ext"
  | "name"
  | "relativeDirectory"
  | "dev"
  | "mode"
  | "nlink"
  | "uid"
  | "gid"
  | "rdev"
  | "ino"
  | "atimeMs"
  | "mtimeMs"
  | "ctimeMs"
  | "atime"
  | "mtime"
  | "ctime"
  | "birthtime"
  | "birthtimeMs"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type DirectoryGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<DirectoryGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: DirectoryFieldsEnum
}

export type DirectoryFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>
  absolutePath?: InputMaybe<StringQueryOperatorInput>
  relativePath?: InputMaybe<StringQueryOperatorInput>
  extension?: InputMaybe<StringQueryOperatorInput>
  size?: InputMaybe<IntQueryOperatorInput>
  prettySize?: InputMaybe<StringQueryOperatorInput>
  modifiedTime?: InputMaybe<DateQueryOperatorInput>
  accessTime?: InputMaybe<DateQueryOperatorInput>
  changeTime?: InputMaybe<DateQueryOperatorInput>
  birthTime?: InputMaybe<DateQueryOperatorInput>
  root?: InputMaybe<StringQueryOperatorInput>
  dir?: InputMaybe<StringQueryOperatorInput>
  base?: InputMaybe<StringQueryOperatorInput>
  ext?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>
  dev?: InputMaybe<IntQueryOperatorInput>
  mode?: InputMaybe<IntQueryOperatorInput>
  nlink?: InputMaybe<IntQueryOperatorInput>
  uid?: InputMaybe<IntQueryOperatorInput>
  gid?: InputMaybe<IntQueryOperatorInput>
  rdev?: InputMaybe<IntQueryOperatorInput>
  ino?: InputMaybe<FloatQueryOperatorInput>
  atimeMs?: InputMaybe<FloatQueryOperatorInput>
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>
  atime?: InputMaybe<DateQueryOperatorInput>
  mtime?: InputMaybe<DateQueryOperatorInput>
  ctime?: InputMaybe<DateQueryOperatorInput>
  birthtime?: InputMaybe<DateQueryOperatorInput>
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type DirectorySortInput = {
  fields?: InputMaybe<Array<InputMaybe<DirectoryFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SiteSiteMetadataFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>
  description?: InputMaybe<StringQueryOperatorInput>
  url?: InputMaybe<StringQueryOperatorInput>
  siteUrl?: InputMaybe<StringQueryOperatorInput>
  author?: InputMaybe<StringQueryOperatorInput>
  defaultLanguage?: InputMaybe<StringQueryOperatorInput>
  supportedLanguages?: InputMaybe<StringQueryOperatorInput>
  editContentUrl?: InputMaybe<StringQueryOperatorInput>
}

export type SiteFlagsFilterInput = {
  FAST_DEV?: InputMaybe<BooleanQueryOperatorInput>
}

export type SiteConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteGroupConnection>
}

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteFieldsEnum
}

export type SiteEdge = {
  next?: Maybe<Site>
  node: Site
  previous?: Maybe<Site>
}

export type SiteFieldsEnum =
  | "buildTime"
  | "siteMetadata___title"
  | "siteMetadata___description"
  | "siteMetadata___url"
  | "siteMetadata___siteUrl"
  | "siteMetadata___author"
  | "siteMetadata___defaultLanguage"
  | "siteMetadata___supportedLanguages"
  | "siteMetadata___editContentUrl"
  | "port"
  | "host"
  | "flags___FAST_DEV"
  | "polyfill"
  | "pathPrefix"
  | "jsxRuntime"
  | "trailingSlash"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type SiteGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum
}

export type SiteGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteFieldsEnum
}

export type SiteFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>
  port?: InputMaybe<IntQueryOperatorInput>
  host?: InputMaybe<StringQueryOperatorInput>
  flags?: InputMaybe<SiteFlagsFilterInput>
  polyfill?: InputMaybe<BooleanQueryOperatorInput>
  pathPrefix?: InputMaybe<StringQueryOperatorInput>
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>
  trailingSlash?: InputMaybe<StringQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type SiteSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SiteFunctionConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteFunctionEdge>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteFunctionGroupConnection>
}

export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionEdge = {
  next?: Maybe<SiteFunction>
  node: SiteFunction
  previous?: Maybe<SiteFunction>
}

export type SiteFunctionFieldsEnum =
  | "functionRoute"
  | "pluginName"
  | "originalAbsoluteFilePath"
  | "originalRelativeFilePath"
  | "relativeCompiledFilePath"
  | "absoluteCompiledFilePath"
  | "matchPath"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type SiteFunctionGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteFunctionEdge>
  nodes: Array<SiteFunction>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteFunctionGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteFunctionFieldsEnum
}

export type SiteFunctionFilterInput = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>
  pluginName?: InputMaybe<StringQueryOperatorInput>
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>
  matchPath?: InputMaybe<StringQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type SiteFunctionSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFunctionFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SitePluginFilterInput = {
  resolve?: InputMaybe<StringQueryOperatorInput>
  name?: InputMaybe<StringQueryOperatorInput>
  version?: InputMaybe<StringQueryOperatorInput>
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>
  browserAPIs?: InputMaybe<StringQueryOperatorInput>
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>
  packageJson?: InputMaybe<JsonQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type SitePageConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SitePageGroupConnection>
}

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SitePageFieldsEnum
}

export type SitePageEdge = {
  next?: Maybe<SitePage>
  node: SitePage
  previous?: Maybe<SitePage>
}

export type SitePageFieldsEnum =
  | "path"
  | "component"
  | "internalComponentName"
  | "componentChunkName"
  | "matchPath"
  | "pageContext"
  | "pluginCreator___resolve"
  | "pluginCreator___name"
  | "pluginCreator___version"
  | "pluginCreator___nodeAPIs"
  | "pluginCreator___browserAPIs"
  | "pluginCreator___ssrAPIs"
  | "pluginCreator___pluginFilepath"
  | "pluginCreator___pluginOptions"
  | "pluginCreator___packageJson"
  | "pluginCreator___id"
  | "pluginCreator___parent___id"
  | "pluginCreator___parent___parent___id"
  | "pluginCreator___parent___parent___children"
  | "pluginCreator___parent___children"
  | "pluginCreator___parent___children___id"
  | "pluginCreator___parent___children___children"
  | "pluginCreator___parent___internal___content"
  | "pluginCreator___parent___internal___contentDigest"
  | "pluginCreator___parent___internal___description"
  | "pluginCreator___parent___internal___fieldOwners"
  | "pluginCreator___parent___internal___ignoreType"
  | "pluginCreator___parent___internal___mediaType"
  | "pluginCreator___parent___internal___owner"
  | "pluginCreator___parent___internal___type"
  | "pluginCreator___children"
  | "pluginCreator___children___id"
  | "pluginCreator___children___parent___id"
  | "pluginCreator___children___parent___children"
  | "pluginCreator___children___children"
  | "pluginCreator___children___children___id"
  | "pluginCreator___children___children___children"
  | "pluginCreator___children___internal___content"
  | "pluginCreator___children___internal___contentDigest"
  | "pluginCreator___children___internal___description"
  | "pluginCreator___children___internal___fieldOwners"
  | "pluginCreator___children___internal___ignoreType"
  | "pluginCreator___children___internal___mediaType"
  | "pluginCreator___children___internal___owner"
  | "pluginCreator___children___internal___type"
  | "pluginCreator___internal___content"
  | "pluginCreator___internal___contentDigest"
  | "pluginCreator___internal___description"
  | "pluginCreator___internal___fieldOwners"
  | "pluginCreator___internal___ignoreType"
  | "pluginCreator___internal___mediaType"
  | "pluginCreator___internal___owner"
  | "pluginCreator___internal___type"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type SitePageGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SitePageGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum
}

export type SitePageGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SitePageFieldsEnum
}

export type SitePageFilterInput = {
  path?: InputMaybe<StringQueryOperatorInput>
  component?: InputMaybe<StringQueryOperatorInput>
  internalComponentName?: InputMaybe<StringQueryOperatorInput>
  componentChunkName?: InputMaybe<StringQueryOperatorInput>
  matchPath?: InputMaybe<StringQueryOperatorInput>
  pageContext?: InputMaybe<JsonQueryOperatorInput>
  pluginCreator?: InputMaybe<SitePluginFilterInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type SitePageSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePageFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SitePluginConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SitePluginGroupConnection>
}

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SitePluginFieldsEnum
}

export type SitePluginEdge = {
  next?: Maybe<SitePlugin>
  node: SitePlugin
  previous?: Maybe<SitePlugin>
}

export type SitePluginFieldsEnum =
  | "resolve"
  | "name"
  | "version"
  | "nodeAPIs"
  | "browserAPIs"
  | "ssrAPIs"
  | "pluginFilepath"
  | "pluginOptions"
  | "packageJson"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type SitePluginGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SitePluginGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SitePluginFieldsEnum
}

export type SitePluginSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePluginFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type SiteBuildMetadataConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteBuildMetadataGroupConnection>
}

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataEdge = {
  next?: Maybe<SiteBuildMetadata>
  node: SiteBuildMetadata
  previous?: Maybe<SiteBuildMetadata>
}

export type SiteBuildMetadataFieldsEnum =
  | "buildTime"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<SiteBuildMetadataGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>
  id?: InputMaybe<StringQueryOperatorInput>
  parent?: InputMaybe<NodeFilterInput>
  children?: InputMaybe<NodeFilterListInput>
  internal?: InputMaybe<InternalFilterInput>
}

export type SiteBuildMetadataSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteBuildMetadataFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type MdxConnection = {
  totalCount: Scalars["Int"]
  edges: Array<MdxEdge>
  nodes: Array<Mdx>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<MdxGroupConnection>
}

export type MdxConnectionDistinctArgs = {
  field: MdxFieldsEnum
}

export type MdxConnectionMaxArgs = {
  field: MdxFieldsEnum
}

export type MdxConnectionMinArgs = {
  field: MdxFieldsEnum
}

export type MdxConnectionSumArgs = {
  field: MdxFieldsEnum
}

export type MdxConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: MdxFieldsEnum
}

export type MdxEdge = {
  next?: Maybe<Mdx>
  node: Mdx
  previous?: Maybe<Mdx>
}

export type MdxFieldsEnum =
  | "rawBody"
  | "fileAbsolutePath"
  | "frontmatter___sidebar"
  | "frontmatter___sidebarDepth"
  | "frontmatter___incomplete"
  | "frontmatter___template"
  | "frontmatter___summaryPoint1"
  | "frontmatter___summaryPoint2"
  | "frontmatter___summaryPoint3"
  | "frontmatter___summaryPoint4"
  | "frontmatter___position"
  | "frontmatter___compensation"
  | "frontmatter___location"
  | "frontmatter___type"
  | "frontmatter___link"
  | "frontmatter___address"
  | "frontmatter___skill"
  | "frontmatter___published"
  | "frontmatter___sourceUrl"
  | "frontmatter___source"
  | "frontmatter___author"
  | "frontmatter___tags"
  | "frontmatter___isOutdated"
  | "frontmatter___title"
  | "frontmatter___lang"
  | "frontmatter___description"
  | "frontmatter___emoji"
  | "frontmatter___image___sourceInstanceName"
  | "frontmatter___image___absolutePath"
  | "frontmatter___image___relativePath"
  | "frontmatter___image___extension"
  | "frontmatter___image___size"
  | "frontmatter___image___prettySize"
  | "frontmatter___image___modifiedTime"
  | "frontmatter___image___accessTime"
  | "frontmatter___image___changeTime"
  | "frontmatter___image___birthTime"
  | "frontmatter___image___root"
  | "frontmatter___image___dir"
  | "frontmatter___image___base"
  | "frontmatter___image___ext"
  | "frontmatter___image___name"
  | "frontmatter___image___relativeDirectory"
  | "frontmatter___image___dev"
  | "frontmatter___image___mode"
  | "frontmatter___image___nlink"
  | "frontmatter___image___uid"
  | "frontmatter___image___gid"
  | "frontmatter___image___rdev"
  | "frontmatter___image___ino"
  | "frontmatter___image___atimeMs"
  | "frontmatter___image___mtimeMs"
  | "frontmatter___image___ctimeMs"
  | "frontmatter___image___atime"
  | "frontmatter___image___mtime"
  | "frontmatter___image___ctime"
  | "frontmatter___image___birthtime"
  | "frontmatter___image___birthtimeMs"
  | "frontmatter___image___blksize"
  | "frontmatter___image___blocks"
  | "frontmatter___image___fields___gitLogLatestAuthorName"
  | "frontmatter___image___fields___gitLogLatestAuthorEmail"
  | "frontmatter___image___fields___gitLogLatestDate"
  | "frontmatter___image___publicURL"
  | "frontmatter___image___childrenMdx"
  | "frontmatter___image___childrenMdx___rawBody"
  | "frontmatter___image___childrenMdx___fileAbsolutePath"
  | "frontmatter___image___childrenMdx___slug"
  | "frontmatter___image___childrenMdx___body"
  | "frontmatter___image___childrenMdx___excerpt"
  | "frontmatter___image___childrenMdx___headings"
  | "frontmatter___image___childrenMdx___html"
  | "frontmatter___image___childrenMdx___mdxAST"
  | "frontmatter___image___childrenMdx___tableOfContents"
  | "frontmatter___image___childrenMdx___timeToRead"
  | "frontmatter___image___childrenMdx___id"
  | "frontmatter___image___childrenMdx___children"
  | "frontmatter___image___childMdx___rawBody"
  | "frontmatter___image___childMdx___fileAbsolutePath"
  | "frontmatter___image___childMdx___slug"
  | "frontmatter___image___childMdx___body"
  | "frontmatter___image___childMdx___excerpt"
  | "frontmatter___image___childMdx___headings"
  | "frontmatter___image___childMdx___html"
  | "frontmatter___image___childMdx___mdxAST"
  | "frontmatter___image___childMdx___tableOfContents"
  | "frontmatter___image___childMdx___timeToRead"
  | "frontmatter___image___childMdx___id"
  | "frontmatter___image___childMdx___children"
  | "frontmatter___image___childrenImageSharp"
  | "frontmatter___image___childrenImageSharp___gatsbyImageData"
  | "frontmatter___image___childrenImageSharp___id"
  | "frontmatter___image___childrenImageSharp___children"
  | "frontmatter___image___childImageSharp___gatsbyImageData"
  | "frontmatter___image___childImageSharp___id"
  | "frontmatter___image___childImageSharp___children"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv___username"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv___name"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv___score"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv___id"
  | "frontmatter___image___childrenConsensusBountyHuntersCsv___children"
  | "frontmatter___image___childConsensusBountyHuntersCsv___username"
  | "frontmatter___image___childConsensusBountyHuntersCsv___name"
  | "frontmatter___image___childConsensusBountyHuntersCsv___score"
  | "frontmatter___image___childConsensusBountyHuntersCsv___id"
  | "frontmatter___image___childConsensusBountyHuntersCsv___children"
  | "frontmatter___image___childrenWalletsCsv"
  | "frontmatter___image___childrenWalletsCsv___id"
  | "frontmatter___image___childrenWalletsCsv___children"
  | "frontmatter___image___childrenWalletsCsv___name"
  | "frontmatter___image___childrenWalletsCsv___url"
  | "frontmatter___image___childrenWalletsCsv___brand_color"
  | "frontmatter___image___childrenWalletsCsv___has_mobile"
  | "frontmatter___image___childrenWalletsCsv___has_desktop"
  | "frontmatter___image___childrenWalletsCsv___has_web"
  | "frontmatter___image___childrenWalletsCsv___has_hardware"
  | "frontmatter___image___childrenWalletsCsv___has_card_deposits"
  | "frontmatter___image___childrenWalletsCsv___has_explore_dapps"
  | "frontmatter___image___childrenWalletsCsv___has_defi_integrations"
  | "frontmatter___image___childrenWalletsCsv___has_bank_withdrawals"
  | "frontmatter___image___childrenWalletsCsv___has_limits_protection"
  | "frontmatter___image___childrenWalletsCsv___has_high_volume_purchases"
  | "frontmatter___image___childrenWalletsCsv___has_multisig"
  | "frontmatter___image___childrenWalletsCsv___has_dex_integrations"
  | "frontmatter___image___childWalletsCsv___id"
  | "frontmatter___image___childWalletsCsv___children"
  | "frontmatter___image___childWalletsCsv___name"
  | "frontmatter___image___childWalletsCsv___url"
  | "frontmatter___image___childWalletsCsv___brand_color"
  | "frontmatter___image___childWalletsCsv___has_mobile"
  | "frontmatter___image___childWalletsCsv___has_desktop"
  | "frontmatter___image___childWalletsCsv___has_web"
  | "frontmatter___image___childWalletsCsv___has_hardware"
  | "frontmatter___image___childWalletsCsv___has_card_deposits"
  | "frontmatter___image___childWalletsCsv___has_explore_dapps"
  | "frontmatter___image___childWalletsCsv___has_defi_integrations"
  | "frontmatter___image___childWalletsCsv___has_bank_withdrawals"
  | "frontmatter___image___childWalletsCsv___has_limits_protection"
  | "frontmatter___image___childWalletsCsv___has_high_volume_purchases"
  | "frontmatter___image___childWalletsCsv___has_multisig"
  | "frontmatter___image___childWalletsCsv___has_dex_integrations"
  | "frontmatter___image___childrenExchangesByCountryCsv"
  | "frontmatter___image___childrenExchangesByCountryCsv___id"
  | "frontmatter___image___childrenExchangesByCountryCsv___children"
  | "frontmatter___image___childrenExchangesByCountryCsv___country"
  | "frontmatter___image___childrenExchangesByCountryCsv___coinmama"
  | "frontmatter___image___childrenExchangesByCountryCsv___bittrex"
  | "frontmatter___image___childrenExchangesByCountryCsv___simplex"
  | "frontmatter___image___childrenExchangesByCountryCsv___wyre"
  | "frontmatter___image___childrenExchangesByCountryCsv___moonpay"
  | "frontmatter___image___childrenExchangesByCountryCsv___coinbase"
  | "frontmatter___image___childrenExchangesByCountryCsv___kraken"
  | "frontmatter___image___childrenExchangesByCountryCsv___gemini"
  | "frontmatter___image___childrenExchangesByCountryCsv___binance"
  | "frontmatter___image___childrenExchangesByCountryCsv___binanceus"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitbuy"
  | "frontmatter___image___childrenExchangesByCountryCsv___rain"
  | "frontmatter___image___childrenExchangesByCountryCsv___cryptocom"
  | "frontmatter___image___childrenExchangesByCountryCsv___itezcom"
  | "frontmatter___image___childrenExchangesByCountryCsv___coinspot"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitvavo"
  | "frontmatter___image___childrenExchangesByCountryCsv___mtpelerin"
  | "frontmatter___image___childrenExchangesByCountryCsv___wazirx"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitflyer"
  | "frontmatter___image___childrenExchangesByCountryCsv___easycrypto"
  | "frontmatter___image___childrenExchangesByCountryCsv___okx"
  | "frontmatter___image___childrenExchangesByCountryCsv___kucoin"
  | "frontmatter___image___childrenExchangesByCountryCsv___ftx"
  | "frontmatter___image___childrenExchangesByCountryCsv___huobiglobal"
  | "frontmatter___image___childrenExchangesByCountryCsv___gateio"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitfinex"
  | "frontmatter___image___childrenExchangesByCountryCsv___bybit"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitkub"
  | "frontmatter___image___childrenExchangesByCountryCsv___bitso"
  | "frontmatter___image___childrenExchangesByCountryCsv___ftxus"
  | "frontmatter___image___childExchangesByCountryCsv___id"
  | "frontmatter___image___childExchangesByCountryCsv___children"
  | "frontmatter___image___childExchangesByCountryCsv___country"
  | "frontmatter___image___childExchangesByCountryCsv___coinmama"
  | "frontmatter___image___childExchangesByCountryCsv___bittrex"
  | "frontmatter___image___childExchangesByCountryCsv___simplex"
  | "frontmatter___image___childExchangesByCountryCsv___wyre"
  | "frontmatter___image___childExchangesByCountryCsv___moonpay"
  | "frontmatter___image___childExchangesByCountryCsv___coinbase"
  | "frontmatter___image___childExchangesByCountryCsv___kraken"
  | "frontmatter___image___childExchangesByCountryCsv___gemini"
  | "frontmatter___image___childExchangesByCountryCsv___binance"
  | "frontmatter___image___childExchangesByCountryCsv___binanceus"
  | "frontmatter___image___childExchangesByCountryCsv___bitbuy"
  | "frontmatter___image___childExchangesByCountryCsv___rain"
  | "frontmatter___image___childExchangesByCountryCsv___cryptocom"
  | "frontmatter___image___childExchangesByCountryCsv___itezcom"
  | "frontmatter___image___childExchangesByCountryCsv___coinspot"
  | "frontmatter___image___childExchangesByCountryCsv___bitvavo"
  | "frontmatter___image___childExchangesByCountryCsv___mtpelerin"
  | "frontmatter___image___childExchangesByCountryCsv___wazirx"
  | "frontmatter___image___childExchangesByCountryCsv___bitflyer"
  | "frontmatter___image___childExchangesByCountryCsv___easycrypto"
  | "frontmatter___image___childExchangesByCountryCsv___okx"
  | "frontmatter___image___childExchangesByCountryCsv___kucoin"
  | "frontmatter___image___childExchangesByCountryCsv___ftx"
  | "frontmatter___image___childExchangesByCountryCsv___huobiglobal"
  | "frontmatter___image___childExchangesByCountryCsv___gateio"
  | "frontmatter___image___childExchangesByCountryCsv___bitfinex"
  | "frontmatter___image___childExchangesByCountryCsv___bybit"
  | "frontmatter___image___childExchangesByCountryCsv___bitkub"
  | "frontmatter___image___childExchangesByCountryCsv___bitso"
  | "frontmatter___image___childExchangesByCountryCsv___ftxus"
  | "frontmatter___image___id"
  | "frontmatter___image___parent___id"
  | "frontmatter___image___parent___children"
  | "frontmatter___image___children"
  | "frontmatter___image___children___id"
  | "frontmatter___image___children___children"
  | "frontmatter___image___internal___content"
  | "frontmatter___image___internal___contentDigest"
  | "frontmatter___image___internal___description"
  | "frontmatter___image___internal___fieldOwners"
  | "frontmatter___image___internal___ignoreType"
  | "frontmatter___image___internal___mediaType"
  | "frontmatter___image___internal___owner"
  | "frontmatter___image___internal___type"
  | "frontmatter___alt"
  | "slug"
  | "body"
  | "excerpt"
  | "headings"
  | "headings___value"
  | "headings___depth"
  | "html"
  | "mdxAST"
  | "tableOfContents"
  | "timeToRead"
  | "wordCount___paragraphs"
  | "wordCount___sentences"
  | "wordCount___words"
  | "fields___readingTime___text"
  | "fields___readingTime___minutes"
  | "fields___readingTime___time"
  | "fields___readingTime___words"
  | "fields___isOutdated"
  | "fields___slug"
  | "fields___relativePath"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type MdxGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<MdxEdge>
  nodes: Array<Mdx>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<MdxGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type MdxGroupConnectionDistinctArgs = {
  field: MdxFieldsEnum
}

export type MdxGroupConnectionMaxArgs = {
  field: MdxFieldsEnum
}

export type MdxGroupConnectionMinArgs = {
  field: MdxFieldsEnum
}

export type MdxGroupConnectionSumArgs = {
  field: MdxFieldsEnum
}

export type MdxGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: MdxFieldsEnum
}

export type MdxSortInput = {
  fields?: InputMaybe<Array<InputMaybe<MdxFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type ImageSharpConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ImageSharpGroupConnection>
}

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ImageSharpFieldsEnum
}

export type ImageSharpEdge = {
  next?: Maybe<ImageSharp>
  node: ImageSharp
  previous?: Maybe<ImageSharp>
}

export type ImageSharpFieldsEnum =
  | "fixed___base64"
  | "fixed___tracedSVG"
  | "fixed___aspectRatio"
  | "fixed___width"
  | "fixed___height"
  | "fixed___src"
  | "fixed___srcSet"
  | "fixed___srcWebp"
  | "fixed___srcSetWebp"
  | "fixed___originalName"
  | "fluid___base64"
  | "fluid___tracedSVG"
  | "fluid___aspectRatio"
  | "fluid___src"
  | "fluid___srcSet"
  | "fluid___srcWebp"
  | "fluid___srcSetWebp"
  | "fluid___sizes"
  | "fluid___originalImg"
  | "fluid___originalName"
  | "fluid___presentationWidth"
  | "fluid___presentationHeight"
  | "gatsbyImageData"
  | "original___width"
  | "original___height"
  | "original___src"
  | "resize___src"
  | "resize___tracedSVG"
  | "resize___width"
  | "resize___height"
  | "resize___aspectRatio"
  | "resize___originalName"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type ImageSharpGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ImageSharpGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ImageSharpFieldsEnum
}

export type ImageSharpSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ImageSharpFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type ConsensusBountyHuntersCsvConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ConsensusBountyHuntersCsvEdge>
  nodes: Array<ConsensusBountyHuntersCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ConsensusBountyHuntersCsvGroupConnection>
}

export type ConsensusBountyHuntersCsvConnectionDistinctArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvConnectionMaxArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvConnectionMinArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvConnectionSumArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvEdge = {
  next?: Maybe<ConsensusBountyHuntersCsv>
  node: ConsensusBountyHuntersCsv
  previous?: Maybe<ConsensusBountyHuntersCsv>
}

export type ConsensusBountyHuntersCsvFieldsEnum =
  | "username"
  | "name"
  | "score"
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"

export type ConsensusBountyHuntersCsvGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ConsensusBountyHuntersCsvEdge>
  nodes: Array<ConsensusBountyHuntersCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ConsensusBountyHuntersCsvGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type ConsensusBountyHuntersCsvGroupConnectionDistinctArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvGroupConnectionMaxArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvGroupConnectionMinArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvGroupConnectionSumArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ConsensusBountyHuntersCsvFieldsEnum
}

export type ConsensusBountyHuntersCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ConsensusBountyHuntersCsvFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type WalletsCsvConnection = {
  totalCount: Scalars["Int"]
  edges: Array<WalletsCsvEdge>
  nodes: Array<WalletsCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<WalletsCsvGroupConnection>
}

export type WalletsCsvConnectionDistinctArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvConnectionMaxArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvConnectionMinArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvConnectionSumArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvEdge = {
  next?: Maybe<WalletsCsv>
  node: WalletsCsv
  previous?: Maybe<WalletsCsv>
}

export type WalletsCsvFieldsEnum =
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"
  | "name"
  | "url"
  | "brand_color"
  | "has_mobile"
  | "has_desktop"
  | "has_web"
  | "has_hardware"
  | "has_card_deposits"
  | "has_explore_dapps"
  | "has_defi_integrations"
  | "has_bank_withdrawals"
  | "has_limits_protection"
  | "has_high_volume_purchases"
  | "has_multisig"
  | "has_dex_integrations"

export type WalletsCsvGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<WalletsCsvEdge>
  nodes: Array<WalletsCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<WalletsCsvGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type WalletsCsvGroupConnectionDistinctArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvGroupConnectionMaxArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvGroupConnectionMinArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvGroupConnectionSumArgs = {
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: WalletsCsvFieldsEnum
}

export type WalletsCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<WalletsCsvFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type ExchangesByCountryCsvConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ExchangesByCountryCsvEdge>
  nodes: Array<ExchangesByCountryCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ExchangesByCountryCsvGroupConnection>
}

export type ExchangesByCountryCsvConnectionDistinctArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvConnectionMaxArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvConnectionMinArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvConnectionSumArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvEdge = {
  next?: Maybe<ExchangesByCountryCsv>
  node: ExchangesByCountryCsv
  previous?: Maybe<ExchangesByCountryCsv>
}

export type ExchangesByCountryCsvFieldsEnum =
  | "id"
  | "parent___id"
  | "parent___parent___id"
  | "parent___parent___parent___id"
  | "parent___parent___parent___children"
  | "parent___parent___children"
  | "parent___parent___children___id"
  | "parent___parent___children___children"
  | "parent___parent___internal___content"
  | "parent___parent___internal___contentDigest"
  | "parent___parent___internal___description"
  | "parent___parent___internal___fieldOwners"
  | "parent___parent___internal___ignoreType"
  | "parent___parent___internal___mediaType"
  | "parent___parent___internal___owner"
  | "parent___parent___internal___type"
  | "parent___children"
  | "parent___children___id"
  | "parent___children___parent___id"
  | "parent___children___parent___children"
  | "parent___children___children"
  | "parent___children___children___id"
  | "parent___children___children___children"
  | "parent___children___internal___content"
  | "parent___children___internal___contentDigest"
  | "parent___children___internal___description"
  | "parent___children___internal___fieldOwners"
  | "parent___children___internal___ignoreType"
  | "parent___children___internal___mediaType"
  | "parent___children___internal___owner"
  | "parent___children___internal___type"
  | "parent___internal___content"
  | "parent___internal___contentDigest"
  | "parent___internal___description"
  | "parent___internal___fieldOwners"
  | "parent___internal___ignoreType"
  | "parent___internal___mediaType"
  | "parent___internal___owner"
  | "parent___internal___type"
  | "children"
  | "children___id"
  | "children___parent___id"
  | "children___parent___parent___id"
  | "children___parent___parent___children"
  | "children___parent___children"
  | "children___parent___children___id"
  | "children___parent___children___children"
  | "children___parent___internal___content"
  | "children___parent___internal___contentDigest"
  | "children___parent___internal___description"
  | "children___parent___internal___fieldOwners"
  | "children___parent___internal___ignoreType"
  | "children___parent___internal___mediaType"
  | "children___parent___internal___owner"
  | "children___parent___internal___type"
  | "children___children"
  | "children___children___id"
  | "children___children___parent___id"
  | "children___children___parent___children"
  | "children___children___children"
  | "children___children___children___id"
  | "children___children___children___children"
  | "children___children___internal___content"
  | "children___children___internal___contentDigest"
  | "children___children___internal___description"
  | "children___children___internal___fieldOwners"
  | "children___children___internal___ignoreType"
  | "children___children___internal___mediaType"
  | "children___children___internal___owner"
  | "children___children___internal___type"
  | "children___internal___content"
  | "children___internal___contentDigest"
  | "children___internal___description"
  | "children___internal___fieldOwners"
  | "children___internal___ignoreType"
  | "children___internal___mediaType"
  | "children___internal___owner"
  | "children___internal___type"
  | "internal___content"
  | "internal___contentDigest"
  | "internal___description"
  | "internal___fieldOwners"
  | "internal___ignoreType"
  | "internal___mediaType"
  | "internal___owner"
  | "internal___type"
  | "country"
  | "coinmama"
  | "bittrex"
  | "simplex"
  | "wyre"
  | "moonpay"
  | "coinbase"
  | "kraken"
  | "gemini"
  | "binance"
  | "binanceus"
  | "bitbuy"
  | "rain"
  | "cryptocom"
  | "itezcom"
  | "coinspot"
  | "bitvavo"
  | "mtpelerin"
  | "wazirx"
  | "bitflyer"
  | "easycrypto"
  | "okx"
  | "kucoin"
  | "ftx"
  | "huobiglobal"
  | "gateio"
  | "bitfinex"
  | "bybit"
  | "bitkub"
  | "bitso"
  | "ftxus"

export type ExchangesByCountryCsvGroupConnection = {
  totalCount: Scalars["Int"]
  edges: Array<ExchangesByCountryCsvEdge>
  nodes: Array<ExchangesByCountryCsv>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  sum?: Maybe<Scalars["Float"]>
  group: Array<ExchangesByCountryCsvGroupConnection>
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type ExchangesByCountryCsvGroupConnectionDistinctArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvGroupConnectionMaxArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvGroupConnectionMinArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvGroupConnectionSumArgs = {
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars["Int"]>
  limit?: InputMaybe<Scalars["Int"]>
  field: ExchangesByCountryCsvFieldsEnum
}

export type ExchangesByCountryCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ExchangesByCountryCsvFieldsEnum>>>
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>
}

export type GatsbyImageSharpFixedFragment = {
  base64?: string | null
  width: number
  height: number
  src: string
  srcSet: string
}

export type GatsbyImageSharpFixed_TracedSvgFragment = {
  tracedSVG?: string | null
  width: number
  height: number
  src: string
  srcSet: string
}

export type GatsbyImageSharpFixed_WithWebpFragment = {
  base64?: string | null
  width: number
  height: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
}

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = {
  tracedSVG?: string | null
  width: number
  height: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
}

export type GatsbyImageSharpFixed_NoBase64Fragment = {
  width: number
  height: number
  src: string
  srcSet: string
}

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = {
  width: number
  height: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
}

export type GatsbyImageSharpFluidFragment = {
  base64?: string | null
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
}

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = {
  maxHeight: number
  maxWidth: number
}

export type GatsbyImageSharpFluid_TracedSvgFragment = {
  tracedSVG?: string | null
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
}

export type GatsbyImageSharpFluid_WithWebpFragment = {
  base64?: string | null
  aspectRatio: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
  sizes: string
}

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = {
  tracedSVG?: string | null
  aspectRatio: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
  sizes: string
}

export type GatsbyImageSharpFluid_NoBase64Fragment = {
  aspectRatio: number
  src: string
  srcSet: string
  sizes: string
}

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = {
  aspectRatio: number
  src: string
  srcSet: string
  srcWebp?: string | null
  srcSetWebp?: string | null
  sizes: string
}

export type GetAllMdxQueryVariables = Exact<{ [key: string]: never }>

export type GetAllMdxQuery = {
  allMdx: {
    edges: Array<{
      node: {
        fields?: {
          isOutdated?: boolean | null
          slug?: string | null
          relativePath?: string | null
        } | null
        frontmatter?: { lang?: string | null; template?: string | null } | null
      }
    }>
  }
}
