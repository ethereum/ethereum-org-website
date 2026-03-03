---
title: Domande frequenti
description: Domande frequenti su Ethereum riguardo a portafogli, transazioni, staking e altro.
lang: it
---

# Domande frequenti {#faq}

## Ho inviato criptovalute all'indirizzo sbagliato {#wrong-wallet}

Una transazione inviata in Ethereum è irreversibile. Sfortunatamente, se hai inviato ETH o token al portafoglio sbagliato, non c'è modo di annullare la transazione.

**Cosa puoi fare:**

- **Se conosci il proprietario dell'indirizzo**, contattalo direttamente e chiedigli di restituirti i fondi
- **Se l'indirizzo appartiene a un exchange o a un servizio noto**, contatta il loro team di assistenza, poiché potrebbero essere in grado di aiutarti
- **Se hai inviato token a un indirizzo di contratto**, controlla se il contratto ha una funzione di prelievo o di recupero (è raro)

Nella maggior parte dei casi, non c'è modo di recuperare i fondi. Nessuna organizzazione centrale, entità o persona possiede Ethereum, il che significa che nessuno può annullare le transazioni. Ricontrolla sempre l'indirizzo del destinatario prima di confermare.

## Ho perso l'accesso al mio portafoglio {#lost-wallet-access}

Le opzioni di recupero dipendono dal tipo di portafoglio che usi.

### Se hai la tua frase seed (frase di recupero)

Puoi ripristinare il tuo portafoglio in qualsiasi app portafoglio compatibile usando la tua frase seed. Per questo è fondamentale conservare la frase seed in un posto sicuro e offline. Consulta la documentazione del fornitore del tuo portafoglio per le istruzioni di ripristino.

### Se hai perso la tua frase seed

Senza la tua frase seed o le chiavi private, non è possibile recuperare i tuoi fondi. Nessuno, incluso ethereum.org, può reimpostare la tua password o ripristinare l'accesso a un portafoglio a custodia autonoma.

### Se il tuo account si trova su un exchange

Se il tuo account si trova su un exchange centralizzato come Coinbase, Binance o Kraken, contatta direttamente il team di assistenza dell'exchange. Essi controllano gli account sulla loro piattaforma e potrebbero essere in grado di aiutarti con la reimpostazione della password o il recupero dell'account.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Non condividere mai la tua frase seed con nessuno** che affermi di aiutarti a recuperare il tuo portafoglio. Questa è una delle tattiche di truffa più comuni. Nessun servizio legittimo ti chiederà mai la tua frase seed.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Come utilizzare un portafoglio
</DocLink>

## La mia transazione è bloccata o in sospeso {#stuck-transaction}

Le transazioni su Ethereum possono bloccarsi quando la commissione sul gas che hai impostato è inferiore a quella attualmente richiesta dalla rete. La maggior parte dei portafogli ti permette di risolvere il problema:

- **Velocizza:** Invia di nuovo la stessa transazione con una commissione sul gas più alta
- **Annulla:** Invia una transazione da 0 ETH al tuo stesso indirizzo usando lo stesso nonce della transazione in sospeso

### Guide utili

- [Come velocizzare o annullare una transazione in sospeso su MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Come annullare le transazioni Ethereum in sospeso](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Come posso rivendicare la mia ricompensa di Ethereum? {#giveaway-scam}

I giveaway Ethereum sono truffe progettate per rubare il vostro ETH. Non lasciarti tentare da offerte che sembrano troppo belle per essere vere. Se invii ETH a un indirizzo per un giveaway, non riceverai alcun giveaway e non potrai recuperare i tuoi fondi.

[Maggiori informazioni sulla prevenzione delle truffe](/security/#common-scams)

## Come posso mettere in staking ETH? {#how-to-stake}

Per diventare un validatore, devi mettere in staking 32 ETH nel contratto di deposito di Ethereum e configurare un nodo del validatore. Puoi anche partecipare con meno ETH tramite i pool di staking.

Maggiori informazioni sono disponibili sulle nostre [pagine sullo staking](/staking/) e sul [launchpad per lo staking](https://launchpad.ethereum.org/).

## Come posso fare mining su Ethereum? Come posso minare Ethereum? {#mining-ethereum}

Il mining su Ethereum non è più possibile. Il mining è stato disattivato quando Ethereum è passata da [proof-of-work](/glossary/#pow) a [proof-of-stake](/glossary/#pos) durante [La Fusione](/roadmap/merge/) a settembre 2022. Ora, invece dei miner, Ethereum ha i validatori. Chiunque può mettere ETH in [staking](/glossary/#staking) e ricevere ricompense per l'esecuzione del software del validatore per proteggere la rete.
