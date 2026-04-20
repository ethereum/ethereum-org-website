---
title: "اوپن سورس لائسنسنگ کو سمجھنا"
description: "مفت سافٹ ویئر لائسنسز اور باہمی ترقی کے لیے ایک عملی گائیڈ"
image: /images/open-source/hero-licensing-v2.png
alt: "مختلف لائسنس کی اقسام کو ظاہر کرنے والا خاکہ"
template: tutorial
lang: ur
published: 2025-06-15
tags: ["اوپن سورس", "لائسنسنگ", "تعمیل"]
summaryPoints:
  - اوپن سورس لائسنس اس بات کا تعین کرتے ہیں کہ کوڈ کو کیسے استعمال، تبدیل اور شیئر کیا جا سکتا ہے
  - کاپی لیفٹ لائسنس اس بات کا تقاضا کرتے ہیں کہ ماخوذ کام اوپن سورس رہیں
  - اجازت دینے والے لائسنس کم از کم پابندیوں کے ساتھ ملکیتی استعمال کی اجازت دیتے ہیں
---

# اوپن سورس لائسنسنگ کو سمجھنا {#understanding-open-source-licensing}

اوپن سورس سافٹ ویئر اس اصول پر بنایا گیا ہے کہ کوڈ کو آزادانہ طور پر شیئر کیا جانا چاہیے، اس کا مطالعہ کیا جانا چاہیے اور اسے بہتر بنایا جانا چاہیے۔ یہ گائیڈ بڑے لائسنس خاندانوں، ان کے درمیان انتخاب کرنے کے طریقے، اور باہمی ترقی کے لیے بہترین طریقوں کا احاطہ کرتی ہے۔

**یاد رکھیں: لائسنسنگ ایک قانونی معاملہ ہے۔ یہ گائیڈ تعلیمی ہے، قانونی مشورہ نہیں۔ اپنی مخصوص صورتحال کے لیے کسی مستند وکیل سے مشورہ کریں۔**

## اوپن سورس کیا ہے؟ {#what-is-open-source}

ایک سافٹ ویئر لائسنس اس بات کا تعین کرتا ہے کہ دوسرے آپ کے کوڈ کو کیسے استعمال، تبدیل اور تقسیم کر سکتے ہیں۔ اوپن سورس لائسنس ان حقوق کو واضح طور پر دیتے ہیں، ملکیتی لائسنسوں کے برعکس جو ان پر پابندی لگاتے ہیں۔

