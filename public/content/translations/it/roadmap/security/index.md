---
title: Un Ethereum più sicuro
description: La roadmap di Ethereum rafforza oggi la produzione di blocchi e la resistenza alla censura, preparando al contempo il protocollo per l'era quantistica e per decenni di funzionamento affidabile.
lang: it
image: /images/roadmap/roadmap-security.png
alt: Roadmap di Ethereum
template: roadmap
summaryPoints:
  - Gli aggiornamenti di rafforzamento a breve termine, come la separazione proponente-costruttore (PBS) integrata e le liste di inclusione, sono in fase di sviluppo attivo
  - La preparazione post-quantistica è in corso con anni di anticipo rispetto a qualsiasi minaccia quantistica credibile
  - La semplificazione del protocollo rimuove la complessità e riduce la superficie di attacco di Ethereum
---

Ethereum è già una piattaforma di [smart contract](/glossary/#smart-contract) molto sicura e decentralizzata. La roadmap mira a mantenerla tale per decenni **rafforzando la rete oggi e preparandosi a minacce che potrebbero presentarsi solo tra anni**. Gli aggiornamenti a breve termine sono tracciati su [forkcast.org](https://forkcast.org), mentre la bozza della roadmap a lungo termine è pubblicata su [strawmap.org](https://strawmap.org).

<ExpandableCard title="Ethereum è sicuro oggi?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Sì. Ethereum funziona ininterrottamente dal 2015 senza tempi di inattività. I miglioramenti descritti in questa pagina rendono una rete già sicura più difficile da attaccare, censurare o interrompere.

</ExpandableCard>

## Costruzione di blocchi trustless {#trustless-block-building}

Oggi la maggior parte dei blocchi di Ethereum viene assemblata attraverso una divisione del lavoro: costruttori di blocchi specializzati costruiscono il blocco di maggior valore possibile e il [validatore](/glossary/#validator) di turno propone l'offerta migliore. Questo impedisce che la costruzione professionale di blocchi concentri lo [stake](/glossary/#staking) tra i grandi operatori, ma dal 2022 si basa su software fuori dal protocollo che la rete non può verificare.

La **separazione proponente-costruttore (PBS) integrata (ePBS, o EIP-7732)** sposta questa divisione all'interno del protocollo, eliminando la necessità di fidarsi dei relay, gli intermediari di terze parti che attualmente passano i blocchi tra costruttori e validatori. L'ePBS è uno dei punti salienti dell'imminente aggiornamento [Glamsterdam](/roadmap/glamsterdam/), previsto per il 2026. Non è stata fissata alcuna data per la Mainnet; i team dei client lo stanno testando sulle devnet (reti di test temporanee).

<ButtonLink variant="outline" href="/roadmap/pbs/">Maggiori informazioni sulla separazione proponente-costruttore (PBS)</ButtonLink>

## Resistenza alla censura {#censorship-resistance}

Una rete resistente alla censura significa che nessuno può impedire a una transazione valida di raggiungere la catena. Le **liste di inclusione applicate alla scelta del fork (FOCIL, o EIP-7805)** danno a molti validatori voce in capitolo su ciò che un blocco deve includere: pubblicano liste di transazioni in sospeso che il costruttore di blocchi è tenuto a includere. Nessun singolo attore può escludere silenziosamente la tua transazione.

FOCIL è il punto saliente del livello di consenso di Hegotá, l'aggiornamento che segue Glamsterdam ed è previsto per il 2027. È stato deliberatamente programmato dopo Glamsterdam in modo che ePBS e FOCIL non vengano mai rilasciati come un'unica combinazione non testata. Continua la ricerca sulle mempool crittografate, che nasconderebbero il contenuto delle transazioni in attesa fino alla loro inclusione sicura in un blocco.

## Definitività più rapida {#faster-finality}

Per gli utenti, la [definitività](/glossary/#finality) è il momento in cui una transazione diventa permanente, quando invertirla costerebbe a un utente malintenzionato un'enorme quantità di ETH in staking. Oggi la definitività richiede circa 15 minuti e **i ricercatori vogliono ridurla drasticamente**. Il lavoro è iniziato come definitività a singolo slot, si è evoluto in definitività a tre slot e ora continua come Minimmit, un protocollo di consenso a un round nel programma Lean Ethereum introdotto a luglio 2025. La definitività in pochi secondi è un obiettivo a lungo termine nella bozza della roadmap, previsto all'incirca per il 2029. Questa rimane una ricerca attiva e nessun aggiornamento sulla definitività è ancora stato assegnato a un fork.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Maggiori informazioni sulla ricerca per una definitività più rapida</ButtonLink>

## Validatori resilienti {#resilient-validators}

Un validatore è solitamente una singola macchina che detiene una chiave di firma. La **tecnologia dei validatori distribuiti (DVT)** sostituisce quella singola macchina con un comitato di macchine che condividono la chiave e firmano insieme, in modo che il guasto di un computer o il furto di una chiave non mettano fuori uso il validatore. La DVT è attiva in produzione e utilizzata dagli operatori di staking su larga scala. A gennaio 2026, Vitalik Buterin ha presentato una proposta per una variante semplificata a livello di protocollo chiamata DVT-lite; si tratta di una proposta iniziale senza alcun fork programmato.

La rete si protegge anche attraverso la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/): Ethereum funziona su diverse implementazioni software create in modo indipendente, quindi un bug in un client lascia in piedi il resto della rete.

Due precedenti idee di ricerca, la fusione delle viste (view-merge) e l'elezione segreta del leader, non sono più elementi attivi della roadmap.

<ButtonLink variant="outline" href="/staking/dvt/">Maggiori informazioni sulla tecnologia dei validatori distribuiti (DVT)</ButtonLink>

## Resistenza quantistica {#quantum-resistance}

Ethereum utilizza la [crittografia](/glossary/#cryptography) per mantenere sicura la rete e proteggere i fondi degli utenti. Alla fine, alcuni di questi metodi crittografici saranno **vulnerabili ai computer quantistici**, che possono risolvere specifici problemi matematici in modo esponenzialmente più veloce rispetto alle macchine classiche.

**Oggi nessun computer quantistico può violare la crittografia di Ethereum.** L'hardware necessario non esiste ancora su larga scala. Ma recenti ricerche suggeriscono che il divario si sta colmando più velocemente del previsto. A marzo 2026, Google Quantum AI ha pubblicato un documento in cui si stima che la violazione della crittografia a curva ellittica a 256 bit (il tipo utilizzato da Ethereum per le firme degli account) potrebbe richiedere circa 1.200 qubit logici, circa 20 volte meno rispetto alle stime precedenti.

Le transizioni crittografiche richiedono anni per essere pianificate ed eseguite in sicurezza, quindi la preparazione sta avvenendo ora, molto prima che l'hardware esista. Sono state identificate quattro aree che richiedono aggiornamenti post-quantistici: le firme di consenso dei validatori (BLS), gli schemi di commitment utilizzati per la disponibilità dei dati (KZG), le firme degli account (ECDSA) e i sistemi di prova a conoscenza zero (ZK-proof) utilizzati dai [rollup](/glossary/#rollups).

La Fondazione Ethereum ha formato un **team dedicato alla sicurezza post-quantistica** a gennaio 2026 e il suo lavoro è tracciato pubblicamente su [pq.ethereum.org](https://pq.ethereum.org). Il lavoro attivo include firme dei validatori basate su hash (leanXMSS) abbinate a una zkVM minima (leanVM) che aggrega in modo efficiente le firme quantum-safe più grandi, e devnet di interoperabilità settimanali con più di 10 team di client.

Una parte fondamentale della strategia di transizione è l'**EIP-8141**, che introduce l'[astrazione dell'account](/roadmap/account-abstraction/) nativa. Questo consente ai singoli account di scegliere la propria verifica della firma, il che significa che gli utenti potrebbero passare a firme quantum-safe senza aspettare una singola migrazione a livello di protocollo. L'EIP-8141 è in fase di valutazione per l'aggiornamento Hegotá. Il completamento delle tappe fondamentali dell'infrastruttura post-quantistica è previsto all'incirca per il 2029. Si tratta di obiettivi di pianificazione e potrebbero subire variazioni.

<ExpandableCard title="I computer quantistici possono rubare i miei ETH oggi?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

No. Oggi nessun computer quantistico può violare la crittografia di Ethereum. Il lavoro descritto in questa pagina è una preparazione anticipata per una minaccia che è ancora lontana anni. Quando i portafogli post-quantistici diventeranno disponibili, il software del portafoglio ti guiderà attraverso la migrazione. Per ora, non c'è nulla che tu debba fare.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Maggiori informazioni sulla resistenza quantistica</ButtonLink>

## Protocollo più semplice ed efficiente {#simpler-and-more-efficient-protocol}

La complessità crea opportunità per bug e vulnerabilità. Parte della roadmap si concentra sulla **semplificazione di Ethereum e sulla rimozione del debito tecnico**, in modo che il protocollo sia più facile da mantenere, controllare e analizzare. Un protocollo più semplice offre inoltre agli aggressori una superficie minore da sondare.

Consegnati finora:

- **[Pectra (maggio 2025)](/roadmap/pectra/)**: ha introdotto l'EIP-7702, che consente agli account di proprietà esterna di delegare temporaneamente al codice di uno smart contract, un trampolino di lancio verso la completa astrazione dell'account.
- **[Fusaka (dicembre 2025)](/roadmap/fusaka/)**: ha implementato PeerDAS (EIP-7594), che distribuisce il carico di lavoro della disponibilità dei dati (DA) su tutta la rete. Ha inoltre aumentato i parametri dei blob, espandendo la capacità transazionale dei dati per i rollup.
- **[Dencun (marzo 2024)](/roadmap/dencun/)**: ha introdotto le transazioni blob (EIP-4844) per dati di rollup più economici e ha limitato `SELFDESTRUCT` (EIP-6780) per rimuovere una fonte di complessità di lunga data.
- **[Shapella (aprile 2023)](/staking/withdrawals/)**: ha consentito ai validatori di prelevare gli ETH in staking (EIP-4895), rimuovendo un vincolo iniziale dello staking [Proof-of-Stake (PoS)](/glossary/#pos).
- **London (agosto 2021)**: ha revisionato il prezzo del gas con l'EIP-1559, introducendo una commissione di base e un meccanismo per bruciare le commissioni (burn) per costi di transazione più prevedibili.

In corso:

- **Glamsterdam (previsto per il 2026)**: i punti salienti sono l'ePBS (EIP-7732) e le liste di accesso a livello di blocco (EIP-7928), con la valutazione anche di un riprezzamento del gas.
- **Hegotá (previsto per il 2027)**: FOCIL (EIP-7805) è il punto saliente del livello di consenso. In fase di valutazione per l'inclusione: EIP-8141 (astrazione dell'account nativa).
- **In corso**: gli sforzi per semplificare l'[EVM](/developers/docs/evm/), armonizzare le implementazioni dei client ed eliminare gradualmente le funzionalità deprecate continuano in tutti i team dei client. Il lavoro sull'assenza di stato (che consente ai partecipanti di verificare la catena senza memorizzare tutti i suoi dati) è in fase di riprogettazione attorno ad alberi di hash binari quantum-safe, con l'approccio finale ancora da confermare.

## Progressi attuali {#current-progress}

A metà del 2026:

- **Costruzione di blocchi e resistenza alla censura**: l'ePBS e le liste di accesso a livello di blocco sono in esecuzione sulle devnet di Glamsterdam. FOCIL è pianificato per Hegotá, previsto per il 2027.
- **Definitività**: Minimmit e il più ampio lavoro sul consenso di Lean Ethereum rimangono in fase di ricerca attiva senza ancora alcuna assegnazione a un fork.
- **Resistenza quantistica**: sono in esecuzione devnet di interoperabilità post-quantistica settimanali e le tappe fondamentali dell'infrastruttura principale puntano all'incirca al 2029.
- **Semplificazione**: Pectra e Fusaka sono stati rilasciati; Glamsterdam ed Hegotá portano con sé il prossimo ciclo di pulizie.

Nessuna parte di questo lavoro è terminata e tutte le tempistiche sono stime che potrebbero subire variazioni.

## Letture consigliate {#further-reading}

- [Forkcast: tracker degli aggiornamenti della rete Ethereum](https://forkcast.org)
- [Strawmap: una bozza della roadmap del layer 1 (L1) di Ethereum](https://strawmap.org) - _EF Architecture_
- [Ethereum post-quantistico](https://pq.ethereum.org) - _Fondazione Ethereum_
- [Tracker della roadmap di Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Proof-of-Stake (PoS) e definitività](/developers/docs/consensus-mechanisms/pos/#finality)
- [L'EVM](/developers/docs/evm/)