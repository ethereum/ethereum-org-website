---
title: "اپنے کنٹریکٹ کے لیے یوزر انٹرفیس بنانا"
description: "جدید اجزاء جیسے ⁦TypeScript⁩، ⁦React⁩، ⁦Vite⁩، اور ⁦Wagmi⁩ کا استعمال کرتے ہوئے، ہم ایک جدید، لیکن کم سے کم، یوزر انٹرفیس کا جائزہ لیں گے اور سیکھیں گے کہ والیٹ کو یوزر انٹرفیس سے کیسے جوڑا جائے، معلومات پڑھنے کے لیے سمارٹ کنٹریکٹ کو کیسے کال کیا جائے، سمارٹ کنٹریکٹ کو ٹرانزیکشن کیسے بھیجی جائے، اور تبدیلیوں کی شناخت کے لیے سمارٹ کنٹریکٹ سے ایونٹس کی نگرانی کیسے کی جائے۔"
author: اوری پومرانٹز
tags: ["typescript", "react", "vite", "wagmi", "فرنٹ اینڈ"]
skill: beginner
breadcrumb: "⁦WAGMI⁩ کے ساتھ ⁦UI⁩"
published: 2023-11-01
lang: ur
sidebarDepth: 3
---

آپ کو ایتھیریم ایکو سسٹم میں ایک ایسی خصوصیت مل گئی ہے جس کی ہمیں ضرورت ہے۔ آپ نے اسے نافذ کرنے کے لیے سمارٹ کنٹریکٹس لکھے، اور شاید کچھ متعلقہ کوڈ بھی جو آف چین چلتا ہے۔ یہ بہت اچھا ہے! بدقسمتی سے، یوزر انٹرفیس کے بغیر آپ کے پاس کوئی صارف نہیں ہوگا، اور آخری بار جب آپ نے کوئی ویب سائٹ لکھی تھی تو لوگ ڈائل اپ موڈیم استعمال کرتے تھے اور JavaScript نیا تھا۔

یہ مضمون آپ کے لیے ہے۔ میں فرض کرتا ہوں کہ آپ پروگرامنگ جانتے ہیں، اور شاید تھوڑی بہت JavaScript اور <span dir="ltr">HTML</span> بھی، لیکن آپ کی یوزر انٹرفیس کی مہارتیں پرانی اور فرسودہ ہو چکی ہیں۔ ہم مل کر ایک سادہ جدید ایپلی کیشن کا جائزہ لیں گے تاکہ آپ دیکھ سکیں کہ آج کل یہ کیسے کیا جاتا ہے۔

## یہ کیوں اہم ہے {#why-important}

نظریاتی طور پر، آپ لوگوں کو اپنے کنٹریکٹس کے ساتھ تعامل کرنے کے لیے صرف [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) یا [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) استعمال کرنے کا کہہ سکتے ہیں۔ یہ تجربہ کار ایتھیریم صارفین کے لیے بہت اچھا ہے۔ لیکن ہم [مزید ایک ارب لوگوں](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) کی خدمت کرنے کی کوشش کر رہے ہیں۔ یہ ایک بہترین صارف کے تجربے کے بغیر نہیں ہوگا، اور ایک دوستانہ یوزر انٹرفیس اس کا ایک بڑا حصہ ہے۔

## گریٹر (Greeter) ایپلی کیشن {#greeter-app}

