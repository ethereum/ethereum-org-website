---
title: Maktaba za mikataba mahiri
description: Gundua maktaba za mikataba-erevu zinazoweza kutumika tena na vizuizi vya ujenzi ili kuharakisha miradi yako ya maendeleo ya Ethereum.
lang: sw
---

Huhitaji kuandika kila mkataba mahiri katika mradi wako kuanzia mwanzo. Kuna maktaba nyingi za mikataba mahiri za programu huria zinazopatikana ambazo hutoa vizuizi vya ujenzi vinavyoweza kutumika tena kwa mradi wako ambavyo vinaweza kukuepusha na kulazimika kuunda tena gurudumu.

## Mahitaji ya awali {#prerequisites}

Kabla ya kurukia maktaba mahiri za mikataba, ni wazo nzuri kuwa na ufahamu mzuri wa muundo wa mkataba mahiri. Nenda kwenye [muundo wa mkataba-erevu](/developers/docs/smart-contracts/anatomy/) ikiwa bado hujafanya hivyo.

## Kuna nini ndani ya maktaba {#whats-in-a-library}

Kwa kawaida unaweza kupata aina mbili za vizuizi vya ujenzi katika maktaba mahiri za mikataba: tabia zinazoweza kutumika tena unazoweza kuongeza kwenye kandarasi zako, na utekelezaji wa viwango mbalimbali.

### Mienendo {#behaviors}

Unapoandika mikataba-erevu, kuna uwezekano mkubwa utajikuta ukiandika mifumo inayofanana mara kwa mara, kama vile kugawa anwani ya _admin_ ili kutekeleza shughuli zilizolindwa katika mkataba, au kuongeza kitufe cha dharura cha _pause_ iwapo kutatokea suala lisilotarajiwa.

Maktaba za mikataba-erevu kwa kawaida hutoa utekelezaji unaoweza kutumika tena wa mienendo hii kama [maktaba](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) au kupitia [urithi](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) katika Solidity.

