import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc"
import type { HTMLAttributes } from "react"
import remarkGfm from "remark-gfm"

import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

type ComponentProps = HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

/**
 * Minimal markdown components for user-generated content
 * Stripped down from MdComponents - no tooltips, images, or complex features
 */
const simpleComponents = {
  // All headings become bold paragraphs
  h1: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-4 font-bold", className)} {...props}>
      {children}
    </p>
  ),
  h2: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-4 font-bold", className)} {...props}>
      {children}
    </p>
  ),
  h3: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-3 font-bold", className)} {...props}>
      {children}
    </p>
  ),
  h4: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-3 font-bold", className)} {...props}>
      {children}
    </p>
  ),
  h5: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-2 font-bold", className)} {...props}>
      {children}
    </p>
  ),
  h6: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-2 mt-2 font-bold", className)} {...props}>
      {children}
    </p>
  ),

  // Basic paragraph
  p: ({ children, className, ...props }: ComponentProps) => (
    <p className={cn("mb-3 last:mb-0", className)} {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: (props: ComponentProps) => <UnorderedList {...props} />,
  ol: (props: ComponentProps) => <OrderedList {...props} />,
  li: (props: ComponentProps) => <ListItem {...props} />,

  // Inline formatting
  strong: ({ children, ...props }: ComponentProps) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentProps) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  code: ({ children, ...props }: ComponentProps) => (
    <code
      className="rounded bg-background-highlight px-1 py-0.5 font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <InlineLink {...props} />
  ),

  // Blockquote
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote
      className="my-3 border-s-2 border-accent-a bg-accent-a/10 p-4"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="my-4 border-body-medium opacity-60" />,
}

/**
 * Renders simple markdown to React components
 * For user-generated content like app descriptions
 *
 * @param markdown - The markdown string to render
 * @param componentOverrides - Optional component overrides (e.g., { img: () => null })
 * @returns React element with rendered markdown
 */
export async function renderSimpleMarkdown(
  markdown: string,
  componentOverrides?: MDXRemoteProps["components"]
) {
  const { content } = await compileMDX({
    source: markdown,
    components: { ...simpleComponents, ...componentOverrides },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return content
}
