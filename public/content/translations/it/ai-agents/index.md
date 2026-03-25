---
title: Agenti IA
metaTitle: Agenti IA | Agenti IA su Ethereum
description: Una panoramica degli agenti IA su Ethereum
lang: it
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Persone riunite a un tavolo con terminali
summaryPoint1: IA che interagisce con la blockchain e fa trading in modo indipendente
summaryPoint2: Controlla portafogli e fondi on-chain
summaryPoint3: Assume esseri umani o altri agenti per lavorare
buttons:
  - content: Cosa sono gli agenti IA?
    toId: what-are-ai-agents
  - content: Esplora gli agenti
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Immagina di navigare su Ethereum con un assistente IA che studia le tendenze di mercato on-chain 24 ore su 24, 7 giorni su 7, risponde alle domande e persino esegue transazioni per tuo conto. Benvenuto nel mondo degli Agenti IA: sistemi intelligenti progettati per semplificare la tua vita digitale.

Su Ethereum, stiamo assistendo a innovazioni degli agenti IA che vanno da influencer virtuali e creatori di contenuti autonomi a piattaforme di analisi di mercato in tempo reale, potenziando gli utenti fornendo approfondimenti, intrattenimento ed efficienza operativa.

## Cosa sono gli agenti IA? {#what-are-ai-agents}

Gli agenti IA sono programmi software che utilizzano l'intelligenza artificiale per eseguire compiti o prendere decisioni in autonomia. Imparano dai dati, si adattano ai cambiamenti e gestiscono compiti complessi. Operano ininterrottamente e possono rilevare istantaneamente le opportunità.

### Come gli agenti IA lavorano con le blockchain {#how-ai-agents-work-with-blockchains}

Nella finanza tradizionale, gli agenti IA operano spesso in ambienti centralizzati con input di dati limitati. Ciò ostacola la loro capacità di apprendere o gestire le risorse in modo autonomo.

Al contrario, l'ecosistema decentralizzato di Ethereum offre diversi vantaggi chiave:

- <strong>Dati trasparenti:</strong> Accesso alle informazioni della blockchain in tempo reale.
- <strong>Vera proprietà degli asset:</strong> Gli asset digitali sono interamente di proprietà degli agenti IA.
- <strong>Robusta funzionalità on-chain:</strong> Consente agli Agenti IA di eseguire transazioni, interagire con i contratti intelligenti, fornire liquidità e collaborare tra protocolli.

Questi fattori trasformano gli agenti IA da semplici bot in sistemi dinamici e in grado di auto-migliorarsi che offrono un valore significativo in molteplici settori:

<CardGrid>
  <Card title="DeFi automatizzata" emoji=":money_with_wings:" description="Gli agenti IA tengono d'occhio le tendenze del mercato, eseguono operazioni e gestiscono portafogli, rendendo il complesso mondo della DeFi molto più accessibile."/>
  <Card title="Nuova economia degli agenti IA" emoji="🌎" description="Gli agenti IA possono assumere altri agenti (o esseri umani) con competenze diverse per eseguire compiti specializzati per loro." />
  <Card title="Gestione del rischio" emoji="🛠️" description="Monitorando le attività transazionali, gli agenti IA possono aiutare a individuare le truffe e salvaguardare i tuoi asset digitali in modo migliore e più rapido." />
</CardGrid>

## IA verificabile {#verifiable-ai}

Gli agenti IA in esecuzione fuori catena spesso si comportano come "scatole nere": il loro ragionamento, gli input e gli output non possono essere verificati in modo indipendente. Ethereum cambia le cose. Ancorando il comportamento degli agenti on-chain, gli sviluppatori possono creare agenti _trustless_, _trasparenti_ ed _economicamente autonomi_. Le azioni di tali agenti possono essere controllate, limitate e provate.

### Inferenza verificabile {#verifiable-inference}

L'inferenza dell'IA avviene tradizionalmente fuori catena, dove l'esecuzione è economica ma l'esecuzione del modello è opaca. Su Ethereum, gli sviluppatori possono associare gli agenti a calcoli verificabili utilizzando diverse tecniche:

- Il [**zkML (apprendimento automatico a conoscenza-zero)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) consente agli agenti di dimostrare che un modello è stato eseguito correttamente senza rivelare il modello o gli input
- Le [**attestazioni TEE (ambiente di esecuzione affidabile)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) consentono prove supportate dall'hardware che un agente ha eseguito un modello o un percorso di codice specifico
- L'**immutabilità on-chain** garantisce che queste prove e attestazioni possano essere referenziate, riprodotte e ritenute affidabili da qualsiasi contratto o agente

## Pagamenti e commercio con x402 {#x402}

