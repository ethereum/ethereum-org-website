---
title: Strategie di archiviazione dei dati della blockchain
description: Esistono diversi modi per archiviare i dati utilizzando la blockchain. Questo articolo confronta le varie strategie, i loro costi e compromessi oltre ai requisiti per utilizzarle in maniera sicura.
lang: it
---

Esistono diversi modi per archiviare le informazioni, sia direttamente sulla blockchain che in modo che siano protette dalla blockchain:

- Blob di EIP-4844
- Calldata
- Offchain con meccanismi del L1
- "Codice" del contratto
- Eventi
- Archivio EVM

La scelta del metodo da utilizzare si basa su vari criteri:

- La fonte delle informazioni. Le informazioni in calldata non possono arrivare direttamente dalla blockchain stessa.
- La destinazione delle informazioni. Calldata è disponibile solo nelle transazioni che ha avviato. Gli eventi non sono affatto accessibili onchain.
- Che livello di seccatura è accettabile? I computer che eseguono nodi completi possono eseguire più elaborazioni dei client leggeri in un'applicazione eseguita nel browser.
- È necessario favorire un facile accesso alle informazioni da ogni nodo?
- I requisiti di sicurezza.

## I requisiti di sicurezza {#security-requirements}

In generale la sicurezza delle informazioni consiste in tre attributi:

- _Riservatezza_, alle entità non autorizzate non è permesso leggere le informazioni. Questo è importante in molti casi, ma non qui. _Non ci sono segreti sulla blockchain_. Le blockchain funzionano perché chiunque può verificare lo stato delle transazioni, quindi è impossibile utilizzarle per conservare segreti direttamente. Ci sono vari modi per conservare informazioni riservate sulla blockchain, ma fanno tutti affidamento su delle componenti offchain per conservare almeno una chiave.

- _Integrità_, l'informazione è corretta, non può essere modificata da entità non autorizzate o in modalità non autorizzate (ad esempio, trasferendo [token ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) senza un evento `Transfer`). Sulla blockchain ogni nodo verifica ogni modifica di stato, e ciò ne assicura l'integrità.

