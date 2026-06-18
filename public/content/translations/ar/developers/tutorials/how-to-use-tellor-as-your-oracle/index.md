---
title: "كيفية إعداد تيلور كأوراكل خاص بك"
description: "دليل للبدء في دمج أوراكل تيلور في البروتوكول الخاص بك"
author: "تيلور"
lang: ar
tags: ["Solidity", "العقود الذكية", "أوراكل"]
skill: beginner
breadcrumb: "أوراكل تيلور"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

اختبار سريع: البروتوكول الخاص بك على وشك الانتهاء، ولكنه يحتاج إلى أوراكل للوصول إلى بيانات خارج السلسلة... ماذا تفعل؟

## متطلبات أساسية (بسيطة) {#soft-prerequisites}

يهدف هذا المنشور إلى جعل الوصول إلى موجز أوراكل بسيطًا ومباشرًا قدر الإمكان. ومع ذلك، فإننا نفترض ما يلي حول مستوى مهارتك في البرمجة للتركيز على جانب الأوراكل.

الافتراضات:

- يمكنك التنقل في الوحدة الطرفية
- لديك <span dir="ltr">npm</span> مثبتًا
- أنت تعرف كيفية استخدام <span dir="ltr">npm</span> لإدارة التبعيات

تيلور هو أوراكل حي ومفتوح المصدر جاهز للتنفيذ. دليل المبتدئين هذا موجود هنا لعرض مدى سهولة البدء والعمل مع تيلور، مما يوفر لمشروعك أوراكل لامركزي بالكامل ومقاوم للرقابة.

## نظرة عامة {#overview}

تيلور هو نظام أوراكل حيث يمكن للأطراف طلب قيمة نقطة بيانات خارج السلسلة (على سبيل المثال، <span dir="ltr">BTC/USD</span>) ويتنافس المراسلون لإضافة هذه القيمة إلى بنك بيانات على السلسلة، يمكن الوصول إليه بواسطة جميع عقود إيثيريوم الذكية. يتم تأمين المدخلات إلى بنك البيانات هذا بواسطة شبكة من المراسلين الذين يمتلكون حصة تخزين. يستخدم تيلور آليات حوافز الكريبتو الاقتصادية، حيث يكافئ عمليات إرسال البيانات الصادقة من قبل المراسلين ويعاقب الجهات الفاعلة السيئة من خلال الإصدار للرمز المميز الخاص بتيلور، <span dir="ltr">Tributes (TRB)</span>، وآلية النزاع.

في هذا البرنامج التعليمي سنستعرض:

- إعداد مجموعة الأدوات الأولية التي ستحتاجها للبدء والعمل.
- استعراض مثال بسيط.
- سرد عناوين شبكة اختبار للشبكات التي يمكنك حاليًا اختبار تيلور عليها.

## <span dir="ltr">UsingTellor</span> {#usingtellor}

أول شيء ستحتاج إلى القيام به هو تثبيت الأدوات الأساسية اللازمة لاستخدام تيلور كأوراكل خاص بك. استخدم [هذه الحزمة](https://github.com/tellor-io/usingtellor) لتثبيت عقود مستخدم تيلور:

`npm install usingtellor`

بمجرد التثبيت، سيسمح هذا لعقودك بوراثة الوظائف من العقد '<span dir="ltr">UsingTellor</span>'.

رائع! الآن بعد أن أصبحت الأدوات جاهزة، دعنا نمر بتمرين بسيط حيث نسترجع سعر بيتكوين:

### مثال <span dir="ltr">BTC/USD</span> {#btcusd-example}

قم بوراثة العقد <span dir="ltr">UsingTellor</span>، مع تمرير عنوان تيلور كوسيطة مُنشئ:

إليك مثال:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //يتمتع هذا العقد الآن بإمكانية الوصول إلى جميع الدوال في UsingTellor

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

لسهولة الاستخدام، يأتي مستودع <span dir="ltr">UsingTellor</span> مع إصدار من عقد [<span dir="ltr">Tellor Playground</span>](https://github.com/tellor-io/TellorPlayground) لتسهيل الدمج. انظر [هنا](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) للحصول على قائمة بالوظائف المفيدة.

للحصول على تنفيذ أكثر قوة لأوراكل تيلور، تحقق من القائمة الكاملة للوظائف المتاحة [هنا](https://github.com/tellor-io/usingtellor/blob/master/README.md).