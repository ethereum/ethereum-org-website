---
title: "گیس فیس کو اسپانسر کرنا: اپنے صارفین کے لیے ٹرانزیکشن کے اخراجات کیسے پورے کریں"
description: "پرائیویٹ کلید اور ایڈریس بنانا آسان ہے؛ یہ صرف صحیح سافٹ ویئر چلانے کی بات ہے۔ لیکن دنیا میں بہت سی جگہیں ایسی ہیں جہاں ٹرانزیکشنز بھیجنے کے لیے ETH حاصل کرنا بہت مشکل ہے۔ اس ٹیوٹوریل میں آپ سیکھیں گے کہ اپنے اسمارٹ کانٹریکٹ میں صارف کے دستخط شدہ، آف چین اسٹرکچرڈ ڈیٹا کو چلانے کے لیے آن چین گیس کے اخراجات کو کیسے پورا کیا جائے۔ آپ صارف سے ٹرانزیکشن کی معلومات پر مشتمل ایک اسٹرکچر پر دستخط کرواتے ہیں، جسے آپ کا آف چین کوڈ پھر بلاک چین پر ایک ٹرانزیکشن کے طور پر جمع کراتا ہے۔"
author: "اوری پومرانٹز"
tags: ["gasless", "Solidity", "eip-712", "meta-transactions"]
skill: intermediate
breadcrumb: "گیس اسپانسرنگ"
lang: ur
published: 2026-02-27
---

## تعارف {#introduction}

