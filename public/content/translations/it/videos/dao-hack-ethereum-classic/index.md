---
title: "L'hack della DAO: la storia di Ethereum Classic"
description: "La storia dell'hack della DAO nel 2016 e di come la risposta della community abbia portato alla creazione di Ethereum Classic come catena separata."
lang: it
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "governance"
  - "storia"
  - "dao"
format: explainer
author: Junion
breadcrumb: "L'hack della DAO"
---

Una spiegazione di **Junion** che racconta la storia dell'hack della DAO nel 2016, uno dei più grandi furti digitali nella storia delle cripto, e di come la controversa decisione della community di Ethereum di eseguire un fork della blockchain abbia portato alla creazione di Ethereum Classic.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=rNeLuBOVe8A) pubblicata da Junion. È stata leggermente modificata per facilitarne la lettura.*

#### La scoperta (0:00) {#the-discovery-000}

È lunedì 13 giugno 2016. Un professore di informatica della Cornell sta esaminando il codice della DAO, uno dei progetti più ambiziosi nello spazio cripto. Per mesi aveva sostenuto che il progetto dovesse essere messo in pausa, poiché riteneva ci fossero alcune falle che avrebbero potuto mettere a repentaglio l'intera operazione. Ma oggi trova una grave vulnerabilità: un bug alla riga 666.

Teme che questo bug possa consentire a un hacker di effettuare prelievi potenzialmente illimitati, come a un bancomat. Anche se l'aggressore avesse avuto solo 10 dollari nel proprio account, sarebbe stato in grado di prelevarli ancora e ancora e ancora, fino all'esaurimento di tutto il denaro. C'era un quarto di miliardo di dollari investito nella DAO e ogni centesimo era a rischio.

Slock.it, l'azienda dietro la DAO, riconosce il potenziale exploit ma dichiara che qualsiasi attacco sarebbe irrealizzabile, quindi tutti i fondi sono ancora al sicuro. Eseguono un commit su GitHub scambiando due righe di codice: una correzione che sarà inclusa come parte del DAO Framework versione 1.1.

Ma proprio mentre il team cantava vittoria, un hacker stava segretamente seguendo le loro tracce, sviluppando un exploit che sfruttava esattamente questo bug. Ora è venerdì, quattro giorni dopo, e la DAO è appena stata hackerata per una somma di 55 milioni di dollari.

Proprio come l'hack di SWIFT da 81 milioni di dollari ha reso pubbliche le falle nel settore bancario centralizzato, e l'attacco ransomware WannaCry ha rivelato vulnerabilità critiche nei sistemi operativi dei computer, l'hack della DAO ha esposto la fragilità iniziale della sicurezza degli smart contract in un mondo in cui il codice detta tutto. Ha lasciato la community di Ethereum devastata mentre si affannava per cercare di riprendere il controllo della blockchain.

Questa è la storia di uno dei più grandi furti digitali di sempre e dell'audace tentativo di riscrivere la storia in modo che non fosse mai nemmeno accaduto.

#### Cos'era la DAO? (2:00) {#what-was-the-dao-200}

Entra in scena la DAO, abbreviazione di organizzazione autonoma decentralizzata (DAO). L'idea era ispirata al crowdfunding. Invece di fondi multipli per progetti diversi, ci sarebbe stato un unico fondo per dominarli tutti, e non c'era modo migliore per farlo se non con una DAO.

Al lancio, gli investitori avrebbero ricevuto 100 token DAO per ogni ether depositato. Questi token conferivano loro la governance sul protocollo e rappresentavano la loro quota della DAO. I detentori di token potevano presentare proposte: ad esempio, si poteva proporre di investire un milione di dollari in cambio di una quota del 10% nell'azienda XYZ.

Una volta che una proposta superava la verifica iniziale, veniva votata da tutti gli altri investitori. Durante questo periodo, i detentori di token potevano votare sì se credevano che l'investimento producesse un valore atteso positivo, o no se credevano producesse un valore atteso negativo. Potevano anche usare il forum per esprimere le proprie opinioni e leggere quelle degli altri.

Quando il periodo di voto scadeva e veniva raggiunto un quorum del 20% di tutti i token, la DAO trasferiva automaticamente gli ether specificati allo smart contract che rappresentava la proposta. Qualsiasi ether generato da queste proposte sarebbe poi stato restituito alla tesoreria. Era proprio come un grande hedge fund decentralizzato, progettato per generare profitti. L'idea era che la saggezza della folla avrebbe aiutato a creare le migliori opportunità di investimento.

Tuttavia, c'era ancora bisogno di un modo per proteggere la minoranza dall'essere oppressa dalla maggioranza. Se un gruppo di minoranza era in forte disaccordo con una proposta che non poteva sconfiggere ai voti, invece di votare no, poteva richiamare una funzione di split (divisione) e spostare i propri ether dalla DAO principale a una DAO figlia, dividendo essenzialmente la DAO in due. Questa funzione di split sarà molto importante in seguito.

#### Il crowdfunding (4:01) {#the-crowdfund-401}

La DAO è stato il più grande progetto di crowdfunding di sempre, raccogliendo 12,7 milioni di ether, del valore di 150 milioni di dollari all'epoca. Ha avuto luogo durante la prima era di Ethereum, in cui il progetto era soggetto a un'enorme quantità di clamore e FOMO da parte degli investitori.

Prima di questo, i progetti Ethereum erano stati principalmente delle proof of concept arbitrarie, ma questo era un progetto completamente funzionante con un potenziale enorme. Era completamente al sicuro da qualsiasi hack, protetto da milioni di miner in tutto il mondo, ed era decentralizzato: l'intero progetto era costituito da una serie di smart contract su Ethereum.

Si trattava di codice immutabile ospitato sul computer più sicuro al mondo, il che garantiva le proprietà chiave di una DAO: un'organizzazione completamente decentralizzata e autonoma. Una volta che i contratti furono distribuiti il 30 aprile, nessuna singola entità, nemmeno Slock.it, poteva apportare modifiche al protocollo o fermarne l'esistenza. Il suo codice era stato controllato innumerevoli volte da vari sviluppatori di Ethereum ed era visibile a tutti per la revisione.

#### L'hack (5:02) {#the-hack-502}

"Lonely, so lonely" (Solo, così solo): il nome della Proposta DAO #59. È solo una normale proposta di split, ma in realtà è qui che inizia l'hack. Dopo che l'hacker ha presentato la proposta, c'è un periodo di dibattito standard di sette giorni in cui chiunque è libero di unirsi. Tuttavia, nessuno si unisce a questo split.

È procedura standard che qualcuno richiami uno split da solo, crei una DAO figlia e poi crei una proposta che invii tutti gli ether di nuovo al proprio portafoglio. Questo consente a un utente di reclamare il proprio denaro supportato dai propri token DAO. Sono passati sette giorni e all'hacker è ora consentito richiamare la funzione di split. Nessuno sospetta nulla.

Tuttavia, quando viene richiamata la funzione di split, la community si rende conto di qualcosa di allarmante. Gli ether vengono prosciugati dalla DAO al ritmo di otto milioni di dollari all'ora. La community si affanna per capire cosa stia succedendo. Sembra che l'aggressore stia richiamando ricorsivamente la funzione di split: ancora e ancora e ancora, centinaia di volte.

Ricordi quella correzione del bug avvenuta quattro giorni fa? È un peccato che non ci sia modo di modificare il codice di uno smart contract dopo che è stato distribuito, quindi questa correzione esisteva solo su GitHub come parte di The DAO 1.1, una DAO completamente diversa che era in fase di realizzazione. Questa piccola correzione avrebbe potuto prevenire l'intera faccenda: tutto ciò che faceva era scambiare due righe di codice in modo che il saldo venisse aggiornato prima del pagamento effettivo.

