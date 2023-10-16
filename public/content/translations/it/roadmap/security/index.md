---
title: Un Ethereum più sicuro
description: Ethereum è la piattaforma di contratti intelligenti più sicura e decentralizzata che esista. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi livello di attacco anche in un futuro lontano.
lang: it
image: /roadmap/roadmap-security.png
alt: "Roadmap di Ethereum"
template: roadmap
---

Ethereum è già una piattaforma di contratti intelligenti molto sicura e decentralizzata. Tuttavia, restano ancora da implementare alcuni miglioramenti in modo che Ethereum resti resiliente a qualsiasi tipo di attacco anche in un futuro lontano. Questi, includono lievi modifiche a come i client di Ethereum affrontano i blocchi in competizione, nonché aumentare come la velocità di rete considera i blocchi ["finalizzati"](/developers/docs/consensus-mechanisms/pos/#finality) (a significare che non sono modificabili senza estreme perdite economiche da parte di un utente malevolo).

Esistono anche dei miglioramenti che complicano la censura delle transazioni, rendendo i propositori di blocchi ciechi ai contenuti effettivi dei propri blocchi, e nuovi modi per identificare quando un client sta censurando. Insieme, questi miglioramenti aggiorneranno il protocollo di proof-of-stake, così che gli utenti, singoli e aziendali, abbiano l'istantanea fiducia nelle proprie app, nei propri dati e risorse su Ethereum.

## Prelievi di staking {#staking-withdrawals}

L'aggiornamento dal proof-of-work al proof-of-stake è iniziato quando i pionieri di Ethereum hanno messo in "staking" i propri ETH in un contratto di deposito. Tali ETH sono utilizzati per proteggere la rete. Tuttavia, questi ETH non sono ancora sbloccabili e restituibili agli utenti. Consentire agli ETH di essere prelevati è una parte critica dell'aggiornamento del proof-of-stake. Oltre ai prelievi, che sono un componente fondamentale di un protocollo di proof-of-stake pienamente funzionale, consentire i prelievi è un bene anche per la sicurezza di Ethereum, poiché consentono agli staker di utilizzare le proprie ricompense in ETH per altri scopi non di staking. Ciò significa che gli utenti che desiderano liquidità non debbano affidarsi ai derivati liquidi di staking (LSD), che possono essere una forza centralizzante su Ethereum. Si prevede che questo aggiornamento sarà completato il 12 aprile 2023.

<ButtonLink variant="outline-color" to="/staking/withdrawals/">Informazioni sui prelievi</ButtonLink>

## Difendersi dagli attacchi {#defending-against-attacks}

Esistono dei miglioramenti apportabili al protocollo di [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) di Ethereum che vanno oltre i prelievi. Uno è noto come [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739), un algoritmo di scelta della biforcazione più sicuro, che complica certi tipi di attacchi più sofisticati.

Ridurre il tempo di finalizzazione dei blocchi di Ethereum, fornirebbe una migliore esperienza agli utenti e impedirebbe i sofisticati attacchi di "riorganizzazione", in cui gli utenti malevoli provano a rimescolare i blocchi molto recenti, per estrarre profitto o censurare certe transazioni. La [**finalità dello spazio singolo (SSF)**](/roadmap/single-slot-finality/) è un metodo per ridurre il ritardo di finalizzazione. In questo momento, esistono 15 minuti di blocchi, che un utente malevolo potrebbe teoricamente convincere altri validatori a riconfigurare. Con la SSF, ce ne sono 0. Gli utenti, dagli individui alle app e le piattaforme di scambio, beneficiano dalla veloce garanzia che le proprie transazioni non saranno ripristinate, e la rete ne beneficia arrestando un'intera classe di attacchi.

<ButtonLink variant="outline-color" to="/roadmap/single-slot-finality/">Informazioni sulla finalità dello spazio singolo</ButtonLink>

## Difendersi dalla censura {#defending-against-censorship}

La decentralizzazione impedisce che validatori singoli o in piccoli gruppi diventino troppo influenti. Le nuove tecnologie di staking possono aiutare ad assicurare che i validatori di Ethereum restino il più decentralizzati possibile, difendendoli da guasti hardware, software e di rete. Ciò include software che condividono le responsabilità del validatore tra più nodi. Questo è noto come **tecnologia del validatore distribuita (DVT)**. I gruppi di staking sono incentivati a utilizzare la DVT, poiché consente a più computer di partecipare collettivamente alla validazione, aggiungendo ridondanza e tolleranza ai guasti. Inoltre, divide le chiavi del validatore tra diversi sistemi, piuttosto che far eseguire più validatori ai singoli operatori. Questo complica la coordinazione di attacchi tra operatori disonesti contro Ethereum. Nel complesso, l'idea è quella di ricavare benefici per la sicurezza, eseguendo i validatori come _comunità_ piuttosto che come individui.

<ButtonLink variant="outline-color" to="/staking/dvt/">Informazioni sulla tecnologia del validatore distribuita</ButtonLink>

L'implementazione della **separazione tra propositore e costruttore (PBS)** migliorerà drasticamente le difese integrate di Ethereum contro la censura. La PBS consente a ogni validatore di creare un blocco e un altro per trasmetterli per la rete di Ethereum. Questo assicura che i guadagni derivati dagli algoritmi di massimizzazione del profitto professionali di costruzione dei blocchi siano condivisi equamente per la rete, **impedendo la concentrazione dello stake** con gli staker istituzionali dalle migliori prestazioni nel tempo. Il propositore di blocchi seleziona il blocco più redditizio offertogli da un mercato di costruttori di blocchi. Per censurare, spesso un propositore di blocchi dovrebbe scegliere un blocco meno redditizio, che sarebbe **economicamente irrazionale e anche ovvio per il resto dei validatori** sulla rete.

Esistono potenziali componenti aggiuntivi alla PBS, quali transazioni crittografate ed elenchi d'inclusione, che potrebbero ulteriormente migliorare la resistenza alla censura di Ethereum. Questi rendono il costruttore e il propositore di blocchi cieco alle transazioni effettive incluse nei propri blocchi.

<ButtonLink variant="outline-color" to="/roadmap/pbs/">Leggi sulla separazione tra propositore e costruttore</ButtonLink>

## Proteggere i validatori {#protecting-validators}

È possibile che un utente malevolo sofisticato possa identificare i prossimi validatori e spammarli per impedire loro di proporre blocchi; questo è noto come un attacco di **negazione del servizio (o DoS)**. L'implementazione dell'[**elezione segreta di un capo (SLE)**](/roadmap/secret-leader-election), proteggerà da questo tipo di attacchi, impedendo ai propositori di blocchi di essere noti in anticipo. Ciò funziona rimescolando continuamente una serie di impegni crittografici che rappresentano i propositori di blocchi candidati, e utilizzarne l'ordine per determinare quale validatore sia selezionato, in modo che soltanto gli stessi validatori sappiano il proprio ordine in anticipo.

<ButtonLink variant="outline-color" to="/roadmap/secret-leader-election">Leggi sull'elezione segreta di un capo</ButtonLink>

## Stato attuale {#current-progress}

Gli aggiornamenti di sicurezza sulla tabella di marcia sono in fasi di ricerca avanzate, ma non dovrebbero essere implementati per un po'. I prossimi passaggi per view-merge, PBS, SSF e SLE sono quelli di finalizzazione di una specifica e inizio di costruzione dei prototipi.