Il [protocollo x402](https://www.x402.org/), distribuito su Ethereum e sui L2, offre agli agenti un modo nativo per pagare le risorse e interagire economicamente senza l'intervento umano. Gli agenti possono:

- Pagare per calcolo, dati e chiamate API utilizzando stablecoin
- Richiedere o verificare attestazioni da altri agenti o servizi
- Partecipare al commercio da agente ad agente, acquistando e vendendo calcolo, dati o output di modelli

x402 trasforma Ethereum in un livello economico programmabile per agenti autonomi, consentendo interazioni pay-per-use invece di account, abbonamenti o fatturazione centralizzata.

### Sicurezza della finanza degli agenti {#agentic-finance-security}

Gli agenti autonomi hanno bisogno di barriere di sicurezza. Ethereum le fornisce a livello di portafoglio e di contratto:

- Gli [Account intelligenti (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) consentono agli sviluppatori di applicare limiti di spesa, whitelist, chiavi di sessione e permessi granulari
- I vincoli programmati nei contratti intelligenti possono limitare ciò che un agente è autorizzato a fare
- I limiti basati sull'inferenza (ad es., richiedere una prova zkML prima di eseguire un'azione ad alto rischio) aggiungono un ulteriore livello di sicurezza

Questi controlli consentono la distribuzione di agenti autonomi che non sono illimitati.

### Registri on-chain: ERC-8004 {#erc-8004}

L'[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definisce i registri on-chain per l'identità, la reputazione e la convalida degli agenti. Co-scritto da collaboratori di MetaMask, Ethereum Foundation, Google e Coinbase, è distribuito su 16 reti tra cui la rete principale di Ethereum, Base, Polygon, Arbitrum e altre.

Fornisce:

- Un **registro delle identità** per identificatori di agenti portatili e resistenti alla censura
- Un **registro della reputazione** per segnali di feedback standardizzati tra le applicazioni
- Un **registro di convalida** per richiedere una verifica indipendente (zkML, TEE, riesecuzione in staking)

L'ERC-8004 rende più facile per gli agenti scoprirsi, verificarsi e transare tra loro in un ambiente completamente decentralizzato.

## Agenti IA su Ethereum {#ai-agents-on-ethereum}

Stiamo iniziando a esplorare l'intero potenziale degli agenti IA e i progetti stanno già sfruttando la sinergia tra IA e blockchain, in particolare nella trasparenza e nella monetizzazione.

<AiAgentProductLists list="ai-agents" />

<strong>La prima apparizione di Luna come ospite di un podcast</strong>

<YouTube id="ZCsOMxnIruA" />

## Portafogli controllati da agenti {#agent-controlled-wallets}

Agenti come Luna o AIXBT controllano il proprio portafoglio on-chain ([portafoglio di AIXBT](https://clusters.xyz/aixbt), [portafoglio di Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) consentendo loro di dare mance ai fan e partecipare ad attività economiche.

Durante la campagna social su X di Luna #LunaMuralChallenge, Luna ha selezionato e premiato i vincitori tramite il suo portafoglio Base, segnando <strong>il primo caso di un'IA che assume esseri umani per una ricompensa in criptovaluta</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Buono a sapersi</strong></p>
<p className="mt-2">Gli agenti IA e gli strumenti correlati sono ancora in fase di sviluppo iniziale e molto sperimentali: usali con cautela.</p>
</AlertContent>
</Alert>

## Controlla il tuo portafoglio usando i comandi di chat {#control-your-wallet-using-chat-commands}

Puoi saltare le complicate interfacce della DeFi e gestire le tue criptovalute con semplici comandi di chat.

Questo approccio intuitivo rende le transazioni più veloci, più facili e meno inclini a errori come l'invio di fondi all'indirizzo sbagliato o il pagamento eccessivo di commissioni.

<AiAgentProductLists list="chat" />

## Agenti IA vs Bot IA {#ai-agents-vs-ai-bots}

La distinzione tra agenti IA e bot IA a volte può creare confusione, poiché entrambi eseguono azioni automatizzate in base all'input.

- I bot IA sono come assistenti automatizzati: seguono istruzioni specifiche e pre-programmate per eseguire compiti di routine.
- Gli agenti IA sono più simili a compagni intelligenti: imparano dall'esperienza, si adattano a nuove informazioni e prendono decisioni in autonomia.

|                     | Agenti IA                                                              | Bot IA                                      |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interazioni**     | Complesse, adattabili, autonome                                        | Semplici, ambito predefinito, hardcoded     |
| **Apprendimento**   | Impara continuamente, può sperimentare e adattarsi a nuovi dati in tempo reale | Opera su dati pre-addestrati o regole fisse |
| **Completamento dei compiti** | Mira a raggiungere obiettivi più ampi                                  | Si concentra solo su compiti specifici      |

## Approfondimenti {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Puoi costruire il tuo agente IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />