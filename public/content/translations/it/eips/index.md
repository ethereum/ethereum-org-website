---
title: Proposte di miglioramento di Ethereum (EIP)
description: Le informazioni di base necessarie per comprendere le EIP
lang: it
---

# Introduzione alle Proposte di miglioramento di Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Cosa sono le EIP? {#what-are-eips}

Le [Proposte di miglioramento di Ethereum (EIP)](https://eips.ethereum.org/) sono standard che specificano nuove potenziali funzionalità o processi per Ethereum. Le EIP contengono le specifiche tecniche per i cambiamenti proposti e agiscono da "bocche della verità" per la community. Gli upgrade della rete e gli standard dell'applicazione per Ethereum sono discussi e sviluppati tramite il processo EIP.

Tutti nella community di Ethereum hanno la possibilità di creare un'EIP. Le linee guida per la stesura delle EIP sono incluse nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Un'EIP, in primo luogo, dovrebbe fornire una specifica tecnica concisa, con una piccola motivazione. L'autore dell'EIP è responsabile di raggiungere il consenso nella community e di documentare le opinioni alternative. Data l'elevata barriera tecnica richiesta per inviare un'EIP ben fatta, storicamente gran parte degli autori di EIP sono tipicamente sviluppatori di applicazioni o protocolli.

## Perché sono importanti le EIP? {#why-do-eips-matter}

Le EIP giocano un ruolo fondamentale nel definire come si verificano i cambiamenti e come sono documentati su Ethereum. Sono il modo in cui le persone propongono, dibattono e adottano i cambiamenti. Esistono [diversi tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), tra cui le EIP principali per le modifiche al protocollo di basso livello che influiscono sul consenso e richiedono un aggiornamento della rete, come l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), e le ERC per gli standard delle applicazioni, come l'[EIP-20](https://eips.ethereum.org/EIPS/eip-20) e l'[EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Ogni aggiornamento della rete consiste in una serie di EIP che devono essere implementate da ogni [client di Ethereum](/learn/#clients-and-nodes) sulla rete. Ciò significa che per mantenere il consenso con altri client sulla Rete Principale di Ethereum, gli sviluppatori client devono assicurarsi di aver implementato tutte le EIP necessarie.

Oltre a fornire una specifica tecnica per le modifiche, le EIP sono l'unità attorno a cui gira la governance di Ethereum: tutti sono liberi di proporne una, e poi varie parti interessate nella community si confronteranno per determinare se deve essere adottata come standard o inclusa in un upgrade della rete. Poiché le EIP non fondamentali non devono essere adottate da tutte le applicazioni (ad esempio, è possibile creare un token fungibile che non implementi l'EIP-20), ma le EIP principali devono essere ampiamente adottate (perché tutti i nodi devono aggiornarsi per rimanere parte della stessa rete), le EIP fondamentali richiedono un consenso più ampio all'interno della community rispetto a quelle non fondamentali.

## Storia delle EIP {#history-of-eips}

Il [repository GitHub delle Proposte di miglioramento di Ethereum (EIP)](https://github.com/ethereum/EIPs) è stato creato nell'ottobre 2015. Il processo EIP si basa sul processo delle [Proposte di miglioramento di Bitcoin (BIP)](https://github.com/bitcoin/bips), che a sua volta si basa sul processo delle [Proposte di miglioramento di Python (PEP)](https://www.python.org/dev/peps/).

Gli editor di EIP devono revisionare le EIP verificando la solidità tecnica, i problemi di formattazione e la correzione di ortografia, grammatica e stile del codice delle EIP. Martin Becze, Vitalik Buterin, Gavin Wood e altri erano gli editori di EIP originali dal 2015 alla fine del 2016.

Gli editor EIP correnti sono

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Gli editori emeriti di EIP sono

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Se desideri diventare un editor di EIP, consulta l'[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Gli editor di EIP decidono quando una proposta è pronta a diventare un'EIP e aiutano gli autori delle EIP a portare avanti le proprie proposte. Gli [Ethereum Cat Herders](https://www.ethereumcatherders.com/) aiutano a organizzare le riunioni tra gli editor di EIP e la comunità (vedi [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Il processo di standardizzazione completo, insieme a un grafico, è descritto nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Scopri di più {#learn-more}

Se sei interessato a saperne di più sulle EIP, consulta il [sito web delle EIP](https://eips.ethereum.org/) e l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Ecco alcuni link utili:

- [Un elenco di tutte le Proposte di miglioramento di Ethereum](https://eips.ethereum.org/all)
- [Una descrizione di tutti i tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descrizione di tutti gli stati delle EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Progetti educativi della comunità {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP è una serie di video didattici che tratta le Proposte di miglioramento di Ethereum (EIP) e le funzionalità chiave dei prossimi aggiornamenti._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf fornisce informazioni aggiuntive sulle Proposte di miglioramento di Ethereum (EIP), inclusi il loro stato, i dettagli di implementazione, le richieste pull correlate e il feedback della comunità._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun fornisce le ultime notizie sulle Proposte di miglioramento di Ethereum (EIP), aggiornamenti sulle riunioni relative alle EIP e altro ancora._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight è una rappresentazione dello stato del processo e delle statistiche delle Proposte di miglioramento di Ethereum (EIP) in base alle informazioni raccolte da diverse risorse._

## Partecipa {#participate}

Chiunque può creare un'EIP. Prima di inviare una proposta, è necessario leggere l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1), che delinea il processo EIP e come scrivere una EIP, e richiedere un feedback su [Ethereum Magicians](https://ethereum-magicians.org/), dove le proposte vengono prima discusse con la comunità prima che venga inviata una bozza.

## Riferimenti {#references}

<cite class="citation">

Il contenuto della pagina è fornito in parte da [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) di Hudson Jameson

</cite>
