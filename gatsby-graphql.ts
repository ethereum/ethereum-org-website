export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type File = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  fields?: Maybe<FileFields>;
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>;
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>;
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>;
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>;
  /** Returns all children nodes filtered by type ConsensusBountyHuntersCsv */
  childrenConsensusBountyHuntersCsv?: Maybe<Array<Maybe<ConsensusBountyHuntersCsv>>>;
  /** Returns the first child node of type ConsensusBountyHuntersCsv or null if there are no children of given type on this node */
  childConsensusBountyHuntersCsv?: Maybe<ConsensusBountyHuntersCsv>;
  /** Returns all children nodes filtered by type ExecutionBountyHuntersCsv */
  childrenExecutionBountyHuntersCsv?: Maybe<Array<Maybe<ExecutionBountyHuntersCsv>>>;
  /** Returns the first child node of type ExecutionBountyHuntersCsv or null if there are no children of given type on this node */
  childExecutionBountyHuntersCsv?: Maybe<ExecutionBountyHuntersCsv>;
  /** Returns all children nodes filtered by type WalletsCsv */
  childrenWalletsCsv?: Maybe<Array<Maybe<WalletsCsv>>>;
  /** Returns the first child node of type WalletsCsv or null if there are no children of given type on this node */
  childWalletsCsv?: Maybe<WalletsCsv>;
  /** Returns all children nodes filtered by type QuarterJson */
  childrenQuarterJson?: Maybe<Array<Maybe<QuarterJson>>>;
  /** Returns the first child node of type QuarterJson or null if there are no children of given type on this node */
  childQuarterJson?: Maybe<QuarterJson>;
  /** Returns all children nodes filtered by type MonthJson */
  childrenMonthJson?: Maybe<Array<Maybe<MonthJson>>>;
  /** Returns the first child node of type MonthJson or null if there are no children of given type on this node */
  childMonthJson?: Maybe<MonthJson>;
  /** Returns all children nodes filtered by type Layer2Json */
  childrenLayer2Json?: Maybe<Array<Maybe<Layer2Json>>>;
  /** Returns the first child node of type Layer2Json or null if there are no children of given type on this node */
  childLayer2Json?: Maybe<Layer2Json>;
  /** Returns all children nodes filtered by type ExternalTutorialsJson */
  childrenExternalTutorialsJson?: Maybe<Array<Maybe<ExternalTutorialsJson>>>;
  /** Returns the first child node of type ExternalTutorialsJson or null if there are no children of given type on this node */
  childExternalTutorialsJson?: Maybe<ExternalTutorialsJson>;
  /** Returns all children nodes filtered by type ExchangesByCountryCsv */
  childrenExchangesByCountryCsv?: Maybe<Array<Maybe<ExchangesByCountryCsv>>>;
  /** Returns the first child node of type ExchangesByCountryCsv or null if there are no children of given type on this node */
  childExchangesByCountryCsv?: Maybe<ExchangesByCountryCsv>;
  /** Returns all children nodes filtered by type DataJson */
  childrenDataJson?: Maybe<Array<Maybe<DataJson>>>;
  /** Returns the first child node of type DataJson or null if there are no children of given type on this node */
  childDataJson?: Maybe<DataJson>;
  /** Returns all children nodes filtered by type CommunityMeetupsJson */
  childrenCommunityMeetupsJson?: Maybe<Array<Maybe<CommunityMeetupsJson>>>;
  /** Returns the first child node of type CommunityMeetupsJson or null if there are no children of given type on this node */
  childCommunityMeetupsJson?: Maybe<CommunityMeetupsJson>;
  /** Returns all children nodes filtered by type CommunityEventsJson */
  childrenCommunityEventsJson?: Maybe<Array<Maybe<CommunityEventsJson>>>;
  /** Returns the first child node of type CommunityEventsJson or null if there are no children of given type on this node */
  childCommunityEventsJson?: Maybe<CommunityEventsJson>;
  /** Returns all children nodes filtered by type CexLayer2SupportJson */
  childrenCexLayer2SupportJson?: Maybe<Array<Maybe<CexLayer2SupportJson>>>;
  /** Returns the first child node of type CexLayer2SupportJson or null if there are no children of given type on this node */
  childCexLayer2SupportJson?: Maybe<CexLayer2SupportJson>;
  /** Returns all children nodes filtered by type AlltimeJson */
  childrenAlltimeJson?: Maybe<Array<Maybe<AlltimeJson>>>;
  /** Returns the first child node of type AlltimeJson or null if there are no children of given type on this node */
  childAlltimeJson?: Maybe<AlltimeJson>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type Internal = {
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type FileFields = {
  gitLogLatestAuthorName?: Maybe<Scalars['String']>;
  gitLogLatestAuthorEmail?: Maybe<Scalars['String']>;
  gitLogLatestDate?: Maybe<Scalars['Date']>;
};


export type FileFieldsGitLogLatestDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type Directory = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type Site = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  port?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  flags?: Maybe<SiteFlags>;
  polyfill?: Maybe<Scalars['Boolean']>;
  pathPrefix?: Maybe<Scalars['String']>;
  jsxRuntime?: Maybe<Scalars['String']>;
  trailingSlash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SiteFlags = {
  FAST_DEV?: Maybe<Scalars['Boolean']>;
};

export type SiteSiteMetadata = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  defaultLanguage?: Maybe<Scalars['String']>;
  supportedLanguages?: Maybe<Array<Maybe<Scalars['String']>>>;
  editContentUrl?: Maybe<Scalars['String']>;
};

export type SiteFunction = Node & {
  functionRoute: Scalars['String'];
  pluginName: Scalars['String'];
  originalAbsoluteFilePath: Scalars['String'];
  originalRelativeFilePath: Scalars['String'];
  relativeCompiledFilePath: Scalars['String'];
  absoluteCompiledFilePath: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePage = Node & {
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  pageContext?: Maybe<Scalars['JSON']>;
  pluginCreator?: Maybe<SitePlugin>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SitePlugin = Node & {
  resolve?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<Scalars['JSON']>;
  packageJson?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type SiteBuildMetadata = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type MdxFrontmatter = {
  title: Scalars['String'];
};

export type MdxHeadingMdx = {
  value?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
};

export type HeadingsMdx =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type MdxWordCount = {
  paragraphs?: Maybe<Scalars['Int']>;
  sentences?: Maybe<Scalars['Int']>;
  words?: Maybe<Scalars['Int']>;
};

export type Mdx = Node & {
  rawBody: Scalars['String'];
  fileAbsolutePath: Scalars['String'];
  frontmatter?: Maybe<Frontmatter>;
  slug?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  excerpt: Scalars['String'];
  headings?: Maybe<Array<Maybe<MdxHeadingMdx>>>;
  html?: Maybe<Scalars['String']>;
  mdxAST?: Maybe<Scalars['JSON']>;
  tableOfContents?: Maybe<Scalars['JSON']>;
  timeToRead?: Maybe<Scalars['Int']>;
  wordCount?: Maybe<MdxWordCount>;
  fields?: Maybe<MdxFields>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type MdxExcerptArgs = {
  pruneLength?: InputMaybe<Scalars['Int']>;
  truncate?: InputMaybe<Scalars['Boolean']>;
};


export type MdxHeadingsArgs = {
  depth?: InputMaybe<HeadingsMdx>;
};


export type MdxTableOfContentsArgs = {
  maxDepth?: InputMaybe<Scalars['Int']>;
};

export type MdxFields = {
  readingTime?: Maybe<MdxFieldsReadingTime>;
  isOutdated?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};

export type MdxFieldsReadingTime = {
  text?: Maybe<Scalars['String']>;
  minutes?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Int']>;
  words?: Maybe<Scalars['Int']>;
};

export type GatsbyImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type GatsbyImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type GatsbyImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type ImageFormat =
  | 'NO_CHANGE'
  | 'AUTO'
  | 'JPG'
  | 'PNG'
  | 'WEBP'
  | 'AVIF';

export type ImageFit =
  | 'COVER'
  | 'CONTAIN'
  | 'FILL'
  | 'INSIDE'
  | 'OUTSIDE';

export type ImageLayout =
  | 'FIXED'
  | 'FULL_WIDTH'
  | 'CONSTRAINED';

export type ImageCropFocus =
  | 'CENTER'
  | 'NORTH'
  | 'NORTHEAST'
  | 'EAST'
  | 'SOUTHEAST'
  | 'SOUTH'
  | 'SOUTHWEST'
  | 'WEST'
  | 'NORTHWEST'
  | 'ENTROPY'
  | 'ATTENTION';

export type DuotoneGradient = {
  highlight: Scalars['String'];
  shadow: Scalars['String'];
  opacity?: InputMaybe<Scalars['Int']>;
};

export type PotraceTurnPolicy =
  | 'TURNPOLICY_BLACK'
  | 'TURNPOLICY_WHITE'
  | 'TURNPOLICY_LEFT'
  | 'TURNPOLICY_RIGHT'
  | 'TURNPOLICY_MINORITY'
  | 'TURNPOLICY_MAJORITY';

export type Potrace = {
  turnPolicy?: InputMaybe<PotraceTurnPolicy>;
  turdSize?: InputMaybe<Scalars['Float']>;
  alphaMax?: InputMaybe<Scalars['Float']>;
  optCurve?: InputMaybe<Scalars['Boolean']>;
  optTolerance?: InputMaybe<Scalars['Float']>;
  threshold?: InputMaybe<Scalars['Int']>;
  blackOnWhite?: InputMaybe<Scalars['Boolean']>;
  color?: InputMaybe<Scalars['String']>;
  background?: InputMaybe<Scalars['String']>;
};

export type ImageSharp = Node & {
  fixed?: Maybe<ImageSharpFixed>;
  fluid?: Maybe<ImageSharpFluid>;
  gatsbyImageData: Scalars['JSON'];
  original?: Maybe<ImageSharpOriginal>;
  resize?: Maybe<ImageSharpResize>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ImageSharpFixedArgs = {
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  traceSVG?: InputMaybe<Potrace>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
};


export type ImageSharpFluidArgs = {
  maxWidth?: InputMaybe<Scalars['Int']>;
  maxHeight?: InputMaybe<Scalars['Int']>;
  base64Width?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  duotone?: InputMaybe<DuotoneGradient>;
  traceSVG?: InputMaybe<Potrace>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  toFormat?: InputMaybe<ImageFormat>;
  toFormatBase64?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
  sizes?: InputMaybe<Scalars['String']>;
  srcSetBreakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};


export type ImageSharpGatsbyImageDataArgs = {
  layout?: InputMaybe<ImageLayout>;
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  aspectRatio?: InputMaybe<Scalars['Float']>;
  placeholder?: InputMaybe<ImagePlaceholder>;
  blurredOptions?: InputMaybe<BlurredOptions>;
  tracedSVGOptions?: InputMaybe<Potrace>;
  formats?: InputMaybe<Array<InputMaybe<ImageFormat>>>;
  outputPixelDensities?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  breakpoints?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sizes?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['Int']>;
  jpgOptions?: InputMaybe<JpgOptions>;
  pngOptions?: InputMaybe<PngOptions>;
  webpOptions?: InputMaybe<WebPOptions>;
  avifOptions?: InputMaybe<AvifOptions>;
  transformOptions?: InputMaybe<TransformOptions>;
  backgroundColor?: InputMaybe<Scalars['String']>;
};


export type ImageSharpResizeArgs = {
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  jpegQuality?: InputMaybe<Scalars['Int']>;
  pngQuality?: InputMaybe<Scalars['Int']>;
  webpQuality?: InputMaybe<Scalars['Int']>;
  jpegProgressive?: InputMaybe<Scalars['Boolean']>;
  pngCompressionLevel?: InputMaybe<Scalars['Int']>;
  pngCompressionSpeed?: InputMaybe<Scalars['Int']>;
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  base64?: InputMaybe<Scalars['Boolean']>;
  traceSVG?: InputMaybe<Potrace>;
  toFormat?: InputMaybe<ImageFormat>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
  background?: InputMaybe<Scalars['String']>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
};

export type ImageSharpFixed = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
};

export type ImageSharpFluid = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  presentationWidth: Scalars['Int'];
  presentationHeight: Scalars['Int'];
};

export type ImagePlaceholder =
  | 'DOMINANT_COLOR'
  | 'TRACED_SVG'
  | 'BLURRED'
  | 'NONE';

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width?: InputMaybe<Scalars['Int']>;
  /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
  toFormat?: InputMaybe<ImageFormat>;
};

export type JpgOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  progressive?: InputMaybe<Scalars['Boolean']>;
};

export type PngOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  compressionSpeed?: InputMaybe<Scalars['Int']>;
};

export type WebPOptions = {
  quality?: InputMaybe<Scalars['Int']>;
};

export type AvifOptions = {
  quality?: InputMaybe<Scalars['Int']>;
  lossless?: InputMaybe<Scalars['Boolean']>;
  speed?: InputMaybe<Scalars['Int']>;
};

export type TransformOptions = {
  grayscale?: InputMaybe<Scalars['Boolean']>;
  duotone?: InputMaybe<DuotoneGradient>;
  rotate?: InputMaybe<Scalars['Int']>;
  trim?: InputMaybe<Scalars['Float']>;
  cropFocus?: InputMaybe<ImageCropFocus>;
  fit?: InputMaybe<ImageFit>;
};

export type ImageSharpOriginal = {
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
};

export type ImageSharpResize = {
  src?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  originalName?: Maybe<Scalars['String']>;
};

export type Frontmatter = {
  sidebar?: Maybe<Scalars['Boolean']>;
  sidebarDepth?: Maybe<Scalars['Int']>;
  incomplete?: Maybe<Scalars['Boolean']>;
  template?: Maybe<Scalars['String']>;
  summaryPoint1: Scalars['String'];
  summaryPoint2: Scalars['String'];
  summaryPoint3: Scalars['String'];
  summaryPoint4: Scalars['String'];
  position?: Maybe<Scalars['String']>;
  compensation?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  skill?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['String']>;
  sourceUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  isOutdated?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  image?: Maybe<File>;
  alt?: Maybe<Scalars['String']>;
  summaryPoints?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ConsensusBountyHuntersCsv = Node & {
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type ExecutionBountyHuntersCsv = Node & {
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type WalletsCsv = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  brand_color?: Maybe<Scalars['String']>;
  has_mobile?: Maybe<Scalars['String']>;
  has_desktop?: Maybe<Scalars['String']>;
  has_web?: Maybe<Scalars['String']>;
  has_hardware?: Maybe<Scalars['String']>;
  has_card_deposits?: Maybe<Scalars['String']>;
  has_explore_dapps?: Maybe<Scalars['String']>;
  has_defi_integrations?: Maybe<Scalars['String']>;
  has_bank_withdrawals?: Maybe<Scalars['String']>;
  has_limits_protection?: Maybe<Scalars['String']>;
  has_high_volume_purchases?: Maybe<Scalars['String']>;
  has_multisig?: Maybe<Scalars['String']>;
  has_dex_integrations?: Maybe<Scalars['String']>;
};

export type QuarterJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  dateRange?: Maybe<QuarterJsonDateRange>;
  currency?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['String']>;
  totalCosts?: Maybe<Scalars['Int']>;
  totalTMSavings?: Maybe<Scalars['Int']>;
  totalPreTranslated?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<QuarterJsonData>>>;
};

export type QuarterJsonDateRange = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};


export type QuarterJsonDateRangeFromArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type QuarterJsonDateRangeToArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type QuarterJsonData = {
  user?: Maybe<QuarterJsonDataUser>;
  languages?: Maybe<Array<Maybe<QuarterJsonDataLanguages>>>;
};

export type QuarterJsonDataUser = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  userRole?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  preTranslated?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguages = {
  language?: Maybe<QuarterJsonDataLanguagesLanguage>;
  translated?: Maybe<QuarterJsonDataLanguagesTranslated>;
  targetTranslated?: Maybe<QuarterJsonDataLanguagesTargetTranslated>;
  translatedByMt?: Maybe<QuarterJsonDataLanguagesTranslatedByMt>;
  approved?: Maybe<QuarterJsonDataLanguagesApproved>;
  translationCosts?: Maybe<QuarterJsonDataLanguagesTranslationCosts>;
  approvalCosts?: Maybe<QuarterJsonDataLanguagesApprovalCosts>;
};

export type QuarterJsonDataLanguagesLanguage = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tmSavings?: Maybe<Scalars['Int']>;
  preTranslate?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesTargetTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesTranslatedByMt = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesApproved = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesTranslationCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type QuarterJsonDataLanguagesApprovalCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  dateRange?: Maybe<MonthJsonDateRange>;
  currency?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['String']>;
  totalCosts?: Maybe<Scalars['Int']>;
  totalTMSavings?: Maybe<Scalars['Int']>;
  totalPreTranslated?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<MonthJsonData>>>;
};

export type MonthJsonDateRange = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};


export type MonthJsonDateRangeFromArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type MonthJsonDateRangeToArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type MonthJsonData = {
  user?: Maybe<MonthJsonDataUser>;
  languages?: Maybe<Array<Maybe<MonthJsonDataLanguages>>>;
};

export type MonthJsonDataUser = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  userRole?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  preTranslated?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguages = {
  language?: Maybe<MonthJsonDataLanguagesLanguage>;
  translated?: Maybe<MonthJsonDataLanguagesTranslated>;
  targetTranslated?: Maybe<MonthJsonDataLanguagesTargetTranslated>;
  translatedByMt?: Maybe<MonthJsonDataLanguagesTranslatedByMt>;
  approved?: Maybe<MonthJsonDataLanguagesApproved>;
  translationCosts?: Maybe<MonthJsonDataLanguagesTranslationCosts>;
  approvalCosts?: Maybe<MonthJsonDataLanguagesApprovalCosts>;
};

export type MonthJsonDataLanguagesLanguage = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tmSavings?: Maybe<Scalars['Int']>;
  preTranslate?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesTargetTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesTranslatedByMt = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesApproved = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesTranslationCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type MonthJsonDataLanguagesApprovalCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Layer2Json = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  optimistic?: Maybe<Array<Maybe<Layer2JsonOptimistic>>>;
  zk?: Maybe<Array<Maybe<Layer2JsonZk>>>;
};

export type Layer2JsonOptimistic = {
  name?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  developerDocs?: Maybe<Scalars['String']>;
  l2beat?: Maybe<Scalars['String']>;
  bridge?: Maybe<Scalars['String']>;
  bridgeWallets?: Maybe<Array<Maybe<Scalars['String']>>>;
  blockExplorer?: Maybe<Scalars['String']>;
  ecosystemPortal?: Maybe<Scalars['String']>;
  tokenLists?: Maybe<Scalars['String']>;
  noteKey?: Maybe<Scalars['String']>;
  purpose?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
};

export type Layer2JsonZk = {
  name?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  developerDocs?: Maybe<Scalars['String']>;
  l2beat?: Maybe<Scalars['String']>;
  bridge?: Maybe<Scalars['String']>;
  bridgeWallets?: Maybe<Array<Maybe<Scalars['String']>>>;
  blockExplorer?: Maybe<Scalars['String']>;
  ecosystemPortal?: Maybe<Scalars['String']>;
  tokenLists?: Maybe<Scalars['String']>;
  noteKey?: Maybe<Scalars['String']>;
  purpose?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
};

export type ExternalTutorialsJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  authorGithub?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  skillLevel?: Maybe<Scalars['String']>;
  timeToRead?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
  publishDate?: Maybe<Scalars['String']>;
};

export type ExchangesByCountryCsv = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  country?: Maybe<Scalars['String']>;
  coinmama?: Maybe<Scalars['String']>;
  bittrex?: Maybe<Scalars['String']>;
  simplex?: Maybe<Scalars['String']>;
  wyre?: Maybe<Scalars['String']>;
  moonpay?: Maybe<Scalars['String']>;
  coinbase?: Maybe<Scalars['String']>;
  kraken?: Maybe<Scalars['String']>;
  gemini?: Maybe<Scalars['String']>;
  binance?: Maybe<Scalars['String']>;
  binanceus?: Maybe<Scalars['String']>;
  bitbuy?: Maybe<Scalars['String']>;
  rain?: Maybe<Scalars['String']>;
  cryptocom?: Maybe<Scalars['String']>;
  itezcom?: Maybe<Scalars['String']>;
  coinspot?: Maybe<Scalars['String']>;
  bitvavo?: Maybe<Scalars['String']>;
  mtpelerin?: Maybe<Scalars['String']>;
  wazirx?: Maybe<Scalars['String']>;
  bitflyer?: Maybe<Scalars['String']>;
  easycrypto?: Maybe<Scalars['String']>;
  okx?: Maybe<Scalars['String']>;
  kucoin?: Maybe<Scalars['String']>;
  ftx?: Maybe<Scalars['String']>;
  huobiglobal?: Maybe<Scalars['String']>;
  gateio?: Maybe<Scalars['String']>;
  bitfinex?: Maybe<Scalars['String']>;
  bybit?: Maybe<Scalars['String']>;
  bitkub?: Maybe<Scalars['String']>;
  bitso?: Maybe<Scalars['String']>;
  ftxus?: Maybe<Scalars['String']>;
};

export type DataJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  files?: Maybe<Array<Maybe<Scalars['String']>>>;
  imageSize?: Maybe<Scalars['Int']>;
  commit?: Maybe<Scalars['Boolean']>;
  contributors?: Maybe<Array<Maybe<DataJsonContributors>>>;
  contributorsPerLine?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  projectOwner?: Maybe<Scalars['String']>;
  repoType?: Maybe<Scalars['String']>;
  repoHost?: Maybe<Scalars['String']>;
  skipCi?: Maybe<Scalars['Boolean']>;
  nodeTools?: Maybe<Array<Maybe<DataJsonNodeTools>>>;
  keyGen?: Maybe<Array<Maybe<DataJsonKeyGen>>>;
  saas?: Maybe<Array<Maybe<DataJsonSaas>>>;
  pools?: Maybe<Array<Maybe<DataJsonPools>>>;
};

export type DataJsonContributors = {
  login?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  avatar_url?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  contributions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type DataJsonNodeTools = {
  name?: Maybe<Scalars['String']>;
  svgPath?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  launchDate?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  audits?: Maybe<Array<Maybe<DataJsonNodeToolsAudits>>>;
  minEth?: Maybe<Scalars['Int']>;
  additionalStake?: Maybe<Scalars['String']>;
  additionalStakeUnit?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<Maybe<DataJsonNodeToolsTokens>>>;
  isFoss?: Maybe<Scalars['Boolean']>;
  hasBugBounty?: Maybe<Scalars['Boolean']>;
  isTrustless?: Maybe<Scalars['Boolean']>;
  isPermissionless?: Maybe<Scalars['Boolean']>;
  multiClient?: Maybe<Scalars['Boolean']>;
  easyClientSwitching?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  ui?: Maybe<Array<Maybe<Scalars['String']>>>;
  socials?: Maybe<DataJsonNodeToolsSocials>;
  matomo?: Maybe<DataJsonNodeToolsMatomo>;
};


export type DataJsonNodeToolsLaunchDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonNodeToolsAudits = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type DataJsonNodeToolsTokens = {
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type DataJsonNodeToolsSocials = {
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
};

export type DataJsonNodeToolsMatomo = {
  eventCategory?: Maybe<Scalars['String']>;
  eventAction?: Maybe<Scalars['String']>;
  eventName?: Maybe<Scalars['String']>;
};

export type DataJsonKeyGen = {
  name?: Maybe<Scalars['String']>;
  svgPath?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  launchDate?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  audits?: Maybe<Array<Maybe<DataJsonKeyGenAudits>>>;
  isFoss?: Maybe<Scalars['Boolean']>;
  hasBugBounty?: Maybe<Scalars['Boolean']>;
  isTrustless?: Maybe<Scalars['Boolean']>;
  isPermissionless?: Maybe<Scalars['Boolean']>;
  isSelfCustody?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  ui?: Maybe<Array<Maybe<Scalars['String']>>>;
  socials?: Maybe<DataJsonKeyGenSocials>;
  matomo?: Maybe<DataJsonKeyGenMatomo>;
};


export type DataJsonKeyGenLaunchDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonKeyGenAudits = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type DataJsonKeyGenSocials = {
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
};

export type DataJsonKeyGenMatomo = {
  eventCategory?: Maybe<Scalars['String']>;
  eventAction?: Maybe<Scalars['String']>;
  eventName?: Maybe<Scalars['String']>;
};

export type DataJsonSaas = {
  name?: Maybe<Scalars['String']>;
  svgPath?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  launchDate?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  audits?: Maybe<Array<Maybe<DataJsonSaasAudits>>>;
  minEth?: Maybe<Scalars['Int']>;
  additionalStake?: Maybe<Scalars['String']>;
  additionalStakeUnit?: Maybe<Scalars['String']>;
  monthlyFee?: Maybe<Scalars['Int']>;
  monthlyFeeUnit?: Maybe<Scalars['String']>;
  isFoss?: Maybe<Scalars['Boolean']>;
  hasBugBounty?: Maybe<Scalars['Boolean']>;
  isTrustless?: Maybe<Scalars['Boolean']>;
  isPermissionless?: Maybe<Scalars['Boolean']>;
  pctMajorityClient?: Maybe<Scalars['Float']>;
  isSelfCustody?: Maybe<Scalars['Boolean']>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  ui?: Maybe<Array<Maybe<Scalars['String']>>>;
  socials?: Maybe<DataJsonSaasSocials>;
  matomo?: Maybe<DataJsonSaasMatomo>;
};


export type DataJsonSaasLaunchDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonSaasAudits = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
};


export type DataJsonSaasAuditsDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonSaasSocials = {
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
};

export type DataJsonSaasMatomo = {
  eventCategory?: Maybe<Scalars['String']>;
  eventAction?: Maybe<Scalars['String']>;
  eventName?: Maybe<Scalars['String']>;
};

export type DataJsonPools = {
  name?: Maybe<Scalars['String']>;
  svgPath?: Maybe<Scalars['String']>;
  hue?: Maybe<Scalars['Int']>;
  launchDate?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  audits?: Maybe<Array<Maybe<DataJsonPoolsAudits>>>;
  minEth?: Maybe<Scalars['Float']>;
  feePercentage?: Maybe<Scalars['Int']>;
  tokens?: Maybe<Array<Maybe<DataJsonPoolsTokens>>>;
  isFoss?: Maybe<Scalars['Boolean']>;
  hasBugBounty?: Maybe<Scalars['Boolean']>;
  isTrustless?: Maybe<Scalars['Boolean']>;
  hasPermissionlessNodes?: Maybe<Scalars['Boolean']>;
  pctMajorityClient?: Maybe<Scalars['Float']>;
  platforms?: Maybe<Array<Maybe<Scalars['String']>>>;
  ui?: Maybe<Array<Maybe<Scalars['String']>>>;
  socials?: Maybe<DataJsonPoolsSocials>;
  matomo?: Maybe<DataJsonPoolsMatomo>;
  twitter?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
};


export type DataJsonPoolsLaunchDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonPoolsAudits = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
};


export type DataJsonPoolsAuditsDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type DataJsonPoolsTokens = {
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
};

export type DataJsonPoolsSocials = {
  discord?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  telegram?: Maybe<Scalars['String']>;
  reddit?: Maybe<Scalars['String']>;
};

export type DataJsonPoolsMatomo = {
  eventCategory?: Maybe<Scalars['String']>;
  eventAction?: Maybe<Scalars['String']>;
  eventName?: Maybe<Scalars['String']>;
};

export type CommunityMeetupsJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  title?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type CommunityEventsJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  title?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  sponsor?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
};


export type CommunityEventsJsonStartDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type CommunityEventsJsonEndDateArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type CexLayer2SupportJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  supports_withdrawals?: Maybe<Array<Maybe<Scalars['String']>>>;
  supports_deposits?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
};

export type AlltimeJson = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  dateRange?: Maybe<AlltimeJsonDateRange>;
  currency?: Maybe<Scalars['String']>;
  mode?: Maybe<Scalars['String']>;
  totalCosts?: Maybe<Scalars['Int']>;
  totalTMSavings?: Maybe<Scalars['Int']>;
  totalPreTranslated?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<AlltimeJsonData>>>;
};

export type AlltimeJsonDateRange = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};


export type AlltimeJsonDateRangeFromArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};