اگر ہم چاہتے ہیں کہ Ethereum [مزید ایک ارب لوگوں](https://blog.ethereum.org/category/next-billion) کی خدمت کرے، تو ہمیں رکاوٹوں کو دور کرنے اور اسے استعمال میں ہر ممکن حد تک آسان بنانے کی ضرورت ہے۔ اس رکاوٹ کی ایک وجہ گیس فیس ادا کرنے کے لیے ETH کی ضرورت ہے۔

اگر آپ کے پاس ایک dapp ہے جو صارفین سے پیسے کماتی ہے، تو یہ مناسب ہو سکتا ہے کہ صارفین کو اپنے سرور کے ذریعے ٹرانزیکشنز جمع کرانے دیں اور ٹرانزیکشن فیس خود ادا کریں۔ چونکہ صارفین اب بھی اپنے والیٹس میں [EIP-712 اجازت نامے کے پیغام](https://eips.ethereum.org/EIPS/eip-712) پر دستخط کرتے ہیں، اس لیے وہ Ethereum کی سالمیت کی ضمانتوں کو برقرار رکھتے ہیں۔ دستیابی اس سرور پر منحصر ہے جو ٹرانزیکشنز کو ریلے کرتا ہے، اس لیے یہ زیادہ محدود ہے۔ تاہم، آپ چیزوں کو اس طرح ترتیب دے سکتے ہیں کہ صارفین براہ راست اسمارٹ کانٹریکٹ تک بھی رسائی حاصل کر سکیں (اگر انہیں ETH مل جائے)، اور دوسروں کو اپنے سرورز ترتیب دینے دیں اگر وہ ٹرانزیکشنز کو اسپانسر کرنا چاہتے ہیں۔

اس ٹیوٹوریل میں بتائی گئی تکنیک صرف اسی وقت کام کرتی ہے جب آپ اسمارٹ کانٹریکٹ کو کنٹرول کرتے ہیں۔ دیگر تکنیکیں بھی ہیں، بشمول [اکاؤنٹ ایبسٹریکشن (account abstraction)](https://eips.ethereum.org/EIPS/eip-4337) جو آپ کو دوسرے اسمارٹ کانٹریکٹس کے لیے ٹرانزیکشنز کو اسپانسر کرنے کی اجازت دیتی ہیں، جنہیں میں امید کرتا ہوں کہ مستقبل کے ٹیوٹوریل میں شامل کروں گا۔

نوٹ: یہ پروڈکشن لیول کا کوڈ _نہیں_ ہے۔ یہ اہم حملوں کا شکار ہو سکتا ہے اور اس میں بڑی خصوصیات کی کمی ہے۔ اس گائیڈ کے [کمزوریوں کے سیکشن](#vulnerabilities) میں مزید جانیں۔

### پیشگی شرائط {#prerequisites}

اس ٹیوٹوریل کو سمجھنے کے لیے آپ کو پہلے سے ان چیزوں سے واقف ہونا چاہیے:

- Solidity
- JavaScript
- React اور WAGMI۔ اگر آپ ان یوزر انٹرفیس ٹولز سے واقف نہیں ہیں، تو [ہمارے پاس اس کے لیے ایک ٹیوٹوریل موجود ہے](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)۔

## نمونہ ایپلی کیشن {#sample-app}

یہاں نمونہ ایپلی کیشن Hardhat کے `Greeter` کانٹریکٹ کی ایک قسم ہے۔ آپ اسے [GitHub پر](https://github.com/qbzzt/260301-gasless) دیکھ سکتے ہیں۔ اسمارٹ کانٹریکٹ پہلے ہی [Sepolia](https://sepolia.dev/) پر، ایڈریس [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA) پر تعینات (deploy) کیا جا چکا ہے۔

اسے عملی طور پر دیکھنے کے لیے، ان اقدامات پر عمل کریں۔

1. ریپوزٹری کو کلون کریں اور ضروری سافٹ ویئر انسٹال کریں۔

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. `.env` میں ترمیم کریں تاکہ `PRIVATE_KEY` کو ایک ایسے والیٹ پر سیٹ کیا جا سکے جس میں Sepolia پر ETH موجود ہو۔ اگر آپ کو Sepolia ETH کی ضرورت ہے، تو [فاسٹ (faucet) استعمال کریں](/developers/docs/networks/#sepolia)۔ مثالی طور پر، یہ پرائیویٹ کلید اس کلید سے مختلف ہونی چاہیے جو آپ کے براؤزر والیٹ میں ہے۔

3. سرور شروع کریں۔

   ```sh
   npm run dev
   ```

4. URL [`http://localhost:5173`](http://localhost:5173) پر ایپلی کیشن کو براؤز کریں۔

5. والیٹ سے منسلک ہونے کے لیے **Connect with Injected** پر کلک کریں۔ والیٹ میں منظور کریں، اور اگر ضروری ہو تو Sepolia میں تبدیلی کو منظور کریں۔

6. ایک نیا گریٹنگ (greeting) لکھیں اور **Update greeting via sponsor** پر کلک کریں۔

7. پیغام پر دستخط کریں۔

8. تقریباً 12 سیکنڈ انتظار کریں (Sepolia پر بلاک کا وقت)۔ انتظار کے دوران آپ ٹرانزیکشن دیکھنے کے لیے سرور کے کنسول میں URL دیکھ سکتے ہیں۔

9. دیکھیں کہ گریٹنگ تبدیل ہو گیا ہے، اور آخری بار اپ ڈیٹ کرنے والے ایڈریس کی ویلیو اب آپ کے براؤزر والیٹ کا ایڈریس ہے۔

یہ سمجھنے کے لیے کہ یہ کیسے کام کرتا ہے، ہمیں یہ دیکھنے کی ضرورت ہے کہ یوزر انٹرفیس میں پیغام کیسے بنتا ہے، سرور اسے کیسے ریلے کرتا ہے، اور اسمارٹ کانٹریکٹ اس پر کیسے کارروائی کرتا ہے۔

### یوزر انٹرفیس {#ui-changes}

یوزر انٹرفیس [WAGMI](https://wagmi.sh/) پر مبنی ہے؛ آپ اس کے بارے میں [اس ٹیوٹوریل میں](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) پڑھ سکتے ہیں۔

یہاں بتایا گیا ہے کہ ہم پیغام پر کیسے دستخط کرتے ہیں:

```js
const signGreeting = useCallback(
```

React ہک [`useCallback`](https://react.dev/reference/react/useCallback) ہمیں اس وقت کارکردگی کو بہتر بنانے کی سہولت دیتا ہے جب کمپوننٹ کو دوبارہ ڈرا کیا جاتا ہے، اسی فنکشن کو دوبارہ استعمال کر کے۔

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

اگر کوئی اکاؤنٹ نہیں ہے، تو ایک ایرر (error) ظاہر کریں۔ ایسا کبھی نہیں ہونا چاہیے کیونکہ UI بٹن جو اس عمل کو شروع کرتا ہے جو `signGreeting` کو کال کرتا ہے، اس صورت میں غیر فعال (disabled) ہوتا ہے۔ تاہم، مستقبل کے پروگرامرز اس حفاظتی اقدام کو ہٹا سکتے ہیں، اس لیے یہاں بھی اس شرط کو چیک کرنا ایک اچھا خیال ہے۔

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[ڈومین سیپریٹر (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) کے لیے پیرامیٹرز۔ یہ ویلیو مستقل (constant) ہے، لہذا ایک بہتر آپٹمائزڈ عمل درآمد میں، ہم اسے ہر بار فنکشن کال ہونے پر دوبارہ کیلکولیٹ کرنے کے بجائے صرف ایک بار کیلکولیٹ کر سکتے ہیں۔

- `name` ایک صارف کے پڑھنے کے قابل نام ہے، جیسے کہ اس dapp کا نام جس کے لیے ہم دستخط تیار کر رہے ہیں۔
- `version` ورژن ہے۔ مختلف ورژنز ہم آہنگ (compatible) نہیں ہوتے۔
- `chainId` وہ چین ہے جسے ہم استعمال کر رہے ہیں، جیسا کہ [WAGMI کی طرف سے](https://wagmi.sh/react/api/hooks/useChainId) فراہم کیا گیا ہے۔
- `verifyingContract` وہ کانٹریکٹ ایڈریس ہے جو اس دستخط کی تصدیق کرے گا۔ ہم نہیں چاہتے کہ ایک ہی دستخط متعدد کانٹریکٹس پر لاگو ہو، اس صورت میں کہ کئی `Greeter` کانٹریکٹس ہوں اور ہم چاہتے ہوں کہ ان کے گریٹنگز مختلف ہوں۔

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

ڈیٹا کی قسم جس پر ہم دستخط کرتے ہیں۔ یہاں، ہمارے پاس ایک ہی پیرامیٹر، `greeting` ہے، لیکن حقیقی زندگی کے سسٹمز میں عام طور پر زیادہ ہوتے ہیں۔

```js
        const message = { greeting }
```

اصل پیغام جس پر ہم دستخط کرنا اور بھیجنا چاہتے ہیں۔ `greeting` فیلڈ کا نام بھی ہے اور اس ویری ایبل کا نام بھی جو اسے پُر کرتا ہے۔

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

دراصل دستخط حاصل کریں۔ یہ فنکشن غیر مطابقت پذیر (asynchronous) ہے کیونکہ صارفین ڈیٹا پر دستخط کرنے میں (کمپیوٹر کے نقطہ نظر سے) کافی وقت لیتے ہیں۔

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

یہ فنکشن ایک واحد ہیکساڈیسیمل ویلیو واپس کرتا ہے۔ یہاں ہم اسے فیلڈز میں تقسیم کرتے ہیں۔

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

اگر ان میں سے کوئی بھی ویری ایبل تبدیل ہوتا ہے، تو فنکشن کی ایک نئی مثال (instance) بنائیں۔ `account` اور `chainId` پیرامیٹرز کو صارف والیٹ میں تبدیل کر سکتا ہے۔ `contractAddr` چین Id کا ایک فنکشن ہے۔ `signTypedDataAsync` کو تبدیل نہیں ہونا چاہیے، لیکن ہم اسے [ایک ہک (hook)](https://wagmi.sh/react/api/hooks/useSignTypedData) سے امپورٹ کرتے ہیں، اس لیے ہم یقین سے نہیں کہہ سکتے، اور اسے یہاں شامل کرنا بہتر ہے۔

اب جب کہ نئے گریٹنگ پر دستخط ہو چکے ہیں، ہمیں اسے سرور پر بھیجنے کی ضرورت ہے۔

```js
  const sponsoredGreeting = async () => {
    try {
```

یہ فنکشن ایک دستخط لیتا ہے اور اسے سرور پر بھیجتا ہے۔

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

اس سرور میں `/server/sponsor` پاتھ پر بھیجیں جہاں سے ہم آئے ہیں۔

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

معلومات کو JSON-encoded بھیجنے کے لیے `POST` کا استعمال کریں۔

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

جواب (response) آؤٹ پٹ کریں۔ پروڈکشن سسٹم پر ہم صارف کو بھی جواب دکھائیں گے۔

### سرور {#server}

مجھے اپنے فرنٹ اینڈ کے طور پر [Vite](https://vite.dev/) استعمال کرنا پسند ہے۔ یہ خود بخود React لائبریریوں کو پیش کرتا ہے اور فرنٹ اینڈ کوڈ تبدیل ہونے پر براؤزر کو اپ ڈیٹ کرتا ہے۔ تاہم، Vite میں بیک اینڈ ٹولنگ شامل نہیں ہے۔

اس کا حل [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js) میں ہے۔

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // باقی سب کچھ Vite کو سنبھالنے دیں
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

پہلے ہم ان درخواستوں کے لیے ایک ہینڈلر رجسٹر کرتے ہیں جنہیں ہم خود ہینڈل کرتے ہیں (`/server/sponsor` پر `POST`)۔ پھر ہم دیگر تمام URLs کو ہینڈل کرنے کے لیے ایک Vite سرور بناتے اور استعمال کرتے ہیں۔

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

یہ صرف ایک معیاری [viem](https://viem.sh/) بلاک چین کال ہے۔

### اسمارٹ کانٹریکٹ {#smart-contract}

آخر میں، [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) کو دستخط کی تصدیق کرنے کی ضرورت ہے۔

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

کنسٹرکٹر (constructor) اوپر دیے گئے یوزر انٹرفیس کوڈ کی طرح [ڈومین سیپریٹر](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) بناتا ہے۔ بلاک چین پر عمل درآمد بہت زیادہ مہنگا ہے، اس لیے ہم اسے صرف ایک بار کیلکولیٹ کرتے ہیں۔

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

یہ وہ اسٹرکچر ہے جس پر دستخط کیے جاتے ہیں۔ یہاں ہمارے پاس صرف ایک فیلڈ ہے۔

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

یہ [اسٹرکچر شناخت کنندہ (structure identifier)](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct) ہے۔ اسے یوزر انٹرفیس میں ہر بار کیلکولیٹ کیا جاتا ہے۔

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

یہ فنکشن ایک دستخط شدہ درخواست وصول کرتا ہے اور گریٹنگ کو اپ ڈیٹ کرتا ہے۔

```solidity
        // EIP-712 ڈائجسٹ کا حساب لگائیں
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

[EIP 712](https://eips.ethereum.org/EIPS/eip-712) کے مطابق ڈائجسٹ (digest) بنائیں۔

```solidity
        // دستخط کنندہ کو بازیافت کریں
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

دستخط کنندہ کا ایڈریس حاصل کرنے کے لیے [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) کا استعمال کریں۔ نوٹ کریں کہ ایک غلط دستخط کے نتیجے میں بھی ایک درست ایڈریس مل سکتا ہے، بس وہ ایک بے ترتیب (random) ایڈریس ہوگا۔

```solidity
        // گریٹنگ کو ایسے لاگو کریں جیسے دستخط کنندہ نے اسے کال کیا ہو
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

گریٹنگ کو اپ ڈیٹ کریں۔

## کمزوریاں {#vulnerabilities}

یہ پروڈکشن لیول کا کوڈ _نہیں_ ہے۔ یہ اہم حملوں کا شکار ہو سکتا ہے اور اس میں بڑی خصوصیات کی کمی ہے۔ یہاں کچھ کمزوریاں اور ان کو حل کرنے کے طریقے بتائے گئے ہیں۔

ان میں سے کچھ حملوں کو دیکھنے کے لیے، _Attacks_ ہیڈنگ کے نیچے موجود بٹنوں پر کلک کریں اور دیکھیں کہ کیا ہوتا ہے۔ **Invalid signature** بٹن کے لیے، ٹرانزیکشن کا جواب دیکھنے کے لیے سرور کنسول چیک کریں۔

### سرور پر ڈینائل آف سروس (Denial of service) {#dos-on-server}

سب سے آسان حملہ سرور پر [ڈینائل آف سروس (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) حملہ ہے۔ سرور انٹرنیٹ پر کہیں سے بھی درخواستیں وصول کرتا ہے اور ان درخواستوں کی بنیاد پر ٹرانزیکشنز بھیجتا ہے۔ حملہ آور کو درست یا غلط دستخطوں کا ایک گروپ جاری کرنے سے روکنے کے لیے بالکل کچھ نہیں ہے۔ ہر ایک کی وجہ سے ایک ٹرانزیکشن ہوگی۔ بالآخر سرور کے پاس گیس کی ادائیگی کے لیے ETH ختم ہو جائے گا۔

اس مسئلے کا ایک حل یہ ہے کہ شرح کو فی بلاک ایک ٹرانزیکشن تک محدود کر دیا جائے۔ اگر مقصد [بیرونی ملکیت والے اکاؤنٹس (externally owned accounts)](/developers/docs/accounts/#key-differences) کو گریٹنگز دکھانا ہے، تو اس سے کوئی فرق نہیں پڑتا کہ بلاک کے وسط میں گریٹنگ کیا ہے۔

ایک اور حل یہ ہے کہ ایڈریسز کا ٹریک رکھا جائے اور صرف درست صارفین کے دستخطوں کی اجازت دی جائے۔

### غلط گریٹنگ کے دستخط {#wrong-greeting-sigs}

جب آپ **Signature for wrong greeting** پر کلک کرتے ہیں، تو آپ ایک مخصوص ایڈریس (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) اور گریٹنگ (`Hello`) کے لیے ایک درست دستخط جمع کراتے ہیں۔ لیکن یہ اسے ایک مختلف گریٹنگ کے ساتھ جمع کراتا ہے۔ یہ `ecrecover` کو الجھا دیتا ہے، جو گریٹنگ کو تو تبدیل کر دیتا ہے لیکن اس کا ایڈریس غلط ہوتا ہے۔

اس مسئلے کو حل کرنے کے لیے، ایڈریس کو [دستخط شدہ اسٹرکچر](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124) میں شامل کریں۔ اس طرح، `ecrecover` کا بے ترتیب ایڈریس دستخط میں موجود ایڈریس سے میل نہیں کھائے گا، اور اسمارٹ کانٹریکٹ پیغام کو مسترد کر دے گا۔

### ری پلے حملے (Replay attacks) {#replay-attack}

جب آپ **Replay attack** پر کلک کرتے ہیں، تو آپ وہی "میں 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e ہوں، اور میں چاہوں گا کہ گریٹنگ `Hello` ہو" والا دستخط جمع کراتے ہیں، لیکن درست گریٹنگ کے ساتھ۔ نتیجے کے طور پر، اسمارٹ کانٹریکٹ یہ مان لیتا ہے کہ ایڈریس (جو آپ کا نہیں ہے) نے گریٹنگ کو واپس `Hello` میں تبدیل کر دیا ہے۔ ایسا کرنے کی معلومات [ٹرانزیکشن کی معلومات](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1) میں عوامی طور پر دستیاب ہے۔

اگر یہ ایک مسئلہ ہے، تو اس کا ایک حل [نونس (nonce)](https://en.wikipedia.org/wiki/Cryptographic_nonce) شامل کرنا ہے۔ ایڈریسز اور نمبرز کے درمیان ایک [میپنگ (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) رکھیں، اور دستخط میں ایک نونس فیلڈ شامل کریں۔ اگر نونس فیلڈ ایڈریس کی میپنگ سے میل کھاتی ہے، تو دستخط کو قبول کریں اور اگلی بار کے لیے میپنگ میں اضافہ (increment) کریں۔ اگر ایسا نہیں ہوتا ہے، تو ٹرانزیکشن کو مسترد کر دیں۔

ایک اور حل یہ ہے کہ دستخط شدہ ڈیٹا میں ٹائم اسٹیمپ (timestamp) شامل کیا جائے اور دستخط کو اس ٹائم اسٹیمپ کے بعد صرف چند سیکنڈ کے لیے درست تسلیم کیا جائے۔ یہ آسان اور سستا ہے، لیکن ہمیں ٹائم ونڈو کے اندر ری پلے حملوں کا خطرہ ہوتا ہے، اور اگر ٹائم ونڈو سے تجاوز کر جائے تو جائز ٹرانزیکشنز کی ناکامی کا خطرہ ہوتا ہے۔

## دیگر غائب خصوصیات {#other-missing-features}

کچھ اضافی خصوصیات ہیں جو ہم پروڈکشن سیٹنگ میں شامل کریں گے۔

### دوسرے سرورز سے رسائی {#other-servers}

فی الحال، ہم کسی بھی ایڈریس کو `sponsorSetGreeting` جمع کرانے کی اجازت دیتے ہیں۔ ڈی سینٹرلائزیشن کے مفاد میں، یہ بالکل وہی ہو سکتا ہے جو ہم چاہتے ہیں۔ یا شاید ہم یہ یقینی بنانا چاہتے ہیں کہ اسپانسر شدہ ٹرانزیکشنز _ہمارے_ سرور کے ذریعے ہی جائیں، اس صورت میں ہم اسمارٹ کانٹریکٹ میں `msg.sender` کو چیک کریں گے۔

دونوں صورتوں میں، یہ ایک شعوری ڈیزائن کا فیصلہ ہونا چاہیے، نہ کہ صرف اس مسئلے کے بارے میں نہ سوچنے کا نتیجہ۔

### ایرر ہینڈلنگ (Error handling) {#error-handling}

ایک صارف گریٹنگ جمع کراتا ہے۔ ہو سکتا ہے کہ یہ اگلے بلاک پر اپ ڈیٹ ہو جائے۔ ہو سکتا ہے کہ نہ ہو۔ ایررز (Errors) پوشیدہ ہوتے ہیں۔ پروڈکشن سسٹم پر، صارف کو ان صورتوں کے درمیان فرق کرنے کے قابل ہونا چاہیے:

- نیا گریٹنگ ابھی تک جمع نہیں کرایا گیا ہے
- نیا گریٹنگ جمع کرا دیا گیا ہے، اور یہ پروسیس میں ہے
- نیا گریٹنگ مسترد کر دیا گیا ہے

## نتیجہ {#conclusion}

اس مقام پر، آپ کو اپنے dapp صارفین کے لیے کچھ سینٹرلائزیشن کی قیمت پر گیس کے بغیر (gasless) تجربہ بنانے کے قابل ہونا چاہیے۔

تاہم، یہ صرف ان اسمارٹ کانٹریکٹس کے ساتھ کام کرتا ہے جو ERC-712 کو سپورٹ کرتے ہیں۔ مثال کے طور پر، ایک ERC-20 ٹوکن منتقل کرنے کے لیے، یہ ضروری ہے کہ ٹرانزیکشن پر صرف ایک پیغام کے بجائے مالک کے دستخط ہوں۔ اس کا حل [اکاؤنٹ ایبسٹریکشن (ERC-4337)](https://docs.erc4337.io/index.html) ہے۔ مجھے امید ہے کہ میں مستقبل میں اس کے بارے میں ایک ٹیوٹوریل لکھوں گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