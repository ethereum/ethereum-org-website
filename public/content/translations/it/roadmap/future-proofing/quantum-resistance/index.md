---
title: Crittografia post-quantistica su Ethereum
description: "Come Ethereum si sta preparando per l'era post-quantistica, cosa è vulnerabile e cosa si sta costruendo per proteggerlo."
lang: it
image: /images/roadmap/roadmap-future.png
alt: "Roadmap di Ethereum"
template: roadmap
summaryPoints:
  - I computer quantistici prima o poi minacceranno la crittografia che Ethereum utilizza oggi
  - La Fondazione Ethereum ha un team di ricerca post-quantistica dedicato e una roadmap strutturata "Lean Ethereum" che punta al 2029 per una protezione post-quantistica completa
  - I tuoi fondi sono al sicuro oggi e il software del portafoglio ti guiderà attraverso la migrazione futura
---

I computer quantistici prima o poi saranno in grado di violare i metodi crittografici che oggi proteggono Ethereum e la maggior parte degli altri sistemi digitali. Questa pagina spiega cosa significa, come la rete sta sviluppando proattivamente miglioramenti per mitigare questo rischio e cosa devi sapere.

## Perché la crittografia post-quantistica è importante {#why-post-quantum-matters}

Ethereum si affida a diverse forme di [crittografia](/glossary/#cryptography) per mantenere sicura la rete e proteggere i fondi degli utenti. Le più importanti sono:

- **Algoritmo per la firma digitale a curva ellittica (ECDSA)**: La crittografia utilizzata per firmare le transazioni. La sicurezza del tuo account Ethereum dipende da questo.
- **Firme BLS**: Utilizzate dai [validatori](/glossary/#validator) per raggiungere il [consenso](/glossary/#consensus) sullo stato della rete.
- **Commitment polinomiali KZG**: Utilizzati per la [disponibilità dei dati](/glossary/#data-availability) nella roadmap di scalabilità di Ethereum.
- **Sistemi di prove a conoscenza zero (ZK)**: Utilizzati dai rollup e da altre applicazioni per verificare i calcoli offchain.

Tutti questi si basano su strutture matematiche, come i gruppi abeliani, che sono difficili per i computer classici ma possono essere risolti in modo efficiente da un computer quantistico utilizzando l'[algoritmo di Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Quando i computer quantistici minacceranno Ethereum? {#when-will-quantum-computers-threaten-ethereum}

A marzo 2026, Google Quantum AI ha pubblicato una ricerca che stima che violare la crittografia a curva ellittica a 256 bit (il tipo che Ethereum utilizza per le firme degli account) potrebbe richiedere circa 1.200 qubit logici. Le stime precedenti indicavano un numero molto più alto. Google ha fissato una scadenza interna al 2029 per la migrazione dei propri sistemi alla crittografia post-quantistica.

L'hardware quantistico attuale è lontano da questa scala, operando con poche migliaia di qubit fisici rumorosi. I qubit logici (che correggono gli errori ed eseguono calcoli affidabili) richiedono ciascuno molti qubit fisici. **Il divario tra l'hardware attuale e ciò che è necessario per violare la crittografia di Ethereum rimane significativo, ma si sta riducendo più velocemente di quanto molti si aspettassero.** In particolare, il National Institute of Standards and Technology (NIST) degli Stati Uniti prevede di deprecare l'ECDSA entro il 2030 e di vietarlo entro il 2035.

Questa non è una minaccia imminente. Ma le transizioni crittografiche richiedono anni e il modello di sicurezza di Ethereum è progettato per durare secoli. La risposta di Ethereum è la roadmap **Lean Ethereum**, una missione deliberata e pluriennale per ricostruire Ethereum attorno a primitive che sopravviveranno a qualsiasi minaccia crittografica.

## Quattro aree vulnerabili agli attacchi quantistici {#four-vulnerable-areas}

A febbraio 2026, Vitalik Buterin [ha pubblicato una roadmap](https://x.com/VitalikButerin/status/2027075026378543132) che identifica quattro aree distinte della crittografia di Ethereum che necessitano di aggiornamenti post-quantistici. Ognuna presenta sfide diverse e percorsi di soluzione differenti.

### 1. Firme BLS del livello di consenso {#consensus-bls}

**Cosa fa**: Il protocollo [Proof-of-Stake (PoS)](/glossary/#pos) di Ethereum utilizza le firme BLS per aggregare i voti di centinaia di migliaia di validatori. BLS consente di combinare molte firme in una sola, mantenendo la rete efficiente.

**Perché è vulnerabile**: Le firme BLS si basano su accoppiamenti di curve ellittiche, che un computer quantistico potrebbe violare.

**L'approccio**: La roadmap Lean Consensus include lo sviluppo di due strumenti complementari:
- **leanXMSS**: Ethereum sostituirà le firme BLS con leanXMSS, uno schema di firma basato su hash per i validatori. Le firme basate su hash sono considerate sicure dal punto di vista quantistico perché si basano solo sulla sicurezza delle funzioni di hash, che i computer quantistici indeboliscono ma non violano.
- **leanVM**: Una zkVM (macchina virtuale a conoscenza zero) minimale per l'aggregazione delle firme basata su SNARK. Poiché le firme basate su hash sono significativamente più grandi (circa 3.000 byte rispetto ai 96 byte per BLS), il passaggio a leanXMSS produrrebbe molti più dati per slot. Per risolvere questo problema, leanVM funge da motore di aggregazione, comprimendo i dati di 250 volte. Ciò preserva i vantaggi in termini di efficienza derivanti dalla combinazione di molte firme in una sola, anche dopo il passaggio a schemi sicuri dal punto di vista quantistico.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

La proprietà di aggregazione che rende BLS efficiente (combinare centinaia di migliaia di firme in una sola) non ha un equivalente ovvio sicuro dal punto di vista quantistico. Le firme post-quantistiche sono anche molto più grandi delle firme BLS. Sostituire semplicemente l'una con l'altra renderebbe il livello di consenso di Ethereum significativamente più lento e costoso. Ecco perché il team sta costruendo leanVM, uno strumento che utilizza prove a conoscenza zero per aggregare in modo efficiente le firme sicure dal punto di vista quantistico.

</ExpandableCard>

### 2. Disponibilità dei dati: commitment KZG {#data-availability-kzg}

**Cosa fa**: I commitment polinomiali KZG garantiscono che i dati (in particolare i dati [blob](/glossary/#blob) dai rollup) siano disponibili sulla rete senza richiedere a ogni nodo di scaricarli tutti.

**Perché è vulnerabile**: I commitment KZG si basano su accoppiamenti di curve ellittiche, la stessa struttura matematica che i computer quantistici possono attaccare.

**Mitigazione attuale**: I commitment KZG utilizzano una "configurazione attendibile" (trusted setup) in cui molti partecipanti hanno contribuito con casualità. Finché almeno un partecipante è stato onesto e ha scartato il proprio segreto, la configurazione è sicura, anche contro i computer quantistici che tentano di decodificarla a posteriori.

**Soluzione a lungo termine**: Sostituire KZG con uno schema di commitment sicuro dal punto di vista quantistico. I due candidati principali sono:
- **Commitment basati su STARK**: Si basano su funzioni di hash piuttosto che su curve ellittiche. Già utilizzati in alcuni ZK-rollup.
- **Commitment basati su reticoli**: Si basano sulla difficoltà dei problemi sui reticoli, che si ritiene siano resistenti ai quanti.

Entrambi gli approcci sono ancora in fase di ricerca per quanto riguarda l'efficienza e la praticità su scala Ethereum.

### 3. Firme degli account: ECDSA {#eoa-signatures}

**Cosa fa**: Ogni account Ethereum standard (account di proprietà esterna, o [EOA](/glossary/#eoa)) utilizza l'ECDSA sulla curva secp256k1 per firmare le transazioni. Questo è ciò che protegge i tuoi fondi.

**Perché è vulnerabile**: Per qualsiasi account che ha inviato una transazione, la chiave pubblica è esposta onchain. Un computer quantistico potrebbe derivare la chiave privata da questi dati della chiave pubblica esposti.

**Sfumatura importante**: Gli account che hanno solo ricevuto ether e non hanno mai inviato una transazione non hanno esposto la loro chiave pubblica. È visibile solo l'indirizzo (un hash della chiave pubblica), il che fornisce una protezione aggiuntiva.

**L'approccio**: Piuttosto che una singola migrazione a livello di protocollo, Ethereum prevede di utilizzare l'[astrazione dell'account](/roadmap/account-abstraction/) (nello specifico l'EIP-8141, in fase di valutazione per Hegotá nella seconda metà del 2026) per offrire agli utenti l'**agilità della firma**. I singoli account potrebbero passare a uno schema di firma post-quantistico senza aspettare che l'intero protocollo cambi.

Questo è un approccio pragmatico. Gli utenti e i portafogli che desiderano una protezione post-quantistica in anticipo possono adottarla volontariamente, mentre la migrazione più ampia avviene nel tempo.

### 4. Prove a conoscenza zero (ZK) a livello di applicazione {#zk-proofs}

**Cosa fa**: I sistemi di prove a conoscenza zero sono utilizzati dai rollup layer 2 (L2) e da altre applicazioni per verificare i calcoli senza rivelare i dati sottostanti.

**Perché è vulnerabile**: Molti popolari sistemi di prove ZK (SNARK che utilizzano accoppiamenti di curve ellittiche) si basano su presupposti vulnerabili ai quanti.

**L'approccio**: Gli STARK, che si basano su funzioni di hash piuttosto che su curve ellittiche, sono già resistenti ai quanti e sono utilizzati da diversi rollup. La naturale adozione da parte dell'ecosistema di sistemi basati su STARK sta già fornendo sicurezza post-quantistica a livello di applicazione.

## Standard del NIST {#nist-standards}

Ad agosto 2024, il National Institute of Standards and Technology (NIST) degli Stati Uniti [ha finalizzato tre standard di crittografia post-quantistica](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Questi sono importanti perché forniscono all'intera industria tecnologica, incluso Ethereum, un set condiviso di algoritmi verificati su cui basarsi, piuttosto che ogni progetto inventi i propri.

| Standard | Nome | Tipo | Caso d'uso |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Basato su reticoli | Incapsulamento delle chiavi (scambio di chiavi) |
| FIPS 204 | ML-DSA (Dilithium) | Basato su reticoli | Firme digitali |
| FIPS 205 | SLH-DSA (SPHINCS+) | Basato su hash | Firme digitali |

Questi standard forniscono una base per la transizione post-quantistica dell'industria in generale. Il lavoro di Ethereum si basa su di essi e li estende, con particolare attenzione alle sfide uniche di una rete decentralizzata in cui l'efficienza e l'aggregazione sono importanti.

## L'approccio della Fondazione Ethereum {#ef-approach}

La Fondazione Ethereum ha formato un team dedicato alla sicurezza post-quantistica a gennaio 2026, guidato da Thomas Coratger. Il lavoro del team è tracciato pubblicamente su [pq.ethereum.org](https://pq.ethereum.org).

### Attività attuale (ad aprile 2026) {#current-activity}

- **Devnet di interoperabilità settimanali**: Più di 10 team di client partecipano a test regolari di interoperabilità post-quantistica, tra cui Lighthouse, Grandine, Zeam, Ream Labs e PierTwo.
- **Premio Poseidon**: Un premio di ricerca da 1 milione di dollari mirato a miglioramenti nelle primitive crittografiche basate su hash.
- **Implementazioni open source**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) e leanMultisig sono tutti disponibili sotto l'[organizzazione GitHub leanEthereum](https://github.com/leanEthereum).
- **2° Ritiro Annuale di Ricerca PQ**: Previsto dal 9 al 12 ottobre 2026 a Cambridge, Regno Unito.
- **Allineamento NIST**: Il lavoro di Ethereum si basa sugli standard di crittografia post-quantistica finalizzati dal NIST ad agosto 2024 (come ML-KEM, ML-DSA e SLH-DSA).

### Tappe fondamentali della migrazione {#migration-milestones}

Il team ha delineato una serie di aggiornamenti del protocollo per introdurre in modo incrementale la crittografia post-quantistica in Ethereum. Queste sono tappe di pianificazione, non impegni garantiti. I nomi e l'ordine potrebbero cambiare.

| Tappa fondamentale | Cosa introduce |
|-----------|--------------------|
| I* | Registro delle chiavi PQ. I validatori possono registrare chiavi pubbliche post-quantistiche insieme alle chiavi BLS esistenti. |
| J* | Precompilati per la verifica delle firme PQ. I contratti intelligenti (smart contract) e i portafogli possono verificare le firme PQ in modo nativo. |
| L* | Attestazioni PQ e prove del livello di consenso in tempo reale tramite leanVM. I validatori iniziano a utilizzare le firme PQ per il consenso. |
| M* | Aggregazione completa delle firme PQ e commitment blob sicuri per PQ. |

**Obiettivo**: Le tappe strutturate degli hard fork mirano al completamento dell'infrastruttura post-quantistica di base entro circa il 2029. La migrazione completa del livello di esecuzione e dell'ecosistema si estende oltre tale data.

## Cosa devono fare gli utenti? {#what-users-need-to-do}

**Al momento: nulla.** I tuoi fondi sono al sicuro. Nessun computer quantistico oggi può minacciare la crittografia di Ethereum.

**In futuro**: Una volta che gli schemi di firma post-quantistica saranno ampiamente supportati su Ethereum (previsto in seguito all'hard fork Hegotá e all'implementazione dell'EIP-8141), vorrai migrare il tuo account verso firme sicure dal punto di vista quantistico. Il software del portafoglio ti guiderà attraverso questa transizione.

Se il tuo account non ha mai inviato una transazione (il che significa che la tua chiave pubblica non è stata esposta onchain), ha un ulteriore livello di protezione. Ma tutti gli account dovrebbero prima o poi migrare.

La questione di come gestire i portafogli inattivi (account i cui proprietari potrebbero non essere consapevoli della necessità di migrare) è un argomento di governance aperto. La comunità di Ethereum non ha ancora raggiunto un consenso al riguardo.

## Domande frequenti {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**No.** Nessun computer quantistico oggi può violare la crittografia di Ethereum. L'hardware quantistico attuale è lontano dalla scala necessaria. Il lavoro descritto in questa pagina è una preparazione per il futuro, non una risposta a una minaccia attiva.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Le stime variano. La ricerca di Google di marzo 2026 suggerisce che l'hardware necessario per violare la crittografia a curva ellittica a 256 bit potrebbe arrivare al più presto verso la fine di questo decennio, ma rimangono sfide ingegneristiche significative. La maggior parte dei ricercatori considera che una minaccia realistica sia lontana almeno diversi anni. La risposta onesta è che nessuno conosce la tempistica esatta, ed è proprio per questo che prepararsi ora è importante.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Prima o poi, sì. Una volta che gli schemi di firma post-quantistica saranno disponibili su Ethereum, gli utenti vorranno migrare i propri account. Il software del portafoglio probabilmente gestirà questa transizione per te. Per ora, non c'è nulla che tu debba fare. Quando sarà necessaria un'azione, la comunità di Ethereum e gli sviluppatori di portafogli forniranno indicazioni e strumenti chiari.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Gli asset su Ethereum sono controllati dalle firme degli account. Una volta che il tuo account è migrato a uno schema di firma sicuro dal punto di vista quantistico, tutto ciò che si trova in quell'account è protetto. Non è necessario migrare ogni asset singolarmente. I contratti intelligenti che detengono fondi (come i protocolli di finanza decentralizzata (DeFi)) potrebbero aver bisogno dei propri aggiornamenti a seconda delle primitive crittografiche che utilizzano internamente.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

No. Ethereum ha uno dei programmi post-quantistici più strutturati di qualsiasi blockchain: un team dedicato, ricerca finanziata, devnet settimanali e una roadmap di migrazione pubblicata, trattando l'informatica quantistica come un vincolo di progettazione di prim'ordine. Nessuna blockchain ha ancora completato una transizione post-quantistica completa. Secondo le stime della Fondazione Ethereum, l'esposizione dei fondi inattivi vulnerabili ai quanti di Ethereum è di circa lo 0,1%, drasticamente inferiore rispetto ad altre importanti reti blockchain.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Raccogli ora, decripta dopo" (Harvest now, decrypt later) è un attacco in cui qualcuno registra dati cifrati o chiavi pubbliche esposte oggi, per poi violare la cifratura in seguito, una volta che esisterà un computer quantistico abbastanza potente. Per Ethereum, questo è più rilevante per gli account le cui chiavi pubbliche sono già esposte onchain (qualsiasi account che ha inviato una transazione). Questo è uno dei motivi per cui la comunità tratta la migrazione post-quantistica come sensibile al fattore tempo, anche se la minaccia quantistica non è ancora immediata.

</ExpandableCard>

## Letture consigliate {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Fondazione Ethereum_
- [Progetto di crittografia post-quantistica](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Standard di crittografia post-quantistica del NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Salvaguardare le criptovalute divulgando responsabilmente le vulnerabilità quantistiche](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Le frontiere quantistiche potrebbero essere più vicine di quanto sembrino](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG e configurazioni attendibili](/roadmap/danksharding/#what-is-kzg)
- [Risorse del workshop leanVM + PQ della Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Chiamate di approfondimento ACD sulle firme delle transazioni PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Fondazione Ethereum_
- [Chiamate di approfondimento ACD sull'interoperabilità PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Fondazione Ethereum_
- [Playlist YouTube su Lean Ethereum e sicurezza post-quantistica](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Fondazione Ethereum_
- [Intervista di gruppo sulla resistenza post-quantistica](https://youtu.be/5DRDjeMmOPw) - _Podcast Bankless_
- [Astrazione dell'account su Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Architettura EF_
- [Superpositioned: Analisi dell'industria dell'informatica quantistica](https://www.superpositioned.co/) - _Saneel Sreeni_