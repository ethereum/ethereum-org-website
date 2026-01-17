---
title: "بناء واجهة مستخدم للعقد الخاص بك"
description: باستخدام المكونات الحديثة مثل TypeScript وReact وVite وWagmi، سوف نتناول واجهة مستخدم حديثة، ولكنها بسيطة، ونتعلم كيفية توصيل محفظة بواجهة المستخدم، واستدعاء عقد ذكي لقراءة المعلومات، وإرسال معاملة إلى عقد ذكي، ومراقبة الأحداث من عقد ذكي لتحديد التغييرات.
author: Ori Pomerantz
tags:
  [
    "typescript",
    "react",
    "vite",
    "wagmi",
    "واجهة التطبيق"
  ]
skill: beginner
published: 2023-11-01
lang: ar
sidebarDepth: 3
---

لقد وجدت ميزة نحتاجها في نظام إيثريوم البيئي. لقد كتبت العقود الذكية لتنفيذها، وربما حتى بعض النصوص البرمجية ذات الصلة التي تعمل خارج السلسلة. هذا رائع! للأسف، بدون واجهة مستخدم لن يكون لديك أي مستخدمين، وفي آخر مرة كتبت فيها موقعًا على شبكة الإنترنت استخدم الناس أجهزة مودم الطلب الهاتفي وكانت JavaScript جديدة.

هذا المقال لك. أفترض أنك تعرف البرمجة، وربما القليل من JavaScript وHTML، ولكن مهاراتك في واجهة المستخدم قديمة وغير محدّثة. معًا سوف نتناول تطبيقًا حديثًا وبسيطًا حتى ترى كيف يتم ذلك في هذه الأيام.

## لماذا هذا مهم {#why-important}

نظريًا، يمكنك فقط جعل الناس يستخدمون [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) أو [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) للتفاعل مع عقودك. سيكون ذلك رائعًا بالنسبة لمستخدمي إيثريوم ذوي الخبرة. لكننا نحاول خدمة [مليار شخص آخر](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). لن يحدث هذا بدون تجربة مستخدم رائعة، وواجهة المستخدم السهلة هي جزء كبير من ذلك.

## تطبيق Greeter {#greeter-app}