export type AlltimeJsonDateRangeToArgs = {
  formatString?: InputMaybe<Scalars['String']>;
  fromNow?: InputMaybe<Scalars['Boolean']>;
  difference?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type AlltimeJsonData = {
  user?: Maybe<AlltimeJsonDataUser>;
  languages?: Maybe<Array<Maybe<AlltimeJsonDataLanguages>>>;
};

export type AlltimeJsonDataUser = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  userRole?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  preTranslated?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguages = {
  language?: Maybe<AlltimeJsonDataLanguagesLanguage>;
  translated?: Maybe<AlltimeJsonDataLanguagesTranslated>;
  targetTranslated?: Maybe<AlltimeJsonDataLanguagesTargetTranslated>;
  translatedByMt?: Maybe<AlltimeJsonDataLanguagesTranslatedByMt>;
  approved?: Maybe<AlltimeJsonDataLanguagesApproved>;
  translationCosts?: Maybe<AlltimeJsonDataLanguagesTranslationCosts>;
  approvalCosts?: Maybe<AlltimeJsonDataLanguagesApprovalCosts>;
};

export type AlltimeJsonDataLanguagesLanguage = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tmSavings?: Maybe<Scalars['Int']>;
  preTranslate?: Maybe<Scalars['Int']>;
  totalCosts?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesTargetTranslated = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesTranslatedByMt = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesApproved = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesTranslationCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type AlltimeJsonDataLanguagesApprovalCosts = {
  tmMatch?: Maybe<Scalars['Int']>;
  default?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type Query = {
  file?: Maybe<File>;
  allFile: FileConnection;
  directory?: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site?: Maybe<Site>;
  allSite: SiteConnection;
  siteFunction?: Maybe<SiteFunction>;
  allSiteFunction: SiteFunctionConnection;
  sitePage?: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  sitePlugin?: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  mdx?: Maybe<Mdx>;
  allMdx: MdxConnection;
  imageSharp?: Maybe<ImageSharp>;
  allImageSharp: ImageSharpConnection;
  consensusBountyHuntersCsv?: Maybe<ConsensusBountyHuntersCsv>;
  allConsensusBountyHuntersCsv: ConsensusBountyHuntersCsvConnection;
  executionBountyHuntersCsv?: Maybe<ExecutionBountyHuntersCsv>;
  allExecutionBountyHuntersCsv: ExecutionBountyHuntersCsvConnection;
  walletsCsv?: Maybe<WalletsCsv>;
  allWalletsCsv: WalletsCsvConnection;
  quarterJson?: Maybe<QuarterJson>;
  allQuarterJson: QuarterJsonConnection;
  monthJson?: Maybe<MonthJson>;
  allMonthJson: MonthJsonConnection;
  layer2Json?: Maybe<Layer2Json>;
  allLayer2Json: Layer2JsonConnection;
  externalTutorialsJson?: Maybe<ExternalTutorialsJson>;
  allExternalTutorialsJson: ExternalTutorialsJsonConnection;
  exchangesByCountryCsv?: Maybe<ExchangesByCountryCsv>;
  allExchangesByCountryCsv: ExchangesByCountryCsvConnection;
  dataJson?: Maybe<DataJson>;
  allDataJson: DataJsonConnection;
  communityMeetupsJson?: Maybe<CommunityMeetupsJson>;
  allCommunityMeetupsJson: CommunityMeetupsJsonConnection;
  communityEventsJson?: Maybe<CommunityEventsJson>;
  allCommunityEventsJson: CommunityEventsJsonConnection;
  cexLayer2SupportJson?: Maybe<CexLayer2SupportJson>;
  allCexLayer2SupportJson: CexLayer2SupportJsonConnection;
  alltimeJson?: Maybe<AlltimeJson>;
  allAlltimeJson: AlltimeJsonConnection;
};


export type QueryFileArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  fields?: InputMaybe<FileFieldsFilterInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenMdx?: InputMaybe<MdxFilterListInput>;
  childMdx?: InputMaybe<MdxFilterInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  childrenConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterListInput>;
  childConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>;
  childrenExecutionBountyHuntersCsv?: InputMaybe<ExecutionBountyHuntersCsvFilterListInput>;
  childExecutionBountyHuntersCsv?: InputMaybe<ExecutionBountyHuntersCsvFilterInput>;
  childrenWalletsCsv?: InputMaybe<WalletsCsvFilterListInput>;
  childWalletsCsv?: InputMaybe<WalletsCsvFilterInput>;
  childrenQuarterJson?: InputMaybe<QuarterJsonFilterListInput>;
  childQuarterJson?: InputMaybe<QuarterJsonFilterInput>;
  childrenMonthJson?: InputMaybe<MonthJsonFilterListInput>;
  childMonthJson?: InputMaybe<MonthJsonFilterInput>;
  childrenLayer2Json?: InputMaybe<Layer2JsonFilterListInput>;
  childLayer2Json?: InputMaybe<Layer2JsonFilterInput>;
  childrenExternalTutorialsJson?: InputMaybe<ExternalTutorialsJsonFilterListInput>;
  childExternalTutorialsJson?: InputMaybe<ExternalTutorialsJsonFilterInput>;
  childrenExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterListInput>;
  childExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterInput>;
  childrenDataJson?: InputMaybe<DataJsonFilterListInput>;
  childDataJson?: InputMaybe<DataJsonFilterInput>;
  childrenCommunityMeetupsJson?: InputMaybe<CommunityMeetupsJsonFilterListInput>;
  childCommunityMeetupsJson?: InputMaybe<CommunityMeetupsJsonFilterInput>;
  childrenCommunityEventsJson?: InputMaybe<CommunityEventsJsonFilterListInput>;
  childCommunityEventsJson?: InputMaybe<CommunityEventsJsonFilterInput>;
  childrenCexLayer2SupportJson?: InputMaybe<CexLayer2SupportJsonFilterListInput>;
  childCexLayer2SupportJson?: InputMaybe<CexLayer2SupportJsonFilterInput>;
  childrenAlltimeJson?: InputMaybe<AlltimeJsonFilterListInput>;
  childAlltimeJson?: InputMaybe<AlltimeJsonFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter?: InputMaybe<FileFilterInput>;
  sort?: InputMaybe<FileSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter?: InputMaybe<DirectoryFilterInput>;
  sort?: InputMaybe<DirectorySortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  flags?: InputMaybe<SiteFlagsFilterInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter?: InputMaybe<SiteFilterInput>;
  sort?: InputMaybe<SiteSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteFunctionArgs = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteFunctionArgs = {
  filter?: InputMaybe<SiteFunctionFilterInput>;
  sort?: InputMaybe<SiteFunctionSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSitePageArgs = {
  filter?: InputMaybe<SitePageFilterInput>;
  sort?: InputMaybe<SitePageSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter?: InputMaybe<SitePluginFilterInput>;
  sort?: InputMaybe<SitePluginSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: InputMaybe<SiteBuildMetadataFilterInput>;
  sort?: InputMaybe<SiteBuildMetadataSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryMdxArgs = {
  rawBody?: InputMaybe<StringQueryOperatorInput>;
  fileAbsolutePath?: InputMaybe<StringQueryOperatorInput>;
  frontmatter?: InputMaybe<FrontmatterFilterInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  body?: InputMaybe<StringQueryOperatorInput>;
  excerpt?: InputMaybe<StringQueryOperatorInput>;
  headings?: InputMaybe<MdxHeadingMdxFilterListInput>;
  html?: InputMaybe<StringQueryOperatorInput>;
  mdxAST?: InputMaybe<JsonQueryOperatorInput>;
  tableOfContents?: InputMaybe<JsonQueryOperatorInput>;
  timeToRead?: InputMaybe<IntQueryOperatorInput>;
  wordCount?: InputMaybe<MdxWordCountFilterInput>;
  fields?: InputMaybe<MdxFieldsFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllMdxArgs = {
  filter?: InputMaybe<MdxFilterInput>;
  sort?: InputMaybe<MdxSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryImageSharpArgs = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<JsonQueryOperatorInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllImageSharpArgs = {
  filter?: InputMaybe<ImageSharpFilterInput>;
  sort?: InputMaybe<ImageSharpSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryConsensusBountyHuntersCsvArgs = {
  username?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  score?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllConsensusBountyHuntersCsvArgs = {
  filter?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>;
  sort?: InputMaybe<ConsensusBountyHuntersCsvSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryExecutionBountyHuntersCsvArgs = {
  username?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  score?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};


export type QueryAllExecutionBountyHuntersCsvArgs = {
  filter?: InputMaybe<ExecutionBountyHuntersCsvFilterInput>;
  sort?: InputMaybe<ExecutionBountyHuntersCsvSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryWalletsCsvArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  brand_color?: InputMaybe<StringQueryOperatorInput>;
  has_mobile?: InputMaybe<StringQueryOperatorInput>;
  has_desktop?: InputMaybe<StringQueryOperatorInput>;
  has_web?: InputMaybe<StringQueryOperatorInput>;
  has_hardware?: InputMaybe<StringQueryOperatorInput>;
  has_card_deposits?: InputMaybe<StringQueryOperatorInput>;
  has_explore_dapps?: InputMaybe<StringQueryOperatorInput>;
  has_defi_integrations?: InputMaybe<StringQueryOperatorInput>;
  has_bank_withdrawals?: InputMaybe<StringQueryOperatorInput>;
  has_limits_protection?: InputMaybe<StringQueryOperatorInput>;
  has_high_volume_purchases?: InputMaybe<StringQueryOperatorInput>;
  has_multisig?: InputMaybe<StringQueryOperatorInput>;
  has_dex_integrations?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllWalletsCsvArgs = {
  filter?: InputMaybe<WalletsCsvFilterInput>;
  sort?: InputMaybe<WalletsCsvSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryQuarterJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<QuarterJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<QuarterJsonDataFilterListInput>;
};


export type QueryAllQuarterJsonArgs = {
  filter?: InputMaybe<QuarterJsonFilterInput>;
  sort?: InputMaybe<QuarterJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryMonthJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<MonthJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<MonthJsonDataFilterListInput>;
};


export type QueryAllMonthJsonArgs = {
  filter?: InputMaybe<MonthJsonFilterInput>;
  sort?: InputMaybe<MonthJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryLayer2JsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  optimistic?: InputMaybe<Layer2JsonOptimisticFilterListInput>;
  zk?: InputMaybe<Layer2JsonZkFilterListInput>;
};


export type QueryAllLayer2JsonArgs = {
  filter?: InputMaybe<Layer2JsonFilterInput>;
  sort?: InputMaybe<Layer2JsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryExternalTutorialsJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  author?: InputMaybe<StringQueryOperatorInput>;
  authorGithub?: InputMaybe<StringQueryOperatorInput>;
  tags?: InputMaybe<StringQueryOperatorInput>;
  skillLevel?: InputMaybe<StringQueryOperatorInput>;
  timeToRead?: InputMaybe<StringQueryOperatorInput>;
  lang?: InputMaybe<StringQueryOperatorInput>;
  publishDate?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllExternalTutorialsJsonArgs = {
  filter?: InputMaybe<ExternalTutorialsJsonFilterInput>;
  sort?: InputMaybe<ExternalTutorialsJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryExchangesByCountryCsvArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  country?: InputMaybe<StringQueryOperatorInput>;
  coinmama?: InputMaybe<StringQueryOperatorInput>;
  bittrex?: InputMaybe<StringQueryOperatorInput>;
  simplex?: InputMaybe<StringQueryOperatorInput>;
  wyre?: InputMaybe<StringQueryOperatorInput>;
  moonpay?: InputMaybe<StringQueryOperatorInput>;
  coinbase?: InputMaybe<StringQueryOperatorInput>;
  kraken?: InputMaybe<StringQueryOperatorInput>;
  gemini?: InputMaybe<StringQueryOperatorInput>;
  binance?: InputMaybe<StringQueryOperatorInput>;
  binanceus?: InputMaybe<StringQueryOperatorInput>;
  bitbuy?: InputMaybe<StringQueryOperatorInput>;
  rain?: InputMaybe<StringQueryOperatorInput>;
  cryptocom?: InputMaybe<StringQueryOperatorInput>;
  itezcom?: InputMaybe<StringQueryOperatorInput>;
  coinspot?: InputMaybe<StringQueryOperatorInput>;
  bitvavo?: InputMaybe<StringQueryOperatorInput>;
  mtpelerin?: InputMaybe<StringQueryOperatorInput>;
  wazirx?: InputMaybe<StringQueryOperatorInput>;
  bitflyer?: InputMaybe<StringQueryOperatorInput>;
  easycrypto?: InputMaybe<StringQueryOperatorInput>;
  okx?: InputMaybe<StringQueryOperatorInput>;
  kucoin?: InputMaybe<StringQueryOperatorInput>;
  ftx?: InputMaybe<StringQueryOperatorInput>;
  huobiglobal?: InputMaybe<StringQueryOperatorInput>;
  gateio?: InputMaybe<StringQueryOperatorInput>;
  bitfinex?: InputMaybe<StringQueryOperatorInput>;
  bybit?: InputMaybe<StringQueryOperatorInput>;
  bitkub?: InputMaybe<StringQueryOperatorInput>;
  bitso?: InputMaybe<StringQueryOperatorInput>;
  ftxus?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllExchangesByCountryCsvArgs = {
  filter?: InputMaybe<ExchangesByCountryCsvFilterInput>;
  sort?: InputMaybe<ExchangesByCountryCsvSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryDataJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  files?: InputMaybe<StringQueryOperatorInput>;
  imageSize?: InputMaybe<IntQueryOperatorInput>;
  commit?: InputMaybe<BooleanQueryOperatorInput>;
  contributors?: InputMaybe<DataJsonContributorsFilterListInput>;
  contributorsPerLine?: InputMaybe<IntQueryOperatorInput>;
  projectName?: InputMaybe<StringQueryOperatorInput>;
  projectOwner?: InputMaybe<StringQueryOperatorInput>;
  repoType?: InputMaybe<StringQueryOperatorInput>;
  repoHost?: InputMaybe<StringQueryOperatorInput>;
  skipCi?: InputMaybe<BooleanQueryOperatorInput>;
  nodeTools?: InputMaybe<DataJsonNodeToolsFilterListInput>;
  keyGen?: InputMaybe<DataJsonKeyGenFilterListInput>;
  saas?: InputMaybe<DataJsonSaasFilterListInput>;
  pools?: InputMaybe<DataJsonPoolsFilterListInput>;
};


export type QueryAllDataJsonArgs = {
  filter?: InputMaybe<DataJsonFilterInput>;
  sort?: InputMaybe<DataJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryCommunityMeetupsJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  emoji?: InputMaybe<StringQueryOperatorInput>;
  location?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllCommunityMeetupsJsonArgs = {
  filter?: InputMaybe<CommunityMeetupsJsonFilterInput>;
  sort?: InputMaybe<CommunityMeetupsJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryCommunityEventsJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  to?: InputMaybe<StringQueryOperatorInput>;
  sponsor?: InputMaybe<StringQueryOperatorInput>;
  location?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  startDate?: InputMaybe<DateQueryOperatorInput>;
  endDate?: InputMaybe<DateQueryOperatorInput>;
};


export type QueryAllCommunityEventsJsonArgs = {
  filter?: InputMaybe<CommunityEventsJsonFilterInput>;
  sort?: InputMaybe<CommunityEventsJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryCexLayer2SupportJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  supports_withdrawals?: InputMaybe<StringQueryOperatorInput>;
  supports_deposits?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
};


export type QueryAllCexLayer2SupportJsonArgs = {
  filter?: InputMaybe<CexLayer2SupportJsonFilterInput>;
  sort?: InputMaybe<CexLayer2SupportJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryAlltimeJsonArgs = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<AlltimeJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<AlltimeJsonDataFilterListInput>;
};


export type QueryAllAlltimeJsonArgs = {
  filter?: InputMaybe<AlltimeJsonFilterInput>;
  sort?: InputMaybe<AlltimeJsonSortInput>;
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
};

export type IntQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type DateQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
};

export type FloatQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type FileFieldsFilterInput = {
  gitLogLatestAuthorName?: InputMaybe<StringQueryOperatorInput>;
  gitLogLatestAuthorEmail?: InputMaybe<StringQueryOperatorInput>;
  gitLogLatestDate?: InputMaybe<DateQueryOperatorInput>;
};

export type MdxFilterListInput = {
  elemMatch?: InputMaybe<MdxFilterInput>;
};

export type MdxFilterInput = {
  rawBody?: InputMaybe<StringQueryOperatorInput>;
  fileAbsolutePath?: InputMaybe<StringQueryOperatorInput>;
  frontmatter?: InputMaybe<FrontmatterFilterInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  body?: InputMaybe<StringQueryOperatorInput>;
  excerpt?: InputMaybe<StringQueryOperatorInput>;
  headings?: InputMaybe<MdxHeadingMdxFilterListInput>;
  html?: InputMaybe<StringQueryOperatorInput>;
  mdxAST?: InputMaybe<JsonQueryOperatorInput>;
  tableOfContents?: InputMaybe<JsonQueryOperatorInput>;
  timeToRead?: InputMaybe<IntQueryOperatorInput>;
  wordCount?: InputMaybe<MdxWordCountFilterInput>;
  fields?: InputMaybe<MdxFieldsFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type FrontmatterFilterInput = {
  sidebar?: InputMaybe<BooleanQueryOperatorInput>;
  sidebarDepth?: InputMaybe<IntQueryOperatorInput>;
  incomplete?: InputMaybe<BooleanQueryOperatorInput>;
  template?: InputMaybe<StringQueryOperatorInput>;
  summaryPoint1?: InputMaybe<StringQueryOperatorInput>;
  summaryPoint2?: InputMaybe<StringQueryOperatorInput>;
  summaryPoint3?: InputMaybe<StringQueryOperatorInput>;
  summaryPoint4?: InputMaybe<StringQueryOperatorInput>;
  position?: InputMaybe<StringQueryOperatorInput>;
  compensation?: InputMaybe<StringQueryOperatorInput>;
  location?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
  address?: InputMaybe<StringQueryOperatorInput>;
  skill?: InputMaybe<StringQueryOperatorInput>;
  published?: InputMaybe<StringQueryOperatorInput>;
  sourceUrl?: InputMaybe<StringQueryOperatorInput>;
  source?: InputMaybe<StringQueryOperatorInput>;
  author?: InputMaybe<StringQueryOperatorInput>;
  tags?: InputMaybe<StringQueryOperatorInput>;
  isOutdated?: InputMaybe<BooleanQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  lang?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  emoji?: InputMaybe<StringQueryOperatorInput>;
  image?: InputMaybe<FileFilterInput>;
  alt?: InputMaybe<StringQueryOperatorInput>;
  summaryPoints?: InputMaybe<StringQueryOperatorInput>;
};

export type BooleanQueryOperatorInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
};

export type FileFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  blksize?: InputMaybe<IntQueryOperatorInput>;
  blocks?: InputMaybe<IntQueryOperatorInput>;
  fields?: InputMaybe<FileFieldsFilterInput>;
  publicURL?: InputMaybe<StringQueryOperatorInput>;
  childrenMdx?: InputMaybe<MdxFilterListInput>;
  childMdx?: InputMaybe<MdxFilterInput>;
  childrenImageSharp?: InputMaybe<ImageSharpFilterListInput>;
  childImageSharp?: InputMaybe<ImageSharpFilterInput>;
  childrenConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterListInput>;
  childConsensusBountyHuntersCsv?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>;
  childrenExecutionBountyHuntersCsv?: InputMaybe<ExecutionBountyHuntersCsvFilterListInput>;
  childExecutionBountyHuntersCsv?: InputMaybe<ExecutionBountyHuntersCsvFilterInput>;
  childrenWalletsCsv?: InputMaybe<WalletsCsvFilterListInput>;
  childWalletsCsv?: InputMaybe<WalletsCsvFilterInput>;
  childrenQuarterJson?: InputMaybe<QuarterJsonFilterListInput>;
  childQuarterJson?: InputMaybe<QuarterJsonFilterInput>;
  childrenMonthJson?: InputMaybe<MonthJsonFilterListInput>;
  childMonthJson?: InputMaybe<MonthJsonFilterInput>;
  childrenLayer2Json?: InputMaybe<Layer2JsonFilterListInput>;
  childLayer2Json?: InputMaybe<Layer2JsonFilterInput>;
  childrenExternalTutorialsJson?: InputMaybe<ExternalTutorialsJsonFilterListInput>;
  childExternalTutorialsJson?: InputMaybe<ExternalTutorialsJsonFilterInput>;
  childrenExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterListInput>;
  childExchangesByCountryCsv?: InputMaybe<ExchangesByCountryCsvFilterInput>;
  childrenDataJson?: InputMaybe<DataJsonFilterListInput>;
  childDataJson?: InputMaybe<DataJsonFilterInput>;
  childrenCommunityMeetupsJson?: InputMaybe<CommunityMeetupsJsonFilterListInput>;
  childCommunityMeetupsJson?: InputMaybe<CommunityMeetupsJsonFilterInput>;
  childrenCommunityEventsJson?: InputMaybe<CommunityEventsJsonFilterListInput>;
  childCommunityEventsJson?: InputMaybe<CommunityEventsJsonFilterInput>;
  childrenCexLayer2SupportJson?: InputMaybe<CexLayer2SupportJsonFilterListInput>;
  childCexLayer2SupportJson?: InputMaybe<CexLayer2SupportJsonFilterInput>;
  childrenAlltimeJson?: InputMaybe<AlltimeJsonFilterListInput>;
  childAlltimeJson?: InputMaybe<AlltimeJsonFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type ImageSharpFilterListInput = {
  elemMatch?: InputMaybe<ImageSharpFilterInput>;
};

export type ImageSharpFilterInput = {
  fixed?: InputMaybe<ImageSharpFixedFilterInput>;
  fluid?: InputMaybe<ImageSharpFluidFilterInput>;
  gatsbyImageData?: InputMaybe<JsonQueryOperatorInput>;
  original?: InputMaybe<ImageSharpOriginalFilterInput>;
  resize?: InputMaybe<ImageSharpResizeFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type ImageSharpFixedFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  width?: InputMaybe<FloatQueryOperatorInput>;
  height?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpFluidFilterInput = {
  base64?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
  srcSet?: InputMaybe<StringQueryOperatorInput>;
  srcWebp?: InputMaybe<StringQueryOperatorInput>;
  srcSetWebp?: InputMaybe<StringQueryOperatorInput>;
  sizes?: InputMaybe<StringQueryOperatorInput>;
  originalImg?: InputMaybe<StringQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
  presentationWidth?: InputMaybe<IntQueryOperatorInput>;
  presentationHeight?: InputMaybe<IntQueryOperatorInput>;
};

export type JsonQueryOperatorInput = {
  eq?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  regex?: InputMaybe<Scalars['JSON']>;
  glob?: InputMaybe<Scalars['JSON']>;
};

export type ImageSharpOriginalFilterInput = {
  width?: InputMaybe<FloatQueryOperatorInput>;
  height?: InputMaybe<FloatQueryOperatorInput>;
  src?: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpResizeFilterInput = {
  src?: InputMaybe<StringQueryOperatorInput>;
  tracedSVG?: InputMaybe<StringQueryOperatorInput>;
  width?: InputMaybe<IntQueryOperatorInput>;
  height?: InputMaybe<IntQueryOperatorInput>;
  aspectRatio?: InputMaybe<FloatQueryOperatorInput>;
  originalName?: InputMaybe<StringQueryOperatorInput>;
};

export type NodeFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: InputMaybe<NodeFilterInput>;
};

export type InternalFilterInput = {
  content?: InputMaybe<StringQueryOperatorInput>;
  contentDigest?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  fieldOwners?: InputMaybe<StringQueryOperatorInput>;
  ignoreType?: InputMaybe<BooleanQueryOperatorInput>;
  mediaType?: InputMaybe<StringQueryOperatorInput>;
  owner?: InputMaybe<StringQueryOperatorInput>;
  type?: InputMaybe<StringQueryOperatorInput>;
};

export type ConsensusBountyHuntersCsvFilterListInput = {
  elemMatch?: InputMaybe<ConsensusBountyHuntersCsvFilterInput>;
};

export type ConsensusBountyHuntersCsvFilterInput = {
  username?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  score?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type ExecutionBountyHuntersCsvFilterListInput = {
  elemMatch?: InputMaybe<ExecutionBountyHuntersCsvFilterInput>;
};

export type ExecutionBountyHuntersCsvFilterInput = {
  username?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  score?: InputMaybe<IntQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type WalletsCsvFilterListInput = {
  elemMatch?: InputMaybe<WalletsCsvFilterInput>;
};

export type WalletsCsvFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  brand_color?: InputMaybe<StringQueryOperatorInput>;
  has_mobile?: InputMaybe<StringQueryOperatorInput>;
  has_desktop?: InputMaybe<StringQueryOperatorInput>;
  has_web?: InputMaybe<StringQueryOperatorInput>;
  has_hardware?: InputMaybe<StringQueryOperatorInput>;
  has_card_deposits?: InputMaybe<StringQueryOperatorInput>;
  has_explore_dapps?: InputMaybe<StringQueryOperatorInput>;
  has_defi_integrations?: InputMaybe<StringQueryOperatorInput>;
  has_bank_withdrawals?: InputMaybe<StringQueryOperatorInput>;
  has_limits_protection?: InputMaybe<StringQueryOperatorInput>;
  has_high_volume_purchases?: InputMaybe<StringQueryOperatorInput>;
  has_multisig?: InputMaybe<StringQueryOperatorInput>;
  has_dex_integrations?: InputMaybe<StringQueryOperatorInput>;
};

export type QuarterJsonFilterListInput = {
  elemMatch?: InputMaybe<QuarterJsonFilterInput>;
};

export type QuarterJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<QuarterJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<QuarterJsonDataFilterListInput>;
};

export type QuarterJsonDateRangeFilterInput = {
  from?: InputMaybe<DateQueryOperatorInput>;
  to?: InputMaybe<DateQueryOperatorInput>;
};

export type QuarterJsonDataFilterListInput = {
  elemMatch?: InputMaybe<QuarterJsonDataFilterInput>;
};

export type QuarterJsonDataFilterInput = {
  user?: InputMaybe<QuarterJsonDataUserFilterInput>;
  languages?: InputMaybe<QuarterJsonDataLanguagesFilterListInput>;
};

export type QuarterJsonDataUserFilterInput = {
  id?: InputMaybe<IntQueryOperatorInput>;
  username?: InputMaybe<StringQueryOperatorInput>;
  fullName?: InputMaybe<StringQueryOperatorInput>;
  userRole?: InputMaybe<StringQueryOperatorInput>;
  avatarUrl?: InputMaybe<StringQueryOperatorInput>;
  preTranslated?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesFilterListInput = {
  elemMatch?: InputMaybe<QuarterJsonDataLanguagesFilterInput>;
};

export type QuarterJsonDataLanguagesFilterInput = {
  language?: InputMaybe<QuarterJsonDataLanguagesLanguageFilterInput>;
  translated?: InputMaybe<QuarterJsonDataLanguagesTranslatedFilterInput>;
  targetTranslated?: InputMaybe<QuarterJsonDataLanguagesTargetTranslatedFilterInput>;
  translatedByMt?: InputMaybe<QuarterJsonDataLanguagesTranslatedByMtFilterInput>;
  approved?: InputMaybe<QuarterJsonDataLanguagesApprovedFilterInput>;
  translationCosts?: InputMaybe<QuarterJsonDataLanguagesTranslationCostsFilterInput>;
  approvalCosts?: InputMaybe<QuarterJsonDataLanguagesApprovalCostsFilterInput>;
};

export type QuarterJsonDataLanguagesLanguageFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  tmSavings?: InputMaybe<IntQueryOperatorInput>;
  preTranslate?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesTargetTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesTranslatedByMtFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesApprovedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesTranslationCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type QuarterJsonDataLanguagesApprovalCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonFilterListInput = {
  elemMatch?: InputMaybe<MonthJsonFilterInput>;
};

export type MonthJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<MonthJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<MonthJsonDataFilterListInput>;
};

export type MonthJsonDateRangeFilterInput = {
  from?: InputMaybe<DateQueryOperatorInput>;
  to?: InputMaybe<DateQueryOperatorInput>;
};

export type MonthJsonDataFilterListInput = {
  elemMatch?: InputMaybe<MonthJsonDataFilterInput>;
};

export type MonthJsonDataFilterInput = {
  user?: InputMaybe<MonthJsonDataUserFilterInput>;
  languages?: InputMaybe<MonthJsonDataLanguagesFilterListInput>;
};

export type MonthJsonDataUserFilterInput = {
  id?: InputMaybe<IntQueryOperatorInput>;
  username?: InputMaybe<StringQueryOperatorInput>;
  fullName?: InputMaybe<StringQueryOperatorInput>;
  userRole?: InputMaybe<StringQueryOperatorInput>;
  avatarUrl?: InputMaybe<StringQueryOperatorInput>;
  preTranslated?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesFilterListInput = {
  elemMatch?: InputMaybe<MonthJsonDataLanguagesFilterInput>;
};

export type MonthJsonDataLanguagesFilterInput = {
  language?: InputMaybe<MonthJsonDataLanguagesLanguageFilterInput>;
  translated?: InputMaybe<MonthJsonDataLanguagesTranslatedFilterInput>;
  targetTranslated?: InputMaybe<MonthJsonDataLanguagesTargetTranslatedFilterInput>;
  translatedByMt?: InputMaybe<MonthJsonDataLanguagesTranslatedByMtFilterInput>;
  approved?: InputMaybe<MonthJsonDataLanguagesApprovedFilterInput>;
  translationCosts?: InputMaybe<MonthJsonDataLanguagesTranslationCostsFilterInput>;
  approvalCosts?: InputMaybe<MonthJsonDataLanguagesApprovalCostsFilterInput>;
};

export type MonthJsonDataLanguagesLanguageFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  tmSavings?: InputMaybe<IntQueryOperatorInput>;
  preTranslate?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesTargetTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesTranslatedByMtFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesApprovedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesTranslationCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MonthJsonDataLanguagesApprovalCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type Layer2JsonFilterListInput = {
  elemMatch?: InputMaybe<Layer2JsonFilterInput>;
};

export type Layer2JsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  optimistic?: InputMaybe<Layer2JsonOptimisticFilterListInput>;
  zk?: InputMaybe<Layer2JsonZkFilterListInput>;
};

export type Layer2JsonOptimisticFilterListInput = {
  elemMatch?: InputMaybe<Layer2JsonOptimisticFilterInput>;
};

export type Layer2JsonOptimisticFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  website?: InputMaybe<StringQueryOperatorInput>;
  developerDocs?: InputMaybe<StringQueryOperatorInput>;
  l2beat?: InputMaybe<StringQueryOperatorInput>;
  bridge?: InputMaybe<StringQueryOperatorInput>;
  bridgeWallets?: InputMaybe<StringQueryOperatorInput>;
  blockExplorer?: InputMaybe<StringQueryOperatorInput>;
  ecosystemPortal?: InputMaybe<StringQueryOperatorInput>;
  tokenLists?: InputMaybe<StringQueryOperatorInput>;
  noteKey?: InputMaybe<StringQueryOperatorInput>;
  purpose?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  imageKey?: InputMaybe<StringQueryOperatorInput>;
  background?: InputMaybe<StringQueryOperatorInput>;
};

export type Layer2JsonZkFilterListInput = {
  elemMatch?: InputMaybe<Layer2JsonZkFilterInput>;
};

export type Layer2JsonZkFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  website?: InputMaybe<StringQueryOperatorInput>;
  developerDocs?: InputMaybe<StringQueryOperatorInput>;
  l2beat?: InputMaybe<StringQueryOperatorInput>;
  bridge?: InputMaybe<StringQueryOperatorInput>;
  bridgeWallets?: InputMaybe<StringQueryOperatorInput>;
  blockExplorer?: InputMaybe<StringQueryOperatorInput>;
  ecosystemPortal?: InputMaybe<StringQueryOperatorInput>;
  tokenLists?: InputMaybe<StringQueryOperatorInput>;
  noteKey?: InputMaybe<StringQueryOperatorInput>;
  purpose?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  imageKey?: InputMaybe<StringQueryOperatorInput>;
  background?: InputMaybe<StringQueryOperatorInput>;
};

export type ExternalTutorialsJsonFilterListInput = {
  elemMatch?: InputMaybe<ExternalTutorialsJsonFilterInput>;
};

export type ExternalTutorialsJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  author?: InputMaybe<StringQueryOperatorInput>;
  authorGithub?: InputMaybe<StringQueryOperatorInput>;
  tags?: InputMaybe<StringQueryOperatorInput>;
  skillLevel?: InputMaybe<StringQueryOperatorInput>;
  timeToRead?: InputMaybe<StringQueryOperatorInput>;
  lang?: InputMaybe<StringQueryOperatorInput>;
  publishDate?: InputMaybe<StringQueryOperatorInput>;
};

export type ExchangesByCountryCsvFilterListInput = {
  elemMatch?: InputMaybe<ExchangesByCountryCsvFilterInput>;
};

export type ExchangesByCountryCsvFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  country?: InputMaybe<StringQueryOperatorInput>;
  coinmama?: InputMaybe<StringQueryOperatorInput>;
  bittrex?: InputMaybe<StringQueryOperatorInput>;
  simplex?: InputMaybe<StringQueryOperatorInput>;
  wyre?: InputMaybe<StringQueryOperatorInput>;
  moonpay?: InputMaybe<StringQueryOperatorInput>;
  coinbase?: InputMaybe<StringQueryOperatorInput>;
  kraken?: InputMaybe<StringQueryOperatorInput>;
  gemini?: InputMaybe<StringQueryOperatorInput>;
  binance?: InputMaybe<StringQueryOperatorInput>;
  binanceus?: InputMaybe<StringQueryOperatorInput>;
  bitbuy?: InputMaybe<StringQueryOperatorInput>;
  rain?: InputMaybe<StringQueryOperatorInput>;
  cryptocom?: InputMaybe<StringQueryOperatorInput>;
  itezcom?: InputMaybe<StringQueryOperatorInput>;
  coinspot?: InputMaybe<StringQueryOperatorInput>;
  bitvavo?: InputMaybe<StringQueryOperatorInput>;
  mtpelerin?: InputMaybe<StringQueryOperatorInput>;
  wazirx?: InputMaybe<StringQueryOperatorInput>;
  bitflyer?: InputMaybe<StringQueryOperatorInput>;
  easycrypto?: InputMaybe<StringQueryOperatorInput>;
  okx?: InputMaybe<StringQueryOperatorInput>;
  kucoin?: InputMaybe<StringQueryOperatorInput>;
  ftx?: InputMaybe<StringQueryOperatorInput>;
  huobiglobal?: InputMaybe<StringQueryOperatorInput>;
  gateio?: InputMaybe<StringQueryOperatorInput>;
  bitfinex?: InputMaybe<StringQueryOperatorInput>;
  bybit?: InputMaybe<StringQueryOperatorInput>;
  bitkub?: InputMaybe<StringQueryOperatorInput>;
  bitso?: InputMaybe<StringQueryOperatorInput>;
  ftxus?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonFilterListInput = {
  elemMatch?: InputMaybe<DataJsonFilterInput>;
};

export type DataJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  files?: InputMaybe<StringQueryOperatorInput>;
  imageSize?: InputMaybe<IntQueryOperatorInput>;
  commit?: InputMaybe<BooleanQueryOperatorInput>;
  contributors?: InputMaybe<DataJsonContributorsFilterListInput>;
  contributorsPerLine?: InputMaybe<IntQueryOperatorInput>;
  projectName?: InputMaybe<StringQueryOperatorInput>;
  projectOwner?: InputMaybe<StringQueryOperatorInput>;
  repoType?: InputMaybe<StringQueryOperatorInput>;
  repoHost?: InputMaybe<StringQueryOperatorInput>;
  skipCi?: InputMaybe<BooleanQueryOperatorInput>;
  nodeTools?: InputMaybe<DataJsonNodeToolsFilterListInput>;
  keyGen?: InputMaybe<DataJsonKeyGenFilterListInput>;
  saas?: InputMaybe<DataJsonSaasFilterListInput>;
  pools?: InputMaybe<DataJsonPoolsFilterListInput>;
};

export type DataJsonContributorsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonContributorsFilterInput>;
};

export type DataJsonContributorsFilterInput = {
  login?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  avatar_url?: InputMaybe<StringQueryOperatorInput>;
  profile?: InputMaybe<StringQueryOperatorInput>;
  contributions?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonNodeToolsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonNodeToolsFilterInput>;
};

export type DataJsonNodeToolsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  svgPath?: InputMaybe<StringQueryOperatorInput>;
  hue?: InputMaybe<IntQueryOperatorInput>;
  launchDate?: InputMaybe<DateQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  audits?: InputMaybe<DataJsonNodeToolsAuditsFilterListInput>;
  minEth?: InputMaybe<IntQueryOperatorInput>;
  additionalStake?: InputMaybe<StringQueryOperatorInput>;
  additionalStakeUnit?: InputMaybe<StringQueryOperatorInput>;
  tokens?: InputMaybe<DataJsonNodeToolsTokensFilterListInput>;
  isFoss?: InputMaybe<BooleanQueryOperatorInput>;
  hasBugBounty?: InputMaybe<BooleanQueryOperatorInput>;
  isTrustless?: InputMaybe<BooleanQueryOperatorInput>;
  isPermissionless?: InputMaybe<BooleanQueryOperatorInput>;
  multiClient?: InputMaybe<BooleanQueryOperatorInput>;
  easyClientSwitching?: InputMaybe<BooleanQueryOperatorInput>;
  platforms?: InputMaybe<StringQueryOperatorInput>;
  ui?: InputMaybe<StringQueryOperatorInput>;
  socials?: InputMaybe<DataJsonNodeToolsSocialsFilterInput>;
  matomo?: InputMaybe<DataJsonNodeToolsMatomoFilterInput>;
};

export type DataJsonNodeToolsAuditsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonNodeToolsAuditsFilterInput>;
};

export type DataJsonNodeToolsAuditsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonNodeToolsTokensFilterListInput = {
  elemMatch?: InputMaybe<DataJsonNodeToolsTokensFilterInput>;
};

export type DataJsonNodeToolsTokensFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  symbol?: InputMaybe<StringQueryOperatorInput>;
  address?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonNodeToolsSocialsFilterInput = {
  discord?: InputMaybe<StringQueryOperatorInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
  github?: InputMaybe<StringQueryOperatorInput>;
  telegram?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonNodeToolsMatomoFilterInput = {
  eventCategory?: InputMaybe<StringQueryOperatorInput>;
  eventAction?: InputMaybe<StringQueryOperatorInput>;
  eventName?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonKeyGenFilterListInput = {
  elemMatch?: InputMaybe<DataJsonKeyGenFilterInput>;
};

export type DataJsonKeyGenFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  svgPath?: InputMaybe<StringQueryOperatorInput>;
  hue?: InputMaybe<IntQueryOperatorInput>;
  launchDate?: InputMaybe<DateQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  audits?: InputMaybe<DataJsonKeyGenAuditsFilterListInput>;
  isFoss?: InputMaybe<BooleanQueryOperatorInput>;
  hasBugBounty?: InputMaybe<BooleanQueryOperatorInput>;
  isTrustless?: InputMaybe<BooleanQueryOperatorInput>;
  isPermissionless?: InputMaybe<BooleanQueryOperatorInput>;
  isSelfCustody?: InputMaybe<BooleanQueryOperatorInput>;
  platforms?: InputMaybe<StringQueryOperatorInput>;
  ui?: InputMaybe<StringQueryOperatorInput>;
  socials?: InputMaybe<DataJsonKeyGenSocialsFilterInput>;
  matomo?: InputMaybe<DataJsonKeyGenMatomoFilterInput>;
};

export type DataJsonKeyGenAuditsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonKeyGenAuditsFilterInput>;
};

export type DataJsonKeyGenAuditsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonKeyGenSocialsFilterInput = {
  discord?: InputMaybe<StringQueryOperatorInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
  github?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonKeyGenMatomoFilterInput = {
  eventCategory?: InputMaybe<StringQueryOperatorInput>;
  eventAction?: InputMaybe<StringQueryOperatorInput>;
  eventName?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonSaasFilterListInput = {
  elemMatch?: InputMaybe<DataJsonSaasFilterInput>;
};

export type DataJsonSaasFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  svgPath?: InputMaybe<StringQueryOperatorInput>;
  hue?: InputMaybe<IntQueryOperatorInput>;
  launchDate?: InputMaybe<DateQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  audits?: InputMaybe<DataJsonSaasAuditsFilterListInput>;
  minEth?: InputMaybe<IntQueryOperatorInput>;
  additionalStake?: InputMaybe<StringQueryOperatorInput>;
  additionalStakeUnit?: InputMaybe<StringQueryOperatorInput>;
  monthlyFee?: InputMaybe<IntQueryOperatorInput>;
  monthlyFeeUnit?: InputMaybe<StringQueryOperatorInput>;
  isFoss?: InputMaybe<BooleanQueryOperatorInput>;
  hasBugBounty?: InputMaybe<BooleanQueryOperatorInput>;
  isTrustless?: InputMaybe<BooleanQueryOperatorInput>;
  isPermissionless?: InputMaybe<BooleanQueryOperatorInput>;
  pctMajorityClient?: InputMaybe<FloatQueryOperatorInput>;
  isSelfCustody?: InputMaybe<BooleanQueryOperatorInput>;
  platforms?: InputMaybe<StringQueryOperatorInput>;
  ui?: InputMaybe<StringQueryOperatorInput>;
  socials?: InputMaybe<DataJsonSaasSocialsFilterInput>;
  matomo?: InputMaybe<DataJsonSaasMatomoFilterInput>;
};

export type DataJsonSaasAuditsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonSaasAuditsFilterInput>;
};

export type DataJsonSaasAuditsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  date?: InputMaybe<DateQueryOperatorInput>;
};

export type DataJsonSaasSocialsFilterInput = {
  discord?: InputMaybe<StringQueryOperatorInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
  github?: InputMaybe<StringQueryOperatorInput>;
  telegram?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonSaasMatomoFilterInput = {
  eventCategory?: InputMaybe<StringQueryOperatorInput>;
  eventAction?: InputMaybe<StringQueryOperatorInput>;
  eventName?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonPoolsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonPoolsFilterInput>;
};

export type DataJsonPoolsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  svgPath?: InputMaybe<StringQueryOperatorInput>;
  hue?: InputMaybe<IntQueryOperatorInput>;
  launchDate?: InputMaybe<DateQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  audits?: InputMaybe<DataJsonPoolsAuditsFilterListInput>;
  minEth?: InputMaybe<FloatQueryOperatorInput>;
  feePercentage?: InputMaybe<IntQueryOperatorInput>;
  tokens?: InputMaybe<DataJsonPoolsTokensFilterListInput>;
  isFoss?: InputMaybe<BooleanQueryOperatorInput>;
  hasBugBounty?: InputMaybe<BooleanQueryOperatorInput>;
  isTrustless?: InputMaybe<BooleanQueryOperatorInput>;
  hasPermissionlessNodes?: InputMaybe<BooleanQueryOperatorInput>;
  pctMajorityClient?: InputMaybe<FloatQueryOperatorInput>;
  platforms?: InputMaybe<StringQueryOperatorInput>;
  ui?: InputMaybe<StringQueryOperatorInput>;
  socials?: InputMaybe<DataJsonPoolsSocialsFilterInput>;
  matomo?: InputMaybe<DataJsonPoolsMatomoFilterInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
  telegram?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonPoolsAuditsFilterListInput = {
  elemMatch?: InputMaybe<DataJsonPoolsAuditsFilterInput>;
};

export type DataJsonPoolsAuditsFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  date?: InputMaybe<DateQueryOperatorInput>;
};

export type DataJsonPoolsTokensFilterListInput = {
  elemMatch?: InputMaybe<DataJsonPoolsTokensFilterInput>;
};

export type DataJsonPoolsTokensFilterInput = {
  name?: InputMaybe<StringQueryOperatorInput>;
  symbol?: InputMaybe<StringQueryOperatorInput>;
  address?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonPoolsSocialsFilterInput = {
  discord?: InputMaybe<StringQueryOperatorInput>;
  twitter?: InputMaybe<StringQueryOperatorInput>;
  github?: InputMaybe<StringQueryOperatorInput>;
  telegram?: InputMaybe<StringQueryOperatorInput>;
  reddit?: InputMaybe<StringQueryOperatorInput>;
};

export type DataJsonPoolsMatomoFilterInput = {
  eventCategory?: InputMaybe<StringQueryOperatorInput>;
  eventAction?: InputMaybe<StringQueryOperatorInput>;
  eventName?: InputMaybe<StringQueryOperatorInput>;
};

export type CommunityMeetupsJsonFilterListInput = {
  elemMatch?: InputMaybe<CommunityMeetupsJsonFilterInput>;
};

export type CommunityMeetupsJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  emoji?: InputMaybe<StringQueryOperatorInput>;
  location?: InputMaybe<StringQueryOperatorInput>;
  link?: InputMaybe<StringQueryOperatorInput>;
};

export type CommunityEventsJsonFilterListInput = {
  elemMatch?: InputMaybe<CommunityEventsJsonFilterInput>;
};

export type CommunityEventsJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  title?: InputMaybe<StringQueryOperatorInput>;
  to?: InputMaybe<StringQueryOperatorInput>;
  sponsor?: InputMaybe<StringQueryOperatorInput>;
  location?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  startDate?: InputMaybe<DateQueryOperatorInput>;
  endDate?: InputMaybe<DateQueryOperatorInput>;
};

export type CexLayer2SupportJsonFilterListInput = {
  elemMatch?: InputMaybe<CexLayer2SupportJsonFilterInput>;
};

export type CexLayer2SupportJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  supports_withdrawals?: InputMaybe<StringQueryOperatorInput>;
  supports_deposits?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
};

export type AlltimeJsonFilterListInput = {
  elemMatch?: InputMaybe<AlltimeJsonFilterInput>;
};

export type AlltimeJsonFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  unit?: InputMaybe<StringQueryOperatorInput>;
  dateRange?: InputMaybe<AlltimeJsonDateRangeFilterInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  mode?: InputMaybe<StringQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
  totalTMSavings?: InputMaybe<IntQueryOperatorInput>;
  totalPreTranslated?: InputMaybe<IntQueryOperatorInput>;
  data?: InputMaybe<AlltimeJsonDataFilterListInput>;
};

export type AlltimeJsonDateRangeFilterInput = {
  from?: InputMaybe<DateQueryOperatorInput>;
  to?: InputMaybe<DateQueryOperatorInput>;
};

export type AlltimeJsonDataFilterListInput = {
  elemMatch?: InputMaybe<AlltimeJsonDataFilterInput>;
};

export type AlltimeJsonDataFilterInput = {
  user?: InputMaybe<AlltimeJsonDataUserFilterInput>;
  languages?: InputMaybe<AlltimeJsonDataLanguagesFilterListInput>;
};

export type AlltimeJsonDataUserFilterInput = {
  id?: InputMaybe<IntQueryOperatorInput>;
  username?: InputMaybe<StringQueryOperatorInput>;
  fullName?: InputMaybe<StringQueryOperatorInput>;
  userRole?: InputMaybe<StringQueryOperatorInput>;
  avatarUrl?: InputMaybe<StringQueryOperatorInput>;
  preTranslated?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesFilterListInput = {
  elemMatch?: InputMaybe<AlltimeJsonDataLanguagesFilterInput>;
};

export type AlltimeJsonDataLanguagesFilterInput = {
  language?: InputMaybe<AlltimeJsonDataLanguagesLanguageFilterInput>;
  translated?: InputMaybe<AlltimeJsonDataLanguagesTranslatedFilterInput>;
  targetTranslated?: InputMaybe<AlltimeJsonDataLanguagesTargetTranslatedFilterInput>;
  translatedByMt?: InputMaybe<AlltimeJsonDataLanguagesTranslatedByMtFilterInput>;
  approved?: InputMaybe<AlltimeJsonDataLanguagesApprovedFilterInput>;
  translationCosts?: InputMaybe<AlltimeJsonDataLanguagesTranslationCostsFilterInput>;
  approvalCosts?: InputMaybe<AlltimeJsonDataLanguagesApprovalCostsFilterInput>;
};

export type AlltimeJsonDataLanguagesLanguageFilterInput = {
  id?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  tmSavings?: InputMaybe<IntQueryOperatorInput>;
  preTranslate?: InputMaybe<IntQueryOperatorInput>;
  totalCosts?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesTargetTranslatedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesTranslatedByMtFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesApprovedFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesTranslationCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type AlltimeJsonDataLanguagesApprovalCostsFilterInput = {
  tmMatch?: InputMaybe<IntQueryOperatorInput>;
  default?: InputMaybe<IntQueryOperatorInput>;
  total?: InputMaybe<IntQueryOperatorInput>;
};

export type MdxHeadingMdxFilterListInput = {
  elemMatch?: InputMaybe<MdxHeadingMdxFilterInput>;
};

export type MdxHeadingMdxFilterInput = {
  value?: InputMaybe<StringQueryOperatorInput>;
  depth?: InputMaybe<IntQueryOperatorInput>;
};

export type MdxWordCountFilterInput = {
  paragraphs?: InputMaybe<IntQueryOperatorInput>;
  sentences?: InputMaybe<IntQueryOperatorInput>;
  words?: InputMaybe<IntQueryOperatorInput>;
};

export type MdxFieldsFilterInput = {
  readingTime?: InputMaybe<MdxFieldsReadingTimeFilterInput>;
  isOutdated?: InputMaybe<BooleanQueryOperatorInput>;
  slug?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
};

export type MdxFieldsReadingTimeFilterInput = {
  text?: InputMaybe<StringQueryOperatorInput>;
  minutes?: InputMaybe<FloatQueryOperatorInput>;
  time?: InputMaybe<IntQueryOperatorInput>;
  words?: InputMaybe<IntQueryOperatorInput>;
};

export type FileConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FileFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'blksize'
  | 'blocks'
  | 'fields___gitLogLatestAuthorName'
  | 'fields___gitLogLatestAuthorEmail'
  | 'fields___gitLogLatestDate'
  | 'publicURL'
  | 'childrenMdx'
  | 'childrenMdx___rawBody'
  | 'childrenMdx___fileAbsolutePath'
  | 'childrenMdx___frontmatter___sidebar'
  | 'childrenMdx___frontmatter___sidebarDepth'
  | 'childrenMdx___frontmatter___incomplete'
  | 'childrenMdx___frontmatter___template'
  | 'childrenMdx___frontmatter___summaryPoint1'
  | 'childrenMdx___frontmatter___summaryPoint2'
  | 'childrenMdx___frontmatter___summaryPoint3'
  | 'childrenMdx___frontmatter___summaryPoint4'
  | 'childrenMdx___frontmatter___position'
  | 'childrenMdx___frontmatter___compensation'
  | 'childrenMdx___frontmatter___location'
  | 'childrenMdx___frontmatter___type'
  | 'childrenMdx___frontmatter___link'
  | 'childrenMdx___frontmatter___address'
  | 'childrenMdx___frontmatter___skill'
  | 'childrenMdx___frontmatter___published'
  | 'childrenMdx___frontmatter___sourceUrl'
  | 'childrenMdx___frontmatter___source'
  | 'childrenMdx___frontmatter___author'
  | 'childrenMdx___frontmatter___tags'
  | 'childrenMdx___frontmatter___isOutdated'
  | 'childrenMdx___frontmatter___title'
  | 'childrenMdx___frontmatter___lang'
  | 'childrenMdx___frontmatter___description'
  | 'childrenMdx___frontmatter___emoji'
  | 'childrenMdx___frontmatter___image___sourceInstanceName'
  | 'childrenMdx___frontmatter___image___absolutePath'
  | 'childrenMdx___frontmatter___image___relativePath'
  | 'childrenMdx___frontmatter___image___extension'
  | 'childrenMdx___frontmatter___image___size'
  | 'childrenMdx___frontmatter___image___prettySize'
  | 'childrenMdx___frontmatter___image___modifiedTime'
  | 'childrenMdx___frontmatter___image___accessTime'
  | 'childrenMdx___frontmatter___image___changeTime'
  | 'childrenMdx___frontmatter___image___birthTime'
  | 'childrenMdx___frontmatter___image___root'
  | 'childrenMdx___frontmatter___image___dir'
  | 'childrenMdx___frontmatter___image___base'
  | 'childrenMdx___frontmatter___image___ext'
  | 'childrenMdx___frontmatter___image___name'
  | 'childrenMdx___frontmatter___image___relativeDirectory'
  | 'childrenMdx___frontmatter___image___dev'
  | 'childrenMdx___frontmatter___image___mode'
  | 'childrenMdx___frontmatter___image___nlink'
  | 'childrenMdx___frontmatter___image___uid'
  | 'childrenMdx___frontmatter___image___gid'
  | 'childrenMdx___frontmatter___image___rdev'
  | 'childrenMdx___frontmatter___image___ino'
  | 'childrenMdx___frontmatter___image___atimeMs'
  | 'childrenMdx___frontmatter___image___mtimeMs'
  | 'childrenMdx___frontmatter___image___ctimeMs'
  | 'childrenMdx___frontmatter___image___atime'
  | 'childrenMdx___frontmatter___image___mtime'
  | 'childrenMdx___frontmatter___image___ctime'
  | 'childrenMdx___frontmatter___image___birthtime'
  | 'childrenMdx___frontmatter___image___birthtimeMs'
  | 'childrenMdx___frontmatter___image___blksize'
  | 'childrenMdx___frontmatter___image___blocks'
  | 'childrenMdx___frontmatter___image___publicURL'
  | 'childrenMdx___frontmatter___image___childrenMdx'
  | 'childrenMdx___frontmatter___image___childrenImageSharp'
  | 'childrenMdx___frontmatter___image___childrenConsensusBountyHuntersCsv'
  | 'childrenMdx___frontmatter___image___childrenExecutionBountyHuntersCsv'
  | 'childrenMdx___frontmatter___image___childrenWalletsCsv'
  | 'childrenMdx___frontmatter___image___childrenQuarterJson'
  | 'childrenMdx___frontmatter___image___childrenMonthJson'
  | 'childrenMdx___frontmatter___image___childrenLayer2Json'
  | 'childrenMdx___frontmatter___image___childrenExternalTutorialsJson'
  | 'childrenMdx___frontmatter___image___childrenExchangesByCountryCsv'
  | 'childrenMdx___frontmatter___image___childrenDataJson'
  | 'childrenMdx___frontmatter___image___childrenCommunityMeetupsJson'
  | 'childrenMdx___frontmatter___image___childrenCommunityEventsJson'
  | 'childrenMdx___frontmatter___image___childrenCexLayer2SupportJson'
  | 'childrenMdx___frontmatter___image___childrenAlltimeJson'
  | 'childrenMdx___frontmatter___image___id'
  | 'childrenMdx___frontmatter___image___children'
  | 'childrenMdx___frontmatter___alt'
  | 'childrenMdx___frontmatter___summaryPoints'
  | 'childrenMdx___slug'
  | 'childrenMdx___body'
  | 'childrenMdx___excerpt'
  | 'childrenMdx___headings'
  | 'childrenMdx___headings___value'
  | 'childrenMdx___headings___depth'
  | 'childrenMdx___html'
  | 'childrenMdx___mdxAST'
  | 'childrenMdx___tableOfContents'
  | 'childrenMdx___timeToRead'
  | 'childrenMdx___wordCount___paragraphs'
  | 'childrenMdx___wordCount___sentences'
  | 'childrenMdx___wordCount___words'
  | 'childrenMdx___fields___readingTime___text'
  | 'childrenMdx___fields___readingTime___minutes'
  | 'childrenMdx___fields___readingTime___time'
  | 'childrenMdx___fields___readingTime___words'
  | 'childrenMdx___fields___isOutdated'
  | 'childrenMdx___fields___slug'
  | 'childrenMdx___fields___relativePath'
  | 'childrenMdx___id'
  | 'childrenMdx___parent___id'
  | 'childrenMdx___parent___parent___id'
  | 'childrenMdx___parent___parent___children'
  | 'childrenMdx___parent___children'
  | 'childrenMdx___parent___children___id'
  | 'childrenMdx___parent___children___children'
  | 'childrenMdx___parent___internal___content'
  | 'childrenMdx___parent___internal___contentDigest'
  | 'childrenMdx___parent___internal___description'
  | 'childrenMdx___parent___internal___fieldOwners'
  | 'childrenMdx___parent___internal___ignoreType'
  | 'childrenMdx___parent___internal___mediaType'
  | 'childrenMdx___parent___internal___owner'
  | 'childrenMdx___parent___internal___type'
  | 'childrenMdx___children'
  | 'childrenMdx___children___id'
  | 'childrenMdx___children___parent___id'
  | 'childrenMdx___children___parent___children'
  | 'childrenMdx___children___children'
  | 'childrenMdx___children___children___id'
  | 'childrenMdx___children___children___children'
  | 'childrenMdx___children___internal___content'
  | 'childrenMdx___children___internal___contentDigest'
  | 'childrenMdx___children___internal___description'
  | 'childrenMdx___children___internal___fieldOwners'
  | 'childrenMdx___children___internal___ignoreType'
  | 'childrenMdx___children___internal___mediaType'
  | 'childrenMdx___children___internal___owner'
  | 'childrenMdx___children___internal___type'
  | 'childrenMdx___internal___content'
  | 'childrenMdx___internal___contentDigest'
  | 'childrenMdx___internal___description'
  | 'childrenMdx___internal___fieldOwners'
  | 'childrenMdx___internal___ignoreType'
  | 'childrenMdx___internal___mediaType'
  | 'childrenMdx___internal___owner'
  | 'childrenMdx___internal___type'
  | 'childMdx___rawBody'
  | 'childMdx___fileAbsolutePath'
  | 'childMdx___frontmatter___sidebar'
  | 'childMdx___frontmatter___sidebarDepth'
  | 'childMdx___frontmatter___incomplete'
  | 'childMdx___frontmatter___template'
  | 'childMdx___frontmatter___summaryPoint1'
  | 'childMdx___frontmatter___summaryPoint2'
  | 'childMdx___frontmatter___summaryPoint3'
  | 'childMdx___frontmatter___summaryPoint4'
  | 'childMdx___frontmatter___position'
  | 'childMdx___frontmatter___compensation'
  | 'childMdx___frontmatter___location'
  | 'childMdx___frontmatter___type'
  | 'childMdx___frontmatter___link'
  | 'childMdx___frontmatter___address'
  | 'childMdx___frontmatter___skill'
  | 'childMdx___frontmatter___published'
  | 'childMdx___frontmatter___sourceUrl'
  | 'childMdx___frontmatter___source'
  | 'childMdx___frontmatter___author'
  | 'childMdx___frontmatter___tags'
  | 'childMdx___frontmatter___isOutdated'
  | 'childMdx___frontmatter___title'
  | 'childMdx___frontmatter___lang'
  | 'childMdx___frontmatter___description'
  | 'childMdx___frontmatter___emoji'
  | 'childMdx___frontmatter___image___sourceInstanceName'
  | 'childMdx___frontmatter___image___absolutePath'
  | 'childMdx___frontmatter___image___relativePath'
  | 'childMdx___frontmatter___image___extension'
  | 'childMdx___frontmatter___image___size'
  | 'childMdx___frontmatter___image___prettySize'
  | 'childMdx___frontmatter___image___modifiedTime'
  | 'childMdx___frontmatter___image___accessTime'
  | 'childMdx___frontmatter___image___changeTime'
  | 'childMdx___frontmatter___image___birthTime'
  | 'childMdx___frontmatter___image___root'
  | 'childMdx___frontmatter___image___dir'
  | 'childMdx___frontmatter___image___base'
  | 'childMdx___frontmatter___image___ext'
  | 'childMdx___frontmatter___image___name'
  | 'childMdx___frontmatter___image___relativeDirectory'
  | 'childMdx___frontmatter___image___dev'
  | 'childMdx___frontmatter___image___mode'
  | 'childMdx___frontmatter___image___nlink'
  | 'childMdx___frontmatter___image___uid'
  | 'childMdx___frontmatter___image___gid'
  | 'childMdx___frontmatter___image___rdev'
  | 'childMdx___frontmatter___image___ino'
  | 'childMdx___frontmatter___image___atimeMs'
  | 'childMdx___frontmatter___image___mtimeMs'
  | 'childMdx___frontmatter___image___ctimeMs'
  | 'childMdx___frontmatter___image___atime'
  | 'childMdx___frontmatter___image___mtime'
  | 'childMdx___frontmatter___image___ctime'
  | 'childMdx___frontmatter___image___birthtime'
  | 'childMdx___frontmatter___image___birthtimeMs'
  | 'childMdx___frontmatter___image___blksize'
  | 'childMdx___frontmatter___image___blocks'
  | 'childMdx___frontmatter___image___publicURL'
  | 'childMdx___frontmatter___image___childrenMdx'
  | 'childMdx___frontmatter___image___childrenImageSharp'
  | 'childMdx___frontmatter___image___childrenConsensusBountyHuntersCsv'
  | 'childMdx___frontmatter___image___childrenExecutionBountyHuntersCsv'
  | 'childMdx___frontmatter___image___childrenWalletsCsv'
  | 'childMdx___frontmatter___image___childrenQuarterJson'
  | 'childMdx___frontmatter___image___childrenMonthJson'
  | 'childMdx___frontmatter___image___childrenLayer2Json'
  | 'childMdx___frontmatter___image___childrenExternalTutorialsJson'
  | 'childMdx___frontmatter___image___childrenExchangesByCountryCsv'
  | 'childMdx___frontmatter___image___childrenDataJson'
  | 'childMdx___frontmatter___image___childrenCommunityMeetupsJson'
  | 'childMdx___frontmatter___image___childrenCommunityEventsJson'
  | 'childMdx___frontmatter___image___childrenCexLayer2SupportJson'
  | 'childMdx___frontmatter___image___childrenAlltimeJson'
  | 'childMdx___frontmatter___image___id'
  | 'childMdx___frontmatter___image___children'
  | 'childMdx___frontmatter___alt'
  | 'childMdx___frontmatter___summaryPoints'
  | 'childMdx___slug'
  | 'childMdx___body'
  | 'childMdx___excerpt'
  | 'childMdx___headings'
  | 'childMdx___headings___value'
  | 'childMdx___headings___depth'
  | 'childMdx___html'
  | 'childMdx___mdxAST'
  | 'childMdx___tableOfContents'
  | 'childMdx___timeToRead'
  | 'childMdx___wordCount___paragraphs'
  | 'childMdx___wordCount___sentences'
  | 'childMdx___wordCount___words'
  | 'childMdx___fields___readingTime___text'
  | 'childMdx___fields___readingTime___minutes'
  | 'childMdx___fields___readingTime___time'
  | 'childMdx___fields___readingTime___words'
  | 'childMdx___fields___isOutdated'
  | 'childMdx___fields___slug'
  | 'childMdx___fields___relativePath'
  | 'childMdx___id'
  | 'childMdx___parent___id'
  | 'childMdx___parent___parent___id'
  | 'childMdx___parent___parent___children'
  | 'childMdx___parent___children'
  | 'childMdx___parent___children___id'
  | 'childMdx___parent___children___children'
  | 'childMdx___parent___internal___content'
  | 'childMdx___parent___internal___contentDigest'
  | 'childMdx___parent___internal___description'
  | 'childMdx___parent___internal___fieldOwners'
  | 'childMdx___parent___internal___ignoreType'
  | 'childMdx___parent___internal___mediaType'
  | 'childMdx___parent___internal___owner'
  | 'childMdx___parent___internal___type'
  | 'childMdx___children'
  | 'childMdx___children___id'
  | 'childMdx___children___parent___id'
  | 'childMdx___children___parent___children'
  | 'childMdx___children___children'
  | 'childMdx___children___children___id'
  | 'childMdx___children___children___children'
  | 'childMdx___children___internal___content'
  | 'childMdx___children___internal___contentDigest'
  | 'childMdx___children___internal___description'
  | 'childMdx___children___internal___fieldOwners'
  | 'childMdx___children___internal___ignoreType'
  | 'childMdx___children___internal___mediaType'
  | 'childMdx___children___internal___owner'
  | 'childMdx___children___internal___type'
  | 'childMdx___internal___content'
  | 'childMdx___internal___contentDigest'
  | 'childMdx___internal___description'
  | 'childMdx___internal___fieldOwners'
  | 'childMdx___internal___ignoreType'
  | 'childMdx___internal___mediaType'
  | 'childMdx___internal___owner'
  | 'childMdx___internal___type'
  | 'childrenImageSharp'
  | 'childrenImageSharp___fixed___base64'
  | 'childrenImageSharp___fixed___tracedSVG'
  | 'childrenImageSharp___fixed___aspectRatio'
  | 'childrenImageSharp___fixed___width'
  | 'childrenImageSharp___fixed___height'
  | 'childrenImageSharp___fixed___src'
  | 'childrenImageSharp___fixed___srcSet'
  | 'childrenImageSharp___fixed___srcWebp'
  | 'childrenImageSharp___fixed___srcSetWebp'
  | 'childrenImageSharp___fixed___originalName'
  | 'childrenImageSharp___fluid___base64'
  | 'childrenImageSharp___fluid___tracedSVG'
  | 'childrenImageSharp___fluid___aspectRatio'
  | 'childrenImageSharp___fluid___src'
  | 'childrenImageSharp___fluid___srcSet'
  | 'childrenImageSharp___fluid___srcWebp'
  | 'childrenImageSharp___fluid___srcSetWebp'
  | 'childrenImageSharp___fluid___sizes'
  | 'childrenImageSharp___fluid___originalImg'
  | 'childrenImageSharp___fluid___originalName'
  | 'childrenImageSharp___fluid___presentationWidth'
  | 'childrenImageSharp___fluid___presentationHeight'
  | 'childrenImageSharp___gatsbyImageData'
  | 'childrenImageSharp___original___width'
  | 'childrenImageSharp___original___height'
  | 'childrenImageSharp___original___src'
  | 'childrenImageSharp___resize___src'
  | 'childrenImageSharp___resize___tracedSVG'
  | 'childrenImageSharp___resize___width'
  | 'childrenImageSharp___resize___height'
  | 'childrenImageSharp___resize___aspectRatio'
  | 'childrenImageSharp___resize___originalName'
  | 'childrenImageSharp___id'
  | 'childrenImageSharp___parent___id'
  | 'childrenImageSharp___parent___parent___id'
  | 'childrenImageSharp___parent___parent___children'
  | 'childrenImageSharp___parent___children'
  | 'childrenImageSharp___parent___children___id'
  | 'childrenImageSharp___parent___children___children'
  | 'childrenImageSharp___parent___internal___content'
  | 'childrenImageSharp___parent___internal___contentDigest'
  | 'childrenImageSharp___parent___internal___description'
  | 'childrenImageSharp___parent___internal___fieldOwners'
  | 'childrenImageSharp___parent___internal___ignoreType'
  | 'childrenImageSharp___parent___internal___mediaType'
  | 'childrenImageSharp___parent___internal___owner'
  | 'childrenImageSharp___parent___internal___type'
  | 'childrenImageSharp___children'
  | 'childrenImageSharp___children___id'
  | 'childrenImageSharp___children___parent___id'
  | 'childrenImageSharp___children___parent___children'
  | 'childrenImageSharp___children___children'
  | 'childrenImageSharp___children___children___id'
  | 'childrenImageSharp___children___children___children'
  | 'childrenImageSharp___children___internal___content'
  | 'childrenImageSharp___children___internal___contentDigest'
  | 'childrenImageSharp___children___internal___description'
  | 'childrenImageSharp___children___internal___fieldOwners'
  | 'childrenImageSharp___children___internal___ignoreType'
  | 'childrenImageSharp___children___internal___mediaType'
  | 'childrenImageSharp___children___internal___owner'
  | 'childrenImageSharp___children___internal___type'
  | 'childrenImageSharp___internal___content'
  | 'childrenImageSharp___internal___contentDigest'
  | 'childrenImageSharp___internal___description'
  | 'childrenImageSharp___internal___fieldOwners'
  | 'childrenImageSharp___internal___ignoreType'
  | 'childrenImageSharp___internal___mediaType'
  | 'childrenImageSharp___internal___owner'
  | 'childrenImageSharp___internal___type'
  | 'childImageSharp___fixed___base64'
  | 'childImageSharp___fixed___tracedSVG'
  | 'childImageSharp___fixed___aspectRatio'
  | 'childImageSharp___fixed___width'
  | 'childImageSharp___fixed___height'
  | 'childImageSharp___fixed___src'
  | 'childImageSharp___fixed___srcSet'
  | 'childImageSharp___fixed___srcWebp'
  | 'childImageSharp___fixed___srcSetWebp'
  | 'childImageSharp___fixed___originalName'
  | 'childImageSharp___fluid___base64'
  | 'childImageSharp___fluid___tracedSVG'
  | 'childImageSharp___fluid___aspectRatio'
  | 'childImageSharp___fluid___src'
  | 'childImageSharp___fluid___srcSet'
  | 'childImageSharp___fluid___srcWebp'
  | 'childImageSharp___fluid___srcSetWebp'
  | 'childImageSharp___fluid___sizes'
  | 'childImageSharp___fluid___originalImg'
  | 'childImageSharp___fluid___originalName'
  | 'childImageSharp___fluid___presentationWidth'
  | 'childImageSharp___fluid___presentationHeight'
  | 'childImageSharp___gatsbyImageData'
  | 'childImageSharp___original___width'
  | 'childImageSharp___original___height'
  | 'childImageSharp___original___src'
  | 'childImageSharp___resize___src'
  | 'childImageSharp___resize___tracedSVG'
  | 'childImageSharp___resize___width'
  | 'childImageSharp___resize___height'
  | 'childImageSharp___resize___aspectRatio'
  | 'childImageSharp___resize___originalName'
  | 'childImageSharp___id'
  | 'childImageSharp___parent___id'
  | 'childImageSharp___parent___parent___id'
  | 'childImageSharp___parent___parent___children'
  | 'childImageSharp___parent___children'
  | 'childImageSharp___parent___children___id'
  | 'childImageSharp___parent___children___children'
  | 'childImageSharp___parent___internal___content'
  | 'childImageSharp___parent___internal___contentDigest'
  | 'childImageSharp___parent___internal___description'
  | 'childImageSharp___parent___internal___fieldOwners'
  | 'childImageSharp___parent___internal___ignoreType'
  | 'childImageSharp___parent___internal___mediaType'
  | 'childImageSharp___parent___internal___owner'
  | 'childImageSharp___parent___internal___type'
  | 'childImageSharp___children'
  | 'childImageSharp___children___id'
  | 'childImageSharp___children___parent___id'
  | 'childImageSharp___children___parent___children'
  | 'childImageSharp___children___children'
  | 'childImageSharp___children___children___id'
  | 'childImageSharp___children___children___children'
  | 'childImageSharp___children___internal___content'
  | 'childImageSharp___children___internal___contentDigest'
  | 'childImageSharp___children___internal___description'
  | 'childImageSharp___children___internal___fieldOwners'
  | 'childImageSharp___children___internal___ignoreType'
  | 'childImageSharp___children___internal___mediaType'
  | 'childImageSharp___children___internal___owner'
  | 'childImageSharp___children___internal___type'
  | 'childImageSharp___internal___content'
  | 'childImageSharp___internal___contentDigest'
  | 'childImageSharp___internal___description'
  | 'childImageSharp___internal___fieldOwners'
  | 'childImageSharp___internal___ignoreType'
  | 'childImageSharp___internal___mediaType'
  | 'childImageSharp___internal___owner'
  | 'childImageSharp___internal___type'
  | 'childrenConsensusBountyHuntersCsv'
  | 'childrenConsensusBountyHuntersCsv___username'
  | 'childrenConsensusBountyHuntersCsv___name'
  | 'childrenConsensusBountyHuntersCsv___score'
  | 'childrenConsensusBountyHuntersCsv___id'
  | 'childrenConsensusBountyHuntersCsv___parent___id'
  | 'childrenConsensusBountyHuntersCsv___parent___parent___id'
  | 'childrenConsensusBountyHuntersCsv___parent___parent___children'
  | 'childrenConsensusBountyHuntersCsv___parent___children'
  | 'childrenConsensusBountyHuntersCsv___parent___children___id'
  | 'childrenConsensusBountyHuntersCsv___parent___children___children'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___content'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___contentDigest'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___description'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___fieldOwners'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___ignoreType'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___mediaType'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___owner'
  | 'childrenConsensusBountyHuntersCsv___parent___internal___type'
  | 'childrenConsensusBountyHuntersCsv___children'
  | 'childrenConsensusBountyHuntersCsv___children___id'
  | 'childrenConsensusBountyHuntersCsv___children___parent___id'
  | 'childrenConsensusBountyHuntersCsv___children___parent___children'
  | 'childrenConsensusBountyHuntersCsv___children___children'
  | 'childrenConsensusBountyHuntersCsv___children___children___id'
  | 'childrenConsensusBountyHuntersCsv___children___children___children'
  | 'childrenConsensusBountyHuntersCsv___children___internal___content'
  | 'childrenConsensusBountyHuntersCsv___children___internal___contentDigest'
  | 'childrenConsensusBountyHuntersCsv___children___internal___description'
  | 'childrenConsensusBountyHuntersCsv___children___internal___fieldOwners'
  | 'childrenConsensusBountyHuntersCsv___children___internal___ignoreType'
  | 'childrenConsensusBountyHuntersCsv___children___internal___mediaType'
  | 'childrenConsensusBountyHuntersCsv___children___internal___owner'
  | 'childrenConsensusBountyHuntersCsv___children___internal___type'
  | 'childrenConsensusBountyHuntersCsv___internal___content'
  | 'childrenConsensusBountyHuntersCsv___internal___contentDigest'
  | 'childrenConsensusBountyHuntersCsv___internal___description'
  | 'childrenConsensusBountyHuntersCsv___internal___fieldOwners'
  | 'childrenConsensusBountyHuntersCsv___internal___ignoreType'
  | 'childrenConsensusBountyHuntersCsv___internal___mediaType'
  | 'childrenConsensusBountyHuntersCsv___internal___owner'
  | 'childrenConsensusBountyHuntersCsv___internal___type'
  | 'childConsensusBountyHuntersCsv___username'
  | 'childConsensusBountyHuntersCsv___name'
  | 'childConsensusBountyHuntersCsv___score'
  | 'childConsensusBountyHuntersCsv___id'
  | 'childConsensusBountyHuntersCsv___parent___id'
  | 'childConsensusBountyHuntersCsv___parent___parent___id'
  | 'childConsensusBountyHuntersCsv___parent___parent___children'
  | 'childConsensusBountyHuntersCsv___parent___children'
  | 'childConsensusBountyHuntersCsv___parent___children___id'
  | 'childConsensusBountyHuntersCsv___parent___children___children'
  | 'childConsensusBountyHuntersCsv___parent___internal___content'
  | 'childConsensusBountyHuntersCsv___parent___internal___contentDigest'
  | 'childConsensusBountyHuntersCsv___parent___internal___description'
  | 'childConsensusBountyHuntersCsv___parent___internal___fieldOwners'
  | 'childConsensusBountyHuntersCsv___parent___internal___ignoreType'
  | 'childConsensusBountyHuntersCsv___parent___internal___mediaType'
  | 'childConsensusBountyHuntersCsv___parent___internal___owner'
  | 'childConsensusBountyHuntersCsv___parent___internal___type'
  | 'childConsensusBountyHuntersCsv___children'
  | 'childConsensusBountyHuntersCsv___children___id'
  | 'childConsensusBountyHuntersCsv___children___parent___id'
  | 'childConsensusBountyHuntersCsv___children___parent___children'
  | 'childConsensusBountyHuntersCsv___children___children'
  | 'childConsensusBountyHuntersCsv___children___children___id'
  | 'childConsensusBountyHuntersCsv___children___children___children'
  | 'childConsensusBountyHuntersCsv___children___internal___content'
  | 'childConsensusBountyHuntersCsv___children___internal___contentDigest'
  | 'childConsensusBountyHuntersCsv___children___internal___description'
  | 'childConsensusBountyHuntersCsv___children___internal___fieldOwners'
  | 'childConsensusBountyHuntersCsv___children___internal___ignoreType'
  | 'childConsensusBountyHuntersCsv___children___internal___mediaType'
  | 'childConsensusBountyHuntersCsv___children___internal___owner'
  | 'childConsensusBountyHuntersCsv___children___internal___type'
  | 'childConsensusBountyHuntersCsv___internal___content'
  | 'childConsensusBountyHuntersCsv___internal___contentDigest'
  | 'childConsensusBountyHuntersCsv___internal___description'
  | 'childConsensusBountyHuntersCsv___internal___fieldOwners'
  | 'childConsensusBountyHuntersCsv___internal___ignoreType'
  | 'childConsensusBountyHuntersCsv___internal___mediaType'
  | 'childConsensusBountyHuntersCsv___internal___owner'
  | 'childConsensusBountyHuntersCsv___internal___type'
  | 'childrenExecutionBountyHuntersCsv'
  | 'childrenExecutionBountyHuntersCsv___username'
  | 'childrenExecutionBountyHuntersCsv___name'
  | 'childrenExecutionBountyHuntersCsv___score'
  | 'childrenExecutionBountyHuntersCsv___id'
  | 'childrenExecutionBountyHuntersCsv___parent___id'
  | 'childrenExecutionBountyHuntersCsv___parent___parent___id'
  | 'childrenExecutionBountyHuntersCsv___parent___parent___children'
  | 'childrenExecutionBountyHuntersCsv___parent___children'
  | 'childrenExecutionBountyHuntersCsv___parent___children___id'
  | 'childrenExecutionBountyHuntersCsv___parent___children___children'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___content'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___contentDigest'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___description'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___fieldOwners'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___ignoreType'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___mediaType'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___owner'
  | 'childrenExecutionBountyHuntersCsv___parent___internal___type'
  | 'childrenExecutionBountyHuntersCsv___children'
  | 'childrenExecutionBountyHuntersCsv___children___id'
  | 'childrenExecutionBountyHuntersCsv___children___parent___id'
  | 'childrenExecutionBountyHuntersCsv___children___parent___children'
  | 'childrenExecutionBountyHuntersCsv___children___children'
  | 'childrenExecutionBountyHuntersCsv___children___children___id'
  | 'childrenExecutionBountyHuntersCsv___children___children___children'
  | 'childrenExecutionBountyHuntersCsv___children___internal___content'
  | 'childrenExecutionBountyHuntersCsv___children___internal___contentDigest'
  | 'childrenExecutionBountyHuntersCsv___children___internal___description'
  | 'childrenExecutionBountyHuntersCsv___children___internal___fieldOwners'
  | 'childrenExecutionBountyHuntersCsv___children___internal___ignoreType'
  | 'childrenExecutionBountyHuntersCsv___children___internal___mediaType'
  | 'childrenExecutionBountyHuntersCsv___children___internal___owner'
  | 'childrenExecutionBountyHuntersCsv___children___internal___type'
  | 'childrenExecutionBountyHuntersCsv___internal___content'
  | 'childrenExecutionBountyHuntersCsv___internal___contentDigest'
  | 'childrenExecutionBountyHuntersCsv___internal___description'
  | 'childrenExecutionBountyHuntersCsv___internal___fieldOwners'
  | 'childrenExecutionBountyHuntersCsv___internal___ignoreType'
  | 'childrenExecutionBountyHuntersCsv___internal___mediaType'
  | 'childrenExecutionBountyHuntersCsv___internal___owner'
  | 'childrenExecutionBountyHuntersCsv___internal___type'
  | 'childExecutionBountyHuntersCsv___username'
  | 'childExecutionBountyHuntersCsv___name'
  | 'childExecutionBountyHuntersCsv___score'
  | 'childExecutionBountyHuntersCsv___id'
  | 'childExecutionBountyHuntersCsv___parent___id'
  | 'childExecutionBountyHuntersCsv___parent___parent___id'
  | 'childExecutionBountyHuntersCsv___parent___parent___children'
  | 'childExecutionBountyHuntersCsv___parent___children'
  | 'childExecutionBountyHuntersCsv___parent___children___id'
  | 'childExecutionBountyHuntersCsv___parent___children___children'
  | 'childExecutionBountyHuntersCsv___parent___internal___content'
  | 'childExecutionBountyHuntersCsv___parent___internal___contentDigest'
  | 'childExecutionBountyHuntersCsv___parent___internal___description'
  | 'childExecutionBountyHuntersCsv___parent___internal___fieldOwners'
  | 'childExecutionBountyHuntersCsv___parent___internal___ignoreType'
  | 'childExecutionBountyHuntersCsv___parent___internal___mediaType'
  | 'childExecutionBountyHuntersCsv___parent___internal___owner'
  | 'childExecutionBountyHuntersCsv___parent___internal___type'
  | 'childExecutionBountyHuntersCsv___children'
  | 'childExecutionBountyHuntersCsv___children___id'
  | 'childExecutionBountyHuntersCsv___children___parent___id'
  | 'childExecutionBountyHuntersCsv___children___parent___children'
  | 'childExecutionBountyHuntersCsv___children___children'
  | 'childExecutionBountyHuntersCsv___children___children___id'
  | 'childExecutionBountyHuntersCsv___children___children___children'
  | 'childExecutionBountyHuntersCsv___children___internal___content'
  | 'childExecutionBountyHuntersCsv___children___internal___contentDigest'
  | 'childExecutionBountyHuntersCsv___children___internal___description'
  | 'childExecutionBountyHuntersCsv___children___internal___fieldOwners'
  | 'childExecutionBountyHuntersCsv___children___internal___ignoreType'
  | 'childExecutionBountyHuntersCsv___children___internal___mediaType'
  | 'childExecutionBountyHuntersCsv___children___internal___owner'
  | 'childExecutionBountyHuntersCsv___children___internal___type'
  | 'childExecutionBountyHuntersCsv___internal___content'
  | 'childExecutionBountyHuntersCsv___internal___contentDigest'
  | 'childExecutionBountyHuntersCsv___internal___description'
  | 'childExecutionBountyHuntersCsv___internal___fieldOwners'
  | 'childExecutionBountyHuntersCsv___internal___ignoreType'
  | 'childExecutionBountyHuntersCsv___internal___mediaType'
  | 'childExecutionBountyHuntersCsv___internal___owner'
  | 'childExecutionBountyHuntersCsv___internal___type'
  | 'childrenWalletsCsv'
  | 'childrenWalletsCsv___id'
  | 'childrenWalletsCsv___parent___id'
  | 'childrenWalletsCsv___parent___parent___id'
  | 'childrenWalletsCsv___parent___parent___children'
  | 'childrenWalletsCsv___parent___children'
  | 'childrenWalletsCsv___parent___children___id'
  | 'childrenWalletsCsv___parent___children___children'
  | 'childrenWalletsCsv___parent___internal___content'
  | 'childrenWalletsCsv___parent___internal___contentDigest'
  | 'childrenWalletsCsv___parent___internal___description'
  | 'childrenWalletsCsv___parent___internal___fieldOwners'
  | 'childrenWalletsCsv___parent___internal___ignoreType'
  | 'childrenWalletsCsv___parent___internal___mediaType'
  | 'childrenWalletsCsv___parent___internal___owner'
  | 'childrenWalletsCsv___parent___internal___type'
  | 'childrenWalletsCsv___children'
  | 'childrenWalletsCsv___children___id'
  | 'childrenWalletsCsv___children___parent___id'
  | 'childrenWalletsCsv___children___parent___children'
  | 'childrenWalletsCsv___children___children'
  | 'childrenWalletsCsv___children___children___id'
  | 'childrenWalletsCsv___children___children___children'
  | 'childrenWalletsCsv___children___internal___content'
  | 'childrenWalletsCsv___children___internal___contentDigest'
  | 'childrenWalletsCsv___children___internal___description'
  | 'childrenWalletsCsv___children___internal___fieldOwners'
  | 'childrenWalletsCsv___children___internal___ignoreType'
  | 'childrenWalletsCsv___children___internal___mediaType'
  | 'childrenWalletsCsv___children___internal___owner'
  | 'childrenWalletsCsv___children___internal___type'
  | 'childrenWalletsCsv___internal___content'
  | 'childrenWalletsCsv___internal___contentDigest'
  | 'childrenWalletsCsv___internal___description'
  | 'childrenWalletsCsv___internal___fieldOwners'
  | 'childrenWalletsCsv___internal___ignoreType'
  | 'childrenWalletsCsv___internal___mediaType'
  | 'childrenWalletsCsv___internal___owner'
  | 'childrenWalletsCsv___internal___type'
  | 'childrenWalletsCsv___name'
  | 'childrenWalletsCsv___url'
  | 'childrenWalletsCsv___brand_color'
  | 'childrenWalletsCsv___has_mobile'
  | 'childrenWalletsCsv___has_desktop'
  | 'childrenWalletsCsv___has_web'
  | 'childrenWalletsCsv___has_hardware'
  | 'childrenWalletsCsv___has_card_deposits'
  | 'childrenWalletsCsv___has_explore_dapps'
  | 'childrenWalletsCsv___has_defi_integrations'
  | 'childrenWalletsCsv___has_bank_withdrawals'
  | 'childrenWalletsCsv___has_limits_protection'
  | 'childrenWalletsCsv___has_high_volume_purchases'
  | 'childrenWalletsCsv___has_multisig'
  | 'childrenWalletsCsv___has_dex_integrations'
  | 'childWalletsCsv___id'
  | 'childWalletsCsv___parent___id'
  | 'childWalletsCsv___parent___parent___id'
  | 'childWalletsCsv___parent___parent___children'
  | 'childWalletsCsv___parent___children'
  | 'childWalletsCsv___parent___children___id'
  | 'childWalletsCsv___parent___children___children'
  | 'childWalletsCsv___parent___internal___content'
  | 'childWalletsCsv___parent___internal___contentDigest'
  | 'childWalletsCsv___parent___internal___description'
  | 'childWalletsCsv___parent___internal___fieldOwners'
  | 'childWalletsCsv___parent___internal___ignoreType'
  | 'childWalletsCsv___parent___internal___mediaType'
  | 'childWalletsCsv___parent___internal___owner'
  | 'childWalletsCsv___parent___internal___type'
  | 'childWalletsCsv___children'
  | 'childWalletsCsv___children___id'
  | 'childWalletsCsv___children___parent___id'
  | 'childWalletsCsv___children___parent___children'
  | 'childWalletsCsv___children___children'
  | 'childWalletsCsv___children___children___id'
  | 'childWalletsCsv___children___children___children'
  | 'childWalletsCsv___children___internal___content'
  | 'childWalletsCsv___children___internal___contentDigest'
  | 'childWalletsCsv___children___internal___description'
  | 'childWalletsCsv___children___internal___fieldOwners'
  | 'childWalletsCsv___children___internal___ignoreType'
  | 'childWalletsCsv___children___internal___mediaType'
  | 'childWalletsCsv___children___internal___owner'
  | 'childWalletsCsv___children___internal___type'
  | 'childWalletsCsv___internal___content'
  | 'childWalletsCsv___internal___contentDigest'
  | 'childWalletsCsv___internal___description'
  | 'childWalletsCsv___internal___fieldOwners'
  | 'childWalletsCsv___internal___ignoreType'
  | 'childWalletsCsv___internal___mediaType'
  | 'childWalletsCsv___internal___owner'
  | 'childWalletsCsv___internal___type'
  | 'childWalletsCsv___name'
  | 'childWalletsCsv___url'
  | 'childWalletsCsv___brand_color'
  | 'childWalletsCsv___has_mobile'
  | 'childWalletsCsv___has_desktop'
  | 'childWalletsCsv___has_web'
  | 'childWalletsCsv___has_hardware'
  | 'childWalletsCsv___has_card_deposits'
  | 'childWalletsCsv___has_explore_dapps'
  | 'childWalletsCsv___has_defi_integrations'
  | 'childWalletsCsv___has_bank_withdrawals'
  | 'childWalletsCsv___has_limits_protection'
  | 'childWalletsCsv___has_high_volume_purchases'
  | 'childWalletsCsv___has_multisig'
  | 'childWalletsCsv___has_dex_integrations'
  | 'childrenQuarterJson'
  | 'childrenQuarterJson___id'
  | 'childrenQuarterJson___parent___id'
  | 'childrenQuarterJson___parent___parent___id'
  | 'childrenQuarterJson___parent___parent___children'
  | 'childrenQuarterJson___parent___children'
  | 'childrenQuarterJson___parent___children___id'
  | 'childrenQuarterJson___parent___children___children'
  | 'childrenQuarterJson___parent___internal___content'
  | 'childrenQuarterJson___parent___internal___contentDigest'
  | 'childrenQuarterJson___parent___internal___description'
  | 'childrenQuarterJson___parent___internal___fieldOwners'
  | 'childrenQuarterJson___parent___internal___ignoreType'
  | 'childrenQuarterJson___parent___internal___mediaType'
  | 'childrenQuarterJson___parent___internal___owner'
  | 'childrenQuarterJson___parent___internal___type'
  | 'childrenQuarterJson___children'
  | 'childrenQuarterJson___children___id'
  | 'childrenQuarterJson___children___parent___id'
  | 'childrenQuarterJson___children___parent___children'
  | 'childrenQuarterJson___children___children'
  | 'childrenQuarterJson___children___children___id'
  | 'childrenQuarterJson___children___children___children'
  | 'childrenQuarterJson___children___internal___content'
  | 'childrenQuarterJson___children___internal___contentDigest'
  | 'childrenQuarterJson___children___internal___description'
  | 'childrenQuarterJson___children___internal___fieldOwners'
  | 'childrenQuarterJson___children___internal___ignoreType'
  | 'childrenQuarterJson___children___internal___mediaType'
  | 'childrenQuarterJson___children___internal___owner'
  | 'childrenQuarterJson___children___internal___type'
  | 'childrenQuarterJson___internal___content'
  | 'childrenQuarterJson___internal___contentDigest'
  | 'childrenQuarterJson___internal___description'
  | 'childrenQuarterJson___internal___fieldOwners'
  | 'childrenQuarterJson___internal___ignoreType'
  | 'childrenQuarterJson___internal___mediaType'
  | 'childrenQuarterJson___internal___owner'
  | 'childrenQuarterJson___internal___type'
  | 'childrenQuarterJson___name'
  | 'childrenQuarterJson___url'
  | 'childrenQuarterJson___unit'
  | 'childrenQuarterJson___dateRange___from'
  | 'childrenQuarterJson___dateRange___to'
  | 'childrenQuarterJson___currency'
  | 'childrenQuarterJson___mode'
  | 'childrenQuarterJson___totalCosts'
  | 'childrenQuarterJson___totalTMSavings'
  | 'childrenQuarterJson___totalPreTranslated'
  | 'childrenQuarterJson___data'
  | 'childrenQuarterJson___data___user___id'
  | 'childrenQuarterJson___data___user___username'
  | 'childrenQuarterJson___data___user___fullName'
  | 'childrenQuarterJson___data___user___userRole'
  | 'childrenQuarterJson___data___user___avatarUrl'
  | 'childrenQuarterJson___data___user___preTranslated'
  | 'childrenQuarterJson___data___user___totalCosts'
  | 'childrenQuarterJson___data___languages'
  | 'childQuarterJson___id'
  | 'childQuarterJson___parent___id'
  | 'childQuarterJson___parent___parent___id'
  | 'childQuarterJson___parent___parent___children'
  | 'childQuarterJson___parent___children'
  | 'childQuarterJson___parent___children___id'
  | 'childQuarterJson___parent___children___children'
  | 'childQuarterJson___parent___internal___content'
  | 'childQuarterJson___parent___internal___contentDigest'
  | 'childQuarterJson___parent___internal___description'
  | 'childQuarterJson___parent___internal___fieldOwners'
  | 'childQuarterJson___parent___internal___ignoreType'
  | 'childQuarterJson___parent___internal___mediaType'
  | 'childQuarterJson___parent___internal___owner'
  | 'childQuarterJson___parent___internal___type'
  | 'childQuarterJson___children'
  | 'childQuarterJson___children___id'
  | 'childQuarterJson___children___parent___id'
  | 'childQuarterJson___children___parent___children'
  | 'childQuarterJson___children___children'
  | 'childQuarterJson___children___children___id'
  | 'childQuarterJson___children___children___children'
  | 'childQuarterJson___children___internal___content'
  | 'childQuarterJson___children___internal___contentDigest'
  | 'childQuarterJson___children___internal___description'
  | 'childQuarterJson___children___internal___fieldOwners'
  | 'childQuarterJson___children___internal___ignoreType'
  | 'childQuarterJson___children___internal___mediaType'
  | 'childQuarterJson___children___internal___owner'
  | 'childQuarterJson___children___internal___type'
  | 'childQuarterJson___internal___content'
  | 'childQuarterJson___internal___contentDigest'
  | 'childQuarterJson___internal___description'
  | 'childQuarterJson___internal___fieldOwners'
  | 'childQuarterJson___internal___ignoreType'
  | 'childQuarterJson___internal___mediaType'
  | 'childQuarterJson___internal___owner'
  | 'childQuarterJson___internal___type'
  | 'childQuarterJson___name'
  | 'childQuarterJson___url'
  | 'childQuarterJson___unit'
  | 'childQuarterJson___dateRange___from'
  | 'childQuarterJson___dateRange___to'
  | 'childQuarterJson___currency'
  | 'childQuarterJson___mode'
  | 'childQuarterJson___totalCosts'
  | 'childQuarterJson___totalTMSavings'
  | 'childQuarterJson___totalPreTranslated'
  | 'childQuarterJson___data'
  | 'childQuarterJson___data___user___id'
  | 'childQuarterJson___data___user___username'
  | 'childQuarterJson___data___user___fullName'
  | 'childQuarterJson___data___user___userRole'
  | 'childQuarterJson___data___user___avatarUrl'
  | 'childQuarterJson___data___user___preTranslated'
  | 'childQuarterJson___data___user___totalCosts'
  | 'childQuarterJson___data___languages'
  | 'childrenMonthJson'
  | 'childrenMonthJson___id'
  | 'childrenMonthJson___parent___id'
  | 'childrenMonthJson___parent___parent___id'
  | 'childrenMonthJson___parent___parent___children'
  | 'childrenMonthJson___parent___children'
  | 'childrenMonthJson___parent___children___id'
  | 'childrenMonthJson___parent___children___children'
  | 'childrenMonthJson___parent___internal___content'
  | 'childrenMonthJson___parent___internal___contentDigest'
  | 'childrenMonthJson___parent___internal___description'
  | 'childrenMonthJson___parent___internal___fieldOwners'
  | 'childrenMonthJson___parent___internal___ignoreType'
  | 'childrenMonthJson___parent___internal___mediaType'
  | 'childrenMonthJson___parent___internal___owner'
  | 'childrenMonthJson___parent___internal___type'
  | 'childrenMonthJson___children'
  | 'childrenMonthJson___children___id'
  | 'childrenMonthJson___children___parent___id'
  | 'childrenMonthJson___children___parent___children'
  | 'childrenMonthJson___children___children'
  | 'childrenMonthJson___children___children___id'
  | 'childrenMonthJson___children___children___children'
  | 'childrenMonthJson___children___internal___content'
  | 'childrenMonthJson___children___internal___contentDigest'
  | 'childrenMonthJson___children___internal___description'
  | 'childrenMonthJson___children___internal___fieldOwners'
  | 'childrenMonthJson___children___internal___ignoreType'
  | 'childrenMonthJson___children___internal___mediaType'
  | 'childrenMonthJson___children___internal___owner'
  | 'childrenMonthJson___children___internal___type'
  | 'childrenMonthJson___internal___content'
  | 'childrenMonthJson___internal___contentDigest'
  | 'childrenMonthJson___internal___description'
  | 'childrenMonthJson___internal___fieldOwners'
  | 'childrenMonthJson___internal___ignoreType'
  | 'childrenMonthJson___internal___mediaType'
  | 'childrenMonthJson___internal___owner'
  | 'childrenMonthJson___internal___type'
  | 'childrenMonthJson___name'
  | 'childrenMonthJson___url'
  | 'childrenMonthJson___unit'
  | 'childrenMonthJson___dateRange___from'
  | 'childrenMonthJson___dateRange___to'
  | 'childrenMonthJson___currency'
  | 'childrenMonthJson___mode'
  | 'childrenMonthJson___totalCosts'
  | 'childrenMonthJson___totalTMSavings'
  | 'childrenMonthJson___totalPreTranslated'
  | 'childrenMonthJson___data'
  | 'childrenMonthJson___data___user___id'
  | 'childrenMonthJson___data___user___username'
  | 'childrenMonthJson___data___user___fullName'
  | 'childrenMonthJson___data___user___userRole'
  | 'childrenMonthJson___data___user___avatarUrl'
  | 'childrenMonthJson___data___user___preTranslated'
  | 'childrenMonthJson___data___user___totalCosts'
  | 'childrenMonthJson___data___languages'
  | 'childMonthJson___id'
  | 'childMonthJson___parent___id'
  | 'childMonthJson___parent___parent___id'
  | 'childMonthJson___parent___parent___children'
  | 'childMonthJson___parent___children'
  | 'childMonthJson___parent___children___id'
  | 'childMonthJson___parent___children___children'
  | 'childMonthJson___parent___internal___content'
  | 'childMonthJson___parent___internal___contentDigest'
  | 'childMonthJson___parent___internal___description'
  | 'childMonthJson___parent___internal___fieldOwners'
  | 'childMonthJson___parent___internal___ignoreType'
  | 'childMonthJson___parent___internal___mediaType'
  | 'childMonthJson___parent___internal___owner'
  | 'childMonthJson___parent___internal___type'
  | 'childMonthJson___children'
  | 'childMonthJson___children___id'
  | 'childMonthJson___children___parent___id'
  | 'childMonthJson___children___parent___children'
  | 'childMonthJson___children___children'
  | 'childMonthJson___children___children___id'
  | 'childMonthJson___children___children___children'
  | 'childMonthJson___children___internal___content'
  | 'childMonthJson___children___internal___contentDigest'
  | 'childMonthJson___children___internal___description'
  | 'childMonthJson___children___internal___fieldOwners'
  | 'childMonthJson___children___internal___ignoreType'
  | 'childMonthJson___children___internal___mediaType'
  | 'childMonthJson___children___internal___owner'
  | 'childMonthJson___children___internal___type'
  | 'childMonthJson___internal___content'
  | 'childMonthJson___internal___contentDigest'
  | 'childMonthJson___internal___description'
  | 'childMonthJson___internal___fieldOwners'
  | 'childMonthJson___internal___ignoreType'
  | 'childMonthJson___internal___mediaType'
  | 'childMonthJson___internal___owner'
  | 'childMonthJson___internal___type'
  | 'childMonthJson___name'
  | 'childMonthJson___url'
  | 'childMonthJson___unit'
  | 'childMonthJson___dateRange___from'
  | 'childMonthJson___dateRange___to'
  | 'childMonthJson___currency'
  | 'childMonthJson___mode'
  | 'childMonthJson___totalCosts'
  | 'childMonthJson___totalTMSavings'
  | 'childMonthJson___totalPreTranslated'
  | 'childMonthJson___data'
  | 'childMonthJson___data___user___id'
  | 'childMonthJson___data___user___username'
  | 'childMonthJson___data___user___fullName'
  | 'childMonthJson___data___user___userRole'
  | 'childMonthJson___data___user___avatarUrl'
  | 'childMonthJson___data___user___preTranslated'
  | 'childMonthJson___data___user___totalCosts'
  | 'childMonthJson___data___languages'
  | 'childrenLayer2Json'
  | 'childrenLayer2Json___id'
  | 'childrenLayer2Json___parent___id'
  | 'childrenLayer2Json___parent___parent___id'
  | 'childrenLayer2Json___parent___parent___children'
  | 'childrenLayer2Json___parent___children'
  | 'childrenLayer2Json___parent___children___id'
  | 'childrenLayer2Json___parent___children___children'
  | 'childrenLayer2Json___parent___internal___content'
  | 'childrenLayer2Json___parent___internal___contentDigest'
  | 'childrenLayer2Json___parent___internal___description'
  | 'childrenLayer2Json___parent___internal___fieldOwners'
  | 'childrenLayer2Json___parent___internal___ignoreType'
  | 'childrenLayer2Json___parent___internal___mediaType'
  | 'childrenLayer2Json___parent___internal___owner'
  | 'childrenLayer2Json___parent___internal___type'
  | 'childrenLayer2Json___children'
  | 'childrenLayer2Json___children___id'
  | 'childrenLayer2Json___children___parent___id'
  | 'childrenLayer2Json___children___parent___children'
  | 'childrenLayer2Json___children___children'
  | 'childrenLayer2Json___children___children___id'
  | 'childrenLayer2Json___children___children___children'
  | 'childrenLayer2Json___children___internal___content'
  | 'childrenLayer2Json___children___internal___contentDigest'
  | 'childrenLayer2Json___children___internal___description'
  | 'childrenLayer2Json___children___internal___fieldOwners'
  | 'childrenLayer2Json___children___internal___ignoreType'
  | 'childrenLayer2Json___children___internal___mediaType'
  | 'childrenLayer2Json___children___internal___owner'
  | 'childrenLayer2Json___children___internal___type'
  | 'childrenLayer2Json___internal___content'
  | 'childrenLayer2Json___internal___contentDigest'
  | 'childrenLayer2Json___internal___description'
  | 'childrenLayer2Json___internal___fieldOwners'
  | 'childrenLayer2Json___internal___ignoreType'
  | 'childrenLayer2Json___internal___mediaType'
  | 'childrenLayer2Json___internal___owner'
  | 'childrenLayer2Json___internal___type'
  | 'childrenLayer2Json___optimistic'
  | 'childrenLayer2Json___optimistic___name'
  | 'childrenLayer2Json___optimistic___website'
  | 'childrenLayer2Json___optimistic___developerDocs'
  | 'childrenLayer2Json___optimistic___l2beat'
  | 'childrenLayer2Json___optimistic___bridge'
  | 'childrenLayer2Json___optimistic___bridgeWallets'
  | 'childrenLayer2Json___optimistic___blockExplorer'
  | 'childrenLayer2Json___optimistic___ecosystemPortal'
  | 'childrenLayer2Json___optimistic___tokenLists'
  | 'childrenLayer2Json___optimistic___noteKey'
  | 'childrenLayer2Json___optimistic___purpose'
  | 'childrenLayer2Json___optimistic___description'
  | 'childrenLayer2Json___optimistic___imageKey'
  | 'childrenLayer2Json___optimistic___background'
  | 'childrenLayer2Json___zk'
  | 'childrenLayer2Json___zk___name'
  | 'childrenLayer2Json___zk___website'
  | 'childrenLayer2Json___zk___developerDocs'
  | 'childrenLayer2Json___zk___l2beat'
  | 'childrenLayer2Json___zk___bridge'
  | 'childrenLayer2Json___zk___bridgeWallets'
  | 'childrenLayer2Json___zk___blockExplorer'
  | 'childrenLayer2Json___zk___ecosystemPortal'
  | 'childrenLayer2Json___zk___tokenLists'
  | 'childrenLayer2Json___zk___noteKey'
  | 'childrenLayer2Json___zk___purpose'
  | 'childrenLayer2Json___zk___description'
  | 'childrenLayer2Json___zk___imageKey'
  | 'childrenLayer2Json___zk___background'
  | 'childLayer2Json___id'
  | 'childLayer2Json___parent___id'
  | 'childLayer2Json___parent___parent___id'
  | 'childLayer2Json___parent___parent___children'
  | 'childLayer2Json___parent___children'
  | 'childLayer2Json___parent___children___id'
  | 'childLayer2Json___parent___children___children'
  | 'childLayer2Json___parent___internal___content'
  | 'childLayer2Json___parent___internal___contentDigest'
  | 'childLayer2Json___parent___internal___description'
  | 'childLayer2Json___parent___internal___fieldOwners'
  | 'childLayer2Json___parent___internal___ignoreType'
  | 'childLayer2Json___parent___internal___mediaType'
  | 'childLayer2Json___parent___internal___owner'
  | 'childLayer2Json___parent___internal___type'
  | 'childLayer2Json___children'
  | 'childLayer2Json___children___id'
  | 'childLayer2Json___children___parent___id'
  | 'childLayer2Json___children___parent___children'
  | 'childLayer2Json___children___children'
  | 'childLayer2Json___children___children___id'
  | 'childLayer2Json___children___children___children'
  | 'childLayer2Json___children___internal___content'
  | 'childLayer2Json___children___internal___contentDigest'
  | 'childLayer2Json___children___internal___description'
  | 'childLayer2Json___children___internal___fieldOwners'
  | 'childLayer2Json___children___internal___ignoreType'
  | 'childLayer2Json___children___internal___mediaType'
  | 'childLayer2Json___children___internal___owner'
  | 'childLayer2Json___children___internal___type'
  | 'childLayer2Json___internal___content'
  | 'childLayer2Json___internal___contentDigest'
  | 'childLayer2Json___internal___description'
  | 'childLayer2Json___internal___fieldOwners'
  | 'childLayer2Json___internal___ignoreType'
  | 'childLayer2Json___internal___mediaType'
  | 'childLayer2Json___internal___owner'
  | 'childLayer2Json___internal___type'
  | 'childLayer2Json___optimistic'
  | 'childLayer2Json___optimistic___name'
  | 'childLayer2Json___optimistic___website'
  | 'childLayer2Json___optimistic___developerDocs'
  | 'childLayer2Json___optimistic___l2beat'
  | 'childLayer2Json___optimistic___bridge'
  | 'childLayer2Json___optimistic___bridgeWallets'
  | 'childLayer2Json___optimistic___blockExplorer'
  | 'childLayer2Json___optimistic___ecosystemPortal'
  | 'childLayer2Json___optimistic___tokenLists'
  | 'childLayer2Json___optimistic___noteKey'
  | 'childLayer2Json___optimistic___purpose'
  | 'childLayer2Json___optimistic___description'
  | 'childLayer2Json___optimistic___imageKey'
  | 'childLayer2Json___optimistic___background'
  | 'childLayer2Json___zk'
  | 'childLayer2Json___zk___name'
  | 'childLayer2Json___zk___website'
  | 'childLayer2Json___zk___developerDocs'
  | 'childLayer2Json___zk___l2beat'
  | 'childLayer2Json___zk___bridge'
  | 'childLayer2Json___zk___bridgeWallets'
  | 'childLayer2Json___zk___blockExplorer'
  | 'childLayer2Json___zk___ecosystemPortal'
  | 'childLayer2Json___zk___tokenLists'
  | 'childLayer2Json___zk___noteKey'
  | 'childLayer2Json___zk___purpose'
  | 'childLayer2Json___zk___description'
  | 'childLayer2Json___zk___imageKey'
  | 'childLayer2Json___zk___background'
  | 'childrenExternalTutorialsJson'
  | 'childrenExternalTutorialsJson___id'
  | 'childrenExternalTutorialsJson___parent___id'
  | 'childrenExternalTutorialsJson___parent___parent___id'
  | 'childrenExternalTutorialsJson___parent___parent___children'
  | 'childrenExternalTutorialsJson___parent___children'
  | 'childrenExternalTutorialsJson___parent___children___id'
  | 'childrenExternalTutorialsJson___parent___children___children'
  | 'childrenExternalTutorialsJson___parent___internal___content'
  | 'childrenExternalTutorialsJson___parent___internal___contentDigest'
  | 'childrenExternalTutorialsJson___parent___internal___description'
  | 'childrenExternalTutorialsJson___parent___internal___fieldOwners'
  | 'childrenExternalTutorialsJson___parent___internal___ignoreType'
  | 'childrenExternalTutorialsJson___parent___internal___mediaType'
  | 'childrenExternalTutorialsJson___parent___internal___owner'
  | 'childrenExternalTutorialsJson___parent___internal___type'
  | 'childrenExternalTutorialsJson___children'
  | 'childrenExternalTutorialsJson___children___id'
  | 'childrenExternalTutorialsJson___children___parent___id'
  | 'childrenExternalTutorialsJson___children___parent___children'
  | 'childrenExternalTutorialsJson___children___children'
  | 'childrenExternalTutorialsJson___children___children___id'
  | 'childrenExternalTutorialsJson___children___children___children'
  | 'childrenExternalTutorialsJson___children___internal___content'
  | 'childrenExternalTutorialsJson___children___internal___contentDigest'
  | 'childrenExternalTutorialsJson___children___internal___description'
  | 'childrenExternalTutorialsJson___children___internal___fieldOwners'
  | 'childrenExternalTutorialsJson___children___internal___ignoreType'
  | 'childrenExternalTutorialsJson___children___internal___mediaType'
  | 'childrenExternalTutorialsJson___children___internal___owner'
  | 'childrenExternalTutorialsJson___children___internal___type'
  | 'childrenExternalTutorialsJson___internal___content'
  | 'childrenExternalTutorialsJson___internal___contentDigest'
  | 'childrenExternalTutorialsJson___internal___description'
  | 'childrenExternalTutorialsJson___internal___fieldOwners'
  | 'childrenExternalTutorialsJson___internal___ignoreType'
  | 'childrenExternalTutorialsJson___internal___mediaType'
  | 'childrenExternalTutorialsJson___internal___owner'
  | 'childrenExternalTutorialsJson___internal___type'
  | 'childrenExternalTutorialsJson___url'
  | 'childrenExternalTutorialsJson___title'
  | 'childrenExternalTutorialsJson___description'
  | 'childrenExternalTutorialsJson___author'
  | 'childrenExternalTutorialsJson___authorGithub'
  | 'childrenExternalTutorialsJson___tags'
  | 'childrenExternalTutorialsJson___skillLevel'
  | 'childrenExternalTutorialsJson___timeToRead'
  | 'childrenExternalTutorialsJson___lang'
  | 'childrenExternalTutorialsJson___publishDate'
  | 'childExternalTutorialsJson___id'
  | 'childExternalTutorialsJson___parent___id'
  | 'childExternalTutorialsJson___parent___parent___id'
  | 'childExternalTutorialsJson___parent___parent___children'
  | 'childExternalTutorialsJson___parent___children'
  | 'childExternalTutorialsJson___parent___children___id'
  | 'childExternalTutorialsJson___parent___children___children'
  | 'childExternalTutorialsJson___parent___internal___content'
  | 'childExternalTutorialsJson___parent___internal___contentDigest'
  | 'childExternalTutorialsJson___parent___internal___description'
  | 'childExternalTutorialsJson___parent___internal___fieldOwners'
  | 'childExternalTutorialsJson___parent___internal___ignoreType'
  | 'childExternalTutorialsJson___parent___internal___mediaType'
  | 'childExternalTutorialsJson___parent___internal___owner'
  | 'childExternalTutorialsJson___parent___internal___type'
  | 'childExternalTutorialsJson___children'
  | 'childExternalTutorialsJson___children___id'
  | 'childExternalTutorialsJson___children___parent___id'
  | 'childExternalTutorialsJson___children___parent___children'
  | 'childExternalTutorialsJson___children___children'
  | 'childExternalTutorialsJson___children___children___id'
  | 'childExternalTutorialsJson___children___children___children'
  | 'childExternalTutorialsJson___children___internal___content'
  | 'childExternalTutorialsJson___children___internal___contentDigest'
  | 'childExternalTutorialsJson___children___internal___description'
  | 'childExternalTutorialsJson___children___internal___fieldOwners'
  | 'childExternalTutorialsJson___children___internal___ignoreType'
  | 'childExternalTutorialsJson___children___internal___mediaType'
  | 'childExternalTutorialsJson___children___internal___owner'
  | 'childExternalTutorialsJson___children___internal___type'
  | 'childExternalTutorialsJson___internal___content'
  | 'childExternalTutorialsJson___internal___contentDigest'
  | 'childExternalTutorialsJson___internal___description'
  | 'childExternalTutorialsJson___internal___fieldOwners'
  | 'childExternalTutorialsJson___internal___ignoreType'
  | 'childExternalTutorialsJson___internal___mediaType'
  | 'childExternalTutorialsJson___internal___owner'
  | 'childExternalTutorialsJson___internal___type'
  | 'childExternalTutorialsJson___url'
  | 'childExternalTutorialsJson___title'
  | 'childExternalTutorialsJson___description'
  | 'childExternalTutorialsJson___author'
  | 'childExternalTutorialsJson___authorGithub'
  | 'childExternalTutorialsJson___tags'
  | 'childExternalTutorialsJson___skillLevel'
  | 'childExternalTutorialsJson___timeToRead'
  | 'childExternalTutorialsJson___lang'
  | 'childExternalTutorialsJson___publishDate'
  | 'childrenExchangesByCountryCsv'
  | 'childrenExchangesByCountryCsv___id'
  | 'childrenExchangesByCountryCsv___parent___id'
  | 'childrenExchangesByCountryCsv___parent___parent___id'
  | 'childrenExchangesByCountryCsv___parent___parent___children'
  | 'childrenExchangesByCountryCsv___parent___children'
  | 'childrenExchangesByCountryCsv___parent___children___id'
  | 'childrenExchangesByCountryCsv___parent___children___children'
  | 'childrenExchangesByCountryCsv___parent___internal___content'
  | 'childrenExchangesByCountryCsv___parent___internal___contentDigest'
  | 'childrenExchangesByCountryCsv___parent___internal___description'
  | 'childrenExchangesByCountryCsv___parent___internal___fieldOwners'
  | 'childrenExchangesByCountryCsv___parent___internal___ignoreType'
  | 'childrenExchangesByCountryCsv___parent___internal___mediaType'
  | 'childrenExchangesByCountryCsv___parent___internal___owner'
  | 'childrenExchangesByCountryCsv___parent___internal___type'
  | 'childrenExchangesByCountryCsv___children'
  | 'childrenExchangesByCountryCsv___children___id'
  | 'childrenExchangesByCountryCsv___children___parent___id'
  | 'childrenExchangesByCountryCsv___children___parent___children'
  | 'childrenExchangesByCountryCsv___children___children'
  | 'childrenExchangesByCountryCsv___children___children___id'
  | 'childrenExchangesByCountryCsv___children___children___children'
  | 'childrenExchangesByCountryCsv___children___internal___content'
  | 'childrenExchangesByCountryCsv___children___internal___contentDigest'
  | 'childrenExchangesByCountryCsv___children___internal___description'
  | 'childrenExchangesByCountryCsv___children___internal___fieldOwners'
  | 'childrenExchangesByCountryCsv___children___internal___ignoreType'
  | 'childrenExchangesByCountryCsv___children___internal___mediaType'
  | 'childrenExchangesByCountryCsv___children___internal___owner'
  | 'childrenExchangesByCountryCsv___children___internal___type'
  | 'childrenExchangesByCountryCsv___internal___content'
  | 'childrenExchangesByCountryCsv___internal___contentDigest'
  | 'childrenExchangesByCountryCsv___internal___description'
  | 'childrenExchangesByCountryCsv___internal___fieldOwners'
  | 'childrenExchangesByCountryCsv___internal___ignoreType'
  | 'childrenExchangesByCountryCsv___internal___mediaType'
  | 'childrenExchangesByCountryCsv___internal___owner'
  | 'childrenExchangesByCountryCsv___internal___type'
  | 'childrenExchangesByCountryCsv___country'
  | 'childrenExchangesByCountryCsv___coinmama'
  | 'childrenExchangesByCountryCsv___bittrex'
  | 'childrenExchangesByCountryCsv___simplex'
  | 'childrenExchangesByCountryCsv___wyre'
  | 'childrenExchangesByCountryCsv___moonpay'
  | 'childrenExchangesByCountryCsv___coinbase'
  | 'childrenExchangesByCountryCsv___kraken'
  | 'childrenExchangesByCountryCsv___gemini'
  | 'childrenExchangesByCountryCsv___binance'
  | 'childrenExchangesByCountryCsv___binanceus'
  | 'childrenExchangesByCountryCsv___bitbuy'
  | 'childrenExchangesByCountryCsv___rain'
  | 'childrenExchangesByCountryCsv___cryptocom'
  | 'childrenExchangesByCountryCsv___itezcom'
  | 'childrenExchangesByCountryCsv___coinspot'
  | 'childrenExchangesByCountryCsv___bitvavo'
  | 'childrenExchangesByCountryCsv___mtpelerin'
  | 'childrenExchangesByCountryCsv___wazirx'
  | 'childrenExchangesByCountryCsv___bitflyer'
  | 'childrenExchangesByCountryCsv___easycrypto'
  | 'childrenExchangesByCountryCsv___okx'
  | 'childrenExchangesByCountryCsv___kucoin'
  | 'childrenExchangesByCountryCsv___ftx'
  | 'childrenExchangesByCountryCsv___huobiglobal'
  | 'childrenExchangesByCountryCsv___gateio'
  | 'childrenExchangesByCountryCsv___bitfinex'
  | 'childrenExchangesByCountryCsv___bybit'
  | 'childrenExchangesByCountryCsv___bitkub'
  | 'childrenExchangesByCountryCsv___bitso'
  | 'childrenExchangesByCountryCsv___ftxus'
  | 'childExchangesByCountryCsv___id'
  | 'childExchangesByCountryCsv___parent___id'
  | 'childExchangesByCountryCsv___parent___parent___id'
  | 'childExchangesByCountryCsv___parent___parent___children'
  | 'childExchangesByCountryCsv___parent___children'
  | 'childExchangesByCountryCsv___parent___children___id'
  | 'childExchangesByCountryCsv___parent___children___children'
  | 'childExchangesByCountryCsv___parent___internal___content'
  | 'childExchangesByCountryCsv___parent___internal___contentDigest'
  | 'childExchangesByCountryCsv___parent___internal___description'
  | 'childExchangesByCountryCsv___parent___internal___fieldOwners'
  | 'childExchangesByCountryCsv___parent___internal___ignoreType'
  | 'childExchangesByCountryCsv___parent___internal___mediaType'
  | 'childExchangesByCountryCsv___parent___internal___owner'
  | 'childExchangesByCountryCsv___parent___internal___type'
  | 'childExchangesByCountryCsv___children'
  | 'childExchangesByCountryCsv___children___id'
  | 'childExchangesByCountryCsv___children___parent___id'
  | 'childExchangesByCountryCsv___children___parent___children'
  | 'childExchangesByCountryCsv___children___children'
  | 'childExchangesByCountryCsv___children___children___id'
  | 'childExchangesByCountryCsv___children___children___children'
  | 'childExchangesByCountryCsv___children___internal___content'
  | 'childExchangesByCountryCsv___children___internal___contentDigest'
  | 'childExchangesByCountryCsv___children___internal___description'
  | 'childExchangesByCountryCsv___children___internal___fieldOwners'
  | 'childExchangesByCountryCsv___children___internal___ignoreType'
  | 'childExchangesByCountryCsv___children___internal___mediaType'
  | 'childExchangesByCountryCsv___children___internal___owner'
  | 'childExchangesByCountryCsv___children___internal___type'
  | 'childExchangesByCountryCsv___internal___content'
  | 'childExchangesByCountryCsv___internal___contentDigest'
  | 'childExchangesByCountryCsv___internal___description'
  | 'childExchangesByCountryCsv___internal___fieldOwners'
  | 'childExchangesByCountryCsv___internal___ignoreType'
  | 'childExchangesByCountryCsv___internal___mediaType'
  | 'childExchangesByCountryCsv___internal___owner'
  | 'childExchangesByCountryCsv___internal___type'
  | 'childExchangesByCountryCsv___country'
  | 'childExchangesByCountryCsv___coinmama'
  | 'childExchangesByCountryCsv___bittrex'
  | 'childExchangesByCountryCsv___simplex'
  | 'childExchangesByCountryCsv___wyre'
  | 'childExchangesByCountryCsv___moonpay'
  | 'childExchangesByCountryCsv___coinbase'
  | 'childExchangesByCountryCsv___kraken'
  | 'childExchangesByCountryCsv___gemini'
  | 'childExchangesByCountryCsv___binance'
  | 'childExchangesByCountryCsv___binanceus'
  | 'childExchangesByCountryCsv___bitbuy'
  | 'childExchangesByCountryCsv___rain'
  | 'childExchangesByCountryCsv___cryptocom'
  | 'childExchangesByCountryCsv___itezcom'
  | 'childExchangesByCountryCsv___coinspot'
  | 'childExchangesByCountryCsv___bitvavo'
  | 'childExchangesByCountryCsv___mtpelerin'
  | 'childExchangesByCountryCsv___wazirx'
  | 'childExchangesByCountryCsv___bitflyer'
  | 'childExchangesByCountryCsv___easycrypto'
  | 'childExchangesByCountryCsv___okx'
  | 'childExchangesByCountryCsv___kucoin'
  | 'childExchangesByCountryCsv___ftx'
  | 'childExchangesByCountryCsv___huobiglobal'
  | 'childExchangesByCountryCsv___gateio'
  | 'childExchangesByCountryCsv___bitfinex'
  | 'childExchangesByCountryCsv___bybit'
  | 'childExchangesByCountryCsv___bitkub'
  | 'childExchangesByCountryCsv___bitso'
  | 'childExchangesByCountryCsv___ftxus'
  | 'childrenDataJson'
  | 'childrenDataJson___id'
  | 'childrenDataJson___parent___id'
  | 'childrenDataJson___parent___parent___id'
  | 'childrenDataJson___parent___parent___children'
  | 'childrenDataJson___parent___children'
  | 'childrenDataJson___parent___children___id'
  | 'childrenDataJson___parent___children___children'
  | 'childrenDataJson___parent___internal___content'
  | 'childrenDataJson___parent___internal___contentDigest'
  | 'childrenDataJson___parent___internal___description'
  | 'childrenDataJson___parent___internal___fieldOwners'
  | 'childrenDataJson___parent___internal___ignoreType'
  | 'childrenDataJson___parent___internal___mediaType'
  | 'childrenDataJson___parent___internal___owner'
  | 'childrenDataJson___parent___internal___type'
  | 'childrenDataJson___children'
  | 'childrenDataJson___children___id'
  | 'childrenDataJson___children___parent___id'
  | 'childrenDataJson___children___parent___children'
  | 'childrenDataJson___children___children'
  | 'childrenDataJson___children___children___id'
  | 'childrenDataJson___children___children___children'
  | 'childrenDataJson___children___internal___content'
  | 'childrenDataJson___children___internal___contentDigest'
  | 'childrenDataJson___children___internal___description'
  | 'childrenDataJson___children___internal___fieldOwners'
  | 'childrenDataJson___children___internal___ignoreType'
  | 'childrenDataJson___children___internal___mediaType'
  | 'childrenDataJson___children___internal___owner'
  | 'childrenDataJson___children___internal___type'
  | 'childrenDataJson___internal___content'
  | 'childrenDataJson___internal___contentDigest'
  | 'childrenDataJson___internal___description'
  | 'childrenDataJson___internal___fieldOwners'
  | 'childrenDataJson___internal___ignoreType'
  | 'childrenDataJson___internal___mediaType'
  | 'childrenDataJson___internal___owner'
  | 'childrenDataJson___internal___type'
  | 'childrenDataJson___files'
  | 'childrenDataJson___imageSize'
  | 'childrenDataJson___commit'
  | 'childrenDataJson___contributors'
  | 'childrenDataJson___contributors___login'
  | 'childrenDataJson___contributors___name'
  | 'childrenDataJson___contributors___avatar_url'
  | 'childrenDataJson___contributors___profile'
  | 'childrenDataJson___contributors___contributions'
  | 'childrenDataJson___contributorsPerLine'
  | 'childrenDataJson___projectName'
  | 'childrenDataJson___projectOwner'
  | 'childrenDataJson___repoType'
  | 'childrenDataJson___repoHost'
  | 'childrenDataJson___skipCi'
  | 'childrenDataJson___nodeTools'
  | 'childrenDataJson___nodeTools___name'
  | 'childrenDataJson___nodeTools___svgPath'
  | 'childrenDataJson___nodeTools___hue'
  | 'childrenDataJson___nodeTools___launchDate'
  | 'childrenDataJson___nodeTools___url'
  | 'childrenDataJson___nodeTools___audits'
  | 'childrenDataJson___nodeTools___audits___name'
  | 'childrenDataJson___nodeTools___audits___url'
  | 'childrenDataJson___nodeTools___minEth'
  | 'childrenDataJson___nodeTools___additionalStake'
  | 'childrenDataJson___nodeTools___additionalStakeUnit'
  | 'childrenDataJson___nodeTools___tokens'
  | 'childrenDataJson___nodeTools___tokens___name'
  | 'childrenDataJson___nodeTools___tokens___symbol'
  | 'childrenDataJson___nodeTools___tokens___address'
  | 'childrenDataJson___nodeTools___isFoss'
  | 'childrenDataJson___nodeTools___hasBugBounty'
  | 'childrenDataJson___nodeTools___isTrustless'
  | 'childrenDataJson___nodeTools___isPermissionless'
  | 'childrenDataJson___nodeTools___multiClient'
  | 'childrenDataJson___nodeTools___easyClientSwitching'
  | 'childrenDataJson___nodeTools___platforms'
  | 'childrenDataJson___nodeTools___ui'
  | 'childrenDataJson___nodeTools___socials___discord'
  | 'childrenDataJson___nodeTools___socials___twitter'
  | 'childrenDataJson___nodeTools___socials___github'
  | 'childrenDataJson___nodeTools___socials___telegram'
  | 'childrenDataJson___nodeTools___matomo___eventCategory'
  | 'childrenDataJson___nodeTools___matomo___eventAction'
  | 'childrenDataJson___nodeTools___matomo___eventName'
  | 'childrenDataJson___keyGen'
  | 'childrenDataJson___keyGen___name'
  | 'childrenDataJson___keyGen___svgPath'
  | 'childrenDataJson___keyGen___hue'
  | 'childrenDataJson___keyGen___launchDate'
  | 'childrenDataJson___keyGen___url'
  | 'childrenDataJson___keyGen___audits'
  | 'childrenDataJson___keyGen___audits___name'
  | 'childrenDataJson___keyGen___audits___url'
  | 'childrenDataJson___keyGen___isFoss'
  | 'childrenDataJson___keyGen___hasBugBounty'
  | 'childrenDataJson___keyGen___isTrustless'
  | 'childrenDataJson___keyGen___isPermissionless'
  | 'childrenDataJson___keyGen___isSelfCustody'
  | 'childrenDataJson___keyGen___platforms'
  | 'childrenDataJson___keyGen___ui'
  | 'childrenDataJson___keyGen___socials___discord'
  | 'childrenDataJson___keyGen___socials___twitter'
  | 'childrenDataJson___keyGen___socials___github'
  | 'childrenDataJson___keyGen___matomo___eventCategory'
  | 'childrenDataJson___keyGen___matomo___eventAction'
  | 'childrenDataJson___keyGen___matomo___eventName'
  | 'childrenDataJson___saas'
  | 'childrenDataJson___saas___name'
  | 'childrenDataJson___saas___svgPath'
  | 'childrenDataJson___saas___hue'
  | 'childrenDataJson___saas___launchDate'
  | 'childrenDataJson___saas___url'
  | 'childrenDataJson___saas___audits'
  | 'childrenDataJson___saas___audits___name'
  | 'childrenDataJson___saas___audits___url'
  | 'childrenDataJson___saas___audits___date'
  | 'childrenDataJson___saas___minEth'
  | 'childrenDataJson___saas___additionalStake'
  | 'childrenDataJson___saas___additionalStakeUnit'
  | 'childrenDataJson___saas___monthlyFee'
  | 'childrenDataJson___saas___monthlyFeeUnit'
  | 'childrenDataJson___saas___isFoss'
  | 'childrenDataJson___saas___hasBugBounty'
  | 'childrenDataJson___saas___isTrustless'
  | 'childrenDataJson___saas___isPermissionless'
  | 'childrenDataJson___saas___pctMajorityClient'
  | 'childrenDataJson___saas___isSelfCustody'
  | 'childrenDataJson___saas___platforms'
  | 'childrenDataJson___saas___ui'
  | 'childrenDataJson___saas___socials___discord'
  | 'childrenDataJson___saas___socials___twitter'
  | 'childrenDataJson___saas___socials___github'
  | 'childrenDataJson___saas___socials___telegram'
  | 'childrenDataJson___saas___matomo___eventCategory'
  | 'childrenDataJson___saas___matomo___eventAction'
  | 'childrenDataJson___saas___matomo___eventName'
  | 'childrenDataJson___pools'
  | 'childrenDataJson___pools___name'
  | 'childrenDataJson___pools___svgPath'
  | 'childrenDataJson___pools___hue'
  | 'childrenDataJson___pools___launchDate'
  | 'childrenDataJson___pools___url'
  | 'childrenDataJson___pools___audits'
  | 'childrenDataJson___pools___audits___name'
  | 'childrenDataJson___pools___audits___url'
  | 'childrenDataJson___pools___audits___date'
  | 'childrenDataJson___pools___minEth'
  | 'childrenDataJson___pools___feePercentage'
  | 'childrenDataJson___pools___tokens'
  | 'childrenDataJson___pools___tokens___name'
  | 'childrenDataJson___pools___tokens___symbol'
  | 'childrenDataJson___pools___tokens___address'
  | 'childrenDataJson___pools___isFoss'
  | 'childrenDataJson___pools___hasBugBounty'
  | 'childrenDataJson___pools___isTrustless'
  | 'childrenDataJson___pools___hasPermissionlessNodes'
  | 'childrenDataJson___pools___pctMajorityClient'
  | 'childrenDataJson___pools___platforms'
  | 'childrenDataJson___pools___ui'
  | 'childrenDataJson___pools___socials___discord'
  | 'childrenDataJson___pools___socials___twitter'
  | 'childrenDataJson___pools___socials___github'
  | 'childrenDataJson___pools___socials___telegram'
  | 'childrenDataJson___pools___socials___reddit'
  | 'childrenDataJson___pools___matomo___eventCategory'
  | 'childrenDataJson___pools___matomo___eventAction'
  | 'childrenDataJson___pools___matomo___eventName'
  | 'childrenDataJson___pools___twitter'
  | 'childrenDataJson___pools___telegram'
  | 'childDataJson___id'
  | 'childDataJson___parent___id'
  | 'childDataJson___parent___parent___id'
  | 'childDataJson___parent___parent___children'
  | 'childDataJson___parent___children'
  | 'childDataJson___parent___children___id'
  | 'childDataJson___parent___children___children'
  | 'childDataJson___parent___internal___content'
  | 'childDataJson___parent___internal___contentDigest'
  | 'childDataJson___parent___internal___description'
  | 'childDataJson___parent___internal___fieldOwners'
  | 'childDataJson___parent___internal___ignoreType'
  | 'childDataJson___parent___internal___mediaType'
  | 'childDataJson___parent___internal___owner'
  | 'childDataJson___parent___internal___type'
  | 'childDataJson___children'
  | 'childDataJson___children___id'
  | 'childDataJson___children___parent___id'
  | 'childDataJson___children___parent___children'
  | 'childDataJson___children___children'
  | 'childDataJson___children___children___id'
  | 'childDataJson___children___children___children'
  | 'childDataJson___children___internal___content'
  | 'childDataJson___children___internal___contentDigest'
  | 'childDataJson___children___internal___description'
  | 'childDataJson___children___internal___fieldOwners'
  | 'childDataJson___children___internal___ignoreType'
  | 'childDataJson___children___internal___mediaType'
  | 'childDataJson___children___internal___owner'
  | 'childDataJson___children___internal___type'
  | 'childDataJson___internal___content'
  | 'childDataJson___internal___contentDigest'
  | 'childDataJson___internal___description'
  | 'childDataJson___internal___fieldOwners'
  | 'childDataJson___internal___ignoreType'
  | 'childDataJson___internal___mediaType'
  | 'childDataJson___internal___owner'
  | 'childDataJson___internal___type'
  | 'childDataJson___files'
  | 'childDataJson___imageSize'
  | 'childDataJson___commit'
  | 'childDataJson___contributors'
  | 'childDataJson___contributors___login'
  | 'childDataJson___contributors___name'
  | 'childDataJson___contributors___avatar_url'
  | 'childDataJson___contributors___profile'
  | 'childDataJson___contributors___contributions'
  | 'childDataJson___contributorsPerLine'
  | 'childDataJson___projectName'
  | 'childDataJson___projectOwner'
  | 'childDataJson___repoType'
  | 'childDataJson___repoHost'
  | 'childDataJson___skipCi'
  | 'childDataJson___nodeTools'
  | 'childDataJson___nodeTools___name'
  | 'childDataJson___nodeTools___svgPath'
  | 'childDataJson___nodeTools___hue'
  | 'childDataJson___nodeTools___launchDate'
  | 'childDataJson___nodeTools___url'
  | 'childDataJson___nodeTools___audits'
  | 'childDataJson___nodeTools___audits___name'
  | 'childDataJson___nodeTools___audits___url'
  | 'childDataJson___nodeTools___minEth'
  | 'childDataJson___nodeTools___additionalStake'
  | 'childDataJson___nodeTools___additionalStakeUnit'
  | 'childDataJson___nodeTools___tokens'
  | 'childDataJson___nodeTools___tokens___name'
  | 'childDataJson___nodeTools___tokens___symbol'
  | 'childDataJson___nodeTools___tokens___address'
  | 'childDataJson___nodeTools___isFoss'
  | 'childDataJson___nodeTools___hasBugBounty'
  | 'childDataJson___nodeTools___isTrustless'
  | 'childDataJson___nodeTools___isPermissionless'
  | 'childDataJson___nodeTools___multiClient'
  | 'childDataJson___nodeTools___easyClientSwitching'
  | 'childDataJson___nodeTools___platforms'
  | 'childDataJson___nodeTools___ui'
  | 'childDataJson___nodeTools___socials___discord'
  | 'childDataJson___nodeTools___socials___twitter'
  | 'childDataJson___nodeTools___socials___github'
  | 'childDataJson___nodeTools___socials___telegram'
  | 'childDataJson___nodeTools___matomo___eventCategory'
  | 'childDataJson___nodeTools___matomo___eventAction'
  | 'childDataJson___nodeTools___matomo___eventName'
  | 'childDataJson___keyGen'
  | 'childDataJson___keyGen___name'
  | 'childDataJson___keyGen___svgPath'
  | 'childDataJson___keyGen___hue'
  | 'childDataJson___keyGen___launchDate'
  | 'childDataJson___keyGen___url'
  | 'childDataJson___keyGen___audits'
  | 'childDataJson___keyGen___audits___name'
  | 'childDataJson___keyGen___audits___url'
  | 'childDataJson___keyGen___isFoss'
  | 'childDataJson___keyGen___hasBugBounty'
  | 'childDataJson___keyGen___isTrustless'
  | 'childDataJson___keyGen___isPermissionless'
  | 'childDataJson___keyGen___isSelfCustody'
  | 'childDataJson___keyGen___platforms'
  | 'childDataJson___keyGen___ui'
  | 'childDataJson___keyGen___socials___discord'
  | 'childDataJson___keyGen___socials___twitter'
  | 'childDataJson___keyGen___socials___github'
  | 'childDataJson___keyGen___matomo___eventCategory'
  | 'childDataJson___keyGen___matomo___eventAction'
  | 'childDataJson___keyGen___matomo___eventName'
  | 'childDataJson___saas'
  | 'childDataJson___saas___name'
  | 'childDataJson___saas___svgPath'
  | 'childDataJson___saas___hue'
  | 'childDataJson___saas___launchDate'
  | 'childDataJson___saas___url'
  | 'childDataJson___saas___audits'
  | 'childDataJson___saas___audits___name'
  | 'childDataJson___saas___audits___url'
  | 'childDataJson___saas___audits___date'
  | 'childDataJson___saas___minEth'
  | 'childDataJson___saas___additionalStake'
  | 'childDataJson___saas___additionalStakeUnit'
  | 'childDataJson___saas___monthlyFee'
  | 'childDataJson___saas___monthlyFeeUnit'
  | 'childDataJson___saas___isFoss'
  | 'childDataJson___saas___hasBugBounty'
  | 'childDataJson___saas___isTrustless'
  | 'childDataJson___saas___isPermissionless'
  | 'childDataJson___saas___pctMajorityClient'
  | 'childDataJson___saas___isSelfCustody'
  | 'childDataJson___saas___platforms'
  | 'childDataJson___saas___ui'
  | 'childDataJson___saas___socials___discord'
  | 'childDataJson___saas___socials___twitter'
  | 'childDataJson___saas___socials___github'
  | 'childDataJson___saas___socials___telegram'
  | 'childDataJson___saas___matomo___eventCategory'
  | 'childDataJson___saas___matomo___eventAction'
  | 'childDataJson___saas___matomo___eventName'
  | 'childDataJson___pools'
  | 'childDataJson___pools___name'
  | 'childDataJson___pools___svgPath'
  | 'childDataJson___pools___hue'
  | 'childDataJson___pools___launchDate'
  | 'childDataJson___pools___url'
  | 'childDataJson___pools___audits'
  | 'childDataJson___pools___audits___name'
  | 'childDataJson___pools___audits___url'
  | 'childDataJson___pools___audits___date'
  | 'childDataJson___pools___minEth'
  | 'childDataJson___pools___feePercentage'
  | 'childDataJson___pools___tokens'
  | 'childDataJson___pools___tokens___name'
  | 'childDataJson___pools___tokens___symbol'
  | 'childDataJson___pools___tokens___address'
  | 'childDataJson___pools___isFoss'
  | 'childDataJson___pools___hasBugBounty'
  | 'childDataJson___pools___isTrustless'
  | 'childDataJson___pools___hasPermissionlessNodes'
  | 'childDataJson___pools___pctMajorityClient'
  | 'childDataJson___pools___platforms'
  | 'childDataJson___pools___ui'
  | 'childDataJson___pools___socials___discord'
  | 'childDataJson___pools___socials___twitter'
  | 'childDataJson___pools___socials___github'
  | 'childDataJson___pools___socials___telegram'
  | 'childDataJson___pools___socials___reddit'
  | 'childDataJson___pools___matomo___eventCategory'
  | 'childDataJson___pools___matomo___eventAction'
  | 'childDataJson___pools___matomo___eventName'
  | 'childDataJson___pools___twitter'
  | 'childDataJson___pools___telegram'
  | 'childrenCommunityMeetupsJson'
  | 'childrenCommunityMeetupsJson___id'
  | 'childrenCommunityMeetupsJson___parent___id'
  | 'childrenCommunityMeetupsJson___parent___parent___id'
  | 'childrenCommunityMeetupsJson___parent___parent___children'
  | 'childrenCommunityMeetupsJson___parent___children'
  | 'childrenCommunityMeetupsJson___parent___children___id'
  | 'childrenCommunityMeetupsJson___parent___children___children'
  | 'childrenCommunityMeetupsJson___parent___internal___content'
  | 'childrenCommunityMeetupsJson___parent___internal___contentDigest'
  | 'childrenCommunityMeetupsJson___parent___internal___description'
  | 'childrenCommunityMeetupsJson___parent___internal___fieldOwners'
  | 'childrenCommunityMeetupsJson___parent___internal___ignoreType'
  | 'childrenCommunityMeetupsJson___parent___internal___mediaType'
  | 'childrenCommunityMeetupsJson___parent___internal___owner'
  | 'childrenCommunityMeetupsJson___parent___internal___type'
  | 'childrenCommunityMeetupsJson___children'
  | 'childrenCommunityMeetupsJson___children___id'
  | 'childrenCommunityMeetupsJson___children___parent___id'
  | 'childrenCommunityMeetupsJson___children___parent___children'
  | 'childrenCommunityMeetupsJson___children___children'
  | 'childrenCommunityMeetupsJson___children___children___id'
  | 'childrenCommunityMeetupsJson___children___children___children'
  | 'childrenCommunityMeetupsJson___children___internal___content'
  | 'childrenCommunityMeetupsJson___children___internal___contentDigest'
  | 'childrenCommunityMeetupsJson___children___internal___description'
  | 'childrenCommunityMeetupsJson___children___internal___fieldOwners'
  | 'childrenCommunityMeetupsJson___children___internal___ignoreType'
  | 'childrenCommunityMeetupsJson___children___internal___mediaType'
  | 'childrenCommunityMeetupsJson___children___internal___owner'
  | 'childrenCommunityMeetupsJson___children___internal___type'
  | 'childrenCommunityMeetupsJson___internal___content'
  | 'childrenCommunityMeetupsJson___internal___contentDigest'
  | 'childrenCommunityMeetupsJson___internal___description'
  | 'childrenCommunityMeetupsJson___internal___fieldOwners'
  | 'childrenCommunityMeetupsJson___internal___ignoreType'
  | 'childrenCommunityMeetupsJson___internal___mediaType'
  | 'childrenCommunityMeetupsJson___internal___owner'
  | 'childrenCommunityMeetupsJson___internal___type'
  | 'childrenCommunityMeetupsJson___title'
  | 'childrenCommunityMeetupsJson___emoji'
  | 'childrenCommunityMeetupsJson___location'
  | 'childrenCommunityMeetupsJson___link'
  | 'childCommunityMeetupsJson___id'
  | 'childCommunityMeetupsJson___parent___id'
  | 'childCommunityMeetupsJson___parent___parent___id'
  | 'childCommunityMeetupsJson___parent___parent___children'
  | 'childCommunityMeetupsJson___parent___children'
  | 'childCommunityMeetupsJson___parent___children___id'
  | 'childCommunityMeetupsJson___parent___children___children'
  | 'childCommunityMeetupsJson___parent___internal___content'
  | 'childCommunityMeetupsJson___parent___internal___contentDigest'
  | 'childCommunityMeetupsJson___parent___internal___description'
  | 'childCommunityMeetupsJson___parent___internal___fieldOwners'
  | 'childCommunityMeetupsJson___parent___internal___ignoreType'
  | 'childCommunityMeetupsJson___parent___internal___mediaType'
  | 'childCommunityMeetupsJson___parent___internal___owner'
  | 'childCommunityMeetupsJson___parent___internal___type'
  | 'childCommunityMeetupsJson___children'
  | 'childCommunityMeetupsJson___children___id'
  | 'childCommunityMeetupsJson___children___parent___id'
  | 'childCommunityMeetupsJson___children___parent___children'
  | 'childCommunityMeetupsJson___children___children'
  | 'childCommunityMeetupsJson___children___children___id'
  | 'childCommunityMeetupsJson___children___children___children'
  | 'childCommunityMeetupsJson___children___internal___content'
  | 'childCommunityMeetupsJson___children___internal___contentDigest'
  | 'childCommunityMeetupsJson___children___internal___description'
  | 'childCommunityMeetupsJson___children___internal___fieldOwners'
  | 'childCommunityMeetupsJson___children___internal___ignoreType'
  | 'childCommunityMeetupsJson___children___internal___mediaType'
  | 'childCommunityMeetupsJson___children___internal___owner'
  | 'childCommunityMeetupsJson___children___internal___type'
  | 'childCommunityMeetupsJson___internal___content'
  | 'childCommunityMeetupsJson___internal___contentDigest'
  | 'childCommunityMeetupsJson___internal___description'
  | 'childCommunityMeetupsJson___internal___fieldOwners'
  | 'childCommunityMeetupsJson___internal___ignoreType'
  | 'childCommunityMeetupsJson___internal___mediaType'
  | 'childCommunityMeetupsJson___internal___owner'
  | 'childCommunityMeetupsJson___internal___type'
  | 'childCommunityMeetupsJson___title'
  | 'childCommunityMeetupsJson___emoji'
  | 'childCommunityMeetupsJson___location'
  | 'childCommunityMeetupsJson___link'
  | 'childrenCommunityEventsJson'
  | 'childrenCommunityEventsJson___id'
  | 'childrenCommunityEventsJson___parent___id'
  | 'childrenCommunityEventsJson___parent___parent___id'
  | 'childrenCommunityEventsJson___parent___parent___children'
  | 'childrenCommunityEventsJson___parent___children'
  | 'childrenCommunityEventsJson___parent___children___id'
  | 'childrenCommunityEventsJson___parent___children___children'
  | 'childrenCommunityEventsJson___parent___internal___content'
  | 'childrenCommunityEventsJson___parent___internal___contentDigest'
  | 'childrenCommunityEventsJson___parent___internal___description'
  | 'childrenCommunityEventsJson___parent___internal___fieldOwners'
  | 'childrenCommunityEventsJson___parent___internal___ignoreType'
  | 'childrenCommunityEventsJson___parent___internal___mediaType'
  | 'childrenCommunityEventsJson___parent___internal___owner'
  | 'childrenCommunityEventsJson___parent___internal___type'
  | 'childrenCommunityEventsJson___children'
  | 'childrenCommunityEventsJson___children___id'
  | 'childrenCommunityEventsJson___children___parent___id'
  | 'childrenCommunityEventsJson___children___parent___children'
  | 'childrenCommunityEventsJson___children___children'
  | 'childrenCommunityEventsJson___children___children___id'
  | 'childrenCommunityEventsJson___children___children___children'
  | 'childrenCommunityEventsJson___children___internal___content'
  | 'childrenCommunityEventsJson___children___internal___contentDigest'
  | 'childrenCommunityEventsJson___children___internal___description'
  | 'childrenCommunityEventsJson___children___internal___fieldOwners'
  | 'childrenCommunityEventsJson___children___internal___ignoreType'
  | 'childrenCommunityEventsJson___children___internal___mediaType'
  | 'childrenCommunityEventsJson___children___internal___owner'
  | 'childrenCommunityEventsJson___children___internal___type'
  | 'childrenCommunityEventsJson___internal___content'
  | 'childrenCommunityEventsJson___internal___contentDigest'
  | 'childrenCommunityEventsJson___internal___description'
  | 'childrenCommunityEventsJson___internal___fieldOwners'
  | 'childrenCommunityEventsJson___internal___ignoreType'
  | 'childrenCommunityEventsJson___internal___mediaType'
  | 'childrenCommunityEventsJson___internal___owner'
  | 'childrenCommunityEventsJson___internal___type'
  | 'childrenCommunityEventsJson___title'
  | 'childrenCommunityEventsJson___to'
  | 'childrenCommunityEventsJson___sponsor'
  | 'childrenCommunityEventsJson___location'
  | 'childrenCommunityEventsJson___description'
  | 'childrenCommunityEventsJson___startDate'
  | 'childrenCommunityEventsJson___endDate'
  | 'childCommunityEventsJson___id'
  | 'childCommunityEventsJson___parent___id'
  | 'childCommunityEventsJson___parent___parent___id'
  | 'childCommunityEventsJson___parent___parent___children'
  | 'childCommunityEventsJson___parent___children'
  | 'childCommunityEventsJson___parent___children___id'
  | 'childCommunityEventsJson___parent___children___children'
  | 'childCommunityEventsJson___parent___internal___content'
  | 'childCommunityEventsJson___parent___internal___contentDigest'
  | 'childCommunityEventsJson___parent___internal___description'
  | 'childCommunityEventsJson___parent___internal___fieldOwners'
  | 'childCommunityEventsJson___parent___internal___ignoreType'
  | 'childCommunityEventsJson___parent___internal___mediaType'
  | 'childCommunityEventsJson___parent___internal___owner'
  | 'childCommunityEventsJson___parent___internal___type'
  | 'childCommunityEventsJson___children'
  | 'childCommunityEventsJson___children___id'
  | 'childCommunityEventsJson___children___parent___id'
  | 'childCommunityEventsJson___children___parent___children'
  | 'childCommunityEventsJson___children___children'
  | 'childCommunityEventsJson___children___children___id'
  | 'childCommunityEventsJson___children___children___children'
  | 'childCommunityEventsJson___children___internal___content'
  | 'childCommunityEventsJson___children___internal___contentDigest'
  | 'childCommunityEventsJson___children___internal___description'
  | 'childCommunityEventsJson___children___internal___fieldOwners'
  | 'childCommunityEventsJson___children___internal___ignoreType'
  | 'childCommunityEventsJson___children___internal___mediaType'
  | 'childCommunityEventsJson___children___internal___owner'
  | 'childCommunityEventsJson___children___internal___type'
  | 'childCommunityEventsJson___internal___content'
  | 'childCommunityEventsJson___internal___contentDigest'
  | 'childCommunityEventsJson___internal___description'
  | 'childCommunityEventsJson___internal___fieldOwners'
  | 'childCommunityEventsJson___internal___ignoreType'
  | 'childCommunityEventsJson___internal___mediaType'
  | 'childCommunityEventsJson___internal___owner'
  | 'childCommunityEventsJson___internal___type'
  | 'childCommunityEventsJson___title'
  | 'childCommunityEventsJson___to'
  | 'childCommunityEventsJson___sponsor'
  | 'childCommunityEventsJson___location'
  | 'childCommunityEventsJson___description'
  | 'childCommunityEventsJson___startDate'
  | 'childCommunityEventsJson___endDate'
  | 'childrenCexLayer2SupportJson'
  | 'childrenCexLayer2SupportJson___id'
  | 'childrenCexLayer2SupportJson___parent___id'
  | 'childrenCexLayer2SupportJson___parent___parent___id'
  | 'childrenCexLayer2SupportJson___parent___parent___children'
  | 'childrenCexLayer2SupportJson___parent___children'
  | 'childrenCexLayer2SupportJson___parent___children___id'
  | 'childrenCexLayer2SupportJson___parent___children___children'
  | 'childrenCexLayer2SupportJson___parent___internal___content'
  | 'childrenCexLayer2SupportJson___parent___internal___contentDigest'
  | 'childrenCexLayer2SupportJson___parent___internal___description'
  | 'childrenCexLayer2SupportJson___parent___internal___fieldOwners'
  | 'childrenCexLayer2SupportJson___parent___internal___ignoreType'
  | 'childrenCexLayer2SupportJson___parent___internal___mediaType'
  | 'childrenCexLayer2SupportJson___parent___internal___owner'
  | 'childrenCexLayer2SupportJson___parent___internal___type'
  | 'childrenCexLayer2SupportJson___children'
  | 'childrenCexLayer2SupportJson___children___id'
  | 'childrenCexLayer2SupportJson___children___parent___id'
  | 'childrenCexLayer2SupportJson___children___parent___children'
  | 'childrenCexLayer2SupportJson___children___children'
  | 'childrenCexLayer2SupportJson___children___children___id'
  | 'childrenCexLayer2SupportJson___children___children___children'
  | 'childrenCexLayer2SupportJson___children___internal___content'
  | 'childrenCexLayer2SupportJson___children___internal___contentDigest'
  | 'childrenCexLayer2SupportJson___children___internal___description'
  | 'childrenCexLayer2SupportJson___children___internal___fieldOwners'
  | 'childrenCexLayer2SupportJson___children___internal___ignoreType'
  | 'childrenCexLayer2SupportJson___children___internal___mediaType'
  | 'childrenCexLayer2SupportJson___children___internal___owner'
  | 'childrenCexLayer2SupportJson___children___internal___type'
  | 'childrenCexLayer2SupportJson___internal___content'
  | 'childrenCexLayer2SupportJson___internal___contentDigest'
  | 'childrenCexLayer2SupportJson___internal___description'
  | 'childrenCexLayer2SupportJson___internal___fieldOwners'
  | 'childrenCexLayer2SupportJson___internal___ignoreType'
  | 'childrenCexLayer2SupportJson___internal___mediaType'
  | 'childrenCexLayer2SupportJson___internal___owner'
  | 'childrenCexLayer2SupportJson___internal___type'
  | 'childrenCexLayer2SupportJson___name'
  | 'childrenCexLayer2SupportJson___supports_withdrawals'
  | 'childrenCexLayer2SupportJson___supports_deposits'
  | 'childrenCexLayer2SupportJson___url'
  | 'childCexLayer2SupportJson___id'
  | 'childCexLayer2SupportJson___parent___id'
  | 'childCexLayer2SupportJson___parent___parent___id'
  | 'childCexLayer2SupportJson___parent___parent___children'
  | 'childCexLayer2SupportJson___parent___children'
  | 'childCexLayer2SupportJson___parent___children___id'
  | 'childCexLayer2SupportJson___parent___children___children'
  | 'childCexLayer2SupportJson___parent___internal___content'
  | 'childCexLayer2SupportJson___parent___internal___contentDigest'
  | 'childCexLayer2SupportJson___parent___internal___description'
  | 'childCexLayer2SupportJson___parent___internal___fieldOwners'
  | 'childCexLayer2SupportJson___parent___internal___ignoreType'
  | 'childCexLayer2SupportJson___parent___internal___mediaType'
  | 'childCexLayer2SupportJson___parent___internal___owner'
  | 'childCexLayer2SupportJson___parent___internal___type'
  | 'childCexLayer2SupportJson___children'
  | 'childCexLayer2SupportJson___children___id'
  | 'childCexLayer2SupportJson___children___parent___id'
  | 'childCexLayer2SupportJson___children___parent___children'
  | 'childCexLayer2SupportJson___children___children'
  | 'childCexLayer2SupportJson___children___children___id'
  | 'childCexLayer2SupportJson___children___children___children'
  | 'childCexLayer2SupportJson___children___internal___content'
  | 'childCexLayer2SupportJson___children___internal___contentDigest'
  | 'childCexLayer2SupportJson___children___internal___description'
  | 'childCexLayer2SupportJson___children___internal___fieldOwners'
  | 'childCexLayer2SupportJson___children___internal___ignoreType'
  | 'childCexLayer2SupportJson___children___internal___mediaType'
  | 'childCexLayer2SupportJson___children___internal___owner'
  | 'childCexLayer2SupportJson___children___internal___type'
  | 'childCexLayer2SupportJson___internal___content'
  | 'childCexLayer2SupportJson___internal___contentDigest'
  | 'childCexLayer2SupportJson___internal___description'
  | 'childCexLayer2SupportJson___internal___fieldOwners'
  | 'childCexLayer2SupportJson___internal___ignoreType'
  | 'childCexLayer2SupportJson___internal___mediaType'
  | 'childCexLayer2SupportJson___internal___owner'
  | 'childCexLayer2SupportJson___internal___type'
  | 'childCexLayer2SupportJson___name'
  | 'childCexLayer2SupportJson___supports_withdrawals'
  | 'childCexLayer2SupportJson___supports_deposits'
  | 'childCexLayer2SupportJson___url'
  | 'childrenAlltimeJson'
  | 'childrenAlltimeJson___id'
  | 'childrenAlltimeJson___parent___id'
  | 'childrenAlltimeJson___parent___parent___id'
  | 'childrenAlltimeJson___parent___parent___children'
  | 'childrenAlltimeJson___parent___children'
  | 'childrenAlltimeJson___parent___children___id'
  | 'childrenAlltimeJson___parent___children___children'
  | 'childrenAlltimeJson___parent___internal___content'
  | 'childrenAlltimeJson___parent___internal___contentDigest'
  | 'childrenAlltimeJson___parent___internal___description'
  | 'childrenAlltimeJson___parent___internal___fieldOwners'
  | 'childrenAlltimeJson___parent___internal___ignoreType'
  | 'childrenAlltimeJson___parent___internal___mediaType'
  | 'childrenAlltimeJson___parent___internal___owner'
  | 'childrenAlltimeJson___parent___internal___type'
  | 'childrenAlltimeJson___children'
  | 'childrenAlltimeJson___children___id'
  | 'childrenAlltimeJson___children___parent___id'
  | 'childrenAlltimeJson___children___parent___children'
  | 'childrenAlltimeJson___children___children'
  | 'childrenAlltimeJson___children___children___id'
  | 'childrenAlltimeJson___children___children___children'
  | 'childrenAlltimeJson___children___internal___content'
  | 'childrenAlltimeJson___children___internal___contentDigest'
  | 'childrenAlltimeJson___children___internal___description'
  | 'childrenAlltimeJson___children___internal___fieldOwners'
  | 'childrenAlltimeJson___children___internal___ignoreType'
  | 'childrenAlltimeJson___children___internal___mediaType'
  | 'childrenAlltimeJson___children___internal___owner'
  | 'childrenAlltimeJson___children___internal___type'
  | 'childrenAlltimeJson___internal___content'
  | 'childrenAlltimeJson___internal___contentDigest'
  | 'childrenAlltimeJson___internal___description'
  | 'childrenAlltimeJson___internal___fieldOwners'
  | 'childrenAlltimeJson___internal___ignoreType'
  | 'childrenAlltimeJson___internal___mediaType'
  | 'childrenAlltimeJson___internal___owner'
  | 'childrenAlltimeJson___internal___type'
  | 'childrenAlltimeJson___name'
  | 'childrenAlltimeJson___url'
  | 'childrenAlltimeJson___unit'
  | 'childrenAlltimeJson___dateRange___from'
  | 'childrenAlltimeJson___dateRange___to'
  | 'childrenAlltimeJson___currency'
  | 'childrenAlltimeJson___mode'
  | 'childrenAlltimeJson___totalCosts'
  | 'childrenAlltimeJson___totalTMSavings'
  | 'childrenAlltimeJson___totalPreTranslated'
  | 'childrenAlltimeJson___data'
  | 'childrenAlltimeJson___data___user___id'
  | 'childrenAlltimeJson___data___user___username'
  | 'childrenAlltimeJson___data___user___fullName'
  | 'childrenAlltimeJson___data___user___userRole'
  | 'childrenAlltimeJson___data___user___avatarUrl'
  | 'childrenAlltimeJson___data___user___preTranslated'
  | 'childrenAlltimeJson___data___user___totalCosts'
  | 'childrenAlltimeJson___data___languages'
  | 'childAlltimeJson___id'
  | 'childAlltimeJson___parent___id'
  | 'childAlltimeJson___parent___parent___id'
  | 'childAlltimeJson___parent___parent___children'
  | 'childAlltimeJson___parent___children'
  | 'childAlltimeJson___parent___children___id'
  | 'childAlltimeJson___parent___children___children'
  | 'childAlltimeJson___parent___internal___content'
  | 'childAlltimeJson___parent___internal___contentDigest'
  | 'childAlltimeJson___parent___internal___description'
  | 'childAlltimeJson___parent___internal___fieldOwners'
  | 'childAlltimeJson___parent___internal___ignoreType'
  | 'childAlltimeJson___parent___internal___mediaType'
  | 'childAlltimeJson___parent___internal___owner'
  | 'childAlltimeJson___parent___internal___type'
  | 'childAlltimeJson___children'
  | 'childAlltimeJson___children___id'
  | 'childAlltimeJson___children___parent___id'
  | 'childAlltimeJson___children___parent___children'
  | 'childAlltimeJson___children___children'
  | 'childAlltimeJson___children___children___id'
  | 'childAlltimeJson___children___children___children'
  | 'childAlltimeJson___children___internal___content'
  | 'childAlltimeJson___children___internal___contentDigest'
  | 'childAlltimeJson___children___internal___description'
  | 'childAlltimeJson___children___internal___fieldOwners'
  | 'childAlltimeJson___children___internal___ignoreType'
  | 'childAlltimeJson___children___internal___mediaType'
  | 'childAlltimeJson___children___internal___owner'
  | 'childAlltimeJson___children___internal___type'
  | 'childAlltimeJson___internal___content'
  | 'childAlltimeJson___internal___contentDigest'
  | 'childAlltimeJson___internal___description'
  | 'childAlltimeJson___internal___fieldOwners'
  | 'childAlltimeJson___internal___ignoreType'
  | 'childAlltimeJson___internal___mediaType'
  | 'childAlltimeJson___internal___owner'
  | 'childAlltimeJson___internal___type'
  | 'childAlltimeJson___name'
  | 'childAlltimeJson___url'
  | 'childAlltimeJson___unit'
  | 'childAlltimeJson___dateRange___from'
  | 'childAlltimeJson___dateRange___to'
  | 'childAlltimeJson___currency'
  | 'childAlltimeJson___mode'
  | 'childAlltimeJson___totalCosts'
  | 'childAlltimeJson___totalTMSavings'
  | 'childAlltimeJson___totalPreTranslated'
  | 'childAlltimeJson___data'
  | 'childAlltimeJson___data___user___id'
  | 'childAlltimeJson___data___user___username'
  | 'childAlltimeJson___data___user___fullName'
  | 'childAlltimeJson___data___user___userRole'
  | 'childAlltimeJson___data___user___avatarUrl'
  | 'childAlltimeJson___data___user___preTranslated'
  | 'childAlltimeJson___data___user___totalCosts'
  | 'childAlltimeJson___data___languages'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type FileGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<FileGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type FileGroupConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMaxArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionMinArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionSumArgs = {
  field: FileFieldsEnum;
};


export type FileGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileSortInput = {
  fields?: InputMaybe<Array<InputMaybe<FileFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SortOrderEnum =
  | 'ASC'
  | 'DESC';

export type DirectoryConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export type DirectoryFieldsEnum =
  | 'sourceInstanceName'
  | 'absolutePath'
  | 'relativePath'
  | 'extension'
  | 'size'
  | 'prettySize'
  | 'modifiedTime'
  | 'accessTime'
  | 'changeTime'
  | 'birthTime'
  | 'root'
  | 'dir'
  | 'base'
  | 'ext'
  | 'name'
  | 'relativeDirectory'
  | 'dev'
  | 'mode'
  | 'nlink'
  | 'uid'
  | 'gid'
  | 'rdev'
  | 'ino'
  | 'atimeMs'
  | 'mtimeMs'
  | 'ctimeMs'
  | 'atime'
  | 'mtime'
  | 'ctime'
  | 'birthtime'
  | 'birthtimeMs'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type DirectoryGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DirectoryGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type DirectoryGroupConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMaxArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionMinArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionSumArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryFilterInput = {
  sourceInstanceName?: InputMaybe<StringQueryOperatorInput>;
  absolutePath?: InputMaybe<StringQueryOperatorInput>;
  relativePath?: InputMaybe<StringQueryOperatorInput>;
  extension?: InputMaybe<StringQueryOperatorInput>;
  size?: InputMaybe<IntQueryOperatorInput>;
  prettySize?: InputMaybe<StringQueryOperatorInput>;
  modifiedTime?: InputMaybe<DateQueryOperatorInput>;
  accessTime?: InputMaybe<DateQueryOperatorInput>;
  changeTime?: InputMaybe<DateQueryOperatorInput>;
  birthTime?: InputMaybe<DateQueryOperatorInput>;
  root?: InputMaybe<StringQueryOperatorInput>;
  dir?: InputMaybe<StringQueryOperatorInput>;
  base?: InputMaybe<StringQueryOperatorInput>;
  ext?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  relativeDirectory?: InputMaybe<StringQueryOperatorInput>;
  dev?: InputMaybe<IntQueryOperatorInput>;
  mode?: InputMaybe<IntQueryOperatorInput>;
  nlink?: InputMaybe<IntQueryOperatorInput>;
  uid?: InputMaybe<IntQueryOperatorInput>;
  gid?: InputMaybe<IntQueryOperatorInput>;
  rdev?: InputMaybe<IntQueryOperatorInput>;
  ino?: InputMaybe<FloatQueryOperatorInput>;
  atimeMs?: InputMaybe<FloatQueryOperatorInput>;
  mtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  ctimeMs?: InputMaybe<FloatQueryOperatorInput>;
  atime?: InputMaybe<DateQueryOperatorInput>;
  mtime?: InputMaybe<DateQueryOperatorInput>;
  ctime?: InputMaybe<DateQueryOperatorInput>;
  birthtime?: InputMaybe<DateQueryOperatorInput>;
  birthtimeMs?: InputMaybe<FloatQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type DirectorySortInput = {
  fields?: InputMaybe<Array<InputMaybe<DirectoryFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteSiteMetadataFilterInput = {
  title?: InputMaybe<StringQueryOperatorInput>;
  description?: InputMaybe<StringQueryOperatorInput>;
  url?: InputMaybe<StringQueryOperatorInput>;
  siteUrl?: InputMaybe<StringQueryOperatorInput>;
  author?: InputMaybe<StringQueryOperatorInput>;
  defaultLanguage?: InputMaybe<StringQueryOperatorInput>;
  supportedLanguages?: InputMaybe<StringQueryOperatorInput>;
  editContentUrl?: InputMaybe<StringQueryOperatorInput>;
};

export type SiteFlagsFilterInput = {
  FAST_DEV?: InputMaybe<BooleanQueryOperatorInput>;
};

export type SiteConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export type SiteFieldsEnum =
  | 'buildTime'
  | 'siteMetadata___title'
  | 'siteMetadata___description'
  | 'siteMetadata___url'
  | 'siteMetadata___siteUrl'
  | 'siteMetadata___author'
  | 'siteMetadata___defaultLanguage'
  | 'siteMetadata___supportedLanguages'
  | 'siteMetadata___editContentUrl'
  | 'port'
  | 'host'
  | 'flags___FAST_DEV'
  | 'polyfill'
  | 'pathPrefix'
  | 'jsxRuntime'
  | 'trailingSlash'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteGroupConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMaxArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionMinArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionSumArgs = {
  field: SiteFieldsEnum;
};


export type SiteGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  siteMetadata?: InputMaybe<SiteSiteMetadataFilterInput>;
  port?: InputMaybe<IntQueryOperatorInput>;
  host?: InputMaybe<StringQueryOperatorInput>;
  flags?: InputMaybe<SiteFlagsFilterInput>;
  polyfill?: InputMaybe<BooleanQueryOperatorInput>;
  pathPrefix?: InputMaybe<StringQueryOperatorInput>;
  jsxRuntime?: InputMaybe<StringQueryOperatorInput>;
  trailingSlash?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteFunctionConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
};


export type SiteFunctionConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionEdge = {
  next?: Maybe<SiteFunction>;
  node: SiteFunction;
  previous?: Maybe<SiteFunction>;
};

export type SiteFunctionFieldsEnum =
  | 'functionRoute'
  | 'pluginName'
  | 'originalAbsoluteFilePath'
  | 'originalRelativeFilePath'
  | 'relativeCompiledFilePath'
  | 'absoluteCompiledFilePath'
  | 'matchPath'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteFunctionGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteFunctionEdge>;
  nodes: Array<SiteFunction>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteFunctionGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteFunctionGroupConnectionDistinctArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMaxArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionMinArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionSumArgs = {
  field: SiteFunctionFieldsEnum;
};


export type SiteFunctionGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteFunctionFieldsEnum;
};

export type SiteFunctionFilterInput = {
  functionRoute?: InputMaybe<StringQueryOperatorInput>;
  pluginName?: InputMaybe<StringQueryOperatorInput>;
  originalAbsoluteFilePath?: InputMaybe<StringQueryOperatorInput>;
  originalRelativeFilePath?: InputMaybe<StringQueryOperatorInput>;
  relativeCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  absoluteCompiledFilePath?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteFunctionSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteFunctionFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SitePluginFilterInput = {
  resolve?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
  version?: InputMaybe<StringQueryOperatorInput>;
  nodeAPIs?: InputMaybe<StringQueryOperatorInput>;
  browserAPIs?: InputMaybe<StringQueryOperatorInput>;
  ssrAPIs?: InputMaybe<StringQueryOperatorInput>;
  pluginFilepath?: InputMaybe<StringQueryOperatorInput>;
  pluginOptions?: InputMaybe<JsonQueryOperatorInput>;
  packageJson?: InputMaybe<JsonQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageEdge = {
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export type SitePageFieldsEnum =
  | 'path'
  | 'component'
  | 'internalComponentName'
  | 'componentChunkName'
  | 'matchPath'
  | 'pageContext'
  | 'pluginCreator___resolve'
  | 'pluginCreator___name'
  | 'pluginCreator___version'
  | 'pluginCreator___nodeAPIs'
  | 'pluginCreator___browserAPIs'
  | 'pluginCreator___ssrAPIs'
  | 'pluginCreator___pluginFilepath'
  | 'pluginCreator___pluginOptions'
  | 'pluginCreator___packageJson'
  | 'pluginCreator___id'
  | 'pluginCreator___parent___id'
  | 'pluginCreator___parent___parent___id'
  | 'pluginCreator___parent___parent___children'
  | 'pluginCreator___parent___children'
  | 'pluginCreator___parent___children___id'
  | 'pluginCreator___parent___children___children'
  | 'pluginCreator___parent___internal___content'
  | 'pluginCreator___parent___internal___contentDigest'
  | 'pluginCreator___parent___internal___description'
  | 'pluginCreator___parent___internal___fieldOwners'
  | 'pluginCreator___parent___internal___ignoreType'
  | 'pluginCreator___parent___internal___mediaType'
  | 'pluginCreator___parent___internal___owner'
  | 'pluginCreator___parent___internal___type'
  | 'pluginCreator___children'
  | 'pluginCreator___children___id'
  | 'pluginCreator___children___parent___id'
  | 'pluginCreator___children___parent___children'
  | 'pluginCreator___children___children'
  | 'pluginCreator___children___children___id'
  | 'pluginCreator___children___children___children'
  | 'pluginCreator___children___internal___content'
  | 'pluginCreator___children___internal___contentDigest'
  | 'pluginCreator___children___internal___description'
  | 'pluginCreator___children___internal___fieldOwners'
  | 'pluginCreator___children___internal___ignoreType'
  | 'pluginCreator___children___internal___mediaType'
  | 'pluginCreator___children___internal___owner'
  | 'pluginCreator___children___internal___type'
  | 'pluginCreator___internal___content'
  | 'pluginCreator___internal___contentDigest'
  | 'pluginCreator___internal___description'
  | 'pluginCreator___internal___fieldOwners'
  | 'pluginCreator___internal___ignoreType'
  | 'pluginCreator___internal___mediaType'
  | 'pluginCreator___internal___owner'
  | 'pluginCreator___internal___type'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SitePageGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePageGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePageGroupConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMaxArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionMinArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionSumArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageFilterInput = {
  path?: InputMaybe<StringQueryOperatorInput>;
  component?: InputMaybe<StringQueryOperatorInput>;
  internalComponentName?: InputMaybe<StringQueryOperatorInput>;
  componentChunkName?: InputMaybe<StringQueryOperatorInput>;
  matchPath?: InputMaybe<StringQueryOperatorInput>;
  pageContext?: InputMaybe<JsonQueryOperatorInput>;
  pluginCreator?: InputMaybe<SitePluginFilterInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SitePageSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePageFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SitePluginConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export type SitePluginFieldsEnum =
  | 'resolve'
  | 'name'
  | 'version'
  | 'nodeAPIs'
  | 'browserAPIs'
  | 'ssrAPIs'
  | 'pluginFilepath'
  | 'pluginOptions'
  | 'packageJson'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SitePluginGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SitePluginGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SitePluginGroupConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMaxArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionMinArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionSumArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SitePluginFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type SiteBuildMetadataConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldsEnum =
  | 'buildTime'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<SiteBuildMetadataGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type SiteBuildMetadataGroupConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMaxArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionMinArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionSumArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataFilterInput = {
  buildTime?: InputMaybe<DateQueryOperatorInput>;
  id?: InputMaybe<StringQueryOperatorInput>;
  parent?: InputMaybe<NodeFilterInput>;
  children?: InputMaybe<NodeFilterListInput>;
  internal?: InputMaybe<InternalFilterInput>;
};

export type SiteBuildMetadataSortInput = {
  fields?: InputMaybe<Array<InputMaybe<SiteBuildMetadataFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type MdxConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<MdxGroupConnection>;
};


export type MdxConnectionDistinctArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionMaxArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionMinArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionSumArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: MdxFieldsEnum;
};

export type MdxEdge = {
  next?: Maybe<Mdx>;
  node: Mdx;
  previous?: Maybe<Mdx>;
};

export type MdxFieldsEnum =
  | 'rawBody'
  | 'fileAbsolutePath'
  | 'frontmatter___sidebar'
  | 'frontmatter___sidebarDepth'
  | 'frontmatter___incomplete'
  | 'frontmatter___template'
  | 'frontmatter___summaryPoint1'
  | 'frontmatter___summaryPoint2'
  | 'frontmatter___summaryPoint3'
  | 'frontmatter___summaryPoint4'
  | 'frontmatter___position'
  | 'frontmatter___compensation'
  | 'frontmatter___location'
  | 'frontmatter___type'
  | 'frontmatter___link'
  | 'frontmatter___address'
  | 'frontmatter___skill'
  | 'frontmatter___published'
  | 'frontmatter___sourceUrl'
  | 'frontmatter___source'
  | 'frontmatter___author'
  | 'frontmatter___tags'
  | 'frontmatter___isOutdated'
  | 'frontmatter___title'
  | 'frontmatter___lang'
  | 'frontmatter___description'
  | 'frontmatter___emoji'
  | 'frontmatter___image___sourceInstanceName'
  | 'frontmatter___image___absolutePath'
  | 'frontmatter___image___relativePath'
  | 'frontmatter___image___extension'
  | 'frontmatter___image___size'
  | 'frontmatter___image___prettySize'
  | 'frontmatter___image___modifiedTime'
  | 'frontmatter___image___accessTime'
  | 'frontmatter___image___changeTime'
  | 'frontmatter___image___birthTime'
  | 'frontmatter___image___root'
  | 'frontmatter___image___dir'
  | 'frontmatter___image___base'
  | 'frontmatter___image___ext'
  | 'frontmatter___image___name'
  | 'frontmatter___image___relativeDirectory'
  | 'frontmatter___image___dev'
  | 'frontmatter___image___mode'
  | 'frontmatter___image___nlink'
  | 'frontmatter___image___uid'
  | 'frontmatter___image___gid'
  | 'frontmatter___image___rdev'
  | 'frontmatter___image___ino'
  | 'frontmatter___image___atimeMs'
  | 'frontmatter___image___mtimeMs'
  | 'frontmatter___image___ctimeMs'
  | 'frontmatter___image___atime'
  | 'frontmatter___image___mtime'
  | 'frontmatter___image___ctime'
  | 'frontmatter___image___birthtime'
  | 'frontmatter___image___birthtimeMs'
  | 'frontmatter___image___blksize'
  | 'frontmatter___image___blocks'
  | 'frontmatter___image___fields___gitLogLatestAuthorName'
  | 'frontmatter___image___fields___gitLogLatestAuthorEmail'
  | 'frontmatter___image___fields___gitLogLatestDate'
  | 'frontmatter___image___publicURL'
  | 'frontmatter___image___childrenMdx'
  | 'frontmatter___image___childrenMdx___rawBody'
  | 'frontmatter___image___childrenMdx___fileAbsolutePath'
  | 'frontmatter___image___childrenMdx___slug'
  | 'frontmatter___image___childrenMdx___body'
  | 'frontmatter___image___childrenMdx___excerpt'
  | 'frontmatter___image___childrenMdx___headings'
  | 'frontmatter___image___childrenMdx___html'
  | 'frontmatter___image___childrenMdx___mdxAST'
  | 'frontmatter___image___childrenMdx___tableOfContents'
  | 'frontmatter___image___childrenMdx___timeToRead'
  | 'frontmatter___image___childrenMdx___id'
  | 'frontmatter___image___childrenMdx___children'
  | 'frontmatter___image___childMdx___rawBody'
  | 'frontmatter___image___childMdx___fileAbsolutePath'
  | 'frontmatter___image___childMdx___slug'
  | 'frontmatter___image___childMdx___body'
  | 'frontmatter___image___childMdx___excerpt'
  | 'frontmatter___image___childMdx___headings'
  | 'frontmatter___image___childMdx___html'
  | 'frontmatter___image___childMdx___mdxAST'
  | 'frontmatter___image___childMdx___tableOfContents'
  | 'frontmatter___image___childMdx___timeToRead'
  | 'frontmatter___image___childMdx___id'
  | 'frontmatter___image___childMdx___children'
  | 'frontmatter___image___childrenImageSharp'
  | 'frontmatter___image___childrenImageSharp___gatsbyImageData'
  | 'frontmatter___image___childrenImageSharp___id'
  | 'frontmatter___image___childrenImageSharp___children'
  | 'frontmatter___image___childImageSharp___gatsbyImageData'
  | 'frontmatter___image___childImageSharp___id'
  | 'frontmatter___image___childImageSharp___children'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv___username'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv___name'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv___score'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv___id'
  | 'frontmatter___image___childrenConsensusBountyHuntersCsv___children'
  | 'frontmatter___image___childConsensusBountyHuntersCsv___username'
  | 'frontmatter___image___childConsensusBountyHuntersCsv___name'
  | 'frontmatter___image___childConsensusBountyHuntersCsv___score'
  | 'frontmatter___image___childConsensusBountyHuntersCsv___id'
  | 'frontmatter___image___childConsensusBountyHuntersCsv___children'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv___username'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv___name'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv___score'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv___id'
  | 'frontmatter___image___childrenExecutionBountyHuntersCsv___children'
  | 'frontmatter___image___childExecutionBountyHuntersCsv___username'
  | 'frontmatter___image___childExecutionBountyHuntersCsv___name'
  | 'frontmatter___image___childExecutionBountyHuntersCsv___score'
  | 'frontmatter___image___childExecutionBountyHuntersCsv___id'
  | 'frontmatter___image___childExecutionBountyHuntersCsv___children'
  | 'frontmatter___image___childrenWalletsCsv'
  | 'frontmatter___image___childrenWalletsCsv___id'
  | 'frontmatter___image___childrenWalletsCsv___children'
  | 'frontmatter___image___childrenWalletsCsv___name'
  | 'frontmatter___image___childrenWalletsCsv___url'
  | 'frontmatter___image___childrenWalletsCsv___brand_color'
  | 'frontmatter___image___childrenWalletsCsv___has_mobile'
  | 'frontmatter___image___childrenWalletsCsv___has_desktop'
  | 'frontmatter___image___childrenWalletsCsv___has_web'
  | 'frontmatter___image___childrenWalletsCsv___has_hardware'
  | 'frontmatter___image___childrenWalletsCsv___has_card_deposits'
  | 'frontmatter___image___childrenWalletsCsv___has_explore_dapps'
  | 'frontmatter___image___childrenWalletsCsv___has_defi_integrations'
  | 'frontmatter___image___childrenWalletsCsv___has_bank_withdrawals'
  | 'frontmatter___image___childrenWalletsCsv___has_limits_protection'
  | 'frontmatter___image___childrenWalletsCsv___has_high_volume_purchases'
  | 'frontmatter___image___childrenWalletsCsv___has_multisig'
  | 'frontmatter___image___childrenWalletsCsv___has_dex_integrations'
  | 'frontmatter___image___childWalletsCsv___id'
  | 'frontmatter___image___childWalletsCsv___children'
  | 'frontmatter___image___childWalletsCsv___name'
  | 'frontmatter___image___childWalletsCsv___url'
  | 'frontmatter___image___childWalletsCsv___brand_color'
  | 'frontmatter___image___childWalletsCsv___has_mobile'
  | 'frontmatter___image___childWalletsCsv___has_desktop'
  | 'frontmatter___image___childWalletsCsv___has_web'
  | 'frontmatter___image___childWalletsCsv___has_hardware'
  | 'frontmatter___image___childWalletsCsv___has_card_deposits'
  | 'frontmatter___image___childWalletsCsv___has_explore_dapps'
  | 'frontmatter___image___childWalletsCsv___has_defi_integrations'
  | 'frontmatter___image___childWalletsCsv___has_bank_withdrawals'
  | 'frontmatter___image___childWalletsCsv___has_limits_protection'
  | 'frontmatter___image___childWalletsCsv___has_high_volume_purchases'
  | 'frontmatter___image___childWalletsCsv___has_multisig'
  | 'frontmatter___image___childWalletsCsv___has_dex_integrations'
  | 'frontmatter___image___childrenQuarterJson'
  | 'frontmatter___image___childrenQuarterJson___id'
  | 'frontmatter___image___childrenQuarterJson___children'
  | 'frontmatter___image___childrenQuarterJson___name'
  | 'frontmatter___image___childrenQuarterJson___url'
  | 'frontmatter___image___childrenQuarterJson___unit'
  | 'frontmatter___image___childrenQuarterJson___currency'
  | 'frontmatter___image___childrenQuarterJson___mode'
  | 'frontmatter___image___childrenQuarterJson___totalCosts'
  | 'frontmatter___image___childrenQuarterJson___totalTMSavings'
  | 'frontmatter___image___childrenQuarterJson___totalPreTranslated'
  | 'frontmatter___image___childrenQuarterJson___data'
  | 'frontmatter___image___childQuarterJson___id'
  | 'frontmatter___image___childQuarterJson___children'
  | 'frontmatter___image___childQuarterJson___name'
  | 'frontmatter___image___childQuarterJson___url'
  | 'frontmatter___image___childQuarterJson___unit'
  | 'frontmatter___image___childQuarterJson___currency'
  | 'frontmatter___image___childQuarterJson___mode'
  | 'frontmatter___image___childQuarterJson___totalCosts'
  | 'frontmatter___image___childQuarterJson___totalTMSavings'
  | 'frontmatter___image___childQuarterJson___totalPreTranslated'
  | 'frontmatter___image___childQuarterJson___data'
  | 'frontmatter___image___childrenMonthJson'
  | 'frontmatter___image___childrenMonthJson___id'
  | 'frontmatter___image___childrenMonthJson___children'
  | 'frontmatter___image___childrenMonthJson___name'
  | 'frontmatter___image___childrenMonthJson___url'
  | 'frontmatter___image___childrenMonthJson___unit'
  | 'frontmatter___image___childrenMonthJson___currency'
  | 'frontmatter___image___childrenMonthJson___mode'
  | 'frontmatter___image___childrenMonthJson___totalCosts'
  | 'frontmatter___image___childrenMonthJson___totalTMSavings'
  | 'frontmatter___image___childrenMonthJson___totalPreTranslated'
  | 'frontmatter___image___childrenMonthJson___data'
  | 'frontmatter___image___childMonthJson___id'
  | 'frontmatter___image___childMonthJson___children'
  | 'frontmatter___image___childMonthJson___name'
  | 'frontmatter___image___childMonthJson___url'
  | 'frontmatter___image___childMonthJson___unit'
  | 'frontmatter___image___childMonthJson___currency'
  | 'frontmatter___image___childMonthJson___mode'
  | 'frontmatter___image___childMonthJson___totalCosts'
  | 'frontmatter___image___childMonthJson___totalTMSavings'
  | 'frontmatter___image___childMonthJson___totalPreTranslated'
  | 'frontmatter___image___childMonthJson___data'
  | 'frontmatter___image___childrenLayer2Json'
  | 'frontmatter___image___childrenLayer2Json___id'
  | 'frontmatter___image___childrenLayer2Json___children'
  | 'frontmatter___image___childrenLayer2Json___optimistic'
  | 'frontmatter___image___childrenLayer2Json___zk'
  | 'frontmatter___image___childLayer2Json___id'
  | 'frontmatter___image___childLayer2Json___children'
  | 'frontmatter___image___childLayer2Json___optimistic'
  | 'frontmatter___image___childLayer2Json___zk'
  | 'frontmatter___image___childrenExternalTutorialsJson'
  | 'frontmatter___image___childrenExternalTutorialsJson___id'
  | 'frontmatter___image___childrenExternalTutorialsJson___children'
  | 'frontmatter___image___childrenExternalTutorialsJson___url'
  | 'frontmatter___image___childrenExternalTutorialsJson___title'
  | 'frontmatter___image___childrenExternalTutorialsJson___description'
  | 'frontmatter___image___childrenExternalTutorialsJson___author'
  | 'frontmatter___image___childrenExternalTutorialsJson___authorGithub'
  | 'frontmatter___image___childrenExternalTutorialsJson___tags'
  | 'frontmatter___image___childrenExternalTutorialsJson___skillLevel'
  | 'frontmatter___image___childrenExternalTutorialsJson___timeToRead'
  | 'frontmatter___image___childrenExternalTutorialsJson___lang'
  | 'frontmatter___image___childrenExternalTutorialsJson___publishDate'
  | 'frontmatter___image___childExternalTutorialsJson___id'
  | 'frontmatter___image___childExternalTutorialsJson___children'
  | 'frontmatter___image___childExternalTutorialsJson___url'
  | 'frontmatter___image___childExternalTutorialsJson___title'
  | 'frontmatter___image___childExternalTutorialsJson___description'
  | 'frontmatter___image___childExternalTutorialsJson___author'
  | 'frontmatter___image___childExternalTutorialsJson___authorGithub'
  | 'frontmatter___image___childExternalTutorialsJson___tags'
  | 'frontmatter___image___childExternalTutorialsJson___skillLevel'
  | 'frontmatter___image___childExternalTutorialsJson___timeToRead'
  | 'frontmatter___image___childExternalTutorialsJson___lang'
  | 'frontmatter___image___childExternalTutorialsJson___publishDate'
  | 'frontmatter___image___childrenExchangesByCountryCsv'
  | 'frontmatter___image___childrenExchangesByCountryCsv___id'
  | 'frontmatter___image___childrenExchangesByCountryCsv___children'
  | 'frontmatter___image___childrenExchangesByCountryCsv___country'
  | 'frontmatter___image___childrenExchangesByCountryCsv___coinmama'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bittrex'
  | 'frontmatter___image___childrenExchangesByCountryCsv___simplex'
  | 'frontmatter___image___childrenExchangesByCountryCsv___wyre'
  | 'frontmatter___image___childrenExchangesByCountryCsv___moonpay'
  | 'frontmatter___image___childrenExchangesByCountryCsv___coinbase'
  | 'frontmatter___image___childrenExchangesByCountryCsv___kraken'
  | 'frontmatter___image___childrenExchangesByCountryCsv___gemini'
  | 'frontmatter___image___childrenExchangesByCountryCsv___binance'
  | 'frontmatter___image___childrenExchangesByCountryCsv___binanceus'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitbuy'
  | 'frontmatter___image___childrenExchangesByCountryCsv___rain'
  | 'frontmatter___image___childrenExchangesByCountryCsv___cryptocom'
  | 'frontmatter___image___childrenExchangesByCountryCsv___itezcom'
  | 'frontmatter___image___childrenExchangesByCountryCsv___coinspot'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitvavo'
  | 'frontmatter___image___childrenExchangesByCountryCsv___mtpelerin'
  | 'frontmatter___image___childrenExchangesByCountryCsv___wazirx'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitflyer'
  | 'frontmatter___image___childrenExchangesByCountryCsv___easycrypto'
  | 'frontmatter___image___childrenExchangesByCountryCsv___okx'
  | 'frontmatter___image___childrenExchangesByCountryCsv___kucoin'
  | 'frontmatter___image___childrenExchangesByCountryCsv___ftx'
  | 'frontmatter___image___childrenExchangesByCountryCsv___huobiglobal'
  | 'frontmatter___image___childrenExchangesByCountryCsv___gateio'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitfinex'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bybit'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitkub'
  | 'frontmatter___image___childrenExchangesByCountryCsv___bitso'
  | 'frontmatter___image___childrenExchangesByCountryCsv___ftxus'
  | 'frontmatter___image___childExchangesByCountryCsv___id'
  | 'frontmatter___image___childExchangesByCountryCsv___children'
  | 'frontmatter___image___childExchangesByCountryCsv___country'
  | 'frontmatter___image___childExchangesByCountryCsv___coinmama'
  | 'frontmatter___image___childExchangesByCountryCsv___bittrex'
  | 'frontmatter___image___childExchangesByCountryCsv___simplex'
  | 'frontmatter___image___childExchangesByCountryCsv___wyre'
  | 'frontmatter___image___childExchangesByCountryCsv___moonpay'
  | 'frontmatter___image___childExchangesByCountryCsv___coinbase'
  | 'frontmatter___image___childExchangesByCountryCsv___kraken'
  | 'frontmatter___image___childExchangesByCountryCsv___gemini'
  | 'frontmatter___image___childExchangesByCountryCsv___binance'
  | 'frontmatter___image___childExchangesByCountryCsv___binanceus'
  | 'frontmatter___image___childExchangesByCountryCsv___bitbuy'
  | 'frontmatter___image___childExchangesByCountryCsv___rain'
  | 'frontmatter___image___childExchangesByCountryCsv___cryptocom'
  | 'frontmatter___image___childExchangesByCountryCsv___itezcom'
  | 'frontmatter___image___childExchangesByCountryCsv___coinspot'
  | 'frontmatter___image___childExchangesByCountryCsv___bitvavo'
  | 'frontmatter___image___childExchangesByCountryCsv___mtpelerin'
  | 'frontmatter___image___childExchangesByCountryCsv___wazirx'
  | 'frontmatter___image___childExchangesByCountryCsv___bitflyer'
  | 'frontmatter___image___childExchangesByCountryCsv___easycrypto'
  | 'frontmatter___image___childExchangesByCountryCsv___okx'
  | 'frontmatter___image___childExchangesByCountryCsv___kucoin'
  | 'frontmatter___image___childExchangesByCountryCsv___ftx'
  | 'frontmatter___image___childExchangesByCountryCsv___huobiglobal'
  | 'frontmatter___image___childExchangesByCountryCsv___gateio'
  | 'frontmatter___image___childExchangesByCountryCsv___bitfinex'
  | 'frontmatter___image___childExchangesByCountryCsv___bybit'
  | 'frontmatter___image___childExchangesByCountryCsv___bitkub'
  | 'frontmatter___image___childExchangesByCountryCsv___bitso'
  | 'frontmatter___image___childExchangesByCountryCsv___ftxus'
  | 'frontmatter___image___childrenDataJson'
  | 'frontmatter___image___childrenDataJson___id'
  | 'frontmatter___image___childrenDataJson___children'
  | 'frontmatter___image___childrenDataJson___files'
  | 'frontmatter___image___childrenDataJson___imageSize'
  | 'frontmatter___image___childrenDataJson___commit'
  | 'frontmatter___image___childrenDataJson___contributors'
  | 'frontmatter___image___childrenDataJson___contributorsPerLine'
  | 'frontmatter___image___childrenDataJson___projectName'
  | 'frontmatter___image___childrenDataJson___projectOwner'
  | 'frontmatter___image___childrenDataJson___repoType'
  | 'frontmatter___image___childrenDataJson___repoHost'
  | 'frontmatter___image___childrenDataJson___skipCi'
  | 'frontmatter___image___childrenDataJson___nodeTools'
  | 'frontmatter___image___childrenDataJson___keyGen'
  | 'frontmatter___image___childrenDataJson___saas'
  | 'frontmatter___image___childrenDataJson___pools'
  | 'frontmatter___image___childDataJson___id'
  | 'frontmatter___image___childDataJson___children'
  | 'frontmatter___image___childDataJson___files'
  | 'frontmatter___image___childDataJson___imageSize'
  | 'frontmatter___image___childDataJson___commit'
  | 'frontmatter___image___childDataJson___contributors'
  | 'frontmatter___image___childDataJson___contributorsPerLine'
  | 'frontmatter___image___childDataJson___projectName'
  | 'frontmatter___image___childDataJson___projectOwner'
  | 'frontmatter___image___childDataJson___repoType'
  | 'frontmatter___image___childDataJson___repoHost'
  | 'frontmatter___image___childDataJson___skipCi'
  | 'frontmatter___image___childDataJson___nodeTools'
  | 'frontmatter___image___childDataJson___keyGen'
  | 'frontmatter___image___childDataJson___saas'
  | 'frontmatter___image___childDataJson___pools'
  | 'frontmatter___image___childrenCommunityMeetupsJson'
  | 'frontmatter___image___childrenCommunityMeetupsJson___id'
  | 'frontmatter___image___childrenCommunityMeetupsJson___children'
  | 'frontmatter___image___childrenCommunityMeetupsJson___title'
  | 'frontmatter___image___childrenCommunityMeetupsJson___emoji'
  | 'frontmatter___image___childrenCommunityMeetupsJson___location'
  | 'frontmatter___image___childrenCommunityMeetupsJson___link'
  | 'frontmatter___image___childCommunityMeetupsJson___id'
  | 'frontmatter___image___childCommunityMeetupsJson___children'
  | 'frontmatter___image___childCommunityMeetupsJson___title'
  | 'frontmatter___image___childCommunityMeetupsJson___emoji'
  | 'frontmatter___image___childCommunityMeetupsJson___location'
  | 'frontmatter___image___childCommunityMeetupsJson___link'
  | 'frontmatter___image___childrenCommunityEventsJson'
  | 'frontmatter___image___childrenCommunityEventsJson___id'
  | 'frontmatter___image___childrenCommunityEventsJson___children'
  | 'frontmatter___image___childrenCommunityEventsJson___title'
  | 'frontmatter___image___childrenCommunityEventsJson___to'
  | 'frontmatter___image___childrenCommunityEventsJson___sponsor'
  | 'frontmatter___image___childrenCommunityEventsJson___location'
  | 'frontmatter___image___childrenCommunityEventsJson___description'
  | 'frontmatter___image___childrenCommunityEventsJson___startDate'
  | 'frontmatter___image___childrenCommunityEventsJson___endDate'
  | 'frontmatter___image___childCommunityEventsJson___id'
  | 'frontmatter___image___childCommunityEventsJson___children'
  | 'frontmatter___image___childCommunityEventsJson___title'
  | 'frontmatter___image___childCommunityEventsJson___to'
  | 'frontmatter___image___childCommunityEventsJson___sponsor'
  | 'frontmatter___image___childCommunityEventsJson___location'
  | 'frontmatter___image___childCommunityEventsJson___description'
  | 'frontmatter___image___childCommunityEventsJson___startDate'
  | 'frontmatter___image___childCommunityEventsJson___endDate'
  | 'frontmatter___image___childrenCexLayer2SupportJson'
  | 'frontmatter___image___childrenCexLayer2SupportJson___id'
  | 'frontmatter___image___childrenCexLayer2SupportJson___children'
  | 'frontmatter___image___childrenCexLayer2SupportJson___name'
  | 'frontmatter___image___childrenCexLayer2SupportJson___supports_withdrawals'
  | 'frontmatter___image___childrenCexLayer2SupportJson___supports_deposits'
  | 'frontmatter___image___childrenCexLayer2SupportJson___url'
  | 'frontmatter___image___childCexLayer2SupportJson___id'
  | 'frontmatter___image___childCexLayer2SupportJson___children'
  | 'frontmatter___image___childCexLayer2SupportJson___name'
  | 'frontmatter___image___childCexLayer2SupportJson___supports_withdrawals'
  | 'frontmatter___image___childCexLayer2SupportJson___supports_deposits'
  | 'frontmatter___image___childCexLayer2SupportJson___url'
  | 'frontmatter___image___childrenAlltimeJson'
  | 'frontmatter___image___childrenAlltimeJson___id'
  | 'frontmatter___image___childrenAlltimeJson___children'
  | 'frontmatter___image___childrenAlltimeJson___name'
  | 'frontmatter___image___childrenAlltimeJson___url'
  | 'frontmatter___image___childrenAlltimeJson___unit'
  | 'frontmatter___image___childrenAlltimeJson___currency'
  | 'frontmatter___image___childrenAlltimeJson___mode'
  | 'frontmatter___image___childrenAlltimeJson___totalCosts'
  | 'frontmatter___image___childrenAlltimeJson___totalTMSavings'
  | 'frontmatter___image___childrenAlltimeJson___totalPreTranslated'
  | 'frontmatter___image___childrenAlltimeJson___data'
  | 'frontmatter___image___childAlltimeJson___id'
  | 'frontmatter___image___childAlltimeJson___children'
  | 'frontmatter___image___childAlltimeJson___name'
  | 'frontmatter___image___childAlltimeJson___url'
  | 'frontmatter___image___childAlltimeJson___unit'
  | 'frontmatter___image___childAlltimeJson___currency'
  | 'frontmatter___image___childAlltimeJson___mode'
  | 'frontmatter___image___childAlltimeJson___totalCosts'
  | 'frontmatter___image___childAlltimeJson___totalTMSavings'
  | 'frontmatter___image___childAlltimeJson___totalPreTranslated'
  | 'frontmatter___image___childAlltimeJson___data'
  | 'frontmatter___image___id'
  | 'frontmatter___image___parent___id'
  | 'frontmatter___image___parent___children'
  | 'frontmatter___image___children'
  | 'frontmatter___image___children___id'
  | 'frontmatter___image___children___children'
  | 'frontmatter___image___internal___content'
  | 'frontmatter___image___internal___contentDigest'
  | 'frontmatter___image___internal___description'
  | 'frontmatter___image___internal___fieldOwners'
  | 'frontmatter___image___internal___ignoreType'
  | 'frontmatter___image___internal___mediaType'
  | 'frontmatter___image___internal___owner'
  | 'frontmatter___image___internal___type'
  | 'frontmatter___alt'
  | 'frontmatter___summaryPoints'
  | 'slug'
  | 'body'
  | 'excerpt'
  | 'headings'
  | 'headings___value'
  | 'headings___depth'
  | 'html'
  | 'mdxAST'
  | 'tableOfContents'
  | 'timeToRead'
  | 'wordCount___paragraphs'
  | 'wordCount___sentences'
  | 'wordCount___words'
  | 'fields___readingTime___text'
  | 'fields___readingTime___minutes'
  | 'fields___readingTime___time'
  | 'fields___readingTime___words'
  | 'fields___isOutdated'
  | 'fields___slug'
  | 'fields___relativePath'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type MdxGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<MdxGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type MdxGroupConnectionDistinctArgs = {
  field: MdxFieldsEnum;
};


export type MdxGroupConnectionMaxArgs = {
  field: MdxFieldsEnum;
};


export type MdxGroupConnectionMinArgs = {
  field: MdxFieldsEnum;
};


export type MdxGroupConnectionSumArgs = {
  field: MdxFieldsEnum;
};


export type MdxGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: MdxFieldsEnum;
};

export type MdxSortInput = {
  fields?: InputMaybe<Array<InputMaybe<MdxFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ImageSharpConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  next?: Maybe<ImageSharp>;
  node: ImageSharp;
  previous?: Maybe<ImageSharp>;
};

export type ImageSharpFieldsEnum =
  | 'fixed___base64'
  | 'fixed___tracedSVG'
  | 'fixed___aspectRatio'
  | 'fixed___width'
  | 'fixed___height'
  | 'fixed___src'
  | 'fixed___srcSet'
  | 'fixed___srcWebp'
  | 'fixed___srcSetWebp'
  | 'fixed___originalName'
  | 'fluid___base64'
  | 'fluid___tracedSVG'
  | 'fluid___aspectRatio'
  | 'fluid___src'
  | 'fluid___srcSet'
  | 'fluid___srcWebp'
  | 'fluid___srcSetWebp'
  | 'fluid___sizes'
  | 'fluid___originalImg'
  | 'fluid___originalName'
  | 'fluid___presentationWidth'
  | 'fluid___presentationHeight'
  | 'gatsbyImageData'
  | 'original___width'
  | 'original___height'
  | 'original___src'
  | 'resize___src'
  | 'resize___tracedSVG'
  | 'resize___width'
  | 'resize___height'
  | 'resize___aspectRatio'
  | 'resize___originalName'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ImageSharpGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ImageSharpGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ImageSharpGroupConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMaxArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionMinArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionSumArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ImageSharpFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ConsensusBountyHuntersCsvConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ConsensusBountyHuntersCsvEdge>;
  nodes: Array<ConsensusBountyHuntersCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ConsensusBountyHuntersCsvGroupConnection>;
};


export type ConsensusBountyHuntersCsvConnectionDistinctArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvConnectionMaxArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvConnectionMinArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvConnectionSumArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ConsensusBountyHuntersCsvFieldsEnum;
};

export type ConsensusBountyHuntersCsvEdge = {
  next?: Maybe<ConsensusBountyHuntersCsv>;
  node: ConsensusBountyHuntersCsv;
  previous?: Maybe<ConsensusBountyHuntersCsv>;
};

export type ConsensusBountyHuntersCsvFieldsEnum =
  | 'username'
  | 'name'
  | 'score'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ConsensusBountyHuntersCsvGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ConsensusBountyHuntersCsvEdge>;
  nodes: Array<ConsensusBountyHuntersCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ConsensusBountyHuntersCsvGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ConsensusBountyHuntersCsvGroupConnectionDistinctArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvGroupConnectionMaxArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvGroupConnectionMinArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvGroupConnectionSumArgs = {
  field: ConsensusBountyHuntersCsvFieldsEnum;
};


export type ConsensusBountyHuntersCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ConsensusBountyHuntersCsvFieldsEnum;
};

export type ConsensusBountyHuntersCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ConsensusBountyHuntersCsvFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ExecutionBountyHuntersCsvConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExecutionBountyHuntersCsvEdge>;
  nodes: Array<ExecutionBountyHuntersCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExecutionBountyHuntersCsvGroupConnection>;
};


export type ExecutionBountyHuntersCsvConnectionDistinctArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvConnectionMaxArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvConnectionMinArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvConnectionSumArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExecutionBountyHuntersCsvFieldsEnum;
};

export type ExecutionBountyHuntersCsvEdge = {
  next?: Maybe<ExecutionBountyHuntersCsv>;
  node: ExecutionBountyHuntersCsv;
  previous?: Maybe<ExecutionBountyHuntersCsv>;
};

export type ExecutionBountyHuntersCsvFieldsEnum =
  | 'username'
  | 'name'
  | 'score'
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type';

export type ExecutionBountyHuntersCsvGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExecutionBountyHuntersCsvEdge>;
  nodes: Array<ExecutionBountyHuntersCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExecutionBountyHuntersCsvGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ExecutionBountyHuntersCsvGroupConnectionDistinctArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvGroupConnectionMaxArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvGroupConnectionMinArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvGroupConnectionSumArgs = {
  field: ExecutionBountyHuntersCsvFieldsEnum;
};


export type ExecutionBountyHuntersCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExecutionBountyHuntersCsvFieldsEnum;
};

export type ExecutionBountyHuntersCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ExecutionBountyHuntersCsvFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type WalletsCsvConnection = {
  totalCount: Scalars['Int'];
  edges: Array<WalletsCsvEdge>;
  nodes: Array<WalletsCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<WalletsCsvGroupConnection>;
};


export type WalletsCsvConnectionDistinctArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvConnectionMaxArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvConnectionMinArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvConnectionSumArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: WalletsCsvFieldsEnum;
};

