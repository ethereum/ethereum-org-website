---
title: "गुप्त स्टेटसाठी शून्य-ज्ञानाचा वापर करणे"
description: "ऑनचेन गेम्स मर्यादित आहेत कारण ते कोणतीही छुपी माहिती ठेवू शकत नाहीत. हे ट्युटोरियल वाचल्यानंतर, वाचक शून्य-ज्ञान पुरावे आणि सर्व्हर घटक एकत्र करून गुप्त स्टेट, ऑफचेन, घटकांसह सत्यापित करण्यायोग्य गेम्स तयार करू शकतील. हे करण्याचे तंत्र माइनस्वीपर गेम तयार करून दाखवले जाईल."
author: "ओरी पोमेरँट्झ"
tags:
  [
    "सर्व्हर",
    "ऑफचेन",
    "केंद्रीकृत",
    "शून्य-ज्ञान",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: mr
published: 2025-03-15
---

_ब्लॉकचेनवर कोणतीही गुपिते नाहीत_. ब्लॉकचेनवर पोस्ट केलेली प्रत्येक गोष्ट प्रत्येकासाठी वाचायला खुली असते. हे आवश्यक आहे, कारण ब्लॉकचेन कोणीही सत्यापित करू शकेल यावर आधारित आहे. तथापि, गेम्स अनेकदा गुप्त स्टेटवर अवलंबून असतात. उदाहरणार्थ, [minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) या गेमचा काहीच अर्थ नाही, जर तुम्ही फक्त ब्लॉकचेन एक्सप्लोररवर जाऊन नकाशा पाहू शकत असाल.

गुप्त स्टेट ठेवण्यासाठी [सर्व्हर घटक](/developers/tutorials/server-components/) वापरणे हा सर्वात सोपा उपाय आहे. तथापि, आपण ब्लॉकचेन वापरण्याचे कारण म्हणजे गेम डेव्हलपरकडून होणारी फसवणूक टाळणे. आपल्याला सर्व्हर घटकाच्या प्रामाणिकपणाची खात्री करणे आवश्यक आहे. सर्व्हर स्टेटचा हॅश देऊ शकतो आणि एका मूव्हचा निकाल काढण्यासाठी वापरलेली स्टेट योग्य आहे हे सिद्ध करण्यासाठी [शून्य-ज्ञान पुरावे](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) वापरू शकतो.

हा लेख वाचल्यानंतर, तुम्हाला अशा प्रकारचा गुप्त स्टेट धारण करणारा सर्व्हर, स्टेट दाखवण्यासाठी एक क्लायंट आणि दोघांमधील संवादासाठी एक ऑनचेन घटक कसा तयार करायचा हे कळेल. आपण वापरणार असलेली मुख्य साधने असतील:

| टूल                                           | उद्देश                                             |                      आवृत्तीवर सत्यापित |
| --------------------------------------------- | -------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | शून्य-ज्ञान पुरावे आणि त्यांची पडताळणी             |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | सर्व्हर आणि क्लायंट या दोघांसाठी प्रोग्रामिंग भाषा |   5.4.2 |
| [Node](https://nodejs.org/en)                 | सर्व्हर चालवणे                                     | 20.18.2 |
| [Viem](https://viem.sh/)                      | ब्लॉकचेनसह संवाद                                   |  2.9.20 |
| [MUD](https://mud.dev/)                       | ऑनचेन डेटा व्यवस्थापन                              |  2.0.12 |
| [React](https://react.dev/)                   | क्लायंट वापरकर्ता इंटरफेस                          |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | क्लायंट कोड सर्व्ह करणे                            |   4.2.1 |

## माइनस्वीपर उदाहरण {#minesweeper}

[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) हा एक गेम आहे ज्यात माइनफिल्ड असलेला गुप्त नकाशा असतो. खेळाडू एका विशिष्ट ठिकाणी खोदणे निवडतो. जर त्या ठिकाणी माइन असेल, तर खेळ संपतो. अन्यथा, खेळाडूला त्या जागेच्या सभोवतालच्या आठ चौकोनांमधील माइन्सची संख्या मिळते.

हे ॲप्लिकेशन [MUD](https://mud.dev/) वापरून लिहिलेले आहे, जे एक फ्रेमवर्क आहे जे आपल्याला [की-व्हॅल्यू डेटाबेस](https://aws.amazon.com/nosql/key-value/) वापरून ऑनचेन डेटा संग्रहित करण्यास आणि तो डेटा ऑफचेन घटकांसह आपोआप सिंक्रोनाइझ करण्यास अनुमती देते. सिंक्रोनाइझेशन व्यतिरिक्त, MUD ॲक्सेस कंट्रोल प्रदान करणे सोपे करते, आणि इतर वापरकर्त्यांना परवानगीशिवाय आमच्या ॲप्लिकेशनचा [विस्तार](https://mud.dev/guides/extending-a-world) करण्यास सोपे करते.

### माइनस्वीपर उदाहरण चालवणे {#running-minesweeper-example}

माइनस्वीपर उदाहरण चालवण्यासाठी:

1. तुम्ही [पूर्व-आवश्यकता स्थापित केल्या आहेत](https://mud.dev/quickstart#prerequisites) याची खात्री करा: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), आणि [`mprocs`](https://github.com/pvolok/mprocs).

2. रिपॉझिटरी क्लोन करा.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. पॅकेजेस स्थापित करा.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   जर `pnpm install` चा भाग म्हणून Foundry स्थापित केले असेल, तर तुम्हाला कमांड-लाइन शेल रीस्टार्ट करणे आवश्यक आहे.

4. कॉन्ट्रॅक्ट्स कंपाईल करा

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. प्रोग्राम सुरू करा ([anvil](https://book.getfoundry.sh/anvil/) ब्लॉकचेनसह) आणि प्रतीक्षा करा.

   ```sh copy
   mprocs
   ```

   लक्षात घ्या की स्टार्टअपला बराच वेळ लागतो. प्रगती पाहण्यासाठी, प्रथम _contracts_ टॅबवर स्क्रोल करण्यासाठी डाउन ॲरो वापरा आणि MUD कॉन्ट्रॅक्ट्स तैनात होत असल्याचे पहा. जेव्हा तुम्हाला _Waiting for file changes…_ हा संदेश मिळेल, तेव्हा कॉन्ट्रॅक्ट्स तैनात होतील आणि पुढील प्रगती _server_ टॅबमध्ये होईल. तेथे, तुम्हाला _Verifier address: 0x...._ हा संदेश मिळेपर्यंत तुम्ही प्रतीक्षा करा.

   जर ही पायरी यशस्वी झाली, तर तुम्हाला `mprocs` स्क्रीन दिसेल, ज्यामध्ये डावीकडे विविध प्रक्रिया आणि उजवीकडे सध्या निवडलेल्या प्रक्रियेसाठी कन्सोल आउटपुट असेल.

   ![mprocs स्क्रीन](./mprocs.png)

   जर `mprocs` मध्ये काही समस्या असेल, तर तुम्ही चार प्रक्रिया मॅन्युअली चालवू शकता, प्रत्येक तिच्या स्वतःच्या कमांड लाइन विंडोमध्ये:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **कॉन्ट्रॅक्ट्स**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **सर्व्हर**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **क्लायंट**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. आता तुम्ही [क्लायंट](http://localhost:3000) वर ब्राउझ करू शकता, **New Game** वर क्लिक करा आणि खेळायला सुरुवात करू शकता.

### टेबल्स {#tables}

आम्हाला ऑनचेन [अनेक टेबल्स](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) आवश्यक आहेत.

- `Configuration`: हे टेबल एक सिंगलेटन आहे, यात की नाही आणि एकच रेकॉर्ड आहे. हे गेम कॉन्फिगरेशन माहिती ठेवण्यासाठी वापरले जाते:
  - `height`: माइनफिल्डची उंची
  - `width`: माइनफिल्डची रुंदी
  - `numberOfBombs`: प्रत्येक माइनफिल्डमधील बॉम्बची संख्या

- `VerifierAddress`: हे टेबल देखील एक सिंगलेटन आहे. हे कॉन्फिगरेशनचा एक भाग, व्हेरिफायर कॉन्ट्रॅक्टचा ॲड्रेस (`verifier`) ठेवण्यासाठी वापरले जाते. आम्ही ही माहिती `Configuration` टेबलमध्ये ठेवू शकलो असतो, परंतु ती एका वेगळ्या घटकाद्वारे, सर्व्हरद्वारे सेट केली जाते, म्हणून ती वेगळ्या टेबलमध्ये ठेवणे सोपे आहे.

- `PlayerGame`: की खेळाडूचा ॲड्रेस आहे. डेटा असा आहे:

  - `gameId`: 32-बाईट व्हॅल्यू जे खेळाडू ज्या नकाशावर खेळत आहे त्याचा हॅश आहे (गेम ओळखकर्ता).
  - `win`: एक बूलियन जो खेळाडू गेम जिंकला की नाही हे दर्शवितो.
  - `lose`: एक बूलियन जो खेळाडू गेम हरला की नाही हे दर्शवितो.
  - `digNumber`: गेममधील यशस्वी खोदकामांची संख्या.

- `GamePlayer`: हे टेबल `gameId` पासून प्लेयर ॲड्रेसपर्यंतचे रिव्हर्स मॅपिंग ठेवते.

- `Map`: की तीन व्हॅल्यूजचा एक टपल आहे:

  - `gameId`: 32-बाईट व्हॅल्यू जे खेळाडू ज्या नकाशावर खेळत आहे त्याचा हॅश आहे (गेम ओळखकर्ता).
  - `x` कोऑर्डिनेट
  - `y` कोऑर्डिनेट

  व्हॅल्यू एकच संख्या आहे. जर बॉम्ब सापडला तर ते 255 आहे. अन्यथा, ते त्या स्थानाच्या आसपासच्या बॉम्बची संख्या अधिक एक आहे. आपण फक्त बॉम्बची संख्या वापरू शकत नाही, कारण डीफॉल्टनुसार EVM मधील सर्व स्टोरेज आणि MUD मधील सर्व रो व्हॅल्यू शून्य असतात. आपल्याला "खेळाडूने येथे अद्याप खोदले नाही" आणि "खेळाडूने येथे खोदले, आणि त्याला आढळले की आसपास शून्य बॉम्ब आहेत" यामध्ये फरक करणे आवश्यक आहे.

याव्यतिरिक्त, क्लायंट आणि सर्व्हरमधील संवाद ऑनचेन घटकाद्वारे होतो. हे देखील टेबल्स वापरून अंमलात आणले जाते.

- `PendingGame`: नवीन गेम सुरू करण्यासाठी न पुरवलेल्या विनंत्या.
- `PendingDig`: एका विशिष्ट गेममध्ये एका विशिष्ट ठिकाणी खोदण्यासाठी न पुरवलेल्या विनंत्या. हे एक [ऑफचेन टेबल](https://mud.dev/store/tables#types-of-tables) आहे, याचा अर्थ ते EVM स्टोरेजमध्ये लिहिले जात नाही, ते फक्त इव्हेंट्स वापरून ऑफचेन वाचता येते.

### एक्झिक्युशन आणि डेटा फ्लो {#execution-data-flows}

हे फ्लो क्लायंट, ऑनचेन घटक आणि सर्व्हर यांच्यातील अंमलबजावणीचे समन्वय साधतात.

#### इनिशिएलायझेशन {#initialization-flow}

जेव्हा तुम्ही `mprocs` चालवता, तेव्हा ह्या पायऱ्या घडतात:

1. [`mprocs`](https://github.com/pvolok/mprocs) चार घटक चालवते:

   - [Anvil](https://book.getfoundry.sh/anvil/), जे स्थानिक ब्लॉकचेन चालवते
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), जे MUD साठी कॉन्ट्रॅक्ट्स कंपाईल करते (गरज असल्यास) आणि तैनात करते
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), जे वेब ब्राउझरना UI आणि क्लायंट कोड सर्व्ह करण्यासाठी [Vite](https://vitejs.dev/) चालवते.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), जे सर्व्हर क्रिया करते

2. `contracts` पॅकेज MUD कॉन्ट्रॅक्ट्स तैनात करते आणि नंतर [ `PostDeploy.s.sol` स्क्रिप्ट](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) चालवते. ही स्क्रिप्ट कॉन्फिगरेशन सेट करते. github वरील कोड [10x5 माइनफिल्डमध्ये आठ माइन्स असल्याचे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) निर्दिष्ट करतो.

3. [सर्व्हर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD सेटअप करून](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) सुरू होतो. इतर गोष्टींबरोबरच, हे डेटा सिंक्रोनाइझेशन सक्रिय करते, जेणेकरून संबंधित टेबल्सची एक प्रत सर्व्हरच्या मेमरीमध्ये अस्तित्वात असेल.

4. सर्व्हर [जेव्हा `Configuration` टेबल बदलते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) तेव्हा कार्यान्वित होण्यासाठी एका फंक्शनची सदस्यता घेतो. `PostDeploy.s.sol` कार्यान्वित झाल्यावर आणि टेबलमध्ये बदल केल्यावर [हे फंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) कॉल केले जाते.

5. जेव्हा सर्व्हर इनिशिएलायझेशन फंक्शनमध्ये कॉन्फिगरेशन असते, तेव्हा ते [सर्व्हरच्या शून्य-ज्ञान भागाला](#using-zokrates-from-typescript) इनिशिएलाइझ करण्यासाठी [`zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) ला कॉल करते. आपल्याला कॉन्फिगरेशन मिळेपर्यंत हे होऊ शकत नाही कारण शून्य-ज्ञान फंक्शन्सना माइनफिल्डची रुंदी आणि उंची स्थिर मूल्ये म्हणून असणे आवश्यक आहे.

6. सर्व्हरचा शून्य-ज्ञान भाग सुरू झाल्यानंतर, पुढची पायरी म्हणजे [शून्य-ज्ञान पडताळणी कॉन्ट्रॅक्ट ब्लॉकचेनवर तैनात करणे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) आणि MUD मध्ये व्हेरिफायचा ॲड्रेस सेट करणे.

7. शेवटी, आम्ही अद्यतनांसाठी सदस्यता घेतो जेणेकरून खेळाडू [नवीन गेम सुरू करण्याची विनंती](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) करतो किंवा [विद्यमान गेममध्ये खोदकाम करण्याची विनंती](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) करतो तेव्हा आम्हाला कळेल.

#### नवीन गेम {#new-game-flow}

खेळाडू नवीन गेमची विनंती करतो तेव्हा हे घडते.

1. जर या खेळाडूसाठी कोणताही गेम प्रगतीपथावर नसेल, किंवा एक असेल पण शून्य gameId सह, तर क्लायंट [नवीन गेम बटण](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) दाखवते. जेव्हा वापरकर्ता हे बटण दाबतो, तेव्हा [React `newGame` फंक्शन चालवते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) हे `System` कॉल आहे. MUD मध्ये सर्व कॉल्स `World` कॉन्ट्रॅक्टद्वारे राउट केले जातात आणि बहुतेक प्रकरणांमध्ये तुम्ही `<namespace>__<function name>` कॉल करता. या प्रकरणात, कॉल `app__newGame` ला आहे, ज्याला MUD नंतर [`GameSystem` मधील `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) कडे राउट करते.

3. ऑनचेन फंक्शन तपासते की खेळाडूकडे प्रगतीपथावर असलेला गेम नाही, आणि जर नसेल तर [`PendingGame` टेबलमध्ये विनंती जोडते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. सर्व्हर `PendingGame` मधील बदल ओळखतो आणि [सबस्क्राइब केलेले फंक्शन चालवतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). हे फंक्शन [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) ला कॉल करते, जे नंतर [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) ला कॉल करते.

5. `createGame` पहिली गोष्ट [योग्य संख्येने माइन्स असलेला यादृच्छिक नकाशा तयार करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). नंतर, ते रिकाम्या किनारी असलेला नकाशा तयार करण्यासाठी [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ला कॉल करते, जे Zokrates साठी आवश्यक आहे. शेवटी, `createGame` [`calculateMapHash`](#calculateMapHash) ला कॉल करते, नकाशाचा हॅश मिळवण्यासाठी, जो गेम आयडी म्हणून वापरला जातो.

6. `newGame` फंक्शन नवीन गेम `gamesInProgress` मध्ये जोडते.

7. सर्व्हर शेवटची गोष्ट [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ला कॉल करते, जे ऑनचेन आहे. हे फंक्शन एका वेगळ्या `System` मध्ये आहे, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), जेणेकरून ॲक्सेस कंट्रोल सक्षम करता येईल. ॲक्सेस कंट्रोल [MUD कॉन्फिगरेशन फाईल](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) मध्ये परिभाषित केले आहे.

   ॲक्सेस लिस्ट फक्त एकाच ॲड्रेसला `System` कॉल करण्याची परवानगी देते. हे सर्व्हर फंक्शन्सचा ॲक्सेस एकाच ॲड्रेसपुरता मर्यादित करते, त्यामुळे कोणीही सर्व्हरची नक्कल करू शकत नाही.

8. ऑनचेन घटक संबंधित टेबल्स अद्यतनित करतो:

   - `PlayerGame` मध्ये गेम तयार करा.
   - `GamePlayer` मध्ये रिव्हर्स मॅपिंग सेट करा.
   - `PendingGame` मधून विनंती काढा.

9. सर्व्हर `PendingGame` मधील बदल ओळखतो, परंतु [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) असत्य असल्यामुळे काहीही करत नाही.

10. क्लायंटवर [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) खेळाडूच्या ॲड्रेससाठी `PlayerGame` एंट्रीवर सेट केले जाते. जेव्हा `PlayerGame` बदलते, तेव्हा `gameRecord` देखील बदलते.

11. जर `gameRecord` मध्ये व्हॅल्यू असेल, आणि गेम जिंकला किंवा हरला नसेल, तर क्लायंट [नकाशा दाखवतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### खोदणे {#dig-flow}

1. खेळाडू [नकाशा सेलच्या बटणावर क्लिक करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), जे [`dig` फंक्शन](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) कॉल करते. हे फंक्शन [ऑनचेन `dig` ला कॉल करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. ऑनचेन घटक [अनेक सॅनिटी तपासण्या करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), आणि यशस्वी झाल्यास खोदण्याची विनंती [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) मध्ये जोडतो.

3. सर्व्हर [`PendingDig` मधील बदल ओळखतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [जर ते वैध असेल तर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ते [शून्य-ज्ञान कोडला कॉल करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (खाली स्पष्ट केलेले) निकाल आणि तो वैध असल्याचा पुरावा तयार करण्यासाठी.

4. [सर्व्हर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ऑनचेन [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ला कॉल करते.

5. `digResponse` दोन गोष्टी करते. प्रथम, ते [शून्य ज्ञान पुरावा तपासते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). नंतर, जर पुरावा तपासला गेला, तर ते निकालावर प्रक्रिया करण्यासाठी [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ला कॉल करते.

6. `processDigResult` गेम [हरला आहे की नाही](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) किंवा [जिंकला आहे की नाही](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) हे तपासते, आणि [`Map`, ऑनचेन नकाशा अद्यतनित करते](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. क्लायंट अद्यतने आपोआप उचलतो आणि [खेळाडूला दाखवलेला नकाशा अद्यतनित करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), आणि लागू असल्यास खेळाडूला सांगतो की तो जिंकला आहे की हरला आहे.

## Zokrates वापरणे {#using-zokrates}

वर स्पष्ट केलेल्या प्रवाहांमध्ये आम्ही शून्य-ज्ञान भागांना वगळले, त्यांना एक काळा बॉक्स मानले. आता ते उघडून पाहूया आणि तो कोड कसा लिहिला आहे ते पाहूया.

### नकाशा हॅश करणे {#hashing-map}

आपण [हा JavaScript कोड](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) वापरून [Poseidon](https://www.poseidon-hash.info) अंमलात आणू शकतो, जो आपण वापरत असलेला Zokrates हॅश फंक्शन आहे. तथापि, हे जलद असले तरी, Zokrates हॅश फंक्शन वापरण्यापेक्षा हे अधिक क्लिष्ट असेल. हे एक ट्युटोरियल आहे, आणि म्हणून कोड साधेपणासाठी ऑप्टिमाइझ केला आहे, कार्यक्षमतेसाठी नाही. म्हणून, आम्हाला दोन भिन्न Zokrates प्रोग्राम्सची आवश्यकता आहे, एक नकाशाचा हॅश (`hash`) मोजण्यासाठी आणि दुसरा नकाशावरील स्थानावरील खोदण्याच्या परिणामाचा शून्य-ज्ञान पुरावा (`dig`) तयार करण्यासाठी.

### हॅश फंक्शन {#hash-function}

हे फंक्शन आहे जे नकाशाचा हॅश मोजते. आपण या कोडची ओळ-दर-ओळ पाहणी करू.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

या दोन ओळी [Zokrates स्टँडर्ड लायब्ररी](https://zokrates.github.io/toolbox/stdlib.html) मधून दोन फंक्शन्स आयात करतात. [पहिले फंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) [Poseidon हॅश](https://www.poseidon-hash.info/) आहे. ते [`field` घटकांची](https://zokrates.github.io/language/types.html#field) एक ॲरे घेते आणि `field` परत करते.

Zokrates मधील फील्ड घटक सामान्यतः 256 बिट्सपेक्षा कमी असतो, परंतु जास्त नाही. कोड सुलभ करण्यासाठी, आम्ही नकाशा 512 बिट्सपर्यंत मर्यादित ठेवतो, आणि चार फील्ड्सच्या ॲरेचा हॅश करतो, आणि प्रत्येक फील्डमध्ये आम्ही फक्त 128 बिट्स वापरतो. [`pack128` फंक्शन](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) या उद्देशासाठी 128 बिट्सच्या ॲरेला `field` मध्ये बदलते.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

ही ओळ फंक्शनची व्याख्या सुरू करते. `hashMap` ला `map` नावाचा एकच पॅरामीटर मिळतो, जो दोन-मितीय `bool`(ean) ॲरे आहे. नकाशाचा आकार `width+2` बाय `height+2` आहे, ज्याची कारणे [खाली स्पष्ट केली आहेत](#why-map-border).

आपण `${width+2}` आणि `${height+2}` वापरू शकतो कारण Zokrates प्रोग्राम्स या ॲप्लिकेशनमध्ये [टेम्पलेट स्ट्रिंग्स](https://www.w3schools.com/js/js_string_templates.asp) म्हणून संग्रहित आहेत. `${` आणि `}` मधील कोड JavaScript द्वारे मूल्यांकन केला जातो आणि अशा प्रकारे प्रोग्राम वेगवेगळ्या नकाशा आकारांसाठी वापरला जाऊ शकतो. मॅप पॅरामीटरच्या सभोवताली एक स्थान रुंद बॉम्ब नसलेली सीमा आहे, ज्यामुळे आपल्याला रुंदी आणि उंचीमध्ये दोन जोडण्याची गरज आहे.

रिटर्न व्हॅल्यू एक `field` आहे ज्यात हॅश असतो.

```
   bool[512] mut map1d = [false; 512];
```

नकाशा दोन-मितीय आहे. तथापि, `pack128` फंक्शन दोन-मितीय ॲरेसह कार्य करत नाही. म्हणून आपण प्रथम नकाशाला 512-बाईट ॲरेमध्ये, `map1d` वापरून सपाट करतो. डीफॉल्टनुसार Zokrates व्हेरिएबल्स स्थिर असतात, परंतु आपल्याला या ॲरेला लूपमध्ये मूल्ये नियुक्त करण्याची आवश्यकता आहे, म्हणून आपण ते [`mut`](https://zokrates.github.io/language/variables.html#mutability) म्हणून परिभाषित करतो.

आपल्याला ॲरेला इनिशिएलाइझ करण्याची आवश्यकता आहे कारण Zokrates मध्ये `undefined` नाही. `[false; 512]` अभिव्यक्तीचा अर्थ [512 `false` मूल्यांची एक ॲरे](https://zokrates.github.io/language/types.html#declaration-and-initialization) आहे.

```
   u32 mut counter = 0;
```

आपण `map1d` मध्ये आधीच भरलेल्या बिट्स आणि न भरलेल्या बिट्समध्ये फरक करण्यासाठी एका काउंटरची देखील आवश्यकता आहे.

```
   for u32 x in 0..${width+2} {
```

हे तुम्ही Zokrates मध्ये [`for` लूप](https://zokrates.github.io/language/control_flow.html#for-loops) कसे घोषित करता ते आहे. Zokrates `for` लूपला निश्चित मर्यादा असणे आवश्यक आहे, कारण ते लूपसारखे दिसत असले तरी, कंपायलर प्रत्यक्षात ते "अनरोल" करतो. अभिव्यक्ती `${width+2}` एक कंपाइल टाइम कॉन्स्टंट आहे कारण `width` TypeScript कोड कंपायलरला कॉल करण्यापूर्वी सेट करते.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

नकाशातील प्रत्येक स्थानासाठी, ते मूल्य `map1d` ॲरेमध्ये ठेवा आणि काउंटर वाढवा.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` `map1d` मधून चार `field` मूल्यांची ॲरे तयार करण्यासाठी. Zokrates मध्ये `array[a..b]` म्हणजे ॲरेचा तो तुकडा जो `a` पासून सुरू होतो आणि `b-1` वर संपतो.

```
    return poseidon(hashMe);
}
```

या ॲरेला हॅशमध्ये रूपांतरित करण्यासाठी `poseidon` वापरा.

### हॅश प्रोग्राम {#hash-program}

सर्व्हरला गेम ओळखकर्ते तयार करण्यासाठी थेट `hashMap` कॉल करण्याची आवश्यकता आहे. तथापि, Zokrates प्रोग्राम सुरू करण्यासाठी फक्त `main` फंक्शन कॉल करू शकतो, म्हणून आम्ही एक प्रोग्राम तयार करतो ज्यात `main` हॅश फंक्शनला कॉल करतो.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### खोदण्याचा प्रोग्राम {#dig-program}

हे ॲप्लिकेशनच्या शून्य-ज्ञान भागाचे हृदय आहे, जिथे आम्ही खोदण्याच्या परिणामांची पडताळणी करण्यासाठी वापरले जाणारे पुरावे तयार करतो.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### नकाशाची सीमा का {#why-map-border}

शून्य-ज्ञान पुरावे [अंकगणित सर्किट्स](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) वापरतात, ज्यात `if` स्टेटमेंटचा सोपा पर्याय नसतो. त्याऐवजी, ते [कंडिशनल ऑपरेटर](https://en.wikipedia.org/wiki/Ternary_conditional_operator) च्या समतुल्य वापरतात. जर `a` शून्य किंवा एक असू शकते, तर तुम्ही `if a { b } else { c }` हे `ab+(1-a)c` म्हणून मोजू शकता.

यामुळे, Zokrates `if` स्टेटमेंट नेहमी दोन्ही शाखांचे मूल्यांकन करते. उदाहरणार्थ, जर तुमच्याकडे हा कोड असेल:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

ते त्रुटी देईल, कारण त्याला `arr[10]` मोजण्याची आवश्यकता आहे, जरी ते मूल्य नंतर शून्याने गुणले जाईल.

या कारणामुळे आम्हाला नकाशाच्या सभोवताली एक स्थान रुंद सीमा आवश्यक आहे. आम्हाला एका स्थानाच्या सभोवतालच्या एकूण माइन्सची संख्या मोजण्याची आवश्यकता आहे, आणि याचा अर्थ असा आहे की आम्हाला जिथे खोदकाम करत आहोत त्या स्थानाच्या वर आणि खाली, डावीकडे आणि उजवीकडे एक पंक्ती पाहण्याची आवश्यकता आहे. याचा अर्थ असा आहे की ते स्थान Zokrates ला प्रदान केलेल्या नकाशा ॲरेमध्ये अस्तित्वात असले पाहिजे.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

डीफॉल्टनुसार Zokrates पुरावे त्यांचे इनपुट समाविष्ट करतात. एका जागेच्या आसपास पाच माइन्स आहेत हे जाणून घेण्याचा काही उपयोग नाही जोपर्यंत तुम्हाला ती जागा कोणती आहे हे माहित नसेल (आणि तुम्ही फक्त तुमच्या विनंतीशी जुळवू शकत नाही, कारण मग प्रोव्हर वेगवेगळी मूल्ये वापरू शकतो आणि तुम्हाला त्याबद्दल सांगू शकत नाही). तथापि, आपल्याला नकाशा गुप्त ठेवण्याची गरज आहे, तो Zokrates ला पुरवताना. उपाय म्हणजे `private` पॅरामीटर वापरणे, जो पुराव्याद्वारे उघड होत _नाही_.

यामुळे गैरवापराचा आणखी एक मार्ग खुला होतो. प्रोव्हर योग्य कोऑर्डिनेट्स वापरू शकतो, परंतु जागेच्या आसपास कितीही माइन्स असलेला नकाशा तयार करू शकतो, आणि शक्यतो जागेवरच. या गैरवापराला प्रतिबंध करण्यासाठी, आम्ही शून्य ज्ञान पुराव्यामध्ये नकाशाचा हॅश समाविष्ट करतो, जो गेम ओळखकर्ता आहे.

```
   return (hashMap(map),
```

येथे रिटर्न व्हॅल्यू एक टपल आहे ज्यात नकाशा हॅश ॲरे तसेच खोदण्याचा परिणाम समाविष्ट आहे.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

जर जागेवरच बॉम्ब असेल तर आम्ही 255 एक विशेष मूल्य म्हणून वापरतो.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

जर खेळाडूने माइनवर आघात केला नसेल, तर जागेच्या सभोवतालच्या क्षेत्रासाठी माइन संख्या जोडा आणि ते परत करा.

### TypeScript मधून Zokrates वापरणे {#using-zokrates-from-typescript}

Zokrates चा कमांड लाइन इंटरफेस आहे, परंतु या प्रोग्राममध्ये आपण तो [TypeScript कोड](https://zokrates.github.io/toolbox/zokrates_js.html) मध्ये वापरतो.

Zokrates व्याख्या असलेली लायब्ररी [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) आहे.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript बाइंडिंग्ज](https://zokrates.github.io/toolbox/zokrates_js.html) आयात करा. आम्हाला फक्त [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) फंक्शनची आवश्यकता आहे कारण ते सर्व Zokrates व्याख्यांवर निराकरण करणारे एक वचन परत करते.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates प्रमाणेच, आम्ही फक्त एकच फंक्शन निर्यात करतो, जे [असिंक्रोनस](https://www.w3schools.com/js/js_async.asp) आहे. जेव्हा ते शेवटी परत येते, तेव्हा ते खाली पाहिल्याप्रमाणे अनेक फंक्शन्स प्रदान करते.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates सुरू करा, लायब्ररीमधून आपल्याला आवश्यक असलेले सर्व मिळवा.

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

पुढे आपल्याकडे हॅश फंक्शन आणि दोन Zokrates प्रोग्राम आहेत जे आपण वर पाहिले.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

येथे आम्ही ते प्रोग्राम संकलित करतो.

```typescript
// Create the keys for zero knowledge verification.
// On a production system you'd want to use a setup ceremony.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

उत्पादन प्रणालीवर आपण अधिक गुंतागुंतीचा [सेटअप समारंभ](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) वापरू शकतो, परंतु प्रात्यक्षिकासाठी हे पुरेसे आहे. वापरकर्त्यांना प्रोव्हर की माहित असणे ही समस्या नाही - ते अजूनही ती गोष्टी सिद्ध करण्यासाठी वापरू शकत नाहीत जोपर्यंत त्या खऱ्या नसतील. कारण आपण एन्ट्रॉपी (दुसरा पॅरामीटर, `""`) निर्दिष्ट करतो, परिणाम नेहमी सारखेच असतील.

**टीप:** Zokrates प्रोग्राम्सचे संकलन आणि की निर्मिती ही मंद प्रक्रिया आहे. प्रत्येक वेळी ती पुनरावृत्ती करण्याची गरज नाही, फक्त नकाशाचा आकार बदलल्यावर. उत्पादन प्रणालीवर तुम्ही ते एकदा कराल आणि नंतर आउटपुट संग्रहित कराल. मी येथे हे फक्त साधेपणासाठी करत आहे.

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) फंक्शन प्रत्यक्षात Zokrates प्रोग्राम चालवते. ते दोन फील्ड्ससह एक रचना परत करते: `output`, जे प्रोग्रामचे आउटपुट JSON स्ट्रिंग म्हणून आहे, आणि `witness`, जे निकालाचा शून्य ज्ञान पुरावा तयार करण्यासाठी आवश्यक माहिती आहे. येथे आम्हाला फक्त आउटपुटची आवश्यकता आहे.

आउटपुट `"31337"` स्वरूपात एक स्ट्रिंग आहे, जी अवतरण चिन्हांमध्ये बंद केलेली एक दशांश संख्या आहे. परंतु `viem` साठी आम्हाला आवश्यक असलेले आउटपुट `0x60A7` स्वरूपातील एक हेक्साडेसिमल संख्या आहे. म्हणून आपण अवतरण चिन्ह काढून टाकण्यासाठी `.slice(1,-1)` वापरतो आणि नंतर उर्वरित स्ट्रिंग, जी एक दशांश संख्या आहे, [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) मध्ये चालवण्यासाठी `BigInt` वापरतो. `.toString(16)` हे `BigInt` ला हेक्साडेसिमल स्ट्रिंगमध्ये रूपांतरित करते, आणि `"0x"+` हेक्साडेसिमल संख्यांसाठी मार्कर जोडते.

```typescript
// Dig and return a zero knowledge proof of the result
// (server-side code)
```

शून्य ज्ञान पुराव्यामध्ये सार्वजनिक इनपुट (`x` आणि `y`) आणि निकाल (नकाशाचा हॅश आणि बॉम्बची संख्या) समाविष्ट आहेत.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates मध्ये निर्देशांक मर्यादेबाहेर आहे की नाही हे तपासणे एक समस्या आहे, म्हणून आपण ते येथे करतो.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

खोदण्याचा प्रोग्राम कार्यान्वित करा.

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

एक Solidity व्हेरिफायर, एक स्मार्ट कॉन्ट्रॅक्ट जो आपण ब्लॉकचेनवर तैनात करू शकतो आणि `digCompiled.program` द्वारे व्युत्पन्न केलेल्या पुराव्यांची पडताळणी करण्यासाठी वापरू शकतो.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

शेवटी, इतर कोडला आवश्यक असलेली प्रत्येक गोष्ट परत करा.

## सुरक्षा चाचण्या {#security-tests}

सुरक्षा चाचण्या महत्त्वाच्या आहेत कारण कार्यक्षमतेतील एक बग अखेरीस स्वतःला प्रकट करेल. परंतु जर ॲप्लिकेशन असुरक्षित असेल, तर ते बराच काळ लपून राहण्याची शक्यता आहे, जोपर्यंत कोणीतरी फसवणूक करून इतरांच्या संसाधनांवर ताबा मिळवून ते उघड करत नाही.

### परवानग्या {#permissions}

या गेममध्ये एक विशेषाधिकारप्राप्त संस्था आहे, सर्व्हर. तो एकमेव वापरकर्ता आहे ज्याला [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) मधील फंक्शन्स कॉल करण्याची परवानगी आहे. आपण [`cast`](https://book.getfoundry.sh/cast/) वापरून परवानगी असलेल्या फंक्शन्सचे कॉल्स फक्त सर्व्हर खात्याप्रमाणेच परवानगी आहेत याची पडताळणी करू शकतो.

[सर्व्हरची खाजगी की `setupNetwork.ts` मध्ये आहे](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (ब्लॉकचेन) चालवणाऱ्या संगणकावर, हे पर्यावरण व्हेरिएबल्स सेट करा.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. व्हेरिफायर ॲड्रेस एक अनधिकृत ॲड्रेस म्हणून सेट करण्याचा प्रयत्न करण्यासाठी `cast` वापरा.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` केवळ अपयश नोंदवत नाही, तर तुम्ही ब्राउझरवरील गेममध्ये **MUD Dev Tools** उघडू शकता, **Tables** वर क्लिक करू शकता आणि **app\_\_VerifierAddress** निवडू शकता. ॲड्रेस शून्य नाही हे पहा.

3. व्हेरिफायर ॲड्रेस सर्व्हरचा ॲड्रेस म्हणून सेट करा.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** मधील ॲड्रेस आता शून्य असावा.

एकाच `System` मधील सर्व MUD फंक्शन्स एकाच ॲक्सेस कंट्रोलमधून जातात, म्हणून मी ही चाचणी पुरेशी मानतो. जर तुम्ही मानत नसाल, तर तुम्ही [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) मधील इतर फंक्शन्स तपासू शकता.

### शून्य-ज्ञान गैरवापर {#zero-knowledge-abuses}

Zokrates ची पडताळणी करण्याचे गणित या ट्युटोरियलच्या कक्षेबाहेर आहे (आणि माझ्या क्षमतेबाहेर). तथापि, आपण शून्य-ज्ञान कोडवर विविध तपासण्या चालवू शकतो हे सत्यापित करण्यासाठी की जर ते योग्यरित्या केले नाही तर ते अयशस्वी होते. या सर्व चाचण्यांसाठी आम्हाला [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) मध्ये बदल करणे आणि संपूर्ण ॲप्लिकेशन पुन्हा सुरू करणे आवश्यक असेल. सर्व्हर प्रक्रिया पुन्हा सुरू करणे पुरेसे नाही, कारण ते ॲप्लिकेशनला एका अशक्य स्थितीत टाकते (खेळाडूचा गेम प्रगतीपथावर आहे, परंतु गेम आता सर्व्हरला उपलब्ध नाही).

#### चुकीचे उत्तर {#wrong-answer}

सर्वात सोपी शक्यता म्हणजे शून्य-ज्ञान पुराव्यामध्ये चुकीचे उत्तर देणे. ते करण्यासाठी, आम्ही `zkDig` मध्ये जातो आणि [ओळ 91 मध्ये बदल करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

याचा अर्थ असा आहे की आपण नेहमीच दावा करू की एक बॉम्ब आहे, योग्य उत्तराची पर्वा न करता. या आवृत्तीसह खेळण्याचा प्रयत्न करा, आणि तुम्हाला `pnpm dev` स्क्रीनच्या **सर्व्हर** टॅबमध्ये ही त्रुटी दिसेल:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

त्यामुळे या प्रकारची फसवणूक अयशस्वी होते.

#### चुकीचा पुरावा {#wrong-proof}

जर आपण योग्य माहिती दिली, पण फक्त चुकीचा पुरावा डेटा दिला तर काय होईल? आता, ओळ 91 याने बदला:

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

ते अजूनही अयशस्वी होते, पण आता ते कारणाशिवाय अयशस्वी होते कारण ते व्हेरिफायर कॉल दरम्यान होते.

### वापरकर्ता शून्य-विश्वास कोड कसा सत्यापित करू शकतो? {#user-verify-zero-trust}

स्मार्ट कॉन्ट्रॅक्ट्स सत्यापित करणे तुलनेने सोपे आहे. सामान्यतः, डेव्हलपर ब्लॉक एक्सप्लोररवर सोर्स कोड प्रकाशित करतो आणि ब्लॉक एक्सप्लोरर हे सत्यापित करतो की सोर्स कोड [कॉन्ट्रॅक्ट डिप्लोयमेंट ट्रान्झॅक्शन](/developers/docs/smart-contracts/deploying/) मधील कोडवर कंपाईल होतो. MUD `System` च्या बाबतीत हे [थोडं अधिक क्लिष्ट](https://mud.dev/cli/verify) आहे, पण जास्त नाही.

शून्य-ज्ञानासह हे अधिक कठीण आहे. व्हेरिफायरमध्ये काही स्थिर मूल्ये असतात आणि त्यांच्यावर काही गणना चालवते. यावरून काय सिद्ध होत आहे हे कळत नाही.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

उपाय, किमान ब्लॉक एक्सप्लोरर्स त्यांच्या वापरकर्ता इंटरफेसमध्ये Zokrates पडताळणी जोडेपर्यंत, ॲप्लिकेशन डेव्हलपर्सनी Zokrates प्रोग्राम्स उपलब्ध करून देणे, आणि किमान काही वापरकर्त्यांनी ते स्वतः योग्य पडताळणी कीसह संकलित करणे हा आहे.

असे करण्यासाठी:

1. [Zokrates स्थापित करा](https://zokrates.github.io/gettingstarted.html).

2. एक फाईल तयार करा, `dig.zok`, Zokrates प्रोग्रामसह. खालील कोड गृहीत धरतो की तुम्ही मूळ नकाशाचा आकार, 10x5, ठेवला आहे.

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

3. Zokrates कोड संकलित करा आणि पडताळणी की तयार करा. पडताळणी की मूळ सर्व्हरमध्ये वापरलेल्या त्याच एन्ट्रॉपीसह तयार करणे आवश्यक आहे, [या प्रकरणात एक रिक्त स्ट्रिंग](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. तुमचा स्वतःचा Solidity व्हेरिफायर तयार करा, आणि पडताळणी करा की तो ब्लॉकचेनवरील व्हेरिफायरशी कार्यात्मकदृष्ट्या समान आहे (सर्व्हर एक टिप्पणी जोडतो, पण ते महत्त्वाचे नाही).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## डिझाइन निर्णय {#design}

कोणत्याही पुरेसे गुंतागुंतीच्या ॲप्लिकेशनमध्ये स्पर्धात्मक डिझाइन उद्दिष्ट्ये असतात ज्यांना तडजोड करावी लागते. चला काही तडजोडी पाहू आणि सध्याचा उपाय इतर पर्यायांपेक्षा का श्रेयस्कर आहे ते पाहू.

### शून्य-ज्ञान का {#why-zero-knowledge}

माइनस्वीपरसाठी तुम्हाला खरोखर शून्य-ज्ञानाची गरज नाही. सर्व्हर नेहमी नकाशा ठेवू शकतो, आणि नंतर खेळ संपल्यावर तो पूर्ण उघड करू शकतो. नंतर, खेळाच्या शेवटी, स्मार्ट कॉन्ट्रॅक्ट नकाशा हॅशची गणना करू शकतो, तो जुळतो की नाही हे सत्यापित करू शकतो, आणि जर न जुळल्यास सर्व्हरला दंड आकारू शकतो किंवा खेळ पूर्णपणे दुर्लक्षित करू शकतो.

मी हा सोपा उपाय वापरला नाही कारण तो फक्त चांगल्या प्रकारे परिभाषित शेवटच्या स्थितीसह लहान खेळांसाठी कार्य करतो. जेव्हा एखादा खेळ संभाव्यतः अनंत असतो ([स्वायत्त जगाच्या](https://0xparc.org/blog/autonomous-worlds) बाबतीत), तेव्हा तुम्हाला एक उपाय आवश्यक असतो जो स्थिती _उघड न करता_ सिद्ध करतो.

एक ट्युटोरियल म्हणून या लेखाला एक लहान खेळ हवा होता जो समजण्यास सोपा असेल, परंतु हे तंत्र लांब खेळांसाठी सर्वात उपयुक्त आहे.

### Zokrates का? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) ही एकमेव शून्य-ज्ञान लायब्ररी उपलब्ध नाही, परंतु ती सामान्य, [इम्परेटिव्ह](https://en.wikipedia.org/wiki/Imperative_programming) प्रोग्रामिंग भाषेसारखी आहे आणि बूलियन व्हेरिएबल्सना समर्थन देते.

तुमच्या ॲप्लिकेशनसाठी, वेगवेगळ्या आवश्यकतांसह, तुम्ही [Circum](https://docs.circom.io/getting-started/installation/) किंवा [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) वापरणे पसंत करू शकता.

### Zokrates कधी संकलित करावे {#when-compile-zokrates}

या प्रोग्राममध्ये आपण [प्रत्येक वेळी सर्व्हर सुरू झाल्यावर](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates प्रोग्राम संकलित करतो. हे स्पष्टपणे संसाधनांचा अपव्यय आहे, परंतु हे एक ट्युटोरियल आहे, जे साधेपणासाठी ऑप्टिमाइझ केलेले आहे.

जर मी उत्पादन-स्तरीय ॲप्लिकेशन लिहित असतो, तर मी तपासले असते की माझ्याकडे या माइनफिल्ड आकारासाठी संकलित Zokrates प्रोग्राम्सची फाईल आहे का, आणि असल्यास ती वापरली असती. तेच ऑनचेन व्हेरिफायर कॉन्ट्रॅक्ट तैनात करण्याबाबत खरे आहे.

### व्हेरिफायर आणि प्रोव्हर की तयार करणे {#key-creation}

[की निर्मिती](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ही आणखी एक शुद्ध गणना आहे जी दिलेल्या माइनफिल्ड आकारासाठी एकापेक्षा जास्त वेळा करण्याची गरज नाही. पुन्हा, हे फक्त साधेपणासाठी एकदाच केले जाते.

याव्यतिरिक्त, आपण [एक सेटअप समारंभ](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) वापरू शकतो. सेटअप समारंभाचा फायदा असा आहे की शून्य-ज्ञान पुराव्यावर फसवणूक करण्यासाठी तुम्हाला प्रत्येक सहभागीकडून एन्ट्रॉपी किंवा काही मध्यवर्ती निकालाची आवश्यकता असते. जर किमान एक समारंभ सहभागी प्रामाणिक असेल आणि ती माहिती हटवत असेल, तर शून्य-ज्ञान पुरावे विशिष्ट हल्ल्यांपासून सुरक्षित असतात. तथापि, माहिती सर्वत्र हटवली गेली आहे हे सत्यापित करण्यासाठी _कोणतीही यंत्रणा नाही_. जर शून्य-ज्ञान पुरावे अत्यंत महत्त्वाचे असतील, तर तुम्हाला सेटअप समारंभात भाग घ्यायचा आहे.

येथे आम्ही [टाऊच्या शाश्वत शक्तींवर](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) अवलंबून आहोत, ज्यात डझनभर सहभागी होते. हे कदाचित पुरेसे सुरक्षित आहे आणि बरेच सोपे आहे. आम्ही की निर्मितीदरम्यान एन्ट्रॉपी देखील जोडत नाही, ज्यामुळे वापरकर्त्यांना [शून्य-ज्ञान कॉन्फिगरेशन सत्यापित करणे](#user-verify-zero-trust) सोपे होते.

### कुठे पडताळणी करावी {#where-verification}

आपण शून्य-ज्ञान पुरावे ऑनचेन (ज्यासाठी गॅस खर्च होतो) किंवा क्लायंटमध्ये ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) वापरून) सत्यापित करू शकतो. मी पहिले निवडले, कारण यामुळे तुम्हाला एकदा [व्हेरिफायर सत्यापित करण्याची](#user-verify-zero-trust) आणि नंतर विश्वास ठेवण्याची परवानगी मिळते की जोपर्यंत त्याचा कॉन्ट्रॅक्ट ॲड्रेस तोच राहतो तोपर्यंत तो बदलत नाही. जर पडताळणी क्लायंटवर केली गेली असती, तर तुम्हाला प्रत्येक वेळी क्लायंट डाउनलोड केल्यावर मिळणाऱ्या कोडची पडताळणी करावी लागली असती.

तसेच, हा खेळ एक-खेळाडूचा असला तरी, बरेच ब्लॉकचेन खेळ बहु-खेळाडूंचे असतात. ऑनचेन पडताळणी म्हणजे तुम्ही फक्त एकदाच शून्य-ज्ञान पुरावा सत्यापित करता. क्लायंटमध्ये हे केल्यास प्रत्येक क्लायंटला स्वतंत्रपणे पडताळणी करावी लागेल.

### नकाशा TypeScript मध्ये सपाट करायचा की Zokrates मध्ये? {#where-flatten}

सर्वसाधारणपणे, जेव्हा प्रक्रिया TypeScript किंवा Zokrates मध्ये केली जाऊ शकते, तेव्हा ते TypeScript मध्ये करणे चांगले आहे, जे खूप जलद आहे आणि शून्य-ज्ञान पुराव्यांची आवश्यकता नाही. हेच कारण आहे, उदाहरणार्थ, की आम्ही Zokrates ला हॅश प्रदान करत नाही आणि ते बरोबर आहे की नाही हे सत्यापित करायला लावत नाही. हॅशिंग Zokrates मध्ये करणे आवश्यक आहे, परंतु परत आलेल्या हॅश आणि ऑनचेन हॅशमधील जुळणी त्याच्या बाहेर होऊ शकते.

तथापि, आम्ही अजूनही [Zokrates मध्ये नकाशा सपाट करतो](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), तर आपण ते TypeScript मध्ये करू शकलो असतो. कारण असे आहे की इतर पर्याय, माझ्या मते, वाईट आहेत.

- Zokrates कोडला बूलियनची एक-मितीय ॲरे प्रदान करा आणि दोन-मितीय नकाशा मिळवण्यासाठी `x*(height+2)
  +y` सारखी अभिव्यक्ती वापरा. यामुळे [कोड](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) थोडा अधिक गुंतागुंतीचा झाला असता, म्हणून मी ठरवले की ट्युटोरियलसाठी कार्यक्षमतेतील वाढ योग्य नाही.

- Zokrates ला एक-मितीय ॲरे आणि दोन-मितीय ॲरे दोन्ही पाठवा. तथापि, या उपायाने आपल्याला काहीही मिळत नाही. Zokrates कोडला हे सत्यापित करावे लागेल की त्याला प्रदान केलेली एक-मितीय ॲरे खरोखरच दोन-मितीय ॲरेचे योग्य प्रतिनिधित्व आहे. त्यामुळे कार्यक्षमतेत कोणतीही वाढ होणार नाही.

- Zokrates मध्ये दोन-मितीय ॲरे सपाट करा. हा सर्वात सोपा पर्याय आहे, म्हणून मी तो निवडला.

### नकाशे कुठे संग्रहित करायचे {#where-store-maps}

या ॲप्लिकेशनमध्ये [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) फक्त मेमरीमधील एक व्हेरिएबल आहे. याचा अर्थ असा आहे की जर तुमचा सर्व्हर बंद पडला आणि पुन्हा सुरू करण्याची गरज पडली, तर त्याने संग्रहित केलेली सर्व माहिती नष्ट होईल. खेळाडू केवळ आपला खेळ सुरू ठेवू शकत नाहीत, तर ते नवीन खेळ देखील सुरू करू शकत नाहीत कारण ऑनचेन घटकाला वाटते की त्यांचा खेळ अजूनही प्रगतीपथावर आहे.

उत्पादन प्रणालीसाठी हे स्पष्टपणे वाईट डिझाइन आहे, ज्यात तुम्ही ही माहिती डेटाबेसमध्ये संग्रहित कराल. मी येथे व्हेरिएबल वापरण्याचे एकमेव कारण म्हणजे हे एक ट्युटोरियल आहे आणि साधेपणा ही मुख्य बाब आहे.

## निष्कर्ष: कोणत्या परिस्थितीत हे योग्य तंत्र आहे? {#conclusion}

तर, आता तुम्हाला माहित आहे की एक सर्व्हरसह एक गेम कसा लिहायचा जो ऑनचेन नसलेली गुप्त स्थिती संग्रहित करतो. पण कोणत्या परिस्थितीत तुम्ही ते करावे? दोन मुख्य विचार आहेत.

- _लांब चालणारा खेळ_: [वर उल्लेख केल्याप्रमाणे](#why-zero-knowledge), एका लहान खेळात तुम्ही खेळ संपल्यावर फक्त स्थिती प्रकाशित करू शकता आणि नंतर सर्वकाही सत्यापित करू शकता. परंतु जेव्हा खेळ लांब किंवा अनिश्चित काळ चालतो, आणि स्थिती गुप्त ठेवण्याची गरज असते, तेव्हा तो पर्याय नाही.

- _काही केंद्रीकरण स्वीकार्य_: शून्य-ज्ञान पुरावे अखंडता सत्यापित करू शकतात, की एक संस्था निकाल खोटे ठरवत नाही. ते जे करू शकत नाहीत ते हे सुनिश्चित करणे आहे की संस्था अजूनही उपलब्ध असेल आणि संदेशांना उत्तर देईल. ज्या परिस्थितीत उपलब्धता देखील विकेंद्रित करणे आवश्यक आहे, तेथे शून्य-ज्ञान पुरावे पुरेसे उपाय नाहीत, आणि तुम्हाला [बहु-पक्षीय गणना](https://en.wikipedia.org/wiki/Secure_multi-party_computation) आवश्यक आहे.

[माझ्या कामाबद्दल अधिक माहितीसाठी येथे पहा](https://cryptodocguy.pro/).

### पोचपावती {#acknowledgements}

- अल्वारो अलोन्सो यांनी या लेखाचा मसुदा वाचला आणि Zokrates बद्दलच्या माझ्या काही गैरसमजुती दूर केल्या.

कोणत्याही उर्वरित चुका माझ्या जबाबदारी आहेत.
