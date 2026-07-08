---
title: Vichunguzi vya bloku
description: Utangulizi wa vichunguzi vya bloku, lango lako katika ulimwengu wa data ya mnyororo wa vitalu, ambapo unaweza kuuliza taarifa kuhusu miamala, akaunti, mikataba, na zaidi.
lang: sw
sidebarDepth: 3
---

Vichunguzi vya bloku ni lango lako la data ya Ethereum. Unaweza kuvitumia kuona data ya wakati halisi kuhusu vitalu, miamala, wathibitishaji, akaunti, na shughuli nyingine za mnyororoni.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana za msingi za Ethereum ili uweze kuelewa data ambayo kichunguzi cha bloku kinakupa. Anza na [utangulizi wa Ethereum](/developers/docs/intro-to-ethereum/).

## Zana za programu huria {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Kichunguzi cha Ethereum kisicho na matangazo kinachoruhusu kupakua seti zake za data (open-core: moduli za msingi ni programu huria)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Huduma {#services}

- [Blockchair](https://blockchair.com/ethereum) - Kichunguzi cha faragha cha Ethereum. Pia kwa kupanga na kuchuja data ya (mempool). Inapatikana kwa Kihispania, Kifaransa, Kiitaliano, Kiholanzi, Kireno, Kirusi, Kichina, na Kifarsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Pia inapatikana kwa Kichina, Kikorea, Kirusi, na Kijapani
- [Ethplorer](https://ethplorer.io/) - Kichunguzi cha bloku kinacholenga tokeni. Pia inapatikana kwa Kichina, Kihispania, Kifaransa, Kituruki, Kirusi, Kikorea na Kivietinamu
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Data {#data}

Ethereum ni wazi kwa muundo hivyo kila kitu kinaweza kuthibitishwa. Vichunguzi vya bloku hutoa kiolesura cha kupata taarifa hii. Na hii ni kwa ajili ya mtandao mkuu wa Ethereum na mitandao ya majaribio, ikiwa utahitaji data hiyo. Data imegawanywa katika data ya utekelezaji na data ya mwafaka. Data ya utekelezaji inarejelea miamala ambayo imetekelezwa katika kitalu maalum. Data ya mwafaka inarejelea vitalu vyenyewe na wathibitishaji waliovipendekeza.

Huu hapa ni muhtasari wa aina za data unazoweza kupata kutoka kwenye kichunguzi cha bloku.

### Data ya utekelezaji {#execution-data}

Vitalu vipya huongezwa kwenye Ethereum kila sekunde 12 (isipokuwa mpendekezaji wa bloku akose zamu yake), hivyo mtiririko wa data unaokaribia kuwa wa kudumu huongezwa kwenye vichunguzi vya bloku. Vitalu vina data nyingi muhimu ambazo unaweza kuziona zinafaa:

**Data ya kawaida**

- Kimo cha kitalu - Nambari ya kitalu na urefu wa mnyororo wa vitalu (katika vitalu) wakati wa kuunda kitalu cha sasa
- Muhuri wa muda - Muda ambao kitalu kilipendekezwa
- Miamala - Idadi ya miamala iliyojumuishwa ndani ya kitalu
- Mpokeaji wa ada - Anwani iliyopokea vidokezo vya ada ya gesi kutoka kwenye miamala
- Tuzo ya bloku - Kiasi cha ETH kilichotolewa kwa mthibitishaji aliyependekeza kitalu
- Ukubwa - Ukubwa wa data ndani ya kitalu (hupimwa kwa baiti)
- Gesi iliyotumika - Jumla ya uniti za gesi zilizotumika na miamala katika kitalu
- Kikomo cha gesi - Jumla ya vikomo vya gesi vilivyowekwa na miamala katika kitalu
- Ada ya msingi kwa kila gesi - Kizidishi cha chini kinachohitajika ili muamala ujumuishwe kwenye kitalu
- Ada zilizochomwa - Kiasi gani cha ETH kinachomwa katika kitalu
- Data ya ziada - Data yoyote ya ziada ambayo mjenzi amejumuisha kwenye kitalu

**Data ya hali ya juu**

- Heshi - Heshi ya kificho inayowakilisha kichwa cha kizuizi (kitambulisho cha kipekee cha kitalu)
- Heshi ya mzazi - Heshi ya kitalu kilichotangulia kitalu cha sasa
- StateRoot - Heshi ya mzizi ya Merkle trie ambayo huhifadhi hali nzima ya mfumo

### Gesi {#gas}

Sio tu kwamba vichunguzi vya bloku vitakupa data kuhusu matumizi ya Gesi katika miamala na vitalu, bali baadhi vitakupa taarifa kuhusu bei za sasa za gesi za mtandao. Hii itakusaidia kuelewa matumizi ya mtandao, kuwasilisha miamala salama na kutotumia pesa nyingi kwenye gesi. Tafuta API zinazoweza kukusaidia kupata taarifa hii kwenye kiolesura cha bidhaa yako. Data mahususi ya gesi inajumuisha:

- Makadirio ya uniti za gesi zinazohitajika kwa muamala salama lakini wa polepole (+ makadirio ya bei na muda)
- Makadirio ya uniti za gesi zinazohitajika kwa muamala wa wastani (+ makadirio ya bei na muda)
- Makadirio ya uniti za gesi zinazohitajika kwa muamala wa haraka (+ makadirio ya bei na muda)
- Wastani wa muda wa uthibitisho kulingana na bei ya gesi
- Mikataba inayotumia gesi - kwa maneno mengine, bidhaa maarufu zinazoona matumizi mengi kwenye mtandao
- Akaunti zinazotumia gesi - kwa maneno mengine, watumiaji wa mara kwa mara wa mtandao

### Miamala {#transactions}

Vichunguzi vya bloku vimekuwa mahali pa kawaida kwa watu kufuatilia maendeleo ya miamala yao. Hiyo ni kwa sababu kiwango cha maelezo unayoweza kupata hutoa uhakika wa ziada. Data ya muamala inajumuisha:

**Data ya kawaida**

- Heshi ya muamala - Heshi inayozalishwa wakati muamala unawasilishwa
- Hali - Kiashiria cha iwapo muamala unasubiri, umeshindwa au umefaulu
- Kitalu - Kitalu ambacho muamala umejumuishwa
- Muhuri wa muda - Muda ambao muamala ulijumuishwa kwenye kitalu kilichopendekezwa na mthibitishaji
- Kutoka - Anwani ya akaunti iliyowasilisha muamala
- Kwenda - Anwani ya mpokeaji au mkataba mahiri ambao muamala unaingiliana nao
- Tokeni zilizohamishwa - Orodha ya tokeni zilizohamishwa kama sehemu ya muamala
- Thamani - Jumla ya thamani ya ETH inayohamishwa
- Ada ya muamala - Kiasi kinacholipwa kwa mthibitishaji ili kuchakata muamala (hukokotolewa kwa bei ya gesi\*gesi iliyotumika)

**Data ya hali ya juu**

- Kikomo cha gesi - Idadi ya juu zaidi ya uniti za gesi ambazo muamala huu unaweza kutumia
- Gesi iliyotumika - Kiasi halisi cha uniti za gesi ambazo muamala ulitumia
- Bei ya gesi - Bei iliyowekwa kwa kila uniti ya gesi
- Nonsi - Nambari ya muamala kwa anwani ya `from` (kumbuka hii inaanzia 0 hivyo nonsi ya `100` kwa kweli itakuwa muamala wa 101 uliowasilishwa na akaunti hii)
- Data ya ingizo - Taarifa yoyote ya ziada inayohitajika na muamala

### Akaunti {#accounts}

Kuna data nyingi unazoweza kufikia kuhusu akaunti. Hii ndiyo sababu mara nyingi inapendekezwa kutumia akaunti nyingi ili mali na thamani yako isiweze kufuatiliwa kwa urahisi. Pia kuna baadhi ya suluhu zinazotengenezwa ili kufanya miamala na shughuli za akaunti kuwa za faragha zaidi. Lakini hii hapa ni data inayopatikana kwa akaunti:

**Akaunti za watumiaji**

- Anwani ya akaunti - Anwani ya umma unayoweza kutumia kutuma fedha
- Salio la ETH - Kiasi cha ETH kinachohusishwa na akaunti hiyo
- Jumla ya thamani ya ETH - Thamani ya ETH
- Tokeni - Tokeni zinazohusishwa na akaunti na thamani yake
- Historia ya miamala - Orodha ya miamala yote ambapo akaunti hii ilikuwa mtumaji au mpokeaji

**Mikataba mahiri**

Akaunti za mikataba mahiri zina data yote ambayo akaunti ya mtumiaji itakuwa nayo, lakini baadhi ya vichunguzi vya bloku hata vitaonyesha baadhi ya taarifa za msimbo pia. Mifano ni pamoja na:

- Muundaji wa mkataba - Anwani iliyosambaza mkataba kwenye Mtandao Mkuu
- Muamala wa uundaji - Muamala uliojumuisha usambazaji kwenye Mtandao Mkuu
- Msimbo wa chanzo - Msimbo wa Solidity au Vyper wa mkataba mahiri
- ABI ya mkataba - Kiolesura cha Nambari Mbili cha Programu cha mkataba—miito ambayo mkataba hufanya na data iliyopokelewa
- Msimbo wa uundaji wa mkataba - Msimbo wa baiti uliokusanywa wa mkataba mahiri—ulioundwa unapokusanya mkataba mahiri ulioandikwa kwa Solidity au Vyper, n.k.
- Matukio ya mkataba - Historia ya mbinu zilizoitwa katika mkataba mahiri—kimsingi ni njia ya kuona jinsi mkataba unavyotumika na mara ngapi

### Tokeni {#tokens}

Tokeni ni aina ya mkataba hivyo zitakuwa na data sawa na mkataba mahiri. Lakini kwa sababu zina thamani na zinaweza kuuzwa zina pointi za ziada za data:

- Aina - Iwe ni ERC-20, ERC-721 au kiwango kingine cha tokeni
- Bei - Ikiwa ni ERC-20 zitakuwa na thamani ya sasa ya soko
- Mtaji wa soko - Ikiwa ni ERC-20 zitakuwa na mtaji wa soko (hukokotolewa kwa bei\*jumla ya usambazaji)
- Jumla ya usambazaji - Idadi ya tokeni zinazozunguka
- Wamiliki - Idadi ya anwani zinazoshikilia tokeni
- Uhamisho - Idadi ya mara ambazo tokeni imehamishwa kati ya akaunti
- Historia ya miamala - Historia ya miamala yote inayojumuisha tokeni
- Anwani ya mkataba - Anwani ya tokeni iliyosambazwa kwenye Mtandao Mkuu
- Desimali - Tokeni za ERC-20 zinagawanyika na zina nafasi za desimali

### Mtandao {#network}

Baadhi ya data ya kitalu inahusika na afya ya Ethereum kwa ujumla zaidi.

- Jumla ya miamala - Idadi ya miamala tangu Ethereum iundwe
- Miamala kwa sekunde - Idadi ya miamala inayoweza kuchakatwa ndani ya sekunde moja
- Bei ya ETH - Thamani ya sasa ya 1 ETH
- Jumla ya usambazaji wa ETH - Idadi ya ETH zinazozunguka—kumbuka ETH mpya huundwa kwa uundaji wa kila kitalu kwa njia ya tuzo za bloku
- Mtaji wa soko - Ukokotoaji wa bei\*usambazaji

## Data ya tabaka la mwafaka {#consensus-layer-data}

### Kipindi {#epoch}

Kwa sababu za kiusalama, kamati za wathibitishaji zilizochaguliwa bila mpangilio huundwa mwishoni mwa kila kipindi (kila dakika 6.4). Data ya kipindi inajumuisha:

- Nambari ya kipindi
- Hali iliyokamilishwa - Ikiwa kipindi kimekamilishwa (Ndiyo/Hapana)
- Muda - Muda ambao kipindi kiliisha
- Uthibitisho - Idadi ya uthibitisho katika kipindi (kura kwa vitalu ndani ya sloti)
- Amana - Idadi ya amana za ETH zilizojumuishwa katika kipindi (wathibitishaji lazima waweke dhamana ya ETH ili kuwa wathibitishaji)
- Ufyekaji - Idadi ya adhabu zinazotolewa kwa wapendekezaji wa vitalu au wathibitishaji
- Ushiriki wa kupiga kura - Kiasi cha ETH iliyowekwa dhamana inayotumika kuthibitisha vitalu
- Wathibitishaji - Idadi ya wathibitishaji wanaofanya kazi kwa kipindi
- Wastani wa salio la Mthibitishaji - Wastani wa salio kwa wathibitishaji wanaofanya kazi
- Sloti - Idadi ya sloti zilizojumuishwa katika kipindi (sloti zinajumuisha kitalu kimoja halali)

### Sloti {#slot}

Sloti ni fursa za uundaji wa kitalu, data inayopatikana kwa kila sloti inajumuisha:

- Kipindi - Kipindi ambacho sloti ni halali
- Nambari ya sloti
- Hali - Hali ya sloti (Imependekezwa/Imekosa)
- Muda - Muhuri wa muda wa sloti
- Mpendekezaji - Mthibitishaji aliyependekeza kitalu kwa sloti
- Mzizi wa kitalu - Mzizi wa mti wa heshi wa BeaconBlock
- Mzizi wa mzazi - Heshi ya kitalu kilichotangulia
- Mzizi wa hali - Mzizi wa mti wa heshi wa BeaconState
- Sahihi
- Ufichuzi wa RANDAO
- Grafiti - Mpendekezaji wa bloku anaweza kujumuisha ujumbe wenye urefu wa baiti 32 kwenye pendekezo lake la kitalu
- Data ya Utekelezaji
  - Heshi ya kitalu
  - Hesabu ya amana
  - Mzizi wa amana
- Uthibitisho - Idadi ya uthibitisho kwa kitalu katika sloti hii
- Amana - Idadi ya amana wakati wa sloti hii
- Kutoka kwa hiari - Idadi ya wathibitishaji walioondoka wakati wa sloti
- Ufyekaji - Idadi ya adhabu zinazotolewa kwa wapendekezaji wa vitalu au wathibitishaji
- Kura - Wathibitishaji waliopiga kura kwa kitalu katika sloti hii

### Vitalu {#blocks-1}

Uthibitisho wa Dau (PoS) hugawanya muda katika sloti na vipindi. Hivyo inamaanisha data mpya!

- Mpendekezaji - Mthibitishaji aliyechaguliwa kwa algoriti kupendekeza kitalu kipya
- Kipindi - Kipindi ambacho kitalu kilipendekezwa
- Sloti - Sloti ambayo kitalu kilipendekezwa
- Uthibitisho - Idadi ya uthibitisho uliojumuishwa kwenye sloti—uthibitisho ni kama kura zinazoonyesha kitalu kiko tayari kwenda kwenye Mnyororo wa Beacon

### Wathibitishaji {#validators}

Wathibitishaji wana jukumu la kupendekeza vitalu na kuvithibitisha ndani ya sloti.

- Nambari ya mthibitishaji - Nambari ya kipekee inayowakilisha mthibitishaji
- Salio la sasa - Salio la mthibitishaji ikijumuisha tuzo
- Salio tendaji - Salio la mthibitishaji linalotumika kwa uwekaji dhamana
- Mapato - Tuzo au adhabu zilizopokelewa na mthibitishaji
- Hali - Ikiwa mthibitishaji yuko mtandaoni na anafanya kazi kwa sasa au la
- Ufanisi wa uthibitisho - Wastani wa muda unaochukua kwa uthibitisho wa mthibitishaji kujumuishwa kwenye mnyororo
- Kustahiki kwa uanzishaji - Tarehe (na kipindi) ambapo mthibitishaji alipatikana ili kuthibitisha
- Inafanya kazi tangu - Tarehe (na kipindi) ambapo mthibitishaji alianza kufanya kazi
- Vitalu vilivyopendekezwa - Kitalu ambacho mthibitishaji amependekeza
- Uthibitisho - Uthibitisho ambao mthibitishaji ametoa
- Amana - Anwani ya kutoka, heshi ya muamala, nambari ya kitalu, muhuri wa muda, kiasi na hali ya amana ya uwekaji dhamana iliyofanywa na mthibitishaji

### Uthibitisho {#attestations}

Uthibitisho ni kura za "ndiyo" za kujumuisha vitalu kwenye mnyororo. Data zao zinahusiana na rekodi ya uthibitisho na wathibitishaji waliothibitisha

- Sloti - Sloti ambayo uthibitisho ulifanyika
- Faharisi ya kamati - Faharisi ya kamati katika sloti iliyotolewa
- Biti za ujumuishaji - Inawakilisha uthibitisho uliokusanywa wa wathibitishaji wote wanaoshiriki katika uthibitisho
- Wathibitishaji - Wathibitishaji waliotoa uthibitisho
- Mzizi wa kitalu cha kinara - Huelekeza kwenye kitalu ambacho wathibitishaji wanathibitisha
- Chanzo - Huelekeza kwenye kipindi cha hivi punde kilichohalalishwa
- Lengo - Huelekeza kwenye mpaka wa kipindi cha hivi punde
- Sahihi

### Mtandao {#network-1}

Data ya kiwango cha juu ya tabaka la mwafaka inajumuisha yafuatayo:

- Kipindi cha sasa
- Sloti ya sasa
- Wathibitishaji wanaofanya kazi - Idadi ya wathibitishaji wanaofanya kazi
- Wathibitishaji wanaosubiri - Idadi ya wathibitishaji wanaosubiri kufanywa waweze kufanya kazi
- ETH iliyowekwa dhamana - Kiasi cha ETH iliyowekwa dhamana kwenye mtandao
- Wastani wa salio - Wastani wa salio la ETH la wathibitishaji

## Usomaji zaidi {#further-reading}

_Je, unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Miamala](/developers/docs/transactions/)
- [Akaunti](/developers/docs/accounts/)
- [Mitandao](/developers/docs/networks/)