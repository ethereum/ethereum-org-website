---
title: Ponti
description: Una panoramica sui ponti per gli sviluppatori
lang: it
---

Con la proliferazione delle blockchain di layer 1 (l1) e delle soluzioni di [ridimensionamento](/developers/docs/scaling/) di layer 2 (l2), insieme a un numero sempre crescente di applicazioni decentralizzate (dapp) che diventano cross-chain, la necessità di comunicazione e movimento di asset tra le catene è diventata una parte essenziale dell'infrastruttura di rete. Esistono diversi tipi di ponti per contribuire a rendere tutto ciò possibile.

## Necessità dei ponti {#need-for-bridges}

I ponti esistono per connettere le reti blockchain. Consentono la connettività e l'interoperabilità tra le blockchain.

Le blockchain esistono in ambienti isolati, il che significa che non c'è modo per le blockchain di scambiare e comunicare naturalmente con altre blockchain. Di conseguenza, sebbene possa esserci un'attività e un'innovazione significative all'interno di un ecosistema, questo è limitato dalla mancanza di connettività e interoperabilità con altri ecosistemi.

I ponti offrono un modo agli ambienti blockchain isolati di connettersi tra loro. Stabiliscono una via di trasporto tra le blockchain in cui token, messaggi, dati arbitrari e persino chiamate agli [smart contract](/developers/docs/smart-contracts/) possono essere trasferiti da una catena all'altra.

## Vantaggi dei ponti {#benefits-of-bridges}

In parole povere, i ponti sbloccano numerosi casi d'uso consentendo alle reti blockchain di scambiare dati e spostare asset tra di loro.

Le blockchain hanno punti di forza, debolezze e approcci unici alla creazione di applicazioni (come velocità, capacità transazionale, costi, ecc.). I ponti aiutano lo sviluppo dell'ecosistema cripto complessivo consentendo alle blockchain di sfruttare le reciproche innovazioni.

Per gli sviluppatori, i ponti consentono quanto segue:

- il trasferimento di qualsiasi dato, informazione e asset tra le catene.
- lo sblocco di nuove funzionalità e casi d'uso per i protocolli, poiché i ponti espandono lo spazio di progettazione per ciò che i protocolli possono offrire. Ad esempio, un protocollo per lo yield farming originariamente distribuito sulla [Mainnet di Ethereum](/) può offrire pool di liquidità su tutte le catene compatibili con l'EVM.
- l'opportunità di sfruttare i punti di forza di diverse blockchain. Ad esempio, gli sviluppatori possono trarre vantaggio dalle commissioni più basse offerte dalle diverse soluzioni di layer 2 (l2) distribuendo le loro dapp su rollup e sidechain, e gli utenti possono utilizzare i ponti per spostarsi tra di esse.
- la collaborazione tra sviluppatori di vari ecosistemi blockchain per creare nuovi prodotti.
- l'attrazione di utenti e comunità da vari ecosistemi verso le loro dapp.

## Come funzionano i ponti? {#how-do-bridges-work}

Sebbene esistano molti [tipi di design di ponti](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), spiccano tre modi per facilitare il trasferimento cross-chain di asset:

- **Bloccare e coniare –** Bloccare gli asset sulla catena di origine e coniare gli asset sulla catena di destinazione.
- **Bruciare e coniare –** Bruciare gli asset sulla catena di origine e coniare gli asset sulla catena di destinazione.
- **Swap atomici –** Fare lo swap di asset sulla catena di origine con asset sulla catena di destinazione con un'altra parte.

## Tipi di ponti {#bridge-types}

I ponti possono solitamente essere classificati in una delle seguenti categorie:

- **Ponti nativi –** Questi ponti sono in genere costruiti per avviare la liquidità su una particolare blockchain, rendendo più facile per gli utenti spostare fondi nell'ecosistema. Ad esempio, l'[Arbitrum Bridge](https://bridge.arbitrum.io/) è costruito per rendere conveniente agli utenti l'utilizzo del ponte dalla Mainnet di Ethereum ad Arbitrum. Altri ponti di questo tipo includono il Polygon PoS Bridge, l'[Optimism Gateway](https://app.optimism.io/bridge), ecc.
- **Ponti basati su validatori o oracoli –** Questi ponti si basano su un set di validatori esterni o oracoli per convalidare i trasferimenti cross-chain. Esempi: Multichain e Across.
- **Ponti per il passaggio di messaggi generalizzati –** Questi ponti possono trasferire asset, insieme a messaggi e dati arbitrari tra le catene. Esempi: Axelar, LayerZero e Nomad.
- **Reti di liquidità –** Questi ponti si concentrano principalmente sul trasferimento di asset da una catena all'altra tramite swap atomici. Generalmente, non supportano il passaggio di messaggi cross-chain. Esempi: Connext e Hop.

## Compromessi da considerare {#trade-offs}

Con i ponti, non esistono soluzioni perfette. Piuttosto, ci sono solo compromessi fatti per raggiungere uno scopo. Sviluppatori e utenti possono valutare i ponti in base ai seguenti fattori:

- **Sicurezza –** Chi verifica il sistema? I ponti protetti da validatori esterni sono in genere meno sicuri dei ponti protetti localmente o nativamente dai validatori della blockchain.
- **Convenienza –** Quanto tempo ci vuole per completare una transazione e quante transazioni ha dovuto firmare un utente? Per uno sviluppatore, quanto tempo ci vuole per integrare un ponte e quanto è complesso il processo?
- **Connettività –** Quali sono le diverse catene di destinazione che un ponte può connettere (ad es. rollup, sidechain, altre blockchain di layer 1, ecc.) e quanto è difficile integrare una nuova blockchain?
- **Capacità di passare dati più complessi –** Un ponte può consentire il trasferimento di messaggi e dati arbitrari più complessi tra le catene, o supporta solo i trasferimenti di asset cross-chain?
- **Efficienza dei costi –** Quanto costa trasferire asset tra le catene tramite un ponte? In genere, i ponti addebitano una commissione fissa o variabile a seconda dei costi del gas e della liquidità di percorsi specifici. È inoltre fondamentale valutare l'efficienza dei costi di un ponte in base al capitale necessario per garantirne la sicurezza.

Ad alto livello, i ponti possono essere classificati come fidati (trusted) e trustless.

- **Fidati (Trusted) –** I ponti fidati sono verificati esternamente. Utilizzano un set esterno di verificatori (Federazioni con multi-firma, sistemi di calcolo multi-parte, reti di oracoli) per inviare dati tra le catene. Di conseguenza, possono offrire un'ottima connettività e consentire il passaggio di messaggi completamente generalizzato tra le catene. Tendono anche a funzionare bene in termini di velocità ed efficienza dei costi. Questo va a scapito della sicurezza, poiché gli utenti devono fare affidamento sulla sicurezza del ponte.
- **Trustless –** Questi ponti si basano sulle blockchain che stanno connettendo e sui loro validatori per trasferire messaggi e token. Sono 'trustless' perché non aggiungono nuove assunzioni di fiducia (oltre alle blockchain). Di conseguenza, i ponti trustless sono considerati più sicuri dei ponti fidati.

Per valutare i ponti trustless in base ad altri fattori, dobbiamo suddividerli in ponti per il passaggio di messaggi generalizzati e reti di liquidità.

- **Ponti per il passaggio di messaggi generalizzati –** Questi ponti eccellono in sicurezza e nella capacità di trasferire dati più complessi tra le catene. In genere, sono anche buoni in termini di efficienza dei costi. Tuttavia, questi punti di forza vanno generalmente a scapito della connettività per i ponti basati su client leggeri (es: IBC) e presentano svantaggi in termini di velocità per i ponti ottimistici (es: Nomad) che utilizzano prove di frode.
- **Reti di liquidità –** Questi ponti utilizzano swap atomici per il trasferimento di asset e sono sistemi verificati localmente (ovvero, utilizzano i validatori delle blockchain sottostanti per verificare le transazioni). Di conseguenza, eccellono in sicurezza e velocità. Inoltre, sono considerati comparativamente efficienti in termini di costi e offrono una buona connettività. Tuttavia, il compromesso principale è la loro incapacità di passare dati più complessi, poiché non supportano il passaggio di messaggi cross-chain.

## Rischi con i ponti {#risk-with-bridges}

I ponti sono responsabili dei tre [più grandi hack nella finanza decentralizzata (DeFi)](https://rekt.news/leaderboard/) e sono ancora nelle prime fasi di sviluppo. L'utilizzo di qualsiasi ponte comporta i seguenti rischi:

- **Rischio degli smart contract –** Sebbene molti ponti abbiano superato con successo gli audit, basta un solo difetto in uno smart contract affinché gli asset siano esposti agli hack (es: [Wormhole Bridge di Solana](https://rekt.news/wormhole-rekt/)).
- **Rischi finanziari sistemici** – Molti ponti utilizzano asset wrappati per coniare versioni canoniche dell'asset originale su una nuova catena. Ciò espone l'ecosistema a un rischio sistemico, poiché abbiamo visto versioni wrappate di token venire sfruttate.
- **Rischio di controparte –** Alcuni ponti utilizzano un design fidato che richiede agli utenti di fare affidamento sull'assunzione che i validatori non colluderanno per rubare i fondi degli utenti. La necessità per gli utenti di fidarsi di questi attori di terze parti li espone a rischi come rug pull, censura e altre attività dannose.
- **Problemi aperti –** Dato che i ponti sono nelle fasi nascenti dello sviluppo, ci sono molte domande senza risposta relative a come si comporteranno i ponti in diverse condizioni di mercato, come nei momenti di congestione della rete e durante eventi imprevisti come attacchi a livello di rete o rollback dello stato. Questa incertezza pone determinati rischi, il cui grado è ancora sconosciuto.

## Come possono le dapp utilizzare i ponti? {#how-can-dapps-use-bridges}

Ecco alcune applicazioni pratiche che gli sviluppatori possono considerare riguardo ai ponti e al portare la loro dapp cross-chain:

### Integrare i ponti {#integrating-bridges}

Per gli sviluppatori, ci sono molti modi per aggiungere il supporto per i ponti:

1. **Costruire il proprio ponte –** Costruire un ponte sicuro e affidabile non è facile, specialmente se si intraprende un percorso più a fiducia minimizzata. Inoltre, richiede anni di esperienza e competenza tecnica relative agli studi sulla scalabilità e sull'interoperabilità. In aggiunta, richiederebbe un team operativo per mantenere un ponte e attrarre liquidità sufficiente per renderlo fattibile.

2. **Mostrare agli utenti molteplici opzioni di ponti –** Molte [dapp](/developers/docs/dapps/) richiedono agli utenti di avere il loro token nativo per interagire con esse. Per consentire agli utenti di accedere ai propri token, offrono diverse opzioni di ponti sul loro sito web. Tuttavia, questo metodo è una soluzione rapida al problema in quanto allontana l'utente dall'interfaccia della dapp e richiede comunque di interagire con altre dapp e ponti. Si tratta di un'esperienza di inserimento macchinosa con una maggiore possibilità di commettere errori.

3. **Integrare un ponte –** Questa soluzione non richiede alla dapp di inviare gli utenti alle interfacce esterne del ponte e del DEX. Consente alle dapp di migliorare l'esperienza di inserimento dell'utente. Tuttavia, questo approccio ha i suoi limiti:

   - La valutazione e la manutenzione dei ponti sono difficili e richiedono tempo.
   - La selezione di un solo ponte crea un singolo punto di guasto e di dipendenza.
   - La dapp è limitata dalle capacità del ponte.
   - I ponti da soli potrebbero non essere sufficienti. Le dapp potrebbero aver bisogno di DEX per offrire maggiori funzionalità come gli swap cross-chain.

4. **Integrare molteplici ponti –** Questa soluzione risolve molti problemi associati all'integrazione di un singolo ponte. Tuttavia, ha anche dei limiti, poiché l'integrazione di molteplici ponti consuma risorse e crea sovraccarichi tecnici e di comunicazione per gli sviluppatori, la risorsa più scarsa nel settore cripto.

5. **Integrare un aggregatore di ponti –** Un'altra opzione per le dapp è l'integrazione di una soluzione di aggregazione di ponti che dia loro accesso a molteplici ponti. Gli aggregatori di ponti ereditano i punti di forza di tutti i ponti e quindi non sono limitati dalle capacità di un singolo ponte. In particolare, gli aggregatori di ponti in genere mantengono le integrazioni dei ponti, il che salva la dapp dal fastidio di dover stare al passo con gli aspetti tecnici e operativi dell'integrazione di un ponte.

Detto questo, anche gli aggregatori di ponti hanno i loro limiti. Ad esempio, sebbene possano offrire più opzioni di ponti, sul mercato sono in genere disponibili molti più ponti rispetto a quelli offerti sulla piattaforma dell'aggregatore. Inoltre, proprio come i ponti, anche gli aggregatori di ponti sono esposti ai rischi degli smart contract e della tecnologia (più smart contract = più rischi).

Se una dapp intraprende la strada dell'integrazione di un ponte o di un aggregatore, ci sono diverse opzioni in base a quanto profonda debba essere l'integrazione. Ad esempio, se si tratta solo di un'integrazione front-end per migliorare l'esperienza di inserimento dell'utente, una dapp integrerebbe il widget. Tuttavia, se l'integrazione serve a esplorare strategie cross-chain più profonde come lo staking, lo yield farming, ecc., la dapp integra l'SDK o l'API.

### Distribuire una dapp su molteplici catene {#deploying-a-dapp-on-multiple-chains}

Per distribuire una dapp su molteplici catene, gli sviluppatori possono utilizzare piattaforme di sviluppo come [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), ecc. In genere, queste piattaforme sono dotate di plugin componibili che possono consentire alle dapp di diventare cross-chain. Ad esempio, gli sviluppatori possono utilizzare un proxy di distribuzione deterministico offerto dal [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Esempi: {#examples}

- [Come creare dapp cross-chain](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Creare un marketplace di NFT cross-chain](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Creare dapp di NFT cross-chain](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitorare l'attività dei contratti tra le catene {#monitoring-contract-activity-across-chains}

Per monitorare l'attività dei contratti tra le catene, gli sviluppatori possono utilizzare sottografi e piattaforme per sviluppatori come Tenderly per osservare gli smart contract in tempo reale. Tali piattaforme dispongono anche di strumenti che offrono maggiori funzionalità di monitoraggio dei dati per le attività cross-chain, come il controllo degli [eventi emessi dai contratti](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), ecc.

#### Strumenti {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Letture consigliate {#further-reading}

- [Ponti blockchain](/bridges/) – ethereum.org
- [Framework di rischio dei ponti di L2BEAT](https://l2beat.com/bridges/summary)
- [Ponti blockchain: costruire reti di criptoreti](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 settembre 2021 – Dmitriy Berenzon
- [Il trilemma dell'interoperabilità](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 ottobre 2021 – Arjun Bhuptani
- [Cluster: come i ponti fidati e a fiducia minimizzata modellano il panorama multi-chain](https://blog.celestia.org/clusters/) - 4 ottobre 2021 – Mustafa Al-Bassam
- [LI.FI: con i ponti, la fiducia è uno spettro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 aprile 2022 – Arjun Chand
- [Lo stato delle soluzioni di interoperabilità dei rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 giugno 2024 – Alex Hook
- [Sfruttare la sicurezza condivisa per un'interoperabilità cross-chain sicura: i comitati di stato di Lagrange e oltre](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 giugno 2024 – Emmanuel Awosika

Inoltre, ecco alcune presentazioni interessanti di [James Prestwich](https://twitter.com/_prestwich) che possono aiutare a sviluppare una comprensione più profonda dei ponti:

- [Costruire ponti, non giardini recintati](https://youtu.be/ZQJWMiX4hT0)
- [Analizzare i ponti](https://youtu.be/b0mC-ZqN8Oo)
- [Perché i ponti stanno bruciando](https://youtu.be/c7cm2kd20j8)