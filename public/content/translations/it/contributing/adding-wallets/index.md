---
title: Aggiungere portafogli
description: La politica che applichiamo quando aggiungiamo un portafoglio a ethereum.org
lang: it
---

# Aggiungere portafogli {#adding-wallets}

Vogliamo assicurarci di mostrare una varietà di portafogli che coprano il panorama ricco di funzioni dei portafogli così che gli utenti possano navigare su Ethereum in sicurezza.

Tutti sono liberi di suggerire l'aggiunta di un portafoglio a ethereum.org. Se ci siamo dimenticati un portafoglio, ti preghiamo di suggerirlo!

I portafogli sono attualmente elencati in:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

I portafogli sono in rapido cambiamento su Ethereum. Abbiamo provato a creare un meccanismo equo per la disamina su ethereum.org, ma i criteri elencati cambieranno ed evolveranno col tempo.

## Il quadro decisionale {#the-decision-framework}

### Criteri per l'inclusione: gli elementi imprescindibili {#the-must-haves}

- **Un prodotto testato per la sicurezza**: che sia tramite il controllo, un team di sicurezza interno, la codifica open source, o qualche altro metodo, la sicurezza del tuo portafoglio dev'essere attendibile. Questo riduce il rischio per gli utenti e ci dimostra che prendi la sicurezza sul serio.
- **Un portafoglio dev'esser stato "attivo" per oltre sei mesi O rilasciato da un gruppo con una comprovata esperienza**; anche questa è un'indicazione di sicurezza. 6 mesi sono un buon periodo di tempo per individuare bug critici o utilizzi impropri. Chiediamo sei mesi per aiutare a filtrare le biforcazioni i cui progetti sono abbandonati rapidamente.
- **Gestito da un team attivo**: ciò aiuta ad assicurare la qualità e che un utente riceverà supporto per le proprie richieste.
- **Elenco d'informazioni oneste e accurate** - Ci si aspetta che ogni elenco suggerito dai progetti sia fornito con informazioni oneste e accurate. I prodotti che falsificano le informazioni in elenco, ad esempio dichiarando che il proprio prodotto è "open source" quando non lo è, saranno rimossi.
- **Punto di contatto**: un punto di contatto per il portafoglio ci aiuterà molto a ottenere informazioni accurate quando sono apportate delle modifiche. Questo continuerà ad aggiornare ethereum in modo gestibile, raccogliendo le informazioni future.
- **Transazioni EIP-1559 (tipo 2)**: il tuo portafoglio deve supportare le transazioni EIP-1559 (tipo 2) per le transazioni sulla Rete Principale di Ethereum.
- **Buona esperienza dell'utente**: mentre l'UX è soggettiva, se svariati membri del team principale testano il prodotto e lo trovano difficile da utilizzare, ci riserviamo il diritto di rifiutare il portafoglio fornendo piuttosto utili suggerimenti per migliorarlo. Questo ha lo scopo di proteggere la nostra base di utenti, composta prevalentemente da principianti.

### Rimozione di prodotti {#product-removals}

- **Informazioni aggiornate**: i fornitori di portafogli sono responsabili di inoltrare le informazioni aggiornate sul proprio portafoglio ogni 6 mesi per assicurare la validità e la rilevanza delle informazioni fornite (anche se non sono state apportate modifiche al loro prodotto). Se il team del prodotto non lo fa, ethereum.org potrebbe rimuovere il progetto dalla pagina.

### Altri criteri: gli aspetti preferibili {#the-nice-to-haves}

