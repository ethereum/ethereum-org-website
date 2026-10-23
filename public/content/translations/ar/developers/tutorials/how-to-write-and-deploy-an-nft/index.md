---
title: "كيفية كتابة ونشر رمز غير قابل للاستبدال (⁦NFT⁩) (الجزء ⁦1/3⁩ من سلسلة دروس ⁦NFT⁩)"
description: "هذا الدرس هو الجزء الأول من سلسلة حول الرموز غير القابلة للاستبدال (⁦NFTs⁩) والتي ستأخذك خطوة بخطوة حول كيفية كتابة ونشر عقد ذكي لرمز غير قابل للاستبدال (رمز ⁦ERC-721⁩) باستخدام إيثيريوم ونظام ملفات الكواكب البينية (⁦IPFS⁩)."
author: "سومي مودجيل"
tags: ["ERC-721", "Alchemy", "Solidity", "عقود ذكية"]
skill: beginner
breadcrumb: "كتابة ونشر ⁦NFT⁩"
lang: ar
published: 2021-04-22
---

مع لفت الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) انتباه الجمهور إلى سلسلة الكتل، أصبحت الآن فرصة ممتازة لفهم هذه الضجة بنفسك من خلال نشر عقد <span dir="ltr">NFT</span> الخاص بك (رمز <span dir="ltr">ERC-721</span>) على سلسلة كتل إيثيريوم!

في هذا الدرس، سنستعرض إنشاء ونشر عقد ذكي <span dir="ltr">ERC-721</span> على شبكة اختبار Sepolia باستخدام [ميتاماسك](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/)، و[Hardhat](https://hardhat.org/)، و[Pinata](https://pinata.cloud/)، و[Alchemy](https://alchemy.com/signup/eth) (لا تقلق إذا كنت لا تفهم ما يعنيه أي من هذا بعد — سنشرح ذلك!).

في الجزء الثاني من هذا الدرس، سنستعرض كيف يمكننا استخدام عقدنا الذكي لسك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)، وفي الجزء الثالث سنشرح كيفية عرض الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك على ميتاماسك.

