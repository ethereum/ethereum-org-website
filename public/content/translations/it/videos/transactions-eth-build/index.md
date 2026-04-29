---
title: "Transazioni — ETH.BUILD"
description: "Una dimostrazione di come funzionano le transazioni di Ethereum utilizzando lo strumento educativo ETH.BUILD. Scopri come le transazioni vengono costruite, firmate e inviate sulla rete Ethereum."
lang: it
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transazioni"
format: tutorial
author: Austin Griffith
breadcrumb: "Transazioni (ETH.BUILD)"
---

Un tutorial di **Austin Griffith** che dimostra come funzionano le transazioni di Ethereum utilizzando lo strumento di programmazione visiva ETH.BUILD — coprendo la struttura della transazione, i prezzi del gas, la firma, la trasmissione e la pool di transazioni.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=er-0ihqFQB0) pubblicata da Austin Griffith. È stata leggermente modificata per facilitarne la lettura.*

#### Commissioni di transazione e incentivi per i minatori (0:00) {#transaction-fees-and-miner-incentives-000}

Oggi su ETH.BUILD parleremo di transazioni. Fino ad ora, abbiamo visto queste transazioni venire minate nei blocchi, impacchettate nei blocchi e minate in una catena. Vogliamo parlare di cosa incentiva il minatore — oltre alla ricompensa del blocco — a estrarre la nostra transazione dalla pool e inserirla in un blocco per minarla sulla catena, rispetto ad altre persone nella pool. Potrebbero esserci migliaia di persone nella pool che fanno una sorta di offerta, e quell'offerta è rappresentata da questa commissione.

Potrei avere una commissione nella mia transazione che dice: "Sono Alice e sto inviando cinque a Bob, e il mio nonce è uno per la protezione dai replay". Inoltre, chiunque mini questo blocco può tenere la commissione per sé. Fondamentalmente, Alice sta inviando cinque a Bob, ma sta anche pagando al minatore un nichelino per inserirla nella catena.

#### Anatomia di una transazione di Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Che aspetto ha una transazione su Ethereum? Non avremo più "Bob" e "Alice" — avremo degli indirizzi. Il valore sarà in Wei, non in ETH. E anche la commissione sarà in Wei.

Diamo un'occhiata a questa transazione. Ho un account con una frase mnemonica inserita e sono collegato alla Mainnet di Ethereum. Sto anche eseguendo un modulo per ottenere i dati sui prezzi da CoinMarketCap, così posso vedere che zero virgola uno e qualcosa ETH si traduce in circa ventitré dollari.

#### Impostazione della transazione (2:25) {#setting-up-the-transaction-225}

Quello che farò è creare una transazione e incentivare il minatore a prenderla e inserirla onchain. Ho due personaggi: Alice e Bob. Alice invierà con la sua chiave privata un certo valore a Bob. Non c'è un campo per l'indirizzo "da" (from) qui perché — ricorda — stiamo firmando e recuperando con la nostra coppia di chiavi. La transazione viene impacchettata, firmata e poi inviata attraverso la rete. Nessuno può manometterla e, dall'altra parte, qualcuno può recuperarla e scoprire che siamo stati effettivamente noi a firmarla. L'indirizzo "da" viene derivato.

#### Strategia per il prezzo del gas (4:20) {#gas-price-strategy-420}

Il prezzo del gas è impostato a circa 4,1 Gwei per impostazione predefinita — ovvero 4,1 miliardi di Wei. Ma vogliamo essere più strategici al riguardo e vedere cosa sta succedendo onchain in questo momento. Possiamo vedere che l'ultimo blocco aveva 78 transazioni e il prezzo del gas variava da circa 5 fino a un certo minimo. Fondamentalmente, dovremmo essere sopra a 5 per essere minati in quel blocco. Quindi impostiamo il prezzo del gas a 5,001 — solo un po' di più.

