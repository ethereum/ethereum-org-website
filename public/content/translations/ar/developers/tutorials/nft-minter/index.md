---
title: دليل تعليمي لأداة سك الرموز غير القابلة للاستبدال (NFT Minter)
description: في هذا الدليل التعليمي، ستقوم ببناء أداة لسك الرموز غير القابلة للاستبدال (NFT) وتتعلم كيفية إنشاء تطبيق لامركزي (dapp) متكامل من خلال ربط عقدك الذكي بواجهة أمامية مبنية بـ React باستخدام MetaMask وأدوات Web3.
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "العقود الذكية", "الواجهة الأمامية", "Pinata", "ERC-721"]
skill: intermediate
lang: ar
published: 2021-10-06
---

أحد أكبر التحديات التي تواجه المطورين القادمين من خلفية Web2 هو معرفة كيفية ربط العقد الذكي بمشروع واجهة أمامية والتفاعل معه.

من خلال بناء أداة سك الرموز غير القابلة للاستبدال (NFT minter) — وهي واجهة مستخدم بسيطة حيث يمكنك إدخال رابط لأصلك الرقمي، وعنوان، ووصف — ستتعلم كيفية:

- الاتصال بـ MetaMask عبر مشروع الواجهة الأمامية الخاص بك
- استدعاء دوال العقد الذكي من الواجهة الأمامية
- توقيع المعاملات باستخدام MetaMask

