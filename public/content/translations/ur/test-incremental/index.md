---
title: "سمارٹ کنٹریکٹس بنانا اور تعینات کرنا"
description: "ایتھیریم نیٹ ورک پر سمارٹ کنٹریکٹس لکھنے، ٹیسٹ کرنے اور تعینات کرنے کے لیے ایک عملی گائیڈ۔"
image: /images/developers/smart-contracts-hero-v2.png
alt: "سمارٹ کنٹریکٹ کی تعیناتی کا خاکہ"
lang: ur
emoji: ":computer:"
summaryPoints:
  - ڈیولپمنٹ کا ماحول ترتیب دینے کا طریقہ سیکھیں
  - اپنا پہلا سمارٹ کنٹریکٹ لکھیں اور ٹیسٹ کریں
  - ٹیسٹ نیٹ پر تعینات کریں اور آن چین تصدیق کریں
---

سمارٹ کنٹریکٹس خود کار طریقے سے چلنے والے پروگرام ہیں جو ایتھیریم بلاک چین پر محفوظ ہوتے ہیں۔ ایک بار تعینات ہونے کے بعد، وہ بالکل اسی طرح چلتے ہیں جیسا کہ پروگرام کیا گیا ہو اور انہیں تبدیل نہیں کیا جا سکتا۔ یہ گائیڈ آپ کو اپنا پہلا کنٹریکٹ لکھنے سے لے کر اسے لائیو نیٹ ورک پر تعینات کرنے تک کے مکمل لائف سائیکل سے آگاہ کرتی ہے۔

## ڈیولپمنٹ کا ماحول {#development-environment}