- _Disponibilità_, le informazioni sono disponibili per ogni entità autorizzata. Sulla blockchain questo di solito è possibile mantenendo le informazioni disponibili in ogni [nodo completo](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Le varie soluzioni qui presentate hanno tutte un'integrità eccellente perché gli hash sono pubblicati sul L1. Tuttavia, hanno diverse garanzie di disponibilità.

## Prerequisiti {#prerequisites}

Dovresti avere una buona conoscenza dei [fondamenti della blockchain](/developers/docs/intro-to-ethereum/). Questa pagina presuppone che il lettore abbia familiarità con i [blocchi](/developers/docs/blocks/), le [transazioni](/developers/docs/transactions/) e altri argomenti rilevanti.

## Blob di EIP-4844 {#eip-4844-blobs}

A partire dalla [biforcazione Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) la blockchain di Ethereum include [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), che si aggiunge ai blob di dati di Ethereum con una vita limitata (inizialmente circa [18 giorni](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Questi blob sono stimati separatamente dal [gas di esecuzione](/developers/docs/gas), sebbene utilizzino un meccanismo simile. Sono un modo economico per pubblicare dati temporanei.

Il caso d'uso principale per i blob EIP-4844 riguarda la pubblicazione delle transazioni da parte dei rollup. [I rollup ottimistici](/developers/docs/scaling/optimistic-rollups) hanno bisogno di pubblicare le transazioni sulle proprie blockchain. Queste transazioni devono essere disponibili per chiunque durante il [periodo di contestazione](https://docs.optimism.io/connect/resources/glossary#challenge-period) per permettere ai [validatori](https://docs.optimism.io/connect/resources/glossary#validator) di aggiustare eventuali errori se i [sequenziatori](https://docs.optimism.io/connect/resources/glossary#sequencer) dei rollup pubblicano una radice di stato errata.

A ogni modo, una volta che il periodo di contestazione è passato e la radice di stato è finalizzata, lo scopo rimanente per conoscere queste transazioni è di replicare lo stato corrente della catena. Questo stato è disponibile anche dai nodi della catena, il che richiede uno sforzo di elaborazione molto inferiore. Quindi le informazioni sulla transazione dovrebbero essere comunque conservate in alcuni posti, come ad esempio gli [esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers), ma non c'è bisogno di pagare il livello di resistenza alla censura fornito da Ethereum.

Anche i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/#data-availability) pubblicano i dati delle transazioni in modo da permettere ad altri nodi di replicare lo stato esistente e verificare le prove di validità, ma anche in questo caso si tratta di un requisito a breve termine.

Al momento, pubblicare su EIP-4844 costa un wei (10<sup>-18</sup> ETH) per byte, il che è trascurabile rispetto alle [21.000 unità di gas di esecuzione che costa ogni transazione, incluse quelle che pubblicano blob](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Puoi vedere il prezzo attuale di EIP-4844 su [blobscan.com](https://blobscan.com/blocks).

Ecco gli indirizzi per vedere i blob pubblicati da alcuni rollup famosi.

| Rollup                               | Indirizzo di posta                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata si riferisce ai byte inviati come parte della transazione. È archiviato nel registro permanente della blockchain nel blocco che include quella transazione.

Questo è il metodo più economico per mettere dati permanentemente nella blockchain. Il costo per byte è di 4 unità di gas di esecuzione (se il byte è zero) o 16 unità di gas (per ogni altro valore). Se i dati sono compressi, il che è una pratica standard, allora ogni valore di byte è ugualmente probabile, quindi il costo medio è di circa 15,95 unità di gas per byte.

Al momento i prezzi sono di 12 gwei/gas e 2300 $/ETH, il che significa che il costo è circa di 45 cent al kilobyte. Siccome questo era il metodo più economico prima di EIP-4844, questo è anche il metodo che i rollup utilizzavano per archiviare le informazioni sulle transazioni, che devono essere disponibili per le [contestazioni di errori](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ma non devono necessariamente essere accessibili direttamente onchain.

Ecco gli indirizzi per vedere le transazioni pubblicate da alcuni rollup famosi.

| Rollup                               | Indirizzo di posta                                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain con meccanismi del L1 {#offchain-with-l1-mechs}

A seconda dei propri compromessi per la sicurezza, potrebbe essere accettabile mettere le informazioni altrove e utilizzare un meccanismo che garantisca che i dati siano disponibili quando ce n'è bisogno. Ci sono due requisiti affinché questo funzioni:

1. Pubblicare un [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dei dati sulla blockchain, chiamato _input commitment_. Questo può essere una singola parola di 32 byte, quindi non è costoso. Fintanto che l'impegno di input è disponibile l'integrità è assicurata, perché non è possibile trovare nessun altro dato che abbia un hash sullo stesso valore. Quindi se i dati forniti sono errati, è possibile rilevarlo.

2. Avere un meccanismo che garantisca la disponibilità. Per esempio, in [Redstone](https://redstone.xyz/docs/what-is-redstone) qualsiasi nodo può inviare una contestazione di disponibilità. Se il sequenziatore non risponde onchain entro la scadenza, l'impegno di input è scartato, quindi l'informazione è considerata come se non fosse mai stata pubblicata.

Questo è accettabile per un rollup ottimistico perché facciamo già affidamento sul fatto di avere almeno un verificatore onesto della radice di stato. Questo verificatore onesto si assicurerà anche di avere dati per elaborare il blocco, ed emettere una contestazione di disponibilità se le informazioni non sono disponibili offchain. Questo tipo di rollup ottimistico è chiamato [plasma](/developers/docs/scaling/plasma/).

## Codice del contratto {#contract-code}

Le informazioni che devono essere scritte solo una volta, che non vengono mai sovrascritte e che devono essere disponibili onchain, possono essere archiviate come codice del contratto. Questo significa che creiamo un "contratto intelligente" con i dati e poi utilizziamo [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) per leggere le informazioni. Il vantaggio è che copiare il codice è relativamente economico.

Oltre al costo di espansione della memoria, `EXTCODECOPY` costa 2600 unità di gas per il primo accesso a un contratto (quando è "freddo") e 100 unità di gas per le copie successive dallo stesso contratto più 3 unità gas per parola di 32 byte. Rispetto a calldata, che costa 15,95 al byte, questo risulta più economico a partire da circa 200 byte. In base alla [formula per i costi di espansione della memoria](https://www.evm.codes/about#memoryexpansion), a meno che non si abbia bisogno di più di 4MB di memoria, il costo di espansione della memoria è minore del costo per aggiungere calldata.

Di certo questo è solo il costo per _leggere_ i dati. Creare il contratto costa circa 32.000 unità di gas + 200 unità di gas/byte. Questo metodo è economico solo quando le stesse informazioni devono essere lette molte volte in transazioni diverse.

Il codice del contratto può essere senza senso fintanto che non inizia con `0xEF`. I contratti che iniziano con `0xEF` sono interpretati come [formato oggetto di ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), che ha dei requisiti molto più restrittivi.

## Eventi {#events}

Gli [eventi](https://docs.alchemy.com/docs/solidity-events) sono emessi da contratti intelligenti e letti da software offchain.
Il loro vantaggio è che il codice offchain può rimanere in ascolto per gli eventi. Il costo è [gas](https://www.evm.codes/#a0?fork=cancun), 375 più 8 unità di gas per byte di dati. A 12 gwei/gas e 2300 $/ETH, questo si traduce in un cent più 22 cent al kilobyte.

## Archivio {#storage}

I contratti intelligenti hanno accesso a un [archivio persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Tuttavia è molto costoso. Scrivere una parola di 32 byte in uno slot di archiviazione precendentemente vuoto può [costare 22.100 unità di gas](https://www.evm.codes/#55?fork=cancun). A 12 gwei/gas e 2300 $/ETH, si tratta di circa 61 cent per operazione di scrittura, o $19,5 al kilobyte.

Questa è la forma più costosa di archiviazione su Ethereum.

## Riepilogo {#summary}

Questa tabella riassume le diverse opzioni, i loro vantaggi e svantaggi.

| Tipo di archiviazione          | Fonte dei dati     | Garanzia di disponibilità                                                                                                                              | Disponibilità onchain                                               | Ulteriori limitazioni                                                               |
| ------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Blob di EIP-4844               | Offchain           | Garanzia di Ethereum per [~18 giorni](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Solo l'hash è disponibile                                           |                                                                                     |
| Calldata                       | Offchain           | Garanzia di Ethereum per sempre (parte della blockchain)                                                                            | Disponibile solo se scritto in un contratto, e a quella transazione |                                                                                     |
| Offchain con meccanismi del L1 | Offchain           | Garanzia di "un verificatore onesto" durante il periodo di contestazione                                                                               | Solo hash                                                           | Garantito dal meccanismo di contestazione, solo durante il periodo di contestazione |
| Codice del contratto           | Onchain o offchain | Garanzia di Ethereum per sempre (parte della blockchain)                                                                            | Sì                                                                  | Scritto in un indirizzo "casuale", non può iniziare con `0xEF`                      |
| Eventi                         | Onchain            | Garanzia di Ethereum per sempre (parte della blockchain)                                                                            | No                                                                  |                                                                                     |
| Storage                        | Onchain            | Garanzia di Ethereum per sempre (parte della blockchain e lo stato corrente fino a quando è sovrascritto)                           | Sì                                                                  |                                                                                     |
