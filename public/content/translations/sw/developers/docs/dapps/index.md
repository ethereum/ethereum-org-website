---
title: Utangulizi wa kiufundi kwa dapps
description:
lang: sw
---

Programu iliyogatuliwa (dapp) ni programu iliyojengwa kwenye mtandao uliogatuliwa unaochanganya [mkataba mahiri](/developers/docs/smart-contracts/) na kiolesura cha mtumiaji cha mbele. Kwenye Ethereum, mikataba mahiri inapatikana na ina uwazi – kama APIs wazi – hivyo dapp yako inaweza hata kujumuisha mkataba mahiri ulioandikwa na mtu mwingine.

## Mahitaji ya awali {#prerequisites}

Kabla ya kujifunza kuhusu dapps, unapaswa kupitia [misingi ya blockchain](/developers/docs/intro-to-ethereum/) na kusoma kuhusu mtandao wa Ethereum na jinsi ulivyogatuliwa.

## Ufafanuzi wa dapp {#definition-of-a-dapp}

Dapp ina msimbo wa backend unaoendesha kwenye mtandao wa wenzao uliogatuliwa.
Tofautisha hii na programu ambapo msimbo wa backend unaendesha kwenye seva zilizogatuliwa.

Dapp inaweza kuwa na msimbo wa frontend na violesura vya mtumiaji vilivyoandikwa kwa lugha yoyote (kama programu) ili kufanya miito kwa backend yake. Zaidi ya hayo, frontend yake inaweza kupangishwa kwenye hifadhi iliyogatuliwa kama vile [IPFS](https://ipfs.io/).

- **Imegatuliwa** - dapps hufanya kazi kwenye Ethereum, jukwaa la wazi la umma lililogatuliwa ambapo hakuna mtu mmoja au kikundi kinachodhibiti
- **Inayodhamiria** - dapps hufanya kazi sawa bila kujali mazingira ambamo zinatekelezwa
- **Turing kamili** - dapps zinaweza kufanya kitendo chochote zikiwa na rasilimali zinazohitajika
- **Imetengwa** - dapps hutekelezwa katika mazingira pepe yanayojulikana kama Mashine Halisi ya Ethereum ili kwamba ikiwa mkataba mahiri una hitilafu, haitazuia utendaji wa kawaida wa mtandao wa blockchain

### Kuhusu mikataba mahiri {#on-smart-contracts}

Ili kuanzisha dapps, tunahitaji kuanzisha mikataba mahiri – backend ya dapp kwa kukosekana kwa neno bora. Kwa muhtasari wa kina, nenda kwenye sehemu yetu kuhusu [mikataba mahiri](/developers/docs/smart-contracts/).

Mkataba mahiri ni msimbo unaoishi kwenye blockchain ya Ethereum na unaendesha kama ulivyopangwa. Mara mikataba mahiri inapowekwa kwenye mtandao, huwezi kuibadilisha. Dapps zinaweza kuwa zilizogatuliwa kwa sababu zinadhibitiwa na mantiki iliyoandikwa kwenye mkataba, sio mtu binafsi au kampuni. Hii pia inamaanisha unahitaji kubuni mikataba yako kwa uangalifu na kuijaribu kwa kina.

## Faida za uundaji wa dapp {#benefits-of-dapp-development}

- **Upatikanaji wa kila wakati** – Mara tu mkataba mahiri unapowekwa kwenye blockchain, mtandao kwa ujumla utaweza kuwahudumia wateja wanaotaka kuingiliana na mkataba. Wahalifu, kwa hivyo, hawawezi kuzindua mashambulizi ya kukataa huduma yaliyolengwa kwa dapps binafsi.
- **Faragha** – Huhitaji kutoa utambulisho halisi ili kupeleka au kuingiliana na dapp.
- **Upinzani dhidi ya udhibiti** – Hakuna chombo kimoja kwenye mtandao kinachoweza kuzuia watumiaji kuwasilisha miamala, kupeleka dapps, au kusoma data kutoka kwenye blockchain.
- **Uadilifu kamili wa data** – Data iliyohifadhiwa kwenye blockchain haiwezi kubadilika na haiwezi kupingwa, shukrani kwa misingi ya kriptografia. Wahusika waovu hawawezi kughushi miamala au data nyingine ambayo tayari imewekwa hadharani.
- **Hesabu isiyoaminika/tabia inayoweza kuthibitishwa** – Mikataba mahiri inaweza kuchanganuliwa na imehakikishwa kutekelezwa kwa njia zinazotabirika, bila hitaji la kuamini mamlaka kuu. Hii si kweli katika mifano ya jadi; kwa mfano, tunapotumia mifumo ya benki mtandaoni, tunapaswa kuamini kwamba taasisi za kifedha hazitatumia vibaya data zetu za kifedha, kubadilisha rekodi, au kudukuliwa.

## Hasara za uundaji wa dapp {#drawbacks-of-dapp-development}

- **Matengenezo** – Dapps zinaweza kuwa ngumu zaidi kudumisha kwa sababu msimbo na data iliyochapishwa kwenye blockchain ni ngumu zaidi kurekebisha. Ni vigumu kwa watengenezaji kufanya masasisho kwenye dapps zao (au data ya msingi iliyohifadhiwa na dapp) mara tu zinapopelekwa, hata kama mende au hatari za usalama zinatambuliwa katika toleo la zamani.
- **Gharama ya ziada ya utendaji** – Kuna gharama kubwa ya ziada ya utendaji, na kuongeza kiwango ni ngumu sana. Ili kufikia kiwango cha usalama, uadilifu, uwazi, na uaminifu ambao Ethereum inakusudia, kila nodi inaendesha na kuhifadhi kila muamala. Juu ya hili, makubaliano ya uthibitisho wa hisa yanachukua muda pia.
- **Msongamano wa mtandao** – Wakati dapp moja inatumia rasilimali nyingi za kompyuta, mtandao mzima unajaa. Hivi sasa, mtandao unaweza kushughulikia takriban miamala 10-15 kwa sekunde; ikiwa miamala inatumwa kwa kasi zaidi ya hii, kundi la miamala isiyothibitishwa linaweza kuongezeka haraka.
- **Uzoefu wa mtumiaji** – Inaweza kuwa ngumu zaidi kubuni uzoefu unaomfaa mtumiaji kwa sababu mtumiaji wa kawaida anaweza kuona ni vigumu sana kusanidi mkusanyiko wa zana unaohitajika ili kuingiliana na blockchain kwa njia salama kabisa.
- **Uwekaji katikati** – Suluhisho zinazofaa watumiaji na wasanidi programu zilizojengwa juu ya safu ya msingi ya Ethereum zinaweza kuishia kuonekana kama huduma zilizowekwa katikati hata hivyo. Kwa mfano, huduma kama hizo zinaweza kuhifadhi funguo au taarifa nyingine nyeti upande wa seva, kutoa kiolesura cha mbele kwa kutumia seva iliyowekwa katikati, au kuendesha mantiki muhimu ya biashara kwenye seva iliyowekwa katikati kabla ya kuandika kwenye blockchain. Uwekaji katikati huondoa faida nyingi (ikiwa sio zote) za blockchain juu ya mfano wa jadi.

## Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Zana za kuunda dapps {#dapp-tools}

**Scaffold-ETH _- Fanya majaribio kwa haraka na Solidity ukitumia frontend inayojirekebisha kulingana na mkataba wako mahiri._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Mfano wa dapp](https://punkwallet.io/)

**Create Eth App _- Unda programu zinazotumia Ethereum kwa amri moja._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Zana ya FOSS ya kutengeneza frontend za dapp kutoka kwa [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Zana ya FOSS kwa wasanidi programu wa Ethereum ili kujaribu nodi zao, na kutunga na kurekebisha hitilafu za wito wa RPC kutoka kwenye kivinjari._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK katika kila lugha, mikataba mahiri, zana, na miundombinu ya uundaji wa web3._**

- [Ukurasa wa nyumbani](https://thirdweb.com/)
- [Nyaraka](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Jukwaa la uundaji wa web3 la kiwango cha biashara ili kupeleka mikataba mahiri, kuwezesha malipo ya kadi ya mkopo na malipo ya misururu tofauti, na kutumia APIs kuunda, kusambaza, kuuza, kuhifadhi, na kuhariri NFTs._**

- [crossmint.com](https://www.crossmint.com)
- [Nyaraka](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Masomo zaidi {#further-reading}

- [Gundua dapps](/apps)
- [Usanifu wa programu ya Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Mwongozo wa 2021 wa programu zilizogatuliwa](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Programu Zilizogatuliwa ni Nini?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps maarufu](https://www.alchemy.com/dapps) - _Alchemy_

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada Husika {#related-topics}

- [Utangulizi wa mfumo wa Ethereum](/developers/docs/ethereum-stack/)
- [Mifumo ya uundaji](/developers/docs/frameworks/)
