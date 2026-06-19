---
title: Mikusanyiko ya sifuri-maarifa
description: Utangulizi wa mikusanyiko ya sifuri-maarifa—suluhisho la kuongeza uwezo linalotumiwa na jamii ya Ethereum.
lang: sw
---

Mikusanyiko ya sifuri-maarifa (ZK-rollups) ni [masuluhisho ya kuongeza uwezo](/developers/docs/scaling/) ya tabaka la 2 (l2) ambayo huongeza uwezo wa upitishaji kwenye Mtandao Mkuu wa [Ethereum](/) kwa kuhamisha ukokotoaji na uhifadhi wa hali nje ya mnyororo. ZK-rollups zinaweza kuchakata maelfu ya miamala katika fungu na kisha kuchapisha tu data ndogo ya muhtasari kwenye Mtandao Mkuu. Data hii ya muhtasari inafafanua mabadiliko ambayo yanapaswa kufanywa kwenye hali ya Ethereum na uthibitisho fulani wa kriptografia kwamba mabadiliko hayo ni sahihi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa ukurasa wetu kuhusu [kuongeza uwezo wa Ethereum](/developers/docs/scaling/) na [tabaka la 2 (l2)](/layer-2).

## Mikusanyiko ya sifuri-maarifa ni nini? {#what-are-zk-rollups}

