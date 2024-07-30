---
title: Standard della cassaforte tokenizzata ERC-4626
description: Uno standard per le cassaforti di resa.
lang: it
---

## Introduzione {#introduction}

ERC-4626 è uno standard per ottimizzare e unificare i parametri tecnici delle cassaforti di resa. Fornisce un'API standard per le cassaforti di resa tokenizzate che rappresenta le quote di un singolo token ERC-20 sottostante. ERC-4626 delinea anche un'estensione facoltativa per le cassaforti tokenizzate usando ERC-20, offrendo le funzionalità di base per depositare e prelevare token e leggere i saldi.

**Il ruolo dell'ERC-4626 nelle cassaforti di resa**

I mercati di prestito, gli aggregatori e i token intrinsecamente fruttiferi di interessi aiutano gli utenti a trovare la miglior resa sui propri cripto-token eseguendo strategie differenti. Queste strategie sono create con lievi variazioni, che potrebbero essere incline a errore o potrebbero sprecare risorse di sviluppo.

L'ERC-4626 nelle cassaforti di resa ridurrà lo sforzo di integrazione e sbloccherà l'accesso alla resa in varie applicazioni con piccoli sforzi specializzati dagli sviluppatori, creando schemi d'implementazione coerenti e robusti.

Il token ERC-4626 è descritto nella sua interezza in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzitutto di leggere [standard per i token](/developers/docs/standards/tokens/) e [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ERC-4626 Funzioni e caratteristiche: {#body}

### Metodi {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Questa funzione restituisce l'indirizzo del token sottostante, utilizzato per la cassaforte per la contabilità, i depositi e i prelievi.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Questa funzione restituisce l'importo totale di risorse sottostanti detenute dalla cassaforte.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Questa funzione restituisce la quantità di `shares` che sarebbe scambiata dalla cassaforte per la quantità fornita di `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Questa funzione restituisce la quantità di `assets` che sarebbe scambiata dalla cassaforte per la quantità di `shares` fornita.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Questa funzione restituisce la quantità massima di risorse sottostanti depositabili in una singola chiamata a [`deposit`](#deposit) dal `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro deposito al blocco corrente.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Questa funzione deposita `assets` di token sottostanti nella cassaforte e concede la proprietà delle `shares` al `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Questa funzione restituisce la quantità massima di quote coniabili in una sola chiamata a [`mint`](#mint) dal `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro conio al blocco corrente.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Questa funzione conia esattamente quote della cassaforte `shares` al `receiver`, depositando `assets` di token sottostanti.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Questa funzione restituisce la quantità massima di risorse sottostanti prelevabili dal saldo dell'`owner` con una singola chiamata a [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro prelievo al blocco corrente.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Questa funzione brucia `shares` da `owner` e invia esattamente token `assets` dalla cassaforte al `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Questa funzione restituisce la quantità massima di quote che possono essere riscattate dal saldo dell'`owner` tramite una chiamata a [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro riscatto al blocco corrente.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Questa funzione riscatta un numero specifico di `shares` dall'`owner` e invia `assets` del token sottostante dalla cassaforte al `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Restituisce il numero totale di quote della cassaforte non riscattate in circolazione.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Restituisce la quantità totale di quote della cassaforte che l'`owner` possiede attualmente.

### Mappa dell'interfaccia {#mapOfTheInterface}

![Mappa dell'interfaccia di ERC-4626](./map-of-erc-4626.png)

### Eventi {#events}

#### Evento di Deposito

**DEVE** essere emesso quando i token sono depositati nella cassaforte tramite i metodi [`mint`](#mint) e [`deposit`](#deposit)

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha scambiato `assets` per `shares` e ha trasferito tali `shares` all'`owner`.

#### Evento di Prelievo (Withdraw)

**DEVE** essere emesso quando le quote sono prelevate dalla cassaforte da un depositante con i metodi [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha innescato il prelievo e scambiato `shares`, possedute dall'`owner`, per `assets`. `receiver` è l'utente che ha ricevuto le `assets` prelevate.

## Letture consigliate {#further-reading}

- [EIP-4626: Tokenized vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
