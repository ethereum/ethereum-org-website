---
title: "آپٹیمزم (Optimism) کے معیاری برج کنٹریکٹ کا جائزہ"
description: "آپٹیمزم کا معیاری برج کیسے کام کرتا ہے؟ یہ اس طرح کیوں کام کرتا ہے؟"
author: "اوری پومرانٹز"
tags: ["Solidity", "برج", "لیئر 2"]
skill: intermediate
breadcrumb: "آپٹیمزم برج"
published: 2022-03-30
lang: ur
---

[آپٹیمزم (Optimism)](https://www.optimism.io/) ایک [آپٹیمسٹک رول اپ (Optimistic Rollup)](/developers/docs/scaling/optimistic-rollups/) ہے۔
آپٹیمسٹک رول اپس ایتھیریم مین نیٹ (جسے لیئر 1 یا L1 بھی کہا جاتا ہے) کے مقابلے میں بہت کم قیمت پر ٹرانزیکشنز پروسیس کر سکتے ہیں کیونکہ ٹرانزیکشنز نیٹ ورک کے ہر نوڈ کے بجائے صرف چند نوڈز کے ذریعے پروسیس کی جاتی ہیں۔
ایک ہی وقت میں، تمام ڈیٹا L1 پر لکھا جاتا ہے تاکہ مین نیٹ کی سالمیت اور دستیابی کی تمام ضمانتوں کے ساتھ ہر چیز کو ثابت اور دوبارہ تشکیل دیا جا سکے۔

آپٹیمزم (یا کسی دوسرے L2) پر L1 اثاثے استعمال کرنے کے لیے، اثاثوں کو [برج (bridged)](/bridges/#prerequisites) کرنے کی ضرورت ہوتی ہے۔
اسے حاصل کرنے کا ایک طریقہ یہ ہے کہ صارفین L1 پر اثاثے (ETH اور [ERC-20 ٹوکنز](/developers/docs/standards/tokens/erc-20/) سب سے عام ہیں) لاک کریں، اور L2 پر استعمال کرنے کے لیے مساوی اثاثے حاصل کریں۔
بالآخر، جس کے پاس بھی یہ اثاثے ہوں گے وہ انہیں واپس L1 پر برج کرنا چاہے گا۔
ایسا کرتے وقت، اثاثے L2 پر برن (burn) کر دیے جاتے ہیں اور پھر L1 پر صارف کو واپس جاری کر دیے جاتے ہیں۔

[آپٹیمزم کا معیاری برج](https://docs.optimism.io/app-developers/bridging/standard-bridge) اسی طرح کام کرتا ہے۔
اس مضمون میں ہم اس برج کے سورس کوڈ کا جائزہ لیں گے تاکہ یہ دیکھا جا سکے کہ یہ کیسے کام کرتا ہے اور اسے اچھی طرح سے لکھے گئے Solidity کوڈ کی ایک مثال کے طور پر پڑھیں گے۔

## کنٹرول فلوز (Control flows) {#control-flows}

برج کے دو اہم فلوز ہیں:

- ڈپازٹ (L1 سے L2 تک)
- ودڈراول (L2 سے L1 تک)

### ڈپازٹ فلو {#deposit-flow}

#### لیئر 1 {#deposit-flow-layer-1}

1. اگر کوئی ERC-20 ڈپازٹ کر رہا ہے، تو ڈپازٹ کرنے والا برج کو جمع کی جانے والی رقم خرچ کرنے کا الاؤنس (allowance) دیتا ہے۔
2. ڈپازٹ کرنے والا L1 برج کو کال کرتا ہے (`depositERC20`، `depositERC20To`، `depositETH`، یا `depositETHTo`)
3. L1 برج برج کیے گئے اثاثے کا قبضہ لے لیتا ہے
   - ETH: اثاثہ ڈپازٹ کرنے والے کے ذریعے کال کے حصے کے طور پر منتقل کیا جاتا ہے
   - ERC-20: اثاثہ برج کے ذریعے ڈپازٹ کرنے والے کے فراہم کردہ الاؤنس کا استعمال کرتے ہوئے خود کو منتقل کیا جاتا ہے
4. L1 برج کراس ڈومین میسج میکانزم کا استعمال کرتے ہوئے L2 برج پر `finalizeDeposit` کو کال کرتا ہے

#### لیئر 2 {#deposit-flow-layer-2}

5. L2 برج تصدیق کرتا ہے کہ `finalizeDeposit` کی کال جائز ہے:
   - کراس ڈومین میسج کنٹریکٹ سے آئی ہے
   - اصل میں L1 پر موجود برج سے تھی
6. L2 برج چیک کرتا ہے کہ آیا L2 پر ERC-20 ٹوکن کنٹریکٹ درست ہے:
   - L2 کنٹریکٹ رپورٹ کرتا ہے کہ اس کا L1 ہم منصب وہی ہے جہاں سے L1 پر ٹوکن آئے تھے
   - L2 کنٹریکٹ رپورٹ کرتا ہے کہ یہ درست انٹرفیس کو سپورٹ کرتا ہے ([ERC-165 کا استعمال کرتے ہوئے](https://eips.ethereum.org/EIPS/eip-165))۔
7. اگر L2 کنٹریکٹ درست ہے، تو اسے مناسب ایڈریس پر مناسب تعداد میں ٹوکنز منٹ (mint) کرنے کے لیے کال کریں۔ اگر نہیں، تو صارف کو L1 پر ٹوکنز کلیم کرنے کی اجازت دینے کے لیے ودڈراول کا عمل شروع کریں۔

### ودڈراول فلو {#withdrawal-flow}

#### لیئر 2 {#withdrawal-flow-layer-2}

1. ودڈرا کرنے والا L2 برج کو کال کرتا ہے (`withdraw` یا `withdrawTo`)
2. L2 برج `msg.sender` سے تعلق رکھنے والے مناسب تعداد میں ٹوکنز کو برن کرتا ہے
3. L2 برج کراس ڈومین میسج میکانزم کا استعمال کرتے ہوئے L1 برج پر `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کو کال کرتا ہے

#### لیئر 1 {#withdrawal-flow-layer-1}

4. L1 برج تصدیق کرتا ہے کہ `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کی کال جائز ہے:
   - کراس ڈومین میسج میکانزم سے آئی ہے
   - اصل میں L2 پر موجود برج سے تھی
5. L1 برج مناسب اثاثہ (ETH یا ERC-20) مناسب ایڈریس پر منتقل کرتا ہے

## لیئر 1 کوڈ {#layer-1-code}

یہ وہ کوڈ ہے جو L1، یعنی ایتھیریم مین نیٹ پر چلتا ہے۔

### IL1ERC20Bridge {#IL1ERC20Bridge}

[یہ انٹرفیس یہاں بیان کیا گیا ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)۔
اس میں ERC-20 ٹوکنز کو برج کرنے کے لیے درکار فنکشنز اور تعریفیں شامل ہیں۔

```solidity
// SPDX-License-Identifier: MIT
```

[آپٹیمزم کا زیادہ تر کوڈ MIT لائسنس کے تحت جاری کیا گیا ہے](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)۔

```solidity
pragma solidity >0.5.0 <0.9.0;
```

لکھتے وقت Solidity کا تازہ ترین ورژن 0.8.12 ہے۔
جب تک ورژن 0.9.0 جاری نہیں ہوتا، ہم نہیں جانتے کہ یہ کوڈ اس کے ساتھ مطابقت رکھتا ہے یا نہیں۔

```solidity
/* *
 * @title IL1ERC20Bridge */
interface IL1ERC20Bridge {
    /* *********
     * ایونٹس *
     ********* */

    event ERC20DepositInitiated(
```

آپٹیمزم برج کی اصطلاح میں _ڈپازٹ_ کا مطلب L1 سے L2 میں منتقلی ہے، اور _ودڈراول_ کا مطلب L2 سے L1 میں منتقلی ہے۔

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

زیادہ تر معاملات میں L1 پر ERC-20 کا ایڈریس L2 پر مساوی ERC-20 کے ایڈریس جیسا نہیں ہوتا ہے۔
[آپ ٹوکن ایڈریسز کی فہرست یہاں دیکھ سکتے ہیں](https://static.optimism.io/optimism.tokenlist.json)۔
`chainId` 1 والا ایڈریس L1 (مین نیٹ) پر ہے اور `chainId` 10 والا ایڈریس L2 (آپٹیمزم) پر ہے۔
دیگر دو `chainId` ویلیوز کوون (Kovan) ٹیسٹ نیٹ ورک (42) اور آپٹیمسٹک کوون ٹیسٹ نیٹ ورک (69) کے لیے ہیں۔

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

ٹرانسفرز میں نوٹس شامل کرنا ممکن ہے، اس صورت میں انہیں ان ایونٹس میں شامل کیا جاتا ہے جو انہیں رپورٹ کرتے ہیں۔

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

ایک ہی برج کنٹریکٹ دونوں سمتوں میں ٹرانسفرز کو ہینڈل کرتا ہے۔
L1 برج کے معاملے میں، اس کا مطلب ڈپازٹس کا آغاز اور ودڈراولز کی تکمیل ہے۔

```solidity

    /* *******************
     * پبلک فنکشنز *
     ******************* */

    /* *
     * @dev متعلقہ L2 برج کنٹریکٹ کا ایڈریس حاصل کریں۔
     * @return متعلقہ L2 برج کنٹریکٹ کا ایڈریس۔ */
    function l2TokenBridge() external returns (address);
```

اس فنکشن کی واقعی ضرورت نہیں ہے، کیونکہ L2 پر یہ پہلے سے تعینات (predeployed) کنٹریکٹ ہے، اس لیے یہ ہمیشہ `0x4200000000000000000000000000000000000010` ایڈریس پر ہوتا ہے۔
یہ یہاں L2 برج کے ساتھ ہم آہنگی کے لیے ہے، کیونکہ L1 برج کا ایڈریس جاننا معمولی بات _نہیں_ ہے۔

```solidity
    /* *
     * @dev کالر کے L2 بیلنس میں ERC20 کی ایک رقم جمع (deposit) کریں۔
     * @param _l1Token اس L1 ERC20 کا ایڈریس جو ہم جمع کر رہے ہیں
     * @param _l2Token L1 کے متعلقہ L2 ERC20 کا ایڈریس
     * @param _amount جمع کرنے کے لیے ERC20 کی رقم
     * @param _l2Gas L2 پر ڈپازٹ مکمل کرنے کے لیے درکار گیس لمٹ (Gas limit)۔
     * @param _data L2 کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *        فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` پیرامیٹر L2 گیس کی وہ مقدار ہے جو ٹرانزیکشن کو خرچ کرنے کی اجازت ہے۔
[ایک مخصوص (اعلی) حد تک، یہ مفت ہے](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)، لہذا جب تک کہ ERC-20 کنٹریکٹ منٹنگ کے وقت کچھ واقعی عجیب نہ کرے، یہ کوئی مسئلہ نہیں ہونا چاہیے۔
یہ فنکشن اس عام صورتحال کا خیال رکھتا ہے، جہاں ایک صارف مختلف بلاک چین پر اسی ایڈریس پر اثاثوں کو برج کرتا ہے۔

```solidity
    /* *
     * @dev وصول کنندہ کے L2 بیلنس میں ERC20 کی ایک رقم جمع (deposit) کریں۔
     * @param _l1Token اس L1 ERC20 کا ایڈریس جو ہم جمع کر رہے ہیں
     * @param _l2Token L1 کے متعلقہ L2 ERC20 کا ایڈریس
     * @param _to L2 ایڈریس جس پر رقم بھیجنی ہے۔
     * @param _amount جمع کرنے کے لیے ERC20 کی رقم۔
     * @param _l2Gas L2 پر ڈپازٹ مکمل کرنے کے لیے درکار گیس لمٹ۔
     * @param _data L2 کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *        فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

یہ فنکشن تقریباً `depositERC20` جیسا ہی ہے، لیکن یہ آپ کو ERC-20 کو مختلف ایڈریس پر بھیجنے کی اجازت دیتا ہے۔

```solidity
    /* ************************
     * کراس چین فنکشنز *
     ************************ */

    /* *
     * @dev L2 سے L1 میں واپسی (withdrawal) مکمل کریں، اور وصول کنندہ کے L1 ERC20 ٹوکن کے بیلنس میں فنڈز جمع کریں۔
     * یہ کال ناکام ہو جائے گی اگر L2 سے شروع کی گئی واپسی کو حتمی شکل (finalized) نہیں دی گئی ہے۔
     *
     * @param _l1Token L1 ٹوکن کا ایڈریس جس کے لیے finalizeWithdrawal کرنا ہے۔
     * @param _l2Token L2 ٹوکن کا ایڈریس جہاں سے واپسی شروع کی گئی تھی۔
     * @param _from L2 ایڈریس جو ٹرانسفر شروع کر رہا ہے۔
     * @param _to L1 ایڈریس جس پر واپسی کی رقم جمع کرنی ہے۔
     * @param _amount جمع کرنے کے لیے ERC20 کی رقم۔
     * @param _data L2 پر بھیجنے والے کی طرف سے فراہم کردہ ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *   فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
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

آپٹیمزم میں ودڈراولز (اور L2 سے L1 تک کے دیگر پیغامات) دو مراحل پر مشتمل عمل ہیں:

1. L2 پر ایک ابتدائی ٹرانزیکشن۔
2. L1 پر ایک حتمی یا کلیم کرنے والی ٹرانزیکشن۔
   اس ٹرانزیکشن کو L2 ٹرانزیکشن کے لیے [فالٹ چیلنج پیریڈ](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) ختم ہونے کے بعد ہونا چاہیے۔

### IL1StandardBridge {#il1standardbridge}

[یہ انٹرفیس یہاں بیان کیا گیا ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)۔
اس فائل میں ETH کے لیے ایونٹ اور فنکشن کی تعریفیں شامل ہیں۔
یہ تعریفیں اوپر ERC-20 کے لیے `IL1ERC20Bridge` میں بیان کردہ تعریفوں سے بہت ملتی جلتی ہیں۔

برج انٹرفیس کو دو فائلوں کے درمیان تقسیم کیا گیا ہے کیونکہ کچھ ERC-20 ٹوکنز کو کسٹم پروسیسنگ کی ضرورت ہوتی ہے اور انہیں معیاری برج کے ذریعے ہینڈل نہیں کیا جا سکتا۔
اس طرح کسٹم برج جو ایسے ٹوکن کو ہینڈل کرتا ہے وہ `IL1ERC20Bridge` کو نافذ کر سکتا ہے اور اسے ETH کو بھی برج کرنے کی ضرورت نہیں ہوتی۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/* *
 * @title IL1StandardBridge */
interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * ایونٹس *
     ********* */
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

یہ ایونٹ تقریباً ERC-20 ورژن (`ERC20DepositInitiated`) جیسا ہی ہے، سوائے L1 اور L2 ٹوکن ایڈریسز کے۔
دیگر ایونٹس اور فنکشنز کے لیے بھی یہی سچ ہے۔

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * پبلک فنکشنز *
     ******************* */

    /* *
     * @dev کالر کے L2 بیلنس میں ETH کی ایک رقم جمع (deposit) کریں۔
            .
            .
            . */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /* *
     * @dev وصول کنندہ کے L2 بیلنس میں ETH کی ایک رقم جمع (deposit) کریں۔
            .
            .
            . */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * کراس چین فنکشنز *
     ************************ */

    /* *
     * @dev L2 سے L1 میں واپسی (withdrawal) مکمل کریں، اور وصول کنندہ کے L1 ETH ٹوکن کے بیلنس میں فنڈز جمع کریں۔ چونکہ صرف xDomainMessenger اس فنکشن کو کال کر سکتا ہے، اس لیے اسے کبھی بھی
     * واپسی کے حتمی ہونے سے پہلے کال نہیں کیا جائے گا۔
                .
                .
                . */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[یہ کنٹریکٹ](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) دونوں برجز ([L1](#the-l1-bridge-contract) اور [L2](#the-l2-bridge-contract)) کے ذریعے دوسری لیئر کو پیغامات بھیجنے کے لیے وراثت میں ملا ہے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* انٹرفیس امپورٹس */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) کنٹریکٹ کو بتاتا ہے کہ کراس ڈومین میسنجر کا استعمال کرتے ہوئے دوسری لیئر کو پیغامات کیسے بھیجنے ہیں۔
یہ کراس ڈومین میسنجر ایک بالکل الگ سسٹم ہے، اور اس پر ایک الگ مضمون بنتا ہے، جو مجھے امید ہے کہ میں مستقبل میں لکھوں گا۔

```solidity
/* *
 * @title CrossDomainEnabled
 * @dev کراس ڈومین کمیونیکیشن کرنے والے کنٹریکٹس کے لیے ہیلپر کنٹریکٹ
 *
 * استعمال شدہ کمپائلر: وراثت میں ملنے والے (inheriting) کنٹریکٹ کے ذریعے بیان کیا گیا ہے */
contract CrossDomainEnabled {
    /* ************
     * ویری ایبلز *
     ************ */

    // میسنجر کنٹریکٹ جو دوسرے ڈومین سے پیغامات بھیجنے اور وصول کرنے کے لیے استعمال ہوتا ہے۔
    address public messenger;

    /* **************
     * کنسٹرکٹر *
     ************** */

    /* *
     * @param _messenger موجودہ لیئر پر CrossDomainMessenger کا ایڈریس۔ */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

ایک پیرامیٹر جو کنٹریکٹ کو جاننے کی ضرورت ہے، وہ اس لیئر پر کراس ڈومین میسنجر کا ایڈریس ہے۔
یہ پیرامیٹر کنسٹرکٹر میں ایک بار سیٹ کیا جاتا ہے، اور کبھی تبدیل نہیں ہوتا۔

```solidity

    /* *********************
     * فنکشن موڈیفائرز *
     ********************* */

    /* *
     * یہ یقینی بناتا ہے کہ موڈیفائیڈ فنکشن کو صرف ایک مخصوص کراس ڈومین اکاؤنٹ ہی کال کر سکتا ہے۔
     * @param _sourceDomainAccount اصل ڈومین پر واحد اکاؤنٹ جو
     *  اس فنکشن کو کال کرنے کا مجاز ہے۔ */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

کراس ڈومین میسجنگ اس بلاک چین پر موجود کسی بھی کنٹریکٹ کے ذریعے قابل رسائی ہے جہاں یہ چل رہا ہے (یا تو ایتھیریم مین نیٹ یا آپٹیمزم)۔
لیکن ہمیں ہر طرف کے برج کی ضرورت ہے کہ وہ _صرف_ مخصوص پیغامات پر بھروسہ کرے اگر وہ دوسری طرف کے برج سے آتے ہیں۔

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

صرف مناسب کراس ڈومین میسنجر (`messenger`، جیسا کہ آپ نیچے دیکھتے ہیں) کے پیغامات پر بھروسہ کیا جا سکتا ہے۔

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

جس طرح کراس ڈومین میسنجر وہ ایڈریس فراہم کرتا ہے جس نے دوسری لیئر کے ساتھ پیغام بھیجا تھا وہ [`.xDomainMessageSender()` فنکشن](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128) ہے۔
جب تک اسے اس ٹرانزیکشن میں کال کیا جاتا ہے جو پیغام کے ذریعے شروع کی گئی تھی، یہ یہ معلومات فراہم کر سکتا ہے۔

ہمیں یہ یقینی بنانا ہوگا کہ ہمیں موصول ہونے والا پیغام دوسرے برج سے آیا ہے۔

```solidity

        _;
    }

    /* *********************
     * انٹرنل فنکشنز *
     ********************* */

    /* *
     * میسنجر حاصل کرتا ہے، عام طور پر اسٹوریج سے۔ یہ فنکشن اس صورت میں ظاہر کیا گیا ہے کہ اگر کسی چائلڈ کنٹریکٹ کو
     * اوور رائیڈ (override) کرنے کی ضرورت ہو۔
     * @return کراس ڈومین میسنجر کنٹریکٹ کا ایڈریس جسے استعمال کیا جانا چاہیے۔ */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

یہ فنکشن کراس ڈومین میسنجر واپس کرتا ہے۔
ہم `messenger` متغیر کے بجائے ایک فنکشن استعمال کرتے ہیں تاکہ اس سے وراثت میں ملنے والے کنٹریکٹس کو یہ بتانے کے لیے ایک الگورتھم استعمال کرنے کی اجازت دی جا سکے کہ کون سا کراس ڈومین میسنجر استعمال کرنا ہے۔

```solidity

    /* *
     * کسی دوسرے ڈومین پر موجود اکاؤنٹ کو پیغام بھیجتا ہے
     * @param _crossDomainTarget منزل کے ڈومین پر مطلوبہ وصول کنندہ
     * @param _message ہدف کو بھیجا جانے والا ڈیٹا (عام طور پر `onlyFromCrossDomainAccount()` والے فنکشن کے لیے calldata)
     * @param _gasLimit ہدف کے ڈومین پر پیغام کی وصولی کے لیے gasLimit۔ */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

آخر میں، وہ فنکشن جو دوسری لیئر کو پیغام بھیجتا ہے۔

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ایک جامد تجزیہ کار (static analyzer) ہے جسے آپٹیمزم ہر کنٹریکٹ پر کمزوریوں اور دیگر ممکنہ مسائل کو تلاش کرنے کے لیے چلاتا ہے۔
اس صورت میں، درج ذیل لائن دو کمزوریوں کو متحرک کرتی ہے:

1. [ری اینٹرنسی ایونٹس (Reentrancy events)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [بے ضرر ری اینٹرنسی (Benign reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

اس صورت میں ہم ری اینٹرنسی کے بارے میں فکر مند نہیں ہیں، ہم جانتے ہیں کہ `getCrossDomainMessenger()` ایک قابل اعتماد ایڈریس واپس کرتا ہے، یہاں تک کہ اگر Slither کے پاس یہ جاننے کا کوئی طریقہ نہیں ہے۔

### L1 برج کنٹریکٹ {#the-l1-bridge-contract}

[اس کنٹریکٹ کا سورس کوڈ یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

انٹرفیسز دیگر کنٹریکٹس کا حصہ ہو سکتے ہیں، اس لیے انہیں Solidity کے ورژنز کی ایک وسیع رینج کو سپورٹ کرنا ہوتا ہے۔
لیکن برج بذات خود ہمارا کنٹریکٹ ہے، اور ہم اس بارے میں سخت ہو سکتے ہیں کہ یہ کون سا Solidity ورژن استعمال کرتا ہے۔

```solidity
/* انٹرفیس امپورٹس */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) اور [IL1StandardBridge](#IL1StandardBridge) کی وضاحت اوپر کی گئی ہے۔

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ہمیں L2 پر معیاری برج کو کنٹرول کرنے کے لیے پیغامات بنانے دیتا ہے۔

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[یہ انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ہمیں ERC-20 کنٹریکٹس کو کنٹرول کرنے دیتا ہے۔
[آپ اس کے بارے میں مزید یہاں پڑھ سکتے ہیں](/developers/tutorials/erc20-annotated-code/#the-interface)۔

```solidity
/* لائبریری امپورٹس */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[جیسا کہ اوپر بیان کیا گیا ہے](#crossdomainenabled)، یہ کنٹریکٹ انٹرلیئر میسجنگ کے لیے استعمال ہوتا ہے۔

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) میں L2 کنٹریکٹس کے ایڈریسز ہیں جن کا ہمیشہ ایک ہی ایڈریس ہوتا ہے۔ اس میں L2 پر معیاری برج شامل ہے۔

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin کی ایڈریس یوٹیلیٹیز](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)۔ اس کا استعمال کنٹریکٹ ایڈریسز اور بیرونی ملکیت والے اکاؤنٹس (EOA) سے تعلق رکھنے والے ایڈریسز کے درمیان فرق کرنے کے لیے کیا جاتا ہے۔

نوٹ کریں کہ یہ کوئی مکمل حل نہیں ہے، کیونکہ براہ راست کالز اور کنٹریکٹ کے کنسٹرکٹر سے کی جانے والی کالز کے درمیان فرق کرنے کا کوئی طریقہ نہیں ہے، لیکن کم از کم یہ ہمیں صارف کی کچھ عام غلطیوں کی نشاندہی کرنے اور انہیں روکنے کی اجازت دیتا ہے۔

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 معیار](https://eips.ethereum.org/EIPS/eip-20) کنٹریکٹ کے لیے ناکامی کی اطلاع دینے کے دو طریقوں کو سپورٹ کرتا ہے:

1. ریورٹ (Revert)
2. `false` واپس کرنا

دونوں صورتوں کو ہینڈل کرنے سے ہمارا کوڈ مزید پیچیدہ ہو جائے گا، اس لیے اس کے بجائے ہم [OpenZeppelin کا `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) استعمال کرتے ہیں، جو اس بات کو یقینی بناتا ہے کہ [تمام ناکامیوں کا نتیجہ ریورٹ کی صورت میں نکلے](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)۔

```solidity
/* *
 * @title L1StandardBridge
 * @dev L1 ETH اور ERC20 برج ایک ایسا کنٹریکٹ ہے جو جمع شدہ L1 فنڈز اور معیاری
 * ٹوکنز کو اسٹور کرتا ہے جو L2 پر استعمال ہو رہے ہیں۔ یہ متعلقہ L2 برج کو ہم آہنگ (synchronize) کرتا ہے، اسے ڈپازٹس کے بارے میں مطلع کرتا ہے
 * اور نئی حتمی شکل دی گئی واپسیوں (withdrawals) کے لیے اسے سنتا ہے۔
 * */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

یہ لائن بتاتی ہے کہ جب بھی ہم `IERC20` انٹرفیس استعمال کرتے ہیں تو ہم `SafeERC20` ریپر (wrapper) استعمال کرنے کی وضاحت کیسے کرتے ہیں۔

```solidity

    /* *******************************
     * ایکسٹرنل کنٹریکٹ ریفرنسز *
     ******************************* */

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) کا ایڈریس۔

```solidity

    // L1 ٹوکن کو L2 ٹوکن سے میپ کرتا ہے تاکہ جمع شدہ L1 ٹوکن کا بیلنس معلوم کیا جا سکے
    mapping(address => mapping(address => uint256)) public deposits;
```

اس طرح کی ڈبل [میپنگ (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) وہ طریقہ ہے جس سے آپ [دو جہتی اسپارس ایرے (two-dimensional sparse array)](https://en.wikipedia.org/wiki/Sparse_matrix) کی وضاحت کرتے ہیں۔
اس ڈیٹا اسٹرکچر میں ویلیوز کی شناخت `deposit[L1 token addr][L2 token addr]` کے طور پر کی جاتی ہے۔
ڈیفالٹ ویلیو صفر ہے۔
صرف وہ سیلز جو مختلف ویلیو پر سیٹ ہوتے ہیں انہیں اسٹوریج میں لکھا جاتا ہے۔

```solidity

    /* **************
     * کنسٹرکٹر *
     ************** */

    // یہ کنٹریکٹ پراکسی کے پیچھے کام کرتا ہے، اس لیے کنسٹرکٹر کے پیرامیٹرز استعمال نہیں ہوں گے۔
    constructor() CrossDomainEnabled(address(0)) {}
```

ہم اس کنٹریکٹ کو اپ گریڈ کرنے کے قابل ہونا چاہتے ہیں بغیر اسٹوریج میں موجود تمام متغیرات کو کاپی کیے.
ایسا کرنے کے لیے ہم ایک [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) استعمال کرتے ہیں، ایک کنٹریکٹ جو کالز کو ایک الگ کنٹریکٹ میں منتقل کرنے کے لیے [`delegatecall`](https://solidity-by-example.org/delegatecall/) کا استعمال کرتا ہے جس کا ایڈریس پراکسی کنٹریکٹ کے ذریعے اسٹور کیا جاتا ہے (جب آپ اپ گریڈ کرتے ہیں تو آپ پراکسی کو وہ ایڈریس تبدیل کرنے کے لیے کہتے ہیں)۔
جب آپ `delegatecall` استعمال کرتے ہیں تو اسٹوریج _کال کرنے والے_ کنٹریکٹ کا اسٹوریج ہی رہتا ہے، اس لیے تمام کنٹریکٹ اسٹیٹ متغیرات کی ویلیوز متاثر نہیں ہوتیں۔

اس پیٹرن کا ایک اثر یہ ہے کہ اس کنٹریکٹ کا اسٹوریج جو `delegatecall` کا _کال کیا گیا_ ہے استعمال نہیں ہوتا اور اس لیے اسے پاس کی گئی کنسٹرکٹر ویلیوز سے کوئی فرق نہیں پڑتا۔
یہی وجہ ہے کہ ہم `CrossDomainEnabled` کنسٹرکٹر کو ایک بے معنی ویلیو فراہم کر سکتے ہیں۔
یہی وجہ ہے کہ ذیل میں دی گئی انیشلائزیشن کنسٹرکٹر سے الگ ہے۔

```solidity
    /* *****************
     * انیشلائزیشن *
     ***************** */

    /* *
     * @param _l1messenger کراس چین کمیونیکیشن کے لیے استعمال ہونے والا L1 میسنجر کا ایڈریس۔
     * @param _l2TokenBridge L2 اسٹینڈرڈ برج کا ایڈریس۔ */
    // slither-disable-next-line external-function
```

یہ [Slither ٹیسٹ](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ان فنکشنز کی نشاندہی کرتا ہے جنہیں کنٹریکٹ کوڈ سے کال نہیں کیا جاتا اور اس لیے انہیں `public` کے بجائے `external` قرار دیا جا سکتا ہے۔
`external` فنکشنز کی گیس لاگت کم ہو سکتی ہے، کیونکہ انہیں کال ڈیٹا (calldata) میں پیرامیٹرز فراہم کیے جا سکتے ہیں۔
`public` قرار دیے گئے فنکشنز کو کنٹریکٹ کے اندر سے قابل رسائی ہونا چاہیے۔
کنٹریکٹس اپنے کال ڈیٹا میں ترمیم نہیں کر سکتے، اس لیے پیرامیٹرز کو میموری میں ہونا چاہیے۔
جب ایسے فنکشن کو بیرونی طور پر کال کیا جاتا ہے، تو کال ڈیٹا کو میموری میں کاپی کرنا ضروری ہوتا ہے، جس پر گیس خرچ ہوتی ہے۔
اس صورت میں فنکشن کو صرف ایک بار کال کیا جاتا ہے، اس لیے یہ غیر موثر ہونا ہمارے لیے اہمیت نہیں رکھتا۔

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` فنکشن کو صرف ایک بار کال کیا جانا چاہیے۔
اگر L1 کراس ڈومین میسنجر یا L2 ٹوکن برج کا ایڈریس تبدیل ہوتا ہے، تو ہم ایک نیا پراکسی اور ایک نیا برج بناتے ہیں جو اسے کال کرتا ہے۔
ایسا ہونے کا امکان نہیں ہے سوائے اس کے کہ جب پورا سسٹم اپ گریڈ ہو، جو کہ ایک بہت ہی نایاب واقعہ ہے۔

نوٹ کریں کہ اس فنکشن میں کوئی ایسا میکانزم نہیں ہے جو اس بات کو محدود کرے کہ اسے _کون_ کال کر سکتا ہے۔
اس کا مطلب یہ ہے کہ نظریاتی طور پر ایک حملہ آور اس وقت تک انتظار کر سکتا ہے جب تک کہ ہم پراکسی اور برج کا پہلا ورژن تعینات نہ کر دیں اور پھر جائز صارف سے پہلے `initialize` فنکشن تک پہنچنے کے لیے [فرنٹ رن (front-run)](https://solidity-by-example.org/hacks/front-running/) کرے۔ لیکن اسے روکنے کے دو طریقے ہیں:

1. اگر کنٹریکٹس براہ راست EOA کے ذریعے نہیں بلکہ [ایک ایسی ٹرانزیکشن میں تعینات کیے جاتے ہیں جس میں کوئی دوسرا کنٹریکٹ انہیں بناتا ہے](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) تو پورا عمل ایٹمی (atomic) ہو سکتا ہے، اور کسی بھی دوسری ٹرانزیکشن کے عمل میں آنے سے پہلے ختم ہو سکتا ہے۔
2. اگر `initialize` کی جائز کال ناکام ہو جاتی ہے تو نئے بنائے گئے پراکسی اور برج کو نظر انداز کرنا اور نئے بنانا ہمیشہ ممکن ہے۔

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

یہ وہ دو پیرامیٹرز ہیں جو برج کو جاننے کی ضرورت ہے۔

```solidity

    /* *************
     * ڈپازٹنگ *
     ************* */

    /* * @dev موڈیفائر جس کے لیے بھیجنے والے کا EOA ہونا ضروری ہے۔ اس چیک کو ایک بدنیتی پر مبنی
     *  کنٹریکٹ initcode کے ذریعے بائی پاس کر سکتا ہے، لیکن یہ اس صارف کی غلطی کو روکتا ہے جس سے ہم بچنا چاہتے ہیں۔ */
    modifier onlyEOA() {
        // کنٹریکٹس سے ڈپازٹس کو روکنے کے لیے استعمال کیا جاتا ہے (غلطی سے ٹوکنز کے ضائع ہونے سے بچنے کے لیے)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

یہی وجہ ہے کہ ہمیں OpenZeppelin کی `Address` یوٹیلیٹیز کی ضرورت تھی۔

```solidity
    /* *
     * @dev اس فنکشن کو بغیر کسی ڈیٹا کے کال کیا جا سکتا ہے
     * تاکہ کالر کے L2 بیلنس میں ETH کی ایک رقم جمع کی جا سکے۔
     * چونکہ receive فنکشن ڈیٹا نہیں لیتا، اس لیے ایک محتاط
     * ڈیفالٹ رقم L2 کو بھیج دی جاتی ہے۔ */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

یہ فنکشن ٹیسٹنگ کے مقاصد کے لیے موجود ہے۔
غور کریں کہ یہ انٹرفیس کی تعریفوں میں ظاہر نہیں ہوتا - یہ عام استعمال کے لیے نہیں ہے۔

```solidity
    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

یہ دو فنکشنز `_initiateETHDeposit` کے گرد ریپرز (wrappers) ہیں، وہ فنکشن جو اصل ETH ڈپازٹ کو ہینڈل کرتا ہے۔

```solidity
    /* *
     * @dev ETH کو اسٹور کر کے اور L2 ETH گیٹ وے کو ڈپازٹ کے بارے میں مطلع کر کے ڈپازٹس کی لاجک انجام دیتا ہے۔
     * @param _from وہ اکاؤنٹ جس سے L1 پر ڈپازٹ لیا جائے گا۔
     * @param _to وہ اکاؤنٹ جسے L2 پر ڈپازٹ دیا جائے گا۔
     * @param _l2Gas L2 پر ڈپازٹ مکمل کرنے کے لیے درکار گیس لمٹ۔
     * @param _data L2 کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *        فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit کال کے لیے calldata بنائیں
        bytes memory message = abi.encodeWithSelector(
```

کراس ڈومین پیغامات کے کام کرنے کا طریقہ یہ ہے کہ منزل کے کنٹریکٹ کو پیغام کے ساتھ اس کے کال ڈیٹا کے طور پر کال کیا جاتا ہے۔
Solidity کنٹریکٹس ہمیشہ اپنے کال ڈیٹا کی تشریح
[ABI تصریحات](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) کے مطابق کرتے ہیں۔
Solidity فنکشن [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) وہ کال ڈیٹا بناتا ہے۔

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

| پیرامیٹر | ویلیو                          | مطلب                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1 پر ETH (جو کہ ERC-20 ٹوکن نہیں ہے) کی نمائندگی کرنے کے لیے خصوصی ویلیو                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | L2 کنٹریکٹ جو آپٹیمزم پر ETH کا انتظام کرتا ہے، `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (یہ کنٹریکٹ صرف اندرونی آپٹیمزم کے استعمال کے لیے ہے) |
| \_from    | \_from                         | L1 پر وہ ایڈریس جو ETH بھیجتا ہے                                                                                                         |
| \_to      | \_to                           | L2 پر وہ ایڈریس جو ETH وصول کرتا ہے                                                                                                      |
| amount    | msg.value                      | بھیجے گئے wei کی مقدار (جو پہلے ہی برج کو بھیجی جا چکی ہے)                                                                               |
| \_data    | \_data                         | ڈپازٹ کے ساتھ منسلک کرنے کے لیے اضافی ڈیٹا                                                                                                     |

```solidity
        // calldata کو L2 میں بھیجیں
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

کراس ڈومین میسنجر کے ذریعے پیغام بھیجیں۔

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

کسی بھی ڈی سینٹرلائزڈ ایپلیکیشن کو مطلع کرنے کے لیے ایک ایونٹ ایمٹ (emit) کریں جو اس ٹرانسفر کو سنتی ہے۔

```solidity
    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

یہ دو فنکشنز `_initiateERC20Deposit` کے گرد ریپرز ہیں، وہ فنکشن جو اصل ERC-20 ڈپازٹ کو ہینڈل کرتا ہے۔

```solidity
    /* *
     * @dev L2 Deposited Token کنٹریکٹ کو ڈپازٹ کے بارے میں مطلع کر کے اور L1 فنڈز کو لاک کرنے کے لیے ہینڈلر کو کال کر کے (جیسے transferFrom) ڈپازٹس کی لاجک انجام دیتا ہے۔
     *
     * @param _l1Token اس L1 ERC20 کا ایڈریس جو ہم جمع کر رہے ہیں
     * @param _l2Token L1 کے متعلقہ L2 ERC20 کا ایڈریس
     * @param _from وہ اکاؤنٹ جس سے L1 پر ڈپازٹ لیا جائے گا
     * @param _to وہ اکاؤنٹ جسے L2 پر ڈپازٹ دیا جائے گا
     * @param _amount جمع کرنے کے لیے ERC20 کی رقم۔
     * @param _l2Gas L2 پر ڈپازٹ مکمل کرنے کے لیے درکار گیس لمٹ۔
     * @param _data L2 کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *        فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
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
پہلا فرق یہ ہے کہ یہ فنکشن ٹوکن ایڈریسز اور ٹرانسفر کی جانے والی رقم کو پیرامیٹرز کے طور پر وصول کرتا ہے۔
ETH کے معاملے میں برج کی کال میں پہلے ہی برج اکاؤنٹ میں اثاثے کی منتقلی شامل ہوتی ہے (`msg.value`)۔

```solidity
        // جب L1 پر ڈپازٹ شروع کیا جاتا ہے، تو L1 برج مستقبل کی
        // واپسیوں (withdrawals) کے لیے فنڈز اپنے پاس ٹرانسفر کر لیتا ہے۔ safeTransferFrom یہ بھی چیک کرتا ہے کہ آیا کنٹریکٹ میں کوڈ موجود ہے، لہذا یہ ناکام ہو جائے گا اگر
        // _from ایک EOA یا address(0) ہو۔
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 ٹوکن ٹرانسفرز ETH سے مختلف عمل کی پیروی کرتے ہیں:

1. صارف (`_from`) برج کو مناسب ٹوکنز منتقل کرنے کا الاؤنس دیتا ہے۔
2. صارف ٹوکن کنٹریکٹ کے ایڈریس، رقم وغیرہ کے ساتھ برج کو کال کرتا ہے۔
3. برج ڈپازٹ کے عمل کے حصے کے طور پر ٹوکنز (خود کو) منتقل کرتا ہے۔

پہلا قدم آخری دو سے الگ ٹرانزیکشن میں ہو سکتا ہے۔
تاہم، فرنٹ رننگ کوئی مسئلہ نہیں ہے کیونکہ وہ دو فنکشنز جو `_initiateERC20Deposit` کو کال کرتے ہیں (`depositERC20` اور `depositERC20To`) وہ صرف `msg.sender` کو `_from` پیرامیٹر کے طور پر استعمال کرتے ہوئے اس فنکشن کو کال کرتے ہیں۔

```solidity
        // _l2Token.finalizeDeposit(_to, _amount) کے لیے calldata بنائیں
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // calldata کو L2 میں بھیجیں
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

ٹوکنز کی جمع شدہ رقم کو `deposits` ڈیٹا اسٹرکچر میں شامل کریں۔
L2 پر ایک سے زیادہ ایڈریسز ہو سکتے ہیں جو ایک ہی L1 ERC-20 ٹوکن سے مطابقت رکھتے ہوں، اس لیے ڈپازٹس کا ٹریک رکھنے کے لیے L1 ERC-20 ٹوکن کے برج کے بیلنس کا استعمال کرنا کافی نہیں ہے۔

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * کراس چین فنکشنز *
     ************************ */

    /* *
     * @inheritdoc IL1StandardBridge */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 برج L2 کراس ڈومین میسنجر کو ایک پیغام بھیجتا ہے جس کی وجہ سے L1 کراس ڈومین میسنجر اس فنکشن کو کال کرتا ہے (یقیناً، ایک بار جب [پیغام کو حتمی شکل دینے والی ٹرانزیکشن](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 پر جمع ہو جاتی ہے)۔

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

یقینی بنائیں کہ یہ ایک _جائز_ پیغام ہے، جو کراس ڈومین میسنجر سے آ رہا ہے اور L2 ٹوکن برج سے شروع ہو رہا ہے۔
یہ فنکشن برج سے ETH نکالنے کے لیے استعمال ہوتا ہے، اس لیے ہمیں یہ یقینی بنانا ہوگا کہ اسے صرف مجاز کالر کے ذریعے کال کیا جائے۔

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH منتقل کرنے کا طریقہ یہ ہے کہ وصول کنندہ کو `msg.value` میں wei کی مقدار کے ساتھ کال کی جائے۔

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

ودڈراول کے بارے میں ایک ایونٹ ایمٹ کریں۔

```solidity
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

یہ فنکشن اوپر دیے گئے `finalizeETHWithdrawal` سے ملتا جلتا ہے، جس میں ERC-20 ٹوکنز کے لیے ضروری تبدیلیاں کی گئی ہیں۔

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ڈیٹا اسٹرکچر کو اپ ڈیٹ کریں۔

```solidity

        // جب L1 پر واپسی (withdrawal) کو حتمی شکل دی جاتی ہے، تو L1 برج فنڈز نکالنے والے کو ٹرانسفر کر دیتا ہے
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * عارضی - ETH کی منتقلی (Migrating ETH) *
     **************************** */

    /* *
     * @dev اکاؤنٹ میں ETH بیلنس کا اضافہ کرتا ہے۔ اس کا مقصد ETH کو
     * پرانے گیٹ وے سے نئے گیٹ وے پر منتقل کرنے کی اجازت دینا ہے۔
     * نوٹ: اسے صرف ایک اپ گریڈ کے لیے چھوڑا گیا ہے تاکہ ہم پرانے کنٹریکٹ سے
     * منتقل شدہ ETH وصول کر سکیں۔ */
    function donateETH() external payable {}
}
```

برج کا ایک ابتدائی نفاذ (implementation) تھا۔
جب ہم اس نفاذ سے اس کی طرف منتقل ہوئے، تو ہمیں تمام اثاثوں کو منتقل کرنا پڑا۔
ERC-20 ٹوکنز کو صرف منتقل کیا جا سکتا ہے۔
تاہم، کسی کنٹریکٹ میں ETH منتقل کرنے کے لیے آپ کو اس کنٹریکٹ کی منظوری کی ضرورت ہوتی ہے، جو کہ `donateETH` ہمیں فراہم کرتا ہے۔

## L2 پر ERC-20 ٹوکنز {#erc-20-tokens-on-l2}

کسی ERC-20 ٹوکن کو معیاری برج میں فٹ ہونے کے لیے، اسے معیاری برج، اور _صرف_ معیاری برج کو ٹوکن منٹ کرنے کی اجازت دینے کی ضرورت ہے۔
یہ ضروری ہے کیونکہ برجز کو یہ یقینی بنانے کی ضرورت ہوتی ہے کہ آپٹیمزم پر گردش کرنے والے ٹوکنز کی تعداد L1 برج کنٹریکٹ کے اندر مقفل ٹوکنز کی تعداد کے برابر ہے۔
اگر L2 پر بہت زیادہ ٹوکنز ہوں تو کچھ صارفین اپنے اثاثوں کو واپس L1 پر برج کرنے سے قاصر ہوں گے۔
ایک قابل اعتماد برج کے بجائے، ہم بنیادی طور پر [فریکشنل ریزرو بینکنگ (fractional reserve banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) کو دوبارہ بنائیں گے۔
اگر L1 پر بہت زیادہ ٹوکنز ہوں، تو ان میں سے کچھ ٹوکنز ہمیشہ کے لیے برج کنٹریکٹ کے اندر مقفل رہیں گے کیونکہ L2 ٹوکنز کو برن کیے بغیر انہیں جاری کرنے کا کوئی طریقہ نہیں ہے۔

### IL2StandardERC20 {#il2standarderc20}

L2 پر ہر ERC-20 ٹوکن جو معیاری برج استعمال کرتا ہے اسے [یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) فراہم کرنے کی ضرورت ہوتی ہے، جس میں وہ فنکشنز اور ایونٹس ہوتے ہیں جن کی معیاری برج کو ضرورت ہوتی ہے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[معیاری ERC-20 انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) میں `mint` اور `burn` فنکشنز شامل نہیں ہیں۔
ان طریقوں کی [ERC-20 معیار](https://eips.ethereum.org/EIPS/eip-20) کے ذریعہ ضرورت نہیں ہے، جو ٹوکن بنانے اور تباہ کرنے کے طریقہ کار کو غیر متعین چھوڑ دیتا ہے۔

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) کا استعمال یہ بتانے کے لیے کیا جاتا ہے کہ کنٹریکٹ کون سے فنکشنز فراہم کرتا ہے۔
[آپ معیار کو یہاں پڑھ سکتے ہیں](https://eips.ethereum.org/EIPS/eip-165)۔

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

یہ فنکشن L1 ٹوکن کا ایڈریس فراہم کرتا ہے جو اس کنٹریکٹ سے برج کیا گیا ہے۔
نوٹ کریں کہ ہمارے پاس مخالف سمت میں ایسا کوئی فنکشن نہیں ہے۔
ہمیں کسی بھی L1 ٹوکن کو برج کرنے کے قابل ہونے کی ضرورت ہے، قطع نظر اس کے کہ جب اسے نافذ کیا گیا تھا تو L2 سپورٹ کی منصوبہ بندی کی گئی تھی یا نہیں۔

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

ٹوکنز کو منٹ (بنانے) اور برن (تباہ کرنے) کے فنکشنز اور ایونٹس۔
برج واحد ہستی ہونی چاہیے جو ان فنکشنز کو چلا سکے تاکہ یہ یقینی بنایا جا سکے کہ ٹوکنز کی تعداد درست ہے (L1 پر مقفل ٹوکنز کی تعداد کے برابر)۔

### L2StandardERC20 {#L2StandardERC20}

[یہ `IL2StandardERC20` انٹرفیس کا ہمارا نفاذ ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)۔
جب تک کہ آپ کو کسی قسم کی کسٹم لاجک کی ضرورت نہ ہو، آپ کو اسے استعمال کرنا چاہیے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 کنٹریکٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)۔
آپٹیمزم پہیے کو دوبارہ ایجاد کرنے پر یقین نہیں رکھتا، خاص طور پر جب پہیے کا اچھی طرح سے آڈٹ کیا گیا ہو اور اسے اثاثے رکھنے کے لیے کافی قابل اعتماد ہونے کی ضرورت ہو۔

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

یہ وہ دو اضافی کنفیگریشن پیرامیٹرز ہیں جن کی ہمیں ضرورت ہوتی ہے اور ERC-20 کو عام طور پر نہیں ہوتی۔

```solidity

    /* *
     * @param _l2Bridge L2 اسٹینڈرڈ برج کا ایڈریس۔
     * @param _l1Token متعلقہ L1 ٹوکن کا ایڈریس۔
     * @param _name ERC20 کا نام۔
     * @param _symbol ERC20 کی علامت (symbol)۔ */
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

پہلے اس کنٹریکٹ کے لیے کنسٹرکٹر کو کال کریں جس سے ہم وراثت میں لیتے ہیں (`ERC20(_name, _symbol)`) اور پھر اپنے متغیرات سیٹ کریں۔

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

اس طرح [ERC-165](https://eips.ethereum.org/EIPS/eip-165) کام کرتا ہے۔
ہر انٹرفیس سپورٹڈ فنکشنز کی ایک تعداد ہے، اور ان فنکشنز کے [ABI فنکشن سلیکٹرز](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) کے [exclusive or](https://en.wikipedia.org/wiki/Exclusive_or) کے طور پر پہچانا جاتا ہے۔

L2 برج ERC-165 کو ایک سینیٹی چیک (sanity check) کے طور پر استعمال کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ جس ERC-20 کنٹریکٹ کو یہ اثاثے بھیجتا ہے وہ ایک `IL2StandardERC20` ہے۔

**نوٹ:** بدمعاش کنٹریکٹ کو `supportsInterface` کے غلط جوابات فراہم کرنے سے روکنے کے لیے کچھ نہیں ہے، اس لیے یہ ایک سینیٹی چیک میکانزم ہے، سیکیورٹی میکانزم _نہیں_۔

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

صرف L2 برج کو اثاثے منٹ اور برن کرنے کی اجازت ہے۔

`_mint` اور `_burn` دراصل [OpenZeppelin ERC-20 کنٹریکٹ](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) میں بیان کیے گئے ہیں۔
وہ کنٹریکٹ انہیں بیرونی طور پر ظاہر نہیں کرتا، کیونکہ ٹوکنز کو منٹ اور برن کرنے کی شرائط اتنی ہی مختلف ہیں جتنے ERC-20 کو استعمال کرنے کے طریقے۔

## L2 برج کوڈ {#l2-bridge-code}

یہ وہ کوڈ ہے جو آپٹیمزم پر برج چلاتا ہے۔
[اس کنٹریکٹ کا سورس یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* انٹرفیس امپورٹس */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) انٹرفیس اس [L1 مساوی](#IL1ERC20Bridge) سے بہت ملتا جلتا ہے جو ہم نے اوپر دیکھا۔
دو اہم فرق ہیں:

1. L1 پر آپ ڈپازٹس شروع کرتے ہیں اور ودڈراولز کو حتمی شکل دیتے ہیں۔
   یہاں آپ ودڈراولز شروع کرتے ہیں اور ڈپازٹس کو حتمی شکل دیتے ہیں۔
2. L1 پر ETH اور ERC-20 ٹوکنز کے درمیان فرق کرنا ضروری ہے۔
   L2 پر ہم دونوں کے لیے ایک ہی فنکشنز استعمال کر سکتے ہیں کیونکہ اندرونی طور پر آپٹیمزم پر ETH بیلنسز کو [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) ایڈریس کے ساتھ ERC-20 ٹوکن کے طور پر ہینڈل کیا جاتا ہے۔

```solidity
/* لائبریری امپورٹس */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* کنٹریکٹ امپورٹس */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/* *
 * @title L2StandardBridge
 * @dev L2 اسٹینڈرڈ برج ایک ایسا کنٹریکٹ ہے جو L1 اسٹینڈرڈ برج کے ساتھ مل کر کام کرتا ہے تاکہ
 * L1 اور L2 کے درمیان ETH اور ERC20 کی منتقلی کو ممکن بنایا جا سکے۔
 * یہ کنٹریکٹ نئے ٹوکنز کے لیے منٹر (minter) کے طور پر کام کرتا ہے جب اسے L1 اسٹینڈرڈ برج میں
 * ڈپازٹس کے بارے میں معلوم ہوتا ہے۔
 * یہ کنٹریکٹ واپسی (withdrawal) کے لیے مطلوبہ ٹوکنز کو برن (burn) کرنے کا کام بھی کرتا ہے، اور L1
 * برج کو L1 فنڈز جاری کرنے کی اطلاع دیتا ہے۔ */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * ایکسٹرنل کنٹریکٹ ریفرنسز *
     ******************************* */

    address public l1TokenBridge;
```

L1 برج کے ایڈریس کا ٹریک رکھیں۔
نوٹ کریں کہ L1 مساوی کے برعکس، یہاں ہمیں اس متغیر کی _ضرورت_ ہے۔
L1 برج کا ایڈریس پہلے سے معلوم نہیں ہوتا۔

```solidity

    /* **************
     * کنسٹرکٹر *
     ************** */

    /* *
     * @param _l2CrossDomainMessenger اس کنٹریکٹ کے ذریعے استعمال ہونے والا کراس ڈومین میسنجر۔
     * @param _l1TokenBridge مین چین پر تعینات (deployed) L1 برج کا ایڈریس۔ */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * ود ڈرائنگ (Withdrawing) *
     ************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /* *
     * @inheritdoc IL2ERC20Bridge */
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

یہ دو فنکشنز ودڈراولز شروع کرتے ہیں۔
نوٹ کریں کہ L1 ٹوکن ایڈریس بتانے کی کوئی ضرورت نہیں ہے۔
L2 ٹوکنز سے توقع کی جاتی ہے کہ وہ ہمیں L1 مساوی کا ایڈریس بتائیں گے۔

```solidity

    /* *
     * @dev ٹوکن کو برن کر کے اور L1 ٹوکن گیٹ وے کو واپسی (withdrawal) کے بارے میں مطلع کر کے
     *      واپسی کی لاجک انجام دیتا ہے۔
     * @param _l2Token L2 ٹوکن کا ایڈریس جہاں سے واپسی شروع کی گئی ہے۔
     * @param _from وہ اکاؤنٹ جس سے L2 پر واپسی لی جائے گی۔
     * @param _to وہ اکاؤنٹ جسے L1 پر واپسی دی جائے گی۔
     * @param _amount نکالنے کے لیے ٹوکن کی رقم۔
     * @param _l1Gas غیر استعمال شدہ، لیکن ممکنہ مستقبل کی مطابقت (forward compatibility) کے پیش نظر شامل کیا گیا ہے۔
     * @param _data L1 کو بھیجنے کے لیے اختیاری ڈیٹا۔ یہ ڈیٹا بیرونی کنٹریکٹس کی سہولت کے لیے
     *        فراہم کیا گیا ہے۔ زیادہ سے زیادہ لمبائی نافذ کرنے کے علاوہ، یہ کنٹریکٹس اس کے مواد کی کوئی ضمانت نہیں دیتے۔ */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // جب واپسی شروع کی جاتی ہے، تو ہم نکالنے والے کے فنڈز کو برن کر دیتے ہیں تاکہ بعد میں L2 پر
        // استعمال کو روکا جا سکے
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

غور کریں کہ ہم `_from` پیرامیٹر پر انحصار _نہیں_ کر رہے ہیں بلکہ `msg.sender` پر کر رہے ہیں جسے جعلی بنانا بہت مشکل ہے (جہاں تک میں جانتا ہوں، ناممکن ہے)۔

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) کے لیے calldata بنائیں
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1 پر ETH اور ERC-20 کے درمیان فرق کرنا ضروری ہے۔

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

        // L1 برج کو پیغام بھیجیں
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * کراس چین فنکشن: ڈپازٹنگ *
     *********************************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
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
یہ اہم ہے کیونکہ یہ فنکشن `_mint` کو کال کرتا ہے اور اسے ایسے ٹوکنز دینے کے لیے استعمال کیا جا سکتا ہے جو L1 پر برج کی ملکیت والے ٹوکنز کے ذریعے کور نہیں ہوتے۔

```solidity
        // چیک کریں کہ ٹارگٹ ٹوکن مطابقت رکھتا ہے (compliant) اور
        // تصدیق کریں کہ L1 پر جمع کیا گیا ٹوکن یہاں L2 کے جمع شدہ ٹوکن کی نمائندگی سے میل کھاتا ہے
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

سینیٹی چیکس (Sanity checks):

1. درست انٹرفیس سپورٹڈ ہے
2. L2 ERC-20 کنٹریکٹ کا L1 ایڈریس ٹوکنز کے L1 ذریعہ سے میل کھاتا ہے

```solidity
        ) {
            // جب ڈپازٹ کو حتمی شکل دی جاتی ہے، تو ہم L2 پر اکاؤنٹ میں اتنی ہی رقم کے
            // ٹوکنز جمع کر دیتے ہیں۔
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

اگر سینیٹی چیکس پاس ہو جاتے ہیں، تو ڈپازٹ کو حتمی شکل دیں:

1. ٹوکنز منٹ کریں
2. مناسب ایونٹ ایمٹ کریں

```solidity
        } else {
            // یا تو وہ L2 ٹوکن جس میں ڈپازٹ کیا جا رہا ہے، اپنے L1 ٹوکن کے درست ایڈریس کے بارے میں متفق نہیں ہے
            // یا درست انٹرفیس کو سپورٹ نہیں کرتا۔
            // ایسا صرف اس صورت میں ہونا چاہیے جب کوئی بدنیتی پر مبنی L2 ٹوکن ہو، یا اگر صارف نے کسی طرح
            // ڈپازٹ کرنے کے لیے غلط L2 ٹوکن ایڈریس بتا دیا ہو۔
            // دونوں صورتوں میں، ہم یہاں عمل کو روک دیتے ہیں اور ایک واپسی (withdrawal) کا
            // پیغام بناتے ہیں تاکہ صارفین کچھ صورتوں میں اپنے فنڈز نکال سکیں۔
            // بدنیتی پر مبنی ٹوکن کنٹریکٹس کو مکمل طور پر روکنے کا کوئی طریقہ نہیں ہے، لیکن یہ
            // صارف کی غلطی کو محدود کرتا ہے اور بدنیتی پر مبنی کنٹریکٹ کے کچھ رویوں کو کم کرتا ہے۔
```

اگر کسی صارف نے غلط L2 ٹوکن ایڈریس استعمال کر کے کوئی قابل شناخت غلطی کی ہے، تو ہم ڈپازٹ منسوخ کرنا اور L1 پر ٹوکنز واپس کرنا چاہتے ہیں۔
L2 سے ہم ایسا کرنے کا واحد طریقہ یہ ہے کہ ایک پیغام بھیجیں جسے فالٹ چیلنج پیریڈ کا انتظار کرنا پڑے گا، لیکن یہ صارف کے لیے ٹوکنز کو مستقل طور پر کھونے سے کہیں بہتر ہے۔

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // ڈپازٹ کو بھیجنے والے کو واپس بھیجنے (bounce back) کے لیے یہاں _to اور _from کو تبدیل کر دیا گیا ہے
                _from,
                _amount,
                _data
            );

            // L1 برج کو پیغام بھیجیں
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## نتیجہ {#conclusion}

معیاری برج اثاثوں کی منتقلی کے لیے سب سے لچکدار میکانزم ہے۔
تاہم، چونکہ یہ بہت عام (generic) ہے اس لیے اسے استعمال کرنا ہمیشہ سب سے آسان میکانزم نہیں ہوتا۔
خاص طور پر ودڈراولز کے لیے، زیادہ تر صارفین [تھرڈ پارٹی برجز](https://optimism.io/apps#bridge) استعمال کرنے کو ترجیح دیتے ہیں جو چیلنج پیریڈ کا انتظار نہیں کرتے اور ودڈراول کو حتمی شکل دینے کے لیے مرکل پروف (Merkle proof) کی ضرورت نہیں ہوتی۔

یہ برجز عام طور پر L1 پر اثاثے رکھ کر کام کرتے ہیں، جو وہ فوری طور پر ایک چھوٹی سی فیس کے عوض فراہم کرتے ہیں (اکثر معیاری برج ودڈراول کے لیے گیس کی لاگت سے کم)۔
جب برج (یا اسے چلانے والے لوگ) L1 اثاثوں کی کمی کی توقع کرتے ہیں تو یہ L2 سے کافی اثاثے منتقل کرتا ہے۔ چونکہ یہ بہت بڑے ودڈراولز ہوتے ہیں، اس لیے ودڈراول کی لاگت ایک بڑی رقم پر تقسیم ہو جاتی ہے اور یہ بہت کم فیصد ہوتی ہے۔

امید ہے کہ اس مضمون نے آپ کو یہ سمجھنے میں مدد کی ہوگی کہ لیئر 2 کیسے کام کرتی ہے، اور ایسا Solidity کوڈ کیسے لکھا جائے جو واضح اور محفوظ ہو۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