export type WalletsCsvEdge = {
  next?: Maybe<WalletsCsv>;
  node: WalletsCsv;
  previous?: Maybe<WalletsCsv>;
};

export type WalletsCsvFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'url'
  | 'brand_color'
  | 'has_mobile'
  | 'has_desktop'
  | 'has_web'
  | 'has_hardware'
  | 'has_card_deposits'
  | 'has_explore_dapps'
  | 'has_defi_integrations'
  | 'has_bank_withdrawals'
  | 'has_limits_protection'
  | 'has_high_volume_purchases'
  | 'has_multisig'
  | 'has_dex_integrations';

export type WalletsCsvGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<WalletsCsvEdge>;
  nodes: Array<WalletsCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<WalletsCsvGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type WalletsCsvGroupConnectionDistinctArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvGroupConnectionMaxArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvGroupConnectionMinArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvGroupConnectionSumArgs = {
  field: WalletsCsvFieldsEnum;
};


export type WalletsCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: WalletsCsvFieldsEnum;
};

export type WalletsCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<WalletsCsvFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type QuarterJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<QuarterJsonEdge>;
  nodes: Array<QuarterJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<QuarterJsonGroupConnection>;
};


export type QuarterJsonConnectionDistinctArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonConnectionMaxArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonConnectionMinArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonConnectionSumArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: QuarterJsonFieldsEnum;
};

