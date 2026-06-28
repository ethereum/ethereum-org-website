---
title: "Ricompense e penalità della proof-of-stake"
description: Scopri gli incentivi integrati nel protocollo di Ethereum proof-of-stake.
lang: it
---

[Ethereum](/) è protetto utilizzando la sua criptovaluta nativa, l'ether (ETH). Gli operatori dei nodi che desiderano partecipare alla convalida dei blocchi e all'identificazione della testa della catena, depositano ether nel [contratto di deposito](/staking/deposit-contract/) su Ethereum. Vengono quindi pagati in ether per eseguire il software del validatore che controlla la validità dei nuovi blocchi ricevuti sulla rete peer-to-peer e applica l'algoritmo di scelta del fork per identificare la testa della catena.

Ci sono due ruoli principali per un validatore: 1) controllare i nuovi blocchi e "attestarli" se sono validi, 2) proporre nuovi blocchi quando selezionato casualmente dal pool totale dei validatori. Se il validatore non riesce a svolgere nessuno di questi compiti quando richiesto, perde un pagamento in ether. A volte i validatori sono anche incaricati dell'aggregazione delle firme e della partecipazione ai comitati di sincronizzazione.

Ci sono anche alcune azioni che sono molto difficili da compiere accidentalmente e indicano un intento malevolo, come proporre più blocchi per lo stesso slot o attestare più blocchi per lo stesso slot. Questi sono comportamenti passibili di "slashing" che comportano la distruzione di una certa quantità di ether del validatore (fino a 1 ETH) prima che il validatore venga rimosso dalla rete, il che richiede 36 giorni. L'ether del validatore penalizzato dallo slashing si esaurisce lentamente durante il periodo di uscita, ma il 18° giorno riceve una "penalità di correlazione" che è maggiore quando più validatori subiscono lo slashing nello stesso periodo. La struttura degli incentivi del meccanismo di consenso, pertanto, ripaga l'onestà e punisce i malintenzionati.

Tutte le ricompense e le penalità vengono applicate una volta per epoca.

Continua a leggere per maggiori dettagli...

## Ricompense e penalità {#rewards}

### Ricompense {#rewards-2}

I validatori ricevono ricompense quando esprimono voti coerenti con la maggioranza degli altri validatori, quando propongono blocchi e quando partecipano ai comitati di sincronizzazione. Il valore delle ricompense in ogni epoca è calcolato da una `base_reward`. Questa è l'unità di base da cui vengono calcolate le altre ricompense. La `base_reward` rappresenta la ricompensa media ricevuta da un validatore in condizioni ottimali per epoca. Questa viene calcolata dal saldo effettivo del validatore e dal numero totale di validatori attivi come segue:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

dove `base_reward_factor` è 64, `base_rewards_per_epoch` è 4 e `sum(active balance)` è l'ether totale in staking tra tutti i validatori attivi.

Ciò significa che la ricompensa di base è proporzionale al saldo effettivo del validatore e inversamente proporzionale al numero di validatori sulla rete. Più validatori ci sono, maggiore è l'emissione complessiva (poiché `sqrt(N)` ma minore è la `base_reward` per validatore (poiché `1/sqrt(N)`). Questi fattori influenzano l'APR per un nodo di staking. Leggi la logica alla base di questo negli [appunti di Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

La ricompensa totale viene quindi calcolata come la somma di cinque componenti, ognuna delle quali ha una ponderazione che determina quanto ciascuna componente aggiunge alla ricompensa totale. Le componenti sono:

```
1. source vote: il validatore ha espresso un voto tempestivo per il checkpoint di origine corretto
2. target vote: il validatore ha espresso un voto tempestivo per il checkpoint di destinazione corretto
3. head vote: il validatore ha espresso un voto tempestivo per il blocco di testa corretto
4. sync committee reward: il validatore ha partecipato a un comitato di sincronizzazione
5. proposer reward: il validatore ha proposto un blocco nello slot corretto
```

Le ponderazioni per ciascuna componente sono le seguenti:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Questi pesi sommano a 64. La ricompensa è calcolata come la somma dei pesi applicabili divisa per 64. Un validatore che ha espresso voti tempestivi per l'origine, la destinazione e la testa, ha proposto un blocco e ha partecipato a un comitato di sincronizzazione potrebbe ricevere `64/64 * base_reward == base_reward`. Tuttavia, un validatore di solito non è un proponente del blocco, quindi la sua ricompensa massima è `64-8 /64 * base_reward == 7/8 * base_reward`. I validatori che non sono né proponenti del blocco né in un comitato di sincronizzazione possono ricevere `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Viene aggiunta un'ulteriore ricompensa per incentivare attestazioni rapide. Questa è la `inclusion_delay_reward`. Ha un valore pari alla `base_reward` moltiplicata per `1/delay` dove `delay` è il numero di slot che separano la proposta del blocco e l'attestazione. Ad esempio, se l'attestazione viene inviata entro uno slot dalla proposta del blocco, l'attestatore riceve `base_reward * 1/1 == base_reward`. Se l'attestazione arriva nello slot successivo, l'attestatore riceve `base_reward * 1/2` e così via.

I proponenti del blocco ricevono `8 / 64 * base_reward` per **ogni attestazione valida** inclusa nel blocco, quindi il valore effettivo della ricompensa scala con il numero di validatori attestanti. I proponenti del blocco possono anche aumentare la loro ricompensa includendo prove di comportamento scorretto da parte di altri validatori nel blocco proposto. Queste ricompense sono le "carote" che incoraggiano l'onestà dei validatori. Un proponente del blocco che include uno slashing verrà ricompensato con la `slashed_validators_effective_balance / 512`.

### Penalità {#penalties}

Finora abbiamo considerato validatori dal comportamento perfetto, ma che dire dei validatori che non esprimono voti tempestivi per la testa, l'origine e la destinazione o lo fanno lentamente?

Le penalità per aver mancato i voti di destinazione e di origine sono pari alle ricompense che l'attestatore avrebbe ricevuto se li avesse inviati. Ciò significa che invece di avere la ricompensa aggiunta al proprio saldo, viene rimosso un valore uguale dal proprio saldo. Non c'è alcuna penalità per aver mancato il voto di testa (ovvero, i voti di testa vengono solo ricompensati, mai penalizzati). Non c'è alcuna penalità associata alla `inclusion_delay`: la ricompensa semplicemente non verrà aggiunta al saldo del validatore. Inoltre, non c'è alcuna penalità per la mancata proposta di un blocco.

Leggi di più su ricompense e penalità nelle [specifiche del consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Le ricompense e le penalità sono state modificate nell'aggiornamento Bellatrix: guarda Danny Ryan e Vitalik discuterne in questo [video di Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slashing {#slashing}

Lo slashing è un'azione più severa che comporta la rimozione forzata di un validatore dalla rete e una conseguente perdita del suo ether in staking. Ci sono tre modi in cui un validatore può subire lo slashing, tutti riconducibili alla proposta o all'attestazione disonesta di blocchi:

- Proponendo e firmando due blocchi diversi per lo stesso slot
- Attestando un blocco che "circonda" un altro (cambiando di fatto la cronologia)
- Effettuando un "doppio voto" attestando due candidati per lo stesso blocco

Se queste azioni vengono rilevate, il validatore subisce lo slashing. Ciò significa che 0,0078125 ETH vengono immediatamente bruciati per un validatore da 32 ETH (scalato linearmente con il saldo attivo), quindi inizia un periodo di rimozione di 36 giorni. Durante questo periodo di rimozione, lo stake del validatore si esaurisce gradualmente. A metà del periodo (giorno 18) viene applicata un'ulteriore penalità la cui entità scala con l'ether totale in staking di tutti i validatori che hanno subito lo slashing nei 36 giorni precedenti all'evento di slashing. Ciò significa che quando più validatori subiscono lo slashing, l'entità dello slashing aumenta. Lo slashing massimo è l'intero saldo effettivo di tutti i validatori penalizzati (ovvero, se ci sono molti validatori che subiscono lo slashing, potrebbero perdere l'intero stake). D'altra parte, un singolo evento di slashing isolato brucia solo una piccola porzione dello stake del validatore. Questa penalità intermedia che scala con il numero di validatori penalizzati è chiamata "penalità di correlazione".

## Perdita per inattività {#inactivity-leak}

Se il livello di consenso ha trascorso più di quattro epoche senza raggiungere la definitività, viene attivato un protocollo di emergenza chiamato "perdita per inattività". Lo scopo ultimo della perdita per inattività è creare le condizioni necessarie affinché la catena recuperi la definitività. Come spiegato sopra, la definitività richiede una maggioranza dei 2/3 dell'ether totale in staking per concordare sui checkpoint di origine e di destinazione. Se i validatori che rappresentano più di 1/3 dei validatori totali vanno offline o non riescono a inviare attestazioni corrette, non è possibile per una supermaggioranza dei 2/3 finalizzare i checkpoint. La perdita per inattività fa sì che lo stake appartenente ai validatori inattivi si esaurisca gradualmente fino a quando non controllano meno di 1/3 dello stake totale, consentendo ai restanti validatori attivi di finalizzare la catena. Per quanto grande sia il pool di validatori inattivi, i restanti validatori attivi finiranno per controllare >2/3 dello stake. La perdita dello stake è un forte incentivo per i validatori inattivi a riattivarsi il prima possibile! Uno scenario di perdita per inattività si è verificato sulla testnet Medalla quando < 66% dei validatori attivi è riuscito a raggiungere il consenso sull'attuale testa della blockchain. La perdita per inattività è stata attivata e la definitività è stata infine recuperata!

Il design delle ricompense, delle penalità e dello slashing del meccanismo di consenso incoraggia i singoli validatori a comportarsi correttamente. Tuttavia, da queste scelte di progettazione emerge un sistema che incentiva fortemente un'equa distribuzione dei validatori su più client e dovrebbe disincentivare fortemente il predominio di un singolo client.

## Letture consigliate {#further-reading}

- [Aggiornamento di Ethereum: il livello degli incentivi](https://eth2book.info/altair/part2/incentives)
- [Incentivi nel protocollo ibrido Casper di Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Specifiche annotate di Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Suggerimenti per la prevenzione dello slashing in Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisi delle penalità di slashing con l'EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Fonti_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_