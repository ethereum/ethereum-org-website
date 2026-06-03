---
title: "Costruire su Ethereum nel 2026: cosa è cambiato"
description: "Tre aggiornamenti del protocollo dal 2023 hanno cambiato due cose a cui tengono i costruttori: quanto costa usare il layer 1 (L1) e cosa possono fare i normali portafogli. Una guida pratica per costruire su Ethereum nel 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "commissioni del gas"
  - "astrazione dell'account"
  - "aggiornamenti del protocollo"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Costruire su Ethereum nel 2026
lang: it
---

Se il tuo modello mentale di Ethereum si è formato tra il 2021 e il 2023, è obsoleto. Tre aggiornamenti del protocollo da allora, [Dencun](/roadmap/dencun/) a marzo 2024, [Pectra](/roadmap/pectra/) a maggio 2025 e [Fusaka](/roadmap/fusaka/) a dicembre 2025, hanno cambiato due cose a cui tengono i costruttori: quanto costa usare il layer 1 (L1) e cosa possono fare i normali portafogli.

## La Mainnet è di nuovo economica {#mainnet-is-cheap-again}

Il regime delle commissioni dal 2021 al 2023 non è più un'ipotesi predefinita sicura.

Al 5 maggio 2026, il tracker del gas di Etherscan mostra il gas standard a circa 0,15 Gwei, con medie giornaliere vicine a 0,5 Gwei per tutto aprile. Un trasferimento di base di ETH costa meno di un centesimo a quel livello, con le giornate recenti tipiche che si attestano su pochi centesimi. La tendenza è stata al ribasso in ciascuno dei recenti aggiornamenti e il prossimo, [Glamsterdam](/roadmap/glamsterdam/), è destinato a spingere le commissioni ancora più in basso. Questo rende l'affermazione "la Mainnet di Ethereum è troppo costosa per la maggior parte delle app" un punto di partenza superato.

Se vuoi una semplice regola empirica, usa la matematica del gas invece delle vecchie credenze. A 0,5 Gwei, la recente media di aprile, e con ETH a circa 2.350 $, i costi indicativi si presentano così.

| Operazione | Gas utilizzato | Costo indicativo |
| :-------------- | :---------- | :---------------- |
| Trasferimento di ETH | 21.000 | **0,025 $** |
| Trasferimento ERC-20 | \~65.000 | **0,076 $** |
| Approvare ERC-20 | \~46.000 | **0,054 $** |
| Swap | \~180.000 | **0,21 $** |
| Distribuire ERC-20 | \~1.200.000 | **1,41 $** |

Questi sono esempi, non garanzie. I costi variano in base al prezzo di ETH, al prezzo del gas e alla complessità del contratto. Le letture in Gwei possono oscillare ampiamente all'interno di un mese normale mentre il costo in dollari si muove a malapena, perché i rollup ora gestiscono circa il 95 percento delle transazioni di Ethereum e il layer 1 (L1) in genere funziona ben al di sotto del suo obiettivo di blocco. Le commissioni della Mainnet sono ora abbastanza basse da consentire a molte app di funzionare in modo sensato sulla Mainnet.

### Perché i costi sono diminuiti {#why-costs-fell}

Tre aggiornamenti hanno fatto la maggior parte del lavoro.

Dencun (marzo 2024) ha introdotto l'EIP-4844 e ha fornito ai rollup la propria corsia dati attraverso i blob, con un mercato delle commissioni separato. I rollup hanno smesso di competere con il normale traffico di esecuzione sullo stesso spazio del blocco.

Pectra è stato attivato il 7 maggio 2025. L'EIP-7691 ha aumentato la capacità transazionale dei blob da 3 target / 6 blob massimi per blocco a 6 target / 9 massimi, il che ha ampliato la corsia dati economica utilizzata dai rollup e ha spinto le commissioni del layer 2 (L2) ancora più in basso.

Fusaka è stato attivato il 3 dicembre 2025. La sua principale modifica alla capacità è stata PeerDAS, che consente ai validatori di campionare i dati dei blob invece di scaricare ogni blob per intero, e questo campionamento è ciò che rende sicuri conteggi di blob più elevati a livello di rete. Parallelamente, la community ha aumentato il limite di gas del layer 1 (L1) da 30M a 60M nel corso del 2025 e l'EIP-7935 di Fusaka ha standardizzato 60M come nuovo valore predefinito. L'EIP-7825 limita ogni singola transazione a \~16,78M di gas, cosa che la maggior parte delle app non noterà mai, ma le distribuzioni molto grandi e le multicall monolitiche ora devono rientrarvi. L'EIP-7951 ha anche aggiunto la verifica nativa secp256r1 (P-256) sulla Mainnet, il che rende le firme passkey e WebAuthn molto più economiche da verificare nei flussi degli account.

L'effetto netto è che la Mainnet non ha più i prezzi di una catena permanentemente congestionata.

## Come l'EIP-7702 cambia il modello degli account {#how-eip-7702-changes-the-account-model}

Pectra ha anche introdotto l'EIP-7702, che offre ai normali portafogli l'accesso a comportamenti da smart account come il batching, la sponsorizzazione del gas, le chiavi di sessione, i flussi di recupero e un'esperienza utente (UX) adatta alle passkey, senza costringere l'utente a migrare verso un nuovo account.

Funziona aggiungendo un nuovo tipo di transazione (tipo `0x04`, `SetCode`) che consente a un EOA di impostare un puntatore al codice del contratto già distribuito. L'utente mantiene lo stesso indirizzo, la chiave EOA originale mantiene il controllo finale sull'account e la delega può essere successivamente modificata o ripristinata all'indirizzo nullo.

Per i costruttori di app, il cambiamento pratico consiste nel chiedere al portafoglio il risultato, non la configurazione a basso livello dell'EIP-7702. Se un utente ha bisogno di approvare e fare uno swap in un unico flusso, richiedi un batch tramite l'ERC-5792 `wallet_sendCalls`. Il portafoglio può decidere se utilizzare l'EIP-7702, l'ERC-4337 o un altro sistema di account.

Il codice delegato è un confine di sicurezza. Se un portafoglio punta un EOA verso un codice difettoso o dannoso, quel codice può effettuare chiamate per conto dell'utente, incluse le approvazioni di token, i trasferimenti e le interazioni con le app. I costruttori dovrebbero trattare gli obiettivi di delega come infrastruttura del portafoglio, affidandosi a implementazioni verificate dal portafoglio e non chiedendo agli utenti di delegare casualmente a codice controllato dall'app.

## Cosa cambia questo nel modo di costruire {#what-this-changes-about-how-to-build}

La domanda predefinita dei costruttori era "quale layer 2 (L2) è abbastanza economico?". Quella domanda ha ancora delle risposte, ma non è l'unica. Con le commissioni del layer 1 (L1) nell'ordine dei centesimi per transazione durante il carico normale e l'EIP-7702 che consente a qualsiasi portafoglio di esporre l'UX degli smart account senza migrare gli indirizzi, l'impostazione predefinita più utile è chiedersi se l'app debba risiedere sulla Mainnet o se uno specifico L2 offra un reale vantaggio in termini di distribuzione, liquidità o UX che l'L1 non può offrire.

Anche l'ipotesi sull'account cambia. Non progettare nuove app come se ogni account utente fosse un semplice EOA ECDSA che deve possedere ETH prima di fare qualsiasi cosa utile. Preferisci interfacce di batching a livello di portafoglio come l'ERC-5792 `wallet_sendCalls`, presumi che la sponsorizzazione del gas e le chiavi di sessione diventeranno normali funzionalità del portafoglio e tratta le passkey e i flussi di recupero come parte della superficie UX dell'account piuttosto che come espedienti di inserimento separati.

## Cosa ci aspetta {#whats-next}

Il prossimo aggiornamento con nome di Ethereum è Glamsterdam, con le Block-level Access Lists (BAL) e la separazione proponente-costruttore (PBS) integrata (ePBS) come elementi di punta. Insieme, questi rendono sicuro aumentare il limite di gas del blocco dagli attuali 60 milioni a circa 200 milioni, lasciando maggiore capacità sul layer 1 (L1) con cui i costruttori possono lavorare. L'attivazione è prevista nella seconda metà del 2026. Dopo Glamsterdam, è previsto che segua [Hegotá](https://forkcast.org/upgrade/hegota/), con le Fork-choice enforced Inclusion Lists (FOCIL) selezionate come sua funzionalità principale.

Per i costruttori, gli elementi che vale la pena monitorare sono una maggiore capacità del layer 1 (L1) (BAL), un'inclusione delle transazioni più affidabile (FOCIL) e il percorso verso l'astrazione dell'account nativa. L'ePBS, l'altra novità di Glamsterdam, è principalmente un cambiamento infrastrutturale che rimuove una dipendenza di fiducia nell'inclusione delle transazioni sul layer 1 (L1). Il cambiamento diretto della superficie a livello di app è minimo.

Le BAL servono a mantenere economico il layer 1 (L1) man mano che l'utilizzo cresce. In parole povere, un blocco verrebbe fornito con una mappa degli account e dello spazio di archiviazione che tocca. I client possono utilizzare quella mappa per precaricare i dati ed eseguire transazioni indipendenti in parallelo, il che rende più sicuro aumentare il limite di gas del layer 1 (L1) senza rendere i blocchi troppo lenti da verificare. L'effetto pratico per i costruttori è che più attività possono tornare sulla Mainnet senza ricreare automaticamente il regime del gas del periodo 2021-2023.

FOCIL riguarda l'inserimento di transazioni valide nei blocchi anche quando un produttore di blocchi preferirebbe tralasciarle. Oggi, se la parte che costruisce un blocco ignora una transazione, il resto del protocollo ha modi limitati per forzarne l'inserimento. Con l'EIP-7805, diversi validatori direbbero, in effetti, "abbiamo visto queste transazioni valide in attesa nella mempool pubblica". Il blocco successivo deve quindi includerle, oppure i validatori possono rifiutarsi di supportare quel blocco. Per i costruttori, questo è importante quando l'accesso affidabile al layer 1 (L1) fa parte del prodotto, inclusi gli strumenti per la privacy, le rampe di accesso regolamentate o le app che servono utenti che potrebbero essere filtrati da alcuni fornitori di infrastrutture.

Per i costruttori di app, l'elemento di Hegotá da osservare più da vicino è l'astrazione dell'account. L'EIP-8141, Frame Transactions, aggiungerebbe un tipo di transazione in cui la convalida, l'esecuzione e il pagamento del gas sono suddivisi in frame. In pratica, ciò significa che uno smart account potrebbe verificare una transazione da solo, definire le proprie regole di firma, approvare chi paga il gas ed eseguire una o più azioni senza dipendere dall'EntryPoint dell'ERC-4337, dai bundler o dai relayer gestiti dall'app.

Questo cambia le ipotesi sul prodotto. La sponsorizzazione del gas diventa un modello di account nativo invece di un'infrastruttura che ogni app deve organizzare separatamente. Gli schemi di firma alternativi diventano più facili da supportare, incluse le passkey oggi e un percorso di allontanamento dall'ECDSA se la migrazione post-quantistica dovesse rendersi necessaria. Se l'EIP-8141 o un simile design di astrazione dell'account nativa dovesse arrivare, il modello del costruttore passerebbe da "un EOA firma una transazione" a "un account definisce come convalida, paga ed esegue una transazione".

Questa è la direzione, non una promessa. L'EIP-8141 è in bozza (Draft) e, a partire da maggio 2026, è solo "considerato per l'inclusione" in Hegotá, il che significa che i team dei client ne stanno discutendo ma non si sono impegnati a rilasciarlo in quell'aggiornamento. Il percorso pratico di costruzione del 2026 per l'UX dell'account è ancora l'EIP-7702 più i flussi del portafoglio ERC-4337, ma i costruttori dovrebbero progettare come se gli account programmabili stessero diventando il modello di account predefinito.

## Cosa costruire diversamente ora {#what-to-build-differently-now}

Inizia ricontrollando le vecchie ipotesi sulle commissioni. Se il tuo manuale di distribuzione tratta ancora la Mainnet di Ethereum come un ambiente da 10 a 30 Gwei per impostazione predefinita, probabilmente sta deviando troppo lavoro lontano dal layer 1 (L1). Vale la pena considerare prima la Mainnet quando la tua app dipende da liquidità condivisa, componibilità con i protocolli esistenti, neutralità o uno stato di alto valore che dovrebbe risiedere dove la sicurezza e il consenso sociale di Ethereum sono più forti.

Usa i layer 2 (L2) per i motivi che contano ancora, tra cui la distribuzione, un volume di transazioni molto elevato, ecosistemi specifici per le app o costi per azione che devono essere il più vicino possibile allo zero. Il punto non è "la Mainnet per tutto". Il punto è che "la Mainnet è troppo costosa" non dovrebbe più essere il primo filtro.

Sul lato dell'account, costruisci in base alle capacità del portafoglio invece che su semplici EOA. Il tuo frontend dovrebbe essere pronto per chiamate in batching, gas sponsorizzato, chiavi di sessione, passkey e flussi di recupero in arrivo tramite i portafogli. L'EIP-7702 e l'ERC-4337 sono gli strumenti pratici di oggi. L'astrazione dell'account nativa è la direzione da seguire in futuro.

Smetti di trattare la Mainnet di Ethereum come il costoso layer di regolamento che tocchi solo alla fine e smetti di trattare gli account utente come chiavi ECDSA statiche che devono possedere ETH prima di poter fare qualsiasi cosa. Ethereum nel 2026 si sta muovendo verso un'esecuzione sul layer 1 (L1) più economica e account programmabili. Costruisci per quel mondo.

## Letture consigliate {#further-reading}

- [Annuncio della Mainnet di Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Annuncio della Mainnet di Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Aggiornamento delle priorità del protocollo per il 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Checkpoint #9 (apr 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Linee guida per Pectra 7702 su ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702: Impostare il codice per gli EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928: Block-level Access Lists](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805: Fork-choice enforced Inclusion Lists (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141: Frame Transaction](https://eips.ethereum.org/EIPS/eip-8141)
- [Forkcast: Aggiornamento Hegotá](https://forkcast.org/upgrade/hegota/)
- [Tracker del gas di Etherscan](https://etherscan.io/gastracker)
- [EIP-7773: Meta dell'hard fork Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Roadmap di Glamsterdam su ethereum.org](https://ethereum.org/roadmap/glamsterdam/)