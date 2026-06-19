---
title: गुप्त स्थितीसाठी झिरो-नॉलेज वापरणे
description: ऑनचेन गेम्स मर्यादित असतात कारण ते कोणतीही लपलेली माहिती ठेवू शकत नाहीत. हे ट्युटोरिअल वाचल्यानंतर, वाचक शून्य-ज्ञान पुरावे आणि सर्व्हर घटकांना एकत्र करून गुप्त स्थिती, साखळीबाह्य, घटक असलेले पडताळणीयोग्य गेम्स तयार करू शकतील. हे करण्याचे तंत्र माइनस्वीपर गेम तयार करून दाखवले जाईल.
author: ओरी पोमेरँट्झ
tags: ["सर्व्हर", "साखळीबाह्य", "केंद्रीकृत", "झिरो-नॉलेज", "Zokrates", "MUD", "गोपनीयता"]
skill: advanced
breadcrumb: ZK गुप्त स्थिती
lang: mr
published: 2025-03-15
---

_ब्लॉकचेनवर कोणतीही गुपिते नसतात_. ब्लॉकचेनवर पोस्ट केलेली प्रत्येक गोष्ट सर्वांना वाचण्यासाठी खुली असते. हे आवश्यक आहे, कारण ब्लॉकचेनची रचना कोणीही त्याची पडताळणी करू शकेल यावर आधारित आहे. तथापि, गेम्स अनेकदा गुप्त स्थितीवर अवलंबून असतात. उदाहरणार्थ, जर तुम्ही फक्त ब्लॉक एक्सप्लोररवर जाऊन नकाशा पाहू शकत असाल तर [माइनस्वीपर](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) गेमला काहीच अर्थ उरत नाही.

सर्वात सोपा उपाय म्हणजे गुप्त स्थिती ठेवण्यासाठी [सर्व्हर घटक](/developers/tutorials/server-components/) वापरणे. तथापि, आपण ब्लॉकचेन वापरण्याचे कारण म्हणजे गेम डेव्हलपरकडून होणारी फसवणूक टाळणे. आपल्याला सर्व्हर घटकाच्या प्रामाणिकपणाची खात्री करणे आवश्यक आहे. सर्व्हर स्थितीचा हॅश प्रदान करू शकतो आणि चालचा (move) निकाल मोजण्यासाठी वापरलेली स्थिती योग्य आहे हे सिद्ध करण्यासाठी [शून्य-ज्ञान पुरावे](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) वापरू शकतो.

हा लेख वाचल्यानंतर तुम्हाला अशा प्रकारचा गुप्त स्थिती ठेवणारा सर्व्हर, स्थिती दर्शवणारा क्लायंट आणि या दोन्हींमधील संवादासाठी ऑनचेन घटक कसा तयार करायचा हे समजेल. आपण वापरत असलेली मुख्य साधने खालीलप्रमाणे असतील:

| साधन | उद्देश | या आवृत्तीवर पडताळणी केली |
| --- | --- | ---: |
| [Zokrates](https://zokrates.github.io/) | शून्य-ज्ञान पुरावे आणि त्यांची पडताळणी | 1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | सर्व्हर आणि क्लायंट दोन्हीसाठी प्रोग्रामिंग भाषा | 5.4.2 |
| [Node](https://nodejs.org/en) | सर्व्हर चालवणे | 20.18.2 |
| [Viem](https://viem.sh/) | ब्लॉकचेनसोबत संवाद | 2.9.20 |
| [MUD](https://mud.dev/) | ऑनचेन डेटा व्यवस्थापन | 2.0.12 |
| [React](https://react.dev/) | क्लायंट युजर इंटरफेस | 18.2.0 |
| [Vite](https://vitejs.dev/) | क्लायंट कोड सर्व्ह करणे | 4.2.1 |

## माइनस्वीपर उदाहरण {#minesweeper}

[माइनस्वीपर](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) हा एक गेम आहे ज्यामध्ये माइनफील्डसह (सुरुंग क्षेत्र) एक गुप्त नकाशा असतो. खेळाडू एका विशिष्ट ठिकाणी खोदण्याची निवड करतो. जर त्या ठिकाणी माइन (सुरुंग) असेल, तर गेम संपतो. अन्यथा, खेळाडूला त्या ठिकाणाच्या सभोवतालच्या आठ चौकोनांमधील माइन्सची संख्या मिळते.

हे ॲप्लिकेशन [MUD](https://mud.dev/) वापरून लिहिले आहे, जे एक फ्रेमवर्क आहे आणि आपल्याला [की-व्हॅल्यू डेटाबेस](https://aws.amazon.com/nosql/key-value/) वापरून ऑनचेन डेटा संचयित करण्यास आणि तो डेटा साखळीबाह्य घटकांसह स्वयंचलितपणे सिंक्रोनाइझ करण्यास अनुमती देते. सिंक्रोनायझेशन व्यतिरिक्त, MUD ॲक्सेस कंट्रोल प्रदान करणे सोपे करते आणि इतर वापरकर्त्यांना आपले ॲप्लिकेशन परवानगीविना [विस्तारित](https://mud.dev/guides/extending-a-world) करणे सोपे करते.

### माइनस्वीपर उदाहरण चालवणे {#running-minesweeper-example}

माइनस्वीपर उदाहरण चालवण्यासाठी:

1. तुमच्याकडे [आवश्यक पूर्वअटी इन्स्टॉल केलेल्या असल्याची](https://mud.dev/quickstart#prerequisites) खात्री करा: [नोड](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), आणि [`mprocs`](https://github.com/pvolok/mprocs).

2. रिपॉझिटरी क्लोन करा.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. पॅकेजेस इन्स्टॉल करा.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   जर Foundry `pnpm install` चा भाग म्हणून इन्स्टॉल केले असेल, तर तुम्हाला कमांड-लाइन शेल रीस्टार्ट करणे आवश्यक आहे.

4. कॉन्ट्रॅक्ट्स कंपाईल करा

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. प्रोग्राम सुरू करा (ज्यामध्ये [anvil](https://book.getfoundry.sh/anvil/) ब्लॉकचेन समाविष्ट आहे) आणि प्रतीक्षा करा.

   ```sh copy
   mprocs
   ```

   लक्षात घ्या की स्टार्टअपला बराच वेळ लागतो. प्रगती पाहण्यासाठी, प्रस्थापित होत असलेले MUD कॉन्ट्रॅक्ट्स पाहण्यासाठी प्रथम _contracts_ टॅबवर स्क्रोल करण्यासाठी डाउन ॲरो (खालचा बाण) वापरा. जेव्हा तुम्हाला _Waiting for file changes…_ हा संदेश मिळेल, तेव्हा कॉन्ट्रॅक्ट्स प्रस्थापित झालेले असतात आणि पुढील प्रगती _server_ टॅबमध्ये होईल. तेथे, तुम्हाला _Verifier address: 0x...._ हा संदेश मिळेपर्यंत प्रतीक्षा करा.

   जर ही पायरी यशस्वी झाली, तर तुम्हाला `mprocs` स्क्रीन दिसेल, ज्यामध्ये डावीकडे विविध प्रक्रिया आणि उजवीकडे सध्या निवडलेल्या प्रक्रियेसाठी कन्सोल आउटपुट असेल.

   ![The mprocs screen](./mprocs.png)

   जर `mprocs` मध्ये काही समस्या असेल, तर तुम्ही चारही प्रक्रिया मॅन्युअली चालवू शकता, प्रत्येक त्याच्या स्वतःच्या कमांड लाइन विंडोमध्ये:

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

6. आता तुम्ही [क्लायंटवर](http://localhost:3000) ब्राउझ करू शकता, **New Game** वर क्लिक करू शकता आणि खेळायला सुरुवात करू शकता.

### टेबल्स {#tables}

आपल्याला ऑनचेन [अनेक टेबल्सची](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) आवश्यकता आहे.

- `Configuration`: हे टेबल एक सिंगलटन आहे, यात कोणतीही की नाही आणि एकच रेकॉर्ड आहे. याचा वापर गेम कॉन्फिगरेशन माहिती ठेवण्यासाठी केला जातो:
  - `height`: माइनफील्डची उंची
  - `width`: माइनफील्डची रुंदी
  - `numberOfBombs`: प्रत्येक माइनफील्डमधील बॉम्बची संख्या
- `VerifierAddress`: हे टेबल देखील एक सिंगलटन आहे. याचा वापर कॉन्फिगरेशनचा एक भाग, पडताळणीकर्ता कॉन्ट्रॅक्टचा पत्ता (`verifier`) ठेवण्यासाठी केला जातो. आपण ही माहिती `Configuration` टेबलमध्ये ठेवू शकलो असतो, परंतु ती सर्व्हर या वेगळ्या घटकाद्वारे सेट केली जाते, त्यामुळे ती वेगळ्या टेबलमध्ये ठेवणे सोपे आहे.

- `PlayerGame`: खेळाडूचा पत्ता ही की आहे. डेटा खालीलप्रमाणे आहे:

  - `gameId`: 32-बाइट मूल्य जे खेळाडू खेळत असलेल्या नकाशाचा हॅश आहे (गेम आयडेंटिफायर).
  - `win`: एक बुलियन जे खेळाडूने गेम जिंकला आहे की नाही हे दर्शवते.
  - `lose`: एक बुलियन जे खेळाडू गेम हरला आहे की नाही हे दर्शवते.
  - `digNumber`: गेममधील यशस्वी खोदाईची संख्या.

- `GamePlayer`: हे टेबल `gameId` पासून खेळाडूच्या पत्त्यापर्यंत रिव्हर्स मॅपिंग ठेवते.

- `Map`: की हे तीन मूल्यांचे ट्यूपल (tuple) आहे:

  - `gameId`: 32-बाइट मूल्य जे खेळाडू खेळत असलेल्या नकाशाचा हॅश आहे (गेम आयडेंटिफायर).
  - `x` कोऑर्डिनेट
  - `y` कोऑर्डिनेट

  मूल्य ही एकच संख्या आहे. जर बॉम्ब सापडला तर ते 255 असते. अन्यथा, ते त्या ठिकाणाच्या सभोवतालच्या बॉम्बची संख्या अधिक एक असते. आपण फक्त बॉम्बची संख्या वापरू शकत नाही, कारण डीफॉल्टनुसार EVM मधील सर्व स्टोरेज आणि MUD मधील सर्व रो (row) मूल्ये शून्य असतात. आपल्याला "खेळाडूने अद्याप येथे खोदलेले नाही" आणि "खेळाडूने येथे खोदले आहे, आणि सभोवताली शून्य बॉम्ब असल्याचे आढळले आहे" यातील फरक ओळखणे आवश्यक आहे.

याव्यतिरिक्त, क्लायंट आणि सर्व्हरमधील संवाद ऑनचेन घटकाद्वारे होतो. हे देखील टेबल्स वापरून लागू केले जाते.

- `PendingGame`: नवीन गेम सुरू करण्यासाठी अनसर्व्हिस्ड (सेवा न दिलेल्या) विनंत्या.
- `PendingDig`: विशिष्ट गेममध्ये विशिष्ट ठिकाणी खोदण्यासाठी अनसर्व्हिस्ड विनंत्या. हे एक [साखळीबाह्य टेबल](https://mud.dev/store/tables#types-of-tables) आहे, याचा अर्थ ते EVM स्टोरेजमध्ये लिहिले जात नाही, ते केवळ घटना वापरून साखळीबाह्य वाचनीय आहे.

### एक्झिक्यूशन आणि डेटा फ्लो {#execution-data-flows}

हे फ्लो क्लायंट, ऑनचेन घटक आणि सर्व्हर यांच्यातील एक्झिक्यूशनचे समन्वय साधतात.

#### इनिशिएलायझेशन (प्रारंभ) {#initialization-flow}

जेव्हा तुम्ही `mprocs` चालवता, तेव्हा या पायऱ्या घडतात:

1. [`mprocs`](https://github.com/pvolok/mprocs) चार घटक चालवते:

   - [Anvil](https://book.getfoundry.sh/anvil/), जे एक स्थानिक ब्लॉकचेन चालवते
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), जे MUD साठी कॉन्ट्रॅक्ट्स कंपाईल करते (आवश्यक असल्यास) आणि प्रस्थापित करते
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), जे वेब ब्राउझरला UI आणि क्लायंट कोड सर्व्ह करण्यासाठी [Vite](https://vitejs.dev/) चालवते.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), जे सर्व्हरच्या क्रिया करते

2. `contracts` पॅकेज MUD कॉन्ट्रॅक्ट्स प्रस्थापित करते आणि नंतर [`PostDeploy.s.sol` स्क्रिप्ट](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) चालवते. ही स्क्रिप्ट कॉन्फिगरेशन सेट करते. GitHub मधील कोड [आठ माइन्ससह 10x5 माइनफील्ड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) निर्दिष्ट करतो.

3. [सर्व्हर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD सेट करून](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) सुरू होतो. इतर गोष्टींबरोबरच, हे डेटा सिंक्रोनायझेशन सक्रिय करते, जेणेकरून संबंधित टेबल्सची एक प्रत सर्व्हरच्या मेमरीमध्ये अस्तित्वात असते.

4. [जेव्हा `Configuration` टेबल बदलते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) तेव्हा कार्यान्वित करण्यासाठी सर्व्हर एका फंक्शनला सबस्क्राईब करतो. `PostDeploy.s.sol` कार्यान्वित झाल्यानंतर आणि टेबलमध्ये बदल केल्यानंतर [हे फंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) कॉल केले जाते.

5. जेव्हा सर्व्हर इनिशिएलायझेशन फंक्शनकडे कॉन्फिगरेशन असते, तेव्हा ते [सर्व्हरचा झिरो-नॉलेज भाग](#using-zokrates-from-typescript) इनिशिएलाईज करण्यासाठी [`zkFunctions` ला कॉल करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). जोपर्यंत आपल्याला कॉन्फिगरेशन मिळत नाही तोपर्यंत हे घडू शकत नाही कारण झिरो-नॉलेज फंक्शन्समध्ये माइनफील्डची रुंदी आणि उंची स्थिरांक (constants) म्हणून असणे आवश्यक आहे.

6. सर्व्हरचा झिरो-नॉलेज भाग इनिशिएलाईज झाल्यानंतर, पुढची पायरी म्हणजे [ब्लॉकचेनवर झिरो-नॉलेज पडताळणी कॉन्ट्रॅक्ट प्रस्थापित करणे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) आणि MUD मध्ये पडताळणीकर्ता पत्ता सेट करणे.

7. शेवटी, आपण अपडेट्ससाठी सबस्क्राईब करतो जेणेकरून जेव्हा एखादा खेळाडू [नवीन गेम सुरू करण्याची](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) किंवा [विद्यमान गेममध्ये खोदण्याची](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) विनंती करेल तेव्हा आपल्याला दिसेल.

#### नवीन गेम {#new-game-flow}

जेव्हा खेळाडू नवीन गेमची विनंती करतो तेव्हा हे घडते.

1. जर या खेळाडूसाठी कोणताही गेम प्रगतीपथावर नसेल, किंवा एखादा असेल परंतु त्याचा gameId शून्य असेल, तर क्लायंट एक [नवीन गेम बटण](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) प्रदर्शित करतो. जेव्हा वापरकर्ता हे बटण दाबतो, तेव्हा [React `newGame` फंक्शन चालवते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) हा एक `System` कॉल आहे. MUD मध्ये सर्व कॉल्स `World` कॉन्ट्रॅक्टद्वारे राउट केले जातात, आणि बहुतांश प्रकरणांमध्ये तुम्ही `<namespace>__<function name>` ला कॉल करता. या प्रकरणात, कॉल `app__newGame` ला आहे, ज्याला MUD नंतर `GameSystem` मधील [`newGame` कडे राउट करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. ऑनचेन फंक्शन तपासते की खेळाडूचा कोणताही गेम प्रगतीपथावर नाही, आणि जर नसेल तर [`PendingGame` टेबलमध्ये विनंती जोडते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. सर्व्हर `PendingGame` मधील बदल शोधतो आणि [सबस्क्राईब केलेले फंक्शन चालवतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). हे फंक्शन [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) ला कॉल करते, जे पुढे [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) ला कॉल करते.

5. `createGame` सर्वात आधी [योग्य संख्येच्या माइन्ससह एक यादृच्छिक (random) नकाशा तयार करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). त्यानंतर, ते रिक्त सीमांसह नकाशा तयार करण्यासाठी [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ला कॉल करते, जे Zokrates साठी आवश्यक आहे. शेवटी, `createGame` नकाशाचा हॅश मिळवण्यासाठी [`calculateMapHash`](#calculatemaphash) ला कॉल करते, ज्याचा वापर गेम आयडी म्हणून केला जातो.

6. `newGame` फंक्शन `gamesInProgress` मध्ये नवीन गेम जोडते.

7. सर्व्हरची शेवटची कृती म्हणजे [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ला कॉल करणे, जे ऑनचेन आहे. ॲक्सेस कंट्रोल सक्षम करण्यासाठी हे फंक्शन एका वेगळ्या `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) मध्ये आहे. ॲक्सेस कंट्रोल [MUD कॉन्फिगरेशन फाईल](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) मध्ये परिभाषित केले आहे.

   ॲक्सेस लिस्ट केवळ एकाच पत्त्याला `System` कॉल करण्याची अनुमती देते. हे सर्व्हर फंक्शन्सचा ॲक्सेस एकाच पत्त्यापुरता मर्यादित करते, त्यामुळे कोणीही सर्व्हरची तोतयागिरी करू शकत नाही.

8. ऑनचेन घटक संबंधित टेबल्स अपडेट करतो:

   - `PlayerGame` मध्ये गेम तयार करा.
   - `GamePlayer` मध्ये रिव्हर्स मॅपिंग सेट करा.
   - `PendingGame` मधून विनंती काढून टाका.

9. सर्व्हर `PendingGame` मधील बदल ओळखतो, परंतु काहीही करत नाही कारण [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) फॉल्स (false) आहे.

10. क्लायंटवर [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) खेळाडूच्या पत्त्यासाठी `PlayerGame` एंट्रीवर सेट केले जाते. जेव्हा `PlayerGame` बदलते, तेव्हा `gameRecord` देखील बदलते.

11. जर `gameRecord` मध्ये एखादे मूल्य असेल, आणि गेम जिंकला किंवा हरला नसेल, तर क्लायंट [नकाशा प्रदर्शित करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### खोदणे {#dig-flow}

1. खेळाडू [नकाशा सेलच्या बटणावर क्लिक करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), जे [`dig` फंक्शनला](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) कॉल करते. हे फंक्शन [ऑनचेन `dig` ला](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) कॉल करते.

2. ऑनचेन घटक [अनेक सॅनिटी चेक्स (sanity checks) करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), आणि यशस्वी झाल्यास खोदण्याची विनंती [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) मध्ये जोडतो.

3. सर्व्हर [`PendingDig` मधील बदल शोधतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [जर ते वैध असेल](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), तर ते निकाल आणि तो वैध असल्याचा पुरावा दोन्ही तयार करण्यासाठी [झिरो-नॉलेज कोडला कॉल करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (खाली स्पष्ट केले आहे).

4. [सर्व्हर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ऑनचेन [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ला कॉल करतो.

5. `digResponse` दोन गोष्टी करते. प्रथम, ते [शून्य-ज्ञान पुरावा](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) तपासते. त्यानंतर, जर पुरावा योग्य असेल, तर ते प्रत्यक्षात निकालावर प्रक्रिया करण्यासाठी [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ला कॉल करते.

6. `processDigResult` गेम [हरला](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) आहे की [जिंकला](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) आहे हे तपासते, आणि [ऑनचेन नकाशा, `Map` अपडेट करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. क्लायंट स्वयंचलितपणे अपडेट्स घेतो आणि [खेळाडूला प्रदर्शित केलेला नकाशा अपडेट करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), आणि लागू असल्यास खेळाडूला सांगतो की तो विजय आहे की पराभव.

## Zokrates वापरणे {#using-zokrates}

वर स्पष्ट केलेल्या प्रक्रियांमध्ये आपण झिरो-नॉलेज भागांना ब्लॅक बॉक्स मानून वगळले होते. आता आपण ते उघडून पाहूया आणि तो कोड कसा लिहिला आहे ते समजून घेऊया.

### नकाशाचे हॅशिंग {#hashing-map}

आपण वापरत असलेले Zokrates हॅश फंक्शन, [Poseidon](https://www.poseidon-hash.info) लागू करण्यासाठी आपण [हा JavaScript कोड](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) वापरू शकतो. तथापि, हे अधिक वेगवान असले तरी, ते करण्यासाठी फक्त Zokrates हॅश फंक्शन वापरण्यापेक्षा अधिक गुंतागुंतीचे असेल. हे एक ट्युटोरियल आहे, आणि त्यामुळे कोड साधेपणासाठी ऑप्टिमाइझ केला आहे, कार्यप्रदर्शनासाठी नाही. म्हणून, आपल्याला दोन भिन्न Zokrates प्रोग्राम्सची आवश्यकता आहे, एक फक्त नकाशाचा हॅश मोजण्यासाठी (`hash`) आणि दुसरा नकाशावरील एखाद्या ठिकाणी खोदण्याच्या परिणामाचा शून्य-ज्ञान पुरावा तयार करण्यासाठी (`dig`).

### हॅश फंक्शन {#hash-function}

हे फंक्शन नकाशाचा हॅश मोजते. आपण हा कोड ओळीनुसार पाहू.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

या दोन ओळी [Zokrates स्टँडर्ड लायब्ररी](https://zokrates.github.io/toolbox/stdlib.html) मधून दोन फंक्शन्स इम्पोर्ट करतात. [पहिले फंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) हे [Poseidon हॅश](https://www.poseidon-hash.info/) आहे. ते [`field` घटकांचा](https://zokrates.github.io/language/types.html#field) अ‍ॅरे घेते आणि `field` परत करते.

Zokrates मधील फील्ड घटक सामान्यतः 256 बिट्सपेक्षा कमी लांबीचा असतो, परंतु फार कमी नसतो. कोड सोपा करण्यासाठी, आपण नकाशा 512 बिट्सपर्यंत मर्यादित ठेवतो, आणि चार फील्ड्सच्या अ‍ॅरेचे हॅश करतो, आणि प्रत्येक फील्डमध्ये आपण फक्त 128 बिट्स वापरतो. या उद्देशासाठी [`pack128` फंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) 128 बिट्सच्या अ‍ॅरेला `field` मध्ये बदलते.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

ही ओळ फंक्शनची व्याख्या सुरू करते. `hashMap` ला `map` नावाचा एकच पॅरामीटर मिळतो, जो एक द्विमितीय (two-dimensional) `bool`(ean) अ‍ॅरे आहे. नकाशाचा आकार `width+2` बाय `height+2` आहे ज्याची कारणे [खाली स्पष्ट केली आहेत](#why-map-border).

आपण `${width+2}` आणि `${height+2}` वापरू शकतो कारण Zokrates प्रोग्राम्स या अ‍ॅप्लिकेशनमध्ये [टेम्पलेट स्ट्रिंग्स](https://www.w3schools.com/js/js_string_templates.asp) म्हणून साठवले जातात. `${` आणि `}` मधील कोडचे JavaScript द्वारे मूल्यांकन केले जाते, आणि अशा प्रकारे प्रोग्राम वेगवेगळ्या नकाशाच्या आकारांसाठी वापरला जाऊ शकतो. नकाशा पॅरामीटरच्या सभोवताली कोणत्याही बॉम्बशिवाय एक स्थान रुंद सीमा असते, ज्यामुळे आपल्याला रुंदी आणि उंचीमध्ये दोन जोडण्याची आवश्यकता असते.

रिटर्न व्हॅल्यू एक `field` आहे ज्यामध्ये हॅश असतो.

```
bool[512] mut map1d = [false; 512];
```

नकाशा द्विमितीय आहे. तथापि, `pack128` फंक्शन द्विमितीय अ‍ॅरेसह कार्य करत नाही. म्हणून आपण प्रथम `map1d` वापरून नकाशाला 512-बाइट अ‍ॅरेमध्ये सपाट (flatten) करतो. डीफॉल्टनुसार Zokrates व्हेरिएबल्स स्थिरांक (constants) असतात, परंतु आपल्याला लूपमध्ये या अ‍ॅरेला मूल्ये नियुक्त करण्याची आवश्यकता असते, म्हणून आपण ते [`mut`](https://zokrates.github.io/language/variables.html#mutability) म्हणून परिभाषित करतो.

आपल्याला अ‍ॅरे इनिशियलाइझ करण्याची आवश्यकता आहे कारण Zokrates मध्ये `undefined` नाही. `[false; 512]` एक्स्प्रेशनचा अर्थ [512 `false` मूल्यांचा अ‍ॅरे](https://zokrates.github.io/language/types.html#declaration-and-initialization) असा होतो.

```
u32 mut counter = 0;
```

आपण `map1d` मध्ये आधीच भरलेले बिट्स आणि जे भरलेले नाहीत त्यांच्यात फरक करण्यासाठी आपल्याला काउंटरची देखील आवश्यकता आहे.

```
for u32 x in 0..${width+2} {
```

अशा प्रकारे तुम्ही Zokrates मध्ये [`for` लूप](https://zokrates.github.io/language/control_flow.html#for-loops) घोषित करता. Zokrates `for` लूपला निश्चित मर्यादा असणे आवश्यक आहे, कारण ते लूपसारखे दिसत असले तरी, कंपायलर प्रत्यक्षात ते "अनरोल" करतो. `${width+2}` हे एक्स्प्रेशन एक कंपाइल टाइम कॉन्स्टंट आहे कारण कंपायलरला कॉल करण्यापूर्वी TypeScript कोडद्वारे `width` सेट केले जाते.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

नकाशातील प्रत्येक स्थानासाठी, ते मूल्य `map1d` अ‍ॅरेमध्ये ठेवा आणि काउंटर वाढवा.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` मधून चार `field` मूल्यांचा अ‍ॅरे तयार करण्यासाठी `pack128` वापरले जाते. Zokrates मध्ये `array[a..b]` म्हणजे अ‍ॅरेचा तो भाग जो `a` पासून सुरू होतो आणि `b-1` वर संपतो.

```
return poseidon(hashMe);
}
```

या अ‍ॅरेला हॅशमध्ये रूपांतरित करण्यासाठी `poseidon` वापरा.

### हॅश प्रोग्राम {#hash-program}

गेम आयडेंटिफायर्स तयार करण्यासाठी सर्व्हरला थेट `hashMap` कॉल करणे आवश्यक आहे. तथापि, Zokrates सुरू करण्यासाठी प्रोग्रामवर फक्त `main` फंक्शन कॉल करू शकते, म्हणून आपण एक प्रोग्राम तयार करतो ज्यामध्ये `main` असते जे हॅश फंक्शनला कॉल करते.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### डिग (dig) प्रोग्राम {#dig-program}

हा अ‍ॅप्लिकेशनच्या झिरो-नॉलेज भागाचा गाभा आहे, जिथे आपण डिग (dig) परिणामांची पडताळणी करण्यासाठी वापरले जाणारे पुरावे तयार करतो.

```
${hashFragment}

// (x,y) स्थानावरील सुरुंगांची संख्या
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### नकाशाची सीमा का {#why-map-border}

शून्य-ज्ञान पुरावे [अरिथमॅटिक सर्किट्स](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) वापरतात, ज्यांना `if` स्टेटमेंटचा सोपा पर्याय नसतो. त्याऐवजी, ते [कंडिशनल ऑपरेटर](https://en.wikipedia.org/wiki/Ternary_conditional_operator) च्या समतुल्य वापरतात. जर `a` शून्य किंवा एक असू शकत असेल, तर तुम्ही `if a { b } else { c }` ची गणना `ab+(1-a)c` म्हणून करू शकता.

यामुळे, Zokrates `if` स्टेटमेंट नेहमी दोन्ही शाखांचे मूल्यांकन करते. उदाहरणार्थ, जर तुमच्याकडे हा कोड असेल:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

यात त्रुटी येईल, कारण त्याला `arr[10]` ची गणना करणे आवश्यक आहे, जरी त्या मूल्याला नंतर शून्याने गुणले जाणार असले तरीही.

याच कारणामुळे आपल्याला नकाशाच्या सभोवताली एक स्थान रुंद सीमा आवश्यक आहे. आपल्याला एखाद्या स्थानाभोवती असलेल्या खाणींची एकूण संख्या मोजण्याची आवश्यकता आहे, आणि याचा अर्थ असा की आपण जिथे खोदत आहोत त्या स्थानाच्या एक रांग वर आणि खाली, डावीकडे आणि उजवीकडे असलेले स्थान आपल्याला पाहण्याची आवश्यकता आहे. याचा अर्थ असा की Zokrates ला प्रदान केलेल्या नकाशा अ‍ॅरेमध्ये ती स्थाने अस्तित्वात असणे आवश्यक आहे.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

डीफॉल्टनुसार Zokrates पुराव्यांमध्ये त्यांचे इनपुट्स समाविष्ट असतात. एखाद्या जागेभोवती पाच खाणी आहेत हे जाणून घेण्याचा काही उपयोग नाही जोपर्यंत तुम्हाला ती जागा कोणती आहे हे प्रत्यक्षात माहीत नसते (आणि तुम्ही ते फक्त तुमच्या विनंतीशी जुळवू शकत नाही, कारण मग सिद्धकर्ता भिन्न मूल्ये वापरू शकतो आणि तुम्हाला त्याबद्दल सांगणार नाही). तथापि, Zokrates ला नकाशा प्रदान करताना आपल्याला तो गुप्त ठेवण्याची आवश्यकता आहे. यावर उपाय म्हणजे `private` पॅरामीटर वापरणे, जो पुराव्याद्वारे उघड केला जात _नाही_.

यामुळे गैरवापराचा आणखी एक मार्ग खुला होतो. सिद्धकर्ता योग्य निर्देशांक वापरू शकतो, परंतु स्थानाभोवती आणि शक्यतो त्या स्थानावरच कितीही खाणी असलेला नकाशा तयार करू शकतो. हा गैरवापर टाळण्यासाठी, आपण शून्य-ज्ञान पुराव्यामध्ये नकाशाचा हॅश समाविष्ट करतो, जो गेम आयडेंटिफायर आहे.

```
return (hashMap(map),
```

येथील रिटर्न व्हॅल्यू एक ट्यूपल (tuple) आहे ज्यामध्ये नकाशा हॅश अ‍ॅरे तसेच डिग (dig) परिणाम समाविष्ट आहे.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

जर त्या स्थानावरच बॉम्ब असेल तर आपण 255 हे विशेष मूल्य म्हणून वापरतो.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

जर खेळाडूला खाण लागली नसेल, तर स्थानाभोवतीच्या क्षेत्रासाठी खाणींची संख्या जोडा आणि ती परत करा.

### TypeScript मधून Zokrates वापरणे {#using-zokrates-from-typescript}

Zokrates मध्ये कमांड लाइन इंटरफेस आहे, परंतु या प्रोग्राममध्ये आपण तो [TypeScript कोड](https://zokrates.github.io/toolbox/zokrates_js.html) मध्ये वापरतो.

ज्या लायब्ररीमध्ये Zokrates व्याख्या आहेत तिला [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) म्हणतात.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript बाइंडिंग्ज](https://zokrates.github.io/toolbox/zokrates_js.html) इम्पोर्ट करा. आपल्याला फक्त [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) फंक्शनची आवश्यकता आहे कारण ते एक प्रॉमिस परत करते जे सर्व Zokrates व्याख्यांचे निराकरण करते.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates प्रमाणेच, आपण फक्त एकच फंक्शन एक्सपोर्ट करतो, जे [असिंक्रोनस](https://www.w3schools.com/js/js_async.asp) देखील आहे. जेव्हा ते शेवटी परत येते, तेव्हा ते अनेक फंक्शन्स प्रदान करते जे आपण खाली पाहू.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates इनिशियलाइझ करा, लायब्ररीमधून आपल्याला आवश्यक असलेले सर्व काही मिळवा.

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

पुढे आपल्याकडे हॅश फंक्शन आणि आपण वर पाहिलेले दोन Zokrates प्रोग्राम्स आहेत.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

येथे आपण ते प्रोग्राम्स कंपाइल करतो.

```typescript
// झिरो-नॉलेज पडताळणीसाठी की तयार करा.
// प्रॉडक्शन सिस्टीमवर तुम्हाला सेटअप सेरेमनी वापरायची असेल.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

प्रॉडक्शन सिस्टीमवर आपण अधिक गुंतागुंतीची [सेटअप सेरेमनी](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) वापरू शकतो, परंतु प्रात्यक्षिकासाठी हे पुरेसे आहे. वापरकर्त्यांना सिद्धकर्ता की (prover key) माहीत असणे ही समस्या नाही - जोपर्यंत गोष्टी सत्य नसतात तोपर्यंत ते गोष्टी सिद्ध करण्यासाठी त्याचा वापर करू शकत नाहीत. कारण आपण एंट्रॉपी (दुसरा पॅरामीटर, `""`) निर्दिष्ट करतो, परिणाम नेहमी समानच असणार आहेत.

**टीप:** Zokrates प्रोग्राम्सचे कंपायलेशन आणि की (key) तयार करणे या संथ प्रक्रिया आहेत. प्रत्येक वेळी त्यांची पुनरावृत्ती करण्याची आवश्यकता नाही, फक्त जेव्हा नकाशाचा आकार बदलतो तेव्हाच. प्रॉडक्शन सिस्टीमवर तुम्ही ते एकदाच कराल आणि नंतर आउटपुट साठवून ठेवाल. मी येथे ते न करण्याचे एकमेव कारण म्हणजे साधेपणा.

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) फंक्शन प्रत्यक्षात Zokrates प्रोग्राम चालवते. ते दोन फील्ड्ससह एक स्ट्रक्चर परत करते: `output`, जे JSON स्ट्रिंग म्हणून प्रोग्रामचे आउटपुट आहे, आणि `witness`, जी परिणामाचा शून्य-ज्ञान पुरावा तयार करण्यासाठी आवश्यक असलेली माहिती आहे. येथे आपल्याला फक्त आउटपुटची आवश्यकता आहे.

आउटपुट हे `"31337"` स्वरूपातील एक स्ट्रिंग आहे, जो अवतरण चिन्हांमध्ये (quotation marks) बंद केलेला दशांश (decimal) क्रमांक आहे. परंतु आपल्याला `viem` साठी आवश्यक असलेले आउटपुट `0x60A7` स्वरूपातील हेक्साडेसिमल क्रमांक आहे. म्हणून आपण अवतरण चिन्हे काढण्यासाठी `.slice(1,-1)` वापरतो आणि नंतर उर्वरित स्ट्रिंग, जी एक दशांश संख्या आहे, तिला [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) मध्ये चालवण्यासाठी `BigInt` वापरतो. `.toString(16)` या `BigInt` ला हेक्साडेसिमल स्ट्रिंगमध्ये रूपांतरित करते, आणि `"0x"+` हेक्साडेसिमल संख्यांसाठी मार्कर जोडते.

```typescript
// खोदा आणि निकालाचा शून्य-ज्ञान पुरावा परत करा
// (सर्व्हर-साइड कोड)
```

शून्य-ज्ञान पुराव्यामध्ये सार्वजनिक इनपुट्स (`x` आणि `y`) आणि परिणाम (नकाशाचा हॅश आणि बॉम्बची संख्या) समाविष्ट असतात.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates मध्ये निर्देशांक (index) मर्यादेबाहेर आहे की नाही हे तपासणे ही एक समस्या आहे, म्हणून आपण ते येथे करतो.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

डिग (dig) प्रोग्राम कार्यान्वित करा.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) वापरा आणि पुरावा परत करा.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

एक Solidity पडताळणीकर्ता, एक स्मार्ट कॉन्ट्रॅक्ट जे आपण ब्लॉकचेनवर प्रस्थापित करू शकतो आणि `digCompiled.program` द्वारे व्युत्पन्न केलेल्या पुराव्यांची पडताळणी करण्यासाठी वापरू शकतो.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

शेवटी, इतर कोडला आवश्यक असलेले सर्व काही परत करा.

## सुरक्षा चाचण्या {#security-tests}

सुरक्षा चाचण्या महत्त्वाच्या आहेत कारण कार्यक्षमतेतील त्रुटी (bug) शेवटी उघडकीस येते. परंतु जर ॲप्लिकेशन असुरक्षित असेल, तर कोणीतरी फसवणूक करून आणि इतरांच्या मालकीची संसाधने घेऊन जाईपर्यंत ते बऱ्याच काळासाठी लपून राहण्याची शक्यता असते.

### परवानग्या {#permissions}

या गेममध्ये एक विशेषाधिकार प्राप्त घटक आहे, तो म्हणजे सर्व्हर. [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) मधील फंक्शन्स कॉल करण्याची परवानगी असलेला हा एकमेव वापरकर्ता आहे. परवानगीयुक्त (permissioned) फंक्शन्सना केवळ सर्व्हर खाते म्हणून कॉल करण्याची परवानगी आहे हे पडताळण्यासाठी आपण [`cast`](https://book.getfoundry.sh/cast/) वापरू शकतो.

[सर्व्हरची खाजगी की `setupNetwork.ts` मध्ये आहे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (ब्लॉकचेन) चालवणाऱ्या संगणकावर, हे एन्व्हायर्नमेंट व्हेरिएबल्स सेट करा.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. पडताळणीकर्ता पत्ता अनधिकृत पत्ता म्हणून सेट करण्याचा प्रयत्न करण्यासाठी `cast` वापरा.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   केवळ `cast` अपयश नोंदवत नाही, तर तुम्ही ब्राउझरवरील गेममध्ये **MUD Dev Tools** उघडू शकता, **Tables** वर क्लिक करू शकता आणि **app\_\_VerifierAddress** निवडू शकता. पत्ता शून्य नाही हे पहा.

3. पडताळणीकर्ता पत्ता सर्व्हरचा पत्ता म्हणून सेट करा.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** मधील पत्ता आता शून्य असावा.

एकाच `System` मधील सर्व MUD फंक्शन्स एकाच ॲक्सेस कंट्रोलमधून जातात, त्यामुळे मी ही चाचणी पुरेशी मानतो. जर तुम्हाला तसे वाटत नसेल, तर तुम्ही [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) मधील इतर फंक्शन्स तपासू शकता.

### झिरो-नॉलेज गैरवापर {#zero-knowledge-abuses}

Zokrates पडताळणी करण्यासाठी लागणारे गणित या ट्युटोरिअलच्या (आणि माझ्या क्षमतेच्या) कक्षेबाहेरचे आहे. तथापि, झिरो-नॉलेज कोड योग्यरित्या केला नसल्यास तो अयशस्वी होतो हे पडताळण्यासाठी आपण त्यावर विविध तपासण्या करू शकतो. या सर्व चाचण्यांसाठी आपल्याला [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) बदलणे आणि संपूर्ण ॲप्लिकेशन रीस्टार्ट करणे आवश्यक असेल. केवळ सर्व्हर प्रक्रिया रीस्टार्ट करणे पुरेसे नाही, कारण यामुळे ॲप्लिकेशन एका अशक्य स्थितीत (state) जाते (खेळाडूचा गेम सुरू असतो, परंतु तो गेम सर्व्हरसाठी उपलब्ध नसतो).

#### चुकीचे उत्तर {#wrong-answer}

सर्वात सोपी शक्यता म्हणजे शून्य-ज्ञान पुरावा (zero-knowledge proof) मध्ये चुकीचे उत्तर देणे. ते करण्यासाठी, आपण `zkDig` मध्ये जातो आणि [ओळ 91 सुधारित करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

याचा अर्थ असा की योग्य उत्तर काहीही असले तरी आपण नेहमी एक बॉम्ब असल्याचा दावा करू. या आवृत्तीसह खेळण्याचा प्रयत्न करा, आणि तुम्हाला `pnpm dev` स्क्रीनच्या **server** टॅबमध्ये ही त्रुटी दिसेल:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

त्यामुळे अशा प्रकारची फसवणूक अयशस्वी होते.

#### चुकीचा पुरावा {#wrong-proof}

जर आपण योग्य माहिती दिली, परंतु केवळ चुकीचा पुरावा डेटा दिला तर काय होईल? आता, ओळ 91 याने बदला:

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

ते अद्यापही अयशस्वी होते, परंतु आता ते कोणत्याही कारणाशिवाय अयशस्वी होते कारण ते पडताळणीकर्ता कॉल दरम्यान घडते.

### वापरकर्ता झिरो ट्रस्ट कोडची पडताळणी कशी करू शकतो? {#user-verify-zero-trust}

स्मार्ट कॉन्ट्रॅक्ट पडताळणे तुलनेने सोपे असते. सामान्यतः, डेव्हलपर सोर्स कोड ब्लॉक एक्सप्लोरर वर प्रकाशित करतो, आणि ब्लॉक एक्सप्लोरर पडताळणी करतो की सोर्स कोड [कॉन्ट्रॅक्ट प्रस्थापना व्यवहार](/developers/docs/smart-contracts/deploying/) मधील कोडमध्ये संकलित (compile) होतो. MUD `System` च्या बाबतीत हे [थोडं अधिक गुंतागुंतीचे](https://mud.dev/cli/verify) आहे, पण फार नाही.

झिरो-नॉलेजच्या बाबतीत हे अधिक कठीण आहे. पडताळणीकर्ता काही स्थिरांक (constants) समाविष्ट करतो आणि त्यावर काही आकडेमोड करतो. यावरून काय सिद्ध केले जात आहे हे समजत नाही.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

यावरील उपाय म्हणजे, किमान जोपर्यंत ब्लॉक एक्सप्लोरर त्यांच्या युजर इंटरफेसमध्ये Zokrates पडताळणी जोडत नाहीत तोपर्यंत, ॲप्लिकेशन डेव्हलपर्सनी Zokrates प्रोग्राम्स उपलब्ध करून देणे आणि किमान काही वापरकर्त्यांनी योग्य पडताळणी की (verification key) वापरून ते स्वतः संकलित (compile) करणे.

असे करण्यासाठी:

1. [Zokrates इन्स्टॉल करा](https://zokrates.github.io/gettingstarted.html).
2. Zokrates प्रोग्रामसह `dig.zok` ही फाईल तयार करा. खालील कोड असे गृहीत धरतो की तुम्ही मूळ नकाशाचा आकार 10x5 ठेवला आहे.

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

3. Zokrates कोड संकलित करा आणि पडताळणी की तयार करा. पडताळणी की मूळ सर्व्हरमध्ये वापरलेल्या त्याच एंट्रॉपी सह तयार केली जाणे आवश्यक आहे, [या प्रकरणात एक रिकामी स्ट्रिंग (empty string)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. स्वतःचा Solidity पडताळणीकर्ता तयार करा, आणि तो ब्लॉकचेन वरील पडताळणीकर्त्याशी कार्यात्मकदृष्ट्या समान असल्याची पडताळणी करा (सर्व्हर एक टिप्पणी (comment) जोडतो, परंतु ते महत्त्वाचे नाही).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## डिझाइनचे निर्णय {#design}

कोणत्याही पुरेशा गुंतागुंतीच्या ॲप्लिकेशनमध्ये स्पर्धात्मक डिझाइनची उद्दिष्टे असतात ज्यासाठी तडजोड करणे आवश्यक असते. चला काही तडजोडी पाहूया आणि सध्याचा उपाय इतर पर्यायांपेक्षा का चांगला आहे ते समजून घेऊया.

### झिरो-नॉलेज का {#why-zero-knowledge}

माइनस्वीपरसाठी तुम्हाला खरोखर झिरो-नॉलेजची आवश्यकता नाही. सर्व्हर नेहमी नकाशा ठेवू शकतो आणि गेम संपल्यावर तो सर्व उघड करू शकतो. त्यानंतर, गेमच्या शेवटी, स्मार्ट कॉन्ट्रॅक्ट नकाशाच्या हॅशची गणना करू शकते, ते जुळते की नाही याची पडताळणी करू शकते आणि जर ते जुळत नसेल तर सर्व्हरला दंड करू शकते किंवा गेम पूर्णपणे रद्द करू शकते.

मी हा सोपा उपाय वापरला नाही कारण तो फक्त चांगल्या प्रकारे परिभाषित केलेल्या अंतिम स्थितीसह (end state) लहान गेमसाठी कार्य करतो. जेव्हा एखादा गेम संभाव्यतः अमर्याद असतो (जसे की [स्वायत्त जगांच्या](https://0xparc.org/blog/autonomous-worlds) बाबतीत), तेव्हा तुम्हाला अशा उपायाची आवश्यकता असते जो स्थिती उघड _न करता_ सिद्ध करतो.

एक ट्युटोरिअल म्हणून या लेखासाठी समजायला सोपा असा एक लहान गेम आवश्यक होता, परंतु हे तंत्र मोठ्या गेमसाठी सर्वात उपयुक्त आहे.

### Zokrates का? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) ही एकमेव झिरो-नॉलेज लायब्ररी उपलब्ध नाही, परंतु ती एका सामान्य, [इम्परेटिव्ह](https://en.wikipedia.org/wiki/Imperative_programming) प्रोग्रामिंग भाषेसारखी आहे आणि बुलियन व्हेरिएबल्सना सपोर्ट करते.

तुमच्या ॲप्लिकेशनसाठी, वेगवेगळ्या आवश्यकतांसह, तुम्ही [Circum](https://docs.circom.io/getting-started/installation/) किंवा [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) वापरण्यास प्राधान्य देऊ शकता.

### Zokrates कधी कंपाईल करावे {#when-compile-zokrates}

या प्रोग्राममध्ये आम्ही [प्रत्येक वेळी सर्व्हर सुरू झाल्यावर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates प्रोग्राम्स कंपाईल करतो. हे स्पष्टपणे संसाधनांचा अपव्यय आहे, परंतु हे एक ट्युटोरिअल आहे, जे साधेपणासाठी ऑप्टिमाइझ केलेले आहे.

जर मी प्रोडक्शन-लेव्हल ॲप्लिकेशन लिहित असतो, तर मी तपासले असते की माझ्याकडे या माइनफिल्ड आकाराच्या कंपाईल केलेल्या Zokrates प्रोग्राम्सची फाईल आहे का, आणि असल्यास ती वापरली असती. ऑनचेन पडताळणीकर्ता कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठीही हेच खरे आहे.

### पडताळणीकर्ता आणि सिद्धकर्ता की तयार करणे {#key-creation}

[की तयार करणे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ही आणखी एक शुद्ध गणना आहे जी दिलेल्या माइनफिल्ड आकारासाठी एकापेक्षा जास्त वेळा करण्याची आवश्यकता नाही. पुन्हा, साधेपणासाठी हे फक्त एकदाच केले जाते.

याव्यतिरिक्त, आपण [सेटअप सेरेमनी](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) वापरू शकतो. सेटअप सेरेमनीचा फायदा असा आहे की शून्य-ज्ञान पुराव्यामध्ये फसवणूक करण्यासाठी तुम्हाला प्रत्येक सहभागीकडून एंट्रॉपी किंवा काही मध्यवर्ती परिणामाची आवश्यकता असते. जर किमान एक सेरेमनी सहभागी प्रामाणिक असेल आणि ती माहिती हटवत असेल, तर शून्य-ज्ञान पुरावे विशिष्ट हल्ल्यांपासून सुरक्षित असतात. तथापि, माहिती सर्व ठिकाणाहून हटवली गेली आहे याची पडताळणी करण्यासाठी कोणतीही _यंत्रणा नाही_. जर शून्य-ज्ञान पुरावे अत्यंत महत्त्वाचे असतील, तर तुम्हाला सेटअप सेरेमनीमध्ये सहभागी व्हायचे असते.

येथे आपण [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) वर अवलंबून आहोत, ज्यामध्ये डझनभर सहभागी होते. हे कदाचित पुरेसे सुरक्षित आणि खूप सोपे आहे. आम्ही की तयार करताना एंट्रॉपी देखील जोडत नाही, ज्यामुळे वापरकर्त्यांना [झिरो-नॉलेज कॉन्फिगरेशनची पडताळणी करणे](#user-verify-zero-trust) सोपे होते.

### पडताळणी कुठे करावी {#where-verification}

आपण शून्य-ज्ञान पुराव्यांची पडताळणी एकतर ऑनचेन (ज्यासाठी गॅस खर्च होतो) किंवा क्लायंटमध्ये ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) वापरून) करू शकतो. मी पहिला पर्याय निवडला, कारण यामुळे तुम्हाला एकदा [पडताळणीकर्त्याची पडताळणी](#user-verify-zero-trust) करता येते आणि जोपर्यंत त्याचा कॉन्ट्रॅक्ट पत्ता समान राहतो तोपर्यंत तो बदलणार नाही यावर विश्वास ठेवता येतो. जर पडताळणी क्लायंटवर केली गेली असती, तर तुम्हाला प्रत्येक वेळी क्लायंट डाउनलोड करताना प्राप्त होणाऱ्या कोडची पडताळणी करावी लागली असती.

तसेच, हा गेम सिंगल प्लेयर असला तरी, बरेच ब्लॉकचेन गेम्स मल्टी-प्लेयर असतात. ऑनचेन पडताळणीचा अर्थ असा आहे की तुम्ही शून्य-ज्ञान पुराव्याची फक्त एकदाच पडताळणी करता. क्लायंटमध्ये हे करण्यासाठी प्रत्येक क्लायंटला स्वतंत्रपणे पडताळणी करणे आवश्यक असेल.

### नकाशा TypeScript मध्ये फ्लॅटन करायचा की Zokrates मध्ये? {#where-flatten}

साधारणपणे, जेव्हा प्रक्रिया TypeScript किंवा Zokrates मध्ये केली जाऊ शकते, तेव्हा ती TypeScript मध्ये करणे चांगले असते, जे खूप वेगवान असते आणि त्यासाठी शून्य-ज्ञान पुराव्यांची आवश्यकता नसते. उदाहरणार्थ, हेच कारण आहे की आपण Zokrates ला हॅश देत नाही आणि ते बरोबर असल्याची पडताळणी करायला लावत नाही. हॅशिंग Zokrates च्या आत करावे लागते, परंतु परत केलेला हॅश आणि ऑनचेन हॅश यांच्यातील जुळणी त्याच्या बाहेर होऊ शकते.

तथापि, आपण तरीही [Zokrates मध्ये नकाशा फ्लॅटन करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), तर आपण ते TypeScript मध्ये करू शकलो असतो. याचे कारण असे की इतर पर्याय, माझ्या मते, अधिक वाईट आहेत.

- Zokrates कोडला बुलियनचा एक-आयामी ॲरे (one dimensional array) प्रदान करा आणि द्वि-आयामी नकाशा मिळवण्यासाठी `x*(height+2)
+y` सारख्या अभिव्यक्तीचा वापर करा. यामुळे [कोड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) थोडा अधिक गुंतागुंतीचा होईल, म्हणून मी ठरवले की ट्युटोरिअलसाठी परफॉर्मन्सचा फायदा तितका मोलाचा नाही.

- Zokrates ला एक-आयामी ॲरे आणि द्वि-आयामी ॲरे दोन्ही पाठवा. तथापि, या उपायाने आपल्याला काहीही मिळत नाही. Zokrates कोडला हे पडताळून पाहावे लागेल की त्याला दिलेला एक-आयामी ॲरे खरोखरच द्वि-आयामी ॲरेचे योग्य सादरीकरण आहे. त्यामुळे परफॉर्मन्समध्ये कोणताही फायदा होणार नाही.

- Zokrates मध्ये द्वि-आयामी ॲरे फ्लॅटन करा. हा सर्वात सोपा पर्याय आहे, म्हणून मी तो निवडला.

### नकाशे कुठे साठवायचे {#where-store-maps}

या ॲप्लिकेशनमध्ये [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) हे मेमरीमधील फक्त एक व्हेरिएबल आहे. याचा अर्थ असा की जर तुमचा सर्व्हर बंद पडला आणि तो रीस्टार्ट करण्याची आवश्यकता असेल, तर त्याने साठवलेली सर्व माहिती नष्ट होते. खेळाडू केवळ त्यांचा गेम सुरू ठेवू शकत नाहीत असे नाही, तर ते नवीन गेम देखील सुरू करू शकत नाहीत कारण ऑनचेन घटकाला वाटते की त्यांचा गेम अद्याप प्रगतीपथावर आहे.

प्रोडक्शन सिस्टीमसाठी हे स्पष्टपणे खराब डिझाइन आहे, ज्यामध्ये तुम्ही ही माहिती डेटाबेसमध्ये साठवाल. मी येथे व्हेरिएबल वापरण्याचे एकमेव कारण म्हणजे हे एक ट्युटोरिअल आहे आणि साधेपणा हा मुख्य विचार आहे.

## निष्कर्ष: कोणत्या परिस्थितीत हे योग्य तंत्र आहे? {#conclusion}

तर, आता तुम्हाला माहित आहे की असा गेम कसा लिहायचा ज्यामध्ये सर्व्हर अशी गुप्त स्थिती साठवतो जी ऑनचेन असण्याची गरज नाही. पण तुम्ही हे कोणत्या प्रकरणांमध्ये केले पाहिजे? यासाठी दोन मुख्य बाबी विचारात घ्याव्या लागतील.

- _दीर्घकाळ चालणारा गेम_: [वर नमूद केल्याप्रमाणे](#why-zero-knowledge), एका छोट्या गेममध्ये गेम संपल्यानंतर तुम्ही स्थिती प्रकाशित करू शकता आणि त्यानंतर सर्व गोष्टींची पडताळणी करू शकता. परंतु जेव्हा गेमला खूप किंवा अनिश्चित वेळ लागतो आणि स्थिती गुप्त ठेवणे आवश्यक असते, तेव्हा हा पर्याय नसतो.

- _काही प्रमाणात केंद्रीकरण स्वीकार्य_: शून्य-ज्ञान पुरावे अखंडतेची पडताळणी करू शकतात, की एखादी संस्था परिणामांमध्ये फेरफार करत नाहीये. ते काय करू शकत नाहीत, तर ती संस्था अद्याप उपलब्ध असेल आणि संदेशांना उत्तरे देईल याची खात्री करणे. ज्या परिस्थितींमध्ये उपलब्धता देखील विकेंद्रित असणे आवश्यक असते, तिथे शून्य-ज्ञान पुरावे हे पुरेसे समाधान नाही आणि तुम्हाला [मल्टी-पार्टी कॉम्प्युटेशन](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ची आवश्यकता असते.

[माझ्या अधिक कामासाठी येथे पहा](https://cryptodocguy.pro/).

### आभार {#acknowledgements}

- अल्वारो अलोन्सो यांनी या लेखाचा मसुदा वाचला आणि Zokrates बद्दलचे माझे काही गैरसमज दूर केले.

उर्वरित कोणत्याही चुकांसाठी मी जबाबदार आहे.