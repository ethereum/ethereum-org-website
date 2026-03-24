---
title: Cronologia di tutte le biforcazioni di Ethereum (dal 2014 a oggi)
description: Una storia della blockchain di Ethereum che include le tappe fondamentali, i rilasci e le biforcazioni.
lang: it
sidebarDepth: 1
---

# Cronologia di tutte le biforcazioni di Ethereum (dal 2014 a oggi) {#the-history-of-ethereum}

Una cronologia di tutte le tappe fondamentali, le biforcazioni e gli aggiornamenti alla [blockchain](/) di Ethereum.

<ExpandableCard title="Cosa sono le biforcazioni?" contentPreview="Modifiche alle regole del protocollo di Ethereum che spesso includono aggiornamenti tecnici pianificati.">

Le biforcazioni avvengono quando è necessario apportare importanti aggiornamenti tecnici o modifiche alla rete: in genere derivano dalle [proposte di miglioramento di ethereum (EIP)](/eips/) e cambiano le "regole" del protocollo.

Quando sono necessari aggiornamenti nel software tradizionale controllato centralmente, l'azienda pubblica semplicemente una nuova versione per l'utente finale. Le blockchain funzionano diversamente perché non c'è una proprietà centrale. I [client di Ethereum](/developers/docs/nodes-and-clients/) devono aggiornare il loro software per implementare le nuove regole della biforcazione. Inoltre, i creatori di blocchi (i minatori in un mondo basato sulla prova di lavoro, i validatori in un mondo basato sulla prova di stake) e i nodi devono creare blocchi e convalidarli secondo le nuove regole. [Maggiori informazioni sui meccanismi di consenso](/developers/docs/consensus-mechanisms/)

Queste modifiche alle regole possono creare una divisione temporanea nella rete. I nuovi blocchi potrebbero essere prodotti secondo le nuove regole o quelle vecchie. Le biforcazioni sono solitamente concordate in anticipo in modo che i client adottino le modifiche all'unisono e la biforcazione con gli aggiornamenti diventi la catena principale. Tuttavia, in rari casi, i disaccordi sulle biforcazioni possono causare una divisione permanente della rete, in particolare la creazione di Ethereum Classic con la <a href="#dao-fork">biforcazione DAO</a>.
</ExpandableCard>

<ExpandableCard title="Perché alcuni aggiornamenti hanno più nomi?" contentPreview="I nomi degli aggiornamenti seguono uno schema">