في هذا الدليل التعليمي، سنستخدم [React](https://react.dev/) كإطار عمل للواجهة الأمامية. نظرًا لأن هذا الدليل يركز بشكل أساسي على تطوير Web3، فلن نقضي الكثير من الوقت في تفصيل أساسيات React. بدلاً من ذلك، سنركز على إضافة الوظائف إلى مشروعنا.

كمتطلب أساسي، يجب أن يكون لديك فهم بمستوى مبتدئ لـ React—أن تعرف كيف تعمل المكونات (components)، والخصائص (props)، و useState/useEffect، واستدعاء الدوال الأساسية. إذا لم تسمع بأي من هذه المصطلحات من قبل، فقد ترغب في الاطلاع على [دليل مقدمة إلى React](https://react.dev/learn/tutorial-tic-tac-toe). بالنسبة للمتعلمين البصريين، نوصي بشدة بسلسلة مقاطع الفيديو الممتازة [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) بواسطة Net Ninja.

وإذا لم تكن قد فعلت ذلك بالفعل، فستحتاج بالتأكيد إلى حساب Alchemy لإكمال هذا الدليل التعليمي بالإضافة إلى بناء أي شيء على البلوك تشين. قم بالتسجيل للحصول على حساب مجاني [هنا](https://alchemy.com/).

بدون مزيد من التأخير، دعونا نبدأ!

## أساسيات إنشاء رموز NFT {#making-nfts-101}

قبل أن نبدأ في النظر إلى أي كود، من المهم فهم كيفية عمل إنشاء رمز NFT. يتضمن ذلك خطوتين:

### نشر عقد ذكي لـ NFT على البلوك تشين الخاص بإيثريوم {#publish-nft}

أكبر اختلاف بين معياري العقود الذكية لـ NFT هو أن ERC-1155 هو معيار متعدد الرموز ويتضمن وظيفة الدفعات (batch functionality)، بينما ERC-721 هو معيار لرمز واحد وبالتالي يدعم فقط نقل رمز واحد في كل مرة.

### استدعاء دالة السك {#minting-function}

عادةً، تتطلب دالة السك هذه تمرير متغيرين كمعلمات (parameters)، الأول هو `recipient`، والذي يحدد العنوان الذي سيتلقى رمز NFT الذي تم سكه حديثًا، والثاني هو `tokenURI` الخاص بـ NFT، وهو سلسلة نصية (string) تشير إلى مستند JSON يصف البيانات الوصفية (metadata) لرمز NFT.

البيانات الوصفية لرمز NFT هي ما يجعله حيًا حقًا، حيث تسمح له بامتلاك خصائص، مثل الاسم، والوصف، والصورة (أو أصل رقمي مختلف)، وسمات أخرى. إليك [مثال على tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)، والذي يحتوي على البيانات الوصفية لرمز NFT.

في هذا الدليل التعليمي، سنركز على الجزء الثاني، وهو استدعاء دالة السك لعقد ذكي موجود لـ NFT باستخدام واجهة مستخدم React الخاصة بنا.

[إليك رابط](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) للعقد الذكي ERC-721 NFT الذي سنقوم باستدعائه في هذا الدليل التعليمي. إذا كنت ترغب في معرفة كيف قمنا بإنشائه، نوصي بشدة بالاطلاع على دليلنا التعليمي الآخر، ["كيفية إنشاء NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

رائع، الآن بعد أن فهمنا كيفية عمل إنشاء NFT، دعونا نستنسخ ملفات البداية الخاصة بنا!

## استنساخ ملفات البداية {#clone-the-starter-files}

أولاً، انتقل إلى [مستودع GitHub الخاص بـ nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) للحصول على ملفات البداية لهذا المشروع. قم باستنساخ هذا المستودع في بيئتك المحلية.

عندما تفتح مستودع `nft-minter-tutorial` المستنسخ هذا، ستلاحظ أنه يحتوي على مجلدين: `minter-starter-files` و `nft-minter`.

- يحتوي `minter-starter-files` على ملفات البداية (بشكل أساسي واجهة مستخدم React) لهذا المشروع. في هذا الدليل التعليمي، **سنعمل في هذا الدليل**، حيث ستتعلم كيفية إحياء واجهة المستخدم هذه عن طريق ربطها بمحفظة إيثريوم الخاصة بك وعقد ذكي لـ NFT.
- يحتوي `nft-minter` على الدليل التعليمي المكتمل بالكامل وهو موجود كـ **مرجع** لك **إذا واجهت أي صعوبة.**

بعد ذلك، افتح نسختك من `minter-starter-files` في محرر الأكواد الخاص بك، ثم انتقل إلى مجلد `src`.

جميع الأكواد التي سنكتبها ستكون داخل مجلد `src`. سنقوم بتعديل المكون `Minter.js` وكتابة ملفات JavaScript إضافية لمنح مشروعنا وظائف Web3.

## الخطوة 2: التحقق من ملفات البداية {#step-2-check-out-our-starter-files}

قبل أن نبدأ في كتابة الأكواد، من المهم التحقق مما تم توفيره لنا بالفعل في ملفات البداية.

### تشغيل مشروع React الخاص بك {#get-your-react-project-running}

دعونا نبدأ بتشغيل مشروع React في متصفحنا. جمال React هو أنه بمجرد تشغيل مشروعنا في المتصفح، سيتم تحديث أي تغييرات نحفظها مباشرة في المتصفح.

لتشغيل المشروع، انتقل إلى الدليل الجذري لمجلد `minter-starter-files`، وقم بتشغيل `npm install` في الطرفية (terminal) لتثبيت تبعيات المشروع:

```bash
cd minter-starter-files
npm install
```

بمجرد الانتهاء من التثبيت، قم بتشغيل `npm start` في الطرفية:

```bash
npm start
```

القيام بذلك يجب أن يفتح http://localhost:3000/ في متصفحك، حيث سترى الواجهة الأمامية لمشروعنا. يجب أن تتكون من 3 حقول: مكان لإدخال رابط لأصل NFT الخاص بك، وإدخال اسم NFT الخاص بك، وتقديم وصف.

إذا حاولت النقر على زري "Connect Wallet" أو "Mint NFT"، ستلاحظ أنهما لا يعملان—وذلك لأننا لا نزال بحاجة إلى برمجة وظائفهما! :\)

### المكون Minter.js {#minter-js}

**ملاحظة:** تأكد من أنك في مجلد `minter-starter-files` وليس في مجلد `nft-minter`!

دعونا نعود إلى مجلد `src` في محررنا ونفتح ملف `Minter.js`. من المهم جدًا أن نفهم كل شيء في هذا الملف، لأنه مكون React الأساسي الذي سنعمل عليه.

في الجزء العلوي من هذا الملف، لدينا متغيرات الحالة (state variables) التي سنقوم بتحديثها بعد أحداث معينة.

```javascript
//State variables // متغيرات الحالة
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

لم تسمع أبدًا عن متغيرات الحالة في React أو خطافات الحالة (state hooks)؟ تحقق من [هذه](https://legacy.reactjs.org/docs/hooks-state.html) المستندات.

إليك ما يمثله كل من المتغيرات:

- `walletAddress` - سلسلة نصية تخزن عنوان محفظة المستخدم
- `status` - سلسلة نصية تحتوي على رسالة لعرضها في أسفل واجهة المستخدم
- `name` - سلسلة نصية تخزن اسم NFT
- `description` - سلسلة نصية تخزن وصف NFT
- `url` - سلسلة نصية تمثل رابطًا للأصل الرقمي لـ NFT

بعد متغيرات الحالة، سترى ثلاث دوال غير منفذة: `useEffect`، و `connectWalletPressed`، و `onMintPressed`. ستلاحظ أن جميع هذه الدوال هي `async`، وذلك لأننا سنجري استدعاءات API غير متزامنة بداخلها! أسماؤها تدل على وظائفها:

```javascript
useEffect(async () => {
  //TODO: implement // للقيام به: التنفيذ
}, [])

const connectWalletPressed = async () => {
  //TODO: implement // للقيام به: التنفيذ
}

const onMintPressed = async () => {
  //TODO: implement // للقيام به: التنفيذ
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - هذا خطاف React يتم استدعاؤه بعد تصيير (render) المكون الخاص بك. نظرًا لأنه يتم تمرير مصفوفة فارغة `[]` إليه (انظر السطر 3)، فسيتم استدعاؤه فقط في التصيير _الأول_ للمكون. هنا سنستدعي مستمع المحفظة (wallet listener) ودالة محفظة أخرى لتحديث واجهة المستخدم الخاصة بنا لتعكس ما إذا كانت المحفظة متصلة بالفعل.
- `connectWalletPressed` - سيتم استدعاء هذه الدالة لربط محفظة MetaMask الخاصة بالمستخدم بالتطبيق اللامركزي (dapp) الخاص بنا.
- `onMintPressed` - سيتم استدعاء هذه الدالة لسك رمز NFT الخاص بالمستخدم.

بالقرب من نهاية هذا الملف، لدينا واجهة المستخدم الخاصة بمكوننا. إذا قمت بفحص هذا الكود بعناية، ستلاحظ أننا نقوم بتحديث متغيرات الحالة `url`، و `name`، و `description` عندما يتغير الإدخال في الحقول النصية المقابلة لها.

سترى أيضًا أنه يتم استدعاء `connectWalletPressed` و `onMintPressed` عند النقر على الأزرار ذات المعرفات `mintButton` و `walletButton` على التوالي.

```javascript
//the UI of our component // واجهة المستخدم للمكون الخاص بنا
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

أخيرًا، دعونا نتناول أين يتم إضافة مكون Minter هذا.

إذا ذهبت إلى ملف `App.js`، وهو المكون الرئيسي في React الذي يعمل كحاوية لجميع المكونات الأخرى، سترى أن مكون Minter الخاص بنا يتم حقنه في السطر 7.

**في هذا الدليل التعليمي، سنقوم فقط بتعديل ملف `Minter.js` وإضافة ملفات في مجلد `src` الخاص بنا.**

الآن بعد أن فهمنا ما نعمل عليه، دعونا نعد محفظة إيثريوم الخاصة بنا!

## إعداد محفظة إيثريوم الخاصة بك {#set-up-your-ethereum-wallet}

لكي يتمكن المستخدمون من التفاعل مع عقدك الذكي، سيحتاجون إلى ربط محفظة إيثريوم الخاصة بهم بتطبيقك اللامركزي.

### تنزيل MetaMask {#download-metamask}

في هذا الدليل التعليمي، سنستخدم MetaMask، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثريوم الخاص بك. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثريوم، تحقق من [هذه الصفحة](/developers/docs/transactions/).

يمكنك تنزيل وإنشاء حساب MetaMask مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى "شبكة الاختبار Ropsten" (Ropsten Test Network) في الجزء العلوي الأيمن (حتى لا نتعامل بأموال حقيقية).

### إضافة إيثر من صنبور {#add-ether-from-faucet}

من أجل سك رموز NFT الخاصة بنا (أو توقيع أي معاملات على البلوك تشين الخاص بإيثريوم)، سنحتاج إلى بعض عملات ETH الوهمية. للحصول على ETH، يمكنك الذهاب إلى [صنبور Ropsten](https://faucet.ropsten.be/) وإدخال عنوان حساب Ropsten الخاص بك، ثم النقر على "Send Ropsten Eth". يجب أن ترى ETH في حساب MetaMask الخاص بك بعد فترة وجيزة!

### التحقق من رصيدك {#check-your-balance}

للتأكد من وجود رصيدنا، دعونا نجري طلب [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) باستخدام [أداة الملحن الخاصة بـ Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). سيعيد هذا مقدار ETH في محفظتنا. بعد إدخال عنوان حساب MetaMask الخاص بك والنقر على "Send Request"، يجب أن ترى استجابة مثل هذه:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ملاحظة:** هذه النتيجة بوحدة wei وليس eth. تُستخدم wei كأصغر فئة من الإيثر. التحويل من wei إلى eth هو: <span dir="ltr">1 eth = 10¹⁸ wei</span>. لذا إذا قمنا بتحويل 0xde0b6b3a7640000 إلى النظام العشري نحصل على <span dir="ltr">1*10¹⁸</span> والذي يساوي 1 eth.

يا للعجب! أموالنا الوهمية كلها موجودة! <Emoji text=":money_mouth_face:" size={1} />

## ربط MetaMask بواجهة المستخدم الخاصة بك {#connect-metamask-to-your-UI}

الآن بعد إعداد محفظة MetaMask الخاصة بنا، دعونا نربط تطبيقنا اللامركزي بها!

لأننا نريد الالتزام بنموذج [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)، سنقوم بإنشاء ملف منفصل يحتوي على دوالنا لإدارة المنطق، والبيانات، وقواعد تطبيقنا اللامركزي، ثم تمرير تلك الدوال إلى الواجهة الأمامية (مكون Minter.js الخاص بنا).

### الدالة connectWallet {#connect-wallet-function}

للقيام بذلك، دعونا ننشئ مجلدًا جديدًا يسمى `utils` في دليل `src` الخاص بك ونضيف ملفًا يسمى `interact.js` بداخله، والذي سيحتوي على جميع دوال التفاعل مع المحفظة والعقد الذكي.

في ملف `interact.js` الخاص بنا، سنكتب دالة `connectWallet`، والتي سنقوم بعد ذلك باستيرادها واستدعائها في مكون `Minter.js` الخاص بنا.

في ملف `interact.js` الخاص بك، أضف ما يلي:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

دعونا نفصل ما يفعله هذا الكود:

أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا في متصفحك.

`window.ethereum` هي واجهة برمجة تطبيقات (API) عالمية يتم حقنها بواسطة MetaMask وموفري المحافظ الآخرين والتي تسمح لمواقع الويب بطلب حسابات إيثريوم الخاصة بالمستخدمين. إذا تمت الموافقة، يمكنها قراءة البيانات من شبكات البلوك تشين التي يتصل بها المستخدم، واقتراح أن يقوم المستخدم بتوقيع الرسائل والمعاملات. تحقق من [مستندات MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) لمزيد من المعلومات!

إذا كان `window.ethereum` _غير_ موجود، فهذا يعني أن MetaMask غير مثبت. ينتج عن هذا إرجاع كائن JSON، حيث يكون `address` المُرجع عبارة عن سلسلة نصية فارغة، وينقل كائن JSX `status` رسالة تفيد بأنه يجب على المستخدم تثبيت MetaMask.

**معظم الدوال التي نكتبها ستعيد كائنات JSON يمكننا استخدامها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.**

الآن إذا كان `window.ethereum` _موجودًا_، فهنا تصبح الأمور مثيرة للاهتمام.

باستخدام حلقة try/catch، سنحاول الاتصال بـ MetaMask عن طريق استدعاء [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). سيؤدي استدعاء هذه الدالة إلى فتح MetaMask في المتصفح، حيث سيُطلب من المستخدم ربط محفظته بتطبيقك اللامركزي.

- إذا اختار المستخدم الاتصال، فإن `method: "eth_requestAccounts"` ستعيد مصفوفة تحتوي على جميع عناوين حسابات المستخدم المتصلة بالتطبيق اللامركزي. إجمالاً، ستعيد دالة `connectWallet` الخاصة بنا كائن JSON يحتوي على `address` _الأول_ في هذه المصفوفة (انظر السطر 9) ورسالة `status` تطالب المستخدم بكتابة رسالة إلى العقد الذكي.
- إذا رفض المستخدم الاتصال، فسيحتوي كائن JSON على سلسلة نصية فارغة لـ `address` المُرجع ورسالة `status` تعكس أن المستخدم رفض الاتصال.

### إضافة الدالة connectWallet إلى مكون واجهة المستخدم Minter.js {#add-connect-wallet}

الآن بعد أن كتبنا دالة `connectWallet` هذه، دعونا نربطها بمكون `Minter.js` الخاص بنا.

أولاً، سيتعين علينا استيراد دالتنا إلى ملف `Minter.js` الخاص بنا عن طريق إضافة `import { connectWallet } from "./utils/interact.js";` إلى الجزء العلوي من ملف `Minter.js`. يجب أن تبدو الأسطر الـ 11 الأولى من `Minter.js` الآن هكذا:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables // متغيرات الحالة
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

ثم، داخل دالة `connectWalletPressed` الخاصة بنا، سنستدعي دالة `connectWallet` المستوردة، هكذا:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

هل تلاحظ كيف يتم تجريد معظم وظائفنا بعيدًا عن مكون `Minter.js` الخاص بنا من ملف `interact.js`؟ هذا لكي نتوافق مع نموذج M-V-C!

في `connectWalletPressed`، نقوم ببساطة بإجراء استدعاء await لدالة `connectWallet` المستوردة، وباستخدام استجابتها، نقوم بتحديث متغيرات `status` و `walletAddress` الخاصة بنا عبر خطافات الحالة الخاصة بها.

الآن، دعونا نحفظ كلا الملفين `Minter.js` و `interact.js` ونختبر واجهة المستخدم الخاصة بنا حتى الآن.

افتح متصفحك على localhost:3000، واضغط على زر "Connect Wallet" في أعلى يمين الصفحة.

إذا كان لديك MetaMask مثبتًا، فسيُطلب منك ربط محفظتك بتطبيقك اللامركزي. اقبل دعوة الاتصال.

يجب أن ترى أن زر المحفظة يعكس الآن أن عنوانك متصل.

بعد ذلك، حاول تحديث الصفحة... هذا غريب. يطالبنا زر المحفظة الخاص بنا بربط MetaMask، على الرغم من أنه متصل بالفعل...

لا تقلق مع ذلك! يمكننا إصلاح ذلك بسهولة عن طريق تنفيذ دالة تسمى `getCurrentWalletConnected`، والتي ستتحقق مما إذا كان العنوان متصلاً بالفعل بتطبيقنا اللامركزي وتحديث واجهة المستخدم الخاصة بنا وفقًا لذلك!

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

هذا الكود مشابه _جدًا_ لدالة `connectWallet` التي كتبناها للتو في وقت سابق.

الفرق الرئيسي هو أنه بدلاً من استدعاء الطريقة `eth_requestAccounts`، والتي تفتح MetaMask للمستخدم لربط محفظته، هنا نستدعي الطريقة `eth_accounts`، والتي تعيد ببساطة مصفوفة تحتوي على عناوين MetaMask المتصلة حاليًا بتطبيقنا اللامركزي.

لرؤية هذه الدالة قيد العمل، دعونا نستدعيها في دالة `useEffect` لمكون `Minter.js` الخاص بنا.

كما فعلنا مع `connectWallet`، يجب علينا استيراد هذه الدالة من ملف `interact.js` الخاص بنا إلى ملف `Minter.js` الخاص بنا هكذا:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here // الاستيراد هنا
} from "./utils/interact.js"
```

الآن، نقوم ببساطة باستدعائها في دالة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

لاحظ، أننا نستخدم استجابة استدعائنا لـ `getCurrentWalletConnected` لتحديث متغيرات الحالة `walletAddress` و `status` الخاصة بنا.

بمجرد إضافة هذا الكود، حاول تحديث نافذة المتصفح. يجب أن يقول الزر أنك متصل، ويعرض معاينة لعنوان محفظتك المتصلة - حتى بعد التحديث!

### تنفيذ addWalletListener {#implement-add-wallet-listener}

الخطوة الأخيرة في إعداد محفظة التطبيق اللامركزي الخاص بنا هي تنفيذ مستمع المحفظة (wallet listener) بحيث يتم تحديث واجهة المستخدم الخاصة بنا عندما تتغير حالة محفظتنا، مثل عندما يقوم المستخدم بقطع الاتصال أو تبديل الحسابات.

في ملف `Minter.js` الخاص بك، أضف دالة `addWalletListener` تبدو كالتالي:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

دعونا نفصل بسرعة ما يحدث هنا:

- أولاً، تتحقق دالتنا مما إذا كان `window.ethereum` ممكّنًا (أي أن MetaMask مثبت).
  - إذا لم يكن كذلك، نقوم ببساطة بتعيين متغير الحالة `status` الخاص بنا إلى سلسلة JSX تطالب المستخدم بتثبيت MetaMask.
  - إذا كان ممكّنًا، نقوم بإعداد المستمع `window.ethereum.on("accountsChanged")` في السطر 3 والذي يستمع لتغييرات الحالة في محفظة MetaMask، والتي تشمل عندما يقوم المستخدم بربط حساب إضافي بالتطبيق اللامركزي، أو تبديل الحسابات، أو قطع اتصال حساب. إذا كان هناك حساب واحد على الأقل متصل، يتم تحديث متغير الحالة `walletAddress` كأول حساب في مصفوفة `accounts` التي يعيدها المستمع. بخلاف ذلك، يتم تعيين `walletAddress` كسلسلة نصية فارغة.

أخيرًا، يجب علينا استدعاؤها في دالة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

وها نحن ذا! لقد أكملنا برمجة جميع وظائف محفظتنا! الآن بعد إعداد محفظتنا، دعونا نكتشف كيفية سك رمز NFT الخاص بنا!

## أساسيات البيانات الوصفية لـ NFT {#nft-metadata-101}

لذا تذكر البيانات الوصفية لـ NFT التي تحدثنا عنها للتو في الخطوة 0 من هذا الدليل التعليمي—إنها تجعل رمز NFT حيًا، مما يسمح له بامتلاك خصائص، مثل أصل رقمي، واسم، ووصف، وسمات أخرى.

سنحتاج إلى تكوين هذه البيانات الوصفية ككائن JSON وتخزينها، حتى نتمكن من تمريرها كمعلمة `tokenURI` عند استدعاء دالة `mintNFT` الخاصة بعقدنا الذكي.

سيتألف النص الموجود في حقول "Link to Asset" و "Name" و "Description" من الخصائص المختلفة للبيانات الوصفية لرمز NFT الخاص بنا. سنقوم بتنسيق هذه البيانات الوصفية ككائن JSON، ولكن هناك خياران لمكان تخزين كائن JSON هذا:

- يمكننا تخزينه على البلوك تشين الخاص بإيثريوم؛ ومع ذلك، فإن القيام بذلك سيكون مكلفًا للغاية.
- يمكننا تخزينه على خادم مركزي، مثل AWS أو Firebase. لكن ذلك سيتعارض مع روح اللامركزية لدينا.
- يمكننا استخدام IPFS، وهو بروتوكول لامركزي وشبكة نظير إلى نظير (peer-to-peer) لتخزين ومشاركة البيانات في نظام ملفات موزع. نظرًا لأن هذا البروتوكول لامركزي ومجاني، فهو خيارنا الأفضل!

لتخزين بياناتنا الوصفية على IPFS، سنستخدم [Pinata](https://pinata.cloud/)، وهي واجهة برمجة تطبيقات (API) ومجموعة أدوات IPFS مريحة. في الخطوة التالية، سنشرح بالضبط كيفية القيام بذلك!

## استخدام Pinata لتثبيت بياناتك الوصفية على IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

إذا لم يكن لديك حساب [Pinata](https://pinata.cloud/)، فقم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud/auth/signup) وأكمل الخطوات للتحقق من بريدك الإلكتروني وحسابك.

### إنشاء مفتاح API الخاص بـ Pinata {#create-pinata-api-key}

انتقل إلى صفحة [https://pinata.cloud/keys](https://pinata.cloud/keys)، ثم حدد زر "New Key" في الأعلى، وقم بتعيين أداة المسؤول (Admin widget) كممكّنة، وقم بتسمية مفتاحك.

ستظهر لك بعد ذلك نافذة منبثقة تحتوي على معلومات API الخاصة بك. تأكد من وضع هذا في مكان آمن.

الآن بعد إعداد مفتاحنا، دعونا نضيفه إلى مشروعنا حتى نتمكن من استخدامه.

### إنشاء ملف .env {#create-a-env}

يمكننا تخزين مفتاح Pinata والسر الخاص بنا بأمان في ملف بيئة. دعونا نثبت [حزمة dotenv](https://www.npmjs.com/package/dotenv) في دليل مشروعك.

افتح علامة تبويب جديدة في الطرفية الخاصة بك (منفصلة عن تلك التي تقوم بتشغيل المضيف المحلي) وتأكد من أنك في مجلد `minter-starter-files`، ثم قم بتشغيل الأمر التالي في الطرفية:

```text
npm install dotenv --save
```

بعد ذلك، قم بإنشاء ملف `.env` في الدليل الجذري لـ `minter-starter-files` عن طريق إدخال ما يلي في سطر الأوامر الخاص بك:

```javascript
vim.env
```

سيؤدي هذا إلى فتح ملف `.env` الخاص بك في vim (محرر نصوص). لحفظه، اضغط على "esc" + ":" + "q" على لوحة المفاتيح بهذا الترتيب.

بعد ذلك، في VSCode، انتقل إلى ملف `.env` الخاص بك وأضف مفتاح API الخاص بـ Pinata وسر API إليه، هكذا:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

احفظ الملف، وبعد ذلك ستكون جاهزًا للبدء في كتابة الدالة لتحميل بيانات JSON الوصفية الخاصة بك إلى IPFS!

### تنفيذ pinJSONToIPFS {#pin-json-to-ipfs}

لحسن الحظ بالنسبة لنا، تمتلك Pinata [واجهة برمجة تطبيقات (API) مخصصة لتحميل بيانات JSON إلى IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ومثال JavaScript مريح مع axios يمكننا استخدامه، مع بعض التعديلات الطفيفة.

في مجلد `utils` الخاص بك، دعونا ننشئ ملفًا آخر يسمى `pinata.js` ثم نستورد سر ومفتاح Pinata الخاصين بنا من ملف .env هكذا:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

بعد ذلك، الصق الكود الإضافي من الأسفل في ملف `pinata.js` الخاص بك. لا تقلق، سنفصل ما يعنيه كل شيء!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️ // إجراء طلب POST عبر axios إلى Pinata ⬇️
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

إذن ماذا يفعل هذا الكود بالضبط؟

أولاً، يقوم باستيراد [axios](https://www.npmjs.com/package/axios)، وهو عميل HTTP قائم على الوعود (promise based) للمتصفح و node.js، والذي سنستخدمه لإجراء طلب إلى Pinata.

ثم لدينا دالتنا غير المتزامنة `pinJSONToIPFS`، والتي تأخذ `JSONBody` كمدخل لها ومفتاح وسر Pinata api في ترويستها (header)، كل ذلك لإجراء طلب POST إلى واجهة برمجة تطبيقات `pinJSONToIPFS` الخاصة بهم.

- إذا نجح طلب POST هذا، فإن دالتنا تعيد كائن JSON مع القيمة المنطقية `success` كـ true و `pinataUrl` حيث تم تثبيت بياناتنا الوصفية. سنستخدم `pinataUrl` المُرجع هذا كمدخل `tokenURI` لدالة السك الخاصة بعقدنا الذكي.
- إذا فشل طلب POST هذا، فإن دالتنا تعيد كائن JSON مع القيمة المنطقية `success` كـ false وسلسلة نصية `message` تنقل خطأنا.

كما هو الحال مع أنواع الإرجاع لدالة `connectWallet` الخاصة بنا، فإننا نعيد كائنات JSON حتى نتمكن من استخدام معلماتها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.

## تحميل العقد الذكي الخاص بك {#load-your-smart-contract}

الآن بعد أن أصبح لدينا طريقة لتحميل البيانات الوصفية لـ NFT الخاصة بنا إلى IPFS عبر دالة `pinJSONToIPFS` الخاصة بنا، سنحتاج إلى طريقة لتحميل مثيل (instance) لعقدنا الذكي حتى نتمكن من استدعاء دالة `mintNFT` الخاصة به.

كما ذكرنا سابقًا، في هذا الدليل التعليمي سنستخدم [هذا العقد الذكي الموجود لـ NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)؛ ومع ذلك، إذا كنت ترغب في معرفة كيف قمنا بإنشائه، أو إنشاء واحد بنفسك، نوصي بشدة بالاطلاع على دليلنا التعليمي الآخر، ["كيفية إنشاء NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### واجهة التطبيق الثنائية (ABI) للعقد {#contract-abi}

إذا قمت بفحص ملفاتنا عن كثب، ستلاحظ أنه في دليل `src` الخاص بنا، يوجد ملف `contract-abi.json`. تعد واجهة التطبيق الثنائية (ABI) ضرورية لتحديد الدالة التي سيستدعيها العقد بالإضافة إلى ضمان أن الدالة ستعيد البيانات بالتنسيق الذي تتوقعه.

سنحتاج أيضًا إلى مفتاح Alchemy API و Alchemy Web3 API للاتصال بالبلوك تشين الخاص بإيثريوم وتحميل عقدنا الذكي.

### إنشاء مفتاح Alchemy API الخاص بك {#create-alchemy-api}

إذا لم يكن لديك حساب Alchemy بالفعل، [قم بالتسجيل مجانًا هنا.](https://alchemy.com/?a=eth-org-nft-minter)

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح API عن طريق إنشاء تطبيق. سيسمح لنا هذا بإجراء طلبات إلى شبكة الاختبار Ropsten.

انتقل إلى صفحة "Create App" في لوحة تحكم Alchemy الخاصة بك عن طريق التمرير فوق "Apps" في شريط التنقل والنقر على "Create App".

قم بتسمية تطبيقك، لقد اخترنا "My First NFT!"، وقدم وصفًا قصيرًا، وحدد "Staging" للبيئة المستخدمة لمسك دفاتر تطبيقك، واختر "Ropsten" لشبكتك.

انقر على "Create app" وهذا كل شيء! يجب أن يظهر تطبيقك في الجدول أدناه.

رائع، الآن بعد أن أنشأنا عنوان URL الخاص بـ HTTP Alchemy API، انسخه إلى الحافظة الخاصة بك...

…ثم دعونا نضيفه إلى ملف `.env` الخاص بنا. إجمالاً، يجب أن يبدو ملف .env الخاص بك هكذا:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key> // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

الآن بعد أن أصبح لدينا ABI الخاص بعقدنا ومفتاح Alchemy API الخاص بنا، نحن مستعدون لتحميل عقدنا الذكي باستخدام [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### إعداد نقطة نهاية Alchemy Web3 والعقد الخاص بك {#setup-alchemy-endpoint}

أولاً، إذا لم يكن لديك بالفعل، فستحتاج إلى تثبيت [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) عن طريق الانتقال إلى الدليل الرئيسي: `nft-minter-tutorial` في الطرفية:

```text
cd ..
npm install @alch/alchemy-web3
```

بعد ذلك دعونا نعود إلى ملف `interact.js` الخاص بنا. في الجزء العلوي من الملف، أضف الكود التالي لاستيراد مفتاح Alchemy الخاص بك من ملف .env الخاص بك وإعداد نقطة نهاية Alchemy Web3 الخاصة بك:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) هو غلاف (wrapper) حول [Web3.js](https://docs.web3js.org/)، يوفر طرق API محسنة وفوائد حاسمة أخرى لجعل حياتك كمطور web3 أسهل. تم تصميمه ليتطلب الحد الأدنى من التكوين حتى تتمكن من البدء في استخدامه في تطبيقك على الفور!

بعد ذلك، دعونا نضيف ABI الخاص بعقدنا وعنوان العقد إلى ملفنا.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

بمجرد أن نحصل على كليهما، نكون مستعدين للبدء في كتابة كود دالة السك الخاصة بنا!

## تنفيذ الدالة mintNFT {#implement-the-mintnft-function}

داخل ملف `interact.js` الخاص بك، دعونا نحدد دالتنا، `mintNFT`، والتي ستقوم بسك رمز NFT الخاص بنا كما يوحي اسمها.

لأننا سنجري العديد من الاستدعاءات غير المتزامنة (إلى Pinata لتثبيت بياناتنا الوصفية على IPFS، و Alchemy Web3 لتحميل عقدنا الذكي، و MetaMask لتوقيع معاملاتنا)، ستكون دالتنا أيضًا غير متزامنة.

المدخلات الثلاثة لدالتنا ستكون `url` الخاص بأصلنا الرقمي، و `name`، و `description`. أضف توقيع الدالة التالي أسفل دالة `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### معالجة أخطاء الإدخال {#input-error-handling}

بطبيعة الحال، من المنطقي أن يكون لدينا نوع من معالجة أخطاء الإدخال في بداية الدالة، لذلك نخرج من هذه الدالة إذا لم تكن معلمات الإدخال الخاصة بنا صحيحة. داخل دالتنا، دعونا نضيف الكود التالي:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

بشكل أساسي، إذا كان أي من معلمات الإدخال عبارة عن سلسلة نصية فارغة، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` هي false، وتنقل السلسلة النصية `status` أنه يجب إكمال جميع الحقول في واجهة المستخدم الخاصة بنا.

### تحميل البيانات الوصفية إلى IPFS {#upload-metadata-to-ipfs}

بمجرد أن نعرف أن بياناتنا الوصفية منسقة بشكل صحيح، فإن الخطوة التالية هي تغليفها في كائن JSON وتحميلها إلى IPFS عبر `pinJSONToIPFS` التي كتبناها!

للقيام بذلك، نحتاج أولاً إلى استيراد دالة `pinJSONToIPFS` إلى ملف `interact.js` الخاص بنا. في الجزء العلوي من `interact.js`، دعونا نضيف:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

تذكر أن `pinJSONToIPFS` تأخذ جسم JSON. لذا قبل أن نجري استدعاءً لها، سنحتاج إلى تنسيق معلمات `url`، و `name`، و `description` الخاصة بنا في كائن JSON.

دعونا نحدث الكود الخاص بنا لإنشاء كائن JSON يسمى `metadata` ثم نجري استدعاءً لـ `pinJSONToIPFS` باستخدام معلمة `metadata` هذه:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata // إنشاء البيانات الوصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call // إجراء طلب Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

لاحظ، أننا نخزن استجابة استدعائنا لـ `pinJSONToIPFS(metadata)` في كائن `pinataResponse`. ثم، نقوم بتحليل هذا الكائن بحثًا عن أي أخطاء.

إذا كان هناك خطأ، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` هي false وتنقل السلسلة النصية `status` الخاصة بنا أن استدعاءنا فشل. بخلاف ذلك، نستخرج `pinataURL` من `pinataResponse` ونخزنه كمتغير `tokenURI` الخاص بنا.

الآن حان الوقت لتحميل عقدنا الذكي باستخدام Alchemy Web3 API الذي قمنا بتهيئته في الجزء العلوي من ملفنا. أضف سطر الكود التالي إلى أسفل دالة `mintNFT` لتعيين العقد في المتغير العالمي `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

آخر شيء يجب إضافته في دالة `mintNFT` الخاصة بنا هو معاملة إيثريوم الخاصة بنا:

```javascript
//set up your Ethereum transaction // إعداد معاملة إيثريوم الخاصة بك
const transactionParameters = {
  to: contractAddress, // Required except during contract publications. // مطلوب باستثناء أوقات نشر العقد.
  from: window.ethereum.selectedAddress, // must match user's active address. // يجب أن يتطابق مع عنوان المستخدم النشط.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract // إجراء استدعاء للعقد الذكي لـ NFT
}

//sign the transaction via MetaMask // توقيع المعاملة عبر MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

إذا كنت معتادًا بالفعل على معاملات إيثريوم، فستلاحظ أن الهيكل مشابه جدًا لما رأيته.

- أولاً، نقوم بإعداد معلمات المعاملات الخاصة بنا.
  - `to` يحدد عنوان المستلم (عقدنا الذكي)
  - `from` يحدد موقع المعاملة (عنوان المستخدم المتصل بـ MetaMask: `window.ethereum.selectedAddress`)
  - `data` يحتوي على استدعاء لطريقة `mintNFT` الخاصة بعقدنا الذكي، والتي تتلقى `tokenURI` الخاص بنا وعنوان محفظة المستخدم، `window.ethereum.selectedAddress`، كمدخلات
- ثم، نجري استدعاء await، `window.ethereum.request`، حيث نطلب من MetaMask توقيع المعاملة. لاحظ، في هذا الطلب، أننا نحدد طريقة eth الخاصة بنا (eth_SentTransaction) ونمرر `transactionParameters` الخاصة بنا. في هذه المرحلة، سيتم فتح MetaMask في المتصفح، ويطالب المستخدم بتوقيع المعاملة أو رفضها.
  - إذا نجحت المعاملة، ستعيد الدالة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى true وتطالب السلسلة النصية `status` المستخدم بالتحقق من Etherscan لمزيد من المعلومات حول معاملته.
  - إذا فشلت المعاملة، ستعيد الدالة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى false، وتنقل السلسلة النصية `status` رسالة الخطأ.

إجمالاً، يجب أن تبدو دالة `mintNFT` الخاصة بنا هكذا:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling // معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata // إنشاء البيانات الوصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request // طلب تثبيت Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract // تحميل العقد الذكي
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract(); // loadContract();

  //set up your Ethereum transaction // إعداد معاملة إيثريوم الخاصة بك
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications. // مطلوب باستثناء أوقات نشر العقد.
    from: window.ethereum.selectedAddress, // must match user's active address. // يجب أن يتطابق مع عنوان المستخدم النشط.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract // إجراء استدعاء للعقد الذكي لـ NFT
  }

  //sign transaction via MetaMask // توقيع المعاملة عبر MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

هذه دالة عملاقة واحدة! الآن، نحتاج فقط إلى ربط دالة `mintNFT` الخاصة بنا بمكون `Minter.js` الخاص بنا...

## ربط mintNFT بالواجهة الأمامية Minter.js الخاصة بنا {#connect-our-frontend}

افتح ملف `Minter.js` الخاص بك وقم بتحديث سطر `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` في الأعلى ليكون:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

أخيرًا، قم بتنفيذ دالة `onMintPressed` لإجراء استدعاء await لدالة `mintNFT` المستوردة وتحديث متغير الحالة `status` ليعكس ما إذا كانت معاملتنا قد نجحت أو فشلت:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## نشر NFT الخاص بك على موقع ويب مباشر {#deploy-your-NFT}

هل أنت مستعد لجعل مشروعك مباشرًا ليتفاعل معه المستخدمون؟ تحقق من [هذا الدليل التعليمي](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) لنشر أداة السك (Minter) الخاصة بك على موقع ويب مباشر.

خطوة أخيرة...

## اكتساح عالم البلوك تشين {#take-the-blockchain-world-by-storm}

أمزح فقط، لقد وصلت إلى نهاية الدليل التعليمي!

للتلخيص، من خلال بناء أداة سك NFT، لقد تعلمت بنجاح كيفية:

- الاتصال بـ MetaMask عبر مشروع الواجهة الأمامية الخاص بك
- استدعاء دوال العقد الذكي من الواجهة الأمامية
- توقيع المعاملات باستخدام MetaMask

من المفترض أنك ترغب في أن تكون قادرًا على التباهي برموز NFT التي تم سكها عبر تطبيقك اللامركزي في محفظتك — لذا تأكد من الاطلاع على دليلنا التعليمي السريع [كيفية عرض NFT الخاص بك في محفظتك](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

وكما هو الحال دائمًا، إذا كان لديك أي أسئلة، فنحن هنا للمساعدة في [Alchemy Discord](https://discord.gg/gWuC7zB). لا يسعنا الانتظار لرؤية كيف تطبق المفاهيم من هذا الدليل التعليمي على مشاريعك المستقبلية!