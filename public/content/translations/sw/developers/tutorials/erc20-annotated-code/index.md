---
title: "Mkataba wa ERC-20: Maelezo ya Kina"
description: Kuna nini katika mkataba wa OpenZeppelin ERC-20 na kwa nini kipo hapo?
author: Ori Pomerantz
lang: sw
tags: [ "uimara", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Utangulizi {#introduction}

Moja ya matumizi yanayojulikana sana ya Ethereum ni pale kikundi cha watu kinapotengeneza tokeni inayoweza kuuzwa, kwa maana nyingine, sarafu yao wenyewe. Tokeni hizi kwa kawaida hufuata kiwango,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Kiwango hiki hufanya iwezekanavyo kuandika zana, kama vile vidimbwi vya ukwasi na mikoba, ambavyo hufanya kazi na tokeni zote za ERC-20. Katika makala haya tutachambua
utekelezaji wa [OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), pamoja na
[ufafanuzi wa kiolesura](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Hii ni msimbo chanzo uliotiwa maelezo. Ikiwa unataka kutekeleza ERC-20,
[soma mafunzo haya](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Kiolesura {#the-interface}

Madhumuni ya kiwango kama ERC-20 ni kuruhusu utekelezaji wa tokeni nyingi ambazo zinaweza kufanya kazi katika mifumo mbalimbali, kama vile mikoba na exchange zilizogatuliwa. Ili kufanikisha hilo, tunatengeneza
[kiolesura](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Msimbo wowote unaohitaji kutumia mkataba wa tokeni
unaweza kutumia ufafanuzi uleule katika kiolesura na uendane na mikataba yote ya tokeni inayoutumia, iwe ni mkoba kama
MetaMask, mfumo uliotawanywa kama etherscan.io, au mkataba tofauti kama vile kidimbwi cha ukwasi.

![Kielelezo cha kiolesura cha ERC-20](erc20_interface.png)

Ikiwa wewe ni mtayarishaji programu mwenye uzoefu, huenda unakumbuka kuona miundo inayofanana katika [Java](https://www.w3schools.com/java/java_interface.asp)
au hata katika [faili za vichwa vya C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Huu ni ufafanuzi wa [Kiolesura cha ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
kutoka OpenZeppelin. Ni tafsiri ya [kiwango kinachosomeka na binadamu](https://eips.ethereum.org/EIPS/eip-20) kuwa msimbo wa Solidity. Bila shaka,
kiolesura chenyewe hakifafanui _jinsi_ ya kufanya chochote. Hilo limeelezwa katika msimbo chanzo wa mkataba hapo chini.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Faili za Solidity zinapaswa kujumuisha kitambulisho cha leseni. [Unaweza kuona orodha ya leseni hapa](https://spdx.org/licenses/). Ikiwa unahitaji leseni
tofauti, lieleze tu kwenye maoni.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Lugha ya Solidity bado inabadilika haraka, na matoleo mapya huenda yasiendane na msimbo wa zamani
([tazama hapa](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Kwa hivyo, ni wazo zuri kubainisha si tu toleo la chini
kabisa la lugha, bali pia toleo la juu zaidi, la hivi karibuni ambalo ulifanyia majaribio msimbo.

&nbsp;

```solidity
/**
 * @dev Kiolesura cha kiwango cha ERC20 kama kilivyofafanuliwa katika EIP.
 */
```

`@dev` katika maoni ni sehemu ya [umbizo la NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), linalotumika kutoa
nyaraka kutoka kwa msimbo chanzo.

&nbsp;

```solidity
interface IERC20 {
```

Kwa kimapokeo, majina ya kiolesura huanza na `I`.

&nbsp;

```solidity
    /**
     * @dev Hurejesha kiasi cha tokeni zilizopo.
     */
    function totalSupply() external view returns (uint256);
```

Kazi hii ni ya `nje`, ikimaanisha [inaweza tu kuitwa kutoka nje ya mkataba](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Hurejesha jumla ya tokeni zilizo katika mkataba. Thamani hii inarejeshwa kwa kutumia aina ya kawaida zaidi katika Ethereum, biti 256 zisizo na ishara (biti 256 ni
ukubwa asilia wa neno wa EVM). Kazi hii pia ni ya `kuangalia`, ambayo ina maana kwamba haibadilishi hali, hivyo inaweza kutekelezwa kwenye nodi moja badala ya kila nodi
katika mnyororo wa bloku kuitekeleza. Aina hii ya kazi haitengenezi muamala na haigharimu [gesi](/developers/docs/gas/).

**Kumbuka:** Kinadharia inaweza kuonekana kuwa muundaji wa mkataba anaweza kudanganya kwa kurudisha jumla ndogo kuliko thamani halisi, na kufanya kila tokeni ionekane
kuwa ya thamani zaidi kuliko ilivyo. Hata hivyo, hofu hiyo inapuuza asili halisi ya mnyororo wa bloku. Kila kitu kinachotokea kwenye mnyororo wa bloku kinaweza kuthibitishwa na
kila nodi. Ili kufanikisha hili, msimbo wa lugha ya mashine na hifadhi ya kila mkataba hupatikana kwenye kila nodi. Ingawa hauhitajiki kuchapisha msimbo wa Solidity
kwa mkataba wako, hakuna mtu atakayekuchukulia kwa uzito isipokuwa uchapishe msimbo chanzo na toleo la Solidity ambalo lilitumiwa kuukusanya, ili uweze
kuthibitishwa dhidi ya msimbo wa lugha ya mashine ulioutoa.
Kwa mfano, angalia [mkataba huu](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Hurejesha kiasi cha tokeni zinazomilikiwa na `akaunti`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Kama jina linavyosema, `balanceOf` inarejesha salio la akaunti. Akaunti za Ethereum zinatambuliwa katika Solidity kwa kutumia aina ya `anwani`, ambayo inashikilia biti 160.
Pia ni ya `nje` na ya `kuangalia`.

&nbsp;

```solidity
    /**
     * @dev Huhamisha `kiasi` cha tokeni kutoka kwa akaunti ya mpigaji simu hadi kwa `mpokeaji`.
     *
     * Hurudisha thamani ya boolean inayoonyesha kama operesheni imefanikiwa.
     *
     * Hutoa tukio la {Uhamisho}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Kazi ya `kuhamisha` huhamisha tokeni kutoka kwa mpigaji simu hadi anwani tofauti. Hii inahusisha mabadiliko ya hali, kwa hivyo si ya `kuangalia`.
Mtumiaji anapoita kazi hii huunda muamala na kugharimu gesi. Pia hutoa tukio, `Uhamisho`, ili kuwajulisha wote kwenye
mnyororo wa bloku kuhusu tukio hilo.

Kazi hii ina aina mbili za matokeo kwa aina mbili tofauti za wapigaji simu:

- Watumiaji wanaoita kazi moja kwa moja kutoka kwa kiolesura cha mtumiaji. Kwa kawaida mtumiaji huwasilisha muamala
  na hasubiri jibu, ambalo linaweza kuchukua muda usiojulikana. Mtumiaji anaweza kuona kilichotokea
  kwa kutafuta risiti ya muamala (ambayo inatambuliwa na hashi ya muamala) au kwa kutafuta
  tukio la `Uhamisho`.
- Mikataba mingine, ambayo huita kazi kama sehemu ya muamala mkuu. Mikataba hiyo hupata matokeo mara moja,
  kwa sababu huendeshwa katika muamala mmoja, kwa hivyo wanaweza kutumia thamani ya urejeshaji wa kazi.

Aina sawa ya matokeo huundwa na kazi zingine zinazobadilisha hali ya mkataba.

&nbsp;

Posho huruhusu akaunti kutumia baadhi ya tokeni za mmiliki mwingine.
Hii ni muhimu, kwa mfano, kwa mikataba inayofanya kazi kama wauzaji. Mikataba haiwezi
kufuatilia matukio, kwa hivyo ikiwa mnunuzi angehamisha tokeni kwa mkataba wa muuzaji
moja kwa moja mkataba huo haungejua umelipwa. Badala yake, mnunuzi huruhusu
mkataba wa muuzaji kutumia kiasi fulani, na muuzaji huhamisha kiasi hicho.
Hii inafanywa kupitia kazi ambayo mkataba wa muuzaji huita, ili mkataba wa muuzaji
uweze kujua kama imefanikiwa.

```solidity
    /**
     * @dev Hurejesha idadi iliyobaki ya tokeni ambazo `mtumiaji` atakuwa
     * anaruhusiwa kutumia kwa niaba ya `mmiliki` kupitia {transferFrom}. Hii ni
     * sifuri kwa chaguo-msingi.
     *
     * Thamani hii hubadilika wakati {approve} au {transferFrom} zinapoitwa.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Kazi ya `posho` inaruhusu mtu yeyote kuuliza ili kuona ni posho gani anwani
moja (`mmiliki`) inaruhusu anwani nyingine (`mtumiaji`) kutumia.

&nbsp;

```solidity
    /**
     * @dev Huweka `kiasi` kama posho ya `mtumiaji` juu ya tokeni za mpigaji simu.
     *
     * Hurudisha thamani ya boolean inayoonyesha kama operesheni imefanikiwa.
     *
     * MUHIMU: Jihadharini kwamba kubadilisha posho kwa njia hii huleta hatari
     * kwamba mtu anaweza kutumia posho ya zamani na mpya kwa bahati mbaya
     * ya mpangilio wa muamala. Suluhisho moja linalowezekana la kupunguza hali hii ya mbio
     * ni kwanza kupunguza posho ya mtumiaji hadi 0 na kuweka
     * thamani inayotakiwa baadaye:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Hutoa tukio la {Uidhinishaji}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Kazi ya `kuidhinisha` huunda posho. Hakikisha unasoma ujumbe kuhusu
jinsi inaweza kutumiwa vibaya. Katika Ethereum unadhibiti mpangilio wa miamala yako mwenyewe,
lakini huwezi kudhibiti mpangilio ambao miamala ya watu wengine
itatekelezwa, isipokuwa usipowasilisha muamala wako mwenyewe hadi uone
muamala wa upande mwingine umetokea.

&nbsp;

```solidity
    /**
     * @dev Huhamisha tokeni za `kiasi` kutoka kwa `mtumaji` hadi kwa `mpokeaji` kwa kutumia
     * mfumo wa posho. `kiasi` kisha kinakatwa kutoka kwa posho ya mpigaji simu
     * .
     *
     * Hurudisha thamani ya boolean inayoonyesha kama operesheni imefanikiwa.
     *
     * Hutoa tukio la {Uhamisho}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Mwishowe, `transferFrom` hutumiwa na mtumiaji kutumia posho halisi.

&nbsp;

```solidity

    /**
     * @dev Hutolewa wakati tokeni za `thamani` zinapohamishwa kutoka akaunti moja (`kutoka`) kwenda
     * nyingine (`kwenda`).
     *
     * Kumbuka kuwa `thamani` inaweza kuwa sifuri.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Hutolewa wakati posho ya `mtumiaji` kwa `mmiliki` imewekwa na
     * wito kwa {approve}. `thamani` ni posho mpya.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Matukio haya hutolewa wakati hali ya mkataba wa ERC-20 inapobadilika.

## Mkataba Halisi {#the-actual-contract}

Huu ndio mkataba halisi unaotekeleza kiwango cha ERC-20,
[umechukuliwa kutoka hapa](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Haikusudiwi kutumiwa kama ilivyo, lakini unaweza
[kurithi](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) kutoka kwayo ili kuipanua iwe kitu kinachoweza kutumika.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Taarifa za Kuingiza {#import-statements}

Mbali na ufafanuzi wa kiolesura hapo juu, ufafanuzi wa mkataba unaingiza faili zingine mbili:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` ni ufafanuzi unaohitajika kutumia [OpenGSN](https://www.opengsn.org/), mfumo unaowaruhusu watumiaji wasio na ether
  kutumia mnyororo wa bloku. Kumbuka kuwa hili ni toleo la zamani, ikiwa unataka kuunganisha na OpenGSN
  [tumia mafunzo haya](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Maktaba ya SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), ambayo inazuia
  kufurika/kupungua kwa hesabu kwa matoleo ya Solidity **&lt;0.8.0**. Katika Solidity ≥0.8.0, operesheni za hesabu hurejea kiotomatiki
  kwenye kufurika/kupungua, na kufanya SafeMath isiwe ya lazima. Mkataba huu unatumia SafeMath kwa uoanifu wa nyuma na
  matoleo ya zamani ya mkusanyaji.

&nbsp;

Maoni haya yanaelezea madhumuni ya mkataba.

```solidity
/**
 * @dev Utekelezaji wa kiolesura cha {IERC20}.
 *
 * Utekelezaji huu haujali jinsi tokeni zinavyoundwa. Hii inamaanisha
 * kwamba mfumo wa usambazaji unapaswa kuongezwa katika mkataba uliochukuliwa kwa kutumia {_mint}.
 * Kwa mfumo wa jumla tazama {ERC20PresetMinterPauser}.
 *
 * DONDOO: Kwa maandishi ya kina tazama mwongozo wetu
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Jinsi
 * ya kutekeleza mifumo ya usambazaji].
 *
 * Tumefuata miongozo ya jumla ya OpenZeppelin: kazi hurudisha badala
 * ya kurudisha `false` kwenye kutofaulu. Tabia hii hata hivyo ni ya kawaida
 * na haipingani na matarajio ya mifumo ya ERC20.
 *
 * Zaidi ya hayo, tukio la {Uidhinishaji} hutolewa kwenye wito kwa {transferFrom}.
 * Hii inaruhusu mifumo kujenga upya posho kwa akaunti zote tu
 * kwa kusikiliza matukio yaliyosemwa. Utekelezaji mwingine wa EIP hauwezi kutoa
 * matukio haya, kwani haihitajiki na vipimo.
 *
 * Mwishowe, kazi zisizo za kawaida za {decreaseAllowance} na {increaseAllowance}
 * zimeongezwa ili kupunguza maswala yanayojulikana karibu na kuweka
 * posho. Tazama {IERC20-approve}.
 */
```

### Ufafanuzi wa Mkataba {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Mstari huu unabainisha urithi, katika kesi hii kutoka `IERC20` kutoka juu na `Context`, kwa OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Mstari huu unaunganisha maktaba ya `SafeMath` na aina ya `uint256`. Unaweza kupata maktaba hii
[hapa](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Ufafanuzi wa Vigezo {#variable-definitions}

Ufafanuzi huu unabainisha vigezo vya hali ya mkataba. Vigezo hivi vimetangazwa kuwa `vya faragha`, lakini
hiyo inamaanisha tu kwamba mikataba mingine kwenye mnyororo wa bloku haiwezi kuvisoma. _Hakuna
siri kwenye mnyororo wa bloku_, programu kwenye kila nodi ina hali ya kila mkataba
katika kila bloku. Kwa kimapokeo, vigezo vya hali vinaitwa `_<something>`.

Vigezo viwili vya kwanza ni [ramani](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
maana yake vina tabia sawa na [safu unganishi](https://wikipedia.org/wiki/Associative_array),
isipokuwa kwamba funguo ni thamani za nambari. Hifadhi inatengwa tu kwa maingizo ambayo yana thamani tofauti
na chaguo-msingi (sifuri).

```solidity
    mapping (address => uint256) private _balances;
```

Ramani ya kwanza, `_balances`, ni anwani na salio zao za tokeni hii. Ili kupata
salio, tumia sintaksia hii: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Kigezo hiki, `_allowances`, huhifadhi posho zilizoelezwa mapema. Faharasa ya kwanza ni mmiliki
wa tokeni, na ya pili ni mkataba wenye posho. Ili kupata kiasi ambacho anwani A inaweza
kutumia kutoka kwa akaunti ya anwani B, tumia `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Kama jina linavyopendekeza, kigezo hiki hufuatilia jumla ya tokeni zote.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Vigezo hivi vitatu vinatumika kuboresha usomaji. Viwili vya kwanza vinajieleza, lakini `_decimals`
haieleweki.

Kwa upande mmoja, Ethereum haina vigezo vya nambari za desimali au sehemu. Kwa upande mwingine,
binadamu wanapenda kuweza kugawanya tokeni. Sababu moja watu walitumia dhahabu kama sarafu ilikuwa ni
kwamba ilikuwa ngumu kutoa chenji wakati mtu alitaka kununua bata lenye thamani ya sehemu ya ng'ombe.

Suluhisho ni kufuatilia nambari kamili, lakini kuhesabu badala ya tokeni halisi tokeni ya sehemu ambayo haina
karibu thamani yoyote. Katika kesi ya ether, tokeni ya sehemu inaitwa wei, na 10^18 wei ni sawa na moja
ETH. Wakati wa kuandika, 10,000,000,000,000 wei ni takriban senti moja ya Dola ya Marekani au Euro.

Mifumo inahitaji kujua jinsi ya kuonyesha salio la tokeni. Ikiwa mtumiaji ana 3,141,000,000,000,000,000 wei, je, hiyo ni
3.14 ETH? 31.41 ETH? 3,141 ETH? Katika kesi ya ether imefafanuliwa kuwa 10^18 wei ni sawa na ETH, lakini kwa
tokeni yako unaweza kuchagua thamani tofauti. Ikiwa kugawanya tokeni hakuna maana, unaweza kutumia
thamani ya `_decimals` ya sifuri. Ikiwa unataka kutumia kiwango sawa na ETH, tumia thamani **18**.

### Mjenzi {#the-constructor}

```solidity
    /**
     * @dev Huweka thamani za {name} na {symbol}, na huanzisha {decimals} na
     * thamani ya msingi ya 18.
     *
     * Ili kuchagua thamani tofauti kwa {decimals}, tumia {_setupDecimals}.
     *
     * Thamani hizi zote tatu hazibadiliki: zinaweza kuwekwa mara moja tu wakati
     * wa ujenzi.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Katika Solidity ≥0.7.0, 'public' ni dhahiri na inaweza kuachwa.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Mjenzi huitwa wakati mkataba unapoundwa kwa mara ya kwanza. Kwa kimapokeo, vigezo vya kazi huitwa `<something>_`.

### Kazi za Kiolesura cha Mtumiaji {#user-interface-functions}

```solidity
    /**
     * @dev Hurejesha jina la tokeni.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Hurejesha alama ya tokeni, kawaida toleo fupi la
     * jina.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Hurejesha idadi ya desimali zinazotumika kupata uwakilishi wake kwa mtumiaji.
     * Kwa mfano, ikiwa `decimals` ni sawa na `2`, salio la tokeni `505` linapaswa
     * kuonyeshwa kwa mtumiaji kama `5,05` (`505 / 10 ** 2`).
     *
     * Tokeni kawaida huchagua thamani ya 18, zikiiga uhusiano kati
     * ya ether na wei. Hii ndiyo thamani ambayo {ERC20} hutumia, isipokuwa {_setupDecimals}
     * ikiitwa.
     *
     * KUMBUKA: Habari hii inatumika tu kwa madhumuni ya _kuonyesha_: haiathiri
     * kwa njia yoyote hesabu zozote za mkataba, ikiwa ni pamoja na
     * {IERC20-balanceOf} na {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Kazi hizi, `name`, `symbol`, na `decimals` husaidia violesura vya mtumiaji kujua kuhusu mkataba wako ili waweze kuuonyesha vizuri.

Aina ya urejeshaji ni `string memory`, ikimaanisha kurudisha mfuatano ambao umehifadhiwa kwenye kumbukumbu. Vigezo, kama vile
mifufulizo, vinaweza kuhifadhiwa katika maeneo matatu:

|            | Muda wa Maisha    | Ufikiaji wa Mkataba | Gharama ya Gesi                                                        |
| ---------- | ----------------- | ------------------- | ---------------------------------------------------------------------- |
| Kumbukumbu | Wito wa kazi      | Soma/Andika         | Makumi au mamia (juu zaidi kwa maeneo ya juu zaidi) |
| Calldata   | Wito wa kazi      | Soma Pekee          | Haiwezi kutumika kama aina ya urejeshaji, tu aina ya kigezo cha kazi   |
| Ghala      | Hadi kubadilishwa | Soma/Andika         | Juu (800 kwa kusoma, 20k kwa kuandika)              |

Katika kesi hii, `memory` ni chaguo bora zaidi.

### Soma Taarifa za Tokeni {#read-token-information}

Hizi ni kazi zinazotoa habari kuhusu tokeni, ama jumla ya usambazaji au salio la
akaunti.

```solidity
    /**
     * @dev Tazama {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Kazi ya `totalSupply` inarejesha jumla ya usambazaji wa tokeni.

&nbsp;

```solidity
    /**
     * @dev Tazama {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Soma salio la akaunti. Kumbuka kuwa mtu yeyote anaruhusiwa kupata salio la akaunti
ya mtu mwingine. Hakuna maana ya kujaribu kuficha habari hii, kwa sababu inapatikana kwenye kila
nodi hata hivyo. _Hakuna siri kwenye mnyororo wa bloku._

### Hamisha Tokeni {#transfer-tokens}

```solidity
    /**
     * @dev Tazama {IERC20-transfer}.
     *
     * Mahitaji:
     *
     * - `mpokeaji` hawezi kuwa anwani ya sifuri.
     * - mpigaji simu lazima awe na salio la angalau `kiasi`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Kazi ya `kuhamisha` inaitwa ili kuhamisha tokeni kutoka kwa akaunti ya mtumaji hadi kwa nyingine tofauti. Kumbuka
kwamba ingawa inarudisha thamani ya boolean, thamani hiyo daima ni **kweli**. Ikiwa uhamisho
utashindwa mkataba unarudisha wito.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Kazi ya `_transfer` inafanya kazi halisi. Ni kazi ya faragha ambayo inaweza tu kuitwa na
kazi zingine za mkataba. Kwa kimapokeo kazi za faragha zinaitwa `_<something>`, sawa na vigezo vya
hali.

Kawaida katika Solidity tunatumia `msg.sender` kwa mtumaji wa ujumbe. Hata hivyo, hiyo inavunja
[OpenGSN](http://opengsn.org/). Ikiwa tunataka kuruhusu miamala isiyo na ether na tokeni yetu, tunahitaji
kutumia `_msgSender()`. Inarudisha `msg.sender` kwa miamala ya kawaida, lakini kwa isiyo na ether
hurudisha mtia saini asilia na sio mkataba uliopitisha ujumbe.

### Kazi za Posho {#allowance-functions}

Hizi ni kazi zinazotekeleza utendaji wa posho: `allowance`, `approve`, `transferFrom`,
na `_approve`. Zaidi ya hayo, utekelezaji wa OpenZeppelin unapita kiwango cha msingi kujumuisha baadhi ya vipengele vinavyoboresha
usalama: `increaseAllowance`, na `decreaseAllowance`.

#### Kazi ya posho {#allowance}

```solidity
    /**
     * @dev Tazama {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Kazi ya `posho` inaruhusu kila mtu kuangalia posho yoyote.

#### Kazi ya kuidhinisha {#approve}

```solidity
    /**
     * @dev Tazama {IERC20-approve}.
     *
     * Mahitaji:
     *
     * - `mtumiaji` hawezi kuwa anwani ya sifuri.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Kazi hii inaitwa ili kuunda posho. Inafanana na kazi ya `kuhamisha` hapo juu:

- Kazi hii huita tu kazi ya ndani (katika kesi hii, `_approve`) ambayo inafanya kazi halisi.
- Kazi hii hurudisha `kweli` (ikiwa imefanikiwa) au hurudisha nyuma (ikiwa sivyo).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Tunatumia kazi za ndani ili kupunguza idadi ya maeneo ambapo mabadiliko ya hali hutokea. Kazi _yoyote_ inayobadilisha
hali ni hatari inayowezekana ya usalama ambayo inahitaji kukaguliwa kwa usalama. Kwa njia hii tuna nafasi chache za kukosea.

#### Kazi ya transferFrom {#transferFrom}

Hii ni kazi ambayo mtumiaji huita ili kutumia posho. Hii inahitaji operesheni mbili: kuhamisha kiasi
kinachotumiwa na kupunguza posho kwa kiasi hicho.

```solidity
    /**
     * @dev Tazama {IERC20-transferFrom}.
     *
     * Hutoa tukio la {Uidhinishaji} linaloonyesha posho iliyosasishwa. Hii haihitajiki
     * na EIP. Tazama dokezo mwanzoni mwa {ERC20}.
     *
     * Mahitaji:
     *
     * - `mtumaji` na `mpokeaji` hawawezi kuwa anwani ya sifuri.
     * - `mtumaji` lazima awe na salio la angalau `kiasi`.
     * - mpigaji simu lazima awe na posho kwa tokeni za ``mtumaji`` za angalau
     * `kiasi`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Wito wa kazi wa `a.sub(b, "ujumbe")` hufanya mambo mawili. Kwanza, inakokotoa `a-b`, ambayo ni posho mpya.
Pili, inahakikisha kuwa matokeo haya si hasi. Ikiwa ni hasi wito unarudishwa na ujumbe uliotolewa. Kumbuka kwamba wito unapobadilishwa uchakataji wowote uliofanywa awali wakati wa wito huo hupuuzwa kwa hivyo hatuhitaji
kubatilisha `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: kiasi cha uhamisho kinazidi posho"));
        return true;
    }
```

#### Nyongeza za usalama za OpenZeppelin {#openzeppelin-safety-additions}

Ni hatari kuweka posho isiyo ya sifuri kwa thamani nyingine isiyo ya sifuri,
kwa sababu unadhibiti tu mpangilio wa miamala yako, si ya mtu mwingine yeyote. Fikiria una
watumiaji wawili, Alice ambaye ni mnyofu na Bill ambaye si mwaminifu. Alice anataka huduma fulani kutoka kwa
Bill, ambayo anadhani inagharimu tokeni tano - kwa hivyo anampa Bill posho ya tokeni tano.

Kisha kitu kinabadilika na bei ya Bill inapanda hadi tokeni kumi. Alice, ambaye bado anataka huduma hiyo,
hutuma muamala unaoweka posho ya Bill kuwa kumi. Papo hapo Bill anapoona muamala huu mpya
katika dimbwi la miamala hutuma muamala unaotumia tokeni tano za Alice na una bei ya juu zaidi
ya gesi ili ichimbwe haraka zaidi. Kwa njia hiyo Bill anaweza kutumia kwanza tokeni tano na kisha,
mara posho mpya ya Alice itakapochimbwa, kutumia kumi zaidi kwa bei ya jumla ya tokeni kumi na tano, zaidi ya
ambavyo Alice alikusudia kuidhinisha. Mbinu hii inaitwa
[Uendeshaji - wa mbele](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Muamala wa Alice                     | Nonce ya Alice | Muamala wa Bill                                  | Nonce ya Bill | Posho ya Bill | Jumla ya Mapato ya Bill kutoka kwa Alice |
| ------------------------------------ | -------------- | ------------------------------------------------ | ------------- | ------------- | ---------------------------------------- |
| approve(Bill, 5)  | 10             |                                                  |               | 5             | 0                                        |
|                                      |                | transferFrom(Alice, Bill, 5)  | 10,123        | 0             | 5                                        |
| approve(Bill, 10) | 11             |                                                  |               | 10            | 5                                        |
|                                      |                | transferFrom(Alice, Bill, 10) | 10,124        | 0             | 15                                       |

Ili kuepuka tatizo hili, kazi hizi mbili (`increaseAllowance` na `decreaseAllowance`) zinakuruhusu
kurekebisha posho kwa kiasi maalum. Kwa hiyo kama Bill tayari alikuwa ametumia tokeni tano, ataweza tu
kutumia tano zaidi. Kulingana na muda, kuna njia mbili hii inaweza kufanya kazi, zote mbili
zikimalizika na Bill kupata tokeni kumi tu:

A:

| Muamala wa Alice                              | Nonce ya Alice | Muamala wa Bill                                 | Nonce ya Bill | Posho ya Bill | Jumla ya Mapato ya Bill kutoka kwa Alice |
| --------------------------------------------- | -------------: | ----------------------------------------------- | ------------: | ------------: | ---------------------------------------- |
| approve(Bill, 5)           |             10 |                                                 |               |             5 | 0                                        |
|                                               |                | transferFrom(Alice, Bill, 5) |        10,123 |             0 | 5                                        |
| increaseAllowance(Bill, 5) |             11 |                                                 |               |       0+5 = 5 | 5                                        |
|                                               |                | transferFrom(Alice, Bill, 5) |        10,124 |             0 | 10                                       |

B:

| Muamala wa Alice                              | Nonce ya Alice | Muamala wa Bill                                  | Nonce ya Bill | Posho ya Bill | Jumla ya Mapato ya Bill kutoka kwa Alice |
| --------------------------------------------- | -------------: | ------------------------------------------------ | ------------: | ------------: | ---------------------------------------: |
| approve(Bill, 5)           |             10 |                                                  |               |             5 |                                        0 |
| increaseAllowance(Bill, 5) |             11 |                                                  |               |      5+5 = 10 |                                        0 |
|                                               |                | transferFrom(Alice, Bill, 10) |        10,124 |             0 |                                       10 |

```solidity
    /**
     * @dev Huongeza kiatomiki posho iliyotolewa kwa `mtumiaji` na mpigaji.
     *
     * Hii ni mbadala ya {approve} ambayo inaweza kutumika kama upunguzaji wa
     * matatizo yaliyoelezwa katika {IERC20-approve}.
     *
     * Hutoa tukio la {Uidhinishaji} linaloonyesha posho iliyosasishwa.
     *
     * Mahitaji:
     *
     * - `mtumiaji` hawezi kuwa anwani ya sifuri.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Kazi ya `a.add(b)` ni nyongeza salama. Katika kesi isiyowezekana kwamba `a`+`b`>=`2^256` haizunguki
kama nyongeza ya kawaida inavyofanya.

```solidity

    /**
     * @dev Hupunguza kiatomiki posho iliyotolewa kwa `mtumiaji` na mpigaji.
     *
     * Hii ni mbadala ya {approve} ambayo inaweza kutumika kama upunguzaji wa
     * matatizo yaliyoelezwa katika {IERC20-approve}.
     *
     * Hutoa tukio la {Uidhinishaji} linaloonyesha posho iliyosasishwa.
     *
     * Mahitaji:
     *
     * - `mtumiaji` hawezi kuwa anwani ya sifuri.
     * - `mtumiaji` lazima awe na posho kwa mpigaji wa angalau
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: posho iliyopunguzwa chini ya sifuri"));
        return true;
    }
```

### Kazi Zinazobadilisha Taarifa za Tokeni {#functions-that-modify-token-information}

Hizi ni kazi nne zinazofanya kazi halisi: `_transfer`, `_mint`, `_burn`, na `_approve`.

#### Kazi ya _transfer {#_transfer}

```solidity
    /**
     * @dev Huhamisha tokeni `kiasi` kutoka `mtumaji` hadi `mpokeaji`.
     *
     * Hii ni kazi ya ndani inayofanana na {transfer}, na inaweza kutumika kwa
     * k.m., kutekeleza ada za tokeni otomatiki, mifumo ya kupunguza, n.k.
     *
     * Hutoa tukio la {Uhamisho}.
     *
     * Mahitaji:
     *
     * - `mtumaji` hawezi kuwa anwani ya sifuri.
     * - `mpokeaji` hawezi kuwa anwani ya sifuri.
     * - `mtumaji` lazima awe na salio la angalau `kiasi`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Kazi hii, `_transfer`, huhamisha tokeni kutoka akaunti moja hadi nyingine. Inaitwa na `transfer` (kwa uhamisho kutoka kwa akaunti ya mtumaji mwenyewe) na `transferFrom` (kwa kutumia posho
kwa uhamisho kutoka kwa akaunti ya mtu mwingine).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: uhamisho kutoka kwa anwani ya sifuri");
        require(recipient != address(0), "ERC20: uhamisho kwenda kwa anwani ya sifuri");
```

Hakuna mtu anayemiliki anwani sifuri katika Ethereum (yaani, hakuna mtu anayejua ufunguo binafsi ambao ufunguo wake wa umma unaofanana
unabadilishwa kuwa anwani ya sifuri). Watu wanapotumia anwani hiyo, kawaida huwa ni hitilafu ya programu - kwa hivyo tunashindwa
ikiwa anwani ya sifuri itatumika kama mtumaji au mpokeaji.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Kuna njia mbili za kutumia mkataba huu:

1. Itumie kama kiolezo cha msimbo wako mwenyewe
2. [Rithi kutoka kwayo](https://www.bitdegree.org/learn/solidity-inheritance), na ubadilishe tu kazi unazohitaji kurekebisha

Njia ya pili ni bora zaidi kwa sababu msimbo wa OpenZeppelin ERC-20 tayari umekaguliwa na kuonyeshwa kuwa salama. Unapotumia urithi
ni wazi ni kazi gani unazorekebisha, na ili kuamini mkataba wako watu wanahitaji tu kukagua kazi hizo maalum.

Mara nyingi ni muhimu kutekeleza kazi kila wakati tokeni zinapohamishwa. Hata hivyo, `_transfer` ni kazi muhimu sana na inawezekana
kuiandika bila usalama (tazama hapa chini), kwa hivyo ni bora si kuibadilisha. Suluhisho ni `_beforeTokenTransfer`, kazi ya
[ndoano](https://wikipedia.org/wiki/Hooking). Unaweza kubadilisha kazi hii, na itaitwa kwenye kila uhamisho.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: kiasi cha uhamisho kinazidi salio");
        _balances[recipient] = _balances[recipient].add(amount);
```

Hizi ni mistari inayofanya uhamisho halisi. Kumbuka kuwa hakuna **kitu** kati yao, na kwamba tunapunguza
kiasi kilichohamishwa kutoka kwa mtumaji kabla ya kukiongeza kwa mpokeaji. Hii ni muhimu kwa sababu kama kungekuwa na
wito kwa mkataba tofauti katikati, ingeweza kutumiwa kudanganya mkataba huu. Kwa njia hii uhamisho
ni wa atomiki, hakuna kinachoweza kutokea katikati yake.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Mwishowe, toa tukio la `Uhamisho`. Matukio hayapatikani kwa mikataba-erevu, lakini msimbo unaoendeshwa nje ya mnyororo wa bloku
unaweza kusikiliza matukio na kuyajibu. Kwa mfano, mkoba unaweza kufuatilia wakati mmiliki anapata tokeni zaidi.

#### Kazi za _mint na _burn {#_mint-and-_burn}

Kazi hizi mbili (`_mint` na `_burn`) hubadilisha jumla ya usambazaji wa tokeni.
Ziko ndani na hakuna kazi inayowaita katika mkataba huu,
kwa hivyo ni muhimu tu ikiwa utarithi kutoka kwa mkataba na kuongeza mantiki yako mwenyewe
kuamua chini ya hali gani kuzalisha tokeni mpya au kuchoma zilizopo.

**KUMBUKA:** Kila tokeni ya ERC-20 ina mantiki yake ya biashara inayoelekeza usimamizi wa tokeni.
Kwa mfano, mkataba wa usambazaji uliowekwa unaweza kuita tu `_mint`
katika mjenzi na kamwe usiite `_burn`. Mkataba unaouza tokeni
utaite `_mint` unapolipwa, na pengine utaite `_burn` wakati fulani
ili kuepuka mfumuko wa bei usiodhibitiwa.

```solidity
    /** @dev Huunda tokeni za `kiasi` na kuzikabidhi kwa `akaunti`, akiongeza
     * jumla ya usambazaji.
     *
     * Hutoa tukio la {Uhamisho} na `kutoka` ikiwa imewekwa kwenye anwani ya sifuri.
     *
     * Mahitaji:
     *
     * - `kwa` hawezi kuwa anwani ya sifuri.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: zalisha kwa anwani ya sifuri");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Hakikisha unasasisha `_totalSupply` wakati jumla ya idadi ya tokeni inapobadilika.

&nbsp;

```solidity
    /**
     * @dev Huharibu tokeni za `kiasi` kutoka kwa `akaunti`, ikipunguza
     * jumla ya usambazaji.
     *
     * Hutoa tukio la {Uhamisho} na `kwa` ikiwa imewekwa kwenye anwani ya sifuri.
     *
     * Mahitaji:
     *
     * - `akaunti` haiwezi kuwa anwani ya sifuri.
     * - `akaunti` lazima iwe na angalau tokeni za `kiasi`.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: choma kutoka kwa anwani ya sifuri");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: kiasi cha kuchoma kinazidi salio");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Kazi ya `_burn` inakaribia kufanana na `_mint`, isipokuwa inaenda kinyume chake.

#### Kazi ya _approve {#_approve}

Hii ni kazi inayobainisha posho. Kumbuka kuwa inaruhusu mmiliki kubainisha
posho ambayo ni ya juu kuliko salio la sasa la mmiliki. Hii ni sawa kwa sababu salio
huangaliwa wakati wa uhamisho, ambapo inaweza kuwa tofauti na salio wakati posho
inapoundwa.

```solidity
    /**
     * @dev Huweka `kiasi` kama posho ya `mtumiaji` juu ya tokeni za `mmiliki`.
     *
     * Kazi hii ya ndani ni sawa na `approve`, na inaweza kutumika kwa
     * k.m., kuweka posho za kiotomatiki kwa mifumo fulani, n.k.
     *
     * Hutoa tukio la {Uidhinishaji}.
     *
     * Mahitaji:
     *
     * - `mmiliki` hawezi kuwa anwani ya sifuri.
     * - `mtumiaji` hawezi kuwa anwani ya sifuri.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: idhinisha kutoka kwa anwani ya sifuri");
        require(spender != address(0), "ERC20: idhinisha kwa anwani ya sifuri");

        _allowances[owner][spender] = amount;
```

&nbsp;

Toa tukio la `Uidhinishaji`. Kulingana na jinsi mfumo unavyoandikwa, mkataba wa mtumiaji unaweza kuambiwa kuhusu
idhini ama na mmiliki au na seva inayosikiliza matukio haya.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Rekebisha Kigezo cha Desimali {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Huweka {decimals} kwa thamani tofauti na ile ya msingi ya 18.
     *
     * ONYO: Kazi hii inapaswa kuitwa tu kutoka kwa mjenzi. Mifumo mingi
     * inayoingiliana na mikataba ya tokeni haitatarajia
     * {decimals} kubadilika, na inaweza kufanya kazi kimakosa ikibadilika.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Kazi hii inarekebisha kigezo cha `_decimals` ambacho kinatumika kuwaambia violesura vya mtumiaji jinsi ya kutafsiri kiasi.
Unapaswa kuiita kutoka kwa mjenzi. Itakuwa si uaminifu kuiita wakati wowote unaofuata, na mifumo
haikuundwa kuishughulikia.

### Vidokezo {#hooks}

```solidity

    /**
     * @dev Ndoano inayoitwa kabla ya uhamisho wowote wa tokeni. Hii inajumuisha
     * kuzalisha na kuchoma.
     *
     * Masharti ya wito:
     *
     * - wakati `kutoka` na `kwa` zote si sifuri, `kiasi` cha tokeni za ``kutoka``
     * kitahamishiwa kwa `kwa`.
     * - wakati `kutoka` ni sifuri, tokeni za `kiasi` zitazalishwa kwa `kwa`.
     * - wakati `kwa` ni sifuri, `kiasi` cha tokeni za ``kutoka`` kitachomwa.
     * - `kutoka` na `kwa` kamwe haviko zote sifuri.
     *
     * Ili kujifunza zaidi kuhusu ndoano, nenda kwa xref:ROOT:extending-contracts.adoc#using-hooks[Kutumia Ndoano].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Hii ni kazi ya ndoano ya kuitwa wakati wa uhamisho. Hapa ni tupu, lakini ukihitaji
iwe na kitu unaibadilisha tu.

## Hitimisho {#conclusion}

Kwa mapitio, hapa kuna baadhi ya mawazo muhimu zaidi katika mkataba huu (kwa maoni yangu, yako yanaweza kutofautiana):

- _Hakuna siri kwenye mnyororo wa bloku_. Taarifa yoyote ambayo mkataba-erevu unaweza kuipata
  inapatikana kwa ulimwengu wote.
- Unaweza kudhibiti mpangilio wa miamala yako mwenyewe, lakini si wakati miamala ya watu wengine
  inatokea. Hii ndiyo sababu kubadilisha posho kunaweza kuwa hatari, kwa sababu kunamruhusu
  mtumiaji kutumia jumla ya posho zote mbili.
- Thamani za aina ya `uint256` huzunguka. Kwa maneno mengine, _0-1=2^256-1_. Ikiwa hiyo si tabia inayotakiwa,
  unapaswa kuiangalia (au kutumia maktaba ya SafeMath ambayo inakufanyia). Kumbuka kuwa hii ilibadilika katika
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Fanya mabadiliko yote ya hali ya aina maalum katika sehemu maalum, kwa sababu inafanya ukaguzi kuwa rahisi.
  Hii ndiyo sababu tuna, kwa mfano, `_approve`, ambayo inaitwa na `approve`, `transferFrom`,
  `increaseAllowance`, na `decreaseAllowance`
- Mabadiliko ya hali yanapaswa kuwa ya atomiki, bila kitendo kingine chochote katikati yao (kama unavyoweza kuona
  katika `_transfer`). Hii ni kwa sababu wakati wa mabadiliko ya hali una hali isiyolingana. Kwa mfano,
  kati ya wakati unapopunguza kutoka kwa salio la mtumaji na wakati unapoongeza kwa salio la
  mpokeaji kuna tokeni chache zilizopo kuliko inavyopaswa kuwa. Hii inaweza kutumiwa vibaya ikiwa kuna
  operesheni kati yao, hasa wito kwa mkataba tofauti.

Sasa kwa kuwa umeona jinsi mkataba wa OpenZeppelin ERC-20 unavyoandikwa, na hasa jinsi unavyofanywa
kuwa salama zaidi, nenda uandike mikataba na mifumo yako salama.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
