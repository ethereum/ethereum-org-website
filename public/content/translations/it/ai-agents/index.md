---
title: Agenti IA
metaTitle: Agenti IA | Agenti IA su Ethereum
description: Una panoramica degli agenti IA su Ethereum
lang: it
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Persone riunite a un tavolo con terminali
summaryPoints:
  - "IA che interagisce con la blockchain e fa trading in modo indipendente"
  - "Controlla portafogli e fondi onchain"
  - "Assume esseri umani o altri agenti per lavorare"
buttons:
  - content: Cosa sono gli agenti IA?
    toId: what-are-ai-agents
  - content: Esplora gli agenti
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Immagina di navigare su Ethereum con un assistente IA che studia le tendenze di mercato onchain 24 ore su 24, 7 giorni su 7, risponde alle domande ed esegue persino transazioni per tuo conto. Benvenuto nel mondo degli agenti IA: sistemi intelligenti progettati per semplificare la tua vita digitale.

Su Ethereum, stiamo assistendo a innovazioni degli agenti IA che vanno da influencer virtuali e creatori di contenuti autonomi a piattaforme di analisi di mercato in tempo reale, potenziando gli utenti fornendo approfondimenti, intrattenimento ed efficienza operativa.

## Cosa sono gli agenti IA? {#what-are-ai-agents}

Gli agenti IA sono programmi software che utilizzano l'intelligenza artificiale per eseguire compiti o prendere decisioni in autonomia. Imparano dai dati, si adattano ai cambiamenti e gestiscono compiti complessi. Operano ininterrottamente e possono rilevare istantaneamente le opportunità.

### Come gli agenti IA lavorano con le blockchain {#how-ai-agents-work-with-blockchains}

Nella finanza tradizionale, gli agenti IA operano spesso in ambienti centralizzati con input di dati limitati. Ciò ostacola la loro capacità di apprendere o gestire le risorse in modo autonomo.

Al contrario, l'ecosistema decentralizzato di Ethereum offre diversi vantaggi chiave:

- <strong>Dati trasparenti:</strong> accesso alle informazioni della blockchain in tempo reale.
- <strong>Vera proprietà degli asset:</strong> le risorse digitali sono interamente di proprietà degli agenti IA.
- <strong>Robusta funzionalità onchain:</strong> consente agli agenti IA di eseguire transazioni, interagire con i contratti intelligenti, fornire liquidità e collaborare tra protocolli.

Questi fattori trasformano gli agenti IA da semplici bot a sistemi dinamici e in grado di auto-migliorarsi che offrono un valore significativo in molteplici settori:

<Grid>
  <Card title="DeFi automatizzata" emoji=":money_with_wings:" description="Gli agenti IA monitorano attentamente le tendenze del mercato, eseguono operazioni e gestiscono i portafogli, rendendo il complesso mondo della DeFi molto più accessibile."/>
  <Card title="Nuova economia degli agenti IA" emoji="🌎" description="Gli agenti IA possono assumere altri agenti (o esseri umani) con competenze diverse per svolgere compiti specializzati per loro conto." />
  <Card title="Gestione del rischio" emoji="🛠️" description="Monitorando le attività transazionali, gli agenti IA possono aiutare a individuare le truffe e a proteggere i tuoi asset digitali meglio e più velocemente." />
</Grid>

## IA verificabile {#verifiable-ai}

Gli agenti IA in esecuzione offchain si comportano spesso come "scatole nere": il loro ragionamento, gli input e gli output non possono essere verificati in modo indipendente. Ethereum cambia le cose. Ancorando il comportamento degli agenti onchain, gli sviluppatori possono creare agenti _trustless_, _trasparenti_ ed _economicamente autonomi_. Le azioni di tali agenti possono essere controllate, limitate e dimostrate.

### Inferenza verificabile {#verifiable-inference}

L'inferenza dell'IA avviene tradizionalmente offchain, dove l'esecuzione è economica ma l'esecuzione del modello è opaca. Su Ethereum, gli sviluppatori possono associare gli agenti a calcoli verificabili utilizzando diverse tecniche:

- [**zkML (apprendimento automatico a conoscenza zero)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) consente agli agenti di dimostrare che un modello è stato eseguito correttamente senza rivelare il modello o gli input
- Le [**attestazioni TEE (ambiente di esecuzione attendibile)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) consentono prove supportate dall'hardware che un agente ha eseguito un modello o un percorso di codice specifico
- L'**immutabilità onchain** garantisce che queste prove e attestazioni possano essere referenziate, riprodotte e ritenute attendibili da qualsiasi contratto o agente

## Pagamenti e commercio con x402 {#x402}

