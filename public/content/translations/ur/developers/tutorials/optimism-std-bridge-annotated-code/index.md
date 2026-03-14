---
title: "Optimism معیاری برج کنٹریکٹ واک تھرو"
description: "Optimism کے لیے معیاری برج کیسے کام کرتا ہے؟ یہ اس طرح کیوں کام کرتا ہے؟"
author: Ori Pomerantz
tags: [ "solidity", "برج", "لیئر 2" ]
skill: intermediate
published: 2022-03-30
lang: ur-in
---

[Optimism](https://www.optimism.io/) ایک [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/) ہے۔
Optimistic rollups ٹرانزیکشنز کو Ethereum Mainnet (جسے layer 1 یا L1 بھی کہا جاتا ہے) کے مقابلے میں بہت کم قیمت پر پراسیس کر سکتے ہیں کیونکہ ٹرانزیکشنز کو نیٹ ورک پر ہر نوڈ کے بجائے صرف چند نوڈز کے ذریعے پراسیس کیا جاتا ہے۔
ایک ہی وقت میں، تمام ڈیٹا L1 پر لکھا جاتا ہے تاکہ Mainnet کی تمام سالمیت اور دستیابی کی ضمانتوں کے ساتھ ہر چیز کو ثابت اور دوبارہ تعمیر کیا جا سکے۔

Optimism (یا کسی دوسرے L2) پر L1 اثاثے استعمال کرنے کے لیے، اثاثوں کو [bridged](/bridges/#prerequisites) کرنے کی ضرورت ہے۔
اس کو حاصل کرنے کا ایک طریقہ یہ ہے کہ صارفین L1 پر اثاثوں (ETH اور [ERC-20 tokens](/developers/docs/standards/tokens/erc-20/) سب سے عام ہیں) کو لاک کریں، اور L2 پر استعمال کرنے کے لیے مساوی اثاثے حاصل کریں۔
بالآخر، جو بھی ان کے ساتھ ختم ہوتا ہے وہ انہیں واپس L1 پر برج کرنا چاہے گا۔
ایسا کرتے وقت، اثاثے L2 پر جلا دیے جاتے ہیں اور پھر L1 پر صارف کو واپس جاری کر دیے جاتے ہیں۔

یہ وہ طریقہ ہے جس سے [Optimism standard bridge](https://docs.optimism.io/app-developers/bridging/standard-bridge) کام کرتا ہے۔
اس مضمون میں ہم اس برج کے سورس کوڈ کا جائزہ لیتے ہیں تاکہ یہ دیکھیں کہ یہ کیسے کام کرتا ہے اور اسے اچھی طرح سے لکھے گئے Solidity کوڈ کی مثال کے طور پر مطالعہ کریں۔

## کنٹرول فلو {#control-flows}

برج کے دو اہم فلو ہیں:

- ڈپازٹ (L1 سے L2 تک)
- واپسی (L2 سے L1 تک)

### ڈپازٹ فلو {#deposit-flow}

#### لیئر 1 {#deposit-flow-layer-1}

1. اگر ERC-20 جمع کر رہے ہیں، تو جمع کنندہ برج کو جمع کی جا رہی رقم خرچ کرنے کی اجازت دیتا ہے
2. جمع کنندہ L1 برج کو کال کرتا ہے (`depositERC20`, `depositERC20To`, `depositETH`, یا `depositETHTo`)
3. L1 برج برجڈ اثاثے کا قبضہ لیتا ہے
   - ETH: اثاثہ کال کے حصے کے طور پر جمع کنندہ کے ذریعے منتقل کیا جاتا ہے
   - ERC-20: اثاثہ برج کے ذریعے جمع کنندہ کی طرف سے فراہم کردہ الاؤنس کا استعمال کرتے ہوئے خود کو منتقل کیا جاتا ہے
4. L1 برج L2 برج پر `finalizeDeposit` کو کال کرنے کے لیے کراس ڈومین میسج میکانزم کا استعمال کرتا ہے

#### لیئر 2 {#deposit-flow-layer-2}

5. L2 برج `finalizeDeposit` کی کال کی تصدیق کرتا ہے کہ یہ جائز ہے:
   - کراس ڈومین میسج کنٹریکٹ سے آیا ہے
   - اصل میں L1 پر برج سے تھا
6. L2 برج چیک کرتا ہے کہ آیا L2 پر ERC-20 ٹوکن کنٹریکٹ درست ہے:
   - L2 کنٹریکٹ رپورٹ کرتا ہے کہ اس کا L1 ہم منصب وہی ہے جہاں سے L1 پر ٹوکن آئے تھے
   - L2 کنٹریکٹ رپورٹ کرتا ہے کہ یہ درست انٹرفیس کو سپورٹ کرتا ہے ([using ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. اگر L2 کنٹریکٹ درست ہے، تو اسے مناسب ایڈریس پر مناسب تعداد میں ٹوکن منٹ کرنے کے لیے کال کریں۔ اگر نہیں، تو صارف کو L1 پر ٹوکن کا دعویٰ کرنے کی اجازت دینے کے لیے واپسی کا عمل شروع کریں۔

### واپسی کا فلو {#withdrawal-flow}

#### لیئر 2 {#withdrawal-flow-layer-2}

1. واپس لینے والا L2 برج (`withdraw` یا `withdrawTo`) کو کال کرتا ہے
2. L2 برج `msg.sender` سے تعلق رکھنے والے ٹوکنز کی مناسب تعداد کو جلا دیتا ہے
3. L2 برج کراس ڈومین میسج میکانزم کا استعمال L1 برج پر `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کو کال کرنے کے لیے کرتا ہے

#### لیئر 1 {#withdrawal-flow-layer-1}

4. L1 برج `finalizeETHWithdrawal` یا `finalizeERC20Withdrawal` کی کال کی تصدیق کرتا ہے کہ یہ جائز ہے:
   - کراس ڈومین میسج میکانزم سے آیا ہے
   - اصل میں L2 پر برج سے تھا
5. L1 برج مناسب اثاثہ (ETH یا ERC-20) کو مناسب ایڈریس پر منتقل کرتا ہے

## لیئر 1 کوڈ {#layer-1-code}

یہ وہ کوڈ ہے جو L1، Ethereum Mainnet پر چلتا ہے۔

### IL1ERC20Bridge {#IL1ERC20Bridge}

[یہ انٹرفیس یہاں بیان کیا گیا ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)۔
اس میں ERC-20 ٹوکنز کو برج کرنے کے لیے درکار فنکشنز اور تعریفیں شامل ہیں۔

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism کا زیادہ تر کوڈ MIT لائسنس کے تحت جاری کیا گیا ہے](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

لکھنے کے وقت Solidity کا تازہ ترین ورژن 0.8.12 ہے۔
جب تک ورژن 0.9.0 جاری نہیں ہو جاتا، ہم نہیں جانتے کہ یہ کوڈ اس کے ساتھ مطابقت رکھتا ہے یا نہیں۔

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Optimism برج کی اصطلاح میں _ڈپازٹ_ کا مطلب L1 سے L2 میں منتقلی ہے، اور _واپسی_ کا مطلب L2 سے L1 میں منتقلی ہے۔

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

زیادہ تر معاملات میں L1 پر ERC-20 کا ایڈریس L2 پر مساوی ERC-20 کے ایڈریس کے برابر نہیں ہوتا ہے۔
[آپ ٹوکن ایڈریس کی فہرست یہاں دیکھ سکتے ہیں](https://static.optimism.io/optimism.tokenlist.json)۔
`chainId` 1 والا ایڈریس L1 (Mainnet) پر ہے اور `chainId` 10 والا ایڈریس L2 (Optimism) پر ہے۔
دیگر دو `chainId` قدریں Kovan ٹیسٹ نیٹ ورک (42) اور Optimistic Kovan ٹیسٹ نیٹ ورک (69) کے لیے ہیں۔

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

منتقلی میں نوٹس شامل کرنا ممکن ہے، اس صورت میں انہیں ان ایونٹس میں شامل کیا جاتا ہے جو ان کی رپورٹ کرتے ہیں۔

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

وہی برج کنٹریکٹ دونوں سمتوں میں منتقلی کو سنبھالتا ہے۔
L1 برج کے معاملے میں، اس کا مطلب ہے ڈپازٹ کا آغاز اور واپسی کی حتمی شکل۔

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

اس فنکشن کی واقعی ضرورت نہیں ہے، کیونکہ L2 پر یہ ایک پہلے سے تعینات کنٹریکٹ ہے، لہذا یہ ہمیشہ ایڈریس `0x4200000000000000000000000000000000000010` پر ہوتا ہے۔
یہاں L2 برج کے ساتھ ہم آہنگی کے لیے ہے، کیونکہ L1 برج کا ایڈریس جاننا معمولی بات نہیں ہے۔

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` پیرامیٹر L2 گیس کی وہ مقدار ہے جو ٹرانزیکشن خرچ کرنے کی اجازت ہے۔
[ایک مخصوص (اعلی) حد تک، یہ مفت ہے](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)، لہذا جب تک ERC-20 کنٹریکٹ منٹنگ کے وقت کچھ واقعی عجیب کام نہیں کرتا، یہ کوئی مسئلہ نہیں ہونا چاہئے۔
یہ فنکشن عام منظر نامے کا خیال رکھتا ہے، جہاں ایک صارف ایک مختلف بلاک چین پر ایک ہی ایڈریس پر اثاثوں کو برج کرتا ہے۔

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

یہ فنکشن تقریباً `depositERC20` جیسا ہی ہے، لیکن یہ آپ کو ERC-20 کو ایک مختلف ایڈریس پر بھیجنے دیتا ہے۔

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Optimism میں واپسی (اور L2 سے L1 تک کے دیگر پیغامات) دو مرحلوں کا عمل ہے:

1. L2 پر ایک ابتدائی ٹرانزیکشن۔
2. L1 پر ایک حتمی یا دعویٰ کرنے والی ٹرانزیکشن۔
   یہ ٹرانزیکشن L2 ٹرانزیکشن کے لیے [fault challenge period](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) کے ختم ہونے کے بعد ہونا ضروری ہے۔

### IL1StandardBridge {#il1standardbridge}

[یہ انٹرفیس یہاں بیان کیا گیا ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)۔
اس فائل میں ETH کے لیے ایونٹ اور فنکشن کی تعریفیں ہیں۔
یہ تعریفیں ERC-20 کے لیے اوپر `IL1ERC20Bridge` میں بیان کردہ تعریفوں سے بہت ملتی جلتی ہیں۔

برج انٹرفیس کو دو فائلوں کے درمیان تقسیم کیا گیا ہے کیونکہ کچھ ERC-20 ٹوکنز کو اپنی مرضی کے مطابق پروسیسنگ کی ضرورت ہوتی ہے اور معیاری برج کے ذریعے انہیں ہینڈل نہیں کیا جا سکتا۔
اس طرح کسٹم برج جو ایسے ٹوکن کو ہینڈل کرتا ہے وہ `IL1ERC20Bridge` کو لاگو کر سکتا ہے اور اسے ETH کو بھی برج کرنے کی ضرورت نہیں ہوتی ہے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

یہ ایونٹ تقریباً ERC-20 ورژن (`ERC20DepositInitiated`) جیسا ہی ہے، سوائے L1 اور L2 ٹوکن ایڈریس کے۔
دیگر ایونٹس اور فنکشنز کے لیے بھی یہی سچ ہے۔

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[یہ کنٹریکٹ](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) دونوں برجز ([L1](#the-l1-bridge-contract) اور [L2](#the-l2-bridge-contract)) کے ذریعے وراثت میں ملا ہے تاکہ دوسری لیئر کو پیغامات بھیج سکیں۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) کنٹریکٹ کو بتاتا ہے کہ کراس ڈومین میسنجر کا استعمال کرتے ہوئے دوسری لیئر کو پیغامات کیسے بھیجیں۔
یہ کراس ڈومین میسنجر ایک بالکل مختلف نظام ہے، اور اس کا اپنا مضمون ہونا چاہیے، جو مجھے امید ہے کہ مستقبل میں لکھوں گا۔

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

ایک پیرامیٹر جو کنٹریکٹ کو جاننے کی ضرورت ہے، وہ اس لیئر پر کراس ڈومین میسنجر کا ایڈریس ہے۔
یہ پیرامیٹر ایک بار کنسٹرکٹر میں سیٹ کیا جاتا ہے، اور کبھی تبدیل نہیں ہوتا ہے۔

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

کراس ڈومین میسجنگ بلاک چین پر کسی بھی کنٹریکٹ کے ذریعے قابل رسائی ہے جہاں یہ چل رہا ہے (یا تو Ethereum mainnet یا Optimism)۔
لیکن ہمیں ہر طرف برج کی ضرورت ہے تاکہ وہ _صرف_ کچھ پیغامات پر بھروسہ کرے اگر وہ دوسری طرف کے برج سے آتے ہیں۔

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

صرف مناسب کراس ڈومین میسنجر (`messenger`, جیسا کہ آپ نیچے دیکھتے ہیں) سے آنے والے پیغامات پر بھروسہ کیا جا سکتا ہے۔

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

کراس ڈومین میسنجر جس طرح سے دوسری لیئر کے ساتھ پیغام بھیجنے والے ایڈریس کو فراہم کرتا ہے وہ ہے [ `.xDomainMessageSender()` فنکشن](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)۔
جب تک اسے اس ٹرانزیکشن میں کال کیا جاتا ہے جو پیغام کے ذریعے شروع کی گئی تھی، یہ یہ معلومات فراہم کر سکتا ہے۔

ہمیں یہ یقینی بنانا ہوگا کہ ہمیں موصول ہونے والا پیغام دوسرے برج سے آیا ہے۔

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

یہ فنکشن کراس ڈومین میسنجر کو واپس کرتا ہے۔
ہم متغیر `messenger` کے بجائے ایک فنکشن استعمال کرتے ہیں تاکہ اس سے وراثت میں ملنے والے کنٹریکٹس کو ایک الگورتھم استعمال کرنے کی اجازت دی جا سکے تاکہ یہ بتایا جا سکے کہ کون سا کراس ڈومین میسنجر استعمال کرنا ہے۔

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

آخر میں، وہ فنکشن جو دوسری لیئر کو ایک پیغام بھیجتا ہے۔

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ایک جامد تجزیہ کار ہے جسے Optimism ہر کنٹریکٹ پر کمزوریوں اور دیگر ممکنہ مسائل کو تلاش کرنے کے لیے چلاتا ہے۔
اس معاملے میں، مندرجہ ذیل لائن دو کمزوریوں کو متحرک کرتی ہے:

1. [Reentrancy events](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Benign reentrancy](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

اس معاملے میں ہم reentrancy کے بارے میں فکر مند نہیں ہیں کیونکہ ہم جانتے ہیں کہ `getCrossDomainMessenger()` ایک قابل اعتماد ایڈریس واپس کرتا ہے، چاہے Slither کو یہ جاننے کا کوئی طریقہ نہ ہو۔

### L1 برج کنٹریکٹ {#the-l1-bridge-contract}

[اس کنٹریکٹ کا سورس کوڈ یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

انٹرفیس دوسرے کنٹریکٹس کا حصہ ہو سکتے ہیں، لہذا انہیں Solidity ورژن کی ایک وسیع رینج کو سپورٹ کرنا ہوگا۔
لیکن برج خود ہمارا کنٹریکٹ ہے، اور ہم اس بارے میں سخت ہو سکتے ہیں کہ یہ کون سا Solidity ورژن استعمال کرتا ہے۔

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) اور [IL1StandardBridge](#IL1StandardBridge) اوپر بیان کیے گئے ہیں۔

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
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[جیسا کہ اوپر بیان کیا گیا ہے](#crossdomainenabled)، یہ کنٹریکٹ انٹر لیئر میسجنگ کے لیے استعمال ہوتا ہے۔

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) میں L2 کنٹریکٹس کے ایڈریس ہیں جن کا ہمیشہ ایک ہی ایڈریس ہوتا ہے۔ اس میں L2 پر معیاری برج شامل ہے۔

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin کی ایڈریس یوٹیلیٹیز](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)۔ اس کا استعمال کنٹریکٹ ایڈریس اور بیرونی طور پر ملکیت والے اکاؤنٹس (EOA) سے تعلق رکھنے والوں کے درمیان فرق کرنے کے لیے کیا جاتا ہے۔

نوٹ کریں کہ یہ ایک بہترین حل نہیں ہے، کیونکہ براہ راست کالز اور کنٹریکٹ کے کنسٹرکٹر سے کی گئی کالز کے درمیان فرق کرنے کا کوئی طریقہ نہیں ہے، لیکن کم از کم یہ ہمیں کچھ عام صارف کی غلطیوں کی نشاندہی کرنے اور انہیں روکنے دیتا ہے۔

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 معیار](https://eips.ethereum.org/EIPS/eip-20) ایک کنٹریکٹ کے لیے ناکامی کی رپورٹ کرنے کے دو طریقے سپورٹ کرتا ہے:

1. واپس کریں
2. `false` واپس کریں

دونوں صورتوں کو ہینڈل کرنے سے ہمارا کوڈ مزید پیچیدہ ہو جائے گا، لہذا اس کے بجائے ہم [OpenZeppelin کا `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) استعمال کرتے ہیں، جو یقینی بناتا ہے کہ [تمام ناکامیوں کے نتیجے میں ایک ریورٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) ہو۔

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

یہ لائن ہے کہ ہم `IERC20` انٹرفیس استعمال کرتے وقت ہر بار `SafeERC20` ریپر استعمال کرنے کی وضاحت کیسے کرتے ہیں۔

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract) کا ایڈریس۔

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

اس طرح کی ایک ڈبل [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) وہ طریقہ ہے جس سے آپ ایک [دو جہتی اسپارس ارے](https://en.wikipedia.org/wiki/Sparse_matrix) کی تعریف کرتے ہیں۔
اس ڈیٹا ڈھانچے میں قدروں کی شناخت `deposit[L1 token addr][L2 token addr]` کے طور پر کی جاتی ہے۔
پہلے سے طے شدہ قدر صفر ہے۔
صرف وہ سیلز جو ایک مختلف قدر پر سیٹ ہیں اسٹوریج میں لکھے جاتے ہیں۔

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

اسٹوریج میں تمام متغیرات کو کاپی کیے بغیر اس کنٹریکٹ کو اپ گریڈ کرنے کے قابل ہونا چاہتے ہیں۔
ایسا کرنے کے لیے ہم ایک [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) کا استعمال کرتے ہیں، ایک کنٹریکٹ جو [`delegatecall`](https://solidity-by-example.org/delegatecall/) کا استعمال کرتا ہے تاکہ کالز کو ایک علیحدہ کنٹریکٹ میں منتقل کیا جا سکے جس کا ایڈریس پراکسی کنٹریکٹ کے ذریعے اسٹور کیا جاتا ہے (جب آپ اپ گریڈ کرتے ہیں تو آپ پراکسی کو اس ایڈریس کو تبدیل کرنے کے لیے کہتے ہیں)۔
جب آپ `delegatecall` استعمال کرتے ہیں تو اسٹوریج _کالنگ_ کنٹریکٹ کا اسٹوریج رہتا ہے، لہذا تمام کنٹریکٹ اسٹیٹ متغیرات کی قدریں غیر متاثر رہتی ہیں۔

اس پیٹرن کا ایک اثر یہ ہے کہ کنٹریکٹ کا اسٹوریج جو `delegatecall` کا _کال کیا گیا_ ہے استعمال نہیں ہوتا ہے اور اس لیے اسے بھیجی گئی کنسٹرکٹر قدریں کوئی معنی نہیں رکھتیں۔
یہی وجہ ہے کہ ہم `CrossDomainEnabled` کنسٹرکٹر کو ایک بے معنی قدر فراہم کر سکتے ہیں۔
یہی وجہ ہے کہ نیچے دی گئی شروعات کنسٹرکٹر سے الگ ہے۔

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

یہ [Slither ٹیسٹ](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ان فنکشنز کی نشاندہی کرتا ہے جو کنٹریکٹ کوڈ سے کال نہیں کیے جاتے ہیں اور اس لیے انہیں `public` کے بجائے `external` قرار دیا جا سکتا ہے۔
`external` فنکشنز کی گیس کی لاگت کم ہو سکتی ہے، کیونکہ انہیں کال ڈیٹا میں پیرامیٹرز فراہم کیے جا سکتے ہیں۔
`public` قرار دیے گئے فنکشنز کو کنٹریکٹ کے اندر سے قابل رسائی ہونا چاہیے۔
کنٹریکٹس اپنے کال ڈیٹا میں ترمیم نہیں کر سکتے، لہذا پیرامیٹرز میموری میں ہونے چاہئیں۔
جب ایسے فنکشن کو بیرونی طور پر کال کیا جاتا ہے، تو کال ڈیٹا کو میموری میں کاپی کرنا ضروری ہوتا ہے، جس میں گیس خرچ ہوتی ہے۔
اس معاملے میں فنکشن صرف ایک بار کال کیا جاتا ہے، لہذا نااہلی ہمارے لیے کوئی معنی نہیں رکھتی۔

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` فنکشن کو صرف ایک بار کال کیا جانا چاہیے۔
اگر L1 کراس ڈومین میسنجر یا L2 ٹوکن برج کا ایڈریس تبدیل ہوتا ہے، تو ہم ایک نیا پراکسی اور ایک نیا برج بناتے ہیں جو اسے کال کرتا ہے۔
یہ ہونے کا امکان نہیں ہے سوائے اس کے کہ جب پورا نظام اپ گریڈ کیا جائے، جو کہ ایک بہت ہی نایاب واقعہ ہے۔

نوٹ کریں کہ اس فنکشن میں کوئی ایسا میکانزم نہیں ہے جو اس بات کو محدود کرے کہ اسے _کون_ کال کر سکتا ہے۔
اس کا مطلب ہے کہ نظریاتی طور پر ایک حملہ آور اس وقت تک انتظار کر سکتا ہے جب تک کہ ہم پراکسی اور برج کا پہلا ورژن تعینات نہ کر دیں اور پھر [front-run](https://solidity-by-example.org/hacks/front-running/) کریں تاکہ جائز صارف سے پہلے `initialize` فنکشن تک پہنچ سکیں۔ لیکن اسے روکنے کے دو طریقے ہیں:

1. اگر کنٹریکٹس براہ راست EOA کے ذریعے نہیں بلکہ [ایک ٹرانزیکشن میں جس میں دوسرا کنٹریکٹ انہیں بناتا ہے](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) تعینات کیے گئے ہیں تو پورا عمل ایٹمی ہو سکتا ہے، اور کسی بھی دوسری ٹرانزیکشن کے عملدرآمد سے پہلے ختم ہو سکتا ہے۔
2. اگر `initialize` کی جائز کال ناکام ہو جاتی ہے تو نئے بنائے گئے پراکسی اور برج کو نظر انداز کرنا اور نئے بنانا ہمیشہ ممکن ہوتا ہے۔

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

یہ وہ دو پیرامیٹرز ہیں جو برج کو جاننے کی ضرورت ہے۔

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

یہی وجہ ہے کہ ہمیں OpenZeppelin کی `Address` یوٹیلیٹیز کی ضرورت تھی۔

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

یہ فنکشن جانچ کے مقاصد کے لیے موجود ہے۔
نوٹ کریں کہ یہ انٹرفیس کی تعریفوں میں ظاہر نہیں ہوتا - یہ عام استعمال کے لیے نہیں ہے۔

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

یہ دو فنکشنز `_initiateETHDeposit` کے ارد گرد ریپر ہیں، وہ فنکشن جو اصل ETH ڈپازٹ کو ہینڈل کرتا ہے۔

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

کراس ڈومین پیغامات جس طرح کام کرتے ہیں وہ یہ ہے کہ منزل کا کنٹریکٹ پیغام کے ساتھ اس کے کال ڈیٹا کے طور پر کال کیا جاتا ہے۔
Solidity کنٹریکٹس ہمیشہ اپنے کال ڈیٹا کی تشریح
[ABI وضاحتوں](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) کے مطابق کرتے ہیں۔
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

یہاں پیغام یہ ہے کہ ان پیرامیٹرز کے ساتھ [`finalizeDeposit` فنکشن](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) کو کال کریں:

| پیرامیٹر                        | قدر                                                                                      | مطلب                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | L1 پر ETH (جو کہ ERC-20 ٹوکن نہیں ہے) کے لیے کھڑے ہونے کی خاص قدر                                                                                |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism پر ETH کا انتظام کرنے والا L2 کنٹریکٹ، `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (یہ کنٹریکٹ صرف اندرونی Optimism استعمال کے لیے ہے) |
| \_from    | \_from                                                             | L1 پر وہ ایڈریس جو ETH بھیجتا ہے                                                                                                                                    |
| \_to      | \_to                                                               | L2 پر وہ ایڈریس جو ETH وصول کرتا ہے                                                                                                                                 |
| رقم                             | msg.value                                                                | بھیجے گئے wei کی رقم (جو پہلے ہی برج کو بھیجی جا چکی ہے)                                                                                         |
| \_data    | \_data                                                             | ڈپازٹ کے ساتھ منسلک کرنے کے لیے اضافی ڈیٹا                                                                                                                          |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

کراس ڈومین میسنجر کے ذریعے پیغام بھیجیں۔

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

اس منتقلی کے بارے میں سننے والی کسی بھی وکندریقرت ایپلیکیشن کو مطلع کرنے کے لیے ایک ایونٹ خارج کریں۔

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

یہ دو فنکشنز `_initiateERC20Deposit` کے ارد گرد ریپر ہیں، وہ فنکشن جو اصل ERC-20 ڈپازٹ کو ہینڈل کرتا ہے۔

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g., transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

یہ فنکشن اوپر `_initiateETHDeposit` سے ملتا جلتا ہے، چند اہم فرق کے ساتھ۔
پہلا فرق یہ ہے کہ یہ فنکشن ٹوکن ایڈریس اور منتقل کرنے کی رقم پیرامیٹرز کے طور پر وصول کرتا ہے۔
ETH کے معاملے میں برج کو کال میں پہلے ہی برج اکاؤنٹ (`msg.value`) میں اثاثے کی منتقلی شامل ہے۔

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 ٹوکن کی منتقلی ETH سے ایک مختلف عمل کی پیروی کرتی ہے:

1. صارف (`_from`) برج کو مناسب ٹوکن منتقل کرنے کی اجازت دیتا ہے۔
2. صارف برج کو ٹوکن کنٹریکٹ کے ایڈریس، رقم وغیرہ کے ساتھ کال کرتا ہے۔
3. برج ڈپازٹ کے عمل کے حصے کے طور پر ٹوکن (خود کو) منتقل کرتا ہے۔

پہلا قدم آخری دو سے الگ ٹرانزیکشن میں ہو سکتا ہے۔
تاہم، فرنٹ رننگ کوئی مسئلہ نہیں ہے کیونکہ دو فنکشنز جو `_initiateERC20Deposit` (`depositERC20` اور `depositERC20To`) کو کال کرتے ہیں وہ اس فنکشن کو صرف `msg.sender` کے ساتھ `_from` پیرامیٹر کے طور پر کال کرتے ہیں۔

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

جمع شدہ ٹوکن کی رقم `deposits` ڈیٹا ڈھانچے میں شامل کریں۔
L2 پر متعدد ایڈریس ہو سکتے ہیں جو ایک ہی L1 ERC-20 ٹوکن کے مطابق ہوں، لہذا ڈپازٹ کا ٹریک رکھنے کے لیے برج کے L1 ERC-20 ٹوکن کے بیلنس کا استعمال کافی نہیں ہے۔

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

L2 برج L2 کراس ڈومین میسنجر کو ایک پیغام بھیجتا ہے جس کی وجہ سے L1 کراس ڈومین میسنجر اس فنکشن کو کال کرتا ہے (ایک بار جب [وہ ٹرانزیکشن جو پیغام کو حتمی شکل دیتا ہے](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1 پر جمع ہو جاتا ہے، یقیناً)۔

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

یقینی بنائیں کہ یہ ایک _جائز_ پیغام ہے، جو کراس ڈومین میسنجر سے آرہا ہے اور L2 ٹوکن برج سے شروع ہو رہا ہے۔
یہ فنکشن برج سے ETH نکالنے کے لیے استعمال ہوتا ہے، لہذا ہمیں یہ یقینی بنانا ہوگا کہ اسے صرف مجاز کالر کے ذریعے ہی کال کیا جائے۔

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH منتقل کرنے کا طریقہ یہ ہے کہ وصول کنندہ کو `msg.value` میں wei کی رقم کے ساتھ کال کریں۔

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

واپسی کے بارے میں ایک ایونٹ خارج کریں۔

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

یہ فنکشن اوپر `finalizeETHWithdrawal` سے ملتا جلتا ہے، ERC-20 ٹوکنز کے لیے ضروری تبدیلیوں کے ساتھ۔

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ڈیٹا ڈھانچے کو اپ ڈیٹ کریں۔

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

برج کا ایک پہلے کا نفاذ تھا۔
جب ہم نفاذ سے اس کی طرف منتقل ہوئے، تو ہمیں تمام اثاثے منتقل کرنے پڑے۔
ERC-20 ٹوکن صرف منتقل کیے جا سکتے ہیں۔
تاہم، ایک کنٹریکٹ میں ETH منتقل کرنے کے لیے آپ کو اس کنٹریکٹ کی منظوری کی ضرورت ہے، جو کہ `donateETH` ہمیں فراہم کرتا ہے۔

## L2 پر ERC-20 ٹوکنز {#erc-20-tokens-on-l2}

ایک ERC-20 ٹوکن کو معیاری برج میں فٹ ہونے کے لیے، اسے معیاری برج، اور _صرف_ معیاری برج کو ٹوکن منٹ کرنے کی اجازت دینی ہوگی۔
یہ ضروری ہے کیونکہ برجز کو یہ یقینی بنانا ہوگا کہ Optimism پر گردش کرنے والے ٹوکنز کی تعداد L1 برج کنٹریکٹ کے اندر لاک کیے گئے ٹوکنز کی تعداد کے برابر ہو۔
اگر L2 پر بہت زیادہ ٹوکنز ہیں تو کچھ صارفین اپنے اثاثوں کو L1 پر واپس برج نہیں کر پائیں گے۔
ایک قابل اعتماد برج کے بجائے، ہم بنیادی طور پر [فرکشنل ریزرو بینکنگ](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) کو دوبارہ بنائیں گے۔
اگر L1 پر بہت زیادہ ٹوکنز ہیں، تو ان میں سے کچھ ٹوکنز برج کنٹریکٹ کے اندر ہمیشہ کے لیے لاک ہو جائیں گے کیونکہ L2 ٹوکنز کو جلائے بغیر انہیں جاری کرنے کا کوئی طریقہ نہیں ہے۔

### IL2StandardERC20 {#il2standarderc20}

L2 پر ہر ERC-20 ٹوکن جو معیاری برج کا استعمال کرتا ہے اسے [یہ انٹرفیس](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) فراہم کرنا ہوگا، جس میں وہ فنکشنز اور ایونٹس ہیں جن کی معیاری برج کو ضرورت ہے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[معیاری ERC-20 انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) میں `mint` اور `burn` فنکشنز شامل نہیں ہیں۔
ان طریقوں کی ضرورت [ERC-20 معیار](https://eips.ethereum.org/EIPS/eip-20) کے ذریعہ نہیں ہے، جو ٹوکن بنانے اور تباہ کرنے کے میکانزم کو غیر متعین چھوڑ دیتا ہے۔

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 انٹرفیس](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) اس بات کی وضاحت کے لیے استعمال ہوتا ہے کہ ایک کنٹریکٹ کون سے فنکشنز فراہم کرتا ہے۔
[آپ معیار یہاں پڑھ سکتے ہیں](https://eips.ethereum.org/EIPS/eip-165)۔

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

یہ فنکشن L1 ٹوکن کا ایڈریس فراہم کرتا ہے جو اس کنٹریکٹ سے برجڈ ہے۔
نوٹ کریں کہ ہمارے پاس مخالف سمت میں اسی طرح کا فنکشن نہیں ہے۔
ہمیں کسی بھی L1 ٹوکن کو برج کرنے کے قابل ہونے کی ضرورت ہے، چاہے L2 سپورٹ کی منصوبہ بندی کی گئی ہو یا نہیں جب اسے لاگو کیا گیا تھا۔

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

ٹوکن منٹ (بنانے) اور جلانے (تباہ کرنے) کے لیے فنکشنز اور ایونٹس۔
برج کو واحد ادارہ ہونا چاہئے جو ان فنکشنز کو چلا سکتا ہے تاکہ یہ یقینی بنایا جا سکے کہ ٹوکنز کی تعداد درست ہے (L1 پر لاک کیے گئے ٹوکنز کی تعداد کے برابر)۔

### L2StandardERC20 {#L2StandardERC20}

[یہ `IL2StandardERC20` انٹرفیس کا ہمارا نفاذ ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)۔
جب تک آپ کو کسی قسم کی اپنی مرضی کی منطق کی ضرورت نہ ہو، آپ کو یہ استعمال کرنا چاہیے۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 کنٹریکٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)۔
Optimism پہیے کو دوبارہ ایجاد کرنے میں یقین نہیں رکھتا، خاص طور پر جب پہیہ اچھی طرح سے آڈٹ کیا گیا ہو اور اثاثوں کو رکھنے کے لیے کافی قابل اعتماد ہونے کی ضرورت ہو۔

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

یہ دو اضافی کنفیگریشن پیرامیٹرز ہیں جن کی ہمیں ضرورت ہے اور ERC-20 عام طور پر نہیں کرتا ہے۔

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

پہلے اس کنٹریکٹ کے لیے کنسٹرکٹر کو کال کریں جس سے ہم وراثت میں ہیں (`ERC20(_name, _symbol)`) اور پھر اپنے متغیرات سیٹ کریں۔

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

یہ وہ طریقہ ہے جس سے [ERC-165](https://eips.ethereum.org/EIPS/eip-165) کام کرتا ہے۔
ہر انٹرفیس معاون فنکشنز کی ایک تعداد ہے، اور اس کی شناخت ان فنکشنز کے [ABI فنکشن سلیکٹرز](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) کے [exclusive or](https://en.wikipedia.org/wiki/Exclusive_or) کے طور پر کی جاتی ہے۔

L2 برج ERC-165 کو ایک سینیٹی چیک کے طور پر استعمال کرتا ہے تاکہ یہ یقینی بنایا جا سکے کہ جس ERC-20 کنٹریکٹ کو یہ اثاثے بھیجتا ہے وہ `IL2StandardERC20` ہے۔

**نوٹ:** `supportsInterface` کو غلط جواب دینے سے بدمعاش کنٹریکٹ کو روکنے کے لیے کچھ بھی نہیں ہے، لہذا یہ ایک سینیٹی چیک میکانزم ہے، _سیکیورٹی میکانزم نہیں_۔

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

_mint`اور`_burn` دراصل [OpenZeppelin ERC-20 کنٹریکٹ](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) میں بیان کیے گئے ہیں۔
وہ کنٹریکٹ صرف انہیں بیرونی طور پر ظاہر نہیں کرتا، کیونکہ ٹوکن منٹ اور برن کرنے کی شرائط اتنی ہی متنوع ہیں جتنی ERC-20 استعمال کرنے کے طریقے۔

## L2 برج کوڈ {#l2-bridge-code}

یہ وہ کوڈ ہے جو Optimism پر برج کو چلاتا ہے۔
[اس کنٹریکٹ کا ماخذ یہاں ہے](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) انٹرفیس اوپر دیکھے گئے [L1 کے مساوی](#IL1ERC20Bridge) سے بہت ملتا جلتا ہے۔
دو اہم فرق ہیں:

1. L1 پر آپ ڈپازٹ شروع کرتے ہیں اور واپسیوں کو حتمی شکل دیتے ہیں۔
   یہاں آپ واپسی شروع کرتے ہیں اور ڈپازٹ کو حتمی شکل دیتے ہیں۔
2. L1 پر ETH اور ERC-20 ٹوکنز کے درمیان فرق کرنا ضروری ہے۔
   L2 پر ہم دونوں کے لیے ایک ہی فنکشنز استعمال کر سکتے ہیں کیونکہ اندرونی طور پر Optimism پر ETH بیلنس کو ایڈریس [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) والے ERC-20 ٹوکن کے طور پر ہینڈل کیا جاتا ہے۔

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

L1 برج کے ایڈریس کا ٹریک رکھیں۔
نوٹ کریں کہ L1 کے مساوی کے برعکس، یہاں ہمیں اس متغیر کی _ضرورت_ ہے۔
L1 برج کا ایڈریس پہلے سے معلوم نہیں ہے۔

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

یہ دو فنکشنز واپسی شروع کرتے ہیں۔
نوٹ کریں کہ L1 ٹوکن ایڈریس کی وضاحت کرنے کی کوئی ضرورت نہیں ہے۔
L2 ٹوکنز سے توقع کی جاتی ہے کہ وہ ہمیں L1 کے مساوی ایڈریس بتائیں گے۔

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

نوٹ کریں کہ ہم `_from` پیرامیٹر پر انحصار نہیں کر رہے ہیں بلکہ `msg.sender` پر کر رہے ہیں جسے جعلی بنانا بہت مشکل ہے (جہاں تک میں جانتا ہوں، ناممکن)۔

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

یقینی بنائیں کہ پیغام کا ماخذ جائز ہے۔
یہ اہم ہے کیونکہ یہ فنکشن `_mint` کو کال کرتا ہے اور اس کا استعمال ایسے ٹوکن دینے کے لیے کیا جا سکتا ہے جو L1 پر برج کے ملکیت والے ٹوکنز کے تحت نہیں آتے ہیں۔

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

سینیٹی چیکس:

1. درست انٹرفیس سپورٹ کیا جاتا ہے
2. L2 ERC-20 کنٹریکٹ کا L1 ایڈریس ٹوکنز کے L1 ماخذ سے میل کھاتا ہے

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

اگر سینیٹی چیکس پاس ہو جاتے ہیں، تو ڈپازٹ کو حتمی شکل دیں:

1. ٹوکن منٹ کریں
2. مناسب ایونٹ خارج کریں

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

اگر کسی صارف نے غلط L2 ٹوکن ایڈریس کا استعمال کرکے قابل شناخت غلطی کی ہے، تو ہم ڈپازٹ کو منسوخ کرنا چاہتے ہیں اور L1 پر ٹوکن واپس کرنا چاہتے ہیں۔
L2 سے ایسا کرنے کا واحد طریقہ یہ ہے کہ ایک پیغام بھیجا جائے جسے فالٹ چیلنج کی مدت کا انتظار کرنا پڑے گا، لیکن یہ صارف کے لیے ٹوکن کو مستقل طور پر کھونے سے بہت بہتر ہے۔

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## نتیجہ {#conclusion}

معیاری برج اثاثوں کی منتقلی کے لیے سب سے زیادہ لچکدار میکانزم ہے۔
تاہم، چونکہ یہ بہت عام ہے، اس لیے یہ استعمال کرنے کے لیے ہمیشہ سب سے آسان میکانزم نہیں ہے۔
خاص طور پر واپسی کے لیے، زیادہ تر صارفین [تھرڈ پارٹی برجز](https://optimism.io/apps#bridge) کا استعمال کرنا پسند کرتے ہیں جو چیلنج کی مدت کا انتظار نہیں کرتے اور واپسی کو حتمی شکل دینے کے لیے Merkle پروف کی ضرورت نہیں ہوتی۔

یہ برجز عام طور پر L1 پر اثاثے رکھ کر کام کرتے ہیں، جو وہ فوری طور پر ایک چھوٹی سی فیس کے لیے فراہم کرتے ہیں (اکثر معیاری برج کی واپسی کے لیے گیس کی لاگت سے کم)۔
جب برج (یا اسے چلانے والے لوگ) L1 اثاثوں کی کمی کا اندازہ لگاتے ہیں تو یہ L2 سے کافی اثاثے منتقل کرتا ہے۔ چونکہ یہ بہت بڑی واپسی ہیں، واپسی کی لاگت ایک بڑی رقم پر تقسیم کی جاتی ہے اور یہ ایک بہت چھوٹا فیصد ہے۔

امید ہے کہ اس مضمون نے آپ کو لیئر 2 کے کام کرنے کے طریقے، اور واضح اور محفوظ Solidity کوڈ لکھنے کے بارے میں مزید سمجھنے میں مدد کی ہوگی۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
