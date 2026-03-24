---
title: "EIP-1271: Signieren und Verifizieren von Smart-Contract-Signaturen"
description: "Ein Überblick über die Erstellung und Verifizierung von Smart-Contract-Signaturen mit EIP-1271. Wir gehen auch die EIP-1271-Implementierung durch, die in Safe (ehemals Gnosis Safe) verwendet wird, um ein konkretes Beispiel für Smart-Contract-Entwickler zu bieten, auf dem sie aufbauen können."
author: Nathan H. Leung
lang: de
tags: ["eip-1271", "Smart Contracts", "Verifizieren", "Signieren"]
skill: intermediate
breadcrumb: EIP-1271-Signaturen
published: 2023-01-12
---

Der [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)-Standard ermöglicht es Smart Contracts, Signaturen zu verifizieren.

In diesem Tutorial geben wir einen Überblick über Digitale Signaturen, den Hintergrund von EIP-1271 und die spezifische Implementierung von EIP-1271, die von [Safe](https://safe.global/) (ehemals Gnosis Safe) verwendet wird. Alles in allem kann dies als Ausgangspunkt für die Implementierung von EIP-1271 in Ihren eigenen Verträgen dienen.

## Was ist eine Signatur?

In diesem Zusammenhang ist eine Signatur (genauer gesagt eine „Digitale Signatur“) eine Nachricht plus eine Art Beweis, dass die Nachricht von einer bestimmten Person/einem bestimmten Absender/einer bestimmten Adresse stammt.

Eine Digitale Signatur könnte zum Beispiel so aussehen:

1. Nachricht: „Ich möchte mich auf dieser Website mit meinem Ethereum-Wallet anmelden.“
2. Unterzeichner: Meine Adresse lautet `0x000…`
3. Beweis: Hier ist ein Beweis, dass ich, `0x000…`, diese gesamte Nachricht tatsächlich erstellt habe (dies ist normalerweise etwas Kryptografisches).

Es ist wichtig zu beachten, dass eine Digitale Signatur sowohl eine „Nachricht“ als auch eine „Signatur“ enthält.

Warum? Wenn Sie mir zum Beispiel einen Vertrag zur Unterschrift geben würden und ich dann die Unterschriftenseite abschneiden und Ihnen nur meine Unterschriften ohne den Rest des Vertrags zurückgeben würde, wäre der Vertrag nicht gültig.

Genauso bedeutet eine Digitale Signatur ohne eine zugehörige Nachricht nichts!

## Warum gibt es EIP-1271?

Um eine Digitale Signatur für die Verwendung auf Ethereum-basierten Blockchains zu erstellen, benötigen Sie im Allgemeinen einen geheimen Private-Key, den niemand sonst kennt. Das macht Ihre Signatur zu Ihrer eigenen (niemand sonst kann ohne Kenntnis des geheimen Schlüssels dieselbe Signatur erstellen).

Mit Ihrem Ethereum-Konto (d. h. Ihrem extern verwalteten Konto/EOA) ist ein Private-Key verknüpft, und dies ist der Private-Key, der typischerweise verwendet wird, wenn eine Website oder Dapp Sie um eine Signatur bittet (z. B. für „Mit Ethereum anmelden“).

Eine App kann [eine Signatur verifizieren](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum), die Sie mit einer Drittanbieter-Bibliothek wie ethers.js erstellen, [ohne Ihren Private-Key zu kennen](https://en.wikipedia.org/wiki/Public-key_cryptography), und sicher sein, dass _Sie_ derjenige waren, der die Signatur erstellt hat.

> Da EOA-Digitale-Signaturen Public-Key-Kryptografie verwenden, können sie tatsächlich **Off-Chain** generiert und verifiziert werden! So funktioniert die gaslose DAO-Abstimmung – anstatt Stimmen auf der Blockchain einzureichen, können Digitale Signaturen mithilfe kryptografischer Bibliotheken Off-Chain erstellt und verifiziert werden.

Während EOA-Konten einen Private-Key haben, verfügen Smart-Contract-Konten über keinerlei privaten oder geheimen Schlüssel (daher kann „Mit Ethereum anmelden“ usw. nicht nativ mit Smart-Contract-Konten funktionieren).

Das Problem, das EIP-1271 lösen möchte: Wie können wir feststellen, ob eine Smart-Contract-Signatur gültig ist, wenn der Smart Contract kein „Geheimnis“ hat, das er in die Signatur integrieren kann?

## Wie funktioniert EIP-1271?

Smart Contracts haben keine Private-Keys, die zum Signieren von Nachrichten verwendet werden können. Wie können wir also feststellen, ob eine Signatur authentisch ist?

Nun, eine Idee ist, dass wir den Smart Contract einfach _fragen_ können, ob eine Signatur authentisch ist!

Was EIP-1271 tut, ist, diese Idee des „Fragens“ eines Smart Contracts, ob eine bestimmte Signatur gültig ist, zu standardisieren.

Ein Vertrag, der EIP-1271 implementiert, muss eine Funktion namens `isValidSignature` haben, die eine Nachricht und eine Signatur entgegennimmt. Der Vertrag kann dann eine Validierungslogik ausführen (die Spezifikation schreibt hier nichts Spezifisches vor) und dann einen Wert zurückgeben, der angibt, ob die Signatur gültig ist oder nicht.

Wenn `isValidSignature` ein gültiges Ergebnis zurückgibt, bedeutet das im Grunde, dass der Vertrag sagt: „Ja, ich genehmige diese Signatur + Nachricht!“

### Schnittstelle

Hier ist die genaue Schnittstelle in der EIP-1271-Spezifikation (wir werden unten über den Parameter `_hash` sprechen, aber betrachten Sie ihn vorerst als die Nachricht, die verifiziert wird):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /* *
   * @dev Sollte zurückgeben, ob die bereitgestellte Signatur für den bereitgestellten Hash gültig ist
   * @param _hash      Hash der zu signierenden Daten
   * @param _signature Signatur-Byte-Array, das mit _hash verknüpft ist
   *
   * MUSS den magischen bytes4-Wert 0x1626ba7e zurückgeben, wenn die Funktion erfolgreich ist.
   * DARF den Zustand NICHT ändern (Verwendung von STATICCALL für solc < 0.5, view-Modifikator für solc > 0.5)
   * MUSS externe Aufrufe zulassen */
  








  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Beispiel für eine EIP-1271-Implementierung: Safe

Verträge können `isValidSignature` auf viele Arten implementieren – die Spezifikation sagt nur nicht viel über die genaue Implementierung aus.

Ein bemerkenswerter Vertrag, der EIP-1271 implementiert, ist Safe (ehemals Gnosis Safe).

Im Code von Safe [ist `isValidSignature` so implementiert](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol), dass Signaturen auf [zwei Arten](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) erstellt und verifiziert werden können:

1. Nachrichten auf der Blockchain
   1. Erstellung: Ein Safe-Eigentümer erstellt eine neue Safe-Transaktion, um eine Nachricht zu „signieren“, wobei die Nachricht als Daten in die Transaktion übergeben wird. Sobald genügend Eigentümer die Transaktion signieren, um den Mehrfachsignatur-Schwellenwert zu erreichen, wird die Transaktion übertragen und ausgeführt. In der Transaktion gibt es eine Safe-Funktion namens (`signMessage(bytes calldata _data)`), die die Nachricht zu einer Liste „genehmigter“ Nachrichten hinzufügt.
   2. Verifizierung: Rufen Sie `isValidSignature` im Safe-Vertrag auf und übergeben Sie die zu verifizierende Nachricht als Nachrichtenparameter und [einen leeren Wert für den Signaturparameter](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (d. h. `0x`). Der Safe wird erkennen, dass der Signaturparameter leer ist, und anstatt die Signatur kryptografisch zu verifizieren, wird er wissen, dass er einfach prüfen muss, ob die Nachricht auf der Liste der „genehmigten“ Nachrichten steht.
2. Off-Chain-Nachrichten:
   1. Erstellung: Ein Safe-Eigentümer erstellt eine Nachricht Off-Chain und lässt dann andere Safe-Eigentümer die Nachricht jeweils einzeln signieren, bis genügend Signaturen vorhanden sind, um den Mehrfachsignatur-Genehmigungsschwellenwert zu überschreiten.
   2. Verifizierung: Rufen Sie `isValidSignature` auf. Übergeben Sie im Nachrichtenparameter die zu verifizierende Nachricht. Übergeben Sie im Signaturparameter die einzelnen Signaturen jedes Safe-Eigentümers, alle aneinandergereiht. Der Safe prüft, ob genügend Signaturen vorhanden sind, um den Schwellenwert zu erreichen, **und** ob jede Signatur gültig ist. Wenn dies der Fall ist, wird ein Wert zurückgegeben, der eine erfolgreiche Signaturverifizierung anzeigt.

## Was genau ist der Parameter `_hash`? Warum nicht die ganze Nachricht übergeben?

Sie haben vielleicht bemerkt, dass die Funktion `isValidSignature` in der [EIP-1271-Schnittstelle](https://eips.ethereum.org/EIPS/eip-1271) nicht die Nachricht selbst, sondern einen Parameter `_hash` entgegennimmt. Das bedeutet, dass wir anstelle der vollständigen Nachricht beliebiger Länge einen 32-Byte-Hash der Nachricht (im Allgemeinen keccak256) an `isValidSignature` übergeben.

Jedes Byte an Calldata – d. h. Funktionsparameterdaten, die an eine Smart-Contract-Funktion übergeben werden – [kostet 16 Gas (4 Gas bei einem Null-Byte)](https://eips.ethereum.org/EIPS/eip-2028), sodass dies bei einer langen Nachricht viel Gas sparen kann.

### Frühere EIP-1271-Spezifikationen

Es gibt EIP-1271-Spezifikationen in freier Wildbahn, die eine Funktion `isValidSignature` mit einem ersten Parameter vom Typ `bytes` (beliebige Länge anstelle einer festen Länge `bytes32`) und dem Parameternamen `message` haben. Dies ist eine [ältere Version](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) des EIP-1271-Standards.

## Wie sollte EIP-1271 in meinen eigenen Verträgen implementiert werden?

Die Spezifikation ist hier sehr offen. Die Safe-Implementierung hat einige gute Ideen:

- Sie können EOA-Signaturen vom „Eigentümer“ des Vertrags als gültig betrachten.
- Sie könnten eine Liste genehmigter Nachrichten speichern und nur diese als gültig betrachten.

Letztendlich liegt es an Ihnen als Vertragsentwickler!

## Fazit

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ist ein vielseitiger Standard, der es Smart Contracts ermöglicht, Signaturen zu verifizieren. Er öffnet die Tür dafür, dass sich Smart Contracts mehr wie EOAs verhalten – zum Beispiel, indem er eine Möglichkeit bietet, dass „Mit Ethereum anmelden“ mit Smart Contracts funktioniert – und er kann auf viele Arten implementiert werden (wobei Safe eine nicht triviale, interessante Implementierung aufweist, die man in Betracht ziehen sollte).