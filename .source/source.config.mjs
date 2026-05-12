// source.config.ts
import { applyMdxPreset, defineCollections } from "fumadocs-mdx/config";
import remarkHeadingId from "remark-heading-id";

// src/lib/poc-fumadocs/rehypeImgForFumadocs.ts
import path2 from "node:path";
import { fileURLToPath } from "node:url";

// src/lib/md/rehypeImg.ts
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";

// src/lib/utils/crypto.ts
var getHashFromBuffer = async (buffer, options) => {
  const hashBuffer = await crypto.subtle.digest(
    options?.algorithm || "SHA-256",
    buffer
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return options?.length ? hashString.slice(-Math.abs(options.length)) : hashString;
};

// src/lib/utils/i18n.ts
import { existsSync } from "fs";
import { join } from "path";

// i18n.config.json
var i18n_config_default = [
  {
    code: "en",
    crowdinCode: "en",
    name: "English",
    localName: "English",
    langDir: "ltr"
  },
  {
    code: "ar",
    crowdinCode: "ar",
    name: "Arabic",
    localName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    langDir: "rtl"
  },
  {
    code: "bn",
    crowdinCode: "bn",
    name: "Bengali",
    localName: "\u09AC\u09BE\u0982\u09B2\u09BE",
    langDir: "ltr"
  },
  {
    code: "cs",
    crowdinCode: "cs",
    name: "Czech",
    localName: "\u010Ce\u0161tina",
    langDir: "ltr"
  },
  {
    code: "de",
    crowdinCode: "de",
    name: "German",
    localName: "Deutsch",
    langDir: "ltr"
  },
  {
    code: "es",
    crowdinCode: "es-EM",
    name: "Spanish",
    localName: "Espa\xF1ol",
    langDir: "ltr"
  },
  {
    code: "fr",
    crowdinCode: "fr",
    name: "French",
    localName: "Fran\xE7ais",
    langDir: "ltr"
  },
  {
    code: "hi",
    crowdinCode: "hi",
    name: "Hindi",
    localName: "\u0939\u093F\u0928\u094D\u0926\u0940",
    langDir: "ltr"
  },
  {
    code: "id",
    crowdinCode: "id",
    name: "Indonesian",
    localName: "Bahasa Indonesia",
    langDir: "ltr"
  },
  {
    code: "it",
    crowdinCode: "it",
    name: "Italian",
    localName: "Italiano",
    langDir: "ltr"
  },
  {
    code: "ja",
    crowdinCode: "ja",
    name: "Japanese",
    localName: "\u65E5\u672C\u8A9E",
    langDir: "ltr"
  },
  {
    code: "ko",
    crowdinCode: "ko",
    name: "Korean",
    localName: "\uD55C\uAD6D\uC5B4",
    langDir: "ltr"
  },
  {
    code: "mr",
    crowdinCode: "mr",
    name: "Marathi",
    localName: "\u092E\u0930\u093E\u0920\u0940",
    langDir: "ltr"
  },
  {
    code: "pl",
    crowdinCode: "pl",
    name: "Polish",
    localName: "Polski",
    langDir: "ltr"
  },
  {
    code: "pt-br",
    crowdinCode: "pt-BR",
    name: "Portuguese (Brazilian)",
    localName: "Portugu\xEAs",
    langDir: "ltr"
  },
  {
    code: "ru",
    crowdinCode: "ru",
    name: "Russian",
    localName: "P\u0443\u0441\u0441\u043A\u0438\u0439",
    langDir: "ltr"
  },
  {
    code: "sw",
    crowdinCode: "sw",
    name: "Swahili",
    localName: "Kiswahili",
    langDir: "ltr"
  },
  {
    code: "ta",
    crowdinCode: "ta",
    name: "Tamil",
    localName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
    langDir: "ltr"
  },
  {
    code: "te",
    crowdinCode: "te",
    name: "Telugu",
    localName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
    langDir: "ltr"
  },
  {
    code: "tr",
    crowdinCode: "tr",
    name: "Turkish",
    localName: "T\xFCrk\xE7e",
    langDir: "ltr"
  },
  {
    code: "uk",
    crowdinCode: "uk",
    name: "Ukrainian",
    localName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    langDir: "ltr"
  },
  {
    code: "ur",
    crowdinCode: "ur-IN",
    name: "Urdu",
    localName: "\u0627\u0631\u062F\u0648",
    langDir: "rtl"
  },
  {
    code: "vi",
    crowdinCode: "vi",
    name: "Vietnamese",
    localName: "Ti\u1EBFng Vi\u1EC7t",
    langDir: "ltr"
  },
  {
    code: "zh-tw",
    crowdinCode: "zh-TW",
    name: "Chinese Traditional",
    localName: "\u7E41\u9AD4\u4E2D\u6587",
    langDir: "ltr"
  },
  {
    code: "zh",
    crowdinCode: "zh-CN",
    name: "Chinese Simplified",
    localName: "\u7B80\u4F53\u4E2D\u6587",
    langDir: "ltr"
  }
];

// src/lib/constants.ts
var TRANSLATED_IMAGES_DIR = "/content/translations";
var PLACEHOLDER_IMAGE_DIR = "src/data/placeholders";
var DEFAULT_LOCALE = "en";
var BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES;
var LOCALES_CODES = BUILD_LOCALES ? BUILD_LOCALES.split(",") : i18n_config_default.map(({ code }) => code);
var SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ethereum.org";
var IS_PRODUCTION_DEPLOY = process.env.NEXT_PUBLIC_CONTEXT === "production";
var GITHUB_BASE_API = "https://api.github.com/repos/ethereum/ethereum-org-website";
var GITHUB_COMMITS_URL = GITHUB_BASE_API + "/commits";
var VITALIK_FEED = "https://vitalik.eth.limo/feed.xml";
var SOLIDITY_FEED = "https://soliditylang.org/feed.xml";
var ATTESTANT_BLOG = "https://www.attestant.io/posts/";
var COMMUNITY_BLOGS = [
  {
    href: "https://vitalik.eth.limo/",
    feed: VITALIK_FEED
  },
  {
    href: "https://blog.ethereum.org/",
    feed: "https://blog.ethereum.org/en/feed.xml"
  },
  {
    href: "https://ethpandaops.io/posts/",
    feed: "https://ethpandaops.io/posts/rss.xml"
  },
  {
    href: "https://ethstaker.cc/blog",
    feed: "https://raw.githubusercontent.com/eth-educators/github-actions/refs/heads/main/_data/blog_data.xml"
  },
  {
    name: "0xPARC",
    href: "https://0xparc.org/blog"
  },
  { href: ATTESTANT_BLOG, feed: ATTESTANT_BLOG },
  { name: "Devcon", href: "https://devcon.org/en/blogs/" },
  {
    href: "https://soliditylang.org/blog/",
    feed: SOLIDITY_FEED
  },
  {
    href: "https://paragraph.com/@privacy-scaling-explorations",
    feed: "https://api.paragraph.com/blogs/rss/@privacy-scaling-explorations"
  },
  {
    href: "https://paragraph.com/@josh-stark",
    feed: "https://api.paragraph.com/blogs/rss/@josh-stark"
  },
  {
    href: "https://medium.com/ethereum-cat-herders/newsletter",
    feed: "https://medium.com/feed/ethereum-cat-herders"
  },
  {
    href: "https://geodework.com/blog",
    feed: "https://geodework.com/feed.xml"
  },
  {
    href: "https://ethereal.news",
    feed: "https://ethereal.news/rss.xml"
  }
];
var BLOG_FEEDS = COMMUNITY_BLOGS.map(({ feed }) => feed).filter(
  Boolean
);
var BLOGS_WITHOUT_FEED = COMMUNITY_BLOGS.filter((item) => !item.feed);

// src/lib/utils/i18n.ts
var getTranslatedImgPath = (originalPath, locale) => join(
  `${TRANSLATED_IMAGES_DIR}/${locale}`,
  originalPath.split("/content/").slice(1).join("/")
);
var checkIfImageIsTranslated = (translatedImgPath) => existsSync(join("public", translatedImgPath));

// src/lib/utils/relativePath.ts
var toPosixPath = (path3) => path3.replace(/\\/g, "/");

// src/lib/md/rehypeImg.ts
var absolutePathRegex = /^(?:[a-z]+:)?\/\//;
var getImageSize = (src, dir) => {
  if (absolutePathRegex.exec(src)) {
    return;
  }
  const shouldJoin = !path.isAbsolute(src) || src.startsWith("/");
  if (dir && shouldJoin) {
    src = path.join(dir, src);
  }
  try {
    return sizeOf(src);
  } catch {
    return void 0;
  }
};
var setImagePlaceholders = async (images, srcPath) => {
  const FILENAME = toPosixPath(path.join(srcPath, "data.json")).replaceAll("/", "-").slice(1);
  if (!fs.existsSync(PLACEHOLDER_IMAGE_DIR))
    fs.mkdirSync(PLACEHOLDER_IMAGE_DIR, { recursive: true });
  const DATA_PATH = path.join(PLACEHOLDER_IMAGE_DIR, FILENAME);
  const existsCache = fs.existsSync(DATA_PATH);
  const placeholdersCached = existsCache ? JSON.parse(fs.readFileSync(DATA_PATH, "utf8")) : {};
  let isChanged = false;
  for (const image of images) {
    const { src } = image.properties;
    if (src.startsWith("http")) continue;
    const buffer = fs.readFileSync(path.join("public", src));
    const hash = await getHashFromBuffer(buffer, {
      algorithm: "SHA-1",
      length: 8
    });
    const cachedPlaceholder = placeholdersCached[src]?.hash === hash ? placeholdersCached[src] : null;
    const { base64 } = cachedPlaceholder || await getPlaiceholder(buffer, { size: 16 });
    image.properties.blurDataURL = base64;
    image.properties.placeholder = "blur";
    if (!cachedPlaceholder) {
      placeholdersCached[src] = { hash, base64 };
      isChanged = true;
    }
  }
  if (Object.keys(placeholdersCached).length === 0) {
    fs.rmSync(DATA_PATH, { recursive: true, force: true });
    return;
  }
  if (!isChanged) return;
  fs.writeFileSync(DATA_PATH, JSON.stringify(placeholdersCached, null, 2));
};
var rehypeImg = (options) => {
  const opts = options || {};
  const dir = opts.dir;
  const srcPath = opts.srcPath;
  const locale = opts.locale;
  return async (tree) => {
    const images = [];
    visit(tree, "element", (node) => {
      if (node.tagName === "img" && node.properties) {
        const src = node.properties.src;
        const dimensions = getImageSize(src, dir);
        if (!dimensions) {
          return;
        }
        const originalPath = path.join(srcPath, src).replace(/\\/g, "/");
        const translatedImgPath = getTranslatedImgPath(originalPath, locale);
        const imageIsTranslated = checkIfImageIsTranslated(translatedImgPath);
        node.properties.src = imageIsTranslated && locale !== DEFAULT_LOCALE ? translatedImgPath : originalPath;
        node.properties.width = dimensions.width;
        node.properties.height = dimensions.height;
        node.properties.aspectRatio = (dimensions.width || 1) / (dimensions.height || 1);
        images.push(node);
      }
    });
    await setImagePlaceholders(images, srcPath);
  };
};
var rehypeImg_default = rehypeImg;

// src/lib/poc-fumadocs/rehypeImgForFumadocs.ts
var translationDirRe = /^public\/content\/translations\/([^/]+)\//;
var rehypeImgForFumadocs = () => {
  return async (tree, file) => {
    const absPath = file.path ? file.path.startsWith("file:") ? fileURLToPath(file.path) : file.path : "";
    const cwd = file.cwd ?? process.cwd();
    const rel = path2.relative(cwd, absPath);
    let locale = "en";
    let normalized = rel;
    const m = translationDirRe.exec(rel);
    if (m) {
      locale = m[1];
      normalized = rel.replace(translationDirRe, "public/content/");
    }
    const dir = path2.dirname(normalized);
    const srcPath = "/" + dir.replace(/^public\//, "");
    const inner = rehypeImg_default({ dir, srcPath, locale });
    return inner(tree);
  };
};
var rehypeImgForFumadocs_default = rehypeImgForFumadocs;

// src/lib/poc-fumadocs/rehypeStripRaw.ts
var rehypeStripRaw = () => (tree) => {
  const walk = (node) => {
    if (!node || !Array.isArray(node.children)) return;
    node.children = node.children.filter((c) => c?.type !== "raw");
    for (const child of node.children) walk(child);
  };
  walk(tree);
};
var rehypeStripRaw_default = rehypeStripRaw;

// source.config.ts
var frontmatterSchema = {
  "~standard": {
    version: 1,
    vendor: "ethereum-org-poc",
    validate: (v) => ({ value: v }),
    types: {
      input: {},
      output: {}
    }
  }
};
var sharedMdxOptions = applyMdxPreset({
  remarkPlugins: (v) => [remarkHeadingId, ...v],
  // `rehypeStripRaw` must run before Fumadocs' rehype-toc. The preset
  // resolver puts user-returned plugins at the END (the spread is
  // `[rehypeCode, ...preset, ...user]` after resolvePlugins runs), so we
  // can't append it after `v`. Prepending it makes it the first rehype
  // plugin in the chain, running before rehype-toc.
  rehypePlugins: (v) => [rehypeStripRaw_default, ...v, rehypeImgForFumadocs_default],
  // Disable Fumadocs' Shiki integration — our content uses langs like
  // `yul`/`zokrates` that aren't in Shiki's default set, and the existing
  // pipeline relies on its own `pre`/`code` components for highlighting.
  rehypeCodeOptions: false,
  // Disable preset's remarkImage — it converts `![](./img.png)` into ES
  // module imports (`useImport: true` in bundler env), which clashes with
  // our `rehypeImgForFumadocs` that expects raw `img` elements with
  // string `src` props read from the filesystem.
  remarkImageOptions: false
});
var BUILD_LOCALES2 = process.env.NEXT_PUBLIC_BUILD_LOCALES?.split(",");
var isLocaleEnabled = (locale) => !BUILD_LOCALES2 || BUILD_LOCALES2.includes(locale);
var NO_MATCH = ["__disabled_locale_never_matches__.never"];
var docCollection = (dir, files, locale) => defineCollections({
  type: "doc",
  dir,
  files: isLocaleEnabled(locale) ? files : NO_MATCH,
  schema: frontmatterSchema,
  // Async mode emits lazy `() => import()` body refs and only eagerly
  // imports frontmatter. The page handler awaits `data.load()` to pull
  // the compiled body/toc on demand. Matches solana-com's pattern for
  // large MDX trees; defers per-page compile to first request rather
  // than enumerating all body modules at config-load time.
  async: true,
  mdxOptions: sharedMdxOptions
});
var TRANSLATED_GLOB = ["**/*.md", "**/*.mdx"];
var content_en = docCollection(
  "public/content",
  ["**/*.md", "**/*.mdx", "!translations/**"],
  "en"
);
var content_ar = docCollection(
  "public/content/translations/ar",
  TRANSLATED_GLOB,
  "ar"
);
var content_bn = docCollection(
  "public/content/translations/bn",
  TRANSLATED_GLOB,
  "bn"
);
var content_cs = docCollection(
  "public/content/translations/cs",
  TRANSLATED_GLOB,
  "cs"
);
var content_de = docCollection(
  "public/content/translations/de",
  TRANSLATED_GLOB,
  "de"
);
var content_es = docCollection(
  "public/content/translations/es",
  TRANSLATED_GLOB,
  "es"
);
var content_fr = docCollection(
  "public/content/translations/fr",
  TRANSLATED_GLOB,
  "fr"
);
var content_hi = docCollection(
  "public/content/translations/hi",
  TRANSLATED_GLOB,
  "hi"
);
var content_id = docCollection(
  "public/content/translations/id",
  TRANSLATED_GLOB,
  "id"
);
var content_it = docCollection(
  "public/content/translations/it",
  TRANSLATED_GLOB,
  "it"
);
var content_ja = docCollection(
  "public/content/translations/ja",
  TRANSLATED_GLOB,
  "ja"
);
var content_ko = docCollection(
  "public/content/translations/ko",
  TRANSLATED_GLOB,
  "ko"
);
var content_mr = docCollection(
  "public/content/translations/mr",
  TRANSLATED_GLOB,
  "mr"
);
var content_pl = docCollection(
  "public/content/translations/pl",
  TRANSLATED_GLOB,
  "pl"
);
var content_pt_br = docCollection(
  "public/content/translations/pt-br",
  TRANSLATED_GLOB,
  "pt-br"
);
var content_ru = docCollection(
  "public/content/translations/ru",
  TRANSLATED_GLOB,
  "ru"
);
var content_sw = docCollection(
  "public/content/translations/sw",
  TRANSLATED_GLOB,
  "sw"
);
var content_ta = docCollection(
  "public/content/translations/ta",
  TRANSLATED_GLOB,
  "ta"
);
var content_te = docCollection(
  "public/content/translations/te",
  TRANSLATED_GLOB,
  "te"
);
var content_tr = docCollection(
  "public/content/translations/tr",
  TRANSLATED_GLOB,
  "tr"
);
var content_uk = docCollection(
  "public/content/translations/uk",
  TRANSLATED_GLOB,
  "uk"
);
var content_ur = docCollection(
  "public/content/translations/ur",
  TRANSLATED_GLOB,
  "ur"
);
var content_vi = docCollection(
  "public/content/translations/vi",
  TRANSLATED_GLOB,
  "vi"
);
var content_zh_tw = docCollection(
  "public/content/translations/zh-tw",
  TRANSLATED_GLOB,
  "zh-tw"
);
var content_zh = docCollection(
  "public/content/translations/zh",
  TRANSLATED_GLOB,
  "zh"
);
export {
  content_ar,
  content_bn,
  content_cs,
  content_de,
  content_en,
  content_es,
  content_fr,
  content_hi,
  content_id,
  content_it,
  content_ja,
  content_ko,
  content_mr,
  content_pl,
  content_pt_br,
  content_ru,
  content_sw,
  content_ta,
  content_te,
  content_tr,
  content_uk,
  content_ur,
  content_vi,
  content_zh,
  content_zh_tw
};
