---
title: "كيفية محاكاة العقود الذكية في ⁦Solidity⁩ للاختبار"
description: "لماذا يجب عليك السخرية من عقودك عند الاختبار"
author: ماركوس واس
lang: ar
tags: ["solidity", "العقود الذكية", "الاختبار", "المحاكاة"]
skill: intermediate
breadcrumb: "محاكاة العقود"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

تُعد [الكائنات الوهمية (Mock objects)](https://wikipedia.org/wiki/Mock_object) نمط تصميم شائع في البرمجة كائنية التوجه. تأتي من الكلمة الفرنسية القديمة "mocquer" والتي تعني "السخرية من"، وتطورت لتعني "تقليد شيء حقيقي" وهو في الواقع ما نفعله في البرمجة. يرجى السخرية من عقودك الذكية فقط إذا كنت ترغب في ذلك، ولكن قم بمحاكاتها كلما استطعت. فهذا يجعل حياتك أسهل.

## اختبار الوحدة للعقود باستخدام المحاكاة {#unit-testing-contracts-with-mocks}

تعني محاكاة العقد بشكل أساسي إنشاء إصدار ثانٍ من ذلك العقد يتصرف بشكل مشابه جدًا للإصدار الأصلي، ولكن بطريقة يمكن للمطور التحكم فيها بسهولة. غالبًا ما ينتهي بك الأمر بعقود معقدة حيث تريد فقط [إجراء اختبار الوحدة لأجزاء صغيرة من العقد](/developers/docs/smart-contracts/testing/). تكمن المشكلة في ماذا لو كان اختبار هذا الجزء الصغير يتطلب حالة عقد محددة للغاية يصعب الوصول إليها؟

يمكنك كتابة منطق إعداد اختبار معقد في كل مرة يضع العقد في الحالة المطلوبة أو يمكنك كتابة محاكاة. محاكاة العقد أمر سهل باستخدام الوراثة. ما عليك سوى إنشاء عقد محاكاة ثانٍ يرث من العقد الأصلي. الآن يمكنك تجاوز (override) الدوال في محاكاتك. دعونا نرى ذلك بمثال.

## مثال: <span dir="ltr">ERC-20</span> خاص {#example-private-erc20}

نستخدم مثالًا لعقد <span dir="ltr">ERC-20</span> يحتوي على وقت خاص أولي. يمكن للمالك إدارة المستخدمين الخاصين وسيُسمح لهؤلاء فقط بتلقي الرموز في البداية. بمجرد مرور وقت معين، سيُسمح للجميع باستخدام الرموز. إذا كنت مهتمًا، فنحن نستخدم الخطاف (hook) [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) من عقود أوبن زبلن (OpenZeppelin) الجديدة الإصدار الثالث (<span dir="ltr">v3</span>).

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

والآن دعونا نقوم بمحاكاته.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

ستحصل على إحدى رسائل الخطأ التالية:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

نظرًا لأننا نستخدم إصدار Solidity الجديد <span dir="ltr">0.6</span>، يجب علينا إضافة الكلمة المفتاحية `virtual` للدوال التي يمكن تجاوزها، وكلمة `override` للدالة التي تقوم بالتجاوز. لذا دعونا نضيفها إلى كلتا دالتي `isPublic`.

الآن في اختبارات الوحدة الخاصة بك، يمكنك استخدام `PrivateERC20Mock` بدلاً من ذلك. عندما تريد اختبار السلوك خلال وقت الاستخدام الخاص، استخدم `setIsPublic(false)` وبالمثل `setIsPublic(true)` لاختبار وقت الاستخدام العام. بالطبع في مثالنا، يمكننا فقط استخدام [مساعدات الوقت (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) لتغيير الأوقات وفقًا لذلك أيضًا. لكن فكرة المحاكاة يجب أن تكون واضحة الآن ويمكنك تخيل سيناريوهات حيث لا يكون الأمر سهلاً مثل مجرد تقديم الوقت.

## محاكاة العديد من العقود {#mocking-many-contracts}

قد يصبح الأمر فوضويًا إذا كان عليك إنشاء عقد آخر لكل محاكاة على حدة. إذا كان هذا يزعجك، يمكنك إلقاء نظرة على مكتبة [MockContract](https://github.com/gnosis/mock-contract). إنها تسمح لك بتجاوز وتغيير سلوكيات العقود بسرعة (on-the-fly). ومع ذلك، فهي تعمل فقط لمحاكاة الاستدعاءات لعقد آخر، لذلك لن تعمل مع مثالنا.

## يمكن أن تكون المحاكاة أكثر قوة {#mocking-can-be-even-more-powerful}

لا تنتهي قوى المحاكاة عند هذا الحد.

- إضافة دوال: ليس فقط تجاوز دالة معينة هو المفيد، بل أيضًا مجرد إضافة دوال إضافية. من الأمثلة الجيدة للرموز هو مجرد وجود دالة `mint` إضافية للسماح لأي مستخدم بالحصول على رموز جديدة مجانًا.
- الاستخدام في شبكات الاختبار (testnets): عندما تقوم بنشر واختبار عقودك على شبكات الاختبار مع تطبيقك اللامركزي (dapp)، فكر في استخدام إصدار محاكى. تجنب تجاوز الدوال إلا إذا كنت مضطرًا لذلك حقًا. فأنت تريد اختبار المنطق الحقيقي في النهاية. لكن إضافة دالة إعادة تعيين (reset) على سبيل المثال يمكن أن يكون مفيدًا حيث تقوم ببساطة بإعادة تعيين حالة العقد إلى البداية، دون الحاجة إلى نشر جديد. من الواضح أنك لن ترغب في وجود ذلك في عقد على الشبكة الرئيسية (Mainnet).