---
title: Come revocare l'accesso dei contratti intelligenti ai tuoi fondi di criptovalute
description: Una guida su come revocare l'accesso di sfruttamento al token del contratto intelligente
lang: it
---

# Come revocare l'accesso dei contratti intelligenti ai tuoi fondi di criptovalute

Questa guida ti spiegherà come visualizzare l'elenco completo dei [contratti intelligenti](/glossary/#smart-contract) ai quali hai permesso l'accesso ai tuoi fondi e come annullarli.

Talvolta gli sviluppatori malevoli creano backdoor nei contratti intelligenti che consentono l'accesso ai fondi di utenti inconsapevoli che interagiscono con il contratto intelligente. Ciò che spesso si verifica è che tali piattaforme chiedono all'utente l'autorizzazione a spendere un **numero illimitato di token** nel tentativo di risparmiare piccoli importi di [gas](/glossary/#gas) in futuro, ma ciò comporta rischi maggiori.

Una volta che una piattaforma dispone di diritti d'accesso illimitati al tuo [portafoglio](/glossary/#wallet), potrà spendere tutti quei token anche se hai prelevato i tuoi fondi da tale piattaforma sul tuo portafoglio. Gli utenti malevoli possono comunque accedere ai tuoi fondi e prelevarli nei propri portafogli senza che ti rimanga alcuna opzione di recupero.

Le sole forme di protezione sono astenersi dall'utilizzo di nuovi progetti non testati, approvare soltanto ciò che è necessario, o revocare regolarmente l'accesso. Quindi, come si fa?

## Fase 1: utilizzare strumenti di revoca dell'accesso

Svariati siti web ti consentono di visualizzare e revocare i contratti intelligenti connessi al tuo indirizzo. Visita il sito web e connetti il tuo portafoglio:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (svariate reti)
- [Revoke](https://revoke.cash/) (svariate reti)
- [Unrekt](https://app.unrekt.net/) (svariate reti)
- [EverRevoke](https://everrise.com/everrevoke/) (svariate reti)

## Fase 2: connetti il tuo portafoglio

Una volta sul sito web, clicca su "Connetti portafoglio". Il sito web dovrebbe richiederti di connettere il tuo portafoglio.

Assicurati di utilizzare la stessa rete nel tuo portafoglio e sul sito web. Vedrai soltanto i contratti intelligenti correlati alla rete selezionata. Ad esempio, se ti connetti alla Rete Principale di Ethereum, vedrai soltanto i contratti di Ethereum, non quelli di altre catene come Polygon.

## Fase 3: seleziona un contratto intelligente che desideri revocare

Dovresti vedere tutti i contratti aventi l'accesso consentito ai tuoi token e il loro limite di spesa. Trova quello che desideri risolvere.

Se non sai quale contratto scegliere, puoi revocarli tutti. Non creerà alcun problema per te, ma dovrai garantire una nuova serie di autorizzazioni alla prossima interazione con uno qualsiasi di questi contratti.

## Fase 4: revocare l'accesso ai tuoi fondi

Una volta fatto clic su revoca, dovresti visualizzare un nuovo suggerimento di transazione nel tuo portafoglio. Ciò è prevedibile. Dovrai pagare la commissione affinché l'annullamento vada a buon fine. A seconda della rete, l'elaborazione può richiedere da uno a svariati minuti.

Ti consigliamo di ricaricare lo strumento di revoca dopo qualche minuto e di riconnettere il tuo portafoglio, per ricontrollare se il contratto revocato è scomparso dall'elenco.

<mark>Ti consigliamo di non consentire mai l'accesso illimitato ai tuoi token ai progetti e di revocare regolarmente gli accessi di allowance a tutti i token. Revocare l'accesso al token non dovrebbe mai risultare in una perdita di fondi, specialmente se utilizzi i suddetti strumenti.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Vuoi scoprire di più?</div>
  <ButtonLink href="/guides/">
    Visualizza le altre guide
  </ButtonLink>
</InfoBanner>

## Domande frequenti

### Revocare l'accesso al token fa cessare anche lo staking, i pool, i prestiti, ecc.?

No, non influenzerà nessuna delle tue strategie di [DeFi](/glossary/#defi). Manterrai tue posizioni e continuerai a ricevere ricompense, ecc.

### Disconnettere un portafoglio da un progetto equivale a rimuovere le autorizzazioni a utilizzare i miei fondi?

No, se disconnetti il tuo portafoglio dal progetto, ma hai garantito al token le autorizzazioni di allowance, può ancora utilizzare questi token. Devi revocare tale accesso.

### Quando scadranno le autorizzazioni del contratto?

Non esistono date di scadenza delle autorizzazioni dei contratti. Se concedi le autorizzazioni al contratto, sono utilizzabili persino anni dopo la loro concessione.

### Perché i progetti impostano allowance dei token illimitata?

Spesso i progetti lo fanno per ridurre il numero di richieste necessarie, a significare che l'utente deve approvare soltanto una volta, pagando la commissione di transazione un'unica volta. Sebbene sia comodo, può essere pericoloso che gli utenti approvino senza cautela, su siti web non affidabili o controllati. Alcuni portafogli ti consentono di limitare manualmente la quantità di token approvati per limitare i tuoi rischi. Consulta il fornitore del tuo portafoglio per ulteriori informazioni.
