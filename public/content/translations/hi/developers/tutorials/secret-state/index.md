---
title: गुप्त स्थिति के लिए शून्य-ज्ञान का उपयोग करना
description: ऑनचेन गेम सीमित हैं क्योंकि वे कोई छिपी हुई जानकारी नहीं रख सकते हैं। इस ट्यूटोरियल को पढ़ने के बाद, एक पाठक शून्य-ज्ञान प्रमाण और सर्वर घटकों को मिलाकर एक गुप्त स्थिति, ऑफचेन, घटक के साथ सत्यापन योग्य गेम बनाने में सक्षम होगा। ऐसा करने की तकनीक को माइनस्वीपर गेम बनाकर प्रदर्शित किया जाएगा।
author: ओरी पोमेरेंट्ज़
tags:
  - सर्वर
  - ऑफचेन
  - केंद्रीकृत
  - शून्य-ज्ञान
  - zokrates
  - mud
  - गोपनीयता
skill: advanced
breadcrumb: ZK गुप्त स्थिति
lang: hi
published: 2025-03-15
---

_ब्लॉकचेन पर कोई रहस्य नहीं होते हैं_। ब्लॉकचेन पर जो कुछ भी पोस्ट किया जाता है वह हर किसी के पढ़ने के लिए खुला होता है। यह आवश्यक है, क्योंकि ब्लॉकचेन इस बात पर आधारित है कि कोई भी इसे सत्यापित कर सके। हालाँकि, गेम अक्सर गुप्त स्थिति पर निर्भर करते हैं। उदाहरण के लिए, [माइनस्वीपर](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) का गेम बिल्कुल भी समझ में नहीं आता है यदि आप केवल एक ब्लॉक एक्सप्लोरर पर जा सकते हैं और नक्शा देख सकते हैं।

सबसे सरल समाधान गुप्त स्थिति को रखने के लिए एक [सर्वर घटक](/developers/tutorials/server-components/) का उपयोग करना है। हालाँकि, हम ब्लॉकचेन का उपयोग इसलिए करते हैं ताकि गेम डेवलपर द्वारा धोखाधड़ी को रोका जा सके। हमें सर्वर घटक की ईमानदारी सुनिश्चित करने की आवश्यकता है। सर्वर स्थिति का एक हैश प्रदान कर सकता है, और यह साबित करने के लिए [शून्य-ज्ञान प्रमाण](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) का उपयोग कर सकता है कि किसी चाल के परिणाम की गणना करने के लिए उपयोग की गई स्थिति सही है।

इस लेख को पढ़ने के बाद आप जानेंगे कि इस प्रकार का गुप्त स्थिति रखने वाला सर्वर, स्थिति दिखाने के लिए एक क्लाइंट, और दोनों के बीच संचार के लिए एक ऑनचेन घटक कैसे बनाया जाए। हमारे द्वारा उपयोग किए जाने वाले मुख्य उपकरण होंगे:

