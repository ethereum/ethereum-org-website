---
title: "How to mock سوليديتي smart contracts for testing"
description: Why you should make fun of your contracts when testing
author: "ماركوس واس"
lang: ar
tags: [ "Solidity", "العقود الذكيه ", "الاختبار", "mocking" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[الكائنات الوهمية](https://wikipedia.org/wiki/Mock_object) هي نمط تصميم شائع في البرمجة كائنية التوجه. Coming from the old French word 'mocquer' with the meaning of 'making fun of', it evolved to 'imitating something real' which is actually what we are doing in programming. Please only make fun of your smart contracts if you want to, but mock them whenever you can. It makes your life easier.

## اختبار الوحدات للعقود باستخدام الكائنات الوهمية {#unit-testing-contracts-with-mocks}

يعني محاكاة (Mocking) العقد بشكل أساسي إنشاء نسخة ثانية من ذلك العقد تتصرف بشكل مشابه جداً للأصلي، ولكن بطريقة يمكن للمطور التحكم فيها بسهولة. غالباً ما ينتهي بك الأمر بعقود معقدة حيث تريد فقط [اختبار أجزاء صغيرة من العقد](/developers/docs/smart-contracts/testing/). المشكلة هي ماذا لو كان اختبار هذا الجزء الصغير يتطلب حالة عقد محددة للغاية يصعب الوصول إليها؟

يمكنك كتابة منطق إعداد اختبار معقد في كل مرة يجلب العقد في الحالة المطلوبة أو يمكنك كتابة Mock. محاكاة العقد سهلة باستخدام الوراثة (Inheritance). ببساطة أنشئ عقد Mock ثانياً يرث من العقد الأصلي. يمكنك الآن تجاوز الوظائف (Override) في الـ Mock الخاص بك. دعنا نرى ذلك من خلال مثال.

## مثال: PrivateERC20 {#example-private-erc20}

نحن نستخدم مثال لعقد ERC-20 له فترة خصوصية أولية. يمكن للمالك إدارة المستخدمين الخاصين والذين سيُسمح لهم فقط بتلقي التوكنات في البداية. بمجرد مرور وقت معين، سيُسمح للجميع باستخدام التوكنات. إذا كنت مهتماً، فنحن نستخدم Hook الـ [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) من عقود OpenZeppelin الجديدة الإصدار 3.

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

        require(_validRecipient(to), "PrivateERC20: مستلم غير صالح");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

And now let's mock it.

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

ستتلقى إحدى رسائل الخطأ التالية:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

بما أننا نستخدم إصدار سوليديتي 0.6 الجديد، علينا إضافة الكلمة المفتاحية `virtual` للدوال التي يمكن تجاوزها و `override` للدالة التي تقوم بالتجاوز. لذا دعنا نضيفهما إلى كلتا الدالتين `isPublic`.

الآن في اختبارات الوحدات الخاصة بك، يمكنك استخدام `PrivateERC20Mock` بدلاً من ذلك. عندما تريد اختبار السلوك أثناء وقت الاستخدام الخاص، استخدم `setIsPublic(false)`، وبالمثل استخدم `setIsPublic(true)` لاختبار وقت الاستخدام العام. بالطبع في مثالنا، يمكننا ببساطة استخدام [مساعدات الوقت](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) لتغيير الأوقات وفقًا لذلك أيضًا. But the idea of mocking should be clear now and you can imagine scenarios where it is not as easy as simply advancing the time.

## محاكاة العديد من العقود {#mocking-many-contracts}

يمكن أن يصبح الأمر فوضوياً إذا اضطررت لإنشاء عقد آخر لكل Mock مفرد. إذا كان هذا يزعجك، فيمكنك إلقاء نظرة على مكتبة [MockContract](https://github.com/gnosis/mock-contract). إنها تسمح لك بتجاوز وتغيير سلوكيات العقود بسرعة. ومع ذلك، فهي تعمل فقط لمحاكاة الاستدعاءات لعقد آخر، لذا لن تعمل في مثالنا.

## يمكن أن تكون المحاكاة أكثر قوة {#mocking-can-be-even-more-powerful}

The powers of mocking do not end there.

- Adding functions: Not only overriding a specific function is useful, but also just adding additional functions. من الأمثلة الجيدة للرموز وجود دالة `mint` إضافية للسماح لأي مستخدم بالحصول على رموز جديدة مجانًا.
- الاستخدام في شبكات الاختبار (Testnets): عندما تنشر وتختبر عقودك على شبكات الاختبار مع تطبيقك اللامركزي، فكر في استخدام نسخة Mock. تجنب تجاوز الوظائف ما لم تضطر حقاً لذلك. فأنت تريد اختبار المنطق الحقيقي في النهاية. ولكن إضافة دالة إعادة تعيين (Reset) مثلاً يمكن أن يكون مفيداً بحيث يعيد تعيين حالة العقد ببساطة إلى البداية، دون الحاجة إلى نشر جديد. من الواضح أنك لن ترغب في وجود ذلك في عقد على الشبكة الرئيسية (Mainnet).
