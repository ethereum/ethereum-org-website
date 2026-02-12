---
title: Tecnologia del validatore distribuito
description: "La tecnologia del validatore distribuito consente l'operazione distribuita di un validatore di Ethereum da più parti."
lang: it
---

# Tecnologia del validatore distribuito {#distributed-validator-technology}

La tecnologia del validatore distribuito (DVT) è un approccio alla sicurezza del validatore che distribuisce le responsabilità di gestione delle chiavi e firma tra più parti, per ridurre i singoli punti di guasto e incrementare la resilienza del validatore.

Lo fa **dividendo la chiave privata** utilizzata per proteggere un validatore **tra molti computer** organizzati in un "cluster". Il vantaggio è che rende molto difficile, per gli utenti malevoli, l'ottenimento dell'accesso alla chiave, poiché non è memorizzata per intero su una singola macchina. Inoltre, consente a certi nodi di andare offline, poiché la firma necessaria è effettuabile da un sottoinsieme di macchine, in ogni cluster. Ciò riduce i singoli punti di guasto dalla rete, rendendo l'intero validatore più robusto.

![Un diagramma che mostra come la chiave di un singolo validatore viene suddivisa in parti di chiave e distribuita a più nodi con componenti differenti.](./dvt-cluster.png)

## Perché ci occorre la DVT? {#why-do-we-need-dvt}

### Sicurezza {#security}

I validatori generano due coppie di chiavi pubblica-privata: le chiavi del validatore per partecipare al consenso e le chiavi di prelievo per accedere ai fondi. Mentre i validatori possono proteggere le chiavi di prelievo nell'archiviazione a freddo, le chiavi private del validatore devono essere sempre online. Se una chiave privata del validatore è compromessa, un utente malevolo può controllare il validatore, portando potenzialmente al frazionamento o alla perdita degli ETH dello staker. La DVT può aiutare a mitigare tale rischio. Ecco come:

Utilizzando la DVT, gli staker possono partecipare allo staking mantenendo la chiave privata del validatore in archiviazione a freddo. Ciò è possibile crittografando la chiave originale del validatore completo e quindi dividendola in parti. Le parti di chiave risiedono online e sono distribuite a più nodi, che consentono l'operazione distribuita del validatore. Ciò è possibile perché i validatori di Ethereum utilizzano le firme BLS, che sono additive, il che significa che la chiave intera è ricostruibile sommandone le parti componenti. Ciò consente allo staker di mantenere in sicurezza offline la chiave "principale" del validatore intera e originale.

### Nessun singolo punto di errore {#no-single-point-of-failure}

Quando un validatore è diviso tra più operatori e macchine, può resistere a singoli guasti hardware e software, senza andare offline. Il rischio di guasti è inoltre riducibile utilizzando configurazioni hardware e software differenti tra i nodi di un cluster. Questa resilienza non è disponibile per le configurazioni del validatore a nodo singolo; proviene dal livello della DVT.

Se uno dei componenti di una macchina in un cluster si guasta (ad esempio, se ci sono quattro operatori in un cluster del validatore e uno utilizza un client specifico avente un bug), gli altri assicurano che il validatore resti in esecuzione.

### Decentralizzazione {#decentralization}

Lo scenario ideale per Ethereum è avere quanti più validatori operati indipendentemente possibili. Tuttavia, alcuni fornitori di staking sono diventati molto popolari e rappresentano una porzione sostanziale degli ETH in staking totali sulla rete. La DVT può consentire a questi operatori di esistere, preservando la decentralizzazione dello stake. Questo perché le chiavi per ogni validatore sono distribuite tra molte macchine, e sarebbe necessaria una collusione molto maggiore, affinché un validatore diventi dannoso.

Senza la DVT, è più facile per i fornitori di staking supportare soltanto una o due configurazioni del clirnt per tutti i loro validatori, incrementando l'impatto di un bug del client. La DVT è utilizzabile per diffondere il rischio tra più configurazioni del client e hardware differenti, creando resilienza tramite la diversità.

**La DVT offre i seguenti benefici a Ethereum:**

1. **Decentralizzazione** del consenso proof-of-stake di Ethereum
2. Garantisce la **vitalità** della rete
3. Crea la **tolleranza ai guasti** del validatore
4. **Operatività a fiducia minimizzata** del validatore
5. **Minimizzazione dei rischi di slashing** e di inattività
6. **Migliora la diversità** (client, data center, posizione, regolamentazione, ecc.)
7. **Maggiore sicurezza** della gestione delle chiavi del validatore

## Come funziona la DVT? {#how-does-dvt-work}

Una soluzione DVT contiene i seguenti componenti:

- **[Condivisione del segreto di Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - I validatori usano le [chiavi BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Le singole "azioni chiave" BLS sono combinabili in una singola chiave aggregata (firma). Nella DVT, la chiave privata per un validatore è la firma BLS combinata di ogni operatore nel cluster.
- **[Schema di firma a soglia](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina il numero di singole parti di chiave necessarie per gli obblighi di firma, ad es., 3 su 4.
- **[Generazione di chiavi distribuita (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo crittografico che genera le parti di chiave e viene utilizzato per distribuire le parti di una chiave del validatore esistente o nuova ai nodi in un cluster.
- **[Calcolo multipartitico (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La chiave completa del validatore viene generata in segreto utilizzando il calcolo multipartitico. La chiave intera non è mai nota ad alcun singolo operatore, che ne conosce solo la propria parte (la propria "quota").
- **Protocollo di consenso** - Il protocollo di consenso seleziona un nodo che funga da propositore di blocchi. Condividono il blocco con altri nodi nel cluster che aggiungono le proprie parti di chiave alla firma aggregata. Quando sono state aggregate abbastanza parti di chiave, il blocco viene proposto su Ethereum.

I validatori distribuiti hanno una tolleranza al guasto integrata e possono continuare a funzionare anche se alcuni nodi singoli sono offline. Ciò significa che il cluster è resiliente anche se alcuni dei nodi al suo interno risultano essere dannosi o "pigri".

## Casi d'uso della DVT {#dvt-use-cases}

La DVT ha implicazioni significative per il più ampio settore dello staking:

### Staker individuali {#solo-stakers}

Inoltre, la DVT consente lo staking non custodito, permettendoti di distribuire la chiave del tuo validatore tra i nodi remoti pur mantenendo la chiave completa interamente offline. Ciò significa che gli staker domestici non devono per forza sborsare per l'hardware distribuendo le parti di chiave che aiutano a rafforzarli contro potenziali attacchi.

### Staking come servizio (SaaS) {#saas}

Gli operatori (quali gruppi di staking e staker istituzionali) che gestiscono molti validatori, possono utilizzare la DVT per ridurre i propri rischi. Distribuendo la propria infrastruttura, possono aggiungere ridondanza alle proprie operazioni e diversificare i tipi di hardware che utilizzano.

La DVT condivide la responsabilità della gestione delle chiavi tra più nodi, a significare che anche i costi operativi sono condivisibili. La DVT, inoltre, può ridurre il rischio operativo e i costi assicurativi per i fornitori di staking.

### Pool di staking {#staking-pools}

A causa delle configurazioni standard dei validatori, i gruppi di staking e i fornitori di staking liquido sono costretti ad avere livelli variabili di fiducia nel singolo operatore, poiché guadagni e perdite sono socializzati in tutto il gruppo. Inoltre, si affidano agli operatori per salvaguardare le chiavi di firma, poiché, finora, non c'erano altre opzioni per farlo.

Anche se, tradizionalmente, si compiono sforzi per suddividere il rischio distribuendo gli stake tra più operatori, ogni operatore gestisce ancora indipendentemente uno stake significativo. Affidarsi a un singolo operatore pone rischi immensi se ha performance ridotte, riscontra tempi di inattività, viene compromesso o agisce in modo dannoso.

Facendo leva sulla DVT, la fiducia degli operatori è richiesta molto meno. **I pool possono consentire agli operatori di detenere stake senza aver bisogno della custodia delle chiavi del validatore** (poiché vengono utilizzate solo le parti di chiave). Inoltre, consente agli stake gestiti di essere distribuiti tra più operatori (es., invece di avere un singolo operatore che gestisce 1000 validatori, la DVT consente a tali validatori di essere eseguiti collettivamente da più operatori). Diverse configurazioni dell'operatore assicureranno che se un operatore dovesse divenire inattivo, gli altri potrebbero comunque attestare. Questo risulta in ridondanza e diversificazione, che comporta prestazioni e resilienza migliori, pur massimizzando le ricompense.

Un altro beneficio per minimizzare la fiducia del singolo operatore è che i gruppi di staking possono consentire una partecipazione dell'operatore più aperta e priva di autorizzazioni. Così, i servizi possono ridurre il rischio e supportare la decentralizzazione di Ethereum, utilizzando serie di operatori curate e prive di autorizzazioni, ad esempio associando gli staker domestici o minori a quelli più grandi.

## Potenziali svantaggi dell'utilizzo della DVT {#potential-drawbacks-of-using-dvt}

- **Componente aggiuntivo** - l'introduzione di un nodo DVT aggiunge un'altra parte che può essere difettosa o vulnerabile. Un modo per mitigare tale problema è sforzarsi per maggiori implementazioni di un nodo DVT, quindi, di più client DVT (analogamente al fatto che esistono più client per i livelli del consenso e dell'esecuzione).
- **Costi operativi** - poiché la DVT distribuisce il validatore tra più parti, sono necessari più nodi per il funzionamento invece di un singolo nodo, il che introduce un aumento dei costi operativi.
- **Latenza potenzialmente aumentata** - poiché la DVT utilizza un protocollo di consenso per raggiungere il consenso tra i più nodi che gestiscono un validatore, può potenzialmente introdurre una maggiore latenza.

## Ulteriori letture {#further-reading}

- [Specifiche del validatore distribuito di Ethereum (di alto livello)](https://github.com/ethereum/distributed-validator-specs)
- [Specifiche tecniche del validatore distribuito di Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [App demo della condivisione del segreto di Shamir](https://iancoleman.io/shamir/)
