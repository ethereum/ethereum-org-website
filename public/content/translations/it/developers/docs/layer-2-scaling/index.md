---
title: Passaggio al livello 2
description: Introduzione alle diverse opzioni di crescita attualmente in fase di sviluppo da parte della community Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
isOutdated: true
---

Livello 2 è un termine collettivo per indicare soluzioni progettate per aiutare un'applicazione a gestire transazioni al di fuori della catena Ethereum principale (livello 1). La velocità delle transazioni ne risente quando la rete è molto carica, e l'esperienza utente può risultare poco piacevole per alcuni tipi di dapp. Man mano che la rete diventa più congestionata, il prezzo del carburante sale perché i mittenti delle transazioni mirano a superarsi a vicenda. Questo può rendere l'utilizzo di Ethereum parecchio dispendioso.

## Prerequisiti {#prerequisites}

Dovresti avere una buona conoscenza di tutti gli argomenti fondamentali. L'implementazione di soluzioni di livello 2 è in corso perché la tecnologia è meno collaudata.

## Perché serve il livello 2? {#why-is-layer-2-needed}

- Alcuni casi di utilizzo, come i giochi su blockchain, non hanno senso con gli attuali tempi di transazione
- Può essere inutilmente costoso utilizzare applicazioni blockchain
- Ogni aggiornamento per la scalabilità non deve essere fatto a scapito della decentralizzazione della sicurezza. Il livello 2 si basa su Ethereum.

## Tipi di soluzioni di livello 2 {#types}

- [Rollup](#rollups)
  - [ZK Rollup](#zk-rollups)
  - [Optimistic rollup](#optimistic-rollups)
- [State channels](#channels)
- [Plasma](#plasma)
- [Validium](#validium)
- [Sidechain](#sidechains)
- [Soluzioni ibride](#hybrid-solutions)

La maggior parte delle soluzioni di livello 2 è incentrata su un server o su un cluster di server, ognuno dei quali può essere denominato nodo, validatore, operatore, sequenziatore, block producer o simile. A seconda dell'implementazione, questi nodi di livello 2 possono essere gestiti da aziende, dalle entità che li usano, da operatori terzi o da un grande gruppo di individui (similmente alla rete principale). Parlando in generale, le transazioni sono inviate a questi nodi di livello 2 anziché essere sottoposte direttamente al livello 1 ([rete principale](/glossary/#mainnet)); l'istanza di livello 2 raggruppa poi i blocchi prima di ancorarli al livello 1. In seguito vengono confermati al livello 1 e non possono essere alterati. I dettagli dell'esecuzione vera e propria variano notevolmente tra le varie tecnologie e implementazioni di livello 2.

Un'istanza specifica di livello 2 può essere aperta e condivisa da molte applicazioni o può essere distribuita da un'azienda e dedicata esclusivamente al supporto della sua applicazione.

## Rollup {#rollups}

I rollup sono soluzioni che raggruppano (o "fanno roll up") transazioni sidechain in una singola transazione e generano una prova crittografica, detta SNARK (succinct non-interactive argument of knowledge). Soltanto questa prova viene salvata nella catena principale.

_Le sidechain sono blockchain indipendenti e compatibili con Ethereum._

In altre parole, i rollup significano che lo stato e l'esecuzione sono gestiti nelle sidechain: verifica delle firme, esecuzione del contratto ecc. La catena principale di Ethereum (livello 1) memorizza solo i dati delle transazioni.

Le soluzioni di rollup richiedono relayer che abbiano fatto staking con una partecipazione nel contratto di rollup. Questo li incentiva a trasmettere i rollup con precisione.

**Utile per:**

- ridurre le commissioni per gli utenti
- partecipazione aperta
- maggiori volumi delle transazioni e maggiore rapidità

Ci sono due tipi di rollup che diversi modelli di sicurezza:

- Zero knowledge: esegue il calcolo esternamente alla catena e invia una [**prova di validità**](/glossary/#validity-proof) alla catena
- Optimistic: presume che le transazioni siano valide di default ed esegue il calcolo, attraverso una [**prova di frode**](/glossary/#fraud-proof), solo in caso di contestazione

### Rollup di tipo zero knowledge {#zk-rollups}

I rollup di tipo zero knowledge, detti anche ZK-Rollup, raggruppano centinaia di trasferimenti esternamente alla catena in una sola transazione tramite uno Smart Contract. Dai dati inviati, lo Smart Contract può verificare tutti i trasferimenti inclusi. Questa è detta prova di validità.

Con uno ZK rollup, convalidare un blocco è più veloce ed economico perché sono inclusi meno dati. Per convalidare una transazione, non servono tutti i dati relativi, ma solo la prova.

La sidechain dove si verificano gli ZK rollup può essere ottimizzata per ridurre ulteriormente le dimensioni delle transazioni. Ad esempio, un account è rappresentato da un indice anziché da un indirizzo, riducendo la transazione da 32 byte a soli 4 byte. Le transazioni inoltre sono scritte su Ethereum come dati di chiamata, riducendo così il carburante.

#### Pro e contro {#zk-pros-and-cons}

| Pro                                                                                                       | Contro                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nessun ritardo perché le prove sono già considerate valide quando vengono inviate alla catena principale. | Limitato a trasferimenti semplici, non compatibile con l'EVM.                                                                                                                                                                              |
| Meno vulnerabile ad attacchi economici rispetto agli [Optimistic rollup](#optimistic-pros-and-cons).      | Le prove di validità sono ardue da calcolare, non ne vale la pena per applicazioni con poca attività sulla catena.                                                                                                                         |
|                                                                                                           | Tempo di [finalità](/glossary/#finality) soggettivo piu' lento (10-30 min per generare una prova ZK) (ma più veloce rispetto a finalità piena, perché non ci sono ritardi di disputa come negli [optimistic rollup](#optimistic-rollups)). |

#### Utilizzano i rollup ZK {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Optimistic rollups {#optimistic-rollups}

Gli optimistic rollup usano una sidechain parallela alla catena principale di Ethereum. Possono apportare miglioramenti alla scalabilità perché non eseguono calcoli di default. Al contrario, dopo una transazione, propongono il nuovo stato alla rete principale. Oppure "notarizzano" la transazione.

Con gli optimistic rollup, le transazioni sono scritte nella catena principale Ethereum come dati di chiamata, ottimizzando ulteriormente le transazioni in quanto costo del carburante risulta ridotto.

Siccome il calcolo è la parte lenta e costosa di Ethereum, gli optimistic rollup possono offrire miglioramenti alla scalabilità pari a 10-100x, a seconda della transazione. Il numero aumenterà ancora di più con l'introduzione delle [shard chain](/roadmap/danksharding), con l'upgrade a Eth2. Ci saranno infatti ancora più dati disponibili nel caso di contestazione di una transazione.

#### Disputa di transazioni {#disputing-transactions}

Gli optimistic rollup non calcolano veramente la transazione, quindi c'è bisogno di un meccanismo che assicuri che le transazioni siano legittime e non fraudolente. E qui entrano in gioco le prove di frode. Se qualcuno nota una transazione fraudolenta, il rollup esegue una prova di frode e avvia il calcolo della transazione utilizzando i dati di stato disponibili. Questo significa che potrebbero verificarsi attese più lunghe per la conferma della transazione rispetto a un rollup ZK, perché la transazione potrebbe essere contestata.

![Diagramma che mostra cosa succede quando avviene una transazione fraudolenta in un optimistic rollup in Ethereum](./optimistic-rollups.png)

Il carburante che serve per eseguire il calcolo della prova di frode viene rimborsato. Ben Jones di Optimism descrive così il metodo in uso:

"_chiunque sia in grado di eseguire un'azione che qualcuno dovrà provare come fraudolenta per proteggere i propri fondi richiede l'invio di un'obbligazione. In pratica, si bloccano alcuni ETH con la dichiarazione "Giuro di dire la verità"... Se non dico la verità e la frode viene confermata, il denaro sparisce (slashing). Non solo viene eseguito lo slashing di parte del denaro, ma un'altra parte pagherà il carburante necessario per effettuare la prova di frode_"

Quindi si viene rimborsati per aver provato la frode.

#### Pro e contro {#optimistic-pros-and-cons}

| Pro                                                                                                                                            | Contro                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Tutto quello si può fare con il livello 1 di Ethereum, si può fare anche con gli optimistic rollup perché sono compatibili con EVM e Solidity. | Tempi di attesa lunghi per le transazioni sulla catena a causa di potenziali contestazioni di frode.                                |
| Tutti i dati della transazione sono memorizzati sulla catena di livello 1, il che significa sicurezza e decentralizzazione.                    | Potenzialmente vulnerabile agli attacchi se il valore di un optimistic rollup supera la quantità dell'obbligazione di un operatore. |

#### Utilizzano gli optimistic rollup {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)

## Canali {#channels}

I canali consentono ai partecipanti di negoziare `x` volte esternamente alla catena inviando poi solo due transazioni alla rete sulla catena. Questo consente volumi di transazioni estremamente elevati

**Utile per**:

- molti aggiornamenti di stato
- situazioni in cui il numero di partecipanti è noto in anticipo
- situazioni in cui i partecipanti sono sempre disponibili

I partecipanti devono bloccare una parte dello stato di Ethereum, come ad esempio un deposito ETH, in un contratto multisig. Un contratto multisig è un tipo di contratto che richiede le firme (e quindi l'accordo) di chiavi private multiple per poter essere eseguito.

Il blocco dello stato in questo modo è la prima transazione e apre il canale. I partecipanti possono poi eseguire transazioni esternamente alla catena, rapidamente e liberamente. Quando l'interazione è terminata, viene inviata sulla catena una transazione finale, sbloccando lo stato.

### Canali di stato {#state-channels}

Canale di stato Tris:

1. Viene creato uno Smart Contract multisig "Giudice" sulla catena principale Ethereum, che conosce le regole del Tris e può identificare Alice e Bob come due giocatori della partita. Questo contratto contiene un premio di 1 ETH.

2. In seguito, Alice e Bob iniziano a giocare, aprendo il canale di stato. Ogni mossa crea una transazione esternamente alla catena che contiene un "nonce". Significa semplicemente che potremo sempre vedere in seguito in quale ordine sono state eseguite le mosse.

3. Quando c'è un vincitore, viene chiuso il canale inviando lo stato finale (ad esempio la lista delle transazioni) al contratto Giudice, pagando una sola commissione per la transazione. Il Giudice si assicura che lo stato finale sia firmato da entrambe le parti, e aspetta il tempo necessario per assicurarsi che nessuno possa legittimamente contestare il risultato, quindi paga il premio di 1 ETH ad Alice.

Al momento esistono due tipi di canale:

- Canali di stato: come descritto sopra
- Canali di pagamento: canali di stato semplificati che si occupano solo di pagamenti. Consentono trasferimenti esternamente alla catena tra due partecipanti, purché la somma netta dei trasferimenti non superi i token depositati.

#### Pro e contro {#channels-pros-and-cons}

| Pro                                                                                                 | Contro                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prelievo/regolamento istantaneo sulla rete principale (se entrambe le parti di un canale cooperano) | Tempi e costi necessari per configurare un canale. Non adatto per transazioni occasionali esternamente alla catena tra utenti arbitrari.                  |
| Volumi estremamente elevati                                                                         | Necessità di monitorare la rete periodicamente (requisito di liveness) o delegare la responsabilità a qualcun altro per garantire la sicurezza dei fondi. |
| Costi per transazione più bassi in assoluto. Ottimo per flussi di micropagamenti                    | Necessità di bloccare fondi nei canali di pagamento aperti                                                                                                |
|                                                                                                     | Non supporta la partecipazione aperta                                                                                                                     |

#### Usano i canali di stato {#use-state-channels}

- [Connext](https://connext.network/)
- [Raiden](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## Plasma {#plasma}

Una catena Plasma è una blockchain separata, collegata alla catena principale Ethereum e usa le prove di frode (come gli [optimistic rollup](#optimistic-rollups)) per arbitrare le dispute.

| Pro                                                                                                                          | Contro                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Volumi elevati, basso costo per transazione.                                                                                 | Non supporta il calcolo generale. Solo trasferimenti di base di token, scambi e pochi altri tipi di transazione sono supportati tramite logica dei predicati.                                       |
| Ottima per transazioni tra utenti arbitrari (non c'è sovraccarico per coppia di utenti se entrambi sono sulla catena plasma) | Necessità di monitorare la rete periodicamente (requisito di liveness) o delegare la responsabilità a qualcun altro per garantire la sicurezza dei fondi.                                           |
|                                                                                                                              | Fa affidamento ad uno o più operatori per archiviare i dati e servirli su richiesta.                                                                                                                |
|                                                                                                                              | I prelievi sono ritardati di diversi giorni per permettere contestazioni. Per risorse fungibili, questo può essere mitigato da provider di liquidità, ma c'è sempre associato un costo di capitale. |

### Usano Plasma {#use-plasma}

- [OMG Network](https://omg.network/)
- [Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Usa prove di validità come [ZK-rollup](#zk-rollups) ma i dati non sono archiviati al livello 1 della catena di Ethereum. Questo può portare a 10.000 transazioni al secondo per catena validium, e più catene possono essere eseguite in parallelo.

| Pro                                                                                                                                  | Contro                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nessun ritardo di prelievo (non c'è latenza per transazioni sulla catena e tra catene); conseguente maggior efficienza del capitale. | Supporto limitato del calcolo generale/Smart Contract, necessari linguaggi specifici.                                                                                  |
| Non vulnerabile a certi tipi di attacchi economici subiti da sistemi basati su prove di frode in applicazioni ad alto valore.        | Necessità di un'elevata potenza di calcolo per generare le prove ZK; non conveniente per applicazioni con bassi volumi.                                                |
|                                                                                                                                      | Tempo di finalità più limitato (10-30 minuti per generare una prova ZK) (ma più veloce per finalità completa perché non c'è ritardo dovuto ai tempi di contestazione). |

### Usano Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Sidechain {#sidechains}

Una sidechain è una blockchain separata che viene eseguita parallelamente alla rete principale e opera indipendentemente. Ha un proprio algoritmo di consenso ([Proof of Authority](https://wikipedia.org/wiki/Proof_of_authority), [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained) e così via). È collegata alla catena principale da un bridge bidirezionale.

| Pro                                                    | Contro                                                                                                    |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Tecnologia consolidata.                                | Meno decentralizzata.                                                                                     |
| Supporta il calcolo generale, compatibilità con l'EVM. | Usa un meccanismo di consenso separato. Non protetta dal livello 1 (quindi tecnicamente non è livello 2). |
|                                                        | Un quorum di validatori sidechain può commettere frodi.                                                   |

### Usano sidechain {#use-sidechains}

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)

## Soluzioni ibride {#hybrid-solutions}

Combinano le parti migliori di diverse tecnologie di livello 2 e possono offrire compromessi configurabili.

### Usano soluzioni Ibride {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Letture consigliate {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://blog.matter-labs.io/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Canali di stato**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canali di pagamento**

**ZK rollup**

**Optimistic rollup**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Sidechain**

- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
