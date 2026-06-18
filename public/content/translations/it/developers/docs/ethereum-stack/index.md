---
title: Introduzione allo stack di Ethereum
description: Una panoramica dei diversi livelli dello stack di Ethereum e di come si integrano tra loro.
lang: it
---

Come per qualsiasi stack software, lo "stack di Ethereum" completo varierà da progetto a progetto a seconda dei tuoi obiettivi.

Ci sono, tuttavia, componenti principali di Ethereum che aiutano a fornire un modello mentale di come le applicazioni software interagiscono con la blockchain di Ethereum. Comprendere i livelli dello stack ti aiuterà a capire i diversi modi in cui Ethereum può essere integrato nei progetti software.

## Livello 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

La [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) è l'ambiente di esecuzione per gli smart contract su Ethereum. Tutti gli smart contract e le modifiche di stato sulla blockchain di Ethereum sono eseguiti tramite [transazioni](/developers/docs/transactions/). L'EVM gestisce tutta l'elaborazione delle transazioni sulla rete Ethereum.

Come per qualsiasi macchina virtuale, l'EVM crea un livello di astrazione tra il codice in esecuzione e la macchina esecutrice (un nodo Ethereum). Attualmente, l'EVM è in esecuzione su migliaia di nodi distribuiti in tutto il mondo.

Internamente, l'EVM utilizza un set di istruzioni di codice operativo (opcode) per eseguire compiti specifici. Questi (140 unici) codici operativi (opcode) consentono all'EVM di essere [Turing-completa](https://en.wikipedia.org/wiki/Turing_completeness), il che significa che l'EVM è in grado di calcolare quasi tutto, date risorse sufficienti.

Come sviluppatore di un'applicazione decentralizzata (dapp), non hai bisogno di sapere molto sull'EVM, se non che esiste e che alimenta in modo affidabile tutte le applicazioni su Ethereum senza tempi di inattività.

## Livello 2: Smart contract {#smart-contracts}

Gli [smart contract](/developers/docs/smart-contracts/) sono i programmi eseguibili che girano sulla blockchain di Ethereum.

Gli smart contract sono scritti utilizzando specifici [linguaggi di programmazione](/developers/docs/smart-contracts/languages/) che vengono compilati in bytecode dell'EVM (istruzioni macchina di basso livello chiamate codici operativi (opcode)).

Gli smart contract non fungono solo da librerie open source, ma sono essenzialmente servizi API aperti sempre in esecuzione e che non possono essere interrotti. Gli smart contract forniscono funzioni pubbliche con cui gli utenti e le applicazioni ([dapp](/developers/docs/dapps/)) possono interagire, senza bisogno di permessi. Qualsiasi applicazione può integrarsi con gli smart contract distribuiti per comporre funzionalità, come l'aggiunta di [feed di dati](/developers/docs/oracles/) o per supportare lo scambio di token. Inoltre, chiunque può distribuire nuovi smart contract su Ethereum al fine di aggiungere funzionalità personalizzate per soddisfare le esigenze della propria applicazione.

Come sviluppatore di dapp, dovrai scrivere smart contract solo se desideri aggiungere funzionalità personalizzate sulla blockchain di Ethereum. Potresti scoprire di poter soddisfare la maggior parte o tutte le esigenze del tuo progetto semplicemente integrandoti con gli smart contract esistenti, ad esempio se desideri supportare i pagamenti in stablecoin o abilitare lo scambio decentralizzato di token.

## Livello 3: Nodi Ethereum {#ethereum-nodes}

Affinché un'applicazione possa interagire con la blockchain di Ethereum, deve connettersi a un [nodo Ethereum](/developers/docs/nodes-and-clients/). La connessione a un nodo consente di leggere i dati della blockchain e/o inviare transazioni alla rete.

I nodi Ethereum sono computer che eseguono un software: un client Ethereum. Un client è un'implementazione di Ethereum che verifica tutte le transazioni in ogni blocco, mantenendo la rete sicura e i dati accurati. **I nodi Ethereum sono la blockchain di Ethereum**. Essi memorizzano collettivamente lo stato della blockchain di Ethereum e raggiungono il consenso sulle transazioni per mutare lo stato della blockchain.

Connettendo la tua applicazione a un nodo Ethereum (tramite l'[API JSON-RPC](/developers/docs/apis/json-rpc/)), la tua applicazione è in grado di leggere i dati dalla blockchain (come i saldi degli account utente) e di trasmettere nuove transazioni alla rete (come il trasferimento di ETH tra account utente o l'esecuzione di funzioni di smart contract).

## Livello 4: API dei client Ethereum {#ethereum-client-apis}

Molte librerie di utilità (create e mantenute dalla community open source di Ethereum) consentono alle tue applicazioni di connettersi e comunicare con la blockchain di Ethereum.

Se la tua applicazione rivolta all'utente è un'app web, potresti scegliere di `npm install` un'[API JavaScript](/developers/docs/apis/javascript/) direttamente nel tuo frontend. O forse sceglierai di implementare questa funzionalità lato server, utilizzando un'API [Python](/developers/docs/programming-languages/python/) o [Java](/developers/docs/programming-languages/java/).

Sebbene queste API non siano un pezzo necessario dello stack, astraggono gran parte della complessità dell'interazione diretta con un nodo Ethereum. Forniscono anche funzioni di utilità (ad es. la conversione di ETH in Gwei) in modo che, come sviluppatore, tu possa dedicare meno tempo ad affrontare le complessità dei client Ethereum e più tempo a concentrarti sulle funzionalità specifiche della tua applicazione.

## Livello 5: Applicazioni per l'utente finale {#end-user-applications}

Al livello più alto dello stack ci sono le applicazioni rivolte all'utente. Queste sono le applicazioni standard che usi e crei regolarmente oggi: principalmente app web e mobili.

Il modo in cui sviluppi queste interfacce utente rimane essenzialmente invariato. Spesso gli utenti non avranno bisogno di sapere che l'applicazione che stanno utilizzando è costruita utilizzando una blockchain.

## Pronto a scegliere il tuo stack? {#ready-to-choose-your-stack}

Dai un'occhiata alla nostra guida per [configurare un ambiente di sviluppo locale](/developers/local-environment/) per la tua applicazione Ethereum.

## Letture consigliate {#further-reading}

- [L'architettura di un'applicazione Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_