---
title: "Mwongozo wa mkataba wa daraja la kawaida la Optimism"
description: Daraja la kawaida la Optimism linafanyaje kazi? Kwa nini linafanya kazi hivi?
author: Ori Pomerantz
tags: ["Solidity", "daraja", "tabaka la 2"]
skill: intermediate
breadcrumb: Daraja la Optimism
published: 2022-03-30
lang: sw
---

[Optimism](https://www.optimism.io/) ni [rollup ya optimistic](/developers/docs/scaling/optimistic-rollups/).
Mikusanyiko ya optimistic inaweza kuchakata miamala kwa bei ya chini sana kuliko Mtandao Mkuu wa Ethereum (pia inajulikana kama tabaka la 1 au l1) kwa sababu miamala inachakatwa tu na nodi chache, badala ya kila nodi kwenye mtandao.
Wakati huo huo, data zote huandikwa kwenye l1 ili kila kitu kiweze kuthibitishwa na kujengwa upya kwa uhakikisho wote wa uadilifu na upatikanaji wa Mtandao Mkuu.

Ili kutumia rasilimali za l1 kwenye Optimism (au l2 nyingine yoyote), rasilimali zinahitaji [kuvushwa](/bridges/#prerequisites).
Njia moja ya kufanikisha hili ni kwa watumiaji kufunga rasilimali (ETH na [tokeni za ERC-20](/developers/docs/standards/tokens/erc-20/) ndizo zinazojulikana zaidi) kwenye l1, na kupokea rasilimali sawa za kutumia kwenye l2.
Hatimaye, yeyote anayebaki nazo anaweza kutaka kuzivusha kurudi kwenye l1.
Wakati wa kufanya hivi, rasilimali huteketezwa kwenye l2 na kisha kutolewa tena kwa mtumiaji kwenye l1.

Hivi ndivyo [daraja la kawaida la Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) linavyofanya kazi.
Katika makala haya tunapitia msimbo wa chanzo wa daraja hilo ili kuona jinsi linavyofanya kazi na kulisoma kama mfano wa msimbo wa Solidity ulioandikwa vizuri.

## Mtiririko wa udhibiti {#control-flows}

Daraja lina mitiririko miwili mikuu:

- Uwekaji (kutoka l1 hadi l2)
- Utoaji (kutoka l2 hadi l1)

### Mtiririko wa uwekaji {#deposit-flow}

#### Tabaka la 1 {#deposit-flow-layer-1}

1. Ikiwa unaweka ERC-20, mwekaji hulipa daraja kibali cha kutumia kiasi kinachowekwa
2. Mwekaji huita daraja la l1 (`depositERC20`, `depositERC20To`, `depositETH`, au `depositETHTo`)
3. Daraja la l1 huchukua umiliki wa rasilimali iliyovushwa
   - ETH: Rasilimali huhamishwa na mwekaji kama sehemu ya mwito
   - ERC-20: Rasilimali huhamishwa na daraja kwenda kwake lenyewe kwa kutumia kibali kilichotolewa na mwekaji
4. Daraja la l1 hutumia utaratibu wa ujumbe wa kuvuka kikoa kuita `finalizeDeposit` kwenye daraja la l2

#### Tabaka la 2 {#deposit-flow-layer-2}

5. Daraja la l2 huthibitisha mwito kwa `finalizeDeposit` ni halali:
   - Umetoka kwenye mkataba wa ujumbe wa kuvuka kikoa
   - Ulitoka awali kwenye daraja la l1
6. Daraja la l2 hukagua ikiwa mkataba wa tokeni ya ERC-20 kwenye l2 ndio sahihi:
   - Mkataba wa l2 unaripoti kuwa mwenzake wa l1 ni sawa na ule ambao tokeni zilitoka kwenye l1
   - Mkataba wa l2 unaripoti kuwa unasaidia kiolesura sahihi ([kwa kutumia ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Ikiwa mkataba wa l2 ndio sahihi, uite ili kufua idadi inayofaa ya tokeni kwenye anwani inayofaa. Ikiwa sivyo, anza mchakato wa utoaji ili kuruhusu mtumiaji kudai tokeni kwenye l1.

### Mtiririko wa utoaji {#withdrawal-flow}

#### Tabaka la 2 {#withdrawal-flow-layer-2}

1. Mtoaji huita daraja la l2 (`withdraw` au `withdrawTo`)
2. Daraja la l2 huteketeza idadi inayofaa ya tokeni zinazomilikiwa na `msg.sender`
3. Daraja la l2 hutumia utaratibu wa ujumbe wa kuvuka kikoa kuita `finalizeETHWithdrawal` au `finalizeERC20Withdrawal` kwenye daraja la l1

#### Tabaka la 1 {#withdrawal-flow-layer-1}

4. Daraja la l1 huthibitisha mwito kwa `finalizeETHWithdrawal` au `finalizeERC20Withdrawal` ni halali:
   - Umetoka kwenye utaratibu wa ujumbe wa kuvuka kikoa
   - Ulitoka awali kwenye daraja la l2
5. Daraja la l1 huhamisha rasilimali inayofaa (ETH au ERC-20) kwenye anwani inayofaa

## Msimbo wa tabaka la 1 {#layer-1-code}

Huu ndio msimbo unaoendeshwa kwenye l1, Mtandao Mkuu wa Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Kiolesura hiki kimefafanuliwa hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Inajumuisha vipengele na ufafanuzi unaohitajika kwa ajili ya kuvusha tokeni za ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Msimbo mwingi wa Optimism hutolewa chini ya leseni ya MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Wakati wa kuandika toleo la hivi karibuni la Solidity ni 0.8.12.
Hadi toleo la 0.9.0 litakapotolewa, hatujui ikiwa msimbo huu unaendana nalo au la.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Matukio *
     **********/

    event ERC20DepositInitiated(
```

Katika istilahi za daraja la Optimism _uwekaji_ inamaanisha hamisho kutoka l1 hadi l2, na _utoaji_ inamaanisha hamisho kutoka l2 hadi l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Katika hali nyingi anwani ya ERC-20 kwenye l1 sio sawa na anwani ya ERC-20 inayolingana kwenye l2.
[Unaweza kuona orodha ya anwani za tokeni hapa](https://static.optimism.io/optimism.tokenlist.json).
Anwani yenye `chainId` 1 iko kwenye l1 (Mtandao Mkuu) na anwani yenye `chainId` 10 iko kwenye l2 (Optimism).
Thamani nyingine mbili za `chainId` ni za mtandao wa majaribio wa Kovan (42) na mtandao wa majaribio wa Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Inawezekana kuongeza maelezo kwenye uhamishaji, ambapo huongezwa kwenye matukio yanayoripoti.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Mkataba huo huo wa daraja hushughulikia uhamishaji katika pande zote mbili.
Kwa upande wa daraja la l1, hii inamaanisha uanzishaji wa uwekaji na ukamilishaji wa utoaji.

```solidity

    /********************
     * Kazi za Umma *
     ********************/

    /**
     * @dev pata anwani ya mkataba wa daraja la tabaka la 2 (l2) unaolingana.
     * @return Anwani ya mkataba wa daraja la tabaka la 2 (l2) unaolingana.
     */
    function l2TokenBridge() external returns (address);
```

Kipengele hiki hakihitajiki sana, kwa sababu kwenye l2 ni mkataba uliosambazwa mapema, kwa hivyo huwa kwenye anwani `0x4200000000000000000000000000000000000010`.
Iko hapa kwa ajili ya ulinganifu na daraja la l2, kwa sababu anwani ya daraja la l1 _sio_ rahisi kujua.

```solidity
    /**
     * @dev weka kiasi cha ERC-20 kwenye salio la mpigaji kwenye tabaka la 2 (l2).
     * @param _l1Token Anwani ya ERC-20 ya tabaka la 1 (l1) tunayoweka
     * @param _l2Token Anwani ya ERC-20 ya tabaka la 2 (l2) inayolingana na tabaka la 1 (l1)
     * @param _amount Kiasi cha ERC-20 cha kuweka
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye tabaka la 2 (l2).
     * @param _data Data ya hiari ya kusambaza kwenye tabaka la 2 (l2). Data hii inatolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *        kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Kigezo cha `_l2Gas` ni kiasi cha gesi ya l2 ambacho muamala unaruhusiwa kutumia.
[Hadi kikomo fulani (cha juu), hii ni bure](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), kwa hivyo isipokuwa mkataba wa ERC-20 ufanye kitu cha ajabu sana wakati wa kufua, haipaswi kuwa tatizo.
Kipengele hiki kinashughulikia hali ya kawaida, ambapo mtumiaji huvusha rasilimali kwenye anwani sawa kwenye mnyororo wa vitalu tofauti.

```solidity
    /**
     * @dev weka kiasi cha ERC-20 kwenye salio la mpokeaji kwenye tabaka la 2 (l2).
     * @param _l1Token Anwani ya ERC-20 ya tabaka la 1 (l1) tunayoweka
     * @param _l2Token Anwani ya ERC-20 ya tabaka la 2 (l2) inayolingana na tabaka la 1 (l1)
     * @param _to Anwani ya tabaka la 2 (l2) ya kuwekea utoaji.
     * @param _amount Kiasi cha ERC-20 cha kuweka.
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye tabaka la 2 (l2).
     * @param _data Data ya hiari ya kusambaza kwenye tabaka la 2 (l2). Data hii inatolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *        kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Kipengele hiki kinakaribia kufanana na `depositERC20`, lakini kinakuruhusu kutuma ERC-20 kwenye anwani tofauti.

```solidity
    /*************************
     * Kazi za Kuvuka-mnyororo *
     *************************/

    /**
     * @dev Kamilisha utoaji kutoka tabaka la 2 (l2) hadi tabaka la 1 (l1), na uweke fedha kwenye salio la mpokeaji la
     * tokeni ya ERC-20 ya tabaka la 1 (l1).
     * Mwito huu utashindwa ikiwa utoaji ulioanzishwa kutoka tabaka la 2 (l2) haujakamilishwa.
     *
     * @param _l1Token Anwani ya tokeni ya tabaka la 1 (l1) ya kukamilisha utoaji (finalizeWithdrawal).
     * @param _l2Token Anwani ya tokeni ya tabaka la 2 (l2) ambapo utoaji ulianzishwa.
     * @param _from Anwani ya tabaka la 2 (l2) inayoanzisha hamisho.
     * @param _to Anwani ya tabaka la 1 (l1) ya kuwekea utoaji.
     * @param _amount Kiasi cha ERC-20 cha kuweka.
     * @param _data Data iliyotolewa na mtumaji kwenye tabaka la 2 (l2). Data hii inatolewa
     *   kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *   kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Utoaji (na jumbe zingine kutoka l2 hadi l1) katika Optimism ni mchakato wa hatua mbili:

1. Muamala wa kuanzisha kwenye l2.
2. Muamala wa kukamilisha au kudai kwenye l1.
   Muamala huu unahitaji kufanyika baada ya [kipindi cha changamoto ya hitilafu](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) kwa muamala wa l2 kumalizika.

### IL1StandardBridge {#il1standardbridge}

[Kiolesura hiki kimefafanuliwa hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Faili hili lina ufafanuzi wa tukio na kipengele kwa ajili ya ETH.
Ufafanuzi huu unafanana sana na ule uliofafanuliwa katika `IL1ERC20Bridge` hapo juu kwa ERC-20.

Kiolesura cha daraja kimegawanywa kati ya faili mbili kwa sababu baadhi ya tokeni za ERC-20 zinahitaji uchakataji maalum na haziwezi kushughulikiwa na daraja la kawaida.
Kwa njia hii daraja maalum linaloshughulikia tokeni kama hiyo linaweza kutekeleza `IL1ERC20Bridge` na lisilazimike pia kuvusha ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Matukio *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Tukio hiki linakaribia kufanana na toleo la ERC-20 (`ERC20DepositInitiated`), isipokuwa bila anwani za tokeni za l1 na l2.
Hali ni hiyo hiyo kwa matukio mengine na vipengele.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Kazi za Umma *
     ********************/

    /**
     * @dev Weka kiasi cha ETH kwenye salio la mpigaji kwenye tabaka la 2 (l2).
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Weka kiasi cha ETH kwenye salio la mpokeaji kwenye tabaka la 2 (l2).
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Kazi za Kuvuka-mnyororo *
     *************************/

    /**
     * @dev Kamilisha utoaji kutoka tabaka la 2 (l2) hadi tabaka la 1 (l1), na uweke fedha kwenye salio la mpokeaji la
     * tokeni ya ETH ya tabaka la 1 (l1). Kwa kuwa xDomainMessenger pekee ndiye anayeweza kuita kazi hii, haitawahi kuitwa
     * kabla ya utoaji kukamilishwa.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Mkataba huu](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) unarithiwa na madaraja yote mawili ([l1](#the-l1-bridge-contract) na [l2](#l2-bridge-code)) ili kutuma jumbe kwenye tabaka lingine.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Uingizaji wa Violesura */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) huambia mkataba jinsi ya kutuma jumbe kwenye tabaka lingine, kwa kutumia mjumbe wa kuvuka kikoa.
Mjumbe huyu wa kuvuka kikoa ni mfumo mwingine mzima, na unastahili makala yake yenyewe, ambayo natumai kuandika katika siku zijazo.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Mkataba msaidizi kwa mikataba inayofanya mawasiliano ya kuvuka-kikoa
 *
 * Kikusanyaji kilichotumika: kinafafanuliwa na mkataba unaorithi
 */
contract CrossDomainEnabled {
    /*************
     * Vigezo *
     *************/

    // Mkataba wa mjumbe unaotumika kutuma na kupokea ujumbe kutoka kikoa kingine.
    address public messenger;

    /***************
     * Konstrukta *
     ***************/

    /**
     * @param _messenger Anwani ya CrossDomainMessenger kwenye tabaka la sasa.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Kigezo kimoja ambacho mkataba unahitaji kujua, anwani ya mjumbe wa kuvuka kikoa kwenye tabaka hili.
Kigezo hiki huwekwa mara moja, katika konstrukta, na hakibadiliki kamwe.

```solidity

    /**********************
     * Virekebishaji vya Kazi *
     **********************/

    /**
     * Inalazimisha kwamba kazi iliyorekebishwa inaweza kuitwa tu na akaunti maalum ya kuvuka-kikoa.
     * @param _sourceDomainAccount Akaunti pekee kwenye kikoa asili ambayo
     *  imeidhinishwa kuita kazi hii.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Ujumbe wa kuvuka kikoa unaweza kufikiwa na mkataba wowote kwenye mnyororo wa vitalu ambapo unaendeshwa (iwe Mtandao Mkuu wa Ethereum au Optimism).
Lakini tunahitaji daraja kila upande kuamini _tu_ jumbe fulani ikiwa zinatoka kwenye daraja la upande mwingine.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Jumbe tu kutoka kwa mjumbe anayefaa wa kuvuka kikoa (`messenger`, kama unavyoona hapa chini) ndizo zinazoweza kuaminika.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Njia ambayo mjumbe wa kuvuka kikoa hutoa anwani iliyotuma ujumbe na tabaka lingine ni [kipengele cha `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Ilimradi inaitwa katika muamala ulioanzishwa na ujumbe inaweza kutoa taarifa hii.

Tunahitaji kuhakikisha kuwa ujumbe tuliopokea ulitoka kwenye daraja lingine.

```solidity

        _;
    }

    /**********************
     * Kazi za Ndani *
     **********************/

    /**
     * Inapata mjumbe, kwa kawaida kutoka kwenye hifadhi. Kazi hii inawekwa wazi ikiwa mkataba mtoto
     * unahitaji kubatilisha.
     * @return Anwani ya mkataba wa mjumbe wa kuvuka-kikoa ambao unapaswa kutumika.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Kipengele hiki hurejesha mjumbe wa kuvuka kikoa.
Tunatumia kipengele badala ya kigezo `messenger` kuruhusu mikataba inayorithi kutoka kwa huu kutumia algoriti kubainisha mjumbe gani wa kuvuka kikoa wa kutumia.

```solidity

    /**
     * Inatuma ujumbe kwa akaunti kwenye kikoa kingine
     * @param _crossDomainTarget Mpokeaji aliyekusudiwa kwenye kikoa lengwa
     * @param _message Data ya kutuma kwa lengwa (kwa kawaida data za mwito kwa kazi yenye
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Kikomo cha gesi (gasLimit) kwa upokeaji wa ujumbe kwenye kikoa lengwa.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Hatimaye, kipengele kinachotuma ujumbe kwenye tabaka lingine.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ni kichanganuzi tuli ambacho Optimism huendesha kwenye kila mkataba kutafuta udhaifu na matatizo mengine yanayoweza kutokea.
Katika hali hii, mstari ufuatao husababisha udhaifu miwili:

1. [Matukio ya uingiaji upya](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Uingiaji upya usio na madhara](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Katika hali hii hatuna wasiwasi kuhusu uingiaji upya tunajua `getCrossDomainMessenger()` inarejesha anwani inayoaminika, hata kama Slither haina njia ya kujua hilo.

### Mkataba wa daraja la l1 {#the-l1-bridge-contract}

[Msimbo wa chanzo wa mkataba huu uko hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Violesura vinaweza kuwa sehemu ya mikataba mingine, kwa hivyo vinapaswa kusaidia anuwai kubwa ya matoleo ya Solidity.
Lakini daraja lenyewe ni mkataba wetu, na tunaweza kuwa wakali kuhusu toleo gani la Solidity linalotumia.

```solidity
/* Uingizaji wa Violesura */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) na [IL1StandardBridge](#il1standardbridge) zimeelezwa hapo juu.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) kinaturuhusu kuunda jumbe za kudhibiti daraja la kawaida kwenye l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Kiolesura hiki](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) kinaturuhusu kudhibiti mikataba ya ERC-20.
[Unaweza kusoma zaidi kuihusu hapa](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Uingizaji wa Maktaba */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Kama ilivyoelezwa hapo juu](#crossdomainenabled), mkataba huu unatumika kwa ujumbe kati ya matabaka.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) ina anwani za mikataba ya l2 ambayo huwa na anwani sawa kila wakati. Hii inajumuisha daraja la kawaida kwenye l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Zana za Anwani za OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Inatumika kutofautisha kati ya anwani za mkataba na zile zinazomilikiwa na akaunti zinazomilikiwa na watu wa nje (EOA).

Kumbuka kuwa hili sio suluhisho kamili, kwa sababu hakuna njia ya kutofautisha kati ya miito ya moja kwa moja na miito inayofanywa kutoka kwa konstrukta wa mkataba, lakini angalau hii inaturuhusu kutambua na kuzuia baadhi ya makosa ya kawaida ya watumiaji.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Kiwango cha ERC-20](https://eips.ethereum.org/EIPS/eip-20) kinasaidia njia mbili kwa mkataba kuripoti kutofaulu:

1. Tengua
2. Rejesha `false`

Kushughulikia hali zote mbili kungefanya msimbo wetu kuwa mgumu zaidi, kwa hivyo badala yake tunatumia [`SafeERC20` ya OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), ambayo inahakikisha [kushindwa kote kunasababisha kutengua](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Daraja la ETH na ERC-20 la tabaka la 1 (l1) ni mkataba unaohifadhi fedha zilizowekwa za tabaka la 1 (l1) na tokeni
 * za kawaida zinazotumika kwenye tabaka la 2 (l2). Inasawazisha daraja la tabaka la 2 (l2) linalolingana, ikilijulisha kuhusu uwekaji
 * na kulisikiliza kwa utoaji mpya uliokamilishwa.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Mstari huu ndio jinsi tunavyobainisha kutumia kanga ya `SafeERC20` kila wakati tunapotumia kiolesura cha `IERC20`.

```solidity

    /********************************
     * Marejeleo ya Mikataba ya Nje *
     ********************************/

    address public l2TokenBridge;
```

Anwani ya [L2StandardBridge](#l2-bridge-code).

```solidity

    // Inachora tokeni ya tabaka la 1 (l1) kwa tokeni ya tabaka la 2 (l2) kwa salio la tokeni ya tabaka la 1 (l1) iliyowekwa
    mapping(address => mapping(address => uint256)) public deposits;
```

[Uchoraji ramani](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) maradufu kama huu ndio njia unayofafanua [safu chache za pande mbili](https://en.wikipedia.org/wiki/Sparse_matrix).
Thamani katika muundo huu wa data zinatambuliwa kama `deposit[L1 token addr][L2 token addr]`.
Thamani chaguo-msingi ni sifuri.
Seli tu ambazo zimewekwa kwa thamani tofauti ndizo zinazoandikwa kwenye hifadhi.

```solidity

    /***************
     * Konstrukta *
     ***************/

    // Mkataba huu unaishi nyuma ya proksi, kwa hivyo vigezo vya konstrukta havitumiki.
    constructor() CrossDomainEnabled(address(0)) {}
```

Kutaka kuweza kuboresha mkataba huu bila kulazimika kunakili vigezo vyote kwenye hifadhi.
Ili kufanya hivyo tunatumia [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), mkataba wa uwakilishi unaotumia [`delegatecall`](https://solidity-by-example.org/delegatecall/) kuhamisha miito kwenye mkataba tofauti ambao anwani yake imehifadhiwa na mkataba wa uwakilishi (unapoboresha unauambia uwakilishi ubadilishe anwani hiyo).
Unapotumia `delegatecall` hifadhi inabaki kuwa hifadhi ya mkataba _unaoita_, kwa hivyo thamani za vigezo vyote vya hali ya mkataba haziathiriwi.

Athari moja ya muundo huu ni kwamba hifadhi ya mkataba ambao _umeitwa_ na `delegatecall` haitumiki na kwa hivyo thamani za konstrukta zilizopitishwa kwake hazijalishi.
Hii ndiyo sababu tunaweza kutoa thamani isiyo na maana kwa konstrukta wa `CrossDomainEnabled`.
Pia ni sababu uanzishaji hapa chini umetenganishwa na konstrukta.

```solidity
    /******************
     * Uanzishaji *
     ******************/

    /**
     * @param _l1messenger Anwani ya Mjumbe wa tabaka la 1 (l1) inayotumika kwa mawasiliano ya kuvuka-mnyororo.
     * @param _l2TokenBridge Anwani ya daraja la kawaida la tabaka la 2 (l2).
     */
    // slither-disable-next-line external-function
```

[Jaribio hili la Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) hutambua vipengele ambavyo haviitwi kutoka kwenye msimbo wa mkataba na kwa hivyo vinaweza kutangazwa kama `external` badala ya `public`.
Gharama ya gesi ya vipengele vya `external` inaweza kuwa chini, kwa sababu vinaweza kutolewa na vigezo katika data za mwito.
Vipengele vilivyotangazwa kama `public` lazima viweze kufikiwa kutoka ndani ya mkataba.
Mikataba haiwezi kurekebisha data zake za mwito, kwa hivyo vigezo lazima viwe kwenye kumbukumbu.
Wakati kipengele kama hicho kinaitwa kwa nje, ni muhimu kunakili data za mwito kwenye kumbukumbu, ambayo inagharimu gesi.
Katika hali hii kipengele kinaitwa mara moja tu, kwa hivyo ukosefu wa ufanisi haujalishi kwetu.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Kipengele cha `initialize` kinapaswa kuitwa mara moja tu.
Ikiwa anwani ya mjumbe wa kuvuka kikoa wa l1 au daraja la tokeni la l2 itabadilika, tunaunda mkataba mpya wa uwakilishi na daraja jipya linalouita.
Hili haliwezekani kutokea isipokuwa wakati mfumo mzima unaboreshwa, tukio nadra sana.

Kumbuka kuwa kipengele hiki hakina utaratibu wowote unaozuia _nani_ anaweza kukiita.
Hii inamaanisha kuwa kinadharia mshambuliaji anaweza kusubiri hadi tusambaze mkataba wa uwakilishi na toleo la kwanza la daraja na kisha [kutanguliza muamala](https://solidity-by-example.org/hacks/front-running/) ili kufika kwenye kipengele cha `initialize` kabla ya mtumiaji halali kufanya hivyo. Lakini kuna njia mbili za kuzuia hili:

1. Ikiwa mikataba inasambazwa sio moja kwa moja na EOA bali [katika muamala ambao una mkataba mwingine unaoiunda](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) mchakato mzima unaweza kuwa wa atomiki, na kumaliza kabla ya muamala mwingine wowote kutekelezwa.
2. Ikiwa mwito halali kwa `initialize` utashindwa inawezekana kila wakati kupuuza mkataba wa uwakilishi na daraja jipya lililoundwa na kuunda mapya.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Hivi ndivyo vigezo viwili ambavyo daraja linahitaji kujua.

```solidity

    /**************
     * Uwekaji *
     **************/

    /** @dev Kirekebishaji kinachohitaji mtumaji awe EOA. Ukaguzi huu unaweza kukwepwa na mkataba
     *  mbaya kupitia initcode, lakini inashughulikia kosa la mtumiaji tunalotaka kuepuka.
     */
    modifier onlyEOA() {
        // Inatumika kuzuia uwekaji kutoka kwa mikataba (kuepuka tokeni zilizopotea kwa bahati mbaya)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Hii ndiyo sababu tulihitaji zana za `Address` za OpenZeppelin.

```solidity
    /**
     * @dev Kazi hii inaweza kuitwa bila data
     * kuweka kiasi cha ETH kwenye salio la mpigaji kwenye tabaka la 2 (l2).
     * Kwa kuwa kazi ya kupokea haichukui data, kiasi cha msingi
     * cha kihafidhina kinasambazwa kwenye tabaka la 2 (l2).
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Kipengele hiki kipo kwa madhumuni ya majaribio.
Kumbuka kuwa haionekani katika ufafanuzi wa kiolesura - sio kwa matumizi ya kawaida.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Vipengele hivi viwili ni kanga zinazozunguka `_initiateETHDeposit`, kipengele kinachoshughulikia uwekaji halisi wa ETH.

```solidity
    /**
     * @dev Inafanya mantiki ya uwekaji kwa kuhifadhi ETH na kujulisha L2 ETH Gateway kuhusu
     * uwekaji.
     * @param _from Akaunti ya kuvuta uwekaji kutoka kwenye tabaka la 1 (l1).
     * @param _to Akaunti ya kupewa uwekaji kwenye tabaka la 2 (l2).
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye tabaka la 2 (l2).
     * @param _data Data ya hiari ya kusambaza kwenye tabaka la 2 (l2). Data hii inatolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *        kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Jenga data za mwito kwa ajili ya mwito wa finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Njia ambayo jumbe za kuvuka kikoa hufanya kazi ni kwamba mkataba lengwa unaitwa na ujumbe kama data zake za mwito.
Mikataba ya Solidity kila wakati hutafsiri data zake za mwito kwa mujibu wa
[vipimo vya ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Kipengele cha Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) huunda data hizo za mwito.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Ujumbe hapa ni kuita [kipengele cha `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) na vigezo hivi:

| Kigezo | Thamani | Maana |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | Thamani maalum ya kusimama kwa ETH (ambayo sio tokeni ya ERC-20) kwenye l1 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Mkataba wa l2 unaosimamia ETH kwenye Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (mkataba huu ni kwa matumizi ya ndani ya Optimism pekee) |
| \_from | \_from | Anwani kwenye l1 inayotuma ETH |
| \_to | \_to | Anwani kwenye l2 inayopokea ETH |
| amount | msg.value | Kiasi cha Wei kilichotumwa (ambacho tayari kimetumwa kwenye daraja) |
| \_data | \_data | Data ya ziada ya kuambatisha kwenye uwekaji |

```solidity
        // Tuma data za mwito kwenye tabaka la 2 (l2)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Tuma ujumbe kupitia mjumbe wa kuvuka kikoa.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Toa tukio ili kufahamisha programu tumizi iliyogatuliwa yoyote inayosikiliza kuhusu hamisho hili.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Vipengele hivi viwili ni kanga zinazozunguka `_initiateERC20Deposit`, kipengele kinachoshughulikia uwekaji halisi wa ERC-20.

```solidity
    /**
     * @dev Inafanya mantiki ya uwekaji kwa kujulisha mkataba wa Tokeni Iliyowekwa wa tabaka la 2 (l2)
     * kuhusu uwekaji na kuita mshughulikiaji kufunga fedha za tabaka la 1 (l1). (k.m., transferFrom)
     *
     * @param _l1Token Anwani ya ERC-20 ya tabaka la 1 (l1) tunayoweka
     * @param _l2Token Anwani ya ERC-20 ya tabaka la 2 (l2) inayolingana na tabaka la 1 (l1)
     * @param _from Akaunti ya kuvuta uwekaji kutoka kwenye tabaka la 1 (l1)
     * @param _to Akaunti ya kupewa uwekaji kwenye tabaka la 2 (l2)
     * @param _amount Kiasi cha ERC-20 cha kuweka.
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye tabaka la 2 (l2).
     * @param _data Data ya hiari ya kusambaza kwenye tabaka la 2 (l2). Data hii inatolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *        kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Kipengele hiki kinafanana na `_initiateETHDeposit` hapo juu, na tofauti chache muhimu.
Tofauti ya kwanza ni kwamba kipengele hiki hupokea anwani za tokeni na kiasi cha kuhamisha kama vigezo.
Kwa upande wa ETH mwito kwa daraja tayari unajumuisha hamisho la rasilimali kwenye akaunti ya daraja (`msg.value`).

```solidity
        // Wakati uwekaji unapoanzishwa kwenye tabaka la 1 (l1), daraja la tabaka la 1 (l1) linafanya hamisho la fedha kwake lenyewe kwa ajili ya
        // utoaji wa baadaye. safeTransferFrom pia inakagua ikiwa mkataba una msimbo, kwa hivyo hii itashindwa ikiwa
        // _from ni EOA au anwani(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Uhamishaji wa tokeni za ERC-20 hufuata mchakato tofauti na ETH:

1. Mtumiaji (`_from`) hutoa kibali kwa daraja kuhamisha tokeni zinazofaa.
2. Mtumiaji huita daraja na anwani ya mkataba wa tokeni, kiasi, n.k.
3. Daraja huhamisha tokeni (kwake lenyewe) kama sehemu ya mchakato wa uwekaji.

Hatua ya kwanza inaweza kutokea katika muamala tofauti na mbili za mwisho.
Hata hivyo, utangulizaji muamala sio tatizo kwa sababu vipengele viwili vinavyoita `_initiateERC20Deposit` (`depositERC20` na `depositERC20To`) huita tu kipengele hiki na `msg.sender` kama kigezo cha `_from`.

```solidity
        // Jenga data za mwito kwa ajili ya _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Tuma data za mwito kwenye tabaka la 2 (l2)
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Ongeza kiasi cha tokeni kilichowekwa kwenye muundo wa data wa `deposits`.
Kunaweza kuwa na anwani nyingi kwenye l2 zinazolingana na tokeni sawa ya ERC-20 ya l1, kwa hivyo haitoshi kutumia salio la daraja la tokeni ya ERC-20 ya l1 kufuatilia uwekaji.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Kazi za Kuvuka-mnyororo *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Daraja la l2 hutuma ujumbe kwa mjumbe wa kuvuka kikoa wa l2 ambao husababisha mjumbe wa kuvuka kikoa wa l1 kuita kipengele hiki (mara tu [muamala unaokamilisha ujumbe](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) unapowasilishwa kwenye l1, bila shaka).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Hakikisha kuwa huu ni ujumbe _halali_, unaotoka kwa mjumbe wa kuvuka kikoa na kuanzia kwenye daraja la tokeni la l2.
Kipengele hiki kinatumika kutoa ETH kutoka kwenye daraja, kwa hivyo tunapaswa kuhakikisha kinaitwa tu na mpigaji aliyeidhinishwa.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Njia ya kuhamisha ETH ni kuita mpokeaji na kiasi cha Wei katika `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Toa tukio kuhusu utoaji.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Kipengele hiki kinafanana na `finalizeETHWithdrawal` hapo juu, na mabadiliko muhimu kwa tokeni za ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Sasisha muundo wa data wa `deposits`.

```solidity

        // Wakati utoaji unapokamilishwa kwenye tabaka la 1 (l1), daraja la tabaka la 1 (l1) linafanya hamisho la fedha kwa mtoaji
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Ya Muda - Kuhamisha ETH *
     *****************************/

    /**
     * @dev Inaongeza salio la ETH kwenye akaunti. Hii inakusudiwa kuruhusu ETH
     * kuhamishwa kutoka lango la zamani kwenda lango jipya.
     * KUMBUKA: Hii imeachwa kwa sasisho moja tu ili tuweze kupokea ETH iliyohamishwa kutoka kwenye
     * mkataba wa zamani
     */
    function donateETH() external payable {}
}
```

Kulikuwa na utekelezaji wa awali wa daraja.
Tulipohama kutoka kwenye utekelezaji huo hadi huu, ilitubidi kuhamisha rasilimali zote.
Tokeni za ERC-20 zinaweza tu kuhamishwa.
Hata hivyo, ili kuhamisha ETH kwenye mkataba unahitaji idhini ya mkataba huo, ambayo ndiyo `donateETH` inatupa.

## Tokeni za ERC-20 kwenye l2 {#erc-20-tokens-on-l2}

Ili tokeni ya ERC-20 iingie kwenye daraja la kawaida, inahitaji kuruhusu daraja la kawaida, na daraja la kawaida _pekee_, kufua tokeni.
Hii ni muhimu kwa sababu madaraja yanahitaji kuhakikisha kuwa idadi ya tokeni zinazozunguka kwenye Optimism ni sawa na idadi ya tokeni zilizofungwa ndani ya mkataba wa daraja la l1.
Ikiwa kuna tokeni nyingi sana kwenye l2 baadhi ya watumiaji hawataweza kuvusha rasilimali zao kurudi kwenye l1.
Badala ya daraja linaloaminika, kimsingi tungeunda upya [benki ya akiba ya sehemu](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Ikiwa kuna tokeni nyingi sana kwenye l1, baadhi ya tokeni hizo zingebaki zimefungwa ndani ya mkataba wa daraja milele kwa sababu hakuna njia ya kuziachilia bila kuteketeza tokeni za l2.

### IL2StandardERC20 {#il2standarderc20}

Kila tokeni ya ERC-20 kwenye l2 inayotumia daraja la kawaida inahitaji kutoa [kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), ambacho kina vipengele na matukio ambayo daraja la kawaida linahitaji.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Kiolesura cha kawaida cha ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) hakijumuishi vipengele vya `mint` na `burn`.
Mbinu hizo hazihitajiki na [kiwango cha ERC-20](https://eips.ethereum.org/EIPS/eip-20), ambacho huacha bila kubainishwa taratibu za kuunda na kuharibu tokeni.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Kiolesura cha ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) kinatumika kubainisha ni vipengele gani mkataba unatoa.
[Unaweza kusoma kiwango hapa](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Kipengele hiki hutoa anwani ya tokeni ya l1 ambayo imevushwa kwenye mkataba huu.
Kumbuka kuwa hatuna kipengele sawa katika mwelekeo tofauti.
Tunahitaji kuweza kuvusha tokeni yoyote ya l1, bila kujali kama usaidizi wa l2 ulipangwa wakati ilipotekelezwa au la.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Vipengele na matukio ya kufua (kuunda) na kuteketeza (kuharibu) tokeni.
Daraja linapaswa kuwa chombo pekee kinachoweza kuendesha vipengele hivi ili kuhakikisha idadi ya tokeni ni sahihi (sawa na idadi ya tokeni zilizofungwa kwenye l1).

### L2StandardERC20 {#l2standarderc20}

[Huu ni utekelezaji wetu wa kiolesura cha `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Isipokuwa unahitaji aina fulani ya mantiki maalum, unapaswa kutumia hii.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Mkataba wa ERC-20 wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism haiamini katika kuvumbua upya gurudumu, hasa wakati gurudumu limekaguliwa vizuri na linahitaji kuaminika vya kutosha kushikilia rasilimali.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Hivi ni vigezo viwili vya ziada vya usanidi ambavyo tunahitaji na ERC-20 kwa kawaida haihitaji.

```solidity

    /**
     * @param _l2Bridge Anwani ya daraja la kawaida la tabaka la 2 (l2).
     * @param _l1Token Anwani ya tokeni ya tabaka la 1 (l1) inayolingana.
     * @param _name Jina la ERC-20.
     * @param _symbol Alama ya ERC-20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Kwanza ita konstrukta kwa mkataba tunaorithi kutoka (`ERC20(_name, _symbol)`) na kisha weka vigezo vyetu wenyewe.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Hivi ndivyo [ERC-165](https://eips.ethereum.org/EIPS/eip-165) inavyofanya kazi.
Kila kiolesura ni idadi ya vipengele vinavyosaidiwa, na kinatambuliwa kama [au ya kipekee](https://en.wikipedia.org/wiki/Exclusive_or) ya [viteuzi vya kipengele cha ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) vya vipengele hivyo.

Daraja la l2 hutumia ERC-165 kama ukaguzi wa uhalali ili kuhakikisha kuwa mkataba wa ERC-20 ambao inatuma rasilimali ni `IL2StandardERC20`.

**Kumbuka:** Hakuna kinachozuia mkataba mbovu kutoa majibu ya uongo kwa `supportsInterface`, kwa hivyo huu ni utaratibu wa ukaguzi wa uhalali, _sio_ utaratibu wa usalama.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Daraja la l2 pekee ndilo linaloruhusiwa kufua na kuteketeza rasilimali.

`_mint` na `_burn` kwa kweli zimefafanuliwa katika [mkataba wa ERC-20 wa OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Mkataba huo hauzionyeshi kwa nje, kwa sababu masharti ya kufua na kuteketeza tokeni yanatofautiana kama idadi ya njia za kutumia ERC-20.

## Msimbo wa Daraja la L2 {#l2-bridge-code}

Huu ni msimbo unaoendesha daraja kwenye Optimism.
[Chanzo cha mkataba huu kiko hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Uingizaji wa Violesura */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Kiolesura cha [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) kinafanana sana na [sawa na l1](#il1erc20bridge) tuliyoona hapo juu.
Kuna tofauti mbili muhimu:

1. Kwenye l1 unaanzisha uwekaji na kukamilisha utoaji.
   Hapa unaanzisha utoaji na kukamilisha uwekaji.
2. Kwenye l1 ni muhimu kutofautisha kati ya ETH na tokeni za ERC-20.
   Kwenye l2 tunaweza kutumia vipengele sawa kwa zote mbili kwa sababu ndani salio la ETH kwenye Optimism linashughulikiwa kama tokeni ya ERC-20 yenye anwani [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Uingizaji wa Maktaba */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Uingizaji wa Mikataba */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Daraja la Kawaida la tabaka la 2 (l2) ni mkataba unaofanya kazi pamoja na daraja la Kawaida la tabaka la 1 (l1) ili
 * kuwezesha mabadiliko ya ETH na ERC-20 kati ya tabaka la 1 (l1) na tabaka la 2 (l2).
 * Mkataba huu unafanya kazi kama mfua wa tokeni mpya unaposikia kuhusu uwekaji kwenye daraja la Kawaida la
 * tabaka la 1 (l1).
 * Mkataba huu pia unafanya kazi kama mteketezaji wa tokeni zilizokusudiwa kwa utoaji, ukijulisha daraja la
 * tabaka la 1 (l1) kutoa fedha za tabaka la 1 (l1).
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Marejeleo ya Mikataba ya Nje *
     ********************************/

    address public l1TokenBridge;
```

Fuatilia anwani ya daraja la l1.
Kumbuka kuwa tofauti na sawa na l1, hapa _tunahitaji_ kigezo hiki.
Anwani ya daraja la l1 haijulikani mapema.

```solidity

    /***************
     * Konstrukta *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mjumbe wa kuvuka-kikoa anayetumika na mkataba huu.
     * @param _l1TokenBridge Anwani ya daraja la tabaka la 1 (l1) iliyosambazwa kwenye mnyororo mkuu.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Utoaji *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Vipengele hivi viwili huanzisha utoaji.
Kumbuka kuwa hakuna haja ya kubainisha anwani ya tokeni ya l1.
Tokeni za l2 zinatarajiwa kutuambia anwani sawa ya l1.

```solidity

    /**
     * @dev Inafanya mantiki ya utoaji kwa kuteketeza tokeni na kujulisha
     *      Lango la tokeni la tabaka la 1 (l1) kuhusu utoaji.
     * @param _l2Token Anwani ya tokeni ya tabaka la 2 (l2) ambapo utoaji unaanzishwa.
     * @param _from Akaunti ya kuvuta utoaji kutoka kwenye tabaka la 2 (l2).
     * @param _to Akaunti ya kupewa utoaji kwenye tabaka la 1 (l1).
     * @param _amount Kiasi cha tokeni cha kutoa.
     * @param _l1Gas Haitumiki, lakini imejumuishwa kwa mazingatio ya uwezekano wa utangamano wa mbele.
     * @param _data Data ya hiari ya kusambaza kwenye tabaka la 1 (l1). Data hii inatolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa
     *        kikomo, mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Wakati utoaji unapoanzishwa, tunateketeza fedha za mtoaji ili kuzuia matumizi ya baadaye ya
        // tabaka la 2 (l2)
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Kumbuka kuwa _hatutegemei_ kigezo cha `_from` bali kwenye `msg.sender` ambayo ni ngumu sana kughushi (haiwezekani, kwa kadiri ninavyojua).

```solidity

        // Jenga data za mwito kwa ajili ya l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Kwenye l1 ni muhimu kutofautisha kati ya ETH na ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Tuma ujumbe juu kwenye daraja la tabaka la 1 (l1)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Kazi ya Kuvuka-mnyororo: Uwekaji *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Kipengele hiki kinaitwa na `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Hakikisha chanzo cha ujumbe ni halali.
Hii ni muhimu kwa sababu kipengele hiki huita `_mint` na kinaweza kutumika kutoa tokeni ambazo hazijafunikwa na tokeni ambazo daraja linamiliki kwenye l1.

```solidity
        // Kagua tokeni lengwa inatii na
        // thibitisha tokeni iliyowekwa kwenye tabaka la 1 (l1) inalingana na uwakilishi wa tokeni iliyowekwa ya tabaka la 2 (l2) hapa
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Ukaguzi wa uhalali:

1. Kiolesura sahihi kinasaidiwa
2. Anwani ya l1 ya mkataba wa ERC-20 wa l2 inalingana na chanzo cha l1 cha tokeni

```solidity
        ) {
            // Wakati uwekaji unapokamilishwa, tunaweka kwenye akaunti kwenye tabaka la 2 (l2) kiasi kile kile cha
            // tokeni.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Ikiwa ukaguzi wa uhalali utafaulu, kamilisha uwekaji:

1. Fua tokeni
2. Toa tukio linalofaa

```solidity
        } else {
            // Ama tokeni ya tabaka la 2 (l2) ambayo inawekwa-ndani inatofautiana kuhusu anwani sahihi
            // ya tokeni yake ya tabaka la 1 (l1), au haiauni kiolesura sahihi.
            // Hii inapaswa kutokea tu ikiwa kuna tokeni mbaya ya tabaka la 2 (l2), au ikiwa mtumiaji kwa namna fulani
            // amebainisha anwani isiyo sahihi ya tokeni ya tabaka la 2 (l2) ya kuweka ndani.
            // Katika hali yoyote, tunasimamisha mchakato hapa na kujenga ujumbe wa
            // utoaji ili watumiaji waweze kutoa fedha zao katika baadhi ya matukio.
            // Hakuna njia ya kuzuia mikataba mibaya ya tokeni kabisa, lakini hii inaweka kikomo
            // kwa makosa ya mtumiaji na kupunguza baadhi ya aina za tabia mbaya za mkataba.
```

Ikiwa mtumiaji alifanya kosa linaloweza kutambulika kwa kutumia anwani mbaya ya tokeni ya l2, tunataka kughairi uwekaji na kurudisha tokeni kwenye l1.
Njia pekee tunayoweza kufanya hivi kutoka l2 ni kutuma ujumbe ambao utalazimika kusubiri kipindi cha changamoto ya hitilafu, lakini hiyo ni bora zaidi kwa mtumiaji kuliko kupoteza tokeni kabisa.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // imebadilisha _to na _from hapa ili kurudisha uwekaji kwa mtumaji
                _from,
                _amount,
                _data
            );

            // Tuma ujumbe juu kwenye daraja la tabaka la 1 (l1)
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Hitimisho {#conclusion}

Daraja la kawaida ndio utaratibu unaobadilika zaidi kwa uhamishaji wa rasilimali.
Hata hivyo, kwa sababu ni la jumla sana sio kila wakati utaratibu rahisi zaidi kutumia.
Hasa kwa utoaji, watumiaji wengi wanapendelea kutumia [madaraja ya wahusika wengine](https://optimism.io/apps#bridge) ambayo hayasubiri kipindi cha changamoto na hayahitaji ushahidi wa Merkle kukamilisha utoaji.

Madaraja haya kwa kawaida hufanya kazi kwa kuwa na rasilimali kwenye l1, ambayo hutoa mara moja kwa ada ndogo (mara nyingi chini ya gharama ya gesi kwa utoaji wa daraja la kawaida).
Wakati daraja (au watu wanaoliendesha) linatarajia kupungukiwa na rasilimali za l1 huhamisha rasilimali za kutosha kutoka l2. Kwa kuwa haya ni matoaji makubwa sana, gharama ya utoaji inagawanywa kwa kiasi kikubwa na ni asilimia ndogo sana.

Tunatumai makala haya yamekusaidia kuelewa zaidi kuhusu jinsi tabaka la 2 linavyofanya kazi, na jinsi ya kuandika msimbo wa Solidity ulio wazi na salama.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
