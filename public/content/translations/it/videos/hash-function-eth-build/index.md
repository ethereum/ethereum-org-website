---
title: "Funzione di hash — ETH.BUILD"
description: "Una dimostrazione delle funzioni di hash crittografiche utilizzando lo strumento educativo ETH.BUILD. Scopri come funzionano le funzioni di hash e perché sono fondamentali per il modello di integrità dei dati e degli account di Ethereum."
lang: it
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Funzioni di hash (ETH.BUILD)"
---

Un tutorial di **Austin Griffith** che dimostra come funzionano le funzioni di hash crittografiche utilizzando lo strumento di programmazione visiva ETH.BUILD, coprendo il determinismo, l'output a lunghezza fissa, le proprietà unidirezionali e gli alberi di Merkle.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=QJ010l-pBpE) pubblicata da Austin Griffith. È stata leggermente modificata per facilitarne la lettura.*

### Introduzione alle funzioni di hash (0:00) {#introduction-to-hash-functions-000}

Questo è il primo video di una serie chiamata ETH.BUILD. Puoi andare su eth.build per utilizzare questo strumento, ma serve solo per giocarci e farsi un'idea di come funzionano le cose quando si sviluppa su Ethereum.

Il primo modulo che esamineremo è una funzione di hash. Che diavolo è una funzione di hash? Beh, è un po' come un'impronta digitale. Hai un input — può essere qualsiasi cosa — ma per ora useremo semplicemente il testo "hello world". Dall'altra parte avrai un output, e quell'output è una stringa esadecimale di 64 caratteri. Dice 66 caratteri a causa del prefisso "0x", ma in realtà è una stringa esadecimale di 64 caratteri.

### Visualizzare gli hash come colori (0:50) {#visualizing-hashes-as-colors-050}

Se guardi l'esadecimale, sembra un po' un colore, e potrebbe essere più facile descrivere ciò che stiamo vedendo qui se lo trasformiamo semplicemente in un colore. Quindi quello che faremo è prendere i primi sei caratteri di qualsiasi stringa e visualizzarli come un colore. Se lo guardiamo, vediamo che è un bel colore viola.

Vediamo di che colore è il mio nome: eccoci qua, un bel verde foresta. Ora torniamo a "hello world": è di nuovo quel viola.

### Determinismo e output a lunghezza fissa (1:38) {#determinism-and-fixed-length-output-138}

Quello che abbiamo appena scoperto è che è deterministico. Fondamentalmente, qualunque cosa inseriamo come input, otterremo sempre la stessa cosa dall'altra parte.

La seconda proprietà è che potresti inserire qualsiasi cosa di qualsiasi dimensione arbitraria. Posso premere a caso sulla tastiera e vedere il colore cambiare, ma quella stringa rimane a quella lunghezza di 66 caratteri. Non importa cosa inserisci qui — anche un file — potrei trascinare questo file di Leo, il mio ragazzo, e inserirlo come hash e ottenere un bel colore arancione. Poi potrei trascinare un documento di testo con l'elenco di parole BIP ed è questo bel blu chiaro. Se riporto Leo, indovina di che colore sarà? Sappiamo che sarà quell'arancione. Ottieni questa impronta digitale deterministica della cosa che hai inserito.

### Proprietà unidirezionale (2:37) {#one-directional-property-237}

La successiva proprietà più importante è che è unidirezionale. Se inserisco di nuovo "hello world", otterremo questo hash "4717". Se prendiamo quell'hash e lo inviamo a qualcuno dicendo "ecco l'hash del mio segreto: se riesci a indovinare il mio segreto, ti do cento dollari", non riusciranno nemmeno ad avvicinarsi.

Diciamo che l'hash inizia con "4717" e iniziano a curiosare cercando di trovare una corrispondenza. Non puoi semplicemente cambiare piccoli caratteri e avvicinarti: o lo indovini o no. Fondamentalmente devi indovinarlo con la forza bruta. Se per caso indovinano "hello world", otterranno la risposta, ma se non lo indovinano, non lo otterranno mai. Non c'è modo di capire se ti stai avvicinando.

Scoprirai con la crittografia che a volte è frustrante come sviluppatore perché o funziona o non funziona: non ricevi alcun suggerimento sul fatto che ti stia avvicinando. Ma questa è una buona cosa. Questa è la proprietà che vogliamo da una funzione di hash.

### Riepilogo delle proprietà della funzione di hash (3:43) {#summary-of-hash-function-properties-343}

Quindi abbiamo: qualsiasi cosa di qualsiasi dimensione può essere inserita in una funzione di hash, e sputerà fuori un'esatta impronta digitale esadecimale di 64 caratteri di cosa sono quei dati. È deterministica. È unidirezionale: non puoi tornare indietro. È davvero facile creare un hash, ma davvero difficile indovinare il segreto dell'hash.

### Alberi di Merkle e combinazione di hash (4:06) {#merkle-trees-and-combining-hashes-406}

Quello che possiamo fare con questo sono alcune cose davvero interessanti, come un albero di Merkle. Abbiamo i nostri tre input e potremmo unirli insieme. Possiamo combinare tutti quegli hash e poi fare l'hash della combinazione.

Questo colore proprio qui — quel viola — rappresenta l'hash di tutti questi hash. Se cambio "hello world" in "hello world one", quel viola cambierà. Qualsiasi piccolo cambiamento a uno qualsiasi di questi input farà cambiare l'hash finale. Puoi inserire tutti i tipi di dati in tutti i modi diversi — persino avere un albero di hash, un albero di Merkle — o avere un mucchio di blocchi di fila, e questo hash finale sarà basato su tutte queste cose. Se una qualsiasi piccola cosa cambia in qualsiasi punto del percorso, l'hash finale cambierà.

### Concetto chiave (5:53) {#key-takeaway-553}

Il concetto chiave è che una funzione di hash è fondamentalmente come un'impronta digitale. Se digito qualcosa, mi darà deterministicamente l'output che mi aspetto. Questa è una funzione di hash: benvenuto su ETH.BUILD. Creiamo delle cose fantastiche e impariamo molto lungo il percorso.