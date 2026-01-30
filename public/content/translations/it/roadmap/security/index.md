---
title: Un Ethereum più sicuro
description: Ethereum è la piattaforma di contratti intelligenti più sicura e decentralizzata che esista. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi livello di attacco anche in un futuro lontano.
lang: it
image: /images/roadmap/roadmap-security.png
alt: "Roadmap di Ethereum"
template: roadmap
---

**Ethereum è già una piattaforma di [contratti intelligenti](/glossary/#smart-contract) molto sicura** e decentralizzata. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi tipo di attacco anche in un futuro lontano. Queste includono lievi modifiche al modo in cui i [client di Ethereum](/glossary/#consensus-client) gestiscono i [blocchi](/glossary/#block) in competizione, oltre ad aumentare la velocità con cui la rete considera i blocchi ["finalizzati"](/developers/docs/consensus-mechanisms/pos/#finality) (ovvero che non possono essere modificati senza estreme perdite economiche per un aggressore).

Esistono anche dei miglioramenti che complicano la censura delle transazioni, rendendo i propositori di blocchi ciechi ai contenuti effettivi dei propri blocchi, e nuovi modi per identificare quando un client sta censurando. Insieme, questi miglioramenti aggiorneranno il protocollo [proof-of-stake](/glossary/#pos) in modo che gli utenti, dai singoli alle aziende, abbiano fiducia istantanea nelle loro app, dati e asset su Ethereum.

## Prelievi dello staking {#staking-withdrawals}

L'aggiornamento da [proof-of-work](/glossary/#pow) a proof-of-stake è iniziato quando i pionieri di Ethereum hanno messo in “staking” i loro ETH in un contratto di deposito. Tali ETH sono utilizzati per proteggere la rete. Si è verificato un secondo aggiornamento il 12 aprile 2023, per consentire ai validatori di prelevare gli ETH in staking. Da allora i validatori possono mettere in staking o prelevare liberamente gli ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Informazioni sui prelievi</ButtonLink>

## Difesa dagli attacchi {#defending-against-attacks}

Possono essere apportati dei miglioramenti al protocollo di proof-of-stake di Ethereum. Uno è noto come [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739), un algoritmo di scelta della [biforcazione](/glossary/#fork) più sicuro che rende più difficili alcuni tipi di attacchi sofisticati.

Ridurre il tempo che Ethereum impiega per [finalizzare](/glossary/#finality) i blocchi fornirebbe una migliore esperienza utente e preverrebbe sofisticati attacchi di "riorganizzazione" (reorg), in cui gli aggressori tentano di rimescolare i blocchi più recenti per estrarre profitto o censurare determinate transazioni. La [**finalità a slot singolo (SSF)**](/roadmap/single-slot-finality/) è un **modo per ridurre al minimo il ritardo di finalizzazione**. In questo momento, esistono 15 minuti di blocchi, che un utente malevolo potrebbe teoricamente convincere altri validatori a riconfigurare. Con la SSF, ce ne sono 0. Gli utenti, dagli individui alle app e le piattaforme di scambio, beneficiano dalla veloce garanzia che le proprie transazioni non saranno ripristinate, e la rete ne beneficia arrestando un'intera classe di attacchi.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Informazioni sulla finalità a slot singolo</ButtonLink>

## Difesa dalla censura {#defending-against-censorship}

La decentralizzazione impedisce a singoli individui o a piccoli gruppi di [validatori](/glossary/#validator) di diventare troppo influenti. Le nuove tecnologie di staking possono aiutare ad assicurare che i validatori di Ethereum restino il più decentralizzati possibile, difendendoli da guasti hardware, software e di rete. Questo include software che condivide le responsabilità dei validatori su più [nodi](/glossary/#node). Questa è nota come **tecnologia del validatore distribuito (DVT)**. Le [pool di staking](/glossary/#staking-pool) sono incentivate a usare la DVT perché permette a più computer di partecipare collettivamente alla validazione, aggiungendo ridondanza e tolleranza ai guasti. Inoltre, divide le chiavi del validatore tra diversi sistemi, piuttosto che far eseguire più validatori ai singoli operatori. Questo complica la coordinazione di attacchi tra operatori disonesti contro Ethereum. Nel complesso, l'idea è di ottenere vantaggi in termini di sicurezza eseguendo i validatori come _comunità_ piuttosto che come singoli individui.

<ButtonLink variant="outline-color" href="/staking/dvt/">Informazioni sulla tecnologia del validatore distribuito</ButtonLink>

L'implementazione della **separazione tra propositore e costruttore (PBS)** migliorerà drasticamente le difese integrate di Ethereum contro la censura. La PBS consente a ogni validatore di creare un blocco e un altro per trasmetterli per la rete di Ethereum. Ciò garantisce che i guadagni derivanti da algoritmi professionali di costruzione di blocchi che massimizzano il profitto siano condivisi più equamente attraverso la rete, **impedendo la concentrazione dello stake** presso gli staker istituzionali con le migliori prestazioni nel tempo. Il propositore di blocchi seleziona il blocco più redditizio offertogli da un mercato di costruttori di blocchi. Per censurare, un propositore di blocchi dovrebbe spesso scegliere un blocco meno redditizio, il che sarebbe **economicamente irrazionale e anche ovvio per il resto dei validatori** sulla rete.

Esistono potenziali componenti aggiuntivi alla PBS, quali transazioni crittografate ed elenchi d'inclusione, che potrebbero ulteriormente migliorare la resistenza alla censura di Ethereum. Questi rendono il costruttore e il propositore di blocchi cieco alle transazioni effettive incluse nei propri blocchi.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Informazioni sulla separazione tra propositore e costruttore</ButtonLink>

## Protezione dei validatori {#protecting-validators}

È possibile che un aggressore sofisticato possa identificare i validatori imminenti e inondarli di spam per impedire loro di proporre blocchi; questo è noto come un attacco **di negazione del servizio (DoS)**. L'implementazione dell'[**elezione segreta del leader (SLE)**](/roadmap/secret-leader-election) proteggerà da questo tipo di attacco, impedendo che i propositori di blocchi siano conoscibili in anticipo. Ciò funziona rimescolando continuamente una serie di impegni crittografici che rappresentano i propositori di blocchi candidati, e utilizzarne l'ordine per determinare quale validatore sia selezionato, in modo che soltanto gli stessi validatori sappiano il proprio ordine in anticipo.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Informazioni sull'elezione segreta del leader</ButtonLink>

## Progressi attuali {#current-progress}

**Gli aggiornamenti di sicurezza sulla roadmap sono in fasi di ricerca avanzate**, ma non se ne prevede l'implementazione a breve. I prossimi passi per view-merge, PBS, SSF e SLE sono finalizzare una specifica e iniziare a costruire prototipi.