- **Accessibile globalmente**: il tuo portafoglio non presenta limitazioni geografiche o requisiti KYC che escludono certe persone dall'accedere al tuo servizio.
- **Disponibile in più lingue**: il tuo portafoglio è tradotto in più lingue, il che consente agli utenti di tutto il mondo di accedervi.
- **Open source**: l'intera base di codice del tuo progetto (non soltanto i moduli) dovrebbe essere accessibile e dovresti accettare PR dall'intera comunità.
- **Non custodito** – Gli utenti controllano i propri fondi. Se il prodotto scompare, gli utenti potranno comunque accedere e spostare i propri fondi.
- **Supporto al portafoglio hardware**: gli utenti possono connettere i propri portafogli hardware per firmare le transazioni.
- **WalletConnect**: gli utenti possono connettersi alle dapp utilizzando WalletConnect.
- **Importazione degli endpoint RPC di Ethereum**: gli utenti possono importare i dati RPC del nodo, consentendo loro di connettersi a un nodo di propria scelta o ad altre reti compatibili con EVM.
- **NFT**: gli utenti possono visualizzare e interagire con i propri NFT nel portafoglio.
- **Connessione alle applicazioni di Ethereum**: gli utenti possono connettersi e utilizzare le applicazioni di Ethereum.
- **Staking**: gli utenti possono mettere direttamente in staking tramite il portafoglio.
- **Scambi**: gli utenti possono scambiare i token tramite il portafoglio.
- **Reti multicatena**: il tuo portafoglio supporta l'accesso degli utenti a più reti della blockchain per impostazione predefinita.
- **Reti di livello 2**: il tuo portafoglio supporta l'accesso degli utenti alle reti di livello 2 per impostazione predefinita.
- **Personalizzazione delle commissioni sul gas**: il tuo portafoglio consente agli utenti di personalizzare le commissioni sul gas delle proprie transazioni (commissione di base, commissione di priorità, commissione massima).
- **Supporto ENS**: il tuo portafoglio consente agli utenti di inviare le transazioni ai nomi ENS.
- **Supporto ERC-20**: il tuo portafoglio consente agli utenti di importare i contratti del token ERC-20 o interroga automaticamente e mostra i token ERC-20.
- **Acquistare criptovalute**: il tuo portafoglio supporta l'acquisto diretto e l'adesione alle criptovalute da parte degli utenti.
- **Vendita per valuta legale**: il tuo portafoglio supporta la vendita e prelievo degli utenti in valuta legale direttamente su carta o conto bancario.
- **Multifirma**: il tuo portafoglio supporta più firme per firmare una transazione.
- **Recupero sociale**: il tuo portafoglio supporta i tutori e un utente può recuperarlo se perde la propria frase seed, utilizzando tali tutori.
- **Team di supporto dedicato**: il tuo portafoglio ha un team di supporto dedicato a cui gli utenti possono rivolgersi quando si verificano problemi.
- **Risorse/documentazione didattiche**: il tuo prodotto dovrebbe avere un'esperienza di adesione ben progettata per aiutare a istruire gli utenti. In alternativa, dovrebbe offrire contenuti di supporto come articoli o video.

## Aggiungere un portafoglio {#adding-a-wallet}

Se desideri aggiungere un portafoglio a ethereum.org, crea un ticket su GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Crea un ticket
</ButtonLink>

## Manutenzione {#maintenance}

In linea con la natura fluida di Ethereum, team e prodotti vanno e vengono e l'innovazione avviene quotidianamente, quindi effettueremo controlli di routine dei nostri contenuti per:

- garantire che tutti i portafogli e le dApp elencati soddisfino ancora i nostri criteri
- verificare che non ci siano prodotti suggeriti che soddisfano più criteri rispetto a quelli attualmente elencati

ethereum.org è mantenuto dalla sua community open source e si affida ad essa per tenere aggiornato questo elenco. Se noti che delle informazioni sui portafogli elencati devono essere aggiornate, sei pregato di [aprire un ticket](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) o una [richiesta di pull](https://github.com/ethereum/ethereum-org-website/pulls)!


## Condizioni d'uso {#terms-of-use}

Sei anche pregato di fare riferimento ai [termini d'utilizzo](/terms-of-use/). Le informazioni su ethereum.org sono fornite esclusivamente a fini di informazione generale.
