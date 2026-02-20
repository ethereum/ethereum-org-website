---
title: "Muongozo wa Mkataba wa Uniswap-v2"
description: Mkataba wa Uniswap-v2 unafanyaje kazi? Kwa nini umeandikwa kwa njia hiyo?
author: Ori Pomerantz
tags: [ "uimara" ]
skill: intermediate
published: 2021-05-01
lang: sw
---

## Utangulizi {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) inaweza kuunda soko la kubadilishana kati ya tokeni zozote mbili za ERC-20. Katika makala haya tutapitia msimbo chanzo wa mikataba inayotekeleza itifaki hii na kuona kwa nini imeandikwa kwa njia hii.

### Uniswap Inafanya Nini? {#what-does-uniswap-do}

Kimsingi, kuna aina mbili za watumiaji: watoa huduma za ukwasi na wafanyabiashara.

_Watoa huduma za ukwasi_ huweka kwenye bwawa tokeni mbili ambazo zinaweza kubadilishwa (tutaziita **Token0** na **Token1**). Kwa malipo, wanapokea tokeni ya tatu inayowakilisha umiliki wa sehemu ya bwawa inayoitwa _tokeni ya ukwasi_.

_Wafanyabiashara_ hutuma aina moja ya tokeni kwenye bwawa na kupokea nyingine (kwa mfano, tuma **Token0** na pokea **Token1**) kutoka kwenye bwawa lililotolewa na watoa huduma za ukwasi. Kiwango cha ubadilishaji huamuliwa na idadi linganishi ya **Token0** na **Token1** ambazo bwawa linazo. Kwa kuongezea, bwawa huchukua asilimia ndogo kama tuzo kwa bwawa la ukwasi.

Watoa huduma za ukwasi wanapotaka mali zao zirudishwe wanaweza kuondoa tokeni za bwawa na kupokea tokeni zao, ikijumuisha sehemu yao ya tuzo.

[Bofya hapa kwa maelezo kamili](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Kwa nini v2? Kwa nini si v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) ni boresho ambalo ni changamano zaidi kuliko v2. Ni rahisi kujifunza v2 kwanza na kisha kwenda v3.

### Mikataba ya Msingi dhidi ya Mikataba ya Pembeni {#contract-types}

Uniswap v2 imegawanywa katika sehemu mbili, msingi na pembeni. Mgawanyiko huu unaruhusu mikataba ya msingi, ambayo inashikilia mali na kwa hivyo _lazima_ iwe salama, kuwa rahisi na rahisi kukaguliwa. Utendaji wote wa ziada unaohitajika na wafanyabiashara unaweza kutolewa na mikataba ya pembeni.

## Mtiririko wa Data na Udhibiti {#flows}

Huu ndio mtiririko wa data na udhibiti unaotokea unapofanya vitendo vikuu vitatu vya Uniswap:

1. Kubadilisha kati ya tokeni tofauti
2. Ongeza ukwasi kwenye soko na uzawadiwe kwa tokeni za ukwasi za ERC-20 za ubadilishaji wa jozi
3. Ondoa tokeni za ukwasi za ERC-20 na urejeshewe tokeni za ERC-20 ambazo ubadilishaji wa jozi unaruhusu wafanyabiashara kubadilishana

### Badilisha {#swap-flow}

Huu ndio mtiririko wa kawaida zaidi, unaotumiwa na wafanyabiashara:

#### Mwitaji {#caller}

1. Ipe akaunti ya pembeni ruhusa ya kiasi kitakachobadilishwa.
2. Piga simu mojawapo ya kazi nyingi za kubadilisha za mkataba wa pembeni (ipi inategemea kama ETH inahusika au la, kama mfanyabiashara anabainisha kiasi cha tokeni za kuweka au kiasi cha tokeni za kurejeshewa, n.k).
   Kila kazi ya kubadilisha inakubali `path`, safu ya mabadilishano ya kupitia.

#### Katika mkataba wa pembeni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Tambua kiasi kinachohitaji kufanyiwa biashara kwenye kila ubadilishaji kando ya njia.
4. Inarudia juu ya njia. Kwa kila ubadilishaji njiani inatuma tokeni ya kuingiza na kisha inapiga simu kazi ya `swap` ya ubadilishaji.
   Katika hali nyingi anwani lengwa ya tokeni ni ubadilishaji wa jozi unaofuata kwenye njia. Katika ubadilishaji wa mwisho ni anwani iliyotolewa na mfanyabiashara.

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Thibitisha kuwa mkataba wa msingi haufanyiwi udanganyifu na unaweza kudumisha ukwasi wa kutosha baada ya ubadilishaji.

6. Angalia ni tokeni ngapi za ziada tunazo pamoja na akiba zinazojulikana. Kiasi hicho ni idadi ya tokeni za kuingiza tulizopokea ili kubadilisha.
7. Tuma tokeni za matokeo kwenda lengwa.
8. Piga simu `_update` ili kusasisha kiasi cha akiba

#### Rudi kwenye mkataba wa pembeni (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Fanya usafi wowote unaohitajika (kwa mfano, ondoa tokeni za WETH ili kurudisha ETH kumtumia mfanyabiashara)

### Ongeza Ukwasi {#add-liquidity-flow}

#### Mwitaji {#caller-2}

1. Ipe akaunti ya pembeni ruhusa ya kiasi kitakachoongezwa kwenye bwawa la ukwasi.
2. Piga simu mojawapo ya kazi za `addLiquidity` za mkataba wa pembeni.

#### Katika mkataba wa pembeni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Unda ubadilishaji mpya wa jozi ikiwa ni lazima
4. Ikiwa kuna ubadilishaji wa jozi uliopo, hesabu kiasi cha tokeni za kuongeza. Hii inatakiwa kuwa na thamani sawa kwa tokeni zote mbili, kwa hiyo uwiano sawa wa tokeni mpya kwa tokeni zilizopo.
5. Angalia kama kiasi kinakubalika (wapigaji simu wanaweza kubainisha kiasi cha chini ambacho hawapendi kuongeza ukwasi chini yake)
6. Piga simu mkataba wa msingi.

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Zalisha tokeni za ukwasi na uzitumie kwa mwitaji
8. Piga simu `_update` ili kusasisha kiasi cha akiba

### Ondoa Ukwasi {#remove-liquidity-flow}

#### Mwitaji {#caller-3}

1. Ipe akaunti ya pembeni ruhusa ya tokeni za ukwasi zitakazoondolewa badala ya tokeni za msingi.
2. Piga simu mojawapo ya kazi za `removeLiquidity` za mkataba wa pembeni.

#### Katika mkataba wa pembeni (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Tuma tokeni za ukwasi kwenye ubadilishaji wa jozi

#### Katika mkataba wa msingi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Tuma kwenye anwani lengwa tokeni za msingi kulingana na tokeni zilizoondolewa. Kwa mfano ikiwa kuna tokeni 1000 za A kwenye bwawa, tokeni 500 za B, na tokeni 90 za ukwasi, na tunapokea tokeni 9 za kuondoa, tunaondoa 10% ya tokeni za ukwasi kwa hiyo tunamrudishia mtumiaji tokeni 100 za A na tokeni 50 za B.
5. Ondoa tokeni za ukwasi
6. Piga simu `_update` ili kusasisha kiasi cha akiba

## Mikataba ya Msingi {#core-contracts}

Hii ni mikataba salama ambayo inashikilia ukwasi.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) unatekeleza bwawa halisi linalobadilisha tokeni. Ni utendaji mkuu wa Uniswap.

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

Hizi zote ni miingiliano ambayo mkataba unahitaji kujua kuihusu, ama kwa sababu mkataba unazitekeleza (`IUniswapV2Pair` na `UniswapV2ERC20`) au kwa sababu inapiga simu mikataba inayozitekeleza.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Mkataba huu unarithi kutoka `UniswapV2ERC20`, ambayo hutoa kazi za ERC-20 kwa tokeni za ukwasi.

```solidity
    using SafeMath  for uint;
```

Maktaba ya [SafeMath library](https://docs.openzeppelin.com/contracts/2.x/api/math) inatumika kuepuka kufurika na kupungua. Hii ni muhimu kwa sababu vinginevyo tunaweza kuishia na hali ambapo thamani inapaswa kuwa `-1`, lakini badala yake ni `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Mahesabu mengi katika mkataba wa bwawa yanahitaji sehemu. Hata hivyo, sehemu hazitumiki na EVM.
Suluhisho ambalo Uniswap ilipata ni kutumia thamani za biti 224, na biti 112 kwa sehemu ya nambari kamili, na biti 112 kwa sehemu. Kwa hivyo `1.0` inawakilishwa kama `2^112`, `1.5` inawakilishwa kama `2^112 + 2^111`, n.k.

Maelezo zaidi kuhusu maktaba hii yanapatikana [baadaye kwenye hati](#FixedPoint).

#### Vigezo {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Ili kuepuka visa vya kugawanya kwa sifuri, kuna idadi ya chini ya tokeni za ukwasi ambazo zipo kila wakati (lakini zinamilikiwa na akaunti sifuri). Nambari hiyo ni **MINIMUM_LIQUIDITY**, elfu moja.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Hiki ni kiteuzi cha ABI kwa ajili ya kazi ya uhamisho wa ERC-20. Inatumika kuhamisha tokeni za ERC-20 katika akaunti mbili za tokeni.

```solidity
    address public factory;
```

Huu ni mkataba wa kiwanda uliounda bwawa hili. Kila bwawa ni ubadilishanaji kati ya tokeni mbili za ERC-20, kiwanda ni sehemu kuu inayounganisha mabwawa haya yote.

```solidity
    address public token0;
    address public token1;
```

Kuna anwani za mikataba ya aina mbili za tokeni za ERC-20 zinazoweza kubadilishwa na bwawa hili.

```solidity
    uint112 private reserve0;           // hutumia nafasi moja ya kuhifadhi, inayopatikana kupitia getReserves
    uint112 private reserve1;           // hutumia nafasi moja ya kuhifadhi, inayopatikana kupitia getReserves
```

Akiba ambayo bwawa lina nayo kwa kila aina ya tokeni. Tunadhania kuwa zote mbili zinawakilisha kiasi sawa cha thamani, na kwa hivyo kila token0 ina thamani ya reserve1/reserve0 ya tokeni1.

```solidity
    uint32  private blockTimestampLast; // hutumia nafasi moja ya kuhifadhi, inayopatikana kupitia getReserves
```

Mhuri wa muda wa kizuizi cha mwisho ambapo ubadilishanaji ulitokea, unaotumika kufuatilia viwango vya ubadilishanaji kwa muda.

Moja ya gharama kubwa zaidi za gesi za mikataba ya Ethereum ni hifadhi, ambayo huendelea kutoka simu moja ya mkataba hadi nyingine. Kila seli ya hifadhi ina urefu wa biti 256. Kwa hivyo vigezo vitatu, `reserve0`, `reserve1`, na `blockTimestampLast`, vimepangwa kwa namna ambayo thamani moja ya hifadhi inaweza kujumuisha zote tatu (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Vigezo hivi hushikilia gharama limbikizi kwa kila tokeni (kila moja kwa mujibu wa nyingine). Vinaweza kutumika kuhesabu kiwango cha wastani cha ubadilishanaji kwa kipindi cha muda.

```solidity
    uint public kLast; // reserve0 * reserve1, kuanzia mara tu baada ya tukio la hivi karibuni la ukwasi
```

Njia ambayo ubadilishanaji wa jozi huamua kiwango cha ubadilishanaji kati ya token0 na token1 ni kuweka zidishi la akiba mbili kuwa la kudumu wakati wa biashara. `kLast` ni thamani hii. Inabadilika wakati mtoa huduma wa ukwasi anaweka au kutoa tokeni, na huongezeka kidogo kwa sababu ya ada ya soko ya 0.3%.

Huu ni mfano rahisi. Kumbuka kuwa kwa ajili ya kurahisisha, jedwali lina tarakimu tatu tu baada ya nukta ya desimali, na tunapuuza ada ya biashara ya 0.3% kwa hivyo nambari si sahihi.

| Tukio                                                                                          |                  reserve0 |                  reserve1 | reserve0 \* reserve1 | Kiwango cha wastani cha ubadilishaji (token1 / token0) |
| ---------------------------------------------------------------------------------------------- | ------------------------: | ------------------------: | -------------------: | ------------------------------------------------------------------------- |
| Usanidi wa awali                                                                               | 1,000.000 | 1,000.000 |            1,000,000 |                                                                           |
| Mfanyabiashara A anabadilisha tokeni 50 za token0 kwa tokeni 47.619 za token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                                     |
| Mfanyabiashara B anabadilisha tokeni 10 za token0 kwa tokeni 8.984 za token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                                     |
| Mfanyabiashara C anabadilisha tokeni 40 za token0 kwa tokeni 34.305 za token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                                     |
| Mfanyabiashara D anabadilisha tokeni 100 za token1 kwa tokeni 109.01 za token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                                     |
| Mfanyabiashara E anabadilisha tokeni 10 za token0 kwa tokeni 10.079 za token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                                     |

Wafanyabiashara wanapotoa token0 zaidi, thamani linganishi ya token1 huongezeka, na kinyume chake, kulingana na usambazaji na mahitaji.

#### Funga {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Kuna aina ya udhaifu wa usalama unaotokana na [matumizi mabaya ya kuingia tena](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap inahitaji kuhamisha tokeni za kiholela za ERC-20, ambayo inamaanisha kupiga simu mikataba ya ERC-20 ambayo inaweza kujaribu kutumia vibaya soko la Uniswap linaloziita.
Kwa kuwa na kigezo cha `unlocked` kama sehemu ya mkataba, tunaweza kuzuia kazi zisiitwe wakati zinaendeshwa (ndani ya muamala mmoja).

```solidity
    modifier lock() {
```

Kazi hii ni [kirekebishaji](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), kazi inayozunguka kazi ya kawaida ili kubadilisha tabia yake kwa namna fulani.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Ikiwa `unlocked` ni sawa na moja, iweke sifuri. Ikiwa tayari ni sifuri, rudisha simu, ifanye ishindwe.

```solidity
        _;
```

Katika kirekebishaji `_;` ni simu ya awali ya kazi (pamoja na vigezo vyote). Hapa inamaanisha kuwa simu ya kazi inatokea tu ikiwa `unlocked` ilikuwa moja wakati ilipoitwa, na wakati inaendeshwa thamani ya `unlocked` ni sifuri.

```solidity
        unlocked = 1;
    }
```

Baada ya kazi kuu kurudi, toa kufuli.

#### Mbalimbali kazi {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Kazi hii huwapa wapigaji simu hali ya sasa ya ubadilishanaji. Ona kuwa kazi za Solidity [zinaweza kurudisha thamani nyingi](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Kazi hii ya ndani huhamisha kiasi cha tokeni za ERC20 kutoka kwenye ubadilishanaji kwenda kwa mtu mwingine. `SELECTOR` inabainisha kuwa kazi tunayoita ni `transfer(address,uint)` (tazama ufafanuzi hapo juu).

Ili kuepuka kulazimika kuingiza kiolesura cha kazi ya tokeni, tunatengeneza simu "kwa mikono" kwa kutumia moja ya [kazi za ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Kuna njia mbili ambazo simu ya uhamisho ya ERC-20 inaweza kuripoti kushindwa:

1. Rejesha. Ikiwa simu ya mkataba wa nje inarejeshwa, basi thamani ya kurudi ya boolean ni `false`
2. Maliza kawaida lakini ripoti kushindwa. Katika hali hiyo bafa ya thamani ya kurudi ina urefu usio wa sifuri, na inapopambanuliwa kama thamani ya boolean ni `false`

Ikiwa mojawapo ya masharti haya yatatokea, rejesha.

#### Matukio {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Matukio haya mawili hutolewa wakati mtoa huduma wa ukwasi anapoweka ukwasi (`Mint`) au anapoutoa (`Burn`). Katika hali zote mbili, kiasi cha token0 na token1 kinachowekwa au kutolewa ni sehemu ya tukio, pamoja na utambulisho wa akaunti iliyotuita (`sender`). Katika kesi ya uondoaji, tukio pia linajumuisha lengo lililopokea tokeni (`to`), ambalo linaweza lisiwe sawa na mtumaji.

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

Tukio hili hutolewa wakati mfanyabiashara anapobadilisha tokeni moja kwa nyingine. Tena, mtumaji na lengo huenda wasiwe sawa.
Kila tokeni inaweza kutumwa kwenye ubadilishanaji, au kupokelewa kutoka kwake.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Mwishowe, `Sync` hutolewa kila wakati tokeni zinapoongezwa au kutolewa, bila kujali sababu, ili kutoa taarifa za hivi karibuni za akiba (na kwa hivyo kiwango cha ubadilishanaji).

#### Kazi za Usanidi {#pair-setup}

Kazi hizi zinapaswa kuitwa mara moja wakati ubadilishanaji mpya wa jozi unapowekwa.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Kiunda huhakikisha tutafuatilia anwani ya kiwanda kilichounda jozi. Taarifa hii inahitajika kwa `initialize` na kwa ada ya kiwanda (ikiwa ipo)

```solidity
    // inaitwa mara moja na kiwanda wakati wa uwekaji
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // ukaguzi wa kutosha
        token0 = _token0;
        token1 = _token1;
    }
```

Kazi hii inaruhusu kiwanda (na kiwanda pekee) kubainisha tokeni mbili za ERC-20 ambazo jozi hii itabadilishana.

#### Kazi za Kusasisha za Ndani {#pair-update-internal}

##### \_update

```solidity
    // sasisha akiba na, kwa simu ya kwanza kwa kila kizuizi, vikusanya bei
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Kazi hii inaitwa kila wakati tokeni zinapowekwa au kutolewa.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Ikiwa ama balance0 au balance1 (uint256) ni ya juu kuliko uint112(-1) (=2^112-1) (hivyo inafurika na kurudi nyuma hadi 0 inapobadilishwa kuwa uint112) kataa kuendelea na \_update ili kuzuia kufurika. Kwa tokeni ya kawaida inayoweza kugawanywa katika vitengo 10^18, hii inamaanisha kila ubadilishanaji unazuiliwa kwa takriban 5.1\*10^15 ya kila tokeni. Hadi sasa hilo halijakuwa tatizo.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // kufurika kunatakikana
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Ikiwa muda uliopita sio sifuri, inamaanisha sisi ni muamala wa kwanza wa ubadilishanaji kwenye kizuizi hiki. Katika hali hiyo, tunahitaji kusasisha vikusanya gharama.

```solidity
            // * haifuriki kamwe, na + kufurika kunatakikana
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Kila kikusanya gharama husasishwa na gharama ya hivi karibuni (akiba ya tokeni nyingine/akiba ya tokeni hii) mara muda uliopita kwa sekunde. Ili kupata bei ya wastani, unasoma bei limbikizi katika pointi mbili kwa wakati na kugawanya kwa tofauti ya muda kati yao. Kwa mfano, fikiria mfuatano huu wa matukio:

| Tukio                                                                                            |                  reserve0 |                  reserve1 | muhuri wa muda | Kiwango cha ubadilishaji cha ukingoni (reserve1 / reserve0) |                                                       price0CumulativeLast |
| ------------------------------------------------------------------------------------------------ | ------------------------: | ------------------------: | -------------- | -----------------------------------------------------------------------------: | -------------------------------------------------------------------------: |
| Usanidi wa awali                                                                                 | 1,000.000 | 1,000.000 | 5,000          |                                                          1.000 |                                                                          0 |
| Mfanyabiashara A anaweka tokeni 50 za token0 na anapata tokeni 47.619 za token1  | 1,050.000 |   952.381 | 5,020          |                                                          0.907 |                                                                         20 |
| Mfanyabiashara B anaweka tokeni 10 za token0 na anapata tokeni 8.984 za token1   | 1,060.000 |   943.396 | 5,030          |                                                          0.890 |                       20+10\*0.907 = 29.07 |
| Mfanyabiashara C anaweka tokeni 40 za token0 na anapata tokeni 34.305 za token1  | 1,100.000 |   909.090 | 5,100          |                                                          0.826 |    29.07+70\*0.890 = 91.37 |
| Mfanyabiashara D anaweka tokeni 100 za token1 na anapata tokeni 109.01 za token0 |   990.990 | 1,009.090 | 5,110          |                                                          1.018 |    91.37+10\*0.826 = 99.63 |
| Mfanyabiashara E anaweka tokeni 10 za token0 na anapata tokeni 10.079 za token1  | 1,000.990 |   999.010 | 5,150          |                                                          0.998 | 99.63+40\*1.1018 = 143.702 |

Tuseme tunataka kuhesabu bei ya wastani ya **Token0** kati ya mihuri ya muda 5,030 na 5,150. Tofauti katika thamani ya `price0Cumulative` ni 143.702-29.07=114.632. Hii ni wastani kwa dakika mbili (sekunde 120). Kwa hivyo bei ya wastani ni 114.632/120 = 0.955.

Uhesabuji huu wa bei ndiyo sababu tunahitaji kujua ukubwa wa zamani wa akiba.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Mwishowe, sasisha vigezo vya kimataifa na toa tukio la `Sync`.

##### \_mintFee

```solidity
    // ikiwa ada imewashwa, zalisha ukwasi sawa na 1/6 ya ukuaji katika sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Katika Uniswap 2.0 wafanyabiashara hulipa ada ya 0.30% kutumia soko. Sehemu kubwa ya ada hiyo (0.25% ya biashara) huenda kwa watoa huduma za ukwasi. Asilimia 0.05 iliyobaki inaweza kwenda kwa watoa huduma za ukwasi au kwa anwani iliyobainishwa na kiwanda kama ada ya itifaki, ambayo hulipa Uniswap kwa juhudi zao za maendeleo.

Ili kupunguza mahesabu (na kwa hivyo gharama za gesi), ada hii inahesabiwa tu wakati ukwasi unapoongezwa au kuondolewa kwenye bwawa, badala ya kila muamala.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Soma lengo la ada la kiwanda. Ikiwa ni sifuri basi hakuna ada ya itifaki na hakuna haja ya kuhesabu ada hiyo.

```solidity
        uint _kLast = kLast; // akiba ya gesi
```

Kigezo cha hali cha `kLast` kiko kwenye hifadhi, kwa hivyo kitakuwa na thamani kati ya simu tofauti kwa mkataba.
Upatikanaji wa hifadhi ni ghali zaidi kuliko upatikanaji wa kumbukumbu tete inayotolewa wakati simu ya kazi kwa mkataba inapoisha, kwa hivyo tunatumia kigezo cha ndani kuokoa gesi.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Watoa huduma za ukwasi wanapata sehemu yao kwa kuongezeka kwa thamani ya tokeni zao za ukwasi. Lakini ada ya itifaki inahitaji tokeni mpya za ukwasi kuzalishwa na kutolewa kwa anwani ya `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Ikiwa kuna ukwasi mpya wa kukusanya ada ya itifaki. Unaweza kuona kazi ya kipeo cha pili [baadaye katika makala haya](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Hesabu hii ngumu ya ada imeelezwa katika [waraka rasmi](https://app.uniswap.org/whitepaper.pdf) kwenye ukurasa wa 5. Tunajua kuwa kati ya wakati `kLast` ilipohesabiwa na sasa hakuna ukwasi ulioongezwa au kuondolewa (kwa sababu tunaendesha hesabu hii kila wakati ukwasi unapoongezwa au kuondolewa, kabla haujabadilika), kwa hivyo mabadiliko yoyote katika `reserve0 * reserve1` lazima yatoke kwenye ada za muamala (bila hizo tungehifadhi `reserve0 * reserve1` kuwa thabiti).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Tumia kazi ya `UniswapV2ERC20._mint` kuunda tokeni za ziada za ukwasi na kuzipa kwa `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Ikiwa hakuna ada weka `kLast` kuwa sifuri (ikiwa tayari si hivyo). Wakati mkataba huu ulipoandikwa kulikuwa na [kipengele cha kurejesha gesi](https://eips.ethereum.org/EIPS/eip-3298) ambacho kilihimiza mikataba kupunguza ukubwa wa jumla wa hali ya Ethereum kwa kuweka sifuri kwenye hifadhi ambayo hawakuihitaji.
Msimbo huu unapata urejeshaji huo inapowezekana.

#### Kazi Zinazoweza Kufikiwa Nje {#pair-external}

Kumbuka kuwa ingawa muamala au mkataba wowote _unaweza_ kuita kazi hizi, zimeundwa kuitwa kutoka kwa mkataba wa pembeni. Ukiziita moja kwa moja huwezi kudanganya ubadilishaji wa jozi, lakini unaweza kupoteza thamani kwa kosa.

##### zalisha

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwa mkataba unaofanya ukaguzi muhimu wa usalama
    function mint(address to) external lock returns (uint liquidity) {
```

Kazi hii inaitwa wakati mtoa huduma wa ukwasi anapoongeza ukwasi kwenye bwawa. Inazalisha tokeni za ziada za ukwasi kama tuzo. Inapaswa kuitwa kutoka kwa [mkataba wa pembeni](#UniswapV2Router02) unaoiita baada ya kuongeza ukwasi katika muamala mmoja (ili hakuna mtu mwingine atakayeweza kuwasilisha muamala unaodai ukwasi mpya kabla ya mmiliki halali).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // akiba ya gesi
```

Hii ndiyo njia ya kusoma matokeo ya kazi ya Solidity inayorudisha thamani nyingi. Tunatupa thamani za mwisho zilizorejeshwa, muhuri wa muda wa kizuizi, kwa sababu hatuihitaji.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Pata salio za sasa na uone ni kiasi gani kimeongezwa cha kila aina ya tokeni.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Hesabu ada za itifaki za kukusanya, ikiwa zipo, na uzalishe tokeni za ukwasi ipasavyo. Kwa sababu vigezo vya `_mintFee` ni thamani za zamani za akiba, ada inahesabiwa kwa usahihi kulingana na mabadiliko ya bwawa kutokana na ada.

```solidity
        uint _totalSupply = totalSupply; // akiba ya gesi, lazima ifafanuliwe hapa kwani totalSupply inaweza kusasishwa katika _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // funga kabisa tokeni za kwanza za MINIMUM_LIQUIDITY
```

Ikiwa hii ni amana ya kwanza, tengeneza tokeni `MINIMUM_LIQUIDITY` na uzitume kwa anwani sifuri ili kuzifunga. Hazitakombolewa kamwe, ambayo inamaanisha bwawa halitawahi kumwagika kabisa (hii inatuokoa kutokana na kugawanya kwa sifuri katika baadhi ya maeneo). Thamani ya `MINIMUM_LIQUIDITY` ni elfu moja, ambayo kwa kuzingatia tokeni nyingi za ERC-20 zimegawanywa katika vitengo vya 10^-18 vya tokeni, kama ETH inavyogawanywa kuwa wei, ni 10^-15 kwa thamani ya tokeni moja. Sio gharama kubwa.

Wakati wa amana ya kwanza hatujui thamani linganishi ya tokeni mbili, kwa hivyo tunazidisha kiasi na kuchukua mzizi wa mraba, tukichukulia kwamba amana inatupatia thamani sawa katika tokeni zote mbili.

Tunaweza kuamini hii kwa sababu ni kwa manufaa ya mweka amana kutoa thamani sawa, ili kuepuka kupoteza thamani kwa usuluhishi.
Tuseme kwamba thamani ya tokeni mbili ni sawa, lakini mweka amana wetu aliweka mara nne zaidi ya **Token1** kuliko **Token0**. Mfanyabiashara anaweza kutumia ukweli kwamba ubadilishaji wa jozi unafikiri kwamba **Token0** ina thamani zaidi ili kutoa thamani kutoka humo.

| Tukio                                                                          | reserve0 | reserve1 | reserve0 \* reserve1 | Thamani ya bwawa (reserve0 + reserve1) |
| ------------------------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------------------------: |
| Usanidi wa awali                                                               |        8 |       32 |                  256 |                                                        40 |
| Mfanyabiashara anaweka tokeni 8 za **Token0**, anapata tokeni 16 za **Token1** |       16 |       16 |                  256 |                                                        32 |

Kama unavyoona, mfanyabiashara alipata tokeni 8 za ziada, ambazo zinatokana na kupungua kwa thamani ya bwawa, na kumuumiza mweka amana anayemiliki.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Kwa kila amana inayofuata tayari tunajua kiwango cha ubadilishanaji kati ya mali mbili, na tunatarajia watoa huduma za ukwasi kutoa thamani sawa katika zote mbili. Ikiwa hawafanyi hivyo, tunawapa tokeni za ukwasi kulingana na thamani ndogo waliyotoa kama adhabu.

Iwe ni amana ya awali au inayofuata, idadi ya tokeni za ukwasi tunazotoa ni sawa na mzizi wa mraba wa mabadiliko katika `reserve0*reserve1` na thamani ya tokeni ya ukwasi haibadiliki (isipokuwa tupate amana ambayo haina thamani sawa za aina zote mbili, katika hali hiyo "faini" inasambazwa). Huu ni mfano mwingine na tokeni mbili ambazo zina thamani sawa, na amana tatu nzuri na moja mbaya (amana ya aina moja tu ya tokeni, kwa hivyo haitoi tokeni za ukwasi).

| Tukio                        |                                reserve0 |                                reserve1 | reserve0 \* reserve1 | Thamani ya bwawa (reserve0 + reserve1) | Tokeni za ukwasi zilizozalishwa kwa amana hii | Jumla ya tokeni za ukwasi |       thamani ya kila tokeni ya ukwasi |
| ---------------------------- | --------------------------------------: | --------------------------------------: | -------------------: | --------------------------------------------------------: | --------------------------------------------: | ------------------------: | -------------------------------------: |
| Usanidi wa awali             |                   8.000 |                   8.000 |                   64 |                                    16.000 |                                             8 |                         8 |                  2.000 |
| Weka aina nne za kila moja   |                  12.000 |                  12.000 |                  144 |                                    24.000 |                                             4 |                        12 |                  2.000 |
| Weka aina mbili za kila moja |                  14.000 |                  14.000 |                  196 |                                    28.000 |                                             2 |                        14 |                  2.000 |
| Amana ya thamani isiyo sawa  |                  18.000 |                  14.000 |                  252 |                                    32.000 |                                             0 |                        14 | ~2.286 |
| Baada ya usuluhishi          | ~15.874 | ~15.874 |                  252 |                   ~31.748 |                                             0 |                        14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Tumia kazi ya `UniswapV2ERC20._mint` kuunda tokeni za ziada za ukwasi na kuzipa kwa akaunti sahihi.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 na reserve1 zimesasishwa
        emit Mint(msg.sender, amount0, amount1);
    }
```

Sasisha vigezo vya hali (`reserve0`, `reserve1`, na ikihitajika `kLast`) na toa tukio linalofaa.

##### ondoa

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwa mkataba unaofanya ukaguzi muhimu wa usalama
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Kazi hii inaitwa wakati ukwasi unapoondolewa na tokeni zinazofaa za ukwasi zinahitaji kuondolewa.
Inapaswa pia kuitwa [kutoka kwa akaunti ya pembeni](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // akiba ya gesi
        address _token0 = token0;                                // akiba ya gesi
        address _token1 = token1;                                // akiba ya gesi
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Mkataba wa pembeni ulihamisha ukwasi wa kuondolewa kwenye mkataba huu kabla ya simu. Kwa njia hiyo tunajua ni kiasi gani cha ukwasi cha kuondoa, na tunaweza kuhakikisha kuwa kinaondolewa.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // akiba ya gesi, lazima ifafanuliwe hapa kwani totalSupply inaweza kusasishwa katika _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // kutumia salio huhakikisha usambazaji wa pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // kutumia salio huhakikisha usambazaji wa pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Mtoa huduma wa ukwasi anapokea thamani sawa ya tokeni zote mbili. Kwa njia hii hatubadilishi kiwango cha ubadilishanaji.

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

Sehemu iliyobaki ya kazi ya `burn` ni kioo cha kazi ya `mint` hapo juu.

##### badilisha

```solidity
    // kazi hii ya kiwango cha chini inapaswa kuitwa kutoka kwa mkataba unaofanya ukaguzi muhimu wa usalama
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Kazi hii pia inapaswa kuitwa kutoka kwa [mkataba wa pembeni](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // akiba ya gesi
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // wigo kwa _token{0,1}, huepuka makosa ya rundo kuwa kina sana
```

Vigezo vya ndani vinaweza kuhifadhiwa ama kwenye kumbukumbu au, ikiwa si vingi sana, moja kwa moja kwenye rundo.
Ikiwa tunaweza kupunguza idadi ili tutumie rundo tunatumia gesi kidogo. Kwa maelezo zaidi angalia [waraka wa njano, maelezo rasmi ya Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), uk. 26, mlinganyo wa 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // hamisha tokeni kwa matumaini
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // hamisha tokeni kwa matumaini
```

Uhamisho huu ni wa matumaini, kwa sababu tunahamisha kabla ya kuwa na uhakika masharti yote yametimizwa. Hii ni sawa katika Ethereum kwa sababu ikiwa masharti hayajatimizwa baadaye katika simu tutarejesha kutoka humo na mabadiliko yoyote iliyoyatengeneza.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Mjulishe mpokeaji kuhusu ubadilishaji ikiwa imeombwa.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Pata salio za sasa. Mkataba wa pembeni hututumia tokeni kabla ya kutuita kwa ubadilishaji. Hii inarahisisha mkataba kuangalia kwamba haufanyiwi udanganyifu, ukaguzi ambao _lazima_ utokee katika mkataba wa msingi (kwa sababu tunaweza kuitwa na vyombo vingine isipokuwa mkataba wetu wa pembeni).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // wigo kwa reserve{0,1}Adjusted, huepuka makosa ya rundo kuwa kina sana
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Huu ni ukaguzi wa busara ili kuhakikisha hatupotezi kutokana na ubadilishaji. Hakuna hali yoyote ambayo ubadilishaji unapaswa kupunguza `reserve0*reserve1`. Hapa pia ndipo tunahakikisha ada ya 0.3% inatumwa kwenye ubadilishaji; kabla ya kuangalia thamani ya K, tunazidisha salio zote mbili kwa 1000 kutoa kiasi kilichozidishwa na 3, hii inamaanisha 0.3% (3/1000 = 0.003 = 0.3%) inakatwa kutoka kwa salio kabla ya kulinganisha thamani yake ya K na thamani ya K ya akiba ya sasa.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Sasisha `reserve0` na `reserve1`, na ikihitajika vikusanya bei na mhuri wa muda na toa tukio.

##### Sawazisha au Punguza

Inawezekana kwa salio halisi kupoteza usawazisho na akiba ambayo ubadilishaji wa jozi unafikiri inayo.
Hakuna njia ya kutoa tokeni bila idhini ya mkataba, lakini amana ni jambo tofauti. Akaunti inaweza kuhamisha tokeni kwenye ubadilishanaji bila kuita `mint` au `swap`.

Katika hali hiyo kuna suluhisho mbili:

- `sync`, sasisha akiba kwa salio za sasa
- `skim`, toa kiasi cha ziada. Kumbuka kuwa akaunti yoyote inaruhusiwa kuita `skim` kwa sababu hatujui ni nani aliyeweka tokeni. Taarifa hii inatolewa katika tukio, lakini matukio hayapatikani kutoka kwenye mnyororo wa bloku.

```solidity
    // lazimisha salio kulingana na akiba
    function skim(address to) external lock {
        address _token0 = token0; // akiba ya gesi
        address _token1 = token1; // akiba ya gesi
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // lazimisha akiba kulingana na salio
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) unaunda ubadilishanaji wa jozi.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Vigezo hivi vya hali ni muhimu kutekeleza ada ya itifaki (tazama [waraka rasmi](https://app.uniswap.org/whitepaper.pdf), uk. 5).
Anwani ya `feeTo` inakusanya tokeni za ukwasi kwa ada ya itifaki, na `feeToSetter` ni anwani inayoruhusiwa kubadilisha `feeTo` kuwa anwani tofauti.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Vigezo hivi vinafuatilia jozi, ubadilishanaji kati ya aina mbili za tokeni.

Ya kwanza, `getPair`, ni ramani inayotambua mkataba wa ubadilishanaji wa jozi kulingana na tokeni mbili za ERC-20 inazobadilisha. Tokeni za ERC-20 zinatambuliwa na anwani za mikataba inayozitekeleza, kwa hivyo funguo na thamani zote ni anwani. Ili kupata anwani ya ubadilishanaji wa jozi unaokuruhusu kubadilisha kutoka `tokenA` kwenda `tokenB`, unatumia `getPair[<anwani ya tokenA>][<anwani ya tokenB>]` (au kinyume chake).

Kigezo cha pili, `allPairs`, ni safu inayojumuisha anwani zote za ubadilishanaji wa jozi zilizoundwa na kiwanda hiki. Katika Ethereum huwezi kurudia juu ya yaliyomo kwenye ramani, au kupata orodha ya funguo zote, kwa hivyo kigezo hiki ndiyo njia pekee ya kujua ni ubadilishanaji gani kiwanda hiki kinasimamia.

Kumbuka: Sababu huwezi kurudia juu ya funguo zote za ramani ni kwamba hifadhi ya data ya mkataba ni _ghali_, kwa hivyo kadiri tunavyotumia kidogo ndivyo bora, na kadiri tunavyoibadilisha mara chache ndivyo bora. Unaweza kuunda [ramani zinazounga mkono urudiaji](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), lakini zinahitaji hifadhi ya ziada kwa orodha ya funguo. Katika programu nyingi hauitaji hiyo.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Tukio hili hutolewa wakati ubadilishanaji mpya wa jozi unapoundwa. Inajumuisha anwani za tokeni, anwani ya ubadilishanaji wa jozi, na idadi jumla ya ubadilishanaji unaosimamiwa na kiwanda.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Kitu pekee ambacho kiunda hufanya ni kubainisha `feeToSetter`. Viwanda huanza bila ada, na ni `feeSetter` pekee anayeweza kubadilisha hilo.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Kazi hii inarudisha idadi ya jozi za ubadilishanaji.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Hii ndiyo kazi kuu ya kiwanda, kuunda ubadilishanaji wa jozi kati ya tokeni mbili za ERC-20. Kumbuka kuwa mtu yeyote anaweza kuita kazi hii. Hauhitaji ruhusa kutoka kwa Uniswap kuunda ubadilishanaji mpya wa jozi.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Tunataka anwani ya ubadilishanaji mpya iwe ya uhakika, ili iweze kuhesabiwa mapema nje ya mnyororo (hii inaweza kuwa muhimu kwa [mikataba ya Layer 2](/developers/docs/scaling/)).
Ili kufanya hivi tunahitaji kuwa na mpangilio thabiti wa anwani za tokeni, bila kujali mpangilio tuliopokea, kwa hivyo tunazipanga hapa.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // ukaguzi mmoja unatosha
```

Mabwawa makubwa ya ukwasi ni bora kuliko madogo, kwa sababu yana bei thabiti zaidi. Hatutaki kuwa na bwawa zaidi ya moja la ukwasi kwa kila jozi ya tokeni. Ikiwa tayari kuna ubadilishanaji, hakuna haja ya kuunda mwingine kwa jozi hiyo hiyo.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Ili kuunda mkataba mpya tunahitaji msimbo unaouunda (kazi ya kiunda na msimbo unaoandika kwenye kumbukumbu msimbo wa EVM wa mkataba halisi). Kawaida katika Solidity tunatumia `addr = new <jina la mkataba>(<vigezo vya kiunda>)` na mkusanyaji hushughulikia kila kitu kwetu, lakini ili kuwa na anwani ya mkataba ya uhakika tunahitaji kutumia [opcode ya CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Wakati msimbo huu ulipoandikwa opcode hiyo bado haikuwa ikiungwa mkono na Solidity, kwa hivyo ilikuwa muhimu kupata msimbo kwa mikono. Hili si tatizo tena, kwa sababu [Solidity sasa inasaidia CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Wakati opcode haijaungwa mkono na Solidity bado tunaweza kuiita kwa kutumia [mkusanyiko wa ndani](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Piga simu kazi ya `initialize` ili kuuambia ubadilishanaji mpya ni tokeni gani mbili inazobadilisha.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // jaza ramani kwa upande wa nyuma
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Hifadhi taarifa mpya ya jozi katika vigezo vya hali na toa tukio la kuujulisha ulimwengu kuhusu ubadilishanaji mpya wa jozi.

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

Kazi hizi mbili huruhusu `feeSetter` kudhibiti mpokeaji wa ada (ikiwepo), na kubadilisha `feeSetter` kuwa anwani mpya.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) unatekeleza tokeni ya ukwasi ya ERC-20. Ni sawa na [mkataba wa OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code), kwa hivyo nitaelezea tu sehemu iliyo tofauti, utendaji wa `permit`.

Miamala kwenye Ethereum hugharimu ether (ETH), ambayo ni sawa na pesa halisi. Ikiwa una tokeni za ERC-20 lakini huna ETH, huwezi kutuma miamala, kwa hivyo huwezi kufanya chochote nazo. Suluhisho moja la kuepuka tatizo hili ni [miamala-meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Mmiliki wa tokeni husaini muamala unaoruhusu mtu mwingine kutoa tokeni nje ya mnyororo na kuutuma kwa kutumia intaneti kwa mpokeaji. Mpokeaji, ambaye ana ETH, kisha huwasilisha kibali kwa niaba ya mmiliki.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Hashi hii ni [kitambulisho cha aina ya muamala](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Ile pekee tunayoiunga mkono hapa ni `Permit` na vigezo hivi.

```solidity
    mapping(address => uint) public nonces;
```

Haiwezekani kwa mpokeaji kughushi sahihi ya dijitali. Hata hivyo, ni rahisi kutuma muamala huo mara mbili (hii ni aina ya [shambulio la kurudia](https://wikipedia.org/wiki/Replay_attack)). Ili kuzuia hili, tunatumia [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Ikiwa nonce ya `Permit` mpya si moja zaidi ya ile ya mwisho iliyotumika, tunadhania ni batili.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Huu ni msimbo wa kupata [kitambulisho cha mnyororo](https://chainid.network/). Inatumia lahaja ya mkusanyiko wa EVM inayoitwa [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Kumbuka kuwa katika toleo la sasa la Yul unapaswa kutumia `chainid()`, si `chainid`.

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

Hesabu [kitenganishi cha kikoa](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) kwa EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Hii ndiyo kazi inayotekeleza vibali. Inapokea kama vigezo nyanja husika, na thamani tatu za scalar kwa [sahihi](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, na s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Usikubali miamala baada ya muda wa mwisho.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` ni ujumbe tunaotarajia kupata. Tunajua nonce inapaswa kuwa nini, kwa hivyo hakuna haja ya kuipata kama kigezo.

Algorithm ya sahihi ya Ethereum inatarajia kupata biti 256 za kusaini, kwa hivyo tunatumia kazi ya hashi ya `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Kutoka kwenye digest na sahihi tunaweza kupata anwani iliyoisaini kwa kutumia [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Ikiwa kila kitu kiko sawa, chukulia hii kama [idhinisho la ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Mikataba ya Pembeni {#periphery-contracts}

Mikataba ya pembeni ni API (kiolesura cha programu) kwa Uniswap. Zinapatikana kwa simu za nje, ama kutoka kwa mikataba mingine au mfumo uliotawanywa. Unaweza kuita mikataba ya msingi moja kwa moja, lakini hiyo ni ngumu zaidi na unaweza kupoteza thamani ukifanya kosa. Mikataba ya msingi ina majaribio tu ya kuhakikisha haifanyiwi udanganyifu, sio ukaguzi wa busara kwa mtu mwingine yeyote. Hayo yako kwenye pembeni ili yaweze kusasishwa kama inavyohitajika.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Mkataba huu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) una matatizo, na [haupaswi kutumika tena](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Kwa bahati nzuri, mikataba ya pembeni haina hali na haishikili mali yoyote, kwa hivyo ni rahisi kuiondoa na kupendekeza watu watumie mbadala, `UniswapV2Router02`, badala yake.

### UniswapV2Router02.sol {#UniswapV2Router02}

Katika hali nyingi utatumia Uniswap kupitia [mkataba huu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Unaweza kuona jinsi ya kuitumia [hapa](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

Mengi ya haya tumeyakuta hapo awali, au ni dhahiri kabisa. Ubaguzi mmoja ni `IWETH.sol`. Uniswap v2 inaruhusu ubadilishanaji kwa jozi yoyote ya tokeni za ERC-20, lakini ether (ETH) yenyewe si tokeni ya ERC-20. Ilikuwepo kabla ya kiwango hicho na inahamishwa kwa mifumo ya kipekee. Ili kuwezesha matumizi ya ETH katika mikataba inayotumika kwa tokeni za ERC-20 watu walikuja na mkataba wa [ether iliyofungwa (WETH)](https://weth.tkn.eth.limo/). Unatuma ETH kwa mkataba huu, na inakuzalishia kiasi sawa cha WETH. Au unaweza kuondoa WETH, na kupata ETH tena.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Router inahitaji kujua ni kiwanda gani cha kutumia, na kwa miamala inayohitaji WETH ni mkataba gani wa WETH wa kutumia. Thamani hizi [hazibadiliki](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), ikimaanisha zinaweza kuwekwa tu katika kiunda. Hii inawapa watumiaji ujasiri kwamba hakuna mtu atakayeweza kuzibadilisha ili zielekeze kwenye mikataba isiyo ya uaminifu.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Kirekebishaji hiki huhakikisha kuwa miamala yenye kikomo cha muda ("fanya X kabla ya muda Y ukiweza") haifanyiki baada ya kikomo chao cha muda.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Kiunda huweka tu vigezo vya hali visivyobadilika.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // kubali ETH tu kupitia fallback kutoka kwa mkataba wa WETH
    }
```

Kazi hii inaitwa tunapokomboa tokeni kutoka kwa mkataba wa WETH kurudi kuwa ETH. Mkataba wa WETH pekee tunaotumia ndio umeruhusiwa kufanya hivyo.

#### Ongeza Ukwasi {#add-liquidity}

Kazi hizi huongeza tokeni kwenye ubadilishanaji wa jozi, ambayo huongeza bwawa la ukwasi.

```solidity

    // **** ONGEZA UKWASI ****
    function _addLiquidity(
```

Kazi hii inatumika kuhesabu kiasi cha tokeni A na B ambazo zinapaswa kuwekwa kwenye ubadilishanaji wa jozi.

```solidity
        address tokenA,
        address tokenB,
```

Hizi ni anwani za mikataba ya tokeni za ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Hivi ni viwango ambavyo mtoa huduma wa ukwasi anataka kuweka. Pia ni viwango vya juu vya A na B vitakavyowekwa.

```solidity
        uint amountAMin,
        uint amountBMin
```

Hivi ni viwango vya chini vinavyokubalika vya kuweka. Ikiwa muamala hauwezi kufanyika kwa viwango hivi au zaidi, rejesha kutoka humo. Ikiwa hutaki kipengele hiki, weka sifuri.

Watoa huduma za ukwasi huweka kiwango cha chini, kwa kawaida, kwa sababu wanataka kupunguza muamala kwa kiwango cha ubadilishanaji kilicho karibu na cha sasa. Ikiwa kiwango cha ubadilishanaji kinabadilika sana inaweza kumaanisha habari zinazobadilisha thamani za msingi, na wanataka kuamua wenyewe nini cha kufanya.

Kwa mfano, fikiria kesi ambapo kiwango cha ubadilishanaji ni moja kwa moja na mtoa huduma wa ukwasi anaweka thamani hizi:

| Kigezo         | Thamani |
| -------------- | ------: |
| amountADesired |    1000 |
| amountBDesired |    1000 |
| amountAMin     |     900 |
| amountBMin     |     800 |

Muda wote kiwango cha ubadilishanaji kinapobaki kati ya 0.9 na 1.25, muamala hufanyika. Ikiwa kiwango cha ubadilishanaji kinatoka nje ya masafa hayo, muamala hughairishwa.

Sababu ya tahadhari hii ni kwamba miamala si ya papo hapo, unaiwasilisha na hatimaye mthibitishaji ataijumuisha kwenye kizuizi (isipokuwa bei yako ya gesi ni ya chini sana, katika hali hiyo utahitaji kuwasilisha muamala mwingine na nonce sawa na bei ya juu ya gesi ili kuibatilisha). Huwezi kudhibiti kinachotokea wakati wa muda kati ya uwasilishaji na ujumuishaji.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Kazi inarudisha viwango ambavyo mtoa huduma wa ukwasi anapaswa kuweka ili kuwa na uwiano sawa na uwiano wa sasa kati ya akiba.

```solidity
        // unda jozi ikiwa bado haipo
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Ikiwa hakuna ubadilishanaji wa jozi hii ya tokeni bado, uunde.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Pata akiba za sasa katika jozi.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Ikiwa akiba za sasa ni tupu basi huu ni ubadilishanaji mpya wa jozi. Viwango vitakavyowekwa vinapaswa kuwa sawa kabisa na vile ambavyo mtoa huduma wa ukwasi anataka kutoa.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Ikiwa tunahitaji kuona viwango vitakavyokuwa, tunapata kiwango bora kwa kutumia [kazi hii](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Tunataka uwiano sawa na akiba za sasa.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Ikiwa `amountBOptimal` ni ndogo kuliko kiwango ambacho mtoa huduma wa ukwasi anataka kuweka inamaanisha tokeni B ina thamani zaidi kwa sasa kuliko mweka amana wa ukwasi anavyofikiri, kwa hivyo kiwango kidogo kinahitajika.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Ikiwa kiwango bora cha B ni zaidi ya kiwango kinachotakiwa cha B inamaanisha tokeni za B zina thamani ndogo kwa sasa kuliko mweka amana wa ukwasi anavyofikiri, kwa hivyo kiwango cha juu kinahitajika. Hata hivyo, kiwango kinachotakiwa ni cha juu, kwa hivyo hatuwezi kufanya hivyo. Badala yake tunahesabu idadi bora ya tokeni A kwa kiwango kinachotakiwa cha tokeni B.

Tukiweka yote pamoja tunapata grafu hii. Fikiria unajaribu kuweka tokeni elfu moja za A (mstari wa bluu) na tokeni elfu moja za B (mstari mwekundu). Mhimili wa x ni kiwango cha ubadilishanaji, A/B. Ikiwa x=1, zina thamani sawa na unaweka elfu moja ya kila moja. Ikiwa x=2, A ina thamani mara mbili ya B (unapata tokeni mbili za B kwa kila tokeni A) kwa hivyo unaweka tokeni elfu moja za B, lakini tokeni 500 tu za A. Ikiwa x=0.5, hali inabadilika, tokeni elfu moja za A na tokeni mia tano za B.

![Grafu](liquidityProviderDeposit.png)

Unaweza kuweka ukwasi moja kwa moja kwenye mkataba wa msingi (kwa kutumia [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), lakini mkataba wa msingi huangalia tu kwamba haufanyiwi udanganyifu, kwa hivyo una hatari ya kupoteza thamani ikiwa kiwango cha ubadilishanaji kinabadilika kati ya wakati unapowasilisha muamala wako na wakati unapotekelezwa. Ikiwa unatumia mkataba wa pembeni, huhesabu kiwango unachopaswa kuweka na kukiweka mara moja, kwa hivyo kiwango cha ubadilishanaji hakibadiliki na hupotezi chochote.

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

Kazi hii inaweza kuitwa na muamala ili kuweka ukwasi. Vigezo vingi ni sawa na katika `_addLiquidity` hapo juu, isipokuwa mbili:

. `to` ni anwani inayopata tokeni mpya za ukwasi zilizozalishwa kuonyesha sehemu ya mtoa huduma wa ukwasi ya bwawa
. `deadline` ni kikomo cha muda kwenye muamala

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Tunahesabu kiasi cha kuweka halisi na kisha kupata anwani ya bwawa la ukwasi. Ili kuokoa gesi hatufanyi hivi kwa kuuliza kiwanda, lakini kwa kutumia kazi ya maktaba `pairFor` (tazama hapa chini katika maktaba)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Hamisha kiasi sahihi cha tokeni kutoka kwa mtumiaji hadi kwenye ubadilishanaji wa jozi.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
```

Kwa malipo, mpe anwani ya `to` tokeni za ukwasi kwa umiliki wa sehemu ya bwawa. Kazi ya `mint` ya mkataba wa msingi huona ni tokeni ngapi za ziada inazo (ikilinganishwa na ilivyokuwa mara ya mwisho ukwasi ulipobadilika) na inazalisha ukwasi ipasavyo.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Wakati mtoa huduma wa ukwasi anapotaka kutoa ukwasi kwa ubadilishanaji wa jozi ya Token/ETH, kuna tofauti chache. Mkataba hushughulikia kufunga ETH kwa ajili ya mtoa huduma wa ukwasi. Hakuna haja ya kubainisha ni ETH ngapi mtumiaji anataka kuweka, kwa sababu mtumiaji huwatuma tu na muamala (kiasi kinapatikana katika `msg.value`).

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

Ili kuweka ETH, mkataba kwanza huifunga kuwa WETH na kisha huhamisha WETH kwenye jozi. Ona kuwa uhamisho umefungwa kwenye `assert`. Hii inamaanisha kuwa ikiwa uhamisho utashindwa, simu hii ya mkataba pia itashindwa, na kwa hivyo ufungaji hautatokea.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // rudisha vumbi la eth, ikiwapo
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Mtumiaji tayari ametutumia ETH, kwa hivyo ikiwa kuna ziada yoyote iliyobaki (kwa sababu tokeni nyingine ina thamani ndogo kuliko mtumiaji alivyofikiria), tunahitaji kurejesha pesa.

#### Ondoa Ukwasi {#remove-liquidity}

Kazi hizi zitaondoa ukwasi na kumlipa mtoa huduma wa ukwasi.

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

Kesi rahisi zaidi ya kuondoa ukwasi. Kuna kiasi cha chini cha kila tokeni ambacho mtoa huduma wa ukwasi anakubali kupokea, na lazima itokee kabla ya muda wa mwisho.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // tuma ukwasi kwenye jozi
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Kazi ya `burn` ya mkataba wa msingi inashughulikia kumlipa mtumiaji tokeni.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Wakati kazi inaporudisha thamani nyingi, lakini tunavutiwa na baadhi tu, hivi ndivyo tunavyopata thamani hizo tu. Ni nafuu kidogo kwa gharama ya gesi kuliko kusoma thamani na kutoitumia.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Tafsiri viwango kutoka jinsi mkataba wa msingi unavyovirudisha (tokeni ya anwani ya chini kwanza) hadi jinsi mtumiaji anavyotarajia (sawa na `tokenA` na `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Ni sawa kufanya uhamisho kwanza na kisha kuthibitisha ni halali, kwa sababu ikiwa si hivyo tutarejesha kutoka kwa mabadiliko yote ya hali.

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

Kuondoa ukwasi kwa ETH ni karibu sawa, isipokuwa kwamba tunapokea tokeni za WETH na kisha kuzikomboa kwa ETH ili kumrudishia mtoa huduma wa ukwasi.

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

Kazi hizi huwasilisha miamala-meta ili kuruhusu watumiaji wasio na ether kutoa kutoka kwenye bwawa, kwa kutumia [mfumo wa kibali](#UniswapV2ERC20).

```solidity

    // **** ONDOA UKWASI (kuunga mkono tokeni za ada-kwa-uhamisho) ****
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

Kazi hii inaweza kutumika kwa tokeni ambazo zina ada za uhamisho au hifadhi. Wakati tokeni ina ada kama hizo hatuwezi kutegemea kazi ya `removeLiquidity` kutuambia ni kiasi gani cha tokeni tunachopata, kwa hivyo tunahitaji kutoa kwanza na kisha kupata salio.

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

Shughuli ya mwisho inaunganisha ada za ghala na shughuli za meta.

#### Fanya biashara {#trade}

```solidity
    // **** BADILISHA ****
    // inahitaji kiasi cha awali kuwa tayari kimetumwa kwa jozi ya kwanza
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Shughuli hii hufanya uchakataji wa ndani ambao unahitajika kwa shughuli zinazoonyeshwa kwa wafanyabiashara.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Ninapoandika hivi, kuna [tokeni 388,160 za ERC-20](https://eth.blockscout.com/tokens). Ikiwa kungekuwa na ubadilishanaji wa jozi kwa kila jozi ya tokeni, kungekuwa na zaidi ya ubadilishanaji wa jozi bilioni 150. Mnyororo mzima, kwa sasa, [una akaunti 0.1% tu ya idadi hiyo](https://eth.blockscout.com/stats/accountsGrowth). Badala yake, shughuli za ubadilishaji zinasaidia dhana ya njia. Mfanyabiashara anaweza kubadilisha A kwa B, B kwa C, na C kwa D, kwa hivyo hakuna haja ya ubadilishanaji wa moja kwa moja wa jozi ya A-D.

Bei kwenye masoko haya huwa zinasawazishwa, kwa sababu zinapokuwa hazijasawazishwa, inaunda fursa ya upatanishi. Fikiria, kwa mfano, tokeni tatu, A, B, na C. Kuna ubadilishanaji wa jozi tatu, moja kwa kila jozi.

1. Hali ya awali
2. Mfanyabiashara anauza tokeni 24.695 za A na anapata tokeni 25.305 za B.
3. Mfanyabiashara anauza tokeni 24.695 za B kwa tokeni 25.305 za C, akihifadhi takriban tokeni 0.61 za B kama faida.
4. Kisha mfanyabiashara anauza tokeni 24.695 za C kwa tokeni 25.305 za A, akihifadhi takriban tokeni 0.61 za C kama faida. Mfanyabiashara pia ana tokeni za ziada 0.61 za A (tokeni 25.305 anazopata mwishoni, ukitoa uwekezaji wa awali wa 24.695).

| Hatua | Ubadilishanaji wa A-B                                                                       | Ubadilishanaji wa B-C                                                                       | Ubadilishanaji wa A-C                                                                       |
| ----- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1     | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2     | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
| 4     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Pata jozi tunayoishughulikia sasa, ipange (kwa matumizi na jozi hiyo) na upate kiasi kinachotarajiwa cha matokeo.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Pata kiasi kinachotarajiwa, kikiwa kimepangwa jinsi ubadilishanaji wa jozi unavyotarajia.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Je, huu ndio ubadilishanaji wa mwisho? Ikiwa ndivyo, tuma tokeni zilizopokelewa kwa ajili ya biashara hiyo kwenye eneo linalolengwa. Ikiwa sivyo, itume kwenye ubadilishanaji wa jozi unaofuata.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Ita shughuli ya ubadilishanaji wa jozi ili kubadilisha tokeni. Hatuhitaji kurudishiwa taarifa kuhusu ubadilishanaji, kwa hivyo hatutumi baiti zozote katika sehemu hiyo.

```solidity
    function swapExactTokensForTokens(
```

Shughuli hii hutumiwa moja kwa moja na wafanyabiashara kubadilisha tokeni moja kwa nyingine.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Kigezo hiki kina anwani za mikataba ya ERC-20. Kama ilivyoelezwa hapo juu, hii ni safu kwa sababu unaweza kuhitaji kupitia ubadilishanaji kadhaa wa jozi ili kutoka kwenye rasilimali uliyonayo hadi rasilimali unayoitaka.

Kigezo cha shughuli katika Solidity kinaweza kuhifadhiwa aidha katika `memory` au `calldata`. Ikiwa shughuli ni sehemu ya kuingilia kwenye mkataba, inayoitwa moja kwa moja kutoka kwa mtumiaji (kwa kutumia muamala) au kutoka kwa mkataba tofauti, basi thamani ya kigezo inaweza kuchukuliwa moja kwa moja kutoka kwa data ya wito. Ikiwa shughuli inaitwa ndani, kama `_swap` hapo juu, basi vigezo vinapaswa kuhifadhiwa katika `memory`. Kwa mtazamo wa mkataba unaoitwa, `calldata` ni ya kusoma tu.

Kwa aina za scalar kama vile `uint` au `address` mkusanyaji hutushughulikia uchaguzi wa ghala, lakini kwa safu, ambazo ni ndefu na za gharama kubwa zaidi, tunabainisha aina ya ghala itakayotumika.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Thamani za kurudisha daima hurudishwa katika memory.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Hesabu kiasi kitakachonunuliwa katika kila ubadilishaji. Ikiwa matokeo ni chini ya kiwango cha chini ambacho mfanyabiashara yuko tayari kukubali, rudisha nyuma muamala.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Hatimaye, hamisha tokeni ya awali ya ERC-20 kwenye akaunti kwa ajili ya ubadilishanaji wa jozi ya kwanza na uite `_swap`. Haya yote yanatokea katika muamala mmoja, kwa hivyo ubadilishanaji wa jozi unajua kuwa tokeni zozote zisizotarajiwa ni sehemu ya uhamisho huu.

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

Shughuli iliyotangulia, `swapTokensForTokens`, inaruhusu mfanyabiashara kubainisha idadi kamili ya tokeni za ingizo anazotaka kutoa na idadi ya chini zaidi ya tokeni za pato anazotaka kupokea. Shughuli hii hufanya ubadilishaji kinyume, inamruhusu mfanyabiashara kubainisha idadi ya tokeni za pato anazotaka, na idadi ya juu zaidi ya tokeni za ingizo anazotaka kulipia.

Katika visa vyote viwili, mfanyabiashara anapaswa kwanza kuupa mkataba huu wa pembeni ruhusa ili kuuruhusu kuhamisha.

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
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Aina hizi nne zote zinahusisha biashara kati ya ETH na tokeni. Tofauti pekee ni kwamba tunapokea ETH kutoka kwa mfanyabiashara na kuitumia kuunda WETH, au tunapokea WETH kutoka kwa ubadilishanaji wa mwisho katika njia na kuiteketeza, na kumrudishia mfanyabiashara ETH inayotokana.

```solidity
    // **** BADILISHA (inasaidia tokeni za ada-kwa-uhamisho) ****
    // inahitaji kiasi cha awali kuwa tayari kimetumwa kwa jozi ya kwanza
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Hii ni shughuli ya ndani ya kubadilisha tokeni ambazo zina ada za uhamisho au ghala ili kutatua ([suala hili](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // wigo wa kuepuka makosa ya "stack too deep"
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Kwa sababu ya ada za uhamisho, hatuwezi kutegemea shughuli ya `getAmountsOut` kutuambia ni kiasi gani tunapata kutoka kwa kila uhamisho (kama tunavyofanya kabla ya kuita `_swap` ya awali). Badala yake, inabidi tuhamishe kwanza kisha tuone ni tokeni ngapi tulipata.

Kumbuka: Kinadharia tungeweza tu kutumia shughuli hii badala ya `_swap`, lakini katika hali fulani (kwa mfano, ikiwa uhamisho utaishia kurejeshwa kwa sababu hakuna kiasi cha kutosha mwishoni kufikia kiwango cha chini kinachohitajika) hiyo ingegharimu gesi zaidi. Tokeni za ada za uhamisho ni nadra sana, kwa hivyo ingawa tunahitaji kuzijumuisha, hakuna haja ya ubadilishaji wote kudhani kuwa zinapitia angalau mojawapo.

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

Hizi ni aina zilezile zinazotumika kwa tokeni za kawaida, lakini zinaita `_swapSupportingFeeOnTransferTokens` badala yake.

```solidity
    // **** SHUGHULI ZA MAKTABA ****
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

Shughuli hizi ni proksi tu zinazoita [shughuli za UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Mkataba huu ulitumika kuhamisha ubadilishanaji kutoka v1 ya zamani hadi v2. Sasa kwa kuwa zimehamishwa, haihusiki tena.

## Maktaba {#libraries}

[Maktaba ya SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) imeandikwa vizuri, kwa hivyo hakuna haja ya kuiandika hapa.

### Hisabati {#Math}

Maktaba hii ina baadhi ya shughuli za hisabati ambazo kwa kawaida hazihitajiki katika msimbo wa Solidity, kwa hivyo si sehemu ya lugha.

```solidity
pragma solidity =0.5.16;

// maktaba ya kufanya shughuli mbalimbali za hisabati

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // njia ya kibabiloni (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Anza na x kama makadirio ambayo ni ya juu kuliko kipeuo cha pili (ndiyo sababu tunahitaji kushughulikia 1-3 kama kesi maalum).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Pata makadirio ya karibu zaidi, wastani wa makadirio ya awali na nambari ambayo tunajaribu kupata kipeuo chake cha pili ukigawanya kwa makadirio ya awali. Rudia hadi makadirio mapya yasiwe chini ya yale yaliyopo. Kwa maelezo zaidi, [angalia hapa](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Hatupaswi kamwe kuhitaji kipeuo cha pili cha sifuri. Vipeuo vya pili vya moja, mbili, na tatu ni takriban moja (tunatumia nambari kamili, kwa hivyo tunapuuza sehemu).

```solidity
        }
    }
}
```

### Sehemu za Nukta Zisizobadilika (UQ112x112) {#FixedPoint}

Maktaba hii hushughulikia sehemu, ambazo kwa kawaida si sehemu ya hesabu za Ethereum. Hufanya hivi kwa kusimba nambari _x_ kama _x\*2^112_. Hii inaturuhusu kutumia opcodes za awali za kujumlisha na kutoa bila mabadiliko.

```solidity
pragma solidity =0.5.16;

// maktaba ya kushughulikia nambari za nukta zisizobadilika za binary (https://wikipedia.org/wiki/Q_(number_format))

// masafa: [0, 2**112 - 1]
// azimio: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` ni usimbaji kwa moja.

```solidity
    // simba uint112 kama UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // haifuriki kamwe
    }
```

Kwa sababu y ni `uint112`, thamani yake kubwa zaidi inaweza kuwa 2^112-1. Nambari hiyo bado inaweza kusimbwa kama `UQ112x112`.

```solidity
    // gawanya UQ112x112 kwa uint112, kurudisha UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Tukigawanya thamani mbili za `UQ112x112`, matokeo hayazidishwi tena na 2^112. Kwa hivyo badala yake tunachukua nambari kamili kwa ajili ya denomineta. Tungehitaji kutumia mbinu kama hiyo kufanya kuzidisha, lakini hatuhitaji kufanya kuzidisha kwa thamani za `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Maktaba hii inatumiwa tu na mikataba ya pembeni

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // inarudisha anwani za tokeni zilizopangwa, zinazotumika kushughulikia thamani za kurudisha kutoka kwa jozi zilizopangwa kwa utaratibu huu
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Panga tokeni mbili kwa anwani, ili tuweze kupata anwani ya ubadilishanaji wa jozi kwa ajili yao. Hii ni muhimu kwa sababu vinginevyo tungekuwa na uwezekano mbili, moja kwa vigezo A,B na nyingine kwa vigezo B,A, na kusababisha ubadilishanaji mbili badala ya moja.

```solidity
    // huhesabu anwani ya CREATE2 kwa jozi bila kufanya wito wowote wa nje
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hashi ya msimbo wa kuanzisha
            ))));
    }
```

Shughuli hii huhesabu anwani ya ubadilishanaji wa jozi kwa tokeni hizo mbili. Mkataba huu umeundwa kwa kutumia [opcode ya CREATE2](https://eips.ethereum.org/EIPS/eip-1014), kwa hivyo tunaweza kuhesabu anwani kwa kutumia algoriti ileile ikiwa tunajua vigezo inavyotumia. Hii ni nafuu sana kuliko kuuliza kiwanda, na

```solidity
    // huchukua na kupanga hifadhi za jozi
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Shughuli hii inarudisha hifadhi za tokeni mbili ambazo ubadilishanaji wa jozi unazo. Kumbuka kuwa inaweza kupokea tokeni kwa mpangilio wowote, na kuzipanga kwa matumizi ya ndani.

```solidity
    // kwa kuzingatia kiasi fulani cha rasilimali na hifadhi za jozi, inarudisha kiasi sawa cha rasilimali nyingine
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Shughuli hii inakupa kiasi cha tokeni B utakachopata kwa kubadilishana na tokeni A ikiwa hakuna ada inayohusika. Hesabu hii inazingatia kwamba uhamisho hubadilisha kiwango cha ubadilishaji.

```solidity
    // kwa kuzingatia kiasi cha ingizo cha rasilimali na hifadhi za jozi, inarudisha kiasi cha juu cha pato la rasilimali nyingine
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Shughuli ya `quote` hapo juu inafanya kazi vizuri ikiwa hakuna ada ya kutumia ubadilishanaji wa jozi. Hata hivyo, ikiwa kuna ada ya ubadilishaji ya 0.3%, kiasi unachopata hasa ni kidogo. Shughuli hii huhesabu kiasi baada ya ada ya ubadilishaji.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity haishughulikii sehemu kwa asili, kwa hivyo hatuwezi tu kuzidisha kiasi cha pato kwa 0.997. Badala yake, tunazidisha nambari ya juu (numerator) kwa 997 na nambari ya chini (denominator) kwa 1000, na kupata athari sawa.

```solidity
    // kwa kuzingatia kiasi cha pato cha rasilimali na hifadhi za jozi, inarudisha kiasi kinachohitajika cha ingizo la rasilimali nyingine
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Shughuli hii hufanya takribani kitu kilekile, lakini inapata kiasi cha pato na kutoa ingizo.

```solidity

    // hufanya hesabu za mnyororo za getAmountOut kwenye idadi yoyote ya jozi
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // hufanya hesabu za mnyororo za getAmountIn kwenye idadi yoyote ya jozi
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

Shughuli hizi mbili hushughulikia utambuzi wa thamani wakati inahitajika kupitia ubadilishanaji kadhaa wa jozi.

### Msaidizi wa Uhamisho {#transfer-helper}

[Maktaba hii](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) huongeza ukaguzi wa mafanikio karibu na uhamisho wa ERC-20 na Ethereum ili kushughulikia urejeshaji na urejeshaji wa thamani ya `false` kwa njia ileile.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// njia za msaada za kuingiliana na tokeni za ERC20 na kutuma ETH ambazo hazirudishi true/false kwa uthabiti
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Tunaweza kuita mkataba tofauti kwa mojawapo ya njia mbili:

- Tumia ufafanuzi wa kiolesura kuunda wito wa shughuli
- Tumia [kiolesura cha binary cha programu (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "kwa mikono" kuunda wito. Hivi ndivyo mwandishi wa msimbo aliamua kuifanya.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Kwa ajili ya utangamano wa nyuma na tokeni zilizoundwa kabla ya kiwango cha ERC-20, wito wa ERC-20 unaweza kushindwa ama kwa kurejesha (ambapo `success` ni `false`) au kwa kufanikiwa na kurudisha thamani ya `false` (ambapo kuna data ya pato, na ukii-decode kama boolean unapata `false`).

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

Shughuli hii inatekeleza [utendaji wa uhamisho wa ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), ambayo inaruhusu akaunti kutumia ruhusa iliyotolewa na akaunti tofauti.

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

Shughuli hii inatekeleza [utendaji wa transferFrom wa ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), ambayo inaruhusu akaunti kutumia ruhusa iliyotolewa na akaunti tofauti.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Shughuli hii huhamisha ether kwenye akaunti. Wito wowote kwa mkataba tofauti unaweza kujaribu kutuma ether. Kwa sababu hatuhitaji hasa kuita shughuli yoyote, hatutumi data yoyote na wito huo.

## Hitimisho {#conclusion}

Hii ni makala ndefu ya takriban kurasa 50. Ikiwa umefika hapa, hongera! Tunatumai sasa umeelewa mazingatio katika kuandika programu halisi ya maisha (kinyume na programu fupi za sampuli) na uko tayari zaidi kuweza kuandika mikataba kwa ajili ya matumizi yako mwenyewe.

Sasa nenda ukaandike kitu muhimu na utushangaze.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
