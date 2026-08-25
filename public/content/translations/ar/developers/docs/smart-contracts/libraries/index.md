---
title: "مكتبات العقود الذكية"
description: "اكتشف مكتبات العقود الذكية القابلة لإعادة الاستخدام واللبنات الأساسية لتسريع مشاريع تطوير إيثيريوم الخاصة بك."
lang: ar
---

لا تحتاج إلى كتابة كل عقد ذكي في مشروعك من الصفر. هناك العديد من مكتبات العقود الذكية مفتوحة المصدر المتاحة التي توفر لبنات بناء قابلة لإعادة الاستخدام لمشروعك والتي يمكن أن توفر عليك عناء إعادة اختراع العجلة.

## المتطلبات الأساسية {#prerequisites}

قبل القفز إلى مكتبات العقود الذكية، من الجيد أن يكون لديك فهم جيد لهيكل العقد الذكي. توجه إلى [تشريح العقد الذكي](/developers/docs/smart-contracts/anatomy/) إذا لم تكن قد فعلت ذلك بعد.

## ماذا يوجد في المكتبة {#whats-in-a-library}

يمكنك عادةً العثور على نوعين من لبنات البناء في مكتبات العقود الذكية: سلوكيات قابلة لإعادة الاستخدام يمكنك إضافتها إلى عقودك، وتطبيقات لمعايير مختلفة.

### السلوكيات {#behaviors}

عند كتابة العقود الذكية، هناك فرصة جيدة لأن تجد نفسك تكتب أنماطًا مشابهة مرارًا وتكرارًا، مثل تعيين عنوان _مسؤول_ (admin) لتنفيذ عمليات محمية في عقد، أو إضافة زر _إيقاف مؤقت_ (pause) للطوارئ في حالة حدوث مشكلة غير متوقعة.

توفر مكتبات العقود الذكية عادةً تطبيقات قابلة لإعادة الاستخدام لهذه السلوكيات كـ [مكتبات](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) أو عبر [الوراثة](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) في Solidity.

كمثال، فيما يلي نسخة مبسطة من [عقد `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) من [مكتبة عقود أوبن زبلن](https://github.com/OpenZeppelin/openzeppelin-contracts)، والذي يعين عنوانًا كمالك لعقد، ويوفر مُعدِّلًا (modifier) لتقييد الوصول إلى طريقة (method) فقط لذلك المالك.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

لاستخدام لبنة بناء مثل هذه في عقدك، ستحتاج أولاً إلى استيرادها، ثم التوسع منها في عقودك الخاصة. سيسمح لك هذا باستخدام المُعدِّل الذي يوفره عقد `Ownable` الأساسي لتأمين دوالك الخاصة.

```solidity
import ".../Ownable.sol"; // مسار المكتبة المستوردة

contract MyContract is Ownable {
    // يمكن استدعاء الدالة التالية بواسطة المالك فقط
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

مثال شائع آخر هو [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) أو [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). هذه مكتبات (على عكس العقود الأساسية) توفر دوال حسابية مع فحوصات تجاوز السعة، والتي لا توفرها اللغة. من الممارسات الجيدة استخدام أي من هاتين المكتبتين بدلاً من العمليات الحسابية الأصلية لحماية عقدك من تجاوز السعة، والذي يمكن أن يكون له عواقب وخيمة!

### المعايير {#standards}

لتسهيل [قابلية التركيب وقابلية التشغيل البيني](/developers/docs/smart-contracts/composability/)، حدد مجتمع إيثيريوم العديد من المعايير في شكل **ERCs**. يمكنك قراءة المزيد عنها في قسم [المعايير](/developers/docs/standards/).

عند تضمين ERC كجزء من عقودك، من الجيد البحث عن تطبيقات قياسية بدلاً من محاولة إنشاء تطبيقاتك الخاصة. تتضمن العديد من مكتبات العقود الذكية تطبيقات لأكثر ERCs شيوعًا. على سبيل المثال، يمكن العثور على [معيار الرمز القابل للاستبدال <span dir="ltr">ERC-20</span>](/developers/tutorials/understand-the-erc-20-token-smart-contract/) واسع الانتشار في [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md) و [DappSys](https://github.com/dapphub/ds-token/) و [أوبن زبلن](https://docs.openzeppelin.com/contracts/3.x/erc20). بالإضافة إلى ذلك، توفر بعض ERCs أيضًا تطبيقات أساسية كجزء من ERC نفسه.

تجدر الإشارة إلى أن بعض ERCs ليست مستقلة، بل هي إضافات إلى ERCs أخرى. على سبيل المثال، يضيف [<span dir="ltr">ERC-2612</span>](https://eips.ethereum.org/EIPS/eip-2612) امتدادًا إلى <span dir="ltr">ERC-20</span> لتحسين قابليته للاستخدام.

## كيفية إضافة مكتبة {#how-to}

ارجع دائمًا إلى وثائق المكتبة التي تقوم بتضمينها للحصول على تعليمات محددة حول كيفية تضمينها في مشروعك. يتم حزم العديد من مكتبات عقود Solidity باستخدام `npm`، لذا يمكنك فقط استخدام `npm install` معها. ستبحث معظم أدوات [تصريف](/developers/docs/smart-contracts/compiling/) العقود في `node_modules` الخاص بك عن مكتبات العقود الذكية، لذا يمكنك القيام بما يلي:

```solidity
// سيقوم هذا بتحميل مكتبة @openzeppelin/contracts من node_modules الخاص بك
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

بغض النظر عن الطريقة التي تستخدمها، عند تضمين مكتبة، راقب دائمًا إصدار [اللغة](/developers/docs/smart-contracts/languages/). على سبيل المثال، لا يمكنك استخدام مكتبة لـ <span dir="ltr">Solidity 0.6</span> إذا كنت تكتب عقودك بـ <span dir="ltr">Solidity 0.5</span>.

## متى تستخدمها {#when-to-use}

استخدام مكتبة عقود ذكية لمشروعك له فوائد عديدة. أولاً وقبل كل شيء، يوفر لك الوقت من خلال تزويدك بلبنات بناء جاهزة للاستخدام يمكنك تضمينها في نظامك، بدلاً من الاضطرار إلى برمجتها بنفسك.

الأمان هو أيضًا ميزة رئيسية. غالبًا ما تخضع مكتبات العقود الذكية مفتوحة المصدر لتدقيق شديد. نظرًا لأن العديد من المشاريع تعتمد عليها، فهناك حافز قوي من قبل المجتمع لإبقائها قيد المراجعة المستمرة. من الشائع جدًا العثور على أخطاء في كود التطبيق أكثر من مكتبات العقود القابلة لإعادة الاستخدام. تخضع بعض المكتبات أيضًا لـ [عمليات تدقيق خارجية](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) لمزيد من الأمان.

ومع ذلك، فإن استخدام مكتبات العقود الذكية يحمل خطر تضمين كود لست على دراية به في مشروعك. من المغري استيراد عقد وتضمينه مباشرة في مشروعك، ولكن بدون فهم جيد لما يفعله هذا العقد، قد تتسبب عن غير قصد في إحداث مشكلة في نظامك بسبب سلوك غير متوقع. تأكد دائمًا من قراءة وثائق الكود الذي تقوم باستيراده، ثم راجع الكود نفسه قبل جعله جزءًا من مشروعك!

أخيرًا، عند اتخاذ قرار بشأن تضمين مكتبة، ضع في اعتبارك استخدامها العام. تتمتع المكتبة المعتمدة على نطاق واسع بفوائد وجود مجتمع أكبر والمزيد من الأعين التي تبحث فيها عن المشكلات. يجب أن يكون الأمان هو تركيزك الأساسي عند البناء باستخدام العقود الذكية!

## أدوات ذات صلة {#related-tools}

**عقود أوبن زبلن -** **_المكتبة الأكثر شيوعًا لتطوير العقود الذكية الآمنة._**

- [الوثائق](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [منتدى المجتمع](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_لبنات بناء آمنة وبسيطة ومرنة للعقود الذكية._**

- [الوثائق](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_مشروع Solidity يحتوي على عقود ومكتبات وأمثلة لمساعدتك في بناء تطبيقات موزعة كاملة الميزات للعالم الحقيقي._**

- [GitHub](https://github.com/HQ20/contracts)

**حزمة تطوير برمجيات Solidity من thirdweb -** **_توفر الأدوات اللازمة لبناء عقود ذكية مخصصة بكفاءة_**

- [الوثائق](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## برامج تعليمية ذات صلة {#related-tutorials}

- [اعتبارات الأمان لمطوري إيثيريوم](/developers/docs/smart-contracts/security/) _– برنامج تعليمي حول اعتبارات الأمان عند بناء العقود الذكية، بما في ذلك استخدام المكتبة._
- [فهم العقد الذكي للرمز المميز <span dir="ltr">ERC-20</span>](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- برنامج تعليمي حول معيار <span dir="ltr">ERC-20</span>، مقدم من مكتبات متعددة._

## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_