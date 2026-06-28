---
title: Maktaba za mkataba mahiri
description: Gundua maktaba za mkataba mahiri zinazoweza kutumika tena na vijenzi ili kuharakisha miradi yako ya uundaji wa Ethereum.
lang: sw
---

Huhitaji kuandika kila mkataba mahiri katika mradi wako kuanzia mwanzo. Kuna maktaba nyingi za mkataba mahiri za programu huria zinazopatikana ambazo hutoa vijenzi vinavyoweza kutumika tena kwa mradi wako ambavyo vinaweza kukuokoa na usumbufu wa kurudia kazi iliyokwisha fanywa.

## Masharti {#prerequisites}

Kabla ya kuingia kwenye maktaba za mkataba mahiri, ni wazo zuri kuwa na uelewa mzuri wa muundo wa mkataba mahiri. Nenda kwenye [anatomi ya mkataba mahiri](/developers/docs/smart-contracts/anatomy/) ikiwa bado hujafanya hivyo.

## Nini kimo ndani ya maktaba {#whats-in-a-library}

Kwa kawaida unaweza kupata aina mbili za vijenzi katika maktaba za mkataba mahiri: tabia zinazoweza kutumika tena unazoweza kuongeza kwenye mikataba yako, na utekelezaji wa viwango mbalimbali.

### Tabia {#behaviors}

Unapoandika mikataba mahiri, kuna uwezekano mkubwa utajikuta ukiandika ruwaza zinazofanana mara kwa mara, kama vile kukabidhi anwani ya _msimamizi_ ili kutekeleza shughuli zilizolindwa katika mkataba, au kuongeza kitufe cha _kusitisha_ cha dharura endapo kutatokea suala lisilotarajiwa.

Maktaba za mkataba mahiri kwa kawaida hutoa utekelezaji unaoweza kutumika tena wa tabia hizi kama [maktaba](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) au kupitia [urithi](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) katika Solidity.

