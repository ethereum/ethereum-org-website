---
title: Sidechain
description: Un'introduzione alle sidechain come soluzione di ridemensionamento attualmente utilizzato dalla community di Ethereum.
lang: it
sidebarDepth: 3
---

Una sidechain è una blockchain separata eseguita in modo indipendente da Ethereum ed è connessa alla Rete principale di Ethereum da un ponte bidirezionale. Le sidechain possono avere parametri del blocco e [algoritmi di consenso](/developers/docs/consensus-mechanisms/) separati, spesso progettati per l'elaborazione efficiente delle transazioni. Usare una sidechain comporta compromessi, però, poiché non eredita le proprietà di sicurezza di Ethereum. A differenza dalle [soluzioni di ridimensionamento del livello 2](/layer-2/), le sidechain non ri-pubblicano i cambiamenti di stato e i dati della transazione nella Rete principale di Ethereum.

Inoltre, le sidechain sacrificano alcune misure di decentralizzazione o di sicurezza per ottenere un volume elevato ([trilemma di scalabilità](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Tuttavia, Ethereum, si impegna nel ridimensionamento senza compromettere la decentralizzazione e la sicurezza come definito nella [dichiarazione della vision](/roadmap/vision/) per gli aggiornamenti.

## Come funzionano le sidechain? {#how-do-sidechains-work}

Le sidechain sono blockchain indipendenti, con cronologie, tabelle di marcia di sviluppo e considerazioni di progettazione differenti. Sebbene una sidechain possa condividere alcune somiglianze a livello superficiale con Ethereum, ha diverse funzionalità distintive.

### Algoritmi di consenso {#consensus-algorithms}

Una delle qualità che rendono uniche le sidechain (ossia diverse da Ethereum), è l'algoritmo di consenso utilizzato. Le sidechain non si affidano a Ethereum per il consenso e possono scegliere protocolli di consenso alternativi adatti alle loro esigenze. Alcuni esempi di algoritmi di consenso usati sulle sidechain includono:

- [Proof of Authority](/developers/docs/consensus-mechanisms/poa/)
- [proof-of-stake delegato](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolleranza ai guasti bizantini](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Come Ethereum, le sidechain hanno nodi di convalida che verificano ed elaborano le transazioni, producono blocchi e memorizzano lo stato della blockchain. I validatori sono inoltre responsabili del mantenimento del consenso lungo la rete e della sua protezione da attacchi malevoli.

#### Parametri del blocco {#block-parameters}

Ethereum pone dei limiti ai [tempi del blocco](/developers/docs/blocks/#block-time) (cioè, il tempo impiegato per produrre nuovi blocchi) e alle [dimensioni del blocco](/developers/docs/blocks/#block-size) (cioè, la quantità di dati contenuti per blocco denominata in gas). Al contrario, le catene secondarie adottano spesso parametri differenti, come tempi del blocco ridotti e limiti di gas superiori, per ottenere un volume elevato, transazioni veloci e commissioni basse.

Sebbene ciò abbia alcuni vantaggi, comporta implicazioni critiche per la decentralizzazione e la sicurezza della rete. I parametri del blocco, come tempi di blocco veloci e grandi dimensioni del blocco, aumentano la difficoltà di eseguire un nodo completo, rendendo pochi "supernodi" responsabili della protezione della catena. In tale scenario, la possibilità di collusione del validatore o di un'acquisizione malevola della catena aumenta.

Perché le blockchain scalino senza danneggiare la decentralizzazione, l'esecuzione di un nodo deve essere aperta a tutti, non necessariamente alle parti con hardware specializzato. Ecco perché sono in corso sforzi per assicurarsi che tutti possano [eseguire un nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) sulla rete Ethereum.

### Compatibilità con l'EVM {#evm-compatibility}

Alcune sidechain sono compatibili con l'EVM e possono eseguire i contratti sviluppati per la [Macchina Virtuale di Ethereum (EVM)](/developers/docs/evm/). Le catene secondarie compatibili con l'EVM supportano i contratti intelligenti [scritti in Solidity](/developers/docs/smart-contracts/languages/), nonché altri linguaggi di contratti intelligenti dell'EVM, il che significa che i contratti intelligenti scritti per la Mainnet di Ethereum funzioneranno anche sulle catene secondarie compatibili con l'EVM.

Questo significa che se vuoi usare la tua [dapp](/developers/docs/dapps/) su una catena secondaria, devi solo distribuire il tuo [contratto intelligente](/developers/docs/smart-contracts/) a tale catena secondaria. Assomiglia e funziona proprio come la Rete principale: scrivi i contratti in Solidity e interagisci con la catena tramite RPC della sidechain.

Poiché le sidechain sono compatibili con l'EVM, sono considerate un'utile [soluzione di ridimensionamento](/developers/docs/scaling/) per le dapp native di Ethereum. Con la tua dapp su una catena secondaria, gli utenti possono godere di commissioni sul gas inferiori e transazioni più veloci, specialmente se la Rete Principale è congestionata.

Tuttavia, come spiegato precedentemente, usare una sidechain comporta compromessi significativi. Ogni sidechain è responsabile per la propria sicurezza e non eredita le proprietà di sicurezza di Ethereum. Questo aumenta la possibilità di comportamenti malevoli che possono influenzare i tuoi utenti o metterne a rischio i fondi.

### Spostamento di risorse {#asset-movement}

Perché una blockchain separata diventi una sidechain alla Rete principale di Ethereum, deve avere la possibilità di facilitare il trasferimento di risorse da e verso la Rete principale di Ethereum. Questa interoperabilità con Ethereum è ottenuta usando un ponte della blockchain. I [ponti](/bridges/) usano i contratti intelligenti distribuiti sulla Rete Principale di Ethereum e su una catena secondaria per controllare il collegamento dei fondi tra di essi.

Sebbene i ponti aiutino gli utenti a spostare fondi tra Ethereum e la sidechain, le risorse non vengono spostate fisicamente tra le due catene. Invece, i meccanismi che coinvolgono tipicamente la coniatura e la bruciatura sono usati per trasferire valore tra le catene. Maggiori informazioni su [come funzionano i ponti](/developers/docs/bridges/#how-do-bridges-work).

## Pro e contro delle sidechain {#pros-and-cons-of-sidechains}

| Pro                                                                                                                                                    | Contro                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| La tecnologia sottostante le sidechain è consolidata e beneficia dell'ampia ricerca e dai miglioramenti nella progettazione.                           | Le sidechain rinunciano a una certa misura di decentralizzazione e assenza di fiducia in cambio della scalabilità.                     |
| Le sidechain supportano il calcolo generale e offrono compatibilità con l'EVM (possono eseguire dapp native di Ethereum).                              | Una sidechainusa un meccanismo di consenso e non beneficia delle garanzie di sicurezza di Ethereum.                                    |
| Le sidechain usano modelli di consenso differenti per elaborare efficientemente le transazioni e ridurre le commissioni di transazione per gli utenti. | Le sidechain richiedono ipotesi di fiducia più elevata (ad es. un quorum di validatori malevoli della sidechain può commettere frode). |
| Le sidechain compatibili con l'EVM consentono alle dapp di espandere il proprio ecosistema.                                                            |                                                                                                                                        |

### Usare la sidechain {#use-sidechains}

Diversi progetti forniscono implementazioni di sidechain che puoi integrare nelle tue dapp:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (in precedenza xDai)](https://www.gnosischain.com/)
- [Rete di Loom](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Letture consigliate {#further-reading}

- [Scaling Ethereum dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 feb 2018 - Georgios Konstantopoulos_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