export type QuarterJsonEdge = {
  next?: Maybe<QuarterJson>;
  node: QuarterJson;
  previous?: Maybe<QuarterJson>;
};

export type QuarterJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'url'
  | 'unit'
  | 'dateRange___from'
  | 'dateRange___to'
  | 'currency'
  | 'mode'
  | 'totalCosts'
  | 'totalTMSavings'
  | 'totalPreTranslated'
  | 'data'
  | 'data___user___id'
  | 'data___user___username'
  | 'data___user___fullName'
  | 'data___user___userRole'
  | 'data___user___avatarUrl'
  | 'data___user___preTranslated'
  | 'data___user___totalCosts'
  | 'data___languages'
  | 'data___languages___language___id'
  | 'data___languages___language___name'
  | 'data___languages___language___tmSavings'
  | 'data___languages___language___preTranslate'
  | 'data___languages___language___totalCosts'
  | 'data___languages___translated___tmMatch'
  | 'data___languages___translated___default'
  | 'data___languages___translated___total'
  | 'data___languages___targetTranslated___tmMatch'
  | 'data___languages___targetTranslated___default'
  | 'data___languages___targetTranslated___total'
  | 'data___languages___translatedByMt___tmMatch'
  | 'data___languages___translatedByMt___default'
  | 'data___languages___translatedByMt___total'
  | 'data___languages___approved___tmMatch'
  | 'data___languages___approved___default'
  | 'data___languages___approved___total'
  | 'data___languages___translationCosts___tmMatch'
  | 'data___languages___translationCosts___default'
  | 'data___languages___translationCosts___total'
  | 'data___languages___approvalCosts___tmMatch'
  | 'data___languages___approvalCosts___default'
  | 'data___languages___approvalCosts___total';

export type QuarterJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<QuarterJsonEdge>;
  nodes: Array<QuarterJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<QuarterJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type QuarterJsonGroupConnectionDistinctArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonGroupConnectionMaxArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonGroupConnectionMinArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonGroupConnectionSumArgs = {
  field: QuarterJsonFieldsEnum;
};


export type QuarterJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: QuarterJsonFieldsEnum;
};

export type QuarterJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<QuarterJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type MonthJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MonthJsonEdge>;
  nodes: Array<MonthJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<MonthJsonGroupConnection>;
};


export type MonthJsonConnectionDistinctArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonConnectionMaxArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonConnectionMinArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonConnectionSumArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: MonthJsonFieldsEnum;
};

export type MonthJsonEdge = {
  next?: Maybe<MonthJson>;
  node: MonthJson;
  previous?: Maybe<MonthJson>;
};

export type MonthJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'url'
  | 'unit'
  | 'dateRange___from'
  | 'dateRange___to'
  | 'currency'
  | 'mode'
  | 'totalCosts'
  | 'totalTMSavings'
  | 'totalPreTranslated'
  | 'data'
  | 'data___user___id'
  | 'data___user___username'
  | 'data___user___fullName'
  | 'data___user___userRole'
  | 'data___user___avatarUrl'
  | 'data___user___preTranslated'
  | 'data___user___totalCosts'
  | 'data___languages'
  | 'data___languages___language___id'
  | 'data___languages___language___name'
  | 'data___languages___language___tmSavings'
  | 'data___languages___language___preTranslate'
  | 'data___languages___language___totalCosts'
  | 'data___languages___translated___tmMatch'
  | 'data___languages___translated___default'
  | 'data___languages___translated___total'
  | 'data___languages___targetTranslated___tmMatch'
  | 'data___languages___targetTranslated___default'
  | 'data___languages___targetTranslated___total'
  | 'data___languages___translatedByMt___tmMatch'
  | 'data___languages___translatedByMt___default'
  | 'data___languages___translatedByMt___total'
  | 'data___languages___approved___tmMatch'
  | 'data___languages___approved___default'
  | 'data___languages___approved___total'
  | 'data___languages___translationCosts___tmMatch'
  | 'data___languages___translationCosts___default'
  | 'data___languages___translationCosts___total'
  | 'data___languages___approvalCosts___tmMatch'
  | 'data___languages___approvalCosts___default'
  | 'data___languages___approvalCosts___total';

