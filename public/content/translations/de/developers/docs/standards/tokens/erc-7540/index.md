---
title: "ERC-7540: Standard für asynchrone tokenisierte Tresore"
description: Eine Erweiterung von ERC-4626, die asynchrone Einzahlungs- und Rücknahmeprozesse für tokenisierte Tresore hinzufügt.
lang: de
---

## Einführung {#introduction}

ERC-7540 erweitert den [ERC-4626-Standard für tokenisierte Tresore](/developers/docs/standards/tokens/erc-4626/) um die Unterstützung für asynchrone Einzahlungs- und Rücknahmeprozesse. Er führt ein Anfrage-dann-Beanspruchen-Muster (request-then-claim) ein: Benutzer reichen zunächst eine Anfrage ein (wodurch ihre Vermögenswerte oder Anteile gesperrt werden) und beanspruchen dann das Ergebnis, nachdem der Tresor es verarbeitet hat.

Dies ist erforderlich, wenn ein Tresor nicht sofort in einer einzigen Transaktion abgewickelt werden kann, zum Beispiel:

- Protokolle für reale Vermögenswerte (RWA) wie tokenisierte Staatsanleihen, Privatkredite und andere Vermögenswerte mit T+1- oder T+2-Abwicklungszyklen
- Unterbesicherte Kreditvergabe, bei der Bonitätsprüfungen offchain stattfinden
- Kettenübergreifende Tresor-Strategien, bei denen das Bridging Verzögerungen verursacht
- Liquid-Staking-Token (LST) mit Entbindungsfristen

Tresore können wählen, ob sie nur bei Einzahlungen, nur bei Rücknahmen oder bei beidem asynchron sein möchten. Diese Flexibilität ermöglicht es Tresor-Entwicklern, asynchrone Prozesse nur dort hinzuzufügen, wo die zugrunde liegende Strategie dies erfordert, während die andere Seite synchron bleibt.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Token-Standards](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) und [ERC-4626](/developers/docs/standards/tokens/erc-4626/) zu informieren.

## ERC-4626 im Vergleich zu ERC-7540 {#comparison}

In ERC-4626 wird eine Einzahlung atomar abgewickelt: Der Investor sendet Vermögenswerte und erhält in einer einzigen Transaktion Anteile zurück.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 teilt dies in zwei Schritte auf. Der Investor ruft zunächst `requestDeposit()` auf, um Vermögenswerte zu sperren, und wartet dann darauf, dass der Tresor-Manager die Anfrage verarbeitet. Sobald diese erfüllt ist, ruft der Investor `deposit()` auf, um seine Anteile zu beanspruchen. Wechselkurse werden zum Zeitpunkt der Erfüllung festgelegt, nicht zum Zeitpunkt der Anfrage.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Der Rücknahmeprozess funktioniert auf die gleiche Weise: `requestRedeem()` sperrt Anteile, und sobald die Anfrage erfüllt ist, ruft der Investor `redeem()` auf, um Vermögenswerte zu beanspruchen.

## Funktionen und Merkmale von ERC-7540 {#body}

ERC-7540 erbt die vollständige ERC-4626-Schnittstelle, verwendet jedoch `deposit`/`mint`/`withdraw`/`redeem` als Anspruchsfunktionen (Claim-Funktionen) um. Die neuen Funktionen `requestDeposit` und `requestRedeem` übernehmen den anfänglichen Anfrageschritt.