| उपकरण                                          | उद्देश्य                                                 | इस संस्करण पर सत्यापित |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | शून्य-ज्ञान प्रमाण और उनका सत्यापन            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | सर्वर और क्लाइंट दोनों के लिए प्रोग्रामिंग भाषा |               5.4.2 |
| [Node](https://nodejs.org/en)                 | सर्वर चलाना                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | ब्लॉकचेन के साथ संचार                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | ऑनचेन डेटा प्रबंधन                                 |              2.0.12 |
| [React](https://react.dev/)                   | क्लाइंट यूजर इंटरफेस                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | क्लाइंट कोड सर्व करना                                 |               4.2.1 |

## माइनस्वीपर उदाहरण {#minesweeper}

[माइनस्वीपर](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)) एक ऐसा गेम है जिसमें माइनफ़ील्ड (बारूदी सुरंगों का क्षेत्र) के साथ एक गुप्त नक्शा होता है। खिलाड़ी किसी विशिष्ट स्थान पर खुदाई करने का विकल्प चुनता है। यदि उस स्थान पर कोई माइन (खदान) है, तो गेम खत्म हो जाता है। अन्यथा, खिलाड़ी को उस स्थान के चारों ओर के आठ वर्गों में मौजूद माइन्स की संख्या मिल जाती है।

यह एप्लिकेशन [MUD](https://mud.dev/) का उपयोग करके लिखा गया है, जो एक ऐसा फ्रेमवर्क है जो हमें [कुंजी-मूल्य डेटाबेस](https://aws.amazon.com/nosql/key-value/) का उपयोग करके डेटा को ऑनचेन स्टोर करने और उस डेटा को ऑफचेन घटकों के साथ स्वचालित रूप से सिंक्रनाइज़ करने की सुविधा देता है। सिंक्रनाइज़ेशन के अलावा, MUD एक्सेस कंट्रोल प्रदान करना आसान बनाता है, और अन्य उपयोगकर्ताओं के लिए हमारे एप्लिकेशन को बिना अनुमति के [विस्तारित](https://mud.dev/guides/extending-a-world) करना आसान बनाता है।

### माइनस्वीपर उदाहरण चलाना {#running-minesweeper-example}

माइनस्वीपर उदाहरण चलाने के लिए:

1. सुनिश्चित करें कि आपने [पूर्वापेक्षाएँ स्थापित कर ली हैं](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), और [`mprocs`](https://github.com/pvolok/mprocs)।

2. रिपॉजिटरी को क्लोन करें।

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. पैकेज स्थापित करें।

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   यदि Foundry को `pnpm install` के हिस्से के रूप में स्थापित किया गया था, तो आपको कमांड-लाइन शेल को पुनरारंभ करना होगा।

4. अनुबंधों को संकलित करें

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. प्रोग्राम शुरू करें (जिसमें एक [anvil](https://book.getfoundry.sh/anvil/) ब्लॉकचेन शामिल है) और प्रतीक्षा करें।

   ```sh copy
   mprocs
   ```

   ध्यान दें कि स्टार्टअप में लंबा समय लगता है। प्रगति देखने के लिए, पहले तैनात किए जा रहे MUD अनुबंधों को देखने के लिए _contracts_ टैब पर स्क्रॉल करने हेतु डाउन एरो (नीचे वाले तीर) का उपयोग करें। जब आपको _Waiting for file changes…_ संदेश मिलता है, तो अनुबंध तैनात हो जाते हैं और आगे की प्रगति _server_ टैब में होगी। वहां, आप तब तक प्रतीक्षा करें जब तक आपको _Verifier address: 0x...._ संदेश न मिल जाए।

   यदि यह चरण सफल होता है, तो आपको `mprocs` स्क्रीन दिखाई देगी, जिसमें बाईं ओर विभिन्न प्रक्रियाएं और दाईं ओर वर्तमान में चयनित प्रक्रिया के लिए कंसोल आउटपुट होगा।

   ![The mprocs screen](./mprocs.png)

   यदि `mprocs` के साथ कोई समस्या है, तो आप चारों प्रक्रियाओं को मैन्युअल रूप से चला सकते हैं, प्रत्येक को उसकी अपनी कमांड लाइन विंडो में:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. अब आप [क्लाइंट](http://localhost:3000) पर ब्राउज़ कर सकते हैं, **New Game** पर क्लिक कर सकते हैं, और खेलना शुरू कर सकते हैं।

### टेबल्स {#tables}

हमें ऑनचेन [कई टेबल्स](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) की आवश्यकता है।

- `Configuration`: यह टेबल एक सिंगलटन है, इसमें कोई कुंजी नहीं है और केवल एक रिकॉर्ड है। इसका उपयोग गेम कॉन्फ़िगरेशन जानकारी रखने के लिए किया जाता है:
  - `height`: माइनफ़ील्ड की ऊंचाई
  - `width`: माइनफ़ील्ड की चौड़ाई
  - `numberOfBombs`: प्रत्येक माइनफ़ील्ड में बमों की संख्या
- `VerifierAddress`: यह टेबल भी एक सिंगलटन है। इसका उपयोग कॉन्फ़िगरेशन के एक हिस्से, सत्यापनकर्ता अनुबंध (`verifier`) का पता रखने के लिए किया जाता है। हम इस जानकारी को `Configuration` टेबल में रख सकते थे, लेकिन यह एक अलग घटक, सर्वर द्वारा सेट किया जाता है, इसलिए इसे एक अलग टेबल में रखना आसान है।

- `PlayerGame`: कुंजी खिलाड़ी का पता है। डेटा है:

  - `gameId`: 32-बाइट मान जो उस नक्शे का हैश है जिस पर खिलाड़ी खेल रहा है (गेम पहचानकर्ता)।
  - `win`: एक बूलियन जो यह बताता है कि खिलाड़ी ने गेम जीता या नहीं।
  - `lose`: एक बूलियन जो यह बताता है कि खिलाड़ी गेम हार गया या नहीं।
  - `digNumber`: गेम में सफल खुदाई की संख्या।

- `GamePlayer`: यह टेबल `gameId` से खिलाड़ी के पते तक रिवर्स मैपिंग रखती है।

- `Map`: कुंजी तीन मानों का एक टपल है:

  - `gameId`: 32-बाइट मान जो उस नक्शे का हैश है जिस पर खिलाड़ी खेल रहा है (गेम पहचानकर्ता)।
  - `x` निर्देशांक
  - `y` निर्देशांक

  मान एक एकल संख्या है। यदि बम का पता चला था तो यह 255 है। अन्यथा, यह उस स्थान के आसपास बमों की संख्या प्लस एक है। हम केवल बमों की संख्या का उपयोग नहीं कर सकते, क्योंकि डिफ़ॉल्ट रूप से EVM में सभी स्टोरेज और MUD में सभी पंक्ति मान शून्य होते हैं। हमें "खिलाड़ी ने अभी तक यहां खुदाई नहीं की है" और "खिलाड़ी ने यहां खुदाई की, और पाया कि आसपास शून्य बम हैं" के बीच अंतर करने की आवश्यकता है।

इसके अलावा, क्लाइंट और सर्वर के बीच संचार ऑनचेन घटक के माध्यम से होता है। इसे भी टेबल्स का उपयोग करके लागू किया गया है।

- `PendingGame`: नया गेम शुरू करने के लिए असेवित (Unserviced) अनुरोध।
- `PendingDig`: किसी विशिष्ट गेम में किसी विशिष्ट स्थान पर खुदाई करने के लिए असेवित अनुरोध। यह एक [ऑफचेन टेबल](https://mud.dev/store/tables#types-of-tables) है, जिसका अर्थ है कि इसे EVM स्टोरेज में नहीं लिखा जाता है, यह केवल घटनाएँ का उपयोग करके ऑफचेन पढ़ने योग्य है।

### निष्पादन और डेटा प्रवाह {#execution-data-flows}

ये प्रवाह क्लाइंट, ऑनचेन घटक और सर्वर के बीच निष्पादन का समन्वय करते हैं।

#### आरंभीकरण (Initialization) {#initialization-flow}

जब आप `mprocs` चलाते हैं, तो ये चरण होते हैं:

1. [`mprocs`](https://github.com/pvolok/mprocs) चार घटक चलाता है:

   - [Anvil](https://book.getfoundry.sh/anvil/), जो एक स्थानीय ब्लॉकचेन चलाता है
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), जो MUD के लिए अनुबंधों को संकलित (यदि आवश्यक हो) और तैनात करता है
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), जो वेब ब्राउज़र को UI और क्लाइंट कोड सर्व करने के लिए [Vite](https://vitejs.dev/) चलाता है।
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), जो सर्वर क्रियाएं करता है

2. `contracts` पैकेज MUD अनुबंधों को तैनात करता है और फिर [`PostDeploy.s.sol` स्क्रिप्ट](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) चलाता है। यह स्क्रिप्ट कॉन्फ़िगरेशन सेट करती है। GitHub का कोड [आठ माइन्स के साथ 10x5 माइनफ़ील्ड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) निर्दिष्ट करता है।

3. [सर्वर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD सेट अप](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) करके शुरू होता है। अन्य बातों के अलावा, यह डेटा सिंक्रनाइज़ेशन को सक्रिय करता है, ताकि प्रासंगिक टेबल्स की एक प्रति सर्वर की मेमोरी में मौजूद रहे।

4. सर्वर एक फ़ंक्शन को सब्सक्राइब करता है जिसे [`Configuration` टेबल बदलने पर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) निष्पादित किया जाना है। [यह फ़ंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) `PostDeploy.s.sol` के निष्पादित होने और टेबल को संशोधित करने के बाद कॉल किया जाता है।

5. जब सर्वर आरंभीकरण फ़ंक्शन के पास कॉन्फ़िगरेशन होता है, तो [यह [सर्वर के शून्य-ज्ञान भाग](#using-zokrates-from-typescript) को आरंभ करने के लिए `zkFunctions` को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)। यह तब तक नहीं हो सकता जब तक हमें कॉन्फ़िगरेशन नहीं मिल जाता क्योंकि शून्य-ज्ञान फ़ंक्शंस में माइनफ़ील्ड की चौड़ाई और ऊंचाई स्थिरांक के रूप में होनी चाहिए।

6. सर्वर के शून्य-ज्ञान भाग के आरंभ होने के बाद, अगला कदम [शून्य-ज्ञान सत्यापन अनुबंध को ब्लॉकचेन पर तैनात करना](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) और MUD में सत्यापनकर्ता का पता सेट करना है।

7. अंत में, हम अपडेट्स की सदस्यता लेते हैं ताकि हम देख सकें कि कोई खिलाड़ी कब [नया गेम शुरू करने](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) या [मौजूदा गेम में खुदाई करने](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) का अनुरोध करता है।

#### नया गेम {#new-game-flow}

जब खिलाड़ी नए गेम का अनुरोध करता है तो यह होता है।

1. यदि इस खिलाड़ी के लिए कोई गेम प्रगति पर नहीं है, या कोई गेम है लेकिन उसका gameId शून्य है, तो क्लाइंट एक [नया गेम बटन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) प्रदर्शित करता है। जब उपयोगकर्ता इस बटन को दबाता है, तो [React `newGame` फ़ंक्शन चलाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)।

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) एक `System` कॉल है। MUD में सभी कॉल `World` अनुबंध के माध्यम से रूट किए जाते हैं, और ज्यादातर मामलों में आप `<namespace>__<function name>` को कॉल करते हैं। इस मामले में, कॉल `app__newGame` को की जाती है, जिसे MUD फिर [`GameSystem` में `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) पर रूट करता है।

3. ऑनचेन फ़ंक्शन जांचता है कि खिलाड़ी का कोई गेम प्रगति पर तो नहीं है, और यदि कोई नहीं है तो [अनुरोध को `PendingGame` टेबल में जोड़ता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)।

4. सर्वर `PendingGame` में बदलाव का पता लगाता है और [सब्सक्राइब किए गए फ़ंक्शन को चलाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)। यह फ़ंक्शन [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) को कॉल करता है, जो बदले में [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) को कॉल करता है।

5. `createGame` सबसे पहले [उचित संख्या में माइन्स के साथ एक यादृच्छिक (random) नक्शा बनाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)। फिर, यह खाली सीमाओं वाला नक्शा बनाने के लिए [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) को कॉल करता है, जो Zokrates के लिए आवश्यक है। अंत में, `createGame` नक्शे का हैश प्राप्त करने के लिए [`calculateMapHash`](#calculatemaphash) को कॉल करता है, जिसका उपयोग गेम ID के रूप में किया जाता है।

6. `newGame` फ़ंक्शन नए गेम को `gamesInProgress` में जोड़ता है।

7. सर्वर जो आखिरी काम करता है वह है [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) को कॉल करना, जो ऑनचेन है। एक्सेस कंट्रोल को सक्षम करने के लिए यह फ़ंक्शन एक अलग `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में है। एक्सेस कंट्रोल को [MUD कॉन्फ़िगरेशन फ़ाइल](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) में परिभाषित किया गया है।

   एक्सेस सूची केवल एक पते को `System` कॉल करने की अनुमति देती है। यह सर्वर फ़ंक्शंस तक पहुंच को एक ही पते तक सीमित करता है, ताकि कोई भी सर्वर का रूप धारण न कर सके।

8. ऑनचेन घटक प्रासंगिक टेबल्स को अपडेट करता है:

   - `PlayerGame` में गेम बनाएं।
   - `GamePlayer` में रिवर्स मैपिंग सेट करें।
   - `PendingGame` से अनुरोध हटाएं।

9. सर्वर `PendingGame` में बदलाव की पहचान करता है, लेकिन कुछ नहीं करता क्योंकि [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) गलत (false) है।

10. क्लाइंट पर [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) को खिलाड़ी के पते के लिए `PlayerGame` प्रविष्टि पर सेट किया गया है। जब `PlayerGame` बदलता है, तो `gameRecord` भी बदल जाता है।

11. यदि `gameRecord` में कोई मान है, और गेम जीता या हारा नहीं गया है, तो क्लाइंट [नक्शा प्रदर्शित करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)।

#### खुदाई (Dig) {#dig-flow}

1. खिलाड़ी [मैप सेल के बटन पर क्लिक करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), जो [`dig` फ़ंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) को कॉल करता है। यह फ़ंक्शन ऑनचेन [`dig` को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)।

2. ऑनचेन घटक [कई सैनिटी चेक (sanity checks) करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), और यदि सफल होता है तो खुदाई के अनुरोध को [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) में जोड़ता है।

3. सर्वर [`PendingDig` में बदलाव का पता लगाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)। [यदि यह मान्य है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), तो यह परिणाम और इसके मान्य होने का प्रमाण दोनों उत्पन्न करने के लिए [शून्य-ज्ञान कोड को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (नीचे समझाया गया है)।

4. [सर्वर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ऑनचेन [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) को कॉल करता है।

5. `digResponse` दो काम करता है। सबसे पहले, यह [शून्य-ज्ञान प्रमाण](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) की जांच करता है। फिर, यदि प्रमाण सही पाया जाता है, तो यह वास्तव में परिणाम को प्रोसेस करने के लिए [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) को कॉल करता है।

6. `processDigResult` जांचता है कि गेम [हारा](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) या [जीता](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) गया है या नहीं, और [ऑनचेन मैप, `Map` को अपडेट करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)।

7. क्लाइंट स्वचालित रूप से अपडेट प्राप्त करता है और [खिलाड़ी को प्रदर्शित नक्शे को अपडेट करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), और यदि लागू हो तो खिलाड़ी को बताता है कि यह जीत है या हार।

## Zokrates का उपयोग करना {#using-zokrates}

ऊपर बताए गए प्रवाहों में हमने शून्य-ज्ञान वाले हिस्सों को छोड़ दिया था, और उन्हें एक ब्लैक बॉक्स की तरह माना था। अब आइए इसे खोलें और देखें कि वह कोड कैसे लिखा जाता है।

### मैप की हैशिंग {#hashing-map}

हम [Poseidon](https://www.poseidon-hash.info) को लागू करने के लिए [इस JavaScript कोड](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) का उपयोग कर सकते हैं, जो कि हमारे द्वारा उपयोग किया जाने वाला Zokrates हैश फ़ंक्शन है। हालाँकि, जबकि यह तेज़ होगा, यह इसे करने के लिए केवल Zokrates हैश फ़ंक्शन का उपयोग करने की तुलना में अधिक जटिल भी होगा। यह एक ट्यूटोरियल है, और इसलिए कोड को सरलता के लिए अनुकूलित किया गया है, प्रदर्शन के लिए नहीं। इसलिए, हमें दो अलग-अलग Zokrates प्रोग्राम की आवश्यकता है, एक केवल मैप के हैश की गणना करने के लिए (`hash`) और दूसरा वास्तव में मैप पर किसी स्थान पर खुदाई के परिणाम का शून्य-ज्ञान प्रमाण बनाने के लिए (`dig`)।

### हैश फ़ंक्शन {#hash-function}

यह वह फ़ंक्शन है जो मैप के हैश की गणना करता है। हम इस कोड को लाइन दर लाइन समझेंगे।

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

ये दो लाइनें [Zokrates मानक लाइब्रेरी](https://zokrates.github.io/toolbox/stdlib.html) से दो फ़ंक्शन आयात करती हैं। [पहला फ़ंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) एक [Poseidon हैश](https://www.poseidon-hash.info/) है। यह [`field` तत्वों](https://zokrates.github.io/language/types.html#field) की एक सरणी (array) लेता है और एक `field` लौटाता है।

Zokrates में फ़ील्ड तत्व आमतौर पर 256 बिट्स से कम लंबा होता है, लेकिन बहुत कम नहीं। कोड को सरल बनाने के लिए, हम मैप को 512 बिट्स तक सीमित करते हैं, और चार फ़ील्ड्स की एक सरणी को हैश करते हैं, और प्रत्येक फ़ील्ड में हम केवल 128 बिट्स का उपयोग करते हैं। [`pack128` फ़ंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) इस उद्देश्य के लिए 128 बिट्स की एक सरणी को `field` में बदल देता है।

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

यह लाइन एक फ़ंक्शन परिभाषा शुरू करती है। `hashMap` को `map` नामक एक एकल पैरामीटर मिलता है, जो एक द्वि-आयामी (two-dimensional) `bool`(ean) सरणी है। मैप का आकार `width+2` गुणा `height+2` है, उन कारणों से जिन्हें [नीचे समझाया गया है](#why-map-border)।

हम `${width+2}` और `${height+2}` का उपयोग कर सकते हैं क्योंकि Zokrates प्रोग्राम इस एप्लिकेशन में [टेम्पलेट स्ट्रिंग्स](https://www.w3schools.com/js/js_string_templates.asp) के रूप में संग्रहीत हैं। `${` और `}` के बीच के कोड का मूल्यांकन JavaScript द्वारा किया जाता है, और इस तरह प्रोग्राम का उपयोग विभिन्न मैप आकारों के लिए किया जा सकता है। मैप पैरामीटर के चारों ओर बिना किसी बम के एक स्थान चौड़ी सीमा (border) होती है, यही कारण है कि हमें चौड़ाई और ऊंचाई में दो जोड़ने की आवश्यकता है।

रिटर्न मान एक `field` है जिसमें हैश होता है।

```
bool[512] mut map1d = [false; 512];
```

मैप द्वि-आयामी है। हालाँकि, `pack128` फ़ंक्शन द्वि-आयामी सरणियों के साथ काम नहीं करता है। इसलिए हम पहले `map1d` का उपयोग करके मैप को 512-बाइट सरणी में समतल (flatten) करते हैं। डिफ़ॉल्ट रूप से Zokrates चर (variables) स्थिरांक (constants) होते हैं, लेकिन हमें एक लूप में इस सरणी को मान निर्दिष्ट करने की आवश्यकता है, इसलिए हम इसे [`mut`](https://zokrates.github.io/language/variables.html#mutability) के रूप में परिभाषित करते हैं।

हमें सरणी को इनिशियलाइज़ करने की आवश्यकता है क्योंकि Zokrates में `undefined` नहीं है। `[false; 512]` अभिव्यक्ति का अर्थ है [512 `false` मानों की एक सरणी](https://zokrates.github.io/language/types.html#declaration-and-initialization)।

```
u32 mut counter = 0;
```

हमें उन बिट्स के बीच अंतर करने के लिए एक काउंटर की भी आवश्यकता है जिन्हें हमने पहले ही `map1d` में भर दिया है और जिन्हें हमने नहीं भरा है।

```
for u32 x in 0..${width+2} {
```

इस तरह आप Zokrates में एक [`for` लूप](https://zokrates.github.io/language/control_flow.html#for-loops) घोषित करते हैं। एक Zokrates `for` लूप की सीमाएँ निश्चित होनी चाहिए, क्योंकि भले ही यह एक लूप प्रतीत होता है, कंपाइलर वास्तव में इसे "अनरोल" (unroll) करता है। अभिव्यक्ति `${width+2}` एक कंपाइल टाइम स्थिरांक है क्योंकि कंपाइलर को कॉल करने से पहले TypeScript कोड द्वारा `width` सेट किया जाता है।

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

मैप में प्रत्येक स्थान के लिए, उस मान को `map1d` सरणी में रखें और काउंटर को बढ़ाएँ।

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` से चार `field` मानों की एक सरणी बनाने के लिए `pack128` का उपयोग किया जाता है। Zokrates में `array[a..b]` का अर्थ सरणी का वह स्लाइस (slice) है जो `a` से शुरू होता है और `b-1` पर समाप्त होता है।

```
return poseidon(hashMe);
}
```

इस सरणी को हैश में बदलने के लिए `poseidon` का उपयोग करें।

### हैश प्रोग्राम {#hash-program}

गेम पहचानकर्ता (identifiers) बनाने के लिए सर्वर को सीधे `hashMap` को कॉल करने की आवश्यकता होती है। हालाँकि, Zokrates शुरू करने के लिए किसी प्रोग्राम पर केवल `main` फ़ंक्शन को कॉल कर सकता है, इसलिए हम एक `main` के साथ एक प्रोग्राम बनाते हैं जो हैश फ़ंक्शन को कॉल करता है।

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### डिग (खुदाई) प्रोग्राम {#dig-program}

यह एप्लिकेशन के शून्य-ज्ञान वाले हिस्से का मुख्य भाग है, जहाँ हम वे प्रमाण तैयार करते हैं जिनका उपयोग खुदाई के परिणामों को सत्यापित करने के लिए किया जाता है।

```
${hashFragment}

// स्थान (x,y) में खदानों की संख्या
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### मैप बॉर्डर क्यों {#why-map-border}

शून्य-ज्ञान प्रमाण [अंकगणितीय सर्किट (arithmetic circuits)](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) का उपयोग करते हैं, जिनका `if` कथन के समान कोई आसान विकल्प नहीं है। इसके बजाय, वे [सशर्त ऑपरेटर (conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) के समतुल्य का उपयोग करते हैं। यदि `a` शून्य या एक हो सकता है, तो आप `if a { b } else { c }` की गणना `ab+(1-a)c` के रूप में कर सकते हैं।

इस कारण से, एक Zokrates `if` कथन हमेशा दोनों शाखाओं का मूल्यांकन करता है। उदाहरण के लिए, यदि आपके पास यह कोड है:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

यह त्रुटि (error) देगा, क्योंकि इसे `arr[10]` की गणना करने की आवश्यकता है, भले ही उस मान को बाद में शून्य से गुणा किया जाएगा।

यही कारण है कि हमें मैप के चारों ओर एक स्थान चौड़ी सीमा की आवश्यकता है। हमें किसी स्थान के चारों ओर खदानों (mines) की कुल संख्या की गणना करने की आवश्यकता है, और इसका मतलब है कि हमें उस स्थान के एक पंक्ति ऊपर और नीचे, बाएँ और दाएँ देखना होगा जहाँ हम खुदाई कर रहे हैं। जिसका अर्थ है कि वे स्थान उस मैप सरणी में मौजूद होने चाहिए जो Zokrates को प्रदान की गई है।

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

डिफ़ॉल्ट रूप से Zokrates प्रमाणों में उनके इनपुट शामिल होते हैं। यह जानना कोई काम का नहीं है कि किसी स्थान के आसपास पाँच खदानें हैं जब तक कि आप वास्तव में यह न जानें कि वह कौन सा स्थान है (और आप इसे केवल अपने अनुरोध से मेल नहीं करा सकते, क्योंकि तब प्रमाणक (prover) अलग-अलग मानों का उपयोग कर सकता है और आपको इसके बारे में नहीं बता सकता है)। हालाँकि, हमें Zokrates को प्रदान करते समय मैप को गुप्त रखने की आवश्यकता है। इसका समाधान एक `private` पैरामीटर का उपयोग करना है, जो प्रमाण द्वारा प्रकट _नहीं_ किया जाता है।

यह दुरुपयोग के लिए एक और रास्ता खोलता है। प्रमाणक सही निर्देशांक (coordinates) का उपयोग कर सकता है, लेकिन स्थान के चारों ओर, और संभवतः स्थान पर ही किसी भी संख्या में खदानों के साथ एक मैप बना सकता है। इस दुरुपयोग को रोकने के लिए, हम शून्य-ज्ञान प्रमाण में मैप का हैश शामिल करते हैं, जो कि गेम पहचानकर्ता है।

```
return (hashMap(map),
```

यहाँ रिटर्न मान एक टपल (tuple) है जिसमें मैप हैश सरणी के साथ-साथ खुदाई का परिणाम भी शामिल है।

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

यदि स्थान पर ही बम है, तो हम एक विशेष मान के रूप में 255 का उपयोग करते हैं।

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

यदि खिलाड़ी किसी खदान से नहीं टकराया है, तो स्थान के आस-पास के क्षेत्र के लिए खदानों की संख्या जोड़ें और उसे लौटाएँ।

### TypeScript से Zokrates का उपयोग करना {#using-zokrates-from-typescript}

Zokrates में एक कमांड लाइन इंटरफ़ेस है, लेकिन इस प्रोग्राम में हम इसका उपयोग [TypeScript कोड](https://zokrates.github.io/toolbox/zokrates_js.html) में करते हैं।

वह लाइब्रेरी जिसमें Zokrates परिभाषाएँ शामिल हैं, उसे [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) कहा जाता है।

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript बाइंडिंग](https://zokrates.github.io/toolbox/zokrates_js.html) आयात करें। हमें केवल [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) फ़ंक्शन की आवश्यकता है क्योंकि यह एक प्रॉमिस (promise) लौटाता है जो सभी Zokrates परिभाषाओं को रिज़ॉल्व करता है।

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

स्वयं Zokrates के समान, हम भी केवल एक फ़ंक्शन निर्यात करते हैं, जो [एसिंक्रोनस (asynchronous)](https://www.w3schools.com/js/js_async.asp) भी है। जब यह अंततः वापस आता है, तो यह कई फ़ंक्शन प्रदान करता है जैसा कि हम नीचे देखेंगे।

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates को इनिशियलाइज़ करें, लाइब्रेरी से वह सब कुछ प्राप्त करें जिसकी हमें आवश्यकता है।

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

इसके बाद हमारे पास हैश फ़ंक्शन और दो Zokrates प्रोग्राम हैं जिन्हें हमने ऊपर देखा था।

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

यहाँ हम उन प्रोग्रामों को संकलित (compile) करते हैं।

```typescript
// शून्य-ज्ञान सत्यापन के लिए कुंजियाँ बनाएँ।
// प्रोडक्शन सिस्टम पर आप एक सेटअप समारोह का उपयोग करना चाहेंगे।
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

एक उत्पादन (production) प्रणाली पर हम अधिक जटिल [सेटअप समारोह (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) का उपयोग कर सकते हैं, लेकिन यह प्रदर्शन के लिए काफी अच्छा है। यह कोई समस्या नहीं है कि उपयोगकर्ता प्रमाणक कुंजी (prover key) जान सकते हैं - वे अभी भी इसका उपयोग चीजों को साबित करने के लिए नहीं कर सकते जब तक कि वे सत्य न हों। क्योंकि हम एन्ट्रोपी (दूसरा पैरामीटर, `""`) निर्दिष्ट करते हैं, परिणाम हमेशा समान होने वाले हैं।

**नोट:** Zokrates प्रोग्राम का संकलन और कुंजी निर्माण धीमी प्रक्रियाएँ हैं। उन्हें हर बार दोहराने की आवश्यकता नहीं है, केवल तब जब मैप का आकार बदलता है। एक उत्पादन प्रणाली पर आप उन्हें एक बार करेंगे, और फिर आउटपुट को संग्रहीत करेंगे। यहाँ मैं ऐसा नहीं कर रहा हूँ, इसका एकमात्र कारण सरलता है।

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) फ़ंक्शन वास्तव में Zokrates प्रोग्राम चलाता है। यह दो फ़ील्ड्स के साथ एक संरचना (structure) लौटाता है: `output`, जो JSON स्ट्रिंग के रूप में प्रोग्राम का आउटपुट है, और `witness`, जो परिणाम का शून्य-ज्ञान प्रमाण बनाने के लिए आवश्यक जानकारी है। यहाँ हमें केवल आउटपुट की आवश्यकता है।

आउटपुट `"31337"` के रूप में एक स्ट्रिंग है, जो उद्धरण चिह्नों (quotation marks) में संलग्न एक दशमलव संख्या है। लेकिन `viem` के लिए हमें जो आउटपुट चाहिए वह `0x60A7` के रूप में एक हेक्साडेसिमल संख्या है। इसलिए हम उद्धरण चिह्नों को हटाने के लिए `.slice(1,-1)` का उपयोग करते हैं और फिर शेष स्ट्रिंग, जो एक दशमलव संख्या है, को [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) में चलाने के लिए `BigInt` का उपयोग करते हैं। `.toString(16)` इस `BigInt` को हेक्साडेसिमल स्ट्रिंग में परिवर्तित करता है, और `"0x"+` हेक्साडेसिमल संख्याओं के लिए मार्कर जोड़ता है।

```typescript
// खोदें और परिणाम का एक शून्य-ज्ञान प्रमाण लौटाएँ
// (सर्वर-साइड कोड)
```

शून्य-ज्ञान प्रमाण में सार्वजनिक इनपुट (`x` और `y`) और परिणाम (मैप का हैश और बमों की संख्या) शामिल हैं।

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates में यह जाँचना एक समस्या है कि क्या कोई सूचकांक (index) सीमा से बाहर है, इसलिए हम इसे यहाँ करते हैं।

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

डिग प्रोग्राम निष्पादित (execute) करें।

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) का उपयोग करें और प्रमाण लौटाएँ।

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

एक Solidity सत्यापनकर्ता, एक स्मार्ट अनुबंध जिसे हम ब्लॉकचेन पर तैनात कर सकते हैं और `digCompiled.program` द्वारा उत्पन्न प्रमाणों को सत्यापित करने के लिए उपयोग कर सकते हैं।

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

अंत में, वह सब कुछ लौटाएँ जिसकी अन्य कोड को आवश्यकता हो सकती है।

## सुरक्षा परीक्षण {#security-tests}

सुरक्षा परीक्षण महत्वपूर्ण हैं क्योंकि कार्यक्षमता से जुड़ा बग अंततः सामने आ ही जाता है। लेकिन अगर एप्लिकेशन असुरक्षित है, तो यह संभवतः लंबे समय तक छिपा रहेगा, जब तक कि कोई धोखाधड़ी करके दूसरों के संसाधनों को चुराकर इसे उजागर न कर दे।

### अनुमतियाँ {#permissions}

इस गेम में एक विशेषाधिकार प्राप्त इकाई है, सर्वर। यह एकमात्र उपयोगकर्ता है जिसे [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में फ़ंक्शंस को कॉल करने की अनुमति है। हम यह सत्यापित करने के लिए [`cast`](https://book.getfoundry.sh/cast/) का उपयोग कर सकते हैं कि अनुमति-प्राप्त (permissioned) फ़ंक्शंस पर कॉल केवल सर्वर खाते के रूप में ही अनुमत हैं।

[सर्वर की निजी कुंजी `setupNetwork.ts` में है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)।

1. उस कंप्यूटर पर जो `anvil` (ब्लॉकचेन) चलाता है, इन एनवायरनमेंट वेरिएबल्स को सेट करें।

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. सत्यापनकर्ता के पते को एक अनधिकृत पते के रूप में सेट करने का प्रयास करने के लिए `cast` का उपयोग करें।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   न केवल `cast` विफलता की रिपोर्ट करता है, बल्कि आप ब्राउज़र पर गेम में **MUD Dev Tools** खोल सकते हैं, **Tables** पर क्लिक कर सकते हैं, और **app\_\_VerifierAddress** का चयन कर सकते हैं। देखें कि पता शून्य नहीं है।

3. सत्यापनकर्ता के पते को सर्वर के पते के रूप में सेट करें।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** में पता अब शून्य होना चाहिए।

एक ही `System` में सभी MUD फ़ंक्शंस समान एक्सेस कंट्रोल से होकर गुजरते हैं, इसलिए मैं इस परीक्षण को पर्याप्त मानता हूँ। यदि आप ऐसा नहीं मानते हैं, तो आप [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में अन्य फ़ंक्शंस की जांच कर सकते हैं।

### शून्य-ज्ञान का दुरुपयोग {#zero-knowledge-abuses}

Zokrates को सत्यापित करने का गणित इस ट्यूटोरियल के दायरे (और मेरी क्षमताओं) से बाहर है। हालाँकि, हम शून्य-ज्ञान कोड पर विभिन्न जाँचें चला सकते हैं ताकि यह सत्यापित किया जा सके कि यदि इसे सही ढंग से नहीं किया गया है तो यह विफल हो जाता है। इन सभी परीक्षणों के लिए हमें [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) को बदलने और पूरे एप्लिकेशन को पुनरारंभ करने की आवश्यकता होगी। केवल सर्वर प्रक्रिया को पुनरारंभ करना पर्याप्त नहीं है, क्योंकि यह एप्लिकेशन को एक असंभव स्थिति में डाल देता है (खिलाड़ी का गेम प्रगति पर है, लेकिन गेम अब सर्वर के लिए उपलब्ध नहीं है)।

#### गलत उत्तर {#wrong-answer}

सबसे सरल संभावना शून्य-ज्ञान प्रमाण में गलत उत्तर प्रदान करना है। ऐसा करने के लिए, हम `zkDig` के अंदर जाते हैं और [लाइन 91 को संशोधित करते हैं](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

इसका मतलब है कि हम हमेशा दावा करेंगे कि एक बम है, चाहे सही उत्तर कुछ भी हो। इस संस्करण के साथ खेलने का प्रयास करें, और आप `pnpm dev` स्क्रीन के **server** टैब में यह त्रुटि देखेंगे:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

तो इस तरह की धोखाधड़ी विफल हो जाती है।

#### गलत प्रमाण {#wrong-proof}

क्या होगा यदि हम सही जानकारी प्रदान करते हैं, लेकिन हमारे पास गलत प्रमाण डेटा है? अब, लाइन 91 को इससे बदलें:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

यह अभी भी विफल रहता है, लेकिन अब यह बिना किसी कारण के विफल होता है क्योंकि यह सत्यापनकर्ता कॉल के दौरान होता है।

### कोई उपयोगकर्ता शून्य-विश्वास (zero trust) कोड को कैसे सत्यापित कर सकता है? {#user-verify-zero-trust}

स्मार्ट अनुबंधों को सत्यापित करना अपेक्षाकृत आसान है। आमतौर पर, डेवलपर स्रोत कोड को एक ब्लॉक एक्सप्लोरर पर प्रकाशित करता है, और ब्लॉक एक्सप्लोरर यह सत्यापित करता है कि स्रोत कोड [अनुबंध तैनाती लेन-देन](/developers/docs/smart-contracts/deploying/) में मौजूद कोड में संकलित (compile) होता है। MUD `System` के मामले में यह [थोड़ा अधिक जटिल](https://mud.dev/cli/verify) है, लेकिन बहुत अधिक नहीं।

शून्य-ज्ञान के साथ यह कठिन है। सत्यापनकर्ता में कुछ स्थिरांक (constants) शामिल होते हैं और वह उन पर कुछ गणनाएँ चलाता है। इससे आपको यह पता नहीं चलता कि क्या प्रमाणित किया जा रहा है।

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

इसका समाधान, कम से कम तब तक जब तक ब्लॉक एक्सप्लोरर अपने यूजर इंटरफेस में Zokrates सत्यापन को नहीं जोड़ लेते, यह है कि एप्लिकेशन डेवलपर्स Zokrates प्रोग्राम उपलब्ध कराएं, और कम से कम कुछ उपयोगकर्ता उचित सत्यापन कुंजी के साथ उन्हें स्वयं संकलित करें।

ऐसा करने के लिए:

1. [Zokrates इंस्टॉल करें](https://zokrates.github.io/gettingstarted.html)।
2. Zokrates प्रोग्राम के साथ एक फ़ाइल, `dig.zok` बनाएँ। नीचे दिया गया कोड यह मानकर चलता है कि आपने मूल मैप का आकार 10x5 रखा है।

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates कोड को संकलित करें और सत्यापन कुंजी बनाएँ। सत्यापन कुंजी को उसी एन्ट्रोपी के साथ बनाया जाना चाहिए जिसका उपयोग मूल सर्वर में किया गया था, [इस मामले में एक खाली स्ट्रिंग](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)।

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. अपने आप Solidity सत्यापनकर्ता बनाएँ, और सत्यापित करें कि यह कार्यात्मक रूप से ब्लॉकचेन पर मौजूद सत्यापनकर्ता के समान है (सर्वर एक टिप्पणी जोड़ता है, लेकिन वह महत्वपूर्ण नहीं है)।

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## डिज़ाइन निर्णय {#design}

किसी भी पर्याप्त रूप से जटिल एप्लिकेशन में प्रतिस्पर्धी डिज़ाइन लक्ष्य होते हैं जिनके लिए समझौते (trade-offs) की आवश्यकता होती है। आइए कुछ समझौतों पर नज़र डालें और देखें कि वर्तमान समाधान अन्य विकल्पों की तुलना में बेहतर क्यों है।

### शून्य-ज्ञान क्यों {#why-zero-knowledge}

माइनस्वीपर (minesweeper) के लिए आपको वास्तव में शून्य-ज्ञान की आवश्यकता नहीं है। सर्वर हमेशा मैप को अपने पास रख सकता है, और फिर गेम खत्म होने पर उसे पूरी तरह से प्रकट कर सकता है। फिर, गेम के अंत में, स्मार्ट अनुबंध मैप हैश की गणना कर सकता है, सत्यापित कर सकता है कि यह मेल खाता है, और यदि यह मेल नहीं खाता है तो सर्वर को दंडित कर सकता है या गेम को पूरी तरह से अनदेखा कर सकता है।

मैंने इस सरल समाधान का उपयोग नहीं किया क्योंकि यह केवल अच्छी तरह से परिभाषित अंतिम स्थिति वाले छोटे गेम के लिए काम करता है। जब कोई गेम संभावित रूप से अनंत होता है (जैसे कि [स्वायत्त दुनिया (autonomous worlds)](https://0xparc.org/blog/autonomous-worlds) के मामले में), तो आपको एक ऐसे समाधान की आवश्यकता होती है जो स्थिति को प्रकट किए _बिना_ उसे प्रमाणित करे।

एक ट्यूटोरियल के रूप में इस लेख को एक छोटे गेम की आवश्यकता थी जिसे समझना आसान हो, लेकिन यह तकनीक लंबे गेम के लिए सबसे उपयोगी है।

### Zokrates क्यों? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) उपलब्ध एकमात्र शून्य-ज्ञान लाइब्रेरी नहीं है, लेकिन यह एक सामान्य, [इम्परेटिव (imperative)](https://en.wikipedia.org/wiki/Imperative_programming) प्रोग्रामिंग भाषा के समान है और बूलियन (boolean) चर का समर्थन करती है।

अपने एप्लिकेशन के लिए, विभिन्न आवश्यकताओं के साथ, आप [Circum](https://docs.circom.io/getting-started/installation/) या [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) का उपयोग करना पसंद कर सकते हैं।

### Zokrates को कब संकलित (compile) करें {#when-compile-zokrates}

इस प्रोग्राम में हम Zokrates प्रोग्राम को [हर बार सर्वर शुरू होने पर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) संकलित करते हैं। यह स्पष्ट रूप से संसाधनों की बर्बादी है, लेकिन यह एक ट्यूटोरियल है, जिसे सरलता के लिए अनुकूलित किया गया है।

यदि मैं एक उत्पादन-स्तर (production-level) का एप्लिकेशन लिख रहा होता, तो मैं जांचता कि क्या मेरे पास इस माइनफ़ील्ड आकार पर संकलित Zokrates प्रोग्राम वाली कोई फ़ाइल है, और यदि ऐसा है तो उसका उपयोग करता। ऑनचेन सत्यापनकर्ता अनुबंध तैनात करने के लिए भी यही बात लागू होती है।

### सत्यापनकर्ता और प्रमाणक कुंजियाँ बनाना {#key-creation}

[कुंजी निर्माण](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) एक और शुद्ध गणना है जिसे किसी दिए गए माइनफ़ील्ड आकार के लिए एक से अधिक बार करने की आवश्यकता नहीं है। फिर से, सरलता के लिए इसे केवल एक बार किया जाता है।

इसके अतिरिक्त, हम [एक सेटअप समारोह (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) का उपयोग कर सकते हैं। सेटअप समारोह का लाभ यह है कि शून्य-ज्ञान प्रमाण पर धोखा देने के लिए आपको प्रत्येक प्रतिभागी से एन्ट्रोपी या कुछ मध्यवर्ती परिणाम की आवश्यकता होती है। यदि कम से कम एक समारोह प्रतिभागी ईमानदार है और उस जानकारी को हटा देता है, तो शून्य-ज्ञान प्रमाण कुछ हमलों से सुरक्षित हैं। हालाँकि, यह सत्यापित करने के लिए _कोई तंत्र नहीं_ है कि जानकारी हर जगह से हटा दी गई है। यदि शून्य-ज्ञान प्रमाण गंभीर रूप से महत्वपूर्ण हैं, तो आप सेटअप समारोह में भाग लेना चाहेंगे।

यहाँ हम [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) पर भरोसा करते हैं, जिसमें दर्जनों प्रतिभागी थे। यह शायद काफी सुरक्षित है, और बहुत सरल है। हम कुंजी निर्माण के दौरान एन्ट्रोपी भी नहीं जोड़ते हैं, जिससे उपयोगकर्ताओं के लिए [शून्य-ज्ञान कॉन्फ़िगरेशन को सत्यापित करना](#user-verify-zero-trust) आसान हो जाता है।

### कहाँ सत्यापित करें {#where-verification}

हम शून्य-ज्ञान प्रमाणों को या तो ऑनचेन (जिसमें गैस खर्च होती है) या क्लाइंट में ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) का उपयोग करके) सत्यापित कर सकते हैं। मैंने पहला चुना, क्योंकि यह आपको एक बार [सत्यापनकर्ता को सत्यापित करने](#user-verify-zero-trust) देता है और फिर भरोसा करता है कि यह तब तक नहीं बदलता जब तक कि इसके लिए अनुबंध का पता समान रहता है। यदि सत्यापन क्लाइंट पर किया गया था, तो आपको हर बार क्लाइंट डाउनलोड करने पर प्राप्त होने वाले कोड को सत्यापित करना होगा।

इसके अलावा, जबकि यह गेम सिंगल प्लेयर है, बहुत सारे ब्लॉकचेन गेम मल्टी-प्लेयर हैं। ऑनचेन सत्यापन का मतलब है कि आप केवल एक बार शून्य-ज्ञान प्रमाण को सत्यापित करते हैं। इसे क्लाइंट में करने के लिए प्रत्येक क्लाइंट को स्वतंत्र रूप से सत्यापित करने की आवश्यकता होगी।

### TypeScript या Zokrates में मैप को समतल (Flatten) करें? {#where-flatten}

सामान्य तौर पर, जब प्रोसेसिंग TypeScript या Zokrates दोनों में की जा सकती है, तो इसे TypeScript में करना बेहतर होता है, जो बहुत तेज़ है, और इसके लिए शून्य-ज्ञान प्रमाणों की आवश्यकता नहीं होती है। उदाहरण के लिए, यही कारण है कि हम Zokrates को हैश प्रदान नहीं करते हैं और इसे सत्यापित नहीं कराते हैं कि यह सही है। हैशिंग Zokrates के अंदर की जानी चाहिए, लेकिन लौटाए गए हैश और ऑनचेन हैश के बीच का मिलान इसके बाहर हो सकता है।

हालाँकि, हम अभी भी [Zokrates में मैप को समतल करते हैं](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), जबकि हम इसे TypeScript में कर सकते थे। इसका कारण यह है कि अन्य विकल्प, मेरी राय में, बदतर हैं।

- Zokrates कोड को बूलियन का एक आयामी (one dimensional) ऐरे प्रदान करें, और दो आयामी (two dimensional) मैप प्राप्त करने के लिए `x*(height+2)
+y` जैसे व्यंजक (expression) का उपयोग करें। यह [कोड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) को कुछ अधिक जटिल बना देगा, इसलिए मैंने तय किया कि ट्यूटोरियल के लिए प्रदर्शन लाभ इसके लायक नहीं है।

- Zokrates को एक आयामी ऐरे और दो आयामी ऐरे दोनों भेजें। हालाँकि, इस समाधान से हमें कुछ हासिल नहीं होता है। Zokrates कोड को यह सत्यापित करना होगा कि उसे प्रदान किया गया एक आयामी ऐरे वास्तव में दो आयामी ऐरे का सही प्रतिनिधित्व है। इसलिए कोई प्रदर्शन लाभ नहीं होगा।

- Zokrates में दो आयामी ऐरे को समतल करें। यह सबसे सरल विकल्प है, इसलिए मैंने इसे चुना।

### मैप्स को कहाँ स्टोर करें {#where-store-maps}

इस एप्लिकेशन में [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) मेमोरी में केवल एक चर (variable) है। इसका मतलब है कि यदि आपका सर्वर बंद हो जाता है और उसे फिर से शुरू करने की आवश्यकता होती है, तो उसके द्वारा संग्रहीत सभी जानकारी खो जाती है। न केवल खिलाड़ी अपना गेम जारी रखने में असमर्थ होते हैं, बल्कि वे एक नया गेम भी शुरू नहीं कर सकते क्योंकि ऑनचेन घटक सोचता है कि उनका गेम अभी भी प्रगति पर है।

यह स्पष्ट रूप से एक उत्पादन प्रणाली (production system) के लिए खराब डिज़ाइन है, जिसमें आप इस जानकारी को डेटाबेस में संग्रहीत करेंगे। मैंने यहाँ एक चर का उपयोग केवल इसलिए किया है क्योंकि यह एक ट्यूटोरियल है और सरलता मुख्य विचार है।

## निष्कर्ष: किन परिस्थितियों में यह उचित तकनीक है? {#conclusion}

तो, अब आप जानते हैं कि एक ऐसे सर्वर के साथ गेम कैसे लिखा जाता है जो गुप्त स्थिति को संग्रहीत करता है जिसे ऑनचेन नहीं होना चाहिए। लेकिन आपको ऐसा किन मामलों में करना चाहिए? इसके दो मुख्य विचार हैं।

- _लंबे समय तक चलने वाला गेम_: [जैसा कि ऊपर बताया गया है](#why-zero-knowledge), एक छोटे गेम में आप गेम खत्म होने के बाद स्थिति को प्रकाशित कर सकते हैं और फिर सब कुछ सत्यापित करवा सकते हैं। लेकिन जब गेम में लंबा या अनिश्चित समय लगता है, और स्थिति को गुप्त रखने की आवश्यकता होती है, तो यह कोई विकल्प नहीं है।

- _कुछ केंद्रीकरण स्वीकार्य_: शून्य-ज्ञान प्रमाण अखंडता को सत्यापित कर सकते हैं, कि कोई इकाई परिणामों में हेरफेर नहीं कर रही है। वे यह सुनिश्चित नहीं कर सकते कि इकाई अभी भी उपलब्ध होगी और संदेश का उत्तर देगी। ऐसी स्थितियों में जहां उपलब्धता को भी विकेंद्रीकृत करने की आवश्यकता होती है, शून्य-ज्ञान प्रमाण पर्याप्त समाधान नहीं हैं, और आपको [बहु-पक्षीय गणना (multi-party computation)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) की आवश्यकता होती है।

[मेरे और काम के लिए यहां देखें](https://cryptodocguy.pro/)।

### आभार {#acknowledgements}

- Alvaro Alonso ने इस लेख का एक ड्राफ्ट पढ़ा और Zokrates के बारे में मेरी कुछ गलतफहमियों को दूर किया।

शेष बची कोई भी त्रुटि मेरी जिम्मेदारी है।