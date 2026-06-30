---
title: "برنامج تعليمي لسك ⁦NFT⁩"
description: "في هذا البرنامج التعليمي، ستقوم ببناء أداة لسك الرموز غير القابلة للاستبدال (NFT) وتتعلم كيفية إنشاء تطبيق لامركزي (dapp) متكامل من خلال ربط عقدك الذكي بواجهة أمامية مبنية باستخدام React باستخدام ميتاماسك وأدوات Web3."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "عقود ذكية", "واجهة أمامية", "Pinata", "ERC-721"]
skill: intermediate
breadcrumb: "تطبيق لامركزي (dapp) لسك ⁦NFT⁩"
lang: ar
published: 2021-10-06
---

أحد أكبر التحديات التي تواجه المطورين القادمين من خلفية ويب 2 هو معرفة كيفية ربط عقدك الذكي بمشروع واجهة أمامية والتفاعل معه.

من خلال بناء أداة لسك ⁦NFT⁩ — وهي واجهة مستخدم بسيطة حيث يمكنك إدخال رابط إلى أصل رقمي خاص بك، وعنوان، ووصف — ستتعلم كيفية:

- الاتصال بمحفظة ميتاماسك عبر مشروع الواجهة الأمامية الخاص بك
- استدعاء وظائف العقد الذكي من واجهتك الأمامية
- توقيع المعاملات باستخدام ميتاماسك

