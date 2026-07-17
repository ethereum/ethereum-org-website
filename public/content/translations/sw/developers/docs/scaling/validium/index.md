---
title: Validium
description: Utangulizi wa Validium kama suluhisho la kuongeza viwango linalotumiwa kwa sasa na jamii ya Ethereum.
lang: sw
sidebarDepth: 3
---

Validium ni [suluhisho la kuongeza viwango](/developers/docs/scaling/) ambalo husimamia uadilifu wa miamala kwa kutumia uthibitisho wa uhalali kama [ZK-rollups](/developers/docs/scaling/zk-rollups/), lakini haihifadhi data za muamala kwenye Mtandao Mkuu wa [Ethereum](/). Ingawa upatikanaji wa data nje ya mnyororo unaleta mabadilishano, unaweza kusababisha maboresho makubwa katika uwezo wa kuongeza viwango (Validium zinaweza kuchakata [miamala ~9,000, au zaidi, kwa sekunde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa ukurasa wetu kuhusu [kuongeza viwango vya Ethereum](/developers/docs/scaling/) na [tabaka la 2 (l2)](/layer-2).

## Validium ni nini? {#what-is-validium}

Validium ni masuluhisho ya kuongeza viwango yanayotumia upatikanaji wa data na ukokotoaji nje ya mnyororo yaliyoundwa kuboresha uwezo wa upitishaji kwa kuchakata miamala nje ya Mtandao Mkuu wa Ethereum. Kama mikusanyiko ya sifuri-maarifa (ZK-rollups), Validium huchapisha [uthibitisho wa maarifa-sifuri](/glossary/#zk-proof) ili kuthibitisha miamala ya nje ya mnyororo kwenye Ethereum. Hii inazuia mabadiliko batili ya hali na kuimarisha uhakikisho wa usalama wa mnyororo wa Validium.

Huu "uthibitisho wa uhalali" unaweza kuja katika mfumo wa ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) au ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Zaidi kuhusu [uthibitisho wa maarifa-sifuri](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Fedha zinazomilikiwa na watumiaji wa Validium zinadhibitiwa na mkataba mahiri kwenye Ethereum. Validium hutoa utoaji wa karibu na papo hapo, sawa na vile ZK-rollups hufanya; mara tu uthibitisho wa uhalali wa ombi la utoaji unapothibitishwa kwenye Mtandao Mkuu, watumiaji wanaweza kutoa fedha kwa kutoa [ushahidi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Ushahidi wa Merkle unathibitisha kujumuishwa kwa muamala wa utoaji wa mtumiaji katika kundi la miamala iliyothibitishwa, kuruhusu mkataba wa mnyororoni kuchakata utoaji.

Hata hivyo, watumiaji wa Validium wanaweza kufungiwa fedha zao na utoaji kuzuiwa. Hili linaweza kutokea ikiwa wasimamizi wa upatikanaji wa data kwenye mnyororo wa Validium watazuia data za hali ya nje ya mnyororo kwa watumiaji. Bila ufikiaji wa data za muamala, watumiaji hawawezi kukokotoa ushahidi wa Merkle unaohitajika kuthibitisha umiliki wa fedha na kutekeleza utoaji.

Hii ndiyo tofauti kuu kati ya Validium na ZK-rollups—nafasi zao kwenye wigo wa upatikanaji wa data. Masuluhisho yote mawili yanashughulikia uhifadhi wa data kwa njia tofauti, jambo ambalo lina athari kwa usalama na hali ya kutohitaji kuamini.

## Validium zinaingilianaje na Ethereum? {#how-do-validiums-interact-with-ethereum}

Validium ni itifaki za kuongeza viwango zilizojengwa juu ya mnyororo uliopo wa Ethereum. Ingawa inatekeleza miamala nje ya mnyororo, mnyororo wa Validium unasimamiwa na mkusanyiko wa mikataba mahiri iliyosambazwa kwenye Mtandao Mkuu ikijumuisha:

1. **Mkataba wa mhakiki**: Mkataba wa mhakiki unathibitisha uhalali wa uthibitisho uliowasilishwa na mwendeshaji wa Validium wakati wa kufanya masasisho ya hali. Hii inajumuisha uthibitisho wa uhalali unaothibitisha usahihi wa miamala ya nje ya mnyororo na uthibitisho wa upatikanaji wa data unaothibitisha uwepo wa data za muamala wa nje ya mnyororo.

2. **Mkataba mkuu**: Mkataba mkuu unahifadhi ufungamanisho wa hali (mzizi wa Merkle) uliowasilishwa na wazalishaji wa kitalu na kusasisha hali ya Validium mara tu uthibitisho wa uhalali unapothibitishwa mnyororoni. Mkataba huu pia huchakata amana na utoaji kutoka kwenye mnyororo wa Validium.

Validium pia hutegemea mnyororo mkuu wa Ethereum kwa yafuatayo:

### Ukamilishaji {#settlement}

Miamala inayotekelezwa kwenye Validium haiwezi kuthibitishwa kikamilifu hadi mnyororo mzazi uthibitishe uhalali wake. Biashara zote zinazofanywa kwenye Validium lazima hatimaye zikamilishwe kwenye Mtandao Mkuu. Mnyororo wa vitalu wa Ethereum pia hutoa "dhamana za ukamilishaji" kwa watumiaji wa Validium, ikimaanisha miamala ya nje ya mnyororo haiwezi kubadilishwa au kugeuzwa mara tu inapofungamanishwa mnyororoni.

### Usalama {#security}

Ethereum, ikifanya kazi kama tabaka la ukamilishaji, pia inahakikisha uhalali wa mabadiliko ya hali kwenye Validium. Miamala ya nje ya mnyororo inayotekelezwa kwenye mnyororo wa Validium inathibitishwa kupitia mkataba mahiri kwenye tabaka la msingi la Ethereum.

Ikiwa mkataba wa mhakiki wa mnyororoni utaona uthibitisho ni batili, miamala inakataliwa. Hii inamaanisha waendeshaji lazima watimize masharti ya uhalali yanayotekelezwa na itifaki ya Ethereum kabla ya kusasisha hali ya Validium.

## Validium inafanyaje kazi? {#how-does-validium-work}

### Miamala {#transactions}

Watumiaji huwasilisha miamala kwa mwendeshaji, nodi inayohusika na kutekeleza miamala kwenye mnyororo wa Validium. Baadhi ya Validium zinaweza kutumia mwendeshaji mmoja kutekeleza mnyororo au kutegemea utaratibu wa [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/) kwa kuzungusha waendeshaji.

Mwendeshaji hukusanya miamala katika kundi na kuituma kwenye saketi ya kuthibitisha kwa ajili ya uthibitisho. Saketi ya kuthibitisha inakubali kundi la miamala (na data nyingine husika) kama ingizo na kutoa uthibitisho wa uhalali unaothibitisha kwamba shughuli zilifanywa kwa usahihi.

### Ufungamanisho wa hali {#state-commitments}

Hali ya Validium inafanyiwa heshi kama mti wa Merkle na mzizi kuhifadhiwa katika mkataba mkuu kwenye Ethereum. Mzizi wa Merkle, unaojulikana pia kama mzizi wa hali, hufanya kazi kama ufungamanisho wa kificho kwa hali ya sasa ya akaunti na salio kwenye Validium.

Ili kufanya sasisho la hali, mwendeshaji lazima akokotoe mzizi mpya wa hali (baada ya kutekeleza miamala) na kuuwasilisha kwenye mkataba wa mnyororoni. Ikiwa uthibitisho wa uhalali ni sahihi, hali iliyopendekezwa inakubaliwa na Validium inabadilika kwenda kwenye mzizi mpya wa hali.

### Amana na utoaji {#deposits-and-withdrawals}

Watumiaji huhamisha fedha kutoka Ethereum kwenda kwenye Validium kwa kuweka amana ya ETH (au tokeni yoyote inayoendana na ERC) katika mkataba wa mnyororoni. Mkataba huo hupeleka matukio ya amana kwenye Validium nje ya mnyororo, ambapo anwani ya mtumiaji inawekewa kiasi sawa na amana yao. Mwendeshaji pia hujumuisha muamala huu wa amana katika kundi jipya.

Ili kurudisha fedha kwenye Mtandao Mkuu, mtumiaji wa Validium huanzisha muamala wa utoaji na kuuwasilisha kwa mwendeshaji ambaye anathibitisha ombi la utoaji na kulijumuisha katika kundi. Mali za mtumiaji kwenye mnyororo wa Validium pia huharibiwa kabla ya kuweza kujitoa kwenye mfumo. Mara tu uthibitisho wa uhalali unaohusishwa na kundi unapothibitishwa, mtumiaji anaweza kuita mkataba mkuu ili kutoa salio la amana yao ya awali.

Kama utaratibu wa kupinga udhibiti, itifaki ya Validium inaruhusu watumiaji kutoa moja kwa moja kutoka kwenye mkataba wa Validium bila kupitia kwa mwendeshaji. Katika kesi hii, watumiaji wanahitaji kutoa ushahidi wa Merkle kwa mkataba wa mhakiki unaoonyesha kujumuishwa kwa akaunti katika mzizi wa hali. Ikiwa uthibitisho unakubaliwa, mtumiaji anaweza kuita kitendakazi cha utoaji cha mkataba mkuu ili kutoa fedha zao kutoka kwenye Validium.

### Uwasilishaji wa kundi {#batch-submission}

Baada ya kutekeleza kundi la miamala, mwendeshaji huwasilisha uthibitisho wa uhalali unaohusishwa kwenye mkataba wa mhakiki na kupendekeza mzizi mpya wa hali kwenye mkataba mkuu. Ikiwa uthibitisho ni halali, mkataba mkuu husasisha hali ya Validium na kukamilisha matokeo ya miamala katika kundi.

Tofauti na ZK-rollup, wazalishaji wa kitalu kwenye Validium hawatakiwi kuchapisha data za muamala kwa makundi ya miamala (vichwa vya kitalu pekee). Hii inafanya Validium kuwa itifaki ya kuongeza viwango ya nje ya mnyororo pekee, tofauti na itifaki za kuongeza viwango "mseto" (yaani, [tabaka la 2 (l2)](/layer-2/)) zinazochapisha data za hali kwenye mnyororo mkuu wa Ethereum kwa kutumia data za blobu, `calldata`, au mchanganyiko wa zote mbili.

### Upatikanaji wa data {#data-availability}

Kama ilivyotajwa, Validium hutumia muundo wa upatikanaji wa data nje ya mnyororo, ambapo waendeshaji huhifadhi data zote za muamala nje ya Mtandao Mkuu wa Ethereum. Alama ndogo ya data ya mnyororoni ya Validium inaboresha uwezo wa kuongeza viwango (uwezo wa upitishaji hauzuiliwi na uwezo wa kuchakata data wa Ethereum) na kupunguza ada za watumiaji (gharama ya kuchapisha data mnyororoni ni ndogo).

Hata hivyo, upatikanaji wa data nje ya mnyororo unaleta tatizo: data muhimu kwa ajili ya kuunda au kuthibitisha ushahidi wa Merkle inaweza isipatikane. Hii inamaanisha watumiaji wanaweza kushindwa kutoa fedha kutoka kwenye mkataba wa mnyororoni ikiwa waendeshaji watatenda kwa nia mbaya.

Masuluhisho mbalimbali ya Validium yanajaribu kutatua tatizo hili kwa kugatua uhifadhi wa data za hali. Hii inahusisha kuwalazimisha wazalishaji wa kitalu kutuma data za msingi kwa "wasimamizi wa upatikanaji wa data" wanaohusika na kuhifadhi data za nje ya mnyororo na kuzifanya zipatikane kwa watumiaji wanapoomba.

Wasimamizi wa upatikanaji wa data katika Validium wanathibitisha upatikanaji wa data kwa miamala ya nje ya mnyororo kwa kusaini kila kundi la Validium. Saini hizi zinaunda aina ya "uthibitisho wa upatikanaji" ambao mkataba wa mhakiki wa mnyororoni hukagua kabla ya kuidhinisha masasisho ya hali.

Validium zinatofautiana katika mbinu zao za usimamizi wa upatikanaji wa data. Baadhi hutegemea pande zinazoaminika kuhifadhi data za hali, wakati nyingine hutumia wathibitishaji waliopangwa kwa nasibu kwa kazi hiyo.

#### Kamati ya upatikanaji wa data (DAC) {#data-availability-committee}

Ili kuhakikisha upatikanaji wa data za nje ya mnyororo, baadhi ya masuluhisho ya Validium huteua kikundi cha taasisi zinazoaminika, zinazojulikana kwa pamoja kama kamati ya upatikanaji wa data (DAC), kuhifadhi nakala za hali na kutoa uthibitisho wa upatikanaji wa data. DAC ni rahisi kutekeleza na zinahitaji uratibu mdogo kwa kuwa uanachama ni mdogo.

Hata hivyo, watumiaji lazima waamini DAC kufanya data ipatikane inapohitajika (k.m., kwa ajili ya kuzalisha ushahidi wa Merkle). Kuna uwezekano wa wanachama wa kamati za upatikanaji wa data [kudhibitiwa na mhusika mwenye nia mbaya](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) ambaye anaweza kuzuia data za nje ya mnyororo.

[Zaidi kuhusu kamati za upatikanaji wa data katika Validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Upatikanaji wa data uliowekewa dhamana {#bonded-data-availability}

Validium nyingine zinahitaji washiriki waliopewa jukumu la kuhifadhi data za nje ya mtandao kuweka dhamana (yaani, kufungia) tokeni katika mkataba mahiri kabla ya kuchukua majukumu yao. Dhamana hii inatumika kama "kifungo" ili kuhakikisha tabia ya uaminifu miongoni mwa wasimamizi wa upatikanaji wa data na kupunguza dhana za uaminifu. Ikiwa washiriki hawa watashindwa kuthibitisha upatikanaji wa data, dhamana inakatwa (ukataji).

Katika mpango wa upatikanaji wa data uliowekewa dhamana, mtu yeyote anaweza kupangiwa kushikilia data za nje ya mnyororo mara tu anapotoa dhamana inayohitajika. Hii inapanua kundi la wasimamizi wanaostahili wa upatikanaji wa data, na kupunguza uwekaji kati unaoathiri kamati za upatikanaji wa data (DAC). Muhimu zaidi, mbinu hii inategemea motisha za kiuchumi za kificho ili kuzuia shughuli mbaya, ambayo ni salama zaidi kuliko kuteua pande zinazoaminika kulinda data za nje ya mtandao katika Validium.

[Zaidi kuhusu upatikanaji wa data uliowekewa dhamana katika Validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions na Validium {#volitions-and-validium}

Validium hutoa faida nyingi lakini huja na mabadilishano (hasa, upatikanaji wa data). Lakini, kama ilivyo kwa masuluhisho mengi ya kuongeza viwango, Validium zinafaa kwa matumizi maalum—ndiyo maana volitions ziliundwa.

Volitions zinachanganya ZK-rollup na mnyororo wa Validium na kuruhusu watumiaji kubadili kati ya masuluhisho hayo mawili ya kuongeza viwango. Kwa volitions, watumiaji wanaweza kutumia fursa ya upatikanaji wa data nje ya mnyororo wa Validium kwa miamala fulani, huku wakihifadhi uhuru wa kubadili kwenda kwenye suluhisho la upatikanaji wa data mnyororoni (ZK-rollup) ikihitajika. Hii kimsingi inawapa watumiaji uhuru wa kuchagua mabadilishano kama inavyoamriwa na mazingira yao ya kipekee.

Soko la kubadilishana lililogatuliwa (DEX) linaweza kupendelea kutumia miundombinu ya Validium inayoweza kuongezwa viwango na ya faragha kwa biashara za thamani ya juu. Inaweza pia kutumia ZK-rollup kwa watumiaji wanaotaka uhakikisho wa juu wa usalama wa ZK-rollup na hali ya kutohitaji kuamini.

## Validium na utangamano wa EVM {#validiums-and-evm-compatibility}

Kama ZK-rollups, Validium zinafaa zaidi kwa programu rahisi, kama vile ubadilishaji wa tokeni na malipo. Kusaidia ukokotoaji wa jumla na utekelezaji wa mkataba mahiri miongoni mwa Validium ni vigumu kutekeleza, kutokana na mzigo mkubwa wa kuthibitisha maagizo ya [EVM](/developers/docs/evm/) katika saketi ya uthibitisho wa maarifa-sifuri.

Baadhi ya miradi ya Validium inajaribu kukwepa tatizo hili kwa kukusanya (ukusanyaji) lugha zinazoendana na EVM (k.m., Solidity, Vyper) katika kuunda msimbo wa baiti maalum ulioboreshwa kwa uthibitishaji mzuri. Hasara ya mbinu hii ni kwamba VM mpya zinazofaa kwa uthibitisho wa maarifa-sifuri zinaweza zisisaidie opcodes muhimu za EVM, na wasanidi programu wanapaswa kuandika moja kwa moja katika lugha ya kiwango cha juu kwa uzoefu bora. Hii inaleta matatizo zaidi: inawalazimisha wasanidi programu kujenga programu tumizi iliyogatuliwa (dapp) na mrundikano mpya kabisa wa maendeleo na kuvunja utangamano na miundombinu ya sasa ya Ethereum.

Baadhi ya timu, hata hivyo, zinajaribu kuboresha opcodes zilizopo za EVM kwa saketi za kuthibitisha za ZK. Hii itasababisha maendeleo ya Mashine Pepe ya Ethereum ya maarifa-sifuri (zkEVM), VM inayoendana na EVM inayozalisha uthibitisho ili kuthibitisha usahihi wa utekelezaji wa programu. Kwa zkEVM, minyororo ya Validium inaweza kutekeleza mikataba mahiri nje ya mnyororo na kuwasilisha uthibitisho wa uhalali ili kuthibitisha ukokotoaji wa nje ya mnyororo (bila kulazimika kuutekeleza tena) kwenye Ethereum.

[Zaidi kuhusu zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Validium zinaongezaje viwango vya Ethereum? {#scaling-ethereum-with-validiums}

### 1. Uhifadhi wa data nje ya mnyororo {#offchain-data-storage}

Miradi ya kuongeza viwango ya tabaka la 2 (l2), kama vile mikusanyiko yenye matumaini na ZK-rollups, inabadilishana uwezo usio na kikomo wa kuongeza viwango wa itifaki safi za kuongeza viwango za nje ya mnyororo (k.m., [Plasma](/developers/docs/scaling/plasma/)) kwa usalama kwa kuchapisha baadhi ya data za muamala kwenye tabaka la 1 (l1). Lakini hii inamaanisha sifa za kuongeza viwango za mikusanyiko zinazuiliwa na kipimo data kwenye Mtandao Mkuu wa Ethereum ([mnyororo wa shadi wa data](/roadmap/danksharding/) unapendekeza kuboresha uwezo wa kuhifadhi data wa Ethereum kwa sababu hii).

Validium zinafikia uwezo wa kuongeza viwango kwa kuweka data zote za muamala nje ya mnyororo na kuchapisha tu ufungamanisho wa hali (na uthibitisho wa uhalali) wakati wa kupeleka masasisho ya hali kwenye mnyororo mkuu wa Ethereum. Uwepo wa uthibitisho wa uhalali, hata hivyo, unazipa Validium uhakikisho wa juu wa usalama kuliko masuluhisho mengine safi ya kuongeza viwango ya nje ya mnyororo, ikiwa ni pamoja na Plasma na [minyororo ya kando](/developers/docs/scaling/sidechains/). Kwa kupunguza kiasi cha data ambacho Ethereum inapaswa kuchakata kabla ya kuthibitisha miamala ya nje ya mnyororo, miundo ya Validium inaongeza sana uwezo wa upitishaji kwenye Mtandao Mkuu.

### 2. Uthibitisho unaojirudia {#recursive-proofs}

Uthibitisho unaojirudia ni uthibitisho wa uhalali unaothibitisha uhalali wa uthibitisho mwingine. Hizi "uthibitisho wa uthibitisho" zinazalishwa kwa kukusanya kwa kujirudia uthibitisho mwingi hadi uthibitisho mmoja wa mwisho unaothibitisha uthibitisho wote uliopita utakapoundwa. Uthibitisho unaojirudia unaongeza kasi ya kuchakata mnyororo wa vitalu kwa kuongeza idadi ya miamala inayoweza kuthibitishwa kwa kila uthibitisho wa uhalali.

Kwa kawaida, kila uthibitisho wa uhalali ambao mwendeshaji wa Validium anawasilisha kwa Ethereum kwa uthibitishaji unathibitisha uadilifu wa kitalu kimoja. Wakati uthibitisho mmoja unaojirudia unaweza kutumika kuthibitisha uhalali wa vitalu kadhaa vya Validium kwa wakati mmoja—hii inawezekana kwa kuwa saketi ya kuthibitisha inaweza kukusanya kwa kujirudia uthibitisho wa vitalu kadhaa katika uthibitisho mmoja wa mwisho. Ikiwa mkataba wa mhakiki wa mnyororoni unakubali uthibitisho unaojirudia, vitalu vyote vya msingi vinakamilishwa (ukamilifu) mara moja.

## Faida na hasara za Validium {#pros-and-cons-of-validium}

| Faida                                                                                                                    | Hasara                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uthibitisho wa uhalali husimamia uadilifu wa miamala ya nje ya mnyororo na kuzuia waendeshaji kukamilisha masasisho batili ya hali. | Kuzalisha uthibitisho wa uhalali kunahitaji maunzi maalum, ambayo inaleta hatari ya uwekaji kati.                                                              |
| Inaongeza ufanisi wa mtaji kwa watumiaji (hakuna ucheleweshaji katika kutoa fedha kurudi kwenye Ethereum)                                 | Usaidizi mdogo kwa ukokotoaji wa jumla/mikataba mahiri; lugha maalum zinahitajika kwa maendeleo.                                             |
| Haiko hatarini kwa baadhi ya mashambulizi ya kiuchumi yanayokabiliwa na mifumo inayotegemea uthibitisho wa udanganyifu katika programu za thamani ya juu.                | Nguvu kubwa ya ukokotoaji inahitajika ili kuzalisha uthibitisho wa ZK; si ya gharama nafuu kwa programu zenye uwezo mdogo wa upitishaji.                                         |
| Inapunguza ada za gesi kwa watumiaji kwa kutochapisha data za mwito kwenye Mtandao Mkuu wa Ethereum.                                                  | Muda wa ukamilifu wa kibinafsi wa polepole (dakika 10-30 kuzalisha uthibitisho wa ZK) lakini haraka zaidi kwa ukamilifu kamili kwa sababu hakuna ucheleweshaji wa muda wa mzozo.               |
| Inafaa kwa matumizi maalum, kama vile biashara au michezo ya mnyororo wa vitalu inayotanguliza faragha ya muamala na uwezo wa kuongeza viwango.  | Watumiaji wanaweza kuzuiwa kutoa fedha kwa kuwa kuzalisha ushahidi wa Merkle wa umiliki kunahitaji data za nje ya mnyororo kupatikana wakati wote.      |
| Upatikanaji wa data nje ya mnyororo hutoa viwango vya juu vya uwezo wa upitishaji na kuongeza uwezo wa kuongeza viwango.                              | Muundo wa usalama unategemea dhana za uaminifu na motisha za kiuchumi za kificho, tofauti na ZK-rollups, ambazo zinategemea tu mifumo ya usalama ya kificho. |

### Tumia Validium/Volitions {#use-validium-and-volitions}

Miradi mingi hutoa utekelezaji wa Validium na volitions ambazo unaweza kuziunganisha kwenye programu tumizi iliyogatuliwa (dapp) yako:

**StarkWare StarkEx** - _StarkEx ni suluhisho la uwezo wa kuongeza viwango la Tabaka la 2 (L2) la Ethereum ambalo linategemea uthibitisho wa uhalali. Inaweza kufanya kazi katika njia za upatikanaji wa data za ZK-Rollup au Validium._

- [Nyaraka](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Tovuti](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter ni itifaki ya kuongeza viwango ya Tabaka la 2 inayoshughulikia upatikanaji wa data kwa mbinu mseto inayochanganya mawazo ya zkRollup na mnyororo wa shadi. Inaweza kusaidia shadi nyingi kiholela, kila moja ikiwa na sera yake ya upatikanaji wa data._

- [Blogu](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Nyaraka](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Tovuti](https://zksync.io/)

## Usomaji zaidi {#further-reading}

- [Validium Na Tabaka la 2 Mbili-Kwa-Mbili — Toleo Na. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups dhidi ya Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition na wigo Unaoibuka wa Upatikanaji wa Data](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Mwongozo wa Vitendo wa Mikusanyiko ya Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)