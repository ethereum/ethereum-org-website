---
title: "ERC-4626 Standard für tokenisierte Tresore"
description: "Ein Standard für renditebringende Tresore."
lang: de
---

## Einführung {#introduction}

ERC-4626 ist ein Standard zur Optimierung und Vereinheitlichung der technischen Parameter von renditebringenden Tresoren (Vaults). Er bietet eine Standard-API für tokenisierte renditebringende Tresore, die Anteile an einem einzigen zugrunde liegenden ERC-20-Token repräsentieren. ERC-4626 skizziert auch eine optionale Erweiterung für tokenisierte Tresore, die ERC-20 nutzen, und bietet grundlegende Funktionen für die Einzahlung, Abhebung von Token und das Auslesen von Kontoständen.

**Die Rolle von ERC-4626 in renditebringenden Tresoren**

Kreditvergabe-Märkte, Aggregatoren und intrinsisch verzinsliche Token helfen Benutzern, die beste Rendite für ihre Krypto-Token zu finden, indem sie verschiedene Strategien ausführen. Diese Strategien werden mit leichten Variationen durchgeführt, was fehleranfällig sein kann oder Entwicklungsressourcen verschwendet.

ERC-4626 in renditebringenden Tresoren wird den Integrationsaufwand senken und den Zugang zu Renditen in verschiedenen Anwendungen mit geringem speziellem Aufwand für Entwickler freischalten, indem konsistentere und robustere Implementierungsmuster geschaffen werden.

Der ERC-4626-Token wird vollständig in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) beschrieben.

**Asynchrone Tresor-Erweiterung (ERC-7540)**

ERC-4626 ist für atomare Einzahlungen und Rücknahmen bis zu einem bestimmten Limit optimiert. Wenn das Limit erreicht ist, können keine neuen Einzahlungen oder Rücknahmen eingereicht werden. Diese Einschränkung funktioniert nicht gut für Smart-Contract-Systeme mit asynchronen Aktionen oder Verzögerungen als Voraussetzung für die Interaktion mit dem Tresor (z. B. Protokolle für reale Vermögenswerte, unterbesicherte Kreditvergabe-Protokolle, kettenübergreifende Kreditvergabe-Protokolle, Liquid-Staking-Token oder Versicherungs-Sicherheitsmodule).

ERC-7540 erweitert den Nutzen von ERC-4626-Tresoren für asynchrone Anwendungsfälle. Die bestehende Tresor-Schnittstelle (`deposit`/`withdraw`/`mint`/`redeem`) wird vollständig genutzt, um asynchrone Anfragen zu beanspruchen.

Die ERC-7540-Erweiterung wird vollständig in [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) beschrieben.

**Multi-Asset-Tresor-Erweiterung (ERC-7575)**

Ein fehlender Anwendungsfall, der von ERC-4626 nicht unterstützt wird, sind Tresore, die über mehrere Vermögenswerte oder Einstiegspunkte verfügen, wie z. B. Liquiditätsanbieter-Token (LP-Token). Diese sind im Allgemeinen unhandlich oder nicht konform, da ERC-4626 vorschreibt, selbst ein ERC-20 zu sein.

ERC-7575 fügt Unterstützung für Tresore mit mehreren Vermögenswerten hinzu, indem die ERC-20-Token-Implementierung aus der ERC-4626-Implementierung ausgelagert wird.

Die ERC-7575-Erweiterung wird vollständig in [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Token-Standards](/developers/docs/standards/tokens/) und [ERC-20](/developers/docs/standards/tokens/erc-20/) zu informieren.

## ERC-4626 Funktionen und Merkmale: {#body}

### Methoden {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Diese Funktion gibt die Adresse des zugrunde liegenden Tokens zurück, der für den Tresor zur Buchführung, Einzahlung und Abhebung verwendet wird.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Diese Funktion gibt den Gesamtbetrag der zugrunde liegenden Vermögenswerte zurück, die vom Tresor gehalten werden.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion gibt die Menge an `shares` zurück, die vom Tresor gegen die bereitgestellte Menge an `assets` eingetauscht werden würde.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion gibt die Menge an `assets` zurück, die vom Tresor gegen die bereitgestellte Menge an `shares` eingetauscht werden würde.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Diese Funktion gibt den maximalen Betrag an zugrunde liegenden Vermögenswerten zurück, der in einem einzigen [`deposit`](#deposit)-Aufruf eingezahlt werden kann, wobei die Anteile für den `receiver` geprägt werden.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Einzahlung im aktuellen Block zu simulieren.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Diese Funktion zahlt `assets` an zugrunde liegenden Token in den Tresor ein und gewährt `receiver` das Eigentum an `shares`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Menge an Anteilen zurück, die in einem einzigen [`mint`](#mint)-Aufruf geprägt werden können, wobei die Anteile für den `receiver` geprägt werden.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Prägung im aktuellen Block zu simulieren.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Diese Funktion prägt genau `shares` Tresor-Anteile für `receiver`, indem `assets` an zugrunde liegenden Token eingezahlt werden.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Diese Funktion gibt den maximalen Betrag an zugrunde liegenden Vermögenswerten zurück, der mit einem einzigen [`withdraw`](#withdraw)-Aufruf vom Guthaben des `owner` abgehoben werden kann.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Abhebung im aktuellen Block zu simulieren.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Diese Funktion verbrennt `shares` von `owner` und sendet genau `assets` Token aus dem Tresor an `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Menge an Anteilen zurück, die durch einen [`redeem`](#redeem)-Aufruf vom Guthaben des `owner` eingelöst werden können.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Einlösung im aktuellen Block zu simulieren.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Diese Funktion löst eine bestimmte Anzahl von `shares` von `owner` ein und sendet `assets` an zugrunde liegenden Token aus dem Tresor an `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Gibt die Gesamtzahl der nicht eingelösten Tresor-Anteile im Umlauf zurück.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Gibt die Gesamtmenge an Tresor-Anteilen zurück, die der `owner` derzeit besitzt.

### Übersicht der Schnittstelle {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Ereignisse {#events}

#### Deposit-Ereignis {#deposit-event}

**MUSS** ausgelöst werden, wenn Token über die Methoden [`mint`](#mint) und [`deposit`](#deposit) in den Tresor eingezahlt werden.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der `assets` gegen `shares` eingetauscht und diese `shares` an `owner` übertragen hat.

#### Withdraw-Ereignis {#withdraw-event}

**MUSS** ausgelöst werden, wenn Anteile von einem Einzahler über die Methoden [`redeem`](#redeem) oder [`withdraw`](#withdraw) aus dem Tresor abgehoben werden.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der die Abhebung ausgelöst und `shares`, die im Besitz von `owner` sind, gegen `assets` eingetauscht hat. `receiver` ist der Benutzer, der die abgehobenen `assets` erhalten hat.

## Weiterführende Literatur {#further-reading}

- [EIP-4626: Standard für tokenisierte Tresore](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub-Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)