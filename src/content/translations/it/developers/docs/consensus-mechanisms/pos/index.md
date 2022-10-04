---
title: Proof-of-stake (PoS)
description: Spiegazione del protocollo di consenso Proof-of-stake e del suo ruolo in Ethereum.
lang: it
---

La Proof of Stake (PoS) è alla base del [meccanismo di consenso](/developers/docs/consensus-mechanisms/) di Ethereum. Ethereum ha attivato il suo meccanismo di Proof of Stake nel 2022 perché è più sicuro, consuma meno energia ed è migliore per implementare nuove soluzioni di ridimensionamento rispetto all'architettura di [Proof of Work](/developers/docs/consensus-mechanisms/pow) precedente.

## Prerequisiti {#prerequisites}

Per capire meglio questa pagina ti consigliamo di leggere i [meccanismi di consenso](/developers/docs/consensus-mechanisms/).

## Cos'è la proof-of-stake (PoS)? {#what-is-pos}

La Proof of Stake è alla base di certi [meccanismi di consenso](/developers/docs/consensus-mechanisms/) usati dalle blockchain per ottenere il consenso distribuito. Nel proof-of-work, i miner provano di avere del capitale a rischio consumando energia. Ethereum usa il Proof of Stake, in cui i validatori mettono esplicitamente in stakaing il capitale sotto forma di ETH, in uno smart contract su Ethereum. Questi ETH in staking, poi, fungono da garanzia che può essere distrutta se il validatore si comporta in modo disonesto o pigro. Il validatore è poi responsabile di verificare che i nuovi blocchi propagati sulla rete siano validi e, occasionalmente, di creare e propagare nuovi blocchi.

La Proof of Stake porta con sé una serie di miglioramenti rispetto all'ormai obsoleto sistema Proof of Work:

- migliore efficienza energetica, non serve consumare molta energia sui calcoli di proof-of-work
- minori barriere d'accesso, requisiti hardware ridotti: non serve hardware di alto livello per avere la possibilità di creare nuovi blocchi
- minore rischio di centralizzazione: il proof-of-stake dovrebbe portare un maggior numero di nodi alla rete
- a causa del basso requisito energetico è necessaria una minore emissione di ETH per incentivare la partecipazione
- le sanzioni economiche per comportamenti scorretti rendono gli attacchi di tipo 51% esponenzialmente più costosi per un utente malevolo, rispetto al proof-of-work
- la community può ricorrere al recupero sociale di una catena onesta, qualora un attacco 51% dovesse superare le difese cripto-economiche.

## Validatori {#validators}

Per partecipare come validatore, un utente deve depositare 32 ETH nel contratto di deposito ed eseguire tre software distinti: un client d'esecuzione, uno di consenso e un validatore. Depositando i propri ETH, l'utente si unisce alla coda di attivazione che limita la frequenza di partecipazione alla rete dei nuovi validatori. Una volta attivati, i validatori ricevono nuovi blocchi dai peer sulla rete di Ethereum. Le transazioni consegnate nel blocco sono eseguite nuovamente e la firma del blocco viene verificata per assicurarsi che il blocco sia valido. Il validatore invia poi nella rete un voto (detto attestazione), in favore di quel blocco.

Se con il proof-of-work la tempistica dei blocchi è determinata dalla difficoltà di mining, nel proof-of-stake il tempo invece è fisso. Il tempo in Ethereum di proof-of-stake è diviso in slot (12 secondi) ed epoche (32 slot). In ogni slot viene selezionato casualmente un validatore come propositore di blocchi. Questo validatore è responsabile della creazione di un nuovo blocco e del suo invio ad altri nodi sulla rete. Inoltre, in ogni slot, è scelto casualmente un comitato di validatori, i cui voti sono usati per determinare la validità del blocco proposto.

## Finalità {#finality}

