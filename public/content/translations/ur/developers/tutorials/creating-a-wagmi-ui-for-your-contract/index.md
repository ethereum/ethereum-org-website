---
title: "اپنے کنٹریکٹ کے لیے یوزر انٹرفیس بنانا"
description: "TypeScript، React، Vite، اور Wagmi جیسے جدید اجزاء کا استعمال کرتے ہوئے، ہم ایک جدید، لیکن کم سے کم، یوزر انٹرفیس کا جائزہ لیں گے اور سیکھیں گے کہ والیٹ کو یوزر انٹرفیس سے کیسے جوڑا جائے، معلومات پڑھنے کے لیے اسمارٹ کنٹریکٹ کو کیسے کال کیا جائے، اسمارٹ کنٹریکٹ پر ٹرانزیکشن کیسے بھیجی جائے، اور تبدیلیوں کی شناخت کے لیے اسمارٹ کنٹریکٹ سے ایونٹس کی نگرانی کیسے کی جائے۔"
author: "اوری پومرانٹز"
tags: ["TypeScript", "React", "Vite", "Wagmi", "فرنٹ اینڈ"]
skill: beginner
breadcrumb: "WAGMI کے ساتھ UI"
published: 2023-11-01
lang: ur
sidebarDepth: 3
---

آپ کو ایتھیریم ایکو سسٹم میں ایک ایسی خصوصیت مل گئی ہے جس کی ہمیں ضرورت ہے۔ آپ نے اسے نافذ کرنے کے لیے اسمارٹ کنٹریکٹس لکھے، اور شاید کچھ متعلقہ کوڈ بھی جو آف چین چلتا ہے۔ یہ بہت اچھا ہے! بدقسمتی سے، یوزر انٹرفیس کے بغیر آپ کے پاس کوئی صارف نہیں ہوگا، اور آخری بار جب آپ نے کوئی ویب سائٹ لکھی تھی تو لوگ ڈائل اپ موڈیم استعمال کرتے تھے اور JavaScript نئی تھی۔

یہ مضمون آپ کے لیے ہے۔ میں فرض کرتا ہوں کہ آپ پروگرامنگ جانتے ہیں، اور شاید تھوڑی بہت JavaScript اور HTML بھی، لیکن آپ کی یوزر انٹرفیس کی مہارتیں زنگ آلود اور پرانی ہو چکی ہیں۔ ہم مل کر ایک سادہ جدید ایپلیکیشن کا جائزہ لیں گے تاکہ آپ دیکھ سکیں کہ آج کل یہ کیسے کیا جاتا ہے۔

## یہ کیوں اہم ہے {#why-important}

نظریاتی طور پر، آپ لوگوں کو اپنے کنٹریکٹس کے ساتھ تعامل کرنے کے لیے صرف [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) یا [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) استعمال کرنے کا کہہ سکتے ہیں۔ یہ تجربہ کار ایتھیریم صارفین کے لیے بہت اچھا ہے۔ لیکن ہم [ایک اور ارب لوگوں](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) کی خدمت کرنے کی کوشش کر رہے ہیں۔ یہ ایک بہترین یوزر ایکسپیرینس کے بغیر نہیں ہوگا، اور ایک دوستانہ یوزر انٹرفیس اس کا ایک بڑا حصہ ہے۔

## Greeter ایپلیکیشن {#greeter-app}

