---
title: Ricompense e sanzioni del proof-of-stake
description: "Scopri di più sugli incentivi del protocollo nel proof-of-stake di Ethereum."
lang: it
---

Ethereum è protetta utilizzando la sua criptovaluta nativa, ether (ETH). Gli operatori dei nodi che desiderano partecipare alla convalida dei blocchi e all'identificazione della testa della catena, depositano ether nel [contratto di deposito](/staking/deposit-contract/) su Ethereum. Quindi sono pagati in ether per eseguire il software del validatore, che verifica la validità dei nuovi blocchi ricevuti tramite la rete peer-to-peer e applica l'algoritmo di scelta della diramazione per identificare la testa della catena.

Esistono due ruoli principali per un validatore: 1) controllare i nuovi blocchi e "attestarne" la validità, 2) proporre nuovi blocchi quando selezionati casualmente dal gruppo totale di validatori. Se il validatore non riesce a svolgere una di queste mansioni quando richiesto, perde un pagamento di ether. Talvolta, inoltre, i validatori sono incaricati di aggregare le firme e partecipare alle commissioni di sincronizzazione.

Esistono poi delle azioni molto difficili da compiere per errore e che denotano un intento malevolo, come proporre diversi blocchi per lo stesso slot o attestare più blocchi per lo stesso slot. Questi sono comportamenti "tagliabili" che risultano nel bruciare alcuni importi di ether (fino a 1 ETH) prima che il validatore venga rimosso dalla rete, il che richiede 36 giorni. L'ether del validatore sanzionato si riduce lentamente durante il periodo d'uscita, ma al diciottesimo giorno riceve una "sanzione di correlazione", maggiore quando più validatori sono sanzionati contemporaneamente. La struttura di incentivazione del meccanismo di consenso, dunque, paga per l'onestà, punendo gli utenti malevoli.

Tutte le ricompense e le sanzioni sono applicate una volta all'epoca.

Continua a leggere per ulteriori dettagli...

## Ricompense e sanzioni {#rewards}

### Ricompense {#rewards}

I validatori ricevono ricompense quando effettuano voti coerenti con la maggioranza degli altri validatori, quando propongono blocchi e quando partecipano alle commissioni di sincronizzazione. Il valore delle ricompense in ogni epoca è calcolato da una `base_reward`. Questa unità fornisce le basi per il calcolo delle ricompense. La `base_reward` rappresenta la ricompensa media ricevuta da un validatore in condizioni ottimali per ogni epoca. Questa è calcolata in base al saldo effettivo del validatore e al numero totale di validatori attivi, come segue:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

dove `base_reward_factor` è 64, `base_rewards_per_epoch` è 4 e `sum(active balance)` è l'ether totale in staking tra tutti i validatori attivi.

