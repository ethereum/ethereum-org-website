---
title: Rollup di livello 2
description: Un'introduzione alle diverse soluzioni di scalabilità del rollup di livello 2 attualmente sviluppate dalla comunità di Ethereum.
lang: it
sidebar: true
incomplete: true
sidebarDepth: 3
---

Livello 2 è un termine collettivo per le soluzioni progettate per aiutare a scalare la tua applicazione gestendo le transazioni fuori dalla rete principale di Ethereum (Livello 1), sfruttando al contempo il robusto modello di sicurezza decentralizzato della rete principale. La velocità delle transazioni ne risente quando la rete è molto carica, e l'esperienza utente può risultare poco piacevole per alcuni tipi di dApp. Man mano che la rete diventa più congestionata, il prezzo del carburante sale perché i mittenti delle transazioni mirano a superarsi a vicenda. Ciò può rendere l'utilizzo di Ethereum alquanto dispendioso.

## Prerequisiti {#prerequisites}

Occorre avere una buona comprensione di tutti gli argomenti fondamentali ed un elevato livello di comprensione della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come i rollup, è un argomento avanzato in quanto la tecnologia è meno testata nel campo e continua ad essere oggetto di ricerca e sviluppo.

## Perché serve il livello 2? {#why-is-layer-2-needed}

- Alcuni casi di utilizzo, come i giochi su blockchain, non hanno senso con gli attuali tempi di transazione
- Può essere inutilmente costoso utilizzare applicazioni blockchain
- Qualunque aggiornamento alla scalabilità non dovrebbe sacrificare decentralizzazione e sicurezza - il layer 2 si basa su Ethereum.

## Rollup {#rollups}

I rollup sono soluzioni che svolgono l'_esecuzione_ della transazione al di fuori della catena della rete principale di Ethereum (livello 1), ma pubblicano i _dati_ della transazione sul livello 1. Poiché i _dati_ della transazione sono sul livello 1, i rollup sono protetti da tale livello. L'eredità delle proprietà di sicurezza del livello 1 durante l'esecuzione al di fuori di esso è una caratteristica distintiva dei rollup.

Tre proprietà semplificate dei rollup sono:

1. _esecuzione_ della transazione al di fuori del livello 1
2. i dati o la prova delle transazioni sono sul livello 1
3. lo smart contract di un rollup nel livello 1 può imporre l'esecuzione corretta della transazione sul livello 2 usando i dati della transazione sul livello 1

I rollup richiedono gli "operatori" di mettere in staking un'obbligazione nel contratto del rollup. Ciò incentiva gli operatori a verificare ed eseguire correttamente le transazioni.

**Utile per:**

- ridurre le commissioni per gli utenti
- partecipazione aperta
- maggiori volumi di transazioni e maggiore rapidità

Esistono due tipi di rollup con modelli di sicurezza diversi:

- **Rollup ottimistici**: presume che le transazioni siano valide di default ed eseguono unicamente il calcolo, tramite una [**prova di frode**](/glossary/#fraud-proof), in caso di messa alla prova
- **Rollup a conoscenza zero**: esegue il calcolo al di fuori della catena e invia una [**prova di validità**](/glossary/#validity-proof) alla catena

### Rollup ottimistici {#optimistic-rollups}

I rollup ottimistici si collocano parallelamente alla catena principale di Ethereum sul livello 2. Possono apportare miglioramenti a livello di scalabilità perché non eseguono calcoli di default. Invece, dopo una transazione, propongono il nuovo stato alla rete principale o "autenticano" la transazione.

Con i rollup ottimistici, le transazioni sono scritte sulla catena principale di Ethereum come `calldata`, ottimizzandoli ulteriormente attraverso la riduzione del costo del carburante.

Siccome il calcolo è la parte lenta e costosa di Ethereum, i rollup ottimistici possono offrire miglioramenti a livello di scalabilità fino a 10-100x, a seconda della transazione. Questo numero aumenterà ancora di più con l'introduzione delle [shard chains](/upgrades/shard-chains), poiché saranno disponibili più dati se una transazione viene contestata.

#### Disputa di transazioni {#disputing-transactions}

I rollup ottimistici non calcolano la transazione, quindi occorre un meccanismo per assicurarsi che le transazioni siano legittime e non fraudolente. E qui entrano in gioco le prove di frode. Se qualcuno nota una transazione fraudolenta, il rollup esegue una prova di frode e avvia il calcolo della transazione utilizzando i dati di stato disponibili. Ciò significa che potresti avere tempi d'attesa maggiori per la conferma della transazione rispetto a un rollup ZK, poiché la transazione potrebbe essere contestata.

![Diagramma che mostra cosa succede quando avviene una transazione fraudolenta in un rollup ottimistico in Ethereum](./optimistic-rollups.png)

Il carburante che serve per eseguire il calcolo della prova di frode viene rimborsato. Ben Jones di Optimism descrive così il metodo in uso:

"_chiunque sia in grado di eseguire un'azione che qualcuno dovrà provare come fraudolenta per proteggere i propri fondi richiede l'invio di un'obbligazione. In pratica, si bloccano alcuni ETH con la dichiarazione "Giuro di dire la verità"... Se non dico la verità e la frode viene confermata, il denaro sparisce (slashing). Non solo viene eseguito lo slashing di parte del denaro, ma un'altra parte pagherà il carburante necessario per effettuare la prova di frode_"

Perciò puoi vedere gli incentivi: i partecipanti vengono penalizzati se realizzano una frode e rimborsati se invece ne dimostrano una.

#### Pro e contro {#optimistic-pros-and-cons}

| Pro                                                                                                                                               | Contro                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tutto quello si può fare con il livello 1 di Ethereum, si può fare anche con i rollup ottimistici, in quanto sono compatibili con EVM e Solidity. | Tempi di attesa lunghi per le transazioni sulla catena a causa di potenziali contestazioni di frodi. |
| Tutti i dati della transazione sono memorizzati sulla catena di livello 1, il che significa sicurezza e decentralizzazione.                       | Un operatore può influenzare l'ordine della transazione.                                             |

#### Una spiegazione visiva dei rollup ottimistici {#optimistic-video}

Guarda Finematics spiegare i rollup ottimistici:

<YouTube id="7pWxCklcNsU" start="263" />

#### Utilizzano gli optimistic rollup {#use-optimistic-rollups}

Esistono molteplici implementazioni dei rollup ottimistici che puoi integrare nelle tue dApp:

- [Arbitrum](https://arbitrum.io/)
- [Optimism](https://optimism.io/)
- [Boba](https://boba.network/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io/)

### Rollup a conoscenza zero (zero-knowledge) {#zk-rollups}

**I rollup a conoscenza zero (ZK-rollup)** impacchettano (o "arrotolano") centinaia di trasferimenti esterni alla catena e generano una prova crittografica, nota come SNARK (argomento di conoscenza succinto e non interattivo). Questa è nota come una prova di validità ed è pubblicata sul livello 1.

Gli smart contract del rollup ZK mantengono lo stato di tutti i trasferimenti sul livello 2 e questo stato è aggiornabile solo con una prova di validità. Ciò significa che i rollup ZK necessitano unicamente della prova di validità anziché di tutti i dati della transazione. Con un rollup ZK, convalidare un blocco è più rapido ed economico perché sono inclusi meno dati.

Con un rollup ZK non ci sono ritardi quando si spostano i fondi dal livello 2 al livello 1, poiché una prova di validità accettata dal contratto del rollup ZK ha già verificato i fondi.

Essendo sul livello 2, i rollup ZK sono ottimizzabili per ridurre ulteriormente le dimensioni della transazione. Ad esempio, un account è rappresentato da un indice anziché da un indirizzo, il che riduce la transazione da 32 byte a soli 4 byte. Le transazioni sono scritte in Ethereum anche come `calldata`, riducendo il carburante.

#### Pro e contro {#zk-pros-and-cons}

| Pro                                                                                                                                    | Contro                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tempo di finalità più veloce, poiché lo stato è verificato istantaneamente una volta che le prove sono inviate alla catena principale. | Alcuni non sono supportati dall'EVM.                                                                               |
| Non vulnerabile agli attacchi economici a cui i [rollup ottimistici](#optimistic-pros-and-cons) possono essere esposti.                | Le prove di validità sono ardue da calcolare, non ne vale la pena per applicazioni con poca attività sulla catena. |
| Sicuro e decentralizzato, dal momento che i dati necessari per recuperare lo stato sono sulla catena del layer 1.                      | Un operatore può influenzare l'ordine della transazione                                                            |

#### Una spiegazione visiva dei rollup ZK {#zk-video}

Guarda Finematics spiegare i rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

#### Usare i rollup ZK {#use-zk-rollups}

Esistono molteplici implementazioni dei rollup ZK che puoi integrare nelle tue dApp:

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Polygon Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

## Soluzioni ibride {#hybrid-solutions}

Esistono soluzioni ibride che combinano il meglio di varie tecnologie del layer 2 e possono offrire trade-off configurabili.

### Usare le soluzioni ibride {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Letture consigliate {#further-reading}

- [Una guida incompleta ai rollup](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Rollup ottimistici vs Rollup ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Scalabilità della blockchain a conoscenza zero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Perché rollup e shard di dati sono l'unica soluzione sostenibile per un'elevata scalabilità](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Rollup ZK basati su Ethereum: fuoriclasse a livello mondiale](https://hackmd.io/@canti/rkUT0BD8K)

**Rollup ZK**

- [Cosa sono i rollup a conoscenza zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub sui rollup ZK](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

**Rollup ottimistici**

- [Tutto ciò che devi sapere sul rollup ottimistico](https://research.paradigm.xyz/rollups)
- [EthHub sui rollup ottimistici](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [La guida essenziale ad Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Come funziona realmente il rollup ottimistico?](https://research.paradigm.xyz/optimism)
- [Immersione profonda nell'OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Soluzioni ibride**

- [Aggiungere la sidechain ibrida PoS-Rollup alla piattaforma coerente del livello 2 di Celer su Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Voliture: il meglio di tutti i mondi](https://polynya.medium.com/volitions-best-of-all-worlds-cfd313aec9a8)

**Video**

- [Rollup - La strategia di scalabilità definitiva di Ethereum?](https://youtu.be/7pWxCklcNsU)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
