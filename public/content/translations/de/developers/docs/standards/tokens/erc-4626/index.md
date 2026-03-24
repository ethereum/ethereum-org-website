---
title: ERC-4626 Tokenized Vault Standard
description: "Ein Standard für renditebringende Vaults."
lang: de
---

## Einführung {#introduction}

ERC-4626 ist ein Standard zur Optimierung und Vereinheitlichung der technischen Parameter von renditebringenden Vaults. Er bietet eine Standard-API für tokenisierte renditebringende Vaults, die Anteile an einem einzigen zugrunde liegenden ERC-20-Token repräsentieren. ERC-4626 skizziert außerdem eine optionale Erweiterung für tokenisierte Vaults, die ERC-20 nutzen, und bietet grundlegende Funktionen für das Einzahlen und Abheben von Token sowie das Auslesen von Kontoständen.

**Die Rolle von ERC-4626 in renditebringenden Vaults**

Kreditmärkte, Aggregatoren und intrinsisch verzinsliche Token helfen Benutzern, die beste Rendite für ihre Krypto-Token zu finden, indem sie verschiedene Strategien ausführen. Diese Strategien werden mit leichten Variationen durchgeführt, was fehleranfällig sein kann oder Entwicklungsressourcen verschwendet.

ERC-4626 in renditebringenden Vaults wird den Integrationsaufwand verringern und den Zugang zu Renditen in verschiedenen Anwendungen mit geringem speziellem Aufwand für Entwickler freischalten, indem konsistentere und robustere Implementierungsmuster geschaffen werden.

Der ERC-4626-Token wird vollständig in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) beschrieben.

**Asynchrone Vault-Erweiterung (ERC-7540)**

ERC-4626 ist für atomare Einzahlungen und Rücknahmen bis zu einem bestimmten Limit optimiert. Wenn das Limit erreicht ist, können keine neuen Einzahlungen oder Rücknahmen eingereicht werden. Diese Einschränkung funktioniert nicht gut für ein Smart Contract-System mit asynchronen Aktionen oder Verzögerungen als Voraussetzung für die Interaktion mit dem Vault (z. B. Protokolle für reale Vermögenswerte, unterbesicherte Kreditprotokolle, Cross-Chain-Kreditprotokolle, Liquid Staking-Token oder Versicherungs-Sicherheitsmodule).

ERC-7540 erweitert den Nutzen von ERC-4626-Vaults für asynchrone Anwendungsfälle. Die bestehende Vault-Schnittstelle (`deposit`/`withdraw`/`mint`/`redeem`) wird vollständig genutzt, um asynchrone Anfragen (Requests) geltend zu machen.

Die ERC-7540-Erweiterung wird vollständig in [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) beschrieben.

**Multi-Asset-Vault-Erweiterung (ERC-7575)**

Ein fehlender Anwendungsfall, der von ERC-4626 nicht unterstützt wird, sind Vaults, die über mehrere Vermögenswerte oder Einstiegspunkte verfügen, wie z. B. Liquidity-Provider-Token (LP-Token). Diese sind im Allgemeinen unhandlich oder nicht konform, da ERC-4626 vorschreibt, selbst ein ERC-20 zu sein.

ERC-7575 fügt Unterstützung für Vaults mit mehreren Vermögenswerten hinzu, indem die ERC-20-Token-Implementierung aus der ERC-4626-Implementierung ausgelagert wird.

Die ERC-7575-Erweiterung wird vollständig in [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Token-Standards](/developers/docs/standards/tokens/) und [ERC-20](/developers/docs/standards/tokens/erc-20/) zu informieren.

## ERC-4626 Funktionen und Merkmale: {#body}

### Methoden {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Diese Funktion gibt die Adresse des zugrunde liegenden Tokens zurück, das für den Vault zur Buchführung, Einzahlung und Abhebung verwendet wird.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Diese Funktion gibt den Gesamtbetrag der zugrunde liegenden Vermögenswerte zurück, die vom Vault gehalten werden.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion gibt die Menge an `shares` (Anteilen) zurück, die vom Vault gegen die bereitgestellte Menge an `assets` (Vermögenswerten) eingetauscht werden würde.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion gibt die Menge an `assets` zurück, die vom Vault gegen die bereitgestellte Menge an `shares` eingetauscht werden würde.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Diese Funktion gibt den maximalen Betrag an zugrunde liegenden Vermögenswerten zurück, der in einem einzigen [`deposit`](#deposit)-Aufruf eingezahlt werden kann, wobei die Anteile für den `receiver` (Empfänger) geprägt werden.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Einzahlung im aktuellen Block zu simulieren.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Diese Funktion zahlt `assets` der zugrunde liegenden Token in den Vault ein und gewährt dem `receiver` das Eigentum an den `shares`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Anzahl an Anteilen zurück, die in einem einzigen [`mint`](#mint)-Aufruf geprägt werden können, wobei die Anteile für den `receiver` geprägt werden.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Prägung im aktuellen Block zu simulieren.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Diese Funktion prägt genau `shares` Vault-Anteile für den `receiver`, indem `assets` der zugrunde liegenden Token eingezahlt werden.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Diese Funktion gibt den maximalen Betrag an zugrunde liegenden Vermögenswerten zurück, der mit einem einzigen [`withdraw`](#withdraw)-Aufruf vom Guthaben des `owner` (Eigentümers) abgehoben werden kann.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Abhebung im aktuellen Block zu simulieren.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Diese Funktion verbrennt `shares` vom `owner` und sendet genau `assets` Token aus dem Vault an den `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Anzahl an Anteilen zurück, die durch einen [`redeem`](#redeem)-Aufruf vom Guthaben des `owner` eingelöst werden können.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion ermöglicht es Benutzern, die Auswirkungen ihrer Einlösung im aktuellen Block zu simulieren.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Diese Funktion löst eine bestimmte Anzahl von `shares` vom `owner` ein und sendet `assets` des zugrunde liegenden Tokens aus dem Vault an den `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Gibt die Gesamtzahl der nicht eingelösten Vault-Anteile im Umlauf zurück.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Gibt die Gesamtmenge an Vault-Anteilen zurück, die der `owner` derzeit besitzt.

### Übersicht der Schnittstelle {#mapOfTheInterface}

![Übersicht der ERC-4626-Schnittstelle](./map-of-erc-4626.png)

### Ereignisse {#events}

#### Deposit-Ereignis

**MUSS** ausgelöst werden, wenn Token über die Methoden [`mint`](#mint) und [`deposit`](#deposit) in den Vault eingezahlt werden.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der `assets` gegen `shares` eingetauscht und diese `shares` an den `owner` übertragen hat.

#### Withdraw-Ereignis

**MUSS** ausgelöst werden, wenn Anteile von einem Einzahler über die Methoden [`redeem`](#redeem) oder [`withdraw`](#withdraw) aus dem Vault abgehoben werden.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der die Abhebung ausgelöst und `shares`, die dem `owner` gehören, gegen `assets` eingetauscht hat. `receiver` ist der Benutzer, der die abgehobenen `assets` erhalten hat.

## Weiterführende Literatur {#further-reading}

- [EIP-4626: Tokenized Vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub-Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)