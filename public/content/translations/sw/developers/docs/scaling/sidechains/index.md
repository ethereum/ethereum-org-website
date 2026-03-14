---
title: Minyororo ya pembeni
description: Utangulizi wa sidechains kama suluhisho la kuongeza ukubwa linalotumiwa sasa na jumuiya ya Ethereum.
lang: sw
sidebarDepth: 3
---

Sidechain ni mnyororo wa bloku tofauti unaofanya kazi bila kutegemea Ethereum na umeunganishwa na Mtandao Mkuu wa Ethereum kwa daraja la njia mbili. Sidechains zinaweza kuwa na vigezo tofauti vya bloku na [algoriti za makubaliano](/developers/docs/consensus-mechanisms/), ambazo mara nyingi zimeundwa kwa ajili ya uchakataji bora wa miamala. Hata hivyo, kutumia sidechain kuna hasara zake, kwa kuwa hairithi sifa za usalama za Ethereum. Tofauti na [suluhu za kuongeza ukubwa za safu ya 2](/layer-2/), sidechains hazichapishi mabadiliko ya hali na data ya miamala kwenye Mtandao Mkuu wa Ethereum.

Sidechains pia huacha baadhi ya vipimo vya ugatuaji au usalama ili kufikia uwezo wa juu wa kuchakata ([scalability trilemma](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Hata hivyo, Ethereum imejitolea kuongeza ukubwa bila kuathiri ugatuaji na usalama.

## Sidechains hufanyaje kazi? {#how-do-sidechains-work}

Sidechains ni minyororo ya bloku huru, yenye historia tofauti, ramani za maendeleo, na mazingatio ya usanifu. Ingawa sidechain inaweza kuwa na mfanano wa juu juu na Ethereum, ina sifa kadhaa za kipekee.

### Algoriti za makubaliano {#consensus-algorithms}

Moja ya sifa zinazofanya sidechains kuwa za kipekee (yaani, tofauti na Ethereum) ni algoriti ya makubaliano inayotumika. Sidechains hazitegemei Ethereum kwa makubaliano na zinaweza kuchagua itifaki mbadala za makubaliano zinazokidhi mahitaji yao. Baadhi ya mifano ya algoriti za makubaliano zinazotumiwa kwenye sidechains ni pamoja na:

- [Uthibitisho wa Mamlaka](/developers/docs/consensus-mechanisms/poa/)
- [Uthibitisho wa hisa uliokabidhiwa](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Ustahimilivu wa kosa la Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Kama Ethereum, sidechains zina nodi za kuthibitisha ambazo huhakiki na kuchakata miamala, huzalisha bloku, na huhifadhi hali ya mnyororo wa bloku. Wathibitishaji pia wanawajibika kwa kudumisha makubaliano kwenye mtandao na kuulinda dhidi ya mashambulizi hasidi.

#### Vigezo vya bloku {#block-parameters}

Ethereum inaweka vikomo kwenye [muda wa bloku](/developers/docs/blocks/#block-time) (yaani, muda unaochukua kuzalisha bloku mpya) na [ukubwa wa bloku](/developers/docs/blocks/#block-size) (yaani, kiasi cha data kilichomo kwenye kila bloku kinachopimwa kwa gesi). Kinyume chake, sidechains mara nyingi hutumia vigezo tofauti, kama vile muda mfupi wa bloku na vikomo vya juu vya gesi, ili kufikia uwezo wa juu wa kuchakata, miamala ya haraka, na ada za chini.

Ingawa hii ina faida fulani, ina athari muhimu kwa ugatuaji na usalama wa mtandao. Vigezo vya bloku, kama vile muda mfupi wa bloku na ukubwa mkubwa wa bloku, huongeza ugumu wa kuendesha nodi kamili—na kuacha "supernodes" chache zikiwajibika kwa kuulinda mnyororo. Katika hali kama hiyo, uwezekano wa wathibitishaji kula njama au uchukuaji hasidi wa mnyororo huongezeka.

Ili minyororo ya bloku iongeze ukubwa bila kudhuru ugatuaji, uendeshaji wa nodi lazima uwe wazi kwa kila mtu—sio lazima wahusika wenye maunzi maalum. Hii ndiyo sababu jitihada zinaendelea ili kuhakikisha kila mtu anaweza [kuendesha nodi kamili](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) kwenye mtandao wa Ethereum.

### Upatanifu wa EVM {#evm-compatibility}

Baadhi ya sidechains zinapatana na EVM na zinaweza kutekeleza mikataba iliyotengenezwa kwa ajili ya [Mashine ya Mtandaoni ya Ethereum (EVM)](/developers/docs/evm/). Sidechains zinazopatana na EVM zinaauni mikataba-erevu [iliyoandikwa kwa Solidity](/developers/docs/smart-contracts/languages/), pamoja na lugha nyingine za mikataba-erevu za EVM, ambayo ina maana kwamba mikataba-erevu iliyoandikwa kwa ajili ya Mtandao Mkuu wa Ethereum pia itafanya kazi kwenye sidechains zinazopatana na EVM.

Hii ina maana kwamba ikiwa unataka kutumia [mfumo mtawanyo wa kimamlaka](/developers/docs/dapps/) yako kwenye sidechain, ni suala la kusambaza [mkataba-erevu](/developers/docs/smart-contracts/) wako kwenye sidechain hii. Inaonekana, inahisika, na inafanya kazi kama Mtandao Mkuu—unaandika mikataba kwa Solidity, na kuingiliana na mnyororo kupitia RPC za sidechains.

Kwa sababu sidechains zinapatana na EVM, zinachukuliwa kuwa [suluhisho muhimu la kuongeza ukubwa](/developers/docs/scaling/) kwa mfumo mtawanyo wa kimamlaka asilia za Ethereum. Ukiwa na mfumo mtawanyo wa kimamlaka wako kwenye sidechain, watumiaji wanaweza kufurahia ada za chini za gesi na miamala ya haraka, hasa ikiwa Mtandao Mkuu una msongamano.

Hata hivyo, kama ilivyoelezwa hapo awali, kutumia sidechain kuna hasara kubwa. Kila sidechain inawajibika kwa usalama wake na hairithi sifa za usalama za Ethereum. Hii huongeza uwezekano wa tabia hasidi ambayo inaweza kuathiri watumiaji wako au kuweka fedha zao hatarini.

### Uhamisho wa mali {#asset-movement}

Ili mnyororo wa bloku tofauti uwe sidechain ya Mtandao Mkuu wa Ethereum, unahitaji uwezo wa kuwezesha uhamishaji wa mali kutoka na kwenda kwenye Mtandao Mkuu wa Ethereum. Uwezo huu wa kuingiliana na Ethereum unafikiwa kwa kutumia daraja la mnyororo wa bloku. [Madaraja](/bridges/) hutumia mikataba-erevu iliyosambazwa kwenye Mtandao Mkuu wa Ethereum na sidechain ili kudhibiti uunganishaji wa fedha kati yao.

Ingawa madaraja huwasaidia watumiaji kuhamisha fedha kati ya Ethereum na sidechain, mali haihamishiwi kimwili kati ya minyororo hiyo miwili. Badala yake, taratibu zinazohusisha kawaida utengenezaji na uchomaji hutumiwa kwa ajili ya kuhamisha thamani kati ya minyororo. Zaidi kuhusu [jinsi madaraja yanavyofanya kazi](/developers/docs/bridges/#how-do-bridges-work).

## Faida na hasara za sidechains {#pros-and-cons-of-sidechains}

| Faida                                                                                                                                                                       | Hasara                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Teknolojia inayosimamia sidechains imeimarika na inanufaika kutokana na utafiti mpana na maboresho katika usanifu.                                          | Sidechains huacha baadhi ya vipimo vya ugatuaji na ukosefu wa kuaminiana kwa ajili ya kuongeza ukubwa.                                                                         |
| Sidechains zinaauni ukokotoaji wa jumla na zinatoa upatanifu wa EVM (zinaweza kuendesha mfumo mtawanyo wa kimamlaka asilia za Ethereum). | Sidechain hutumia utaratibu tofauti wa makubaliano na hainufaiki na dhamana za usalama za Ethereum.                                                                            |
| Sidechains hutumia mifumo tofauti ya makubaliano ili kuchakata miamala kwa ufanisi na kupunguza ada za miamala kwa watumiaji.                               | Sidechains zinahitaji dhana za juu za uaminifu (k.m., akidi ya wathibitishaji hasidi wa sidechain inaweza kufanya ulaghai). |
| Sidechains zinazopatana na EVM huruhusu mfumo mtawanyo wa kimamlaka kupanua mfumo wao wa ikolojia.                                                          |                                                                                                                                                                                                |

### Tumia Sidechains {#use-sidechains}

Miradi mingi hutoa utekelezaji wa sidechains ambazo unaweza kuunganisha kwenye mfumo mtawanyo wa kimamlaka zako:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (zamani xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Masomo zaidi {#further-reading}

- [Kuongeza ukubwa wa mfumo mtawanyo wa kimamlaka za Ethereum kupitia Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
