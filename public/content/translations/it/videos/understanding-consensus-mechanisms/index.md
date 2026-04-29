---
title: "Comprendere i meccanismi di consenso della blockchain"
description: "Una spiegazione che copre i principali meccanismi di consenso utilizzati nelle blockchain e come consentono alle reti decentralizzate di concordare sullo stato delle transazioni senza un'autorità centrale."
lang: it
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consenso"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Meccanismi di consenso"
---

Una spiegazione di **Tech in Asia** che copre i tre principali meccanismi di consenso utilizzati nei sistemi blockchain, la Prova di lavoro (PoW), la Proof-of-Stake (PoS) e la prova di autorità (PoA), e come consentono alle reti decentralizzate di concordare sullo stato delle transazioni.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=ojxfbN78WFQ) pubblicata da Tech in Asia. È stata leggermente modificata per facilitarne la lettura.*

#### Cosa sono i meccanismi di consenso? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain: la parola del momento del 2018. Ma sai come un sistema peer-to-peer decentralizzato senza una figura autoritaria prende le decisioni? La risposta risiede nei meccanismi di consenso. Esistono vari meccanismi di consenso, ma servono tutti allo stesso scopo: garantire che i registri siano veri e onesti. La differenza sta nel modo in cui viene raggiunto il consenso. Qui esploreremo tre tipi di meccanismi di consenso.

#### Prova di lavoro (PoW) (0:23) {#proof-of-work-023}

In un sistema di Prova di lavoro (PoW), i dati della transazione sono archiviati in blocchi, validati facendo risolvere alle persone un complicato problema matematico ad essi associato. Questo viene in genere fatto da computer potenti ed è noto come "minaggio". Una ricompensa sotto forma di criptovaluta viene emessa al primo minatore che risolve il problema.

Immagina un gruppo di cacciatori di tesori che cerca di aprire un forziere con una serratura complicata. Capire la combinazione corretta è noioso, ma la prima persona a farlo viene ricompensata. In parole povere, la Prova di lavoro (PoW) è una gara per capire la giusta combinazione di un forziere. Criptovalute come Bitcoin ed Ethereum utilizzano un meccanismo di Prova di lavoro (PoW).

#### Proof-of-Stake (PoS) (1:04) {#proof-of-stake-104}

Successivamente, abbiamo la Proof-of-Stake (PoS). Qui il creatore di un nuovo blocco, noto anche come validatore, viene scelto casualmente in base a quanto stake vincola alla rete. Maggiore è lo stake piazzato, maggiore è la possibilità di essere selezionati come validatore.

Applichiamo questo allo scenario del forziere. Immagina un gruppo di cacciatori di tesori in lizza per un forziere. Il forziere viene assegnato in base a un sistema di lotteria. Per partecipare, ogni cacciatore deve acquistare dei biglietti della lotteria. Più ogni cacciatore ne acquista, maggiore è la possibilità di vincere. Protocolli blockchain come Ouroboros di Cardano ed EOS adottano il consenso Proof-of-Stake (PoS).

#### Prova di autorità (PoA) (1:42) {#proof-of-authority-142}

Infine, la prova di autorità (PoA): una forma modificata di Proof-of-Stake (PoS). Qui, solo le parti approvate e selezionate in base alla loro reputazione possono diventare validatori.

Rivediamo lo scenario del forziere. Il gruppo di cacciatori di tesori forma un'unione e mette in comune i propri tesori. In base al loro livello di affidabilità, pochi eletti vengono nominati dal gruppo per garantire la validità del contenuto del forziere. Hyperledger Fabric di IBM e la testnet Kovan di Ethereum sono alcuni esempi di sistemi blockchain che utilizzano la prova di autorità (PoA).

#### Modelli di consenso ibridi (2:14) {#hybrid-consensus-models-214}

Mentre le aziende blockchain tradizionali si basano su un singolo meccanismo di consenso, alcune più innovative stanno adottando protocolli di consenso multipli. Prendi ad esempio la Opet Foundation, che sta costruendo una blockchain unica per archiviare i dati raccolti sulla sua app chatbot di supporto allo studio applicando sia i protocolli di prova di autorità (PoA) che di Prova di lavoro (PoW).

Dati come i registri accademici, extracurriculari e di profilazione della personalità degli studenti sono archiviati sulla blockchain e potenzialmente validati tramite un framework di prova di autorità (PoA) basato su Hyperledger Fabric. I validatori, in questo caso, sono istituzioni educative rispettabili o persino uffici di registrazione nazionali e i rispettivi ministeri dell'istruzione. Questo aiuta a garantire che tutti i dati degli studenti siano affidabili.

Ma chi lavorerà gratis? Il consenso di Prova di lavoro (PoW) entra in gioco per dare una ricompensa ai validatori che hanno svolto il lavoro.

#### Privacy e dati degli studenti (3:02) {#privacy-and-student-data-302}

Con Hyperledger Fabric, ogni record dello studente è protetto con una chiave hash privata di proprietà dello studente. È possibile accedere ai dati solo quando lo studente fornisce la chiave univoca. Ciò significa che la privacy dello studente è preservata e controllata dallo studente stesso.

Ad esempio, quando gli studenti fanno domanda all'università tramite la piattaforma di Opet, forniscono la chiave univoca dei loro record all'università. Con essa, l'università è in grado di accedere ai loro ultimi record accademici. Gli studenti potranno anche vedere se i loro record sono stati sbloccati o almeno presi in considerazione per la domanda. Questo aumenta l'efficienza e la trasparenza rispetto ai metodi tradizionali.

#### Conclusione (3:37) {#closing-337}

Unendo i modelli di Prova di lavoro (PoW) e prova di autorità (PoA), la soluzione blockchain della Opet Foundation garantisce la privacy sui dati degli studenti incentivando al contempo sia le istituzioni educative che gli studenti quando contribuiscono alla piattaforma. Con le blockchain che guadagnano popolarità, è solo questione di tempo prima di vedere creati sistemi ibridi ancora più unici.