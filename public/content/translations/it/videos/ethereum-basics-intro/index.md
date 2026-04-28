---
title: "Basi di Ethereum: introduzione"
description: "Una lezione introduttiva sui fondamenti di Ethereum, che copre cos'è Ethereum, come differisce da Bitcoin e i concetti fondamentali alla base della rete Ethereum."
lang: it
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "introduzione"
format: presentation
author: Quezar
breadcrumb: "Basi di Ethereum"
---

Una lezione introduttiva di **Quezar** che copre i fondamenti di Ethereum, tra cui cosa sono le blockchain, come funzionano internamente e i componenti chiave che costituiscono la rete Ethereum.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=j78ZcIIpi0Q) pubblicata da Quezar. È stata leggermente modificata per facilitarne la lettura.*

#### Benvenuto e panoramica della serie (0:03) {#welcome-and-series-overview-003}

Bentornati a un'altra parte della serie su Ethereum. Se stavate cercando una buona risorsa per capire come funziona Ethereum dietro le quinte, siete nel posto giusto. Nella parte precedente abbiamo visto come leggere e scrivere contratti di base in Solidity e abbiamo discusso brevemente alcune cose sui vari componenti della rete Ethereum. In questa parte faremo un'analisi più approfondita dell'architettura di Ethereum e discuteremo ogni componente in modo molto più dettagliato. Abbiamo molti altri video in arrivo a breve, quindi se vi piace questo tipo di contenuti, cliccate sul pulsante Mi piace e iscrivetevi per ricevere una notifica quando il nuovo video sarà online.

#### Obiettivi e prerequisiti (0:40) {#goals-and-prerequisites-040}

L'obiettivo di questa parte della serie è darvi una buona comprensione dell'architettura di Ethereum nel giro di una settimana. Come per la parte precedente, l'ho strutturata in modo che entro sette giorni vi sentirete molto più a vostro agio con tutto ciò che accade sulla rete Ethereum ogni volta che qualcuno vi svolge un'attività.

Parlando di prerequisiti: non c'è nulla di specifico che dovreste già sapere. Se state guardando questo video, molto probabilmente ne sapete abbastanza sulla rete Ethereum per quanto riguarda questa parte. Ma vi consiglierei di completare la parte precedente della serie, Basi di Solidity, perché quella parte è di natura molto più pratica. Potrete eseguire codice sull'IDE di Remix e vedere come funzionano effettivamente le cose sulla rete Ethereum. Questa parte sarà per lo più teorica e, se avete già affrontato la parte precedente, la troverete molto più facile da seguire.

#### Cosa tratteremo (1:41) {#what-well-cover-141}

In questa parte vedremo cosa sono le blockchain e come funzionano internamente. Vedremo anche quali componenti costituiscono la rete Ethereum, per poi procedere e discutere ogni componente in modo molto più dettagliato.

Per questa parte, ho utilizzato la documentazione ufficiale di Ethereum come base. Una volta terminata questa parte, avrete coperto la maggior parte degli argomenti fondamentali di questa documentazione. Vi sarà molto più facile consultarla. Ovviamente non tutto è nei video, ma ho cercato di trattare tutte le cose a un livello più alto. Potete considerare questa parte come un'introduzione alla documentazione, che è molto più approfondita.

#### Strumenti e approccio (2:30) {#tools-and-approach-230}

Useremo anche Etherscan per vedere come funziona ogni componente in tempo reale. Non preoccupatevi se non riuscite a capire tutto in una volta: potete sempre rivisitare argomenti specifici ogni volta che ne avete voglia. Vi consiglierei di fare delle brevi pause dopo ogni argomento in modo da poterli assimilare meglio. Quindi iniziamo capendo cosa sono le blockchain.