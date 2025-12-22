export default function DevNotesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Developer notes</h1>
      <p className="mb-6 text-lg text-gray-200">
        This page is intended to help new contributors quickly understand how to
        work with the ethereum.org Next.js app locally.
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Local development checklist</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-100">
          <li>Ensure you are on the <code>dev</code> branch with an up-to-date fork.</li>
          <li>Use the Node.js version specified in <code>.nvmrc</code>.</li>
          <li>Enable Corepack and install dependencies via <code>pnpm install</code>.</li>
          <li>Run <code>pnpm dev</code> and open <code>http://localhost:3000</code> in your browser.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Common app tasks</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-100">
          <li>
            Use <code>pnpm lint</code> before opening a PR to catch most style issues.
          </li>
          <li>
            When adding pages, prefer the <code>app/</code> directory conventions and
            existing layout components.
          </li>
          <li>
            Check for i18n implications when changing shared components or navigation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">When to update this page</h2>
        <p className="text-gray-100">
          If the recommended local workflow or scripts change, please update this page
          so that new contributors always see current guidance for working with the app.
        </p>
      </section>
    </main>
  );
}
