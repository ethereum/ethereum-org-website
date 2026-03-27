---
title: "ரகசிய நிலைக்காக பூஜ்ஜிய-அறிவைப் பயன்படுத்துதல்"
description: "ஆன்செயின் விளையாட்டுகள் வரம்புக்குட்பட்டவை, ஏனெனில் அவற்றால் எந்த மறைக்கப்பட்ட தகவலையும் வைத்திருக்க முடியாது. இந்த டுடோரியலைப் படித்த பிறகு, ஒரு வாசகர் பூஜ்ஜிய-அறிவு சான்றுகள் மற்றும் சேவையகக் கூறுகளை இணைத்து, ரகசிய நிலை, ஆஃப்செயின், கூறுடன் சரிபார்க்கக்கூடிய விளையாட்டுகளை உருவாக்க முடியும். இதைச் செய்வதற்கான நுட்பம் மைன்ஸ்வீப்பர் விளையாட்டை உருவாக்குவதன் மூலம் விளக்கப்படும்."
author: "ஓரி பொமரன்ட்ஸ்"
tags: ["சேவையகம்", "ஆஃப்செயின்", "மையப்படுத்தப்பட்ட", "பூஜ்ஜிய-அறிவு", "zokrates", "mud", "தனியுரிமை"]
skill: advanced
breadcrumb: "ZK ரகசிய நிலை"
lang: ta
published: 2025-03-15
---

_பிளாக்செயினில் எந்த ரகசியங்களும் இல்லை_. பிளாக்செயினில் பதிவிடப்படும் அனைத்தும் அனைவரும் படிக்கும் வகையில் திறந்திருக்கும். இது அவசியமானது, ஏனெனில் பிளாக்செயின் என்பது எவரும் அதைச் சரிபார்க்க முடியும் என்பதை அடிப்படையாகக் கொண்டது. இருப்பினும், விளையாட்டுகள் பெரும்பாலும் ரகசிய நிலையை நம்பியுள்ளன. எடுத்துக்காட்டாக, நீங்கள் ஒரு பிளாக்செயின் எக்ஸ்ப்ளோரருக்குச் சென்று வரைபடத்தைப் பார்க்க முடிந்தால், [மைன்ஸ்வீப்பர்](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) விளையாட்டுக்கு எந்த அர்த்தமும் இல்லை.

ரகசிய நிலையை வைத்திருக்க [சேவையகக் கூறு](/developers/tutorials/server-components/) ஒன்றைப் பயன்படுத்துவதே எளிமையான தீர்வாகும். இருப்பினும், விளையாட்டு உருவாக்குநரால் ஏமாற்றப்படுவதைத் தடுக்கவே நாம் பிளாக்செயினைப் பயன்படுத்துகிறோம். சேவையகக் கூறின் நேர்மையை நாம் உறுதி செய்ய வேண்டும். சேவையகம் நிலையின் ஹாஷை வழங்க முடியும், மேலும் ஒரு நகர்வின் முடிவைக் கணக்கிடப் பயன்படுத்தப்படும் நிலை சரியானது என்பதை நிரூபிக்க [பூஜ்ஜிய-அறிவு சான்றுகளை](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) பயன்படுத்தலாம்.

இந்தக் கட்டுரையைப் படித்த பிறகு, இந்த வகையான ரகசிய நிலையை வைத்திருக்கும் சேவையகம், நிலையைக் காண்பிப்பதற்கான கிளையண்ட் மற்றும் இரண்டிற்கும் இடையிலான தகவல்தொடர்புக்கான ஆன்செயின் கூறு ஆகியவற்றை எவ்வாறு உருவாக்குவது என்பதை நீங்கள் அறிந்துகொள்வீர்கள். நாம் பயன்படுத்தும் முக்கிய கருவிகள்:

