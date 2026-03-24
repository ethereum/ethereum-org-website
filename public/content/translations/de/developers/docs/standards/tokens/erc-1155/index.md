---
title: ERC-1155 Multi-Token-Standard
description: "Erfahren Sie mehr über ERC-1155, einen Multi-Token-Standard, der fungible und nicht-fungible Token in einem einzigen Vertrag kombiniert."
lang: de
---

## Einführung {#introduction}

Eine Standardschnittstelle für Verträge, die mehrere Token-Typen verwalten. Ein einzelner bereitgestellter Vertrag kann eine beliebige Kombination aus fungiblen Token, nicht-fungiblen Token oder anderen Konfigurationen (z. B. semi-fungiblen Token) enthalten.

**Was ist mit Multi-Token-Standard gemeint?**

Die Idee ist einfach und zielt darauf ab, eine Smart Contract-Schnittstelle zu schaffen, die eine beliebige Anzahl von fungiblen und nicht-fungiblen Token-Typen darstellen und steuern kann. Auf diese Weise kann der ERC-1155-Token die gleichen Funktionen wie ein [ERC-20](/developers/docs/standards/tokens/erc-20/)- und [ERC-721](/developers/docs/standards/tokens/erc-721/)-Token ausführen, und sogar beide gleichzeitig. Er verbessert die Funktionalität sowohl des ERC-20- als auch des ERC-721-Standards, macht sie effizienter und korrigiert offensichtliche Implementierungsfehler.

Der ERC-1155-Token wird vollständig in [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst über [Token-Standards](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) und [ERC-721](/developers/docs/standards/tokens/erc-721/) zu lesen.

## ERC-1155 Funktionen und Merkmale: {#body}

- [Stapelübertragung (Batch Transfer)](#batch_transfers): Übertragen Sie mehrere Vermögenswerte in einem einzigen Aufruf.
- [Stapelsaldo (Batch Balance)](#batch_balance): Rufen Sie die Salden mehrerer Vermögenswerte in einem einzigen Aufruf ab.
- [Stapelgenehmigung (Batch Approval)](#batch_approval): Genehmigen Sie alle Token für eine Adresse.
- [Hooks](#receive_hook): Hook für den Empfang von Token.
- [NFT-Unterstützung](#nft_support): Wenn das Angebot nur 1 beträgt, wird es als NFT behandelt.
- [Sichere Übertragungsregeln (Safe Transfer Rules)](#safe_transfer_rule): Regelwerk für eine sichere Übertragung.

### Stapelübertragungen (Batch Transfers) {#batch-transfers}

Die Stapelübertragung funktioniert sehr ähnlich wie reguläre ERC-20-Übertragungen. Schauen wir uns die reguläre ERC-20-Funktion `transferFrom` an:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Der einzige Unterschied bei ERC-1155 besteht darin, dass wir die Werte als Array übergeben und zusätzlich ein Array von IDs übergeben. Wenn beispielsweise `ids=[3, 6, 13]` und `values=[100, 200, 5]` gegeben sind, sehen die resultierenden Übertragungen wie folgt aus:

1. Übertrage 100 Token mit der ID 3 von `_from` nach `_to`.
2. Übertrage 200 Token mit der ID 6 von `_from` nach `_to`.
3. Übertrage 5 Token mit der ID 13 von `_from` nach `_to`.

In ERC-1155 haben wir nur `transferFrom`, kein `transfer`. Um es wie ein reguläres `transfer` zu verwenden, setzen Sie einfach die Absenderadresse (from) auf die Adresse, die die Funktion aufruft.

### Stapelsaldo (Batch Balance) {#batch-balance}

Der entsprechende ERC-20-Aufruf `balanceOf` hat ebenfalls seine Partnerfunktion mit Stapelunterstützung. Zur Erinnerung, dies ist die ERC-20-Version:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Noch einfacher ist es beim Saldo-Aufruf, bei dem wir mehrere Salden in einem einzigen Aufruf abrufen können. Wir übergeben das Array der Eigentümer, gefolgt vom Array der Token-IDs.

Wenn beispielsweise `_ids=[3, 6, 13]` und `_owners=[0xbeef..., 0x1337..., 0x1111...]` gegeben sind, lautet der Rückgabewert:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Stapelgenehmigung (Batch Approval) {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Die Genehmigungen unterscheiden sich geringfügig von ERC-20. Anstatt bestimmte Beträge zu genehmigen, setzen Sie einen Operator über `setApprovalForAll` auf genehmigt oder nicht genehmigt.

Das Lesen des aktuellen Status kann über `isApprovedForAll` erfolgen. Wie Sie sehen können, handelt es sich um eine Alles-oder-Nichts-Operation. Sie können nicht definieren, wie viele Token genehmigt werden sollen oder gar welche Token-Klasse.

Dies ist absichtlich im Hinblick auf Einfachheit konzipiert. Sie können nur alles für eine Adresse genehmigen.

### Empfangs-Hook (Receive Hook) {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Aufgrund der Unterstützung von [EIP-165](https://eips.ethereum.org/EIPS/eip-165) unterstützt ERC-1155 Empfangs-Hooks nur für Smart Contracts. Die Hook-Funktion muss einen magischen, vordefinierten bytes4-Wert zurückgeben, der wie folgt angegeben ist:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Wenn der empfangende Vertrag diesen Wert zurückgibt, wird davon ausgegangen, dass der Vertrag die Übertragung akzeptiert und weiß, wie er mit den ERC-1155-Token umgehen soll. Großartig, keine feststeckenden Token mehr in einem Vertrag!

### NFT-Unterstützung {#nft-support}

Wenn das Angebot nur eins beträgt, ist der Token im Wesentlichen ein nicht-fungibler Token (NFT). Und wie bei ERC-721 üblich, können Sie eine Metadaten-URL definieren. Die URL kann von Anwendungen gelesen und geändert werden, siehe [hier](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Sichere Übertragungsregel (Safe Transfer Rule) {#safe-transfer-rule}

Wir haben in den vorherigen Erklärungen bereits einige sichere Übertragungsregeln angesprochen. Aber schauen wir uns die wichtigsten dieser Regeln an:

1. Der Aufrufer muss berechtigt sein, die Token für die Adresse `_from` auszugeben, oder der Aufrufer muss gleich `_from` sein.
2. Der Übertragungsaufruf muss rückgängig gemacht (revert) werden, wenn
   1. die Adresse `_to` 0 ist.
   2. die Länge von `_ids` nicht mit der Länge von `_values` übereinstimmt.
   3. einer der Salden der Inhaber für Token in `_ids` niedriger ist als die entsprechenden Beträge in `_values`, die an den Empfänger gesendet werden.
   4. ein anderer Fehler auftritt.

_Hinweis_: Alle Stapelfunktionen einschließlich des Hooks existieren auch als Versionen ohne Stapel (Batch). Dies geschieht aus Gründen der Gas-Effizienz, da die Übertragung von nur einem Vermögenswert wahrscheinlich immer noch die am häufigsten verwendete Methode sein wird. Wir haben sie der Einfachheit halber in den Erklärungen weggelassen, einschließlich der sicheren Übertragungsregeln. Die Namen sind identisch, entfernen Sie einfach das 'Batch'.

## Weiterführende Literatur {#further-reading}

- [EIP-1155: Multi-Token-Standard](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: OpenZeppelin-Dokumentation](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub-Repository](https://github.com/enjin/erc-1155)
- [Alchemy NFT-API](https://www.alchemy.com/docs/reference/nft-api-quickstart)