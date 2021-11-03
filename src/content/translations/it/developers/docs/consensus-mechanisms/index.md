---
title: Meccanismi di consenso
description: Spiegazione dei protocolli di consenso nei sistemi distribuiti e ruolo che svolgono in Ethereum.
lang: it
sidebar: true
incomplete: true
---

Per le blockchain come Ethereum, che sono essenzialmente database distribuiti, i nodi della rete devono essere in grado di raggiungere un accordo sullo stato corrente del sistema. Questo risultato si ottiene utilizzando meccanismi di consenso.

Sebbene non sia strettamente legato alla creazione di una dapp, comprendere i meccanismi di consenso aiuterà a spiegare aspetti rilevanti per lo sviluppatore e per l'esperienza degli utenti, come i prezzi del carburante e i tempi delle transazioni.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo di consultare l'[introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Che cos'è un meccanismo di consenso? {#what-is-a-consensus-mechanism}

I meccanismi di consenso (detti anche come protocolli di consenso o algoritmi di consenso) consentono ai sistemi distribuiti (reti di computer) di interagire e rimanere sicuri.

Da decenni questi meccanismi vengono utilizzati per stabilire il consenso tra nodi di database, server applicativi e altre infrastrutture aziendali. Negli ultimi anni sono stati inventati nuovi protocolli di consenso per permettere a sistemi criptoeconomici, come Ethereum, di concordare sullo stato della rete.

Un meccanismo di consenso in un sistema criptoeconomico aiuta anche a prevenire determinati tipi di attacchi economici. In teoria, un aggressore può compromettere il consenso controllando il 51% della rete. I meccanismi di consenso sono concepiti per rendere questo "attacco del 51%" irrealizzabile. Diversi meccanismi sono progettati per risolvere questo problema di sicurezza in modo diverso.

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## Tipi di meccanismi di consenso {#types-of-consensus-mechanisms}

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### Proof of Work {#proof-of-work}

Ethereum, come Bitcoin, utilizza attualmente un protocollo di consenso Proof of Work (PoW).

#### Creazione di blocchi {#pow-block-creation}

La Proof of Work è costituita da [miner](/developers/docs/consensus-mechanisms/pow/mining/), che competono per creare nuovi blocchi pieni di transazioni elaborate. Il vincitore condivide il nuovo blocco con il resto della rete e guadagna ETH appena coniati. La gara è vinta dal computer che riesce a risolvere un rompicapo matematico nel modo più veloce: questo produce il collegamento crittografico tra il blocco corrente e il blocco che lo ha preceduto. Risolvere questo rompicapo rappresenta il lavoro da svolgere nel modello "Proof of Work".

#### Sicurezza {#pow-security}

La sicurezza della rete è garantita dal fatto che è necessario il 51% della potenza totale di elaborazione della rete per frodare la catena. Questo richiederebbe investimenti talmente enormi in attrezzature ed energia, che si rischierebbe di spendere più del profitto ottenibile.

Ulteriori informazioni sulla [Proof of Work (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Proof of Stake {#proof-of-stake}

Ethereum prevede di aggiornare il proprio protocollo di consenso al [Proof of Stake (PoS)](/developers/docs/consensus-mechanisms/pos/).

#### Creazione blocchi {#pos-block-creation}

La Proof of Stake è resa possibile da validatori che fanno stake con i propri ETH per prendere parte al sistema. Un validatore è scelto a caso per creare nuovi blocchi, condividerli con la rete e guadagnare ricompense. Anziché svolgere un intenso lavoro di calcolo, è sufficiente fare stake con gli ETH nella rete. Questo aspetto è ciò che incentiva un comportamento sano della rete.

#### Sicurezza {#pos-security}

Il sistema di Proof of Stake è mantenuto al sicuro dal fatto che sarebbe necessario il 51% del totale di ETH in stake per frodare la catena. E che in caso di comportamento malevolo, viene eseguito lo slashing dello stake.

Ulteriori informazioni sulla [Proof of Stake (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Letture consigliate {#further-reading}

<!-- TODO -->

## Argomenti correlati {#related-topics}

- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)