[اوپن سورس انیشی ایٹو (Open Source Initiative)](https://opensource.org/osd/annotated) سرکاری اوپن سورس تعریف کو برقرار رکھتا ہے، جس کا تقاضا ہے کہ لائسنس مفت دوبارہ تقسیم، سورس کوڈ تک رسائی، اور ماخوذ کاموں کی اجازت دیں۔

_واضح لائسنسنگ کے بغیر_، ہر پروجیکٹ کو حسب ضرورت قانونی جائزے کی ضرورت ہوگی۔ ریپوزٹری میں `LICENSE.md` فائل بالکل یہ بتاتی ہے کہ کون سی اجازتیں دی گئی ہیں، بالکل اسی طرح جیسے `README.md` فائل پروجیکٹ کا مقصد بیان کرتی ہے۔

آپ یہ سمجھنے کے لیے کہ یہ کس چیز کی اجازت دیتا ہے، <a href="https://choosealicense.com/?lang=en">Choose a License</a> پر کسی پروجیکٹ کے لائسنس کی تصدیق کر سکتے ہیں۔

![License comparison chart](/images/open-source/license-comparison-v2.png)

### چار آزادیاں {#the-four-freedoms}

[Free Software Foundation](https://www.fsf.org/about/what-is-free-software) چار ضروری آزادیوں کی وضاحت کرتی ہے:

- **آزادی 0**: کسی بھی مقصد کے لیے پروگرام چلانے کی آزادی
- **آزادی 1**: یہ مطالعہ کرنے کی آزادی کہ پروگرام کیسے کام کرتا ہے اور اسے اپنانے کی آزادی
- **آزادی 2**: کاپیاں دوبارہ تقسیم کرنے کی آزادی
- **آزادی 3**: پروگرام کو بہتر بنانے اور بہتری جاری کرنے کی آزادی

یہ چار آزادیاں پوری فری اینڈ اوپن سورس سافٹ ویئر (FOSS) تحریک کی فلسفیانہ بنیاد ہیں۔

<InfoBanner title="Key concept" description="Free as in freedom, not free as in price">

فری سافٹ ویئر میں لفظ "فری" سے مراد آزادی ہے، قیمت نہیں۔ ملکیتی سافٹ ویئر مفت ہو سکتا ہے، اور فری سافٹ ویئر تجارتی طور پر فروخت کیا جا سکتا ہے۔ تفصیلی وضاحت کے لیے [GNU philosophy](https://www.gnu.org/philosophy/free-sw.html) دیکھیں۔

</InfoBanner>
## لائسنس کا انتخاب کرنا {#choosing-a-license}

### کاپی لیفٹ لائسنسز {#copyleft-licenses}

`GPL-3.0` جیسے کاپی لیفٹ لائسنسز کا تقاضا ہے کہ ماخوذ کام ایک ہی لائسنس استعمال کریں۔ یہ یقینی بناتا ہے کہ سافٹ ویئر اور تمام ترامیم مفت رہیں۔ `AGPL-3.0` اس تقاضے کو نیٹ ورک پر رسائی حاصل کرنے والے سافٹ ویئر تک بڑھاتا ہے۔

```solidity
// SPDX-License-Identifier: GPL-3.0
// یہ کنٹریکٹ ایک بنیادی پروجیکٹ رجسٹری کو نافذ کرتا ہے
pragma solidity ^0.8.0;

contract ProjectRegistry {
  mapping(address => string) public projects;

  function register(string memory name) public {
    require(bytes(name).length > 0, "Project name cannot be empty");
    projects[msg.sender] = name;
  }
}
```

کاپی لیفٹ کا بنیادی فائدہ یہ ہے کہ بہتری کو کمیونٹی کے ساتھ واپس شیئر کیا جانا چاہیے۔ اگر کوئی آپ کی <span dir="ltr">GPL</span>-لائسنس یافتہ لائبریری پر کام کرتا ہے، تو ان کی ترامیم بھی <span dir="ltr">GPL</span>-لائسنس یافتہ ہوتی ہیں۔

<ExpandableCard title="When should I use copyleft?" contentPreview="Copyleft is ideal when you want to ensure derivatives stay open" eventCategory="/open-source/copyleft-guide">

کاپی لیفٹ کا استعمال کریں جب:

1. آپ یہ یقینی بنانا چاہتے ہیں کہ تمام ماخوذ کام اوپن سورس رہیں
2. آپ ایک لائبریری یا فریم ورک بنا رہے ہیں جسے دوسرے بڑھائیں گے
3. آپ اپنے کام کے ملکیتی فورکس کو روکنا چاہتے ہیں

اس کا نقصان یہ ہے کہ کچھ کمپنیاں لائسنس کی "وائرل" نوعیت کی وجہ سے کاپی لیفٹ-لائسنس یافتہ انحصار (dependencies) سے گریز کرتی ہیں۔

کاپی لیفٹ کی تعمیل کے بارے میں عام سوالات کے لیے <a href="https://www.gnu.org/licenses/gpl-faq.html#AllCompatibility">GPL FAQ</a> دیکھیں۔

</ExpandableCard>
### اجازت دینے والے لائسنس {#permissive-licenses}

`MIT` اور `Apache-2.0` جیسے اجازت دینے والے لائسنس ملکیتی ماخوذات کی اجازت دیتے ہیں۔ `BSD-2-Clause` کم سے کم پابندیوں کے ساتھ ایک اور مقبول اجازت دینے والا آپشن ہے۔

```python
### موازنہ جدول {#comparison-table}

| لائسنس | قسم | ماخوذ کام | پیٹنٹ گرانٹ |
|---------|------|-----------------|-------------|
| <span dir="ltr">GPL-3.0</span> | کاپی لیفٹ | <span dir="ltr">GPL</span> ہونا چاہیے | ہاں |
| <span dir="ltr">AGPL-3.0</span> | نیٹ ورک کاپی لیفٹ | <span dir="ltr">AGPL</span> ہونا چاہیے | ہاں |
| <span dir="ltr">LGPL-3.0</span> | کمزور کاپی لیفٹ | لائبریری ملکیتی ہو سکتی ہے | ہاں |
| <span dir="ltr">MIT</span> | اجازت دینے والا | کوئی بھی لائسنس | نہیں |
| <span dir="ltr">Apache-2.0</span> | اجازت دینے والا | کوئی بھی لائسنس | ہاں |
| <span dir="ltr">BSD-2-Clause</span> | اجازت دینے والا | کوئی بھی لائسنس | نہیں |
| <span dir="ltr">MPL-2.0</span> | فائل لیول کاپی لیفٹ | تبدیل شدہ فائلیں <span dir="ltr">MPL</span> ہونی چاہئیں | ہاں |

## کمیونٹی کا تعاون {#community-collaboration}

### پروجیکٹس میں حصہ ڈالنا {#how-to-contribute}

اوپن سورس میں حصہ ڈالنے کا آغاز پروجیکٹ کے ورک فلو کو سمجھنے سے ہوتا ہے۔ زیادہ تر پروجیکٹس کام کو مربوط کرنے کے لیے ایشو ٹریکرز اور تبدیلیاں تجویز کرنے کے لیے پل ریکوئسٹس کا استعمال کرتے ہیں۔

<ButtonLink href="/contributing/quick-start/">آج ہی حصہ ڈالنا شروع کریں</ButtonLink>

<DocLink href="/contributing/getting-started/">
  اس پروجیکٹ میں کیسے حصہ ڈالیں
</DocLink>

<DocLink href="/community/" className="featured">
  ہماری کمیونٹی میں شامل ہوں
</DocLink>

کوئی بھی حصہ ڈالنے سے پہلے، ہمیشہ گائیڈ لائنز کے لیے پروجیکٹ کی `CONTRIBUTING.md` فائل چیک کریں۔ کوڈ کا انداز، ٹیسٹ کی ضروریات، اور جائزے کے عمل پروجیکٹس کے درمیان مختلف ہوتے ہیں۔

```md
## پل ریکوئسٹ ٹیمپلیٹ

**تفصیل:** تبدیلیوں کا مختصر خلاصہ
**متعلقہ ایشو:** اس ایشو کا لنک جسے یہ حل کرتا ہے
**ٹیسٹنگ:** اس کا ٹیسٹ کیسے کیا گیا؟
```

### <Emoji text=":star:" size={1} className="me-2" /> کوڈ کے جائزے کے بہترین طریقے {#code-review}

باہمی پروجیکٹس میں معیار کو برقرار رکھنے کے لیے کوڈ کا جائزہ لینا ضروری ہے۔ جائزہ لینے والوں کو درستگی، انداز کی مستقل مزاجی، اور ممکنہ سیکیورٹی مسائل کی جانچ کرنی چاہیے۔

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  کوڈ کے اچھے جائزے صرف فارمیٹنگ پر نہیں بلکہ منطق اور ڈیزائن پر توجہ مرکوز کرتے ہیں۔ انداز کے نفاذ کے لیے لنٹرز جیسے خودکار ٹولز کا استعمال کریں، اور انسانی جائزے کو آرکیٹیکچرل فیصلوں اور غیر معمولی صورتحال (edge cases) کے لیے مخصوص رکھیں۔
</AlertDescription>
</AlertContent>
</Alert>

<QuizWidget quizKey="oss-licensing-v2" />


## دوہرا لائسنسنگ {#dual-licensing}

کچھ پروجیکٹس بیک وقت دو لائسنسوں کے تحت اپنا کوڈ پیش کرتے ہیں۔ یہ تجارتی صارفین کو ملکیتی لائسنس خریدنے کی اجازت دیتا ہے جبکہ اوپن سورس ورژن کو کاپی لیفٹ شرائط کے تحت دستیاب رکھتا ہے۔ [Qt](https://www.qt.io/licensing/) اور [MySQL](https://www.mysql.com/about/legal/licensing/) جیسے پروجیکٹس اس ماڈل کا استعمال کرتے ہیں۔
## تعمیل اور آڈیٹنگ {#compliance-and-auditing}

اوپن سورس سافٹ ویئر استعمال کرنے والی تنظیموں کو اپنے انحصار کو ٹریک کرنا چاہیے اور لائسنس کی تعمیل کو یقینی بنانا چاہیے<sup>1</sup>۔ [FOSSA](https://fossa.com/) اور [Snyk](https://snyk.io/) جیسے ٹولز اس عمل کو خودکار بنا سکتے ہیں۔

<CardGrid>
  <Card title="License Audit" description="Scan your project for license conflicts" href="/tools/license-audit/" />
  <Card title="SBOM Generator" description="Create a software bill of materials" href="/tools/sbom/" />
</CardGrid>

### لائسنس اسکیننگ {#license-scanning}

خودکار لائسنس اسکیننگ ہر <span dir="ltr">CI/CD</span> پائپ لائن کا حصہ ہونی چاہیے۔ یہ غیر مطابقت پذیر لائسنسوں کو آپ کے انحصار کے درخت (dependency tree) میں داخل ہونے سے پہلے پکڑ لیتی ہے۔

```bash
# اپنے پروجیکٹ پر لائسنس اسکین چلائیں
npx license-checker --production --json > licenses.json

# پروڈکشن کے انحصار میں کاپی لیفٹ لائسنس چیک کریں
npx license-checker --production --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;ISC"
```

انحصار کو اپ ڈیٹ رکھنے اور لائسنس کی تبدیلیوں کی نگرانی کے لیے <a href="https://docs.github.com/en/code-security/dependabot" target="_blank">Dependabot</a> استعمال کرنے پر غور کریں۔

```json
{
  "license-scan": {
    "production": true,
    "allowed": ["MIT", "Apache-2.0", "BSD-2-Clause"]
  }
}
```
### SBOM جنریشن {#sbom-generation}

ایک سافٹ ویئر بل آف میٹریلز (<span dir="ltr">SBOM</span>) آپ کے سافٹ ویئر کے تمام اجزاء کی فہرست بناتا ہے۔ <span dir="ltr">SBOM</span> تیار کرنا ریگولیٹری تعمیل کے لیے تیزی سے ضروری ہوتا جا رہا ہے، خاص طور پر سیکیورٹی کے لحاظ سے حساس صنعتوں میں۔

<YouTube id="spec-fixture-002" />

### کلیدی اصطلاحات {#key-terms}

<GlossaryDefinition term="open-source" />

<GlossaryDefinition term="copyleft" />

لائسنسنگ کے بارے میں <strong>باخبر فیصلے</strong> کرنے کے لیے ان اصطلاحات کو سمجھنا <em>ضروری</em> ہے۔

<Alert variant="info">
<Emoji text="📋" />
<div>

اضافی تعریفوں کے لیے مکمل [اصطلاحات کی فرہنگ](/glossary/) کا جائزہ لیں۔ یہ وسیلہ کمیونٹی کے ذریعے برقرار رکھا جاتا ہے اور اسے باقاعدگی سے اپ ڈیٹ کیا جاتا ہے۔

</div>
</Alert>

## مزید مطالعہ {#further-reading}

_یہ گائیڈ [اوپن سورس انیشی ایٹو](https://opensource.org/) اور [فری سافٹ ویئر فاؤنڈیشن](https://www.fsf.org/) کے مواد سے اخذ کی گئی ہے۔_

- [لائسنس گائیڈ کا انتخاب کریں](https://choosealicense.com/) - _آپ کے پروجیکٹ کے لیے صحیح لائسنس چننے میں مدد کرنے والا ایک سادہ ٹول_
- [SPDX لائسنس کی فہرست](https://spdx.org/licenses/) - _500 سے زیادہ اوپن سورس لائسنسوں کے لیے معیاری شناخت کنندگان_
- [اوپن سورس گائیڈ](https://opensource.guide/) - _پروجیکٹس چلانے اور ان میں حصہ ڈالنے کے لیے کمیونٹی کے زیر انتظام وسائل_
- [FOSSA](https://fossa.com/) پر تعمیل کی ٹولنگ - _خودکار لائسنس اسکیننگ اور انحصار کا انتظام_
