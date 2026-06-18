---
title: "السماح لمستخدميك بدون غاز بالاحتفاظ بالرموز المميزة واستدعاء العقود"
description: "باستخدام تجريد الحساب، يمكننا إنشاء محافظ عقود ذكية تقبل المعاملات المرسلة بواسطة حساب مملوك خارجيًا (⁦EOA⁩) محدد أو الموقعة بواسطته. يمكن لهذه العقود الذكية بعد ذلك امتلاك رموز مميزة، والتي تكون تحت سيطرة الحساب المملوك خارجيًا."
author: أوري بوميرانتس
tags: ["بدون غاز", "⁦ERC-20⁩", "تجريد الحساب"]
skill: intermediate
breadcrumb: "رمز مميز بدون غاز"
lang: ar
published: 2026-04-01
---

## مقدمة {#introduction}

ناقش [مقال سابق](/developers/tutorials/gasless/) استخدام الوصول بدون غاز إلى تطبيقك الخاص باستخدام توقيعات <span dir="ltr">EIP-712</span>، ولكنه يقتصر على عقودك الذكية الخاصة. باستخدام [تجريد الحساب](/roadmap/account-abstraction/)، يمكننا إنشاء محافظ عقود ذكية تقبل نوعين من المعاملات وترحيلها إلى الوجهة المطلوبة:

- المعاملات المرسلة بواسطة حساب مملوك خارجيًا (<span dir="ltr">EOA</span>) محدد (والتي تتطلب أن يمتلك هذا الحساب <span dir="ltr">ETH</span>)
- المعاملات المرسلة من أي مكان، ولكنها موقعة بواسطة نفس الحساب المملوك خارجيًا (<span dir="ltr">EOA</span>).

بهذه الطريقة، يمكننا توفير طريقة بدون غاز لحساب ما للاحتفاظ بالأصول (الرموز المميزة، وما إلى ذلك) وأداء جميع الوظائف التي يمكن لحساب مملوك خارجيًا (<span dir="ltr">EOA</span>) يمتلك غازًا القيام بها.

### لماذا لا يمكننا ببساطة ترحيل الطلب؟ {#why-no-tx-origin}

في معايير <span dir="ltr">ERC-20</span> والمعايير ذات الصلة، مالك الحساب هو [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)، وهو العنوان الذي استدعى عقد الرمز المميز، والذي ليس بالضرورة منشئ المعاملة، [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). هذا مطلوب [لأسباب أمنية](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). هذا يعني أنه إذا قمنا بترحيل طلبات تحويل الرموز المميزة، فستحاول تحويل الرموز المميزة من عنوان المُرحّل بدلاً من عنوان يتحكم فيه المستخدم.

