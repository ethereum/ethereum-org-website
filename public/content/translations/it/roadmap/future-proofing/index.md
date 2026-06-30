---
title: Rendere Ethereum a prova di futuro e la sicurezza quantistica della crittografia
description: Questi aggiornamenti consolidano Ethereum come livello di base resiliente e decentralizzato per il futuro, qualunque cosa esso riservi.
lang: it
image: /images/roadmap/roadmap-future.png
alt: "Roadmap di Ethereum"
template: roadmap
summaryPoints:
  - La crittografia post-quantistica garantisce che Ethereum possa sopravvivere alle minacce hardware avanzate con il progredire dell'informatica quantistica
  - La semplificazione del protocollo rende Ethereum più facile da mantenere, verificare e proteggere
  - I recenti aggiornamenti hanno già apportato significativi miglioramenti in termini di efficienza
---

Alcune parti della roadmap non riguardano la scalabilità o la sicurezza di Ethereum in questo momento. Riguardano il rendere Ethereum **stabile e affidabile nel lontano futuro**. Ciò significa prepararsi a nuovi tipi di minacce e rimuovere la complessità non necessaria dal protocollo.

## Resistenza quantistica {#quantum-resistance}

Ethereum utilizza la [crittografia](/glossary/#cryptography) per mantenere sicura la rete e proteggere i fondi degli utenti. Alla fine, alcuni di questi metodi crittografici saranno **vulnerabili ai computer quantistici**, che possono risolvere specifici problemi matematici in modo esponenzialmente più veloce rispetto alle macchine classiche.

**Nessun computer quantistico può violare la crittografia di Ethereum oggi.** L'hardware necessario non esiste ancora su larga scala. Ma recenti ricerche suggeriscono che il divario si sta colmando più velocemente del previsto. Nel marzo 2026, Google Quantum AI ha pubblicato un documento in cui stima che per violare la crittografia a curva ellittica a 256 bit (il tipo che Ethereum utilizza per le firme degli account) potrebbero essere necessari circa 1.200 qubit logici, circa 20 volte meno rispetto alle stime precedenti. Google ha fissato una scadenza interna al 2029 per la migrazione dei propri sistemi verso una crittografia a prova di quantum (quantum-safe).

Le transizioni crittografiche richiedono anni per essere pianificate ed eseguite in sicurezza. Poiché il modello di sicurezza di Ethereum è progettato per durare decenni, la preparazione post-quantistica era nella roadmap di Ethereum prima ancora di finire sulle prime pagine dei giornali. La preparazione della rete sta avvenendo ora per garantire una transizione senza interruzioni, non come reazione a un'emergenza.

### Cosa è a rischio? {#what-is-at-risk}

Sono state identificate quattro aree principali della crittografia di Ethereum che richiedono aggiornamenti post-quantistici:

1. **Firme di consenso (BLS)**: I [validatori](/glossary/#validator) utilizzano le firme BLS per votare sui [blocchi](/glossary/#block) validi. Un computer quantistico potrebbe falsificare queste firme.
2. **Disponibilità dei dati (commitment KZG)**: Gli [schemi di commitment](/roadmap/danksharding/#what-is-kzg) che aiutano Ethereum a scalare si basano su una matematica (nello specifico, l'accoppiamento di curve ellittiche) che è vulnerabile agli attacchi quantistici.
3. **Firme degli account (ECDSA)**: Lo schema di firma che protegge i singoli account Ethereum. Quando un account invia una transazione, la sua chiave pubblica viene esposta onchain. Un computer quantistico potrebbe derivare la chiave privata da questa chiave pubblica esposta, consentendo potenzialmente il furto di fondi.
4. **Prove ZK a livello di applicazione**: I sistemi di prova a conoscenza zero utilizzati dai rollup e da altre applicazioni si basano su presupposti crittografici che i computer quantistici potrebbero compromettere.

<ExpandableCard title="I computer quantistici possono rubare i miei ETH oggi?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

No. Nessun computer quantistico oggi può violare la crittografia di Ethereum. Il lavoro descritto in questa pagina è una preparazione per il futuro, non una risposta a una minaccia attiva. Quando saranno disponibili portafogli post-quantistici, il software del portafoglio ti guiderà attraverso la migrazione. Per ora, non c'è nulla che tu debba fare.

</ExpandableCard>

### Cosa si sta facendo?

Ethereum è attualmente il difensore più proattivo contro le minacce quantistiche nell'ecosistema blockchain. La Ethereum Foundation ha formato un **team per la sicurezza post-quantistica** dedicato nel gennaio 2026 e il lavoro attivo si estende a più team di client e gruppi di ricerca. Il lavoro del team post-quantistico della EF è tracciato pubblicamente su [pq.ethereum.org](https://pq.ethereum.org).

Il lavoro attivo include:

- **Firme basate su hash (leanXMSS)**: Un sostituto a prova di quantum per le firme dei validatori, basato su funzioni di hash che i computer quantistici non possono violare in modo efficiente.
- **zkVM minimale (leanVM)**: Poiché le firme a prova di quantum sono più grandi delle firme attualmente utilizzate, leanXMSS è abbinato a una zkVM minimale (leanVM). Questo motore aggrega le firme a prova di quantum in modo efficiente, comprimendo i dati di 250 volte, in modo che la rete rimanga veloce dopo la transizione.
- **Test di interoperabilità settimanali**: Più di 10 team di client partecipano a devnet post-quantistiche regolari.
- **Disponibilità dei dati:** L'aggiornamento della crittografia sottostante utilizzata per gestire grandi quantità di dati di rete garantirà che Ethereum rimanga veloce e conveniente da usare senza rischiare future vulnerabilità quantistiche.
- **Premio Poseidon**: Un premio di ricerca da 1 milione di dollari mirato a miglioramenti nelle primitive crittografiche basate su hash.
- **Standard NIST**: Il National Institute of Standards and Technology degli Stati Uniti ha finalizzato tre standard di crittografia post-quantistica nell'agosto 2024 (ML-KEM, ML-DSA, SLH-DSA). Il lavoro di Ethereum si basa su queste fondamenta.

Una parte fondamentale della strategia di transizione è l'**EIP-8141**, che introduce l'[astrazione dell'account](/roadmap/account-abstraction/) nativa. Ciò consente ai singoli account di scegliere la propria verifica della firma, il che significa che gli utenti potrebbero passare a firme a prova di quantum **senza aspettare una singola migrazione a livello di protocollo**. L'EIP-8141 è in fase di valutazione per l'hard fork Hegotá (previsto per la seconda metà del 2026).

La Ethereum Foundation ha delineato traguardi strutturati per i fork che mirano al completamento dell'infrastruttura post-quantistica di base entro circa il 2029. Questi sono obiettivi di pianificazione, non impegni garantiti.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Maggiori informazioni sulla resistenza quantistica</ButtonLink>
## Un Ethereum più semplice ed efficiente {#simpler-more-efficient-ethereum}

La complessità crea opportunità per bug e vulnerabilità. Parte della roadmap si concentra sulla **semplificazione di Ethereum e sulla rimozione del debito tecnico** in modo che il protocollo sia più facile da mantenere, verificare e analizzare.

### Cosa è stato implementato {#what-has-been-delivered}

Diversi aggiornamenti recenti hanno reso Ethereum più semplice ed efficiente:

- **[Pectra (maggio 2025)](/roadmap/pectra/)**: Ha introdotto l'EIP-7702, che consente agli account di proprietà esterna di delegare temporaneamente al codice di uno smart contract, un trampolino di lancio verso la completa [astrazione dell'account](/roadmap/account-abstraction/). Ha inoltre aggiunto il precompilato BLS12-381 (EIP-2537), la gestione dei depositi onchain (EIP-6110), l'accesso agli hash dei blocchi storici nell'EVM (EIP-2935) e ha aumentato il saldo effettivo massimo per i validatori (EIP-7251).
- **[Fusaka (dicembre 2025)](/roadmap/fusaka/)**: Ha implementato PeerDAS (EIP-7594), un sistema di campionamento della disponibilità dei dati peer-to-peer che distribuisce il carico di lavoro della disponibilità dei dati attraverso la rete. Ha inoltre aumentato i parametri dei blob, espandendo la capacità transazionale dei dati per i [rollup](/glossary/#rollups).
- **[Dencun (marzo 2024)](/roadmap/dencun/)**: Ha introdotto le transazioni blob (EIP-4844) per dati di rollup più economici e ha limitato `SELFDESTRUCT` (EIP-6780) per rimuovere una fonte di complessità di lunga data.
- **[London (agosto 2021)](/ethereum-forks/#london)**: Ha revisionato il prezzo del [gas](/glossary/#gas) con l'EIP-1559, introducendo una commissione di base e un meccanismo per bruciare le commissioni per costi di transazione più prevedibili.

### Cosa è in corso {#what-is-in-progress}

- **[Glamsterdam (previsto per la prima metà del 2026)](/roadmap/glamsterdam/)**: In fase di valutazione per l'inclusione: separazione proponente-costruttore (PBS) integrata (EIP-7732), liste di accesso a livello di blocco (EIP-7928) e revisione dei prezzi del gas per allineare meglio i costi all'effettivo utilizzo delle risorse.
- **Hegotá (previsto per la seconda metà del 2026)**: In fase di valutazione per l'inclusione: [alberi di Verkle](/roadmap/verkle-trees/), sostituendo l'attuale struttura dei dati con una più efficiente che abilita i client stateless. È anche l'obiettivo per l'EIP-8141 (astrazione dell'account nativa).
- **In corso**: Gli sforzi per semplificare l'[EVM](/developers/docs/evm/), armonizzare le implementazioni dei client ed eliminare gradualmente le funzionalità deprecate continuano in tutta la comunità di sviluppo di Ethereum.

## Progressi attuali {#current-progress}

All'inizio del 2026:

**Semplificazione ed efficienza**: Pectra e Fusaka hanno apportato miglioramenti reali nella flessibilità degli account, nella disponibilità dei dati e nelle operazioni dei validatori. Glamsterdam e Hegotá sono in fase di sviluppo attivo con obiettivi chiari per rendere la rete più resiliente ed efficiente, rimuovendo al contempo le dipendenze esterne.

**Crittografia post-quantistica**: Sono in corso ricerche attive e implementazioni iniziali. L'ecosistema ha finanziato premi di ricerca e gestisce devnet di interoperabilità settimanali su più client, oltre alla ricerca condotta dal team post-quantistico dedicato della Ethereum Foundation. Sebbene i traguardi strutturati dei fork puntino al completamento per circa il 2029, le prime ricerche stanno producendo prove tangibili che dimostrano che l'esecuzione post-quantistica è praticabile oggi.

**Astrazione dell'account e agilità delle firme**: L'EIP-7702 è stato rilasciato in Pectra. L'EIP-8141, in fase di valutazione per Hegotá, consentirà agli account di utilizzare qualsiasi schema di firma, offrendo agli utenti un percorso per adottare firme a prova di quantum prima che la transizione completa del protocollo sia terminata.

Nessuna parte di questo lavoro è terminata. Le tempistiche sono obiettivi, non garanzie. Ma la portata e il ritmo dello sviluppo attivo rappresentano un chiaro impegno a mantenere Ethereum sicuro ed efficiente a lungo termine.

**Letture di approfondimento**

- [Crittografia post-quantistica su Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Architettura della EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Strutture dati](/developers/docs/data-structures-and-encoding/)
