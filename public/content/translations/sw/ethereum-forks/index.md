---
title: Mfuatano wa matukio ya uma zote za Ethereum (2014 hadi sasa)
description: Historia ya blockchain ya Ethereum ikijumuisha hatua kuu, matoleo, na migawanyiko (forks).
lang: sw
sidebarDepth: 1
---

# Mfuatano wa matukio ya uma zote za Ethereum (2014 hadi sasa) {#the-history-of-ethereum}

Mfuatano wa matukio yote makuu, migawanyiko (forks), na masasisho ya blockchain ya Ethereum.

<ExpandableCard title="Uma ni nini?" contentPreview="Mabadiliko kwenye kanuni za itifaki ya Ethereum yanayojumuisha masasisho ya kiufundi.">

Uma ni wakati masasisho makubwa ya kiufundi au mabadiliko yanahitajika kufanywa kwenye mtandao - kwa kawaida hutokana na [Mapendekezo ya Uboreshaji wa Ethereum (EIPs)](/eips/) na kubadilisha "sheria" za itifaki.

Wakati masasisho yanapohitajika katika programu za kiasili zinazodhibitiwa na kituo kimoja, kampuni huchapisha tu toleo jipya kwa mtumiaji wa mwisho Blockchains hufanya kazi tofauti kwa sababu hakuna mmiliki mmoja wa kati. [Ethereum clients](/developers/docs/nodes-and-clients/) lazima wasasishe programu zao ili kutekeleza sheria mpya za uma. Zaidi ya hayo, waundaji wa blok (wachimbaji katika mfumo wa Proof-of-Work, validators katika mfumo wa Proof-of-Stake) na nodi lazima waweke blok na kuthibitisha kulingana na kanuni mpya. [Zaidi kuhusu taratibu za makubaliano](/developers/docs/consensus-mechanisms/)

Mabadiliko haya ya sheria yanaweza kuunda mgawanyiko wa muda katika mtandao. Mabadiliko haya ya kanuni yanaweza kusababisha mgawanyiko wa muda mfupi katika mtandao. Migawanyiko kwa kawaida hukubaliana mapema ili wateja wa mtandao wakubali mabadiliko kwa wakati mmoja, na fork yenye masasisho inakuwa mnyororo mkuu. Hata hivyo, katika matukio machache, kutokubaliana kuhusu migawanyiko kunaweza kusababisha mtandao kugawanyika kudumu – mfano maarufu ni kuundwa kwa Ethereum Classic kupitia <a href="#dao-fork">DAO fork</a>
</ExpandableCard>

<ExpandableCard title="Kwa nini masasisho mengine yana majina mengi?" contentPreview="Majina ya masasisho hufuata mtindo">

Programu inayounga mkono Ethereum imeundwa kwa sehemu mbili, zinazojulikana kama tabaka la utekelezaji na tabaka la makubaliano

**Utoaji majina wa sasisho la utekelezaji**

