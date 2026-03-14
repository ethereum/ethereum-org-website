---
title: "آپ کے کانٹریکٹ کے لیے ایک یوزر انٹرفیس بنانا"
description: "TypeScript، React، Vite، اور Wagmi جیسے جدید اجزاء کا استعمال کرتے ہوئے، ہم ایک جدید، لیکن کم سے کم، یوزر انٹرفیس پر جائیں گے اور یہ سیکھیں گے کہ یوزر انٹرفیس سے والیٹ کو کیسے جوڑا جائے، معلومات کو پڑھنے کے لیے اسمارٹ کانٹریکٹ کو کال کریں، اسمارٹ کانٹریکٹ پر ٹرانزیکشن بھیجیں، اور تبدیلیوں کی شناخت کے لیے اسمارٹ کانٹریکٹ سے ایونٹس کی نگرانی کریں۔"
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "فرنٹ اینڈ" ]
skill: beginner
published: 2023-11-01
lang: ur-in
sidebarDepth: 3
---

آپ کو Ethereum ایکو سسٹم میں ایک ایسی خصوصیت ملی جس کی ہمیں ضرورت ہے۔ آپ نے اسے نافذ کرنے کے لیے اسمارٹ کانٹریکٹس لکھے، اور شاید کچھ متعلقہ کوڈ بھی جو آف چین چلتا ہے۔ یہ بہت اچھا ہے! بدقسمتی سے، یوزر انٹرفیس کے بغیر آپ کے پاس کوئی یوزر نہیں ہوگا، اور آخری بار جب آپ نے کوئی ویب سائٹ لکھی تھی تو لوگ ڈائل اپ موڈیم استعمال کرتے تھے اور JavaScript نیا تھا۔

یہ مضمون آپ کے لیے ہے۔ میں مانتا ہوں کہ آپ پروگرامنگ جانتے ہیں، اور شاید تھوڑا سا JavaScript اور HTML، لیکن آپ کی یوزر انٹرفیس کی مہارتیں زنگ آلود اور پرانی ہیں۔ ہم مل کر ایک سادہ جدید ایپلی کیشن کا جائزہ لیں گے تاکہ آپ دیکھ سکیں کہ آج کل یہ کیسے کیا جاتا ہے۔

## یہ اہم کیوں ہے {#why-important}

نظریاتی طور پر، آپ لوگوں کو اپنے کانٹریکٹس کے ساتھ تعامل کرنے کے لیے [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) یا [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) کا استعمال کروا سکتے ہیں۔ یہ تجربہ کار Ethereans کے لیے بہت اچھا ہوگا۔ لیکن ہم [ایک ارب اور لوگوں](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) کی خدمت کرنے کی کوشش کر رہے ہیں۔ یہ ایک بہترین یوزر تجربے کے بغیر نہیں ہوگا، اور ایک دوستانہ یوزر انٹرفیس اس کا ایک بڑا حصہ ہے۔

## Greeter ایپلی کیشن {#greeter-app}

