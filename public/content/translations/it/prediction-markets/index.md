---
title: Mercati predittivi
lang: it
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Fai trading sull'esito di eventi futuri"
  - "I prezzi fungono da stima pubblica e in tempo reale della probabilità che qualcosa accada"
buttons:
  - content: Scopri di più
    toId: how-prediction-markets-work
  - content: Esplora le app
    toId: find-a-prediction-market
    isSecondary: false
---

I mercati predittivi consentono alle persone di acquistare e vendere quote sull'esito di eventi futuri. Il prezzo di una quota indica quanto il mercato nel suo complesso ritenga probabile tale esito. Hanno attirato molta attenzione durante le elezioni statunitensi del 2024.

## Come funzionano i mercati predittivi {#how-prediction-markets-work}

Ogni mercato pone una domanda con una risposta chiara, come "Pioverà a Lisbona domani?". Una quota **Sì** paga 1 $ se la risposta si rivela affermativa e nulla in caso contrario. Una quota **No** funziona al contrario.

Se le quote Sì vengono scambiate a 67 centesimi, il mercato sta dicendo che c'è circa il 67% di probabilità di pioggia. Chiunque pensi che la probabilità reale sia diversa può comprare o vendere, e questo sposta il prezzo. Poiché le persone che hanno maggiori informazioni hanno un motivo per fare trading, le nuove informazioni tendono a riflettersi rapidamente nel prezzo. Ecco perché i mercati predittivi possono essere previsioni utili. Non sono perfette.

Ogni quota vincente viene pagata da qualcuno che deteneva la parte perdente. I mercati predittivi sono a **somma zero**: a parte le commissioni, ciò che i vincitori guadagnano, i perdenti lo perdono.

## Perché è importante? {#why-does-this-matter}

I mercati predittivi basati su blockchain aggiungono alcune cose che i siti di scommesse e gli exchange tradizionali non offrono:

<Grid>
  <Card title="Dati aperti" emoji="🔍" description="Ogni operazione è registrata onchain, quindi chiunque può controllare prezzi, volumi e chi ha vinto o perso."/>
  <Card title="Regolamento onchain" emoji="🌎" description="Le posizioni sono token nel tuo portafoglio e gli smart contract pagano le quote vincenti una volta riportato il risultato." />
  <Card title="Quote guidate dal mercato" emoji="🤝" description="I prezzi sono stabiliti dai trader che comprano e vendono quote di esito, piuttosto che preimpostati da un allibratore centralizzato." />
</Grid>

I dati aperti sono importanti nella pratica. I ricercatori sono stati in grado di [studiare ogni operazione su Polymarket](https://cepr.org/publications/dp21615), coprendo oltre 2,4 milioni di utenti da novembre 2022 a marzo 2026, perché le sue operazioni vengono regolate su una blockchain pubblica. Questo tipo di controllo indipendente non è possibile su piattaforme centralizzate come Kalshi, dove il trading e i pagamenti avvengono sui sistemi dell'azienda stessa. Non esiste alcun registro pubblico da verificare e nessuno smart contract che garantisca il pagamento delle posizioni vincenti.

Ecco come si svolge un mercato dall'inizio alla fine:

1. Viene creato un mercato attorno a una domanda con regole chiare su come verrà decisa.
2. I trader comprano e vendono quote Sì e No, e il prezzo si muove di conseguenza.
3. Una volta che l'evento si verifica, un [oracolo](/developers/docs/oracles/) riporta il risultato onchain. Su Polymarket, chiunque può proporre il risultato versando un deposito e chiunque altro può contestarlo. Se una controversia non viene risolta, i detentori del token UMA votano sull'esito.
4. Ogni quota vincente può essere riscattata per 1 $. Le quote perdenti non valgono nulla.
5. Chiunque può utilizzare la cronologia dei prezzi e i dati di trading per ricerche o discussioni.

## Trova un mercato predittivo {#find-a-prediction-market}

Questi mercati predittivi regolano le operazioni onchain, in modo che chiunque possa controllare i prezzi e la cronologia di trading:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Tieni a mente i rischi</strong></p>
  <p className="mt-2">La maggior parte delle persone che fa trading sui mercati predittivi perde denaro. Fai trading solo con ciò che puoi permetterti di perdere e fai attenzione a potenziali comportamenti di dipendenza.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Sfide e rischi {#challenges-and-risks}

I mercati predittivi affrontano sfide reali che influiscono su equità, legalità e accuratezza.

📉 **La maggior parte dei trader perde** – Uno [studio di ogni operazione su Polymarket](https://cepr.org/publications/dp21615) da novembre 2022 a marzo 2026 ha rilevato che circa il 69% degli utenti ha chiuso in perdita. Tra gli utenti che hanno guadagnato, l'1% superiore ha ottenuto il 76,5% dei profitti. I maggiori vincitori sono stati per lo più trader che forniscono liquidità con ordini limite, spesso a livello professionale e con volumi elevati.

🕵️ **Insider trading** – Le persone che conoscono l'esito in anticipo possono trarre profitto a spese degli altri trader. [I ricercatori della Columbia Law School e dell'Università di Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) hanno stimato che i sospetti trader informati abbiano guadagnato circa 143 milioni di dollari su Polymarket tra febbraio 2024 e febbraio 2026.

⚖️ **Risultati contestati** – Gli smart contract possono pagare automaticamente, ma qualcuno deve comunque riportare l'accaduto. Quando una domanda è formulata in modo approssimativo o i fatti non sono chiari, il risultato riportato può essere contestato.

⚠️ **Manipolazione del mercato** – I trader con molto denaro possono spostare i prezzi, specialmente nei mercati piccoli. Il wash trading (fare trading con se stessi) può far sembrare un mercato più attivo di quanto non sia.

💧 **Problemi di liquidità** – Una bassa partecipazione ([scarsa liquidità](https://www.investopedia.com/terms/t/thinmarket.asp)) può rendere i prezzi meno affidabili.

🏛 **Incertezza normativa** – Le regole differiscono da paese a paese e cambiano rapidamente. Negli Stati Uniti, le autorità di regolamentazione e i tribunali stanno ancora decidendo se alcuni contratti su eventi, specialmente sportivi, contino come prodotti finanziari o gioco d'azzardo. Molte piattaforme bloccano gli utenti in determinati paesi.

## Sperimentare con i mercati predittivi {#experimenting-with-prediction-markets}

I mercati predittivi possono essere utili oltre al trading a scopo di lucro. Un'idea, chiamata futarchia, si spinge oltre e utilizza i mercati per aiutare a prendere decisioni, non solo per fare previsioni.

Ad esempio, una [Proposta di Miglioramento di Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) ha suggerito che gli organizzatori di Devcon utilizzino i mercati predittivi per prevedere l'affluenza in possibili sedi future. Questo potrebbe aiutarli a soppesare quale città attirerebbe l'evento più grande rispetto a quale sarebbe la più accessibile a livello internazionale. Potrebbe anche far risparmiare tempo speso a confrontare le politiche sui visti, l'accesso agli aeroporti e il costo della vita, mostrando al contempo dove i potenziali partecipanti sarebbero entusiasti di andare.

## Letture consigliate {#further-reading}

[Dai mercati predittivi all'info-finanza](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Chi vince e chi perde nei mercati predittivi? Evidenze da Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie e Martineau  
[Il whitepaper del progetto Augur](https://github.com/AugurProject/whitepaper)
