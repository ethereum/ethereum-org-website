---
title: Proposte di Miglioramento di Ethereum (EIP)
description: Le informazioni di base necessarie per comprendere le EIP
lang: it
---

# Introduzione alle Proposte di Miglioramento di Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Cosa sono le EIP? {#what-are-eips}

Le [Proposte di Miglioramento di Ethereum (EIP)](https://eips.ethereum.org/) sono standard che specificano potenziali nuove funzionalità o processi per Ethereum. Le EIP contengono specifiche tecniche per le modifiche proposte e fungono da "fonte di verità" per la community. Gli aggiornamenti della rete e gli standard delle applicazioni per [Ethereum](/) vengono discussi e sviluppati attraverso il processo delle EIP.

Chiunque all'interno della community di Ethereum ha la possibilità di creare una EIP. Le linee guida per scrivere le EIP sono incluse nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Una EIP dovrebbe fornire principalmente una specifica tecnica concisa con una breve motivazione. L'autore dell'EIP è responsabile del raggiungimento del consenso all'interno della community e della documentazione delle opinioni alternative. Data l'elevata barriera tecnica per l'invio di una EIP ben formata, storicamente, la maggior parte degli autori di EIP sono in genere sviluppatori di applicazioni o del protocollo.

## Perché le EIP sono importanti? {#why-do-eips-matter}

Le EIP svolgono un ruolo centrale nel modo in cui le modifiche avvengono e vengono documentate su Ethereum. Sono il modo in cui le persone propongono, discutono e adottano le modifiche. Esistono [diversi tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), tra cui le EIP principali per le modifiche di basso livello del protocollo che influenzano il consenso e richiedono un aggiornamento della rete come l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), e gli ERC per gli standard delle applicazioni come l'[EIP-20](https://eips.ethereum.org/EIPS/eip-20) e l'[EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Ogni aggiornamento della rete consiste in un insieme di EIP che devono essere implementate da ciascun [client di Ethereum](/learn/#clients-and-nodes) sulla rete. Ciò significa che per rimanere in consenso con gli altri client sulla rete principale di Ethereum, gli sviluppatori dei client devono assicurarsi di aver implementato tutte le EIP richieste.

Oltre a fornire una specifica tecnica per le modifiche, le EIP sono l'unità attorno alla quale avviene la governance in Ethereum: chiunque è libero di proporne una, e poi i vari stakeholder della community discuteranno per determinare se debba essere adottata come standard o inclusa in un aggiornamento della rete. Poiché le EIP non principali non devono essere adottate da tutte le applicazioni (ad esempio, è possibile creare un token fungibile che non implementa l'EIP-20), ma le EIP principali devono essere ampiamente adottate (perché tutti i nodi devono aggiornarsi per rimanere parte della stessa rete), le EIP principali richiedono un consenso più ampio all'interno della community rispetto alle EIP non principali.

## Storia delle EIP {#history-of-eips}

Il [repository GitHub delle Proposte di Miglioramento di Ethereum (EIP)](https://github.com/ethereum/EIPs) è stato creato nell'ottobre 2015. Il processo delle EIP si basa sul processo delle [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), che a sua volta si basa sul processo delle [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Gli editor delle EIP hanno il compito di esaminare le EIP per verificarne la solidità tecnica, i problemi di formattazione e correggere l'ortografia, la grammatica e lo stile del codice. Martin Becze, Vitalik Buterin, Gavin Wood e pochi altri sono stati gli editor originali delle EIP dal 2015 alla fine del 2016.

Gli attuali editor delle EIP sono

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Gli editor emeriti delle EIP sono

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Se desideri diventare un editor di EIP, consulta l'[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Gli editor delle EIP decidono quando una proposta è pronta per diventare una EIP e aiutano gli autori delle EIP a portare avanti le loro proposte. Gli [Ethereum Cat Herders](https://www.ethereumcatherders.com/) aiutano a organizzare gli incontri tra gli editor delle EIP e la community (vedi [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

L'intero processo di standardizzazione, insieme a un diagramma, è descritto nell'[EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Per approfondire {#learn-more}

Se ti interessa leggere di più sulle EIP, dai un'occhiata al [sito web delle EIP](https://eips.ethereum.org/) e all'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Ecco alcuni link utili:

- [Un elenco di tutte le Proposte di Miglioramento di Ethereum](https://eips.ethereum.org/all)
- [Una descrizione di tutti i tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descrizione di tutti gli stati delle EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Progetti educativi della community {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP è una serie di video educativi che discute le Proposte di Miglioramento di Ethereum (EIP) e le funzionalità chiave dei prossimi aggiornamenti.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf fornisce informazioni aggiuntive per le Proposte di Miglioramento di Ethereum (EIP), inclusi il loro stato, i dettagli di implementazione, le pull request correlate e il feedback della community.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun fornisce le ultime notizie sulle Proposte di Miglioramento di Ethereum (EIP), aggiornamenti sulle riunioni delle EIP e altro ancora.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight è una rappresentazione dello stato del processo e delle statistiche delle Proposte di Miglioramento di Ethereum (EIP) in base alle informazioni raccolte da diverse risorse.*

## Partecipa {#participate}

Chiunque può creare una EIP. Prima di inviare una proposta, è necessario leggere l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1) che delinea il processo delle EIP e come scrivere una EIP, e richiedere feedback su [Ethereum Magicians](https://ethereum-magicians.org/), dove le proposte vengono prima discusse con la community prima che venga inviata una bozza.

## Riferimenti {#references}

<cite class="citation">

Contenuto della pagina fornito in parte da [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) di Hudson Jameson

</cite>