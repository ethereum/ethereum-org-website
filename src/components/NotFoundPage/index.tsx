import MainArticle from "../MainArticle"
import Translation from "../Translation"
import InlineLink from "../ui/Link"

function NotFoundPage() {
  return (
    <div className="mx-auto mb-0 mt-16 flex w-full flex-col items-center">
      <MainArticle className="my-8 w-full space-y-8 px-8 py-4">
        <h1>
          <Translation id="we-couldnt-find-that-page" />
        </h1>
        <p>
          <Translation id="try-using-search" />{" "}
          <InlineLink href="/">
            <Translation id="return-home" />
          </InlineLink>
          .
        </p>
      </MainArticle>
    </div>
  )
}

export default NotFoundPage
