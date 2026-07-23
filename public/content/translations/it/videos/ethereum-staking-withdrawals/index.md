---
title: "Come funzionano i prelievi su Ethereum?"
description: "Come funzionano i prelievi dallo staking su Ethereum dopo l'aggiornamento Shanghai/Capella, coprendo il processo tecnico, la coda di prelievo e ciò che gli staker devono sapere per accedere ai propri ETH in staking."
lang: it
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Prelievi dallo staking"
---

Una spiegazione di **Finematics** su come funzionano i prelievi dallo staking su Ethereum dopo l'aggiornamento Shanghai/Capella, incluse le meccaniche dei prelievi parziali e completi, i malintesi comuni e le implicazioni per l'ecosistema dello staking.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=RwwU3P9n3uo) pubblicata da Finematics. È stata leggermente modificata per migliorarne la leggibilità.*

#### La Beacon Chain (0:31) {#the-beacon-chain-031}

Con l'avvicinarsi rapido dell'aggiornamento Shanghai/Capella, si discute molto dei prelievi dallo staking di Ethereum e di cosa questo significhi per l'ecosistema di Ethereum nel suo complesso.

Iniziamo col capire come siamo arrivati fin qui e perché i prelievi dallo staking non sono stati abilitati quando Ethereum è passato dalla Prova di lavoro (PoW) alla Proof-of-Stake (PoS).

La transizione alla Proof-of-Stake è avvenuta in più fasi per ridurre al minimo il numero di grandi cambiamenti in contemporanea. Questo approccio era essenziale, specialmente per una rete consolidata che regola trilioni di dollari di valore all'anno. I passaggi più significativi sono stati: il lancio della Beacon Chain e il The Merge.

Il lancio della Beacon Chain nel 2020 ha gettato le basi per la transizione creando un livello di consenso Proof-of-Stake separato, in esecuzione parallelamente alla catena Prova di lavoro di Ethereum. Lanciare la Beacon Chain in anticipo ha permesso di accumulare abbastanza ETH per proteggere la rete prima di regolare transazioni di valore reale. Ha inoltre consentito di testare il nuovo modello di consenso Proof-of-Stake per un periodo prolungato con fondi reali in staking.

I primi partecipanti alla rete hanno vincolato milioni di ETH per proteggere la rete Proof-of-Stake di Ethereum, pur sapendo che non avrebbero potuto prelevare i propri ETH se non molto più tardi.

Il grande passo successivo, il The Merge, ha unito il livello di consenso Proof-of-Stake con il livello di esecuzione. Questo ha permesso di abbandonare finalmente la Prova di lavoro e di mantenere una sola catena canonica — Ethereum — ora protetta da milioni di ETH in staking. Il The Merge è stato di gran lunga il più grande cambiamento mai apportato a Ethereum. A causa della natura dell'aggiornamento, doveva avvenire senza alcuna interruzione del servizio.

Per ridurre al minimo i rischi, la portata del The Merge è stata ridotta e nessun'altra funzionalità — al di fuori del passaggio dalla Prova di lavoro alla Proof-of-Stake — è stata inclusa come parte dell'aggiornamento. Il "taglio" più grande che si è dovuto fare ha riguardato i prelievi, che sono diventati il fulcro dell'imminente aggiornamento Shanghai/Capella.

#### Prelievi (2:09) {#withdrawals-209}

I prelievi dallo staking, come suggerisce il nome, consentiranno agli staker di prelevare i propri ETH bloccati. Esistono due tipi di prelievi: "parziali" e "completi".

Un **prelievo parziale** avviene quando il validatore preleva le proprie ricompense accumulate — il saldo extra oltre al saldo effettivo massimo di 32 ETH. Un prelievo parziale può anche essere definito come "pagamento della ricompensa" o "pagamento del saldo in eccesso".

Un **prelievo completo** avviene quando il validatore ha completato il processo di uscita e l'intero saldo viene prelevato. Questo si verifica solo quando il validatore esce dal sistema volontariamente o viene rimosso forzatamente in un processo chiamato "slashing".

Una volta abilitati, i prelievi dallo staking verranno distribuiti automaticamente ogni pochi giorni. Inoltre, il processo di prelievo inizia sul livello di consenso, quindi non è richiesta alcuna commissione di transazione in nessuna delle fasi.