کوئی بھی کوڈ لکھنے سے پہلے، آپ کو ایک مقامی ڈیولپمنٹ سیٹ اپ کی ضرورت ہے۔ اپنے فریم ورک کے طور پر [Hardhat](https://hardhat.org/) یا [Foundry](https://book.getfoundry.sh/) انسٹال کریں، ٹیسٹنگ کے لیے [Sepolia](https://sepolia.ethpandaops.io/) سے جڑیں، اور اپنی تعیناتیوں کی تصدیق کے لیے [Blockscout](https://eth.blockscout.com/) کا استعمال کریں۔

`solc` کمپائلر آپ کے Solidity سورس کوڈ کو بائٹ کوڈ میں تبدیل کرتا ہے جسے EVM چلا سکتا ہے۔ اس بات کو یقینی بنائیں کہ آپ کا کمپائلر ورژن آپ کے کنٹریکٹ میں موجود `pragma` اسٹیٹمنٹ سے میل کھاتا ہو۔

آپ اس کے بائٹ کوڈ اور تصدیق شدہ سورس کوڈ کا معائنہ کرنے کے لیے <a href="https://eth.blockscout.com/address/0x1234" target="_blank">Blockscout</a> پر تعینات شدہ کنٹریکٹ کو چیک کر سکتے ہیں۔

![Contract deployment flow](/images/developers/deploy-flow-v2.png)

## اپنا کنٹریکٹ لکھنا {#writing-your-contract}

### بنیادی ڈھانچہ {#basic-structure}

ہر Solidity کنٹریکٹ ایک ورژن پراگما اور کنٹریکٹ کے اعلان کے ساتھ شروع ہوتا ہے۔ یہاں ایک مختصر مثال ہے:

```solidity
// SPDX-License-Identifier: MIT
// مظاہرے کے لیے ایک سادہ سٹوریج کنٹریکٹ
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
```

### "گیس" کیا ہے اور یہ کیوں اہم ہے؟ {#what-is-gas}

EVM میں ہر آپریشن پر [گیس](/developers/docs/gas/) خرچ ہوتی ہے۔ ایک معیاری <span dir="ltr">ERC-20</span> منتقلی میں تقریباً <span dir="ltr">21,000</span> گیس یونٹس استعمال ہوتے ہیں، جبکہ ایک پیچیدہ غیر مرکزی مالیات (DeFi) کے تعامل میں <span dir="ltr">300,000</span> یا اس سے زیادہ خرچ ہو سکتے ہیں۔ کل لین دین کی فیس کا حساب <span dir="ltr">(base_fee + priority_fee) * gas_used</span> کے طور پر کیا جاتا ہے، جو Wei میں قابل ادائیگی ہے۔ مثال کے طور پر، <span dir="ltr">30 Gwei</span> کی بنیادی فیس اور <span dir="ltr">2 Gwei</span> ٹپ کے ساتھ <span dir="ltr">21,000</span> گیس استعمال کرنے والی منتقلی کی قیمت <span dir="ltr">(30 + 2) * 21,000 = 672,000 Gwei</span> ہوتی ہے۔ زیادہ پیچیدہ لاجک کا مطلب صارفین کے لیے زیادہ فیس ہے۔

<ExpandableCard title="How are gas fees calculated?" eventCategory="/test-incremental" eventName="clicked gas fees">

گیس کی فیس کا حساب `base_fee + priority_fee` کو استعمال شدہ گیس یونٹس سے ضرب دے کر کیا جاتا ہے۔ بنیادی فیس نیٹ ورک کے ہجوم کی بنیاد پر متحرک طور پر ایڈجسٹ ہوتی ہے، جبکہ ترجیحی فیس (ٹپ) توثیق کاروں کو آپ کی ٹرانزیکشن شامل کرنے کی ترغیب دیتی ہے۔ آپ [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator) جیسے ٹولز کا استعمال کر کے اخراجات کا تخمینہ لگا سکتے ہیں۔

</ExpandableCard>

## ٹیسٹنگ اور آٹومیشن {#testing}

### یونٹ ٹیسٹنگ {#unit-testing}

ہر پبلک فنکشن کے لیے یونٹ ٹیسٹ لکھیں۔ خودکار ٹیسٹنگ تعیناتی سے پہلے بگز کو پکڑ لیتی ہے اور مین نیٹ پر ناکام ٹرانزیکشنز سے ہونے والے گیس کے اخراجات کو بچاتی ہے۔

یہاں ایک Python ہیلپر اسکرپٹ ہے جو ٹیسٹ رپورٹنگ کو خودکار بناتا ہے:

```python
# اپنے کنٹریکٹس کے لیے ٹیسٹ کوریج رپورٹ تیار کریں {#best-practices}
import subprocess

def run_coverage(project_path):
    """ٹیسٹ کوریج چلائیں اور نتائج واپس کریں۔"""
    result = subprocess.run(
        ["npx", "hardhat", "coverage"],
        cwd=project_path,
        capture_output=True
    )
    return result.stdout.decode()
```

### بہترین طریقہ کار {#deployment}

## تعیناتی

## تعیناتی {#networks-and-tools}

### نیٹ ورکس اور ٹولز

آپ [Holesovice](https://holesovice.dev/) یا [Sepolia](https://sepolia.dev/) پر [Remix](https://remix.ethereum.org/) کا استعمال کرتے ہوئے کنٹریکٹس تعینات کر سکتے ہیں، اور [Blockscout](https://eth.blockscout.com/) پر سورس کوڈ کی تصدیق کر سکتے ہیں۔ پروڈکشن کی تعیناتیوں کے لیے، اس عمل کو خودکار بنانے کے لیے **Hardhat Ignition** یا **Foundry اسکرپٹس** استعمال کرنے پر غور کریں۔

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">فریم ورکس دریافت کریں</ButtonLink>

<YouTube id="def456uvw" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

مین نیٹ پر تعینات کرنے سے پہلے ہمیشہ اپنے کنٹریکٹس کا آڈٹ کریں۔ [OpenZeppelin Defender](https://www.openzeppelin.com/defender) جیسے ٹولز کا استعمال کریں اور [Trail of Bits](https://www.trailofbits.com/) یا [اوپن زیپلن](https://www.openzeppelin.com/security-audits) جیسی فرموں سے پیشہ ورانہ آڈٹ پر غور کریں۔

</InfoBanner>

### نیٹ ورکس اور ٹولز {#deployment-checklist}

آپ [Holesky](https://holesky.dev/) یا [Sepolia](https://sepolia.ethpandaops.io/) پر [Remix](https://remix.ethereum.org/) کا استعمال کرتے ہوئے کنٹریکٹس تعینات کر سکتے ہیں، اور [Blockscout](https://eth.blockscout.com/) پر سورس کوڈ کی تصدیق کر سکتے ہیں۔ پروڈکشن کی تعیناتیوں کے لیے، اس عمل کو خودکار بنانے کے لیے **Hardhat Ignition** یا **Foundry اسکرپٹس** استعمال کرنے پر غور کریں۔

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">فریم ورکس دریافت کریں</ButtonLink>

<YouTube id="abc123xyz" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

مین نیٹ پر تعینات کرنے سے پہلے ہمیشہ اپنے کنٹریکٹس کا آڈٹ کریں۔ [OpenZeppelin Defender](https://www.openzeppelin.com/defender) جیسے ٹولز کا استعمال کریں اور [Trail of Bits](https://www.trailofbits.com/) یا [اوپن زیپلن](https://www.openzeppelin.com/security-audits) جیسی فرموں سے پیشہ ورانہ آڈٹ پر غور کریں۔

</InfoBanner>

### تعیناتی کی چیک لسٹ {#community-resources}

| مرحلہ | ٹول | حیثیت |
| --- | --- | --- |
| کمپائل | `solc` یا [Hardhat](https://hardhat.org/docs) | درکار ہے |
| ٹیسٹ | [Foundry](https://book.getfoundry.sh/forge/tests) | درکار ہے |
| تعینات کریں | [Remix](https://remix.ethereum.org/) | اختیاری |
| تصدیق کریں | [Blockscout](https://eth.blockscout.com/) | تجویز کردہ |

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>کیا آپ اپنا پہلا کنٹریکٹ تعینات کرنے کے لیے تیار ہیں؟</div>
  <ButtonLink href="/developers/tutorials/hello-world-smart-contract/">
    ہمارے مرحلہ وار ٹیوٹوریل پر عمل کریں
  </ButtonLink>
</AlertContent>
</Alert>

## کمیونٹی کے وسائل {#further-reading}

گہری سمجھ کے لیے، [ایتھیریم وائٹ پیپر](/whitepaper/) دریافت کریں، [Solidity کی دستاویزات](https://docs.soliditylang.org/) کا جائزہ لیں، اور [اوپن زیپلن](https://www.openzeppelin.com/contracts) پر حقیقی دنیا کے کنٹریکٹس کا مطالعہ کریں۔

<CategoryAppsGrid category="developer-tools" />

## مزید مطالعہ

پروٹوکول کی سطح پر تبدیلیوں کی تجویز دینے سے پہلے آپ کو [وائٹ پیپر](/whitepaper/) بھی پڑھنا چاہیے، [یلو پیپر](https://ethereum.github.io/yellowpaper/paper.pdf) کا مطالعہ کرنا چاہیے، اور [EIPs](https://eips.ethereum.org/) کا جائزہ لینا چاہیے۔ لاگت کی تفصیلات کے لیے اوپر دی گئی [گیس کی وضاحت](#what-is-gas) دیکھیں۔

- ConsenSys کی جانب سے [سمارٹ کنٹریکٹ سیکیورٹی کے بہترین طریقہ کار](https://consensys.github.io/smart-contract-best-practices/)
- [ایتھیریم ڈیولپمنٹ کی دستاویزات](/developers/docs/)
- [EVM کو سمجھنا](/developers/docs/evm/) -- آپ کا کنٹریکٹ آن چین کیسے چلتا ہے