---
title: "كيفية إعداد Tellor كأوراكل خاص بك"
description: "دليل للبدء في دمج أوراكل Tellor في بروتوكولك"
author: "Tellor"
lang: ar
tags: [ "الصلابة", "العقود الذكيه ", "الأوراكل" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

اختبار سريع: بروتوكولك على وشك الانتهاء، ولكنه يحتاج إلى أوراكل للوصول إلى البيانات خارج السلسلة... ماذا تفعل؟

## (متطلبات أولية) {#soft-prerequisites}

يهدف هذا المنشور إلى جعل الوصول إلى تغذية الأوراكل بسيطًا ومباشرًا قدر الإمكان. ومع ذلك، فإننا نفترض ما يلي حول مستوى مهارتك في البرمجة للتركيز على جانب الأوراكل.

الافتراضات:

- يمكنك التنقل في الطرفية
- لديك npm مثبت
- أنت تعرف كيفية استخدام npm لإدارة التبعيات

Tellor هو أوراكل مباشر ومفتوح المصدر جاهز للتنفيذ. يهدف دليل المبتدئين هذا إلى عرض السهولة التي يمكن بها البدء والتشغيل مع Tellor، مما يوفر لمشروعك أوراكل لامركزي بالكامل ومقاوم للرقابة.

## نظرة عامة {#overview}

Tellor هو نظام أوراكل حيث يمكن للأطراف طلب قيمة نقطة بيانات خارج السلسلة (على سبيل المثال، BTC/USD) ويتنافس المراسلون لإضافة هذه القيمة إلى بنك بيانات على السلسلة، يمكن الوصول إليه من قبل جميع عقود إيثريوم الذكية. يتم تأمين مدخلات بنك البيانات هذا بواسطة شبكة من المراسلين القائمين بالحصص. يستخدم Tellor آليات حوافز الاقتصاد المشفر، ويكافئ إرسال البيانات الصادقة من قبل المراسلين ويعاقب الجهات الفاعلة السيئة من خلال إصدار رمز Tellor، وهو Tributes (TRB)، وآلية للنزاع.

في هذا البرنامج التعليمي سوف نتناول:

- إعداد مجموعة الأدوات الأولية التي ستحتاجها للبدء والتشغيل.
- استعراض مثال بسيط.
- سرد عناوين شبكة الاختبار للشبكات التي يمكنك حاليًا اختبار Tellor عليها.

## استخدام Tellor {#usingtellor}

أول شيء تريد القيام به هو تثبيت الأدوات الأساسية اللازمة لاستخدام Tellor كأوراكل خاص بك. استخدم [هذه الحزمة](https://github.com/tellor-io/usingtellor) لتثبيت عقود مستخدم Tellor:

`npm install usingtellor`

بمجرد التثبيت، سيسمح هذا لعقودك بوراثة الوظائف من عقد 'UsingTellor'.

عظيم! الآن بعد أن أصبحت الأدوات جاهزة، دعنا ننتقل إلى تمرين بسيط حيث نسترجع سعر البيتكوين:

### مثال BTC/USD {#btcusd-example}

قم بوراثة عقد UsingTellor، مع تمرير عنوان Tellor كوسيطة للمنشئ:

إليك مثال:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //هذا العقد لديه الآن حق الوصول إلى جميع الوظائف في UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

للحصول على قائمة كاملة بعناوين العقود، راجع [هنا](https://docs.tellor.io/tellor/the-basics/contracts-reference).

لسهولة الاستخدام، يأتي مستودع UsingTellor مع إصدار من عقد [Tellor Playground](https://github.com/tellor-io/TellorPlayground) لتسهيل التكامل. انظر [هنا](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) للحصول على قائمة بالوظائف المفيدة.

لتنفيذ أكثر قوة لأوراكل Tellor، تحقق من القائمة الكاملة للوظائف المتاحة [هنا](https://github.com/tellor-io/usingtellor/blob/master/README.md).
