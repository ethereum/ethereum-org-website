---
title: How to mock Solidity smart contracts for testing
description: Why you should make fun of your contracts when testing
author: Markus Waas
lang: ar
tags: [ "الصلابة", "العقود الذكيه ", "الاختبار", "mocking" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[الكائنات الوهمية](https://wikipedia.org/wiki/Mock_object) هي نمط تصميم شائع في البرمجة كائنية التوجه. Coming from the old French word 'mocquer' with the meaning of 'making fun of', it evolved to 'imitating something real' which is actually what we are doing in programming. Please only make fun of your smart contracts if you want to, but mock them whenever you can. It makes your life easier.

## اختبار الوحدات للعقود باستخدام الكائنات الوهمية {#unit-testing-contracts-with-mocks}

Mocking a contract essentially means creating a second version of that contract which behaves very similar to the original one, but in a way that can be easily controlled by the developer. غالبًا ما ينتهي بك الأمر بعقود معقدة حيث تريد فقط [اختبار أجزاء صغيرة من العقد](/developers/docs/smart-contracts/testing/). The problem is what if testing this small part requires a very specific contract state that is difficult to end up in؟

You could write complex test setup logic every time that brings in the contract in the required state or you write a mock. Mocking a contract is easy with inheritance. Simply create a second mock contract that inherits from the original one. Now you can override functions to your mock. Let us see it with an example.

## مثال: PrivateERC20 {#example-private-erc20}

We use an example ERC-20 contract that has an initial private time. The owner can manage private users and only those will be allowed to receive tokens at the beginning. Once a certain time has passed, everyone will be allowed to use the tokens. إذا كنت مهتمًا، فنحن نستخدم خطاف [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) من عقود OpenZeppelin الجديدة الإصدار 3.

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

You will get one of the following error messages:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

بما أننا نستخدم إصدار سوليديتي 0.6 الجديد، علينا إضافة الكلمة المفتاحية `virtual` للدوال التي يمكن تجاوزها و `override` للدالة التي تقوم بالتجاوز. لذا دعنا نضيفهما إلى كلتا الدالتين `isPublic`.

الآن في اختبارات الوحدات الخاصة بك، يمكنك استخدام `PrivateERC20Mock` بدلاً من ذلك. عندما تريد اختبار السلوك أثناء وقت الاستخدام الخاص، استخدم `setIsPublic(false)`، وبالمثل استخدم `setIsPublic(true)` لاختبار وقت الاستخدام العام. بالطبع في مثالنا، يمكننا ببساطة استخدام [مساعدات الوقت](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) لتغيير الأوقات وفقًا لذلك أيضًا. But the idea of mocking should be clear now and you can imagine scenarios where it is not as easy as simply advancing the time.

## محاكاة العديد من العقود {#mocking-many-contracts}

It can become messy if you have to create another contract for every single mock. إذا كان هذا يزعجك، فيمكنك إلقاء نظرة على مكتبة [MockContract](https://github.com/gnosis/mock-contract). إنها تسمح لك بتجاوز وتغيير سلوكيات العقود بسرعة. However, it works only for mocking calls to another contract, so it would not work for our example.

## يمكن أن تكون المحاكاة أكثر قوة {#mocking-can-be-even-more-powerful}

The powers of mocking do not end there.

- Adding functions: Not only overriding a specific function is useful, but also just adding additional functions. من الأمثلة الجيدة للرموز وجود دالة `mint` إضافية للسماح لأي مستخدم بالحصول على رموز جديدة مجانًا.
- Usage in testnets: When you deploy and test your contracts on testnets together with your dapp, consider using a mocked version. Avoid overriding functions unless you really have to. You want to test the real logic after all. But adding for example a reset function can be useful that simply resets the contract state to the beginning, no new deployment required. Obviously you would not want to have that in a Mainnet contract.
