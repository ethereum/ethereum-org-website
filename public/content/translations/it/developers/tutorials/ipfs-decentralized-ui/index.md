---
title: IPFS per interfacce utente decentralizzate
description: Questo tutorial insegna al lettore come usare IPFS per archiviare l'interfaccia utente di una dApp. Sebbene i dati e la logica di business dell'applicazione siano decentralizzati, senza un'interfaccia utente resistente alla censura gli utenti potrebbero comunque perderne l'accesso.
author: Ori Pomerantz
tags: ["ipfs", "dApp", "frontend"]
skill: beginner
breadcrumb: IPFS per le interfacce utente delle dApp
lang: it
published: 2024-06-29
---

Hai scritto una nuova incredibile dApp. Hai persino scritto un'[interfaccia utente](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) per essa. Ma ora temi che qualcuno tenti di censurarla abbattendo la tua interfaccia utente, che si trova su un solo server nel cloud. In questo tutorial imparerai come evitare la censura caricando la tua interfaccia utente sull'**[interplanetary file system (IPFS)](https://ipfs.tech/developers/)** in modo che chiunque sia interessato possa fissarla (pin) su un server per l'accesso futuro.

Potresti usare un servizio di terze parti come [Fleek](https://resources.fleek.xyz/docs/) per fare tutto il lavoro. Questo tutorial è per le persone che vogliono fare abbastanza per capire cosa stanno facendo, anche se richiede più lavoro.

## Iniziare localmente {#getting-started-locally}

Esistono diversi [provider IPFS di terze parti](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ma è meglio iniziare eseguendo IPFS localmente per i test.

1. Installa l'[interfaccia utente di IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Crea una directory con il tuo sito web. Se stai usando [Vite](https://vite.dev/), usa questo comando:

   ```sh
   pnpm vite build
```

3. In IPFS Desktop, fai clic su **Import > Folder** (Importa > Cartella) e seleziona la directory che hai creato nel passaggio precedente.

4. Seleziona la cartella appena caricata e fai clic su **Rename** (Rinomina). Dalle un nome più significativo.

5. Selezionala di nuovo e fai clic su **Share link** (Condividi link). Copia l'URL negli appunti. Il link sarà simile a `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Fai clic su **Status** (Stato). Espandi la scheda **Advanced** (Avanzate) per vedere l'indirizzo del gateway. Ad esempio, sul mio sistema l'indirizzo è `http://127.0.0.1:8080`.

7. Combina il percorso dal passaggio del link con l'indirizzo del gateway per trovare il tuo indirizzo. Ad esempio, per l'esempio precedente, l'URL è `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Apri quell'URL in un browser per vedere il tuo sito.

## Caricamento {#uploading}

Quindi ora puoi usare IPFS per servire file localmente, il che non è molto entusiasmante. Il passaggio successivo è renderli disponibili per il mondo quando sei offline.

Esistono diversi [servizi di pinning](https://docs.ipfs.tech/concepts/persistence/#pinning-services) ben noti. Scegline uno. Qualunque servizio tu usi, devi creare un account e fornirgli il **content identifier (CID)** (identificatore di contenuto) nel tuo IPFS desktop.

Personalmente, ho trovato [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) il più facile da usare. Ecco le istruzioni per usarlo:

1. Vai alla [dashboard](https://dashboard.4everland.org/overview) e accedi con il tuo portafoglio.

2. Nella barra laterale sinistra fai clic su **Storage > 4EVER Pin**.

3. Fai clic su **Upload > Selected CID**. Dai un nome al tuo contenuto e fornisci il CID da IPFS desktop. Attualmente un CID è una stringa che inizia con `Qm` seguita da 44 lettere e cifre che rappresentano un hash [codificato in base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), come `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ma [è probabile che questo cambi](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Lo stato iniziale è **Queued** (In coda). Ricarica finché non cambia in **Pinned** (Fissato).

5. Fai clic sul tuo CID per ottenere il link. Puoi vedere la mia applicazione [qui](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Potresti dover attivare il tuo account per averlo fissato per più di un mese. L'attivazione dell'account costa circa 1$. Se lo hai chiuso, esci e accedi di nuovo per farti chiedere nuovamente di attivarlo.

## Utilizzo da IPFS {#using-from-ipfs}

A questo punto hai un link a un gateway centralizzato che serve il tuo contenuto IPFS. In breve, la tua interfaccia utente potrebbe essere un po' più sicura ma non è ancora resistente alla censura. Per una vera resistenza alla censura, gli utenti devono usare IPFS [direttamente da un browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Una volta installato (e con IPFS desktop funzionante), puoi andare su [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) su qualsiasi sito e otterrai quel contenuto, servito in modo decentralizzato.

## Svantaggi {#drawbacks}

Non puoi eliminare in modo affidabile i file IPFS, quindi finché stai modificando la tua interfaccia utente, probabilmente è meglio lasciarla centralizzata o usare l'[interplanetary name system (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), un sistema che fornisce mutabilità sopra IPFS. Naturalmente, qualsiasi cosa sia mutabile può essere censurata, nel caso di IPNS facendo pressione sulla persona con la chiave privata a cui corrisponde.

Inoltre, alcuni pacchetti hanno problemi con IPFS, quindi se il tuo sito web è molto complicato potrebbe non essere una buona soluzione. E naturalmente, qualsiasi cosa si basi sull'integrazione del server non può essere decentralizzata solo avendo il lato client su IPFS.

## Conclusione {#conclusion}

Proprio come Ethereum ti consente di decentralizzare il database e gli aspetti della logica di business della tua dApp, IPFS ti consente di decentralizzare l'interfaccia utente. Questo ti permette di chiudere un ulteriore vettore di attacco contro la tua dApp.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).