Una transazione ha "finalità" nelle reti distribuite quando fa parte di un blocco che non può cambiare senza che un importo significativo di ETH sia bruciato. Su Ethereum di proof-of-stake, questo è gestito usando i blocchi di "punto di controllo" (checkpoint). Il primo blocco in ogni epoca è un punto di controllo. I validatori votano per le coppie di punti di controllo che considerano valide. Se una coppia di punti di controllo attrae voti che rappresentano almeno due terzi degli ETH in staking totali, i punti di controllo sono aggiornati. Il più recente dei due (target), diventa "giustificato". Il primo dei due è già giustificato perché era il "target" nell'epoca precedente. Ora è aggiornato a "finalizzato". Per annullare un blocco finalizzato, un utente malevolo dovrebbe impegnarsi a perdere almeno un terzo dell'offerta totale di ETH in staking. Il motivo esatto di ciò è spiegato in questo [post del blog dell'Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Poiché la finalità richiede una maggioranza di due terzi, un utente malevolo potrebbe impedire alla rete di raggiungere la finalità votando con un terzo dello stake totale. Esiste un meccanismo per difendersi da questa eventualità: la [perdita per inattività](https://arxiv.org/pdf/2003.03052.pdf). Questa si attiva ogni volta che la catena non riesce a finalizzare per più di quattro epoche. La fuga d'inattività disperde gli ETH messi in staking dai validatori che votano contro la maggioranza, consentendo a quest'ultima di ottenere nuovamente la maggioranza di due terzi e di finalizzare la catena.

## Sicurezza cripto-economica {#crypto-economic-security}

Gestire un validatore è un impegno. Il validatore deve mantenere hardware e connettività sufficienti per partecipare alla validazione e proposta dei blocchi. In cambio, il validatore è pagato in ETH (il suo saldo di staking aumenta). D'altra parte, la partecipazione come validatore apre anche nuove strade attraverso le quali gli utenti potrebbero attaccare la rete per profitto personale o sabotaggio. Per impedirlo, i validatori perdono le ricompense in ETH se non partecipano quando richiesto e il loro stake esistente può essere distrutto se si comportano in modo disonesto. Esistono due comportamenti principali considerabili disonesti: proporre diversi blocchi in uno slot singolo (equivoco) e inviare attestazioni contraddittorie. L'importo di ETH oggetto di slashing dipende da quanti validatori sono oggetto sanzionati in contemporanea. Questa è nota come la ["sanzione di correlazione"](https://arxiv.org/pdf/2003.03052.pdf) e può essere minore (circa l'1% dello stake se viene tagliato un singolo validatore) oppure può comportare la distruzione del 100% dello stake del validatore (taglio di massa). È imposta a metà strada tramite un periodo d'uscita forzato che inizia con una sanzione immediata (fino a 0,5 ETH) al Giorno 1, la sanzione di correlazione al Giorno 18 e, infine, l'espulsione dalla rete al Giorno 36. Ogni giorno ricevono modeste sanzioni d'attestazione perché sono presenti sulla rete ma non inviano voti. Tutto questo significa che un attacco coordinato sarebbe molto costoso per un utente malevolo.

## Scelta della biforcazione {#fork-choice}

Quando la rete opera in modo ottimale ed onesto, c'è sempre e solo un nuovo blocco alla testa della catena e tutti i validatori attestano quel blocco. È però possibile che i validatori abbiano una visione differente della testa della catena, a causa della latenza della rete o perché un propositore di blocchi ha equivocato. I client di consenso necessitano quindi di un algoritmo per decidere quale favorire. L'algoritmo usato in Ethereum proof-of-stake è detto [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) e funziona identificando la biforcazione avente il peso di attestazioni maggiori nella sua storia.

## Proof-of-stake e sicurezza {#pos-and-security}

La minaccia di un [attacco 51%](https://www.investopedia.com/terms/1/51-attack.asp) esiste ancora sul proof-of-stake, come già nel proof-of-work, ma è ancora più rischiosa per gli utenti malevoli. Un utente malevolo necessiterebbe del 51% degli ETH in staking. Potrebbero poi usare le proprie attestazioni per garantire che la propria biforcazione preferita fosse quella con le maggiori attestazioni accumulate. Il 'peso' delle attestazioni accumulate è quello che i client di consenso usano per determinare la catena corretta, così, l'utente malevolo potrebbe rendere canonica la propria biforcazione. Tuttavia, un punto di forza del proof-of-stake rispetto al proof-of-work è che la community gode di una flessibilità nel preparare un contrattacco. Ad esempio, i validatori onesti potrebbero decidere di continuare a costruire sulla catena di minoranza e ignorare la biforcazione dell'utente malevolo, incoraggiando app, scambi e pool a fare lo stesso. Potrebbero anche decidere di rimuovere forzatamente l'utente malevolo dalla rete e di distruggerne gli ETH in staking. Si tratta di difese economiche forti contro un attacco 51%.

Gli attacchi 51% sono solo un tipo di attività malevola. Gli utenti malevoli potrebbero tentare attacchi a lungo raggio (sebbene il gadget di finalità neutralizzi questo vettore d'attacco), a corto raggio 'reorg' (sebbene il potenziamento del propositore e le scadenze dell'attestazione lo mitighino), attacchi di rimbalzo e bilanciamento (anch'essi mitigati dal potenziamento del propositore, fermo restando comunque che sono stati dimostrati solo in condizioni di rete idealizzate) o attacchi valanga (neutralizzati dalla regola degli algoritmi di scelta della biforcazione, di considerare solo l'ultimo messaggio).

In generale è stato dimostrato che il proof-of-stake, come implementato su Ethereum, è più sicuro economicamente rispetto al proof-of-work.

## Pro e contro {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                                         | Contro                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Lo staking rende più semplice per le persone partecipare alla protezione della rete, promuovendo la decentralizzazione. Il nodo del validatore può essere eseguito su un normale laptop. I pool di staking consentono agli utenti di mettere in staking senza avere 32 ETH. | Il proof-of-stake è più giovane e meno testato rispetto al proof-of-work                              |
| Lo staking è più decentralizzato. Non valgono le stesse economie di scala del mining proof-of-work.                                                                                                                                                                         | Il proof-of-stake è più complesso da implementare del proof-of-work                                   |
| Il proof-of-stake offre una maggiore sicurezza cripto-economica rispetto al proof-of-work                                                                                                                                                                                   | Gli utenti devono far funzionare tre parti di software per partecipare al proof-of-stake di Ethereum. |
| È richiesta una minore emissione di nuovi ETH per incentivare i partecipanti alla rete                                                                                                                                                                                      |                                                                                                       |

## Letture consigliate {#further-reading}

- [FAQ Proof of Stake](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Cos'è il Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Cos'è il Proof of Stake e perché è importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [La spiegazione della Beacon Chain Ethereum 2.0 da leggere per prima](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [Perché il Proof of Stake (Nov 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: come ho imparato ad amare la soggettività debole](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Attacco e difesa del Proof of Stake di Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Una filosofia di design di Proof of Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Argomenti correlati {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