Tangu 2021, masasisho ya **safu ya utekelezaji** yanaitwa kulingana na majina ya miji ya [maeneo ya awali ya Devcon](https://devcon.org/en/past-events/) kwa mfuatano wa matukio:

| Jina la Sasisho | Mwaka wa Devcon | Namba ya Devcon | Tarehe ya Sasisho |
| --------------- | --------------- | --------------- | ----------------- |
| Berlin          | 2014            | 0               | Aprili 15, 2021   |
| London          | 2015            | I               | Agosti 5, 2021    |
| Shanghai        | 2016            | II              | Aprili 12, 2023   |
| Cancun          | 2017            | III             | Machi 13, 2024    |
| **Prague**      | 2018            | IV              | TBD - Ifuatayo    |
| _Osaka_         | 2019            | V               | TBD               |
| _Bogota_        | 2022            | VI              | TBD               |
| _Bangkok_       | 2024            | VII             | TBD               |

**Utoaji majina wa sasisho la makubaliano**

Tangu kuzinduliwa kwa [Mnyororo Kioleza](/glossary/#beacon-chain), masasisho ya **safu ya makubaliano** yanaitwa kwa majina ya nyota za angani yanayoanza na herufi zinazofuata kwa mpangilio wa alfabeti:

| Jina la Sasisho                                               | Tarehe ya Sasisho |
| ------------------------------------------------------------- | ----------------- |
| Mwanzo wa Mnyororo wa Beacon                                  | Desemba 1, 2020   |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | Oktoba 27, 2021   |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | Septemba 6, 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | Aprili 12, 2023   |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | Machi 13, 2024    |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | TBD - Ifuatayo    |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | TBD               |

**Utoaji majina uliounganishwa**

Masasisho ya utekelezaji na makubaliano awali yalitolewa kwa nyakati tofauti, lakini baada ya [Muungano](/roadmap/merge/) mnamo 2022 yametekelezwa kwa wakati mmoja. Kwa hivyo, maneno ya kawaida yameibuka ili kurahisisha kurejelea masasisho haya kwa kutumia neno moja lililounganishwa Hii ilianza na masasisho ya Shanghai-Capella, ambayo kwa kawaida hujulikana kama 'Shapella', na inaendelea na masasisho ya Cancun-Deneb (Dencun), pamoja na Prague-Electra (Pectra).

| Sasisho la Utekelezaji | Sasisho la Makubaliano | Jina Fupi  |
| ---------------------- | ---------------------- | ---------- |
| Shanghai               | Capella                | "Shapella" |
| Cancun                 | Deneb                  | "Dencun"   |
| Prague                 | Electra                | "Pectra"   |
| Osaka                  | Fulu                   | "Fusaka"   |
</ExpandableCard>

Nenda moja kwa moja kwenye taarifa kuhusu baadhi ya masasisho muhimu yaliyopita: [Mnyororo Kioleza](/roadmap/beacon-chain/); [Muungano](/roadmap/merge/); na [EIP-1559](#london)

Je, unatafuta visasisho vya itifaki vya siku zijazo? [Jifunze kuhusu masasisho yajayo kwenye ramani ya Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Zaidi kuhusu Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Sasisho la Prague-Electra ("Pectra") lilijumuisha maboresho kadhaa kwenye itifaki ya Ethereum yaliyozalisha uzoefu bora kwa watumiaji wote, mitandao ya safu ya 2, stakers, na waendeshaji wa nodi.

Staking ilipata uboreshaji kwa kuunganisha akaunti za wathibitishaji, na kuboresha udhibiti wa fedha zilizowekwa kwenye hisa kwa kutumia anwani ya uondoaji ya utekelezaji. EIP-7251 iliongeza usawa bora zaidi kwa kithibitishaji kimoja hadi 2048, kuboresha ufanisi wa mtaji kwa wadau. EIP-7002 iliruhusu akaunti ya utekelezaji kuanzisha kwa usalama hatua za wathibitishaji, ikiwa ni pamoja na kutoka kwenye staking au kutoa sehemu ya fedha, ikiboresha uzoefu wa stakers wa ETH, huku ikisaidia kuimarisha uwajibikaji kwa waendeshaji wa nodi.

Sehemu zingine za uboreshaji zililenga kuboresha matumizi kwa watumiaji wa kawaida. EIP-7702 ilileta uwezo kwa akaunti ya kawaida isiyo ya mkataba-erevu ([EOA](/glossary/#eoa)) kutekeleza msimbo unaofanana na ule wa mkataba-erevu. Hii ilifungua uwezo usio na kikomo kwa akaunti za kawaida za Ethereum, kama vile kuunganisha miamala, ufadhili wa gharama za miamala, uthibitishaji mbadala, udhibiti wa matumizi wa fedha kwa mpango, mifumo ya urejeshaji akaunti, na mengine mengi.

<ExpandableCard title="Pectra EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

Uzoefu bora wa mtumiaji:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Set EOA account code</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Blob throughput increase</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Increase calldata cost</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Add blob schedule to EL config files</em></li>
</ul>

Uzoefu bora wa staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Increase the <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Execution layer triggerable exits</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>General purpose execution layer requests</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Supply validator deposits on chain</em></li>
</ul>

Maboresho ya ufanisi na usalama wa itifaki:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Precompile for BLS12-381 curve operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Save historical block hashes in state</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Move committee index outside Attestation</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Jinsi Pectra itakavyoboresha uzoefu wa kusimamisha](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Soma vigezo vya sasisho la Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Maswali Yanayoulizwa Mara kwa Mara kuhusu Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Muhtasari wa Cancun {#cancun-summary}

Sasisho la Cancun lina seti ya maboresho kwa _utekelezaji_ wa Ethereum yanayolenga kuboresha uongezekaji, kwa pamoja na masasisho ya makubaliano ya Deneb.

Hasa, hili linajumuisha EIP-4844, inayojulikana kama **Proto-Danksharding**, ambayo inapunguza kwa kiasi kikubwa gharama ya uhifadhi wa data kwa unda-mpya za safu ya 2. Hili linaafikiwa kupitia kuanzishwa kwa "blobs" za data ambazo huwezesha rollups ya kuchapisha data kwa Mainnet kwa muda mfupi. Hii inasababisha ada za ununuzi za chini sana kwa watumiaji wa safu ya 2 ya rollups.

<ExpandableCard title="Cancun EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Transient storage opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob transactions (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Memory copying instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> only in same transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>
</ExpandableCard>

- [Unda-mpya za safu ya 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Soma vigezo vya sasisho la Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Muhtasari wa Deneb {#deneb-summary}

Sasisho la Deneb lina seti ya maboresho kwa _makubaliano_ ya Ethereum yanayolenga kuboresha uongezekaji. Uboreshaji huu unafanyika sambamba na maboresho ya utekelezaji ya Cancun ili kuwezesha Proto-Danksharding (EIP-4844), pamoja na maboresho mengine kwenye Mnyororo wa Beacon.

Ujumbe uliosainiwa wa “kutoka hiari” uliotengenezwa mapema hauendi tena, hivyo kuipa watumiaji udhibiti zaidi juu ya fedha zao zinazoshikiliwa na mtoaji wa nodi wa mtu wa tatu. Kwa kutumia ujumbe huu uliosainiwa wa kutoka, **watumiaji wanaoshiriki staking** wanaweza kuwapisha wengine kuendesha nodi huku wakiwa na uwezo wa kuondoka salama na kutoa fedha zao wakati wowote, bila kuhitaji ruhusa kutoka kwa mtu yeyote.

EIP-7514 inaleta ukaguzi kwenye utoaji wa ETH kwa kuweka kikomo cha kiwango cha “churn”, yaani idadi ya wakaguzi wanaoweza kujiunga na mitandao, hadi (8) kwa kila epoch. Kwa kuwa utoaji wa ETH unalingana na jumla ya ETH iliyosimamishwa, kuweka kikomo kwa idadi ya wathibitishaji wanaojiunga kunapunguza _kasi ya ukuaji_ wa ETH mpya iliyotolewa, huku pia ikipunguza mahitaji ya maunzi kwa waendeshaji wa nodi, na kusaidia ugatuzi.

<ExpandableCard title="Deneb EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob transactions</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Perpetually valid signed voluntary exits</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Increase max attestation inclusion slot</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Add max epoch churn limit</em></li>
</ul>
</ExpandableCard>

- [Soma vigezo vya sasisho la Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Maswali Yanayoulizwa Mara kwa Mara kuhusu Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Muhtasari wa Shanghai {#shanghai-summary}

Uboreshaji wa Shanghai ulipeleka utoaji wa staking kwenye safu ya utekelezaji. Sambamba na uboreshaji wa Capella, hii iliruhusu vitalu kupokea operesheni za uondoaji, ambazo zinawawezesha watumiaji wa staking kutoa ETH zao kutoka mnyororo wa Beacon kwenda safu ya utekelezaji.

<ExpandableCard title="Shanghai EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Starts the <code>COINBASE</code> address warm</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>New <code>PUSH0</code> instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limit and meter initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Beacon chain push withdrawals as operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [Soma vigezo vya sasisho la Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Muhtasari wa Capella {#capella-summary}

Uboreshaji wa Capella ulikuwa uboresaji mkubwa wa tatu wa safu ya makubaliano ( mnyororo wa Beacon) na uliwezesha utoaji wa staking. Capella ilitokea kwa usawa na uboreshaji wa safu ya utekelezaji, Shanghai, na kuwezesha utendakazi wa uondoaji wa staking.

Uboreshaji huu wa safu ya makubaliano ulileta uwezo kwa watumiaji wa staking ambao hawakutoa sifa za kujiondoa pamoja na amana zao za awali kufanya hivyo, hivyo kuwezesha utoaji.

Uboreshaji pia uliweka uwezo wa kufutwa kwa akaunti moja kwa moja, ambao unaendelea kuchambua akaunti za wadhibiti kwa malipo yoyote ya tuzo zilizopo au uondoaji kamili.

- [Zaidi kuhusu uondoaji wa kusimamisha](/staking/withdrawals/).
- [Soma vigezo vya sasisho la Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (Muungano) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Muhtasari {#paris-summary}

Sasisho la Paris lilianzishwa na mnyororo wa bloku wa uthibitishaji-wa-kazi kupita [ugumu wa jumla wa mwisho](/glossary/#terminal-total-difficulty) wa 58750000000000000000000. Hili lilitokea katika kitalu 15537393 mnamo 15 Septemba 2022, likichochea uboreshaji wa Paris katika kitalu kilichofuata. Paris ulikuwa mpito wa [Muungano](/roadmap/merge/) - sifa yake kuu ilikuwa kuzima algoriti ya uchimbaji ya [uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow) na mantiki ya makubaliano husika na kuwasha [proof-of-stake](/developers/docs/consensus-mechanisms/pos) badala yake. Paris yenyewe ilikuwa sasisho kwa [programu za utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) (sawa na Bellatrix kwenye safu ya makubaliano) iliyowawezesha kuchukua maagizo kutoka kwa [programu zao za makubaliano](/developers/docs/nodes-and-clients/#consensus-clients) zilizounganishwa nao. Hii ilihitaji seti mpya ya mbinu za ndani za API, zinazojulikana kwa pamoja kama [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), kuwashwa. Bila shaka hili lilikuwa sasisho muhimu zaidi katika historia ya Ethereum tangu [Homestead](#homestead)!

- [Soma vigezo vya sasisho la Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Upgrade consensus to Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Supplant DIFFICULTY opcode with PREVRANDAO</em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Muhtasari {#bellatrix-summary}

Sasisho la Bellatrix lilikuwa sasisho la pili lililopangwa kwa [Mnyororo Kioleza](/roadmap/beacon-chain), likiandaa mnyororo kwa ajili ya [Muungano](/roadmap/merge/). Huleta adhabu za waidhinishaji kwa maadili yao kamili kwa kutokuwa na shughuli na makosa yanayoweza kupunguzwa. Bellatrix pia inajumuisha sasisho kwa sheria za uchaguzi wa umma ili kuandaa mnyororo wa Kuunganisha na mpito kutoka kizuizi cha mwisho cha uthibitisho wa kazi hadi kizuizi cha kwanza cha uthibitisho wa kitalu. Hii inajumuisha kuzifanya programu za makubaliano zifahamu kuhusu [ugumu wa jumla wa mwisho](/glossary/#terminal-total-difficulty) wa 58750000000000000000000.

- [Soma vigezo vya sasisho la Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Muhtasari {#gray-glacier-summary}

Sasisho la mtandao la Gray Glacier lilisogeza nyuma [bomu la ugumu](/glossary/#difficulty-bomb) kwa miezi mitatu. Hili ndilo badiliko pekee lililoletwa katika sasisho hili, na linafanana kiasili na masasisho ya [Arrow Glacier](#arrow-glacier) na [Muir Glacier](#muir-glacier). Mabadiliko kama hayo yamefanywa kwenye masasisho ya mtandao ya [Byzantium](#byzantium), [Constantinople](#constantinople) na [London](#london).

- [Blogu ya EF - Tangazo la Sasisho la Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>delays the difficulty bomb until September 2022</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Muhtasari {#arrow-glacier-summary}

Sasisho la mtandao la Arrow Glacier lilisogeza nyuma [bomu la ugumu](/glossary/#difficulty-bomb) kwa miezi kadhaa. Hili ndilo badiliko pekee lililoletwa katika sasisho hili, na linafanana kiasili na sasisho la [Muir Glacier](#muir-glacier). Mabadiliko kama hayo yamefanywa kwenye masasisho ya mtandao ya [Byzantium](#byzantium), [Constantinople](#constantinople) na [London](#london).

- [Blogu ya EF - Tangazo la Sasisho la Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Sasisho la Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>delays the difficulty bomb until June 2022</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Muhtasari {#altair-summary}

Sasisho la Altair lilikuwa sasisho la kwanza lililopangwa kwa [Mnyororo Kioleza](/roadmap/beacon-chain). Iliongeza usaidizi kwa "kamati za kusawazisha" - kuwezesha wateja wepesi, na kuongezeka kwa kutotumika kwa kiidhinisha na kupunguza adhabu kadiri maendeleo yanavyosonga mbele kuelekea Kuunganisha.

- [Soma vigezo vya sasisho la Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Ukweli wa kufurahisha! {#altair-fun-fact}

Altair ilikuwa sasisho kuu la kwanza la mtandao ambalo lilikuwa na wakati kamili wa uchapishaji. Kila sasisho la awali lilitokana na nambari ya kitalu iliyotangazwa kwenye mnyororo wa uthibitisho wa kazi, ambapo nyakati za vitalu hutofautiana. Mnyororo wa Beacon hauhitaji kusuluhishwa kwa uthibitisho wa kazi, na badala yake hufanya kazi kwa mfumo wa enzi unaotegemea wakati unaojumuisha "nafasi" 32 za sekunde kumi na mbili ambapo wathibitishaji wanaweza kupendekeza vizuizi. Hii ndiyo sababu tulijua ni lini hasa tungepiga epoch 74,240 na Altair ikawa moja kwa moja!

- [Wakati wa bloku](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Muhtasari {#london-summary}

Sasisho la London lilianzisha [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), ambalo lilifanyia marekebisho soko la ada za miamala, pamoja na mabadiliko ya jinsi marejesho ya gesi yanavyoshughulikiwa na ratiba ya [Zama za Barafu](/glossary/#ice-age).

#### Uboreshaji wa London / EIP-1559 ulikuwa nini? {#eip-1559}

Kabla ya Uboreshaji wa London, Ethereum ilikuwa na vitalu vya ukubwa usiobadilika. Wakati wa mahitaji ya juu ya mtandao, vitalu hivi vilifanya kazi kwa uwezo kamili. Kama matokeo, watumiaji mara nyingi walilazimika kungoja mahitaji yapunguzwe ili kujumuishwa kwenye kitalu, ambayo ilisababisha uzoefu mbaya wa mtumiaji. Uboreshaji wa London ulianzisha vitalu vya ukubwa tofauti kwa Ethereum.

Jinsi ada za miamala kwenye mtandao wa Ethereum zilivyokokotolewa ilibadilika na [Sasisho la London](/ethereum-forks/#london) la Agosti 2021. Kabla ya sasisho la London, ada zilikokotolewa bila kutenganisha ada za `msingi` na `kipaumbele`, kama ifuatavyo:

Wacha tuseme Alice alilazimika kumlipa Bob 1 ETH. Katika shughuli hiyo, kikomo cha gharama ni 21,000, na bei ya gharama za miamalani 200 gwei.

Ada ya jumla ingekuwa: `Vizio vya gesi (kikomo) * Bei ya gesi kwa kizio` yaani `21,000 * 200 = 4,200,000 gwei` au 0.0042 ETH

Utekelezaji wa [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) katika Sasisho la London ulifanya utaratibu wa ada ya muamala kuwa mgumu zaidi, lakini ulifanya ada za gesi zitabirike zaidi, na kusababisha soko la ada ya muamala lenye ufanisi zaidi. Watumiaji wanaweza kuwasilisha miamala na `maxFeePerGas` inayolingana na kiasi wanachotaka kulipa ili muamala utekelezwe, wakijua kuwa hawatalipa zaidi ya bei ya soko ya gesi (`baseFeePerGas`), na watarejeshewa kiasi chochote cha ziada, ukiondoa bakshishi yao.

Video hii inaelezea EIP-1559 na manufaa yake: [EIP-1559 Imefafanuliwa](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Je, wewe ni mjenzi wa dapp? Hakikisha unasasisha maktaba na zana zako.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Soma ufafanuzi wa Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>improves the transaction fee market</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>returns the <code>BASEFEE</code> from a block</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduces gas refunds for EVM operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>prevents deploying contracts starting with <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>delays the Ice Age until December 2021</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Muhtasari {#berlin-summary}

Uboreshaji wa Berlin uliboresha gharama za miamala kwa baadhi ya vitendo vya EVM, na kuongeza msaada kwa aina nyingi za miamala.

- [Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Soma ufafanuzi wa Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye sasisho hili.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>lowers ModExp gas cost</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>enables easier support for multiple transaction types</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>gas cost increases for state access opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>adds optional access lists</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Mwanzo wa Mnyororo Kioleza {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Muhtasari {#beacon-chain-genesis-summary}

[Mnyororo Kioleza](/roadmap/beacon-chain/) ulihitaji amana 16384 za ETH 32 zilizosimamishwa ili uzinduliwe kwa usalama. Hili lilitokea Novemba 27, na Mnyororo Kioleza ulianza kutoa bloku mnamo Desemba 1, 2020.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Mnyororo Kioleza
</DocLink>

---

### Mkataba wa amana wa kusimamisha watekelezwa {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Muhtasari {#deposit-contract-summary}

Mkataba wa amana wa kusimamisha ulianzisha [kusimamisha](/glossary/#staking) kwenye mfumo-ikolojia wa Ethereum. Ingawa ni mkataba wa [Mtandao Mkuu](/glossary/#mainnet), ulikuwa na athari ya moja kwa moja kwenye mfuatano wa matukio ya uzinduzi wa [Mnyororo Kioleza](/roadmap/beacon-chain/), [sasisho muhimu la Ethereum](/roadmap/).

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">Kusimamisha</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Muhtasari {#muir-glacier-summary}

Uma wa Muir Glacier ulianzisha ucheleweshaji wa [bomu la ugumu](/glossary/#difficulty-bomb). Kuongezeka kwa ugumu wa bloku wa utaratibu wa makubaliano wa [uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow/) kulitishia kudhoofisha utumiaji wa Ethereum kwa kuongeza muda wa kusubiri wa kutuma miamala na kutumia mfumo mtawanyo wa kimamlaka.

- [Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Soma ufafanuzi wa Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>delays the difficulty bomb for another 4,000,000 blocks, or ~611 days.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Muhtasari {#istanbul-summary}

The Istanbul fork:

- Iliboresha gharama ya [gesi](/glossary/#gas) ya vitendo fulani katika [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ustahimilivu ulioboreshwa wa shambulio la kunyimwa huduma.
- Ilifanya suluhu za [uongezekaji wa Safu ya 2](/developers/docs/scaling/#layer-2-scaling) zinazotegemea SNARKs na STARKs kuwa na utendaji bora zaidi.
- Imewezeshwa Ethereum na Zcash kuingiliana.
- Kandarasi zinazoruhusiwa ili kuanzisha kazi zaidi za ubunifu.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>allow Ethereum to work with privacy-preserving currency like Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>cheaper cryptography to improve [gas](/glossary/#gas) costs.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protects Ethereum against replay attacks by adding <code>CHAINID</code> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optimising opcode gas prices based on consumption.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduces the cost of CallData to allow more data in blocks – good for [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>other opcode gas price alterations.</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Muhtasari {#constantinople-summary}

The Constantinople fork:

- Ilipunguza zawadi za [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/) wa bloku kutoka ETH 3 hadi 2.
- Ilihakikisha mnyororo wa bloku haukuganda kabla ya [proof-of-stake kutekelezwa](#beacon-chain-genesis).
- Iliboresha gharama ya [gesi](/glossary/#gas) ya vitendo fulani katika [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Imeongeza uwezo wa kuingiliana na anwani ambazo bado hazijaundwa.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimises cost of certain onchain actions.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>allows you to interact with addresses that have yet to be created.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduces the <code>EXTCODEHASH</code> instruction to retrieve the hash of another contract's code.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>makes sure the blockchain doesn&#39;t freeze before proof-of-stake and reduces block reward from 3 to 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Muhtasari {#byzantium-summary}

Fork ya Byzantium:

- Ilipunguza zawadi za [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/) wa bloku kutoka ETH 5 hadi 3.
- Ilichelewesha [bomu la ugumu](/glossary/#difficulty-bomb) kwa mwaka mmoja.
- Imeongezwa uwezo wa kufanya simu zisizobadilisha hali kwa mikataba mingine.
- Iliongeza mbinu fulani za kriptografia kuruhusu [uongezekaji wa safu ya 2](/developers/docs/scaling/#layer-2-scaling).

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adds <code>REVERT</code> opcode.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>status field added to transaction receipts to indicate success or failure.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>enables RSA signature verification.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>adds support for variable length return values.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>adds <code>STATICCALL</code> opcode, allowing non-state-changing calls to other contracts.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>changes difficulty adjustment formula.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>delays [difficulty bomb](/glossary/#difficulty-bomb) by 1 year and reduces block reward from 5 to 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Muhtasari {#spurious-dragon-summary}

Uma wa Joka la Uongo lilikuwa jibu la pili kwa mashambulizi ya kunyimwa huduma (DoS) kwenye mtandao (Septemba/Oktoba 2016) ikiwa ni pamoja na:

- kupanga bei ya msimbo ili kuzuia mashambulizi ya baadaye kwenye mtandao.
- kuwezesha "debloat" ya hali ya kiambajengo.
- kuongeza ulinzi wa mashambulizi ya kurudiwa.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> - <em>huzuia miamala kutoka kwa msururu mmoja wa Ethereum kutangazwa tena kwenye msururu mbadala, kwa mfano muamala wa testnet unaochezwa tena kwenye msururu mkuu wa Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> - <em>hurekebisha bei za <code>EXP</code> opcode - hufanya iwe vigumu zaidi kupunguza kasi ya mtandao kupitia utendakazi wa gharama kubwa wa kimahesabu.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>allows for removal of empty accounts added via the DOS attacks.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>changes the maximum code size that a contract on the blockchain can have – to 24576 bytes.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Muhtasari {#tangerine-whistle-summary}

The Tangerine Whistle fork lilikuwa jibu la kwanza kwa mashambulizi ya kunyimwa huduma (DoS) kwenye mtandao (Septemba/Oktoba 2016) ikijumuisha:

- kushughulikia masuala ya dharura ya afya ya mtandao kuhusu misimbo ya uendeshaji ya bei ya chini.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>increases gas costs of opcodes that can be used in spam attacks.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> - <em>hupunguza ukubwa wa jimbo kwa kuondoa idadi kubwa ya akaunti tupu ambazo ziliwekwa katika jimbo hilo kwa gharama ya chini sana kutokana na dosari katika matoleo ya awali ya itifaki ya Ethereum.</em></li>
</ul>
</ExpandableCard>

---

### Uma wa DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Muhtasari {#dao-fork-summary}

Uma wa DAO ulikuwa jibu kwa [shambulio la DAO la 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) ambapo mkataba usio salama wa [DAO](/glossary/#dao) uliporwa zaidi ya ETH milioni 3.6 katika udukuzi. Uma ulihamisha fedha kutoka kwa mkataba wenye hitilafu hadi [mkataba mpya](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) wenye kazi moja tu: kutoa. Mtu yeyote aliyepoteza pesa anaweza kutoa ETH 1 kwa kila tokeni 100 za DAO kwenye pochi zao.

Njia hii ya utekelezaji iliamuliwa kwa kura na jamii ya Ethereum. Mmiliki yeyote wa ETH aliweza kupiga kura kupitia muamala kwenye [jukwaa la kupigia kura](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Uamuzi wa kugawanya ilifika zaidi ya asilimia 85 ya kura.

Baadhi ya wachimbaji walikataa kutumia uma kwa sababu tukio la DAO halikuwa na kasoro katika itifaki. Waliendelea na kuunda [Ethereum Classic](https://ethereumclassic.org/).

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Muhtasari {#homestead-summary}

Uma wa Nyumbani ambao uliangalia siku zijazo. Ilijumuisha mabadiliko kadhaa ya itifaki na mabadiliko ya mtandao ambayo yalimpa Ethereum uwezo wa kufanya uboreshaji zaidi wa mtandao.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Maboresho rasmi yaliyojumuishwa kwenye uma huu.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>makes edits to contract creation process.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>adds new opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduces devp2p forward compatibility requirements</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Uyeyukaji wa Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Muhtasari {#frontier-thawing-summary}

Uma wa uyeyukaji wa Frontier uliondoa [kikomo cha gesi](/glossary/#gas) 5,000 kwa kila [bloku](/glossary/#block) na kuweka bei chaguo-msingi ya gesi kuwa [gwei](/glossary/#gwei) 51. Hii inaruhusiwa kwa shughuli - shughuli zinahitaji gharama ya muamala ya 21,000. [Bomu la ugumu](/glossary/#difficulty-bomb) lilianzishwa ili kuhakikisha uma mgumu wa baadaye kwenda [proof-of-stake](/glossary/#pos).

- [Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Soma Sasisho la 1 la Itifaki ya Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Muhtasari {#frontier-summary}

Frontier ilikuwa hai, lakini utekelezaji wa mradi wa Ethereum. Ilifuata awamu ya majaribio ya Olimpiki yenye mafanikio. Ilikusudiwa kwa watumiaji wa kiufundi, haswa watengenezaji. [Bloku](/glossary/#block) zilikuwa na [kikomo cha gesi](/glossary/#gas) cha 5,000. Kipindi hiki cha ‘kuyeyusha’ kiliwawezesha wachimbaji kuanza shughuli zao na kwa watumiaji wa awali kufunga wateja wao bila ‘kuharakisha’.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Uuzaji wa Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether officially went on sale for 42 days. Unaweza kuinunua na BTC.

[Soma tangazo la Msingi wa Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper imetolewa {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Karatasi ya Njano, iliyoandikwa na Dk. Gavin Wood, ni ufafanuzi wa kiufundi wa itifaki ya Ethereum.

[Angalia Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Karatasi nyeeupe imetolewa {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Karatasi ya utangulizi, iliyochapishwa mnamo 2013 na Vitalik Buterin, mwanzilishi wa Ethereum, kabla ya uzinduzi wa mradi mnamo 2015.

<DocLink href="/whitepaper/">Karatasi nyeeupe</DocLink>