export type MonthJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<MonthJsonEdge>;
  nodes: Array<MonthJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<MonthJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type MonthJsonGroupConnectionDistinctArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonGroupConnectionMaxArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonGroupConnectionMinArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonGroupConnectionSumArgs = {
  field: MonthJsonFieldsEnum;
};


export type MonthJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: MonthJsonFieldsEnum;
};

export type MonthJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<MonthJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type Layer2JsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<Layer2JsonEdge>;
  nodes: Array<Layer2Json>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<Layer2JsonGroupConnection>;
};


export type Layer2JsonConnectionDistinctArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonConnectionMaxArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonConnectionMinArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonConnectionSumArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: Layer2JsonFieldsEnum;
};

export type Layer2JsonEdge = {
  next?: Maybe<Layer2Json>;
  node: Layer2Json;
  previous?: Maybe<Layer2Json>;
};

export type Layer2JsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'optimistic'
  | 'optimistic___name'
  | 'optimistic___website'
  | 'optimistic___developerDocs'
  | 'optimistic___l2beat'
  | 'optimistic___bridge'
  | 'optimistic___bridgeWallets'
  | 'optimistic___blockExplorer'
  | 'optimistic___ecosystemPortal'
  | 'optimistic___tokenLists'
  | 'optimistic___noteKey'
  | 'optimistic___purpose'
  | 'optimistic___description'
  | 'optimistic___imageKey'
  | 'optimistic___background'
  | 'zk'
  | 'zk___name'
  | 'zk___website'
  | 'zk___developerDocs'
  | 'zk___l2beat'
  | 'zk___bridge'
  | 'zk___bridgeWallets'
  | 'zk___blockExplorer'
  | 'zk___ecosystemPortal'
  | 'zk___tokenLists'
  | 'zk___noteKey'
  | 'zk___purpose'
  | 'zk___description'
  | 'zk___imageKey'
  | 'zk___background';

