---
title: Standard dei Vault Tokenizzati ERC-4626
description: Uno standard per i vault che generano rendimento.
lang: it
---

## Introduzione {#introduction}

L'ERC-4626 è uno standard per ottimizzare e unificare i parametri tecnici dei vault che generano rendimento. Fornisce un'API standard per i vault tokenizzati che generano rendimento che rappresentano quote di un singolo token ERC-20 sottostante. L'ERC-4626 delinea anche un'estensione opzionale per i vault tokenizzati che utilizzano l'ERC-20, offrendo funzionalità di base per depositare, prelevare token e leggere i saldi.

**Il ruolo dell'ERC-4626 nei vault che generano rendimento**

I mercati di prestito, gli aggregatori e i token intrinsecamente fruttiferi aiutano gli utenti a trovare il miglior rendimento sui loro token crittografici eseguendo diverse strategie. Queste strategie vengono eseguite con lievi variazioni, il che potrebbe essere soggetto a errori o sprecare risorse di sviluppo.

L'ERC-4626 nei vault che generano rendimento ridurrà lo sforzo di integrazione e sbloccherà l'accesso al rendimento in varie applicazioni con poco sforzo specializzato da parte degli sviluppatori, creando modelli di implementazione più coerenti e robusti.

Il token ERC-4626 è descritto completamente nell'[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Estensione asincrona del vault (ERC-7540)**

L'ERC-4626 è ottimizzato per depositi e rimborsi atomici fino a un limite. Se il limite viene raggiunto, non possono essere inviati nuovi depositi o rimborsi. Questa limitazione non funziona bene per alcun sistema di contratto intelligente con azioni asincrone o ritardi come prerequisito per interfacciarsi con il Vault (ad es. protocolli di asset del mondo reale, protocolli di prestito sottocollateralizzati, protocolli di prestito cross-chain, token di staking liquido o moduli di sicurezza assicurativa).

L'ERC-7540 espande l'utilità dei Vault ERC-4626 per i casi d'uso asincroni. L'interfaccia esistente del Vault (`deposit`/`withdraw`/`mint`/`redeem`) è completamente utilizzata per rivendicare le Richieste asincrone.

L'estensione ERC-7540 è descritta completamente nell'[ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Estensione del vault multi-asset (ERC-7575)**

Un caso d'uso mancante che non è supportato dall'ERC-4626 sono i Vault che hanno più asset o punti di ingresso come i Token dei fornitori di liquidità (LP). Questi sono generalmente poco maneggevoli o non conformi a causa del requisito dell'ERC-4626 di essere esso stesso un ERC-20.

L'ERC-7575 aggiunge il supporto per i Vault con più asset esternalizzando l'implementazione del token ERC-20 dall'implementazione dell'ERC-4626.

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

Questa funzione restituisce la quantità di `shares` (quote) che verrebbe scambiata dal vault per la quantità di `assets` fornita.

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

Questa funzione deposita gli `assets` dei token sottostanti nel vault e concede la proprietà delle `shares` al `receiver`.

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

Questa funzione conia esattamente le `shares` del vault per il `receiver` depositando gli `assets` dei token sottostanti.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Questa funzione restituisce l'importo massimo di asset sottostanti che possono essere prelevati dal saldo dell'`owner` con una singola chiamata [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Questa funzione consente agli utenti di simulare gli effetti del loro prelievo al blocco corrente.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Questa funzione brucia le `shares` dall'`owner` e invia esattamente i token `assets` dal vault al `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Questa funzione restituisce la quantità massima di quote che possono essere rimborsate dal saldo dell'`owner` tramite una chiamata [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Questa funzione consente agli utenti di simulare gli effetti del loro rimborso al blocco corrente.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Questa funzione rimborsa un numero specifico di `shares` dall'`owner` e invia gli `assets` del token sottostante dal vault al `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Restituisce il numero totale di quote del vault non rimborsate in circolazione.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Restituisce l'importo totale delle quote del vault che l'`owner` possiede attualmente.

### Mappa dell'interfaccia {#mapOfTheInterface}

![Mappa dell'interfaccia ERC-4626](./map-of-erc-4626.png)

### Eventi {#events}

#### Evento Deposit

**DEVE** essere emesso quando i token vengono depositati nel vault tramite i metodi [`mint`](#mint) e [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Dove `sender` è l'utente che ha scambiato gli `assets` per le `shares` e ha trasferito tali `shares` all'`owner`.

#### Evento Withdraw

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

Dove `sender` è l'utente che ha attivato il prelievo e ha scambiato le `shares`, di proprietà dell'`owner`, per gli `assets`. `receiver` è l'utente che ha ricevuto gli `assets` prelevati.

## Letture consigliate {#further-reading}

- [EIP-4626: Standard dei vault tokenizzati](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repository GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)