Il software alla base di Ethereum è composto da due metà, note come [livello di esecuzione](/glossary/#execution-layer) e [livello di consenso](/glossary/#consensus-layer).

**Denominazione degli aggiornamenti di esecuzione**

Dal 2021, gli aggiornamenti al **livello di esecuzione** prendono il nome dalle città delle [precedenti sedi di Devcon e Devconnect](https://devcon.org/en/past-events/) in ordine cronologico:

| Nome dell'aggiornamento | Anno Devcon(nect) | Numero Devcon | Data dell'aggiornamento |
| -------------- | ----------------- | ------------- | ------------ |
| Berlin         | 2014              | 0             | 15 apr 2021  |
| London         | 2015              | I             | 5 ago 2021   |
| Shanghai       | 2016              | II            | 12 apr 2023  |
| Cancun         | 2017              | III           | 13 mar 2024  |
| Prague         | 2018              | IV            | 7 mag 2025   |
| Osaka          | 2019              | V             | 3 dic 2025   |
| **Amsterdam**  | 2022              | Devconnect    | Da definire - Prossimo |
| _Bogotá_       | 2022              | VI            | Da definire  |
| _Istanbul_     | 2023              | Devconnect    | Da definire  |
| _Bangkok_      | 2024              | VII           | Da definire  |
| _Buenos Aires_ | 2025              | Devconnect    | Da definire  |
| _Mumbai_       | 2026              | VIII          | Da definire  |

**Denominazione degli aggiornamenti di consenso**

Dal lancio della [beacon chain](/glossary/#beacon-chain), gli aggiornamenti al **livello di consenso** prendono il nome da stelle celesti che iniziano con lettere in ordine alfabetico:

| Nome dell'aggiornamento                                   | Data dell'aggiornamento |
| --------------------------------------------------------- | ------------ |
| Genesi della beacon chain                                 | 1 dic 2020   |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 ott 2021  |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 set 2022   |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 apr 2023  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 mar 2024  |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 mag 2025   |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 dic 2025   |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Da definire - Prossimo |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Da definire  |

**Denominazione combinata**

Gli aggiornamenti di esecuzione e consenso sono stati inizialmente implementati in momenti diversi, ma dopo [La Fusione (The Merge)](/roadmap/merge/) nel 2022 sono stati distribuiti simultaneamente. Di conseguenza, sono emersi termini colloquiali per semplificare i riferimenti a questi aggiornamenti utilizzando un singolo termine congiunto. Questo è iniziato con l'aggiornamento _Shanghai-Capella_, comunemente indicato come "**Shapella**", e continua con gli aggiornamenti successivi.

| Aggiornamento di esecuzione | Aggiornamento di consenso | Nome breve    |
| ----------------- | ----------------- | ------------- |
| Shanghai          | Capella           | "Shapella"    |
| Cancun            | Deneb             | "Dencun"      |
| Prague            | Electra           | "Pectra"      |
| Osaka             | Fulu              | "Fusaka"      |
| Amsterdam         | Gloas             | "Glamsterdam" |
| Bogotá            | Heze              | "Hegotá"      |
</ExpandableCard>

Passa direttamente alle informazioni su alcuni degli aggiornamenti passati particolarmente importanti: [La beacon chain](/roadmap/beacon-chain/); [La Fusione (The Merge)](/roadmap/merge/); ed [EIP-1559](#london)

Cerchi futuri aggiornamenti del protocollo? [Scopri i prossimi aggiornamenti sul piano d'azione di Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Maggiori informazioni su Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

L'aggiornamento Prague-Electra ("Pectra") ha incluso diversi miglioramenti al protocollo di Ethereum volti a migliorare l'esperienza per tutti gli utenti, le reti di livello 2, gli staker e gli operatori dei nodi.

Lo staking ha ricevuto un aggiornamento con account dei validatori a capitalizzazione composta e un migliore controllo sui fondi in stake utilizzando l'indirizzo di prelievo di esecuzione. L'EIP-7251 ha aumentato il saldo effettivo massimo per un singolo validatore a 2048, migliorando l'efficienza del capitale per gli staker. L'EIP-7002 ha consentito a un account di esecuzione di attivare in modo sicuro le azioni del validatore, inclusa l'uscita o il prelievo di porzioni dei fondi, migliorando l'esperienza per gli staker di ETH e contribuendo a rafforzare la responsabilità degli operatori dei nodi.

Altre parti dell'aggiornamento si sono concentrate sul miglioramento dell'esperienza per gli utenti normali. L'EIP-7702 ha introdotto la possibilità per un normale account non basato su contratto intelligente ([EOA](/glossary/#eoa)) di eseguire codice simile a un contratto intelligente. Ciò ha sbloccato nuove funzionalità illimitate per gli account Ethereum tradizionali, come il raggruppamento delle transazioni, la sponsorizzazione del gas, l'autenticazione alternativa, i controlli di spesa programmabili, i meccanismi di recupero dell'account e altro ancora.

<ExpandableCard title="EIP di Pectra" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

Migliore esperienza utente:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Imposta il codice dell'account EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Aumento del throughput dei blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Aumento del costo dei calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Aggiunta della pianificazione dei blob ai file di configurazione EL</em></li>
</ul>

Migliore esperienza di staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Aumento del <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Uscite attivabili dal livello di esecuzione</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Richieste del livello di esecuzione per scopi generali</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Fornitura dei depositi dei validatori on-chain</em></li>
</ul>

Miglioramenti all'efficienza e alla sicurezza del protocollo:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Precompilazione per le operazioni della curva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Salvataggio degli hash dei blocchi storici nello stato</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Spostamento dell'indice del comitato fuori dall'Attestazione</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Come Pectra migliorerà l'esperienza di staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Leggi le specifiche dell'aggiornamento Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Domande frequenti su Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Riepilogo di Cancun {#cancun-summary}

L'aggiornamento Cancun contiene una serie di miglioramenti all'_esecuzione_ di Ethereum volti a migliorare la scalabilità, in tandem con gli aggiornamenti di consenso Deneb.

In particolare, questo include l'EIP-4844, noto come **Proto-Danksharding**, che riduce significativamente il costo di archiviazione dei dati per i rollup di livello 2. Ciò si ottiene attraverso l'introduzione di "blob" di dati che consentono ai rollup di pubblicare dati sulla rete principale per un breve periodo di tempo. Ciò si traduce in commissioni della transazione significativamente inferiori per gli utenti dei rollup di livello 2.

<ExpandableCard title="EIP di Cancun" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Opcode di archiviazione transitoria</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Radice del blocco della beacon chain nell'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transazioni blob frammentate (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Istruzione di copia della memoria</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> solo nella stessa transazione</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Opcode <code>BLOBBASEFEE</code></em></li>
</ul>
</ExpandableCard>

- [Rollup di livello 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Leggi le specifiche dell'aggiornamento Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Riepilogo di Deneb {#deneb-summary}

L'aggiornamento Deneb contiene una serie di miglioramenti al _consenso_ di Ethereum volti a migliorare la scalabilità. Questo aggiornamento arriva in tandem con gli aggiornamenti di esecuzione Cancun per abilitare il Proto-Danksharding (EIP-4844), insieme ad altri miglioramenti alla beacon chain.

I "messaggi di uscita volontaria" firmati pre-generati non scadono più, dando così maggiore controllo agli utenti che mettono in stake i propri fondi con un operatore di nodo di terze parti. Con questo messaggio di uscita firmato, gli staker possono delegare l'operazione del nodo mantenendo la possibilità di uscire in sicurezza e prelevare i propri fondi in qualsiasi momento, senza dover chiedere il permesso a nessuno.

L'EIP-7514 porta a un inasprimento dell'emissione di ETH limitando il tasso di "abbandono" (churn) con cui i validatori possono unirsi alla rete a otto (8) per epoca. Poiché l'emissione di ETH è proporzionale al totale di ETH in stake, limitare il numero di validatori che si uniscono limita il _tasso di crescita_ dei nuovi ETH emessi, riducendo al contempo i requisiti hardware per gli operatori dei nodi, favorendo la decentralizzazione.

<ExpandableCard title="EIP di Deneb" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Radice del blocco della beacon chain nell'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transazioni blob frammentate</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Uscite volontarie firmate perennemente valide</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumento dello slot massimo di inclusione dell'attestazione</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Aggiunta del limite massimo di abbandono dell'epoca</em></li>
</ul>
</ExpandableCard>

- [Leggi le specifiche dell'aggiornamento Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Domande frequenti su Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Riepilogo di Shanghai {#shanghai-summary}

L'aggiornamento Shanghai ha portato i prelievi di staking al livello di esecuzione. In tandem con l'aggiornamento Capella, questo ha permesso ai blocchi di accettare operazioni di prelievo, il che consente agli staker di prelevare i propri ETH dalla beacon chain al livello di esecuzione.

<ExpandableCard title="EIP di Shanghai" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Avvia l'indirizzo <code>COINBASE</code> a caldo</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nuova istruzione <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limita e misura l'initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Prelievi push della beacon chain come operazioni</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecazione di <code>SELFDESTRUCT</code></em></li>
</ul>
</ExpandableCard>

- [Leggi le specifiche dell'aggiornamento Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Riepilogo di Capella {#capella-summary}

L'aggiornamento Capella è stato il terzo importante aggiornamento al livello di consenso (beacon chain) e ha abilitato i prelievi di staking. Capella si è verificato in modo sincrono con l'aggiornamento del livello di esecuzione, Shanghai, e ha abilitato la funzionalità di prelievo dello staking.

Questo aggiornamento del livello di consenso ha offerto agli staker che non avevano fornito le credenziali di prelievo con il loro deposito iniziale la possibilità di farlo, abilitando così i prelievi.

L'aggiornamento ha fornito anche la funzionalità di pulizia automatica dell'account, che elabora continuamente gli account dei validatori per eventuali pagamenti di ricompense disponibili o prelievi completi.

- [Maggiori informazioni sui prelievi di staking](/staking/withdrawals/).
- [Leggi le specifiche dell'aggiornamento Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (La Fusione) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Riepilogo {#paris-summary}

L'aggiornamento Paris è stato innescato dal superamento da parte della blockchain basata sulla prova di lavoro di una [difficoltà totale terminale](/glossary/#terminal-total-difficulty) di 58750000000000000000000. Ciò è avvenuto al blocco 15537393 il 15 settembre 2022, innescando l'aggiornamento Paris al blocco successivo. Paris è stata la transizione de [La Fusione (The Merge)](/roadmap/merge/): la sua caratteristica principale è stata lo spegnimento dell'algoritmo di mining basato sulla [prova di lavoro](/developers/docs/consensus-mechanisms/pow) e della logica di consenso associata, per passare invece alla [prova di stake](/developers/docs/consensus-mechanisms/pos). Paris stesso è stato un aggiornamento ai [client di esecuzione](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix sul livello di consenso) che ha permesso loro di ricevere istruzioni dai [client di consenso](/developers/docs/nodes-and-clients/#consensus-clients) connessi. Ciò ha richiesto l'attivazione di un nuovo set di metodi API interni, noti collettivamente come [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Questo è stato probabilmente l'aggiornamento più significativo nella storia di Ethereum da [Homestead](#homestead)!

- [Leggi le specifiche dell'aggiornamento Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP di Paris" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Aggiornamento del consenso alla prova di stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Sostituzione dell'opcode DIFFICULTY con PREVRANDAO</em></li>
</ul>
</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Riepilogo {#bellatrix-summary}

L'aggiornamento Bellatrix è stato il secondo aggiornamento programmato per la [beacon chain](/roadmap/beacon-chain), preparando la catena per [La Fusione (The Merge)](/roadmap/merge/). Porta le penalità dei validatori ai loro valori massimi per inattività e infrazioni punibili (slashing). Bellatrix include anche un aggiornamento alle regole di scelta della biforcazione per preparare la catena a La Fusione e alla transizione dall'ultimo blocco basato sulla prova di lavoro al primo blocco basato sulla prova di stake. Ciò include rendere i client di consenso consapevoli della [difficoltà totale terminale](/glossary/#terminal-total-difficulty) di 58750000000000000000000.

- [Leggi le specifiche dell'aggiornamento Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Riepilogo {#gray-glacier-summary}

L'aggiornamento della rete Gray Glacier ha posticipato la [bomba di difficoltà](/glossary/#difficulty-bomb) di tre mesi. Questa è l'unica modifica introdotta in questo aggiornamento ed è di natura simile agli aggiornamenti [Arrow Glacier](#arrow-glacier) e [Muir Glacier](#muir-glacier). Modifiche simili sono state eseguite sugli aggiornamenti di rete [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog della Fondazione Ethereum - Annuncio dell'aggiornamento Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP di Gray Glacier" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>ritarda la bomba di difficoltà fino a settembre 2022</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Riepilogo {#arrow-glacier-summary}

L'aggiornamento della rete Arrow Glacier ha posticipato la [bomba di difficoltà](/glossary/#difficulty-bomb) di diversi mesi. Questa è l'unica modifica introdotta in questo aggiornamento ed è di natura simile all'aggiornamento [Muir Glacier](#muir-glacier). Modifiche simili sono state eseguite sugli aggiornamenti di rete [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog della Fondazione Ethereum - Annuncio dell'aggiornamento Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Aggiornamento Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP di Arrow Glacier" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>ritarda la bomba di difficoltà fino a giugno 2022</em></li>
</ul>
</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Riepilogo {#altair-summary}

L'aggiornamento Altair è stato il primo aggiornamento programmato per la [beacon chain](/roadmap/beacon-chain). Ha aggiunto il supporto per i "comitati di sincronizzazione", abilitando i client leggeri, e ha aumentato le penalità per inattività e punizione (slashing) dei validatori man mano che lo sviluppo procedeva verso La Fusione (The Merge).

- [Leggi le specifiche dell'aggiornamento Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Curiosità! {#altair-fun-fact}

Altair è stato il primo importante aggiornamento di rete ad avere un orario di lancio esatto. Ogni aggiornamento precedente si basava su un numero di blocco dichiarato sulla catena basata sulla prova di lavoro, dove i tempi dei blocchi variano. La beacon chain non richiede la risoluzione della prova di lavoro e funziona invece su un sistema di epoche basato sul tempo, costituito da 32 "slot" di tempo di dodici secondi in cui i validatori possono proporre blocchi. Ecco perché sapevamo esattamente quando avremmo raggiunto l'epoca 74.240 e Altair sarebbe diventato attivo!

- [Tempo di blocco](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Riepilogo {#london-summary}

L'aggiornamento London ha introdotto l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), che ha riformato il mercato delle commissioni della transazione, insieme a modifiche al modo in cui vengono gestiti i rimborsi del gas e alla pianificazione dell'[Era Glaciale (Ice Age)](/glossary/#ice-age).

#### Cos'era l'aggiornamento London / EIP-1559? {#eip-1559}

Prima dell'aggiornamento London, Ethereum aveva blocchi di dimensioni fisse. In periodi di elevata domanda della rete, questi blocchi operavano a piena capacità. Di conseguenza, gli utenti spesso dovevano aspettare che la domanda si riducesse per essere inclusi in un blocco, il che portava a una scarsa esperienza utente. L'aggiornamento London ha introdotto blocchi di dimensioni variabili su Ethereum.

Il modo in cui venivano calcolate le commissioni della transazione sulla rete Ethereum è cambiato con [l'aggiornamento London](/ethereum-forks/#london) di agosto 2021. Prima dell'aggiornamento London, le commissioni venivano calcolate senza separare le commissioni `base` e `priority` (priorità), come segue:

Supponiamo che Alice dovesse pagare a Bob 1 ETH. Nella transazione, il limite del gas è di 21.000 unità e il prezzo del gas è di 200 gwei.

La commissione totale sarebbe stata: `Unità di gas (limite) * Prezzo del gas per unità`, ovvero `21.000 * 200 = 4.200.000 gwei` o 0,0042 ETH

L'implementazione dell'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) nell'aggiornamento London ha reso il meccanismo delle commissioni della transazione più complesso, ma ha reso le commissioni del gas più prevedibili, risultando in un mercato delle commissioni della transazione più efficiente. Gli utenti possono inviare transazioni con una `maxFeePerGas` corrispondente a quanto sono disposti a pagare per l'esecuzione della transazione, sapendo che non pagheranno più del prezzo di mercato per il gas (`baseFeePerGas`), e ottenere il rimborso di qualsiasi extra, meno la loro mancia.

Questo video spiega l'EIP-1559 e i vantaggi che porta: [Spiegazione dell'EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Sei uno sviluppatore di dApp? Assicurati di aggiornare le tue librerie e i tuoi strumenti.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Leggi la spiegazione degli Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP di London" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>migliora il mercato delle commissioni della transazione</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>restituisce la <code>BASEFEE</code> da un blocco</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>riduce i rimborsi del gas per le operazioni EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>impedisce la distribuzione di contratti che iniziano con <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>ritarda l'Era Glaciale fino a dicembre 2021</em></li>
</ul>
</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Riepilogo {#berlin-summary}

L'aggiornamento Berlin ha ottimizzato il costo del gas per alcune azioni dell'EVM e aumenta il supporto per più tipi di transazione.

- [Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Leggi la spiegazione degli Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP di Berlin" contentPreview="Miglioramenti ufficiali inclusi in questo aggiornamento.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>abbassa il costo del gas di ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>consente un supporto più semplice per più tipi di transazione</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>aumenti del costo del gas per gli opcode di accesso allo stato</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>aggiunge elenchi di accesso opzionali</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genesi della beacon chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Riepilogo {#beacon-chain-genesis-summary}

La [beacon chain](/roadmap/beacon-chain/) necessitava di 16384 depositi di 32 ETH in stake per essere lanciata in sicurezza. Ciò è avvenuto il 27 novembre e la beacon chain ha iniziato a produrre blocchi il 1° dicembre 2020.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  La beacon chain
</DocLink>

---

### Contratto di deposito di staking distribuito {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Riepilogo {#deposit-contract-summary}

Il contratto di deposito di staking ha introdotto lo [staking](/glossary/#staking) nell'ecosistema di Ethereum. Sebbene fosse un contratto sulla [rete principale](/glossary/#mainnet), ha avuto un impatto diretto sulla tempistica per il lancio della [beacon chain](/roadmap/beacon-chain/), un importante [aggiornamento di Ethereum](/roadmap/).

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Riepilogo {#muir-glacier-summary}

La biforcazione Muir Glacier ha introdotto un ritardo alla [bomba di difficoltà](/glossary/#difficulty-bomb). Gli aumenti della difficoltà dei blocchi del meccanismo di consenso basato sulla [prova di lavoro](/developers/docs/consensus-mechanisms/pow/) minacciavano di degradare l'usabilità di Ethereum aumentando i tempi di attesa per l'invio di transazioni e l'utilizzo delle dApp.

- [Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Leggi la spiegazione degli Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP di Muir Glacier" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>ritarda la bomba di difficoltà per altri 4.000.000 di blocchi, o ~611 giorni.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Riepilogo {#istanbul-summary}

La biforcazione Istanbul:

- Ha ottimizzato il costo del [gas](/glossary/#gas) di alcune azioni nella [macchina virtuale di Ethereum (EVM)](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha migliorato la resilienza agli attacchi denial-of-service.
- Ha reso più performanti le soluzioni di [scalabilità di livello 2](/developers/docs/scaling/#layer-2-scaling) basate su SNARK e STARK.
- Ha consentito a Ethereum e Zcash di interoperare.
- Ha permesso ai contratti di introdurre funzioni più creative.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP di Istanbul" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>consente a Ethereum di funzionare con valute che preservano la privacy come Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>crittografia più economica per migliorare i costi del [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protegge Ethereum dagli attacchi di replay aggiungendo l'[opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>ottimizzazione dei prezzi del gas degli opcode in base al consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>riduce il costo di CallData per consentire più dati nei blocchi – utile per la [scalabilità di livello 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>altre alterazioni del prezzo del gas degli opcode.</em></li>
</ul>
</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Riepilogo {#constantinople-summary}

La biforcazione Constantinople:

- Ha ridotto le ricompense del blocco per il [mining](/developers/docs/consensus-mechanisms/pow/mining/) da 3 a 2 ETH.
- Ha assicurato che la blockchain non si bloccasse prima che [fosse implementata la prova di stake](#beacon-chain-genesis).
- Ha ottimizzato il costo del [gas](/glossary/#gas) di alcune azioni nella [macchina virtuale di Ethereum (EVM)](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha aggiunto la possibilità di interagire con indirizzi che non sono ancora stati creati.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP di Constantinople" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>ottimizza il costo di alcune azioni on-chain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>consente di interagire con indirizzi che devono ancora essere creati.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduce l'istruzione <code>EXTCODEHASH</code> per recuperare l'hash del codice di un altro contratto.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>assicura che la blockchain non si blocchi prima della prova di stake e riduce la ricompensa del blocco da 3 a 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Riepilogo {#byzantium-summary}

La biforcazione Byzantium:

- Ha ridotto le ricompense del blocco per il [mining](/developers/docs/consensus-mechanisms/pow/mining/) da 5 a 3 ETH.
- Ha ritardato la [bomba di difficoltà](/glossary/#difficulty-bomb) di un anno.
- Ha aggiunto la possibilità di effettuare chiamate che non modificano lo stato ad altri contratti.
- Ha aggiunto alcuni metodi di crittografia per consentire la [scalabilità di livello 2](/developers/docs/scaling/#layer-2-scaling).

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP di Byzantium" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>aggiunge l'opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>campo di stato aggiunto alle ricevute delle transazioni per indicare il successo o il fallimento.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>aggiunge la curva ellittica e la moltiplicazione scalare per consentire gli [ZK-Snark](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>aggiunge la curva ellittica e la moltiplicazione scalare per consentire gli [ZK-Snark](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>abilita la verifica della firma RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>aggiunge il supporto per i valori di ritorno a lunghezza variabile.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>aggiunge l'opcode <code>STATICCALL</code>, consentendo chiamate che non modificano lo stato ad altri contratti.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>modifica la formula di regolazione della difficoltà.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>ritarda la [bomba di difficoltà](/glossary/#difficulty-bomb) di 1 anno e riduce la ricompensa del blocco da 5 a 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Riepilogo {#spurious-dragon-summary}

La biforcazione Spurious Dragon è stata la seconda risposta agli attacchi denial of service (DoS) sulla rete (settembre/ottobre 2016), includendo:

- l'ottimizzazione dei prezzi degli opcode per prevenire futuri attacchi sulla rete.
- l'abilitazione del "debloat" (sgonfiamento) dello stato della blockchain.
- l'aggiunta della protezione contro gli attacchi di replay.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP di Spurious Dragon" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>impedisce che le transazioni da una catena di Ethereum vengano ritrasmesse su una catena alternativa, ad esempio una transazione di una rete di test che viene riprodotta sulla catena principale di Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>regola i prezzi dell'opcode <code>EXP</code> – rende più difficile rallentare la rete tramite operazioni di contratto computazionalmente costose.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>consente la rimozione di account vuoti aggiunti tramite gli attacchi DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>modifica la dimensione massima del codice che un contratto sulla blockchain può avere – a 24576 byte.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Riepilogo {#tangerine-whistle-summary}

La biforcazione Tangerine Whistle è stata la prima risposta agli attacchi denial of service (DoS) sulla rete (settembre/ottobre 2016), includendo:

- la risoluzione di problemi urgenti di salute della rete riguardanti codici operativi sottocosto.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP di Tangerine Whistle" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>aumenta i costi del gas degli opcode che possono essere utilizzati negli attacchi di spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>riduce le dimensioni dello stato rimuovendo un gran numero di account vuoti che sono stati inseriti nello stato a un costo molto basso a causa di difetti nelle versioni precedenti del protocollo di Ethereum.</em></li>
</ul>
</ExpandableCard>

---

### Biforcazione DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Riepilogo {#dao-fork-summary}

La biforcazione DAO è stata in risposta all'[attacco DAO del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) in cui un contratto [DAO](/glossary/#dao) non sicuro è stato prosciugato di oltre 3,6 milioni di ETH in un hack. La biforcazione ha spostato i fondi dal contratto difettoso a un [nuovo contratto](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una singola funzione: prelevare. Chiunque avesse perso fondi poteva prelevare 1 ETH per ogni 100 token DAO nei propri portafogli.

Questa linea di condotta è stata votata dalla comunità di Ethereum. Qualsiasi detentore di ETH ha potuto votare tramite una transazione su [una piattaforma di voto](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisione di biforcare ha raggiunto oltre l'85% dei voti.

Alcuni minatori si sono rifiutati di biforcare perché l'incidente della DAO non era un difetto nel protocollo. Hanno continuato a formare [Ethereum Classic](https://ethereumclassic.org/).

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Riepilogo {#homestead-summary}

La biforcazione Homestead che guardava al futuro. Includeva diverse modifiche al protocollo e una modifica alla rete che ha dato a Ethereum la possibilità di effettuare ulteriori aggiornamenti di rete.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP di Homestead" contentPreview="Miglioramenti ufficiali inclusi in questa biforcazione.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>apporta modifiche al processo di creazione del contratto.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>aggiunge un nuovo opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduce i requisiti di compatibilità in avanti di devp2p</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Scongelamento di Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Riepilogo {#frontier-thawing-summary}

La biforcazione di scongelamento di Frontier ha rimosso il limite di 5.000 [gas](/glossary/#gas) per [blocco](/glossary/#block) e ha impostato il prezzo del gas predefinito a 51 [gwei](/glossary/#gwei). Ciò ha consentito le transazioni: le transazioni richiedono 21.000 gas. La [bomba di difficoltà](/glossary/#difficulty-bomb) è stata introdotta per garantire una futura biforcazione hard alla [prova di stake](/glossary/#pos).

- [Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Leggi l'Aggiornamento del Protocollo Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Riepilogo {#frontier-summary}

Frontier era un'implementazione live, ma essenziale, del progetto Ethereum. Ha seguito la fase di test di successo Olympic. Era destinata agli utenti tecnici, in particolare agli sviluppatori. I [blocchi](/glossary/#block) avevano un limite di [gas](/glossary/#gas) di 5.000. Questo periodo di "scongelamento" ha permesso ai minatori di iniziare le loro operazioni e ai primi utilizzatori di installare i loro client senza doversi "affrettare".

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Vendita di Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether è stato ufficialmente messo in vendita per 42 giorni. Potevi acquistarlo con BTC.

[Leggi l'annuncio della Fondazione Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Rilascio dello Yellow Paper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Lo Yellow Paper, scritto dal Dr. Gavin Wood, è una definizione tecnica del protocollo di Ethereum.

[Visualizza lo Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Rilascio del Whitepaper {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Il documento introduttivo, pubblicato nel 2013 da Vitalik Buterin, il fondatore di Ethereum, prima del lancio del progetto nel 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>