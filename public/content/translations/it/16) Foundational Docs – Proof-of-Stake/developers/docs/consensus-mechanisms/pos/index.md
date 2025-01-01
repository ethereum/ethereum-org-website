---
title: Proof-of-stake (PoS)
description: Spiegazione del protocollo di consenso Proof-of-stake e del suo ruolo in Ethereum.
lang: it
---

La Proof of Stake (PoS) è alla base del [meccanismo di consenso](/developers/docs/consensus-mechanisms/) di Ethereum. Ethereum ha attivato il suo meccanismo di Proof of Stake nel 2022 perché è più sicuro, consuma meno energia ed è migliore per implementare nuove soluzioni di ridimensionamento rispetto all'architettura di [Proof of Work](/developers/docs/consensus-mechanisms/pow) precedente.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina ti consigliamo di leggere i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la proof-of-stake (PoS)? {#what-is-pos}

Proof-of-stake è un modo per dimostrare che i validatori hanno messo qualcosa di valore nella rete che può essere distrutto se agiscono in maniera disonesta. Nel proof-of-stake di Ethereum, i validatori mettono esplicitamente in stakaing il capitale sotto  forma di ETH, in un contratto intelligente su Ethereum. Il validatore è poi responsabile di verificare che i nuovi blocchi propagati sulla rete siano validi e, occasionalmente, di creare e propagare nuovi blocchi. Se prova a frodare la rete (ad esempio proponendo blocchi multipli quando dovrebbe inviarne uno o inviando attestazioni conflittuali) alcuni o tutti i suoi ETH in staking possono venire distrutti.

## Validatori {#validators}

Per partecipare come validatore, un utente deve depositare 32 ETH nel contratto di deposito ed eseguire tre software separati: un client di esecuzione, un client di consenso e un client del validatore. Depositando i propri ETH, l'utente si unisce alla coda di attivazione che limita la frequenza di partecipazione alla rete dei nuovi validatori. Una volta attivati, i validatori ricevono nuovi blocchi dai pari sulla rete di Ethereum. Le transazioni inviate nel blocco sono eseguite nuovamente per controllare che i cambiamenti dello stato di Ethereum proposti siano validi e che la firma del blocco sia controllata. Il validatore invia poi nella rete un voto (detto attestazione) a favore di quel blocco.

Se con il proof-of-work la tempistica dei blocchi è determinata dalla difficoltà di mining, nel proof-of-stake il ritmo invece è fisso. Il tempo in Ethereum di proof-of-stake è diviso in slot (12 secondi) ed epoche (32 slot). In ogni slot viene selezionato casualmente un validatore come propositore di blocchi. Questo validatore è responsabile della creazione di un nuovo blocco e del suo invio ad altri nodi sulla rete. Inoltre, in ogni slot, è scelto casualmente un comitato di validatori, i cui voti sono usati per determinare la validità del blocco proposto. Dividere le impostazioni del validatore in comitati è importante per mantenere gestibile il carico della rete. I comitati suddividono la serie di validatori affinché ogni validatore attivo attesti in ogni epoca ma non in ogni slot.

## Come viene eseguita una transazione nel PoS di Ethereum {#transaction-execution-ethereum-pos}

Di seguito è fornita una spiegazione completa dell'esecuzione di una transazione nel proof-of-stake di Ethereum.

