---
title: "گیس کی فیس کو سپانسر کرنا: اپنے صارفین کے لیے ٹرانزیکشن کے اخراجات کیسے پورے کریں"
description: نجی کلید اور پتہ بنانا آسان ہے؛ یہ صرف صحیح سافٹ ویئر چلانے کی بات ہے۔ لیکن دنیا میں بہت سی جگہیں ایسی ہیں جہاں ٹرانزیکشنز بھیجنے کے لیے ETH حاصل کرنا بہت مشکل ہے۔ اس ٹیوٹوریل میں آپ سیکھیں گے کہ اپنے سمارٹ کنٹریکٹ میں صارف کے دستخط شدہ، آف چین سٹرکچرڈ ڈیٹا کو چلانے کے لیے آن چین گیس کے اخراجات کیسے پورے کیے جائیں۔ آپ صارف سے ٹرانزیکشن کی معلومات پر مشتمل ایک سٹرکچر پر دستخط کرواتے ہیں، جسے پھر آپ کا آف چین کوڈ بلاک چین پر ایک ٹرانزیکشن کے طور پر جمع کرواتا ہے۔
author: اوری پومرانٹز
tags: ["گیس کے بغیر", "Solidity", "EIP-712", "میٹا ٹرانزیکشنز"]
skill: intermediate
breadcrumb: گیس کی سپانسرشپ
lang: ur
published: 2026-02-27
---

## تعارف {#introduction}