هناك الكثير من النظريات وراء عمل واجهة المستخدم الحديثة، و[الكثير من المواقع الجيدة](https://react.dev/learn/thinking-in-react) [التي تشرحها](https://wagmi.sh/core/getting-started). بدلاً من تكرار العمل الجيد الذي قامت به تلك المواقع، سأفترض أنك تفضل التعلم بالممارسة والبدء بتطبيق يمكنك تجربته. ما زلت بحاجة إلى النظرية لإنجاز الأمور، وسنصل إليها - سنتناول فقط ملف المصدر تلو الآخر، ونناقش الأمور عند وصولنا إليها.

### التثبيت {#installation}

1. إذا لزم الأمر، أضف [بلوكتشين Holesky](https://chainlist.org/?search=holesky&testnets=true) إلى محفظتك و[احصل على ETH تجريبي](https://www.holeskyfaucet.io/).

2. استنسخ مستودع GitHub.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. ثبّت الحزم اللازمة.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. ابدأ التطبيق.

   ```sh
   pnpm dev
   ```

5. تصفح عنوان URL الذي يعرضه التطبيق. في معظم الحالات، هو [http://localhost:5173/](http://localhost:5173/).

6. يمكنك رؤية النص البرمجي المصدر للعقد، وهو نسخة معدلة قليلاً من Greeter الخاص بـ Hardhat، [على مستكشف بلوكتشين](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### استعراض الملفات {#file-walk-through}

#### `index.html` {#index-html}

هذا الملف هو قالب HTML قياسي باستثناء هذا السطر، الذي يستورد ملف البرنامج النصي.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

يخبرنا امتداد الملف أن هذا الملف هو [مكون React](https://www.w3schools.com/react/react_components.asp) مكتوب بـ [TypeScript](https://www.typescriptlang.org/)، وهو امتداد لـ JavaScript يدعم [التحقق من النوع](https://en.wikipedia.org/wiki/Type_system#Type_checking). يتم تجميع TypeScript إلى JavaScript، لذا يمكننا استخدامه للتنفيذ من جانب العميل.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

استيراد النص البرمجي للمكتبة التي نحتاجها.

```tsx
import { App } from './App'
```

استيراد مكون React الذي ينفذ التطبيق (انظر أدناه).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

إنشاء مكون React الجذري. المعلمة إلى `render` هي [JSX](https://www.w3schools.com/react/react_jsx.asp)، وهي لغة امتداد تستخدم كلاً من HTML و JavaScript/TypeScript. تخبر علامة التعجب هنا مكون TypeScript: \"أنت لا تعرف أن `document.getElementById('root')` ستكون معلمة صالحة لـ `ReactDOM.createRoot`، ولكن لا تقلق - أنا المبرمج وأنا أقول لك إنها ستكون كذلك\".

```tsx
  <React.StrictMode>
```

سيتم وضع التطبيق داخل [مكون `React.StrictMode`](https://react.dev/reference/react/StrictMode). يخبر هذا المكون مكتبة React بإدراج فحوصات تصحيح أخطاء إضافية، وهو أمر مفيد أثناء التطوير.

```tsx
    <WagmiConfig config={config}>
```

التطبيق موجود أيضًا داخل [مكون `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [مكتبة wagmi (we are going to make it)](https://wagmi.sh/) تربط تعريفات واجهة مستخدم React مع [مكتبة viem](https://viem.sh/) لكتابة تطبيق إيثريوم لامركزي.

```tsx
      <RainbowKitProvider chains={chains}>
```

وأخيرًا، [مكون `RainbowKitProvider`](https://www.rainbowkit.com/). يتعامل هذا المكون مع تسجيل الدخول والاتصال بين المحفظة والتطبيق.

```tsx
        <App />
```

الآن يمكننا الحصول على مكون للتطبيق، والذي ينفذ واجهة المستخدم بالفعل. تخبر `/>` في نهاية المكون React أن هذا المكون لا يحتوي على أي تعريفات بداخله، وفقًا لمعيار XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

بالطبع، علينا إغلاق المكونات الأخرى.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

هذه هي الطريقة القياسية لإنشاء مكون React - تحديد دالة يتم استدعاؤها في كل مرة تحتاج فيها إلى عرضها. عادةً ما تحتوي هذه الدالة على بعض النصوص البرمجية لـ TypeScript أو JavaScript في الأعلى، متبوعة بعبارة `return` التي تُرجع النص البرمجي JSX.

```tsx
  const { isConnected } = useAccount()
```

هنا نستخدم [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) للتحقق مما إذا كنا متصلين ببلوكتشين من خلال محفظة أم لا.

حسب الاصطلاح، في React، الدوال التي تسمى `use...` هي [hooks](https://www.w3schools.com/react/react_hooks.asp) التي تُرجع نوعًا من البيانات. عند استخدام مثل هذه الخطافات (hooks)، لا يحصل المكون الخاص بك على البيانات فحسب، بل عند تغيير هذه البيانات، يتم إعادة عرض المكون بالمعلومات المحدثة.

```tsx
  return (
    <>
```

يجب أن تُرجع JSX لمكون React مكونًا واحدًا. عندما يكون لدينا مكونات متعددة وليس لدينا أي شيء يغلفها \"بشكل طبيعي\" نستخدم مكونًا فارغًا (`<> ...` </>\`) لتحويلها إلى مكون واحد.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

نحصل على [مكون `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) من RainbowKit. عندما لا نكون متصلين، فإنه يعطينا زر `Connect Wallet` الذي يفتح نافذة تشرح المحافظ وتتيح لك اختيار المحفظة التي تستخدمها. عندما نكون متصلين، فإنه يعرض البلوكتشين الذي نستخدمه، وعنوان حسابنا، ورصيدنا من ETH. يمكننا استخدام هذه الشاشات لتبديل الشبكة أو لقطع الاتصال.

```tsx
      {isConnected && (
```

عندما نحتاج إلى إدراج JavaScript فعلي (أو TypeScript الذي سيتم تجميعه إلى JavaScript) في JSX، فإننا نستخدم الأقواس المعقوفة (`{}`).

الصيغة `a && b` هي اختصار لـ [`a ?` `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). أي، إذا كانت `a` صحيحة، فسيتم تقييمها إلى `b` وإلا فسيتم تقييمها إلى `a` (والتي يمكن أن تكون `false` أو `0`، إلخ). هذه طريقة سهلة لإخبار React بأنه يجب عرض مكون فقط إذا تم استيفاء شرط معين.

في هذه الحالة، نريد فقط أن نظهر للمستخدم `Greeter` إذا كان المستخدم متصلاً ببلوكتشين.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

يحتوي هذا الملف على معظم وظائف واجهة المستخدم. إنه يتضمن تعريفات تكون عادة في ملفات متعددة، ولكن نظرًا لأن هذا برنامج تعليمي، فقد تم تحسين البرنامج ليكون سهل الفهم في المرة الأولى، بدلاً من الأداء أو سهولة الصيانة.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

نحن نستخدم هذه الدوال المكتبية. مرة أخرى، يتم شرحها أدناه حيث يتم استخدامها.

```tsx
import { AddressType } from 'abitype'
```

توفر لنا [مكتبة `abitype`](https://abitype.dev/) تعريفات TypeScript لأنواع بيانات إيثريوم المختلفة، مثل [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

واجهة التطبيق الثنائية (ABI) لعقد `Greeter`.
إذا كنت تقوم بتطوير العقود وواجهة المستخدم في نفس الوقت، فعادةً ما تضعها في نفس المستودع وتستخدم واجهة التطبيق الثنائية (ABI) التي تم إنشاؤها بواسطة مترجم Solidity كملف في تطبيقك. ومع ذلك، هذا ليس ضروريًا هنا لأن العقد قد تم تطويره بالفعل ولن يتغير.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript لغة ذات أنواع قوية. نستخدم هذا التعريف لتحديد العنوان الذي يتم فيه نشر عقد `Greeter` على سلاسل مختلفة. المفتاح هو رقم (chainId)، والقيمة هي `AddressType` (عنوان).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

عنوان العقد على الشبكتين المدعومتين: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) و [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

ملاحظة: يوجد بالفعل تعريف ثالث، لـ Redstone Holesky، سيتم شرحه أدناه.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

يُستخدم هذا النوع كمعلمة لمكون `ShowObject` (سيتم شرحه لاحقًا). يتضمن اسم الكائن وقيمته، والتي يتم عرضها لأغراض تصحيح الأخطاء.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

في أي لحظة من الزمن قد نعرف ما هي التحية (لأننا قرأناها من البلوكتشين) أو لا نعرف (لأننا لم نستلمها بعد). لذا من المفيد أن يكون لديك نوع يمكن أن يكون إما سلسلة نصية أو لا شيء.

##### مكون `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

أخيرًا، نصل إلى تحديد المكون.

```tsx
  const { chain } = useNetwork()
```

معلومات حول السلسلة التي نستخدمها، بفضل [wagmi](https://wagmi.sh/react/hooks/useNetwork).
نظرًا لأن هذا خطاف (hook) (`use...`)، ففي كل مرة تتغير فيها هذه المعلومات، تتم إعادة رسم المكون.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

عنوان عقد Greeter، الذي يختلف باختلاف السلسلة (والذي يكون `undefined` إذا لم تكن لدينا معلومات عن السلسلة أو كنا على سلسلة لا تحتوي على هذا العقد).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // لا توجد وسائط
    watch: true
  })
```

[خطاف `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) يقرأ المعلومات من العقد. يمكنك أن ترى بالضبط ما هي المعلومات التي يُرجعها من خلال توسيع `readResults` في واجهة المستخدم. في هذه الحالة، نريده أن يستمر في البحث حتى نكون على علم عند تغيير التحية.

**ملاحظة:** يمكننا الاستماع إلى [أحداث `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) لمعرفة متى تتغير التحية وتحديثها بهذه الطريقة. ومع ذلك، على الرغم من أنها قد تكون أكثر كفاءة، إلا أنها لن تنطبق في جميع الحالات. عندما ينتقل المستخدم إلى سلسلة مختلفة، تتغير التحية أيضًا، ولكن هذا التغيير لا يرافقه حدث. يمكن أن يكون لدينا جزء من النص البرمجي يستمع للأحداث وآخر لتحديد تغييرات السلسلة، ولكن هذا سيكون أكثر تعقيدًا من مجرد تعيين [معلمة `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

[خطاف `useState`](https://www.w3schools.com/react/react_usestate.asp) في React يتيح لنا تحديد متغير حالة، والذي تستمر قيمته من عرض للمكون إلى آخر. القيمة الأولية هي المعلمة، وفي هذه الحالة السلسلة الفارغة.

يُرجع خطاف `useState` قائمة بقيمتين:

1. القيمة الحالية لمتغير الحالة.
2. دالة لتعديل متغير الحالة عند الحاجة. بما أن هذا خطاف (hook)، ففي كل مرة يتم استدعاؤه، يتم عرض المكون مرة أخرى.

في هذه الحالة، نستخدم متغير حالة للتحية الجديدة التي يريد المستخدم تعيينها.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

هذا هو معالج الأحداث عند تغيير حقل إدخال التحية الجديدة. النوع، [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)، يحدد أن هذا معالج لتغيير قيمة عنصر إدخال HTML. يتم استخدام جزء `<HTMLInputElement>` لأن هذا [نوع عام](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

هذه هي عملية إرسال معاملة بلوكتشين من منظور العميل:

1. أرسل المعاملة إلى عقدة في البلوكتشين باستخدام [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. انتظر الرد من العقدة.
3. عند تلقي الرد، اطلب من المستخدم توقيع المعاملة من خلال المحفظة. يجب أن تحدث هذه الخطوة بعد تلقي رد العقدة لأنه يتم عرض تكلفة الغاز للمعاملة للمستخدم قبل توقيعها.
4. انتظر موافقة المستخدم.
5. أرسل المعاملة مرة أخرى، وهذه المرة باستخدام [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

من المحتمل أن تستغرق الخطوة 2 قدرًا ملحوظًا من الوقت، سيتساءل المستخدمون خلاله عما إذا كان أمرهم قد تم استلامه بالفعل من قبل واجهة المستخدم ولماذا لم يُطلب منهم توقيع المعاملة بالفعل. وهذا يؤدي إلى تجربة مستخدم (UX) سيئة.

الحل هو استخدام [خطافات التحضير (prepare hooks)](https://wagmi.sh/react/prepare-hooks). في كل مرة يتغير فيها أحد المعلمات، أرسل فورًا طلب `eth_estimateGas` إلى العقدة. بعد ذلك، عندما يرغب المستخدم بالفعل في إرسال المعاملة (في هذه الحالة عن طريق الضغط على **تحديث التحية**)، تكون تكلفة الغاز معروفة ويمكن للمستخدم رؤية صفحة المحفظة على الفور.

```tsx
  return (
```

الآن يمكننا أخيرًا إنشاء كود HTML الفعلي لإعادته.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

قم بإنشاء مكون `ShowGreeting` (سيتم شرحه أدناه)، ولكن فقط إذا تمت قراءة التحية بنجاح من البلوكتشين.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

هذا هو حقل إدخال النص حيث يمكن للمستخدم تعيين تحية جديدة. في كل مرة يضغط فيها المستخدم على مفتاح، نستدعي `greetingChange` التي تستدعي `setNewGreeting`. نظرًا لأن `setNewGreeting` تأتي من خطاف `useState`، فإنها تتسبب في إعادة عرض مكون `Greeter` مرة أخرى. هذا يعني أن:

- نحتاج إلى تحديد `value` للحفاظ على قيمة التحية الجديدة، لأنه بخلاف ذلك ستعود إلى القيمة الافتراضية، وهي السلسلة الفارغة.
- يتم استدعاء `usePrepareContractWrite` في كل مرة يتغير فيها `newGreeting`، مما يعني أنه سيحتوي دائمًا على أحدث `newGreeting` في المعاملة المُعدة.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        تحديث التحية
      </button>
```

إذا لم يكن هناك `workingTx.write`، فإننا ما زلنا ننتظر المعلومات اللازمة لإرسال تحديث التحية، لذلك يتم تعطيل الزر. إذا كانت هناك قيمة `workingTx.write`، فهذه هي الدالة التي يجب استدعاؤها لإرسال المعاملة.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

أخيرًا، لمساعدتك على رؤية ما نفعله، نعرض الكائنات الثلاثة التي نستخدمها:

- `readResults`
- `preparedTx`
- `workingTx`

##### مكون `ShowGreeting` {#showgreeting-component}

يعرض هذا المكون

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

تتلقى دالة المكون معلمة تحتوي على جميع سمات المكون.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### مكون `ShowObject` {#showobject-component}

لأغراض المعلومات، نستخدم مكون `ShowObject` لإظهار الكائنات المهمة (`readResults` لقراءة التحية و `preparedTx` و `workingTx` للمعاملات التي ننشئها).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

لا نريد ازدحام واجهة المستخدم بكل المعلومات، لذلك لجعل من الممكن عرضها أو إغلاقها، نستخدم علامة [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

يتم عرض معظم الحقول باستخدام [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

الاستثناء هو الدوال، التي ليست جزءًا من [معيار JSON](https://www.json.org/json-en.html)، لذلك يجب عرضها بشكل منفصل.

```tsx
          {funs.map((f, i) =>
```

ضمن JSX، يتم تفسير الكود داخل الأقواس المعقوفة `{}` على أنه JavaScript. بعد ذلك، يتم تفسير الكود الموجود داخل الأقواس العادية `()` مرة أخرى على أنه JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

يتطلب React أن يكون للعلامات في [شجرة DOM](https://www.w3schools.com/js/js_htmldom.asp) معرّفات مميزة. هذا يعني أن العناصر الفرعية لنفس العلامة (في هذه الحالة، [القائمة غير المرتبة](https://www.w3schools.com/tags/tag_ul.asp)) تحتاج إلى سمات `key` مختلفة.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

أغلق علامات HTML المختلفة.

##### التصدير النهائي {#the-final-export}

```tsx
export { Greeter }
```

مكون `Greeter` هو المكون الذي نحتاج إلى تصديره للتطبيق.

#### `src/wagmi.ts` {#wagmi-ts}

أخيرًا، توجد تعريفات مختلفة متعلقة بـ WAGMI في `src/wagmi.ts`. لن أشرح كل شيء هنا، لأن معظمه عبارة عن قالب جاهز من غير المرجح أن تحتاج إلى تغييره.

النص البرمجي هنا ليس تمامًا مثل [الموجود على github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) لأنه في وقت لاحق من المقالة نضيف سلسلة أخرى ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

استيراد سلاسل الكتل التي يدعمها التطبيق. يمكنك رؤية قائمة السلاسل المدعومة [في viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

لتتمكن من استخدام [WalletConnect](https://walletconnect.com/)، تحتاج إلى معرف مشروع لتطبيقك. يمكنك الحصول عليه [على cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'تطبيقي wagmi + RainbowKit',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### إضافة بلوكتشين آخر {#add-blockchain}

في هذه الأيام، هناك الكثير من [حلول توسيع الطبقة الثانية](/layer-2/)، وقد ترغب في دعم بعضها الذي لا يدعمه viem بعد. للقيام بذلك، قم بتعديل `src/wagmi.ts`. تشرح هذه التعليمات كيفية إضافة [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. استورد نوع `defineChain` من viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. أضف تعريف الشبكة.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'المستكشف', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. أضف السلسلة الجديدة إلى استدعاء `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. تأكد من أن التطبيق يعرف عنوان عقودك على الشبكة الجديدة. في هذه الحالة، نقوم بتعديل `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## الخلاصة {#conclusion}

بالطبع، أنت لا تهتم حقًا بتوفير واجهة مستخدم لـ `Greeter`. تريد إنشاء واجهة مستخدم لعقودك الخاصة. لإنشاء تطبيقك الخاص، قم بتشغيل هذه الخطوات:

1. حدد لإنشاء تطبيق wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. قم بتسمية التطبيق.

3. حدد إطار عمل **React**.

4. حدد متغير **Vite**.

5. يمكنك [إضافة Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup).

الآن اذهب واجعل عقودك قابلة للاستخدام للعالم بأسره.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

