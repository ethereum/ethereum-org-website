---
title: "إن إف تي Minter Tutorial"
description: "In this tutorial, you’ll build an إن إف تي minter and learn how to create a full stack dapp by connecting your smart contract to a رياكت frontend using ميتاماسك and ويب3 tools."
author: "smudgil"
tags:
  [
    "Solidity",
    "رمز غير القابل للاستبدال",
    "Alchemy",
    "العقود الذكيه ",
    "واجهة التطبيق",
    "Pinata"
  ]
skill: intermediate
lang: ar
published: 2021-10-06
---

One of the greatest challenges for developers coming from a Web2 background is figuring out how to connect your smart contract to a frontend project and interact with it.

By building an إن إف تي minter — a simple UI where you can input a link to your digital asset, a title, and a description — you'll learn how to:

- Connect to ميتاماسك via your frontend project
- Call smart contract methods from your frontend
- Sign transactions using ميتاماسك

في هذا الدرس التعليمي، سوف نستخدم [رياكت](https://react.dev/) كإطار عمل للواجهة الأمامية. Because this tutorial is primarily focused on ويب3 development, we won't be spending much time breaking down رياكت fundamentals. Instead, we'll be focusing on bringing functionality to our project.

As a prerequisite, you should have a beginner-level understanding of رياكت—know how components, props, useState/useEffect, and basic function calling works. إذا لم تكن قد سمعت بأي من هذه المصطلحات من قبل، فقد ترغب في الاطلاع على هذا [الدرس التعليمي التمهيدي لـ رياكت](https://react.dev/learn/tutorial-tic-tac-toe). للمتعلمين البصريين، نوصي بشدة بسلسلة الفيديوهات الممتازة هذه [Full Modern رياكت Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) من Net Ninja.

And if you haven't already, you'll definitely need an ألكيمي account to complete this tutorial as well as build anything on the blockchain. سجل للحصول على حساب مجاني [هنا](https://alchemy.com/).

Without further ado, let's get started!

## إنشاء الرموز غير القابلة للاستبدال 101 {#making-nfts-101}

Before we even start looking at any code, it's important to understand how making an إن إف تي works. It involves two steps:

### نشر عقد ذكي لرمز غير قابل للاستبدال (إن إف تي) على بلوكتشين إيثريوم {#publish-nft}

The biggest difference between the two إن إف تي smart contract standards is that ERC-1155 is a multi-token standard and includes batch functionality, whereas with the ERC-721 is a single-token standard and therefore only supports transferring one token at a time.

### استدعاء دالة الصك {#minting-function}

عادةً، تتطلب دالة الصك هذه تمرير متغيرين كمعلمات: الأول هو `recipient` (المستلم)، والذي يحدد العنوان الذي سيتلقى الرمز غير القابل للاستبدال (إن إف تي) المصكوك حديثًا، والثاني هو `tokenURI` الخاص بالرمز، وهو سلسلة نصية تؤدي إلى مستند JSON يصف البيانات الوصفية للرمز.

An إن إف تي's metadata is really what brings it to life, allowing it to have properties, such as a name, description, image (or different digital asset), and other attributes. إليك [مثال على tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)، والذي يحتوي على البيانات الوصفية لرمز غير قابل للاستبدال (إن إف تي).

In this tutorial, we're going to focus on part 2, calling an existing إن إف تي's smart contract minting function using our رياكت UI.

[إليك رابط](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) لعقد ERC-721 الذكي للرموز غير القابلة للاستبدال (إن إف تي) الذي سنقوم باستدعائه في هذا الدرس التعليمي. إذا كنت ترغب في تعلم كيفية إنشائه، فإننا نوصي بشدة بالاطلاع على درسنا التعليمي الآخر، ["كيفية إنشاء رمز غير قابل للاستبدال (إن إف تي)"](https://www.alchemy.com/docs/how-to-create-an-nft).

Cool, now that we understand how making an إن إف تي works, let's clone our starter files!

## استنساخ ملفات البداية {#clone-the-starter-files}

أولاً، انتقل إلى [مستودع nft-minter-tutorial على غيت هاب](https://github.com/alchemyplatform/nft-minter-tutorial) للحصول على ملفات البداية لهذا المشروع. Clone this repository into your local environment.

عند فتح مستودع `nft-minter-tutorial` المستنسخ، ستلاحظ أنه يحتوي على مجلدين: `minter-starter-files` و `nft-minter`.

- يحتوي `minter-starter-files` على ملفات البداية (بشكل أساسي واجهة مستخدم رياكت) لهذا المشروع. في هذا الدرس التعليمي، **سنعمل في هذا المجلد**، حيث ستتعلم كيفية إضفاء الحيوية على واجهة المستخدم هذه عن طريق ربطها بمحفظة إيثريوم الخاصة بك وبعقد ذكي لرمز غير قابل للاستبدال (إن إف تي).
- يحتوي `nft-minter` على الدرس التعليمي الكامل وهو موجود كـ **مرجع** لك **إذا واجهت صعوبة.**

بعد ذلك، افتح نسختك من `minter-starter-files` في محرر الأكواد الخاص بك، ثم انتقل إلى مجلد `src` الخاص بك.

ستكون جميع الأكواد التي سنكتبها ضمن مجلد `src`. سنقوم بتحرير مكون `Minter.js` وكتابة ملفات جافا سكريبت إضافية لمنح مشروعنا وظائف ويب3.

## الخطوة 2: تحقق من ملفات البداية الخاصة بنا {#step-2-check-out-our-starter-files}

Before we start coding, it's important to check out what's already provided for us in the starter files.

### تشغيل مشروع رياكت الخاص بك {#get-your-react-project-running}

Let's start by running the رياكت project in our browser. The beauty of رياكت is that once we have our project running in our browser, any changes we save will be updated live in our browser.

لتشغيل المشروع، انتقل إلى المجلد الجذر لمجلد `minter-starter-files`، وقم بتشغيل `npm install` في الطرفية (terminal) لتثبيت تبعيات المشروع:

```bash
cd minter-starter-files
npm install
```

بمجرد الانتهاء من تثبيتها، قم بتشغيل `npm start` في الطرفية الخاصة بك:

```bash
npm start
```

Doing so should open http://localhost:3000/ in your browser, where you'll see the frontend for our project. It should consist of 3 fields: a place to input a link to your إن إف تي's asset, enter the name of your إن إف تي, and provide a description.

If you try clicking "Connect Wallet" or "Mint إن إف تي" buttons, you'll notice they don't work—that's because we still need to program their functionality! :\)

### مكون Minter.js {#minter-js}

**ملاحظة:** تأكد من أنك في مجلد `minter-starter-files` وليس في مجلد `nft-minter`!

لنعد إلى مجلد `src` في محررنا ونفتح ملف `Minter.js`. It's super important that we understand everything in this file, as it is the primary رياكت component we will be working on.

At the top of our this file, we have our state variables that we will update after specific events.

```javascript
//متغيرات الحالة
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Never heard of رياكت state variables or state hooks؟ اطلع على [هذه](https://legacy.reactjs.org/docs/hooks-state.html) المستندات.

Here's what each of the variables represent:

- `walletAddress` - سلسلة نصية تخزن عنوان محفظة المستخدم
- `status` - سلسلة نصية تحتوي على رسالة لعرضها في أسفل واجهة المستخدم
- `name` - سلسلة نصية تخزن اسم الرمز غير القابل للاستبدال (إن إف تي)
- `description` - سلسلة نصية تخزن وصف الرمز غير القابل للاستبدال (إن إف تي)
- `url` - سلسلة نصية هي رابط للأصل الرقمي للرمز غير القابل للاستبدال (إن إف تي)

بعد متغيرات الحالة، سترى ثلاث دوال غير منفذة: `useEffect` و `connectWalletPressed` و `onMintPressed`. ستلاحظ أن كل هذه الدوال هي `async`، وذلك لأننا سنجري استدعاءات API غير متزامنة فيها! Their names are eponymous with their functionalities:

```javascript
useEffect(async () => {
  //TODO: تنفيذ
}, [])

const connectWalletPressed = async () => {
  //TODO: تنفيذ
}

const onMintPressed = async () => {
  //TODO: تنفيذ
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - هذا خطاف (hook) في رياكت يتم استدعاؤه بعد عرض المكون الخاص بك. نظرًا لأنه تم تمرير مصفوفة فارغة `[]` كخاصية (prop) إليه (انظر السطر 3)، فسيتم استدعاؤه فقط عند العرض _الأول_ للمكون. Here we'll call our wallet listener and another wallet function to update our UI to reflect whether a wallet is already connected.
- `connectWalletPressed` - سيتم استدعاء هذه الدالة لربط محفظة ميتاماسك الخاصة بالمستخدم بتطبيقنا اللامركزي (dapp).
- `onMintPressed` - سيتم استدعاء هذه الدالة لصك الرمز غير القابل للاستبدال (إن إف تي) الخاص بالمستخدم.

Near the end of this file, we have the UI of our component. إذا فحصت هذا الكود بعناية، ستلاحظ أننا نحدّث متغيرات الحالة `url` و `name` و `description` عندما يتغير الإدخال في حقول النص المقابلة لها.

سترى أيضًا أنه يتم استدعاء `connectWalletPressed` و `onMintPressed` عند النقر على الأزرار ذات المعرفات `mintButton` و `walletButton` على التوالي.

```javascript
//واجهة المستخدم الخاصة بمكوننا
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "متصل: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>ربط المحفظة</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ صائك الرموز غير القابلة للاستبدال من Alchemy</h1>
    <p>
      ببساطة، أضف رابط الأصل والاسم والوصف، ثم اضغط على "صك".
    </p>
    <form>
      <h2>🖼 رابط الأصل: </h2>
      <input
        type="text"
        placeholder="مثال: https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 الاسم: </h2>
      <input
        type="text"
        placeholder="مثال: أول رمز غير قابل للاستبدال لي!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ الوصف: </h2>
      <input
        type="text"
        placeholder="مثال: أروع حتى من cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      صك الرمز غير القابل للاستبدال
    </button>
    <p id="status">{status}</p>
</div>
)
```

Finally, let's address where is this Minter component added.

إذا انتقلت إلى ملف `App.js`، وهو المكون الرئيسي في رياكت الذي يعمل كحاوية لجميع المكونات الأخرى، فسترى أن مكون Minter الخاص بنا قد تم إدراجه في السطر 7.

**في هذا الدرس التعليمي، سنقوم فقط بتحرير ملف `Minter.js` وإضافة ملفات في مجلد `src` الخاص بنا.**

Now that we understand what we're working with, let's set up our إيثريوم wallet!

## إعداد محفظة إيثريوم الخاصة بك {#set-up-your-ethereum-wallet}

For users to be able to interact with your smart contract they will need to connect their إيثريوم wallet to your dapp.

### تنزيل ميتاماسك {#download-metamask}

For this tutorial, we’ll use ميتاماسك, a virtual wallet in the browser used to manage your إيثريوم account address. إذا كنت تريد أن تفهم المزيد عن كيفية عمل المعاملات على إيثريوم، فاطلع على [هذه الصفحة](/developers/docs/transactions/).

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). When you are creating an account, or if you already have an account, make sure to switch over to the “روبستين Test Network” in the upper right \(so that we’re not dealing with real money\).

### إضافة إيثر من صنبور (Faucet) {#add-ether-from-faucet}

In order to mint our إن إف تيز (or sign any transactions on the إيثريوم blockchain), we’ll need some fake Eth. للحصول على ETH، يمكنك الذهاب إلى [صنبور روبستين](https://faucet.ropsten.be/) وإدخال عنوان حساب روبستين الخاص بك، ثم النقر فوق “Send روبستين Eth.” You should see Eth in your ميتاماسك account soon after!

### تحقق من رصيدك {#check-your-balance}

للتأكد مرة أخرى من وجود رصيدنا، لنجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الإنشاء من ألكيمي](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of Eth in our wallet. After you input your ميتاماسك account address and click “Send Request”, you should see a response like this:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ملاحظة:** هذه النتيجة بوحدة wei وليست eth. Wei is used as the smallest denomination of ether. The conversion from wei to eth is: 1 eth = 10¹⁸ wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10¹⁸ which equals 1 eth.

Phew! Our fake money is all there! <Emoji text=":money_mouth_face:" size={1} />

## ربط ميتاماسك بواجهة المستخدم الخاصة بك {#connect-metamask-to-your-UI}

Now that our ميتاماسك wallet is set up, let's connect our dapp to it!

لأننا نريد الالتزام بنموذج [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)، سننشئ ملفًا منفصلاً يحتوي على دوالنا لإدارة المنطق والبيانات وقواعد تطبيقنا اللامركزي (dapp)، ثم نمرر هذه الدوال إلى الواجهة الأمامية (مكون Minter.js الخاص بنا).

### الدالة `connectWallet` {#connect-wallet-function}

للقيام بذلك، لننشئ مجلدًا جديدًا يسمى `utils` في دليل `src` الخاص بك ونضف ملفًا يسمى `interact.js` بداخله، والذي سيحتوي على جميع دوال التفاعل مع المحفظة والعقد الذكي.

في ملف `interact.js` الخاص بنا، سنكتب دالة `connectWallet`، والتي سنستوردها ونستدعيها بعد ذلك في مكون `Minter.js` الخاص بنا.

في ملف `interact.js` الخاص بك، أضف ما يلي

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 اكتب رسالة في حقل النص أعلاه.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Let's breakdown what this code does:

أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا في متصفحك.

`window.ethereum` هو واجهة برمجة تطبيقات (API) عالمية يتم إدراجها بواسطة ميتاماسك ومقدمي المحافظ الآخرين والتي تسمح لمواقع الويب بطلب حسابات إيثريوم الخاصة بالمستخدمين. If approved, it can read data from the blockchains the user is connected to, and suggest that the user sign messages and transactions. اطلع على [مستندات ميتاماسك](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) لمزيد من المعلومات!

إذا كان `window.ethereum` _غير_ موجود، فهذا يعني أن ميتاماسك غير مثبت. ينتج عن هذا إرجاع كائن JSON، حيث يكون `address` المرجع سلسلة فارغة، وكائن `status` JSX يبلغ بأن المستخدم يجب أن يقوم بتثبيت ميتاماسك.

**معظم الدوال التي نكتبها ستعيد كائنات JSON يمكننا استخدامها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.**

الآن إذا كان `window.ethereum` _موجودًا_، فهنا تصبح الأمور مثيرة للاهتمام.

باستخدام حلقة try/catch، سنحاول الاتصال بـ ميتاماسك عن طريق استدعاء [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Calling this function will open up ميتاماسك in the browser, whereby the user will be prompted to connect their wallet to your dapp.

- إذا اختار المستخدم الاتصال، فإن `method: "eth_requestAccounts"` سيعيد مصفوفة تحتوي على جميع عناوين حسابات المستخدم المتصلة بالتطبيق اللامركزي (dapp). إجمالاً، ستعيد دالة `connectWallet` الخاصة بنا كائن JSON يحتوي على _أول_ `address` في هذه المصفوفة \(انظر السطر 9\) ورسالة `status` تحث المستخدم على كتابة رسالة إلى العقد الذكي.
- إذا رفض المستخدم الاتصال، فسيحتوي كائن JSON على سلسلة فارغة لـ `address` المرجع ورسالة `status` تعكس أن المستخدم رفض الاتصال.

### إضافة دالة connectWallet إلى مكون واجهة المستخدم Minter.js الخاص بك {#add-connect-wallet}

الآن بعد أن كتبنا دالة `connectWallet` هذه، لنربطها بمكون `Minter.js` الخاص بنا.

أولاً، سيتعين علينا استيراد دالتنا إلى ملف `Minter.js` الخاص بنا عن طريق إضافة `import { connectWallet } from "./utils/interact.js";` إلى أعلى ملف `Minter.js`. يجب أن تبدو الأسطر الـ 11 الأولى من ملف `Minter.js` الآن كما يلي:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //متغيرات الحالة
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

بعد ذلك، داخل دالة `connectWalletPressed` الخاصة بنا، سنستدعي دالة `connectWallet` المستوردة، كما يلي:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

لاحظ كيف يتم تجريد معظم وظائفنا بعيدًا عن مكون `Minter.js` الخاص بنا من ملف `interact.js`؟ This is so we comply with the M-V-C paradigm!

في `connectWalletPressed`، نقوم ببساطة بإجراء استدعاء await لدالة `connectWallet` المستوردة، وباستخدام استجابتها، نقوم بتحديث متغيري `status` و `walletAddress` عبر خطافات الحالة الخاصة بهما.

الآن، لنحفظ كلا الملفين `Minter.js` و `interact.js` ونختبر واجهة المستخدم الخاصة بنا حتى الآن.

Open your browser on localhost:3000, and press the "Connect Wallet" button on the top right of the page.

If you have ميتاماسك installed, you should be prompted to connect your wallet to your dapp. Accept the invitation to connect.

You should see that the wallet button now reflects that your address is connected.

بعد ذلك، حاول تحديث الصفحة... هذا غريب. Our wallet button is prompting us to connect ميتاماسك, even though it is already connected...

Don't worry though! يمكننا إصلاح ذلك بسهولة عن طريق تنفيذ دالة تسمى `getCurrentWalletConnected`، والتي ستتحقق مما إذا كان هناك عنوان متصل بالفعل بتطبيقنا اللامركزي (dapp) وتحديث واجهة المستخدم الخاصة بنا وفقًا لذلك!

### الدالة getCurrentWalletConnected {#get-current-wallet}

في ملف `interact.js` الخاص بك، أضف دالة `getCurrentWalletConnected` التالية:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 اكتب رسالة في حقل النص أعلاه.",
        }
      } else {
        return {
          address: "",
          status: "🦊 اتصل بـ MetaMask باستخدام الزر العلوي الأيمن.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

هذا الكود _مشابه جدًا_ لدالة `connectWallet` التي كتبناها للتو.

الفرق الرئيسي هو أنه بدلاً من استدعاء الطريقة `eth_requestAccounts`، التي تفتح ميتاماسك للمستخدم لربط محفظته، هنا نستدعي الطريقة `eth_accounts`، التي تعيد ببساطة مصفوفة تحتوي على عناوين ميتاماسك المتصلة حاليًا بتطبيقنا اللامركزي (dapp).

لرؤية هذه الدالة أثناء عملها، لندعوها في دالة `useEffect` لمكون `Minter.js` الخاص بنا.

كما فعلنا مع `connectWallet`، يجب علينا استيراد هذه الدالة من ملف `interact.js` إلى ملف `Minter.js` الخاص بنا كما يلي:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //استيراد هنا
} from "./utils/interact.js"
```

الآن، ببساطة نستدعيها في دالة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

لاحظ أننا نستخدم استجابة استدعائنا لـ `getCurrentWalletConnected` لتحديث متغيرات الحالة `walletAddress` و `status`.

Once you've added this code, try refreshing our browser window. The button should say that you're connected, and show a preview of your connected wallet's address - even after you refresh!

### تنفيذ addWalletListener {#implement-add-wallet-listener}

The final step in our dapp wallet setup is implementing the wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.

في ملف `Minter.js` الخاص بك، أضف دالة `addWalletListener` تبدو كالتالي:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 اكتب رسالة في حقل النص أعلاه.")
      } else {
        setWallet("")
        setStatus("🦊 اتصل بـ MetaMask باستخدام الزر العلوي الأيمن.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          يجب عليك تثبيت MetaMask، وهي محفظة إيثريوم افتراضية، في متصفحك.
        </a>
      </p>
    )
  }
}
```

Let's quickly break down what's happening here:

- أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا (أي أن ميتاماسك مثبت).
  - إذا لم يكن كذلك، فإننا ببساطة نضبط متغير الحالة `status` على سلسلة JSX التي تحث المستخدم على تثبيت ميتاماسك.
  - إذا كان ممكّنًا، فإننا ننشئ المستمع `window.ethereum.on("accountsChanged")` في السطر 3 الذي يستمع لتغيرات الحالة في محفظة ميتاماسك، والتي تشمل عندما يربط المستخدم حسابًا إضافيًا بالتطبيق اللامركزي (dapp)، أو يبدل الحسابات، أو يفصل حسابًا. إذا كان هناك حساب واحد على الأقل متصل، يتم تحديث متغير الحالة `walletAddress` كأول حساب في مصفوفة `accounts` التي يعيدها المستمع. بخلاف ذلك، يتم تعيين `walletAddress` كسلسلة فارغة.

أخيرًا، يجب أن نستدعيها في دالة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

And voila! We've completed programming all of our wallet functionality! Now that our wallet is set up, let's figure out how to mint our إن إف تي!

## أساسيات البيانات الوصفية للرموز غير القابلة للاستبدال (إن إف تي) {#nft-metadata-101}

So remember the إن إف تي metadata we just talked about in Step 0 of this tutorial—it brings an إن إف تي to life, allowing it to have properties, such as a digital asset, name, description, and other attributes.

سنحتاج إلى تكوين هذه البيانات الوصفية ككائن JSON وتخزينها، حتى نتمكن من تمريرها كمعلمة `tokenURI` عند استدعاء دالة `mintNFT` في عقدنا الذكي.

The text in the "Link to Asset", "Name", "Description" fields will comprise the different properties of our إن إف تي's metadata. We'll format this metadata as a JSON object, but there are a couple options for where we can store this JSON object:

- We could store it on the إيثريوم blockchain; however, doing so would be very expensive.
- We could store it on a centralized server, like AWS or Firebase. But that would defeat our decentralization ethos.
- We could use آي بي إف إس, a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system. As this protocol is decentralized and free, it is our best option!

لتخزين بياناتنا الوصفية على آي بي إف إس، سنستخدم [بينياتا](https://pinata.cloud/)، وهي واجهة برمجة تطبيقات (API) ومجموعة أدوات آي بي إف إس ملائمة. In the next step, we'll explain exactly how to do this!

## استخدام بينياتا لتثبيت بياناتك الوصفية على آي بي إف إس {#use-pinata-to-pin-your-metadata-to-IPFS}

إذا لم يكن لديك حساب [بينياتا](https://pinata.cloud/)، فقم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud/auth/signup) وأكمل خطوات التحقق من بريدك الإلكتروني وحسابك.

### إنشاء مفتاح API الخاص بـ بينياتا {#create-pinata-api-key}

انتقل إلى صفحة [https://pinata.cloud/keys](https://pinata.cloud/keys)، ثم حدد زر "New Key" في الأعلى، وقم بتمكين أداة Admin، وقم بتسمية مفتاحك.

You'll then be shown a popup with your API info. Make sure to put this somewhere safe.

Now that our key is set up, let's add it to our project so we can use it.

### إنشاء ملف .env {#create-a-env}

We can safely store our بينياتا key and secret in an environment file. لِنقم بتثبيت حزمة [dotenv](https://www.npmjs.com/package/dotenv) في دليل مشروعك.

افتح علامة تبويب جديدة في الطرفية (terminal) الخاصة بك (منفصلة عن تلك التي تشغل المضيف المحلي) وتأكد من أنك في مجلد `minter-starter-files`، ثم قم بتشغيل الأمر التالي في الطرفية:

```text
npm install dotenv --save
```

بعد ذلك، أنشئ ملف `.env` في الدليل الجذر لملف `minter-starter-files` عن طريق إدخال ما يلي في سطر الأوامر:

```javascript
vim.env
```

سيؤدي هذا إلى فتح ملف `.env` في vim (محرر نصوص). To save it hit "esc" + ":" + "q" on your keyboard in that order.

بعد ذلك، في في إس كود، انتقل إلى ملف `.env` وأضف مفتاح بينياتا API وسر API الخاص بك إليه، كما يلي:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Save the file, and then you're ready to start writing the function to upload your JSON metadata to آي بي إف إس!

### تنفيذ pinJSONToIPFS {#pin-json-to-ipfs}

لحسن حظنا، لدى بينياتا [واجهة برمجة تطبيقات (API) مخصصة لتحميل بيانات JSON إلى آي بي إف إس](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ومثال جافا سكريبت ملائم مع axios يمكننا استخدامه، مع بعض التعديلات الطفيفة.

في مجلد `utils`، لننشئ ملفًا آخر يسمى `pinata.js` ثم نستورد سر ومفتاح بينياتا من ملف .env كما يلي:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

بعد ذلك، الصق الكود الإضافي من الأسفل في ملف `pinata.js` الخاص بك. Don't worry, we'll break down what everything means!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

So what does this code do exactly؟

أولاً، يستورد [axios](https://www.npmjs.com/package/axios)، وهو عميل HTTP قائم على الوعود (promise based) للمتصفح وnode.js، والذي سنستخدمه لتقديم طلب إلى بينياتا.

ثم لدينا دالتنا غير المتزامنة `pinJSONToIPFS`، والتي تأخذ `JSONBody` كمدخل لها ومفتاح وسر بينياتا API في رأسها (header)، كل ذلك لتقديم طلب POST إلى واجهة برمجة تطبيقات `pinJSONToIPFS` الخاصة بهم.

- إذا نجح طلب POST هذا، فإن دالتنا تعيد كائن JSON بقيمة منطقية `success` صحيحة و `pinataUrl` حيث تم تثبيت بياناتنا الوصفية. سنستخدم `pinataUrl` المُرجع هذا كمدخل `tokenURI` لدالة الصك في عقدنا الذكي.
- إذا فشل طلب POST هذا، فإن دالتنا تعيد كائن JSON بقيمة منطقية `success` خاطئة وسلسلة `message` تنقل خطأنا.

كما هو الحال مع أنواع الإرجاع لدالة `connectWallet` الخاصة بنا، فإننا نعيد كائنات JSON حتى نتمكن من استخدام معلماتها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.

## تحميل عقدك الذكي {#load-your-smart-contract}

الآن بعد أن أصبح لدينا طريقة لتحميل البيانات الوصفية لرموزنا غير القابلة للاستبدال إلى آي بي إف إس عبر دالة `pinJSONToIPFS` الخاصة بنا، سنحتاج إلى طريقة لتحميل مثيل من عقدنا الذكي حتى نتمكن من استدعاء دالة `mintNFT` الخاصة به.

كما ذكرنا سابقًا، في هذا الدرس التعليمي، سنستخدم [هذا العقد الذكي الحالي للرموز غير القابلة للاستبدال (إن إف تي)](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)؛ ومع ذلك، إذا كنت ترغب في معرفة كيف صنعناه، أو صنع واحد بنفسك، فإننا نوصي بشدة بالاطلاع على درسنا التعليمي الآخر، ["كيفية إنشاء رمز غير قابل للاستبدال (إن إف تي)"](https://www.alchemy.com/docs/how-to-create-an-nft).

### واجهة التطبيق الثنائية للعقد (ABI) {#contract-abi}

إذا فحصت ملفاتنا عن كثب، ستلاحظ أنه في دليل `src` الخاص بنا، يوجد ملف `contract-abi.json`. An ABI is necessary for specifying which function a contract will invoke as well ensuring that the function will return data in the format you're expecting.

We're also going to need an ألكيمي API key and the ألكيمي ويب3 API to connect to the إيثريوم blockchain and load our smart contract.

### إنشاء مفتاح ألكيمي API الخاص بك {#create-alchemy-api}

إذا لم يكن لديك حساب ألكيمي بالفعل، [سجل مجانًا هنا.](https://alchemy.com/?a=eth-org-nft-minter)

Once you’ve created an ألكيمي account, you can generate an API key by creating an app. This will allow us to make requests to the روبستين test network.

Navigate to the “Create App” page in your ألكيمي Dashboard by hovering over “Apps” in the nav bar and clicking “Create App”.

Name your app we chose "My First إن إف تي!", offer a short description, select “Staging” for the Environment used for your app bookkeeping, and choose “روبستين” for your network.

Click “Create app” and that’s it! Your app should appear in the table below.

Awesome so now that we've created our HTTP ألكيمي API URL, copy it to your clipboard...

…ثم لنضفه إلى ملف `.env` الخاص بنا. Altogether, your .env file should look like this:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

الآن بعد أن أصبح لدينا واجهة التطبيق الثنائية للعقد ومفتاح ألكيمي API، أصبحنا جاهزين لتحميل عقدنا الذكي باستخدام [ألكيمي ويب3](https://github.com/alchemyplatform/alchemy-web3).

### إعداد نقطة نهاية وعقد ألكيمي ويب3 الخاص بك {#setup-alchemy-endpoint}

أولاً، إذا لم يكن لديك بالفعل، فستحتاج إلى تثبيت [ألكيمي ويب3](https://github.com/alchemyplatform/alchemy-web3) عن طريق الانتقال إلى الدليل الرئيسي: `nft-minter-tutorial` في الطرفية:

```text
cd ..
npm install @alch/alchemy-web3
```

بعد ذلك لنعد إلى ملف `interact.js`. At the top of the file, add the following code to import your ألكيمي key from your .env file and set up your ألكيمي ويب3 endpoint:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[ألكيمي ويب3](https://github.com/alchemyplatform/alchemy-web3) هو غلاف حول [ويب3.جي إس](https://docs.web3js.org/)، يوفر طرق API محسنة ومزايا أخرى حاسمة لجعل حياتك كمطور web3 أسهل. It is designed to require minimal configuration so you can start using it in your app right away!

Next, let's add our contract ABI and contract address to our file.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Once we have both of those, we're ready to start coding our mint function!

## تنفيذ دالة mintNFT {#implement-the-mintnft-function}

داخل ملف `interact.js`، لنعرّف دالتنا، `mintNFT`، والتي ستقوم، كما يوحي اسمها، بصك رموزنا غير القابلة للاستبدال.

Because we will be making numerous asynchronous calls \(to بينياتا to pin our metadata to آي بي إف إس, ألكيمي ويب3 to load our smart contract, and ميتاماسك to sign our transactions\), our function will also be asynchronous.

ستكون المدخلات الثلاثة لدالتنا هي `url` لأصلنا الرقمي، و `name`، و `description`. أضف توقيع الدالة التالي أسفل دالة `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### معالجة أخطاء الإدخال {#input-error-handling}

Naturally, it makes sense to have some sort of input error handling at the start of the function, so we exit this function if our input parameters aren't correct. Inside our function, let's add the following code:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗يرجى التأكد من اكتمال جميع الحقول قبل الصك.",
    }
  }
}
```

بشكل أساسي، إذا كان أي من معلمات الإدخال سلسلة فارغة، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` خاطئة، وسلسلة `status` تنقل أنه يجب إكمال جميع الحقول في واجهة المستخدم الخاصة بنا.

### تحميل البيانات الوصفية إلى آي بي إف إس {#upload-metadata-to-ipfs}

بمجرد أن نعرف أن بياناتنا الوصفية منسقة بشكل صحيح، فإن الخطوة التالية هي تغليفها في كائن JSON وتحميلها إلى آي بي إف إس عبر `pinJSONToIPFS` التي كتبناها!

للقيام بذلك، نحتاج أولاً إلى استيراد دالة `pinJSONToIPFS` إلى ملف `interact.js`. في أعلى ملف `interact.js`، لنضف:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

تذكر أن `pinJSONToIPFS` يأخذ جسم JSON. لذلك قبل أن نجري استدعاءً لها، سنحتاج إلى تنسيق معلمات `url` و `name` و `description` في كائن JSON.

لِنحدّث كودنا لإنشاء كائن JSON يسمى `metadata` ثم نقوم باستدعاء `pinJSONToIPFS` مع هذه المعلمة `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗يرجى التأكد من اكتمال جميع الحقول قبل الصك.",
    }
  }

  //إنشاء البيانات الوصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //إجراء استدعاء pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 حدث خطأ ما أثناء تحميل tokenURI الخاص بك.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

لاحظ أننا نخزن استجابة استدعائنا لـ `pinJSONToIPFS(metadata)` في كائن `pinataResponse`. Then, we parse this object for any errors.

إذا كان هناك خطأ، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` خاطئة وسلسلة `status` الخاصة بنا تنقل أن استدعاءنا قد فشل. بخلاف ذلك، نستخرج `pinataURL` من `pinataResponse` ونخزنه كمتغير `tokenURI`.

Now it's time to load our smart contract using the ألكيمي ويب3 API that we initialized at the top of our file. أضف سطر الكود التالي إلى أسفل دالة `mintNFT` لتعيين العقد في المتغير العام `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

آخر شيء يجب إضافته في دالة `mintNFT` هو معاملة إيثريوم الخاصة بنا:

```javascript
//إعداد معاملة إيثريوم الخاصة بك
const transactionParameters = {
  to: contractAddress, // مطلوب باستثناء أثناء نشر العقود.
  from: window.ethereum.selectedAddress, // يجب أن يتطابق مع العنوان النشط للمستخدم.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //إجراء استدعاء لعقد NFT الذكي
}

//توقيع المعاملة عبر MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ تحقق من معاملتك على Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 حدث خطأ ما: " + error.message,
  }
}
```

If you're already familiar with إيثريوم transactions, you'll notice that the structure is pretty similar to what you've seen.

- First, we set up our transactions parameters.
  - `to` يحدد عنوان المستلم (عقدنا الذكي)
  - `from` يحدد موقع المعاملة (عنوان المستخدم المتصل بـ ميتاماسك: `window.ethereum.selectedAddress`)
  - `data` يحتوي على استدعاء طريقة `mintNFT` في عقدنا الذكي، والتي تتلقى `tokenURI` وعنوان محفظة المستخدم، `window.ethereum.selectedAddress`، كمدخلات
- بعد ذلك، نقوم بإجراء استدعاء await، `window.ethereum.request`، حيث نطلب من ميتاماسك توقيع المعاملة. لاحظ، في هذا الطلب، أننا نحدد طريقة eth الخاصة بنا (eth_SentTransaction) ونمرر `transactionParameters`. At this point, ميتاماسك will open up in the browser, and prompt the user to sign or reject the transaction.
  - إذا نجحت المعاملة، ستعيد الدالة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى true وسلسلة `status` تحث المستخدم على التحقق من إيثرسكان لمزيد من المعلومات حول معاملته.
  - إذا فشلت المعاملة، ستعيد الدالة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى false، وسلسلة `status` تنقل رسالة الخطأ.

بشكل عام، يجب أن تبدو دالة `mintNFT` الخاصة بنا كما يلي:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗يرجى التأكد من اكتمال جميع الحقول قبل الصك.",
    }
  }

  //إنشاء البيانات الوصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //طلب تثبيت pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 حدث خطأ ما أثناء تحميل tokenURI الخاص بك.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //تحميل العقد الذكي
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //إعداد معاملة إيثريوم الخاصة بك
  const transactionParameters = {
    to: contractAddress, // مطلوب باستثناء أثناء نشر العقود.
    from: window.ethereum.selectedAddress, // يجب أن يتطابق مع العنوان النشط للمستخدم.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //إجراء استدعاء لعقد NFT الذكي
  }

  //توقيع المعاملة عبر MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ تحقق من معاملتك على Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 حدث خطأ ما: " + error.message,
    }
  }
}
```

That's one giant function! الآن، نحتاج فقط إلى ربط دالة `mintNFT` بمكون `Minter.js`...

## ربط mintNFT بواجهة Minter.js الأمامية {#connect-our-frontend}

افتح ملف `Minter.js` الخاص بك وحدّث سطر `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` في الأعلى ليصبح:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

أخيرًا، قم بتنفيذ دالة `onMintPressed` لإجراء استدعاء await لدالة `mintNFT` المستوردة وتحديث متغير الحالة `status` ليعكس ما إذا كانت معاملتنا قد نجحت أم فشلت:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## نشر الرمز غير القابل للاستبدال الخاص بك على موقع ويب مباشر {#deploy-your-NFT}

Ready to take your project live for users to interact with؟ اطلع على [هذا الدرس التعليمي](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) لنشر Minter الخاص بك على موقع ويب مباشر.

One last step...

## اغزو عالم البلوكتشين {#take-the-blockchain-world-by-storm}

Just kidding, you made it to the end of the tutorial!

To recap, by building an إن إف تي minter, you successfully learned how to:

- Connect to ميتاماسك via your frontend project
- Call smart contract methods from your frontend
- Sign transactions using ميتاماسك

من المفترض أنك ترغب في أن تكون قادرًا على عرض الرموز غير القابلة للاستبدال (إن إف تيز) المصكوكة عبر تطبيقك اللامركزي في محفظتك - لذا تأكد من مراجعة درسنا التعليمي السريع [كيفية عرض الرمز غير القابل للاستبدال في محفظتك](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

وكما هو الحال دائمًا، إذا كان لديك أي أسئلة، فنحن هنا للمساعدة في [ألكيمي ديسكورد](https://discord.gg/gWuC7zB). We can't wait to see how you apply the concepts from this tutorial to your future projects!
