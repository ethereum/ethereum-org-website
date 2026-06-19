---
title: Sidechain
description: Un'introduzione alle sidechain come soluzione di ridimensionamento attualmente utilizzata dalla community di Ethereum.
lang: it
sidebarDepth: 3
---

Una sidechain è una blockchain separata che viene eseguita in modo indipendente da [Ethereum](/) ed è connessa alla Mainnet di Ethereum tramite un ponte bidirezionale. Le sidechain possono avere parametri del blocco e [algoritmi di consenso](/developers/docs/consensus-mechanisms/) separati, che sono spesso progettati per un'elaborazione efficiente delle transazioni. L'utilizzo di una sidechain comporta tuttavia dei compromessi, poiché non ereditano le proprietà di sicurezza di Ethereum. A differenza delle [soluzioni di ridimensionamento di layer 2 (l2)](/layer-2/), le sidechain non pubblicano le modifiche di stato e i dati delle transazioni sulla Mainnet di Ethereum.

Le sidechain sacrificano anche una certa misura di decentralizzazione o sicurezza per ottenere un'elevata capacità transazionale ([trilemma della scalabilità](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum è, tuttavia, impegnato a scalare senza compromettere la decentralizzazione e la sicurezza.

## Come funzionano le sidechain? {#how-do-sidechains-work}

Le sidechain sono blockchain indipendenti, con storie, roadmap di sviluppo e considerazioni di progettazione diverse. Sebbene una sidechain possa condividere alcune somiglianze superficiali con Ethereum, presenta diverse caratteristiche distintive.

### Algoritmi di consenso {#consensus-algorithms}

Una delle qualità che rendono uniche le sidechain (cioè diverse da Ethereum) è l'algoritmo di consenso utilizzato. Le sidechain non si affidano a Ethereum per il consenso e possono scegliere protocolli di consenso alternativi che si adattano alle loro esigenze. Alcuni esempi di algoritmi di consenso utilizzati sulle sidechain includono:

- [Prova di autorità (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Proof-of-Stake delegata](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolleranza ai guasti bizantina](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Come Ethereum, le sidechain hanno nodi di validazione che verificano ed elaborano le transazioni, producono blocchi e memorizzano lo stato della blockchain. I validatori sono anche responsabili del mantenimento del consenso in tutta la rete e della sua protezione da attacchi dannosi.

#### Parametri del blocco {#block-parameters}

Ethereum pone dei limiti ai [tempi del blocco](/developers/docs/blocks/#block-time) (cioè il tempo necessario per produrre nuovi blocchi) e alle [dimensioni del blocco](/developers/docs/blocks/#block-size) (cioè la quantità di dati contenuti per blocco denominata in gas). Al contrario, le sidechain adottano spesso parametri diversi, come tempi del blocco più rapidi e limiti di gas più elevati, per ottenere un'elevata capacità transazionale, transazioni veloci e commissioni basse.

Sebbene ciò abbia alcuni vantaggi, ha implicazioni critiche per la decentralizzazione e la sicurezza della rete. I parametri del blocco, come tempi del blocco rapidi e grandi dimensioni del blocco, aumentano la difficoltà di eseguire un nodo completo, lasciando a pochi "supernodi" la responsabilità di proteggere la catena. In un simile scenario, aumenta la possibilità di collusione tra i validatori o di un'acquisizione dannosa della catena.

Affinché le blockchain possano scalare senza danneggiare la decentralizzazione, l'esecuzione di un nodo deve essere aperta a tutti, non necessariamente a parti con hardware specializzato. Questo è il motivo per cui sono in corso sforzi per garantire che tutti possano [eseguire un nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sulla rete Ethereum.

### Compatibilità con l'EVM {#evm-compatibility}

Alcune sidechain sono compatibili con l'EVM e sono in grado di eseguire contratti sviluppati per la [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Le sidechain compatibili con l'EVM supportano gli smart contract [scritti in Solidity](/developers/docs/smart-contracts/languages/), così come altri linguaggi per smart contract dell'EVM, il che significa che gli smart contract scritti per la Mainnet di Ethereum funzioneranno anche sulle sidechain compatibili con l'EVM.

Ciò significa che se desideri utilizzare la tua [applicazione decentralizzata (dapp)](/developers/docs/dapps/) su una sidechain, è solo questione di distribuire il tuo [smart contract](/developers/docs/smart-contracts/) su questa sidechain. Ha l'aspetto, la sensazione e si comporta proprio come la Mainnet: scrivi contratti in Solidity e interagisci con la catena tramite l'RPC della sidechain.

Poiché le sidechain sono compatibili con l'EVM, sono considerate un'utile [soluzione di ridimensionamento](/developers/docs/scaling/) per le dapp native di Ethereum. Con la tua dapp su una sidechain, gli utenti possono usufruire di commissioni del gas inferiori e transazioni più veloci, specialmente se la Mainnet è congestionata.

Tuttavia, come spiegato in precedenza, l'utilizzo di una sidechain comporta compromessi significativi. Ogni sidechain è responsabile della propria sicurezza e non eredita le proprietà di sicurezza di Ethereum. Ciò aumenta la possibilità di comportamenti dannosi che possono colpire i tuoi utenti o mettere a rischio i loro fondi.

### Movimento degli asset {#asset-movement}

Affinché una blockchain separata diventi una sidechain della Mainnet di Ethereum, deve avere la capacità di facilitare il trasferimento di asset da e verso la Mainnet di Ethereum. Questa interoperabilità con Ethereum si ottiene utilizzando un ponte tra blockchain. I [ponti](/bridges/) utilizzano smart contract distribuiti sulla Mainnet di Ethereum e su una sidechain per controllare il passaggio di fondi tra di loro.

Sebbene i ponti aiutino gli utenti a spostare fondi tra Ethereum e la sidechain, gli asset non vengono spostati fisicamente attraverso le due catene. Invece, per trasferire valore tra le catene vengono utilizzati meccanismi che in genere comportano il conio e il bruciare. Maggiori informazioni su [come funzionano i ponti](/developers/docs/bridges/#how-do-bridges-work).

## Pro e contro delle sidechain {#pros-and-cons-of-sidechains}

| Pro                                                                                                                         | Contro                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| La tecnologia alla base delle sidechain è ben consolidata e beneficia di ricerche approfondite e miglioramenti nella progettazione. | Le sidechain scambiano una certa misura di decentralizzazione e assenza di necessità di fiducia per la scalabilità.                          |
| Le sidechain supportano il calcolo generale e offrono compatibilità con l'EVM (possono eseguire dapp native di Ethereum).                    | Una sidechain utilizza un meccanismo di consenso separato e non beneficia delle garanzie di sicurezza di Ethereum.         |
| Le sidechain utilizzano modelli di consenso diversi per elaborare in modo efficiente le transazioni e ridurre le commissioni di transazione per gli utenti.         | Le sidechain richiedono assunzioni di fiducia più elevate (ad es., un quorum di validatori di sidechain malintenzionati può commettere frodi). |
| Le sidechain compatibili con l'EVM consentono alle dapp di espandere il proprio ecosistema.                                                            |                                                                                                                  |

### Utilizzare le sidechain {#use-sidechains}

Diversi progetti forniscono implementazioni di sidechain che puoi integrare nelle tue dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (in precedenza xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Letture consigliate {#further-reading}

- [Scalare le dapp di Ethereum tramite le sidechain](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 feb 2018 - Georgios Konstantopoulos_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_