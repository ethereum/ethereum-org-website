---
title: Identità decentralizzata
description: Cos'è l'identità decentralizzata e perché importa?
lang: it
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: ../../../../assets/eth-gif-cat.png
summaryPoint1: I sistemi d'identità tradizionali hanno centralizzato l'emissione, manutenzione e controllo dei tuoi identificativi.
summaryPoint2: L'identità decentralizzata rende possibile non fare affidamento su terze parti centralizzate.
summaryPoint3: Grazie alle cripto, gli utenti hanno ora nuovamente gli strumenti per emettere, detenere e controllare i propri identificativi e attestazioni.
---

L'identità sostiene virtualmente ogni aspetto della tua vita odierna. Utilizzare servizi online, aprire un conto bancario, votare alle elezioni, acquistare proprietà, garantire l'occupazione: tutte queste cose richiedono di fornire la tua identità.

Tuttavia, i sistemi di gestione dell'identità tradizionali si sono a lungo affidati a intermediari centralizzati che emettono, detengono e controllano i tuoi identificativi e le tue [attestazioni](#what-are-attestations). Questo significa che non puoi controllare le tue informazioni correlate all'identità né decidere chi abbia accesso ai dati personali identificabili (PII) e in che misura a queste parti sia consentito l'accesso.

Per risolvere questi problemi, abbiamo decentralizzato i sistemi d'identità costruiti sulle blockchain pubbliche come Ethereum. L'identità decentralizzata consente agli individui di gestire le proprie informazioni correlate all'identità. Con le soluzioni d'identità decentralizzate, _tu_ puoi creare identificativi e rivendicare e detenere le tue attestazioni senza affidarti ad autorità centrali, come fornitori di servizi o governi.

## Cos'è l'identità? {#what-is-identity}

L'identità indica il senso di sé della persona, definito da caratteristiche uniche. L'identità si riferisce all'essere un _individuo_, cioè, un'entità umana distinta. L'identità potrebbe anche riferirsi ad altre entità non umane, come un'organizzazione o un'autorità.

## Cosa sono gli identificativi? {#what-are-identifiers}

Un identificativo è un pezzo d'informazione che agisce come puntatore a una o più identità in particolare. Tra gli identificativi comuni vi sono:

- Nome
- Codice fiscale/partita IVA
- Numero di cellulare
- Data e luogo di nascita
- Credenziali d'identificazione digitale, es. indirizzi email, nomi utente, avatar

Questi esempi tradizionali di identificativi sono emessi, detenuti e controllati da entità centrali. Serve un’autorizzazione dal tuo governo per cambiare il tuo nome o da una piattaforma di social per modificare il tuo identificativo.

## Cosa sono le attestazioni? {#what-are-attestations}

