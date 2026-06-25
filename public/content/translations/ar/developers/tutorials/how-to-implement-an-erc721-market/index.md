---
title: "كيفية تنفيذ سوق ⁦ERC-721⁩"
description: "كيفية عرض العناصر المرمزة للبيع على لوحة إعلانات مبوبة لامركزية"
author: "ألبرتو كويستا كانيادا"
tags:
  - "العقود الذكية"
  - "erc-721"
  - "solidity"
  - "الرموز المميزة"
skill: intermediate
breadcrumb: "سوق ⁦ERC-721⁩"
lang: ar
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

في هذا المقال، سأوضح لك كيفية برمجة <span dir="ltr">Craigslist</span> على سلسلة كتل إيثيريوم.

قبل <span dir="ltr">Gumtree</span> و<span dir="ltr">Ebay</span> و<span dir="ltr">Craigslist</span>، كانت لوحات الإعلانات المبوبة تُصنع في الغالب من الفلين أو الورق. كانت هناك لوحات إعلانات مبوبة في ممرات المدارس، والصحف، وأعمدة إنارة الشوارع، وواجهات المتاجر.

تغير كل ذلك مع ظهور الإنترنت. تضاعف عدد الأشخاص الذين يمكنهم رؤية لوحة إعلانات مبوبة معينة بشكل كبير. ومع ذلك، أصبحت الأسواق التي تمثلها أكثر كفاءة وتوسعت إلى حجم عالمي. تُعد <span dir="ltr">Ebay</span> شركة ضخمة تعود أصولها إلى لوحات الإعلانات المبوبة المادية هذه.

مع سلسلة الكتل، من المقرر أن تتغير هذه الأسواق مرة أخرى، دعني أوضح لك كيف.

## تحقيق الدخل {#monetization}

سيحتاج نموذج العمل الخاص بلوحة الإعلانات المبوبة على سلسلة كتل عامة إلى أن يكون مختلفًا عن نموذج <span dir="ltr">Ebay</span> والشركات المشابهة.

أولاً، هناك [زاوية اللامركزية](/developers/docs/web2-vs-web3/). تحتاج المنصات الحالية إلى صيانة خوادمها الخاصة. بينما تتم صيانة المنصة اللامركزية بواسطة مستخدميها، وبالتالي تنخفض تكلفة تشغيل المنصة الأساسية إلى الصفر بالنسبة لمالك المنصة.

ثم هناك الواجهة الأمامية، وهي الموقع الإلكتروني أو الواجهة التي تتيح الوصول إلى المنصة. هنا توجد العديد من الخيارات. يمكن لمالكي المنصة تقييد الوصول وإجبار الجميع على استخدام واجهتهم، مع فرض رسوم. يمكن لمالكي المنصة أيضًا أن يقرروا فتح الوصول (السلطة للشعب!) والسماح لأي شخص ببناء واجهات للمنصة. أو يمكن للمالكين اتخاذ أي نهج وسط بين هذين النقيضين.

_سيعرف قادة الأعمال الذين يتمتعون برؤية أوسع مني كيفية تحقيق الدخل من هذا. كل ما أراه هو أن هذا يختلف عن الوضع الراهن ومن المحتمل أن يكون مربحًا._

علاوة على ذلك، هناك زاوية الأتمتة والمدفوعات. يمكن [ترميز بعض الأشياء بفعالية](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) وتداولها في لوحة إعلانات مبوبة. يتم نقل الأصول المرمزة بسهولة في سلسلة الكتل. ويمكن تنفيذ طرق الدفع المعقدة للغاية بسهولة في سلسلة الكتل.

أنا فقط أستشعر فرصة عمل هنا. يمكن بسهولة تنفيذ لوحة إعلانات مبوبة بدون تكاليف تشغيل، مع تضمين مسارات دفع معقدة في كل معاملة. أنا متأكد من أن شخصًا ما سيتوصل إلى فكرة حول كيفية استخدام هذا.

أنا سعيد فقط ببنائه. دعونا نلقي نظرة على الكود.

## التنفيذ {#implementation}

منذ بعض الوقت بدأنا [مستودعًا مفتوح المصدر](https://github.com/HQ20/contracts?ref=hackernoon.com) يحتوي على أمثلة لتنفيذ حالات العمل وأشياء أخرى مفيدة، يرجى إلقاء نظرة.

الكود الخاص بـ [لوحة إعلانات إيثيريوم المبوبة](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) موجود هناك، يرجى استخدامه وتجربته بحرية. فقط كن على دراية بأن الكود لم يتم تدقيقه وتحتاج إلى بذل العناية الواجبة بنفسك قبل السماح بوضع الأموال فيه.

أساسيات اللوحة ليست معقدة. ستكون جميع الإعلانات في اللوحة مجرد بنية (<span dir="ltr">struct</span>) تحتوي على بضعة حقول:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // مفتوح، منفذ، ملغى
}
```

لذا هناك شخص ينشر الإعلان. عنصر للبيع. سعر للعنصر. حالة التداول التي يمكن أن تكون مفتوحة، أو منفذة، أو ملغاة.

سيتم الاحتفاظ بجميع هذه التداولات في تعيين (<span dir="ltr">mapping</span>). لأن كل شيء في <span dir="ltr">Solidity</span> يبدو وكأنه تعيين. وأيضًا لأنه مريح.

```solidity
mapping(uint256 => Trade) public trades;
```

استخدام التعيين يعني فقط أنه يتعين علينا ابتكار معرف (<span dir="ltr">id</span>) لكل إعلان قبل نشره، وسنحتاج إلى معرفة معرف الإعلان قبل أن نتمكن من العمل عليه. هناك طرق متعددة للتعامل مع هذا إما في العقد الذكي أو في الواجهة الأمامية. يرجى السؤال إذا كنت بحاجة إلى بعض التوجيهات.

بعد ذلك يأتي السؤال حول ماهية تلك العناصر التي نتعامل معها، وما هي هذه العملة المستخدمة للدفع مقابل المعاملة.

بالنسبة للعناصر، سنطلب فقط أن تنفذ واجهة [<span dir="ltr">ERC-721</span>](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)، وهي في الحقيقة مجرد طريقة لتمثيل عناصر العالم الحقيقي في سلسلة الكتل، على الرغم من أنها [تعمل بشكل أفضل مع الأصول الرقمية](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). سنقوم بتحديد عقد <span dir="ltr">ERC-721</span> الخاص بنا في المُنشئ، مما يعني أن أي أصول في لوحة الإعلانات المبوبة الخاصة بنا يجب أن تكون قد تم ترميزها مسبقًا.

بالنسبة للمدفوعات، سنفعل شيئًا مشابهًا. تحدد معظم مشاريع سلسلة الكتل عملة مشفرة [<span dir="ltr">ERC-20</span>](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) خاصة بها. يفضل البعض الآخر استخدام عملة سائدة مثل <span dir="ltr">DAI</span>. في لوحة الإعلانات المبوبة هذه، تحتاج فقط إلى تحديد عملتك عند الإنشاء. سهل جدًا.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

لقد اقتربنا. لدينا إعلانات، وعناصر للتداول، وعملة للمدفوعات. إنشاء إعلان يعني وضع عنصر في حساب ضمان (<span dir="ltr">escrow</span>) لإثبات أنك تمتلكه وأنك لم تقم بنشره مرتين، ربما في لوحة مختلفة.

الكود أدناه يفعل ذلك بالضبط. يضع العنصر في حساب الضمان، وينشئ الإعلان، ويقوم ببعض مهام التنظيم.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

قبول التداول يعني اختيار إعلان (تداول)، ودفع السعر، واستلام العنصر. الكود أدناه يسترد تداولًا. يتحقق من توفره. يدفع ثمن العنصر. يسترد العنصر. ويُحدّث الإعلان.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

أخيرًا، لدينا خيار للبائعين للتراجع عن التداول قبل أن يقبله المشتري. في بعض النماذج، تظل الإعلانات نشطة لفترة من الوقت قبل أن تنتهي صلاحيتها. الخيار لك، اعتمادًا على تصميم السوق الخاص بك.

الكود مشابه جدًا لذلك المستخدم لتنفيذ تداول، باستثناء أنه لا توجد عملة يتم تبادلها ويعود العنصر إلى ناشر الإعلان.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

هذا كل شيء. لقد وصلت إلى نهاية التنفيذ. من المدهش حقًا مدى إيجاز بعض مفاهيم الأعمال عند التعبير عنها في الكود، وهذه إحدى تلك الحالات. تحقق من العقد الكامل [في مستودعنا](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## الخاتمة {#conclusion}

لوحات الإعلانات المبوبة هي تكوين سوق شائع توسع بشكل هائل مع الإنترنت، ليصبح نموذج عمل شائعًا للغاية مع عدد قليل من الفائزين المحتكرين.

تصادف أيضًا أن تكون لوحات الإعلانات المبوبة أداة سهلة التكرار في بيئة سلسلة الكتل، مع ميزات محددة للغاية ستجعل تحدي العمالقة الحاليين ممكنًا.

في هذا المقال، قمت بمحاولة للربط بين واقع الأعمال الخاص بلوحة الإعلانات المبوبة والتنفيذ التكنولوجي. يجب أن تساعدك هذه المعرفة على إنشاء رؤية وخارطة طريق للتنفيذ إذا كانت لديك المهارات المناسبة.

كما هو الحال دائمًا، إذا كنت بصدد بناء أي شيء ممتع وترحب ببعض النصائح، فيرجى [مراسلتي](https://albertocuesta.es/)! يسعدني دائمًا المساعدة.