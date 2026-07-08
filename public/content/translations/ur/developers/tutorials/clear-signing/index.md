---
title: "⁦ERC-7730⁩ کے ساتھ اپنے پروٹوکول میں واضح دستخط کرنا شامل کریں"
description: "جانیں کہ ⁦ERC-7730⁩ ڈسکرپٹر کیسے لکھا جائے تاکہ آپ کے سمارٹ کنٹریکٹ کے تعاملات صارفین کے دستخط کرنے سے پہلے والیٹس میں انسانی پڑھنے کے قابل تفصیلات دکھائیں۔"
author: "ہیسٹر بروکمین"
lang: ur
tags: ["ERC-7730", "سیکیورٹی", "دستخط کرنا", "سمارٹ کنٹریکٹس", "والیٹس"]
skill: intermediate
breadcrumb: "واضح دستخط کرنا"
published: 2026-05-11
---

زیادہ تر بڑے ایتھیریم حملوں کا آخری مرحلہ ایک ہی تھا: ایک صارف ایسی ٹرانزیکشن کو منظور کرنا جسے وہ بامعنی طور پر سمجھ نہیں سکتا تھا۔ ہارڈویئر والیٹس خام ہیکس کال ڈیٹا دکھاتے ہیں، اور اس سے بھی بدتر یہ کہ آپ کو بلائنڈ سائننگ (اندھا دستخط) آن کرنے پر مجبور کرتے ہیں۔ سافٹ ویئر والیٹس ڈی کوڈ شدہ فیلڈز دکھاتے ہیں، لیکن صرف اس وقت جب وہ کنٹریکٹ کو پہچانتے ہوں۔ جب وہ ایسا نہیں کرتے، چاہے اس کی وجہ یہ ہو کہ پروٹوکول نیا ہے، ایپ سے سمجھوتہ کیا گیا ہے، یا ڈیوائس آف لائن ہے، تو صارفین اندھے دستخط کرتے ہیں۔

