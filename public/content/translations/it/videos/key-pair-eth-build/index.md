---
title: "Coppia di chiavi — ETH.BUILD"
description: "Una dimostrazione delle coppie di chiavi pubbliche-private utilizzando lo strumento educativo ETH.BUILD. Scopri come le coppie di chiavi crittografiche proteggono gli account Ethereum e consentono la firma delle transazioni."
lang: it
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "account"
  - "crittografia"
format: tutorial
author: Austin Griffith
breadcrumb: "Coppie di chiavi (ETH.BUILD)"
---

Un tutorial di **Austin Griffith** che dimostra come funzionano le coppie di chiavi pubbliche-private utilizzando lo strumento di programmazione visiva ETH.BUILD, coprendo la generazione della chiave privata, la derivazione della chiave pubblica, la firma dei messaggi e il recupero della firma.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=9LtBDy67Tho) pubblicata da Austin Griffith. È stata leggermente modificata per facilitarne la lettura.*

### La chiave privata (0:00) {#the-private-key-000}

Nel primo video abbiamo usato un hash, e gli hash saranno importanti in futuro. Ma l'elemento successivo più importante è una coppia di chiavi. La parte più importante di una coppia di chiavi è la chiave privata. Procediamo e generiamone una: è fondamentalmente una stringa esadecimale casuale di 64 caratteri, della stessa dimensione dell'hash con cui stavamo lavorando.

Si inizia con quella come chiave privata e poi, utilizzando la crittografia a curva ellittica (dai un'occhiata su Wikipedia come missione secondaria), deriviamo una chiave pubblica. Quindi ora abbiamo una chiave privata e una chiave pubblica. Abbiamo appena generato una chiave privata dal nulla, e la chiave pubblica ci fornisce un indirizzo. Questo è il punto in cui le persone potrebbero effettivamente inviare denaro. Quando qualcuno dice "invia al mio indirizzo Ethereum", si riferisce a questo.

Se volessi creare un account presso Wells Fargo, dovrei guidare fino alla banca e fornire loro un sacco di informazioni. Ci vorrebbe un po' di tempo. Ma per generare un account all'interno di un sistema crittografico come questo, dove posso inviare e ricevere denaro, mi basta generare questa chiave privata. Questa chiave privata esadecimale di 64 caratteri deriva tutto il resto.

### Firma e recupero dei messaggi (1:54) {#signing-and-recovering-messages-154}

C'è una proprietà davvero interessante di questa coppia di chiavi che dovremmo esplorare, ed è la firma e il recupero dei messaggi. Fondamentalmente, prendi la tua chiave privata e la usi per firmare un qualche tipo di messaggio. Scriviamo un messaggio: "l'orso è appiccicoso di miele".

Lo inseriamo come nostro messaggio e, con la firma automatica abilitata, ci restituisce una firma. Un po' come l'hash, la nostra firma consiste fondamentalmente nel prendere il messaggio e la nostra chiave privata e firmare qualcosa. Quello che ne ricaviamo è una firma.

Posso inviarlo al mondo intero (potrei inviarlo pubblicamente a tutti): questa stringa di firma insieme al messaggio. Ciò che chiunque può fare con la matematica è verificare che sia stato specificamente io a firmarlo.

### Recupero dell'indirizzo del firmatario (3:17) {#recovering-the-signers-address-317}

Lascia che ti mostri come funziona. Usiamo un metodo di "recupero" (recover). Abbiamo bisogno di due input: il messaggio ("l'orso è appiccicoso di miele") e la firma. Quello che ne viene fuori è l'indirizzo che è stato utilizzato per firmarlo. Possiamo vedere visivamente che l'account ha firmato quel messaggio utilizzando gli identicon Blockie.

Non c'è modo di manometterlo. Se qualcuno cambia anche una sola parola (come scambiare "orso" con "tasso"), cambia tutto. Anche con la stessa firma, un messaggio diverso restituisce un indirizzo diverso, non quello corretto.

Questo messaggio non può essere manomesso. Potremmo inserirci una marca temporale: potremmo dire "in questo giorno prevedo che accadrà qualcosa", firmarlo, pubblicare la firma e il messaggio, e chiunque per il resto del tempo potrà dimostrare matematicamente che hai firmato quel messaggio in quel momento.

### La proprietà chiave di una coppia di chiavi (4:58) {#the-key-property-of-a-key-pair-458}

Questa è la proprietà chiave di una coppia di chiavi. Una coppia di chiavi generata da nient'altro che una stringa casuale esadecimale di 64 caratteri può essere utilizzata per firmare un messaggio, e poi quel messaggio può essere recuperato.

- Chiave privata + messaggio = firma
- Firma + messaggio = indirizzo pubblico

Possiamo firmare i dati con la nostra chiave privata e le persone possono dimostrare che siamo stati noi a firmarli. Questo sarà un elemento importante per il passaggio successivo.