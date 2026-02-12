---
title: Contratti intelligenti
metaTitle: "Contratti intelligenti: cosa sono e quali sono i loro vantaggi"
description: Un'introduzione semplificata ai contratti intelligenti
lang: it
---

# Introduzione ai contratti intelligenti {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

I contratti intelligenti sono gli elementi fondamentali che costituiscono il livello di applicazione di Ethereum. Sono programmi informatici memorizzati sulla [blockchain](/glossary/#blockchain) che seguono la logica "se questo, allora quello" e la cui esecuzione è garantita secondo le regole definite dal loro codice, il quale non può essere modificato una volta creato.

Nick Szabo ha coniato il termine "smart contract" (contratto intelligente). Nel 1994, ha scritto [un'introduzione al concetto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) e nel 1996 ha scritto [un'esplorazione di ciò che i contratti intelligenti potrebbero fare](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo immaginava un marketplace digitale in cui processi automatici e [crittograficamente sicuri](/glossary/#cryptography) consentissero di effettuare transazioni e funzioni commerciali senza intermediari fidati. I contratti intelligenti su Ethereum hanno messo in pratica questa visione.

Guarda la spiegazione di Finematics sui contratti intelligenti:

<YouTube id="pWGLtjG-F5c" />

## Fiducia nei contratti convenzionali {#trust-and-contracts}

Uno dei più grandi problemi di un contratto tradizionale è la necessità di persone fidate che portino a termine i risultati del contratto.

Ecco un esempio:

Alice e Bob stanno facendo una gara in bici. Diciamo che Alice scommette con Bob €10 che vincerà lei la gara. Bob è sicuro che sarà lui il vincitore, e accetta la scommessa. Alla fine, Alice finisce la gara prima di Bob ed è la vincitrice indiscussa. Ma Bob si rifiuta di pagare la scommessa, sostenendo che Alice abbia barato.

Questo sciocco esempio illustra il problema di qualsiasi accordo “non intelligente”. Anche se le condizioni dell'accordo vengono soddisfatte (cioè, si è il vincitore della gara), è comunque necessario fidarsi che un'altra persona adempia all'accordo (cioè, paghi la scommessa).

## Un distributore automatico digitale {#vending-machine}

Una semplice metafora per un contratto intelligente è un distributore automatico, che funziona in modo simile a un contratto intelligente: degli input specifici garantiscono degli output predeterminati.

- Selezioni un prodotto
- Il distributore automatico mostra il prezzo
- Tu paghi il prezzo
- Il distributore automatico verifica che tu abbia pago l'importo corretto
- Il distributore automatico ti dà il tuo articolo

Il distributore automatico eroga il prodotto desiderato solo se sono soddisfatti tutti i requisiti. Se non selezioni un prodotto o non inserisci abbastanza denaro, il distributore automatico non ti darà il prodotto.

## Esecuzione automatica {#automation}

Il vantaggio principale di un contratto intelligente è che esegue in modo deterministico un codice non ambiguo quando vengono soddisfatte determinate condizioni. Non è necessario attendere che una persona interpreti o negozi il risultato. In questo modo si elimina la necessità di intermediari fidati.

Ad esempio, potresti scrivere un contratto intelligente che detiene i fondi in custodia per un bambino, consentendogli di ritirarli dopo una data specifica. Se questi prova a prelevare i fondi prima della data specificata, il contratto intelligente non sarà eseguito. Oppure, potresti scrivere un contratto che ti consegni automaticamente una versione digitale del certificato di proprietà di un auto, al pagamento del concessionario.

## Risultati prevedibili {#predictability}

I contratti tradizionali sono ambigui perché si affidano all'uomo per interpretarli e attuarli. Ad esempio, due giudici potrebbero interpretare un contratto in modo diverso, il che potrebbe portare a decisioni discordanti e a risultati iniqui. I contratti intelligenti eliminano questa possibilità. Al contrario, i contratti intelligenti si eseguono precisamente secondo le condizioni scritte nel codice del contratto. Questa precisione fa sì che, date le stesse circostanze, il contratto intelligente produrrà lo stesso risultato.

## Registro pubblico {#public-record}

I contratti intelligenti sono utili per le verifiche e il monitoraggio. Poiché i contratti intelligenti di Ethereum si trovano su una blockchain pubblica, chiunque può monitorare istantaneamente i trasferimenti di risorse e altre informazioni correlate. Ad esempio, è possibile verificare se qualcuno ha inviato denaro al proprio indirizzo.

## Protezione della privacy {#privacy-protection}

I contratti intelligenti, inoltre, proteggono la tua privacy. Poiché Ethereum è una rete pseudonima (le tue transazioni sono pubblicamente legate a un indirizzo crittografico univoco, non alla tua identità), puoi proteggere la tua privacy dagli osservatori.

## Termini visibili {#visible-terms}

Infine, come per i contratti tradizionali, è possibile verificare il contenuto di un contratto intelligente prima di firmarlo (o d'interagire con esso in altro modo). La trasparenza di un contratto intelligente garantisce che chiunque possa esaminarlo.

## Casi d'uso dei contratti intelligenti {#use-cases}

I contratti intelligenti possono fare essenzialmente tutto ciò che possono fare i programmi informatici.

Possono eseguire calcoli, creare valuta, memorizzare dati, coniare [NFT](/glossary/#nft), inviare comunicazioni e persino generare grafiche. Ecco alcuni esempi popolari dal mondo reale:

- [Stablecoin](/stablecoins/)
- [Creazione e distribuzione di asset digitali unici](/nft/)
- [Una piattaforma di scambio di valute, automatica e aperta](/get-eth/#dex)
- [Gaming decentralizzato](/apps/categories/gaming)
- [Una polizza assicurativa che paga automaticamente](https://etherisc.com/)
- [Uno standard che consente la creazione di valute personalizzate e interoperabili](/developers/docs/standards/tokens/)

## Letture consigliate {#further-reading}

- [Come i contratti intelligenti cambieranno il mondo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratti intelligenti per sviluppatori](/developers/docs/smart-contracts/)
- [Imparare a scrivere contratti intelligenti](/developers/learning-tools/)
- [Mastering Ethereum - Cos'è un contratto intelligente?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />
