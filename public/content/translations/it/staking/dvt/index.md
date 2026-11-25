---
title: Tecnologia dei validatori distribuiti
description: La tecnologia dei validatori distribuiti consente l'operatività distribuita di un validatore di Ethereum da parte di più soggetti.
lang: it
template: staking
sidebarDepth: 2
summaryPoints:
  - Suddivide la chiave di firma di un validatore su più macchine e operatori, rimuovendo i singoli punti di errore
  - Mantiene i validatori online nonostante i guasti individuali di hardware, software o degli operatori
  - Infrastruttura di produzione utilizzata oggi da chi fa solo staking, servizi di staking e pool di staking
---

## Cos'è la tecnologia dei validatori distribuiti? {#what-is-dvt}

La tecnologia dei validatori distribuiti (DVT) è un approccio alla sicurezza dei validatori che distribuisce la gestione delle chiavi e le responsabilità di firma tra più parti, per ridurre i singoli punti di errore e aumentare la resilienza del validatore.

La DVT distribuisce la gestione delle chiavi e la firma **suddividendo la chiave privata** utilizzata per proteggere un validatore **su molti computer** organizzati in un "cluster". In questo modo, alcuni nodi del cluster possono andare offline mantenendo attivo il nodo validatore, poiché il lavoro di convalida necessario può essere svolto da un sottoinsieme delle macchine in ciascun cluster. Questa distribuzione riduce i singoli punti di errore, rendendo il validatore più robusto. Un ulteriore vantaggio della distribuzione della firma della DVT è che rende molto difficile per gli aggressori ottenere l'accesso alla chiave, poiché non è archiviata per intero su nessuna singola macchina.

![Un diagramma che mostra come una singola chiave del validatore viene suddivisa in porzioni di chiave e distribuita a più nodi con componenti diversi.](./dvt-cluster.png)

La DVT non è un modo separato di fare staking. È un livello software che qualsiasi configurazione di staking può utilizzare:
- Chi fa [solo staking](/staking/solo/) può fare squadra per eseguire un validatore insieme, oppure un singolo operatore di solo staking può utilizzare la DVT per aggiungere resilienza alla propria configurazione di solo staking.
- I [servizi di staking](/staking/saas/) e le [pool di staking](/staking/pools/) possono utilizzare la DVT per aggiungere resilienza e rafforzare la propria infrastruttura di staking, o per distribuire le operazioni del validatore tra molti operatori indipendenti.

## Perché abbiamo bisogno della DVT? {#why-do-we-need-dvt}

### Sicurezza {#security}

I validatori generano due coppie di chiavi pubbliche-private: le chiavi del validatore per partecipare al consenso e le chiavi di prelievo per accedere ai fondi. Mentre i validatori possono proteggere le chiavi di prelievo in cold storage, le chiavi private del validatore devono essere online 24 ore su 24, 7 giorni su 7, per firmare i compiti assegnati al validatore in ogni momento, come le attestazioni e le proposte di blocco. Mantenere una chiave online la espone al furto e la DVT limita tale esposizione: solo le porzioni di chiave (key shares) sono online, mai la chiave completa.

Se la chiave privata di un validatore viene compromessa, un aggressore può controllare il validatore, portando potenzialmente allo slashing o alla perdita degli ETH di chi fa staking. La DVT mitiga questo rischio. Con la DVT, la chiave originale e completa del validatore viene crittografata e suddivisa in porzioni di chiave. Le porzioni di chiave vivono online, distribuite su più nodi che gestiscono insieme il validatore, mentre la chiave 'master' completa rimane al sicuro offline. La distribuzione è possibile perché i validatori di [Ethereum](/) utilizzano firme BLS che sono additive, il che significa che la chiave completa può essere ricostruita sommando le sue parti componenti. Le firme parziali effettuate con le porzioni di chiave si combinano in una firma valida per la chiave completa, quindi la chiave completa stessa non è mai necessaria per la firma quotidiana. Quando un cluster genera una nuova chiave del validatore utilizzando la generazione distribuita delle chiavi, la chiave privata completa non esiste mai su nessuna singola macchina.

### Nessun singolo punto di errore {#no-single-point-of-failure}

