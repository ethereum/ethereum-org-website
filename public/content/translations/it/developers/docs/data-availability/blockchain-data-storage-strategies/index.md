---
title: Strategie di archiviazione dei dati della blockchain
description: "Esistono diversi modi per archiviare i dati utilizzando la blockchain. Questo articolo confronterà le diverse strategie, i loro costi e compromessi, nonché i requisiti per utilizzarle in modo sicuro."
lang: it
---

Esistono diversi modi per archiviare le informazioni direttamente sulla blockchain, o in un modo che sia protetto dalla blockchain:

- Blob EIP-4844
- Calldata
- Fuori catena con meccanismi di L1
- "Codice" del contratto
- Eventi
- Archiviazione dell'EVM

La scelta del metodo da utilizzare si basa su diversi criteri:

- La fonte delle informazioni. Le informazioni nei calldata non possono provenire direttamente dalla blockchain stessa.
- La destinazione delle informazioni. I calldata sono disponibili solo nella transazione che li include. Gli eventi non sono affatto accessibili on-chain.
- Quanta complessità è accettabile? I computer che eseguono un nodo completo possono eseguire più elaborazioni rispetto a un client leggero in un'applicazione in esecuzione in un browser.
- È necessario facilitare un facile accesso alle informazioni da ogni nodo?
- I requisiti di sicurezza.

## I requisiti di sicurezza {#security-requirements}

In generale, la sicurezza delle informazioni è costituita da tre attributi:

- _Riservatezza_, alle entità non autorizzate non è consentito leggere le informazioni. Questo è importante in molti casi, ma non qui. _Non ci sono segreti sulla blockchain_. Le blockchain funzionano perché chiunque può verificare le transizioni di stato, quindi è impossibile utilizzarle per archiviare segreti direttamente. Esistono modi per archiviare informazioni riservate sulla blockchain, ma si basano tutti su qualche componente fuori catena per archiviare almeno una chiave.

- _Integrità_, le informazioni sono corrette, non possono essere modificate da entità non autorizzate o in modi non autorizzati (ad esempio, trasferendo [token ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) senza un evento `Transfer`). Sulla blockchain, ogni nodo verifica ogni cambiamento di stato, il che garantisce l'integrità.

- _Disponibilità_, le informazioni sono disponibili per qualsiasi entità autorizzata. Sulla blockchain, questo si ottiene solitamente rendendo le informazioni disponibili su ogni [nodo completo](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Le diverse soluzioni qui presentate hanno tutte un'eccellente integrità, perché gli hash vengono pubblicati su L1. Tuttavia, hanno diverse garanzie di disponibilità.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione dei [fondamenti della blockchain](/developers/docs/intro-to-ethereum/). Questa pagina presuppone inoltre che il lettore abbia familiarità con i [blocchi](/developers/docs/blocks/), le [transazioni](/developers/docs/transactions/) e altri argomenti pertinenti.

## Blob EIP-4844 {#eip-4844-blobs}

A partire dalla [biforcazione hard Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), la blockchain di Ethereum include l'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), che aggiunge a Ethereum blob di dati con una durata limitata (inizialmente circa [18 giorni](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Questi blob hanno un prezzo separato dal [gas di esecuzione](/developers/docs/gas), sebbene utilizzino un meccanismo simile. Sono un modo economico per pubblicare dati temporanei.

Il caso d'uso principale per i blob EIP-4844 è per i rollup per pubblicare le loro transazioni. I [rollup ottimistici](/developers/docs/scaling/optimistic-rollups) devono pubblicare le transazioni sulle loro blockchain. Tali transazioni devono essere disponibili a chiunque durante il [periodo di sfida](https://docs.optimism.io/connect/resources/glossary#challenge-period) per consentire ai [validatori](https://docs.optimism.io/connect/resources/glossary#validator) di correggere l'errore se il [sequenziatore](https://docs.optimism.io/connect/resources/glossary#sequencer) del rollup pubblica una radice di stato errata.

Tuttavia, una volta trascorso il periodo di sfida e finalizzata la radice di stato, lo scopo rimanente per conoscere queste transazioni è replicare lo stato attuale della catena. Questo stato è disponibile anche dai nodi della catena, richiedendo molta meno elaborazione. Pertanto, le informazioni sulle transazioni dovrebbero comunque essere conservate in alcuni luoghi, come gli [esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers), ma non c'è bisogno di pagare per il livello di resistenza alla censura fornito da Ethereum.

Anche i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/#data-availability) pubblicano i dati delle loro transazioni per consentire ad altri nodi di replicare lo stato esistente e verificare le prove di validità, ma ancora una volta si tratta di un requisito a breve termine.

Al momento della stesura, la pubblicazione su EIP-4844 costa un wei (10<sup>-18</sup> ETH) per byte, che è trascurabile rispetto ai [21.000 gas di esecuzione che costa qualsiasi transazione, inclusa una che pubblica blob](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Puoi vedere il prezzo attuale dell'EIP-4844 su [blobscan.com](https://blobscan.com/blocks).

Ecco gli indirizzi per vedere i blob pubblicati da alcuni famosi rollup.

| Rollup                               | Indirizzo della casella di posta                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

I calldata si riferiscono ai byte inviati come parte della transazione. Vengono archiviati come parte del registro permanente della blockchain nel blocco che include tale transazione.

Questo è il metodo più economico per inserire permanentemente i dati nella blockchain. Il costo per byte è di 4 gas di esecuzione (se il byte è zero) o 16 gas (qualsiasi altro valore). Se i dati sono compressi, il che è una pratica standard, allora ogni valore di byte è ugualmente probabile, quindi il costo medio è di circa 15,95 gas per byte.

Al momento della stesura, i prezzi sono 12 gwei/gas e 2300 $/ETH, il che significa che il costo è di circa 45 centesimi per kilobyte. Poiché questo era il metodo più economico prima dell'EIP-4844, questo è il metodo utilizzato dai rollup per archiviare le informazioni sulle transazioni, che devono essere disponibili per le [sfide di errore](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ma non devono essere accessibili direttamente on-chain.

Ecco gli indirizzi per vedere le transazioni pubblicate da alcuni famosi rollup.

| Rollup                               | Indirizzo della casella di posta                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Fuori catena con meccanismi di L1 {#offchain-with-l1-mechs}

A seconda dei tuoi compromessi in materia di sicurezza, potrebbe essere accettabile inserire le informazioni altrove e utilizzare un meccanismo che garantisca che i dati siano disponibili quando necessario. Ci sono due requisiti affinché questo funzioni:

1. Pubblicare un [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dei dati sulla blockchain, chiamato _impegno di input_. Questa può essere una singola parola di 32 byte, quindi non è costosa. Finché l'impegno di input è disponibile, l'integrità è assicurata perché non è fattibile trovare altri dati che produrrebbero lo stesso valore di hash. Quindi, se vengono forniti dati errati, possono essere rilevati.

2. Avere un meccanismo che garantisca la disponibilità. Ad esempio, in [Redstone](https://redstone.xyz/docs/what-is-redstone) qualsiasi nodo può inviare una sfida di disponibilità. Se il sequenziatore non risponde on-chain entro la scadenza, l'impegno di input viene scartato, quindi le informazioni sono considerate come mai pubblicate.

Questo è accettabile per un rollup ottimistico perché ci stiamo già affidando ad avere almeno un verificatore onesto per la radice di stato. Tale verificatore onesto si assicurerà anche di avere i dati per elaborare i blocchi e lancerà una sfida di disponibilità se le informazioni non sono disponibili fuori catena. Questo tipo di rollup ottimistico è chiamato [plasma](/developers/docs/scaling/plasma/).

## Codice del contratto {#contract-code}

Le informazioni che devono essere scritte solo una volta, non vengono mai sovrascritte e devono essere disponibili on-chain possono essere archiviate come codice del contratto. Ciò significa che creiamo un "contratto intelligente" con i dati e poi utilizziamo [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) per leggere le informazioni. Il vantaggio è che copiare il codice è relativamente economico.

Oltre al costo dell'espansione della memoria, `EXTCODECOPY` costa 2600 gas per il primo accesso a un contratto (quando è "freddo") e 100 gas per le copie successive dallo stesso contratto più 3 gas per parola di 32 byte. Rispetto ai calldata, che costano 15,95 per byte, questo è più economico a partire da circa 200 byte. In base alla [formula per i costi di espansione della memoria](https://www.evm.codes/about#memoryexpansion), finché non hai bisogno di più di 4 MB di memoria, il costo di espansione della memoria è inferiore al costo dell'aggiunta di calldata.

Naturalmente, questo è solo il costo per _leggere_ i dati. Creare il contratto costa circa 32.000 gas + 200 gas/byte. Questo metodo è economico solo quando le stesse informazioni devono essere lette molte volte in diverse transazioni.

Il codice del contratto può essere privo di senso, purché non inizi con `0xEF`. I contratti che iniziano con `0xEF` vengono interpretati come [formato oggetto di ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), che ha requisiti molto più severi.

## Eventi {#events}

Gli [eventi](https://docs.alchemy.com/docs/solidity-events) vengono emessi dai contratti intelligenti e letti dal software fuori catena.
Il loro vantaggio è che il codice fuori catena può rimanere in ascolto degli eventi. Il costo è in [gas](https://www.evm.codes/#a0?fork=cancun), 375 più 8 gas per byte di dati. A 12 gwei/gas e 2300 $/ETH, questo si traduce in un centesimo più 22 centesimi per kilobyte.

## Archiviazione {#storage}

I contratti intelligenti hanno accesso all'[archiviazione persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Tuttavia, è molto costosa. Scrivere una parola di 32 byte in uno slot di archiviazione precedentemente vuoto può [costare 22.100 gas](https://www.evm.codes/#55?fork=cancun). A 12 gwei/gas e 2300 $/ETH, si tratta di circa 61 centesimi per operazione di scrittura, o 19,5 $ per kilobyte.

Questa è la forma di archiviazione più costosa in Ethereum.

## Riepilogo {#summary}

Questa tabella riassume le diverse opzioni, i loro vantaggi e svantaggi.

| Tipo di archiviazione       | Fonte dei dati      | Garanzia di disponibilità                                                                                                          | Disponibilità on-chain                                           | Limitazioni aggiuntive                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blob EIP-4844               | Fuori catena        | Garanzia di Ethereum per [\~18 giorni](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | È disponibile solo l'hash                                        |                                                                         |
| Calldata                    | Fuori catena        | Garanzia di Ethereum per sempre (parte della blockchain)                                                                           | Disponibile solo se scritto in un contratto e in quella transazione |
| Fuori catena con meccanismi di L1 | Fuori catena        | Garanzia di "un verificatore onesto" durante il periodo di sfida                                                                   | Solo hash                                                        | Garantito dal meccanismo di sfida, solo durante il periodo di sfida     |
| Codice del contratto        | On-chain o fuori catena | Garanzia di Ethereum per sempre (parte della blockchain)                                                                           | Sì                                                               | Scritto a un indirizzo "casuale", non può iniziare con `0xEF`           |
| Eventi                      | On-chain            | Garanzia di Ethereum per sempre (parte della blockchain)                                                                           | No                                                               |
| Archiviazione               | On-chain            | Garanzia di Ethereum per sempre (parte della blockchain e dello stato attuale fino a sovrascrittura)                               | Sì                                                               |