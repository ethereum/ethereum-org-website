---
title: Sicurezza di Ethereum e prevenzione delle truffe
description: Stai al sicuro su Ethereum
lang: it
---

# Sicurezza di Ethereum e prevenzione delle truffe {#introduction}

Con l'interesse per le criptovalute in crescita, imparare le migliori pratiche quando si usano le criptovalute è essenziale. Le criptovalute possono essere divertenti ed eccitanti, ma ci sono anche seri rischi. Se si esegue questa piccola quantità di lavoro iniziale, si possono mitigare questi rischi.

<Divider />

## Sicurezza web 101 {#web-security}

### Usa password forti {#use-strong-passwords}

[Oltre l'80% degli hack di account sono il risultato di password deboli o rubate](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una lunga combinazione di caratteri, numeri e simboli è la cosa migliore per mantenere sicuri gli account.

Un errore comune che le persone fanno è usare una combinazione di due o tre parole comuni e correlate tra loro. Le password di questo tipo sono insicure perché sono inclini a una semplice tecnica di hacking conosciuta come [attacco a dizionario](https://wikipedia.org/wiki/Dictionary_attack).

```md
Esempio di una password debole: CuteFluffyKittens!

Esempio di una password sicura: ymv\*azu.EAC8eyp8umf
```

Un altro errore comune è l'utilizzo di password che possono essere facilmente indovinate o trovate attraverso [l'ingegneria sociale](<https://wikipedia.org/wiki/Social_engineering_(security)>). Includere il nome da nubile di tua madre, i nomi dei tuoi figli o dei tuoi animali domestici, o le date di nascita nella tua password non è sicuro e aumenterà il rischio che la tua password venga violata.

#### Buone pratiche concernenti le password: {#good-password-practices}

- Crea password tanto lunghe quanto consentito dal generatore di password o dal modulo che stai compilando
- Usa una combinazione di caratteri maiuscoli, caratteri minuscoli, numeri e simboli
- Non utilizzare i dati personali, come i cognomi, nella password
- Evita parole troppo comuni

[Maggiori informazioni sulla creazione di password forti](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Usa password uniche per tutto {#use-unique-passwords}

Una password forte non fornisce tanta protezione se la password viene rivelata in una violazione di dati. Il sito web [Have I Been Pwned](https://haveibeenpwned.com) ti permette di verificare se i tuoi account sono stati coinvolti in una qualsiasi violazione di dati memorizzati nel loro database. Se sì, **dovresti cambiare immediatamente le password violate**. L'utilizzo di password uniche per ogni account riduce il rischio che gli hacker ottengano l'accesso a tutti i tuoi account quando una delle tue password è compromessa.

### Usa un gestore di password {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    L'utilizzo di un gestore di password consente di creare password forti e uniche e di ricordarle. <strong>Consigliamo vivamente</strong> di utilizzarne uno, molti di essi sono gratuiti.
  </div>
</InfoBanner>

Ricordare password forti e uniche per ogni account non è l'ideale. Un gestore di password offre un deposito sicuro e criptato per tutte le tue password a cui puoi accedere attraverso una password principale forte. Suggeriscono inoltre password forti quando ci si iscrive a un nuovo servizio, in modo da non doverne creare una propria. Molti gestori di password dicono anche se si è subita una violazione dei dati, permettendo di cambiare le password prima di qualsiasi attacco malevolo.

![Esempio di utilizzo di un gestore di password](./passwordManager.png)

#### Prova un gestore di password: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Usa l'autenticazione a due fattori {#two-factor-authentication}

Per provare che sei veramente tu, ci sono diverse prove uniche che possono essere utilizzate per l'autenticazione. Questi sono noti come **fattori** e i tre fattori principali sono:

- Qualcosa che conosci (come una password o una domanda di sicurezza)
- Qualcosa di te che sia univoco (come una impronta digitale o uno scanner iride/facciale)
- Qualcosa che possiedi (una chiave di sicurezza o un'app di autenticazione sul tuo telefono)

L'utilizzo dell'**autenticazione a due fattori (2FA)** fornisce un ulteriore _fattore di sicurezza_ per i tuoi account online in modo che la sola conoscenza della tua password (qualcosa che conosci) non sia sufficiente per accedere a un account. Più comunemente, il secondo fattore è un codice casuale di 6 cifre, noto come **password monouso a tempo (TOTP)**, a cui si può accedere attraverso un'app di autenticazione come Google Authenticator o Authy. Esse funzionano come fattore "qualcosa che possiedi" perché il seme che genera il codice a tempo è memorizzato sul tuo dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: L'utilizzo di SMS basati sul protocollo 2FA è suscettibile di 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM jacking
    </a>
     e non è sicuro. Per una migliore sicurezza, utilizzare servizi come{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
     o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Chiavi di sicurezza {#security-keys}

Per coloro che vogliono fare il passo successivo in 2FA, prendere in considerazione l'uso di una chiave di sicurezza. Le chiavi di sicurezza sono dispositivi fisici di autenticazione hardware che funzionano allo stesso modo delle app di autenticazione. Utilizzare una chiave di sicurezza è il modo più sicuro per la 2FA. Molte di queste chiavi utilizzano lo standard FIDO Universal 2nd Factor (U2F). [Scopri di più su FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Guarda altro sulla 2FA (autenticazione a due fattori):

<YouTube id="m8jlnZuV1i4" start="3479" />

### Disinstalla le estensioni del browser {#uninstall-browser-extensions}

Le estensioni del browser come quelle di Chrome o i componenti aggiuntivi di Firefox possono aumentare le funzionalità utili del browser e migliorare l'esperienza utente, ma comportano dei rischi. Per impostazione predefinita, la maggior parte delle estensioni del browser chiede l'accesso a "leggere e modificare i dati del sito", consentendo loro di fare quasi qualsiasi cosa con i tuoi dati. Le estensioni di Chrome sono sempre aggiornate automaticamente, quindi un'estensione precedentemente sicura potrebbe aggiornarsi in seguito per includere codice dannoso. La maggior parte delle estensioni del browser non cerca di rubare i dati, tuttavia è necessario essere consapevoli che potrebbero farlo.

#### Proteggersi nel modo seguente: {#browser-extension-safety}

- Installare solo le estensioni del browser da fonti attendibili
- Rimuovere le estensioni del browser inutilizzate
- Installare le estensioni di Chrome localmente per interrompere l'aggiornamento automatico (avanzato)

[Maggiori informazioni sui rischi delle estensioni del browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Sicurezza criptovalute 101 {#crypto-security}

### Aumenta il livello delle tue conoscenze {#level-up-your-knowledge}

Uno dei principali motivi per cui la gente viene truffata con le criptovalute in generale è la mancanza di comprensione. Ad esempio, se non comprendi che la rete Ethereum è decentralizzata e di proprietà di nessuno, allora è facile cadere preda di qualcuno che finge di essere un agente del servizio clienti e ti promette di restituirti l'ETH perso in cambio delle tue chiavi private. Apprendere come funziona Ethereum è un investimento utile.

<DocLink to="/what-is-ethereum/">
  Cos'è Ethereum?
</DocLink>

<DocLink to="/eth/">
  Cos'è un ether?
</DocLink>
<Divider />

## Sicurezza del portafoglio {#wallet-security}

### Non svelare le tue chiavi private {#protect-private-keys}

**Non condividere mai, per nessuna ragione al mondo, le tue chiavi private!**

La chiave privata del tuo portafoglio funge da password per il tuo portafoglio Ethereum. È l'unica cosa che impedisce a qualcuno che conosce l'indirizzo del tuo portafoglio di prosciugare il tuo conto di tutti i suoi attivi!

<DocLink to="/wallets/">
  Cos'è un portafoglio Ethereum?
</DocLink>

#### Non fare screenshot delle tue frasi seed/chiavi private {#screenshot-private-keys}

Con lo screenshot delle tue frasi seed o delle chiavi private, rischi di sincronizzarle sul cloud e di renderle potenzialmente accessibili agli hacker. Ottenere chiavi private dal cloud è un metodo di attacco comune per gli hacker.

### Usa un portafoglio hardware {#use-hardware-wallet}

Un portafoglio hardware fornisce spazio offline per le chiavi private. Sono considerati l'opzione di portafoglio più sicura per memorizzare le chiavi private.

Mantenere le chiavi private offline riduce massicciamente il rischio di essere violati, anche se un hacker ottiene il controllo del computer.

#### Prova un portafoglio hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Controlla le transazioni prima dell'invio {#double-check-transactions}

L'invio accidentale di criptovalute all'indirizzo del portafoglio sbagliato è un errore comune. **Una transazione inviata su Ethereum è irreversibile.** A meno che tu non conosca il proprietario dell'indirizzo e possa convincerlo a rimandarti i tuoi fondi non ci sarà modo per te di recuperarli.

Assicurati sempre che l'indirizzo a cui stai inviando corrisponda esattamente all'indirizzo del destinatario desiderato prima di inviare una transazione. Quando si interagisce con uno smart contract, si raccomanda anche di leggere il messaggio della transazione prima di firmare.

### Impostare i limiti di spesa degli smart contract {#spend-limits}

Quando si interagisce con gli smart contract, non permettere limiti di spesa illimitati. Una spesa illimitata potrebbe consentire allo smart contract di prosciugare il tuo portafoglio. Invece, fissa dei limiti di spesa solo all'importo necessario per la transazione.

Molti portafogli Ethereum offrono una protezione dei limiti per salvaguardare l'utente dal prosciugamento dei conti.

[Esplora portafogli con protezione dei limiti](/wallets/find-wallet/?filters=has_limits_protection)

<Divider />

## Truffe comuni {#common-scams}

I truffatori sono sempre alla ricerca di modi per toglierti i fondi. È impossibile fermare completamente i truffatori, ma possiamo renderli meno efficaci essendo consapevoli delle tecniche più utilizzate. Ci sono molte varianti di queste truffe, ma generalmente seguono gli stessi schemi di alto livello. Se non altro, ricorda:

- sii sempre scettico/a
- nessuno ti darà ETH gratis o scontati!
- nessuno ha bisogno di accedere alle tue chiavi private o ai tuoi dati personali

### Truffa del giveaway {#giveaway}

Una delle truffe più comuni in criptovaluta è la truffa del giveaway. La truffa del giveaway può assumere molte forme, ma la premessa generale è che se invii ETH all'indirizzo del portafoglio fornito, riceverai indietro il tuo ETH ma raddoppiato. *Per questa ragione è conosciuta anche come la truffa del 2 per 1.*

Queste truffe di solito prevedono un periodo limitato di opportunità per rivendicare il giveaway incoraggiando un processo decisionale scadente e creando un senso di falsa urgenza.

#### Hack dei social media {#social-media-hacks}

Nel luglio del 2020 si è verificata una situazione del genere di alto profilo: sono stati violati gli account Twitter di celebrità e organizzazioni di spicco. L'hacker ha pubblicato simultaneamente un giveaway di Bitcoin sugli account violati. Sebbene i tweet ingannevoli siano stati rapidamente notati ed eliminati, gli hacker sono riusciti comunque a farla franca guadagnando 11 bitcoin (ovvero 500.000 dollari a settembre 2021)

![Una truffa su Twitter](./appleTwitterScam.png)

#### Dono di celebrità {#celebrity-giveaway}

Il giveaway di celebrità è un altro dei più comuni tipi di truffa del giveaway. I truffatori, utilizzando un'intervista video registrata o una conferenza di una celebrità, la trasmettono in streaming live su YouTube, facendo credere che la celebrità in questione stia promuovendo in diretta un giveaway di criptovalute.

Vitalik Buterin è la celebrità più sfruttata per questa truffa, ma vengono usate anche molte altre persone importanti coinvolte nelle criptovalute (ad esempio Elon Musk o Charles Hoskinson). L'inclusione di una persona nota dà allo streaming live dei truffatori un senso di legittimità (sembra strano, ma se ne parla Vitalik, dovrebbe essere tutto ok).

**I giveaway sono sempre truffe. Se invii i fondi a questi conti, li perderai per sempre.**

![Una truffa su YouTube](./youtubeScam.png)

### Truffe del finto addetto al supporto {#support-scams}

Le criptovalute sono una tecnologia relativamente giovane e incompresa. Una truffa comune che sfrutta tale caratteristica è quella dei finti addetti al supporto: i truffatori fingono di essere addetti al supporto di portafogli, piattaforme di scambio o blockchain popolari.

Gran parte delle discussioni su Ethereum avviene su Discord. I finti addetti al supporto tecnico cercano di solito la propria vittima tra gli utenti che hanno inviato domande al supporto nei canali Discord pubblici e poi inviano a tali utenti un messaggio privato offrendo assistenza. Costruendo la fiducia, i finti addetti al supporto cercano di indurti a rivelare le tue chiavi private o a inviare i tuoi fondi ai loro portafogli.

![La truffa di un finto addetto al supporto su Discord](./discordScam.png)

Come regola generale, il personale non comunicherà mai con te attraverso canali privati e non ufficiali. Alcune semplici cose da tenere a mente quando si tratta di supporto:

- Non condividere mai le chiavi private, le frasi seed o le password
- Non consentire a nessuno l'accesso remoto al tuo computer
- Non comunicare mai al di fuori dei canali designati dall'organizzazione

<InfoBanner emoji=":lock:">
  <div>
    Attenzione: anche se le truffe di questo tipo avvengono comunemente su Discord, possono anche essere prevalenti su qualsiasi applicazione di chat dove si discute di criptovalute, comprese le e-mail.
  </div>
</InfoBanner>

### Truffe di tipo phishing {#phishing-scams}

Le truffe di tipo phishing sono un altro metodo sempre più comune che i truffatori usano per tentare di rubare i fondi dal tuo portafoglio.

Alcune e-mail di phishing chiedono agli utenti di cliccare su link che li reindirizzano a siti web falsi, chiedendo loro di inserire la loro frase seed, reimpostare la password o inviare ETH. Altri possono chiederti di installare inconsapevolmente un malware per infettare il tuo computer e dare ai truffatori l'accesso ai file del tuo computer.

Se ricevi un'email da un mittente sconosciuto, ricorda:

- Non aprire mai un link o un allegato da indirizzi e-mail che non riconosci
- Non divulgare mai le tue informazioni personali o password a nessuno
- Elimina le e-mail da mittenti sconosciuti

[Altro su come evitare truffe di tipo phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Intermediari-truffatori di scambi di criptovalute {#broker-scams}

Gli intermediari-truffatori di scambi di criptovalute affermano di essere intermediari di criptovalute specializzati che si offrono di prendere i tuoi soldi e investirli per tuo conto. Questa offerta è di solito accompagnata da promesse di rendimenti irrealistici. Dopo che il truffatore ha ricevuto i tuoi fondi, può indurti a inviarne altri, in modo che tu non perda ulteriori guadagni dall'investimento, o può scomparire del tutto.

Questi intermediari fraudolenti trovano le loro vittime utilizzando account falsi su YouTube per iniziare conversazioni apparentemente naturali sull'intermediario. Queste conversazioni spesso hanno un alto numero di like per aumentarne la legittimità, ma i voti positivi provengono tutti da account bot.

**In Internet non fidarti degli sconosciuti che vogliono investire a tuo nome. Perderai la tua criptovaluta.**

![La truffa di un intermediario di scambi su YouTube](./brokerScam.png)

### Le truffe dei gruppi di "minatori" di criptovalute {#mining-pool-scams}

Le truffe dei gruppi di "minatori" sono perpetrate da persone che ti contattano senza essere sollecitati affermando che puoi ottenere grandi guadagni unendoti a un gruppo di "minatori" su Ethereum. Il truffatore farà le sue affermazioni e rimarrà in contatto con te per tutto il tempo necessario. Essenzialmente, il truffatore cercherà di convincerti che se ti unisci a un gruppo di "minatori" su Ethereum, la tua criptovaluta sarà usata per creare ETH e ti saranno pagati i dividendi sotto forma di ETH. All'inizio noterai solo che la tua criptovaluta avrà scarsi rendimenti. Questo semplicemente per invogliarti a investire di più. Alla fine, tutti i tuoi fondi saranno inviati a un indirizzo sconosciuto e il truffatore scomparirà o addirittura, come è accaduto in un caso recente, continuerà a rimanere in contatto.

In conclusione, diffida delle persone che ti contattano sui social media chiedendoti di far parte di un gruppo di "minatori". Una volta persa la tua criptovaluta è andata.

Alcune cose da ricordare:

- Diffida di chiunque ti contatti proponendoti modi per guadagnare con la tua criptovaluta
- Fai la tua ricerca su staking, gruppi di liquidità, o altri modi di investire le tue criptovalute
- Raramente, se non mai, tali sistemi sono legittimi. Se lo fossero, probabilmente sarebbero mainstream e ne avresti sentito parlare.

[Un uomo ha perso 200.000 dollari a causa della truffa di un gruppo di "minatori"](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Truffa del token "Eth2" {#eth2-token-scam}

Con [la fusione](/upgrades/merge/) in arrivo nel 2022, i truffatori hanno approfittato della confusione intorno al termine "Eth2" per provare a convincere gli utenti a riscattare i loro ETH per un token "ETH2". Non esiste alcun "ETH2" o alcun altro nuovo token introdotto dalla fusione. L'ETH che possiedi oggi continuerà a essere lo stesso ETH dopo la fusione e non serve effettuare alcuno scambio del tuo ETH per la fusione.

I truffatori potrebbero apparire sotto forma di "supporto", dicendoti che se depositi i tuoi ETH, riceverai degli "ETH2" in cambio. Non esiste alcun [supporto ufficiale di Ethereum](/community/support/) e non esiste alcun nuovo token. Non condividere mai la frase di seed del tuo portafoglio con nessuno.

### Truffe airdrop {#airdrop-scams}

Le truffe airdrop riguardano un progetto fraudolento di airdropping di un attivo (NFT, token) nel tuo portafoglio con il rimando a un sito web fraudolento per rivendicare l'attivo in questione. Ti sarà richiesto di accedere con il tuo portafoglio di Ethereum e di "approvare" una transazione tentando di reclamare. Questa transazione compromette il tuo conto inviando le tue chiavi pubblica e privata al truffatore. Una forma alternativa di questa truffa potrebbe chiederti di confermare una transazione che invia fondi al conto del truffatore.

[Di più sulle truffe di airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Letture consigliate {#further-reading}

### Sicurezza web {#reading-web-security}

- [Questo è il motivo per cui non dovresti usare testi per l'autenticazione a due fattori](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Fino a 3 milioni di dispositivi infettati da componenti aggiuntivi Chrome e Edge lacciati da malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Come creare una password forte — che non dimentichi](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Cos'è una chiave di sicurezza?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Crypto security {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) _Aggiornato frequentemente - MyCrypto_
- [4 modi per salvaguardare le criptovalute](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/)-_CoinDesk_
- [Guida alla sicurezza per principianti e anche per esperti](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4)-_Andreas M. Antonopoulos_

### Educazione alle truffe {#reading-scam-education}

- [Staying Safe: Common Scams](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Avoiding Scams](https://bitcoin.org/en/scams) _Bitcoin.org_
