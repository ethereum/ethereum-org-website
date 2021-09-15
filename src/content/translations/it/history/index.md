---
title: La storia di Ethereum
description: Storia della blockchain Ethereum che include le principali pietre miliari, versioni e diramazioni.
lang: it
sidebar: true
sidebarDepth: 1
---

# La storia di Ethereum {#the-history-of-ethereum}

Un viaggio nel tempo per illustrare tutte le principali pietre miliari, diramazioni e gli aggiornamenti della blockchain di Ethereum.

<ExpandableCard title="Cosa sono le diramazioni?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Le diramazioni si verificano quando è necessario apportare aggiornamenti o modifiche tecniche importanti nella rete. Tipicamente derivano da [proposte di miglioramento di Ethereum (EIP)](/eips/) e cambiano le "regole" del protocollo.

Quando sono necessari aggiornamenti in software tradizionali controllati centralmente, l'azienda pubblica una nuova versione per l'utente finale. Le blockchain funzionano diversamente perché non esiste una proprietà centrale. I [client Ethereum](/developers/docs/nodes-and-clients/) devono aggiornare il proprio software per implementare le nuove regole di diramazione. Inoltre i creatori dei blocchi (miner in contesto Proof of Work e validatori in contesto Proof of Stake) e i nodi devono creare blocchi e convalidarli in base alle nuove regole. [Ulteriori informazioni sui meccanismi di consenso](/developers/docs/consensus-mechanisms/)

Queste modifiche alle regole possono creare una divisione temporanea nella rete. I nuovi blocchi potrebbero essere creati in base alle nuove regole o a quelle vecchie. Le diramazioni di solito sono concordate in anticipo in modo che i client adottino le modifiche all'unisono e la diramazione legata agli upgrade diventi la catena principale. Tuttavia, in rari casi, disaccordi sulle diramazioni possono causare una divisione permanente della rete, come è successo con la creazione di Ethereum Classic con la [diramazione DAO](#dao-fork).

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genesi della beacon chain {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Beacon Chain block number: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $586.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Riepilogo {#beacon-chain-genesis-summary}

La [beacon chain](/eth2/beacon-chain/) necessitava di 16384 depositi di 32 ETH in staking per funzionare in sicurezza. Questo è successo il 27 Novembre, quindi la beacon chain ha iniziato a produrre blocchi il 1 dicembre 2020. Si tratta di un primo passaggio importante per realizzare la [visione Eth2](/eth2/vision/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/eth2/beacon-chain/" title="La beacon chain" />

---

### Distribuzione del contratto di deposito in staking {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/11052984">11052984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $379.04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Riepilogo {#deposit-contract-summary}

Il contratto di deposito in staking ha introdotto lo [staking](/glossary/#staking) nell'ecosistema di Ethereum. Nonostante fosse un contratto della [rete principale](/glossary/#mainnet), ha avuto un impatto diretto sulla linea temporale per il lancio della [beacon chain](/eth2/beacon-chain/), un importante [upgrade a Eth2](/eth2/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/eth2/staking/" title="Staking" />

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9200000">9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $127.18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#muir-glacier-summary}

La diramazione di Muir Glacier ha introdotto un ritardo nella [bomba di difficoltà](/glossary/#difficulty-bomb). Aumenta la difficoltà del blocco del meccanismo di consenso [Proof of Work](/developers/docs/consensus-mechanisms/pow/), che rischiava di degradare l'utilizzabilità di Ethereum, aumentando i tempi d'attesa per l'invio delle transazioni e l'uso delle dapp.

- [Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leggi la spiegazione del Cat Herder di Ethereum](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _ritarda la bomba di difficoltà di altri 4.000.000 blocchi, o ~611 giorni._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $151.06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#istanbul-summary}

La diramazione di Instanbul:

- Ha ottimizzato i costi del [carburante](/glossary/#gas) di certe azioni nell'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha migliorato la resilienza agli attacchi denial-of-service.
- Ha reso le soluzioni di [passaggio al livello 2](/developers/docs/layer-2-scaling/) basate su SNARK e STARK più performanti.
- Ha reso possibile l'interazione tra Ethereum e Zcash.
- Ha consentito ai contratti di introdurre funzioni più creative.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _consente ad Ethereum di funzionare con valute che preservano la privacy come Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _crittografia a prezzi inferiori per migliorare i costi del [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protegge Ethereum dagli attacchi replay aggiungendo `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _ottimizzazione dei prezzi del carburante per opcode gas in base al consumo._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _riduce il costo di CallData per consentire più dati nei blocchi. Ottimo peril [passaggio al livello 2](/developers/docs/layer-2-scaling/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _altre alterazioni dei prezzi del carburante per opcode._

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $136.29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#constantinople-summary}

La diramazione Constantinople:

- Ha assicurato che la blockchain non si bloccasse prima dell'[implementazione della Proof of Stake](#beacon-chain-genesis).
- Ha ottimizzato i prezzi del [carburante](/glossary/#gas) di certe azioni nell'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Ha aggiunto la capacità di interagire con gli indirizzi non ancora creati.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP Constantinople" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _ottimizza il costo di certe azioni sulla catena_
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _consente di interagire con gli indirizzi che ancora devono essere creati._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _ottimizza il costo di certe azioni sulla catena._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _fa in modo che la blockchain non si blocchi prima della Proof of Stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/4370000">4370000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $334.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#byzantium-summary}

La diramazione di Byzantium:

- Ha ridotto le ricompense del [mining](/developers/docs/consensus-mechanisms/pow/mining/) dei blocchi da 5 a 3 ETH.
- Ha ritardato di un anno la [bomba di difficoltà](/glossary/#difficulty-bomb).
- Ha aggiunto la capacità di effettuare chiamate che non modificano lo stato ad altri contratti.
- Ha aggiunto determinati metodi di crittografia per consentire il \[passaggio al livello 2\]((/developers/docs/layer-2-scaling/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _aggiunge l'opcode `REVERT`._
- [EIP-658](https://eips.ethereum. rg/EIPS/eip-658) – campo di stato aggiunto alle ricevute delle transazioni per indicare il successo o il fallimento.\_
- [EIP-196](https://eips.ethereum. rg/EIPS/eip-196) – _aggiunge una curva ellittica e una moltiplicazione scalare per consentire [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-197](https://eips.ethereum. rg/EIPS/eip-197) – _aggiunge la curva ellittica e la moltiplicazione scalare per consentire [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-198](https://eips. thereum.org/EIPS/eip-198) – _abilita la verifica della firma RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _aggiunge supporto per i valori restituiti a lunghezza variabile._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _aggiunge l'opcode `STATICCALL`, consentendo chiamate che non modificano lo stato ad altri contratti._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _cambia la formula di modifica della difficoltà._
- [EIP-649](https://eips. thereum.org/EIPS/eip-649) – _ritarda la [bomba di difficoltà](/glossario/#difficulty-bomb) di 1 anno e riduce la ricompensa per i blocchi da 5 a 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2675000">2675000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $9.84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#spurious-dragon-summary}

La diramazione Spurious Dragon è stata la seconda risposta agli attacchi denial of service (DoS) sulla rete (settembre/ottobre 2016) e ha reso possibile, tra l'altro:

- ottimizzazione dei prezzi dell'opcode per impedire attacchi futuri alla rete.
- abilitazione di "debloat" dello stato della blockchain.
- aggiunta della protezione contro gli attacchi replay.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum. rg/EIPS/eip-155) – _impedisce che le transazioni provenienti da una catena Ethereum siano ritrasmesse su una catena alternativa, ad esempio una transazione sulla rete di test che viene eseguita nuovamente sulla catena principale Ethereum._
- [EIP-160](https://eips.ethereum. rg/EIPS/eip-160) – _ottimizza i prezzi dell'opcode `EXP`, rende più difficile rallentare la rete attraverso operazioni sui contratti costose dal punto di vista del calcolo._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _permette la rimozione di account vuoti aggiunti tramite attacchi DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _cambia la dimensione massima del codice che può avere un contratto sulla blockchain a 24576 byte._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2463000">2463000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#tangerine-whistle-summary}

La diramazione Tangerine Whistle è stata la prima risposta agli attacchi denial of service (DoS) sulla rete (settembre/ottobre 2016) e ha reso possibile tra l'altro:

- gestire problemi urgenti che riguardano lo stato della rete relativi ai codici delle operazioni con prezzi troppo bassi.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _aumenta i costi del carburante degli opcode utilizzabili negli attacchi di spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _riduce la dimensione dello stato rimuovendo un gran numero di account vuoti messi nello stato a costo molto basso a causa di bug nelle prime versioni del protocollo di Ethereum._

</ExpandableCard>

---

### Biforcazione DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1920000">1920000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#dao-fork-summary}

La diramazione DAO arrivò in risposta all'[attacco DAO 2016](https://www.coindesk.com/understanding-dao-hack-journalists), in cui un contratto [DAO](/glossary/#dao) non sicuro fu svuotato di oltre 3,6 milioni di ETH in una sola volta. La diramazione spostò i fondi dal contratto difettoso a [uno nuovo](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una sola funzione: withdraw. Chi aveva perso fondi potette prelevare 1 ETH per ogni 100 token DAO nei propri portafogli.

Questo corso d'azione fu votato dalla community di Ethereum. Ogni titolare di ETH poté votare tramite una transazione su [una piattaforma di voto](http://v1.carbonvote.com/). La decisione di creare la diramazione ottenne oltre l'85% dei voti.

Alcuni miner si rifiutarono di creare la diramazione perché l'incidente DAO non era un difetto nel protocollo. Si riunirono per formare [Ethereum Classic](https://ethereumclassic.org/).

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1150000">1150000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#homestead-summary}

La diramazione Homestead pensava al futuro. Includeva diverse modifiche al protocollo e un cambiamento della rete che ha dato a Ethereum la possibilità di eseguire ulteriori upgrade della rete.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _apporta modifiche al processo di creazione dei contratti._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _aggiunge il nuovo opcode: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduce i requisiti di compatibilità devp2p_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/200000">200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $1.24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#frontier-thawing-summary}

La diramazione frontier thawing ha introdotto il limite di 5000 unità di [carburante](/glossary/#gas) per [blocco](/glossary/#block) e ha impostato il prezzo predefinito del carburante a 51 [gwei](/glossary/#gwei). In questo modo furono possibili le transazioni. Le transazioni richiedono 21.000 unità di carburante.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Riepilogo {#frontier-summary}

Frontier era un'implementazione che fu messa in pratica ma a livello base sul progetto di Ethereum. Seguì la fase di test di successo Olympic. Era destinata agli utenti tecnici, in particolare agli sviluppatori. I [blocchi](/glossary/#block) avevano un limite di 5.000 unità di [carburante](/glossary/#gas). Questo periodo di ’disgelo’ (dall'inglese thawing) consentì ai miner di iniziare e ai primi utilizzatori di installare i client senza fretta.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vendita di ether {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> July 22 - September 02, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Ether è stato ufficialmente messo in vendita per 42 giorni. Era acquistabile con BTC.

[Leggi l'annuncio della Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Rilascio dello yellowpaper {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Lo yellowpaper, redatto dal dott. Gavin Wood, è una definizione tecnica del protocollo Ethereum.

[Leggi il documento](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Rilascio del whitepaper {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org on waybackmachine</a>

Documento introduttivo, pubblicato nel 2013 da Vitalik Buterin, il fondatore di Ethereum, prima del lancio del progetto nel 2015.

<DocLink to="/whitepaper/" title="Whitepaper" />
