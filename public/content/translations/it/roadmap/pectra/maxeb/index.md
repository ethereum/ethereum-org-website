---
title: Pectra MaxEB
description: Scopri di più su MaxEB nella release Pectra
lang: it
---

# MaxEB {#maxeb}

_In breve:_ L'hard fork Pectra consente ai validatori di Ethereum di optare per un saldo massimo effettivo più elevato e per il compounding, convertendo le credenziali di prelievo da **Tipo 1** a **Tipo 2**. Lo strumento ufficiale per farlo è il Launchpad. Questa operazione è irreversibile.

## Panoramica {#overview}

### Chi è interessato? {#who-is-affected}

Chiunque gestisca un validatore - probabilmente qualcuno che conosce l'indice (ad es., [Validatore #12345](https://beaconcha.in/validator/12345)) di un validatore che controlla. Se utilizzi un protocollo per gestire un validatore (ad es., Lido CSM o Rocket Pool), dovrai verificare con loro se e quando supporteranno maxEB.

Se fai staking utilizzando un token di staking liquido (ad es., rETH o stETH), non è richiesta né consigliata alcuna azione.

### Cos'è "maxEB"? {#what-is-maxeb}

maxEB = il Saldo Effettivo MASSIMO di un validatore. Fino all'hard fork Pectra, ogni validatore guadagna su un massimo di 32 ETH. Dopo Pectra, i validatori hanno la possibilità di guadagnare su qualsiasi saldo tra 32 e 2048 ETH, con incrementi di 1 ETH, aderendo alla modifica.

### Come fa un validatore ad aderire? {#how-does-a-validator-opt-in}

