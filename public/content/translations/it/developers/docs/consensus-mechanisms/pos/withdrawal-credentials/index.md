---
title: Credenziali di prelievo
description: Una spiegazione dei tipi di credenziali di prelievo del validatore (0x00, 0x01, 0x02) e le loro implicazioni per gli staker di Ethereum.
lang: it
---

Ogni validatore ha una **credenziale di prelievo** che determina come e dove i suoi ETH in staking e le ricompense possono essere prelevati. Il tipo di credenziale è indicato dal primo byte: `0x00`, `0x01` o `0x02`. Comprendere questi tipi è importante per i validatori che gestiscono il proprio stake.

## 0x00: Credenziali Pre-Shapella {#0x00-credentials}

Il tipo `0x00` è il formato originale delle credenziali di prelievo precedente all'aggiornamento Shapella (aprile 2023). I validatori con questo tipo di credenziali non hanno un indirizzo di prelievo impostato sul livello di esecuzione, il che significa che i loro fondi rimangono bloccati sul livello di consenso. Se si dispone ancora di credenziali `0x00`, è necessario eseguire l'aggiornamento a `0x01` o `0x02` prima di poter ricevere prelievi.

## 0x01: Credenziali di prelievo legacy {#0x01-credentials}

Il tipo `0x01` è stato introdotto con l'aggiornamento Shapella ed è diventato lo standard per i validatori che volevano impostare un indirizzo di prelievo sul livello di esecuzione. Con le credenziali `0x01`:

- Qualsiasi saldo superiore a 32 ETH viene **automaticamente trasferito** al proprio indirizzo di prelievo
- Le uscite complete passano attraverso la coda di uscita standard
- Le ricompense superiori a 32 ETH non possono essere composte; vengono trasferite periodicamente

**Perché alcuni validatori usano ancora 0x01:** è più semplice e familiare. Molti validatori hanno depositato dopo Shapella e hanno già questo tipo, e funziona bene per coloro che desiderano prelievi automatici del saldo in eccesso.

**Perché non è consigliato:** con `0x01`, si perde la possibilità di comporre le ricompense superiori a 32 ETH. Ogni importo in eccesso viene trasferito automaticamente, il che limita il potenziale di guadagno del proprio validatore e richiede la gestione separata dei fondi prelevati.

## 0x02: Credenziali di prelievo a composizione {#0x02-credentials}

Il tipo `0x02` è stato introdotto con l'aggiornamento Pectra ed è la **scelta consigliata** per i validatori oggi. I validatori con credenziali `0x02` sono talvolta chiamati "validatori a composizione".

Con le credenziali `0x02`:

- Le ricompense superiori a 32 ETH **si compongono** con incrementi di 1 ETH fino a un saldo effettivo massimo di 2048 ETH
- I prelievi parziali devono essere richiesti manualmente (i trasferimenti automatici si verificano solo al di sopra della soglia di 2048 ETH)
- I validatori possono consolidare più validatori da 32 ETH in un unico validatore con un saldo maggiore
- Le uscite complete sono ancora supportate attraverso la coda di uscita standard

Sia i prelievi parziali che i consolidamenti possono essere eseguiti tramite le [Azioni del Validatore del Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Perché i validatori dovrebbero preferire 0x02:** offre una migliore efficienza del capitale attraverso la composizione, un maggiore controllo su quando avvengono i prelievi e supporta il consolidamento dei validatori. Per gli staker individuali che accumulano ricompense nel tempo, ciò significa che il loro saldo effettivo, e quindi le loro ricompense, può crescere oltre i 32 ETH senza intervento manuale.

**Importante:** una volta effettuata la conversione da `0x01` a `0x02`, non è possibile tornare indietro.

Per una guida dettagliata sulla conversione alle credenziali di tipo 2 e sulla funzionalità MaxEB, vedere la [pagina esplicativa su MaxEB](/roadmap/pectra/maxeb/).

## Cosa dovrei scegliere? {#what-should-i-pick}

- **Nuovi validatori:** scegliere `0x02`. È lo standard moderno con una migliore composizione e flessibilità.
- **Validatori 0x01 esistenti:** valutare la conversione a `0x02` se si desidera che le ricompense si compongano al di sopra di 32 ETH o si prevede di consolidare i validatori.
- **Validatori 0x00 esistenti:** eseguire immediatamente l'aggiornamento; non è possibile prelevare senza aggiornare le proprie credenziali. È necessario prima convertire a `0x01`, poi è possibile convertire a `0x02`.

## Strumenti per la gestione delle credenziali di prelievo {#withdrawal-credential-tools}

Diversi strumenti supportano la scelta o la conversione tra i tipi di credenziali:

- **[Launchpad per lo Staking di Ethereum](https://launchpad.ethereum.org/en/validator-actions)** - Lo strumento ufficiale per i depositi e la gestione dei validatori, incluse le conversioni di credenziali e i consolidamenti
- **[Pectra Staking Manager](https://pectrastaking.com)** - Interfaccia utente web con supporto wallet-connect per conversioni e consolidamento
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Strumento a riga di comando per conversioni in batch
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Strumento CLI per le operazioni di Ethereum, inclusa la gestione dei validatori

Per un elenco completo degli strumenti di consolidamento e istruzioni dettagliate per la conversione, vedere [strumenti di consolidamento MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Letture consigliate {#further-reading}

- [Chiavi in Ethereum proof-of-stake](/developers/docs/consensus-mechanisms/pos/keys/) - Informazioni sulle chiavi del validatore e sulla loro relazione con le credenziali di prelievo
- [MaxEB](/roadmap/pectra/maxeb/) - Guida dettagliata sull'aggiornamento Pectra e sulla funzionalità del saldo effettivo massimo
