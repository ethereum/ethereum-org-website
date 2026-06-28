---
title: "Mwongozo wa Mkataba wa Uniswap-v2"
description: Mkataba wa Uniswap-v2 unafanyaje kazi? Kwa nini umeandikwa kwa njia hiyo?
author: Ori Pomerantz
tags: ["Solidity", "dapps"]
skill: intermediate
breadcrumb: Mwongozo wa Uniswap v2
published: 2021-05-01
lang: sw
---
## Utangulizi {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) inaweza kuunda soko la mabadilishano kati ya tokeni zozote mbili za ERC-20. Katika makala haya tutapitia msimbo wa chanzo wa mikataba inayotekeleza itifaki hii na kuona kwa nini imeandikwa kwa njia hii.

### Uniswap Inafanya Nini? {#what-does-uniswap-do}

Kimsingi, kuna aina mbili za watumiaji: watoa ukwasi na wafanyabiashara.

_Watoa ukwasi_ hupatia bwawa tokeni mbili zinazoweza kubadilishwa (tutaziita **Token0** na **Token1**). Kwa malipo, wanapokea tokeni ya tatu inayowakilisha umiliki wa sehemu ya bwawa inayoitwa _tokeni ya ukwasi_.

_Wafanyabiashara_ hutuma aina moja ya tokeni kwenye bwawa na kupokea nyingine (kwa mfano, kutuma **Token0** na kupokea **Token1**) kutoka kwenye bwawa lililotolewa na watoa ukwasi. Kiwango cha ubadilishaji kinatambuliwa na idadi ya uwiano ya **Token0** na **Token1** ambayo bwawa linayo. Kwa kuongezea, bwawa huchukua asilimia ndogo kama tuzo kwa bwawa la ukwasi.

Wakati watoa ukwasi wanapotaka rasilimali zao zirudishwe wanaweza kuteketeza tokeni za bwawa na kupokea tena tokeni zao, ikijumuisha sehemu yao ya tuzo.

[Bofya hapa kwa maelezo kamili](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Kwa nini v2? Kwa nini si v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ni toleo lililoboreshwa ambalo ni gumu zaidi kuliko v2. Ni rahisi zaidi kujifunza v2 kwanza na kisha kwenda kwenye v3.

### Mikataba ya Msingi dhidi ya Mikataba ya Pembezoni {#contract-types}

Uniswap v2 imegawanywa katika vipengele viwili, msingi na pembezoni. Mgawanyiko huu unaruhusu mikataba ya msingi, ambayo inashikilia rasilimali na kwa hivyo _lazima_ iwe salama, kuwa rahisi na nyepesi kukagua. Utendaji wote wa ziada unaohitajika na wafanyabiashara unaweza kutolewa na mikataba ya pembezoni.

## Mtiririko wa Data na Udhibiti {#flows}

Huu ni mtiririko wa data na udhibiti unaotokea unapofanya vitendo vitatu vikuu vya Uniswap:

1. Badilishano kati ya tokeni tofauti
2. Ongeza ukwasi kwenye soko na upate tuzo ya tokeni za ukwasi za ERC-20 za ubadilishanaji wa jozi
3. Teketeza tokeni za ukwasi za ERC-20 na upate tena tokeni za ERC-20 ambazo ubadilishanaji wa jozi unaruhusu wafanyabiashara kubadilishana

### Badilishano {#swap-flow}

Huu ndio mtiririko wa kawaida zaidi, unaotumiwa na wafanyabiashara:

#### Mwitaji {#caller}

1. Ipe akaunti ya pembezoni kibali cha kiasi kinachopaswa kubadilishwa.
2. Ita mojawapo ya kazi nyingi za badilishano za mkataba wa pembezoni (ipi inategemea kama ETH inahusika au la, kama mfanyabiashara anabainisha kiasi cha tokeni za kuweka au kiasi cha tokeni za kupata tena, n.k).
   Kila kazi ya badilishano inakubali `path`, safu ya mabadilishano ya kupitia.

#### Katika mkataba wa pembezoni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Tambua kiasi kinachohitaji kufanyiwa biashara kwenye kila ubadilishanaji kando ya njia.
4. Inarudia kwenye njia. Kwa kila ubadilishanaji njiani inatuma tokeni ya kuingiza na kisha kuita kazi ya `swap` ya ubadilishanaji.
   Katika hali nyingi anwani ya mwisho ya tokeni ni ubadilishanaji wa jozi unaofuata katika njia. Katika ubadilishanaji wa mwisho ni anwani iliyotolewa na mfanyabiashara.

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Thibitisha kuwa mkataba wa msingi haudanganywi na unaweza kudumisha ukwasi wa kutosha baada ya badilishano.
6. Angalia tuna tokeni ngapi za ziada pamoja na akiba inayojulikana. Kiasi hicho ni idadi ya tokeni za kuingiza tulizopokea ili kubadilishana.
7. Tuma tokeni za kutoa kwenye kituo cha mwisho.
8. Ita `_update` ili kusasisha kiasi cha akiba

#### Kurudi kwenye mkataba wa pembezoni (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Fanya usafishaji wowote unaohitajika (kwa mfano, teketeza tokeni za WETH ili kupata tena ETH ya kumtumia mfanyabiashara)

### Ongeza Ukwasi {#add-liquidity-flow}

#### Mwitaji {#caller-2}

1. Ipe akaunti ya pembezoni kibali cha kiasi kinachopaswa kuongezwa kwenye bwawa la ukwasi.
2. Ita mojawapo ya kazi za `addLiquidity` za mkataba wa pembezoni.

#### Katika mkataba wa pembezoni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Unda ubadilishanaji mpya wa jozi ikiwa ni lazima
4. Ikiwa kuna ubadilishanaji wa jozi uliopo, hesabu kiasi cha tokeni za kuongeza. Hii inapaswa kuwa thamani sawa kwa tokeni zote mbili, kwa hivyo uwiano sawa wa tokeni mpya kwa tokeni zilizopo.
5. Angalia ikiwa kiasi kinakubalika (waitaji wanaweza kubainisha kiasi cha chini ambacho chini yake wangependelea kutoongeza ukwasi)
6. Ita mkataba wa msingi.

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Fua tokeni za ukwasi na uzitume kwa mwitaji
8. Ita `_update` ili kusasisha kiasi cha akiba

### Ondoa Ukwasi {#remove-liquidity-flow}

#### Mwitaji {#caller-3}

1. Ipe akaunti ya pembezoni kibali cha tokeni za ukwasi za kuteketezwa kwa kubadilishana na tokeni za msingi.
2. Ita mojawapo ya kazi za `removeLiquidity` za mkataba wa pembezoni.

#### Katika mkataba wa pembezoni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Tuma tokeni za ukwasi kwenye ubadilishanaji wa jozi

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Tuma anwani ya mwisho tokeni za msingi kwa uwiano wa tokeni zilizoteketezwa. Kwa mfano ikiwa kuna tokeni 1000 za A kwenye bwawa, tokeni 500 za B, na tokeni za ukwasi 90, na tunapokea tokeni 9 za kuteketeza, tunateketeza 10% ya tokeni za ukwasi kwa hivyo tunamrudishia mtumiaji tokeni 100 za A na tokeni 50 za B.
5. Teketeza tokeni za ukwasi
6. Ita `_update` ili kusasisha kiasi cha akiba

## Mikataba ya Msingi {#core-contracts}

Hii ni mikataba salama ambayo inashikilia ukwasi.

### UniswapV2Pair.sol {#uniswapv2pair}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) unatekeleza bwawa halisi ambalo hubadilishana tokeni. Ni utendaji wa msingi wa Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Hizi ni miingiliano yote ambayo mkataba unahitaji kujua, iwe kwa sababu mkataba unazitekeleza (`IUniswapV2Pair` na `UniswapV2ERC20`) au kwa sababu unaita mikataba inayoitekeleza.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Mkataba huu unarithi kutoka kwa `UniswapV2ERC20`, ambayo hutoa kazi za ERC-20 kwa tokeni za ukwasi.

```solidity
    using SafeMath  for uint;
```

[Maktaba ya SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) inatumika kuepuka kufurika na kupungua. Hili ni muhimu kwa sababu vinginevyo tunaweza kuishia na hali ambapo thamani inapaswa kuwa `-1`, lakini badala yake inakuwa `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Mahesabu mengi katika mkataba wa bwawa yanahitaji sehemu. Hata hivyo, sehemu hazitumiki na EVM.
Suluhisho ambalo Uniswap ilipata ni kutumia thamani za biti 224, zikiwa na biti 112 kwa sehemu ya nambari kamili, na biti 112 kwa sehemu. Kwa hivyo `1.0` inawakilishwa kama `2^112`, `1.5` inawakilishwa kama `2^112 + 2^111`, n.k.

Maelezo zaidi kuhusu maktaba hii yanapatikana [baadaye katika waraka huu](#fixedpoint).

#### Vigezo {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Ili kuepuka matukio ya kugawanya kwa sifuri, kuna idadi ya chini ya tokeni za ukwasi ambazo huwepo kila wakati (lakini zinamilikiwa na akaunti sifuri). Nambari hiyo ni **MINIMUM_LIQUIDITY**, elfu moja.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Hiki ni kiteuzi cha ABI kwa kazi ya hamisho ya ERC-20. Inatumika kuhamisha tokeni za ERC-20 katika akaunti mbili za tokeni.

```solidity
    address public factory;
```

Huu ni mkataba wa kiwanda uliounda bwawa hili. Kila bwawa ni badilishano kati ya tokeni mbili za ERC-20, kiwanda ni kituo kikuu kinachounganisha mabwawa haya yote.

```solidity
    address public token0;
    address public token1;
```

Kuna anwani za mikataba kwa aina mbili za tokeni za ERC-20 ambazo zinaweza kubadilishwa na bwawa hili.

```solidity
    uint112 private reserve0;           // inatumia nafasi moja ya hifadhi, inafikika kupitia getReserves
    uint112 private reserve1;           // inatumia nafasi moja ya hifadhi, inafikika kupitia getReserves
```

Akiba ambazo bwawa linazo kwa kila aina ya tokeni. Tunachukulia kwamba zote mbili zinawakilisha kiasi sawa cha thamani, na kwa hivyo kila token0 ina thamani ya reserve1/reserve0 ya token1.

```solidity
    uint32  private blockTimestampLast; // inatumia nafasi moja ya hifadhi, inafikika kupitia getReserves
```

Mhuri wa muda kwa kitalu cha mwisho ambacho badilishano lilitokea, kinachotumika kufuatilia viwango vya ubadilishaji kwa muda.

Moja ya gharama kubwa zaidi za gesi za mikataba ya Ethereum ni hifadhi, ambayo hudumu kutoka mwito mmoja wa mkataba hadi mwingine. Kila seli ya hifadhi ina urefu wa biti 256. Kwa hivyo vigezo vitatu, `reserve0`, `reserve1`, na `blockTimestampLast`, vimetengwa kwa njia ambayo thamani moja ya hifadhi inaweza kujumuisha zote tatu (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Vigezo hivi vinashikilia gharama limbikizi kwa kila tokeni (kila moja kwa kulinganisha na nyingine). Zinaweza kutumika kukokotoa wastani wa kiwango cha ubadilishaji kwa kipindi cha muda.

```solidity
    uint public kLast; // reserve0 * reserve1, kuanzia mara tu baada ya tukio la hivi karibuni la ukwasi
```

Njia ambayo badilishano la jozi huamua kiwango cha ubadilishaji kati ya token0 na token1 ni kuweka zao la akiba mbili kuwa thabiti wakati wa biashara. `kLast` ni thamani hii. Inabadilika wakati mtoa ukwasi anaweka au kutoa tokeni, na inaongezeka kidogo kwa sababu ya ada ya soko ya 0.3%.

Hapa kuna mfano rahisi. Kumbuka kwamba kwa kurahisisha jedwali lina tarakimu tatu tu baada ya nukta ya desimali, na tunapuuza ada ya biashara ya 0.3% kwa hivyo nambari si sahihi.

| Tukio                                       |  reserve0 |  reserve1 | reserve0 \* reserve1 | Wastani wa kiwango cha ubadilishaji (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Usanidi wa awali                               | 1,000.000 | 1,000.000 |            1,000,000 |                                         |
| Mfanyabiashara A anabadilisha token0 50 kwa token1 47.619  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                   |
| Mfanyabiashara B anabadilisha token0 10 kwa token1 8.984   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                   |
| Mfanyabiashara C anabadilisha token0 40 kwa token1 34.305  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                   |
| Mfanyabiashara D anabadilisha token1 100 kwa token0 109.01 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                   |
| Mfanyabiashara E anabadilisha token0 10 kwa token1 10.079  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                   |

Wafanyabiashara wanapotoa token0 zaidi, thamani ya kulinganisha ya token1 inaongezeka, na kinyume chake, kulingana na usambazaji na mahitaji.

#### Kufuli {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Kuna aina ya udhaifu wa kiusalama ambao unategemea [matumizi mabaya ya uingiaji upya](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap inahitaji kuhamisha tokeni za ERC-20 kiholela, ambayo inamaanisha kuita mikataba ya ERC-20 ambayo inaweza kujaribu kutumia vibaya soko la Uniswap linaloiita.
Kwa kuwa na kigezo cha `unlocked` kama sehemu ya mkataba, tunaweza kuzuia kazi kuitwa wakati zinaendelea (ndani ya muamala huo huo).

```solidity
    modifier lock() {
```

Kazi hii ni [kirekebishaji](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), kazi ambayo inafunika kazi ya kawaida ili kubadilisha tabia yake kwa njia fulani.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Ikiwa `unlocked` ni sawa na moja, iweke kuwa sifuri. Ikiwa tayari ni sifuri tengua mwito, ifanye ishindwe.

```solidity
        _;
```

Katika kirekebishaji `_;` ni mwito wa kazi asili (pamoja na vigezo vyote). Hapa inamaanisha kuwa mwito wa kazi hutokea tu ikiwa `unlocked` ilikuwa moja ilipoitwa, na wakati inaendelea thamani ya `unlocked` ni sifuri.

```solidity
        unlocked = 1;
    }
```

Baada ya kazi kuu kurudi, fungua kufuli.

#### Kazi mbalimbali {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Kazi hii inawapa wapigaji hali ya sasa ya badilishano. Kumbuka kwamba kazi za Solidity [zinaweza kurudisha thamani nyingi](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Kazi hii ya ndani inahamisha kiasi cha tokeni za ERC20 kutoka kwa badilishano kwenda kwa mtu mwingine. `SELECTOR` inabainisha kuwa kazi tunayoita ni `transfer(address,uint)` (tazama ufafanuzi hapo juu).

Ili kuepuka kulazimika kuingiza kiolesura kwa kazi ya tokeni, tunaunda mwito "kwa mikono" kwa kutumia mojawapo ya [kazi za ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Kuna njia mbili ambazo mwito wa hamisho wa ERC-20 unaweza kuripoti kutofaulu:

1. Tengua. Ikiwa mwito kwa mkataba wa nje unatengua, basi thamani ya kurudi ya boolean ni `false`
2. Maliza kawaida lakini ripoti kutofaulu. Katika hali hiyo bafa ya thamani ya kurudi ina urefu usio wa sifuri, na inaposimbuliwa kama thamani ya boolean inakuwa `false`

Ikiwa mojawapo ya masharti haya yatatokea, tengua.

#### Matukio {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Matukio haya mawili hutolewa wakati mtoa ukwasi anaweka ukwasi (`Mint`) au kuutoa (`Burn`). Katika hali yoyote, kiasi cha token0 na token1 ambacho kimewekwa au kutolewa ni sehemu ya tukio, pamoja na utambulisho wa akaunti iliyotuita (`sender`). Katika kesi ya utoaji, tukio pia linajumuisha lengwa lililopokea tokeni (`to`), ambalo linaweza lisiwe sawa na mtumaji.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Tukio hili hutolewa wakati mfanyabiashara anabadilisha tokeni moja kwa nyingine. Tena, mtumaji na marudio inaweza isiwe sawa.
Kila tokeni inaweza kutumwa kwa badilishano, au kupokelewa kutoka kwake.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Hatimaye, `Sync` hutolewa kila wakati tokeni zinapoongezwa au kutolewa, bila kujali sababu, ili kutoa taarifa za hivi punde za akiba (na kwa hivyo kiwango cha ubadilishaji).

#### Kazi za Usanidi {#pair-setup}

Kazi hizi zinapaswa kuitwa mara moja wakati badilishano jipya la jozi linaposanidiwa.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstrukta inahakikisha tutafuatilia anwani ya kiwanda kilichounda jozi. Taarifa hii inahitajika kwa `initialize` na kwa ada ya kiwanda (ikiwa ipo)

```solidity
    // inaitwa mara moja na kiwanda wakati wa usambazaji
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // ukaguzi wa kutosha
        token0 = _token0;
        token1 = _token1;
    }
```

Kazi hii inaruhusu kiwanda (na kiwanda pekee) kubainisha tokeni mbili za ERC-20 ambazo jozi hii itabadilishana.

#### Kazi za Ndani za Usasishaji {#pair-update-internal}

##### \_update

```solidity
    // sasisha akiba na, kwenye wito wa kwanza kwa kila kitalu, vilimbikizi vya bei
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Kazi hii inaitwa kila wakati tokeni zinapowekwa au kutolewa.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Ikiwa balance0 au balance1 (uint256) ni kubwa kuliko uint112(-1) (=2^112-1) (kwa hivyo inafurika na kurudi kwenye 0 inapobadilishwa kuwa uint112) kataa kuendelea na \_update ili kuzuia kufurika. Kwa tokeni ya kawaida inayoweza kugawanywa katika vipande 10^18, hii inamaanisha kila badilishano lina kikomo cha takriban 5.1\*10^15 ya kila tokeni. Kufikia sasa hilo halijawa tatizo.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // kufurika kunahitajika
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Ikiwa muda uliopita sio sifuri, inamaanisha sisi ni muamala wa kwanza wa badilishano kwenye kitalu hiki. Katika hali hiyo, tunahitaji kusasisha vilimbikizi vya gharama.

