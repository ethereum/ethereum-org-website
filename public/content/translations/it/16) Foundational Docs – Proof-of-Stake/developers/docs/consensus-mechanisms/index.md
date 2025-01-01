---
title: Meccanismi di consenso
description: Spiegazione dei protocolli di consenso nei sistemi distribuiti e ruolo che svolgono in Ethereum.
lang: it
---

Il termine 'meccanismo di consenso' è usato spesso in modo colloquiale per far riferimento ai protocolli 'Proof of Stake', 'Proof of Work' o 'proof-of-authority'. Tuttavia, questi sono semplicemente dei componenti nel meccanismo di consenso che proteggono dagli [attacchi Sybil](/glossary/#sybil-attack). I meccanismi di consenso sono l'insieme completo di idee, protocolli e incentivi che consentono a una serie distribuita di nodi di acconsentire sullo stato di una blockchain.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, consigliamo innanzitutto di legere l'[introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Che cos'è il consenso? {#what-is-consensus}

Per consenso, intendiamo dire che è stato raggiunto un accordo generale. Consideriamo un gruppo di persone che vanno al cinema. Se non c'è disaccordo sulla proposta del film da scegliere, allora si raggiunge il consenso. Se vi è disaccordo, il gruppo deve avere i mezzi per decidere quale film guardare. Nel caso estremo il gruppo alla fine si dividerà.

Per quanto riguarda la blockchain di Ethereum, raggiungere un consenso significa che almeno il 66% dei nodi sulla rete è d'accordo sul prossimo stato globale della rete.

## Che cos'è un meccanismo di consenso? {#what-is-a-consensus-mechanism}

Il termine meccanismo di consenso si riferisce all'insieme completo di protocolli, incentivi e idee che consente a una rete di nodi di acconsentire sullo stato di una blockchain.

Ethereum usa un meccanismo di consenso basato sul Proof of Stake che trae la propria sicurezza cripto-economica da una serie di ricompense e sanzioni applicate al capitale bloccato dagli staker. Questa struttura di incentivi incoraggia i singoli staker a gestire validatori onesti, punisce coloro che non lo fanno, e crea un costo estremamente elevato per attaccare la rete.

Quindi, esiste un protocollo che governa il modo in cui i validatori onesti sono selezionati per proporre o convalidare i blocchi, elaborare le transazioni e votare per la loro vista della testa della catena. Nelle rare situazioni in cui diversi blocchi sono nella stessa posizione vicino alla testa della catena, esiste un meccanismo di scelta della diramazione che seleziona i blocchi che compongono la catena 'più pesante', misurata dal numero di validatori che hanno votato per i blocchi, ponderato dal loro saldo di ether in staking.

Alcuni concetti importanti per il consenso non sono definiti esplicitamente nel codice, come la sicurezza aggiuntiva offerta dal potenziale coordinamento sociale fuori banda, come un'ultima linea di difesa contro gli attacchi alla rete.

Questi componenti costituiscono nel loro complesso il meccanismo di consenso.

## Tipi di meccanismi di consenso {#types-of-consensus-mechanisms}

### Basato sul Proof of Work {#proof-of-work}

Come Bitcoin, Ethereum in precedenza utilizzava un protocollo di consenso basato sul **Proof of Work (PoW)**.

#### Creazione di blocchi {#pow-block-creation}

I miner competono per creare nuovi blocchi, riempiti di transazioni elaborate. Il vincitore condivide il nuovo blocco con il resto della rete e guadagna ETH appena coniati. La gara è vinta dal computer che è capace di risolvere più velocemente un rompicapo matematico. Ciò produce il collegamento crittografico tra il blocco corrente e quello precedente. Risolvere questo rompicapo rappresenta il lavoro da svolgere nel modello "proof-of-work". La catena canonica è quindi determinata da una regola di scelta della biforcazione, che seleziona la serie di blocchi che ha richiesto il maggiore lavoro per essere minata.

#### Sicurezza {#pow-security}

La sicurezza della rete è garantita dal fatto che occorrerebbe il 51% della potenza totale di elaborazione della rete per frodare la catena. Ciò richiederebbe investimenti ingenti in attrezzature ed energia; con tutta probabilità spenderesti di più del possibile guadagno.

Maggiori informazioni sul [Proof of Work](/developers/docs/consensus-mechanisms/pow/)

### Basato sul Proof of Stake {#proof-of-stake}

Ora Ethereum utilizza un protocollo di consenso basato sul **Proof of Stake (PoS)**.

#### Creazione di blocchi {#pos-block-creation}

I validatori creano i blocchi. Per ogni slot viene selezionato casualmente un validatore che funge da propositore di blocchi. Il client di consenso dei validatori richiede un pacchetto di transazioni come 'payload di esecuzione' dal client di esecuzione associato. Questo viene avvolto in dati di consenso per formare un blocco, che viene inviato ad altri nodi sulla rete Ethereum. La produzione di questo blocco è ricompensata in ETH. Nei rari casi in cui esistono diversi blocchi possibili per un singolo slot, o in cui i nodi vengono a conoscenza dei blocchi in momenti diversi, l'algoritmo di scelta della diramazione seleziona il blocco che forma la catena con il maggiore peso di attestazioni (dove il peso è il numero di validatori che attestano, scalato per il loro saldo di ETH).

#### Sicurezza {#pos-security}

Un sistema di Proof of Stake è cripto-economicamente sicuro poiché un utente malevolo che tenta di prendere il controllo della catena deve distruggere un'enorme quantità di ETH. Un sistema di ricompense incentiva i singoli staker a comportarsi onestamente e le sanzioni disincentivano gli staker dall'agire in modo malevolo.

Maggiori informazioni sul [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)

### Una guida visiva {#types-of-consensus-video}

Scopri altri contenuti sui diversi tipi di meccanismi di consenso usati su Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistenza di Sybil e selezione della catena {#sybil-chain}

Il Proof of Work e il Proof of Stake non sono di per sé protocolli di consenso, ma sono spesso considerati tali per semplicità. Sono in realtà meccanismi di resistenza di Sybil e selettori dell'autore del blocco, ovvero un metodo per decidere chi è l'autore dell'ultimo blocco. Un altro importante componente è l'algoritmo di selezione della catena (anche noto come di scelta della diramazione), che consente ai nodi di selezionare un unico blocco corretto all'inizio della catena, negli scenari in cui esistono più blocchi nella stessa posizione.

La **resistenza a Sybil** misura l'efficacia di un protocollo contro un attacco di Sybil. La resistenza a questo tipo di attacco è essenziale per una blockchain decentralizzata e consente ai miner e ai validatori di essere ricompensati equamente in base alle risorse messe in uso. Proof-of-work e Proof of Stake proteggono da questo rischio, facendo consumare agli utenti molta energia o costringendoli a mettere in campo molte garanzie. Queste protezioni sono un deterrente economico contro gli attacchi di Sybil.

Per decidere quale catena sia quella "corretta" si usa una **regola di selezione della catena**. Bitcoin usa la regola della "catena più lunga", nel senso che la blockchain più lunga è quella che il resto dei nodi accetta come valida e con cui lavora. Per le catene di Proof of Work, la catena più lunga è determinata dalla difficoltà cumulativa e totale del Proof of Work della catena. Anche Ethereum usava la regola della catena più lunga; tuttavia, ora che Ethereum opera sul Proof of Stake, ha adottato un algoritmo di scelta della diramazione che misura il 'peso' della catena. Il peso è la somma cumulata dei voti dei validatori, ponderata dai saldi di ether in staking dei validatori.

Ethereum usa un meccanismo di consenso noto come [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), che combina il [proof-of-work di Casper FFG](https://arxiv.org/abs/1710.09437) con la [regola di scelta della biforcazione di GHOST](https://arxiv.org/abs/2003.03052).

## Letture consigliate {#further-reading}

- [Cos'è l'algoritmo di consenso della blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Cos'è il Consenso di Nakamoto? Guida Completa per Principianti](https://blockonomi.com/nakamoto-consensus/)
- [Come funziona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sulla sicurezza e le prestazioni delle blockchain di Proof of Work](https://eprint.iacr.org/2016/555.pdf)
- [Guasto Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof of Stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof of Authority](/developers/docs/consensus-mechanisms/poa/)
