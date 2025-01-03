---
title: Storia e diramazioni di Ethereum
description: Storia della blockchain Ethereum che include le principali pietre miliari, versioni e diramazioni.
lang: it
sidebarDepth: 1
---

# La storia di Ethereum {#the-history-of-ethereum}

Un viaggio nel tempo per illustrare tutte le principali pietre miliari, diramazioni e gli aggiornamenti della blockchain di Ethereum.

<ExpandableCard title="Cosa sono le diramazioni?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Le diramazioni si verificano quando è necessario apportare importanti aggiornamenti tecnici o modifiche alla rete; in genere derivano da <a href="/eips/">proposte di miglioramento di Ethereum (EIP)</a> e cambiano le "regole" del protocollo.

Quando sono necessari aggiornamenti in software tradizionali controllati centralmente, l'azienda pubblica una nuova versione per l'utente finale. Le blockchain funzionano diversamente perché non esiste una proprietà centrale. I <a href="/developers/docs/nodes-and-clients/">client di Ethereum</a> devono aggiornare il proprio software e implementare le regole della nuova diramazione. Inoltre i creatori dei blocchi (miner in contesto Proof of Work e validatori in contesto Proof of Stake) e i nodi devono creare blocchi e convalidarli in base alle nuove regole. <a href="/developers/docs/consensus-mechanisms/">Maggiori informazioni sui meccanismi di consenso</a>

Queste modifiche alle regole potrebbero creare una divisione temporanea nella rete. I nuovi blocchi potrebbero essere creati in base alle nuove regole o a quelle vecchie. Le diramazioni di solito sono concordate in anticipo in modo che i client adottino le modifiche all'unisono e la diramazione legata agli upgrade diventi la catena principale. Tuttavia, in rari casi, disaccordi sulle diramazioni possono causare una divisione permanente della rete, come è successo con la creazione di Ethereum Classic con la <a href="#dao-fork">diramazione DAO</a>.

</ExpandableCard>

