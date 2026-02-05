---
title: "Procházení kontraktu standardního přemostění Optimism"
description: Jak funguje standardní přemostění pro Optimism? Proč to funguje zrovna takhle?
author: Ori Pomerantz
tags: [ "solidity", "přemostění", "vrstva 2" ]
skill: intermediate
published: 2022-03-30
lang: cs
---

[Optimism](https://www.optimism.io/) je [optimistický rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistické rollupy mohou zpracovávat transakce za mnohem nižší cenu než hlavní síť Ethereum (také známá jako první vrstva nebo L1), protože transakce zpracovává jen několik uzlů, nikoli každý uzel v síti.
Všechna data jsou přitom zapsána na L1, takže vše lze prokázat a rekonstruovat se všemi zárukami integrity a dostupnosti hlavní sítě.

Aby bylo možné používat aktiva z L1 v síti Optimism (nebo v jakékoli jiné L2), je třeba je [přemostit](/bridges/#prerequisites).
Jedním ze způsobů, jak toho dosáhnout, je, že uživatelé uzamknou aktiva (nejčastěji se jedná o ETH a [tokeny ERC-20](/developers/docs/standards/tokens/erc-20/)) na L1 a obdrží ekvivalentní aktiva k použití na L2.
Nakonec je může chtít ten, kdo je získá, přemostit zpět na L1.
Přitom se aktiva na L2 spálí a poté se na L1 uvolní zpět uživateli.

Takto funguje [standardní přemostění Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
V tomto článku si projdeme zdrojový kód tohoto přemostění, abychom viděli, jak funguje, a prostudujeme si jej jako příklad dobře napsaného kódu v Solidity.

## Kontrolní toky {#control-flows}

Přemostění má dva hlavní toky:

- Vklad (z L1 na L2)
- Výběr (z L2 na L1)

### Tok vkladů {#deposit-flow}

#### Vrstva 1 {#deposit-flow-layer-1}

1. Při vkladu tokenu ERC-20 udělí vkladatel přemostění povolení k útratě vkládané částky.
2. Vkladatel zavolá přemostění na L1 (`depositERC20`, `depositERC20To`, `depositETH` nebo `depositETHTo`).
3. Přemostění na L1 převezme přemostěné aktivum.
   - ETH: Aktivum je převedeno vkladatelem jako součást volání.
   - ERC-20: Aktivum je přemostěním převedeno samo sobě pomocí povolení poskytnutého vkladatelem.
4. Přemostění na L1 použije mezidoménový mechanismus zpráv k zavolání `finalizeDeposit` na přemostění na L2.

#### Vrstva 2 {#deposit-flow-layer-2}

5. Přemostění na L2 ověří, že volání `finalizeDeposit` je legitimní:
   - Pochází z mezidoménového kontraktu zpráv.
   - Původně pocházelo z přemostění na L1.
6. Přemostění na L2 zkontroluje, zda je kontrakt tokenu ERC-20 na L2 správný:
   - Kontrakt na L2 hlásí, že jeho protějšek na L1 je stejný jako ten, ze kterého tokeny na L1 pocházejí.
   - Kontrakt na L2 hlásí, že podporuje správné rozhraní ([pomocí ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Pokud je kontrakt L2 správný, zavolejte jej, aby vyrazil příslušný počet tokenů na příslušnou adresu. Pokud ne, zahajte proces výběru, který uživateli umožní nárokovat tokeny na L1.

### Tok výběrů {#withdrawal-flow}

#### Vrstva 2 {#withdrawal-flow-layer-2}

1. Vybírající zavolá přemostění L2 (`withdraw` nebo `withdrawTo`).
2. Přemostění L2 spálí příslušný počet tokenů patřících `msg.sender`.
3. Přemostění L2 použije mezidoménový mechanismus zpráv k zavolání `finalizeETHWithdrawal` nebo `finalizeERC20Withdrawal` na přemostění na L1.

#### Vrstva 1 {#withdrawal-flow-layer-1}

4. Přemostění na L1 ověří, že volání `finalizeETHWithdrawal` nebo `finalizeERC20Withdrawal` je legitimní:
   - Pochází z mezidoménového mechanismu zpráv.
   - Původně pocházelo z přemostění na L2.
5. Přemostění na L1 převede příslušné aktivum (ETH nebo ERC-20) na příslušnou adresu.

## Kód na vrstvě 1 {#layer-1-code}

Toto je kód, který běží na L1, tedy hlavní síti Etherea.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Toto rozhraní je definováno zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Obsahuje funkce a definice potřebné pro přemostění tokenů ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Většina kódu Optimism je vydána pod licencí MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

V době psaní je poslední verze Solidity 0.8.12.
Dokud nebude vydána verze 0.9.0, nevíme, zda s ní tento kód bude kompatibilní.

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

V terminologii přemostění Optimism znamená _vklad_ převod z L1 na L2 a _výběr_ převod z L2 na L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Ve většině případů se adresa ERC-20 na L1 nerovná adrese ekvivalentního ERC-20 na L2.
[Seznam adres tokenů naleznete zde](https://static.optimism.io/optimism.tokenlist.json).
Adresa s `chainId` 1 je na L1 (hlavní síť) a adresa s `chainId` 10 je na L2 (Optimism).
Další dvě hodnoty `chainId` jsou pro testovací síť Kovan (42) a testovací síť Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

K převodům je možné přidávat poznámky, které se v takovém případě přidají k událostem, jež je hlásí.

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

Stejný kontrakt přemostění zpracovává převody v obou směrech.
V případě přemostění L1 to znamená inicializaci vkladů a finalizaci výběrů.

```solidity

    /********************
     * Veřejné funkce *
     ********************/

    /**
     * @dev získá adresu odpovídajícího kontraktu přemostění na L2.
     * @return Adresa odpovídajícího kontraktu přemostění na L2.
     */
    function l2TokenBridge() external returns (address);
```

Tato funkce není ve skutečnosti potřeba, protože na L2 se jedná o předem nasazený kontrakt, takže se vždy nachází na adrese `0x4200000000000000000000000000000000000010`.
Je zde z důvodu symetrie s přemostěním L2, protože adresa přemostění L1 _není_ triviálně zjistitelná.

```solidity
    /**
     * @dev vloží částku ERC20 na zůstatek volajícího na L2.
     * @param _l1Token Adresa ERC20 na L1, který vkládáme.
     * @param _l2Token Adresa příslušného ERC20 na L2.
     * @param _amount Částka ERC20 k vložení.
     * @param _l2Gas Limit transakčních poplatků potřebný k dokončení vkladu na L2.
     * @param _data Volitelná data k předání na L2. Tato data jsou poskytována
     *        pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
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

Parametr `_l2Gas` je množství transakčního poplatku na L2, které může transakce utratit.
[Až do určitého (vysokého) limitu je to zdarma](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), takže pokud kontrakt ERC-20 nedělá při ražbě něco opravdu zvláštního, neměl by to být problém.
Tato funkce se stará o běžný scénář, kdy uživatel přemosťuje aktiva na stejnou adresu na jiném blockchainu.

```solidity
    /**
     * @dev vloží částku ERC20 na zůstatek příjemce na L2.
     * @param _l1Token Adresa ERC20 na L1, který vkládáme.
     * @param _l2Token Adresa příslušného ERC20 na L2.
     * @param _to Adresa na L2, na kterou se připíše výběr.
     * @param _amount Částka ERC20 k vložení.
     * @param _l2Gas Limit transakčních poplatků potřebný k dokončení vkladu na L2.
     * @param _data Volitelná data k předání na L2. Tato data jsou poskytována
     *        pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
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

Tato funkce je téměř identická s `depositERC20`, ale umožňuje poslat ERC-20 na jinou adresu.

```solidity
}    /*************************
     * Meziřetězcové funkce *
     *************************/

    /**
     * @dev Dokončí výběr z L2 na L1 a připíše prostředky na zůstatek příjemce
     * tokenu ERC20 na L1.
     * Toto volání selže, pokud inicializovaný výběr z L2 nebyl finalizován.
     *
     * @param _l1Token Adresa tokenu na L1, pro který se má dokončit výběr.
     * @param _l2Token Adresa tokenu na L2, kde byl výběr iniciován.
     * @param _from Adresa na L2, která iniciuje převod.
     * @param _to Adresa na L1, na kterou se má výběr připsat.
     * @param _amount Částka ERC20 k vložení.
     * @param _data Data poskytnutá odesílatelem na L2. Tato data jsou poskytována
     *   pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
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

Výběry (a další zprávy z L2 do L1) v Optimism jsou dvoukrokový proces:

1. Iniciační transakce na L2.
2. Finalizační nebo nárokovací transakce na L1.
   Tato transakce se musí uskutečnit po skončení [období pro napadení chyb](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) pro transakci na L2.

### IL1StandardBridge {#il1standardbridge}

[Toto rozhraní je definováno zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Tento soubor obsahuje definice událostí a funkcí pro ETH.
Tyto definice jsou velmi podobné těm, které jsou definovány v `IL1ERC20Bridge` výše pro ERC-20.

Rozhraní přemostění je rozděleno do dvou souborů, protože některé tokeny ERC-20 vyžadují vlastní zpracování a standardní přemostění je nemůže zpracovat.
Tímto způsobem může vlastní přemostění, které takový token zpracovává, implementovat `IL1ERC20Bridge` a nemusí přemosťovat také ETH.

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

Tato událost je téměř totožná s verzí ERC-20 (`ERC20DepositInitiated`), pouze bez adres tokenů L1 a L2.
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
     * @dev Vloží částku ETH na zůstatek volajícího na L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Vloží částku ETH na zůstatek příjemce na L2.
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
     * @dev Dokončí výběr z L2 na L1 a připíše prostředky na zůstatek příjemce
     * tokenu ETH na L1. Protože tuto funkci může volat pouze xDomainMessenger, nebude nikdy volána
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

[Tento kontrakt](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) je zděděn oběma přemostěními ([L1](#the-l1-bridge-contract) a [L2](#the-l2-bridge-contract)) pro posílání zpráv na druhou vrstvu.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importy rozhraní */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) říká kontraktu, jak posílat zprávy na druhou vrstvu pomocí mezidoménového posílače zpráv.
Tento mezidoménový posílač zpráv je zcela jiný systém a zaslouží si vlastní článek, který, doufám, v budoucnu napíšu.

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

    // Kontrakt Messengeru použitý k odesílání a přijímání zpráv z druhé domény.
    address public messenger;

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _messenger Adresa CrossDomainMessenger na aktuální vrstvě.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Jediný parametr, který kontrakt potřebuje znát, je adresa mezidoménového posílače zpráv na této vrstvě.
Tento parametr je nastaven jednou, v konstruktoru, a nikdy se nemění.

```solidity

    /**********************
     * Modifikátory funkcí *
     **********************/

    /**
     * Vynucuje, aby upravená funkce byla volána pouze z konkrétního mezidoménového účtu.
     * @param _sourceDomainAccount Jediný účet na původní doméně, který je
     *  oprávněn tuto funkci volat.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Mezidoménové zasílání zpráv je dostupné jakémukoli kontraktu na blockchainu, kde běží (buď na hlavní síti Etherea, nebo Optimism).
Potřebujeme ale, aby přemostění na každé straně důvěřovalo _pouze_ určitým zprávám, pokud pocházejí z přemostění na druhé straně.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: kontrakt posílače zpráv není ověřený"
        );
```

Důvěřovat lze pouze zprávám z příslušného mezidoménového posílače zpráv (`messenger`, jak uvidíte níže).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: nesprávný odesílatel mezidoménové zprávy"
        );
```

Způsob, jakým mezidoménový posílač zpráv poskytuje adresu, která odeslala zprávu z druhé vrstvy, je [funkce `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Pokud je volána v transakci, která byla zprávou iniciována, může tyto informace poskytnout.

Musíme se ujistit, že zpráva, kterou jsme obdrželi, pochází z druhého přemostění.

```solidity

        _;
    }

    /**********************
     * Interní funkce *
     **********************/

    /**
     * Získá posílače zpráv, obvykle z úložiště. Tato funkce je vystavena pro případ, že by ji
     * dětský kontrakt potřeboval přepsat.
     * @return Adresa kontraktu mezidoménového posílače zpráv, který by se měl použít.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Tato funkce vrací mezidoménového posílače zpráv.
Používáme funkci spíše než proměnnou `messenger`, aby kontrakty, které z ní dědí, mohly použít algoritmus k určení, který mezidoménový posílač zpráv použít.

```solidity

    /**
     * Odešle zprávu účtu v jiné doméně.
     * @param _crossDomainTarget Zamýšlený příjemce v cílové doméně.
     * @param _message Data k odeslání cíli (obvykle calldata pro funkci s
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Limit transakčních poplatků pro příjem zprávy v cílové doméně.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

A nakonec funkce, která posílá zprávu na druhou vrstvu.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) je statický analyzátor, který Optimism spouští na každém kontraktu, aby hledal zranitelnosti a další potenciální problémy.
V tomto případě následující řádek spouští dvě zranitelnosti:

1. [Události opětovného vstupu (reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Nezávažné opětovné vstupy (reentrancy)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

V tomto případě se o opětovné vstupy (reentrancy) nestaráme, protože víme, že `getCrossDomainMessenger()` vrací důvěryhodnou adresu, i když Slither to nemá jak vědět.

### Kontrakt přemostění L1 {#the-l1-bridge-contract}

[Zdrojový kód tohoto kontraktu je zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Rozhraní mohou být součástí jiných kontraktů, takže musí podporovat širokou škálu verzí Solidity.
Ale samotné přemostění je náš kontrakt a můžeme být přísní ohledně toho, jakou verzi Solidity používá.

```solidity
/* Importy rozhraní */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) a [IL1StandardBridge](#IL1StandardBridge) jsou vysvětleny výše.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nám umožňuje vytvářet zprávy pro ovládání standardního přemostění na L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Toto rozhraní](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nám umožňuje ovládat kontrakty ERC-20.
[Více si o tom můžete přečíst zde](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importy knihoven */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Jak je vysvětleno výše](#crossdomainenabled), tento kontrakt se používá pro mezivrstvové zasílání zpráv.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses` (https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) má adresy kontraktů L2, které mají vždy stejnou adresu. To zahrnuje standardní přemostění na L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Nástroje pro adresy OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Používá se k rozlišení mezi adresami kontraktů a adresami patřícími externě vlastněným účtům (EOA).

Všimněte si, že se nejedná o dokonalé řešení, protože neexistuje způsob, jak rozlišit mezi přímými voláními a voláními provedenými z konstruktoru kontraktu, ale alespoň nám to umožňuje identifikovat a zabránit některým běžným chybám uživatelů.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) podporuje dva způsoby, jak může kontrakt nahlásit selhání:

1. Zpětné vrácení (revert)
2. Vrátit `false`

Zpracování obou případů by náš kód zkomplikovalo, takže místo toho používáme [`SafeERC20` od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), který zajišťuje, že [všechna selhání vedou k zpětnému vrácení (revert)](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Přemostění L1 pro ETH a ERC20 je kontrakt, který ukládá vložené prostředky z L1 a standardní
 * tokeny, které se používají na L2. Synchronizuje odpovídající přemostění L2, informuje ho o vkladech
 * a naslouchá mu pro nově finalizované výběry.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Tento řádek určuje, že se má použít obal `SafeERC20` pokaždé, když použijeme rozhraní `IERC20`.

```solidity

    /********************************
     * Reference na externí kontrakty *
     ********************************/

    address public l2TokenBridge;
```

Adresa [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Mapuje token L1 na token L2 k zůstatku vloženého tokenu L1
    mapping(address => mapping(address => uint256)) public deposits;
```

Dvojité [mapování](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) jako je toto, je způsob, jak definovat [dvojrozměrné řídké pole](https://en.wikipedia.org/wiki/Sparse_matrix).
Hodnoty v této datové struktuře jsou identifikovány jako `deposit[adresa tokenu L1][adresa tokenu L2]`.
Výchozí hodnota je nula.
Do úložiště jsou zapsány pouze buňky, které jsou nastaveny na jinou hodnotu.

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Tento kontrakt se nachází za proxy, takže parametry konstruktoru nebudou použity.
    constructor() CrossDomainEnabled(address(0)) {}
```

Chceme mít možnost upgradovat tento kontrakt bez nutnosti kopírovat všechny proměnné v úložišti.
K tomu používáme [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), kontrakt, který používá [`delegatecall`](https://solidity-by-example.org/delegatecall/) k přenosu volání na samostatný kontrakt, jehož adresa je uložena v proxy kontraktu (při upgradu řeknete proxy, aby změnila tuto adresu).
Při použití `delegatecall` zůstává úložiště úložištěm _volajícího_ kontraktu, takže hodnoty všech proměnných stavu kontraktu zůstávají nedotčeny.

Jedním z důsledků tohoto vzoru je, že úložiště kontraktu, který je _volaný_ pomocí `delegatecall`, se nepoužívá, a proto hodnoty konstruktoru, které mu jsou předány, nejsou důležité.
To je důvod, proč můžeme konstruktoru `CrossDomainEnabled` poskytnout nesmyslnou hodnotu.
Je to také důvod, proč je níže uvedená inicializace oddělena od konstruktoru.

```solidity
    /******************
     * Inicializace *
     ******************/

    /**
     * @param _l1messenger Adresa L1 Messengeru používaná pro meziřetězcovou komunikaci.
     * @param _l2TokenBridge Adresa standardního přemostění na L2.
     */
    // slither-disable-next-line external-function
```

Tento [test Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifikuje funkce, které nejsou volány z kódu kontraktu a mohly by být proto deklarovány jako `external` místo `public`.
Náklady na transakční poplatky u funkcí `external` mohou být nižší, protože jim mohou být parametry poskytnuty v calldata.
Funkce deklarované jako `public` musí být přístupné zevnitř kontraktu.
Kontrakty nemohou měnit svá vlastní calldata, takže parametry musí být v paměti.
Když je taková funkce volána externě, je nutné zkopírovat calldata do paměti, což stojí transakční poplatky.
V tomto případě je funkce volána pouze jednou, takže neefektivita pro nás není důležitá.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Kontrakt již byl inicializován.");
```

Funkce `initialize` by měla být volána pouze jednou.
Pokud se adresa mezidoménového posílače zpráv na L1 nebo přemostění tokenu na L2 změní, vytvoříme nové proxy a nové přemostění, které ho volá.
Je nepravděpodobné, že by k tomu došlo, s výjimkou upgradu celého systému, což je velmi vzácná událost.

Všimněte si, že tato funkce nemá žádný mechanismus, který by omezoval, _kdo_ ji může volat.
To znamená, že teoreticky by útočník mohl počkat, až nasadíme proxy a první verzi přemostění, a poté provést [front-running](https://solidity-by-example.org/hacks/front-running/) a dostat se k funkci `initialize` dříve, než to udělá legitimní uživatel. Existují však dvě metody, jak tomu zabránit:

1. Pokud kontrakty nejsou nasazeny přímo pomocí EOA, ale [v transakci, která nechá vytvořit jiný kontrakt](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), celý proces může být atomický a dokončen dříve, než je provedena jakákoli jiná transakce.
2. Pokud legitimní volání `initialize` selže, je vždy možné ignorovat nově vytvořené proxy a přemostění a vytvořit nové.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Toto jsou dva parametry, které přemostění potřebuje znát.

```solidity

    /**************
     * Vkládání *
     **************/

    /** @dev Modifikátor vyžadující, aby odesílatel byl EOA. Toto ověření by mohl obejít zákeřný
     *  kontrakt pomocí initcode, ale řeší to chybu uživatele, které se chceme vyhnout.
     */
    modifier onlyEOA() {
        // Používá se k zastavení vkladů z kontraktů (zabraňuje náhodné ztrátě tokenů)
        require(!Address.isContract(msg.sender), "Účet není EOA");
        _;
    }
```

To je důvod, proč jsme potřebovali nástroje `Address` od OpenZeppelin.

```solidity
    /**
     * @dev Tuto funkci lze volat bez dat
     * pro vložení částky ETH na zůstatek volajícího na L2.
     * Protože funkce receive nepřijímá data, konzervativní
     * výchozí částka se předává na L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Tato funkce existuje pro testovací účely.
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

Tyto dvě funkce jsou obaly kolem `_initiateETHDeposit`, funkce, která zpracovává skutečný vklad ETH.

```solidity
    /**
     * @dev Provádí logiku pro vklady uložením ETH a informováním L2 ETH Gateway o
     * vkladu.
     * @param _from Účet, ze kterého se má vklad na L1 stáhnout.
     * @param _to Účet, na který se má vklad na L2 připsat.
     * @param _l2Gas Limit transakčních poplatků potřebný k dokončení vkladu na L2.
     * @param _data Volitelná data k předání na L2. Tato data jsou poskytována
     *        pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
     *        délky tyto kontrakty neposkytují žádné záruky ohledně jejich obsahu.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Sestavení calldata pro volání finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Způsob, jakým fungují mezidoménové zprávy, je ten, že cílový kontrakt je volán se zprávou jako jeho calldata.
Kontrakty v Solidity vždy interpretují svá calldata v souladu s
[specifikacemi ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Funkce Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) vytváří tato calldata.

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

Zpráva zde znamená volání [funkce `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) s těmito parametry:

| Parametr                        | Hodnota                                                                                  | Význam                                                                                                                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Speciální hodnota, která na L1 představuje ETH (který není tokenem ERC-20).                                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrakt na L2, který spravuje ETH v síti Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (tento kontrakt je určen pouze pro interní použití v síti Optimism). |
| \_from    | \_from                                                             | Adresa na L1, která odesílá ETH.                                                                                                                                                         |
| \_to      | \_to                                                               | Adresa na L2, která přijímá ETH.                                                                                                                                                         |
| částka                          | msg.value                                                                | Odeslaná částka ve wei (která již byla odeslána do přemostění).                                                                                                       |
| \_data    | \_data                                                             | Další data, která se připojí k vkladu.                                                                                                                                                   |

```solidity
        // Odeslání calldata na L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Odeslání zprávy prostřednictvím mezidoménového posílače zpráv.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Vyslat událost, aby se o tomto převodu informovala jakákoli decentralizovaná aplikace, která naslouchá.

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

Tyto dvě funkce jsou obaly kolem `_initiateERC20Deposit`, funkce, která zpracovává skutečný vklad ERC-20.

```solidity
    /**
     * @dev Provádí logiku pro vklady informováním kontraktu L2 Deposited Token
     * o vkladu a voláním handleru pro uzamčení prostředků L1. (např. transferFrom)
     *
     * @param _l1Token Adresa ERC20 na L1, který vkládáme.
     * @param _l2Token Adresa příslušného ERC20 na L2.
     * @param _from Účet, ze kterého se má vklad na L1 stáhnout.
     * @param _to Účet, na který se má vklad na L2 připsat.
     * @param _amount Částka ERC20 k vložení.
     * @param _l2Gas Limit transakčních poplatků potřebný k dokončení vkladu na L2.
     * @param _data Volitelná data k předání na L2. Tato data jsou poskytována
     *        pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
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

Tato funkce je podobná výše uvedené funkci `_initiateETHDeposit`, s několika důležitými rozdíly.
Prvním rozdílem je, že tato funkce přijímá adresy tokenů a částku k převodu jako parametry.
V případě ETH volání přemostění již zahrnuje převod aktiv na účet přemostění (`msg.value`).

```solidity
        // Když je vklad iniciován na L1, přemostění L1 převede prostředky na sebe pro budoucí
        // výběry. safeTransferFrom také kontroluje, zda má kontrakt kód, takže toto selže, pokud
        // _from je EOA nebo address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Převody tokenů ERC-20 se řídí jiným procesem než ETH:

1. Uživatel (`_from`) udělí přemostění povolení k převodu příslušných tokenů.
2. Uživatel zavolá přemostění s adresou kontraktu tokenu, částkou atd.
3. Přemostění převede tokeny (na sebe) jako součást procesu vkladu.

První krok se může uskutečnit v samostatné transakci od posledních dvou.
Front-running však není problém, protože obě funkce, které volají `_initiateERC20Deposit` (`depositERC20` a `depositERC20To`), volají tuto funkci pouze s `msg.sender` jako parametrem `_from`.

```solidity
        // Sestavení calldata pro _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Odeslání calldata na L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Přidat vloženou částku tokenů do datové struktury `deposits`.
Může existovat více adres na L2, které odpovídají stejnému tokenu ERC-20 na L1, takže pro sledování vkladů nestačí použít zůstatek přemostění tokenu ERC-20 na L1.

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

Přemostění L2 odešle zprávu mezidoménovému posílači zpráv L2, což způsobí, že mezidoménový posílač zpráv L1 zavolá tuto funkci (samozřejmě až po odeslání [transakce, která zprávu finalizuje](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) na L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Ujistěte se, že se jedná o _legitimní_ zprávu, která pochází od mezidoménového posílače zpráv a pochází z přemostění tokenu L2.
Tato funkce se používá k výběru ETH z přemostění, takže se musíme ujistit, že ji volá pouze oprávněný volající.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Způsobem převodu ETH je zavolat příjemce s částkou wei v `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: Převod ETH selhal");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Vyslat událost o výběru.

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

Tato funkce je podobná výše uvedené funkci `finalizeETHWithdrawal` s nezbytnými změnami pro tokeny ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aktualizovat datovou strukturu `deposits`.

```solidity

        // Když je výběr finalizován na L1, přemostění L1 převede prostředky vybírajícímu
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Dočasné - migrace ETH *
     *****************************/

    /**
     * @dev Přidá zůstatek ETH na účet. Toto je určeno k tomu, aby se ETH
     * mohlo migrovat ze staré brány na novou bránu.
     * POZNÁMKA: Toto je ponecháno pouze pro jeden upgrade, abychom mohli přijmout migrované ETH ze
     * starého kontraktu
     */
    function donateETH() external payable {}
}
```

Existovala starší implementace přemostění.
Když jsme přešli z této implementace na tuto, museli jsme přesunout všechna aktiva.
Tokeny ERC-20 se dají jednoduše přesunout.
Abyste však mohli převést ETH do kontraktu, potřebujete souhlas tohoto kontraktu, což nám poskytuje `donateETH`.

## Tokeny ERC-20 na L2 {#erc-20-tokens-on-l2}

Aby token ERC-20 vyhovoval standardnímu přemostění, musí umožnit standardnímu přemostění, a _pouze_ standardnímu přemostění, razit tokeny.
To je nutné, protože přemostění musí zajistit, aby se počet tokenů v oběhu v síti Optimism rovnal počtu tokenů uzamčených v kontraktu přemostění na L1.
Pokud by na L2 bylo příliš mnoho tokenů, někteří uživatelé by nemohli svá aktiva přemostit zpět na L1.
Místo důvěryhodného přemostění bychom v podstatě znovu vytvořili [bankovnictví s částečnými rezervami](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Pokud je na L1 příliš mnoho tokenů, některé z nich by zůstaly navždy uzamčeny v kontraktu přemostění, protože neexistuje způsob, jak je uvolnit bez spálení tokenů na L2.

### IL2StandardERC20 {#il2standarderc20}

Každý token ERC-20 na L2, který používá standardní přemostění, musí poskytovat [toto rozhraní](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), které má funkce a události, jež standardní přemostění potřebuje.

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

[Rozhraní ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) se používá ke specifikaci funkcí, které kontrakt poskytuje.
[Standard si můžete přečíst zde](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Tato funkce poskytuje adresu tokenu L1, který je přemostěn do tohoto kontraktu.
Všimněte si, že podobnou funkci v opačném směru nemáme.
Musíme být schopni přemostit jakýkoli token na L1 bez ohledu na to, zda podpora na L2 byla plánována při jeho implementaci či nikoli.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funkce a události pro ražbu (vytvoření) a pálení (zničení) tokenů.
Přemostění by mělo být jedinou entitou, která může tyto funkce spouštět, aby se zajistil správný počet tokenů (rovný počtu tokenů uzamčených na L1).

### L2StandardERC20 {#L2StandardERC20}

[Toto je naše implementace rozhraní `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Pokud nepotřebujete žádnou vlastní logiku, měli byste použít tuto.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrakt ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism nevěří v znovuobjevování kola, zejména když je kolo dobře auditováno a musí být dostatečně důvěryhodné pro držení aktiv.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Toto jsou dva další konfigurační parametry, které vyžadujeme a které ERC-20 normálně nemá.

```solidity

    /**
     * @param _l2Bridge Adresa standardního přemostění na L2.
     * @param _l1Token Adresa odpovídajícího tokenu na L1.
     * @param _name Název ERC20.
     * @param _symbol Symbol ERC20.
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

Nejprve zavoláme konstruktor kontraktu, ze kterého dědíme (`ERC20(_name, _symbol)`), a poté nastavíme vlastní proměnné.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Razit a pálit může pouze přemostění L2");
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

Takto funguje [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Každé rozhraní je souborem podporovaných funkcí a je identifikováno jako [exkluzivní nebo](https://en.wikipedia.org/wiki/Exclusive_or) [selektorů funkcí ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) těchto funkcí.

Přemostění na L2 používá ERC-165 jako kontrolu správnosti, aby se ujistilo, že kontrakt ERC-20, do kterého posílá aktiva, je `IL2StandardERC20`.

**Poznámka:** Nic nebrání tomu, aby podvodný kontrakt poskytoval falešné odpovědi na `supportsInterface`, takže se jedná o mechanismus kontroly správnosti, _nikoli_ o bezpečnostní mechanismus.

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

Pouze přemostění L2 smí razit a pálit aktiva.

`_mint` a `_burn` jsou ve skutečnosti definovány v [kontraktu ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Tento kontrakt je pouze nevystavuje externě, protože podmínky pro ražbu a pálení tokenů jsou tak rozmanité jako počet způsobů použití ERC-20.

## Kód přemostění L2 {#l2-bridge-code}

Toto je kód, který spouští přemostění v síti Optimism.
[Zdrojový kód tohoto kontraktu je zde](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importy rozhraní */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Rozhraní [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) je velmi podobné [ekvivalentu L1](#IL1ERC20Bridge), který jsme viděli výše.
Existují dva významné rozdíly:

1. Na L1 iniciujete vklady a finalizujete výběry.
   Zde iniciujete výběry a finalizujete vklady.
2. Na L1 je nutné rozlišovat mezi ETH a tokeny ERC-20.
   Na L2 můžeme použít stejné funkce pro obojí, protože interně jsou zůstatky ETH v síti Optimism spravovány jako token ERC-20 s adresou [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importy knihoven */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importy kontraktů */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Standardní přemostění L2 je kontrakt, který spolupracuje se standardním přemostěním L1,
 * aby umožnil přechody ETH a ERC20 mezi L1 a L2.
 * Tento kontrakt funguje jako razič nových tokenů, když se dozví o vkladech do standardního
 * přemostění L1.
 * Tento kontrakt také funguje jako palič tokenů určených k výběru a informuje přemostění L1
 * o uvolnění prostředků L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Reference na externí kontrakty *
     ********************************/

    address public l1TokenBridge;
```

Sledovat adresu přemostění L1.
Všimněte si, že na rozdíl od ekvivalentu na L1 zde tuto proměnnou _potřebujeme_.
Adresa přemostění L1 není známa předem.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Mezidoménový posílač zpráv používaný tímto kontraktem.
     * @param _l1TokenBridge Adresa přemostění L1 nasazeného na hlavní řetězec.
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

Tyto dvě funkce iniciují výběry.
Všimněte si, že není třeba specifikovat adresu tokenu L1.
Očekává se, že tokeny na L2 nám sdělí adresu svého ekvivalentu na L1.

```solidity

    /**
     * @dev Provádí logiku pro výběry pálením tokenu a informováním
     *      brány tokenu L1 o výběru.
     * @param _l2Token Adresa tokenu na L2, kde je výběr iniciován.
     * @param _from Účet, ze kterého se má výběr na L2 stáhnout.
     * @param _to Účet, na který se má výběr na L1 připsat.
     * @param _amount Částka tokenu k výběru.
     * @param _l1Gas Nepoužito, ale zahrnuto pro případné úvahy o budoucí kompatibilitě.
     * @param _data Volitelná data k předání na L1. Tato data jsou poskytována
     *        pouze pro pohodlí externích kontraktů. Kromě vynucení maximální
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
        // Když je výběr iniciován, spálíme prostředky vybírajícího, abychom zabránili následnému použití na L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Všimněte si, že se _nespoléháme_ na parametr `_from`, ale na `msg.sender`, který je mnohem těžší zfalšovat (pokud vím, nemožné).

```solidity

        // Sestavení calldata pro l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Na L1 je nutné rozlišovat mezi ETH a ERC-20.

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

        // Odeslání zprávy do přemostění na L1
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

Tuto funkci volá `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Ujistěte se, že zdroj zprávy je legitimní.
To je důležité, protože tato funkce volá `_mint` a mohla by být použita k poskytnutí tokenů, které nejsou kryty tokeny, jež přemostění vlastní na L1.

```solidity
        // Zkontrolujte, zda je cílový token vyhovující a
        // ověřte, že vložený token na L1 odpovídá reprezentaci vloženého tokenu na L2 zde
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Kontroly správnosti:

1. Je podporováno správné rozhraní
2. Adresa L1 kontraktu ERC-20 na L2 odpovídá zdroji L1 tokenů.

```solidity
        ) {
            // Když je vklad finalizován, připíšeme na účet na L2 stejnou částku
            // tokenů.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Pokud kontroly správnosti projdou, dokončete vklad:

1. Razit tokeny
2. Vyslat příslušnou událost

```solidity
        } else {
            // Buď token L2, do kterého se vkládá, nesouhlasí se správnou adresou
            // svého tokenu L1, nebo nepodporuje správné rozhraní.
            // Toto by se mělo stát pouze v případě zákeřného tokenu L2, nebo pokud uživatel nějakým způsobem
            // zadal špatnou adresu tokenu L2 pro vklad.
            // V obou případech zde proces zastavíme a sestavíme zprávu o výběru,
            // aby si uživatelé mohli v některých případech své prostředky vybrat.
            // Neexistuje žádný způsob, jak zcela zabránit zákeřným kontraktům tokenů, ale toto omezuje
            // chyby uživatelů a zmírňuje některé formy zákeřného chování kontraktů.
```

Pokud uživatel udělal zjistitelnou chybu použitím špatné adresy tokenu na L2, chceme vklad zrušit a vrátit tokeny na L1.
Jediný způsob, jak to můžeme udělat z L2, je poslat zprávu, která bude muset počkat na období pro napadení chyby, ale to je pro uživatele mnohem lepší než trvalá ztráta tokenů.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // zde jsme prohodili _to a _from, abychom vklad vrátili odesílateli
                _from,
                _amount,
                _data
            );

            // Odeslání zprávy do přemostění na L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Závěr {#conclusion}

Standardní přemostění je nejflexibilnějším mechanismem pro převody aktiv.
Protože je však tak obecný, není vždy nejjednodušším mechanismem k použití.
Zejména pro výběry většina uživatelů dává přednost použití [přemostění třetích stran](https://optimism.io/apps#bridge), která nečekají na období pro napadení a nevyžadují Merkleho důkaz k dokončení výběru.

Tato přemostění obvykle fungují tak, že mají aktiva na L1, která okamžitě poskytnou za malý poplatek (často nižší než náklady na transakční poplatky za výběr standardním přemostěním).
Když přemostění (nebo lidé, kteří ho provozují) předpokládá, že bude mít málo aktiv na L1, převede dostatečná aktiva z L2. Protože se jedná o velmi velké výběry, náklady na výběr se amortizují na velkou částku a představují mnohem menší procento.

Doufejme, že vám tento článek pomohl lépe pochopit, jak funguje druhá vrstva a jak psát kód v Solidity, který je jasný a bezpečný.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
