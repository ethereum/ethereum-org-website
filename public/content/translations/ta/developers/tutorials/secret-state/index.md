---
title: ரகசிய நிலைக்காக பூஜ்ஜிய-அறிவைப் பயன்படுத்துதல்
description: சங்கிலிசார் விளையாட்டுகள் எந்தவொரு மறைக்கப்பட்ட தகவலையும் வைத்திருக்க முடியாததால் அவை வரம்புக்குட்பட்டவை. இந்த வழிகாட்டியைப் படித்த பிறகு, ஒரு வாசகர் பூஜ்ஜிய-அறிவுச் சான்றுகள் மற்றும் சேவையகக் கூறுகளை இணைத்து, ஒரு ரகசிய நிலை, புறச்சங்கிலி, கூறுடன் சரிபார்க்கக்கூடிய விளையாட்டுகளை உருவாக்க முடியும். இதைச் செய்வதற்கான நுட்பம் ஒரு மைன்ஸ்வீப்பர் (minesweeper) விளையாட்டை உருவாக்குவதன் மூலம் விளக்கப்படும்.
author: ஓரி பொமரன்ட்ஸ்
tags:
  - சேவையகம்
  - புறச்சங்கிலி
  - மையப்படுத்தப்பட்ட
  - பூஜ்ஜிய-அறிவு
  - Zokrates
  - MUD
  - தனியுரிமை
skill: advanced
breadcrumb: ZK ரகசிய நிலை
lang: ta
published: 2025-03-15
---

_தொகுதிச்சங்கிலியில் எந்த ரகசியங்களும் இல்லை_. தொகுதிச்சங்கிலியில் பதிவிடப்படும் அனைத்தும் அனைவரும் படிக்கும் வகையில் திறந்திருக்கும். இது அவசியமானது, ஏனெனில் தொகுதிச்சங்கிலி என்பது எவரும் அதைச் சரிபார்க்க முடியும் என்பதை அடிப்படையாகக் கொண்டது. இருப்பினும், விளையாட்டுகள் பெரும்பாலும் ரகசிய நிலையை (secret state) நம்பியுள்ளன. எடுத்துக்காட்டாக, நீங்கள் ஒரு தொகுதி ஆராய்விக்குச் சென்று வரைபடத்தைப் பார்க்க முடிந்தால், [மைன்ஸ்வீப்பர் (minesweeper)](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) விளையாட்டுக்கு எந்த அர்த்தமும் இருக்காது.

ரகசிய நிலையை வைத்திருக்க ஒரு [சேவையகக் கூறினைப் (server component)](/developers/tutorials/server-components/) பயன்படுத்துவதே எளிமையான தீர்வாகும். இருப்பினும், விளையாட்டு உருவாக்குநரால் ஏமாற்றப்படுவதைத் தடுக்கவே நாம் தொகுதிச்சங்கிலியைப் பயன்படுத்துகிறோம். சேவையகக் கூறின் நேர்மையை நாம் உறுதி செய்ய வேண்டும். சேவையகம் நிலையின் ஒரு ஹாஷை வழங்க முடியும், மேலும் ஒரு நகர்வின் முடிவைக் கணக்கிடப் பயன்படுத்தப்படும் நிலை சரியானது என்பதை நிரூபிக்க [பூஜ்ஜிய-அறிவுச் சான்றுகளைப்](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) பயன்படுத்தலாம்.

இந்தக் கட்டுரையைப் படித்த பிறகு, இந்த வகையான ரகசிய நிலையை வைத்திருக்கும் சேவையகம், நிலையைக் காண்பிப்பதற்கான ஒரு கிளையண்ட் மற்றும் இவை இரண்டிற்கும் இடையேயான தகவல்தொடர்புக்கான ஒரு சங்கிலிசார் கூறு ஆகியவற்றை எவ்வாறு உருவாக்குவது என்பதை நீங்கள் அறிந்துகொள்வீர்கள். நாம் பயன்படுத்தும் முக்கிய கருவிகள்:

