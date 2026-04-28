---
title: Privacy su Ethereum
description: Strumenti e tecniche per proteggere la tua privacy su Ethereum
lang: it
---

# Privacy su Ethereum {#introduction}

La privacy non è solo essenziale per la sicurezza personale, è una pietra miliare della libertà e un [garante chiave per la decentralizzazione](https://vitalik.eth.limo/general/2025/04/14/privacy.html). La privacy offre alle persone la capacità di esprimersi, effettuare transazioni con altri e organizzare liberamente le comunità. Ma come per tutte le blockchain, il registro pubblico di Ethereum rende la privacy una sfida.

Ethereum è trasparente per concezione. Ogni azione on-chain è visibile a chiunque guardi. Sebbene Ethereum offra pseudonimato collegando la tua attività a una [chiave pubblica](/decentralized-identity/#public-key-cryptography) invece che a un'identità del mondo reale, i modelli di attività potrebbero essere analizzati per rivelare informazioni sensibili e identificare gli utenti.

Integrare strumenti per la tutela della privacy in Ethereum può aiutare persone, organizzazioni e istituzioni a interagire in modo sicuro limitando l'esposizione non necessaria. Ciò rende l'ecosistema più sicuro e pratico per una gamma più ampia di casi d'uso.

## Privacy per le scritture {#privacy-of-writes}

Per impostazione predefinita, ogni transazione scritta su Ethereum è pubblica e permanente. Questo include non solo l'invio di ETH, ma anche la registrazione di nomi ENS, la raccolta di POAP o lo scambio di NFT. Azioni quotidiane come pagamenti, votazioni o verifiche dell'identità possono rivelare le tue informazioni a parti non intenzionali. Esistono diversi strumenti e tecniche che possono aiutare a renderle più private:

### Protocolli di miscelazione (o "mixer") {#mixing-protocols}

I mixer interrompono il collegamento tra mittenti e destinatari inserendo le transazioni di molti utenti in un "pool" condiviso e consentendo poi alle persone di prelevare in seguito su un nuovo indirizzo. Poiché i depositi e i prelievi sono mescolati insieme, è molto più difficile per gli osservatori collegarli.

_Esempi: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pool schermati {#shielded-pools}

I pool schermati sono simili ai mixer ma consentono agli utenti di detenere e trasferire fondi privatamente all'interno del pool stesso. Invece di oscurare semplicemente il collegamento tra deposito e prelievo, i pool schermati mantengono uno stato privato continuo, spesso protetto con prove a conoscenza-zero. Questo rende possibile creare trasferimenti privati, saldi privati e altro ancora.

_Esempi: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Indirizzi stealth {#stealth-addresses}

Un [indirizzo stealth](https://vitalik.eth.limo/general/2023/01/20/stealth.html) è come dare a ogni mittente una casella postale unica e monouso che solo tu puoi aprire. Ogni volta che qualcuno ti invia criptovalute, queste vanno a un nuovo indirizzo, in modo che nessun altro possa vedere che tutti quei pagamenti appartengono a te. Questo mantiene la tua cronologia dei pagamenti privata e più difficile da tracciare.

_Esempi: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Altri casi d'uso {#other-use-cases}

Altri progetti che esplorano le scritture private includono [PlasmaFold](https://pse.dev/projects/plasma-fold) (pagamenti privati) e sistemi come [MACI](https://pse.dev/projects/maci) e [Semaphore](https://pse.dev/projects/semaphore) (votazioni private).

Questi strumenti ampliano le opzioni per scrivere privatamente su Ethereum, ma ognuno comporta dei compromessi. Alcuni approcci sono ancora sperimentali, altri aumentano i costi o la complessità e alcuni strumenti come i mixer potrebbero affrontare controlli legali o normativi a seconda di come vengono utilizzati.

## Privacy per le letture {#privacy-of-reads}

Leggere o controllare qualsiasi informazione su Ethereum (ad es. il saldo del tuo portafoglio) di solito passa attraverso un servizio come il fornitore del tuo portafoglio, un fornitore di nodi o un esploratore di blocchi. Poiché ti affidi a loro per leggere la blockchain per te, possono anche vedere le tue richieste insieme a metadati come il tuo indirizzo IP o la tua posizione. Se continui a controllare lo stesso account, queste informazioni possono essere messe insieme per collegare la tua identità alla tua attività.

Eseguire il proprio nodo Ethereum eviterebbe questo problema, ma archiviare e sincronizzare l'intera blockchain rimane costoso e poco pratico per la maggior parte degli utenti, specialmente sui dispositivi mobili.

Alcuni progetti che esplorano le letture private includono [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, recuperare dati senza rivelare cosa si sta cercando), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (controlli di identità privati con prove a conoscenza-zero), [vOPRF](https://pse.dev/projects/voprf) (utilizzare account Web2 in modo pseudonimo nel web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (calcolare su dati crittografati) e [MachinaIO](https://pse.dev/projects/machina-io) (nascondere i dettagli del programma mantenendone la funzionalità).

## Privacy per le prove {#privacy-of-proving}

Le prove che tutelano la privacy sono strumenti che puoi utilizzare su Ethereum per dimostrare che qualcosa è vero senza rivelare dettagli non necessari. Ad esempio, potresti:

- Dimostrare di avere più di 18 anni senza condividere la tua data di nascita completa
- Dimostrare la proprietà di un NFT o di un token senza rivelare l'intero portafoglio
- Dimostrare l'idoneità per un'iscrizione, una ricompensa o un voto senza esporre altri dati personali

La maggior parte degli strumenti per questi scopi si basa su tecniche crittografiche come le prove a conoscenza-zero, ma la sfida è renderle abbastanza efficienti da funzionare sui dispositivi di tutti i giorni, portabili su qualsiasi piattaforma e sicure.

Alcuni progetti che esplorano la privacy per le prove includono [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistemi di prova ZK), [TLSNotary](https://tlsnotary.org/) (prove di autenticità per qualsiasi dato sul web), [Mopro](https://pse.dev/projects/mopro) (prove lato client mobile), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (framework di delega che evitano presupposti di fiducia) e [Noir](https://noir-lang.org/) (linguaggio per il calcolo privato e verificabile).

## Glossario della privacy {#privacy-glossary}

**Anonimo**: Interagire con tutti gli identificatori rimossi in modo permanente dai tuoi dati, rendendo impossibile risalire alle informazioni di un individuo

**Crittografia**: Un processo che mescola i dati in modo che solo chi possiede la chiave corretta possa leggerli

**[Crittografia Completamente Omomorfica](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Un modo per eseguire calcoli direttamente sui dati crittografati, senza mai decrittografarli

**[Offuscamento Indistinguibile](https://pse.dev/projects/machina-io) (iO)**: Tecniche di privacy che rendono programmi o dati incomprensibili pur rimanendo utilizzabili

**[Calcolo Multipartitico](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metodi che consentono a più parti di calcolare un risultato insieme senza esporre i propri input privati

**Crittografia Programmabile**: Crittografia flessibile e basata su regole che può essere personalizzata nel software per controllare come e quando i dati vengono condivisi, verificati o rivelati

**Pseudonimo**: L'utilizzo di codici o numeri univoci (come un indirizzo Ethereum) al posto degli identificatori personali

**Divulgazione Selettiva**: La capacità di condividere solo ciò che è necessario (ad es. dimostrare di possedere un NFT senza rivelare l'intera cronologia del portafoglio)

**Non collegabilità**: Assicurarsi che azioni separate sulla blockchain non possano essere ricondotte allo stesso indirizzo

**Verificabilità**: Garantire che altri possano confermare che un'affermazione sia vera, come la convalida di una transazione o di una prova su Ethereum

**Delega Verificabile**: Assegnare un compito, come la generazione di una prova, a un'altra parte (ad es. un portafoglio mobile che utilizza un server per la crittografia pesante) pur essendo in grado di verificare che sia stato eseguito correttamente

**[Prove a Conoscenza-Zero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protocolli crittografici che consentono a qualcuno di dimostrare che un'informazione è vera senza rivelare i dati sottostanti

**Rollup ZK**: Un sistema di scalabilità che raggruppa le transazioni fuori catena e invia una prova di validità on-chain; non è privato per impostazione predefinita, ma abilita sistemi di privacy efficienti (come i pool schermati) riducendo i costi

## Risorse {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), un laboratorio di ricerca e sviluppo della Ethereum Foundation focalizzato sulla privacy per l'ecosistema
- [Web3PrivacyNow](https://web3privacy.info/), una rete di persone, progetti e organizzazioni allineate che proteggono e promuovono i diritti umani online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), un sito di valutazione dei portafogli Ethereum che mira a fornire un elenco completo di portafogli, le loro funzionalità, pratiche e supporto per determinati standard.
- [Zk-kit](https://zkkit.pse.dev/): Un insieme di librerie (algoritmi, funzioni di utilità e strutture dati) che possono essere riutilizzate in diversi progetti e protocolli a conoscenza-zero.
- [App per la privacy](/apps/categories/privacy/) - Scopri un elenco curato di applicazioni per la privacy che funzionano su Ethereum.