---
title: Proof-of-Stake (PoS)
description: Una spiegazione del protocollo di consenso Proof-of-Stake e del suo ruolo in Ethereum.
lang: it
---

La Proof-of-Stake (PoS) è alla base del [meccanismo di consenso](/developers/docs/consensus-mechanisms/) di Ethereum. Ethereum ha attivato il suo meccanismo Proof-of-Stake nel 2022 perché è più sicuro, meno dispendioso in termini di energia e migliore per l'implementazione di nuove soluzioni di ridimensionamento rispetto alla precedente architettura basata sulla [Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la Proof-of-Stake (PoS)? {#what-is-pos}

La Proof-of-Stake è un modo per dimostrare che i validatori hanno inserito qualcosa di valore nella rete che può essere distrutto se agiscono in modo disonesto. Nella Proof-of-Stake di [Ethereum](/), i validatori mettono esplicitamente in staking del capitale sotto forma di ETH in uno smart contract su Ethereum. Il validatore è quindi responsabile di verificare che i nuovi blocchi propagati sulla rete siano validi e, occasionalmente, di creare e propagare egli stesso nuovi blocchi. Se cercano di frodare la rete (ad esempio proponendo più blocchi quando dovrebbero inviarne uno solo o inviando attestazioni in conflitto), parte o tutti i loro ETH in staking possono essere distrutti.

## Validatori {#validators}

Per partecipare come validatore, un utente deve depositare 32 ETH nel contratto di deposito ed eseguire tre software separati: un client di esecuzione, un client di consenso e un client del validatore. Depositando i propri ETH, l'utente si unisce a una coda di attivazione che limita il tasso di nuovi validatori che si uniscono alla rete. Una volta attivati, i validatori ricevono nuovi blocchi dai peer sulla rete Ethereum. Le transazioni consegnate nel blocco vengono rieseguite per verificare che le modifiche proposte allo stato di Ethereum siano valide e viene controllata la firma del blocco. Il validatore invia quindi un voto (chiamato attestazione) a favore di quel blocco attraverso la rete.

Mentre con la Prova di lavoro (PoW), la tempistica dei blocchi è determinata dalla difficoltà di minaggio, nella Proof-of-Stake il ritmo è fisso. Il tempo in Ethereum Proof-of-Stake è diviso in slot (12 secondi) ed epoche (32 slot). Un validatore viene selezionato casualmente per essere un proponente del blocco in ogni slot. Questo validatore è responsabile della creazione di un nuovo blocco e del suo invio agli altri nodi della rete. Inoltre, in ogni slot, viene scelto casualmente un comitato di validatori, i cui voti vengono utilizzati per determinare la validità del blocco proposto. Dividere l'insieme dei validatori in comitati è importante per mantenere gestibile il carico della rete. I comitati dividono l'insieme dei validatori in modo che ogni validatore attivo attesti in ogni epoca, ma non in ogni slot.

## Come viene eseguita una transazione nella PoS di Ethereum {#transaction-execution-ethereum-pos}

Di seguito viene fornita una spiegazione end-to-end di come viene eseguita una transazione nella Proof-of-Stake di Ethereum.

1. Un utente crea e firma una [transazione](/developers/docs/transactions/) con la propria chiave privata. Questo è solitamente gestito da un portafoglio o da una libreria come [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) ecc., ma internamente l'utente sta effettuando una richiesta a un nodo utilizzando l'[API JSON-RPC](/developers/docs/apis/json-rpc/) di Ethereum. L'utente definisce la quantità di gas che è disposto a pagare come commissione prioritaria a un validatore per incoraggiarlo a includere la transazione in un blocco. Le [commissioni prioritarie](/developers/docs/gas/#priority-fee) vengono pagate al validatore mentre la [commissione di base](/developers/docs/gas/#base-fee) viene bruciata.
2. La transazione viene inviata a un [client di esecuzione](/developers/docs/nodes-and-clients/#execution-client) di Ethereum che ne verifica la validità. Ciò significa assicurarsi che il mittente abbia abbastanza ETH per completare la transazione e che l'abbia firmata con la chiave corretta.
3. Se la transazione è valida, il client di esecuzione la aggiunge alla sua mempool locale (elenco delle transazioni in sospeso) e la trasmette anche ad altri nodi sulla rete gossip del livello di esecuzione. Quando altri nodi vengono a conoscenza della transazione, la aggiungono anche alla loro mempool locale. Gli utenti avanzati potrebbero astenersi dal trasmettere la loro transazione e inoltrarla invece a costruttori di blocchi specializzati come [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Ciò consente loro di organizzare le transazioni nei blocchi imminenti per ottenere il massimo profitto ([MEV](/developers/docs/mev/#mev-extraction)).
4. Uno dei nodi validatori sulla rete è il proponente del blocco per lo slot corrente, essendo stato precedentemente selezionato in modo pseudo-casuale utilizzando RANDAO. Questo nodo è responsabile della costruzione e della trasmissione del blocco successivo da aggiungere alla blockchain di Ethereum e dell'aggiornamento dello stato globale. Il nodo è composto da tre parti: un client di esecuzione, un client di consenso e un client del validatore. Il client di esecuzione raggruppa le transazioni dalla mempool locale in un "payload di esecuzione" e le esegue localmente per generare un cambiamento di stato. Queste informazioni vengono passate al client di consenso dove il payload di esecuzione viene avvolto come parte di un "blocco beacon" che contiene anche informazioni su ricompense, penalità, slashing, attestazioni ecc. che consentono alla rete di concordare la sequenza di blocchi in cima alla catena. La comunicazione tra i client di esecuzione e di consenso è descritta in modo più dettagliato in [Connettere i client di consenso e di esecuzione](/developers/docs/networking-layer/#connecting-clients).
5. Altri nodi ricevono il nuovo blocco beacon sulla rete gossip del livello di consenso. Lo passano al loro client di esecuzione dove le transazioni vengono rieseguite localmente per garantire che il cambiamento di stato proposto sia valido. Il client del validatore attesta quindi che il blocco è valido ed è il blocco logico successivo nella loro visione della catena (il che significa che si basa sulla catena con il maggior peso di attestazioni come definito nelle [regole di scelta del fork](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Il blocco viene aggiunto al database locale in ogni nodo che lo attesta.
6. La transazione può essere considerata "finalizzata" se è diventata parte di una catena con un "collegamento di supermaggioranza" tra due checkpoint. I checkpoint si verificano all'inizio di ogni epoca ed esistono per tenere conto del fatto che solo un sottoinsieme di validatori attivi attesta in ogni slot, ma tutti i validatori attivi attestano nel corso di ogni epoca. Pertanto, è solo tra le epoche che può essere dimostrato un 'collegamento di supermaggioranza' (è qui che il 66% degli ETH totali in staking sulla rete concorda su due checkpoint).

Maggiori dettagli sulla definitività possono essere trovati di seguito.

## Definitività {#finality}

Una transazione ha "definitività" nelle reti distribuite quando fa parte di un blocco che non può cambiare senza che una grande quantità di ETH venga bruciata. Sulla Proof-of-Stake di Ethereum, questo viene gestito utilizzando i blocchi "checkpoint". Il primo blocco in ogni epoca è un checkpoint. I validatori votano per coppie di checkpoint che considerano valide. Se una coppia di checkpoint attira voti che rappresentano almeno due terzi degli ETH totali in staking, i checkpoint vengono aggiornati. Il più recente dei due (target) diventa "giustificato". Il precedente dei due è già giustificato perché era il "target" nell'epoca precedente. Ora viene aggiornato a "finalizzato". Questo processo di aggiornamento dei checkpoint è gestito da **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG è uno strumento di definitività dei blocchi per il consenso. Una volta che un blocco è finalizzato, non può subire un revert o essere modificato senza uno slashing della maggioranza degli staker, rendendolo economicamente impraticabile.

Per eseguire il revert di un blocco finalizzato, un utente malintenzionato si impegnerebbe a perdere almeno un terzo dell'offerta totale di ETH in staking. Il motivo esatto di ciò è spiegato in questo [post sul blog della Fondazione Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Poiché la definitività richiede una maggioranza di due terzi, un utente malintenzionato potrebbe impedire alla rete di raggiungere la definitività votando con un terzo dello stake totale. Esiste un meccanismo per difendersi da questo: la [perdita per inattività](https://eth2book.info/bellatrix/part2/incentives/inactivity). Questa si attiva ogni volta che la catena non riesce a finalizzare per più di quattro epoche. La perdita per inattività prosciuga gli ETH in staking dai validatori che votano contro la maggioranza, consentendo alla maggioranza di riconquistare una maggioranza di due terzi e finalizzare la catena.

## Sicurezza criptoeconomica {#crypto-economic-security}

Eseguire un validatore è un commitment. Ci si aspetta che il validatore mantenga hardware e connettività sufficienti per partecipare alla validazione del blocco e alla proposta. In cambio, il validatore viene pagato in ETH (il suo saldo in staking aumenta). D'altra parte, partecipare come validatore apre anche nuove strade agli utenti per attaccare la rete per guadagno personale o sabotaggio. Per evitare ciò, i validatori perdono le ricompense in ETH se non partecipano quando chiamati in causa, e il loro stake esistente può essere distrutto se si comportano in modo disonesto. Due comportamenti principali possono essere considerati disonesti: proporre più blocchi in un singolo slot (equivocazione) e inviare attestazioni contraddittorie.

La quantità di ETH sottoposta a slashing dipende da quanti validatori subiscono lo slashing all'incirca nello stesso momento. Questa è nota come ["penalità di correlazione"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), e può essere minore (\~1% dello stake per un singolo validatore penalizzato da solo) o può comportare la distruzione del 100% dello stake del validatore (evento di slashing di massa). Viene imposta a metà di un periodo di uscita forzata che inizia con una penalità immediata (fino a 1 ETH) il Giorno 1, la penalità di correlazione il Giorno 18 e, infine, l'espulsione dalla rete il Giorno 36. Ricevono penalità di attestazione minori ogni giorno perché sono presenti sulla rete ma non inviano voti. Tutto ciò significa che un attacco coordinato sarebbe molto costoso per l'aggressore.

## Scelta del fork {#fork-choice}

Quando la rete funziona in modo ottimale e onesto, c'è sempre e solo un nuovo blocco in cima alla catena e tutti i validatori lo attestano. Tuttavia, è possibile che i validatori abbiano visioni diverse della cima della catena a causa della latenza di rete o perché un proponente del blocco ha equivocato. Pertanto, i client di consenso richiedono un algoritmo per decidere quale favorire. L'algoritmo utilizzato nella Proof-of-Stake di Ethereum si chiama [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) e funziona identificando il fork che ha il maggior peso di attestazioni nella sua storia.

## Proof-of-Stake e sicurezza {#pos-and-security}

La minaccia di un [attacco del 51%](https://www.investopedia.com/terms/1/51-attack.asp) esiste ancora sulla Proof-of-Stake come sulla Prova di lavoro (PoW), ma è ancora più rischiosa per gli aggressori. Un utente malintenzionato avrebbe bisogno del 51% degli ETH in staking. Potrebbe quindi utilizzare le proprie attestazioni per assicurarsi che il suo fork preferito sia quello con il maggior numero di attestazioni accumulate. Il 'peso' delle attestazioni accumulate è ciò che i client di consenso utilizzano per determinare la catena corretta, quindi questo aggressore sarebbe in grado di rendere il proprio fork quello canonico. Tuttavia, un punto di forza della Proof-of-Stake rispetto alla Prova di lavoro (PoW) è che la comunità ha flessibilità nel montare un contrattacco. Ad esempio, i validatori onesti potrebbero decidere di continuare a costruire sulla catena di minoranza e ignorare il fork dell'aggressore, incoraggiando al contempo app, exchange e pool a fare lo stesso. Potrebbero anche decidere di rimuovere forzatamente l'aggressore dalla rete e distruggere i suoi ETH in staking. Queste sono forti difese economiche contro un attacco del 51%.

Oltre agli attacchi del 51%, i malintenzionati potrebbero anche tentare altri tipi di attività dannose, come:

- attacchi a lungo raggio (sebbene il gadget di definitività neutralizzi questo vettore di attacco)
- 'riorganizzazioni' a corto raggio (sebbene il potenziamento del proponente e le scadenze di attestazione mitighino questo problema)
- attacchi di rimbalzo e bilanciamento (anch'essi mitigati dal potenziamento del proponente, e questi attacchi sono stati comunque dimostrati solo in condizioni di rete idealizzate)
- attacchi a valanga (neutralizzati dalla regola degli algoritmi di scelta del fork di considerare solo l'ultimo messaggio)

Nel complesso, la Proof-of-Stake, così come è implementata su Ethereum, ha dimostrato di essere economicamente più sicura della Prova di lavoro (PoW).

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                 | Contro                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Lo staking rende più facile per gli individui partecipare alla messa in sicurezza della rete, promuovendo la decentralizzazione. Un nodo validatore può essere eseguito su un normale laptop. Le pool di staking consentono agli utenti di fare staking senza avere 32 ETH. | La Proof-of-Stake è più giovane e meno collaudata rispetto alla Prova di lavoro (PoW)              |
| Lo staking è più decentralizzato. Le economie di scala non si applicano allo stesso modo in cui si applicano al minaggio PoW.                                                                                                         | La Proof-of-Stake è più complessa da implementare rispetto alla Prova di lavoro (PoW)                          |
| La Proof-of-Stake offre una maggiore sicurezza criptoeconomica rispetto alla Prova di lavoro (PoW)                                                                                                                                           | Gli utenti devono eseguire tre software per partecipare alla Proof-of-Stake di Ethereum. |
| È richiesta una minore emissione di nuovi ETH per incentivare i partecipanti alla rete                                                                                                                                            |                                                                                         |

### Confronto con la Prova di lavoro (PoW) {#comparison-to-proof-of-work}

Ethereum originariamente utilizzava la Prova di lavoro (PoW) ma è passato alla Proof-of-Stake nel settembre 2022. La PoS offre diversi vantaggi rispetto alla PoW, come:

- migliore efficienza energetica: non è necessario utilizzare molta energia per i calcoli della Prova di lavoro (PoW)
- minori barriere all'ingresso, requisiti hardware ridotti: non c'è bisogno di hardware d'élite per avere la possibilità di creare nuovi blocchi
- ridotto rischio di centralizzazione: la Proof-of-Stake dovrebbe portare a un maggior numero di nodi che proteggono la rete
- a causa del basso fabbisogno energetico, è richiesta una minore emissione di ETH per incentivare la partecipazione
- le penalità economiche per comportamenti scorretti rendono gli attacchi in stile 51% più costosi per un aggressore rispetto alla Prova di lavoro (PoW)
- la comunità può ricorrere al recupero sociale di una catena onesta se un attacco del 51% dovesse superare le difese criptoeconomiche.

## Letture consigliate {#further-reading}

- [FAQ sulla Proof-of-Stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Cos'è la Proof-of-Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Cos'è la Proof-of-Stake e perché è importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Perché la Proof-of-Stake (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof-of-Stake: come ho imparato ad amare la soggettività debole](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Attacco e difesa di Ethereum Proof-of-Stake](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Una filosofia di progettazione della Proof-of-Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin spiega la Proof-of-Stake a Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Argomenti correlati {#related-topics}

- [Prova di lavoro (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Prova di autorità (PoA)](/developers/docs/consensus-mechanisms/poa/)