---
title: Kutumia zero-knowledge kwa hali ya siri
description: michezo ya onchain ina mipaka kwa sababu haiwezi kutunza taarifa zozote zilizofichwa. Baada ya kusoma mafunzo haya, msomaji ataweza kuchanganya uthibitisho wa zero-knowledge na vipengele vya seva ili kuunda michezo inayoweza kuthibitishwa na hali ya siri, offchain, na sehemu. Mbinu ya kufanya hivi itaonyeshwa kwa kuunda mchezo wa minesweeper.
author: Ori Pomerantz
tags:
  [
    "seva",
    "offchain",
    "kati",
    "zero-knowledge",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: sw
published: 2025-03-15
---

_Hakuna siri kwenye mnyororo wa bloku_. Kila kitu kinachowekwa kwenye mnyororo wa bloku kiko wazi kwa kila mtu kusoma. Hii ni muhimu, kwa sababu mnyororo wa bloku unategemea mtu yeyote kuweza kuuthibitisha. Hata hivyo, mara nyingi michezo hutegemea hali ya siri. Kwa mfano, mchezo wa [minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) hauna maana kabisa ikiwa unaweza tu kwenda kwenye kichunguzi cha mnyororo wa bloku na kuona ramani.

Suluhisho rahisi zaidi ni kutumia [sehemu ya seva](/developers/tutorials/server-components/) kushikilia hali ya siri. Hata hivyo, sababu tunayotumia mnyororo wa bloku ni kuzuia udanganyifu na msanidi programu wa mchezo. Tunahitaji kuhakikisha uaminifu wa sehemu ya seva. Seva inaweza kutoa hashi ya hali, na kutumia [uthibitisho wa zero-knowledge](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) kuthibitisha kuwa hali iliyotumiwa kuhesabu matokeo ya hatua ndiyo sahihi.

Baada ya kusoma makala hii utajua jinsi ya kuunda aina hii ya seva inayoshikilia hali ya siri, wateja wa kuonyesha hali, na sehemu ya onchain kwa mawasiliano kati ya hizi mbili. Zana kuu tutakazotumia zitakuwa:

| Zana                                          | Madhumuni                                           |             Imethibitishwa kwenye toleo |
| --------------------------------------------- | --------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Uthibitisho wa zero-knowledge na uthibitishaji wake |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Lugha ya programu kwa seva na wateja                |   5.4.2 |
| [Nodi](https://nodejs.org/en)                 | Kuendesha seva                                      | 20.18.2 |
| [Viem](https://viem.sh/)                      | Mawasiliano na Mnyororo wa bloku                    |  2.9.20 |
| [MUD](https://mud.dev/)                       | Usimamizi wa data ya Onchain                        |  2.0.12 |
| [React](https://react.dev/)                   | Kiolesura cha mtumiaji wa Wateja                    |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Kutumikia msimbo wa wateja                          |   4.2.1 |

## Mfano wa Minesweeper {#minesweeper}

[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) ni mchezo unaojumuisha ramani ya siri yenye uwanja wa migodi. Mchezaji anachagua kuchimba katika eneo maalum. Ikiwa eneo hilo lina mgodi, mchezo umeisha. Vinginevyo, mchezaji anapata idadi ya migodi katika viwanja nane vinavyozunguka eneo hilo.

Programu hii imeandikwa kwa kutumia [MUD](https://mud.dev/), mfumo unaoturuhusu kuhifadhi data onchain kwa kutumia [hifadhidata ya ufunguo-thamani](https://aws.amazon.com/nosql/key-value/) na kusawazisha data hiyo kiotomatiki na vipengele vya offchain. Mbali na usawazishaji, MUD hurahisisha kutoa udhibiti wa ufikiaji, na kwa watumiaji wengine [kupanua](https://mud.dev/guides/extending-a-world) programu yetu bila ruhusa.

### Kuendesha mfano wa minesweeper {#running-minesweeper-example}

Ili kuendesha mfano wa minesweeper:

1. Hakikisha [una mahitaji ya awali yaliyowekwa](https://mud.dev/quickstart#prerequisites): [Nodi](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), na [`mprocs`](https://github.com/pvolok/mprocs).

2. Kloni hifadhi.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Sakinisha vifurushi.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Ikiwa Foundry ilisakinishwa kama sehemu ya `pnpm install`, unahitaji kuanzisha upya ganda la mstari wa amri.

4. Kusanya mikataba

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Anzisha programu (pamoja na mnyororo wa bloku wa [anvil](https://book.getfoundry.sh/anvil/)) na subiri.

   ```sh copy
   mprocs
   ```

   Kumbuka kuwa uanzishaji unachukua muda mrefu. Ili kuona maendeleo, kwanza tumia mshale wa chini kusogeza hadi kwenye kichupo cha _contracts_ ili kuona mikataba ya MUD ikisambazwa. Unapopata ujumbe _Waiting for file changes…_, mikataba imesambazwa na maendeleo zaidi yatatokea kwenye kichupo cha _server_. Hapo, unasubiri hadi upate ujumbe _Verifier address: 0x...._.

   Ikiwa hatua hii itafanikiwa, utaona skrini ya `mprocs`, na michakato tofauti upande wa kushoto na matokeo ya console kwa mchakato uliochaguliwa kwa sasa upande wa kulia.

   ![Skrini ya mprocs](./mprocs.png)

   Ikiwa kuna tatizo na `mprocs`, unaweza kuendesha michakato minne kwa mikono, kila mmoja katika dirisha lake la mstari wa amri:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Mikataba**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Seva**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Wateja**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Sasa unaweza kuvinjari kwa [wateja](http://localhost:3000), bonyeza **New Game**, na uanze kucheza.

### Majedwali {#tables}

Tunahitaji [majedwali kadhaa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Jedwali hili ni la pekee, halina ufunguo na rekodi moja tu. Hutumika kushikilia taarifa za usanidi wa mchezo:
  - `height`: Urefu wa uwanja wa migodi
  - `width`: Upana wa uwanja wa migodi
  - `numberOfBombs`: Idadi ya mabomu katika kila uwanja wa migodi

- `VerifierAddress`: Jedwali hili pia ni la pekee. Hutumika kushikilia sehemu moja ya usanidi, anwani ya mkataba wa mthibitishaji (`verifier`). Tungeweza kuweka taarifa hizi kwenye jedwali la `Configuration`, lakini imewekwa na sehemu tofauti, seva, kwa hivyo ni rahisi kuiweka kwenye jedwali tofauti.

- `PlayerGame`: Ufunguo ni anwani ya mchezaji. Data ni:

  - `gameId`: Thamani ya baiti 32 ambayo ni hashi ya ramani ambayo mchezaji anacheza (kitambulisho cha mchezo).
  - `win`: boolean inayoonyesha kama mchezaji alishinda mchezo.
  - `lose`: boolean inayoonyesha kama mchezaji alishindwa mchezo.
  - `digNumber`: idadi ya uchimbaji uliofanikiwa katika mchezo.

- `GamePlayer`: Jedwali hili linashikilia ramani ya kinyume, kutoka `gameId` hadi anwani ya mchezaji.

- `Map`: Ufunguo ni tupo ya thamani tatu:

  - `gameId`: Thamani ya baiti 32 ambayo ni hashi ya ramani ambayo mchezaji anacheza (kitambulisho cha mchezo).
  - kuratibu ya `x`
  - kuratibu ya `y`

  Thamani ni nambari moja. Ni 255 ikiwa bomu liligunduliwa. Vinginevyo, ni idadi ya mabomu karibu na eneo hilo pamoja na moja. Hatuwezi tu kutumia idadi ya mabomu, kwa sababu kwa chaguo-msingi hifadhi zote katika EVM na thamani zote za safu katika MUD ni sifuri. Tunahitaji kutofautisha kati ya "mchezaji bado hajachimba hapa" na "mchezaji alichimba hapa, na akakuta hakuna mabomu karibu".

Kwa kuongeza, mawasiliano kati ya wateja na seva hufanyika kupitia sehemu ya onchain. Hii pia inatekelezwa kwa kutumia majedwali.

- `PendingGame`: Maombi ambayo hayajashughulikiwa ya kuanza mchezo mpya.
- `PendingDig`: Maombi ambayo hayajashughulikiwa ya kuchimba katika eneo maalum katika mchezo maalum. Hili ni [jedwali la offchain](https://mud.dev/store/tables#types-of-tables), ikimaanisha kuwa haliandikwi kwenye ghala la EVM, linasomeka tu offchain kwa kutumia matukio.

### Utekelezaji na mtiririko wa data {#execution-data-flows}

Mtiririko huu unaratibu utekelezaji kati ya wateja, sehemu ya onchain, na seva.

#### Uanzishaji {#initialization-flow}

Unapoendesha `mprocs`, hatua hizi hutokea:

1. [`mprocs`](https://github.com/pvolok/mprocs) inaendesha vipengele vinne:

   - [Anvil](https://book.getfoundry.sh/anvil/), ambayo inaendesha mnyororo wa bloku wa ndani
   - [Mikataba](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), ambayo inakusanya (ikihitajika) na kusambaza mikataba ya MUD
   - [Wateja](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), ambayo inaendesha [Vite](https://vitejs.dev/) ili kuhudumia UI na msimbo wa wateja kwa vivinjari vya wavuti.
   - [Seva](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), ambayo hufanya vitendo vya seva

2. Kifurushi cha `contracts` kinasambaza mikataba ya MUD na kisha kinaendesha [hati ya `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Hati hii inaweka usanidi. Msimbo kutoka github unabainisha [uwanja wa migodi wa 10x5 wenye migodi nane ndani yake](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Seva](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) inaanza kwa [kuweka MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Miongoni mwa mambo mengine, hii inawasha usawazishaji wa data, ili nakala ya majedwali husika iwepo kwenye kumbukumbu ya seva.

4. Seva inasajili kazi ya kutekelezwa [wakati jedwali la `Configuration` linabadilika](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Kazi hii](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) inaitwa baada ya `PostDeploy.s.sol` kutekeleza na kurekebisha jedwali.

5. Wakati kazi ya uanzishaji wa seva inapokuwa na usanidi, [inaita `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) ili kuanzisha [sehemu ya zero-knowledge ya seva](#using-zokrates-from-typescript). Hii haiwezi kutokea hadi tupate usanidi kwa sababu kazi za zero-knowledge lazima ziwe na upana na urefu wa uwanja wa migodi kama viwango vya kudumu.

6. Baada ya sehemu ya zero-knowledge ya seva kuanzishwa, hatua inayofuata ni [kusambaza mkataba wa uthibitishaji wa zero-knowledge kwenye mnyororo wa bloku](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) na kuweka anwani ya mthibitishwa katika MUD.

7. Mwishowe, tunasajili masasisho ili tuone mchezaji anapoomba ama [kuanza mchezo mpya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) au [kuchimba kwenye mchezo uliopo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Mchezo mpya {#new-game-flow}

Hivi ndivyo hutokea mchezaji anapoomba mchezo mpya.

1. Ikiwa hakuna mchezo unaoendelea kwa mchezaji huyu, au kuna mmoja lakini una gameId ya sifuri, wateja wanaonyesha [kitufe cha mchezo mpya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Mtumiaji anapobonyeza kitufe hiki, [React inaendesha kazi ya `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ni wito wa `System`. Katika MUD simu zote zinaelekezwa kupitia mkataba wa `World`, na katika hali nyingi unaita `<namespace>__<function name>`. Katika kesi hii, wito ni kwa `app__newGame`, ambayo MUD kisha inaelekeza kwa [`newGame` katika `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Kazi ya onchain inakagua kwamba mchezaji hana mchezo unaoendelea, na ikiwa hakuna [inaongeza ombi kwenye jedwali la `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Seva inagundua mabadiliko katika `PendingGame` na [inaendesha kazi iliyosajiliwa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Kazi hii inaita [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), ambayo kwa upande wake inaita [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Jambo la kwanza `createGame` hufanya ni [kuunda ramani isiyo ya kawaida na idadi inayofaa ya migodi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Kisha, inaita [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ili kuunda ramani yenye mipaka tupu, ambayo ni muhimu kwa Zokrates. Mwishowe, `createGame` inaita [`calculateMapHash`](#calculateMapHash), ili kupata hashi ya ramani, ambayo hutumiwa kama kitambulisho cha mchezo.

6. Kazi ya `newGame` inaongeza mchezo mpya kwenye `gamesInProgress`.

7. Jambo la mwisho ambalo seva hufanya ni kuita [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), ambayo iko onchain. Kazi hii iko katika `System` tofauti, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), ili kuwezesha udhibiti wa ufikiaji. Udhibiti wa ufikiaji umefafanuliwa katika [faili ya usanidi ya MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Orodha ya ufikiaji inaruhusu anwani moja tu kuita `System`. Hii inazuia ufikiaji wa kazi za seva kwa anwani moja, kwa hivyo hakuna anayeweza kujifanya kuwa seva.

8. Sehemu ya onchain inasasisha majedwali husika:

   - Unda mchezo katika `PlayerGame`.
   - Weka ramani ya kinyume katika `GamePlayer`.
   - Ondoa ombi kutoka `PendingGame`.

9. Seva inatambua mabadiliko katika `PendingGame`, lakini haifanyi chochote kwa sababu [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) ni ya uongo.

10. Kwa upande wa wateja [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) imewekwa kwenye ingizo la `PlayerGame` kwa anwani ya mchezaji. Wakati `PlayerGame` inapobadilika, `gameRecord` pia hubadilika.

11. Ikiwa kuna thamani katika `gameRecord`, na mchezo haujashindwa wala kushindwa, wateja [wanaonyesha ramani](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Chimba {#dig-flow}

1. Mchezaji [anabonyeza kitufe cha seli ya ramani](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), ambayo inaita [kazi ya `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Kazi hii inaita [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Sehemu ya onchain [inafanya ukaguzi kadhaa wa kiakili](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), na ikiwa imefanikiwa inaongeza ombi la kuchimba kwenye [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Seva [inagundua mabadiliko katika `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Ikiwa ni halali](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [inaita msimbo wa zero-knowledge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (imeelezewa hapa chini) ili kutoa matokeo na uthibitisho kwamba ni halali.

4. [Seva](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) inaita [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain.

5. `digResponse` hufanya mambo mawili. Kwanza, inakagua [uthibitisho wa zero knowledge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Kisha, ikiwa uthibitisho umekaguliwa, inaita [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ili kushughulikia matokeo.

6. `processDigResult` inakagua ikiwa mchezo [umeshindwa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) au [umeshinda](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), na [inasasisha `Ramani`, ramani ya onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Mteja huchukua masasisho kiotomatiki na [husasisha ramani inayoonyeshwa kwa mchezaji](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), na inapohitajika humwambia mchezaji ikiwa ameshinda au ameshindwa.

## Kutumia Zokrates {#using-zokrates}

Katika mtiririko ulioelezwa hapo juu tuliruka sehemu za maarifa-sifuri, tukizichukulia kama sanduku jeusi. Sasa tufungue tuone jinsi msimbo huo umeandikwa.

### Kupiga hashi ramani {#hashing-map}

Tunaweza kutumia [msimbo huu wa JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) kutekeleza [Poseidon](https://www.poseidon-hash.info), kazi ya hashi ya Zokrates tunayotumia. Hata hivyo, ingawa hii ingekuwa haraka zaidi, pia ingekuwa ngumu zaidi kuliko kutumia tu kazi ya hashi ya Zokrates kuifanya. Hii ni mafunzo, na kwa hivyo msimbo umeboreshwa kwa urahisi, si kwa utendaji. Kwa hivyo, tunahitaji programu mbili tofauti za Zokrates, moja ya kuhesabu tu hashi ya ramani (`hashi`) na nyingine ya kuunda uthibitisho wa maarifa-sifuri wa matokeo ya kuchimba katika eneo kwenye ramani (`chimba`).

### Kazi ya hashi {#hash-function}

Hii ni kazi inayokokotoa hashi ya ramani. Tutapitia msimbo huu mstari kwa mstari.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Mistari hii miwili inaingiza kazi mbili kutoka kwa [maktaba ya kawaida ya Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Kazi ya kwanza](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ni [hashi ya Poseidon](https://www.poseidon-hash.info/). Inachukua safu ya [`vipengele vya uwanja`](https://zokrates.github.io/language/types.html#field) na kurudisha `uwanja`.

Kipengele cha uwanja katika Zokrates kwa kawaida huwa na urefu usiozidi biti 256, lakini si kwa kiasi kikubwa. Ili kurahisisha msimbo, tunazuia ramani iwe na biti zisizozidi 512, na kupiga hashi safu ya nyanja nne, na katika kila uwanja tunatumia biti 128 tu. [Kazi ya `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) hubadilisha safu ya biti 128 kuwa `uwanja` kwa kusudi hili.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Mstari huu unaanzisha ufafanuzi wa kazi. `hashMap` inapokea kigezo kimoja kiitwacho `map`, safu ya pande mbili ya `bool`(ean). Ukubwa wa ramani ni `width+2` kwa `height+2` kwa sababu ambazo [zimeelezwa hapa chini](#why-map-border).

Tunaweza kutumia `${width+2}` na `${height+2}` kwa sababu programu za Zokrates zimehifadhiwa katika programu hii kama [kamba za kiolezo](https://www.w3schools.com/js/js_string_templates.asp). Msimbo kati ya `${` na `}` unathminiwa na JavaScript, na kwa njia hii programu inaweza kutumika kwa saizi tofauti za ramani. Kigezo cha ramani kina mpaka wa upana wa eneo moja kuzunguka bila mabomu yoyote, ambayo ndiyo sababu tunahitaji kuongeza mbili kwenye upana na urefu.

Thamani ya kurudi ni `uwanja` ambao una hashi.

```
   bool[512] mut map1d = [false; 512];
```

Ramani ni ya pande mbili. Hata hivyo, kazi ya `pack128` haifanyi kazi na safu za pande mbili. Kwa hivyo, kwanza tunalaza ramani kuwa safu ya baiti 512, kwa kutumia `map1d`. Kwa chaguo-msingi vigezo vya Zokrates ni viwango vya kudumu, lakini tunahitaji kugawa thamani kwa safu hii katika kitanzi, kwa hivyo tunakifafanua kama [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Tunahitaji kuanzisha safu kwa sababu Zokrates haina `undefined`. Usemi wa `[false; 512]` unamaanisha [safu ya thamani 512 za `uongo`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Pia tunahitaji kaunta kutofautisha kati ya biti ambazo tayari tumejaza katika `map1d` na zile ambazo hatujajaza.

```
   for u32 x in 0..${width+2} {
```

Hivi ndivyo unavyotangaza [kitanzi cha `kwa`](https://zokrates.github.io/language/control_flow.html#for-loops) katika Zokrates. Kitanzi cha Zokrates `kwa` lazima kiwe na mipaka maalum, kwa sababu ingawa kinaonekana kama kitanzi, mkalimani kwa kweli "huifungua". Usemi `${width+2}` ni kiwango cha kudumu cha wakati wa kukusanya kwa sababu `width` imewekwa na msimbo wa TypeScript kabla ya kuita mkusanyaji.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Kwa kila eneo kwenye ramani, weka thamani hiyo kwenye safu ya `map1d` na uongeze kaunta.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` kuunda safu ya thamani nne za `uwanja` kutoka `map1d`. Katika Zokrates `array[a..b]` inamaanisha kipande cha safu kinachoanzia `a` na kuishia `b-1`.

```
    return poseidon(hashMe);
}
```

Tumia `poseidon` kubadilisha safu hii kuwa hashi.

### Programu ya hashi {#hash-program}

Seva inahitaji kuita `hashMap` moja kwa moja ili kuunda vitambulisho vya mchezo. Hata hivyo, Zokrates inaweza tu kuita kazi ya `main` kwenye programu kuanza, kwa hivyo tunaunda programu yenye `main` inayoita kazi ya hashi.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Programu ya kuchimba {#dig-program}

Hii ndiyo moyo wa sehemu ya maarifa-sifuri ya programu, ambapo tunatoa uthibitisho unaotumika kuthibitisha matokeo ya kuchimba.

```
${hashFragment}

// Idadi ya migodi katika eneo (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Kwa nini mpaka wa ramani {#why-map-border}

Uthibitisho wa maarifa-sifuri hutumia [mizunguko ya kihesabu](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), ambayo haina mbadala rahisi kwa taarifa ya `if`. Badala yake, wanatumia mbadala wa [kiendeshaji chenye masharti](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Ikiwa `a` inaweza kuwa sifuri au moja, unaweza kuhesabu `if a { b } else { c }` kama `ab+(1-a)c`.

Kwa sababu hii, taarifa ya `if` ya Zokrates daima inathmini matawi yote mawili. Kwa mfano, ikiwa una msimbo huu:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Itatoa hitilafu, kwa sababu inahitaji kuhesabu `arr[10]`, ingawa thamani hiyo itazidishwa na sifuri baadaye.

Hii ndiyo sababu tunahitaji mpaka wa upana wa eneo moja kuzunguka ramani. Tunahitaji kuhesabu jumla ya idadi ya migodi karibu na eneo, na hiyo inamaanisha tunahitaji kuona eneo la safu moja juu na chini, kushoto na kulia, kwa eneo tunalochimba. Hiyo inamaanisha maeneo hayo lazima yawepo kwenye safu ya ramani ambayo Zokrates inapewa.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Kwa chaguo-msingi, uthibitisho wa Zokrates unajumuisha pembejeo zao. Haina faida kujua kuna migodi mitano karibu na eneo isipokuwa unajua ni eneo gani (na huwezi tu kuilinganisha na ombi lako, kwa sababu basi mthibitishaji anaweza kutumia thamani tofauti na asikuambie). Hata hivyo, tunahitaji kuweka ramani kuwa siri, huku tukiitoa kwa Zokrates. Suluhisho ni kutumia kigezo cha `private`, ambacho _hakifunuliwi_ na uthibitisho.

Hii inafungua njia nyingine ya matumizi mabaya. Mthibitishaji anaweza kutumia kuratibu sahihi, lakini kuunda ramani yenye idadi yoyote ya migodi karibu na eneo, na labda katika eneo lenyewe. Ili kuzuia matumizi haya mabaya, tunafanya uthibitisho wa maarifa-sifuri ujumuishe hashi ya ramani, ambayo ni kitambulisho cha mchezo.

```
   return (hashMap(map),
```

Thamani ya kurudi hapa ni tuple inayojumuisha safu ya hashi ya ramani pamoja na matokeo ya kuchimba.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Tunatumia 255 kama thamani maalum endapo eneo lenyewe lina bomu.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Ikiwa mchezaji hajagonga mgodi, ongeza hesabu za migodi kwa eneo linalozunguka eneo hilo na urudishe hiyo.

### Kutumia Zokrates kutoka TypeScript {#using-zokrates-from-typescript}

Zokrates ina kiolesura cha mstari wa amri, lakini katika programu hii tunaitumia katika [msimbo wa TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Maktaba yenye ufafanuzi wa Zokrates inaitwa [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Leta [mafungo ya JavaScript ya Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Tunahitaji tu kazi ya [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) kwa sababu inarudisha ahadi inayotatua ufafanuzi wote wa Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Sawa na Zokrates yenyewe, pia tunasafirisha kazi moja tu, ambayo pia ni [isiyosawazisha](https://www.w3schools.com/js/js_async.asp). Inaporudi hatimaye, inatoa kazi kadhaa kama tutakavyoona hapa chini.

```typescript
const zokrates = await zokratesInitialize()
```

Anzisha Zokrates, pata kila kitu tunachohitaji kutoka kwa maktaba.

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

Kisha tuna kazi ya hashi na programu mbili za Zokrates tulizoona hapo juu.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Hapa tunakusanya programu hizo.

```typescript
// Tengeneza funguo za uthibitishaji wa zero-knowledge.\n// Kwenye mfumo wa uzalishaji ungetaka kutumia sherehe ya usanidi.\n// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).\nconst keySetupResults = zokrates.setup(digCompiled.program, \"\")\nconst verifierKey = keySetupResults.vk\nconst proverKey = keySetupResults.pk
```

Kwenye mfumo wa uzalishaji tunaweza kutumia [hafla ya kuanzisha](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ngumu zaidi, lakini hii ni nzuri ya kutosha kwa maonyesho. Sio tatizo watumiaji kujua ufunguo wa mthibitishaji - bado hawawezi kuitumia kuthibitisha mambo isipokuwa ni kweli. Kwa sababu tunabainisha entropy (kigezo cha pili, `""`), matokeo yatakuwa sawa kila wakati.

**Kumbuka:** Uundaji wa programu za Zokrates na uundaji wa ufunguo ni michakato ya polepole. Hakuna haja ya kuzirudia kila wakati, ila tu wakati saizi ya ramani inabadilika. Kwenye mfumo wa uzalishaji ungewafanya mara moja, kisha uhifadhi matokeo. Sababu pekee kwa nini siifanyi hapa ni kwa ajili ya urahisi.

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

Kazi ya [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) inatekeleza programu ya Zokrates. Inarudisha muundo wenye nyanja mbili: `output`, ambayo ni matokeo ya programu kama kamba ya JSON, na `witness`, ambayo ni taarifa inayohitajika kuunda uthibitisho wa maarifa-sifuri wa matokeo. Hapa tunahitaji tu matokeo.

Matokeo ni kamba ya fomu `"31337"`, nambari ya desimali iliyofungwa kwenye alama za nukuu. Lakini matokeo tunayohitaji kwa `viem` ni nambari ya heksadesimali ya fomu `0x60A7`. Kwa hivyo tunatumia `.slice(1,-1)` kuondoa alama za nukuu na kisha `BigInt` kuendesha kamba iliyobaki, ambayo ni nambari ya desimali, kwa [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` inabadilisha `BigInt` hii kuwa kamba ya heksadesimali, na `"0x"+` inaongeza alama ya nambari za heksadesimali.

```typescript
// Chimba na urudishe uthibitisho wa maarifa-sifuri wa matokeo
// (msimbo wa upande wa seva)
```

Uthibitisho wa maarifa-sifuri unajumuisha pembejeo za umma (`x` na `y`) na matokeo (hashi ya ramani na idadi ya mabomu).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Ni tatizo kuangalia ikiwa faharasa iko nje ya mipaka katika Zokrates, kwa hivyo tunafanya hapa.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Tekeleza programu ya kuchimba.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Tumia [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) na urudishe uthibitisho.

```typescript
const solidityVerifier = `
        // Ukubwa wa ramani: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Mthibitishaji wa Solidity, mkataba-erevu tunaoweza kusambaza kwenye mnyororo wa bloku na kutumia kuthibitisha uthibitisho unaotokana na `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Mwishowe, rudisha kila kitu ambacho msimbo mwingine unaweza kuhitaji.

## Majaribio ya usalama {#security-tests}

Majaribio ya usalama ni muhimu kwa sababu hitilafu ya utendakazi hatimaye itajidhihirisha. Lakini ikiwa programu haina usalama, kuna uwezekano itabaki imefichwa kwa muda mrefu kabla ya kufunuliwa na mtu anayedanganya na kuondoka na rasilimali ambazo ni za wengine.

### Ruhusa {#permissions}

Kuna chombo kimoja cha upendeleo katika mchezo huu, seva. Ni mtumiaji pekee anayeruhusiwa kuita kazi katika [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Tunaweza kutumia [`cast`](https://book.getfoundry.sh/cast/) kuthibitisha wito kwa kazi zilizoidhinishwa zinaruhusiwa tu kama akaunti ya seva.

[Ufunguo binafsi wa seva uko katika `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Kwenye kompyuta inayoendesha `anvil` (mnyororo wa bloku), weka vigezo hivi vya mazingira.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Tumia `cast` kujaribu kuweka anwani ya mthibitishaji kama anwani isiyoidhinishwa.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Sio tu kwamba `cast` inaripoti kutofaulu, lakini unaweza kufungua **Zana za Maendeleo za MUD** kwenye mchezo kwenye kivinjari, bonyeza **Majedwali**, na uchague **app\_\_VerifierAddress**. Angalia kwamba anwani sio sifuri.

3. Weka anwani ya mthibitishaji kama anwani ya seva.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Anwani katika **app\_\_VerifiedAddress** sasa inapaswa kuwa sifuri.

Kazi zote za MUD katika `Mfumo` huo huo hupitia udhibiti sawa wa ufikiaji, kwa hivyo nachukulia jaribio hili linatosha. Ikiwa hutafanya hivyo, unaweza kuangalia kazi zingine katika [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Matumizi mabaya ya maarifa-sifuri {#zero-knowledge-abuses}

Hisabati ya kuthibitisha Zokrates iko nje ya wigo wa mafunzo haya (na uwezo wangu). Hata hivyo, tunaweza kufanya ukaguzi mbalimbali kwenye msimbo wa maarifa-sifuri ili kuthibitisha kwamba ikiwa haijafanywa kwa usahihi inashindwa. Majaribio haya yote yatatuhitaji kubadilisha [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) na kuanzisha upya programu nzima. Haitoshi kuanzisha upya mchakato wa seva, kwa sababu inaweka programu katika hali isiyowezekana (mchezaji ana mchezo unaoendelea, lakini mchezo haupatikani tena kwa seva).

#### Jibu lisilo sahihi {#wrong-answer}

Uwezekano rahisi zaidi ni kutoa jibu lisilo sahihi katika uthibitisho wa maarifa-sifuri. Ili kufanya hivyo, tunaingia ndani ya `zkDig` na [kurekebisha mstari wa 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Hii inamaanisha tutadai kila wakati kuna bomu moja, bila kujali jibu sahihi. Jaribu kucheza na toleo hili, na utaona kwenye kichupo cha **seva** cha skrini ya `pnpm dev` hitilafu hii:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Kwa hivyo aina hii ya udanganyifu inashindwa.

#### Uthibitisho usio sahihi {#wrong-proof}

Nini kinatokea ikiwa tunatoa taarifa sahihi, lakini tuna data isiyo sahihi ya uthibitisho? Sasa, badilisha mstari wa 91 na:

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

Bado inashindwa, lakini sasa inashindwa bila sababu kwa sababu inatokea wakati wa wito wa mthibitishaji.

### Mtumiaji anawezaje kuthibitisha msimbo wa imani-sifuri? {#user-verify-zero-trust}

Mikataba-erevu ni rahisi kiasi kuthibitisha. Kwa kawaida, msanidi programu anachapisha msimbo chanzo kwa kichunguzi cha bloku, na kichunguzi cha bloku kinathibitisha kwamba msimbo chanzo unakusanywa kwa msimbo katika [shughuli ya usambazaji wa mkataba](/developers/docs/smart-contracts/deploying/). Katika kesi ya MUD `Mfumo` huu ni [ngumu kidogo](https://mud.dev/cli/verify), lakini si kwa kiasi kikubwa.

Hii ni ngumu zaidi na maarifa-sifuri. Mthibitishaji anajumuisha viwango vya kudumu na anafanya mahesabu juu yao. Hii haikuambii nini kinachothibitishwa.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Suluhisho, angalau hadi wachunguzi wa bloku wataongeza uthibitishaji wa Zokrates kwenye violesura vyao vya watumiaji, ni kwa wasanidi programu kufanya programu za Zokrates zipatikane, na angalau baadhi ya watumiaji kuzikusanya wenyewe na ufunguo sahihi wa uthibitishaji.

Kufanya hivyo:

1. [Sakinisha Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Unda faili, `dig.zok`, na programu ya Zokrates. Msimbo hapa chini unadhania umehifadhi saizi ya ramani ya asili, 10x5.

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


    // Idadi ya migodi katika eneo (x,y)
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

3. Kusanya msimbo wa Zokrates na uunde ufunguo wa uthibitishaji. Ufunguo wa uthibitishaji unapaswa kuundwa na entropy sawa iliyotumika katika seva ya awali, [katika kesi hii kamba tupu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Unda mthibitishaji wa Solidity peke yako, na uthibitishe kuwa unafanya kazi sawa na ule ulioko kwenye mnyororo wa bloku (seva inaongeza maoni, lakini hiyo sio muhimu).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Maamuzi ya kubuni {#design}

Katika programu yoyote ngumu vya kutosha kuna malengo ya kubuni yanayoshindana ambayo yanahitaji maelewano. Wacha tuangalie baadhi ya maelewano na kwa nini suluhisho la sasa ni bora kuliko chaguzi zingine.

### Kwa nini maarifa-sifuri {#why-zero-knowledge}

Kwa minesweeper hauitaji maarifa-sifuri kweli. Seva inaweza kushikilia ramani kila wakati, na kisha kufunua yote wakati mchezo umekwisha. Kisha, mwishoni mwa mchezo, mkataba-erevu unaweza kuhesabu hashi ya ramani, kuthibitisha inalingana, na ikiwa haifanyi hivyo adhibu seva au kupuuzia mchezo kabisa.

Sikutumia suluhisho hili rahisi kwa sababu inafanya kazi tu kwa michezo mifupi yenye hali ya mwisho iliyoelezwa vizuri. Wakati mchezo unaweza kuwa hauna mwisho (kama ilivyo kwa [ulimwengu huru](https://0xparc.org/blog/autonomous-worlds)), unahitaji suluhisho linalothibitisha hali _bila_ kuifunua.

Kama mafunzo, makala hii ilihitaji mchezo mfupi ambao ni rahisi kuelewa, lakini mbinu hii ni muhimu zaidi kwa michezo mirefu.

### Kwa nini Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) sio maktaba pekee ya maarifa-sifuri inayopatikana, lakini inafanana na lugha ya kawaida ya programu [inayoelekeza](https://en.wikipedia.org/wiki/Imperative_programming) na inasaidia vigezo vya boolean.

Kwa programu yako, na mahitaji tofauti, unaweza kupendelea kutumia [Circum](https://docs.circom.io/getting-started/installation/) au [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Wakati wa kukusanya Zokrates {#when-compile-zokrates}

Katika programu hii tunakusanya programu za Zokrates [kila wakati seva inapoanza](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Hii ni wazi ni upotevu wa rasilimali, lakini hii ni mafunzo, yaliyoboreshwa kwa urahisi.

Ikiwa ningekuwa ninaandika programu ya kiwango cha uzalishaji, ningeangalia kama nina faili na programu za Zokrates zilizokusanywa kwa saizi hii ya uwanja wa migodi, na ikiwa ndivyo nitumie hiyo. Vivyo hivyo kwa kusambaza mkataba wa mthibitishaji onchain.

### Kuunda funguo za mthibitishaji na mthibitishaji {#key-creation}

[Uundaji wa ufunguo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ni hesabu nyingine safi ambayo haihitaji kufanywa zaidi ya mara moja kwa saizi fulani ya uwanja wa migodi. Tena, inafanywa mara moja tu kwa ajili ya urahisi.

Kwa kuongeza, tunaweza kutumia [hafla ya kuanzisha](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Faida ya hafla ya kuanzisha ni kwamba unahitaji ama entropy au matokeo ya kati kutoka kwa kila mshiriki ili kudanganya kwenye uthibitisho wa maarifa-sifuri. Ikiwa angalau mshiriki mmoja wa hafla ni mkweli na anafuta habari hiyo, uthibitisho wa maarifa-sifuri uko salama kutokana na mashambulizi fulani. Hata hivyo, _hakuna utaratibu_ wa kuthibitisha kwamba habari imefutwa kutoka kila mahali. Ikiwa uthibitisho wa maarifa-sifuri ni muhimu sana, unataka kushiriki katika hafla ya kuanzisha.

Hapa tunategemea [nguvu za milele za tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), ambayo ilikuwa na washiriki wengi. Pengine ni salama vya kutosha, na rahisi zaidi. Pia hatuongezi entropy wakati wa uundaji wa ufunguo, ambayo inafanya iwe rahisi kwa watumiaji [kuthibitisha usanidi wa maarifa-sifuri](#user-verify-zero-trust).

### Wapi pa kuthibitisha {#where-verification}

Tunaweza kuthibitisha uthibitisho wa maarifa-sifuri ama onchain (ambayo inagharimu gesi) au katika mteja (kwa kutumia [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Nilichagua ya kwanza, kwa sababu hii inakuwezesha [kuthibitisha mthibitishaji](#user-verify-zero-trust) mara moja na kisha kuamini kwamba haibadiliki maadamu anwani ya mkataba wake inabaki sawa. Ikiwa uthibitishaji ungefanywa kwa mteja, ungehitaji kuthibitisha msimbo unaopokea kila unapopakua mteja.

Pia, ingawa mchezo huu ni wa mchezaji mmoja, michezo mingi ya mnyororo wa bloku ni ya wachezaji wengi. uthibitishaji wa onchain unamaanisha unathibitisha tu uthibitisho wa maarifa-sifuri mara moja. Kuifanya katika mteja kungehitaji kila mteja kuthibitisha kivyake.

### Kufanya ramani iwe bapa katika TypeScript au Zokrates? {#where-flatten}

Kwa ujumla, wakati usindikaji unaweza kufanywa ama katika TypeScript au Zokrates, ni bora kuifanya katika TypeScript, ambayo ni haraka sana, na haihitaji uthibitisho wa maarifa-sifuri. Hii ndiyo sababu, kwa mfano, kwamba hatutoi Zokrates na hashi na kuifanya ithibitishe kuwa ni sahihi. Hashing inapaswa kufanywa ndani ya Zokrates, lakini mechi kati ya hashi iliyorudishwa na hashi onchain inaweza kutokea nje yake.

Hata hivyo, bado [tunalainisha ramani katika Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), ambapo tungeweza kuifanya katika TypeScript. Sababu ni kwamba chaguzi zingine, kwa maoni yangu, ni mbaya zaidi.

- Toa safu ya boolean ya mwelekeo mmoja kwa msimbo wa Zokrates, na utumie usemi kama `x*(height+2)
  +y` kupata ramani ya mwelekeo miwili. [Msimbo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) ungekuwa mgumu kidogo, kwa hivyo niliamua kuwa faida ya utendaji haifai kwa mafunzo.

- Tuma Zokrates safu ya mwelekeo mmoja na safu ya mwelekeo miwili. Hata hivyo, suluhisho hili halitupati faida yoyote. Msimbo wa Zokrates ungehitaji kuthibitisha kwamba safu ya mwelekeo mmoja inayoletwa ni kweli uwakilishi sahihi wa safu ya mwelekeo miwili. Kwa hivyo hakungekuwa na faida yoyote ya utendaji.

- Laza safu ya mwelekeo miwili katika Zokrates. Hii ndiyo chaguo rahisi zaidi, kwa hivyo niliichagua.

### Wapi pa kuhifadhi ramani {#where-store-maps}

Katika programu hii [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) ni kigezo tu kwenye kumbukumbu. Hii inamaanisha kwamba ikiwa seva yako itakufa na kuhitaji kuanzishwa upya, habari zote ilizohifadhi zinapotea. Sio tu kwamba wachezaji hawawezi kuendelea na mchezo wao, hawawezi hata kuanza mchezo mpya kwa sababu sehemu ya onchain inafikiri bado wana mchezo unaoendelea.

Huu ni muundo mbaya kwa mfumo wa uzalishaji, ambapo utahifadhi habari hii kwenye hifadhidata. Sababu pekee niliyotumia kigezo hapa ni kwa sababu hii ni mafunzo na urahisi ndio jambo kuu.

## Hitimisho: Chini ya hali gani hii ni mbinu inayofaa? {#conclusion}

Kwa hivyo, sasa unajua jinsi ya kuandika mchezo na seva inayohifadhi hali ya siri ambayo sio ya onchain. Lakini katika kesi gani unapaswa kuifanya? Kuna mambo makuu mawili ya kuzingatia.

- _Mchezo unaoendelea kwa muda mrefu_: [Kama ilivyoelezwa hapo juu](#why-zero-knowledge), katika mchezo mfupi unaweza tu kuchapisha hali mara mchezo unapokwisha na kila kitu kuthibitishwa basi. Lakini hiyo sio chaguo wakati mchezo unachukua muda mrefu au usiojulikana, na hali inahitaji kubaki siri.

- _Ugawanyaji fulani wa kati unakubalika_: Uthibitisho wa maarifa-sifuri unaweza kuthibitisha uadilifu, kwamba chombo hakighushi matokeo. Wanachoweza kufanya ni kuhakikisha kuwa chombo bado kitapatikana na kujibu ujumbe. Katika hali ambapo upatikanaji pia unahitaji kugawanywa, uthibitisho wa maarifa-sifuri sio suluhisho la kutosha, na unahitaji [hesabu za vyama vingi](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

### Shukrani {#acknowledgements}

- Alvaro Alonso alisoma rasimu ya makala hii na akanifafanulia baadhi ya kutoelewa kwangu kuhusu Zokrates.

Makosa yoyote yaliyobaki ni jukumu langu.
