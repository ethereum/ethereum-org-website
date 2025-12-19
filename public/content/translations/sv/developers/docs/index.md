---
title: Utvecklardokumentation - Bygg moderna appar
description: Komplett utvecklardokumentation för att bygga AI-appar, full-stack webbapplikationer och Web3 dApps.
lang: sv
---

# Utvecklardokumentation {#developer-docs}

Välkommen till den kompletta guiden för modern applikationsutveckling! Här hittar du allt du behöver för att bygga AI-drivna appar, full-stack webbapplikationer och Web3 dApps.

## 🚀 Snabbstart {#quickstart}

### Din första Next.js app på 5 minuter {#first-app}

```bash
# Skapa projekt
npx create-next-app@latest my-app --typescript --tailwind --app

# Gå till mappen
cd my-app

# Starta dev server
npm run dev
```

Öppna `http://localhost:3000` - Grattis, du har en Next.js app! 🎉

### Lägg till AI på 5 minuter till {#add-ai}

```bash
# Installera AI SDK
npm install ai openai

# Skapa .env.local
echo "OPENAI_API_KEY=your-key-here" > .env.local
```

Skapa `app/api/chat/route.ts`:
```typescript
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

Nu har du AI i din app! 🤖

## 📚 Dokumentation per kategori {#categories}

### Frontend Development {#frontend}

**React & Next.js**
- [Next.js fundamentals](/developers/docs/frameworks/nextjs/)
- [React hooks guide](/developers/docs/frameworks/react-hooks/)
- [Server vs Client Components](/developers/docs/frameworks/server-client/)
- [Routing i Next.js](/developers/docs/frameworks/routing/)

**Styling**
- [Tailwind CSS setup](/developers/docs/styling/tailwind/)
- [CSS Modules](/developers/docs/styling/css-modules/)
- [shadcn/ui components](/developers/docs/styling/shadcn/)

**State Management**
- [Zustand guide](/developers/docs/state/zustand/)
- [Redux Toolkit](/developers/docs/state/redux/)
- [React Context API](/developers/docs/state/context/)

### Backend Development {#backend}

**API Development**
- [Next.js API Routes](/developers/docs/apis/nextjs-routes/)
- [FastAPI (Python)](/developers/docs/apis/fastapi/)
- [Express.js (Node)](/developers/docs/apis/express/)
- [tRPC type-safe APIs](/developers/docs/apis/trpc/)

**Databaser**
- [PostgreSQL & Prisma](/developers/docs/databases/postgresql/)
- [MongoDB](/developers/docs/databases/mongodb/)
- [Supabase](/developers/docs/databases/supabase/)
- [Redis caching](/developers/docs/databases/redis/)

**Authentication**
- [NextAuth.js](/developers/docs/auth/nextauth/)
- [Clerk](/developers/docs/auth/clerk/)
- [JWT tokens](/developers/docs/auth/jwt/)
- [Web3 wallet auth](/developers/docs/auth/wallet/)

### AI & Machine Learning {#ai-ml}

**Large Language Models**
- [OpenAI API integration](/developers/docs/ai/openai/)
- [Anthropic Claude](/developers/docs/ai/claude/)
- [Local LLMs med Ollama](/developers/docs/ai/ollama/)

**AI Frameworks**
- [LangChain](/developers/docs/ai/langchain/)
- [LlamaIndex](/developers/docs/ai/llamaindex/)
- [Vercel AI SDK](/developers/docs/ai/vercel-ai-sdk/)

**Vector Databases**
- [Pinecone](/developers/docs/ai/pinecone/)
- [Weaviate](/developers/docs/ai/weaviate/)
- [Chroma](/developers/docs/ai/chroma/)

**RAG & Embeddings**
- [Implementera RAG](/developers/docs/ai/rag/)
- [Text embeddings](/developers/docs/ai/embeddings/)
- [Semantic search](/developers/docs/ai/semantic-search/)

### Web3 & Blockchain {#web3}

**Smart Contracts**
- [Solidity grundkurs](/developers/docs/smart-contracts/)
- [Hardhat development](/developers/docs/smart-contracts/hardhat/)
- [OpenZeppelin contracts](/developers/docs/smart-contracts/openzeppelin/)
- [Contract testing](/developers/docs/smart-contracts/testing/)

**Frontend Integration**
- [ethers.js](/developers/docs/web3/ethers/)
- [wagmi hooks](/developers/docs/web3/wagmi/)
- [RainbowKit](/developers/docs/web3/rainbowkit/)
- [Web3Modal](/developers/docs/web3/web3modal/)

**Development Tools**
- [Hardhat](/developers/docs/web3/hardhat/)
- [Foundry](/developers/docs/web3/foundry/)
- [Remix IDE](/developers/docs/web3/remix/)

### Testing {#testing}

**Unit Testing**
- [Vitest](/developers/docs/testing/vitest/)
- [Jest](/developers/docs/testing/jest/)
- [React Testing Library](/developers/docs/testing/rtl/)

**E2E Testing**
- [Playwright](/developers/docs/testing/playwright/)
- [Cypress](/developers/docs/testing/cypress/)

**Smart Contract Testing**
- [Hardhat tests](/developers/docs/testing/hardhat/)
- [Foundry tests](/developers/docs/testing/foundry/)

### Deployment & DevOps {#deployment}

**Platforms**
- [Vercel deployment](/developers/docs/deployment/vercel/)
- [Railway](/developers/docs/deployment/railway/)
- [Netlify](/developers/docs/deployment/netlify/)
- [AWS](/developers/docs/deployment/aws/)

**Containerization**
- [Docker basics](/developers/docs/devops/docker/)
- [Docker Compose](/developers/docs/devops/docker-compose/)
- [Kubernetes](/developers/docs/devops/kubernetes/)

**CI/CD**
- [GitHub Actions](/developers/docs/devops/github-actions/)
- [GitLab CI](/developers/docs/devops/gitlab-ci/)

### Performance & Optimization {#performance}

**React Performance**
- [Memoization](/developers/docs/performance/memoization/)
- [Code splitting](/developers/docs/performance/code-splitting/)
- [Lazy loading](/developers/docs/performance/lazy-loading/)

**Next.js Optimization**
- [Image optimization](/developers/docs/performance/images/)
- [Font optimization](/developers/docs/performance/fonts/)
- [Bundle analysis](/developers/docs/performance/bundle/)

**Database Optimization**
- [Query optimization](/developers/docs/performance/queries/)
- [Indexing strategies](/developers/docs/performance/indexing/)
- [Caching strategies](/developers/docs/performance/caching/)

## 🎓 Learning Paths {#learning-paths}

### Path 1: Full-Stack Developer {#fullstack-path}

**Vecka 1-2: Frontend Fundamentals**
- HTML, CSS, JavaScript
- React basics
- TypeScript

**Vecka 3-4: Next.js & Modern Stack**
- Next.js App Router
- Tailwind CSS
- Server Components

**Vecka 5-6: Backend & Databases**
- API development
- PostgreSQL + Prisma
- Authentication

**Vecka 7-8: Real Project**
- Build a blog platform
- Deploy to Vercel
- Add features

### Path 2: AI Developer {#ai-path}

**Vecka 1: AI Fundamentals**
- LLM basics
- OpenAI API
- Prompt engineering

**Vecka 2: AI Integration**
- Vercel AI SDK
- Streaming responses
- Chat interfaces

**Vecka 3: Advanced AI**
- RAG implementation
- Vector databases
- LangChain

**Vecka 4: Production AI App**
- Build AI SaaS
- Payment integration
- User management

### Path 3: Web3 Developer {#web3-path}

**Vecka 1: Blockchain Basics**
- How blockchain works
- Wallets & transactions
- Ethers.js

**Vecka 2: Smart Contracts**
- Solidity programming
- Deploy contracts
- Testing

**Vecka 3: dApp Development**
- wagmi integration
- Frontend + contract
- Web3 patterns

**Vecka 4: Full dApp**
- NFT marketplace
- DeFi protocol
- Production deploy

## 🛠️ Essential Tools {#essential-tools}

### Code Editors {#editors}

**VS Code** (rekommenderat)
```json
// Essential extensions
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "Prisma.prisma"
  ]
}
```

### Terminal Tools {#terminal}

```bash
# Package managers
npm, yarn, pnpm (snabbast)

