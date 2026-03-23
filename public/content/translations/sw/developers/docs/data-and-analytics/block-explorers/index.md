---
title: Wachunguzi wa tofali
description: Utangulizi wa wachunguzi wa tofali, lango lako katika ulimwengu wa data ya mnyororo wa bloku, ambapo unaweza kuuliza maelezo kuhusu miamala, akaunti, mikataba na zaidi.
lang: sw
sidebarDepth: 3
---

Wachunguzi wa tofali ni lango lako la data ya Ethereum. Unaweza kuzitumia kuona data ya muda halisi kwenye bloku, miamala, wathibitishaji, akaunti na shughuli zingine za onchain.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana za msingi za Ethereum ili uweze kuelewa data ambayo mchunguzi wa tofali anakupa. Anza na [utangulizi wa Ethereum](/developers/docs/intro-to-ethereum/).

## Huduma {#services}

- [Etherscan](https://etherscan.io/) -_Pia inapatikana katika Kichina, Kikorea, Kirusi, na Kijapani_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Pia inapatikana kwa Kihispania, Kifaransa, Kiitaliano, Kiholanzi, Kireno, Kirusi, Kichina na Kifarsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) -_Pia inapatikana katika Kichina, Kihispania, Kifaransa, Kituruki, Kirusi, Kikorea na Kivietinamu_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Ethseer](https://ethseer.io)

## Zana za programu huria {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Data {#data}

Ethereum ni wazi kwa muundo kwa hivyo kila kitu kinaweza kuthibitishwa. Wachunguzi wa tofali hutoa kiolesura cha kupata maelezo haya. Na hii ni kwa mtandao mkuu wa Ethereum na testnet, iwapo utahitaji data hiyo. Data imegawanywa katika data ya utekelezaji na data ya makubaliano. Data ya utekelezaji inahusu miamala ambayo imetekelezwa katika bloku maalum. Data ya makubaliano inahusu bloku zenyewe na wathibitishaji waliozipendekeza.

Huu ni muhtasari wa aina za data unazoweza kupata kutoka kwa mchunguzi wa tofali.

### Data ya utekelezaji {#execution-data}

Bloku mpya huongezwa kwenye Ethereum kila sekunde 12 (isipokuwa mpendekezaji wa bloku akikosa zamu yake), kwa hivyo mtiririko wa data unaokaribia kuwa wa kila mara huongezwa kwa wachunguzi wa tofali. Bloku zina data nyingi muhimu ambazo unaweza kupata kuwa za manufaa:

**Data ya kawaida**

- Urefu wa bloku - Nambari ya bloku na urefu wa mnyororo wa bloku (katika bloku) wakati wa kuundwa kwa bloku ya sasa
- Timestamp - Wakati ambapo bloku ilipendekezwa
- Miamala - Idadi ya miamala iliyojumuishwa ndani ya bloku
- Mpokeaji wa ada - Anwani iliyopokea zawadi za ada ya gesi kutoka kwa miamala
- Zawadi ya Kizuizi - Kiasi cha ETH kinachotolewa kwa mthibitishaji aliyependekeza bloku
- Ukubwa - Ukubwa wa data ndani ya bloku (hupimwa kwa baiti)
- Gesi iliyotumika - Jumla ya vitengo vya gesi vilivyotumiwa na miamala katika bloku
- Kikomo cha gesi - Jumla ya vikomo vya gesi vilivyowekwa na miamala katika bloku
- Ada ya msingi kwa kila gesi - Kizidisho cha chini kinachohitajika ili muamala ujumuishwe kwenye bloku
- Ada zilizochomwa - Kiasi gani cha ETH kinachomwa kwenye bloku
- Data ya ziada - Data yoyote ya ziada ambayo mjenzi amejumuisha kwenye bloku

**Data ya hali ya juu**

- Hashi - Hashi ya kroptografia inayowakilisha kichwa cha bloku (kitambulisho cha kipekee cha bloku)
- Hashi kuu - Hashi ya bloku iliyotangulia bloku ya sasa
- StateRoot - Hashi ya msingi ya Merkle trie ambayo huhifadhi hali nzima ya mfumo

### Gesi {#gas}

Sio tu kwamba wachunguzi wa tofali watakupa data kuhusu matumizi ya Gesi katika miamala na bloku, lakini baadhi watakupa maelezo kuhusu bei za sasa za gesi za mtandao. Hii itakusaidia kuelewa matumizi ya mtandao, kuwasilisha miamala salama na kutotumia gesi kupita kiasi. Tafuta API zinazoweza kukusaidia kupata maelezo haya kwenye kiolesura cha bidhaa yako. Data mahususi ya gesi inashughulikia:

- Vikadirio vya vitengo vya gesi vinavyohitajika kwa muamala salama lakini wa polepole (+ bei na muda uliokadiriwa)
- Vikadirio vya vitengo vya gesi vinavyohitajika kwa muamala wa wastani (+ bei na muda uliokadiriwa)
- Vikadirio vya vitengo vya gesi vinavyohitajika kwa muamala wa haraka (+ bei na muda uliokadiriwa)
- Muda wa wastani wa uthibitishaji kulingana na bei ya gesi
- Mikataba inayotumia gesi - kwa maneno mengine, bidhaa maarufu ambazo zinaona matumizi mengi kwenye mtandao
- Akaunti zinazotumia gesi - kwa maneno mengine, watumiaji wa mara kwa mara wa mtandao

### Miamala {#transactions}

Wachunguzi wa tofali wamekuwa mahali pa kawaida kwa watu kufuatilia maendeleo ya miamala yao. Hiyo ni kwa sababu kiwango cha maelezo unayoweza kupata hutoa uhakika wa ziada. Data ya muamala inajumuisha:

**Data ya kawaida**

- Hashi ya muamala - Hashi inayotolewa wakati muamala unapowasilishwa
- Hali - Ishara ya iwapo muamala unasubiri, haukufaulu au umefaulu
- Bloku - Bloku ambayo muamala umejumuishwa
- Timestamp - Wakati ambapo muamala ulijumuishwa kwenye bloku iliyopendekezwa na mthibitishaji
- Kutoka - Anwani ya akaunti iliyowasilisha muamala
- Kwa - Anwani ya mpokeaji au mkataba-erevu ambao muamala huingiliana nao
- Tokeni zilizohamishwa - Orodha ya tokeni zilizohamishwa kama sehemu ya muamala
- Thamani - Jumla ya thamani ya ETH inayohamishwa
- Ada ya muamala - Kiasi kilicholipwa kwa mthibitishaji kuchakata muamala (kinachokokotolewa kwa bei ya gesi\*gesi iliyotumika)

**Data ya hali ya juu**

- Kikomo cha gesi - Idadi ya juu zaidi ya vitengo vya gesi ambavyo muamala huu unaweza kutumia
- Gesi iliyotumika - Kiasi halisi cha vitengo vya gesi ambavyo muamala ulitumia
- Bei ya gesi - Bei iliyowekwa kwa kila kitengo cha gesi
- Nonce - Nambari ya muamala ya anwani ya `kutoka` (kumbuka hii huanza saa 0 kwa hivyo nonce ya `100` itakuwa muamala wa 101 uliowasilishwa na akaunti hii)
- Data ya ingizo - Taarifa zozote za ziada zinazohitajika na muamala

### Akaunti {#accounts}

Kuna data nyingi unazoweza kufikia kuhusu akaunti. Hii ndiyo sababu mara nyingi hupendekezwa kutumia akaunti nyingi ili mali na thamani yako zisiweze kufuatiliwa kwa urahisi. Pia kuna baadhi ya suluhu zinazotengenezwa ili kufanya miamala na shughuli za akaunti kuwa za faragha zaidi. Lakini hii hapa data inayopatikana kwa akaunti:

**Akaunti za mtumiaji**

- Anwani ya akaunti - Anwani ya umma unayoweza kutumia kutuma pesa
- Salio la ETH - Kiasi cha ETH kinachohusishwa na akaunti hiyo
- Jumla ya thamani ya ETH - Thamani ya ETH
- Tokeni - Tokeni zinazohusishwa na akaunti na thamani zake
- Historia ya muamala - Orodha ya miamala yote ambapo akaunti hii ilikuwa mtumaji au mpokeaji

**Mikataba erevu**

Akaunti za mkataba-erevu zina data zote ambazo akaunti ya mtumiaji itakuwa nazo, lakini baadhi ya wachunguzi wa tofali wataonyesha hata maelezo fulani ya msimbo pia. Mifano ni pamoja na:

- Muundaji wa mkataba - Anwani iliyosambaza mkataba kwenye Mtandao Mkuu
- Muamala wa uundaji - Muamala uliojumuisha usambazaji kwenye Mtandao Mkuu
- Msimbo chanzo - Msimbo wa solidity au vyper wa mkataba-erevu
- ABI ya Mkataba - Kiolesura cha Programu ya Binari cha mkataba—miito ambayo mkataba hufanya na data inayopokewa
- Msimbo wa uundaji wa mkataba - Msimbo wa baiti uliokusanywa wa mkataba-erevu—ulioundwa unapokusanya mkataba-erevu ulioandikwa katika Solidity au Vyper, n.k.
- Matukio ya mkataba - Historia ya mbinu zinazoitwa katika mkataba-erevu—kimsingi ni njia ya kuona jinsi mkataba unavyotumiwa na mara ngapi

### Tokeni {#tokens}

Tokeni ni aina ya mkataba kwa hivyo zitakuwa na data sawa na mkataba-erevu. Lakini kwa sababu zina thamani na zinaweza kuuzwa zina pointi za ziada za data:

- Aina - Ikiwa ni ERC-20, ERC-721 au kiwango kingine cha tokeni
- Bei - Ikiwa ni ERC-20 zitakuwa na thamani ya sasa ya soko
- Mtaji wa soko - Ikiwa ni ERC-20 zitakuwa na mtaji wa soko (unaokokotolewa kwa bei\*jumla ya usambazaji)
- Jumla ya usambazaji - Idadi ya tokeni zinazozunguka
- Wamiliki - Idadi ya anwani zinazomiliki tokeni
- Uhamisho - Idadi ya mara ambazo tokeni imehamishwa kati ya akaunti
- Historia ya muamala - Historia ya miamala yote inayojumuisha tokeni
- Anwani ya mkataba - Anwani ya tokeni iliyosambazwa kwenye Mtandao Mkuu
- Desimali - Tokeni za ERC-20 zinagawanyika na zina nafasi za desimali

### Mtandao {#network}

Baadhi ya data za bloku zinahusika na afya ya Ethereum kwa ujumla zaidi.

- Jumla ya miamala - Idadi ya miamala tangu Ethereum iundwe
- Miamala kwa sekunde - Idadi ya miamala inayoweza kuchakatwa ndani ya sekunde moja
- Bei ya ETH - Thamani ya sasa ya ETH 1
- Jumla ya usambazaji wa ETH - Idadi ya ETH inayozunguka—kumbuka ETH mpya huundwa na uundaji wa kila bloku katika mfumo wa zawadi za kizuizi
- Mtaji wa soko - Ukokotoaji wa bei\*usambazaji

## Data ya safu ya makubaliano {#consensus-layer-data}

### Epoch {#epoch}

Kwa sababu za kiusalama, kamati za wathibitishaji zisizo za kawaida huundwa mwishoni mwa kila epoch (kila dakika 6.4). Data ya epoch inajumuisha:

- Nambari ya epoch
- Hali ya kukamilika - Ikiwa epoch imekamilika (Ndiyo/Hapana)
- Muda - Wakati epoch ilipoisha
- Uthibitishaji - Idadi ya uthibitishaji katika epoch (kura za bloku ndani ya yanayopangwa)
- Amana - Idadi ya amana za ETH zilizojumuishwa katika epoch (wathibitishaji lazima waweke hisa ya ETH ili wawe wathibitishaji)
- Slashings - Idadi ya adhabu zinazotolewa kwa wapendekezaji wa bloku au wathibitishaji
- Ushiriki wa kupiga kura - Kiasi cha ETH iliyowekwa hisa kinachotumika kuthibitisha bloku
- Wathibitishaji - Idadi ya wathibitishaji wanaofanya kazi kwa epoch
- Salio la Wastani la Mthibitishaji - Salio la wastani la wathibitishaji wanaofanya kazi
- Yanayopangwa - Idadi ya yanayopangwa yaliyojumuishwa kwenye epoch (yanayopangwa hujumuisha bloku moja halali)

### Yanayopangwa {#slot}

Yanayopangwa ni fursa za uundaji wa bloku, data inayopatikana kwa kila yanayopangwa inajumuisha:

- Epoch - Epoch ambapo yanayopangwa ni halali
- Nambari ya yanayopangwa
- Hali - Hali ya yanayopangwa (Imependekezwa/Imekosa)
- Muda - Timestamp ya yanayopangwa
- Mpendekezaji - Mthibitishaji aliyependekeza bloku kwa ajili ya yanayopangwa
- Mzizi wa bloku - Mzizi wa mti wa hashi wa BeaconBlock
- Mzizi mkuu - Hashi ya bloku iliyotangulia
- Mzizi wa hali - Mzizi wa mti wa hashi wa BeaconState
- Sahihi
- Ufunuo wa Randao
- Graffiti - Mpendekezaji wa bloku anaweza kujumuisha ujumbe wa baiti 32 kwa pendekezo lake la bloku
- Data ya Utekelezaji
  - Hashi ya bloku
  - Hesabu ya amana
  - Mzizi wa amana
- Uthibitishaji - Idadi ya uthibitishaji wa bloku katika yanayopangwa hili
- Amana - Idadi ya amana wakati wa yanayopangwa hili
- Matokeo ya hiari - Idadi ya wathibitishaji walioondoka wakati wa yanayopangwa
- Slashings - Idadi ya adhabu zinazotolewa kwa wapendekezaji wa bloku au wathibitishaji
- Kura - Wathibitishaji waliopigia kura bloku katika yanayopangwa hili

### Bloku {#blocks-1}

Uthibitisho wa Hisa hugawanya muda katika yanayopangwa na epochs. Kwa hivyo hiyo inamaanisha data mpya!

- Mpendekezaji - Mthibitishaji aliyechaguliwa kimahesabu kupendekeza bloku mpya
- Epoch - Epoch ambapo bloku ilipendekezwa
- Yanayopangwa - Yanayopangwa ambapo bloku ilipendekezwa
- Uthibitishaji - Idadi ya uthibitishaji uliojumuishwa katika yanayopangwa—uthibitishaji ni kama kura zinazoonyesha bloku iko tayari kwenda kwenye Mnyororo Kioleza

### Wathibitishaji {#validators}

Wathibitishaji wanawajibika kupendekeza bloku na kuzithibitisha ndani ya yanayopangwa.

- Nambari ya mthibitishaji - Nambari ya kipekee inayowakilisha mthibitishaji
- Salio la sasa - Salio la mthibitishaji likijumuisha zawadi
- Salio linalofaa - Salio la mthibitishaji linalotumika kwa kuweka hisa
- Mapato - Zawadi au adhabu zilizopokewa na mthibitishaji
- Hali - Ikiwa mthibitishaji yuko mtandaoni na anafanya kazi kwa sasa au la
- Ufanisi wa uthibitishaji - Muda wa wastani unaochukua kwa uthibitisho wa mthibitishaji kujumuishwa kwenye mnyororo
- Kustahiki kuwezeshwa - Tarehe (na epoch) ambapo mthibitishaji alipatikana ili kuthibitisha
- Inafanya kazi tangu - Tarehe (na epoch) ambapo mthibitishaji alianza kufanya kazi
- Bloku zilizopendekezwa - Bloku ambayo mthibitishaji amependekeza
- Uthibitishaji - Uthibitisho ambao mthibitishaji ametoa
- Amana - Anwani ya kutoka, hashi ya muamala, nambari ya bloku, timestamp, kiasi na hali ya amana ya kuweka hisa iliyofanywa na mthibitishaji

### Uthibitishaji {#attestations}

Uthibitishaji ni kura za "ndiyo" za kujumuisha bloku kwenye mnyororo. Data zao zinahusiana na rekodi ya uthibitisho na wathibitishaji waliothibitisha

- Yanayopangwa - Yanayopangwa ambapo uthibitisho ulifanyika
- Faharasa ya kamati - Faharasa ya kamati kwenye yanayopangwa lililotolewa
- Biti za mkusanyiko - Inawakilisha uthibitisho uliokusanywa wa wathibitishaji wote wanaoshiriki katika uthibitisho
- Wathibitishaji - Wathibitishaji waliotoa uthibitisho
- Mzizi wa bloku ya Beacon - Inaelekeza kwenye bloku ambayo wathibitishaji wanathibitisha
- Chanzo - Inaelekeza kwa epoch ya hivi punde iliyohalalishwa
- Lengo - Inaelekeza kwenye mpaka wa hivi punde wa epoch
- Sahihi

### Mtandao {#network-1}

Data ya kiwango cha juu cha safu ya makubaliano inajumuisha yafuatayo:

- Epoch ya sasa
- Yanayopangwa ya sasa
- Wathibitishaji wanaofanya kazi - Idadi ya wathibitishaji wanaofanya kazi
- Wathibitishaji wanaosubiri - Idadi ya wathibitishaji wanaosubiri kufanywa watendaji
- ETH iliyowekwa hisa - Kiasi cha ETH kilichowekwa hisa kwenye mtandao
- Salio la wastani - Salio la wastani la ETH la wathibitishaji

## Wachunguzi wa bloku {#block-explorers}

- [Etherscan](https://etherscan.io/) - mchunguzi wa tofali unaoweza kutumia kupata data kwa ajili ya Mtandao Mkuu wa Ethereum na Testnet
- [3xpl](https://3xpl.com/ethereum) - mchunguzi wa Ethereum wa programu huria bila matangazo ambaye huruhusu kupakua seti zake za data
- [Beaconcha.in](https://beaconcha.in/) - mchunguzi wa tofali wa programu huria kwa ajili ya Mtandao Mkuu wa Ethereum na Testnet
- [Blockchair](https://blockchair.com/ethereum) - mchunguzi wa faragha zaidi wa Ethereum. Pia kwa ajili ya kupanga na kuchuja data (mempool)
- [Etherchain](https://www.etherchain.org/) - mchunguzi wa tofali kwa Mtandao Mkuu wa Ethereum
- [Ethplorer](https://ethplorer.io/) - mchunguzi wa tofali anayezingatia tokeni kwa Mtandao Mkuu wa Ethereum na testnet ya Kovan

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Miamala](/developers/docs/transactions/)
- Hifadhi ya fedha (/developers/docs/accounts/)
- [Mitandao](/developers/docs/networks/)