```solidity
            // * haifuriki kamwe, na + kufurika kunahitajika
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Kila kilimbikizi cha gharama kinasasishwa na gharama ya hivi punde (akiba ya tokeni nyingine/akiba ya tokeni hii) mara muda uliopita kwa sekunde. Ili kupata bei ya wastani, unasoma bei limbikizi katika pointi mbili za wakati na kugawanya kwa tofauti ya muda kati yao. Kwa mfano, chukulia mfuatano huu wa matukio:

| Tukio                                                    |  reserve0 |  reserve1 | mhuri wa muda | Kiwango cha ubadilishaji cha ukingoni (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| Usanidi wa awali                                            | 1,000.000 | 1,000.000 | 5,000     |                                        1.000 |                          0 |
| Mfanyabiashara A anaweka token0 50 na kupata token1 47.619  | 1,050.000 |   952.381 | 5,020     |                                        0.907 |                         20 |
| Mfanyabiashara B anaweka token0 10 na kupata token1 8.984   | 1,060.000 |   943.396 | 5,030     |                                        0.890 |       20+10\*0.907 = 29.07 |
| Mfanyabiashara C anaweka token0 40 na kupata token1 34.305  | 1,100.000 |   909.090 | 5,100     |                                        0.826 |    29.07+70\*0.890 = 91.37 |
| Mfanyabiashara D anaweka token1 100 na kupata token0 109.01 |   990.990 | 1,009.090 | 5,110     |                                        1.018 |    91.37+10\*0.826 = 99.63 |
| Mfanyabiashara E anaweka token0 10 na kupata token1 10.079  | 1,000.990 |   999.010 | 5,150     |                                        0.998 | 99.63+40\*1.1018 = 143.702 |

Tuseme tunataka kukokotoa bei ya wastani ya **Token0** kati ya mihuri ya muda 5,030 na 5,150. Tofauti katika thamani ya `price0Cumulative` ni 143.702-29.07=114.632. Huu ni wastani katika dakika mbili (sekunde 120). Kwa hivyo bei ya wastani ni 114.632/120 = 0.955.

Ukotoaji huu wa bei ndio sababu tunahitaji kujua ukubwa wa akiba za zamani.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Hatimaye, sasisha vigezo vya kimataifa na utoe tukio la `Sync`.

##### \_mintFee

```solidity
    // kama ada imewashwa, fua ukwasi sawa na 1/6 ya ukuaji katika sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Katika Uniswap 2.0 wafanyabiashara wanalipa ada ya 0.30% kutumia soko. Sehemu kubwa ya ada hiyo (0.25% ya biashara) kila wakati huenda kwa watoa ukwasi. 0.05% iliyobaki inaweza kwenda kwa watoa ukwasi au kwa anwani iliyobainishwa na kiwanda kama ada ya itifaki, ambayo inalipa Uniswap kwa juhudi zao za maendeleo.

Ili kupunguza mahesabu (na kwa hivyo gharama za gesi), ada hii inakokotolewa tu wakati ukwasi unaongezwa au kutolewa kwenye bwawa, badala ya kila muamala.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Soma marudio ya ada ya kiwanda. Ikiwa ni sifuri basi hakuna ada ya itifaki na hakuna haja ya kukokotoa ada hiyo.

```solidity
        uint _kLast = kLast; // kuokoa gesi
```

Kigezo cha hali cha `kLast` kiko kwenye hifadhi, kwa hivyo kitakuwa na thamani kati ya miito tofauti kwa mkataba.
Ufikiaji wa hifadhi ni ghali zaidi kuliko ufikiaji wa kumbukumbu tete ambayo hutolewa wakati mwito wa kazi kwa mkataba unapoisha, kwa hivyo tunatumia kigezo cha ndani kuokoa gesi.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Watoa ukwasi wanapata mgao wao kwa kuthaminiwa tu kwa tokeni zao za ukwasi. Lakini ada ya itifaki inahitaji tokeni mpya za ukwasi kufuliwa na kutolewa kwa anwani ya `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Ikiwa kuna ukwasi mpya wa kukusanya ada ya itifaki. Unaweza kuona kazi ya kipeo cha pili [baadaye katika makala haya](#math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Ukotoaji huu mgumu wa ada umeelezwa katika [waraka mweupe](https://app.uniswap.org/whitepaper.pdf) kwenye ukurasa wa 5. Tunajua kwamba kati ya wakati `kLast` ilipokokotolewa na sasa hakuna ukwasi ulioongezwa au kutolewa (kwa sababu tunaendesha ukotoaji huu kila wakati ukwasi unapoongezwa au kutolewa, kabla haujabadilika haswa), kwa hivyo mabadiliko yoyote katika `reserve0 * reserve1` lazima yatokane na ada za muamala (bila hizo tungeweka `reserve0 * reserve1` kuwa thabiti).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Tumia kazi ya `UniswapV2ERC20._mint` kuunda haswa tokeni za ziada za ukwasi na kuzikabidhi kwa `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Ikiwa hakuna ada weka `kLast` kuwa sifuri (ikiwa haiko hivyo tayari). Wakati mkataba huu uliandikwa kulikuwa na [kipengele cha kurejesha gesi](https://eips.ethereum.org/EIPS/eip-3298) ambacho kilihimiza mikataba kupunguza ukubwa wa jumla wa hali ya Ethereum kwa kuweka sifuri hifadhi ambayo hawakuhitaji.
Msimbo huu unapata urejeshaji huo inapowezekana.

#### Kazi Zinazofikika kwa Nje {#pair-external}

Kumbuka kwamba ingawa muamala au mkataba wowote _unaweza_ kuita kazi hizi, zimeundwa kuitwa kutoka kwa mkataba wa pembezoni. Ikiwa utaziita moja kwa moja hutaweza kudanganya badilishano la jozi, lakini unaweza kupoteza thamani kupitia kosa.

##### mint

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwenye mkataba ambao unafanya ukaguzi muhimu wa usalama
    function mint(address to) external lock returns (uint liquidity) {
```

Kazi hii inaitwa wakati mtoa ukwasi anaongeza ukwasi kwenye bwawa. Inafua tokeni za ziada za ukwasi kama tuzo. Inapaswa kuitwa kutoka kwa [mkataba wa pembezoni](#uniswapv2router02) ambao unaiita baada ya kuongeza ukwasi katika muamala huo huo (kwa hivyo hakuna mtu mwingine ambaye angeweza kuwasilisha muamala unaodai ukwasi mpya kabla ya mmiliki halali).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // kuokoa gesi
```

Hii ndiyo njia ya kusoma matokeo ya kazi ya Solidity ambayo inarudisha thamani nyingi. Tunatupa thamani za mwisho zilizorudishwa, mhuri wa muda wa kitalu, kwa sababu hatuuhitaji.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Pata salio la sasa na uone ni kiasi gani kiliongezwa kwa kila aina ya tokeni.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Kokotoa ada za itifaki za kukusanya, ikiwa zipo, na ufue tokeni za ukwasi ipasavyo. Kwa sababu vigezo kwa `_mintFee` ni thamani za akiba za zamani, ada inakokotolewa kwa usahihi kulingana tu na mabadiliko ya bwawa kutokana na ada.

```solidity
        uint _totalSupply = totalSupply; // kuokoa gesi, lazima ifafanuliwe hapa kwa kuwa totalSupply inaweza kusasishwa katika _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // funga daima tokeni za kwanza za MINIMUM_LIQUIDITY
```

Ikiwa huu ni uwekaji wa kwanza, unda tokeni `MINIMUM_LIQUIDITY` na uzitume kwa anwani sifuri ili kuzifunga. Haziwezi kukombolewa kamwe, ambayo inamaanisha bwawa halitamwagwa kabisa (hii inatuokoa kutokana na kugawanya kwa sifuri katika baadhi ya maeneo). Thamani ya `MINIMUM_LIQUIDITY` ni elfu moja, ambayo kwa kuzingatia ERC-20 nyingi zimegawanywa katika vipande vya 10^-18 vya tokeni, kama ETH inavyogawanywa katika Wei, ni 10^-15 kwa thamani ya tokeni moja. Sio gharama kubwa.

Wakati wa uwekaji wa kwanza hatujui thamani ya kulinganisha ya tokeni mbili, kwa hivyo tunazidisha tu kiasi na kuchukua kipeo cha pili, tukichukulia kwamba uwekaji unatupa thamani sawa katika tokeni zote mbili.

Tunaweza kuamini hili kwa sababu ni kwa maslahi ya mweka amana kutoa thamani sawa, ili kuepuka kupoteza thamani kwa usuluhishi.
Tuseme kwamba thamani ya tokeni mbili inafanana, lakini mweka amana wetu aliweka mara nne zaidi ya **Token1** kuliko **Token0**. Mfanyabiashara anaweza kutumia ukweli kwamba badilishano la jozi linafikiri kwamba **Token0** ina thamani zaidi ili kutoa thamani kutoka kwake.

| Tukio                                                        | reserve0 | reserve1 | reserve0 \* reserve1 | Thamani ya bwawa (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Usanidi wa awali                                                |        8 |       32 |                  256 |                                      40 |
| Mfanyabiashara anaweka tokeni 8 za **Token0**, anapata 16 za **Token1** |       16 |       16 |                  256 |                                      32 |

Kama unavyoona, mfanyabiashara alipata tokeni 8 za ziada, ambazo zinatokana na kupungua kwa thamani ya bwawa, na kumuumiza mweka amana anayeimiliki.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Kwa kila uwekaji unaofuata tayari tunajua kiwango cha ubadilishaji kati ya rasilimali mbili, na tunatarajia watoa ukwasi kutoa thamani sawa katika zote mbili. Ikiwa hawatafanya hivyo, tunawapa tokeni za ukwasi kulingana na thamani ndogo waliyotoa kama adhabu.

Iwe ni uwekaji wa awali au unaofuata, idadi ya tokeni za ukwasi tunazotoa ni sawa na kipeo cha pili cha mabadiliko katika `reserve0*reserve1` na thamani ya tokeni ya ukwasi haibadiliki (isipokuwa tupate uwekaji ambao hauna thamani sawa za aina zote mbili, ambapo "faini" inasambazwa). Hapa kuna mfano mwingine na tokeni mbili ambazo zina thamani sawa, na uwekaji mzuri tatu na moja mbaya (uwekaji wa aina moja tu ya tokeni, kwa hivyo haitoi tokeni zozote za ukwasi).

| Tukio                     | reserve0 | reserve1 | reserve0 \* reserve1 | Thamani ya bwawa (reserve0 + reserve1) | Tokeni za ukwasi zilizofufuliwa kwa uwekaji huu | Jumla ya tokeni za ukwasi | thamani ya kila tokeni ya ukwasi |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Usanidi wa awali             |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| Weka nne za kila aina |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| Weka mbili za kila aina  |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| Uwekaji wa thamani isiyo sawa     |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| Baada ya usuluhishi           |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Tumia kazi ya `UniswapV2ERC20._mint` kuunda haswa tokeni za ziada za ukwasi na kuzipa akaunti sahihi.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 na reserve1 zimesasishwa
        emit Mint(msg.sender, amount0, amount1);
    }
```

Sasisha vigezo vya hali (`reserve0`, `reserve1`, na ikihitajika `kLast`) na utoe tukio linalofaa.

##### burn

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwenye mkataba ambao unafanya ukaguzi muhimu wa usalama
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Kazi hii inaitwa wakati ukwasi unatolewa na tokeni zinazofaa za ukwasi zinahitaji kuteketezwa.
Inapaswa pia kuitwa [kutoka kwa akaunti ya pembezoni](#uniswapv2router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // kuokoa gesi
        address _token0 = token0;                                // kuokoa gesi
        address _token1 = token1;                                // kuokoa gesi
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Mkataba wa pembezoni ulihamisha ukwasi wa kuteketezwa kwa mkataba huu kabla ya mwito. Kwa njia hiyo tunajua ni kiasi gani cha ukwasi cha kuteketeza, na tunaweza kuhakikisha kwamba unateketezwa.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // kuokoa gesi, lazima ifafanuliwe hapa kwa kuwa totalSupply inaweza kusasishwa katika _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // kutumia salio kunahakikisha usambazaji wa pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // kutumia salio kunahakikisha usambazaji wa pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Mtoa ukwasi anapokea thamani sawa ya tokeni zote mbili. Kwa njia hii hatubadilishi kiwango cha ubadilishaji.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 na reserve1 zimesasishwa
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Sehemu iliyobaki ya kazi ya `burn` ni picha ya kioo ya kazi ya `mint` hapo juu.

##### swap

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwenye mkataba ambao unafanya ukaguzi muhimu wa usalama
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Kazi hii pia inapaswa kuitwa kutoka kwa [mkataba wa pembezoni](#uniswapv2router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // kuokoa gesi
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // upeo wa _token{0,1}, inaepuka makosa ya staki kuwa na kina sana
```

Vigezo vya ndani vinaweza kuhifadhiwa kwenye kumbukumbu au, ikiwa sio vingi sana, moja kwa moja kwenye staki.
Ikiwa tunaweza kupunguza idadi ili tutumie staki tunatumia gesi kidogo. Kwa maelezo zaidi tazama [waraka wa manjano, vipimo rasmi vya Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), uk. 26, mlinganyo 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // hamisha tokeni kwa matumaini
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // hamisha tokeni kwa matumaini
```

Hamisho hili lina matumaini, kwa sababu tunahamisha kabla ya kuwa na uhakika masharti yote yametimizwa. Hii ni Sawa katika Ethereum kwa sababu ikiwa masharti hayatatimizwa baadaye katika mwito tunatengua kutoka kwake na mabadiliko yoyote yaliyoundwa.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Mjulishe mpokeaji kuhusu badilishano ikiwa imeombwa.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Pata salio la sasa. Mkataba wa pembezoni unatutumia tokeni kabla ya kutuita kwa badilishano. Hii inafanya iwe rahisi kwa mkataba kuangalia kwamba haudanganywi, ukaguzi ambao _lazima_ ufanyike katika mkataba wa msingi (kwa sababu tunaweza kuitwa na vyombo vingine isipokuwa mkataba wetu wa pembezoni).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // upeo wa reserve{0,1}Adjusted, inaepuka makosa ya staki kuwa na kina sana
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Huu ni ukaguzi wa kiakili ili kuhakikisha hatupotezi kutokana na badilishano. Hakuna hali ambayo badilishano linapaswa kupunguza `reserve0*reserve1`. Hapa pia ndipo tunahakikisha ada ya 0.3% inatumwa kwenye badilishano; kabla ya kukagua kiakili thamani ya K, tunazidisha salio zote mbili kwa 1000 ikitolewa na kiasi kilichozidishwa kwa 3, hii inamaanisha 0.3% (3/1000 = 0.003 = 0.3%) inakatwa kutoka kwa salio kabla ya kulinganisha thamani yake ya K na thamani ya K ya akiba ya sasa.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Sasisha `reserve0` na `reserve1`, na ikihitajika vilimbikizi vya bei na mhuri wa muda na utoe tukio.

##### Usawazishaji au Skim

Inawezekana kwa salio halisi kutoka nje ya usawazishaji na akiba ambazo badilishano la jozi linafikiri linazo.
Hakuna njia ya kutoa tokeni bila idhini ya mkataba, lakini uwekaji ni jambo tofauti. Akaunti inaweza kuhamisha tokeni kwa badilishano bila kuita `mint` au `swap`.

Katika hali hiyo kuna suluhisho mbili:

- `sync`, sasisha akiba kwa salio la sasa
- `skim`, toa kiasi cha ziada. Kumbuka kwamba akaunti yoyote inaruhusiwa kuita `skim` kwa sababu hatujui nani aliweka tokeni. Taarifa hii inatolewa katika tukio, lakini matukio hayafikiki kutoka kwa mnyororo wa vitalu.

```solidity
    // lazimisha salio lilingane na akiba
    function skim(address to) external lock {
        address _token0 = token0; // kuokoa gesi
        address _token1 = token1; // kuokoa gesi
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // lazimisha akiba zilingane na salio
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) unaunda mabadilishano ya jozi.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Vigezo hivi vya hali ni muhimu kutekeleza ada ya itifaki (tazama [waraka mweupe](https://app.uniswap.org/whitepaper.pdf), uk. 5).
Anwani ya `feeTo` inalimbikiza tokeni za ukwasi kwa ada ya itifaki, na `feeToSetter` ni anwani inayoruhusiwa kubadilisha `feeTo` kwa anwani tofauti.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Vigezo hivi vinafuatilia jozi, mabadilishano kati ya aina mbili za tokeni.

Ya kwanza, `getPair`, ni ramani inayotambua mkataba wa badilishano la jozi kulingana na tokeni mbili za ERC-20 inazobadilishana. Tokeni za ERC-20 zinatambuliwa na anwani za mikataba inayoitekeleza, kwa hivyo funguo na thamani zote ni anwani. Ili kupata anwani ya badilishano la jozi inayokuruhusu kubadilisha kutoka `tokenA` hadi `tokenB`, unatumia `getPair[<tokenA address>][<tokenB address>]` (au kinyume chake).

Kigezo cha pili, `allPairs`, ni safu inayojumuisha anwani zote za mabadilishano ya jozi yaliyoundwa na kiwanda hiki. Katika Ethereum huwezi kurudia juu ya maudhui ya ramani, au kupata orodha ya funguo zote, kwa hivyo kigezo hiki ndiyo njia pekee ya kujua ni mabadilishano yapi kiwanda hiki kinasimamia.

Kumbuka: Sababu huwezi kurudia juu ya funguo zote za ramani ni kwamba hifadhi ya data ya mkataba ni _ghali_, kwa hivyo kadiri tunavyotumia kidogo ndivyo bora, na kadiri tunavyoibadilisha mara chache ndivyo bora. Unaweza kuunda [ramani zinazounga mkono urudiaji](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), lakini zinahitaji hifadhi ya ziada kwa orodha ya funguo. Katika programu nyingi huhitaji hilo.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Tukio hili hutolewa wakati badilishano jipya la jozi linaundwa. Linajumuisha anwani za tokeni, anwani ya badilishano la jozi, na jumla ya idadi ya mabadilishano yanayosimamiwa na kiwanda.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Kitu pekee ambacho konstrukta inafanya ni kubainisha `feeToSetter`. Viwanda huanza bila ada, na `feeSetter` pekee ndiye anayeweza kubadilisha hilo.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Kazi hii inarudisha idadi ya jozi za badilishano.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Hii ndiyo kazi kuu ya kiwanda, kuunda badilishano la jozi kati ya tokeni mbili za ERC-20. Kumbuka kwamba mtu yeyote anaweza kuita kazi hii. Huhitaji ruhusa kutoka kwa Uniswap kuunda badilishano jipya la jozi.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Tunataka anwani ya badilishano jipya iwe ya kubainika, ili iweze kukokotolewa mapema nje ya mnyororo (hii inaweza kuwa muhimu kwa [miamala ya tabaka la 2 (l2)](/developers/docs/scaling/)).
Ili kufanya hivi tunahitaji kuwa na mpangilio thabiti wa anwani za tokeni, bila kujali mpangilio ambao tumezipokea, kwa hivyo tunazipanga hapa.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // ukaguzi mmoja unatosha
```

Mabwawa makubwa ya ukwasi ni bora kuliko madogo, kwa sababu yana bei thabiti zaidi. Hatutaki kuwa na zaidi ya bwawa moja la ukwasi kwa kila jozi ya tokeni. Ikiwa tayari kuna badilishano, hakuna haja ya kuunda lingine kwa jozi hiyo hiyo.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Ili kuunda mkataba mpya tunahitaji msimbo unaouunda (kazi ya konstrukta na msimbo unaoandika kwenye kumbukumbu msimbo wa baiti wa EVM wa mkataba halisi). Kawaida katika Solidity tunatumia tu `addr = new <name of contract>(<constructor parameters>)` na kikusanyaji kinashughulikia kila kitu kwa ajili yetu, lakini ili kuwa na anwani ya mkataba inayobainika tunahitaji kutumia [msimbo wa operesheni wa CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Wakati msimbo huu uliandikwa msimbo huo wa operesheni ulikuwa bado hautumiki na Solidity, kwa hivyo ilikuwa muhimu kupata msimbo kwa mikono. Hili si tatizo tena, kwa sababu [Solidity sasa inasaidia CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Wakati msimbo wa operesheni bado hautumiki na Solidity tunaweza kuuita kwa kutumia [mkusanyiko wa ndani](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Ita kazi ya `initialize` ili kuambia badilishano jipya ni tokeni gani mbili inabadilishana.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // jaza ramani katika uelekeo wa kinyume
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Hifadhi taarifa mpya ya jozi katika vigezo vya hali na utoe tukio ili kuujulisha ulimwengu kuhusu badilishano jipya la jozi.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Kazi hizi mbili zinaruhusu `feeSetter` kudhibiti mpokeaji wa ada (ikiwa yupo), na kubadilisha `feeSetter` kwa anwani mpya.

### UniswapV2ERC20.sol {#uniswapv2erc20}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) unatekeleza tokeni ya ukwasi ya ERC-20. Inafanana na [mkataba wa ERC-20 wa OpenZeppelin](/developers/tutorials/erc20-annotated-code), kwa hivyo nitaelezea tu sehemu ambayo ni tofauti, utendaji wa `permit`.

Miamala kwenye Ethereum inagharimu Etha (ETH), ambayo ni sawa na pesa halisi. Ikiwa una tokeni za ERC-20 lakini huna ETH, huwezi kutuma miamala, kwa hivyo huwezi kufanya chochote nazo. Suluhisho moja la kuepuka tatizo hili ni [miamala ya meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Mmiliki wa tokeni anatia sahihi muamala unaoruhusu mtu mwingine kutoa tokeni nje ya mnyororo na kuutuma kwa kutumia Mtandao kwa mpokeaji. Mpokeaji, ambaye ana ETH, kisha anawasilisha kibali kwa niaba ya mmiliki.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Heshi hii ni [kitambulisho cha aina ya muamala](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Ya pekee tunayounga mkono hapa ni `Permit` na vigezo hivi.

```solidity
    mapping(address => uint) public nonces;
```

Haiwezekani kwa mpokeaji kughushi sahihi ya kidijitali. Hata hivyo, ni rahisi kutuma muamala huo huo mara mbili (hii ni aina ya [shambulio la kurudia](https://wikipedia.org/wiki/Replay_attack)). Ili kuzuia hili, tunatumia [nonsi](https://wikipedia.org/wiki/Cryptographic_nonce). Ikiwa nonsi ya `Permit` mpya sio moja zaidi ya ile ya mwisho iliyotumika, tunachukulia kuwa ni batili.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Huu ni msimbo wa kupata [kitambulisho cha mnyororo](https://chainid.network/). Inatumia lahaja ya mkusanyiko wa EVM inayoitwa [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Kumbuka kwamba katika toleo la sasa la Yul lazima utumie `chainid()`, sio `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Kokotoa [kitenganishi cha kikoa](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) kwa EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Hii ndiyo kazi inayotekeleza ruhusa. Inapokea kama vigezo nyanja husika, na thamani tatu za skali kwa [sahihi](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, na s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Usikubali miamala baada ya tarehe ya mwisho.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` ni ujumbe tunaotarajia kupata. Tunajua nonsi inapaswa kuwa nini, kwa hivyo hakuna haja ya sisi kuipata kama kigezo.

Kanuni ya sahihi ya Ethereum inatarajia kupata biti 256 za kutia sahihi, kwa hivyo tunatumia kazi ya heshi ya `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Kutoka kwa muhtasari na sahihi tunaweza kupata anwani iliyotia sahihi kwa kutumia [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Ikiwa kila kitu kiko Sawa, chukulia hii kama [idhinisha ya ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Mikataba ya Pembezoni {#periphery-contracts}

Mikataba ya pembezoni ni API (kiolesura cha programu ya matumizi) cha Uniswap. Inapatikana kwa miito ya nje, iwe kutoka kwa mikataba mingine au programu zilizogatuliwa. Unaweza kuita mikataba mikuu moja kwa moja, lakini hiyo ni ngumu zaidi na unaweza kupoteza thamani ukifanya kosa. Mikataba mikuu ina majaribio tu ya kuhakikisha haidanganywi, si ukaguzi wa usahihi kwa mtu mwingine yeyote. Hiyo ipo pembezoni ili iweze kusasishwa inapohitajika.

### UniswapV2Router01.sol {#uniswapv2router01}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) una matatizo, na [hupaswi kutumiwa tena](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Kwa bahati nzuri, mikataba ya pembezoni haina hali na haishikilii rasilimali zozote, kwa hivyo ni rahisi kuiondoa na kupendekeza watu watumie mbadala wake, `UniswapV2Router02`, badala yake.

### UniswapV2Router02.sol {#uniswapv2router02}

Katika hali nyingi ungetumia Uniswap kupitia [mkataba huu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Unaweza kuona jinsi ya kuutumia [hapa](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Mengi ya haya tulikutana nayo hapo awali, au yako wazi kabisa. Upekee mmoja ni `IWETH.sol`. Uniswap v2 inaruhusu mabadilishano kwa jozi yoyote ya tokeni za ERC-20, lakini Etha (ETH) yenyewe si tokeni ya ERC-20. Ilitangulia kiwango hicho na inahamishwa kwa mifumo ya kipekee. Ili kuwezesha matumizi ya ETH katika mikataba inayotumika kwa tokeni za ERC-20 watu walikuja na mkataba wa [ether iliyofungwa (weth)](https://weth.tkn.eth.limo/). Unatuma ETH kwenye mkataba huu, na inakufua kiasi sawa cha WETH. Au unaweza kuteketeza WETH, na kupata ETH nyuma.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Ruta inahitaji kujua ni kiwanda gani cha kutumia, na kwa miamala inayohitaji WETH ni mkataba gani wa WETH wa kutumia. Thamani hizi ni [zisizobadilika](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), ikimaanisha zinaweza tu kuwekwa kwenye konstrukta. Hii inawapa watumiaji ujasiri kwamba hakuna mtu ambaye angeweza kuzibadilisha ili kuelekeza kwenye mikataba isiyo ya uaminifu.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Kirekebishaji hiki kinahakikisha kwamba miamala yenye kikomo cha muda ("fanya X kabla ya muda Y ikiwa unaweza") haifanyiki baada ya kikomo chake cha muda.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstrukta inaweka tu vigezo vya hali isiyobadilika.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // kubali ETH pekee kupitia fallback kutoka kwenye mkataba wa WETH
    }
```

Kazi hii inaitwa tunapokomboa tokeni kutoka kwenye mkataba wa WETH kurudi kwenye ETH. Ni mkataba wa WETH pekee tunaoutumia ndio ulioidhinishwa kufanya hivyo.

#### Ongeza Ukwasi {#add-liquidity}

Kazi hizi zinaongeza tokeni kwenye mabadilishano ya jozi, ambayo huongeza bwawa la ukwasi.

```solidity

    // **** ONGEZA UKWASI ****
    function _addLiquidity(
```

Kazi hii inatumika kukokotoa kiasi cha tokeni za A na B ambazo zinapaswa kuwekwa kwenye mabadilishano ya jozi.

```solidity
        address tokenA,
        address tokenB,
```

Hizi ni anwani za mikataba ya tokeni za ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Hivi ni viwango ambavyo mtoa ukwasi anataka kuweka. Pia ni viwango vya juu zaidi vya A na B vya kuwekwa.

```solidity
        uint amountAMin,
        uint amountBMin
```

Hivi ni viwango vya chini vinavyokubalika kuweka. Ikiwa muamala hauwezi kufanyika kwa viwango hivi au zaidi, tengua kutoka kwake. Ikiwa hutaki kipengele hiki, taja tu sifuri.

Watoa ukwasi hutaja kiwango cha chini, kwa kawaida, kwa sababu wanataka kuweka kikomo cha muamala kwenye kiwango cha ubadilishaji ambacho kiko karibu na kile cha sasa. Ikiwa kiwango cha ubadilishaji kinabadilika sana inaweza kumaanisha habari zinazobadilisha thamani za msingi, na wanataka kuamua wenyewe nini cha kufanya.

Kwa mfano, fikiria hali ambapo kiwango cha ubadilishaji ni moja kwa moja na mtoa ukwasi anataja thamani hizi:

| Kigezo      | Thamani |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Ilimradi kiwango cha ubadilishaji kinabaki kati ya 0.9 na 1.25, muamala unafanyika. Ikiwa kiwango cha ubadilishaji kinatoka nje ya safu hiyo, muamala unafutwa.

Sababu ya tahadhari hii ni kwamba miamala si ya papo hapo, unaiwasilisha na hatimaye mthibitishaji ataijumuisha kwenye kitalu (isipokuwa bei ya gesi yako ni ya chini sana, ambapo utahitaji kuwasilisha muamala mwingine wenye nonsi sawa na bei ya gesi ya juu zaidi ili kuufunika). Huwezi kudhibiti kile kinachotokea wakati wa kipindi kati ya uwasilishaji na ujumuishaji.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Kazi inarudisha viwango ambavyo mtoa ukwasi anapaswa kuweka ili kuwa na uwiano sawa na uwiano wa sasa kati ya akiba.

```solidity
        // tengeneza jozi kama bado haipo
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Ikiwa hakuna mabadilishano kwa jozi hii ya tokeni bado, iunde.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Pata akiba za sasa kwenye jozi.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Ikiwa akiba za sasa ni tupu basi haya ni mabadilishano mapya ya jozi. Viwango vya kuwekwa vinapaswa kuwa sawa kabisa na vile ambavyo mtoa ukwasi anataka kutoa.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Ikiwa tunahitaji kuona viwango vitakuwa nini, tunapata kiwango bora zaidi kwa kutumia [kazi hii](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Tunataka uwiano sawa na akiba za sasa.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Ikiwa `amountBOptimal` ni ndogo kuliko kiwango ambacho mtoa ukwasi anataka kuweka inamaanisha kwamba tokeni B ina thamani zaidi kwa sasa kuliko anavyofikiri mweka ukwasi, kwa hivyo kiwango kidogo kinahitajika.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Ikiwa kiwango bora cha B ni zaidi ya kiwango cha B kinachohitajika inamaanisha tokeni za B zina thamani ndogo kwa sasa kuliko anavyofikiri mweka ukwasi, kwa hivyo kiwango cha juu kinahitajika. Hata hivyo, kiwango kinachohitajika ni cha juu zaidi, kwa hivyo hatuwezi kufanya hivyo. Badala yake tunakokotoa idadi bora ya tokeni za A kwa kiwango kinachohitajika cha tokeni za B.

Tukiweka yote pamoja tunapata grafu hii. Chukulia unajaribu kuweka tokeni elfu moja za A (mstari wa bluu) na tokeni elfu moja za B (mstari mwekundu). Mhimili wa x ni kiwango cha ubadilishaji, A/B. Ikiwa x=1, zina thamani sawa na unaweka elfu moja ya kila moja. Ikiwa x=2, A ina thamani mara mbili ya B (unapata tokeni mbili za B kwa kila tokeni ya A) kwa hivyo unaweka tokeni elfu moja za B, lakini tokeni 500 tu za A. Ikiwa x=0.5, hali inageuzwa, tokeni elfu moja za A na tokeni mia tano za B.

![Graph](liquidityProviderDeposit.png)

Unaweza kuweka ukwasi moja kwa moja kwenye mkataba mkuu (kwa kutumia [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), lakini mkataba mkuu unakagua tu kwamba haudanganywi wenyewe, kwa hivyo unajiweka kwenye hatari ya kupoteza thamani ikiwa kiwango cha ubadilishaji kitabadilika kati ya wakati unapowasilisha muamala wako na wakati unapotekelezwa. Ikiwa unatumia mkataba wa pembezoni, inakokotoa kiwango unachopaswa kuweka na kukiweka mara moja, kwa hivyo kiwango cha ubadilishaji hakibadiliki na hupotezi chochote.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Kazi hii inaweza kuitwa na muamala ili kuweka ukwasi. Vigezo vingi ni sawa na katika `_addLiquidity` hapo juu, isipokuwa viwili:

. `to` ni anwani inayopata tokeni mpya za ukwasi zilizofuliwa ili kuonyesha sehemu ya mtoa ukwasi kwenye bwawa
. `deadline` ni kikomo cha muda kwenye muamala

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Tunakokotoa viwango vya kuweka haswa na kisha kutafuta anwani ya bwawa la ukwasi. Ili kuokoa gesi hatufanyi hivi kwa kuuliza kiwanda, bali kwa kutumia kazi ya maktaba `pairFor` (tazama hapa chini kwenye maktaba)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Hamisha viwango sahihi vya tokeni kutoka kwa mtumiaji hadi kwenye mabadilishano ya jozi.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Kwa malipo ipe anwani ya `to` tokeni za ukwasi kwa umiliki wa sehemu wa bwawa. Kazi ya `mint` ya mkataba mkuu inaona ni tokeni ngapi za ziada ilizonazo (ikilinganishwa na ilivyokuwa nayo mara ya mwisho ukwasi ulipobadilika) na inafua ukwasi ipasavyo.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Wakati mtoa ukwasi anataka kutoa ukwasi kwenye mabadilishano ya jozi ya Tokeni/ETH, kuna tofauti chache. Mkataba unashughulikia kufunga ETH kwa ajili ya mtoa ukwasi. Hakuna haja ya kutaja ni ETH ngapi mtumiaji anataka kuweka, kwa sababu mtumiaji anazituma tu pamoja na muamala (kiwango kinapatikana katika `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Ili kuweka ETH mkataba kwanza unaifunga kuwa WETH na kisha kuhamisha WETH kwenye jozi. Kumbuka kwamba hamisho limefungwa katika `assert`. Hii inamaanisha kwamba ikiwa hamisho litashindwa mwito huu wa mkataba pia unashindwa, na kwa hivyo kufunga hakufanyiki kweli.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // rejesha Etha ya vumbi, kama ipo
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Mtumiaji tayari ametutumia ETH, kwa hivyo ikiwa kuna ziada yoyote iliyobaki (kwa sababu tokeni nyingine ina thamani ndogo kuliko mtumiaji alivyofikiri), tunahitaji kutoa marejesho.

#### Ondoa Ukwasi {#remove-liquidity}

Kazi hizi zitaondoa ukwasi na kumlipa mtoa ukwasi.

```solidity
    // **** ONDOA UKWASI ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Hali rahisi zaidi ya kuondoa ukwasi. Kuna kiwango cha chini cha kila tokeni ambacho mtoa ukwasi anakubali kupokea, na lazima ifanyike kabla ya tarehe ya mwisho.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // tuma ukwasi kwenye jozi
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Kazi ya `burn` ya mkataba mkuu inashughulikia kumlipa mtumiaji tokeni zake.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Wakati kazi inarudisha thamani nyingi, lakini tunavutiwa na baadhi tu, hivi ndivyo tunavyopata thamani hizo pekee. Ni nafuu kiasi kwa upande wa gesi kuliko kusoma thamani na kutoitumia kamwe.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Tafsiri viwango kutoka jinsi mkataba mkuu unavyozirudisha (tokeni ya anwani ya chini kwanza) hadi jinsi mtumiaji anavyozitarajia (kulingana na `tokenA` na `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Ni Sawa kufanya hamisho kwanza na kisha kuthibitisha kuwa ni halali, kwa sababu ikiwa sivyo tutatengua mabadiliko yote ya hali.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Kuondoa ukwasi kwa ETH ni karibu sawa, isipokuwa kwamba tunapokea tokeni za WETH na kisha kuzikomboa kwa ETH ili kumpa mtoa ukwasi.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Kazi hizi hupitisha miamala-meta ili kuruhusu watumiaji wasio na etha kutoa kutoka kwenye bwawa, kwa kutumia [utaratibu wa kibali](#uniswapv2erc20).

```solidity

    // **** ONDOA UKWASI (inasaidia tokeni za ada-kwa-hamisho) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Kazi hii inaweza kutumika kwa tokeni ambazo zina ada za hamisho au uhifadhi. Wakati tokeni ina ada kama hizo hatuwezi kutegemea kazi ya `removeLiquidity` kutuambia ni kiasi gani cha tokeni tunachopata nyuma, kwa hivyo tunahitaji kutoa kwanza na kisha kupata salio.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Kazi ya mwisho inachanganya ada za uhifadhi na miamala-meta.

#### Biashara {#trade}

```solidity
    // **** BADILISHANO ****
    // inahitaji kiasi cha awali kiwe tayari kimetumwa kwenye jozi ya kwanza
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Kazi hii inafanya uchakataji wa ndani ambao unahitajika kwa kazi ambazo zinawekwa wazi kwa wafanyabiashara.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Ninapoandika haya kuna [tokeni 388,160 za ERC-20](https://eth.blockscout.com/tokens). Kama kungekuwa na mabadilishano ya jozi kwa kila jozi ya tokeni, ingekuwa zaidi ya mabadilishano ya jozi bilioni 150. Mnyororo mzima, kwa sasa, [una 0.1% tu ya idadi hiyo ya akaunti](https://eth.blockscout.com/stats/accountsGrowth). Badala yake, kazi za badilishano zinaunga mkono dhana ya njia. Mfanyabiashara anaweza kubadilisha A kwa B, B kwa C, na C kwa D, kwa hivyo hakuna haja ya mabadilishano ya moja kwa moja ya jozi ya A-D.

Bei kwenye masoko haya huwa zinasawazishwa, kwa sababu zinapokuwa hazijasawazishwa inaunda fursa ya usuluhishi. Fikiria, kwa mfano, tokeni tatu, A, B, na C. Kuna mabadilishano matatu ya jozi, moja kwa kila jozi.

1. Hali ya awali
2. Mfanyabiashara anauza tokeni 24.695 za A na kupata tokeni 25.305 za B.
3. Mfanyabiashara anauza tokeni 24.695 za B kwa tokeni 25.305 za C, akiweka takriban tokeni 0.61 za B kama faida.
4. Kisha mfanyabiashara anauza tokeni 24.695 za C kwa tokeni 25.305 za A, akiweka takriban tokeni 0.61 za C kama faida. Mfanyabiashara pia ana tokeni 0.61 za ziada za A (zile 25.305 ambazo mfanyabiashara anamalizia nazo, ukiondoa uwekezaji wa awali wa 24.695).

| Hatua | Mabadilishano ya A-B                | Mabadilishano ya B-C                | Mabadilishano ya A-C                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Pata jozi tunayoshughulikia kwa sasa, ipange (kwa matumizi na jozi) na upate kiwango cha pato kinachotarajiwa.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Pata viwango vya pato vinavyotarajiwa, vilivyopangwa jinsi mabadilishano ya jozi yanavyotarajia viwe.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Je, haya ni mabadilishano ya mwisho? Ikiwa ndivyo, tuma tokeni zilizopokelewa kwa biashara kwenye kituo. Ikiwa sivyo, itume kwenye mabadilishano ya jozi inayofuata.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Kwa kweli ita mabadilishano ya jozi ili kubadilishana tokeni. Hatuhitaji mwito wa kurudi ili kuambiwa kuhusu mabadilishano, kwa hivyo hatutumi baiti zozote kwenye uwanja huo.

```solidity
    function swapExactTokensForTokens(
```

Kazi hii inatumika moja kwa moja na wafanyabiashara kubadilishana tokeni moja kwa nyingine.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Kigezo hiki kina anwani za mikataba ya ERC-20. Kama ilivyoelezwa hapo juu, huu ni mfuatano kwa sababu unaweza kuhitaji kupitia mabadilishano kadhaa ya jozi ili kutoka kwenye rasilimali uliyonayo hadi kwenye rasilimali unayotaka.

Kigezo cha kazi katika Solidity kinaweza kuhifadhiwa ama katika `memory` au `calldata`. Ikiwa kazi ni sehemu ya kuingilia kwenye mkataba, inayoitwa moja kwa moja kutoka kwa mtumiaji (kwa kutumia muamala) au kutoka kwa mkataba tofauti, basi thamani ya kigezo inaweza kuchukuliwa moja kwa moja kutoka kwenye data za mwito. Ikiwa kazi inaitwa kwa ndani, kama `_swap` hapo juu, basi vigezo vinapaswa kuhifadhiwa katika `memory`. Kutoka kwa mtazamo wa mkataba ulioitwa `calldata` inasomeka tu.

Kwa aina za skali kama vile `uint` au `address` kikusanyaji kinashughulikia chaguo la uhifadhi kwa ajili yetu, lakini kwa mifuatano, ambayo ni mirefu na ya gharama zaidi, tunataja aina ya uhifadhi itakayotumika.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Thamani za kurudisha kila wakati zinarudishwa kwenye kumbukumbu.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Kokotoa kiwango cha kununuliwa katika kila badilishano. Ikiwa matokeo ni chini ya kiwango cha chini ambacho mfanyabiashara yuko tayari kukubali, tengua kutoka kwenye muamala.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Hatimaye, hamisha tokeni ya awali ya ERC-20 kwenye akaunti kwa ajili ya mabadilishano ya kwanza ya jozi na uite `_swap`. Haya yote yanafanyika katika muamala ule ule, kwa hivyo mabadilishano ya jozi yanajua kwamba tokeni zozote zisizotarajiwa ni sehemu ya hamisho hili.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Kazi iliyotangulia, `swapTokensForTokens`, inaruhusu mfanyabiashara kutaja idadi kamili ya tokeni za kuingiza ambazo yuko tayari kutoa na idadi ya chini ya tokeni za pato ambazo yuko tayari kupokea kwa malipo. Kazi hii inafanya badilishano la kinyume, inamruhusu mfanyabiashara kutaja idadi ya tokeni za pato anazotaka, na idadi ya juu zaidi ya tokeni za kuingiza ambazo yuko tayari kulipia.

Katika visa vyote viwili, mfanyabiashara anapaswa kuupa mkataba huu wa pembezoni kwanza kibali ili kuuruhusu kuzihamisha.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // rejesha Etha ya vumbi, kama ipo
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Tofauti hizi nne zote zinahusisha biashara kati ya ETH na tokeni. Tofauti pekee ni kwamba tunapokea ETH kutoka kwa mfanyabiashara na kuitumia kufua WETH, au tunapokea WETH kutoka kwenye mabadilishano ya mwisho kwenye njia na kuiteketeza, tukimtumia mfanyabiashara ETH inayotokana.

```solidity
    // **** BADILISHANO (inasaidia tokeni za ada-kwa-hamisho) ****
    // inahitaji kiasi cha awali kiwe tayari kimetumwa kwenye jozi ya kwanza
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Hii ni kazi ya ndani ya kubadilishana tokeni ambazo zina ada za hamisho au uhifadhi ili kutatua ([suala hili](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // upeo ili kuepuka makosa ya staki kuwa na kina sana
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Kwa sababu ya ada za hamisho hatuwezi kutegemea kazi ya `getAmountsOut` kutuambia ni kiasi gani tunapata kutoka kwa kila hamisho (kama tunavyofanya kabla ya kuita `_swap` ya asili). Badala yake tunapaswa kuhamisha kwanza na kisha kuona ni tokeni ngapi tulipata nyuma.

Kumbuka: Kinadharia tungeweza tu kutumia kazi hii badala ya `_swap`, lakini katika visa fulani (kwa mfano, ikiwa hamisho linaishia kutenguliwa kwa sababu hakuna kiasi cha kutosha mwishoni ili kufikia kiwango cha chini kinachohitajika) hiyo ingeishia kugharimu gesi zaidi. Tokeni za ada ya hamisho ni nadra sana, kwa hivyo ingawa tunahitaji kuzishughulikia hakuna haja ya mabadilishano yote kudhani yanapitia angalau moja wapo.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Hizi ni tofauti zile zile zinazotumika kwa tokeni za kawaida, lakini zinaita `_swapSupportingFeeOnTransferTokens` badala yake.

```solidity
    // **** KAZI ZA MAKTABA ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Kazi hizi ni proksi tu zinazoita [kazi za UniswapV2Library](#uniswapv2library).

### UniswapV2Migrator.sol {#uniswapv2migrator}

Mkataba huu ulitumika kuhamisha mabadilishano kutoka v1 ya zamani hadi v2. Kwa kuwa sasa yamehamishwa, hauhusiki tena.

## Maktaba {#libraries}

[Maktaba ya SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) imeandikwa vizuri, kwa hivyo hakuna haja ya kuiandika hapa.

### Hisabati {#math}

Maktaba hii ina baadhi ya kazi za hisabati ambazo kwa kawaida hazihitajiki katika msimbo wa Solidity, kwa hivyo si sehemu ya lugha.

```solidity
pragma solidity =0.5.16;

// maktaba kwa ajili ya kufanya shughuli mbalimbali za hisabati

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // mbinu ya kibabeli (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Anza na x kama makadirio ambayo ni ya juu kuliko kipeo cha pili (hiyo ndiyo sababu tunahitaji kuchukulia 1-3 kama kesi maalum).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Pata makadirio ya karibu zaidi, wastani wa makadirio ya awali na nambari ambayo tunajaribu kutafuta kipeo chake cha pili ikigawanywa na makadirio ya awali. Rudia hadi makadirio mapya yasiwe chini ya yale yaliyopo. Kwa maelezo zaidi, [tazama hapa](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Hatupaswi kamwe kuhitaji kipeo cha pili cha sifuri. Vipeo vya pili vya moja, mbili, na tatu ni takriban moja (tunatumia nambari kamili, kwa hivyo tunapuuza sehemu).

```solidity
        }
    }
}
```

### Sehemu za Nukta Zisizobadilika (UQ112x112) {#fixedpoint}

Maktaba hii inashughulikia sehemu, ambazo kwa kawaida si sehemu ya hesabu za Ethereum. Inafanya hivi kwa kusimba nambari _x_ kama _x\*2^112_. Hii inaturuhusu kutumia misimbo ya operesheni ya asili ya kujumlisha na kutoa bila mabadiliko.

```solidity
pragma solidity =0.5.16;

// maktaba kwa ajili ya kushughulikia namba za uhakika zisizobadilika za mfumo wa jozi (https://wikipedia.org/wiki/Q_(number_format))

// masafa: [0, 2**112 - 1]
// azimio: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` ni usimbaji wa moja.

```solidity
    // simba uint112 kama UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // haifuriki kamwe
    }
```

Kwa sababu y ni `uint112`, kiwango chake cha juu zaidi kinaweza kuwa 2^112-1. Nambari hiyo bado inaweza kusimbwa kama `UQ112x112`.

```solidity
    // gawanya UQ112x112 kwa uint112, ikirejesha UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Ikiwa tutagawa thamani mbili za `UQ112x112`, matokeo hayazidishwi tena na 2^112. Kwa hivyo badala yake tunachukua nambari kamili kwa asili. Tungehitaji kutumia mbinu sawa kufanya kuzidisha, lakini hatuhitaji kufanya kuzidisha kwa thamani za `UQ112x112`.

### UniswapV2Library {#uniswapv2library}

Maktaba hii inatumika tu na mikataba ya pembezoni

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // inarejesha anwani za tokeni zilizopangwa, inatumika kushughulikia thamani za kurejesha kutoka kwenye jozi zilizopangwa kwa mpangilio huu
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Panga tokeni mbili kwa anwani, ili tuweze kupata anwani ya ubadilishanaji wa jozi kwa ajili yao. Hii ni muhimu kwa sababu vinginevyo tungekuwa na uwezekano mbili, moja kwa vigezo A,B na nyingine kwa vigezo B,A, na kusababisha mabadilishano mawili badala ya moja.

```solidity
    // inakokotoa anwani ya CREATE2 kwa ajili ya jozi bila kufanya wito wowote wa nje
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // heshi ya kodi ya init
            ))));
    }
```

Kazi hii inakokotoa anwani ya ubadilishanaji wa jozi kwa tokeni mbili. Mkataba huu unaundwa kwa kutumia [msimbo wa operesheni wa CREATE2](https://eips.ethereum.org/EIPS/eip-1014), kwa hivyo tunaweza kukokotoa anwani kwa kutumia algoriti sawa ikiwa tunajua vigezo inavyotumia. Hii ni nafuu sana kuliko kuuliza kiwanda, na

```solidity
    // inaleta na kupanga akiba kwa ajili ya jozi
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Kazi hii inarejesha akiba ya tokeni mbili ambazo ubadilishanaji wa jozi unazo. Kumbuka kwamba inaweza kupokea tokeni kwa mpangilio wowote, na kuzipanga kwa matumizi ya ndani.

```solidity
    // ikizingatiwa kiasi fulani cha rasilimali na akiba za jozi, inarejesha kiasi sawa cha rasilimali nyingine
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Kazi hii inakupa kiasi cha tokeni B utakachopata kwa kubadilishana na tokeni A ikiwa hakuna ada inayohusika. Ukokotoaji huu unazingatia kwamba hamisho hubadilisha kiwango cha ubadilishaji.

```solidity
    // ikizingatiwa kiasi cha ingizo cha rasilimali na akiba za jozi, inarejesha kiasi cha juu zaidi cha zao la rasilimali nyingine
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Kazi ya `quote` hapo juu inafanya kazi vizuri ikiwa hakuna ada ya kutumia ubadilishanaji wa jozi. Hata hivyo, ikiwa kuna ada ya ubadilishaji ya 0.3% kiasi unachopata hasa ni cha chini. Kazi hii inakokotoa kiasi baada ya ada ya ubadilishaji.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity haishughulikii sehemu kiasili, kwa hivyo hatuwezi tu kuzidisha kiasi kwa 0.997. Badala yake, tunazidisha kiasi cha juu (numerator) kwa 997 na kiasi cha chini (denominator) kwa 1000, na kufikia athari sawa.

```solidity
    // ikizingatiwa kiasi cha zao cha rasilimali na akiba za jozi, inarejesha kiasi kinachohitajika cha ingizo cha rasilimali nyingine
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Kazi hii inafanya takriban kitu kile kile, lakini inapata kiasi cha pato na kutoa ingizo.

```solidity

    // inafanya ukokotoaji wa getAmountOut uliounganishwa kwenye idadi yoyote ya jozi
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // inafanya ukokotoaji wa getAmountIn uliounganishwa kwenye idadi yoyote ya jozi
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Kazi hizi mbili zinashughulikia kutambua thamani wakati ni lazima kupitia mabadilishano kadhaa ya jozi.

### Msaidizi wa Hamisho {#transfer-helper}

[Maktaba hii](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) inaongeza ukaguzi wa mafanikio karibu na mahamisho ya ERC-20 na Ethereum ili kushughulikia tengua na urejeshaji wa thamani ya `false` kwa njia sawa.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// mbinu za msaidizi kwa ajili ya kuingiliana na tokeni za ERC-20 na kutuma ETH ambazo hazirejeshi kweli/si kweli mara kwa mara
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Tunaweza kuita mkataba tofauti kwa moja ya njia mbili:

- Tumia ufafanuzi wa kiolesura kuunda mwito wa kazi
- Tumia [kiolesura cha mfumo wa programu (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "kwa mikono" kuunda mwito. Hivi ndivyo mwandishi wa msimbo aliamua kufanya.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Kwa ajili ya utangamano wa nyuma na tokeni zilizoundwa kabla ya kiwango cha ERC-20, mwito wa ERC-20 unaweza kushindwa ama kwa kutengua (ambapo `success` ni `false`) au kwa kufanikiwa na kurejesha thamani ya `false` (ambapo kuna data ya pato, na ukiisimba kama boolean unapata `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Kazi hii inatekeleza [utendaji wa hamisho wa ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), ambao unaruhusu akaunti kutumia kibali kilichotolewa na akaunti tofauti.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Kazi hii inatekeleza [utendaji wa transferFrom wa ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), ambao unaruhusu akaunti kutumia kibali kilichotolewa na akaunti tofauti.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Kazi hii inahamisha Etha kwenye akaunti. Mwito wowote kwa mkataba tofauti unaweza kujaribu kutuma Etha. Kwa sababu hatuhitaji kuita kazi yoyote, hatutumi data yoyote na mwito huo.

## Hitimisho {#conclusion}

Hii ni makala ndefu ya takriban kurasa 50. Kama umefika hapa, hongera! Tunatumai kufikia sasa umeelewa mambo ya kuzingatia katika kuandika programu halisi (tofauti na programu fupi za mfano) na una uwezo mzuri zaidi wa kuandika mikataba kwa ajili ya matumizi yako mwenyewe.

Sasa nenda ukaandike kitu cha manufaa na utushangaze.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).