هناك حل يتيح لك استخدام عنوان الحساب المملوك خارجيًا (<span dir="ltr">EOA</span>) عبر [<span dir="ltr">EIP-7702</span>](https://eip7702.io/)، ولكنه يتطلب توقيع تفويض قد يكون خطيرًا، لذلك لا يمكنك استخدامه إلا للتفويض إلى عقد ذكي يوافق عليه مزود المحفظة. في هذا البرنامج التعليمي، أفضل الطريقة الأبسط بكثير المتمثلة في إنشاء عقد ذكي كوكيل للمستخدم.

## رؤية ذلك عمليًا {#in-action}

1. تأكد من أن لديك كل من [Node](https://nodejs.org/en/download) و [Foundry](https://www.getfoundry.sh/introduction/installation).

2. استنسخ التطبيق وقم بتثبيت البرامج اللازمة.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. قم بتحرير `.env` لتعيين `SEPOLIA_PRIVATE_KEY` إلى محفظة تحتوي على <span dir="ltr">ETH</span> على شبكة Sepolia. إذا كنت بحاجة إلى <span dir="ltr">ETH</span> على Sepolia، [استخدم صنبورًا](/developers/docs/networks/#sepolia) للحصول عليه. من الناحية المثالية، يجب أن يكون هذا المفتاح الخاص مختلفًا عن المفتاح الموجود في محفظة متصفحك.

4. ابدأ تشغيل الخادم.

   ```sh
   npm run dev
   ```

5. تصفح التطبيق على الرابط [`http://localhost:5173`](http://localhost:5173).

6. انقر على **Connect with Injected** للاتصال بمحفظة. وافق في المحفظة، ووافق على التغيير إلى شبكة Sepolia إذا لزم الأمر.

7. قم بالتمرير لأسفل وانقر على **Deploy UserProxy (slow process)**.

8. يمكنك معرفة متى يتم نشر وكيل المستخدم لوجود عنوان بجوار **UserProxy access**. إذا انتظرت <span dir="ltr">24</span> ثانية (كتلتين) ولم يحدث ذلك بعد، فقد تكون هناك مشكلة في اكتشاف التغييرات.

   إذا كان الأمر كذلك، فانتقل إلى [مستكشف الكتل لشبكة Sepolia](https://eth-sepolia.blockscout.com/) وأدخل تجزئة المعاملة الخاصة بالنشر التي تراها في مخرجات الخادم عند `npm run dev`. انقر على العقد الذي تم إنشاؤه لعرض عنوانه، ثم انسخه. الصق العنوان في حقل _Or enter existing proxy address_، ثم انقر على **Set proxy address**.

9. انقر على **Request more tokens for proxy** لإرسال استدعاء إلى دالة [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) الخاصة بعقد <span dir="ltr">ERC-20</span> للحصول على الرموز المميزة. **أكد** التوقيع في المحفظة. بالطبع، تصل الرموز المميزة إلى عنوان الوكيل، وليس عنوان المستخدم.

10. قم بالتمرير لأسفل وانقر على الرابط الموجود أسفل _Last transaction:_. سيؤدي هذا إلى فتح المتصفح ليعرض لك معاملة `faucet`.

11. في حقل _amount to transfer_، أدخل رقمًا بين واحد وألف. انقر على **Transfer** لتحويل الرموز المميزة إلى عنوانك الخاص. قبل النقر على **تأكيد** للطلب، لاحظ أن البيانات التي يتم توقيعها مبهمة. سيواجه المستخدمون صعوبة في فهم ما يوقعون عليه. تذكر أننا سنناقش ذلك [أدناه](#vulnerabilities).

12. بعد تأكيد المعاملة، انتظر لرؤية التغيير في كل من _your balance_ و _proxy balance_. لاحظ أن هذا سيستغرق أيضًا بعض الوقت، لأن شبكة Sepolia لديها وقت الكتلة يبلغ <span dir="ltr">12</span> ثانية.

## كيف يعمل {#how-work}

للحصول على تجربة بدون غاز، نحتاج إلى واجهة مستخدم للمستخدم، وخادم لتوجيه الرسائل من واجهة المستخدم إلى السلسلة، وعقد ذكي لاستلامها والتحقق منها.

### العقد الذكي للمحفظة {#wallet-smart-contract}

هذا هو [العقد الذكي](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). الغرض منه هو القيام بكل ما يطلبه المالك الحقيقي، بغض النظر عن القناة المستخدمة لطلبه، وتجاهل كل شيء آخر. للقيام بذلك، تتلقى دواله عنوانًا مستهدفًا لاستدعائه والبيانات التي سيتم استخدامها لاستدعائه.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

هوية المالك و[رقم فريد](https://en.wikipedia.org/wiki/Cryptographic_nonce) لمنع تكرار الرسائل. نظرًا لأن الرقم الفريد هو متغير `public`، فإن مترجم Solidity ينشئ أيضًا دالة عرض، [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0)، والتي تسمح للتعليمات البرمجية خارج السلسلة بقراءة قيمته.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

المعلومات المطلوبة للتحقق من توقيعات [<span dir="ltr">EIP-712</span>](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

يرتبط `UserProxy` بعنوان مالك واحد. هذا ضروري لأنه يمكن أن يمتلك أصولًا (رموز <span dir="ltr">ERC-20</span> المميزة، الرموز غير القابلة للاستبدال، وما إلى ذلك). لا نريد خلط الأصول التي تنتمي إلى مالكين مختلفين.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[فاصل النطاق](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). لا يمكن حسابه في وقت الترجمة، لأنه يعتمد على معرف السلسلة وعنوان العقد. هذا يجعل من المستحيل خداع UserProxy برسالة مُعدة لآخر.

```solidity
    event CallResult(address target, bytes returnData);
```

سجل نتائج الاستدعاء.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

يمكن استدعاء هذه الدالة مباشرة من قبل المالك. إذا لم تكن هناك مُرحّلات متاحة، فلا يزال بإمكان المالك الوصول إلى الأصول مباشرة على سلسلة الكتل (إذا كان المستخدم يمتلك <span dir="ltr">ETH</span>).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

إذا تم استدعاؤنا _مباشرة_ من قبل المالك، فاستدعِ الهدف باستخدام بيانات الاستدعاء المقدمة.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

هذه هي الدالة الرئيسية لـ `UserProxy`. إنها تحصل على `target` و `data`، بالإضافة إلى توقيع.

```solidity
    external returns (bytes memory) {
        // حساب ملخص EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

يتضمن الملخص أيضًا الرقم الفريد، لكننا لا نحتاج إلى استلامه من المعاملة؛ نحن نعرف بالفعل القيمة الصحيحة. سيتم رفض التوقيع الذي يحتوي على رقم فريد خاطئ.

```solidity

    // استرداد المُوقِّع
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

إذا كان التوقيع غير صالح، فعادةً ما تُرجع `ecrecover` عنوانًا مختلفًا، ولن يتم قبوله.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

استدعِ العقد الذي أخبرنا المستخدم باستدعائه، وتراجع إذا لم ينجح الأمر.

```solidity
    emit CallResult(target, returnData);

    nonce++; // زيادة الرقم الفريد لمنع إعادة الإرسال

    return returnData;
}
```

إذا نجح الأمر، فأصدر حدث سجل وقم بزيادة الرقم الفريد.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

هذه متغيرات متطابقة تقريبًا تتيح لك أيضًا تحويل <span dir="ltr">ETH</span> خارج العقد.

### المُرحّل {#relayer}

المُرحّل هو [مكون خادم](/developers/tutorials/server-components/). إنه مكتوب بلغة JavaScript؛ يمكنك رؤية الكود المصدري [هنا](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

المكتبات التي نحتاجها. هذا خادم [Express](https://expressjs.com/)، والذي يستخدم [Vite](https://vite.dev/) لتقديم كود واجهة المستخدم. نستخدم [Viem](https://viem.sh/) للتواصل مع سلسلة الكتل، و [dotenv](https://www.dotenv.org/) لقراءة المفتاح الخاص للعنوان الذي يرسل المعاملة.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

هذه طريقة بسيطة لقراءة `UserProxy` المترجم. نحتاج إلى واجهة التطبيق الثنائية (ABI) لنتمكن من استدعاء `UserProxy`، والكود المترجم لنتمكن من نشره للمستخدم.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

اقرأ ملف `.env`، واستخرج العنوان، واطبعه على وحدة التحكم.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

عملاء Viem الذين يتحدثون إلى سلسلة الكتل.

```js
const start = async () => {
  const app = express()
```

قم بتشغيل خادم Express.

```js
  app.use(express.json())
```

أخبر Express بقراءة نص الطلب، وإذا كان بتنسيق JSON فقم بتحليله.

```js
  app.post("/server/deploy", async (req, res) => {
```

هذا هو الكود الذي يعالج طلبات نشر الوكيل. لاحظ أننا عرضة لهجمات [حجب الخدمة](https://en.wikipedia.org/wiki/Denial-of-service_attack) هنا لأن المهاجم يمكنه إغراقنا بطلبات لنشر الوكيل حتى يتم استنفاد <span dir="ltr">ETH</span> الخاص بنا. في نظام الإنتاج، من المحتمل أن نطلب أن يكون طلب نشر الوكيل موقعًا وأن يكون الموقع عميلاً حاليًا.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

احصل على عنوان المالك من الطلب.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[انشر العقد](https://viem.sh/docs/contract/deployContract#deploycontract) و[انتظر حتى يتم نشره](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

إذا كان كل شيء على ما يرام، فأرجع عنوان الوكيل إلى واجهة المستخدم.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

إذا كانت هناك مشكلة، فأبلغ عنها.

```js
  app.post("/server/message", async (req, res) => {
```

هذا هو الكود الذي يعالج رسائل المستخدم لعقد `UserProxy`. هذه نقطة أخرى عرضة لهجوم حجب الخدمة.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

احصل على بيانات الطلب واستخدمها لاستدعاء `signedAccess` على الوكيل.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

أبلغ عن تجزئة المعاملة. يتيح هذا لواجهة المستخدم عرض عنوان URL للمستخدم للتحقق من المعاملة.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

مرة أخرى، إذا كانت هناك مشكلة، فأبلغ عنها.

```js
  // دع Vite يتولى كل شيء آخر
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

لكل شيء آخر، استخدم Vite، الذي يتولى تقديم واجهة المستخدم لنا.

### واجهة المستخدم {#user-interface}

[هذا هو كود واجهة المستخدم](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). معظم الكود متطابق تقريبًا مع ذلك الموثق في [هذا المقال](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through)، باستثناء [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

أجزاء من [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) مشابهة لـ [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) في [هذا المقال](/developers/tutorials/gasless/#ui-changes). إليك الأجزاء الجديدة.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[هذه الدالة](https://viem.sh/docs/contract/encodeFunctionData) تنشئ بيانات الاستدعاء لاستدعاء دالة آلة إيثيريوم الافتراضية (EVM). هذا ضروري حتى يتمكن المستخدم من توقيع بيانات الاستدعاء.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`، الموضح أعلاه.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[هذا العقد](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) هو في الغالب عقد <span dir="ltr">ERC-20</span> عادي، مع إضافة دالة واحدة مهمة، `faucet()`. تمنح هذه الدالة الرموز المميزة لأي شخص يطلبها لأغراض الاختبار.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

عنوان `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

يُخرج هذا المكون عنوانًا مع رابط للعقد على مستكشف الكتل.

```js
const Token = () => {
    ...
```

هذا هو المكون الرئيسي الذي يقوم بمعظم العمل.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

رصيد الرموز المميزة لعنوان المستخدم.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

عنوان الوكيل المملوك للمستخدم.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

رصيد الرموز المميزة للوكيل.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

يُستخدم هذا الحقل عندما يقوم المستخدم بتعيين عنوان الوكيل يدويًا. يتيح امتلاك القدرة على تعيين عنوان الوكيل يدويًا للمستخدم استخدام وكيل موجود بدلاً من نشر وكيل جديد في كل مرة (وفقدان جميع الرموز المميزة المملوكة للوكيل القديم).

```js
  const [ txHash, setTxHash ] = useState(null)
```

تجزئة المعاملة الأخيرة، تُستخدم لإظهار رابط للمستكشف حتى يتمكن المستخدم من التحقق من تلك المعاملة.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

تُستخدم جميع هذه الحقول لإرسال أوامر تحويل الرموز المميزة إلى عقد <span dir="ltr">ERC-20</span>. قد يكون هذا `FaucetToken`، لكن ليس بالضرورة أن يكون كذلك. دالة [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) هي جزء من معيار <span dir="ltr">ERC-20</span>.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

اقرأ رصيدي الرموز المميزة اللذين نهتم بهما، مقدار ما يمتلكه المستخدم، ومقدار ما يمتلكه الوكيل.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

لمنع هجمات إعادة التشغيل (على سبيل المثال، بائع يعيد تشغيل معاملة تمنحه المال)، نستخدم [رقمًا فريدًا](https://en.wikipedia.org/wiki/Cryptographic_nonce). نحتاج إلى معرفة القيمة الحالية لإضافتها إلى البيانات التي نوقعها.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

استخدم [`useEffect`](https://react.dev/reference/react/useEffect) لتحديث الرصيد المعروض للمستخدم عندما تتغير المعلومات المقروءة من سلسلة الكتل.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

الافتراضي هو تحويل رموز `FaucetToken` المميزة إلى حساب المستخدم الخاص. هنا نقوم بتعيين هذه القيم عندما نتلقاها من Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

معالجات الأحداث عندما تتغير الحقول النصية.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

اطلب من الخادم نشر وكيل لهذا المستخدم.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

قم بتوقيع رسالة قبل إرسالها إلى الخادم لإرسالها إلى `UserProxy` على السلسلة. هذا موضح [هنا](/developers/tutorials/gasless/#ui-changes). نحتاج إلى توقيع رسالة بكل من العنوان المستهدف (عنوان الرمز المميز الذي نستدعيه) وبيانات الاستدعاء التي سيتم إرسالها.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

أرسل رسالة موقعة إلى `UserProxy`، والذي سيتحقق من التوقيع ثم يرسله إلى `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // كلا العنوانين
          data,           // بيانات الاستدعاء لإرسالها إلى الهدف
          v, r, s         // توقيع
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

أرسل طلبًا إلى الخادم، وعندما تتلقى الاستجابة، احصل على تجزئة المعاملة.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

قم بمحاكاة استدعاء دالة `faucet`. نقوم بتمكين زر الصنبور فقط إذا كان هذا ناجحًا.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

لاستدعاء دالة من خلال الخادم و `UserProxy`، نتبع ثلاث خطوات:

1. قم بإنشاء بيانات الاستدعاء لتوقيعها وإرسالها باستخدام [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. قم بتوقيع الرسالة (العنوان المستهدف، وبيانات الاستدعاء، والرقم الفريد).

3. أرسل الرسالة إلى الخادم.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

يتيح لك هذا الجزء من المكون استخدام `FaucetToken` مباشرة من المتصفح. الغرض الرئيسي منه هو تسهيل تصحيح الأخطاء.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

دع المستخدم ينشر `UserProxy` جديدًا.

```js
         <br /><br />
         <input type="text" placeholder="أو أدخل عنوان وكيل موجود" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

اسمح للمستخدمين فقط بالنقر على **Set proxy address** عندما يدخلون عنوانًا شرعيًا. لاحظ أن هذا لا يضمن أن العنوان المعني هو بالفعل عقد `UserProxy`. من الممكن إضافة مثل هذا التحقق، لكنه سيكون أبطأ بكثير (تجربة مستخدم أسوأ) ولن يحسن الأمان (يمكن للمهاجمين دائمًا استخدام الكود الخاص بهم لواجهة المستخدم).

```js
         <br /><br />
         { proxyAddr && (
```

أظهر الباقي _فقط_ إذا كان هناك عنوان وكيل شرعي.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

لا يحتاج المستخدم إلى معرفة الرقم الفريد؛ هذا فقط لأغراض تصحيح الأخطاء.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

لا يمكننا محاكاة استدعاء لـ `faucet()` من خلال الوكيل. ومع ذلك، يمكننا على الأقل التأكد من أن لدينا وكيلًا وأن الوكيل أبلغنا برقم فريد.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

دع المستخدم يصدر معاملات تحويل <span dir="ltr">ERC-20</span>.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

إذا كانت هناك تجزئة معاملة أخيرة، فأظهر رابطًا حتى يتمكن المستخدم من عرضها في مستكشف الكتل.

```js
      </div>
    </>
  )
}

export {Token}
```

هذا مجرد كود React أساسي.

## نقاط الضعف {#vulnerabilities}

خادمنا عرضة لهجمات حجب الخدمة. تم شرح هذا الهجوم [في المقال السابق من السلسلة](/developers/tutorials/gasless/#dos-on-server).

بالإضافة إلى ذلك، نحن نشجع سلوك المستخدم السيئ. هذا ما نطلب من المستخدم توقيعه:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_نحن_ نعلم أن هذا تحويل <span dir="ltr">ERC-20</span> شرعي للرمز المميز والمبلغ وعنوان الوجهة الذي يريد المستخدم تحويله. لكن معظم المستخدمين لا يعرفون كيفية تفسير بيانات الاستدعاء، وليس لديهم أي فكرة عما يوقعون عليه. هذا تصميم سيئ، لسببين:

- لن يستخدمنا بعض المستخدمين لأنهم لا يثقون في البيانات التي نطلب منهم توقيعها.
- سيثق بنا مستخدمون آخرون _وسيتعلمون_ أنه يجب عليهم فقط توقيع بيانات الاستدعاء دون فهم ماهيتها. هذا يعني أنه إذا تمكن المهاجم آدم من إعادة توجيههم إلى موقعه على الويب، فيمكنه جعلهم يوقعون معاملة تمنحه كل <span dir="ltr">USDC</span> (أو <span dir="ltr">DAI</span>، أو أي <span dir="ltr">ERC-20</span> آخر) يمتلكه المستخدم.

الحل هو وجود دوال منفصلة في `UserProxy` للدوال شائعة الاستخدام، مثل التحويل. ثم يمكن للمستخدمين توقيع شيء يفهمونه.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**ملاحظة:** بينما يمكن للمستخدمين استخدام أي محفظة يريدونها، يوصى بشدة أن تشجعهم التطبيقات التي تستخدم <span dir="ltr">EIP-712</span> على استخدام محفظة [تُظهر بيانات التوقيع بالكامل](https://rabby.io/). تقوم بعض المحافظ باقتطاع العنوان، وهو أمر غير آمن. يمكن للمهاجم إنشاء عنوان له نفس أحرف البداية والنهاية، ولكنه يختلف في المنتصف.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## الخاتمة {#conclusion}

بالإضافة إلى نقاط الضعف المذكورة أعلاه، فإن الحل في هذا البرنامج التعليمي له العديد من العيوب التي يمكن أن تساعدنا إيثيريوم في معالجتها.

- _مقاومة الرقابة_. حاليًا، يمكن للمستخدمين استخدام خادمك، أو خادم منافس أعده شخص آخر، أو الاتصال بشبكة إيثيريوم مباشرة، مما يتكبد تكاليف الغاز. يتيح استخدام [<span dir="ltr">ERC-4337</span>](https://docs.erc4337.io/#what-is-erc-4337) للمستخدمين عرض معاملاتهم على مجموعة كبيرة من الخوادم، مما يقلل من احتمالية تعرض معاملاتهم للرقابة.
- _الأصول المملوكة للحساب المملوك خارجيًا (EOA)_. كما لوحظ أعلاه، يمكن استخدام [<span dir="ltr">EIP-7702</span>](https://eip7702.io/) لإدارة الأصول المملوكة بالفعل لعنوان حساب مملوك خارجيًا (<span dir="ltr">EOA</span>). هذا له صعوباته، ولكنه ضروري في بعض الأحيان.

آمل أن أنشر برامج تعليمية حول إضافة هذه الميزات في المستقبل القريب.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).