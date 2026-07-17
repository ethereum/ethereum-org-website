---
title: "Criptoeconomia: prova di autorità"
description: "Una lezione di criptoeconomia che spiega il meccanismo di consenso della prova di autorità (PoA), coprendo come funziona, i suoi compromessi rispetto alla Prova di lavoro e alla prova di partecipazione, e dove viene utilizzata nella pratica."
lang: it
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Prova di autorità"
---

Una lezione di criptoeconomia di **Cryptoeconomics Study** che spiega il meccanismo di consenso della prova di autorità (PoA), incluso come un'autorità centrale determina l'ordinamento delle transazioni, i problemi di doppia spesa e censura che introduce, e l'approccio di mitigazione tramite multifirma.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=Mj10HSEM5_8) pubblicata da Cryptoeconomics Study. È stata leggermente modificata per facilitarne la lettura.*

#### Come funziona la prova di autorità (0:00) {#how-proof-of-authority-works-000}

Benvenuti alla sezione 2.4 — prova di autorità (PoA) — dove ripristiniamo quell'autorità centrale per determinare l'ordinamento delle transazioni e risolvere quel fastidioso problemino della doppia spesa.

C'era una volta un'autorità centrale che piaceva un po' a tutti. Tutti approvavano questa grande autorità e dicevano: "Perché non la ascoltiamo e basta? Avevamo questi problemi e non siamo d'accordo sullo stato corretto, quindi lasciamo che sia lei a dirci qual è lo stato".

La nostra autorità centrale esegue il suo grande nodo, e ora le persone firmano le transazioni e, invece di inviarsele direttamente a vicenda, le inviano all'autorità centrale. L'autorità centrale applica ogni transazione e la firma lei stessa, dicendo: "Sì, approvo — questa è la transazione zero". L'autorità centrale poi la invia a tutti, e tutti ricevono la transazione e la accettano come oro colato.

#### Il problema della doppia spesa (1:05) {#the-double-spend-problem-105}

Ora proviamo la doppia spesa. Cosa succederà? Mallory invierà due transazioni in conflitto all'autorità centrale. L'autorità centrale riceve la prima e firma che questa è la seconda transazione che ha visto, poi firma che questa è la terza transazione che ha visto, e infine propaga quei messaggi.

Cosa succede? Tutti ricevono gli stessi messaggi e tutti osservano l'ordinamento dell'autorità centrale. Ciò significa che finiscono tutti con le stesse cronologie. Se guardiamo gli stati, stiamo andando bene: Alice invia a Jing, poi Mallory invia ad Alice, poi Mallory prova a inviare a Jing, ma quest'ultima non va a buon fine perché Mallory non ha abbastanza denaro. I loro saldi saranno tutti uguali. Sono tutti in consenso. L'autorità centrale: fantastico, ce l'abbiamo fatta.

#### Quando l'autorità è compromessa (2:09) {#when-the-authority-is-compromised-209}

Ma il problema è che dobbiamo fidarci dell'autorità centrale per fornire questo ordinamento delle transazioni. Quindi cosa succede se l'autorità centrale viene cacciata e si scopre che è sempre stata Mallory?

Torniamo agli stessi problemi che avevamo prima. Primo, le doppie spese: Mallory firma semplicemente entrambe le transazioni in conflitto dicendo che si stanno verificando entrambe contemporaneamente. Non sappiamo quale venga prima. Mallory le propaga selettivamente e confonde i nodi, e questi perdono l'accordo.

L'altro problema è la censura. Questo è un nuovo problema con la nostra catena basata sulla prova di autorità. E se ad Mallory non piacesse Alice? Alice sta cercando di inviare una transazione e l'autorità centrale la guarda, nota che è Alice e la butta via. Alice prova a inviarla di nuovo, e viene buttata via di nuovo. Alice non sa cosa stia succedendo: le sue transazioni non vanno a buon fine. Censura riuscita, e siamo di nuovo nei guai.

#### Mitigazione con la multifirma (3:21) {#mitigating-with-multi-signature-321}

Non preoccupatevi troppo: c'è una potenziale mitigazione. Possiamo decentralizzare politicamente l'autorità. Questo renderà teoricamente più difficile per Mallory prendere il controllo. Quindi, invece di un'unica autorità centrale, abbiamo quattro autorità diverse. Forse rappresentano tutte interessi diversi di parti diverse, e devono tutte riunirsi per approvare le transazioni.

Questa si chiama multi-sig, ovvero una multifirma. Ricevono una transazione da Alice a Jing, e la prima firma dicendo: "Ho visto questo messaggio e lo approvo". Poi firma la seconda, e la terza. Possiamo dire che accettiamo una multifirma due su quattro, o tre su quattro, o forse richiediamo tutte le parti: quattro su quattro. Dipende da te quando progetti la tua multifirma.

Questo significa che la transazione va a buon fine ed è stata approvata dalle autorità.

#### Limiti della prova di autorità (4:32) {#limitations-of-proof-of-authority-432}

Ma cosa succede se tutte queste autorità diventano delle Mallory? Abbiamo esattamente gli stessi problemi: doppie spese e censura. Quindi non è perfetto. Tuttavia, è per certi versi migliore di un processore di pagamento centralizzato perché almeno gli utenti eseguono tutte le transazioni da soli. Possono eventualmente rilevare una doppia spesa, ma abbiamo ancora i nostri problemi. Tecnicamente possiamo ancora fare una doppia spesa e tecnicamente possiamo ancora censurare.

Non c'è accesso aperto: potrebbe essere difficile diventare una di queste autorità. E non ci sono penalità nel protocollo se si verificano doppie spese o censure. Non c'è nulla nel protocollo che penalizzerà queste figure di autorità.

#### Cosa viene dopo (5:19) {#what-comes-next-519}

Quindi la nostra saggia Alice decide che c'è un altro modo: sbarazzarsi dell'autorità. Chi ne ha bisogno? Invece, permettiamo a chiunque di diventare un minatore e partecipare al protocollo di consenso. Questo dà libero accesso alla partecipazione, fornisce ricompense economiche per il buon comportamento — formando il consenso in un modo che funziona — e fornisce penalità economiche per il cattivo comportamento, dove lo rileviamo e bruciamo le monete delle persone.

Ma questo lo vedremo prossimamente nella Prova di lavoro (PoW): progettazione dei meccanismi per il capitolo 3.