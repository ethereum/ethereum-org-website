---
title: Come revocare l'accesso dei contratti intelligenti ai tuoi fondi in criptovaluta
description: Una guida pratica su come revocare l'accesso ai token da parte di contratti intelligenti malevoli
lang: it
---

# Come revocare l'accesso dei contratti intelligenti ai tuoi fondi in criptovaluta

Questa guida ti insegnerà come visualizzare un elenco di tutti i [contratti intelligenti](/glossary/#smart-contract) a cui hai consentito l'accesso ai tuoi fondi e come annullarlo.

A volte, sviluppatori malintenzionati creano backdoor nei contratti intelligenti che consentono l'accesso ai fondi di utenti ignari che interagiscono con il contratto intelligente. Ciò che accade spesso è che tali piattaforme chiedono all'utente il permesso di spendere un **numero illimitato di token** nel tentativo di risparmiare piccole quantità di [gas](/glossary/#gas) in futuro, ma questo comporta un rischio maggiore.

Una volta che una piattaforma ha diritti di accesso illimitati a un token sul tuo [portafoglio](/glossary/#wallet), può spendere tutti quei token anche se hai prelevato i tuoi fondi dalla loro piattaforma al tuo portafoglio. Gli attori malintenzionati possono ancora accedere ai tuoi fondi e prelevarli nei loro portafogli senza lasciarti alcuna opzione di recupero.

Le uniche protezioni consistono nell'astenersi dall'utilizzare nuovi progetti non testati, approvare solo ciò di cui si ha bisogno o revocare regolarmente l'accesso. Quindi, come si fa?

## Passaggio 1: Usa gli strumenti di revoca dell'accesso

Diversi siti web ti consentono di visualizzare e revocare i contratti intelligenti connessi al tuo indirizzo. Visita il sito web e connetti il tuo portafoglio:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (reti multiple)
- [Unrekt](https://app.unrekt.net/) (reti multiple)
- [EverRevoke](https://everrise.com/everrevoke/) (reti multiple)

## Passaggio 2: Connetti il tuo portafoglio

Una volta sul sito web, clicca su "Connect wallet" (Connetti portafoglio). Il sito web dovrebbe chiederti di connettere il tuo portafoglio.

Assicurati di utilizzare la stessa rete nel tuo portafoglio e nel sito web. Vedrai solo i contratti intelligenti relativi alla rete selezionata. Ad esempio, se ti connetti alla rete principale di Ethereum, vedrai solo i contratti di Ethereum, non i contratti di altre catene come Polygon.

## Passaggio 3: Seleziona un contratto intelligente che desideri revocare

Dovresti vedere tutti i contratti a cui è consentito l'accesso ai tuoi token e il loro limite di spesa. Trova quello che desideri terminare.

Se non sai quale contratto scegliere, puoi revocarli tutti. Non ti creerà alcun problema, ma dovrai concedere un nuovo set di permessi la prossima volta che interagirai con uno qualsiasi di questi contratti.

## Passaggio 4: Revoca l'accesso ai tuoi fondi

Una volta cliccato su revoca, dovresti vedere un nuovo suggerimento di transazione nel tuo portafoglio. Questo è normale. Dovrai pagare la commissione affinché l'annullamento vada a buon fine. A seconda della rete, l'elaborazione può richiedere da un minuto a diversi minuti.

Ti consigliamo di aggiornare lo strumento di revoca dopo qualche minuto e di connettere nuovamente il tuo portafoglio per verificare se il contratto revocato è scomparso dall'elenco.

<mark>Ti raccomandiamo di non consentire mai ai progetti un accesso illimitato ai tuoi token e di revocare regolarmente tutti gli accessi concessi ai token. La revoca dell'accesso ai token non dovrebbe mai comportare una perdita di fondi, specialmente se utilizzi gli strumenti elencati sopra.</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Vuoi saperne di più?</div>
  <ButtonLink href="/guides/">
    Consulta le nostre altre guide
  </ButtonLink>
</AlertContent>
</Alert>

## Domande frequenti

### La revoca dell'accesso ai token interrompe anche lo staking, il pooling, il prestito, ecc.?

No, non influenzerà nessuna delle tue strategie [DeFi](/glossary/#defi). Manterrai le tue posizioni e continuerai a ricevere ricompense, ecc.

### Disconnettere un portafoglio da un progetto è la stessa cosa che rimuovere il permesso di usare i miei fondi?

No, se disconnetti il tuo portafoglio dal progetto, ma hai concesso i permessi di utilizzo dei token, possono ancora usare quei token. Devi revocare quell'accesso.

### Quando scadrà il permesso del contratto?

Non ci sono date di scadenza sui permessi dei contratti. Se concedi i permessi a un contratto, possono essere utilizzati, anche ad anni di distanza dalla loro concessione.

### Perché i progetti impostano un limite di spesa dei token illimitato?

I progetti spesso lo fanno per ridurre al minimo il numero di richieste necessarie, il che significa che l'utente deve approvare solo una volta e pagare la commissione della transazione solo una volta. Sebbene sia conveniente, può essere pericoloso per gli utenti approvare con noncuranza, su siti che non sono stati collaudati nel tempo o verificati. Alcuni portafogli ti consentono di limitare manualmente la quantità di token approvati per limitare il rischio. Verifica con il fornitore del tuo portafoglio per maggiori informazioni.