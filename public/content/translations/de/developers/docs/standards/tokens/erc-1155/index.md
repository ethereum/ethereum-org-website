---
title: ERC-1155 Token-Standard
description: "Erfahren Sie mehr über ERC-1155, einen Multi-Token-Standard, der fungible und nicht-fungible Token in einem einzigen Vertrag kombiniert."
lang: de
---

## Einführung {#introduction}

Eine Standardschnittstelle für Verträge, die mehrere Token-Typen verwalten. Ein einzelner bereitgestellter Vertrag kann eine beliebige Kombination von fungiblen Token, nicht-fungiblen Token oder anderen Konfigurationen (z. B. semi-fungible Token) enthalten.

**Was versteht man unter Multi-Token-Standard?**

Die Idee ist einfach und zielt darauf ab, eine Smart-Contract-Schnittstelle zu schaffen, die eine beliebige Anzahl von fungiblen und nicht-fungiblen Token-Typen darstellen und kontrollieren kann. Auf diese Weise kann der ERC-1155-Token dieselben Funktionen wie ein [ERC-20](/developers/docs/standards/tokens/erc-20/)- und [ERC-721](/developers/docs/standards/tokens/erc-721/)-Token ausführen, und sogar beide gleichzeitig. Er verbessert die Funktionalität sowohl des ERC-20- als auch des ERC-721-Standards, macht sie effizienter und korrigiert offensichtliche Implementierungsfehler.

Der ERC-1155-Token wird vollständig in [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Token-Standards](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) und [ERC-721](/developers/docs/standards/tokens/erc-721/) zu informieren.

## ERC-1155 Funktionen und Merkmale: {#body}

- [Batch-Übertragung](#batch_transfers): Übertragen Sie mehrere Assets in einem einzigen Aufruf.
- [Batch-Guthaben](#batch_balance): Rufen Sie die Guthaben mehrerer Assets in einem einzigen Aufruf ab.
- [Batch-Genehmigung](#batch_approval): Genehmigen Sie alle Token für eine Adresse.
- [Hooks](#receive_hook): Hook zum Empfangen von Token.
- [NFT-Unterstützung](#nft_support): Wenn die Menge nur 1 beträgt, wird es als NFT behandelt.
- [Sichere Übertragungsregeln](#safe_transfer_rule): Regelwerk für die sichere Übertragung.

### Batch-Übertragungen {#batch-transfers}

Die Batch-Übertragung funktioniert sehr ähnlich wie die regulären ERC-20-Übertragungen. Schauen wir uns die reguläre ERC-20-Funktion `transferFrom` an:

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

Der einzige Unterschied bei ERC-1155 besteht darin, dass wir die Werte als Array übergeben und auch ein Array von IDs übergeben. Wenn beispielsweise `ids=[3, 6, 13]` und `values=[100, 200, 5]` gegeben sind, lauten die resultierenden Übertragungen:

1. Übertragung von 100 Token mit der ID 3 von `_from` an `_to`.
2. Übertragung von 200 Token mit der ID 6 von `_from` an `_to`.
3. Übertragung von 5 Token mit der ID 13 von `_from` an `_to`.

In ERC-1155 gibt es nur `transferFrom`, kein `transfer`. Um es wie ein reguläres `transfer` zu verwenden, setzen Sie einfach die Absenderadresse auf die Adresse, die die Funktion aufruft.

### Batch-Guthaben {#batch-balance}

Der entsprechende ERC-20-Aufruf `balanceOf` hat ebenfalls eine Partnerfunktion mit Batch-Unterstützung. Zur Erinnerung: Dies ist die ERC-20-Version:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Bei der Abfrage des Saldos ist es sogar noch einfacher, denn wir können mehrere Salden in einem einzigen Schritt abrufen. Wir übergeben das Array der Besitzer, gefolgt von dem Array der Token-Ids.

Wenn beispielsweise `_ids=[3, 6, 13]` und `_owners=[0xbeef..., 0x1337..., 0x1111...]` gegeben sind, lautet der Rückgabewert:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Batch-Genehmigung {#batch-approval}

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

Die Genehmigungen unterscheiden sich geringfügig von denen des ERC-20. Anstatt bestimmte Beträge zu genehmigen, setzen Sie einen Operator über `setApprovalForAll` auf „genehmigt“ oder „nicht genehmigt“.

Der aktuelle Status kann über `isApprovedForAll` ausgelesen werden. Wie Sie sehen können, ist es eine Alles-oder-Nichts-Operation. Sie können nicht festlegen, wie viele Token genehmigt werden und auch nicht, welche Token-Klasse.

Dies wurde absichtlich so einfach wie möglich gestaltet. Sie können alles nur für eine Adresse genehmigen.

### Empfangs-Hook {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dank der [EIP-165](https://eips.ethereum.org/EIPS/eip-165)-Unterstützung unterstützt ERC-1155 Empfangs-Hooks nur für Smart Contracts. Die Haken-Funktion muss einen magischen vordefinierten Bytes4-Wert zurückgeben, der wie folgt angegeben wird:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Wenn der empfangende Vertrag diesen Wert zurückgibt, wird davon ausgegangen, dass der Vertrag die Übertragung akzeptiert und weiß, wie er mit den ERC-1155-Token umgehen soll. Großartig, keine feststeckenden Token mehr in einem Vertrag!

### NFT-Unterstützung {#nft-support}

Wenn es nur eine Angebotsmenge gibt, ist der Token im Wesentlichen ein nicht-fungibler Token (NFT). Und wie bei ERC-721 üblich, können Sie eine Metadaten-URL definieren. Die URL kann von Clients gelesen und geändert werden, siehe [hier](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regel für sichere Übertragungen {#safe-transfer-rule}

In den vorangegangenen Erläuterungen haben wir bereits einige Regeln für die sichere Übertragung angesprochen. Aber schauen wir uns die wichtigsten Regeln an:

1. Der Aufrufer muss berechtigt sein, die Token für die `_from`-Adresse auszugeben, oder der Aufrufer muss `_from` sein.
2. Der Übertragungsruf muss zurückgehen, wenn
   1. Die `_to`-Adresse ist 0.
   2. Die Länge von `_ids` entspricht nicht der Länge von `_values`.
   3. Das Guthaben eines Inhabers für einen Token in `_ids` ist geringer als der entsprechende Betrag in `_values`, der an den Empfänger gesendet wird.
   4. Ein anderer Fehler tritt auf.

_Hinweis_: Alle Batch-Funktionen, einschließlich des Hooks, existieren auch als Versionen ohne Batch. Dies geschieht aus Gründen der Gaseffizienz, da die Übertragung nur eines Vermögenswerts wahrscheinlich immer noch der am häufigsten genutzte Weg sein wird. Wir haben sie der Einfachheit halber in den Erläuterungen weggelassen, einschließlich der Regeln für die sichere Übertragung. Die Namen sind identisch, Sie müssen nur das „Batch" entfernen.

## Weiterführende Lektüre {#further-reading}

- [EIP-1155: Multi-Token-Standard](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Openzeppelin Docs](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub-Repo](https://github.com/enjin/erc-1155)
- [Alchemy NFT-API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