#### Conversione in Wei (5:20) {#converting-to-wei-520}

Dobbiamo fare una conversione in Wei. Su Ethereum, si ha a che fare principalmente con due denominazioni: ETH, che è quella di cui le persone parlano normalmente, e poi Wei, che è come una frazione piccolissima di ETH. Un Gwei — quello che usiamo per i prezzi del gas — sta nel mezzo. Il motivo è simile al perché non andiamo in giro parlando in frazioni di centesimo.

Alice ha 0,18 ETH e invieremo 0,05 ETH a Bob. Inseriamo un prezzo del gas di 5 Gwei.

#### Firma e trasmissione (7:02) {#signing-and-broadcasting-702}

Quando Alice sceglie di firmare la transazione, questa viene emessa come una transazione firmata che può viaggiare attraverso la rete. Nessuno può manometterla — dall'altra parte, qualcuno può derivare che è stata Alice a firmarla, e contiene tutte le informazioni su a chi vogliamo inviare e il gas che va al minatore.

Prendiamo quella transazione firmata e la inseriamo nella funzione di invio del modulo della blockchain. Quando clicco su invia, ci restituisce un hash — l'hash della transazione. Fondamentalmente, l'ho inviata alla rete distribuita e mi hanno restituito un hash della transazione. Esce sulla rete, e poi c'è questa pool di transazioni — persone che fanno tutte offerte per far passare la loro transazione.

#### Controllo del blocco (8:41) {#checking-the-block-841}

Possiamo interrogare la blockchain per la nostra transazione. E in effetti, è già stata minata. Possiamo guardare il blocco, ordinare per prezzo del gas e trovarci. Ecco la nostra transazione al prezzo del gas di 5,001 — Alice che invia a Bob, senza dati aggiuntivi. Siamo lì dentro, a circa quattro o cinque posizioni dal fondo.

#### Invio di dati con una transazione (9:54) {#sending-data-with-a-transaction-954}

Siamo in grado di inviare valore e fare un'offerta per far riconoscere la nostra transazione onchain. Ma diamo un'occhiata a un'altra cosa: il campo dei dati. Possiamo inviare cose insieme alla nostra transazione. Sarà in esadecimale. Alice invierà altri sei dollari a Bob e allegheremo un messaggio: "hey Bob". Possiamo vedere "hey Bob" convertito in esadecimale.

Firmiamo quella transazione, la inviamo a un minatore, va sulla rete e otteniamo un hash in cambio. Aspettiamo che venga minata, e così accade. Quando controlliamo quel blocco, possiamo vedere la nostra transazione con i dati allegati.

#### Pool di transazioni e aumento del gas (12:43) {#transaction-pool-and-gas-bumping-1243}

Per un'ultima dimostrazione, ho inserito una transazione nella pool con un prezzo del gas molto basso — circa 1,001 Gwei. È lì ferma non minata perché non stiamo incentivando abbastanza i minatori. Possiamo vedere che la transazione è in sospeso nella pool di transazioni. La pool ha tra le cento e le trecento transazioni, ma gli ultimi blocchi minati mostrano che il prezzo del gas più basso è di circa 5.

Quindi dobbiamo inviare nuovamente questa transazione — aumentiamola a 10. È molto più di quanto dovrebbe essere, ma invieremo di nuovo la stessa transazione con lo stesso nonce ma un prezzo del gas più alto. La rete dice "stessa persona, stessa transazione, disposta a pagare di più". Viene presa e minata nel blocco successivo.

#### Riepilogo (14:52) {#summary-1452}

Abbiamo inviato una transazione, abbiamo pagato del gas per incentivare il minatore a inserirla nella catena di blocchi. Abbiamo anche inviato dati insieme a una transazione — ci sono un sacco di cose davvero fantastiche che possiamo fare ora che abbiamo questi dati di chiamata, e in seguito approfondiremo gli smart contract e un sacco di cose divertenti.