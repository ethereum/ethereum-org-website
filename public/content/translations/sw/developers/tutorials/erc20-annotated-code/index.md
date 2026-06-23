---
title: "Mwongozo wa Mkataba wa ERC-20"
description: Kuna nini katika mkataba wa ERC-20 wa OpenZeppelin na kwa nini kipo hapo?
author: Ori Pomerantz
lang: sw
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: Mwongozo wa ERC-20
published: 2021-03-09
---

## Utangulizi {#introduction}

Moja ya matumizi ya kawaida ya Ethereum ni kwa kikundi kuunda tokeni inayoweza kuuzwa, kwa maana fulani sarafu yao wenyewe. Tokeni hizi kwa kawaida hufuata kiwango,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Kiwango hiki hufanya iwezekane kuandika zana, kama vile mabwawa ya ukwasi na mikoba, zinazofanya kazi na tokeni zote za ERC-20. Katika makala haya tutachambua
[utekelezaji wa ERC20 wa Solidity wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), pamoja na
[ufafanuzi wa kiolesura](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Huu ni msimbo wa chanzo uliofafanuliwa. Ikiwa unataka kutekeleza ERC-20,
[soma mafunzo haya](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Kiolesura {#the-interface}

Kusudi la kiwango kama ERC-20 ni kuruhusu utekelezaji wa tokeni nyingi zinazoingiliana katika programu, kama vile mikoba na mabadilishano yaliyogatuliwa. Ili kufanikisha hilo, tunaunda
[kiolesura](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Msimbo wowote unaohitaji kutumia mkataba wa tokeni
unaweza kutumia ufafanuzi sawa katika kiolesura na kuendana na mikataba yote ya tokeni inayoitumia, iwe ni mkoba kama vile
MetaMask, programu tumizi iliyogatuliwa (dapp) kama vile etherscan.io, au mkataba tofauti kama vile bwawa la ukwasi.

![Illustration of the ERC-20 interface](erc20_interface.png)

Ikiwa wewe ni mtayarishaji programu mzoefu, labda unakumbuka kuona miundo sawa katika [Java](https://www.w3schools.com/java/java_interface.asp)
au hata katika [faili za kichwa za C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Huu ni ufafanuzi wa [Kiolesura cha ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
kutoka OpenZeppelin. Ni tafsiri ya [kiwango kinachosomeka na binadamu](https://eips.ethereum.org/EIPS/eip-20) kuwa msimbo wa Solidity. Bila shaka,
kiolesura chenyewe hakifafanui _jinsi_ ya kufanya chochote. Hilo linaelezwa katika msimbo wa chanzo wa mkataba hapa chini.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Faili za Solidity zinapaswa kujumuisha kitambulisho cha leseni. [Unaweza kuona orodha ya leseni hapa](https://spdx.org/licenses/). Ikiwa unahitaji leseni tofauti,
ieleze tu kwenye maoni.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Lugha ya Solidity bado inabadilika haraka, na matoleo mapya yanaweza yasiendane na msimbo wa zamani
([tazama hapa](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Kwa hivyo, ni wazo zuri kubainisha sio tu toleo la chini la lugha, bali pia toleo la juu zaidi, la hivi punde ambalo ulijaribu msimbo nalo.

&nbsp;

```solidity
/**
 * @dev Kiolesura cha kiwango cha ERC-20 kama kilivyofafanuliwa katika EIP.
 */
```

`@dev` katika maoni ni sehemu ya [umbizo la NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), linalotumika kutoa
nyaraka kutoka kwa msimbo wa chanzo.

&nbsp;

```solidity
interface IERC20 {
```

Kwa kawaida, majina ya kiolesura huanza na `I`.

&nbsp;

```solidity
    /**
     * @dev Inarejesha kiasi cha tokeni zilizopo.
     */
    function totalSupply() external view returns (uint256);
```

Kazi hii ni `external`, ikimaanisha [inaweza tu kuitwa kutoka nje ya mkataba](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Inarudisha jumla ya usambazaji wa tokeni katika mkataba. Thamani hii inarudishwa kwa kutumia aina ya kawaida zaidi katika Ethereum, biti 256 zisizo na saini (biti 256 ni
saizi ya neno asili ya EVM). Kazi hii pia ni `view`, ambayo inamaanisha kuwa haibadilishi hali, kwa hivyo inaweza kutekelezwa kwenye nodi moja badala ya kuwa na
kila nodi katika mnyororo wa vitalu kuiendesha. Aina hii ya kazi haizalishi muamala na haigharimu [gesi](/developers/docs/gas/).

**Kumbuka:** Kinadharia inaweza kuonekana kuwa muundaji wa mkataba anaweza kudanganya kwa kurudisha jumla ya usambazaji mdogo kuliko thamani halisi, na kufanya kila tokeni ionekane
ya thamani zaidi kuliko ilivyo kweli. Hata hivyo, hofu hiyo inapuuza asili ya kweli ya mnyororo wa vitalu. Kila kitu kinachotokea kwenye mnyororo wa vitalu kinaweza kuthibitishwa na
kila nodi. Ili kufanikisha hili, msimbo wa lugha ya mashine ya kila mkataba na hifadhi inapatikana kwenye kila nodi. Ingawa hauhitajiki kuchapisha msimbo wa Solidity
kwa mkataba wako, hakuna mtu atakayekuchukulia kwa uzito isipokuwa uchapishe msimbo wa chanzo na toleo la Solidity ambalo lilikusanywa nalo, ili iweze
kuthibitishwa dhidi ya msimbo wa lugha ya mashine uliotoa.
Kwa mfano, tazama [mkataba huu](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Inarejesha kiasi cha tokeni zinazomilikiwa na `akaunti`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Kama jina linavyosema, `balanceOf` inarudisha salio la akaunti. Akaunti za Ethereum zinatambuliwa katika Solidity kwa kutumia aina ya `address`, ambayo inashikilia biti 160.
Pia ni `external` na `view`.

&nbsp;

```solidity
    /**
     * @dev Inahamisha tokeni `amount` kutoka kwenye akaunti ya mpigaji kwenda kwa `recipient`.
     *
     * Inarejesha thamani ya boolean inayoonyesha ikiwa operesheni imefaulu.
     *
     * Inatoa tukio la {hamisho}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Kazi ya `transfer` inahamisha tokeni kutoka kwa mpigaji kwenda kwa anwani tofauti. Hii inahusisha mabadiliko ya hali, kwa hivyo sio `view`.
Mtumiaji anapoita kazi hii inaunda muamala na kugharimu gesi. Pia inatoa tukio, `Transfer`, ili kuarifu kila mtu kwenye
mnyororo wa vitalu kuhusu tukio hilo.

Kazi ina aina mbili za matokeo kwa aina mbili tofauti za wapigaji:

- Watumiaji wanaopiga kazi moja kwa moja kutoka kwa kiolesura cha mtumiaji. Kwa kawaida mtumiaji huwasilisha muamala
  na hasubiri jibu, ambalo linaweza kuchukua muda usiojulikana. Mtumiaji anaweza kuona kilichotokea
  kwa kutafuta stakabadhi ya muamala (ambayo inatambuliwa na heshi ya muamala) au kwa kutafuta
  tukio la `Transfer`.
- Mikataba mingine, ambayo huita kazi kama sehemu ya muamala wa jumla. Mikataba hiyo hupata matokeo mara moja,
  kwa sababu inaendeshwa katika muamala huo huo, kwa hivyo inaweza kutumia thamani ya kurudi ya kazi.

Aina sawa ya matokeo inaundwa na kazi zingine zinazobadilisha hali ya mkataba.

&nbsp;

Vibali huruhusu akaunti kutumia baadhi ya tokeni ambazo ni za mmiliki tofauti.
Hii ni muhimu, kwa mfano, kwa mikataba inayofanya kazi kama wauzaji. Mikataba haiwezi
kufuatilia matukio, kwa hivyo ikiwa mnunuzi angehamisha tokeni kwa mkataba wa muuzaji
moja kwa moja mkataba huo usingejua umelipwa. Badala yake, mnunuzi anaruhusu
mkataba wa muuzaji kutumia kiasi fulani, na muuzaji anahamisha kiasi hicho.
Hii inafanywa kupitia kazi ambayo mkataba wa muuzaji unaita, ili mkataba wa muuzaji
uweze kujua ikiwa ulifanikiwa.

```solidity
    /**
     * @dev Inarejesha idadi iliyobaki ya tokeni ambazo `spender` ataruhusiwa
     * kutumia kwa niaba ya `owner` kupitia {transferFrom}. Hii ni
     * sifuri kwa chaguo-msingi.
     *
     * Thamani hii inabadilika wakati {idhinisha} au {transferFrom} inapoitwa.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Kazi ya `allowance` inaruhusu mtu yeyote kuuliza ili kuona ni kibali gani ambacho
anwani moja (`owner`) inaruhusu anwani nyingine (`spender`) kutumia.

&nbsp;

```solidity
    /**
     * @dev Inaweka `amount` kama kibali cha `spender` juu ya tokeni za mpigaji.
     *
     * Inarejesha thamani ya boolean inayoonyesha ikiwa operesheni imefaulu.
     *
     * MUHIMU: Jihadharini kwamba kubadilisha kibali kwa njia hii kunaleta hatari
     * kwamba mtu anaweza kutumia kibali cha zamani na kipya kwa mpangilio mbaya
     * wa muamala. Suluhisho moja linalowezekana la kupunguza hali hii ya
     * ushindani ni kwanza kupunguza kibali cha mtumiaji hadi 0 na kuweka
     * thamani inayotakikana baadaye:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Inatoa tukio la {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Kazi ya `approve` inaunda kibali. Hakikisha unasoma ujumbe kuhusu
jinsi inavyoweza kutumiwa vibaya. Katika Ethereum unadhibiti mpangilio wa miamala yako mwenyewe,
lakini huwezi kudhibiti mpangilio ambao miamala ya watu wengine
itatekelezwa, isipokuwa usipowasilisha muamala wako mwenyewe hadi uone
muamala wa upande mwingine umetokea.

&nbsp;

```solidity
    /**
     * @dev Inahamisha tokeni `amount` kutoka kwa `sender` kwenda kwa `recipient` kwa kutumia
     * utaratibu wa kibali. `amount` kisha inakatwa kutoka kwenye kibali
     * cha mpigaji.
     *
     * Inarejesha thamani ya boolean inayoonyesha ikiwa operesheni imefaulu.
     *
     * Inatoa tukio la {hamisho}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Hatimaye, `transferFrom` inatumiwa na mtumiaji kutumia kibali hicho.

&nbsp;

```solidity

    /**
     * @dev Inatolewa wakati tokeni `value` zinahamishwa kutoka akaunti moja (`from`) kwenda
     * nyingine (`to`).
     *
     * Kumbuka kwamba `value` inaweza kuwa sifuri.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Inatolewa wakati kibali cha `spender` kwa `owner` kinawekwa na
     * wito kwa {idhinisha}. `value` ni kibali kipya.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Matukio haya hutolewa wakati hali ya mkataba wa ERC-20 inabadilika.

## Mkataba Halisi {#the-actual-contract}

Huu ndio mkataba halisi unaotekeleza kiwango cha ERC-20,
[uliochukuliwa kutoka hapa](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Haukusudiwi kutumiwa kama ulivyo, lakini unaweza
[kurithi](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) kutoka kwake ili kuupanua kuwa kitu kinachoweza kutumika.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Taarifa za Uingizaji {#import-statements}

Mbali na ufafanuzi wa kiolesura hapo juu, ufafanuzi wa mkataba unaingiza faili zingine mbili:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` ni ufafanuzi unaohitajika kutumia [OpenGSN](https://www.opengsn.org/), mfumo unaoruhusu watumiaji wasio na Etha
  kutumia mnyororo wa vitalu. Kumbuka kuwa hili ni toleo la zamani, ikiwa unataka kuunganisha na OpenGSN
  [tumia mafunzo haya](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Maktaba ya SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), ambayo inazuia
  mizidio/upungufu wa hesabu kwa matoleo ya Solidity **&lt;0.8.0**. Katika Solidity ≥0.8.0, shughuli za hesabu hutengua kiotomatiki
  kwenye mzidio/upungufu, na kufanya SafeMath isiwe ya lazima. Mkataba huu unatumia SafeMath kwa utangamano wa nyuma na
  matoleo ya zamani ya kikusanyaji.

&nbsp;

Maoni haya yanaelezea madhumuni ya mkataba.

```solidity
/**
 * @dev Utekelezaji wa kiolesura cha {IERC20}.
 *
 * Utekelezaji huu haujali jinsi tokeni zinavyoundwa. Hii inamaanisha
 * kwamba utaratibu wa usambazaji unapaswa kuongezwa katika mkataba unaotokana kwa kutumia {_mint}.
 * Kwa utaratibu wa jumla tazama {ERC20PresetMinterPauser}.
 *
 * DOKEZO: Kwa maelezo ya kina tazama mwongozo wetu
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Tumefuata miongozo ya jumla ya OpenZeppelin: vitendaji hubatilisha badala
 * ya kurejesha `false` vinaposhindwa. Tabia hii hata hivyo ni ya kawaida
 * na haipingani na matarajio ya programu za ERC-20.
 *
 * Zaidi ya hayo, tukio la {Approval} linatolewa kwenye wito wa {transferFrom}.
 * Hii inaruhusu programu kuunda upya kibali kwa akaunti zote tu
 * kwa kusikiliza matukio hayo. Utekelezaji mwingine wa EIP huenda usitoe
 * matukio haya, kwani haihitajiki na vipimo.
 *
 * Hatimaye, vitendaji visivyo vya kiwango vya {decreaseAllowance} na {increaseAllowance}
 * vimeongezwa ili kupunguza matatizo yanayojulikana sana kuhusu kuweka
 * vibali. Tazama {IERC20-approve}.
 */

```

### Ufafanuzi wa Mkataba {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Mstari huu unabainisha urithi, katika kesi hii kutoka kwa `IERC20` kutoka hapo juu na `Context`, kwa OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Mstari huu unaambatanisha maktaba ya `SafeMath` kwenye aina ya `uint256`. Unaweza kupata maktaba hii
[hapa](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Ufafanuzi wa Vigezo {#variable-definitions}

Ufafanuzi huu unabainisha vigezo vya hali ya mkataba. Vigezo hivi vimetangazwa kama `private`, lakini
hiyo inamaanisha tu kwamba mikataba mingine kwenye mnyororo wa vitalu haiwezi kuvisoma. _Hakuna
siri kwenye mnyororo wa vitalu_, programu kwenye kila nodi ina hali ya kila mkataba
katika kila kitalu. Kwa kawaida, vigezo vya hali hupewa jina `_<something>`.

Vigezo viwili vya kwanza ni [ramani](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
ikimaanisha vinafanya kazi takriban sawa na [safu shirikishi](https://wikipedia.org/wiki/Associative_array),
isipokuwa kwamba funguo ni thamani za nambari. Hifadhi inatengwa tu kwa maingizo ambayo yana thamani tofauti
na chaguo-msingi (sifuri).

```solidity
    mapping (address => uint256) private _balances;
```

Ramani ya kwanza, `_balances`, ni anwani na salio zao husika za tokeni hii. Ili kufikia
salio, tumia sintaksia hii: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Kigezo hiki, `_allowances`, kinahifadhi vibali vilivyoelezwa hapo awali. Faharisi ya kwanza ni mmiliki
wa tokeni, na ya pili ni mkataba wenye kibali. Ili kufikia kiasi ambacho anwani A inaweza
kutumia kutoka kwa akaunti ya anwani B, tumia `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Kama jina linavyopendekeza, kigezo hiki hufuatilia jumla ya usambazaji wa tokeni.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Vigezo hivi vitatu vinatumika kuboresha usomaji. Viwili vya kwanza vinajieleza, lakini `_decimals`
haijielezi.

Kwa upande mmoja, Ethereum haina vigezo vya nambari za desimali au sehemu. Kwa upande mwingine,
binadamu wanapenda kuweza kugawanya tokeni. Sababu moja iliyofanya watu wakubaliane kutumia dhahabu kwa sarafu ni kwamba
ilikuwa vigumu kutoa chenji wakati mtu alipotaka kununua ng'ombe kwa thamani ya bata.

Suluhisho ni kufuatilia nambari kamili, lakini kuhesabu badala ya tokeni halisi tokeni ya sehemu ambayo inakaribia
kukosa thamani. Katika kesi ya Etha, tokeni ya sehemu inaitwa Wei, na Wei 10^18 ni sawa na
ETH moja. Wakati wa kuandika, Wei 10,000,000,000,000 ni takriban senti moja ya Marekani au Euro.

Programu zinahitaji kujua jinsi ya kuonyesha salio la tokeni. Ikiwa mtumiaji ana Wei 3,141,000,000,000,000,000, je, hiyo ni
ETH 3.14? ETH 31.41? ETH 3,141? Katika kesi ya Etha inafafanuliwa Wei 10^18 kwa ETH, lakini kwa
tokeni yako unaweza kuchagua thamani tofauti. Ikiwa kugawanya tokeni hakuna maana, unaweza kutumia
thamani ya `_decimals` ya sifuri. Ikiwa unataka kutumia kiwango sawa na ETH, tumia thamani **18**.

### Konstrukta {#the-constructor}

```solidity
    /**
     * @dev Inaweka thamani za {name} na {symbol}, inaanzisha {decimals} na
     * thamani ya chaguo-msingi ya 18.
     *
     * Ili kuchagua thamani tofauti kwa {decimals}, tumia {_setupDecimals}.
     *
     * Thamani zote tatu hizi hazibadiliki: zinaweza tu kuwekwa mara moja wakati
     * wa ujenzi.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Katika Solidity ≥0.7.0, 'public' inaeleweka na inaweza kuachwa.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstrukta inaitwa wakati mkataba unaundwa kwa mara ya kwanza. Kwa kawaida, vigezo vya kazi hupewa jina `<something>_`.

### Kazi za Kiolesura cha Mtumiaji {#user-interface-functions}

```solidity
    /**
     * @dev Inarejesha jina la tokeni.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Inarejesha alama ya tokeni, kwa kawaida toleo fupi la
     * jina.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Inarejesha idadi ya desimali zinazotumika kupata uwakilishi wake kwa mtumiaji.
     * Kwa mfano, ikiwa `decimals` ni sawa na `2`, salio la tokeni `505` linapaswa
     * kuonyeshwa kwa mtumiaji kama `5,05` (`505 / 10 ** 2`).
     *
     * Kwa kawaida tokeni huchagua thamani ya 18, kuiga uhusiano kati ya
     * Etha na Wei. Hii ndiyo thamani ambayo {ERC-20} inatumia, isipokuwa {_setupDecimals} iitwe.
     *
     * KUMBUKA: Taarifa hii inatumika tu kwa madhumuni ya _kuonyesha_: kwa
     * vyovyote vile haiathiri hesabu yoyote ya mkataba, ikiwa ni pamoja na
     * {IERC20-balanceOf} na {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Kazi hizi, `name`, `symbol`, na `decimals` husaidia violesura vya mtumiaji kujua kuhusu mkataba wako ili viweze kuuonyesha ipasavyo.

Aina ya kurudi ni `string memory`, ikimaanisha kurudisha mfuatano ambao umehifadhiwa kwenye kumbukumbu. Vigezo, kama vile
mifuatano, vinaweza kuhifadhiwa katika maeneo matatu:

|          | Muda wa Kuishi | Ufikiaji wa Mkataba | Gharama ya Gesi                                                                             |
| -------- | -------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| Memory   | Mwito wa kazi  | Soma/Andika         | Makumi au mamia (juu zaidi kwa maeneo ya juu)                                               |
| Calldata | Mwito wa kazi  | Soma Tu             | Haiwezi kutumika kama aina ya kurudi, tu kama aina ya kigezo cha kazi                       |
| Storage  | Hadi ibadilishwe | Soma/Andika         | Juu (800 kwa kusoma, 20k kwa kuandika)                                                      |

Katika kesi hii, `memory` ndio chaguo bora.

### Soma Taarifa za Tokeni {#read-token-information}

Hizi ni kazi zinazotoa taarifa kuhusu tokeni, iwe ni jumla ya usambazaji au
salio la akaunti.

```solidity
    /**
     * @dev Tazama {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Kazi ya `totalSupply` inarudisha jumla ya usambazaji wa tokeni.

&nbsp;

```solidity
    /**
     * @dev Tazama {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Soma salio la akaunti. Kumbuka kwamba mtu yeyote anaruhusiwa kupata salio la akaunti ya mtu mwingine yeyote.
Hakuna maana ya kujaribu kuficha taarifa hii, kwa sababu inapatikana kwenye kila
nodi hata hivyo. _Hakuna siri kwenye mnyororo wa vitalu._

### Hamisha Tokeni {#transfer-tokens}

```solidity
    /**
     * @dev Tazama {IERC20-transfer}.
     *
     * Mahitaji:
     *
     * - `recipient` haiwezi kuwa anwani sifuri.
     * - mpigaji lazima awe na salio la angalau `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Kazi ya `transfer` inaitwa kuhamisha tokeni kutoka kwa akaunti ya mtumaji kwenda kwa nyingine. Kumbuka
kwamba ingawa inarudisha thamani ya boolean, thamani hiyo daima ni **kweli**. Ikiwa hamisho
litashindwa mkataba unatengua mwito.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Kazi ya `_transfer` inafanya kazi halisi. Ni kazi ya kibinafsi ambayo inaweza tu kuitwa na
kazi zingine za mkataba. Kwa kawaida kazi za kibinafsi hupewa jina `_<something>`, sawa na vigezo
vya hali.

Kawaida katika Solidity tunatumia `msg.sender` kwa mtumaji wa ujumbe. Hata hivyo, hiyo inavunja
[OpenGSN](https://opengsn.org/). Ikiwa tunataka kuruhusu miamala isiyo na Etha na tokeni yetu, tunahitaji
kutumia `_msgSender()`. Inarudisha `msg.sender` kwa miamala ya kawaida, lakini kwa ile isiyo na Etha
inarudisha mtia saini wa asili na sio mkataba uliopitisha ujumbe.

### Kazi za Kibali {#allowance-functions}

Hizi ni kazi zinazotekeleza utendaji wa kibali: `allowance`, `approve`, `transferFrom`,
na `_approve`. Zaidi ya hayo, utekelezaji wa OpenZeppelin unaenda zaidi ya kiwango cha msingi ili kujumuisha baadhi ya vipengele vinavyoboresha
usalama: `increaseAllowance`, na `decreaseAllowance`.

#### Kazi ya kibali {#allowance}

```solidity
    /**
     * @dev Tazama {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Kazi ya `allowance` inaruhusu kila mtu kuangalia kibali chochote.

#### Kazi ya kuidhinisha {#approve}

```solidity
    /**
     * @dev Tazama {IERC20-approve}.
     *
     * Mahitaji:
     *
     * - `spender` haiwezi kuwa anwani sifuri.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Kazi hii inaitwa kuunda kibali. Inafanana na kazi ya `transfer` hapo juu:

- Kazi inaita tu kazi ya ndani (katika kesi hii, `_approve`) ambayo inafanya kazi halisi.
- Kazi inarudisha `true` (ikiwa imefanikiwa) au inatengua (ikiwa sivyo).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Tunatumia kazi za ndani ili kupunguza idadi ya maeneo ambapo mabadiliko ya hali hutokea. Kazi _yoyote_ inayobadilisha
hali ni hatari inayowezekana ya usalama ambayo inahitaji kukaguliwa kwa usalama. Kwa njia hii tuna nafasi ndogo za kukosea.

#### Kazi ya transferFrom {#transferfrom}

Hii ni kazi ambayo mtumiaji anaita ili kutumia kibali. Hii inahitaji shughuli mbili: kuhamisha kiasi
kinachotumiwa na kupunguza kibali kwa kiasi hicho.

```solidity
    /**
     * @dev Tazama {IERC20-transferFrom}.
     *
     * Inatoa tukio la {Approval} kuonyesha kibali kilichosasishwa. Hii
     * haihitajiki na EIP. Tazama dokezo mwanzoni mwa {ERC-20}.
     *
     * Mahitaji:
     *
     * - `sender` na `recipient` haziwezi kuwa anwani sifuri.
     * - `sender` lazima awe na salio la angalau `amount`.
     * - mpigaji lazima awe na kibali cha tokeni za ``sender`` cha angalau
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Mwito wa kazi wa `a.sub(b, "message")` unafanya mambo mawili. Kwanza, inakokotoa `a-b`, ambayo ni kibali kipya.
Pili, inaangalia kuwa matokeo haya sio hasi. Ikiwa ni hasi mwito unatengua na ujumbe uliotolewa. Kumbuka kwamba wakati mwito unatengua usindikaji wowote uliofanywa hapo awali wakati wa mwito huo unapuuzwa kwa hivyo hatuhitaji
kutengua `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Nyongeza za usalama za OpenZeppelin {#openzeppelin-safety-additions}

Ni hatari kuweka kibali kisicho sifuri kwa thamani nyingine isiyo sifuri,
kwa sababu unadhibiti tu mpangilio wa miamala yako mwenyewe, sio ya mtu mwingine yeyote. Fikiria una
watumiaji wawili, Alice ambaye ni mjinga na Bill ambaye si mwaminifu. Alice anataka huduma fulani kutoka kwa
Bill, ambayo anafikiri inagharimu tokeni tano - kwa hivyo anampa Bill kibali cha tokeni tano.

Kisha kitu kinabadilika na bei ya Bill inapanda hadi tokeni kumi. Alice, ambaye bado anataka huduma,
anatuma muamala unaoweka kibali cha Bill kuwa kumi. Wakati Bill anapoona muamala huu mpya
katika kusanyiko la miamala anatuma muamala unaotumia tokeni tano za Alice na una
bei ya gesi ya juu zaidi ili uchimbwe haraka zaidi. Kwa njia hiyo Bill anaweza kutumia tokeni tano za kwanza na kisha,
mara tu kibali kipya cha Alice kinapochimbwa, kutumia kumi zaidi kwa bei ya jumla ya tokeni kumi na tano, zaidi ya
vile Alice alivyokusudia kuidhinisha. Mbinu hii inaitwa
[utangulizaji muamala](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Muamala wa Alice  | Nonsi ya Alice | Muamala wa Bill               | Nonsi ya Bill | Kibali cha Bill  | Jumla ya Mapato ya Bill kutoka kwa Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Ili kuepuka tatizo hili, kazi hizi mbili (`increaseAllowance` na `decreaseAllowance`) zinakuruhusu
kurekebisha kibali kwa kiasi maalum. Kwa hivyo ikiwa Bill alikuwa tayari ametumia tokeni tano, ataweza tu
kutumia tano zaidi. Kulingana na muda, kuna njia mbili ambazo hii inaweza kufanya kazi, zote mbili
zinaishia kwa Bill kupata tokeni kumi tu:

A:

| Muamala wa Alice           | Nonsi ya Alice | Muamala wa Bill              | Nonsi ya Bill | Kibali cha Bill  | Jumla ya Mapato ya Bill kutoka kwa Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Muamala wa Alice           | Nonsi ya Alice | Muamala wa Bill               | Nonsi ya Bill | Kibali cha Bill  | Jumla ya Mapato ya Bill kutoka kwa Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Inaongeza kibali kilichotolewa kwa `spender` na mpigaji kwa njia ya atomiki.
     *
     * Hii ni mbadala wa {idhinisha} ambayo inaweza kutumika kama suluhisho kwa
     * matatizo yaliyoelezwa katika {IERC20-approve}.
     *
     * Inatoa tukio la {Approval} kuonyesha kibali kilichosasishwa.
     *
     * Mahitaji:
     *
     * - `spender` haiwezi kuwa anwani sifuri.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Kazi ya `a.add(b)` ni nyongeza salama. Katika hali isiyowezekana kwamba `a`+`b`>=`2^256` haizunguki
kwa njia ambayo nyongeza ya kawaida hufanya.

```solidity

    /**
     * @dev Inapunguza kibali kilichotolewa kwa `spender` na mpigaji kwa njia ya atomiki.
     *
     * Hii ni mbadala wa {idhinisha} ambayo inaweza kutumika kama suluhisho kwa
     * matatizo yaliyoelezwa katika {IERC20-approve}.
     *
     * Inatoa tukio la {Approval} kuonyesha kibali kilichosasishwa.
     *
     * Mahitaji:
     *
     * - `spender` haiwezi kuwa anwani sifuri.
     * - `spender` lazima awe na kibali cha mpigaji cha angalau
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Kazi Zinazobadilisha Taarifa za Tokeni {#functions-that-modify-token-information}

Hizi ni kazi nne zinazofanya kazi halisi: `_transfer`, `_mint`, `_burn`, na `_approve`.

#### Kazi ya _transfer {#transfer}

```solidity
    /**
     * @dev Inahamisha tokeni `amount` kutoka kwa `sender` kwenda kwa `recipient`.
     *
     * Kitendaji hiki cha ndani ni sawa na {hamisho}, na kinaweza kutumika
     * k.m., kutekeleza ada za tokeni za kiotomatiki, taratibu za kukata (slashing), n.k.
     *
     * Inatoa tukio la {hamisho}.
     *
     * Mahitaji:
     *
     * - `sender` haiwezi kuwa anwani sifuri.
     * - `recipient` haiwezi kuwa anwani sifuri.
     * - `sender` lazima awe na salio la angalau `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Kazi hii, `_transfer`, inahamisha tokeni kutoka akaunti moja hadi nyingine. Inaitwa na zote mbili
`transfer` (kwa uhamisho kutoka kwa akaunti ya mtumaji mwenyewe) na `transferFrom` (kwa kutumia vibali
kuhamisha kutoka kwa akaunti ya mtu mwingine).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Hakuna mtu anayemiliki anwani sifuri katika Ethereum (yaani, hakuna anayejua ufunguo wa siri ambao ufunguo wa umma unaolingana nao
unabadilishwa kuwa anwani sifuri). Watu wanapotumia anwani hiyo, kwa kawaida ni hitilafu ya programu - kwa hivyo
tunashindwa ikiwa anwani sifuri inatumiwa kama mtumaji au mpokeaji.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Kuna njia mbili za kutumia mkataba huu:

1. Uitumie kama kiolezo kwa msimbo wako mwenyewe
1. [Urithi kutoka kwake](https://www.bitdegree.org/learn/solidity-inheritance), na ubatilishe tu kazi zile unazohitaji kurekebisha

Njia ya pili ni bora zaidi kwa sababu msimbo wa ERC-20 wa OpenZeppelin tayari umekaguliwa na kuonyeshwa kuwa salama. Unapotumia urithi
inakuwa wazi ni kazi gani unazorekebisha, na ili kuamini mkataba wako watu wanahitaji tu kukagua kazi hizo maalum.

Mara nyingi ni muhimu kufanya kazi kila wakati tokeni zinapobadilisha mikono. Hata hivyo, `_transfer` ni kazi muhimu sana na inawezekana
kuiandika kwa njia isiyo salama (tazama hapa chini), kwa hivyo ni bora kutoibatilisha. Suluhisho ni `_beforeTokenTransfer`,
[kazi ya ndoano](https://wikipedia.org/wiki/Hooking). Unaweza kubatilisha kazi hii, na itaitwa kwenye kila hamisho.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Hii ndio mistari inayofanya hamisho halisi. Kumbuka kwamba **hakuna kitu** kati yao, na kwamba tunatoa
kiasi kilichohamishwa kutoka kwa mtumaji kabla ya kukiongeza kwa mpokeaji. Hii ni muhimu kwa sababu ikiwa kungekuwa na
mwito kwa mkataba tofauti katikati, ingeweza kutumika kudanganya mkataba huu. Kwa njia hii hamisho
ni la atomiki, hakuna kinachoweza kutokea katikati yake.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Hatimaye, toa tukio la `Transfer`. Matukio hayafikiki kwa mikataba mahiri, lakini msimbo unaoendeshwa nje ya mnyororo wa vitalu
unaweza kusikiliza matukio na kuyajibu. Kwa mfano, mkoba unaweza kufuatilia wakati mmiliki anapata tokeni zaidi.

#### Kazi za _mint na _burn {#mint-and-burn}

Kazi hizi mbili (`_mint` na `_burn`) zinabadilisha jumla ya usambazaji wa tokeni.
Ni za ndani na hakuna kazi inayozipiga katika mkataba huu,
kwa hivyo zinafaa tu ikiwa unarithi kutoka kwa mkataba na kuongeza
mantiki yako mwenyewe kuamua chini ya hali gani ya kufua tokeni mpya au kuteketeza zilizopo.

**KUMBUKA:** Kila tokeni ya ERC-20 ina mantiki yake ya biashara inayoamuru usimamizi wa tokeni.
Kwa mfano, mkataba wa usambazaji uliowekwa unaweza tu kuita `_mint`
katika konstrukta na usiwahi kuita `_burn`. Mkataba unaouza tokeni
utaita `_mint` unapolipwa, na labda kuita `_burn` wakati fulani
ili kuepuka mfumuko wa bei unaokimbia.

```solidity
    /** @dev Inaunda tokeni `amount` na kuzikabidhi kwa `akaunti`, na kuongeza
     * usambazaji wa jumla.
     *
     * Inatoa tukio la {hamisho} huku `from` ikiwekwa kuwa anwani sifuri.
     *
     * Mahitaji:
     *
     * - `to` haiwezi kuwa anwani sifuri.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Hakikisha unasasisha `_totalSupply` wakati jumla ya idadi ya tokeni inabadilika.

&nbsp;

```solidity
    /**
     * @dev Inaharibu tokeni `amount` kutoka kwenye `akaunti`, na kupunguza
     * usambazaji wa jumla.
     *
     * Inatoa tukio la {hamisho} huku `to` ikiwekwa kuwa anwani sifuri.
     *
     * Mahitaji:
     *
     * - `akaunti` haiwezi kuwa anwani sifuri.
     * - `akaunti` lazima iwe na angalau tokeni `amount`.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Kazi ya `_burn` inakaribia kufanana na `_mint`, isipokuwa inaenda upande mwingine.

#### Kazi ya _approve {#approve-2}

Hii ndio kazi ambayo inabainisha vibali. Kumbuka kwamba inaruhusu mmiliki kubainisha
kibali ambacho ni cha juu kuliko salio la sasa la mmiliki. Hii ni Sawa kwa sababu salio
linaangaliwa wakati wa hamisho, ambapo linaweza kuwa tofauti na salio wakati kibali
kinaundwa.

```solidity
    /**
     * @dev Inaweka `amount` kama kibali cha `spender` juu ya tokeni za `owner`.
     *
     * Kitendaji hiki cha ndani ni sawa na `idhinisha`, na kinaweza kutumika
     * k.m., kuweka vibali vya kiotomatiki kwa mifumo midogo fulani, n.k.
     *
     * Inatoa tukio la {Approval}.
     *
     * Mahitaji:
     *
     * - `owner` haiwezi kuwa anwani sifuri.
     * - `spender` haiwezi kuwa anwani sifuri.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Toa tukio la `Approval`. Kulingana na jinsi programu inavyoandikwa, mkataba wa mtumiaji unaweza kuambiwa kuhusu
idhini iwe na mmiliki au na seva inayosikiliza matukio haya.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Rekebisha Kigezo cha Desimali {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Inaweka {decimals} kuwa thamani tofauti na ile ya chaguo-msingi ya 18.
     *
     * ONYO: Kitendaji hiki kinapaswa kuitwa tu kutoka kwenye konstrukta. Programu
     * nyingi zinazoingiliana na mikataba ya tokeni hazitatarajia
     * {decimals} kubadilika kamwe, na zinaweza kufanya kazi vibaya ikiwa itabadilika.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Kazi hii inarekebisha kigezo cha `_decimals` ambacho kinatumika kuambia violesura vya mtumiaji jinsi ya kutafsiri kiasi.
Unapaswa kuiita kutoka kwa konstrukta. Ingekuwa si uaminifu kuiita katika hatua yoyote inayofuata, na programu
hazijaundwa kushughulikia hilo.

### Ndoano {#hooks}

```solidity

    /**
     * @dev Ndoano (Hook) inayoitwa kabla ya hamisho lolote la tokeni. Hii inajumuisha
     * uundaji (minting) na uchomaji (burning).
     *
     * Masharti ya wito:
     *
     * - wakati `from` na `to` zote sio sifuri, tokeni `amount` za ``from``
     * zitahamishwa kwenda kwa `to`.
     * - wakati `from` ni sifuri, tokeni `amount` zitaundwa kwa ajili ya `to`.
     * - wakati `to` ni sifuri, tokeni `amount` za ``from`` zitachomwa.
     * - `from` na `to` haziwezi kuwa sifuri zote mbili.
     *
     * Ili kujifunza zaidi kuhusu ndoano, nenda kwenye xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Hii ni kazi ya ndoano itakayoitwa wakati wa uhamisho. Ni tupu hapa, lakini ikiwa unahitaji
ifanye kitu unaibatilisha tu.

## Hitimisho {#conclusion}

Kwa ukaguzi, haya ni baadhi ya mawazo muhimu zaidi katika mkataba huu (kwa maoni yangu, yako yanaweza kutofautiana):

- _Hakuna siri kwenye mnyororo wa vitalu_. Taarifa yoyote ambayo mkataba mahiri unaweza kufikia
  inapatikana kwa ulimwengu mzima.
- Unaweza kudhibiti mpangilio wa miamala yako mwenyewe, lakini sio wakati muamala wa watu wengine
  unatokea. Hii ndiyo sababu kubadilisha kibali kunaweza kuwa hatari, kwa sababu inaruhusu
  mtumiaji kutumia jumla ya vibali vyote viwili.
- Thamani za aina ya `uint256` huzunguka. Kwa maneno mengine, _0-1=2^256-1_. Ikiwa hiyo sio tabia
  inayotakiwa, lazima uiangalie (au utumie maktaba ya SafeMath inayokufanyia hivyo). Kumbuka kwamba hii ilibadilika katika
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Fanya mabadiliko yote ya hali ya aina maalum katika eneo maalum, kwa sababu inafanya ukaguzi kuwa rahisi.
  Hii ndiyo sababu tunayo, kwa mfano, `_approve`, ambayo inaitwa na `approve`, `transferFrom`,
  `increaseAllowance`, na `decreaseAllowance`
- Mabadiliko ya hali yanapaswa kuwa ya atomiki, bila kitendo kingine chochote katikati yao (kama unavyoweza kuona
  katika `_transfer`). Hii ni kwa sababu wakati wa mabadiliko ya hali unakuwa na hali isiyolingana. Kwa mfano,
  kati ya wakati unapotoa kutoka kwa salio la mtumaji na wakati unapoongeza kwenye salio la
  mpokeaji kuna tokeni chache zilizopo kuliko inavyopaswa kuwa. Hii inaweza kutumiwa vibaya ikiwa
  kuna shughuli kati yao, haswa miito kwa mkataba tofauti.

Sasa kwa kuwa umeona jinsi mkataba wa ERC-20 wa OpenZeppelin unavyoandikwa, na haswa jinsi unavyofanywa
kuwa salama zaidi, nenda ukaandike mikataba na programu zako salama.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).