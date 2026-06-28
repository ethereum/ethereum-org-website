---
title: "Il codice è legge? Gli smart contract spiegati"
description: "Esplorazione del concetto 'il codice è legge' attraverso la lente degli smart contract su Ethereum e della DeFi. Questo video illustra cosa sono gli smart contract, come funzionano e la questione filosofica se il codice debba essere l'arbitro supremo."
lang: it
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Smart contract"
---

Un video esplicativo di **Finematics** che esplora il concetto di "il codice è legge" attraverso la lente degli smart contract su Ethereum, coprendo cosa sono gli smart contract, come funzionano, i loro vantaggi rispetto ai contratti tradizionali e perché sono i mattoni fondamentali della finanza decentralizzata (DeFi).

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=pWGLtjG-F5c) pubblicata da Finematics. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Hai mai sentito l'espressione "il codice è legge", in cui la tecnologia viene utilizzata per far rispettare le regole? In tal caso, abbiamo ancora bisogno degli avvocati? O forse possiamo vivere in un mondo completamente automatizzato in cui il codice detta ciò che possiamo e non possiamo fare. Con l'attuale sviluppo degli smart contract, questo scenario futuristico potrebbe essere più vicino di quanto pensiamo.

Uno smart contract è una porzione di codice che può essere eseguita automaticamente e in modo deterministico. Il codice dello smart contract viene solitamente archiviato ed eseguito sulla blockchain per renderlo trustless e sicuro. Gli smart contract hanno anche la capacità di ricevere, archiviare e inviare fondi, e persino di richiamare altri smart contract. Seguono la semantica "se-allora" (if-then), il che li rende abbastanza facili da programmare.

Gli smart contract mirano a rimuovere il fattore umano dal processo decisionale. Il fattore umano si è spesso dimostrato l'elemento più soggetto a errori e inaffidabile dei contratti tradizionali standard.

Un distributore automatico viene spesso citato come una buona analogia per uno smart contract, poiché condivide alcune somiglianze. Un tipico distributore automatico è programmato in modo da consentire determinate azioni e transizioni di stato in base all'input. Funziona anche in modo completamente deterministico. Ad esempio, se vuoi comprare una lattina di cola che costa due dollari e hai solo un dollaro, non importa quante volte ci provi, non riuscirai a ottenere la bevanda. D'altra parte, se inserisci tre dollari, la macchina ti darà una lattina di cola e il resto appropriato. Anche il resto erogato viene selezionato in modo predefinito e programmato in base a quali monete sono disponibili e di quali monete la macchina vuole sbarazzarsi per prime.

Uno smart contract può basarsi esclusivamente sulle informazioni disponibili sulla blockchain: ad esempio, "se mi dai dieci token A, ti darò dieci token B". Oppure può basarsi su una fonte di dati esterna, ad esempio sul prezzo di ETH o dell'S&P 500. Quest'ultimo esempio rende gli smart contract più complessi, poiché devono fidarsi dei dati del mondo reale. La fiducia necessaria può essere ridotta al minimo utilizzando servizi di oracolo, ma anche dei servizi di oracolo bisogna fidarsi. Esistono già alcuni progetti che, utilizzando determinati incentivi, rendono più probabile che gli oracoli forniscano dati corretti. Chainlink è un progetto che spicca chiaramente in questa categoria.

#### Smart contract di Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum è una blockchain che supporta gli smart contract e consente a un programmatore di implementare i propri smart contract. Uno smart contract può essere scritto in un linguaggio di programmazione chiamato Solidity, creato appositamente per questo scopo. In Ethereum, tutti gli smart contract distribuiti sono immutabili: ciò significa che, una volta distribuiti, non possono essere modificati, il che crea determinati rischi di cui parleremo in seguito.

Gli smart contract su Ethereum sono anche decentralizzati, il che significa che non esiste una singola macchina che controlla il contratto. Infatti, tutti i nodi sulla rete Ethereum archiviano lo stesso contratto con esattamente lo stesso stato. Sebbene Ethereum sia attualmente la piattaforma di smart contract generica più popolare, non è l'unica e ha alcuni concorrenti, tra cui Cardano, Tezos, EOS e Tron, ma non tutti condividono le stesse caratteristiche.

#### Definizione di smart contract (4:23) {#smart-contract-definition-423}

Il termine "smart contract" è stato coniato dal noto crittografo Nick Szabo all'inizio degli anni '90. Il nome, sebbene non sia il più autoesplicativo, è rimasto ed è comunemente usato, specialmente nel settore della blockchain. Per vedere i vantaggi degli smart contract, confrontiamo un ipotetico smart contract con il suo equivalente nello spazio tradizionale.

#### Esempio di smart contract (4:46) {#smart-contract-example-446}

Supponiamo di voler scrivere il seguente contratto: se Alice invia un numero X di token A e Bob invia lo stesso numero di token B, verrà effettuato uno swap dei token: Alice riceverà i token di Bob e Bob riceverà i token di Alice.

In un mondo senza smart contract, un modo per ottenerlo senza che Alice debba fidarsi di Bob e Bob debba fidarsi di Alice sarebbe creare un contratto di deposito a garanzia (escrow) con una terza parte. La terza parte raccoglierebbe i token A da Alice, aspetterebbe lo stesso numero di token B da Bob e invierebbe ad Alice e Bob i rispettivi token scambiati.

#### Problemi degli smart contract (5:45) {#smart-contract-problems-545}

Questo approccio mostra già alcuni problemi che Alice e Bob potrebbero dover affrontare:

- **Fiducia negli intermediari**: non c'è alcuna garanzia che la terza parte non scappi con i token dopo aver ricevuto i fondi da Alice e Bob. Dobbiamo fare affidamento sulla reputazione dell'intermediario e su una potenziale assicurazione.
- **Risultati non deterministici**: se qualcosa va storto, potrebbero esserci esiti diversi a seconda di molteplici fattori, inclusa la giurisdizione in cui verrebbe risolto un potenziale caso.

D'altra parte, uno smart contract funzionerebbe in modo completamente automatizzato e deterministico, assicurandosi che entrambe le parti ricevano i fondi quando soddisfano i criteri iniziali di deposito dei token. Gli smart contract possono anche detenere fondi al loro interno, cosa impossibile da realizzare nel mondo tradizionale.

#### Velocità (6:47) {#speed-647}

A seconda dell'intermediario, Alice e Bob potrebbero dover aspettare anche alcuni giorni o settimane per regolare la transizione dei token. E se volessero effettuare uno swap dei token di domenica e l'intermediario non fosse operativo? Con gli smart contract, questo tipo di problemi scompare e il contratto può essere soddisfatto pochi secondi dopo che i criteri iniziali sono stati raggiunti.

#### Costo (7:16) {#cost-716}

I contratti tradizionali non sono costosi solo a causa dell'intermediario che deve trarne profitto: c'è anche un enorme rischio di costi nascosti per cose come l'arbitrato e l'applicazione se ci sono problemi con il contratto.

La riutilizzabilità è un altro vantaggio: lo stesso smart contract responsabile dello swap dei token di Alice e Bob potrebbe essere utilizzato da chiunque altro voglia effettuare uno swap di token. Nel mondo tradizionale, tutti dovrebbero firmare contratti separati e pagare le rispettive commissioni all'intermediario.

#### Frode (7:58) {#fraud-758}

La frode è un altro costo nascosto, questa volta per l'intermediario stesso. L'intermediario dovrebbe assicurarsi che i token di Alice e Bob siano legittimi prima di inizializzare uno swap. Le frodi sono molto comuni nella finanza tradizionale e la maggior parte delle aziende ha enormi team che lavorano esclusivamente sulla prevenzione delle frodi. Con gli smart contract, i token possono essere verificati sulla blockchain e, con le firme digitali, è subito chiaro se sia Alice che Bob sono idonei a spendere i loro token.

#### Casi d'uso (8:42) {#use-cases-842}

Gli smart contract hanno un numero crescente di casi d'uso che vanno dai pagamenti e dalla finanza decentralizzata (DeFi) alla catena di approvvigionamento e al crowdfunding. Gli smart contract sono anche i mattoni fondamentali per le applicazioni decentralizzate (dapp).

#### DeFi (9:07) {#defi-907}

La finanza decentralizzata (DeFi) è uno dei nuovi settori che fa forte affidamento sugli smart contract. Alcune delle cose che sono già state costruite in questo spazio includono:

- **Stablecoin decentralizzate**: con un uso intelligente degli smart contract e di determinati incentivi, possiamo creare una stablecoin ancorata al dollaro USA senza dover conservare dollari nel mondo reale. MakerDAO è uno dei progetti che rende tutto ciò possibile.
- **Fornitura automatizzata di liquidità**: un insieme di smart contract può consentire agli utenti di fornire liquidità ed effettuare swap di token in modo completamente permissionless e decentralizzato. Uniswap e Kyber Network sono buoni esempi di tali protocolli.

#### Crowdfunding e catene di approvvigionamento (10:05) {#crowdfunding-and-supply-chains-1005}

Un altro caso d'uso è fornire maggiore trasparenza alle catene di approvvigionamento, dove entrano in gioco protocolli come OriginTrail. Per quanto riguarda il crowdfunding, puoi immaginare un contratto che sblocca i fondi non appena determinati obiettivi vengono raggiunti e verificati dalla community.

#### Smart contract del futuro (10:29) {#future-smart-contracts-1029}

E se gli smart contract potessero facilitare cose come il ride-sharing, l'affitto di appartamenti e molto altro? Che ne dici della beneficenza? Puoi immaginare un fondo completamente automatizzato che invierebbe denaro direttamente alle persone che ne hanno più bisogno, senza alcun intermediario. Ad esempio, il fondo potrebbe determinare che una certa regione è stata colpita da un uragano e reindirizzare i fondi verso quella parte del mondo. Per ora sembra quasi impossibile, ma tutti gli elementi necessari per far sì che qualcosa del genere accada vengono costruiti proprio in questo momento.

I casi d'uso per gli smart contract sono quasi infiniti, ma prima di poter ottenere tutto ciò, dobbiamo affrontare alcuni problemi:

- **Bug**: uno dei rischi principali quando si tratta di smart contract è qualcosa che perseguita ogni altro software. L'esempio migliore è l'attacco informatico alla DAO, che ha provocato la perdita di milioni di dollari in ether poiché l'aggressore è stato in grado di prosciugare i fondi dallo smart contract. Ciò ha causato un hard fork di Ethereum e ha creato molto disaccordo nella community di Ethereum. Dall'attacco alla DAO, la community di Ethereum ha ideato molte misure di sicurezza aggiuntive. Oggigiorno, quasi tutti gli smart contract popolari sono stati sottoposti a un audit di sicurezza, spesso da parte di più team. C'è anche la tendenza a utilizzare metodi di verifica formale per dimostrare che determinati contratti si comporteranno sempre nel modo previsto.
- **Modifiche al protocollo**: anche se uno smart contract non presenta bug ed è stato verificato, non possiamo comunque garantire che una modifica a livello di piattaforma non causi problemi. Un aggiornamento al protocollo stesso potrebbe far sì che determinati smart contract inizino a comportarsi in modo diverso dal previsto.
- **Dati del mondo reale**: i servizi di oracolo possono fornire un modo affidabile per trasferire informazioni dal mondo reale alla blockchain. Ma immagina di aver noleggiato un appartamento o un'auto e di aver causato danni accidentali. Come potrebbe uno smart contract, senza alcun intervento umano, venirne a conoscenza? Ci sono molteplici esempi in cui è difficile immaginare come qualcosa di inaspettato che accade nel mondo reale possa essere visibile a uno smart contract.

Oltre a quanto sopra, ci sono anche rischi che coinvolgono la regolamentazione e le tasse, ma tutti questi possono essere prima o poi risolti.

#### Possiamo sostituire gli avvocati? (13:58) {#can-we-replace-lawyers-1358}

Quindi possiamo davvero sostituire gli avvocati con il codice? Non proprio, almeno non in questo momento. In futuro, è probabile che sempre più contratti vengano automatizzati, specialmente nella finanza. Ma anche in un mondo completamente automatizzato, gli avvocati possono fornire preziose conoscenze che possono essere tradotte in codice. Ci sono anche molte sfide normative attorno al settore cripto che terranno gli avvocati molto occupati per un po'. Tuttavia, se fossi un avvocato, inizierei a imparare a conoscere gli smart contract e la programmazione, poiché giocheranno un ruolo importante in futuro.

#### Riepilogo (14:53) {#summary-1453}

Pro degli smart contract:

- Completamente automatizzati
- Risultati deterministici
- Trustless
- Veloci, precisi e sicuri
- Convenienti e trasparenti

Contro degli smart contract:

- Bug del software
- Modifiche al protocollo
- Incertezza normativa e fiscale

Anche se gli smart contract comportano determinati rischi, siamo ancora agli inizi e la maggior parte dei problemi attuali è risolvibile.