Ma senza questa correzione, chiunque poteva richiamare ripetutamente la funzione per prelevare ether prima che il contratto aggiornasse il proprio saldo. È come un bancomat che non modifica il tuo saldo finché non ti ha dato i soldi. "Posso prelevare dieci dollari? Aspetta, prima di questo, posso prelevare dieci dollari? Aspetta, prima di questo..."

#### Il gruppo Robin Hood (6:55) {#the-robin-hood-group-655}

I detentori di token DAO guardavano mentre i loro investimenti venivano lentamente prosciugati dalla DAO principale alla DAO figlia, nota anche come dark DAO. Inoltre, il prezzo di Ethereum subì un crollo improvviso da 20 a 15 dollari in seguito alla notizia. Bisognava fare qualcosa, e l'unico modo era prosciugare il resto prima che lo facesse l'hacker. E così iniziò la corsa allo svuotamento.

Dall'altra parte del mondo, nel suo appartamento nel quartiere di Copacabana a Rio de Janeiro, Alex Van de Sande si sveglia con il telefono che esplode di messaggi Skype. Si gira verso sua moglie e dice: "Ricordi quando ti parlavo di quell'enorme mucchio di soldi non hackerabile? È stato hackerato."

Alex si mise in contatto con altri sviluppatori non rivelati e formarono un gruppo che soprannominarono Robin Hood: hacker white-hat che avrebbero prosciugato i fondi rimanenti e li avrebbero restituiti ai legittimi proprietari. Tuttavia, non avevano tempo per proporre un nuovo split, poiché ciò avrebbe richiesto un periodo di voto di sette giorni.

Invece, misero gli occhi sulla Proposta #71, che stava per terminare in poche ore. Si sarebbero uniti a quello split e avrebbero usato lo stesso hack per sifonare tutti i fondi rimanenti in questa DAO figlia. Erano passate sei ore dall'inizio dell'attacco e il ladro era riuscito a rubare il 30% degli ether della DAO. Ma per qualche motivo sconosciuto, l'attacco smise di funzionare. Le transazioni fallirono e tutto fu portato a termine.

Nel frattempo, Alex si stava preparando a lanciare l'attacco white-hat per mettere al sicuro il restante 70% dei fondi. Ma improvvisamente perse la connessione internet. Con soli 30 minuti rimasti, chiamò freneticamente NET, il suo provider di servizi internet brasiliano, ma ottenne solo una risposta da una voce robotica: "Vediamo che c'è un problema di internet nel tuo quartiere." La proposta di split terminò e aveva appena perso la finestra per eseguire l'attacco Robin Hood.

La mattina successiva, Alex cercò di riunire il gruppo per infiltrarsi in un'altra proposta di split, ma gli altri erano occupati. "Ci sentivamo come i peggiori hacker della storia. Siamo stati sventati da una cattiva connessione internet e da impegni familiari."

#### La corsa allo svuotamento (9:10) {#the-race-to-empty-910}

Quattro giorni dopo l'attacco iniziale, la DAO era di nuovo sotto attacco. Si stava prosciugando lentamente, pochi ether per round, ma aveva già accumulato qualche migliaio di dollari. Sembrava provenire da un aggressore che stava sondando il terreno. A questo punto, Robin Hood doveva fare qualcosa.

Scelsero di infiltrarsi nello Split #78 perché avevano identificato il curatore della proposta e stava per terminare. Contattarono alcune balene che furono felici di donare i loro token DAO, consentendo al team di assicurarsi sei milioni di token. Più token aveva il contratto Robin, più velocemente poteva sifonare ether. L'aggressore accelerò il passo e altri aggressori si unirono. Ma grazie alle donazioni, Robin Hood fu in grado di superarli. Questo permise loro di mettere al sicuro 7,2 milioni di ether: il 55% della DAO.

#### Il fork (10:08) {#the-fork-1008}

La DAO principale era ora stata prosciugata e tutti i fondi erano distribuiti su diverse DAO figlie: le due principali erano la DAO white-hat e la dark DAO. Ma tutto il denaro era bloccato a tempo. Nessuna proposta poteva essere portata avanti sotto una DAO figlia fino al termine di un periodo di attesa di 27 giorni. E anche dopo, l'invio di fondi a un indirizzo esterno richiedeva la presentazione di una proposta e un'attesa di due settimane. In sostanza, c'erano ancora 41 giorni prima che l'hacker potesse incassare quello che equivaleva al 5% dell'offerta totale di Ethereum.