اگر ہم چاہتے ہیں کہ ایتھیریم [مزید ایک ارب لوگوں](https://blog.ethereum.org/category/next-billion) کی خدمت کرے، تو ہمیں رکاوٹوں کو دور کرنے اور اسے استعمال میں ہر ممکن حد تک آسان بنانے کی ضرورت ہے۔ اس رکاوٹ کی ایک وجہ گیس کی فیس ادا کرنے کے لیے <span dir="ltr">ETH</span> کی ضرورت ہے۔

اگر آپ کے پاس ایک غیر مرکزی ایپلی کیشن (dapp) ہے جو صارفین سے پیسے کماتی ہے، تو یہ مناسب ہو سکتا ہے کہ صارفین کو اپنے سرور کے ذریعے ٹرانزیکشنز جمع کروانے دیں اور ٹرانزیکشن کی فیس خود ادا کریں۔ چونکہ صارفین اب بھی اپنے والیٹس میں [<span dir="ltr">EIP-712</span> اجازت نامے کے پیغام](https://eips.ethereum.org/EIPS/eip-712) پر دستخط کرتے ہیں، اس لیے وہ ایتھیریم کی سالمیت کی ضمانتوں کو برقرار رکھتے ہیں۔ دستیابی اس سرور پر منحصر ہے جو ٹرانزیکشنز کو ریلے کرتا ہے، اس لیے یہ زیادہ محدود ہے۔ تاہم، آپ چیزوں کو اس طرح ترتیب دے سکتے ہیں کہ صارفین براہ راست سمارٹ کنٹریکٹ تک بھی رسائی حاصل کر سکیں (اگر انہیں <span dir="ltr">ETH</span> مل جائے)، اور دوسروں کو اپنے سرورز قائم کرنے دیں اگر وہ ٹرانزیکشنز کو سپانسر کرنا چاہتے ہیں۔

اس ٹیوٹوریل میں بتائی گئی تکنیک صرف اسی وقت کام کرتی ہے جب آپ سمارٹ کنٹریکٹ کو کنٹرول کرتے ہوں۔ دیگر تکنیکیں بھی ہیں، بشمول [اکاؤنٹ کی تجرید](https://eips.ethereum.org/EIPS/eip-4337) جو آپ کو دوسرے سمارٹ کنٹریکٹس کے لیے ٹرانزیکشنز کو سپانسر کرنے کی اجازت دیتی ہیں، جنہیں میں امید کرتا ہوں کہ مستقبل کے ٹیوٹوریل میں شامل کروں گا۔

نوٹ: یہ پروڈکشن لیول کا کوڈ _نہیں_ ہے۔ یہ اہم حملوں کا شکار ہو سکتا ہے اور اس میں بڑی خصوصیات کی کمی ہے۔ اس گائیڈ کے [کمزوریوں کے سیکشن](#vulnerabilities) میں مزید جانیں۔

### پیشگی شرائط {#prerequisites}

اس ٹیوٹوریل کو سمجھنے کے لیے آپ کو پہلے سے درج ذیل سے واقف ہونا چاہیے:

- Solidity
- JavaScript
- React اور WAGMI۔ اگر آپ ان یوزر انٹرفیس ٹولز سے واقف نہیں ہیں، تو [ہمارے پاس اس کے لیے ایک ٹیوٹوریل موجود ہے](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)۔

## نمونہ ایپلی کیشن {#sample-app}

یہاں نمونہ ایپلی کیشن Hardhat کے `Greeter` کنٹریکٹ کی ایک قسم ہے۔ آپ اسے [GitHub پر](https://github.com/qbzzt/260301-gasless) دیکھ سکتے ہیں۔ سمارٹ کنٹریکٹ پہلے ہی [Sepolia](https://sepolia.dev/) پر، پتہ [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA) پر تعینات کیا جا چکا ہے۔

اسے عملی طور پر دیکھنے کے لیے، ان اقدامات پر عمل کریں۔

1. ریپوزٹری کو کلون کریں اور ضروری سافٹ ویئر انسٹال کریں۔

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. `.env` میں ترمیم کریں تاکہ `PRIVATE_KEY` کو ایک ایسے والیٹ پر سیٹ کیا جا سکے جس میں Sepolia پر <span dir="ltr">ETH</span> موجود ہو۔ اگر آپ کو Sepolia <span dir="ltr">ETH</span> کی ضرورت ہے، تو [فوسٹ استعمال کریں](/developers/docs/networks/#sepolia)۔ مثالی طور پر، یہ نجی کلید اس کلید سے مختلف ہونی چاہیے جو آپ کے براؤزر والیٹ میں ہے۔

3. سرور شروع کریں۔

   ```sh
   npm run dev
   ```

4. [`http://localhost:5173`](http://localhost:5173) URL پر ایپلی کیشن کو براؤز کریں۔

5. والیٹ سے منسلک ہونے کے لیے **Connect with Injected** پر کلک کریں۔ والیٹ میں منظور کریں، اور اگر ضروری ہو تو Sepolia میں تبدیلی کو منظور کریں۔

6. ایک نیا سلام (greeting) لکھیں اور **Update greeting via sponsor** پر کلک کریں۔

7. پیغام پر دستخط کریں۔

8. تقریباً <span dir="ltr">12</span> سیکنڈ انتظار کریں (Sepolia پر بلاک کا وقت)۔ انتظار کے دوران آپ ٹرانزیکشن دیکھنے کے لیے سرور کے کنسول میں URL دیکھ سکتے ہیں۔

9. دیکھیں کہ سلام تبدیل ہو گیا ہے، اور آخری بار اپ ڈیٹ کرنے والے پتے کی ویلیو اب آپ کے براؤزر والیٹ کا پتہ ہے۔

یہ سمجھنے کے لیے کہ یہ کیسے کام کرتا ہے، ہمیں یہ دیکھنے کی ضرورت ہے کہ یوزر انٹرفیس میں پیغام کیسے بنتا ہے، سرور اسے کیسے ریلے کرتا ہے، اور سمارٹ کنٹریکٹ اس پر کیسے کارروائی کرتا ہے۔

### یوزر انٹرفیس {#ui-changes}

یوزر انٹرفیس [WAGMI](https://wagmi.sh/) پر مبنی ہے؛ آپ اس کے بارے میں [اس ٹیوٹوریل میں](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) پڑھ سکتے ہیں۔

یہاں بتایا گیا ہے کہ ہم پیغام پر کیسے دستخط کرتے ہیں:

```js
const signGreeting = useCallback(
```

React ہک [`useCallback`](https://react.dev/reference/react/useCallback) ہمیں اس وقت کارکردگی کو بہتر بنانے کی سہولت دیتا ہے جب جزو (component) کو دوبارہ ڈرا کیا جاتا ہے، اسی فنکشن کو دوبارہ استعمال کر کے۔

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

اگر کوئی اکاؤنٹ نہیں ہے، تو ایک ایرر (error) ظاہر کریں۔ ایسا کبھی نہیں ہونا چاہیے کیونکہ UI بٹن جو اس عمل کو شروع کرتا ہے جو `signGreeting` کو کال کرتا ہے، اس صورت میں غیر فعال ہوتا ہے۔ تاہم، مستقبل کے پروگرامرز اس حفاظتی اقدام کو ہٹا سکتے ہیں، اس لیے یہاں بھی اس شرط کو چیک کرنا ایک اچھا خیال ہے۔

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[ڈومین سیپریٹر](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) کے لیے پیرامیٹرز۔ یہ ویلیو مستقل (constant) ہے، اس لیے ایک بہتر آپٹمائزڈ عمل درآمد میں، ہم اسے ہر بار فنکشن کال ہونے پر دوبارہ گننے کے بجائے صرف ایک بار کیلکولیٹ کر سکتے ہیں۔

- `name` ایک صارف کے پڑھنے کے قابل نام ہے، جیسے کہ اس dapp کا نام جس کے لیے ہم دستخط تیار کر رہے ہیں۔
- `version` ورژن ہے۔ مختلف ورژنز ہم آہنگ (compatible) نہیں ہوتے۔
- `chainId` وہ چین ہے جسے ہم استعمال کر رہے ہیں، جیسا کہ [WAGMI کی طرف سے](https://wagmi.sh/react/api/hooks/useChainId) فراہم کیا گیا ہے۔
- `verifyingContract` وہ کنٹریکٹ کا پتہ ہے جو اس دستخط کی تصدیق کرے گا۔ ہم نہیں چاہتے کہ ایک ہی دستخط متعدد کنٹریکٹس پر لاگو ہو، اس صورت میں کہ کئی `Greeter` کنٹریکٹس ہوں اور ہم چاہتے ہوں کہ ان کے سلام مختلف ہوں۔

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

ڈیٹا کی قسم جس پر ہم دستخط کرتے ہیں۔ یہاں، ہمارے پاس ایک ہی پیرامیٹر ہے، `greeting`، لیکن حقیقی زندگی کے سسٹمز میں عام طور پر زیادہ ہوتے ہیں۔

```js
        const message = { greeting }
```

اصل پیغام جس پر ہم دستخط کرنا اور بھیجنا چاہتے ہیں۔ `greeting` فیلڈ کا نام بھی ہے اور اس متغیر (variable) کا نام بھی جو اسے بھرتا ہے۔

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

یہ فنکشن ایک واحد ہیکسا ڈیسیمل ویلیو واپس کرتا ہے۔ یہاں ہم اسے فیلڈز میں تقسیم کرتے ہیں۔

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

اگر ان میں سے کوئی بھی متغیر تبدیل ہوتا ہے، تو فنکشن کی ایک نئی مثال (instance) بنائیں۔ `account` اور `chainId` پیرامیٹرز کو صارف والیٹ میں تبدیل کر سکتا ہے۔ `contractAddr` چین Id کا ایک فنکشن ہے۔ `signTypedDataAsync` کو تبدیل نہیں ہونا چاہیے، لیکن ہم اسے [ایک ہک](https://wagmi.sh/react/api/hooks/useSignTypedData) سے امپورٹ کرتے ہیں، اس لیے ہم یقین سے نہیں کہہ سکتے، اور اسے یہاں شامل کرنا بہتر ہے۔

اب جب کہ نئے سلام پر دستخط ہو چکے ہیں، ہمیں اسے سرور پر بھیجنے کی ضرورت ہے۔

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

پہلے ہم ان درخواستوں کے لیے ایک ہینڈلر رجسٹر کرتے ہیں جنہیں ہم خود ہینڈل کرتے ہیں (`POST` سے `/server/sponsor` تک)۔ پھر ہم دیگر تمام URLs کو ہینڈل کرنے کے لیے ایک Vite سرور بناتے اور استعمال کرتے ہیں۔

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

### سمارٹ کنٹریکٹ {#smart-contract}

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

کنسٹرکٹر [ڈومین سیپریٹر](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) بناتا ہے، جو اوپر دیے گئے یوزر انٹرفیس کوڈ کی طرح ہے۔ بلاک چین پر عمل درآمد بہت زیادہ مہنگا ہے، اس لیے ہم اسے صرف ایک بار کیلکولیٹ کرتے ہیں۔

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

یہ وہ سٹرکچر ہے جس پر دستخط کیے جاتے ہیں۔ یہاں ہمارے پاس صرف ایک فیلڈ ہے۔

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

یہ [سٹرکچر شناخت کنندہ (identifier)](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct) ہے۔ اسے یوزر انٹرفیس میں ہر بار کیلکولیٹ کیا جاتا ہے۔

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

یہ فنکشن ایک دستخط شدہ درخواست وصول کرتا ہے اور سلام کو اپ ڈیٹ کرتا ہے۔

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

[<span dir="ltr">EIP 712</span>](https://eips.ethereum.org/EIPS/eip-712) کے مطابق ڈائجسٹ (digest) بنائیں۔

```solidity
        // دستخط کنندہ کو بازیافت کریں
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

دستخط کنندہ کا پتہ حاصل کرنے کے لیے [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) کا استعمال کریں۔ نوٹ کریں کہ ایک غلط دستخط کے نتیجے میں بھی ایک درست پتہ مل سکتا ہے، بس وہ ایک بے ترتیب (random) پتہ ہوگا۔

```solidity
        // گریٹنگ کو ایسے لاگو کریں جیسے دستخط کنندہ نے اسے کال کیا ہو
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

سلام کو اپ ڈیٹ کریں۔

## کمزوریاں {#vulnerabilities}

یہ پروڈکشن لیول کا کوڈ _نہیں_ ہے۔ یہ اہم حملوں کا شکار ہو سکتا ہے اور اس میں بڑی خصوصیات کی کمی ہے۔ یہاں کچھ کمزوریاں اور ان کو حل کرنے کا طریقہ بتایا گیا ہے۔

ان میں سے کچھ حملوں کو دیکھنے کے لیے، _Attacks_ ہیڈنگ کے نیچے موجود بٹنوں پر کلک کریں اور دیکھیں کہ کیا ہوتا ہے۔ **Invalid signature** بٹن کے لیے، ٹرانزیکشن کا جواب دیکھنے کے لیے سرور کنسول چیک کریں۔

### سرور پر ڈینائل آف سروس (Denial of service) {#dos-on-server}

سب سے آسان حملہ سرور پر [ڈینائل آف سروس (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) حملہ ہے۔ سرور انٹرنیٹ پر کہیں سے بھی درخواستیں وصول کرتا ہے اور ان درخواستوں کی بنیاد پر ٹرانزیکشنز بھیجتا ہے۔ حملہ آور کو درست یا غلط دستخطوں کا ایک گچھا جاری کرنے سے روکنے کے لیے بالکل کچھ نہیں ہے۔ ہر ایک کی وجہ سے ایک ٹرانزیکشن ہوگی۔ بالآخر سرور کے پاس گیس کی ادائیگی کے لیے <span dir="ltr">ETH</span> ختم ہو جائے گا۔

اس مسئلے کا ایک حل یہ ہے کہ شرح کو فی بلاک ایک ٹرانزیکشن تک محدود کر دیا جائے۔ اگر مقصد [بیرونی ملکیت والے اکاؤنٹس (externally owned accounts)](/developers/docs/accounts/#key-differences) کو سلام دکھانا ہے، تو اس سے کوئی فرق نہیں پڑتا کہ بلاک کے وسط میں سلام کیا ہے۔

ایک اور حل یہ ہے کہ پتوں کا ریکارڈ رکھا جائے اور صرف درست صارفین کے دستخطوں کی اجازت دی جائے۔

### غلط سلام کے دستخط {#wrong-greeting-sigs}

جب آپ **Signature for wrong greeting** پر کلک کرتے ہیں، تو آپ ایک مخصوص پتے (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) اور سلام (`Hello`) کے لیے ایک درست دستخط جمع کرواتے ہیں۔ لیکن یہ اسے ایک مختلف سلام کے ساتھ جمع کرواتا ہے۔ اس سے `ecrecover` الجھن کا شکار ہو جاتا ہے، جو سلام تو بدل دیتا ہے لیکن اس کا پتہ غلط ہوتا ہے۔

اس مسئلے کو حل کرنے کے لیے، پتے کو [دستخط شدہ سٹرکچر](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124) میں شامل کریں۔ اس طرح، `ecrecover` کا بے ترتیب پتہ دستخط میں موجود پتے سے میل نہیں کھائے گا، اور سمارٹ کنٹریکٹ پیغام کو مسترد کر دے گا۔

### ری پلے حملے (Replay attacks) {#replay-attack}

جب آپ **Replay attack** پر کلک کرتے ہیں، تو آپ وہی "میں <span dir="ltr">0xaA92c5d426430D4769c9E878C1333BDe3d689b3e</span> ہوں، اور میں چاہوں گا کہ سلام `Hello` ہو" والا دستخط جمع کرواتے ہیں، لیکن درست سلام کے ساتھ۔ نتیجے کے طور پر، سمارٹ کنٹریکٹ یہ سمجھتا ہے کہ پتے (جو آپ کا نہیں ہے) نے سلام کو واپس `Hello` میں تبدیل کر دیا ہے۔ ایسا کرنے کی معلومات [ٹرانزیکشن کی معلومات](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1) میں عوامی طور پر دستیاب ہے۔

اگر یہ ایک مسئلہ ہے، تو اس کا ایک حل [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) شامل کرنا ہے۔ پتوں اور نمبروں کے درمیان ایک [میپنگ (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) رکھیں، اور دستخط میں ایک نانس فیلڈ شامل کریں۔ اگر نانس فیلڈ پتے کی میپنگ سے میل کھاتی ہے، تو دستخط کو قبول کریں اور اگلی بار کے لیے میپنگ میں اضافہ کریں۔ اگر ایسا نہیں ہوتا، تو ٹرانزیکشن کو مسترد کر دیں۔

ایک اور حل یہ ہے کہ دستخط شدہ ڈیٹا میں ٹائم سٹیمپ (timestamp) شامل کیا جائے اور دستخط کو اس ٹائم سٹیمپ کے بعد صرف چند سیکنڈ کے لیے درست تسلیم کیا جائے۔ یہ آسان اور سستا ہے، لیکن ہمیں ٹائم ونڈو کے اندر ری پلے حملوں کا خطرہ ہوتا ہے، اور اگر ٹائم ونڈو سے تجاوز ہو جائے تو جائز ٹرانزیکشنز کی ناکامی کا خطرہ ہوتا ہے۔

## دیگر غائب خصوصیات {#other-missing-features}

کچھ اضافی خصوصیات ہیں جو ہم پروڈکشن سیٹنگ میں شامل کریں گے۔

### دوسرے سرورز سے رسائی {#other-servers}

فی الحال، ہم کسی بھی پتے کو `sponsorSetGreeting` جمع کروانے کی اجازت دیتے ہیں۔ لامرکزیت کے مفاد میں، یہ بالکل وہی ہو سکتا ہے جو ہم چاہتے ہیں۔ یا شاید ہم یہ یقینی بنانا چاہتے ہیں کہ سپانسر شدہ ٹرانزیکشنز _ہمارے_ سرور کے ذریعے جائیں، اس صورت میں ہم سمارٹ کنٹریکٹ میں `msg.sender` کو چیک کریں گے۔

بہر حال، یہ ایک شعوری ڈیزائن کا فیصلہ ہونا چاہیے، نہ کہ صرف اس مسئلے کے بارے میں نہ سوچنے کا نتیجہ۔

### ایرر ہینڈلنگ (Error handling) {#error-handling}

ایک صارف سلام جمع کرواتا ہے۔ ہو سکتا ہے کہ یہ اگلے بلاک پر اپ ڈیٹ ہو جائے۔ ہو سکتا ہے کہ نہ ہو۔ ایررز (Errors) پوشیدہ ہوتے ہیں۔ پروڈکشن سسٹم پر، صارف کو ان صورتوں کے درمیان فرق کرنے کے قابل ہونا چاہیے:

- نیا سلام ابھی تک جمع نہیں کروایا گیا ہے
- نیا سلام جمع کروا دیا گیا ہے، اور یہ عمل میں ہے
- نیا سلام مسترد کر دیا گیا ہے

## نتیجہ {#conclusion}

اس مقام پر، آپ کو کچھ مرکزیت (centralization) کی قیمت پر، اپنے dapp صارفین کے لیے گیس کے بغیر تجربہ بنانے کے قابل ہونا چاہیے۔

تاہم، یہ صرف ان سمارٹ کنٹریکٹس کے ساتھ کام کرتا ہے جو <span dir="ltr">ERC-712</span> کو سپورٹ کرتے ہیں۔ مثال کے طور پر، ایک <span dir="ltr">ERC-20</span> ٹوکن کی منتقلی کے لیے، یہ ضروری ہے کہ ٹرانزیکشن پر صرف ایک پیغام کے بجائے مالک کے دستخط ہوں۔ اس کا حل [اکاؤنٹ کی تجرید (<span dir="ltr">ERC-4337</span>)](https://docs.erc4337.io/index.html) ہے۔ مجھے امید ہے کہ میں مستقبل میں اس کے بارے میں ایک ٹیوٹوریل لکھوں گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