---
title: Sicurezza di Ethereum e prevenzione delle truffe
description: Stai al sicuro su Ethereum
lang: it
---

# Sicurezza di Ethereum e prevenzione delle truffe {#introduction}

Il crescente interesse per le criptovalute comporta un maggiore rischio di esporsi a truffatori e hacker. Questo articolo delinea alcune delle migliori pratiche per mitigare tali rischi.

**Ricorda: nessuno ti contatterà mai da ethereum.org. Non rispondere alle email che dichiarano di provenire dal supporto ufficiale di Ethereum.**

<Divider />

## Sicurezza criptovalute 101 {#crypto-security}

### Aumenta il livello delle tue conoscenze {#level-up-your-knowledge}

Le incomprensioni sul funzionamento delle criptovalute possono comportare costosi errori. Ad esempio, se qualcuno finge di essere l'agente di un servizio clienti in grado di rimborsare gli ETH perduti in cambio delle tue chiavi private, si sta approfittando delle persone che non comprendono che Ethereum è una rete decentralizzata priva di questo tipo di funzionalità. Apprendere come funziona Ethereum è un investimento utile.

<DocLink href="/what-is-ethereum/">
  Cos'è Ethereum?
</DocLink>

<DocLink href="/eth/">
  Cos'è un ether?
</DocLink>
<Divider />

## Sicurezza del portafoglio {#wallet-security}

### Non svelare le tue chiavi private {#protect-private-keys}

**Non condividere mai, per nessuna ragione al mondo, le tue chiavi private!**

La chiave privata del tuo portafoglio è una password per il tuo portafoglio di Ethereum. È l'unica cosa che impedisce a qualcuno che conosce l'indirizzo del tuo portafoglio di prosciugare il tuo conto di tutti i suoi attivi!

<DocLink href="/wallets/">
  Cos'è un portafoglio Ethereum?
</DocLink>

#### Non fare screenshot delle tue frasi seed/chiavi private {#screenshot-private-keys}

Uno screenshot delle tue frasi seed o chiavi private potrebbe sincronizzarle con un provider di dati in cloud, rendendole potenzialmente accessibili da parte degli hacker. Ottenere chiavi private dal cloud è un vettore di attacco comune per gli hacker.

### Usa un portafoglio hardware {#use-hardware-wallet}

Un portafoglio hardware fornisce spazio offline per le chiavi private. Sono considerati l'opzione del portafoglio più sicura per memorizzare le chiavi private: la chiave privata non tocca mai Internet e rimane completamente locale sul tuo dispositivo.

Mantenere le chiavi private offline riduce massicciamente il rischio di essere violati, anche se un hacker ottiene il controllo del computer.

#### Prova un portafoglio hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Controlla le transazioni prima dell'invio {#double-check-transactions}

L'invio accidentale di criptovalute all'indirizzo del portafoglio sbagliato è un errore comune. **Una transazione inviata su Ethereum è irreversibile.** A meno che tu non conosca il proprietario dell'indirizzo e possa convincerlo a rimandarti i tuoi fondi, non potrai recuperarli.

Assicurati sempre che l'indirizzo a cui stai inviando corrisponda esattamente all'indirizzo del destinatario desiderato prima di inviare una transazione. È una buona pratica, interagendo con un contratto intelligente, leggere il messaggio della transazione prima di firmare.

### Impostare i limiti di spesa del contratto intelligente {#spend-limits}

Interagendo con i contratti intelligenti, non consentire limiti di spesa illimitati. Una spesa illimitata potrebbe consentire al contratto intelligente di prosciugare il tuo portafoglio. Invece, fissa dei limiti di spesa solo all'importo necessario per la transazione.

Molti portafogli di Ethereum offrono una protezione dei limiti per salvaguardarti dal prosciugamento dei conti.