Quando un validatore è diviso tra più operatori e più macchine, può resistere a guasti hardware e software individuali senza andare offline. Il rischio di guasti può anche essere ridotto utilizzando diverse configurazioni hardware e software tra i nodi di un cluster. La distribuzione multi-operatore non è disponibile nativamente per le configurazioni di validatori a nodo singolo; deriva dal livello middleware della DVT.

Se uno dei componenti di una macchina in un cluster si guasta (ad esempio, se ci sono quattro operatori in un cluster di validatori e uno utilizza un client specifico che ha un bug), gli altri possono garantire che il validatore continui a funzionare.

### Decentralizzazione {#decentralization}

Lo scenario ideale per Ethereum è avere il maggior numero possibile di validatori gestiti in modo indipendente. Tuttavia, alcuni fornitori di staking sono diventati molto popolari e rappresentano una parte sostanziale degli ETH totali in staking sulla rete. La DVT può consentire a questi operatori di esistere preservando la decentralizzazione dello stake. Questo perché le chiavi per ogni validatore sono distribuite su molte macchine e ci vorrebbe una collusione molto maggiore affinché un validatore diventi malevolo.

Senza la DVT, è più facile per i fornitori di staking supportare solo una o due configurazioni di client per tutti i loro validatori, aumentando l'impatto di un bug del client. La DVT può essere utilizzata per distribuire il rischio su più configurazioni di client e hardware diversi, creando resilienza attraverso la diversità.

**La DVT offre i seguenti vantaggi a Ethereum:**

1. **Decentralizzazione** del consenso Proof-of-Stake di Ethereum
2. Garantisce la **vitalità** (liveness) della rete
3. Crea **tolleranza agli errori** del validatore
4. Operatività del validatore a **fiducia minimizzata**
5. Rischi di **slashing** e tempi di inattività ridotti al minimo
6. **Migliora la diversità** (client, data center, posizione, regolamentazione, ecc.)
7. **Sicurezza migliorata** della gestione delle chiavi del validatore

## Come funziona la DVT? {#how-does-dvt-work}

Le implementazioni della DVT in genere vengono eseguite come un software aggiuntivo su ciascuna macchina in un cluster. Questo software funge da middleware, posizionandosi tra il client del validatore di un nodo e il suo client di consenso, dove si coordina con gli altri nodi del cluster in modo che i compiti del validatore vengano firmati collettivamente.

Una soluzione DVT contiene i seguenti componenti:

