---
title: "Průvodce kontraktem standardního mostu Optimism"
description: "Jak funguje standardní most pro Optimism? Proč funguje právě takto?"
author: Ori Pomerantz
tags: ["Solidity", "most", "vrstva 2"]
skill: intermediate
breadcrumb: Most Optimism
published: 2022-03-30
lang: cs
---

[Optimism](https://www.optimism.io/) je [optimistický rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistické rollupy mohou zpracovávat transakce za mnohem nižší cenu než Ethereum Mainnet (známý také jako vrstva 1 nebo l1), protože transakce zpracovává pouze několik uzlů, a ne každý uzel v síti.
Zároveň se všechna data zapisují na l1, takže vše lze dokázat a zrekonstruovat se všemi zárukami integrity a dostupnosti Mainnetu.

Aby bylo možné používat aktiva z l1 na Optimism (nebo jakékoli jiné l2), musí být aktiva [přemostěna](/bridges/#prerequisites).
Jedním ze způsobů, jak toho dosáhnout, je, že uživatelé uzamknou aktiva (nejčastěji ETH a [ERC-20 tokeny](/developers/docs/standards/tokens/erc-20/)) na l1 a obdrží ekvivalentní aktiva pro použití na l2.
Nakonec ten, komu zůstanou, je možná bude chtít přemostit zpět na l1.
Při tom jsou aktiva na l2 spálena a poté uvolněna zpět uživateli na l1.

Tímto způsobem funguje [standardní most Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
V tomto článku si projdeme zdrojový kód tohoto mostu, abychom viděli, jak funguje, a prostudujeme si ho jako příklad dobře napsaného kódu v Solidity.

## Toky řízení {#control-flows}

Most má dva hlavní toky:

- Vklad (z l1 na l2)
- Výběr (z l2 na l1)

### Tok vkladu {#deposit-flow}

#### Vrstva 1 {#deposit-flow-layer-1}

1. Pokud vkládáte ERC-20, vkladatel poskytne mostu povolený limit k útratě vkládané částky.
2. Vkladatel zavolá most na l1 (`depositERC20`, `depositERC20To`, `depositETH` nebo `depositETHTo`).
3. Most na l1 převezme vlastnictví přemostěného aktiva.
   - ETH: Aktivum je převedeno vkladatelem jako součást volání.
   - ERC-20: Aktivum je převedeno mostem na sebe sama pomocí povoleného limitu poskytnutého vkladatelem.
4. Most na l1 použije mechanismus zpráv napříč doménami (cross-domain message) k zavolání `finalizeDeposit` na mostu l2.

#### Vrstva 2 {#deposit-flow-layer-2}

5. Most na l2 ověří, že volání `finalizeDeposit` je legitimní:
   - Přišlo z kontraktu pro zprávy napříč doménami.
   - Původně pocházelo z mostu na l1.
6. Most na l2 zkontroluje, zda je kontrakt ERC-20 tokenu na l2 ten správný:
   - Kontrakt na l2 hlásí, že jeho protějšek na l1 je stejný jako ten, ze kterého tokeny přišly na l1.
   - Kontrakt na l2 hlásí, že podporuje správné rozhraní ([pomocí ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Pokud je kontrakt na l2 správný, zavolá jej, aby vyrazil příslušný počet tokenů na příslušnou adresu. Pokud ne, zahájí proces výběru, aby uživateli umožnil uplatnit nárok na tokeny na l1.

### Tok výběru {#withdrawal-flow}

#### Vrstva 2 {#withdrawal-flow-layer-2}

1. Vybírající zavolá most na l2 (`withdraw` nebo `withdrawTo`).
2. Most na l2 spálí příslušný počet tokenů patřících `msg.sender`.
3. Most na l2 použije mechanismus zpráv napříč doménami k zavolání `finalizeETHWithdrawal` nebo `finalizeERC20Withdrawal` na mostu l1.

#### Vrstva 1 {#withdrawal-flow-layer-1}

4. Most na l1 ověří, že volání `finalizeETHWithdrawal` nebo `finalizeERC20Withdrawal` je legitimní:
   - Přišlo z mechanismu zpráv napříč doménami.
   - Původně pocházelo z mostu na l2.
5. Most na l1 převede příslušné aktivum (ETH nebo ERC-20) na příslušnou adresu.

## Kód vrstvy 1 {#layer-1-code}

Toto je kód, který běží na l1, Ethereum Mainnetu.

### IL1ERC20Bridge {#il1erc20bridge}

[Toto rozhraní je definováno zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Obsahuje funkce a definice potřebné pro přemostění ERC-20 tokenů.

```solidity
// SPDX-License-Identifier: MIT
```

[Většina kódu Optimism je vydána pod licencí MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

V době psaní tohoto článku je nejnovější verze Solidity 0.8.12.
Dokud nebude vydána verze 0.9.0, nevíme, zda s ní bude tento kód kompatibilní, nebo ne.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Události *
     **********/

    event ERC20DepositInitiated(
```

V terminologii mostu Optimism znamená _vklad_ (deposit) převod z l1 na l2 a _výběr_ (withdrawal) znamená převod z l2 na l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Ve většině případů není adresa ERC-20 na l1 stejná jako adresa ekvivalentního ERC-20 na l2.
[Seznam adres tokenů si můžete prohlédnout zde](https://static.optimism.io/optimism.tokenlist.json).
Adresa s `chainId` 1 je na l1 (Mainnet) a adresa s `chainId` 10 je na l2 (Optimism).
Další dvě hodnoty `chainId` jsou pro testovací síť Kovan (42) a testovací síť Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

K převodům je možné přidávat poznámky, v takovém případě jsou přidány k událostem, které je hlásí.

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

Stejný kontrakt mostu zpracovává převody v obou směrech.
V případě mostu na l1 to znamená inicializaci vkladů a finalizaci výběrů.

```solidity

    /********************
     * Veřejné funkce *
     ********************/

    /**
     * @dev získá adresu odpovídajícího kontraktu mostu na vrstvě 2.
     * @return Adresa odpovídajícího kontraktu mostu na vrstvě 2.
     */
    function l2TokenBridge() external returns (address);
```

Tato funkce není ve skutečnosti potřeba, protože na l2 se jedná o předem nasazený kontrakt, takže je vždy na adrese `0x4200000000000000000000000000000000000010`.
Je zde kvůli symetrii s mostem na l2, protože zjistit adresu mostu na l1 _není_ triviální.

```solidity
    /**
     * @dev vloží částku ERC-20 na zůstatek volajícího na vrstvě 2.
     * @param _l1Token Adresa ERC-20 na vrstvě 1, který vkládáme
     * @param _l2Token Adresa příslušného ERC-20 na vrstvě 2 k vrstvě 1
     * @param _amount Částka ERC-20 k vložení
     * @param _l2Gas Limit gas požadovaný k dokončení vkladu na vrstvě 2.
     * @param _data Volitelná data k předání na vrstvu 2. Tato data jsou poskytována
     *        výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Parametr `_l2Gas` je množství gasu na l2, které může transakce utratit.
[Až do určitého (vysokého) limitu je to zdarma](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), takže pokud kontrakt ERC-20 nedělá při ražení něco opravdu zvláštního, neměl by to být problém.
Tato funkce se stará o běžný scénář, kdy uživatel přemostí aktiva na stejnou adresu na jiném blockchainu.

```solidity
    /**
     * @dev vloží částku ERC-20 na zůstatek příjemce na vrstvě 2.
     * @param _l1Token Adresa ERC-20 na vrstvě 1, který vkládáme
     * @param _l2Token Adresa příslušného ERC-20 na vrstvě 2 k vrstvě 1
     * @param _to Adresa na vrstvě 2, které se má připsat výběr.
     * @param _amount Částka ERC-20 k vložení.
     * @param _l2Gas Limit gas požadovaný k dokončení vkladu na vrstvě 2.
     * @param _data Volitelná data k předání na vrstvu 2. Tato data jsou poskytována
     *        výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
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

Tato funkce je téměř identická s `depositERC20`, ale umožňuje odeslat ERC-20 na jinou adresu.

```solidity
    /*************************
     * Meziřetězcové funkce *
     *************************/

    /**
     * @dev Dokončí výběr z vrstvy 2 na vrstvu 1 a připíše prostředky na zůstatek příjemce
     * tokenu ERC-20 na vrstvě 1.
     * Toto volání selže, pokud inicializovaný výběr z vrstvy 2 nebyl dokončen.
     *
     * @param _l1Token Adresa tokenu na vrstvě 1, pro který se má provést finalizeWithdrawal.
     * @param _l2Token Adresa tokenu na vrstvě 2, kde byl výběr zahájen.
     * @param _from Adresa na vrstvě 2 iniciující převod.
     * @param _to Adresa na vrstvě 1, které se má připsat výběr.
     * @param _amount Částka ERC-20 k vložení.
     * @param _data Data poskytnutá odesílatelem na vrstvě 2. Tato data jsou poskytována
     *   výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *   délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
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

Výběry (a další zprávy z l2 na l1) v Optimism jsou dvoukrokový proces:

1. Inicializační transakce na l2.
2. Finalizační transakce nebo transakce uplatňující nárok na l1.
   Tato transakce musí proběhnout po skončení [období pro zpochybnění chyby (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) pro transakci na l2.

### IL1StandardBridge {#il1standardbridge}

[Toto rozhraní je definováno zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Tento soubor obsahuje definice událostí a funkcí pro ETH.
Tyto definice jsou velmi podobné těm, které jsou definovány v `IL1ERC20Bridge` výše pro ERC-20.

Rozhraní mostu je rozděleno do dvou souborů, protože některé ERC-20 tokeny vyžadují vlastní zpracování a nelze je obsloužit standardním mostem.
Tímto způsobem může vlastní most, který takový token zpracovává, implementovat `IL1ERC20Bridge` a nemusí zároveň přemosťovat ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Události *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Tato událost je téměř identická s verzí pro ERC-20 (`ERC20DepositInitiated`), s výjimkou adres tokenů na l1 a l2.
Totéž platí pro ostatní události a funkce.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Veřejné funkce *
     ********************/

    /**
     * @dev Vloží částku ETH na zůstatek volajícího na vrstvě 2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Vloží částku ETH na zůstatek příjemce na vrstvě 2.
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
     * Meziřetězcové funkce *
     *************************/

    /**
     * @dev Dokončí výběr z vrstvy 2 na vrstvu 1 a připíše prostředky na zůstatek příjemce
     * tokenu ETH na vrstvě 1. Jelikož tuto funkci může volat pouze xDomainMessenger, nikdy nebude volána
     * před dokončením výběru.
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

[Tento kontrakt](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) dědí oba mosty ([l1](#the-l1-bridge-contract) a [l2](#l2-bridge-code)) pro odesílání zpráv do druhé vrstvy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importy rozhraní */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) říká kontraktu, jak odesílat zprávy do druhé vrstvy pomocí cross domain messengeru (nástroje pro zprávy napříč doménami).
Tento cross domain messenger je zcela jiný systém a zaslouží si vlastní článek, který snad v budoucnu napíšu.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Pomocný kontrakt pro kontrakty provádějící mezidoménovou komunikaci
 *
 * Použitý kompilátor: definován dědícím kontraktem
 */
contract CrossDomainEnabled {
    /*************
     * Proměnné *
     *************/

    // Kontrakt messengeru používaný k odesílání a přijímání zpráv z jiné domény.
    address public messenger;

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _messenger Adresa CrossDomainMessengeru na aktuální vrstvě.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Jediný parametr, který kontrakt potřebuje znát, je adresa cross domain messengeru na této vrstvě.
Tento parametr se nastavuje jednou, v konstruktoru, a nikdy se nemění.

```solidity

    /**********************
     * Modifikátory funkcí *
     **********************/

    /**
     * Vynucuje, že modifikovaná funkce je volatelná pouze specifickým mezidoménovým účtem.
     * @param _sourceDomainAccount Jediný účet v původní doméně, který je
     *  ověřen k volání této funkce.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Zasílání zpráv napříč doménami je přístupné jakémukoli kontraktu na blockchainu, kde běží (buď Ethereum Mainnet, nebo Optimism).
Potřebujeme však, aby most na každé straně důvěřoval _pouze_ určitým zprávám, pokud pocházejí z mostu na druhé straně.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Důvěřovat lze pouze zprávám z příslušného cross domain messengeru (`messenger`, jak vidíte níže).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Způsob, jakým cross domain messenger poskytuje adresu, která odeslala zprávu do druhé vrstvy, je [funkce `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Dokud je volána v transakci, která byla iniciována zprávou, může tuto informaci poskytnout.

Musíme se ujistit, že zpráva, kterou jsme obdrželi, přišla z druhého mostu.

```solidity

        _;
    }

    /**********************
     * Interní funkce *
     **********************/

    /**
     * Získá messenger, obvykle z úložiště. Tato funkce je vystavena pro případ, že by ji podřízený kontrakt
     * potřeboval přepsat.
     * @return Adresa kontraktu mezidoménového messengeru, který by měl být použit.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Tato funkce vrací cross domain messenger.
Používáme funkci spíše než proměnnou `messenger`, abychom umožnili kontraktům, které z tohoto dědí, použít algoritmus k určení, který cross domain messenger se má použít.

```solidity

    /**
     * Odešle zprávu na účet v jiné doméně
     * @param _crossDomainTarget Zamýšlený příjemce v cílové doméně
     * @param _message Data k odeslání cíli (obvykle data volání pro funkci s
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Limit gas pro přijetí zprávy v cílové doméně.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

A nakonec funkce, která odesílá zprávu do druhé vrstvy.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) je statický analyzátor, který Optimism spouští na každém kontraktu, aby hledal zranitelnosti a další potenciální problémy.
V tomto případě následující řádek spouští dvě zranitelnosti:

1. [Události reentrance](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Neškodná reentrance](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

V tomto případě se reentrance neobáváme, víme, že `getCrossDomainMessenger()` vrací důvěryhodnou adresu, i když Slither nemá jak to zjistit.

### Kontrakt mostu na l1 {#the-l1-bridge-contract}

[Zdrojový kód tohoto kontraktu je zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Rozhraní mohou být součástí jiných kontraktů, takže musí podporovat širokou škálu verzí Solidity.
Ale samotný most je náš kontrakt a můžeme být přísní ohledně toho, jakou verzi Solidity používá.

```solidity
/* Importy rozhraní */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) a [IL1StandardBridge](#il1standardbridge) jsou vysvětleny výše.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nám umožňuje vytvářet zprávy pro ovládání standardního mostu na l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Toto rozhraní](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nám umožňuje ovládat kontrakty ERC-20.
[Více si o tom můžete přečíst zde](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importy knihoven */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Jak bylo vysvětleno výše](#crossdomainenabled), tento kontrakt se používá pro zasílání zpráv mezi vrstvami.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) obsahuje adresy pro kontrakty na l2, které mají vždy stejnou adresu. To zahrnuje standardní most na l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Nástroje pro adresy od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Používá se k rozlišení mezi adresami kontraktů a adresami patřícími externě vlastněným účtům (EOA).

Vezměte na vědomí, že to není dokonalé řešení, protože neexistuje způsob, jak rozlišit mezi přímými voláními a voláními z konstruktoru kontraktu, ale alespoň nám to umožňuje identifikovat a předcházet některým běžným chybám uživatelů.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) podporuje dva způsoby, jak může kontrakt nahlásit selhání:

1. Zvrátit (revert)
2. Vrátit `false`

Ošetření obou případů by náš kód zkomplikovalo, takže místo toho používáme [`SafeERC20` od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), což zajišťuje, že [všechna selhání vedou ke zvrácení](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Most pro ETH a ERC-20 na vrstvě 1 je kontrakt, který uchovává vložené prostředky z vrstvy 1 a standardní
 * tokeny, které se používají na vrstvě 2. Synchronizuje odpovídající most na vrstvě 2, informuje ho o vkladech
 * a naslouchá mu ohledně nově dokončených výběrů.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Tento řádek určuje, že se má použít obal (wrapper) `SafeERC20` pokaždé, když použijeme rozhraní `IERC20`.

```solidity

    /********************************
     * Odkazy na externí kontrakty *
     ********************************/

    address public l2TokenBridge;
```

Adresa [L2StandardBridge](#l2-bridge-code).

```solidity

    // Mapuje token na vrstvě 1 na token na vrstvě 2 na zůstatek vloženého tokenu na vrstvě 1
    mapping(address => mapping(address => uint256)) public deposits;
```

Dvojité [mapování](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) jako toto je způsob, jakým definujete [dvourozměrné řídké pole](https://en.wikipedia.org/wiki/Sparse_matrix).
Hodnoty v této datové struktuře jsou identifikovány jako `deposit[L1 token addr][L2 token addr]`.
Výchozí hodnota je nula.
Do úložiště se zapisují pouze buňky, které jsou nastaveny na jinou hodnotu.

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Tento kontrakt běží za proxy, takže parametry konstruktoru zůstanou nevyužity.
    constructor() CrossDomainEnabled(address(0)) {}
```

Chceme mít možnost tento kontrakt upgradovat, aniž bychom museli kopírovat všechny proměnné v úložišti.
K tomu používáme [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), proxy kontrakt, který používá [`delegatecall`](https://solidity-by-example.org/delegatecall/) k přenosu volání na samostatný kontrakt, jehož adresu uchovává proxy kontrakt (při upgradu řeknete proxy, aby tuto adresu změnil).
Když použijete `delegatecall`, úložiště zůstává úložištěm _volajícího_ kontraktu, takže hodnoty všech stavových proměnných kontraktu zůstávají nedotčeny.

Jedním z důsledků tohoto vzoru je, že úložiště kontraktu, který je _volán_ pomocí `delegatecall`, se nepoužívá, a proto na hodnotách předaných jeho konstruktoru nezáleží.
To je důvod, proč můžeme konstruktoru `CrossDomainEnabled` poskytnout nesmyslnou hodnotu.
Je to také důvod, proč je inicializace níže oddělena od konstruktoru.

```solidity
    /******************
     * Inicializace *
     ******************/

    /**
     * @param _l1messenger Adresa messengeru na vrstvě 1 používaná pro meziřetězcovou komunikaci.
     * @param _l2TokenBridge Adresa standardního mostu na vrstvě 2.
     */
    // slither-disable-next-line external-function
```

Tento [test nástroje Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifikuje funkce, které nejsou volány z kódu kontraktu, a mohly by proto být deklarovány jako `external` místo `public`.
Náklady na gas u funkcí `external` mohou být nižší, protože jim mohou být poskytnuty parametry v datech volání (calldata).
Funkce deklarované jako `public` musí být přístupné zevnitř kontraktu.
Kontrakty nemohou upravovat svá vlastní data volání, takže parametry musí být v paměti.
Když je taková funkce volána externě, je nutné zkopírovat data volání do paměti, což stojí gas.
V tomto případě je funkce volána pouze jednou, takže nám tato neefektivita nevadí.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Funkce `initialize` by měla být volána pouze jednou.
Pokud se změní adresa cross domain messengeru na l1 nebo mostu tokenů na l2, vytvoříme nový proxy kontrakt a nový most, který jej volá.
Je nepravděpodobné, že by k tomu došlo, s výjimkou upgradu celého systému, což je velmi vzácná událost.

Všimněte si, že tato funkce nemá žádný mechanismus, který by omezoval, _kdo_ ji může volat.
To znamená, že teoreticky by útočník mohl počkat, až nasadíme proxy a první verzi mostu, a pak použít [předbíhání (front-running)](https://solidity-by-example.org/hacks/front-running/), aby se dostal k funkci `initialize` dříve než legitimní uživatel. Existují však dvě metody, jak tomu zabránit:

1. Pokud kontrakty nejsou nasazeny přímo pomocí EOA, ale [v transakci, ve které je vytvoří jiný kontrakt](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), může být celý proces atomický a dokončit se dříve, než je provedena jakákoli jiná transakce.
2. Pokud legitimní volání `initialize` selže, je vždy možné ignorovat nově vytvořený proxy a most a vytvořit nové.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Toto jsou dva parametry, které most potřebuje znát.

```solidity

    /**************
     * Vkládání *
     **************/

    /** @dev Modifikátor vyžadující, aby odesílatel byl EOA. Tuto kontrolu by mohl obejít škodlivý
     *  kontrakt přes initcode, ale řeší to uživatelskou chybu, které se chceme vyhnout.
     */
    modifier onlyEOA() {
        // Používá se k zastavení vkladů z kontraktů (zabraňuje náhodné ztrátě tokenů)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

To je důvod, proč jsme potřebovali nástroje `Address` od OpenZeppelin.

```solidity
    /**
     * @dev Tuto funkci lze volat bez dat
     * pro vložení částky ETH na zůstatek volajícího na vrstvě 2.
     * Jelikož funkce receive nepřijímá data, na vrstvu 2 se předává konzervativní
     * výchozí částka.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Tato funkce existuje pro účely testování.
Všimněte si, že se neobjevuje v definicích rozhraní – není určena pro běžné použití.

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

Tyto dvě funkce jsou obaly (wrappers) kolem `_initiateETHDeposit`, funkce, která zpracovává samotný vklad ETH.

```solidity
    /**
     * @dev Provádí logiku pro vklady uložením ETH a informováním brány ETH na vrstvě 2 o
     * vkladu.
     * @param _from Účet, ze kterého se má stáhnout vklad na vrstvě 1.
     * @param _to Účet, kterému se má předat vklad na vrstvě 2.
     * @param _l2Gas Limit gas požadovaný k dokončení vkladu na vrstvě 2.
     * @param _data Volitelná data k předání na vrstvu 2. Tato data jsou poskytována
     *        výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Sestaví data volání pro volání finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Zprávy napříč doménami fungují tak, že cílový kontrakt je volán se zprávou jako svými daty volání (calldata).
Kontrakty v Solidity vždy interpretují svá data volání v souladu se [specifikacemi ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Funkce Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) tato data volání vytváří.

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

Zpráva zde znamená zavolat [funkci `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) s těmito parametry:

| Parametr | Hodnota | Význam |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | Speciální hodnota zastupující ETH (což není ERC-20 token) na l1 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrakt na l2, který spravuje ETH na Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (tento kontrakt je pouze pro interní použití Optimism) |
| \_from | \_from | Adresa na l1, která odesílá ETH |
| \_to | \_to | Adresa na l2, která přijímá ETH |
| amount | msg.value | Množství odeslaných Wei (které již bylo odesláno do mostu) |
| \_data | \_data | Další data k připojení ke vkladu |

```solidity
        // Odešle data volání na vrstvu 2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Odeslat zprávu přes cross domain messenger.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Vyvolat událost, která informuje jakoukoli decentralizovanou aplikaci (dapp), která naslouchá tomuto převodu.

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

Tyto dvě funkce jsou obaly kolem `_initiateERC20Deposit`, funkce, která zpracovává samotný vklad ERC-20.

```solidity
    /**
     * @dev Provádí logiku pro vklady informováním kontraktu vloženého tokenu na vrstvě 2
     * o vkladu a zavoláním handleru pro uzamčení prostředků na vrstvě 1. (např. transferFrom)
     *
     * @param _l1Token Adresa ERC-20 na vrstvě 1, který vkládáme
     * @param _l2Token Adresa příslušného ERC-20 na vrstvě 2 k vrstvě 1
     * @param _from Účet, ze kterého se má stáhnout vklad na vrstvě 1
     * @param _to Účet, kterému se má předat vklad na vrstvě 2
     * @param _amount Částka ERC-20 k vložení.
     * @param _l2Gas Limit gas požadovaný k dokončení vkladu na vrstvě 2.
     * @param _data Volitelná data k předání na vrstvu 2. Tato data jsou poskytována
     *        výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
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

Tato funkce je podobná `_initiateETHDeposit` výše, s několika důležitými rozdíly.
Prvním rozdílem je, že tato funkce přijímá adresy tokenů a částku k převodu jako parametry.
V případě ETH volání mostu již zahrnuje převod aktiva na účet mostu (`msg.value`).

```solidity
        // Když je na vrstvě 1 zahájen vklad, most na vrstvě 1 převede prostředky sám sobě pro budoucí
        // výběry. safeTransferFrom také kontroluje, zda má kontrakt kód, takže toto selže, pokud
        // _from je EOA nebo address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Převody ERC-20 tokenů probíhají jiným procesem než ETH:

1. Uživatel (`_from`) poskytne mostu povolený limit k převodu příslušných tokenů.
2. Uživatel zavolá most s adresou kontraktu tokenu, částkou atd.
3. Most převede tokeny (na sebe) jako součást procesu vkladu.

První krok může proběhnout v samostatné transakci odděleně od posledních dvou.
Předbíhání však není problém, protože dvě funkce, které volají `_initiateERC20Deposit` (`depositERC20` a `depositERC20To`), volají tuto funkci pouze s `msg.sender` jako parametrem `_from`.

```solidity
        // Sestaví data volání pro _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Odešle data volání na vrstvu 2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Přidat vložené množství tokenů do datové struktury `deposits`.
Na l2 by mohlo být více adres, které odpovídají stejnému ERC-20 tokenu na l1, takže ke sledování vkladů nestačí použít zůstatek ERC-20 tokenu na l1 v mostu.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Meziřetězcové funkce *
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

Most na l2 odešle zprávu do cross domain messengeru na l2, což způsobí, že cross domain messenger na l1 zavolá tuto funkci (samozřejmě jakmile je na l1 odeslána [transakce, která zprávu finalizuje](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Ujistěte se, že se jedná o _legitimní_ zprávu, která pochází z cross domain messengeru a má původ v mostu tokenů na l2.
Tato funkce se používá k výběru ETH z mostu, takže se musíme ujistit, že ji volá pouze autorizovaný volající.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Způsob, jak převést ETH, je zavolat příjemce s množstvím Wei v `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Vyvolat událost o výběru.

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

Tato funkce je podobná `finalizeETHWithdrawal` výše, s nezbytnými změnami pro ERC-20 tokeny.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aktualizovat datovou strukturu `deposits`.

```solidity

        // Když je výběr dokončen na vrstvě 1, most na vrstvě 1 převede prostředky vybírajícímu
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Dočasné - Migrace ETH *
     *****************************/

    /**
     * @dev Přidá zůstatek ETH na účet. Toto má umožnit migraci ETH
     * ze staré brány na novou bránu.
     * POZNÁMKA: Toto je ponecháno pouze pro jeden upgrade, abychom mohli přijmout migrované ETH ze
     * starého kontraktu
     */
    function donateETH() external payable {}
}
```

Existovala dřívější implementace mostu.
Když jsme přešli z této implementace na současnou, museli jsme přesunout všechna aktiva.
ERC-20 tokeny lze jednoduše přesunout.
K převodu ETH do kontraktu však potřebujete schválení tohoto kontraktu, což nám poskytuje `donateETH`.

## ERC-20 tokeny na l2 {#erc-20-tokens-on-l2}

Aby se ERC-20 token hodil do standardního mostu, musí umožnit standardnímu mostu, a _pouze_ standardnímu mostu, razit tokeny.
To je nezbytné, protože mosty musí zajistit, aby se počet tokenů v oběhu na Optimism rovnal počtu tokenů uzamčených uvnitř kontraktu mostu na l1.
Pokud by bylo na l2 příliš mnoho tokenů, někteří uživatelé by nemohli přemostit svá aktiva zpět na l1.
Místo důvěryhodného mostu bychom v podstatě znovu vytvořili [bankovnictví částečných rezerv](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Pokud by bylo na l1 příliš mnoho tokenů, některé z těchto tokenů by zůstaly navždy uzamčeny uvnitř kontraktu mostu, protože neexistuje způsob, jak je uvolnit bez spálení tokenů na l2.

### IL2StandardERC20 {#il2standarderc20}

Každý ERC-20 token na l2, který používá standardní most, musí poskytovat [toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), které obsahuje funkce a události, jež standardní most potřebuje.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Standardní rozhraní ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nezahrnuje funkce `mint` a `burn`.
Tyto metody nejsou vyžadovány [standardem ERC-20](https://eips.ethereum.org/EIPS/eip-20), který ponechává mechanismy pro vytváření a ničení tokenů nespecifikované.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Rozhraní ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) se používá k určení, jaké funkce kontrakt poskytuje.
[Standard si můžete přečíst zde](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Tato funkce poskytuje adresu tokenu na l1, který je přemostěn do tohoto kontraktu.
Všimněte si, že nemáme podobnou funkci v opačném směru.
Musíme být schopni přemostit jakýkoli token z l1, bez ohledu na to, zda byla podpora l2 plánována při jeho implementaci, nebo ne.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funkce a události pro ražení (vytváření) a pálení (ničení) tokenů.
Most by měl být jedinou entitou, která může tyto funkce spouštět, aby se zajistilo, že počet tokenů je správný (rovná se počtu tokenů uzamčených na l1).

### L2StandardERC20 {#l2standarderc20}

[Toto je naše implementace rozhraní `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Pokud nepotřebujete nějakou vlastní logiku, měli byste použít tuto.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrakt ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism nevěří ve znovuobjevování kola, zvláště když je kolo dobře auditováno a musí být dostatečně důvěryhodné, aby drželo aktiva.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Toto jsou dva další konfigurační parametry, které vyžadujeme a které ERC-20 normálně nevyžaduje.

```solidity

    /**
     * @param _l2Bridge Adresa standardního mostu na vrstvě 2.
     * @param _l1Token Adresa odpovídajícího tokenu na vrstvě 1.
     * @param _name Název ERC-20.
     * @param _symbol Symbol ERC-20.
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

Nejprve zavoláme konstruktor pro kontrakt, ze kterého dědíme (`ERC20(_name, _symbol)`), a poté nastavíme naše vlastní proměnné.

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

Tímto způsobem funguje [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Každé rozhraní je množinou podporovaných funkcí a je identifikováno jako [exkluzivní disjunkce (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) [selektorů funkcí ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) těchto funkcí.

Most na l2 používá ERC-165 jako kontrolu správnosti (sanity check), aby se ujistil, že kontrakt ERC-20, do kterého odesílá aktiva, je `IL2StandardERC20`.

**Poznámka:** Nic nebrání škodlivému kontraktu poskytovat falešné odpovědi na `supportsInterface`, takže se jedná o mechanismus kontroly správnosti, _nikoli_ o bezpečnostní mechanismus.

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

Pouze most na l2 má povoleno razit a pálit aktiva.

`_mint` a `_burn` jsou ve skutečnosti definovány v [kontraktu ERC-20 od OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Tento kontrakt je pouze nevystavuje externě, protože podmínky pro ražení a pálení tokenů jsou stejně rozmanité jako počet způsobů použití ERC-20.

## Kód mostu na l2 {#l2-bridge-code}

Toto je kód, který provozuje most na Optimism.
[Zdrojový kód tohoto kontraktu je zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importy rozhraní */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Rozhraní [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) je velmi podobné [ekvivalentu na l1](#il1erc20bridge), který jsme viděli výše.
Jsou zde dva významné rozdíly:

1. Na l1 inicializujete vklady a finalizujete výběry.
   Zde inicializujete výběry a finalizujete vklady.
2. Na l1 je nutné rozlišovat mezi ETH a ERC-20 tokeny.
   Na l2 můžeme použít stejné funkce pro obojí, protože interně jsou zůstatky ETH na Optimism zpracovávány jako ERC-20 token s adresou [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importy knihoven */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importy kontraktů */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Standardní most na vrstvě 2 je kontrakt, který spolupracuje se standardním mostem na vrstvě 1, aby
 * umožnil přechody ETH a ERC-20 mezi vrstvou 1 a vrstvou 2.
 * Tento kontrakt slouží k ražení nových tokenů, když se dozví o vkladech do standardního mostu na vrstvě 1.
 * Tento kontrakt také slouží ke spalování tokenů určených k výběru a informuje most na vrstvě 1,
 * aby uvolnil prostředky na vrstvě 1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Odkazy na externí kontrakty *
     ********************************/

    address public l1TokenBridge;
```

Udržovat přehled o adrese mostu na l1.
Všimněte si, že na rozdíl od ekvivalentu na l1 zde tuto proměnnou _potřebujeme_.
Adresa mostu na l1 není předem známa.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mezidoménový messenger používaný tímto kontraktem.
     * @param _l1TokenBridge Adresa mostu na vrstvě 1 nasazeného na hlavním řetězci.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Vybírání *
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

Tyto dvě funkce inicializují výběry.
Všimněte si, že není nutné specifikovat adresu tokenu na l1.
Očekává se, že tokeny na l2 nám sdělí adresu ekvivalentu na l1.

```solidity

    /**
     * @dev Provádí logiku pro výběry tím, že spálí token a informuje
     *      bránu tokenu na vrstvě 1 o výběru.
     * @param _l2Token Adresa tokenu na vrstvě 2, kde je zahájen výběr.
     * @param _from Účet, ze kterého se má stáhnout výběr na vrstvě 2.
     * @param _to Účet, kterému se má předat výběr na vrstvě 1.
     * @param _amount Částka tokenu k výběru.
     * @param _l1Gas Nepoužito, ale zahrnuto z důvodu potenciální budoucí kompatibility.
     * @param _data Volitelná data k předání na vrstvu 1. Tato data jsou poskytována
     *        výhradně pro usnadnění externím kontraktům. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Když je zahájen výběr, spálíme prostředky vybírajícího, abychom zabránili následnému
        // použití na vrstvě 2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Všimněte si, že se _nespoléháme_ na parametr `_from`, ale na `msg.sender`, který je mnohem těžší zfalšovat (pokud vím, je to nemožné).

```solidity

        // Sestaví data volání pro l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na l1 je nutné rozlišovat mezi ETH a ERC-20.

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

        // Odešle zprávu nahoru do mostu na vrstvě 1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Meziřetězcová funkce: Vkládání *
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

Tato funkce je volána pomocí `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Ujistěte se, že zdroj zprávy je legitimní.
To je důležité, protože tato funkce volá `_mint` a mohla by být použita k vydání tokenů, které nejsou kryty tokeny, jež most vlastní na l1.

```solidity
        // Zkontroluje, zda je cílový token kompatibilní a
        // ověří, zda vložený token na vrstvě 1 odpovídá zdejší reprezentaci vloženého tokenu na vrstvě 2
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Kontroly správnosti:

1. Je podporováno správné rozhraní
2. Adresa l1 kontraktu ERC-20 na l2 odpovídá zdroji tokenů na l1

```solidity
        ) {
            // Když je vklad dokončen, připíšeme na účet na vrstvě 2 stejnou částku
            // tokenů.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Pokud kontroly správnosti projdou, finalizujte vklad:

1. Vyrazit tokeny
2. Vyvolat příslušnou událost

```solidity
        } else {
            // Buď token na vrstvě 2, do kterého se vkládá, nesouhlasí se správnou adresou
            // svého tokenu na vrstvě 1, nebo nepodporuje správné rozhraní.
            // To by se mělo stát pouze v případě, že existuje škodlivý token na vrstvě 2, nebo pokud uživatel nějakým způsobem
            // zadal špatnou adresu tokenu na vrstvě 2 pro vklad.
            // V obou případech zde proces zastavíme a sestavíme výběrovou
            // zprávu, aby uživatelé mohli v některých případech získat své prostředky zpět.
            // Neexistuje žádný způsob, jak zcela zabránit škodlivým kontraktům tokenů, ale toto omezuje
            // uživatelskou chybu a zmírňuje některé formy škodlivého chování kontraktu.
```

Pokud uživatel udělal detekovatelnou chybu použitím nesprávné adresy tokenu na l2, chceme vklad zrušit a vrátit tokeny na l1.
Jediný způsob, jak to můžeme z l2 udělat, je odeslat zprávu, která bude muset počkat na období pro zpochybnění chyby, ale to je pro uživatele mnohem lepší než trvalá ztráta tokenů.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // zde jsme prohodili _to a _from, abychom vklad odrazili zpět odesílateli
                _from,
                _amount,
                _data
            );

            // Odešle zprávu nahoru do mostu na vrstvě 1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Závěr {#conclusion}

Standardní most je nejflexibilnějším mechanismem pro převody aktiv.
Protože je však tak obecný, není vždy tím nejjednodušším mechanismem k použití.
Zejména pro výběry většina uživatelů dává přednost použití [mostů třetích stran](https://optimism.io/apps#bridge), které nečekají na období pro zpochybnění a nevyžadují Merkleův důkaz k finalizaci výběru.

Tyto mosty obvykle fungují tak, že mají aktiva na l1, která poskytují okamžitě za malý poplatek (často nižší než náklady na gas pro výběr ze standardního mostu).
Když most (nebo lidé, kteří jej provozují) předpokládá nedostatek aktiv na l1, převede dostatečná aktiva z l2. Vzhledem k tomu, že se jedná o velmi velké výběry, náklady na výběr se amortizují na velkou částku a tvoří mnohem menší procento.

Doufejme, že vám tento článek pomohl lépe pochopit, jak funguje vrstva 2 a jak psát kód v Solidity, který je jasný a bezpečný.

[Zde najdete další mou práci](https://cryptodocguy.pro/).