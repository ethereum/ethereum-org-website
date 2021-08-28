---
title: Introduzione allo stack di Ethereum
description: Percorso all'interno dei vari livelli dello stack di Ethereum che indica anche come interagiscono.
lang: it
sidebar: true
---

Come ogni stack software, lo "stack di Ethereum" varia da progetto a progetto, in base agli obiettivi di business.

Sono comunque disponibili tecnologie base di Ethereum che aiutano a fornire un modello mentale di come le applicazioni software interagiscono con la blockchain Ethereum. Comprendere i livelli dello stack aiuterà anche a comprendere i molti modi in cui Ethereum può essere integrato all'interno di progetti software.

## Livello 1: macchina virtuale Ethereum {#ethereum-virtual-machine}

La [macchina virtuale Ethereum (EVM)](/developers/docs/evm/) è l'ambiente di runtime per gli Smart Contract su Ethereum. Tutti gli Smart Contract e le modifiche di stato sulla blockchian Ethereum sono eseguiti per mezzo di [transazioni](/developers/docs/transactions/). La EVM gestisce l'elaborazione di tutte le transazioni sulla rete Ethereum.

Come avviene con ogni macchina virtuale, la EVM crea un livello di astrazione fra il codice in esecuzione e la macchina che esegue tale codice (il nodo Ethereum). Al momento la EVM è in esecuzione su migliaia di nodi distribuiti in tutto il mondo.

La EVM utilizza un insieme di istruzioni opcode per eseguire attività specifiche. Questi 140 opcode univoci permettono alla EVM di essere Turing completa, cioè di essere in grado di elaborare praticamente tutto, se sono presenti risorse sufficienti.

A uno sviluppatore di dapp non serve conoscere a fondo la EVM, gli basta sapere che esiste e fa funzionare in modo affidabile tutte le applicazioni su Ethereum senza interruzioni.

## Livello 2: Smart Contract {#smart-contracts}

Gli [Smart Contract](/developers/docs/smart-contracts/) sono i programmi che vengono eseguiti sulla blockchain Ethereum.

Sono scritti in un [linguaggio di programmazione](/developers/docs/smart-contracts/languages/) specifico, che viene compilato in bytecode EVM (istruzioni macchina di basso livello dette opcode).

Gli Smart Contract fungono non solo da librerie open source ma sono essenzialmente servizi open API che vengono eseguiti 24 ore su 24 e 7 giorni su 7, e non possono essere disattivati. Assicurano funzioni pubbliche con cui le applicazioni ([dapp](/developers/docs/dapps/)) possono interagire, senza bisogno di permessi. Ogni applicazione può essere integrata con Smart Contract distribuiti per comporre funzionalità (come ad esempio feed di dati o scambi decentralizzati). Chiunque può distribuire nuovi Smart Contract su Ethereum per aggiungere funzionalità personalizzate che soddisfino le esigenze della propria applicazione.

Uno sviluppatore di dapp deve scrivere Smart Contract solo se intende aggiungere funzionalità personalizzate alla blockchain Ethereum. È infatti possibile soddisfare la maggior parte delle esigenze di un progetto (se non tutte) semplicemente integrando gli Smart Contract esistenti, ad esempio per supportare pagamenti con stablecoin o abilitare lo scambio decentralizzato di token.

## Livello 3: nodi Ethereum {#ethereum-nodes}

Per interagire con la blockchain Ethereum (cioè leggere dati dalla blockchain e/o inviare transazioni alla rete), un'applicazione deve essere connessa a un [nodo Ethereum](/developers/docs/nodes-and-clients/).

I nodi Ethereum sono computer che eseguono software, ovvero un client Ethereum. Un client è una implementazione di Ethereum che verifica tutte le transazioni presenti in un blocco, facendo in modo che la rete rimanga sicura e i dati siano accurati. I nodi Ethereum sono essi stessi la blockchain Ethereum. Memorizzano in maniera collettiva lo stato della blockchain Ethereum e raggiungono il consenso sulle transazioni per modificare lo stato della blockchain.

Un'applicazione collegata a un nodo Ethereum (per mezzo della specifica JSON RPC) è in grado di leggere i dati dalla blockchain (ad esempio il saldo di un account utente) e inviare nuove transazioni alla rete (ad esempio trasferire ETH tra account utente o eseguire funzioni di Smart Contract).

## Livello 4: API client Ethereum {#ethereum-client-apis}

Molte librerie (create e gestite dalla community open source di Ethereum) consentono alle applicazioni per gli utenti finali di connettersi e comunicare con la blockchain Ethereum.

Se un'applicazione per gli utenti è una Wweb app, è possibile decidere di installare tramite `npm install` un'[API JavaScript](/developers/docs/apis/javascript/) direttamente sul frontend. In alternativa, è possibile implementare questa funzionalità sul lato server, usando un'API [Python](/developers/docs/programming-languages/python/) o [Java](/developers/docs/programming-languages/java/).

Pur non essendo necessariamente parte dello stack, queste API eliminano gran parte della complessità necessaria per interagire direttamente con un nodo Ethereum. Assicurano inoltre funzioni di utilità (ad esempio la conversione da ETH ain Gwei) per fare in modo che gli sviluppatori dedichino meno tempo alle complessità dei client Ethereum e più tempo alle funzionalità specifiche dell'applicazione.

## Livello 5: applicazioni per gli utenti finali {#end-user-applications}

Al livello più alto dello stack ci sono le applicazioni rivolte agli utenti. Si tratta delle applicazioni standard utilizzate e create normalmente oggi, principalmente Web app ed applicazioni mobili.

Il modo di progettare queste interfacce utente rimane essenzialmente invariato. Spesso gli utenti non hanno bisogno di sapere che l'applicazione che stanno usando è stata creata usando una blockchain.

## Vuoi scegliere il tuo stack ora? {#ready-to-choose-your-stack}

Consulta la nostra guida per [configurare un ambiente di sviluppo locale](/developers/local-environment/) per un'applicazione Ethereum.

## Letture consigliate {#further-reading}

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_
