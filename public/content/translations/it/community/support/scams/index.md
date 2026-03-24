---
title: Aiuto e segnalazione delle truffe
description: Cosa fare se sei stato truffato, come mettere al sicuro i tuoi asset rimanenti e dove segnalare le frodi.
lang: it
---

# Sono stato truffato o ho perso fondi {#scam-help}

Le truffe legate alle criptovalute prendono di mira persone di tutti i livelli di esperienza, inclusi i professionisti della finanza e della tecnologia. Non sei solo, ed essere qui è il primo passo giusto.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nessuno può annullare le transazioni sulla blockchain.** Se qualcuno ti contatta sostenendo di poter recuperare i tuoi fondi a pagamento, si tratta quasi certamente di una seconda truffa. Vedi le [truffe di recupero](#recovery-scams) di seguito.
</AlertDescription>
</AlertContent>
</Alert>

## Metti al sicuro i tuoi asset rimanenti {#secure-assets}

Se hai interagito con un truffatore o sospetti che il tuo portafoglio sia compromesso, segui immediatamente questi passaggi:

1. **Sposta i fondi rimanenti** in un nuovo portafoglio sicuro a cui il truffatore non ha accesso
2. **Revoca le approvazioni dei token.** I truffatori spesso ti ingannano facendoti approvare una spesa illimitata di token. Revocare queste autorizzazioni impedisce l'ulteriore svuotamento del tuo portafoglio
3. **Cambia le password** su qualsiasi account di exchange che potrebbe essere collegato
4. **Abilita l'autenticazione a due fattori (2FA)** su tutti gli account legati alle criptovalute

### Come revocare le approvazioni dei token {#revoke-approvals}

Quando interagisci con una dApp o un contratto intelligente, potresti avergli concesso l'autorizzazione a spendere i tuoi token. Se un truffatore ti ha ingannato facendoti approvare un contratto malevolo, può continuare a svuotare i tuoi token anche dopo la truffa iniziale.

Usa questi strumenti per controllare e revocare le approvazioni:

- [Revoke.cash](https://revoke.cash/): connetti il tuo portafoglio per vedere tutte le approvazioni attive e revocarle
- [Revokescout](https://revoke.blockscout.com/): controlla e revoca le approvazioni tramite Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): controlla e revoca le approvazioni tramite Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guida passo-passo: Come revocare l'accesso ai token
</DocLink>

## Segnala indirizzi e siti web truffaldini {#report}

Le segnalazioni aiutano ad avvisare gli altri utenti e possono assistere le indagini delle forze dell'ordine. Documenta tutto: hash delle transazioni, indirizzi dei portafogli, screenshot e qualsiasi comunicazione con il truffatore.

### Segnala un indirizzo truffaldino {#report-address}

- [Chainabuse](https://www.chainabuse.com/): database di segnalazione di truffe e frodi guidato dalla community. Invia segnalazioni e cerca indirizzi truffaldini noti
- [Etherscan report](https://info.etherscan.com/report-address/): segnala un indirizzo sull'esploratore di blocchi di Ethereum più utilizzato
- [CryptoScamDB](https://cryptoscamdb.org/): database open-source che traccia le truffe di criptovaluta

### Segnala un sito web o un account social truffaldino {#report-website}

- [PhishTank](https://phishtank.org/): invia e verifica gli URL di phishing
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): segnala i siti di phishing a Google in modo che vengano bloccati su Chrome e altri browser
- [Netcraft](https://report.netcraft.com/report/mistake): segnala siti web malevoli e fraudolenti
- Segnala direttamente sulla piattaforma social in cui si è verificata la truffa (Twitter/X, Discord, Telegram hanno tutti funzionalità di segnalazione)

### Segnala alle forze dell'ordine {#report-law-enforcement}

- **Stati Uniti:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Regno Unito:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Unione Europea:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Altri paesi:** sporgi denuncia alla polizia locale. La frode con criptovalute è un crimine nella maggior parte delle giurisdizioni

## Analizza cosa è successo {#analyze}

Capire dove sono finiti i tuoi fondi può aiutare con le segnalazioni e potrebbe supportare gli sforzi di recupero se i fondi finiscono su un exchange centralizzato.

- [Blockscout](https://eth.blockscout.com/): esploratore di blocchi open-source per cercare qualsiasi hash di transazione o indirizzo di portafoglio per vedere dove sono stati inviati i fondi
- [Etherscan](https://etherscan.io/): cerca qualsiasi hash di transazione o indirizzo di portafoglio per vedere dove sono stati inviati i fondi
- [Chainabuse lookup](https://www.chainabuse.com/): controlla se un indirizzo è già stato segnalato da altre vittime
- [MetaSleuth](https://metasleuth.io/) di BlockSec: strumento visivo di tracciamento delle transazioni che mappa i flussi di fondi

**Se i fondi sono stati inviati a un exchange centralizzato** (come Coinbase, Binance, Kraken), contatta immediatamente il loro team di supporto con i dettagli della transazione. Gli exchange a volte possono congelare gli account segnalati per frode.

## La dura verità {#hard-truth}

Poiché Ethereum è decentralizzato, nessuna autorità centrale può annullare le transazioni o recuperare i fondi rubati. Una volta che una transazione è confermata sulla blockchain, è definitiva.

Le segnalazioni sono comunque preziose. I report aiutano le forze dell'ordine a rintracciare le reti di frode organizzate e segnalare gli indirizzi su Chainabuse ed Etherscan avverte le future potenziali vittime.

## Tipi di truffe a cui prestare attenzione {#scam-types}

<ExpandableCard
title="Truffe di giveaway e airdrop"
contentPreview="Nessuno regala ETH gratis. Queste offerte sono sempre truffe."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

I truffatori creano finti giveaway promettendo di moltiplicare i tuoi ETH o di darti token gratuiti. Spesso si spacciano per figure note come Vitalik Buterin. Se invii ETH a un indirizzo di "giveaway", non riceverai nulla in cambio.

**Ricorda:** Vitalik e altre figure di spicco non ti chiederanno mai di inviare loro ETH.

[Maggiori informazioni sulle truffe comuni](/security/#common-scams)
</ExpandableCard>

<ExpandableCard
title="Furto d'identità e finto supporto"
contentPreview="Nessuno di Ethereum o ethereum.org ti contatterà mai per primo."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

I truffatori si spacciano per membri del team di Ethereum, moderatori o agenti di supporto su Discord, Telegram e sui social media. Potrebbero inviarti messaggi diretti offrendoti aiuto o sostenendo che c'è un problema con il tuo account.

**Ricorda:**

- Non esiste un "team di supporto di Ethereum"
- I veri moderatori non ti invieranno mai un messaggio diretto per primi
- Non condividere mai la tua frase di recupero o le tue chiavi private con nessuno, per nessun motivo
- Non cliccare mai sui link inviati in messaggi non richiesti
</ExpandableCard>

<ExpandableCard
title="Truffe di recupero"
contentPreview="Dopo essere stato truffato, fai attenzione ai finti 'esperti di recupero di criptovalute'."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Le truffe di recupero prendono di mira specificamente le persone che hanno già perso fondi. I truffatori monitorano i social media in cerca di persone che parlano di essere state truffate, quindi le contattano fingendosi "investigatori della blockchain" o "esperti di recupero di criptovalute".

Promettono di rintracciare e recuperare le tue criptovalute rubate in cambio di una commissione anticipata. Dopo aver pagato, scompaiono.

**Nessun servizio legittimo può annullare le transazioni sulla blockchain.** Chiunque prometta questo sta mentendo. Questa è una delle truffe successive più comuni.
</ExpandableCard>

<ExpandableCard
title="Siti web di phishing e app false"
contentPreview="I siti truffaldini imitano i veri portafogli e gli exchange per rubare le tue credenziali."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

I siti di phishing sembrano identici alle vere app di portafogli, agli exchange o alle piattaforme DeFi. Ti ingannano facendoti inserire la tua frase di recupero o connettere il tuo portafoglio, per poi svuotare i tuoi fondi.

**Proteggiti:**

- Verifica sempre l'URL prima di connettere il tuo portafoglio
- Aggiungi ai preferiti i siti ufficiali che usi regolarmente
- Non inserire mai la tua frase di recupero su nessun sito web. Le app legittime non la chiedono mai
- Usa [PhishTank](https://phishtank.org/) per controllare gli URL sospetti

<DocLink href="/guides/how-to-id-scam-tokens/">
  Come identificare i token truffaldini
</DocLink>
</ExpandableCard>

<DocLink href="/security/">
  Guida completa alla sicurezza di Ethereum e alla prevenzione delle truffe
</DocLink>