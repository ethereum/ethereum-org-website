---
title: "إضافة التوقيع الواضح إلى بروتوكولك باستخدام ⁦ERC-7730⁩"
description: "تعلم كيفية كتابة واصف ⁦ERC-7730⁩ بحيث تعرض تفاعلات العقد الذكي الخاص بك تفاصيل قابلة للقراءة البشرية في المحافظ قبل أن يقوم المستخدمون بالتوقيع."
author: "هيستر برويكمان"
lang: ar
tags: ["ERC-7730", "الأمان", "توقيع", "عقود ذكية", "محافظ"]
skill: intermediate
breadcrumb: "التوقيع الواضح"
published: 2026-05-11
---

كانت الخطوة الأخيرة في معظم اختراقات إيثيريوم الكبرى هي نفسها: مستخدم يوافق على معاملة لا يمكنه فهمها بشكل هادف. تعرض محافظ الأجهزة بيانات الاستدعاء (calldata) السداسية العشرية الخام، والأسوأ من ذلك أنها تجبرك على تفعيل التوقيع الأعمى. تعرض محافظ البرامج الحقول التي تم فك تشفيرها، ولكن فقط عندما تتعرف على العقد. وعندما لا تتعرف عليه، سواء لأن البروتوكول جديد، أو التطبيق مخترق، أو الجهاز غير متصل بالإنترنت، يقوم المستخدمون بالتوقيع بشكل أعمى.

يحدد [<span dir="ltr">ERC-7730</span>](https://eips.ethereum.org/EIPS/eip-7730) تنسيق <span dir="ltr">JSON</span> قياسيًا لوصف *معنى* استدعاءات دوال العقد الخاص بك. 

تقرأ المحفظة التي تدعم <span dir="ltr">ERC-7730</span> الواصف الخاص بك وتعرض:

> **مبادلة**  
> إرسال: <span dir="ltr">1,000 USDC</span>  
> الحد الأدنى للاستلام: <span dir="ltr">0.42 WETH</span>  
> البروتوكول: يونيسواب <span dir="ltr">V3</span>

أو جملة واحدة مركبة قابلة للقراءة من قبل البشر والوكلاء على حد سواء:

> مبادلة <span dir="ltr">1,000 USDC</span> مقابل <span dir="ltr">0.42 WETH</span> على الأقل

بدلاً من محدد الدالة وقائمة من القيم الصحيحة الخام.

هذا هو [التوقيع الواضح](https://clearsigning.org/) — "ما تراه هو ما توقعه". يرشدك هذا البرنامج التعليمي خلال كتابة واصف للعقد الخاص بك، والتحقق من صحته باستخدام أداة سطر الأوامر (<span dir="ltr">CLI</span>) الرسمية، وإرساله إلى السجل المفتوح.

## المتطلبات الأساسية {#prerequisites}

- الإلمام بلغة Solidity وواجهات التطبيق الثنائية (<span dir="ltr">ABI</span>) للعقود الذكية
- عقد ذكي منشور مع واجهة تطبيق ثنائية (<span dir="ltr">ABI</span>) تم التحقق منها (التحقق من [Sourcify](https://sourcify.dev) مطلوب قبل قبول الواصف في السجل) 
- <span dir="ltr">Python 3.12+</span> لأداة سطر الأوامر (<span dir="ltr">CLI</span>) الخاصة بالتحقق 
- معرفة أساسية بتنسيق <span dir="ltr">JSON</span>

## ما هو واصف ⁦<span dir="ltr">ERC-7730</span>⁩؟ {#what-is-an-erc-7730-descriptor}

الواصف هو ملف <span dir="ltr">JSON</span> واحد يتكون من ثلاثة أقسام:

| القسم | الغرض |
| :---- | :---- |
| `context` | يربط الواصف بعمليات نشر عقد محددة بواسطة معرف السلسلة والعنوان |
| `metadata` | يسمي المشروع ويحدد الثوابت القابلة لإعادة الاستخدام |
| `display` | يعين كل توقيع دالة إلى تسميات وتنسيقات حقول قابلة للقراءة البشرية |

نظرًا لأن الواصف منفصل عن العقد نفسه، يمكنك إضافة دعم التوقيع الواضح إلى أي بروتوكول حالي دون الحاجة إلى إعادة النشر. تسترد المحافظ الواصفات من السجل وتستخدمها في وقت التوقيع.

## الخطوة 1: إنشاء هيكل الملف {#step-1-create-the-file-skeleton}

قم بإنشاء ملف باسم `calldata-<contractname>-<descriptorversion>.json`. تخبر البادئة `calldata-` السجل أن هذا الواصف يغطي استدعاءات دوال العقد، على عكس `eip712-` لرسائل البيانات المكتوبة. يخبر `descriptorversion` السجل بإصدار ملف الواصف، وهو <span dir="ltr">0</span> افتراضيًا إذا لم يتم توفير إصدار.


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

## الخطوة 2: كتابة قسم السياق {#step-2-write-the-context-section}

يربط قسم `context` الواصف بعملية نشر عقد واحدة أو أكثر. تستخدم المحافظ هذا لمطابقة معاملة واردة مع الواصف الصحيح.

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

### حقول السياق {#context-fields}

- `context.$id` — معرف فريد لمستند الواصف هذا أو تكوين النشر.
- `contract.deployments` — مجموعة عمليات النشر التي ينطبق عليها هذا الواصف.
- `deployments[].chainId` — معرف سلسلة آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>) لعملية النشر. قم بتضمين كل سلسلة يتم نشر العقد الخاص بك عليها.
- `deployments[].address` — عنوان العقد الذي يجب أن تربطه المحافظ بهذا الواصف. استخدم عنوان التنفيذ الذي يحتوي على منطق التنفيذ.

## الخطوة 3: كتابة قسم البيانات الوصفية {#step-3-write-the-metadata-section}

يوفر قسم البيانات الوصفية معلومات قابلة للقراءة البشرية حول المشروع والعقد الموصوف في هذا الملف. قد تستخدم المحافظ هذه المعلومات لعرض أسماء البروتوكولات والروابط والتفاصيل السياقية الأخرى أثناء التوقيع.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### حقول البيانات الوصفية {#metadata-fields}

- `owner` — المشروع أو البروتوكول أو المؤسسة أو المشرف المسؤول عن هذا الواصف.
- `info.url` — عنوان <span dir="ltr">URL</span> أساسي للمشروع أو الوثائق قد تعرضه المحافظ للمستخدمين للحصول على سياق إضافي.
- `contractName` — اسم العقد أو التنفيذ الموصوف في هذا الملف، والذي يتطابق عادةً مع الكود المصدري الذي تم التحقق منه أو واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>).

إذا كان ملف <span dir="ltr">ERC-7730</span> الخاص بك يصف عقد <span dir="ltr">ERC-20</span>، فيجب عليك إضافة كائن رمز مميز أيضًا. 

## الخطوة 4: كتابة قسم تنسيقات العرض {#step-4-write-the-displayformats-section}

يعين كائن `display.formats` تواقيع الدوال إلى تعليمات توقيع قابلة للقراءة البشرية. هذه هي الطريقة التي تعرض بها المحافظ الدالة الخاصة بك للمستخدمين قبل أن يوافقوا على معاملة!

كل مفتاح عبارة عن جزء من واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) قابل للقراءة البشرية — توقيع الدالة بما في ذلك أسماء المعلمات وأنواعها تمامًا كما تظهر في واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) الخاصة بك.


