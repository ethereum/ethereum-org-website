---
title: Bridge
description: Una panoramica del bridging per gli sviluppatori
lang: it
---

Con la proliferazione delle blockchain L1 e delle soluzioni di [ridimensionamento](/developers/docs/scaling/) L2, insieme a un numero sempre crescente di applicazioni decentralizzate che operano cross-catena, la necessità di comunicazione e movimento di asset tra catene è diventata una parte essenziale dell'infrastruttura di rete. Esistono diverse tipologie di ponti per renderlo possibile.

## Necessità dei ponti {#need-for-bridges}

I ponti esistono per connettere diverse reti blockchain. Essi abilitano la connettività ed interoperabilità tra le diverse blockchain.

Le blockchain esistono in compartimenti stagni, nel senso che non c'è modo per le blockchain di effettuare scambi e comunicare con altre blockchain in maniera naturale. Di conseguenza, anche se potrebbe esserci un'importante attività e innovazione all'interno di un ecosistema, ciò è limitato dalla mancanza di connettività ed interoperabilità con gli altri ecosistemi.

I ponti offrono una via per connettere tra loro delle blockchain isolate. Stabiliscono un percorso di trasporto tra blockchain dove token, messaggi, dati arbitrari e persino le chiamate a [contratti intelligenti](/developers/docs/smart-contracts/) possono essere trasferite da una catena all'altra.

## Vantaggi dei ponti {#benefits-of-bridges}

In parole povere, i ponti permettono di sbloccare numerosi casi d'uso consentendo alle reti di blockchain di scambiare dati e risorse tra loro.

Le blockchain hanno punti forti, punti deboli e approcci unici per costruire applicazioni (velocità, volumi, costi, ecc.). I ponti contribuiscono allo sviluppo generale dell'ecosistema delle criptovalute consentendo alle blockchain di sfruttare le reciproche innovazioni.

Per gli sviluppatori, i ponti consentono quanto segue:

- il trasferimento di qualsiasi dato, informazione e risorsa tra le varie catene.
- sbloccare nuove funzionalità e casi d'uso per i protocolli, in quando i ponti espandono lo spazio di progettazione per ciò che i protocolli possono offrire. Ad esempio, i protocolli per lo yield farming originariamente lanciati sulla Rete principale di Ethereum possono offrire pool di liquidità in tutte le catene compatibili con EVM.
- l'opportunità di sfruttare i punti di forza delle differenti blockchain. Per esempio, gli sviluppatori possono beneficiare delle minori commissioni offerte dalle diverse soluzioni di L2 distribuendo le proprie dapp nei diversi rollup, e le sidechain e gli utenti possono collegarli tra loro.
- collaborazione tra gli sviluppatori provenienti da diversi ecosistemi di blockchain per costruire nuovi prodotti.
- attrarre utenti e community da vari ecosistemi verso le proprie dapp.

## Come funzionano i ponti? {#how-do-bridges-work}