# Version control
git, gh (GitHub CLI)

# Containerization
docker, docker-compose

# Cloud
vercel, railway, netlify CLI
```

### Browser DevTools {#browser-devtools}

- **React DevTools** - Debug React components
- **Redux DevTools** - State inspection
- **Apollo DevTools** - GraphQL debugging
- **MetaMask** - Web3 development

## 📖 Code Examples {#code-examples}

### REST API med Next.js {#rest-api-example}

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: body
  });
  return NextResponse.json(user, { status: 201 });
}
```

### Database Query med Prisma {#database-example}

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Skapa användare
const user = await prisma.user.create({
  data: {
    name: 'Anna',
    email: 'anna@example.com',
    posts: {
      create: [
        { title: 'First Post' },
        { title: 'Second Post' }
      ]
    }
  },
  include: {
    posts: true
  }
});

// Komplex query
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: '@gmail.com'
    }
  },
  include: {
    posts: {
      where: {
        published: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  },
  take: 10
});
```

### AI Chat Component {#ai-chat-example}

```typescript
// components/Chat.tsx
'use client'
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-gray-100'
            }`}
          >
            <p className="font-semibold">{message.role}</p>
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && <div className="animate-pulse">AI tänker...</div>}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Skriv ett meddelande..."
          className="w-full p-3 border rounded-lg"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
```

### Smart Contract Interaction {#smart-contract-example}

```typescript
// hooks/useContract.ts
import { useWriteContract, useReadContract } from 'wagmi';

export function useMyContract() {
  const { data: balance } = useReadContract({
    address: '0x...',
    abi: ABI,
    functionName: 'balanceOf',
    args: [userAddress]
  });
  
  const { write: transfer } = useWriteContract({
    address: '0x...',
    abi: ABI,
    functionName: 'transfer'
  });
  
  return { balance, transfer };
}
```

## 🔧 Configuration Files {#config-files}

### TypeScript Config {#tsconfig}

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Config {#tailwind-config}

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
    },
  },
  plugins: [],
}
export default config
```

### Prisma Schema {#prisma-schema}

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 💡 Best Practices {#best-practices}

### Code Organization {#code-organization}

```
src/
├── app/                 # Next.js pages
├── components/
│   ├── ui/             # Reusable UI components
│   ├── features/       # Feature-specific components
│   └── layouts/        # Layout components
├── lib/
│   ├── db.ts          # Database client
│   ├── auth.ts        # Auth config
│   └── utils.ts       # Utility functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
└── config/             # App configuration
```

### Error Handling {#error-handling}

```typescript
// lib/api-error.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// app/api/users/route.ts
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

### Environment Variables {#env-vars}

```bash
# .env.local
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# .env.example (commit this!)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
OPENAI_API_KEY="your-api-key-here"
```

## 🎯 Project Templates {#templates}

### Next.js + AI Template {#nextjs-ai-template}

```bash
git clone https://github.com/vercel/ai-chatbot
cd ai-chatbot
npm install
npm run dev
```

### Next.js + Web3 Template {#nextjs-web3-template}

```bash
npx create-wagmi@latest my-dapp
cd my-dapp
npm install
npm run dev
```

### Full-Stack Starter {#fullstack-starter}

```bash
npx create-t3-app@latest
# Välj: Next.js + tRPC + Prisma + Tailwind
```

## 📚 Further Reading {#further-reading}

### Official Documentation {#official-docs}
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Video Courses {#video-courses}
- **Frontend Masters** - Professional courses
- **Egghead.io** - Bite-sized lessons
- **Fireship** - Quick overviews
- **Theo** - Modern best practices

### Communities {#communities}
- **Next.js Discord** - Active help channel
- **Reactiflux** - React community
- **r/webdev** - Reddit community
- **Dev.to** - Developer articles

Nu har du allt du behöver för att börja bygga! Välj en learning path, följ guiderna, och börja koda. 🚀