[<span dir="ltr">ERC-7730</span>](https://eips.ethereum.org/EIPS/eip-7730) ایک معیاری <span dir="ltr">JSON</span> فارمیٹ کی وضاحت کرتا ہے جو یہ بیان کرتا ہے کہ آپ کے کنٹریکٹ کی فنکشن کالز کا *مطلب* کیا ہے۔ 

ایک والیٹ جو <span dir="ltr">ERC-7730</span> کو سپورٹ کرتا ہے وہ آپ کا ڈسکرپٹر پڑھتا ہے اور دکھاتا ہے:

> **تبادلہ**  
> بھیجیں: <span dir="ltr">1,000 USDC</span>  
> کم از کم وصول کریں: <span dir="ltr">0.42 WETH</span>  
> پروٹوکول: یونی سویپ <span dir="ltr">V3</span>

یا ایک واحد تشکیل شدہ جملہ جو انسانوں اور ایجنٹس دونوں کے لیے پڑھنے کے قابل ہو:

> کم از کم <span dir="ltr">0.42 WETH</span> کے لیے <span dir="ltr">1,000 USDC</span> کا تبادلہ کریں

فنکشن سلیکٹر اور خام انٹیجر ویلیوز کی فہرست کے بجائے۔

یہ [واضح دستخط کرنا](https://clearsigning.org/) ہے — "جو آپ دیکھتے ہیں وہی آپ دستخط کرتے ہیں۔" یہ ٹیوٹوریل آپ کو اپنے کنٹریکٹ کے لیے ڈسکرپٹر لکھنے، اسے آفیشل <span dir="ltr">CLI</span> ٹول کے ساتھ درست ثابت کرنے، اور اسے اوپن رجسٹری میں جمع کرانے کے عمل سے گزارتا ہے۔

## پیشگی شرائط {#prerequisites}

- <span dir="ltr">Solidity</span> اور سمارٹ کنٹریکٹ <span dir="ltr">ABIs</span> سے واقفیت
- ایک تصدیق شدہ <span dir="ltr">ABI</span> کے ساتھ تعینات شدہ سمارٹ کنٹریکٹ (ڈسکرپٹر کو رجسٹری میں قبول کیے جانے سے پہلے [<span dir="ltr">Sourcify</span>](https://sourcify.dev) کی تصدیق درکار ہے) 
- توثیق کرنے والے <span dir="ltr">CLI</span> کے لیے <span dir="ltr">Python 3.12+</span> 
- <span dir="ltr">JSON</span> کا بنیادی علم

## <span dir="ltr">ERC-7730</span> ڈسکرپٹر کیا ہے؟ {#what-is-an-erc-7730-descriptor}

ڈسکرپٹر ایک واحد <span dir="ltr">JSON</span> فائل ہے جس کے تین حصے ہوتے ہیں:

| سیکشن | مقصد |
| :---- | :---- |
| `context` | ڈسکرپٹر کو چین <span dir="ltr">ID</span> اور پتہ کے ذریعے مخصوص کنٹریکٹ کی تعیناتیوں سے جوڑتا ہے |
| `metadata` | پروجیکٹ کا نام دیتا ہے اور دوبارہ استعمال کے قابل کنسٹنٹس کی وضاحت کرتا ہے |
| `display` | ہر فنکشن کے دستخط کو انسانی پڑھنے کے قابل لیبلز اور فیلڈ فارمیٹس سے میپ کرتا ہے |

چونکہ ڈسکرپٹر خود کنٹریکٹ سے الگ ہوتا ہے، اس لیے آپ دوبارہ تعیناتی کے بغیر کسی بھی موجودہ پروٹوکول میں واضح دستخط کرنے کی سپورٹ شامل کر سکتے ہیں۔ والیٹس رجسٹری سے ڈسکرپٹرز بازیافت کرتے ہیں اور انہیں دستخط کرنے کے وقت استعمال کرتے ہیں۔

## مرحلہ 1: فائل کا ڈھانچہ بنائیں {#step-1-create-the-file-skeleton}

`calldata-<contractname>-<descriptorversion>.json` کے نام سے ایک فائل بنائیں۔ `calldata-` کا سابقہ رجسٹری کو بتاتا ہے کہ یہ ڈسکرپٹر ٹائپ شدہ ڈیٹا پیغامات کے لیے `eip712-` کے برعکس، کنٹریکٹ کی فنکشن کالز کا احاطہ کرتا ہے۔ `descriptorversion` رجسٹری کو ڈسکرپٹر فائل کا ورژن بتاتا ہے، اگر کوئی ورژن فراہم نہ کیا جائے تو یہ بائی ڈیفالٹ <span dir="ltr">0</span> ہوتا ہے۔


```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## مرحلہ 2: سیاق و سباق کا سیکشن لکھیں {#step-2-write-the-context-section}

`context` سیکشن ڈسکرپٹر کو ایک یا زیادہ کنٹریکٹ کی تعیناتیوں سے جوڑتا ہے۔ والیٹس اسے آنے والی ٹرانزیکشن کو درست ڈسکرپٹر سے ملانے کے لیے استعمال کرتے ہیں۔

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### سیاق و سباق کی فیلڈز {#context-fields}

- `context.$id` — اس ڈسکرپٹر دستاویز یا تعیناتی کی کنفیگریشن کے لیے ایک منفرد شناخت کنندہ۔
- `contract.deployments` — تعیناتیوں کا وہ سیٹ جس پر یہ ڈسکرپٹر لاگو ہوتا ہے۔
- `deployments[].chainId` — تعیناتی کے لیے <span dir="ltr">EVM</span> چین <span dir="ltr">ID</span>۔ ہر اس چین کو شامل کریں جہاں آپ کا کنٹریکٹ تعینات ہے۔
- `deployments[].address` — وہ کنٹریکٹ پتہ جسے والیٹس کو اس ڈسکرپٹر کے ساتھ منسلک کرنا چاہیے۔ عمل درآمد کا وہ پتہ استعمال کریں جس میں ایگزیکیوشن لاجک موجود ہو۔

## مرحلہ 3: میٹا ڈیٹا کا سیکشن لکھیں {#step-3-write-the-metadata-section}

میٹا ڈیٹا کا سیکشن اس فائل کے ذریعے بیان کردہ پروجیکٹ اور کنٹریکٹ کے بارے میں انسانی پڑھنے کے قابل معلومات فراہم کرتا ہے۔ والیٹس اس معلومات کو دستخط کرنے کے دوران پروٹوکول کے نام، لنکس، اور دیگر سیاق و سباق کی تفصیلات دکھانے کے لیے استعمال کر سکتے ہیں۔

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### میٹا ڈیٹا کی فیلڈز {#metadata-fields}

- `owner` — وہ پروجیکٹ، پروٹوکول، تنظیم، یا مینٹینر جو اس ڈسکرپٹر کا ذمہ دار ہے۔
- `info.url` — ایک مستند پروجیکٹ یا دستاویزات کا <span dir="ltr">URL</span> جسے والیٹس اضافی سیاق و سباق کے لیے صارفین کو دکھا سکتے ہیں۔
- `contractName` — اس فائل کے ذریعے بیان کردہ کنٹریکٹ یا عمل درآمد کا نام، جو عام طور پر تصدیق شدہ سورس کوڈ یا <span dir="ltr">ABI</span> سے میل کھاتا ہے۔

اگر آپ کی <span dir="ltr">ERC-7730</span> فائل کسی <span dir="ltr">ERC-20</span> کنٹریکٹ کو بیان کرتی ہے، تو آپ کو ایک ٹوکن آبجیکٹ بھی شامل کرنا چاہیے۔ 

## مرحلہ 4: ڈسپلے فارمیٹس کا سیکشن لکھیں {#step-4-write-the-displayformats-section}

`display.formats` آبجیکٹ فنکشن کے دستخطوں کو انسانی پڑھنے کے قابل دستخط کرنے کی ہدایات سے میپ کرتا ہے۔ اس طرح والیٹس صارفین کو ٹرانزیکشن منظور کرنے سے پہلے آپ کا فنکشن دکھاتے ہیں!

ہر کلید ایک انسانی پڑھنے کے قابل <span dir="ltr">ABI</span> کا حصہ ہے — فنکشن کے دستخط جس میں پیرامیٹر کے نام اور پیرامیٹر کی اقسام بالکل اسی طرح شامل ہیں جیسے وہ آپ کے <span dir="ltr">ABI</span> میں ظاہر ہوتے ہیں۔


### مثال: ٹوکن کے تبادلہ کو بیان کرنا {#eg-describing-token-swap}

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}

```

### ڈسپلے کی فیلڈز {#display-fields}

- **`intent`** — **(ضروری)** کارروائی کی ایک مختصر، صارف دوست تفصیل، جیسے "تبادلہ"۔
- **`interpolatedIntent`** — **(تجویز کردہ)** ایک زیادہ جامع جملے کا ٹیمپلیٹ جو فارمیٹ شدہ فیلڈ ویلیوز کو شامل کرتا ہے، جیسے `"Swap {amountIn} for at least {amountOutMin}"`۔ اسے `intent` کے ساتھ شامل کریں تاکہ ایک اور بھی زیادہ صارف دوست ڈسکرپٹر فراہم کیا جا سکے جسے والیٹس کسی بھی ڈسپلے کی پابندیوں کے پیش نظر دکھانے کا انتخاب کر سکتے ہیں۔
- **`fields`** — **(ضروری)** ٹرانزیکشن فیلڈز کی ترتیب وار فہرست جو والیٹس کو صارفین کو دکھانی چاہیے۔
  - **`path`** — **(ضروری)** ٹرانزیکشن ڈیٹا کا حوالہ۔ `#.fieldName` <span dir="ltr">ABI</span> میں نام کے ذریعے ڈی کوڈ شدہ کال ڈیٹا پیرامیٹر کی طرف اشارہ کرتا ہے۔ `@.value` ٹرانزیکشن کے ساتھ بھیجی گئی <span dir="ltr">ETH</span> ویلیو کا حوالہ دیتا ہے۔
  - **`label`** — **(ضروری)** ویلیو کے ساتھ دکھایا جانے والا انسانی پڑھنے کے قابل لیبل۔
  - **`format`** — **(تجویز کردہ)** کنٹرول کرتا ہے کہ ویلیو کو کیسے پیش کیا جانا چاہیے۔ عام فارمیٹس میں شامل ہیں:
    - `tokenAmount`
    - `addressName`
    - `date`

    جب کسی اضافی فارمیٹنگ کی ضرورت نہ ہو تو `raw` استعمال کریں۔ کچھ فارمیٹس اضافی **`params`** کنفیگریشن قبول کرتے ہیں۔ مثال کے طور پر:

    - `tokenAmount` یہ شناخت کرنے کے لیے `tokenPath` استعمال کر سکتا ہے کہ کون سا ٹوکن پتہ ڈیسیملز اور ٹکر میٹا ڈیٹا فراہم کرتا ہے۔
    - `date` یہ بیان کرنے کے لیے `encoding` استعمال کر سکتا ہے کہ ٹائم اسٹیمپ کو کیسے انکوڈ کیا گیا ہے۔

    اگر منتخب کردہ فارمیٹ کو اضافی معلومات کی ضرورت نہیں ہے، تو `params` کو چھوڑ دیں۔

## مکمل ڈسکرپٹر {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## مرحلہ 5: رجسٹری میں جمع کرائیں {#step-5-submit-to-the-registry}

[<span dir="ltr">ERC-7730</span> رجسٹری](https://github.com/ethereum/clear-signing-erc7730-registry) ایک اوپن ریپوزٹری ہے جس کی میزبانی [ایتھیریم فاؤنڈیشن](/foundation/) ایک غیر جانبدار منتظم کے طور پر کرتی ہے۔ کوئی بھی اسے کلون کرنے اور خود میزبانی کرنے کے لیے آزاد ہے — والیٹس آزادانہ طور پر فیصلہ کرتے ہیں کہ وہ کن رجسٹری انسٹینسز پر بھروسہ کرتے ہیں۔

1. <span dir="ltr">GitHub</span> پر ریپوزٹری کو فورک کریں  
2. `registry/<your-project-name>/` پر ایک فولڈر بنائیں  
3. اپنی فائل کو اس کے اندر رکھیں: `registry/myproject/calldata-mycontract-0_0.json`  
4. `$schema` فیلڈ کو ریپو کے اندر استعمال ہونے والے متعلقہ پاتھ پر اپ ڈیٹ کریں: `"../../specs/erc7730-v2.schema.json"`  
5. ایک پل ریکوئسٹ (<span dir="ltr">pull request</span>) کھولیں

جب آپ <span dir="ltr">PR</span> کھولتے ہیں، تو <span dir="ltr">CI</span> خود بخود سکیما کی توثیق چلاتا ہے، چیک کرتا ہے کہ فنکشن کے دستخط درست سلیکٹرز تیار کرتے ہیں، تصدیق کرتا ہے کہ کنٹریکٹ کا پتہ <span dir="ltr">Sourcify</span> پر تصدیق شدہ ہے، اور <span dir="ltr">ABI</span> کی تضادات کی نشاندہی کرتا ہے۔ چیک کے نتائج <span dir="ltr">PR</span> پر ان لائن ظاہر ہوتے ہیں۔ رجسٹری کے منتظمین خراب یا ممکنہ طور پر نقصان دہ ڈسکرپٹرز کے لیے جمع کرائی گئی درخواستوں کی جانچ پڑتال کرتے ہیں۔ رجسٹری میں شمولیت کا مطلب آڈٹ یا توثیق نہیں ہے۔

<Alert variant="info">
<AlertContent>
<AlertDescription>
**نوٹ:** آپ کی <span dir="ltr">PR</span> قبول ہونے سے پہلے آپ کے کنٹریکٹ کی <a href="https://repo.sourcify.dev"><span dir="ltr">Sourcify</span></a> پر تصدیق ہونی چاہیے۔ اگر اس کی ابھی تک تصدیق نہیں ہوئی ہے، تو پہلے <a href="https://verify.sourcify.dev/">تصدیق جمع کرائیں</a>۔
</AlertDescription>
</AlertContent>
</Alert>

## ضم ہونے کے بعد کیا ہوتا ہے؟ {#what-happens-after-merging}

رجسٹری میں موجود تمام ڈسکرپٹرز آڈیٹرز کے لیے کھلے ہیں۔ آپ کی <span dir="ltr">PR</span> ضم ہونے کے بعد، کوئی بھی آڈیٹر آپ کے ڈسکرپٹر کا جائزہ لے سکتا ہے اور اس کی درستگی کی تصدیق کرتے ہوئے ایک کرپٹوگرافک تصدیق ([<span dir="ltr">ERC-8176</span>](https://github.com/ethereum/ERCs/pull/1576) کے تحت) شائع کر سکتا ہے۔ 

یہ تصدیقی سگنلز والیٹس کو اپنی خود کی اعتماد کی پالیسیاں لاگو کرنے دیتے ہیں — ایک ڈسکرپٹر جس میں متعدد آزاد تصدیقات ہوں، اس کی اہمیت اس ڈسکرپٹر سے زیادہ ہوتی ہے جس میں کوئی تصدیق نہ ہو۔ آپ [<span dir="ltr">clearsigning.org</span>](https://clearsigning.org) کے ذریعے آڈیٹر کمیونٹی تک پہنچ سکتے ہیں۔

والیٹس انتخاب کرتے ہیں کہ وہ کس رجسٹری کو سپورٹ کریں گے۔ ایک بار جب آپ کا ڈسکرپٹر رجسٹری میں آجاتا ہے، تو وہ والیٹس جو <span dir="ltr">ERC-7730</span> کو سپورٹ کرتے ہیں اسے بازیافت کرنا شروع کر دیں گے اگر یہ ان کی رجسٹری میں ہے اور جب صارفین آپ کے کنٹریکٹ کے ساتھ تعامل کریں گے تو انسانی پڑھنے کے قابل ڈیٹا دکھائیں گے۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">ERC-7730</span> کی تفصیلات](https://eips.ethereum.org/EIPS/eip-7730)  
- [<span dir="ltr">ERC-7730</span> رجسٹری](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [<span dir="ltr">clearsigning.org</span>](https://clearsigning.org) — ٹولنگ، ایکو سسٹم کی حیثیت، اور گورننس  
- [<span dir="ltr">Sourcify</span> کنٹریکٹ کی تصدیق](https://sourcify.dev)  
- [ٹریلین ڈالر سیکیورٹی اقدام](https://trilliondollarsecurity.org)