---
title: "بناء واجهة مستخدم لعقدك"
description: "باستخدام مكونات حديثة مثل ⁦TypeScript⁩ و⁦React⁩ و⁦Vite⁩ و⁦Wagmi⁩، سنستعرض واجهة مستخدم حديثة ولكن بسيطة، ونتعلم كيفية ربط محفظة بواجهة المستخدم، واستدعاء عقد ذكي لقراءة المعلومات، وإرسال معاملة إلى عقد ذكي، ومراقبة الأحداث من عقد ذكي لتحديد التغييرات."
author: "أوري بوميرانتس"
tags: ["TypeScript", "React", "Vite", "Wagmi", "واجهة أمامية"]
skill: beginner
breadcrumb: "واجهة المستخدم مع ⁦WAGMI⁩"
published: 2023-11-01
lang: ar
sidebarDepth: 3
---

لقد وجدت ميزة نحتاجها في نظام إيثيريوم البيئي. لقد كتبت العقود الذكية لتنفيذها، وربما حتى بعض التعليمات البرمجية ذات الصلة التي تعمل خارج السلسلة. هذا رائع! لسوء الحظ، بدون واجهة مستخدم لن يكون لديك أي مستخدمين، وآخر مرة كتبت فيها موقعًا إلكترونيًا كان الناس يستخدمون أجهزة المودم للاتصال الهاتفي وكان JavaScript جديدًا.

هذه المقالة لك. أفترض أنك تعرف البرمجة، وربما القليل من JavaScript وHTML، لكن مهاراتك في واجهة المستخدم صدئة وقديمة. معًا سنستعرض تطبيقًا حديثًا بسيطًا لترى كيف يتم ذلك هذه الأيام.

## لماذا هذا مهم {#why-important}

نظريًا، يمكنك فقط جعل الأشخاص يستخدمون [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) أو [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) للتفاعل مع عقودك. هذا رائع لمستخدمي إيثيريوم ذوي الخبرة. لكننا نحاول خدمة [مليار شخص آخر](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). لن يحدث هذا بدون تجربة مستخدم رائعة، وواجهة المستخدم الودية هي جزء كبير من ذلك.

## تطبيق Greeter {#greeter-app}

هناك الكثير من النظريات وراء كيفية عمل واجهة المستخدم الحديثة، و[الكثير من المواقع الجيدة](https://react.dev/learn/thinking-in-react) [التي تشرح ذلك](https://wagmi.sh/core/getting-started). بدلاً من تكرار العمل الرائع الذي قامت به تلك المواقع، سأفترض أنك تفضل التعلم بالممارسة والبدء بتطبيق يمكنك اللعب به. لا تزال بحاجة إلى النظرية لإنجاز الأمور، وسنصل إليها - سننتقل فقط من ملف مصدر إلى ملف مصدر، ونناقش الأمور عندما نصل إليها.

### التثبيت {#installation}

1. يستخدم التطبيق شبكة اختبار [Sepolia](https://sepolia.dev/). إذا لزم الأمر، [احصل على ETH لاختبار Sepolia](/developers/docs/networks/#sepolia) و[أضف Sepolia إلى محفظتك](https://chainlist.org/chain/11155111).

2. استنسخ مستودع GitHub وقم بتثبيت الحزم اللازمة.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. يستخدم التطبيق نقاط وصول مجانية، والتي لها قيود على الأداء. إذا كنت ترغب في استخدام مزود [عقدة كخدمة](/developers/docs/nodes-and-clients/nodes-as-a-service/)، فاستبدل عناوين URL في [`src/wagmi.ts`](#wagmi-ts).

4. ابدأ التطبيق.

   ```sh
   npm run dev
   ```

5. تصفح إلى عنوان URL الذي يعرضه التطبيق. في معظم الحالات، يكون ذلك [http://localhost:5173/](http://localhost:5173/).

6. يمكنك رؤية الكود المصدري للعقد، وهو نسخة معدلة من Greeter الخاص بـ Hardhat، [على مستكشف سلسلة الكتل](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### جولة في الملفات {#file-walk-through}

#### `index.html` {#index-html}

هذا الملف عبارة عن نموذج HTML قياسي باستثناء هذا السطر، الذي يستورد ملف البرنامج النصي.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

يشير امتداد الملف إلى أن هذا [مكون React](https://www.w3schools.com/react/react_components.asp) مكتوب بلغة [TypeScript](https://www.typescriptlang.org/)، وهي امتداد لـ JavaScript يدعم [التحقق من النوع](https://en.wikipedia.org/wiki/Type_system#Type_checking). يتم تجميع TypeScript إلى JavaScript، لذا يمكننا استخدامه على جانب العميل.

يتم شرح هذا الملف في الغالب في حال كنت مهتمًا. عادة لا تقوم بتعديل هذا الملف، بل [`src/App.tsx`](#app-tsx) والملفات التي يستوردها.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

استيراد كود المكتبة الذي نحتاجه.

```tsx
import App from './App.tsx'
```

استيراد مكون React الذي ينفذ التطبيق (انظر أدناه).

```tsx
import { config } from './wagmi.ts'
```

استيراد تكوين [Wagmi](https://wagmi.sh/)، والذي يتضمن تكوين سلسلة الكتل.

```tsx
const queryClient = new QueryClient()
```

ينشئ مثيلاً جديدًا لمدير ذاكرة التخزين المؤقت الخاص بـ [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). سيقوم هذا الكائن بتخزين:

- استدعاءات RPC المخزنة مؤقتًا
- قراءات العقد
- حالة إعادة الجلب في الخلفية

نحتاج إلى مدير ذاكرة التخزين المؤقت لأن Wagmi <span dir="ltr">v3</span> يستخدم React Query داخليًا.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

إنشاء مكون React الجذري. المعلمة لـ `render` هي [JSX](https://www.w3schools.com/react/react_jsx.asp)، وهي لغة امتداد تستخدم كلاً من HTML وJavaScript/TypeScript. علامة التعجب هنا تخبر مكون TypeScript: "أنت لا تعرف أن `document.getElementById('root')` سيكون معلمة صالحة لـ `ReactDOM.createRoot`، لكن لا تقلق - أنا المطور وأخبرك أنه سيكون كذلك".

```tsx
  <React.StrictMode>
```

سيتم وضع التطبيق داخل [مكون `React.StrictMode`](https://react.dev/reference/react/StrictMode). يخبر هذا المكون مكتبة React بإدراج فحوصات تصحيح أخطاء إضافية، وهو أمر مفيد أثناء التطوير.

```tsx
    <WagmiProvider config={config}>
```

التطبيق موجود أيضًا داخل [مكون `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). تربط [مكتبة Wagmi (التي سنقوم بإنشائها)](https://wagmi.sh/) تعريفات واجهة مستخدم React مع [مكتبة Viem](https://viem.sh/) لكتابة تطبيق لامركزي (dapp) على إيثيريوم.

```tsx
      <QueryClientProvider client={queryClient}>
```

وأخيرًا، أضف مزود React Query حتى يتمكن أي مكون تطبيق من استخدام الاستعلامات المخزنة مؤقتًا.

```tsx
        <App />
```

الآن يمكننا الحصول على المكون الخاص بالتطبيق، والذي ينفذ واجهة المستخدم فعليًا. يخبر `/>` في نهاية المكون React أن هذا المكون لا يحتوي على أي تعريفات بداخله، وفقًا لمعيار XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

بالطبع، علينا إغلاق المكونات الأخرى.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

استيراد المكتبات التي نحتاجها، بالإضافة إلى [مكون `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

معرف سلسلة Sepolia.

```
function App() {
```

هذه هي الطريقة القياسية لإنشاء مكون React: تحديد دالة يتم استدعاؤها كلما دعت الحاجة إلى عرضها. تحتوي هذه الدالة عادةً على كود TypeScript أو JavaScript، متبوعًا بعبارة `return` التي تُرجع كود JSX.

```tsx
  const connection = useConnection()
```

استخدم [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) للحصول على معلومات تتعلق بالاتصال الحالي، مثل العنوان و`chainId`.

بالعرف، في React الدوال التي تسمى `use...` هي [خطافات (hooks)](https://www.w3schools.com/react/react_hooks.asp). هذه الدوال لا تُرجع البيانات إلى المكون فحسب؛ بل تضمن أيضًا إعادة عرضه (يتم تنفيذ دالة المكون مرة أخرى، ويحل مخرجاتها محل المخرجات السابقة في HTML) عندما تتغير تلك البيانات.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

استخدم [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) للحصول على معلومات حول اتصال المحفظة.

```tsx
  const { disconnect } = useDisconnect()
```

يمنحنا [هذا الخطاف](https://wagmi.sh/react/api/hooks/useDisconnect) الدالة لقطع الاتصال بالمحفظة.

```tsx
  const { switchChain } = useSwitchChain()
```

يتيح لنا [هذا الخطاف](https://wagmi.sh/react/api/hooks/useSwitchChain) تبديل السلاسل.

```tsx
  useEffect(() => {
```

يتيح لك خطاف React [`useEffect`](https://react.dev/reference/react/useEffect) تشغيل دالة كلما تغيرت قيمة متغير لمزامنة نظام خارجي.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

إذا كنا متصلين، ولكن ليس بسلسلة كتل Sepolia، فقم بالتبديل إلى Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

أعد تشغيل الدالة في كل مرة تتغير فيها حالة الاتصال أو معرف السلسلة (chainId) للاتصال.

```tsx
  return (
    <>
```

_يجب_ أن يُرجع JSX الخاص بمكون React مكون HTML واحدًا. عندما يكون لدينا مكونات متعددة ولا نحتاج إلى حاوية لتغليفها جميعًا، نستخدم مكونًا فارغًا (`<> ... </>`) لدمجها في مكون واحد.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

توفير معلومات حول الاتصال الحالي. داخل JSX، يعني `{<expression>}` تقييم التعبير كـ JavaScript.

```tsx
      {connection.status === 'connected' && (
```

بناء الجملة `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

هذه هي الطريقة القياسية لوضع عبارات if داخل JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

يتبع JSX معيار XML، وهو أكثر صرامة من HTML. إذا لم يكن للعلامة علامة نهاية مقابلة، _يجب_ أن تحتوي على شرطة مائلة (`/`) في النهاية لإنهائها.

هنا لدينا علامتان من هذا القبيل، `<Greeter />` (والتي تحتوي فعليًا على كود HTML الذي يتحدث إلى العقد) و[`<hr />` لخط أفقي](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

إذا نقر المستخدم على هذا الزر، فاستدعِ دالة `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

إذا _لم_ نكن متصلين، فاعرض الخيارات اللازمة للاتصال بالمحفظة.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

في `connectors` لدينا قائمة بالموصلات. نستخدم [`map`](https://www.w3schools.com/jsref/jsref_map.asp) لتحويلها إلى قائمة بأزرار JSX لعرضها.

```tsx
            <button
              key={connector.uid}
```

في JSX، من الضروري أن يكون للعلامات "الشقيقة" (العلامات التي تنحدر من نفس الأصل) معرفات مختلفة.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

أزرار الموصل.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

توفير معلومات إضافية. يخبر بناء جملة التعبير `<variable>?.<field>` JavaScript أنه إذا تم تعريف المتغير، فقم بالتقييم إلى ذلك الحقل. إذا لم يتم تعريف المتغير، فإن هذا التعبير يتم تقييمه إلى `undefined`.

التعبير `error.message`، عندما لا يكون هناك خطأ، سيثير استثناءً. يتيح لنا استخدام `error?.message` تجنب هذه المشكلة.

#### `src/Greeter.tsx` {#greeter-tsx}

يحتوي هذا الملف على معظم وظائف واجهة المستخدم. ويتضمن تعريفات تكون عادةً في ملفات متعددة، ولكن نظرًا لأن هذا برنامج تعليمي، فقد تم تحسين البرنامج ليكون سهل الفهم في المرة الأولى، بدلاً من الأداء أو سهولة الصيانة.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

نستخدم دوال المكتبة هذه. مرة أخرى، يتم شرحها أدناه حيث يتم استخدامها.

```tsx
import { AddressType } from 'abitype'
```

تزودنا [مكتبة `abitype`](https://abitype.dev/) بتعريفات TypeScript لأنواع بيانات إيثيريوم المختلفة، مثل [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

واجهة التطبيق الثنائية (ABI) لعقد `Greeter`.
إذا كنت تقوم بتطوير العقود وواجهة المستخدم في نفس الوقت، فعادة ما تضعها في نفس المستودع وتستخدم ABI الذي تم إنشاؤه بواسطة مترجم Solidity كملف في تطبيقك. ومع ذلك، هذا ليس ضروريًا هنا لأن العقد قد تم تطويره بالفعل ولن يتغير.

نستخدم [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) لإخبار TypeScript أن هذا ثابت _حقيقي_. عادةً، عندما تحدد في JavaScript `const x = {"a": 1}`، يمكنك تغيير القيمة في `x`، لكنك لا تستطيع التعيين إليها.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

لغة TypeScript مكتوبة بقوة. نستخدم هذا التعريف لتحديد العنوان الذي يتم فيه نشر عقد `Greeter` عبر سلاسل مختلفة. المفتاح هو رقم (معرف السلسلة chainId)، والقيمة هي `AddressType` (عنوان).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

عنوان العقد على [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### مكون `Timer` {#timer-component}

يعرض مكون `Timer` عدد الثواني منذ وقت معين. هذا مهم لأغراض قابلية الاستخدام. عندما يفعل المستخدمون شيئًا ما، فإنهم يتوقعون رد فعل فوري. في سلاسل الكتل، غالبًا ما يكون هذا مستحيلاً لأنه لا يحدث شيء حتى يتم وضع المعاملة في كتلة. أحد الحلول هو إظهار المدة التي مرت منذ أن أجرى المستخدم الإجراء، حتى يتمكن المستخدم من تحديد ما إذا كان الوقت المطلوب معقولاً.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

يأخذ مكون `Timer` معلمة واحدة، `lastUpdate`، وهي وقت الإجراء الأخير.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

نحتاج إلى أن يكون لدينا حالة (متغير مرتبط بالمكون) وتحديثها لكي يعمل المكون بشكل صحيح. لكننا لا نحتاج أبدًا إلى قراءتها، لذا لا تكلف نفسك عناء إنشاء متغير.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

تتيح لنا دالة [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) جدولة دالة للتشغيل بشكل دوري. في هذه الحالة، كل ثانية. تستدعي الدالة `setNow` لتحديث الحالة، لذلك سيتم إعادة عرض مكون `Timer`. نقوم بتغليف هذا داخل [`useEffect`](https://react.dev/reference/react/useEffect) بقائمة تبعيات فارغة بحيث يحدث ذلك مرة واحدة فقط، بدلاً من كل مرة يتم فيها عرض المكون.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

احسب عدد الثواني منذ التحديث الأخير وأرجعه.

##### مكون `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

أخيرًا، نصل إلى تعريف المكون.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

معلومات حول السلسلة والحساب الذي نستخدمه، مقدمة من [Wagmi](https://wagmi.sh/). نظرًا لأن هذا خطاف (`use...`)، يتم إعادة عرض المكون كلما تغيرت هذه المعلومات.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

عنوان عقد Greeter، والذي يكون `undefined` إذا لم يكن لدينا معلومات السلسلة، أو كنا على سلسلة بدون ذلك العقد.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // بدون وسائط
  })
```

يستدعي [خطاف `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) دالة `greet` الخاصة بـ [العقد](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

يتيح لنا [خطاف `useState`](https://www.w3schools.com/react/react_usestate.asp) الخاص بـ React تحديد متغير حالة، تستمر قيمته من عرض واحد للمكون إلى آخر. القيمة الأولية هي المعلمة، وفي هذه الحالة السلسلة الفارغة.

يُرجع خطاف `useState` قائمة بقيمتين:

1. القيمة الحالية لمتغير الحالة.
2. دالة لتعديل متغير الحالة عند الحاجة. نظرًا لأن هذا خطاف، في كل مرة يتم استدعاؤه يتم عرض المكون مرة أخرى.

في هذه الحالة، نستخدم متغير حالة للتحية الجديدة التي يريد المستخدم تعيينها.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

إذا كان عدة مستخدمين يستخدمون نفس العقد في نفس الوقت، فقد يقومون بالكتابة فوق تحيات بعضهم البعض. سيبدو هذا للمستخدمين كما لو أن التطبيق معطل. إذا أظهر التطبيق من قام بتعيين التحية آخر مرة، فسيعرف المستخدم أنه شخص آخر وأن التطبيق يعمل بشكل صحيح.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

يحب المستخدمون أن يروا أن أفعالهم لها تأثير فوري. ومع ذلك، على سلسلة الكتل، ليس هذا هو الحال. تتيح لنا متغيرات الحالة هذه على الأقل عرض شيء ما للمستخدمين حتى يعرفوا أن الإجراء الخاص بهم قيد التقدم.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

إذا قام `readResults` أعلاه بتغيير البيانات ولم يتم تعيينها إلى قيمة خاطئة (`undefined`، على سبيل المثال)، فقم بتحديث التحية الحالية إلى تلك المقروءة من سلسلة الكتل. أيضًا، قم بتحديث الحالة.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

استمع إلى أحداث `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

يعني `!!<value>` أنه إذا كانت القيمة `false`، أو قيمة يتم تقييمها على أنها خطأ، مثل `undefined` أو `0` أو سلسلة فارغة، فإن التعبير الإجمالي هو `false`. لأي قيمة أخرى، يكون `true`. إنها طريقة لتحويل القيم إلى قيم منطقية (booleans)، لأنه إذا لم يكن هناك `greeterAddr`، فإننا لا نريد الاستماع إلى الأحداث.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

عندما نرى السجلات (والذي يحدث عندما نرى حدثًا جديدًا)، فهذا يعني أنه تم تعديل التحية. في هذه الحالة، يمكننا تحديث `currentGreeting` و`lastSetterAddress` إلى القيم الجديدة. أيضًا، نريد تحديث عرض الحالة.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

عندما نقوم بتحديث الحالة، نريد القيام بشيئين:

1. تحديث سلسلة الحالة (`status`)
2. تحديث وقت آخر تحديث للحالة (`statusTime`) إلى الآن.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

هذا هو معالج الأحداث للتغييرات في حقل إدخال التحية الجديد. يمكننا تحديد نوع المعلمة `evt`، لكن TypeScript هي لغة اختيارية النوع. نظرًا لأن هذه الدالة يتم استدعاؤها مرة واحدة فقط، في معالج أحداث HTML، فلا أعتقد أن ذلك ضروري.

```tsx
  const { writeContractAsync } = useWriteContract()
```

الدالة للكتابة إلى عقد. إنها مشابهة لـ [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)، لكنها تتيح تحديثات حالة أفضل.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

هذه هي عملية إرسال معاملة سلسلة الكتل من منظور العميل:

1. إرسال المعاملة إلى عقدة في سلسلة الكتل باستخدام [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. انتظر استجابة من العقدة.
3. عند استلام الاستجابة، اطلب من المستخدم توقيع المعاملة من خلال المحفظة. _يجب_ أن تحدث هذه الخطوة بعد استلام استجابة العقدة لأنه يتم عرض تكلفة الغاز للمعاملة للمستخدم قبل توقيعها.
4. انتظر موافقة المستخدم.
5. أرسل المعاملة مرة أخرى، هذه المرة باستخدام [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

من المرجح أن تستغرق الخطوة 2 قدرًا ملحوظًا من الوقت، قد يتساءل المستخدمون خلاله عما إذا كانت واجهة المستخدم قد تلقت أمرهم ولماذا لم يُطلب منهم توقيع المعاملة بعد. هذا يخلق تجربة مستخدم (UX) سيئة.

أحد الحلول هو إرسال `eth_estimateGas` في كل مرة تتغير فيها معلمة. بعد ذلك، عندما يريد المستخدم فعليًا إرسال المعاملة (في هذه الحالة عن طريق الضغط على **تحديث التحية**)، تكون تكلفة الغاز معروفة، ويمكن للمستخدم رؤية صفحة المحفظة على الفور.

```tsx
  return (
```

الآن يمكننا أخيرًا إنشاء HTML الفعلي لإرجاعه.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

عرض التحية الحالية.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

إذا كنا نعرف من قام بتعيين التحية آخر مرة، فاعرض تلك المعلومات. لا يتتبع `Greeter` هذه المعلومات، ولا نريد الرجوع للبحث عن أحداث `SetGreeting`، لذلك نحصل عليها فقط بمجرد تغيير التحية أثناء تشغيلنا.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

هذا هو حقل النص المدخل حيث يمكن للمستخدم تعيين تحية جديدة. في كل مرة يضغط فيها المستخدم على مفتاح، نستدعي `greetingChange`، والذي يستدعي `setNewGreeting`. نظرًا لأن `setNewGreeting` يأتي من `useState`، فإنه يتسبب في إعادة عرض مكون `Greeter`. هذا يعني أن:

- نحتاج إلى تحديد `value` للاحتفاظ بقيمة التحية الجديدة، لأنه بخلاف ذلك ستعود إلى الافتراضي، السلسلة الفارغة.
- يتم تحديث `simulation` أيضًا في كل مرة يتغير فيها `newGreeting`، مما يعني أننا سنحصل على محاكاة بالتحية الصحيحة. قد يكون هذا ذا صلة لأن تكلفة الغاز تعتمد على حجم بيانات الاستدعاء، والتي تعتمد على طول السلسلة.

```tsx
      <button disabled={!simulation.data}
```

قم بتمكين الزر فقط بمجرد حصولنا على المعلومات التي نحتاجها لإرسال المعاملة.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

تحديث الحالة. في هذه المرحلة، يحتاج المستخدم إلى التأكيد في المحفظة.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

يُرجع `writeContractAsync` فقط بعد إرسال المعاملة فعليًا. يتيح لنا هذا أن نُظهر للمستخدم المدة التي انتظرتها المعاملة ليتم تضمينها في سلسلة الكتل.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

عرض الحالة والمدة التي مرت منذ تحديثها.

```
export {Greeter}
```

تصدير المكون.

#### `src/wagmi.ts` {#wagmi-ts}

أخيرًا، توجد تعريفات مختلفة تتعلق بـ Wagmi في `src/wagmi.ts`. لن أشرح كل شيء هنا، لأن معظمه عبارة عن نموذج أساسي من غير المحتمل أن تحتاج إلى تغييره.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

يتضمن تكوين Wagmi السلاسل التي يدعمها هذا التطبيق. يمكنك رؤية [قائمة السلاسل المتاحة](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

يتيح لنا [هذا الموصل](https://wagmi.sh/core/api/connectors/injected) التحدث إلى محفظة مثبتة في المتصفح.

```ts
  transports: {
    [sepolia.id]: http()
```

نقطة نهاية HTTP الافتراضية التي تأتي مع Viem جيدة بما فيه الكفاية. إذا أردنا عنوان URL مختلفًا، يمكننا استخدام `http("https:// hostname ")` أو `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## إضافة سلسلة كتل أخرى {#add-blockchain}

في هذه الأيام، هناك الكثير من [حلول التوسع من الطبقة الثانية (<span dir="ltr">L2</span>)](https://ethereum.org/layer-2/)، وقد ترغب في دعم بعضها الذي لا يدعمه Viem بعد. للقيام بذلك، تقوم بتعديل `src/wagmi.ts`. تشرح هذه التعليمات كيفية إضافة [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  تحرير `src/wagmi.ts`

    أ. استيراد نوع `defineChain` من Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    ب. أضف تعريف الشبكة. لست بحاجة حقًا للقيام بذلك لـ Optimism Sepolia، [فهي موجودة بالفعل في `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)، ولكن بهذه الطريقة تتعلم كيفية إضافة سلسلة كتل غير موجودة في `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    ج. أضف السلسلة الجديدة إلى استدعاء `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  قم بتحرير `src/App.tsx` للتعليق على التبديل التلقائي إلى Sepolia. في نظام الإنتاج، من المحتمل أن تعرض أزرارًا بها روابط لكل سلسلة من سلاسل الكتل التي تدعمها.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  قم بتحرير `src/Greeter.tsx` للتأكد من أن التطبيق يعرف عنوان عقودك على الشبكة الجديدة.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  في متصفحك.

    أ. تصفح إلى [ChainList](https://chainlist.org/chain/11155420?testnets=true) وانقر على أحد الأزرار الموجودة على الجانب الأيمن من الجدول لإضافة السلسلة إلى محفظتك.

    ب. في التطبيق، انقر على **قطع الاتصال** (Disconnect) ثم أعد الاتصال لتغيير سلسلة الكتل. هناك طرق أفضل للتعامل مع هذا، لكنها تتطلب تغييرات في التطبيق.

## الخاتمة {#conclusion}

بالطبع، أنت لا تهتم حقًا بتوفير واجهة مستخدم لـ `Greeter`. أنت تريد إنشاء واجهة مستخدم لعقودك الخاصة. لإنشاء تطبيقك الخاص، قم بتشغيل هذه الخطوات:

1. حدد لإنشاء تطبيق Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. اكتب `y` للمتابعة.

3. قم بتسمية التطبيق.

4. حدد إطار عمل **React**.

5. حدد متغير **Vite**.

الآن اذهب واجعل عقودك قابلة للاستخدام للعالم الواسع.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).