export type Layer2JsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<Layer2JsonEdge>;
  nodes: Array<Layer2Json>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<Layer2JsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type Layer2JsonGroupConnectionDistinctArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonGroupConnectionMaxArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonGroupConnectionMinArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonGroupConnectionSumArgs = {
  field: Layer2JsonFieldsEnum;
};


export type Layer2JsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: Layer2JsonFieldsEnum;
};

export type Layer2JsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<Layer2JsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ExternalTutorialsJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExternalTutorialsJsonEdge>;
  nodes: Array<ExternalTutorialsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExternalTutorialsJsonGroupConnection>;
};


export type ExternalTutorialsJsonConnectionDistinctArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonConnectionMaxArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonConnectionMinArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonConnectionSumArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExternalTutorialsJsonFieldsEnum;
};

export type ExternalTutorialsJsonEdge = {
  next?: Maybe<ExternalTutorialsJson>;
  node: ExternalTutorialsJson;
  previous?: Maybe<ExternalTutorialsJson>;
};

export type ExternalTutorialsJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'url'
  | 'title'
  | 'description'
  | 'author'
  | 'authorGithub'
  | 'tags'
  | 'skillLevel'
  | 'timeToRead'
  | 'lang'
  | 'publishDate';

export type ExternalTutorialsJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExternalTutorialsJsonEdge>;
  nodes: Array<ExternalTutorialsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExternalTutorialsJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ExternalTutorialsJsonGroupConnectionDistinctArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonGroupConnectionMaxArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonGroupConnectionMinArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonGroupConnectionSumArgs = {
  field: ExternalTutorialsJsonFieldsEnum;
};