- **[Condivisione del segreto di Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - I validatori utilizzano [chiavi BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). La chiave privata di un validatore può essere suddivisa in più "porzioni di chiave" e, poiché le firme BLS sono additive, le firme parziali effettuate con tali porzioni di chiave possono essere combinate in un'unica firma valida per la chiave completa del validatore.
- **[Schema di firma a soglia](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina il numero di singole porzioni di chiave necessarie per i compiti di firma, ad es. 3 su 4.
- **[Generazione distribuita delle chiavi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo crittografico che genera le porzioni di chiave e viene utilizzato per distribuire le porzioni di una chiave del validatore esistente o nuova ai nodi di un cluster.
- **[Calcolo multipartecipante (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La chiave completa del validatore viene generata in segreto utilizzando il calcolo multipartecipante. La chiave completa non è mai nota a nessun singolo operatore: conoscono solo la propria parte (la loro "porzione").
- **Protocollo di consenso** - Il protocollo di consenso seleziona un nodo come proponente del blocco. Questo condivide il blocco con gli altri nodi del cluster, che aggiungono le loro porzioni di chiave alla firma aggregata. Quando sono state aggregate abbastanza porzioni di chiave, il blocco viene proposto su Ethereum.

I validatori distribuiti hanno una tolleranza agli errori integrata e possono continuare a funzionare anche se alcuni dei singoli nodi vanno offline. Il cluster del nodo validatore è resiliente anche se alcuni dei nodi al suo interno si rivelano malevoli o inattivi.

## La DVT in produzione {#dvt-in-production}

I validatori distribuiti operano oggi sulla Mainnet attraverso il solo staking, i servizi e lo staking in pool. Due reti rappresentano la maggior parte di questa attività:

<ProductDisclaimer />

- **Obol** sviluppa Charon, un client middleware DVT open source che consente a un cluster di macchine di gestire insieme un validatore ("squad staking"). I gruppi eseguono la generazione distribuita delle chiavi e configurano il loro cluster tramite il [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) di Obol. I cluster Obol sono utilizzati in produzione da [protocolli di staking](/staking/pools/) e [servizi di staking](/staking/saas/), tra cui il modulo Simple DVT di Lido e il programma Operation Solo Staker di EtherFi, che integra gli operatori domestici in cluster tolleranti agli errori.
- **SSV Network** è una rete permissionless di operatori di nodi indipendenti. La chiave di un validatore viene suddivisa in porzioni di chiave e distribuita a un insieme scelto di operatori, che eseguono collettivamente i compiti del validatore; nessun singolo operatore detiene mai la chiave completa. I servizi e le pool di staking eseguono grandi insiemi di validatori su SSV e, come Obol, è utilizzato dal modulo Simple DVT di Lido.

## Casi d'uso della DVT {#dvt-use-cases}

La DVT ha implicazioni significative per il più ampio settore dello staking:

### Solo staking {#solo-stakers}

La DVT abilita lo **squad staking**: un piccolo gruppo di persone, come amici, membri della comunità o sconosciuti coordinati tramite un launchpad, che gestiscono collettivamente un singolo validatore sulle proprie macchine. Una soglia del gruppo (ad esempio, 3 su 4) deve essere online affinché il validatore svolga i propri compiti, in modo che il tempo di inattività, il guasto hardware o l'errore di un singolo membro non porti il validatore offline. Quando la chiave viene creata con la generazione distribuita delle chiavi, nessun membro detiene mai la chiave di firma completa.

La DVT abilita anche lo staking non-custodial consentendoti di distribuire la chiave del tuo validatore su nodi remoti mantenendo la chiave completa completamente offline. Ciò significa che chi fa staking non deve necessariamente eseguire il proprio hardware e la distribuzione delle porzioni di chiave aiuta a proteggere da potenziali attacchi informatici.

### Staking come servizio (SaaS) {#saas}

Gli operatori (come le pool di staking e gli staker istituzionali) che gestiscono molti validatori possono utilizzare la DVT per ridurre il proprio rischio. Distribuendo la loro infrastruttura, possono aggiungere ridondanza alle loro operazioni e diversificare i tipi di hardware che utilizzano.

La DVT condivide la responsabilità della gestione delle chiavi su più nodi, il che significa che anche alcuni costi operativi possono essere condivisi. La DVT può anche ridurre il rischio operativo e i costi assicurativi per i fornitori di staking.

### Pool di staking {#staking-pools}

A causa delle configurazioni standard dei validatori, le pool di staking e i fornitori di staking liquido storicamente dovevano riporre una notevole fiducia in ogni singolo operatore, poiché i guadagni e le perdite sono socializzati in tutta la pool. Dipendevano anche dagli operatori per salvaguardare le chiavi di firma perché, fino alla DVT, non c'erano altre opzioni per loro.

Anche se tradizionalmente si compiono sforzi per distribuire il rischio distribuendo gli stake tra più operatori, ogni operatore gestisce comunque uno stake significativo in modo indipendente. Affidarsi a un singolo operatore comporta rischi immensi se le sue prestazioni sono inferiori alle aspettative, se incontra tempi di inattività, se viene compromesso o se agisce in modo malevolo.

Sfruttando la DVT, la fiducia richiesta a ogni singolo operatore può essere ridotta. **Le pool possono consentire agli operatori di detenere stake senza aver bisogno della custodia delle chiavi del validatore** (poiché vengono utilizzate solo le porzioni di chiave). Consente inoltre di distribuire gli stake gestiti tra più operatori (ad es., invece di avere un singolo operatore che gestisce 1000 validatori, la DVT consente a tali validatori di essere gestiti collettivamente da più operatori). Diverse configurazioni degli operatori aiutano a garantire che se un operatore dovesse guastarsi, gli altri saranno comunque in grado di attestare. La ridondanza e la diversificazione risultanti possono portare a prestazioni e resilienza migliori, massimizzando al contempo le ricompense.

Un altro vantaggio nel ridurre al minimo la fiducia nel singolo operatore è che le pool di staking possono consentire una partecipazione degli operatori più aperta e permissionless. Alcune pool di staking lo fanno in produzione oggi. I cluster DVT multi-operatore consentono ai protocolli di accoppiare gli staker domestici e gli operatori più piccoli con quelli professionali più grandi, combinando insiemi di operatori curati e permissionless.

## Potenziali svantaggi dell'utilizzo della DVT {#potential-drawbacks-of-using-dvt}

- **Componente aggiuntivo** - l'introduzione di un nodo DVT aggiunge un'altra parte che può essere potenzialmente difettosa o vulnerabile. Questo viene mitigato avendo più implementazioni del software DVT, proprio come ci sono più client per i livelli di consenso e di esecuzione.
- **Costi operativi** - poiché la DVT distribuisce il validatore tra più parti, sono necessari più nodi per il funzionamento invece di un singolo nodo, il che introduce maggiori costi operativi.
- **Latenza potenzialmente aumentata** - poiché la DVT utilizza un protocollo di consenso per raggiungere il consenso tra i molteplici nodi che gestiscono un validatore, può potenzialmente introdurre una maggiore latenza.

## Domande frequenti {#faq}

<ExpandableCard title="Ho bisogno della DVT per fare staking?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
No. Una singola macchina che esegue un client del validatore funziona senza alcun software DVT, e questa rimane una configurazione comune per lo staking domestico. La DVT è un livello opzionale che aggiunge tolleranza agli errori e rimuove i singoli punti di errore. Questo è utile se vuoi che il tuo validatore sopravviva ai guasti delle singole macchine, o se vuoi condividere la responsabilità di gestire un validatore con altri.
</ExpandableCard>

<ExpandableCard title="La DVT divide i miei ETH o le mie chiavi di prelievo?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
No. La DVT suddivide solo la chiave di _firma_ del validatore, che viene utilizzata per i compiti di consenso come le attestazioni e le proposte di blocco. Il tuo stake è sempre controllato dall'indirizzo di prelievo impostato per il validatore, che non è influenzato dalla DVT. Dall'aggiornamento Pectra, il titolare dell'indirizzo di prelievo può anche attivare un'uscita del validatore direttamente dal livello di esecuzione, senza aver affatto bisogno della chiave di firma.
</ExpandableCard>

<ExpandableCard title="Cosa succede se i nodi di un cluster vanno offline?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Finché una soglia di nodi rimane online (ad esempio, 3 su 4), il validatore continua a svolgere i propri compiti. Se troppi nodi vanno offline contemporaneamente, il validatore va semplicemente offline e perde le ricompense finché non tornano abbastanza nodi, proprio come qualsiasi validatore offline. Andare offline non è un'infrazione passibile di slashing.
</ExpandableCard>

<ExpandableCard title="Un cluster deve essere 3 su 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
No. "3 su 4" è solo la configurazione comune più piccola e viene utilizzata come esempio in questa pagina. La dimensione del cluster e la soglia di firma vengono scelte al momento della creazione del cluster.

I cluster sono solitamente dimensionati in modo che la soglia sia una supermaggioranza di due terzi dei nodi, il che consente al cluster di continuare a firmare tollerando i membri difettosi o offline. Un cluster di 4 nodi firma con 3 e tollera 1 guasto; 7 nodi firmano con 5 e tollerano 2 guasti; 10 nodi firmano con 7 e tollerano 3 guasti. I cluster più grandi ottengono una maggiore tolleranza agli errori al costo di più macchine da eseguire e di un maggiore coordinamento tra di esse.

[Maggiori informazioni sulle dimensioni e la resilienza del cluster](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="La DVT è la stessa cosa dello staking in pool?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
No. Lo staking in pool combina gli ETH di molte persone per finanziare i validatori ed è uno dei vari [modi per fare staking](/staking/). La DVT è un'infrastruttura per _gestire_ un validatore. Distribuisce la firma di un validatore su più macchine e operatori. I due sono complementari; molte pool utilizzano la DVT per distribuire i propri insiemi di operatori, ma la DVT stessa non raggruppa in pool gli ETH di nessuno.
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Tecnologia dei validatori distribuiti (DVT) di Ethereum - Introduzione completa](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Cos'è la DVT e come migliora lo staking su Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Specifiche dei validatori distribuiti di Ethereum (ad alto livello)](https://github.com/ethereum/distributed-validator-specs)
- [Specifiche tecniche dei validatori distribuiti di Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Documentazione di Obol](https://docs.obol.org/)
- [Documentazione di SSV Network](https://docs.ssv.network/)
- [Modulo Simple DVT di Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [App demo della condivisione del segreto di Shamir](https://iancoleman.io/shamir/)