### مثال: وصف مبادلة رمز مميز {#eg-describing-token-swap}

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

### حقول العرض {#display-fields}

- **`intent`** — **(مطلوب)** وصف قصير وسهل الاستخدام للإجراء، مثل "مبادلة".
- **`interpolatedIntent`** — **(موصى به)** قالب جملة أكثر ثراءً يدمج قيم الحقول المنسقة، مثل `"Swap {amountIn} for at least {amountOutMin}"`. قم بتضمين هذا بجانب `intent` لتوفير واصف أكثر سهولة في الاستخدام يمكن للمحافظ اختيار عرضه بناءً على أي قيود عرض.
- **`fields`** — **(مطلوب)** القائمة المرتبة لحقول المعاملة التي يجب أن تعرضها المحافظ للمستخدمين.
  - **`path`** — **(مطلوب)** إشارة إلى بيانات المعاملة. يشير `#.fieldName` إلى معلمة بيانات استدعاء (calldata) تم فك تشفيرها بالاسم الموجود في واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>). يشير `@.value` إلى قيمة <span dir="ltr">ETH</span> المرسلة مع المعاملة.
  - **`label`** — **(مطلوب)** التسمية القابلة للقراءة البشرية المعروضة بجانب القيمة.
  - **`format`** — **(موصى به)** يتحكم في كيفية عرض القيمة. تشمل التنسيقات الشائعة:
    - `tokenAmount`
    - `addressName`
    - `date`

    استخدم `raw` عندما لا تكون هناك حاجة إلى تنسيق إضافي. تقبل بعض التنسيقات تكوين **`params`** إضافي. على سبيل المثال:

    - يمكن لـ `tokenAmount` استخدام `tokenPath` لتحديد عنوان الرمز المميز الذي يوفر الخانات العشرية والبيانات الوصفية لرمز التداول.
    - يمكن لـ `date` استخدام `encoding` لوصف كيفية تشفير الطابع الزمني.

    إذا كان التنسيق المحدد لا يتطلب معلومات إضافية، فتجاهل `params`.