Ciò significa che la ricompensa di base è proporzionale al saldo effettivo del validatore ed è inversamente proporzionale al numero di validatori sulla rete. Più validatori ci sono, maggiore è l'emissione complessiva (come `sqrt(N)`) ma minore è la `base_reward` per validatore (come `1/sqrt(N)`). Questi fattori influenzano l'APR per un nodo di staking. Leggi la motivazione alla base di ciò nelle [note di Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

La ricompensa totale è quindi calcolata come la somma di cinque componenti, ognuno avente un peso che determina quanto ogni componente aggiunge alla ricompensa totale. I componenti sono:

```
1. voto di origine: il validatore ha effettuato un voto tempestivo per il checkpoint di origine corretto
2. voto di destinazione: il validatore ha effettuato un voto tempestivo per il checkpoint di destinazione corretto
3. voto di testa: il validatore ha effettuato un voto tempestivo per il blocco di testa corretto
4. ricompensa del comitato di sincronizzazione: il validatore ha partecipato a un comitato di sincronizzazione
5. ricompensa del propositore: il validatore ha proposto un blocco nello slot corretto
```

Le ponderazioni per ciascun componente sono le seguenti:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Questi pesi ammontano a 64. La ricompensa è calcolata come la somma dei pesi applicabili, divisa per 64. Un validatore che ha effettuato tempestivi voti di origine, di destinazione e di testa, ha proposto un blocco e ha partecipato a un comitato di sincronizzazione potrebbe ricevere `64/64 * base_reward == base_reward`. Tuttavia, solitamente un validatore non è un propositore di blocchi, quindi la sua ricompensa massima è `64-8 /64 * base_reward == 7/8 * base_reward`. I validatori che non sono né propositori di blocchi né in un comitato di sincronizzazione possono ricevere `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

È prevista una ricompensa aggiuntiva per incentivare attestazioni rapide. Questa è la `inclusion_delay_reward`. Ha un valore pari alla `base_reward` moltiplicata per `1/delay` dove `delay` è il numero di slot che separano la proposta di blocco e l'attestazione. Ad esempio, se l'attestazione viene inviata entro uno slot dalla proposta del blocco, l'attestatore riceve `base_reward * 1/1 == base_reward`. Se l'attestazione arriva nello slot successivo, l'attestatore riceve `base_reward * 1/2` e così via.

I propositori di blocchi ricevono `8 / 64 * base_reward` per **ogni attestazione valida** inclusa nel blocco, quindi il valore effettivo della ricompensa scala con il numero di validatori attestanti. I propositori di blocchi, inoltre, possono incrementare la propria ricompensa includendo prova del comportamento scorretto di altri validatori nel loro blocco proposto. Queste ricompense sono le "carote" che incoraggiano l'onestà del validatore. Un propositore di blocchi che include uno slashing sarà ricompensato con `slashed_validators_effective_balance / 512`.

### Sanzioni {#penalties}

Finora abbiamo considerato validatori che si comportano in modo impeccabile, ma quali sono le sanzioni per i validatori che non effettuano tempestivi voti sull'origine, sulla destinazione e sulla testa o lo fanno lentamente?

Le sanzioni per la mancanza di voti sull'origine e sulla destinazione equivalgono alle ricompense che l'attestatore avrebbe ricevuto se li avesse inviati. Ciò significa che, invece di aggiungere la ricompensa al loro saldo, si vedono rimuovere un valore equivalente dal proprio saldo. Non è prevista alcuna sanzione per il mancato voto di testa (ossia, i voti di testa sono solo ricompensati, mai sanzionati). Non esiste alcuna sanzione associata all'`inclusion_delay`: la ricompensa, semplicemente, non sarà aggiunta al saldo del validatore. Inoltre, non esiste alcuna sanzione per la mancata proposizione di un blocco.

Leggi di più su ricompense e sanzioni nelle [specifiche del consenso](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Ricompense e sanzioni sono state modificate nell'aggiornamento Bellatrix: guarda Danny Ryan e Vitalik discuterne in questo [video di Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slashing {#slashing}

Il taglio è un'azione più grave che risulta nella rimozione forzata di un validatore dalla rete e nella perdita associata del suo ether in staking. Esistono tre modi in cui un validatore può essere tagliato, tutti equivalenti alla proposta o attestazione disonesta dei blocchi:

- Proponendo e firmando due blocchi diversi per lo stesso slot
- Attestando un blocco che ne "circonda" un altro (modificando di fatto lo storico)
- Eseguendo un "doppio voto", attestando due candidati per lo stesso blocco

Se queste azioni sono rilevate, il validatore viene tagliato. Questo significa che 0,0078125 viene immediatamente bruciato per un validatore da 32 ETH (scalato linearmente con il saldo attivo), dopodiché inizia un periodo di rimozione di 36 giorni. Durante tale periodo di rimozione, lo stake del validatore si riduce gradualmente. Al punto intermedio (Giorno 18), è applicata una sanzione aggiuntiva la cui portata scala con il totale di ether in staking di tutti i validatori tagliati nei 36 giorni precedenti all'evento di taglio. Ciò significa che più validatori sono tagliati, maggiore è l'entità del taglio. Lo slashing massimo è il saldo effettivo completo di tutti i validatori soggetti a slashing (ossia, se molti validatori subiscono uno slashing, potrebbero perdere il loro intero stake). D'altra parte, un evento di taglio singolo e isolato brucia soltanto una piccola porzione dello stake del validatore. Questa sanzione intermedia che scala con il numero di validatori tagliati è detta "sanzione di correlazione".

## Perdita per inattività {#inactivity-leak}

Se il livello del consenso ha superato più di quattro epoche senza finalizzare, un protocollo di emergenza detto "perdita di inattività" viene attivato. Lo scopo ultimo della perdita per inattività è creare le condizioni necessarie perché la catena recuperi la finalità. Come spiegato sopra, la finalità richiede una maggioranza dei 2/3 dell'ether in staking totale per accordarsi sui punti di controllo di origine e di destinazione. Se validatori che rappresentano oltre 1/3 dei validatori totali vanno offline o non riescono a inviare le attestazioni corrette, non è possibile che una supermaggioranza dei 2/3 finalizzi i punti di controllo. La perdita per inattività consente allo stake appartenente ai validatori inattivi di disperdersi gradualmente finché non controllano meno di 1/3 dello stake totale, consentendo ai validatori attivi rimanenti di finalizzare la catena. Indipendentemente da quanto sia grande il gruppo di validatori inattivi, i rimanenti validatori attivi alla fine controlleranno più di 2/3 dello stake. La perdita di stake è un forte incentivo per i validatori inattivi a riattivarsi appena possibile! Uno scenario di perdita per inattività è stato riscontrato sulla rete di prova Medalla quando <66% di validatori attivi è riuscito ad arrivare al consenso sulla testa corrente della blockchain. La perdita per inattività è stata attivata e la finalità è stata infine recuperata!

Il design di ricompense, sanzioni e frazionamenti del meccanismo di consenso incoraggia i singoli validatori a comportarsi correttamente. Tuttavia, da tali scelte di progettazione emerge un sistema che incentiva fortemente la distribuzione equa dei validatori tra i vari client e dovrebbe disincentivare fortemente il dominio di un singolo client.

## Letture consigliate {#further-reading}

- [Aggiornare Ethereum: Il livello di incentivi](https://eth2book.info/altair/part2/incentives)
- [Incentivi nel protocollo Casper ibrido di Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Le specifiche commentate di Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Consigli per la prevenzione dello slashing su Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analisi delle sanzioni per slashing secondo l'EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Fonti_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
