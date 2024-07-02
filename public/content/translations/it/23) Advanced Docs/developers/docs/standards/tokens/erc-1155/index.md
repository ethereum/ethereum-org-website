---
title: Standard Multi-Token ERC-1155
description:
lang: it
---

## Introduzione {#introduction}

Un'interfaccia standard per i contratti che gestiscono più tipi di token. Un singolo contratto distribuito può includere qualsiasi combinazione di token fungibili, token non fungibili o altre configurazioni (ad esempio token semi-fungibili).

**Cosa si intende per Standard Multi-Token?**

L'idea è semplice e cerca di creare un'interfaccia per i contratti intelligenti, che possa rappresentare e controllare qualsiasi numero di tipi di token fungibili e non fungibili. In questo modo, il token ERC-1155 può svolgere le stesse funzioni di un token [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/), e anche entrambi contemporaneamente. Migliora la funzionalità degli standard ERC-20 ed ERC-721, rendendola più efficiente e correggendo ovvi errori d'implementazione.

Il token ERC-1155 è descritto nella sua interezza in [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzi tutto di leggere [token standards](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), and [ERC-721](/developers/docs/standards/tokens/erc-721/).

## ERC-1155 Funzioni e caratteristiche: {#body}

- [Batch Transfer](#batch_transfers): trasferire più risorse con una singola chiamata.
- [Batch Balance](#batch_transfers): richiedere i saldi di più risorse con una singola chiamata.
- [Batch Approval](#batch_approval): approvare tutti i token ad un indirizzo.
- [Hook](#recieve_hook): ricevere l'hook dei token.
- [Supporto NFT](#nft_support): Se la quantità è solo 1, trattatala come NFT.
- [Regole di trasferimento sicure](#safe_transfer_rule): insieme di regole per il trasferimento sicuro.

### Trasferimenti in batch {#batch-transfers}

Il trasferimento in batch funziona in modo molto simile ai normali trasferimenti ERC-20. Diamo un'occhiata alla normale funzione `transferFrom` dell'ERC-20:

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

La sola differenza in ERC-1155 è che passiamo i valori come un array e inoltre passiamo un array di ID. Per esempio, dati `ids=[3, 6, 13]` e `values=[100, 200, 5]`, i trasferimenti risultanti saranno

1. Trasferisci 100 token con id 3 da `_from` a `_to`.
2. Trasferisci 200 token con id 6 da `_from` a `_to`.
3. Trasferisci 5 token con id 13 da `_from` a `_to`.

In ERC-1155 abbiamo solo `transferFrom`, non `transfer`. Per usarlo come un normale `transfer`, basta impostare l'indirizzo di provenienza all'indirizzo che sta chiamando la funzione.

### Saldo Batch {#batch-balance}

La rispettiva chiamata dell'ERC-20 `balanceOf`, ha la propria funzione partner con supporto al batch. Come promemoria, questa è la versione dell'ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Ancora più semplice per la chiamata del saldo, possiamo recuperare più saldi in una sola chiamata. Passiamo l'array di proprietari, seguito dall'array di id del token.

Per esempio, dati `_ids=[3, 6, 13]` e `_owners=[0xbeef..., 0x1337..., 0x1111...]`, il valore restituito sarà

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Approvazione del batch {#batch-approval}

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

Le approvazioni sono leggermente diverse da quelle dell'ERC-20. Invece di approvare quantità specifiche, si imposta un operatore come approvato o non approvato tramite `setApprovalForAll`.

È possibile leggere lo stato corrente tramite `isApprovedForAll`. Come puoi vedere, si tratta di un'operazione "o tutto o niente". Non è possibile definire quanti token o quale classe di token approvare.

Questo è intenzionalmente progettato pensando alla semplicità. È possibile solo approvare tutto per un indirizzo.

### Ricevere Hook {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dato il supporto all'[EIP-165](https://eips.ethereum.org/EIPS/eip-165), i supporti di ERC-1155 ricevono hook solo per i contratti intelligenti. La funzione di hook deve restituire un valore bytes4 magico predefinito dato come:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Quando il contratto ricevente restituisce questo valore, si presume che il contratto accetti il trasferimento e sappia come gestire i token ERC-1155. Fantastico, niente più token bloccati in un contratto!

### Supporto NFT {#nft-support}

Quando la quantità è solo una, il token è essenzialmente un token non fungibile (NFT). E, come nel caso dello standard per l'ERC-721, è possibile definire un URL di metadati. L'URL può essere letto e modificato dai client, vedi [qui](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regola di trasferimento sicuro {#safe-transfer-rule}

Abbiamo già accennato ad alcune regole di trasferimento sicure già nelle spiegazioni precedenti. Ma diamo un'occhiata alla regola più importante:

1. il chiamante dev'esser approvato per spendere i token per l'indirizzo `_from` o il chiamante dev'esser pari a `_from`.
2. la chiamata di trasferimento deve ripristinarsi se
   1. l'indirizzo `_to` è 0.
   2. la lunghezza di `_ids` non è pari alla lunghezza di `_values`.
   3. uno qualsiasi dei saldi dei titolari per i token in `_ids` è inferiore ai rispettivi importi in `_values` inviati al destinatario.
   4. si verifica qualsiasi altro errore.

_Nota_: tutte le funzioni batch compreso l'hook esistono anche come versioni senza batch. Ciò avviene per l'efficienza del gas, considerando che trasferire una singola risorsa sarebbe comunque il metodo più usato. Li abbiamo esclusi per semplicità nelle spiegazioni, lo stesso vale per le regole di trasferimento sicure. I nomi sono identici, basta rimuovere 'Batch'.

## Letture consigliate {#further-reading}

- [EIP-1155 Standard Multi-Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Openzeppelin Docs](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: Repository di GitHub](https://github.com/enjin/erc-1155)
- [API di Alchemy NFT](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
