---
title: "كيفية كتابة ونشر NFT (الجزء 1/3 من سلسلة دروس NFT التعليمية)"
description: This tutorial is Part 1 of a series on NFTs that will take you step by step on how to write and deploy a Non Fungible Token (ERC-721 token) smart contract using Ethereum and Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags:
  [
    "ERC-721ERC-721",
    "Alchemy",
    "لغة برمجة Solidity",
    "العقود الذكيه "
  ]
skill: beginner
lang: ar
published: 2021-04-22
---

With NFTs bringing blockchain into the public eye, now is an excellent opportunity to understand the hype yourself by publishing your own NFT contract (ERC-721 Token) on the Ethereum blockchain!

تفخر Alchemy بشدة بدعم أكبر الأسماء في مجال NFT، بما في ذلك Makersplace (الذي سجل مؤخرًا رقمًا قياسيًا في بيع الأعمال الفنية الرقمية في Christie's مقابل 69 مليون دولار)، وDapper Labs (مبتكرو NBA Top Shot وCrypto Kitties)، وOpenSea (أكبر سوق NFT في العالم)، وZora، وSuper Rare، وNFTfi، وFoundation، وEnjin، وOrigin Protocol، وImmutable، وغيرها الكثير.

في هذا الدرس التعليمي، سوف نستعرض عملية إنشاء ونشر عقد ذكي ERC-721 على شبكة اختبار Sepolia باستخدام [MetaMask](https://metamask.io/)، و[Solidity](https://docs.soliditylang.org/en/v0.8.0/)، و[Hardhat](https://hardhat.org/)، و[Pinata](https://pinata.cloud/) و[Alchemy](https://alchemy.com/signup/eth) (لا تقلق إذا لم تفهم أيًا من هذا بعد — سنشرحه!).

In Part 2 of this tutorial we’ll go through how we can use our smart contract to mint an NFT, and in Part 3 we’ll explain how to view your NFT on MetaMask.

وبالطبع، إذا كانت لديك أي أسئلة في أي وقت، فلا تتردد في التواصل معنا على [Alchemy Discord](https://discord.gg/gWuC7zB) أو زيارة [مستندات واجهة برمجة تطبيقات NFT الخاصة بـ Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## الخطوة 1: الاتصال بشبكة إيثريوم {#connect-to-ethereum}

هناك عدة طرق لتقديم الطلبات إلى بلوكتشين إيثريوم، ولكن لتسهيل الأمور، سنستخدم حسابًا مجانيًا على [Alchemy](https://alchemy.com/signup/eth)، وهي منصة مطوري بلوكتشين وواجهة برمجة تطبيقات تسمح لنا بالتواصل مع سلسلة إيثريوم دون الحاجة إلى تشغيل عُقدنا الخاصة.

In this tutorial, we’ll also take advantage of Alchemy’s developer tools for monitoring and analytics to understand what’s going on under the hood in our smart contract deployment. إذا لم يكن لديك حساب Alchemy بالفعل، يمكنك التسجيل مجانًا [هنا](https://alchemy.com/signup/eth).

## الخطوة 2: إنشاء تطبيقك (ومفتاح API) {#make-api-key}

Once you’ve created an Alchemy account, you can generate an API key by creating an app. سيسمح لنا هذا بتقديم طلبات إلى شبكة اختبار Sepolia. اطلع على [هذا الدليل](https://docs.alchemyapi.io/guides/choosing-a-network) إذا كنت مهتمًا بمعرفة المزيد عن شبكات الاختبار.

1. Navigate to the “Create App” page in your Alchemy Dashboard by hovering over “Apps” in the nav bar and clicking “Create App”

![أنشئ تطبيقك](./create-your-app.png)

2. قم بتسمية تطبيقك (اخترنا "أول NFT لي!")، وقدم وصفًا موجزًا، وحدد "Ethereum" للسلسلة، واختر "Sepolia" لشبكتك. Since the merge the other testnets have been deprecated.

![قم بتكوين ونشر تطبيقك](./alchemy-explorer-sepolia.png)

3. Click “Create app” and that’s it! Your app should appear in the table below.

## الخطوة 3: إنشاء حساب إيثريوم (عنوان) {#create-eth-address}

We need an Ethereum account to send and receive transactions. For this tutorial, we’ll use MetaMask, a virtual wallet in the browser used to manage your Ethereum account address. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثريوم، فراجع [هذه الصفحة](/developers/docs/transactions/) من مؤسسة إيثريوم.

يمكنك تنزيل وإنشاء حساب MetaMask مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "شبكة اختبار Sepolia" في أعلى اليمين (حتى لا نتعامل بأموال حقيقية).

![تعيين Sepolia كشبكتك](./metamask-goerli.png)

## الخطوة 4: إضافة إيثر من صنبور (Faucet) {#step-4-add-ether-from-a-faucet}

In order to deploy our smart contract to the test network, we’ll need some fake ETH. للحصول على ETH، يمكنك الانتقال إلى [صنبور Sepolia](https://sepoliafaucet.com/) الذي تستضيفه Alchemy، وتسجيل الدخول وإدخال عنوان حسابك، والنقر على "أرسل لي ETH". You should see ETH in your MetaMask account soon after!

## الخطوة 5: التحقق من رصيدك {#check-balance}

للتأكد مرة أخرى من وجود رصيدنا، دعنا نُجرِ طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الإنشاء الخاصة بـ Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of ETH in our wallet. After you input your MetaMask account address and click “Send Request”, you should see a response like this:

    ```
    {"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
    ```

> **ملاحظة** هذه النتيجة بوحدة wei وليس ETH. Wei is used as the smallest denomination of ether. The conversion from wei to ETH is 1 eth = 10<sup>18</sup> wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10<sup>18</sup> wei, which equals 1 ETH.

Phew! Our fake money is all there.

## الخطوة 6: تهيئة مشروعنا {#initialize-project}

First, we’ll need to create a folder for our project. Navigate to your command line and type:

    ```
    mkdir my-nft
    cd my-nft
    ```

Now that we’re inside our project folder, we’ll use npm init to initialize the project. إذا لم يكن لديك npm مثبتًا بالفعل، فاتبع [هذه الإرشادات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (سنحتاج أيضًا إلى [Node.js](https://nodejs.org/en/download/)، لذا قم بتنزيله أيضًا!).

    ```
    npm init
    ```

It doesn’t really matter how you answer the installation questions; here is how we did it for reference:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: أول NFT لي!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    على وشك الكتابة إلى /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "أول NFT لي!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Approve the package.json, and we’re good to go!

## الخطوة 7: تثبيت [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers when building smart contracts and dapps locally before deploying to the live chain.

Inside our my-nft project run:

    ```
    npm install --save-dev hardhat
    ```

راجع هذه الصفحة لمزيد من التفاصيل حول [إرشادات التثبيت](https://hardhat.org/getting-started/#overview).

## الخطوة 8: إنشاء مشروع Hardhat {#create-hardhat-project}

Inside our project folder run:

    ```
    npx hardhat
    ```

You should then see a welcome message and option to select what you want to do. Select “create an empty hardhat.config.js”:

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 مرحبًا بك في Hardhat v2.0.11 👷‍
    ? ماذا تريد أن تفعل؟ ...
    إنشاء مشروع نموذجي
    ❯ إنشاء ملف hardhat.config.js فارغ
    إنهاء
    ```

This will generate a hardhat.config.js file for us which is where we’ll specify all of the set up for our project (on step 13).

## الخطوة 9: إضافة مجلدات المشروع {#add-project-folders}

To keep our project organized, we’ll create two new folders. Navigate to the root directory of your project in your command line and type:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ is where we’ll keep our NFT smart contract code

- scripts/ is where we’ll keep scripts to deploy and interact with our smart contract

## الخطوة 10: كتابة عقدنا {#write-contract}

الآن بعد أن تم إعداد بيئتنا، ننتقل إلى أشياء أكثر إثارة: _كتابة كود العقد الذكي الخاص بنا!_

افتح مشروع my-nft في محرر النصوص المفضل لديك (نحن نحب [VSCode](https://code.visualstudio.com/)). Smart contracts are written in a language called Solidity which is what we will use to write our MyNFT.sol smart contract.‌

1. انتقِل إلى مجلد `contracts` وأنشئ ملفًا جديدًا باسم MyNFT.sol

2. يوجد أدناه كود عقد NFT الذكي الخاص بنا، والذي استندنا فيه إلى تطبيق ERC-721 الخاص بمكتبة [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Copy and paste the contents below into your MyNFT.sol file.

   ```solidity
   //عقد يستند إلى [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. لأننا نرث فئات من مكتبة عقود OpenZeppelin، قم بتشغيل `npm install @openzeppelin/contracts^4.0.0` في سطر الأوامر لتثبيت المكتبة في مجلدنا.

إذن، ماذا يفعل هذا الكود بالضبط؟ Let’s break it down, line-by-line.

في الجزء العلوي من عقدنا الذكي، نستورد ثلاث فئات من عقود [OpenZeppelin](https://openzeppelin.com/) الذكية:

- @openzeppelin/contracts/token/ERC721/ERC721.sol contains the implementation of the ERC-721 standard, which our NFT smart contract will inherit. (To be a valid NFT, your smart contract must implement all the methods of the ERC-721 standard.) لمعرفة المزيد حول دوال ERC-721 الموروثة، تحقق من تعريف الواجهة [هنا](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol provides counters that can only be incremented or decremented by one. Our smart contract uses a counter to keep track of the total number of NFTs minted and set the unique ID on our new NFT. (Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existence. For example, the first NFT we mint with our smart contract has an ID of "1," our second NFT has an ID of "2," etc.)

- يقوم @openzeppelin/contracts/access/Ownable.sol بإعداد [التحكم في الوصول](https://docs.openzeppelin.com/contracts/3.x/access-control) على عقدنا الذكي، بحيث يمكن لمالك العقد الذكي فقط (أنت) سك رموز NFT. (Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word Ownable on line 10 and onlyOwner on line 17.)

For this tutorial, we’ll use MetaMask, a virtual wallet in the browser used to manage your Ethereum account address! هذا بفضل عقود OpenZeppelin الموروثة، والتي تنفذ معظم الطرق التي نحتاجها لإنشاء NFT، مثل `ownerOf` التي تُرجع مالك NFT، و `transferFrom`، التي تنقل ملكية NFT من حساب إلى آخر.

In our ERC-721 constructor, you’ll notice we pass 2 strings, “MyNFT” and “NFT.” The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

أخيرًا، لدينا وظيفتنا `mintNFT(address recipient, string memory tokenURI)` التي تسمح لنا بسك NFT! You'll notice this function takes in two variables:

- `address recipient` يحدد العنوان الذي سيتلقى NFT الذي تم سكه حديثًا

- `string memory tokenURI` هي سلسلة نصية يجب أن تؤدي إلى مستند JSON يصف البيانات الوصفية لـ NFT. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

تستدعي `mintNFT` بعض الطرق من مكتبة ERC-721 الموروثة، وتُرجع في النهاية رقمًا يمثل معرّف NFT الذي تم سكه حديثًا.

## الخطوة 11: ربط MetaMask و Alchemy بمشروعك {#connect-metamask-and-alchemy}

Now that we’ve created a MetaMask wallet, Alchemy account, and written our smart contract, it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

لمعرفة المزيد حول إرسال المعاملات، راجع [هذا الدرس التعليمي](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) حول إرسال المعاملات باستخدام web3.

First, install the dotenv package in your project directory:

    ```
    npm install dotenv --save
    ```

بعد ذلك، قم بإنشاء ملف `.env` في الدليل الجذر لمشروعنا، وأضف مفتاح MetaMask الخاص بك وعنوان URL لواجهة برمجة تطبيقات Alchemy HTTP إليه.

- اتبع [هذه الإرشادات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) لتصدير مفتاحك الخاص من MetaMask

- See below to get HTTP Alchemy API URL and copy it to your clipboard

![انسخ عنوان URL لواجهة برمجة تطبيقات Alchemy](./copy-alchemy-api-url.gif)

يجب أن يبدو ملف `.env` الخاص بك الآن كما يلي:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

To actually connect these to our code, we’ll reference these variables in our hardhat.config.js file in step 13.

<EnvWarningBanner />

## الخطوة 12: تثبيت Ethers.js {#install-ethers}

Ethers.js هي مكتبة تسهل التفاعل وتقديم الطلبات إلى إيثريوم عن طريق تغليف [طرق JSON-RPC القياسية](/developers/docs/apis/json-rpc/) بطرق أكثر سهولة في الاستخدام.

يجعل Hardhat من السهل جدًا دمج [الإضافات (Plugins)](https://hardhat.org/plugins/) للحصول على أدوات إضافية ووظائف موسعة. سنستفيد من [ملحق Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) لنشر العقد ([Ethers.js](https://github.com/ethers-io/ethers.js/) لديه بعض طرق نشر العقود النظيفة للغاية).

In your project directory type:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

We’ll also require ethers in our hardhat.config.js in the next step.

## الخطوة 13: تحديث hardhat.config.js {#update-hardhat-config}

We’ve added several dependencies and plugins so far, now we need to update hardhat.config.js so that our project knows about all of them.

Update your hardhat.config.js to look like this:

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

To make sure everything is working so far, let’s compile our contract. The compile task is one of the built-in hardhat tasks.

From the command line run:

    ```
    npx hardhat compile
    ```

You might get a warning about SPDX license identifier not provided in source file , but no need to worry about that — hopefully everything else looks good! إذا لم يكن الأمر كذلك، يمكنك دائمًا إرسال رسالة في [Alchemy discord](https://discord.gg/u72VCg3).

## الخطوة 15: كتابة نص النشر الخاص بنا {#write-deploy}

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

انتقل إلى مجلد `scripts/` وأنشئ ملفًا جديدًا باسم `deploy.js`، وأضف المحتويات التالية إليه:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // بدء النشر، وإرجاع وعد يتم حله إلى كائن عقد
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("تم نشر العقد على العنوان:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

يقوم Hardhat بعمل رائع في شرح ما يفعله كل من هذه الأسطر من الكود في [درس العقود التعليمي](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)، وقد اعتمدنا شروحاتهم هنا.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so MyNFT here is a factory for instances of our NFT contract. When using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of our smart contract functions.

## الخطوة 16: نشر عقدنا {#deploy-contract}

We’re finally ready to deploy our smart contract! Navigate back to the root of your project directory, and in the command line run:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

You should then see something like:

    ```
    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

إذا انتقلنا إلى [Sepolia etherscan](https://sepolia.etherscan.io/) وبحثنا عن عنوان عقدنا، فسنتمكن من رؤية أنه تم نشره بنجاح. If you can't see it immediately, please wait a while as it can take some time. The transaction will look something like this:

![عرض عنوان معاملتك على Etherscan](./etherscan-sepoila-contract-creation.png)

The From address should match your MetaMask account address and the To address will say “Contract Creation”. If we click into the transaction, we’ll see our contract address in the To field:

![عرض عنوان عقدك على Etherscan](./etherscan-sepolia-tx-details.png)

Yasssss! You just deployed your NFT smart contract to the Ethereum (testnet) chain!

لفهم ما يحدث "تحت الغطاء"، دعنا ننتقل إلى علامة التبويب "المستكشف" (Explorer) في [لوحة تحكم Alchemy](https://dashboard.alchemyapi.io/explorer). If you have multiple Alchemy apps make sure to filter by app and select “MyNFT”.

![عرض المكالمات التي تم إجراؤها "تحت الغطاء" باستخدام لوحة تحكم مستكشف Alchemy](./alchemy-explorer-goerli.png)

Here you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the .deploy() function. هناك اثنان من الأمور الهامة التي يجب الإشارة إليها هنا هما [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)، وهو طلب كتابة عقدنا الذكي بالفعل على سلسلة Sepolia، و[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) وهو طلب لقراءة معلومات حول معاملتنا بالنظر إلى التجزئة (هاش) (نمط نموذجي عند إرسال المعاملات). لمعرفة المزيد حول إرسال المعاملات، راجع هذا الدرس التعليمي حول [إرسال المعاملات باستخدام Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

That’s all for Part 1 of this tutorial. في [الجزء الثاني، سنتفاعل فعليًا مع عقدنا الذكي عن طريق سك NFT](/developers/tutorials/how-to-mint-an-nft/)، وفي [الجزء الثالث سنوضح لك كيفية عرض NFT الخاص بك في محفظة إيثريوم الخاصة بك](/developers/tutorials/how-to-view-nft-in-metamask/)!
