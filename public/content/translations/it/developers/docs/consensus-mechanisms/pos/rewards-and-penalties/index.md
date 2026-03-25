---
title: "Ricompense e penalità della prova di stake"
description: Scopri gli incentivi interni al protocollo nella prova di stake di Ethereum.
lang: it
---

[Ethereum](/) è protetto utilizzando la sua criptovaluta nativa, l'ether (ETH). Gli operatori dei nodi che desiderano partecipare alla convalida dei blocchi e all'identificazione della testa della catena, depositano ether nel [contratto di deposito](/staking/deposit-contract/) su Ethereum. Vengono quindi pagati in ether per eseguire il software del validatore che controlla la validità dei nuovi blocchi ricevuti sulla rete peer-to-peer e applicano l'algoritmo di scelta della biforcazione per identificare la testa della catena.

Ci sono due ruoli principali per un validatore: 1) controllare i nuovi blocchi e "attestarli" se sono validi, 2) proporre nuovi blocchi quando selezionato casualmente dal pool totale dei validatori. Se il validatore non riesce a svolgere nessuno di questi compiti quando richiesto, perde un pagamento in ether. A volte ai validatori viene anche assegnato il compito di aggregare le firme e partecipare ai comitati di sincronizzazione.

Ci sono anche alcune azioni che sono molto difficili da compiere accidentalmente e indicano un intento malevolo, come proporre più blocchi per lo stesso slot o attestare più blocchi per lo stesso slot. Questi sono comportamenti "punibili" che comportano per il validatore il bruciare di una certa quantità di ether (fino a 1 ETH) prima che il validatore venga rimosso dalla rete, il che richiede 36 giorni. L'ether del validatore punito si esaurisce lentamente durante il periodo di uscita, ma il 18° giorno riceve una "penalità di correlazione" che è maggiore quando più validatori vengono puniti nello stesso periodo. La struttura degli incentivi del meccanismo di consenso paga quindi per l'onestà e punisce i cattivi attori.

Tutte le ricompense e le penalità vengono applicate una volta per epoca.

Continua a leggere per maggiori dettagli...

## Ricompense e penalità {#rewards}

### Ricompense {#rewards}

I validatori ricevono ricompense quando esprimono voti coerenti con la maggioranza degli altri validatori, quando propongono blocchi e quando partecipano ai comitati di sincronizzazione. Il valore delle ricompense in ogni epoca è calcolato da una `base_reward`. Questa è l'unità di base da cui vengono calcolate le altre ricompense. La `base_reward` rappresenta la ricompensa media ricevuta da un validatore in condizioni ottimali per epoca. Questa viene calcolata dal saldo effettivo del validatore e dal numero totale di validatori attivi come segue:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

dove `base_reward_factor` è 64, `base_rewards_per_epoch` è 4 e `sum(active balance)` è l'ether totale messo in stake tra tutti i validatori attivi.

Questo significa che la ricompensa di base è proporzionale al saldo effettivo del validatore e inversamente proporzionale al numero di validatori sulla rete. Più validatori ci sono, maggiore è l'emissione complessiva (come `sqrt(N)`) ma minore è la `base_reward` per validatore (come `1/sqrt(N)`). Questi fattori influenzano l'APR per un nodo di staking. Leggi la logica di questo negli [appunti di Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

La ricompensa totale viene quindi calcolata come la somma di cinque componenti, ognuna delle quali ha un peso che determina quanto ciascuna componente aggiunge alla ricompensa totale. Le componenti sono:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

I pesi per ciascuna componente sono i seguenti:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Questi pesi sommano a 64. La ricompensa è calcolata come la somma dei pesi applicabili divisa per 64. Un validatore che ha effettuato voti tempestivi di origine, destinazione e testa, ha proposto un blocco e ha partecipato a un comitato di sincronizzazione potrebbe ricevere `64/64 * base_reward == base_reward`. Tuttavia, un validatore di solito non è un proponente del blocco, quindi la sua ricompensa massima è `64-8 /64 * base_reward == 7/8 * base_reward`. I validatori che non sono né proponenti del blocco né in un comitato di sincronizzazione possono ricevere `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Viene aggiunta un'ulteriore ricompensa per incentivare le attestazioni rapide. Questa è la `inclusion_delay_reward`. Ha un valore pari alla `base_reward` moltiplicata per `1/delay` dove `delay` è il numero di slot che separano la proposta del blocco e l'attestazione. Ad esempio, se l'attestazione viene inviata entro uno slot dalla proposta del blocco, l'attestatore riceve `base_reward * 1/1 == base_reward`. Se l'attestazione arriva nello slot successivo, l'attestatore riceve `base_reward * 1/2` e così via.

I proponenti del blocco ricevono `8 / 64 * base_reward` per **ogni attestazione valida** inclusa nel blocco, quindi il valore effettivo della ricompensa scala con il numero di validatori attestanti. I proponenti del blocco possono anche aumentare la loro ricompensa includendo prove di comportamento scorretto da parte di altri validatori nel blocco proposto. Queste ricompense sono le "carote" che incoraggiano l'onestà del validatore. Un proponente del blocco che include il punire verrà ricompensato con il `slashed_validators_effective_balance / 512`.

### Penalità {#penalties}

Finora abbiamo considerato validatori dal comportamento perfetto, ma che dire dei validatori che non effettuano voti tempestivi di testa, origine e destinazione o lo fanno lentamente?

Le penalità per aver mancato i voti di destinazione e origine sono pari alle ricompense che l'attestatore avrebbe ricevuto se li avesse inviati. Questo significa che invece di avere la ricompensa aggiunta al proprio saldo, viene rimosso un valore uguale dal proprio saldo. Non c'è alcuna penalità per aver mancato il voto di testa (cioè, i voti di testa vengono solo ricompensati, mai penalizzati). Non c'è alcuna penalità associata all'`inclusion_delay` - la ricompensa semplicemente non verrà aggiunta al saldo del validatore. Non c'è inoltre alcuna penalità per non aver proposto un blocco.

Leggi di più su ricompense e penalità nelle [specifiche del consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Le ricompense e le penalità sono state modificate nell'aggiornamento Bellatrix - guarda Danny Ryan e Vitalik discuterne in questo [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Punire {#slashing}

Punire è un'azione più severa che comporta la rimozione forzata di un validatore dalla rete e una perdita associata del suo ether messo in stake. Ci sono tre modi in cui un validatore può essere punito, tutti riconducibili alla proposta disonesta o all'attestazione di blocchi:

- Proponendo e firmando due blocchi diversi per lo stesso slot
- Attestando un blocco che "circonda" un altro (cambiando di fatto la cronologia)
- Con il "doppio voto", attestando due candidati per lo stesso blocco

Se queste azioni vengono rilevate, il validatore viene punito. Questo significa che 0,0078125 ETH vengono immediatamente bruciati per un validatore da 32 ETH (scalato linearmente con il saldo attivo), quindi inizia un periodo di rimozione di 36 giorni. Durante questo periodo di rimozione, lo stake del validatore si esaurisce gradualmente. A metà del periodo (Giorno 18) viene applicata una penalità aggiuntiva la cui entità scala con l'ether totale messo in stake di tutti i validatori puniti nei 36 giorni precedenti all'evento di punizione. Questo significa che quando più validatori vengono puniti, l'entità della punizione aumenta. La punizione massima è l'intero saldo effettivo di tutti i validatori puniti (cioè, se ci sono molti validatori che vengono puniti, potrebbero perdere l'intero stake). D'altra parte, un singolo evento di punizione isolato brucia solo una piccola porzione dello stake del validatore. Questa penalità intermedia che scala con il numero di validatori puniti è chiamata "penalità di correlazione".

## Perdita per inattività {#inactivity-leak}

Se il livello di consenso è trascorso per più di quattro epoche senza finalizzare, viene attivato un protocollo di emergenza chiamato "perdita per inattività" (inactivity leak). Lo scopo ultimo della perdita per inattività è creare le condizioni necessarie affinché la catena recuperi la finalità. Come spiegato sopra, la finalità richiede una maggioranza di 2/3 dell'ether totale messo in stake per concordare sui checkpoint di origine e destinazione. Se i validatori che rappresentano più di 1/3 dei validatori totali vanno offline o non riescono a inviare attestazioni corrette, non è possibile per una supermaggioranza di 2/3 finalizzare i checkpoint. La perdita per inattività lascia che lo stake appartenente ai validatori inattivi si esaurisca gradualmente finché non controllano meno di 1/3 dello stake totale, consentendo ai restanti validatori attivi di finalizzare la catena. Per quanto grande sia il pool di validatori inattivi, i restanti validatori attivi finiranno per controllare >2/3 dello stake. La perdita di stake è un forte incentivo per i validatori inattivi a riattivarsi il prima possibile! Uno scenario di perdita per inattività è stato riscontrato sulla rete di test Medalla quando < 66% dei validatori attivi è riuscito a raggiungere il consenso sull'attuale testa della blockchain. La perdita per inattività è stata attivata e la finalità è stata infine recuperata!

Il design delle ricompense, delle penalità e del punire del meccanismo di consenso incoraggia i singoli validatori a comportarsi correttamente. Tuttavia, da queste scelte di progettazione emerge un sistema che incentiva fortemente un'equa distribuzione dei validatori su più client e dovrebbe disincentivare fortemente il predominio di un singolo client.

## Letture consigliate {#further-reading}

- [Aggiornare Ethereum: Il livello degli incentivi](https://eth2book.info/altair/part2/incentives)
- [Incentivi nel protocollo ibrido Casper di Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Specifiche annotate di Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Suggerimenti per la prevenzione del punire in Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisi delle penalità del punire sotto l'EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Fonti_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_