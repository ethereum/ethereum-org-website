---
title: Introduzione agli smart contract
metaTitle: "Smart contract: cosa sono e i loro vantaggi"
description: Un'introduzione non tecnica agli smart contract
lang: it
---

Gli smart contract sono i mattoni fondamentali del livello applicativo di [Ethereum](/). Sono programmi informatici archiviati sulla [blockchain](/glossary/#blockchain) che seguono la logica "se accade questo, allora fai quello" (if this then that) e la cui esecuzione è garantita secondo le regole definite dal loro codice, che non può essere modificato una volta creato.

Nick Szabo ha coniato il termine "smart contract". Nel 1994, ha scritto [un'introduzione al concetto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e nel 1996 ha scritto [un'esplorazione di ciò che gli smart contract potrebbero fare](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo immaginava un mercato digitale in cui processi automatici e [crittograficamente sicuri](/glossary/#cryptography) consentissero lo svolgimento di transazioni e funzioni aziendali senza intermediari fidati. Gli smart contract su Ethereum mettono in pratica questa visione.

Guarda Finematics che spiega gli smart contract:

<VideoWatch slug="smart-contracts-code-is-law" />

## La fiducia nei contratti convenzionali {#trust-and-contracts}

Uno dei problemi principali di un contratto tradizionale è la necessità di individui fidati che portino a termine i risultati del contratto.

Ecco un esempio:

Alice e Bob stanno facendo una gara in bicicletta. Supponiamo che Alice scommetta 10 $ con Bob che vincerà la gara. Bob è sicuro di vincere e accetta la scommessa. Alla fine, Alice finisce la gara con molto anticipo rispetto a Bob ed è la chiara vincitrice. Ma Bob si rifiuta di pagare la scommessa, sostenendo che Alice deve aver barato.

Questo stupido esempio illustra il problema di qualsiasi accordo non "smart". Anche se le condizioni dell'accordo vengono soddisfatte (cioè, sei il vincitore della gara), devi comunque fidarti di un'altra persona affinché adempia all'accordo (cioè, paghi la scommessa).

## Un distributore automatico digitale {#vending-machine}

Una semplice metafora per uno smart contract è un distributore automatico, che funziona in modo un po' simile a uno smart contract: input specifici garantiscono output predeterminati.

- Selezioni un prodotto
- Il distributore automatico mostra il prezzo
- Paghi il prezzo
- Il distributore automatico verifica che tu abbia pagato l'importo corretto
- Il distributore automatico ti consegna l'articolo

Il distributore automatico erogherà il prodotto desiderato solo dopo che tutti i requisiti saranno stati soddisfatti. Se non selezioni un prodotto o non inserisci abbastanza denaro, il distributore automatico non ti darà il prodotto.

## Esecuzione automatica {#automation}

Il vantaggio principale di uno smart contract è che esegue in modo deterministico un codice inequivocabile quando vengono soddisfatte determinate condizioni. Non c'è bisogno di aspettare che un essere umano interpreti o negozi il risultato. Questo elimina la necessità di intermediari fidati.

Ad esempio, potresti scrivere uno smart contract che trattiene dei fondi in garanzia (escrow) per un bambino, consentendogli di prelevarli dopo una data specifica. Se cerca di prelevarli prima di tale data, lo smart contract non verrà eseguito. Oppure potresti scrivere un contratto che ti fornisce automaticamente una versione digitale del certificato di proprietà di un'auto quando paghi il concessionario.

## Risultati prevedibili {#predictability}

I contratti tradizionali sono ambigui perché si affidano agli esseri umani per interpretarli e implementarli. Ad esempio, due giudici potrebbero interpretare un contratto in modo diverso, il che potrebbe portare a decisioni incoerenti e risultati disuguali. Gli smart contract eliminano questa possibilità. Al contrario, gli smart contract vengono eseguiti in modo preciso in base alle condizioni scritte all'interno del codice del contratto. Questa precisione significa che, date le stesse circostanze, lo smart contract produrrà lo stesso risultato.

## Registro pubblico {#public-record}

Gli smart contract sono utili per gli audit e il tracciamento. Poiché gli smart contract di Ethereum si trovano su una blockchain pubblica, chiunque può tracciare istantaneamente i trasferimenti di asset e altre informazioni correlate. Ad esempio, puoi verificare che qualcuno abbia inviato denaro al tuo indirizzo.

## Protezione della privacy {#privacy-protection}

Gli smart contract proteggono anche la tua privacy. Poiché Ethereum è una rete pseudonima (le tue transazioni sono legate pubblicamente a un indirizzo crittografico univoco, non alla tua identità), puoi proteggere la tua privacy dagli osservatori.

## Termini visibili {#visible-terms}

Infine, come per i contratti tradizionali, puoi controllare cosa c'è in uno smart contract prima di firmarlo. A differenza di un contratto tradizionale, la trasparenza onchain di uno smart contract consente a chiunque di esaminarlo e revisionarlo prima di interagirvi. 

Tuttavia, sebbene chiunque possa visualizzare i termini di uno smart contract, i dati grezzi della transazione sono progettati per essere interpretati da applicazioni e portafogli, non dagli esseri umani. Poiché questi dati sono così difficili da leggere, gli utenti affrontano spesso un grave rischio per la sicurezza chiamato "firma alla cieca" (blind signing), ovvero l'approvazione di una transazione che interagisce con uno smart contract senza capire effettivamente cosa farà. 

L'ecosistema di Ethereum sta passando agli standard di **[Firma in chiaro (Clear Signing)](https://clearsigning.org/)** (nello specifico [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). La firma in chiaro traduce i dati opachi degli smart contract in descrizioni delle transazioni semplici e leggibili dall'uomo, garantendo che chiunque possa comprendere il vero intento di un contratto prima di firmare.

## Casi d'uso degli smart contract {#use-cases}

Gli smart contract possono fare essenzialmente tutto ciò che possono fare i programmi informatici.

Possono eseguire calcoli, creare valuta, archiviare dati, coniare [NFT](/glossary/#nft), inviare comunicazioni e persino generare grafica. Ecco alcuni esempi popolari nel mondo reale:

- [Stablecoin](/stablecoins/)
- [Creazione e distribuzione di asset digitali unici](/nft/)
- [Un cambio valuta automatico e aperto](/get-eth/#dex)
- [Gaming decentralizzato](/apps/categories/gaming)
- [Una polizza assicurativa che paga automaticamente](https://etherisc.com/)
- [Uno standard che consente alle persone di creare valute personalizzate e interoperabili](/developers/docs/standards/tokens/)

## Letture consigliate {#further-reading}

- [Come gli smart contract cambieranno il mondo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart contract per sviluppatori](/developers/docs/smart-contracts/)
- [Impara a scrivere smart contract](/developers/learning-tools/)
- [Mastering Ethereum - Cos'è uno smart contract?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />