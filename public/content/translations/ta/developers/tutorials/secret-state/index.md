---
title: இரகசிய நிலைக்காக பூஜ்ஜிய-அறிவைப் பயன்படுத்துதல்
description: ஆன்செயின் விளையாட்டுகளால் எந்தவொரு மறைக்கப்பட்ட தகவலையும் வைத்திருக்க முடியாததால் அவை வரையறுக்கப்பட்டவை. இந்தப் பயிற்சியைப் படித்த பிறகு, ஒரு வாசகர் பூஜ்ஜிய-அறிவுச் சான்றுகளையும் சேவையகக் கூறுகளையும் ஒன்றிணைத்து, இரகசிய நிலை, ஆஃப்செயின், கூறுடன் சரிபார்க்கக்கூடிய விளையாட்டுகளை உருவாக்க முடியும். இதைச் செய்வதற்கான நுட்பம் ஒரு மைன்ஸ்வீப்பர் விளையாட்டை உருவாக்குவதன் மூலம் விளக்கப்படும்.
author: Ori Pomerantz
tags:
  [
    "சேவையகம்",
    "ஆஃப்செயின்",
    "மையப்படுத்தப்பட்ட",
    "பூஜ்ஜிய-அறிவு",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: ta
published: 2025-03-15
---

_பிளாக்செயினில் இரகசியங்கள் எதுவும் இல்லை_. பிளாக்செயினில் வெளியிடப்படும் அனைத்தும் அனைவரும் படிப்பதற்குத் திறந்திருக்கும். இது அவசியமானது, ஏனென்றால் பிளாக்செயின் என்பது யார் வேண்டுமானாலும் அதைச் சரிபார்க்க முடியும் என்ற அடிப்படையில் அமைந்துள்ளது. இருப்பினும், விளையாட்டுகள் பெரும்பாலும் இரகசிய நிலையைச் சார்ந்துள்ளன. எடுத்துக்காட்டாக, நீங்கள் ஒரு பிளாக்செயின் எக்ஸ்புளோரருக்குச் சென்று வரைபடத்தைப் பார்க்க முடிந்தால், [மைன்ஸ்வீப்பர்](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) விளையாட்டில் எந்த அர்த்தமும் இல்லை.

இரகசிய நிலையை வைத்திருக்க ஒரு [சேவையகக் கூறினை](/developers/tutorials/server-components/) பயன்படுத்துவதே எளிமையான தீர்வாகும். இருப்பினும், விளையாட்டு உருவாக்குநர் ஏமாற்றுவதைத் தடுக்கவே நாம் பிளாக்செயினைப் பயன்படுத்துகிறோம். சேவையகக் கூறின் நேர்மையை நாம் உறுதிப்படுத்த வேண்டும். சேவையகம் நிலையின் ஹாஷை வழங்கலாம், மேலும் ஒரு நகர்வின் முடிவைக் கணக்கிடப் பயன்படுத்தப்பட்ட நிலை சரியானது என்பதை நிரூபிக்க [பூஜ்ஜிய-அறிவுச் சான்றுகளை](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) பயன்படுத்தலாம்.

இந்தக் கட்டுரையைப் படித்த பிறகு, இந்த வகையான இரகசிய நிலையை வைத்திருக்கும் சேவையகத்தை உருவாக்குவது, நிலையைக் காண்பிப்பதற்கான ஒரு கிளையன்ட், மற்றும் இரண்டுக்கும் இடையேயான தகவல்தொடர்புக்கான ஆன்செயின் கூறுகளை உருவாக்குவது எப்படி என்பதை நீங்கள் அறிந்துகொள்வீர்கள். நாம் பயன்படுத்தும் முக்கிய கருவிகள்:

| கருவி                                         | நோக்கம்                                                |            பதிப்பில் சரிபார்க்கப்பட்டது |
| --------------------------------------------- | ------------------------------------------------------ | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | பூஜ்ஜிய-அறிவுச் சான்றுகள் மற்றும் அவற்றின் சரிபார்ப்பு |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | சேவையகம் மற்றும் கிளையன்ட் இரண்டிற்குமான நிரலாக்க மொழி |   5.4.2 |
| [Node](https://nodejs.org/en)                 | சேவையகத்தை இயக்குகிறது                                 | 20.18.2 |
| [Viem](https://viem.sh/)                      | பிளாக்செயினுடன் தகவல்தொடர்பு                           |  2.9.20 |
| [MUD](https://mud.dev/)                       | ஆன்செயின் தரவு மேலாண்மை                                |  2.0.12 |
| [React](https://react.dev/)                   | கிளையன்ட் பயனர் இடைமுகம்                               |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | கிளையன்ட் குறியீட்டை வழங்குகிறது                       |   4.2.1 |

## மைன்ஸ்வீப்பர் எடுத்துக்காட்டு {#minesweeper}

[மைன்ஸ்வீப்பர்](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) என்பது ஒரு கண்ணிவெடிப் புலத்துடன் கூடிய இரகசிய வரைபடத்தைக் கொண்ட ஒரு விளையாட்டாகும். வீரர் ஒரு குறிப்பிட்ட இடத்தில் தோண்டத் தேர்வு செய்கிறார். அந்த இடத்தில் கண்ணிவெடி இருந்தால், விளையாட்டு முடிந்துவிடும். இல்லையெனில், அந்த இடத்தைச் சுற்றியுள்ள எட்டு சதுரங்களில் உள்ள கண்ணிவெடிகளின் எண்ணிக்கையை வீரர் பெறுவார்.

இந்தச் செயலி [MUD](https://mud.dev/) ஐப் பயன்படுத்தி எழுதப்பட்டுள்ளது, இது ஒரு [திறவு-மதிப்புத் தரவுத்தளத்தை](https://aws.amazon.com/nosql/key-value/) பயன்படுத்தி ஆன்செயினில் தரவைச் சேமிக்கவும், அந்தத் தரவை ஆஃப்செயின் கூறுகளுடன் தானாக ஒத்திசைக்கவும் உதவுகிறது. ஒத்திசைவுக்கு கூடுதலாக, MUD அணுகல் கட்டுப்பாட்டை வழங்குவதை எளிதாக்குகிறது, மேலும் பிற பயனர்கள் எங்கள் செயலியை அனுமதியின்றி [நீட்டிக்கவும்](https://mud.dev/guides/extending-a-world) உதவுகிறது.

### மைன்ஸ்வீப்பர் எடுத்துக்காட்டை இயக்குகிறது {#running-minesweeper-example}

மைன்ஸ்வீப்பர் எடுத்துக்காட்டை இயக்க:

1. [முன் தேவைகளை நிறுவியுள்ளீர்கள்](https://mud.dev/quickstart#prerequisites) என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), மற்றும் [`mprocs`](https://github.com/pvolok/mprocs).

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

   `pnpm install` இன் ஒரு பகுதியாக Foundry நிறுவப்பட்டிருந்தால், நீங்கள் கட்டளை-வரி ஷெல்லை மறுதொடக்கம் செய்ய வேண்டும்.

4. ஒப்பந்தங்களைத் தொகுக்கவும்

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. நிரலைத் தொடங்கவும் ([anvil](https://book.getfoundry.sh/anvil/) பிளாக்செயின் உட்பட) மற்றும் காத்திருக்கவும்.

   ```sh copy
   mprocs
   ```

   தொடக்கத்திற்கு நீண்ட நேரம் ஆகும் என்பதை நினைவில் கொள்ளவும். முன்னேற்றத்தைக் காண, முதலில் கீழ் அம்புக்குறியைப் பயன்படுத்தி _contracts_ தாவலுக்கு உருட்டி, MUD ஒப்பந்தங்கள் பயன்படுத்தப்படுவதைக் காணவும். _Waiting for file changes…_ என்ற செய்தியை நீங்கள் பெறும்போது, ஒப்பந்தங்கள் பயன்படுத்தப்பட்டுவிட்டன, மேலும் முன்னேற்றம் _server_ தாவலில் நடக்கும். அங்கு, _Verifier address: 0x...._ என்ற செய்தியைப் பெறும் வரை நீங்கள் காத்திருக்க வேண்டும்.

   இந்த படி வெற்றிகரமாக இருந்தால், நீங்கள் `mprocs` திரையைப் பார்ப்பீர்கள், இடதுபுறத்தில் வெவ்வேறு செயல்முறைகள் மற்றும் வலதுபுறத்தில் தற்போது தேர்ந்தெடுக்கப்பட்ட செயல்முறைக்கான கன்சோல் வெளியீடு இருக்கும்.

   ![mprocs திரை](./mprocs.png)

   `mprocs` இல் சிக்கல் இருந்தால், நீங்கள் நான்கு செயல்முறைகளையும் கைமுறையாக, ஒவ்வொன்றையும் அதன் சொந்த கட்டளை வரி சாளரத்தில் இயக்கலாம்:

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

   - **கிளையன்ட்**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. இப்போது நீங்கள் [கிளையன்ட்டிற்கு](http://localhost:3000) உலவலாம், **புதிய விளையாட்டு** என்பதைக் கிளிக் செய்து, விளையாடத் தொடங்கலாம்.

### அட்டவணைகள் {#tables}

நமக்கு ஆன்செயினில் [பல அட்டவணைகள்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) தேவை.

- `Configuration`: இந்த அட்டவணை ஒரு சிங்கிள்டன், இதற்குத் திறவுகோல் மற்றும் ஒரே ஒரு பதிவு இல்லை. விளையாட்டு உள்ளமைவுத் தகவலை வைத்திருக்க இது பயன்படுகிறது:
  - `height`: ஒரு கண்ணிவெடிப் புலத்தின் உயரம்
  - `width`: ஒரு கண்ணிவெடிப் புலத்தின் அகலம்
  - `numberOfBombs`: ஒவ்வொரு கண்ணிவெடிப் புலத்திலும் உள்ள வெடிகுண்டுகளின் எண்ணிக்கை

- `VerifierAddress`: இந்த அட்டவணையும் ஒரு சிங்கிள்டன் ஆகும். உள்ளமைவின் ஒரு பகுதியைப் பிடிக்க இது பயன்படுகிறது, சரிபார்ப்பு ஒப்பந்தத்தின் முகவரி (`verifier`). இந்தத் தகவலை `Configuration` அட்டவணையில் வைத்திருக்கலாம், ஆனால் இது ஒரு வெவ்வேறு கூறான சேவையகத்தால் அமைக்கப்படுகிறது, எனவே அதை ஒரு தனி அட்டவணையில் வைப்பது எளிது.

- `PlayerGame`: இதன் திறவுகோல் வீரரின் முகவரி. தரவு:

  - `gameId`: 32-பைட் மதிப்பு, இது வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் ஆகும் (விளையாட்டு அடையாளங்காட்டி).
  - `win`: வீரர் விளையாட்டில் வெற்றி பெற்றாரா இல்லையா என்பதைக் குறிக்கும் ஒரு பூலியன்.
  - `lose`: வீரர் விளையாட்டில் தோற்றாரா இல்லையா என்பதைக் குறிக்கும் ஒரு பூலியன்.
  - `digNumber`: விளையாட்டில் வெற்றிகரமான தோண்டல்களின் எண்ணிக்கை.

- `GamePlayer`: இந்த அட்டவணை `gameId` இலிருந்து வீரர் முகவரிக்குத் தலைகீழ் மேப்பிங்கைக் கொண்டுள்ளது.

- `Map`: இதன் திறவுகோல் மூன்று மதிப்புகளின் டபிள் ஆகும்:

  - `gameId`: 32-பைட் மதிப்பு, இது வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் ஆகும் (விளையாட்டு அடையாளங்காட்டி).
  - `x` ஆயத்தொலை
  - `y` ஆயத்தொலை

  மதிப்பு ஒரு ஒற்றை எண். ஒரு வெடிகுண்டு கண்டறியப்பட்டால் அது 255 ஆகும். இல்லையெனில், அது அந்த இடத்தைச் சுற்றியுள்ள வெடிகுண்டுகளின் எண்ணிக்கை கூட்டல் ஒன்று. வெடிகுண்டுகளின் எண்ணிக்கையை மட்டும் நம்மால் பயன்படுத்த முடியாது, ஏனென்றால் இயல்பாகவே EVM-இல் உள்ள அனைத்து சேமிப்பகமும் MUD-இல் உள்ள அனைத்து வரிசை மதிப்புகளும் பூஜ்ஜியமாகும். "வீரர் இன்னும் இங்கே தோண்டவில்லை" மற்றும் "வீரர் இங்கே தோண்டினார், மேலும் சுற்றிலும் பூஜ்ஜிய வெடிகுண்டுகள் இருப்பதைக் கண்டறிந்தார்" ஆகியவற்றுக்கு இடையே நாம் வேறுபடுத்த வேண்டும்.

கூடுதலாக, கிளையன்ட் மற்றும் சேவையகத்திற்கு இடையேயான தொடர்பு ஆன்செயின் கூறு மூலம் நடைபெறுகிறது. இது அட்டவணைகளைப் பயன்படுத்தியும் செயல்படுத்தப்படுகிறது.

- `PendingGame`: ஒரு புதிய விளையாட்டைத் தொடங்க சேவையாற்றப்படாத கோரிக்கைகள்.
- `PendingDig`: ஒரு குறிப்பிட்ட விளையாட்டில் ஒரு குறிப்பிட்ட இடத்தில் தோண்டுவதற்கான சேவையாற்றப்படாத கோரிக்கைகள். இது ஒரு [ஆஃப்செயின் அட்டவணை](https://mud.dev/store/tables#types-of-tables), அதாவது இது EVM சேமிப்பகத்தில் எழுதப்படவில்லை, இது நிகழ்வுகளைப் பயன்படுத்தி ஆஃப்செயினில் மட்டுமே படிக்கக்கூடியது.

### செயல்படுத்தல் மற்றும் தரவுப் பாய்வுகள் {#execution-data-flows}

இந்தப் பாய்வுகள் கிளையன்ட், ஆன்செயின் கூறு மற்றும் சேவையகத்திற்கு இடையில் செயல்படுத்தலை ஒருங்கிணைக்கின்றன.

#### துவக்கம் {#initialization-flow}

நீங்கள் `mprocs` இயக்கும்போது, இந்த படிகள் நடக்கும்:

1. [`mprocs`](https://github.com/pvolok/mprocs) நான்கு கூறுகளை இயக்குகிறது:

   - [Anvil](https://book.getfoundry.sh/anvil/), இது ஒரு உள்ளூர் பிளாக்செயினை இயக்குகிறது
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), இது MUD-க்கான ஒப்பந்தங்களைத் தொகுத்து (தேவைப்பட்டால்) பயன்படுத்துகிறது
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), இது வலை உலாவிகளுக்கு UI மற்றும் கிளையன்ட் குறியீட்டை வழங்க [Vite](https://vitejs.dev/) ஐ இயக்குகிறது.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), இது சேவையகச் செயல்களைச் செய்கிறது

2. `contracts` தொகுப்பு MUD ஒப்பந்தங்களைப் பயன்படுத்துகிறது, பின்னர் [ `PostDeploy.s.sol` ஸ்கிரிப்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) இயக்குகிறது. இந்த ஸ்கிரிப்ட் உள்ளமைவை அமைக்கிறது. github இலிருந்து வரும் குறியீடு [அதில் எட்டு சுரங்கங்களைக் கொண்ட 10x5 கண்ணிவெடிப் புலத்தைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) குறிப்பிடுகிறது.

3. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD-ஐ அமைப்பதன்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) மூலம் தொடங்குகிறது. மற்றவற்றுடன், இது தரவு ஒத்திசைவைச் செயல்படுத்துகிறது, எனவே தொடர்புடைய அட்டவணைகளின் ஒரு நகல் சேவையகத்தின் நினைவகத்தில் இருக்கும்.

4. சேவையகம் [`Configuration` அட்டவணை மாறும்போது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) செயல்படுத்தப்பட வேண்டிய ஒரு செயல்பாட்டிற்கு குழுசேர்கிறது. `PostDeploy.s.sol` இயக்கப்பட்ட பிறகு [இந்த செயல்பாடு](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) அழைக்கப்பட்டு அட்டவணையை மாற்றியமைக்கிறது.

5. சேவையக துவக்கச் செயல்பாட்டில் உள்ளமைவு இருக்கும்போது, சேவையகத்தின் [#using-zokrates-from-typescript பூஜ்ஜிய-அறிவுப் பகுதியைத்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) துவக்க அது `zkFunctions` ஐ அழைக்கிறது. பூஜ்ஜிய-அறிவுச் செயல்பாடுகள் கண்ணிவெடிப் புலத்தின் அகலம் மற்றும் உயரத்தை மாறிலிகளாகக் கொண்டிருக்க வேண்டும் என்பதால், உள்ளமைவைப் பெறும் வரை இது நடக்காது.

6. சேவையகத்தின் பூஜ்ஜிய-அறிவுப் பகுதி துவக்கப்பட்ட பிறகு, அடுத்த படி [பூஜ்ஜிய-அறிவு சரிபார்ப்பு ஒப்பந்தத்தை பிளாக்செயினுக்குப் பயன்படுத்துவது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) மற்றும் MUD-இல் சரிபார்ப்பு முகவரியை அமைப்பது.

7. இறுதியாக, ஒரு வீரர் [ஒரு புதிய விளையாட்டைத் தொடங்க](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) அல்லது [இருக்கும் விளையாட்டில் தோண்டக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) கோரும்போது பார்ப்பதற்குப் புதுப்பிப்புகளுக்கு நாம் குழு சேர்கிறோம்.

#### புதிய விளையாட்டு {#new-game-flow}

வீரர் ஒரு புதிய விளையாட்டைக் கோரும்போது இதுதான் நடக்கும்.

1. இந்த வீரருக்கான விளையாட்டு செயலில் இல்லாவிட்டாலோ, அல்லது ஒன்று இருந்து பூஜ்ஜியத்தின் gameId கொண்டிருந்தாலோ, கிளையன்ட் ஒரு [புதிய விளையாட்டுப் பொத்தானைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) காட்டுகிறது. பயனர் இந்தப் பொத்தானை அழுத்தும்போது, [React `newGame` செயல்பாட்டை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ஒரு `System` அழைப்பு. MUD இல் அனைத்து அழைப்புகளும் `World` ஒப்பந்தம் வழியாக வழிநடத்தப்படுகின்றன, மேலும் பெரும்பாலான சந்தர்ப்பங்களில் நீங்கள் `<namespace>__<function name>` ஐ அழைக்கிறீர்கள். இந்த விஷயத்தில், அழைப்பு `app__newGame` க்குச் செல்கிறது, அதை MUD பின்னர் [`GameSystem` இல் `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) க்கு அனுப்புகிறது.

3. வீரருக்குச் செயலில் ஒரு விளையாட்டு இல்லை என்பதை ஆன்செயின் செயல்பாடு சரிபார்க்கிறது, மேலும் இல்லை என்றால் [`PendingGame` அட்டவணையில் கோரிக்கையைச் சேர்க்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. சேவையகம் `PendingGame` இல் மாற்றத்தைக் கண்டறிந்து, [குழுசேர்ந்த செயல்பாட்டை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). இந்தச் செயல்பாடு [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) ஐ அழைக்கிறது, இது பின்னர் [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) ஐ அழைக்கிறது.

5. `createGame` செய்யும் முதல் விஷயம், [பொருத்தமான எண்ணிக்கையிலான கண்ணிவெடிகளுடன் ஒரு சீரற்ற வரைபடத்தை உருவாக்குவது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). பின்னர், இது Zokrates-க்குத் தேவையான வெற்று எல்லைகளுடன் ஒரு வரைபடத்தை உருவாக்க [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ஐ அழைக்கிறது. இறுதியாக, `createGame` விளையாட்டு ஐடியாகப் பயன்படுத்தப்படும் வரைபடத்தின் ஹாஷைப் பெற, [`calculateMapHash`](#calculateMapHash) ஐ அழைக்கிறது.

6. `newGame` செயல்பாடு `gamesInProgress` க்கு புதிய விளையாட்டைச் சேர்க்கிறது.

7. சேவையகம் செய்யும் கடைசி விஷயம், ஆன்செயினில் இருக்கும் [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) ஐ அழைப்பது. இந்தச் செயல்பாடு ஒரு வெவ்வேறு `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) இல் உள்ளது, இது அணுகல் கட்டுப்பாட்டை இயக்க உதவுகிறது. அணுகல் கட்டுப்பாடு [MUD உள்ளமைவு கோப்பில்](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) வரையறுக்கப்பட்டுள்ளது.

   அணுகல் பட்டியல் ஒரு ஒற்றை முகவரியை மட்டுமே `System` ஐ அழைக்க அனுமதிக்கிறது. இது சேவையக செயல்பாடுகளுக்கான அணுகலை ஒரு ஒற்றை முகவரிக்குக் கட்டுப்படுத்துகிறது, எனவே யாரும் சேவையகமாக ஆள்மாறாட்டம் செய்ய முடியாது.

8. ஆன்செயின் கூறு தொடர்புடைய அட்டவணைகளைப் புதுப்பிக்கிறது:

   - `PlayerGame` இல் விளையாட்டை உருவாக்கவும்.
   - `GamePlayer` இல் தலைகீழ் மேப்பிங்கை அமைக்கவும்.
   - `PendingGame` இலிருந்து கோரிக்கையை அகற்றவும்.

9. சேவையகம் `PendingGame` இல் மாற்றத்தைக் கண்டறிகிறது, ஆனால் [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) தவறானது என்பதால் எதையும் செய்யாது.

10. கிளையன்டில் [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) வீரரின் முகவரிக்கான `PlayerGame` உள்ளீட்டிற்கு அமைக்கப்பட்டுள்ளது. `PlayerGame` மாறும்போது, `gameRecord` கூட மாறுகிறது.

11. `gameRecord` இல் ஒரு மதிப்பு இருந்தால், மற்றும் விளையாட்டு வெற்றி அல்லது தோல்வி அடையவில்லை என்றால், கிளையன்ட் [வரைபடத்தைக் காட்டுகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### தோண்டு {#dig-flow}

1. வீரர் [வரைபட செல்லின் பொத்தானைக் கிளிக் செய்கிறார்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), இது [`dig` செயல்பாட்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) அழைக்கிறது. இந்த செயல்பாடு [ஆன்செயினில் `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) ஐ அழைக்கிறது.

2. ஆன்செயின் கூறு [பல நல்லறிவுக் சோதனைகளைச் செய்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), மற்றும் வெற்றிகரமாக இருந்தால் தோண்டும் கோரிக்கையை [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) இல் சேர்க்கிறது.

3. சேவையகம் [`PendingDig` இல் உள்ள மாற்றத்தைக் கண்டறிகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [அது செல்லுபடியானால்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), அது [பூஜ்ஜிய-அறிவு குறியீட்டை அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (கீழே விளக்கப்பட்டுள்ளது) முடிவு மற்றும் அது செல்லுபடியானது என்பதற்கான ஆதாரம் இரண்டையும் உருவாக்க.

4. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) ஆன்செயினில் [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) ஐ அழைக்கிறது.

5. `digResponse` இரண்டு விஷயங்களைச் செய்கிறது. முதலில், அது [பூஜ்ஜிய அறிவுச் சான்றைச்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) சரிபார்க்கிறது. பின்னர், ஆதாரம் சரிபார்த்தால், அது முடிவை உண்மையில் செயலாக்க [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ஐ அழைக்கிறது.

6. `processDigResult` விளையாட்டு [தோற்கடிக்கப்பட்டதா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) அல்லது [வெல்லப்பட்டதா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) என்பதைச் சரிபார்த்து, ஆன்செயின் வரைபடமான [`Map`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80) ஐப் புதுப்பிக்கிறது.

7. கிளையன்ட் புதுப்பிப்புகளைத் தானாகவே எடுத்துக்கொண்டு [வீரருக்குக் காட்டப்படும் வரைபடத்தைப் புதுப்பிக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), மற்றும் பொருந்தினால் அது வெற்றி அல்லது தோல்வி என்றால் வீரரிடம் கூறுகிறது.

## Zokrates-ஐப் பயன்படுத்துதல் {#using-zokrates}

மேலே விளக்கப்பட்டுள்ள பாய்வுகளில் நாம் பூஜ்ஜிய-அறிவுப் பகுதிகளைத் தவிர்த்து, அவற்றை ஒரு கருப்புப் பெட்டியாகக் கருதினோம். இப்போது அதைத் திறந்து, அந்தக் குறியீடு எவ்வாறு எழுதப்பட்டுள்ளது என்பதைப் பார்ப்போம்.

### வரைபடத்தை ஹாஷ் செய்தல் {#hashing-map}

நாம் பயன்படுத்தும் Zokrates ஹாஷ் செயல்பாடான [Poseidon](https://www.poseidon-hash.info) ஐச் செயல்படுத்த [இந்த JavaScript குறியீட்டை](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) நாம் பயன்படுத்தலாம். இருப்பினும், இது வேகமாக இருந்தாலும், அதைச் செய்ய Zokrates ஹாஷ் செயல்பாட்டைப் பயன்படுத்துவதை விட சிக்கலானதாகவும் இருக்கும். இது ஒரு பயிற்சி, எனவே குறியீடு செயல்திறனுக்காக அல்ல, எளிமைக்காக மேம்படுத்தப்பட்டுள்ளது. எனவே, நமக்கு இரண்டு வெவ்வேறு Zokrates நிரல்கள் தேவை, ஒன்று வரைபடத்தின் ஹாஷைக் (`hash`) கணக்கிடவும், மற்றொன்று வரைபடத்தில் உள்ள ஒரு இடத்திலுள்ள தோண்டலின் முடிவின் பூஜ்ஜிய-அறிவுச் சான்றை (`dig`) உருவாக்கவும்.

### ஹாஷ் செயல்பாடு {#hash-function}

இது ஒரு வரைபடத்தின் ஹாஷைக் கணக்கிடும் செயல்பாடு. இந்தக் குறியீட்டை வரி வரியாகப் பார்ப்போம்.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

இந்த இரண்டு வரிகளும் [Zokrates நிலையான நூலகத்திலிருந்து](https://zokrates.github.io/toolbox/stdlib.html) இரண்டு செயல்பாடுகளை இறக்குமதி செய்கின்றன. [முதல் செயல்பாடு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ஒரு [Poseidon ஹாஷ்](https://www.poseidon-hash.info/) ஆகும். இது [`field` உறுப்புகளின்](https://zokrates.github.io/language/types.html#field) ஒரு வரிசையை எடுத்து ஒரு `field` ஐத் தருகிறது.

Zokrates இல் உள்ள ஃபீல்டு உறுப்பு பொதுவாக 256 பிட்களை விடக் குறைவாக இருக்கும், ஆனால் அதிகமாக இல்லை. குறியீட்டை எளிதாக்க, வரைபடத்தை 512 பிட்கள் வரை கட்டுப்படுத்துகிறோம், மற்றும் நான்கு ஃபீல்டுகளின் வரிசையை ஹாஷ் செய்கிறோம், மேலும் ஒவ்வொரு ஃபீல்டிலும் 128 பிட்களை மட்டுமே பயன்படுத்துகிறோம். [`pack128` செயல்பாடு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) இந்த நோக்கத்திற்காக 128 பிட்களின் வரிசையை ஒரு `field` ஆக மாற்றுகிறது.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

இந்த வரி ஒரு செயல்பாட்டு வரையறையைத் தொடங்குகிறது. `hashMap` `map` எனப்படும் ஒற்றை அளவுருவைப் பெறுகிறது, இது ஒரு இரு பரிமாண `bool`(ean) வரிசையாகும். வரைபடத்தின் அளவு `width+2` க்கு `height+2` ஆக இருப்பதற்கான காரணங்கள் [கீழே விளக்கப்பட்டுள்ளன](#why-map-border).

Zokrates நிரல்கள் இந்தச் செயலியில் [டெம்ப்ளேட் சரங்களாக](https://www.w3schools.com/js/js_string_templates.asp) சேமிக்கப்பட்டுள்ளதால் நாம் `${width+2}` மற்றும் `${height+2}` ஐப் பயன்படுத்தலாம். `${` மற்றும் `}` க்கு இடையேயான குறியீடு JavaScript ஆல் மதிப்பிடப்படுகிறது, மேலும் இந்த வழியில் நிரலை வெவ்வேறு வரைபட அளவுகளுக்குப் பயன்படுத்தலாம். வரைபட அளவுருவைச் சுற்றி எந்த வெடிகுண்டுகளும் இல்லாத ஒரு இடம் அகலமான எல்லையைக் கொண்டுள்ளது, இதுவே அகலம் மற்றும் உயரத்துடன் இரண்டைச் சேர்க்க வேண்டியதற்கான காரணம்.

திரும்பும் மதிப்பு ஹாஷைக் கொண்ட ஒரு `field` ஆகும்.

```
   bool[512] mut map1d = [false; 512];
```

வரைபடம் இருபரிமாணமுடையது. இருப்பினும், `pack128` செயல்பாடு இரு பரிமாண வரிசைகளுடன் வேலை செய்யாது. எனவே நாம் முதலில் வரைபடத்தை `map1d` ஐப் பயன்படுத்தி 512-பைட் வரிசையாகத் தட்டையாக்குகிறோம். இயல்பாக Zokrates மாறிகள் மாறிலிகளாகும், ஆனால் இந்த வரிசைக்கு ஒரு வளையத்தில் மதிப்புகளை ஒதுக்க வேண்டும், எனவே அதை [`mut`](https://zokrates.github.io/language/variables.html#mutability) என வரையறுக்கிறோம்.

Zokrates-இடம் `undefined` இல்லாததால் வரிசையை நாம் துவக்க வேண்டும். `[false; 512]` என்ற வெளிப்பாடு [512 `false` மதிப்புகளின் வரிசையைக்](https://zokrates.github.io/language/types.html#declaration-and-initialization) குறிக்கிறது.

```
   u32 mut counter = 0;
```

`map1d` இல் நாம் ஏற்கனவே நிரப்பிய பிட்களையும் நிரப்பாதவற்றையும் வேறுபடுத்த நமக்கு ஒரு கவுண்டரும் தேவை.

```
   for u32 x in 0..${width+2} {
```

Zokrates இல் [`for` loop](https://zokrates.github.io/language/control_flow.html#for-loops) ஐ இப்படித்தான் அறிவிப்பீர்கள். ஒரு Zokrates `for` வளையத்திற்கு நிலையான வரம்புகள் இருக்க வேண்டும், ஏனென்றால் அது ஒரு வளையமாகத் தோன்றினாலும், கம்பைலர் அதை உண்மையில் "விரித்து" விடுகிறது. TypeScript குறியீடு கம்பைலரை அழைப்பதற்கு முன்பு `width` ஐ அமைப்பதால் `${width+2}` வெளிப்பாடு ஒரு தொகுப்பு நேர மாறிலியாகும்.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

வரைபடத்தில் உள்ள ஒவ்வொரு இடத்திற்கும், அந்த மதிப்பை `map1d` வரிசையில் வைத்து, கவுண்டரை அதிகரிக்கவும்.

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

இந்த வரிசையை ஒரு ஹாஷாக மாற்ற `poseidon` ஐப் பயன்படுத்தவும்.

### ஹாஷ் நிரல் {#hash-program}

சேவையகம் விளையாட்டு அடையாளங்காட்டிகளை உருவாக்க நேரடியாக `hashMap` ஐ அழைக்க வேண்டும். இருப்பினும், Zokrates ஒரு நிரலைத் தொடங்க `main` செயல்பாட்டை மட்டுமே அழைக்க முடியும், எனவே ஹாஷ் செயல்பாட்டை அழைக்கும் `main` உடன் ஒரு நிரலை உருவாக்குகிறோம்.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### தோண்டும் நிரல் {#dig-program}

இது செயலியின் பூஜ்ஜிய-அறிவுப் பகுதியின் இதயம், இங்கு தோண்டும் முடிவுகளைச் சரிபார்க்கப் பயன்படும் சான்றுகளை நாங்கள் உருவாக்குகிறோம்.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### ஏன் வரைபட எல்லை {#why-map-border}

பூஜ்ஜிய-அறிவுச் சான்றுகள் [எண்கணித சுற்றுகளைப்](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) பயன்படுத்துகின்றன, அவற்றுக்கு `if` கூற்றுக்கு எளிதான சமமான ஒன்று இல்லை. அதற்கு பதிலாக, அவை [நிபந்தனை ஆபரேட்டரின்](https://en.wikipedia.org/wiki/Ternary_conditional_operator) சமமான ஒன்றைப் பயன்படுத்துகின்றன. `a` பூஜ்ஜியம் அல்லது ஒன்றாக இருக்க முடிந்தால், `if a { b } else { c }` ஐ `ab+(1-a)c` ஆக நீங்கள் கணக்கிடலாம்.

இதன் காரணமாக, ஒரு Zokrates `if` கூற்று எப்போதும் இரண்டு கிளைகளையும் மதிப்பிடுகிறது. எடுத்துக்காட்டாக, உங்களிடம் இந்தக் குறியீடு இருந்தால்:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

அது `arr[10]` ஐக் கணக்கிட வேண்டும் என்பதால் பிழை ஏற்பட்டுவிடும், அந்த மதிப்பு பின்னர் பூஜ்ஜியத்தால் பெருக்கப்பட்டாலும் கூட.

வரைபடத்தைச் சுற்றி ஒரு இடம் அகலமான எல்லை தேவைப்படுவதற்கு இதுவே காரணம். ஒரு இடத்தைச் சுற்றியுள்ள மொத்த கண்ணிவெடிகளின் எண்ணிக்கையை நாம் கணக்கிட வேண்டும், அதாவது நாம் தோண்டும் இடத்திற்கு ஒரு வரிசை மேலும் கீழும், இடதுபுறமும் வலதுபுறமும் உள்ள இடத்தைப் பார்க்க வேண்டும். அதாவது அந்த இடங்கள் Zokrates வழங்கப்பட்ட வரைபட வரிசையில் இருக்க வேண்டும்.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

இயல்பாக Zokrates சான்றுகளில் அவற்றின் உள்ளீடுகள் அடங்கும். ஒரு இடத்தைச் சுற்றி ஐந்து கண்ணிவெடிகள் இருப்பதாகத் தெரிந்தும் அது எந்த இடம் என்று உங்களுக்கு உண்மையில் தெரியாவிட்டால் எந்தப் பயனும் இல்லை (மேலும் நீங்கள் அதை உங்கள் கோரிக்கையுடன் பொருத்த முடியாது, ஏனென்றால் பின்னர் சரிபார்ப்பவர் வெவ்வேறு மதிப்புகளைப் பயன்படுத்தலாம் மற்றும் அதைப் பற்றி உங்களுக்குச் சொல்லாமல் இருக்கலாம்). இருப்பினும், வரைபடத்தை Zokrates க்கு வழங்கும்போது அதை ரகசியமாக வைத்திருக்க வேண்டும். ஒரு `private` அளவுருவைப் பயன்படுத்துவதே தீர்வு, இது சான்றுகளால் வெளிப்படுத்தப்படாத ஒன்று.

இது துஷ்பிரயோகத்திற்கான மற்றொரு வழியைத் திறக்கிறது. சரிபார்ப்பவர் சரியான ஆயங்களை பயன்படுத்தலாம், ஆனால் இடத்தைச் சுற்றி எத்தனை கண்ணிவெடிகள் வேண்டுமானாலும் உள்ள ஒரு வரைபடத்தை உருவாக்கலாம், மற்றும் ஒருவேளை அந்த இடத்திலேயே கூட. இந்த துஷ்பிரயோகத்தைத் தடுக்க, பூஜ்ஜிய அறிவுச் சான்றில் வரைபடத்தின் ஹாஷை உள்ளடக்குகிறோம், இதுவே விளையாட்டு அடையாளங்காட்டியாகும்.

```
   return (hashMap(map),
```

இங்கு திரும்பும் மதிப்பு தோண்டும் முடிவையும், வரைபட ஹாஷ் வரிசையையும் உள்ளடக்கிய ஒரு டபிள் ஆகும்.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

அந்த இடத்திலேயே வெடிகுண்டு இருந்தால் ஒரு சிறப்பு மதிப்பாக 255 ஐப் பயன்படுத்துகிறோம்.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

வீரர் ஒரு கண்ணிவெடியில் அடிக்கவில்லை என்றால், அந்த இடத்தைச் சுற்றியுள்ள பகுதிக்கான கண்ணிவெடி எண்ணிக்கையைச் சேர்த்து அதைத் திருப்பி அனுப்பவும்.

### TypeScript இலிருந்து Zokrates ஐப் பயன்படுத்துதல் {#using-zokrates-from-typescript}

Zokrates ஒரு கட்டளை வரி இடைமுகத்தைக் கொண்டுள்ளது, ஆனால் இந்த நிரலில் நாம் அதை [TypeScript குறியீட்டில்](https://zokrates.github.io/toolbox/zokrates_js.html) பயன்படுத்துகிறோம்.

Zokrates வரையறைகளைக் கொண்ட நூலகம் [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) என்று அழைக்கப்படுகிறது.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript பிணைப்புகளை](https://zokrates.github.io/toolbox/zokrates_js.html) இறக்குமதி செய்யவும். நமக்கு [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) செயல்பாடு மட்டுமே தேவை, ஏனெனில் இது அனைத்து Zokrates வரையறைகளுக்கும் தீர்வு காணும் ஒரு வாக்குறுதியைத் தருகிறது.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates ஐப் போலவே, நாமும் ஒரே ஒரு செயல்பாட்டை மட்டுமே ஏற்றுமதி செய்கிறோம், அதுவும் [ஒத்திசைவற்றது](https://www.w3schools.com/js/js_async.asp). அது இறுதியில் திரும்பும்போது, கீழே நாம் பார்ப்பது போல் பல செயல்பாடுகளை வழங்குகிறது.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates ஐ துவக்கவும், நூலகத்திலிருந்து நமக்குத் தேவையான அனைத்தையும் பெறவும்.

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

அடுத்து, மேலே நாம் பார்த்த ஹாஷ் செயல்பாடு மற்றும் இரண்டு Zokrates நிரல்கள் உள்ளன.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

இங்கே நாம் அந்த நிரல்களைத் தொகுக்கிறோம்.

```typescript
// Create the keys for zero knowledge verification.
// On a production system you'd want to use a setup ceremony.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ஒரு உற்பத்தி அமைப்பில் நாம் ஒரு சிக்கலான [அமைவு விழாவைப்](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம், ஆனால் இது ஒரு விளக்கக்காட்சிக்கு போதுமானது. பயனர்கள் சரிபார்ப்பவர் திறவுகோலை அறிந்திருப்பது ஒரு பிரச்சனை இல்லை - அவை உண்மையாக இல்லாவிட்டால், அவற்றை நிரூபிக்க அதைப் பயன்படுத்த முடியாது. நாம் என்ட்ரோபியைக் குறிப்பிடுவதால் (இரண்டாவது அளவுரு, `""`), முடிவுகள் எப்போதும் ஒரே மாதிரியாகவே இருக்கும்.

**குறிப்பு:** Zokrates நிரல்களைத் தொகுப்பதும் திறவுகோலை உருவாக்குவதும் மெதுவான செயல்முறைகள். வரைபட அளவு மாறும் போது தவிர, ஒவ்வொரு முறையும் அவற்றை மீண்டும் செய்யத் தேவையில்லை. ஒரு உற்பத்தி அமைப்பில் நீங்கள் அவற்றை ஒரு முறை செய்வீர்கள், பின்னர் வெளியீட்டைச் சேமிப்பீர்கள். எளிமைக்காகவே நான் இங்கே அதைச் செய்யவில்லை.

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) செயல்பாடு உண்மையில் Zokrates நிரலை இயக்குகிறது. இது இரண்டு ஃபீல்டுகளுடன் ஒரு கட்டமைப்பைத் தருகிறது: `output`, இது நிரலின் வெளியீட்டை ஒரு JSON சரமாகத் தருகிறது, மற்றும் `witness`, இது முடிவின் பூஜ்ஜிய அறிவுச் சான்றை உருவாக்கத் தேவையான தகவல். இங்கே நமக்கு வெளியீடு மட்டுமே தேவை.

வெளியீடு `"31337"` வடிவத்தில் ஒரு சரம், மேற்கோள் குறிகளுக்குள் ஒரு தசம எண். ஆனால் நமக்கு `viem` க்குத் தேவைப்படும் வெளியீடு `0x60A7` வடிவத்தில் ஒரு ஹெக்ஸாடெசிமல் எண். எனவே மேற்கோள் குறிகளை அகற்ற `.slice(1,-1)` ஐப் பயன்படுத்துகிறோம், பின்னர் மீதமுள்ள சரத்தை, அதாவது ஒரு தசம எண்ணை, ஒரு [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) க்கு இயக்க `BigInt` ஐப் பயன்படுத்துகிறோம். `.toString(16)` இந்த `BigInt` ஐ ஒரு ஹெக்ஸாடெசிமல் சரமாக மாற்றுகிறது, மேலும் `"0x"+` ஹெக்ஸாடெசிமல் எண்களுக்கான மார்க்கரைச் சேர்க்கிறது.

```typescript
// Dig and return a zero knowledge proof of the result
// (server-side code)
```

பூஜ்ஜிய அறிவுச் சான்றில் பொது உள்ளீடுகள் (`x` மற்றும் `y`) மற்றும் முடிவுகள் (வரைபடத்தின் ஹாஷ் மற்றும் வெடிகுண்டுகளின் எண்ணிக்கை) அடங்கும்.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

ஒரு குறியீட்டு வரம்பிற்கு வெளியே உள்ளதா என்பதை Zokrates இல் சரிபார்ப்பது ஒரு பிரச்சனை, எனவே அதை இங்கே செய்கிறோம்.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

தோண்டும் நிரலை இயக்கவும்.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) ஐப் பயன்படுத்தி சான்றைத் திருப்பி அனுப்பவும்.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ஒரு Solidity சரிபார்ப்பவர், பிளாக்செயினில் நாம் பயன்படுத்தக்கூடிய ஒரு ஸ்மார்ட் ஒப்பந்தம் மற்றும் `digCompiled.program` ஆல் உருவாக்கப்பட்ட சான்றுகளைச் சரிபார்க்கப் பயன்படுகிறது.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

இறுதியாக, பிற குறியீடுக்குத் தேவைப்படக்கூடிய அனைத்தையும் திருப்பி அனுப்பவும்.

## பாதுகாப்பு சோதனைகள் {#security-tests}

பாதுகாப்பு சோதனைகள் முக்கியமானவை, ஏனெனில் ஒரு செயல்பாட்டுப் பிழை இறுதியில் தன்னை வெளிப்படுத்தும். ஆனால் செயலி பாதுகாப்பற்றதாக இருந்தால், யாராவது ஏமாற்றி மற்றவர்களுக்குச் சொந்தமான வளங்களைப் பெற்றுச் செல்வதன் மூலம் வெளிப்படுத்தப்படுவதற்கு முன்பு அது நீண்ட காலமாக மறைந்திருக்கும்.

### அனுமதிகள் {#permissions}

இந்த விளையாட்டில் ஒரு சலுகை பெற்ற நிறுவனம் உள்ளது, அது சேவையகம். [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) இல் உள்ள செயல்பாடுகளை அழைக்க அனுமதிக்கப்பட்ட ஒரே பயனர் இதுதான். சேவையக கணக்காக மட்டுமே அனுமதிக்கப்பட்ட செயல்பாடுகளுக்கான அழைப்புகளைச் சரிபார்க்க நாம் [`cast`](https://book.getfoundry.sh/cast/) ஐப் பயன்படுத்தலாம்.

[சேவையகத்தின் தனிப்பட்ட திறவுகோல் `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52) இல் உள்ளது.

1. `anvil` (பிளாக்செயின்) இயங்கும் கணினியில், இந்தச் சூழல் மாறிகளை அமைக்கவும்.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. சரிபார்ப்பு முகவரியை அங்கீகரிக்கப்படாத முகவரியாக அமைக்க `cast` ஐப் பயன்படுத்தவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` ஒரு தோல்வியைப் புகாரளிப்பது மட்டுமல்லாமல், உலாவியில் உள்ள விளையாட்டில் **MUD Dev Tools** ஐத் திறந்து, **Tables** ஐக் கிளிக் செய்து, **app\_\_VerifierAddress** ஐத் தேர்ந்தெடுக்கலாம். முகவரி பூஜ்ஜியமாக இல்லை என்பதைக் காண்க.

3. சரிபார்ப்பு முகவரியை சேவையகத்தின் முகவரியாக அமைக்கவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** இல் உள்ள முகவரி இப்போது பூஜ்ஜியமாக இருக்க வேண்டும்.

ஒரே `System` இல் உள்ள அனைத்து MUD செயல்பாடுகளும் ஒரே அணுகல் கட்டுப்பாடு வழியாகச் செல்கின்றன, எனவே இந்தச் சோதனை போதுமானது என்று நான் கருதுகிறேன். இல்லையென்றால், [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) இல் உள்ள மற்ற செயல்பாடுகளை நீங்கள் சரிபார்க்கலாம்.

### பூஜ்ஜிய-அறிவு துஷ்பிரயோகங்கள் {#zero-knowledge-abuses}

Zokrates ஐச் சரிபார்க்கும் கணக்கு இந்தப் பயிற்சியின் நோக்கத்திற்கு அப்பாற்பட்டது (மற்றும் எனது திறன்களுக்கு அப்பாற்பட்டது). இருப்பினும், பூஜ்ஜிய-அறிவு குறியீடு சரியாகச் செய்யப்படாவிட்டால் அது தோல்வியடையும் என்பதைச் சரிபார்க்க நாம் பல்வேறு சோதனைகளை இயக்கலாம். இந்த சோதனைகள் அனைத்திற்கும் நாம் [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ஐ மாற்றி, முழுச் செயலியையும் மறுதொடக்கம் செய்ய வேண்டும். சேவையகச் செயல்முறையை மறுதொடக்கம் செய்வது போதுமானதல்ல, ஏனெனில் இது செயலியை ஒரு சாத்தியமற்ற நிலையில் வைக்கிறது (வீரருக்கு ஒரு விளையாட்டு செயலில் உள்ளது, ஆனால் அந்த விளையாட்டு இனி சேவையகத்திற்குக் கிடைக்காது).

#### தவறான பதில் {#wrong-answer}

பூஜ்ஜிய-அறிவுச் சான்றில் தவறான பதிலை வழங்குவதே எளிமையான சாத்தியம். அதைச் செய்ய, நாம் `zkDig` க்குள் சென்று [91 வது வரியை மாற்றியமைக்கிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

சரியான பதிலைப் பொருட்படுத்தாமல், எப்போதும் ஒரு வெடிகுண்டு இருப்பதாக நாங்கள் கூறுவோம் என்பதே இதன் பொருள். இந்த பதிப்பில் விளையாட முயற்சிக்கவும், `pnpm dev` திரையின் **server** தாவலில் இந்தப் பிழையைக் காண்பீர்கள்:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

எனவே இந்த வகையான ஏமாற்றுதல் தோல்வியடைகிறது.

#### தவறான ஆதாரம் {#wrong-proof}

சரியான தகவலை வழங்கினால் என்ன நடக்கும், ஆனால் தவறான ஆதார தரவைக் கொண்டிருந்தால்? இப்போது, 91 வது வரியை இதனுடன் மாற்றவும்:

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

அது இன்னும் தோல்வியடைகிறது, ஆனால் இப்போது அது சரிபார்ப்பவர் அழைப்பின் போது நடப்பதால் காரணம் இல்லாமல் தோல்வியடைகிறது.

### ஒரு பயனர் பூஜ்ஜிய நம்பிக்கை குறியீட்டை எவ்வாறு சரிபார்க்க முடியும்? {#user-verify-zero-trust}

ஸ்மார்ட் ஒப்பந்தங்களைச் சரிபார்ப்பது ஒப்பீட்டளவில் எளிதானது. வழக்கமாக, உருவாக்குநர் மூலக் குறியீட்டை ஒரு பிளாக்செயின் எக்ஸ்புளோரரில் வெளியிடுகிறார், மேலும் அந்த பிளாக்செயின் எக்ஸ்புளோரர் மூலக் குறியீடு [ஒப்பந்தப் பயன்படுத்தல் பரிவர்த்தனையில்](/developers/docs/smart-contracts/deploying/) உள்ள குறியீட்டிற்குத் தொகுக்கப்படுகிறதா என்பதைச் சரிபார்க்கிறது. MUD `System`s விஷயத்தில் இது [சற்று சிக்கலானது](https://mud.dev/cli/verify), ஆனால் அதிகமாக இல்லை.

இது பூஜ்ஜிய-அறிவுடன் கடினமானது. சரிபார்ப்பவர் சில மாறிலிகளை உள்ளடக்கி அவற்றில் சில கணக்கீடுகளை இயக்குகிறார். என்ன நிரூபிக்கப்படுகிறது என்பதை இது உங்களுக்குச் சொல்லாது.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

குறைந்தபட்சம் பிளாக்செயின் எக்ஸ்புளோரர்கள் தங்கள் பயனர் இடைமுகங்களில் Zokrates சரிபார்ப்பைச் சேர்க்கும் வரை, தீர்வு என்னவென்றால், செயலி உருவாக்குநர்கள் Zokrates நிரல்களைக் கிடைக்கச் செய்வது, மற்றும் குறைந்தபட்சம் சில பயனர்கள் அவற்றை பொருத்தமான சரிபார்ப்பு திறவுகோலுடன் தாங்களாகவே தொகுப்பது.

அதைச் செய்ய:

1. [Zokrates ஐ நிறுவவும்](https://zokrates.github.io/gettingstarted.html).

2. Zokrates நிரலுடன் `dig.zok` என்ற கோப்பை உருவாக்கவும். கீழே உள்ள குறியீடு நீங்கள் அசல் வரைபட அளவு, 10x5 ஐ வைத்திருப்பதாகக் கருதுகிறது.

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

3. Zokrates குறியீட்டைத் தொகுத்து சரிபார்ப்புத் திறவுகோலை உருவாக்கவும். சரிபார்ப்புத் திறவுகோல் அசல் சேவையகத்தில் பயன்படுத்தப்பட்ட அதே என்ட்ரோபியுடன் உருவாக்கப்பட வேண்டும், [இந்த விஷயத்தில் ஒரு வெற்று சரம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Solidity சரிபார்ப்பவரை நீங்களே உருவாக்கிக் கொண்டு, அது பிளாக்செயினில் உள்ளதைப் போலவே செயல்படுகிறதா என்பதைச் சரிபார்க்கவும் (சேவையகம் ஒரு கருத்தைச் சேர்க்கிறது, ஆனால் அது முக்கியமில்லை).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## வடிவமைப்பு முடிவுகள் {#design}

போதுமான சிக்கலான எந்தவொரு செயலியிலும் பரிவர்த்தனைகள் தேவைப்படும் போட்டி வடிவமைப்பு இலக்குகள் உள்ளன. சில பரிவர்த்தனைகளைப் பார்ப்போம், தற்போதைய தீர்வு ஏன் பிற விருப்பங்களை விட விரும்பத்தக்கது.

### ஏன் பூஜ்ஜிய-அறிவு {#why-zero-knowledge}

மைன்ஸ்வீப்பருக்கு உங்களுக்கு உண்மையில் பூஜ்ஜிய-அறிவு தேவையில்லை. சேவையகம் எப்போதும் வரைபடத்தை வைத்திருக்க முடியும், பின்னர் விளையாட்டு முடிந்ததும் அனைத்தையும் வெளிப்படுத்தலாம். பின்னர், விளையாட்டின் முடிவில், ஸ்மார்ட் ஒப்பந்தம் வரைபட ஹாஷைக் கணக்கிட்டு, அது பொருந்துகிறதா என்பதைச் சரிபார்க்கலாம், மேலும் அது பொருந்தவில்லை என்றால் சேவையகத்திற்குத் தண்டனை விதிக்கலாம் அல்லது விளையாட்டை முழுவதுமாகப் புறக்கணிக்கலாம்.

நான் இந்த எளிமையான தீர்வைப் பயன்படுத்தவில்லை, ஏனெனில் இது ஒரு வரையறுக்கப்பட்ட இறுதி நிலையுடன் கூடிய குறுகிய விளையாட்டுகளுக்கு மட்டுமே வேலை செய்யும். ஒரு விளையாட்டு சாத்தியமான எல்லையற்றதாக இருக்கும்போது ([தன்னாட்சி உலகங்களின்](https://0xparc.org/blog/autonomous-worlds) விஷயத்தைப் போல), நிலையை வெளிப்படுத்தாமல் நிரூபிக்கும் ஒரு தீர்வு உங்களுக்குத் தேவை.

ஒரு பயிற்சியாக இந்தக் கட்டுரைக்கு எளிதில் புரிந்துகொள்ளக்கூடிய ஒரு குறுகிய விளையாட்டு தேவைப்பட்டது, ஆனால் இந்த நுட்பம் நீண்ட விளையாட்டுகளுக்கு மிகவும் பயனுள்ளதாக இருக்கும்.

### ஏன் Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) மட்டுமே கிடைக்கும் பூஜ்ஜிய-அறிவு நூலகம் அல்ல, ஆனால் இது ஒரு சாதாரண, [கட்டாய](https://en.wikipedia.org/wiki/Imperative_programming) நிரலாக்க மொழியைப் போன்றது மற்றும் பூலியன் மாறிகளை ஆதரிக்கிறது.

உங்கள் செயலிக்கு, வெவ்வேறு தேவைகளுடன், நீங்கள் [Circum](https://docs.circom.io/getting-started/installation/) அல்லது [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) ஐப் பயன்படுத்த விரும்பலாம்.

### Zokrates-ஐ எப்போது தொகுப்பது {#when-compile-zokrates}

இந்த நிரலில் நாம் Zokrates நிரல்களை [சேவையகம் தொடங்கும் ஒவ்வொரு முறையும் தொகுக்கிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). இது தெளிவாக வளங்களின் வீணடிப்பு, ஆனால் இது ஒரு பயிற்சி, எளிமைக்காக மேம்படுத்தப்பட்டுள்ளது.

நான் ஒரு உற்பத்தி-நிலைச் செயலியை எழுதுகிறேன் என்றால், இந்த கண்ணிவெடிப் புலம் அளவில் தொகுக்கப்பட்ட Zokrates நிரல்களுடன் ஒரு கோப்பு இருக்கிறதா என்று சரிபார்ப்பேன், அப்படியிருந்தால் அதைப் பயன்படுத்துவேன். ஆன்செயினில் ஒரு சரிபார்ப்பு ஒப்பந்தத்தைப் பயன்படுத்துவதற்கும் இதுவே உண்மை.

### சரிபார்ப்பவர் மற்றும் சரிபார்ப்பவர் திறவுகோல்களை உருவாக்குதல் {#key-creation}

[திறவுகோல் உருவாக்கம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) என்பது ஒரு கொடுக்கப்பட்ட கண்ணிவெடிப் புலம் அளவிற்கு ஒரு முறைக்கு மேல் செய்யத் தேவையில்லாத மற்றொரு தூய்மையான கணக்கீடு. மீண்டும், எளிமைக்காக மட்டுமே அது ஒரு முறை செய்யப்படுகிறது.

கூடுதலாக, நாம் [ஒரு அமைவு விழாவைப்](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம். ஒரு அமைவு விழாவின் நன்மை என்னவென்றால், பூஜ்ஜிய-அறிவுச் சான்றில் ஏமாற்ற ஒவ்வொரு பங்கேற்பாளரிடமிருந்தும் என்ட்ரோபி அல்லது சில இடைநிலை முடிவுகள் தேவை. குறைந்தபட்சம் ஒரு விழா பங்கேற்பாளர் நேர்மையாக இருந்து அந்தத் தகவலை நீக்கினால், பூஜ்ஜிய-அறிவுச் சான்றுகள் சில தாக்குதல்களிலிருந்து பாதுகாப்பாக இருக்கும். இருப்பினும், தகவல் எல்லா இடங்களிலிருந்தும் நீக்கப்பட்டுள்ளது என்பதைச் சரிபார்க்க _எந்த வழிமுறையும் இல்லை_. பூஜ்ஜிய-அறிவுச் சான்றுகள் மிகவும் முக்கியமானதாக இருந்தால், நீங்கள் அமைவு விழாவில் பங்கேற்க விரும்புகிறீர்கள்.

இங்கே நாம் [டவ்வின் நிரந்தர சக்திகளை](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) நம்பியுள்ளோம், இதில் டஜன் கணக்கான பங்கேற்பாளர்கள் இருந்தனர். இது அநேகமாகப் போதுமான அளவு பாதுகாப்பானது, மற்றும் மிகவும் எளிமையானது. திறவுகோல் உருவாக்கத்தின் போது நாம் என்ட்ரோபியைச் சேர்ப்பதில்லை, இது பயனர்கள் [#user-verify-zero-trust பூஜ்ஜிய-அறிவு உள்ளமைவைச் சரிபார்ப்பதை](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) எளிதாக்குகிறது.

### எங்கே சரிபார்ப்பது {#where-verification}

நாம் பூஜ்ஜிய-அறிவுச் சான்றுகளை ஆன்செயினில் (இதற்கு எரிவாயு செலவாகும்) அல்லது கிளையன்டில் ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) ஐப் பயன்படுத்தி) சரிபார்க்கலாம். நான் முதல் ஒன்றைத் தேர்ந்தெடுத்தேன், ஏனென்றால் இது ஒரு முறை [சரிபார்ப்பவரைச் சரிபார்க்க](#user-verify-zero-trust) உதவுகிறது, பின்னர் அதற்கான ஒப்பந்த முகவரி ஒரே மாதிரியாக இருக்கும் வரை அது மாறாது என்று நம்பலாம். சரிபார்ப்பு கிளையன்டில் செய்யப்பட்டால், நீங்கள் கிளையன்டைப் பதிவிறக்கும் ஒவ்வொரு முறையும் நீங்கள் பெறும் குறியீட்டைச் சரிபார்க்க வேண்டும்.

மேலும், இந்த விளையாட்டு ஒற்றை வீரர் என்றாலும், நிறைய பிளாக்செயின் விளையாட்டுகள் பல-வீரர் கொண்டவை. ஆன்செயின் சரிபார்ப்பு என்பது நீங்கள் பூஜ்ஜிய-அறிவுச் சான்றை ஒரு முறை மட்டுமே சரிபார்க்க வேண்டும். அதை கிளையன்டில் செய்வது ஒவ்வொரு கிளையன்டும் சுயாதீனமாகச் சரிபார்க்க வேண்டும்.

### வரைபடத்தை TypeScript அல்லது Zokrates இல் தட்டையாக்குவதா? {#where-flatten}

பொதுவாக, செயலாக்கம் TypeScript அல்லது Zokrates இல் செய்யப்படலாம் என்றால், அதை TypeScript இல் செய்வது நல்லது, இது மிகவும் வேகமானது, மற்றும் பூஜ்ஜிய-அறிவுச் சான்றுகள் தேவையில்லை. உதாரணமாக, நாம் Zokrates க்கு ஹாஷை வழங்கி, அது சரியானது என்பதை சரிபார்க்கச் சொல்லாததற்குக் காரணம் இதுதான். ஹாஷிங் Zokrates க்குள் செய்யப்பட வேண்டும், ஆனால் திருப்பப்பட்ட ஹாஷிற்கும் ஆன்செயினில் உள்ள ஹாஷிற்கும் இடையேயான பொருத்தம் அதற்கு வெளியே நடக்கலாம்.

இருப்பினும், நாம் TypeScript இல் செய்திருக்கக்கூடிய போது, [வரைபடத்தை Zokrates இல் தட்டையாக்குகிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20). காரணம், மற்ற விருப்பங்கள், என் கருத்தில், மோசமானவை.

- Zokrates குறியீட்டிற்கு பூலியனின் ஒரு பரிமாண வரிசையை வழங்கவும், மற்றும் இரு பரிமாண வரைபடத்தைப் பெற `x*(height+2)
  +y` போன்ற ஒரு வெளிப்பாட்டைப் பயன்படுத்தவும். இது [குறியீட்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) சற்றே சிக்கலாக்கும், எனவே செயல்திறன் ஆதாயம் ஒரு பயிற்சிக்கு மதிப்பு இல்லை என்று முடிவு செய்தேன்.

- Zokrates க்கு ஒரு பரிமாண வரிசை மற்றும் இரு பரிமாண வரிசை இரண்டையும் அனுப்பவும். இருப்பினும், இந்த தீர்வு நமக்கு எதையும் பெற்றுத் தராது. Zokrates குறியீடு வழங்கப்படும் ஒரு பரிமாண வரிசை உண்மையில் இரு பரிமாண வரிசையின் சரியான பிரதிநிதித்துவம் என்பதைச் சரிபார்க்க வேண்டும். எனவே எந்த செயல்திறன் ஆதாயமும் இருக்காது.

- Zokrates இல் இரு பரிமாண வரிசையை தட்டையாக்கவும். இதுவே எளிமையான விருப்பம், எனவே நான் அதைத் தேர்ந்தெடுத்தேன்.

### வரைபடங்களை எங்கே சேமிப்பது {#where-store-maps}

இந்தச் செயலியில் [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) என்பது நினைவகத்தில் உள்ள ஒரு மாறி மட்டுமே. அதாவது உங்கள் சேவையகம் செயலிழந்து மறுதொடக்கம் செய்யப்பட வேண்டும் என்றால், அது சேமித்த அனைத்து தகவல்களும் இழக்கப்படும். வீரர்கள் தங்கள் விளையாட்டைத் தொடர முடியாதது மட்டுமல்ல, ஆன்செயின் கூறு அவர்கள் இன்னும் விளையாட்டில் இருப்பதாக நினைப்பதால் ஒரு புதிய விளையாட்டைக் கூட தொடங்க முடியாது.

இது ஒரு உற்பத்தி அமைப்புக்கு தெளிவாக ஒரு மோசமான வடிவமைப்பு, இதில் நீங்கள் இந்தத் தகவலை ஒரு தரவுத்தளத்தில் சேமிப்பீர்கள். நான் இங்கே ஒரு மாறியைப் பயன்படுத்திய ஒரே காரணம், இது ஒரு பயிற்சி மற்றும் எளிமையே முக்கியக் கருத்தாகும்.

## முடிவுரை: எந்த சூழ்நிலைகளில் இது பொருத்தமான நுட்பம்? {#conclusion}

எனவே, ஆன்செயினுக்குச் சொந்தமில்லாத இரகசிய நிலையைச் சேமிக்கும் ஒரு சேவையகத்துடன் ஒரு விளையாட்டை எழுதுவது எப்படி என்று இப்போது உங்களுக்குத் தெரியும். ஆனால் எந்த சந்தர்ப்பங்களில் நீங்கள் அதைச் செய்ய வேண்டும்? இரண்டு முக்கியக் கருத்துக்கள் உள்ளன.

- _நீண்ட காலமாக நடக்கும் விளையாட்டு_: [மேலே குறிப்பிட்டது போல](#why-zero-knowledge), ஒரு குறுகிய விளையாட்டில் நீங்கள் விளையாட்டு முடிந்தவுடன் நிலையை வெளியிட்டு அனைத்தையும் சரிபார்த்துக் கொள்ளலாம். ஆனால் விளையாட்டு நீண்ட அல்லது காலவரையற்ற நேரத்தை எடுக்கும்போது, மற்றும் நிலை ரகசியமாக இருக்க வேண்டியிருக்கும்போது இது ஒரு விருப்பம் அல்ல.

- _சில மையப்படுத்தல் ஏற்கத்தக்கது_: பூஜ்ஜிய-அறிவுச் சான்றுகள் ஒரு நிறுவனம் முடிவுகளைப் போலியாக மாற்றவில்லை என்பதை ஒருமைப்பாட்டைச் சரிபார்க்க முடியும். அவர்கள் செய்ய முடியாதது என்னவென்றால், அந்த நிறுவனம் இன்னும் கிடைக்குமா மற்றும் செய்திகளுக்குப் பதிலளிக்குமா என்பதை உறுதிப்படுத்துவது. கிடைக்கும் தன்மையும் பரவலாக்கப்பட வேண்டிய சூழ்நிலைகளில், பூஜ்ஜிய-அறிவுச் சான்றுகள் போதுமான தீர்வு அல்ல, உங்களுக்கு [பல-தரப்பு கணக்கீடு](https://en.wikipedia.org/wiki/Secure_multi-party_computation) தேவை.

[எனது மேலும் பணிகளை இங்கே பார்க்கவும்](https://cryptodocguy.pro/).

### ஒப்புதல்கள் {#acknowledgements}

- அல்வாரோ அலோன்சோ இந்தக் கட்டுரையின் ஒரு வரைவைப் படித்து Zokrates பற்றிய எனது சில தவறான புரிதல்களைத் தெளிவுபடுத்தினார்.

மீதமுள்ள எந்தப் பிழைகளும் எனது பொறுப்பு.
