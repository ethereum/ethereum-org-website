---
title: "كيفية كتابة ونشر ⁦NFT⁩ (الجزء ⁦1/3⁩ من سلسلة دروس ⁦NFT⁩)"
description: "هذا الدرس هو الجزء الأول من سلسلة حول رموز ⁦NFT⁩ والتي ستأخذك خطوة بخطوة حول كيفية كتابة ونشر عقد ذكي لرمز مميز غير قابل للاستبدال (رمز ⁦ERC-721⁩) باستخدام إيثيريوم ونظام ملفات الكواكب البينية (⁦IPFS⁩)."
author: "سومي مودجيل"
tags: ["ERC-721", "Alchemy", "Solidity", "العقود الذكية"]
skill: beginner
breadcrumb: "كتابة ونشر ⁦NFT⁩"
lang: ar
published: 2021-04-22
---

مع لفت رموز <span dir="ltr">NFT</span> انتباه الجمهور إلى سلسلة الكتل، أصبحت الآن فرصة ممتازة لفهم هذه الضجة بنفسك من خلال نشر عقد <span dir="ltr">NFT</span> الخاص بك (رمز <span dir="ltr">ERC-721</span>) على سلسلة كتل إيثيريوم!

تفخر Alchemy بشدة بدعم أكبر الأسماء في مجال <span dir="ltr">NFT</span>، بما في ذلك Makersplace (التي سجلت مؤخرًا رقمًا قياسيًا في مبيعات الأعمال الفنية الرقمية في Christie’s مقابل <span dir="ltr">$69 Million</span>)، وDapper Labs (مبتكرو NBA Top Shot وCrypto Kitties)، وأوبن سي (أكبر سوق <span dir="ltr">NFT</span> في العالم)، وZora، وSuper Rare، وNFTfi، وFoundation، وEnjin، وOrigin Protocol، وImmutable، والمزيد.

في هذا الدرس، سنستعرض إنشاء ونشر عقد ذكي <span dir="ltr">ERC-721</span> على شبكة اختبار Sepolia باستخدام [ميتاماسك](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org/)، و[Pinata](https://pinata.cloud/)، و[Alchemy](https://alchemy.com/signup/eth) (لا تقلق إذا كنت لا تفهم ما يعنيه أي من هذا حتى الآن — سنشرح ذلك!).

في الجزء الثاني من هذا الدرس، سنستعرض كيف يمكننا استخدام عقدنا الذكي لسك <span dir="ltr">NFT</span>، وفي الجزء الثالث سنشرح كيفية عرض <span dir="ltr">NFT</span> الخاص بك على ميتاماسك.

وبالطبع، إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل معنا في [ديسكورد Alchemy](https://discord.gg/gWuC7zB) أو زيارة [مستندات <span dir="ltr">API</span> الخاصة بـ <span dir="ltr">NFT</span> من Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## الخطوة 1: الاتصال بشبكة إيثيريوم {#connect-to-ethereum}

هناك مجموعة من الطرق لتقديم طلبات إلى سلسلة كتل إيثيريوم، ولكن لتسهيل الأمور، سنستخدم حسابًا مجانيًا على [Alchemy](https://alchemy.com/signup/eth)، وهي منصة لمطوري سلسلة الكتل و<span dir="ltr">API</span> تتيح لنا التواصل مع سلسلة إيثيريوم دون الحاجة إلى تشغيل عقدنا الخاصة.

في هذا الدرس، سنستفيد أيضًا من أدوات مطوري Alchemy للمراقبة والتحليلات لفهم ما يحدث داخليًا في نشر عقدنا الذكي. إذا لم يكن لديك حساب Alchemy بالفعل، يمكنك التسجيل مجانًا [هنا](https://alchemy.com/signup/eth).

## الخطوة 2: إنشاء تطبيقك (ومفتاح API) {#make-api-key}

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح <span dir="ltr">API</span> عن طريق إنشاء تطبيق. سيسمح لنا ذلك بتقديم طلبات إلى شبكة اختبار Sepolia. تحقق من [هذا الدليل](https://docs.alchemyapi.io/guides/choosing-a-network) إذا كنت مهتمًا بمعرفة المزيد عن شبكات الاختبار.

1. انتقل إلى صفحة "Create App" (إنشاء تطبيق) في لوحة تحكم Alchemy الخاصة بك عن طريق التمرير فوق "Apps" (التطبيقات) في شريط التنقل والنقر على "Create App"

![Create your app](./create-your-app.png)

2. قم بتسمية تطبيقك (اخترنا "My First NFT!")، وقدم وصفًا قصيرًا، وحدد "Ethereum" للسلسلة (Chain)، واختر "Sepolia" لشبكتك. منذ الدمج، تم إيقاف شبكات الاختبار الأخرى.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. انقر على "Create app" (إنشاء تطبيق) وهذا كل شيء! يجب أن يظهر تطبيقك في الجدول أدناه.

## الخطوة 3: إنشاء حساب إيثيريوم (عنوان) {#create-eth-address}

نحتاج إلى حساب إيثيريوم لإرسال واستقبال المعاملات. في هذا الدرس، سنستخدم ميتاماسك، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثيريوم الخاص بك. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثيريوم، فتحقق من [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثيريوم.

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "Sepolia Test Network" (شبكة اختبار Sepolia) في أعلى اليمين (حتى لا نتعامل بأموال حقيقية).

![Set Sepolia as your network](./metamask-goerli.png)

## الخطوة 4: إضافة إيثر من صنبور {#step-4-add-ether-from-a-faucet}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض <span dir="ltr">ETH</span> الوهمي. للحصول على <span dir="ltr">ETH</span>، يمكنك الذهاب إلى [صنبور Sepolia](https://sepoliafaucet.com/) المستضاف بواسطة Alchemy، وتسجيل الدخول وإدخال عنوان حسابك، ثم النقر على "Send Me ETH" (أرسل لي ETH). يجب أن ترى <span dir="ltr">ETH</span> في حساب ميتاماسك الخاص بك بعد فترة وجيزة!

## الخطوة 5: التحقق من رصيدك {#check-balance}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نُجري طلب [<span dir="ltr">eth_getBalance</span>](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن (composer) من Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). سيؤدي هذا إلى إرجاع مقدار <span dir="ltr">ETH</span> في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request" (إرسال الطلب)، يجب أن ترى استجابة مثل هذه:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **ملاحظة** هذه النتيجة بوحدة <span dir="ltr">Wei</span>، وليس <span dir="ltr">ETH</span>. تُستخدم <span dir="ltr">Wei</span> كأصغر فئة من الإيثر. التحويل من <span dir="ltr">Wei</span> إلى <span dir="ltr">ETH</span> هو <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>. لذلك إذا قمنا بتحويل <span dir="ltr">0xde0b6b3a7640000</span> إلى النظام العشري، نحصل على <span dir="ltr">1\*10<sup>18</sup> wei</span>، وهو ما يعادل <span dir="ltr">1 ETH</span>.

رائع! أموالنا الوهمية كلها موجودة.

## الخطوة 6: تهيئة مشروعنا {#initialize-project}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر واكتب:

    mkdir my-nft
    cd my-nft

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع. إذا لم يكن لديك `npm` مثبتًا بالفعل، فاتبع [هذه التعليمات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (سنحتاج أيضًا إلى [Node.js](https://nodejs.org/en/download/)، لذا قم بتنزيله أيضًا!).

    npm init

لا يهم حقًا كيف تجيب على أسئلة التثبيت؛ إليك كيف فعلنا ذلك كمرجع:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

وافق على `package.json`، ونحن جاهزون للبدء!

## الخطوة 7: تثبيت [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat هي بيئة تطوير لتجميع ونشر واختبار وتصحيح أخطاء برمجيات إيثيريوم الخاصة بك. إنها تساعد المطورين عند بناء العقود الذكية والتطبيقات اللامركزية (dapps) محليًا قبل النشر على السلسلة الحية.

داخل مشروع `my-nft` الخاص بنا، قم بتشغيل:

    npm install --save-dev hardhat

تحقق من هذه الصفحة لمزيد من التفاصيل حول [تعليمات التثبيت](https://hardhat.org/getting-started/#overview).

## الخطوة 8: إنشاء مشروع Hardhat {#create-hardhat-project}

داخل مجلد مشروعنا، قم بتشغيل:

    npx hardhat

يجب أن ترى بعد ذلك رسالة ترحيب وخيارًا لتحديد ما تريد القيام به. حدد "create an empty hardhat.config.js":

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat <span dir="ltr">v2.0.11</span> 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

سيؤدي هذا إلى إنشاء ملف `hardhat.config.js` لنا، وهو المكان الذي سنحدد فيه جميع إعدادات مشروعنا (في الخطوة 13).

## الخطوة 9: إضافة مجلدات المشروع {#add-project-folders}

للحفاظ على تنظيم مشروعنا، سنقوم بإنشاء مجلدين جديدين. انتقل إلى الدليل الجذر لمشروعك في سطر الأوامر واكتب:

    mkdir contracts
    mkdir scripts

- `contracts/` هو المكان الذي سنحتفظ فيه بكود العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا

- `scripts/` هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر العقد الذكي الخاص بنا والتفاعل معه

## الخطوة 10: كتابة عقدنا {#write-contract}

الآن بعد إعداد بيئتنا، ننتقل إلى أشياء أكثر إثارة: _كتابة كود العقد الذكي الخاص بنا!_

افتح مشروع `my-nft` في محرر النصوص المفضل لديك (نحن نفضل [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity، وهي ما سنستخدمه لكتابة العقد الذكي `MyNFT.sol` الخاص بنا.‌

1. انتقل إلى مجلد `contracts` وأنشئ ملفًا جديدًا باسم `MyNFT.sol`

2. يوجد أدناه كود العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا، والذي استندنا فيه إلى تنفيذ <span dir="ltr">ERC-721</span> من مكتبة [أوبن زبلن](https://docs.openzeppelin.com/contracts/3.x/erc721). انسخ والصق المحتويات أدناه في ملف `MyNFT.sol` الخاص بك.

   ```solidity
   //عقد مبني على [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. نظرًا لأننا نرث الفئات من مكتبة عقود أوبن زبلن، قم بتشغيل `npm install @openzeppelin/contracts^4.0.0` في سطر الأوامر لتثبيت المكتبة في مجلدنا.

إذن، ماذا _يفعل_ هذا الكود بالضبط؟ دعنا نقسمه سطرًا بسطر.

في الجزء العلوي من عقدنا الذكي، نقوم باستيراد ثلاث فئات عقود ذكية من [أوبن زبلن](https://openzeppelin.com/):

- يحتوي `@openzeppelin/contracts/token/ERC721/ERC721.sol` على تنفيذ معيار <span dir="ltr">ERC-721</span>، والذي سيرثه العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا. (لكي يكون <span dir="ltr">NFT</span> صالحًا، يجب أن ينفذ عقدك الذكي جميع طرق معيار <span dir="ltr">ERC-721</span>.) لمعرفة المزيد حول وظائف <span dir="ltr">ERC-721</span> الموروثة، تحقق من تعريف الواجهة [هنا](https://eips.ethereum.org/EIPS/eip-721).

- يوفر `@openzeppelin/contracts/utils/Counters.sol` عدادات لا يمكن زيادتها أو إنقاصها إلا بمقدار واحد. يستخدم عقدنا الذكي عدادًا لتتبع العدد الإجمالي لرموز <span dir="ltr">NFT</span> التي تم سكها وتعيين المعرف الفريد على <span dir="ltr">NFT</span> الجديد الخاص بنا. (يجب تعيين معرف فريد لكل <span dir="ltr">NFT</span> يتم سكه باستخدام عقد ذكي — هنا يتم تحديد المعرف الفريد الخاص بنا فقط من خلال العدد الإجمالي لرموز <span dir="ltr">NFT</span> الموجودة. على سبيل المثال، أول <span dir="ltr">NFT</span> نقوم بسكه باستخدام عقدنا الذكي له معرف "1"، و<span dir="ltr">NFT</span> الثاني له معرف "2"، وما إلى ذلك).

- يقوم `@openzeppelin/contracts/access/Ownable.sol` بإعداد [التحكم في الوصول](https://docs.openzeppelin.com/contracts/3.x/access-control) على عقدنا الذكي، بحيث لا يمكن لأحد سوى مالك العقد الذكي (أنت) سك رموز <span dir="ltr">NFT</span>. (ملاحظة، تضمين التحكم في الوصول هو تفضيل شخصي تمامًا. إذا كنت ترغب في أن يتمكن أي شخص من سك <span dir="ltr">NFT</span> باستخدام عقدك الذكي، فقم بإزالة كلمة `Ownable` في السطر 10 و `onlyOwner` في السطر 17).

بعد عبارات الاستيراد الخاصة بنا، لدينا العقد الذكي المخصص لـ <span dir="ltr">NFT</span>، وهو قصير بشكل مدهش — فهو يحتوي فقط على عداد، ومُنشئ، ووظيفة واحدة! هذا بفضل عقود أوبن زبلن الموروثة، والتي تنفذ معظم الطرق التي نحتاجها لإنشاء <span dir="ltr">NFT</span>، مثل `ownerOf` التي تُرجع مالك <span dir="ltr">NFT</span>، و `transferFrom`، التي تنقل ملكية <span dir="ltr">NFT</span> من حساب إلى آخر.

في مُنشئ <span dir="ltr">ERC-721</span> الخاص بنا، ستلاحظ أننا نمرر سلسلتين نصيتين، "MyNFT" و "NFT". المتغير الأول هو اسم العقد الذكي، والثاني هو رمزه. يمكنك تسمية كل من هذه المتغيرات كما تشاء!

أخيرًا، لدينا وظيفتنا `mintNFT(address recipient, string memory tokenURI)` التي تسمح لنا بسك <span dir="ltr">NFT</span>! ستلاحظ أن هذه الوظيفة تأخذ متغيرين:

- يحدد `address recipient` العنوان الذي سيتلقى <span dir="ltr">NFT</span> المسكوك حديثًا

- `string memory tokenURI` عبارة عن سلسلة نصية يجب أن تشير إلى مستند JSON يصف البيانات الوصفية لـ <span dir="ltr">NFT</span>. البيانات الوصفية لـ <span dir="ltr">NFT</span> هي حقًا ما يبعث الحياة فيه، مما يسمح له بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى. في الجزء الثاني من هذا الدرس، سنصف كيفية تكوين هذه البيانات الوصفية.

تستدعي `mintNFT` بعض الطرق من مكتبة <span dir="ltr">ERC-721</span> الموروثة، وتُرجع في النهاية رقمًا يمثل معرف <span dir="ltr">NFT</span> المسكوك حديثًا.

## الخطوة 11: ربط ميتاماسك و Alchemy بمشروعك {#connect-metamask-and-alchemy}

الآن بعد أن أنشأنا محفظة ميتاماسك، وحساب Alchemy، وكتبنا عقدنا الذكي، حان الوقت لربط الثلاثة معًا.

تتطلب كل معاملة يتم إرسالها من محفظتك الافتراضية توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص (ومفتاح <span dir="ltr">API</span> الخاص بـ Alchemy) بأمان في ملف بيئة.

لمعرفة المزيد حول إرسال المعاملات، تحقق من [هذا الدرس](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) حول إرسال المعاملات باستخدام Web3.

أولاً، قم بتثبيت حزمة `dotenv` في دليل مشروعك:

    npm install dotenv --save

بعد ذلك، أنشئ ملف `.env` في الدليل الجذر لمشروعنا، وأضف إليه مفتاحك الخاص في ميتاماسك وعنوان URL الخاص بـ <span dir="ltr">HTTP Alchemy API</span>.

- اتبع [هذه التعليمات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) لتصدير مفتاحك الخاص من ميتاماسك

- انظر أدناه للحصول على عنوان URL الخاص بـ <span dir="ltr">HTTP Alchemy API</span> وانسخه إلى الحافظة الخاصة بك

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

يجب أن يبدو ملف `.env` الخاص بك الآن هكذا:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف `hardhat.config.js` الخاص بنا في الخطوة 13.

<EnvWarningBanner />

## الخطوة 12: تثبيت Ethers.js {#install-ethers}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثيريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [المكونات الإضافية (Plugins)](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [المكون الإضافي Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقود (تحتوي [Ethers.js](https://github.com/ethers-io/ethers.js/) على بعض طرق نشر العقود النظيفة جدًا).

في دليل مشروعك، اكتب:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

سنحتاج أيضًا إلى `ethers` في ملف `hardhat.config.js` الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#update-hardhat-config}

لقد أضفنا العديد من التبعيات والمكونات الإضافية حتى الآن، والآن نحتاج إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

قم بتحديث `hardhat.config.js` الخاص بك ليبدو هكذا:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## الخطوة 14: تجميع عقدنا {#compile-contract}

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نجمع عقدنا. مهمة التجميع (compile) هي إحدى مهام Hardhat المدمجة.

من سطر الأوامر، قم بتشغيل:

    npx hardhat compile

قد تتلقى تحذيرًا بشأن عدم توفير معرف ترخيص <span dir="ltr">SPDX</span> في الملف المصدر، ولكن لا داعي للقلق بشأن ذلك — نأمل أن يبدو كل شيء آخر جيدًا! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [ديسكورد Alchemy](https://discord.gg/u72VCg3).

## الخطوة 15: كتابة البرنامج النصي للنشر {#write-deploy}

الآن بعد أن تمت كتابة عقدنا وأصبح ملف التكوين الخاص بنا جاهزًا، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا يسمى `deploy.js`، مع إضافة المحتويات التالية إليه:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // بدء النشر، وإرجاع وعد يحل إلى كائن عقد
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

يقوم Hardhat بعمل رائع في شرح ما يفعله كل سطر من أسطر الكود هذه في [درس العقود](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) الخاص بهم، وقد اعتمدنا شروحاتهم هنا.

    const MyNFT = await ethers.getContractFactory("MyNFT");

يعد `ContractFactory` في Ethers.js تجريدًا يُستخدم لنشر عقود ذكية جديدة، لذا فإن `MyNFT` هنا هو مصنع لمثيلات عقد <span dir="ltr">NFT</span> الخاص بنا. عند استخدام المكون الإضافي `hardhat-ethers`، يتم توصيل مثيلات `ContractFactory` و `Contract` بالمُوقّع الأول افتراضيًا.

    const myNFT = await MyNFT.deploy();

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع `Promise` يتم حله إلى `Contract`. هذا هو الكائن الذي يحتوي على طريقة لكل وظيفة من وظائف العقد الذكي الخاص بنا.

## الخطوة 16: نشر عقدنا {#deploy-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! ارجع إلى جذر دليل مشروعك، وفي سطر الأوامر قم بتشغيل:

    npx hardhat --network sepolia run scripts/deploy.js

يجب أن ترى بعد ذلك شيئًا مثل:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

إذا ذهبنا إلى [Etherscan لشبكة Sepolia](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فيجب أن نتمكن من رؤية أنه قد تم نشره بنجاح. إذا لم تتمكن من رؤيته على الفور، يرجى الانتظار لفترة حيث قد يستغرق الأمر بعض الوقت. ستبدو المعاملة كالتالي:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

يجب أن يتطابق عنوان "From" (من) مع عنوان حساب ميتاماسك الخاص بك وسيشير عنوان "To" (إلى) إلى "Contract Creation" (إنشاء عقد). إذا نقرنا على المعاملة، فسنرى عنوان عقدنا في حقل "To":

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

رائع! لقد قمت للتو بنشر العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بك على سلسلة إيثيريوم (شبكة الاختبار)!

لفهم ما يحدث داخليًا، دعنا ننتقل إلى علامة التبويب Explorer (المستكشف) في [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/explorer) الخاصة بنا. إذا كان لديك تطبيقات Alchemy متعددة، فتأكد من التصفية حسب التطبيق وحدد "MyNFT".

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

هنا سترى مجموعة من استدعاءات JSON-RPC التي أجراها Hardhat/Ethers داخليًا لنا عندما استدعينا وظيفة `.deploy()`. هناك استدعاءان مهمان يجب الإشارة إليهما هنا وهما [<span dir="ltr">eth_sendRawTransaction</span>](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)، وهو طلب كتابة عقدنا الذكي فعليًا على سلسلة Sepolia، و [<span dir="ltr">eth_getTransactionByHash</span>](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (نمط نموذجي عند إرسال المعاملات). لمعرفة المزيد حول إرسال المعاملات، تحقق من هذا الدرس حول [إرسال المعاملات باستخدام Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

هذا كل شيء بالنسبة للجزء الأول من هذا الدرس. في [الجزء الثاني، سنتفاعل فعليًا مع عقدنا الذكي عن طريق سك <span dir="ltr">NFT</span>](/developers/tutorials/how-to-mint-an-nft/)، وفي [الجزء الثالث سنوضح لك كيفية عرض <span dir="ltr">NFT</span> الخاص بك في محفظة إيثيريوم الخاصة بك](/developers/tutorials/how-to-view-nft-in-metamask/)!