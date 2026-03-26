---
title: Contratti intelligenti
metaTitle: "Contratti intelligenti: cosa sono e i loro vantaggi"
description: Un'introduzione non tecnica ai contratti intelligenti
lang: it
---

# Introduzione ai contratti intelligenti {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

I contratti intelligenti sono i blocchi di costruzione fondamentali del livello applicativo di [Ethereum](/). Sono programmi informatici archiviati sulla [blockchain](/glossary/#blockchain) che seguono la logica "se questo, allora quello" e la cui esecuzione è garantita secondo le regole definite dal loro codice, che non può essere modificato una volta creato.

Nick Szabo ha coniato il termine "contratto intelligente". Nel 1994, ha scritto [un'introduzione al concetto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e nel 1996 ha scritto [un'esplorazione di ciò che i contratti intelligenti potrebbero fare](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo immaginava un mercato digitale in cui processi automatici e [sicuri a livello crittografico](/glossary/#cryptography) consentissero lo svolgimento di transazioni e funzioni aziendali senza intermediari fidati. I contratti intelligenti su Ethereum mettono in pratica questa visione.

Guarda Finematics che spiega i contratti intelligenti:

<YouTube id="pWGLtjG-F5c" />

## La fiducia nei contratti convenzionali {#trust-and-contracts}

Uno dei problemi principali di un contratto tradizionale è la necessità di individui fidati per portare a termine i risultati del contratto.

Ecco un esempio:

Alice e Bob stanno facendo una gara in bicicletta. Supponiamo che Alice scommetta 10 $ con Bob che vincerà la gara. Bob è sicuro di vincere e accetta la scommessa. Alla fine, Alice finisce la gara con largo anticipo su Bob ed è la chiara vincitrice. Ma Bob si rifiuta di pagare la scommessa, sostenendo che Alice deve aver barato.

Questo banale esempio illustra il problema di qualsiasi accordo non intelligente. Anche se le condizioni dell'accordo vengono soddisfatte (cioè, sei il vincitore della gara), devi comunque fidarti di un'altra persona per adempiere all'accordo (cioè, pagare la scommessa).

## Un distributore automatico digitale {#vending-machine}

Una semplice metafora per un contratto intelligente è un distributore automatico, che funziona in modo un po' simile a un contratto intelligente: input specifici garantiscono output predeterminati.

- Selezioni un prodotto
- Il distributore automatico mostra il prezzo
- Paghi il prezzo
- Il distributore automatico verifica che tu abbia pagato l'importo corretto
- Il distributore automatico ti consegna l'articolo

Il distributore automatico erogherà il prodotto desiderato solo dopo che tutti i requisiti saranno stati soddisfatti. Se non selezioni un prodotto o non inserisci abbastanza denaro, il distributore automatico non ti darà il prodotto.

## Esecuzione automatica {#automation}

Il vantaggio principale di un contratto intelligente è che esegue in modo deterministico un codice inequivocabile quando vengono soddisfatte determinate condizioni. Non c'è bisogno di aspettare che un essere umano interpreti o negozi il risultato. Questo elimina la necessità di intermediari fidati.

Ad esempio, potresti scrivere un contratto intelligente che trattiene fondi in garanzia per un bambino, consentendogli di prelevarli dopo una data specifica. Se cerca di prelevare prima di tale data, il contratto intelligente non verrà eseguito. Oppure potresti scrivere un contratto che ti fornisce automaticamente una versione digitale del certificato di proprietà di un'auto quando paghi il concessionario.

## Risultati prevedibili {#predictability}

I contratti tradizionali sono ambigui perché si affidano agli esseri umani per interpretarli e implementarli. Ad esempio, due giudici potrebbero interpretare un contratto in modo diverso, il che potrebbe portare a decisioni incoerenti e risultati disuguali. I contratti intelligenti eliminano questa possibilità. Invece, i contratti intelligenti vengono eseguiti esattamente in base alle condizioni scritte nel codice del contratto. Questa precisione significa che, date le stesse circostanze, il contratto intelligente produrrà lo stesso risultato.

## Registro pubblico {#public-record}

I contratti intelligenti sono utili per gli audit e il tracciamento. Poiché i contratti intelligenti di Ethereum si trovano su una blockchain pubblica, chiunque può tracciare istantaneamente i trasferimenti di asset e altre informazioni correlate. Ad esempio, puoi controllare per vedere se qualcuno ha inviato denaro al tuo indirizzo.

## Protezione della privacy {#privacy-protection}

I contratti intelligenti proteggono anche la tua privacy. Poiché Ethereum è una rete pseudonima (le tue transazioni sono legate pubblicamente a un indirizzo crittografico univoco, non alla tua identità), puoi proteggere la tua privacy dagli osservatori.

## Termini visibili {#visible-terms}

Infine, come per i contratti tradizionali, puoi controllare cosa c'è in un contratto intelligente prima di firmarlo (o interagire in altro modo con esso). La trasparenza di un contratto intelligente garantisce che chiunque possa esaminarlo.

## Casi d'uso dei contratti intelligenti {#use-cases}

I contratti intelligenti possono fare essenzialmente tutto ciò che possono fare i programmi informatici.

Possono eseguire calcoli, creare valuta, archiviare dati, coniare [NFT](/glossary/#nft), inviare comunicazioni e persino generare grafica. Ecco alcuni esempi popolari del mondo reale:

- [Stablecoin](/stablecoins/)
- [Creazione e distribuzione di asset digitali unici](/nft/)
- [Un exchange di valuta automatico e aperto](/get-eth/#dex)
- [Giochi decentralizzati](/apps/categories/gaming)
- [Una polizza assicurativa che paga automaticamente](https://etherisc.com/)
- [Uno standard che consente alle persone di creare valute personalizzate e interoperabili](/developers/docs/standards/tokens/)

## Letture consigliate {#further-reading}

- [Come i contratti intelligenti cambieranno il mondo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratti intelligenti per sviluppatori](/developers/docs/smart-contracts/)
- [Impara a scrivere contratti intelligenti](/developers/learning-tools/)
- [Mastering Ethereum - Cos'è un contratto intelligente?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />