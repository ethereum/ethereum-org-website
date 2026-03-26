---
title: Ponti
description: Una panoramica sui ponti per gli sviluppatori
lang: it
---

Con la proliferazione delle blockchain L1 e delle soluzioni di [scalabilità](/developers/docs/scaling/) L2, insieme a un numero sempre crescente di applicazioni decentralizzate che diventano cross-chain, la necessità di comunicazione e movimento di asset tra le catene è diventata una parte essenziale dell'infrastruttura di rete. Esistono diversi tipi di ponti per contribuire a rendere tutto ciò possibile.

## Necessità dei ponti {#need-for-bridges}

I ponti esistono per connettere le reti blockchain. Consentono la connettività e l'interoperabilità tra le blockchain.

Le blockchain esistono in ambienti isolati, il che significa che non c'è modo per le blockchain di scambiare e comunicare con altre blockchain in modo naturale. Di conseguenza, sebbene possa esserci un'attività e un'innovazione significative all'interno di un ecosistema, questo è limitato dalla mancanza di connettività e interoperabilità con altri ecosistemi.

I ponti offrono un modo agli ambienti blockchain isolati di connettersi tra loro. Stabiliscono un percorso di trasporto tra le blockchain in cui token, messaggi, dati arbitrari e persino chiamate ai [contratti intelligenti](/developers/docs/smart-contracts/) possono essere trasferiti da una catena all'altra.

## Vantaggi dei ponti {#benefits-of-bridges}

In parole povere, i ponti sbloccano numerosi casi d'uso consentendo alle reti blockchain di scambiare dati e spostare asset tra di loro.

Le blockchain hanno punti di forza, debolezze e approcci unici alla creazione di applicazioni (come velocità, produttività, costi, ecc.). I ponti aiutano lo sviluppo dell'ecosistema cripto complessivo consentendo alle blockchain di sfruttare le reciproche innovazioni.

Per gli sviluppatori, i ponti consentono quanto segue:

- il trasferimento di qualsiasi dato, informazione e asset tra le catene.
- lo sblocco di nuove funzionalità e casi d'uso per i protocolli, poiché i ponti espandono lo spazio di progettazione per ciò che i protocolli possono offrire. Ad esempio, un protocollo per lo yield farming originariamente distribuito sulla [rete principale](/) di Ethereum può offrire pool di liquidità su tutte le catene compatibili con la EVM.
- l'opportunità di sfruttare i punti di forza di diverse blockchain. Ad esempio, gli sviluppatori possono beneficiare delle commissioni più basse offerte dalle diverse soluzioni L2 distribuendo le loro dApp su rollup e catene laterali, e gli utenti possono usare i ponti per spostarsi tra di esse.
- la collaborazione tra sviluppatori di vari ecosistemi blockchain per creare nuovi prodotti.
- l'attrazione di utenti e comunità da vari ecosistemi verso le loro dApp.

## Come funzionano i ponti? {#how-do-bridges-work}

Sebbene esistano molti [tipi di design per i ponti](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), spiccano tre modi per facilitare il trasferimento cross-chain di asset:

- **Blocca e conia (Lock and mint) –** Blocca gli asset sulla catena di origine e conia gli asset sulla catena di destinazione.
- **Brucia e conia (Burn and mint) –** Brucia gli asset sulla catena di origine e conia gli asset sulla catena di destinazione.
- **Scambi atomici (Atomic swaps) –** Scambia gli asset sulla catena di origine con asset sulla catena di destinazione con un'altra parte.

## Tipi di ponti {#bridge-types}

I ponti possono solitamente essere classificati in una delle seguenti categorie:

- **Ponti nativi –** Questi ponti sono in genere costruiti per avviare la liquidità su una particolare blockchain, rendendo più facile per gli utenti spostare fondi nell'ecosistema. Ad esempio, l'[Arbitrum Bridge](https://bridge.arbitrum.io/) è costruito per rendere conveniente agli utenti l'uso del ponte dalla rete principale di Ethereum ad Arbitrum. Altri ponti di questo tipo includono Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), ecc.
- **Ponti basati su validatori o oracoli –** Questi ponti si basano su un set di validatori esterni o oracoli per convalidare i trasferimenti cross-chain. Esempi: Multichain e Across.
- **Ponti di passaggio di messaggi generalizzati –** Questi ponti possono trasferire asset, insieme a messaggi e dati arbitrari tra le catene. Esempi: Axelar, LayerZero e Nomad.
- **Reti di liquidità –** Questi ponti si concentrano principalmente sul trasferimento di asset da una catena all'altra tramite scambi atomici. Generalmente, non supportano il passaggio di messaggi cross-chain. Esempi: Connext e Hop.

## Compromessi da considerare {#trade-offs}

Con i ponti, non esistono soluzioni perfette. Piuttosto, ci sono solo compromessi fatti per raggiungere uno scopo. Sviluppatori e utenti possono valutare i ponti in base ai seguenti fattori:

- **Sicurezza –** Chi verifica il sistema? I ponti protetti da validatori esterni sono in genere meno sicuri dei ponti protetti localmente o nativamente dai validatori della blockchain.
- **Convenienza –** Quanto tempo ci vuole per completare una transazione e quante transazioni ha dovuto firmare un utente? Per uno sviluppatore, quanto tempo ci vuole per integrare un ponte e quanto è complesso il processo?
- **Connettività –** Quali sono le diverse catene di destinazione che un ponte può connettere (ad es. rollup, catene laterali, altre blockchain di livello 1, ecc.) e quanto è difficile integrare una nuova blockchain?
- **Capacità di passare dati più complessi –** Un ponte può consentire il trasferimento di messaggi e dati arbitrari più complessi tra le catene, o supporta solo trasferimenti di asset cross-chain?
- **Efficienza dei costi –** Quanto costa trasferire asset tra le catene tramite un ponte? In genere, i ponti addebitano una commissione fissa o variabile a seconda dei costi del gas e della liquidità di percorsi specifici. È anche fondamentale valutare l'efficienza dei costi di un ponte in base al capitale richiesto per garantirne la sicurezza.

Ad alto livello, i ponti possono essere classificati come fidati (trusted) e senza fiducia (trustless).

- **Fidati (Trusted) –** I ponti fidati sono verificati esternamente. Utilizzano un set esterno di verificatori (Federazioni con multifirma, sistemi di calcolo multiparte, reti di oracoli) per inviare dati tra le catene. Di conseguenza, possono offrire un'ottima connettività e consentire il passaggio di messaggi completamente generalizzato tra le catene. Tendono anche a funzionare bene in termini di velocità ed efficienza dei costi. Questo va a scapito della sicurezza, poiché gli utenti devono fare affidamento sulla sicurezza del ponte.
- **Senza fiducia (Trustless) –** Questi ponti si basano sulle blockchain che stanno connettendo e sui loro validatori per trasferire messaggi e token. Sono "senza fiducia" perché non aggiungono nuove ipotesi di fiducia (oltre alle blockchain). Di conseguenza, i ponti senza fiducia sono considerati più sicuri dei ponti fidati.

Per valutare i ponti senza fiducia in base ad altri fattori, dobbiamo suddividerli in ponti di passaggio di messaggi generalizzati e reti di liquidità.

- **Ponti di passaggio di messaggi generalizzati –** Questi ponti eccellono in sicurezza e nella capacità di trasferire dati più complessi tra le catene. In genere, sono anche buoni in termini di efficienza dei costi. Tuttavia, questi punti di forza vanno generalmente a scapito della connettività per i ponti client leggeri (es: IBC) e degli svantaggi di velocità per i ponti ottimistici (es: Nomad) che utilizzano prove di frode.
- **Reti di liquidità –** Questi ponti utilizzano scambi atomici per il trasferimento di asset e sono sistemi verificati localmente (ovvero, utilizzano i validatori delle blockchain sottostanti per verificare le transazioni). Di conseguenza, eccellono in sicurezza e velocità. Inoltre, sono considerati comparativamente efficienti in termini di costi e offrono una buona connettività. Tuttavia, il compromesso principale è la loro incapacità di passare dati più complessi, poiché non supportano il passaggio di messaggi cross-chain.

## Rischi con i ponti {#risk-with-bridges}

I ponti sono responsabili dei tre [più grandi hack nella DeFi](https://rekt.news/leaderboard/) e sono ancora nelle prime fasi di sviluppo. L'utilizzo di qualsiasi ponte comporta i seguenti rischi:

- **Rischio dei contratti intelligenti –** Sebbene molti ponti abbiano superato con successo gli audit, basta un solo difetto in un contratto intelligente affinché gli asset siano esposti agli hack (es: [Wormhole Bridge di Solana](https://rekt.news/wormhole-rekt/)).
- **Rischi finanziari sistemici** – Molti ponti utilizzano asset avvolti per coniare versioni canoniche dell'asset originale su una nuova catena. Ciò espone l'ecosistema a un rischio sistemico, poiché abbiamo visto versioni avvolte di token essere sfruttate.
- **Rischio di controparte –** Alcuni ponti utilizzano un design fidato che richiede agli utenti di fare affidamento sul presupposto che i validatori non colluderanno per rubare i fondi degli utenti. La necessità per gli utenti di fidarsi di questi attori di terze parti li espone a rischi come rug pull, censura e altre attività dannose.
- **Problemi aperti –** Dato che i ponti sono nelle fasi nascenti dello sviluppo, ci sono molte domande senza risposta relative a come si comporteranno i ponti in diverse condizioni di mercato, come in tempi di congestione della rete e durante eventi imprevisti come attacchi a livello di rete o rollback dello stato. Questa incertezza pone determinati rischi, il cui grado è ancora sconosciuto.

## Come possono le dApp utilizzare i ponti? {#how-can-dapps-use-bridges}

Ecco alcune applicazioni pratiche che gli sviluppatori possono considerare riguardo ai ponti e al portare la loro dApp cross-chain:

### Integrare i ponti {#integrating-bridges}

Per gli sviluppatori, ci sono molti modi per aggiungere il supporto per i ponti:

1. **Costruire il proprio ponte –** Costruire un ponte sicuro e affidabile non è facile, specialmente se si intraprende un percorso con minimizzazione della fiducia. Inoltre, richiede anni di esperienza e competenza tecnica relative agli studi sulla scalabilità e sull'interoperabilità. In aggiunta, richiederebbe un team pratico per mantenere un ponte e attrarre liquidità sufficiente per renderlo fattibile.

2. **Mostrare agli utenti più opzioni di ponti –** Molte [dApp](/developers/docs/dapps/) richiedono agli utenti di avere il loro token nativo per interagire con esse. Per consentire agli utenti di accedere ai loro token, offrono diverse opzioni di ponti sul loro sito web. Tuttavia, questo metodo è una soluzione rapida al problema in quanto allontana l'utente dall'interfaccia della dApp e richiede comunque di interagire con altre dApp e ponti. Questa è un'esperienza di onboarding macchinosa con una maggiore possibilità di commettere errori.

3. **Integrare un ponte –** Questa soluzione non richiede alla dApp di inviare gli utenti alle interfacce esterne del ponte e del DEX. Consente alle dApp di migliorare l'esperienza di onboarding dell'utente. Tuttavia, questo approccio ha i suoi limiti:
   - La valutazione e la manutenzione dei ponti sono difficili e dispendiose in termini di tempo.
   - La selezione di un solo ponte crea un singolo punto di guasto e dipendenza.
   - La dApp è limitata dalle capacità del ponte.
   - I ponti da soli potrebbero non essere sufficienti. Le dApp potrebbero aver bisogno di DEX per offrire maggiori funzionalità come gli scambi cross-chain.

4. **Integrare più ponti –** Questa soluzione risolve molti problemi associati all'integrazione di un singolo ponte. Tuttavia, ha anche dei limiti, poiché l'integrazione di più ponti consuma risorse e crea sovraccarichi tecnici e di comunicazione per gli sviluppatori, la risorsa più scarsa nel settore cripto.

5. **Integrare un aggregatore di ponti –** Un'altra opzione per le dApp è l'integrazione di una soluzione di aggregazione di ponti che dia loro accesso a più ponti. Gli aggregatori di ponti ereditano i punti di forza di tutti i ponti e quindi non sono limitati dalle capacità di un singolo ponte. In particolare, gli aggregatori di ponti in genere mantengono le integrazioni dei ponti, il che salva la dApp dal fastidio di dover rimanere aggiornata sugli aspetti tecnici e operativi dell'integrazione di un ponte.

Detto questo, anche gli aggregatori di ponti hanno i loro limiti. Ad esempio, sebbene possano offrire più opzioni di ponti, sul mercato sono in genere disponibili molti più ponti oltre a quelli offerti sulla piattaforma dell'aggregatore. Inoltre, proprio come i ponti, anche gli aggregatori di ponti sono esposti ai rischi dei contratti intelligenti e della tecnologia (più contratti intelligenti = più rischi).

Se una dApp intraprende la strada dell'integrazione di un ponte o di un aggregatore, ci sono diverse opzioni in base a quanto profonda debba essere l'integrazione. Ad esempio, se si tratta solo di un'integrazione front-end per migliorare l'esperienza di onboarding dell'utente, una dApp integrerebbe il widget. Tuttavia, se l'integrazione serve a esplorare strategie cross-chain più profonde come lo staking, lo yield farming, ecc., la dApp integra l'SDK o l'API.

### Distribuire una dApp su più catene {#deploying-a-dapp-on-multiple-chains}

Per distribuire una dApp su più catene, gli sviluppatori possono utilizzare piattaforme di sviluppo come [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), ecc. In genere, queste piattaforme sono dotate di plugin componibili che possono consentire alle dApp di diventare cross-chain. Ad esempio, gli sviluppatori possono utilizzare un proxy di distribuzione deterministico offerto dal [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Esempi:

- [Come costruire dApp cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Costruire un marketplace NFT cross-chain](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Costruire dApp NFT cross-chain](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorare l'attività dei contratti tra le catene {#monitoring-contract-activity-across-chains}

Per monitorare l'attività dei contratti tra le catene, gli sviluppatori possono utilizzare sottografi e piattaforme per sviluppatori come Tenderly per osservare i contratti intelligenti in tempo reale. Tali piattaforme dispongono anche di strumenti che offrono maggiori funzionalità di monitoraggio dei dati per le attività cross-chain, come il controllo degli [eventi emessi dai contratti](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), ecc.

#### Strumenti

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Letture consigliate {#further-reading}

- [Ponti blockchain](/bridges/) – ethereum.org
- [L2Beat Bridge Risk Framework](https://l2beat.com/bridges/summary)
- [Blockchain Bridges: Building Networks of Cryptonetworks](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 set 2021 – Dmitriy Berenzon
- [The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 ott 2021 – Arjun Bhuptani
- [Clusters: How Trusted & Trust-Minimized Bridges Shape the Multi-Chain Landscape](https://blog.celestia.org/clusters/) - 4 ott 2021 – Mustafa Al-Bassam
- [LI.FI: With Bridges, Trust is a Spectrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 apr 2022 – Arjun Chand
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 giu 2024 – Alex Hook
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 giu 2024 – Emmanuel Awosika

Inoltre, ecco alcune presentazioni interessanti di [James Prestwich](https://twitter.com/_prestwich) che possono aiutare a sviluppare una comprensione più profonda dei ponti:

- [Building Bridges, Not Walled Gardens](https://youtu.be/ZQJWMiX4hT0)
- [Breaking Down Bridges](https://youtu.be/b0mC-ZqN8Oo)
- [Why are the Bridges Burning](https://youtu.be/c7cm2kd20j8)