ایک جدید UI کے کام کرنے کے پیچھے بہت زیادہ تھیوری ہے، اور [بہت سی اچھی سائٹس](https://react.dev/learn/thinking-in-react) [ہیں جو اس کی وضاحت کرتی ہیں](https://wagmi.sh/core/getting-started)۔ ان سائٹس کے ذریعے کیے گئے عمدہ کام کو دہرانے کے بجائے، میں یہ مانوں گا کہ آپ کر کے سیکھنا پسند کرتے ہیں اور ایک ایسی ایپلی کیشن سے شروعات کرتے ہیں جس کے ساتھ آپ کھیل سکتے ہیں۔ چیزوں کو انجام دینے کے لیے آپ کو اب بھی تھیوری کی ضرورت ہے، اور ہم اس پر آئیں گے - ہم صرف سورس فائل بہ سورس فائل جائیں گے، اور جیسے جیسے ہم ان تک پہنچیں گے چیزوں پر تبادلہ خیال کریں گے۔

### انسٹالیشن {#installation}

1. اگر ضروری ہو تو، اپنے والیٹ میں [Holesky بلاک چین](https://chainlist.org/?search=holesky&testnets=true) شامل کریں اور [ٹیسٹ ETH حاصل کریں](https://www.holeskyfaucet.io/)۔

2. github ریپوزٹری کو کلون کریں۔

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. ضروری پیکجز انسٹال کریں۔

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. ایپلی کیشن شروع کریں۔

   ```sh
   pnpm dev
   ```

5. ایپلی کیشن کے ذریعے دکھائے گئے URL پر براؤز کریں۔ زیادہ تر معاملات میں، یہ [http://localhost:5173/](http://localhost:5173/) ہے۔

6. آپ کانٹریکٹ کا سورس کوڈ، Hardhat کے Greeter کا تھوڑا سا تبدیل شدہ ورژن، [ایک بلاک چین ایکسپلورر پر](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) دیکھ سکتے ہیں۔

### فائل واک تھرو {#file-walk-through}

#### `index.html` {#index-html}

یہ فائل اس لائن کے علاوہ معیاری HTML بوائلرپلیٹ ہے، جو اسکرپٹ فائل کو امپورٹ کرتی ہے۔

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

فائل ایکسٹینشن ہمیں بتاتی ہے کہ یہ فائل ایک [React کمپونینٹ](https://www.w3schools.com/react/react_components.asp) ہے جو [TypeScript](https://www.typescriptlang.org/) میں لکھی گئی ہے، یہ JavaScript کی ایک ایکسٹینشن ہے جو [ٹائپ چیکنگ](https://en.wikipedia.org/wiki/Type_system#Type_checking) کو سپورٹ کرتی ہے۔ TypeScript کو JavaScript میں کمپائل کیا جاتا ہے، لہذا ہم اسے کلائنٹ سائیڈ ایگزیکیوشن کے لیے استعمال کر سکتے ہیں۔

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

ہمیں درکار لائبریری کوڈ امپورٹ کریں۔

```tsx
import { App } from './App'
```

اس React کمپونینٹ کو امپورٹ کریں جو ایپلی کیشن کو نافذ کرتا ہے (نیچے دیکھیں)۔

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

روٹ React کمپونینٹ بنائیں۔ `render` کا پیرامیٹر [JSX](https://www.w3schools.com/react/react_jsx.asp) ہے، ایک ایکسٹینشن زبان جو HTML اور JavaScript/TypeScript دونوں کا استعمال کرتی ہے۔ یہاں کا ایکسکلیمیشن پوائنٹ TypeScript کمپونینٹ کو بتاتا ہے: "آپ نہیں جانتے کہ `document.getElementById('root')` `ReactDOM.createRoot` کے لیے ایک درست پیرامیٹر ہوگا، لیکن فکر نہ کریں - میں ڈیولپر ہوں اور میں آپ کو بتا رہا ہوں کہ یہ ہوگا۔"۔

```tsx
  <React.StrictMode>
```

ایپلی کیشن [ایک `React.StrictMode` کمپونینٹ](https://react.dev/reference/react/StrictMode) کے اندر جا رہی ہے۔ یہ کمپونینٹ React لائبریری کو اضافی ڈیبگنگ چیکس داخل کرنے کے لیے کہتا ہے، جو ڈیولپمنٹ کے دوران مفید ہے۔

```tsx
    <WagmiConfig config={config}>
```

ایپلی کیشن [ایک `WagmiConfig` کمپونینٹ](https://wagmi.sh/react/api/WagmiProvider) کے اندر بھی ہے۔ [wagmi (we are going to make it) لائبریری](https://wagmi.sh/) React UI کی تعریفوں کو Ethereum ڈی سینٹرلائزڈ ایپلی کیشن لکھنے کے لیے [viem لائبریری](https://viem.sh/) سے جوڑتی ہے۔

```tsx
      <RainbowKitProvider chains={chains}>
```

اور آخر میں، [ایک `RainbowKitProvider` کمپونینٹ](https://www.rainbowkit.com/)۔ یہ کمپونینٹ لاگ آن کرنے اور والیٹ اور ایپلی کیشن کے درمیان مواصلات کو ہینڈل کرتا ہے۔

```tsx
        <App />
```

اب ہمارے پاس ایپلی کیشن کے لیے کمپونینٹ ہو سکتا ہے، جو اصل میں UI کو نافذ کرتا ہے۔ کمپونینٹ کے آخر میں `/>` React کو بتاتا ہے کہ اس کمپونینٹ کے اندر کوئی تعریف نہیں ہے، جیسا کہ XML معیار کے مطابق ہے۔

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

یقیناً، ہمیں دوسرے کمپونینٹس کو بند کرنا ہوگا۔

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

یہ React کمپونینٹ بنانے کا معیاری طریقہ ہے - ایک ایسا فنکشن بیان کریں جسے ہر بار رینڈر کرنے کی ضرورت پڑنے پر کال کیا جاتا ہے۔ اس فنکشن میں عام طور پر سب سے اوپر کچھ TypeScript یا JavaScript کوڈ ہوتا ہے، جس کے بعد ایک `return` اسٹیٹمنٹ ہوتا ہے جو JSX کوڈ کو واپس کرتا ہے۔

```tsx
  const { isConnected } = useAccount()
```

یہاں ہم یہ چیک کرنے کے لیے [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) کا استعمال کرتے ہیں کہ آیا ہم والیٹ کے ذریعے بلاک چین سے جڑے ہیں یا نہیں۔

کنونشن کے مطابق، React میں `use...` کہلانے والے فنکشنز [ہکس](https://www.w3schools.com/react/react_hooks.asp) ہوتے ہیں جو کسی قسم کا ڈیٹا واپس کرتے ہیں۔ جب آپ اس طرح کے ہکس استعمال کرتے ہیں، تو نہ صرف آپ کا کمپونینٹ ڈیٹا حاصل کرتا ہے، بلکہ جب وہ ڈیٹا تبدیل ہوتا ہے تو کمپونینٹ کو اپ ڈیٹ شدہ معلومات کے ساتھ دوبارہ رینڈر کیا جاتا ہے۔

```tsx
  return (
    <>
```

React کمپونینٹ کے JSX کو _لازماً_ ایک کمپونینٹ واپس کرنا چاہیے۔ جب ہمارے پاس متعدد کمپونینٹس ہوں اور ہمارے پاس کوئی ایسی چیز نہ ہو جو "فطری طور پر" لپیٹتی ہو تو ہم ایک خالی کمپونینٹ (`<> ...` استعمال کرتے ہیں </>`) تاکہ انہیں ایک ہی کمپونینٹ بنایا جا سکے۔

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

ہمیں RainbowKit سے [`ConnectButton` کمپونینٹ](https://www.rainbowkit.com/docs/connect-button) ملتا ہے۔ جب ہم جڑے نہیں ہوتے ہیں، تو یہ ہمیں ایک `Connect Wallet` بٹن دیتا ہے جو ایک موڈل کھولتا ہے جو والیٹس کی وضاحت کرتا ہے اور آپ کو یہ انتخاب کرنے دیتا ہے کہ آپ کون سا استعمال کرتے ہیں۔ جب ہم جڑے ہوتے ہیں، تو یہ ہمارے استعمال کردہ بلاک چین، ہمارے اکاؤنٹ کا ایڈریس، اور ہمارے ETH بیلنس کو دکھاتا ہے۔ ہم ان ڈسپلیز کو نیٹ ورک تبدیل کرنے یا منقطع کرنے کے لیے استعمال کر سکتے ہیں۔

```tsx
      {isConnected && (
```

جب ہمیں JSX میں اصل JavaScript (یا TypeScript جو JavaScript میں کمپائل کیا جائے گا) داخل کرنے کی ضرورت ہوتی ہے، تو ہم بریکٹس (`{}`) کا استعمال کرتے ہیں۔

سنٹیکس `a && b` [`a ?` کا مختصر ہے b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)۔ یعنی، اگر `a`درست ہے تو یہ`b`کا اندازہ کرتا ہے اور بصورت دیگر یہ`a`کا اندازہ کرتا ہے (جو`false`، `0`، وغیرہ ہو سکتا ہے)۔ یہ React کو بتانے کا ایک آسان طریقہ ہے کہ ایک کمپونینٹ کو صرف تب ہی دکھایا جانا چاہیے جب کوئی خاص شرط پوری ہو۔

اس معاملے میں، ہم صرف یوزر کو `Greeter` دکھانا چاہتے ہیں اگر یوزر بلاک چین سے جڑا ہو۔

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

اس فائل میں UI کی زیادہ تر فنکشنلٹی موجود ہے۔ اس میں ایسی تعریفیں شامل ہیں جو عام طور پر متعدد فائلوں میں ہوتی ہیں، لیکن چونکہ یہ ایک ٹیوٹوریل ہے، پروگرام کو پہلی بار سمجھنے میں آسانی کے لیے بہتر بنایا گیا ہے، نہ کہ کارکردگی یا دیکھ بھال کی آسانی کے لیے۔

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

ہم ان لائبریری فنکشنز کا استعمال کرتے ہیں۔ دوبارہ، ان کی وضاحت نیچے کی گئی ہے جہاں وہ استعمال ہوتے ہیں۔

```tsx
import { AddressType } from 'abitype'
```

[`abitype` لائبریری](https://abitype.dev/) ہمیں مختلف Ethereum ڈیٹا کی اقسام کے لیے TypeScript کی تعریفیں فراہم کرتی ہے، جیسے [`AddressType`](https://abitype.dev/config#addresstype)۔

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` کانٹریکٹ کے لیے ABI۔
اگر آپ ایک ہی وقت میں کانٹریکٹس اور UI تیار کر رہے ہیں تو آپ عام طور پر انہیں ایک ہی ریپوزٹری میں ڈالیں گے اور Solidity کمپائلر کے ذریعہ تیار کردہ ABI کو اپنی ایپلی کیشن میں ایک فائل کے طور پر استعمال کریں گے۔ تاہم، یہاں اس کی ضرورت نہیں ہے کیونکہ کانٹریکٹ پہلے ہی تیار ہو چکا ہے اور تبدیل نہیں ہونے والا ہے۔

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript مضبوطی سے ٹائپ کیا گیا ہے۔ ہم اس تعریف کا استعمال اس ایڈریس کو متعین کرنے کے لیے کرتے ہیں جس میں `Greeter` کانٹریکٹ مختلف چینز پر ڈیپلائے کیا گیا ہے۔ کی (key) ایک نمبر (chainId) ہے، اور ویلیو ایک `AddressType` (ایک ایڈریس) ہے۔

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

دو سپورٹڈ نیٹ ورکس پر کانٹریکٹ کا ایڈریس: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) اور [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)۔

نوٹ: دراصل ایک تیسری تعریف ہے، Redstone Holesky کے لیے، اس کی وضاحت نیچے کی جائے گی۔

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

اس قسم کا استعمال `ShowObject` کمپونینٹ (جس کی وضاحت بعد میں کی گئی ہے) کے پیرامیٹر کے طور پر کیا جاتا ہے۔ اس میں آبجیکٹ کا نام اور اس کی ویلیو شامل ہے، جو ڈیبگنگ کے مقاصد کے لیے دکھائے جاتے ہیں۔

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

کسی بھی وقت، ہم یا تو جان سکتے ہیں کہ گریٹنگ کیا ہے (کیونکہ ہم نے اسے بلاک چین سے پڑھا ہے) یا نہیں جانتے (کیونکہ ہمیں ابھی تک یہ موصول نہیں ہوئی ہے)۔ لہذا ایک ایسی قسم کا ہونا مفید ہے جو یا تو ایک اسٹرنگ ہو یا کچھ بھی نہ ہو۔

##### `Greeter` کمپونینٹ {#greeter-component}

```tsx
const Greeter = () => {
```

آخر کار، ہم کمپونینٹ کی وضاحت کرتے ہیں۔

```tsx
  const { chain } = useNetwork()
```

اس چین کے بارے میں معلومات جسے ہم استعمال کر رہے ہیں، [wagmi](https://wagmi.sh/react/hooks/useNetwork) کی بدولت۔
چونکہ یہ ایک ہک (`use...`) ہے، ہر بار جب یہ معلومات تبدیل ہوتی ہیں تو کمپونینٹ دوبارہ تیار ہوتا ہے۔

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter کانٹریکٹ کا ایڈریس، جو چین کے لحاظ سے مختلف ہوتا ہے (اور جو `undefined` ہوتا ہے اگر ہمارے پاس چین کی معلومات نہ ہوں یا ہم کسی ایسی چین پر ہوں جس میں وہ کانٹریکٹ نہ ہو)۔

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` ہک](https://wagmi.sh/react/api/hooks/useReadContract) ایک کانٹریکٹ سے معلومات پڑھتا ہے۔ آپ دیکھ سکتے ہیں کہ یہ UI میں `readResults` کو پھیلا کر کون سی معلومات واپس کرتا ہے۔ اس معاملے میں ہم چاہتے ہیں کہ یہ دیکھتا رہے تاکہ جب گریٹنگ تبدیل ہو تو ہمیں مطلع کیا جائے۔

**نوٹ:** ہم [`setGreeting` ایونٹس](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) کو سن سکتے ہیں یہ جاننے کے لیے کہ گریٹنگ کب تبدیل ہوتی ہے اور اس طرح اپ ڈیٹ کریں۔ تاہم، جب کہ یہ زیادہ موثر ہو سکتا ہے، یہ تمام معاملات میں لاگو نہیں ہوگا۔ جب یوزر ایک مختلف چین پر سوئچ کرتا ہے تو گریٹنگ بھی تبدیل ہو جاتی ہے، لیکن اس تبدیلی کے ساتھ کوئی ایونٹ نہیں ہوتا ہے۔ ہمارے پاس کوڈ کا ایک حصہ ایونٹس کو سن رہا ہوسکتا ہے اور دوسرا چین کی تبدیلیوں کی شناخت کے لیے، لیکن یہ صرف [`watch` پیرامیٹر](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) سیٹ کرنے سے زیادہ پیچیدہ ہوگا۔

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React کا [`useState` ہک](https://www.w3schools.com/react/react_usestate.asp) ہمیں ایک اسٹیٹ متغیر کی وضاحت کرنے دیتا ہے، جس کی ویلیو کمپونینٹ کی ایک رینڈرنگ سے دوسری رینڈرنگ تک برقرار رہتی ہے۔ ابتدائی ویلیو پیرامیٹر ہے، اس معاملے میں خالی اسٹرنگ ہے۔

`useState` ہک دو ویلیوز کے ساتھ ایک لسٹ واپس کرتا ہے:

1. اسٹیٹ متغیر کی موجودہ ویلیو۔
2. جب ضرورت ہو تو اسٹیٹ متغیر میں ترمیم کرنے کے لیے ایک فنکشن۔ چونکہ یہ ایک ہک ہے، ہر بار جب اسے کال کیا جاتا ہے تو کمپونینٹ دوبارہ رینڈر ہوتا ہے۔

اس معاملے میں، ہم نئی گریٹنگ کے لیے ایک اسٹیٹ متغیر استعمال کر رہے ہیں جسے یوزر سیٹ کرنا چاہتا ہے۔

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

یہ ایونٹ ہینڈلر اس وقت کے لیے ہے جب نئی گریٹنگ ان پٹ فیلڈ تبدیل ہوتی ہے۔ ٹائپ، [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)، یہ بتاتا ہے کہ یہ ایک HTML ان پٹ عنصر کی ویلیو کی تبدیلی کے لیے ہینڈلر ہے۔ `<HTMLInputElement>` حصہ استعمال کیا جاتا ہے کیونکہ یہ ایک [جینرک ٹائپ](https://www.w3schools.com/typescript/typescript_basic_generics.php) ہے۔

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

یہ کلائنٹ کے نقطہ نظر سے بلاک چین ٹرانزیکشن جمع کرنے کا عمل ہے:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) کا استعمال کرتے ہوئے بلاک چین میں ایک نوڈ کو ٹرانزیکشن بھیجیں۔
2. نوڈ سے جواب کا انتظار کریں۔
3. جب جواب موصول ہو جائے، تو یوزر سے والیٹ کے ذریعے ٹرانزیکشن پر دستخط کرنے کے لیے کہیں۔ یہ مرحلہ نوڈ کا جواب موصول ہونے کے بعد _ہونا_ چاہیے کیونکہ یوزر کو دستخط کرنے سے پہلے ٹرانزیکشن کی گیس کی لاگت دکھائی جاتی ہے۔
4. یوزر کے منظور کرنے کا انتظار کریں۔
5. ٹرانزیکشن کو دوبارہ بھیجیں، اس بار [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) کا استعمال کرتے ہوئے۔

مرحلہ 2 میں ممکنہ طور پر قابل توجہ وقت لگے گا، جس کے دوران یوزرس سوچیں گے کہ کیا ان کا کمانڈ واقعی یوزر انٹرفیس کو موصول ہوا ہے اور ان سے ابھی تک ٹرانزیکشن پر دستخط کرنے کے لیے کیوں نہیں کہا جا رہا ہے۔ یہ خراب یوزر تجربہ (UX) بناتا ہے۔

اس کا حل [prepare hooks](https://wagmi.sh/react/prepare-hooks) کا استعمال کرنا ہے۔ ہر بار جب کوئی پیرامیٹر تبدیل ہوتا ہے، تو فوری طور پر نوڈ کو `eth_estimateGas` کی درخواست بھیجیں۔ پھر، جب یوزر واقعی ٹرانزیکشن بھیجنا چاہتا ہے (اس معاملے میں **گریٹنگ اپ ڈیٹ کریں** دبا کر)، تو گیس کی لاگت معلوم ہوتی ہے اور یوزر فوری طور پر والیٹ کا صفحہ دیکھ سکتا ہے۔

```tsx
  return (
```

اب ہم آخر کار واپس کرنے کے لیے اصل HTML بنا سکتے ہیں۔

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

ایک `ShowGreeting` کمپونینٹ بنائیں (جس کی وضاحت نیچے کی گئی ہے)، لیکن صرف اس صورت میں جب گریٹنگ بلاک چین سے کامیابی کے ساتھ پڑھی گئی ہو۔

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

یہ ان پٹ ٹیکسٹ فیلڈ ہے جہاں یوزر ایک نئی گریٹنگ سیٹ کر سکتا ہے۔ ہر بار جب یوزر کوئی کی (key) دباتا ہے، ہم `greetingChange` کو کال کرتے ہیں جو `setNewGreeting` کو کال کرتا ہے۔ چونکہ `setNewGreeting` `useState` ہک سے آتا ہے، یہ `Greeter` کمپونینٹ کو دوبارہ رینڈر کرنے کا سبب بنتا ہے۔ اس کا مطلب یہ ہے کہ:

- ہمیں نئی گریٹنگ کی ویلیو رکھنے کے لیے `value` کی وضاحت کرنے کی ضرورت ہے، کیونکہ بصورت دیگر یہ ڈیفالٹ، یعنی خالی اسٹرنگ میں واپس آ جائے گی۔
- `usePrepareContractWrite` ہر بار جب `newGreeting` تبدیل ہوتا ہے تو کال کیا جاتا ہے، جس کا مطلب ہے کہ اس کے پاس ہمیشہ تیار ٹرانزیکشن میں تازہ ترین `newGreeting` ہوگا۔

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        گریٹنگ اپ ڈیٹ کریں
      </button>
```

اگر `workingTx.write` نہیں ہے تو ہم ابھی بھی گریٹنگ اپ ڈیٹ بھیجنے کے لیے ضروری معلومات کا انتظار کر رہے ہیں، لہذا بٹن غیر فعال ہے۔ اگر `workingTx.write` ویلیو ہے تو یہ ٹرانزیکشن بھیجنے کے لیے کال کرنے والا فنکشن ہے۔

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
```

آخر میں، یہ دیکھنے میں آپ کی مدد کرنے کے لیے کہ ہم کیا کر رہے ہیں، ان تین آبجیکٹس کو دکھائیں جن کا ہم استعمال کرتے ہیں:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` کمپونینٹ {#showgreeting-component}

یہ کمپونینٹ دکھاتا ہے

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

ایک کمپونینٹ فنکشن کمپونینٹ کی تمام صفات کے ساتھ ایک پیرامیٹر حاصل کرتا ہے۔

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` کمپونینٹ {#showobject-component}

معلومات کے مقاصد کے لیے، ہم اہم آبجیکٹس (`readResults` گریٹنگ پڑھنے کے لیے اور `preparedTx` اور `workingTx` ہمارے بنائے ہوئے ٹرانزیکشنز کے لیے) کو دکھانے کے لیے `ShowObject` کمپونینٹ کا استعمال کرتے ہیں۔

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

ہم UI کو تمام معلومات سے بے ترتیبی نہیں کرنا چاہتے، لہذا انہیں دیکھنے یا بند کرنے کو ممکن بنانے کے لیے، ہم [`details`](https://www.w3schools.com/tags/tag_details.asp) ٹیگ کا استعمال کرتے ہیں۔

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

زیادہ تر فیلڈز [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) کا استعمال کرتے ہوئے دکھائے جاتے ہیں۔

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          فنکشنز:
          <ul>
```

مستثنیٰ فنکشنز ہیں، جو [JSON معیار](https://www.json.org/json-en.html) کا حصہ نہیں ہیں، لہذا انہیں الگ سے دکھانا پڑتا ہے۔

```tsx
          {funs.map((f, i) =>
```

JSX کے اندر، `{` کرلی بریکٹ `}` کے اندر کوڈ کو JavaScript کے طور پر سمجھا جاتا ہے۔ پھر، `(` ریگولر بریکٹ `)` کے اندر کوڈ کو دوبارہ JSX کے طور پر سمجھا جاتا ہے۔

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React کو [DOM ٹری](https://www.w3schools.com/js/js_htmldom.asp) میں ٹیگز کے لیے الگ شناختی نشانات کی ضرورت ہوتی ہے۔ اس کا مطلب ہے کہ ایک ہی ٹیگ کے بچوں (اس معاملے میں، [غیر ترتیب شدہ فہرست](https://www.w3schools.com/tags/tag_ul.asp)) کو مختلف `key` صفات کی ضرورت ہوتی ہے۔

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

مختلف HTML ٹیگز کو ختم کریں۔

##### حتمی `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` کمپونینٹ وہ ہے جسے ہمیں ایپلی کیشن کے لیے ایکسپورٹ کرنے کی ضرورت ہے۔

#### `src/wagmi.ts` {#wagmi-ts}

آخر میں، WAGMI سے متعلق مختلف تعریفیں `src/wagmi.ts` میں ہیں۔ میں یہاں ہر چیز کی وضاحت نہیں کروں گا، کیونکہ اس کا زیادہ تر حصہ بوائلرپلیٹ ہے جسے آپ کو تبدیل کرنے کی ضرورت کا امکان نہیں ہے۔

یہاں کا کوڈ [github پر موجود](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) کوڈ جیسا بالکل نہیں ہے کیونکہ مضمون میں بعد میں ہم ایک اور چین ([Redstone Holesky](https://redstone.xyz/docs/network-info)) شامل کرتے ہیں۔

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

ان بلاک چینز کو امپورٹ کریں جن کو ایپلی کیشن سپورٹ کرتی ہے۔ آپ سپورٹڈ چینز کی فہرست [viem github میں](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) دیکھ سکتے ہیں۔

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) استعمال کرنے کے لیے آپ کو اپنی ایپلی کیشن کے لیے ایک پروجیکٹ آئی ڈی کی ضرورت ہے۔ آپ اسے [cloud.walletconnect.com پر](https://cloud.walletconnect.com/sign-in) حاصل کر سکتے ہیں۔

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### ایک اور بلاک چین شامل کرنا {#add-blockchain}

آج کل بہت سے [L2 اسکیلنگ سلوشن](/layer-2/) ہیں، اور آپ کچھ ایسے کو سپورٹ کرنا چاہ سکتے ہیں جنہیں viem ابھی تک سپورٹ نہیں کرتا ہے۔ ایسا کرنے کے لیے، آپ `src/wagmi.ts` میں ترمیم کریں۔ یہ ہدایات وضاحت کرتی ہیں کہ [Redstone Holesky](https://redstone.xyz/docs/network-info) کو کیسے شامل کیا جائے۔

1. viem سے `defineChain` ٹائپ امپورٹ کریں۔

   ```ts
   import { defineChain } from 'viem'
   ```

2. نیٹ ورک کی تعریف شامل کریں۔

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. نئی چین کو `configureChains` کال میں شامل کریں۔

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. یقینی بنائیں کہ ایپلی کیشن نئے نیٹ ورک پر آپ کے کانٹریکٹس کے لیے ایڈریس جانتی ہے۔ اس معاملے میں، ہم `src/components/Greeter.tsx` میں ترمیم کرتے ہیں:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## نتیجہ {#conclusion}

یقیناً، آپ واقعی `Greeter` کے لیے یوزر انٹرفیس فراہم کرنے کی پرواہ نہیں کرتے ہیں۔ آپ اپنے کانٹریکٹس کے لیے ایک یوزر انٹرفیس بنانا چاہتے ہیں۔ اپنی ایپلی کیشن بنانے کے لیے، ان مراحل کو چلائیں:

1. ایک wagmi ایپلی کیشن بنانے کے لیے متعین کریں۔

   ```sh copy
   pnpm create wagmi
   ```

2. ایپلی کیشن کا نام دیں۔

3. **React** فریم ورک منتخب کریں۔

4. **Vite** ویرینٹ منتخب کریں۔

5. آپ [Rainbow kit شامل کر سکتے ہیں](https://www.rainbowkit.com/docs/installation#manual-setup)۔

اب جائیں اور اپنے کانٹریکٹس کو وسیع دنیا کے لیے قابل استعمال بنائیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

