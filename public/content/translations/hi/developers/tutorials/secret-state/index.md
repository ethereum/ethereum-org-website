---
title: एक गुप्त स्टेट के लिए ज़ीरो-नॉलेज का उपयोग
description: ऑन-चेन गेम सीमित हैं क्योंकि वे कोई भी छिपी हुई जानकारी नहीं रख सकते हैं। इस ट्यूटोरियल को पढ़ने के बाद, एक पाठक एक गुप्त स्टेट, ऑफ़-चेन, कंपोनेंट के साथ सत्यापन योग्य गेम बनाने के लिए शून्य ज्ञान प्रमाण और सर्वर कंपोनेंट को संयोजित करने में सक्षम होगा। ऐसा करने की तकनीक को एक माइनस्वीपर गेम बनाकर प्रदर्शित किया जाएगा।
author: ओरी पोमेरेन्ट्ज़
tags:
  [
    "सर्वर",
    "ऑफ-चेन",
    "केंद्रीकृत",
    "ज़ीरो-नॉलेज",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: hi
published: 2025-03-15
---

यह कई मामलों में महत्वपूर्ण है, लेकिन यहां नहीं।ब्लॉकचेन पर कोई रहस्य नहीं हैं। ब्लॉकचेन पर पोस्ट की गई हर चीज़ हर किसी के पढ़ने के लिए खुली है। यह आवश्यक है, क्योंकि ब्लॉकचेन इस पर आधारित है कि कोई भी इसे सत्यापित कर सकता है। हालांकि, गेम अक्सर गुप्त स्टेट पर निर्भर करते हैं। उदाहरण के लिए, [माइनस्वीपर](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) गेम का कोई मतलब नहीं है अगर आप बस ब्लॉकचेन एक्सप्लोरर पर जाकर मैप देख सकते हैं।

सबसे सरल समाधान गुप्त स्टेट को रखने के लिए एक [सर्वर कंपोनेंट](/developers/tutorials/server-components/) का उपयोग करना है। हालांकि, हम ब्लॉकचेन का उपयोग गेम डेवलपर द्वारा धोखाधड़ी को रोकने के लिए करते हैं। हमें सर्वर कंपोनेंट की ईमानदारी सुनिश्चित करने की आवश्यकता है। सर्वर स्टेट का हैश प्रदान कर सकता है, और यह साबित करने के लिए [शून्य ज्ञान प्रमाण](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) का उपयोग कर सकता है कि एक चाल के परिणाम की गणना के लिए उपयोग किया गया स्टेट सही है।

इस लेख को पढ़ने के बाद आप जानेंगे कि इस तरह का सीक्रेट स्टेट होल्डिंग सर्वर, स्टेट दिखाने के लिए एक क्लाइंट और दोनों के बीच संचार के लिए एक ऑन-चेन कंपोनेंट कैसे बनाया जाए। मुख्य उपकरण जिनका हम उपयोग करेंगे वे हैं:

| उपकरण                                         | उद्देश्य                                        |                     संस्करण पर सत्यापित |
| --------------------------------------------- | ----------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | शून्य ज्ञान प्रमाण और उनका सत्यापन              |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | सर्वर और क्लाइंट दोनों के लिए प्रोग्रामिंग भाषा |   5.4.2 |
| [Node](https://nodejs.org/en)                 | सर्वर चलाना                                     | 20.18.2 |
| [Viem](https://viem.sh/)                      | ब्लॉकचेन के साथ संचार                           |  2.9.20 |
| [MUD](https://mud.dev/)                       | ऑन-चेन डेटा प्रबंधन                             |  2.0.12 |
| [React](https://react.dev/)                   | क्लाइंट यूज़र इंटरफ़ेस                          |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | क्लाइंट कोड सर्व करना                           |   4.2.1 |

## माइनस्वीपर उदाहरण {#minesweeper}

[माइनस्वीपर](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) एक ऐसा गेम है जिसमें माइनफील्ड वाला एक गुप्त नक्शा होता है। खिलाड़ी एक विशिष्ट स्थान पर खुदाई करना चुनता है। यदि उस स्थान पर कोई माइन है, तो खेल खत्म। अन्यथा, खिलाड़ी को उस स्थान के आसपास के आठ चौकों में माइन की संख्या मिलती है।

यह एप्लिकेशन [MUD](https://mud.dev/), का उपयोग करके लिखा गया है, एक फ्रेमवर्क जो हमें [की-वैल्यू डेटाबेस](https://aws.amazon.com/nosql/key-value/) का उपयोग करके ऑन-चेन डेटा स्टोर करने और उस डेटा को ऑफ-चेन घटकों के साथ स्वचालित रूप से सिंक्रनाइज़ करने देता है। सिंक्रोनाइज़ेशन के अलावा, MUD एक्सेस कंट्रोल प्रदान करना आसान बनाता है, और अन्य यूज़र्स के लिए हमारे एप्लिकेशन को बिना अनुमति के [विस्तार](https://mud.dev/guides/extending-a-world) करना आसान बनाता है।

### माइनस्वीपर उदाहरण चलाना {#running-minesweeper-example}

माइनस्वीपर उदाहरण चलाने के लिए:

1. सुनिश्चित करें कि आपने [पूर्वापेक्षाएँ इंस्टॉल कर ली हैं](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), और [`mprocs`](https://github.com/pvolok/mprocs)।

2. रिपॉजिटरी को क्लोन करें।

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. पैकेज इंस्टॉल करें।

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   यदि `pnpm install` के हिस्से के रूप में Foundry इंस्टॉल किया गया था, तो आपको कमांड-लाइन शेल को पुनरारंभ करने की आवश्यकता है।

4. कॉन्ट्रैक्ट्स को संकलित करें

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. प्रोग्राम शुरू करें ([anvil](https://book.getfoundry.sh/anvil/) ब्लॉकचेन सहित) और प्रतीक्षा करें।

   ```sh copy
   mprocs
   ```

   ध्यान दें कि स्टार्टअप में लंबा समय लगता है। _contracts_ टैब पर स्क्रॉल करने के लिए पहले डाउन एरो का उपयोग करें ताकि MUD कॉन्ट्रैक्ट्स को डिप्लॉय होते देखा जा सके। जब आपको _Waiting for file changes…_ संदेश मिलता है, तो कॉन्ट्रैक्ट्स डिप्लॉय हो जाते हैं और आगे की प्रगति _server_ टैब में होगी। वहां, आप तब तक प्रतीक्षा करते हैं जब तक आपको _Verifier address: 0x...._ संदेश नहीं मिल जाता।

   यदि यह चरण सफल होता है, तो आप `mprocs` स्क्रीन देखेंगे, जिसमें बाईं ओर विभिन्न प्रक्रियाएं और दाईं ओर वर्तमान में चयनित प्रक्रिया के लिए कंसोल आउटपुट होगा।

   ![mprocs स्क्रीन](./mprocs.png)

   यदि `mprocs` के साथ कोई समस्या है, तो आप चार प्रक्रियाओं को मैन्युअल रूप से चला सकते हैं, प्रत्येक अपनी कमांड लाइन विंडो में:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **कॉन्ट्रैक्ट्स**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **सर्वर**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **क्लाइंट**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. अब आप [क्लाइंट](http://localhost:3000) पर ब्राउज़ कर सकते हैं, **नया गेम** पर क्लिक करें और खेलना शुरू करें।

### टेबल्स {#tables}

हमें ऑन-चेन पर [कई टेबल्स](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) की आवश्यकता है।

- `Configuration`: यह टेबल एक सिंगलटन है, इसमें कोई की (key) और सिंगल रिकॉर्ड नहीं है। इसका उपयोग गेम कॉन्फ़िगरेशन जानकारी रखने के लिए किया जाता है:
  - `height`: माइनफील्ड की ऊंचाई
  - `width`: माइनफील्ड की चौड़ाई
  - `numberOfBombs`: प्रत्येक माइनफील्ड में बमों की संख्या

- `VerifierAddress`: यह टेबल भी एक सिंगलटन है। इसका उपयोग कॉन्फ़िगरेशन के एक हिस्से को रखने के लिए किया जाता है, जो वेरिफायर कॉन्ट्रैक्ट (`verifier`) का पता है। हम यह जानकारी `Configuration` टेबल में डाल सकते थे, लेकिन इसे एक अलग कंपोनेंट, सर्वर द्वारा सेट किया जाता है, इसलिए इसे एक अलग टेबल में रखना आसान है।

- `PlayerGame`: की (key) खिलाड़ी का पता है। डेटा है:

  - `gameId`: 32-बाइट मान जो उस मैप का हैश है जिस पर खिलाड़ी खेल रहा है (गेम आइडेंटिफ़ायर)।
  - `win`: एक बूलियन जो बताता है कि क्या खिलाड़ी गेम जीत गया।
  - `lose`: एक बूलियन जो बताता है कि क्या खिलाड़ी गेम हार गया।
  - `digNumber`: खेल में सफल खुदाई की संख्या।

- `GamePlayer`: यह टेबल `gameId` से खिलाड़ी के पते तक रिवर्स मैपिंग रखती है।

- `Map`: की (key) तीन मानों का एक टपल है:

  - `gameId`: 32-बाइट मान जो उस मैप का हैश है जिस पर खिलाड़ी खेल रहा है (गेम आइडेंटिफ़ायर)।
  - `x` कोऑर्डिनेट
  - `y` कोऑर्डिनेट

  मान एक एकल संख्या है। यदि बम का पता चलता है तो यह 255 है। अन्यथा, यह उस स्थान के आसपास के बमों की संख्या प्लस एक है। हम केवल बमों की संख्या का उपयोग नहीं कर सकते हैं, क्योंकि डिफ़ॉल्ट रूप से EVM में सभी स्टोरेज और MUD में सभी पंक्ति मान शून्य होते हैं। हमें "खिलाड़ी ने अभी तक यहां खुदाई नहीं की है" और "खिलाड़ी ने यहां खुदाई की, और पाया कि आसपास शून्य बम हैं" के बीच अंतर करने की आवश्यकता है।

इसके अलावा, क्लाइंट और सर्वर के बीच संचार ऑन-चेन कंपोनेंट के माध्यम से होता है। यह टेबल्स का उपयोग करके भी लागू किया गया है।

- `PendingGame`: नया गेम शुरू करने के लिए अनसर्विसड अनुरोध।
- `PendingDig`: किसी विशिष्ट गेम में किसी विशिष्ट स्थान पर खुदाई करने के लिए अनसर्विसड अनुरोध। यह एक [ऑफ-चेन टेबल](https://mud.dev/store/tables#types-of-tables) है, जिसका अर्थ है कि यह EVM स्टोरेज में नहीं लिखा जाता है, यह केवल इवेंट्स का उपयोग करके ऑफ-चेन पठनीय है।

### निष्पादन और डेटा प्रवाह {#execution-data-flows}

ये प्रवाह क्लाइंट, ऑन-चेन कंपोनेंट और सर्वर के बीच निष्पादन का समन्वय करते हैं।

#### आरंभीकरण {#initialization-flow}

जब आप `mprocs` चलाते हैं, तो ये चरण होते हैं:

1. [`mprocs`](https://github.com/pvolok/mprocs) चार कंपोनेंट चलाता है:

   - [Anvil](https://book.getfoundry.sh/anvil/), जो एक स्थानीय ब्लॉकचेन चलाता है
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), जो MUD के लिए कॉन्ट्रैक्ट्स को कंपाइल (यदि आवश्यक हो) और डिप्लॉय करता है
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), जो वेब ब्राउज़रों को UI और क्लाइंट कोड सर्व करने के लिए [Vite](https://vitejs.dev/) चलाता है।
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), जो सर्वर क्रियाएं करता है

2. `contracts` पैकेज MUD कॉन्ट्रैक्ट्स को डिप्लॉय करता है और फिर [`PostDeploy.s.sol` स्क्रिप्ट](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) चलाता है। यह स्क्रिप्ट कॉन्फ़िगरेशन सेट करती है। github से कोड [एक 10x5 माइनफील्ड जिसमें आठ माइन हैं](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) निर्दिष्ट करता है।

3. [सर्वर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD सेट अप](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) करके शुरू होता है। अन्य बातों के अलावा, यह डेटा सिंक्रनाइज़ेशन को सक्रिय करता है, ताकि सर्वर की मेमोरी में संबंधित टेबल्स की एक प्रति मौजूद हो।

4. सर्वर [`Configuration` टेबल बदलने पर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) निष्पादित होने वाले एक फ़ंक्शन को सब्सक्राइब करता है। `PostDeploy.s.sol` के निष्पादित होने और टेबल को संशोधित करने के बाद [यह फ़ंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) कॉल किया जाता है।

5. जब सर्वर आरंभीकरण फ़ंक्शन में कॉन्फ़िगरेशन होता है, तो [यह `zkFunctions` को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) [सर्वर के ज़ीरो-नॉलेज हिस्से](#using-zokrates-from-typescript) को आरंभ करने के लिए। यह तब तक नहीं हो सकता जब तक हमें कॉन्फ़िगरेशन नहीं मिल जाता क्योंकि ज़ीरो-नॉलेज फ़ंक्शंस को माइनफ़ील्ड की चौड़ाई और ऊंचाई स्थिरांक के रूप में होनी चाहिए।

6. सर्वर के ज़ीरो-नॉलेज हिस्से को आरंभ करने के बाद, अगला कदम [ब्लॉकचेन पर ज़ीरो-नॉलेज सत्यापन कॉन्ट्रैक्ट को डिप्लॉय करना](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) और MUD में वेरिफाई पते को सेट करना है।

7. अंत में, हम अपडेट्स को सब्सक्राइब करते हैं ताकि हम देख सकें कि कोई खिलाड़ी [एक नया गेम शुरू करने](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) या [एक मौजूदा गेम में खुदाई करने](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) का अनुरोध कब करता है।

#### नया गेम {#new-game-flow}

यह तब होता है जब खिलाड़ी एक नया गेम का अनुरोध करता है।

1. यदि इस खिलाड़ी के लिए कोई गेम प्रगति पर नहीं है, या एक है लेकिन शून्य के gameId के साथ है, तो क्लाइंट एक [नया गेम बटन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) प्रदर्शित करता है। जब यूज़र इस बटन को दबाता है, तो [React `newGame` फ़ंक्शन चलाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)।

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) एक `System` कॉल है। MUD में सभी कॉल `World` कॉन्ट्रैक्ट के माध्यम से रूट किए जाते हैं, और ज्यादातर मामलों में आप `<namespace>__<function name>` को कॉल करते हैं। इस मामले में, कॉल `app__newGame` के लिए है, जिसे MUD फिर [`GameSystem` में `newGame` को रूट करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)।

3. ऑन-चेन फ़ंक्शन जाँचता है कि खिलाड़ी का कोई गेम प्रगति पर नहीं है, और यदि नहीं है तो [`PendingGame` टेबल में अनुरोध जोड़ता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)।

4. सर्वर `PendingGame` में बदलाव का पता लगाता है और [सब्सक्राइब किए गए फ़ंक्शन को चलाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)। यह फ़ंक्शन [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) को कॉल करता है, जो बदले में [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) को कॉल करता है।

5. `createGame` सबसे पहले [उचित संख्या में माइन के साथ एक यादृच्छिक मैप बनाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)। फिर, यह Zokrates के लिए आवश्यक खाली बॉर्डर के साथ एक मैप बनाने के लिए [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) को कॉल करता है। अंत में, `createGame` मैप का हैश प्राप्त करने के लिए [`calculateMapHash`](#calculateMapHash) को कॉल करता है, जिसका उपयोग गेम आईडी के रूप में किया जाता है।

6. `newGame` फ़ंक्शन `gamesInProgress` में नया गेम जोड़ता है।

7. सर्वर आखिरी काम ऑन-चेन [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) को कॉल करना है। यह फ़ंक्शन एक अलग `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में है, ताकि एक्सेस कंट्रोल को सक्षम किया जा सके। एक्सेस कंट्रोल [MUD कॉन्फ़िगरेशन फ़ाइल](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) में परिभाषित है।

   एक्सेस सूची केवल एक ही पते को `System` को कॉल करने की अनुमति देती है। यह सर्वर फ़ंक्शंस तक पहुंच को एक ही पते तक सीमित करता है, ताकि कोई भी सर्वर का प्रतिरूपण न कर सके।

8. ऑन-चेन कंपोनेंट संबंधित टेबल्स को अपडेट करता है:

   - `PlayerGame` में गेम बनाएं।
   - `GamePlayer` में रिवर्स मैपिंग सेट करें।
   - `PendingGame` से अनुरोध हटाएं।

9. सर्वर `PendingGame` में बदलाव की पहचान करता है, लेकिन कुछ नहीं करता क्योंकि [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) गलत है।

10. क्लाइंट पर [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) को खिलाड़ी के पते के लिए `PlayerGame` प्रविष्टि पर सेट किया गया है। जब `PlayerGame` बदलता है, तो `gameRecord` भी बदल जाता है।

11. यदि `gameRecord` में कोई मान है, और गेम जीता या हारा नहीं गया है, तो क्लाइंट [मैप प्रदर्शित करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)।

#### खुदाई {#dig-flow}

1. खिलाड़ी [मैप सेल के बटन पर क्लिक करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), जो [`dig` फ़ंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) को कॉल करता है। यह फ़ंक्शन [ऑन-चेन पर `dig` को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)।

2. ऑन-चेन कंपोनेंट [कई सेनिटी जांच करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), और यदि सफल होता है तो खुदाई अनुरोध को [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) में जोड़ता है।

3. सर्वर [`PendingDig` में बदलाव का पता लगाता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)। [यदि यह वैध है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), तो यह [ज़ीरो-नॉलेज कोड को कॉल करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (नीचे समझाया गया है) परिणाम और एक प्रमाण दोनों उत्पन्न करने के लिए कि यह वैध है।

4. [सर्वर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) को ऑन-चेन पर कॉल करता है।

5. `digResponse` दो काम करता है। सबसे पहले, यह [ज़ीरो नॉलेज प्रूफ़](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) की जाँच करता है। फिर, यदि प्रमाण जाँच में खरा उतरता है, तो यह परिणाम को वास्तव में संसाधित करने के लिए [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) को कॉल करता है।

6. `processDigResult` जांचता है कि गेम [हार](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) गया है या [जीत](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) गया है, और [`Map`, ऑन-चेन मैप को अपडेट करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)।

7. क्लाइंट स्वचालित रूप से अपडेट उठाता है और [खिलाड़ी को प्रदर्शित मैप को अपडेट करता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), और यदि लागू हो तो खिलाड़ी को बताता है कि यह जीत है या हार।

## Zokrates का उपयोग करना {#using-zokrates}

ऊपर बताए गए प्रवाह में हमने ज़ीरो-नॉलेज भागों को छोड़ दिया, उन्हें एक ब्लैक बॉक्स के रूप में माना। अब आइए इसे खोलते हैं और देखते हैं कि वह कोड कैसे लिखा गया है।

### मैप को हैश करना {#hashing-map}

[Poseidon](https://www.poseidon-hash.info), Zokrates हैश फ़ंक्शन जिसे हम उपयोग करते हैं, को लागू करने के लिए हम [इस JavaScript कोड](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) का उपयोग कर सकते हैं। हालांकि, यह तेज़ होगा, लेकिन यह सिर्फ Zokrates हैश फ़ंक्शन का उपयोग करने से अधिक जटिल होगा। यह एक ट्यूटोरियल है, और इसलिए कोड को सरलता के लिए अनुकूलित किया गया है, प्रदर्शन के लिए नहीं। इसलिए, हमें दो अलग-अलग Zokrates प्रोग्राम की आवश्यकता है, एक मैप के हैश की गणना करने के लिए (`hash`) और दूसरा वास्तव में मैप पर एक स्थान पर खुदाई के परिणाम का शून्य ज्ञान प्रमाण बनाने के लिए (`dig`)।

### हैश फ़ंक्शन {#hash-function}

यह वह फ़ंक्शन है जो एक मैप के हैश की गणना करता है। हम इस कोड पर लाइन-दर-लाइन जाएंगे।

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

ये दो लाइनें [Zokrates स्टैंडर्ड लाइब्रेरी](https://zokrates.github.io/toolbox/stdlib.html) से दो फ़ंक्शन आयात करती हैं। [पहला फ़ंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) एक [Poseidon हैश](https://www.poseidon-hash.info/) है। यह [`field` तत्वों](https://zokrates.github.io/language/types.html#field) की एक सारणी लेता है और एक `field` लौटाता है।

Zokrates में फ़ील्ड एलिमेंट आमतौर पर 256 बिट से कम लंबा होता है, लेकिन बहुत ज़्यादा नहीं। कोड को सरल बनाने के लिए, हम मैप को 512 बिट्स तक सीमित करते हैं, और चार फ़ील्ड्स की एक सरणी को हैश करते हैं, और प्रत्येक फ़ील्ड में हम केवल 128 बिट्स का उपयोग करते हैं। [`pack128` फ़ंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) इस उद्देश्य के लिए 128 बिट्स की एक सरणी को `field` में बदलता है।

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

यह लाइन एक फ़ंक्शन परिभाषा शुरू करती है। `hashMap` को `map` नामक एक एकल पैरामीटर मिलता है, जो एक द्वि-आयामी `bool`(ean) सरणी है। मैप का आकार `width+2` गुणा `height+2` है, जिसके कारण [नीचे बताए गए हैं](#why-map-border)।

हम `${width+2}` और `${height+2}` का उपयोग कर सकते हैं क्योंकि Zokrates प्रोग्राम इस एप्लिकेशन में [टेम्पलेट स्ट्रिंग्स](https://www.w3schools.com/js/js_string_templates.asp) के रूप में संग्रहीत हैं। `${` और `}` के बीच के कोड का मूल्यांकन JavaScript द्वारा किया जाता है, और इस तरह प्रोग्राम का उपयोग विभिन्न मैप आकारों के लिए किया जा सकता है। मैप पैरामीटर में इसके चारों ओर एक स्थान चौड़ा बॉर्डर होता है जिसमें कोई बम नहीं होता है, यही कारण है कि हमें चौड़ाई और ऊंचाई में दो जोड़ना पड़ता है।

रिटर्न वैल्यू एक `field` है जिसमें हैश होता है।

```
   bool[512] mut map1d = [false; 512];
```

मैप द्वि-आयामी है। हालांकि, `pack128` फ़ंक्शन द्वि-आयामी सरणियों के साथ काम नहीं करता है। तो हम पहले मैप को `map1d` का उपयोग करके 512-बाइट सरणी में समतल करते हैं। डिफ़ॉल्ट रूप से Zokrates चर स्थिरांक होते हैं, लेकिन हमें इस सरणी को एक लूप में मान निर्दिष्ट करने की आवश्यकता होती है, इसलिए हम इसे [`mut`](https://zokrates.github.io/language/variables.html#mutability) के रूप में परिभाषित करते हैं।

हमें सरणी को आरंभ करने की आवश्यकता है क्योंकि Zokrates में `undefined` नहीं है। `[false; 512]` अभिव्यक्ति का अर्थ है [512 `false` मानों की एक सरणी](https://zokrates.github.io/language/types.html#declaration-and-initialization)।

```
   u32 mut counter = 0;
```

हमें `map1d` में पहले से भरे गए बिट्स और अभी तक नहीं भरे गए बिट्स के बीच अंतर करने के लिए एक काउंटर की भी आवश्यकता है।

```
   for u32 x in 0..${width+2} {
```

यह है कि आप Zokrates में एक [`for` लूप](https://zokrates.github.io/language/control_flow.html#for-loops) कैसे घोषित करते हैं। एक Zokrates `for` लूप में निश्चित सीमाएँ होनी चाहिए, क्योंकि जबकि यह एक लूप प्रतीत होता है, कंपाइलर वास्तव में इसे "अनरोल" करता है। अभिव्यक्ति `${width+2}` एक कंपाइल समय स्थिरांक है क्योंकि `width` TypeScript कोड द्वारा कंपाइलर को कॉल करने से पहले सेट किया जाता है।

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

मैप में प्रत्येक स्थान के लिए, उस मान को `map1d` सरणी में डालें और काउंटर को बढ़ाएँ।

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` से चार `field` मानों की एक सरणी बनाने के लिए `pack128`। Zokrates में `array[a..b]` का अर्थ है सरणी का वह टुकड़ा जो `a` से शुरू होता है और `b-1` पर समाप्त होता है।

```
    return poseidon(hashMe);
}
```

इस सरणी को हैश में बदलने के लिए `poseidon` का उपयोग करें।

### हैश प्रोग्राम {#hash-program}

सर्वर को गेम पहचानकर्ता बनाने के लिए सीधे `hashMap` को कॉल करने की आवश्यकता है। हालांकि, Zokrates केवल `main` फ़ंक्शन को शुरू करने के लिए कॉल कर सकता है, इसलिए हम `main` के साथ एक प्रोग्राम बनाते हैं जो हैश फ़ंक्शन को कॉल करता है।

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### डिग प्रोग्राम {#dig-program}

यह एप्लिकेशन के ज़ीरो-नॉलेज भाग का दिल है, जहां हम उन प्रमाणों का उत्पादन करते हैं जिनका उपयोग खुदाई के परिणामों को सत्यापित करने के लिए किया जाता है।

```
${hashFragment}

// स्थान (x,y) में माइन की संख्या
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### मैप बॉर्डर क्यों {#why-map-border}

शून्य ज्ञान प्रमाण [अरिथमैटिक सर्किट](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) का उपयोग करते हैं, जिनका `if` स्टेटमेंट का कोई आसान समकक्ष नहीं होता है। इसके बजाय, वे [सशर्त ऑपरेटर](https://en.wikipedia.org/wiki/Ternary_conditional_operator) के समकक्ष का उपयोग करते हैं। यदि `a` शून्य या एक हो सकता है, तो आप `if a { b } else { c }` की गणना `ab+(1-a)c` के रूप में कर सकते हैं।

इस वजह से, एक Zokrates `if` कथन हमेशा दोनों शाखाओं का मूल्यांकन करता है। उदाहरण के लिए, यदि आपके पास यह कोड है:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

यह त्रुटि देगा, क्योंकि इसे `arr[10]` की गणना करने की आवश्यकता है, भले ही वह मान बाद में शून्य से गुणा किया जाएगा।

यही कारण है कि हमें नक्शे के चारों ओर एक स्थान चौड़ा बॉर्डर चाहिए। हमें एक स्थान के चारों ओर माइन्स की कुल संख्या की गणना करने की आवश्यकता है, और इसका मतलब है कि हमें उस स्थान से एक पंक्ति ऊपर और नीचे, बाईं ओर और दाईं ओर का स्थान देखना होगा जहाँ हम खुदाई कर रहे हैं। जिसका अर्थ है कि वे स्थान मैप ऐरे में मौजूद होने चाहिए जो Zokrates को प्रदान किया गया है।

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

डिफ़ॉल्ट रूप से Zokrates प्रमाणों में उनके इनपुट शामिल होते हैं। यह जानने का कोई फायदा नहीं है कि किसी स्थान के आसपास पाँच माइन हैं जब तक कि आप वास्तव में यह नहीं जानते कि वह कौन सा स्थान है (और आप इसे केवल अपने अनुरोध से मेल नहीं खा सकते, क्योंकि तब प्रोवर अलग-अलग मानों का उपयोग कर सकता है और आपको इसके बारे में नहीं बता सकता है)। हालांकि, हमें Zokrates को प्रदान करते हुए मैप को गुप्त रखने की आवश्यकता है। समाधान एक `private` पैरामीटर का उपयोग करना है, जो प्रमाण द्वारा प्रकट _नहीं_ किया जाता है।

यह दुरुपयोग के लिए एक और रास्ता खोलता है। प्रूवर सही निर्देशांक का उपयोग कर सकता है, लेकिन स्थान के चारों ओर किसी भी संख्या में माइन्स के साथ एक नक्शा बना सकता है, और संभवतः स्वयं स्थान पर भी। इस दुरुपयोग को रोकने के लिए, हम शून्य ज्ञान प्रमाण में मैप का हैश शामिल करते हैं, जो गेम आइडेंटिफ़ायर है।

```
   return (hashMap(map),
```

यहाँ रिटर्न वैल्यू एक टपल है जिसमें मैप हैश ऐरे के साथ-साथ खुदाई का परिणाम भी शामिल है।

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

हम 255 का उपयोग एक विशेष मान के रूप में करते हैं यदि स्थान में ही एक बम हो।

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

यदि खिलाड़ी ने माइन नहीं मारा है, तो स्थान के आसपास के क्षेत्र के लिए माइन की गिनती जोड़ें और उसे वापस करें।

### TypeScript से Zokrates का उपयोग करना {#using-zokrates-from-typescript}

Zokrates का एक कमांड लाइन इंटरफ़ेस है, लेकिन इस प्रोग्राम में हम इसका उपयोग [TypeScript कोड](https://zokrates.github.io/toolbox/zokrates_js.html) में करते हैं।

Zokrates परिभाषाओं वाली लाइब्रेरी को [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) कहा जाता है।

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript बाइंडिंग](https://zokrates.github.io/toolbox/zokrates_js.html) आयात करें। हमें केवल [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) फ़ंक्शन की आवश्यकता है क्योंकि यह एक वादा लौटाता है जो सभी Zokrates परिभाषाओं का समाधान करता है।

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates की तरह ही, हम भी केवल एक ही फ़ंक्शन निर्यात करते हैं, जो [एसिंक्रोनस](https://www.w3schools.com/js/js_async.asp) भी है। जब यह अंततः लौटता है, तो यह कई फ़ंक्शन प्रदान करता है जैसा कि हम नीचे देखेंगे।

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

इसके बाद हमारे पास हैश फ़ंक्शन और दो Zokrates प्रोग्राम हैं जिन्हें हमने ऊपर देखा है।

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

यहां हम उन प्रोग्रामों को संकलित करते हैं।

```typescript
// ज़ीरो नॉलेज सत्यापन के लिए कुंजी बनाएँ।
// उत्पादन प्रणाली पर आप एक सेटअप समारोह का उपयोग करना चाहेंगे।
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)।
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

एक प्रोडक्शन सिस्टम पर हम एक अधिक जटिल [सेटअप समारोह](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) का उपयोग कर सकते हैं, लेकिन यह एक प्रदर्शन के लिए काफी अच्छा है। यह कोई समस्या नहीं है कि यूज़र प्रोवर कुंजी जान सकते हैं - वे अभी भी इसका उपयोग चीजों को साबित करने के लिए नहीं कर सकते हैं जब तक कि वे सच न हों। क्योंकि हम एन्ट्रापी (दूसरा पैरामीटर, `""`) निर्दिष्ट करते हैं, परिणाम हमेशा समान होंगे।

**ध्यान दें:** Zokrates प्रोग्रामों का संकलन और कुंजी निर्माण धीमी प्रक्रियाएं हैं। इन्हें हर बार दोहराने की कोई आवश्यकता नहीं है, केवल जब मैप का आकार बदलता है। एक प्रोडक्शन सिस्टम पर आप उन्हें एक बार करते हैं, और फिर आउटपुट को स्टोर करते हैं। मैं इसे यहाँ केवल सरलता के लिए नहीं कर रहा हूँ।

#### `calculateMapHash` {#calculateMapHash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) फ़ंक्शन वास्तव में Zokrates प्रोग्राम चलाता है। यह दो फ़ील्ड के साथ एक संरचना लौटाता है: `output`, जो प्रोग्राम का आउटपुट एक JSON स्ट्रिंग के रूप में है, और `witness`, जो परिणाम का एक शून्य ज्ञान प्रमाण बनाने के लिए आवश्यक जानकारी है। यहाँ हमें केवल आउटपुट की आवश्यकता है।

आउटपुट `"31337"` के रूप में एक स्ट्रिंग है, जो उद्धरण चिह्नों में संलग्न एक दशमलव संख्या है। लेकिन `viem` के लिए हमें जिस आउटपुट की आवश्यकता है, वह `0x60A7` के रूप में एक हेक्साडेसिमल संख्या है। तो हम उद्धरण चिह्नों को हटाने के लिए `.slice(1,-1)` का उपयोग करते हैं और फिर शेष स्ट्रिंग, जो एक दशमलव संख्या है, को [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) में बदलने के लिए `BigInt` का उपयोग करते हैं। `.toString(16)` इस `BigInt` को एक हेक्साडेसिमल स्ट्रिंग में बदलता है, और `"0x"+` हेक्साडेसिमल संख्याओं के लिए मार्कर जोड़ता है।

```typescript
// परिणाम का ज़ीरो नॉलेज प्रमाण खोदें और लौटाएँ
// (सर्वर-साइड कोड)
```

ज़ीरो नॉलेज प्रूफ़ में सार्वजनिक इनपुट (`x` और `y`) और परिणाम (मैप का हैश और बमों की संख्या) शामिल हैं।

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates में यह जांचना एक समस्या है कि कोई इंडेक्स सीमाओं से बाहर है या नहीं, इसलिए हम इसे यहाँ करते हैं।

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

डिग प्रोग्राम निष्पादित करें।

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

एक सॉलिडिटी वेरिफायर, एक स्मार्ट अनुबंध जिसे हम ब्लॉकचेन पर तैनात कर सकते हैं और `digCompiled.program` द्वारा उत्पन्न प्रमाणों को सत्यापित करने के लिए उपयोग कर सकते हैं।

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

अंत में, वह सब कुछ लौटाएं जिसकी अन्य कोड को आवश्यकता हो सकती है।

## सुरक्षा परीक्षण {#security-tests}

सुरक्षा परीक्षण महत्वपूर्ण हैं क्योंकि एक कार्यक्षमता बग अंततः खुद को प्रकट करेगा। लेकिन अगर एप्लिकेशन असुरक्षित है, तो यह संभवतः लंबे समय तक छिपा रहेगा, इससे पहले कि यह किसी ऐसे व्यक्ति द्वारा प्रकट हो जो धोखा दे रहा है और दूसरों के संसाधनों के साथ बच निकल रहा है।

### अनुमतियाँ {#permissions}

इस गेम में एक विशेषाधिकार प्राप्त इकाई है, सर्वर। यह एकमात्र यूज़र है जिसे [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में फ़ंक्शन कॉल करने की अनुमति है। हम [`cast`](https://book.getfoundry.sh/cast/) का उपयोग यह सत्यापित करने के लिए कर सकते हैं कि अनुमति प्राप्त फ़ंक्शनों के लिए कॉल केवल सर्वर खाते के रूप में ही अनुमत हैं।

[सर्वर की निजी कुंजी `setupNetwork.ts` में है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)।

1. `anvil` (ब्लॉकचेन) चलाने वाले कंप्यूटर पर, इन पर्यावरण चर को सेट करें।

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. अनधिकृत पते के रूप में वेरिफायर पता सेट करने का प्रयास करने के लिए `cast` का उपयोग करें।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` न केवल विफलता की रिपोर्ट करता है, बल्कि आप ब्राउज़र पर गेम में **MUD Dev Tools** खोल सकते हैं, **Tables** पर क्लिक कर सकते हैं, और **app\_\_VerifierAddress** का चयन कर सकते हैं। देखें कि पता शून्य नहीं है।

3. वेरिफायर पता सर्वर के पते के रूप में सेट करें।

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** में पता अब शून्य होना चाहिए।

एक ही `System` में सभी MUD फ़ंक्शन एक ही एक्सेस कंट्रोल से गुजरते हैं, इसलिए मैं इस परीक्षण को पर्याप्त मानता हूं। यदि आप ऐसा नहीं करते हैं, तो आप [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) में अन्य फ़ंक्शन देख सकते हैं।

### ज़ीरो-नॉलेज का दुरुपयोग {#zero-knowledge-abuses}

Zokrates को सत्यापित करने के लिए गणित इस ट्यूटोरियल (और मेरी क्षमताओं) के दायरे से बाहर है। हालांकि, हम यह सत्यापित करने के लिए ज़ीरो-नॉलेज कोड पर विभिन्न जांच चला सकते हैं कि यदि इसे सही तरीके से नहीं किया गया तो यह विफल हो जाता है। इन सभी परीक्षणों के लिए हमें [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) को बदलना होगा और पूरे एप्लिकेशन को पुनरारंभ करना होगा। सर्वर प्रक्रिया को पुनरारंभ करना पर्याप्त नहीं है, क्योंकि यह एप्लिकेशन को एक असंभव स्थिति में डालता है (खिलाड़ी का एक गेम प्रगति पर है, लेकिन गेम अब सर्वर के लिए उपलब्ध नहीं है)।

#### गलत उत्तर {#wrong-answer}

सबसे सरल संभावना शून्य ज्ञान प्रमाण में गलत उत्तर प्रदान करना है। ऐसा करने के लिए, हम `zkDig` के अंदर जाते हैं और [लाइन 91 को संशोधित करते हैं](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

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

क्या होता है अगर हम सही जानकारी प्रदान करते हैं, लेकिन बस गलत प्रमाण डेटा है? अब, लाइन 91 को इससे बदलें:

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

यह अभी भी विफल रहता है, लेकिन अब यह बिना किसी कारण के विफल रहता है क्योंकि यह वेरिफायर कॉल के दौरान होता है।

### एक यूज़र ज़ीरो ट्रस्ट कोड को कैसे सत्यापित कर सकता है? {#user-verify-zero-trust}

स्मार्ट अनुबंधों को सत्यापित करना अपेक्षाकृत आसान है। आमतौर पर, डेवलपर स्रोत कोड को एक ब्लॉक एक्सप्लोरर पर प्रकाशित करता है, और ब्लॉक एक्सप्लोरर यह सत्यापित करता है कि स्रोत कोड [अनुबंध परिनियोजन लेनदेन](/developers/docs/smart-contracts/deploying/) में कोड में संकलित होता है। MUD `System` के मामले में यह [थोड़ा अधिक जटिल है](https://mud.dev/cli/verify), लेकिन बहुत अधिक नहीं।

ज़ीरो-नॉलेज के साथ यह कठिन है। वेरिफायर में कुछ स्थिरांक शामिल हैं और उन पर कुछ गणनाएँ चलाता है। यह आपको नहीं बताता कि क्या साबित किया जा रहा है।

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

समाधान, कम से कम जब तक ब्लॉक एक्सप्लोरर अपने यूज़र इंटरफेस में Zokrates सत्यापन जोड़ने के आसपास नहीं आते, यह है कि एप्लिकेशन डेवलपर Zokrates प्रोग्राम उपलब्ध कराते हैं, और कम से कम कुछ यूज़र उन्हें उपयुक्त सत्यापन कुंजी के साथ स्वयं संकलित करते हैं।

ऐसा करने के लिए:

1. [Zokrates इंस्टॉल करें](https://zokrates.github.io/gettingstarted.html)।

2. Zokrates प्रोग्राम के साथ एक फ़ाइल, `dig.zok` बनाएँ। नीचे दिया गया कोड मानता है कि आपने मूल मैप आकार, 10x5 रखा है।

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


    // स्थान (x,y) में माइन की संख्या
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

3. Zokrates कोड संकलित करें और सत्यापन कुंजी बनाएँ। सत्यापन कुंजी को उसी एन्ट्रापी के साथ बनाया जाना चाहिए जिसका उपयोग मूल सर्वर में किया गया था, [इस मामले में एक खाली स्ट्रिंग](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)।

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Solidity वेरिफायर को स्वयं बनाएँ, और सत्यापित करें कि यह ब्लॉकचेन पर मौजूद वाले के साथ कार्यात्मक रूप से समान है (सर्वर एक टिप्पणी जोड़ता है, लेकिन यह महत्वपूर्ण नहीं है)।

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## डिज़ाइन निर्णय {#design}

किसी भी पर्याप्त रूप से जटिल एप्लिकेशन में प्रतिस्पर्धी डिज़ाइन लक्ष्य होते हैं जिनके लिए ट्रेड-ऑफ की आवश्यकता होती है। आइए कुछ ट्रेडऑफ देखें और वर्तमान समाधान अन्य विकल्पों की तुलना में क्यों बेहतर है।

### ज़ीरो-नॉलेज क्यों {#why-zero-knowledge}

माइनस्वीपर के लिए आपको वास्तव में ज़ीरो-नॉलेज की आवश्यकता नहीं है। सर्वर हमेशा मैप रख सकता है, और फिर गेम खत्म होने पर बस इसे पूरी तरह से प्रकट कर सकता है। फिर, खेल के अंत में, स्मार्ट अनुबंध मैप हैश की गणना कर सकता है, सत्यापित कर सकता है कि यह मेल खाता है, और यदि यह सर्वर को दंडित नहीं करता है या खेल को पूरी तरह से अनदेखा करता है।

मैंने इस सरल समाधान का उपयोग नहीं किया क्योंकि यह केवल एक अच्छी तरह से परिभाषित अंत स्थिति वाले छोटे खेलों के लिए काम करता है। जब कोई खेल संभावित रूप से अनंत होता है ([स्वायत्त दुनिया](https://0xparc.org/blog/autonomous-worlds) के मामले में), तो आपको एक ऐसे समाधान की आवश्यकता होती है जो इसे प्रकट किए _बिना_ स्थिति को साबित करे।

एक ट्यूटोरियल के रूप में इस लेख को एक छोटे गेम की आवश्यकता थी जो समझने में आसान हो, लेकिन यह तकनीक लंबे समय तक चलने वाले गेम के लिए सबसे उपयोगी है।

### Zokrates क्यों? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) एकमात्र उपलब्ध ज़ीरो-नॉलेज लाइब्रेरी नहीं है, लेकिन यह एक सामान्य, [इंपरेटिव](https://en.wikipedia.org/wiki/Imperative_programming) प्रोग्रामिंग भाषा के समान है और बूलियन वेरिएबल्स का समर्थन करती है।

आपके आवेदन के लिए, विभिन्न आवश्यकताओं के साथ, आप [सर्कम](https://docs.circom.io/getting-started/installation/) या [काहिरा](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) का उपयोग करना पसंद कर सकते हैं।

### Zokrates को कब संकलित करें {#when-compile-zokrates}

इस प्रोग्राम में हम Zokrates प्रोग्राम को [हर बार जब सर्वर शुरू होता है](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) संकलित करते हैं। यह स्पष्ट रूप से संसाधनों की बर्बादी है, लेकिन यह एक ट्यूटोरियल है, जिसे सरलता के लिए अनुकूलित किया गया है।

यदि मैं एक उत्पादन-स्तर का एप्लिकेशन लिख रहा होता, तो मैं जांचता कि क्या मेरे पास इस माइनफील्ड आकार पर संकलित Zokrates प्रोग्राम के साथ एक फ़ाइल है, और यदि ऐसा है तो उसका उपयोग करता। यही बात ऑन-चेन पर एक वेरिफायर अनुबंध को तैनात करने के लिए भी सच है।

### वेरिफायर और प्रोवर कुंजियाँ बनाना {#key-creation}

[कुंजी निर्माण](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) एक और शुद्ध गणना है जिसे किसी दिए गए माइनफ़ील्ड आकार के लिए एक से अधिक बार करने की आवश्यकता नहीं है। फिर से, यह केवल सरलता के लिए एक बार किया जाता है।

इसके अतिरिक्त, हम [एक सेटअप समारोह](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) का उपयोग कर सकते हैं। सेटअप समारोह का लाभ यह है कि शून्य ज्ञान प्रमाण पर धोखा देने के लिए आपको प्रत्येक भागीदार से या तो एन्ट्रॉपी या कुछ मध्यवर्ती परिणाम की आवश्यकता होती है। यदि कम से कम एक समारोह भागीदार ईमानदार है और उस जानकारी को हटा देता है, तो शून्य ज्ञान प्रमाण कुछ हमलों से सुरक्षित हैं। हालांकि, यह सत्यापित करने के लिए _कोई तंत्र नहीं_ है कि जानकारी हर जगह से हटा दी गई है। यदि शून्य ज्ञान प्रमाण गंभीर रूप से महत्वपूर्ण हैं, तो आप सेटअप समारोह में भाग लेना चाहेंगे।

यहां हम [tau की स्थायी शक्तियों](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) पर भरोसा करते हैं, जिसमें दर्जनों प्रतिभागी थे। यह शायद काफी सुरक्षित और बहुत सरल है। हम कुंजी निर्माण के दौरान एन्ट्रापी भी नहीं जोड़ते हैं, जिससे यूज़र्स के लिए [ज़ीरो-नॉलेज कॉन्फ़िगरेशन को सत्यापित करना](#user-verify-zero-trust) आसान हो जाता है।

### कहां सत्यापित करें {#where-verification}

हम शून्य ज्ञान प्रमाण को या तो ऑन-चेन (जिसमें गैस लगती है) या क्लाइंट में ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) का उपयोग करके) सत्यापित कर सकते हैं। मैंने पहला चुना, क्योंकि यह आपको [वेरिफायर को सत्यापित करने](#user-verify-zero-trust) देता है और फिर भरोसा करता है कि जब तक इसके लिए अनुबंध का पता समान रहता है तब तक यह नहीं बदलता है। यदि सत्यापन क्लाइंट पर किया जाता, तो आपको हर बार क्लाइंट डाउनलोड करने पर प्राप्त कोड को सत्यापित करना पड़ता।

इसके अलावा, जबकि यह गेम सिंगल प्लेयर है, बहुत सारे ब्लॉकचेन गेम मल्टी-प्लेयर हैं। ऑन-चेन सत्यापन का मतलब है कि आप शून्य ज्ञान प्रमाण केवल एक बार सत्यापित करते हैं। इसे क्लाइंट में करने के लिए प्रत्येक क्लाइंट को स्वतंत्र रूप से सत्यापित करने की आवश्यकता होगी।

### TypeScript या Zokrates में मैप को समतल करें? {#where-flatten}

सामान्य तौर पर, जब प्रसंस्करण या तो TypeScript या Zokrates में किया जा सकता है, तो इसे TypeScript में करना बेहतर होता है, जो बहुत तेज है, और इसके लिए शून्य ज्ञान प्रमाण की आवश्यकता नहीं होती है। यही कारण है, उदाहरण के लिए, कि हम Zokrates को हैश प्रदान नहीं करते हैं और इसे सत्यापित करने के लिए कहते हैं कि यह सही है। हैशिंग Zokrates के अंदर किया जाना चाहिए, लेकिन लौटाए गए हैश और ऑन-चेन हैश के बीच का मिलान इसके बाहर हो सकता है।

हालांकि, हम अभी भी [Zokrates में मैप को समतल करते हैं](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), जबकि हम इसे TypeScript में कर सकते थे। कारण यह है कि अन्य विकल्प, मेरी राय में, बदतर हैं।

- Zokrates कोड को बूलियन की एक-आयामी सरणी प्रदान करें, और द्वि-आयामी मानचित्र प्राप्त करने के लिए `x*(height+2)
  +y` जैसे व्यंजक का उपयोग करें। यह [कोड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) को कुछ हद तक अधिक जटिल बना देगा, इसलिए मैंने फैसला किया कि प्रदर्शन लाभ एक ट्यूटोरियल के लिए इसके लायक नहीं है।

- Zokrates को एक-आयामी सरणी और दो-आयामी सरणी दोनों भेजें। हालाँकि, इस समाधान से हमें कुछ भी हासिल नहीं होता है। Zokrates कोड को यह सत्यापित करना होगा कि उसे प्रदान की गई एक-आयामी सरणी वास्तव में दो-आयामी सरणी का सही प्रतिनिधित्व है। तो प्रदर्शन में कोई लाभ नहीं होगा।

- Zokrates में द्वि-आयामी सरणी को समतल करें। यह सबसे सरल विकल्प है, इसलिए मैंने इसे चुना।

### मानचित्र कहाँ संग्रहीत करें {#where-store-maps}

इस एप्लिकेशन में [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) केवल मेमोरी में एक चर है। इसका मतलब है कि यदि आपका सर्वर मर जाता है और उसे पुनरारंभ करने की आवश्यकता होती है, तो उसमें संग्रहीत सभी जानकारी खो जाती है। खिलाड़ी न केवल अपना खेल जारी रखने में असमर्थ हैं, बल्कि वे एक नया खेल भी शुरू नहीं कर सकते क्योंकि ऑन-चेन घटक को लगता है कि उनका अभी भी एक खेल चल रहा है।

यह स्पष्ट रूप से एक उत्पादन प्रणाली के लिए एक खराब डिज़ाइन है, जिसमें आप इस जानकारी को एक डेटाबेस में संग्रहीत करेंगे। मैंने यहाँ केवल एक चर का उपयोग किया है क्योंकि यह एक ट्यूटोरियल है और सरलता मुख्य विचार है।

## निष्कर्ष: किन परिस्थितियों में यह उपयुक्त तकनीक है? {#conclusion}

तो, अब आप जानते हैं कि एक सर्वर के साथ एक गेम कैसे लिखना है जो गुप्त स्थिति को संग्रहीत करता है जो ऑन-चेन से संबंधित नहीं है। लेकिन किन मामलों में आपको ऐसा करना चाहिए? दो मुख्य विचार हैं।

- _लंबे समय तक चलने वाला गेम_: [जैसा कि ऊपर उल्लेख किया गया है](#why-zero-knowledge), एक छोटे गेम में आप गेम खत्म होने के बाद बस स्थिति प्रकाशित कर सकते हैं और तब सब कुछ सत्यापित करवा सकते हैं। लेकिन यह एक विकल्प नहीं है जब खेल में लंबा या अनिश्चित समय लगता है, और स्थिति को गुप्त रखने की आवश्यकता होती है।

- _कुछ केंद्रीकरण स्वीकार्य_: शून्य ज्ञान प्रमाण अखंडता को सत्यापित कर सकते हैं, कि कोई इकाई परिणामों में हेरफेर नहीं कर रही है। वे यह सुनिश्चित नहीं कर सकते कि इकाई अभी भी उपलब्ध होगी और संदेशों का जवाब देगी। उन स्थितियों में जहां उपलब्धता को भी विकेंद्रीकृत करने की आवश्यकता होती है, शून्य ज्ञान प्रमाण एक पर्याप्त समाधान नहीं हैं, और आपको [मल्टी-पार्टी कंप्यूटेशन](https://en.wikipedia.org/wiki/Secure_multi-party_computation) की आवश्यकता है।

[मेरे और काम के लिए यहाँ देखें](https://cryptodocguy.pro/)।

### आभार {#acknowledgements}

- अल्वारो अलोंसो ने इस लेख का एक मसौदा पढ़ा और ज़ोक्रेट्स के बारे में मेरी कुछ गलतफहमियों को दूर किया।

कोई भी शेष त्रुटि मेरी जिम्मेदारी है।