Kama mfano, ifuatayo ni toleo lililorahisishwa la [mkataba wa `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) kutoka kwenye [maktaba ya Mikataba ya OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), ambayo huteua anwani kama mmiliki wa mkataba, na kutoa kirekebishaji cha kuzuia ufikiaji wa mbinu kwa mmiliki huyo pekee.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Ili kutumia kijenzi kama hiki katika mkataba wako, utahitaji kwanza kukiingiza, na kisha kukipanua katika mikataba yako mwenyewe. Hii itakuruhusu kutumia kirekebishaji kilichotolewa na mkataba wa msingi wa `Ownable` ili kulinda vipengele vyako mwenyewe.

```solidity
import ".../Ownable.sol"; // Njia ya maktaba iliyoingizwa

contract MyContract is Ownable {
    // Kazi ifuatayo inaweza kuitwa tu na mmiliki
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Mfano mwingine maarufu ni [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) au [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Hizi ni maktaba (tofauti na mikataba ya msingi) ambazo hutoa vipengele vya hesabu na ukaguzi wa mzidio, ambazo hazitolewi na lugha. Ni utendaji mzuri kutumia mojawapo ya maktaba hizi badala ya shughuli za asili za hesabu ili kulinda mkataba wako dhidi ya mizidio, ambayo inaweza kuwa na matokeo mabaya sana!

### Viwango {#standards}

Ili kuwezesha [utangamano na mwingiliano](/developers/docs/smart-contracts/composability/), jumuiya ya Ethereum imefafanua viwango kadhaa katika mfumo wa **ERCs**. Unaweza kusoma zaidi kuzihusu katika sehemu ya [viwango](/developers/docs/standards/).

Unapojumuisha ERC kama sehemu ya mikataba yako, ni wazo zuri kutafuta utekelezaji wa kiwango badala ya kujaribu kuunda chako mwenyewe. Maktaba nyingi za mkataba mahiri zinajumuisha utekelezaji wa ERCs maarufu zaidi. Kwa mfano, [kiwango cha tokheni mbadala cha ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) kilichoenea kila mahali kinaweza kupatikana katika [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) na [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Zaidi ya hayo, baadhi ya ERCs pia hutoa utekelezaji wa kikanoniki kama sehemu ya ERC yenyewe.

Inafaa kutaja kwamba baadhi ya ERCs hazijitegemei, bali ni nyongeza kwa ERCs nyingine. Kwa mfano, [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) inaongeza kiendelezi kwenye ERC-20 kwa ajili ya kuboresha utumizi wake.

## Jinsi ya kuongeza maktaba {#how-to}

Daima rejelea nyaraka za maktaba unayojumuisha kwa maagizo maalum ya jinsi ya kuijumuisha katika mradi wako. Maktaba kadhaa za mkataba wa Solidity zimefungashwa kwa kutumia `npm`, kwa hivyo unaweza tu kuzi-`npm install`. Zana nyingi za [ukusanyaji](/developers/docs/smart-contracts/compiling/) wa mikataba zitaangalia kwenye `node_modules` yako kwa ajili ya maktaba za mkataba mahiri, kwa hivyo unaweza kufanya yafuatayo:

```solidity
// Hii itapakia maktaba ya @openzeppelin/contracts kutoka kwenye node_modules yako
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bila kujali mbinu unayotumia, unapojumuisha maktaba, daima zingatia toleo la [lugha](/developers/docs/smart-contracts/languages/). Kwa mfano, huwezi kutumia maktaba ya Solidity 0.6 ikiwa unaandika mikataba yako katika Solidity 0.5.

## Wakati wa kutumia {#when-to-use}

Kutumia maktaba ya mkataba mahiri kwa mradi wako kuna faida kadhaa. Kwanza kabisa, inakuokoa muda kwa kukupa vijenzi vilivyo tayari kutumika unavyoweza kujumuisha katika mfumo wako, badala ya kulazimika kuziandika mwenyewe.

Usalama pia ni faida kubwa. Maktaba za mkataba mahiri za programu huria pia mara nyingi huchunguzwa kwa kina. Kwa kuwa miradi mingi inazitegemea, kuna motisha kubwa kwa jumuiya kuziweka chini ya ukaguzi wa mara kwa mara. Ni kawaida zaidi kupata makosa katika msimbo wa programu kuliko katika maktaba za mkataba zinazoweza kutumika tena. Baadhi ya maktaba pia hupitia [ukaguzi wa nje](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) kwa usalama wa ziada.

Hata hivyo, kutumia maktaba za mkataba mahiri hubeba hatari ya kujumuisha msimbo usioufahamu kwenye mradi wako. Inashawishi kuingiza mkataba na kuujumuisha moja kwa moja kwenye mradi wako, lakini bila uelewa mzuri wa kile mkataba huo unafanya, unaweza kuwa unaingiza suala kwenye mfumo wako bila kukusudia kutokana na tabia isiyotarajiwa. Daima hakikisha unasoma nyaraka za msimbo unaoingiza, na kisha ukague msimbo wenyewe kabla ya kuufanya kuwa sehemu ya mradi wako!

Mwisho, unapoamua kama utajumuisha maktaba, zingatia matumizi yake kwa ujumla. Ile iliyopitishwa na wengi ina faida za kuwa na jumuiya kubwa na macho mengi yanayoiangalia kwa ajili ya masuala. Usalama unapaswa kuwa lengo lako kuu unapounda kwa mikataba mahiri!

## Zana zinazohusiana {#related-tools}

**Mikataba ya OpenZeppelin -** **_Maktaba maarufu zaidi kwa uundaji salama wa mkataba mahiri._**

- [Nyaraka](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Jukwaa la Jumuiya](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Vijenzi salama, rahisi, na vinavyobadilika kwa mikataba mahiri._**

- [Nyaraka](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Mradi wa Solidity wenye mikataba, maktaba na mifano ya kukusaidia kuunda programu zilizosambazwa zenye vipengele kamili kwa ulimwengu wa kweli._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Hutoa zana zinazohitajika ili kuunda mikataba mahiri maalum kwa ufanisi_**

- [Nyaraka](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Mafunzo yanayohusiana {#related-tutorials}

- [Mazingatio ya usalama kwa waundaji wa Ethereum](/developers/docs/smart-contracts/security/) _– Mafunzo kuhusu mazingatio ya usalama wakati wa kuunda mikataba mahiri, ikijumuisha matumizi ya maktaba._
- [Elewa mkataba mahiri wa tokeni ya ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Mafunzo kuhusu kiwango cha ERC-20, kinachotolewa na maktaba nyingi._

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jumuiya iliyokusaidia? Hariri ukurasa huu na uiongeze!_