## الواصف الكامل {#the-complete-descriptor}

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

## الخطوة 5: الإرسال إلى السجل {#step-5-submit-to-the-registry}

يعد [سجل ⁦<span dir="ltr">ERC-7730</span>⁩](https://github.com/ethereum/clear-signing-erc7730-registry) مستودعًا مفتوحًا تستضيفه [مؤسسة إيثيريوم](/foundation/) كجهة راعية محايدة. يمكن لأي شخص استنساخه واستضافته ذاتيًا — وتقرر المحافظ بشكل مستقل مثيلات السجل التي تثق بها.

1. قم بعمل تفرع (Fork) للمستودع على <span dir="ltr">GitHub</span>  
2. قم بإنشاء مجلد في `registry/<your-project-name>/`  
3. ضع ملفك بداخله: `registry/myproject/calldata-mycontract-0_0.json`  
4. قم بتحديث حقل `$schema` إلى المسار النسبي المستخدم داخل المستودع: `"../../specs/erc7730-v2.schema.json"`  
5. افتح طلب سحب (Pull request)

عند فتح طلب السحب (<span dir="ltr">PR</span>)، يقوم التكامل المستمر (<span dir="ltr">CI</span>) تلقائيًا بتشغيل التحقق من صحة المخطط، ويتحقق من أن تواقيع الدوال تنتج محددات صالحة، ويؤكد أن عنوان العقد تم التحقق منه على Sourcify، ويشير إلى التناقضات في واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>). تظهر نتائج الفحص مضمنة في طلب السحب. يقوم مشرفو السجل بفحص عمليات الإرسال بحثًا عن الواصفات المشوهة أو التي يحتمل أن تكون ضارة. الإدراج في السجل لا يعني التدقيق أو المصادقة.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**ملاحظة:** يجب التحقق من العقد الخاص بك على <a href="https://repo.sourcify.dev">Sourcify</a> قبل قبول طلب السحب (<span dir="ltr">PR</span>) الخاص بك. إذا لم يتم التحقق منه بعد، <a href="https://verify.sourcify.dev/">أرسل طلب التحقق</a> أولاً.
</AlertDescription>
</AlertContent>
</Alert>

## ماذا يحدث بعد الدمج؟ {#what-happens-after-merging}

جميع الواصفات في السجل مفتوحة للمدققين. بعد دمج طلب السحب (<span dir="ltr">PR</span>) الخاص بك، يمكن لأي مدقق مراجعة الواصف الخاص بك ونشر تصديق تشفيري (بموجب [<span dir="ltr">ERC-8176</span>](https://github.com/ethereum/ERCs/pull/1576)) يؤكد دقته. 

تتيح إشارات التصديق هذه للمحافظ تطبيق سياسات الثقة الخاصة بها — فالواصف الذي يحتوي على تصديقات مستقلة متعددة يحمل وزنًا أكبر من الواصف الذي لا يحتوي عليها. يمكنك الوصول إلى مجتمع المدققين من خلال [clearsigning.org](https://clearsigning.org).

تختار المحافظ السجل الذي ستدعمه. بمجرد وجود الواصف الخاص بك في السجل، ستبدأ المحافظ التي تدعم <span dir="ltr">ERC-7730</span> في جلبه إذا كان موجودًا في سجلها وستعرض بيانات قابلة للقراءة البشرية عندما يتفاعل المستخدمون مع العقد الخاص بك.

## قراءة إضافية {#further-reading}

- [مواصفات ⁦<span dir="ltr">ERC-7730</span>⁩](https://eips.ethereum.org/EIPS/eip-7730)  
- [سجل ⁦<span dir="ltr">ERC-7730</span>⁩](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — الأدوات، وحالة النظام البيئي، والحوكمة  
- [التحقق من العقود عبر Sourcify](https://sourcify.dev)  
- [مبادرة أمان التريليون دولار](https://trilliondollarsecurity.org)