Il [protocollo x402](https://www.x402.org/), distribuito su Ethereum e sui L2, offre agli agenti un modo nativo per pagare le risorse e interagire economicamente senza l'intervento umano. Gli agenti possono:

- Pagare per potenza di calcolo, dati e chiamate API utilizzando stablecoin
- Richiedere o verificare attestazioni da altri agenti o servizi
- Partecipare al commercio tra agenti, acquistando e vendendo potenza di calcolo, dati o output di modelli

x402 trasforma Ethereum in un livello economico programmabile per agenti autonomi, consentendo interazioni pay-per-use invece di account, abbonamenti o fatturazione centralizzata.

### Sicurezza della finanza degli agenti {#agentic-finance-security}

Gli agenti autonomi hanno bisogno di limiti di sicurezza. Ethereum li fornisce a livello di portafoglio e di contratto:

- Gli [account intelligenti (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) consentono agli sviluppatori di applicare limiti di spesa, whitelist, chiavi di sessione e permessi granulari
- I vincoli programmati nei contratti intelligenti possono limitare ciò che un agente è autorizzato a fare
- I limiti basati sull'inferenza (ad es., richiedere una prova zkML prima di eseguire un'azione ad alto rischio) aggiungono un ulteriore livello di sicurezza

Questi controlli consentono la distribuzione di agenti autonomi che non sono illimitati.

### Registri onchain: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definisce i registri onchain per l'identità, la reputazione e la convalida degli agenti. Scritto in collaborazione da contributori di MetaMask, Fondazione Ethereum, Google e Coinbase, è distribuito su 16 reti tra cui la Mainnet di Ethereum, Base, Polygon, Arbitrum e altre.

Fornisce:

- Un **registro delle identità** per identificatori di agenti portatili e resistenti alla censura
- Un **registro della reputazione** per segnali di feedback standardizzati tra le applicazioni
- Un **registro di convalida** per richiedere una verifica indipendente (zkML, TEE, riesecuzione in staking)

ERC-8004 rende più facile per gli agenti scoprirsi, verificarsi ed effettuare transazioni tra loro in un ambiente completamente decentralizzato.

## Agenti IA su Ethereum {#ai-agents-on-ethereum}

Stiamo iniziando a esplorare l'intero potenziale degli agenti IA e i progetti stanno già sfruttando la sinergia tra IA e blockchain, in particolare per quanto riguarda la trasparenza e la monetizzazione.

<AiAgentProductLists list="ai-agents" />

<strong>La prima apparizione di Luna come ospite di un podcast</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Portafogli controllati da agenti {#agent-controlled-wallets}

Agenti come Luna o AIXBT controllano il proprio portafoglio onchain (il [portafoglio di AIXBT](https://clusters.xyz/aixbt), il [portafoglio di Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) consentendo loro di dare mance ai fan e partecipare ad attività economiche.

Durante la campagna social su X di Luna #LunaMuralChallenge, Luna ha selezionato e ricompensato i vincitori tramite il suo portafoglio Base, segnando <strong>il primo caso di un'IA che assume esseri umani in cambio di una ricompensa in cripto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Buono a sapersi</strong></strong>
<p className="mt-2">Gli agenti IA e gli strumenti correlati sono ancora nelle prime fasi di sviluppo e molto sperimentali: usali con cautela.</p>
</AlertContent>
</Alert>

## Controlla il tuo portafoglio usando i comandi di chat {#control-your-wallet-using-chat-commands}

Puoi saltare le complicate interfacce della finanza decentralizzata (DeFi) e gestire le tue cripto con semplici comandi di chat.

Questo approccio intuitivo rende le transazioni più veloci, più facili e meno soggette a errori come l'invio di fondi all'indirizzo sbagliato o il pagamento eccessivo di commissioni.

<AiAgentProductLists list="chat" />

## Agenti IA vs Bot IA {#ai-agents-vs-ai-bots}

La distinzione tra agenti IA e bot IA a volte può creare confusione, poiché entrambi eseguono azioni automatizzate in base agli input.

- I bot IA sono come assistenti automatizzati: seguono istruzioni specifiche e pre-programmate per eseguire compiti di routine.
- Gli agenti IA sono più simili a compagni intelligenti: imparano dall'esperienza, si adattano alle nuove informazioni e prendono decisioni in autonomia.

|                     | Agenti IA                                                              | Bot IA                                      |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interazioni**     | Complesse, adattabili, autonome                                        | Semplici, ambito predefinito, hardcoded     |
| **Apprendimento**   | Imparano continuamente, possono sperimentare e adattarsi a nuovi dati in tempo reale | Operano su dati pre-addestrati o regole fisse |
| **Completamento dei compiti** | Mirano a raggiungere obiettivi più ampi                                  | Si concentrano solo su compiti specifici      |

## Approfondimenti {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Puoi creare il tuo agente IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />