---
title: معيار القبو المرمز غير المتزامن ⁦ERC-7540⁩
description: امتداد لمعيار ⁦ERC-4626⁩ يضيف تدفقات إيداع واسترداد غير متزامنة للأقبية المرمزة.
lang: ar
---

## مقدمة {#introduction}

يوسع <span dir="ltr">ERC-7540</span> [معيار القبو المرمز <span dir="ltr">ERC-4626</span>](/developers/docs/standards/tokens/erc-4626/) من خلال إضافة دعم لتدفقات الإيداع والاسترداد غير المتزامنة. يقدم نمط الطلب ثم المطالبة: يرسل المستخدمون أولاً طلباً (قفل أصولهم أو حصصهم)، ثم يطالبون بالنتيجة بعد أن يعالجها القبو.

هناك حاجة إلى ذلك عندما لا يتمكن القبو من إجراء تسوية فورية في معاملة واحدة، على سبيل المثال:

- بروتوكولات أصول العالم الحقيقي (<span dir="ltr">RWA</span>) مثل سندات الخزانة المرمزة، والائتمان الخاص، والأصول الأخرى ذات دورات تسوية <span dir="ltr">T+1</span> أو <span dir="ltr">T+2</span>
- الإقراض غير المضمون بالكامل حيث تتم تقييمات الائتمان خارج السلسلة
- استراتيجيات القبو عبر السلاسل حيث يؤدي التجسير إلى حدوث تأخيرات
- رموز التخزين السائل (<span dir="ltr">LST</span>) ذات فترات فك الارتباط