export type ExternalTutorialsJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExternalTutorialsJsonFieldsEnum;
};

export type ExternalTutorialsJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ExternalTutorialsJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type ExchangesByCountryCsvConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExchangesByCountryCsvEdge>;
  nodes: Array<ExchangesByCountryCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExchangesByCountryCsvGroupConnection>;
};


export type ExchangesByCountryCsvConnectionDistinctArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvConnectionMaxArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvConnectionMinArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvConnectionSumArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExchangesByCountryCsvFieldsEnum;
};

export type ExchangesByCountryCsvEdge = {
  next?: Maybe<ExchangesByCountryCsv>;
  node: ExchangesByCountryCsv;
  previous?: Maybe<ExchangesByCountryCsv>;
};

export type ExchangesByCountryCsvFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'country'
  | 'coinmama'
  | 'bittrex'
  | 'simplex'
  | 'wyre'
  | 'moonpay'
  | 'coinbase'
  | 'kraken'
  | 'gemini'
  | 'binance'
  | 'binanceus'
  | 'bitbuy'
  | 'rain'
  | 'cryptocom'
  | 'itezcom'
  | 'coinspot'
  | 'bitvavo'
  | 'mtpelerin'
  | 'wazirx'
  | 'bitflyer'
  | 'easycrypto'
  | 'okx'
  | 'kucoin'
  | 'ftx'
  | 'huobiglobal'
  | 'gateio'
  | 'bitfinex'
  | 'bybit'
  | 'bitkub'
  | 'bitso'
  | 'ftxus';

export type ExchangesByCountryCsvGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ExchangesByCountryCsvEdge>;
  nodes: Array<ExchangesByCountryCsv>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<ExchangesByCountryCsvGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type ExchangesByCountryCsvGroupConnectionDistinctArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvGroupConnectionMaxArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvGroupConnectionMinArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvGroupConnectionSumArgs = {
  field: ExchangesByCountryCsvFieldsEnum;
};


export type ExchangesByCountryCsvGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: ExchangesByCountryCsvFieldsEnum;
};

export type ExchangesByCountryCsvSortInput = {
  fields?: InputMaybe<Array<InputMaybe<ExchangesByCountryCsvFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type DataJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DataJsonEdge>;
  nodes: Array<DataJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DataJsonGroupConnection>;
};


export type DataJsonConnectionDistinctArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonConnectionMaxArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonConnectionMinArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonConnectionSumArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DataJsonFieldsEnum;
};

export type DataJsonEdge = {
  next?: Maybe<DataJson>;
  node: DataJson;
  previous?: Maybe<DataJson>;
};

export type DataJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'files'
  | 'imageSize'
  | 'commit'
  | 'contributors'
  | 'contributors___login'
  | 'contributors___name'
  | 'contributors___avatar_url'
  | 'contributors___profile'
  | 'contributors___contributions'
  | 'contributorsPerLine'
  | 'projectName'
  | 'projectOwner'
  | 'repoType'
  | 'repoHost'
  | 'skipCi'
  | 'nodeTools'
  | 'nodeTools___name'
  | 'nodeTools___svgPath'
  | 'nodeTools___hue'
  | 'nodeTools___launchDate'
  | 'nodeTools___url'
  | 'nodeTools___audits'
  | 'nodeTools___audits___name'
  | 'nodeTools___audits___url'
  | 'nodeTools___minEth'
  | 'nodeTools___additionalStake'
  | 'nodeTools___additionalStakeUnit'
  | 'nodeTools___tokens'
  | 'nodeTools___tokens___name'
  | 'nodeTools___tokens___symbol'
  | 'nodeTools___tokens___address'
  | 'nodeTools___isFoss'
  | 'nodeTools___hasBugBounty'
  | 'nodeTools___isTrustless'
  | 'nodeTools___isPermissionless'
  | 'nodeTools___multiClient'
  | 'nodeTools___easyClientSwitching'
  | 'nodeTools___platforms'
  | 'nodeTools___ui'
  | 'nodeTools___socials___discord'
  | 'nodeTools___socials___twitter'
  | 'nodeTools___socials___github'
  | 'nodeTools___socials___telegram'
  | 'nodeTools___matomo___eventCategory'
  | 'nodeTools___matomo___eventAction'
  | 'nodeTools___matomo___eventName'
  | 'keyGen'
  | 'keyGen___name'
  | 'keyGen___svgPath'
  | 'keyGen___hue'
  | 'keyGen___launchDate'
  | 'keyGen___url'
  | 'keyGen___audits'
  | 'keyGen___audits___name'
  | 'keyGen___audits___url'
  | 'keyGen___isFoss'
  | 'keyGen___hasBugBounty'
  | 'keyGen___isTrustless'
  | 'keyGen___isPermissionless'
  | 'keyGen___isSelfCustody'
  | 'keyGen___platforms'
  | 'keyGen___ui'
  | 'keyGen___socials___discord'
  | 'keyGen___socials___twitter'
  | 'keyGen___socials___github'
  | 'keyGen___matomo___eventCategory'
  | 'keyGen___matomo___eventAction'
  | 'keyGen___matomo___eventName'
  | 'saas'
  | 'saas___name'
  | 'saas___svgPath'
  | 'saas___hue'
  | 'saas___launchDate'
  | 'saas___url'
  | 'saas___audits'
  | 'saas___audits___name'
  | 'saas___audits___url'
  | 'saas___audits___date'
  | 'saas___minEth'
  | 'saas___additionalStake'
  | 'saas___additionalStakeUnit'
  | 'saas___monthlyFee'
  | 'saas___monthlyFeeUnit'
  | 'saas___isFoss'
  | 'saas___hasBugBounty'
  | 'saas___isTrustless'
  | 'saas___isPermissionless'
  | 'saas___pctMajorityClient'
  | 'saas___isSelfCustody'
  | 'saas___platforms'
  | 'saas___ui'
  | 'saas___socials___discord'
  | 'saas___socials___twitter'
  | 'saas___socials___github'
  | 'saas___socials___telegram'
  | 'saas___matomo___eventCategory'
  | 'saas___matomo___eventAction'
  | 'saas___matomo___eventName'
  | 'pools'
  | 'pools___name'
  | 'pools___svgPath'
  | 'pools___hue'
  | 'pools___launchDate'
  | 'pools___url'
  | 'pools___audits'
  | 'pools___audits___name'
  | 'pools___audits___url'
  | 'pools___audits___date'
  | 'pools___minEth'
  | 'pools___feePercentage'
  | 'pools___tokens'
  | 'pools___tokens___name'
  | 'pools___tokens___symbol'
  | 'pools___tokens___address'
  | 'pools___isFoss'
  | 'pools___hasBugBounty'
  | 'pools___isTrustless'
  | 'pools___hasPermissionlessNodes'
  | 'pools___pctMajorityClient'
  | 'pools___platforms'
  | 'pools___ui'
  | 'pools___socials___discord'
  | 'pools___socials___twitter'
  | 'pools___socials___github'
  | 'pools___socials___telegram'
  | 'pools___socials___reddit'
  | 'pools___matomo___eventCategory'
  | 'pools___matomo___eventAction'
  | 'pools___matomo___eventName'
  | 'pools___twitter'
  | 'pools___telegram';

export type DataJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DataJsonEdge>;
  nodes: Array<DataJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<DataJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type DataJsonGroupConnectionDistinctArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonGroupConnectionMaxArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonGroupConnectionMinArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonGroupConnectionSumArgs = {
  field: DataJsonFieldsEnum;
};


export type DataJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: DataJsonFieldsEnum;
};

export type DataJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<DataJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type CommunityMeetupsJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CommunityMeetupsJsonEdge>;
  nodes: Array<CommunityMeetupsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CommunityMeetupsJsonGroupConnection>;
};


export type CommunityMeetupsJsonConnectionDistinctArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonConnectionMaxArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonConnectionMinArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonConnectionSumArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CommunityMeetupsJsonFieldsEnum;
};

export type CommunityMeetupsJsonEdge = {
  next?: Maybe<CommunityMeetupsJson>;
  node: CommunityMeetupsJson;
  previous?: Maybe<CommunityMeetupsJson>;
};

export type CommunityMeetupsJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'title'
  | 'emoji'
  | 'location'
  | 'link';

export type CommunityMeetupsJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CommunityMeetupsJsonEdge>;
  nodes: Array<CommunityMeetupsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CommunityMeetupsJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type CommunityMeetupsJsonGroupConnectionDistinctArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonGroupConnectionMaxArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonGroupConnectionMinArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonGroupConnectionSumArgs = {
  field: CommunityMeetupsJsonFieldsEnum;
};


export type CommunityMeetupsJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CommunityMeetupsJsonFieldsEnum;
};

export type CommunityMeetupsJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<CommunityMeetupsJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type CommunityEventsJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CommunityEventsJsonEdge>;
  nodes: Array<CommunityEventsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CommunityEventsJsonGroupConnection>;
};


export type CommunityEventsJsonConnectionDistinctArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonConnectionMaxArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonConnectionMinArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonConnectionSumArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CommunityEventsJsonFieldsEnum;
};

export type CommunityEventsJsonEdge = {
  next?: Maybe<CommunityEventsJson>;
  node: CommunityEventsJson;
  previous?: Maybe<CommunityEventsJson>;
};

export type CommunityEventsJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'title'
  | 'to'
  | 'sponsor'
  | 'location'
  | 'description'
  | 'startDate'
  | 'endDate';

export type CommunityEventsJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CommunityEventsJsonEdge>;
  nodes: Array<CommunityEventsJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CommunityEventsJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type CommunityEventsJsonGroupConnectionDistinctArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonGroupConnectionMaxArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonGroupConnectionMinArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonGroupConnectionSumArgs = {
  field: CommunityEventsJsonFieldsEnum;
};


export type CommunityEventsJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CommunityEventsJsonFieldsEnum;
};

export type CommunityEventsJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<CommunityEventsJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type CexLayer2SupportJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CexLayer2SupportJsonEdge>;
  nodes: Array<CexLayer2SupportJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CexLayer2SupportJsonGroupConnection>;
};


export type CexLayer2SupportJsonConnectionDistinctArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonConnectionMaxArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonConnectionMinArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonConnectionSumArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CexLayer2SupportJsonFieldsEnum;
};

export type CexLayer2SupportJsonEdge = {
  next?: Maybe<CexLayer2SupportJson>;
  node: CexLayer2SupportJson;
  previous?: Maybe<CexLayer2SupportJson>;
};

export type CexLayer2SupportJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'supports_withdrawals'
  | 'supports_deposits'
  | 'url';

export type CexLayer2SupportJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<CexLayer2SupportJsonEdge>;
  nodes: Array<CexLayer2SupportJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<CexLayer2SupportJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type CexLayer2SupportJsonGroupConnectionDistinctArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonGroupConnectionMaxArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonGroupConnectionMinArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonGroupConnectionSumArgs = {
  field: CexLayer2SupportJsonFieldsEnum;
};


export type CexLayer2SupportJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: CexLayer2SupportJsonFieldsEnum;
};

export type CexLayer2SupportJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<CexLayer2SupportJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type AlltimeJsonConnection = {
  totalCount: Scalars['Int'];
  edges: Array<AlltimeJsonEdge>;
  nodes: Array<AlltimeJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<AlltimeJsonGroupConnection>;
};


export type AlltimeJsonConnectionDistinctArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonConnectionMaxArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonConnectionMinArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonConnectionSumArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: AlltimeJsonFieldsEnum;
};

export type AlltimeJsonEdge = {
  next?: Maybe<AlltimeJson>;
  node: AlltimeJson;
  previous?: Maybe<AlltimeJson>;
};

export type AlltimeJsonFieldsEnum =
  | 'id'
  | 'parent___id'
  | 'parent___parent___id'
  | 'parent___parent___parent___id'
  | 'parent___parent___parent___children'
  | 'parent___parent___children'
  | 'parent___parent___children___id'
  | 'parent___parent___children___children'
  | 'parent___parent___internal___content'
  | 'parent___parent___internal___contentDigest'
  | 'parent___parent___internal___description'
  | 'parent___parent___internal___fieldOwners'
  | 'parent___parent___internal___ignoreType'
  | 'parent___parent___internal___mediaType'
  | 'parent___parent___internal___owner'
  | 'parent___parent___internal___type'
  | 'parent___children'
  | 'parent___children___id'
  | 'parent___children___parent___id'
  | 'parent___children___parent___children'
  | 'parent___children___children'
  | 'parent___children___children___id'
  | 'parent___children___children___children'
  | 'parent___children___internal___content'
  | 'parent___children___internal___contentDigest'
  | 'parent___children___internal___description'
  | 'parent___children___internal___fieldOwners'
  | 'parent___children___internal___ignoreType'
  | 'parent___children___internal___mediaType'
  | 'parent___children___internal___owner'
  | 'parent___children___internal___type'
  | 'parent___internal___content'
  | 'parent___internal___contentDigest'
  | 'parent___internal___description'
  | 'parent___internal___fieldOwners'
  | 'parent___internal___ignoreType'
  | 'parent___internal___mediaType'
  | 'parent___internal___owner'
  | 'parent___internal___type'
  | 'children'
  | 'children___id'
  | 'children___parent___id'
  | 'children___parent___parent___id'
  | 'children___parent___parent___children'
  | 'children___parent___children'
  | 'children___parent___children___id'
  | 'children___parent___children___children'
  | 'children___parent___internal___content'
  | 'children___parent___internal___contentDigest'
  | 'children___parent___internal___description'
  | 'children___parent___internal___fieldOwners'
  | 'children___parent___internal___ignoreType'
  | 'children___parent___internal___mediaType'
  | 'children___parent___internal___owner'
  | 'children___parent___internal___type'
  | 'children___children'
  | 'children___children___id'
  | 'children___children___parent___id'
  | 'children___children___parent___children'
  | 'children___children___children'
  | 'children___children___children___id'
  | 'children___children___children___children'
  | 'children___children___internal___content'
  | 'children___children___internal___contentDigest'
  | 'children___children___internal___description'
  | 'children___children___internal___fieldOwners'
  | 'children___children___internal___ignoreType'
  | 'children___children___internal___mediaType'
  | 'children___children___internal___owner'
  | 'children___children___internal___type'
  | 'children___internal___content'
  | 'children___internal___contentDigest'
  | 'children___internal___description'
  | 'children___internal___fieldOwners'
  | 'children___internal___ignoreType'
  | 'children___internal___mediaType'
  | 'children___internal___owner'
  | 'children___internal___type'
  | 'internal___content'
  | 'internal___contentDigest'
  | 'internal___description'
  | 'internal___fieldOwners'
  | 'internal___ignoreType'
  | 'internal___mediaType'
  | 'internal___owner'
  | 'internal___type'
  | 'name'
  | 'url'
  | 'unit'
  | 'dateRange___from'
  | 'dateRange___to'
  | 'currency'
  | 'mode'
  | 'totalCosts'
  | 'totalTMSavings'
  | 'totalPreTranslated'
  | 'data'
  | 'data___user___id'
  | 'data___user___username'
  | 'data___user___fullName'
  | 'data___user___userRole'
  | 'data___user___avatarUrl'
  | 'data___user___preTranslated'
  | 'data___user___totalCosts'
  | 'data___languages'
  | 'data___languages___language___id'
  | 'data___languages___language___name'
  | 'data___languages___language___tmSavings'
  | 'data___languages___language___preTranslate'
  | 'data___languages___language___totalCosts'
  | 'data___languages___translated___tmMatch'
  | 'data___languages___translated___default'
  | 'data___languages___translated___total'
  | 'data___languages___targetTranslated___tmMatch'
  | 'data___languages___targetTranslated___default'
  | 'data___languages___targetTranslated___total'
  | 'data___languages___translatedByMt___tmMatch'
  | 'data___languages___translatedByMt___default'
  | 'data___languages___translatedByMt___total'
  | 'data___languages___approved___tmMatch'
  | 'data___languages___approved___default'
  | 'data___languages___approved___total'
  | 'data___languages___translationCosts___tmMatch'
  | 'data___languages___translationCosts___default'
  | 'data___languages___translationCosts___total'
  | 'data___languages___approvalCosts___tmMatch'
  | 'data___languages___approvalCosts___default'
  | 'data___languages___approvalCosts___total';

export type AlltimeJsonGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<AlltimeJsonEdge>;
  nodes: Array<AlltimeJson>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
  group: Array<AlltimeJsonGroupConnection>;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};


export type AlltimeJsonGroupConnectionDistinctArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonGroupConnectionMaxArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonGroupConnectionMinArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonGroupConnectionSumArgs = {
  field: AlltimeJsonFieldsEnum;
};


export type AlltimeJsonGroupConnectionGroupArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  field: AlltimeJsonFieldsEnum;
};

export type AlltimeJsonSortInput = {
  fields?: InputMaybe<Array<InputMaybe<AlltimeJsonFieldsEnum>>>;
  order?: InputMaybe<Array<InputMaybe<SortOrderEnum>>>;
};

export type IndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageQuery = { hero?: { childImageSharp?: { gatsbyImageData: any } | null } | null, ethereum?: { childImageSharp?: { gatsbyImageData: any } | null } | null, enterprise?: { childImageSharp?: { gatsbyImageData: any } | null } | null, dogefixed?: { childImageSharp?: { gatsbyImageData: any } | null } | null, robotfixed?: { childImageSharp?: { gatsbyImageData: any } | null } | null, ethfixed?: { childImageSharp?: { gatsbyImageData: any } | null } | null, devfixed?: { childImageSharp?: { gatsbyImageData: any } | null } | null, future?: { childImageSharp?: { gatsbyImageData: any } | null } | null, impact?: { childImageSharp?: { gatsbyImageData: any } | null } | null, finance?: { childImageSharp?: { gatsbyImageData: any } | null } | null, hackathon?: { childImageSharp?: { gatsbyImageData: any } | null } | null, infrastructure?: { childImageSharp?: { gatsbyImageData: any } | null } | null, infrastructurefixed?: { childImageSharp?: { gatsbyImageData: any } | null } | null, merge?: { childImageSharp?: { gatsbyImageData: any } | null } | null };

export type GatsbyImageSharpFixedFragment = { base64?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_TracedSvgFragment = { tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebpFragment = { base64?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = { tracedSVG?: string | null, width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFixed_NoBase64Fragment = { width: number, height: number, src: string, srcSet: string };

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = { width: number, height: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null };

export type GatsbyImageSharpFluidFragment = { base64?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = { maxHeight: number, maxWidth: number };

export type GatsbyImageSharpFluid_TracedSvgFragment = { tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebpFragment = { base64?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = { tracedSVG?: string | null, aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type GatsbyImageSharpFluid_NoBase64Fragment = { aspectRatio: number, src: string, srcSet: string, sizes: string };

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = { aspectRatio: number, src: string, srcSet: string, srcWebp?: string | null, srcSetWebp?: string | null, sizes: string };

export type AllMdxQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMdxQuery = { allMdx: { edges: Array<{ node: { fields?: { isOutdated?: boolean | null, slug?: string | null, relativePath?: string | null } | null, frontmatter?: { lang?: string | null, template?: string | null } | null } }> } };
