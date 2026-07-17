---
title: "Come creare app per la privacy su Ethereum con le prove a conoscenza zero"
description: "Un modello riutilizzabile alimenta il voto anonimo, i mixer, gli airdrop e i sistemi di appartenenza su Ethereum. Scopri il ciclo commitment-nullifier-prova e come gli strumenti a conoscenza zero ne rendono pratica la creazione oggi."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "prove a conoscenza zero"
  - "privacy"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: App per la privacy su Ethereum
lang: it
---

Ethereum è radicalmente pubblico per concezione. Ogni indirizzo, saldo, transazione, chiamata di contratto ed evento è visibile a chiunque abbia un block explorer. Questa trasparenza è utile quando si desidera la verificabilità. È un problema quando gli utenti devono votare, effettuare un riscatto, un prelievo o dimostrare l'appartenenza senza collegare ogni azione allo stesso portafoglio.

L'appartenenza anonima è il modello riutilizzabile che alimenta un'ampia classe di app per la privacy su Ethereum. Le persone si registrano prima, per poi dimostrare in seguito di appartenere al gruppo senza rivelare quale membro siano. Una prova a conoscenza zero è il ponte tra il portafoglio di registrazione e il portafoglio operativo, e il ponte non rivela chi lo ha attraversato.

Il prodotto circostante cambia, ma lo scheletro della privacy rimane lo stesso.

## Il modello, spiegato attraverso il voto anonimo {#the-pattern-explained-through-anonymous-voting}

Il modello è composto da tre elementi. Un commitment registra ogni membro. Un albero di Merkle trasforma quei commitment in una folla. Una prova e un nullifier consentono a un membro di agire una volta senza rivelare quale membro abbia agito.

### Fase uno: la registrazione {#step-one-registering}

Ogni elettore crea due valori privati offchain, il segreto e il nullifier. L'elettore esegue l'hash di questi valori in un commitment pubblico, quindi registra quel commitment onchain.

Il commitment è il record di registrazione pubblico. Il segreto e il nullifier sono la nota privata di cui l'elettore avrà bisogno in seguito. Se perde la nota, l'elettore non può dimostrare l'appartenenza. Se la trapela, qualcun altro potrebbe essere in grado di votare al posto dell'utente.

Poiché il commitment è un hash, gli osservatori non possono recuperare i valori privati al suo interno. Il commitment dice "qualcuno si è registrato" senza rivelare chi utilizzerà in seguito quella registrazione.

### Fase due: costruire la folla {#step-two-building-the-crowd}

Man mano che più elettori si registrano, l'app raccoglie i loro commitment in un albero di Merkle. Un albero di Merkle comprime una lunga lista di valori in un singolo hash, chiamato radice. Cambiando qualsiasi valore nella lista, l'hash cambia, quindi la radice funge da riepilogo a prova di manomissione dell'intero set.

Quell'albero è il tuo set di anonimato. Se dieci utenti sono nell'albero, un osservatore può restringere un'azione successiva a uno di quei dieci. Se diecimila utenti sono nell'albero, l'azione è molto più difficile da collegare a una singola persona. Un'app privata con un set di anonimato minuscolo di solito non è molto privata, anche se la crittografia è corretta.

### Fase tre: agire in modo anonimo {#step-three-acting-anonymously}

Quando si apre il sondaggio, l'elettore non dovrebbe votare dallo stesso portafoglio che ha registrato il commitment. Votare dal portafoglio di registrazione collegherebbe il voto direttamente a chi si è registrato e vanificherebbe il lavoro sulla privacy. Invece, l'elettore crea una prova a conoscenza zero. L'affermazione è codificata come un circuito che dice: "Conosco i valori privati che producono un commitment registrato e sto rivelando l'hash del nullifier corretto per questo sondaggio".

La prova convince il contratto del verificatore che l'affermazione è vera. Non rivela il segreto, il nullifier o quale commitment sia stato utilizzato.

Il nullifier è ciò che impedisce il doppio voto. Insieme alla prova, l'elettore pubblica un hash del nullifier. Il contratto di voto memorizza quell'hash dopo aver accettato il voto. Se la stessa nota privata viene utilizzata di nuovo per lo stesso sondaggio, produce lo stesso hash del nullifier e il contratto rifiuta il secondo voto. In combinazione con la prova, questo fa sì che il contratto sappia solo che un elettore registrato ha agito una volta, non quale.

## Il cancello riutilizzabile {#the-reusable-gate}

Quella stessa coppia prova-e-nullifier funziona oltre il voto. Togliendo la storia del voto, ciò che si ottiene è un cancello per la privacy per le funzioni degli smart contract.

Prima che la funzione venga eseguita, il contratto controlla la radice di Merkle, verifica la prova, conferma che l'hash del nullifier non sia stato utilizzato e vincola gli input pubblici all'app, alla catena, al sondaggio, al riscatto o al prelievo corretti. Se questi controlli vengono superati, contrassegna il nullifier come utilizzato ed esegue il resto della funzione.

