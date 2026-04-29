---
title: "Cos'è la Prova di lavoro (PoW)?"
description: "Una spiegazione per principianti del meccanismo di consenso della Prova di lavoro (PoW), incluso come i minatori risolvono enigmi crittografici per convalidare le transazioni e proteggere la rete blockchain."
lang: it
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Prova di lavoro"
---

Una spiegazione di **Binance Academy** che copre il meccanismo di consenso della Prova di lavoro (PoW), incluse le sue origini, come i minatori competono per risolvere enigmi crittografici e come protegge la rete blockchain.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=3EUAcxhuoU4) pubblicata da Binance Academy. È stata leggermente modificata per facilitarne la lettura.*

#### Origini della Prova di lavoro (0:00) {#origins-of-proof-of-work-000}

Risalente originariamente al 1993, il concetto di Prova di lavoro è stato sviluppato per prevenire attacchi denial-of-service e altri abusi di servizio come lo spam su una rete, richiedendo un po' di lavoro da parte dell'utente del servizio — che di solito significa tempo di elaborazione da parte di un computer.

Nel 2009, Bitcoin ha introdotto un modo innovativo di utilizzare la Prova di lavoro come algoritmo di consenso per convalidare le transazioni e trasmettere nuovi blocchi alla blockchain. Da allora si è diffusa fino a diventare un algoritmo di consenso ampiamente utilizzato in molte criptovalute.

#### Come funziona la Prova di lavoro (0:33) {#how-proof-of-work-works-033}

In breve, i minatori su una rete competono tra loro per risolvere complessi enigmi computazionali. Questi enigmi sono difficili da risolvere ma facili da verificare una volta che qualcuno trova la soluzione corretta.

Una volta che un minatore ha trovato la soluzione all'enigma, può trasmettere il blocco alla rete, dove tutti gli altri minatori verificheranno che la soluzione sia corretta.

#### Esempio di minaggio di Bitcoin (0:56) {#bitcoin-mining-example-056}

Bitcoin è un sistema basato su blockchain mantenuto dal lavoro collettivo di nodi decentralizzati. Alcuni di questi nodi sono noti come minatori e sono responsabili dell'aggiunta di nuovi blocchi alla blockchain.

Per farlo, i minatori devono provare a indovinare un numero pseudo-casuale noto come nonce. Questo numero, quando combinato con i dati forniti nel blocco e passato attraverso una funzione di hash, deve produrre un risultato che soddisfi determinate condizioni — ad esempio, un hash che inizia con quattro zeri.

Quando viene trovato un risultato corrispondente, gli altri nodi verificano la validità dell'esito e il nodo minatore viene ricompensato con la ricompensa del blocco. Pertanto, è impossibile aggiungere un nuovo blocco alla catena principale senza prima trovare un nonce valido, che a sua volta genera la soluzione per quel blocco specifico — chiamata hash del blocco.

#### Perché si chiama "Prova di lavoro" (1:46) {#why-its-called-proof-of-work-146}

Ogni blocco convalidato contiene un hash del blocco che rappresenta il lavoro svolto dal minatore. Questo è il motivo per cui si chiama Prova di lavoro.

#### Vantaggi per la sicurezza (1:54) {#security-benefits-154}

La Prova di lavoro aiuta a proteggere la rete contro numerosi attacchi diversi. Un attacco riuscito richiederebbe molta potenza computazionale e molto tempo per eseguire i calcoli. Pertanto, sarebbe inefficiente poiché il costo sostenuto sarebbe maggiore delle potenziali ricompense per aver attaccato la rete.

#### Limitazioni (2:10) {#limitations-210}

Un problema con la Prova di lavoro è che il minaggio richiede hardware informatico costoso che consuma una grande quantità di energia. Sebbene i complicati calcoli dell'algoritmo garantiscano la sicurezza della rete, questi calcoli non possono essere utilizzati per nient'altro.

#### Guardando al futuro (2:25) {#looking-ahead-225}

Sebbene la Prova di lavoro possa non essere la soluzione più efficiente, è ancora uno dei metodi più popolari per raggiungere il consenso nelle blockchain. Esistono già metodi e approcci alternativi che cercano di risolvere questi problemi, ma solo il tempo dirà quale metodo sarà il successore della Prova di lavoro.