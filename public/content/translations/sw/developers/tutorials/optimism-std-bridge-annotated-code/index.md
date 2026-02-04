---
title: "Mwongozo wa mkataba wa daraja la kawaida la Optimism"
description: Je, daraja la kawaida la Optimism linafanyaje kazi? Kwa nini linafanya kazi kwa njia hii?
author: Ori Pomerantz
tags: [ "uimara", "daraja", "safu ya 2" ]
skill: intermediate
published: 2022-03-30
lang: sw
---

[Optimism](https://www.optimism.io/) ni [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistic rollups zinaweza kuchakata miamala kwa bei ya chini zaidi kuliko Mtandao Mkuu wa Ethereum (pia inajulikana kama safu 1 au L1) kwa sababu miamala inachakatwa na nodi chache tu, badala ya kila nodi kwenye mtandao.
Wakati huo huo, data yote imeandikwa kwa L1 ili kila kitu kiweze kuthibitishwa na kujengwa upya kwa uadilifu wote na dhamana ya upatikanaji wa Mtandao Mkuu.

Ili kutumia rasilimali za L1 kwenye Optimism (au L2 nyingine yoyote), rasilimali zinahitaji [kuvushwa kwa daraja](/bridges/#prerequisites).
Njia moja ya kufanikisha hili ni kwa watumiaji kufunga rasilimali (ETH na [tokeni za ERC-20](/developers/docs/standards/tokens/erc-20/) ndizo za kawaida zaidi) kwenye L1, na kupokea rasilimali sawa za kutumia kwenye L2.
Hatimaye, yeyote atakayeishia nazo anaweza kutaka kuzivusha kwa daraja kurudi L1.
Wakati wa kufanya hivi, rasilimali huchomwa kwenye L2 na kisha kurejeshwa kwa mtumiaji kwenye L1.

Hivi ndivyo [daraja la kawaida la Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) linavyofanya kazi.
Katika makala haya tunapitia msimbo chanzo wa daraja hilo ili kuona jinsi linavyofanya kazi na kulichunguza kama mfano wa msimbo wa Solidity ulioandikwa vizuri.

## Mtiririko wa udhibiti {#control-flows}

Daraja lina mitiririko mikuu miwili:

- Kuweka (kutoka L1 hadi L2)
- Kutoa (kutoka L2 hadi L1)

### Mtiririko wa uwekaji {#deposit-flow}

#### Safu 1 {#deposit-flow-layer-1}

1. Ikiwa unaweka ERC-20, mwekaji anatoa ruhusa kwa daraja kutumia kiasi kinachowekwa
2. Mwekaji anapiga simu daraja la L1 (`depositERC20`, `depositERC20To`, `depositETH`, au `depositETHTo`)
3. Daraja la L1 linachukua umiliki wa rasilimali iliyovushwa kwa daraja
   - ETH: Rasilimali inahamishwa na mwekaji kama sehemu ya simu
   - ERC-20: Rasilimali inahamishwa na daraja kwake yenyewe kwa kutumia ruhusa iliyotolewa na mwekaji
4. Daraja la L1 linatumia utaratibu wa ujumbe wa vikoa tofauti kupiga simu `finalizeDeposit` kwenye daraja la L2

#### Safu 2 {#deposit-flow-layer-2}

5. Daraja la L2 huhakikisha simu kwa `finalizeDeposit` ni halali:
   - Imetoka kwenye mkataba wa ujumbe wa vikoa tofauti
   - Hapo awali ilitoka kwenye daraja kwenye L1
6. Daraja la L2 huangalia ikiwa mkataba wa tokeni ya ERC-20 kwenye L2 ni sahihi:
   - Mkataba wa L2 unaripoti kuwa mwenzake wa L1 ni sawa na ule ambao tokeni zilitoka kwenye L1
   - Mkataba wa L2 unaripoti kuwa unaauni kiolesura sahihi ([kwa kutumia ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Ikiwa mkataba wa L2 ni sahihi, piga simu ili kutoa idadi ifaayo ya tokeni kwa anwani ifaayo. Ikiwa sivyo, anza mchakato wa kutoa ili kumruhusu mtumiaji kudai tokeni kwenye L1.

### Mtiririko wa utoaji {#withdrawal-flow}

#### Safu 2 {#withdrawal-flow-layer-2}

1. Mtoaji anapiga simu daraja la L2 (`withdraw` au `withdrawTo`)
2. Daraja la L2 huchoma idadi ifaayo ya tokeni za `msg.sender`
3. Daraja la L2 hutumia utaratibu wa ujumbe wa vikoa tofauti kupiga simu `finalizeETHWithdrawal` au `finalizeERC20Withdrawal` kwenye daraja la L1

#### Safu 1 {#withdrawal-flow-layer-1}

4. Daraja la L1 huhakikisha simu kwa `finalizeETHWithdrawal` au `finalizeERC20Withdrawal` ni halali:
   - Imetoka kwenye utaratibu wa ujumbe wa vikoa tofauti
   - Hapo awali ilitoka kwenye daraja kwenye L2
5. Daraja la L1 huhamisha rasilimali ifaayo (ETH au ERC-20) kwa anwani ifaayo

## Msimbo wa Safu 1 {#layer-1-code}

Huu ndio msimbo unaoendeshwa kwenye L1, Mtandao Mkuu wa Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Kiolesura hiki kimefafanuliwa hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Inajumuisha kazi na ufafanuzi unaohitajika kwa kuvusha tokeni za ERC-20 kwa daraja.

```solidity
// SPDX-License-Identifier: MIT
```

[Sehemu kubwa ya msimbo wa Optimism hutolewa chini ya leseni ya MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Wakati wa kuandika toleo la hivi karibuni la Solidity ni 0.8.12.
Hadi toleo la 0.9.0 litolewe, hatujui kama msimbo huu unaendana nalo au la.

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

Katika istilahi za daraja la Optimism _kuweka_ kunamaanisha uhamisho kutoka L1 hadi L2, na _kutoa_ kunamaanisha uhamisho kutoka L2 hadi L1.

```solidity
        anwani iliyoorodheshwa _l1Token,
        anwani iliyoorodheshwa _l2Token,
```

Katika hali nyingi anwani ya ERC-20 kwenye L1 si sawa na anwani ya ERC-20 inayolingana kwenye L2.
[Unaweza kuona orodha ya anwani za tokeni hapa](https://static.optimism.io/optimism.tokenlist.json).
Anwani yenye `chainId` 1 iko kwenye L1 (Mtandao Mkuu) na anwani yenye `chainId` 10 iko kwenye L2 (Optimism).
Thamani zingine mbili za `chainId` ni za mtandao wa majaribio wa Kovan (42) na mtandao wa majaribio wa Optimistic Kovan (69).

```solidity
        anwani iliyoorodheshwa _from,
        anwani _to,
        uint256 _amount,
        bytes _data
    );
```

Inawezekana kuongeza maelezo kwenye uhamisho, ambapo huongezwa kwenye matukio yanayoyaripoti.

```solidity
    event ERC20WithdrawalFinalized(
        anwani iliyoorodheshwa _l1Token,
        anwani iliyoorodheshwa _l2Token,
        anwani iliyoorodheshwa _from,
        anwani _to,
        uint256 _amount,
        bytes _data
    );
```

Mkataba huo huo wa daraja hushughulikia uhamisho katika pande zote mbili.
Kwa upande wa daraja la L1, hii inamaanisha uanzishaji wa uwekaji na ukamilishaji wa utoaji.

```solidity

    /********************
     * Kazi za Umma *
     ********************/

    /**
     * @dev pata anwani ya mkataba wa daraja la L2 unaolingana.
     * @return Anwani ya mkataba wa daraja la L2 unaolingana.
     */
    function l2TokenBridge() external returns (anwani);
```

Kazi hii haihitajiki sana, kwa sababu kwenye L2 ni mkataba uliotumwa awali, kwa hivyo huwa kwenye anwani `0x4200000000000000000000000000000000000010`.
Iko hapa kwa ulinganifu na daraja la L2, kwa sababu anwani ya daraja la L1 si rahisi kujua.

```solidity
    /**
     * @dev weka kiasi cha ERC20 kwenye salio la mpigaji simu kwenye L2.
     * @param _l1Token Anwani ya ERC20 ya L1 tunayoweka
     * @param _l2Token Anwani ya ERC20 ya L2 inayolingana na L1
     * @param _amount Kiasi cha ERC20 cha kuweka
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye L2.
     * @param _data Data ya hiari ya kupeleka kwa L2. Data hii hutolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *        mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function depositERC20(
        anwani _l1Token,
        anwani _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Kigezo cha `_l2Gas` ni kiasi cha gesi ya L2 ambacho muamala unaruhusiwa kutumia.
[Hadi kikomo fulani (cha juu), hii ni bure](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), kwa hivyo isipokuwa mkataba wa ERC-20 unafanya jambo la ajabu sana wakati wa kutoa, haipaswi kuwa suala.
Kazi hii inashughulikia hali ya kawaida, ambapo mtumiaji huvusha rasilimali kwa daraja kwenda anwani ileile kwenye mnyororo wa bloku tofauti.

```solidity
    /**
     * @dev weka kiasi cha ERC20 kwenye salio la mpokeaji kwenye L2.
     * @param _l1Token Anwani ya ERC20 ya L1 tunayoweka
     * @param _l2Token Anwani ya ERC20 ya L2 inayolingana na L1
     * @param _to Anwani ya L2 ya kuweka utoaji.
     * @param _amount Kiasi cha ERC20 cha kuweka.
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye L2.
     * @param _data Data ya hiari ya kupeleka kwa L2. Data hii hutolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *        mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function depositERC20To(
        anwani _l1Token,
        anwani _l2Token,
        anwani _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Kazi hii ni karibu sawa na `depositERC20`, lakini inakuwezesha kutuma ERC-20 kwa anwani tofauti.

```solidity
    /*************************
     * Kazi za Mnyororo-Msalaba *
     *************************/

    /**
     * @dev Kamilisha utoaji kutoka L2 hadi L1, na weka fedha kwenye salio la mpokeaji la
     * tokeni ya L1 ERC20.
     * Simu hii itashindwa ikiwa utoaji ulioanzishwa kutoka L2 haujakamilishwa.
     *
     * @param _l1Token Anwani ya tokeni ya L1 ya kukamilisha utoaji.
     * @param _l2Token Anwani ya tokeni ya L2 ambapo utoaji ulianzishwa.
     * @param _from Anwani ya L2 inayoanzisha uhamisho.
     * @param _to Anwani ya L1 ya kuweka utoaji.
     * @param _amount Kiasi cha ERC20 cha kuweka.
     * @param _data Data iliyotolewa na mtumaji kwenye L2. Data hii hutolewa
     *   kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *   mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function finalizeERC20Withdrawal(
        anwani _l1Token,
        anwani _l2Token,
        anwani _from,
        anwani _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Utoaji (na ujumbe mwingine kutoka L2 hadi L1) katika Optimism ni mchakato wa hatua mbili:

1. Muamala wa kuanzisha kwenye L2.
2. Muamala wa ukamilishaji au kudai kwenye L1.
   Muamala huu unahitaji kufanyika baada ya [kipindi cha changamoto ya makosa](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) kwa muamala wa L2 kuisha.

### IL1StandardBridge {#il1standardbridge}

[Kiolesura hiki kimefafanuliwa hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Faili hili lina ufafanuzi wa matukio na kazi kwa ETH.
Ufafanuzi huu unafanana sana na ule uliofafanuliwa katika `IL1ERC20Bridge` hapo juu kwa ERC-20.

Kiolesura cha daraja kimegawanywa kati ya faili mbili kwa sababu baadhi ya tokeni za ERC-20 zinahitaji usindikaji maalum na haziwezi kushughulikiwa na daraja la kawaida.
Kwa njia hii daraja maalum linaloshughulikia tokeni kama hiyo linaweza kutekeleza `IL1ERC20Bridge` na sio lazima pia kuvusha ETH kwa daraja.

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
        anwani iliyoorodheshwa _from,
        anwani iliyoorodheshwa _to,
        uint256 _amount,
        bytes _data
    );
```

Tukio hili ni karibu sawa na toleo la ERC-20 (`ERC20DepositInitiated`), isipokuwa bila anwani za tokeni za L1 na L2.
Hali kadhalika kwa matukio mengine na kazi.

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
     * @dev Weka kiasi cha ETH kwenye salio la mpigaji simu kwenye L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Weka kiasi cha ETH kwenye salio la mpokeaji kwenye L2.
            .
            .
            .
     */
    function depositETHTo(
        anwani _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Kazi za Mnyororo-Msalaba *
     *************************/

    /**
     * @dev Kamilisha utoaji kutoka L2 hadi L1, na weka fedha kwenye salio la mpokeaji la
     * tokeni ya L1 ETH. Kwa kuwa ni xDomainMessenger pekee anayeweza kupiga simu kazi hii, haitapigwa kamwe
     * kabla ya utoaji kukamilishwa.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        anwani _from,
        anwani _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Mkataba huu](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) unarithiwa na madaraja yote mawili ([L1](#the-l1-bridge-contract) na [L2](#the-l2-bridge-contract)) kutuma ujumbe kwa safu nyingine.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) kinaeleza mkataba jinsi ya kutuma ujumbe kwa safu nyingine, kwa kutumia mtumaji ujumbe wa vikoa tofauti.
Mtumaji ujumbe huu wa vikoa tofauti ni mfumo mwingine kabisa, na unastahili makala yake, ambayo natumai kuandika katika siku zijazo.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Mkataba msaidizi kwa mikataba inayofanya mawasiliano ya vikoa tofauti
 *
 * Mkusanyaji uliotumika: umefafanuliwa na mkataba unaorithi
 */
contract CrossDomainEnabled {
    /*************
     * Vigeu *
     *************/

    // Mkataba wa Mtumaji Ujumbe unaotumika kutuma na kupokea ujumbe kutoka kwa kikoa kingine.
    anwani public messenger;

    /***************
     * Kijenzi *
     ***************/

    /**
     * @param _messenger Anwani ya CrossDomainMessenger kwenye safu ya sasa.
     */
    constructor(anwani _messenger) {
        messenger = _messenger;
    }
```

Kigezo kimoja ambacho mkataba unahitaji kujua, anwani ya mtumaji ujumbe wa vikoa tofauti kwenye safu hii.
Kigezo hiki kinawekwa mara moja, katika kijenzi, na hakibadiliki kamwe.

```solidity

    /**********************
     * Virekebishaji Kazi *
     **********************/

    /**
     * Hutekeleza kwamba kazi iliyorekebishwa inaweza kupigwa simu tu na akaunti maalum ya kikoa tofauti.
     * @param _sourceDomainAccount Akaunti pekee kwenye kikoa cha asili ambayo
     *  imethibitishwa kupiga simu kazi hii.
     */
    modifier onlyFromCrossDomainAccount(anwani _sourceDomainAccount) {
```

Ujumbe wa vikoa tofauti unaweza kufikiwa na mkataba wowote kwenye mnyororo wa bloku ambapo unaendeshwa (iwe Mtandao Mkuu wa Ethereum au Optimism).
Lakini tunahitaji daraja kwa kila upande _tu_ kuamini ujumbe fulani ikiwa unatoka kwenye daraja kwa upande mwingine.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: mkataba wa mtumaji ujumbe haujathibitishwa"
        );
```

Ujumbe tu kutoka kwa mtumaji ujumbe wa vikoa tofauti unaofaa (`messenger`, kama unavyoona hapa chini) unaweza kuaminiwa.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: mtumaji asiye sahihi wa ujumbe wa kikoa tofauti"
        );
```

Njia ambayo mtumaji ujumbe wa vikoa tofauti anatoa anwani iliyotuma ujumbe na safu nyingine ni [kazi ya `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Muda wote inapoitwa katika muamala ulioanzishwa na ujumbe inaweza kutoa habari hii.

Tunahitaji kuhakikisha kuwa ujumbe tuliopokea ulitoka kwenye daraja lingine.

```solidity

        _;
    }

    /**********************
     * Kazi za Ndani *
     **********************/

    /**
     * Hupata mtumaji ujumbe, kawaida kutoka kwenye hifadhi. Kazi hii inawekwa wazi iwapo mkataba mtoto
     * unahitaji kubatilisha.
     * @rejesha Anwani ya mkataba wa mtumaji ujumbe wa vikoa tofauti ambayo inapaswa kutumika.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Kazi hii inarejesha mtumaji ujumbe wa vikoa tofauti.
Tunatumia kazi badala ya kigezo `messenger` kuruhusu mikataba inayorithi kutoka kwa hii kutumia algoriti kubainisha ni mtumaji ujumbe gani wa vikoa tofauti wa kutumia.

```solidity

    /**
     * Hutuma ujumbe kwa akaunti kwenye kikoa kingine
     * @param _crossDomainTarget Mpokeaji aliyekusudiwa kwenye kikoa lengwa
     * @param _message Data ya kutuma kwa lengo (kawaida calldata kwa kazi yenye
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Kikomo cha gesi kwa risiti ya ujumbe kwenye kikoa lengwa.
     */
    function sendCrossDomainMessage(
        anwani _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Hatimaye, kazi inayotuma ujumbe kwa safu nyingine.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ni kichanganuzi tuli ambacho Optimism huendesha kwenye kila mkataba kutafuta udhaifu na matatizo mengine yanayoweza kutokea.
Katika kesi hii, mstari unaofuata unasababisha udhaifu mbili:

1. [Matukio ya Kuingia Tena](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Kuingia tena kusiko na madhara](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Katika kesi hii hatuna wasiwasi kuhusu kuingia tena tunajua `getCrossDomainMessenger()` inarejesha anwani inayoaminika, hata kama Slither haina njia ya kujua hilo.

### Mkataba wa daraja la L1 {#the-l1-bridge-contract}

[Msimbo chanzo wa mkataba huu uko hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Violesura vinaweza kuwa sehemu ya mikataba mingine, kwa hivyo vinapaswa kuunga mkono anuwai ya matoleo ya Solidity.
Lakini daraja lenyewe ni mkataba wetu, na tunaweza kuwa wakali kuhusu toleo gani la Solidity linatumia.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) na [IL1StandardBridge](#IL1StandardBridge) zimeelezwa hapo juu.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) kinaturuhusu kuunda ujumbe wa kudhibiti daraja la kawaida kwenye L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Kiolesura hiki](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) kinaturuhusu kudhibiti mikataba ya ERC-20.
[Unaweza kusoma zaidi kuhusu hilo hapa](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Kama ilivyoelezwa hapo juu](#crossdomainenabled), mkataba huu unatumika kwa ujumbe wa kati ya safu.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) ina anwani za mikataba ya L2 ambayo huwa na anwani sawa kila wakati. Hii inajumuisha daraja la kawaida kwenye L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Huduma za Anwani za OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Inatumika kutofautisha kati ya anwani za mkataba na zile za akaunti zinazomilikiwa na watu wa nje (EOA).

Kumbuka kuwa hili si suluhisho kamilifu, kwa sababu hakuna njia ya kutofautisha kati ya simu za moja kwa moja na simu zilizopigwa kutoka kwa kijenzi cha mkataba, lakini angalau hii inatuwezesha kutambua na kuzuia baadhi ya makosa ya kawaida ya watumiaji.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Kiwango cha ERC-20](https://eips.ethereum.org/EIPS/eip-20) kinaauni njia mbili kwa mkataba kuripoti kutofaulu:

1. Batilisha
2. Rejesha `false`

Kushughulikia kesi zote mbili kungefanya msimbo wetu kuwa mgumu zaidi, kwa hivyo badala yake tunatumia [`SafeERC20` ya OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), ambayo inahakikisha [kushindwa kote kunasababisha ubatilishaji](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH na ERC20 Bridge ni mkataba unaohifadhi fedha za L1 zilizowekwa na tokeni za kawaida
 * ambazo zinatumika kwenye L2. Inasawazisha Daraja la L2 linalolingana, kulijulisha kuhusu uwekaji
 * na kulisikiliza kwa utoaji mpya uliokamilishwa.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Mstari huu ndivyo tunavyobainisha kutumia kifuniko cha `SafeERC20` kila tunapotumia kiolesura cha `IERC20`.

```solidity

    /********************************
     * Marejeleo ya Mkataba wa Nje *
     ********************************/

    anwani public l2TokenBridge;
```

Anwani ya [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Ramani za tokeni ya L1 kwa tokeni ya L2 kwa salio la tokeni ya L1 iliyowekwa
    mapping(anwani => mapping(anwani => uint256)) public deposits;
```

Ramani maradufu kama hii ndiyo njia unayofafanua [safu ya pande mbili isiyo na mpangilio](https://en.wikipedia.org/wiki/Sparse_matrix).
Thamani katika muundo huu wa data zinatambuliwa kama `deposit[anwani ya tokeni ya L1][anwani ya tokeni ya L2]`.
Thamani chaguo-msingi ni sufuri.
Seli tu zilizowekwa kwa thamani tofauti ndizo huandikwa kwenye hifadhi.

```solidity

    /***************
     * Kijenzi *
     ***************/

    // Mkataba huu unaishi nyuma ya wakala, kwa hivyo vigezo vya kijenzi havitatumika.
    constructor() CrossDomainEnabled(anwani(0)) {}
```

Ili kutaka kuweza kusasisha mkataba huu bila kulazimika kunakili vigezo vyote kwenye hifadhi.
Ili kufanya hivyo tunatumia [`Wakala`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), mkataba unaotumia [`delegatecall`](https://solidity-by-example.org/delegatecall/) kuhamisha simu kwa mkataba tofauti ambao anwani yake imehifadhiwa na mkataba wa wakala (unaposasisha unamwambia wakala kubadilisha anwani hiyo).
Unapotumia `delegatecall` hifadhi inabaki kuwa hifadhi ya mkataba _unaopiga simu_, kwa hivyo thamani za vigezo vyote vya hali ya mkataba haziathiriwi.

Moja ya athari za muundo huu ni kwamba hifadhi ya mkataba ambao ni _uliopigiwa simu_ wa `delegatecall` haitumiwi na kwa hivyo thamani za kijenzi zilizopitishwa kwake hazijalishi.
Hii ndiyo sababu tunaweza kutoa thamani isiyo na maana kwa kijenzi cha `CrossDomainEnabled`.
Pia ndiyo sababu uanzishaji hapa chini umetenganishwa na kijenzi.

```solidity
    /******************
     * Uanzishaji *
     ******************/

    /**
     * @param _l1messenger Anwani ya L1 Messenger inayotumika kwa mawasiliano ya mnyororo-msalaba.
     * @param _l2TokenBridge Anwani ya daraja la kawaida la L2.
     */
    // slither-disable-next-line external-function
```

[Jaribio hili la Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) linatambua kazi ambazo hazipigwi simu kutoka kwa msimbo wa mkataba na kwa hivyo zinaweza kutangazwa kuwa `za nje` badala ya `za umma`.
Gharama ya gesi ya kazi za `nje` inaweza kuwa chini, kwa sababu zinaweza kupewa vigezo katika calldata.
Kazi zilizotangazwa kuwa `za umma` zinapaswa kufikiwa kutoka ndani ya mkataba.
Mikataba haiwezi kurekebisha calldata zao wenyewe, kwa hivyo vigezo vinapaswa kuwa kwenye kumbukumbu.
Wakati kazi kama hiyo inapoitwa kutoka nje, ni muhimu kunakili calldata kwenye kumbukumbu, ambayo inagharimu gesi.
Katika kesi hii kazi inaitwa mara moja tu, kwa hivyo ufanisi haujalishi kwetu.

```solidity
    function initialize(anwani _l1messenger, anwani _l2TokenBridge) public {
        require(messenger == address(0), "Mkataba tayari umeanzishwa.");
```

Kazi ya `initialize` inapaswa kuitwa mara moja tu.
Ikiwa anwani ya mtumaji ujumbe wa vikoa tofauti wa L1 au daraja la tokeni la L2 itabadilika, tunaunda wakala mpya na daraja jipya linaloiita.
Hili haliwezekani kutokea isipokuwa mfumo mzima unaposasishwa, tukio la nadra sana.

Kumbuka kuwa kazi hii haina utaratibu wowote unaozuia _nani_ anaweza kuiita.
Hii inamaanisha kuwa kwa nadharia mshambuliaji anaweza kusubiri hadi tutumie wakala na toleo la kwanza la daraja na kisha [kufanya shughuli haraka](https://solidity-by-example.org/hacks/front-running/) kufikia kazi ya `initialize` kabla ya mtumiaji halali kufanya hivyo. Lakini kuna njia mbili za kuzuia hili:

1. Ikiwa mikataba haitumwi moja kwa moja na EOA lakini [katika muamala ambao una mkataba mwingine uwaumbe](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) mchakato mzima unaweza kuwa wa atomiki, na kumalizika kabla ya muamala mwingine wowote kutekelezwa.
2. Ikiwa simu halali kwa `initialize` itashindwa daima inawezekana kupuuza wakala na daraja jipya lililoundwa na kuunda mpya.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Hivi ni vigezo viwili ambavyo daraja linahitaji kujua.

```solidity

    /**************
     * Uwekaji *
     **************/

    /** @dev Kirekebishaji kinachohitaji mtumaji awe EOA.  Ukaguzi huu unaweza kuepukwa na mkataba hasidi
     *  kupitia initcode, lakini inashughulikia kosa la mtumiaji tunalotaka kuepuka.
     */
    modifier onlyEOA() {
        // Inatumika kusimamisha uwekaji kutoka kwa mikataba (epuka tokeni zilizopotea kwa bahati mbaya)
        require(!Address.isContract(msg.sender), "Akaunti si EOA");
        _;
    }
```

Hii ndiyo sababu tulihitaji huduma za `Anwani` za OpenZeppelin.

```solidity
    /**
     * @dev Kazi hii inaweza kuitwa bila data
     * kuweka kiasi cha ETH kwenye salio la mpigaji simu kwenye L2.
     * Kwa kuwa kazi ya kupokea haichukui data, kiasi
     * chaguo-msingi cha kihafidhina hupelekwa L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Kazi hii ipo kwa madhumuni ya majaribio.
Kumbuka kuwa haionekani katika ufafanuzi wa kiolesura - si kwa matumizi ya kawaida.

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
        anwani _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Kazi hizi mbili ni vifuniko vinavyozunguka `_initiateETHDeposit`, kazi inayoshughulikia uwekaji halisi wa ETH.

```solidity
    /**
     * @dev Hufanya mantiki ya uwekaji kwa kuhifadhi ETH na kumjulisha Lango la ETH la L2 kuhusu
     * uwekaji.
     * @param _from Akaunti ya kuchukua uwekaji kutoka L1.
     * @param _to Akaunti ya kumpa uwekaji kwenye L2.
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye L2.
     * @param _data Data ya hiari ya kupeleka kwa L2. Data hii hutolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *        mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateETHDeposit(
        anwani _from,
        anwani _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Jenga calldata kwa simu ya finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Njia ambayo ujumbe wa vikoa tofauti hufanya kazi ni kwamba mkataba lengwa unaitwa na ujumbe kama calldata yake.
Mikataba ya Solidity daima hutafsiri calldata zao kulingana na
[vipimo vya ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Kazi ya Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) huunda calldata hiyo.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            anwani(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Ujumbe hapa ni kupiga simu [kazi ya `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) na vigezo hivi:

| Kigezo                          | Thamani                                                                                  | Maana                                                                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | anwani(0)                                                             | Thamani maalum ya kuwakilisha ETH (ambayo si tokeni ya ERC-20) kwenye L1                                                                             |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Mkataba wa L2 unaosimamia ETH kwenye Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (mkataba huu ni kwa matumizi ya ndani ya Optimism pekee) |
| \_kutoka  | \_kutoka                                                           | Anwani kwenye L1 inayotuma ETH                                                                                                                                          |
| \_kwa     | \_kwa                                                              | Anwani kwenye L2 inayopokea ETH                                                                                                                                         |
| kiasi                           | msg.value                                                                | Kiasi cha wei kilichotumwa (ambacho tayari kimetumwa kwenye daraja)                                                                                  |
| \_data    | \_data                                                             | Data ya ziada ya kuambatisha kwenye uwekaji                                                                                                                             |

```solidity
        // Tuma calldata kwenye L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, ujumbe);
```

Tuma ujumbe kupitia mtumaji ujumbe wa vikoa tofauti.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Toa tukio la kujulisha programu yoyote iliyogatuliwa inayosikiliza kuhusu uhamisho huu.

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

Kazi hizi mbili ni vifuniko vinavyozunguka `_initiateERC20Deposit`, kazi inayoshughulikia uwekaji halisi wa ERC-20.

```solidity
    /**
     * @dev Hufanya mantiki ya uwekaji kwa kumjulisha mkataba wa Tokeni Iliyowekwa ya L2
     * kuhusu uwekaji na kuita mshughulikiaji kufunga fedha za L1. (k.m., transferFrom)
     *
     * @param _l1Token Anwani ya ERC20 ya L1 tunayoweka
     * @param _l2Token Anwani ya ERC20 ya L2 inayolingana na L1
     * @param _from Akaunti ya kuchukua uwekaji kutoka L1
     * @param _to Akaunti ya kumpa uwekaji kwenye L2
     * @param _amount Kiasi cha ERC20 cha kuweka.
     * @param _l2Gas Kikomo cha gesi kinachohitajika kukamilisha uwekaji kwenye L2.
     * @param _data Data ya hiari ya kupeleka kwa L2. Data hii hutolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *        mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateERC20Deposit(
        anwani _l1Token,
        anwani _l2Token,
        anwani _from,
        anwani _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Kazi hii inafanana na `_initiateETHDeposit` hapo juu, na tofauti chache muhimu.
Tofauti ya kwanza ni kwamba kazi hii inapokea anwani za tokeni na kiasi cha kuhamisha kama vigezo.
Kwa upande wa ETH simu kwa daraja tayari inajumuisha uhamisho wa rasilimali kwenda akaunti ya daraja (`msg.value`).

```solidity
        // Uwekaji unapoanzishwa kwenye L1, Daraja la L1 huhamisha fedha kwake lenyewe kwa ajili ya
        // utoaji wa siku zijazo. safeTransferFrom pia huangalia ikiwa mkataba una msimbo, kwa hivyo hii itashindwa ikiwa
        // _from ni EOA au anwani(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Uhamisho wa tokeni za ERC-20 hufuata mchakato tofauti na ETH:

1. Mtumiaji (`_from`) anatoa ruhusa kwa daraja kuhamisha tokeni zinazofaa.
2. Mtumiaji anapiga simu daraja na anwani ya mkataba wa tokeni, kiasi, n.k.
3. Daraja linahamisha tokeni (kwake lenyewe) kama sehemu ya mchakato wa uwekaji.

Hatua ya kwanza inaweza kutokea katika muamala tofauti na mbili za mwisho.
Hata hivyo, uendeshaji-wa-mbele si tatizo kwa sababu kazi mbili zinazoita `_initiateERC20Deposit` (`depositERC20` na `depositERC20To`) huita kazi hii tu na `msg.sender` kama kigezo cha `_from`.

```solidity
        // Jenga calldata kwa _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Tuma calldata kwenye L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, ujumbe);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Ongeza kiasi cha tokeni zilizowekwa kwenye muundo wa data wa `deposits`.
Kunaweza kuwa na anwani nyingi kwenye L2 zinazolingana na tokeni ileile ya L1 ERC-20, kwa hivyo haitoshi kutumia salio la daraja la tokeni ya L1 ERC-20 kufuatilia uwekaji.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Kazi za Mnyororo-Msalaba *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        anwani _from,
        anwani _to,
        uint256 _amount,
        bytes calldata _data
```

Daraja la L2 hutuma ujumbe kwa mtumaji ujumbe wa vikoa tofauti wa L2 ambao husababisha mtumaji ujumbe wa vikoa tofauti wa L1 kupiga simu kazi hii (mara tu [muamala unaokamilisha ujumbe](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) utakapowasilishwa kwenye L1, bila shaka).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Hakikisha kuwa huu ni ujumbe _halali_, unaotoka kwa mtumaji ujumbe wa vikoa tofauti na unaotokana na daraja la tokeni la L2.
Kazi hii inatumika kutoa ETH kutoka kwa daraja, kwa hivyo tunapaswa kuhakikisha inaitwa tu na mpigaji simu aliyeidhinishwa.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Njia ya kuhamisha ETH ni kumpigia simu mpokeaji na kiasi cha wei katika `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: Uhamisho wa ETH umeshindwa");

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
        anwani _l1Token,
        anwani _l2Token,
        anwani _from,
        anwani _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Kazi hii inafanana na `finalizeETHWithdrawal` hapo juu, na mabadiliko muhimu kwa tokeni za ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Sasisha muundo wa data wa `deposits`.

```solidity
        // Utoaji unapokamilishwa kwenye L1, Daraja la L1 huhamisha fedha kwa mtoaji
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Ya muda - Kuhamisha ETH *
     *****************************/

    /**
     * @dev Huongeza salio la ETH kwenye akaunti. Hii inakusudiwa kuruhusu ETH
     * kuhamishwa kutoka lango la zamani hadi lango jipya.
     * KUMBUKA: Hii imeachwa kwa sasisho moja tu ili tuweze kupokea ETH iliyohamishwa kutoka
     * mkataba wa zamani
     */
    function donateETH() external payable {}
}
```

Kulikuwa na utekelezaji wa awali wa daraja.
Tulipohamia kutoka kwa utekelezaji huo hadi huu, tulilazimika kuhamisha rasilimali zote.
Tokeni za ERC-20 zinaweza tu kuhamishwa.
Hata hivyo, ili kuhamisha ETH kwa mkataba unahitaji idhini ya mkataba huo, ambayo ndiyo `donateETH` inatupatia.

## Tokeni za ERC-20 kwenye L2 {#erc-20-tokens-on-l2}

Ili tokeni ya ERC-20 iingie kwenye daraja la kawaida, inahitaji kuruhusu daraja la kawaida, na _tu_ daraja la kawaida, kutoa tokeni.
Hii ni muhimu kwa sababu madaraja yanahitaji kuhakikisha kuwa idadi ya tokeni zinazozunguka kwenye Optimism ni sawa na idadi ya tokeni zilizofungwa ndani ya mkataba wa daraja la L1.
Ikiwa kuna tokeni nyingi sana kwenye L2 baadhi ya watumiaji wasingeweza kuvusha rasilimali zao kwa daraja kurudi L1.
Badala ya daraja linaloaminika, kimsingi tungeunda upya [benki ya hifadhi ya sehemu](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Ikiwa kuna tokeni nyingi sana kwenye L1, baadhi ya tokeni hizo zingebaki zimefungwa ndani ya mkataba wa daraja milele kwa sababu hakuna njia ya kuzitoa bila kuchoma tokeni za L2.

### IL2StandardERC20 {#il2standarderc20}

Kila tokeni ya ERC-20 kwenye L2 inayotumia daraja la kawaida inahitaji kutoa [kiolesura hiki](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), ambacho kina kazi na matukio ambayo daraja la kawaida linahitaji.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Kiolesura cha kawaida cha ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) hakijumuishi kazi za `mint` na `burn`.
Njia hizo hazihitajiki na [kiwango cha ERC-20](https://eips.ethereum.org/EIPS/eip-20), ambacho kinaacha taratibu za kuunda na kuharibu tokeni bila kubainishwa.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Kiolesura cha ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) kinatumika kubainisha kazi ambazo mkataba unatoa.
[Unaweza kusoma kiwango hapa](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (anwani);
```

Kazi hii inatoa anwani ya tokeni ya L1 ambayo imevushwa kwa daraja kwenda mkataba huu.
Kumbuka kuwa hatuna kazi kama hiyo kwa upande mwingine.
Tunahitaji kuweza kuvusha kwa daraja tokeni yoyote ya L1, bila kujali kama msaada wa L2 ulipangwa wakati ilitekelezwa au la.

```solidity

    function mint(anwani _to, uint256 _amount) external;

    function burn(anwani _from, uint256 _amount) external;

    event Mint(anwani iliyoorodheshwa _account, uint256 _amount);
    event Burn(anwani iliyoorodheshwa _account, uint256 _amount);
}
```

Kazi na matukio ya kutoa (kuunda) na kuchoma (kuharibu) tokeni.
Daraja linapaswa kuwa chombo pekee kinachoweza kuendesha kazi hizi ili kuhakikisha idadi ya tokeni ni sahihi (sawa na idadi ya tokeni zilizofungwa kwenye L1).

### L2StandardERC20 {#L2StandardERC20}

[Huu ndio utekelezaji wetu wa kiolesura cha `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Isipokuwa unahitaji aina fulani ya mantiki maalum, unapaswa kutumia hii.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Mkataba wa OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism haiamini katika kuunda upya gurudumu, hasa wakati gurudumu limekaguliwa vizuri na linahitaji kuwa la kuaminika vya kutosha kushikilia rasilimali.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    anwani public l1Token;
    anwani public l2Bridge;
```

Hivi ni vigezo viwili vya ziada vya usanidi ambavyo tunahitaji na ERC-20 kawaida haihitaji.

```solidity

    /**
     * @param _l2Bridge Anwani ya daraja la kawaida la L2.
     * @param _l1Token Anwani ya tokeni ya L1 inayolingana.
     * @param _name jina la ERC20.
     * @param _symbol alama ya ERC20.
     */
    constructor(
        anwani _l2Bridge,
        anwani _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Kwanza piga simu kijenzi cha mkataba tunachorithi kutoka (`ERC20(_name, _symbol)`) na kisha weka vigezo vyetu wenyewe.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Ni Daraja la L2 pekee linaweza kutoa na kuchoma");
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
Kila kiolesura ni idadi ya kazi zinazoungwa mkono, na kinatambuliwa kama [au ya kipekee](https://en.wikipedia.org/wiki/Exclusive_or) ya [viteuzi vya kazi vya ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) vya kazi hizo.

Daraja la L2 linatumia ERC-165 kama ukaguzi wa usalama kuhakikisha kuwa mkataba wa ERC-20 ambao linatuma rasilimali ni `IL2StandardERC20`.

**Kumbuka:** Hakuna kinachozuia mkataba hasidi kutoa majibu ya uwongo kwa `supportsInterface`, kwa hivyo huu ni utaratibu wa ukaguzi wa usalama, _sio_ utaratibu wa usalama.

```solidity
    // slither-disable-next-line external-function
    function mint(anwani _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(anwani _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Ni daraja la L2 pekee linaloruhusiwa kutoa na kuchoma rasilimali.

`_mint` na `_burn` kwa kweli zimefafanuliwa katika [mkataba wa OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Mkataba huo hauwaweki wazi nje, kwa sababu masharti ya kutoa na kuchoma tokeni ni tofauti kama idadi ya njia za kutumia ERC-20.

## Msimbo wa Daraja la L2 {#l2-bridge-code}

Huu ni msimbo unaoendesha daraja kwenye Optimism.
[Chanzo cha mkataba huu kiko hapa](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Kiolesura cha [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) kinafanana sana na [sawa ya L1](#IL1ERC20Bridge) tuliyoona hapo juu.
Kuna tofauti mbili muhimu:

1. Kwenye L1 unaanzisha uwekaji na kukamilisha utoaji.
   Hapa unaanzisha utoaji na kukamilisha uwekaji.
2. Kwenye L1 ni muhimu kutofautisha kati ya ETH na tokeni za ERC-20.
   Kwenye L2 tunaweza kutumia kazi zile zile kwa zote mbili kwa sababu ndani ya Optimism salio za ETH hushughulikiwa kama tokeni ya ERC-20 yenye anwani [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Daraja la Kawaida la L2 ni mkataba unaofanya kazi pamoja na daraja la Kawaida la L1
 * kuwezesha mabadiliko ya ETH na ERC20 kati ya L1 na L2.
 * Mkataba huu hufanya kazi kama mtoaji wa tokeni mpya inaposikia kuhusu uwekaji kwenye daraja la Kawaida la L1
 *.
 * Mkataba huu pia hufanya kazi kama mchomaji wa tokeni zilizokusudiwa kwa utoaji, ukijulisha daraja la L1
 * kutoa fedha za L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Marejeleo ya Mkataba wa Nje *
     ********************************/

    anwani public l1TokenBridge;
```

Fuatilia anwani ya daraja la L1.
Kumbuka kuwa tofauti na sawa ya L1, hapa _tunahitaji_ kigezo hiki.
Anwani ya daraja la L1 haijulikani mapema.

```solidity

    /***************
     * Kijenzi *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mtumaji ujumbe wa vikoa tofauti unaotumiwa na mkataba huu.
     * @param _l1TokenBridge Anwani ya daraja la L1 iliyotumwa kwenye mnyororo mkuu.
     */
    constructor(anwani _l2CrossDomainMessenger, anwani _l1TokenBridge)
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
        anwani _l2Token,
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
        anwani _l2Token,
        anwani _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Kazi hizi mbili zinaanzisha utoaji.
Kumbuka kuwa hakuna haja ya kubainisha anwani ya tokeni ya L1.
Tokeni za L2 zinatarajiwa kutuambia anwani sawa ya L1.

```solidity

    /**
     * @dev Hufanya mantiki ya utoaji kwa kuchoma tokeni na kumjulisha
     *      Lango la tokeni la L1 kuhusu utoaji.
     * @param _l2Token Anwani ya tokeni ya L2 ambapo utoaji unaanzishwa.
     * @param _from Akaunti ya kuchukua utoaji kutoka L2.
     * @param _to Akaunti ya kumpa utoaji kwenye L1.
     * @param _amount Kiasi cha tokeni ya kutoa.
     * @param _l1Gas Haijatumiwa, lakini imejumuishwa kwa mazingatio ya utangamano wa mbele.
     * @param _data Data ya hiari ya kupeleka kwa L1. Data hii hutolewa
     *        kama urahisi tu kwa mikataba ya nje. Mbali na kutekeleza urefu wa juu,
     *        mikataba hii haitoi dhamana yoyote kuhusu maudhui yake.
     */
    function _initiateWithdrawal(
        anwani _l2Token,
        anwani _from,
        anwani _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Utoaji unapoanzishwa, tunachoma fedha za mtoaji ili kuzuia matumizi ya L2
        //.
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Kumbuka kuwa _hatutegemei_ kigezo cha `_from` bali `msg.sender` ambayo ni ngumu zaidi kughushi (haiwezekani, kwa kadiri ninavyojua).

```solidity

        // Jenga calldata kwa l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        anwani l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Kwenye L1 ni muhimu kutofautisha kati ya ETH na ERC-20.

```solidity
            ujumbe = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            ujumbe = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Tuma ujumbe hadi daraja la L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, ujumbe);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Kazi ya Mnyororo-Msalaba: Uwekaji *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        anwani _l1Token,
        anwani _l2Token,
        anwani _from,
        anwani _to,
        uint256 _amount,
        bytes calldata _data
```

Kazi hii inaitwa na `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Hakikisha chanzo cha ujumbe ni halali.
Hii ni muhimu kwa sababu kazi hii huita `_mint` na inaweza kutumika kutoa tokeni ambazo hazifunikwa na tokeni ambazo daraja linamiliki kwenye L1.

```solidity
        // Angalia tokeni lengwa inatii na
        // hakikisha tokeni iliyowekwa kwenye L1 inalingana na uwakilishi wa tokeni iliyowekwa ya L2 hapa
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Ukaguzi wa usalama:

1. Kiolesura sahihi kinaauniwa
2. Anwani ya L1 ya mkataba wa L2 ERC-20 inalingana na chanzo cha L1 cha tokeni

```solidity
        ) {
            // Uwekaji unapokamilishwa, tunaweka kiasi sawa cha
            // tokeni kwenye akaunti kwenye L2.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Ikiwa ukaguzi wa usalama utapita, kamilisha uwekaji:

1. Toa tokeni
2. Toa tukio linalofaa

```solidity
        } else {
            // Labda tokeni ya L2 ambayo inawekwa-ndani haikubaliani kuhusu anwani sahihi
            // ya tokeni yake ya L1, au haiauni kiolesura sahihi.
            // Hii inapaswa kutokea tu ikiwa kuna tokeni hasidi ya L2, au ikiwa mtumiaji kwa namna fulani
            // alibainisha anwani isiyo sahihi ya tokeni ya L2 ya kuweka.
            // Katika hali yoyote, tunasimamisha mchakato hapa na kuunda ujumbe wa
            // utoaji ili watumiaji waweze kutoa fedha zao katika baadhi ya kesi.
            // Hakuna njia ya kuzuia mikataba ya tokeni hasidi kabisa, lakini hii inapunguza
            // kosa la mtumiaji na kupunguza baadhi ya aina za tabia ya mkataba hasidi.
```

Ikiwa mtumiaji alifanya kosa linaloweza kugunduliwa kwa kutumia anwani isiyo sahihi ya tokeni ya L2, tunataka kughairi uwekaji na kurudisha tokeni kwenye L1.
Njia pekee tunayoweza kufanya hivi kutoka L2 ni kutuma ujumbe ambao utalazimika kusubiri kipindi cha changamoto ya makosa, lakini hiyo ni bora zaidi kwa mtumiaji kuliko kupoteza tokeni kabisa.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // tulibadilisha _to na _from hapa kurudisha uwekaji kwa mtumaji
                _from,
                _amount,
                _data
            );

            // Tuma ujumbe hadi daraja la L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, ujumbe);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Hitimisho {#conclusion}

Daraja la kawaida ndio utaratibu unaobadilika zaidi kwa uhamisho wa rasilimali.
Hata hivyo, kwa sababu ni ya jumla sana si rahisi kila wakati kutumia utaratibu huu.
Hasa kwa utoaji, watumiaji wengi wanapendelea kutumia [madaraja ya watu wengine](https://optimism.io/apps#bridge) ambayo hayasubiri kipindi cha changamoto na hayahitaji uthibitisho wa Merkle kukamilisha utoaji.

Madaraja haya kwa kawaida hufanya kazi kwa kuwa na rasilimali kwenye L1, ambazo hutoa mara moja kwa ada ndogo (mara nyingi chini ya gharama ya gesi kwa utoaji wa daraja la kawaida).
Wakati daraja (au watu wanaoliendesha) linapotarajia kupungukiwa na rasilimali za L1 linahamisha rasilimali za kutosha kutoka L2. Kwa kuwa haya ni utoaji mkubwa sana, gharama ya utoaji inapunguzwa kwa kiasi kikubwa na ni asilimia ndogo zaidi.

Tunatumai makala hii imekusaidia kuelewa zaidi kuhusu jinsi safu 2 inavyofanya kazi, na jinsi ya kuandika msimbo wa Solidity ulio wazi na salama.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
