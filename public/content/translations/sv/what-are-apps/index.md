---
title: Moderna webbappar och AI-applikationer
metaTitle: Moderna appar | Full-stack utveckling
description: Lär dig bygga moderna webbappar med React, Next.js, AI-integration och smart contracts. Full-stack utveckling från frontend till deployment.
lang: sv
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
showDropdown: false
image: /images/doge-computer.png
summary: Bygg moderna, AI-drivna appar med Next.js, React och smart contracts. Lär dig full-stack utveckling från frontend till backend och deployment.
---

## Moderna appar med superkrafter {#apps-with-superpowers}

Dagens moderna appar använder kraftfulla teknologier som AI, realtidsdata och blockchain. De känns som vanliga appar, men har speciella förmågor under huven.

**Vad gör en app "modern"?**
- **AI-integration** - ChatGPT, bildigenkänning, smarta rekommendationer
- **Realtid** - WebSockets, live updates, collaborative editing
- **Serverless** - Ingen egen server att hantera
- **Type-safe** - TypeScript överallt
- **Responsiv** - Fungerar på mobil, tablet, desktop

## Vad är en dapp? {#what-is-a-dapp}

En **dapp** (decentralized app) kör sin logik på blockchain istället för centraliserade servrar. Men idag bygger vi ofta **hybrid apps** som kombinerar det bästa av båda världarna.

<CardGrid>
  <Card title="Mer privat" emoji=":detective:" description="Du behöver bara en wallet. Ingen personlig data behövs. Internettet som det alltid borde ha varit." />
  <Card title="Globalt tillgänglig" emoji="🌍" description="Inte begränsat av regioner eller app stores. Fungerar överallt där det finns internet." />
  <Card title="Billigare tjänster" emoji=":handshake:" description="Peer-to-peer. Inga mellanhänder som tar provision betyder billigare tjänster." />
</CardGrid>

## Så bygger du moderna appar {#how-to-build}

### 1. Frontend Stack {#frontend-stack}

**React + Next.js** - Det kraftfullaste valet
```tsx
// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Min app</h1>
      <p>Built with Next.js</p>
    </div>
  );
}
```

**Varför Next.js?**
- **Server Components** - Snabbare laddning
- **File-based routing** - app/about/page.tsx → /about
- **API routes** - Backend i samma projekt
- **Image optimization** - Automatisk bildoptimering
- **TypeScript** - Full type safety

**Alternativ:**
- **Vite + React** - Snabbast för SPA (Single Page Apps)
- **Remix** - Web fundamentals focus
- **Astro** - Innehållsfokuserade sidor

### 2. Styling {#styling}

**Tailwind CSS** - Utility-first CSS
```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Klicka här
</button>
```

**shadcn/ui** - Kopierbar komponent-bibliotek
```bash
npx shadcn-ui@latest add button
```

```tsx
import { Button } from "@/components/ui/button"

<Button variant="outline">Click me</Button>
```

### 3. Backend & Database {#backend-database}

**Next.js Server Actions**
```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  
  await db.post.create({
    data: { title }
  })
}
```

**Prisma ORM** - Type-safe databas queries
```typescript
// prisma/schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

```typescript
// Fully typed queries!
const posts = await prisma.post.findMany({
  where: { published: true }
});
```

**Database alternativ:**
- **Supabase** - PostgreSQL med real-time
- **PlanetScale** - Serverless MySQL
- **MongoDB Atlas** - NoSQL
- **Turso** - SQLite edge database

### 4. AI Integration {#ai-integration}

**OpenAI API**
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Du är en hjälpsam assistent" },
    { role: "user", content: "Förklara React hooks" }
  ]
});
```

**Vercel AI SDK** - AI i din React app
```tsx
'use client'
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```

### 5. Authentication {#authentication}

**NextAuth.js** - Auth för Next.js
```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { auth, handlers } = NextAuth({
  providers: [Google],
})
```

**Clerk** - Complete auth system
```tsx
import { SignIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
      <SignIn />
    </div>
  );
}
```

**Wallet auth** - Web3 login
```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

<ConnectButton />
```

## Full-stack exempel: AI Chat App {#fullstack-example}

### Project struktur {#project-structure}

```
my-ai-app/
├── app/
│   ├── page.tsx          # Homepage
│   ├── chat/
│   │   └── page.tsx      # Chat UI
│   ├── api/
│   │   └── chat/
│   │       └── route.ts  # AI endpoint
│   └── layout.tsx
├── components/
│   ├── ui/               # shadcn components
│   └── ChatMessage.tsx
├── lib/
│   ├── db.ts             # Prisma client
│   └── openai.ts         # OpenAI config
└── prisma/
    └── schema.prisma
```

### Chat UI Component {#chat-ui}

```tsx
// components/ChatMessage.tsx
export function ChatMessage({ role, content }: { role: string, content: string }) {
  return (
    <div className={role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}>
      <p className="font-bold">{role}</p>
      <p>{content}</p>
    </div>
  );
}
```

### API Route med AI {#api-route}

```typescript
// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { StreamingTextResponse, OpenAIStream } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

### Chat Page {#chat-page}

```tsx
// app/chat/page.tsx
'use client'
import { useChat } from 'ai/react';
import { ChatMessage } from '@/components/ChatMessage';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Skriv ett meddelande..."
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
```

## Deployment {#deployment}

### Vercel (rekommenderat för Next.js) {#vercel}

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

**Fördelar:**
- Deploy på sekunder
- Automatisk CI/CD från GitHub
- Edge Functions globalt
- Analytics inkluderat

### Railway {#railway}

Perfect för backends och databases:

```bash
# Deploy med Railway CLI
railway up

# Auto-deploy från GitHub
railway link
```

### Netlify {#netlify}

Bra för statiska sites och serverless functions:

```bash
# Deploy
netlify deploy

# Production
netlify deploy --prod
```

### Docker (för egna servrar) {#docker}

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## State Management {#state-management}

### Zustand (enklast) {#zustand}

```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

### Redux Toolkit (för stora appar) {#redux}

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 }
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});
```

## Testing {#testing}

### Vitest (snabbast) {#vitest}

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Playwright (E2E) {#playwright}

```typescript
import { test, expect } from '@playwright/test';

test('chat works', async ({ page }) => {
  await page.goto('/chat');
  await page.fill('input', 'Hello AI');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.message')).toContainText('Hello');
});
```

## Performance optimization {#performance}

### React Best Practices {#react-performance}

**1. Use React.memo for expensive components**
```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Only re-renders if data changes
  return <div>{data}</div>;
});
```

**2. Code splitting**
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

**3. Image optimization**
```tsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
  priority // Load immediately
/>
```

## Jämförelse: Traditionella vs Moderna appar {#comparison}

| Feature | Traditionella apps | Moderna apps | Web3 dapps |
| ------- | ----------------- | ------------ | ---------- |
| **Hosting** | Egen server | Serverless (Vercel) | Blockchain + IPFS |
| **Database** | MySQL/Postgres | Supabase/PlanetScale | Smart contracts |
| **Auth** | Sessions/JWT | NextAuth/Clerk | Wallet signatures |
| **Skalning** | Manuell | Automatisk | Decentraliserad |
| **Kostnad** | Fast + trafik | Pay-as-you-go | Gas fees |
| **AI** | Egen ML modell | API (OpenAI/Anthropic) | On-chain AI |

## Lär dig mer {#learn-more}

### Rekommenderade kurser {#courses}

- **Next.js 14 tutorial** - Official docs
- **Full Stack Open** - Helsinki University (gratis!)
- **Frontend Masters** - Professional courses

### Communities {#communities}

- **React Stockholm** - Meetups
- **Next.js Discord** - Help & discussions
- **Dev.to** - Artiklar och tutorials

### YouTube Kanaler {#youtube}

- **Fireship** - 100 seconds explainers
- **Theo** - Modern web dev
- **Web Dev Simplified** - Tutorials
- **Syntax.fm** - Podcast

## Projektet för nybörjare {#beginner-projects}

1. **Todo App** - Learn CRUD operations
2. **Weather App** - API integration
3. **Chat App** - Real-time + AI
4. **Blog** - CMS integration
5. **E-commerce** - Payment processing

Börja bygga din första moderna app idag! 🚀

<WhatAreAppsStories />