في هذا البرنامج التعليمي، سنستخدم [React](https://react.dev/) كإطار عمل للواجهة الأمامية. نظرًا لأن هذا البرنامج التعليمي يركز بشكل أساسي على تطوير Web3، فلن نقضي الكثير من الوقت في تفصيل أساسيات React. بدلاً من ذلك، سنركز على إضافة الوظائف إلى مشروعنا.

كمتطلب أساسي، يجب أن يكون لديك فهم بمستوى المبتدئين لـ React—معرفة كيفية عمل المكونات (components)، والخصائص (props)، و<span dir="ltr">useState/useEffect</span>، واستدعاء الوظائف الأساسية. إذا لم تسمع بأي من هذه المصطلحات من قبل، فقد ترغب في الاطلاع على [البرنامج التعليمي لمقدمة React](https://react.dev/learn/tutorial-tic-tac-toe). بالنسبة للمتعلمين البصريين، نوصي بشدة بسلسلة مقاطع الفيديو الممتازة [البرنامج التعليمي الشامل لـ React الحديث](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) بواسطة Net Ninja.

وإذا لم تكن قد فعلت ذلك بالفعل، فستحتاج بالتأكيد إلى حساب Alchemy لإكمال هذا البرنامج التعليمي بالإضافة إلى بناء أي شيء على سلسلة الكتل. قم بالتسجيل للحصول على حساب مجاني [هنا](https://alchemy.com/).

بدون مزيد من التأخير، دعونا نبدأ!

## أساسيات صنع ⁦NFTs⁩ {#making-nfts-101}

قبل أن نبدأ حتى في النظر إلى أي كود، من المهم أن نفهم كيف تعمل عملية صنع ⁦NFT⁩. إنها تتضمن خطوتين:

### نشر عقد ذكي لـ ⁦NFT⁩ على سلسلة الكتل لإيثيريوم {#publish-nft}

أكبر اختلاف بين معياري العقود الذكية لـ ⁦NFT⁩ هو أن <span dir="ltr">ERC-1155</span> هو معيار متعدد الرموز ويتضمن وظيفة الدفعات، بينما <span dir="ltr">ERC-721</span> هو معيار لرمز مميز واحد وبالتالي يدعم فقط نقل رمز مميز واحد في كل مرة.

### استدعاء وظيفة السك

عادةً، تتطلب وظيفة السك هذه تمرير متغيرين كمعلمات، الأول هو `recipient`، والذي يحدد العنوان الذي سيتلقى ⁦NFT⁩ المسكوك حديثًا، والثاني هو `tokenURI` الخاص بـ ⁦NFT⁩، وهو سلسلة نصية تشير إلى مستند <span dir="ltr">JSON</span> يصف البيانات الوصفية لـ ⁦NFT⁩.

البيانات الوصفية لـ ⁦NFT⁩ هي ما يبعث الحياة فيه حقًا، مما يسمح له بامتلاك خصائص، مثل الاسم، والوصف، والصورة (أو أصل رقمي مختلف)، وسمات أخرى. إليك [مثال على <span dir="ltr">tokenURI</span>](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)، والذي يحتوي على البيانات الوصفية لـ ⁦NFT⁩.

في هذا البرنامج التعليمي، سنركز على الجزء 2، وهو استدعاء وظيفة سك لعقد ذكي لـ ⁦NFT⁩ باستخدام واجهة مستخدم React الخاصة بنا.

ستحتاج إلى عقد ذكي لـ ⁦NFT⁩ من نوع <span dir="ltr">ERC-721</span> منشور على شبكة اختبار مدعومة مثل Sepolia. إذا كنت ترغب في نشر واحد بنفسك، نوصي بدليل Alchemy حول [نشر عقد ذكي على Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet).

رائع، الآن بعد أن فهمنا كيف تعمل عملية صنع ⁦NFT⁩، دعونا نستنسخ ملفات البداية الخاصة بنا!
## استنساخ ملفات البداية {#clone-the-starter-files}

أولاً، انتقل إلى [مستودع GitHub الخاص ببرنامج nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) للحصول على ملفات البداية لهذا المشروع. قم باستنساخ هذا المستودع في بيئتك المحلية.

عندما تفتح مستودع `nft-minter-tutorial` المستنسخ هذا، ستلاحظ أنه يحتوي على مجلدين: `minter-starter-files` و `nft-minter`.

- يحتوي `minter-starter-files` على ملفات البداية (بشكل أساسي واجهة مستخدم React) لهذا المشروع. في هذا البرنامج التعليمي، **سنعمل في هذا الدليل**، حيث ستتعلم كيفية إحياء واجهة المستخدم هذه عن طريق ربطها بمحفظة إيثيريوم الخاصة بك وعقد ذكي لـ ⁦NFT⁩.
- يحتوي `nft-minter` على البرنامج التعليمي المكتمل بالكامل وهو موجود كـ **مرجع** لك **إذا واجهت أي صعوبة.**

بعد ذلك، افتح نسختك من `minter-starter-files` في محرر الأكواد الخاص بك، ثم انتقل إلى مجلد `src`.

جميع الأكواد التي سنكتبها ستكون داخل مجلد `src`. سنقوم بتعديل مكون `Minter.js` وكتابة ملفات JavaScript إضافية لمنح مشروعنا وظائف Web3.

## الخطوة 2: التحقق من ملفات البداية الخاصة بنا {#step-2-check-out-our-starter-files}

قبل أن نبدأ في كتابة الأكواد، من المهم التحقق مما تم توفيره لنا بالفعل في ملفات البداية.

### تشغيل مشروع React الخاص بك {#get-your-react-project-running}

دعونا نبدأ بتشغيل مشروع React في متصفحنا. جمال React هو أنه بمجرد تشغيل مشروعنا في متصفحنا، سيتم تحديث أي تغييرات نحفظها مباشرة في متصفحنا.

لتشغيل المشروع، انتقل إلى الدليل الجذر لمجلد `minter-starter-files`، ثم قم بتشغيل `npm install` في الطرفية (terminal) لتثبيت تبعيات المشروع:

```bash
cd minter-starter-files
npm install
```

بمجرد الانتهاء من التثبيت، قم بتشغيل `npm start` في الطرفية:

```bash
npm start
```

القيام بذلك يجب أن يفتح <span dir="ltr">http://localhost:3000/</span> في متصفحك، حيث سترى الواجهة الأمامية لمشروعنا. يجب أن تتكون من 3 حقول: مكان لإدخال رابط لأصل ⁦NFT⁩ الخاص بك، وإدخال اسم ⁦NFT⁩ الخاص بك، وتقديم وصف.

إذا حاولت النقر على زري "Connect Wallet" أو "Mint NFT"، ستلاحظ أنهما لا يعملان—وذلك لأننا لا نزال بحاجة إلى برمجة وظائفهما! :\)

### مكون Minter.js {#minter-js}

**ملاحظة:** تأكد من أنك في مجلد `minter-starter-files` وليس في مجلد `nft-minter`!

دعونا نعود إلى مجلد `src` في محررنا ونفتح ملف `Minter.js`. من المهم جدًا أن نفهم كل شيء في هذا الملف، لأنه مكون React الأساسي الذي سنعمل عليه.

في الجزء العلوي من هذا الملف، لدينا متغيرات الحالة التي سنقوم بتحديثها بعد أحداث معينة.

```javascript
//متغيرات الحالة
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

لم تسمع من قبل عن متغيرات حالة React أو خطافات الحالة (state hooks)؟ تحقق من [هذه](https://legacy.reactjs.org/docs/hooks-state.html) المستندات.

إليك ما يمثله كل من المتغيرات:

- `walletAddress` - سلسلة نصية تخزن عنوان محفظة المستخدم
- `status` - سلسلة نصية تحتوي على رسالة لعرضها في أسفل واجهة المستخدم
- `name` - سلسلة نصية تخزن اسم ⁦NFT⁩
- `description` - سلسلة نصية تخزن وصف ⁦NFT⁩
- `url` - سلسلة نصية تمثل رابطًا للأصل الرقمي لـ ⁦NFT⁩

بعد متغيرات الحالة، سترى ثلاث وظائف غير منفذة: `useEffect`، و `connectWalletPressed`، و `onMintPressed`. ستلاحظ أن جميع هذه الوظائف هي `async`، وذلك لأننا سنجري استدعاءات API غير متزامنة بداخلها! أسماؤها تعكس وظائفها:

```javascript
useEffect(async () => {
  //TODO: التنفيذ
}, [])

const connectWalletPressed = async () => {
  //TODO: التنفيذ
}

const onMintPressed = async () => {
  //TODO: التنفيذ
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - هذا خطاف React يتم استدعاؤه بعد تصيير (render) المكون الخاص بك. نظرًا لأنه يتم تمرير خاصية مصفوفة فارغة `[]` إليه (انظر السطر 3)، فسيتم استدعاؤه فقط في التصيير _الأول_ للمكون. هنا سنستدعي مستمع المحفظة الخاص بنا ووظيفة محفظة أخرى لتحديث واجهة المستخدم الخاصة بنا لتعكس ما إذا كانت المحفظة متصلة بالفعل.
- `connectWalletPressed` - سيتم استدعاء هذه الوظيفة لربط محفظة ميتاماسك الخاصة بالمستخدم بتطبيقنا اللامركزي (dapp).
- `onMintPressed` - سيتم استدعاء هذه الوظيفة لسك ⁦NFT⁩ الخاص بالمستخدم.

بالقرب من نهاية هذا الملف، لدينا واجهة المستخدم الخاصة بمكوننا. إذا قمت بفحص هذا الكود بعناية، ستلاحظ أننا نقوم بتحديث متغيرات الحالة `url`، و `name`، و `description` عندما يتغير الإدخال في حقول النص المقابلة لها.

سترى أيضًا أنه يتم استدعاء `connectWalletPressed` و `onMintPressed` عند النقر على الأزرار ذات المعرفات `mintButton` و `walletButton` على التوالي.

```javascript
//واجهة المستخدم للمكون الخاص بنا
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

**في هذا البرنامج التعليمي، سنقوم فقط بتعديل `Minter.js file` وإضافة ملفات في مجلد `src` الخاص بنا.**

الآن بعد أن فهمنا ما نعمل عليه، دعونا نعد محفظة إيثيريوم الخاصة بنا!

## إعداد محفظة إيثيريوم الخاصة بك {#set-up-your-ethereum-wallet}

لكي يتمكن المستخدمون من التفاعل مع عقدك الذكي، سيحتاجون إلى ربط محفظة إيثيريوم الخاصة بهم بتطبيقك اللامركزي (dapp).

### تنزيل ميتاماسك

في هذا البرنامج التعليمي، سنستخدم ميتاماسك، وهي محفظة افتراضية في المتصفح تُستخدم لإدارة عنوان حساب إيثيريوم الخاص بك. إذا كنت ترغب في فهم المزيد حول كيفية عمل المعاملات على إيثيريوم، فراجع [هذه الصفحة](/developers/docs/transactions/).

يمكنك تنزيل وإنشاء حساب ميتاماسك مجانًا [هنا](https://metamask.io/download). عند إنشاء حساب، أو إذا كان لديك حساب بالفعل، تأكد من التبديل إلى شبكة اختبار مدعومة مثل <span dir="ltr">Sepolia</span> \(حتى لا نتعامل بأموال حقيقية\).
### إضافة إيثر من صنبور

لكي نتمكن من سك ⁦NFTs⁩ الخاصة بنا (أو توقيع أي معاملات على سلسلة الكتل لإيثيريوم)، سنحتاج إلى بعض ETH الوهمي. للحصول على ETH لشبكة اختبار، استخدم صنبورًا تتم صيانته مثل [صنبور Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia) وأدخل عنوان حساب Sepolia الخاص بك. يجب أن ترى ETH في حساب ميتاماسك الخاص بك بعد فترة وجيزة!
### التحقق من رصيدك

للتحقق مرة أخرى من وجود رصيدنا، دعونا نجري طلب [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) باستخدام [أداة وضع الحماية الخاصة بـ Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). سيعيد هذا مقدار <span dir="ltr">ETH</span> في محفظتنا. بعد إدخال عنوان حساب ميتاماسك الخاص بك والنقر على "Send Request"، يجب أن ترى استجابة كهذه:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**ملاحظة:** هذه النتيجة بوحدة <span dir="ltr">Wei</span> وليس <span dir="ltr">ETH</span>. تُستخدم <span dir="ltr">Wei</span> كأصغر فئة من الإيثر. التحويل من <span dir="ltr">Wei</span> إلى <span dir="ltr">ETH</span> هو: <span dir="ltr">1 ETH = 10¹⁸ Wei</span>. لذا إذا قمنا بتحويل <span dir="ltr">0xde0b6b3a7640000</span> إلى النظام العشري، نحصل على <span dir="ltr">1\*10¹⁸</span> والذي يساوي <span dir="ltr">1 ETH</span>.

رائع! أموالنا الوهمية كلها موجودة! <Emoji text=":money_mouth_face:" size={1} />
## ربط ميتاماسك بواجهة المستخدم الخاصة بك {#connect-metamask-to-your-ui}

الآن بعد إعداد محفظة ميتاماسك الخاصة بنا، دعونا نربط تطبيقنا اللامركزي (dapp) بها!

لأننا نريد الالتزام بنموذج [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)، سنقوم بإنشاء ملف منفصل يحتوي على وظائفنا لإدارة المنطق، والبيانات، والقواعد الخاصة بتطبيقنا اللامركزي (dapp)، ثم تمرير تلك الوظائف إلى واجهتنا الأمامية (مكون Minter.js الخاص بنا).

### وظيفة `connectWallet` {#connect-wallet-function}

للقيام بذلك، دعونا ننشئ مجلدًا جديدًا يسمى `utils` في دليل `src` الخاص بك ونضيف ملفًا يسمى `interact.js` بداخله، والذي سيحتوي على جميع وظائف التفاعل مع المحفظة والعقد الذكي.

في ملف `interact.js` الخاص بنا، سنكتب وظيفة `connectWallet`، والتي سنقوم بعد ذلك باستيرادها واستدعائها في مكون `Minter.js` الخاص بنا.

في ملف `interact.js` الخاص بك، أضف ما يلي

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

أولاً، تتحقق وظيفتنا مما إذا كان `window.ethereum` ممكّنًا في متصفحك.

`window.ethereum` هو API عالمي يتم حقنه بواسطة ميتاماسك ومزودي المحافظ الآخرين والذي يسمح لمواقع الويب بطلب حسابات إيثيريوم الخاصة بالمستخدمين. إذا تمت الموافقة، يمكنه قراءة البيانات من سلاسل الكتل التي يتصل بها المستخدم، واقتراح أن يقوم المستخدم بتوقيع الرسائل والمعاملات. تحقق من [مستندات ميتاماسك](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) لمزيد من المعلومات!

إذا كان `window.ethereum` _غير_ موجود، فهذا يعني أن ميتاماسك غير مثبت. يؤدي هذا إلى إرجاع كائن JSON، حيث يكون `address` المُرجع عبارة عن سلسلة نصية فارغة، وينقل كائن JSX `status` أنه يجب على المستخدم تثبيت ميتاماسك.

**معظم الوظائف التي نكتبها ستعيد كائنات JSON يمكننا استخدامها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.**

الآن إذا كان `window.ethereum` _موجودًا_، فهنا تصبح الأمور مثيرة للاهتمام.

باستخدام حلقة try/catch، سنحاول الاتصال بميتاماسك عن طريق استدعاء [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). سيؤدي استدعاء هذه الوظيفة إلى فتح ميتاماسك في المتصفح، حيث سيُطلب من المستخدم ربط محفظته بتطبيقك اللامركزي (dapp).

- إذا اختار المستخدم الاتصال، سيعيد `method: "eth_requestAccounts"` مصفوفة تحتوي على جميع عناوين حسابات المستخدم المتصلة بالتطبيق اللامركزي (dapp). إجمالاً، ستعيد وظيفة `connectWallet` الخاصة بنا كائن JSON يحتوي على _أول_ `address` في هذه المصفوفة (انظر السطر 9) ورسالة `status` تطالب المستخدم بكتابة رسالة إلى العقد الذكي.
- إذا رفض المستخدم الاتصال، فسيحتوي كائن JSON على سلسلة نصية فارغة لـ `address` المُرجع ورسالة `status` تعكس أن المستخدم رفض الاتصال.

### إضافة وظيفة connectWallet إلى مكون واجهة المستخدم Minter.js الخاص بك {#add-connect-wallet}

الآن بعد أن كتبنا وظيفة `connectWallet` هذه، دعونا نربطها بمكون `Minter.js.` الخاص بنا.

أولاً، سيتعين علينا استيراد وظيفتنا إلى ملف `Minter.js` الخاص بنا عن طريق إضافة `import { connectWallet } from "./utils/interact.js";` إلى الجزء العلوي من ملف `Minter.js`. يجب أن تبدو الأسطر الـ 11 الأولى من `Minter.js` الآن هكذا:

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

ثم، داخل وظيفة `connectWalletPressed` الخاصة بنا، سنستدعي وظيفة `connectWallet` المستوردة، هكذا:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

هل تلاحظ كيف يتم تجريد معظم وظائفنا بعيدًا عن مكون `Minter.js` الخاص بنا من ملف `interact.js`؟ هذا لكي نتوافق مع نموذج M-V-C!

في `connectWalletPressed`، نقوم ببساطة بإجراء استدعاء await لوظيفة `connectWallet` المستوردة، وباستخدام استجابتها، نقوم بتحديث متغيرات `status` و `walletAddress` الخاصة بنا عبر خطافات الحالة الخاصة بها.

الآن، دعونا نحفظ كلا الملفين `Minter.js` و `interact.js` ونختبر واجهة المستخدم الخاصة بنا حتى الآن.

افتح متصفحك على <span dir="ltr">localhost:3000</span>، واضغط على زر "Connect Wallet" في أعلى يمين الصفحة.

إذا كان لديك ميتاماسك مثبتًا، فسيُطلب منك ربط محفظتك بتطبيقك اللامركزي (dapp). اقبل دعوة الاتصال.

يجب أن ترى أن زر المحفظة يعكس الآن أن عنوانك متصل.

بعد ذلك، حاول تحديث الصفحة... هذا غريب. يطالبنا زر المحفظة الخاص بنا بربط ميتاماسك، على الرغم من أنه متصل بالفعل...

لا تقلق مع ذلك! يمكننا إصلاح ذلك بسهولة عن طريق تنفيذ وظيفة تسمى `getCurrentWalletConnected`، والتي ستتحقق مما إذا كان هناك عنوان متصل بالفعل بتطبيقنا اللامركزي (dapp) وتحديث واجهة المستخدم الخاصة بنا وفقًا لذلك!

### وظيفة getCurrentWalletConnected {#get-current-wallet}

في ملف `interact.js` الخاص بك، أضف وظيفة `getCurrentWalletConnected` التالية:

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

هذا الكود مشابه _جدًا_ لوظيفة `connectWallet` التي كتبناها للتو في وقت سابق.

الفرق الرئيسي هو أنه بدلاً من استدعاء الطريقة `eth_requestAccounts`، والتي تفتح ميتاماسك للمستخدم لربط محفظته، نستدعي هنا الطريقة `eth_accounts`، والتي تعيد ببساطة مصفوفة تحتوي على عناوين ميتاماسك المتصلة حاليًا بتطبيقنا اللامركزي (dapp).

لرؤية هذه الوظيفة قيد العمل، دعونا نستدعيها في وظيفة `useEffect` لمكون `Minter.js` الخاص بنا.

كما فعلنا مع `connectWallet`، يجب علينا استيراد هذه الوظيفة من ملف `interact.js` الخاص بنا إلى ملف `Minter.js` الخاص بنا هكذا:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //الاستيراد هنا
} from "./utils/interact.js"
```

الآن، نقوم ببساطة باستدعائها في وظيفة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

لاحظ، نستخدم استجابة استدعائنا لـ `getCurrentWalletConnected` لتحديث متغيرات الحالة `walletAddress` و `status` الخاصة بنا.

بمجرد إضافة هذا الكود، حاول تحديث نافذة المتصفح الخاصة بنا. يجب أن يقول الزر أنك متصل، ويعرض معاينة لعنوان محفظتك المتصلة - حتى بعد التحديث!

### تنفيذ addWalletListener {#implement-add-wallet-listener}

الخطوة الأخيرة في إعداد محفظة التطبيق اللامركزي (dapp) الخاص بنا هي تنفيذ مستمع المحفظة بحيث يتم تحديث واجهة المستخدم الخاصة بنا عندما تتغير حالة محفظتنا، مثل عندما يقوم المستخدم بقطع الاتصال أو تبديل الحسابات.

في ملف `Minter.js` الخاص بك، أضف وظيفة `addWalletListener` تبدو كالتالي:

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

- أولاً، تتحقق وظيفتنا مما إذا كان `window.ethereum` ممكّنًا (أي أن ميتاماسك مثبت).
  - إذا لم يكن كذلك، نقوم ببساطة بتعيين متغير الحالة `status` الخاص بنا إلى سلسلة نصية JSX تطالب المستخدم بتثبيت ميتاماسك.
  - إذا كان ممكّنًا، نقوم بإعداد المستمع `window.ethereum.on("accountsChanged")` في السطر 3 والذي يستمع لتغييرات الحالة في محفظة ميتاماسك، والتي تشمل عندما يقوم المستخدم بربط حساب إضافي بالتطبيق اللامركزي (dapp)، أو تبديل الحسابات، أو قطع اتصال حساب. إذا كان هناك حساب واحد على الأقل متصل، يتم تحديث متغير الحالة `walletAddress` كأول حساب في مصفوفة `accounts` التي يعيدها المستمع. بخلاف ذلك، يتم تعيين `walletAddress` كسلسلة نصية فارغة.

أخيرًا، يجب علينا استدعاؤها في وظيفة `useEffect` الخاصة بنا:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

وها نحن ذا! لقد أكملنا برمجة جميع وظائف محفظتنا! الآن بعد إعداد محفظتنا، دعونا نكتشف كيفية سك ⁦NFT⁩ الخاص بنا!

## أساسيات البيانات الوصفية لـ ⁦NFT⁩ {#nft-metadata-101}

لذا تذكر البيانات الوصفية لـ ⁦NFT⁩ التي تحدثنا عنها للتو في الخطوة 0 من هذا البرنامج التعليمي—إنها تبعث الحياة في ⁦NFT⁩، مما يسمح له بامتلاك خصائص، مثل أصل رقمي، واسم، ووصف، وسمات أخرى.

سنحتاج إلى تكوين هذه البيانات الوصفية ككائن JSON وتخزينها، حتى نتمكن من تمريرها كمعلمة `tokenURI` عند استدعاء وظيفة `mintNFT` الخاصة بعقدنا الذكي.

سيشكل النص الموجود في حقول "Link to Asset"، و "Name"، و "Description" الخصائص المختلفة للبيانات الوصفية لـ ⁦NFT⁩ الخاص بنا. سنقوم بتنسيق هذه البيانات الوصفية ككائن JSON، ولكن هناك خياران لمكان تخزين كائن JSON هذا:

- يمكننا تخزينه على سلسلة الكتل لإيثيريوم؛ ومع ذلك، فإن القيام بذلك سيكون مكلفًا للغاية.
- يمكننا تخزينه على خادم مركزي، مثل AWS أو Firebase. لكن ذلك سيتعارض مع روح اللامركزية لدينا.
- يمكننا استخدام IPFS، وهو بروتوكول لامركزي وشبكة نظير إلى نظير لتخزين ومشاركة البيانات في نظام ملفات موزع. نظرًا لأن هذا البروتوكول لامركزي ومجاني، فهو خيارنا الأفضل!

لتخزين بياناتنا الوصفية على IPFS، سنستخدم [Pinata](https://pinata.cloud/)، وهي مجموعة أدوات و API مريحة لـ IPFS. في الخطوة التالية، سنشرح بالضبط كيفية القيام بذلك!

## استخدام Pinata لتثبيت بياناتك الوصفية على IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

إذا لم يكن لديك حساب [Pinata](https://pinata.cloud/)، قم بالتسجيل للحصول على حساب مجاني [هنا](https://app.pinata.cloud/auth/signup) وأكمل الخطوات للتحقق من بريدك الإلكتروني وحسابك.

### إنشاء مفتاح API الخاص بـ Pinata {#create-pinata-api-key}

انتقل إلى صفحة [https://pinata.cloud/keys](https://pinata.cloud/keys)، ثم حدد زر "New Key" في الأعلى، وقم بتعيين أداة المسؤول (Admin widget) كممكّنة، وقم بتسمية مفتاحك.

ستظهر لك بعد ذلك نافذة منبثقة تحتوي على معلومات API الخاصة بك. تأكد من وضع هذا في مكان آمن.

الآن بعد إعداد مفتاحنا، دعونا نضيفه إلى مشروعنا حتى نتمكن من استخدامه.

### إنشاء ملف .env {#create-a-env}

يمكننا تخزين مفتاح Pinata والسر الخاص بنا بأمان في ملف بيئة. دعونا نثبت [حزمة dotenv](https://www.npmjs.com/package/dotenv) في دليل مشروعك.

افتح علامة تبويب جديدة في الطرفية الخاصة بك (منفصلة عن تلك التي تشغل المضيف المحلي) وتأكد من أنك في مجلد `minter-starter-files`، ثم قم بتشغيل الأمر التالي في الطرفية الخاصة بك:

```text
npm install dotenv --save
```

بعد ذلك، قم بإنشاء ملف `.env` في الدليل الجذر لـ `minter-starter-files` الخاص بك عن طريق إدخال ما يلي في سطر الأوامر الخاص بك:

```javascript
vim.env
```

سيؤدي هذا إلى فتح ملف `.env` الخاص بك في vim (محرر نصوص). لحفظه، اضغط على "esc" + ":" + "q" على لوحة المفاتيح بهذا الترتيب.

بعد ذلك، في VSCode، انتقل إلى ملف `.env` الخاص بك وأضف مفتاح API الخاص بـ Pinata وسر API إليه، هكذا:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

احفظ الملف، وبعد ذلك ستكون جاهزًا للبدء في كتابة الوظيفة لتحميل بيانات JSON الوصفية الخاصة بك إلى IPFS!

### تنفيذ pinJSONToIPFS {#pin-json-to-ipfs}

لحسن الحظ بالنسبة لنا، لدى Pinata [API مخصص لتحميل بيانات JSON إلى IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ومثال JavaScript مريح مع axios يمكننا استخدامه، مع بعض التعديلات الطفيفة.

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
  //إجراء طلب POST عبر axios إلى Pinata ⬇️
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

أولاً، يستورد [axios](https://www.npmjs.com/package/axios)، وهو عميل HTTP قائم على الوعود (promise based) للمتصفح و Node.js، والذي سنستخدمه لتقديم طلب إلى Pinata.

ثم لدينا وظيفتنا غير المتزامنة `pinJSONToIPFS`، والتي تأخذ `JSONBody` كمدخل لها ومفتاح وسر API الخاص بـ Pinata في ترويستها (header)، كل ذلك لتقديم طلب POST إلى API `pinJSONToIPFS` الخاص بهم.

- إذا كان طلب POST هذا ناجحًا، فإن وظيفتنا تعيد كائن JSON مع القيمة المنطقية `success` كـ true و `pinataUrl` حيث تم تثبيت بياناتنا الوصفية. سنستخدم `pinataUrl` المُرجع هذا كمدخل `tokenURI` لوظيفة السك الخاصة بعقدنا الذكي.
- إذا فشل طلب POST هذا، فإن وظيفتنا تعيد كائن JSON مع القيمة المنطقية `success` كـ false وسلسلة نصية `message` تنقل خطأنا.

كما هو الحال مع أنواع إرجاع وظيفة `connectWallet` الخاصة بنا، نحن نعيد كائنات JSON حتى نتمكن من استخدام معلماتها لتحديث متغيرات الحالة وواجهة المستخدم الخاصة بنا.

## تحميل عقدك الذكي {#load-your-smart-contract}

الآن بعد أن أصبح لدينا طريقة لتحميل البيانات الوصفية لـ ⁦NFT⁩ الخاص بنا إلى IPFS عبر وظيفة `pinJSONToIPFS` الخاصة بنا، سنحتاج إلى طريقة لتحميل مثيل لعقدنا الذكي حتى نتمكن من استدعاء وظيفة `mintNFT` الخاصة به.

كما ذكرنا سابقًا، في هذا البرنامج التعليمي سنستخدم [هذا العقد الذكي الحالي لـ ⁦NFT⁩](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)؛ ومع ذلك، إذا كنت ترغب في معرفة كيف صنعناه، أو صنع واحد بنفسك، نوصي بشدة بالاطلاع على برنامجنا التعليمي الآخر، ["كيفية إنشاء ⁦NFT⁩."](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI الخاص بالعقد {#contract-abi}

إذا فحصت ملفاتنا عن كثب، ستلاحظ أنه في دليل `src` الخاص بنا، يوجد ملف `contract-abi.json`. يعد ABI ضروريًا لتحديد الوظيفة التي سيستدعيها العقد بالإضافة إلى ضمان أن الوظيفة ستعيد البيانات بالتنسيق الذي تتوقعه.

سنحتاج أيضًا إلى مفتاح API الخاص بـ Alchemy و API الخاص بـ Alchemy Web3 للاتصال بسلسلة الكتل لإيثيريوم وتحميل عقدنا الذكي.

### إنشاء مفتاح API الخاص بـ Alchemy

إذا لم يكن لديك حساب Alchemy بالفعل، [قم بالتسجيل مجانًا هنا.](https://alchemy.com/?a=eth-org-nft-minter)

بمجرد إنشاء حساب Alchemy، يمكنك إنشاء مفتاح API عن طريق إنشاء تطبيق. سيسمح لنا هذا بإجراء طلبات إلى شبكة اختبار Sepolia.

انتقل إلى صفحة "Create App" في لوحة تحكم Alchemy الخاصة بك عن طريق التمرير فوق "Apps" في شريط التنقل والنقر على "Create App".

قم بتسمية تطبيقك (اخترنا "My First NFT!")، وقدم وصفًا قصيرًا، وحدد "Staging" للبيئة المستخدمة في مسك دفاتر تطبيقك، واختر "Sepolia" لشبكتك.

انقر على "Create app" وهذا كل شيء! يجب أن يظهر تطبيقك في الجدول أدناه.

رائع، الآن بعد أن أنشأنا رابط HTTP لـ API الخاص بـ Alchemy، انسخه إلى الحافظة الخاصة بك...

...ثم دعونا نضيفه إلى ملف `.env` الخاص بنا. إجمالاً، يجب أن يبدو ملف `.env` الخاص بك هكذا:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

الآن بعد أن أصبح لدينا ABI الخاص بالعقد ومفتاح API الخاص بـ Alchemy، نحن جاهزون لتحميل عقدنا الذكي باستخدام [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
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

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) هو غلاف حول [Web3.js](https://docs.web3js.org/)، يوفر طرق API محسنة وفوائد حاسمة أخرى لجعل حياتك كمطور Web3 أسهل. تم تصميمه ليتطلب الحد الأدنى من التكوين حتى تتمكن من البدء في استخدامه في تطبيقك على الفور!

بعد ذلك، دعونا نضيف ABI الخاص بالعقد وعنوان العقد إلى ملفنا.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

بمجرد أن يكون لدينا كلاهما، نحن جاهزون للبدء في كتابة كود وظيفة السك الخاصة بنا!

## تنفيذ وظيفة mintNFT {#implement-the-mintnft-function}

داخل ملف `interact.js` الخاص بك، دعونا نحدد وظيفتنا، `mintNFT`، والتي ستقوم بسك ⁦NFT⁩ الخاص بنا كما يوحي اسمها.

لأننا سنجري العديد من الاستدعاءات غير المتزامنة (إلى Pinata لتثبيت بياناتنا الوصفية على IPFS، و Alchemy Web3 لتحميل عقدنا الذكي، وميتاماسك لتوقيع معاملاتنا)، ستكون وظيفتنا أيضًا غير متزامنة.

المدخلات الثلاثة لوظيفتنا ستكون `url` للأصل الرقمي الخاص بنا، و `name`، و `description`. أضف توقيع الوظيفة التالي أسفل وظيفة `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### معالجة أخطاء الإدخال {#input-error-handling}

بطبيعة الحال، من المنطقي أن يكون هناك نوع من معالجة أخطاء الإدخال في بداية الوظيفة، لذلك نخرج من هذه الوظيفة إذا لم تكن معلمات الإدخال الخاصة بنا صحيحة. داخل وظيفتنا، دعونا نضيف الكود التالي:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

بشكل أساسي، إذا كان أي من معلمات الإدخال عبارة عن سلسلة نصية فارغة، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` كـ false، وتنقل السلسلة النصية `status` أنه يجب إكمال جميع الحقول في واجهة المستخدم الخاصة بنا.

### تحميل البيانات الوصفية إلى IPFS {#upload-metadata-to-ipfs}

بمجرد أن نعرف أن بياناتنا الوصفية منسقة بشكل صحيح، فإن الخطوة التالية هي تغليفها في كائن JSON وتحميلها إلى IPFS عبر `pinJSONToIPFS` التي كتبناها!

للقيام بذلك، نحتاج أولاً إلى استيراد وظيفة `pinJSONToIPFS` إلى ملف `interact.js` الخاص بنا. في الجزء العلوي من `interact.js`، دعونا نضيف:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

تذكر أن `pinJSONToIPFS` تأخذ جسم JSON. لذا قبل أن نجري استدعاءً لها، سنحتاج إلى تنسيق معلمات `url`، و `name`، و `description` الخاصة بنا في كائن JSON.

دعونا نحدث الكود الخاص بنا لإنشاء كائن JSON يسمى `metadata` ثم نجري استدعاءً لـ `pinJSONToIPFS` باستخدام معلمة `metadata` هذه:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //إنشاء بيانات وصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //إجراء استدعاء Pinata
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

لاحظ، نقوم بتخزين استجابة استدعائنا لـ `pinJSONToIPFS(metadata)` في كائن `pinataResponse`. ثم، نقوم بتحليل هذا الكائن بحثًا عن أي أخطاء.

إذا كان هناك خطأ، فإننا نعيد كائن JSON حيث تكون القيمة المنطقية `success` كـ false وتنقل السلسلة النصية `status` الخاصة بنا أن استدعاءنا فشل. بخلاف ذلك، نستخرج `pinataURL` من `pinataResponse` ونخزنه كمتغير `tokenURI` الخاص بنا.

الآن حان الوقت لتحميل عقدنا الذكي باستخدام API الخاص بـ Alchemy Web3 الذي قمنا بتهيئته في الجزء العلوي من ملفنا. أضف سطر الكود التالي إلى أسفل وظيفة `mintNFT` لتعيين العقد في المتغير العام `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

آخر شيء يجب إضافته في وظيفة `mintNFT` الخاصة بنا هو معاملة إيثيريوم الخاصة بنا:

```javascript
//إعداد معاملة إيثيريوم الخاصة بك
const transactionParameters = {
  to: contractAddress, // مطلوب باستثناء أثناء نشر العقد.
  from: window.ethereum.selectedAddress, // يجب أن يتطابق مع عنوان المستخدم النشط.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //إجراء استدعاء إلى عقد ذكي لـ NFT
}

//توقيع المعاملة عبر ميتاماسك
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

إذا كنت معتادًا بالفعل على معاملات إيثيريوم، ستلاحظ أن الهيكل مشابه جدًا لما رأيته.

- أولاً، نقوم بإعداد معلمات معاملاتنا.
  - يحدد `to` عنوان المستلم (عقدنا الذكي)
  - يحدد `from` موقع المعاملة (عنوان المستخدم المتصل بميتاماسك: `window.ethereum.selectedAddress`)
  - يحتوي `data` على استدعاء لطريقة `mintNFT` الخاصة بعقدنا الذكي، والتي تتلقى `tokenURI` الخاص بنا وعنوان محفظة المستخدم، `window.ethereum.selectedAddress`، كمدخلات
- ثم، نجري استدعاء await، `window.ethereum.request,` حيث نطلب من ميتاماسك توقيع المعاملة. لاحظ، في هذا الطلب، نحدد طريقة eth الخاصة بنا (eth_SentTransaction) ونمرر `transactionParameters` الخاص بنا. في هذه المرحلة، سيتم فتح ميتاماسك في المتصفح، ويطالب المستخدم بتوقيع المعاملة أو رفضها.
  - إذا كانت المعاملة ناجحة، ستعيد الوظيفة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى true وتطالب السلسلة النصية `status` المستخدم بالتحقق من Etherscan لمزيد من المعلومات حول معاملته.
  - إذا فشلت المعاملة، ستعيد الوظيفة كائن JSON حيث يتم تعيين القيمة المنطقية `success` إلى false، وتنقل السلسلة النصية `status` رسالة الخطأ.

إجمالاً، يجب أن تبدو وظيفة `mintNFT` الخاصة بنا هكذا:

```javascript
export const mintNFT = async (url, name, description) => {
  //معالجة الأخطاء
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //إنشاء بيانات وصفية
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //طلب تثبيت Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //تحميل عقد ذكي
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //إعداد معاملة إيثيريوم الخاصة بك
  const transactionParameters = {
    to: contractAddress, // مطلوب باستثناء أثناء نشر العقد.
    from: window.ethereum.selectedAddress, // يجب أن يتطابق مع عنوان المستخدم النشط.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //إجراء استدعاء إلى عقد ذكي لـ NFT
  }

  //توقيع المعاملة عبر ميتاماسك
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

هذه وظيفة عملاقة! الآن، نحتاج فقط إلى ربط وظيفة `mintNFT` الخاصة بنا بمكون `Minter.js` الخاص بنا...

## ربط mintNFT بواجهتنا الأمامية Minter.js {#connect-our-frontend}

افتح ملف `Minter.js` الخاص بك وقم بتحديث سطر `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` في الأعلى ليكون:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

أخيرًا، قم بتنفيذ وظيفة `onMintPressed` لإجراء استدعاء await لوظيفة `mintNFT` المستوردة الخاصة بك وتحديث متغير الحالة `status` ليعكس ما إذا كانت معاملتنا قد نجحت أو فشلت:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## نشر ⁦NFT⁩ الخاص بك على موقع ويب مباشر

هل أنت مستعد لإطلاق مشروعك مباشرة ليتفاعل معه المستخدمون؟ اطلع على [وثائق نشر React](https://create-react-app.dev/docs/deployment/) لنشر أداة السك الخاصة بك على موقع ويب مباشر.

خطوة أخيرة...
## اكتساح عالم سلسلة الكتل {#take-the-blockchain-world-by-storm}

أمزح فقط، لقد وصلت إلى نهاية البرنامج التعليمي!

للتلخيص، من خلال بناء أداة لسك ⁦NFT⁩، لقد تعلمت بنجاح كيفية:

- الاتصال بمحفظة ميتاماسك عبر مشروع الواجهة الأمامية الخاص بك
- استدعاء وظائف العقد الذكي من واجهتك الأمامية
- توقيع المعاملات باستخدام ميتاماسك

من المفترض أنك ترغب في أن تكون قادرًا على التباهي بـ ⁦NFTs⁩ المسكوكة عبر تطبيقك اللامركزي (dapp) في محفظتك — لذا تأكد من الاطلاع على برنامجنا التعليمي السريع [كيفية عرض ⁦NFT⁩ الخاص بك في محفظتك](/developers/tutorials/how-to-view-nft-in-metamask/)!

وكما هو الحال دائمًا، إذا كان لديك أي أسئلة، فنحن هنا للمساعدة في [ديسكورد Alchemy](https://discord.gg/gWuC7zB). لا يسعنا الانتظار لرؤية كيف ستطبق المفاهيم من هذا البرنامج التعليمي على مشاريعك المستقبلية!
