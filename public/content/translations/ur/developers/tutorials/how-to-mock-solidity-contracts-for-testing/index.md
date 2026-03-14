---
title: "ٹیسٹنگ کے لیے Solidity اسمارٹ کنٹریکٹس کو کیسے موک کریں"
description: "ٹیسٹنگ کے دوران آپ کو اپنے کنٹریکٹس کا مذاق کیوں اڑانا چاہئے"
author: Markus Waas
lang: ur-in
tags: [ "solidity", "اسمارٹ معاہدات", "testing", "mocking" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[موک آبجیکٹس](https://wikipedia.org/wiki/Mock_object) آبجیکٹ اورینٹڈ پروگرامنگ میں ایک عام ڈیزائن پیٹرن ہیں۔ پرانے فرانسیسی لفظ 'mocquer' سے ماخوذ ہے جس کا مطلب ہے 'مذاق اڑانا'، یہ 'کسی حقیقی چیز کی نقل کرنے' میں تبدیل ہو گیا جو دراصل وہی ہے جو ہم پروگرامنگ میں کرتے ہیں۔ براہ کرم اپنے اسمارٹ کنٹریکٹس کا مذاق صرف تب ہی اڑائیں جب آپ چاہیں، لیکن جب بھی ممکن ہو انہیں موک کریں۔ یہ آپ کی زندگی کو آسان بناتا ہے۔

## موکس کے ساتھ کنٹریکٹس کی یونٹ ٹیسٹنگ {#unit-testing-contracts-with-mocks}

ایک کنٹریکٹ کو موک کرنے کا بنیادی طور پر مطلب اس کنٹریکٹ کا دوسرا ورژن بنانا ہے جو اصل والے سے بہت ملتا جلتا برتاؤ کرتا ہے، لیکن اس طریقے سے جسے ڈیولپر آسانی سے کنٹرول کر سکتا ہے۔ آپ اکثر پیچیدہ کنٹریکٹس کے ساتھ کام کرتے ہیں جہاں آپ صرف [کنٹریکٹ کے چھوٹے حصوں کی یونٹ ٹیسٹنگ](/developers/docs/smart-contracts/testing/) کرنا چاہتے ہیں۔ مسئلہ یہ ہے کہ اگر اس چھوٹے حصے کی ٹیسٹنگ کے لیے ایک بہت ہی مخصوص کنٹریکٹ اسٹیٹ کی ضرورت ہو جس تک پہنچنا مشکل ہو تو کیا ہوگا؟

آپ ہر بار پیچیدہ ٹیسٹ سیٹ اپ لاجک لکھ سکتے ہیں جو کنٹریکٹ کو مطلوبہ اسٹیٹ میں لاتا ہے یا آپ ایک موک لکھتے ہیں۔ انہیریٹنس کے ساتھ ایک کنٹریکٹ کو موک کرنا آسان ہے۔ بس ایک دوسرا موک کنٹریکٹ بنائیں جو اصل والے سے انہیریٹ کرتا ہو۔ اب آپ اپنے موک کے فنکشنز کو اوور رائڈ کر سکتے ہیں۔ آئیے اسے ایک مثال سے دیکھتے ہیں۔

## مثال: پرائیویٹ ERC20 {#example-private-erc20}

ہم ایک مثال ERC-20 کنٹریکٹ استعمال کرتے ہیں جس کا ایک ابتدائی پرائیویٹ ٹائم ہوتا ہے۔ مالک پرائیویٹ یوزرس کا نظم کر سکتا ہے اور شروع میں صرف انہیں ہی ٹوکنز حاصل کرنے کی اجازت ہوگی۔ ایک خاص وقت گزر جانے کے بعد، ہر کسی کو ٹوکنز استعمال کرنے کی اجازت ہوگی۔ اگر آپ کو تجسس ہے، تو ہم نئے OpenZeppelin کنٹریکٹس v3 سے [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) ہک استعمال کر رہے ہیں۔

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

اور اب آئیے اسے موک کرتے ہیں۔

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

آپ کو مندرجہ ذیل میں سے ایک ایرر میسیج ملے گا:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function.` `Did you forget to add "virtual"?.`

چونکہ ہم نیا 0.6 Solidity ورژن استعمال کر رہے ہیں، ہمیں ان فنکشنز کے لیے `virtual` کی ورڈ شامل کرنا ہوگا جنہیں اوور رائڈ کیا جا سکتا ہے اور اوور رائڈ کرنے والے فنکشن کے لیے `override` شامل کرنا ہوگا۔ تو آئیے انہیں دونوں `isPublic` فنکشنز میں شامل کرتے ہیں۔

اب اپنے یونٹ ٹیسٹس میں، آپ اس کے بجائے `PrivateERC20Mock` استعمال کر سکتے ہیں۔ جب آپ پرائیویٹ استعمال کے وقت کے دوران برتاؤ کی ٹیسٹنگ کرنا چاہتے ہیں، تو `setIsPublic(false)` استعمال کریں اور اسی طرح پبلک استعمال کے وقت کی ٹیسٹنگ کے لیے `setIsPublic(true)` استعمال کریں۔ یقیناً ہماری مثال میں، ہم وقت کو اسی کے مطابق تبدیل کرنے کے لیے [ٹائم ہیلپرز](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) بھی استعمال کر سکتے ہیں۔ لیکن موکنگ کا آئیڈیا اب واضح ہو جانا چاہیے اور آپ ایسے منظرناموں کا تصور کر سکتے ہیں جہاں یہ صرف وقت کو آگے بڑھانے جتنا آسان نہیں ہوتا۔

## بہت سے کنٹریکٹس کو موک کرنا {#mocking-many-contracts}

اگر آپ کو ہر ایک موک کے لیے ایک اور کنٹریکٹ بنانا پڑے تو یہ گڑبڑ ہو سکتا ہے۔ اگر یہ آپ کو پریشان کرتا ہے، تو آپ [MockContract](https://github.com/gnosis/mock-contract) لائبریری کو دیکھ سکتے ہیں۔ یہ آپ کو کنٹریکٹس کے برتاؤ کو فوری طور پر اوور رائڈ کرنے اور تبدیل کرنے کی اجازت دیتا ہے۔ تاہم، یہ صرف دوسرے کنٹریکٹ پر کالز کو موک کرنے کے لیے کام کرتا ہے، لہذا یہ ہماری مثال کے لیے کام نہیں کرے گا۔

## موکنگ اور بھی زیادہ طاقتور ہو سکتی ہے {#mocking-can-be-even-more-powerful}

موکنگ کی طاقتیں یہیں ختم نہیں ہوتیں۔

- فنکشنز شامل کرنا: نہ صرف کسی مخصوص فنکشن کو اوور رائڈ کرنا مفید ہے، بلکہ اضافی فنکشنز شامل کرنا بھی مفید ہے۔ ٹوکنز کے لیے ایک اچھی مثال ایک اضافی `mint` فنکشن رکھنا ہے تاکہ کسی بھی یوزر کو مفت میں نئے ٹوکنز حاصل کرنے کی اجازت مل سکے۔
- ٹیسٹ نیٹس میں استعمال: جب آپ اپنے ڈیپ (dapp) کے ساتھ اپنے کنٹریکٹس کو ٹیسٹ نیٹس پر ڈیپلائے اور ٹیسٹ کرتے ہیں، تو ایک موکڈ ورژن استعمال کرنے پر غور کریں۔ فنکشنز کو اوور رائڈ کرنے سے گریز کریں جب تک کہ آپ کو واقعی ایسا کرنے کی ضرورت نہ ہو۔ آخرکار آپ اصلی لاجک کی ٹیسٹنگ کرنا چاہتے ہیں۔ لیکن مثال کے طور پر ایک ری سیٹ فنکشن شامل کرنا مفید ہو سکتا ہے جو صرف کنٹریکٹ اسٹیٹ کو شروع میں ری سیٹ کر دیتا ہے، کسی نئے ڈیپلائمنٹ کی ضرورت نہیں ہوتی۔ ظاہر ہے کہ آپ ایک Mainnet کنٹریکٹ میں ایسا نہیں چاہیں گے۔