Salta direttamente alle informazioni su alcuni degli ultimi aggiornamenti particolarmente importanti: [La Beacon Chain](/roadmap/beacon-chain/); [La Fusione](/roadmap/merge/) ed [EIP-1559](#london)

Stai cercando i prossimi aggiornamenti di protocollo? [Scopri di più sui prossimi aggiornamenti, nella roadmap di Ethereum](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Riepilogo di Shanghai {#shanghai-summary}

L'aggiornamento di Shanghai ha portato i prelievi di staking al livello d'esecuzione. Insieme all'aggiornamento Capella, questo abiliterà i blocchi ad accettare le operazioni di prelievo, che consentono agli staker di prelevare i propri ETH dalla Beacon Chain al livello d'esecuzione.

<ExpandableCard title="EIP di Shanghai" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Avvia il riscaldamento dell'indirizzo di <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nuova istruzione <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limita e misura initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>La Beacon Chain lancia i prelievi come operazioni</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Depreca <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Leggi le specifiche dell'aggiornamento Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Riepilogo di Capella {#capella-summary}

L'aggiornamento di Capella è il terzo aggiornamento principale al livello del consenso (Beacon Chain) e ha abilitato i prelievi di staking. Capella è avvenuto contemporaneamente all'aggiornamento del livello di esecuzione di Shanghai, e ha reso disponibili le funzioni di prelievo da staking.

Questo aggiornamento del livello del consenso ha comportato la possibilità, per gli staker che non hanno fornito le credenziali di prelievo con il loro deposito iniziale, di fornirlo, consentendo dunque i prelievi.

L'aggiornamento, inoltre, ha fornito la funzionalità di pulizia automatica dei conti, che elabora continuamente sui conti dei validatori qualsiasi pagamento di ricompense o prelievo completo disponibile.

- [Maggiori informazioni sui prelievi in staking](/staking/withdrawals/).
- [Leggi le specifiche dell'aggiornamento Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (la Fusione) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Riepilogo {#paris-summary}

L'aggiornamento Paris è stato attivato dal passaggio da una blockchain proof-of-work di una [difficoltà totale terminale](/glossary/#terminal-total-difficulty) di 58750000000000000000000. Questo è avvenuto al blocco 15537393 il 15 settembre 2022, innescando l'aggiornamento Paris dal blocco successivo. Paris è stata la transizione [alla Fusione](/roadmap/merge/): la sua caratteristica principale è lo spegnimento dell'algoritmo di mining [proof-of-work](/developers/docs/consensus-mechanisms/pow) e della relativa logica di consenso, e l'attivazione della [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Paris è stata un aggiornamento ai [client di esecuzione](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix a livello di consenso) che ha permesso loro di ricevere istruzioni dai loro [client di consenso](/developers/docs/nodes-and-clients/#consensus-clients) collegati. Questo ha richiesto l'attivazione di una nuova serie di metodi API interni, collettivamente noti come l'[API Engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Questo è stato probabilmente l'aggiornamento più significativo nella storia di Ethereum dopo [Homestead](#homestead)!

- [Leggi le specifiche dell'aggiornamento Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paris" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Aggiorna il consenso al Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Sostituisce l'opcode DIFFICULTY con PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Riepilogo {#bellatrix-summary}

L'aggiornamento Bellatrix è stato il secondo aggiornamento programmato per la [Beacon Chain](/roadmap/beacon-chain), preparando la catena per [la Fusione](/roadmap/merge/). Porta le penalità dei validatori al valore pieno per inattività e azioni sanzionabili (slashing). Bellatrix include anche un aggiornamento alle regole di scelta della diramazione per preparare la catena per la Fusione e la transizione dall'ultimo blocco di proof-of-work al primo blocco proof-of-stake. A tale scopo occorre far sì che i client di consenso siano consapevoli della [difficoltà terminale totale](/glossary/#terminal-total-difficulty) di 58750000000000000000000.

- [Leggi le specifiche dell'aggiornamento Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Riepilogo {#gray-glacier-summary}

L'aggiornamento della rete di Gray Glacier ha rimandato di tre mesi la [bomba di difficoltà](/glossary/#difficulty-bomb). Questa è l'unica modifica introdotta in questo aggiornamento ed è simile per natura agli aggiornamenti di [Arrow Glacier](#arrow-glacier) e [Muir Glacier](#muir-glacier). Modifiche simili sono state effettuate sugli aggiornamenti di rete [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog dell'EF - Annuncio dell'aggiornamento Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP di Gray Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>ritarda la bomba di difficoltà fino a settembre 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Riepilogo {#arrow-glacier-summary}

L'aggiornamento di rete Arrow Glacier ha rimandato la [bomba di difficoltà](/glossary/#difficulty-bomb) di diversi mesi. Questo è l'unico cambiamento introdotto in questo aggiornamento, ed è simile nella sostanza all'aggiornamento [Muir Glacier](#muir-glacier). Modifiche simili sono state effettuate sugli aggiornamenti di rete [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog dell'EF - Annuncio dell'aggiornamento Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Aggiornamento Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP di Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>ritarda la bomba di difficoltà fino a giugno 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Riepilogo {#altair-summary}

L'aggiornamento Altair è stato il primo aggiornamento pianificato per la [Beacon Chain](/roadmap/beacon-chain). Ha aggiunto il supporto per le "commissioni di sincronizzazione", abilitando i "client leggeri", aumentando le penalità per inattività e slashing per i validatori man mano che lo sviluppo procedeva verso la Fusione.

- [Leggi le specifiche dell'aggiornamento di Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Curiosità! {#altair-fun-fact}

Altair è stato il primo importante aggiornamento di rete che ha avuto un tempo di rollout esatto. Tutti gli aggiornamenti precedenti erano basati su un numero di blocco dichiarato su una catena proof-of-work, dove i tempi del blocco variavano. La Beacon Chain non richiede la risoluzione del proof-of-work e funziona invece su un sistema di epoche basato sul tempo che consiste in 32 "slot" di dodici secondi in cui i validatori possono proporre dei blocchi. Questo è il motivo per cui sapevamo esattamente quando avremmo raggiunto l'epoca 74.240 e Altair sarebbe diventato operativo!

- [Tempo di blocco](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Riepilogo {#london-summary}

L'aggiornamento London ha introdotto l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), che ha riformato il mercato delle commissioni sulle transazioni, oltre a modificare come sono gestiti i rimborsi di carburante e la pianificazione di [Ice Age](/glossary/#ice-age).

- [Sei uno sviluppatore di dapp? Assicurati di aggiornare le tue librerie e i tuoi strumenti.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Leggi la spiegazione del Cat Herder di Ethereum](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP di London" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>migliora il mercato delle commissioni sulle transazioni</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>restituisce la <code>BASEFEE</code> da un blocco</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>riduce i rimborsi di carburante per le operazioni dell'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>impedisce la distribuzione dei contratti che iniziano con <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>ritarda l'Era Glaciale fino a dicembre 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Riepilogo {#berlin-summary}

L'aggiornamento Berlin ha ottimizzato i costi del carburante per certe azioni dell'EVM e ha aumentato il supporto per vari tipi di transazioni.

- [Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Leggi la spiegazione del Cat Herder di Ethereum](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP di Berlin" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>riduce il costo del carburante di ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>facilita il supporto per svariati tipi di transazioni</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>il costo del carburante aumenta per gli opcode d'accesso allo stato</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>aggiunge elenchi d'accesso facoltativi</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genesi della Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Riepilogo {#beacon-chain-genesis-summary}

La [Beacon Chain](/roadmap/beacon-chain/) necessita di 16384 depositi da 32 ETH di staking per poter funzionare in sicurezza. Questo è successo il 27 novembre, quindi la Beacon Chain ha iniziato a produrre blocchi il 1° dicembre 2020. Questa è una prima fase importante nel percorso per raggiungere la [visione di Ethereum](/roadmap/vision/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  La beacon chain
</DocLink>

---

### Distribuzione del contratto di deposito in staking {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Riepilogo {#deposit-contract-summary}

Il contratto di deposito in staking ha introdotto lo [staking](/glossary/#staking) all'ecosistema di Ethereum. Nonostante fosse un contratto della [Rete principale](/glossary/#mainnet), ha avuto un impatto diretto sulla linea temporale per il lancio della [Beacon Chain](/roadmap/beacon-chain/), un importante [aggiornamento di Ethereum](/roadmap/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Riepilogo {#muir-glacier-summary}

La diramazione Muir Glacier ha introdotto un ritardo nella [bomba di difficoltà](/glossary/#difficulty-bomb). Aumenta la difficoltà del blocco del meccanismo di consenso [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/), che rischiava di peggiorare l'utilizzabilità di Ethereum, aumentando i tempi d'attesa per l'invio delle transazioni e l'uso delle dapp.

- [Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leggi la spiegazione del Cat Herder di Ethereum](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP di Muir Glacier" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>ritarda la bomba di difficoltà per altri 4.000.000 blocchi, o circa 611 giorni.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Riepilogo {#istanbul-summary}

La diramazione Instanbul:

- Ha ottimizzato il costo del [carburante](/glossary/#gas) di certe azioni nell'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha migliorato la resilienza agli attacchi denial-of-service.
- Ha reso più performanti le soluzioni di [scalabilità di Livello 2](/developers/docs/scaling/#layer-2-scaling) basate su SNARK e STARK.
- Ha reso possibile l'interoperabilità tra Ethereum e Zcash.
- Ha consentito ai contratti di introdurre funzioni più creative.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP di Istanbul" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>consente a Ethereum di lavorare con valute di preservazione dell'anonimato, come Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>crittografia più economica per migliorare i costi del <a href="/glossary/#gas">carburante</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protegge Ethereum dagli attacchi di riproduzione, aggiungendo l'<a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opcode</a> <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>ottimizzazione dei prezzi del carburante dell'opcode basata sul consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>riduce il costo di CallData per consentire più dati nei blocchi, buono per il <a href="/developers/docs/scaling/#layer-2-scaling">ridimensionamento del Livello 2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>altre alterazioni del prezzo del carburante dell'opcode.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Riepilogo {#constantinople-summary}

La diramazione Constantinople:

- Ha ridotto le ricompense del [mining](/developers/docs/consensus-mechanisms/pow/mining/) dei blocchi da 3 a 2 ETH.
- Ha assicurato che la blockchain non si bloccasse prima dell'[implementazione del proof-of-stake](#beacon-chain-genesis).
- Ha ottimizzato il costo del [carburante](/glossary/#gas) di certe azioni nell'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha aggiunto la capacità di interagire con gli indirizzi non ancora creati.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP di Constantinople" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>ottimizza i costi di certe azioni su catena.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>consente di interagire con gli indirizzi che devono ancora essere creati.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>ottimizza i costi di certe azioni su catena.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>assicura che la blockchain non si congeli prima del proof-of-stake e riduce la ricompensa per blocco da 3 a 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Riepilogo {#byzantium-summary}

La diramazione Byzantium:

- Ha ridotto le ricompense del [mining](/developers/docs/consensus-mechanisms/pow/mining/) dei blocchi da 5 a 3 ETH.
- Ha ritardato di un anno la [bomba di difficoltà](/glossary/#difficulty-bomb).
- Ha aggiunto la capacità di effettuare chiamate che non modificano lo stato ad altri contratti.
- Ha aggiunto certi metodi crittografici per consentire la [scalabilità del livello 2](/developers/docs/scaling/#layer-2-scaling).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP di Byzantium" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>aggiunge l'opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>campo di stato aggiunto alle ricevute di transazione per indicare successo o fallimento.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>aggiunge la curva ellittica e la moltiplicazione scalare per consentire i <a href="/developers/docs/scaling/zk-rollups/">ZK-SNARK</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>aggiunge la curva ellittica e la moltiplicazione scalare per consentire i <a href="/developers/docs/scaling/zk-rollups/">ZK-SNARK</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>consente la verifica della firma RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>aggiunge il supporto per i valori restituiti di lunghezza variabile.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>aggiunge l'opcode <code>STATICCALL</code>, consentendo chiamate che non modificano lo stato ad altri contratti.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>modifica la formula di regolazione della difficoltà.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>ritarda la <a href="/glossary/#difficulty-bomb">bomba di difficoltà</a> di 1 anno e riduce la ricompensa del blocco da 5 a 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Riepilogo {#spurious-dragon-summary}

La diramazione Spurious Dragon è stata la seconda risposta agli attacchi denial of service (DoS) sulla rete (settembre/ottobre 2016) e ha reso possibile, tra l'altro:

- l'ottimizzazione dei prezzi dell'opcode per impedire attacchi futuri alla rete;
- l'abilitazione di "debloat" dello stato della blockchain;
- l'aggiunta della protezione contro gli attacchi replay.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP di Spurious Dragon" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>impedisce la ritrasmissione delle transazioni da una catena di Ethereum su una catena alternativa, ad esempio che la transazione su una rete di prova venga riprodotta sulla catena principale di Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>regola i prezzi dell'opcode <code>EXP</code>: complica il rallentamento della rete tramite operazioni del contratto computazionalmente costose.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>consente la rimozione dei conti vuoti aggiunti tramite attacchi DoS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>modifica la dimensione massima del codice che un contratto sulla blockchain può avere, a 24576 byte.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Riepilogo {#tangerine-whistle-summary}

La diramazione Tangerine Whistle è stata la prima risposta agli attacchi di denial of service (DoS) alla rete (settembre/ottobre 2016) e ha incluso:

- gestire problemi urgenti di salute della rete relativi ai codici delle operazioni con prezzi troppo bassi.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP di Tangerine Whistle" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>aumenta i costi del carburante degli opcode utilizzabili negli attacchi di spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>riduce le dimensioni di stato rimuovendo un gran numero di conti vuoti messi nello stato a costo bassissimo a causa di bug nelle versioni precedenti del protocollo di Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Diramazione OAD {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Riepilogo {#dao-fork-summary}

La diramazione OAD è stata pensata come risposta all'[attacco OAD del 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), durante il quale un contratto [OAD](/glossary/#dao) non protetto è stato privato di oltre 3,6 milioni di ETH in un solo attacco. La diramazione ha spostato i fondi dal contratto difettoso a un [nuovo contratto](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una sola funzione: il prelievo. Chi aveva perso fondi ha potuto prelevare 1 ETH per ogni 100 token OAD nel proprio portafoglio.

Questa iniziativa è stata votata dalla community di Ethereum. Ogni titolare di ETH ha potuto votare tramite una transazione su [una piattaforma di voto](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisione di creare la diramazione ha ottenuto oltre l'85% dei voti.

Alcuni miner rifiutarono di creare la diramazione perché l'incidente DAO non era un difetto nel protocollo. Si sono riuniti per creare [Ethereum Classic](https://ethereumclassic.org/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Riepilogo {#homestead-summary}

La diramazione Homestead guardava al futuro. Includeva diverse modifiche al protocollo e un cambiamento che ha dato a Ethereum la possibilità di eseguire ulteriori aggiornamenti della rete.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP di Homestead" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>effettua modifiche al processo di creazione del contratto.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>aggiunge il nuovo opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduce i requisiti di compatibilità progressiva a devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Riepilogo {#frontier-thawing-summary}

La diramazione Frontier Thawing ha innalzato il limite di 5.000 [gas](/glossary/#gas) per [blocco](/glossary/#block) e ha impostato il prezzo predefinito del gas a 51 [gwei](/glossary/#gwei). Ciò ha reso possibili le transazioni, che richiedono 21.000 gas. La [bomba di difficoltà](/glossary/#difficulty-bomb) è stata introdotta per assicurare una hard-fork futura verso il [proof-of-stake](/glossary/#pos).

- [Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Leggi l'Aggiornamento 1 del Protocollo di Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Riepilogo {#frontier-summary}

Frontier è stata un'implementazione operativa ma rudimentale del progetto Ethereum. È seguita alla positiva fase di test Olympic. Era destinata agli utenti tecnici, in particolare gli sviluppatori. I [blocchi](/glossary/#block) avevano un limite di 5.000 [gas](/glossary/#gas). Questo periodo di "disgelo" (dall'inglese thawing) ha consentito ai miner di iniziare la propria operatività e ai primi utilizzatori di installare i client senza fretta.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vendita di Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether fu ufficialmente messo in vendita per 42 giorni. Lo potresti acquistare in Bitcoin.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Pubblicazione dello yellowpaper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Lo Yellow Paper, redatto dal dott. Gavin Wood, è una definizione tecnica del protocollo Ethereum.

[Consulta lo Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Pubblicazione del whitepaper {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Il documento introduttivo, pubblicato nel 2013 da Vitalik Buterin, fondatore di Ethereum, prima del lancio del progetto nel 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
