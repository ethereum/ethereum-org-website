---
title: Standard dei Vault Tokenizzati ERC-4626
description: Uno standard per i vault fruttiferi.
lang: it
---

## Introduzione {#introduction}

ERC-4626 è uno standard per ottimizzare e unificare i parametri tecnici dei vault fruttiferi (yield-bearing). Fornisce un'API standard per i vault fruttiferi tokenizzati che rappresentano quote di un singolo token ERC-20 sottostante. ERC-4626 delinea anche un'estensione opzionale per i vault tokenizzati che utilizzano ERC-20, offrendo funzionalità di base per il deposito, il prelievo di token e la lettura dei saldi.

**Il ruolo di ERC-4626 nei vault fruttiferi**

I mercati di prestito, gli aggregatori e i token intrinsecamente fruttiferi aiutano gli utenti a trovare il miglior rendimento sui loro token cripto eseguendo diverse strategie. Queste strategie vengono realizzate con lievi variazioni, il che potrebbe essere soggetto a errori o sprecare risorse di sviluppo.

L'ERC-4626 nei vault fruttiferi ridurrà lo sforzo di integrazione e sbloccherà l'accesso al rendimento in varie applicazioni con poco sforzo specializzato da parte degli sviluppatori, creando modelli di implementazione più coerenti e robusti.

Il token ERC-4626 è descritto completamente nell'[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Estensione asincrona del vault (ERC-7540)**

L'ERC-4626 è ottimizzato per depositi e rimborsi atomici fino a un limite. Se il limite viene raggiunto, non possono essere inviati nuovi depositi o rimborsi. Questa limitazione non funziona bene per alcun sistema di smart contract con azioni asincrone o ritardi come prerequisito per interfacciarsi con il vault (ad es. protocolli di asset del mondo reale, protocolli di prestito sottocollateralizzati, protocolli di prestito cross-chain, token di liquid staking (LST) o moduli di sicurezza assicurativi).

L'ERC-7540 espande l'utilità dei vault ERC-4626 per i casi d'uso asincroni. L'interfaccia esistente del vault (`deposit`/`withdraw`/`mint`/`redeem`) è completamente utilizzata per il riscatto di richieste asincrone.

L'estensione ERC-7540 è descritta completamente nell'[ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Estensione del vault multi-asset (ERC-7575)**

Un caso d'uso mancante che non è supportato dall'ERC-4626 sono i vault che hanno più asset o punti di ingresso, come i token del fornitore di liquidità (LP). Questi sono generalmente poco maneggevoli o non conformi a causa del requisito dell'ERC-4626 di essere esso stesso un ERC-20.

L'ERC-7575 aggiunge il supporto per i vault con più asset esternalizzando l'implementazione del token ERC-20 dall'implementazione dell'ERC-4626.

L'estensione ERC-7575 è descritta completamente nell'[ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima gli [standard dei token](/developers/docs/standards/tokens/) e l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funzioni e caratteristiche dell'ERC-4626: {#body}

### Metodi {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Questa funzione restituisce l'indirizzo del token sottostante utilizzato per il vault per la contabilità, il deposito e il prelievo.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Questa funzione restituisce l'importo totale degli asset sottostanti detenuti dal vault.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Questa funzione restituisce la quantità di `shares` che verrebbe scambiata dal vault per la quantità di `assets` fornita.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Questa funzione restituisce la quantità di `assets` che verrebbe scambiata dal vault per la quantità di `shares` fornita.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Questa funzione restituisce l'importo massimo di asset sottostanti che possono essere depositati in una singola chiamata [`deposit`](#deposit), con le quote coniate per il `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro deposito al blocco corrente.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Questa funzione deposita `assets` di token sottostanti nel vault e concede la proprietà di `shares` a `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Questa funzione restituisce la quantità massima di quote che possono essere coniate in una singola chiamata [`mint`](#mint), con le quote coniate per il `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti della loro coniazione al blocco corrente.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Questa funzione conia esattamente `shares` quote del vault per `receiver` depositando `assets` di token sottostanti.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Questa funzione restituisce l'importo massimo di asset sottostanti che possono essere prelevati dal saldo di `owner` con una singola chiamata [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro prelievo al blocco corrente.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Questa funzione brucia `shares` da `owner` e invia esattamente `assets` token dal vault a `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Questa funzione restituisce la quantità massima di quote che possono essere rimborsate dal saldo di `owner` tramite una chiamata [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro rimborso al blocco corrente.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Questa funzione rimborsa un numero specifico di `shares` da `owner` e invia `assets` di token sottostante dal vault a `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Restituisce il numero totale di quote del vault non rimborsate in circolazione.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Restituisce l'importo totale delle quote del vault che `owner` possiede attualmente.

### Mappa dell'interfaccia {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Eventi {#events}

#### Evento Deposit {#deposit-event}

**DEVE** essere emesso quando i token vengono depositati nel vault tramite i metodi [`mint`](#mint) e [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha scambiato `assets` per `shares` e ha trasferito quelle `shares` a `owner`.

#### Evento Withdraw {#withdraw-event}

**DEVE** essere emesso quando le quote vengono prelevate dal vault da un depositante nei metodi [`redeem`](#redeem) o [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha attivato il prelievo e ha scambiato `shares`, di proprietà di `owner`, per `assets`. `receiver` è l'utente che ha ricevuto i `assets` prelevati.

## Letture consigliate {#further-reading}

- [EIP-4626: Standard dei vault tokenizzati](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repository GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)