Ma l'hacker non sarebbe mai riuscito a toccare i suoi Ethereum. Quello che accadde dopo è uno degli episodi più audaci e controversi nella storia della blockchain. La community decise che non avrebbe lasciato vincere l'hacker. Volevano riscrivere la storia in modo che ogni transazione coinvolta nell'hack venisse annullata e tutti riavessero i propri soldi. Scelsero di eseguire un fork di Ethereum.

Una blockchain è come un elenco di transazioni che continua a crescere con ogni blocco minato. Ogni transazione è radicata nella blockchain per sempre. Ma se oltre il 50% dei miner collude, possono alterare falsamente la blockchain, riscrivendo la storia come vogliono. Di solito questo è chiamato un attacco del 51%. Ma non c'era nulla di dannoso in questo fork: la community stava solo reclamando il denaro che le era stato rubato.

#### Il codice è legge (11:48) {#code-is-law-1148}

Tuttavia, non tutti erano d'accordo con il fork proposto. Sostenevano che il codice è legge. In quest'ottica, l'aggressore era meno un hacker e più un avvocato intelligente che aveva letto attentamente i termini di un contratto. Pertanto, nessun fondo era stato effettivamente rubato e avrebbero dovuto avere legittimamente diritto agli ether della dark DAO.

È importante notare che Ethereum in sé non è mai stato effettivamente hackerato: è stato solo uno smart contract scritto male a essere sfruttato. Due cose diverse. Inoltre, credevano che le cose che accadono sulla blockchain siano immutabili e non dovrebbero mai essere manomesse, indipendentemente dalla situazione.

Un giorno dopo l'attacco iniziale, l'aggressore inviò una lettera aperta nella chat di gruppo Slack della DAO, firmata con la propria chiave privata:

"Alla DAO e alla community di Ethereum: ho esaminato attentamente il codice di The DAO e ho legittimamente reclamato 3 milioni di ether, e vorrei ringraziare la DAO per questa ricompensa. Sono deluso da coloro che stanno caratterizzando l'uso di questa funzionalità intenzionale come 'furto'. Sto facendo uso di questa funzionalità esplicitamente codificata secondo i termini dello smart contract. Un soft o hard fork equivarrebbe al sequestro dei miei ether legittimi e di diritto. Un tale fork rovinerebbe in modo permanente e irrevocabile tutta la fiducia non solo in Ethereum ma anche nel campo degli smart contract e della tecnologia blockchain. Non commettete errori: qualsiasi fork, soft o hard, danneggerà ulteriormente Ethereum e distruggerà la sua reputazione e il suo fascino."

A un esame più attento, le persone si resero conto che la firma non era valida, quindi questa lettera era stata scritta solo da qualcuno che affermava di essere l'aggressore.

D'altra parte, i sostenitori sostenevano che "il codice è legge" fosse un'affermazione troppo drastica e che gli esseri umani dovessero avere l'ultima parola attraverso il consenso sociale. All'hacker non dovrebbe essere consentito di trarre profitto dall'exploit poiché è eticamente sbagliato e molto probabilmente illegale. Ma soprattutto, la DAO era semplicemente troppo grande per fallire. Deteneva circa il 15% dell'offerta totale di ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

In un evento che riecheggiava la crisi finanziaria del 2008, gli sviluppatori di Ethereum salvarono la DAO. Vitalik Buterin, il creatore e sviluppatore principale di Ethereum, non si scusò per aver spinto per un fork. In un'intervista, in seguito disse: "Alcuni utenti Bitcoin vedono l'hard fork come una violazione in qualche modo dei loro valori più fondamentali. Personalmente penso che questi valori fondamentali, spinti a tali estremi, siano sciocchi."

