---
title: "Walkthrough zum Vertrag der Optimism-Standard-Brücke"
description: Wie funktioniert die Standard-Brücke für Optimism? Warum funktioniert sie auf diese Weise?
author: Ori Pomerantz ist der Autor des Linux Kernel Module Programming Guide
tags: [ "solidity", "Brücke", "Layer 2" ]
skill: intermediate
published: 2022-03-30
lang: de
---

[Optimism](https://www.optimism.io/) ist ein [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistic Rollups können Transaktionen zu einem viel niedrigeren Preis als das Ethereum Mainnet (auch bekannt als Layer 1 oder L1) verarbeiten, da Transaktionen nur von einigen wenigen Knoten anstatt von jedem Knoten im Netzwerk verarbeitet werden.
Gleichzeitig werden alle Daten auf L1 geschrieben, sodass alles mit der Integrität und Verfügbarkeit des Mainnets nachgewiesen und rekonstruiert werden kann.

Um L1-Assets auf Optimism (oder einem anderen L2) zu verwenden, müssen die Assets [überbrückt](/bridges/#prerequisites) werden.
Eine Möglichkeit, dies zu erreichen, besteht darin, dass Benutzer Assets (ETH und [ERC-20-Tokens](/developers/docs/standards/tokens/erc-20/) sind die häufigsten) auf L1 sperren und gleichwertige Assets zur Verwendung auf L2 erhalten.
Schließlich möchte derjenige, der sie am Ende besitzt, sie vielleicht wieder auf L1 zurückbrücken.
Dabei werden die Assets auf L2 verbrannt und dann auf L1 wieder an den Benutzer freigegeben.

So funktioniert die [Optimism Standard-Brücke](https://docs.optimism.io/app-developers/bridging/standard-bridge).
In diesem Artikel gehen wir den Quellcode für diese Brücke durch, um zu sehen, wie sie funktioniert, und um sie als Beispiel für gut geschriebenen Solidity-Code zu studieren.

## Kontrollflüsse {#control-flows}

Die Brücke hat zwei Hauptabläufe:

- Einzahlung (von L1 nach L2)
- Auszahlung (von L2 nach L1)

### Einzahlungsablauf {#deposit-flow}

#### Layer 1 {#deposit-flow-layer-1}

1. Bei der Einzahlung eines ERC-20 erteilt der Einzahler der Brücke eine Freigabe, den eingezahlten Betrag auszugeben.
2. Der Einzahler ruft die L1-Brücke auf (`depositERC20`, `depositERC20To`, `depositETH` oder `depositETHTo`)
3. Die L1-Brücke nimmt das überbrückte Asset in Besitz.
   - ETH: Das Asset wird vom Einzahler als Teil des Aufrufs übertragen.
   - ERC-20: Das Asset wird von der Brücke unter Verwendung der vom Einzahler erteilten Freigabe an sich selbst übertragen.
4. Die L1-Brücke verwendet den domänenübergreifenden Nachrichtenmechanismus, um `finalizeDeposit` auf der L2-Brücke aufzurufen.

#### Layer 2 {#deposit-flow-layer-2}

5. Die L2-Brücke überprüft, ob der Aufruf von `finalizeDeposit` rechtmäßig ist:
   - Kam vom domänenübergreifenden Nachrichtenvertrag
   - War ursprünglich von der Brücke auf L1
6. Die L2-Brücke prüft, ob der ERC-20-Token-Vertrag auf L2 der richtige ist:
   - Der L2-Vertrag meldet, dass sein L1-Gegenstück dasselbe ist wie das, von dem die Tokens auf L1 kamen
   - Der L2-Vertrag meldet, dass er die richtige Schnittstelle unterstützt ([unter Verwendung von ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Wenn der L2-Vertrag der richtige ist, rufen Sie ihn auf, um die entsprechende Anzahl von Tokens an die entsprechende Adresse zu prägen. Wenn nicht, starten Sie einen Auszahlungsprozess, damit der Benutzer die Tokens auf L1 beanspruchen kann.

### Auszahlungsablauf {#withdrawal-flow}

#### Layer 2 {#withdrawal-flow-layer-2}

1. Der Auszahlende ruft die L2-Brücke auf (`withdraw` oder `withdrawTo`)
2. Die L2-Brücke verbrennt die entsprechende Anzahl von Tokens, die `msg.sender` gehören.
3. Die L2-Brücke verwendet den domänenübergreifenden Nachrichtenmechanismus, um `finalizeETHWithdrawal` oder `finalizeERC20Withdrawal` auf der L1-Brücke aufzurufen.

#### Layer 1 {#withdrawal-flow-layer-1}

4. Die L1-Brücke überprüft, ob der Aufruf von `finalizeETHWithdrawal` oder `finalizeERC20Withdrawal` rechtmäßig ist:
   - Kam vom domänenübergreifenden Nachrichtenmechanismus
   - War ursprünglich von der Brücke auf L2
5. Die L1-Brücke überträgt das entsprechende Asset (ETH oder ERC-20) an die entsprechende Adresse.

## Layer-1-Code {#layer-1-code}

Dies ist der Code, der auf L1, dem Ethereum Mainnet, läuft.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Diese Schnittstelle ist hier definiert](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Sie enthält Funktionen und Definitionen, die für die Überbrückung von ERC-20-Tokens erforderlich sind.

```solidity
// SPDX-License-Identifier: MIT
```

[Der größte Teil des Codes von Optimism wird unter der MIT-Lizenz veröffentlicht](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Zum Zeitpunkt des Schreibens ist die neueste Version von Solidity 0.8.12.
Bis zur Veröffentlichung von Version 0.9.0 wissen wir nicht, ob dieser Code damit kompatibel ist oder nicht.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Ereignisse *
     **********/

    event ERC20DepositInitiated(
```

In der Terminologie der Optimism-Brücke bedeutet _Einzahlung_ eine Übertragung von L1 nach L2 und _Auszahlung_ eine Übertragung von L2 nach L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

In den meisten Fällen ist die Adresse eines ERC-20 auf L1 nicht dieselbe wie die Adresse des entsprechenden ERC-20 auf L2.
[Sie können die Liste der Token-Adressen hier einsehen](https://static.optimism.io/optimism.tokenlist.json).
Die Adresse mit `chainId` 1 befindet sich auf L1 (Mainnet) und die Adresse mit `chainId` 10 auf L2 (Optimism).
Die anderen beiden `chainId`-Werte sind für das Kovan-Testnetz (42) und das Optimistic Kovan-Testnetz (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Es ist möglich, Notizen zu Übertragungen hinzuzufügen, in diesem Fall werden sie zu den Ereignissen hinzugefügt, die sie melden.

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

Derselbe Brückenvertrag behandelt Übertragungen in beide Richtungen.
Im Fall der L1-Brücke bedeutet dies die Initiierung von Einzahlungen und die Finalisierung von Auszahlungen.

```solidity

    /********************
     * Öffentliche Funktionen *
     ********************/

    /**
     * @dev Ruft die Adresse des entsprechenden L2-Brückenvertrags ab.
     * @return Adresse des entsprechenden L2-Brückenvertrags.
     */
    function l2TokenBridge() external returns (address);
```

Diese Funktion wird nicht wirklich benötigt, da es sich auf L2 um einen vorab bereitgestellten Vertrag (predeployed contract) handelt, der sich also immer an der Adresse `0x4200000000000000000000000000000000000010` befindet.
Sie ist hier aus Symmetriegründen zur L2-Brücke, da die Adresse der L1-Brücke _nicht_ trivial zu kennen ist.

```solidity
    /**
     * @dev Zahlt einen Betrag des ERC20 auf das Guthaben des Aufrufers auf L2 ein.
     * @param _l1Token Adresse des L1 ERC20, das wir einzahlen.
     * @param _l2Token Adresse des entsprechenden L2 ERC20.
     * @param _amount Einzuzahlender Betrag des ERC20.
     * @param _l2Gas Erforderliches Gaslimit, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über ihren Inhalt.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Der Parameter `_l2Gas` ist die Menge an L2-Gas, die die Transaktion verbrauchen darf.
[Bis zu einem bestimmten (hohen) Limit ist dies kostenlos](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), daher sollte es kein Problem sein, es sei denn, der ERC-20-Vertrag macht beim Prägen etwas wirklich Seltsames.
Diese Funktion kümmert sich um das übliche Szenario, bei dem ein Benutzer Assets an dieselbe Adresse auf einer anderen Blockchain überbrückt.

```solidity
    /**
     * @dev zahlt einen Betrag von ERC20 auf das Guthaben eines Empfängers auf L2 ein.
     * @param _l1Token Adresse des L1 ERC20, den wir einzahlen
     * @param _l2Token Adresse des entsprechenden L2 ERC20 auf L1
     * @param _to L2-Adresse, auf die die Abhebung gutgeschrieben werden soll.
     * @param _amount Einzuzahlender Betrag des ERC20.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über ihren Inhalt.
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

Diese Funktion ist fast identisch mit `depositERC20`, aber sie ermöglicht es Ihnen, den ERC-20 an eine andere Adresse zu senden.

```solidity
    /*************************
     * Cross-Chain-Funktionen *
     *************************/

    /**
     * @dev Schließt eine Auszahlung von L2 nach L1 ab und schreibt den Betrag dem Guthaben des
     * L1-ERC20-Tokens des Empfängers gut.
     * Dieser Aufruf schlägt fehl, wenn die initiierte Auszahlung von L2 noch nicht finalisiert wurde.
     *
     * @param _l1Token Adresse des L1-Tokens, für das finalizeWithdrawal ausgeführt wird.
     * @param _l2Token Adresse des L2-Tokens, auf dem die Auszahlung eingeleitet wurde.
     * @param _from L2-Adresse, die die Übertragung initiiert.
     * @param _to L1-Adresse, der die Auszahlung gutgeschrieben werden soll.
     * @param _amount Einzuzahlender Betrag des ERC20.
     * @param _data Vom Absender auf L2 bereitgestellte Daten. Diese Daten werden
     *   lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *   Länge geben diese Verträge keine Garantien über ihren Inhalt.
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

Auszahlungen (und andere Nachrichten von L2 nach L1) in Optimism sind ein zweistufiger Prozess:

1. Eine initiierende Transaktion auf L2.
2. Eine finalisierende oder beanspruchende Transaktion auf L1.
   Diese Transaktion muss nach dem Ende des [Fehler-Anfechtungszeitraums](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) für die L2-Transaktion erfolgen.

### IL1StandardBridge {#il1standardbridge}

[Diese Schnittstelle ist hier definiert](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Diese Datei enthält Ereignis- und Funktionsdefinitionen für ETH.
Diese Definitionen sind sehr ähnlich zu denen, die oben in `IL1ERC20Bridge` für ERC-20 definiert wurden.

Die Brückenschnittstelle ist auf zwei Dateien aufgeteilt, da einige ERC-20-Tokens eine benutzerdefinierte Verarbeitung erfordern und nicht von der Standardbrücke verarbeitet werden können.
Auf diese Weise kann die benutzerdefinierte Brücke, die einen solchen Token verarbeitet, `IL1ERC20Bridge` implementieren und muss nicht auch ETH überbrücken.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Ereignisse *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Dieses Ereignis ist fast identisch mit der ERC-20-Version (`ERC20DepositInitiated`), jedoch ohne die L1- und L2-Token-Adressen.
Dasselbe gilt für die anderen Ereignisse und die Funktionen.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Öffentliche Funktionen *
     ********************/

    /**
     * @dev Einzahlung eines ETH-Betrags in das Guthaben des Aufrufers auf L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Einzahlung eines ETH-Betrags in das Guthaben eines Empfängers auf L2.
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
     * Cross-Chain-Funktionen *
     *************************/

    /**
     * @dev Schließen Sie eine Auszahlung von L2 nach L1 ab und schreiben Sie den Betrag dem Guthaben des L1-ETH-Tokens des Empfängers gut.
     * Da nur der xDomainMessenger diese Funktion aufrufen kann, wird sie niemals aufgerufen
     * bevor die Auszahlung finalisiert ist.
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

[Dieser Vertrag](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) wird von beiden Brücken ([L1](#the-l1-bridge-contract) und [L2](#the-l2-bridge-contract)) geerbt, um Nachrichten an den anderen Layer zu senden.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Schnittstellen-Importe */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) teilt dem Vertrag mit, wie Nachrichten an den anderen Layer gesendet werden sollen, indem der Cross-Domain-Messenger verwendet wird.
Dieser Cross-Domain-Messenger ist ein ganz anderes System und verdient einen eigenen Artikel, den ich hoffentlich in Zukunft schreiben werde.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Hilfsvertrag für Verträge, die domänenübergreifende Kommunikation durchführen
 *
 * Verwendeter Compiler: definiert durch vererbenden Vertrag
 */
contract CrossDomainEnabled {
    /*************
     * Variablen *
     *************/

    // Messenger-Vertrag, der zum Senden und Empfangen von Nachrichten aus der anderen Domäne verwendet wird.
    address public messenger;

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _messenger Adresse des CrossDomainMessenger auf der aktuellen Ebene.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Der eine Parameter, den der Vertrag kennen muss, ist die Adresse des Cross-Domain-Messengers auf diesem Layer.
Dieser Parameter wird einmal im Konstruktor gesetzt und ändert sich nie.

```solidity

    /**********************
     * Funktionsmodifikatoren *
     **********************/

    /**
     * Erzwingt, dass die modifizierte Funktion nur von einem bestimmten domänenübergreifenden Konto aufgerufen werden kann.
     * @param _sourceDomainAccount Das einzige Konto in der Ursprungsdomäne, das
     *  zur Ausführung dieser Funktion berechtigt ist.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Das domänenübergreifende Messaging ist für jeden Vertrag auf der Blockchain zugänglich, auf der es läuft (entweder Ethereum Mainnet oder Optimism).
Aber wir brauchen die Brücke auf jeder Seite, um _nur_ bestimmten Nachrichten zu vertrauen, wenn sie von der Brücke auf der anderen Seite kommen.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Nur Nachrichten vom entsprechenden Cross-Domain-Messenger (`messenger`, wie Sie unten sehen) können als vertrauenswürdig eingestuft werden.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Die Art und Weise, wie der Cross-Domain-Messenger die Adresse bereitstellt, die eine Nachricht mit dem anderen Layer gesendet hat, ist [die Funktion `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Solange sie in der Transaktion aufgerufen wird, die durch die Nachricht initiiert wurde, kann sie diese Information bereitstellen.

Wir müssen sicherstellen, dass die Nachricht, die wir erhalten haben, von der anderen Brücke kam.

```solidity

        _;
    }

    /**********************
     * Interne Funktionen *
     **********************/

    /**
     * Ruft den Messenger ab, normalerweise aus dem Speicher. Diese Funktion wird für den Fall verfügbar gemacht, dass ein untergeordneter Vertrag
     * sie überschreiben muss.
     * @return Die Adresse des Cross-Domain-Messenger-Vertrags, der verwendet werden sollte.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Diese Funktion gibt den Cross-Domain-Messenger zurück.
Wir verwenden eine Funktion anstelle der Variable `messenger`, um Verträgen, die von diesem erben, zu ermöglichen, einen Algorithmus zu verwenden, um anzugeben, welcher Cross-Domain-Messenger verwendet werden soll.

```solidity

    /**
     * Sendet eine Nachricht an ein Konto in einer anderen Domäne
     * @param _crossDomainTarget Der beabsichtigte Empfänger in der Zieldomäne
     * @param _message Die an das Ziel zu sendenden Daten (normalerweise Calldata an eine Funktion mit
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Das GasLimit für den Empfang der Nachricht in der Zieldomäne.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Schließlich die Funktion, die eine Nachricht an den anderen Layer sendet.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ist ein statischer Analysator, den Optimism auf jedem Vertrag ausführt, um nach Schwachstellen und anderen potenziellen Problemen zu suchen.
In diesem Fall löst die folgende Zeile zwei Schwachstellen aus:

1. [Reentrancy-Ereignisse](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Gutartige Wiedereintrittsfähigkeit](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

In diesem Fall machen wir uns keine Sorgen über Wiedereintrittsfähigkeit, da wir wissen, dass `getCrossDomainMessenger()` eine vertrauenswürdige Adresse zurückgibt, auch wenn Slither keine Möglichkeit hat, das zu wissen.

### Der L1-Brückenvertrag {#the-l1-bridge-contract}

[Der Quellcode für diesen Vertrag befindet sich hier](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Die Schnittstellen können Teil anderer Verträge sein, daher müssen sie eine breite Palette von Solidity-Versionen unterstützen.
Aber die Brücke selbst ist unser Vertrag, und wir können streng sein, welche Solidity-Version sie verwendet.

```solidity
/* Schnittstellen-Importe */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) und [IL1StandardBridge](#IL1StandardBridge) werden oben erklärt.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ermöglicht es uns, Nachrichten zu erstellen, um die Standardbrücke auf L2 zu steuern.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Diese Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ermöglicht es uns, ERC-20-Verträge zu steuern.
[Hier können Sie mehr darüber lesen](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Bibliotheks-Importe */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Wie oben erklärt](#crossdomainenabled), wird dieser Vertrag für die Interlayer-Nachrichtenübermittlung verwendet.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses` (https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) hat die Adressen für die L2-Verträge, die immer dieselbe Adresse haben. Dies schließt die Standard-Brücke auf L2 mit ein.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelins Address-Dienstprogramme](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Es wird verwendet, um zwischen Vertragsadressen und solchen zu unterscheiden, die zu extern besessenen Konten (EOA) gehören.

Beachten Sie, dass dies keine perfekte Lösung ist, da es keine Möglichkeit gibt, zwischen direkten Aufrufen und Aufrufen aus dem Konstruktor eines Vertrags zu unterscheiden, aber zumindest können wir so einige häufige Benutzerfehler identifizieren und verhindern.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Der ERC-20-Standard](https://eips.ethereum.org/EIPS/eip-20) unterstützt zwei Möglichkeiten für einen Vertrag, einen Fehler zu melden:

1. Zurücksetzen (revert)
2. `false` zurückgeben

Die Handhabung beider Fälle würde unseren Code komplizierter machen, daher verwenden wir stattdessen [OpenZeppelins `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), das sicherstellt, dass [alle Fehler zu einem Revert führen](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Die L1-ETH- und ERC20-Brücke ist ein Vertrag, der hinterlegte L1-Mittel und Standard-Token
 * speichert, die auf L2 verwendet werden. Sie synchronisiert eine entsprechende L2-Brücke, informiert sie über Einzahlungen
 * und hört auf sie für neu finalisierte Auszahlungen.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Diese Zeile gibt an, dass der `SafeERC20`-Wrapper jedes Mal verwendet werden soll, wenn wir die `IERC20`-Schnittstelle verwenden.

```solidity

    /********************************
     * Externe Vertragsreferenzen *
     ********************************/

    address public l2TokenBridge;
```

Die Adresse von [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Ordnet L1-Token zu L2-Token zu Saldo des hinterlegten L1-Tokens zu
    mapping(address => mapping(address => uint256)) public deposits;
```

Ein doppeltes [Mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) wie dieses ist die Art und Weise, wie Sie ein [zweidimensionales dünn besetztes Array](https://en.wikipedia.org/wiki/Sparse_matrix) definieren.
Werte in dieser Datenstruktur werden als `deposit[L1-Token-Adresse][L2-Token-Adresse]` identifiziert.
Der Standardwert ist Null.
Nur Zellen, die auf einen anderen Wert gesetzt sind, werden in den Speicher geschrieben.

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Dieser Vertrag lebt hinter einem Proxy, daher werden die Konstruktorparameter ungenutzt bleiben.
    constructor() CrossDomainEnabled(address(0)) {}
```

Wir wollen diesen Vertrag aktualisieren können, ohne alle Variablen im Speicher kopieren zu müssen.
Dazu verwenden wir einen [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), einen Vertrag, der `delegatecall` verwendet, um Aufrufe an einen separaten Vertrag zu übertragen, dessen Adresse vom Proxy-Vertrag gespeichert wird (wenn Sie ein Upgrade durchführen, weisen Sie den Proxy an, diese Adresse zu ändern).
Wenn Sie `delegatecall` verwenden, bleibt der Speicher der Speicher des _aufrufenden_ Vertrags, sodass die Werte aller Vertragszustandsvariablen unberührt bleiben.

Ein Effekt dieses Musters ist, dass der Speicher des Vertrags, der der _Aufgerufene_ von `delegatecall` ist, nicht verwendet wird und daher die an ihn übergebenen Konstruktorwerte keine Rolle spielen.
Dies ist der Grund, warum wir dem `CrossDomainEnabled`-Konstruktor einen unsinnigen Wert übergeben können.
Dies ist auch der Grund, warum die folgende Initialisierung vom Konstruktor getrennt ist.

```solidity
    /******************
     * Initialisierung *
     ******************/

    /**
     * @param _l1messenger L1 Messenger-Adresse, die für die Cross-Chain-Kommunikation verwendet wird.
     * @param _l2TokenBridge L2-Standard-Brückenadresse.
     */
    // slither-disable-next-line external-function
```

Dieser [Slither-Test](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifiziert Funktionen, die nicht aus dem Vertragscode aufgerufen werden und daher als `external` anstatt `public` deklariert werden könnten.
Die Gaskosten von `external`-Funktionen können niedriger sein, da sie mit Parametern in den Calldata versorgt werden können.
Als `public` deklarierte Funktionen müssen innerhalb des Vertrags zugänglich sein.
Verträge können ihre eigenen Calldata nicht ändern, daher müssen sich die Parameter im Speicher befinden.
Wenn eine solche Funktion extern aufgerufen wird, ist es notwendig, die Calldata in den Speicher zu kopieren, was Gas kostet.
In diesem Fall wird die Funktion nur einmal aufgerufen, sodass die Ineffizienz für uns keine Rolle spielt.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Vertrag wurde bereits initialisiert.");
```

Die `initialize`-Funktion sollte nur einmal aufgerufen werden.
Wenn sich die Adresse des L1-Cross-Domain-Messengers oder der L2-Token-Brücke ändert, erstellen wir einen neuen Proxy und eine neue Brücke, die ihn aufruft.
Dies wird wahrscheinlich nur bei einem Upgrade des gesamten Systems geschehen, ein sehr seltenes Ereignis.

Beachten Sie, dass diese Funktion keinen Mechanismus hat, der einschränkt, _wer_ sie aufrufen kann.
Das bedeutet, dass ein Angreifer theoretisch warten könnte, bis wir den Proxy und die erste Version der Brücke deployen, und dann [Front-Running betreiben](https://solidity-by-example.org/hacks/front-running/) könnte, um zur `initialize`-Funktion zu gelangen, bevor der legitime Benutzer dies tut. Es gibt jedoch zwei Methoden, um dies zu verhindern:

1. Wenn die Verträge nicht direkt von einem EOA, sondern [in einer Transaktion bereitgestellt werden, in der ein anderer Vertrag sie erstellt](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), kann der gesamte Prozess atomar sein und abgeschlossen werden, bevor eine andere Transaktion ausgeführt wird.
2. Wenn der legitime Aufruf von `initialize` fehlschlägt, ist es immer möglich, den neu erstellten Proxy und die Brücke zu ignorieren und neue zu erstellen.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Dies sind die beiden Parameter, die die Brücke kennen muss.

```solidity

    /**************
     * Einzahlung *
     **************/

    /** @dev Modifikator, der erfordert, dass der Absender ein EOA ist. Diese Prüfung könnte von einem bösartigen
     * Vertrag über initcode umgangen werden, aber sie kümmert sich um den Benutzerfehler, den wir vermeiden wollen.
     */
    modifier onlyEOA() {
        // Wird verwendet, um Einzahlungen von Verträgen zu stoppen (verhindert versehentlich verlorene Tokens)
        require(!Address.isContract(msg.sender), "Konto nicht EOA");
        _;
    }
```

Dies ist der Grund, warum wir die `Address`-Dienstprogramme von OpenZeppelin benötigten.

```solidity
    /**
     * @dev Diese Funktion kann ohne Daten aufgerufen werden
     * um einen Betrag von ETH auf das Guthaben des Aufrufers auf L2 einzuzahlen.
     * Da die Empfangsfunktion keine Daten entgegennimmt, wird ein konservativer
     * Standardbetrag an L2 weitergeleitet.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Diese Funktion existiert zu Testzwecken.
Beachten Sie, dass sie nicht in den Schnittstellendefinitionen erscheint – sie ist nicht für den normalen Gebrauch bestimmt.

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

Diese beiden Funktionen sind Wrapper um `_initiateETHDeposit`, die Funktion, die die eigentliche ETH-Einzahlung abwickelt.

```solidity
    /**
     * @dev Führt die Logik für Einzahlungen durch, indem der ETH gespeichert und das L2-ETH-Gateway
     * über die Einzahlung informiert wird.
     * @param _from Konto, von dem die Einzahlung auf L1 abgezogen wird.
     * @param _to Konto, dem die Einzahlung auf L2 gutgeschrieben wird.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über ihren Inhalt.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Konstruiere Calldata für den finalizeDeposit-Aufruf
        bytes memory message = abi.encodeWithSelector(
```

Die Funktionsweise von Cross-Domain-Nachrichten besteht darin, dass der Zielvertrag mit der Nachricht als Calldata aufgerufen wird.
Solidity-Verträge interpretieren ihre Calldata immer gemäß
[den ABI-Spezifikationen](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Die Solidity-Funktion [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) erstellt diese Calldata.

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

Die Nachricht hier ist, [die Funktion `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) mit diesen Parametern aufzurufen:

| Parameter                       | Wert                                                                                     | Bedeutung                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | Adresse(0)                                                            | Sonderwert für ETH (das kein ERC-20-Token ist) auf L1                                                                                                                 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Der L2-Vertrag, der ETH auf Optimism verwaltet, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (dieser Vertrag ist nur für den internen Gebrauch von Optimism bestimmt) |
| \_from    | \_from                                                             | Die Adresse auf L1, die die ETH sendet                                                                                                                                                   |
| \_to      | \_to                                                               | Die Adresse auf L2, die die ETH empfängt                                                                                                                                                 |
| Betrag                          | msg.value                                                                | Gesendeter Betrag in Wei (der bereits an die Brücke gesendet wurde)                                                                                                   |
| \_data    | \_data                                                             | Zusätzliche Daten, die an die Einzahlung angehängt werden                                                                                                                                |

```solidity
        // Senden Sie Calldata nach L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Senden Sie die Nachricht über den Cross-Domain-Messenger.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Ein Ereignis auslösen, um jede dezentralisierte Anwendung, die zuhört, über diese Übertragung zu informieren.

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

Diese beiden Funktionen sind Wrapper um `_initiateERC20Deposit`, die Funktion, die die eigentliche ERC-20-Einzahlung abwickelt.

```solidity
    /**
     * @dev Führt die Logik für Einzahlungen durch, indem der L2 Deposited Token
     * Vertrag über die Einzahlung informiert wird und ein Handler aufgerufen wird, um die L1-Mittel zu sperren. (z. B. transferFrom)
     *
     * @param _l1Token Adresse des L1 ERC20, den wir einzahlen
     * @param _l2Token Adresse des entsprechenden L2 ERC20 auf L1
     * @param _from Konto, von dem die Einzahlung auf L1 abgezogen wird
     * @param _to Konto, dem die Einzahlung auf L2 gutgeschrieben wird
     * @param _amount Einzuzahlender Betrag des ERC20.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über ihren Inhalt.
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

Diese Funktion ist ähnlich wie `_initiateETHDeposit` oben, mit einigen wichtigen Unterschieden.
Der erste Unterschied besteht darin, dass diese Funktion die Token-Adressen und den zu übertragenden Betrag als Parameter erhält.
Im Fall von ETH enthält der Aufruf der Brücke bereits die Übertragung des Assets auf das Brückenkonto (`msg.value`).

```solidity
        // Wenn eine Einzahlung auf L1 initiiert wird, überträgt die L1-Brücke die Mittel an sich selbst für zukünftige
        // Auszahlungen. safeTransferFrom prüft auch, ob der Vertrag Code hat, sodass dies fehlschlägt, wenn
        // _from ein EOA oder address(0) ist.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Übertragungen von ERC-20-Token folgen einem anderen Prozess als ETH:

1. Der Benutzer (`_from`) erteilt der Brücke eine Freigabe, um die entsprechenden Tokens zu übertragen.
2. Der Benutzer ruft die Brücke mit der Adresse des Token-Vertrags, dem Betrag usw. auf.
3. Die Brücke überträgt die Tokens (an sich selbst) als Teil des Einzahlungsprozesses.

Der erste Schritt kann in einer separaten Transaktion von den letzten beiden erfolgen.
Front-Running ist jedoch kein Problem, da die beiden Funktionen, die `_initiateERC20Deposit` aufrufen (`depositERC20` und `depositERC20To`), diese Funktion nur mit `msg.sender` als `_from`-Parameter aufrufen.

```solidity
        // Konstruiere Calldata für _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Sende Calldata nach L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Fügen Sie den eingezahlten Betrag an Tokens zur `deposits`-Datenstruktur hinzu.
Es könnten mehrere Adressen auf L2 vorhanden sein, die demselben L1-ERC-20-Token entsprechen, daher ist es nicht ausreichend, das Guthaben der Brücke am L1-ERC-20-Token zu verwenden, um die Einzahlungen zu verfolgen.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-Chain-Funktionen *
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

Die L2-Brücke sendet eine Nachricht an den L2-Cross-Domain-Messenger, der bewirkt, dass der L1-Cross-Domain-Messenger diese Funktion aufruft (natürlich sobald die [Transaktion, die die Nachricht finalisiert](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), auf L1 übermittelt wurde).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Stellen Sie sicher, dass dies eine _legitime_ Nachricht ist, die vom Cross-Domain-Messenger kommt und von der L2-Token-Brücke stammt.
Diese Funktion wird verwendet, um ETH von der Brücke abzuheben, daher müssen wir sicherstellen, dass sie nur vom autorisierten Aufrufer aufgerufen wird.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Die Art und Weise, ETH zu übertragen, besteht darin, den Empfänger mit dem Betrag in Wei im `msg.value` aufzurufen.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Ein Ereignis über die Auszahlung auslösen.

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

Diese Funktion ist ähnlich wie `finalizeETHWithdrawal` oben, mit den notwendigen Änderungen für ERC-20-Tokens.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aktualisieren Sie die `deposits`-Datenstruktur.

```solidity

        // Wenn eine Auszahlung auf L1 finalisiert wird, überträgt die L1-Brücke die Mittel an den Auszahlenden
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Vorübergehend - Migration von ETH *
     *****************************/

    /**
     * @dev Fügt ETH-Guthaben zum Konto hinzu. Dies soll ermöglichen, dass ETH
     * von einem alten Gateway zu einem neuen Gateway migriert wird.
     * HINWEIS: Dies wird nur für ein Upgrade beibehalten, damit wir die migrierte ETH aus dem
     * alten Vertrag empfangen können
     */
    function donateETH() external payable {}
}
```

Es gab eine frühere Implementierung der Brücke.
Als wir von dieser Implementierung zu dieser wechselten, mussten wir alle Assets verschieben.
ERC-20-Tokens können einfach verschoben werden.
Um jedoch ETH an einen Vertrag zu übertragen, benötigen Sie die Zustimmung dieses Vertrags, was uns `donateETH` bietet.

## ERC-20-Tokens auf L2 {#erc-20-tokens-on-l2}

Damit ein ERC-20-Token in die Standardbrücke passt, muss es der Standardbrücke und _nur_ der Standardbrücke erlauben, Token zu prägen.
Dies ist notwendig, weil die Brücken sicherstellen müssen, dass die Anzahl der auf Optimism zirkulierenden Tokens gleich der Anzahl der im L1-Brückenvertrag gesperrten Tokens ist.
Wenn es zu viele Tokens auf L2 gibt, könnten einige Benutzer ihre Assets nicht zurück auf L1 überbrücken.
Anstelle einer vertrauenswürdigen Brücke würden wir im Wesentlichen [Mindestreservebanking](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) nachbilden.
Wenn es zu viele Tokens auf L1 gibt, würden einige dieser Tokens für immer im Brückenvertrag gesperrt bleiben, weil es keine Möglichkeit gibt, sie ohne das Verbrennen von L2-Tokens freizugeben.

### IL2StandardERC20 {#il2standarderc20}

Jeder ERC-20-Token auf L2, der die Standardbrücke verwendet, muss [diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) bereitstellen, die die Funktionen und Ereignisse enthält, die die Standardbrücke benötigt.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Die Standard-ERC-20-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) enthält nicht die Funktionen `mint` und `burn`.
Diese Methoden sind nicht durch [den ERC-20-Standard](https://eips.ethereum.org/EIPS/eip-20) vorgeschrieben, der die Mechanismen zur Erstellung und Zerstörung von Tokens nicht spezifiziert.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Die ERC-165-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) wird verwendet, um anzugeben, welche Funktionen ein Vertrag bereitstellt.
[Sie können den Standard hier lesen](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Diese Funktion gibt die Adresse des L1-Tokens an, das auf diesen Vertrag überbrückt wird.
Beachten Sie, dass wir keine ähnliche Funktion in die entgegengesetzte Richtung haben.
Wir müssen in der Lage sein, jeden L1-Token zu überbrücken, unabhängig davon, ob bei seiner Implementierung eine L2-Unterstützung geplant war oder nicht.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funktionen und Ereignisse zum Prägen (Erstellen) und Verbrennen (Zerstören) von Tokens.
Die Brücke sollte die einzige Entität sein, die diese Funktionen ausführen kann, um sicherzustellen, dass die Anzahl der Tokens korrekt ist (gleich der Anzahl der auf L1 gesperrten Tokens).

### L2StandardERC20 {#L2StandardERC20}

[Dies ist unsere Implementierung der `IL2StandardERC20`-Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Sofern Sie keine benutzerdefinierte Logik benötigen, sollten Sie diese verwenden.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Der OpenZeppelin ERC-20-Vertrag](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism glaubt nicht daran, das Rad neu zu erfinden, besonders wenn das Rad gut geprüft ist und vertrauenswürdig genug sein muss, um Vermögenswerte zu halten.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Dies sind die beiden zusätzlichen Konfigurationsparameter, die wir benötigen und die ERC-20 normalerweise nicht hat.

```solidity

    /**
     * @param _l2Bridge Adresse der L2-Standardbrücke.
     * @param _l1Token Adresse des entsprechenden L1-Tokens.
     * @param _name ERC20-Name.
     * @param _symbol ERC20-Symbol.
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

Zuerst den Konstruktor für den Vertrag aufrufen, von dem wir erben (`ERC20(_name, _symbol)`) und dann unsere eigenen Variablen setzen.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Nur die L2-Brücke kann prägen und verbrennen");
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

So funktioniert [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Jede Schnittstelle ist eine Anzahl von unterstützten Funktionen und wird als [Exklusiv-Oder](https://en.wikipedia.org/wiki/Exclusive_or) der [ABI-Funktionsselektoren](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) dieser Funktionen identifiziert.

Die L2-Brücke verwendet ERC-165 als Plausibilitätsprüfung, um sicherzustellen, dass der ERC-20-Vertrag, an den sie Assets sendet, ein `IL2StandardERC20` ist.

**Hinweis:** Es gibt nichts, was betrügerische Verträge daran hindert, falsche Antworten auf `supportsInterface` zu geben, daher ist dies ein Plausibilitätsprüfungsmechanismus, _kein_ Sicherheitsmechanismus.

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

Nur die L2-Brücke darf Assets prägen und verbrennen.

`_mint` und `_burn` sind tatsächlich im [OpenZeppelin ERC-20-Vertrag](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) definiert.
Dieser Vertrag macht sie nur nicht extern zugänglich, weil die Bedingungen zum Prägen und Verbrennen von Tokens so vielfältig sind wie die Anzahl der Verwendungsmöglichkeiten von ERC-20.

## L2-Brücken-Code {#l2-bridge-code}

Dies ist der Code, der die Brücke auf Optimism ausführt.
[Die Quelle für diesen Vertrag befindet sich hier](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Schnittstellen-Importe */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Die [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)-Schnittstelle ist dem [L1-Äquivalent](#IL1ERC20Bridge), das wir oben gesehen haben, sehr ähnlich.
Es gibt zwei wesentliche Unterschiede:

1. Auf L1 initiieren Sie Einzahlungen und finalisieren Auszahlungen.
   Hier initiieren Sie Auszahlungen und finalisieren Einzahlungen.
2. Auf L1 ist es notwendig, zwischen ETH- und ERC-20-Tokens zu unterscheiden.
   Auf L2 können wir dieselben Funktionen für beide verwenden, da intern ETH-Guthaben auf Optimism als ERC-20-Token mit der Adresse [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) behandelt werden.

```solidity
/* Bibliotheks-Importe */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Vertrags-Importe */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Die L2-Standardbrücke ist ein Vertrag, der zusammen mit der L1-Standardbrücke
 * ETH- und ERC20-Übergänge zwischen L1 und L2 ermöglicht.
 * Dieser Vertrag fungiert als Minter für neue Tokens, wenn er von Einzahlungen in die L1-Standardbrücke
 * erfährt.
 * Dieser Vertrag fungiert auch als Burner der für die Auszahlung vorgesehenen Tokens und informiert die L1-
 * Brücke, L1-Mittel freizugeben.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Externe Vertragsreferenzen *
     ********************************/

    address public l1TokenBridge;
```

Die Adresse der L1-Brücke im Auge behalten.
Beachten Sie, dass wir im Gegensatz zum L1-Äquivalent hier diese Variable _brauchen_.
Die Adresse der L1-Brücke ist nicht im Voraus bekannt.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Von diesem Vertrag verwendeter domänenübergreifender Messenger.
     * @param _l1TokenBridge Adresse der auf der Hauptkette bereitgestellten L1-Brücke.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Auszahlung *
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

Diese beiden Funktionen leiten Auszahlungen ein.
Beachten Sie, dass die L1-Token-Adresse nicht angegeben werden muss.
Es wird erwartet, dass L2-Tokens uns die Adresse des L1-Äquivalents mitteilen.

```solidity

    /**
     * @dev Führt die Logik für Auszahlungen durch, indem der Token verbrannt und
     * das L1-Token-Gateway über die Auszahlung informiert wird.
     * @param _l2Token Adresse des L2-Tokens, bei dem die Auszahlung eingeleitet wird.
     * @param _from Konto, von dem die Auszahlung auf L2 abgezogen wird.
     * @param _to Konto, dem die Auszahlung auf L1 gutgeschrieben wird.
     * @param _amount Betrag des abzuhebenden Tokens.
     * @param _l1Gas Unbenutzt, aber aus Gründen der potenziellen Vorwärtskompatibilität enthalten.
     * @param _data Optionale Daten zur Weiterleitung an L1. Diese Daten werden
     *        lediglich als Annehmlichkeit für externe Verträge zur Verfügung gestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über ihren Inhalt.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Wenn eine Auszahlung eingeleitet wird, verbrennen wir die Mittel des Auszahlenden, um eine nachfolgende L2-
        // Nutzung zu verhindern
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Beachten Sie, dass wir uns _nicht_ auf den `_from`-Parameter verlassen, sondern auf `msg.sender`, was viel schwerer zu fälschen ist (soweit ich weiß, unmöglich).

```solidity

        // Konstruiere Calldata für l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Auf L1 ist es notwendig, zwischen ETH und ERC-20 zu unterscheiden.

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

        // Nachricht an L1-Brücke senden
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-Chain-Funktion: Einzahlung *
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

Diese Funktion wird von `L1StandardBridge` aufgerufen.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Stellen Sie sicher, dass die Quelle der Nachricht legitim ist.
Dies ist wichtig, da diese Funktion `_mint` aufruft und verwendet werden könnte, um Tokens auszugeben, die nicht durch Tokens gedeckt sind, die die Brücke auf L1 besitzt.

```solidity
        // Prüfen Sie, ob der Ziel-Token konform ist und
        // überprüfen Sie, ob der eingezahlte Token auf L1 mit der L2-Darstellung des eingezahlten Tokens hier übereinstimmt
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Plausibilitätsprüfungen:

1. Die richtige Schnittstelle wird unterstützt
2. Die L1-Adresse des L2-ERC-20-Vertrags stimmt mit der L1-Quelle der Tokens überein

```solidity
        ) {
            // Wenn eine Einzahlung abgeschlossen ist, schreiben wir dem Konto auf L2 den gleichen Betrag an
            // Tokens gut.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Wenn die Plausibilitätsprüfungen erfolgreich sind, schließen Sie die Einzahlung ab:

1. Prägen Sie die Tokens
2. Das entsprechende Ereignis auslösen

```solidity
        } else {
            // Entweder ist der L2-Token, in den eingezahlt wird, mit der korrekten Adresse
            // seines L1-Tokens nicht einverstanden oder er unterstützt nicht die korrekte Schnittstelle.
            // Dies sollte nur passieren, wenn es einen bösartigen L2-Token gibt oder wenn ein Benutzer irgendwie
            // die falsche L2-Token-Adresse für die Einzahlung angegeben hat.
            // In jedem Fall stoppen wir den Prozess hier und erstellen eine Auszahlungsnachricht
            //, damit Benutzer in einigen Fällen ihre Gelder abheben können.
            // Es gibt keine Möglichkeit, bösartige Token-Verträge vollständig zu verhindern, aber dies begrenzt
            // Benutzerfehler und mildert einige Formen von bösartigem Vertragsverhalten.
```

Wenn ein Benutzer einen erkennbaren Fehler gemacht hat, indem er die falsche L2-Token-Adresse verwendet hat, möchten wir die Einzahlung stornieren und die Tokens auf L1 zurückgeben.
Der einzige Weg, wie wir dies von L2 aus tun können, ist das Senden einer Nachricht, die den Fehler-Anfechtungszeitraum abwarten muss, aber das ist für den Benutzer viel besser als der dauerhafte Verlust der Tokens.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // hier _to und _from vertauscht, um die Einzahlung an den Absender zurückzuspringen
                _from,
                _amount,
                _data
            );

            // Nachricht an die L1-Brücke senden
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Fazit {#conclusion}

Die Standard-Brücke ist der flexibelste Mechanismus für Asset-Übertragungen.
Da er jedoch so generisch ist, ist er nicht immer der einfachste zu verwendende Mechanismus.
Insbesondere für Auszahlungen bevorzugen die meisten Benutzer [Drittanbieter-Brücken](https://optimism.io/apps#bridge), die nicht auf den Anfechtungszeitraum warten und keinen Merkle-Beweis benötigen, um die Auszahlung abzuschließen.

Diese Brücken funktionieren typischerweise, indem sie Assets auf L1 haben, die sie sofort gegen eine geringe Gebühr (oft weniger als die Gaskosten für eine Standard-Brückenauszahlung) zur Verfügung stellen.
Wenn die Brücke (oder die Personen, die sie betreiben) erwartet, dass sie auf L1 knapp bei Kasse ist, überträgt sie ausreichend Vermögenswerte von L2. Da es sich hierbei um sehr große Auszahlungen handelt, werden die Auszahlungskosten auf einen großen Betrag verteilt und machen einen viel kleineren Prozentsatz aus.

Hoffentlich hat Ihnen dieser Artikel geholfen, besser zu verstehen, wie Layer 2 funktioniert und wie man klaren und sicheren Solidity-Code schreibt.

[Hier finden Sie mehr von meiner Arbeit](https://cryptodocguy.pro/).
