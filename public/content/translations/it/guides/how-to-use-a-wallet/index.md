---
title: Come usare un portafoglio
metaTitle: Come usare i portafogli Ethereum | Passo dopo passo
description: Una guida che spiega come inviare, ricevere token e connettersi ai progetti web3.
lang: it
---

Scopri come utilizzare tutte le funzioni di base di un portafoglio. Se non ne hai ancora uno, dai un'occhiata alla nostra guida su [Come creare un account Ethereum](/guides/how-to-create-an-ethereum-account/).

## Apri il tuo portafoglio {#open-your-wallet}

Dovresti vedere una dashboard che probabilmente mostrerà il tuo saldo e conterrà i pulsanti per inviare e ricevere token.

## Ricevere criptovaluta {#receive-cryptocurrency}

Vuoi ricevere cripto nel tuo portafoglio?

Ogni account Ethereum ha il proprio indirizzo di ricezione, che è una sequenza univoca di numeri e lettere. L'indirizzo funziona come un numero di conto bancario. Gli indirizzi Ethereum inizieranno sempre con "0x". Puoi condividere questo indirizzo con chiunque: è sicuro farlo.

Il tuo indirizzo è come l'indirizzo di casa tua: devi dire alle persone qual è in modo che possano trovarti. È sicuro farlo, perché puoi comunque chiudere a chiave la porta d'ingresso con un'altra chiave che solo tu controlli, in modo che nessuno possa entrare, anche se sanno dove vivi.

Devi fornire a chiunque voglia inviarti denaro il tuo indirizzo pubblico. Molte app di portafoglio ti consentono di copiare il tuo indirizzo o mostrare un codice QR da scansionare per un utilizzo più semplice. Evita di digitare manualmente qualsiasi indirizzo Ethereum. Questo può facilmente portare a errori di battitura e alla perdita di fondi.

App diverse possono variare o utilizzare un linguaggio diverso, ma dovrebbero guidarti attraverso un processo simile se stai cercando di trasferire fondi.

1. Apri la tua app di portafoglio.
2. Clicca su "Ricevi" (o un'opzione con una dicitura simile).
3. Copia il tuo indirizzo Ethereum negli appunti.
4. Fornisci al mittente il tuo indirizzo Ethereum di ricezione.

## Inviare criptovaluta {#send-cryptocurrency}

Vorresti inviare ETH a un altro portafoglio?

1. Apri la tua app di portafoglio.
2. Ottieni l'indirizzo di ricezione e assicurati di essere connesso alla stessa rete del destinatario.
3. Inserisci l'indirizzo di ricezione o scansiona un codice QR con la tua fotocamera in modo da non dover scrivere l'indirizzo manualmente.
4. Clicca su un pulsante "Invia" nel tuo portafoglio (o un'alternativa con una dicitura simile).

![Send field for crypto address](./send.png)
<br/>

5. Molti asset, come DAI o USDC, esistono su più reti. Quando trasferisci token cripto, assicurati che il destinatario stia utilizzando la tua stessa rete, poiché non sono intercambiabili.
6. Assicurati che il tuo portafoglio abbia abbastanza ETH per coprire la commissione di transazione, che varia a seconda delle condizioni della rete. La maggior parte dei portafogli aggiungerà automaticamente la commissione suggerita alla transazione, che potrai poi confermare.
7. Una volta elaborata la tua transazione, l'importo in cripto corrispondente apparirà nell'account del destinatario. Questo potrebbe richiedere da pochi secondi a qualche minuto, a seconda di quanto la rete sia attualmente utilizzata.

## Connettersi ai progetti {#connecting-to-projects}

Il tuo indirizzo sarà lo stesso in tutti i progetti Ethereum. Non è necessario registrarsi individualmente su alcun progetto. Una volta che hai un portafoglio, puoi connetterti a qualsiasi progetto Ethereum senza alcuna informazione aggiuntiva. Non sono necessarie email o altre informazioni personali.

1. Visita il sito web di qualsiasi progetto.
2. Se la pagina di destinazione del progetto è solo una descrizione statica del progetto, dovresti poter cliccare su un pulsante "Apri l'App" nel menu che ti indirizzerà all'app web vera e propria.
3. Una volta nell'app, clicca su "Connetti".

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Seleziona il tuo portafoglio dall'elenco delle opzioni fornite. Se non riesci a vedere il tuo portafoglio, potrebbe essere nascosto sotto l'opzione "WalletConnect".

![Selecting from a list of wallets to connect with](./connect2.png)

5. Conferma la richiesta di firma nel tuo portafoglio per stabilire la connessione. **La firma di questo messaggio non dovrebbe richiedere la spesa di alcun ETH**.
6. Questo è tutto! Inizia a usare l'app. Puoi trovare alcuni progetti interessanti sulla nostra [pagina delle dapp](/apps/#explore).
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Vuoi saperne di più?</div>
  <ButtonLink href="/guides/">
    Vedi le nostre altre guide
  </ButtonLink>
</AlertContent>
</Alert>

## Domande frequenti {#frequently-asked-questions}

### Se possiedo un indirizzo ETH, possiedo lo stesso indirizzo su altre blockchain? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Puoi usare lo stesso indirizzo su tutte le blockchain compatibili con l'EVM (se hai il tipo di portafoglio con una frase di recupero). Questo [elenco](https://chainlist.org/) ti mostrerà quali blockchain puoi usare con lo stesso indirizzo. Alcune blockchain, come Bitcoin, implementano un insieme di regole di rete completamente separato e avrai bisogno di un indirizzo diverso con un formato diverso. Se hai un portafoglio smart contract, dovresti controllare il sito web del prodotto per maggiori informazioni su quali blockchain sono supportate.

### Posso usare lo stesso indirizzo su più dispositivi? {#can-i-use-the-same-address-on-multiple-devices}

Sì, puoi usare lo stesso indirizzo su più dispositivi. I portafogli sono tecnicamente solo un'interfaccia per mostrarti il tuo saldo e per effettuare transazioni; il tuo account non è memorizzato all'interno del portafoglio, ma sulla blockchain.

### Non ho ricevuto le cripto, dove posso controllare lo stato di una transazione? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Puoi usare gli [esploratori di blocchi](/developers/docs/data-and-analytics/block-explorers/) per vedere lo stato di qualsiasi transazione in tempo reale. Tutto ciò che devi fare è cercare l'indirizzo del tuo portafoglio o l'ID della transazione.

### Posso annullare o restituire le transazioni? {#can-i-cancel-or-return-transactions}

No, una volta che una transazione è confermata, non puoi annullare la transazione.