| கருவி | நோக்கம் | சரிபார்க்கப்பட்ட பதிப்பு |
| --- | --- | ---: |
| [Zokrates](https://zokrates.github.io/) | பூஜ்ஜிய-அறிவுச் சான்றுகள் மற்றும் அவற்றின் சரிபார்ப்பு | 1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | சேவையகம் மற்றும் கிளையண்ட் இரண்டிற்குமான நிரலாக்க மொழி | 5.4.2 |
| [Node](https://nodejs.org/en) | சேவையகத்தை இயக்குதல் | 20.18.2 |
| [Viem](https://viem.sh/) | தொகுதிச்சங்கிலியுடனான தகவல்தொடர்பு | 2.9.20 |
| [MUD](https://mud.dev/) | சங்கிலிசார் தரவு மேலாண்மை | 2.0.12 |
| [React](https://react.dev/) | கிளையண்ட் பயனர் இடைமுகம் | 18.2.0 |
| [Vite](https://vitejs.dev/) | கிளையண்ட் குறியீட்டை வழங்குதல் | 4.2.1 |

## Minesweeper எடுத்துக்காட்டு {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) என்பது கண்ணிவெடி நிரம்பிய ஒரு ரகசிய வரைபடத்தை உள்ளடக்கிய ஒரு விளையாட்டாகும். வீரர் ஒரு குறிப்பிட்ட இடத்தில் தோண்டத் தேர்ந்தெடுக்கிறார். அந்த இடத்தில் கண்ணிவெடி இருந்தால், விளையாட்டு முடிந்துவிடும். இல்லையெனில், அந்த இடத்தைச் சுற்றியுள்ள எட்டு சதுரங்களில் உள்ள கண்ணிவெடிகளின் எண்ணிக்கையை வீரர் பெறுவார்.

இந்தப் பயன்பாடு [MUD](https://mud.dev/) ஐப் பயன்படுத்தி எழுதப்பட்டுள்ளது, இது [திறவுகோல்-மதிப்பு தரவுத்தளத்தைப் (key-value database)](https://aws.amazon.com/nosql/key-value/) பயன்படுத்தி தரவைச் சங்கிலிசார் (onchain) சேமிக்கவும், அந்தத் தரவைப் புறச்சங்கிலி (offchain) கூறுகளுடன் தானாகவே ஒத்திசைக்கவும் அனுமதிக்கும் ஒரு கட்டமைப்பாகும். ஒத்திசைவுக்கு கூடுதலாக, அணுகல் கட்டுப்பாட்டை வழங்குவதையும், பிற பயனர்கள் நமது பயன்பாட்டை அனுமதியின்றி [நீட்டிப்பதையும்](https://mud.dev/guides/extending-a-world) MUD எளிதாக்குகிறது.

### Minesweeper எடுத்துக்காட்டை இயக்குதல் {#running-minesweeper-example}

Minesweeper எடுத்துக்காட்டை இயக்க:

1. நீங்கள் [முன்தேவைகளை நிறுவியுள்ளீர்கள்](https://mud.dev/quickstart#prerequisites) என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), மற்றும் [`mprocs`](https://github.com/pvolok/mprocs).

2. களஞ்சியத்தை (repository) குளோன் செய்யவும்.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. தொகுப்புகளை (packages) நிறுவவும்.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Foundry ஆனது `pnpm install` இன் ஒரு பகுதியாக நிறுவப்பட்டிருந்தால், நீங்கள் கட்டளை வரி ஷெல்லை (command-line shell) மறுதொடக்கம் செய்ய வேண்டும்.

4. ஒப்பந்தங்களை (contracts) தொகுக்கவும் (compile)

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. நிரலைத் தொடங்கவும் (ஒரு [anvil](https://book.getfoundry.sh/anvil/) தொகுதிச்சங்கிலி உட்பட) மற்றும் காத்திருக்கவும்.

   ```sh copy
   mprocs
   ```

   தொடங்குவதற்கு நீண்ட நேரம் எடுக்கும் என்பதை நினைவில் கொள்ளவும். முன்னேற்றத்தைக் காண, முதலில் கீழ் அம்புக்குறியைப் பயன்படுத்தி _contracts_ தாவலுக்குச் சென்று MUD ஒப்பந்தங்கள் நிலைநிறுத்தப்படுவதைப் பார்க்கவும். _Waiting for file changes…_ என்ற செய்தியைப் பெறும்போது, ஒப்பந்தங்கள் நிலைநிறுத்தப்பட்டுவிட்டன, மேலும் அடுத்தகட்ட முன்னேற்றம் _server_ தாவலில் நடக்கும். அங்கு, _Verifier address: 0x...._ என்ற செய்தியைப் பெறும் வரை காத்திருக்கவும்.

   இந்த படி வெற்றிகரமாக முடிந்தால், நீங்கள் `mprocs` திரையைப் பார்ப்பீர்கள், இடதுபுறத்தில் வெவ்வேறு செயல்முறைகளும் வலதுபுறத்தில் தற்போது தேர்ந்தெடுக்கப்பட்ட செயல்முறைக்கான கன்சோல் வெளியீடும் இருக்கும்.

   ![The mprocs screen](./mprocs.png)

   `mprocs` இல் ஏதேனும் சிக்கல் இருந்தால், நீங்கள் நான்கு செயல்முறைகளையும் கைமுறையாக இயக்கலாம், ஒவ்வொன்றையும் அதற்கென தனி கட்டளை வரி சாளரத்தில் இயக்கலாம்:

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

6. இப்போது நீங்கள் [கிளையண்டிற்கு (client)](http://localhost:3000) உலாவலாம், **New Game** என்பதைக் கிளிக் செய்து, விளையாடத் தொடங்கலாம்.

### அட்டவணைகள் {#tables}

நமக்குச் சங்கிலிசார் (onchain) [பல அட்டவணைகள்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) தேவை.

- `Configuration`: இந்த அட்டவணை ஒரு ஒற்றையன் (singleton), இதற்குத் திறவுகோல் இல்லை மற்றும் ஒரே ஒரு பதிவு மட்டுமே உள்ளது. இது விளையாட்டு உள்ளமைவுத் தகவலை வைத்திருக்கப் பயன்படுகிறது:
  - `height`: கண்ணிவெடிப் பகுதியின் உயரம்
  - `width`: கண்ணிவெடிப் பகுதியின் அகலம்
  - `numberOfBombs`: ஒவ்வொரு கண்ணிவெடிப் பகுதியிலும் உள்ள வெடிகுண்டுகளின் எண்ணிக்கை
- `VerifierAddress`: இந்த அட்டவணையும் ஒரு ஒற்றையன் (singleton) ஆகும். இது உள்ளமைவின் ஒரு பகுதியான சரிபார்ப்பி (verifier) ஒப்பந்தத்தின் முகவரியை (`verifier`) வைத்திருக்கப் பயன்படுகிறது. இந்தத் தகவலை நாம் `Configuration` அட்டவணையில் வைத்திருக்கலாம், ஆனால் இது சேவையகம் (server) என்ற வேறுபட்ட கூறால் அமைக்கப்படுவதால், இதை ஒரு தனி அட்டவணையில் வைப்பது எளிது.

- `PlayerGame`: திறவுகோல் என்பது வீரரின் முகவரியாகும். தரவு பின்வருமாறு:

  - `gameId`: வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் (விளையாட்டு அடையாளங்காட்டி) ஆக இருக்கும் 32-பைட் மதிப்பு.
  - `win`: வீரர் விளையாட்டில் வெற்றி பெற்றாரா என்பதைக் குறிக்கும் பூலியன் (boolean).
  - `lose`: வீரர் விளையாட்டில் தோற்றாரா என்பதைக் குறிக்கும் பூலியன்.
  - `digNumber`: விளையாட்டில் வெற்றிகரமாகத் தோண்டப்பட்டவைகளின் எண்ணிக்கை.

- `GamePlayer`: இந்த அட்டவணை `gameId` இலிருந்து வீரரின் முகவரிக்குத் தலைகீழ் மேப்பிங்கை (reverse mapping) வைத்திருக்கிறது.

- `Map`: திறவுகோல் என்பது மூன்று மதிப்புகளின் டியூப்பிள் (tuple) ஆகும்:

  - `gameId`: வீரர் விளையாடும் வரைபடத்தின் ஹாஷ் (விளையாட்டு அடையாளங்காட்டி) ஆக இருக்கும் 32-பைட் மதிப்பு.
  - `x` ஆயத்தொலைவு (coordinate)
  - `y` ஆயத்தொலைவு

  மதிப்பு என்பது ஒரு ஒற்றை எண்ணாகும். வெடிகுண்டு கண்டறியப்பட்டால் அது 255 ஆக இருக்கும். இல்லையெனில், அது அந்த இடத்தைச் சுற்றியுள்ள வெடிகுண்டுகளின் எண்ணிக்கை கூட்டல் ஒன்று ஆகும். நாம் வெடிகுண்டுகளின் எண்ணிக்கையை மட்டும் பயன்படுத்த முடியாது, ஏனெனில் இயல்பாகவே EVM இல் உள்ள அனைத்து சேமிப்பகங்களும் மற்றும் MUD இல் உள்ள அனைத்து வரிசை மதிப்புகளும் பூஜ்ஜியமாக இருக்கும். "வீரர் இன்னும் இங்கே தோண்டவில்லை" என்பதற்கும் "வீரர் இங்கே தோண்டினார், சுற்றிலும் பூஜ்ஜிய வெடிகுண்டுகள் இருப்பதைக் கண்டறிந்தார்" என்பதற்கும் இடையே உள்ள வேறுபாட்டை நாம் அறிய வேண்டும்.

கூடுதலாக, கிளையண்டிற்கும் சேவையகத்திற்கும் இடையிலான தொடர்பு சங்கிலிசார் (onchain) கூறு மூலம் நிகழ்கிறது. இதுவும் அட்டவணைகளைப் பயன்படுத்திச் செயல்படுத்தப்படுகிறது.

- `PendingGame`: புதிய விளையாட்டைத் தொடங்குவதற்கான சேவை செய்யப்படாத கோரிக்கைகள்.
- `PendingDig`: ஒரு குறிப்பிட்ட விளையாட்டில் ஒரு குறிப்பிட்ட இடத்தில் தோண்டுவதற்கான சேவை செய்யப்படாத கோரிக்கைகள். இது ஒரு [புறச்சங்கிலி (offchain) அட்டவணை](https://mud.dev/store/tables#types-of-tables) ஆகும், அதாவது இது EVM சேமிப்பகத்தில் எழுதப்படாது, நிகழ்வுகளைப் (events) பயன்படுத்திப் புறச்சங்கிலியில் மட்டுமே படிக்க முடியும்.

### செயலாக்கம் மற்றும் தரவு ஓட்டங்கள் {#execution-data-flows}

இந்த ஓட்டங்கள் கிளையண்ட், சங்கிலிசார் கூறு மற்றும் சேவையகம் ஆகியவற்றுக்கு இடையேயான செயலாக்கத்தை ஒருங்கிணைக்கின்றன.

#### துவக்கம் {#initialization-flow}

நீங்கள் `mprocs` ஐ இயக்கும்போது, இந்தப் படிகள் நிகழ்கின்றன:

1. [`mprocs`](https://github.com/pvolok/mprocs) நான்கு கூறுகளை இயக்குகிறது:

   - [Anvil](https://book.getfoundry.sh/anvil/), இது ஒரு உள்ளூர் தொகுதிச்சங்கிலியை இயக்குகிறது
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), இது MUD க்கான ஒப்பந்தங்களைத் தொகுத்து (தேவைப்பட்டால்) நிலைநிறுத்துகிறது
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), இது இணைய உலாவிகளுக்கு UI மற்றும் கிளையண்ட் குறியீட்டை வழங்க [Vite](https://vitejs.dev/) ஐ இயக்குகிறது.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), இது சேவையகச் செயல்களைச் செய்கிறது

2. `contracts` தொகுப்பு MUD ஒப்பந்தங்களை நிலைநிறுத்துகிறது, பின்னர் [`PostDeploy.s.sol` ஸ்கிரிப்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) இயக்குகிறது. இந்த ஸ்கிரிப்ட் உள்ளமைவை அமைக்கிறது. GitHub இலிருந்து வரும் குறியீடு [எட்டு கண்ணிவெடிகளைக் கொண்ட 10x5 கண்ணிவெடிப் பகுதியைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) குறிப்பிடுகிறது.

3. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) [MUD ஐ அமைப்பதன்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) மூலம் தொடங்குகிறது. மற்றவற்றுடன், இது தரவு ஒத்திசைவைச் செயல்படுத்துகிறது, இதனால் தொடர்புடைய அட்டவணைகளின் நகல் சேவையகத்தின் நினைவகத்தில் இருக்கும்.

4. [`Configuration` அட்டவணை மாறும்போது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) செயல்படுத்தப்பட வேண்டிய ஒரு செயற்கூற்றைச் சேவையகம் சந்தா செய்கிறது. `PostDeploy.s.sol` செயல்படுத்தப்பட்டு அட்டவணையை மாற்றியமைத்த பிறகு [இந்தச் செயற்கூறு](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) அழைக்கப்படுகிறது.

5. சேவையகத் துவக்கச் செயற்கூறு உள்ளமைவைக் கொண்டிருக்கும்போது, [சேவையகத்தின் பூஜ்ஜிய-அறிவுப் பகுதியைத்](#using-zokrates-from-typescript) துவக்க [அது `zkFunctions` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). உள்ளமைவைப் பெறும் வரை இது நடக்க முடியாது, ஏனெனில் பூஜ்ஜிய-அறிவுச் செயற்கூறுகள் கண்ணிவெடிப் பகுதியின் அகலம் மற்றும் உயரத்தை மாறிலிகளாகக் கொண்டிருக்க வேண்டும்.

6. சேவையகத்தின் பூஜ்ஜிய-அறிவுப் பகுதி துவக்கப்பட்ட பிறகு, அடுத்த படியாக [பூஜ்ஜிய-அறிவுச் சரிபார்ப்பு ஒப்பந்தத்தைத் தொகுதிச்சங்கிலியில் நிலைநிறுத்துவது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) மற்றும் MUD இல் சரிபார்க்கப்படுபவரின் முகவரியை அமைப்பது ஆகும்.

7. இறுதியாக, புதுப்பிப்புகளுக்கு நாங்கள் சந்தா செய்கிறோம், எனவே ஒரு வீரர் [புதிய விளையாட்டைத் தொடங்க](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) அல்லது [ஏற்கனவே உள்ள விளையாட்டில் தோண்டக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) கோரும்போது நாங்கள் பார்ப்போம்.

#### புதிய விளையாட்டு {#new-game-flow}

வீரர் புதிய விளையாட்டைக் கோரும்போது இதுதான் நடக்கும்.

1. இந்த வீரருக்கு எந்த விளையாட்டும் நடைபெறவில்லை என்றால், அல்லது ஒன்று இருந்து அதன் gameId பூஜ்ஜியமாக இருந்தால், கிளையண்ட் ஒரு [புதிய விளையாட்டுப் பொத்தானைக்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) காண்பிக்கும். பயனர் இந்தப் பொத்தானை அழுத்தும்போது, [React `newGame` செயற்கூற்றை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) என்பது ஒரு `System` அழைப்பாகும். MUD இல் அனைத்து அழைப்புகளும் `World` ஒப்பந்தத்தின் மூலம் அனுப்பப்படுகின்றன, மேலும் பெரும்பாலான சந்தர்ப்பங்களில் நீங்கள் `<namespace>__<function name>` ஐ அழைப்பீர்கள். இந்த நிலையில், அழைப்பு `app__newGame` க்குச் செல்கிறது, பின்னர் MUD அதை [`GameSystem` இல் உள்ள `newGame` க்கு](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) அனுப்புகிறது.

3. சங்கிலிசார் செயற்கூறு வீரருக்கு எந்த விளையாட்டும் நடைபெறவில்லை என்பதைச் சரிபார்க்கிறது, அப்படி எதுவும் இல்லை என்றால் [கோரிக்கையை `PendingGame` அட்டவணையில் சேர்க்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. சேவையகம் `PendingGame` இல் உள்ள மாற்றத்தைக் கண்டறிந்து [சந்தா செய்யப்பட்ட செயற்கூற்றை இயக்குகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). இந்தச் செயற்கூறு [`newGame` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), இது [`createGame` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. `createGame` செய்யும் முதல் விஷயம், [பொருத்தமான எண்ணிக்கையிலான கண்ணிவெடிகளுடன் ஒரு சீரற்ற வரைபடத்தை உருவாக்குவதாகும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). பின்னர், Zokrates க்குத் தேவையான வெற்று எல்லைகளுடன் ஒரு வரைபடத்தை உருவாக்க அது [`makeMapBorders` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166). இறுதியாக, விளையாட்டு ஐடியாகப் பயன்படுத்தப்படும் வரைபடத்தின் ஹாஷைப் பெற, `createGame` ஆனது [`calculateMapHash` ஐ அழைக்கிறது](#calculatemaphash).

6. `newGame` செயற்கூறு புதிய விளையாட்டை `gamesInProgress` இல் சேர்க்கிறது.

7. சேவையகம் செய்யும் கடைசி விஷயம், சங்கிலிசார் (onchain) உள்ள [`app__newGameResponse` ஐ அழைப்பதாகும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43). அணுகல் கட்டுப்பாட்டைச் செயல்படுத்த, இந்தச் செயற்கூறு வேறுபட்ட `System` ஆன [`ServerSystem` இல் உள்ளது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). அணுகல் கட்டுப்பாடு [MUD உள்ளமைவுக் கோப்பான](https://mud.dev/config) [`mud.config.ts` இல்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) வரையறுக்கப்பட்டுள்ளது.

   அணுகல் பட்டியல் ஒரு முகவரியை மட்டுமே `System` ஐ அழைக்க அனுமதிக்கிறது. இது சேவையகச் செயற்கூறுகளுக்கான அணுகலை ஒரு முகவரிக்கு மட்டுமே கட்டுப்படுத்துகிறது, எனவே யாரும் சேவையகத்தைப் போல ஆள்மாறாட்டம் செய்ய முடியாது.

8. சங்கிலிசார் கூறு தொடர்புடைய அட்டவணைகளைப் புதுப்பிக்கிறது:

   - `PlayerGame` இல் விளையாட்டை உருவாக்குகிறது.
   - `GamePlayer` இல் தலைகீழ் மேப்பிங்கை அமைக்கிறது.
   - `PendingGame` இலிருந்து கோரிக்கையை நீக்குகிறது.

9. சேவையகம் `PendingGame` இல் உள்ள மாற்றத்தை அடையாளம் காட்டுகிறது, ஆனால் [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) தவறானது (false) என்பதால் எதுவும் செய்யாது.

10. கிளையண்டில் [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) ஆனது வீரரின் முகவரிக்கான `PlayerGame` உள்ளீட்டிற்கு அமைக்கப்பட்டுள்ளது. `PlayerGame` மாறும்போது, `gameRecord` உம் மாறுகிறது.

11. `gameRecord` இல் ஒரு மதிப்பு இருந்தால், மற்றும் விளையாட்டில் வெற்றி பெறவோ அல்லது தோற்கவோ இல்லை என்றால், கிளையண்ட் [வரைபடத்தைக் காண்பிக்கும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### தோண்டுதல் {#dig-flow}

1. வீரர் [வரைபட கலத்தின் பொத்தானைக் கிளிக் செய்கிறார்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), இது [`dig` செயற்கூற்றை அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). இந்தச் செயற்கூறு [சங்கிலிசார் (onchain) உள்ள `dig` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. சங்கிலிசார் கூறு [பல அடிப்படைச் சரிபார்ப்புகளைச் செய்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), அது வெற்றிகரமாக இருந்தால் தோண்டுவதற்கான கோரிக்கையை [`PendingDig` இல் சேர்க்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. சேவையகம் [`PendingDig` இல் உள்ள மாற்றத்தைக் கண்டறிகிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [அது செல்லுபடியாகும் என்றால்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), முடிவு மற்றும் அது செல்லுபடியாகும் என்பதற்கான சான்று ஆகிய இரண்டையும் உருவாக்க அது [பூஜ்ஜிய-அறிவுக் குறியீட்டை அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (கீழே விளக்கப்பட்டுள்ளது).

4. [சேவையகம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) சங்கிலிசார் உள்ள [`digResponse` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64).

5. `digResponse` இரண்டு விஷயங்களைச் செய்கிறது. முதலில், இது [பூஜ்ஜிய-அறிவுச் சான்றைச்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) சரிபார்க்கிறது. பின்னர், சான்று சரியாக இருந்தால், முடிவைச் செயலாக்க அது [`processDigResult` ஐ அழைக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86).

6. `processDigResult` விளையாட்டில் [தோல்வியடைந்ததா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) அல்லது [வெற்றி பெற்றதா](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) என்பதைச் சரிபார்த்து, [சங்கிலிசார் வரைபடமான `Map` ஐப் புதுப்பிக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. கிளையண்ட் தானாகவே புதுப்பிப்புகளை எடுத்துக்கொண்டு [வீரருக்குக் காட்டப்படும் வரைபடத்தைப் புதுப்பிக்கிறது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), மேலும் பொருந்தினால் அது வெற்றியா அல்லது தோல்வியா என்பதை வீரருக்குத் தெரிவிக்கிறது.

## Zokrates பயன்படுத்துதல் {#using-zokrates}

மேலே விளக்கப்பட்ட ஓட்டங்களில், பூஜ்ய-அறிவுப் பகுதிகளை ஒரு கருப்புப் பெட்டியாகக் கருதி அவற்றைத் தவிர்த்துவிட்டோம். இப்போது அதைத் திறந்து அந்தக் குறியீடு எவ்வாறு எழுதப்பட்டுள்ளது என்பதைப் பார்ப்போம்.

### வரைபடத்தை ஹாஷ் செய்தல் {#hashing-map}

நாம் பயன்படுத்தும் Zokrates ஹாஷ் செயற்கூறான [Poseidon](https://www.poseidon-hash.info)-ஐச் செயல்படுத்த [இந்த JavaScript குறியீட்டைப்](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) பயன்படுத்தலாம். இருப்பினும், இது வேகமாக இருந்தாலும், Zokrates ஹாஷ் செயற்கூறைப் பயன்படுத்துவதை விட இது மிகவும் சிக்கலானதாக இருக்கும். இது ஒரு பயிற்சி, எனவே குறியீடு எளிமைக்காக உகந்ததாக்கப்பட்டுள்ளது, செயல்திறனுக்காக அல்ல. எனவே, நமக்கு இரண்டு வெவ்வேறு Zokrates நிரல்கள் தேவை, ஒன்று வரைபடத்தின் ஹாஷைக் கணக்கிட (`hash`) மற்றும் மற்றொன்று வரைபடத்தில் ஒரு இடத்தில் தோண்டியதன் முடிவின் பூஜ்ஜிய-அறிவுச் சான்றை உருவாக்க (`dig`).

### ஹாஷ் செயற்கூறு {#hash-function}

இது வரைபடத்தின் ஹாஷைக் கணக்கிடும் செயற்கூறு ஆகும். இந்தக் குறியீட்டை வரியாகப் பார்ப்போம்.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

இந்த இரண்டு வரிகளும் [Zokrates நிலையான நிரலகத்திலிருந்து](https://zokrates.github.io/toolbox/stdlib.html) இரண்டு செயற்கூறுகளை இறக்குமதி செய்கின்றன. [முதல் செயற்கூறு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ஒரு [Poseidon ஹாஷ்](https://www.poseidon-hash.info/) ஆகும். இது [`field` கூறுகளின்](https://zokrates.github.io/language/types.html#field) வரிசையை எடுத்து ஒரு `field`-ஐ வழங்குகிறது.

Zokrates-இல் உள்ள புலம் (field) கூறு பொதுவாக 256 பிட்களுக்கும் குறைவான நீளம் கொண்டது, ஆனால் மிகக் குறைவானது அல்ல. குறியீட்டை எளிமையாக்க, வரைபடத்தை 512 பிட்கள் வரை கட்டுப்படுத்துகிறோம், மேலும் நான்கு புலங்களின் வரிசையை ஹாஷ் செய்கிறோம், ஒவ்வொரு புலத்திலும் 128 பிட்களை மட்டுமே பயன்படுத்துகிறோம். [`pack128` செயற்கூறு](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) இந்த நோக்கத்திற்காக 128 பிட்களின் வரிசையை ஒரு `field` ஆக மாற்றுகிறது.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

இந்த வரி ஒரு செயற்கூறு வரையறையைத் தொடங்குகிறது. `hashMap` ஆனது `map` எனப்படும் ஒற்றை அளவுருவைப் பெறுகிறது, இது இரு பரிமாண `bool`(ean) வரிசையாகும். [கீழே விளக்கப்பட்டுள்ள](#why-map-border) காரணங்களுக்காக வரைபடத்தின் அளவு `width+2` மற்றும் `height+2` ஆக உள்ளது.

Zokrates நிரல்கள் இந்தப் பயன்பாட்டில் [வார்ப்புரு சரங்களாக (template strings)](https://www.w3schools.com/js/js_string_templates.asp) சேமிக்கப்பட்டுள்ளதால், நாம் `${width+2}` மற்றும் `${height+2}` ஆகியவற்றைப் பயன்படுத்தலாம். `${` மற்றும் `}` ஆகியவற்றுக்கு இடையேயான குறியீடு JavaScript மூலம் மதிப்பிடப்படுகிறது, மேலும் இந்த வழியில் நிரலை வெவ்வேறு வரைபட அளவுகளுக்குப் பயன்படுத்தலாம். வரைபட அளவுருவானது எந்த வெடிகுண்டுகளும் இல்லாமல் அதைச் சுற்றி ஒரு இட அகல எல்லையைக் கொண்டுள்ளது, இதனால்தான் அகலம் மற்றும் உயரத்துடன் இரண்டைச் சேர்க்க வேண்டும்.

திரும்பப் பெறும் மதிப்பு ஹாஷைக் கொண்ட ஒரு `field` ஆகும்.

```
bool[512] mut map1d = [false; 512];
```

வரைபடம் இரு பரிமாணமானது. இருப்பினும், `pack128` செயற்கூறு இரு பரிமாண வரிசைகளுடன் இயங்காது. எனவே முதலில் `map1d`-ஐப் பயன்படுத்தி வரைபடத்தை 512-பைட் வரிசையாகத் தட்டையாக்குகிறோம். இயல்பாக Zokrates மாறிகள் மாறிலிகளாகும், ஆனால் ஒரு சுழற்சியில் (loop) இந்த வரிசைக்கு மதிப்புகளை ஒதுக்க வேண்டும், எனவே இதை [`mut`](https://zokrates.github.io/language/variables.html#mutability) என வரையறுக்கிறோம்.

Zokrates-இல் `undefined` இல்லாததால் வரிசையைத் துவக்க வேண்டும். `[false; 512]` என்ற கோவை [512 `false` மதிப்புகளின் வரிசையைக்](https://zokrates.github.io/language/types.html#declaration-and-initialization) குறிக்கிறது.

```
u32 mut counter = 0;
```

நாம் ஏற்கனவே `map1d`-இல் நிரப்பிய பிட்களையும் நிரப்பாத பிட்களையும் வேறுபடுத்துவதற்கு ஒரு கவுண்டரும் தேவை.

```
for u32 x in 0..${width+2} {
```

Zokrates-இல் ஒரு [`for` சுழற்சியை](https://zokrates.github.io/language/control_flow.html#for-loops) இப்படித்தான் அறிவிக்க வேண்டும். ஒரு Zokrates `for` சுழற்சி நிலையான வரம்புகளைக் கொண்டிருக்க வேண்டும், ஏனெனில் இது ஒரு சுழற்சியாகத் தோன்றினாலும், கம்பைலர் உண்மையில் அதை "சுருளவிழ்க்கிறது" (unrolls). `${width+2}` என்ற கோவை ஒரு கம்பைல் நேர மாறிலியாகும், ஏனெனில் கம்பைலரை அழைப்பதற்கு முன்பு TypeScript குறியீட்டால் `width` அமைக்கப்படுகிறது.

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

`map1d`-இலிருந்து நான்கு `field` மதிப்புகளின் வரிசையை உருவாக்க `pack128` பயன்படுகிறது. Zokrates-இல் `array[a..b]` என்பது `a`-இல் தொடங்கி `b-1`-இல் முடிவடையும் வரிசையின் துண்டைக் குறிக்கிறது.

```
return poseidon(hashMe);
}
```

இந்த வரிசையை ஹாஷாக மாற்ற `poseidon`-ஐப் பயன்படுத்தவும்.

### ஹாஷ் நிரல் {#hash-program}

விளையாட்டு அடையாளங்காட்டிகளை உருவாக்க சேவையகம் நேரடியாக `hashMap`-ஐ அழைக்க வேண்டும். இருப்பினும், Zokrates ஒரு நிரலைத் தொடங்க `main` செயற்கூறை மட்டுமே அழைக்க முடியும், எனவே ஹாஷ் செயற்கூறை அழைக்கும் `main` உடன் ஒரு நிரலை உருவாக்குகிறோம்.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### தோண்டும் நிரல் {#dig-program}

இது பயன்பாட்டின் பூஜ்ஜிய-அறிவுப் பகுதியின் மையமாகும், இங்குதான் தோண்டியதன் முடிவுகளைச் சரிபார்க்கப் பயன்படும் சான்றுகளை உருவாக்குகிறோம்.

```
${hashFragment}

// (x,y) இருப்பிடத்தில் உள்ள கண்ணிவெடிகளின் எண்ணிக்கை
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### வரைபட எல்லை ஏன் தேவை {#why-map-border}

பூஜ்ஜிய-அறிவுச் சான்றுகள் [எண்கணித சுற்றுகளைப் (arithmetic circuits)](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) பயன்படுத்துகின்றன, அவை `if` கூற்றுக்கு எளிதான இணையான ஒன்றைக் கொண்டிருக்கவில்லை. அதற்குப் பதிலாக, அவை [நிபந்தனைச் செயலிக்கு (conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator) இணையான ஒன்றைப் பயன்படுத்துகின்றன. `a` பூஜ்ஜியமாகவோ அல்லது ஒன்றாகவோ இருக்கலாம் என்றால், நீங்கள் `if a { b } else { c }`-ஐ `ab+(1-a)c` ஆகக் கணக்கிடலாம்.

இதன் காரணமாக, ஒரு Zokrates `if` கூற்று எப்போதும் இரண்டு கிளைகளையும் மதிப்பிடுகிறது. எடுத்துக்காட்டாக, உங்களிடம் இந்தக் குறியீடு இருந்தால்:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

அது பிழையை ஏற்படுத்தும், ஏனெனில் அது `arr[10]`-ஐக் கணக்கிட வேண்டும், அந்த மதிப்பு பின்னர் பூஜ்ஜியத்தால் பெருக்கப்பட்டாலும் கூட.

வரைபடத்தைச் சுற்றி ஒரு இட அகல எல்லை நமக்குத் தேவைப்படுவதற்கு இதுவே காரணம். ஒரு இடத்தை சுற்றியுள்ள கண்ணிவெடிகளின் மொத்த எண்ணிக்கையை நாம் கணக்கிட வேண்டும், அதாவது நாம் தோண்டும் இடத்திற்கு மேலே மற்றும் கீழே ஒரு வரிசையிலும், இடது மற்றும் வலதுபுறத்திலும் உள்ள இடத்தைப் பார்க்க வேண்டும். அதாவது Zokrates-க்கு வழங்கப்படும் வரைபட வரிசையில் அந்த இடங்கள் இருக்க வேண்டும்.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

இயல்பாக Zokrates சான்றுகள் அவற்றின் உள்ளீடுகளை உள்ளடக்கியிருக்கும். அது எந்த இடம் என்று உங்களுக்குத் தெரியாவிட்டால், ஒரு இடத்தை சுற்றி ஐந்து கண்ணிவெடிகள் உள்ளன என்பதை அறிவதில் எந்தப் பயனும் இல்லை (மேலும் அதை உங்கள் கோரிக்கையுடன் பொருத்த முடியாது, ஏனென்றால் நிரூபிப்பவர் வெவ்வேறு மதிப்புகளைப் பயன்படுத்தலாம் மற்றும் அதைப் பற்றி உங்களிடம் சொல்லாமல் இருக்கலாம்). இருப்பினும், வரைபடத்தை Zokrates-க்கு வழங்கும்போது, அதை ரகசியமாக வைத்திருக்க வேண்டும். சான்றின் மூலம் வெளிப்படுத்தப்_படாத_ `private` அளவுருவைப் பயன்படுத்துவதே இதற்கான தீர்வாகும்.

இது துஷ்பிரயோகத்திற்கான மற்றொரு வழியைத் திறக்கிறது. நிரூபிப்பவர் சரியான ஆயத்தொலைவுகளைப் பயன்படுத்தலாம், ஆனால் அந்த இடத்தை சுற்றியும், ஒருவேளை அந்த இடத்திலேயே கூட எந்த எண்ணிக்கையிலான கண்ணிவெடிகளையும் கொண்ட ஒரு வரைபடத்தை உருவாக்கலாம். இந்தத் துஷ்பிரயோகத்தைத் தடுக்க, விளையாட்டு அடையாளங்காட்டியான வரைபடத்தின் ஹாஷை பூஜ்ஜிய-அறிவுச் சான்றில் சேர்க்கிறோம்.

```
return (hashMap(map),
```

இங்கு திரும்பப் பெறும் மதிப்பு வரைபட ஹாஷ் வரிசையையும் தோண்டியதன் முடிவையும் உள்ளடக்கிய ஒரு டியூப்பிள் (tuple) ஆகும்.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

அந்த இடத்திலேயே வெடிகுண்டு இருந்தால் 255-ஐ ஒரு சிறப்பு மதிப்பாகப் பயன்படுத்துகிறோம்.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

விளையாடுபவர் கண்ணிவெடியில் சிக்கவில்லை என்றால், அந்த இடத்தை சுற்றியுள்ள பகுதிக்கான கண்ணிவெடி எண்ணிக்கையைச் சேர்த்து அதை வழங்கவும்.

### TypeScript-இலிருந்து Zokrates-ஐப் பயன்படுத்துதல் {#using-zokrates-from-typescript}

Zokrates ஒரு கட்டளை வரி இடைமுகத்தைக் கொண்டுள்ளது, ஆனால் இந்த நிரலில் அதை [TypeScript குறியீட்டில்](https://zokrates.github.io/toolbox/zokrates_js.html) பயன்படுத்துகிறோம்.

Zokrates வரையறைகளைக் கொண்ட நிரலகம் [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) என்று அழைக்கப்படுகிறது.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript பிணைப்புகளை (bindings)](https://zokrates.github.io/toolbox/zokrates_js.html) இறக்குமதி செய்யவும். நமக்கு [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) செயற்கூறு மட்டுமே தேவை, ஏனெனில் இது அனைத்து Zokrates வரையறைகளுக்கும் தீர்வு காணும் ஒரு பிராமிஸை (promise) வழங்குகிறது.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates-ஐப் போலவே, நாமும் ஒரு செயற்கூறை மட்டுமே ஏற்றுமதி செய்கிறோம், அதுவும் [ஒத்திசைவற்றது (asynchronous)](https://www.w3schools.com/js/js_async.asp). அது இறுதியில் திரும்பும்போது, கீழே நாம் காணப்போவது போல பல செயற்கூறுகளை வழங்குகிறது.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates-ஐத் துவக்கி, நிரலகத்திலிருந்து நமக்குத் தேவையான அனைத்தையும் பெறவும்.

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

அடுத்து நாம் மேலே பார்த்த ஹாஷ் செயற்கூறு மற்றும் இரண்டு Zokrates நிரல்கள் உள்ளன.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

இங்கே அந்த நிரல்களைக் கம்பைல் செய்கிறோம்.

```typescript
// பூஜ்ய-அறிவு சரிபார்ப்பிற்கான திறவுகோல்களை உருவாக்கவும்.
// ஒரு தயாரிப்பு அமைப்பில் நீங்கள் ஒரு அமைவு நிகழ்வைப் பயன்படுத்த விரும்பலாம்.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

ஒரு தயாரிப்பு அமைப்பில் நாம் மிகவும் சிக்கலான [அமைப்புச் சடங்கைப் (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம், ஆனால் இது ஒரு செயல்விளக்கத்திற்குப் போதுமானது. பயனர்கள் நிரூபிப்பவர் திறவுகோலை (prover key) அறிய முடியும் என்பது ஒரு பிரச்சனையல்ல - அவை உண்மையாக இல்லாவிட்டால், விஷயங்களை நிரூபிக்க அவர்களால் அதைப் பயன்படுத்த முடியாது. நாம் என்ட்ரோபியைக் குறிப்பிடுவதால் (இரண்டாவது அளவுரு, `""`), முடிவுகள் எப்போதும் ஒரே மாதிரியாகவே இருக்கும்.

**குறிப்பு:** Zokrates நிரல்களின் கம்பைலேஷன் மற்றும் திறவுகோல் உருவாக்கம் ஆகியவை மெதுவான செயல்முறைகளாகும். ஒவ்வொரு முறையும் அவற்றைத் திரும்பத் திரும்பச் செய்ய வேண்டிய அவசியமில்லை, வரைபட அளவு மாறும்போது மட்டும் செய்தால் போதும். ஒரு தயாரிப்பு அமைப்பில் நீங்கள் அவற்றை ஒருமுறை செய்து, பின்னர் வெளியீட்டைச் சேமிப்பீர்கள். எளிமைக்காக மட்டுமே நான் அதை இங்கே செய்யவில்லை.

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) செயற்கூறு உண்மையில் Zokrates நிரலை இயக்குகிறது. இது இரண்டு புலங்களைக் கொண்ட ஒரு கட்டமைப்பை வழங்குகிறது: `output`, இது நிரலின் வெளியீட்டை JSON சரமாகக் கொண்டுள்ளது, மற்றும் `witness`, இது முடிவின் பூஜ்ஜிய-அறிவுச் சான்றை உருவாக்கத் தேவையான தகவலாகும். இங்கே நமக்கு வெளியீடு மட்டுமே தேவை.

வெளியீடு என்பது `"31337"` வடிவத்தில் உள்ள ஒரு சரமாகும், இது மேற்கோள் குறிகளுக்குள் இணைக்கப்பட்ட ஒரு தசம எண்ணாகும். ஆனால் `viem`-க்கு நமக்குத் தேவையான வெளியீடு `0x60A7` வடிவத்தில் உள்ள ஒரு ஹெக்ஸாடெசிமல் எண்ணாகும். எனவே மேற்கோள் குறிகளை அகற்ற `.slice(1,-1)`-ஐப் பயன்படுத்துகிறோம், பின்னர் மீதமுள்ள சரத்தை (இது ஒரு தசம எண்) ஒரு [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) ஆக இயக்க `BigInt`-ஐப் பயன்படுத்துகிறோம். `.toString(16)` இந்த `BigInt`-ஐ ஒரு ஹெக்ஸாடெசிமல் சரமாக மாற்றுகிறது, மேலும் `"0x"+` ஹெக்ஸாடெசிமல் எண்களுக்கான குறியீட்டைச் சேர்க்கிறது.

```typescript
// தோண்டி, முடிவின் பூஜ்ஜிய-அறிவுச் சான்றைத் திருப்பி அனுப்பவும்
// (சேவையகப் பக்க குறியீடு)
```

பூஜ்ஜிய-அறிவுச் சான்று பொது உள்ளீடுகளையும் (`x` மற்றும் `y`) முடிவுகளையும் (வரைபடத்தின் ஹாஷ் மற்றும் வெடிகுண்டுகளின் எண்ணிக்கை) உள்ளடக்கியது.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates-இல் ஒரு குறியீடு வரம்பிற்கு வெளியே உள்ளதா என்பதைச் சரிபார்ப்பது ஒரு பிரச்சனையாகும், எனவே அதை இங்கே செய்கிறோம்.

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

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy)-ஐப் பயன்படுத்தி சான்றை வழங்கவும்.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

ஒரு Solidity சரிபார்ப்பி, இது நாம் தொகுதிச்சங்கிலியில் நிலைநிறுத்தக்கூடிய மற்றும் `digCompiled.program` மூலம் உருவாக்கப்பட்ட சான்றுகளைச் சரிபார்க்கப் பயன்படுத்தக்கூடிய ஒரு திறன் ஒப்பந்தம் ஆகும்.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

இறுதியாக, பிற குறியீடுகளுக்குத் தேவைப்படக்கூடிய அனைத்தையும் வழங்கவும்.

## பாதுகாப்பு சோதனைகள் {#security-tests}

பாதுகாப்பு சோதனைகள் முக்கியமானவை, ஏனெனில் ஒரு செயல்பாட்டுப் பிழை இறுதியில் தன்னை வெளிப்படுத்தும். ஆனால் பயன்பாடு பாதுகாப்பற்றதாக இருந்தால், யாராவது ஏமாற்றி மற்றவர்களுக்குச் சொந்தமான வளங்களை எடுத்துச் செல்வதன் மூலம் அது வெளிப்படும் வரை நீண்ட காலத்திற்கு அது மறைந்திருக்க வாய்ப்புள்ளது.

### அனுமதிகள் {#permissions}

இந்த விளையாட்டில் ஒரு சிறப்புரிமை பெற்ற நிறுவனம் உள்ளது, அது சேவையகம் (server). [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) இல் உள்ள செயற்கூறுகளை அழைக்க அனுமதிக்கப்பட்ட ஒரே பயனர் இது மட்டுமே. அனுமதிக்குட்பட்ட செயற்கூறுகளுக்கான அழைப்புகள் சேவையகக் கணக்காக மட்டுமே அனுமதிக்கப்படுகின்றன என்பதைச் சரிபார்க்க நாம் [`cast`](https://book.getfoundry.sh/cast/) ஐப் பயன்படுத்தலாம்.

[சேவையகத்தின் தனிப்பட்ட திறவுகோல் `setupNetwork.ts` இல் உள்ளது](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (தொகுதிச்சங்கிலி) இயங்கும் கணினியில், இந்தச் சூழல் மாறிகளை (environment variables) அமைக்கவும்.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. சரிபார்ப்பி முகவரியை அங்கீகரிக்கப்படாத முகவரியாக அமைக்க முயற்சிக்க `cast` ஐப் பயன்படுத்தவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` ஒரு தோல்வியைப் புகாரளிப்பது மட்டுமல்லாமல், உலாவியில் விளையாட்டில் **MUD Dev Tools** ஐத் திறந்து, **Tables** என்பதைக் கிளிக் செய்து, **app\_\_VerifierAddress** என்பதைத் தேர்ந்தெடுக்கலாம். முகவரி பூஜ்ஜியமாக இல்லை என்பதைப் பார்க்கவும்.

3. சரிபார்ப்பி முகவரியைச் சேவையகத்தின் முகவரியாக அமைக்கவும்.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** இல் உள்ள முகவரி இப்போது பூஜ்ஜியமாக இருக்க வேண்டும்.

அதே `System` இல் உள்ள அனைத்து MUD செயற்கூறுகளும் ஒரே அணுகல் கட்டுப்பாட்டின் (access control) வழியாகச் செல்கின்றன, எனவே இந்தச் சோதனை போதுமானது என்று நான் கருதுகிறேன். நீங்கள் அவ்வாறு கருதவில்லை என்றால், [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) இல் உள்ள பிற செயற்கூறுகளைச் சரிபார்க்கலாம்.

### பூஜ்ய-அறிவு துஷ்பிரயோகங்கள் {#zero-knowledge-abuses}

Zokrates ஐச் சரிபார்க்கும் கணிதம் இந்தப் பயிற்சியின் (மற்றும் எனது திறன்களின்) எல்லைக்கு அப்பாற்பட்டது. இருப்பினும், பூஜ்ய-அறிவு குறியீடு சரியாகச் செய்யப்படாவிட்டால் அது தோல்வியடைகிறதா என்பதைச் சரிபார்க்க நாம் பல்வேறு சோதனைகளை இயக்கலாம். இந்தச் சோதனைகள் அனைத்தும் நாம் [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) ஐ மாற்றி முழுப் பயன்பாட்டையும் மறுதொடக்கம் செய்யக் கோரும். சேவையகச் செயல்முறையை மறுதொடக்கம் செய்வது மட்டும் போதாது, ஏனெனில் இது பயன்பாட்டைச் சாத்தியமற்ற நிலையில் வைக்கிறது (விளையாடுபவர் ஒரு விளையாட்டைத் தொடர்கிறார், ஆனால் அந்த விளையாட்டு இனி சேவையகத்திற்குக் கிடைக்காது).

#### தவறான பதில் {#wrong-answer}

பூஜ்ஜிய-அறிவுச் சான்றில் தவறான பதிலை வழங்குவதே எளிமையான சாத்தியமாகும். அதைச் செய்ய, நாம் `zkDig` க்குள் சென்று [வரி 91 ஐ மாற்றியமைக்கிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

இதன் பொருள், சரியான பதில் எதுவாக இருந்தாலும், ஒரு வெடிகுண்டு இருப்பதாக நாம் எப்போதும் உரிமைக்கோருவோம். இந்தப் பதிப்பில் விளையாட முயற்சிக்கவும், `pnpm dev` திரையின் **server** தாவலில் இந்தப் பிழையை நீங்கள் காண்பீர்கள்:

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

நாம் சரியான தகவலை வழங்கி, ஆனால் தவறான சான்றுத் தரவை மட்டும் கொண்டிருந்தால் என்ன நடக்கும்? இப்போது, வரி 91 ஐ இதனுடன் மாற்றவும்:

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

அது இன்னும் தோல்வியடைகிறது, ஆனால் இப்போது அது காரணமின்றித் தோல்வியடைகிறது, ஏனெனில் இது சரிபார்ப்பி அழைப்பின் போது நிகழ்கிறது.

### பூஜ்ஜிய நம்பிக்கை குறியீட்டை ஒரு பயனர் எவ்வாறு சரிபார்க்க முடியும்? {#user-verify-zero-trust}

திறன் ஒப்பந்தங்களைச் சரிபார்ப்பது ஒப்பீட்டளவில் எளிதானது. பொதுவாக, உருவாக்குநர் மூலக் குறியீட்டை ஒரு தொகுதி ஆராய்வியில் வெளியிடுகிறார், மேலும் மூலக் குறியீடு [ஒப்பந்த நிலைநிறுத்தப் பரிவர்த்தனையில்](/developers/docs/smart-contracts/deploying/) உள்ள குறியீட்டிற்குத் தொகுக்கப்படுகிறதா என்பதைத் தொகுதி ஆராய்வி சரிபார்க்கிறது. MUD `System` களின் விஷயத்தில் இது [சற்றுச் சிக்கலானது](https://mud.dev/cli/verify), ஆனால் அவ்வளவு இல்லை.

பூஜ்ய-அறிவுடன் இது கடினமானது. சரிபார்ப்பி சில மாறிலிகளை உள்ளடக்கியது மற்றும் அவற்றில் சில கணக்கீடுகளை இயக்குகிறது. என்ன நிரூபிக்கப்படுகிறது என்பதை இது உங்களுக்குச் சொல்லாது.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

தொகுதி ஆராய்விகள் தங்கள் பயனர் இடைமுகங்களில் Zokrates சரிபார்ப்பைச் சேர்க்கும் வரையிலாவது, பயன்பாட்டு உருவாக்குநர்கள் Zokrates நிரல்களைக் கிடைக்கச் செய்வதும், குறைந்தபட்சம் சில பயனர்கள் பொருத்தமான சரிபார்ப்புத் திறவுகோலுடன் அவற்றைத் தாங்களே தொகுப்பதும் இதற்கான தீர்வாகும்.

அவ்வாறு செய்ய:

1. [Zokrates ஐ நிறுவவும்](https://zokrates.github.io/gettingstarted.html).
2. Zokrates நிரலுடன் `dig.zok` என்ற கோப்பை உருவாக்கவும். நீங்கள் அசல் வரைபட அளவான 10x5 ஐ வைத்திருக்கிறீர்கள் என்று கீழேயுள்ள குறியீடு கருதுகிறது.

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

3. Zokrates குறியீட்டைத் தொகுத்துச் சரிபார்ப்புத் திறவுகோலை உருவாக்கவும். அசல் சேவையகத்தில் பயன்படுத்தப்பட்ட அதே என்ட்ரோபியுடன் சரிபார்ப்புத் திறவுகோல் உருவாக்கப்பட வேண்டும், [இந்த விஷயத்தில் ஒரு வெற்றுச் சரம் (empty string)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Solidity சரிபார்ப்பியை நீங்களே உருவாக்கி, அது தொகுதிச்சங்கிலியில் உள்ளதைப் போலவே செயல்பாட்டு ரீதியாக ஒத்திருக்கிறதா என்பதைச் சரிபார்க்கவும் (சேவையகம் ஒரு கருத்தைச் சேர்க்கிறது, ஆனால் அது முக்கியமல்ல).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## வடிவமைப்பு முடிவுகள் {#design}

போதுமான அளவு சிக்கலான எந்தவொரு பயன்பாட்டிலும், ஒன்றுக்கொன்று போட்டியிடும் வடிவமைப்பு இலக்குகள் இருக்கும், அவற்றுக்குச் சில சமரசங்கள் (trade-offs) தேவைப்படும். சில சமரசங்களையும், மற்ற விருப்பங்களை விட தற்போதைய தீர்வு ஏன் விரும்பத்தக்கது என்பதையும் பார்ப்போம்.

### ஏன் பூஜ்ய-அறிவு {#why-zero-knowledge}

மைன்ஸ்வீப்பருக்கு (minesweeper) உங்களுக்கு உண்மையில் பூஜ்ய-அறிவு தேவையில்லை. சேவையகம் (server) எப்போதும் வரைபடத்தை வைத்திருக்க முடியும், பின்னர் விளையாட்டு முடிந்ததும் அதை முழுமையாக வெளிப்படுத்தலாம். பின்னர், விளையாட்டின் முடிவில், திறன் ஒப்பந்தம் வரைபட ஹாஷைக் கணக்கிட்டு, அது பொருந்துகிறதா என்பதைச் சரிபார்க்கலாம், மேலும் அது பொருந்தவில்லை என்றால் சேவையகத்திற்கு அபராதம் விதிக்கலாம் அல்லது விளையாட்டை முற்றிலுமாகப் புறக்கணிக்கலாம்.

நான் இந்த எளிய தீர்வைப் பயன்படுத்தவில்லை, ஏனெனில் இது நன்கு வரையறுக்கப்பட்ட இறுதி நிலையைக் கொண்ட குறுகிய விளையாட்டுகளுக்கு மட்டுமே வேலை செய்யும். ஒரு விளையாட்டு முடிவற்றதாக இருக்கும்போது ([தன்னாட்சி உலகங்கள்](https://0xparc.org/blog/autonomous-worlds) போன்ற சந்தர்ப்பங்களில்), நிலையை வெளிப்படுத்தாமல் _நிரூபிக்கும்_ ஒரு தீர்வு உங்களுக்குத் தேவை.

ஒரு பயிற்சியாக இந்தக் கட்டுரைக்குப் புரிந்துகொள்ள எளிதான ஒரு குறுகிய விளையாட்டு தேவைப்பட்டது, ஆனால் இந்த நுட்பம் நீண்ட விளையாட்டுகளுக்கு மிகவும் பயனுள்ளதாக இருக்கும்.

### ஏன் Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) மட்டுமே கிடைக்கக்கூடிய ஒரே பூஜ்ய-அறிவு நிரலகம் அல்ல, ஆனால் இது ஒரு சாதாரண, [கட்டளைமுறை (imperative)](https://en.wikipedia.org/wiki/Imperative_programming) நிரலாக்க மொழியைப் போன்றது மற்றும் பூலியன் மாறிகளை ஆதரிக்கிறது.

வெவ்வேறு தேவைகளைக் கொண்ட உங்கள் பயன்பாட்டிற்கு, நீங்கள் [Circum](https://docs.circom.io/getting-started/installation/) அல்லது [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)-ஐப் பயன்படுத்த விரும்பலாம்.

### Zokrates-ஐ எப்போது தொகுக்க (compile) வேண்டும் {#when-compile-zokrates}

இந்த நிரலில் [சேவையகம் தொடங்கும் ஒவ்வொரு முறையும்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates நிரல்களைத் தொகுக்கிறோம். இது தெளிவாக வளங்களை வீணாக்குவதாகும், ஆனால் இது எளிமைக்காக உகந்ததாக்கப்பட்ட ஒரு பயிற்சியாகும்.

நான் ஒரு தயாரிப்பு-நிலை (production-level) பயன்பாட்டை எழுதுகிறேன் என்றால், இந்த மைன்ஃபீல்ட் (minefield) அளவில் தொகுக்கப்பட்ட Zokrates நிரல்களைக் கொண்ட ஒரு கோப்பு என்னிடம் உள்ளதா என்று சரிபார்த்து, அப்படி இருந்தால் அதைப் பயன்படுத்துவேன். சங்கிலிசார் சரிபார்ப்பி ஒப்பந்தத்தை நிலைநிறுத்துவதற்கும் இது பொருந்தும்.

### சரிபார்ப்பி மற்றும் நிரூபிப்பவர் திறவுகோல்களை உருவாக்குதல் {#key-creation}

[திறவுகோல் உருவாக்கம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) என்பது ஒரு குறிப்பிட்ட மைன்ஃபீல்ட் அளவிற்கு ஒரு முறைக்கு மேல் செய்ய வேண்டிய அவசியமில்லாத மற்றொரு தூய்மையான கணக்கீடாகும். மீண்டும், இது எளிமைக்காக ஒரு முறை மட்டுமே செய்யப்படுகிறது.

கூடுதலாக, நாம் [ஒரு அமைவு விழாவைப் (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) பயன்படுத்தலாம். ஒரு அமைவு விழாவின் நன்மை என்னவென்றால், பூஜ்ஜிய-அறிவுச் சான்றில் ஏமாற்ற உங்களுக்கு என்ட்ரோபி அல்லது ஒவ்வொரு பங்கேற்பாளரிடமிருந்தும் சில இடைநிலை முடிவுகள் தேவை. குறைந்தபட்சம் ஒரு விழா பங்கேற்பாளர் நேர்மையாக இருந்து அந்தத் தகவலை நீக்கினால், பூஜ்ஜிய-அறிவுச் சான்றுகள் சில தாக்குதல்களிலிருந்து பாதுகாப்பாக இருக்கும். இருப்பினும், எல்லா இடங்களிலிருந்தும் தகவல் நீக்கப்பட்டுள்ளதா என்பதைச் சரிபார்க்க _எந்த வழிமுறையும் இல்லை_. பூஜ்ஜிய-அறிவுச் சான்றுகள் மிகவும் முக்கியமானதாக இருந்தால், நீங்கள் அமைவு விழாவில் பங்கேற்க விரும்புவீர்கள்.

இங்கே நாம் [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)-ஐ நம்பியுள்ளோம், இதில் டஜன் கணக்கான பங்கேற்பாளர்கள் இருந்தனர். இது போதுமான அளவு பாதுகாப்பானது மற்றும் மிகவும் எளிமையானது. திறவுகோல் உருவாக்கத்தின் போது நாங்கள் என்ட்ரோபியைச் சேர்க்கவில்லை, இது பயனர்கள் [பூஜ்ய-அறிவு உள்ளமைவைச் சரிபார்ப்பதை](#user-verify-zero-trust) எளிதாக்குகிறது.

### எங்கே சரிபார்க்க வேண்டும் {#where-verification}

நாம் பூஜ்ஜிய-அறிவுச் சான்றுகளை சங்கிலிசார் (இதற்கு எரிவாயு செலவாகும்) அல்லது கிளையண்டில் ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)-ஐப் பயன்படுத்தி) சரிபார்க்கலாம். நான் முதலாவதைத் தேர்ந்தெடுத்தேன், ஏனென்றால் இது [சரிபார்ப்பியைச் சரிபார்க்க](#user-verify-zero-trust) உங்களை அனுமதிக்கிறது, பின்னர் அதற்கான ஒப்பந்த முகவரி மாறாமல் இருக்கும் வரை அது மாறாது என்று நம்பலாம். கிளையண்டில் சரிபார்ப்பு செய்யப்பட்டால், ஒவ்வொரு முறையும் நீங்கள் கிளையண்டைப் பதிவிறக்கும் போது பெறும் குறியீட்டைச் சரிபார்க்க வேண்டும்.

மேலும், இந்த விளையாட்டு ஒற்றை வீரர் (single player) விளையாட்டாக இருந்தாலும், பல தொகுதிச்சங்கிலி விளையாட்டுகள் பல வீரர்களைக் (multi-player) கொண்டவை. சங்கிலிசார் சரிபார்ப்பு என்பது நீங்கள் பூஜ்ஜிய-அறிவுச் சான்றை ஒரு முறை மட்டுமே சரிபார்க்கிறீர்கள் என்பதாகும். இதை கிளையண்டில் செய்வது ஒவ்வொரு கிளையண்டும் சுயாதீனமாகச் சரிபார்க்க வேண்டியிருக்கும்.

### வரைபடத்தை TypeScript அல்லது Zokrates-இல் தட்டையாக்க (Flatten) வேண்டுமா? {#where-flatten}

பொதுவாக, செயலாக்கத்தை TypeScript அல்லது Zokrates-இல் செய்ய முடியும் என்றால், அதை TypeScript-இல் செய்வது நல்லது, இது மிகவும் வேகமானது மற்றும் பூஜ்ஜிய-அறிவுச் சான்றுகள் தேவையில்லை. எடுத்துக்காட்டாக, நாங்கள் Zokrates-க்கு ஹாஷை வழங்கி அது சரியானதா என்பதைச் சரிபார்க்கச் செய்யாததற்கு இதுவே காரணம். ஹாஷ் செய்தல் Zokrates-க்கு உள்ளே செய்யப்பட வேண்டும், ஆனால் திரும்பப் பெறப்பட்ட ஹாஷுக்கும் சங்கிலிசார் ஹாஷுக்கும் இடையிலான பொருத்தம் அதற்கு வெளியே நடக்கலாம்.

இருப்பினும், நாங்கள் இன்னும் [Zokrates-இல் வரைபடத்தைத் தட்டையாக்குகிறோம்](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), அதேசமயம் நாங்கள் அதை TypeScript-இல் செய்திருக்கலாம். இதற்குக் காரணம், மற்ற விருப்பங்கள், என் கருத்துப்படி, மோசமானவை.

- Zokrates குறியீட்டிற்கு பூலியனின் ஒரு பரிமாண வரிசையை (one dimensional array) வழங்கவும், மேலும் இரு பரிமாண வரைபடத்தைப் பெற `x*(height+2)
+y` போன்ற கோவையைப் பயன்படுத்தவும். இது [குறியீட்டை](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) சற்று சிக்கலாக்கும், எனவே ஒரு பயிற்சிக்கான செயல்திறன் ஆதாயம் இதற்குத் தகுதியற்றது என்று நான் முடிவு செய்தேன்.

- Zokrates-க்கு ஒரு பரிமாண வரிசை மற்றும் இரு பரிமாண வரிசை இரண்டையும் அனுப்பவும். இருப்பினும், இந்தத் தீர்வு நமக்கு எதையும் பெற்றுத் தராது. Zokrates குறியீடு, அதற்கு வழங்கப்பட்ட ஒரு பரிமாண வரிசை உண்மையில் இரு பரிமாண வரிசையின் சரியான பிரதிநிதித்துவமா என்பதைச் சரிபார்க்க வேண்டும். எனவே எந்தச் செயல்திறன் ஆதாயமும் இருக்காது.

- Zokrates-இல் இரு பரிமாண வரிசையைத் தட்டையாக்குங்கள். இது மிகவும் எளிமையான விருப்பமாகும், எனவே நான் இதைத் தேர்ந்தெடுத்தேன்.

### வரைபடங்களை எங்கே சேமிப்பது {#where-store-maps}

இந்தப் பயன்பாட்டில் [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) என்பது நினைவகத்தில் உள்ள ஒரு மாறியாகும் (variable). இதன் பொருள், உங்கள் சேவையகம் செயலிழந்து மறுதொடக்கம் செய்யப்பட வேண்டும் என்றால், அது சேமித்து வைத்திருந்த அனைத்துத் தகவல்களும் இழக்கப்படும். வீரர்கள் தங்கள் விளையாட்டைத் தொடர முடியாது என்பது மட்டுமல்லாமல், அவர்களால் ஒரு புதிய விளையாட்டைக் கூடத் தொடங்க முடியாது, ஏனெனில் சங்கிலிசார் கூறு அவர்கள் இன்னும் ஒரு விளையாட்டை விளையாடிக் கொண்டிருப்பதாக நினைக்கிறது.

இது ஒரு தயாரிப்பு அமைப்புக்கு (production system) தெளிவாக மோசமான வடிவமைப்பாகும், இதில் நீங்கள் இந்தத் தகவலை ஒரு தரவுத்தளத்தில் சேமிப்பீர்கள். நான் இங்கே ஒரு மாறியைப் பயன்படுத்தியதற்கான ஒரே காரணம், இது ஒரு பயிற்சி மற்றும் எளிமையே முக்கியக் கருத்தாகும்.

## முடிவுரை: எந்த சூழ்நிலைகளில் இது பொருத்தமான நுட்பமாக இருக்கும்? {#conclusion}

எனவே, சங்கிலிசார் (onchain) அல்லாத ரகசிய நிலையைச் சேமிக்கும் சேவையகத்துடன் ஒரு விளையாட்டை எவ்வாறு எழுதுவது என்பது இப்போது உங்களுக்குத் தெரியும். ஆனால் எந்த சந்தர்ப்பங்களில் நீங்கள் இதைச் செய்ய வேண்டும்? இதில் இரண்டு முக்கியக் கருத்தில்கொள்ள வேண்டிய விஷயங்கள் உள்ளன.

- _நீண்ட நேரம் நடக்கும் விளையாட்டு_: [மேலே குறிப்பிட்டுள்ளபடி](#why-zero-knowledge), ஒரு குறுகிய விளையாட்டில், விளையாட்டு முடிந்தவுடன் நீங்கள் நிலையை வெளியிட்டு எல்லாவற்றையும் சரிபார்க்கலாம். ஆனால் விளையாட்டு நீண்ட அல்லது காலவரையற்ற நேரத்தை எடுக்கும்போது, நிலை ரகசியமாக இருக்க வேண்டியிருக்கும் போது அது ஒரு விருப்பமாக இருக்காது.

- _சில மையப்படுத்தல் ஏற்றுக்கொள்ளத்தக்கது_: ஒரு நிறுவனம் முடிவுகளைப் போலியாக உருவாக்கவில்லை என்பதை, அதாவது ஒருமைப்பாட்டைப் பூஜ்ஜிய-அறிவுச் சான்றுகளால் சரிபார்க்க முடியும். ஆனால் அந்த நிறுவனம் தொடர்ந்து கிடைக்கும் மற்றும் செய்திகளுக்குப் பதிலளிக்கும் என்பதை அவற்றால் உறுதிப்படுத்த முடியாது. கிடைக்கும் தன்மையும் பரவலாக்கப்பட வேண்டிய சூழ்நிலைகளில், பூஜ்ஜிய-அறிவுச் சான்றுகள் போதுமான தீர்வாக இருக்காது, மேலும் உங்களுக்கு [பல-தரப்பு கணக்கீடு](https://en.wikipedia.org/wiki/Secure_multi-party_computation) தேவைப்படும்.

[எனது மேலும் பல பணிகளை இங்கே காணுங்கள்](https://cryptodocguy.pro/).

### நன்றியுரைகள் {#acknowledgements}

- அல்வாரோ அலோன்சோ (Alvaro Alonso) இந்தக் கட்டுரையின் வரைவைப் படித்து, Zokrates பற்றிய எனது சில தவறான புரிதல்களைத் தெளிவுபடுத்தினார்.

மீதமுள்ள ஏதேனும் பிழைகள் இருப்பின் அது எனது பொறுப்பாகும்.