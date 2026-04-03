---
title: Credenziali di prelievo
description: Una spiegazione dei tipi di credenziali di prelievo dei validatori (0x00, 0x01, 0x02) e delle loro implicazioni per gli staker di Ethereum.
lang: it
---

Ogni validatore ha una **credenziale di prelievo** che determina come e dove possono essere prelevati i propri ETH in staking e le ricompense. Il tipo di credenziale è indicato dal primo byte: `0x00`, `0x01` o `0x02`. Comprendere questi tipi è importante per i validatori che gestiscono il proprio stake.

## 0x00: Credenziali pre-Shapella {#0x00-credentials}

Il tipo `0x00` è il formato originale delle credenziali di prelievo precedente all'aggiornamento Shapella (aprile 2023). I validatori con questo tipo di credenziale non hanno impostato alcun indirizzo di prelievo sul livello di esecuzione, il che significa che i loro fondi rimangono bloccati sul livello di consenso. Se hai ancora credenziali `0x00`, devi aggiornarle a `0x01` o `0x02` prima di poter ricevere qualsiasi prelievo.

## 0x01: Credenziali di prelievo legacy {#0x01-credentials}

Il tipo `0x01` è stato introdotto con l'aggiornamento Shapella ed è diventato lo standard per i validatori che desideravano impostare un indirizzo di prelievo sul livello di esecuzione. Con le credenziali `0x01`:

- Qualsiasi saldo superiore a 32 ETH viene **trasferito automaticamente** al tuo indirizzo di prelievo
- Le uscite complete passano attraverso la coda di uscita standard
- Le ricompense superiori a 32 ETH non possono accumularsi (compound): vengono periodicamente trasferite all'esterno

**Perché alcuni validatori usano ancora 0x01:** È più semplice e familiare. Molti validatori hanno depositato dopo Shapella e hanno già questo tipo, e funziona bene per coloro che desiderano prelievi automatici del saldo in eccesso.

**Perché non è raccomandato:** Con `0x01`, perdi la capacità di accumulare le ricompense superiori a 32 ETH. Ogni minima parte in eccesso viene trasferita via automaticamente, il che limita il potenziale di guadagno del tuo validatore e richiede di gestire separatamente i fondi prelevati.

## 0x02: Credenziali di prelievo ad accumulo (compounding) {#0x02-credentials}

Il tipo `0x02` è stato introdotto con l'aggiornamento Pectra ed è la **scelta raccomandata** per i validatori di oggi. I validatori con credenziali `0x02` sono talvolta chiamati "validatori ad accumulo" (compounding validators).

Con le credenziali `0x02`:

- Le ricompense superiori a 32 ETH **si accumulano** con incrementi di 1 ETH fino a un saldo effettivo massimo di 2048 ETH
- I prelievi parziali devono essere richiesti manualmente (i trasferimenti automatici avvengono solo oltre la soglia dei 2048 ETH)
- I validatori possono consolidare più validatori da 32 ETH in un singolo validatore con saldo più elevato
- Le uscite complete sono ancora supportate attraverso la coda di uscita standard

Sia i prelievi parziali che i consolidamenti possono essere eseguiti tramite le [Azioni del Validatore del Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Perché i validatori dovrebbero preferire 0x02:** Offre una migliore efficienza del capitale attraverso l'accumulo, un maggiore controllo su quando avvengono i prelievi e supporta il consolidamento dei validatori. Per gli staker solitari che accumulano ricompense nel tempo, questo significa che il loro saldo effettivo, e quindi le loro ricompense, può crescere oltre i 32 ETH senza intervento manuale.

**Importante:** Una volta convertito da `0x01` a `0x02`, non è possibile tornare indietro.

Per una guida dettagliata sulla conversione alle credenziali di Tipo 2 e sulla funzionalità MaxEB, consulta la [pagina esplicativa su MaxEB](/roadmap/pectra/maxeb/).

## Cosa dovrei scegliere? {#what-should-i-pick}

- **Nuovi validatori:** Scegli `0x02`. È lo standard moderno con migliore accumulo e flessibilità.
- **Validatori 0x01 esistenti:** Prendi in considerazione la conversione a `0x02` se desideri che le ricompense si accumulino oltre i 32 ETH o se prevedi di consolidare i validatori.
- **Validatori 0x00 esistenti:** Aggiorna immediatamente: non puoi prelevare senza aggiornare le tue credenziali. Devi prima convertire a `0x01`, dopodiché potrai convertire a `0x02`.

## Strumenti per la gestione delle credenziali di prelievo {#withdrawal-credential-tools}

Diversi strumenti supportano la scelta o la conversione tra i tipi di credenziali:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Lo strumento ufficiale per i depositi e la gestione dei validatori, incluse le conversioni delle credenziali e i consolidamenti
- **[Pectra Staking Manager](https://pectrastaking.com)** - Interfaccia web con supporto per la connessione del portafoglio per conversioni e consolidamento
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Strumento a riga di comando per conversioni in blocco
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Strumento CLI per le operazioni di Ethereum, inclusa la gestione dei validatori

Per un elenco completo degli strumenti di consolidamento e istruzioni dettagliate sulla conversione, consulta gli [strumenti di consolidamento MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Letture consigliate {#further-reading}

- [Chiavi nella prova di stake di Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Scopri di più sulle chiavi dei validatori e su come si relazionano alle credenziali di prelievo
- [MaxEB](/roadmap/pectra/maxeb/) - Guida dettagliata sull'aggiornamento Pectra e sulla funzionalità del saldo effettivo massimo