Kwa mfano, ifuatayo ni toleo lililorahisishwa la [mkataba wa `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) kutoka [maktaba ya Mikataba ya OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), ambayo huteua anwani kama mmiliki wa mkataba, na hutoa kirekebishaji cha kuzuia ufikiaji wa mbinu kwa mmiliki huyo pekee.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: anayepiga simu si mmiliki");
        _;
    }
}
```

Ili kutumia jengo kama hili katika mkataba wako, utahitaji kwanza kuagiza, na kisha kupanua kutoka humo katika mikataba yako mwenyewe. Hii itakuruhusu kutumia kirekebishaji kilichotolewa na mkataba msingi wa `Ownable` ili kulinda utendakazi wako mwenyewe.

```solidity
import ".../Ownable.sol"; // Njia ya kuelekea maktaba iliyoingizwa

contract MyContract is Ownable {
    // Utendakazi ufuatao unaweza kuitwa tu na mmiliki
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Mfano mwingine maarufu ni [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) au [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Hizi ni maktaba (kinyume na kandarasi za msingi) ambazo hutoa utendakazi wa hesabu na ukaguzi wa ziada, ambao haujatolewa na lugha. Ni utaratibu mzuri kutumia mojawapo ya maktaba hizi badala ya shughuli za hesabu asilia ili kulinda mkataba wako dhidi ya mafuriko, ambayo yanaweza kuwa na matokeo mabaya!

### Viwango {#standards}

Ili kuwezesha [utunzi na ushirikiano](/developers/docs/smart-contracts/composability/), jumuiya ya Ethereum imefafanua viwango kadhaa katika mfumo wa **ERCs**. Unaweza kusoma zaidi kuzihusu katika sehemu ya [viwango](/developers/docs/standards/).

Unapojumuisha ERC kama sehemu ya kandarasi zako, ni vyema utafute utekelezaji wa kawaida badala ya kujaribu kuzindua yako. Maktaba nyingi za mikataba mahiri hujumuisha utekelezaji wa ERC maarufu zaidi. Kwa mfano, [kiwango cha tokeni inayoweza kubadilishwa cha ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) kinachopatikana kila mahali kinaweza kupatikana katika [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) na [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Zaidi ya hayo, baadhi ya ERC pia hutoa utekelezaji wa kisheria kama sehemu ya ERC yenyewe.

Inafaa kutaja kwamba baadhi ya ERCs hazijitegemei, lakini ni nyongeza kwa ERC zingine. Kwa mfano, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) inaongeza kiendelezi kwa ERC20 ili kuboresha utumiaji wake.

## Jinsi ya kuongeza maktaba {#how-to}

Daima rejelea hati za maktaba unayojumuisha kwa maagizo maalum ya jinsi ya kuijumuisha kwenye mradi wako. Maktaba kadhaa za mikataba ya Solidity zimefungashwa kwa kutumia `npm`, kwa hivyo unaweza kuzisakinisha kwa `npm install`. Zana nyingi za [kukusanya](/developers/docs/smart-contracts/compiling/) mikataba zitaangalia ndani ya `node_modules` yako kwa maktaba za mikataba-erevu, kwa hivyo unaweza kufanya yafuatayo:

```solidity
// Hii itapakia maktaba ya @openzeppelin/contracts kutoka kwa node_modules zako
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bila kujali mbinu unayotumia, unapojumuisha maktaba, daima angalia toleo la [lugha](/developers/docs/smart-contracts/languages/). Kwa mfano, huwezi kutumia maktaba kwa Solidity 0.6 ikiwa unaandika mikataba yako katika Solidity 0.5.

## Wakati wa kutumia {#when-to-use}

Kutumia maktaba ya mkataba mahiri kwa mradi wako kuna manufaa kadhaa. Kwanza kabisa, inakuokoa wakati kwa kukupa vizuizi vya ujenzi ambavyo tayari kutumia unaweza kujumuisha kwenye mfumo wako, badala ya kulazimika kuziandika mwenyewe.

Usalama pia ni nyongeza kuu. Maktaba huria za mikataba mahiri pia mara nyingi huchunguzwa sana. Ikizingatiwa miradi mingi inaitegemea, kuna motisha kubwa kutoka kwa jamii ya kuiweka chini ya ukaguzi wa kila wakati. Ni kawaida zaidi kupata makosa katika nambari ya maombi kuliko katika maktaba za mkataba zinazoweza kutumika tena. Baadhi ya maktaba pia hupitia [ukaguzi wa nje](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) kwa ajili ya usalama wa ziada.

Hata hivyo, kutumia maktaba za mikataba mahiri kuna hatari ya kujumuisha msimbo usioufahamu katika mradi wako. Inajaribu kuagiza mkataba na kuujumuisha moja kwa moja kwenye mradi wako, lakini bila kuelewa vizuri mkataba huo hufanya nini, unaweza kuwa unaanzisha suala katika mfumo wako bila kukusudia kutokana na tabia isiyotarajiwa. Daima hakikisha umesoma hati za msimbo unaoingiza, na kisha uhakiki msimbo wenyewe kabla ya kuufanya kuwa sehemu ya mradi wako!

Mwisho, unapoamua kujumuisha maktaba, zingatia matumizi yake kwa jumla. Ile iliyopitishwa na wengi ina manufaa ya kuwa na jumuiya kubwa na macho zaidi kuiangalia kwa masuala. Usalama unapaswa kuwa lengo lako la msingi wakati wa kujenga na mikataba smart!

## Zana zinazohusiana {#related-tools}

**OpenZeppelin Contracts -** **_Maktaba maarufu zaidi kwa maendeleo salama ya mikataba-erevu._**

- [Nyaraka](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Jukwaa la Jumuiya](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Vizuizi salama, rahisi na vinavyoweza kunyumbulika vya mikataba-erevu._**

- [Nyaraka](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Mradi wa Solidity wenye mikataba, maktaba na mifano ya kukusaidia kujenga programu-tumizi zilizotawanywa zilizo na vipengele kamili kwa ajili ya ulimwengu halisi._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Hutoa zana zinazohitajika ili kujenga mikataba-erevu maalum kwa ufanisi_**

- [Nyaraka](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Mafunzo yanayohusiana {#related-tutorials}

- [Mazingatio ya usalama kwa wasanidi programu wa Ethereum](/developers/docs/smart-contracts/security/) _– Mafunzo kuhusu mazingatio ya usalama wakati wa kujenga mikataba-erevu, ikijumuisha matumizi ya maktaba._
- [Elewa mkataba-erevu wa tokeni ya ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Mafunzo kuhusu kiwango cha ERC20, yanayotolewa na maktaba nyingi._

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
