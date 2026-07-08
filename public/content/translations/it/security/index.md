---
title: Sicurezza su Ethereum e prevenzione delle truffe
description: Rimanere al sicuro su Ethereum
lang: it
---

Il crescente interesse per le criptovalute porta con sé un rischio crescente da parte di truffatori e hacker. Questo articolo illustra alcune best practice per mitigare questi rischi.

**Ricorda: nessuno di ethereum.org ti contatterà mai. Non rispondere alle email che dicono di provenire dal supporto ufficiale di Ethereum.**

<Divider />

## Basi della sicurezza cripto {#crypto-security}

### Migliora le tue conoscenze {#level-up-your-knowledge}

Le incomprensioni su come funzionano le cripto possono portare a errori costosi. Ad esempio, se qualcuno finge di essere un agente del servizio clienti in grado di restituire gli ETH persi in cambio delle tue chiavi private, sta approfittando delle persone che non capiscono che [Ethereum](/) è una rete decentralizzata priva di questo tipo di funzionalità. Istruirsi su come funziona Ethereum è un investimento utile.

<DocLink href="/what-is-ethereum/">
  Cos'è Ethereum?
</DocLink>

<DocLink href="/what-is-ether/">
  Cos'è l'ether?
</DocLink>
<Divider />

## Sicurezza del portafoglio {#wallet-security}

### Non condividere mai la tua frase di recupero {#protect-private-keys}

**Non condividere mai, per nessun motivo, la tua frase di recupero o le tue chiavi private!**

La tua frase di recupero (chiamata anche frase di recupero segreta o frase seme) è la chiave principale del tuo portafoglio. Chiunque la possieda può accedere a tutti i tuoi account e prosciugare ogni risorsa. Le chiavi private funzionano allo stesso modo per i singoli account. Nessun servizio legittimo, agente di supporto o sito web ti chiederà mai queste informazioni.

<DocLink href="/wallets/">
  Cos'è un portafoglio Ethereum?
</DocLink>

#### Non fare screenshot delle tue frasi seme/chiavi private {#screenshot-private-keys}

Fare screenshot delle tue frasi seme o chiavi private potrebbe sincronizzarle con un provider di dati cloud, il che potrebbe renderle accessibili agli hacker. Ottenere chiavi private dal cloud è un vettore di attacco comune per gli hacker.

### Usa un portafoglio hardware {#use-hardware-wallet}

Un portafoglio hardware fornisce un'archiviazione offline per le chiavi private. Sono considerati l'opzione di portafoglio più sicura per conservare le tue chiavi private: la tua chiave privata non tocca mai internet e rimane completamente locale sul tuo dispositivo.

Mantenere le chiavi private offline riduce enormemente il rischio di essere hackerati, anche se un hacker ottiene il controllo del tuo computer.

#### Prova un portafoglio hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Ricontrolla le transazioni prima di inviarle {#double-check-transactions}

Inviare accidentalmente cripto all'indirizzo del portafoglio sbagliato è un errore comune. **Una transazione inviata su Ethereum è irreversibile.** A meno che tu non conosca il proprietario dell'indirizzo e riesca a convincerlo a restituirti i fondi, non sarai in grado di recuperarli.

Assicurati sempre che l'indirizzo a cui stai inviando corrisponda esattamente all'indirizzo del destinatario desiderato prima di inviare una transazione.
È buona norma, quando si interagisce con uno smart contract, leggere il messaggio della transazione prima della firma.

### Imposta limiti di spesa per gli smart contract {#spend-limits}

Quando interagisci con gli smart contract, non consentire limiti di spesa illimitati. Una spesa illimitata potrebbe consentire allo smart contract di prosciugare il tuo portafoglio. Imposta invece i limiti di spesa solo all'importo necessario per la transazione.

Molti portafogli Ethereum offrono una protezione dei limiti per salvaguardare gli account dall'essere prosciugati.