Queste opinioni dominavano la maggioranza della community di Ethereum. Un controverso voto della community, in cui un ether equivale a un voto, mostrò un supporto dell'87% per il fork. Così, al blocco 1.920.000, i nodi informatici di tutto il mondo aggiornarono il loro software e accettarono il fork. Tutti gli ether dalla DAO e dalle DAO figlie furono spostati in un contratto di rimborso.

Ma non finisce qui. La blockchain originale di Ethereum, quella con l'hack della DAO, continuò ad andare avanti. In effetti, stava crescendo. I miner che si opponevano al fork continuarono a minare blocchi e le transazioni venivano ancora effettuate. Il giorno successivo, Poloniex quotò la moneta e iniziò a essere scambiata a 2 dollari l'una. Questa catena divenne nota come Ethereum Classic: la blockchain originale e inalterata.

Se detenevi ether prima del fork, ora avresti un Ethereum e un Ethereum Classic. Se detenevi un ether nella DAO, saresti stato in grado di prelevare un Ethereum dal contratto di rimborso. E se avessi appena hackerato la DAO, avresti fatto una discreta fortuna in Ethereum Classic: circa sette milioni di dollari.

#### L'eredità della DAO (16:14) {#legacy-of-the-dao-1614}

Inizialmente, Ethereum Classic guadagnò slancio come alternativa, con una forte community di fondamentalisti della blockchain che non erano d'accordo con il salvataggio. Ma da allora, Ethereum Classic non è riuscito a prendere piede ed esiste davvero solo come un'idea con scarsa utilità. Mentre Ethereum ospita migliaia di protocolli, Ethereum Classic ne ha solo alcuni di base. È chiaro che il fork aveva vinto.

Due mesi dopo, Robin Hood trasferì 2,9 milioni dei propri Ethereum Classic su Poloniex e li vendette tutti per Ethereum nel tentativo di far crollare il prezzo. Il 14% fu convertito con successo, ma l'86% fu congelato da Poloniex e restituito al gruppo. Robin Hood istituì un contratto di rimborso sulla rete Ethereum Classic per gli utenti colpiti dall'hack della DAO.

Per quanto riguarda l'hacker, se ne andò con 3,6 milioni di Ethereum Classic, del valore di 150 milioni di dollari oggi. Ma se non ci fosse stato alcun fork, quei 3,6 milioni di Ethereum varrebbero oggi oltre sette miliardi di dollari.

#### L'impatto duraturo della DAO (17:26) {#the-daos-lasting-impact-1726}

È importante notare che la DAO è ora comunemente chiamata Genesis DAO per evitare confusione, perché è stata la prima DAO ma sicuramente non l'ultima. Nonostante le battute d'arresto iniziali, le DAO sono diventate sempre più popolari. MakerDAO governa la stablecoin DAI, e i protocolli di finanza decentralizzata (DeFi) come Uniswap con il suo token UNI di solito hanno una DAO di governance. Tutte queste DAO si sono basate sulle esperienze dei progetti precedenti per creare organizzazioni ancora più versatili e di successo.

Ma la Genesis DAO è stata la prima nel suo genere, creata come un esperimento, per giunta costoso, che controllava 250 milioni di dollari al suo apice, ovvero il 15% dell'offerta totale di Ethereum. Christoph Jentzsch, lo sviluppatore principale, si aspettava solo che raccogliesse cinque milioni di dollari e in seguito disse di pentirsi di non aver posto un limite. Per un esperimento così grande, era decisamente troppo presto e certamente troppo grande per fallire.

Creare uno smart contract è come sviluppare un'auto a guida autonoma: è una grande responsabilità che richiede test approfonditi per evitare incidenti. Anche con questa nuova cautela, i protocolli DeFi vengono ancora hackerati per oltre 50 milioni di dollari, alcuni persino dopo essere stati controllati da società di revisione professionali. Ma dall'hack della DAO, non ci sono stati più salvataggi. La community di Ethereum è più forte ora ed è pronta a passare a progetti ancora più grandi e ambiziosi, costruendo la prossima generazione di applicazioni digitali.