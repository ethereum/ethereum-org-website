# Mock Data Files

These mock data files are generated from Netlify Blobs storage for local development.

## Usage

These files can be used to mock the data-layer storage in local development environments without needing to connect to Netlify Blobs.

## Generation

To regenerate these files, run:

```bash
npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts
```

## Files

- `index.ts` - TypeScript index file with task ID exports
- `*.json` - Individual mock data files for each task

## Last Generated

2025-12-05T21:54:56.350Z

## Statistics

- Total tasks: 21
- Successfully generated: 20
- Not found: 1

