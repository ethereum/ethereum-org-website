---
title: Standard per i vault tokenizzati asincroni ERC-7540
description: Un'estensione dell'ERC-4626 che aggiunge flussi di deposito e rimborso asincroni per i vault tokenizzati.
lang: it
---

## Introduzione {#introduction}

L'ERC-7540 estende lo [Standard per i vault tokenizzati ERC-4626](/developers/docs/standards/tokens/erc-4626/) aggiungendo il supporto per i flussi di deposito e rimborso asincroni. Introduce un modello di richiesta-e-riscatto (request-then-claim): gli utenti inviano prima una richiesta (bloccando i propri asset o quote), quindi riscattano il risultato dopo che il vault lo ha elaborato.

Ciò è necessario quando un vault non può effettuare il regolamento istantaneamente in un'unica transazione, ad esempio:

- Protocolli di asset del mondo reale (RWA) come titoli di stato tokenizzati, credito privato e altri asset con cicli di regolamento T+1 o T+2
- Prestito sottocollateralizzato in cui le valutazioni del credito avvengono offchain
- Strategie di vault cross-chain in cui il bridging introduce ritardi
- Token di liquid staking (LST) con periodi di svincolo

I vault possono scegliere di essere asincroni solo sui depositi, solo sui rimborsi o su entrambi. Questa flessibilità consente agli sviluppatori di vault di aggiungere flussi asincroni solo dove la strategia sottostante lo richiede, mantenendo l'altro lato sincrono.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima gli [standard dei token](/developers/docs/standards/tokens/), l'[ERC-20](/developers/docs/standards/tokens/erc-20/) e l'[ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

Nell'ERC-4626, un deposito viene regolato atomicamente: l'investitore invia gli asset e riceve in cambio le quote in un'unica transazione.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

L'ERC-7540 divide questo processo in due fasi. L'investitore chiama prima `requestDeposit()` per bloccare gli asset, quindi attende che il gestore del vault elabori la richiesta. Una volta soddisfatta, l'investitore chiama `deposit()` per riscattare le proprie quote. I tassi di cambio vengono determinati al momento del soddisfacimento, non al momento della richiesta.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Il flusso di rimborso funziona allo stesso modo: `requestRedeem()` blocca le quote e, una volta soddisfatta la richiesta, l'investitore chiama `redeem()` per riscattare gli asset.

## Funzioni e caratteristiche dell'ERC-7540 {#body}

L'ERC-7540 eredita l'intera interfaccia dell'ERC-4626 ma riadatta `deposit`/`mint`/`withdraw`/`redeem` come funzioni di riscatto. Le nuove funzioni `requestDeposit` e `requestRedeem` gestiscono la fase iniziale della richiesta.

Ogni richiesta passa attraverso tre stati: in sospeso (inviata, in attesa di elaborazione), riscattabile (soddisfatta e prezzata) e riscattata (l'investitore ha ritirato le proprie quote o asset).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Flusso di richiesta di deposito {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Trasferisce `assets` da `owner` nel vault e invia una richiesta di deposito. L'indirizzo `controller` riceve il controllo della richiesta. Restituisce un `requestId` che identifica il lotto della richiesta.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Restituisce l'importo di `assets` in una richiesta di deposito in sospeso (non ancora riscattabile) per il `controller` e l'`requestId` forniti.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Restituisce l'importo di `assets` in una richiesta di deposito riscattabile (soddisfatta ma non ancora riscattata) per il `controller` e l'`requestId` forniti.

#### Riscatto dei depositi {#claiming-deposits}

Una volta che una richiesta di deposito diventa riscattabile, l'utente chiama la funzione standard dell'ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) o [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) per riscattare le proprie quote. Nell'ERC-7540, queste funzioni non trasferiscono più gli asset (ciò è già avvenuto al momento della richiesta). Si limitano a coniare le quote per il destinatario.

### Flusso di richiesta di rimborso {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Blocca le `shares` da `owner` e invia una richiesta di rimborso. L'indirizzo `controller` riceve il controllo della richiesta.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Restituisce l'importo di `shares` in una richiesta di rimborso in sospeso per il `controller` e l'`requestId` forniti.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Restituisce l'importo di `shares` in una richiesta di rimborso riscattabile per il `controller` e l'`requestId` forniti.

#### Riscatto dei rimborsi {#claiming-redemptions}

Una volta che una richiesta di rimborso diventa riscattabile, l'utente chiama la funzione standard dell'ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) o [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) per riscattare i propri asset.

### Gestione degli operatori {#operator-management}

L'ERC-7540 include un modello di operatore (dall'[ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) che consente a terze parti di gestire le richieste per conto di un utente.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Approva o revoca l'`operator` ad agire per conto del `msg.sender` per le richieste di deposito/rimborso e i riscatti.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Restituisce se l'`operator` è approvato per agire per conto del `controller`.

### ID delle richieste {#request-ids}

Gli ID delle richieste differenziano i vari lotti di richieste. Tutte le richieste che condividono lo stesso `requestId` sono fungibili: passano da uno stato all'altro insieme e ricevono lo stesso tasso di cambio.

Quando un vault restituisce `requestId = 0` per tutte le richieste, solo l'indirizzo `controller` differenzia lo stato della richiesta. Più richieste dallo stesso controller vengono aggregate.

### Eventi {#events}

#### Evento DepositRequest {#depositrequest-event}

DEVE essere emesso quando viene inviata una richiesta di deposito tramite [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Evento RedeemRequest {#redeemrequest-event}

DEVE essere emesso quando viene inviata una richiesta di rimborso tramite [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Evento OperatorSet {#operatorset-event}

DEVE essere emesso quando un operatore viene approvato o revocato tramite [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Funzioni di anteprima {#preview-functions}

Le funzioni di anteprima devono eseguire il revert solo per i flussi che sono asincroni, perché il tasso di cambio non è noto finché la richiesta non viene soddisfatta. In un vault con deposito asincrono, `previewDeposit` e `previewMint` DEVONO eseguire il revert, mentre `previewRedeem` e `previewWithdraw` continuano a funzionare come nell'ERC-4626 (e viceversa per un vault con rimborso asincrono). Questa è una differenza comportamentale chiave rispetto all'ERC-4626.

## Letture consigliate {#further-reading}

- [EIP-7540: Vault tokenizzati ERC-4626 asincroni](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Standard per i vault tokenizzati](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementazione dell'ERC-7540 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)