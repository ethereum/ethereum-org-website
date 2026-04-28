---
title: Tecnologia dei validatori distribuiti
description: "La tecnologia dei validatori distribuiti consente l'operatività distribuita di un validatore di Ethereum da parte di più soggetti."
lang: it
---

# Tecnologia dei validatori distribuiti {#distributed-validator-technology}

La tecnologia dei validatori distribuiti (DVT) è un approccio alla sicurezza dei validatori che distribuisce la gestione delle chiavi e le responsabilità di firma tra più parti, per ridurre i singoli punti di guasto e aumentare la resilienza dei validatori.

Lo fa **dividendo la chiave privata** utilizzata per proteggere un validatore **tra molti computer** organizzati in un "cluster". Il vantaggio di questo è che rende molto difficile per gli aggressori ottenere l'accesso alla chiave, perché non è memorizzata per intero su nessuna singola macchina. Consente inoltre ad alcuni nodi di andare offline, poiché la firma necessaria può essere eseguita da un sottoinsieme delle macchine in ogni cluster. Questo riduce i singoli punti di guasto dalla rete e rende l'intero set di validatori più robusto.

![Un diagramma che mostra come una singola chiave del validatore viene divisa in quote di chiave e distribuita a più nodi con componenti variabili.](./dvt-cluster.png)

## Perché abbiamo bisogno della DVT? {#why-do-we-need-dvt}

### Sicurezza {#security}

I validatori generano due coppie di chiavi pubbliche-private: le chiavi del validatore per partecipare al consenso e le chiavi di prelievo per accedere ai fondi. Mentre i validatori possono proteggere le chiavi di prelievo nella conservazione a freddo (cold storage), le chiavi private del validatore devono essere online 24 ore su 24, 7 giorni su 7. Se una chiave privata del validatore viene compromessa, un aggressore può controllare il validatore, portando potenzialmente a punire o alla perdita degli ETH dello staker. La DVT può aiutare a mitigare questo rischio. Ecco come:

Utilizzando la DVT, gli staker possono partecipare allo staking mantenendo la chiave privata del validatore nella conservazione a freddo. Questo si ottiene crittografando la chiave del validatore originale e completa e poi dividendola in quote di chiave. Le quote di chiave vivono online e sono distribuite a più nodi che consentono l'operatività distribuita del validatore. Questo è possibile perché i validatori di [Ethereum](/) utilizzano firme BLS che sono additive, il che significa che la chiave completa può essere ricostruita sommando le sue parti componenti. Questo consente allo staker di mantenere la chiave del validatore 'master' originale e completa in modo sicuro offline.

### Nessun singolo punto di guasto {#no-single-point-of-failure}

Quando un validatore è diviso tra più operatori e più macchine, può resistere a singoli guasti hardware e software senza andare offline. Il rischio di guasti può anche essere ridotto utilizzando diverse configurazioni hardware e software tra i nodi in un cluster. Questa resilienza non è disponibile per le configurazioni dei validatori a nodo singolo: deriva dal livello DVT.

Se uno dei componenti di una macchina in un cluster si guasta (ad esempio, se ci sono quattro operatori in un cluster di validatori e uno utilizza un client specifico che ha un bug), gli altri assicurano che il validatore continui a funzionare.

### Decentralizzazione {#decentralization}

Lo scenario ideale per Ethereum è avere il maggior numero possibile di validatori gestiti in modo indipendente. Tuttavia, alcuni fornitori di staking sono diventati molto popolari e rappresentano una porzione sostanziale degli ETH totali in stake sulla rete. La DVT può consentire a questi operatori di esistere preservando la decentralizzazione dello stake. Questo perché le chiavi per ogni validatore sono distribuite su molte macchine e ci vorrebbe una collusione molto maggiore affinché un validatore diventi malevolo.

Senza la DVT, è più facile per i fornitori di staking supportare solo una o due configurazioni di client per tutti i loro validatori, aumentando l'impatto di un bug del client. La DVT può essere utilizzata per distribuire il rischio su più configurazioni di client e hardware diversi, creando resilienza attraverso la diversità.

**La DVT offre i seguenti vantaggi a Ethereum:**

1. **Decentralizzazione** del consenso basato sulla prova di stake di Ethereum
2. Garantisce la **vitalità** (liveness) della rete
3. Crea **tolleranza ai guasti** del validatore
4. Operatività del validatore a **fiducia minimizzata**
5. Rischi di **punire** e di inattività **ridotti al minimo**
6. **Migliora la diversità** (client, data center, posizione, regolamentazione, ecc.)
7. **Sicurezza migliorata** della gestione delle chiavi del validatore

## Come funziona la DVT? {#how-does-dvt-work}

Una soluzione DVT contiene i seguenti componenti:

- **[Condivisione del segreto di Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - I validatori utilizzano le [chiavi BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Le singole "quote di chiave" BLS possono essere combinate in un'unica chiave aggregata (firma). Nella DVT, la chiave privata per un validatore è la firma BLS combinata di ciascun operatore nel cluster.
- **[Schema di firma a soglia](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina il numero di singole quote di chiave necessarie per le operazioni di firma, ad es. 3 su 4.
- **[Generazione distribuita delle chiavi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo crittografico che genera le quote di chiave ed è utilizzato per distribuire le quote di una chiave del validatore esistente o nuova ai nodi in un cluster.
- **[Calcolo multipartecipante (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La chiave completa del validatore viene generata in segreto utilizzando il calcolo multipartecipante. La chiave completa non è mai nota a nessun singolo operatore: conoscono solo la propria parte di essa (la loro "quota").
- **Protocollo di consenso** - Il protocollo di consenso seleziona un nodo come proponente del blocco. Questo condivide il blocco con gli altri nodi nel cluster, che aggiungono le loro quote di chiave alla firma aggregata. Quando sono state aggregate abbastanza quote di chiave, il blocco viene proposto su Ethereum.

I validatori distribuiti hanno una tolleranza ai guasti integrata e possono continuare a funzionare anche se alcuni dei singoli nodi vanno offline. Questo significa che il cluster è resiliente anche se alcuni dei nodi al suo interno si rivelano malevoli o inattivi.

## Casi d'uso della DVT {#dvt-use-cases}

La DVT ha implicazioni significative per il più ampio settore dello staking:

### Staker solitari {#solo-stakers}

La DVT abilita anche lo staking non detentivo (non-custodial) consentendoti di distribuire la tua chiave del validatore su nodi remoti mantenendo la chiave completa completamente offline. Questo significa che gli staker domestici non devono necessariamente spendere per l'hardware, mentre la distribuzione delle quote di chiave può aiutare a rafforzarli contro potenziali attacchi informatici.

### Staking come servizio (SaaS) {#saas}

Gli operatori (come le pool di staking e gli staker istituzionali) che gestiscono molti validatori possono utilizzare la DVT per ridurre il loro rischio. Distribuendo la loro infrastruttura, possono aggiungere ridondanza alle loro operazioni e diversificare i tipi di hardware che utilizzano.

La DVT condivide la responsabilità per la gestione delle chiavi tra più nodi, il che significa che anche alcuni costi operativi possono essere condivisi. La DVT può anche ridurre il rischio operativo e i costi assicurativi per i fornitori di staking.

### Pool di staking {#staking-pools}

A causa delle configurazioni standard dei validatori, le pool di staking e i fornitori di liquid staking sono costretti ad avere livelli variabili di fiducia nel singolo operatore poiché i guadagni e le perdite sono socializzati in tutta la pool. Dipendono anche dagli operatori per salvaguardare le chiavi di firma perché, fino ad ora, non c'è stata altra opzione per loro.

Anche se tradizionalmente si fanno sforzi per distribuire il rischio distribuendo gli stake tra più operatori, ogni operatore gestisce comunque uno stake significativo in modo indipendente. Affidarsi a un singolo operatore comporta rischi immensi se le sue prestazioni sono inferiori, se incontra tempi di inattività, se viene compromesso o se agisce in modo malevolo.

Sfruttando la DVT, la fiducia richiesta agli operatori è significativamente ridotta. **Le pool possono consentire agli operatori di detenere stake senza aver bisogno della custodia delle chiavi del validatore** (poiché vengono utilizzate solo le quote di chiave). Consente inoltre di distribuire gli stake gestiti tra più operatori (ad es., invece di avere un singolo operatore che gestisce 1000 validatori, la DVT consente a quei validatori di essere gestiti collettivamente da più operatori). Diverse configurazioni degli operatori garantiranno che se un operatore dovesse guastarsi, gli altri saranno ancora in grado di attestare. Questo si traduce in ridondanza e diversificazione che portano a prestazioni e resilienza migliori, massimizzando al contempo le ricompense.

Un altro vantaggio nel ridurre al minimo la fiducia nel singolo operatore è che le pool di staking possono consentire una partecipazione degli operatori più aperta e senza permessi. Facendo questo, i servizi possono ridurre il loro rischio e supportare la decentralizzazione di Ethereum utilizzando set di operatori sia curati che senza permessi, ad esempio, accoppiando staker domestici o minori con quelli più grandi.

## Potenziali svantaggi dell'utilizzo della DVT {#potential-drawbacks-of-using-dvt}

- **Componente aggiuntivo** - l'introduzione di un nodo DVT aggiunge un'altra parte che può essere difettosa o vulnerabile. Un modo per mitigare questo è puntare a più implementazioni di un nodo DVT, il che significa più client DVT (in modo simile a come ci sono più client per i livelli di consenso e di esecuzione).
- **Costi operativi** - poiché la DVT distribuisce il validatore tra più parti, sono necessari più nodi per il funzionamento invece di un solo nodo singolo, il che introduce maggiori costi operativi.
- **Latenza potenzialmente aumentata** - poiché la DVT utilizza un protocollo di consenso per raggiungere il consenso tra i molteplici nodi che gestiscono un validatore, può potenzialmente introdurre una maggiore latenza.

## Letture consigliate {#further-reading}

- [Specifiche dei validatori distribuiti di Ethereum (alto livello)](https://github.com/ethereum/distributed-validator-specs)
- [Specifiche tecniche dei validatori distribuiti di Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [App demo della condivisione del segreto di Shamir](https://iancoleman.io/shamir/)