**Mikusanyiko ya sifuri-maarifa (ZK-rollups)** hukusanya (au 'kujumuisha') miamala katika mafungu ambayo hutekelezwa nje ya mnyororo. Ukokotoaji wa nje ya mnyororo hupunguza kiasi cha data kinachopaswa kuchapishwa kwenye mnyororo wa vitalu. Waendeshaji wa ZK-rollup huwasilisha muhtasari wa mabadiliko yanayohitajika ili kuwakilisha miamala yote katika fungu badala ya kutuma kila muamala mmoja mmoja. Pia huzalisha [uthibitisho wa uhalali](/glossary/#validity-proof) ili kuthibitisha usahihi wa mabadiliko yao.

Hali ya ZK-rollup inadumishwa na mkataba mahiri uliowekwa kwenye mtandao wa Ethereum. Ili kusasisha hali hii, nodi za ZK-rollup lazima ziwasilishe uthibitisho wa uhalali kwa ajili ya uhakiki. Kama ilivyotajwa, uthibitisho wa uhalali ni hakikisho la kriptografia kwamba mabadiliko ya hali yaliyopendekezwa na rollup kwa kweli ni matokeo ya kutekeleza fungu fulani la miamala. Hii inamaanisha kuwa ZK-rollups zinahitaji tu kutoa uthibitisho wa uhalali ili kukamilisha miamala kwenye Ethereum badala ya kuchapisha data yote ya muamala mnyororoni kama [mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/).

Hakuna ucheleweshaji wakati wa kuhamisha fedha kutoka kwenye ZK-rollup kwenda Ethereum kwa sababu miamala ya kujitoa hutekelezwa mara tu mkataba wa ZK-rollup unapohakiki uthibitisho wa uhalali. Kinyume chake, utoaji wa fedha kutoka kwenye mikusanyiko yenye matumaini unakabiliwa na ucheleweshaji ili kuruhusu mtu yeyote kupinga muamala wa kujitoa kwa [ushahidi wa udanganyifu](/glossary/#fraud-proof).

ZK-rollups huandika miamala kwenye Ethereum kama `calldata`. `calldata` ni mahali ambapo data inayojumuishwa katika miito ya nje kwa kazi za mkataba mahiri huhifadhiwa. Taarifa katika `calldata` huchapishwa kwenye mnyororo wa vitalu, ikiruhusu mtu yeyote kuunda upya hali ya rollup kwa kujitegemea. ZK-rollups hutumia mbinu za kubana ili kupunguza data ya muamala—kwa mfano, akaunti zinawakilishwa na faharisi badala ya anwani, ambayo huokoa baiti 28 za data. Uchapishaji wa data mnyororoni ni gharama kubwa kwa mikusanyiko, kwa hivyo kubana data kunaweza kupunguza ada kwa watumiaji.

## ZK-rollups huingiliana vipi na Ethereum? {#zk-rollups-and-ethereum}

Mnyororo wa ZK-rollup ni itifaki ya nje ya mnyororo inayofanya kazi juu ya mnyororo wa vitalu wa Ethereum na inasimamiwa na mikataba mahiri ya Ethereum mnyororoni. ZK-rollups hutekeleza miamala nje ya Mtandao Mkuu, lakini mara kwa mara hufanya ufungamanisho wa mafungu ya miamala ya nje ya mnyororo kwenye mkataba wa rollup mnyororoni. Rekodi hii ya muamala ni isiyobadilika, sawa na mnyororo wa vitalu wa Ethereum, na huunda mnyororo wa ZK-rollup.

Usanifu wa msingi wa ZK-rollup unajumuisha vipengele vifuatavyo:

1. **Mikataba mnyororoni**: Kama ilivyotajwa, itifaki ya ZK-rollup inadhibitiwa na mikataba mahiri inayoendeshwa kwenye Ethereum. Hii inajumuisha mkataba mkuu ambao huhifadhi vitalu vya rollup, kufuatilia amana, na kufuatilia masasisho ya hali. Mkataba mwingine mnyororoni (mkataba wa mhakiki) huhakiki uthibitisho wa maarifa-sifuri uliowasilishwa na wazalishaji wa vitalu. Kwa hivyo, Ethereum hutumika kama tabaka la msingi au "tabaka la 1 (l1)" kwa ZK-rollup.

2. **Mashine pepe ya nje ya mnyororo (VM)**: Ingawa itifaki ya ZK-rollup inaishi kwenye Ethereum, utekelezaji wa muamala na uhifadhi wa hali hufanyika kwenye mashine pepe tofauti inayojitegemea kutoka kwa [EVM](/developers/docs/evm/). VM hii ya nje ya mnyororo ni mazingira ya utekelezaji wa miamala kwenye ZK-rollup na hutumika kama tabaka la pili au "tabaka la 2 (l2)" kwa itifaki ya ZK-rollup. Uthibitisho wa uhalali uliohakikiwa kwenye Mtandao Mkuu wa Ethereum unahakikisha usahihi wa mabadiliko ya hali katika VM ya nje ya mnyororo.

ZK-rollups ni "masuluhisho mseto ya kuongeza uwezo"—itifaki za nje ya mnyororo zinazofanya kazi kwa kujitegemea lakini hupata usalama kutoka kwa Ethereum. Hasa, mtandao wa Ethereum unatekeleza uhalali wa masasisho ya hali kwenye ZK-rollup na kuhakikisha upatikanaji wa data nyuma ya kila sasisho kwa hali ya rollup. Kama matokeo, ZK-rollups ni salama zaidi kuliko masuluhisho safi ya kuongeza uwezo ya nje ya mnyororo, kama vile [minyororo ya kando](/developers/docs/scaling/sidechains/), ambayo inawajibika kwa sifa zao za usalama, au [validiums](/developers/docs/scaling/validium/), ambazo pia huhakiki miamala kwenye Ethereum kwa uthibitisho wa uhalali, lakini huhifadhi data ya muamala mahali pengine.

ZK-rollups hutegemea itifaki kuu ya Ethereum kwa yafuatayo:

### Upatikanaji wa data {#data-availability}

ZK-rollups huchapisha data ya hali kwa kila muamala uliochakatwa nje ya mnyororo kwenda Ethereum. Kwa data hii, inawezekana kwa watu binafsi au biashara kuunda upya hali ya rollup na kuthibitisha mnyororo wenyewe. Ethereum hufanya data hii ipatikane kwa washiriki wote wa mtandao kama `calldata`.

ZK-rollups hazihitaji kuchapisha data nyingi ya muamala mnyororoni kwa sababu uthibitisho wa uhalali tayari unahakiki uhalisi wa mabadiliko ya hali. Hata hivyo, kuhifadhi data mnyororoni bado ni muhimu kwa sababu inaruhusu uhakiki bila ruhusa, unaojitegemea wa hali ya mnyororo wa L2 ambao kwa upande wake unaruhusu mtu yeyote kuwasilisha mafungu ya miamala, kuzuia waendeshaji wenye nia mbaya kudhibiti au kufungia mnyororo.

Mnyororoni inahitajika kwa watumiaji kuingiliana na rollup. Bila ufikiaji wa data ya hali watumiaji hawawezi kuuliza salio la akaunti zao au kuanzisha miamala (k.m., utoaji) inayotegemea taarifa ya hali.

### Ukamilifu wa muamala {#transaction-finality}

Ethereum hufanya kazi kama tabaka la ukamilishaji kwa ZK-rollups: Miamala ya L2 inakamilishwa tu ikiwa mkataba wa L1 unakubali uthibitisho wa uhalali. Hii huondoa hatari ya waendeshaji wenye nia mbaya kuharibu mnyororo (k.m., kuiba fedha za rollup) kwa kuwa kila muamala lazima uidhinishwe kwenye Mtandao Mkuu. Pia, Ethereum inahakikisha kwamba shughuli za mtumiaji haziwezi kubadilishwa mara tu zinapokamilishwa kwenye L1.

### Upinzani wa udhibiti {#censorship-resistance}

Mikusanyiko mingi ya ZK hutumia "nodi kuu" (mwendeshaji) kutekeleza miamala, kuzalisha mafungu, na kuwasilisha vitalu kwenye L1. Ingawa hii inahakikisha ufanisi, inaongeza hatari ya udhibiti: waendeshaji wenye nia mbaya wa ZK-rollup wanaweza kudhibiti watumiaji kwa kukataa kujumuisha miamala yao katika mafungu.

Kama hatua ya usalama, ZK-rollups huruhusu watumiaji kuwasilisha miamala moja kwa moja kwenye mkataba wa rollup kwenye Mtandao Mkuu ikiwa wanafikiri wanadhibitiwa na mwendeshaji. Hii inaruhusu watumiaji kulazimisha kujitoa kutoka kwenye ZK-rollup kwenda Ethereum bila kulazimika kutegemea ruhusa ya mwendeshaji.

## ZK-rollups hufanyaje kazi? {#how-do-zk-rollups-work}

### Miamala {#transactions}

Watumiaji katika ZK-rollup hutia saini miamala na kuwasilisha kwa waendeshaji wa L2 kwa ajili ya kuchakatwa na kujumuishwa katika fungu linalofuata. Katika baadhi ya matukio, mwendeshaji ni chombo kilichowekwa kati, kinachoitwa mpangaji, ambaye hutekeleza miamala, kuikusanya katika mafungu, na kuwasilisha kwa L1. Mpangaji katika mfumo huu ndiye chombo pekee kinachoruhusiwa kuzalisha vitalu vya L2 na kuongeza miamala ya rollup kwenye mkataba wa ZK-rollup.

ZK-rollups nyingine zinaweza kuzungusha jukumu la mwendeshaji kwa kutumia seti ya mthibitishaji wa [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/). Waendeshaji watarajiwa huweka fedha kwenye mkataba wa rollup, huku ukubwa wa kila dhamana ukiathiri nafasi za mweka dhamana za kuchaguliwa kuzalisha fungu linalofuata la rollup. Dhamana ya mwendeshaji inaweza kukatwa (ukataji) ikiwa atatenda kwa nia mbaya, jambo ambalo huwahamasisha kuchapisha vitalu halali.

#### Jinsi ZK-rollups huchapisha data ya muamala kwenye Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Kama ilivyoelezwa, data ya muamala huchapishwa kwenye Ethereum kama `calldata`. `calldata` ni eneo la data katika mkataba mahiri linalotumika kupitisha hoja kwenye kazi na hufanya kazi sawa na [kumbukumbu](/developers/docs/smart-contracts/anatomy/#memory). Ingawa `calldata` haihifadhiwi kama sehemu ya hali ya Ethereum, inaendelea kuwepo mnyororoni kama sehemu ya [kumbukumbu za historia](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) za mnyororo wa Ethereum. `calldata` haiathiri hali ya Ethereum, na kuifanya kuwa njia ya bei nafuu ya kuhifadhi data mnyororoni.

Neno kuu la `calldata` mara nyingi hutambua mbinu ya mkataba mahiri inayoitwa na muamala na hushikilia pembejeo kwa mbinu hiyo katika mfumo wa mfuatano wa kiholela wa baiti. ZK-rollups hutumia `calldata` kuchapisha data ya muamala iliyobanwa mnyororoni; mwendeshaji wa rollup huongeza tu fungu jipya kwa kuita kazi inayohitajika katika mkataba wa rollup na kupitisha data iliyobanwa kama hoja za kazi. Hii husaidia kupunguza gharama kwa watumiaji kwa kuwa sehemu kubwa ya ada za rollup huenda kwenye kuhifadhi data ya muamala mnyororoni.

### Mafungamanisho ya hali {#state-commitments}

Hali ya ZK-rollup, ambayo inajumuisha akaunti na salio za L2, inawakilishwa kama [mti wa Merkle](/whitepaper/#merkle-trees). Heshi ya kriptografia ya mzizi wa mti wa Merkle (mzizi wa Merkle) huhifadhiwa katika mkataba mnyororoni, ikiruhusu itifaki ya rollup kufuatilia mabadiliko katika hali ya ZK-rollup.

Rollup hubadilika kwenda kwenye hali mpya baada ya utekelezaji wa seti mpya ya miamala. Mwendeshaji aliyeanzisha mabadiliko ya hali anahitajika kukokotoa mzizi mpya wa hali na kuwasilisha kwenye mkataba mnyororoni. Ikiwa uthibitisho wa uhalali unaohusishwa na fungu utathibitishwa na mkataba wa mhakiki, mzizi mpya wa Merkle unakuwa mzizi wa hali rasmi wa ZK-rollup.

Kando na kukokotoa mizizi ya hali, mwendeshaji wa ZK-rollup pia huunda mzizi wa fungu—mzizi wa mti wa Merkle unaojumuisha miamala yote katika fungu. Wakati fungu jipya linapowasilishwa, mkataba wa rollup huhifadhi mzizi wa fungu, kuruhusu watumiaji kuthibitisha muamala (k.m., ombi la utoaji) ulijumuishwa katika fungu. Watumiaji watalazimika kutoa maelezo ya muamala, mzizi wa fungu, na [ushahidi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) unaoonyesha njia ya ujumuishaji.

### Uthibitisho wa uhalali {#validity-proofs}

Mzizi mpya wa hali ambao mwendeshaji wa ZK-rollup anawasilisha kwenye mkataba wa L1 ni matokeo ya masasisho kwenye hali ya rollup. Tuseme Alice anatuma tokeni 10 kwa Bob, mwendeshaji hupunguza tu salio la Alice kwa 10 na kuongeza salio la Bob kwa 10. Kisha mwendeshaji huheshi data ya akaunti iliyosasishwa, hujenga upya mti wa Merkle wa rollup, na kuwasilisha mzizi mpya wa Merkle kwenye mkataba mnyororoni.

Lakini mkataba wa rollup hautakubali kiotomatiki ufungamanisho wa hali uliopendekezwa hadi mwendeshaji athibitishe mzizi mpya wa Merkle ulitokana na masasisho sahihi kwenye hali ya rollup. Mwendeshaji wa ZK-rollup hufanya hivi kwa kuzalisha uthibitisho wa uhalali, ufungamanisho mfupi wa kriptografia unaohakiki usahihi wa miamala iliyokusanywa katika mafungu.

Uthibitisho wa uhalali huruhusu pande kuthibitisha usahihi wa taarifa bila kufichua taarifa yenyewe—kwa hivyo, pia huitwa uthibitisho wa maarifa-sifuri. ZK-rollups hutumia uthibitisho wa uhalali kuthibitisha usahihi wa mabadiliko ya hali ya nje ya mnyororo bila kulazimika kutekeleza upya miamala kwenye Ethereum. Uthibitisho huu unaweza kuja katika mfumo wa [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) au [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

SNARKs na STARKs zote husaidia kuthibitisha uadilifu wa ukokotoaji wa nje ya mnyororo katika ZK-rollups, ingawa kila aina ya uthibitisho ina vipengele tofauti.

**ZK-SNARKs**

Ili itifaki ya ZK-SNARK ifanye kazi, kuunda Mfuatano wa Marejeleo ya Kawaida (CRS) ni muhimu: CRS hutoa vigezo vya umma vya kuthibitisha na kuhakiki uthibitisho wa uhalali. Usalama wa mfumo wa kuthibitisha unategemea usanidi wa CRS; ikiwa taarifa inayotumika kuunda vigezo vya umma itaangukia mikononi mwa watendaji wenye nia mbaya wanaweza kuwa na uwezo wa kuzalisha uthibitisho wa uhalali wa uongo.

Baadhi ya ZK-rollups hujaribu kutatua tatizo hili kwa kutumia [sherehe ya ukokotoaji wa pande nyingi (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), inayohusisha watu wanaoaminika, ili kuzalisha vigezo vya umma kwa saketi ya ZK-SNARK. Kila upande huchangia unasibu fulani (unaoitwa "taka zenye sumu") ili kuunda CRS, ambayo lazima waiharibu mara moja.

Usanidi unaoaminika hutumika kwa sababu huongeza usalama wa usanidi wa CRS. Ilimradi mshiriki mmoja mwaminifu anaharibu pembejeo yake, usalama wa mfumo wa ZK-SNARK unahakikishwa. Bado, mbinu hii inahitaji kuwaamini wale wanaohusika kufuta unasibu wao uliotolewa sampuli na kutodhoofisha hakikisho la usalama la mfumo.

Tukiweka kando dhana za uaminifu, ZK-SNARKs ni maarufu kwa ukubwa wao mdogo wa uthibitisho na uhakiki wa muda usiobadilika. Kwa kuwa uhakiki wa uthibitisho kwenye L1 unajumuisha gharama kubwa zaidi ya kuendesha ZK-rollup, L2s hutumia ZK-SNARKs kuzalisha uthibitisho unaoweza kuhakikiwa haraka na kwa bei nafuu kwenye Mtandao Mkuu.

**ZK-STARKs**

Kama ZK-SNARKs, ZK-STARKs huthibitisha uhalali wa ukokotoaji wa nje ya mnyororo bila kufichua pembejeo. Hata hivyo, ZK-STARKs huchukuliwa kama uboreshaji wa ZK-SNARKs kwa sababu ya uwezo wao wa kuongezeka na uwazi.

ZK-STARKs ni 'wazi', kwani zinaweza kufanya kazi bila usanidi unaoaminika wa Mfuatano wa Marejeleo ya Kawaida (CRS). Badala yake, ZK-STARKs hutegemea unasibu unaoweza kuhakikiwa hadharani ili kuweka vigezo vya kuzalisha na kuhakiki uthibitisho.

ZK-STARKs pia hutoa uwezo zaidi wa kuongezeka kwa sababu muda unaohitajika kuthibitisha na kuhakiki uthibitisho wa uhalali huongezeka _kwa kiasi cha mstari_ kuhusiana na utata wa ukokotoaji wa msingi. Kwa ZK-SNARKs, muda wa kuthibitisha na kuhakiki huongezeka _kwa mstari_ kuhusiana na ukubwa wa ukokotoaji wa msingi. Hii inamaanisha ZK-STARKs zinahitaji muda mchache kuliko ZK-SNARKs kwa kuthibitisha na kuhakiki wakati seti kubwa za data zinahusika, na kuzifanya ziwe muhimu kwa programu zenye kiasi kikubwa.

ZK-STARKs pia ni salama dhidi ya kompyuta za kwanta, wakati Kriptografia ya Tao la Duaradufu (ECC) inayotumika katika ZK-SNARKs inaaminika sana kuwa katika hatari ya mashambulizi ya ukokotoaji wa kwanta. Upande wa chini wa ZK-STARKs ni kwamba huzalisha ukubwa mkubwa wa uthibitisho, ambao ni ghali zaidi kuhakiki kwenye Ethereum.

#### Uthibitisho wa uhalali hufanyaje kazi katika ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Uzalishaji wa uthibitisho {#entries-and-exits}

Kabla ya kukubali miamala, mwendeshaji atafanya ukaguzi wa kawaida. Hii inajumuisha kuthibitisha kwamba:

- Akaunti za mtumaji na mpokeaji ni sehemu ya mti wa hali.
- Mtumaji ana fedha za kutosha kuchakata muamala.
- Muamala ni sahihi na unalingana na ufunguo wa umma wa mtumaji kwenye rollup.
- Nonsi ya mtumaji ni sahihi, n.k.

Mara tu nodi ya ZK-rollup inapokuwa na miamala ya kutosha, inaikusanya katika fungu na kukusanya pembejeo kwa saketi ya kuthibitisha ili kukusanya katika uthibitisho mfupi wa ZK. Hii inajumuisha:

- Mzizi wa mti wa Merkle unaojumuisha miamala yote katika fungu.
- Ushahidi wa Merkle kwa miamala ili kuthibitisha ujumuishaji katika fungu.
- Ushahidi wa Merkle kwa kila jozi ya mtumaji-mpokeaji katika miamala ili kuthibitisha akaunti hizo ni sehemu ya mti wa hali wa rollup.
- Seti ya mizizi ya hali ya kati, inayotokana na kusasisha mzizi wa hali baada ya kutumia masasisho ya hali kwa kila muamala (yaani, kupunguza akaunti za mtumaji na kuongeza akaunti za mpokeaji).

Saketi ya kuthibitisha hukokotoa uthibitisho wa uhalali kwa "kuzunguka" juu ya kila muamala na kufanya ukaguzi ule ule ambao mwendeshaji alikamilisha kabla ya kuchakata muamala. Kwanza, inahakiki akaunti ya mtumaji ni sehemu ya mzizi wa hali uliopo kwa kutumia ushahidi wa Merkle uliotolewa. Kisha inapunguza salio la mtumaji, inaongeza nonsi yao, inaheshi data ya akaunti iliyosasishwa na kuiunganisha na ushahidi wa Merkle ili kuzalisha mzizi mpya wa Merkle.

Mzizi huu wa Merkle unaonyesha mabadiliko pekee katika hali ya ZK-rollup: mabadiliko katika salio na nonsi ya mtumaji. Hii inawezekana kwa sababu ushahidi wa Merkle uliotumika kuthibitisha uwepo wa akaunti unatumika kupata mzizi mpya wa hali.

Saketi ya kuthibitisha hufanya mchakato huo huo kwenye akaunti ya mpokeaji. Inakagua ikiwa akaunti ya mpokeaji ipo chini ya mzizi wa hali ya kati (kwa kutumia ushahidi wa Merkle), inaongeza salio lao, inaheshi upya data ya akaunti na kuiunganisha na ushahidi wa Merkle ili kuzalisha mzizi mpya wa hali.

Mchakato unajirudia kwa kila muamala; kila "mzunguko" huunda mzizi mpya wa hali kutokana na kusasisha akaunti ya mtumaji na mzizi mpya unaofuata kutokana na kusasisha akaunti ya mpokeaji. Kama ilivyoelezwa, kila sasisho kwa mzizi wa hali linawakilisha sehemu moja ya mti wa hali wa rollup inayobadilika.

Saketi ya kuthibitisha ya ZK inarudia juu ya fungu zima la muamala, ikihakiki mfuatano wa masasisho yanayosababisha mzizi wa mwisho wa hali baada ya muamala wa mwisho kutekelezwa. Mzizi wa mwisho wa Merkle uliokokotolewa unakuwa mzizi mpya zaidi wa hali rasmi wa ZK-rollup.

##### Uhakiki wa uthibitisho {#zk-rollups-and-evm-compatibility}

Baada ya saketi ya kuthibitisha kuhakiki usahihi wa masasisho ya hali, mwendeshaji wa L2 huwasilisha uthibitisho wa uhalali uliokokotolewa kwenye mkataba wa mhakiki kwenye L1. Saketi ya uhakiki ya mkataba inahakiki uhalali wa uthibitisho na pia inakagua pembejeo za umma zinazounda sehemu ya uthibitisho:

- **Mzizi wa hali ya awali**: Mzizi wa hali ya zamani wa ZK-rollup (yaani, kabla ya miamala iliyokusanywa katika mafungu kutekelezwa), unaoonyesha hali halali ya mwisho inayojulikana ya mnyororo wa L2.

- **Mzizi wa hali ya baada**: Mzizi mpya wa hali wa ZK-rollup (yaani, baada ya utekelezaji wa miamala iliyokusanywa katika mafungu), unaoonyesha hali mpya zaidi ya mnyororo wa L2. Mzizi wa hali ya baada ni mzizi wa mwisho unaopatikana baada ya kutumia masasisho ya hali katika saketi ya kuthibitisha.

- **Mzizi wa fungu**: Mzizi wa Merkle wa fungu, unaopatikana kwa _kumerklize_ miamala katika fungu na kuheshi mzizi wa mti.

- **Pembejeo za muamala**: Data inayohusishwa na miamala iliyotekelezwa kama sehemu ya fungu lililowasilishwa.

Ikiwa uthibitisho unaridhisha saketi (yaani, ni halali), inamaanisha kwamba kuna mfuatano wa miamala halali inayobadilisha rollup kutoka hali ya awali (iliyowekwa alama ya vidole ya kriptografia na mzizi wa hali ya awali) hadi hali mpya (iliyowekwa alama ya vidole ya kriptografia na mzizi wa hali ya baada). Ikiwa mzizi wa hali ya awali unalingana na mzizi uliohifadhiwa katika mkataba wa rollup, na uthibitisho ni halali, mkataba wa rollup huchukua mzizi wa hali ya baada kutoka kwenye uthibitisho na kusasisha mti wake wa hali ili kuonyesha hali iliyobadilika ya rollup.

### Kuingia na kujitoa {#how-do-zk-rollup-fees-work}

Watumiaji huingia kwenye ZK-rollup kwa kuweka tokeni katika mkataba wa rollup uliowekwa kwenye mnyororo wa L1. Muamala huu umepangwa kwenye foleni kwa kuwa waendeshaji pekee ndio wanaoweza kuwasilisha miamala kwenye mkataba wa rollup.

Ikiwa foleni ya amana inayosubiri inaanza kujaa, mwendeshaji wa ZK-rollup atachukua miamala ya amana na kuiwasilisha kwenye mkataba wa rollup. Mara tu fedha za mtumiaji zikiwa kwenye rollup, wanaweza kuanza kufanya miamala kwa kutuma miamala kwa mwendeshaji kwa ajili ya kuchakatwa. Watumiaji wanaweza kuhakiki salio kwenye rollup kwa kuheshi data ya akaunti zao, kutuma heshi kwenye mkataba wa rollup, na kutoa ushahidi wa Merkle ili kuhakiki dhidi ya mzizi wa hali ya sasa.

Kutoa kutoka kwenye ZK-rollup kwenda L1 ni moja kwa moja. Mtumiaji huanzisha muamala wa kujitoa kwa kutuma mali zao kwenye rollup kwa akaunti maalum kwa ajili ya kuteketeza. Ikiwa mwendeshaji atajumuisha muamala katika fungu linalofuata, mtumiaji anaweza kuwasilisha ombi la utoaji kwenye mkataba mnyororoni. Ombi hili la utoaji litajumuisha yafuatayo:

- Ushahidi wa Merkle unaothibitisha ujumuishaji wa muamala wa mtumiaji kwenye akaunti ya kuteketeza katika fungu la muamala

- Data ya muamala

- Mzizi wa fungu

- Anwani ya L1 ya kupokea fedha zilizowekwa

Mkataba wa rollup huheshi data ya muamala, hukagua ikiwa mzizi wa fungu upo, na hutumia ushahidi wa Merkle kukagua ikiwa heshi ya muamala ni sehemu ya mzizi wa fungu. Baadaye, mkataba hutekeleza muamala wa kujitoa na kutuma fedha kwa anwani iliyochaguliwa ya mtumiaji kwenye L1.

## ZK-rollups na utangamano wa EVM {#scaling-ethereum-with-zk-rollups}

Tofauti na mikusanyiko yenye matumaini, ZK-rollups hazitangamani kwa urahisi na [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/). Kuthibitisha ukokotoaji wa EVM wa madhumuni ya jumla katika saketi ni ngumu zaidi na inahitaji rasilimali nyingi kuliko kuthibitisha ukokotoaji rahisi (kama hamisho la tokeni lililoelezwa hapo awali).

Hata hivyo, [maendeleo katika teknolojia ya sifuri-maarifa](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) yanawasha upya maslahi katika kufunga ukokotoaji wa EVM katika uthibitisho wa maarifa-sifuri. Juhudi hizi zinalenga kuunda utekelezaji wa EVM ya sifuri-maarifa (zkEVM) ambao unaweza kuhakiki kwa ufanisi usahihi wa utekelezaji wa programu. zkEVM huunda upya opcodes zilizopo za EVM kwa ajili ya kuthibitisha/kuhakiki katika saketi, ikiruhusu kutekeleza mikataba mahiri.

Kama EVM, zkEVM hubadilika kati ya hali baada ya ukokotoaji kufanywa kwenye baadhi ya pembejeo. Tofauti ni kwamba zkEVM pia huunda uthibitisho wa maarifa-sifuri ili kuhakiki usahihi wa kila hatua katika utekelezaji wa programu. Uthibitisho wa uhalali unaweza kuhakiki usahihi wa shughuli zinazogusa hali ya VM (kumbukumbu, staki, hifadhi) na ukokotoaji wenyewe (yaani, je, shughuli iliita opcodes sahihi na kuzitekeleza kwa usahihi?).

Kuanzishwa kwa ZK-rollups zinazotangamana na EVM kunatarajiwa kusaidia wasanidi programu kutumia uwezo wa kuongezeka na hakikisho la usalama la uthibitisho wa maarifa-sifuri. Muhimu zaidi, utangamano na miundombinu asilia ya Ethereum inamaanisha wasanidi programu wanaweza kujenga programu tumizi zilizogatuliwa (dapps) zinazofaa kwa ZK kwa kutumia zana na lugha zinazofahamika (na zilizojaribiwa vitani).

## Ada za ZK-rollup hufanyaje kazi? {#transaction-data-compression}

Kiasi ambacho watumiaji hulipa kwa miamala kwenye ZK-rollups kinategemea ada ya gesi, kama tu kwenye Mtandao Mkuu wa Ethereum. Hata hivyo, ada za gesi hufanya kazi tofauti kwenye L2 na huathiriwa na gharama zifuatazo:

1. **Uandishi wa hali**: Kuna gharama isiyobadilika ya kuandika kwenye hali ya Ethereum (yaani, kuwasilisha muamala kwenye mnyororo wa vitalu wa Ethereum). ZK-rollups hupunguza gharama hii kwa kukusanya miamala katika mafungu na kusambaza gharama zisizobadilika kwa watumiaji wengi.

2. **Uchapishaji wa data**: ZK-rollups huchapisha data ya hali kwa kila muamala kwenda Ethereum kama `calldata`. Gharama za `calldata` kwa sasa zinasimamiwa na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), ambayo inabainisha gharama ya gesi 16 kwa baiti zisizo sifuri na gesi 4 kwa baiti sifuri za `calldata`, mtawalia. Gharama inayolipwa kwa kila muamala inaathiriwa na kiasi gani cha `calldata` kinahitaji kuchapishwa mnyororoni kwa ajili yake.

3. **Ada za mwendeshaji wa L2**: Hiki ni kiasi kinacholipwa kwa mwendeshaji wa rollup kama fidia kwa gharama za ukokotoaji zilizotumika katika kuchakata miamala, sawa na ["ada za kipaumbele (vidokezo)" za muamala](/developers/docs/gas/#how-are-gas-fees-calculated) kwenye Mtandao Mkuu wa Ethereum.

4. **Uzalishaji na uhakiki wa uthibitisho**: Waendeshaji wa ZK-rollup lazima wazalishe uthibitisho wa uhalali kwa mafungu ya muamala, ambayo inahitaji rasilimali nyingi. Kuhakiki uthibitisho wa maarifa-sifuri kwenye Mtandao Mkuu pia hugharimu gesi (~ gesi 500,000).

Mbali na kukusanya miamala katika mafungu, ZK-rollups hupunguza ada kwa watumiaji kwa kubana data ya muamala. Unaweza [kuona muhtasari wa wakati halisi](https://l2fees.info/) wa jinsi inavyogharimu kutumia ZK-rollups za Ethereum.

## ZK-rollups huongezaje uwezo wa Ethereum? {#recursive-proofs}

### Mfinyazo wa data ya muamala {#zk-rollups-pros-and-cons}

ZK-rollups hupanua uwezo wa upitishaji kwenye tabaka la msingi la Ethereum kwa kuchukua ukokotoaji nje ya mnyororo, lakini msukumo halisi wa kuongeza uwezo unatokana na kubana data ya muamala. [Ukubwa wa kitalu](/developers/docs/blocks/#block-size) cha Ethereum huzuia data ambayo kila kitalu kinaweza kushikilia na, kwa ugani, idadi ya miamala inayochakatwa kwa kila kitalu. Kwa kubana data inayohusiana na muamala, ZK-rollups huongeza kwa kiasi kikubwa idadi ya miamala inayochakatwa kwa kila kitalu.

ZK-rollups zinaweza kubana data ya muamala vizuri zaidi kuliko mikusanyiko yenye matumaini kwa kuwa hazilazimiki kuchapisha data yote inayohitajika kuthibitisha kila muamala. Zinapaswa tu kuchapisha data ndogo inayohitajika ili kujenga upya hali ya hivi punde ya akaunti na salio kwenye rollup.

### Uthibitisho unaojirudia {#zk-video}

Faida ya uthibitisho wa maarifa-sifuri ni kwamba uthibitisho unaweza kuhakiki uthibitisho mwingine. Kwa mfano, ZK-SNARK moja inaweza kuhakiki ZK-SNARKs nyingine. "Uthibitisho-wa-uthibitisho" kama huo huitwa uthibitisho unaojirudia na huongeza kwa kiasi kikubwa uwezo wa upitishaji kwenye ZK-rollups.

Kwa sasa, uthibitisho wa uhalali unazalishwa kwa msingi wa kitalu-kwa-kitalu na kuwasilishwa kwenye mkataba wa L1 kwa ajili ya uhakiki. Hata hivyo, kuhakiki uthibitisho wa kitalu kimoja huzuia uwezo wa upitishaji ambao ZK-rollups zinaweza kufikia kwa kuwa kitalu kimoja tu kinaweza kukamilishwa wakati mwendeshaji anawasilisha uthibitisho.

Uthibitisho unaojirudia, hata hivyo, hufanya iwezekane kukamilisha vitalu kadhaa kwa uthibitisho mmoja wa uhalali. Hii ni kwa sababu saketi ya kuthibitisha hukusanya kwa kujirudia uthibitisho wa vitalu vingi hadi uthibitisho mmoja wa mwisho utakapoundwa. Mwendeshaji wa L2 huwasilisha uthibitisho huu unaojirudia, na ikiwa mkataba utaukubali, vitalu vyote husika vitakamilishwa papo hapo. Kwa uthibitisho unaojirudia, idadi ya miamala ya ZK-rollup inayoweza kukamilishwa kwenye Ethereum kwa vipindi huongezeka.

### Faida na hasara za ZK-rollups {#zkevm-projects}

| Faida                                                                                                                                                                                                   | Hasara                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uthibitisho wa uhalali unahakikisha usahihi wa miamala ya nje ya mnyororo na kuzuia waendeshaji kutekeleza mabadiliko batili ya hali.                                                                           | Gharama inayohusishwa na kukokotoa na kuhakiki uthibitisho wa uhalali ni kubwa na inaweza kuongeza ada kwa watumiaji wa rollup.                                                                            |
| Hutoa ukamilifu wa muamala wa haraka zaidi kwani masasisho ya hali yanaidhinishwa mara tu uthibitisho wa uhalali unapohakikiwa kwenye L1.                                                                                              | Kujenga ZK-rollups zinazotangamana na EVM ni ngumu kutokana na utata wa teknolojia ya sifuri-maarifa.                                                                                                    |
| Hutegemea mbinu za kriptografia bila hitaji la uaminifu kwa usalama, sio uaminifu wa watendaji waliohamasishwa kama ilivyo kwa [mikusanyiko yenye matumaini](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Kuzalisha uthibitisho wa uhalali kunahitaji maunzi maalum, ambayo yanaweza kuhimiza udhibiti wa kati wa mnyororo na pande chache.                                                                    |
| Huhifadhi data inayohitajika kurejesha hali ya nje ya mnyororo kwenye L1, ambayo inahakikisha usalama, upinzani wa udhibiti, na ugatuzi.                                                                       | Waendeshaji waliowekwa kati (wapangaji) wanaweza kuathiri upangaji wa miamala.                                                                                                                     |
| Watumiaji hunufaika na ufanisi mkubwa wa mtaji na wanaweza kutoa fedha kutoka L2 bila ucheleweshaji.                                                                                                           | Mahitaji ya maunzi yanaweza kupunguza idadi ya washiriki wanaoweza kulazimisha mnyororo kufanya maendeleo, na kuongeza hatari ya waendeshaji wenye nia mbaya kufungia hali ya rollup na kudhibiti watumiaji. |
| Haitegemei dhana za uhai na watumiaji hawalazimiki kuthibitisha mnyororo ili kulinda fedha zao.                                                                                              | Baadhi ya mifumo ya kuthibitisha (k.m., ZK-SNARK) inahitaji usanidi unaoaminika ambao, ikiwa utashughulikiwa vibaya, unaweza kuhatarisha muundo wa usalama wa ZK-rollup.                                                     |
| Mfinyazo bora wa data unaweza kusaidia kupunguza gharama za kuchapisha `calldata` kwenye Ethereum na kupunguza ada za rollup kwa watumiaji.                                                                             |                                                                                                                                                                                                    |

### Maelezo ya kuona ya ZK-rollups {#further-reading-on-zk-rollups}

Tazama Finematics akielezea ZK-rollups:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Nani anafanyia kazi zkEVM? {#tutorials}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM kwa L2 dhidi ya L1</AlertTitle>
<AlertDescription>
Miradi iliyo hapa chini inatumia teknolojia ya zkEVM kujenga mikusanyiko ya Tabaka la 2. Pia kuna utafiti wa kutumia zkEVM kwa [uhakiki wa kitalu cha L1](/roadmap/zkevm/), ambao ungewezesha wathibitishaji kuhakiki vitalu vya Ethereum bila kutekeleza upya miamala.
</AlertDescription>
</AlertContent>
</Alert>

Miradi inayofanyia kazi zkEVMs inajumuisha:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM ni mradi unaofadhiliwa na Taasisi ya Ethereum ili kuendeleza ZK-rollup inayotangamana na EVM na utaratibu wa kuzalisha uthibitisho wa uhalali kwa vitalu vya Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _ni ZK Rollup iliyogatuliwa kwenye mtandao mkuu wa Ethereum inayofanya kazi kwenye Mashine Pepe ya Ethereum ya sifuri-maarifa (zkEVM) inayotekeleza miamala ya Ethereum kwa njia ya wazi, ikijumuisha mikataba mahiri yenye uhakiki wa uthibitisho wa maarifa-sifuri._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll ni kampuni inayoendeshwa na teknolojia inayofanya kazi katika kujenga Suluhisho asilia la Tabaka la 2 la zkEVM kwa Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko ni ZK-rollup iliyogatuliwa, sawa na Ethereum ([Aina ya 1 ya ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era ni ZK Rollup inayotangamana na EVM iliyojengwa na Matter Labs, inayoendeshwa na zkEVM yake yenyewe._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet ni suluhisho la kuongeza uwezo la tabaka la 2 linalotangamana na EVM lililojengwa na StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph ni suluhisho mseto la kuongeza uwezo la rollup ambalo hutumia uthibitisho wa zk kushughulikia suala la changamoto ya hali ya Tabaka la 2._

- **[Linea](https://linea.build)** - _Linea ni Tabaka la 2 la zkEVM sawa na Ethereum lililojengwa na ConsenSys, linaloendana kikamilifu na mfumo ikolojia wa Ethereum._

## Usomaji zaidi kuhusu ZK-rollups

- [Mikusanyiko ya Sifuri-Maarifa ni Nini?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Mikusanyiko ya sifuri-maarifa ni nini?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Mwongozo wa Vitendo kwa Mikusanyiko ya Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs dhidi ya SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM ni nini?](https://www.alchemy.com/overviews/zkevm)
- [Aina za ZK-EVM: Sawa na Ethereum, sawa na EVM, Aina ya 1, Aina ya 4, na maneno mengine ya siri](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Utangulizi wa zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [L2s za ZK-EVM ni nini?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Rasilimali za Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [Jinsi ZK-SNARKS inavyofanya kazi kiufundi](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARKs zinawezekanaje?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Mafunzo: Faragha na sifuri-maarifa kwenye Ethereum

- [Kutumia sifuri-maarifa kwa hali ya siri](/developers/tutorials/secret-state/) _– Jinsi ya kutumia uthibitisho wa ZK na vipengele vya seva vya nje ya mnyororo kudumisha hali ya siri ya mchezo mnyororoni._
- [Kutumia Anwani za Siri](/developers/tutorials/stealth-addr/) _– Jinsi anwani za siri za ERC-5564 zinavyowezesha uhamisho wa ETH usiojulikana kwa kutumia unyambulishaji wa ufunguo wa kriptografia._
- [Kutumia Ethereum kwa uthibitishaji wa Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Jinsi ya kuunganisha saini za mkoba wa Ethereum na mifumo ya uthibitishaji ya Web2 inayotegemea SAML._