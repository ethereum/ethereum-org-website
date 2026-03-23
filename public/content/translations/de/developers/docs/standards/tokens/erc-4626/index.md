---
title: "ERC-4626 Tokenisierter Tresor Standard "
description: "Standard für  Ertragstragende Gewölbe."
lang: de
---

## Einführung {#introduction}

ERC-4626 ist ein Standard zur Optimierung und Vereinheitlichung der technischen Parameter von Ertragstragende bringenden Tresoren. Es bietet eine Standard-API für tokenisierte, Ertragstragende Tresore, die Anteile eines einzelnen zugrunde liegenden ERC-20-Tokens darstellen. ERC-4626 beschreibt außerdem eine optionale Erweiterung für tokenisierte Tresore unter Verwendung von ERC-20, die grundlegende Funktionen zum Einzahlen, Abheben von Token und Lesen von Guthaben bietet.

**Die Rolle von ERC-4626 in Ertragstragende Tresoren**

Kreditmärkte, Aggregatoren und Token mit intrinsischem Zinssatz helfen Benutzern, durch die Umsetzung verschiedener Strategien die beste Rendite für ihre Krypto-Token zu erzielen. Diese Strategien werden mit geringfügigen Abweichungen umgesetzt, was fehleranfällig sein oder eine Verschwendung von Entwicklungsressourcen bedeuten kann.

ERC-4626 in Ertragstragende Tresoren wird den Integrationsaufwand verringern und den Zugriff auf Erträge in verschiedenen Anwendungen mit geringem Spezialaufwand der Entwickler freigeben, indem konsistent und robustere Implementierungsmuster erstellt werden.

Der ERC-4626-Token wird vollständig in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) beschrieben.

**Asynchrone Gewölbe Verlängerung (ERC-7540)**

ERC-4626 ist für atomare Einzahlungen und Rücknahmen bis zu einem bestimmten Limit optimiert. Wenn das Limit erreicht ist, können keine neuen Einzahlungen oder Rücknahmen mehr vorgenommen werden. Diese Einschränkung funktioniert nicht gut für Smart-Contract-Systeme mit asynchronen Aktionen oder Verzögerungen als Voraussetzung für die Interaktion mit dem Vault (z. B. Protokolle für Real-World-Assets, Protokolle für unterbesicherte Kredite, kettenübergreifende Kreditprotokolle, liquide Staking-Token oder Versicherungssicherheitsmodule).

ERC-7540 erweitert den Nutzen von ERC-4626 Gewölbe für asynchrone Anwendungsfälle. Die bestehende Vault-Schnittstelle (`deposit`/`withdraw`/`mint`/`redeem`) wird vollständig genutzt, um asynchrone Anfragen zu beanspruchen.

Die ERC-7540-Erweiterung wird vollständig in [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) beschrieben.

**Multi Asset Gewölbe Erweiterung (ERC-7575)**

Ein fehlender Anwendungsfall, der von ERC-4626 nicht unterstützt wird, sind Tresore mit mehreren Vermögenswerten oder Einstiegspunkten wie Liquiditätsanbieter-Token (LP). Diese sind im Allgemeinen unhandlich oder nicht konform, da ERC-4626 selbst ein ERC-20 sein muss.

ERC-7575 fügt Unterstützung für Gewölbe mit mehreren Assets hinzu, indem die ERC-20-Token-Implementierung aus der ERC-4626-Implementierung ausgelagert wird.

Die ERC-7575-Erweiterung wird vollständig in [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Token-Standards](/developers/docs/standards/tokens/) und [ERC-20](/developers/docs/standards/tokens/erc-20/) zu informieren.

## ERC-4626 Funktionen und Merkmale: {#body}

### Methoden {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Diese Funktion gibt die Adresse des zugrunde liegenden Tokens zurück, der für den Tresor zum Buchen, Einzahlen und Abheben verwendet wird.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Diese Funktion gibt den Gesamtbetrag der vom Tresor gehaltenen Basiswerte zurück.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Diese Funktion gibt die Anzahl der `shares` zurück, die vom Vault für die bereitgestellte Menge an `assets` ausgetauscht würden.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Diese Funktion gibt die Menge der `assets` zurück, die vom Vault für die bereitgestellte Anzahl an `shares` ausgetauscht würden.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Diese Funktion gibt die maximale Menge an zugrunde liegenden Assets zurück, die in einem einzigen [`deposit`](#deposit)-Aufruf eingezahlt werden kann, wobei die Anteile für den `receiver` geprägt werden.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Mit dieser Funktion können Benutzer die Auswirkungen ihrer Einzahlung auf den aktuellen Block simulieren.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Diese Funktion hinterlegt `assets` von zugrunde liegenden Token im Vault und überträgt das Eigentum an `shares` an den `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Anzahl an `shares` zurück, die in einem einzigen [`mint`](#mint)-Aufruf geprägt werden können, wobei die Anteile für den `receiver` geprägt werden.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Mit dieser Funktion können Benutzer die Auswirkungen ihrer Münze auf den aktuellen Block simulieren.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Diese Funktion prägt genau `shares` Vault-Anteile für den `receiver`, indem `assets` von zugrunde liegenden Token hinterlegt werden.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Diese Funktion gibt die maximale Menge an zugrunde liegenden Assets zurück, die mit einem einzigen [`withdraw`](#withdraw)-Aufruf vom Guthaben des `owner` abgehoben werden kann.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Mit dieser Funktion können Benutzer die Auswirkungen ihrer Abhebung im aktuellen Block simulieren.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Diese Funktion verbrennt `shares` vom `owner` und sendet genau `assets` Token vom Vault an den `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Diese Funktion gibt die maximale Anzahl an `shares` zurück, die durch einen [`redeem`](#redeem)-Aufruf vom Guthaben des `owner` eingelöst werden können.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Mit dieser Funktion können Benutzer die Auswirkungen ihrer Einlösung im aktuellen Block simulieren.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Diese Funktion löst eine bestimmte Anzahl von `shares` vom `owner` ein und sendet `assets` des zugrunde liegenden Tokens vom Vault an den `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Gibt die Gesamtzahl der im Umlauf befindlichen, nicht eingelösten Aktie zurück.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Gibt die Gesamtmenge der Vault-Anteile zurück, die der `owner` aktuell besitzt.

### Übersicht der Schnittstelle {#mapOfTheInterface}

![Übersicht der ERC-4626-Schnittstelle](./map-of-erc-4626.png)

### Ereignisse {#events}

#### Einzahlungsereignis

**MUSS** ausgegeben werden, wenn Token über die Methoden [`mint`](#mint) und [`deposit`](#deposit) in den Vault eingezahlt werden.

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der `assets` gegen `shares` getauscht und diese `shares` an den `owner` übertragen hat.

#### Ereignis zurückziehen

**MUSS** ausgegeben werden, wenn Anteile von einem Einzahler über die Methoden [`redeem`](#redeem) oder [`withdraw`](#withdraw) aus dem Vault abgehoben werden.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Wobei `sender` der Benutzer ist, der die Abhebung ausgelöst und die dem `owner` gehörenden `shares` gegen `assets` getauscht hat. `receiver` ist der Benutzer, der die abgehobenen `assets` erhalten hat.

## Weiterführende Lektüre {#further-reading}

- [EIP-4626: Standard für tokenisierte Vaults](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub-Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
