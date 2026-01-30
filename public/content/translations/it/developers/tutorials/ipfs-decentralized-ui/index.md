---
title: IPFS per interfacce utente decentralizzate
description: Questa guida insegna al lettore come usare IPFS per archiviare l'interfaccia utente per una dApp. Sebbene i dati e la logica di business dell'applicazione siano decentralizzati, senza un'interfaccia utente resistente alla censura gli utenti potrebbero comunque perdere l'accesso ad essa.
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: principiante
lang: it
published: 2024-06-29
---

Hai scritto una nuova dApp incredibile. Hai persino scritto un'[interfaccia utente](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) per essa. Ma ora temi che qualcuno tenterà di censurarla disattivando la tua interfaccia utente, che è solo un server nel cloud. In questa guida imparerai come evitare la censura caricando la tua interfaccia utente su **[interplanetary file system (IPFS)](https://ipfs.tech/developers/)**, così chiunque sia interessato potrà fissarla su un server per potervi accedere in futuro.

Potresti usare un servizio di terze parti come [Fleek](https://resources.fleek.xyz/docs/) per fare tutto il lavoro. Questa guida è per le persone che vogliono fare abbastanza per capire cosa stanno facendo, anche se comporta più lavoro.

## Introduzione in locale {#getting-started-locally}

Esistono diversi [provider IPFS di terze parti](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ma è meglio iniziare eseguendo IPFS in locale per i test.

1. Installa l'[interfaccia utente IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Crea una directory con il tuo sito web. Se stai usando [Vite](https://vite.dev/), usa questo comando:

   ```sh
   pnpm vite build
   ```

3. In IPFS Desktop, fai clic su **Importa > Cartella** e seleziona la directory che hai creato nel passaggio precedente.

4. Seleziona la cartella che hai appena caricato e fai clic su **Rinomina**. Dagli un nome più significativo.

5. Selezionala di nuovo e fai clic su **Condividi link**. Copia l'URL negli appunti. Il link sarà simile a `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Fai clic su **Stato**. Espandi la scheda **Avanzate** per visualizzare l'indirizzo del gateway. Ad esempio, sul mio sistema l'indirizzo è `http://127.0.0.1:8080`.

7. Combina il percorso del passaggio del link con l'indirizzo del gateway per trovare il tuo indirizzo. Ad esempio, per l'esempio precedente, l'URL è `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Apri l'URL in un browser per visualizzare il tuo sito.

## Caricamento {#uploading}

Ora puoi usare IPFS per servire file in locale, il che non è molto entusiasmante. Il passo successivo è renderli disponibili a tutto il mondo quando sei offline.

Ci sono diversi noti [servizi di pinning](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Scegline uno. Qualunque servizio tu usi, dovrai creare un account e fornirgli l'**identificatore di contenuto (CID)** nel tuo desktop IPFS.

Personalmente, ho trovato [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) il più facile da usare. Ecco le istruzioni:

1. Vai alla [dashboard](https://dashboard.4everland.org/overview) e accedi con il tuo portafoglio.

2. Nella barra laterale sinistra fai clic su **Archiviazione > 4EVER Pin**.

3. Fai clic su **Carica > CID Selezionato**. Dai un nome al tuo contenuto e fornisci il CID dal desktop IPFS. Attualmente un CID è una stringa che inizia con `Qm` seguita da 44 lettere e cifre che rappresentano un [hash codificato in base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), come `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ma [è probabile che questo cambi](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Lo stato iniziale è **In coda**. Ricarica finché non cambia in **Fissato**.

5. Fai clic sul tuo CID per ottenere il link. Puoi vedere la mia applicazione [qui](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/).

6. Potrebbe essere necessario attivare il tuo account per averlo fissato per più di un mese. L'attivazione dell'account costa circa 1 $. Se l'hai chiuso, disconnettiti e riaccedi per ricevere di nuovo la richiesta di attivazione.

## Utilizzo da IPFS {#using-from-ipfs}

A questo punto hai un link a un gateway centralizzato che serve i tuoi contenuti IPFS. In breve, la tua interfaccia utente potrebbe essere un po' più sicura ma non è ancora resistente alla censura. Per una vera resistenza alla censura, gli utenti devono usare IPFS [direttamente da un browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Una volta installato (e con il desktop IPFS funzionante), puoi andare su [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) su qualsiasi sito e otterrai quel contenuto, servito in modo decentralizzato.

## Svantaggi {#drawbacks}

Non puoi eliminare in modo affidabile i file IPFS, quindi finché stai modificando la tua interfaccia utente, è probabilmente meglio lasciarla centralizzata, o usare l'[interplanetary name system (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), un sistema che fornisce mutabilità su IPFS. Naturalmente, tutto ciò che è mutabile può essere censurato, nel caso di IPNS facendo pressione sulla persona con la chiave privata a cui corrisponde.

Inoltre, alcuni pacchetti hanno un problema con IPFS, quindi se il tuo sito web è molto complicato potrebbe non essere una buona soluzione. E ovviamente, tutto ciò che si basa sull'integrazione del server non può essere decentralizzato semplicemente avendo il lato client su IPFS.

## Conclusione {#conclusion}

Proprio come Ethereum ti permette di decentralizzare gli aspetti del database e della logica di business della tua dApp, IPFS ti permette di decentralizzare l'interfaccia utente. Ciò ti consente di eliminare un altro vettore di attacco contro la tua dApp.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