جدید UI کیسے کام کرتا ہے اس کے پیچھے بہت سی تھیوری ہے، اور [بہت سی اچھی سائٹس](https://react.dev/learn/thinking-in-react) [جو اس کی وضاحت کرتی ہیں](https://wagmi.sh/core/getting-started)۔ ان سائٹس کے کیے گئے بہترین کام کو دہرانے کے بجائے، میں یہ فرض کروں گا کہ آپ عملی طور پر سیکھنے کو ترجیح دیتے ہیں اور ایک ایسی ایپلیکیشن سے شروعات کریں گے جس کے ساتھ آپ کھیل سکیں۔ آپ کو اب بھی کام مکمل کرنے کے لیے تھیوری کی ضرورت ہے، اور ہم اس تک پہنچیں گے - ہم بس سورس فائل در سورس فائل جائیں گے، اور جیسے جیسے چیزیں سامنے آئیں گی ان پر تبادلہ خیال کریں گے۔

### انسٹالیشن {#installation}

1. یہ ایپلیکیشن [Sepolia](https://sepolia.dev/) ٹیسٹ نیٹ ورک استعمال کرتی ہے۔ اگر ضروری ہو تو، [Sepolia ٹیسٹ ETH حاصل کریں](/developers/docs/networks/#sepolia) اور [Sepolia کو اپنے والیٹ میں شامل کریں](https://chainlist.org/chain/11155111)۔

2. GitHub ریپوزٹری کو کلون کریں اور ضروری پیکجز انسٹال کریں۔

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. یہ ایپلیکیشن مفت ایکسیس پوائنٹس استعمال کرتی ہے، جن کی کارکردگی کی حدود ہوتی ہیں۔ اگر آپ [نوڈ ایز اے سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) پرووائیڈر استعمال کرنا چاہتے ہیں، تو [`src/wagmi.ts`](#wagmi-ts) میں URLs کو تبدیل کریں۔

4. ایپلیکیشن شروع کریں۔

   ```sh
   npm run dev
   ```

5. ایپلیکیشن کے دکھائے گئے URL پر براؤز کریں۔ زیادہ تر صورتوں میں، یہ [http://localhost:5173/](http://localhost:5173/) ہوتا ہے۔

6. آپ کنٹریکٹ کا سورس کوڈ، جو Hardhat کے Greeter کا ایک ترمیم شدہ ورژن ہے، [بلاک چین ایکسپلورر پر](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) دیکھ سکتے ہیں۔

### فائلوں کا جائزہ {#file-walk-through}

#### `index.html` {#index-html}

یہ فائل ایک معیاری HTML بوائلرپلیٹ ہے سوائے اس لائن کے، جو اسکرپٹ فائل کو امپورٹ کرتی ہے۔

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

فائل کی ایکسٹینشن ظاہر کرتی ہے کہ یہ ایک [React component](https://www.w3schools.com/react/react_components.asp) ہے جو [TypeScript](https://www.typescriptlang.org/) میں لکھا گیا ہے، جو JavaScript کی ایک ایکسٹینشن ہے اور [ٹائپ چیکنگ](https://en.wikipedia.org/wiki/Type_system#Type_checking) کو سپورٹ کرتی ہے۔ TypeScript کو JavaScript میں کمپائل کیا جاتا ہے، لہذا ہم اسے کلائنٹ سائیڈ پر استعمال کر سکتے ہیں۔

اس فائل کی زیادہ تر وضاحت اس صورت میں کی گئی ہے کہ آپ کو دلچسپی ہو۔ عام طور پر آپ اس فائل میں ترمیم نہیں کرتے، بلکہ [`src/App.tsx`](#app-tsx) اور ان فائلوں میں کرتے ہیں جنہیں یہ امپورٹ کرتی ہے۔

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

ہمیں جس لائبریری کوڈ کی ضرورت ہے اسے امپورٹ کریں۔

```tsx
import App from './App.tsx'
```

اس React component کو امپورٹ کریں جو ایپلیکیشن کو نافذ کرتا ہے (نیچے دیکھیں)۔

```tsx
import { config } from './wagmi.ts'
```

[wagmi](https://wagmi.sh/) کنفیگریشن امپورٹ کریں، جس میں بلاک چین کنفیگریشن شامل ہے۔

```tsx
const queryClient = new QueryClient()
```

[React Query کے](https://tanstack.com/query/latest/docs/framework/react/overview) کیشے مینیجر کا ایک نیا انسٹینس بناتا ہے۔ یہ آبجیکٹ درج ذیل کو اسٹور کرے گا:

- کیش کی گئی RPC کالز
- کنٹریکٹ ریڈز
- بیک گراؤنڈ ری فیچنگ اسٹیٹ

ہمیں کیشے مینیجر کی ضرورت ہے کیونکہ wagmi v3 اندرونی طور پر React Query استعمال کرتا ہے۔

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

روٹ React component بنائیں۔ `render` کا پیرامیٹر [JSX](https://www.w3schools.com/react/react_jsx.asp) ہے، جو ایک ایکسٹینشن لینگویج ہے اور HTML اور JavaScript/TypeScript دونوں کا استعمال کرتی ہے۔ یہاں فجائیہ نشان (!) TypeScript component کو بتاتا ہے: "آپ نہیں جانتے کہ `document.getElementById('root')`، `ReactDOM.createRoot` کے لیے ایک درست پیرامیٹر ہوگا، لیکن فکر نہ کریں - میں ڈیولپر ہوں اور میں آپ کو بتا رہا ہوں کہ یہ ہوگا۔"

```tsx
  <React.StrictMode>
```

ایپلیکیشن [ایک `React.StrictMode` component](https://react.dev/reference/react/StrictMode) کے اندر جا رہی ہے۔ یہ component React لائبریری کو اضافی ڈیبگنگ چیکس داخل کرنے کا کہتا ہے، جو ڈیولپمنٹ کے دوران مفید ہے۔

```tsx
    <WagmiProvider config={config}>
```

ایپلیکیشن [ایک `WagmiProvider` component](https://wagmi.sh/react/api/WagmiProvider) کے اندر بھی ہے۔ [wagmi (we are going to make it) لائبریری](https://wagmi.sh/) ایک ایتھیریم ڈی سینٹرلائزڈ ایپلیکیشن لکھنے کے لیے React UI کی تعریفوں کو [viem لائبریری](https://viem.sh/) کے ساتھ جوڑتی ہے۔

```tsx
      <QueryClientProvider client={queryClient}>
```

اور آخر میں، ایک React Query پرووائیڈر شامل کریں تاکہ کوئی بھی ایپلیکیشن component کیش کی گئی کیوریز استعمال کر سکے۔

```tsx
        <App />
```

اب ہمارے پاس ایپلیکیشن کے لیے component ہو سکتا ہے، جو دراصل UI کو نافذ کرتا ہے۔ component کے آخر میں `/>` React کو بتاتا ہے کہ XML معیار کے مطابق، اس component کے اندر کوئی تعریفیں نہیں ہیں۔

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

یقیناً، ہمیں دوسرے components کو بند کرنا ہوگا۔

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

ہمیں جن لائبریریوں کی ضرورت ہے انہیں امپورٹ کریں، اور ساتھ ہی [`Greeter` component](#greeter-tsx) کو بھی۔

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia کی چین ID۔

```
function App() {
```

React component بنانے کا یہ معیاری طریقہ ہے: ایک فنکشن کی وضاحت کریں جسے جب بھی رینڈر کرنے کی ضرورت ہو کال کیا جائے۔ اس فنکشن میں عام طور پر TypeScript یا JavaScript کوڈ ہوتا ہے، جس کے بعد ایک `return` اسٹیٹمنٹ ہوتی ہے جو JSX کوڈ واپس کرتی ہے۔

```tsx
  const connection = useConnection()
```

موجودہ کنکشن سے متعلق معلومات حاصل کرنے کے لیے [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) کا استعمال کریں، جیسے کہ ایڈریس اور `chainId`۔

روایت کے مطابق، React میں `use...` کہلانے والے فنکشنز [ہکس (hooks)](https://www.w3schools.com/react/react_hooks.asp) ہوتے ہیں۔ یہ فنکشنز نہ صرف component کو ڈیٹا واپس کرتے ہیں؛ بلکہ یہ اس بات کو بھی یقینی بناتے ہیں کہ جب وہ ڈیٹا تبدیل ہو تو اسے دوبارہ رینڈر کیا جائے (component فنکشن دوبارہ چلایا جاتا ہے، اور اس کا آؤٹ پٹ HTML میں پچھلے والے کی جگہ لے لیتا ہے)۔

```tsx
  const { connectors, connect, status, error } = useConnect()
```

والیٹ کنکشن کے بارے میں معلومات حاصل کرنے کے لیے [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) کا استعمال کریں۔

```tsx
  const { disconnect } = useDisconnect()
```

[یہ ہک](https://wagmi.sh/react/api/hooks/useDisconnect) ہمیں والیٹ سے منقطع ہونے کا فنکشن دیتا ہے۔

```tsx
  const { switchChain } = useSwitchChain()
```

[یہ ہک](https://wagmi.sh/react/api/hooks/useSwitchChain) ہمیں چینز تبدیل کرنے کی سہولت دیتا ہے۔

```tsx
  useEffect(() => {
```

React ہک [`useEffect`](https://react.dev/reference/react/useEffect) آپ کو کسی بیرونی سسٹم کو ہم آہنگ کرنے کے لیے جب بھی کسی متغیر (variable) کی قدر تبدیل ہوتی ہے تو ایک فنکشن چلانے کی سہولت دیتا ہے۔

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

اگر ہم جڑے ہوئے ہیں، لیکن Sepolia بلاک چین سے نہیں، تو Sepolia پر سوئچ کریں۔

```tsx
  }, [connection.status, connection.chainId])
```

جب بھی کنکشن کا اسٹیٹس یا کنکشن کی chainId تبدیل ہو تو فنکشن کو دوبارہ چلائیں۔

```tsx
  return (
    <>
```

ایک React component کے JSX کو _لازمی_ طور پر ایک واحد HTML component واپس کرنا چاہیے۔ جب ہمارے پاس متعدد components ہوں اور ہمیں ان سب کو لپیٹنے کے لیے کسی کنٹینر کی ضرورت نہ ہو، تو ہم انہیں ایک واحد component میں ملانے کے لیے ایک خالی component (`<> ... </>`) استعمال کرتے ہیں۔

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

موجودہ کنکشن کے بارے میں معلومات فراہم کریں۔ JSX کے اندر، `{<expression>}` کا مطلب ہے کہ ایکسپریشن کا JavaScript کے طور پر جائزہ لیا جائے۔

```tsx
      {connection.status === 'connected' && (
```

سنٹیکس `{<condition> && <value>}` کا مطلب ہے "اگر شرط `true` ہے، تو قدر کا جائزہ لیں؛ اگر نہیں ہے، تو `false` کا جائزہ لیں"۔

JSX کے اندر if اسٹیٹمنٹس رکھنے کا یہ معیاری طریقہ ہے۔

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX XML معیار کی پیروی کرتا ہے، جو HTML سے زیادہ سخت ہے۔ اگر کسی ٹیگ کا متعلقہ اختتامی ٹیگ نہیں ہے، تو اسے ختم کرنے کے لیے اس کے آخر میں ایک سلیش (`/`) _لازمی_ ہونا چاہیے۔

یہاں ہمارے پاس ایسے دو ٹیگز ہیں، `<Greeter />` (جس میں دراصل وہ HTML کوڈ ہوتا ہے جو کنٹریکٹ سے بات کرتا ہے) اور [افقی لائن کے لیے `<hr />`](https://www.w3schools.com/tags/tag_hr.asp)۔

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

اگر صارف اس بٹن پر کلک کرتا ہے، تو `disconnect` فنکشن کو کال کریں۔

```tsx
      {connection.status !== 'connected' && (
```

اگر ہم جڑے ہوئے _نہیں_ ہیں، تو والیٹ سے جڑنے کے لیے ضروری آپشنز دکھائیں۔

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors` میں ہمارے پاس کنیکٹرز کی ایک فہرست ہے۔ ہم اسے ڈسپلے کرنے کے لیے JSX بٹنز کی فہرست میں تبدیل کرنے کے لیے [`map`](https://www.w3schools.com/jsref/jsref_map.asp) کا استعمال کرتے ہیں۔

```tsx
            <button
              key={connector.uid}
```

JSX میں "سِبلنگ" (sibling) ٹیگز (وہ ٹیگز جو ایک ہی پیرنٹ سے نکلتے ہیں) کے لیے مختلف شناخت کنندگان (identifiers) کا ہونا ضروری ہے۔

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

کنیکٹر بٹنز۔

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

اضافی معلومات فراہم کریں۔ ایکسپریشن سنٹیکس `<variable>?.<field>` JavaScript کو بتاتا ہے کہ اگر متغیر کی تعریف کی گئی ہے، تو اس فیلڈ کا جائزہ لیں۔ اگر متغیر کی تعریف نہیں کی گئی ہے، تو یہ ایکسپریشن `undefined` کا جائزہ لیتا ہے۔

ایکسپریشن `error.message`، جب کوئی ایرر نہ ہو، تو ایک ایکسیپشن (exception) پیدا کرے گا۔ `error?.message` کا استعمال ہمیں اس مسئلے سے بچنے دیتا ہے۔

#### `src/Greeter.tsx` {#greeter-tsx}

اس فائل میں UI کی زیادہ تر فعالیت شامل ہے۔ اس میں وہ تعریفیں شامل ہیں جو عام طور پر متعدد فائلوں میں ہوتی ہیں، لیکن چونکہ یہ ایک ٹیوٹوریل ہے، اس لیے پروگرام کو کارکردگی یا دیکھ بھال میں آسانی کے بجائے پہلی بار سمجھنے میں آسان ہونے کے لیے بہتر بنایا گیا ہے۔

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

ہم ان لائبریری فنکشنز کا استعمال کرتے ہیں۔ ایک بار پھر، ان کی وضاحت نیچے کی گئی ہے جہاں وہ استعمال ہوتے ہیں۔

```tsx
import { AddressType } from 'abitype'
```

[`abitype` لائبریری](https://abitype.dev/) ہمیں مختلف ایتھیریم ڈیٹا ٹائپس کے لیے TypeScript کی تعریفیں فراہم کرتی ہے، جیسے کہ [`AddressType`](https://abitype.dev/config#addresstype)۔

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const // greeterABI
```

`Greeter` کنٹریکٹ کے لیے ABI۔
اگر آپ کنٹریکٹس اور UI ایک ہی وقت میں تیار کر رہے ہیں، تو آپ عام طور پر انہیں ایک ہی ریپوزٹری میں رکھیں گے اور Solidity کمپائلر کے ذریعے تیار کردہ ABI کو اپنی ایپلیکیشن میں ایک فائل کے طور پر استعمال کریں گے۔ تاہم، یہاں یہ ضروری نہیں ہے کیونکہ کنٹریکٹ پہلے ہی تیار ہو چکا ہے اور تبدیل نہیں ہوگا۔

ہم TypeScript کو یہ بتانے کے لیے [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) کا استعمال کرتے ہیں کہ یہ ایک _حقیقی_ کانسٹنٹ (constant) ہے۔ عام طور پر، جب آپ JavaScript میں `const x = {"a": 1}` کی وضاحت کرتے ہیں، تو آپ `x` میں قدر کو تبدیل کر سکتے ہیں، آپ بس اسے تفویض (assign) نہیں کر سکتے۔

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript سختی سے ٹائپ کی گئی (strongly typed) ہے۔ ہم اس تعریف کا استعمال اس ایڈریس کی وضاحت کرنے کے لیے کرتے ہیں جہاں `Greeter` کنٹریکٹ مختلف چینز پر ڈیپلائے کیا گیا ہے۔ کلید (key) ایک نمبر (chainId) ہے، اور قدر ایک `AddressType` (ایک ایڈریس) ہے۔

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // سیپولیا
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) پر کنٹریکٹ کا ایڈریس۔

##### `Timer` component {#timer-component}

`Timer` component کسی دیے گئے وقت سے لے کر اب تک کے سیکنڈز کی تعداد دکھاتا ہے۔ یہ استعمال کی سہولت کے مقاصد کے لیے اہم ہے۔ جب صارفین کچھ کرتے ہیں، تو وہ فوری ردعمل کی توقع کرتے ہیں۔ بلاک چینز میں، یہ اکثر ناممکن ہوتا ہے کیونکہ جب تک کوئی ٹرانزیکشن کسی بلاک میں نہیں رکھی جاتی تب تک کچھ نہیں ہوتا۔ اس کا ایک حل یہ دکھانا ہے کہ صارف کو کارروائی کیے کتنا وقت گزر چکا ہے، تاکہ صارف یہ فیصلہ کر سکے کہ آیا درکار وقت معقول ہے یا نہیں۔

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` component ایک پیرامیٹر لیتا ہے، `lastUpdate`، جو آخری کارروائی کا وقت ہے۔

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

component کے صحیح طریقے سے کام کرنے کے لیے ہمیں اسٹیٹ (component سے جڑا ایک متغیر) رکھنے اور اسے اپ ڈیٹ کرنے کی ضرورت ہے۔ لیکن ہمیں اسے کبھی پڑھنے کی ضرورت نہیں ہوتی، اس لیے متغیر بنانے کی زحمت نہ کریں۔

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) فنکشن ہمیں کسی فنکشن کو وقفے وقفے سے چلانے کے لیے شیڈول کرنے دیتا ہے۔ اس صورت میں، ہر سیکنڈ۔ فنکشن اسٹیٹ کو اپ ڈیٹ کرنے کے لیے `setNow` کو کال کرتا ہے، تاکہ `Timer` component دوبارہ رینڈر ہو جائے۔ ہم اسے ایک خالی ڈیپینڈینسی لسٹ کے ساتھ [`useEffect`](https://react.dev/reference/react/useEffect) کے اندر لپیٹتے ہیں تاکہ یہ component کے ہر بار رینڈر ہونے کے بجائے صرف ایک بار ہو۔

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

آخری اپ ڈیٹ کے بعد سے سیکنڈز کی تعداد کا حساب لگائیں اور اسے واپس کریں۔

##### `Greeter` component {#greeter-component}

```tsx
const Greeter = () => {
```

آخر کار، ہم component کی وضاحت کرنے پر آتے ہیں۔

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

ہم جو چین اور اکاؤنٹ استعمال کر رہے ہیں اس کے بارے میں معلومات، [wagmi](https://wagmi.sh/) کے بشکریہ۔ چونکہ یہ ایک ہک (`use...`) ہے، اس لیے جب بھی یہ معلومات تبدیل ہوتی ہیں تو component دوبارہ رینڈر ہوتا ہے۔

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter کنٹریکٹ کا ایڈریس، جو `undefined` ہوتا ہے اگر ہمارے پاس چین کی معلومات نہ ہوں، یا ہم کسی ایسی چین پر ہوں جس پر وہ کنٹریکٹ نہ ہو۔

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // کوئی آرگومنٹس نہیں
  })
```

[`useReadContract` ہک](https://wagmi.sh/react/api/hooks/useReadContract) [کنٹریکٹ](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) کے `greet` فنکشن کو کال کرتا ہے۔

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React کا [`useState` ہک](https://www.w3schools.com/react/react_usestate.asp) ہمیں ایک اسٹیٹ متغیر کی وضاحت کرنے دیتا ہے، جس کی قدر component کی ایک رینڈرنگ سے دوسری تک برقرار رہتی ہے۔ ابتدائی قدر پیرامیٹر ہے، اس صورت میں خالی اسٹرنگ۔

`useState` ہک دو اقدار کے ساتھ ایک فہرست واپس کرتا ہے:

1. اسٹیٹ متغیر کی موجودہ قدر۔
2. ضرورت پڑنے پر اسٹیٹ متغیر میں ترمیم کرنے کا ایک فنکشن۔ چونکہ یہ ایک ہک ہے، اس لیے جب بھی اسے کال کیا جاتا ہے تو component دوبارہ رینڈر ہوتا ہے۔

اس صورت میں، ہم اس نئی گریٹنگ (greeting) کے لیے ایک اسٹیٹ متغیر استعمال کر رہے ہیں جسے صارف سیٹ کرنا چاہتا ہے۔

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

اگر متعدد صارفین ایک ہی وقت میں ایک ہی کنٹریکٹ استعمال کر رہے ہیں، تو وہ ایک دوسرے کی گریٹنگز کو اوور رائٹ کر سکتے ہیں۔ یہ صارفین کو ایسا لگے گا جیسے ایپلیکیشن خراب ہو رہی ہے۔ اگر ایپلیکیشن یہ دکھاتی ہے کہ آخری بار گریٹنگ کس نے سیٹ کی تھی، تو صارف کو معلوم ہو جائے گا کہ یہ کوئی اور تھا اور ایپلیکیشن صحیح طریقے سے کام کر رہی ہے۔

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

صارفین یہ دیکھنا پسند کرتے ہیں کہ ان کے اعمال کا فوری اثر ہو۔ تاہم، بلاک چین پر ایسا نہیں ہوتا۔ یہ اسٹیٹ متغیرات ہمیں کم از کم صارفین کو کچھ دکھانے کی سہولت دیتے ہیں تاکہ انہیں معلوم ہو سکے کہ ان کی کارروائی جاری ہے۔

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

اگر اوپر موجود `readResults` ڈیٹا کو تبدیل کرتا ہے اور یہ کسی غلط قدر (مثال کے طور پر `undefined`) پر سیٹ نہیں ہے، تو موجودہ گریٹنگ کو بلاک چین سے پڑھی گئی گریٹنگ میں اپ ڈیٹ کریں۔ نیز، اسٹیٹس کو بھی اپ ڈیٹ کریں۔

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` ایونٹس کو سنیں۔

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` کا مطلب ہے کہ اگر قدر `false` ہے، یا کوئی ایسی قدر ہے جس کا جائزہ false کے طور پر لیا جاتا ہے، جیسے کہ `undefined`، `0`، یا ایک خالی اسٹرنگ، تو مجموعی طور پر ایکسپریشن `false` ہے۔ کسی بھی دوسری قدر کے لیے، یہ `true` ہے۔ یہ اقدار کو بولینز (booleans) میں تبدیل کرنے کا ایک طریقہ ہے، کیونکہ اگر کوئی `greeterAddr` نہیں ہے، تو ہم ایونٹس کو سننا نہیں چاہتے۔

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

جب ہم لاگز دیکھتے ہیں (جو اس وقت ہوتا ہے جب ہم کوئی نیا ایونٹ دیکھتے ہیں)، تو اس کا مطلب ہے کہ گریٹنگ میں ترمیم کی گئی ہے۔ اس صورت میں، ہم `currentGreeting` اور `lastSetterAddress` کو نئی اقدار میں اپ ڈیٹ کر سکتے ہیں۔ نیز، ہم اسٹیٹس ڈسپلے کو بھی اپ ڈیٹ کرنا چاہتے ہیں۔

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

جب ہم اسٹیٹس کو اپ ڈیٹ کرتے ہیں تو ہم دو کام کرنا چاہتے ہیں:

1. اسٹیٹس اسٹرنگ (`status`) کو اپ ڈیٹ کریں
2. آخری اسٹیٹس اپ ڈیٹ کے وقت (`statusTime`) کو موجودہ وقت پر اپ ڈیٹ کریں۔

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

یہ نئے گریٹنگ ان پٹ فیلڈ میں تبدیلیوں کے لیے ایونٹ ہینڈلر ہے۔ ہم `evt` پیرامیٹر کی ٹائپ بتا سکتے تھے، لیکن TypeScript ایک ٹائپ آپشنل زبان ہے۔ چونکہ یہ فنکشن صرف ایک بار کال کیا جاتا ہے، ایک HTML ایونٹ ہینڈلر میں، اس لیے مجھے نہیں لگتا کہ یہ ضروری ہے۔

```tsx
  const { writeContractAsync } = useWriteContract()
```

کنٹریکٹ میں لکھنے کا فنکشن۔ یہ [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) سے ملتا جلتا ہے، لیکن بہتر اسٹیٹس اپ ڈیٹس کو فعال کرتا ہے۔

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

کلائنٹ کے نقطہ نظر سے بلاک چین ٹرانزیکشن جمع کرانے کا عمل یہ ہے:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) کا استعمال کرتے ہوئے بلاک چین میں موجود کسی نوڈ کو ٹرانزیکشن بھیجیں۔
2. نوڈ سے جواب کا انتظار کریں۔
3. جب جواب موصول ہو جائے، تو صارف سے والیٹ کے ذریعے ٹرانزیکشن پر دستخط کرنے کا کہیں۔ یہ قدم نوڈ کا جواب موصول ہونے کے بعد _لازمی_ ہونا چاہیے کیونکہ صارف کو دستخط کرنے سے پہلے ٹرانزیکشن کی گیس لاگت دکھائی جاتی ہے۔
4. صارف کی منظوری کا انتظار کریں۔
5. ٹرانزیکشن دوبارہ بھیجیں، اس بار [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) کا استعمال کرتے ہوئے۔

قدم 2 میں ممکنہ طور پر قابل ذکر وقت لگ سکتا ہے، جس کے دوران صارفین یہ سوچ سکتے ہیں کہ آیا ان کی کمانڈ یوزر انٹرفیس کو موصول ہوئی ہے یا نہیں اور ان سے ابھی تک ٹرانزیکشن پر دستخط کرنے کا کیوں نہیں کہا جا رہا ہے۔ اس سے ایک خراب یوزر ایکسپیرینس (UX) پیدا ہوتا ہے۔

اس کا ایک حل یہ ہے کہ جب بھی کوئی پیرامیٹر تبدیل ہو تو `eth_estimateGas` بھیجا جائے۔ پھر، جب صارف دراصل ٹرانزیکشن بھیجنا چاہتا ہے (اس صورت میں **Update greeting** دبا کر)، تو گیس کی لاگت معلوم ہوتی ہے، اور صارف فوری طور پر والیٹ کا صفحہ دیکھ سکتا ہے۔

```tsx
  return (
```

اب ہم آخر کار واپس کرنے کے لیے اصل HTML بنا سکتے ہیں۔

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

موجودہ گریٹنگ دکھائیں۔

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

اگر ہم جانتے ہیں کہ آخری بار گریٹنگ کس نے سیٹ کی تھی، تو وہ معلومات دکھائیں۔ `Greeter` اس معلومات کا ٹریک نہیں رکھتا، اور ہم `SetGreeting` ایونٹس کے لیے پیچھے مڑ کر نہیں دیکھنا چاہتے، اس لیے ہم اسے صرف اسی وقت حاصل کرتے ہیں جب ہمارے چلنے کے دوران گریٹنگ تبدیل ہوتی ہے۔

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

یہ ان پٹ ٹیکسٹ فیلڈ ہے جہاں صارف ایک نئی گریٹنگ سیٹ کر سکتا ہے۔ جب بھی صارف کوئی کلید (key) دباتا ہے، ہم `greetingChange` کو کال کرتے ہیں، جو `setNewGreeting` کو کال کرتا ہے۔ چونکہ `setNewGreeting`، `useState` سے آتا ہے، اس لیے یہ `Greeter` component کو دوبارہ رینڈر کرنے کا سبب بنتا ہے۔ اس کا مطلب ہے کہ:

- ہمیں نئی گریٹنگ کی قدر کو برقرار رکھنے کے لیے `value` کی وضاحت کرنے کی ضرورت ہے، کیونکہ بصورت دیگر یہ واپس ڈیفالٹ، یعنی خالی اسٹرنگ میں تبدیل ہو جائے گی۔
- جب بھی `newGreeting` تبدیل ہوتی ہے تو `simulation` بھی اپ ڈیٹ ہوتی ہے، جس کا مطلب ہے کہ ہمیں درست گریٹنگ کے ساتھ ایک سیمولیشن ملے گی۔ یہ متعلقہ ہو سکتا ہے کیونکہ گیس کی لاگت کال ڈیٹا کے سائز پر منحصر ہوتی ہے، جو اسٹرنگ کی لمبائی پر منحصر ہوتا ہے۔

```tsx
      <button disabled={!simulation.data}
```

بٹن کو صرف اسی وقت فعال کریں جب ہمارے پاس ٹرانزیکشن بھیجنے کے لیے درکار معلومات ہوں۔

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

اسٹیٹس کو اپ ڈیٹ کریں۔ اس مقام پر، صارف کو والیٹ میں تصدیق کرنے کی ضرورت ہے۔

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` صرف ٹرانزیکشن کے دراصل بھیجے جانے کے بعد ہی واپس آتا ہے۔ اس سے ہم صارف کو یہ دکھا سکتے ہیں کہ ٹرانزیکشن کو بلاک چین میں شامل ہونے کے لیے کتنا انتظار کرنا پڑا ہے۔

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

اسٹیٹس دکھائیں اور یہ بھی کہ اسے اپ ڈیٹ ہوئے کتنا وقت گزر چکا ہے۔

```
export {Greeter}
```

component کو ایکسپورٹ کریں۔

#### `src/wagmi.ts` {#wagmi-ts}

آخر میں، wagmi سے متعلق مختلف تعریفیں `src/wagmi.ts` میں ہیں۔ میں یہاں ہر چیز کی وضاحت نہیں کرنے جا رہا ہوں، کیونکہ اس کا زیادہ تر حصہ بوائلرپلیٹ ہے جسے آپ کو تبدیل کرنے کی ضرورت نہیں پڑے گی۔

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

wagmi کنفیگریشن میں اس ایپلیکیشن کے ذریعے سپورٹ کی جانے والی چینز شامل ہیں۔ آپ [دستیاب چینز کی فہرست](https://wagmi.sh/core/api/chains) دیکھ سکتے ہیں۔

```ts
  connectors: [
    injected(),
  ],
```

[یہ کنیکٹر](https://wagmi.sh/core/api/connectors/injected) ہمیں براؤزر میں انسٹال کردہ والیٹ سے بات کرنے دیتا ہے۔

```ts
  transports: {
    [sepolia.id]: http()
```

Viem کے ساتھ آنے والا ڈیفالٹ HTTP اینڈ پوائنٹ کافی اچھا ہے۔ اگر ہم کوئی مختلف URL چاہتے ہیں، تو ہم `http("https:// hostname ")` یا `webSocket("wss:// hostname ")` استعمال کر سکتے ہیں۔

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## ایک اور بلاک چین شامل کرنا {#add-blockchain}

آج کل بہت سے [L2 اسکیلنگ سلوشنز](https://ethereum.org/layer-2/) موجود ہیں، اور آپ شاید کچھ ایسے سلوشنز کو سپورٹ کرنا چاہیں جنہیں viem ابھی تک سپورٹ نہیں کرتا۔ ایسا کرنے کے لیے، آپ `src/wagmi.ts` میں ترمیم کرتے ہیں۔ یہ ہدایات بتاتی ہیں کہ [Optimism Sepolia](https://chainlist.org/chain/11155420) کو کیسے شامل کیا جائے۔

1.  `src/wagmi.ts` میں ترمیم کریں

    A. viem سے `defineChain` ٹائپ امپورٹ کریں۔

          ```ts
          import { defineChain } from 'viem'
          ```

    B. نیٹ ورک کی تعریف شامل کریں۔ آپ کو واقعی Optimism Sepolia کے لیے ایسا کرنے کی ضرورت نہیں ہے، [یہ پہلے ہی `viem` میں موجود ہے](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)، لیکن اس طرح آپ سیکھتے ہیں کہ ایسی بلاک چین کو کیسے شامل کیا جائے جو `viem` میں نہیں ہے۔

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. `createConfig` کال میں نئی چین شامل کریں۔

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Sepolia پر خودکار سوئچ کو کمنٹ آؤٹ کرنے کے لیے `src/App.tsx` میں ترمیم کریں۔ پروڈکشن سسٹم پر، آپ شاید ان تمام بلاک چینز کے لنکس کے ساتھ بٹن دکھائیں گے جنہیں آپ سپورٹ کرتے ہیں۔

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    ```

3.  یہ یقینی بنانے کے لیے `src/Greeter.tsx` میں ترمیم کریں کہ ایپلیکیشن نئے نیٹ ورک پر آپ کے کنٹریکٹس کا ایڈریس جانتی ہے۔

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // آپٹیمزم سیپولیا
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // سیپولیا
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  اپنے براؤزر میں۔

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true) پر براؤز کریں اور چین کو اپنے والیٹ میں شامل کرنے کے لیے ٹیبل کے دائیں جانب موجود بٹنوں میں سے کسی ایک پر کلک کریں۔

    B. ایپلیکیشن میں، بلاک چین کو تبدیل کرنے کے لیے **Disconnect** کریں اور پھر دوبارہ جڑیں۔ اسے سنبھالنے کے اور بھی بہتر طریقے ہیں، لیکن ان کے لیے ایپلیکیشن میں تبدیلیوں کی ضرورت ہوگی۔

## نتیجہ {#conclusion}

یقیناً، آپ کو واقعی `Greeter` کے لیے یوزر انٹرفیس فراہم کرنے کی پرواہ نہیں ہے۔ آپ اپنے کنٹریکٹس کے لیے ایک یوزر انٹرفیس بنانا چاہتے ہیں۔ اپنی ایپلیکیشن بنانے کے لیے، ان اقدامات پر عمل کریں:

1. wagmi ایپلیکیشن بنانے کی وضاحت کریں۔

   ```sh copy
   npm create wagmi
   ```

2. آگے بڑھنے کے لیے `y` ٹائپ کریں۔

3. ایپلیکیشن کا نام رکھیں۔

4. **React** فریم ورک منتخب کریں۔

5. **Vite** ویرینٹ منتخب کریں۔

اب جائیں اور اپنے کنٹریکٹس کو پوری دنیا کے لیے قابل استعمال بنائیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