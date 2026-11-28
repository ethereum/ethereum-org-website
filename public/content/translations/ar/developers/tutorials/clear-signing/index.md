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

كانت الخطوة الأخيرة في معظم استغلالات إيثيريوم الكبرى هي نفسها: مستخدم يوافق على معاملة لا يمكنه فهمها بشكل مفيد. تعرض محافظ الأجهزة بيانات الاستدعاء السداسية العشرية الخام، والأسوأ من ذلك أنها تجبرك على تشغيل التوقيع الأعمى. تعرض محافظ البرامج الحقول التي تم فك تشفيرها، ولكن فقط عندما تتعرف على العقد. عندما لا تتعرف عليه، سواء لأن البروتوكول جديد، أو التطبيق مخترق، أو الجهاز غير متصل بالإنترنت، يوقع المستخدمون بشكل أعمى.

يحدد [<span dir="ltr">ERC-7730</span>](https://eips.ethereum.org/EIPS/eip-7730) تنسيق <span dir="ltr">JSON</span> قياسيًا لوصف *معنى* استدعاءات دوال العقد الخاص بك.

تقرأ المحفظة التي تدعم <span dir="ltr">ERC-7730</span> الواصف الخاص بك وتعرض:

> **مبادلة**  
> إرسال: <span dir="ltr">1,000 USDC</span>  
> الحد الأدنى للاستلام: <span dir="ltr">0.42 WETH</span>  
> البروتوكول: <span dir="ltr">Uniswap V2</span>

أو جملة واحدة مبنية قابلة للقراءة من قبل البشر والوكلاء على حد سواء:

> مبادلة <span dir="ltr">1,000 USDC</span> مقابل <span dir="ltr">0.42 WETH</span> على الأقل

بدلاً من محدد الدالة وقائمة من القيم الصحيحة الخام.

هذا هو [التوقيع الواضح](https://clearsigning.org/) — "ما تراه هو ما توقعه". يرشدك هذا البرنامج التعليمي خلال كتابة واصف للعقد الخاص بك، والتحقق من صحته باستخدام أداة سطر الأوامر (<span dir="ltr">CLI</span>) الرسمية، وإرساله إلى السجل المفتوح.

## المتطلبات الأساسية {#prerequisites}

- الإلمام بلغة Solidity وواجهات التطبيق الثنائية (<span dir="ltr">ABI</span>) للعقود الذكية
- عقد ذكي منشور مع واجهة تطبيق ثنائية (<span dir="ltr">ABI</span>) تم التحقق منها (التحقق عبر [Sourcify](https://sourcify.dev) مطلوب قبل قبول الواصف في السجل)
- <span dir="ltr">Python 3.12</span> لأداة سطر الأوامر (<span dir="ltr">CLI</span>) الخاصة بالتحقق (الحزمة المثبتة `erc7730` لا يتم تثبيتها على <span dir="ltr">Python 3.13</span> أو أحدث). إذا كان إصدار Python في نظامك مختلفًا، فيمكن لـ [uv](https://docs.astral.sh/uv/) تنزيل وتشغيل <span dir="ltr">Python 3.12</span> نيابة عنك
- معرفة أساسية بـ <span dir="ltr">JSON</span>

## ما هو واصف ⁦<span dir="ltr">ERC-7730</span>⁩؟ {#what-is-an-erc-7730-descriptor}

الواصف هو ملف <span dir="ltr">JSON</span> واحد يتكون من ثلاثة أقسام:

| القسم | الغرض |
| :---- | :---- |
| `context` | يربط الواصف بعمليات نشر عقد محددة بواسطة معرف السلسلة والعنوان |
| `metadata` | يسمي المشروع ويحدد الثوابت القابلة لإعادة الاستخدام |
| `display` | يعين كل توقيع دالة إلى تسميات وتنسيقات حقول قابلة للقراءة البشرية |

نظرًا لأن الواصف منفصل عن العقد نفسه، يمكنك إضافة دعم التوقيع الواضح إلى أي بروتوكول حالي دون الحاجة إلى إعادة النشر. تسترد المحافظ الواصفات من السجل وتستخدمها في وقت التوقيع.

## الخطوة 1: إنشاء هيكل الملف {#step-1-create-the-file-skeleton}

قم بإنشاء ملف باسم `calldata-<ContractName>.json`، على سبيل المثال `calldata-SwapRouter.json`. تخبر البادئة `calldata-` السجل أن هذا الواصف يغطي استدعاءات دوال العقد، على عكس `eip712-` لرسائل البيانات المكتوبة. إذا كنت بحاجة إلى وصف عدة إصدارات من عقد، فقم بتضمين إصدار العقد في الاسم، كما هو الحال في `calldata-UniswapV3Router02.json` الخاص بالسجل.

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

يربط قسم `context` الواصف بعملية نشر عقد واحدة أو أكثر. تستخدم المحافظ هذا لمطابقة معاملة واردة بالواصف الصحيح.

```json
"context": {
  "$id": "example-swap-router",
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
- `deployments[].chainId` — معرف سلسلة EVM لعملية النشر. قم بتضمين كل سلسلة يتم نشر العقد الخاص بك عليها.
- `deployments[].address` — عنوان العقد الذي يجب أن تربطه المحافظ بهذا الواصف. هذا هو العنوان الذي يرسل إليه المستخدمون المعاملات فعليًا. إذا كان العقد الخاص بك قابلاً للترقية، فهذا هو عنوان الوكيل، وليس عنوان التنفيذ، بينما تأتي تواقيع الدوال في `display.formats` من واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) الخاصة بالتنفيذ.

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

يصف هذا المثال `swapExactTokensForTokens` من عقد `Router02` الخاص بـ Uniswap V2. الرمز المميز للإدخال هو العنصر الأول من `path`، والرمز المميز للإخراج هو العنصر الأخير (يمكن أن يحتوي `path` على أكثر من عنصرين لمبادلة متعددة القفزات).

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
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
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
- **`interpolatedIntent`** — **(موصى به)** قالب جملة أكثر ثراءً يدمج قيم الحقول المنسقة، مثل `"Swap {amountIn} for at least {amountOutMin}"`. قم بتضمين هذا بجانب `intent` لتوفير واصف أكثر سهولة في الاستخدام يمكن للمحافظ اختيار عرضه بشرط وجود أي قيود على العرض.
- **`fields`** — **(مطلوب)** القائمة المرتبة لحقول المعاملة التي يجب أن تعرضها المحافظ للمستخدمين.
  - **`path`** — **(مطلوب)** مرجع لبيانات المعاملة. يشير `#.fieldName` إلى معلمة بيانات الاستدعاء التي تم فك تشفيرها بالاسم في واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>). يشير `@.value` إلى قيمة ETH المرسلة مع المعاملة. تتم كتابة عناصر المصفوفة بـ `.` قبل الأقواس: `#.path.[0]` هو العنصر الأول و `#.path.[-1]` هو الأخير. يتم رفض `#.path[0]` (بدون النقطة) بواسطة أداة فحص الكود (linter).
  - **`label`** — **(مطلوب)** التسمية القابلة للقراءة البشرية المعروضة بجانب القيمة.
  - **`format`** — **(موصى به)** يتحكم في كيفية عرض القيمة. تشمل التنسيقات الشائعة:
    - `tokenAmount`
    - `addressName`
    - `date`

    استخدم `raw` عندما لا تكون هناك حاجة إلى تنسيق إضافي. تقبل بعض التنسيقات تكوين **`params`** إضافيًا. على سبيل المثال:

    - يمكن لـ `tokenAmount` استخدام `tokenPath` لتحديد عنوان الرمز المميز الذي يوفر الكسور العشرية والبيانات الوصفية للرمز.
    - يمكن لـ `date` استخدام `encoding` لوصف كيفية تشفير الطابع الزمني.

    إذا كان التنسيق المحدد لا يتطلب معلومات إضافية، فتجاهل `params`.

## الواصف الكامل {#the-complete-descriptor}

استبدل عناوين العناصر النائبة بعناوين العقد المنشور الخاص بك. تتحقق أداة فحص الكود (linter) من الواصف مقابل واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) التي تم التحقق منها في تلك العناوين، لذلك ستبلغ عن أخطاء حتى تقوم بذلك.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
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
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
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

[سجل <span dir="ltr">ERC-7730</span>](https://github.com/ethereum/clear-signing-erc7730-registry) هو مستودع مفتوح تستضيفه [مؤسسة إيثيريوم](/foundation/) كراعٍ محايد. لأي شخص الحرية في استنساخه واستضافته ذاتيًا — تقرر المحافظ بشكل مستقل مثيلات السجل التي تثق بها.

1. قم بعمل تفرع للمستودع على GitHub
2. قم بإنشاء مجلد في `registry/<your-project-name>/`
3. ضع ملفك بداخله: `registry/myproject/calldata-SwapRouter.json`
4. قم بتحديث حقل `$schema` إلى المسار النسبي المستخدم داخل المستودع: `"../../specs/erc7730-v2.schema.json"`. يرفض التكامل المستمر (<span dir="ltr">CI</span>) عنوان <span dir="ltr">URL</span> هنا.
5. أضف ملف اختبار (انظر أدناه)
6. تحقق من ملفاتك محليًا (انظر أدناه)
7. افتح طلب سحب. يمكن لكل طلب سحب تغيير مجلد واحد فقط ضمن `registry/`

### إضافة ملف اختبار {#add-a-test-file}

يحتاج كل واصف تضيفه أو تغيره إلى ملف اختبار، بحيث يمكن التحقق من تطبيقات التوقيع الواضح مقابله. قم بإنشاء `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` مع حالة اختبار واحدة على الأقل لكل دالة في `display.formats`. يستمد التكامل المستمر (<span dir="ltr">CI</span>) محدد الدالة لكل تنسيق ويفشل إذا لم تستدعه أي معاملة اختبار.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` هي المعاملة **غير الموقعة** المتسلسلة بالكامل (مختصرة هنا)، وليس فقط بيانات الاستدعاء. المعاملات الحقيقية للعقد الخاص بك هي أفضل حالات الاختبار.
- يوفر `dataProvider` البيانات الوصفية للرمز المميز (واختياريًا العنوان وأسماء ENS) بحيث لا تحتاج الاختبارات إلى الوصول إلى الشبكة.
- `expected` هو ما يجب أن تعرضه المحفظة. يعرض التكامل المستمر (<span dir="ltr">CI</span>) كل حالة اختبار مع تطبيقات التوقيع الواضح ويبلغ عن أي اختلافات في طلب السحب.

راجع [حالات الاختبار المرجعية](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) في الملف التمهيدي (<span dir="ltr">README</span>) للسجل للحصول على التنسيق الكامل، بما في ذلك ملفات الاختبار لواصفات <span dir="ltr">EIP-712</span>.

### التحقق محليًا {#validate-locally}

يتحقق السجل من الواصفات باستخدام أداة سطر الأوامر [`erc7730`](https://github.com/sourcifyeth/python-erc7730)، المثبتة في `.github/requirements.txt`. قم بتشغيلها من جذر التفرع الخاص بك، في بيئة <span dir="ltr">Python 3.12</span>:

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

إذا كنت تستخدم [uv](https://docs.astral.sh/uv/)، فيمكنك تخطي البيئة الافتراضية، وسيقوم uv بتنزيل <span dir="ltr">Python 3.12</span> إذا لزم الأمر:

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

تتحقق أداة فحص الكود (linter) من الواصف مقابل المخطط ومقابل واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>) التي تم التحقق منها للعقد الخاص بك. أصلح كل خطأ. تعني التحذيرات مثل `Missing display format` أن العقد يحتوي على دوال لا يصفها الواصف الخاص بك بعد. للتحقق أيضًا من مسارات `$schema` وملف الاختبار بالطريقة التي يقوم بها التكامل المستمر (<span dir="ltr">CI</span>)، راجع [كيفية التحقق](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) في الملف التمهيدي (<span dir="ltr">README</span>) للسجل.

عندما تفتح طلب السحب (<span dir="ltr">PR</span>)، يقوم التكامل المستمر (<span dir="ltr">CI</span>) تلقائيًا بتشغيل التحقق من المخطط، ويتحقق من أن تواقيع الدوال تنتج محددات صالحة، ويؤكد أنه تم التحقق من عنوان العقد على Sourcify، ويشير إلى تناقضات واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>). تظهر نتائج الفحص مضمنة في طلب السحب. يقوم مشرفو السجل بفحص عمليات الإرسال بحثًا عن واصفات مشوهة أو ضارة محتملة. الإدراج في السجل لا يعني التدقيق أو المصادقة.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**ملاحظة:** يجب التحقق من العقد الخاص بك على <a href="https://repo.sourcify.dev">Sourcify</a> قبل قبول طلب السحب (<span dir="ltr">PR</span>) الخاص بك. إذا لم يتم التحقق منه بعد، فقم بـ <a href="https://verify.sourcify.dev/">إرسال التحقق</a> أولاً.
</AlertDescription>
</AlertContent>
</Alert>

## ماذا يحدث بعد الدمج؟ {#what-happens-after-merging}

جميع الواصفات في السجل مفتوحة للمدققين. بعد دمج طلب السحب (<span dir="ltr">PR</span>) الخاص بك، يمكن لأي مدقق مراجعة الواصف الخاص بك ونشر تصديق تشفيري (بموجب [<span dir="ltr">ERC-8176</span>](https://eips.ethereum.org/EIPS/eip-8176)) يؤكد دقته. 

تتيح إشارات التصديق هذه للمحافظ تطبيق سياسات الثقة الخاصة بها — فالواصف الذي يحتوي على تصديقات مستقلة متعددة يحمل وزنًا أكبر من الواصف الذي لا يحتوي عليها. يمكنك الوصول إلى مجتمع المدققين من خلال [clearsigning.org](https://clearsigning.org).

تختار المحافظ السجل الذي ستدعمه. بمجرد وجود الواصف الخاص بك في السجل، ستبدأ المحافظ التي تدعم <span dir="ltr">ERC-7730</span> في جلبه إذا كان موجودًا في سجلها وستعرض بيانات قابلة للقراءة البشرية عندما يتفاعل المستخدمون مع العقد الخاص بك.

## قراءة إضافية {#further-reading}

- [مواصفات ⁦<span dir="ltr">ERC-7730</span>⁩](https://eips.ethereum.org/EIPS/eip-7730)  
- [سجل ⁦<span dir="ltr">ERC-7730</span>⁩](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — الأدوات، وحالة النظام البيئي، والحوكمة  
- [التحقق من العقود عبر Sourcify](https://sourcify.dev)  
- [مبادرة أمان التريليون دولار](https://trilliondollarsecurity.org)