Un validatore aderisce alla modifica maxEB convertendo le credenziali di prelievo da **Tipo 1** a **Tipo 2**. Questa operazione può essere eseguita su [Launchpad (Azioni del validatore)](https://launchpad.ethereum.org/validator-actions) dopo l'attivazione dell'hard fork Pectra. Come per la conversione da **Tipo 0** → **Tipo 1**, la conversione da **Tipo 1** → **Tipo 2** è un processo irreversibile.

### Cosa sono le credenziali di prelievo? {#whats-a-withdrawal-credential}

Quando gestisci un validatore, hai un set di credenziali di prelievo. Queste possono essere trovate nel tuo file json con i dati di deposito o puoi visualizzarle nella [scheda di deposito](https://beaconcha.in/validator/12345#deposits) del tuo validatore su beaconcha.in.

1. **Credenziali di prelievo di Tipo 0**: se le credenziali di prelievo del tuo validatore iniziano con `0x00...`, hai effettuato il deposito prima dell'hard fork Shapella e non hai ancora impostato un indirizzo di prelievo.

![Credenziale di prelievo di Tipo 0](./0x00-wd.png)

2. **Credenziali di prelievo di Tipo 1**: se le credenziali di prelievo del tuo validatore iniziano con `0x01...`, hai effettuato il deposito dopo l'hard fork Shapella o hai già convertito le tue credenziali da **Tipo 0** a **Tipo 1**.

![Credenziale di prelievo di Tipo 1](./0x01-wd.png)

3. **Credenziali di prelievo di Tipo 2**: questo nuovo tipo di credenziale di prelievo inizierà con `0x02...` e sarà abilitato dopo Pectra. I validatori con credenziali di prelievo di **Tipo 2** sono talvolta chiamati "**validatori a capitalizzazione composta**"

| **Consentito**    | **Non consentito** |
| ----------------- | ------------------ |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2  |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0  |
|                   | ❌ Tipo 2 → Tipo 1  |
|                   | ❌ Tipo 2 → Tipo 0  |

### Rischi {#risks}

MaxEB consente a un validatore di inviare il suo intero saldo a un altro validatore. Gli utenti che inviano una richiesta di consolidamento devono verificare la fonte e il contenuto della transazione che stanno firmando. Lo strumento ufficiale per usufruire delle funzionalità di maxEB è il Launchpad. Se decidi di utilizzare uno strumento di terze parti, devi verificare che:

- La chiave pubblica e l'indirizzo di prelievo del validatore di origine corrispondano al validatore che controllano
- La chiave pubblica del validatore di destinazione sia corretta e appartenga a loro
- La richiesta sia una conversione, non un consolidamento, se non intendono inviare fondi a un altro validatore
- La transazione sia firmata dall'indirizzo di prelievo corretto

**Consigliamo vivamente** di discutere di qualsiasi strumento di terze parti che si intende utilizzare con la [community di EthStaker](https://ethstaker.org/about). È un luogo utile per verificare la correttezza del proprio approccio ed evitare errori. Se si utilizza uno strumento malevolo o configurato in modo errato, **l'intero saldo del validatore potrebbe essere inviato a un validatore che non si controlla**, senza alcuna possibilità di recuperarlo.

## Dettagli tecnici {#technical-details}

### Il flusso {#the-flow}

L'operazione `ConsolidationRequest` avrà due usi:

1. Convertire un validatore esistente da **Tipo 1** a **Tipo 2**
2. Consolidare altri validatori in un validatore di **Tipo 2** esistente

In una conversione di un validatore da **Tipo 1** a **Tipo 2**, sia l'_origine_ che la _destinazione_ saranno il validatore che si sta convertendo. L'operazione costerà del gas e sarà accodata dietro ad altre richieste di consolidamento. Questa coda è **separata** dalla coda dei depositi, non è influenzata dai nuovi depositi dei validatori e può essere visualizzata su [pectrified.com](https://pectrified.com/).

Per consolidare i validatori, è necessario disporre di un _validatore di destinazione_ con credenziali di prelievo di **Tipo 2**. Questa è la destinazione di tutti i saldi dei validatori che vengono consolidati e l'indice che viene preservato.

### Requisiti per la conversione al Tipo 2 {#requirements-for-converting-to-type-2}

Ciò sarà necessario per il primo validatore convertito in **Tipo 2**. L'indice di questo validatore è preservato e attivo. Per una conversione, il _validatore di origine_ == il _validatore di destinazione_.

Il validatore deve...

- essere attivo
- avere credenziali di prelievo di **Tipo 1**
- non essere in stato di uscita (o soggetto a slashing)
- non avere prelievi in sospeso attivati manually (non si applica agli sweep)

![illustrazione della conversione](./conversion.png)

### Requisiti per il consolidamento {#requirements-for-consolidating}

È la _stessa operazione_ della conversione, ma si verifica quando il _validatore di origine_ è diverso dal _validatore di destinazione_. L'indice del validatore di destinazione viene preservato e accetta il saldo dal validatore di origine. L'indice del validatore di origine viene impostato sullo stato `EXITED`.

In questo caso, il validatore di origine ha tutti i requisiti di cui sopra, più:

- è stato attivo per almeno ~27,3 ore (un `SHARD_COMMITTEE_PERIOD`)

Il validatore di destinazione deve

- avere credenziali di prelievo di **Tipo 2**
- non essere in stato di uscita.

![illustrazione del consolidamento](./consolidation.png)

### La richiesta di consolidamento {#the-consolidation-request}

La richiesta di consolidamento sarà firmata dall'indirizzo di prelievo associato al validatore di origine e conterrà:

1. Indirizzo del validatore di origine (ad es., `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Chiave pubblica del validatore di origine (ad es., `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Chiave pubblica di quel validatore di destinazione

In una conversione, 2 e 3 saranno uguali. Questa operazione può essere eseguita su [Launchpad](https://launchpad.ethereum.org/).

### Requisiti di firma {#signing-requirements}

Per inviare una `ConsolidationRequest`, l'**indirizzo di prelievo del validatore di origine** deve firmare la richiesta. Questo dimostra il controllo sui fondi del validatore.

### Cosa viene firmato? {#what-is-signed}

Viene usata una [radice di firma](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) separata dal dominio dell'oggetto `ConsolidationRequest`.

- **Dominio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Campi della radice di firma:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

La **firma BLS** risultante viene inviata insieme alla richiesta.

Nota: la firma viene eseguita dall'indirizzo di prelievo, non dalla chiave del validatore.

### Prelievi parziali {#partial-withdrawals}

I validatori con credenziali di **Tipo 1** ottengono sweep automatici e senza gas del loro saldo in eccesso (qualsiasi importo superiore a 32 ETH) verso il loro indirizzo di prelievo. Poiché il **Tipo 2** permette a un validatore di capitalizzare i saldi con incrementi di 1 ETH, non effettuerà lo sweep automatico dei saldi finché non raggiungerà 2048 ETH. I prelievi parziali sui validatori di **Tipo 2** devono essere attivati manualmente e costeranno del gas.

## Strumenti di consolidamento {#consolidation-tooling}

Sono disponibili diversi strumenti per gestire i consolidamenti. Lo strumento ufficiale, creato dalla Ethereum Foundation, è [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Esistono anche strumenti di terze parti creati da entità della comunità di staking che possono offrire funzionalità non fornite da Launchpad. Sebbene gli strumenti qui presentati non siano controllati o approvati dalla Ethereum Foundation, i seguenti sono strumenti open source di membri noti della comunità.

| Strumento                       | Sito Web                                                                                                  | Open source                    | Creatore                                       | Controllato                                                                                                                                           | Interfaccia                                                                        | Funzionalità degne di nota                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Pectra Staking Manager          | pectrastaking.com                                                                         | Sì, Apache 2.0 | [Pier Two](https://piertwo.com/)               | No                                                                                                                                                    | Interfaccia web                                                                    | Wallet Connect, funziona con SAFE                                                |
| Pectra Validator Ops CLI Tool   | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Sì, MIT                        | [Luganodes](https://www.luganodes.com/)        | Sì, Quantstamp [Maggio 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Riga di comando                                                                    | Batching, per molti validatori contemporaneamente                                |
| Ethereal                        | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Sì, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | No                                                                                                                                                    | Riga di comando                                                                    | Set completo di funzionalità per la gestione di validatori e nodi                |
| Siren                           | [GitHub](https://github.com/sigp/siren)                                                                   | Sì, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | No                                                                                                                                                    | In parte da riga di comando, ma principalmente interfaccia web                     | Funziona solo se si utilizza il client di consenso Lighthouse                    |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Sì, licenze MIT                | [Stakely](https://stakely.io/)                 | No                                                                                                                                                    | Interfaccia web, ospitata da Stakely e pronta per essere auto-ospitata liberamente | Supporta le principali connessioni di portafogli, incluso Safe con WalletConnect |

## Domande frequenti {#faq}

### L'adesione cambia la mia fortuna nelle proposte o le mie ricompense? {#change-luck-or-rewards}

No. L'adesione non diminuisce le tue possibilità di proposta: i tuoi compiti e la selezione della proposta rimangono gli stessi. Ad esempio, se hai due validatori da 32 ETH contro un validatore da 64 ETH, avrai le stesse possibilità totali di essere selezionato per proporre un blocco e guadagnare ricompense.

### L'adesione cambia il mio rischio di slashing? {#change-slashing-risk}

Per gli operatori più piccoli o non professionali, la risposta breve è no. La risposta più lunga è che, per gli operatori professionali che gestiscono molti validatori per nodo con avvisi rapidi, il consolidamento in un numero inferiore di validatori potrebbe ridurre la loro capacità di reagire a uno slashing e prevenire eventi a cascata. La _penalità_ di slashing iniziale per tutti i validatori è stata drasticamente ridotta da 1 ETH (per 32 ETH) a 0,0078125 ETH (per 32 ETH) per compensare questo rischio.

### Devo uscire dal mio validatore per effettuare la conversione? {#exit-validator}

No. Puoi effettuare la conversione sul posto senza uscire.

### Quanto tempo ci vorrà per convertire/consolidare? {#how-long}

Un minimo di 27,3 ore, ma i consolidamenti sono anche soggetti a una coda. Questa coda è indipendente dalle code di deposito e prelievo e non è influenzata da esse.

### Posso mantenere il mio indice di validatore? {#keep-validator-index}

Sì. La conversione sul posto mantiene lo stesso indice del validatore. Se consolidi più validatori, potrai mantenere solo l'indice del _validatore di destinazione_.

### Perderò delle attestazioni? {#miss-attestations}

Durante un consolidamento in un altro validatore, il validatore di origine esce e c'è un periodo di attesa di ~27 ore prima che il saldo sia attivo sul validatore di destinazione. Questo periodo **non influisce sulle metriche di performance**.

### Incorrerò in penalità? {#incur-penalties}

No. Finché il tuo validatore è online, non incorrerai in penalità.

### Gli indirizzi di prelievo dei validatori da consolidare devono corrispondere? {#withdrawal-addresses-match}

No. Ma l'_origine_ deve autorizzare la richiesta dal proprio indirizzo.

### Le mie ricompense saranno capitalizzate dopo la conversione? {#rewards-compound}

Sì. Con le credenziali di **Tipo 2**, le ricompense superiori a 32 ETH vengono automaticamente rimesse in staking, ma non istantaneamente. A causa di un piccolo buffer (chiamato [_isteresi_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), il tuo saldo deve raggiungere **circa 1,25 ETH in più** prima che l'extra venga rimesso in staking. Quindi, invece di capitalizzare a 33,0 ETH, avviene a 33,25 (saldo effettivo = 33 ETH), poi a 34,25 (saldo effettivo = 34 ETH) e così via.

### Posso ancora ottenere sweep automatici dopo la conversione? {#automatic-sweep}

Gli sweep automatici avverranno solo con saldi in eccesso superiori a 2048. Per tutti gli altri prelievi parziali, dovrai attivarli manualmente.

### Posso cambiare idea e tornare dal Tipo 2 al Tipo 1? {#go-back-to-type1}

No. La conversione al **Tipo 2** è irreversibile.

### Se voglio consolidare più validatori, devo prima convertirli tutti al Tipo 2? {#consolidate-multiple-validators}

No! Converti un validatore al Tipo 2 e poi usalo come destinazione. Tutti gli altri validatori consolidati in quella destinazione di Tipo 2 possono essere di Tipo 1 o di Tipo 2

### Il mio validatore è offline o ha un saldo inferiore a 32 ETH - posso comunque convertirlo? {#offline-or-below-32eth}

Sì. Finché è attivo (non uscito) e puoi firmare con il suo indirizzo di prelievo, puoi convertirlo.

## Risorse {#resources}

- [Specifiche di consenso di Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): questa è la versione più 'veritiera' su cui dovresti fare affidamento. Nel dubbio, leggi le specifiche
- Non tutti si sentono a proprio agio a districarsi nel codice, quindi [questo maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) può aiutare a interpretare le specifiche. _Esonero di responsabilità: le specifiche, non l'IA, devono essere considerate come la verità, poiché l'IA potrebbe interpretare male le informazioni o fornire risposte allucinate_
- [pectrified.com](https://pectrified.com/): visualizza lo stato dei consolidamenti, dei depositi e dei tempi di attesa della coda
- [Ethereal](https://github.com/wealdtech/ethereal): strumento CLI creato dalla comunità per la gestione delle attività comuni dei validatori
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): contratto creato dalla comunità che permette di depositare più validatori di Ethereum in un'unica transazione
