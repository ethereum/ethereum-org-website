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

Il token ERC-4626 è descritto in modo completo in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Estensione asincrona delle cassaforti (ERC-7540)**

ERC-4626 è ottimizzata per i depositi atomici e le rivendicazioni, entro un certo limite. Se il limite viene raggiunto, non può essere inviato alcun nuovo deposito o rivendicazione. Questa limitazione non funziona bene per nessun sistema di contratti intelligenti con azioni asincrone o ritardi come prerequisito per interfacciarsi con il Vault (ad es., protocolli di asset del mondo reale, protocolli di prestito sottocollateralizzati, protocolli di prestito cross-chain, token di staking liquidi o moduli di sicurezza assicurativi).

ERC-7540 espande l'utilità delle Cassaforti dell'ERC-4626 per i casi d'uso asincroni. L'interfaccia Vault esistente (`deposit`/`withdraw`/`mint`/`redeem`) è utilizzata appieno per richiedere le Richieste asincrone.

L'estensione ERC-7540 è descritta in modo completo in [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Estensione delle cassaforti a più risorse (ERC-7575)**

Un caso d'uso mancante non supportato dall'ERC-4626 è quello delle Cassaforti aventi risorse o punti d'accesso multipli, come i Token del fornitore di liquidità (LP). Queste sono generalmente impacciate o non conformi, a causa del requisito dell'ERC-4626 di essere esso stesso un'ERC-20.

ERC-7575 aggiunge il supporto alle Cassaforti contenenti più risorse, esternalizzando l'implementazione del token ERC-20 da quella dell'ERC-4626.

L'estensione ERC-7575 è descritta in modo completo in [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima gli [standard dei token](/developers/docs/standards/tokens/) e [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ERC-4626: funzioni e caratteristiche {#body}

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

Questa funzione restituisce l'importo di `shares` che verrebbe scambiato dal vault per l'importo di `assets` fornito.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Questa funzione restituisce l'importo di `assets` che verrebbe scambiato dal vault per l'importo di `shares` fornito.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Questa funzione restituisce l'importo massimo di asset sottostanti che può essere depositato in una singola chiamata a [`deposit`](#deposit), con le quote coniate per il `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro deposito al blocco corrente.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Questa funzione deposita `assets` di token sottostanti nel vault e concede la proprietà di `shares` al `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Questa funzione restituisce l'importo massimo di quote che possono essere coniate in una singola chiamata a [`mint`](#mint), con le quote coniate per il `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro conio al blocco corrente.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Questa funzione conia esattamente `shares` quote del vault per il `receiver` depositando `assets` di token sottostanti.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Questa funzione restituisce l'importo massimo di asset sottostanti che può essere prelevato dal saldo dell'`owner` con una singola chiamata a [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro prelievo al blocco corrente.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Questa funzione brucia `shares` dall'`owner` e invia esattamente token `assets` dal vault al `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Questa funzione restituisce l'importo massimo di quote che può essere riscattato dal saldo dell'`owner` tramite una chiamata a [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro riscatto al blocco corrente.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Questa funzione riscatta un numero specifico di `shares` dall'`owner` e invia `assets` del token sottostante dal vault al `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Restituisce il numero totale di quote della cassaforte non riscattate in circolazione.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Restituisce l'importo totale di quote del vault che l'`owner` possiede attualmente.

### Mappa dell'interfaccia {#mapOfTheInterface}

![Mappa dell'interfaccia ERC-4626](./map-of-erc-4626.png)

### Eventi {#events}

#### Evento di Deposito

**DEVE** essere emesso quando i token vengono depositati nel vault tramite i metodi [`mint`](#mint) e [`deposit`](#deposit).

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

**DEVE** essere emesso quando le quote vengono prelevate dal vault da un depositante con i metodi [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha attivato il prelievo e ha scambiato `shares`, di proprietà di `owner`, per `assets`. `receiver` è l'utente che ha ricevuto gli `assets` prelevati.

## Letture consigliate {#further-reading}

- [EIP-4626: Standard per vault tokenizzati](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repo GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
