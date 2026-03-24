---
title: "Un Ethereum più sicuro"
description: "Ethereum è la piattaforma di contratti intelligenti più sicura e decentralizzata esistente. Tuttavia, ci sono ancora miglioramenti che possono essere apportati affinché Ethereum rimanga resiliente a qualsiasi livello di attacco nel lontano futuro."
lang: it
image: /images/roadmap/roadmap-security.png
alt: "Piano d'azione di Ethereum"
template: roadmap
---

**Ethereum è già una piattaforma di [contratti intelligenti](/glossary/#smart-contract) molto sicura** e decentralizzata. Tuttavia, ci sono ancora miglioramenti che possono essere apportati affinché Ethereum rimanga resiliente a tutti i tipi di attacco nel lontano futuro. Questi includono sottili modifiche al modo in cui i [client di Ethereum](/glossary/#consensus-client) gestiscono i [blocchi](/glossary/#block) in competizione, oltre ad aumentare la velocità con cui la rete considera i blocchi ["finalizzati"](/developers/docs/consensus-mechanisms/pos/#finality) (il che significa che non possono essere modificati senza perdite economiche estreme per un utente malintenzionato).

Ci sono anche miglioramenti che rendono la censura delle transazioni molto più difficile rendendo i proponenti del blocco ciechi ai contenuti effettivi dei loro blocchi, e nuovi modi per identificare quando un client sta censurando. Insieme, questi miglioramenti aggiorneranno il protocollo di [prova di stake](/glossary/#pos) in modo che gli utenti, dai singoli individui alle aziende, abbiano fiducia immediata nelle loro app, dati e risorse su Ethereum.

## Prelievi dello staking {#staking-withdrawals}

L'aggiornamento dalla [prova di lavoro](/glossary/#pow) alla prova di stake è iniziato con i pionieri di Ethereum che hanno messo in "staking" i loro ETH in un contratto di deposito. Quegli ETH sono usati per proteggere la rete. C'è stato un secondo aggiornamento il 12 aprile 2023 per consentire ai validatori di prelevare gli ETH in staking. Da allora i validatori possono liberamente mettere in staking o prelevare ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Scopri di più sui prelievi</ButtonLink>

## Difesa contro gli attacchi {#defending-against-attacks}

Ci sono miglioramenti che possono essere apportati al protocollo di prova di stake di Ethereum. Uno è noto come [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739): un algoritmo di scelta della [biforcazione](/glossary/#fork) più sicuro che rende più difficili alcuni tipi sofisticati di attacco.

Ridurre il tempo impiegato da Ethereum per [finalizzare](/glossary/#finality) i blocchi fornirebbe una migliore esperienza utente e preverrebbe sofisticati attacchi di "riorganizzazione" in cui gli aggressori cercano di rimescolare blocchi molto recenti per estrarre profitto o censurare determinate transazioni. La [**finalità a slot singolo (SSF)**](/roadmap/single-slot-finality/) è un **modo per ridurre al minimo il ritardo di finalizzazione**. Al momento ci sono 15 minuti di blocchi che un utente malintenzionato potrebbe teoricamente convincere altri validatori a riconfigurare. Con la SSF, ce ne sono 0. Gli utenti, dai singoli individui alle app e agli exchange, beneficiano della rapida garanzia che le loro transazioni non verranno annullate, e la rete ne trae vantaggio bloccando un'intera classe di attacchi.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Scopri di più sulla finalità a slot singolo</ButtonLink>

## Difesa contro la censura {#defending-against-censorship}

La decentralizzazione impedisce a individui o piccoli gruppi di [validatori](/glossary/#validator) di diventare troppo influenti. Le nuove tecnologie di staking possono aiutare a garantire che i validatori di Ethereum rimangano il più decentralizzati possibile, difendendoli al contempo da guasti hardware, software e di rete. Ciò include software che condivide le responsabilità del validatore su più [nodi](/glossary/#node). Questa è nota come **tecnologia dei validatori distribuiti (DVT)**. Le [pool di staking](/glossary/#staking-pool) sono incentivate a utilizzare la DVT perché consente a più computer di partecipare collettivamente alla validazione, aggiungendo ridondanza e tolleranza agli errori. Divide inoltre le chiavi del validatore su diversi sistemi, piuttosto che avere singoli operatori che eseguono più validatori. Ciò rende più difficile per gli operatori disonesti coordinare gli attacchi su Ethereum. Nel complesso, l'idea è di trarre vantaggi in termini di sicurezza eseguendo i validatori come _comunità_ piuttosto che come individui.

<ButtonLink variant="outline-color" href="/staking/dvt/">Scopri di più sulla tecnologia dei validatori distribuiti</ButtonLink>

L'implementazione della **separazione tra proponente e costruttore (PBS)** migliorerà drasticamente le difese integrate di Ethereum contro la censura. La PBS consente a un validatore di creare un blocco e a un altro di trasmetterlo attraverso la rete di Ethereum. Ciò garantisce che i guadagni derivanti da algoritmi professionali di costruzione dei blocchi che massimizzano il profitto siano condivisi in modo più equo in tutta la rete, **impedendo allo stake di concentrarsi** nel tempo presso gli staker istituzionali con le migliori prestazioni. Il proponente del blocco può selezionare il blocco più redditizio offerto da un mercato di costruttori di blocchi. Per censurare, un proponente del blocco dovrebbe spesso scegliere un blocco meno redditizio, il che sarebbe **economicamente irrazionale e anche ovvio per il resto dei validatori** sulla rete.

Ci sono potenziali componenti aggiuntivi per la PBS, come transazioni crittografate e liste di inclusione, che potrebbero migliorare ulteriormente la resistenza alla censura di Ethereum. Questi rendono il costruttore e il proponente del blocco ciechi alle transazioni effettive incluse nei loro blocchi.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Scopri di più sulla separazione tra proponente e costruttore</ButtonLink>

## Protezione dei validatori {#protecting-validators}

È possibile che un utente malintenzionato sofisticato possa identificare i futuri validatori e inviare loro spam per impedire loro di proporre blocchi; questo è noto come attacco di **negazione del servizio (DoS)**. L'implementazione dell'[**elezione segreta del leader (SLE)**](/roadmap/secret-leader-election) proteggerà da questo tipo di attacco impedendo che i proponenti del blocco siano conoscibili in anticipo. Questo funziona mescolando continuamente un insieme di impegni crittografici che rappresentano i candidati proponenti del blocco e utilizzando il loro ordine per determinare quale validatore viene selezionato in modo tale che solo i validatori stessi conoscano il loro ordine in anticipo.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Scopri di più sull'elezione segreta del leader</ButtonLink>

## Progressi attuali {#current-progress}

**Gli aggiornamenti di sicurezza sul piano d'azione sono in fasi avanzate di ricerca**, ma non si prevede che vengano implementati per un po' di tempo. I prossimi passi per view-merge, PBS, SSF e SLE sono finalizzare una specifica e iniziare a costruire prototipi.