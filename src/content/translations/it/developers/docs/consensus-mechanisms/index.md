---
title: Meccanismi di consenso
description: Spiegazione dei protocolli di consenso nei sistemi distribuiti e ruolo che svolgono in Ethereum.
lang: it
sidebar: true
incomplete: true
---

Per le blockchain come Ethereum, che sono essenzialmente database distribuiti, i nodi della rete devono essere in grado di raggiungere un accordo sullo stato corrente del sistema. Questo risultato si ottiene utilizzando meccanismi di consenso.

Sebbene i meccanismi di consenso non siano direttamente connessi alla costruzione di una dApp, comprenderli farà chiarezza su concetti rilevanti per la tua esperienza e quella dei tuoi utenti, come i prezzi del "gas" e i tempi delle transazioni.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo di consultare l'[introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Che cos'è il consenso? {#what-is-consensus}

Per consenso, intendiamo dire che è stato raggiunto un accordo generale. Consideriamo un gruppo di persone che vanno al cinema. Se non c'è disaccordo sulla proposta del film da scegliere, allora si raggiunge il consenso. Nel caso estremo il gruppo alla fine si dividerà.

Per quanto riguarda la blockchain, raggiungere un consenso significa che almeno il 51% dei nodi sulla rete è d'accordo sul prossimo stato globale della rete.

## Che cos'è un meccanismo di consenso? {#what-is-a-consensus-mechanism}

I meccanismi di consenso (detti anche protocolli di consenso o algoritmi di consenso) consentono ai sistemi distribuiti (reti di computer) di interagire e rimanere sicuri.

Da decenni questi meccanismi vengono utilizzati per stabilire il consenso tra nodi di database, server applicativi e altre infrastrutture aziendali. Negli ultimi anni sono stati inventati nuovi protocolli di consenso per permettere a sistemi criptoeconomici, come Ethereum, di concordare sullo stato della rete.

Un meccanismo di consenso in un sistema criptoeconomico aiuta inoltre a prevenire determinati tipi di attacchi economici. In teoria, un malintenzionato può compromettere il consenso controllando il 51% della rete. I meccanismi di consenso sono concepiti per rendere questo "attacco al 51%" irrealizzabile. Diversi meccanismi sono progettati per risolvere questo problema di sicurezza in modi diversi.

<YouTube id="dylgwcPH4EA" />

## Tipi di meccanismi di consenso {#types-of-consensus-mechanisms}

### Proof of Work {#proof-of-work}

Ethereum, come Bitcoin, utilizza attualmente un meccanismo di consenso basato sul **Proof of Work (PoW)**.

#### Creazione di blocchi {#pow-block-creation}

Il Proof of Work è costituito da [miner](/developers/docs/consensus-mechanisms/pow/mining/), che competono per creare nuovi blocchi pieni di transazioni elaborate. Il vincitore condivide il nuovo blocco con il resto della rete e guadagna ETH appena coniati. La gara è vinta dal computer che riesce a risolvere un rompicapo matematico più velocemente: questo produce il collegamento crittografico tra il blocco corrente e il blocco che lo ha preceduto. Risolvere questo rompicapo rappresenta il lavoro da svolgere nel modello "Proof of Work".

#### Sicurezza {#pow-security}

La sicurezza della rete è garantita dal fatto che occorrerebbe il 51% della potenza totale di elaborazione della rete per frodare la catena. Ciò richiederebbe investimenti ingenti in attrezzature ed energia; con tutta probabilità spenderesti di più del possibile guadagno.

Maggiori informazioni sul [Proof of Work](/developers/docs/consensus-mechanisms/pow/)

### Proof of Stake {#proof-of-stake}

Ethereum prevede di aggiornare il proprio protocollo di consenso al **Proof of Stake (PoS)**.

#### Creazione blocchi {#pos-block-creation}

Il Proof of Stake è reso possibile da validatori che fanno stake con i propri ETH per prendere parte al sistema. Un validatore è scelto a caso per creare nuovi blocchi, condividerli con la rete e guadagnare ricompense. Anziché svolgere un intenso lavoro di calcolo, è sufficiente fare stake con gli ETH nella rete. Questo aspetto è ciò che incentiva un comportamento sano della rete.

#### Sicurezza {#pos-security}

Il sistema di Proof of Stake è mantenuto al sicuro dal fatto che sarebbe necessario il 51% degli ETH totali in staking per frodare la catena. Inoltre, in caso di comportamento malevolo viene eseguito lo slashing dello stake.

Maggiori informazioni sul [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)

### Una guida visiva {#types-of-consensus-video}

Scopri altri contenuti sui diversi tipi di meccanismi di consenso usati su Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistenza di Sybil e selezione della catena {#sybil-chain}

Tecnicamente, il Proof of Work e il Proof of Stake non sono di per sé protocolli di consenso, ma sono spesso considerati tali per semplicità. Sono in realtà meccanismi di resistenza di Sybil e selettori dell'autore del blocco, ovvero un metodo per decidere chi è l'autore dell'ultimo blocco. È questo meccanismo di resistenza di Sybil, combinato alla regola di selezione della catena, a costituire un vero e proprio meccanismo di consenso.

La **resistenza di Sybil** misura l'efficacia di un protocollo contro un [attacco a Sybil](https://wikipedia.org/wiki/Sybil_attack). Gli attacchi a Sybil si verificano quando un utente o un gruppo si fa passare per un gran numero di utenti. La resistenza a questo tipo di attacco è essenziale per una blockchain decentralizzata e consente ai miner e ai validatori di essere ricompensati equamente in base alle risorse messe in uso. Proof of Work e Proof of Stake proteggono contro questo rischio, facendo consumare agli utenti molta energia o costringendoli a utilizzare molte garanzie. Queste protezioni sono un deterrente economico contro gli attacchi a Sybil.

Una **regola di selezione della catena** è usata per decidere quale catena è quella "corretta". Ethereum e Bitcoin usano attualmente la regola della "catena più lunga", nel senso che la blockchain più lunga è quella che il resto dei nodi accetta come valida e con cui lavora. Per le catene di Proof of Work, la catena più lunga è determinata dalla difficoltà cumulativa e totale del Proof of Work della catena.

La combinazione del Proof of Work e della regola della catena più lunga è nota come "Consenso di Nakamoto"

La [Beacon Chain](/upgrades/beacon-chain/) utilizza un meccanismo di consenso chiamato [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), che è basato sul proof-of-stake.

## Lettura consigliate {#further-reading}

- [Cos'è l'algoritmo di consenso della blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Cos'è il Consenso di Nakamoto? Guida Completa per Principianti](https://blockonomi.com/nakamoto-consensus/)
- [Come funziona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sulla sicurezza e le prestazioni delle blockchain di Proof of Work](https://eprint.iacr.org/2016/555.pdf)

_Conosci una risorsa pubblica che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)
