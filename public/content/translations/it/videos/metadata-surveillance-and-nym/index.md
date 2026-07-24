---
title: "Speciale Data Privacy Day - Sorveglianza dei metadati e Nym"
description: "Una conversazione per il Data Privacy Day sulla sorveglianza dei metadati: cosa rivelano di te i metadati anche quando i contenuti dei messaggi sono cifrati e come gli strumenti per la privacy a livello di rete come Nym lavorano per proteggerli."
lang: it
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privacy"
---

Un approfondimento di **Nym** con la Chief Scientist di Nym Claudia Diaz, che esplora i meccanismi dei metadati, il loro ruolo critico nella sorveglianza moderna, i dettagli personali che espongono e i passi che possiamo compiere per riprenderci la nostra privacy.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=QBX5AK3DXqw) pubblicata da Nym. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:04) {#intro-004}

Cosa sono i metadati delle comunicazioni? Si riferiscono a tutto ciò che riguarda una comunicazione che non è il contenuto di ciò che viene effettivamente detto. Questo include, ad esempio, l'origine della comunicazione, la destinazione, l'ora in cui l'informazione viene inviata, la quantità di informazioni inviate e qualsiasi schema rilevabile, inclusi i tempi e le dimensioni dei pacchetti scambiati.

#### Metadati delle comunicazioni (0:27) {#communications-metadata-027}

I metadati delle comunicazioni sono esposti per impostazione predefinita in tutti i protocolli internet: TCP/IP, HTTP, UDP, FTP. Anche i protocolli sicuri come TLS o DNS sicuro, che proteggono il contenuto con la cifratura end-to-end, mostrano comunque i metadati delle comunicazioni: l'origine, la destinazione, i tempi, la lunghezza e così via.

Quindi queste informazioni sono esposte, ma a chi? Chi può ottenerle?

#### Chi ha accesso ai metadati (1:10) {#who-gets-access-to-metadata-110}

Ci sono diverse entità che fungono da intermediari nelle comunicazioni internet e che sono in grado di accedere a questi metadati delle comunicazioni. Questo include i grandi attori dell'infrastruttura internet, come i fornitori di servizi internet (ISP), gli exchange, i sistemi autonomi, i router BGP e i partecipanti alla dorsale internet in generale; essi possono avere accesso a un'enorme quantità di metadati delle comunicazioni. 

Ma anche i piccoli attori, come chiunque gestisca il router Wi-Fi o una rete locale, o qualcuno che è in grado di intercettare localmente, hanno accesso ai metadati delle comunicazioni. E naturalmente, è noto che avversari a livello di stato-nazione come la NSA raccolgono metadati su larga scala e li analizzano per estrarre ogni tipo di informazione di intelligence.

#### Perché i metadati sono importanti (2:00) {#why-is-metadata-important-200}

Ci sono ulteriori motivi per cui i metadati sono un tipo di dati molto interessante da raccogliere e sfruttare. Sono leggibili dalle macchine, perché parlano il linguaggio dei computer; si tratta fondamentalmente di un linguaggio che permette ai computer di instradare le comunicazioni dalla loro origine alla loro destinazione in modo appropriato. Quindi sono leggibili dalle macchine, e questo significa che le macchine possono comprenderli su larga scala molto facilmente, a differenza del linguaggio umano naturale, che è molto più difficile da interpretare, perché magari le persone usano le parole in un certo modo, o ci sono delle sfumature, e questo è molto più difficile da interpretare. I metadati, d'altra parte, sono davvero semplici.

Hanno anche un volume molto inferiore rispetto al contenuto. Se si pensa a un video di YouTube, ad esempio, il contenuto stesso può essere di svariati gigabyte, ma i metadati includerebbero solo qual è l'URL del video, quanti byte contiene e a che ora è stato guardato. Quindi possono essere molto meno del contenuto effettivo, e sono anche gestibili in termini di dimensioni.

I metadati hanno anche una protezione molto inferiore rispetto al contenuto. Non è legale intercettare semplicemente le comunicazioni delle persone e guardarne il contenuto, questo è protetto dalla legge. Ma i metadati, poiché non sono considerati altrettanto sensibili, hanno una protezione molto inferiore. Quindi molte entità possono raccogliere legalmente questi metadati e analizzarli per apprendere informazioni su ciò che le persone fanno su internet.

Quindi è un grosso problema? Possiamo dire: "Beh, sono solo metadati. Finché non sai cosa sto dicendo, dovrei davvero preoccuparmi che tu sappia con chi parlo e a che ora?" 

Ci sono alcune citazioni che mostrano come i metadati siano in realtà considerati estremamente preziosi. Il consulente generale della NSA Stewart Baker ha affermato che i metadati ti dicono assolutamente tutto sulla vita di qualcuno: se hai abbastanza metadati, non hai davvero bisogno del contenuto. Ecco quanto sono potenti nel riuscire a capire a cosa è interessato qualcuno, qual è la sua rete sociale, quali sono i suoi hobby, quali sono le sue intenzioni, quali sono i suoi interessi. Non hai effettivamente bisogno di sentire cosa stanno dicendo; è sufficiente che tu sia in grado di osservare tutti i metadati.

E Whitfield Diffie e Susan Landau, nel loro libro *Privacy on the Line*, affermano che l'analisi del traffico, non la crittoanalisi, è la spina dorsale dell'intelligence delle comunicazioni. Questo perché puoi raccoglierla su larga scala, puoi analizzarla su larga scala, e ti darà tutti i grandi schemi, l'intero quadro generale, che poi ti permette di ingrandire per penetrare negli obiettivi specifici che trovi più interessanti. Ma li trovi prima con l'analisi del traffico sui metadati.

L'analisi del traffico dei metadati può persino essere utilizzata per recuperare contenuti cifrati senza violare la crittografia. Supponiamo di avere una crittografia perfetta: nessuna quantità di crittoanalisi è in grado di violarla e le chiavi segrete sono perfettamente segrete. Dovremmo avere la certezza che questo contenuto sia protetto e che un avversario non sia in grado di apprenderne le informazioni. 

Tuttavia, ci sono molte situazioni in cui l'analisi del traffico dei metadati delle comunicazioni può agire come un canale laterale che rivela questo contenuto cifrato.

#### Sorveglianza dei metadati (5:15) {#metadata-surveillance-515}

Un esempio è quando si naviga su un sito web con HTTPS. In linea di principio, poiché la comunicazione con questo sito web è cifrata, qualcuno che sta osservando la tua comunicazione non può dire a quale pagina specifica stai accedendo sul sito web. Ad esempio, se vai su WebMD per controllare delle malattie, un osservatore o un intercettatore sarà in grado di vedere: "Ok, stai controllando le informazioni mediche di WebMD", ma non può dire quale malattia specifica stai cercando.

Tuttavia, il modo per scoprire cosa sta facendo qualcuno in questo scenario sarebbe, per un avversario, scaricare prima tutte le pagine del sito e registrare, per ogni pagina, lo schema dei pacchetti che si vedono sulla linea di comunicazione. Fondamentalmente, quale numero di pacchetti va in quale direzione, quali sono le dimensioni di questi pacchetti e qual è il periodo inter-pacchetto tra un pacchetto e l'altro. 

Facendo questo, puoi costruire un'impronta digitale di ciascuna di queste pagine, in modo tale che quando l'obiettivo sta scaricando una pagina dal sito cifrato, sei in grado di far corrispondere il numero di pacchetti in ciascuna direzione e le loro dimensioni per indovinare quale pagina web specifica stanno guardando, anche se la pagina web stessa è cifrata e non dovresti essere in grado di apprenderne il contenuto.

Questo è ovviamente preoccupante. Anche se possiamo avere la cifratura end-to-end, siamo molto lontani dall'aver finito in termini di protezione della privacy delle nostre comunicazioni.

#### Una lista dei desideri per le comunicazioni private (6:40) {#a-wish-list-for-private-communications-640}

Quindi, se volessimo avere una lista dei desideri di ciò che offrirebbe una rete di comunicazione perfettamente sicura, quali sono le proprietà che vogliamo? 

Ovviamente, vogliamo proteggere ciò che un utente sta dicendo sul canale cifrato, e la cifratura end-to-end è già un passo molto importante per raggiungere questo obiettivo. Ma non solo, vogliamo anche nascondere con chi l'utente sta comunicando, quindi chi è il partner di comunicazione, da chi stai ricevendo pacchetti o a chi stai inviando pacchetti. Anche la posizione, quindi da dove stai comunicando; quando e per quanto tempo stai comunicando; quanti byte di dati stai scambiando; e qualsiasi altro schema nella comunicazione. E potresti persino spingerti a dire che vogliamo nascondere se qualcuno sta comunicando del tutto o meno.

Queste sono tutte proprietà che i sistemi di comunicazione anonima mirano a fornire e, nello spazio delle soluzioni, le mixnet sono una delle migliori soluzioni che abbiamo per fornire questo tipo di proprietà.