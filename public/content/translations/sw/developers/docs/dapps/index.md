---
title: Utangulizi wa kiufundi wa dapps
description: 
lang: sw
---

Programu tumizi iliyogatuliwa (dapp) ni programu iliyojengwa kwenye mtandao uliogatuliwa ambayo inachanganya [mkataba mahiri](/developers/docs/smart-contracts/) na kiolesura cha mtumiaji cha mbele. Kwenye [Ethereum](/), mikataba mahiri inafikika na ni wazi – kama API zilizo wazi – kwa hivyo dapp yako inaweza hata kujumuisha mkataba mahiri ambao mtu mwingine ameandika.

## Mahitaji ya awali {#prerequisites}

Kabla ya kujifunza kuhusu dapps, unapaswa kupitia [misingi ya mnyororo wa vitalu](/developers/docs/intro-to-ethereum/) na kusoma kuhusu mtandao wa Ethereum na jinsi ulivyogatuliwa.

## Ufafanuzi wa dapp {#definition-of-a-dapp}

Dapp ina msimbo wake wa nyuma unaoendeshwa kwenye mtandao uliogatuliwa wa rika-kwa-rika. Linganisha hili na programu ambapo msimbo wa nyuma unaendeshwa kwenye seva zilizowekwa kati.

Dapp inaweza kuwa na msimbo wa mbele na violesura vya mtumiaji vilivyoandikwa kwa lugha yoyote (kama tu programu) ili kupiga simu kwenye msimbo wake wa nyuma. Zaidi ya hayo, msimbo wake wa mbele unaweza kupangishwa kwenye hifadhi iliyogatuliwa kama vile [IPFS](https://ipfs.io/).

- **Iliyogatuliwa** - dapps hufanya kazi kwenye Ethereum, jukwaa wazi la umma lililogatuliwa ambapo hakuna mtu mmoja au kikundi kilicho na udhibiti
- **Inayotabirika (Deterministic)** - dapps hufanya kazi sawa bila kujali mazingira ambayo zinatekelezwa
- **Kamilifu ki-Turing** - dapps zinaweza kufanya kitendo chochote zikipewa rasilimali zinazohitajika
- **Iliyotengwa** - dapps zinatekelezwa katika mazingira pepe yanayojulikana kama Ethereum Virtual Machine ili ikiwa mkataba mahiri una hitilafu, hautazuia utendakazi wa kawaida wa mtandao wa mnyororo wa vitalu

### Kuhusu mikataba mahiri {#on-smart-contracts}

Ili kutambulisha dapps, tunahitaji kutambulisha mikataba mahiri – msimbo wa nyuma wa dapp kwa kukosa neno bora. Kwa muhtasari wa kina, nenda kwenye sehemu yetu ya [mikataba mahiri](/developers/docs/smart-contracts/).

Mkataba mahiri ni msimbo unaoishi kwenye mnyororo wa vitalu wa Ethereum na unaendeshwa sawasawa na ulivyopangwa. Pindi mikataba mahiri inaposambazwa kwenye mtandao huwezi kuibadilisha. Dapps zinaweza kugatuliwa kwa sababu zinadhibitiwa na mantiki iliyoandikwa kwenye mkataba, sio mtu binafsi au kampuni. Hii pia inamaanisha unahitaji kubuni mikataba yako kwa uangalifu sana na kuijaribu kikamilifu.

## Faida za uundaji wa dapp {#benefits-of-dapp-development}

- **Hakuna wakati wa kutofanya kazi (Zero downtime)** – Pindi mkataba mahiri unaposambazwa kwenye mnyororo wa vitalu, mtandao kwa ujumla utaweza kuhudumia wateja wanaotaka kuingiliana na mkataba huo kila wakati. Kwa hivyo, wahusika wenye nia mbaya hawawezi kuanzisha mashambulizi ya kunyima huduma yanayolenga dapps binafsi.
- **Faragha** – Huhitaji kutoa utambulisho wa ulimwengu halisi ili kusambaza au kuingiliana na dapp.
- **Upinzani dhidi ya udhibiti** – Hakuna chombo kimoja kwenye mtandao kinachoweza kuzuia watumiaji kuwasilisha miamala, kusambaza dapps, au kusoma data kutoka kwenye mnyororo wa vitalu.
- **Uadilifu kamili wa data** – Data iliyohifadhiwa kwenye mnyororo wa vitalu ni isiyobadilika na isiyopingika, kutokana na misingi ya kificho. Wahusika wenye nia mbaya hawawezi kughushi miamala au data nyingine ambayo tayari imewekwa wazi.
- **Ukokotoaji bila hitaji la uaminifu/tabia inayoweza kuthibitishwa** – Mikataba mahiri inaweza kuchanganuliwa na inahakikishwa kutekelezwa kwa njia zinazotabirika, bila hitaji la kuamini mamlaka kuu. Hili si kweli katika miundo ya kitamaduni; kwa mfano, tunapotumia mifumo ya benki mtandaoni, lazima tuamini kwamba taasisi za kifedha hazitatumia vibaya data yetu ya kifedha, kuchezea rekodi, au kudukuliwa.

## Hasara za uundaji wa dapp {#drawbacks-of-dapp-development}

- **Matengenezo** – Dapps zinaweza kuwa ngumu zaidi kudumisha kwa sababu msimbo na data iliyochapishwa kwenye mnyororo wa vitalu ni ngumu zaidi kurekebisha. Ni vigumu kwa wasanidi programu kufanya masasisho kwenye dapps zao (au data ya msingi iliyohifadhiwa na dapp) pindi zinaposambazwa, hata kama hitilafu au hatari za kiusalama zitatambuliwa katika toleo la zamani.
- **Gharama ya utendaji** – Kuna gharama kubwa ya utendaji, na kuongeza ukubwa ni ngumu sana. Ili kufikia kiwango cha usalama, uadilifu, uwazi, na kutegemewa ambacho Ethereum inakusudia, kila nodi huendesha na kuhifadhi kila muamala. Zaidi ya hayo, mwafaka wa Uthibitisho wa Dau (PoS) huchukua muda pia.
- **Msongamano wa mtandao** – Wakati dapp moja inatumia rasilimali nyingi za ukokotoaji, mtandao mzima unachelewa. Kwa sasa, mtandao unaweza tu kuchakata takriban miamala 10-15 kwa sekunde; ikiwa miamala inatumwa kwa kasi zaidi ya hii, kundi la miamala ambayo haijathibitishwa linaweza kuongezeka haraka.
- **Uzoefu wa mtumiaji** – Inaweza kuwa ngumu zaidi kuunda uzoefu unaofaa kwa mtumiaji kwa sababu mtumiaji wa mwisho wa kawaida anaweza kuona ni vigumu sana kusanidi mrundikano wa zana muhimu ili kuingiliana na mnyororo wa vitalu kwa njia salama kweli.
- **Uwekaji kati** – Suluhu zinazofaa kwa mtumiaji na zinazofaa kwa msanidi programu zilizojengwa juu ya safu ya msingi ya Ethereum zinaweza kuishia kuonekana kama huduma zilizowekwa kati hata hivyo. Kwa mfano, huduma kama hizo zinaweza kuhifadhi funguo au taarifa nyingine nyeti upande wa seva, kuhudumia msimbo wa mbele kwa kutumia seva iliyowekwa kati, au kuendesha mantiki muhimu ya biashara kwenye seva iliyowekwa kati kabla ya kuandika kwenye mnyororo wa vitalu. Uwekaji kati huondoa faida nyingi (kama sio zote) za mnyororo wa vitalu ikilinganishwa na muundo wa kitamaduni.

## Je, unapendelea kujifunza kwa kuona? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Zana za kuunda dapps {#dapp-tools}

**Scaffold-ETH _- Fanya majaribio haraka na Solidity ukitumia msimbo wa mbele unaoendana na mkataba mahiri wako._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Mfano wa dapp](https://punkwallet.io/)

**Create Eth App _- Unda programu zinazoendeshwa na Ethereum kwa amri moja._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Zana ya FOSS ya kuzalisha misimbo ya mbele ya dapp kutoka kwenye [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Zana ya FOSS kwa wasanidi programu wa Ethereum kujaribu nodi yao, na kutunga & kutatua simu za RPC kutoka kwenye kivinjari._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK katika kila lugha, mikataba mahiri, zana, na miundombinu kwa ajili ya uundaji wa Web3._**

- [Ukurasa wa nyumbani](https://thirdweb.com/)
- [Nyaraka](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Jukwaa la uundaji wa Web3 la kiwango cha biashara ili kusambaza mikataba mahiri, kuwezesha malipo ya kadi ya mkopo na mnyororo mtambuka, na kutumia API kuunda, kusambaza, kuuza, kuhifadhi, na kuhariri NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Nyaraka](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Usomaji zaidi {#further-reading}

- [Gundua dapps](/apps)
- [Usanifu wa programu ya Wavuti 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Mwongozo wa 2021 wa programu tumizi zilizogatuliwa](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Programu Zilizogatuliwa Ni Nini?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps maarufu](https://www.alchemy.com/dapps) - _Alchemy_

_Je, unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada Zinazohusiana {#related-topics}

- [Utangulizi wa mrundikano wa Ethereum](/developers/docs/ethereum-stack/)
- [Mifumo ya uundaji](/developers/docs/frameworks/)

## Mafunzo: Unda programu na misimbo ya mbele kwenye Ethereum {#tutorials}

- [Mapitio ya Mkataba wa Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Mapitio yaliyofafanuliwa ya mikataba ya msingi ya Uniswap v2 yanayoelezea jinsi kitengeneza soko cha kiotomatiki (amm) kinavyofanya kazi._
- [Kujenga kiolesura cha mtumiaji kwa ajili ya mkataba wako](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Jinsi ya kujenga msimbo wa mbele wa kisasa wa React + Wagmi unaounganishwa na mkataba mahiri wako._
- [Mkataba Mahiri wa Hello World kwa Wanaoanza – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Mafunzo ya mwanzo hadi mwisho: andika, sambaza, na ujenge msimbo wa mbele kwa ajili ya mkataba mahiri rahisi._
- [Vipengele vya seva na mawakala kwa ajili ya programu za Web3](/developers/tutorials/server-components/) _– Jinsi ya kuandika vipengele vya seva vya TypeScript vinavyosikiliza matukio ya mnyororo wa vitalu na kujibu kwa miamala._
- [IPFS kwa ajili ya violesura vya mtumiaji vilivyogatuliwa](/developers/tutorials/ipfs-decentralized-ui/) _– Jinsi ya kupangisha msimbo wa mbele wa dapp yako kwenye IPFS kwa ajili ya upinzani dhidi ya udhibiti._