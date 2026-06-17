---
title: Come revocare l'accesso degli smart contract ai tuoi fondi crypto
description: Una guida pratica su come revocare l'accesso ai token da parte di smart contract malevoli
lang: it
---

Questa guida ti insegnerà come visualizzare un elenco di tutti gli [smart contract](/glossary/#smart-contract) a cui hai consentito l'accesso ai tuoi fondi e come annullarlo.

A volte, sviluppatori malintenzionati creano backdoor negli smart contract che consentono l'accesso ai fondi di utenti ignari che interagiscono con lo smart contract. Ciò che accade spesso è che tali piattaforme chiedono all'utente il permesso di spendere un **numero illimitato di token** nel tentativo di risparmiare piccole quantità di [gas](/glossary/#gas) in futuro, ma questo comporta un rischio maggiore.

Una volta che una piattaforma ha diritti di accesso illimitati a un token sul tuo [portafoglio](/glossary/#wallet), può spendere tutti quei token anche se hai prelevato i tuoi fondi dalla loro piattaforma al tuo portafoglio. Gli attori malintenzionati possono ancora accedere ai tuoi fondi e prelevarli nei loro portafogli senza lasciarti alcuna opzione di recupero.

Le uniche protezioni sono astenersi dall'utilizzare nuovi progetti non testati, approvare solo ciò di cui hai bisogno o revocare regolarmente l'accesso. Quindi, come si fa?

## Passaggio 1: Usa gli strumenti di revoca dell'accesso {#step-1-use-revoke-access-tools}

Diversi siti web ti consentono di visualizzare e revocare gli smart contract connessi al tuo indirizzo. Visita il sito web e connetti il tuo portafoglio:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (reti multiple)
- [Unrekt](https://app.unrekt.net/) (reti multiple)
- [EverRevoke](https://everrise.com/everrevoke/) (reti multiple)

## Passaggio 2: Connetti il tuo portafoglio {#step-2-connect-your-wallet}

Una volta sul sito web, clicca su “Connect wallet” (Connetti portafoglio). Il sito web dovrebbe chiederti di connettere il tuo portafoglio.

Assicurati di utilizzare la stessa rete nel tuo portafoglio e nel sito web. Vedrai solo gli smart contract relativi alla rete selezionata. Ad esempio, se ti connetti alla Mainnet di Ethereum, vedrai solo i contratti di Ethereum, non i contratti di altre catene come Polygon.

## Passaggio 3: Seleziona uno smart contract che desideri revocare {#step-3-select-a-smart-contract-you-wish-to-revoke}

Dovresti vedere tutti i contratti a cui è consentito l'accesso ai tuoi token e il loro limite di spesa. Trova quello che desideri terminare.

Se non sai quale contratto scegliere, puoi revocarli tutti. Non ti creerà alcun problema, ma dovrai concedere un nuovo set di autorizzazioni la prossima volta che interagirai con uno qualsiasi di questi contratti.

## Passaggio 4: Revoca l'accesso ai tuoi fondi {#step-4-revoke-access-to-your-funds}

Una volta cliccato su revoca, dovresti vedere un nuovo suggerimento di transazione nel tuo portafoglio. Questo è normale. Dovrai pagare la commissione di transazione affinché l'annullamento vada a buon fine. A seconda della rete, l'elaborazione può richiedere da un minuto a diversi minuti.

Ti consigliamo di aggiornare lo strumento di revoca dopo qualche minuto e di connettere nuovamente il tuo portafoglio per verificare se il contratto revocato è scomparso dall'elenco.

<mark>Ti consigliamo di non consentire mai ai progetti un accesso illimitato ai tuoi token e di revocare regolarmente tutte le autorizzazioni di spesa dei token. La revoca dell'accesso ai token non dovrebbe mai comportare una perdita di fondi, specialmente se utilizzi gli strumenti elencati sopra.</mark>

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

## Domande frequenti {#frequently-asked-questions}

### La revoca dell'accesso ai token termina anche lo staking, il pooling, il prestito, ecc.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

No, non influenzerà nessuna delle tue strategie di [finanza decentralizzata (DeFi)](/glossary/#defi). Manterrai le tue posizioni e continuerai a ricevere ricompense, ecc.

### Disconnettere un portafoglio da un progetto è la stessa cosa che rimuovere il permesso di utilizzare i miei fondi? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

No, se disconnetti il tuo portafoglio dal progetto, ma hai concesso le autorizzazioni di spesa dei token, possono ancora utilizzare quei token. Devi revocare quell'accesso.

### Quando scadrà il permesso del contratto? {#when-will-the-contract-permission-expire}

Non ci sono date di scadenza sui permessi del contratto. Se concedi i permessi del contratto, possono essere utilizzati, anche anni dopo essere stati concessi.

### Perché i progetti impostano un'autorizzazione di spesa dei token illimitata? {#why-do-projects-set-unlimited-token-allowance}

I progetti spesso lo fanno per ridurre al minimo il numero di richieste necessarie, il che significa che l'utente deve approvare una sola volta e pagare la commissione di transazione una sola volta. Sebbene sia conveniente, può essere pericoloso per gli utenti approvare con noncuranza, su siti che non sono stati testati nel tempo o verificati. Alcuni portafogli ti consentono di limitare manualmente la quantità di token da approvare per limitare il rischio. Verifica con il fornitore del tuo portafoglio per maggiori informazioni.