وبالطبع، إذا كانت لديك أسئلة في أي وقت، فلا تتردد في التواصل عبر [ديسكورد Alchemy](https://discord.gg/gWuC7zB) أو زيارة [مستندات واجهة برمجة التطبيقات (API) لـ <span dir="ltr">NFT</span> الخاصة بـ Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## الخطوة 1: الاتصال بشبكة إيثيريوم {#connect-to-ethereum}

هناك العديد من الطرق لتقديم طلبات إلى سلسلة كتل إيثيريوم، ولكن لتسهيل الأمور، سنستخدم حسابًا مجانيًا على [Alchemy](https://alchemy.com/signup/eth)، وهي منصة لمطوري سلسلة الكتل وواجهة برمجة التطبيقات (API) تتيح لنا التواصل مع سلسلة إيثيريوم دون الحاجة إلى تشغيل عقدنا الخاصة.

في هذا الدرس، سنستفيد أيضًا من أدوات مطوري Alchemy للمراقبة والتحليلات لفهم ما يحدث داخليًا في نشر عقدنا الذكي. إذا لم يكن لديك حساب Alchemy بالفعل، يمكنك التسجيل مجانًا [هنا](https://alchemy.com/signup/eth).

## الخطوة 2: إنشاء تطبيقك (ومفتاح واجهة برمجة التطبيقات) {#make-api-key}

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح واجهة برمجة التطبيقات (API) عن طريق إنشاء تطبيق. سيسمح لنا ذلك بتقديم طلبات إلى شبكة اختبار Sepolia. تحقق من [هذا الدليل](https://www.alchemy.com/docs/choosing-a-web3-network) إذا كنت مهتمًا بمعرفة المزيد عن شبكات الاختبار.

1. انتقل إلى صفحة "Create new app" (إنشاء تطبيق جديد) في لوحة تحكم Alchemy الخاصة بك عن طريق تحديد "Select an app" (تحديد تطبيق) في شريط التنقل والنقر على "Create new app"

![Create your app](./alchemy-create-new-app.png)

2. قم بتسمية تطبيقك (اخترنا "My First NFT!")، وقدم وصفًا قصيرًا، واختر حالة استخدام. بعد ذلك، ابحث عن "Ethereum" وحدد الشبكة. سنستخدم Sepolia، وهي شبكة الاختبار الموصى بها لتطوير التطبيقات (انظر [شبكات إيثيريوم](/developers/docs/networks/#ethereum-testnets)).

3. انقر على "Next" (التالي) للمتابعة، ثم "Create app" (إنشاء تطبيق) وهذا كل شيء! يجب أن يظهر تطبيقك في القائمة المنسدلة لشريط التنقل، مع توفر مفتاح واجهة برمجة التطبيقات (API) للنسخ.

## الخطوة 3: إنشاء حساب إيثيريوم (عنوان) {#create-eth-address}

نحتاج إلى حساب إيثيريوم لإرسال واستقبال المعاملات. في هذا الدرس، سنستخدم ميتاماسك، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثيريوم الخاص بك. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثيريوم، فتحقق من [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثيريوم.

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى شبكة اختبار "Sepolia" باستخدام قائمة اختيار الشبكة (حتى لا نتعامل بأموال حقيقية). إذا لم ترَ Sepolia مدرجة، فافتح القائمة في الزاوية العلوية اليمنى، وحدد "Networks" (الشبكات)، وقم بتشغيل "Show test networks" (إظهار شبكات الاختبار) (انظر [دليل ميتاماسك لعرض شبكات الاختبار](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Set Sepolia as your network](./metamask-sepolia.png)

## الخطوة 4: إضافة إيثر من صنبور {#step-4-add-ether-from-a-faucet}

من أجل نشر عقدنا الذكي على شبكة الاختبار، سنحتاج إلى بعض <span dir="ltr">ETH</span> الوهمي. للحصول على <span dir="ltr">ETH</span> على Sepolia، اختر أحد الصنابير المدرجة في [تفاصيل شبكة Sepolia](/developers/docs/networks/#sepolia) وأدخل عنوان حسابك. إذا لم يعمل أحدها، فجرب آخر لأنها قد تنفد أحيانًا، وبعضها لديه قواعد أهلية: على سبيل المثال، يتطلب [صنبور Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) أن يحتفظ العنوان المستلم بما لا يقل عن <span dir="ltr">0.001 ETH</span> على شبكة إيثيريوم الرئيسية. يجب أن ترى <span dir="ltr">ETH</span> في حساب ميتاماسك الخاص بك بعد فترة وجيزة!

## الخطوة 5: التحقق من رصيدك {#check-balance}

للتحقق مرة أخرى من وجود رصيدنا، دعنا نجري طلب [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) باستخدام [أداة وضع الحماية (sandbox) الخاصة بـ Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). سيعيد هذا مقدار <span dir="ltr">ETH</span> في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request" (إرسال الطلب)، يجب أن ترى استجابة مثل هذه:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **ملاحظة** هذه النتيجة بوحدة Wei، وليس <span dir="ltr">ETH</span>. تُستخدم Wei كأصغر فئة من الإيثر. التحويل من Wei إلى <span dir="ltr">ETH</span> هو <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>. لذلك إذا قمنا بتحويل <span dir="ltr">0xde0b6b3a7640000</span> إلى النظام العشري نحصل على <span dir="ltr">1\*10<sup>18</sup> wei</span>، وهو ما يعادل <span dir="ltr">1 ETH</span>.

أخيرًا! أموالنا الوهمية كلها موجودة.

## الخطوة 6: تهيئة مشروعنا {#initialize-project}

أولاً، سنحتاج إلى إنشاء مجلد لمشروعنا. انتقل إلى سطر الأوامر واكتب:

```sh
mkdir my-nft
cd my-nft
```

الآن بعد أن أصبحنا داخل مجلد مشروعنا، سنستخدم `npm init` لتهيئة المشروع. إذا لم يكن لديك `npm` مثبتًا بالفعل، فاتبع [تعليمات تثبيت Node.js](https://nodejs.org/en/download/) (سنحتاج إلى Node.js و `npm` في هذا الدرس).

```sh
npm init
```

لا يهم حقًا كيف تجيب على أسئلة التثبيت؛ إليك كيف فعلنا ذلك كمرجع:

```console
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

وافق على `package.json`. يدعم Hardhat 3، الذي سنقوم بتثبيته تاليًا، مشاريع وحدات <span dir="ltr">ES</span> فقط، لذا قم بتمييز المشروع على هذا النحو:

```sh
npm pkg set type=module
```

ونحن جاهزون للبدء!

## الخطوة 7: تثبيت [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat هي بيئة تطوير لتجميع برمجيات إيثيريوم الخاصة بك ونشرها واختبارها وتصحيح أخطائها. إنها تساعد المطورين عند بناء العقود الذكية والتطبيقات اللامركزية (dapps) محليًا قبل نشرها على السلسلة الحية.

يتطلب Hardhat 3 إصدار Node.js <span dir="ltr">v22.13.0</span> أو أحدث. داخل مشروع `my-nft` الخاص بنا، قم بتشغيل:

```sh
npm install --save-dev hardhat
```

تحقق من هذه الصفحة لمزيد من التفاصيل حول [تعليمات التثبيت](https://hardhat.org/docs/getting-started).

## الخطوة 8: إنشاء مشروع Hardhat {#create-hardhat-project}

سيؤدي تشغيل `npx hardhat --init` إلى إنشاء مشروع نموذج كامل، ولكن في هذا الدرس سنقوم بإعداد الأمور يدويًا حتى تتمكن من رؤية كل جزء. في الدليل الجذري لمجلد مشروعك، قم بإنشاء ملف يسمى `hardhat.config.js` بالمحتويات التالية:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

هذا هو المكان الذي سنحدد فيه جميع إعدادات مشروعنا (في الخطوة 13). في الوقت الحالي، يخبر Hardhat فقط بإصدار مترجم Solidity الذي يجب استخدامه.

## الخطوة 9: إضافة مجلدات المشروع {#add-project-folders}

للحفاظ على تنظيم مشروعنا، سنقوم بإنشاء مجلدين جديدين. انتقل إلى الدليل الجذري لمشروعك في سطر الأوامر واكتب:

```sh
mkdir contracts
mkdir scripts
```

- <span dir="ltr">contracts/</span> هو المكان الذي سنحتفظ فيه بكود العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا

- <span dir="ltr">scripts/</span> هو المكان الذي سنحتفظ فيه بالبرامج النصية لنشر العقد الذكي الخاص بنا والتفاعل معه

## الخطوة 10: كتابة عقدنا {#write-contract}

الآن بعد إعداد بيئتنا، ننتقل إلى أشياء أكثر إثارة: _كتابة كود العقد الذكي الخاص بنا!_

افتح مشروع `my-nft` في محرر النصوص المفضل لديك (نحن نفضل [VSCode](https://code.visualstudio.com/)). تُكتب العقود الذكية بلغة تسمى Solidity وهي ما سنستخدمه لكتابة العقد الذكي `MyNFT.sol` الخاص بنا.‌

1. انتقل إلى مجلد `contracts` وقم بإنشاء ملف جديد يسمى `MyNFT.sol`

2. يوجد أدناه كود العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا، والذي استندنا فيه إلى تنفيذ <span dir="ltr">ERC-721</span> لمكتبة [أوبن زبلن](https://docs.openzeppelin.com/contracts/5.x/erc721). انسخ والصق المحتويات أدناه في ملف `MyNFT.sol` الخاص بك.

   ```solidity
   // عقد يستند إلى https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. نظرًا لأننا نرث فئات من مكتبة عقود أوبن زبلن، قم بتشغيل `npm install @openzeppelin/contracts` في سطر الأوامر لتثبيت المكتبة في مجلدنا. يستخدم هذا الدرس عقود أوبن زبلن إصدار <span dir="ltr">5.x</span>، والذي يتطلب Solidity <span dir="ltr">0.8.24</span> أو أحدث.

إذن، ماذا _يفعل_ هذا الكود بالضبط؟ دعنا نقسمه، سطرًا بسطر.

في الجزء العلوي من عقدنا الذكي، نقوم باستيراد ثلاث فئات عقود ذكية من [أوبن زبلن](https://openzeppelin.com/):

- يحتوي <span dir="ltr">@openzeppelin/contracts/token/ERC721/ERC721.sol</span> على تنفيذ معيار <span dir="ltr">ERC-721</span>، والذي سيرثه العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بنا. (لكي يكون رمزًا غير قابل للاستبدال (<span dir="ltr">NFT</span>) صالحًا، يجب أن ينفذ عقدك الذكي جميع طرق معيار <span dir="ltr">ERC-721</span>.) لمعرفة المزيد حول وظائف <span dir="ltr">ERC-721</span> الموروثة، تحقق من تعريف الواجهة [هنا](https://eips.ethereum.org/EIPS/eip-721).

- يقوم <span dir="ltr">@openzeppelin/contracts/access/Ownable.sol</span> بإعداد [التحكم في الوصول](https://docs.openzeppelin.com/contracts/5.x/access-control) على عقدنا الذكي، بحيث يمكن لمالك العقد الذكي (أنت) فقط سك الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>). المالك هو العنوان `initialOwner` الذي تم تمريره إلى المُنشئ. (ملاحظة، تضمين التحكم في الوصول هو تفضيل بالكامل. إذا كنت ترغب في أن يتمكن أي شخص من سك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>) باستخدام عقدك الذكي، فقم بإزالة `Ownable` و `Ownable(initialOwner)` من تعريف العقد والمُنشئ، و `onlyOwner` من الدالة `mintNFT`.)

- يوسع <span dir="ltr">@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol</span> معيار <span dir="ltr">ERC-721</span> بحيث يمكن لكل رمز مميز تخزين معرّف الموارد المنتظم (<span dir="ltr">URI</span>) للبيانات الوصفية الخاص به، والذي نحدده عند السك.

بعد عبارات الاستيراد الخاصة بنا، لدينا العقد الذكي المخصص لـ <span dir="ltr">NFT</span>، وهو قصير بشكل مدهش — فهو يحتوي فقط على عداد، ومُنشئ، ودالة واحدة! هذا بفضل عقود أوبن زبلن الموروثة، والتي تنفذ معظم الطرق التي نحتاجها لإنشاء رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)، مثل `ownerOf` التي تعيد مالك الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>)، و `transferFrom`، التي تنقل ملكية الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) من حساب إلى آخر.

يتتبع العداد، `_nextTokenId`، العدد الإجمالي للرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) التي تم سكها ويحدد المعرف الفريد على الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الجديد الخاص بنا. (يجب تعيين معرف فريد لكل رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>) يتم سكه باستخدام عقد ذكي — هنا يتم تحديد المعرف الفريد الخاص بنا فقط من خلال العدد الإجمالي للرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) الموجودة. يزيد `++_nextTokenId` العداد قبل استخدامه، لذلك فإن أول رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>) نسكه باستخدام عقدنا الذكي له معرف "1"، والرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الثاني له معرف "2"، وما إلى ذلك.)

في مُنشئ <span dir="ltr">ERC-721</span> الخاص بنا، ستلاحظ أننا نمرر سلسلتين نصيتين، "MyNFT" و "NFT". المتغير الأول هو اسم العقد الذكي، والثاني هو رمزه. يمكنك تسمية كل من هذه المتغيرات كما تشاء!

أخيرًا، لدينا الدالة `mintNFT(address recipient, string memory tokenURI)` التي تسمح لنا بسك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)! ستلاحظ أن هذه الدالة تأخذ متغيرين:

- يحدد `address recipient` العنوان الذي سيتلقى الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) المسكوك حديثًا

- `string memory tokenURI` عبارة عن سلسلة نصية يجب أن تشير إلى مستند <span dir="ltr">JSON</span> يصف البيانات الوصفية للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>). البيانات الوصفية للرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) هي حقًا ما يجعله ينبض بالحياة، مما يسمح له بامتلاك خصائص قابلة للتكوين، مثل الاسم والوصف والصورة والسمات الأخرى. في الجزء الثاني من هذا الدرس، سنصف كيفية تكوين هذه البيانات الوصفية.

تستدعي `mintNFT` بعض الطرق من مكتبة <span dir="ltr">ERC-721</span> الموروثة، وتعيد في النهاية رقمًا يمثل معرف الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) المسكوك حديثًا.

## الخطوة 11: ربط ميتاماسك و Alchemy بمشروعك {#connect-metamask-and-alchemy}

الآن بعد أن أنشأنا محفظة ميتاماسك، وحساب Alchemy، وكتبنا عقدنا الذكي، حان الوقت لربط الثلاثة.

تتطلب كل معاملة يتم إرسالها من محفظتك الافتراضية توقيعًا باستخدام مفتاحك الخاص الفريد. لتزويد برنامجنا بهذا الإذن، يمكننا تخزين مفتاحنا الخاص (ومفتاح واجهة برمجة التطبيقات لـ Alchemy) بأمان في ملف بيئة.

لمعرفة المزيد حول إرسال المعاملات، تحقق من [وثائق المعاملات](/developers/docs/transactions/).

قم بإنشاء ملف `.env` في الدليل الجذري لمشروعنا، وأضف مفتاحك الخاص في ميتاماسك وعنوان <span dir="ltr">URL</span> لواجهة برمجة تطبيقات Alchemy عبر <span dir="ltr">HTTP</span> إليه.

- اتبع [هذه التعليمات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) لتصدير مفتاحك الخاص من ميتاماسك

- انظر أدناه للحصول على عنوان <span dir="ltr">URL</span> لواجهة برمجة تطبيقات Alchemy عبر <span dir="ltr">HTTP</span> وانسخه إلى الحافظة الخاصة بك

![Copy your Alchemy API URL](./copy-alchemy-api-url.mp4#842x480)

يجب أن يبدو ملف `.env` الخاص بك الآن هكذا:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

لربط هذه المتغيرات فعليًا بالكود الخاص بنا، سنشير إليها في ملف `hardhat.config.js` الخاص بنا في الخطوة 13. يمكن لـ Node.js قراءة ملفات `.env` بمفردها، لذلك لا توجد حزمة إضافية لتثبيتها.

<EnvWarningBanner />

## الخطوة 12: تثبيت Ethers.js {#install-ethers}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثيريوم عن طريق تغليف [طرق <span dir="ltr">JSON-RPC</span> القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [المكونات الإضافية](https://hardhat.org/docs/plugins/official-plugins) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [المكون الإضافي Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) لنشر العقد (تحتوي [Ethers.js](https://docs.ethers.org/v6/) على بعض طرق نشر العقود النظيفة جدًا).

في دليل مشروعك اكتب:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

سنضيف أيضًا المكون الإضافي إلى `hardhat.config.js` الخاص بنا في الخطوة التالية.

## الخطوة 13: تحديث hardhat.config.js {#update-hardhat-config}

لقد أضفنا العديد من التبعيات والمكونات الإضافية حتى الآن، والآن نحتاج إلى تحديث `hardhat.config.js` حتى يتعرف مشروعنا عليها جميعًا.

قم بتحديث `hardhat.config.js` الخاص بك ليبدو هكذا:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// تحميل API_URL و PRIVATE_KEY من ملف .env إلى process.env، إذا كان موجوداً
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

يخبر `configVariable` Hardhat بقراءة كل قيمة من متغير بيئة فقط عند الحاجة إليها، لذلك تعمل أوامر مثل `compile` حتى قبل تعيين القيم. إذا كنت تفضل عدم الاحتفاظ بمفتاحك الخاص في ملف نصي عادي، فيمكن لـ Hardhat أيضًا قراءة [متغيرات التكوين من مخزن المفاتيح المشفر](https://hardhat.org/docs/guides/configuration-variables).

## الخطوة 14: تجميع عقدنا {#compile-contract}

للتأكد من أن كل شيء يعمل حتى الآن، دعنا نجمع عقدنا. مهمة التجميع هي إحدى مهام Hardhat المدمجة.

من سطر الأوامر قم بتشغيل:

```sh
npx hardhat compile
```

في المرة الأولى التي تقوم فيها بالتجميع، يقوم Hardhat بتنزيل مترجم Solidity. يجب أن ترى بعد ذلك شيئًا مثل `Compiled 1 Solidity file with solc 0.8.34`. إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [ديسكورد Alchemy](https://discord.gg/gWuC7zB).

## الخطوة 15: كتابة برنامج النشر النصي الخاص بنا {#write-deploy}

الآن بعد أن تمت كتابة عقدنا وملف التكوين الخاص بنا جاهز للعمل، حان الوقت لكتابة البرنامج النصي لنشر العقد.

انتقل إلى مجلد `scripts/` وقم بإنشاء ملف جديد يسمى `deploy.js`، مع إضافة المحتويات التالية إليه:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// بدء النشر، وإرجاع وعد يحل إلى كائن عقد
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

دعنا نستعرض ما يفعله كل سطر من أسطر الكود هذه.

```js
const { ethers } = await network.create()
```

في Hardhat 3، يفتح البرنامج النصي اتصالاً بشبكة بشكل صريح. يتصل `network.create()` بالشبكة التي تختارها باستخدام خيار `--network` عند تشغيل البرنامج النصي، ويضيف المكون الإضافي `hardhat-ethers` كائن `ethers` إلى هذا الاتصال.

```js
const [deployer] = await ethers.getSigners()
```

يعيد `getSigners()` الحسابات المكونة للشبكة. على Sepolia، هذا هو الحساب الذي وضعت مفتاحه الخاص في `.env`. نمرر عنوانه إلى المُنشئ حتى تصبح أنت مالك العقد.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

يعد `ContractFactory` في ethers.js تجريدًا يُستخدم لنشر عقود ذكية جديدة، لذا فإن `MyNFT` هنا هو مصنع لمثيلات عقد <span dir="ltr">NFT</span> الخاص بنا. عند استخدام المكون الإضافي `hardhat-ethers`، يتم توصيل مثيلات `ContractFactory` و `Contract` بالموقّع الأول افتراضيًا.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

سيؤدي استدعاء `deploy()` على `ContractFactory` إلى بدء النشر، وإرجاع وعد (Promise) يتم حله إلى عقد (Contract). هذا هو الكائن الذي يحتوي على طريقة لكل وظيفة من وظائف العقد الذكي الخاص بنا. تذهب الوسائط التي تمررها إلى `deploy()` إلى مُنشئ العقد، وهنا عنوان `initialOwner`.

ينتظر `waitForDeployment()` حتى يتم تضمين معاملة النشر في كتلة، ويعيد `getAddress()` عنوان العقد الجديد. راجع [وثائق عقد ethers.js](https://docs.ethers.org/v6/api/contract/) لمزيد من التفاصيل.

## الخطوة 16: نشر عقدنا {#deploy-contract}

نحن مستعدون أخيرًا لنشر عقدنا الذكي! ارجع إلى الدليل الجذري لمشروعك، وفي سطر الأوامر قم بتشغيل:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

يجب أن ترى بعد ذلك شيئًا مثل:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

إذا ذهبنا إلى [Etherscan لشبكة Sepolia](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فيجب أن نتمكن من رؤية أنه قد تم نشره بنجاح. إذا لم تتمكن من رؤيته على الفور، يرجى الانتظار لفترة حيث قد يستغرق الأمر بعض الوقت. ستبدو المعاملة كالتالي:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

يجب أن يتطابق عنوان "From" (من) مع عنوان حساب ميتاماسك الخاص بك وسيقول عنوان "To" (إلى) "Contract Creation" (إنشاء عقد). إذا نقرنا على المعاملة، فسنرى عنوان عقدنا في حقل "To":

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

رائع! لقد قمت للتو بنشر العقد الذكي لـ <span dir="ltr">NFT</span> الخاص بك على سلسلة إيثيريوم (شبكة الاختبار)!

لفهم ما يحدث داخليًا، يمكنك إلقاء نظرة على الطلبات التي تلقاها تطبيقك في [لوحة تحكم Alchemy](https://dashboard.alchemy.com/) الخاصة بك.

هناك سترى مجموعة من استدعاءات <span dir="ltr">JSON-RPC</span> التي أجراها Hardhat/Ethers داخليًا لنا عندما استدعينا دالة `.deploy()`. هناك استدعاءان مهمان يجب الإشارة إليهما هنا وهما [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)، وهو طلب كتابة عقدنا الذكي فعليًا على سلسلة Sepolia، و [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) وهو طلب لقراءة معلومات حول معاملتنا بناءً على التجزئة (نمط نموذجي عند إرسال المعاملات). لمعرفة المزيد حول إرسال المعاملات، تحقق من [وثائق المعاملات](/developers/docs/transactions/).

هذا كل شيء بالنسبة للجزء الأول من هذا الدرس. في [الجزء الثاني، سنتفاعل فعليًا مع عقدنا الذكي عن طريق سك رمز غير قابل للاستبدال (<span dir="ltr">NFT</span>)](/developers/tutorials/how-to-mint-an-nft/)، وفي [الجزء الثالث سنوضح لك كيفية عرض الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) الخاص بك في محفظة إيثيريوم الخاصة بك](/developers/tutorials/how-to-view-nft-in-metamask/)!
