---
title: ⁦سمارٹ کنٹریکٹس کے ساتھ تعامل⁩
description: ⁦جانیں کہ ایتھیریم پر پہلے سے تعینات سمارٹ کنٹریکٹس سے کیسے پڑھا جائے اور ان میں کیسے لکھا جائے۔⁩
lang: ur
---

آپ کو ہمیشہ اپنا سمارٹ کنٹریکٹ لکھنے اور تعینات کرنے کی ضرورت نہیں ہوتی۔ ایک ڈویلپر کے طور پر زیادہ تر وقت، آپ ان سمارٹ کنٹریکٹس کے ساتھ تعامل کرنا چاہیں گے جو دوسروں نے پہلے ہی ایتھیریم نیٹ ورک پر تعینات کر رکھے ہیں۔

یہ صفحہ سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے دو بنیادی طریقوں—ڈیٹا **پڑھنا** اور ڈیٹا **لکھنا**—اور ان دونوں کاموں کے لیے درکار ٹولز کا احاطہ کرتا ہے۔

## پیشگی شرائط {#prerequisites}

آپ کو سمجھنا چاہیے:

- [سمارٹ کنٹریکٹس کیسے کام کرتے ہیں](/developers/docs/smart-contracts/)
- [ایتھیریم اکاؤنٹس اور وہ ٹرانزیکشنز پر کیسے دستخط کرتے ہیں](/developers/docs/accounts/)
- [ٹرانزیکشن کیا ہے](/developers/docs/transactions/)

## سمارٹ کنٹریکٹ کے ساتھ تعامل کے دو طریقے {#two-ways}

سمارٹ کنٹریکٹ کے ساتھ تعامل دو زمروں میں آتا ہے:

### کنٹریکٹ سے پڑھنا {#reading-from-a-contract}

پڑھنا ایک **مفت** عمل ہے جو کوئی ٹرانزیکشن نہیں بناتا اور بلاک چین پر کسی حالت کو تبدیل نہیں کرتا۔

جب آپ کسی کنٹریکٹ سے پڑھتے ہیں، تو آپ محض اس ڈیٹا کو تلاش کر رہے ہوتے ہیں جو پہلے سے موجود ہے۔ مثال کے طور پر:

- <span dir="ltr">ERC-20</span> ٹوکن بیلنس چیک کرنا
- ایک لامركزی ایکسچینج سے موجودہ قیمت پڑھنا
- کسی <span dir="ltr">NFT</span> کے مالک کا پتہ لگانا

چونکہ پڑھنے سے حالت تبدیل نہیں ہوتی، اس لیے ان پر [گیس](/developers/docs/gas/) خرچ نہیں ہوتی اور کوئی بھی شخص <span dir="ltr">ETH</span> کی ضرورت کے بغیر یہ عمل انجام دے سکتا ہے۔

### کنٹریکٹ میں لکھنا {#writing-to-a-contract}

لکھنا ایک **حالت تبدیل کرنے والا** عمل ہے جس کے لیے ٹرانزیکشن کی ضرورت ہوتی ہے اور اس پر گیس خرچ ہوتی ہے۔

جب آپ کسی کنٹریکٹ میں لکھتے ہیں، تو آپ ایک ایسا فنکشن متحرک کر رہے ہوتے ہیں جو بلاک چین کی حالت کو تبدیل کرتا ہے۔ مثال کے طور پر:

- ٹوکنز منتقل کرنا
- لامركزی ایکسچینج پر ٹوکنز کا تبادلہ کرنا
- <span dir="ltr">NFT</span> کی ڈھلائی

لکھنے کے لیے ہمیشہ درج ذیل کی ضرورت ہوتی ہے:

1. ایک [بیرونی ملکیت والا اکاؤنٹ (<span dir="ltr">EOA</span>)](/developers/docs/accounts/#types-of-account) جس میں گیس کے لیے کافی <span dir="ltr">ETH</span> ہو
2. اکاؤنٹ کی نجی کلید کے ذریعے دستخط شدہ ٹرانزیکشن
3. ٹرانزیکشن کا مائن ہونا اور بلاک میں شامل ہونا

[اکاؤنٹ کی تجرید](/roadmap/account-abstraction/) کے ساتھ، ایک سمارٹ کنٹریکٹ اکاؤنٹ بھی لکھنے کا عمل شروع کر سکتا ہے، اور ایک پے ماسٹر صارف کی جانب سے گیس ادا کر سکتا ہے—لہذا <span dir="ltr">ETH</span> رکھنے والے <span dir="ltr">EOA</span> کی سختی سے ضرورت نہیں ہے۔

## کنٹریکٹ کی <span dir="ltr">ABIs</span> کو سمجھنا {#understanding-contract-abis}

کسی سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، آپ کی ایپلی کیشن کو یہ جاننے کی ضرورت ہوتی ہے کہ کنٹریکٹ *کیا* کر سکتا ہے۔ یہیں پر **ایپلیکیشن بائنری انٹرفیس (<span dir="ltr">ABI</span>)** کام آتا ہے۔

ایک <span dir="ltr">ABI</span> ایک <span dir="ltr">JSON</span> دستاویز ہے جو درج ذیل کو بیان کرتی ہے:

- ہر وہ فنکشن جو کنٹریکٹ ظاہر کرتا ہے (نام، ان پٹس، آؤٹ پٹس)
- ہر وہ ایونٹ جو کنٹریکٹ خارج کر سکتا ہے
- کنٹریکٹ سے بات کرتے وقت ڈیٹا کو انکوڈ اور ڈیکوڈ کرنے کا طریقہ

<span dir="ltr">ABI</span> کو کنٹریکٹ کا ہدایت نامہ سمجھیں—اس کے بغیر، آپ کی ایپلی کیشن نہیں جانتی کہ کون سے فنکشنز موجود ہیں یا وہ کن پیرامیٹرز کی توقع کرتے ہیں۔

### کنٹریکٹ کی <span dir="ltr">ABI</span> کہاں سے تلاش کریں {#where-to-find-abis}

- **Etherscan پر تصدیق شدہ کنٹریکٹس** - [Etherscan](https://etherscan.io) تصدیق شدہ سورس کوڈ کے لیے خود بخود <span dir="ltr">ABI</span> ظاہر کرتا ہے
- **ڈویلپر کی طرف سے** - بہت سے پروجیکٹس اپنی <span dir="ltr">ABIs</span> کو اپنی دستاویزات یا <span dir="ltr">npm</span> پیکجز میں شائع کرتے ہیں
- **سورس سے تیار کریں** - اگر آپ کے پاس Solidity سورس کوڈ ہے، تو آپ <span dir="ltr">ABI</span> تیار کرنے کے لیے اسے [کمپائل](/developers/docs/smart-contracts/compiling/) کر سکتے ہیں

## کنٹریکٹس کے ساتھ تعامل کے لیے ٹولز اور لائبریریاں {#tools-and-libraries}

ڈویلپرز عام طور پر ویب ایپ، بیک اینڈ، یا سکرپٹ سے کنٹریکٹس کے ساتھ تعامل کرنے کے لیے JavaScript/TypeScript لائبریری کا استعمال کرتے ہیں۔

### کلائنٹ لائبریریاں (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - فرسٹ کلاس ٹائپ سیفٹی کے ساتھ ایتھیریم کے لیے جدید، ہلکا پھلکا TypeScript انٹرفیس
- **[ethers.js](https://docs.ethers.org/)** - ایتھیریم بلاک چین کے ساتھ تعامل کے لیے آزمودہ لائبریری
- **[web3.js](https://web3js.org/)** - اصل ایتھیریم JavaScript API

### بیک اینڈ لائبریریاں {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - سرور سائیڈ سکرپٹس اور بوٹس کے لیے Node.js میں بھی کام کرتی ہے
- **[web3.py](https://web3py.readthedocs.io/)** - ایتھیریم کے ساتھ تعامل کے لیے Python لائبریری
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - گو ایتھیریم (geth) ٹیم کی جانب سے آفیشل Go لائبریری

### مثال: Viem کے ساتھ ٹوکن بیلنس پڑھنا {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC کنٹریکٹ کا ایڈریس اور ABI (جزوی، balanceOf کے لیے)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC کے 6 اعشاریے ہیں
```

### مثال: ethers.js کے ساتھ ٹرانزیکشن بھیجنا {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 ٹرانسفر ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // ٹرانزیکشن کے مائن ہونے کا انتظار کریں
console.log(`Transferred! TX: ${tx.hash}`)
```

## ایونٹس اور لاگز {#events-and-logs}

سمارٹ کنٹریکٹس یہ اشارہ دینے کے لیے **ایونٹس** خارج کر سکتے ہیں کہ کچھ ہوا ہے۔ آپ کی ایپلی کیشن ریئل ٹائم میں ردعمل ظاہر کرنے کے لیے ان ایونٹس کو سن سکتی ہے۔

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC ٹرانسفر ایونٹس پر نظر رکھیں
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## ٹرانزیکشنز کی سیمولیشن {#simulating}

کوئی ٹرانزیکشن بھیجنے سے پہلے، آپ گیس خرچ کیے بغیر یہ چیک کرنے کے لیے اس کی **سیمولیشن** کر سکتے ہیں کہ آیا یہ کامیاب ہوگی—اور اس کی ریٹرن ویلیو دیکھنے کے لیے۔ یہ غلطیوں کو جلد پکڑنے اور نتائج کا پیشگی جائزہ لینے کے لیے مفید ہے۔

زیادہ تر کلائنٹ لائبریریاں `eth_call` کے ذریعے اس کی حمایت کرتی ہیں:

```ts
// Viem کے ساتھ
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## والیٹس اور دستخط کرنا {#wallets-and-signing}

ایک غیر مرکزی ایپلی کیشن (dapp) میں، صارف کا والیٹ (جیسے میٹاماسک، <span dir="ltr">Rainbow</span>، یا WalletConnect) دستخط کرنے کا کام سنبھالتا ہے۔ آپ براہ راست نجی کلیدوں کا انتظام نہیں کرتے۔

[والیٹ لائبریریاں اور کنکشن ٹولز](/developers/docs/apis/javascript/) اسے ایبسٹریکٹ (abstract) کر دیتے ہیں تاکہ آپ اپنی ایپلی کیشن کی منطق (logic) بنانے پر توجہ مرکوز کر سکیں۔

## متعلقہ ٹیوٹوریلز {#related-tutorials}

- [JavaScript سے سمارٹ کنٹریکٹ کو کال کرنا](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [web3.js اور Alchemy کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنا](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [اپنے والیٹ میں اپنا <span dir="ltr">NFT</span> کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/)

## مزید مطالعہ {#further-reading}

- [Viem کی دستاویزات: کنٹریکٹس سے پڑھنا اور ان میں لکھنا](https://viem.sh/docs/contract/readContract)
- [ethers.js کی دستاویزات: کنٹریکٹس](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI کی تفصیلات](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [<span dir="ltr">ABI</span> کیا ہے؟ - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## متعلقہ موضوعات {#related-topics}

- [سمارٹ کنٹریکٹس کی کمپائلنگ](/developers/docs/smart-contracts/compiling/)
- [سمارٹ کنٹریکٹس تعینات کرنا](/developers/docs/smart-contracts/deploying/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [بیک اینڈ APIs](/developers/docs/apis/backend/)