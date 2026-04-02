---
title: Meccanismi di consenso
description: Una spiegazione dei protocolli di consenso nei sistemi distribuiti e del ruolo che svolgono in Ethereum.
lang: it
---

Il termine "meccanismo di consenso" è spesso usato colloquialmente per riferirsi ai protocolli di "prova di stake", "prova di lavoro" o "proof-of-authority". Tuttavia, questi sono solo componenti dei meccanismi di consenso che proteggono dagli [attacchi Sybil](/glossary/#sybil-attack). I meccanismi di consenso sono l'insieme completo di idee, protocolli e incentivi che consentono a un gruppo distribuito di nodi di concordare sullo stato di una blockchain.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima la nostra [introduzione a Ethereum](/developers/docs/intro-to-ethereum/).

## Cos'è il consenso? {#what-is-consensus}

Per consenso, intendiamo che è stato raggiunto un accordo generale. Considera un gruppo di persone che va al cinema. Se non c'è disaccordo sulla scelta del film proposta, allora si raggiunge un consenso. Se c'è disaccordo, il gruppo deve avere i mezzi per decidere quale film vedere. In casi estremi, il gruppo alla fine si dividerà.

Per quanto riguarda la blockchain di [Ethereum](/), il processo è formalizzato e raggiungere il consenso significa che almeno il 66% dei nodi sulla rete concorda sullo stato globale della rete.

## Cos'è un meccanismo di consenso? {#what-is-a-consensus-mechanism}

Il termine meccanismo di consenso si riferisce all'intero insieme di protocolli, incentivi e idee che consentono a una rete di nodi di concordare sullo stato di una blockchain.

Ethereum utilizza un meccanismo di consenso basato sulla prova di stake che deriva la sua sicurezza crittoeconomica da un insieme di ricompense e penalità applicate al capitale bloccato dagli staker. Questa struttura di incentivi incoraggia i singoli staker a operare validatori onesti, punisce coloro che non lo fanno e crea un costo estremamente elevato per attaccare la rete.

Inoltre, c'è un protocollo che governa come i validatori onesti vengono selezionati per proporre o convalidare i blocchi, elaborare le transazioni e votare per la loro visione della testa della catena. Nelle rare situazioni in cui più blocchi si trovano nella stessa posizione vicino alla testa della catena, c'è un meccanismo di scelta della biforcazione che seleziona i blocchi che compongono la catena più "pesante", misurata dal numero di validatori che hanno votato per i blocchi ponderato dal loro saldo di ether in stake.

Alcuni concetti importanti per il consenso non sono esplicitamente definiti nel codice, come la sicurezza aggiuntiva offerta dal potenziale coordinamento sociale fuori banda come ultima linea di difesa contro gli attacchi alla rete.

Questi componenti insieme formano il meccanismo di consenso.

## Tipi di meccanismi di consenso {#types-of-consensus-mechanisms}

### Basato sulla prova di lavoro {#proof-of-work}

Come Bitcoin, Ethereum un tempo utilizzava un protocollo di consenso basato sulla **prova di lavoro (PoW)**.

#### Creazione dei blocchi {#pow-block-creation}

I miner competono per creare nuovi blocchi pieni di transazioni elaborate. Il vincitore condivide il nuovo blocco con il resto della rete e guadagna alcuni ETH appena coniati. La gara viene vinta dal computer che è in grado di risolvere un enigma matematico più velocemente. Questo produce il collegamento crittografico tra il blocco corrente e il blocco precedente. Risolvere questo enigma è il lavoro nella "prova di lavoro". La catena canonica è quindi determinata da una regola di scelta della biforcazione che seleziona l'insieme di blocchi che hanno richiesto il maggior lavoro per essere estratti.

#### Sicurezza {#pow-security}

La rete è mantenuta sicura dal fatto che avresti bisogno del 51% della potenza di calcolo della rete per frodare la catena. Ciò richiederebbe investimenti così enormi in attrezzature ed energia; è probabile che spenderesti più di quanto guadagneresti.

Maggiori informazioni sulla [prova di lavoro](/developers/docs/consensus-mechanisms/pow/)

### Basato sulla prova di stake {#proof-of-stake}

Ethereum ora utilizza un protocollo di consenso basato sulla **prova di stake (PoS)**.

#### Creazione dei blocchi {#pos-block-creation}

I validatori creano i blocchi. Un validatore viene selezionato casualmente in ogni slot per essere il proponente del blocco. Il loro client di consenso richiede un pacchetto di transazioni come "carico utile di esecuzione" dal loro client di esecuzione associato. Lo avvolgono nei dati di consenso per formare un blocco, che inviano ad altri nodi sulla rete Ethereum. Questa produzione di blocchi è ricompensata in ETH. In rari casi in cui esistono più blocchi possibili per un singolo slot, o i nodi vengono a conoscenza dei blocchi in momenti diversi, l'algoritmo di scelta della biforcazione sceglie il blocco che forma la catena con il maggior peso di attestazioni (dove il peso è il numero di validatori che attestano proporzionato al loro saldo in ETH).

#### Sicurezza {#pos-security}

Un sistema di prova di stake è sicuro dal punto di vista crittoeconomico perché un utente malintenzionato che tenta di prendere il controllo della catena deve distruggere un'enorme quantità di ETH. Un sistema di ricompense incentiva i singoli staker a comportarsi onestamente e le penalità disincentivano gli staker dall'agire in modo dannoso.

Maggiori informazioni sulla [prova di stake](/developers/docs/consensus-mechanisms/pos/)

### Una guida visiva {#types-of-consensus-video}

Guarda di più sui diversi tipi di meccanismi di consenso utilizzati su Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistenza Sybil e selezione della catena {#sybil-chain}

La prova di lavoro e la prova di stake da sole non sono protocolli di consenso, ma spesso vengono definite tali per semplicità. In realtà sono meccanismi di resistenza agli attacchi Sybil e selettori dell'autore del blocco; sono un modo per decidere chi è l'autore dell'ultimo blocco. Un altro componente importante è l'algoritmo di selezione della catena (noto anche come scelta della biforcazione) che consente ai nodi di scegliere un singolo blocco corretto alla testa della catena in scenari in cui esistono più blocchi nella stessa posizione.

La **resistenza Sybil** misura come un protocollo si comporta contro un attacco Sybil. La resistenza a questo tipo di attacco è essenziale per una blockchain decentralizzata e consente ai miner e ai validatori di essere ricompensati equamente in base alle risorse investite. La prova di lavoro e la prova di stake proteggono da questo facendo in modo che gli utenti spendano molta energia o mettano a disposizione molte garanzie. Queste protezioni sono un deterrente economico agli attacchi Sybil.

Una **regola di selezione della catena** viene utilizzata per decidere quale catena sia quella "corretta". Bitcoin utilizza la regola della "catena più lunga", il che significa che qualunque blockchain sia la più lunga sarà quella che il resto dei nodi accetterà come valida e con cui lavorerà. Per le catene di prova di lavoro, la catena più lunga è determinata dalla difficoltà totale cumulativa della prova di lavoro della catena. Anche Ethereum utilizzava la regola della catena più lunga; tuttavia, ora che Ethereum funziona con la prova di stake, ha adottato un algoritmo di scelta della biforcazione aggiornato che misura il "peso" della catena. Il peso è la somma accumulata dei voti dei validatori, ponderata dai saldi di ether in stake dei validatori.

Ethereum utilizza un meccanismo di consenso noto come [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) che combina la [prova di stake Casper FFG](https://arxiv.org/abs/1710.09437) con la [regola di scelta della biforcazione GHOST](https://arxiv.org/abs/2003.03052).

## Letture consigliate {#further-reading}

- [Cos'è un algoritmo di consenso della blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Cos'è il consenso di Nakamoto? Guida completa per principianti](https://blockonomi.com/nakamoto-consensus/)
- [Come funziona Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sulla sicurezza e le prestazioni delle blockchain di prova di lavoro](https://eprint.iacr.org/2016/555.pdf)
- [Guasto bizantino](https://en.wikipedia.org/wiki/Byzantine_fault)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Argomenti correlati {#related-topics}

- [Prova di lavoro](/developers/docs/consensus-mechanisms/pow/)
- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova di stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)