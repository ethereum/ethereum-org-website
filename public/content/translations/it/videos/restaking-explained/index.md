---
title: "Spiegazione del restaking"
description: "Una spiegazione sul restaking, che utilizza gli ETH già messi in staking per fornire sicurezza a protocolli e servizi aggiuntivi oltre al livello di base di Ethereum."
lang: it
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "sicurezza"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Una presentazione di **Mike Neuder** a un evento del CBER Forum che illustra come funziona il restaking. La presentazione definisce il self-staking, lo staking delegato, il restaking nativo e non nativo, i meccanismi dello staking liquido e dei token di liquid restaking, e come lo slashing interagisce con le posizioni in restaking.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=rOJo7VwPh7I) pubblicata dal CBER Forum. È stata leggermente modificata per facilitarne la lettura.*

#### Introduzione (0:00) {#introduction-000}

Ciao a tutti, sono Mike. Vi parlerò degli LRT e degli LST. LRT: il restaking è il nuovo staking? Inizierò con una seconda domanda e la userò per motivare la discussione sugli LST e sugli LRT, definendo cosa sono. Questa è principalmente una presentazione grafica, quindi spero che potremo partire dall'inizio e costruire il discorso insieme.

Breve schema: partendo dall'inizio, definiremo due modalità di staking. La prima è il self-staking, la seconda è lo staking delegato. Poi entreremo nel concetto di restaking e lo definiremo. Ci sono quattro diversi modelli che voglio esplorare: usando la separazione tra self e delegato, per poi concentrarci sul restaking nativo rispetto al restaking non nativo. Poi passeremo alla liquidità, parlando di token liquidi: i token di liquid staking e i token di liquid restaking. Motiveremo questo aspetto esaminando lo slashing e il restaking, e poi entrambi i tipi di token. Infine, concluderemo con alcuni dati sullo staking così come esiste oggi in Ethereum.

#### Self-staking (0:48) {#self-staking-048}

Partendo proprio dall'inizio, abbiamo lo staking in cui Alice fa tutto da sola. Interagisce direttamente con il protocollo, mette lo stake nel protocollo e viene ricompensata per averlo fatto attraverso l'emissione del token nativo. Nel caso di Ethereum, Alice mette in staking 32 ETH e viene ricompensata in ETH per la partecipazione al consenso.

Ci sono due cose su cui concentrarsi qui. Primo, lo staking funge da meccanismo anti-Sybil: non puoi ingannare la rete dicendo di avere molte identità perché ogni identità costa una certa quantità di questa fornitura fissa di token. Secondo, il collaterale a rischio: si tratta delle regole del protocollo in termini di slashing. Se Alice si comporta male secondo alcune specifiche molto ben definite, il protocollo le sottrarrà il capitale e la punirà per averlo fatto.

#### Staking delegato (2:52) {#delegated-staking-252}

Lo staking delegato aggiunge un altro livello nel mezzo tra Alice e il protocollo. Alice ora delega a Bob, che mette in staking sul protocollo Ethereum. Le ricompense vengono inviate a Bob, e le ricompense al netto delle commissioni vengono inoltrate ad Alice. Questa è la versione più semplice dello staking delegato: Alice non vuole eseguire il software da sola, forse non ha 32 ETH interi, o non ha l'hardware o le competenze tecniche per gestire un validatore.

Ci sono molte modalità diverse di questa delega a vari livelli di fiducia. La versione che richiede più fiducia è quella custodial: invii i tuoi ETH a Coinbase e dici "metti in staking per mio conto". Di fatto ti fidi completamente di loro perché custodiscono l'asset a tuo nome. C'è una versione non-custodial ma governata da una DAO in cui deleghi il tuo stake a qualcuno determinato da una DAO che vota su chi può gestire i nodi: questo è lo staking in stile Lido. La terza è una versione a fiducia minimizzata in cui sia Alice che Bob mettono del collaterale. Alice sovvenziona il resto del collaterale di Bob, e se Bob si comporta male e subisce lo slashing, il suo collaterale è la prima tranche che viene rimossa. Dico "a fiducia minimizzata" e non "trustless" perché, in ogni caso, ci sono scenari in cui il collaterale di Alice viene completamente azzerato a seconda di ciò che fa Bob.

#### Self-restaking con ETH nativi (4:42) {#self-restaking-with-native-eth-442}

Ora possiamo parlare di cos'è il restaking. Questo è un concetto nuovo di zecca: esiste da quando Sreeram ed EigenLayer hanno introdotto il termine forse un anno e mezzo o due anni fa.

In questo modello, Alice fa la stessa cosa che faceva prima: invia il suo stake al protocollo Ethereum e ottiene ricompense per la partecipazione al consenso. Ora abbiamo un nuovo protocollo, chiamiamolo "Retheum", su cui Alice fa restaking. La cosa importante qui è che sta usando gli stessi token che sta mettendo in staking nel protocollo Ethereum per proteggere questo secondo protocollo.

Ottiene delle ricompense per questo. Sembra fantastico: Alice ora ha potenzialmente il doppio della ricompensa per la stessa quantità di stake. Ma il rischio è che il capitale che ha messo in staking in entrambi i protocolli sia ora vincolato dalle regole di entrambi i protocolli. Se Alice si comporta male in Ethereum, può perdere il suo capitale subendo lo slashing. Se si comporta male in "Retheum", può ugualmente subire lo slashing. Con un rendimento aggiuntivo arrivano responsabilità aggiuntive: comportamenti del protocollo che sono obbligatori e punibili in ulteriori modi se vincoli il tuo token di staking su molti protocolli diversi.

#### Restaking nativo delegato (8:28) {#delegated-native-restaking-828}

La seconda versione è il restaking delegato con ETH nativi. Alice sta facendo staking con Ethereum, e ora vuole usare Bob per delegare il suo stake al protocollo "Retheum". Delega a Bob, Bob fa restaking, il protocollo emette ricompense a Bob, e Bob emette le ricompense al netto delle commissioni ad Alice.

In questo modello, i 32 ETH nel protocollo Ethereum sono responsabili delle azioni sia di Alice che di Bob: due persone che potrebbero potenzialmente far subire lo slashing a questi ETH. Il token è vincolato da due diverse serie di regole del protocollo.

**Domanda dal pubblico:** Quando metti in staking ETH nel protocollo Ethereum, il protocollo deve darti qualcosa che poi presenti: cos'è quel qualcosa?

In questa versione nativa, Alice mette in staking e ha quella che viene chiamata credenziale di prelievo dall'ecosistema Ethereum. Questa credenziale di prelievo può essere indirizzata a un contratto su Ethereum che gestisce il secondo livello di staking. È un contratto che controlla gli asset quando li prelevi da Ethereum: è come una custodia trustless nello smart contract che applica il secondo livello di penalità di slashing.

Perché si chiama "nativo"? Perché Alice sta ancora interagendo direttamente con Ethereum: il suo stake sono i 32 ETH che possiede, usati per proteggere il livello di consenso di Ethereum.

#### Restaking non nativo (10:57) {#non-native-restaking-1057}

Self-restaking in un contesto non nativo: Alice sta interagendo solo con il protocollo "Retheum". Non sta gestendo un nodo su Ethereum. Fa restaking, anche se metto "re" tra virgolette perché non sta davvero facendo restaking, è staking in primo luogo. L'unico motivo per cui si chiama restaking è perché questo avviene attraverso un protocollo che facilita anche altri tipi di restaking.

Prende token non nativi (potrebbero essere USDC, una stablecoin in euro, wrapped Bitcoin, qualsiasi cosa), li fornisce come sicurezza economica e resistenza Sybil al protocollo e guadagna ricompense. Questo sta ridefinendo il restaking come un mercato per la fiducia decentralizzata, dove la fiducia si riferisce al valore economico del capitale a rischio.

Il restaking delegato con token non nativi segue lo stesso schema: Alice delega tramite Bob e riceve le ricompense al netto delle commissioni.

#### Slashing e restaking (13:55) {#slashing-and-restaking-1355}

Prima di entrare nel merito della liquidità, parliamo dello slashing. Nella normale modalità di slashing, Alice sta facendo staking nel protocollo Ethereum. Se fa qualcosa che il protocollo considera sbagliato (ad esempio, un'equivocazione, in cui usa la sua chiave crittografica per firmare due informazioni in conflitto tra loro), si tratta di un errore oggettivo. Tutti possono verificare che entrambe le firme sono state apposte da Alice, e questa è una prova sufficiente per applicare lo slashing ai suoi token.

Come interagiscono il restaking e lo slashing? Nella versione più semplice (il self-restaking con l'asset nativo), Alice fa staking su Ethereum e fa anche restaking tramite "Retheum". Se Alice continua a fare il suo lavoro sul protocollo "Retheum" ma commette un'equivocazione su Ethereum, ora abbiamo un problema: subisce lo slashing su Ethereum, ma "Retheum" non ha visto nulla di attribuibile a lei che sia sbagliato secondo le loro regole. Ci deve essere una qualche comunicazione tra i due protocolli.

Questa direzione di comunicazione è in realtà abbastanza semplice perché "Retheum" è uno smart contract su Ethereum: può leggere dallo stato di Ethereum e dire "questo validatore ha subito lo slashing secondo Ethereum", quindi anche sul protocollo di secondo ordine, Alice subisce lo slashing.

L'altra direzione è più difficile. Se Alice subisce lo slashing sulla piattaforma di restaking, Ethereum dovrebbe esserne informato. Ma Ethereum è intenzionalmente ignaro di tutto ciò che accade al suo livello dei contratti in termini di meccanismo di consenso.

**Domanda dal pubblico:** Perché dovrebbe importare? Ethereum ha bisogno dello stake per quello che fa, ma l'importo del restaking è un derivato dell'originale.

Il problema è che se Alice subisce lo slashing sulla piattaforma di restaking, in realtà non possiede più quello stake. Può fare quello che vuole sul protocollo Ethereum senza alcun capitale effettivo a rischio, che è l'intero scopo di avere uno stake in primo luogo. È come se stessi usando dei soldi per due cose, sono scomparsi per una cosa, e l'altra cosa deve rendersi conto che i soldi non sono più tuoi. Ha ancora un valore economico in un certo senso, ma non lo controlli, quindi non ti importa cosa gli succede perché è già andato.