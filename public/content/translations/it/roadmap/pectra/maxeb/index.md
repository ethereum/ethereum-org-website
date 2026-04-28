---
title: Pectra MaxEB
description: "Scopri di più su MaxEB nell'aggiornamento Pectra"
lang: it
---

# MaxEB {#maxeb}

*In breve:* La biforcazione hard Pectra consente ai validatori di Ethereum di optare per un saldo effettivo massimo più elevato e per la capitalizzazione composta convertendo le credenziali di prelievo di **Tipo 1** in **Tipo 2**. Lo strumento ufficiale per farlo è il Launchpad. Questa operazione non può essere annullata.

## Panoramica {#overview}

### Chi è interessato? {#who-is-affected}

Chiunque gestisca un validatore: probabilmente si tratta di qualcuno che conosce l'indice (es. [Validator #12345](https://beaconcha.in/validator/12345)) di un validatore che controlla. Se utilizzi un protocollo per gestire un validatore (es. Lido CSM o Rocket Pool), dovrai verificare con loro se e quando supporteranno maxEB.

Se fai staking utilizzando un token di staking liquido (es. rETH o stETH), non è richiesta né consigliata alcuna azione.

### Cos'è "maxEB"? {#what-is-maxeb}

maxEB = il Saldo Effettivo Massimo (MAXimum Effective Balance) di un validatore. Fino alla biforcazione hard Pectra, ogni validatore guadagna su un massimo di 32 ETH. Dopo Pectra, i validatori hanno l'opzione di guadagnare su qualsiasi saldo compreso tra 32 e 2048 ETH, con incrementi di 1 ETH, aderendo alla modifica.

### Come fa un validatore ad aderire? {#how-does-a-validator-opt-in}

