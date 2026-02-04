---
title: Rollups za Maarifa Sifuri
description: "Utangulizi wa unda-mpya za zero-knowledge—suluhisho la uongezwaji linalotumiwa na jamii ya Ethereum."
lang: sw
---

Unda-mpya za zero-knowledge (ZK-rollups) ni [suluhisho za uongezwaji](/developers/docs/scaling/) za safu ya 2 ambazo huongeza uwezo wa usindikaji kwenye Mtandao Mkuu wa Ethereum kwa kuhamisha ukokotoaji na hifadhi ya hali nje ya mnyororo. Unda-mpya za ZK zinaweza kushughulikia maelfu ya miamala katika kundi moja na kisha kuchapisha tu data ndogo ya muhtasari kwenye Mtandao Mkuu. Data hii ya muhtasari inabainisha mabadiliko ambayo yanapaswa kufanywa kwenye hali ya Ethereum na baadhi ya uthibitisho wa kiroptografia kwamba mabadiliko hayo ni sahihi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuwa umesoma na kuelewa ukurasa wetu kuhusu [kuongeza ukubwa wa Ethereum](/developers/docs/scaling/) na [safu ya 2](/layer-2).

## Unda-mpya za zero-knowledge ni nini? {#what-are-zk-rollups}

**Unda-mpya za zero-knowledge (ZK-rollups)** huunganisha (au 'kukunja') miamala kuwa makundi ambayo hutekelezwa nje ya mnyororo. Ukokotoaji wa nje ya mnyororo hupunguza kiasi cha data kinachopaswa kuchapishwa kwenye mnyororo wa bloku. Waendeshaji wa unda-mpya wa ZK huwasilisha muhtasari wa mabadiliko yanayohitajika kuwakilisha miamala yote katika kundi badala ya kutuma kila muamala kivyake. Pia huzalisha [uthibitisho wa uhalali](/glossary/#validity-proof) ili kuthibitisha usahihi wa mabadiliko yao.

Hali ya unda-mpya ya ZK inadumishwa na mkataba-erevu uliotumwa kwenye mtandao wa Ethereum. Ili kusasisha hali hii, nodi za unda-mpya za ZK lazima ziwakilishe uthibitisho wa uhalali kwa ajili ya uthibitishaji. Kama ilivyotajwa, uthibitisho wa uhalali ni hakikisho la kiroptografia kwamba mabadiliko ya hali yaliyopendekezwa na unda-mpya ni kweli matokeo ya kutekeleza kundi husika la miamala. Hii inamaanisha kwamba unda-mpya za ZK zinahitaji tu kutoa uthibitisho wa uhalali ili kukamilisha miamala kwenye Ethereum badala ya kuchapisha data yote ya miamala kwenye mnyororo kama [optimistic rollups](/developers/docs/scaling/optimistic-rollups/).

Hakuna ucheleweshaji wakati wa kuhamisha fedha kutoka kwa unda-mpya ya ZK kwenda Ethereum kwa sababu miamala ya kutoka hutekelezwa mara tu mkataba wa unda-mpya wa ZK unapothibitisha uthibitisho wa uhalali. Kinyume chake, kutoa fedha kutoka kwa optimistic rollups kuna ucheleweshaji ili kumruhusu yeyote kupinga muamala wa kutoka kwa kutumia [uthibitisho wa ulaghai](/glossary/#fraud-proof).

Unda-mpya za ZK huandika miamala kwa Ethereum kama `calldata`. `calldata` ni mahali ambapo data inayojumuishwa katika miito ya nje kwa vitendaji vya mkataba-erevu huhifadhiwa. Taarifa katika `calldata` huchapishwa kwenye mnyororo wa bloku, na kumruhusu yeyote kuunda upya hali ya unda-mpya kwa kujitegemea. Unda-mpya za ZK hutumia mbinu za kubana data ili kupunguza data ya muamala—kwa mfano, akaunti zinawakilishwa na faharasa badala ya anwani, ambayo huokoa baiti 28 za data. Uchapishaji wa data kwenye mnyororo ni gharama kubwa kwa unda-mpya, hivyo kubana data kunaweza kupunguza ada kwa watumiaji.

## Unda-mpya za ZK huingilianaje na Ethereum? {#zk-rollups-and-ethereum}

Mnyororo wa unda-mpya wa ZK ni itifaki ya nje ya mnyororo inayofanya kazi juu ya mnyororo wa bloku wa Ethereum na inasimamiwa na mikataba-erevu ya Ethereum iliyo kwenye mnyororo. Unda-mpya za ZK hutekeleza miamala nje ya Mtandao Mkuu, lakini mara kwa mara huwasilisha makundi ya miamala ya nje ya mnyororo kwa mkataba wa unda-mpya ulio kwenye mnyororo. Rekodi hii ya muamala haibadiliki, kama vile mnyororo wa bloku wa Ethereum, na huunda mnyororo wa unda-mpya wa ZK.

Usanifu mkuu wa unda-mpya wa ZK umeundwa na vipengele vifuatavyo:

1. **Mikataba iliyo kwenye mnyororo**: Kama ilivyotajwa, itifaki ya unda-mpya ya ZK inadhibitiwa na mikataba-erevu inayoendeshwa kwenye Ethereum. Hii inajumuisha mkataba mkuu unaohifadhi bloku za unda-mpya, kufuatilia amana, na kufuatilia masasisho ya hali. Mkataba mwingine ulio kwenye mnyororo (mkataba wa kuthibitisha) huthibitisha uthibitisho wa zero-knowledge uliowasilishwa na wazalishaji wa bloku. Hivyo, Ethereum hutumika kama safu ya msingi au "safu ya 1" kwa unda-mpya ya ZK.

2. **Mashine halisi ya nje ya mnyororo (VM)**: Ingawa itifaki ya unda-mpya ya ZK iko kwenye Ethereum, utekelezaji wa miamala na hifadhi ya hali hufanyika kwenye mashine halisi tofauti isiyotegemea [EVM](/developers/docs/evm/). VM hii ya nje ya mnyororo ni mazingira ya utekelezaji wa miamala kwenye unda-mpya ya ZK na hutumika kama safu ya pili au "safu ya 2" kwa itifaki ya unda-mpya ya ZK. Uthibitisho wa uhalali unaothibitishwa kwenye Mtandao Mkuu wa Ethereum huhakikisha usahihi wa mabadiliko ya hali katika VM ya nje ya mnyororo.

Unda-mpya za ZK ni "suluhisho za uongezwaji za mseto"—itifaki za nje ya mnyororo zinazofanya kazi kwa kujitegemea lakini zinapata usalama kutoka kwa Ethereum. Hasa, mtandao wa Ethereum hutekeleza uhalali wa masasisho ya hali kwenye unda-mpya ya ZK na huhakikisha upatikanaji wa data nyuma ya kila sasisho la hali ya unda-mpya. Matokeo yake, unda-mpya za ZK ni salama zaidi kuliko suluhisho za uongezwaji za nje ya mnyororo, kama vile [sidechains](/developers/docs/scaling/sidechains/), ambazo zinawajibika kwa sifa zao za usalama, au [validiums](/developers/docs/scaling/validium/), ambazo pia huthibitisha miamala kwenye Ethereum kwa kutumia uthibitisho wa uhalali, lakini huhifadhi data ya muamala mahali pengine.

Unda-mpya za ZK hutegemea itifaki kuu ya Ethereum kwa yafuatayo:

### Upatikanaji wa data {#data-availability}

Unda-mpya za ZK huchapisha data ya hali kwa kila muamala unaochakatwa nje ya mnyororo kwenda Ethereum. Kwa data hii, inawezekana kwa watu binafsi au biashara kuiga hali ya unda-mpya na kuhalalisha mnyororo wenyewe. Ethereum hufanya data hii ipatikane kwa washiriki wote wa mtandao kama `calldata`.

Unda-mpya za ZK hazihitaji kuchapisha data nyingi ya miamala kwenye mnyororo kwa sababu uthibitisho wa uhalali tayari unathibitisha uhalisi wa mabadiliko ya hali. Hata hivyo, kuhifadhi data kwenye mnyororo bado ni muhimu kwa sababu inaruhusu uthibitishaji usio na ruhusa, wa kujitegemea wa hali ya mnyororo wa L2 ambao kwa upande wake unaruhusu mtu yeyote kuwasilisha makundi ya miamala, na kuzuia waendeshaji wenye dhamira mbaya kudhibiti au kufungia mnyororo.

Kwenye mnyororo inahitajika ili watumiaji waingiliane na unda-mpya. Bila ufikiaji wa data ya hali, watumiaji hawawezi kuuliza salio la akaunti zao au kuanzisha miamala (k.m., uondoaji) inayotegemea taarifa ya hali.

### Umisho wa muamala {#transaction-finality}

Ethereum hufanya kazi kama safu ya malipo kwa unda-mpya za ZK: miamala ya L2 hukamilishwa tu ikiwa mkataba wa L1 unakubali uthibitisho wa uhalali. Hii huondoa hatari ya waendeshaji wenye dhamira mbaya kuharibu mnyororo (k.m., kuiba fedha za unda-mpya) kwani kila muamala lazima uidhinishwe kwenye Mtandao Mkuu. Pia, Ethereum huhakikisha kwamba operesheni za watumiaji haziwezi kugeuzwa mara tu zinapokamilishwa kwenye L1.

### Ukinzani dhidi ya udhibiti {#censorship-resistance}

Unda-mpya nyingi za ZK hutumia "supernode" (mwendeshaji) kutekeleza miamala, kuzalisha makundi, na kuwasilisha bloku kwa L1. Ingawa hii inahakikisha ufanisi, inaongeza hatari ya udhibiti: waendeshaji wa unda-mpya wa ZK wenye dhamira mbaya wanaweza kudhibiti watumiaji kwa kukataa kujumuisha miamala yao katika makundi.

Kama hatua ya usalama, unda-mpya za ZK huruhusu watumiaji kuwasilisha miamala moja kwa moja kwa mkataba wa unda-mpya kwenye Mtandao Mkuu ikiwa wanafikiri wanadhibitiwa na mwendeshaji. Hii inaruhusu watumiaji kulazimisha kutoka kwa unda-mpya ya ZK kwenda Ethereum bila kutegemea ruhusa ya mwendeshaji.

## Unda-mpya za ZK hufanyaje kazi? {#how-do-zk-rollups-work}

### Miamala {#transactions}

Watumiaji katika unda-mpya ya ZK husaini miamala na kuiwasilisha kwa waendeshaji wa L2 kwa ajili ya usindikaji na ujumuishaji katika kundi linalofuata. Katika baadhi ya matukio, mwendeshaji ni huluki ya kati, inayoitwa mratibu wa mfuatano, ambaye hutekeleza miamala, kuiunganisha kuwa makundi, na kuiwasilisha kwa L1. Mratibu wa mfuatano katika mfumo huu ndiye huluki pekee inayoruhusiwa kuzalisha bloku za L2 na kuongeza miamala ya unda-mpya kwenye mkataba wa unda-mpya wa ZK.

Unda-mpya zingine za ZK zinaweza kubadilisha jukumu la mwendeshaji kwa kutumia seti ya wathibitishaji wa [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/). Waendeshaji watarajiwa huweka fedha katika mkataba wa unda-mpya, ambapo ukubwa wa kila hisa huathiri nafasi ya mweka hisa kuchaguliwa kuzalisha kundi linalofuata la unda-mpya. Hisa ya mwendeshaji inaweza kupunguzwa ikiwa atatenda kwa dhamira mbaya, jambo ambalo huwahamasisha kuchapisha bloku halali.

#### Jinsi unda-mpya za ZK zinavyochapisha data ya muamala kwenye Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Kama ilivyoelezwa, data ya muamala huchapishwa kwenye Ethereum kama `calldata`. `calldata` ni eneo la data katika mkataba-erevu linalotumiwa kupitisha hoja kwa kitendaji na hufanya kazi sawa na [kumbukumbu](/developers/docs/smart-contracts/anatomy/#memory). `calldata` haihifadhiwi kama sehemu ya hali ya Ethereum, inadumu kwenye mnyororo kama sehemu ya [kumbukumbu za historia](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) za mnyororo wa Ethereum. `calldata` haiathiri hali ya Ethereum, na kuifanya kuwa njia ya bei rahisi ya kuhifadhi data kwenye mnyororo.

Neno kuu `calldata` mara nyingi hutambulisha mbinu ya mkataba-erevu inayoitwa na muamala na huhifadhi viingizio vya mbinu hiyo katika mfumo wa mfuatano wowote wa baiti. Unda-mpya za ZK hutumia `calldata` kuchapisha data ya muamala iliyobanwa kwenye mnyororo; mwendeshaji wa unda-mpya huongeza tu kundi jipya kwa kuita kitendaji kinachohitajika katika mkataba wa unda-mpya na kupitisha data iliyobanwa kama hoja za kitendaji. Hii husaidia kupunguza gharama kwa watumiaji kwani sehemu kubwa ya ada za unda-mpya huelekezwa kwenye kuhifadhi data ya muamala kwenye mnyororo.

### Ahadi za hali {#state-commitments}

Hali ya unda-mpya ya ZK, ambayo inajumuisha akaunti na salio za L2, inawakilishwa kama [mti wa Merkle](/whitepaper/#merkle-trees). Hashi ya kiroptografia ya mzizi wa mti wa Merkle (mzizi wa Merkle) huhifadhiwa katika mkataba wa kwenye mnyororo, kuruhusu itifaki ya unda-mpya kufuatilia mabadiliko katika hali ya unda-mpya ya ZK.

Unda-mpya hubadilika na kuwa hali mpya baada ya utekelezaji wa seti mpya ya miamala. Mwendeshaji aliyeanzisha mabadiliko ya hali anahitajika kukokotoa mzizi mpya wa hali na kuwasilisha kwa mkataba wa kwenye mnyororo. Ikiwa uthibitisho wa uhalali unaohusishwa na kundi umethibitishwa na mkataba wa kuthibitisha, mzizi mpya wa Merkle unakuwa mzizi wa hali rasmi wa unda-mpya ya ZK.

Mbali na kukokotoa mizizi ya hali, mwendeshaji wa unda-mpya wa ZK pia huunda mzizi wa kundi—mzizi wa mti wa Merkle unaojumuisha miamala yote katika kundi. Wakati kundi jipya linawasilishwa, mkataba wa unda-mpya huhifadhi mzizi wa kundi, kuruhusu watumiaji kuthibitisha muamala (k.m., ombi la kutoa pesa) ulijumuishwa katika kundi. Watumiaji watalazimika kutoa maelezo ya muamala, mzizi wa kundi, na [uthibitisho wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) unaoonyesha njia ya ujumuishaji.

### Uthibitisho wa uhalali {#validity-proofs}

Mzizi mpya wa hali ambao mwendeshaji wa unda-mpya wa ZK anawasilisha kwa mkataba wa L1 ni matokeo ya masasisho kwenye hali ya unda-mpya. Sema Alice anamtumia Bob ishara 10, mwendeshaji anapunguza tu salio la Alice kwa 10 na kuongeza salio la Bob kwa 10. Kisha mwendeshaji huhasi data ya akaunti iliyosasishwa, anaunda upya mti wa Merkle wa unda-mpya, na anawasilisha mzizi mpya wa Merkle kwa mkataba wa kwenye mnyororo.

Lakini mkataba wa unda-mpya hautakubali kiotomatiki ahadi ya hali iliyopendekezwa hadi mwendeshaji athibitishe kuwa mzizi mpya wa Merkle ulitokana na masasisho sahihi kwenye hali ya unda-mpya. Mwendeshaji wa unda-mpya wa ZK hufanya hivi kwa kutoa uthibitisho wa uhalali, ahadi fupi ya kiroptografia inayothibitisha usahihi wa miamala iliyowekwa kwenye makundi.

Uthibitisho wa uhalali huruhusu pande kuthibitisha usahihi wa taarifa bila kufichua taarifa yenyewe—hivyo, pia huitwa uthibitisho wa zero-knowledge. Unda-mpya za ZK hutumia uthibitisho wa uhalali kuthibitisha usahihi wa mabadiliko ya hali ya nje ya mnyororo bila kulazimika kutekeleza upya miamala kwenye Ethereum. Uthibitisho huu unaweza kuja katika mfumo wa [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Hoja Fupi Isiyoingiliana ya Ujuzi ya Zero-Knowledge) au [ZK-STARK](https://eprint.iacr.org/2018/046) (Hoja Inayoweza Kuongezwa Uwazi ya Ujuzi ya Zero-Knowledge).

SNARKs na STARKs zote husaidia kuthibitisha uadilifu wa ukokotoaji wa nje ya mnyororo katika unda-mpya za ZK, ingawa kila aina ya uthibitisho ina sifa za kipekee.

**ZK-SNARKs**

Ili itifaki ya ZK-SNARK ifanye kazi, kuunda Mfuatano wa Rejea ya Pamoja (CRS) ni muhimu: CRS hutoa vigezo vya umma vya kuthibitisha na kuthibitisha uthibitisho wa uhalali. Usalama wa mfumo wa uthibitisho unategemea usanidi wa CRS; ikiwa taarifa iliyotumika kuunda vigezo vya umma itaangukia mikononi mwa wahusika wenye dhamira mbaya, wanaweza kuwa na uwezo wa kutoa uthibitisho wa uhalali wa uongo.

Baadhi ya unda-mpya za ZK hujaribu kutatua tatizo hili kwa kutumia [sherehe ya ukokotoaji wa pande nyingi (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), inayohusisha watu wanaoaminika, ili kuzalisha vigezo vya umma kwa ajili ya mzunguko wa ZK-SNARK. Kila upande huchangia bahati nasibu (inayoitwa "taka sumu") katika ujenzi wa CRS, ambayo lazima waiharibu mara moja.

Usanidi unaoaminika hutumiwa kwa sababu huongeza usalama wa usanidi wa CRS. Muda wote mshiriki mmoja mkweli anapoharibu ingizo lake, usalama wa mfumo wa ZK-SNARK unahakikishwa. Bado, mbinu hii inahitaji kuwaamini wale waliohusika kufuta bahati nasibu yao iliyochukuliwa na si kudhoofisha dhamana za usalama za mfumo.

Mbali na dhana za uaminifu, ZK-SNARKs ni maarufu kwa ukubwa wao mdogo wa uthibitisho na uthibitishaji wa wakati usiobadilika. Kwa kuwa uthibitishaji wa uthibitisho kwenye L1 unajumuisha gharama kubwa zaidi ya kuendesha unda-mpya ya ZK, L2s hutumia ZK-SNARKs kuzalisha uthibitisho unaoweza kuthibitishwa haraka na kwa bei nafuu kwenye Mtandao Mkuu.

**ZK-STARKs**

Kama ZK-SNARKs, ZK-STARKs huthibitisha uhalali wa ukokotoaji wa nje ya mnyororo bila kufichua viingizi. Hata hivyo, ZK-STARKs huchukuliwa kama uboreshaji wa ZK-SNARKs kwa sababu ya uwezo wao wa kuongezeka na uwazi.

ZK-STARKs ni 'wazi', kwani zinaweza kufanya kazi bila usanidi unaoaminika wa Mfuatano wa Rejea ya Pamoja (CRS). Badala yake, ZK-STARKs hutegemea bahati nasibu inayoweza kuthibitishwa na umma ili kuweka vigezo vya kuzalisha na kuthibitisha uthibitisho.

ZK-STARKs pia hutoa uwezo mkubwa zaidi wa kuongezeka kwa sababu muda unaohitajika kuthibitisha na kuthibitisha uthibitisho wa uhalali huongezeka _karibu-linearly_ kulingana na ugumu wa ukokotoaji wa msingi. Kwa ZK-SNARKs, nyakati za kuthibitisha na kuthibitisha huongezeka _linearly_ kulingana na ukubwa wa ukokotoaji wa msingi. Hii inamaanisha ZK-STARKs zinahitaji muda mfupi kuliko ZK-SNARKs kwa kuthibitisha na kuthibitisha wakati seti kubwa za data zinahusika, na kuzifanya kuwa muhimu kwa matumizi ya kiwango kikubwa.

ZK-STARKs pia ni salama dhidi ya kompyuta za quantum, wakati Kiroptografia ya Mviringo wa Elliptic (ECC) inayotumiwa katika ZK-SNARKs inaaminika kuwa rahisi kushambuliwa na mashambulizi ya kompyuta ya quantum. Upungufu wa ZK-STARKs ni kwamba huzalisha ukubwa mkubwa zaidi wa uthibitisho, ambao ni ghali zaidi kuthibitisha kwenye Ethereum.

#### Uthibitisho wa uhalali hufanyaje kazi katika unda-mpya za ZK? {#validity-proofs-in-zk-rollups}

##### Uzalishaji wa uthibitisho

Kabla ya kukubali miamala, mwendeshaji atafanya ukaguzi wa kawaida. Hii inajumuisha kuthibitisha kwamba:

- Akaunti za mtumaji na mpokeaji ni sehemu ya mti wa hali.
- Mtumaji ana fedha za kutosha kushughulikia muamala.
- Muamala ni sahihi na unalingana na ufunguo wa umma wa mtumaji kwenye unda-mpya.
- Nonce ya mtumaji ni sahihi, n.k.

Mara tu nodi ya unda-mpya ya ZK inapokuwa na miamala ya kutosha, inaziunganisha kuwa kundi na kuandaa viingizi kwa ajili ya mzunguko wa kuthibitisha ili kuandaa uthibitisho mfupi wa ZK. Hii inajumuisha:

- Mzizi wa mti wa Merkle unaojumuisha miamala yote katika kundi.
- Uthibitisho wa Merkle kwa miamala ili kuthibitisha ujumuishaji katika kundi.
- Uthibitisho wa Merkle kwa kila jozi ya mtumaji-mpokeaji katika miamala ili kuthibitisha akaunti hizo ni sehemu ya mti wa hali wa unda-mpya.
- Seti ya mizizi ya hali ya kati, inayotokana na kusasisha mzizi wa hali baada ya kutumia masasisho ya hali kwa kila muamala (yaani, kupunguza akaunti za watumaji na kuongeza akaunti za wapokeaji).

Mzunguko wa kuthibitisha hukokotoa uthibitisho wa uhalali kwa "kupitia" kila muamala na kufanya ukaguzi uleule ambao mwendeshaji alikamilisha kabla ya kushughulikia muamala. Kwanza, inathibitisha kuwa akaunti ya mtumaji ni sehemu ya mzizi uliopo wa hali kwa kutumia uthibitisho wa Merkle uliotolewa. Kisha inapunguza salio la mtumaji, inaongeza nonce yao, inahasi data ya akaunti iliyosasishwa na kuiunganisha na uthibitisho wa Merkle ili kutoa mzizi mpya wa Merkle.

Mzizi huu wa Merkle unaonyesha mabadiliko pekee katika hali ya unda-mpya ya ZK: mabadiliko katika salio na nonce ya mtumaji. Hii inawezekana kwa sababu uthibitisho wa Merkle uliotumiwa kuthibitisha uwepo wa akaunti hutumiwa kupata mzizi mpya wa hali.

Mzunguko wa kuthibitisha hufanya mchakato uleule kwenye akaunti ya mpokeaji. Inakagua ikiwa akaunti ya mpokeaji ipo chini ya mzizi wa hali ya kati (kwa kutumia uthibitisho wa Merkle), inaongeza salio lao, inahasi upya data ya akaunti na kuiunganisha na uthibitisho wa Merkle ili kutoa mzizi mpya wa hali.

Mchakato unarudiwa kwa kila muamala; kila "mzunguko" huunda mzizi mpya wa hali kutokana na kusasisha akaunti ya mtumaji na mzizi mpya unaofuata kutokana na kusasisha akaunti ya mpokeaji. Kama ilivyoelezwa, kila sasisho la mzizi wa hali linawakilisha sehemu moja ya mti wa hali wa unda-mpya inayobadilika.

Mzunguko wa kuthibitisha wa ZK hupitia kundi zima la miamala, ukithibitisha mfuatano wa masasisho ambayo husababisha mzizi wa mwisho wa hali baada ya muamala wa mwisho kutekelezwa. Mzizi wa mwisho wa Merkle uliokokotolewa unakuwa mzizi mpya zaidi wa hali rasmi wa unda-mpya ya ZK.

##### Uthibitishaji wa uthibitisho

Baada ya mzunguko wa kuthibitisha kuthibitisha usahihi wa masasisho ya hali, mwendeshaji wa L2 huwasilisha uthibitisho wa uhalali uliokokotolewa kwa mkataba wa kuthibitisha kwenye L1. Mzunguko wa uthibitishaji wa mkataba huthibitisha uhalali wa uthibitisho na pia hukagua viingizi vya umma ambavyo ni sehemu ya uthibitisho:

- **Mzizi wa kabla ya hali**: Mzizi wa zamani wa hali wa unda-mpya ya ZK (yaani, kabla ya miamala iliyowekwa kwenye makundi kutekelezwa), unaoakisi hali ya mwisho inayojulikana kuwa halali ya mnyororo wa L2.

- **Mzizi wa baada ya hali**: Mzizi mpya wa hali wa unda-mpya ya ZK (yaani, baada ya utekelezaji wa miamala iliyowekwa kwenye makundi), unaoakisi hali mpya zaidi ya mnyororo wa L2. Mzizi wa baada ya hali ni mzizi wa mwisho unaopatikana baada ya kutumia masasisho ya hali katika mzunguko wa kuthibitisha.

- **Mzizi wa kundi**: Mzizi wa Merkle wa kundi, unaopatikana kwa _kuweka kwenye mti wa Merkle_ miamala katika kundi na kuhasi mzizi wa mti.

- **Viingizi vya muamala**: Data inayohusishwa na miamala iliyotekelezwa kama sehemu ya kundi lililowasilishwa.

Ikiwa uthibitisho unakidhi mzunguko (yaani, ni halali), inamaanisha kuwa kuna mfuatano wa miamala halali ambayo hubadilisha unda-mpya kutoka hali ya awali (iliyotiwa alama ya kidole kiroptografia na mzizi wa kabla ya hali) hadi hali mpya (iliyotiwa alama ya kidole kiroptografia na mzizi wa baada ya hali). Ikiwa mzizi wa kabla ya hali unalingana na mzizi uliohifadhiwa katika mkataba wa unda-mpya, na uthibitisho ni halali, mkataba wa unda-mpya huchukua mzizi wa baada ya hali kutoka kwenye uthibitisho na kusasisha mti wake wa hali ili kuakisi hali iliyobadilika ya unda-mpya.

### Kuingia na kutoka {#entries-and-exits}

Watumiaji huingia kwenye unda-mpya ya ZK kwa kuweka ishara katika mkataba wa unda-mpya uliotumwa kwenye mnyororo wa L1. Muamala huu unawekwa kwenye foleni kwani waendeshaji pekee ndio wanaoweza kuwasilisha miamala kwa mkataba wa unda-mpya.

Ikiwa foleni ya amana inayosubiri itaanza kujaa, mwendeshaji wa unda-mpya wa ZK atachukua miamala ya amana na kuiwasilisha kwa mkataba wa unda-mpya. Mara tu fedha za mtumiaji zinapokuwa kwenye unda-mpya, anaweza kuanza kufanya miamala kwa kutuma miamala kwa mwendeshaji ili ichakatwe. Watumiaji wanaweza kuthibitisha salio kwenye unda-mpya kwa kuhasi data ya akaunti yao, kutuma hashi kwa mkataba wa unda-mpya, na kutoa uthibitisho wa Merkle ili kuthibitisha dhidi ya mzizi wa sasa wa hali.

Kutoa fedha kutoka kwa unda-mpya ya ZK kwenda L1 ni rahisi. Mtumiaji huanzisha muamala wa kutoka kwa kutuma mali zake kwenye unda-mpya kwa akaunti maalum kwa ajili ya kuchomwa. Ikiwa mwendeshaji atajumuisha muamala katika kundi linalofuata, mtumiaji anaweza kuwasilisha ombi la kutoa pesa kwa mkataba wa kwenye mnyororo. Ombi hili la kutoa pesa litajumuisha yafuatayo:

- Uthibitisho wa Merkle unaothibitisha ujumuishaji wa muamala wa mtumiaji kwenye akaunti ya kuchoma katika kundi la miamala

- Data ya muamala

- Mzizi wa kundi

- Anwani ya L1 ya kupokea fedha zilizowekwa

Mkataba wa unda-mpya huhasi data ya muamala, hukagua ikiwa mzizi wa kundi upo, na hutumia uthibitisho wa Merkle kuangalia ikiwa hashi ya muamala ni sehemu ya mzizi wa kundi. Baada ya hapo, mkataba hutekeleza muamala wa kutoka na kutuma fedha kwa anwani iliyochaguliwa na mtumiaji kwenye L1.

## Unda-mpya za ZK na uoanifu wa EVM {#zk-rollups-and-evm-compatibility}

Tofauti na optimistic rollups, unda-mpya za ZK haziendani kwa urahisi na [Mashine Halisi ya Ethereum (EVM)](/developers/docs/evm/). Kuthibitisha ukokotoaji wa jumla wa EVM katika mizunguko ni ngumu zaidi na kunahitaji rasilimali nyingi kuliko kuthibitisha ukokotoaji rahisi (kama uhamisho wa ishara ulioelezwa hapo awali).

Hata hivyo, [maendeleo katika teknolojia ya zero-knowledge](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) yanachochea upya nia ya kufunika ukokotoaji wa EVM katika uthibitisho wa zero-knowledge. Juhudi hizi zinalenga kuunda utekelezaji wa zero-knowledge EVM (zkEVM) unaoweza kuthibitisha kwa ufanisi usahihi wa utekelezaji wa programu. ZkEVM huunda upya misimbo ya uendeshaji iliyopo ya EVM kwa ajili ya kuthibitisha/kuthibitisha katika mizunguko, kuruhusu kutekeleza mikataba-erevu.

Kama EVM, zkEVM hubadilika kati ya hali baada ya ukokotoaji kufanywa kwenye baadhi ya viingizi. Tofauti ni kwamba zkEVM pia huunda uthibitisho wa zero-knowledge ili kuthibitisha usahihi wa kila hatua katika utekelezaji wa programu. Uthibitisho wa uhalali unaweza kuthibitisha usahihi wa operesheni zinazogusa hali ya VM (kumbukumbu, mrundikano, ghala) na ukokotoaji wenyewe (yaani, je, operesheni iliita misimbo sahihi ya uendeshaji na kuitekeleza kwa usahihi?).

Kuanzishwa kwa unda-mpya za ZK zinazoendana na EVM kunatarajiwa kusaidia wasanidi programu kutumia uwezo wa kuongezeka na dhamana za usalama za uthibitisho wa zero-knowledge. Muhimu zaidi, uoanifu na miundombinu asilia ya Ethereum inamaanisha wasanidi programu wanaweza kuunda mfumo mtawanyo wa kimamlaka unaofaa kwa ZK kwa kutumia zana na lugha zinazojulikana (na zilizojaribiwa).

## Ada za unda-mpya za ZK hufanyaje kazi? {#how-do-zk-rollup-fees-work}

Kiasi ambacho watumiaji hulipa kwa miamala kwenye unda-mpya za ZK kinategemea ada ya gesi, kama tu kwenye Mtandao Mkuu wa Ethereum. Hata hivyo, ada za gesi hufanya kazi tofauti kwenye L2 na huathiriwa na gharama zifuatazo:

1. **Uandishi wa hali**: Kuna gharama isiyobadilika ya kuandika kwenye hali ya Ethereum (yaani, kuwasilisha muamala kwenye mnyororo wa bloku wa Ethereum). Unda-mpya za ZK hupunguza gharama hii kwa kuweka miamala kwenye makundi na kugawanya gharama zisizobadilika kwa watumiaji wengi.

2. **Uchapishaji wa data**: Unda-mpya za ZK huchapisha data ya hali kwa kila muamala kwenda Ethereum kama `calldata`. Gharama za `calldata` kwa sasa zinasimamiwa na [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), ambayo inabainisha gharama ya gesi 16 kwa baiti zisizo sifuri na gesi 4 kwa baiti sifuri za `calldata`, mtawalia. Gharama inayolipwa kwa kila muamala huathiriwa na kiasi gani cha `calldata` kinachohitaji kuchapishwa kwenye mnyororo kwa ajili yake.

3. **Ada za mwendeshaji wa L2**: Hiki ni kiasi kinacholipwa kwa mwendeshaji wa unda-mpya kama fidia kwa gharama za ukokotoaji zilizotumika katika kuchakata miamala, sawa na ["ada za kipaumbele za muamala (vidokezo)"](/developers/docs/gas/#how-are-gas-fees-calculated) kwenye Mtandao Mkuu wa Ethereum.

4. **Uzalishaji na uthibitishaji wa uthibitisho**: Waendeshaji wa unda-mpya wa ZK lazima wazalishe uthibitisho wa uhalali kwa makundi ya miamala, jambo ambalo linahitaji rasilimali nyingi. Kuthibitisha uthibitisho wa zero-knowledge kwenye Mtandao Mkuu pia hugharimu gesi (~ gesi 500,000).

Mbali na kuweka miamala kwenye makundi, unda-mpya za ZK hupunguza ada kwa watumiaji kwa kubana data ya muamala. Unaweza [kuona muhtasari wa wakati halisi](https://l2fees.info/) wa gharama za kutumia unda-mpya za ZK za Ethereum.

## Unda-mpya za ZK huongezaje ukubwa wa Ethereum? {#scaling-ethereum-with-zk-rollups}

### Ubanaji wa data ya muamala {#transaction-data-compression}

Unda-mpya za ZK huongeza uwezo wa usindikaji kwenye safu ya msingi ya Ethereum kwa kupeleka ukokotoaji nje ya mnyororo, lakini msukumo halisi wa kuongeza ukubwa hutokana na kubana data ya muamala. [Ukubwa wa bloku](/developers/docs/blocks/#block-size) wa Ethereum huweka kikomo cha data ambayo kila bloku inaweza kushikilia na, kwa hivyo, idadi ya miamala inayochakatwa kwa kila bloku. Kwa kubana data inayohusiana na miamala, unda-mpya za ZK huongeza kwa kiasi kikubwa idadi ya miamala inayochakatwa kwa kila bloku.

Unda-mpya za ZK zinaweza kubana data ya muamala bora kuliko optimistic rollups kwa kuwa hazihitaji kuchapisha data yote inayohitajika kuhalalisha kila muamala. Zinahitaji tu kuchapisha data ndogo inayohitajika ili kuunda upya hali ya hivi karibuni ya akaunti na salio kwenye unda-mpya.

### Ithibati za kujirudia {#recursive-proofs}

Faida ya uthibitisho wa zero-knowledge ni kwamba uthibitisho unaweza kuthibitisha uthibitisho mwingine. Kwa mfano, ZK-SNARK moja inaweza kuthibitisha ZK-SNARKs zingine. "Uthibitisho wa uthibitisho" kama huo huitwa uthibitisho wa kurudia na huongeza kwa kiasi kikubwa uwezo wa usindikaji kwenye unda-mpya za ZK.

Hivi sasa, uthibitisho wa uhalali hutolewa kwa msingi wa bloku kwa bloku na huwasilishwa kwa mkataba wa L1 kwa ajili ya uthibitishaji. Hata hivyo, kuthibitisha uthibitisho wa bloku moja huweka kikomo cha uwezo wa usindikaji ambao unda-mpya za ZK zinaweza kufikia kwani bloku moja tu inaweza kukamilishwa wakati mwendeshaji anawasilisha uthibitisho.

Uthibitisho wa kurudia, hata hivyo, hufanya iwezekanavyo kukamilisha bloku kadhaa kwa uthibitisho mmoja wa uhalali. Hii ni kwa sababu mzunguko wa kuthibitisha huunganisha kwa kurudia uthibitisho wa bloku nyingi hadi uthibitisho mmoja wa mwisho utakapoundwa. Mwendeshaji wa L2 huwasilisha uthibitisho huu wa kurudia, na ikiwa mkataba utaukubali, bloku zote husika zitakamilishwa mara moja. Kwa uthibitisho wa kurudia, idadi ya miamala ya unda-mpya ya ZK inayoweza kukamilishwa kwenye Ethereum kwa vipindi huongezeka.

### Faida na hasara za unda-mpya za ZK {#zk-rollups-pros-and-cons}

| Faida                                                                                                                                                                                                                                 | Hasara                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Uthibitisho wa uhalali huhakikisha usahihi wa miamala ya nje ya mnyororo na kuzuia waendeshaji kutekeleza mabadiliko batili ya hali.                                                                                  | Gharama inayohusishwa na kukokotoa na kuthibitisha uthibitisho wa uhalali ni kubwa na inaweza kuongeza ada kwa watumiaji wa unda-mpya.                                                                               |
| Hutoa umisho wa haraka wa muamala kwani masasisho ya hali yanaidhinishwa mara tu uthibitisho wa uhalali unapothibitishwa kwenye L1.                                                                                   | Kujenga unda-mpya za ZK zinazoendana na EVM ni ngumu kutokana na ugumu wa teknolojia ya zero-knowledge.                                                                                                              |
| Hutegemea mifumo ya kiroptografia isiyo na uaminifu kwa usalama, si uaminifu wa wahusika waliohamasishwa kama ilivyo kwa [optimistic rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Kuzalisha uthibitisho wa uhalali kunahitaji vifaa maalum, jambo ambalo linaweza kuhimiza udhibiti wa kati wa mnyororo na pande chache.                                                                               |
| Huhifadhi data inayohitajika kurejesha hali ya nje ya mnyororo kwenye L1, ambayo inahakikisha usalama, upinzani dhidi ya udhibiti, na ugatuaji.                                                                       | Waendeshaji wa kati (waratibu wa mfuatano) wanaweza kuathiri mpangilio wa miamala.                                                                                                                |
| Watumiaji hunufaika na ufanisi mkubwa wa mtaji na wanaweza kutoa fedha kutoka L2 bila ucheleweshaji.                                                                                                                  | Mahitaji ya vifaa yanaweza kupunguza idadi ya washiriki wanaoweza kulazimisha mnyororo kufanya maendeleo, na kuongeza hatari ya waendeshaji wenye dhamira mbaya kufungia hali ya unda-mpya na kudhibiti watumiaji.   |
| Haitegemei dhana za uhai na watumiaji hawahitaji kuhalalisha mnyororo ili kulinda fedha zao.                                                                                                                          | Baadhi ya mifumo ya uthibitisho (k.m., ZK-SNARK) inahitaji usanidi unaoaminika ambao, ukitumiwa vibaya, unaweza kuhatarisha muundo wa usalama wa unda-mpya ya ZK. |
| Ubanaji bora wa data unaweza kusaidia kupunguza gharama za kuchapisha `calldata` kwenye Ethereum na kupunguza ada za unda-mpya kwa watumiaji.                                                                         |                                                                                                                                                                                                                                      |

### Maelezo ya kuona ya unda-mpya za ZK {#zk-video}

Tazama Finematics ikielezea unda-mpya za ZK:

<YouTube id="7pWxCklcNsU" start="406" />

## Nani anafanyia kazi zkEVM? {#zkevm-projects}

Miradi inayofanyia kazi zkEVMs ni pamoja na:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM ni mradi unaofadhiliwa na Msingi wa Ethereum kuendeleza unda-mpya ya ZK inayooana na EVM na utaratibu wa kuzalisha uthibitisho wa uhalali kwa bloku za Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _ni unda-mpya ya ZK iliyogatuliwa kwenye mtandao mkuu wa Ethereum inayofanyia kazi Mashine Halisi ya Ethereum ya zero-knowledge (zkEVM) inayotekeleza miamala ya Ethereum kwa njia ya uwazi, ikijumuisha mikataba-erevu na uthibitisho wa zero-knowledge._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll ni kampuni inayoendeshwa na teknolojia inayofanyia kazi ujenzi wa Suluhisho la asili la Safu ya 2 la zkEVM kwa Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko ni unda-mpya ya ZK iliyogatuliwa, sawa na Ethereum (aina ya [Type 1 ZK-EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era ni unda-mpya ya ZK inayooana na EVM iliyojengwa na Matter Labs, inayotumia zkEVM yake yenyewe._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet ni suluhisho la uongezwaji la safu ya 2 linalooana na EVM lililojengwa na StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph ni suluhisho la uongezwaji la unda-mpya la mseto linalotumia uthibitisho wa zk kushughulikia suala la changamoto ya hali ya Safu ya 2._

- **[Linea](https://linea.build)** - _Linea ni Safu ya 2 ya zkEVM sawa na Ethereum iliyojengwa na Consensys, inayolingana kikamilifu na mfumo wa ikolojia wa Ethereum._

## Masomo zaidi kuhusu unda-mpya za ZK {#further-reading-on-zk-rollups}

- [Unda-mpya za Zero-Knowledge ni Nini?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Unda-mpya za zero-knowledge ni nini?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Mwongozo wa Vitendo wa Rollups za Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs dhidi ya SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM ni nini?](https://www.alchemy.com/overviews/zkevm)
- [Aina za ZK-EVM: Sawa na Ethereum, sawa na EVM, Aina 1, Aina 4, na maneno mengine ya siri](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Utangulizi wa zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [ZK-EVM L2s ni nini?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Rasilimali za kushangaza za zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS chini ya kofia](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARKs zinawezekanaje?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
