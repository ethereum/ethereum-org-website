---
title: Dare un nome ai contratti intelligenti
description: Migliori pratiche per dare un nome ai contratti intelligenti di Ethereum con ENS
lang: it
---

I contratti intelligenti sono una pietra miliare dell'infrastruttura decentralizzata di Ethereum, consentendo applicazioni e protocolli autonomi. Ma anche se le capacità dei contratti si evolvono, gli utenti e gli sviluppatori si affidano ancora a indirizzi esadecimali grezzi per identificare e fare riferimento a questi contratti.

Dare un nome ai contratti intelligenti con l'[Ethereum Name Service (ENS)](https://ens.domains/) migliora l'esperienza utente eliminando gli indirizzi esadecimali dei contratti e riduce il rischio di attacchi come l'avvelenamento degli indirizzi (address poisoning) e gli attacchi di spoofing. Questa guida spiega perché dare un nome ai contratti intelligenti è importante, come può essere implementato e gli strumenti disponibili come [Enscribe](https://www.enscribe.xyz) per semplificare il processo e aiutare gli sviluppatori ad adottare questa pratica.

## Perché dare un nome ai contratti intelligenti? {#why-name-contracts}

### Identificatori leggibili dall'uomo {#human-readable-identifiers}

Invece di interagire con indirizzi di contratti opachi come `0x8f8e...f9e3`, gli sviluppatori e gli utenti possono utilizzare nomi leggibili dall'uomo come `v2.myapp.eth`. Questo semplifica le interazioni con i contratti intelligenti.

Questo è reso possibile dall'[Ethereum Name Service](https://ens.domains/) che fornisce un servizio di denominazione decentralizzato per gli indirizzi di Ethereum. Questo è analogo a come il Domain Name Service (DNS) consente agli utenti di Internet di accedere agli indirizzi di rete utilizzando un nome come ethereum.org invece di un indirizzo IP come `104.18.176.152`.

### Sicurezza e fiducia migliorate {#improved-security-and-trust}

I contratti con nome aiutano a ridurre le transazioni accidentali verso l'indirizzo sbagliato. Aiutano anche gli utenti a identificare i contratti legati ad app o marchi specifici. Questo aggiunge un livello di fiducia reputazionale, specialmente quando i nomi sono collegati a domini principali ben noti come `uniswap.eth`.

A causa della lunghezza di 42 caratteri dell'indirizzo di Ethereum, è molto difficile per gli utenti identificare piccoli cambiamenti negli indirizzi, in cui sono stati modificati un paio di caratteri. Ad esempio, un indirizzo come `0x58068646C148E313CB414E85d2Fe89dDc3426870` verrebbe normalmente troncato a `0x580...870` da applicazioni rivolte all'utente come i portafogli. È improbabile che un utente noti un indirizzo malevolo in cui sono stati alterati un paio di caratteri.

Questo tipo di tecnica è impiegato dagli attacchi di spoofing e avvelenamento degli indirizzi in cui gli utenti sono indotti a credere di interagire o inviare fondi all'indirizzo corretto, quando in realtà l'indirizzo assomiglia semplicemente a quello corretto, ma non è lo stesso.

I nomi ENS per portafogli e contratti proteggono da questi tipi di attacchi. Come gli attacchi di spoofing DNS, anche gli attacchi di spoofing ENS possono essere perpetrati, tuttavia, è più probabile che un utente noti un errore di ortografia in un nome ENS rispetto a una piccola modifica a un indirizzo esadecimale.

### Migliore UX per portafogli ed esploratori {#better-ux}

Quando un contratto intelligente è stato configurato con un nome ENS, è possibile per app come portafogli ed esploratori di blocchi visualizzare i nomi ENS per i contratti intelligenti, invece degli indirizzi esadecimali. Questo fornisce un significativo miglioramento dell'esperienza utente (UX) per gli utenti.

Ad esempio, quando interagiscono con un'app come Uniswap, gli utenti vedranno tipicamente che l'app con cui stanno interagendo è ospitata sul sito web `uniswap.org`, ma verrebbe loro presentato un indirizzo di contratto esadecimale se Uniswap non avesse dato un nome ai propri contratti intelligenti con ENS. Se il contratto ha un nome, potrebbero invece vedere `v4.contracts.uniswap.eth`, il che è molto più utile.

## Dare un nome al momento della distribuzione vs. post-distribuzione {#when-to-name}

Ci sono due momenti in cui si può dare un nome ai contratti intelligenti:

- **Al momento della distribuzione**: assegnare un nome ENS al contratto mentre viene distribuito.
- **Dopo la distribuzione**: mappare un indirizzo di contratto esistente a un nuovo nome ENS.

Entrambi gli approcci si basano sull'avere l'accesso come proprietario o gestore a un dominio ENS in modo da poter creare e impostare i record ENS.

## Come funziona la denominazione ENS per i contratti {#how-ens-naming-works}

I nomi ENS sono memorizzati on-chain e si risolvono in indirizzi di Ethereum tramite i resolver ENS. Per dare un nome a un contratto intelligente:

1. Registrare o controllare un dominio ENS principale (es. `myapp.eth`)
2. Creare un sottodominio (es. `v1.myapp.eth`)
3. Impostare il record `address` del sottodominio all'indirizzo del contratto
4. Impostare il record inverso (reverse record) del contratto sull'ENS per consentire di trovare il nome tramite il suo indirizzo

I nomi ENS sono gerarchici e supportano sotto-nomi illimitati. L'impostazione di questi record comporta tipicamente l'interazione con il registro ENS e i contratti dei resolver pubblici.

## Strumenti per dare un nome ai contratti {#tools}

Ci sono due approcci per dare un nome ai contratti intelligenti. Utilizzare l'[App ENS](https://app.ens.domains) con alcuni passaggi manuali, oppure utilizzare [Enscribe](https://www.enscribe.xyz). Questi sono delineati di seguito.

### Configurazione manuale di ENS {#manual-ens-setup}

Utilizzando l'[App ENS](https://app.ens.domains/), gli sviluppatori possono creare manualmente sotto-nomi e impostare i record di indirizzo di inoltro (forward address). Tuttavia, non possono impostare un nome primario per un contratto intelligente impostando il record inverso per il nome tramite l'app ENS. Devono essere intrapresi passaggi manuali che sono trattati nella [documentazione di ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) semplifica la denominazione dei contratti intelligenti con ENS e migliora la fiducia degli utenti nei contratti intelligenti. Fornisce:

- **Distribuzione e denominazione atomica**: Assegna un nome ENS durante la distribuzione di un nuovo contratto
- **Denominazione post-distribuzione**: Associa nomi a contratti già distribuiti
- **Supporto multi-chain**: Funziona su Ethereum e sulle reti L2 in cui è supportato ENS
- **Dati di verifica del contratto**: Include i dati di verifica del contratto estratti da più fonti per aumentare la fiducia degli utenti

Enscribe supporta i nomi ENS forniti dagli utenti, o i propri domini se l'utente non ha un nome ENS.

Puoi accedere all'[App Enscribe](https://app.enscribe.xyz) per iniziare a dare un nome e visualizzare i contratti intelligenti.

## Migliori pratiche {#best-practices}

- **Usa nomi chiari e versionati** come `v1.myapp.eth` per rendere trasparenti gli aggiornamenti del contratto
- **Imposta i record inversi** per collegare i contratti ai nomi ENS per la visibilità in app come portafogli ed esploratori di blocchi.
- **Monitora attentamente le scadenze** se vuoi prevenire cambiamenti accidentali di proprietà
- **Verifica il codice sorgente del contratto** in modo che gli utenti possano fidarsi che il contratto nominato si comporti come previsto

## Rischi {#risks}

Dare un nome ai contratti intelligenti fornisce vantaggi significativi per gli utenti di Ethereum, tuttavia, i proprietari di domini ENS devono essere vigili riguardo alla loro gestione. I rischi degni di nota includono:

- **Scadenza**: Proprio come i nomi DNS, le registrazioni dei nomi ENS hanno una durata limitata. Pertanto è vitale che i proprietari monitorino le date di scadenza dei loro domini e li rinnovino con largo anticipo rispetto alla loro scadenza. Sia l'App ENS che Enscribe forniscono indicatori visivi per i proprietari di domini quando si avvicina la scadenza.
- **Cambio di proprietà**: I record ENS sono rappresentati come NFT su Ethereum, dove il proprietario di uno specifico dominio `.eth` ha in suo possesso l'NFT associato. Pertanto, se un account diverso dovesse prendere possesso di questo NFT, il nuovo proprietario potrebbe modificare qualsiasi record ENS come ritiene opportuno.

Per mitigare tali rischi, l'account proprietario per i domini di 2° livello (2LD) `.eth` dovrebbe essere protetto tramite un portafoglio multifirma con sottodomini creati per gestire la denominazione dei contratti. In questo modo, in caso di modifiche accidentali o malevole della proprietà a livello di sottodominio, queste possono essere sovrascritte dal proprietario del 2LD.

## Il futuro della denominazione dei contratti {#future}

La denominazione dei contratti sta diventando una migliore pratica per lo sviluppo di dApp, in modo simile a come i nomi di dominio hanno sostituito gli indirizzi IP sul web. Man mano che sempre più infrastrutture come portafogli, esploratori e dashboard integrano la risoluzione ENS per i contratti, i contratti con nome miglioreranno la sicurezza e ridurranno gli errori in tutto l'ecosistema.

Rendendo i contratti intelligenti più facili da riconoscere e da comprendere, la denominazione aiuta a colmare il divario tra utenti e app su Ethereum, migliorando sia la sicurezza che l'UX per gli utenti.

## Letture consigliate {#further-reading}

- [Dare un nome ai contratti intelligenti con ENS](https://docs.ens.domains/web/naming-contracts/)
- [Dare un nome ai contratti intelligenti con Enscribe](https://www.enscribe.xyz/docs).