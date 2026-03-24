---
title: Catene laterali
description: "Un'introduzione alle catene laterali come soluzione di scalabilità attualmente utilizzata dalla community di Ethereum."
lang: it
sidebarDepth: 3
---

Una catena laterale è una blockchain separata che viene eseguita in modo indipendente da [Ethereum](/) ed è connessa alla rete principale di Ethereum tramite un ponte bidirezionale. Le catene laterali possono avere parametri del blocco e [algoritmi di consenso](/developers/docs/consensus-mechanisms/) separati, che sono spesso progettati per un'elaborazione efficiente delle transazioni. L'utilizzo di una catena laterale comporta tuttavia dei compromessi, poiché non ereditano le proprietà di sicurezza di Ethereum. A differenza delle [soluzioni di scalabilità di livello 2](/layer-2/), le catene laterali non inviano le modifiche di stato e i dati delle transazioni alla rete principale di Ethereum.

Le catene laterali sacrificano anche una certa misura di decentralizzazione o sicurezza per ottenere un'elevata produttività ([trilemma della scalabilità](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum è, tuttavia, impegnato nella scalabilità senza compromettere la decentralizzazione e la sicurezza.

## Come funzionano le catene laterali? {#how-do-sidechains-work}

Le catene laterali sono blockchain indipendenti, con storie, piani d'azione di sviluppo e considerazioni di progettazione differenti. Sebbene una catena laterale possa condividere alcune somiglianze superficiali con Ethereum, presenta diverse caratteristiche distintive.

### Algoritmi di consenso {#consensus-algorithms}

Una delle qualità che rendono uniche le catene laterali (cioè diverse da Ethereum) è l'algoritmo di consenso utilizzato. Le catene laterali non si affidano a Ethereum per il consenso e possono scegliere protocolli di consenso alternativi che si adattano alle loro esigenze. Alcuni esempi di algoritmi di consenso utilizzati sulle catene laterali includono:

- [Prova di autorità (Proof-of-authority)](/developers/docs/consensus-mechanisms/poa/)
- [Prova di stake delegata (Delegated proof-of-stake)](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolleranza ai guasti bizantina (Byzantine fault tolerance)](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Come Ethereum, le catene laterali hanno nodi di convalida che verificano ed elaborano le transazioni, producono blocchi e memorizzano lo stato della blockchain. I validatori sono anche responsabili del mantenimento del consenso in tutta la rete e della sua protezione da attacchi dannosi.

#### Parametri del blocco {#block-parameters}

Ethereum pone dei limiti ai [tempi del blocco](/developers/docs/blocks/#block-time) (cioè il tempo necessario per produrre nuovi blocchi) e alle [dimensioni del blocco](/developers/docs/blocks/#block-size) (cioè la quantità di dati contenuti per blocco denominata in gas). Al contrario, le catene laterali adottano spesso parametri diversi, come tempi del blocco più rapidi e limiti del gas più elevati, per ottenere un'elevata produttività, transazioni veloci e commissioni basse.

Sebbene ciò abbia alcuni vantaggi, ha implicazioni critiche per la decentralizzazione e la sicurezza della rete. I parametri del blocco, come tempi del blocco rapidi e grandi dimensioni del blocco, aumentano la difficoltà di eseguire un nodo completo, lasciando a pochi "supernodi" la responsabilità di proteggere la catena. In un simile scenario, aumenta la possibilità di collusione dei validatori o di un'acquisizione dannosa della catena.

Affinché le blockchain possano scalare senza danneggiare la decentralizzazione, l'esecuzione di un nodo deve essere aperta a tutti, non necessariamente a parti con hardware specializzato. Questo è il motivo per cui sono in corso sforzi per garantire che tutti possano [eseguire un nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sulla rete di Ethereum.

### Compatibilità con l'EVM {#evm-compatibility}

Alcune catene laterali sono compatibili con l'EVM e sono in grado di eseguire contratti sviluppati per la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/). Le catene laterali compatibili con l'EVM supportano i contratti intelligenti [scritti in Solidity](/developers/docs/smart-contracts/languages/), così come altri linguaggi per contratti intelligenti dell'EVM, il che significa che i contratti intelligenti scritti per la rete principale di Ethereum funzioneranno anche sulle catene laterali compatibili con l'EVM.

Questo significa che se vuoi usare la tua [dApp](/developers/docs/dapps/) su una catena laterale, è solo questione di distribuire il tuo [contratto intelligente](/developers/docs/smart-contracts/) su questa catena laterale. Ha l'aspetto, la sensazione e si comporta proprio come la rete principale: scrivi contratti in Solidity e interagisci con la catena tramite l'RPC delle catene laterali.

Poiché le catene laterali sono compatibili con l'EVM, sono considerate un'utile [soluzione di scalabilità](/developers/docs/scaling/) per le dApp native di Ethereum. Con la tua dApp su una catena laterale, gli utenti possono godere di commissioni più basse e transazioni più veloci, specialmente se la rete principale è congestionata.

Tuttavia, come spiegato in precedenza, l'utilizzo di una catena laterale comporta compromessi significativi. Ogni catena laterale è responsabile della propria sicurezza e non eredita le proprietà di sicurezza di Ethereum. Ciò aumenta la possibilità di comportamenti dannosi che possono colpire i tuoi utenti o mettere a rischio i loro fondi.

### Movimento degli asset {#asset-movement}

Affinché una blockchain separata diventi una catena laterale della rete principale di Ethereum, deve avere la capacità di facilitare il trasferimento di asset da e verso la rete principale di Ethereum. Questa interoperabilità con Ethereum si ottiene utilizzando un ponte tra blockchain. I [ponti](/bridges/) utilizzano contratti intelligenti distribuiti sulla rete principale di Ethereum e su una catena laterale per controllare il passaggio di fondi tra di loro.

Sebbene i ponti aiutino gli utenti a spostare fondi tra Ethereum e la catena laterale, gli asset non vengono spostati fisicamente attraverso le due catene. Invece, per trasferire valore tra le catene vengono utilizzati meccanismi che in genere comportano il coniare e il bruciare. Maggiori informazioni su [come funzionano i ponti](/developers/docs/bridges/#how-do-bridges-work).

## Pro e contro delle catene laterali {#pros-and-cons-of-sidechains}

| Pro                                                                                                                                                         | Contro                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| La tecnologia alla base delle catene laterali è ben consolidata e beneficia di ricerche approfondite e miglioramenti nella progettazione.                   | Le catene laterali scambiano una certa misura di decentralizzazione e assenza di fiducia (trustlessness) per la scalabilità.                     |
| Le catene laterali supportano il calcolo generale e offrono compatibilità con l'EVM (possono eseguire dApp native di Ethereum).                             | Una catena laterale utilizza un meccanismo di consenso separato e non beneficia delle garanzie di sicurezza di Ethereum.                         |
| Le catene laterali utilizzano modelli di consenso diversi per elaborare in modo efficiente le transazioni e ridurre le commissioni della transazione per gli utenti. | Le catene laterali richiedono maggiori presupposti di fiducia (ad es., un quorum di validatori di catene laterali malintenzionati può commettere frodi). |
| Le catene laterali compatibili con l'EVM consentono alle dApp di espandere il proprio ecosistema.                                                           |                                                                                                                                                  |

### Usare le catene laterali {#use-sidechains}

Diversi progetti forniscono implementazioni di catene laterali che puoi integrare nelle tue dApp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (precedentemente xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Letture consigliate {#further-reading}

- [Scaling Ethereum dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 febbraio 2018 - Georgios Konstantopoulos_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_