[Come revocare l'accesso degli smart contract ai tuoi fondi cripto](/guides/how-to-revoke-token-access/)

<Divider />

## Truffe comuni {#common-scams}

È impossibile fermare completamente i truffatori, ma possiamo renderli meno efficaci essendo consapevoli delle loro tecniche più utilizzate. Esistono molte varianti di queste truffe, ma in genere seguono gli stessi schemi ad alto livello. Se non altro, ricorda:

- sii sempre scettico
- nessuno ti darà ETH gratis o scontati
- nessuno ha bisogno di accedere alle tue chiavi private o alle tue informazioni personali

### Phishing tramite annunci su Twitter {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Esiste un metodo per falsificare la funzione di anteprima dei link di Twitter (noto anche come X) per ingannare potenzialmente gli utenti facendogli credere di visitare un sito web legittimo. Questa tecnica sfrutta il meccanismo di Twitter per generare anteprime degli URL condivisi nei tweet e mostra ad esempio _da ethereum.org_ (come mostrato sopra), quando in realtà vengono reindirizzati a un sito dannoso.

Controlla sempre di essere sul dominio corretto, specialmente dopo aver cliccato su un link.

[Maggiori informazioni qui](https://harrydenley.com/faking-twitter-unfurling).

### Truffa dei giveaway {#giveaway}

Una delle truffe più comuni nelle criptovalute è la truffa dei giveaway. La truffa dei giveaway può assumere molte forme, ma l'idea generale è che se invii ETH all'indirizzo del portafoglio fornito, riceverai indietro i tuoi ETH ma raddoppiati. *Per questo motivo, è anche nota come truffa 2 per 1.*

Queste truffe di solito stabiliscono un tempo limitato per il riscatto del giveaway per creare un falso senso di urgenza.

### Violazioni dei social media {#social-media-hacks}

Una versione di alto profilo di questo fenomeno si è verificata nel luglio 2020, quando gli account Twitter di celebrità e organizzazioni di spicco sono stati hackerati. L'hacker ha pubblicato simultaneamente un giveaway di Bitcoin sugli account violati. Sebbene i tweet ingannevoli siano stati rapidamente notati ed eliminati, gli hacker sono comunque riusciti a fuggire con 11 bitcoin (o 500.000 dollari a settembre 2021).

![A scam on Twitter](./appleTwitterScam.png)

### Giveaway di celebrità {#celebrity-giveaway}

Il giveaway di celebrità è un'altra forma comune che assume la truffa dei giveaway. I truffatori prendono un'intervista video registrata o un discorso a una conferenza tenuto da una celebrità e lo trasmettono in live streaming su YouTube, facendo sembrare che la celebrità stia rilasciando un'intervista video in diretta per promuovere un giveaway di criptovalute.

Vitalik Buterin è usato più spesso in questa truffa, ma vengono usate anche molte altre persone di spicco coinvolte nelle cripto (ad es. Elon Musk o Charles Hoskinson). Includere una persona nota conferisce al live streaming dei truffatori un senso di legittimità (sembra losco, ma c'è di mezzo Vitalik, quindi deve essere a posto!).

**I giveaway sono sempre truffe. Se invii i tuoi fondi a questi account, li perderai per sempre.**

![A scam on YouTube](./youtubeScam.png)

### Truffe del supporto {#support-scams}

La criptovaluta è una tecnologia relativamente giovane e incompresa. Una truffa comune che ne approfitta è la truffa del supporto, in cui i truffatori si fingono personale di supporto per portafogli, exchange o blockchain popolari.

Gran parte delle discussioni su Ethereum avviene su Discord. I truffatori del supporto trovano comunemente il loro bersaglio cercando domande di supporto nei canali Discord pubblici e inviando poi a chi ha fatto la domanda un messaggio privato offrendo supporto. Costruendo fiducia, i truffatori del supporto cercano di ingannarti per farti rivelare le tue chiavi private o inviare i tuoi fondi ai loro portafogli.

![A support scam on Discord](./discordScam.png)

Come regola generale, lo staff non comunicherà mai con te attraverso canali privati e non ufficiali. Alcune semplici cose da tenere a mente quando si ha a che fare con il supporto:

- Non condividere mai le tue chiavi private, frasi seme o password
- Non consentire mai a nessuno l'accesso remoto al tuo computer
- Non comunicare mai al di fuori dei canali designati di un'organizzazione

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Attenzione: sebbene le truffe in stile supporto avvengano comunemente su Discord, possono essere diffuse anche su qualsiasi applicazione di chat in cui si discute di cripto, inclusa l'email.
</AlertDescription>
</AlertContent>
</Alert>

### Truffa del token 'Eth2' {#eth2-token-scam}

Nel periodo precedente a [The Merge](/roadmap/merge/), i truffatori hanno approfittato della confusione attorno al termine 'Eth2' per cercare di convincere gli utenti a scambiare i loro ETH con un token 'ETH2'. Non esiste alcun 'ETH2' e nessun altro token legittimo è stato introdotto con The Merge. Gli ETH che possedevi prima di The Merge sono gli stessi ETH di adesso. Non c'è **alcun bisogno di intraprendere alcuna azione relativa ai tuoi ETH per tenere conto del passaggio dalla Prova di lavoro (PoW) alla Proof-of-Stake (PoS)**.

I truffatori potrebbero presentarsi come "supporto", dicendoti che se depositi i tuoi ETH, riceverai in cambio 'ETH2'. Non esiste alcun [supporto ufficiale di Ethereum](/community/support/) e non c'è nessun nuovo token. Non condividere mai la frase seme del tuo portafoglio con nessuno.

_Nota: ci sono token/ticker derivati che potrebbero rappresentare ETH messi in staking (ad es. rETH di Rocket Pool, stETH di Lido, ETH2 di Coinbase), ma non sono qualcosa verso cui devi "migrare"._

### Truffe di phishing {#phishing-scams}

Le truffe di phishing sono un'altra angolazione sempre più comune che i truffatori useranno per tentare di rubare i fondi del tuo portafoglio.

Alcune email di phishing chiedono agli utenti di cliccare su link che li reindirizzeranno a siti web imitazione, chiedendo loro di inserire la loro frase seme, reimpostare la password o inviare ETH. Altre potrebbero chiederti di installare inconsapevolmente malware per infettare il tuo computer e dare ai truffatori accesso ai file del tuo computer.

Se ricevi un'email da un mittente sconosciuto, ricorda:

- Non aprire mai un link o un allegato da indirizzi email che non riconosci
- Non divulgare mai le tue informazioni personali o password a nessuno
- Elimina le email da mittenti sconosciuti

[Maggiori informazioni su come evitare le truffe di phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Truffe dei broker di trading cripto {#broker-scams}

I broker di trading cripto truffaldini affermano di essere broker di criptovalute specializzati che si offriranno di prendere i tuoi soldi e investire per tuo conto. Dopo che il truffatore riceve i tuoi fondi, potrebbe illuderti, chiedendoti di inviare più fondi, in modo da non perdere ulteriori guadagni sugli investimenti, oppure potrebbe scomparire del tutto.

Questi truffatori spesso trovano bersagli usando account falsi su YouTube per avviare conversazioni apparentemente naturali sul 'broker'. Queste conversazioni sono spesso molto votate per aumentare la legittimità, ma i voti positivi provengono tutti da account bot.

**Non fidarti di sconosciuti su internet per investire per tuo conto. Perderai le tue cripto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Truffe delle pool di minaggio cripto {#mining-pool-scams}

Da settembre 2022, il minaggio su Ethereum non è più possibile. Tuttavia, le truffe delle pool di minaggio esistono ancora. Le truffe delle pool di minaggio coinvolgono persone che ti contattano senza essere state sollecitate e affermano che puoi ottenere grandi rendimenti unendoti a una pool di minaggio di Ethereum. Il truffatore farà affermazioni e rimarrà in contatto con te per tutto il tempo necessario. Essenzialmente, il truffatore cercherà di convincerti che quando ti unisci a una pool di minaggio di Ethereum, la tua criptovaluta verrà utilizzata per creare ETH e che ti verranno pagati dividendi in ETH. Vedrai quindi che la tua criptovaluta sta producendo piccoli rendimenti. Questo serve semplicemente per attirarti a investire di più. Alla fine, tutti i tuoi fondi verranno inviati a un indirizzo sconosciuto e il truffatore scomparirà o, in alcuni casi, continuerà a rimanere in contatto come è successo in un caso recente.

In conclusione: diffida delle persone che ti contattano sui social media chiedendoti di far parte di una pool di minaggio. Una volta che perdi le tue cripto, sono andate.

Alcune cose da ricordare:

- Diffida di chiunque ti contatti in merito a modi per fare soldi con le tue cripto
- Fai le tue ricerche su staking, pool di liquidità o altri modi per investire le tue cripto
- Raramente, se non mai, tali schemi sono legittimi. Se lo fossero, probabilmente sarebbero di uso comune e ne avresti sentito parlare.

[Un uomo perde 200.000 dollari in una truffa di pool di minaggio](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Truffe degli airdrop {#airdrop-scams}

Le truffe degli airdrop coinvolgono un progetto truffaldino che invia tramite airdrop un asset (NFT, token) nel tuo portafoglio e ti indirizza a un sito web truffa per riscattare l'asset ricevuto. Ti verrà chiesto di accedere con il tuo portafoglio Ethereum e di "approvare" una transazione quando tenti il riscatto. Questa transazione compromette il tuo account inviando le tue chiavi pubbliche e private al truffatore. Una forma alternativa di questa truffa potrebbe farti confermare una transazione che invia fondi all'account del truffatore.

[Maggiori informazioni sulle truffe degli airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Basi della sicurezza web {#web-security}

### Usa password complesse {#use-strong-passwords}

[Oltre l'80% delle violazioni degli account è il risultato di password deboli o rubate](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una lunga combinazione di caratteri, numeri e simboli aiuterà a mantenere sicuri i tuoi account.

Un errore comune è usare una combinazione di poche parole comuni e correlate. Password come questa sono insicure perché sono soggette a una tecnica di hacking chiamata attacco a dizionario.

```md
Esempio di password debole: CuteFluffyKittens!

Esempio di password complessa: ymv\*azu.EAC8eyp8umf
```

Un altro errore comune è usare password che possono essere facilmente indovinate o scoperte tramite [ingegneria sociale](<https://wikipedia.org/wiki/Social_engineering_(security)>). Includere il nome da nubile di tua madre, i nomi dei tuoi figli o animali domestici, o le date di nascita nella tua password aumenterà il rischio di essere hackerati.

#### Buone pratiche per le password: {#good-password-practices}

- Rendi le password il più lunghe possibile in base a quanto consentito dal tuo generatore di password o dal modulo che stai compilando
- Usa una combinazione di lettere maiuscole, minuscole, numeri e simboli
- Non usare dettagli personali, come i cognomi, nella tua password
- Evita parole comuni

[Maggiori informazioni sulla creazione di password complesse](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Usa password univoche per tutto {#use-unique-passwords}

Una password complessa che è stata rivelata in una violazione dei dati non è più una password complessa. Il sito web [Have I Been Pwned](https://haveibeenpwned.com) ti consente di verificare se i tuoi account sono stati coinvolti in violazioni pubbliche dei dati. In tal caso, **cambia immediatamente quelle password**. L'uso di password univoche per ogni account riduce il rischio che gli hacker ottengano l'accesso a tutti i tuoi account se una delle tue password viene compromessa.

### Usa un gestore di password {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    L'uso di un gestore di password si occupa di creare password complesse e univoche e di ricordarle! Consigliamo <strong>vivamente</strong> di usarne uno, e la maggior parte di essi sono gratuiti!
</AlertDescription>
</AlertContent>
</Alert>

Ricordare password complesse e univoche per ogni account che possiedi non è l'ideale. Un gestore di password offre un archivio sicuro e crittografato per tutte le tue password a cui puoi accedere tramite un'unica password principale complessa. Suggeriscono anche password complesse quando ti iscrivi a un nuovo servizio, così non devi crearne una tua. Molti gestori di password ti diranno anche se sei stato coinvolto in una violazione dei dati, permettendoti di cambiare le password prima di qualsiasi attacco dannoso.

![Example of using a password manager](./passwordManager.png)

#### Prova un gestore di password: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Oppure dai un'occhiata ad altri [gestori di password consigliati](https://www.privacytools.io/secure-password-manager)

### Usa l'autenticazione a due fattori {#two-factor-authentication}

A volte potrebbe esserti chiesto di autenticare la tua identità attraverso prove univoche. Queste sono note come **fattori**. I tre fattori principali sono:

- Qualcosa che conosci (come una password o una domanda di sicurezza)
- Qualcosa che sei (come un'impronta digitale o uno scanner dell'iride/facciale)
- Qualcosa che possiedi (una chiave di sicurezza o un'app di autenticazione sul tuo telefono)

L'uso dell'**autenticazione a due fattori (2FA)** fornisce un *fattore di sicurezza* aggiuntivo per i tuoi account online. La 2FA garantisce che avere semplicemente la tua password non sia sufficiente per accedere a un account. Più comunemente, il secondo fattore è un codice casuale a 6 cifre, noto come **password monouso basata sul tempo (TOTP)**, a cui puoi accedere tramite un'app di autenticazione come Google Authenticator o Authy. Questi funzionano come un fattore "qualcosa che possiedi" perché il seme che genera il codice a tempo è memorizzato sul tuo dispositivo.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Nota: l'uso della 2FA basata su SMS è suscettibile al <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> e non è sicuro. Per la massima sicurezza, usa un servizio come <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> o <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Chiavi di sicurezza {#security-keys}

Una chiave di sicurezza è un tipo di 2FA più avanzato e sicuro. Le chiavi di sicurezza sono dispositivi di autenticazione hardware fisici che funzionano come le app di autenticazione. L'uso di una chiave di sicurezza è il modo più sicuro per la 2FA. Molte di queste chiavi utilizzano lo standard FIDO Universal 2nd Factor (U2F). [Scopri di più su FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Guarda di più sulla 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Disinstalla le estensioni del browser {#uninstall-browser-extensions}

Le estensioni del browser, come le estensioni di Chrome o i componenti aggiuntivi per Firefox, possono migliorare le funzionalità del browser ma comportano anche dei rischi. Per impostazione predefinita, la maggior parte delle estensioni del browser chiede l'accesso per 'leggere e modificare i dati dei siti', consentendo loro di fare quasi tutto con i tuoi dati. Le estensioni di Chrome vengono sempre aggiornate automaticamente, quindi un'estensione precedentemente sicura potrebbe aggiornarsi in seguito per includere codice dannoso. La maggior parte delle estensioni del browser non cerca di rubare i tuoi dati, ma dovresti essere consapevole che possono farlo.

#### Rimani al sicuro: {#browser-extension-safety}

- Installando estensioni del browser solo da fonti attendibili
- Rimuovendo le estensioni del browser inutilizzate
- Installando le estensioni di Chrome localmente per interrompere l'aggiornamento automatico (Avanzato)

[Maggiori informazioni sui rischi delle estensioni del browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Letture consigliate {#further-reading}

### Sicurezza web {#reading-web-security}

- [Fino a 3 milioni di dispositivi infettati da componenti aggiuntivi di Chrome ed Edge contenenti malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Come creare una password complessa — che non dimenticherai](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Cos'è una chiave di sicurezza?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Sicurezza cripto {#reading-crypto-security}

- [Proteggere te stesso e i tuoi fondi](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problemi di sicurezza nei comuni software di comunicazione cripto](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guida alla sicurezza per principianti e anche per persone intelligenti](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Sicurezza cripto: password e autenticazione](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Educazione sulle truffe {#reading-scam-education}

- [Guida: come identificare i token truffa](/guides/how-to-id-scam-tokens/)
- [Rimanere al sicuro: truffe comuni](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitare le truffe](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Thread di Twitter sulle comuni email e messaggi di phishing cripto](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />