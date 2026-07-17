import type { LatestArticle } from "@/lib/types"

/**
 * Card byline shared by the highlights carousel and the article grid so both
 * stay consistent: hosted (builder) articles show "Author • Team" — whichever
 * exist — falling back to the source; RSS/external items show the publisher
 * (source) name only.
 *
 * Kept free of server-only imports so the client-side grid can use it too.
 */
export const getArticleByline = (
  article: LatestArticle
): string | undefined => {
  if (!article.isExternal) {
    const credit = [article.author, article.team].filter(Boolean).join(" • ")
    return credit || article.source || undefined
  }
  return article.source || undefined
}