| கருவி                                          | நோக்கம்                                                 | சரிபார்க்கப்பட்ட பதிப்பு |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | பூஜ்ஜிய-அறிவு சான்றுகள் மற்றும் அவற்றின் சரிபார்ப்பு            |               1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | சேவையகம் மற்றும் கிளையண்ட் இரண்டிற்குமான நிரலாக்க மொழி |               5.4.2 |
| [Node](https://nodejs.org/en)                 | சேவையகத்தை இயக்குதல்                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | பிளாக்செயினுடனான தகவல்தொடர்பு                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | ஆன்செயின் தரவு மேலாண்மை                                 |              2.0.12 |
| [React](https://react.dev/)                   | கிளையண்ட் பயனர் இடைமுகம்                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | கிளையண்ட் குறியீட்டை வழங்குதல்                                 |               4.2.1 |

## மைன்ஸ்வீப்பர் எடுத்துக்காட்டு {#minesweeper}

[மைன்ஸ்வீப்பர்](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) என்பது கண்ணிவெடி களத்துடன் கூடிய ரகசிய வரைபடத்தை உள்ளடக்கிய ஒரு விளையாட்டாகும். வீரர் ஒரு குறிப்பிட்ட இடத்தில் தோண்டத் தேர்வு செய்கிறார். அந்த இடத்தில் கண்ணிவெடி இருந்தால், விளையாட்டு முடிந்துவிடும். இல்லையெனில், அந்த இடத்தைச் சுற்றியுள்ள எட்டு சதுரங்களில் உள்ள கண்ணிவெடிகளின் எண்ணிக்கையை வீரர் பெறுவார்.

இந்தப் பயன்பாடு [MUD](https://mud.dev/) ஐப் பயன்படுத்தி எழுதப்பட்டுள்ளது, இது [key-value தரவுத்தளத்தைப்](https://aws.amazon.com/nosql/key-value/) பயன்படுத்தி ஆன்செயினில் தரவைச் சேமிக்கவும், அந்தத் தரவை ஆஃப்செயின் கூறுகளுடன் தானாகவே ஒத்திசைக்கவும் அனுமதிக்கும் ஒரு கட்டமைப்பாகும். ஒத்திசைவுக்கு கூடுதலாக, அணுகல் கட்டுப்பாட்டை வழங்குவதையும், பிற பயனர்கள் அனுமதியின்றி நமது பயன்பாட்டை [நீட்டிப்பதையும்](https://mud.dev/guides/extending-a-world) MUD எளிதாக்குகிறது.

### மைன்ஸ்வீப்பர் எடுத்துக்காட்டை இயக்குதல் {#running-minesweeper-example}

மைன்ஸ்வீப்பர் எடுத்துக்காட்டை இயக்க:

1. நீங்கள் [முன்நிபந்தனைகளை நிறுவியுள்ளீர்கள்](https://mud.dev/quickstart#prerequisites) என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), மற்றும் [`mprocs`](https://github.com/pvolok/mprocs).

2. களஞ்சியத்தை குளோன் செய்யவும்.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. தொகுப்புகளை நிறுவவும்.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   `pnpm install` இன் ஒரு பகுதியாக Foundry நிறுவப்பட்டிருந்தால், நீங்கள் கட்டளை வரி ஷெல்லை மறுதொடக்கம் செய்ய வேண்டும்.

4. ஒப்பந்தங்களை தொகுக்கவும்

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. நிரலைத் தொடங்கி (ஒரு [anvil](https://book.getfoundry.sh/anvil/) பிளாக்செயின் உட்பட) காத்திருக்கவும்.

   ```sh copy
   mprocs
   ```

   தொடக்கத்திற்கு நீண்ட நேரம் எடுக்கும் என்பதை நினைவில் கொள்ளவும். முன்னேற்றத்தைக் காண, முதலில் MUD ஒப்பந்தங்கள் பயன்படுத்தப்படுவதைக் காண _contracts_ தாவலுக்குச் செல்ல கீழ் அம்புக்குறியைப் பயன்படுத்தவும். _Waiting for file changes…_ என்ற செய்தியைப் பெறும்போது, ஒப்பந்தங்கள் பயன்படுத்தப்பட்டு, மேலும் முன்னேற்றம் _server_ தாவலில் நடக்கும். அங்கு, _Verifier address: 0x...._ என்ற செய்தியைப் பெறும் வரை காத்திருக்கவும்.

   இந்தப் படி வெற்றிகரமாக இருந்தால், இடதுபுறத்தில் வெவ்வேறு செயல்முறைகள் மற்றும் வலதுபுறத்தில் தற்போது தேர்ந்தெடுக்கப்பட்ட செயல்முறைக்கான கன்சோல் வெளியீட்டுடன் `mprocs` திரையைக் காண்பீர்கள்.

   ![The mprocs screen](./mprocs.png)

   `mprocs` இல் சிக்கல் இருந்தால், நீங்கள் நான்கு செயல்முறைகளையும் கைமுறையாக இயக்கலாம், ஒவ்வொன்றும் அதன் சொந்த கட்டளை வரி சாளரத்தில்:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **ஒப்பந்தங்கள்** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **சேவையகம்**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **கிளையண்ட்**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. இப்போது நீங்கள் [கிளையண்டிற்கு](http://localhost:3000) உலாவலாம், **New Game** என்பதைக் கிளிக் செய்து, விளையாடத் தொடங்கலாம்.

### அட்டவணைகள் {#tables}

ஆன்செயினில் நமக்கு [பல அட்டவணைகள்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) தேவை.

- `Configuration`: இந்த அட்டவணை ஒரு சிங்கிள்டன், இதற்கு விசை இல்லை மற்றும் ஒற்றை பதிவு உள்ளது. இது விளையாட்டு உள்ளமைவு தகவலை வைத்திருக்கப் பயன்படுகிறது:
  - `height`: கண்ணிவெடி களத்தின் உயரம்
  - `width`: கண்ணிவெடி களத்தின் அகலம்
  - `numberOfBombs`: ஒவ்வொரு கண்ணிவெடி களத்திலும் உள்ள வெடிகுண்டுகளின் எண்ணிக்கை
- `VerifierAddress`: இந்த அட்டவணையும் ஒரு சிங்கிள்டன் ஆகும். இது உள்ளமைவின் ஒரு பகுதியான சரிபார்ப்பு ஒப்பந்தத்தின் (`verifier`) முகவரியை வைத்திருக்கப் பயன்படுகிறது. இந்தத் தகவலை நாம் `Configuration` அட்டவணையில் வைத்திருக்கலாம், ஆனால் இது சேவையகம் என்ற வேறுபட்ட கூறால் அமைக்கப்பட்டுள்ளது, எனவே இதை ஒரு தனி அட்டவணையில் வைப்பது எளிது.

- `PlayerGame`: விசை என்பது வீரரின் முகவரி. தரவு:

  - `gameId`: 32-பைட் மதிப்பு, இது வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் ஆகும் (விளையாட்டு அடையாளங்காட்டி).
  - `win`: வீரர் விளையாட்டில் வெற்றி பெற்றாரா என்பதைக் குறிக்கும் பூலியன்.
  - `lose`: வீரர் விளையாட்டில் தோற்றாரா என்பதைக் குறிக்கும் பூலியன்.
  - `digNumber`: விளையாட்டில் வெற்றிகரமான தோண்டல்களின் எண்ணிக்கை.

- `GamePlayer`: இந்த அட்டவணை `gameId` இலிருந்து வீரர் முகவரிக்கு தலைகீழ் மேப்பிங்கை வைத்திருக்கிறது.

- `Map`: விசை என்பது மூன்று மதிப்புகளின் டூப்பிள் ஆகும்:

  - `gameId`: 32-பைட் மதிப்பு, இது வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் ஆகும் (விளையாட்டு அடையாளங்காட்டி).
  - `x` ஆயத்தொலைவு
  - `y` ஆயத்தொலைவு

  மதிப்பு ஒரு ஒற்றை எண். வெடிகுண்டு கண்டறியப்பட்டால் அது 255 ஆகும். இல்லையெனில், அது அந்த இடத்தைச் சுற்றியுள்ள வெடிகுண்டுகளின் எண்ணிக்கை கூட்டல் ஒன்று. நாம் வெடிகுண்டுகளின் எண்ணிக்கையை மட்டும் பயன்படுத்த முடியாது, ஏனெனில் இயல்பாக EVM இல் உள்ள அனைத்து சேமிப்பகமும் மற்றும் MUD இல் உள்ள அனைத்து வரிசை மதிப்புகளும் பூஜ்ஜியமாகும். "வீரர் இன்னும் இங்கே தோண்டவில்லை" மற்றும் "வீரர் இங்கே தோண்டினார், சுற்றிலும் பூஜ்ஜிய வெடிகுண்டுகள் இருப்பதைக் கண்டறிந்தார்" ஆகியவற்றுக்கு இடையே நாம் வேறுபடுத்திக் காட்ட வேண்டும்.

கூடுதலாக, கிளையண்டிற்கும் சேவையகத்திற்கும் இடையிலான தகவல்தொடர்பு ஆன்செயின் கூறு மூலம் நிகழ்கிறது. இதுவும் அட்டவணைகளைப் பயன்படுத்தி செயல்படுத்தப்படுகிறது.

- `PendingGame`: புதிய விளையாட்டைத் தொடங்குவதற்கான சேவை செய்யப்படாத கோரிக்கைகள்.
- `PendingDig`: ஒரு குறிப்பிட்ட விளையாட்டில் ஒரு குறிப்பிட்ட இடத்தில் தோண்டுவதற்கான சேவை செய்யப்படாத கோரிக்கைகள். இது ஒரு [ஆஃப்செயின் அட்டவணை](https://mud.dev/store/tables#types-of-tables) ஆகும், அதாவது இது EVM சேமிப்பகத்தில் எழுதப்படாது, நிகழ்வுகளைப் பயன்படுத்தி ஆஃப்செயினில் மட்டுமே படிக்க முடியும்.

### செயலாக்கம் மற்றும் தரவு ஓட்டங்கள் {#execution-data-flows}

இந்த ஓட்டங்கள் கிளையண்ட், ஆன்செயின் கூறு மற்றும் சேவையகத்திற்கு இடையிலான செயலாக்கத்தை ஒருங்கிணைக்கின்றன.

#### துவக்கம் {#initialization-flow}

நீங்கள் `mprocs` ஐ இயக்கும்போது, இந்தப் படிகள் நிகழ்கின்றன:

1. [`mprocs`](https://github.com/pvolok/mprocs) நான்கு கூறுகளை இயக்குகிறது:

   - [Anvil](https://book.getfoundry.sh/anvil/), இது உள்ளூர் பிளாக்செயினை இயக்குகிறது
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), இது MUD க்கான ஒப்பந்தங்களை தொகுத்து (தேவைப்பட்டால்) பயன்படுத்துகிறது
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), இது இணைய உலாவிகளுக்கு UI மற்றும் கிளையண்ட் குறியீட்டை வழங்க [Vite](https://vitejs.dev/) ஐ இயக்குகிறது.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), இது சேவையக செயல்களைச் செய்கிறது

2. `contracts` தொகுப்பு MUD ஒப்பந்தங்களைப் பயன்படுத்துகிறது, பின்னர் [`PostDeploy.s.sol` ஸ்கிரிப்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) இயக்குகிறது. இந்த ஸ்கிரிப்ட் உள்ளமைவை அமைக்கிறது. கிட்ஹப்பிலிருந்து வரும் குறியீடு [எட்டு கண்ணிவெடிகளைக் கொண்ட 10x5 கண்ணிவெடி களத்தைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) குறிப்பிடுகிறது.

3. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD ஐ அமைப்பதன்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) மூலம் தொடங்குகிறது. மற்றவற்றுடன், இது தரவு ஒத்திசைவை செயல்படுத்துகிறது, இதனால் தொடர்புடைய அட்டவணைகளின் நகல் சேவையகத்தின் நினைவகத்தில் இருக்கும்.

4. [`Configuration` அட்டவணை மாறும்போது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) செயல்படுத்தப்பட வேண்டிய ஒரு செயல்பாட்டை சேவையகம் குழுசேர்கிறது. `PostDeploy.s.sol` செயல்படுத்தப்பட்டு அட்டவணையை மாற்றியமைத்த பிறகு [இந்தச் செயல்பாடு](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) அழைக்கப்படுகிறது.

5. சேவையக துவக்கச் செயல்பாடு உள்ளமைவைக் கொண்டிருக்கும்போது, [சேவையகத்தின் பூஜ்ஜிய-அறிவுப் பகுதியை](#using-zokrates-from-typescript) துவக்க [அது `zkFunctions` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). உள்ளமைவைப் பெறும் வரை இது நடக்காது, ஏனெனில் பூஜ்ஜிய-அறிவு செயல்பாடுகள் கண்ணிவெடி களத்தின் அகலம் மற்றும் உயரத்தை மாறிலிகளாகக் கொண்டிருக்க வேண்டும்.

6. சேவையகத்தின் பூஜ்ஜிய-அறிவுப் பகுதி துவக்கப்பட்ட பிறகு, அடுத்த படியாக [பூஜ்ஜிய-அறிவு சரிபார்ப்பு ஒப்பந்தத்தை பிளாக்செயினில் பயன்படுத்துவது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) மற்றும் MUD இல் சரிபார்ப்பவர் முகவரியை அமைப்பது ஆகும்.

7. இறுதியாக, புதுப்பிப்புகளுக்கு நாங்கள் குழுசேர்கிறோம், எனவே ஒரு வீரர் [புதிய விளையாட்டைத் தொடங்க](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) அல்லது [ஏற்கனவே உள்ள விளையாட்டில் தோண்ட](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) கோரும்போது நாங்கள் பார்ப்போம்.

#### புதிய விளையாட்டு {#new-game-flow}

வீரர் புதிய விளையாட்டைக் கோரும்போது இதுதான் நடக்கும்.

1. இந்த வீரருக்கு எந்த விளையாட்டும் நடைபெறவில்லை என்றால், அல்லது பூஜ்ஜிய gameId உடன் ஒன்று இருந்தால், கிளையண்ட் ஒரு [புதிய விளையாட்டு பொத்தானைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) காண்பிக்கும். பயனர் இந்தப் பொத்தானை அழுத்தும்போது, [React `newGame` செயல்பாட்டை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) என்பது ஒரு `System` அழைப்பு. MUD இல் அனைத்து அழைப்புகளும் `World` ஒப்பந்தத்தின் மூலம் அனுப்பப்படுகின்றன, மேலும் பெரும்பாலான சந்தர்ப்பங்களில் நீங்கள் `<namespace>__<function name>` ஐ அழைக்கிறீர்கள். இந்த நிலையில், அழைப்பு `app__newGame` க்கு உள்ளது, பின்னர் MUD அதை [`GameSystem` இல் உள்ள `newGame` க்கு](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) அனுப்புகிறது.

3. ஆன்செயின் செயல்பாடு வீரருக்கு எந்த விளையாட்டும் நடைபெறவில்லை என்பதைச் சரிபார்க்கிறது, மேலும் ஒன்று இல்லையென்றால் [கோரிக்கையை `PendingGame` அட்டவணையில் சேர்க்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. சேவையகம் `PendingGame` இல் உள்ள மாற்றத்தைக் கண்டறிந்து [குழுசேர்ந்த செயல்பாட்டை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). இந்தச் செயல்பாடு [`newGame` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), இது [`createGame` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. `createGame` செய்யும் முதல் விஷயம் [பொருத்தமான எண்ணிக்கையிலான கண்ணிவெடிகளுடன் ஒரு சீரற்ற வரைபடத்தை உருவாக்குவது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). பின்னர், இது Zokrates க்கு அவசியமான வெற்று எல்லைகளுடன் ஒரு வரைபடத்தை உருவாக்க [`makeMapBorders` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166). இறுதியாக, `createGame` வரைபடத்தின் ஹாஷைப் பெற [`calculateMapHash` ஐ அழைக்கிறது](#calculateMapHash), இது விளையாட்டு ஐடியாகப் பயன்படுத்தப்படுகிறது.

6. `newGame` செயல்பாடு புதிய விளையாட்டை `gamesInProgress` இல் சேர்க்கிறது.

7. சேவையகம் செய்யும் கடைசி விஷயம் ஆன்செயினில் உள்ள [`app__newGameResponse` ஐ அழைப்பது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43). அணுகல் கட்டுப்பாட்டை இயக்க இந்தச் செயல்பாடு வேறுபட்ட `System` ஆன [`ServerSystem` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) உள்ளது. அணுகல் கட்டுப்பாடு [MUD உள்ளமைவு கோப்பான](https://mud.dev/config) [`mud.config.ts` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) வரையறுக்கப்பட்டுள்ளது.

   அணுகல் பட்டியல் ஒரு முகவரியை மட்டுமே `System` ஐ அழைக்க அனுமதிக்கிறது. இது சேவையக செயல்பாடுகளுக்கான அணுகலை ஒரு முகவரிக்கு கட்டுப்படுத்துகிறது, எனவே யாரும் சேவையகமாக ஆள்மாறாட்டம் செய்ய முடியாது.

8. ஆன்செயின் கூறு தொடர்புடைய அட்டவணைகளைப் புதுப்பிக்கிறது:

   - `PlayerGame` இல் விளையாட்டை உருவாக்கவும்.
   - `GamePlayer` இல் தலைகீழ் மேப்பிங்கை அமைக்கவும்.
   - `PendingGame` இலிருந்து கோரிக்கையை அகற்றவும்.

9. சேவையகம் `PendingGame` இல் உள்ள மாற்றத்தை அடையாளம் காட்டுகிறது, ஆனால் [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) தவறானது என்பதால் எதுவும் செய்யாது.

10. கிளையண்டில் [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) வீரரின் முகவரிக்கான `PlayerGame` உள்ளீட்டிற்கு அமைக்கப்பட்டுள்ளது. `PlayerGame` மாறும்போது, `gameRecord` உம் மாறுகிறது.

11. `gameRecord` இல் மதிப்பு இருந்தால், மற்றும் விளையாட்டு வெற்றி பெறவோ அல்லது தோற்கவோ இல்லை என்றால், கிளையண்ட் [வரைபடத்தைக் காண்பிக்கும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### தோண்டுதல் {#dig-flow}

1. வீரர் [வரைபட கலத்தின் பொத்தானைக் கிளிக் செய்கிறார்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), இது [`dig` செயல்பாட்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) அழைக்கிறது. இந்தச் செயல்பாடு [ஆன்செயினில் `dig` ஐ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) அழைக்கிறது.

2. ஆன்செயின் கூறு [பல அடிப்படைச் சரிபார்ப்புகளைச் செய்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), மேலும் வெற்றிகரமாக இருந்தால் தோண்டுதல் கோரிக்கையை [`PendingDig` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) சேர்க்கிறது.

3. சேவையகம் [`PendingDig` இல் உள்ள மாற்றத்தைக் கண்டறிகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [அது செல்லுபடியாகும் என்றால்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), முடிவு மற்றும் அது செல்லுபடியாகும் என்பதற்கான சான்று இரண்டையும் உருவாக்க [பூஜ்ஜிய-அறிவு குறியீட்டை அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (கீழே விளக்கப்பட்டுள்ளது).

4. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ஆன்செயினில் [`digResponse` ஐ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) அழைக்கிறது.

5. `digResponse` இரண்டு விஷயங்களைச் செய்கிறது. முதலில், இது [பூஜ்ஜிய அறிவு சான்றைச்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) சரிபார்க்கிறது. பின்னர், சான்று சரிபார்க்கப்பட்டால், முடிவைச் செயலாக்க [`processDigResult` ஐ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) அழைக்கிறது.

6. `processDigResult` விளையாட்டு [தோற்கடிக்கப்பட்டதா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) அல்லது [வெற்றி பெற்றதா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) என்பதைச் சரிபார்த்து, [ஆன்செயின் வரைபடமான `Map` ஐப் புதுப்பிக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. கிளையண்ட் புதுப்பிப்புகளைத் தானாகவே எடுத்துக்கொண்டு [வீரருக்குக் காண்பிக்கப்படும் வரைபடத்தைப் புதுப்பிக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), மேலும் பொருந்தினால் அது வெற்றியா அல்லது தோல்வியா என்பதை வீரருக்குத் தெரிவிக்கிறது.

## Zokrates ஐப் பயன்படுத்துதல் {#using-zokrates}

மேலே விளக்கப்பட்ட ஓட்டங்களில், பூஜ்ஜிய-அறிவுப் பகுதிகளை ஒரு கருப்புப் பெட்டியாகக் கருதி அவற்றைத் தவிர்த்துவிட்டோம். இப்போது அதைத் திறந்து அந்தக் குறியீடு எவ்வாறு எழுதப்பட்டுள்ளது என்பதைப் பார்ப்போம்.

### வரைபடத்தை ஹாஷிங் செய்தல் {#hashing-map}

நாம் பயன்படுத்தும் Zokrates ஹாஷ் செயல்பாடான [Poseidon](https://www.poseidon-hash.info) ஐச் செயல்படுத்த [இந்த JavaScript குறியீட்டைப்](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) பயன்படுத்தலாம். இருப்பினும், இது வேகமாக இருந்தாலும், இதைச் செய்ய Zokrates ஹாஷ் செயல்பாட்டைப் பயன்படுத்துவதை விட இது மிகவும் சிக்கலானதாக இருக்கும். இது ஒரு டுடோரியல், எனவே குறியீடு எளிமைக்காக உகந்ததாக்கப்பட்டுள்ளது, செயல்திறனுக்காக அல்ல. எனவே, நமக்கு இரண்டு வெவ்வேறு Zokrates நிரல்கள் தேவை, ஒன்று வரைபடத்தின் ஹாஷைக் கணக்கிட (`hash`) மற்றும் மற்றொன்று வரைபடத்தில் ஒரு இடத்தில் தோண்டியதன் முடிவின் பூஜ்ஜிய-அறிவு சான்றை உருவாக்க (`dig`).

### ஹாஷ் செயல்பாடு {#hash-function}

இது வரைபடத்தின் ஹாஷைக் கணக்கிடும் செயல்பாடாகும். இந்தக் குறியீட்டை வரியாகப் பார்ப்போம்.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

இந்த இரண்டு வரிகளும் [Zokrates நிலையான நூலகத்திலிருந்து](https://zokrates.github.io/toolbox/stdlib.html) இரண்டு செயல்பாடுகளை இறக்குமதி செய்கின்றன. [முதல் செயல்பாடு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ஒரு [Poseidon ஹாஷ்](https://www.poseidon-hash.info/) ஆகும். இது [`field` கூறுகளின்](https://zokrates.github.io/language/types.html#field) வரிசையை எடுத்து ஒரு `field` ஐ வழங்குகிறது.

Zokrates இல் உள்ள புலம் கூறு பொதுவாக 256 பிட்களுக்கும் குறைவான நீளம் கொண்டது, ஆனால் அதிகமில்லை. குறியீட்டை எளிதாக்க, வரைபடத்தை 512 பிட்கள் வரை கட்டுப்படுத்துகிறோம், மேலும் நான்கு புலங்களின் வரிசையை ஹாஷ் செய்கிறோம், மேலும் ஒவ்வொரு புலத்திலும் 128 பிட்களை மட்டுமே பயன்படுத்துகிறோம். [ `pack128` செயல்பாடு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) இந்த நோக்கத்திற்காக 128 பிட்களின் வரிசையை `field` ஆக மாற்றுகிறது.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

இந்த வரி ஒரு செயல்பாட்டு வரையறையைத் தொடங்குகிறது. `hashMap` ஆனது `map` எனப்படும் ஒற்றை அளவுருவைப் பெறுகிறது, இது இரு பரிமாண `bool`(ean) வரிசையாகும். [கீழே விளக்கப்பட்டுள்ள](#why-map-border) காரணங்களுக்காக வரைபடத்தின் அளவு `width+2` க்கு `height+2` ஆகும்.

Zokrates நிரல்கள் இந்தப் பயன்பாட்டில் [டெம்ப்ளேட் சரங்களாக](https://www.w3schools.com/js/js_string_templates.asp) சேமிக்கப்பட்டுள்ளதால் நாம் `${width+2}` மற்றும் `${height+2}` ஐப் பயன்படுத்தலாம். `${` மற்றும் `}` க்கு இடையிலான குறியீடு JavaScript ஆல் மதிப்பிடப்படுகிறது, மேலும் இந்த வழியில் நிரலை வெவ்வேறு வரைபட அளவுகளுக்குப் பயன்படுத்தலாம். வரைபட அளவுரு அதைச் சுற்றி எந்த வெடிகுண்டுகளும் இல்லாமல் ஒரு இட அகல எல்லையைக் கொண்டுள்ளது, இதனால்தான் அகலம் மற்றும் உயரத்துடன் இரண்டைச் சேர்க்க வேண்டும்.

திரும்பும் மதிப்பு ஹாஷைக் கொண்ட ஒரு `field` ஆகும்.

```
   bool[512] mut map1d = [false; 512];
```

வரைபடம் இரு பரிமாணமானது. இருப்பினும், `pack128` செயல்பாடு இரு பரிமாண வரிசைகளுடன் வேலை செய்யாது. எனவே முதலில் `map1d` ஐப் பயன்படுத்தி வரைபடத்தை 512-பைட் வரிசையாகத் தட்டையாக்குகிறோம். இயல்பாக Zokrates மாறிகள் மாறிலிகள், ஆனால் நாம் இந்த வரிசைக்கு ஒரு லூப்பில் மதிப்புகளை ஒதுக்க வேண்டும், எனவே அதை [`mut`](https://zokrates.github.io/language/variables.html#mutability) என வரையறுக்கிறோம்.

Zokrates இல் `undefined` இல்லாததால் நாம் வரிசையைத் துவக்க வேண்டும். `[false; 512]` வெளிப்பாடு என்பது [512 `false` மதிப்புகளின் வரிசையைக்](https://zokrates.github.io/language/types.html#declaration-and-initialization) குறிக்கிறது.

```
   u32 mut counter = 0;
```

`map1d` இல் நாம் ஏற்கனவே நிரப்பிய பிட்களுக்கும் நிரப்பாத பிட்களுக்கும் இடையே வேறுபடுத்திக் காட்ட ஒரு கவுண்டரும் தேவை.

```
   for u32 x in 0..${width+2} {
```

Zokrates இல் ஒரு [`for` லூப்பை](https://zokrates.github.io/language/control_flow.html#for-loops) இப்படித்தான் அறிவிக்கிறீர்கள். ஒரு Zokrates `for` லூப் நிலையான வரம்புகளைக் கொண்டிருக்க வேண்டும், ஏனெனில் அது ஒரு லூப்பாகத் தோன்றினாலும், கம்பைலர் உண்மையில் அதை "அன்ரோல்" செய்கிறது. `${width+2}` என்ற வெளிப்பாடு ஒரு தொகுக்கும் நேர மாறிலியாகும், ஏனெனில் கம்பைலரை அழைப்பதற்கு முன்பு TypeScript குறியீட்டால் `width` அமைக்கப்படுகிறது.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

வரைபடத்தில் உள்ள ஒவ்வொரு இடத்திற்கும், அந்த மதிப்பை `map1d` வரிசையில் வைத்து கவுண்டரை அதிகரிக்கவும்.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d` இலிருந்து நான்கு `field` மதிப்புகளின் வரிசையை உருவாக்க `pack128`. Zokrates இல் `array[a..b]` என்பது `a` இல் தொடங்கி `b-1` இல் முடிவடையும் வரிசையின் துண்டைக் குறிக்கிறது.

```
    return poseidon(hashMe);
}
```

இந்த வரிசையை ஹாஷாக மாற்ற `poseidon` ஐப் பயன்படுத்தவும்.

### ஹாஷ் நிரல் {#hash-program}

விளையாட்டு அடையாளங்காட்டிகளை உருவாக்க சேவையகம் நேரடியாக `hashMap` ஐ அழைக்க வேண்டும். இருப்பினும், Zokrates ஒரு நிரலைத் தொடங்க `main` செயல்பாட்டை மட்டுமே அழைக்க முடியும், எனவே ஹாஷ் செயல்பாட்டை அழைக்கும் `main` உடன் ஒரு நிரலை உருவாக்குகிறோம்.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### தோண்டுதல் நிரல் {#dig-program}

இது பயன்பாட்டின் பூஜ்ஜிய-அறிவுப் பகுதியின் இதயமாகும், அங்கு தோண்டுதல் முடிவுகளைச் சரிபார்க்கப் பயன்படுத்தப்படும் சான்றுகளை உருவாக்குகிறோம்.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### வரைபட எல்லை ஏன் {#why-map-border}

பூஜ்ஜிய-அறிவு சான்றுகள் [எண்கணித சுற்றுகளைப்](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) பயன்படுத்துகின்றன, அவை `if` அறிக்கைக்கு எளிதான சமமானதைக் கொண்டிருக்கவில்லை. அதற்குப் பதிலாக, அவை [நிபந்தனை ஆபரேட்டருக்குச்](https://en.wikipedia.org/wiki/Ternary_conditional_operator) சமமானதைப் பயன்படுத்துகின்றன. `a` பூஜ்ஜியமாகவோ அல்லது ஒன்றாகவோ இருக்கலாம் என்றால், நீங்கள் `if a { b } else { c }` ஐ `ab+(1-a)c` எனக் கணக்கிடலாம்.

இதன் காரணமாக, ஒரு Zokrates `if` அறிக்கை எப்போதும் இரண்டு கிளைகளையும் மதிப்பிடுகிறது. எடுத்துக்காட்டாக, உங்களிடம் இந்தக் குறியீடு இருந்தால்:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

அது பிழையை ஏற்படுத்தும், ஏனெனில் அந்த மதிப்பு பின்னர் பூஜ்ஜியத்தால் பெருக்கப்பட்டாலும், அது `arr[10]` ஐக் கணக்கிட வேண்டும்.

வரைபடத்தைச் சுற்றி ஒரு இட அகல எல்லை தேவைப்படுவதற்கு இதுவே காரணம். ஒரு இடத்தைச் சுற்றியுள்ள மொத்த கண்ணிவெடிகளின் எண்ணிக்கையை நாம் கணக்கிட வேண்டும், அதாவது நாம் தோண்டும் இடத்திற்கு மேலே மற்றும் கீழே ஒரு வரிசை, இடது மற்றும் வலதுபுறம் உள்ள இடத்தைப் பார்க்க வேண்டும். அதாவது Zokrates க்கு வழங்கப்படும் வரைபட வரிசையில் அந்த இடங்கள் இருக்க வேண்டும்.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

இயல்பாக Zokrates சான்றுகள் அவற்றின் உள்ளீடுகளை உள்ளடக்கியிருக்கும். அது எந்த இடம் என்று உங்களுக்குத் தெரியாவிட்டால், ஒரு இடத்தை சுற்றி ஐந்து கண்ணிவெடிகள் உள்ளன என்பதை அறிவதில் எந்தப் பயனும் இல்லை (மேலும் அதை உங்கள் கோரிக்கையுடன் பொருத்த முடியாது, ஏனெனில் நிரூபிப்பவர் வெவ்வேறு மதிப்புகளைப் பயன்படுத்தலாம் மற்றும் அதைப் பற்றி உங்களிடம் சொல்லாமல் இருக்கலாம்). இருப்பினும், வரைபடத்தை Zokrates க்கு வழங்கும்போது அதை ரகசியமாக வைத்திருக்க வேண்டும். சான்றால் வெளிப்படுத்தப்படாத ஒரு `private` அளவுருவைப் பயன்படுத்துவதே இதற்கான தீர்வாகும்.

இது துஷ்பிரயோகத்திற்கான மற்றொரு வழியைத் திறக்கிறது. நிரூபிப்பவர் சரியான ஆயத்தொலைவுகளைப் பயன்படுத்தலாம், ஆனால் அந்த இடத்தைச் சுற்றி எந்த எண்ணிக்கையிலான கண்ணிவெடிகளுடனும், மற்றும் அந்த இடத்திலேயே ஒரு வரைபடத்தை உருவாக்கலாம். இந்த துஷ்பிரயோகத்தைத் தடுக்க, பூஜ்ஜிய அறிவு சான்றில் வரைபடத்தின் ஹாஷை உள்ளடக்குகிறோம், இது விளையாட்டு அடையாளங்காட்டியாகும்.

```
   return (hashMap(map),
```

இங்கு திரும்பும் மதிப்பு வரைபட ஹாஷ் வரிசை மற்றும் தோண்டுதல் முடிவை உள்ளடக்கிய ஒரு டூப்பிள் ஆகும்.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

அந்த இடத்திலேயே வெடிகுண்டு இருந்தால் 255 ஐ ஒரு சிறப்பு மதிப்பாகப் பயன்படுத்துகிறோம்.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

வீரர் கண்ணிவெடியைத் தாக்கவில்லை என்றால், அந்த இடத்தைச் சுற்றியுள்ள பகுதிக்கான கண்ணிவெடி எண்ணிக்கையைச் சேர்த்து அதை வழங்கவும்.

### TypeScript இலிருந்து Zokrates ஐப் பயன்படுத்துதல் {#using-zokrates-from-typescript}

Zokrates ஒரு கட்டளை வரி இடைமுகத்தைக் கொண்டுள்ளது, ஆனால் இந்த நிரலில் அதை [TypeScript குறியீட்டில்](https://zokrates.github.io/toolbox/zokrates_js.html) பயன்படுத்துகிறோம்.

Zokrates வரையறைகளைக் கொண்ட நூலகம் [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) என்று அழைக்கப்படுகிறது.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript பிணைப்புகளை](https://zokrates.github.io/toolbox/zokrates_js.html) இறக்குமதி செய்யவும். நமக்கு [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) செயல்பாடு மட்டுமே தேவை, ஏனெனில் இது அனைத்து Zokrates வரையறைகளுக்கும் தீர்வு காணும் ஒரு வாக்குறுதியை வழங்குகிறது.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates ஐப் போலவே, நாமும் ஒரு செயல்பாட்டை மட்டுமே ஏற்றுமதி செய்கிறோம், இதுவும் [ஒத்திசைவற்றது](https://www.w3schools.com/js/js_async.asp). அது இறுதியில் திரும்பும்போது, கீழே நாம் பார்ப்பது போல் பல செயல்பாடுகளை வழங்குகிறது.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ஐத் துவக்கவும், நூலகத்திலிருந்து நமக்குத் தேவையான அனைத்தையும் பெறவும்.

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

அடுத்து நாம் மேலே பார்த்த ஹாஷ் செயல்பாடு மற்றும் இரண்டு Zokrates நிரல்கள் உள்ளன.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

இங்கே நாம் அந்த நிரல்களைத் தொகுக்கிறோம்.

```typescript
// பூஜ்ஜிய அறிவு சரிபார்ப்பிற்கான விசைகளை உருவாக்கவும்.
// ஒரு தயாரிப்பு அமைப்பில் நீங்கள் ஒரு அமைவு சடங்கைப் பயன்படுத்த விரும்புவீர்கள்.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ஒரு தயாரிப்பு அமைப்பில் நாம் மிகவும் சிக்கலான [அமைப்பு விழாவைப்](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம், ஆனால் இது ஒரு விளக்கக்காட்சிக்கு போதுமானது. பயனர்கள் நிரூபிப்பவர் விசையை அறிய முடியும் என்பது ஒரு பிரச்சனையல்ல - அவை உண்மையாக இல்லாவிட்டால் விஷயங்களை நிரூபிக்க அவர்களால் அதைப் பயன்படுத்த முடியாது. நாம் என்ட்ரோபியைக் குறிப்பிடுவதால் (இரண்டாவது அளவுரு, `""`), முடிவுகள் எப்போதும் ஒரே மாதிரியாகவே இருக்கும்.

**குறிப்பு:** Zokrates நிரல்களின் தொகுப்பு மற்றும் விசை உருவாக்கம் ஆகியவை மெதுவான செயல்முறைகளாகும். ஒவ்வொரு முறையும் அவற்றை மீண்டும் செய்ய வேண்டிய அவசியமில்லை, வரைபட அளவு மாறும்போது மட்டுமே. ஒரு தயாரிப்பு அமைப்பில் நீங்கள் அவற்றை ஒரு முறை செய்வீர்கள், பின்னர் வெளியீட்டைச் சேமிப்பீர்கள். நான் அதை இங்கே செய்யாததற்கு ஒரே காரணம் எளிமைக்காகவே.

#### calculateMapHash {#calculateMapHash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) செயல்பாடு உண்மையில் Zokrates நிரலை இயக்குகிறது. இது இரண்டு புலங்களைக் கொண்ட ஒரு கட்டமைப்பை வழங்குகிறது: `output`, இது JSON சரமாக நிரலின் வெளியீடு, மற்றும் `witness`, இது முடிவின் பூஜ்ஜிய அறிவு சான்றை உருவாக்கத் தேவையான தகவல். இங்கே நமக்கு வெளியீடு மட்டுமே தேவை.

வெளியீடு `"31337"` வடிவத்தின் சரமாகும், இது மேற்கோள் குறிகளில் இணைக்கப்பட்ட தசம எண். ஆனால் `viem` க்கு நமக்குத் தேவையான வெளியீடு `0x60A7` வடிவத்தின் ஹெக்ஸாடெசிமல் எண். எனவே மேற்கோள் குறிகளை அகற்ற `.slice(1,-1)` ஐப் பயன்படுத்துகிறோம், பின்னர் மீதமுள்ள சரத்தை, அதாவது தசம எண்ணை, [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) ஆக இயக்க `BigInt` ஐப் பயன்படுத்துகிறோம். `.toString(16)` இந்த `BigInt` ஐ ஹெக்ஸாடெசிமல் சரமாக மாற்றுகிறது, மேலும் `"0x"+` ஹெக்ஸாடெசிமல் எண்களுக்கான குறிப்பானைச் சேர்க்கிறது.

```typescript
// தோண்டி, முடிவின் பூஜ்ஜிய அறிவு நிரூபணத்தைத் திருப்பி அனுப்பவும்.
// (சேவையகத் தரப்புக் குறியீடு)
```

பூஜ்ஜிய அறிவு சான்று பொது உள்ளீடுகள் (`x` மற்றும் `y`) மற்றும் முடிவுகளை (வரைபடத்தின் ஹாஷ் மற்றும் வெடிகுண்டுகளின் எண்ணிக்கை) உள்ளடக்கியது.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates இல் ஒரு குறியீட்டு வரம்பிற்கு வெளியே உள்ளதா எனச் சரிபார்ப்பது ஒரு பிரச்சனை, எனவே அதை இங்கே செய்கிறோம்.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

தோண்டுதல் நிரலை இயக்கவும்.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ஐப் பயன்படுத்தி சான்றை வழங்கவும்.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ஒரு Solidity சரிபார்ப்பவர், பிளாக்செயினில் நாம் பயன்படுத்தக்கூடிய மற்றும் `digCompiled.program` ஆல் உருவாக்கப்பட்ட சான்றுகளைச் சரிபார்க்கப் பயன்படுத்தக்கூடிய ஒரு ஸ்மார்ட் ஒப்பந்தம்.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

இறுதியாக, பிற குறியீட்டிற்குத் தேவைப்படும் அனைத்தையும் வழங்கவும்.

## பாதுகாப்பு சோதனைகள் {#security-tests}

பாதுகாப்பு சோதனைகள் முக்கியமானவை, ஏனெனில் ஒரு செயல்பாட்டுப் பிழை இறுதியில் தன்னை வெளிப்படுத்தும். ஆனால் பயன்பாடு பாதுகாப்பற்றதாக இருந்தால், யாராவது ஏமாற்றி மற்றவர்களுக்குச் சொந்தமான வளங்களுடன் தப்பிச் செல்வதன் மூலம் அது வெளிப்படுவதற்கு முன்பு நீண்ட காலத்திற்கு மறைந்திருக்க வாய்ப்புள்ளது.

### அனுமதிகள் {#permissions}

இந்த விளையாட்டில் ஒரு சலுகை பெற்ற நிறுவனம் உள்ளது, அது சேவையகம். [`ServerSystem` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) உள்ள செயல்பாடுகளை அழைக்க அனுமதிக்கப்பட்ட ஒரே பயனர் இதுதான். அனுமதியளிக்கப்பட்ட செயல்பாடுகளுக்கான அழைப்புகள் சேவையகக் கணக்காக மட்டுமே அனுமதிக்கப்படுகின்றன என்பதைச் சரிபார்க்க நாம் [`cast`](https://book.getfoundry.sh/cast/) ஐப் பயன்படுத்தலாம்.

[சேவையகத்தின் தனிப்பட்ட விசை `setupNetwork.ts` இல் உள்ளது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (பிளாக்செயின்) இயங்கும் கணினியில், இந்த சூழல் மாறிகளை அமைக்கவும்.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. சரிபார்ப்பவர் முகவரியை அங்கீகரிக்கப்படாத முகவரியாக அமைக்க முயற்சிக்க `cast` ஐப் பயன்படுத்தவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` தோல்வியைப் புகாரளிப்பது மட்டுமல்லாமல், உலாவியில் விளையாட்டில் **MUD Dev Tools** ஐத் திறந்து, **Tables** என்பதைக் கிளிக் செய்து, **app\_\_VerifierAddress** ஐத் தேர்ந்தெடுக்கலாம். முகவரி பூஜ்ஜியமாக இல்லை என்பதைப் பார்க்கவும்.

3. சரிபார்ப்பவர் முகவரியை சேவையகத்தின் முகவரியாக அமைக்கவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** இல் உள்ள முகவரி இப்போது பூஜ்ஜியமாக இருக்க வேண்டும்.

அதே `System` இல் உள்ள அனைத்து MUD செயல்பாடுகளும் ஒரே அணுகல் கட்டுப்பாட்டின் வழியாகச் செல்கின்றன, எனவே இந்தச் சோதனை போதுமானது என்று நான் கருதுகிறேன். நீங்கள் அவ்வாறு கருதவில்லை என்றால், [`ServerSystem` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) உள்ள பிற செயல்பாடுகளைச் சரிபார்க்கலாம்.

### பூஜ்ஜிய-அறிவு துஷ்பிரயோகங்கள் {#zero-knowledge-abuses}

Zokrates ஐச் சரிபார்க்கும் கணிதம் இந்த டுடோரியலின் (மற்றும் எனது திறன்களின்) எல்லைக்கு அப்பாற்பட்டது. இருப்பினும், பூஜ்ஜிய-அறிவு குறியீடு சரியாகச் செய்யப்படாவிட்டால் அது தோல்வியடைகிறதா என்பதைச் சரிபார்க்க நாம் பல்வேறு சோதனைகளை இயக்கலாம். இந்தச் சோதனைகள் அனைத்தும் நாம் [`zero-knowledge.ts` ஐ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) மாற்றி முழுப் பயன்பாட்டையும் மறுதொடக்கம் செய்ய வேண்டும். சேவையக செயல்முறையை மறுதொடக்கம் செய்வது மட்டும் போதாது, ஏனெனில் இது பயன்பாட்டை சாத்தியமற்ற நிலையில் வைக்கிறது (வீரருக்கு ஒரு விளையாட்டு நடைபெறுகிறது, ஆனால் விளையாட்டு இனி சேவையகத்திற்குக் கிடைக்காது).

#### தவறான பதில் {#wrong-answer}

பூஜ்ஜிய-அறிவு சான்றில் தவறான பதிலை வழங்குவதே எளிமையான சாத்தியமாகும். அதைச் செய்ய, நாம் `zkDig` க்குள் சென்று [வரி 91 ஐ மாற்றியமைக்கிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

சரியான பதில் எதுவாக இருந்தாலும், ஒரு வெடிகுண்டு இருப்பதாக நாம் எப்போதும் கூறுவோம் என்பதே இதன் பொருள். இந்தப் பதிப்பில் விளையாட முயற்சிக்கவும், `pnpm dev` திரையின் **server** தாவலில் இந்தப் பிழையைக் காண்பீர்கள்:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

எனவே இந்த வகையான ஏமாற்று வேலை தோல்வியடைகிறது.

#### தவறான சான்று {#wrong-proof}

சரியான தகவலை வழங்கி, ஆனால் தவறான சான்று தரவை மட்டும் கொண்டிருந்தால் என்ன நடக்கும்? இப்போது, வரி 91 ஐ இதனுடன் மாற்றவும்:

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

இது இன்னும் தோல்வியடைகிறது, ஆனால் இப்போது அது காரணமின்றி தோல்வியடைகிறது, ஏனெனில் இது சரிபார்ப்பவர் அழைப்பின் போது நிகழ்கிறது.

### பூஜ்ஜிய நம்பிக்கை குறியீட்டை ஒரு பயனர் எவ்வாறு சரிபார்க்க முடியும்? {#user-verify-zero-trust}

ஸ்மார்ட் ஒப்பந்தங்களைச் சரிபார்ப்பது ஒப்பீட்டளவில் எளிதானது. பொதுவாக, உருவாக்குநர் மூலக் குறியீட்டை ஒரு பிளாக் எக்ஸ்ப்ளோரரில் வெளியிடுகிறார், மேலும் பிளாக் எக்ஸ்ப்ளோரர் மூலக் குறியீடு [ஒப்பந்தப் பயன்பாட்டுப் பரிவர்த்தனையில்](/developers/docs/smart-contracts/deploying/) உள்ள குறியீட்டிற்குத் தொகுக்கப்படுகிறதா என்பதைச் சரிபார்க்கிறது. MUD `System` களின் விஷயத்தில் இது [சற்று சிக்கலானது](https://mud.dev/cli/verify), ஆனால் அதிகமில்லை.

பூஜ்ஜிய-அறிவுடன் இது கடினமானது. சரிபார்ப்பவர் சில மாறிலிகளை உள்ளடக்கி அவற்றின் மீது சில கணக்கீடுகளை இயக்குகிறார். இது என்ன நிரூபிக்கப்படுகிறது என்பதை உங்களுக்குச் சொல்லாது.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

பிளாக் எக்ஸ்ப்ளோரர்கள் தங்கள் பயனர் இடைமுகங்களில் Zokrates சரிபார்ப்பைச் சேர்க்கும் வரையிலாவது, பயன்பாட்டு உருவாக்குநர்கள் Zokrates நிரல்களைக் கிடைக்கச் செய்வதும், குறைந்தபட்சம் சில பயனர்கள் பொருத்தமான சரிபார்ப்பு விசையுடன் அவற்றை தாங்களே தொகுப்பதும் இதற்கான தீர்வாகும்.

அவ்வாறு செய்ய:

1. [Zokrates ஐ நிறுவவும்](https://zokrates.github.io/gettingstarted.html).
2. Zokrates நிரலுடன் `dig.zok` என்ற கோப்பை உருவாக்கவும். கீழே உள்ள குறியீடு நீங்கள் அசல் வரைபட அளவான 10x5 ஐ வைத்திருப்பதாகக் கருதுகிறது.

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


    // (x,y) இடத்தில் உள்ள கண்ணிவெடிகளின் எண்ணிக்கை
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

3. Zokrates குறியீட்டைத் தொகுத்து சரிபார்ப்பு விசையை உருவாக்கவும். அசல் சேவையகத்தில் பயன்படுத்தப்பட்ட அதே என்ட்ரோபியுடன் சரிபார்ப்பு விசை உருவாக்கப்பட வேண்டும், [இந்த நிலையில் ஒரு வெற்று சரம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Solidity சரிபார்ப்பவரை நீங்களே உருவாக்கி, அது பிளாக்செயினில் உள்ளதைப் போலவே செயல்பாட்டு ரீதியாக ஒத்திருக்கிறதா என்பதைச் சரிபார்க்கவும் (சேவையகம் ஒரு கருத்தைச் சேர்க்கிறது, ஆனால் அது முக்கியமல்ல).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## வடிவமைப்பு முடிவுகள் {#design}

போதுமான அளவு சிக்கலான எந்தவொரு பயன்பாட்டிலும் சமரசங்கள் தேவைப்படும் போட்டி வடிவமைப்பு இலக்குகள் உள்ளன. சில சமரசங்களையும், தற்போதைய தீர்வு ஏன் பிற விருப்பங்களை விட விரும்பத்தக்கது என்பதையும் பார்ப்போம்.

### பூஜ்ஜிய-அறிவு ஏன் {#why-zero-knowledge}

மைன்ஸ்வீப்பருக்கு உங்களுக்கு உண்மையில் பூஜ்ஜிய-அறிவு தேவையில்லை. சேவையகம் எப்போதும் வரைபடத்தை வைத்திருக்க முடியும், பின்னர் விளையாட்டு முடிந்ததும் அதை முழுமையாக வெளிப்படுத்தலாம். பின்னர், விளையாட்டின் முடிவில், ஸ்மார்ட் ஒப்பந்தம் வரைபட ஹாஷைக் கணக்கிடலாம், அது பொருந்துகிறதா என்பதைச் சரிபார்க்கலாம், மேலும் அது பொருந்தவில்லை என்றால் சேவையகத்திற்கு அபராதம் விதிக்கலாம் அல்லது விளையாட்டை முற்றிலுமாகப் புறக்கணிக்கலாம்.

நன்கு வரையறுக்கப்பட்ட இறுதி நிலையைக் கொண்ட குறுகிய விளையாட்டுகளுக்கு மட்டுமே இது வேலை செய்யும் என்பதால் நான் இந்த எளிமையான தீர்வைப் பயன்படுத்தவில்லை. ஒரு விளையாட்டு முடிவற்றதாக இருக்கும்போது ([தன்னாட்சி உலகங்கள்](https://0xparc.org/blog/autonomous-worlds) போன்ற நிலையில்), நிலையை வெளிப்படுத்தாமல் _நிரூபிக்கும்_ ஒரு தீர்வு உங்களுக்குத் தேவை.

ஒரு டுடோரியலாக இந்தக் கட்டுரைக்கு எளிதில் புரிந்துகொள்ளக்கூடிய ஒரு குறுகிய விளையாட்டு தேவைப்பட்டது, ஆனால் இந்த நுட்பம் நீண்ட விளையாட்டுகளுக்கு மிகவும் பயனுள்ளதாக இருக்கும்.

### Zokrates ஏன்? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) மட்டுமே கிடைக்கக்கூடிய பூஜ்ஜிய-அறிவு நூலகம் அல்ல, ஆனால் இது ஒரு சாதாரண, [கட்டாய](https://en.wikipedia.org/wiki/Imperative_programming) நிரலாக்க மொழியைப் போன்றது மற்றும் பூலியன் மாறிகளை ஆதரிக்கிறது.

வெவ்வேறு தேவைகளைக் கொண்ட உங்கள் பயன்பாட்டிற்கு, நீங்கள் [Circum](https://docs.circom.io/getting-started/installation/) அல்லது [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ஐப் பயன்படுத்த விரும்பலாம்.

### Zokrates ஐ எப்போது தொகுக்க வேண்டும் {#when-compile-zokrates}

இந்த நிரலில் [சேவையகம் தொடங்கும் ஒவ்வொரு முறையும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates நிரல்களைத் தொகுக்கிறோம். இது தெளிவாக வளங்களை வீணாக்குவதாகும், ஆனால் இது எளிமைக்காக உகந்ததாக்கப்பட்ட ஒரு டுடோரியல் ஆகும்.

நான் ஒரு தயாரிப்பு-நிலை பயன்பாட்டை எழுதுகிறேன் என்றால், இந்த கண்ணிவெடி கள அளவில் தொகுக்கப்பட்ட Zokrates நிரல்களுடன் ஒரு கோப்பு என்னிடம் உள்ளதா எனச் சரிபார்ப்பேன், அப்படியானால் அதைப் பயன்படுத்துவேன். ஆன்செயினில் சரிபார்ப்பவர் ஒப்பந்தத்தைப் பயன்படுத்துவதற்கும் இதுவே பொருந்தும்.

### சரிபார்ப்பவர் மற்றும் நிரூபிப்பவர் விசைகளை உருவாக்குதல் {#key-creation}

[விசை உருவாக்கம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) என்பது கொடுக்கப்பட்ட கண்ணிவெடி கள அளவிற்கு ஒரு முறைக்கு மேல் செய்ய வேண்டிய அவசியமில்லாத மற்றொரு தூய கணக்கீடாகும். மீண்டும், இது எளிமைக்காக ஒரு முறை மட்டுமே செய்யப்படுகிறது.

கூடுதலாக, நாம் [ஒரு அமைப்பு விழாவைப்](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம். ஒரு அமைப்பு விழாவின் நன்மை என்னவென்றால், பூஜ்ஜிய-அறிவு சான்றில் ஏமாற்ற உங்களுக்கு ஒவ்வொரு பங்கேற்பாளரிடமிருந்தும் என்ட்ரோபி அல்லது சில இடைநிலை முடிவுகள் தேவை. குறைந்தபட்சம் ஒரு விழா பங்கேற்பாளர் நேர்மையாக இருந்து அந்தத் தகவலை நீக்கினால், பூஜ்ஜிய-அறிவு சான்றுகள் சில தாக்குதல்களிலிருந்து பாதுகாப்பாக இருக்கும். இருப்பினும், எல்லா இடங்களிலிருந்தும் தகவல் நீக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்க _எந்த வழிமுறையும் இல்லை_. பூஜ்ஜிய-அறிவு சான்றுகள் மிகவும் முக்கியமானவை என்றால், நீங்கள் அமைப்பு விழாவில் பங்கேற்க விரும்புவீர்கள்.

இங்கே நாம் [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) ஐ நம்பியுள்ளோம், இதில் டஜன் கணக்கான பங்கேற்பாளர்கள் இருந்தனர். இது அநேகமாக போதுமான பாதுகாப்பானது மற்றும் மிகவும் எளிமையானது. விசை உருவாக்கத்தின் போது நாம் என்ட்ரோபியையும் சேர்ப்பதில்லை, இது பயனர்கள் [பூஜ்ஜிய-அறிவு உள்ளமைவைச் சரிபார்ப்பதை](#user-verify-zero-trust) எளிதாக்குகிறது.

### எங்கே சரிபார்க்க வேண்டும் {#where-verification}

பூஜ்ஜிய-அறிவு சான்றுகளை நாம் ஆன்செயினில் (இதற்கு எரிவாயு செலவாகும்) அல்லது கிளையண்டில் ([`verify` ஐப் பயன்படுத்தி](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)) சரிபார்க்கலாம். நான் முதலாவதைத் தேர்ந்தெடுத்தேன், ஏனெனில் இது [சரிபார்ப்பவரை ஒருமுறை சரிபார்க்க](#user-verify-zero-trust) உங்களை அனுமதிக்கிறது, பின்னர் அதற்கான ஒப்பந்த முகவரி ஒரே மாதிரியாக இருக்கும் வரை அது மாறாது என்று நம்பலாம். கிளையண்டில் சரிபார்ப்பு செய்யப்பட்டால், நீங்கள் கிளையண்டைப் பதிவிறக்கும் ஒவ்வொரு முறையும் நீங்கள் பெறும் குறியீட்டைச் சரிபார்க்க வேண்டும்.

மேலும், இந்த விளையாட்டு ஒற்றை வீரர் என்றாலும், பல பிளாக்செயின் விளையாட்டுகள் பல வீரர்களைக் கொண்டவை. ஆன்செயின் சரிபார்ப்பு என்பது நீங்கள் பூஜ்ஜிய-அறிவு சான்றை ஒருமுறை மட்டுமே சரிபார்க்கிறீர்கள் என்பதாகும். கிளையண்டில் இதைச் செய்வதற்கு ஒவ்வொரு கிளையண்டும் சுயாதீனமாகச் சரிபார்க்க வேண்டும்.

### TypeScript அல்லது Zokrates இல் வரைபடத்தைத் தட்டையாக்கவா? {#where-flatten}

பொதுவாக, செயலாக்கத்தை TypeScript அல்லது Zokrates இல் செய்ய முடியும் என்றால், அதை TypeScript இல் செய்வது நல்லது, இது மிகவும் வேகமானது மற்றும் பூஜ்ஜிய-அறிவு சான்றுகள் தேவையில்லை. எடுத்துக்காட்டாக, நாம் Zokrates க்கு ஹாஷை வழங்கி அது சரியானது என்பதைச் சரிபார்க்கச் செய்யாததற்கு இதுவே காரணம். ஹாஷிங் Zokrates க்குள் செய்யப்பட வேண்டும், ஆனால் திரும்பிய ஹாஷுக்கும் ஆன்செயினில் உள்ள ஹாஷுக்கும் இடையிலான பொருத்தம் அதற்கு வெளியே நடக்கலாம்.

இருப்பினும், நாம் இன்னும் [Zokrates இல் வரைபடத்தைத் தட்டையாக்குகிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), அதேசமயம் நாம் அதை TypeScript இல் செய்திருக்கலாம். காரணம், மற்ற விருப்பங்கள், என் கருத்துப்படி, மோசமானவை.

- Zokrates குறியீட்டிற்கு பூலியனின் ஒரு பரிமாண வரிசையை வழங்கவும், மேலும் இரு பரிமாண வரைபடத்தைப் பெற `x*(height+2)+y` போன்ற வெளிப்பாட்டைப் பயன்படுத்தவும். இது [குறியீட்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) சற்றே சிக்கலாக்கும், எனவே ஒரு டுடோரியலுக்கு செயல்திறன் ஆதாயம் மதிப்புக்குரியது அல்ல என்று நான் முடிவு செய்தேன்.

- Zokrates க்கு ஒரு பரிமாண வரிசை மற்றும் இரு பரிமாண வரிசை இரண்டையும் அனுப்பவும். இருப்பினும், இந்தத் தீர்வு நமக்கு எதையும் பெற்றுத் தராது. Zokrates குறியீடு அதற்கு வழங்கப்பட்ட ஒரு பரிமாண வரிசை உண்மையில் இரு பரிமாண வரிசையின் சரியான பிரதிநிதித்துவமா என்பதைச் சரிபார்க்க வேண்டும். எனவே எந்த செயல்திறன் ஆதாயமும் இருக்காது.

- Zokrates இல் இரு பரிமாண வரிசையைத் தட்டையாக்கவும். இது எளிமையான விருப்பம், எனவே நான் அதைத் தேர்ந்தெடுத்தேன்.

### வரைபடங்களை எங்கே சேமிப்பது {#where-store-maps}

இந்தப் பயன்பாட்டில் [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) என்பது நினைவகத்தில் உள்ள ஒரு மாறி மட்டுமே. இதன் பொருள் உங்கள் சேவையகம் இறந்து மறுதொடக்கம் செய்யப்பட வேண்டும் என்றால், அது சேமித்து வைத்திருந்த அனைத்து தகவல்களும் இழக்கப்படும். வீரர்களால் தங்கள் விளையாட்டைத் தொடர முடியாது என்பது மட்டுமல்லாமல், அவர்களால் புதிய விளையாட்டைக் கூடத் தொடங்க முடியாது, ஏனெனில் ஆன்செயின் கூறு அவர்களுக்கு இன்னும் ஒரு விளையாட்டு நடைபெற்று வருவதாக நினைக்கிறது.

இது ஒரு தயாரிப்பு அமைப்பிற்கான மோசமான வடிவமைப்பாகும், இதில் நீங்கள் இந்தத் தகவலை தரவுத்தளத்தில் சேமிப்பீர்கள். நான் இங்கே ஒரு மாறியைப் பயன்படுத்தியதற்கு ஒரே காரணம் இது ஒரு டுடோரியல் மற்றும் எளிமையே முக்கியக் கருத்தாகும்.

## முடிவுரை: எந்த நிபந்தனைகளின் கீழ் இது பொருத்தமான நுட்பமாகும்? {#conclusion}

எனவே, ஆன்செயினுக்குச் சொந்தமில்லாத ரகசிய நிலையைச் சேமிக்கும் சேவையகத்துடன் ஒரு விளையாட்டை எவ்வாறு எழுதுவது என்பது இப்போது உங்களுக்குத் தெரியும். ஆனால் எந்த சந்தர்ப்பங்களில் நீங்கள் அதைச் செய்ய வேண்டும்? இரண்டு முக்கியக் கருத்துகள் உள்ளன.

- _நீண்ட நேரம் இயங்கும் விளையாட்டு_: [மேலே குறிப்பிட்டுள்ளபடி](#why-zero-knowledge), ஒரு குறுகிய விளையாட்டில் விளையாட்டு முடிந்ததும் நீங்கள் நிலையை வெளியிடலாம் மற்றும் அனைத்தையும் சரிபார்க்கலாம். ஆனால் விளையாட்டு நீண்ட அல்லது காலவரையற்ற நேரத்தை எடுக்கும்போது அது ஒரு விருப்பமல்ல, மேலும் நிலை ரகசியமாக இருக்க வேண்டும்.

- _சில மையப்படுத்தல் ஏற்றுக்கொள்ளத்தக்கது_: பூஜ்ஜிய-அறிவு சான்றுகள் ஒரு நிறுவனம் முடிவுகளைப் போலியாக உருவாக்கவில்லை என்ற ஒருமைப்பாட்டைச் சரிபார்க்க முடியும். அவர்களால் செய்ய முடியாதது என்னவென்றால், நிறுவனம் இன்னும் கிடைக்கும் மற்றும் செய்திகளுக்குப் பதிலளிக்கும் என்பதை உறுதி செய்வதாகும். கிடைக்கும் தன்மையும் பரவலாக்கப்பட வேண்டிய சூழ்நிலைகளில், பூஜ்ஜிய-அறிவு சான்றுகள் போதுமான தீர்வல்ல, மேலும் உங்களுக்கு [பல-தரப்பு கணக்கீடு](https://en.wikipedia.org/wiki/Secure_multi-party_computation) தேவை.

[எனது மேலும் பல பணிகளுக்கு இங்கே பார்க்கவும்](https://cryptodocguy.pro/).

### நன்றிகள் {#acknowledgements}

- அல்வாரோ அலோன்சோ இந்தக் கட்டுரையின் வரைவைப் படித்து, Zokrates பற்றிய எனது சில தவறான புரிதல்களைத் தெளிவுபடுத்தினார்.

மீதமுள்ள பிழைகள் ஏதேனும் இருந்தால் அது எனது பொறுப்பு.