---
title: Kutumia sifuri-maarifa kwa hali ya siri
description: michezo ya mnyororoni ina kikomo kwa sababu haiwezi kuweka taarifa zozote zilizofichwa. Baada ya kusoma mafunzo haya, msomaji ataweza kuchanganya uthibitisho wa maarifa-sifuri na vijenzi vya seva ili kuunda michezo inayoweza kuthibitishwa yenye kijenzi cha hali ya siri, nje ya mnyororo. Mbinu ya kufanya hivi itaonyeshwa kwa kuunda mchezo wa minesweeper.
author: Ori Pomerantz
tags:
  - seva
  - nje ya mnyororo
  - iliyowekwa kati
  - sifuri-maarifa
  - zokrates
  - mud
  - faragha
skill: advanced
breadcrumb: Hali ya siri ya ZK
lang: sw
published: 2025-03-15
---

_Hakuna siri kwenye mnyororo wa vitalu_. Kila kitu kinachochapishwa kwenye mnyororo wa vitalu kiko wazi kwa kila mtu kusoma. Hili ni muhimu, kwa sababu mnyororo wa vitalu unategemea mtu yeyote kuweza kuuthibitisha. Hata hivyo, michezo mara nyingi hutegemea hali ya siri. Kwa mfano, mchezo wa [minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) hauna maana kabisa ikiwa unaweza tu kwenda kwenye kichunguzi cha bloku na kuona ramani.

Suluhisho rahisi zaidi ni kutumia [kijenzi cha seva](/developers/tutorials/server-components/) kushikilia hali ya siri. Hata hivyo, sababu tunayotumia mnyororo wa vitalu ni kuzuia udanganyifu na msanidi wa mchezo. Tunahitaji kuhakikisha uaminifu wa kijenzi cha seva. Seva inaweza kutoa heshi ya hali, na kutumia [uthibitisho wa maarifa-sifuri](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) kuthibitisha kwamba hali iliyotumika kukokotoa matokeo ya hatua ni sahihi.

Baada ya kusoma makala haya utajua jinsi ya kuunda aina hii ya seva inayoshikilia hali ya siri, kiteja cha kuonyesha hali, na kijenzi cha mnyororoni kwa mawasiliano kati ya hizo mbili. Zana kuu tutakazotumia zitakuwa:

| Zana                                          | Kusudi                                                  | Imethibitishwa kwenye toleo |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Uthibitisho wa maarifa-sifuri na uhakiki wake           |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Lugha ya programu kwa seva na kiteja                    |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Kuendesha seva                                          |             20.18.2 |
| [Viem](https://viem.sh/)                      | Mawasiliano na Mnyororo wa vitalu                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | Usimamizi wa data mnyororoni                            |              2.0.12 |
| [React](https://react.dev/)                   | Kiolesura cha mtumiaji cha kiteja                       |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Kuhudumia msimbo wa kiteja                              |               4.2.1 |

## Mfano wa Minesweeper {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) ni mchezo unaojumuisha ramani ya siri yenye uwanja wa mabomu. Mchezaji anachagua kuchimba katika eneo maalum. Ikiwa eneo hilo lina bomu, mchezo unakwisha. Vinginevyo, mchezaji anapata idadi ya mabomu katika miraba minane inayozunguka eneo hilo.

Programu hii imeandikwa kwa kutumia [MUD](https://mud.dev/), mfumo unaoturuhusu kuhifadhi data mnyororoni kwa kutumia [hifadhidata ya ufunguo-thamani](https://aws.amazon.com/nosql/key-value/) na kusawazisha data hiyo kiotomatiki na vijenzi vya nje ya mnyororo. Mbali na usawazishaji, MUD inafanya iwe rahisi kutoa udhibiti wa ufikiaji, na kwa watumiaji wengine [kupanua](https://mud.dev/guides/extending-a-world) programu yetu bila kuhitaji ruhusa.

### Kuendesha mfano wa minesweeper {#running-minesweeper-example}

Ili kuendesha mfano wa minesweeper:

1. Hakikisha [umesakinisha mahitaji ya awali](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), na [`mprocs`](https://github.com/pvolok/mprocs).

2. Nakili (clone) hazina.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Sakinisha vifurushi.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Ikiwa Foundry ilisakinishwa kama sehemu ya `pnpm install`, unahitaji kuanzisha upya ganda la mstari wa amri (command-line shell).

4. Kusanya (compile) mikataba

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Anzisha programu (ikiwa ni pamoja na mnyororo wa vitalu wa [anvil](https://book.getfoundry.sh/anvil/)) na usubiri.

   ```sh copy
   mprocs
   ```

   Kumbuka kwamba kuanzisha kunachukua muda mrefu. Ili kuona maendeleo, kwanza tumia mshale wa chini kusogeza hadi kwenye kichupo cha _contracts_ ili kuona mikataba ya MUD ikisambazwa. Unapopata ujumbe _Waiting for file changes…_, mikataba inasambazwa na maendeleo zaidi yatafanyika katika kichupo cha _server_. Hapo, unasubiri hadi upate ujumbe _Verifier address: 0x...._.

   Ikiwa hatua hii imefanikiwa, utaona skrini ya `mprocs`, na michakato tofauti upande wa kushoto na matokeo ya kiweko (console output) kwa mchakato uliochaguliwa kwa sasa upande wa kulia.

   ![The mprocs screen](./mprocs.png)

   Ikiwa kuna tatizo na `mprocs`, unaweza kuendesha michakato minne kwa mikono, kila mmoja katika dirisha lake la mstari wa amri:

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

6. Sasa unaweza kuvinjari hadi [kwa mteja](http://localhost:3000), bofya **New Game**, na uanze kucheza.

### Majedwali {#tables}

Tunahitaji [majedwali kadhaa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) mnyororoni.

- `Configuration`: Jedwali hili ni singeltoni, halina ufunguo na lina rekodi moja. Linatumika kushikilia maelezo ya usanidi wa mchezo:
  - `height`: Urefu wa uwanja wa mabomu
  - `width`: Upana wa uwanja wa mabomu
  - `numberOfBombs`: Idadi ya mabomu katika kila uwanja wa mabomu
- `VerifierAddress`: Jedwali hili pia ni singeltoni. Linatumika kushikilia sehemu moja ya usanidi, anwani ya mkataba wa mhakiki (`verifier`). Tungeweza kuweka maelezo haya katika jedwali la `Configuration`, lakini imewekwa na kijenzi tofauti, seva, kwa hivyo ni rahisi kuiweka katika jedwali tofauti.

- `PlayerGame`: Ufunguo ni anwani ya mchezaji. Data ni:

  - `gameId`: Thamani ya baiti 32 ambayo ni heshi ya ramani anayochezea mchezaji (kitambulisho cha mchezo).
  - `win`: boolean inayoonyesha ikiwa mchezaji alishinda mchezo.
  - `lose`: boolean inayoonyesha ikiwa mchezaji alishindwa mchezo.
  - `digNumber`: idadi ya uchimbaji uliofanikiwa katika mchezo.

- `GamePlayer`: Jedwali hili linashikilia ramani ya kinyume, kutoka `gameId` hadi anwani ya mchezaji.

- `Map`: Ufunguo ni tuple ya thamani tatu:

  - `gameId`: Thamani ya baiti 32 ambayo ni heshi ya ramani anayochezea mchezaji (kitambulisho cha mchezo).
  - `x` kuratibu (coordinate)
  - `y` kuratibu (coordinate)

  Thamani ni nambari moja. Ni 255 ikiwa bomu liligunduliwa. Vinginevyo, ni idadi ya mabomu karibu na eneo hilo kujumlisha moja. Hatuwezi tu kutumia idadi ya mabomu, kwa sababu kwa chaguo-msingi hifadhi yote katika EVM na thamani zote za safu mlango katika MUD ni sifuri. Tunahitaji kutofautisha kati ya "mchezaji hajachimba hapa bado" na "mchezaji alichimba hapa, na akakuta hakuna mabomu karibu".

Kwa kuongezea, mawasiliano kati ya mteja na seva yanafanyika kupitia kijenzi cha mnyororoni. Hii pia inatekelezwa kwa kutumia majedwali.

- `PendingGame`: Maombi ambayo hayajahudumiwa ya kuanzisha mchezo mpya.
- `PendingDig`: Maombi ambayo hayajahudumiwa ya kuchimba katika eneo maalum katika mchezo maalum. Hili ni [jedwali la nje ya mnyororo](https://mud.dev/store/tables#types-of-tables), ikimaanisha kwamba haliandikwi kwenye hifadhi ya EVM, linasomeka tu nje ya mnyororo kwa kutumia matukio.

### Utekelezaji na mtiririko wa data {#execution-data-flows}

Mitiririko hii inaratibu utekelezaji kati ya mteja, kijenzi cha mnyororoni, na seva.

#### Uanzishaji {#initialization-flow}

Unapoendesha `mprocs`, hatua hizi hufanyika:

1. [`mprocs`](https://github.com/pvolok/mprocs) inaendesha vijenzi vinne:

   - [Anvil](https://book.getfoundry.sh/anvil/), ambayo inaendesha mnyororo wa vitalu wa ndani
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), ambayo inakusanya (ikiwa inahitajika) na kusambaza mikataba kwa ajili ya MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), ambayo inaendesha [Vite](https://vitejs.dev/) ili kuhudumia UI na msimbo wa mteja kwa vivinjari vya wavuti.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), ambayo inafanya vitendo vya seva

2. Kifurushi cha `contracts` kinasambaza mikataba ya MUD na kisha kuendesha [hati ya `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Hati hii inaweka usanidi. Msimbo kutoka github unabainisha [uwanja wa mabomu wa 10x5 wenye mabomu manane ndani yake](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Seva](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) inaanza kwa [kuweka MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Miongoni mwa mambo mengine, hii inawasha usawazishaji wa data, ili nakala ya majedwali husika iwepo kwenye kumbukumbu ya seva.

4. Seva inajiandikisha (subscribes) kazi itakayotekelezwa [wakati jedwali la `Configuration` linapobadilika](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Kazi hii](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) inaitwa baada ya `PostDeploy.s.sol` kutekelezwa na kurekebisha jedwali.

5. Wakati kazi ya uanzishaji wa seva ina usanidi, [inaita `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) ili kuanzisha [sehemu ya sifuri-maarifa ya seva](#using-zokrates-from-typescript). Hili haliwezi kufanyika hadi tupate usanidi kwa sababu kazi za sifuri-maarifa lazima ziwe na upana na urefu wa uwanja wa mabomu kama viwango vya kudumu (constants).

6. Baada ya sehemu ya sifuri-maarifa ya seva kuanzishwa, hatua inayofuata ni [kusambaza mkataba wa uthibitishaji wa sifuri-maarifa kwenye mnyororo wa vitalu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) na kuweka anwani ya anayethibitishwa katika MUD.

7. Hatimaye, tunajiandikisha kwa sasisho ili tuone wakati mchezaji anaomba ama [kuanzisha mchezo mpya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) au [kuchimba katika mchezo uliopo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Mchezo mpya {#new-game-flow}

Hivi ndivyo inavyotokea wakati mchezaji anaomba mchezo mpya.

1. Ikiwa hakuna mchezo unaoendelea kwa mchezaji huyu, au kuna mmoja lakini wenye gameId ya sifuri, mteja anaonyesha [kitufe cha mchezo mpya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Mtumiaji anapobonyeza kitufe hiki, [React inaendesha kazi ya `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) ni wito wa `System`. Katika MUD wito wote unaelekezwa kupitia mkataba wa `World`, na katika hali nyingi unaita `<namespace>__<function name>`. Katika kesi hii, wito ni kwa `app__newGame`, ambao MUD kisha inaelekeza kwa [`newGame` katika `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Kazi ya mnyororoni inakagua kwamba mchezaji hana mchezo unaoendelea, na ikiwa hakuna [inaongeza ombi kwenye jedwali la `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Seva inagundua mabadiliko katika `PendingGame` na [inaendesha kazi iliyojiandikisha](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Kazi hii inaita [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), ambayo nayo inaita [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Kitu cha kwanza ambacho `createGame` inafanya ni [kuunda ramani ya nasibu yenye idadi inayofaa ya mabomu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Kisha, inaita [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) ili kuunda ramani yenye mipaka tupu, ambayo ni muhimu kwa Zokrates. Hatimaye, `createGame` inaita [`calculateMapHash`](#calculatemaphash), ili kupata heshi ya ramani, ambayo inatumika kama kitambulisho cha mchezo.

6. Kazi ya `newGame` inaongeza mchezo mpya kwenye `gamesInProgress`.

7. Kitu cha mwisho ambacho seva inafanya ni kuita [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), ambayo iko mnyororoni. Kazi hii iko katika `System` tofauti, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), ili kuwezesha udhibiti wa ufikiaji. Udhibiti wa ufikiaji unafafanuliwa katika [faili la usanidi la MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Orodha ya ufikiaji inaruhusu anwani moja tu kuita `System`. Hii inazuia ufikiaji wa kazi za seva kwa anwani moja, kwa hivyo hakuna mtu anayeweza kujifanya kuwa seva.

8. Kijenzi cha mnyororoni kinasasisha majedwali husika:

   - Unda mchezo katika `PlayerGame`.
   - Weka ramani ya kinyume katika `GamePlayer`.
   - Ondoa ombi kutoka `PendingGame`.

9. Seva inatambua mabadiliko katika `PendingGame`, lakini haifanyi chochote kwa sababu [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) ni uongo (false).

10. Kwenye mteja [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) imewekwa kwa ingizo la `PlayerGame` kwa anwani ya mchezaji. Wakati `PlayerGame` inabadilika, `gameRecord` inabadilika pia.

11. Ikiwa kuna thamani katika `gameRecord`, na mchezo haujashindwa au kupotezwa, mteja [anaonyesha ramani](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Chimba {#dig-flow}

1. Mchezaji [anabofya kitufe cha seli ya ramani](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), ambayo inaita [kazi ya `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Kazi hii inaita [`dig` mnyororoni](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Kijenzi cha mnyororoni [kinafanya ukaguzi kadhaa wa usahihi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), na ikiwa imefanikiwa inaongeza ombi la kuchimba kwenye [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Seva [inagundua mabadiliko katika `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Ikiwa ni halali](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [inaita msimbo wa sifuri-maarifa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (iliyoelezwa hapa chini) ili kuzalisha matokeo na uthibitisho kwamba ni halali.

4. [Seva](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) inaita [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) mnyororoni.

5. `digResponse` inafanya mambo mawili. Kwanza, inakagua [uthibitisho wa maarifa-sifuri](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Kisha, ikiwa uthibitisho ni sahihi, inaita [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) ili kuchakata matokeo haswa.

6. `processDigResult` inakagua ikiwa mchezo [umepotezwa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) au [kushindwa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), na [kusasisha `Map`, ramani ya mnyororoni](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Mteja anachukua sasisho kiotomatiki na [kusasisha ramani inayoonyeshwa kwa mchezaji](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), na ikiwa inafaa inamwambia mchezaji ikiwa ni ushindi au kupoteza.

## Kutumia Zokrates {#using-zokrates}

Katika mtiririko ulioelezwa hapo juu tuliruka sehemu za sifuri-maarifa, tukizichukulia kama kisanduku cheusi (black box). Sasa hebu tukifungue na tuone jinsi msimbo huo unavyoandikwa.

### Uheshiji wa ramani {#hashing-map}

Tunaweza kutumia [msimbo huu wa JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) kutekeleza [Poseidon](https://www.poseidon-hash.info), kazi ya heshi ya Zokrates tunayotumia. Hata hivyo, ingawa hii ingekuwa haraka zaidi, ingekuwa pia ngumu zaidi kuliko kutumia tu kazi ya heshi ya Zokrates kufanya hivyo. Huu ni mwongozo, na hivyo msimbo umeboreshwa kwa urahisi, si kwa utendaji. Kwa hivyo, tunahitaji programu mbili tofauti za Zokrates, moja ya kuhesabu tu heshi ya ramani (`hash`) na nyingine ya kuunda uthibitisho wa maarifa-sifuri wa matokeo ya kuchimba katika eneo kwenye ramani (`dig`).

### Kazi ya heshi {#hash-function}

Hii ni kazi inayohesabu heshi ya ramani. Tutapitia msimbo huu mstari kwa mstari.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Mistari hii miwili inaingiza kazi mbili kutoka kwenye [maktaba ya kawaida ya Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Kazi ya kwanza](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) ni [heshi ya Poseidon](https://www.poseidon-hash.info/). Inachukua safu ya [vipengele vya `field`](https://zokrates.github.io/language/types.html#field) na kurudisha `field`.

Kipengele cha uwanja katika Zokrates kwa kawaida huwa na urefu wa chini ya biti 256, lakini si kwa kiasi kikubwa. Ili kurahisisha msimbo, tunazuia ramani kuwa hadi biti 512, na kuheshi safu ya nyanja nne, na katika kila uwanja tunatumia biti 128 pekee. [Kazi ya `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) inabadilisha safu ya biti 128 kuwa `field` kwa madhumuni haya.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Mstari huu unaanza ufafanuzi wa kazi. `hashMap` inapata kigezo kimoja kinachoitwa `map`, safu ya `bool`(ean) yenye vipimo viwili. Ukubwa wa ramani ni `width+2` kwa `height+2` kwa sababu ambazo [zimeelezwa hapa chini](#why-map-border).

Tunaweza kutumia `${width+2}` na `${height+2}` kwa sababu programu za Zokrates zimehifadhiwa katika programu tumizi hii kama [tungo za kiolezo (template strings)](https://www.w3schools.com/js/js_string_templates.asp). Msimbo kati ya `${` na `}` unatathminiwa na JavaScript, na kwa njia hii programu inaweza kutumika kwa ukubwa tofauti wa ramani. Kigezo cha ramani kina mpaka wa upana wa eneo moja kuzunguka kote bila mabomu yoyote, ambayo ndiyo sababu tunahitaji kuongeza mbili kwenye upana na urefu.

Thamani inayorudishwa ni `field` ambayo ina heshi.

```
bool[512] mut map1d = [false; 512];
```

Ramani ina vipimo viwili. Hata hivyo, kazi ya `pack128` haifanyi kazi na safu za vipimo viwili. Kwa hivyo kwanza tunatandaza ramani kuwa safu ya baiti 512, tukitumia `map1d`. Kwa chaguo-msingi vigezo vya Zokrates ni vya kudumu (constants), lakini tunahitaji kugawa thamani kwenye safu hii katika kitanzi (loop), kwa hivyo tunaifafanua kama [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Tunahitaji kuanzisha safu kwa sababu Zokrates haina `undefined`. Usemi wa `[false; 512]` unamaanisha [safu ya thamani 512 za `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Pia tunahitaji kihesabio ili kutofautisha kati ya biti ambazo tayari tumezijaza kwenye `map1d` na zile ambazo hatujajaza.

```
for u32 x in 0..${width+2} {
```

Hivi ndivyo unavyotangaza [kitanzi cha `for`](https://zokrates.github.io/language/control_flow.html#for-loops) katika Zokrates. Kitanzi cha `for` cha Zokrates lazima kiwe na mipaka isiyobadilika, kwa sababu ingawa kinaonekana kuwa kitanzi, kikusanyaji (compiler) kwa kweli "hukifungua" (unrolls). Usemi wa `${width+2}` ni wa kudumu wakati wa kukusanya kwa sababu `width` imewekwa na msimbo wa TypeScript kabla ya kuita kikusanyaji.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Kwa kila eneo kwenye ramani, weka thamani hiyo kwenye safu ya `map1d` na uongeze kihesabio.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` inatumika kuunda safu ya thamani nne za `field` kutoka kwenye `map1d`. Katika Zokrates `array[a..b]` inamaanisha kipande cha safu kinachoanza kwenye `a` na kuishia kwenye `b-1`.

```
return poseidon(hashMe);
}
```

Tumia `poseidon` kubadilisha safu hii kuwa heshi.

### Programu ya heshi {#hash-program}

Seva inahitaji kuita `hashMap` moja kwa moja ili kuunda vitambulisho vya mchezo. Hata hivyo, Zokrates inaweza tu kuita kazi ya `main` kwenye programu ili kuanza, kwa hivyo tunaunda programu yenye `main` inayoita kazi ya heshi.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Programu ya kuchimba {#dig-program}

Huu ndio moyo wa sehemu ya sifuri-maarifa ya programu tumizi, ambapo tunazalisha uthibitisho unaotumika kuhakiki matokeo ya kuchimba.

```
${hashFragment}

// Idadi ya mabomu katika eneo (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Kwa nini mpaka wa ramani {#why-map-border}

Uthibitisho wa maarifa-sifuri unatumia [saketi za kihesabu (arithmetic circuits)](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), ambazo hazina mbadala rahisi wa kauli ya `if`. Badala yake, zinatumia mbadala wa [kioo cha masharti (conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Ikiwa `a` inaweza kuwa sifuri au moja, unaweza kuhesabu `if a { b } else { c }` kama `ab+(1-a)c`.

Kwa sababu hii, kauli ya `if` ya Zokrates daima hutathmini matawi yote mawili. Kwa mfano, ikiwa una msimbo huu:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Italeta hitilafu, kwa sababu inahitaji kuhesabu `arr[10]`, ingawa thamani hiyo baadaye itazidishwa kwa sifuri.

Hii ndiyo sababu tunahitaji mpaka wa upana wa eneo moja kuzunguka ramani yote. Tunahitaji kuhesabu jumla ya idadi ya mabomu kuzunguka eneo, na hiyo inamaanisha tunahitaji kuona eneo la mstari mmoja juu na chini, kushoto na kulia, mwa eneo tunalochimba. Ambayo inamaanisha maeneo hayo lazima yawepo katika safu ya ramani ambayo Zokrates inapewa.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Kwa chaguo-msingi uthibitisho wa Zokrates unajumuisha pembejeo zake. Haifai kujua kuna mabomu matano kuzunguka eneo isipokuwa kama unajua hasa ni eneo gani (na huwezi tu kulilinganisha na ombi lako, kwa sababu basi mthibitishaji angeweza kutumia thamani tofauti na asikuambie kuhusu hilo). Hata hivyo, tunahitaji kuweka ramani siri, huku tukiipatia Zokrates. Suluhisho ni kutumia kigezo cha `private`, kile ambacho _hakifichuliwi_ na uthibitisho.

Hii inafungua njia nyingine ya matumizi mabaya. Mthibitishaji angeweza kutumia viwianishi (coordinates) sahihi, lakini akaunda ramani yenye idadi yoyote ya mabomu kuzunguka eneo hilo, na ikiwezekana kwenye eneo lenyewe. Ili kuzuia matumizi haya mabaya, tunafanya uthibitisho wa maarifa-sifuri ujumuishe heshi ya ramani, ambayo ni kitambulisho cha mchezo.

```
return (hashMap(map),
```

Thamani inayorudishwa hapa ni tapo (tuple) inayojumuisha safu ya heshi ya ramani pamoja na matokeo ya kuchimba.

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

Ikiwa mchezaji hajapiga bomu, ongeza idadi ya mabomu kwa eneo linalozunguka eneo hilo na urudishe hiyo.

### Kutumia Zokrates kutoka TypeScript {#using-zokrates-from-typescript}

Zokrates ina kiolesura cha mstari wa amri (command line interface), lakini katika programu hii tunaitumia kwenye [msimbo wa TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Maktaba iliyo na ufafanuzi wa Zokrates inaitwa [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Ingiza [vifungo vya JavaScript vya Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Tunahitaji tu kazi ya [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) kwa sababu inarudisha ahadi (promise) inayotatua kwa ufafanuzi wote wa Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Sawa na Zokrates yenyewe, pia tunasafirisha (export) kazi moja tu, ambayo pia ni [asinkronasi (asynchronous)](https://www.w3schools.com/js/js_async.asp). Inaporudi hatimaye, inatoa kazi kadhaa kama tutakavyoona hapa chini.

```typescript
const zokrates = await zokratesInitialize()
```

Anzisha Zokrates, pata kila kitu tunachohitaji kutoka kwenye maktaba.

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

Kisha tuna kazi ya heshi na programu mbili za Zokrates tulizoziona hapo juu.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Hapa tunakusanya (compile) programu hizo.

```typescript
// Unda funguo kwa ajili ya uhakiki wa sifuri-maarifa.
// Kwenye mfumo wa uzalishaji ungetaka kutumia sherehe ya usanidi.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Kwenye mfumo wa uzalishaji tunaweza kutumia [sherehe ya usanidi (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) ngumu zaidi, lakini hii inatosha kwa onyesho. Sio tatizo kwamba watumiaji wanaweza kujua ufunguo wa mthibitishaji - bado hawawezi kuutumia kuthibitisha mambo isipokuwa kama ni ya kweli. Kwa sababu tunabainisha Entropi (kigezo cha pili, `""`), matokeo yatakuwa sawa kila wakati.

**Kumbuka:** Ukusanyaji wa programu za Zokrates na uundaji wa ufunguo ni michakato ya polepole. Hakuna haja ya kuirudia kila wakati, isipokuwa tu wakati ukubwa wa ramani unabadilika. Kwenye mfumo wa uzalishaji ungeifanya mara moja, na kisha kuhifadhi matokeo. Sababu pekee sifanyi hivi hapa ni kwa ajili ya urahisi.

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

Kazi ya [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) kwa kweli inaendesha programu ya Zokrates. Inarudisha muundo wenye nyanja mbili: `output`, ambayo ni pato la programu kama tungo ya JSON, na `witness`, ambayo ni taarifa inayohitajika kuunda uthibitisho wa maarifa-sifuri wa matokeo. Hapa tunahitaji tu pato.

Pato ni tungo ya muundo wa `"31337"`, nambari ya desimali iliyofungwa katika alama za nukuu. Lakini pato tunalohitaji kwa `viem` ni nambari ya heksadesimali ya muundo wa `0x60A7`. Kwa hivyo tunatumia `.slice(1,-1)` kuondoa alama za nukuu na kisha `BigInt` kuendesha tungo iliyobaki, ambayo ni nambari ya desimali, kuwa [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` inabadilisha `BigInt` hii kuwa tungo ya heksadesimali, na `"0x"+` inaongeza alama kwa nambari za heksadesimali.

```typescript
// Chimba na urudishe uthibitisho wa maarifa-sifuri wa matokeo
// (msimbo wa upande wa seva)
```

Uthibitisho wa maarifa-sifuri unajumuisha pembejeo za umma (`x` na `y`) na matokeo (heshi ya ramani na idadi ya mabomu).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Ni tatizo kuangalia ikiwa faharisi iko nje ya mipaka katika Zokrates, kwa hivyo tunafanya hapa.

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
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Mhakiki wa Solidity, mkataba mahiri tunaoweza kusambaza kwenye mnyororo wa vitalu na kutumia kuhakiki uthibitisho unaozalishwa na `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Hatimaye, rudisha kila kitu ambacho msimbo mwingine unaweza kuhitaji.

## Majaribio ya usalama {#security-tests}

Majaribio ya usalama ni muhimu kwa sababu hitilafu ya utendaji hatimaye itajidhihirisha yenyewe. Lakini ikiwa programu si salama, kuna uwezekano wa kubaki imefichwa kwa muda mrefu kabla ya kufichuliwa na mtu anayedanganya na kutoroka na rasilimali ambazo ni za wengine.

### Ruhusa {#permissions}

Kuna huluki moja yenye upendeleo katika mchezo huu, seva. Ndiyo mtumiaji pekee anayeruhusiwa kuita kazi katika [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Tunaweza kutumia [`cast`](https://book.getfoundry.sh/cast/) kuthibitisha miito kwa kazi zenye ruhusa inaruhusiwa tu kama akaunti ya seva.

[Ufunguo wa siri wa seva upo katika `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Kwenye kompyuta inayoendesha `anvil` (mnyororo wa vitalu), weka vigezo hivi vya mazingira.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Tumia `cast` kujaribu kuweka anwani ya mhakiki kama anwani isiyoidhinishwa.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Sio tu kwamba `cast` inaripoti kufeli, lakini unaweza kufungua **MUD Dev Tools** katika mchezo kwenye kivinjari, bofya **Tables**, na uchague **app\_\_VerifierAddress**. Utaona kwamba anwani si sifuri.

3. Weka anwani ya mhakiki kama anwani ya seva.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Anwani katika **app\_\_VerifiedAddress** sasa inapaswa kuwa sifuri.

Kazi zote za MUD katika `System` sawa hupitia udhibiti sawa wa ufikiaji, kwa hivyo ninachukulia jaribio hili kuwa la kutosha. Ikiwa hufikirii hivyo, unaweza kuangalia kazi zingine katika [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Matumizi mabaya ya sifuri-maarifa {#zero-knowledge-abuses}

Hisabati ya kuthibitisha Zokrates iko nje ya upeo wa mafunzo haya (na uwezo wangu). Hata hivyo, tunaweza kuendesha ukaguzi mbalimbali kwenye msimbo wa sifuri-maarifa ili kuthibitisha kwamba ikiwa haujafanywa kwa usahihi unafeli. Majaribio haya yote yatahitaji tubadilishe [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) na kuanzisha upya programu nzima. Haitoshi kuanzisha upya mchakato wa seva, kwa sababu inaweka programu katika hali isiyowezekana (mchezaji ana mchezo unaoendelea, lakini mchezo haupatikani tena kwa seva).

#### Jibu lisilo sahihi {#wrong-answer}

Uwezekano rahisi zaidi ni kutoa jibu lisilo sahihi katika uthibitisho wa maarifa-sifuri. Ili kufanya hivyo, tunaingia ndani ya `zkDig` na [kurekebisha mstari wa 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Hii inamaanisha tutadai kila wakati kuna bomu moja, bila kujali jibu sahihi. Jaribu kucheza na toleo hili, na utaona katika kichupo cha **server** cha skrini ya `pnpm dev` kosa hili:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Kwa hivyo aina hii ya udanganyifu inafeli.

#### Uthibitisho usio sahihi {#wrong-proof}

Nini kinatokea ikiwa tutatoa taarifa sahihi, lakini tuwe na data isiyo sahihi ya uthibitisho? Sasa, badilisha mstari wa 91 na:

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

Bado inafeli, lakini sasa inafeli bila sababu kwa sababu inatokea wakati wa mwito wa mhakiki.

### Mtumiaji anawezaje kuthibitisha msimbo wa uaminifu sifuri? {#user-verify-zero-trust}

Mikataba mahiri ni rahisi kiasi kuthibitisha. Kwa kawaida, msanidi huchapisha msimbo wa chanzo kwenye kichunguzi cha bloku, na kichunguzi cha bloku huthibitisha kwamba msimbo wa chanzo unakusanywa kwenye msimbo katika [muamala wa usambazaji wa mkataba](/developers/docs/smart-contracts/deploying/). Katika kesi ya MUD `System` hii ni [ngumu kidogo zaidi](https://mud.dev/cli/verify), lakini si sana.

Hili ni gumu zaidi kwa sifuri-maarifa. Mhakiki hujumuisha baadhi ya viwango vya kudumu na kuendesha baadhi ya hesabu juu yake. Hii haikuambii nini kinathibitishwa.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Suluhisho, angalau hadi vichunguzi vya bloku vipate nafasi ya kuongeza uthibitishaji wa Zokrates kwenye miingiliano yao ya watumiaji, ni kwa wasanidi wa programu kufanya programu za Zokrates zipatikane, na kwa angalau baadhi ya watumiaji kuzikusanya wenyewe kwa ufunguo unaofaa wa uthibitishaji.

Ili kufanya hivyo:

1. [Sakinisha Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Unda faili, `dig.zok`, na programu ya Zokrates. Msimbo ulio hapa chini unachukulia uliweka ukubwa wa ramani asili, 10x5.

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

3. Kusanya msimbo wa Zokrates na uunde ufunguo wa uthibitishaji. Ufunguo wa uthibitishaji lazima uundwe kwa Entropi sawa iliyotumika katika seva asili, [katika kesi hii mfuatano tupu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Unda mhakiki wa Solidity peke yako, na uthibitishe kuwa inafanana kiutendaji na ile iliyo kwenye mnyororo wa vitalu (seva inaongeza maoni, lakini hiyo si muhimu).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Maamuzi ya muundo {#design}

Katika programu yoyote iliyo ngumu vya kutosha kuna malengo ya muundo yanayoshindana ambayo yanahitaji maelewano. Hebu tuangalie baadhi ya maelewano na kwa nini suluhisho la sasa linapendelewa zaidi ya chaguzi nyingine.

### Kwa nini sifuri-maarifa {#why-zero-knowledge}

Kwa minesweeper hauhitaji kweli sifuri-maarifa. Seva inaweza kushikilia ramani kila wakati, na kisha kuifichua yote mchezo unapokwisha. Kisha, mwishoni mwa mchezo, mkataba mahiri unaweza kukokotoa heshi ya ramani, kuthibitisha kuwa inalingana, na ikiwa hailingani kuiadhibu seva au kupuuza mchezo kabisa.

Sikutumia suluhisho hili rahisi kwa sababu linafanya kazi tu kwa michezo mifupi yenye hali ya mwisho iliyofafanuliwa vizuri. Wakati mchezo unaweza kuwa hauna mwisho (kama ilivyo kwa [ulimwengu unaojitegemea](https://0xparc.org/blog/autonomous-worlds)), unahitaji suluhisho ambalo linathibitisha hali _bila_ kuifichua.

Kama mafunzo makala haya yalihitaji mchezo mfupi ambao ni rahisi kueleweka, lakini mbinu hii ni muhimu zaidi kwa michezo mirefu.

### Kwa nini Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) sio maktaba pekee ya sifuri-maarifa inayopatikana, lakini inafanana na lugha ya kawaida ya programu ya [kiamri](https://en.wikipedia.org/wiki/Imperative_programming) na inasaidia vigezo vya boolean.

Kwa programu yako, yenye mahitaji tofauti, unaweza kupendelea kutumia [Circum](https://docs.circom.io/getting-started/installation/) au [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Lini ya kukusanya Zokrates {#when-compile-zokrates}

Katika programu hii tunakusanya programu za Zokrates [kila wakati seva inapoanza](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Huu ni upotevu wa rasilimali waziwazi, lakini haya ni mafunzo, yaliyoboreshwa kwa urahisi.

Kama ningekuwa ninaandika programu ya kiwango cha uzalishaji, ningeangalia ikiwa nina faili yenye programu za Zokrates zilizokusanywa kwa ukubwa huu wa uwanja wa mabomu, na ikiwa ndivyo nitumie hiyo. Hali ni hiyo hiyo kwa kusambaza mkataba wa mhakiki mnyororoni.

### Kuunda funguo za mhakiki na mthibitishaji {#key-creation}

[Uundaji wa ufunguo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) ni ukokotoaji mwingine safi ambao hauhitaji kufanywa zaidi ya mara moja kwa ukubwa fulani wa uwanja wa mabomu. Tena, inafanywa mara moja tu kwa ajili ya urahisi.

Zaidi ya hayo, tunaweza kutumia [sherehe ya usanidi](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Faida ya sherehe ya usanidi ni kwamba unahitaji ama Entropi au matokeo fulani ya kati kutoka kwa kila mshiriki ili kudanganya kwenye uthibitisho wa maarifa-sifuri. Ikiwa angalau mshiriki mmoja wa sherehe ni mwaminifu na anafuta taarifa hiyo, uthibitisho wa maarifa-sifuri uko salama dhidi ya mashambulizi fulani. Hata hivyo, _hakuna utaratibu_ wa kuthibitisha kwamba taarifa imefutwa kutoka kila mahali. Ikiwa uthibitisho wa maarifa-sifuri ni muhimu sana, unataka kushiriki katika sherehe ya usanidi.

Hapa tunategemea [nguvu za kudumu za tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), ambazo zilikuwa na makumi ya washiriki. Pengine ni salama vya kutosha, na rahisi zaidi. Pia hatuongezi Entropi wakati wa uundaji wa ufunguo, jambo ambalo hurahisisha watumiaji [kuthibitisha usanidi wa sifuri-maarifa](#user-verify-zero-trust).

### Wapi pa kuthibitisha {#where-verification}

Tunaweza kuthibitisha uthibitisho wa maarifa-sifuri ama mnyororoni (ambayo inagharimu gesi) au kwenye mteja (kwa kutumia [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Nilichagua ya kwanza, kwa sababu hii inakuwezesha [kuthibitisha mhakiki](#user-verify-zero-trust) mara moja na kisha kuamini kwamba haibadiliki mradi tu anwani ya mkataba wake inabaki sawa. Ikiwa uthibitishaji ungefanywa kwenye mteja, itabidi uthibitishe msimbo unaopokea kila wakati unapopakua mteja.

Pia, ingawa mchezo huu ni wa mchezaji mmoja, michezo mingi ya mnyororo wa vitalu ni ya wachezaji wengi. uthibitishaji mnyororoni unamaanisha unathibitisha tu uthibitisho wa maarifa-sifuri mara moja. Kufanya hivyo kwenye mteja kungelazimu kila mteja kuthibitisha kwa kujitegemea.

### Kulainisha ramani katika TypeScript au Zokrates? {#where-flatten}

Kwa ujumla, wakati uchakataji unaweza kufanywa ama katika TypeScript au Zokrates, ni bora kuufanya katika TypeScript, ambayo ni ya haraka sana, na haihitaji uthibitisho wa maarifa-sifuri. Hii ndiyo sababu, kwa mfano, kwamba hatupi Zokrates heshi na kuifanya ithibitishe kuwa ni sahihi. Uheshiji unapaswa kufanywa ndani ya Zokrates, lakini ulinganifu kati ya heshi iliyorudishwa na heshi mnyororoni unaweza kutokea nje yake.

Hata hivyo, bado [tunalainisha ramani katika Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), ambapo tungeweza kuifanya katika TypeScript. Sababu ni kwamba chaguzi nyingine ni, kwa maoni yangu, mbaya zaidi.

- Kutoa safu ya mwelekeo mmoja ya boolean kwa msimbo wa Zokrates, na kutumia usemi kama vile `x*(height+2)
+y` kupata ramani ya mwelekeo mbili. Hii ingefanya [msimbo](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) kuwa mgumu zaidi kiasi, kwa hivyo niliamua faida ya utendaji haifai kwa mafunzo.

- Kutuma Zokrates safu ya mwelekeo mmoja na safu ya mwelekeo mbili. Hata hivyo, suluhisho hili halitupi faida yoyote. Msimbo wa Zokrates ungelazimika kuthibitisha kwamba safu ya mwelekeo mmoja inayotolewa kweli ni uwakilishi sahihi wa safu ya mwelekeo mbili. Kwa hivyo hakungekuwa na faida yoyote ya utendaji.

- Kulainisha safu ya mwelekeo mbili katika Zokrates. Hili ndilo chaguo rahisi zaidi, kwa hivyo nililichagua.

### Wapi pa kuhifadhi ramani {#where-store-maps}

Katika programu hii [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) ni kigezo tu kwenye kumbukumbu. Hii inamaanisha kwamba ikiwa seva yako itakufa na inahitaji kuanzishwa upya, taarifa zote ilizohifadhi zinapotea. Sio tu kwamba wachezaji hawawezi kuendelea na mchezo wao, hawawezi hata kuanza mchezo mpya kwa sababu kijenzi cha mnyororoni kinafikiri bado wana mchezo unaoendelea.

Huu ni muundo mbaya waziwazi kwa mfumo wa uzalishaji, ambapo ungehifadhi taarifa hii kwenye hifadhidata. Sababu pekee niliyotumia kigezo hapa ni kwa sababu haya ni mafunzo na urahisi ndio jambo kuu la kuzingatia.

## Hitimisho: Ni chini ya masharti gani mbinu hii inafaa? {#conclusion}

Kwa hivyo, sasa unajua jinsi ya kuandika mchezo na seva inayohifadhi hali ya siri ambayo haipaswi kuwa mnyororoni. Lakini unapaswa kufanya hivyo katika hali gani? Kuna mambo mawili makuu ya kuzingatia.

- _Mchezo unaoendelea kwa muda mrefu_: [Kama ilivyotajwa hapo juu](#why-zero-knowledge), katika mchezo mfupi unaweza tu kuchapisha hali mara tu mchezo unapokwisha na kufanya kila kitu kihakikiwe wakati huo. Lakini hilo si chaguo wakati mchezo unachukua muda mrefu au usiojulikana, na hali inahitaji kubaki siri.

- _Kiasi fulani cha uwekaji kati kinakubalika_: Uthibitisho wa maarifa-sifuri unaweza kuhakiki uadilifu, kwamba chombo hakighushi matokeo. Kile usichoweza kufanya ni kuhakikisha kwamba chombo hicho bado kitapatikana na kujibu ujumbe. Katika hali ambapo upatikanaji pia unahitaji kuwa uliogatuliwa, uthibitisho wa maarifa-sifuri sio suluhisho tosha, na unahitaji [ukokotoaji wa pande nyingi](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

### Shukrani {#acknowledgements}

- Alvaro Alonso alisoma rasimu ya makala haya na kufafanua baadhi ya kutoelewa kwangu kuhusu Zokrates.

Makosa yoyote yaliyosalia ni jukumu langu.