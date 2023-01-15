---
title: Contratti intelligenti
description: Un'introduzione semplificata ai contratti intelligenti
lang: it
---

# Introduzione ai contratti intelligenti {#introduction-to-smart-contracts}

I contratti intelligenti sono i blocchi di costruzione alla base delle [applicazioni di Ethereum](/dapps/). Sono programmi informatici memorizzati sulla blockchain che consentono di convertire i contratti tradizionali in equivalenti digitali. I contratti intelligenti sono molto logici: seguendo una struttura "se questo, allora quello". Questo significa che seguono precisamente la loro programmazione, e non sono modificabili.

Nick Szabo ha coniato il termine "smart contract" (contratto intelligente). Nel 1994, ha scritto [un'introduzione al concetto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e, nel 1996, [un'esplorazione di ciò che i contratti intelligenti potrebbero fare](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo immaginò un mercato digitale basato su questi processi automatici e crittograficamente sicuri. Un luogo in cui le transazioni e le funzioni aziendali possono verificarsi in modo affidabile, senza intermediari. I contratti intelligenti su Ethereum hanno messo in pratica questa visione.

## Cosa sono i contratti? {#what-are-contracts}

Probabilmente starai pensando: _"Non sono un avvocato! Perché dovrebbero interessarmi i contratti?"_. La maggior parte delle persone, pensando a un contratto, pensa ai lunghi accordi di termini e condizioni, o a noiosi documenti legali.

I contratti sono semplicemente degli accordi. Nelle condizioni di un contratto può essere inserita quindi qualsiasi forma d'accordo. Gli accordi verbali o i contratti su “carta e penna” sono accettabili per molte cose, ma non sono privi di difetti.

### Fiducia e contratti {#trust-and-contracts}

Uno dei più grandi problemi con un contratto tradizionale è la necessità di persone affidabili che portino a termine i risultati del contratto.

Ecco un esempio:

Alice e Bob stanno facendo una gara in bici. Diciamo che Alice scommette con Bob €10 che lei vincerà la gara. Bob è sicuro che sarà lui il vincitore, e accetta la scommessa. Alla fine, Alice finisce la gara prima di Bob ed è la vincitrice indiscussa. Ma Bob si rifiuta di pagare la scommessa, sostenendo che Alice abbia barato.

Questo sciocco esempio illustra il problema con qualsiasi accordo “non intelligente”. Anche se le condizioni dell'accordo sono soddisfatte (quindi, hai vinto la gara), devi comunque fidarti del fatto che un'altra persona soddisfi l'accordo (es., pagare la scommessa).

## Contratti intelligenti {#smart-contracts}

I contratti intelligenti digitalizzano gli accordi, trasformando i termini di un accordo in codice informatico, che si esegue automaticamente quando i termini contrattuali sono soddisfatti.

### Un distributore automatico digitale {#vending-machine}

Una semplice metafora per uno smart contract è un distributore automatico, che funziona in modo molto simile: degli input specifici garantiscono degli output predeterminati.

- Selezioni un prodotto
- Il distributore automatico indica l'importo richiesto per acquistare il prodotto
- Inserisci l'importo corretto
- Il distributore automatico verifica che tu abbia inserito l'importo corretto
- Il distributore automatico eroga il prodotto scelto

Il distributore automatico eroga il prodotto desiderato solo se sono soddisfatti tutti i requisiti. Se non selezioni un prodotto o non inserisci abbastanza denaro, il distributore automatico non ti darà il prodotto.

### Esecuzione automatica {#automation}

Uno dei benefici più significativi che i contratti intelligenti hanno rispetto ai contratti regolari, è che il risultato è eseguito automaticamente alla realizzazione delle condizioni contrattuali. Non serve aspettare che un umano esegua il risultato. In altre parole: i contratti intelligenti rimuovono la necessità di fiducia.

Ad esempio, potresti scrivere un contratto intelligente che detiene i fondi in custodia per un bambino, consentendogli di ritirarli dopo una data specifica. Se provano a prelevare i fondi prima della data specificata, il contratto intelligente non sarà eseguito. Oppure, potresti scrivere un contratto che ti consegna automaticamente una versione digitale del titolo di un auto nel momento in cui paghi il rivenditore.

### Risultati prevedibili {#predictability}

Il fattore umano è uno dei più motivi di fallimento più frequente dei contratti tradizionali. Ad esempio, due singoli giudici potrebbero interpretare un contratto tradizionale in modi differenti. Le loro interpretazioni potrebbero condurre a prendere decisioni differenti e a risultati non omogenei. I contratti intelligenti rimuovono la possibilità di interpretazioni differenti. Invece, i contratti intelligenti si eseguono precisamente secondo le condizioni scritte nel codice del contratto. Questa precisione significa che, date le stesse circostanze, il contratto intelligente produrrà lo stesso risultato.

### Registro pubblico {#public-record}

I contratti intelligenti sono anche utili per i controlli e il monitoraggio. Poiché i contratti intelligenti di Ethereum si trovano su una blockchain pubblica, chiunque può monitorare istantaneamente i trasferimenti di risorse e altre informazioni correlate. Ad esempio puoi verificare che qualcuno abbia inviato denaro al tuo indirizzo.

### Protezione della privacy {#privacy-protection}

I contratti intelligenti, inoltre, possono proteggere la tua privacy. Poiché Ethereum è una rete pseudonima (le tue transazioni sono pubblicamente legate a un indirizzo crittografico univoco, non alla tua identità), puoi proteggere la tua privacy dagli osservatori.

### Termini visibili {#visible-terms}

Infine, come nei contratti, puoi verificare cosa c'è in un contratto intelligente prima di firmarlo (o altrimenti interagirvi). Ancora meglio, la trasparenza pubblica dei termini contrattuali permette a chiunque di esaminarlo.

## Casi d'uso dei contratti intelligenti {#use-cases}

Quindi, i contratti intelligenti sono programmi informatici che risiedono sulla blockchain. Possono eseguirsi automaticamente. Puoi monitorare le loro transazioni, predire come agiscono e persino usarli con uno pseudonimo. Forte! Ma a cosa servono? Beh, i contratti intelligenti possono fare essenzialmente qualsiasi cosa possano fare gli altri programmi informatici.

Possono eseguire calcoli, creare valuta, memorizzare dati, coniare NFT, inviare comunicazioni e persino generare immagini. Ecco alcuni esempi popolari dal mondo reale:

- [Stablecoin](/stablecoins/)
- [Creare e distribuire risorse digitali uniche](/nft/)
- [Un cambio di valuta automatico e aperto](/get-eth/#dex)
- [Giochi decentralizzati](/dapps/?category=gaming)
- [Una polizza assicurativa che paga automaticamente](https://etherisc.com/)
- [Uno standard che consente alle persone di creare valute personalizzate e interoperabili](/developers/docs/standards/tokens/)

## Preferisci un approccio visivo all'apprendimento? {#visual-learner}

Guarda la spiegazione di Finematics sui contratti intelligenti:

<YouTube id="pWGLtjG-F5c" />

## Lettura consigliate {#further-reading}

- [Come i Contratti Intelligenti Cambieranno il Mondo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratti Intelligenti: La Tecnologia della Blockchain Che Sostituirà gli Avvocati](https://blockgeeks.com/guides/smart-contracts/)
- [Contratti intelligenti per sviluppatori](/developers/docs/smart-contracts/)
- [Impara a scrivere i contratti intelligenti](/developers/learning-tools/)
- [Padroneggiare Ethereum - Cos'è un Contratto Intelligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
