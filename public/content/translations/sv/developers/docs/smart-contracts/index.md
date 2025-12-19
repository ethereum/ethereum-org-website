---
title: Smart Contracts och Backend-utveckling
description: En omfattande guide till smart contracts, backend-utveckling och modern applikationsarkitektur
lang: sv
---

## Vad är en smart contract? {#what-is-a-smart-contract}

En "smart contract" är helt enkelt ett program som körs på Ethereum blockchain. Det är en samling kod (funktioner) och data (state) som finns på en specifik adress på Ethereum-blockkedjan.

Smart contracts är en typ av [Ethereum-konto](/developers/docs/accounts/). Detta betyder att de har en balans och kan ta emot transaktioner. Men de kontrolleras inte av en användare, utan de är deployed till nätverket och körs enligt programmering.

**Modern jämförelse**: Tänk på smart contracts som serverless functions (AWS Lambda, Vercel Edge Functions) fast på blockchain - kod som körs automatiskt när den triggas, utan att du behöver hantera servrar.

## Backend-utveckling: Traditionellt vs Blockchain {#backend-development}

### Traditionell backend {#traditional-backend}

I traditionell webbutveckling bygger vi backends med:

**Node.js + Express**
```javascript
const express = require('express');
const app = express();

app.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  // Uppdatera databas
  await db.updateBalance(from, -amount);
  await db.updateBalance(to, amount);
  res.json({ success: true });
});
```

**Utmaningar:**
- Centraliserad databas
- Måste lita på servern
- Kan manipuleras
- Behöver egen autentisering

### Smart Contract backend {#smart-contract-backend}

Med smart contracts får du:

```solidity
pragma solidity ^0.8.0;

contract SimpleTransfer {
    mapping(address => uint) public balances;
    
    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
```

**Fördelar:**
- Decentraliserad
- Transparent kod
- Omöjlig att manipulera
- Inbyggd autentisering (wallet signatures)
- Automatisk revision trail

## Moderna Backend-ramverk {#modern-backend-frameworks}

### 1. FastAPI (Python) {#fastapi}

Snabbt, modernt Python framework för att bygga API:er:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/users/")
async def create_user(user: User):
    # Auto-validering med Pydantic
    return {"name": user.name, "email": user.email}

# Automatisk OpenAPI docs på /docs
```

**Varför FastAPI?**
- Snabbaste Python framework
- Automatisk API-dokumentation
- Type hints och validering
- Async support
- Perfekt för AI/ML backends

### 2. Next.js Server Actions {#nextjs-server-actions}

Full-stack TypeScript i samma projekt:

```typescript
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  await db.user.create({
    data: { name, email }
  })
}

