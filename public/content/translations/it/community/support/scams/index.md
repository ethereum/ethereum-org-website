---
title: Sono stato truffato o ho perso dei fondi
metaTitle: Aiuto e segnalazione truffe
description: Cosa fare se sei stato truffato, come mettere al sicuro i tuoi asset rimanenti e dove segnalare le frodi.
lang: it
---

Le truffe legate alle criptovalute colpiscono persone di tutti i livelli di esperienza, inclusi i professionisti della finanza e della tecnologia. Non sei solo, ed essere qui è il primo passo giusto.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nessuno può annullare le transazioni sulla blockchain.** Se qualcuno ti contatta sostenendo di poter recuperare i tuoi fondi a pagamento, si tratta quasi certamente di una seconda truffa. Vedi le [truffe di recupero](#scam-types) di seguito.

</AlertDescription>
</AlertContent>
</Alert>

## Metti al sicuro i tuoi asset rimanenti {#secure-assets}

Se hai interagito con un truffatore o sospetti che il tuo portafoglio sia compromesso, segui immediatamente questi passaggi:

1. **Sposta i fondi rimanenti** in un nuovo portafoglio sicuro a cui il truffatore non ha accesso
2. **Revoca le approvazioni dei token.** I truffatori spesso ti ingannano facendoti approvare una spesa illimitata di token. Revocare queste autorizzazioni impedisce l'ulteriore svuotamento del tuo portafoglio
3. **Cambia le password** di tutti gli account degli exchange che potrebbero essere collegati
4. **Abilita l'autenticazione a due fattori (2FA)** su tutti gli account legati alle cripto

### Come revocare le approvazioni dei token {#revoke-approvals}

Quando interagisci con un'applicazione decentralizzata (dapp) o uno smart contract, potresti avergli concesso l'autorizzazione a spendere i tuoi token. Se un truffatore ti ha ingannato facendoti approvare un contratto malevolo, può continuare a svuotare i tuoi token anche dopo la truffa iniziale.

Usa questi strumenti per controllare e revocare le approvazioni:

- [Revoke.cash](https://revoke.cash/): connetti il tuo portafoglio per vedere tutte le approvazioni attive e revocarle
- [Revokescout](https://revoke.blockscout.com/): controlla e revoca le approvazioni tramite Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): controlla e revoca le approvazioni tramite Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guida passo passo: Come revocare l'accesso ai token
</DocLink>

## Segnala indirizzi e siti web truffaldini {#report}

Le segnalazioni aiutano ad avvisare gli altri utenti e possono assistere le indagini delle forze dell'ordine. Documenta tutto: hash delle transazioni, indirizzi del portafoglio, screenshot e qualsiasi comunicazione con il truffatore.

### Segnala un indirizzo truffaldino {#report-address}

- [Chainabuse](https://www.chainabuse.com/): database di segnalazione di truffe e frodi guidato dalla community. Invia segnalazioni e cerca indirizzi truffaldini noti
- [Segnalazione su Etherscan](https://info.etherscan.com/report-address/): segnala un indirizzo sul block explorer di Ethereum più utilizzato
- [CryptoScamDB](https://cryptoscamdb.org/): database open-source che traccia le truffe legate alle criptovalute

### Segnala un sito web o un account social truffaldino {#report-website}

- [PhishTank](https://phishtank.org/): invia e verifica gli URL di phishing
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): segnala i siti di phishing a Google in modo che vengano bloccati su Chrome e altri browser
- [Netcraft](https://report.netcraft.com/report/mistake): segnala siti web malevoli e fraudolenti
- Segnala direttamente sulla piattaforma social in cui è avvenuta la truffa (Twitter/X, Discord e Telegram hanno tutti funzioni di segnalazione)

### Segnala alle forze dell'ordine {#report-law-enforcement}

- **Stati Uniti:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Regno Unito:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Unione Europea:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Altri paesi:** sporgi denuncia presso la polizia locale. Le frodi con criptovalute sono un reato nella maggior parte delle giurisdizioni

## Analizza l'accaduto {#analyze}

Capire dove sono finiti i tuoi fondi può aiutare con le segnalazioni e potrebbe supportare gli sforzi di recupero se i fondi finiscono su un exchange centralizzato.

- [Blockscout](https://eth.blockscout.com/): block explorer open-source per cercare qualsiasi hash della transazione o indirizzo del portafoglio per vedere dove sono stati inviati i fondi
- [Etherscan](https://etherscan.io/): cerca qualsiasi hash della transazione o indirizzo del portafoglio per vedere dove sono stati inviati i fondi
- [Ricerca su Chainabuse](https://www.chainabuse.com/): controlla se un indirizzo è già stato segnalato da altre vittime
- [MetaSleuth](https://metasleuth.io/) di BlockSec: strumento visivo di tracciamento delle transazioni che mappa i flussi di fondi

**Se i fondi sono stati inviati a un exchange centralizzato** (come Coinbase, Binance, Kraken), contatta immediatamente il loro team di supporto con i dettagli della transazione. A volte gli exchange possono congelare gli account segnalati per frode.

## La dura verità {#hard-truth}

Poiché Ethereum è decentralizzato, nessuna autorità centrale può annullare le transazioni o recuperare i fondi rubati. Una volta che una transazione è confermata sulla blockchain, è definitiva.

Segnalare è comunque utile. Le segnalazioni aiutano le forze dell'ordine a rintracciare le reti di frode organizzate e segnalare gli indirizzi su Chainabuse ed Etherscan avverte le future potenziali vittime.

## Tipi di truffe a cui prestare attenzione {#scam-types}

<ExpandableCard
title="Truffe di giveaway e airdrop"
contentPreview="Nessuno regala ETH. Queste offerte sono sempre truffe."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

I truffatori creano finti giveaway promettendo di moltiplicare i tuoi ETH o di darti token gratuiti. Spesso si spacciano per figure note come Vitalik Buterin. Se invii ETH a un indirizzo di "giveaway", non riceverai nulla in cambio.

**Ricorda:** Vitalik e altre figure di spicco non ti chiederanno mai di inviare loro degli ETH.

[Maggiori informazioni sulle truffe comuni](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Furto d'identità e finta assistenza"
contentPreview="Nessuno di Ethereum o ethereum.org ti contatterà mai per primo."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

I truffatori si spacciano per membri del team di Ethereum, moderatori o agenti di supporto su Discord, Telegram e sui social media. Potrebbero inviarti messaggi diretti offrendoti aiuto o sostenendo che c'è un problema con il tuo account.

**Ricorda:**

- Non esiste alcun "team di supporto di Ethereum"
- I veri moderatori non ti invieranno mai un messaggio diretto per primi
- Non condividere mai la tua frase seme o le tue chiavi private con nessuno, per nessun motivo
- Non cliccare mai sui link inviati in messaggi non richiesti

</ExpandableCard>

<ExpandableCard
title="Truffe di recupero"
contentPreview="Dopo aver subito una truffa, fai attenzione ai finti &quot;esperti di recupero cripto&quot;."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Le truffe di recupero prendono di mira specificamente le persone che hanno già perso dei fondi. I truffatori monitorano i social media in cerca di persone che parlano di essere state truffate, per poi contattarle spacciandosi per "investigatori della blockchain" o "esperti di recupero cripto".

Promettono di rintracciare e recuperare le tue cripto rubate in cambio di una commissione anticipata. Dopo aver pagato, scompaiono.

**Nessun servizio legittimo può annullare le transazioni sulla blockchain.** Chiunque prometta questo sta mentendo. Questa è una delle truffe successive più comuni.

</ExpandableCard>

<ExpandableCard
title="Siti web di phishing e app false"
contentPreview="I siti truffa imitano portafogli ed exchange reali per rubare le tue credenziali."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

I siti di phishing sembrano identici alle vere app di portafoglio, agli exchange o alle piattaforme di finanza decentralizzata (DeFi). Ti ingannano facendoti inserire la tua frase seme o connettere il tuo portafoglio, per poi svuotare i tuoi fondi.

**Proteggiti:**

- Verifica sempre l'URL prima di connettere il tuo portafoglio
- Aggiungi ai preferiti i siti ufficiali che usi regolarmente
- Non inserire mai la tua frase seme su nessun sito web. Le app legittime non la chiedono mai
- Usa [PhishTank](https://phishtank.org/) per controllare gli URL sospetti

<DocLink href="/guides/how-to-id-scam-tokens/">
  Come identificare i token truffaldini
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Guida completa alla sicurezza di Ethereum e alla prevenzione delle truffe
</DocLink>
