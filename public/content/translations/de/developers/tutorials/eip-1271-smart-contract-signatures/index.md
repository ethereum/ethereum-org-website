---
title: "EIP-1271: Signieren und Verifizieren von Smart-Contract-Signaturen"
description: Ein Überblick über die Erstellung und Verifizierung von Smart-Contract-Signaturen mit EIP-1271. Wir gehen auch die in Safe (ehemals Gnosis Safe) verwendete EIP-1271-Implementierung durch, um Smart-Contract-Entwicklern ein konkretes Beispiel zu geben, auf dem sie aufbauen können.
author: Nathan H. Leung
lang: de
tags:
  [
    "eip-1271",
    "Smart Contracts",
    "verifizieren",
    "Signieren"
  ]
skill: intermediate
published: 2023-01-12
---

Der [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)-Standard ermöglicht es Smart Contracts, Signaturen zu verifizieren.

In diesem Tutorial geben wir einen Überblick über digitale Signaturen, den Hintergrund von EIP-1271 und die spezifische Implementierung von EIP-1271, die von [Safe](https://safe.global/) (ehemals Gnosis Safe) verwendet wird. Alles in allem kann dies als Ausgangspunkt für die Implementierung von EIP-1271 in Ihren eigenen Contracts dienen.

## Was ist eine Signatur?

In diesem Kontext ist eine Signatur (genauer gesagt, eine „digitale Signatur“) eine Nachricht plus eine Art Beweis dafür, dass die Nachricht von einer bestimmten Person/einem bestimmten Absender/einer bestimmten Adresse stammt.

Eine digitale Signatur könnte zum Beispiel so aussehen:

1. Nachricht: „Ich möchte mich mit meiner Ethereum-Wallet auf dieser Website anmelden.“
2. Unterzeichner: Meine Adresse lautet `0x000…`
3. Beweis: Hier ist ein Beweis dafür, dass ich, `0x000…`, diese gesamte Nachricht tatsächlich erstellt habe (dies ist normalerweise etwas Kryptografisches).

Es ist wichtig zu beachten, dass eine digitale Signatur sowohl eine „Nachricht“ als auch eine „Signatur“ enthält.

Warum? Wenn Sie mir zum Beispiel einen Vertrag zum Unterschreiben geben würden und ich dann die Unterschriftenseite abschneiden und Ihnen nur meine Unterschriften ohne den Rest des Vertrags zurückgeben würde, wäre der Vertrag nicht gültig.

Genauso bedeutet eine digitale Signatur ohne eine zugehörige Nachricht nichts!

## Warum gibt es EIP-1271?

Um eine digitale Signatur für die Verwendung auf Ethereum-basierten Blockchains zu erstellen, benötigen Sie im Allgemeinen einen geheimen privaten Schlüssel, den niemand sonst kennt. Das ist es, was Ihre Signatur zu Ihrer macht (niemand sonst kann dieselbe Signatur ohne Kenntnis des geheimen Schlüssels erstellen).

Ihr Ethereum-Konto (d.h. Ihr extern verwaltetes Konto/EOA) hat einen damit verbundenen privaten Schlüssel, und das ist der private Schlüssel, der normalerweise verwendet wird, wenn eine Website oder eine Dapp Sie um eine Signatur bittet (z. B. für „Mit Ethereum anmelden“).

Eine App kann eine von Ihnen erstellte [Signatur verifizieren](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) und dabei eine Drittanbieter-Bibliothek wie ethers.js verwenden, [ohne Ihren privaten Schlüssel zu kennen](https://en.wikipedia.org/wiki/Public-key_cryptography), und darauf vertrauen, dass _Sie_ derjenige waren, der die Signatur erstellt hat.

> Tatsächlich können digitale EOA-Signaturen, da sie Public-Key-Kryptografie verwenden, **off-chain** generiert und verifiziert werden! So funktioniert die gaslose DAO-Abstimmung — anstatt die Stimmen on-chain abzugeben, können digitale Signaturen mithilfe kryptografischer Bibliotheken off-chain erstellt und verifiziert werden.

Während EOA-Konten einen privaten Schlüssel haben, haben Smart-Contract-Konten keinerlei privaten oder geheimen Schlüssel (daher kann „Mit Ethereum anmelden“ usw. nicht nativ mit Smart-Contract-Konten funktionieren).

Das Problem, das EIP-1271 zu lösen versucht: Wie können wir feststellen, ob eine Smart-Contract-Signatur gültig ist, wenn der Smart Contract kein „Geheimnis“ hat, das er in die Signatur einbauen kann?

## Wie funktioniert EIP-1271?

Smart Contracts haben keine privaten Schlüssel, die zum Signieren von Nachrichten verwendet werden können. Wie können wir also feststellen, ob eine Signatur authentisch ist?

Nun, eine Idee ist, dass wir den Smart Contract einfach _fragen_ können, ob eine Signatur authentisch ist!

EIP-1271 standardisiert die Idee, einen Smart Contract zu „fragen“, ob eine bestimmte Signatur gültig ist.

Ein Contract, der EIP-1271 implementiert, muss eine Funktion namens `isValidSignature` haben, die eine Nachricht und eine Signatur entgegennimmt. Der Contract kann dann eine Validierungslogik ausführen (die Spezifikation schreibt hier nichts Bestimmtes vor) und dann einen Wert zurückgeben, der angibt, ob die Signatur gültig ist oder nicht.

Wenn `isValidSignature` ein gültiges Ergebnis zurückgibt, bedeutet das so viel wie, dass der Contract sagt: „Ja, ich genehmige diese Signatur + Nachricht!“

### Schnittstelle

Hier ist die genaue Schnittstelle in der EIP-1271-Spezifikation (wir werden weiter unten auf den `_hash`-Parameter eingehen, aber stellen Sie ihn sich vorerst als die zu verifizierende Nachricht vor):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Sollte zurückgeben, ob die bereitgestellte Signatur für den bereitgestellten Hash gültig ist
   * @param _hash      Hash der zu signierenden Daten
   * @param _signature Signatur-Byte-Array, das mit _hash verknüpft ist
   *
   * MUSS den magischen Wert bytes4 0x1626ba7e zurückgeben, wenn die Funktion erfolgreich ist.
   * DARF den Zustand NICHT ändern (Verwendung von STATICCALL für solc < 0.5, view-Modifikator für solc > 0.5)
   * MUSS externe Aufrufe zulassen
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Beispiel für eine EIP-1271-Implementierung: Safe

Contracts können `isValidSignature` auf viele Arten implementieren — die Spezifikation sagt nicht viel über die genaue Implementierung aus.

Ein bemerkenswerter Contract, der EIP-1271 implementiert, ist Safe (ehemals Gnosis Safe).

Im Code von Safe ist `isValidSignature` [so implementiert](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol), dass Signaturen auf [zwei Arten](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) erstellt und verifiziert werden können:

1. On-Chain-Nachrichten
   1. Erstellung: Ein Safe-Besitzer erstellt eine neue Safe-Transaktion, um eine Nachricht zu „signieren“, und übergibt die Nachricht als Daten in die Transaktion. Sobald genügend Besitzer die Transaktion unterzeichnet haben, um den Multisig-Schwellenwert zu erreichen, wird die Transaktion gesendet und ausgeführt. In der Transaktion gibt es eine Safe-Funktion namens (`signMessage(bytes calldata _data)`), die die Nachricht zu einer Liste „genehmigter“ Nachrichten hinzufügt.
   2. Verifizierung: Rufen Sie `isValidSignature` auf dem Safe-Contract auf und übergeben Sie die zu verifizierende Nachricht als Nachrichtenparameter und [einen leeren Wert für den Signaturparameter](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (d. h. `0x`). Der Safe wird sehen, dass der Signaturparameter leer ist, und anstatt die Signatur kryptografisch zu verifizieren, wird er einfach prüfen, ob sich die Nachricht auf der Liste der „genehmigten“ Nachrichten befindet.
2. Off-Chain-Nachrichten:
   1. Erstellung: Ein Safe-Besitzer erstellt eine Nachricht off-chain und lässt dann andere Safe-Besitzer die Nachricht einzeln signieren, bis genügend Signaturen vorhanden sind, um den Multisig-Genehmigungsschwellenwert zu erreichen.
   2. Verifizierung: `isValidSignature` aufrufen. Übergeben Sie im Nachrichtenparameter die zu verifizierende Nachricht. Übergeben Sie im Signaturparameter die einzelnen Signaturen jedes Safe-Besitzers aneinandergereiht. Der Safe prüft, ob genügend Signaturen vorhanden sind, um den Schwellenwert zu erreichen, **und** ob jede Signatur gültig ist. Wenn ja, gibt er einen Wert zurück, der eine erfolgreiche Signaturverifizierung anzeigt.

## Was genau ist der `_hash`-Parameter? Warum nicht die ganze Nachricht übergeben?

Sie haben vielleicht bemerkt, dass die Funktion `isValidSignature` in der [EIP-1271-Schnittstelle](https://eips.ethereum.org/EIPS/eip-1271) nicht die Nachricht selbst, sondern einen `_hash`-Parameter entgegennimmt. Das bedeutet, dass wir anstelle der vollständigen Nachricht beliebiger Länge an `isValidSignature` einen 32-Byte-Hash der Nachricht (im Allgemeinen keccak256) übergeben.

Jedes Byte Calldata — d. h. Funktionsparameterdaten, die an eine Smart-Contract-Funktion übergeben werden — [kostet 16 Gas (4 Gas bei einem Null-Byte)](https://eips.ethereum.org/EIPS/eip-2028), sodass viel Gas gespart werden kann, wenn eine Nachricht lang ist.

### Frühere EIP-1271-Spezifikationen

Es gibt EIP-1271-Spezifikationen, die eine `isValidSignature`-Funktion mit einem ersten Parameter vom Typ `bytes` (beliebige Länge anstelle einer festen Länge von `bytes32`) und dem Parameternamen `message` haben. Dies ist eine [ältere Version](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) des EIP-1271-Standards.

## Wie sollte EIP-1271 in meinen eigenen Contracts implementiert werden?

Die Spezifikation ist hier sehr offen. Die Safe-Implementierung hat einige gute Ideen:

- Sie können EOA-Signaturen vom „Besitzer“ des Contracts als gültig betrachten.
- Sie könnten eine Liste genehmigter Nachrichten speichern und nur diese als gültig betrachten.

Letztendlich liegt es an Ihnen als Contract-Entwickler!

## Zusammenfassung

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ist ein vielseitiger Standard, der es Smart Contracts ermöglicht, Signaturen zu verifizieren. Es öffnet Smart Contracts die Tür, sich mehr wie EOAs zu verhalten – indem es beispielsweise eine Möglichkeit bietet, dass „Mit Ethereum anmelden“ mit Smart Contracts funktioniert – und es kann auf viele Arten implementiert werden (Safe bietet eine nichttriviale und interessante Implementierung, die man in Betracht ziehen sollte).
