---
title: Catene secondarie
description: Un'introduzione alle sidechain come soluzione di ridemensionamento attualmente utilizzato dalla community di Ethereum.
lang: it
sidebarDepth: 3
---

Una sidechain è una blockchain separata eseguita in modo indipendente da Ethereum ed è connessa alla Rete principale di Ethereum da un ponte bidirezionale. Le catene laterali possono avere parametri del blocco e [algoritmi di consenso](/developers/docs/consensus-mechanisms/) separati, che sono spesso progettati per un'elaborazione efficiente delle transazioni. Usare una sidechain comporta compromessi, però, poiché non eredita le proprietà di sicurezza di Ethereum. A differenza dalle [soluzioni di ridimensionamento di livello 2](/layer-2/), le catene laterali non ripubblicano i cambiamenti di stato e i dati delle transazioni sulla Mainnet di Ethereum.

Anche le catene laterali sacrificano una certa misura di decentralizzazione o sicurezza per raggiungere un volume elevato ([trilemma della scalabilità](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum, tuttavia, si impegna nel ridimensionamento senza compromettere la decentralizzazione e la sicurezza.

## Come funzionano le sidechain? {#how-do-sidechains-work}

Le sidechain sono blockchain indipendenti, con cronologie, tabelle di marcia di sviluppo e considerazioni di progettazione differenti. Sebbene una sidechain possa condividere alcune somiglianze a livello superficiale con Ethereum, ha diverse funzionalità distintive.

### Algoritmi di consenso {#consensus-algorithms}

Una delle qualità che rendono uniche le sidechain (ossia diverse da Ethereum), è l'algoritmo di consenso utilizzato. Le sidechain non si affidano a Ethereum per il consenso e possono scegliere protocolli di consenso alternativi adatti alle loro esigenze. Alcuni esempi di algoritmi di consenso usati sulle sidechain includono:

- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
- [Delegated Proof-of-Stake](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolleranza ai guasti bizantini](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Come Ethereum, le sidechain hanno nodi di convalida che verificano ed elaborano le transazioni, producono blocchi e memorizzano lo stato della blockchain. I validatori sono inoltre responsabili del mantenimento del consenso lungo la rete e della sua protezione da attacchi malevoli.

#### Parametri del blocco {#block-parameters}

Ethereum pone dei limiti ai [tempi del blocco](/developers/docs/blocks/#block-time) (cioè, il tempo impiegato per produrre nuovi blocchi) e alle [dimensioni del blocco](/developers/docs/blocks/#block-size) (cioè, la quantità di dati contenuti per blocco denominata in gas). Al contrario, le catene secondarie adottano spesso parametri differenti, come tempi del blocco ridotti e limiti di gas superiori, per ottenere un volume elevato, transazioni veloci e commissioni basse.

Sebbene ciò abbia alcuni vantaggi, comporta implicazioni critiche per la decentralizzazione e la sicurezza della rete. I parametri del blocco, come tempi di blocco veloci e grandi dimensioni del blocco, aumentano la difficoltà di eseguire un nodo completo, rendendo pochi "supernodi" responsabili della protezione della catena. In tale scenario, la possibilità di collusione del validatore o di un'acquisizione malevola della catena aumenta.

Perché le blockchain scalino senza danneggiare la decentralizzazione, l'esecuzione di un nodo deve essere aperta a tutti, non necessariamente alle parti con hardware specializzato. Per questo motivo si sta lavorando per garantire che tutti possano [eseguire un nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sulla rete Ethereum.

### Compatibilità con l'EVM {#evm-compatibility}

Alcune catene laterali sono compatibili con l'EVM e sono in grado di eseguire contratti sviluppati per la [macchina virtuale di Ethereum (EVM)](/developers/docs/evm/). Le catene laterali compatibili con l'EVM supportano gli [smart contract scritti in Solidity](/developers/docs/smart-contracts/languages/), nonché altri linguaggi per smart contract dell'EVM. Ciò significa che gli smart contract scritti per la Mainnet di Ethereum funzioneranno anche sulle catene laterali compatibili con l'EVM.

Ciò significa che se vuoi usare la tua [dApp](/developers/docs/dapps/) su una catena laterale, è solo questione di distribuire il tuo [smart contract](/developers/docs/smart-contracts/) su questa catena laterale. Assomiglia e funziona proprio come la Rete principale: scrivi i contratti in Solidity e interagisci con la catena tramite RPC della sidechain.

Poiché le catene laterali sono compatibili con l'EVM, sono considerate un'utile [soluzione di ridimensionamento](/developers/docs/scaling/) per le dApp native di Ethereum. Con la tua dapp su una catena secondaria, gli utenti possono godere di commissioni sul gas inferiori e transazioni più veloci, specialmente se la Rete Principale è congestionata.

Tuttavia, come spiegato precedentemente, usare una sidechain comporta compromessi significativi. Ogni sidechain è responsabile per la propria sicurezza e non eredita le proprietà di sicurezza di Ethereum. Questo aumenta la possibilità di comportamenti malevoli che possono influenzare i tuoi utenti o metterne a rischio i fondi.

### Movimento degli asset {#asset-movement}

Perché una blockchain separata diventi una sidechain alla Rete principale di Ethereum, deve avere la possibilità di facilitare il trasferimento di risorse da e verso la Rete principale di Ethereum. Questa interoperabilità con Ethereum è ottenuta usando un ponte della blockchain. I [ponti](/bridges/) usano smart contract distribuiti sulla Mainnet di Ethereum e su una catena laterale per controllare il trasferimento di fondi tra di esse.

Sebbene i ponti aiutino gli utenti a spostare fondi tra Ethereum e la sidechain, le risorse non vengono spostate fisicamente tra le due catene. Invece, i meccanismi che coinvolgono tipicamente la coniatura e la bruciatura sono usati per trasferire valore tra le catene. Maggiori informazioni su [come funzionano i ponti](/developers/docs/bridges/#how-do-bridges-work).

## Vantaggi e svantaggi delle catene laterali {#pros-and-cons-of-sidechains}

| Pro                                                                                                                                                                    | Contro                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La tecnologia sottostante le sidechain è consolidata e beneficia dell'ampia ricerca e dai miglioramenti nella progettazione.                           | Le sidechain rinunciano a una certa misura di decentralizzazione e assenza di fiducia in cambio della scalabilità.                                                        |
| Le sidechain supportano il calcolo generale e offrono compatibilità con l'EVM (possono eseguire dapp native di Ethereum).           | Una sidechainusa un meccanismo di consenso e non beneficia delle garanzie di sicurezza di Ethereum.                                                                       |
| Le sidechain usano modelli di consenso differenti per elaborare efficientemente le transazioni e ridurre le commissioni di transazione per gli utenti. | Le sidechain richiedono ipotesi di fiducia più elevata (ad es. un quorum di validatori malevoli della sidechain può commettere frode). |
| Le sidechain compatibili con l'EVM consentono alle dapp di espandere il proprio ecosistema.                                                            |                                                                                                                                                                                           |

### Utilizzare le catene laterali {#use-sidechains}

Diversi progetti forniscono implementazioni di sidechain che puoi integrare nelle tue dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (precedentemente xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Letture consigliate {#further-reading}

- [Scalare le dApp di Ethereum tramite catene laterali](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 febbraio 2018 - Georgios Konstantopoulos_

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