Un validatore aderisce alla modifica maxEB convertendo le credenziali di prelievo di **Tipo 1** in **Tipo 2**. Questo può essere fatto sul [Launchpad (Azioni del Validatore)](https://launchpad.ethereum.org/validator-actions) dopo che la biforcazione hard Pectra sarà attiva. Come per il passaggio da **Tipo 0** → **Tipo 1**, la conversione da **Tipo 1** → **Tipo 2** è un processo irreversibile.

### Cos'è una credenziale di prelievo? {#whats-a-withdrawal-credential}

Quando gestisci un validatore, hai un set di credenziali di prelievo. Queste possono essere trovate nel json dei dati di deposito o puoi visualizzarle nella [scheda dei depositi](https://beaconcha.in/validator/12345#deposits) del tuo validatore su beaconcha.in.

1. Credenziali di prelievo di **Tipo 0**: se le credenziali di prelievo del tuo validatore iniziano con `0x00...`, hai depositato prima della biforcazione hard Shapella e non hai ancora impostato un indirizzo di prelievo.

![Credenziale di prelievo di Tipo 0](./0x00-wd.png)

2. Credenziali di prelievo di **Tipo 1**: se le credenziali di prelievo del tuo validatore iniziano con `0x01...`, hai depositato dopo la biforcazione hard Shapella o hai già convertito le tue credenziali di **Tipo 0** in credenziali di **Tipo 1**.

 ![Credenziale di prelievo di Tipo 1](./0x01-wd.png)

3. Credenziali di prelievo di **Tipo 2**: questo nuovo tipo di credenziale di prelievo inizierà con `0x02...` e sarà abilitato dopo Pectra. I validatori con credenziali di prelievo di **Tipo 2** sono talvolta chiamati "**validatori a capitalizzazione composta**" (compounding validators).

| **Consentito** | **Non consentito** |
| --- | --- |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2 |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0 |
|  | ❌ Tipo 2 → Tipo 1 |
|  | ❌ Tipo 2 → Tipo 0 |

### Rischi {#risks}

MaxEB consente a un validatore di inviare il suo intero saldo a un altro validatore. Gli utenti che inviano una richiesta di consolidamento dovrebbero verificare l'origine e i contenuti della transazione che stanno firmando. Lo strumento ufficiale per sfruttare le funzionalità di maxEB è il Launchpad. Se decidi di utilizzare uno strumento di terze parti, dovresti verificare che:

- La chiave pubblica (pubkey) e l'indirizzo di prelievo del validatore di origine corrispondano al validatore che controllano
- La chiave pubblica del validatore di destinazione sia corretta e appartenga a loro
- La richiesta sia una conversione, non un consolidamento, se non intendono inviare fondi a un altro validatore
- La transazione venga firmata dall'indirizzo di prelievo corretto

Ti **consigliamo vivamente** di discutere di qualsiasi strumento di terze parti che intendi utilizzare con la [comunità di EthStaker](https://ethstaker.org/about). È un luogo utile per verificare la validità del tuo approccio ed evitare errori. Se utilizzi uno strumento malevolo o configurato in modo errato, **l'intero saldo del tuo validatore potrebbe essere inviato a un validatore che non controlli**, senza alcun modo per recuperarlo.

## Dettagli tecnici {#technical-details}

### Il flusso {#the-flow}

Ci saranno due utilizzi per l'operazione `ConsolidationRequest`:

1. Convertire un validatore esistente da un validatore di **Tipo 1** a uno di **Tipo 2**
2. Consolidare altri validatori in un validatore di **Tipo 2** esistente

In una conversione da un validatore di **Tipo 1** a uno di **Tipo 2**, sia l'*origine* che la *destinazione* saranno il validatore che stai convertendo. L'operazione costerà gas e verrà messa in coda dietro ad altre richieste di consolidamento. Questa coda è **separata** dalla coda dei depositi, non è influenzata dai nuovi depositi dei validatori e può essere visualizzata su [pectrified.com](https://pectrified.com/).

Per consolidare i validatori, devi avere un *validatore di destinazione* che abbia una credenziale di prelievo di **Tipo 2**. Questa è la destinazione di tutti i saldi dei validatori in fase di consolidamento e l'indice che viene preservato.

### Requisiti per la conversione al Tipo 2 {#requirements-for-converting-to-type-2}

Questo sarà richiesto per il primo validatore che converti al **Tipo 2**. L'indice di questo validatore viene preservato e rimane attivo. Per una conversione, il *validatore di origine* == il *validatore di destinazione*.

Il validatore deve...

- essere attivo
- avere credenziali di prelievo di **Tipo 1**
- non essere in uno stato di uscita (o punito/slashed)
- non avere prelievi attivati manualmente in sospeso (non si applica agli sweep automatici)

![illustrazione della conversione](./conversion.png)

### Requisiti per il consolidamento {#requirements-for-consolidating}

Questa è la *stessa operazione* della conversione, ma avviene quando il *validatore di origine* è diverso dal *validatore di destinazione*. L'indice del validatore di destinazione viene preservato e accetta il saldo dal validatore di origine. L'indice del validatore di origine viene messo in uno stato `EXITED` (uscito).

In questo caso, il validatore di origine ha tutti gli stessi requisiti di cui sopra, più:

- essere stato attivo per almeno ~27,3 ore (un `SHARD_COMMITTEE_PERIOD`)

Il validatore di destinazione deve

- avere credenziali di prelievo di **Tipo 2**
- non essere in uno stato di uscita.

![illustrazione del consolidamento](./consolidation.png)

### La richiesta di consolidamento {#the-consolidation-request}

La richiesta di consolidamento sarà firmata dall'indirizzo di prelievo associato al validatore di origine e conterrà:

1. L'indirizzo del validatore di origine (es. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. La chiave pubblica del validatore di origine (es. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. La chiave pubblica del validatore di destinazione

In una conversione, i punti 2 e 3 saranno uguali. Questa operazione può essere eseguita sul [Launchpad](https://launchpad.ethereum.org/).

### Requisiti di firma {#signing-requirements}

Per inviare una `ConsolidationRequest`, l'**indirizzo di prelievo del validatore di origine** deve firmare la richiesta. Questo dimostra il controllo sui fondi del validatore.

### Cosa viene firmato? {#what-is-signed}

Viene utilizzata una [radice di firma](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) (signing root) separata per dominio dell'oggetto `ConsolidationRequest`.

- **Dominio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Campi della radice di firma:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

La **firma BLS** risultante viene inviata insieme alla richiesta.

Nota: la firma viene effettuata dall'indirizzo di prelievo, non dalla chiave del validatore.

### Prelievi parziali {#partial-withdrawals}

I validatori con credenziali di **Tipo 1** ottengono sweep automatici e senza costi in gas del loro saldo in eccesso (tutto ciò che supera i 32 ETH) verso il loro indirizzo di prelievo. Poiché il **Tipo 2** consente a un validatore di capitalizzare i saldi con incrementi di 1 ETH, non effettuerà lo sweep automatico dei saldi finché non raggiungerà i 2048 ETH. I prelievi parziali sui validatori di **Tipo 2** devono essere attivati manualmente e costeranno gas.

## Strumenti di consolidamento {#consolidation-tooling}

Ci sono diversi strumenti disponibili per gestire i consolidamenti. Lo strumento ufficiale, creato dalla Ethereum Foundation, è il [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Esistono anche strumenti di terze parti creati da entità della comunità di staking che potrebbero offrire funzionalità non fornite dal Launchpad. Sebbene gli strumenti qui elencati non siano verificati o approvati dalla Ethereum Foundation, i seguenti sono strumenti open source realizzati da membri noti della comunità.

| Strumento | Sito web | Open source | Creatore | Verificato (Audited) | Interfaccia | Funzionalità principali |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Sì, Apache 2.0 | [Pier Two](https://piertwo.com/) | No | Interfaccia Web | Wallet Connect, funziona con SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Sì, MIT | [Luganodes](https://www.luganodes.com/) | Sì, Quantstamp [Maggio 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Riga di comando | Elaborazione in batch, per molti validatori contemporaneamente |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Sì, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | No | Riga di comando | Set completo di funzionalità per la gestione di validatori e nodi |
| Siren | [GitHub](https://github.com/sigp/siren) | Sì, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | No | In parte riga di comando, ma principalmente interfaccia Web | Funziona solo se si utilizza il client di consenso Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Sì, licenze MIT | [Stakely](https://stakely.io/) | No | Interfaccia Web, ospitata da stakely e pronta per essere ospitata autonomamente in modo gratuito | Supporta le principali connessioni di portafogli, incluso safe con walletconnect |

## Domande frequenti (FAQ) {#faq}

### L'adesione cambia la mia fortuna nelle proposte o le mie ricompense? {#change-luck-or-rewards}

No. L'adesione non diminuisce le tue probabilità di proposta: i tuoi compiti e la selezione delle proposte rimangono gli stessi. Ad esempio, se hai due validatori da 32 ETH rispetto a un validatore da 64 ETH, avrai le stesse probabilità totali di essere selezionato per proporre un blocco e guadagnare ricompense.

### L'adesione cambia il mio rischio di essere punito (slashing)? {#change-slashing-risk}

Per gli operatori più piccoli o non professionali, la risposta breve è no. La risposta più lunga è che, per gli operatori professionali che gestiscono molti validatori per nodo con avvisi rapidi, il consolidamento in un numero inferiore di validatori potrebbe ridurre la loro capacità di reagire a una punizione (slashing) e prevenire eventi a cascata. La *penalità* iniziale di punizione per tutti i validatori è stata drasticamente ridotta da 1 ETH (per 32 ETH) a 0,0078125 ETH (per 32 ETH) per compensare questo rischio.

### Devo uscire dal mio validatore per convertirlo? {#exit-validator}

No. Puoi convertirlo sul posto senza uscire.

### Quanto tempo ci vorrà per convertire / consolidare? {#how-long}

Un minimo di 27,3 ore, ma anche i consolidamenti sono soggetti a una coda. Questa coda è indipendente dalle code di deposito e prelievo e non ne è influenzata.

### Posso mantenere l'indice del mio validatore? {#keep-validator-index}

Sì. La conversione sul posto mantiene lo stesso indice del validatore. Se consolidi più validatori, potrai mantenere solo l'indice del *validatore di destinazione*.

### Perderò delle attestazioni? {#miss-attestations}

Durante un consolidamento in un altro validatore, il validatore di origine viene fatto uscire e c'è un periodo di attesa di circa 27 ore prima che il saldo sia attivo sul validatore di destinazione. Questo periodo **non influisce sulle metriche di prestazione**.

### Incorrerò in penalità? {#incur-penalties}

No. Finché il tuo validatore è online, non incorrerai in penalità.

### Gli indirizzi di prelievo dei validatori in fase di consolidamento devono corrispondere? {#withdrawal-addresses-match}

No. Ma l'*origine* deve autorizzare la richiesta dal proprio indirizzo.

### Le mie ricompense si capitalizzeranno dopo la conversione? {#rewards-compound}

Sì. Con le credenziali di **Tipo 2**, le ricompense superiori a 32 ETH vengono automaticamente rimesse in staking, ma non all'istante. A causa di un piccolo margine (chiamato [*isteresi*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), il tuo saldo deve raggiungere **circa 1,25 ETH in più** prima che l'eccedenza venga rimessa in staking. Quindi, invece di capitalizzare a 33,0 ETH, avviene a 33,25 (saldo effettivo = 33 ETH), poi a 34,25 (saldo effettivo = 34 ETH) e così via.

### Posso ancora ottenere gli sweep automatici dopo la conversione? {#automatic-sweep}

Gli sweep automatici avverranno solo con saldi in eccesso superiori a 2048. Per tutti gli altri prelievi parziali, dovrai attivarli manualmente.

### Posso cambiare idea e tornare dal Tipo 2 al Tipo 1? {#go-back-to-type1}

No. La conversione al **Tipo 2** è irreversibile.

### Se voglio consolidare più validatori, devo prima convertirli tutti al Tipo 2? {#consolidate-multiple-validators}

No! Converti un validatore al Tipo 2 e poi usalo come destinazione. Tutti gli altri validatori consolidati in quella destinazione di Tipo 2 possono essere di Tipo 1 o di Tipo 2.

### Il mio validatore è offline o sotto i 32 ETH: posso ancora convertirlo? {#offline-or-below-32eth}

Sì. Finché è attivo (non uscito) e puoi firmare con il suo indirizzo di prelievo, puoi convertirlo.

## Risorse {#resources}

- [Specifiche di consenso Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): questa è la versione più "veritiera" su cui dovresti fare affidamento. In caso di dubbio, leggi le specifiche.
- Non tutti si sentono a proprio agio a districarsi nel codice, quindi [questo maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) può aiutare a interpretare le specifiche. *Dichiarazione di non responsabilità: le specifiche, non l'IA, dovrebbero essere considerate come verità, poiché l'IA potrebbe interpretare male le informazioni o allucinare le risposte.*
- [pectrified.com](https://pectrified.com/): visualizza lo stato dei consolidamenti, dei depositi e dei tempi di attesa in coda.
- [Ethereal](https://github.com/wealdtech/ethereal): strumento CLI creato dalla comunità per la gestione delle attività comuni dei validatori.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): contratto creato dalla comunità che consente di depositare più validatori di Ethereum in una singola transazione.