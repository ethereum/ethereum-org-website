---
title: Validium
description: Utangulizi wa Validium kama suluhisho la kuongeza ukubwa linalotumika sasa na jumuiya ya Ethereum.
lang: sw
sidebarDepth: 3
---

Validium ni [suluhisho la kuongeza ukubwa](/developers/docs/scaling/) ambalo hutekeleza uadilifu wa miamala kwa kutumia ithibati za uhalali kama vile [ZK-rollups](/developers/docs/scaling/zk-rollups/), lakini haihifadhi data ya miamala kwenye Mtandao Mkuu wa Ethereum. Ingawa upatikanaji wa data nje ya mnyororo una changamoto zake, unaweza kusababisha maboresho makubwa katika kuongeza ukubwa (validiums zinaweza kuchakata [miamala ~9,000, au zaidi, kwa sekunde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa ukurasa wetu kuhusu [kuongeza ukubwa wa Ethereum](/developers/docs/scaling/) na [safu ya 2](/layer-2).

## Validium ni nini? {#what-is-validium}

Validiums ni suluhu za kuongeza ukubwa zinazotumia upatikanaji wa data na ukokotoaji nje ya mnyororo zilizoundwa kuboresha upitishaji kwa kuchakata miamala nje ya Mtandao Mkuu wa Ethereum. Kama vile zero-knowledge rollups (ZK-rollups), validiums huchapisha [ithibati za zero-knowledge](/glossary/#zk-proof) ili kuthibitisha miamala ya nje ya mnyororo kwenye Ethereum. Hii huzuia mabadiliko ya hali batili na huongeza dhamana ya usalama ya mnyororo wa validium.

"Ithibati hizi za uhalali" zinaweza kuja kwa njia ya ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) au ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Zaidi kuhusu [ithibati za zero-knowledge](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Fedha za watumiaji wa validium zinadhibitiwa na mkataba-erevu kwenye Ethereum. Validiums hutoa uondoaji wa pesa karibu na papo hapo, kama vile ZK-rollups; mara tu ithibati ya uhalali kwa ombi la uondoaji imethibitishwa kwenye Mtandao Mkuu, watumiaji wanaweza kutoa fedha kwa kutoa [ithibati za Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Ithibati ya Merkle huthibitisha ujumuishwaji wa muamala wa uondoaji wa mtumiaji katika kundi la miamala lililothibitishwa, ikiruhusu mkataba wa kwenye mnyororo kuchakata uondoaji huo.

Hata hivyo, watumiaji wa validium wanaweza kugandishiwa fedha zao na uondoaji kuzuiwa. Hii inaweza kutokea ikiwa wasimamizi wa upatikanaji wa data kwenye mnyororo wa validium watawazuilia watumiaji data ya hali ya nje ya mnyororo. Bila ufikiaji wa data ya miamala, watumiaji hawawezi kukokotoa ithibati ya Merkle inayohitajika kuthibitisha umiliki wa fedha na kutekeleza uondoaji.

Huu ndio tofauti kuu kati ya validiums na ZK-rollups—msimamo wao kwenye wigo wa upatikanaji wa data. Suluhisho zote mbili zinashughulikia uhifadhi wa data kwa njia tofauti, jambo ambalo lina athari kwa usalama na kutohitaji uaminifu.

## Je, validiums huingiliana vipi na Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums ni itifaki za kuongeza ukubwa zilizojengwa juu ya mnyororo uliopo wa Ethereum. Ingawa hutekeleza miamala nje ya mnyororo, mnyororo wa validium unasimamiwa na mkusanyiko wa mikataba-erevu iliyotumwa kwenye Mtandao Mkuu ikijumuisha:

1. **Mkataba wa kuthibitisha**: Mkataba wa kuthibitisha huthibitisha uhalali wa ithibati zilizowasilishwa na mwendeshaji wa validium wakati wa kufanya masasisho ya hali. Hii inajumuisha ithibati za uhalali zinazothibitisha usahihi wa miamala ya nje ya mnyororo na ithibati za upatikanaji wa data zinazothibitisha uwepo wa data ya miamala ya nje ya mnyororo.

2. **Mkataba mkuu**: Mkataba mkuu huhifadhi ahadi za hali (mizizi ya Merkle) zilizowasilishwa na wazalishaji wa bloku na husasisha hali ya validium mara tu ithibati ya uhalali inapothibitishwa kwenye mnyororo. Mkataba huu pia huchakata amana na uondoaji kutoka kwa mnyororo wa validium.

Validiums pia hutegemea mnyororo mkuu wa Ethereum kwa yafuatayo:

### Marekebisho {#settlement}

Miamala inayotekelezwa kwenye validium haiwezi kuthibitishwa kikamilifu hadi mnyororo mkuu utakapothibitisha uhalali wake. Shughuli zote zinazofanywa kwenye validium lazima hatimaye zirekebishwe kwenye Mtandao Mkuu. Mnyororo wa bloku wa Ethereum pia hutoa "dhamana za marekebisho" kwa watumiaji wa validium, ikimaanisha miamala ya nje ya mnyororo haiwezi kubadilishwa au kurekebishwa mara tu inapowekwa kwenye mnyororo.

### Usalama {#security}

Ethereum, ikifanya kazi kama safu ya marekebisho, pia inahakikisha uhalali wa mabadiliko ya hali kwenye validium. Miamala ya nje ya mnyororo inayotekelezwa kwenye mnyororo wa validium huthibitishwa kupitia mkataba-erevu kwenye safu ya msingi ya Ethereum.

Ikiwa mkataba wa kuthibitisha kwenye mnyororo utaona ithibati ni batili, miamala hukataliwa. Hii inamaanisha waendeshaji lazima watimize masharti ya uhalali yanayotekelezwa na itifaki ya Ethereum kabla ya kusasisha hali ya validium.

## Je, validium inafanyaje kazi? {#how-does-validium-work}

### Miamala {#transactions}

Watumiaji huwasilisha miamala kwa mwendeshaji, nodi inayohusika na kutekeleza miamala kwenye mnyororo wa validium. Baadhi ya validiums zinaweza kutumia mwendeshaji mmoja kutekeleza mnyororo au kutegemea utaratibu wa [uthibitisho wa hisa (PoS)](/developers/docs/consensus-mechanisms/pos/) kwa waendeshaji wanaozunguka.

Mwendeshaji hukusanya miamala katika kundi na kuituma kwenye sakiti ya kuthibitisha kwa ajili ya uthibitisho. Sakiti ya kuthibitisha inakubali kundi la miamala (na data nyingine muhimu) kama pembejeo na hutoa ithibati ya uhalali inayothibitisha kuwa shughuli zilifanywa kwa usahihi.

### Ahadi za hali {#state-commitments}

Hali ya validium huwekwa hashi kama mti wa Merkle na mzizi huhifadhiwa kwenye mkataba mkuu kwenye Ethereum. Mzizi wa Merkle, unaojulikana pia kama mzizi wa hali, hufanya kazi kama ahadi ya kriptografia kwa hali ya sasa ya akaunti na salio kwenye validium.

Ili kufanya sasisho la hali, mwendeshaji lazima akokotoe mzizi mpya wa hali (baada ya kutekeleza miamala) na kuiwasilisha kwa mkataba wa kwenye mnyororo. Ikiwa ithibati ya uhalali itakaguliwa, hali iliyopendekezwa inakubaliwa na validium hubadilika na kuwa mzizi mpya wa hali.

### Amana na uondoaji {#deposits-and-withdrawals}

Watumiaji huhamisha fedha kutoka Ethereum hadi validium kwa kuweka ETH (au tokeni yoyote inayoendana na ERC) kwenye mkataba wa kwenye mnyororo. Mkataba hupeleka tukio la amana kwa validium nje ya mnyororo, ambapo anwani ya mtumiaji hupewa kiasi sawa na amana yake. Mwendeshaji pia hujumuisha muamala huu wa amana katika kundi jipya.

Ili kurudisha fedha kwenye Mtandao Mkuu, mtumiaji wa validium huanzisha muamala wa uondoaji na kuwasilisha kwa mwendeshaji ambaye huthibitisha ombi la uondoaji na kulijumuisha kwenye kundi. Mali za mtumiaji kwenye mnyororo wa validium pia huharibiwa kabla ya kuweza kutoka kwenye mfumo. Mara tu ithibati ya uhalali inayohusishwa na kundi inapothibitishwa, mtumiaji anaweza kupiga simu mkataba mkuu ili kuondoa salio la amana yake ya awali.

Kama utaratibu wa kuzuia udhibiti, itifaki ya validium inaruhusu watumiaji kuondoa moja kwa moja kutoka kwa mkataba wa validium bila kupitia kwa mwendeshaji. Katika kesi hii, watumiaji wanahitaji kutoa ithibati ya Merkle kwa mkataba wa kuthibitisha ikionyesha ujumuishwaji wa akaunti katika mzizi wa hali. Ikiwa ithibati itakubaliwa, mtumiaji anaweza kupiga simu kazi ya uondoaji ya mkataba mkuu ili kutoa fedha zake kutoka kwa validium.

### Uwasilishaji wa kundi {#batch-submission}

Baada ya kutekeleza kundi la miamala, mwendeshaji huwasilisha ithibati ya uhalali inayohusiana na mkataba wa kuthibitisha na kupendekeza mzizi mpya wa hali kwa mkataba mkuu. Ikiwa ithibati ni halali, mkataba mkuu husasisha hali ya validium na kukamilisha matokeo ya miamala katika kundi.

Tofauti na ZK-rollup, wazalishaji wa bloku kwenye validium hawahitajiki kuchapisha data ya miamala kwa makundi ya miamala (vichwa vya bloku pekee). Hii inafanya validium kuwa itifaki ya kuongeza ukubwa ya nje ya mnyororo tu, kinyume na itifaki za kuongeza ukubwa "mseto" (yaani, [safu ya 2](/layer-2/)) ambazo huchapisha data ya hali kwenye mnyororo mkuu wa Ethereum kwa kutumia data ya blob, `calldata`, au mchanganyiko wa zote mbili.

### Upatikanaji wa data {#data-availability}

Kama ilivyotajwa, validiums hutumia mtindo wa upatikanaji wa data nje ya mnyororo, ambapo waendeshaji huhifadhi data yote ya miamala nje ya Mtandao Mkuu wa Ethereum. Nyayo ya chini ya data kwenye mnyororo ya Validium inaboresha kuongeza ukubwa (upitishaji hauzuiwi na uwezo wa Ethereum wa kuchakata data) na inapunguza ada za watumiaji (gharama ya kuchapisha data kwenye mnyororo ni ya chini).

Hata hivyo, upatikanaji wa data nje ya mnyororo huleta tatizo: data muhimu kwa ajili ya kuunda au kuthibitisha ithibati za Merkle inaweza isipatikane. Hii inamaanisha watumiaji wanaweza wasiweze kutoa fedha kutoka kwa mkataba wa kwenye mnyororo ikiwa waendeshaji watafanya vitendo vya hasidi.

Suluhisho mbalimbali za validium zinajaribu kutatua tatizo hili kwa kugatua uhifadhi wa data ya hali. Hii inahusisha kuwalazimisha wazalishaji wa bloku kutuma data ya msingi kwa "wasimamizi wa upatikanaji wa data" wanaohusika na kuhifadhi data ya nje ya mnyororo na kuifanya ipatikane kwa watumiaji wanapoiomba.

Wasimamizi wa upatikanaji wa data katika validium huthibitisha upatikanaji wa data kwa miamala ya nje ya mnyororo kwa kutia saini kila kundi la validium. Sahihi hizi huunda aina ya "ithibati ya upatikanaji" ambayo mkataba wa kuthibitisha kwenye mnyororo huikagua kabla ya kuidhinisha masasisho ya hali.

Validiums hutofautiana katika mbinu zao za usimamizi wa upatikanaji wa data. Baadhi hutegemea wahusika wanaoaminika kuhifadhi data ya hali, wakati wengine hutumia wathibitishaji waliopewa nasibu kwa kazi hiyo.

#### Kamati ya upatikanaji wa data (DAC) {#data-availability-committee}

Ili kuhakikisha upatikanaji wa data ya nje ya mnyororo, baadhi ya suluhu za validium huteua kundi la vyombo vinavyoaminika, vinavyojulikana kwa pamoja kama kamati ya upatikanaji wa data (DAC), ili kuhifadhi nakala za hali na kutoa uthibitisho wa upatikanaji wa data. Kamati za DAC ni rahisi kutekeleza na zinahitaji uratibu mdogo kwa kuwa uanachama ni mdogo.

Hata hivyo, watumiaji lazima waamini DAC ili kufanya data ipatikane inapohitajika (k.m., kwa ajili ya kuzalisha ithibati za Merkle). Kuna uwezekano wa wanachama wa kamati za upatikanaji wa data [kuathiriwa na mhusika hasidi](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) ambaye anaweza kuzuia data ya nje ya mnyororo.

[Zaidi kuhusu kamati za upatikanaji wa data katika validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Upatikanaji wa data uliodhaminiwa {#bonded-data-availability}

Validiums nyingine zinahitaji washiriki wanaohusika na kuhifadhi data ya nje ya mtandao kuweka hisa (yaani, kufungia) tokeni katika mkataba-erevu kabla ya kuchukua majukumu yao. Hisa hii hutumika kama "dhamana" ili kuhakikisha tabia ya uaminifu miongoni mwa wasimamizi wa upatikanaji wa data na inapunguza dhana za uaminifu. Ikiwa washiriki hawa watashindwa kuthibitisha upatikanaji wa data, dhamana hupunguzwa.

Katika mpango wa upatikanaji wa data uliodhaminiwa, mtu yeyote anaweza kupewa jukumu la kushikilia data ya nje ya mnyororo mara tu anapotoa hisa inayohitajika. Hii huongeza bwawa la wasimamizi wa upatikanaji wa data wanaostahili, na kupunguza ugatuzi unaoathiri kamati za upatikanaji wa data (DACs). Muhimu zaidi, mbinu hii inategemea motisha za kiuchumi za kripto kuzuia shughuli hasidi, ambayo ni salama zaidi kuliko kuteua wahusika wanaoaminika ili kulinda data ya nje ya mtandao katika validium.

[Zaidi kuhusu upatikanaji wa data uliodhaminiwa katika validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions na validium {#volitions-and-validium}

Validiums hutoa faida nyingi lakini huja na changamoto (hasa, upatikanaji wa data). Lakini, kama ilivyo kwa suluhu nyingi za kuongeza ukubwa, validiums zinafaa kwa matumizi maalum—ndiyo maana volitions ziliundwa.

Volitions huchanganya ZK-rollup na mnyororo wa validium na huruhusu watumiaji kubadili kati ya suluhu mbili za kuongeza ukubwa. Kwa kutumia volitions, watumiaji wanaweza kunufaika na upatikanaji wa data nje ya mnyororo wa validium kwa miamala fulani, huku wakibaki na uhuru wa kubadili hadi suluhisho la upatikanaji wa data kwenye mnyororo (ZK-rollup) ikihitajika. Hii kimsingi huwapa watumiaji uhuru wa kuchagua changamoto kulingana na mazingira yao ya kipekee.

Exchange isiyogatuliwa (DEX) inaweza kupendelea kutumia miundombinu inayoweza kuongezeka na ya faragha ya validium kwa biashara za thamani ya juu. Inaweza pia kutumia ZK-rollup kwa watumiaji wanaotaka dhamana za juu za usalama na kutohitaji uaminifu za ZK-rollup.

## Upatanifu wa Validiums na EVM {#validiums-and-evm-compatibility}

Kama ZK-rollups, validiums zinafaa zaidi kwa programu rahisi, kama vile ubadilishanaji wa tokeni na malipo. Kusaidia ukokotoaji wa jumla na utekelezaji wa mikataba-erevu miongoni mwa validiums ni vigumu kutekeleza, kutokana na gharama kubwa ya kuthibitisha maagizo ya [EVM](/developers/docs/evm/) katika sakiti ya ithibati ya zero-knowledge.

Baadhi ya miradi ya validium hujaribu kukwepa tatizo hili kwa kuandaa lugha zinazoendana na EVM (k.m., Solidity, Vyper) ili kuunda bytecode maalum iliyoboreshwa kwa uthibitisho mzuri. Upungufu wa mbinu hii ni kwamba VM mpya zinazofaa kwa ithibati za zero-knowledge zinaweza zisiunge mkono opcodes muhimu za EVM, na wasanidi programu wanapaswa kuandika moja kwa moja katika lugha ya kiwango cha juu kwa uzoefu bora. Hii inaleta matatizo zaidi: inawalazimisha wasanidi programu kujenga mfumo mtawanyo wa kimamlaka na rundo jipya kabisa la usanidi na inavunja upatanifu na miundombinu ya sasa ya Ethereum.

Hata hivyo, baadhi ya timu zinajaribu kuboresha opcodes zilizopo za EVM kwa ajili ya sakiti za uthibitisho wa ZK. Hii itasababisha uundaji wa Mashine Halisi ya Ethereum ya Zero-Knowledge (zkEVM), VM inayoendana na EVM ambayo hutoa ithibati ili kuthibitisha usahihi wa utekelezaji wa programu. Kwa zkEVM, minyororo ya validium inaweza kutekeleza mikataba-erevu nje ya mnyororo na kuwasilisha ithibati za uhalali ili kuthibitisha ukokotoaji wa nje ya mnyororo (bila kulazimika kuitekeleza tena) kwenye Ethereum.

[Zaidi kuhusu zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Je, validiums huongezaje ukubwa wa Ethereum? {#scaling-ethereum-with-validiums}

### 1. Uhifadhi wa data nje ya mnyororo {#offchain-data-storage}

Miradi ya kuongeza ukubwa ya Safu ya 2, kama vile optimistic rollups na ZK-rollups, hubadilisha uongezaji usio na kikomo wa itifaki za kuongeza ukubwa za nje ya mnyororo (k.m., [Njozi](/developers/docs/scaling/plasma/)) kwa usalama kwa kuchapisha baadhi ya data za miamala kwenye L1. Lakini hii inamaanisha sifa za kuongeza ukubwa za rollups zimezuiwa na kipimo data kwenye Mtandao Mkuu wa Ethereum ([ugawanyaji wa data](/roadmap/danksharding/) unapendekeza kuboresha uwezo wa uhifadhi wa data wa Ethereum kwa sababu hii).

Validiums hufikia kuongeza ukubwa kwa kuweka data yote ya miamala nje ya mnyororo na huweka tu ahadi za hali (na ithibati za uhalali) wakati wa kupeleka masasisho ya hali kwenye mnyororo mkuu wa Ethereum. Hata hivyo, uwepo wa ithibati za uhalali huipa validiums dhamana za juu za usalama kuliko suluhu nyingine za kuongeza ukubwa za nje ya mnyororo, ikiwa ni pamoja na Njozi na [sidechains](/developers/docs/scaling/sidechains/). Kwa kupunguza kiasi cha data ambacho Ethereum inapaswa kuchakata kabla ya kuthibitisha miamala ya nje ya mnyororo, miundo ya validium huongeza sana upitishaji kwenye Mtandao Mkuu.

### 2. Ithibati za kujirudia {#recursive-proofs}

Ithibati ya kujirudia ni ithibati ya uhalali inayothibitisha uhalali wa ithibati nyingine. "Ithibati hizi za ithibati" huzalishwa kwa kukusanya ithibati nyingi kwa kujirudia hadi ithibati moja ya mwisho inayothibitisha ithibati zote za awali itengenezwe. Ithibati za kujirudia huongeza kasi ya usindikaji wa mnyororo wa bloku kwa kuongeza idadi ya miamala inayoweza kuthibitishwa kwa kila ithibati ya uhalali.

Kwa kawaida, kila ithibati ya uhalali ambayo mwendeshaji wa validium huiwasilisha kwa Ethereum kwa uthibitisho huthibitisha uadilifu wa bloku moja. Wakati ithibati moja ya kujirudia inaweza kutumika kuthibitisha uhalali wa bloku kadhaa za validium kwa wakati mmoja—hii inawezekana kwani sakiti ya kuthibitisha inaweza kukusanya ithibati kadhaa za bloku kwa kujirudia na kuwa ithibati moja ya mwisho. Ikiwa mkataba wa kuthibitisha kwenye mnyororo utakubali ithibati ya kujirudia, bloku zote za msingi hukamilishwa mara moja.

## Faida na hasara za validium {#pros-and-cons-of-validium}

| Faida                                                                                                                                                     | Hasara                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ithibati za uhalali hutekeleza uadilifu wa miamala ya nje ya mnyororo na kuzuia waendeshaji kukamilisha masasisho ya hali batili.         | Uzalishaji wa ithibati za uhalali unahitaji maunzi maalum, jambo linaloleta hatari ya ugatuzi.                                                                                                       |
| Huongeza ufanisi wa mtaji kwa watumiaji (hakuna ucheleweshaji wa kutoa fedha kurudi Ethereum)                                          | Usaidizi mdogo kwa ukokotoaji wa jumla/mikataba-erevu; lugha maalum zinahitajika kwa usanidi.                                                                                                        |
| Haiathiriwi na mashambulizi fulani ya kiuchumi yanayokabili mifumo inayotegemea uthibitisho wa ulaghai katika matumizi ya thamani ya juu. | Nguvu kubwa ya ukokotoaji inahitajika kuzalisha ithibati za ZK; haina gharama nafuu kwa programu za upitishaji wa chini.                                                                             |
| Hupunguza ada za gesi kwa watumiaji kwa kutoweka calldata kwenye Mtandao Mkuu wa Ethereum.                                                | Muda wa polepole wa ukamilisho wa kihisia (dakika 10-30 kuzalisha ithibati ya ZK) lakini haraka zaidi kufikia ukamilisho kamili kwa sababu hakuna ucheleweshaji wa muda wa mzozo. |
| Inafaa kwa matumizi maalum, kama vile biashara au michezo ya mnyororo wa bloku inayotanguliza faragha ya miamala na kuongeza ukubwa.      | Watumiaji wanaweza kuzuiwa kutoa fedha kwa kuwa uzalishaji wa ithibati za umiliki za Merkle unahitaji data ya nje ya mnyororo kupatikana wakati wote.                                                |
| Upatikanaji wa data nje ya mnyororo hutoa viwango vya juu vya upitishaji na huongeza kuongezeka kwa ukubwa.                               | Mtindo wa usalama unategemea dhana za uaminifu na motisha za kiuchumi za kripto, tofauti na ZK-rollups, ambazo hutegemea tu mifumo ya usalama ya kriptografia.                                       |

### Tumia Validium/Volitions {#use-validium-and-volitions}

Miradi mingi hutoa utekelezaji wa Validium na volitions ambayo unaweza kuiunganisha katika mfumo mtawanyo wa kimamlaka wako:

**StarkWare StarkEx** - _StarkEx ni suluhisho la kuongeza ukubwa la Safu ya 2 (L2) ya Ethereum ambalo linategemea ithibati za uhalali. Inaweza kufanya kazi katika modi za upatikanaji wa data za ZK-Rollup au Validium._

- [Nyaraka](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Tovuti](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter ni itifaki ya kuongeza ukubwa ya Safu ya 2 inayoshughulikia upatikanaji wa data kwa mbinu mseto inayochanganya mawazo ya zkRollup na ugawanyaji. Inaweza kusaidia idadi yoyote ya shards, kila moja ikiwa na sera yake ya upatikanaji wa data._

- [Blogu](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Nyaraka](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Tovuti](https://zksync.io/)

## Masomo zaidi {#further-reading}

- [Validium na Safu ya 2 Mbili-kwa-Mbili — Toleo Na. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups dhidi ya Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition na Wigo Unaoibuka wa Upatikanaji wa Data](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, na Volitions: Jifunze Kuhusu Suluhu Moto Zaidi za Kuongeza Ukubwa za Ethereum](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Mwongozo wa Vitendo kwa Unda-mpya za Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
