---
title: Standard Multi-Token ERC-1155
description: Scopri l'ERC-1155, uno standard multi-token che combina token fungibili e non fungibili in un singolo contratto.
lang: it
---

## Introduzione {#introduction}

Un'interfaccia standard per i contratti che gestiscono più tipi di token. Un singolo contratto distribuito può includere qualsiasi combinazione di token fungibili, token non fungibili o altre configurazioni (ad es., token semi-fungibili).

**Cosa si intende per Standard Multi-Token?**

L'idea è semplice e cerca di creare un'interfaccia per contratti intelligenti in grado di rappresentare e controllare un numero qualsiasi di tipi di token fungibili e non fungibili. In questo modo, il token ERC-1155 può svolgere le stesse funzioni di un token [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/), e persino di entrambi contemporaneamente. Migliora la funzionalità di entrambi gli standard ERC-20 ed ERC-721, rendendolo più efficiente e correggendo evidenti errori di implementazione.

Il token ERC-1155 è descritto completamente nell'[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima gli [standard dei token](/developers/docs/standards/tokens/), l'[ERC-20](/developers/docs/standards/tokens/erc-20/) e l'[ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funzioni e caratteristiche dell'ERC-1155: {#body}

- [Trasferimento in blocco](#batch_transfers): Trasferisce più asset in una singola chiamata.
- [Saldo in blocco](#batch_balance): Ottiene i saldi di più asset in una singola chiamata.
- [Approvazione in blocco](#batch_approval): Approva tutti i token per un indirizzo.
- [Hook](#receive_hook): Hook per la ricezione dei token.
- [Supporto NFT](#nft_support): Se la fornitura è solo 1, lo tratta come NFT.
- [Regole di trasferimento sicuro](#safe_transfer_rule): Insieme di regole per un trasferimento sicuro.

### Trasferimenti in blocco {#batch-transfers}

Il trasferimento in blocco funziona in modo molto simile ai normali trasferimenti ERC-20. Diamo un'occhiata alla normale funzione `transferFrom` dell'ERC-20:

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

L'unica differenza nell'ERC-1155 è che passiamo i valori come un array e passiamo anche un array di ID. Ad esempio, dati `ids=[3, 6, 13]` e `values=[100, 200, 5]`, i trasferimenti risultanti saranno:

1. Trasferimento di 100 token con ID 3 da `_from` a `_to`.
2. Trasferimento di 200 token con ID 6 da `_from` a `_to`.
3. Trasferimento di 5 token con ID 13 da `_from` a `_to`.

Nell'ERC-1155 abbiamo solo `transferFrom`, non `transfer`. Per usarlo come un normale `transfer`, basta impostare l'indirizzo di provenienza (from) all'indirizzo che sta chiamando la funzione.

### Saldo in blocco {#batch-balance}

La rispettiva chiamata `balanceOf` dell'ERC-20 ha analogamente la sua funzione partner con supporto per i blocchi. Come promemoria, questa è la versione ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Ancora più semplice per la chiamata del saldo, possiamo recuperare più saldi in una singola chiamata. Passiamo l'array dei proprietari, seguito dall'array degli ID dei token.

Ad esempio, dati `_ids=[3, 6, 13]` e `_owners=[0xbeef..., 0x1337..., 0x1111...]`, il valore restituito sarà:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Approvazione in blocco {#batch-approval}

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

Le approvazioni sono leggermente diverse rispetto all'ERC-20. Invece di approvare importi specifici, si imposta un operatore come approvato o non approvato tramite `setApprovalForAll`.

La lettura dello stato attuale può essere effettuata tramite `isApprovedForAll`. Come puoi vedere, è un'operazione del tipo tutto o niente. Non puoi definire quanti token approvare o persino quale classe di token.

Questo è stato progettato intenzionalmente tenendo a mente la semplicità. Puoi solo approvare tutto per un indirizzo.

### Hook di ricezione {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dato il supporto dell'[EIP-165](https://eips.ethereum.org/EIPS/eip-165), l'ERC-1155 supporta gli hook di ricezione solo per i contratti intelligenti. La funzione hook deve restituire un valore magico predefinito bytes4 che è dato come:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Quando il contratto ricevente restituisce questo valore, si presume che il contratto accetti il trasferimento e sappia come gestire i token ERC-1155. Ottimo, niente più token bloccati in un contratto!

### Supporto NFT {#nft-support}

Quando la fornitura è solo una, il token è essenzialmente un token non fungibile (NFT). E come è standard per l'ERC-721, puoi definire un URL di metadati. L'URL può essere letto e modificato dai client, vedi [qui](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regola di trasferimento sicuro {#safe-transfer-rule}

Abbiamo già accennato ad alcune regole di trasferimento sicuro nelle spiegazioni precedenti. Ma diamo un'occhiata alla più importante delle regole:

1. Il chiamante deve essere approvato per spendere i token per l'indirizzo `_from` o il chiamante deve essere uguale a `_from`.
2. La chiamata di trasferimento deve essere annullata (revert) se:
   1. L'indirizzo `_to` è 0.
   2. La lunghezza di `_ids` non è uguale alla lunghezza di `_values`.
   3. Qualsiasi saldo dei titolari per i token in `_ids` è inferiore ai rispettivi importi in `_values` inviati al destinatario.
   4. Si verifica qualsiasi altro errore.

_Nota_: Tutte le funzioni in blocco (batch), incluso l'hook, esistono anche in versioni senza blocco. Questo viene fatto per l'efficienza del gas, considerando che il trasferimento di un solo asset sarà probabilmente ancora il modo più comunemente usato. Le abbiamo omesse per semplicità nelle spiegazioni, incluse le regole di trasferimento sicuro. I nomi sono identici, basta rimuovere 'Batch'.

## Letture consigliate {#further-reading}

- [EIP-1155: Standard Multi Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentazione di OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repository GitHub](https://github.com/enjin/erc-1155)
- [API NFT di Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)