1. Un utente crea e firma una [transazione](/developers/docs/transactions/) con la propria chiave privata. Questo processo è solitamente gestito da un portafoglio o da una libreria come [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), ecc., ma in sostanza l'utente sta facendo una richiesta a un nodo utilizzando l'[API JSON-RPC](/developers/docs/apis/json-rpc/) di Ethereum. L'utente definisce l'importo di carburante che è disposto a pagare come mancia a un validatore per incoraggiarlo a includere la transazione in un blocco. Le [mance](/developers/docs/gas/#priority-fee) sono pagate al validatore bruciando la [commissione di base](/developers/docs/gas/#base-fee).
2. La transazione è inviata a un [client di esecuzione](/developers/docs/nodes-and-clients/#execution-client) di Ethereum che ne verifica la validità. Ciò significa assicurarsi che il mittente abbia abbastanza ETH per realizzare la transazione e che l'abbia firmata con la chiave corretta.
3. Se la transazione è valida, il client di esecuzione la aggiunge al proprio mempool locale (elenco di transazioni in sospeso) e inoltre la trasmette agli altri nodi sulla rete di gossip del livello di esecuzione. Quando gli altri nodi ricevono la transazione, la aggiungono anche al proprio mempool locale. Gli utenti avanzati potrebbero astenersi dalla trasmissione della propria transazione, inoltrandola piuttosto a costruttori di blocchi specializzati, come [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Ciò consente loro di organizzare le transazioni nei blocchi successivi per il massimo profitto ([MEV](/developers/docs/mev/#mev-extraction)).
4. Uno dei nodi del validatore sulla rete è il propositore del blocco per lo slot corrente, selezionato precedentemente in modo pseudo-casuale utilizzando RANDAO. Questo nodo è responsabile per la costruzione e trasmissione del blocco successivo da aggiungere alla blockchain di Ethereum e di aggiornare lo stato globale. Il nodo si compone di tre parti: un client di esecuzione, un client di consenso e un client di validazione. Il client di esecuzione raggruppa le transazioni dal mempool locale in un "payload di esecuzione" e le esegue localmente per generare un cambiamento di stato. Questa informazione è passata al client di consenso, dove il payload di esecuzione è impacchettato come parte di un "blocco Beacon" che contiene anche informazioni su ricompense, sanzioni, tagli, attestazioni, ecc., che consentono alla rete di concordare sulla sequenza di blocchi alla testa della catena. La comunicazione tra i client di esecuzione e di consenso è descritta più nel dettaglio in [Connettere i client di consenso e di esecuzione](/developers/docs/networking-layer/#connecting-clients).
5. Gli altri nodi ricevono il nuovo blocco Beacon sulla rete di gossip del livello di consenso. Lo passano al proprio client di esecuzione, dove le transazioni sono rieseguite localmente per garantire che il cambiamento di stato proposto sia valido. Il client di validazione, poi, attesta che il blocco è valido e che è il blocco successivo logico nella sua visione della catena (ossia che si basa sulla catena con il maggior peso di attestazioni, come definito dalle [regole di scelta della diramazione](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Il blocco è aggiunto al database locale in ogni nodo che lo attesta.
6. La transazione è considerabile "finalizzata" se è diventata parte di una catena con un "collegamento di super-maggioranza" tra due punti di controllo. I punti di controllo si trovano all'inizio di ogni epoca ed esistono per rendere conto del fatto che solo un sottoinsieme di validatori attivi attesta in ogni slot, ma tutti i validatori attivi attestano attraverso ogni epoca. Perciò è solo tra epoche che si può dimostrare un "collegamento di super-maggioranza" (è qui che il 66% degli ETH totali in staking sulla rete concorda su due punti di controllo).

Ulteriori dettagli sulla finalità si possono trovare di seguito.

## Finalità {#finality}

Una transazione ha "finalità" nelle reti distribuite quando fa parte di un blocco che non può cambiare senza bruciare un consistente quantitativo di ETH. Su Ethereum di proof-of-stake, questo è gestito usando i blocchi di "punto di controllo". Il primo blocco in ogni epoca è un punto di controllo. I validatori votano per le coppie di punti di controllo che considerano valide. Se una coppia di punti di controllo attrae voti che rappresentano almeno due terzi degli ETH in staking totali, i punti di controllo sono aggiornati. Il più recente dei due (target), diventa "giustificato". Il primo dei due è già giustificato perché era il "target" nell'epoca precedente. Ora è aggiornato a "finalizzato".

Per annullare un blocco finalizzato, un utente malevolo dovrebbe impegnarsi a perdere almeno un terzo dell'offerta totale di ETH in staking. Il motivo esatto di ciò è spiegato in questo [post del blog dell'Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Poiché la finalità richiede una maggioranza di due terzi, un utente malevolo potrebbe impedire alla rete di raggiungere la finalità votando con un terzo dello stake totale. Esiste un meccanismo per difendersi da questa eventualità: la [fuga d'inattività](https://eth2book.info/bellatrix/part2/incentives/inactivity). Questa si attiva ogni volta che la catena non riesce a finalizzare per più di quattro epoche. La fuga d'inattività disperde gli ETH messi in staking dai validatori che votano contro la maggioranza, consentendo a quest'ultima di ottenere nuovamente la maggioranza di due terzi e di finalizzare la catena.

## Sicurezza cripto-economica {#crypto-economic-security}

Gestire un validatore è un impegno. Il validatore deve mantenere hardware e connettività sufficienti per partecipare alla validazione e proposta dei blocchi. In cambio, il validatore è pagato in ETH (il suo saldo di staking aumenta). D'altra parte, la partecipazione come validatore apre anche nuove strade attraverso le quali gli utenti potrebbero attaccare la rete per profitto personale o sabotaggio. Per impedirlo, i validatori perdono le ricompense in ETH se non partecipano quando richiesto e il loro stake esistente può essere distrutto se si comportano in modo disonesto. Due comportamenti principali sono considerabili disonesti: proporre diversi blocchi in uno slot singolo (equivoco) e inviare attestazioni contraddittorie.

L'importo di ETH oggetto di slashing dipende da quanti validatori sono oggetto sanzionati in contemporanea. Questa è nota come la ["sanzione di correlazione"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) e può essere minore (circa l'1% dello stake se viene tagliato un singolo validatore) oppure può comportare la distruzione del 100% dello stake del validatore (taglio di massa). Viene imposto a metà di un periodo di uscita forzata che inizia con una sanzione immediata (fino a 1 ETH) al Giorno 1, la sanzione di correlazione al Giorno 18 e, infine, espulsione dalla rete al Giorno 36. Ogni giorno ricevono modeste sanzioni d'attestazione perché sono presenti sulla rete ma non inviano voti. Tutto questo significa che un attacco coordinato sarebbe molto costoso per un utente malevolo.

## Scelta della biforcazione {#fork-choice}

Quando la rete opera in modo ottimale ed onesto, c'è sempre e solo un nuovo blocco alla testa della catena e tutti i validatori attestano quel blocco. È però possibile che i validatori abbiano una visione differente della testa della catena, a causa della latenza della rete o perché un propositore di blocchi ha equivocato. I client di consenso necessitano quindi di un algoritmo per decidere quale favorire. L'algoritmo usato in Ethereum di proof-of-stake è detto [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) e funziona identificando la biforcazione avente il peso di attestazioni maggiore nella sua storia.

## Proof-of-stake e sicurezza {#pos-and-security}

La minaccia di un [attacco 51%](https://www.investopedia.com/terms/1/51-attack.asp) esiste ancora sul proof-of-stake, come già nel proof-of-work, ma è ancora più rischiosa per gli utenti malevoli. Un utente malevolo necessiterebbe del 51% degli ETH in staking. Potrebbe poi usare le proprie attestazioni per garantire che la propria biforcazione preferita sia quella con le maggiori attestazioni accumulate. Il 'peso' delle attestazioni accumulate è ciò che i client di consenso usano per determinare la catena corretta, così l'utente malevolo potrebbe rendere canonica la propria biforcazione. Tuttavia, un punto di forza del proof-of-stake rispetto al proof-of-work è che la community gode di una flessibilità nel preparare un contrattacco. Ad esempio, i validatori onesti potrebbero decidere di continuare a costruire sulla catena di minoranza e ignorare la biforcazione dell'utente malevolo, incoraggiando app, borse e pool a fare lo stesso. Potrebbero anche decidere di rimuovere forzatamente l'utente malevolo dalla rete e di distruggerne gli ETH in staking. Si tratta di difese economiche forti contro un attacco 51%.

Oltre agli attacchi del 51%, i malintenzionati potrebbero anche tentare altri tipi di attività malevole, come:

- attacchi a lungo raggio (sebbene il gadget di finalità neutralizzi questo vettore di attacco)
- "reorg" a corto raggio (sebbene il potenziamento del propositore e le scadenze dell'attestazione lo mitighino)
- attacchi di rimbalzo e bilanciamento (anch'essi mitigati dal potenziamento del propositore, fermo restando comunque che sono stati dimostrati solo in condizioni di rete idealizzate)
- attacchi valanga (neutralizzati dalla regola degli algoritmi di scelta della biforcazione, di considerare solo l'ultimo messaggio)

In generale è stato dimostrato che il proof-of-stake, come implementato su Ethereum, è più sicuro economicamente rispetto al proof-of-work.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                                         | Contro                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Lo staking rende più semplice per le persone partecipare alla protezione della rete, promuovendo la decentralizzazione. Il nodo del validatore può essere eseguito su un normale laptop. I pool di staking consentono agli utenti di mettere in staking senza avere 32 ETH. | Il proof-of-stake è più giovane e meno testato rispetto al proof-of-work                              |
| Lo staking è più decentralizzato. Non valgono le stesse economie di scala del mining proof-of-work.                                                                                                                                                                         | Il proof-of-stake è più complesso da implementare del proof-of-work                                   |
| Il proof-of-stake offre una maggiore sicurezza cripto-economica rispetto al proof-of-work                                                                                                                                                                                   | Gli utenti devono far funzionare tre parti di software per partecipare al proof-of-stake di Ethereum. |
| È richiesta una minore emissione di nuovi ETH per incentivare i partecipanti alla rete                                                                                                                                                                                      |                                                                                                       |

### Confronto con proof-of-work {#comparison-to-proof-of-work}

Originariamente Ethereum utilizzava il proof-of-work, ma è passata al proof-of-stake nel settembre 2022. Il PoS offre svariati vantaggi rispetto al PoW, come ad esempio:

- migliore efficienza energetica, non serve consumare molta energia sui calcoli di proof-of-work
- minori barriere d'accesso, requisiti hardware ridotti: non serve hardware di alto livello per avere la possibilità di creare nuovi blocchi
- minore rischio di centralizzazione: il proof-of-stake dovrebbe portare un maggior numero di nodi alla rete
- a causa del basso requisito energetico è necessaria una minore emissione di ETH per incentivare la partecipazione
- le sanzioni economiche per comportamenti scorretti rendono gli attacchi di tipo 51% più costosi per un utente malevolo, rispetto al proof-of-work
- la community può ricorrere al recupero sociale di una catena onesta, qualora un attacco 51% dovesse superare le difese cripto-economiche.

## Letture consigliate {#further-reading}

- [Domande Frequenti sul Proof-of-Stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Cos'è il Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Cos'è il Proof of Stake e perché è importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Perché il Proof of Stake (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: come ho imparato ad amare la soggettività debole](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Attacco e difesa del proof-of-stake di Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Una filosofia di progettazione di Proof of Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin spiega il proof-of-stake a Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Argomenti correlati {#related-topics}

- [Proof of Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof of Authority](/developers/docs/consensus-mechanisms/poa/)
