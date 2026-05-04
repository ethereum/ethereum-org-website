---
title: "Walkthrough des Optimism-Standardvertrags für kettenübergreifende Brücken"
description: "Wie funktioniert die kettenübergreifende Standardbrücke für Optimism? Warum funktioniert sie auf diese Weise?"
author: Ori Pomerantz
tags: ["Solidity", "kettenübergreifende Brücke", "Ebene 2"]
skill: intermediate
breadcrumb: "Optimism kettenübergreifende Brücke"
published: 2022-03-30
lang: de
---

[Optimism](https://www.optimism.io/) ist ein [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistic Rollups können Transaktionen zu einem viel niedrigeren Preis als das Ethereum-Mainnet (auch bekannt als Ebene 1 oder L1) verarbeiten, da Transaktionen nur von wenigen Blockchain-Knoten anstatt von jedem Blockchain-Knoten im Netzwerk verarbeitet werden.
Gleichzeitig werden alle Daten auf L1 geschrieben, sodass alles mit allen Integritäts- und Verfügbarkeitsgarantien des Mainnets bewiesen und rekonstruiert werden kann.

Um L1-Vermögenswerte auf Optimism (oder einer anderen Ebene 2) zu verwenden, müssen die Vermögenswerte über eine [kettenübergreifende Brücke](/bridges/#prerequisites) übertragen werden.
Eine Möglichkeit, dies zu erreichen, besteht darin, dass Benutzer Vermögenswerte (ETH und [ERC-20-Token](/developers/docs/standards/tokens/erc-20/) sind die häufigsten) auf L1 sperren und gleichwertige Vermögenswerte zur Verwendung auf L2 erhalten.
Letztendlich möchte derjenige, der sie am Ende besitzt, sie vielleicht wieder über eine kettenübergreifende Brücke zurück zu L1 übertragen.
Dabei werden die Vermögenswerte auf L2 verbrannt und dann auf L1 wieder an den Benutzer freigegeben.

Auf diese Weise funktioniert die [kettenübergreifende Optimism-Standardbrücke](https://docs.optimism.io/app-developers/bridging/standard-bridge).
In diesem Artikel gehen wir den Quellcode für diese kettenübergreifende Brücke durch, um zu sehen, wie sie funktioniert, und studieren ihn als Beispiel für gut geschriebenen Solidity-Code.

## Kontrollflüsse {#control-flows}

Die kettenübergreifende Brücke hat zwei Hauptflüsse:

- Einzahlung (von L1 zu L2)
- Auszahlung (von L2 zu L1)

### Einzahlungsfluss {#deposit-flow}

#### Ebene 1 {#deposit-flow-layer-1}

1. Bei der Einzahlung eines ERC-20-Tokens erteilt der Einzahler der kettenübergreifenden Brücke die Erlaubnis (Allowance), den einzuzahlenden Betrag auszugeben.
2. Der Einzahler ruft die kettenübergreifende L1-Brücke auf (`depositERC20`, `depositERC20To`, `depositETH` oder `depositETHTo`).
3. Die kettenübergreifende L1-Brücke übernimmt den Besitz des überbrückten Vermögenswerts.
   - ETH: Der Vermögenswert wird vom Einzahler als Teil des Aufrufs übertragen.
   - ERC-20: Der Vermögenswert wird von der kettenübergreifenden Brücke unter Verwendung der vom Einzahler bereitgestellten Erlaubnis an sich selbst übertragen.
4. Die kettenübergreifende L1-Brücke verwendet den Cross-Domain-Nachrichtenmechanismus, um `finalizeDeposit` auf der kettenübergreifenden L2-Brücke aufzurufen.

#### Ebene 2 {#deposit-flow-layer-2}

5. Die kettenübergreifende L2-Brücke überprüft, ob der Aufruf von `finalizeDeposit` legitim ist:
   - Kam vom Cross-Domain-Nachrichtenvertrag.
   - Stammte ursprünglich von der kettenübergreifenden Brücke auf L1.
6. Die kettenübergreifende L2-Brücke prüft, ob der ERC-20-Token-Vertrag auf L2 der richtige ist:
   - Der L2-Vertrag meldet, dass sein L1-Gegenstück dasselbe ist wie das, von dem die Token auf L1 stammten.
   - Der L2-Vertrag meldet, dass er die richtige Schnittstelle unterstützt ([unter Verwendung von ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Wenn der L2-Vertrag der richtige ist, wird er aufgerufen, um die entsprechende Anzahl von Token an die entsprechende Adresse zu prägen. Wenn nicht, wird ein Auszahlungsprozess gestartet, damit der Benutzer die Token auf L1 beanspruchen kann.

### Auszahlungsfluss {#withdrawal-flow}

#### Ebene 2 {#withdrawal-flow-layer-2}

1. Der Auszahlende ruft die kettenübergreifende L2-Brücke auf (`withdraw` oder `withdrawTo`).
2. Die kettenübergreifende L2-Brücke verbrennt die entsprechende Anzahl von Token, die `msg.sender` gehören.
3. Die kettenübergreifende L2-Brücke verwendet den Cross-Domain-Nachrichtenmechanismus, um `finalizeETHWithdrawal` oder `finalizeERC20Withdrawal` auf der kettenübergreifenden L1-Brücke aufzurufen.

#### Ebene 1 {#withdrawal-flow-layer-1}

4. Die kettenübergreifende L1-Brücke überprüft, ob der Aufruf von `finalizeETHWithdrawal` oder `finalizeERC20Withdrawal` legitim ist:
   - Kam vom Cross-Domain-Nachrichtenmechanismus.
   - Stammte ursprünglich von der kettenübergreifenden Brücke auf L2.
5. Die kettenübergreifende L1-Brücke überträgt den entsprechenden Vermögenswert (ETH oder ERC-20) an die entsprechende Adresse.

## Ebene-1-Code {#layer-1-code}

Dies ist der Code, der auf L1, dem Ethereum-Mainnet, ausgeführt wird.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Diese Schnittstelle ist hier definiert](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Sie enthält Funktionen und Definitionen, die für die Überbrückung von ERC-20-Token erforderlich sind.

```solidity
// SPDX-License-Identifier: MIT
```

[Der Großteil des Codes von Optimism ist unter der MIT-Lizenz veröffentlicht](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Zum Zeitpunkt des Schreibens ist die neueste Version von Solidity 0.8.12.
Bis zur Veröffentlichung der Version 0.9.0 wissen wir nicht, ob dieser Code damit kompatibel ist oder nicht.

```solidity
/* *
 * @title IL1ERC20Bridge */



interface IL1ERC20Bridge {
    /* *********
     * Ereignisse *
     ********* */
    



    event ERC20DepositInitiated(
```

In der Terminologie der kettenübergreifenden Brücke von Optimism bedeutet _Einzahlung_ (deposit) eine Übertragung von L1 zu L2 und _Auszahlung_ (withdrawal) eine Übertragung von L2 zu L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

In den meisten Fällen ist die Adresse eines ERC-20 auf L1 nicht dieselbe wie die Adresse des entsprechenden ERC-20 auf L2.
[Sie können die Liste der Token-Adressen hier einsehen](https://static.optimism.io/optimism.tokenlist.json).
Die Adresse mit der `chainId` 1 befindet sich auf L1 (Mainnet) und die Adresse mit der `chainId` 10 befindet sich auf L2 (Optimism).
Die anderen beiden `chainId`-Werte sind für das Kovan-Testnet (42) und das Optimistic Kovan-Testnet (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Es ist möglich, Übertragungen Notizen hinzuzufügen. In diesem Fall werden sie den Ereignissen hinzugefügt, die sie melden.

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

Derselbe Vertrag für die kettenübergreifende Brücke verarbeitet Übertragungen in beide Richtungen.
Im Falle der kettenübergreifenden L1-Brücke bedeutet dies die Initialisierung von Einzahlungen und die Finalisierung von Auszahlungen.

```solidity

    /* *******************
     * Öffentliche Funktionen *
     ******************* */
    



    /* *
     * @dev Ruft die Adresse des entsprechenden L2-Vertrags für die kettenübergreifende Brücke ab.
     * @return Adresse des entsprechenden L2-Vertrags für die kettenübergreifende Brücke. */
    



    function l2TokenBridge() external returns (address);
```

Diese Funktion wird nicht wirklich benötigt, da es sich auf L2 um einen vorab bereitgestellten Vertrag handelt, sodass er sich immer an der Adresse `0x4200000000000000000000000000000000000010` befindet.
Sie ist hier aus Symmetriegründen mit der kettenübergreifenden L2-Brücke vorhanden, da die Adresse der kettenübergreifenden L1-Brücke _nicht_ trivial zu ermitteln ist.

```solidity
    /* *
     * @dev Zahlt einen Betrag des ERC20 auf das Guthaben des Aufrufers auf L2 ein.
     * @param _l1Token Adresse des L1-ERC20, den wir einzahlen
     * @param _l2Token Adresse des entsprechenden L2-ERC20 zum L1
     * @param _amount Betrag des einzuzahlenden ERC20
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über deren Inhalt. */
    









    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Der Parameter `_l2Gas` ist die Menge an L2-Gas, die die Transaktion ausgeben darf.
[Bis zu einem bestimmten (hohen) Limit ist dies kostenlos](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2). Solange der ERC-20-Vertrag beim Prägen also nichts wirklich Seltsames tut, sollte dies kein Problem sein.
Diese Funktion kümmert sich um das häufige Szenario, bei dem ein Benutzer Vermögenswerte über eine kettenübergreifende Brücke an dieselbe Adresse auf einer anderen Blockchain überträgt.

```solidity
    /* *
     * @dev Zahlt einen Betrag von ERC20 auf das Guthaben eines Empfängers auf L2 ein.
     * @param _l1Token Adresse des L1-ERC20, den wir einzahlen
     * @param _l2Token Adresse des entsprechenden L2-ERC20 zum L1
     * @param _to L2-Adresse, der die Abhebung gutgeschrieben werden soll.
     * @param _amount Betrag des einzuzahlenden ERC20.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über deren Inhalt. */
    










    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Diese Funktion ist fast identisch mit `depositERC20`, ermöglicht es Ihnen jedoch, den ERC-20 an eine andere Adresse zu senden.

```solidity
    /* ************************
     * Kettenübergreifende Funktionen *
     ************************ */
    



    /* *
     * @dev Schließt eine Abhebung von L2 nach L1 ab und schreibt das Guthaben dem L1-ERC20-Token-Guthaben des Empfängers gut.
     * Dieser Aufruf schlägt fehl, wenn die initiierte Abhebung von L2 nicht abgeschlossen wurde.
     *
     * @param _l1Token Adresse des L1-Tokens, für den finalizeWithdrawal ausgeführt wird.
     * @param _l2Token Adresse des L2-Tokens, bei dem die Abhebung initiiert wurde.
     * @param _from L2-Adresse, die den Transfer initiiert.
     * @param _to L1-Adresse, der die Abhebung gutgeschrieben werden soll.
     * @param _amount Betrag des einzuzahlenden ERC20.
     * @param _data Daten, die vom Sender auf L2 bereitgestellt werden. Diese Daten werden
     *   ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *   Länge geben diese Verträge keine Garantien über deren Inhalt. */
    













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

Auszahlungen (und andere Nachrichten von L2 zu L1) in Optimism sind ein zweistufiger Prozess:

1. Eine initiierende Transaktion auf L2.
2. Eine abschließende oder beanspruchende Transaktion auf L1.
   Diese Transaktion muss stattfinden, nachdem die [Fehleranfechtungsfrist (Fault Challenge Period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) für die L2-Transaktion abgelaufen ist.

### IL1StandardBridge {#il1standardbridge}

[Diese Schnittstelle ist hier definiert](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Diese Datei enthält Ereignis- und Funktionsdefinitionen für ETH.
Diese Definitionen sind denen sehr ähnlich, die oben in `IL1ERC20Bridge` für ERC-20 definiert wurden.

Die Schnittstelle der kettenübergreifenden Brücke ist auf zwei Dateien aufgeteilt, da einige ERC-20-Token eine benutzerdefinierte Verarbeitung erfordern und nicht von der kettenübergreifenden Standardbrücke verarbeitet werden können.
Auf diese Weise kann die benutzerdefinierte kettenübergreifende Brücke, die einen solchen Token verarbeitet, `IL1ERC20Bridge` implementieren und muss nicht auch ETH überbrücken.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/* *
 * @title IL1StandardBridge */



interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * Ereignisse *
     ********* */
    


    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Dieses Ereignis ist fast identisch mit der ERC-20-Version (`ERC20DepositInitiated`), außer dass die L1- und L2-Token-Adressen fehlen.
Dasselbe gilt für die anderen Ereignisse und Funktionen.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * Öffentliche Funktionen *
     ******************* */
    



    /* *
     * @dev Zahlt einen Betrag an ETH auf das Guthaben des Aufrufers auf L2 ein.
            .
            .
            . */
    





    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /* *
     * @dev Zahlt einen Betrag an ETH auf das Guthaben eines Empfängers auf L2 ein.
            .
            .
            . */
    





    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * Kettenübergreifende Funktionen *
     ************************ */
    



    /* *
     * @dev Schließt eine Abhebung von L2 nach L1 ab und schreibt das Guthaben dem L1-ETH-Token-Guthaben des Empfängers gut. Da nur der xDomainMessenger diese Funktion aufrufen kann, wird sie niemals aufgerufen,
     * bevor die Abhebung abgeschlossen ist.
                .
                .
                . */
    







    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Dieser Vertrag](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) wird von beiden kettenübergreifenden Brücken ([L1](#the-l1-bridge-contract) und [L2](#the-l2-bridge-contract)) geerbt, um Nachrichten an die andere Ebene zu senden.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Schnittstellen-Importe */
/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) teilt dem Vertrag mit, wie Nachrichten unter Verwendung des Cross-Domain-Messengers an die andere Ebene gesendet werden.
Dieser Cross-Domain-Messenger ist ein völlig anderes System und verdient einen eigenen Artikel, den ich hoffentlich in Zukunft schreiben werde.

```solidity
/* *
 * @title CrossDomainEnabled
 * @dev Hilfsvertrag für Verträge, die domänenübergreifende Kommunikation durchführen
 *
 * Verwendeter Compiler: definiert durch den erbenden Vertrag */






contract CrossDomainEnabled {
    /* ************
     * Variablen *
     ************ */
    



    // Messenger-Vertrag, der zum Senden und Empfangen von Nachrichten aus der anderen Domäne verwendet wird.
    address public messenger;

    /* **************
     * Konstruktor *
     ************** */
    



    /* *
     * @param _messenger Adresse des CrossDomainMessenger auf der aktuellen Ebene. */
    


    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Der einzige Parameter, den der Vertrag kennen muss, ist die Adresse des Cross-Domain-Messengers auf dieser Ebene.
Dieser Parameter wird einmal im Konstruktor festgelegt und ändert sich nie.

```solidity

    /* *********************
     * Funktionsmodifikatoren *
     ********************* */
    



    /* *
     * Erzwingt, dass die modifizierte Funktion nur von einem bestimmten domänenübergreifenden Konto aufgerufen werden kann.
     * @param _sourceDomainAccount Das einzige Konto in der Ursprungsdomäne, das
     *  authentifiziert ist, diese Funktion aufzurufen. */
    




    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Das Cross-Domain-Messaging ist für jeden Vertrag auf der Blockchain zugänglich, auf der es ausgeführt wird (entweder Ethereum-Mainnet oder Optimism).
Wir benötigen jedoch, dass die kettenübergreifende Brücke auf jeder Seite _nur_ bestimmten Nachrichten vertraut, wenn sie von der kettenübergreifenden Brücke auf der anderen Seite stammen.

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

Die Art und Weise, wie der Cross-Domain-Messenger die Adresse bereitstellt, die eine Nachricht an die andere Ebene gesendet hat, ist [die Funktion `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Solange sie in der Transaktion aufgerufen wird, die durch die Nachricht initiiert wurde, kann sie diese Informationen bereitstellen.

Wir müssen sicherstellen, dass die empfangene Nachricht von der anderen kettenübergreifenden Brücke stammt.

```solidity

        _;
    }

    /* *********************
     * Interne Funktionen *
     ********************* */
    



    /* *
     * Ruft den Messenger ab, normalerweise aus dem Speicher. Diese Funktion wird offengelegt, falls ein untergeordneter Vertrag
     * sie überschreiben muss.
     * @return Die Adresse des domänenübergreifenden Messenger-Vertrags, der verwendet werden soll. */
    




    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Diese Funktion gibt den Cross-Domain-Messenger zurück.
Wir verwenden eine Funktion anstelle der Variablen `messenger`, um Verträgen, die von diesem erben, die Verwendung eines Algorithmus zu ermöglichen, mit dem angegeben wird, welcher Cross-Domain-Messenger verwendet werden soll.

```solidity

    /* *
     * Sendet eine Nachricht an ein Konto in einer anderen Domäne
     * @param _crossDomainTarget Der beabsichtigte Empfänger in der Zieldomäne
     * @param _message Die an das Ziel zu sendenden Daten (normalerweise Calldata für eine Funktion mit
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Das Gaslimit für den Empfang der Nachricht in der Zieldomäne. */
    






    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Schließlich die Funktion, die eine Nachricht an die andere Ebene sendet.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) ist ein statischer Analysator, den Optimism auf jedem Vertrag ausführt, um nach Schwachstellen und anderen potenziellen Problemen zu suchen.
In diesem Fall löst die folgende Zeile zwei Schwachstellen aus:

1. [Reentrancy-Ereignisse](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Gutartige Reentrancy](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

In diesem Fall machen wir uns keine Sorgen über Reentrancy, da wir wissen, dass `getCrossDomainMessenger()` eine vertrauenswürdige Adresse zurückgibt, auch wenn Slither keine Möglichkeit hat, dies zu wissen.

### Der L1-Brückenvertrag {#the-l1-bridge-contract}

[Der Quellcode für diesen Vertrag ist hier zu finden](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Die Schnittstellen können Teil anderer Verträge sein, daher müssen sie eine breite Palette von Solidity-Versionen unterstützen.
Aber die kettenübergreifende Brücke selbst ist unser Vertrag, und wir können streng sein, welche Solidity-Version sie verwendet.

```solidity
/* Schnittstellen-Importe */
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) und [IL1StandardBridge](#IL1StandardBridge) werden oben erklärt.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ermöglicht es uns, Nachrichten zur Steuerung der kettenübergreifenden Standardbrücke auf L2 zu erstellen.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Diese Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ermöglicht es uns, ERC-20-Verträge zu steuern.
[Hier können Sie mehr darüber lesen](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Bibliotheks-Importe */
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Wie oben erklärt](#crossdomainenabled), wird dieser Vertrag für das Messaging zwischen den Ebenen verwendet.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) enthält die Adressen für die L2-Verträge, die immer dieselbe Adresse haben. Dies schließt die kettenübergreifende Standardbrücke auf L2 ein.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelins Address-Dienstprogramme](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Sie werden verwendet, um zwischen Vertragsadressen und solchen zu unterscheiden, die zu extern verwalteten Konten (Externally Owned Accounts, EOA) gehören.

Beachten Sie, dass dies keine perfekte Lösung ist, da es keine Möglichkeit gibt, zwischen direkten Aufrufen und Aufrufen aus dem Konstruktor eines Vertrags zu unterscheiden. Zumindest können wir so jedoch einige häufige Benutzerfehler identifizieren und verhindern.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Der ERC-20-Standard](https://eips.ethereum.org/EIPS/eip-20) unterstützt zwei Möglichkeiten für einen Vertrag, einen Fehler zu melden:

1. Revert (Rückgängig machen)
2. Rückgabe von `false`

Die Behandlung beider Fälle würde unseren Code komplizierter machen. Stattdessen verwenden wir [OpenZeppelins `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), was sicherstellt, dass [alle Fehler zu einem Revert führen](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/* *
 * @title L1StandardBridge
 * @dev Die L1-ETH- und ERC20-kettenübergreifende Brücke ist ein Vertrag, der eingezahlte L1-Guthaben und Standard-Token speichert,
 * die auf L2 verwendet werden. Er synchronisiert eine entsprechende L2-kettenübergreifende Brücke, informiert sie über Einzahlungen
 * und lauscht auf neu abgeschlossene Abhebungen.
 * */







contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Mit dieser Zeile geben wir an, dass der `SafeERC20`-Wrapper jedes Mal verwendet werden soll, wenn wir die `IERC20`-Schnittstelle verwenden.

```solidity

    /* *******************************
     * Externe Vertragsreferenzen *
     ******************************* */
    



    address public l2TokenBridge;
```

Die Adresse der [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Ordnet L1-Token dem L2-Token und dem Guthaben des eingezahlten L1-Tokens zu
    mapping(address => mapping(address => uint256)) public deposits;
```

Ein doppeltes [Mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) wie dieses ist die Art und Weise, wie Sie ein [zweidimensionales spärliches Array (Sparse Array)](https://en.wikipedia.org/wiki/Sparse_matrix) definieren.
Werte in dieser Datenstruktur werden als `deposit[L1 token addr][L2 token addr]` identifiziert.
Der Standardwert ist null.
Nur Zellen, die auf einen anderen Wert gesetzt sind, werden in den Speicher geschrieben.

```solidity

    /* **************
     * Konstruktor *
     ************** */
    



    // Dieser Vertrag befindet sich hinter einem Proxy, daher bleiben die Konstruktorparameter ungenutzt.
    constructor() CrossDomainEnabled(address(0)) {}
```

Wir möchten in der Lage sein, diesen Vertrag zu aktualisieren, ohne alle Variablen im Speicher kopieren zu müssen.
Dazu verwenden wir einen [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), einen Vertrag, der [`delegatecall`](https://solidity-by-example.org/delegatecall/) verwendet, um Aufrufe an einen separaten Vertrag zu übertragen, dessen Adresse vom Proxy-Vertrag gespeichert wird (beim Upgrade weisen Sie den Proxy an, diese Adresse zu ändern).
Wenn Sie `delegatecall` verwenden, bleibt der Speicher der Speicher des _aufrufenden_ Vertrags, sodass die Werte aller Vertragszustandsvariablen unberührt bleiben.

Ein Effekt dieses Musters ist, dass der Speicher des Vertrags, der der _Aufgerufene_ von `delegatecall` ist, nicht verwendet wird und daher die an ihn übergebenen Konstruktorwerte keine Rolle spielen.
Dies ist der Grund, warum wir dem Konstruktor `CrossDomainEnabled` einen unsinnigen Wert übergeben können.
Es ist auch der Grund, warum die unten stehende Initialisierung vom Konstruktor getrennt ist.

```solidity
    /* *****************
     * Initialisierung *
     ***************** */
    



    /* *
     * @param _l1messenger L1-Messenger-Adresse, die für kettenübergreifende Kommunikation verwendet wird.
     * @param _l2TokenBridge Adresse der L2-Standard-kettenübergreifenden Brücke. */
    



    // slither-disable-next-line external-function
```

Dieser [Slither-Test](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifiziert Funktionen, die nicht aus dem Vertragscode aufgerufen werden und daher als `external` anstatt als `public` deklariert werden könnten.
Die Gaskosten von `external`-Funktionen können niedriger sein, da sie mit Parametern in den Calldata versehen werden können.
Funktionen, die als `public` deklariert sind, müssen aus dem Vertrag heraus zugänglich sein.
Verträge können ihre eigenen Calldata nicht ändern, daher müssen sich die Parameter im Arbeitsspeicher (Memory) befinden.
Wenn eine solche Funktion extern aufgerufen wird, ist es notwendig, die Calldata in den Arbeitsspeicher zu kopieren, was Gas kostet.
In diesem Fall wird die Funktion nur einmal aufgerufen, sodass die Ineffizienz für uns keine Rolle spielt.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Die Funktion `initialize` sollte nur einmal aufgerufen werden.
Wenn sich die Adresse des L1-Cross-Domain-Messengers oder der kettenübergreifenden L2-Token-Brücke ändert, erstellen wir einen neuen Proxy und eine neue kettenübergreifende Brücke, die ihn aufruft.
Dies ist unwahrscheinlich, außer wenn das gesamte System aktualisiert wird, was ein sehr seltenes Ereignis ist.

Beachten Sie, dass diese Funktion keinen Mechanismus hat, der einschränkt, _wer_ sie aufrufen kann.
Dies bedeutet, dass ein Angreifer theoretisch warten könnte, bis wir den Proxy und die erste Version der kettenübergreifenden Brücke bereitstellen, und dann [Front-Running](https://solidity-by-example.org/hacks/front-running/) betreiben könnte, um vor dem legitimen Benutzer zur Funktion `initialize` zu gelangen. Es gibt jedoch zwei Methoden, um dies zu verhindern:

1. Wenn die Verträge nicht direkt von einem EOA (Extern verwaltetes Konto), sondern [in einer Transaktion bereitgestellt werden, bei der ein anderer Vertrag sie erstellt](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), kann der gesamte Prozess atomar sein und abgeschlossen werden, bevor eine andere Transaktion ausgeführt wird.
2. Wenn der legitime Aufruf von `initialize` fehlschlägt, ist es immer möglich, den neu erstellten Proxy und die kettenübergreifende Brücke zu ignorieren und neue zu erstellen.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Dies sind die beiden Parameter, die die kettenübergreifende Brücke kennen muss.

```solidity

    /* *************
     * Einzahlen *
     ************* */
    



    /* * @dev Modifikator, der erfordert, dass der Sender ein EOA ist. Diese Prüfung könnte von einem bösartigen
     *  Vertrag über Initcode umgangen werden, aber sie kümmert sich um den Benutzerfehler, den wir vermeiden wollen. */
    


    modifier onlyEOA() {
        // Wird verwendet, um Einzahlungen von Verträgen zu stoppen (vermeidet versehentlich verlorene Token)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Dies ist der Grund, warum wir die `Address`-Dienstprogramme von OpenZeppelin benötigten.

```solidity
    /* *
     * @dev Diese Funktion kann ohne Daten aufgerufen werden,
     * um einen Betrag an ETH auf das Guthaben des Aufrufers auf L2 einzuzahlen.
     * Da die Receive-Funktion keine Daten annimmt, wird ein konservativer
     * Standardbetrag an L2 weitergeleitet. */
    





    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Diese Funktion existiert zu Testzwecken.
Beachten Sie, dass sie nicht in den Schnittstellendefinitionen erscheint – sie ist nicht für den normalen Gebrauch bestimmt.

```solidity
    /* *
     * @inheritdoc IL1StandardBridge */
    


    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1StandardBridge */
    


    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Diese beiden Funktionen sind Wrapper um `_initiateETHDeposit`, die Funktion, die die eigentliche ETH-Einzahlung verarbeitet.

```solidity
    /* *
     * @dev Führt die Logik für Einzahlungen aus, indem die ETH gespeichert und das L2-ETH-Gateway über
     * die Einzahlung informiert wird.
     * @param _from Konto, von dem die Einzahlung auf L1 eingezogen wird.
     * @param _to Konto, dem die Einzahlung auf L2 gutgeschrieben wird.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über deren Inhalt. */
    









    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Erstellt Calldata für den finalizeDeposit-Aufruf
        bytes memory message = abi.encodeWithSelector(
```

Die Art und Weise, wie Cross-Domain-Nachrichten funktionieren, besteht darin, dass der Zielvertrag mit der Nachricht als seinen Calldata aufgerufen wird.
Solidity-Verträge interpretieren ihre Calldata immer in Übereinstimmung mit [den ABI-Spezifikationen](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
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

Die Nachricht hier besteht darin, [die Funktion `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) mit diesen Parametern aufzurufen:

| Parameter | Value                          | Meaning                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Spezieller Wert, der für ETH (das kein ERC-20-Token ist) auf L1 steht                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Der L2-Vertrag, der ETH auf Optimism verwaltet, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (dieser Vertrag ist nur für die interne Nutzung durch Optimism bestimmt) |
| \_from    | \_from                         | Die Adresse auf L1, die die ETH sendet                                                                                                         |
| \_to      | \_to                           | Die Adresse auf L2, die die ETH empfängt                                                                                                      |
| amount    | msg.value                      | Menge der gesendeten Wei (die bereits an die kettenübergreifende Brücke gesendet wurden)                                                                               |
| \_data    | \_data                         | Zusätzliche Daten, die der Einzahlung beigefügt werden sollen                                                                                                     |

```solidity
        // Sendet Calldata an L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Senden Sie die Nachricht über den Cross-Domain-Messenger.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Geben Sie ein Ereignis aus, um jede dezentralisierte Anwendung, die zuhört, über diese Übertragung zu informieren.

```solidity
    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Diese beiden Funktionen sind Wrapper um `_initiateERC20Deposit`, die Funktion, die die eigentliche ERC-20-Einzahlung verarbeitet.

```solidity
    /* *
     * @dev Führt die Logik für Einzahlungen aus, indem der L2-Deposited-Token-Vertrag
     * über die Einzahlung informiert wird und ein Handler aufgerufen wird, um die L1-Guthaben zu sperren. (z. B. transferFrom)
     *
     * @param _l1Token Adresse des L1-ERC20, den wir einzahlen
     * @param _l2Token Adresse des entsprechenden L2-ERC20 zum L1
     * @param _from Konto, von dem die Einzahlung auf L1 eingezogen wird
     * @param _to Konto, dem die Einzahlung auf L2 gutgeschrieben wird
     * @param _amount Betrag des einzuzahlenden ERC20.
     * @param _l2Gas Gaslimit, das erforderlich ist, um die Einzahlung auf L2 abzuschließen.
     * @param _data Optionale Daten zur Weiterleitung an L2. Diese Daten werden
     *        ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über deren Inhalt. */
    













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

Diese Funktion ähnelt `_initiateETHDeposit` oben, mit einigen wichtigen Unterschieden.
Der erste Unterschied besteht darin, dass diese Funktion die Token-Adressen und den zu übertragenden Betrag als Parameter erhält.
Im Falle von ETH beinhaltet der Aufruf der kettenübergreifenden Brücke bereits die Übertragung des Vermögenswerts auf das Brückenkonto (`msg.value`).

```solidity
        // Wenn eine Einzahlung auf L1 initiiert wird, überträgt die L1-kettenübergreifende Brücke die Guthaben an sich selbst für zukünftige
        // Abhebungen. safeTransferFrom prüft auch, ob der Vertrag Code hat, daher schlägt dies fehl, wenn
        // _from ein EOA oder address(0) ist.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20-Token-Übertragungen folgen einem anderen Prozess als ETH:

1. Der Benutzer (`_from`) erteilt der kettenübergreifenden Brücke die Erlaubnis (Allowance), die entsprechenden Token zu übertragen.
2. Der Benutzer ruft die kettenübergreifende Brücke mit der Adresse des Token-Vertrags, dem Betrag usw. auf.
3. Die kettenübergreifende Brücke überträgt die Token (an sich selbst) als Teil des Einzahlungsprozesses.

Der erste Schritt kann in einer separaten Transaktion von den letzten beiden erfolgen.
Front-Running ist jedoch kein Problem, da die beiden Funktionen, die `_initiateERC20Deposit` aufrufen (`depositERC20` und `depositERC20To`), diese Funktion nur mit `msg.sender` als Parameter `_from` aufrufen.

```solidity
        // Erstellt Calldata für _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Sendet Calldata an L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Fügen Sie den eingezahlten Token-Betrag zur Datenstruktur `deposits` hinzu.
Es könnte mehrere Adressen auf L2 geben, die demselben L1-ERC-20-Token entsprechen, daher reicht es nicht aus, den Saldo der kettenübergreifenden Brücke des L1-ERC-20-Tokens zu verwenden, um Einzahlungen zu verfolgen.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * Kettenübergreifende Funktionen *
     ************************ */
    



    /* *
     * @inheritdoc IL1StandardBridge */
    


    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Die kettenübergreifende L2-Brücke sendet eine Nachricht an den L2-Cross-Domain-Messenger, was dazu führt, dass der L1-Cross-Domain-Messenger diese Funktion aufruft (natürlich erst, sobald die [Transaktion, die die Nachricht abschließt](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions), auf L1 übermittelt wurde).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Stellen Sie sicher, dass dies eine _legitime_ Nachricht ist, die vom Cross-Domain-Messenger stammt und von der kettenübergreifenden L2-Token-Brücke ausgeht.
Diese Funktion wird verwendet, um ETH von der kettenübergreifenden Brücke abzuheben, daher müssen wir sicherstellen, dass sie nur vom autorisierten Aufrufer aufgerufen wird.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Der Weg zur Übertragung von ETH besteht darin, den Empfänger mit der Menge an Wei in `msg.value` aufzurufen.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Geben Sie ein Ereignis über die Auszahlung aus.

```solidity
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Diese Funktion ähnelt `finalizeETHWithdrawal` oben, mit den notwendigen Änderungen für ERC-20-Token.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aktualisieren Sie die Datenstruktur `deposits`.

```solidity

        // Wenn eine Abhebung auf L1 abgeschlossen ist, überträgt die L1-kettenübergreifende Brücke die Guthaben an den Abhebenden
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * Temporär - ETH migrieren *
     **************************** */
    



    /* *
     * @dev Fügt dem Konto ETH-Guthaben hinzu. Dies soll ermöglichen, dass ETH
     * von einem alten Gateway zu einem neuen Gateway migriert werden.
     * HINWEIS: Dies wird nur für ein Upgrade belassen, damit wir die migrierten ETH aus dem
     * alten Vertrag empfangen können */
    





    function donateETH() external payable {}
}
```

Es gab eine frühere Implementierung der kettenübergreifenden Brücke.
Als wir von dieser Implementierung zu dieser wechselten, mussten wir alle Vermögenswerte verschieben.
ERC-20-Token können einfach verschoben werden.
Um jedoch ETH an einen Vertrag zu übertragen, benötigen Sie die Genehmigung dieses Vertrags, was uns `donateETH` bietet.

## ERC-20-Token auf L2 {#erc-20-tokens-on-l2}

Damit ein ERC-20-Token in die kettenübergreifende Standardbrücke passt, muss er es der kettenübergreifenden Standardbrücke und _nur_ der kettenübergreifenden Standardbrücke erlauben, Token zu prägen.
Dies ist notwendig, da die kettenübergreifenden Brücken sicherstellen müssen, dass die Anzahl der auf Optimism zirkulierenden Token der Anzahl der im Vertrag der kettenübergreifenden L1-Brücke gesperrten Token entspricht.
Wenn es zu viele Token auf L2 gibt, könnten einige Benutzer ihre Vermögenswerte nicht über die kettenübergreifende Brücke zurück zu L1 übertragen.
Anstelle einer vertrauenswürdigen kettenübergreifenden Brücke würden wir im Wesentlichen das [Mindestreservesystem (Fractional Reserve Banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) nachbilden.
Wenn es zu viele Token auf L1 gibt, würden einige dieser Token für immer im Brückenvertrag gesperrt bleiben, da es keine Möglichkeit gibt, sie freizugeben, ohne L2-Token zu verbrennen.

### IL2StandardERC20 {#il2standarderc20}

Jeder ERC-20-Token auf L2, der die kettenübergreifende Standardbrücke verwendet, muss [diese Schnittstelle](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) bereitstellen, die über die Funktionen und Ereignisse verfügt, die die kettenübergreifende Standardbrücke benötigt.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Die Standard-ERC-20-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) enthält nicht die Funktionen `mint` und `burn`.
Diese Methoden werden vom [ERC-20-Standard](https://eips.ethereum.org/EIPS/eip-20) nicht verlangt, der die Mechanismen zum Erstellen und Zerstören von Token unspezifiziert lässt.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Die ERC-165-Schnittstelle](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) wird verwendet, um anzugeben, welche Funktionen ein Vertrag bereitstellt.
[Sie können den Standard hier lesen](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Diese Funktion liefert die Adresse des L1-Tokens, der über eine kettenübergreifende Brücke mit diesem Vertrag verbunden ist.
Beachten Sie, dass wir keine ähnliche Funktion in der entgegengesetzten Richtung haben.
Wir müssen in der Lage sein, jeden L1-Token über eine kettenübergreifende Brücke zu übertragen, unabhängig davon, ob bei seiner Implementierung L2-Unterstützung geplant war oder nicht.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funktionen und Ereignisse zum Prägen (Erstellen) und Verbrennen (Zerstören) von Token.
Die kettenübergreifende Brücke sollte die einzige Entität sein, die diese Funktionen ausführen kann, um sicherzustellen, dass die Anzahl der Token korrekt ist (gleich der Anzahl der auf L1 gesperrten Token).

### L2StandardERC20 {#L2StandardERC20}

[Dies ist unsere Implementierung der Schnittstelle `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Sofern Sie keine benutzerdefinierte Logik benötigen, sollten Sie diese verwenden.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Der OpenZeppelin-ERC-20-Vertrag](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism glaubt nicht daran, das Rad neu zu erfinden, insbesondere wenn das Rad gut geprüft ist und vertrauenswürdig genug sein muss, um Vermögenswerte zu halten.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Dies sind die beiden zusätzlichen Konfigurationsparameter, die wir benötigen und die ERC-20 normalerweise nicht benötigt.

```solidity

    /* *
     * @param _l2Bridge Adresse der L2-Standard-kettenübergreifenden Brücke.
     * @param _l1Token Adresse des entsprechenden L1-Tokens.
     * @param _name ERC20-Name.
     * @param _symbol ERC20-Symbol. */
    





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

Rufen Sie zuerst den Konstruktor für den Vertrag auf, von dem wir erben (`ERC20(_name, _symbol)`), und legen Sie dann unsere eigenen Variablen fest.

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

So funktioniert [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Jede Schnittstelle ist eine Anzahl unterstützter Funktionen und wird als das [exklusive Oder (XOR)](https://de.wikipedia.org/wiki/Kontravalenz) der [ABI-Funktionsselektoren](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) dieser Funktionen identifiziert.

Die kettenübergreifende L2-Brücke verwendet ERC-165 als Plausibilitätsprüfung (Sanity Check), um sicherzustellen, dass der ERC-20-Vertrag, an den sie Vermögenswerte sendet, ein `IL2StandardERC20` ist.

**Hinweis:** Es gibt nichts, was einen bösartigen Vertrag daran hindert, falsche Antworten auf `supportsInterface` zu geben. Dies ist also ein Plausibilitätsprüfungsmechanismus, _kein_ Sicherheitsmechanismus.

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

Nur die kettenübergreifende L2-Brücke darf Vermögenswerte prägen und verbrennen.

`_mint` und `_burn` sind tatsächlich im [OpenZeppelin-ERC-20-Vertrag](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) definiert.
Dieser Vertrag macht sie nur nicht nach außen hin zugänglich, da die Bedingungen zum Prägen und Verbrennen von Token so vielfältig sind wie die Anzahl der Möglichkeiten, ERC-20 zu verwenden.

## Code der kettenübergreifenden L2-Brücke {#l2-bridge-code}

Dies ist der Code, der die kettenübergreifende Brücke auf Optimism ausführt.
[Die Quelle für diesen Vertrag finden Sie hier](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Schnittstellen-Importe */
/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Die Schnittstelle [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ist dem [L1-Äquivalent](#IL1ERC20Bridge), das wir oben gesehen haben, sehr ähnlich.
Es gibt zwei wesentliche Unterschiede:

1. Auf L1 initiieren Sie Einzahlungen und schließen Auszahlungen ab.
   Hier initiieren Sie Auszahlungen und schließen Einzahlungen ab.
2. Auf L1 ist es notwendig, zwischen ETH und ERC-20-Token zu unterscheiden.
   Auf L2 können wir für beides dieselben Funktionen verwenden, da ETH-Guthaben auf Optimism intern als ERC-20-Token mit der Adresse [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) behandelt werden.

```solidity
/* Bibliotheks-Importe */
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Vertrags-Importe */
/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/* *
 * @title L2StandardBridge
 * @dev Die L2-Standard-kettenübergreifende Brücke ist ein Vertrag, der mit der L1-Standard-kettenübergreifenden Brücke zusammenarbeitet, um
 * ETH- und ERC20-Übergänge zwischen L1 und L2 zu ermöglichen.
 * Dieser Vertrag fungiert als Präger für neue Token, wenn er von Einzahlungen in die L1-Standard-kettenübergreifende
 * Brücke erfährt.
 * Dieser Vertrag fungiert auch als Verbrenner der für die Abhebung vorgesehenen Token und informiert die L1-kettenübergreifende
 * Brücke, L1-Guthaben freizugeben. */









contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * Externe Vertragsreferenzen *
     ******************************* */
    



    address public l1TokenBridge;
```

Behalten Sie die Adresse der kettenübergreifenden L1-Brücke im Auge.
Beachten Sie, dass wir im Gegensatz zum L1-Äquivalent diese Variable hier _benötigen_.
Die Adresse der kettenübergreifenden L1-Brücke ist im Voraus nicht bekannt.

```solidity

    /* **************
     * Konstruktor *
     ************** */
    



    /* *
     * @param _l2CrossDomainMessenger Domänenübergreifender Messenger, der von diesem Vertrag verwendet wird.
     * @param _l1TokenBridge Adresse der L1-kettenübergreifenden Brücke, die auf der Hauptchain bereitgestellt ist. */
    



    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * Abheben *
     ************** */
    



    /* *
     * @inheritdoc IL2ERC20Bridge */
    


    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /* *
     * @inheritdoc IL2ERC20Bridge */
    


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

Diese beiden Funktionen initiieren Auszahlungen.
Beachten Sie, dass die L1-Token-Adresse nicht angegeben werden muss.
Es wird erwartet, dass L2-Token uns die Adresse des L1-Äquivalents mitteilen.

```solidity

    /* *
     * @dev Führt die Logik für Abhebungen aus, indem der Token verbrannt und
     *      das L1-Token-Gateway über die Abhebung informiert wird.
     * @param _l2Token Adresse des L2-Tokens, bei dem die Abhebung initiiert wird.
     * @param _from Konto, von dem die Abhebung auf L2 eingezogen wird.
     * @param _to Konto, dem die Abhebung auf L1 gutgeschrieben wird.
     * @param _amount Betrag des abzuhebenden Tokens.
     * @param _l1Gas Unbenutzt, aber für mögliche zukünftige Kompatibilitätsüberlegungen enthalten.
     * @param _data Optionale Daten zur Weiterleitung an L1. Diese Daten werden
     *        ausschließlich als Annehmlichkeit für externe Verträge bereitgestellt. Abgesehen von der Durchsetzung einer maximalen
     *        Länge geben diese Verträge keine Garantien über deren Inhalt. */
    











    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Wenn eine Abhebung initiiert wird, verbrennen wir die Guthaben des Abhebenden, um eine spätere L2-
        // Nutzung zu verhindern
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Beachten Sie, dass wir uns _nicht_ auf den Parameter `_from` verlassen, sondern auf `msg.sender`, was viel schwerer zu fälschen ist (unmöglich, soweit ich weiß).

```solidity

        // Erstellt Calldata für l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
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

        // Sendet Nachricht hoch zur L1-kettenübergreifenden Brücke
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * Kettenübergreifende Funktion: Einzahlen *
     *********************************** */
    



    /* *
     * @inheritdoc IL2ERC20Bridge */
    


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
Dies ist wichtig, da diese Funktion `_mint` aufruft und verwendet werden könnte, um Token auszugeben, die nicht durch Token gedeckt sind, die die kettenübergreifende Brücke auf L1 besitzt.

```solidity
        // Prüft, ob der Ziel-Token konform ist und
        // verifiziert, dass der eingezahlte Token auf L1 mit der hier eingezahlten L2-Token-Repräsentation übereinstimmt
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Plausibilitätsprüfungen (Sanity Checks):

1. Die richtige Schnittstelle wird unterstützt.
2. Die L1-Adresse des L2-ERC-20-Vertrags stimmt mit der L1-Quelle der Token überein.

```solidity
        ) {
            // Wenn eine Einzahlung abgeschlossen ist, schreiben wir dem Konto auf L2 den gleichen Betrag an
            // Token gut.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Wenn die Plausibilitätsprüfungen erfolgreich sind, schließen Sie die Einzahlung ab:

1. Prägen Sie die Token.
2. Geben Sie das entsprechende Ereignis aus.

```solidity
        } else {
            // Entweder ist der L2-Token, in den eingezahlt wird, nicht mit der korrekten Adresse
            // seines L1-Tokens einverstanden, oder er unterstützt nicht die korrekte Schnittstelle.
            // Dies sollte nur passieren, wenn es einen bösartigen L2-Token gibt oder wenn ein Benutzer irgendwie
            // die falsche L2-Token-Adresse für die Einzahlung angegeben hat.
            // In beiden Fällen stoppen wir den Prozess hier und erstellen eine Abhebungs-
            // Nachricht, damit Benutzer in einigen Fällen ihre Guthaben herausbekommen können.
            // Es gibt keine Möglichkeit, bösartige Token-Verträge vollständig zu verhindern, aber dies begrenzt
            // Benutzerfehler und mildert einige Formen von bösartigem Vertragsverhalten ab.
```

Wenn ein Benutzer einen erkennbaren Fehler gemacht hat, indem er die falsche L2-Token-Adresse verwendet hat, möchten wir die Einzahlung stornieren und die Token auf L1 zurückgeben.
Die einzige Möglichkeit, dies von L2 aus zu tun, besteht darin, eine Nachricht zu senden, die die Fehleranfechtungsfrist abwarten muss. Dies ist jedoch für den Benutzer viel besser, als die Token dauerhaft zu verlieren.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // hat hier _to und _from vertauscht, um die Einzahlung an den Sender zurückzusenden
                _from,
                _amount,
                _data
            );

            // Sendet Nachricht hoch zur L1-kettenübergreifenden Brücke
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Fazit {#conclusion}

Die kettenübergreifende Standardbrücke ist der flexibelste Mechanismus für Vermögensübertragungen.
Da sie jedoch so generisch ist, ist sie nicht immer der am einfachsten zu verwendende Mechanismus.
Insbesondere für Auszahlungen ziehen es die meisten Benutzer vor, [kettenübergreifende Brücken von Drittanbietern](https://optimism.io/apps#bridge) zu verwenden, die nicht auf die Anfechtungsfrist warten und keinen Merkle-Proof benötigen, um die Auszahlung abzuschließen.

Diese kettenübergreifenden Brücken funktionieren in der Regel so, dass sie über Vermögenswerte auf L1 verfügen, die sie gegen eine geringe Gebühr (oft weniger als die Gaskosten für eine Auszahlung über eine kettenübergreifende Standardbrücke) sofort bereitstellen.
Wenn die kettenübergreifende Brücke (oder die Personen, die sie betreiben) voraussieht, dass L1-Vermögenswerte knapp werden, überträgt sie ausreichende Vermögenswerte von L2. Da es sich um sehr große Auszahlungen handelt, werden die Auszahlungskosten über einen großen Betrag amortisiert und machen einen viel geringeren Prozentsatz aus.

Hoffentlich hat Ihnen dieser Artikel geholfen, mehr darüber zu verstehen, wie Ebene 2 funktioniert und wie man Solidity-Code schreibt, der klar und sicher ist.

[Weitere meiner Arbeiten finden Sie hier](https://cryptodocguy.pro/).