Jede Anfrage durchläuft drei Zustände: ausstehend (eingereicht, wartet auf Verarbeitung), beanspruchbar (erfüllt und bepreist) und beansprucht (Investor hat seine Anteile oder Vermögenswerte abgeholt).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Ablauf der Einzahlungsanfrage {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Überträgt `assets` von `owner` in den Tresor und reicht eine Einzahlungsanfrage ein. Die Adresse `controller` erhält die Kontrolle über die Anfrage. Gibt eine `requestId` zurück, die den Anfrage-Stapel (Batch) identifiziert.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Gibt die Menge an `assets` in einer ausstehenden (noch nicht beanspruchbaren) Einzahlungsanfrage für die angegebene `controller` und `requestId` zurück.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Gibt die Menge an `assets` in einer beanspruchbaren (erfüllten, aber noch nicht beanspruchten) Einzahlungsanfrage für die angegebene `controller` und `requestId` zurück.

#### Einzahlungen beanspruchen {#claiming-deposits}

Sobald eine Einzahlungsanfrage beanspruchbar wird, ruft der Benutzer die Standard-ERC-4626-Funktion [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) oder [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) auf, um seine Anteile zu beanspruchen. In ERC-7540 übertragen diese Funktionen keine Vermögenswerte mehr (das ist bereits zum Zeitpunkt der Anfrage geschehen). Sie prägen lediglich Anteile für den Empfänger.

### Ablauf der Rücknahmeanfrage {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Sperrt `shares` von `owner` und reicht eine Rücknahmeanfrage ein. Die Adresse `controller` erhält die Kontrolle über die Anfrage.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Gibt die Menge an `shares` in einer ausstehenden Rücknahmeanfrage für die angegebene `controller` und `requestId` zurück.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Gibt die Menge an `shares` in einer beanspruchbaren Rücknahmeanfrage für die angegebene `controller` und `requestId` zurück.

#### Rücknahmen beanspruchen {#claiming-redemptions}

Sobald eine Rücknahmeanfrage beanspruchbar wird, ruft der Benutzer die Standard-ERC-4626-Funktion [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) oder [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) auf, um seine Vermögenswerte zu beanspruchen.

### Operator-Verwaltung {#operator-management}

ERC-7540 enthält ein Operator-Muster (aus [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)), das es Dritten ermöglicht, Anfragen im Namen eines Benutzers zu verwalten.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Genehmigt oder widerruft `operator`, um im Namen von `msg.sender` für Einzahlungs-/Rücknahmeanfragen und Ansprüche zu handeln.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Gibt zurück, ob `operator` genehmigt ist, im Namen von `controller` zu handeln.

### Anfrage-IDs {#request-ids}

Anfrage-IDs unterscheiden zwischen verschiedenen Anfrage-Stapeln. Alle Anfragen, die dieselbe `requestId` teilen, sind fungibel: Sie wechseln gemeinsam zwischen Zuständen und erhalten denselben Wechselkurs.

Wenn ein Tresor `requestId = 0` für alle Anfragen zurückgibt, unterscheidet nur die Adresse `controller` den Anfrage-Zustand. Mehrere Anfragen desselben Controllers werden aggregiert.

### Ereignisse {#events}

#### DepositRequest-Ereignis {#depositrequest-event}

MUSS ausgelöst werden, wenn eine Einzahlungsanfrage über [`requestDeposit`](#requestdeposit) eingereicht wird.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest-Ereignis {#redeemrequest-event}

MUSS ausgelöst werden, wenn eine Rücknahmeanfrage über [`requestRedeem`](#requestredeem) eingereicht wird.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet-Ereignis {#operatorset-event}

MUSS ausgelöst werden, wenn ein Operator über [`setOperator`](#setoperator) genehmigt oder widerrufen wird.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Vorschaufunktionen {#preview-functions}

Die Vorschaufunktionen dürfen nur für die Prozesse rückgängig gemacht werden (revert), die asynchron sind, da der Wechselkurs erst bekannt ist, wenn die Anfrage erfüllt ist. In einem Tresor mit asynchroner Einzahlung MÜSSEN `previewDeposit` und `previewMint` rückgängig gemacht werden, während `previewRedeem` und `previewWithdraw` weiterhin wie in ERC-4626 funktionieren (und umgekehrt für einen Tresor mit asynchroner Rücknahme). Dies ist ein wesentlicher Verhaltensunterschied zu ERC-4626.

## Weiterführende Literatur {#further-reading}

- [EIP-7540: Asynchrone tokenisierte ERC-4626-Tresore](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Standard für tokenisierte Tresore](https://eips.ethereum.org/EIPS/eip-4626)
- [OpenZeppelin ERC-7540-Implementierung](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)