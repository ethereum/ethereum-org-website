---
title: Un Ethereum più sicuro
description: Ethereum è la piattaforma di contratti intelligenti più sicura e decentralizzata che esista. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi livello di attacco anche in un futuro lontano.
lang: it
image: /images/roadmap/roadmap-security.png
alt: "Roadmap di Ethereum"
template: roadmap
---

**Ethereum è già una piattaforma di [contratti intelligenti](/glossary/#smart-contract) molto sicura** e decentralizzata. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi tipo di attacco anche in un futuro lontano. Questi includono delle lievi modifiche al modo in cui i [client di Ethereum](/glossary/#consensus-client) affrontano i [blocchi](/glossary/#block) concorrenti, nonché l'aumento della velocità a cui la rete considera ["finalizzati"](/developers/docs/consensus-mechanisms/pos/#finality) i blocchi (a significare che non sono modificabili senza estreme perdite economiche da parte dell'utente malevolo).

Esistono anche dei miglioramenti che complicano la censura delle transazioni, rendendo i propositori di blocchi ciechi ai contenuti effettivi dei propri blocchi, e nuovi modi per identificare quando un client sta censurando. Insieme, questi miglioramenti aggiorneranno il protocollo di [proof-of-stake](/glossary/#pos) così che gli utenti, dai privati alle aziende, abbiano una fiducia istantanea nei propri dati, app e risorse su Ethereum.

## Prelievi di staking {#staking-withdrawals}

L'aggiornamento dal [proof-of-work](/glossary/#pow) al proof-of-stake è iniziato quando i pionieri di Ethereum hanno messo i propri ETH in "staking" in un contratto di deposito. Tali ETH sono utilizzati per proteggere la rete. Si è verificato un secondo aggiornamento il 12 aprile 2023, per consentire il prelievo degli ETH in staking. Da allora i validatori possono mettere in staking o prelevare liberamente gli ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Informazioni sui prelievi</ButtonLink>

## Difendersi dagli attacchi {#defending-against-attacks}

Possono essere apportati dei miglioramenti al protocollo di proof-of-stake di Ethereum. Uno è noto come [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739), un algoritmo di scelta della [biforcazione](/glossary/#fork) più sicuro, che rende più difficili certi tipi di attacchi più sofisticati.

Ridurre i tempi richiesti da Ethereum per [finalizzare](/glossary/#finality) i blocchi fornirebbe una migliore esperienza dell'utente e impedirebbe i sofisticati attacchi di "riorganizzazione", in cui gli utenti malevoli tentano di rimescolare i blocchi molto recenti per estrarne profitto o censurare certe transazioni. La [**finalità dello spazio singolo (SSF)**](/roadmap/single-slot-finality/) è un **metodo per ridurre al minimo il ritardo di finalizzazione**. In questo momento, esistono 15 minuti di blocchi, che un utente malevolo potrebbe teoricamente convincere altri validatori a riconfigurare. Con la SSF, ce ne sono 0. Gli utenti, dagli individui alle app e le piattaforme di scambio, beneficiano dalla veloce garanzia che le proprie transazioni non saranno ripristinate, e la rete ne beneficia arrestando un'intera classe di attacchi.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Informazioni sulla finalità dello spazio singolo</ButtonLink>

## Difendersi dalla censura {#defending-against-censorship}

La decentralizzazione impedisce agli individui o ai piccoli gruppi di [validatori](/glossary/#validator) di diventare troppo influenti. Le nuove tecnologie di staking possono aiutare ad assicurare che i validatori di Ethereum restino il più decentralizzati possibile, difendendoli da guasti hardware, software e di rete. Questo include i software che condividono le responsablità del validatore tra più [nodi](/glossary/#node). Questo è noto come **tecnologia del validatore distribuita (DVT)**. I [gruppi di staking](/glossary/#staking-pool) sono incentivati a utilizzare la DVT, poiché consente a più computer di partecipare collettivamente alla validazione, aggiungendo ridondanza e tolleranza ai guasti. Inoltre, divide le chiavi del validatore tra diversi sistemi, piuttosto che far eseguire più validatori ai singoli operatori. Questo complica la coordinazione di attacchi tra operatori disonesti contro Ethereum. Nel complesso, l'idea è quella di ricavare benefici per la sicurezza, eseguendo i validatori come _comunità_ piuttosto che come individui.

<ButtonLink variant="outline-color" href="/staking/dvt/">Informazioni sulla tecnologia del validatore distribuita</ButtonLink>

L'implementazione della **separazione tra propositore e costruttore (PBS)** migliorerà drasticamente le difese integrate di Ethereum contro la censura. La PBS consente a ogni validatore di creare un blocco e un altro per trasmetterli per la rete di Ethereum. Questo assicura che i guadagni derivati dagli algoritmi di massimizzazione del profitto professionali di costruzione dei blocchi siano condivisi equamente per la rete, **impedendo la concentrazione dello stake** con gli staker istituzionali dalle migliori prestazioni nel tempo. Il propositore di blocchi seleziona il blocco più redditizio offertogli da un mercato di costruttori di blocchi. Per censurare, spesso un propositore di blocchi dovrebbe scegliere un blocco meno redditizio, che sarebbe **economicamente irrazionale e anche ovvio per il resto dei validatori** sulla rete.

Esistono potenziali componenti aggiuntivi alla PBS, quali transazioni crittografate ed elenchi d'inclusione, che potrebbero ulteriormente migliorare la resistenza alla censura di Ethereum. Questi rendono il costruttore e il propositore di blocchi cieco alle transazioni effettive incluse nei propri blocchi.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Leggi sulla separazione tra propositore e costruttore</ButtonLink>

## Proteggere i validatori {#protecting-validators}

È possibile che un utente malevolo sofisticato possa identificare i prossimi validatori e spammarli per impedire loro di proporre blocchi; questo è noto come un attacco di **negazione del servizio (o DoS)**. L'implementazione dell'[**elezione segreta di un capo (SLE)**](/roadmap/secret-leader-election), proteggerà da questo tipo di attacchi, impedendo ai propositori di blocchi di essere noti in anticipo. Ciò funziona rimescolando continuamente una serie di impegni crittografici che rappresentano i propositori di blocchi candidati, e utilizzarne l'ordine per determinare quale validatore sia selezionato, in modo che soltanto gli stessi validatori sappiano il proprio ordine in anticipo.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Leggi sull'elezione segreta di un capo</ButtonLink>

## Stato attuale {#current-progress}

**Gli aggiornamenti di sicurezza nella tabella di marcia sono in fasi di ricerca avanzate**, ma non dovrebbero essere implementati per un po'. I prossimi passaggi per view-merge, PBS, SSF e SLE sono quelli di finalizzazione di una specifica e inizio di costruzione dei prototipi.