يمكن للأقبية اختيار أن تكون غير متزامنة في الإيداعات فقط، أو الاستردادات فقط، أو كليهما. تتيح هذه المرونة لمطوري القبو إضافة تدفقات غير متزامنة فقط حيث تتطلب الاستراتيجية الأساسية ذلك، مع الحفاظ على الجانب الآخر متزامناً.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك بقراءة [معايير الرموز المميزة](/developers/docs/standards/tokens/)، و[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، و[<span dir="ltr">ERC-4626</span>](/developers/docs/standards/tokens/erc-4626/) أولاً.

## <span dir="ltr">ERC-4626</span> مقابل <span dir="ltr">ERC-7540</span> {#comparison}

في <span dir="ltr">ERC-4626</span>، تتم تسوية الإيداع بشكل ذري: يرسل المستثمر الأصول ويتلقى الحصص في معاملة واحدة.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

يقسم <span dir="ltr">ERC-7540</span> هذا إلى خطوتين. يستدعي المستثمر أولاً `requestDeposit()` لقفل الأصول، ثم ينتظر مدير القبو لمعالجة الطلب. بمجرد التنفيذ، يستدعي المستثمر `deposit()` للمطالبة بحصصه. يتم تحديد أسعار الصرف في وقت التنفيذ، وليس في وقت الطلب.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

يعمل تدفق الاسترداد بنفس الطريقة: يقفل `requestRedeem()` الحصص، وبمجرد التنفيذ يستدعي المستثمر `redeem()` للمطالبة بالأصول.

## وظائف وميزات <span dir="ltr">ERC-7540</span> {#body}

يرث <span dir="ltr">ERC-7540</span> واجهة <span dir="ltr">ERC-4626</span> بالكامل ولكنه يعيد استخدام `deposit`/`mint`/`withdraw`/`redeem` كوظائف مطالبة. تتعامل الوظيفتان الجديدتان `requestDeposit` و`requestRedeem` مع خطوة الطلب الأولية.

يمر كل طلب بثلاث حالات: معلق (تم إرساله، في انتظار المعالجة)، وقابل للمطالبة (تم تنفيذه وتسعيره)، ومطالب به (قام المستثمر بجمع حصصه أو أصوله).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### تدفق طلب الإيداع {#deposit-request-flow}

#### <span dir="ltr">requestDeposit</span> {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

يحول `assets` من `owner` إلى القبو ويرسل طلب إيداع. يتلقى العنوان `controller` التحكم في الطلب. يُرجع `requestId` يحدد دفعة الطلب.

#### <span dir="ltr">pendingDepositRequest</span> {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

يُرجع مقدار `assets` في طلب إيداع معلق (غير قابل للمطالبة بعد) للعنوان `controller` و`requestId` المحددين.

#### <span dir="ltr">claimableDepositRequest</span> {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

يُرجع مقدار `assets` في طلب إيداع قابل للمطالبة (تم تنفيذه ولكن لم تتم المطالبة به بعد) للعنوان `controller` و`requestId` المحددين.

#### المطالبة بالإيداعات {#claiming-deposits}

بمجرد أن يصبح طلب الإيداع قابلاً للمطالبة، يستدعي المستخدم وظيفة <span dir="ltr">ERC-4626</span> القياسية [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) أو [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) للمطالبة بحصصه. في <span dir="ltr">ERC-7540</span>، لم تعد هذه الوظائف تحول الأصول (حدث ذلك بالفعل في وقت الطلب). إنها تقوم فقط بسك الحصص للمستلم.

### تدفق طلب الاسترداد {#redemption-request-flow}

#### <span dir="ltr">requestRedeem</span> {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

يقفل `shares` من `owner` ويرسل طلب استرداد. يتلقى العنوان `controller` التحكم في الطلب.

#### <span dir="ltr">pendingRedeemRequest</span> {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

يُرجع مقدار `shares` في طلب استرداد معلق للعنوان `controller` و`requestId` المحددين.

#### <span dir="ltr">claimableRedeemRequest</span> {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

يُرجع مقدار `shares` في طلب استرداد قابل للمطالبة للعنوان `controller` و`requestId` المحددين.

#### المطالبة بالاستردادات {#claiming-redemptions}

بمجرد أن يصبح طلب الاسترداد قابلاً للمطالبة، يستدعي المستخدم وظيفة <span dir="ltr">ERC-4626</span> القياسية [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) أو [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) للمطالبة بأصوله.

### إدارة المشغل {#operator-management}

يتضمن <span dir="ltr">ERC-7540</span> نمط مشغل (من [<span dir="ltr">ERC-6909</span>](https://eips.ethereum.org/EIPS/eip-6909)) يسمح لأطراف ثالثة بإدارة الطلبات نيابة عن المستخدم.

#### <span dir="ltr">setOperator</span> {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

يوافق على أو يلغي `operator` للتصرف نيابة عن `msg.sender` لطلبات الإيداع/الاسترداد والمطالبات.

#### <span dir="ltr">isOperator</span> {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

يُرجع ما إذا كان `operator` معتمداً للتصرف نيابة عن `controller`.

### معرفات الطلب {#request-ids}

تميز معرفات الطلب بين الدفعات المختلفة من الطلبات. جميع الطلبات التي تشترك في نفس `requestId` قابلة للاستبدال: فهي تنتقل بين الحالات معاً وتتلقى نفس سعر الصرف.

عندما يُرجع القبو `requestId = 0` لجميع الطلبات، فإن العنوان `controller` فقط هو الذي يميز حالة الطلب. يتم تجميع الطلبات المتعددة من نفس المتحكم.

### أحداث {#events}

#### حدث <span dir="ltr">DepositRequest</span> {#depositrequest-event}

يجب إصداره عند إرسال طلب إيداع عبر [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### حدث <span dir="ltr">RedeemRequest</span> {#redeemrequest-event}

يجب إصداره عند إرسال طلب استرداد عبر [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### حدث <span dir="ltr">OperatorSet</span> {#operatorset-event}

يجب إصداره عند الموافقة على مشغل أو إلغائه عبر [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### وظائف المعاينة {#preview-functions}

يجب أن تتراجع وظائف المعاينة فقط للتدفقات غير المتزامنة، لأن سعر الصرف غير معروف حتى يتم تنفيذ الطلب. في قبو الإيداع غير المتزامن، يجب أن تتراجع `previewDeposit` و`previewMint`، بينما تستمر `previewRedeem` و`previewWithdraw` في العمل كما هو الحال في <span dir="ltr">ERC-4626</span> (والعكس صحيح بالنسبة لقبو الاسترداد غير المتزامن). هذا اختلاف سلوكي رئيسي عن <span dir="ltr">ERC-4626</span>.

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-7540</span>: أقبية <span dir="ltr">ERC-4626</span> المرمزة غير المتزامنة](https://eips.ethereum.org/EIPS/eip-7540)
- [<span dir="ltr">EIP-4626</span>: معيار القبو المرمز](https://eips.ethereum.org/EIPS/eip-4626)
- [تنفيذ أوبن زبلن لمعيار <span dir="ltr">ERC-7540</span>](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)