// app/page.tsx
import { createUser } from './actions'

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" />
      <input name="email" />
      <button type="submit">Create</button>
    </form>
  )
}
```

**Fördelar:**
- Ingen separat backend
- Type-safety end-to-end
- Automatisk data fetching
- Server och client i samma kod

### 3. NestJS {#nestjs}

Enterprise Node.js framework:

```typescript
import { Controller, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

**Perfekt för:**
- Stora team
- Microservices
- GraphQL API:er
- Dependency injection

## Databaser för moderna appar {#databases}

### Relationella databaser {#relational}

**PostgreSQL** - Kraftfullaste open-source DB
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Full-text search
CREATE INDEX idx_users_name ON users USING gin(to_tsvector('swedish', name));
```

**Prisma ORM** - Type-safe databas queries
```typescript
const user = await prisma.user.create({
  data: {
    name: 'Erik',
    email: 'erik@example.com'
  }
})

// Automatisk TypeScript types!
```

### NoSQL databaser {#nosql}

**MongoDB** - Flexibel document database
```javascript
await db.users.insertOne({
  name: 'Anna',
  email: 'anna@example.com',
  preferences: {
    theme: 'dark',
    language: 'sv'
  }
})
```

**Redis** - In-memory cache
```javascript
// Cache API responses
await redis.set('user:123', JSON.stringify(userData), 'EX', 3600)
const cached = await redis.get('user:123')
```

### Modern Database-as-a-Service {#database-services}

**Supabase** - Firebase-alternativ med PostgreSQL
- Real-time subscriptions
- Auto-generated API:er
- Row Level Security
- Storage & Authentication

**PlanetScale** - Serverless MySQL
- Branching like Git
- Automatisk skalning
- Noll downtime deploys

## Smart Contract utveckling {#smart-contract-development}

### Verktyg du behöver {#tools}

**Hardhat** - Utvecklingsmiljö
```bash
npm install --save-dev hardhat
npx hardhat init
```

**Foundry** - Snabbare alternativ i Rust
```bash
curl -L https://foundry.paradigm.xyz | bash
forge init my-project
```

**Remix IDE** - Browser-baserad editor
- Ingen installation
- Deploy direkt
- Debugger inkluderad

### Grundläggande Smart Contract {#basic-contract}

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 indexed newValue);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}
```

### Testing {#testing}

Med Hardhat:
```javascript
const { expect } = require("chai");

describe("SimpleStorage", function () {
  it("Should store and retrieve value", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const storage = await SimpleStorage.deploy();
    
    await storage.set(42);
    expect(await storage.get()).to.equal(42);
  });
});
```

## Integrera Web3 i din app {#web3-integration}

### Frontend integration {#frontend}

**ethers.js** - Interagera med Ethereum
```typescript
import { ethers } from 'ethers';

// Anslut till wallet
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Anropa smart contract
const contract = new ethers.Contract(address, abi, signer);
await contract.set(42);
```

**wagmi + RainbowKit** - React hooks för Web3
```typescript
import { useAccount, useWriteContract } from 'wagmi';

function MyComponent() {
  const { address } = useAccount();
  const { write } = useWriteContract();
  
  return (
    <button onClick={() => write({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'set',
      args: [42]
    })}>
      Set Value
    </button>
  );
}
```

## Full-stack exempel {#fullstack-example}

### Next.js + Smart Contract app {#nextjs-dapp}

```typescript
// app/page.tsx
'use client'
import { useWriteContract, useReadContract } from 'wagmi';

export default function Home() {
  const { data: storedValue } = useReadContract({
    address: '0x...',
    abi: ABI,
    functionName: 'get'
  });
  
  const { write } = useWriteContract();
  
  return (
    <div>
      <p>Current value: {storedValue?.toString()}</p>
      <button onClick={() => write({
        address: '0x...',
        abi: ABI,
        functionName: 'set',
        args: [100]
      })}>
        Set to 100
      </button>
    </div>
  );
}
```

## API:er och Microservices {#apis-microservices}

### RESTful API best practices {#rest-api}

```typescript
// Versioning
app.get('/api/v1/users/:id', getUser);

// Pagination
app.get('/api/v1/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // ...
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});
```

### GraphQL {#graphql}

```typescript
import { ApolloServer } from '@apollo/server';

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type Query {
    user(id: ID!): User
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }) => getUserById(id),
    users: () => getAllUsers()
  }
};
```

### tRPC - Type-safe API:er {#trpc}

```typescript
// server.ts
const appRouter = router({
  userById: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      return db.user.findUnique({ where: { id: input } });
    }),
});

// client.ts
const user = await trpc.userById.query('123');
// Fully typed! ✨
```

## Deployment och DevOps {#deployment}

### Containerization med Docker {#docker}

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### CI/CD med GitHub Actions {#cicd}

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## Säkerhet {#security}

### Smart Contract säkerhet {#contract-security}

**Vanliga sårbarheter:**
- Reentrancy attacks
- Integer overflow
- Access control

**Skydd:**
```solidity
// ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Safe is ReentrancyGuard {
    function withdraw() public nonReentrant {
        // Säker mot reentrancy
    }
}
```

### API säkerhet {#api-security}

- Rate limiting
- JWT authentication
- Input validering
- HTTPS only
- CORS konfiguration

## Lär dig mer {#learn-more}

### Backend utveckling {#backend-learning}

- **FastAPI dokumentation** - Learn FastAPI
- **Next.js docs** - Full-stack guide
- **Prisma tutorials** - Database ORM

### Smart contracts {#smart-contract-learning}

- **Solidity by Example** - Kod exempel
- **OpenZeppelin** - Säkra contracts
- **Hardhat tutorials** - Utvecklingsmiljö

Börja bygga din backend idag! 🚀
