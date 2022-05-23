---
title: Proposte di miglioramento di Ethereum (EIP)
description: Informazioni di base necessarie per capire le proposte di miglioramento di Ethereum (EIP).
lang: it
sidebar: true
---

# Introduzione alle Proposte di miglioramento di Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## Cosa sono le EIP? {#what-are-eips}

Le [Proposte di miglioramento di Ethereum (EIP)](https://eips.ethereum.org/) sono standard che specificano i potenziali nuovi processi e le potenziali funzionalità per Ethereum. Le EIP contengono le specifiche tecniche per i cambiamenti proposti e agiscono da "bocche della verità" per la community. Gli upgrade della rete e gli standard dell'applicazione per Ethereum sono discussi e sviluppati tramite il processo EIP.

Tutti nella community di Ethereum hanno la possibilità di creare un'EIP. Le linee guida per scriverle si trovano in [EIP 1](https://eips.ethereum.org/EIPS/eip-1). L'EIP dovrebbe fornire una specifica tecnica concisa della funzionalità e la sua motivazione. L'autore dell'EIP è responsabile di creare consenso nella community e di documentare le opinioni divergenti. Dato l'elevato livello tecnico richiesto per inviare un'EIP ben fatta, storicamente gran parte degli autori di EIP sono stati sviluppatori di applicazioni o protocolli.

## Perché sono importanti le EIP? {#why-do-eips-matter}

Le EIP giocano un ruolo fondamentale nel definire come si verificano i cambiamenti e come sono documentati su Ethereum. Sono il modo in cui le persone propongono, dibattono e adottano i cambiamenti. Esistono [diversi tipi di EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types) tra cui le EIP fondamentali per i cambiamenti del protocollo di basso livello che influenzano il consenso e richiedono un upgrade della rete e le ERC per gli standard delle applicazioni. Per esempio, standard per creare token, come [ERC20](https://eips.ethereum.org/EIPS/eip-20) o [ERC721](https://eips.ethereum.org/EIPS/eip-721), consentono alle applicazioni di interagire con questi token usando le stesse regole, e facilitando la creazione di applicazioni interoperabili.

Ogni upgrade della rete consiste di una serie di EIP che necessitano di essere implementate da ogni [client di Ethereum](/learn/#clients-and-nodes) sulla rete. Questo implica che per mantenere il consenso con altri client sulla rete principale Ethereum, gli sviluppatori client devono assicurarsi di aver implementato tutte le EIP richieste.

Oltre a fornire una specifica tecnica per le modifiche, le EIP sono l'unità attorno a cui gira la governance di Ethereum: tutti sono liberi di proporne una, e poi varie parti interessate nella community si confronteranno per determinare se deve essere adottata come standard o inclusa in un upgrade della rete. Poiché le EIP non fondamentali non devono essere adottate da tutte le applicazioni (per esempio, puoi creare un [token non ERC20](https://eips.ethereum.org/EIPS/eip-20)), ma le EIP principali devono essere ampiamente adottate (perché tutti i nodi devono aggiornarsi per rimanere parte della stessa rete), le EIP fondamentali richiedono un consenso più ampio all'interno della community rispetto a quelle non fondamentali.

## Storia delle EIP {#history-of-eips}

Il [repository di GitHub delle proposte di miglioramento di Ethereum (EIP)](https://github.com/ethereum/EIPs) è stato creato a ottobre 2015. Il processo delle EIP si basa sul processo delle [proposte di miglioramento di bitcoin (BIP)](https://github.com/bitcoin/bips), che a sua volta si basa sul processo delle [proposte di rafforzamento di Python (PEP)](https://www.python.org/dev/peps/).

Gli editor di EIP devono revisionare le EIP verificando solidità tecnica, grammatica/ortografia e stile del codice. Martin Becze, Vitalik Buterin, Gavin Wood e altri erano gli editori di EIP originali dal 2015 alla fine del 2016. Gli editor EIP attuali sono:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Community)
- Casey Detrio (EWASM/Ethereum Foundation)
- Matt Garnett (Quilt)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (comunità)
- Micah Zoltu (comunità)

Gli editori EIP, insieme ai membri della community di [Ethereum Cat Herders](https://ethereumcatherders.com/) ed [Ethereum Magicians](https://ethereum-magicians.org/), stanno decidendo quale EIP sarà implementato, sono responsabili della facilitazione delle EIP, nonché dello spostamento delle EIP alla fase "Finale" o "Prelievo".

Il processo di standardizzazione completa insieme al grafico sono descritti in [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Maggiori informazioni {#learn-more}

Se ti interessa leggere di più sulle EIP, dai un'occhiata al [sito web delle EIP](https://eips.ethereum.org/) dove puoi trovare informazioni aggiuntive, tra cui:

- [I diversi tipi di EIP](https://eips.ethereum.org/)
- [Un elenco di tutte le EIP create](https://eips.ethereum.org/all)
- [Stati delle EIP e cosa significano](https://eips.ethereum.org/)

## Partecipa {#participate}

Chiunque può creare EIP o ERC sebbene dovresti leggere [EIP-1](https://eips.ethereum.org/EIPS/eip-1), che delinea il processo dell'EPI, cos'è, i suoi tipi, che documentazione dovrebbe contenere, il formato e il modello, l'elenco degli Editor di EIP e tutto ciò che devi sapere a riguardo prima di crearne una. La tua nuova EIP dovrebbe definire nuove funzionalità che non siano ancora molto complesse, ma non super di nicchia e utilizzabili nei progetti dell'ecosistema di Ethereum. La parte più dura è la facilitazione, tu come autore devi facilitare le persone intorno alla tua EIP, raccogliere feedback, scrivere articoli descriventi i problemi risolti dalla tua EIP e collaborare ai progetti per implementarla.

Se sei interessato a seguire il processo di discussione o condividere che pensi sulle EIP, dai un'occhiata al [forum dei Magicians di Ethereum](https://ethereum-magicians.org/), dove le EIP sono discusse con la community.

Vedi anche:

- [Come creare un'EIP](https://eips.ethereum.org/EIPS/eip-1)

## Riferimenti {#references}

<cite class="citation">

Il contenuto della pagina è fornito in parte da [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) di Hudson Jameson

</cite>