Metti quel cancello davanti a un voto e ottieni il voto anonimo. Mettilo davanti a un riscatto di airdrop e ottieni riscatti anonimi. Mettilo davanti a una funzione di prelievo e ottieni il nucleo di un flusso di prelievo in stile mixer. Stesso albero dei commitment, stessa idea di nullifier, stesso modello di prova. Ciò che cambia è il corpo della funzione e la logica dell'app circostante.

## Cosa viene eseguito e dove {#what-runs-where}

Il lavoro privato di solito avviene offchain. L'utente memorizza la nota e un'app client costruisce il testimone ed esegue il prover per produrre la prova. Un indicizzatore traccia i commitment e le radici di Merkle. Un bundler propaga l'operazione utente onchain e un paymaster ERC-4337 sponsorizza il gas, in modo che un portafoglio nuovo non abbia prima bisogno di ETH dal portafoglio noto di un utente.

L'applicazione pubblica avviene onchain. Il contratto del verificatore controlla la prova. Il contratto dell'app controlla le radici valide e i nullifier non utilizzati, memorizza l'hash del nullifier ed esegue l'azione pubblica.

L'esperienza utente (UX) sensibile è la gestione delle note. Tratta il segreto e il nullifier come chiavi. Non inserirli in analisi, log, URL, segnalazioni di errori o nella normale telemetria lato server. Una volta che la nota trapela, la privacy è persa, non importa quanto sia forte la prova.

## Gli strumenti si sono messi al passo {#the-tooling-caught-up}

Non è necessario codificare a mano la crittografia sottostante. Un percorso comune è scrivere il circuito in un linguaggio a conoscenza zero di alto livello, generare un verificatore Solidity e chiamare quel verificatore dal contratto dell'app.

Lo stack giusto dipende dal lavoro. Circom con snarkjs è un percorso consolidato da tempo per i circuiti a livello di app. Noir con Barretenberg è un percorso più recente e facile per gli sviluppatori. Halo2 e gnark sono librerie di circuiti di livello inferiore. Le zkVM come RISC Zero o SP1 dimostrano programmi normali, ma possono essere più costose da dimostrare rispetto a un piccolo circuito personalizzato.

Per l'appartenenza anonima, affidati a un protocollo esistente prima di scrivere il tuo circuito. Semaphore pacchettizza l'appartenenza al gruppo e la prevenzione del doppio utilizzo basata su nullifier in contratti e librerie JavaScript. Per il voto privato e la governance, MACI è il percorso specializzato perché aggiunge proprietà anti-collusione. I protocolli maturi sono spesso più sicuri dei nuovi circuiti.

## La prova non è sufficiente {#the-proof-is-not-enough}

Anche una prova perfetta fallisce se il flusso del portafoglio fa trapelare il collegamento. Registrati dal portafoglio A e in seguito agisci dal portafoglio A, e chiunque stia guardando può collegare le transazioni. Finanzia il portafoglio B dal portafoglio A subito prima di agire, e quella transazione di finanziamento crea lo stesso problema.

Questo è il motivo per cui i bundler e i paymaster sono importanti. Il portafoglio operativo dovrebbe essere nuovo e non dovrebbe aver bisogno di ricevere ETH da un portafoglio che l'utente sta cercando di separare dall'azione.

Lo stesso problema esiste offchain. L'invio di transazioni di registrazione e di azione dallo stesso indirizzo IP, provider RPC o sessione può indebolire la privacy fornita dal circuito. I frontend possono avere perdite attraverso analisi, archiviazione locale e log di supporto. Una prova a conoscenza zero nasconde i valori all'interno della prova. Non nasconde tutto ciò che circonda la transazione.

Gli input pubblici sono un altro punto in cui le app per la privacy falliscono. Qualsiasi cosa contrassegnata come pubblica nel circuito, emessa come evento, inclusa nei dati di chiamata o memorizzata dal contratto è visibile. Rivedi gli input pubblici con la stessa attenzione del controllo degli accessi su un contratto Solidity.

## Cosa cambia questo per gli sviluppatori {#what-this-changes-for-builders}

La privacy su Ethereum è realizzabile. Gli sviluppatori possono comporre i pezzi in applicazioni reali. Lo stack è un circuito per l'affermazione privata, un verificatore per il controllo della prova, un contratto dell'app per le regole pubbliche, un indicizzatore per i dati di Merkle e un bundler più un paymaster per l'invio non collegabile e la sponsorizzazione del gas.

Le parti difficili sono la progettazione del prodotto, la gestione delle chiavi, l'igiene dei metadati, gli audit e la crescita del set di anonimato. Sbaglia una qualsiasi di queste e la privacy fornita dalla prova svanisce.

## Letture consigliate {#further-reading}

1. [Prove a conoscenza zero (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Documentazione di Semaphore](https://docs.semaphore.pse.dev/)
3. [Documentazione di MACI](https://maci.pse.dev/)
4. [Documentazione di Circom](https://docs.circom.io/)
5. [Documentazione di Noir](https://noir-lang.org/)
6. [Libro su Halo2](https://zcash.github.io/halo2/)
7. [Documentazione di gnark](https://docs.gnark.consensys.io/)
8. [Documentazione di RISC Zero](https://dev.risczero.com/api/)
9. [Documentazione di SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Astrazione dell'account tramite il contratto EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)