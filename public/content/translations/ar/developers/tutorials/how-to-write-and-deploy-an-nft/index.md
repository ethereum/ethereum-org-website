---
title: "كيفية كتابة ونشر رمز غير قابل للاستبدال (الجزء 1/3 من سلسلة دروس الرموز غير القابلة للاستبدال)"
description: "هذا الدرس هو الجزء الأول من سلسلة حول الرموز غير القابلة للاستبدال (NFTs) والتي ستأخذك خطوة بخطوة حول كيفية كتابة ونشر عقد ذكي لرمز غير قابل للاستبدال (رمز ERC-721) باستخدام إيثريوم ونظام ملفات الكواكب البينية (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "عقود ذكية"]
skill: beginner
lang: ar
published: 2021-04-22
---

مع جلب الرموز غير القابلة للاستبدال (NFTs) لتقنية البلوك تشين إلى أنظار الجمهور، أصبحت الآن فرصة ممتازة لفهم هذه الضجة بنفسك من خلال نشر عقد الرمز غير القابل للاستبدال الخاص بك (رمز ERC-721) على شبكة البلوك تشين لإيثريوم!

تفخر Alchemy بشدة بتشغيل أكبر الأسماء في مجال الرموز غير القابلة للاستبدال، بما في ذلك Makersplace (التي سجلت مؤخرًا رقمًا قياسيًا في مبيعات الأعمال الفنية الرقمية في Christie’s مقابل 69 مليون دولار)، و Dapper Labs (مبتكري NBA Top Shot و Crypto Kitties)، و OpenSea (أكبر سوق للرموز غير القابلة للاستبدال في العالم)، و Zora، و Super Rare، و NFTfi، و Foundation، و Enjin، و Origin Protocol، و Immutable، والمزيد.

في هذا الدرس، سنستعرض كيفية إنشاء ونشر عقد ذكي من نوع ERC-721 على شبكة الاختبار Sepolia باستخدام [MetaMask](https://metamask.io/)، و [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و [Hardhat](https://hardhat.org/)، و [Pinata](https://pinata.cloud/)، و [Alchemy](https://alchemy.com/signup/eth) (لا تقلق إذا كنت لا تفهم ما يعنيه أي من هذا حتى الآن — سنشرح ذلك!).

في الجزء الثاني من هذا الدرس، سنستعرض كيف يمكننا استخدام عقدنا الذكي من أجل السك او انشاء رمز غير قابل للاستبدال، وفي الجزء الثالث سنشرح كيفية عرض الرمز غير القابل للاستبدال الخاص بك على MetaMask.

وبالطبع، إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل عبر [Alchemy Discord](https://discord.gg/gWuC7zB) أو زيارة [مستندات واجهة برمجة تطبيقات الرموز غير القابلة للاستبدال الخاصة بـ Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## الخطوة 1: الاتصال بشبكة إيثريوم {#connect-to-ethereum}

هناك العديد من الطرق لإجراء طلبات إلى البلوك تشين لإيثريوم، ولكن لتسهيل الأمور، سنستخدم حسابًا مجانيًا على [Alchemy](https://alchemy.com/signup/eth)، وهي منصة لمطوري البلوك تشين وواجهة برمجة تطبيقات (API) تتيح لنا التواصل مع سلسلة إيثريوم دون الحاجة إلى تشغيل عقدة خاصة بنا.

في هذا الدرس، سنستفيد أيضًا من أدوات المطورين الخاصة بـ Alchemy للمراقبة والتحليلات لفهم ما يحدث خلف الكواليس في نشر عقدنا الذكي. إذا لم يكن لديك حساب Alchemy بالفعل، يمكنك التسجيل مجانًا [هنا](https://alchemy.com/signup/eth).

## الخطوة 2: إنشاء تطبيقك (ومفتاح واجهة برمجة التطبيقات) {#make-api-key}

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح واجهة برمجة تطبيقات (API) عن طريق إنشاء تطبيق. سيسمح لنا ذلك بإجراء طلبات إلى شبكة الاختبار Sepolia. تحقق من [هذا الدليل](https://docs.alchemyapi.io/guides/choosing-a-network) إذا كنت مهتمًا بمعرفة المزيد عن شبكات الاختبار.

1. انتقل إلى صفحة "Create App" (إنشاء تطبيق) في لوحة تحكم Alchemy الخاصة بك عن طريق التمرير فوق "Apps" (التطبيقات) في شريط التنقل والنقر على "Create App"

![Create your app](./create-your-app.png)

2. قم بتسمية تطبيقك (اخترنا "My First NFT!")، وقدم وصفًا قصيرًا، وحدد "Ethereum" للسلسلة (Chain)، واختر "Sepolia" لشبكتك. منذ الدمج، تم إيقاف شبكات الاختبار الأخرى.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. انقر على "Create app" (إنشاء تطبيق) وهذا كل شيء! يجب أن يظهر تطبيقك في الجدول أدناه.

## الخطوة 3: إنشاء حساب إيثريوم (عنوان) {#create-eth-address}

نحتاج إلى حساب إيثريوم لإرسال واستقبال المعاملات. في هذا الدرس، سنستخدم MetaMask، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثريوم الخاص بك. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثريوم، فتحقق من [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثريوم.

يمكنك تنزيل وإنشاء حساب MetaMask مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "Sepolia Test Network" (شبكة الاختبار Sepolia) في أعلى اليمين (حتى لا نتعامل بأموال حقيقية).

![Set Sepolia as your network](./metamask-goerli.png)

## الخطوة 4: إضافة إيثر من صنبور {#step-4-add-ether-from-a-faucet}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض من ETH الوهمي. للحصول على ETH، يمكنك الذهاب إلى [صنبور Sepolia](https://sepoliafaucet.com/) المستضاف بواسطة Alchemy، وتسجيل الدخول وإدخال عنوان حسابك، ثم النقر على "Send Me ETH" (أرسل لي ETH). يجب أن ترى ETH في حساب MetaMask الخاص بك بعد فترة وجيزة!

## الخطوة 5: التحقق من رصيدك {#check-balance}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نُجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن الخاصة بـ Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). سيؤدي هذا إلى إرجاع كمية ETH في محفظتنا. بعد إدخال عنوان حساب MetaMask الخاص بك والنقر على "Send Request" (إرسال الطلب)، يجب أن ترى استجابة مثل هذه:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **ملاحظة** هذه النتيجة بوحدة wei، وليس ETH. تُستخدم wei كأصغر فئة من الإيثر. التحويل من wei إلى ETH هو <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>. لذا إذا قمنا بتحويل 0xde0b6b3a7640000 إلى النظام العشري نحصل على <span dir="ltr">1\*10<sup>18</sup> wei</span>، وهو ما يساوي 1 ETH.

رائع! أموالنا الوهمية كلها موجودة.

## الخطوة 6: تهيئة مشروعنا {#initialize-project}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر واكتب:

    mkdir my-nft
    cd my-nft

الآن ونحن داخل مجلد مشروعنا، سنستخدم npm init لتهيئة المشروع. إذا لم يكن لديك npm مثبتًا بالفعل، فاتبع [هذه التعليمات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (سنحتاج أيضًا إلى [Node.js](https://nodejs.org/en/download/)، لذا قم بتنزيله أيضًا!).

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

وافق على package.json، ونحن جاهزون للبدء!

## الخطوة 7: تثبيت [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat هي بيئة تطوير لتجميع ونشر واختبار وتصحيح أخطاء برمجيات إيثريوم الخاصة بك. إنها تساعد المطورين عند بناء عقود ذكية والتطبيقات اللامركزية محليًا قبل نشرها على السلسلة الحية.

داخل مشروع my-nft الخاص بنا، قم بتشغيل:

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
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

سيؤدي هذا إلى إنشاء ملف hardhat.config.js لنا والذي سنحدد فيه جميع إعدادات مشروعنا (في الخطوة 13).

## الخطوة 9: إضافة مجلدات المشروع {#add-project-folders}

للحفاظ على تنظيم مشروعنا، سنقوم بإنشاء مجلدين جديدين. انتقل إلى الدليل الجذر لمشروعك في سطر الأوامر واكتب:

    mkdir contracts
    mkdir scripts

- contracts/ هو المكان الذي سنحتفظ فيه بكود العقد الذكي للرمز غير القابل للاستبدال الخاص بنا

- scripts/ هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر والتفاعل مع عقدنا الذكي

## الخطوة 10: كتابة عقدنا {#write-contract}

الآن بعد إعداد بيئتنا، ننتقل إلى أشياء أكثر إثارة: _كتابة كود عقدنا الذكي!_

افتح مشروع my-nft في محرر النصوص المفضل لديك (نحن نفضل [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity وهي ما سنستخدمه لكتابة العقد الذكي MyNFT.sol الخاص بنا.‌

1. انتقل إلى مجلد `contracts` وأنشئ ملفًا جديدًا يسمى MyNFT.sol

2. يوجد أدناه كود العقد الذكي للرمز غير القابل للاستبدال الخاص بنا، والذي استندنا فيه إلى تنفيذ ERC-721 من مكتبة [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). انسخ والصق المحتويات أدناه في ملف MyNFT.sol الخاص بك.

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) // عقد مبني على [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
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

3. نظرًا لأننا نرث فئات من مكتبة عقود OpenZeppelin، قم بتشغيل `npm install @openzeppelin/contracts^4.0.0` في سطر الأوامر لتثبيت المكتبة في مجلدنا.

إذن، ماذا يفعل هذا الكود _بالتحديد_؟ دعنا نقسمه، سطرًا بسطر.

في الجزء العلوي من عقدنا الذكي، نقوم باستيراد ثلاث فئات عقود ذكية من [OpenZeppelin](https://openzeppelin.com/):

- يحتوي @openzeppelin/contracts/token/ERC721/ERC721.sol على تنفيذ معيار ERC-721، والذي سيرثه العقد الذكي للرمز غير القابل للاستبدال الخاص بنا. (لكي يكون رمزًا غير قابل للاستبدال صالحًا، يجب أن ينفذ عقدك الذكي جميع طرق معيار ERC-721.) لمعرفة المزيد حول وظائف ERC-721 الموروثة، تحقق من تعريف الواجهة [هنا](https://eips.ethereum.org/EIPS/eip-721).

- يوفر @openzeppelin/contracts/utils/Counters.sol عدادات لا يمكن زيادتها أو إنقاصها إلا بمقدار واحد. يستخدم عقدنا الذكي عدادًا لتتبع العدد الإجمالي للرموز غير القابلة للاستبدال التي تم سكها وتعيين المعرف الفريد على الرمز غير القابل للاستبدال الجديد الخاص بنا. (يجب تعيين معرف فريد لكل رمز غير قابل للاستبدال يتم سكه باستخدام عقد ذكي — هنا يتم تحديد المعرف الفريد الخاص بنا فقط من خلال العدد الإجمالي للرموز غير القابلة للاستبدال الموجودة. على سبيل المثال، الرمز غير القابل للاستبدال الأول الذي نقوم بسكه باستخدام عقدنا الذكي له معرف "1"، والرمز الثاني له معرف "2"، وما إلى ذلك.)

- يقوم @openzeppelin/contracts/access/Ownable.sol بإعداد [التحكم في الوصول](https://docs.openzeppelin.com/contracts/3.x/access-control) على عقدنا الذكي، بحيث يمكن لمالك العقد الذكي (أنت) فقط السك او انشاء رموز غير قابلة للاستبدال. (ملاحظة، تضمين التحكم في الوصول هو تفضيل بالكامل. إذا كنت ترغب في أن يتمكن أي شخص من السك او انشاء رمز غير قابل للاستبدال باستخدام عقدك الذكي، فقم بإزالة كلمة Ownable في السطر 10 و onlyOwner في السطر 17.)

بعد عبارات الاستيراد الخاصة بنا، لدينا العقد الذكي المخصص للرمز غير القابل للاستبدال، وهو قصير بشكل مدهش — فهو يحتوي فقط على عداد، ومنشئ (constructor)، ووظيفة واحدة! هذا بفضل عقود OpenZeppelin الموروثة، والتي تنفذ معظم الطرق التي نحتاجها لإنشاء رمز غير قابل للاستبدال، مثل `ownerOf` التي تُرجع مالك الرمز غير القابل للاستبدال، و `transferFrom`، التي تنقل ملكية الرمز غير القابل للاستبدال من حساب إلى آخر.

في منشئ ERC-721 الخاص بنا، ستلاحظ أننا نمرر سلسلتين نصيتين، "MyNFT" و "NFT". المتغير الأول هو اسم العقد الذكي، والثاني هو رمزه. يمكنك تسمية كل من هذه المتغيرات بأي اسم تريده!

أخيرًا، لدينا وظيفتنا `mintNFT(address recipient, string memory tokenURI)` التي تتيح لنا السك او انشاء رمز غير قابل للاستبدال! ستلاحظ أن هذه الوظيفة تأخذ متغيرين:

- يحدد `address recipient` العنوان الذي سيتلقى الرمز غير القابل للاستبدال المسكوك حديثًا

- `string memory tokenURI` هي سلسلة نصية يجب أن تشير إلى مستند JSON يصف البيانات الوصفية للرمز غير القابل للاستبدال. البيانات الوصفية للرمز غير القابل للاستبدال هي حقًا ما يجعله ينبض بالحياة، مما يسمح له بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى. في الجزء الثاني من هذا الدرس، سنصف كيفية تكوين هذه البيانات الوصفية.

تستدعي `mintNFT` بعض الطرق من مكتبة ERC-721 الموروثة، وتُرجع في النهاية رقمًا يمثل معرف الرمز غير القابل للاستبدال المسكوك حديثًا.

## الخطوة 11: ربط MetaMask و Alchemy بمشروعك {#connect-metamask-and-alchemy}

الآن بعد أن أنشأنا محفظة MetaMask، وحساب Alchemy، وكتبنا عقدنا الذكي، حان الوقت لربط الثلاثة معًا.

تتطلب كل معاملة يتم إرسالها من محفظتك الافتراضية توقيعًا باستخدام المفتاح الخاص الفريد الخاص بك. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين المفتاح الخاص بنا (ومفتاح واجهة برمجة تطبيقات Alchemy) بأمان في ملف بيئة.

لمعرفة المزيد حول إرسال المعاملات، تحقق من [هذا الدرس](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) حول إرسال المعاملات باستخدام ويب 3.

أولاً، قم بتثبيت حزمة dotenv في دليل مشروعك:

    npm install dotenv --save

ثم، أنشئ ملف `.env` في الدليل الجذر لمشروعنا، وأضف المفتاح الخاص لـ MetaMask وعنوان URL لواجهة برمجة تطبيقات HTTP الخاصة بـ Alchemy إليه.

- اتبع [هذه التعليمات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) لتصدير المفتاح الخاص بك من MetaMask

- انظر أدناه للحصول على عنوان URL لواجهة برمجة تطبيقات HTTP الخاصة بـ Alchemy وانسخه إلى الحافظة الخاصة بك

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

يجب أن يبدو ملف `.env` الخاص بك الآن هكذا:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف hardhat.config.js الخاص بنا في الخطوة 13.

<EnvWarningBanner />

## الخطوة 12: تثبيت Ethers.js {#install-ethers}

Ethers.js هي مكتبة تسهل التفاعل وإجراء الطلبات إلى إيثريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [الإضافات (Plugins)](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [إضافة Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقود (تحتوي [Ethers.js](https://github.com/ethers-io/ethers.js/) على بعض طرق نشر العقود النظيفة جدًا).

في دليل مشروعك اكتب:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

سنحتاج أيضًا إلى ethers في ملف hardhat.config.js الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#update-hardhat-config}

لقد أضفنا العديد من التبعيات والإضافات حتى الآن، والآن نحتاج إلى تحديث hardhat.config.js حتى يتعرف مشروعنا عليها جميعًا.

قم بتحديث hardhat.config.js الخاص بك ليبدو هكذا:

```js
    /* *
    * @type import('hardhat/config').HardhatUserConfig */
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

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نقوم بتجميع عقدنا. مهمة التجميع (compile) هي إحدى مهام hardhat المدمجة.

من سطر الأوامر قم بتشغيل:

    npx hardhat compile

قد تتلقى تحذيرًا بشأن عدم توفير معرف ترخيص SPDX في الملف المصدر، ولكن لا داعي للقلق بشأن ذلك — نأمل أن يبدو كل شيء آخر جيدًا! إذا لم يكن الأمر كذلك، يمكنك دائمًا المراسلة في [Alchemy discord](https://discord.gg/u72VCg3).

## الخطوة 15: كتابة البرنامج النصي للنشر {#write-deploy}

الآن بعد أن تمت كتابة عقدنا وملف التكوين الخاص بنا جاهز للعمل، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا يسمى `deploy.js`، وأضف المحتويات التالية إليه:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object // بدء النشر، وإرجاع وعد يحل إلى كائن عقد
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

`ContractFactory` في ethers.js هو تجريد يُستخدم لنشر عقود ذكية جديدة، لذا فإن MyNFT هنا هو مصنع لمثيلات عقد الرمز غير القابل للاستبدال الخاص بنا. عند استخدام إضافة hardhat-ethers، يتم توصيل مثيلات ContractFactory و Contract بالموقّع الأول افتراضيًا.

    const myNFT = await MyNFT.deploy();

سيؤدي استدعاء deploy() على ContractFactory إلى بدء النشر، وإرجاع وعد (Promise) يُحل إلى عقد (Contract). هذا هو الكائن الذي يحتوي على طريقة لكل وظيفة من وظائف العقد الذكي الخاص بنا.

## الخطوة 16: نشر عقدنا {#deploy-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! ارجع إلى الدليل الجذر لمشروعك، وفي سطر الأوامر قم بتشغيل:

    npx hardhat --network sepolia run scripts/deploy.js

يجب أن ترى بعد ذلك شيئًا مثل:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

إذا ذهبنا إلى [Sepolia etherscan](https://sepolia.etherscan.io/) وبحثنا عن عنوان العقد الخاص بنا، يجب أن نكون قادرين على رؤية أنه قد تم نشره بنجاح. إذا لم تتمكن من رؤيته على الفور، يرجى الانتظار لفترة حيث قد يستغرق الأمر بعض الوقت. ستبدو المعاملة هكذا تقريبًا:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

يجب أن يتطابق عنوان "From" (من) مع عنوان حساب MetaMask الخاص بك وسيشير عنوان "To" (إلى) إلى "Contract Creation" (إنشاء عقد). إذا نقرنا على المعاملة، فسنرى عنوان العقد الخاص بنا في حقل "To":

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

رائع! لقد قمت للتو بنشر العقد الذكي للرمز غير القابل للاستبدال الخاص بك على سلسلة إيثريوم (شبكة الاختبار)!

لفهم ما يحدث خلف الكواليس، دعنا ننتقل إلى علامة التبويب Explorer (المستكشف) في [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/explorer) الخاصة بنا. إذا كان لديك تطبيقات Alchemy متعددة، فتأكد من التصفية حسب التطبيق وحدد "MyNFT".

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

هنا سترى مجموعة من طلبات JSON-RPC التي أجراها Hardhat/Ethers خلف الكواليس لنا عندما استدعينا وظيفة .deploy(). هناك طلبان مهمان يجب الإشارة إليهما هنا وهما [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)، وهو الطلب لكتابة عقدنا الذكي فعليًا على سلسلة Sepolia، و [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (هاش) (نمط نموذجي عند إرسال المعاملات). لمعرفة المزيد حول إرسال المعاملات، تحقق من هذا الدرس حول [إرسال المعاملات باستخدام ويب 3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

هذا كل شيء بالنسبة للجزء الأول من هذا الدرس. في [الجزء الثاني، سنتفاعل فعليًا مع عقدنا الذكي من خلال السك او انشاء رمز غير قابل للاستبدال](/developers/tutorials/how-to-mint-an-nft/)، وفي [الجزء الثالث سنوضح لك كيفية عرض الرمز غير القابل للاستبدال الخاص بك في محفظة إيثريوم الخاصة بك](/developers/tutorials/how-to-view-nft-in-metamask/)!