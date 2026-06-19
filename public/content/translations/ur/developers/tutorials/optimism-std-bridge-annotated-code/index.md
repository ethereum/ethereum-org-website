---
title: "آپٹیمزم کے معیاری پل کے کنٹریکٹ کا تفصیلی جائزہ"
description: "آپٹیمزم کا معیاری پل کیسے کام کرتا ہے؟ اور یہ اس طرح کیوں کام کرتا ہے؟"
author: "اوری پومرانٹز"
tags: ["Solidity", "پل", "لیئر ۲"]
skill: intermediate
breadcrumb: "آپٹیمزم پل"
published: 2022-03-30
lang: ur
---

[آپٹیمزم](https://www.optimism.io/) ایک [آپٹمسٹک رول اپ](/developers/docs/scaling/optimistic-rollups/) ہے۔
آپٹمسٹک رول اپس ایتھیریم مین نیٹ (جسے لیئر ۱ (l1) بھی کہا جاتا ہے) کی نسبت بہت کم قیمت پر ٹرانزیکشنز پر کارروائی کر سکتے ہیں کیونکہ ٹرانزیکشنز پر نیٹ ورک کے ہر نوڈ کے بجائے صرف چند نوڈز کے ذریعے کارروائی کی جاتی ہے۔
اس کے ساتھ ہی، تمام ڈیٹا لیئر ۱ (l1) پر لکھا جاتا ہے تاکہ مین نیٹ کی سالمیت اور دستیابی کی تمام ضمانتوں کے ساتھ ہر چیز کو ثابت اور دوبارہ تشکیل دیا جا سکے۔

آپٹیمزم (یا کسی دوسری لیئر ۲ (l2)) پر لیئر ۱ (l1) کے اثاثے استعمال کرنے کے لیے، اثاثوں کو [پل](/bridges/#prerequisites) کرنے کی ضرورت ہوتی ہے۔
اسے حاصل کرنے کا ایک طریقہ یہ ہے کہ صارفین لیئر ۱ (l1) پر اثاثوں (جن میں <span dir="ltr">ETH</span> اور [<span dir="ltr">ERC-20</span> ٹوکنز](/developers/docs/standards/tokens/erc-20/) سب سے عام ہیں) کو مقفل کریں، اور لیئر ۲ (l2) پر استعمال کرنے کے لیے مساوی اثاثے حاصل کریں۔
بالآخر، جس کے پاس بھی یہ اثاثے ہوں گے وہ انہیں واپس لیئر ۱ (l1) پر پل کرنا چاہے گا۔
ایسا کرتے وقت، اثاثوں کو لیئر ۲ (l2) پر جلایا جاتا ہے اور پھر لیئر ۱ (l1) پر صارف کو واپس جاری کر دیا جاتا ہے۔

یہ وہ طریقہ ہے جس سے [آپٹیمزم کا معیاری پل](https://docs.optimism.io/app-developers/bridging/standard-bridge) کام کرتا ہے۔
اس مضمون میں ہم اس پل کے سورس کوڈ کا جائزہ لیں گے تاکہ یہ دیکھ سکیں کہ یہ کیسے کام کرتا ہے اور اسے اچھی طرح سے لکھے گئے <span dir="ltr">Solidity</span> کوڈ کی ایک مثال کے طور پر پڑھیں گے۔

## کنٹرول فلوز {#control-flows}

پل کے دو اہم فلوز ہیں:

- جمع کرنا (لیئر ۱ (l1) سے لیئر ۲ (l2) تک)
- انخلا (لیئر ۲ (l2) سے لیئر ۱ (l1) تک)

### جمع کرنے کا فلو {#deposit-flow}

#### لیئر ۱ {#deposit-flow-layer-1}

1. اگر کوئی <span dir="ltr">ERC-20</span> جمع کر رہا ہے، تو جمع کنندہ پل کو جمع کی جانے والی رقم خرچ کرنے کا الاؤنس دیتا ہے۔
2. جمع کنندہ لیئر ۱ (l1) پل کو کال کرتا ہے (`depositERC20`، `depositERC20To`، `depositETH`، یا `depositETHTo`)
3. لیئر ۱ (l1) پل، پل کیے گئے اثاثے کا قبضہ لے لیتا ہے
   - <span dir="ltr">ETH</span>: اثاثہ جمع کنندہ کی جانب سے کال کے حصے کے طور پر منتقل کیا جاتا ہے
   - <span dir="ltr">ERC-20</span>: اثاثہ پل کی جانب سے جمع کنندہ کے فراہم کردہ الاؤنس کا استعمال کرتے ہوئے خود کو منتقل کیا جاتا ہے
4. لیئر ۱ (l1) پل کراس ڈومین پیغام کے طریقہ کار کا استعمال کرتے ہوئے لیئر ۲ (l2) پل پر `finalizeDeposit` کو کال کرتا ہے

#### لیئر ۲ {#deposit-flow-layer-2}

5. لیئر ۲ (l2) پل تصدیق کرتا ہے کہ `finalizeDeposit` کی کال جائز ہے:
   - کراس ڈومین پیغام کے کنٹریکٹ سے آئی ہے
   - اصل میں لیئر ۱ (l1) پر موجود پل سے تھی
6. لیئر ۲ (l2) پل چیک کرتا ہے کہ آیا لیئر ۲ (l2) پر <span dir="ltr">ERC-20</span> ٹوکن کنٹریکٹ درست ہے:
   - لیئر ۲ (l2) کنٹریکٹ رپورٹ کرتا ہے کہ اس کا لیئر ۱ (l1) ہم منصب وہی ہے جہاں سے لیئر ۱ (l1) پر ٹوکن آئے تھے
   - لیئر ۲ (l2) کنٹریکٹ رپورٹ کرتا ہے کہ یہ درست انٹرفیس کو سپورٹ کرتا ہے ([<span dir="ltr">ERC-165</span> کا استعمال کرتے ہوئے](https://eips.ethereum.org/EIPS/eip-165))۔
7. اگر لیئر ۲ (l2) کنٹریکٹ درست ہے، تو اسے مناسب پتے پر مناسب تعداد میں ٹوکنز ڈھالنے کے لیے کال کریں۔ اگر نہیں، تو صارف کو لیئر ۱ (l1) پر ٹوکنز کا دعویٰ کرنے کی اجازت دینے کے لیے انخلا کا عمل شروع کریں۔

### انخلا کا فلو {#withdrawal-flow}

#### لیئر ۲ {#withdrawal-flow-layer-2}

1. انخلا کرنے والا لیئر ۲ (l2) پل کو کال کرتا ہے (`withdraw` یا `withdrawTo`)
2. لیئر ۲ (l2) پل `msg.sender` سے تعلق رکھنے والے مناسب تعداد میں ٹوکنز کو جلاتا ہے
3. لیئر ۲ (l2) پل کراس ڈومین پیغام کے طریقہ کار کا استعمال کرتے ہوئے لیئر ۱ (l1) پل پر `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کو کال کرتا ہے

#### لیئر ۱ {#withdrawal-flow-layer-1}

4. لیئر ۱ (l1) پل تصدیق کرتا ہے کہ `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کی کال جائز ہے:
   - کراس ڈومین پیغام کے طریقہ کار سے آئی ہے
   - اصل میں لیئر ۲ (l2) پر موجود پل سے تھی
5. لیئر ۱ (l1) پل مناسب اثاثہ (<span dir="ltr">ETH</span> یا <span dir="ltr">ERC-20</span>) کو مناسب پتے پر منتقل کرتا ہے

## لیئر ۱ کا کوڈ {#layer-1-code}

یہ وہ کوڈ ہے جو لیئر ۱ (l1)، یعنی ایتھیریم مین نیٹ پر چلتا ہے۔

### IL1ERC20Bridge {#il1erc20bridge}

[اس انٹرفیس کی تعریف یہاں کی گئی ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)۔
اس میں <span dir="ltr">ERC-20</span> ٹوکنز کو پل کرنے کے لیے درکار فنکشنز اور تعریفیں شامل ہیں۔

```solidity
// SPDX-License-Identifier: MIT
```

[آپٹیمزم کا زیادہ تر کوڈ <span dir="ltr">MIT</span> لائسنس کے تحت جاری کیا گیا ہے](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)۔

```solidity
pragma solidity >0.5.0 <0.9.0;
```

لکھتے وقت <span dir="ltr">Solidity</span> کا تازہ ترین ورژن <span dir="ltr">0.8.12</span> ہے۔
جب تک ورژن <span dir="ltr">0.9.0</span> جاری نہیں ہوتا، ہم نہیں جانتے کہ یہ کوڈ اس کے ساتھ مطابقت رکھتا ہے یا نہیں۔

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * ایونٹس *
     **********/

    event ERC20DepositInitiated(
```

آپٹیمزم پل کی اصطلاح میں _جمع کرنے_ کا مطلب لیئر ۱ (l1) سے لیئر ۲ (l2) میں منتقلی ہے، اور _انخلا_ کا مطلب لیئر ۲ (l2) سے لیئر ۱ (l1) میں منتقلی ہے۔

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

زیادہ تر معاملات میں لیئر ۱ (l1) پر <span dir="ltr">ERC-20</span> کا پتہ لیئر ۲ (l2) پر مساوی <span dir="ltr">ERC-20</span> کے پتے جیسا نہیں ہوتا ہے۔
[آپ ٹوکن کے پتوں کی فہرست یہاں دیکھ سکتے ہیں](https://static.optimism.io/optimism.tokenlist.json)۔
`chainId` 1 والا پتہ لیئر ۱ (l1) (مین نیٹ) پر ہے اور `chainId` 10 والا پتہ لیئر ۲ (l2) (آپٹیمزم) پر ہے۔
دیگر دو `chainId` ویلیوز کوون ٹیسٹ نیٹ ورک (42) اور آپٹمسٹک کوون ٹیسٹ نیٹ ورک (69) کے لیے ہیں۔

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

منتقلیوں میں نوٹس شامل کرنا ممکن ہے، اس صورت میں انہیں ان ایونٹس میں شامل کیا جاتا ہے جو ان کی رپورٹ کرتے ہیں۔

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

یہی پل کا کنٹریکٹ دونوں سمتوں میں منتقلیوں کو سنبھالتا ہے۔
لیئر ۱ (l1) پل کے معاملے میں، اس کا مطلب جمع کرنے کا آغاز اور انخلا کی تکمیل ہے۔

```solidity

    /********************
     * پبلک فنکشنز *
     ********************/

    /**
     * @dev متعلقہ لیئر ۲ (l2) پل کنٹریکٹ کا پتہ حاصل کریں۔
     * @return متعلقہ لیئر ۲ (l2) پل کنٹریکٹ کا پتہ۔
     */
    function l2TokenBridge() external returns (address);
```

اس فنکشن کی واقعی ضرورت نہیں ہے، کیونکہ لیئر ۲ (l2) پر یہ پہلے سے تعینات کردہ کنٹریکٹ ہے، اس لیے یہ ہمیشہ `0x4200000000000000000000000000000000000010` پتے پر ہوتا ہے۔
یہ یہاں لیئر ۲ (l2) پل کے ساتھ ہم آہنگی کے لیے ہے، کیونکہ لیئر ۱ (l1) پل کا پتہ جاننا معمولی بات _نہیں_ ہے۔

```solidity
    /**
     * @dev کالر کے لیئر ۲ (l2) بیلنس میں ERC-20 کی کچھ رقم جمع کریں۔
     * @param _l1Token لیئر ۱ (l1) ERC-20 کا پتہ جسے ہم جمع کر رہے ہیں
     * @param _l2Token لیئر ۱ (l1) کے متعلقہ لیئر ۲ (l2) ERC-20 کا پتہ
     * @param _amount جمع کرنے کے لیے ERC-20 کی رقم
     * @param _l2Gas لیئر ۲ (l2) پر جمع مکمل کرنے کے لیے درکار گیس کی حد۔
     * @param _data لیئر ۲ (l2) کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا
     *        صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *        لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` پیرامیٹر لیئر ۲ (l2) گیس کی وہ مقدار ہے جو ٹرانزیکشن کو خرچ کرنے کی اجازت ہے۔
[ایک مخصوص (اعلیٰ) حد تک، یہ مفت ہے](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)، لہذا جب تک کہ <span dir="ltr">ERC-20</span> کنٹریکٹ ڈھالتے وقت کچھ واقعی عجیب نہ کرے، یہ کوئی مسئلہ نہیں ہونا چاہیے۔
یہ فنکشن اس عام صورتحال کو سنبھالتا ہے، جہاں ایک صارف مختلف بلاک چین پر اسی پتے پر اثاثوں کو پل کرتا ہے۔

```solidity
    /**
     * @dev وصول کنندہ کے لیئر ۲ (l2) بیلنس میں ERC-20 کی کچھ رقم جمع کریں۔
     * @param _l1Token لیئر ۱ (l1) ERC-20 کا پتہ جسے ہم جمع کر رہے ہیں
     * @param _l2Token لیئر ۱ (l1) کے متعلقہ لیئر ۲ (l2) ERC-20 کا پتہ
     * @param _to لیئر ۲ (l2) کا پتہ جس میں انخلا کریڈٹ کرنا ہے۔
     * @param _amount جمع کرنے کے لیے ERC-20 کی رقم۔
     * @param _l2Gas لیئر ۲ (l2) پر جمع مکمل کرنے کے لیے درکار گیس کی حد۔
     * @param _data لیئر ۲ (l2) کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا
     *        صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *        لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

یہ فنکشن تقریباً `depositERC20` جیسا ہی ہے، لیکن یہ آپ کو <span dir="ltr">ERC-20</span> کو کسی مختلف پتے پر بھیجنے کی اجازت دیتا ہے۔

```solidity
    /*************************
     * کراس چین فنکشنز *
     *************************/

    /**
     * @dev لیئر ۲ (l2) سے لیئر ۱ (l1) تک انخلا مکمل کریں، اور وصول کنندہ کے
     * لیئر ۱ (l1) ERC-20 ٹوکن کے بیلنس میں فنڈز کریڈٹ کریں۔
     * یہ کال ناکام ہو جائے گی اگر لیئر ۲ (l2) سے شروع کیا گیا انخلا حتمی شکل نہیں پا سکا ہے۔
     *
     * @param _l1Token لیئر ۱ (l1) ٹوکن کا پتہ جس کے لیے finalizeWithdrawal کرنا ہے۔
     * @param _l2Token لیئر ۲ (l2) ٹوکن کا پتہ جہاں انخلا شروع کیا گیا تھا۔
     * @param _from لیئر ۲ (l2) کا پتہ جو منتقلی شروع کر رہا ہے۔
     * @param _to لیئر ۱ (l1) کا پتہ جس میں انخلا کریڈٹ کرنا ہے۔
     * @param _amount جمع کرنے کے لیے ERC-20 کی رقم۔
     * @param _data لیئر ۲ (l2) پر بھیجنے والے کی طرف سے فراہم کردہ ڈیٹا۔ یہ ڈیٹا
     *   صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *   لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

آپٹیمزم میں انخلا (اور لیئر ۲ (l2) سے لیئر ۱ (l1) تک کے دیگر پیغامات) دو مراحل پر مشتمل عمل ہیں:

1. لیئر ۲ (l2) پر ایک ابتدائی ٹرانزیکشن۔
2. لیئر ۱ (l1) پر ایک حتمی یا دعویٰ کرنے والی ٹرانزیکشن۔
   یہ ٹرانزیکشن لیئر ۲ (l2) ٹرانزیکشن کے لیے [فالٹ چیلنج کی مدت](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) ختم ہونے کے بعد ہونی چاہیے۔

### IL1StandardBridge {#il1standardbridge}

[اس انٹرفیس کی تعریف یہاں کی گئی ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)۔
اس فائل میں <span dir="ltr">ETH</span> کے لیے ایونٹ اور فنکشن کی تعریفیں شامل ہیں۔
یہ تعریفیں اوپر <span dir="ltr">ERC-20</span> کے لیے `IL1ERC20Bridge` میں بیان کردہ تعریفوں سے بہت ملتی جلتی ہیں۔

پل کا انٹرفیس دو فائلوں کے درمیان تقسیم کیا گیا ہے کیونکہ کچھ <span dir="ltr">ERC-20</span> ٹوکنز کو کسٹم پروسیسنگ کی ضرورت ہوتی ہے اور انہیں معیاری پل کے ذریعے نہیں سنبھالا جا سکتا۔
اس طرح وہ کسٹم پل جو ایسے ٹوکن کو سنبھالتا ہے وہ `IL1ERC20Bridge` کو نافذ کر سکتا ہے اور اسے <span dir="ltr">ETH</span> کو بھی پل کرنے کی ضرورت نہیں ہوتی۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * ایونٹس *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

یہ ایونٹ تقریباً <span dir="ltr">ERC-20</span> ورژن (`ERC20DepositInitiated`) جیسا ہی ہے، سوائے اس کے کہ اس میں لیئر ۱ (l1) اور لیئر ۲ (l2) ٹوکن کے پتے نہیں ہیں۔
یہی بات دیگر ایونٹس اور فنکشنز کے لیے بھی درست ہے۔

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * پبلک فنکشنز *
     ********************/

    /**
     * @dev کالر کے لیئر ۲ (l2) بیلنس میں ETH کی کچھ رقم جمع کریں۔
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev وصول کنندہ کے لیئر ۲ (l2) بیلنس میں ETH کی کچھ رقم جمع کریں۔
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * کراس چین فنکشنز *
     *************************/

    /**
     * @dev لیئر ۲ (l2) سے لیئر ۱ (l1) تک انخلا مکمل کریں، اور وصول کنندہ کے
     * لیئر ۱ (l1) ETH ٹوکن کے بیلنس میں فنڈز کریڈٹ کریں۔ چونکہ صرف xDomainMessenger اس فنکشن کو کال کر سکتا ہے، اس لیے اسے کبھی بھی
     * انخلا کے حتمی ہونے سے پہلے کال نہیں کیا جائے گا۔
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[یہ کنٹریکٹ](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) دونوں پلوں ([لیئر ۱ (l1)](#the-l1-bridge-contract) اور [لیئر ۲ (l2)](#l2-bridge-code)) کو وراثت میں ملا ہے تاکہ دوسری لیئر کو پیغامات بھیجے جا سکیں۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* انٹرفیس امپورٹس */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) کنٹریکٹ کو بتاتا ہے کہ کراس ڈومین میسنجر کا استعمال کرتے ہوئے دوسری لیئر کو پیغامات کیسے بھیجنے ہیں۔
یہ کراس ڈومین میسنجر ایک بالکل الگ سسٹم ہے، اور اس پر ایک الگ مضمون بنتا ہے، جو مجھے امید ہے کہ میں مستقبل میں لکھوں گا۔

```solidity
/**
 * @title CrossDomainEnabled
 * @dev کراس ڈومین مواصلات انجام دینے والے کنٹریکٹس کے لیے مددگار کنٹریکٹ
 *
 * استعمال شدہ کمپائلر: وراثت میں ملنے والے کنٹریکٹ کے ذریعے بیان کیا گیا ہے
 */
contract CrossDomainEnabled {
    /*************
     * ویری ایبلز *
     *************/

    // دوسرے ڈومین سے پیغامات بھیجنے اور وصول کرنے کے لیے استعمال ہونے والا میسنجر کنٹریکٹ۔
    address public messenger;

    /***************
     * کنسٹرکٹر *
     ***************/

    /**
     * @param _messenger موجودہ لیئر پر CrossDomainMessenger کا پتہ۔
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

وہ واحد پیرامیٹر جو کنٹریکٹ کو جاننے کی ضرورت ہے، وہ اس لیئر پر کراس ڈومین میسنجر کا پتہ ہے۔
یہ پیرامیٹر کنسٹرکٹر میں ایک بار سیٹ کیا جاتا ہے، اور کبھی تبدیل نہیں ہوتا۔

```solidity

    /**********************
     * فنکشن موڈیفائرز *
     **********************/

    /**
     * یہ نافذ کرتا ہے کہ ترمیم شدہ فنکشن کو صرف ایک مخصوص کراس ڈومین اکاؤنٹ کے ذریعے کال کیا جا سکتا ہے۔
     * @param _sourceDomainAccount اصل ڈومین پر واحد اکاؤنٹ جو
     *  اس فنکشن کو کال کرنے کے لیے مستند ہے۔
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

کراس ڈومین میسجنگ اس بلاک چین پر موجود کسی بھی کنٹریکٹ کے ذریعے قابل رسائی ہے جہاں یہ چل رہا ہے (چاہے وہ ایتھیریم مین نیٹ ہو یا آپٹیمزم)۔
لیکن ہمیں ہر طرف کے پل کی ضرورت ہے کہ وہ _صرف_ مخصوص پیغامات پر بھروسہ کرے اگر وہ دوسری طرف کے پل سے آتے ہیں۔

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

صرف مناسب کراس ڈومین میسنجر (`messenger`، جیسا کہ آپ نیچے دیکھ سکتے ہیں) کے پیغامات پر بھروسہ کیا جا سکتا ہے۔

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

جس طریقے سے کراس ڈومین میسنجر وہ پتہ فراہم کرتا ہے جس نے دوسری لیئر کے ساتھ پیغام بھیجا تھا وہ [`.xDomainMessageSender()` فنکشن](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) ہے۔
جب تک اسے اس ٹرانزیکشن میں کال کیا جاتا ہے جو پیغام کے ذریعے شروع کی گئی تھی، یہ یہ معلومات فراہم کر سکتا ہے۔

ہمیں یہ یقینی بنانے کی ضرورت ہے کہ ہمیں موصول ہونے والا پیغام دوسرے پل سے آیا ہے۔

```solidity

        _;
    }

    /**********************
     * انٹرنل فنکشنز *
     **********************/

    /**
     * میسنجر حاصل کرتا ہے، عام طور پر اسٹوریج سے۔ یہ فنکشن اس صورت میں ظاہر کیا جاتا ہے اگر کسی چائلڈ کنٹریکٹ
     * کو اوور رائیڈ کرنے کی ضرورت ہو۔
     * @return کراس ڈومین میسنجر کنٹریکٹ کا پتہ جسے استعمال کیا جانا چاہیے۔
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

یہ فنکشن کراس ڈومین میسنجر واپس کرتا ہے۔
ہم متغیر `messenger` کے بجائے ایک فنکشن استعمال کرتے ہیں تاکہ اس سے وراثت پانے والے کنٹریکٹس کو یہ بتانے کے لیے ایک الگورتھم استعمال کرنے کی اجازت دی جا سکے کہ کون سا کراس ڈومین میسنجر استعمال کرنا ہے۔

```solidity

    /**
     * کسی دوسرے ڈومین پر موجود اکاؤنٹ کو پیغام بھیجتا ہے
     * @param _crossDomainTarget منزل کے ڈومین پر مطلوبہ وصول کنندہ
     * @param _message ہدف کو بھیجنے کے لیے ڈیٹا (عام طور پر `onlyFromCrossDomainAccount()` والے فنکشن کے لیے کال ڈیٹا)
     * @param _gasLimit ہدف کے ڈومین پر پیغام کی وصولی کے لیے گیس کی حد (gasLimit)۔
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

آخر میں، وہ فنکشن جو دوسری لیئر کو پیغام بھیجتا ہے۔

```solidity
    ) internal {
        // سلدر-disable-next-line مکرر داخلہ-events, مکرر داخلہ-benign
```

[سلدر](https://github.com/crytic/slither) ایک جامد تجزیہ کار ہے جسے آپٹیمزم ہر کنٹریکٹ پر چلاتا ہے تاکہ کمزوریوں اور دیگر ممکنہ مسائل کو تلاش کیا جا سکے۔
اس صورت میں، درج ذیل لائن دو کمزوریوں کو متحرک کرتی ہے:

1. [مکرر داخلہ کے ایونٹس](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [بے ضرر مکرر داخلہ](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

اس صورت میں ہم مکرر داخلہ کے بارے میں فکر مند نہیں ہیں، ہم جانتے ہیں کہ `getCrossDomainMessenger()` ایک قابل اعتماد پتہ واپس کرتا ہے، یہاں تک کہ اگر سلدر کے پاس یہ جاننے کا کوئی طریقہ نہیں ہے۔

### لیئر ۱ کا پل کنٹریکٹ {#the-l1-bridge-contract}

[اس کنٹریکٹ کا سورس کوڈ یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

انٹرفیسز دیگر کنٹریکٹس کا حصہ ہو سکتے ہیں، اس لیے انہیں <span dir="ltr">Solidity</span> ورژنز کی ایک وسیع رینج کو سپورٹ کرنا ہوتا ہے۔
لیکن پل بذات خود ہمارا کنٹریکٹ ہے، اور ہم اس بارے میں سخت ہو سکتے ہیں کہ یہ کون سا <span dir="ltr">Solidity</span> ورژن استعمال کرتا ہے۔

```solidity
/* انٹرفیس امپورٹس */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) اور [IL1StandardBridge](#il1standardbridge) کی وضاحت اوپر کی گئی ہے۔

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ہمیں لیئر ۲ (l2) پر معیاری پل کو کنٹرول کرنے کے لیے پیغامات بنانے کی اجازت دیتا ہے۔

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[یہ انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ہمیں <span dir="ltr">ERC-20</span> کنٹریکٹس کو کنٹرول کرنے کی اجازت دیتا ہے۔
[آپ اس کے بارے میں مزید یہاں پڑھ سکتے ہیں](/developers/tutorials/erc20-annotated-code/#the-interface)۔

```solidity
/* لائبریری امپورٹس */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[جیسا کہ اوپر وضاحت کی گئی ہے](#crossdomainenabled)، یہ کنٹریکٹ انٹرلیئر میسجنگ کے لیے استعمال ہوتا ہے۔

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) میں لیئر ۲ (l2) کنٹریکٹس کے پتے ہیں جن کا پتہ ہمیشہ ایک ہی ہوتا ہے۔ اس میں لیئر ۲ (l2) پر معیاری پل شامل ہے۔

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[اوپن زیپلن کی ایڈریس یوٹیلیٹیز](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)۔ یہ کنٹریکٹ کے پتوں اور بیرونی ملکیت والے اکاؤنٹس (EOA) سے تعلق رکھنے والے پتوں کے درمیان فرق کرنے کے لیے استعمال ہوتا ہے۔

نوٹ کریں کہ یہ کوئی مکمل حل نہیں ہے، کیونکہ براہ راست کالز اور کنٹریکٹ کے کنسٹرکٹر سے کی گئی کالز کے درمیان فرق کرنے کا کوئی طریقہ نہیں ہے، لیکن کم از کم یہ ہمیں صارف کی کچھ عام غلطیوں کی نشاندہی کرنے اور انہیں روکنے کی اجازت دیتا ہے۔

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[<span dir="ltr">ERC-20</span> معیار](https://eips.ethereum.org/EIPS/eip-20) کنٹریکٹ کے لیے ناکامی کی اطلاع دینے کے دو طریقوں کو سپورٹ کرتا ہے:

1. ریورٹ
2. `false` واپس کریں

دونوں صورتوں کو سنبھالنے سے ہمارا کوڈ مزید پیچیدہ ہو جائے گا، اس لیے اس کے بجائے ہم [اوپن زیپلن کا `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) استعمال کرتے ہیں، جو اس بات کو یقینی بناتا ہے کہ [تمام ناکامیوں کا نتیجہ ریورٹ کی صورت میں نکلے](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)۔

```solidity
/**
 * @title L1StandardBridge
 * @dev لیئر ۱ (l1) ETH اور ERC-20 پل ایک کنٹریکٹ ہے جو جمع شدہ لیئر ۱ (l1) فنڈز اور معیاری
 * ٹوکنز کو اسٹور کرتا ہے جو لیئر ۲ (l2) پر استعمال میں ہیں۔ یہ متعلقہ لیئر ۲ (l2) پل کو ہم آہنگ کرتا ہے، اسے جمع ہونے کی اطلاع دیتا ہے
 * اور نئے حتمی انخلا کے لیے اسے سنتا ہے۔
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

یہ لائن بتاتی ہے کہ ہم ہر بار `IERC20` انٹرفیس استعمال کرتے وقت `SafeERC20` ریپر استعمال کرنے کی وضاحت کیسے کرتے ہیں۔

```solidity

    /********************************
     * ایکسٹرنل کنٹریکٹ ریفرنسز *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code) کا پتہ۔

```solidity

    // جمع شدہ لیئر ۱ (l1) ٹوکن کے بیلنس کے لیے لیئر ۱ (l1) ٹوکن کو لیئر ۲ (l2) ٹوکن سے میپ کرتا ہے
    mapping(address => mapping(address => uint256)) public deposits;
```

اس طرح کی ڈبل [میپنگ](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) وہ طریقہ ہے جس سے آپ [دو جہتی اسپارس ایرے](https://en.wikipedia.org/wiki/Sparse_matrix) کی وضاحت کرتے ہیں۔
اس ڈیٹا اسٹرکچر میں ویلیوز کی شناخت `deposit[L1 token addr][L2 token addr]` کے طور پر کی جاتی ہے۔
پہلے سے طے شدہ ویلیو صفر ہے۔
صرف وہ سیلز جو مختلف ویلیو پر سیٹ ہوتے ہیں انہیں اسٹوریج میں لکھا جاتا ہے۔

```solidity

    /***************
     * کنسٹرکٹر *
     ***************/

    // یہ کنٹریکٹ پراکسی کے پیچھے رہتا ہے، اس لیے کنسٹرکٹر کے پیرامیٹرز غیر استعمال شدہ رہیں گے۔
    constructor() CrossDomainEnabled(address(0)) {}
```

اسٹوریج میں موجود تمام متغیرات کو کاپی کیے بغیر اس کنٹریکٹ کو اپ گریڈ کرنے کے قابل ہونا۔
ایسا کرنے کے لیے ہم ایک [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) استعمال کرتے ہیں، ایک ایسا کنٹریکٹ جو کالز کو ایک الگ کنٹریکٹ میں منتقل کرنے کے لیے [`delegatecall`](https://solidity-by-example.org/delegatecall/) کا استعمال کرتا ہے جس کا پتہ پراکسی کنٹریکٹ کے ذریعے اسٹور کیا جاتا ہے (جب آپ اپ گریڈ کرتے ہیں تو آپ پراکسی کو وہ پتہ تبدیل کرنے کا کہتے ہیں)۔
جب آپ `delegatecall` استعمال کرتے ہیں تو اسٹوریج _کال کرنے والے_ کنٹریکٹ کی اسٹوریج ہی رہتی ہے، اس لیے کنٹریکٹ کی حالت کے تمام متغیرات کی ویلیوز متاثر نہیں ہوتیں۔

اس پیٹرن کا ایک اثر یہ ہے کہ اس کنٹریکٹ کی اسٹوریج جو `delegatecall` کا _کال کردہ_ ہے استعمال نہیں ہوتی اور اس لیے اسے پاس کی گئی کنسٹرکٹر ویلیوز کوئی اہمیت نہیں رکھتیں۔
یہی وجہ ہے کہ ہم `CrossDomainEnabled` کنسٹرکٹر کو ایک بے معنی ویلیو فراہم کر سکتے ہیں۔
یہ اس بات کی بھی وجہ ہے کہ ذیل میں دی گئی ابتدا کنسٹرکٹر سے الگ ہے۔

```solidity
    /******************
     * انیشلائزیشن *
     ******************/

    /**
     * @param _l1messenger لیئر ۱ (l1) میسنجر کا پتہ جو کراس چین مواصلات کے لیے استعمال ہو رہا ہے۔
     * @param _l2TokenBridge لیئر ۲ (l2) معیاری پل کا پتہ۔
     */
    // سلدر-disable-next-line external-function
```

یہ [سلدر ٹیسٹ](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ان فنکشنز کی نشاندہی کرتا ہے جنہیں کنٹریکٹ کوڈ سے کال نہیں کیا جاتا اور اس لیے انہیں `public` کے بجائے `external` قرار دیا جا سکتا ہے۔
`external` فنکشنز کی گیس کی قیمت کم ہو سکتی ہے، کیونکہ انہیں کال ڈیٹا میں پیرامیٹرز فراہم کیے جا سکتے ہیں۔
`public` قرار دیے گئے فنکشنز کو کنٹریکٹ کے اندر سے قابل رسائی ہونا چاہیے۔
کنٹریکٹس اپنے کال ڈیٹا میں ترمیم نہیں کر سکتے، اس لیے پیرامیٹرز کو میموری میں ہونا چاہیے۔
جب ایسے فنکشن کو بیرونی طور پر کال کیا جاتا ہے، تو کال ڈیٹا کو میموری میں کاپی کرنا ضروری ہوتا ہے، جس پر گیس خرچ ہوتی ہے۔
اس صورت میں فنکشن کو صرف ایک بار کال کیا جاتا ہے، اس لیے یہ غیر موثر ہونا ہمارے لیے کوئی معنی نہیں رکھتا۔

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` فنکشن کو صرف ایک بار کال کیا جانا چاہیے۔
اگر لیئر ۱ (l1) کراس ڈومین میسنجر یا لیئر ۲ (l2) ٹوکن پل کا پتہ تبدیل ہوتا ہے، تو ہم ایک نیا پراکسی اور ایک نیا پل بناتے ہیں جو اسے کال کرتا ہے۔
ایسا ہونے کا امکان نہیں ہے سوائے اس کے کہ جب پورے سسٹم کو اپ گریڈ کیا جائے، جو کہ بہت کم ہوتا ہے۔

نوٹ کریں کہ اس فنکشن میں ایسا کوئی طریقہ کار نہیں ہے جو اس بات کو محدود کرے کہ اسے _کون_ کال کر سکتا ہے۔
اس کا مطلب یہ ہے کہ نظریاتی طور پر ایک حملہ آور اس وقت تک انتظار کر سکتا ہے جب تک کہ ہم پراکسی اور پل کا پہلا ورژن تعینات نہ کر دیں اور پھر جائز صارف سے پہلے `initialize` فنکشن تک پہنچنے کے لیے [فرنٹ رننگ](https://solidity-by-example.org/hacks/front-running/) کرے۔ لیکن اسے روکنے کے دو طریقے ہیں:

1. اگر کنٹریکٹس براہ راست کسی EOA کے ذریعے نہیں بلکہ [ایک ایسی ٹرانزیکشن میں تعینات کیے جاتے ہیں جس میں کوئی دوسرا کنٹریکٹ انہیں بناتا ہے](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) تو پورا عمل ایٹمی ہو سکتا ہے، اور کسی بھی دوسری ٹرانزیکشن کے عمل میں آنے سے پہلے ختم ہو سکتا ہے۔
2. اگر `initialize` کی جائز کال ناکام ہو جاتی ہے تو نئے بنائے گئے پراکسی اور پل کو نظر انداز کرنا اور نئے بنانا ہمیشہ ممکن ہوتا ہے۔

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

یہ وہ دو پیرامیٹرز ہیں جو پل کو جاننے کی ضرورت ہے۔

```solidity

    /**************
     * جمع کرنا *
     **************/

    /** @dev موڈیفائر جس کا تقاضا ہے کہ بھیجنے والا EOA ہو۔ اس چیک کو ایک بدنیتی پر مبنی
     *  کنٹریکٹ initcode کے ذریعے بائی پاس کر سکتا ہے، لیکن یہ اس صارف کی غلطی کا خیال رکھتا ہے جس سے ہم بچنا چاہتے ہیں۔
     */
    modifier onlyEOA() {
        // کنٹریکٹس سے جمع ہونے کو روکنے کے لیے استعمال کیا جاتا ہے (غلطی سے ضائع ہونے والے ٹوکنز سے بچیں)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

یہی وجہ ہے کہ ہمیں اوپن زیپلن کی `Address` یوٹیلیٹیز کی ضرورت تھی۔

```solidity
    /**
     * @dev کالر کے لیئر ۲ (l2) بیلنس میں ETH کی کچھ رقم جمع کرنے کے لیے
     * اس فنکشن کو بغیر کسی ڈیٹا کے کال کیا جا سکتا ہے۔
     * چونکہ وصول کرنے والا فنکشن ڈیٹا نہیں لیتا، اس لیے ایک محتاط
     * ڈیفالٹ رقم لیئر ۲ (l2) کو بھیج دی جاتی ہے۔
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

یہ فنکشن ٹیسٹنگ کے مقاصد کے لیے موجود ہے۔
غور کریں کہ یہ انٹرفیس کی تعریفوں میں ظاہر نہیں ہوتا - یہ عام استعمال کے لیے نہیں ہے۔

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

یہ دونوں فنکشنز `_initiateETHDeposit` کے گرد ریپرز ہیں، وہ فنکشن جو اصل <span dir="ltr">ETH</span> جمع کرنے کو سنبھالتا ہے۔

```solidity
    /**
     * @dev ETH کو اسٹور کر کے اور لیئر ۲ (l2) ETH گیٹ وے کو جمع ہونے کی اطلاع دے کر
     * جمع کرنے کی منطق انجام دیتا ہے۔
     * @param _from لیئر ۱ (l1) پر جمع کی گئی رقم نکالنے کے لیے اکاؤنٹ۔
     * @param _to لیئر ۲ (l2) پر جمع کی گئی رقم دینے کے لیے اکاؤنٹ۔
     * @param _l2Gas لیئر ۲ (l2) پر جمع مکمل کرنے کے لیے درکار گیس کی حد۔
     * @param _data لیئر ۲ (l2) کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا
     *        صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *        لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit کال کے لیے کال ڈیٹا بنائیں
        bytes memory message = abi.encodeWithSelector(
```

کراس ڈومین پیغامات کے کام کرنے کا طریقہ یہ ہے کہ منزل کے کنٹریکٹ کو پیغام کے ساتھ اس کے کال ڈیٹا کے طور پر کال کیا جاتا ہے۔
<span dir="ltr">Solidity</span> کنٹریکٹس ہمیشہ اپنے کال ڈیٹا کی تشریح
[<span dir="ltr">ABI</span> کی خصوصیات](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) کے مطابق کرتے ہیں۔
<span dir="ltr">Solidity</span> فنکشن [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) وہ کال ڈیٹا بناتا ہے۔

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

یہاں پیغام ان پیرامیٹرز کے ساتھ [`finalizeDeposit` فنکشن](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) کو کال کرنا ہے:

| پیرامیٹر | ویلیو | مطلب |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | لیئر ۱ (l1) پر <span dir="ltr">ETH</span> (جو کہ <span dir="ltr">ERC-20</span> ٹوکن نہیں ہے) کی نمائندگی کرنے کے لیے خصوصی ویلیو |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | لیئر ۲ (l2) کنٹریکٹ جو آپٹیمزم پر <span dir="ltr">ETH</span> کا انتظام کرتا ہے، `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (یہ کنٹریکٹ صرف اندرونی آپٹیمزم کے استعمال کے لیے ہے) |
| \_from | \_from | لیئر ۱ (l1) پر وہ پتہ جو <span dir="ltr">ETH</span> بھیجتا ہے |
| \_to | \_to | لیئر ۲ (l2) پر وہ پتہ جو <span dir="ltr">ETH</span> وصول کرتا ہے |
| amount | msg.value | بھیجے گئے <span dir="ltr">Wei</span> کی مقدار (جو پہلے ہی پل کو بھیجی جا چکی ہے) |
| \_data | \_data | جمع کرنے کے ساتھ منسلک کرنے کے لیے اضافی ڈیٹا |

```solidity
        // لیئر ۲ (l2) میں کال ڈیٹا بھیجیں
        // سلدر-disable-next-line مکرر داخلہ-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

کراس ڈومین میسنجر کے ذریعے پیغام بھیجیں۔

```solidity
        // سلدر-disable-next-line مکرر داخلہ-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

کسی بھی غیر مرکزی ایپلی کیشن (dapp) کو مطلع کرنے کے لیے ایک ایونٹ خارج کریں جو اس منتقلی کو سنتی ہے۔

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

یہ دونوں فنکشنز `_initiateERC20Deposit` کے گرد ریپرز ہیں، وہ فنکشن جو اصل <span dir="ltr">ERC-20</span> جمع کرنے کو سنبھالتا ہے۔

```solidity
    /**
     * @dev لیئر ۲ (l2) جمع شدہ ٹوکن کنٹریکٹ کو جمع ہونے کی اطلاع دے کر اور لیئر ۱ (l1) فنڈز کو لاک کرنے کے لیے ہینڈلر کو کال کر کے جمع کرنے کی منطق انجام دیتا ہے۔ (مثال کے طور پر، transferFrom)
     *
     * @param _l1Token لیئر ۱ (l1) ERC-20 کا پتہ جسے ہم جمع کر رہے ہیں
     * @param _l2Token لیئر ۱ (l1) کے متعلقہ لیئر ۲ (l2) ERC-20 کا پتہ
     * @param _from لیئر ۱ (l1) پر جمع کی گئی رقم نکالنے کے لیے اکاؤنٹ
     * @param _to لیئر ۲ (l2) پر جمع کی گئی رقم دینے کے لیے اکاؤنٹ
     * @param _amount جمع کرنے کے لیے ERC-20 کی رقم۔
     * @param _l2Gas لیئر ۲ (l2) پر جمع مکمل کرنے کے لیے درکار گیس کی حد۔
     * @param _data لیئر ۲ (l2) کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا
     *        صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *        لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

یہ فنکشن اوپر دیے گئے `_initiateETHDeposit` سے ملتا جلتا ہے، جس میں چند اہم فرق ہیں۔
پہلا فرق یہ ہے کہ یہ فنکشن ٹوکن کے پتے اور منتقل کی جانے والی رقم کو پیرامیٹرز کے طور پر وصول کرتا ہے۔
<span dir="ltr">ETH</span> کے معاملے میں پل کی کال میں پہلے ہی پل کے اکاؤنٹ (`msg.value`) میں اثاثے کی منتقلی شامل ہوتی ہے۔

```solidity
        // جب لیئر ۱ (l1) پر جمع شروع کیا جاتا ہے، تو لیئر ۱ (l1) پل مستقبل کے لیے فنڈز اپنے پاس منتقل کر لیتا ہے
        // انخلا۔ safeTransferFrom یہ بھی چیک کرتا ہے کہ آیا کنٹریکٹ میں کوڈ ہے، لہذا یہ ناکام ہو جائے گا اگر
        // _from ایک EOA یا پتہ(0) ہے۔
        // سلدر-disable-next-line مکرر داخلہ-events, مکرر داخلہ-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

<span dir="ltr">ERC-20</span> ٹوکن کی منتقلی <span dir="ltr">ETH</span> سے مختلف عمل کی پیروی کرتی ہے:

1. صارف (`_from`) پل کو مناسب ٹوکن منتقل کرنے کا الاؤنس دیتا ہے۔
2. صارف ٹوکن کنٹریکٹ کے پتے، رقم وغیرہ کے ساتھ پل کو کال کرتا ہے۔
3. پل جمع کرنے کے عمل کے حصے کے طور پر ٹوکنز کو (خود کو) منتقل کرتا ہے۔

پہلا قدم آخری دو سے الگ ٹرانزیکشن میں ہو سکتا ہے۔
تاہم، فرنٹ رننگ کوئی مسئلہ نہیں ہے کیونکہ وہ دو فنکشنز جو `_initiateERC20Deposit` کو کال کرتے ہیں (`depositERC20` اور `depositERC20To`) وہ صرف اس فنکشن کو `msg.sender` کے ساتھ `_from` پیرامیٹر کے طور پر کال کرتے ہیں۔

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) کے لیے کال ڈیٹا بنائیں
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // لیئر ۲ (l2) میں کال ڈیٹا بھیجیں
        // سلدر-disable-next-line مکرر داخلہ-events, مکرر داخلہ-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // سلدر-disable-next-line مکرر داخلہ-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

جمع کی گئی ٹوکنز کی رقم کو `deposits` ڈیٹا اسٹرکچر میں شامل کریں۔
لیئر ۲ (l2) پر ایک سے زیادہ پتے ہو سکتے ہیں جو ایک ہی لیئر ۱ (l1) <span dir="ltr">ERC-20</span> ٹوکن سے مطابقت رکھتے ہوں، اس لیے جمع کی گئی رقوم کا ٹریک رکھنے کے لیے لیئر ۱ (l1) <span dir="ltr">ERC-20</span> ٹوکن کے پل کے بیلنس کا استعمال کرنا کافی نہیں ہے۔

```solidity

        // سلدر-disable-next-line مکرر داخلہ-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * کراس چین فنکشنز *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

لیئر ۲ (l2) پل لیئر ۲ (l2) کراس ڈومین میسنجر کو ایک پیغام بھیجتا ہے جس کی وجہ سے لیئر ۱ (l1) کراس ڈومین میسنجر اس فنکشن کو کال کرتا ہے (یقیناً، ایک بار جب [پیغام کو حتمی شکل دینے والی ٹرانزیکشن](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) لیئر ۱ (l1) پر جمع ہو جاتی ہے)۔

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

یقینی بنائیں کہ یہ ایک _جائز_ پیغام ہے، جو کراس ڈومین میسنجر سے آ رہا ہے اور لیئر ۲ (l2) ٹوکن پل سے شروع ہو رہا ہے۔
یہ فنکشن پل سے <span dir="ltr">ETH</span> نکالنے کے لیے استعمال ہوتا ہے، اس لیے ہمیں یہ یقینی بنانا ہوگا کہ اسے صرف مجاز کالر کے ذریعے ہی کال کیا جائے۔

```solidity
        // سلدر-disable-next-line مکرر داخلہ-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

<span dir="ltr">ETH</span> منتقل کرنے کا طریقہ یہ ہے کہ وصول کنندہ کو `msg.value` میں <span dir="ltr">Wei</span> کی مقدار کے ساتھ کال کی جائے۔

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // سلدر-disable-next-line مکرر داخلہ-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

انخلا کے بارے میں ایک ایونٹ خارج کریں۔

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

یہ فنکشن اوپر دیے گئے `finalizeETHWithdrawal` سے ملتا جلتا ہے، جس میں <span dir="ltr">ERC-20</span> ٹوکنز کے لیے ضروری تبدیلیاں کی گئی ہیں۔

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ڈیٹا اسٹرکچر کو اپ ڈیٹ کریں۔

```solidity

        // جب لیئر ۱ (l1) پر انخلا کو حتمی شکل دی جاتی ہے، تو لیئر ۱ (l1) پل فنڈز نکالنے والے کو منتقل کر دیتا ہے
        // سلدر-disable-next-line مکرر داخلہ-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // سلدر-disable-next-line مکرر داخلہ-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * عارضی - ETH کی منتقلی *
     *****************************/

    /**
     * @dev اکاؤنٹ میں ETH بیلنس کا اضافہ کرتا ہے۔ اس کا مقصد ETH کو
     * پرانے گیٹ وے سے نئے گیٹ وے پر منتقل کرنے کی اجازت دینا ہے۔
     * نوٹ: یہ صرف ایک اپ گریڈ کے لیے چھوڑا گیا ہے تاکہ ہم پرانے کنٹریکٹ سے
     * منتقل شدہ ETH وصول کر سکیں
     */
    function donateETH() external payable {}
}
```

پل کا ایک ابتدائی نفاذ تھا۔
جب ہم اس نفاذ سے اس کی طرف منتقل ہوئے، تو ہمیں تمام اثاثوں کو منتقل کرنا پڑا۔
<span dir="ltr">ERC-20</span> ٹوکنز کو صرف منتقل کیا جا سکتا ہے۔
تاہم، کسی کنٹریکٹ میں <span dir="ltr">ETH</span> منتقل کرنے کے لیے آپ کو اس کنٹریکٹ کی منظوری کی ضرورت ہوتی ہے، جو کہ `donateETH` ہمیں فراہم کرتا ہے۔

## لیئر ۲ پر <span dir="ltr">ERC-20</span> ٹوکنز {#erc-20-tokens-on-l2}

کسی <span dir="ltr">ERC-20</span> ٹوکن کو معیاری پل میں فٹ ہونے کے لیے، اسے معیاری پل، اور _صرف_ معیاری پل کو ٹوکن ڈھالنے کی اجازت دینے کی ضرورت ہوتی ہے۔
یہ ضروری ہے کیونکہ پلوں کو یہ یقینی بنانے کی ضرورت ہوتی ہے کہ آپٹیمزم پر گردش کرنے والے ٹوکنز کی تعداد لیئر ۱ (l1) پل کنٹریکٹ کے اندر مقفل ٹوکنز کی تعداد کے برابر ہو۔
اگر لیئر ۲ (l2) پر بہت زیادہ ٹوکنز ہوں تو کچھ صارفین اپنے اثاثوں کو واپس لیئر ۱ (l1) پر پل کرنے سے قاصر ہوں گے۔
ایک قابل اعتماد پل کے بجائے، ہم بنیادی طور پر [فریکشنل ریزرو بینکنگ](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) کو دوبارہ بنائیں گے۔
اگر لیئر ۱ (l1) پر بہت زیادہ ٹوکنز ہوں، تو ان میں سے کچھ ٹوکنز ہمیشہ کے لیے پل کنٹریکٹ کے اندر مقفل رہیں گے کیونکہ لیئر ۲ (l2) ٹوکنز کو جلائے بغیر انہیں جاری کرنے کا کوئی طریقہ نہیں ہے۔

### IL2StandardERC20 {#il2standarderc20}

لیئر ۲ (l2) پر ہر <span dir="ltr">ERC-20</span> ٹوکن جو معیاری پل کا استعمال کرتا ہے اسے [یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) فراہم کرنے کی ضرورت ہوتی ہے، جس میں وہ فنکشنز اور ایونٹس ہوتے ہیں جن کی معیاری پل کو ضرورت ہوتی ہے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[معیاری <span dir="ltr">ERC-20</span> انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) میں `mint` اور `burn` فنکشنز شامل نہیں ہیں۔
ان طریقوں کی [<span dir="ltr">ERC-20</span> معیار](https://eips.ethereum.org/EIPS/eip-20) کو ضرورت نہیں ہے، جو ٹوکن بنانے اور تباہ کرنے کے طریقہ کار کو غیر متعین چھوڑ دیتا ہے۔

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[<span dir="ltr">ERC-165</span> انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) یہ بتانے کے لیے استعمال ہوتا ہے کہ کنٹریکٹ کون سے فنکشنز فراہم کرتا ہے۔
[آپ معیار کو یہاں پڑھ سکتے ہیں](https://eips.ethereum.org/EIPS/eip-165)۔

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

یہ فنکشن لیئر ۱ (l1) ٹوکن کا پتہ فراہم کرتا ہے جو اس کنٹریکٹ سے پل کیا گیا ہے۔
نوٹ کریں کہ ہمارے پاس مخالف سمت میں ایسا کوئی فنکشن نہیں ہے۔
ہمیں کسی بھی لیئر ۱ (l1) ٹوکن کو پل کرنے کے قابل ہونے کی ضرورت ہے، قطع نظر اس کے کہ جب اسے نافذ کیا گیا تھا تو لیئر ۲ (l2) سپورٹ کی منصوبہ بندی کی گئی تھی یا نہیں۔

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

ٹوکنز کو ڈھالنے (بنانے) اور جلانے (تباہ کرنے) کے فنکشنز اور ایونٹس۔
پل واحد ہستی ہونی چاہیے جو ان فنکشنز کو چلا سکے تاکہ یہ یقینی بنایا جا سکے کہ ٹوکنز کی تعداد درست ہے (لیئر ۱ (l1) پر مقفل ٹوکنز کی تعداد کے برابر)۔

### L2StandardERC20 {#l2standarderc20}

[یہ `IL2StandardERC20` انٹرفیس کا ہمارا نفاذ ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)۔
جب تک کہ آپ کو کسی قسم کی کسٹم لاجک کی ضرورت نہ ہو، آپ کو اسے استعمال کرنا چاہیے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[اوپن زیپلن کا <span dir="ltr">ERC-20</span> کنٹریکٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)۔
آپٹیمزم پہیے کو دوبارہ ایجاد کرنے پر یقین نہیں رکھتا، خاص طور پر جب پہیے کا اچھی طرح سے آڈٹ کیا گیا ہو اور اسے اثاثے رکھنے کے لیے کافی قابل اعتماد ہونے کی ضرورت ہو۔

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

یہ وہ دو اضافی کنفیگریشن پیرامیٹرز ہیں جن کی ہمیں ضرورت ہوتی ہے اور <span dir="ltr">ERC-20</span> کو عام طور پر نہیں ہوتی۔

```solidity

    /**
     * @param _l2Bridge لیئر ۲ (l2) معیاری پل کا پتہ۔
     * @param _l1Token متعلقہ لیئر ۱ (l1) ٹوکن کا پتہ۔
     * @param _name ERC-20 کا نام۔
     * @param _symbol ERC-20 کی علامت۔
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

پہلے اس کنٹریکٹ کے لیے کنسٹرکٹر کو کال کریں جس سے ہم وراثت پاتے ہیں (`ERC20(_name, _symbol)`) اور پھر اپنے متغیرات سیٹ کریں۔

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // سلدر-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

یہ وہ طریقہ ہے جس سے [<span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165) کام کرتا ہے۔
ہر انٹرفیس متعدد سپورٹڈ فنکشنز پر مشتمل ہوتا ہے، اور اس کی شناخت ان فنکشنز کے [<span dir="ltr">ABI</span> فنکشن سلیکٹرز](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) کے [ایکسکلوسیو اور (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) کے طور پر کی جاتی ہے۔

لیئر ۲ (l2) پل <span dir="ltr">ERC-165</span> کو ایک سینیٹی چیک کے طور پر استعمال کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ وہ <span dir="ltr">ERC-20</span> کنٹریکٹ جس پر وہ اثاثے بھیجتا ہے وہ ایک `IL2StandardERC20` ہے۔

**نوٹ:** بدمعاش کنٹریکٹ کو `supportsInterface` کے غلط جوابات فراہم کرنے سے روکنے کے لیے کچھ نہیں ہے، اس لیے یہ ایک سینیٹی چیک کا طریقہ کار ہے، حفاظتی طریقہ کار _نہیں_ ہے۔

```solidity
    // سلدر-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // سلدر-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

صرف لیئر ۲ (l2) پل کو اثاثے ڈھالنے اور جلانے کی اجازت ہے۔

`_mint` اور `_burn` دراصل [اوپن زیپلن کے <span dir="ltr">ERC-20</span> کنٹریکٹ](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) میں بیان کیے گئے ہیں۔
وہ کنٹریکٹ انہیں بیرونی طور پر ظاہر نہیں کرتا، کیونکہ ٹوکنز کو ڈھالنے اور جلانے کی شرائط اتنی ہی مختلف ہیں جتنے <span dir="ltr">ERC-20</span> کو استعمال کرنے کے طریقے۔

## لیئر ۲ کے پل کا کوڈ {#l2-bridge-code}

یہ وہ کوڈ ہے جو آپٹیمزم پر پل چلاتا ہے۔
[اس کنٹریکٹ کا سورس یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* انٹرفیس امپورٹس */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) انٹرفیس اس [لیئر ۱ (l1) کے مساوی](#il1erc20bridge) سے بہت ملتا جلتا ہے جو ہم نے اوپر دیکھا تھا۔
اس میں دو اہم فرق ہیں:

1. لیئر ۱ (l1) پر آپ جمع کرنے کا آغاز کرتے ہیں اور انخلا کو حتمی شکل دیتے ہیں۔
   یہاں آپ انخلا کا آغاز کرتے ہیں اور جمع کرنے کو حتمی شکل دیتے ہیں۔
2. لیئر ۱ (l1) پر <span dir="ltr">ETH</span> اور <span dir="ltr">ERC-20</span> ٹوکنز کے درمیان فرق کرنا ضروری ہے۔
   لیئر ۲ (l2) پر ہم دونوں کے لیے ایک ہی فنکشنز استعمال کر سکتے ہیں کیونکہ اندرونی طور پر آپٹیمزم پر <span dir="ltr">ETH</span> بیلنس کو [<span dir="ltr">0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000</span>](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) پتے کے ساتھ ایک <span dir="ltr">ERC-20</span> ٹوکن کے طور پر سنبھالا جاتا ہے۔

```solidity
/* لائبریری امپورٹس */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* کنٹریکٹ امپورٹس */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev لیئر ۲ (l2) معیاری پل ایک کنٹریکٹ ہے جو لیئر ۱ (l1) معیاری پل کے ساتھ مل کر کام کرتا ہے تاکہ
 * لیئر ۱ (l1) اور لیئر ۲ (l2) کے درمیان ETH اور ERC-20 کی منتقلی کو فعال کیا جا سکے۔
 * یہ کنٹریکٹ نئے ٹوکنز کو ڈھالنے والے کے طور پر کام کرتا ہے جب اسے لیئر ۱ (l1) معیاری
 * پل میں جمع ہونے کے بارے میں معلوم ہوتا ہے۔
 * یہ کنٹریکٹ انخلا کے لیے مطلوبہ ٹوکنز کو جلانے والے کے طور پر بھی کام کرتا ہے، اور لیئر ۱ (l1)
 * پل کو لیئر ۱ (l1) فنڈز جاری کرنے کی اطلاع دیتا ہے۔
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * ایکسٹرنل کنٹریکٹ ریفرنسز *
     ********************************/

    address public l1TokenBridge;
```

لیئر ۱ (l1) پل کے پتے کا ٹریک رکھیں۔
نوٹ کریں کہ لیئر ۱ (l1) کے مساوی کے برعکس، یہاں ہمیں اس متغیر کی _ضرورت_ ہے۔
لیئر ۱ (l1) پل کا پتہ پہلے سے معلوم نہیں ہوتا۔

```solidity

    /***************
     * کنسٹرکٹر *
     ***************/

    /**
     * @param _l2CrossDomainMessenger اس کنٹریکٹ کے ذریعے استعمال ہونے والا کراس ڈومین میسنجر۔
     * @param _l1TokenBridge مین چین پر تعینات لیئر ۱ (l1) پل کا پتہ۔
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * انخلا *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

یہ دونوں فنکشنز انخلا کا آغاز کرتے ہیں۔
نوٹ کریں کہ لیئر ۱ (l1) ٹوکن کا پتہ بتانے کی کوئی ضرورت نہیں ہے۔
توقع کی جاتی ہے کہ لیئر ۲ (l2) ٹوکنز ہمیں لیئر ۱ (l1) کے مساوی کا پتہ بتائیں گے۔

```solidity

    /**
     * @dev ٹوکن کو جلانے اور لیئر ۱ (l1) ٹوکن گیٹ وے کو انخلا کی اطلاع دے کر
     *      انخلا کی منطق انجام دیتا ہے۔
     * @param _l2Token لیئر ۲ (l2) ٹوکن کا پتہ جہاں انخلا شروع کیا گیا ہے۔
     * @param _from لیئر ۲ (l2) پر انخلا نکالنے کے لیے اکاؤنٹ۔
     * @param _to لیئر ۱ (l1) پر انخلا دینے کے لیے اکاؤنٹ۔
     * @param _amount نکالنے کے لیے ٹوکن کی رقم۔
     * @param _l1Gas غیر استعمال شدہ، لیکن ممکنہ مستقبل کی مطابقت کے تحفظات کے لیے شامل کیا گیا ہے۔
     * @param _data لیئر ۱ (l1) کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا
     *        صرف بیرونی کنٹریکٹس کی سہولت کے لیے فراہم کیا گیا ہے۔ زیادہ سے زیادہ
     *        لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کے بارے میں کوئی ضمانت نہیں دیتے۔
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // جب انخلا شروع کیا جاتا ہے، تو ہم نکالنے والے کے فنڈز کو جلا دیتے ہیں تاکہ بعد میں لیئر ۲ (l2)
        // کے استعمال کو روکا جا سکے
        // سلدر-disable-next-line مکرر داخلہ-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

غور کریں کہ ہم `_from` پیرامیٹر پر انحصار _نہیں_ کر رہے ہیں بلکہ `msg.sender` پر کر رہے ہیں جسے جعلی بنانا بہت مشکل ہے (جہاں تک میں جانتا ہوں، ناممکن ہے)۔

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) کے لیے کال ڈیٹا بنائیں
        // سلدر-disable-next-line مکرر داخلہ-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

لیئر ۱ (l1) پر <span dir="ltr">ETH</span> اور <span dir="ltr">ERC-20</span> کے درمیان فرق کرنا ضروری ہے۔

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // لیئر ۱ (l1) پل تک پیغام بھیجیں
        // سلدر-disable-next-line مکرر داخلہ-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // سلدر-disable-next-line مکرر داخلہ-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * کراس چین فنکشن: جمع کرنا *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

اس فنکشن کو `L1StandardBridge` کے ذریعے کال کیا جاتا ہے۔

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

یقینی بنائیں کہ پیغام کا ذریعہ جائز ہے۔
یہ اہم ہے کیونکہ یہ فنکشن `_mint` کو کال کرتا ہے اور اسے ایسے ٹوکنز دینے کے لیے استعمال کیا جا سکتا ہے جو ان ٹوکنز کے ذریعے کور نہیں ہوتے جو پل کی لیئر ۱ (l1) پر ملکیت میں ہیں۔

```solidity
        // چیک کریں کہ ہدف ٹوکن مطابقت رکھتا ہے اور
        // تصدیق کریں کہ لیئر ۱ (l1) پر جمع شدہ ٹوکن یہاں لیئر ۲ (l2) کے جمع شدہ ٹوکن کی نمائندگی سے میل کھاتا ہے
        if (
            // سلدر-disable-next-line مکرر داخلہ-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

سینیٹی چیکس:

1. درست انٹرفیس سپورٹڈ ہے
2. لیئر ۲ (l2) <span dir="ltr">ERC-20</span> کنٹریکٹ کا لیئر ۱ (l1) پتہ ٹوکنز کے لیئر ۱ (l1) ذریعہ سے میل کھاتا ہے

```solidity
        ) {
            // جب جمع کو حتمی شکل دی جاتی ہے، تو ہم لیئر ۲ (l2) پر اکاؤنٹ میں اتنی ہی رقم کے
            // ٹوکنز کریڈٹ کرتے ہیں۔
            // سلدر-disable-next-line مکرر داخلہ-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // سلدر-disable-next-line مکرر داخلہ-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

اگر سینیٹی چیکس پاس ہو جاتے ہیں، تو جمع کرنے کو حتمی شکل دیں:

1. ٹوکنز ڈھالیں
2. مناسب ایونٹ خارج کریں

```solidity
        } else {
            // یا تو لیئر ۲ (l2) ٹوکن جس میں جمع کیا جا رہا ہے وہ درست پتہ کے بارے میں متفق نہیں ہے
            // اپنے لیئر ۱ (l1) ٹوکن کے، یا درست انٹرفیس کو سپورٹ نہیں کرتا ہے۔
            // یہ صرف اس صورت میں ہونا چاہیے اگر کوئی بدنیتی پر مبنی لیئر ۲ (l2) ٹوکن ہو، یا اگر صارف نے کسی طرح
            // جمع کرنے کے لیے غلط لیئر ۲ (l2) ٹوکن کا پتہ متعین کیا ہو۔
            // دونوں صورتوں میں، ہم یہاں عمل کو روکتے ہیں اور ایک انخلا کا
            // پیغام بناتے ہیں تاکہ صارفین کچھ معاملات میں اپنے فنڈز نکال سکیں۔
            // بدنیتی پر مبنی ٹوکن کنٹریکٹس کو مکمل طور پر روکنے کا کوئی طریقہ نہیں ہے، لیکن یہ
            // صارف کی غلطی کو محدود کرتا ہے اور بدنیتی پر مبنی کنٹریکٹ کے رویے کی کچھ شکلوں کو کم کرتا ہے۔
```

اگر کسی صارف نے غلط لیئر ۲ (l2) ٹوکن کا پتہ استعمال کر کے کوئی قابل شناخت غلطی کی ہے، تو ہم جمع کرنے کو منسوخ کرنا اور لیئر ۱ (l1) پر ٹوکنز واپس کرنا چاہتے ہیں۔
لیئر ۲ (l2) سے ہم ایسا کرنے کا واحد طریقہ یہ ہے کہ ایک پیغام بھیجیں جسے فالٹ چیلنج کی مدت کا انتظار کرنا پڑے گا، لیکن یہ صارف کے لیے ٹوکنز کو مستقل طور پر کھونے سے کہیں بہتر ہے۔

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // جمع کو بھیجنے والے کو واپس بھیجنے کے لیے یہاں _to اور _from کو تبدیل کر دیا گیا ہے
                _from,
                _amount,
                _data
            );

            // لیئر ۱ (l1) پل تک پیغام بھیجیں
            // سلدر-disable-next-line مکرر داخلہ-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // سلدر-disable-next-line مکرر داخلہ-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## نتیجہ {#conclusion}

معیاری پل اثاثوں کی منتقلی کے لیے سب سے لچکدار طریقہ کار ہے۔
تاہم، چونکہ یہ بہت عام ہے اس لیے اسے استعمال کرنا ہمیشہ سب سے آسان طریقہ کار نہیں ہوتا۔
خاص طور پر انخلا کے لیے، زیادہ تر صارفین [تھرڈ پارٹی پلوں](https://optimism.io/apps#bridge) کا استعمال کرنے کو ترجیح دیتے ہیں جو چیلنج کی مدت کا انتظار نہیں کرتے اور انخلا کو حتمی شکل دینے کے لیے مرکل ثبوت کی ضرورت نہیں ہوتی۔

یہ پل عام طور پر لیئر ۱ (l1) پر اثاثے رکھ کر کام کرتے ہیں، جو وہ فوری طور پر ایک چھوٹی سی فیس کے عوض فراہم کرتے ہیں (اکثر معیاری پل کے انخلا کے لیے گیس کی قیمت سے بھی کم)۔
جب پل (یا اسے چلانے والے لوگ) لیئر ۱ (l1) کے اثاثوں کی کمی کی توقع کرتے ہیں تو یہ لیئر ۲ (l2) سے کافی اثاثے منتقل کرتا ہے۔ چونکہ یہ بہت بڑے انخلا ہوتے ہیں، اس لیے انخلا کی لاگت ایک بڑی رقم پر تقسیم ہو جاتی ہے اور یہ بہت کم فیصد ہوتی ہے۔

امید ہے کہ اس مضمون نے آپ کو یہ سمجھنے میں مدد کی ہوگی کہ لیئر ۲ (l2) کیسے کام کرتی ہے، اور <span dir="ltr">Solidity</span> کوڈ کیسے لکھا جائے جو واضح اور محفوظ ہو۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