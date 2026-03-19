---
title: "جولة تفصيلية في عقد Uniswap-v2"
description: "كيف يعمل عقد Uniswap-v2؟ ولماذا كُتب بهذه الطريقة؟"
author: Ori Pomerantz
tags: ["solidity", "التطبيقات اللامركزية"]
skill: intermediate
published: 2021-05-01
lang: ar
---
## مقدمة {#introduction}

يمكن لـ [Uniswap v2](https://app.uniswap.org/whitepaper.pdf) إنشاء سوق تبادل بين أي رمزي ERC-20. في هذه المقالة، سنستعرض الكود المصدري للعقود التي تنفذ هذا البروتوكول ونرى لماذا كُتبت بهذه الطريقة.

### ماذا يفعل Uniswap؟ {#what-does-uniswap-do}

بشكل أساسي، هناك نوعان من المستخدمين: مزودو السيولة والمتداولون.

يقوم _مزودو السيولة_ بتزويد المجمع بالرمزين اللذين يمكن تبادلهما (سنطلق عليهما **Token0** و **Token1**). في المقابل، يحصلون على رمز ثالث يمثل ملكية جزئية للمجمع يُسمى _رمز السيولة_.

يقوم _المتداولون_ بإرسال نوع واحد من الرموز إلى المجمع واستلام النوع الآخر (على سبيل المثال، إرسال **Token0** واستلام **Token1**) من المجمع الذي يوفره مزودو السيولة. يتم تحديد سعر الصرف بناءً على العدد النسبي لرموز **Token0** و **Token1** الموجودة في المجمع. بالإضافة إلى ذلك، يأخذ المجمع نسبة مئوية صغيرة كمكافأة لمجمع السيولة.

عندما يرغب مزودو السيولة في استعادة أصولهم، يمكنهم حرق رموز المجمع واستعادة رموزهم، بما في ذلك حصتهم من المكافآت.

[انقر هنا للحصول على وصف أكمل](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### لماذا الإصدار الثاني (v2)؟ ولماذا ليس الإصدار الثالث (v3)؟ {#why-v2}

يُعد [Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ترقية أكثر تعقيدًا بكثير من الإصدار الثاني (v2). من الأسهل تعلم الإصدار الثاني أولاً ثم الانتقال إلى الإصدار الثالث.

### العقود الأساسية مقابل العقود الطرفية {#contract-types}

ينقسم Uniswap v2 إلى مكونين: أساسي وطرفي. يسمح هذا التقسيم للعقود الأساسية، التي تحتفظ بالأصول وبالتالي _يجب_ أن تكون آمنة، بأن تكون أبسط وأسهل في التدقيق. يمكن بعد ذلك توفير جميع الوظائف الإضافية التي يطلبها المتداولون من خلال العقود الطرفية.

## تدفقات البيانات والتحكم {#flows}

هذا هو تدفق البيانات والتحكم الذي يحدث عند تنفيذ الإجراءات الثلاثة الرئيسية في Uniswap:

1. المبادلة بين رموز مختلفة
2. إضافة سيولة إلى السوق والحصول على مكافأة برموز سيولة ERC-20 الخاصة بزوج التداول
3. حرق رموز سيولة ERC-20 واسترداد رموز ERC-20 التي تسمح منصة تداول الزوج للمتداولين بتبادلها

### المبادلة {#swap-flow}

هذا هو التدفق الأكثر شيوعًا، والذي يستخدمه المتداولون:

#### المتصل {#caller}

1. تزويد الحساب المحيطي (periphery account) بمخصص (allowance) بالمبلغ المراد مبادلته.
2. استدعاء إحدى وظائف المبادلة العديدة للعقد المحيطي (تعتمد الوظيفة على ما إذا كان ETH متضمنًا أم لا، وما إذا كان المتداول يحدد مقدار الرموز المراد إيداعها أو مقدار الرموز المراد استردادها، وما إلى ذلك).
   تقبل كل وظيفة مبادلة `path`، وهي مصفوفة من منصات التداول التي يجب المرور عبرها.

#### في العقد المحيطي (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. تحديد المبالغ التي يجب تداولها في كل منصة تداول على طول المسار.
4. التكرار عبر المسار. بالنسبة لكل منصة تداول على طول الطريق، فإنه يرسل رمز الإدخال ثم يستدعي وظيفة `swap` الخاصة بمنصة التداول.
   في معظم الحالات، يكون عنوان الوجهة للرموز هو منصة تداول الزوج التالية في المسار. في منصة التداول النهائية، يكون هو العنوان الذي قدمه المتداول.

#### في العقد الأساسي (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. التحقق من عدم تعرض العقد الأساسي للاحتيال وأنه يمكنه الحفاظ على سيولة كافية بعد المبادلة.
6. معرفة عدد الرموز الإضافية التي لدينا بالإضافة إلى الاحتياطيات المعروفة. هذا المقدار هو عدد رموز الإدخال التي تلقيناها لتبادلها.
7. إرسال رموز الإخراج إلى الوجهة.
8. استدعاء `_update` لتحديث مبالغ الاحتياطي

#### العودة إلى العقد المحيطي (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. إجراء أي عمليات تنظيف ضرورية (على سبيل المثال، حرق رموز WETH لاسترداد ETH لإرساله إلى المتداول)

### إضافة السيولة {#add-liquidity-flow}

#### المتصل {#caller-2}

1. تزويد الحساب المحيطي بمخصص بالمبالغ المراد إضافتها إلى مجمع السيولة.
2. استدعاء إحدى وظائف `addLiquidity` الخاصة بالعقد المحيطي.

#### في العقد المحيطي (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. إنشاء منصة تداول زوج جديدة إذا لزم الأمر
4. إذا كانت هناك منصة تداول زوج حالية، فاحسب مقدار الرموز المراد إضافتها. من المفترض أن تكون هذه القيمة متطابقة لكلا الرمزين، وبالتالي نفس نسبة الرموز الجديدة إلى الرموز الحالية.
5. التحقق مما إذا كانت المبالغ مقبولة (يمكن للمتصلين تحديد حد أدنى للمبلغ الذي يفضلون عدم إضافة سيولة إذا كان أقل منه)
6. استدعاء العقد الأساسي.

#### في العقد الأساسي (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. السك او انشاء رموز السيولة وإرسالها إلى المتصل
8. استدعاء `_update` لتحديث مبالغ الاحتياطي

### إزالة السيولة {#remove-liquidity-flow}

#### المتصل {#caller-3}

1. تزويد الحساب المحيطي بمخصص من رموز السيولة ليتم حرقها مقابل الرموز الأساسية.
2. استدعاء إحدى وظائف `removeLiquidity` الخاصة بالعقد المحيطي.

#### في العقد المحيطي (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. إرسال رموز السيولة إلى منصة تداول الزوج

#### في العقد الأساسي (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. إرسال الرموز الأساسية إلى عنوان الوجهة بما يتناسب مع الرموز المحروقة. على سبيل المثال، إذا كان هناك 1000 رمز A في المجمع، و500 رمز B، و90 رمز سيولة، وتلقينا 9 رموز لحرقها، فإننا نحرق 10% من رموز السيولة، لذا نعيد للمستخدم 100 رمز A و50 رمز B.
5. حرق رموز السيولة
6. استدعاء `_update` لتحديث مبالغ الاحتياطي

## العقود الأساسية {#core-contracts}

هذه هي العقود الآمنة التي تحتفظ بالسيولة.

### UniswapV2Pair.sol {#UniswapV2Pair}

ينفذ [هذا العقد](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) المجمع الفعلي الذي يتبادل الرموز. إنها الوظيفة الأساسية لـ Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

هذه هي جميع الواجهات التي يحتاج العقد إلى معرفتها، إما لأن العقد ينفذها (`IUniswapV2Pair` و `UniswapV2ERC20`) أو لأنه يستدعي العقود التي تنفذها.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

يرث هذا العقد من `UniswapV2ERC20`، والذي يوفر وظائف ERC-20 لرموز السيولة.

```solidity
    using SafeMath  for uint;
```

تُستخدم [مكتبة SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) لتجنب طفح البيانات (overflows) ونقصانها (underflows). هذا مهم لأنه بخلاف ذلك قد ينتهي بنا الأمر إلى حالة يجب أن تكون فيها القيمة <span dir="ltr">-1</span>، ولكنها بدلاً من ذلك <span dir="ltr">2^256-1</span>.

```solidity
    using UQ112x112 for uint224;
```

تتطلب الكثير من الحسابات في عقد المجمع كسورًا. ومع ذلك، فإن الكسور غير مدعومة من قبل آلة إيثريوم الافتراضية (EVM).
الحل الذي وجدته Uniswap هو استخدام قيم بحجم 224 بت، مع 112 بت للجزء الصحيح، و 112 بت للكسر. لذلك يتم تمثيل `1.0` كـ <span dir="ltr">2^112</span>، ويتم تمثيل `1.5` كـ <span dir="ltr">2^112 + 2^111</span>، إلخ.

تتوفر المزيد من التفاصيل حول هذه المكتبة [لاحقًا في المستند](#FixedPoint).

#### المتغيرات {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

لتجنب حالات القسمة على صفر، هناك حد أدنى من رموز السيولة الموجودة دائمًا (ولكنها مملوكة للحساب صفر). هذا الرقم هو **MINIMUM_LIQUIDITY**، وهو ألف.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

هذا هو محدد ABI لوظيفة التحويل الخاصة بـ ERC-20. يتم استخدامه لتحويل رموز ERC-20 في حسابي الرموز.

```solidity
    address public factory;
```

هذا هو عقد المصنع الذي أنشأ هذا المجمع. كل مجمع هو عبارة عن تبادل بين رمزين من نوع ERC-20، والمصنع هو نقطة مركزية تربط جميع هذه المجمعات.

```solidity
    address public token0;
    address public token1;
```

هناك عناوين العقود لنوعي رموز ERC-20 التي يمكن تبادلها بواسطة هذا المجمع.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves // يستخدم خانة تخزين واحدة، يمكن الوصول إليها عبر getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves // يستخدم خانة تخزين واحدة، يمكن الوصول إليها عبر getReserves
```

الاحتياطيات التي يمتلكها المجمع لكل نوع من الرموز. نفترض أن الاثنين يمثلان نفس المقدار من القيمة، وبالتالي فإن كل token0 يساوي <span dir="ltr">reserve1/reserve0</span> من token1.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves // يستخدم خانة تخزين واحدة، يمكن الوصول إليها عبر getReserves
```

الطابع الزمني لآخر بلوك حدث فيه تبادل، ويُستخدم لتتبع أسعار الصرف عبر الزمن.

واحدة من أكبر نفقات الغاز في عقود إيثريوم هي التخزين، والذي يستمر من استدعاء واحد للعقد إلى الاستدعاء التالي. يبلغ طول كل خلية تخزين 256 بت. لذلك يتم تخصيص ثلاثة متغيرات، `reserve0` و `reserve1` و `blockTimestampLast`، بطريقة يمكن أن تتضمن فيها قيمة تخزين واحدة الثلاثة معًا (<span dir="ltr">112+112+32=256</span>).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

تحتفظ هذه المتغيرات بالتكاليف التراكمية لكل رمز (كل منها بدلالة الآخر). يمكن استخدامها لحساب متوسط سعر الصرف خلال فترة زمنية.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event // reserve0 * reserve1، كما هو الحال فوراً بعد أحدث حدث للسيولة
```

الطريقة التي يقرر بها تبادل الزوج سعر الصرف بين token0 و token1 هي الحفاظ على مضاعف الاحتياطيين ثابتًا أثناء التداولات. `kLast` هي هذه القيمة. تتغير عندما يقوم مزود السيولة بإيداع أو سحب الرموز، وتزداد قليلاً بسبب رسوم السوق البالغة 0.3%.

إليك مثال بسيط. لاحظ أنه من أجل التبسيط، يحتوي الجدول على ثلاثة أرقام فقط بعد الفاصلة العشرية، ونتجاهل رسوم التداول البالغة 0.3% لذا فإن الأرقام ليست دقيقة.

| الحدث | reserve0 | reserve1 | <span dir="ltr">reserve0 \* reserve1</span> | متوسط سعر الصرف (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| الإعداد الأولي | 1,000.000 | 1,000.000 | 1,000,000 | |
| المتداول أ يبادل 50 token0 مقابل 47.619 token1 | 1,050.000 | 952.381 | 1,000,000 | 0.952 |
| المتداول ب يبادل 10 token0 مقابل 8.984 token1 | 1,060.000 | 943.396 | 1,000,000 | 0.898 |
| المتداول ج يبادل 40 token0 مقابل 34.305 token1 | 1,100.000 | 909.090 | 1,000,000 | 0.858 |
| المتداول د يبادل 100 token1 مقابل 109.01 token0 | 990.990 | 1,009.090 | 1,000,000 | 0.917 |
| المتداول هـ يبادل 10 token0 مقابل 10.079 token1 | 1,000.990 | 999.010 | 1,000,000 | 1.008 |

مع توفير المتداولين للمزيد من token0، تزداد القيمة النسبية لـ token1، والعكس صحيح، بناءً على العرض والطلب.

#### القفل (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

هناك فئة من الثغرات الأمنية التي تعتمد على [إساءة استخدام إعادة الدخول (reentrancy)](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). تحتاج Uniswap إلى تحويل رموز ERC-20 عشوائية، مما يعني استدعاء عقود ERC-20 التي قد تحاول إساءة استخدام سوق Uniswap الذي يستدعيها.
من خلال وجود متغير `unlocked` كجزء من العقد، يمكننا منع استدعاء الوظائف أثناء تشغيلها (ضمن نفس المعاملة).

```solidity
    modifier lock() {
```

هذه الوظيفة عبارة عن [مُعدِّل (modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)، وهي وظيفة تلتف حول وظيفة عادية لتغيير سلوكها بطريقة ما.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

إذا كان `unlocked` يساوي واحدًا، فقم بتعيينه إلى الصفر. إذا كان صفرًا بالفعل، فقم بإرجاع (revert) الاستدعاء، واجعله يفشل.

```solidity
        _;
```

في المُعدِّل، `_;` هو استدعاء الوظيفة الأصلي (مع جميع المعلمات). هنا يعني أن استدعاء الوظيفة يحدث فقط إذا كان `unlocked` واحدًا عند استدعائه، وأثناء تشغيله تكون قيمة `unlocked` صفرًا.

```solidity
        unlocked = 1;
    }
```

بعد عودة الوظيفة الرئيسية، قم بتحرير القفل.

#### وظائف متنوعة {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

توفر هذه الوظيفة للمتصلين الحالة الحالية للتبادل. لاحظ أن وظائف Solidity [يمكن أن تُرجع قيمًا متعددة](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

تقوم هذه الوظيفة الداخلية بتحويل كمية من رموز ERC20 من التبادل إلى شخص آخر. يحدد `SELECTOR` أن الوظيفة التي نستدعيها هي `transfer(address,uint)` (انظر التعريف أعلاه).

لتجنب الاضطرار إلى استيراد واجهة لوظيفة الرمز، نقوم بإنشاء الاستدعاء "يدويًا" باستخدام إحدى [وظائف ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

هناك طريقتان يمكن من خلالهما لاستدعاء تحويل ERC-20 الإبلاغ عن الفشل:

1. التراجع (Revert). إذا تراجع استدعاء لعقد خارجي، فإن القيمة المنطقية المرجعة تكون `false`
2. الانتهاء بشكل طبيعي ولكن مع الإبلاغ عن فشل. في هذه الحالة، يكون للمخزن المؤقت للقيمة المرجعة طول غير صفري، وعند فك تشفيره كقيمة منطقية يكون `false`

إذا حدث أي من هذين الشرطين، فقم بالتراجع (revert).

#### الأحداث (Events) {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

يتم إصدار هذين الحدثين عندما يقوم مزود السيولة إما بإيداع السيولة (`Mint`) أو سحبها (`Burn`). في كلتا الحالتين، تكون كميات token0 و token1 المودعة أو المسحوبة جزءًا من الحدث، بالإضافة إلى هوية الحساب الذي استدعانا (`sender`). في حالة السحب، يتضمن الحدث أيضًا الهدف الذي تلقى الرموز (`to`)، والذي قد لا يكون هو نفسه المرسل.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

يتم إصدار هذا الحدث عندما يقوم المتداول بمبادلة رمز بآخر. مرة أخرى، قد لا يكون المرسل والوجهة متطابقين.
يمكن إرسال كل رمز إما إلى التبادل، أو استلامه منه.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

أخيرًا، يتم إصدار `Sync` في كل مرة يتم فيها إضافة الرموز أو سحبها، بغض النظر عن السبب، لتوفير أحدث معلومات الاحتياطي (وبالتالي سعر الصرف).

#### وظائف الإعداد {#pair-setup}

من المفترض أن يتم استدعاء هذه الوظائف مرة واحدة عند إعداد تبادل الزوج الجديد.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

يتأكد المُنشئ (constructor) من أننا سنتتبع عنوان المصنع الذي أنشأ الزوج. هذه المعلومات مطلوبة لـ `initialize` ولرسوم المصنع (إن وجدت).

```solidity
    // called once by the factory at time of deployment // يُستدعى مرة واحدة بواسطة المصنع في وقت النشر
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check // تحقق كافٍ
        token0 = _token0;
        token1 = _token1;
    }
```

تسمح هذه الوظيفة للمصنع (والمصنع فقط) بتحديد رمزي ERC-20 اللذين سيتبادلهما هذا الزوج.

#### وظائف التحديث الداخلية {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators // تحديث الاحتياطيات، وفي أول استدعاء لكل كتلة، مجمعات الأسعار
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

يتم استدعاء هذه الوظيفة في كل مرة يتم فيها إيداع الرموز أو سحبها.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

إذا كان إما balance0 أو balance1 (uint256) أعلى من <span dir="ltr">uint112(-1)</span> (<span dir="ltr">=2^112-1</span>) (بحيث يفيض ويعود إلى 0 عند تحويله إلى uint112) ارفض الاستمرار في \_update لمنع طفح البيانات. مع رمز عادي يمكن تقسيمه إلى <span dir="ltr">10^18</span> وحدة، هذا يعني أن كل تبادل يقتصر على حوالي <span dir="ltr">5.1\*10^15</span> من كل رمز. حتى الآن لم تكن هذه مشكلة.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired // الطفح (overflow) مطلوب
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

إذا لم يكن الوقت المنقضي صفرًا، فهذا يعني أننا أول معاملة تبادل في هذا البلوك. في هذه الحالة، نحتاج إلى تحديث مجمعات التكلفة.

```solidity
            // * never overflows, and + overflow is desired // * لا يطفح أبداً، وطفح + مطلوب
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

يتم تحديث كل مجمع تكلفة بأحدث تكلفة (احتياطي الرمز الآخر / احتياطي هذا الرمز) مضروبًا في الوقت المنقضي بالثواني. للحصول على متوسط السعر، تقرأ السعر التراكمي في نقطتين زمنيتين وتقسمه على الفارق الزمني بينهما. على سبيل المثال، افترض هذا التسلسل من الأحداث:

| الحدث | reserve0 | reserve1 | الطابع الزمني | سعر الصرف الهامشي (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| الإعداد الأولي | 1,000.000 | 1,000.000 | 5,000 | 1.000 | 0 |
| المتداول أ يودع 50 token0 ويسترد 47.619 token1 | 1,050.000 | 952.381 | 5,020 | 0.907 | 20 |
| المتداول ب يودع 10 token0 ويسترد 8.984 token1 | 1,060.000 | 943.396 | 5,030 | 0.890 | <span dir="ltr">20+10\*0.907 = 29.07</span> |
| المتداول ج يودع 40 token0 ويسترد 34.305 token1 | 1,100.000 | 909.090 | 5,100 | 0.826 | <span dir="ltr">29.07+70\*0.890 = 91.37</span> |
| المتداول د يودع 100 token1 ويسترد 109.01 token0 | 990.990 | 1,009.090 | 5,110 | 1.018 | <span dir="ltr">91.37+10\*0.826 = 99.63</span> |
| المتداول هـ يودع 10 token0 ويسترد 10.079 token1 | 1,000.990 | 999.010 | 5,150 | 0.998 | <span dir="ltr">99.63+40\*1.1018 = 143.702</span> |

لنفترض أننا نريد حساب متوسط سعر **Token0** بين الطوابع الزمنية 5,030 و 5,150. الفرق في قيمة `price0Cumulative` هو <span dir="ltr">143.702-29.07=114.632</span>. هذا هو المتوسط عبر دقيقتين (120 ثانية). إذن متوسط السعر هو <span dir="ltr">114.632/120 = 0.955</span>.

حساب السعر هذا هو السبب في أننا بحاجة إلى معرفة أحجام الاحتياطي القديمة.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

أخيرًا، قم بتحديث المتغيرات العامة وإصدار حدث `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k) // إذا كانت الرسوم مفعلة، قم بـ السك او انشاء سيولة تعادل 1/6 من النمو في sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

في Uniswap 2.0، يدفع المتداولون رسومًا بنسبة 0.30% لاستخدام السوق. يذهب معظم هذه الرسوم (0.25% من التداول) دائمًا إلى مزودي السيولة. يمكن أن تذهب النسبة المتبقية البالغة 0.05% إما إلى مزودي السيولة أو إلى عنوان يحدده المصنع كرسوم بروتوكول، والتي تدفع لـ Uniswap مقابل جهود التطوير الخاصة بهم.

لتقليل الحسابات (وبالتالي تكاليف الغاز)، يتم حساب هذه الرسوم فقط عند إضافة السيولة أو إزالتها من المجمع، بدلاً من حسابها عند كل معاملة.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

اقرأ وجهة الرسوم الخاصة بالمصنع. إذا كانت صفرًا، فلا توجد رسوم بروتوكول ولا حاجة لحساب تلك الرسوم.

```solidity
        uint _kLast = kLast; // gas savings // توفير الغاز
```

يقع متغير الحالة `kLast` في التخزين، لذلك سيكون له قيمة بين الاستدعاءات المختلفة للعقد.
يعد الوصول إلى التخزين أكثر تكلفة بكثير من الوصول إلى الذاكرة المتطايرة التي يتم تحريرها عند انتهاء استدعاء الوظيفة للعقد، لذلك نستخدم متغيرًا داخليًا لتوفير الغاز.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

يحصل مزودو السيولة على حصتهم ببساطة من خلال ارتفاع قيمة رموز السيولة الخاصة بهم. لكن رسوم البروتوكول تتطلب أن يتم السك او انشاء رموز سيولة جديدة وتقديمها إلى عنوان `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

إذا كانت هناك سيولة جديدة يمكن تحصيل رسوم بروتوكول عليها. يمكنك رؤية وظيفة الجذر التربيعي [لاحقًا في هذه المقالة](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

تم شرح هذا الحساب المعقد للرسوم في [الورقة البيضاء](https://app.uniswap.org/whitepaper.pdf) في الصفحة 5. نحن نعلم أنه بين الوقت الذي تم فيه حساب `kLast` والوقت الحاضر لم تتم إضافة أو إزالة أي سيولة (لأننا نجري هذا الحساب في كل مرة تتم فيها إضافة السيولة أو إزالتها، قبل أن تتغير فعليًا)، لذلك يجب أن يأتي أي تغيير في <span dir="ltr">reserve0 * reserve1</span> من رسوم المعاملة (بدونها سنحافظ على ثبات <span dir="ltr">reserve0 * reserve1</span>).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

استخدم وظيفة `UniswapV2ERC20._mint` لإنشاء رموز السيولة الإضافية فعليًا وتعيينها إلى `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

إذا لم تكن هناك رسوم، فقم بتعيين `kLast` إلى الصفر (إذا لم يكن كذلك بالفعل). عندما تمت كتابة هذا العقد، كانت هناك [ميزة استرداد الغاز](https://eips.ethereum.org/EIPS/eip-3298) التي شجعت العقود على تقليل الحجم الإجمالي لحالة إيثريوم عن طريق تصفير التخزين الذي لا يحتاجون إليه.
يحصل هذا الكود على هذا الاسترداد عندما يكون ذلك ممكنًا.

#### الوظائف التي يمكن الوصول إليها خارجيًا {#pair-external}

لاحظ أنه بينما _يمكن_ لأي معاملة أو عقد استدعاء هذه الوظائف، إلا أنها مصممة ليتم استدعاؤها من العقد المحيطي (periphery contract). إذا قمت باستدعائها مباشرة، فلن تتمكن من خداع تبادل الزوج، ولكنك قد تفقد القيمة من خلال خطأ.

##### mint

```solidity
    // this low-level function should be called from a contract which performs important safety checks // يجب استدعاء هذه الدالة منخفضة المستوى من عقد يُجري فحوصات أمان مهمة
    function mint(address to) external lock returns (uint liquidity) {
```

يتم استدعاء هذه الوظيفة عندما يضيف مزود السيولة سيولة إلى المجمع. حيث يقوم بالسك او انشاء رموز سيولة إضافية كمكافأة. يجب استدعاؤها من [عقد محيطي](#UniswapV2Router02) يستدعيها بعد إضافة السيولة في نفس المعاملة (حتى لا يتمكن أي شخص آخر من إرسال معاملة تطالب بالسيولة الجديدة قبل المالك الشرعي).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // توفير الغاز
```

هذه هي الطريقة لقراءة نتائج وظيفة Solidity التي تُرجع قيمًا متعددة. نتجاهل القيم المرجعة الأخيرة، وهي الطابع الزمني للبلوك، لأننا لا نحتاج إليها.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

احصل على الأرصدة الحالية واعرف مقدار ما تمت إضافته من كل نوع من الرموز.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

احسب رسوم البروتوكول التي سيتم تحصيلها، إن وجدت، وقم بالسك او انشاء رموز السيولة وفقًا لذلك. نظرًا لأن المعلمات لـ `_mintFee` هي قيم الاحتياطي القديمة، يتم حساب الرسوم بدقة بناءً فقط على تغييرات المجمع الناتجة عن الرسوم.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee // توفير الغاز، يجب تعريفه هنا لأن totalSupply يمكن أن يتحدث في _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens // قفل أول رموز MINIMUM_LIQUIDITY بشكل دائم
```

إذا كان هذا هو الإيداع الأول، فقم بإنشاء رموز `MINIMUM_LIQUIDITY` وأرسلها إلى العنوان صفر لقفلها. لا يمكن استردادها أبدًا، مما يعني أن المجمع لن يتم إفراغه بالكامل أبدًا (هذا ينقذنا من القسمة على صفر في بعض الأماكن). قيمة `MINIMUM_LIQUIDITY` هي ألف، والتي بالنظر إلى أن معظم رموز ERC-20 مقسمة إلى وحدات من <span dir="ltr">10^-18</span> من الرمز، كما يتم تقسيم ETH إلى wei، هي <span dir="ltr">10^-15</span> من قيمة رمز واحد. ليست تكلفة عالية.

في وقت الإيداع الأول، لا نعرف القيمة النسبية للرمزين، لذلك نقوم ببساطة بضرب المبالغ وأخذ الجذر التربيعي، بافتراض أن الإيداع يوفر لنا قيمة متساوية في كلا الرمزين.

يمكننا الوثوق بهذا لأنه من مصلحة المودع توفير قيمة متساوية، لتجنب فقدان القيمة لصالح المراجحة (arbitrage).
لنفترض أن قيمة الرمزين متطابقة، لكن المودع أودع أربعة أضعاف من **Token1** مقارنة بـ **Token0**. يمكن للمتداول استخدام حقيقة أن تبادل الزوج يعتقد أن **Token0** أكثر قيمة لاستخراج القيمة منه.

| الحدث | reserve0 | reserve1 | <span dir="ltr">reserve0 \* reserve1</span> | قيمة المجمع (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| الإعداد الأولي | 8 | 32 | 256 | 40 |
| المتداول يودع 8 رموز **Token0**، ويسترد 16 **Token1** | 16 | 16 | 256 | 32 |

كما ترى، ربح المتداول 8 رموز إضافية، والتي تأتي من انخفاض في قيمة المجمع، مما يضر بالمودع الذي يمتلكه.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

مع كل إيداع لاحق، نعرف بالفعل سعر الصرف بين الأصلين، ونتوقع من مزودي السيولة توفير قيمة متساوية في كليهما. إذا لم يفعلوا ذلك، فإننا نمنحهم رموز سيولة بناءً على القيمة الأقل التي قدموها كعقوبة.

سواء كان الإيداع الأولي أو إيداعًا لاحقًا، فإن عدد رموز السيولة التي نقدمها يساوي الجذر التربيعي للتغير في <span dir="ltr">reserve0*reserve1</span> ولا تتغير قيمة رمز السيولة (ما لم نحصل على إيداع لا يحتوي على قيم متساوية من كلا النوعين، وفي هذه الحالة يتم توزيع "الغرامة"). إليك مثال آخر برمزين لهما نفس القيمة، مع ثلاثة إيداعات جيدة وإيداع واحد سيئ (إيداع نوع واحد فقط من الرموز، لذلك لا ينتج أي رموز سيولة).

| الحدث | reserve0 | reserve1 | <span dir="ltr">reserve0 \* reserve1</span> | قيمة المجمع (reserve0 + reserve1) | رموز السيولة التي تم السك او انشاء لها لهذا الإيداع | إجمالي رموز السيولة | قيمة كل رمز سيولة |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| الإعداد الأولي | 8.000 | 8.000 | 64 | 16.000 | 8 | 8 | 2.000 |
| إيداع أربعة من كل نوع | 12.000 | 12.000 | 144 | 24.000 | 4 | 12 | 2.000 |
| إيداع اثنين من كل نوع | 14.000 | 14.000 | 196 | 28.000 | 2 | 14 | 2.000 |
| إيداع بقيمة غير متساوية | 18.000 | 14.000 | 252 | 32.000 | 0 | 14 | ~2.286 |
| بعد المراجحة | ~15.874 | ~15.874 | 252 | ~31.748 | 0 | 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

استخدم وظيفة `UniswapV2ERC20._mint` لإنشاء رموز السيولة الإضافية فعليًا وإعطائها للحساب الصحيح.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date // reserve0 و reserve1 محدثان
        emit Mint(msg.sender, amount0, amount1);
    }
```

قم بتحديث متغيرات الحالة (`reserve0` و `reserve1`، وإذا لزم الأمر `kLast`) وإصدار الحدث المناسب.

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks // يجب استدعاء هذه الدالة منخفضة المستوى من عقد يُجري فحوصات أمان مهمة
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

يتم استدعاء هذه الوظيفة عند سحب السيولة والحاجة إلى حرق رموز السيولة المناسبة.
يجب أيضًا استدعاؤها [من حساب محيطي](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // توفير الغاز
        address _token0 = token0;                                // gas savings // توفير الغاز
        address _token1 = token1;                                // gas savings // توفير الغاز
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

قام العقد المحيطي بتحويل السيولة المراد حرقها إلى هذا العقد قبل الاستدعاء. بهذه الطريقة نعرف مقدار السيولة التي يجب حرقها، ويمكننا التأكد من حرقها.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee // توفير الغاز، يجب تعريفه هنا لأن totalSupply يمكن أن يتحدث في _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution // استخدام الأرصدة يضمن التوزيع النسبي
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution // استخدام الأرصدة يضمن التوزيع النسبي
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

يتلقى مزود السيولة قيمة متساوية من كلا الرمزين. بهذه الطريقة لا نغير سعر الصرف.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date // reserve0 و reserve1 محدثان
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

بقية وظيفة `burn` هي صورة طبق الأصل لوظيفة `mint` أعلاه.

##### swap

```solidity
    // this low-level function should be called from a contract which performs important safety checks // يجب استدعاء هذه الدالة منخفضة المستوى من عقد يُجري فحوصات أمان مهمة
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

من المفترض أيضًا أن يتم استدعاء هذه الوظيفة من [عقد محيطي](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // توفير الغاز
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors // نطاق لـ _token{0,1}، يتجنب أخطاء المكدس العميق جداً
```

يمكن تخزين المتغيرات المحلية إما في الذاكرة أو، إذا لم يكن هناك الكثير منها، مباشرة على المكدس (stack).
إذا تمكنا من الحد من العدد بحيث نستخدم المكدس، فسنستخدم غازًا أقل. لمزيد من التفاصيل، راجع [الورقة الصفراء، المواصفات الرسمية لإيثريوم](https://ethereum.github.io/yellowpaper/paper.pdf)، ص 26، المعادلة 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens // نقل الرموز بشكل تفائلي
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens // نقل الرموز بشكل تفائلي
```

هذا التحويل متفائل، لأننا نقوم بالتحويل قبل أن نتأكد من استيفاء جميع الشروط. هذا مقبول في إيثريوم لأنه إذا لم يتم استيفاء الشروط لاحقًا في الاستدعاء، فإننا نتراجع (revert) عنه وعن أي تغييرات أحدثها.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

أبلغ المتلقي بالمبادلة إذا طُلب ذلك.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

احصل على الأرصدة الحالية. يرسل لنا العقد المحيطي الرموز قبل استدعائنا للمبادلة. هذا يسهل على العقد التحقق من عدم تعرضه للغش، وهو فحص _يجب_ أن يحدث في العقد الأساسي (لأنه يمكن استدعاؤنا من قبل كيانات أخرى غير عقدنا المحيطي).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors // نطاق لـ reserve{0,1}Adjusted، يتجنب أخطاء المكدس العميق جداً
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

هذا فحص سلامة للتأكد من أننا لا نخسر من المبادلة. لا يوجد أي ظرف يجب أن تقلل فيه المبادلة من <span dir="ltr">reserve0*reserve1</span>. هذا أيضًا هو المكان الذي نضمن فيه إرسال رسوم بنسبة 0.3% على المبادلة؛ قبل فحص سلامة قيمة K، نضرب كلا الرصيدين في 1000 مطروحًا منه المبالغ مضروبة في 3، وهذا يعني أنه يتم خصم 0.3% (<span dir="ltr">3/1000 = 0.003 = 0.3%</span>) من الرصيد قبل مقارنة قيمة K الخاصة به بقيمة K للاحتياطيات الحالية.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

قم بتحديث `reserve0` و `reserve1`، وإذا لزم الأمر مجمعات الأسعار والطابع الزمني وإصدار حدث.

##### Sync أو Skim

من الممكن أن تخرج الأرصدة الحقيقية عن المزامنة مع الاحتياطيات التي يعتقد تبادل الزوج أنه يمتلكها.
لا توجد طريقة لسحب الرموز دون موافقة العقد، لكن الإيداعات مسألة مختلفة. يمكن لحساب تحويل الرموز إلى التبادل دون استدعاء إما `mint` أو `swap`.

في هذه الحالة هناك حلان:

- `sync`، تحديث الاحتياطيات إلى الأرصدة الحالية
- `skim`، سحب المبلغ الإضافي. لاحظ أنه يُسمح لأي حساب باستدعاء `skim` لأننا لا نعرف من أودع الرموز. يتم إصدار هذه المعلومات في حدث، ولكن لا يمكن الوصول إلى الأحداث من البلوك تشين.

```solidity
    // force balances to match reserves // إجبار الأرصدة على مطابقة الاحتياطيات
    function skim(address to) external lock {
        address _token0 = token0; // gas savings // توفير الغاز
        address _token1 = token1; // gas savings // توفير الغاز
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances // إجبار الاحتياطيات على مطابقة الأرصدة
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

يقوم [هذا العقد](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) بإنشاء تبادلات الأزواج.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

متغيرات الحالة هذه ضرورية لتنفيذ رسوم البروتوكول (انظر [الورقة البيضاء](https://app.uniswap.org/whitepaper.pdf)، ص 5).
يجمع عنوان `feeTo` رموز السيولة لرسوم البروتوكول، و `feeToSetter` هو العنوان المسموح له بتغيير `feeTo` إلى عنوان مختلف.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

تتتبع هذه المتغيرات الأزواج، وهي التبادلات بين نوعين من الرموز.

الأول، `getPair`، هو تعيين (mapping) يحدد عقد تبادل الزوج بناءً على رمزي ERC-20 اللذين يتبادلهما. يتم تحديد رموز ERC-20 من خلال عناوين العقود التي تنفذها، لذلك فإن المفاتيح والقيمة كلها عناوين. للحصول على عنوان تبادل الزوج الذي يتيح لك التحويل من `tokenA` إلى `tokenB`، يمكنك استخدام `getPair[<tokenA address>][<tokenB address>]` (أو العكس).

المتغير الثاني، `allPairs`، هو مصفوفة تتضمن جميع عناوين تبادلات الأزواج التي أنشأها هذا المصنع. في إيثريوم، لا يمكنك التكرار (iterate) عبر محتوى التعيين، أو الحصول على قائمة بجميع المفاتيح، لذلك هذا المتغير هو الطريقة الوحيدة لمعرفة التبادلات التي يديرها هذا المصنع.

ملاحظة: السبب في عدم قدرتك على التكرار عبر جميع مفاتيح التعيين هو أن تخزين بيانات العقد _مكلف_، لذلك كلما قل استخدامنا له كان ذلك أفضل، وكلما قل عدد مرات تغييره كان ذلك أفضل. يمكنك إنشاء [تعيينات تدعم التكرار](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)، لكنها تتطلب تخزينًا إضافيًا لقائمة المفاتيح. في معظم التطبيقات لا تحتاج إلى ذلك.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

يتم إصدار هذا الحدث عند إنشاء تبادل زوج جديد. ويتضمن عناوين الرموز، وعنوان تبادل الزوج، والعدد الإجمالي للتبادلات التي يديرها المصنع.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

الشيء الوحيد الذي يفعله المُنشئ هو تحديد `feeToSetter`. تبدأ المصانع بدون رسوم، ووحده `feeSetter` يمكنه تغيير ذلك.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

تُرجع هذه الوظيفة عدد أزواج التبادل.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

هذه هي الوظيفة الرئيسية للمصنع، لإنشاء تبادل زوج بين رمزين من نوع ERC-20. لاحظ أنه يمكن لأي شخص استدعاء هذه الوظيفة. لا تحتاج إلى إذن من Uniswap لإنشاء تبادل زوج جديد.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

نريد أن يكون عنوان التبادل الجديد حتميًا (deterministic)، بحيث يمكن حسابه مسبقًا خارج السلسلة (يمكن أن يكون هذا مفيدًا لـ [معاملات الطبقة الثانية](/developers/docs/scaling/)).
للقيام بذلك، نحتاج إلى ترتيب ثابت لعناوين الرموز، بغض النظر عن الترتيب الذي تلقيناها به، لذلك نقوم بفرزها هنا.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient // فحص واحد كافٍ
```

مجمعات السيولة الكبيرة أفضل من الصغيرة، لأن أسعارها أكثر استقرارًا. لا نريد أن يكون لدينا أكثر من مجمع سيولة واحد لكل زوج من الرموز. إذا كان هناك تبادل بالفعل، فلا داعي لإنشاء تبادل آخر لنفس الزوج.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

لإنشاء عقد جديد، نحتاج إلى الكود الذي ينشئه (كل من وظيفة المُنشئ والكود الذي يكتب في الذاكرة الرمز الثنائي (bytecode) لآلة إيثريوم الافتراضية للعقد الفعلي). عادةً في Solidity نستخدم فقط `addr = new <name of contract>(<constructor parameters>)` ويتولى المترجم (compiler) كل شيء نيابة عنا، ولكن للحصول على عنوان عقد حتمي نحتاج إلى استخدام [رمز التشغيل CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
عندما تمت كتابة هذا الكود، لم يكن رمز التشغيل هذا مدعومًا بعد بواسطة Solidity، لذلك كان من الضروري الحصول على الكود يدويًا. لم يعد هذا يمثل مشكلة، لأن [Solidity تدعم الآن CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

عندما لا يكون رمز التشغيل مدعومًا بواسطة Solidity بعد، يمكننا استدعاؤه باستخدام [التجميع المضمن (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

استدعِ وظيفة `initialize` لإخبار التبادل الجديد بالرمزين اللذين يتبادلهما.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction // ملء التعيين (mapping) في الاتجاه العكسي
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

احفظ معلومات الزوج الجديد في متغيرات الحالة وأصدر حدثًا لإعلام العالم بتبادل الزوج الجديد.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

تسمح هاتان الوظيفتان لـ `feeSetter` بالتحكم في مستلم الرسوم (إن وجد)، وتغيير `feeSetter` إلى عنوان جديد.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

ينفذ [هذا العقد](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) رمز السيولة ERC-20. إنه مشابه لـ [عقد OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code)، لذلك سأشرح فقط الجزء المختلف، وهو وظيفة `permit`.

تكلف المعاملات على إيثريوم إيثر (ETH)، وهو ما يعادل أموالًا حقيقية. إذا كان لديك رموز ERC-20 ولكن ليس لديك ETH، فلا يمكنك إرسال المعاملات، لذلك لا يمكنك فعل أي شيء بها. أحد الحلول لتجنب هذه المشكلة هو [المعاملات الوصفية (meta-transactions)](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
يوقع مالك الرموز على معاملة تسمح لشخص آخر بسحب الرموز خارج السلسلة ويرسلها باستخدام الإنترنت إلى المستلم. يقوم المستلم، الذي يمتلك ETH، بتقديم التصريح (permit) نيابة عن المالك.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"); // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

هذه التجزئة (هاش) هي [المعرف لنوع المعاملة](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). النوع الوحيد الذي ندعمه هنا هو `Permit` مع هذه المعلمات.

```solidity
    mapping(address => uint) public nonces;
```

ليس من الممكن للمستلم تزوير التوقيع الرقمي. ومع ذلك، من السهل إرسال نفس المعاملة مرتين (هذا شكل من أشكال [هجوم إعادة الإرسال (replay attack)](https://wikipedia.org/wiki/Replay_attack)). لمنع ذلك، نستخدم [رقم عشوائي (nonce)](https://wikipedia.org/wiki/Cryptographic_nonce). إذا لم يكن الرقم العشوائي لـ `Permit` الجديد أكبر بواحد من آخر رقم تم استخدامه، فإننا نفترض أنه غير صالح.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

هذا هو الكود لاسترداد [معرف السلسلة](https://chainid.network/). يستخدم لهجة تجميع EVM تسمى [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). لاحظ أنه في الإصدار الحالي من Yul يجب عليك استخدام `chainid()`، وليس `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

احسب [فاصل المجال (domain separator)](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) لـ EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

هذه هي الوظيفة التي تنفذ الأذونات. تتلقى كمعلمات الحقول ذات الصلة، والقيم العددية الثلاث لـ [التوقيع](https://yos.io/2018/11/16/ethereum-signatures/) (v و r و s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

لا تقبل المعاملات بعد الموعد النهائي.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` هي الرسالة التي نتوقع الحصول عليها. نحن نعرف ما يجب أن يكون عليه الرقم العشوائي، لذلك ليست هناك حاجة للحصول عليه كمعلمة.

تتوقع خوارزمية توقيع إيثريوم الحصول على 256 بت للتوقيع، لذلك نستخدم وظيفة التجزئة (هاش) `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

من الملخص (digest) والتوقيع يمكننا الحصول على العنوان الذي وقعه باستخدام [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

إذا كان كل شيء على ما يرام، فتعامل مع هذا على أنه [موافقة ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## العقود المحيطية {#periphery-contracts}

العقود المحيطية هي واجهة برمجة التطبيقات (API) لـ Uniswap. وهي متاحة للاستدعاءات الخارجية، سواء من عقود أخرى أو تطبيقات لامركزية. يمكنك استدعاء العقود الأساسية مباشرة، ولكن ذلك أكثر تعقيدًا وقد تفقد القيمة إذا ارتكبت خطأ. تحتوي العقود الأساسية فقط على اختبارات للتأكد من عدم تعرضها للاحتيال، وليس فحوصات سلامة لأي شخص آخر. توجد هذه الفحوصات في العقود المحيطية بحيث يمكن تحديثها حسب الحاجة.

### UniswapV2Router01.sol {#UniswapV2Router01}

يحتوي [هذا العقد](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) على مشاكل، و[لم يعد ينبغي استخدامه](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). لحسن الحظ، العقود المحيطية عديمة الحالة (stateless) ولا تحتفظ بأي أصول، لذلك من السهل إيقاف استخدامها واقتراح استخدام البديل، `UniswapV2Router02`، بدلاً منها.

### UniswapV2Router02.sol {#UniswapV2Router02}

في معظم الحالات، ستستخدم Uniswap من خلال [هذا العقد](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
يمكنك معرفة كيفية استخدامه [هنا](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

معظم هذه العناصر إما واجهناها من قبل، أو أنها واضحة إلى حد ما. الاستثناء الوحيد هو `IWETH.sol`. يسمح Uniswap v2 بالتبادل لأي زوج من رموز ERC-20، ولكن الإيثر (ETH) نفسه ليس رمز ERC-20. فهو يسبق المعيار ويتم تحويله بآليات فريدة. لتمكين استخدام ETH في العقود التي تنطبق على رموز ERC-20، ابتكر الناس عقد [الإيثر المغلف (WETH)](https://weth.tkn.eth.limo/). ترسل إلى هذا العقد ETH، ويقوم بـ السك او انشاء كمية معادلة من WETH لك. أو يمكنك حرق WETH، واسترداد ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

يحتاج الموجه (router) إلى معرفة المصنع (factory) الذي يجب استخدامه، وبالنسبة لـ المعاملات التي تتطلب WETH، ما هو عقد WETH الذي يجب استخدامه. هذه القيم [غير قابلة للتغيير](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)، مما يعني أنه لا يمكن تعيينها إلا في دالة البناء (constructor). يمنح هذا المستخدمين الثقة بأنه لن يتمكن أحد من تغييرها للإشارة إلى عقود أقل نزاهة.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

يتأكد هذا المُعدِّل (modifier) من أن المعاملات المحددة بوقت ("افعل X قبل الوقت Y إن استطعت") لا تحدث بعد انتهاء المهلة الزمنية المحددة لها.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

تقوم دالة البناء فقط بتعيين متغيرات الحالة غير القابلة للتغيير.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract // قبول ETH فقط عبر الدالة الاحتياطية (fallback) من عقد WETH
    }
```

يتم استدعاء هذه الدالة عندما نسترد الرموز من عقد WETH ونحولها مرة أخرى إلى ETH. عقد WETH الذي نستخدمه هو الوحيد المصرح له بالقيام بذلك.

#### إضافة السيولة {#add-liquidity}

تضيف هذه الدوال الرموز إلى زوج التبادل، مما يزيد من مجمع السيولة.

```solidity

    // **** ADD LIQUIDITY **** // **** إضافة سيولة ****
    function _addLiquidity(
```

تُستخدم هذه الدالة لحساب كمية الرموز A و B التي يجب إيداعها في زوج التبادل.

```solidity
        address tokenA,
        address tokenB,
```

هذه هي عناوين عقود رموز ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

هذه هي المبالغ التي يرغب مزود السيولة في إيداعها. وهي أيضًا الحد الأقصى للمبالغ من A و B التي سيتم إيداعها.

```solidity
        uint amountAMin,
        uint amountBMin
```

هذه هي الحد الأدنى للمبالغ المقبولة للإيداع. إذا لم يكن من الممكن إتمام المعاملة بهذه المبالغ أو أكثر، فسيتم التراجع عنها. إذا كنت لا تريد هذه الميزة، فما عليك سوى تحديد الصفر.

يحدد مزودو السيولة حدًا أدنى، عادةً، لأنهم يريدون قصر المعاملة على سعر صرف قريب من السعر الحالي. إذا تقلب سعر الصرف كثيرًا، فقد يعني ذلك وجود أخبار تغير القيم الأساسية، ويريدون أن يقرروا يدويًا ما يجب القيام به.

على سبيل المثال، تخيل حالة يكون فيها سعر الصرف واحدًا لواحد ويحدد مزود السيولة هذه القيم:

| المعلمة (Parameter) | القيمة |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

طالما بقي سعر الصرف بين <span dir="ltr">0.9</span> و <span dir="ltr">1.25</span>، تتم المعاملة. إذا خرج سعر الصرف عن هذا النطاق، يتم إلغاء المعاملة.

السبب وراء هذا الإجراء الاحترازي هو أن المعاملات ليست فورية، فأنت ترسلها وفي النهاية سيقوم مُدقِّق بتضمينها في بلوك (ما لم يكن سعر الغاز الخاص بك منخفضًا جدًا، وفي هذه الحالة ستحتاج إلى إرسال معاملة أخرى بنفس الرقم العشوائي و سعر الغاز أعلى للكتابة فوقها). لا يمكنك التحكم في ما يحدث خلال الفترة الفاصلة بين الإرسال والتضمين.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

تُرجع الدالة المبالغ التي يجب على مزود السيولة إيداعها للحصول على نسبة مساوية للنسبة الحالية بين الاحتياطيات.

```solidity
        // create the pair if it doesn't exist yet // إنشاء الزوج إذا لم يكن موجوداً بعد
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

إذا لم يكن هناك تبادل لزوج الرموز هذا بعد، فقم بإنشائه.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

احصل على الاحتياطيات الحالية في الزوج.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

إذا كانت الاحتياطيات الحالية فارغة، فهذا تبادل زوج جديد. يجب أن تكون المبالغ المراد إيداعها مطابقة تمامًا لتلك التي يريد مزود السيولة تقديمها.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

إذا كنا بحاجة إلى معرفة المبالغ التي ستكون عليها، فإننا نحصل على المبلغ الأمثل باستخدام [هذه الدالة](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). نريد نفس النسبة مثل الاحتياطيات الحالية.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

إذا كان `amountBOptimal` أصغر من المبلغ الذي يريد مزود السيولة إيداعه، فهذا يعني أن الرمز B أكثر قيمة حاليًا مما يعتقده مودع السيولة، لذلك يلزم مبلغ أصغر.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

إذا كان مبلغ B الأمثل أكبر من مبلغ B المطلوب، فهذا يعني أن رموز B أقل قيمة حاليًا مما يعتقده مودع السيولة، لذلك يلزم مبلغ أعلى. ومع ذلك، فإن المبلغ المطلوب هو الحد الأقصى، لذلك لا يمكننا القيام بذلك. بدلاً من ذلك، نحسب العدد الأمثل من رموز A للمبلغ المطلوب من رموز B.

بجمع كل ذلك معًا نحصل على هذا الرسم البياني. افترض أنك تحاول إيداع ألف من رموز A (الخط الأزرق) وألف من رموز B (الخط الأحمر). المحور السيني (x) هو سعر الصرف، <span dir="ltr">A/B</span>. إذا كان <span dir="ltr">x=1</span>، فهما متساويان في القيمة وتودع ألفًا من كل منهما. إذا كان <span dir="ltr">x=2</span>، فإن A يمثل ضعف قيمة B (تحصل على رمزين من B مقابل كل رمز A) لذلك تودع ألف رمز B، ولكن فقط <span dir="ltr">500</span> رمز A. إذا كان <span dir="ltr">x=0.5</span>، فإن الوضع ينعكس، ألف رمز A وخمسمائة رمز B.

![Graph](liquidityProviderDeposit.png)

يمكنك إيداع السيولة مباشرة في العقد الأساسي (باستخدام [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110))، ولكن العقد الأساسي يتحقق فقط من أنه لا يتعرض للاحتيال بنفسه، لذلك فإنك تخاطر بفقدان القيمة إذا تغير سعر الصرف بين الوقت الذي ترسل فيه المعاملة الخاصة بك ووقت تنفيذها. إذا كنت تستخدم العقد المحيطي، فإنه يكتشف المبلغ الذي يجب عليك إيداعه ويودعه على الفور، لذلك لا يتغير سعر الصرف ولا تفقد أي شيء.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

يمكن استدعاء هذه الدالة بواسطة معاملة لإيداع السيولة. معظم المعلمات هي نفسها كما في `_addLiquidity` أعلاه، مع استثناءين:

. `to` هو العنوان الذي يحصل على رموز السيولة الجديدة التي تم السك او انشاء لها لإظهار حصة مزود السيولة في المجمع
. `deadline` هو حد زمني على المعاملة

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

نحسب المبالغ التي سيتم إيداعها فعليًا ثم نجد عنوان مجمع السيولة. لتوفير الغاز، لا نقوم بذلك عن طريق سؤال المصنع، ولكن باستخدام دالة المكتبة `pairFor` (انظر أدناه في المكتبات)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

تحويل المبالغ الصحيحة من الرموز من المستخدم إلى زوج التبادل.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

في المقابل، امنح العنوان `to` رموز سيولة لملكية جزئية للمجمع. ترى دالة `mint` في العقد الأساسي عدد الرموز الإضافية التي يمتلكها (مقارنة بما كان لديه في آخر مرة تغيرت فيها السيولة) وتقوم بـ السك او انشاء السيولة وفقًا لذلك.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

عندما يرغب مزود السيولة في توفير السيولة لتبادل زوج رمز/ETH، هناك بعض الاختلافات. يتعامل العقد مع تغليف ETH لمزود السيولة. ليست هناك حاجة لتحديد مقدار ETH الذي يريد المستخدم إيداعه، لأن المستخدم يرسله ببساطة مع المعاملة (المبلغ متاح في `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

لإيداع ETH، يقوم العقد أولاً بتغليفه إلى WETH ثم ينقل WETH إلى الزوج. لاحظ أن التحويل مغلف بـ `assert`. هذا يعني أنه إذا فشل التحويل، فإن استدعاء العقد هذا يفشل أيضًا، وبالتالي فإن التغليف لا يحدث حقًا.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any // استرداد غبار (dust) eth، إن وجد
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

لقد أرسل لنا المستخدم بالفعل ETH، لذلك إذا كان هناك أي فائض متبقي (لأن الرمز الآخر أقل قيمة مما اعتقده المستخدم)، فنحن بحاجة إلى إصدار استرداد.

#### إزالة السيولة {#remove-liquidity}

ستقوم هذه الدوال بإزالة السيولة وسداد مزود السيولة.

```solidity
    // **** REMOVE LIQUIDITY **** // **** إزالة السيولة ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

أبسط حالة لإزالة السيولة. هناك حد أدنى من كل رمز يوافق مزود السيولة على قبوله، ويجب أن يحدث ذلك قبل الموعد النهائي.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair // إرسال السيولة إلى الزوج
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

تتعامل دالة `burn` في العقد الأساسي مع إعادة الرموز إلى المستخدم.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

عندما تُرجع دالة قيمًا متعددة، ولكننا مهتمون ببعضها فقط، فهذه هي الطريقة التي نحصل بها على تلك القيم فقط. إنها أرخص إلى حد ما من حيث الغاز من قراءة قيمة وعدم استخدامها أبدًا.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

ترجمة المبالغ من الطريقة التي يُرجعها بها العقد الأساسي (الرمز ذو العنوان الأدنى أولاً) إلى الطريقة التي يتوقعها المستخدم (المقابلة لـ `tokenA` و `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

لا بأس من إجراء التحويل أولاً ثم التحقق من شرعيته، لأنه إذا لم يكن كذلك، فسنقوم بالتراجع عن جميع تغييرات الحالة.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

إزالة السيولة لـ ETH هي نفسها تقريبًا، باستثناء أننا نتلقى رموز WETH ثم نستردها مقابل ETH لإعادتها إلى مزود السيولة.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

تقوم هذه الدوال بترحيل المعاملات الوصفية (meta-transactions) للسماح للمستخدمين الذين ليس لديهم إيثر بالسحب من المجمع، باستخدام [آلية التصريح (permit)](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) **** // **** إزالة السيولة (دعم الرموز ذات الرسوم عند التحويل) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

يمكن استخدام هذه الدالة للرموز التي لها رسوم تحويل أو تخزين. عندما يكون للرمز مثل هذه الرسوم، لا يمكننا الاعتماد على دالة `removeLiquidity` لإخبارنا بمقدار الرمز الذي نستردّه، لذلك نحتاج إلى السحب أولاً ثم الحصول على الرصيد.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

تجمع الدالة النهائية بين رسوم التخزين والمعاملات الوصفية.

#### التداول {#trade}

```solidity
    // **** SWAP **** // **** تبادل ****
    // requires the initial amount to have already been sent to the first pair // يتطلب أن يكون المبلغ الأولي قد تم إرساله بالفعل إلى الزوج الأول
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

تؤدي هذه الدالة المعالجة الداخلية المطلوبة للدوال المعروضة للمتداولين.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

أثناء كتابتي لهذا، يوجد [<span dir="ltr">388,160</span> رمز ERC-20](https://eth.blockscout.com/tokens). إذا كان هناك تبادل زوجي لكل زوج من الرموز، فسيكون هناك أكثر من <span dir="ltr">150</span> مليار تبادل زوجي. السلسلة بأكملها، في الوقت الحالي، [تحتوي فقط على <span dir="ltr">0.1%</span> من هذا العدد من الحسابات](https://eth.blockscout.com/stats/accountsGrowth). بدلاً من ذلك، تدعم دوال المبادلة مفهوم المسار. يمكن للمتداول استبدال A بـ B، و B بـ C، و C بـ D، لذلك ليست هناك حاجة لتبادل زوجي مباشر بين A و D.

تميل الأسعار في هذه الأسواق إلى أن تكون متزامنة، لأنه عندما تكون غير متزامنة فإنها تخلق فرصة للمراجحة (arbitrage). تخيل، على سبيل المثال، ثلاثة رموز، A و B و C. هناك ثلاثة تبادلات زوجية، واحد لكل زوج.

1. الوضع الأولي
2. يبيع المتداول <span dir="ltr">24.695</span> رمز A ويحصل على <span dir="ltr">25.305</span> رمز B.
3. يبيع المتداول <span dir="ltr">24.695</span> رمز B مقابل <span dir="ltr">25.305</span> رمز C، ويحتفظ بحوالي <span dir="ltr">0.61</span> رمز B كربح.
4. ثم يبيع المتداول <span dir="ltr">24.695</span> رمز C مقابل <span dir="ltr">25.305</span> رمز A، ويحتفظ بحوالي <span dir="ltr">0.61</span> رمز C كربح. يمتلك المتداول أيضًا <span dir="ltr">0.61</span> رمز A إضافي (الـ <span dir="ltr">25.305</span> التي ينتهي بها المتداول، ناقص الاستثمار الأصلي البالغ <span dir="ltr">24.695</span>).

| الخطوة | تبادل A-B | تبادل B-C | تبادل A-C |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | <span dir="ltr">A:1000 B:1050 A/B=1.05</span> | <span dir="ltr">B:1000 C:1050 B/C=1.05</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 2    | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1000 C:1050 B/C=1.05</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 3    | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1024.695 C:1024.695 B/C=1</span> | <span dir="ltr">A:1050 C:1000 C/A=1.05</span> |
| 4    | <span dir="ltr">A:1024.695 B:1024.695 A/B=1</span> | <span dir="ltr">B:1024.695 C:1024.695 B/C=1</span> | <span dir="ltr">A:1024.695 C:1024.695 C/A=1</span> |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

احصل على الزوج الذي نتعامل معه حاليًا، وقم بفرزه (للاستخدام مع الزوج) واحصل على كمية المخرجات المتوقعة.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

احصل على كميات المخرجات المتوقعة، مرتبة بالطريقة التي يتوقعها تبادل الزوج.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

هل هذا هو التبادل الأخير؟ إذا كان الأمر كذلك، فأرسل الرموز المستلمة للتداول إلى الوجهة. إذا لم يكن كذلك، فأرسلها إلى تبادل الزوج التالي.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

قم فعليًا باستدعاء تبادل الزوج لـ مبادلة الرموز. لا نحتاج إلى استدعاء عكسي (callback) لإبلاغنا بالتبادل، لذلك لا نرسل أي بايتات في هذا الحقل.

```solidity
    function swapExactTokensForTokens(
```

تُستخدم هذه الدالة مباشرة من قبل المتداولين لـ مبادلة رمز بآخر.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

تحتوي هذه المعلمة على عناوين عقود ERC-20. كما هو موضح أعلاه، هذه مصفوفة لأنك قد تحتاج إلى المرور عبر عدة تبادلات زوجية للانتقال من الأصل الذي تملكه إلى الأصل الذي تريده.

يمكن تخزين معلمة الدالة في Solidity إما في `memory` أو `calldata`. إذا كانت الدالة نقطة دخول للعقد، ويتم استدعاؤها مباشرة من مستخدم (باستخدام معاملة) أو من عقد مختلف، فيمكن أخذ قيمة المعلمة مباشرة من بيانات الاستدعاء (call data). إذا تم استدعاء الدالة داخليًا، مثل `_swap` أعلاه، فيجب تخزين المعلمات في `memory`. من منظور العقد المستدعى، تكون `calldata` للقراءة فقط.

مع الأنواع العددية (scalar types) مثل `uint` أو `address`، يتعامل المترجم (compiler) مع اختيار التخزين نيابة عنا، ولكن مع المصفوفات، التي تكون أطول وأكثر تكلفة، نحدد نوع التخزين الذي سيتم استخدامه.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

يتم دائمًا إرجاع القيم المرجعة في الذاكرة (memory).

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

احسب المبلغ الذي سيتم شراؤه في كل مبادلة. إذا كانت النتيجة أقل من الحد الأدنى الذي يرغب المتداول في قبوله، فتراجع عن المعاملة.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

أخيرًا، قم بتحويل رمز ERC-20 الأولي إلى الحساب لتبادل الزوج الأول واستدعِ `_swap`. يحدث كل هذا في نفس المعاملة، لذلك يعرف تبادل الزوج أن أي رموز غير متوقعة هي جزء من هذا التحويل.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

تسمح الدالة السابقة، `swapTokensForTokens`، للمتداول بتحديد عدد دقيق من رموز الإدخال التي يرغب في تقديمها والحد الأدنى لعدد رموز الإخراج التي يرغب في تلقيها في المقابل. تقوم هذه الدالة بـ مبادلة عكسية، فهي تتيح للمتداول تحديد عدد رموز الإخراج التي يريدها، والحد الأقصى لعدد رموز الإدخال التي يرغب في دفعها مقابلها.

في كلتا الحالتين، يجب على المتداول أن يمنح هذا العقد المحيطي أولاً مخصصًا (allowance) للسماح له بتحويلها.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any // استرداد غبار (dust) eth، إن وجد
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

تتضمن هذه المتغيرات الأربعة جميعها التداول بين ETH والرموز. الاختلاف الوحيد هو أننا إما نتلقى ETH من المتداول ونستخدمه لـ السك او انشاء WETH، أو نتلقى WETH من التبادل الأخير في المسار ونحرقه، ونعيد ETH الناتج إلى المتداول.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) **** // **** تبادل (دعم الرموز ذات الرسوم عند التحويل) ****
    // requires the initial amount to have already been sent to the first pair // يتطلب أن يكون المبلغ الأولي قد تم إرساله بالفعل إلى الزوج الأول
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

هذه هي الدالة الداخلية لـ مبادلة الرموز التي لها رسوم تحويل أو تخزين لحل ([هذه المشكلة](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors // نطاق لتجنب أخطاء المكدس العميق جداً
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

بسبب رسوم التحويل، لا يمكننا الاعتماد على دالة `getAmountsOut` لإخبارنا بمقدار ما نحصل عليه من كل تحويل (بالطريقة التي نفعلها قبل استدعاء `_swap` الأصلي). بدلاً من ذلك، يتعين علينا التحويل أولاً ثم معرفة عدد الرموز التي استرددناها.

ملاحظة: من الناحية النظرية، يمكننا فقط استخدام هذه الدالة بدلاً من `_swap`، ولكن في حالات معينة (على سبيل المثال، إذا انتهى الأمر بالتراجع عن التحويل لعدم وجود ما يكفي في النهاية لتلبية الحد الأدنى المطلوب) فإن ذلك سيكلف المزيد من الغاز. رموز رسوم التحويل نادرة جدًا، لذلك بينما نحتاج إلى استيعابها، ليست هناك حاجة لجميع عمليات المبادلة لافتراض أنها تمر عبر واحد منها على الأقل.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

هذه هي نفس المتغيرات المستخدمة للرموز العادية، ولكنها تستدعي `_swapSupportingFeeOnTransferTokens` بدلاً من ذلك.

```solidity
    // **** LIBRARY FUNCTIONS **** // **** دوال المكتبة ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

هذه الدوال هي مجرد وكلاء (proxies) تستدعي [دوال UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

تم استخدام هذا العقد لترحيل التبادلات من الإصدار القديم v1 إلى v2. الآن بعد أن تم ترحيلها، لم يعد ذا صلة.

## المكتبات {#libraries}

مكتبة [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) موثقة جيدًا، لذا لا توجد حاجة لتوثيقها هنا.

### الرياضيات {#Math}

تحتوي هذه المكتبة على بعض الدوال الرياضية التي لا يُحتاج إليها عادةً في كود Solidity، لذا فهي ليست جزءًا من اللغة.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations // مكتبة لإجراء عمليات رياضية مختلفة

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method) // الطريقة البابلية (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

ابدأ بـ x كتقدير أعلى من الجذر التربيعي (وهذا هو السبب في أننا بحاجة إلى التعامل مع <span dir="ltr">1-3</span> كحالات خاصة).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

احصل على تقدير أقرب، وهو متوسط التقدير السابق والرقم الذي نحاول إيجاد جذره التربيعي مقسومًا على التقدير السابق. كرر ذلك حتى لا يكون التقدير الجديد أقل من التقدير الحالي. لمزيد من التفاصيل، [انظر هنا](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

لا ينبغي أن نحتاج أبدًا إلى الجذر التربيعي للصفر. الجذور التربيعية للواحد، والاثنين، والثلاثة هي تقريبًا واحد (نحن نستخدم أعدادًا صحيحة، لذا نتجاهل الكسر).

```solidity
        }
    }
}
```

### كسور النقطة الثابتة (UQ112x112) {#FixedPoint}

تتعامل هذه المكتبة مع الكسور، والتي لا تكون عادةً جزءًا من العمليات الحسابية في إيثريوم. وتقوم بذلك عن طريق تشفير الرقم _x_ كـ <span dir="ltr">_x\*2^112_</span>. يتيح لنا هذا استخدام أكواد عمليات الجمع والطرح الأصلية دون تغيير.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format)) // مكتبة للتعامل مع أرقام النقطة الثابتة الثنائية (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1] // النطاق: [0, 2**112 - 1]
// resolution: 1 / 2**112 // الدقة: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` هو التشفير للرقم واحد.

```solidity
    // encode a uint112 as a UQ112x112 // تشفير uint112 كـ UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows // لا يطفح أبداً
    }
```

نظرًا لأن y هو `uint112`، فإن أقصى قيمة يمكن أن يصل إليها هي <span dir="ltr">2^112-1</span>. لا يزال من الممكن تشفير هذا الرقم كـ `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112 // قسمة UQ112x112 على uint112، وإرجاع UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

إذا قسمنا قيمتين من نوع `UQ112x112`، فلن يتم ضرب النتيجة في <span dir="ltr">2^112</span>. لذا بدلاً من ذلك نأخذ عددًا صحيحًا للمقام. كنا سنحتاج إلى استخدام حيلة مشابهة للقيام بعملية الضرب، لكننا لا نحتاج إلى إجراء عملية ضرب لقيم `UQ112x112`.

### مكتبة UniswapV2Library {#uniswapV2library}

تُستخدم هذه المكتبة فقط بواسطة العقود المحيطية

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order // يُرجع عناوين الرموز مرتبة، ويُستخدم للتعامل مع القيم المرجعة من الأزواج المرتبة بهذا الترتيب
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

قم بفرز الرمزين حسب العنوان، حتى نتمكن من الحصول على عنوان منصة التبادل للزوج الخاص بهما. هذا ضروري لأنه بخلاف ذلك سيكون لدينا احتمالان، أحدهما للمعاملات A,B والآخر للمعاملات B,A، مما يؤدي إلى منصتي تبادل بدلاً من واحدة.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls // يحسب عنوان CREATE2 لزوج دون إجراء أي استدعاءات خارجية
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash // التجزئة (هاش) لكود التهيئة
            ))));
    }
```

تحسب هذه الدالة عنوان منصة التبادل للزوج الخاص بالرمزين. يتم إنشاء هذا العقد باستخدام [كود العملية CREATE2](https://eips.ethereum.org/EIPS/eip-1014)، لذا يمكننا حساب العنوان باستخدام نفس الخوارزمية إذا كنا نعرف المعاملات التي يستخدمها. هذا أرخص بكثير من سؤال المصنع (factory)، و

```solidity
    // fetches and sorts the reserves for a pair // يجلب ويرتب الاحتياطيات لزوج
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

تُرجع هذه الدالة احتياطيات الرمزين التي تمتلكها منصة التبادل للزوج. لاحظ أنه يمكنها استقبال الرموز بأي ترتيب، وتقوم بفرزها للاستخدام الداخلي.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset // بناءً على كمية معينة من أصل واحتياطيات الزوج، يُرجع كمية مكافئة من الأصل الآخر
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

تمنحك هذه الدالة كمية الرمز B التي ستحصل عليها مقابل الرمز A إذا لم تكن هناك رسوم متضمنة. يأخذ هذا الحساب في الاعتبار أن التحويل يغير سعر الصرف.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset // بناءً على كمية إدخال من أصل واحتياطيات الزوج، يُرجع أقصى كمية إخراج من الأصل الآخر
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

تعمل دالة `quote` أعلاه بشكل رائع إذا لم تكن هناك رسوم لاستخدام منصة التبادل للزوج. ومع ذلك، إذا كانت هناك رسوم تبادل بنسبة <span dir="ltr">0.3%</span>، فإن المبلغ الذي تحصل عليه فعليًا يكون أقل. تحسب هذه الدالة المبلغ بعد رسوم التبادل.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

لا تتعامل Solidity مع الكسور بشكل أصلي، لذا لا يمكننا ببساطة ضرب المبلغ في 0.997. بدلاً من ذلك، نضرب البسط في 997 والمقام في 1000، مما يحقق نفس التأثير.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset // بناءً على كمية إخراج من أصل واحتياطيات الزوج، يُرجع كمية الإدخال المطلوبة من الأصل الآخر
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

تقوم هذه الدالة بنفس الشيء تقريبًا، لكنها تحصل على كمية المخرجات وتوفر المدخلات.

```solidity

    // performs chained getAmountOut calculations on any number of pairs // يُجري حسابات getAmountOut المتسلسلة على أي عدد من الأزواج
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs // يُجري حسابات getAmountIn المتسلسلة على أي عدد من الأزواج
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

تتعامل هاتان الدالتان مع تحديد القيم عندما يكون من الضروري المرور عبر عدة منصات تبادل للأزواج.

### مساعد التحويل (Transfer Helper) {#transfer-helper}

تضيف [هذه المكتبة](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) فحوصات نجاح حول تحويلات ERC-20 وإيثريوم للتعامل مع التراجع (revert) وإرجاع القيمة `false` بنفس الطريقة.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later // SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false // طرق مساعدة للتفاعل مع رموز ERC20 وإرسال ETH التي لا تُرجع true/false بشكل ثابت
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)'))); // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

يمكننا استدعاء عقد مختلف بإحدى طريقتين:

- استخدام تعريف الواجهة (interface) لإنشاء استدعاء دالة
- استخدام [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "يدويًا" لإنشاء الاستدعاء. هذا ما قرر مؤلف الكود القيام به.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

من أجل التوافق مع الإصدارات السابقة للرموز التي تم إنشاؤها قبل معيار ERC-20، يمكن أن يفشل استدعاء ERC-20 إما عن طريق التراجع (وفي هذه الحالة تكون `success` هي `false`) أو من خلال كونه ناجحًا وإرجاع قيمة `false` (وفي هذه الحالة توجد بيانات مخرجات، وإذا قمت بفك تشفيرها كقيمة منطقية ستحصل على `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)'))); // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

تنفذ هذه الدالة [وظيفة التحويل (transfer) الخاصة بـ ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer)، والتي تسمح لحساب بإنفاق المخصصات المقدمة من حساب مختلف.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)'))); // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

تنفذ هذه الدالة [وظيفة transferFrom الخاصة بـ ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom)، والتي تسمح لحساب بإنفاق المخصصات المقدمة من حساب مختلف.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

تقوم هذه الدالة بتحويل الإيثر (ether) إلى حساب. يمكن لأي استدعاء لعقد مختلف أن يحاول إرسال الإيثر. نظرًا لأننا لا نحتاج فعليًا إلى استدعاء أي دالة، فإننا لا نرسل أي بيانات مع الاستدعاء.

## الخاتمة {#conclusion}

هذا مقال طويل يتكون من حوالي 50 صفحة. إذا وصلت إلى هنا، فتهانينا! نأمل أن تكون قد فهمت الآن الاعتبارات المتعلقة بكتابة تطبيق واقعي (على عكس البرامج النموذجية القصيرة) وأن تكون أكثر قدرة على كتابة العقود لحالات الاستخدام الخاصة بك.

الآن اذهب واكتب شيئًا مفيدًا وأبهرنا.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).