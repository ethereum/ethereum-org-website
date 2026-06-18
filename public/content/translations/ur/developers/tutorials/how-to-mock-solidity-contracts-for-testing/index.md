---
title: "ٹیسٹنگ کے لیے ⁦Solidity⁩ سمارٹ کنٹریکٹس کو موک (mock) کیسے کریں"
description: "ٹیسٹنگ کے دوران آپ کو اپنے کنٹریکٹس کا مذاق کیوں اڑانا چاہیے"
author: مارکس واس
lang: ur
tags: ["solidity", "سمارٹ کنٹریکٹس", "ٹیسٹنگ", "موکنگ"]
skill: intermediate
breadcrumb: "کنٹریکٹس کی موکنگ"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[موک آبجیکٹس (Mock objects)](https://wikipedia.org/wiki/Mock_object) آبجیکٹ اورینٹڈ پروگرامنگ میں ایک عام ڈیزائن پیٹرن ہیں۔ پرانے فرانسیسی لفظ 'mocquer' سے ماخوذ، جس کا مطلب 'مذاق اڑانا' ہے، یہ 'کسی حقیقی چیز کی نقل کرنے' میں تبدیل ہو گیا جو دراصل ہم پروگرامنگ میں کرتے ہیں۔ براہ کرم اپنے سمارٹ کنٹریکٹس کا مذاق صرف اسی صورت میں اڑائیں اگر آپ چاہیں، لیکن جب بھی ممکن ہو انہیں موک (mock) کریں۔ یہ آپ کی زندگی کو آسان بناتا ہے۔

## موکس (mocks) کے ساتھ کنٹریکٹس کی یونٹ ٹیسٹنگ {#unit-testing-contracts-with-mocks}

کسی کنٹریکٹ کو موک کرنے کا بنیادی مطلب اس کنٹریکٹ کا ایک دوسرا ورژن بنانا ہے جو بالکل اصل کی طرح برتاؤ کرتا ہے، لیکن اس طریقے سے جسے ڈیولپر آسانی سے کنٹرول کر سکے۔ آپ کا اکثر ایسے پیچیدہ کنٹریکٹس سے واسطہ پڑتا ہے جہاں آپ صرف [کنٹریکٹ کے چھوٹے حصوں کی یونٹ ٹیسٹنگ](/developers/docs/smart-contracts/testing/) کرنا چاہتے ہیں۔ مسئلہ یہ ہے کہ کیا ہو اگر اس چھوٹے سے حصے کی ٹیسٹنگ کے لیے ایک بہت ہی مخصوص کنٹریکٹ کی حالت درکار ہو جس تک پہنچنا مشکل ہو؟

آپ ہر بار پیچیدہ ٹیسٹ سیٹ اپ لاجک لکھ سکتے ہیں جو کنٹریکٹ کو مطلوبہ حالت میں لائے یا آپ ایک موک لکھ سکتے ہیں۔ وراثت (inheritance) کے ساتھ کنٹریکٹ کو موک کرنا آسان ہے۔ بس ایک دوسرا موک کنٹریکٹ بنائیں جو اصل سے وراثت میں ملے۔ اب آپ اپنے موک میں فنکشنز کو اوور رائیڈ (override) کر سکتے ہیں۔ آئیے اسے ایک مثال سے دیکھتے ہیں۔

## مثال: پرائیویٹ <span dir="ltr">ERC-20</span> {#example-private-erc20}

ہم ایک مثال کے طور پر <span dir="ltr">ERC-20</span> کنٹریکٹ استعمال کرتے ہیں جس کا ایک ابتدائی پرائیویٹ وقت ہوتا ہے۔ مالک پرائیویٹ صارفین کا انتظام کر سکتا ہے اور شروع میں صرف انہیں ٹوکن وصول کرنے کی اجازت ہوگی۔ ایک بار جب ایک خاص وقت گزر جائے گا، تو ہر کسی کو ٹوکن استعمال کرنے کی اجازت ہوگی۔ اگر آپ جاننا چاہتے ہیں، تو ہم نئے اوپن زیپلن کنٹریکٹس <span dir="ltr">v3</span> سے [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) ہک (hook) استعمال کر رہے ہیں۔

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

آپ کو درج ذیل میں سے کوئی ایک ایرر میسج ملے گا:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

چونکہ ہم نیا <span dir="ltr">0.6</span> Solidity ورژن استعمال کر رہے ہیں، اس لیے ہمیں ان فنکشنز کے لیے `virtual` کی ورڈ شامل کرنا ہوگا جنہیں اوور رائیڈ کیا جا سکتا ہے اور اوور رائیڈنگ فنکشن کے لیے اوور رائیڈ کرنا ہوگا۔ تو آئیے انہیں دونوں `isPublic` فنکشنز میں شامل کرتے ہیں۔

اب اپنے یونٹ ٹیسٹس میں، آپ اس کے بجائے `PrivateERC20Mock` استعمال کر سکتے ہیں۔ جب آپ پرائیویٹ استعمال کے وقت کے دوران برتاؤ کو ٹیسٹ کرنا چاہتے ہیں، تو `setIsPublic(false)` استعمال کریں اور اسی طرح عوامی استعمال کے وقت کی ٹیسٹنگ کے لیے `setIsPublic(true)` استعمال کریں۔ یقیناً ہماری مثال میں، ہم اوقات کو اسی کے مطابق تبدیل کرنے کے لیے صرف [ٹائم ہیلپرز (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) کا استعمال بھی کر سکتے تھے۔ لیکن موکنگ کا خیال اب واضح ہو جانا چاہیے اور آپ ایسے منظرناموں کا تصور کر سکتے ہیں جہاں صرف وقت کو آگے بڑھانا اتنا آسان نہیں ہوتا۔

## بہت سے کنٹریکٹس کو موک کرنا {#mocking-many-contracts}

اگر آپ کو ہر ایک موک کے لیے ایک اور کنٹریکٹ بنانا پڑے تو یہ الجھن کا باعث بن سکتا ہے۔ اگر یہ آپ کو پریشان کرتا ہے، تو آپ [MockContract](https://github.com/gnosis/mock-contract) لائبریری پر ایک نظر ڈال سکتے ہیں۔ یہ آپ کو فوری طور پر کنٹریکٹس کے برتاؤ کو اوور رائیڈ اور تبدیل کرنے کی اجازت دیتی ہے۔ تاہم، یہ صرف کسی دوسرے کنٹریکٹ کی کالز کو موک کرنے کے لیے کام کرتی ہے، اس لیے یہ ہماری مثال کے لیے کام نہیں کرے گی۔

## موکنگ اور بھی زیادہ طاقتور ہو سکتی ہے {#mocking-can-be-even-more-powerful}

موکنگ کی طاقتیں یہیں ختم نہیں ہوتیں۔

- فنکشنز شامل کرنا: نہ صرف کسی مخصوص فنکشن کو اوور رائیڈ کرنا مفید ہے، بلکہ اضافی فنکشنز شامل کرنا بھی فائدہ مند ہے۔ ٹوکنز کے لیے ایک اچھی مثال صرف ایک اضافی `mint` فنکشن کا ہونا ہے تاکہ کسی بھی صارف کو مفت میں نئے ٹوکن حاصل کرنے کی اجازت مل سکے۔
- ٹیسٹ نیٹس میں استعمال: جب آپ اپنی غیر مرکزی ایپلی کیشن (dapp) کے ساتھ ٹیسٹ نیٹس پر اپنے کنٹریکٹس کو تعینات کرتے اور ٹیسٹ کرتے ہیں، تو ایک موکڈ ورژن استعمال کرنے پر غور کریں۔ فنکشنز کو اوور رائیڈ کرنے سے گریز کریں جب تک کہ آپ کو واقعی ایسا نہ کرنا پڑے۔ آخر کار آپ اصل لاجک کو ٹیسٹ کرنا چاہتے ہیں۔ لیکن مثال کے طور پر ایک ری سیٹ (reset) فنکشن شامل کرنا مفید ہو سکتا ہے جو کنٹریکٹ کی حالت کو شروع سے ری سیٹ کر دیتا ہے، کسی نئی تعیناتی کی ضرورت نہیں ہوتی۔ ظاہر ہے کہ آپ اسے مین نیٹ کنٹریکٹ میں نہیں رکھنا چاہیں گے۔