Un'attestazione è una dichiarazione resa da un'entità in merito a un'altra entità. Se vivi negli Stati Uniti, la patente rilasciata dal Ministero dei trasporti (un'entità), attesta che a te (un'altra entità) è legalmente consentito guidare un'auto.

Le attestazioni sono differenti dagli identificativi. Un'attestazione _contiene_ degli identificativi per fare riferimento a una specifica identità, ed effettua una dichiarazione su di un attributo relativo a quell'identità. Quindi, la tua patente di guida contiene degli identificativi (nome, data di nascita, indirizzo), ma è anche l'attestazione sul tuo diritto legale a guidare.

### Cosa sono gli identificativi decentralizzati? {#what-are-decentralized-identifiers}

Gli identificativi tradizionali come il tuo nome legale o l'indirizzo email si basano su terze parti: governi e fornitori di email. Gli identificativi decentralizzati (DID) sono diversi: non sono emessi, gestiti o controllati da un'entità centrale.

Gli identificativi decentralizzati sono emessi, detenuti e controllati dalle persone stesse. Un [conto di Ethereum](/developers/docs/accounts/) è un esempio di identificativo decentralizzato. Puoi creare quanti conti desideri senza l'autorizzazione di nessuno e senza doverli memorizzare in un registro centrale.

Gli identificativi decentralizzati sono memorizzati su libri mastri distribuiti (blockchain) o reti peer-to-peer. Questo rende i DID [unici a livello globale, risolvibili con elevata disponibilità e crittograficamente verificabili](https://w3c-ccg.github.io/did-primer/). Un identificativo decentralizzato è associabile a diverse entità, tra cui persone, organizzazioni o istituzioni governative.

## Cosa rende possibili gli identificativi decentralizzati? {#what-makes-decentralized-identifiers-possible}

### 1. Infrastruttura a Chiave Pubblica (PKI) {#public-key-infrastructure}

L'infrastruttura a chiave pubblica (PKI) è una misura di sicurezza delle informazioni che genera una [chiave pubblica](/glossary/#public-key) e una [chiave privata](/glossary/#private-key) per un'entità. La crittografia della chiave pubblica è usata nelle reti blockchain per autenticare le identità dell'utente e provare la proprietà delle risorse digitali.

Alcuni identificativi decentralizzati, come un conto di Ethereum, hanno chiavi pubbliche e private. La chiave pubblica identifica il controllore del conto, mentre le chiavi private possono firmare e decrittografare i messaggi per questo conto. PKI fornisce le prove necessarie ad autenticare le entità e impedire il furto di identità e l'uso di identità false, usando le [firme crittografiche](https://andersbrownworth.com/blockchain/public-private-keys/) per verificare tutte le richieste.

### 2. Datastore decentralizzati {#decentralized-datastores}

Una blockchain funge da registro di dati verificabile: un repository di informazioni aperto, affidabile e decentralizzato. L'esistenza di blockchain pubbliche elimina l'esigenza di memorizzare gli identificativi in registri centralizzati.

Se qualcuno deve confermare la validità di un identificativo decentralizzato, può consultare la chiave pubblica associata alla blockchain. Si tratta di un procedimento differente dagli identificativi tradizionali, che richiedono l’autenticazione da parte di terzi.

## Come fanno gli identificativi e le attestazioni decentralizzati a consentire l'identità decentralizzata? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

L'identità decentralizzata è l'idea che le informazioni correlate all'identità dovrebbero esser controllate dal proprietario, private e portatili, avendo come blocchi di costruzione principali gli identificativi e le attestazioni decentralizati.

Nel contesto dell'identità decentralizzata, le attestazioni (anche note come [Credenziali Verificabili](https://www.w3.org/TR/vc-data-model/)) sono a prova di manomissione, e rappresentano affermazioni rese dall'emittente e verificabili crittograficamente. Ogni attestazione o Credenziale Verificabile che un’entità (es., un'organizzazione) emette è associata al suo DID.

Poiché i DID sono memorizzati sulla blockchain, chiunque può verificare la validità di un'attestazione tramite verifica incrociata del DID dell'emittente su Ethereum. Essenzialmente, la blockchain di Ethereum agisce come una cartella globale che consente la verifica dei DID associati a certe entità.

Gli identificativi decentralizzati sono il motivo per cui le attestazioni sono controllate dal titolare e verificabili. Anche se l'emittente non esiste più, il titolare ha sempre prova della provenienza e validità dell'attestazione.

Gli identificativi decentralizzati sono inoltre fondamentali per proteggere la privacy delle informazioni personali tramite l'identità decentralizzata. Per esempio, se una persona invia prova di un'attestazione (una patente di guida), la parte che verifica non deve verificare la validità delle informazioni nella prova. Al contrario, a chi verifica necessita bastano solo le garanzie crittografiche dell'autenticità dell'attestazione e dell'identità dell'organizzazione emittente per determinare se la prova è valida.

## Tipi di attestazioni nell'identità decentralizzata {#types-of-attestations-in-decentralized-identity}

Le modalità in cui le informazioni dell'attestazione sono memorizzate e recuperate in un ecosistema d'identità basato su Ethereum differiscono dalla gestione tradizionale dell'identità. Ecco una panoramica dei vari approcci all'emissione, memorizzazione e verifica delle attestazioni nei sistemi d'identità decentralizzati:

### Attestazioni fuori dalla catena {#off-chain-attestations}

Un timore per la memorizzazione su catena è che potrebbero contenere informazioni che le persone desiderano mantenere private. La natura pubblica della blockchain di Ethereum la rende poco attraente per memorizzare attestazioni di questo genere.

La soluzione è emettere le attestazioni, detenute dagli utenti al di fuori delle catene nei portafogli digitali, ma firmate con il DID dell'emittente, memorizzato sulla catena. Queste attestazioni sono codificate come [Token Web JSON](https://en.wikipedia.org/wiki/JSON_Web_Token) e contengono la firma digitale dell'emittente, che consente di verificare facilmente le richieste al di fuori della catena.

Ecco uno scenario ipotetico per spiegare le attestazioni al di fuori della catena:

1. Un'università (l'emittente) genera un'attestazione (un certificato accademico digitale), lo firma con le proprie chiavi e lo rilascia a Bob (il proprietario dell'identità).

2. Bob si candida per un lavoro e desidera provare le proprie qualifiche accademiche al datore di lavoro, condivide quindi l'attestazione dal suo portafoglio mobile. L'azienda (chi verifica) può quindi confermare la validità dell'attestazione verificando il DID dell'emittente (es., la sua chiave pubblica su Ethereum).

### Attestazioni al di fuori della catena con accesso persistente {#offchain-attestations-with-persistent-access}

In questo modo, le attestazioni sono trasformate in file JSON e memorizzate al di fuori della catena (idealmente su una piattaforma di [memorizzazione su cloud decentralizzata](/developers/docs/storage/), come IPFS o Swarm). Tuttavia, un [hash](/glossary/#hash) del file JSON è memorizzato sulla catena e collegato a un DID tramite un registro sulla catena. Il DID associato potrebbe essere quello dell'emittente dell'attestazione o del destinatario.

Questo approccio consente alle attestazioni di ottenere persistenza basata sulla blockchain, mantenendo crittografate e verificabili le informazioni delle richieste. Consente anche una divulgazione selettiva, poiché il titolare della chiave privata può decifrare le informazioni.

### Attestazioni su catena {#onchain-attestations}

Le attestazioni su catena sono detenute nei [contratti intelligenti](/developers/docs/smart-contracts/) sulla blockchain di Ethereum. Il contratto intelligente (che funge da registro), mapperà un'attestazione a un identificativo decentralizzato corrispondente sulla catena (una chiave pubblica).

Ecco un esempio per mostrare come potrebbero funzionare in pratica le attestazioni su catena:

1. Un'azienda (XYZ Corp) pianifica di vendere quote di proprietà usando un contratto intelligente, ma vuole solo acquirenti che abbiano completato una verifica dei trascorsi personali.

2. XYZ Corp può far eseguire i controlli sulla storia personale dall'azienda affinché rilasci delle attestazioni su catena su Ethereum. Quest'attestazione certifica che una persona ha superato il controllo della storia personale senza esporre alcun dato personale.

3. Il contratto intelligente che vende le quote può verificare il contratto del registro per le identità degli acquirenti controllati, rendendo possibile per il contratto intelligente di determinare chi possa acquistare le quote e chi no.

### Token vincolati e identità {#soulbound}

I [token vincolati a identità](https://vitalik.ca/general/2022/01/26/soulbound.html) (NFT non trasferibili) possono essere usati per raccogliere informazioni univoche relative a un portafoglio specifico. Questo crea effettivamente un'identità univoca su catena legata a un particolare indirizzo di Ethereum che potrebbe includere dei token che rappresentano dei risultati (es., finire qualche corso online specifico o superare una soglia di punteggio in un gioco) o la partecipazione alla community.

## Benefici dell'identità decentralizzata {#benefits-of-decentralized-identity}

1. L'identità decentralizzata aumenta il controllo individuale delle informazioni identificative. Gli identificativi e le attestazioni decentralizzati sono verificabili senza dover fare affidamento ad autorità centralizzate e servizi di terze parti.

2. Le soluzioni d'identità decentralizzata facilitano un metodo affidabile, semplice e che protegge la privacy per verificare e gestire l'identità dell'utente.

3. L'identità decentralizzata sfrutta la tecnologia della blockchain, che crea fiducia tra le diverse parti e fornisce garanzie crittografiche per provare la validità delle attestazioni.

4. L'identità decentralizzata rende portatili i dati d'identità. Gli utenti memorizzano attestazioni e identificativi nel portafoglio mobile e possono condividerli con qualsiasi parte di loro scelta. Gli identificativi e le attestazioni decentralizzati non sono bloccati nel database dell'organizzazione emittente.

5. L'identità decentralizzata dovrebbe funzionare bene con le tecnologie emergenti zero knowledge, che consentiranno alle persone di provare che possiedono o hanno fatto qualcosa senza rivelare cosa sia. Questo potrebbe essere un potente metodo per combinare la fiducia e la privacy per applicazioni come ad esempio il voto.

6. L'identità decentralizzata consente ai meccanismi anti Sybil di identificare quando una persona finge di esser più persone per giocare o per spammare qualche sistema.

## Casi d'uso dell'identità decentralizzata {#decentralized-identity-use-cases}

L'identità decentralizzata ha molti possibili casi d'uso:

### 1. Accessi universali {#universal-dapp-logins}

L'identità decentralizzata può aiutare a sostituire gli accessi basati su password con l'[autenticazione decentralizzata](https://www.ibm.com/blogs/blockchain/2018/10/decentralized-identity-an-alternative-to-password-based-authentication/). I fornitori di servizi possono emettere attestazioni agli utenti, memorizzabili in un portafoglio di Ethereum. Un esempio d'attestazione potrebbe essere un [NFT](/nft/) che concede al titolare di accedere a una community online.

Una funzionalità [Accedi con Ethereum](https://login.xyz/), poi, consentirebbe ai server di confermare il conto di Ethereum dell'utente e di recuperare l'attestazione necessaria dall'indirizzo del suo conto. Questo significa che gli utenti possono accedere a piattaforme e siti web senza dover memorizzare lunghe password e migliorare l'esperienza online per gli utenti.

### 2. Autenticazione KYC {#kyc-authentication}

L’uso di molti servizi online impone alle persone di fornire attestazioni e credenziali, come una patente di guida o il passaporto nazionale. Ma questo approccio è problematico perché le informazioni private degli utenti possono esser compromesse e i fornitori del servizio non possono verificare l'autenticità dell'attestazione.

L'identità decentralizzata consente alle aziende di saltare i convenzionali processi di [verifica della clientela (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) e di autenticare le identità dell'utente tramite Credenziali Verificabili. Questo riduce il costo di gestione dell'identità e impedisce l'uso di documenti falsi.

### 3. Voto e community online {#voting-and-online-communities}

Il voto online e i social media sono due nuove applicazioni per l'identità decentralizzata. Gli schemi di voto online sono esposti alla manipolazione, specialmente se degli attori malevoli creano identità false per votare. Chiedere alle persone di presentare attestazioni sulla catena può migliorare l'integrità dei processi di voto online.

L'identità decentralizzata può aiutare a creare community online che siano prive di conti falsi. Ad esempio, ogni utente potrebbe dover autenticare la propria identità usando un sistema di identità su catena, come Ethereum Name Service, riducendo la possibilità di bot.

### 4. Protezione Anti Sybil {#sybil-protection}

Gli attacchi Sybil sono attacchi in cui delle persone ingannano un sistema inducendolo a pensare che si tratti di una molteplicità di persone, per aumentare la propria influenza. [Le applicazioni che concedono sovvenzioni](https://gitcoin.co/grants/) che usano il [voto quadratico](https://www.radicalxchange.org/concepts/plural-voting/) sono vulnerabili ad attacchi Sybil, perché il valore di una sovvenzione aumenta quando più individui votano per essa, incentivando gli utenti a ripartire il proprio contributo su numerose identità. Le identità decentralizzate aiutano a prevenire ciò, aumentando l'onere che grava su ogni partecipante per provare di essere realmente una persona umana, ma spesso senza dover rivelare informazioni private specifiche.

## Usare l'identità decentralizzata {#use-decentralized-identity}

Esistono molti progetti ambiziosi che usano Ethereum come fondamenta per le soluzioni di identità decentralizzata:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Sistema di denominazione decentralizzato per identificativi su catena leggibili dalle macchine, come, indirizzi dei portafogli di Ethereum, hash di contenuto e metadati._
- **[SpruceID](https://www.spruceid.com/)**: _Un progetto di identità decentralizzata che consente agli utenti di controllare l'identità digitale con i conti di Ethereum e i profili ENS, invece di affidarsi ai servizi di terze parti._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (o PoH) è un sistema di verifica dell'identità sociale creato su Ethereum._
- **[BrightID](https://www.brightid.org/)** - _Rete d'identità sociale decentralizzata e open source che cerca di riformare la verifica dell'identità tramite la creazione e analisi di un grafico sociale_
- **[Proof-of-personhood Passport](https://proofofpersonhood.com/)** - _Aggregatore di identità digitali decentralizzate._

## Lettura consigliate {#further-reading}

### Articoli {#articles}

- [Casi d'Uso della Blockchain: La Blockchain nell'Identità Digitale](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Cos'è Ethereum ERC725? Gestione dell'Identità Sovrana Personale sulla Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Come la Blockchain Potrebbe Risolvere il Problema dell'Identità Digitale](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Cos'È l'Identità Decentralizzata e Perché Dovrebbe Interessarti?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_

### Video {#videos}

- [Identità Decentralizzata (Sessione Live Bonus)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Un ottimo video esplicativo sull'identità decentralizzata di Andreas Antonopolous_
- [Accedi con Ethereum e l'Identità Decentralizzata con Ceramic, IDX, React e 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Tutorial YouTube sulla costruzione di un sistema di gestione dell'identità per creare, leggere e aggiornare il profilo di un utente usando il proprio portafoglio Ethereum, di Nader Dabit_
- [BrightID - Identità Decentralizzata su Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Episodio del podcast Bankless, discussione su BrightID, una soluzione di identità decentralizzata per Ethereum_
- [L'Internet al Di Fuori della Catena: Identità Decentralizzata e Credenziali Verificabili](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Presentazione di EthDenver 2022 di Evin McMullen

### Community {#communities}

- [ERC-725 Alliance su GitHub](https://github.com/erc725alliance) — _Sostenitori dello standard ERC725 per la gestione dell'identità sulla blockchain di Ethereum_
- [Server Discord di SpruceID](https://discord.com/invite/Sf9tSFzrnt) — _Community per appassionati e sviluppatori al lavoro sull'Accesso con Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Una community di sviluppatori che contribuiscono a creare un quadro per i dati verificabili per le applicazioni_