[Come revocare l'accesso dei contratti intelligenti ai tuoi fondi di criptovalute](/guides/how-to-revoke-token-access/)

<Divider />

## Truffe comuni {#common-scams}

È impossibile fermare completamente i truffatori, ma possiamo renderli meno efficienti prendendo coscienza delle tecniche da loro più utilizzate. Esistono molte varianti di queste truffe, ma generalmente seguono gli stessi schemi generali. Se non altro, è bene ricordare:

- sii sempre scettico/a
- nessuno ti darà ETH gratis o scontati
- nessuno ha bisogno di accedere alle tue chiavi private o ai tuoi dati personali

### Phishing pubblicitario di Twitter {#ad-phishing}

![Link di phishing di Twitter](./twitterPhishingScam.png)

Esiste un metodo per lo spoofing della funzionalità di anteprima (dispiegamento) dei link di Twitter (anche noto come X), per ingannare gli utenti nel pensare che stiano visitando un sito web legittimo. Questa tecnica sfrutta il meccanismo di Twitter per generare le anteprime degli URL condivisi nei tweet, mostrando ad esempio _da ethereum.org_ (mostrato sopra), quando in realtà si sta venendo reindirizzati a un sito dannoso.

Verifica sempre di trovarti sul giusto dominio, specialmente dopo aver cliccato un link.

[Ulteriori informazioni qui](https://harrydenley.com/faking-twitter-unfurling).

### Truffa del giveaway {#giveaway}

Una delle truffe più comuni in criptovaluta è la truffa del giveaway. La truffa del giveaway può assumere molte forme, ma l'idea generale è che se invii ETH all'indirizzo del portafoglio fornito, riceverai il doppio degli ETH trasferiti. *Per questa ragione è conosciuta anche come la truffa del 2 per 1.*

Queste truffe di solito prevedono un periodo limitato di opportunità per richiedere l'omaggio in modo da creare un falso senso di urgenza.

### Hack dei social media {#social-media-hacks}

A luglio 2020 si è verificata una simile versione di alto profilo, quando sono stati violati i profili di Twitter di celebrità e organizzazioni importanti. L'hacker ha pubblicato simultaneamente un giveaway di Bitcoin sui conti violati. Sebbene i tweet ingannevoli siano stati rapidamente notati ed eliminati, gli hacker sono comunque riusciti a farla franca con un'estorsione del valore di 11 bitcoin (o $500.000 a settembre 2021).

![Una truffa su Twitter](./appleTwitterScam.png)

### Dono di celebrità {#celebrity-giveaway}

Il giveaway di celebrità è un altro dei più comuni tipi di truffa del giveaway. I truffatori, utilizzando un'intervista video registrata o la conferenza di una celebrità, la trasmettono in streaming live su YouTube, facendo credere che la celebrità in questione stia promuovendo in diretta un giveaway di criptovalute.

Vitalik Buterin è la celebrità più sfruttata per questa truffa, ma vengono usate anche molte altre persone importanti coinvolte nelle criptovalute (ad esempio Elon Musk o Charles Hoskinson). L'inclusione di una persona nota dà allo streaming live dei truffatori un senso di legittimità (sembra strano, ma se ne parla Vitalik, dovrebbe essere tutto ok).

**I giveaway sono sempre truffe. Se invii i fondi a questi conti, li perderai per sempre.**

![Una truffa su YouTube](./youtubeScam.png)

### Truffe del finto addetto al supporto {#support-scams}

Le criptovalute sono una tecnologia relativamente giovane e incompresa. Una truffa comune che sfrutta tale caratteristica è quella dei finti operatori del servizio clienti: i truffatori fingono di essere operatori del servizio clienti per portafogli, piattaforme di scambio o blockchain popolari.

Gran parte delle discussioni su Ethereum avviene su Discord. I finti addetti al supporto tecnico cercano di solito la propria vittima tra gli utenti che hanno inviato domande al supporto nei canali Discord pubblici e poi inviano a tali utenti un messaggio privato offrendo assistenza. Costruendo la fiducia, i finti addetti al supporto cercano di indurti a rivelare le tue chiavi private o a inviare i tuoi fondi ai loro portafogli.

![La truffa di un finto addetto al supporto su Discord](./discordScam.png)

Come regola generale, il personale non comunicherà mai con te attraverso canali privati e non ufficiali. Alcune semplici cose da tenere a mente quando si tratta di supporto:

- Non condividere mai le chiavi private, le frasi seed o le password
- Non consentire a nessuno l'accesso remoto al tuo computer
- Non comunicare mai al di fuori dai canali designati dall'organizzazione

<InfoBanner emoji=":lock:">
  <div>
    Attenzione: anche se le truffe di questo tipo avvengono comunemente su Discord, possono anche essere prevalenti su qualsiasi applicazione di chat dove si discute di criptovalute, comprese le e-mail.
  </div>
</InfoBanner>

### Truffa del token "Eth2" {#eth2-token-scam}

Nella corsa alla [Fusione](/roadmap/merge/), i truffatori hanno approfittato della confusione sul termine 'Eth2' per provare a convincere gli utenti a riscattare i propri ETH per un token 'ETH2'. Non esiste alcun 'ETH2' e non è stato introdotto alcun altro token legittimo con La Fusione. Gli ETH che possedevi prima de La Fusione, sono gli stessi ETH adesso. **Non serve intraprendere alcuna azione correlata ai tuoi ETH per tenere conto del passaggio dal proof-of-work al proof-of-stake**.

I truffatori potrebbero apparire sotto forma di "supporto", dicendoti che se depositi i tuoi ETH, riceverai degli 'ETH2' in cambio. Non esiste alcun [supporto ufficiale di Ethereum](/community/support/) e non esiste alcun nuovo token. Non condividere mai la frase di seed del tuo portafoglio con nessuno.

_Nota: esistono token/ticker derivativi che potrebbero rappresentare ETH in staking (cioè rETH da Rocket Pool, stETH da Lido, ETH2 da Coinbase), ma non dovresti "migrare” verso di essi._

### Truffe di phishing {#phishing-scams}

Le truffe di phishing sono un altro metodo sempre più comune che i truffatori utilizzeranno, per tentare di rubare i fondi del tuo portafoglio.

Alcune e-mail di phishing chiedono agli utenti di cliccare su link che li reindirizzeranno a siti web falsi, chiedendo loro di inserire la loro frase di seed, ripristinare la loro password o di inviare ETH. Altri potrebbero chiederti di installare inconsapevolmente un malware, per infettarti il computer e dare accesso ai file del tuo computer ai truffatori.

Se ricevi un'e-mail da un mittente sconosciuto, ricorda:

- Non aprire mai un link o un allegato da indirizzi e-mail che non riconosci
- Non divulgare mai le tue informazioni personali o password a nessuno
- Elimina le e-mail da mittenti sconosciuti

[Di più su come evitare le truffe di phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Truffe dei broker di trading di criptovalute {#broker-scams}

I broker di trading di criptovalute affermano di essere intermediari di criptovalute specializzati che si offrono di prendere i tuoi soldi e investirli per tuo conto. Dopo che il truffatore riceve i tuoi fondi, può indurti a inviarne altri, così che tu non perda ulteriori guadagni dall'investimento, o potrebbe scomparire del tutto.

Questi truffatori trovano spesso i propri bersagli utilizzando dei profili YouTube falsi per avviare conversazioni apparentemente naturali sul 'broker'. Queste conversazioni, spesso, sono molto votate positivamente, per aumentarne la legittimità, sebbene i voti positivi provengano tutti da bot.

**Non fidarti degli sconosciuti su Internet che vogliono investire per tuo conto. Perderai le tue criptovalute.**

![Una truffa del broker di trading su YouTube](./brokerScam.png)

### Truffe dei pool di mining di criptovalute {#mining-pool-scams}

Da settembre 2022, il mining su Ethereum non è più possibile. Tuttavia, le truffe dei pool di mining continuano a esistere. Le truffe dei pool di mining coinvolgono persone che ti contattano di propria iniziativa e che affermano che potrai ricevere grandi introiti unendoti a un pool di mining di Ethereum. Il truffatore farà affermazioni e rimarrà in contatto con te per tutto il tempo necessario. Essenzialmente, il truffatore proverà a convincerti che unendoti a un pool di mining di Ethereum la tua criptovaluta sarà utilizzata per creare ETH, e che sarai ricompensato con dei dividendi di ETH. Quindi, vedrai che la tua criptovaluta produrrà piccole entrate. Questo serve solo a invogliarti a investire di più. Infine, tutti i tuoi fondi saranno inviati a un indirizzo sconosciuto e il truffatore scomparirà o, in alcuni casi, continuerà a rimanere in contatto, come successo in un caso recente.

In conclusione: diffida delle persone che ti contattano sui social chiedendoti di far parte di un pool di mining. Una volta perse le tue criptovalute, non potrai fare nulla.

Alcune cose da ricordare:

- Diffida di chiunque ti contatti proponendoti modi per guadagnare con la tua criptovaluta
- Fai la tua ricerca su staking, gruppi di liquidità, o altri modi di investire le tue criptovalute
- Raramente, se non mai, tali sistemi sono legittimi. Se lo fossero, probabilmente sarebbero mainstream e ne avresti sentito parlare.

[Un uomo ha perso $200k in una truffa del pool di mining](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Truffe airdrop {#airdrop-scams}

Le truffe airdrop prevedono un falso progetto di airdropping di una risorsa (NFT, token) nel tuo portafoglio con il rimando a un sito web fraudolento per rivendicare la risorsa in questione. Ti sarà chiesto di accedere con il tuo portafoglio di Ethereum e di "approvare" una transazione tentando di reclamare. Questa transazione compromette il tuo conto inviando la tua chiave pubblica e privata al truffatore. Una forma alternativa di questa truffa potrebbe chiederti di confermare una transazione che invia fondi al conto del truffatore.

[Maggiori informazioni sulle truffe di airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Sicurezza web 101 {#web-security}

### Usa password forti {#use-strong-passwords}

[Oltre l'80% delle violazioni dei conti sono un risultato di password deboli o rubate](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una lunga combinazione di caratteri, numeri e simboli ti aiuterà a mantenere sicuri i tuoi conti.

Un errore comune è utilizzare una combinazione di poche parole comuni e correlate. Password come queste non sono sicure, in quanto soggette a una tecnica di violazione detta attacco del dizionario.

```md
Esempio di una password debole: CuteFluffyKittens!

Esempio di una password sicura: ymv\*azu.EAC8eyp8umf
```

Un altro errore comune è utilizzare password facilmente intuibili o identificabili attraverso l'[ingegneria sociale](https://wikipedia.org/wiki/Social_engineering_(security)). Includere nella password il nome da nubile di tua madre, i nomi dei tuoi figli o animali domestici, o date di nascita incrementerà il rischio di violazioni.

#### Buone pratiche concernenti le password: {#good-password-practices}

- Crea password tanto lunghe quanto consentito dal generatore di password o dal modulo che stai compilando
- Usa una combinazione di caratteri maiuscoli, caratteri minuscoli, numeri e simboli
- Non utilizzare i dati personali, come i cognomi, nella password
- Evita le parole comuni

[Maggiori informazioni sulla creazione di password forti](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Usa password uniche per tutto {#use-unique-passwords}

Una password forte rivelata in una violazione di dati non è più una password forte. Il sito web [Have I Been Pwned](https://haveibeenpwned.com) ti consente di verificare se i tuoi profili sono stati coinvolti in una violazione di dati pubblici. In tal caso, **cambia immediatamente quelle password**. L'utilizzo di password univoche per ogni conto riduce il rischio che gli hacker ottengano l'accesso a tutti i tuoi conti in caso di compromissione di una delle tue password.

### Usa un gestore di password {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    L'utilizzo di un gestore di password consente di creare password forti e uniche e di ricordarle. <strong>Consigliamo vivamente</strong> di utilizzarne uno, molti di essi sono gratuiti.
  </div>
</InfoBanner>

Ricordare password forti e univoche per ogni tuo conto, non è ideale. Un gestore di password offre un deposito sicuro e criptato per tutte le tue password a cui puoi accedere attraverso una password principale forte. Suggeriscono inoltre password forti quando ci si iscrive a un nuovo servizio, in modo da non doverne creare una propria. Molti gestori di password dicono anche se si è subita una violazione dei dati, permettendo di cambiare le password prima di qualsiasi attacco malevolo.

![Esempio di utilizzo di un gestore di password](./passwordManager.png)

#### Prova un gestore di password: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- O date un'occhiata agli altri [gestori di password consigliati](https://www.privacytools.io/secure-password-manager)

### Usa l'autenticazione a due fattori {#two-factor-authentication}

Talvolta, ti potrebbe essere richiesto di autenticare la tua identità tramite prove univoche. Queste sono note come **fattori**. I tre fattori principali sono:

- Qualcosa che conosci (come una password o una domanda di sicurezza)
- Qualcosa di te che sia univoco (come una impronta digitale o uno scanner iride/facciale)
- Qualcosa che possiedi (una chiave di sicurezza o un'app di autenticazione sul tuo telefono)

L'utilizzo dell'**autenticazione a due fattori (A2F)** costituisce un ulteriore *fattore di sicurezza* per i tuoi conti online. La 2FA assicura che non basti semplicemente avere la tua password per accedere a un conto. Più comunemente, il secondo fattore è un codice casuale di 6 cifre, noto come **password monouso a tempo (TOTP)**, a cui si può accedere attraverso un'app di autenticazione come Google Authenticator o Authy. Esse funzionano come fattore "qualcosa che possiedi" perché il seme che genera il codice a tempo è memorizzato sul tuo dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: l'utilizzo dell'A2F basata su SMS è soggetta a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> e non è sicura. Per la massima sicurezza, utilizza un servizio come <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Chiavi di sicurezza {#security-keys}

Una chiave di sicurezza è un tipo più avanzato e sicuro di 2FA. Le chiavi di sicurezza sono dispositivi fisici di autenticazione hardware che funzionano come app di autenticazione. Utilizzare una chiave di sicurezza è il modo più sicuro per la 2FA. Molte di queste chiavi utilizzano lo standard FIDO Universal 2nd Factor (U2F). [Scopri di più su FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Guarda altro sulla 2FA (autenticazione a due fattori):

<YouTube id="m8jlnZuV1i4" start="3479" />

### Disinstalla le estensioni del browser {#uninstall-browser-extensions}

Le estensioni del browser, come le estensioni di Chrome o gli Addon di Firefox, possono migliorare le funzionalità del browser, ma presentano anch'esse dei rischi. Per impostazione predefinita, la maggior parte delle estensioni del browser chiede l'accesso a "leggere e modificare i dati del sito", consentendo loro di fare quasi qualsiasi cosa con i tuoi dati. Le estensioni di Chrome sono sempre aggiornate automaticamente, quindi un'estensione precedentemente sicura potrebbe aggiornarsi in seguito per includere codice dannoso. La maggior parte delle estensioni del browser non cerca di rubare i dati, tuttavia è necessario essere consapevoli che potrebbero farlo.

#### Proteggersi nel modo seguente: {#browser-extension-safety}

- Installare solo le estensioni del browser da fonti attendibili
- Rimuovere le estensioni del browser inutilizzate
- Installare le estensioni di Chrome localmente per interrompere l'aggiornamento automatico (avanzato)

[Maggiori informazioni sui rischi delle estensioni del browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Letture consigliate {#further-reading}

### Sicurezza web {#reading-web-security}

- [Fino a 3 milioni di dispositivi infettati da componenti aggiuntivi Chrome e Edge con malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Come creare una password forte — che non dimentichi](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Cos'è una chiave di sicurezza?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Crypto security {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) _Aggiornato frequentemente - MyCrypto_
- [Problemi di sicurezza nei software di cripto-comunicazione comuni](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media): _Salus_
- [Guida alla sicurezza per principianti e anche per esperti](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4)-_Andreas M. Antonopoulos_

### Educazione alle truffe {#reading-scam-education}

- [Guida: come identificare i token fraudolenti](/guides/how-to-id-scam-tokens/)
- [Restare al sicuro: le truffe più comuni](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitare le truffe](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Discussione di Twitter sulle e-mail e i messaggi di phishing di criptovalute comuni](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