Sebbene esistano molti [tipi di design di ponti](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tre modi per facilitare il trasferimento cross-catena di asset spiccano:

- **Blocca e conia –** Blocca gli asset sulla catena di origine e conia gli asset sulla catena di destinazione.
- **Brucia e conia –** Brucia gli asset sulla catena di origine e conia gli asset sulla catena di destinazione.
- **Scambi atomici –** Scambia gli asset sulla catena di origine con gli asset sulla catena di destinazione con un'altra parte.

## Tipi di ponte {#bridge-types}

I ponti possono essere solitamente classificati in uno dei seguenti:

- **Ponti nativi –** Questi ponti sono in genere costruiti per creare la liquidità iniziale su una particolare blockchain, rendendo più facile per gli utenti spostare fondi nell'ecosistema. Ad esempio, l'[Arbitrum Bridge](https://bridge.arbitrum.io/) è creato per rendere conveniente agli utenti effettuare il bridging da Ethereum Mainnet ad Arbitrum. Altri ponti di questo tipo includono Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), ecc.
- **Ponti basati su validatori o oracoli –** Questi ponti si basano su un set di validatori esterni o oracoli per convalidare i trasferimenti cross-catena. Esempi: Multichain e Across.
- **Ponti generalizzati per lo scambio di messaggi –** Questi ponti possono trasferire asset, insieme a messaggi e dati arbitrari tra le catene. Esempi: Axelar, LayerZero e Nomad.
- **Reti di liquidità –** Questi ponti si concentrano principalmente sul trasferimento di asset da una catena all'altra tramite scambi atomici. Generalmente non supportano il passaggio di messaggi tra catene. Esempi: Connext e Hop.

## Compromessi da considerare {#trade-offs}

Con i ponti, non esistono soluzioni perfette. Piuttosto, ci sono solo compromessi accettati per realizzare uno scopo. Gli sviluppatori e gli utenti possono valutare i diversi ponti in base ai seguenti fattori:

- **Sicurezza –** Chi verifica il sistema? I ponti messi in sicurezza dai validatori esterni sono tipicamente meno sicuri dei ponti locali o tenuti sicuri in modo nativo dai validatori della blockchain.
- **Comodità –** Quanto tempo ci vuole per completare una transazione e quante transazioni ha dovuto firmare un utente? Per uno sviluppatore, quanto tempo ci vuole per integrare un ponte, e quanto è complesso questo processo?
- **Connettività –** Quali sono le diverse catene di destinazione che un ponte può collegare (ossia, rollup, sidechain, altre blockchain di livello 1, ecc.) e quanto è difficile integrare una nuova blockchain?
- **Capacità di trasferire dati più complessi –** Un ponte può consentire il trasferimento di messaggi e dati arbitrari più complessi tra catene o supporta solo i trasferimenti di asset cross-catena?
- **Rapporto costo-efficacia –** Quanto costa trasferire gli asset tra catene tramite un ponte? Tipicamente, i ponti addebitano una commissione fissa o variabile a seconda del costo del carburante e dalla liquidità di specifici percorsi. È inoltre fondamentale valutare il rapporto costi-efficacia di un ponte sulla base del capitale necessario per garantirne la sicurezza.

Ad un livello elevato, i ponti possono essere classificati come fidati e senza fiducia.

- **Fidato –** I ponti fidati sono verificati esternamente. Usano un insieme esterno di verificatori (Federazioni con sistemi di calcolo multifirma, multi-parte, oracolo) per inviare dati attraverso le catene. Di conseguenza, possono offrire una grande connettività e consentire il passaggio di messaggi completamente generalizzati attraverso le catene. Inoltre, tendono a funzionare meglio con la velocità e il rapporto costi-efficacia. Ciò va a scapito della sicurezza, poiché gli utenti devono fare affidamento sulla sicurezza del ponte.
- **Senza fiducia –** Questi ponti si basano sulle blockchain che collegano e sui loro validatori per trasferire messaggi e token. Sono 'senza fiducia' perché non aggiungono nuove ipotesi di fiducia (oltre alle blockchain). Di conseguenza, i ponti senza fiducia sono considerati più sicuri dei ponti fidati.

Per valutare i ponti senza fiducia sulla base di altri fattori, dobbiamo suddividerli in ponti generalizzati di passaggio di messaggi e reti di liquidità.

- **Ponti generalizzati per lo scambio di messaggi –** Questi ponti eccellono in sicurezza e nella capacità di trasferire dati più complessi tra le catene. In genere, hanno anche buoni rapporti costi-efficacia. Tuttavia, questi punti di forza sono generalmente a scapito della connettività per i ponti client leggeri (es: IBC) e hanno svantaggi di velocità per i ponti ottimistici (es: Nomad) che utilizzano prove di frode.
- **Reti di liquidità –** Questi ponti utilizzano gli scambi atomici per trasferire gli asset e sono sistemi verificati localmente (ossia, usano i validatori delle blockchain sottostanti per verificare le transazioni). Di conseguenza, eccellono in sicurezza e velocità. Inoltre, sono considerati relativamente convenienti e offrono una buona connettività. Tuttavia, il principale compromesso è la loro incapacità di trasmettere dati più complessi, poiché non supportano il passaggio di messaggi tra catene.

## Rischi dei ponti {#risk-with-bridges}

I ponti sono protagonisti dei tre [più grandi hack della DeFi](https://rekt.news/leaderboard/) e sono ancora nelle prime fasi del loro sviluppo. L'utilizzo di un ponte comporta i seguenti rischi:

- **Rischio legato ai contratti intelligenti –** Sebbene molti ponti abbiano superato con successo gli audit, basta una falla in un contratto intelligente perché gli asset siano esposti a hack (es: [Wormhole Bridge di Solana](https://rekt.news/wormhole-rekt/)).
- **Rischi finanziari sistemici –** Molti ponti usano asset wrappati per coniare versioni canoniche dell'asset originale su una nuova catena. Ciò espone l'ecosistema a un rischio sistemico, poiché abbiamo visto sfruttate le versioni impacchettate dei token.
- **Rischio di controparte –** Alcuni ponti utilizzano un design basato sulla fiducia che richiede agli utenti di fare affidamento sul presupposto che i validatori non colluderanno per rubare i fondi degli utenti. La necessità per gli utenti di fidarsi di questi attori di terze parti li espone a rischi come rug pull, censura e altre attività malevole.
- **Questioni aperte –** Dato che i ponti sono nelle fasi iniziali del loro sviluppo, ci sono molte domande senza risposta relative a come funzioneranno in diverse condizioni di mercato, come in periodi di congestione della rete e durante eventi imprevisti come attacchi a livello di rete o rollback dello stato. Questa incertezza presenta alcuni rischi, il cui grado è ancora sconosciuto.

## In che modo le dapp possono utilizzare i ponti? {#how-can-dapps-use-bridges}

Ecco alcune applicazioni pratiche che gli sviluppatori possono prendere in considerazione sui ponti e sul portare la loro dapp cross-chain:

### Integrazione dei ponti {#integrating-bridges}

Per gli sviluppatori, vi sono diversi modi per aggiungere il supporto per i ponti:

1. **Costruire il proprio ponte –** Costruire un ponte sicuro e affidabile non è facile, soprattutto se si sceglie un percorso a fiducia minimizzata. Inoltre, servono anni di esperienza e competenze tecniche in materia di scalabilità e interoperabilità. Inoltre, sarebbe necessario un team sul campo per mantenere un ponte e attirare liquidità sufficiente per renderlo fattibile.

2. **Mostrare agli utenti varie opzioni di ponte –** Molte [dApp](/developers/docs/dapps/) richiedono agli utenti di avere il loro token nativo per interagire con loro. Per consentire agli utenti di accedere ai loro token, offrono diverse opzioni di ponte sul loro sito web. Tuttavia, questo metodo è una soluzione rapida al problema in quanto allontana l'utente dall'interfaccia dapp e richiede comunque che interagisca con altri dapp e ponti. Si tratta di un'esperienza complicata d'ingresso al protocollo, con una maggiore possibilità di commettere errori.

3. **Integrare un ponte –** Questa soluzione non richiede che la dApp invii gli utenti a interfacce di ponti o DEX esterne. Consente alle dapp di migliorare l'esperienza d'ingresso dell'utente. Tuttavia, questo approccio ha i suoi limiti:

   - La valutazione e la manutenzione dei ponti sono difficili e richiedono tempo.
   - Selezionare un solo ponte crea un punto di errore unico e dipendenza.
   - La dapp è limitata dalla capacità del ponte.
   - I ponti da soli potrebbero non bastare. Le dapp potrebbero avere necessità dei DEX per offrire maggiori funzionalità, come gli scambi tra le diverse catene.

4. **Integrare più ponti –** Questa soluzione risolve molti problemi associati all'integrazione di un singolo ponte. Tuttavia, anche questa ha dei limiti, poiché l'integrazione di più ponti richiede risorse e crea costi tecnici e comunicativi per gli sviluppatori – la risorsa più scarsa nelle criptovalute.

5. **Integrare un aggregatore di ponti –** Un'altra opzione per le dApp è l'integrazione di una soluzione di aggregazione di ponti che dà loro accesso a più ponti. Gli aggregatori di ponti ereditano i punti di forza di tutti i ponti e quindi non sono limitati dalle capacità di un singolo ponte. In particolare, gli aggregatori di ponti mantengono tipicamente le integrazioni dei ponti, il che evita alla dapp la seccatura di stare dietro agli aspetti tecnici e operativi di un'integrazione di ponte.

Detto questo, anche gli aggregatori di ponti hanno i loro limiti. Per esempio, benché possano offrire più opzioni di ponte, molti altri sono tipicamente disponibili sul mercato diversi da quelli offerti dalla piattaforma dell'aggregatore. Inoltre, proprio come i ponti, anche gli aggregatori di ponti sono esposti a rischi di contratti intelligenti e tecnologici (più contratti intelligenti = più rischi).

Se una dapp prosegue lungo il percorso di integrazione di un ponte o di un aggregatore, esistono diverse opzioni in base al grado di profondità dell'integrazione stessa. Per esempio, se si tratta solo di un'integrazione front-end per migliorare l'esperienza d'ingresso dell'utente, una dapp integrerebbe il widget. Tuttavia, se l'integrazione è volta a esplorare strategie cross-chain più profonde come staking, yield farming, ecc., la dAapp integra l'SDK o l'API.

### Distribuzione di una dApp su più catene {#deploying-a-dapp-on-multiple-chains}

Per distribuire una dApp su più catene, gli sviluppatori possono usare piattaforme di sviluppo come [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), ecc. In genere, queste piattaforme sono dotate di plugin componibili che possono consentire alle dapp di essere distribuite su diverse catene. Ad esempio, gli sviluppatori possono utilizzare un proxy di distribuzione deterministico offerto dal [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Esempi:

- [Come creare dApp cross-catena](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Costruire un marketplace di NFT cross-catena](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Creare dApp di NFT cross-catena](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitoraggio dell'attività dei contratti tra le catene {#monitoring-contract-activity-across-chains}

Per monitorare l'attività del contratto tra le catene, gli sviluppatori possono utilizzare sotto-grafici e piattaforme di sviluppo come Tenderly per osservare i contratti intelligenti in tempo reale. Tali piattaforme dispongono anche di strumenti che offrono maggiori funzionalità di monitoraggio dei dati per le attività cross-catena, come il controllo degli [eventi emessi dai contratti](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), ecc.

#### Strumenti

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Letture consigliate {#further-reading}

- [Ponti blockchain](/bridges/) – ethereum.org
- [Framework di rischio dei ponti di L2Beat](https://l2beat.com/bridges/summary)
- [Ponti blockchain: Costruire Reti di Cripto-reti](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 set 2021 – Dmitriy Berenzon
- [Il Trilemma dell'Interoperabilità](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 ott 2021 – Arjun Bhuptani
- [Cluster: come i ponti fidati e a fiducia minimizzata modellano il panorama multi-catena](https://blog.celestia.org/clusters/) - 4 ott 2021 – Mustafa Al-Bassam
- [LI.FI: con i ponti, la fiducia è uno spettro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 apr 2022 – Arjun Chand
- [Lo stato delle soluzioni di interoperabilità dei rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 giugno 2024 – Alex Hook
- [Sfruttare la sicurezza condivisa per un'interoperabilità cross-catena sicura: Comitati di stato di Lagrange e oltre](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 giugno 2024 – Emmanuel Awosika

Inoltre, ecco alcune presentazioni illuminanti di [James Prestwich](https://twitter.com/_prestwich) che possono aiutare a sviluppare una comprensione più profonda dei ponti:

- [Costruire ponti, non giardini recintati](https://youtu.be/ZQJWMiX4hT0)
- [Analizzare i ponti](https://youtu.be/b0mC-ZqN8Oo)
- [Perché i ponti stanno bruciando](https://youtu.be/c7cm2kd20j8)
