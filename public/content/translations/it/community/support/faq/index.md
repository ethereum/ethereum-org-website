---
title: Domande frequenti
description: Domande comuni su Ethereum riguardanti portafogli, transazioni, staking e altro ancora.
lang: it
---

## Ho inviato cripto all'indirizzo sbagliato {#wrong-wallet}

Una transazione inviata su Ethereum è irreversibile. Purtroppo, se hai inviato ETH o token al portafoglio sbagliato, non c'è modo di annullare la transazione.

**Cosa puoi fare:**

- **Se conosci il proprietario dell'indirizzo**, contattalo direttamente e chiedigli di restituire i fondi
- **Se l'indirizzo appartiene a un exchange o a un servizio noto**, contatta il loro team di supporto, poiché potrebbero essere in grado di aiutarti
- **Se hai inviato token all'indirizzo di un contratto**, verifica se il contratto ha una funzione di prelievo o di recupero (questo è raro)

Nella maggior parte dei casi, non c'è modo di recuperare i fondi. Nessuna organizzazione centrale, entità o persona possiede Ethereum, il che significa che nessuno può annullare le transazioni. Controlla sempre due volte l'indirizzo del destinatario prima di confermare.

## Ho perso l'accesso al mio portafoglio {#lost-wallet-access}

Le tue opzioni di recupero dipendono dal tipo di portafoglio che utilizzi.

### Se hai la tua frase seme (frase di recupero) {#if-you-have-your-seed-phrase-recovery-phrase}

Puoi ripristinare il tuo portafoglio in qualsiasi app di portafoglio compatibile utilizzando la tua frase seme. Questo è il motivo per cui è fondamentale conservare la tua frase seme in modo sicuro offline. Consulta la documentazione del fornitore del tuo portafoglio per le istruzioni di ripristino.

### Se hai perso la tua frase seme {#if-you-have-lost-your-seed-phrase}

Senza la tua frase seme o le chiavi private, i tuoi fondi non possono essere recuperati. Nessuno, incluso ethereum.org, può reimpostare la tua password o ripristinare l'accesso a un portafoglio di autocustodia.

### Se il tuo account è su un exchange {#if-your-account-is-on-an-exchange}

Se il tuo account si trova su un exchange centralizzato come Coinbase, Binance o Kraken, contatta direttamente il team di supporto dell'exchange. Loro controllano gli account sulla loro piattaforma e potrebbero essere in grado di aiutarti con la reimpostazione della password o il recupero dell'account.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Non condividere mai la tua frase seme con nessuno** che affermi di aiutarti a recuperare il tuo portafoglio. Questa è una delle tattiche di truffa più comuni. Nessun servizio legittimo ti chiederà mai la tua frase seme.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Come usare un portafoglio
</DocLink>

## La mia transazione è bloccata o in sospeso {#stuck-transaction}

Le transazioni su Ethereum possono bloccarsi quando la commissione del gas che hai impostato era inferiore a quella attualmente richiesta dalla rete. La maggior parte dei portafogli ti consente di risolvere questo problema:

- **Velocizzare:** Invia nuovamente la stessa transazione con una commissione del gas più alta
- **Annullare:** Invia una transazione di 0 ETH al tuo stesso indirizzo utilizzando lo stesso nonce della transazione in sospeso

### Guide utili {#helpful-guides}

- [Come velocizzare o annullare una transazione in sospeso su MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Come annullare le transazioni Ethereum in sospeso](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Come posso riscattare il mio giveaway di Ethereum? {#giveaway-scam}

I giveaway di Ethereum sono truffe progettate per rubare i tuoi ETH. Non lasciarti tentare da offerte che sembrano troppo belle per essere vere. Se invii ETH a un indirizzo di giveaway, non riceverai alcun giveaway e non sarai in grado di recuperare i tuoi fondi.

[Maggiori informazioni sulla prevenzione delle truffe](/security/#common-scams)

## Come posso mettere in staking gli ETH? {#how-to-stake}

Per diventare un validatore, devi mettere in staking 32 ETH nel contratto di deposito di Ethereum e configurare un nodo validatore. Puoi anche partecipare con meno ETH attraverso i pool di staking.

Maggiori informazioni sono disponibili sulle nostre [pagine sullo staking](/staking/) e sul [launchpad di staking](https://launchpad.ethereum.org/).

## Come posso minare Ethereum? {#mining-ethereum}

Il minaggio di Ethereum non è più possibile. Il minaggio è stato disattivato quando Ethereum è passato dalla [Prova di lavoro (PoW)](/glossary/#pow) alla [Proof-of-Stake (PoS)](/glossary/#pos) durante [The Merge](/roadmap/merge/) a settembre 2022. Ora, invece dei minatori, Ethereum ha i validatori. Chiunque può [mettere in staking](/glossary/#staking) ETH e ricevere ricompense di staking per l'esecuzione del software del validatore al fine di proteggere la rete.