جدید <span dir="ltr">UI</span> کیسے کام کرتا ہے اس کے پیچھے بہت سی تھیوری ہے، اور [بہت سی اچھی سائٹس](https://react.dev/learn/thinking-in-react) [جو اس کی وضاحت کرتی ہیں](https://wagmi.sh/core/getting-started)۔ ان سائٹس کے کیے گئے بہترین کام کو دہرانے کے بجائے، میں یہ فرض کروں گا کہ آپ عملی طور پر سیکھنے کو ترجیح دیتے ہیں اور ایک ایسی ایپلی کیشن سے شروعات کریں گے جس کے ساتھ آپ کھیل سکیں۔ آپ کو چیزیں مکمل کرنے کے لیے اب بھی تھیوری کی ضرورت ہے، اور ہم اس تک پہنچیں گے - ہم بس سورس فائل در سورس فائل جائیں گے، اور جیسے جیسے چیزیں سامنے آئیں گی ان پر تبادلہ خیال کریں گے۔

### انسٹالیشن {#installation}

1. ایپلی کیشن Sepolia ٹیسٹ نیٹ ورک استعمال کرتی ہے۔ اگر ضروری ہو تو، [Sepolia ٹیسٹ ETH حاصل کریں](/developers/docs/networks/#sepolia) اور [اپنے والیٹ میں Sepolia شامل کریں](https://chainlist.org/chain/11155111)۔

2. GitHub ریپوزٹری کو کلون کریں اور ضروری پیکجز انسٹال کریں۔

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. ایپلی کیشن مفت رسائی کے پوائنٹس استعمال کرتی ہے، جن کی کارکردگی کی حدود ہوتی ہیں۔ اگر آپ [نوڈ بطور سروس](/developers/docs/nodes-and-clients/nodes-as-a-service/) فراہم کنندہ استعمال کرنا چاہتے ہیں، تو [`src/wagmi.ts`](#wagmi-ts) میں <span dir="ltr">URLs</span> کو تبدیل کریں۔

4. ایپلی کیشن شروع کریں۔

   ```sh
   npm run dev
   ```

5. ایپلی کیشن کے دکھائے گئے <span dir="ltr">URL</span> پر براؤز کریں۔ زیادہ تر معاملات میں، یہ [http://localhost:5173/](http://localhost:5173/) ہوتا ہے۔

6. آپ کنٹریکٹ کا سورس کوڈ، جو Hardhat کے Greeter کا ایک ترمیم شدہ ورژن ہے، [بلاک چین ایکسپلورر پر](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) دیکھ سکتے ہیں۔

### فائلوں کا جائزہ {#file-walk-through}

#### `index.html` {#index-html}

یہ فائل ایک معیاری <span dir="ltr">HTML</span> بوائلر پلیٹ ہے سوائے اس لائن کے، جو سکرپٹ فائل کو امپورٹ کرتی ہے۔

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

فائل کی ایکسٹینشن ظاہر کرتی ہے کہ یہ ایک [React جزو (component)](https://www.w3schools.com/react/react_components.asp) ہے جو [TypeScript](https://www.typescriptlang.org/) میں لکھا گیا ہے، جو JavaScript کی ایک ایکسٹینشن ہے اور [ٹائپ چیکنگ](https://en.wikipedia.org/wiki/Type_system#Type_checking) کو سپورٹ کرتی ہے۔ TypeScript کو JavaScript میں مرتب (compile) کیا جاتا ہے، لہذا ہم اسے کلائنٹ سائیڈ پر استعمال کر سکتے ہیں۔

اس فائل کی زیادہ تر وضاحت اس صورت میں کی گئی ہے کہ آپ دلچسپی رکھتے ہوں۔ عام طور پر آپ اس فائل میں ترمیم نہیں کرتے، بلکہ [`src/App.tsx`](#app-tsx) اور ان فائلوں میں کرتے ہیں جنہیں یہ امپورٹ کرتی ہے۔

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

اس React جزو کو امپورٹ کریں جو ایپلی کیشن کو نافذ کرتا ہے (نیچے دیکھیں)۔

```tsx
import { config } from './wagmi.ts'
```

[Wagmi](https://wagmi.sh/) کنفیگریشن امپورٹ کریں، جس میں بلاک چین کنفیگریشن شامل ہے۔

```tsx
const queryClient = new QueryClient()
```

[React Query کے](https://tanstack.com/query/latest/docs/framework/react/overview) کیشے مینیجر کی ایک نئی مثال (instance) بناتا ہے۔ یہ آبجیکٹ درج ذیل کو محفوظ کرے گا:

- کیش کی گئی <span dir="ltr">RPC</span> کالز
- کنٹریکٹ ریڈز
- بیک گراؤنڈ ری فیچنگ کی حالت

ہمیں کیشے مینیجر کی ضرورت ہے کیونکہ Wagmi کا <span dir="ltr">v3</span> اندرونی طور پر React Query استعمال کرتا ہے۔

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

روٹ React جزو بنائیں۔ `render` کا پیرامیٹر [JSX](https://www.w3schools.com/react/react_jsx.asp) ہے، جو ایک ایکسٹینشن زبان ہے جو <span dir="ltr">HTML</span> اور JavaScript/TypeScript دونوں کا استعمال کرتی ہے۔ یہاں فجائیہ نشان (exclamation point) TypeScript جزو کو بتاتا ہے: "آپ نہیں جانتے کہ `document.getElementById('root')`، `ReactDOM.createRoot` کے لیے ایک درست پیرامیٹر ہوگا، لیکن فکر نہ کریں - میں ڈویلپر ہوں اور میں آپ کو بتا رہا ہوں کہ ایسا ہی ہوگا"۔

```tsx
  <React.StrictMode>
```

ایپلی کیشن [ایک `React.StrictMode` جزو](https://react.dev/reference/react/StrictMode) کے اندر جا رہی ہے۔ یہ جزو React لائبریری کو اضافی ڈیبگنگ چیکس داخل کرنے کا کہتا ہے، جو ڈیولپمنٹ کے دوران مفید ہے۔

```tsx
    <WagmiProvider config={config}>
```

ایپلی کیشن [ایک `WagmiProvider` جزو](https://wagmi.sh/react/api/WagmiProvider) کے اندر بھی ہے۔ [Wagmi (جو ہم بنانے جا رہے ہیں) لائبریری](https://wagmi.sh/) ایک ایتھیریم غیر مرکزی ایپلی کیشن (dapp) لکھنے کے لیے React <span dir="ltr">UI</span> کی تعریفوں کو [Viem لائبریری](https://viem.sh/) کے ساتھ جوڑتی ہے۔

```tsx
      <QueryClientProvider client={queryClient}>
```

اور آخر میں، ایک React Query پرووائیڈر شامل کریں تاکہ کوئی بھی ایپلی کیشن جزو کیش کی گئی کیوریز استعمال کر سکے۔

```tsx
        <App />
```

اب ہمارے پاس ایپلی کیشن کے لیے جزو ہو سکتا ہے، جو دراصل <span dir="ltr">UI</span> کو نافذ کرتا ہے۔ جزو کے آخر میں `/>` React کو بتاتا ہے کہ اس جزو کے اندر کوئی تعریفیں نہیں ہیں، جیسا کہ <span dir="ltr">XML</span> معیار کے مطابق ہے۔

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

یقیناً، ہمیں دوسرے اجزاء کو بند کرنا ہوگا۔

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

ہمیں جن لائبریریوں کی ضرورت ہے انہیں امپورٹ کریں، اور ساتھ ہی [`Greeter` جزو](#greeter-tsx) کو بھی۔

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia چین کی <span dir="ltr">ID</span>۔

```
function App() {
```

React جزو بنانے کا یہ معیاری طریقہ ہے: ایک فنکشن کی وضاحت کریں جسے جب بھی رینڈر کرنے کی ضرورت ہو کال کیا جائے۔ اس فنکشن میں عام طور پر TypeScript یا JavaScript کوڈ ہوتا ہے، جس کے بعد ایک `return` سٹیٹمنٹ ہوتی ہے جو JSX کوڈ واپس کرتی ہے۔

```tsx
  const connection = useConnection()
```

موجودہ کنکشن سے متعلق معلومات حاصل کرنے کے لیے [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) کا استعمال کریں، جیسے کہ پتہ اور `chainId`۔

روایت کے مطابق، React میں `use...` کہلانے والے فنکشنز [ہکس (hooks)](https://www.w3schools.com/react/react_hooks.asp) ہوتے ہیں۔ یہ فنکشنز نہ صرف جزو کو ڈیٹا واپس کرتے ہیں؛ بلکہ وہ یہ بھی یقینی بناتے ہیں کہ جب وہ ڈیٹا تبدیل ہو تو اسے دوبارہ رینڈر کیا جائے (جزو کا فنکشن دوبارہ چلایا جاتا ہے، اور اس کا آؤٹ پٹ <span dir="ltr">HTML</span> میں پچھلے والے کی جگہ لے لیتا ہے)۔

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

React ہک [`useEffect`](https://react.dev/reference/react/useEffect) آپ کو کسی بیرونی سسٹم کو ہم آہنگ کرنے کے لیے متغیر (variable) کی قدر تبدیل ہونے پر فنکشن چلانے کی سہولت دیتا ہے۔

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

جب بھی کنکشن کی حالت یا کنکشن کی <span dir="ltr">chainId</span> تبدیل ہو تو فنکشن کو دوبارہ چلائیں۔

```tsx
  return (
    <>
```

React جزو کا JSX _لازمی_ طور پر ایک واحد <span dir="ltr">HTML</span> جزو واپس کرے۔ جب ہمارے پاس متعدد اجزاء ہوں اور ہمیں ان سب کو لپیٹنے کے لیے کسی کنٹینر کی ضرورت نہ ہو، تو ہم انہیں ایک واحد جزو میں ملانے کے لیے ایک خالی جزو (`<> ... </>`) استعمال کرتے ہیں۔

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

سنٹیکس `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`"۔

JSX کے اندر if سٹیٹمنٹس رکھنے کا یہ معیاری طریقہ ہے۔

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX <span dir="ltr">XML</span> معیار کی پیروی کرتا ہے، جو <span dir="ltr">HTML</span> سے زیادہ سخت ہے۔ اگر کسی ٹیگ کا متعلقہ اختتامی ٹیگ نہیں ہے، تو اسے ختم کرنے کے لیے اس کے آخر میں سلیش (`/`) _لازمی_ ہونا چاہیے۔

یہاں ہمارے پاس ایسے دو ٹیگز ہیں، `<Greeter />` (جس میں دراصل وہ <span dir="ltr">HTML</span> کوڈ ہوتا ہے جو کنٹریکٹ سے بات کرتا ہے) اور [افقی لائن کے لیے `<HTML-PLACEHOLDER-HTMLTAG-8d9513 />`](https://www.w3schools.com/tags/tag_hr.asp)۔

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

`connectors` میں ہمارے پاس کنیکٹرز کی ایک فہرست ہے۔ ہم اسے دکھانے کے لیے JSX بٹنوں کی فہرست میں تبدیل کرنے کے لیے [`map`](https://www.w3schools.com/jsref/jsref_map.asp) کا استعمال کرتے ہیں۔

```tsx
            <button
              key={connector.uid}
```

JSX میں "بہن بھائی (sibling)" ٹیگز (وہ ٹیگز جو ایک ہی پیرنٹ سے نکلتے ہیں) کے لیے مختلف شناخت کنندگان (identifiers) کا ہونا ضروری ہے۔

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

اضافی معلومات فراہم کریں۔ ایکسپریشن سنٹیکس `<variable>?.<field>` JavaScript کو بتاتا ہے کہ اگر متغیر کی تعریف کی گئی ہے، تو اس فیلڈ کا جائزہ لیں۔ اگر متغیر کی تعریف نہیں کی گئی ہے، تو اس ایکسپریشن کا نتیجہ `undefined` نکلتا ہے۔

ایکسپریشن `error.message`، جب کوئی خرابی نہ ہو، تو ایک ایکسیپشن (exception) پیدا کرے گا۔ `error?.message` کا استعمال ہمیں اس مسئلے سے بچنے دیتا ہے۔

#### `src/Greeter.tsx` {#greeter-tsx}

اس فائل میں زیادہ تر <span dir="ltr">UI</span> فعالیت شامل ہے۔ اس میں وہ تعریفیں شامل ہیں جو عام طور پر متعدد فائلوں میں ہوتی ہیں، لیکن چونکہ یہ ایک ٹیوٹوریل ہے، اس لیے پروگرام کو کارکردگی یا دیکھ بھال میں آسانی کے بجائے پہلی بار سمجھنے میں آسان ہونے کے لیے بہتر بنایا گیا ہے۔

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

[`abitype` لائبریری](https://abitype.dev/) ہمیں مختلف ایتھیریم ڈیٹا ٹائپس کے لیے TypeScript تعریفیں فراہم کرتی ہے، جیسے کہ [`AddressType`](https://abitype.dev/config#addresstype)۔

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` کنٹریکٹ کے لیے <span dir="ltr">ABI</span>۔
اگر آپ کنٹریکٹس اور <span dir="ltr">UI</span> ایک ہی وقت میں تیار کر رہے ہیں، تو آپ عام طور پر انہیں ایک ہی ریپوزٹری میں رکھیں گے اور Solidity کمپائلر کے ذریعے تیار کردہ <span dir="ltr">ABI</span> کو اپنی ایپلی کیشن میں ایک فائل کے طور پر استعمال کریں گے۔ تاہم، یہاں یہ ضروری نہیں ہے کیونکہ کنٹریکٹ پہلے ہی تیار ہو چکا ہے اور تبدیل نہیں ہوگا۔

ہم TypeScript کو یہ بتانے کے لیے [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) کا استعمال کرتے ہیں کہ یہ ایک _حقیقی_ مستقل (constant) ہے۔ عام طور پر، جب آپ JavaScript میں `const x = {"a": 1}` کی وضاحت کرتے ہیں، تو آپ `x` میں قدر تبدیل کر سکتے ہیں، آپ بس اسے تفویض (assign) نہیں کر سکتے۔

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript سختی سے ٹائپ شدہ (strongly typed) ہے۔ ہم اس تعریف کا استعمال اس پتے کی وضاحت کرنے کے لیے کرتے ہیں جہاں `Greeter` کنٹریکٹ مختلف چینز پر تعینات کیا گیا ہے۔ کلید ایک نمبر (<span dir="ltr">chainId</span>) ہے، اور قدر ایک `AddressType` (ایک پتہ) ہے۔

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) پر کنٹریکٹ کا پتہ۔

##### `Timer` جزو {#timer-component}

`Timer` جزو کسی دیے گئے وقت سے سیکنڈز کی تعداد دکھاتا ہے۔ یہ استعمال کی سہولت کے مقاصد کے لیے اہم ہے۔ جب صارفین کچھ کرتے ہیں، تو وہ فوری ردعمل کی توقع کرتے ہیں۔ بلاک چینز میں، یہ اکثر ناممکن ہوتا ہے کیونکہ جب تک کسی ٹرانزیکشن کو بلاک میں نہیں رکھا جاتا تب تک کچھ نہیں ہوتا۔ اس کا ایک حل یہ دکھانا ہے کہ صارف کو کارروائی کیے کتنا وقت گزر چکا ہے، تاکہ صارف فیصلہ کر سکے کہ آیا درکار وقت معقول ہے۔

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` جزو ایک پیرامیٹر لیتا ہے، `lastUpdate`، جو آخری کارروائی کا وقت ہے۔

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

جزو کے صحیح طریقے سے کام کرنے کے لیے ہمیں حالت (جزو سے منسلک ایک متغیر) کی ضرورت ہے اور اسے اپ ڈیٹ کرنا ہوگا۔ لیکن ہمیں اسے کبھی پڑھنے کی ضرورت نہیں ہوتی، اس لیے متغیر بنانے کی زحمت نہ کریں۔

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) فنکشن ہمیں وقتاً فوقتاً چلنے کے لیے ایک فنکشن شیڈول کرنے کی سہولت دیتا ہے۔ اس صورت میں، ہر سیکنڈ۔ فنکشن حالت کو اپ ڈیٹ کرنے کے لیے `setNow` کو کال کرتا ہے، تاکہ `Timer` جزو دوبارہ رینڈر ہو جائے۔ ہم اسے ایک خالی انحصاری فہرست (dependency list) کے ساتھ [`useEffect`](https://react.dev/reference/react/useEffect) کے اندر لپیٹتے ہیں تاکہ یہ جزو کے ہر بار رینڈر ہونے کے بجائے صرف ایک بار ہو۔

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

##### `Greeter` جزو {#greeter-component}

```tsx
const Greeter = () => {
```

آخر کار، ہم جزو کی وضاحت کرنے پر آتے ہیں۔

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

اس چین اور اکاؤنٹ کے بارے میں معلومات جو ہم استعمال کر رہے ہیں، [Wagmi](https://wagmi.sh/) کے بشکریہ۔ چونکہ یہ ایک ہک (`use...`) ہے، اس لیے جب بھی یہ معلومات تبدیل ہوتی ہیں تو جزو دوبارہ رینڈر ہوتا ہے۔

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter کنٹریکٹ کا پتہ، جو `undefined` ہوتا ہے اگر ہمارے پاس چین کی معلومات نہ ہوں، یا ہم اس کنٹریکٹ کے بغیر کسی چین پر ہوں۔

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

React کا [`useState` ہک](https://www.w3schools.com/react/react_usestate.asp) ہمیں ایک حالت متغیر (state variable) کی وضاحت کرنے دیتا ہے، جس کی قدر جزو کی ایک رینڈرنگ سے دوسری تک برقرار رہتی ہے۔ ابتدائی قدر پیرامیٹر ہے، اس صورت میں خالی سٹرنگ۔

`useState` ہک دو اقدار کے ساتھ ایک فہرست واپس کرتا ہے:

1. حالت متغیر کی موجودہ قدر۔
2. ضرورت پڑنے پر حالت متغیر میں ترمیم کرنے کا فنکشن۔ چونکہ یہ ایک ہک ہے، جب بھی اسے کال کیا جاتا ہے تو جزو دوبارہ رینڈر ہوتا ہے۔

اس صورت میں، ہم اس نئی مبارکباد (greeting) کے لیے ایک حالت متغیر استعمال کر رہے ہیں جسے صارف سیٹ کرنا چاہتا ہے۔

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

اگر متعدد صارفین ایک ہی وقت میں ایک ہی کنٹریکٹ استعمال کر رہے ہیں، تو وہ ایک دوسرے کی مبارکباد کو اوور رائٹ کر سکتے ہیں۔ یہ صارفین کو ایسا لگے گا جیسے ایپلی کیشن خراب ہو رہی ہے۔ اگر ایپلی کیشن یہ دکھاتی ہے کہ آخری بار مبارکباد کس نے سیٹ کی تھی، تو صارف کو معلوم ہو جائے گا کہ یہ کوئی اور تھا اور ایپلی کیشن صحیح طریقے سے کام کر رہی ہے۔

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

صارفین یہ دیکھنا پسند کرتے ہیں کہ ان کے اعمال کا فوری اثر ہو۔ تاہم، بلاک چین پر، ایسا نہیں ہوتا ہے۔ یہ حالت متغیرات ہمیں کم از کم صارفین کو کچھ دکھانے کی سہولت دیتے ہیں تاکہ انہیں معلوم ہو کہ ان کی کارروائی جاری ہے۔

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

اگر اوپر موجود `readResults` ڈیٹا کو تبدیل کرتا ہے اور یہ کسی غلط قدر (مثال کے طور پر، `undefined`) پر سیٹ نہیں ہے، تو موجودہ مبارکباد کو بلاک چین سے پڑھی گئی مبارکباد میں اپ ڈیٹ کریں۔ نیز، سٹیٹس کو اپ ڈیٹ کریں۔

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

`!!<value>` کا مطلب ہے کہ اگر قدر `false` ہے، یا کوئی ایسی قدر جس کا نتیجہ غلط نکلتا ہے، جیسے کہ `undefined`، `0`، یا ایک خالی سٹرنگ، تو مجموعی طور پر ایکسپریشن `false` ہے۔ کسی بھی دوسری قدر کے لیے، یہ `true` ہے۔ یہ اقدار کو بولینز (booleans) میں تبدیل کرنے کا ایک طریقہ ہے، کیونکہ اگر کوئی `greeterAddr` نہیں ہے، تو ہم ایونٹس کو سننا نہیں چاہتے۔

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

جب ہم لاگز دیکھتے ہیں (جو اس وقت ہوتا ہے جب ہم کوئی نیا ایونٹ دیکھتے ہیں)، تو اس کا مطلب ہے کہ مبارکباد میں ترمیم کی گئی ہے۔ اس صورت میں، ہم `currentGreeting` اور `lastSetterAddress` کو نئی اقدار میں اپ ڈیٹ کر سکتے ہیں۔ نیز، ہم سٹیٹس ڈسپلے کو اپ ڈیٹ کرنا چاہتے ہیں۔

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

جب ہم سٹیٹس کو اپ ڈیٹ کرتے ہیں تو ہم دو کام کرنا چاہتے ہیں:

1. سٹیٹس سٹرنگ (`status`) کو اپ ڈیٹ کریں
2. آخری سٹیٹس اپ ڈیٹ کے وقت (`statusTime`) کو موجودہ وقت پر اپ ڈیٹ کریں۔

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

یہ نئی مبارکباد کی ان پٹ فیلڈ میں تبدیلیوں کے لیے ایونٹ ہینڈلر ہے۔ ہم `evt` پیرامیٹر کی قسم بتا سکتے ہیں، لیکن TypeScript ایک ٹائپ آپشنل زبان ہے۔ چونکہ یہ فنکشن صرف ایک بار کال کیا جاتا ہے، ایک <span dir="ltr">HTML</span> ایونٹ ہینڈلر میں، مجھے نہیں لگتا کہ یہ ضروری ہے۔

```tsx
  const { writeContractAsync } = useWriteContract()
```

کنٹریکٹ میں لکھنے کا فنکشن۔ یہ [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) سے ملتا جلتا ہے، لیکن بہتر سٹیٹس اپ ڈیٹس کو فعال کرتا ہے۔

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

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) کا استعمال کرتے ہوئے بلاک چین میں ایک نوڈ کو ٹرانزیکشن بھیجیں۔
2. نوڈ سے جواب کا انتظار کریں۔
3. جب جواب موصول ہو جائے، تو صارف سے والیٹ کے ذریعے ٹرانزیکشن پر دستخط کرنے کو کہیں۔ یہ قدم نوڈ کا جواب موصول ہونے کے بعد _لازمی_ ہونا چاہیے کیونکہ صارف کو دستخط کرنے سے پہلے ٹرانزیکشن کی گیس کی قیمت دکھائی جاتی ہے۔
4. صارف کی منظوری کا انتظار کریں۔
5. ٹرانزیکشن دوبارہ بھیجیں، اس بار [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) کا استعمال کرتے ہوئے۔

مرحلہ 2 میں ممکنہ طور پر قابل ذکر وقت لگ سکتا ہے، جس کے دوران صارفین سوچ سکتے ہیں کہ آیا ان کی کمانڈ یوزر انٹرفیس کو موصول ہوئی تھی اور ان سے ابھی تک ٹرانزیکشن پر دستخط کرنے کو کیوں نہیں کہا جا رہا ہے۔ اس سے صارف کا تجربہ (<span dir="ltr">UX</span>) خراب ہوتا ہے۔

اس کا ایک حل یہ ہے کہ جب بھی کوئی پیرامیٹر تبدیل ہو تو `eth_estimateGas` بھیجا جائے۔ پھر، جب صارف واقعی ٹرانزیکشن بھیجنا چاہتا ہے (اس صورت میں **Update greeting** دبا کر)، تو گیس کی قیمت معلوم ہوتی ہے، اور صارف فوری طور پر والیٹ کا صفحہ دیکھ سکتا ہے۔

```tsx
  return (
```

اب ہم آخر کار واپس کرنے کے لیے اصل <span dir="ltr">HTML</span> بنا سکتے ہیں۔

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

موجودہ مبارکباد دکھائیں۔

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

اگر ہم جانتے ہیں کہ آخری بار مبارکباد کس نے سیٹ کی تھی، تو وہ معلومات دکھائیں۔ `Greeter` اس معلومات کا ٹریک نہیں رکھتا، اور ہم `SetGreeting` ایونٹس کے لیے پیچھے مڑ کر نہیں دیکھنا چاہتے، اس لیے ہم اسے صرف ایک بار حاصل کرتے ہیں جب ہمارے چلنے کے دوران مبارکباد تبدیل ہوتی ہے۔

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

یہ ان پٹ ٹیکسٹ فیلڈ ہے جہاں صارف نئی مبارکباد سیٹ کر سکتا ہے۔ جب بھی صارف کوئی کلید (key) دباتا ہے، ہم `greetingChange` کو کال کرتے ہیں، جو `setNewGreeting` کو کال کرتا ہے۔ چونکہ `setNewGreeting`، `useState` سے آتا ہے، اس لیے یہ `Greeter` جزو کو دوبارہ رینڈر کرنے کا سبب بنتا ہے۔ اس کا مطلب یہ ہے کہ:

- ہمیں نئی مبارکباد کی قدر کو برقرار رکھنے کے لیے `value` کی وضاحت کرنے کی ضرورت ہے، کیونکہ بصورت دیگر یہ واپس ڈیفالٹ، یعنی خالی سٹرنگ میں تبدیل ہو جائے گی۔
- جب بھی `newGreeting` تبدیل ہوتا ہے تو `simulation` بھی اپ ڈیٹ ہوتا ہے، جس کا مطلب ہے کہ ہمیں درست مبارکباد کے ساتھ ایک نقلی (simulation) ملے گی۔ یہ متعلقہ ہو سکتا ہے کیونکہ گیس کی قیمت کال ڈیٹا کے سائز پر منحصر ہوتی ہے، جو سٹرنگ کی لمبائی پر منحصر ہوتا ہے۔

```tsx
      <button disabled={!simulation.data}
```

بٹن کو صرف اس وقت فعال کریں جب ہمارے پاس وہ معلومات ہوں جو ہمیں ٹرانزیکشن بھیجنے کے لیے درکار ہیں۔

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

سٹیٹس کو اپ ڈیٹ کریں۔ اس مقام پر، صارف کو والیٹ میں تصدیق کرنے کی ضرورت ہے۔

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` صرف اس وقت واپس آتا ہے جب ٹرانزیکشن دراصل بھیج دی جاتی ہے۔ اس سے ہم صارف کو دکھا سکتے ہیں کہ ٹرانزیکشن کو بلاک چین میں شامل ہونے کے لیے کتنا انتظار کرنا پڑا ہے۔

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

سٹیٹس دکھائیں اور یہ بھی کہ اسے اپ ڈیٹ ہوئے کتنا وقت گزر چکا ہے۔

```
export {Greeter}
```

جزو کو ایکسپورٹ کریں۔

#### `src/wagmi.ts` {#wagmi-ts}

آخر میں، Wagmi سے متعلق مختلف تعریفیں `src/wagmi.ts` میں ہیں۔ میں یہاں ہر چیز کی وضاحت نہیں کرنے جا رہا ہوں، کیونکہ اس کا زیادہ تر حصہ بوائلر پلیٹ ہے جسے آپ کو تبدیل کرنے کی ضرورت نہیں پڑے گی۔

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi کنفیگریشن میں اس ایپلی کیشن کے ذریعے سپورٹ کردہ چینز شامل ہیں۔ آپ [دستیاب چینز کی فہرست](https://wagmi.sh/core/api/chains) دیکھ سکتے ہیں۔

```ts
  connectors: [
    injected(),
  ],
```

[یہ کنیکٹر](https://wagmi.sh/core/api/connectors/injected) ہمیں براؤزر میں انسٹال کردہ والیٹ سے بات کرنے کی سہولت دیتا ہے۔

```ts
  transports: {
    [sepolia.id]: http()
```

Viem کے ساتھ آنے والا ڈیفالٹ <span dir="ltr">HTTP</span> اینڈ پوائنٹ کافی اچھا ہے۔ اگر ہم ایک مختلف <span dir="ltr">URL</span> چاہتے ہیں، تو ہم `http("https:// hostname ")` یا `webSocket("wss:// hostname ")` استعمال کر سکتے ہیں۔

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## ایک اور بلاک چین شامل کرنا {#add-blockchain}

آج کل بہت سے [L2 سکیلنگ سلوشنز](https://ethereum.org/layer-2/) موجود ہیں، اور آپ شاید کچھ ایسے سلوشنز کو سپورٹ کرنا چاہیں جنہیں Viem ابھی تک سپورٹ نہیں کرتا۔ ایسا کرنے کے لیے، آپ `src/wagmi.ts` میں ترمیم کرتے ہیں۔ یہ ہدایات بتاتی ہیں کہ [Optimism Sepolia](https://chainlist.org/chain/11155420) کو کیسے شامل کیا جائے۔

1.  `src/wagmi.ts` میں ترمیم کریں

    A. Viem سے `defineChain` ٹائپ امپورٹ کریں۔

          ```ts
          import { defineChain } from 'viem'
          ```

    B. نیٹ ورک کی تعریف شامل کریں۔ آپ کو واقعی Optimism Sepolia کے لیے ایسا کرنے کی ضرورت نہیں ہے، [یہ پہلے سے ہی `viem` میں موجود ہے](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)، لیکن اس طرح آپ سیکھتے ہیں کہ ایک ایسی بلاک چین کو کیسے شامل کیا جائے جو `viem` میں نہیں ہے۔

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

    C. نئی چین کو `createConfig` کال میں شامل کریں۔

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
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  یہ یقینی بنانے کے لیے `src/Greeter.tsx` میں ترمیم کریں کہ ایپلی کیشن نئے نیٹ ورک پر آپ کے کنٹریکٹس کا پتہ جانتی ہے۔

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  اپنے براؤزر میں۔

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true) پر براؤز کریں اور چین کو اپنے والیٹ میں شامل کرنے کے لیے ٹیبل کے دائیں جانب موجود بٹنوں میں سے کسی ایک پر کلک کریں۔

    B. ایپلی کیشن میں، بلاک چین کو تبدیل کرنے کے لیے **Disconnect** کریں اور پھر دوبارہ جڑیں۔ اسے سنبھالنے کے اور بھی اچھے طریقے ہیں، لیکن ان کے لیے ایپلی کیشن میں تبدیلیوں کی ضرورت ہوگی۔

## نتیجہ {#conclusion}

یقیناً، آپ کو واقعی `Greeter` کے لیے یوزر انٹرفیس فراہم کرنے کی پرواہ نہیں ہے۔ آپ اپنے کنٹریکٹس کے لیے یوزر انٹرفیس بنانا چاہتے ہیں۔ اپنی خود کی ایپلی کیشن بنانے کے لیے، ان مراحل پر عمل کریں:

1. Wagmi ایپلی کیشن بنانے کی وضاحت کریں۔

   ```sh copy
   npm create wagmi
   ```

2. آگے بڑھنے کے لیے `y` ٹائپ کریں۔

3. ایپلی کیشن کا نام رکھیں۔

4. **React** فریم ورک منتخب کریں۔

5. **Vite** ویریئنٹ منتخب کریں۔

اب جائیں اور اپنے کنٹریکٹس کو پوری دنیا کے لیے قابل استعمال بنائیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