Per iniziare a prelevare le proprie ricompense di staking, un validatore dovrà fornire il proprio indirizzo di prelievo una sola volta. Dato che i prelievi interessano sia il livello di consenso che il livello di esecuzione di Ethereum, entrambe le parti della rete devono essere aggiornate. "Shanghai" è il nome dell'aggiornamento del livello di esecuzione contenente i prelievi, che sono specificati nell'EIP-4895. "Capella" è il nome della controparte dell'aggiornamento del livello di consenso, attivato contemporaneamente. Questi due aggiornamenti sono talvolta indicati anche come "Shapella".

#### Meccaniche (3:40) {#mechanics-340}

Nell'ecosistema di Ethereum, ogni validatore ha un numero di indice corrispondente. Inoltre, hanno anche due tipi di credenziali di prelievo, definite come `0x00` o `0x01`.

`0x00` indica che un particolare validatore non ha un indirizzo di prelievo associato. Queste credenziali derivano dall'hash della chiave pubblica BLS con il suo primo byte scambiato con un byte zero — da cui il nome.

`0x01` significa che un validatore ha fornito il proprio indirizzo di prelievo. Queste credenziali di prelievo sono rappresentate come `0x01` seguito da 11 byte di zeri, quindi da un indirizzo Ethereum scelto.

Per abilitare i prelievi, i validatori con credenziali `0x00` dovranno firmare un messaggio "BLSToExecutionChange". Questo sarà possibile dopo l'aggiornamento Capella.

Una volta abilitati i prelievi, un validatore che propone un blocco scansionerà linearmente gli indici dei validatori per trovare i primi 16 validatori con credenziali `0x01` che:

- Hanno un saldo che supera i 32 ETH (ricompense del validatore maturate)
- Sono "prelevabili" (hanno completato l'uscita dal set di validatori)

La ricerca lineare si ferma dopo aver trovato 16 validatori che soddisfano questi criteri o dopo 16.384 iterazioni. L'algoritmo ricorda l'indice a cui si è fermata la ricerca, in modo che il validatore successivo che propone un blocco possa riprendere da quell'indice. Dopo essere arrivato all'ultimo indice, l'algoritmo ricomincia dall'inizio — indice 0.

Una buona analogia sarebbe un orologio analogico in cui la lancetta indica l'ora, avanza in una direzione, non salta alcuna ora e alla fine ricomincia dall'inizio dopo aver raggiunto l'ultimo numero.

Dopo aver completato la scansione, il validatore crea un elenco di prelievi da includere nel proprio payload di esecuzione. Ogni elemento dell'elenco contiene:

- **WithdrawalIndex** — un indice monotonicamente crescente, a partire da 0, che aumenta di 1 per ogni prelievo per identificare in modo univoco ciascun prelievo
- **ValidatorIndex** — l'indice del validatore il cui saldo viene prelevato
- **ExecutionAddress** — l'indirizzo ETH sul livello di esecuzione a cui deve essere inviato il prelievo
- **Amount** — l'importo, in Gwei, da inviare all'indirizzo di esecuzione

Durante la creazione o l'elaborazione di un blocco, i client del livello di esecuzione applicano questi prelievi alla fine di un blocco. L'elaborazione dei prelievi non compete con le transazioni degli utenti per lo spazio nel blocco. Con un massimo di 16 prelievi elaborati per blocco, dovrebbero esserci un massimo di 115.200 prelievi elaborati al giorno, supponendo che non ci siano slot persi.

Il design dei prelievi è semplice ma estremamente robusto.

#### Malintesi (6:30) {#misconceptions-630}

Il primo malinteso afferma che, durante l'elaborazione dei prelievi, c'è una differenza tra un prelievo "completo" e uno "parziale" in termini di priorità o ordinamento. Sia i prelievi completi che quelli parziali avvengono quando la scansione lineare sul set di validatori raggiunge l'indice di un validatore. L'unica differenza è che, nel caso di prelievi completi, un validatore deve lasciare la coda di uscita e raggiungere l'"epoca prelevabile" prima che la scansione lineare possa rilevarlo.

Un altro malinteso è che gli utenti perderanno le loro ricompense se non forniscono un indirizzo di prelievo. Questo non è vero: nel caso in cui un validatore dimentichi di fornire un indirizzo di prelievo, le sue ricompense in ETH non verranno inviate nel vuoto una volta abilitati i prelievi. Invece, la scansione salterà i validatori che non hanno fornito i propri indirizzi di prelievo.

È importante ricordare che l'indirizzo di prelievo non può essere modificato e viene impostato una sola volta. Gli staker devono prestare estrema attenzione durante l'impostazione dell'indirizzo di prelievo, assicurandosi di avere la piena proprietà dell'indirizzo fornito.

Si ipotizza anche che gli staker preleveranno molti ETH dall'ecosistema di Ethereum una volta abilitati i prelievi, con la versione più forte di questa argomentazione che presume che ciò destabilizzerà il meccanismo di consenso Proof-of-Stake. Sebbene non possiamo prevedere con esattezza quanti ETH verranno prelevati nel tempo, ci sono alcune importanti controargomentazioni:

In primo luogo, la maggior parte degli staker sono i primi adottanti di Ethereum che sono stati abbastanza coraggiosi da mettere in staking quando era ancora incerto quando sarebbero stati abilitati i prelievi. Molti staker hanno espresso il desiderio di continuare a fare staking per supportare la rete e continuare a guadagnare ricompense denominate in ETH.

In secondo luogo, per garantire che il meccanismo di consenso Proof-of-Stake e il set attivo di validatori rimangano stabili, Ethereum ha implementato una coda di prelievo per tutti i validatori che desiderano l'uscita. Questa coda limita il numero di validatori che possono lasciare l'ecosistema contemporaneamente.

La prima scansione dei prelievi preleverà molte ricompense accumulate — in pratica dall'inizio della Beacon Chain. Tuttavia, quelle successive elaboreranno una quantità molto più piccola di ETH.

#### Implicazioni (8:39) {#implications-839}

L'abilitazione dei prelievi creerà un flusso di staking aperto e bidirezionale. Attualmente, il flusso di staking è unidirezionale: gli ETH possono solo fluire nella rete e mai uscirne. È interessante notare che l'abilitazione dei prelievi potrebbe incentivare ancora più persone a fare staking, poiché sapranno di poter sempre prelevare i propri ETH se necessari per qualcos'altro.

Gli staker che non gestiscono i propri validatori e fanno staking con un fornitore di staking centralizzato potranno cambiare il proprio fornitore con uno diverso. Possono prelevare fondi da un fornitore che offre un tasso di staking inferiore a uno che offre un tasso migliore, passare da un fornitore centralizzato a uno decentralizzato o persino gestire il proprio validatore.

I prelievi avranno un impatto anche sui derivati di staking liquido come Lido, Rocket Pool e altri. I token di liquid staking (LST) come stETH o rETH hanno avuto una storia di perdita temporanea del loro ancoraggio al prezzo di ETH durante le turbolenze del mercato. Tuttavia, con il flusso di staking bidirezionale, qualsiasi discrepanza significativa nel loro ancoraggio verrebbe rapidamente eliminata tramite arbitraggio.

I primi adottanti nello staking liquido e nello staking centralizzato hanno catturato la stragrande maggioranza del mercato poiché non avevano molta concorrenza. Tuttavia, la quota di mercato di questi attori storici potrebbe subire un grande cambiamento una volta abilitati i prelievi, specialmente se non offrono un tasso competitivo. La capacità di spostarsi liberamente tra i fornitori di staking andrà a vantaggio del mercato dello staking di ETH.

#### Riepilogo (10:01) {#summary-1001}

L'abilitazione dei prelievi dallo staking è uno degli aggiornamenti più attesi per Ethereum. Sarà estremamente importante assicurarsi che questo cambiamento venga eseguito senza intoppi. Per aiutare con i test, i validatori avranno a disposizione diverse devnet e testnet per eseguire il processo e risolvere eventuali problemi prima di passare alla Mainnet.

I prelievi sono l'ennesimo miglioramento che porta Ethereum un passo avanti verso la costruzione di un futuro sostenibile, sicuro e decentralizzato. L'aggiornamento Shapella è previsto per la prima metà del 2023.

Al momento di questo video, la Beacon Chain ha accumulato oltre 17 milioni di ETH attraverso oltre 530.000 validatori. Il saldo medio per un validatore è appena superiore a 34 ETH, il che significa oltre 1 milione di ETH in ricompense accumulate. Sarà interessante vedere come i prelievi influenzeranno questi numeri.