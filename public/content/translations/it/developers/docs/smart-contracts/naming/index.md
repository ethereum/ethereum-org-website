---
title: Denominare i contratti intelligenti
description: Migliori pratiche per la denominazione di contratti intelligenti Ethereum con ENS
lang: it
---

I contratti intelligenti sono una pietra miliare dell'infrastruttura decentralizzata di Ethereum, in quanto abilitano applicazioni e protocolli autonomi. Tuttavia, anche con l'evoluzione delle funzionalità dei contratti, utenti e sviluppatori si affidano ancora a indirizzi esadecimali grezzi per identificare e fare riferimento a questi contratti.

Denominare i contratti intelligenti con [Ethereum Name Service (ENS)](https://ens.domains/) migliora l'esperienza utente, eliminando gli indirizzi esadecimali dei contratti e riducendo il rischio di attacchi come l'avvelenamento e lo spoofing di indirizzi. Questa guida spiega perché è importante denominare i contratti intelligenti, come implementarlo e gli strumenti disponibili come [Enscribe](https://www.enscribe.xyz) per semplificare il processo e aiutare gli sviluppatori ad adottare questa pratica.

## Perché denominare i contratti intelligenti? {#why-name-contracts}

### Identificatori leggibili dall'uomo {#human-readable-identifiers}

Invece di interagire con indirizzi di contratto opachi come `0x8f8e...f9e3`, sviluppatori e utenti possono usare nomi leggibili dall'uomo come `v2.myapp.eth`. Ciò semplifica le interazioni con i contratti intelligenti.

Questo è reso possibile da [Ethereum Name Service](https://ens.domains/) che fornisce un servizio di denominazione decentralizzato per gli indirizzi Ethereum. Questo è analogo a come il Domain Name Service (DNS) consente agli utenti di internet di accedere agli indirizzi di rete utilizzando un nome come ethereum.org invece che tramite un indirizzo IP come `104.18.176.152`.

### Miglioramento della sicurezza e della fiducia {#improved-security-and-trust}

I contratti con nome aiutano a ridurre le transazioni accidentali verso l'indirizzo sbagliato. Aiutano anche gli utenti a identificare i contratti legati a specifiche app o marchi. Ciò aggiunge un livello di fiducia reputazionale, soprattutto quando i nomi sono collegati a domini principali noti come `uniswap.eth`.

Data la lunghezza di 42 caratteri di un indirizzo Ethereum, è molto difficile per gli utenti identificare piccole modifiche negli indirizzi, dove sono stati modificati un paio di caratteri. Ad esempio, un indirizzo come `0x58068646C148E313CB414E85d2Fe89dDc3426870` verrebbe normalmente troncato in `0x580...870` da applicazioni rivolte all'utente come i portafogli. È improbabile che un utente noti un indirizzo malevolo in cui sono stati alterati un paio di caratteri.

Questo tipo di tecnica è impiegata da attacchi di spoofing e avvelenamento di indirizzi in cui gli utenti sono indotti a credere di interagire o inviare fondi all'indirizzo corretto, quando in realtà l'indirizzo assomiglia semplicemente all'indirizzo corretto, ma non è lo stesso.

I nomi ENS per portafogli e contratti proteggono da questi tipi di attacchi. Come gli attacchi di spoofing DNS, anche gli attacchi di spoofing ENS possono essere perpetrati, tuttavia, è più probabile che un utente noti un errore di battitura in un nome ENS piuttosto che una piccola modifica a un indirizzo esadecimale.

### Migliore UX per portafogli ed esploratori {#better-ux}

Quando un contratto intelligente è stato configurato con un nome ENS, è possibile per app come portafogli ed esploratori di blockchain visualizzare i nomi ENS per i contratti intelligenti, invece degli indirizzi esadecimali. Questo offre un notevole miglioramento dell'esperienza utente (UX) per gli utenti.

Ad esempio, quando interagiscono con un'app come Uniswap, gli utenti vedranno in genere che l'app con cui stanno interagendo è ospitata sul sito web `uniswap.org`, ma verrebbe loro presentato un indirizzo del contratto esadecimale se Uniswap non avesse denominato i propri contratti intelligenti con ENS. Se il contratto fosse nominato, potrebbero invece vedere `v4.contracts.uniswap.eth`, che è molto più utile.

## Denominazione durante la distribuzione vs. dopo la distribuzione {#when-to-name}

Ci sono due momenti in cui i contratti intelligenti possono essere denominati:

- **Al momento della distribuzione**: assegnazione di un nome ENS al contratto mentre viene distribuito.
- **Dopo la distribuzione**: mappatura di un indirizzo di contratto esistente a un nuovo nome ENS.

Entrambi gli approcci si basano sull'accesso come proprietario o gestore a un dominio ENS per poter creare e impostare record ENS.

## Come funziona la denominazione ENS per i contratti {#how-ens-naming-works}

I nomi ENS sono memorizzati sulla catena e risolvono in indirizzi Ethereum tramite i resolver ENS. Per denominare un contratto intelligente:

1. Registra o controlla un dominio ENS principale (ad es. `myapp.eth`)
2. Crea un sottodominio (ad es. `v1.myapp.eth`)
3. Imposta il record `address` del sottodominio sull'indirizzo del contratto
4. Imposta il record inverso del contratto sull'ENS per consentire di trovare il nome tramite il suo indirizzo

I nomi ENS sono gerarchici e supportano un numero illimitato di sotto-nomi. L'impostazione di questi record comporta in genere l'interazione con il registro ENS e i contratti del resolver pubblico.

## Strumenti per la denominazione dei contratti {#tools}

Esistono due approcci per denominare i contratti intelligenti. O utilizzando l'[App ENS](https://app.ens.domains) con alcuni passaggi manuali, o utilizzando [Enscribe](https://www.enscribe.xyz). Questi sono descritti di seguito.

### Configurazione manuale di ENS {#manual-ens-setup}

Utilizzando l'[App ENS](https://app.ens.domains), gli sviluppatori possono creare manualmente sotto-nomi e impostare record di indirizzi diretti. Tuttavia, non possono impostare un nome primario per un contratto intelligente impostando il record inverso per il nome tramite l'app ENS. È necessario eseguire dei passaggi manuali, che sono trattati nella [documentazione di ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) semplifica la denominazione dei contratti intelligenti con ENS e aumenta la fiducia degli utenti nei contratti intelligenti. Fornisce:

- **Distribuzione e denominazione atomica**: assegna un nome ENS durante la distribuzione di un nuovo contratto
- **Denominazione post-distribuzione**: associa nomi a contratti già distribuiti
- **Supporto multi-catena**: funziona su Ethereum e reti L2 dove ENS è supportato
- **Dati di verifica del contratto**: include i dati di verifica del contratto estratti da più fonti per aumentare la fiducia degli utenti

Enscribe supporta i nomi ENS forniti dagli utenti o i propri domini se l'utente non ha un nome ENS.

Puoi accedere all'[App Enscribe](https://app.enscribe.xyz) per iniziare a denominare e visualizzare i contratti intelligenti.

## Migliori pratiche {#best-practices}

- **Utilizza nomi chiari e con versione** come `v1.myapp.eth` per rendere trasparenti gli aggiornamenti dei contratti
- **Imposta i record inversi** per collegare i contratti ai nomi ENS per la visibilità in app come portafogli ed esploratori di blockchain.
- **Monitora attentamente le scadenze** se vuoi evitare cambiamenti accidentali di proprietà
- **Verifica la fonte del contratto** in modo che gli utenti possano fidarsi che il contratto denominato si comporti come previsto

## Rischi {#risks}

La denominazione dei contratti intelligenti offre vantaggi significativi per gli utenti di Ethereum, tuttavia, i proprietari di domini ENS devono essere vigili rispetto alla loro gestione. I rischi notevoli includono:

- **Scadenza**: proprio come i nomi DNS, le registrazioni dei nomi ENS hanno una durata limitata. Pertanto è fondamentale che i proprietari monitorino le date di scadenza dei loro domini e li rinnovino con largo anticipo rispetto alla scadenza. Sia l'App ENS che Enscribe forniscono indicatori visivi per i proprietari dei domini quando la scadenza si avvicina.
- **Cambio di proprietà**: i record ENS sono rappresentati come NFT su Ethereum, dove il proprietario di un dominio `.eth` specifico possiede il NFT associato. Pertanto, se un account diverso dovesse assumere la proprietà di questo NFT, il nuovo proprietario potrà modificare qualsiasi record ENS a suo piacimento.

Per mitigare tali rischi, l'account del proprietario per i domini di secondo livello (2LD) `.eth` dovrebbe essere protetto tramite un portafoglio multi-firma, con sottodomini creati per gestire la denominazione dei contratti. In questo modo, in caso di modifiche accidentali o malevole della proprietà a livello di sottodominio, queste possono essere annullate dal proprietario del 2LD.

## Futuro della denominazione dei contratti {#future}

La denominazione dei contratti sta diventando una migliore pratica per lo sviluppo di dApp, in modo simile a come i nomi di dominio hanno sostituito gli indirizzi IP sul web. Man mano che più infrastrutture come portafogli, esploratori e dashboard integreranno la risoluzione ENS per i contratti, i contratti con nome miglioreranno la sicurezza e ridurranno gli errori in tutto l'ecosistema.

Rendendo i contratti intelligenti più facili da riconoscere e da comprendere, la denominazione aiuta a colmare il divario tra utenti e app su Ethereum, migliorando sia la sicurezza che l'UX per gli utenti.

## Letture consigliate {#further-reading}

- [Denominare i Contratti Intelligenti con ENS](https://docs.ens.domains/web/naming-contracts/)
- [Denominare i Contratti Intelligenti con Enscribe](https://www.enscribe.xyz/docs).
