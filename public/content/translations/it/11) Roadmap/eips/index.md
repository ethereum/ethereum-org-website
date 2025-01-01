---
title: Proposte di miglioramento di Ethereum (EIP)
description: Le informazioni di base necessarie per comprendere le EIP
lang: it
---

# Introduzione alle Proposte di miglioramento di Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Cosa sono le EIP? {#what-are-eips}

Le [Proposte di miglioramento di Ethereum (EIP)](https://eips.ethereum.org/) sono standard che specificano i potenziali nuovi processi e le potenziali funzionalità per Ethereum. Le EIP contengono le specifiche tecniche per i cambiamenti proposti e agiscono da "bocche della verità" per la community. Gli upgrade della rete e gli standard dell'applicazione per Ethereum sono discussi e sviluppati tramite il processo EIP.

Tutti nella community di Ethereum hanno la possibilità di creare un'EIP. Le linee guida per scriverle si trovano in [ EIP-1](https://eips.ethereum.org/EIPS/eip-1). Un'EIP, in primo luogo, dovrebbe fornire una specifica tecnica concisa, con una piccola motivazione. L'autore dell'EIP è responsabile di raggiungere il consenso nella community e di documentare le opinioni alternative. Data l'elevata barriera tecnica richiesta per inviare un'EIP ben fatta, storicamente gran parte degli autori di EIP sono tipicamente sviluppatori di applicazioni o protocolli.

## Perché sono importanti le EIP? {#why-do-eips-matter}

Le EIP giocano un ruolo fondamentale nel definire come si verificano i cambiamenti e come sono documentati su Ethereum. Sono il modo in cui le persone propongono, dibattono e adottano i cambiamenti. Esistono [diversi tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluse le EIP fondamentali per le modifiche al protocollo di basso livello che influenzano il consenso e richiedono un aggiornamento della rete, come [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) e le ERC per gli standard delle applicazioni, come [EIP-20](https://eips.ethereum.org/EIPS/eip-20) ed [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Ogni upgrade della rete consiste di una serie di EIP che necessitano di essere implementate da ogni [client di Ethereum](/learn/#clients-and-nodes) sulla rete. Ciò significa che per mantenere il consenso con altri client sulla Rete Principale di Ethereum, gli sviluppatori client devono assicurarsi di aver implementato tutte le EIP necessarie.

Oltre a fornire una specifica tecnica per le modifiche, le EIP sono l'unità attorno a cui gira la governance di Ethereum: tutti sono liberi di proporne una, e poi varie parti interessate nella community si confronteranno per determinare se deve essere adottata come standard o inclusa in un upgrade della rete. Poiché le EIP non fondamentali non devono essere adottate da tutte le applicazioni (ad esempio, è possibile creare un token fungibile che non implementi l'EIP-20), ma le EIP principali devono essere ampiamente adottate (perché tutti i nodi devono aggiornarsi per rimanere parte della stessa rete), le EIP fondamentali richiedono un consenso più ampio all'interno della community rispetto a quelle non fondamentali.

## Storia delle EIP {#history-of-eips}

Il [repository di GitHub delle proposte di miglioramento di Ethereum (EIP)](https://github.com/ethereum/EIPs) è stato creato a ottobre 2015. Il processo delle EIP si basa sul processo delle [proposte di miglioramento di bitcoin (BIP)](https://github.com/bitcoin/bips), che a sua volta si basa sul processo delle [proposte di rafforzamento di Python (PEP)](https://www.python.org/dev/peps/).

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

Se vorresti diventare un editore EIP, sei pregato di dare un'occhiata all'[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Gli editor di EIP decidono quando una proposta è pronta a diventare un'EIP e aiutano gli autori delle EIP a portare avanti le proprie proposte. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) aiuta a organizzare incontri tra gli editor di EIP e la community (vedi [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Il processo di standardizzazione completa insieme al grafico sono descritti in [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Maggiori informazioni {#learn-more}

Se ti interessa leggere di più sulle EIP, dai un'occhiata al [sito web delle EIP](https://eips.ethereum.org/) e a [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Ecco alcuni link utili:

- [Un elenco di ogni Proposta di miglioramento di Ethereum (EIP)](https://eips.ethereum.org/all)
- [Una descrizione di tutti i tipi di EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descrizione di tutti gli stati delle EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Progetti di istruzione della community {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F): *PEEPanEIP è una serie di video educativi che discute delle Proposte di miglioramento di Ethereum (EIP) e delle funzionalità essenziali dei prossimi aggiornamenti.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research): *EIPs For Nerds fornisce panoramiche complete in stile ELI5 di varie Proposte di miglioramento di Ethereum (EIP), incluse quelle principali e a livello di applicazione/infrastruttura (ERC), per informare i lettori e plasmare il consenso sulle modifiche proposte al protocollo di Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/): *EIPs.wtf fornisce ulteriori informazioni sulle Proposte di miglioramento di Ethereum (EIP) tra cui il loro stato, i dettagli di implementazione, le richieste di inserimento correlate e il feedback della community.*
- [EIP.Fun](https://eipfun.substack.com/): *EIP.Fun fornisce le notizie più recenti sulle Proposte di miglioramento di Ethereum (EIP), aggiornamenti sugli incontri sulle EIP e molto altro.*
- [EIPs Insight](https://eipsinsight.com/): *EIPs Insight è una rappresentazione dello stato del processo e delle statistiche delle Proposte di miglioramento di Ethereum (EIP) per quanto riguarda le informazioni raccolte da risorse differenti.*

## Partecipa {#participate}

Chiunque può creare un'EIP. Prima di inviare una proposta, devi leggere [EIP-1](https://eips.ethereum.org/EIPS/eip-1), che delinea il processo dell'EIP e come scriverne una, e sollecitare un feedback su [Ethereum Magicians](https://ethereum-magicians.org/), dove le proposte sono discusse con la community prima di inviare una bozza.

## Riferimenti {#references}

<cite class="citation">

Il contenuto della pagina è fornito in parte da [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) di Hudson Jameson

</cite>
