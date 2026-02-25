---
title: Agenti IA
metaTitle: Agenti IA | Agenti IA su Ethereum
description: Una panoramica degli agenti IA su Ethereum
lang: it
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Persone riunite al tavolo del terminale
summaryPoint1: L'intelligenza artificiale (IA) che interagisce con la blockchain compie transazioni in modo indipendente
summaryPoint2: Controlla i portafogli e i fondi
summaryPoint3: Assume umani o altri agenti per lavoro
buttons:
  - content: Cosa sono gli agenti IA?
    toId: what-are-ai-agents
  - content: Scopri gli agenti
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Immagina navigare Ethereum con un assistente AI che studia le tendenze dei mercati onchain 24/7, risponde alle domande ed esegua inoltre transazioni a nome tuo. Benvenuto nel mondo degli agenti IA - Sistemi intelligenti progettati per semplificare la tua vita digitale.

Su Ethereum stiamo assistendo alle innovazioni degli agenti IA che spaziano da persone di spicco virtuali, creatori di contenuti controllati da IA a piattaforme di analisi di mercato in tempo reale, tutto ciò aiuta gli utenti fornendo loro informazioni, intrattenimento ed efficienza nelle operazioni.

## Cosa sono gli agenti IA? {#what-are-ai-agents}

Gli agenti IA sono software programmati con l'intelligenza artificiale per portare a termine compiti o prendere decisioni in autonomia. Essi apprendono attraverso grandi quantità di dati, si adattano ai cambiamenti e gestiscono compiti complessi. Operano in continuità e sono in grado di trovare opportunità.

### L'integrazione degli agenti IA con la tecnologia blockchain {#how-ai-agents-work-with-blockchains}

Nella finanza tradizionale, gli agenti IA spesso operano in ambienti centralizzati con una limitata apprensione di dati. Ciò ostacola la loro abilità di apprendere e gestire beni e fondi in autonomia.

L'ecosistema decentralizzato di Ethereum invece offre diversi vantaggi chiave:

- <strong>Dati trasparenti:</strong> Accesso alle informazioni blockchain in tempo reale.
- <strong>Autentica proprietà degli asset:</strong> Gli asset digitali sono posseduti completamente dagli agenti AI.
- <strong>Funzionalità robusta onchain:</strong> Permette agli Agenti AI di eseguire transazioni, interagire con i contratti intelligenti, fornire liquidità e collaborare attraverso i protocolli.

Questi fattori trasformano gli agenti AI da semplici robot a sistemi dinamici che si auto-migliorano e che offrono un valore significativo in molteplici settori:

<CardGrid>
  <Card title="DeFi automatizzata" emoji=":money_with_wings:" description="Gli agenti IA seguono da vicino le tendenze di mercato, eseguono operazioni e gestiscono i portafogli, rendendo il complesso mondo della DeFi molto più accessibile."/>
  <Card title="Nuova economia degli agenti IA" emoji="🌎" description="Gli agenti IA possono assumere altri agenti (o umani) con competenze diverse per svolgere compiti specializzati per loro conto." />
  <Card title="Gestione del rischio" emoji="🛠️" description="Monitorando le attività transazionali, gli agenti IA possono aiutare a individuare le truffe e a proteggere i tuoi beni digitali meglio e più velocemente." />
</CardGrid>

## IA verificabile {#verifiable-ai}

Gli agenti IA in esecuzione fuori dalla catena spesso si comportano come "scatole nere": il loro ragionamento, i loro input e i loro output non possono essere verificati in modo indipendente. Ethereum cambia tutto ciò. Ancorando il comportamento degli agenti sulla catena, gli sviluppatori possono creare agenti _trustless_, _trasparenti_ ed _economicamente autonomi_. Le azioni di tali agenti possono essere verificate, limitate e provate.

### Inferenza verificabile {#verifiable-inference}

L'inferenza IA avviene tradizionalmente fuori dalla catena, dove l'esecuzione è economica ma l'esecuzione del modello è opaca. Su Ethereum, gli sviluppatori possono associare gli agenti a calcoli verificabili utilizzando diverse tecniche:

- [**zkML (machine learning a conoscenza-zero)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) consente agli agenti di dimostrare che un modello è stato eseguito correttamente senza rivelare il modello o gli input
- [**Attestazioni TEE (ambiente di esecuzione attendibile)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) permettono prove supportate da hardware che un agente ha eseguito un modello o un percorso di codice specifico
- **Immutabilità sulla catena** garantisce che queste prove e attestazioni possano essere referenziate, riprodotte e considerate attendibili da qualsiasi contratto o agente

## Pagamenti e commercio con x402 {#x402}

Il [protocollo x402](https://www.x402.org/), distribuito su Ethereum e sui L2, offre agli agenti un modo nativo per pagare le risorse e interagire economicamente senza l'intervento umano. Gli agenti possono:

- Pagare per calcoli, dati e chiamate API utilizzando le stablecoin
- Richiedere o verificare attestazioni da altri agenti o servizi
- Partecipare al commercio tra agenti, acquistando e vendendo potenza di calcolo, dati o output di modelli

x402 trasforma Ethereum in un livello economico programmabile per agenti autonomi, abilitando interazioni a consumo invece di conti, abbonamenti o fatturazione centralizzata.

### Sicurezza finanziaria agentica {#agentic-finance-security}

Gli agenti autonomi necessitano di meccanismi di protezione. Ethereum li fornisce a livello di portafoglio e di contratto:

- [I conti intelligenti (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) consentono agli sviluppatori di imporre limiti di spesa, whitelist, chiavi di sessione e permessi granulari
- I vincoli programmati negli smart contract possono limitare ciò che un agente è autorizzato a fare
- I limiti basati sull'inferenza (ad es. richiedere una prova zkML prima di eseguire un'azione ad alto rischio) aggiungono un ulteriore livello di sicurezza

Questi controlli consentono la distribuzione di agenti autonomi che non sono illimitati.

### Registri sulla catena: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) è uno standard emergente (attualmente in fase di revisione paritaria) che propone registri sulla catena per l'identità, le capacità e le attestazioni degli agenti.

Se adottato, potrebbe fornire:

- Una directory condivisa e trustless di agenti
- Formati di attestazione standardizzati
- Una base per "un'infrastruttura di agenti trustless" direttamente sulla rete principale di Ethereum

Ciò renderebbe più facile per gli agenti scoprirsi, verificarsi ed effettuare transazioni tra loro in un ambiente completamente decentralizzato.

## Agenti AI su Ethereum: {#ai-agents-on-ethereum}

Cominciamo a esplorare il pieno potenziale degli agenti AI, e vari progetti stanno già sfruttando la sinergia tra la blockchain e l'AI—particolarmente in termini di trasparenza e monetizzazione.

<AiAgentProductLists list="ai-agents" />

<strong>La prima apparizione di Luna come ospite di un podcast</strong>

<YouTube id="ZCsOMxnIruA" />

## Portafogli controllati da agenti {#agent-controlled-wallets}

Agenti come Luna o AIXBT controllano i propri portafogli onchain ([Il portafoglio di AIXBT](https://clusters.xyz/aixbt), [Il portafoglio di Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) permettendo loro di dare mance ai fan e partecipare in attività economiche.

Durante la campagna social #LunaMuralChallenge di Luna su X, Luna selezionò e ricompensò i vincitori attraverso il suo portafoglio di Base — marcando <strong>la prima volta che un AI assunse umani per una ricompensa in crypto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Buono a sapersi</strong></p>
<p className="mt-2">Gli agenti IA e i relativi strumenti sono ancora all'inizio dello sviluppo e sono molto sperimentali - usali sempre con cautela.</p>
</AlertContent>
</Alert>

## Controlla il tuo portafoglio utilizzando i comandi della chat {#control-your-wallet-using-chat-commands}

Puoi non addentrarti nelle complicate interfacce della DeFi e gestire le tue cripto semplicemente interfacciandoti con agenti IA.

Questo approccio intuitivo rende le transazioni più veloci, più facili e meno propense a errori come l'invio di fondi a portafogli sbagliati o il pagamento eccessivo di commissioni.

<AiAgentProductLists list="chat" />

## Agenti AI contro Bot AI {#ai-agents-vs-ai-bots}

La differenza tra agenti IA e bot dotati di IA a volte può confondere, entrambi compiono azioni automatizzate basate su istruzioni.

- I bot AI sono come assistenti automatizzati — Seguono istruzioni specifiche e pre-programmate per svolgere attività di routine.
- Gli agenti IA sono dei compagni intelligenti - Imparano dall'esperienza, si adattano a nuove informazioni e prendono decisioni in autonomia.

|                               | Agenti IA                                                                                       | Bot AI                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Interazioni**               | Complesso, adattabile e autonomo                                                                | Scopi semplici, predefiniti, hardcoded                                          |
| **Apprendimento**             | L'apprendimento è continuo, è in grandi di sperimentare e adattarsi a nuovi dati in tempo reale | Opera essendo stato addestrato precedentemente con dati o seguendo regole fisse |
| **Completamento di attività** | Mira a raggiungere obiettivi più ampi                                                           | Si concentrano solo su obiettivi specifici                                      |

## Approfondisci {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Puoi costruire il tuo agente AI {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
