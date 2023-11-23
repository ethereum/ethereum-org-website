---
title: Noduri și clienți
description: O prezentare generală a nodurilor Ethereum și a software-ului client plus cum să configurați un nod și de ce ar trebui să faceți acest lucru.
lang: ro
sidebarDepth: 2
---

Ethereum este o rețea distribuită de computere pe care rulează un software (cunoscute sub numele de noduri) care poate verifica blocurile și datele tranzacțiilor. Pentru a „rula” un nod aveți nevoie pe computer de o aplicație cunoscută sub numele de client.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeți conceptul de rețea peer-to-peer și [principiile de bază ale EVM](/developers/docs/evm/) înainte de a vă implica mai îndeaproape și de a rula propria instanță a unui client Ethereum. Aruncați o privire la [introducerea despre Ethereum](/developers/docs/intro-to-ethereum/).

If you're new to the topic of nodes, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Ce sunt nodurile și clienții? {#what-are-nodes-and-clients}

„Nodul” se referă la un software cunoscut sub numele de client. Un client este o implementare a lui Ethereum care verifică toate tranzacțiile din fiecare bloc, păstrând rețeaua securizată şi datele corecte.

Puteți vizualiza în timp real rețeaua Ethereum uitându-vă pe această [hartă a nodurilor](https://etherscan.io/nodetracker).

Există numeroși [clienți Ethereum](/developers/docs/nodes-and-clients/#execution-clients), într-o varietate de limbaje de programare, cum ar fi Go, Rust, JavaScript, Typescript, Python, C# .NET, Nim și Java. Punctul comun al acestor implementări este că toate respectă o specificație formală (inițial denumită [Cartea galbenă Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)). This specification dictates how the Ethereum network and blockchain functions.

![Execution client](./client-diagram.png) Diagramă simplificată a funcţionalităţilor clientului Ethereum.

## Tipuri de noduri {#node-types}

If you want to [run your own node](/developers/docs/nodes-and-clients/run-a-node/), you should understand that there are different types of node that consume data differently. In fact, clients can run 3 different types of node - light, full and archive. Există de asemenea opţiunea de a aplica diverse strategii de sincronizare, care scurtează timpul de sincronizare. Sincronizarea se referă la viteza cu care poate obține cele mai actualizate informații despre starea lui Ethereum.

### Nod complet {#full-node}

- Stochează date complete despre blockchain.
- Participă la validarea blocurilor, verifică toate blocurile și stările.
- Se pot obţine toate stările dintr-un nod complet.
- Deservește rețeaua și oferă date la cerere.

### Nod ușor {#light-node}

- Stochează lanțul de anteturi și solicită tot restul.
- Poate verifica validitatea datelor în raport cu rădăcinile de stare din anteturile blocului.
- Este util pentru dispozitivele de capacitate redusă, cum ar fi dispozitivele încorporate sau telefoanele mobile, care nu își permit să stocheze gigaocteţi de date blockchain.

### Nod de arhivă {#archive-node}

- Stochează tot ce este păstrat în nodul complet și construiește o arhivă de stări istorice. Este necesar atunci când doriți să interogați ceva precum soldul unui cont la blocul #4.000.000 sau [să vă testați propriul set de tranzacții fără a le mina folosind OpenEthereum](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany), în mod simplu şi fiabil.
- Aceste date reprezintă unități de teraocteţi, ceea ce face ca nodurile de arhivă să fie mai puțin atractive pentru utilizatorii obișnuiți, dar pot fi utile pentru servicii precum exploratorii de blocuri, furnizorii de portofele și analiza lanțului.

Sincronizarea clienților în orice alt mod decât arhiva va duce la pierderea de date din blockchain. This means, there is no archive of all historical states but the full node is able to build them on demand.

## De ce trebuie să rulez un nod Ethereum? {#why-should-i-run-an-ethereum-node}

Rularea unui nod vă permite să utilizați Ethereum fără necesitatea acordării încrederii și în mod privat, susţinând în acelaşi timp ecosistemul.

### Avantajele pentru dvs. {#benefits-to-you}

Dacă rulaţi propriul nod, aceasta vă permite să utilizaţi Ethereum într-un mod cu adevărat privat, auto-suficient și fără a fi necesară acordarea încrederii. Nu aveţi nevoie să vă încredeţi e în rețea, deoarece puteţi verifica singur datele cu clientul. „Nu acordaţi încredere, verificaţi” este o mantra populară pe blockchain.

- Nodul dvs. verifică toate tranzacțiile și blochează conform regulilor e de consens. Aceasta înseamnă că nu trebuie să vă bazaţi pe alte noduri din rețea, şi nici să le acordaţi încredere deplină.
- Nu va trebui să vă dezvăluiţi adresele și soldurile către noduri aleatorii. Totul poate fi verificat cu propriul dvs. client.
- Aplicația dvs. dapp poate fi mai securizată și mai privată dacă vă folosiţi propriul nod. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) and some other wallets can be easily pointed to your own local node.
- Puteți să vă programați propriile endpoint-uri RPC personalizate.
- Vă puteți conecta la nodul dvs. folosind **Comunicațiile între procese (IPC)** sau puteți rescrie nodul pentru a vă încărca programul ca plugin. Aceasta vă garantează o latență scăzută, necesară pentru a vă înlocui tranzacțiile cât mai repede posibil (adică frontrunning).

![Cum puteți accesa Ethereum prin intermediul aplicației și al nodurilor](./nodes.png)

### Avantajele rețelei {#network-benefits}

Este important să existe o diversitate a seturilor de noduri pentru sănătatea, securitatea și rezilienţa operațională a lui Ethereum.

- Acestea oferă acces la datele blockchain-ului pentru clienții ușori care depind de acestea. În perioadele de vârf ale utilizării trebuie să existe suficiente noduri complete pentru a ajuta la sincronizarea nodurilor ușoare. Nodurile ușoare nu stochează întregul blockchain, ci verifică datele prin [rădăcinile stării din anteturile blocurilor](/developers/docs/blocks/#block-anatomy). Ele pot solicita şi alte informații de la blocuri dacă le sunt necesare.
- Nodurile complete aplică regulile de consens pentru dovada-muncii, deci nu pot fi păcălite să accepte blocuri care nu urmează aceste reguli. Acest lucru oferă o securitate suplimentară în rețea, deoarece dacă toate nodurile ar fi noduri ușoare, care nu fac verificarea completă, miner-ii ar putea ataca rețeaua, creând, de exemplu, blocuri cu recompense mai mari.

Dacă rulați un nod complet, întreaga rețea Ethereum beneficiază de acesta.

## Rularea propriului dvs. nod {#running-your-own-node}

Sunteți interesat să vă rulați propriul client Ethereum?

For a beginner-friendly introduction visit our [run a node](/run-a-node) page to learn more.

If you're more of a technical user, learn how to [spin up your own node](/developers/docs/nodes-and-clients/run-a-node/) with the command line!

### Proiecte {#projects}

[**Selectează un client și urmează instrucțiunile acestuia**](#clients)

**ethnode -** **_Run an Ethereum node (Geth or OpenEthereum) for local development._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_O interfață grafică a sistemului de operare pentru rularea nodurilor Web3, inclusiv Ethereum și lanțul beacon, pe o mașină dedicată._**

- [dappnode.io](https://dappnode.io)

### Resurse {#resources}

- [Executarea nodurilor complete Ethereum: Ghid integral](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _7 noiembrie 2019 - Justin Leroux_
- [Listă de ponturi pentru configurarea nodurilor](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _5 ianuarie 2019 - Afri Schoeden_
- [Cum se instalează & Rularea unui nod Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _4 octombrie 2020 - Sahil Sen_
- [Cum se instalează & Rularea unui nod OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _22 septembrie 2020 - Sahil Sen_

## Alternative {#alternatives}

Rularea propriului nod poate fi dificilă și nu este nevoie să rulezi întotdeauna propria instanță. În acest caz, puteți utiliza un furnizor de API de la un terţ, cum ar fi [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) sau [QuikNode](https://www.quiknode.io). Alternativ, [ArchiveNode](https://archivenode.io/) este un nod de tip „Archive” finanțat de comunitate, care se speră că va aduce date de arhivă pe blockchain-ul Ethereum pentru dezvoltatorii independenți, care altfel nu și-ar putea permite acest lucru. For an overview of using these services, check out [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Dacă cineva rulează un nod Ethereum cu un API public în comunitatea dvs., vă puteți direcționa portofelele ușoare (cum ar fi MetaMask) către un nod al comunității [printr-un RPC personalizat](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) și puteți obține mai multă confidențialitate decât cu un terţ de încredere aleatoriu.

Pe de altă parte, dacă rulezi un client, îl poți partaja cu prietenii tăi care ar putea avea nevoie de el.

## Clienți de execuție (anterior „clienți Eth1”) {#execution-clients}

The Ethereum community maintains multiple open-source execution clients (previously known as 'Eth1 clients', or just 'Ethereum clients'), developed by different teams using different programming languages. Acest lucru face ca rețeaua să fie mai puternică și de mai mare diversitate. Obiectivul optim este de a realiza diversitatea fără ca vreun client să domine, pentru a reduce orice punct unic de eșec.

Acest tabel prezintă o sinteză a diferiților clienți. Toţi aceştia trec nişte [teste pentru clienţi](https://github.com/ethereum/tests) și sunt menținuţi în mod activ pentru a rămâne la zi cu actualizările rețelei.

| Client                                                                    | Limbaj   | Sisteme de operare    | Rețele                                     | Strategii de sincronizare | Starea curățării |
| ------------------------------------------------------------------------- | -------- | --------------------- | ------------------------------------------ | ------------------------- | ---------------- |
| [Geth](https://geth.ethereum.org/)                                        | Go       | Linux, Windows, macOS | Mainnet, Görli, Rinkeby, Ropsten           | Snap, Full                | Arhivă, Curățată |
| [Nethermind](http://nethermind.io/)                                       | C#, .NET | Linux, Windows, macOS | Mainnet, Görli, Ropsten, Rinkeby și altele | Fast, Beam, Archive       | Arhivă, Curățată |
| [Besu](https://besu.hyperledger.org/en/stable/)                           | Java     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli, and more | Rapidă, Completă          | Arhivă, Curățată |
| [Erigon](https://github.com/ledgerwatch/erigon)                           | Începe   | Linux, Windows, macOS | Rețea principală, Görli, Rinkeby, Ropsten  | Full                      | Arhivă, Curățată |
| [OpenEthereum (Deprecated)](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Mainnet, Kovan, Ropsten și altele          | Warp, Completă            | Arhivă, Curățată |

**Rețineți că OpenEthereum [a fost dezaprobat](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) și nu mai este întreținut.** Folosiți-l cu precauție și este preferabil să treceți la o altă implementare de client.

Pentru a afla mai multe informații despre rețelele acceptate, citiți [rețelele Ethereum](/developers/docs/networks/).

### Avantajele diferitelor implementări {#advantages-of-different-implementations}

Fiecare client are cazuri de utilizare și avantaje unice, deci ar trebui să alegi unul pe baza propriilor preferințe. Diversitatea permite implementărilor să se concentreze pe diferite funcţionalităţi și categorii de utilizatori. Poate că doriți să alegeți un client în funcție de funcţionalităţi, acceptări, limbajul de programare sau licențe.

#### Go Ethereum {#geth}

Go Ethereum (pe scurt, Geth) este una dintre implementările originale ale protocolului Ethereum. Este actualmente cel mai răspândit client, cu cea mai mare bază de utilizatori și o varietate de instrumente pentru utilizatori și dezvoltatori. Este scris în Go, complet open source și licențiat sub GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum este un client Ethereum rapid, bogat în funcții şi avansat, bazat pe CLI. Este construit pentru a oferi infrastructura esențială pentru servicii rapide și fiabile, care necesită sincronizare rapidă și timp maxim de funcționare. Obiectivul OpenEthereum este de a fi cel mai rapid, mai ușor și mai securizat client Ethereum. Oferă o bază de cod modulară curată pentru:

- personalizare ușoară.
- integrarea ușoară în servicii sau produse.
- consum minim de memorie și de stocare.

OpenEthereum este dezvoltat folosind limbajul de programare Rust de ultimă oră și licențiat sub GPLv3.

**Rețineți că OpenEthereum [a fost dezaprobat](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) și nu mai este întreținut.** Folosiți-l cu precauție și este preferabil să treceți la o altă implementare de client.

#### Nethermind {#nethermind}

Nethermind este o implementare Ethereum creată cu stiva de tehnologie C# .NET, care rulează pe toate platformele majore, inclusiv ARM. Acesta oferă o mare performanță cu:

- o mașină virtuală optimizată
- acces la stare
- rețele și funcţionalităţi bogate, cum ar fi tablouri de bord Prometheus/Grafana, acceptarea logării seq enterprise, urmărire JSON RPC și plugin-uri analitice.

Nethermind are o [documentație detaliată](https://docs.nethermind.io), asistenţă foarte bună pentru dezvoltatori, o comunitate online și asistenţă non-stop pentru utilizatorii premium.

#### Besu {#besu}

Hyperledger Besu este un client Ethereum de nivel de întreprindere pentru rețele publice și autorizate. Rulează toate funcţionalităţile Mainnet-ului Ethereum, de la urmărire la GraphQL, are o monitorizare extinsă și este sprijinită de ConsenSys, atât în canalele deschise ale comunității, cât și prin acordurile de servicii comerciale pentru întreprinderi. Este scris în Java și are licență Apache 2.0.

#### Erigon {#erigon}

Erigon, cunoscut anterior sub denumirea de Erigon, este un fork Go Ethereum ce vizează creşterea vitezei şi a eficienţei spaţiului pe disc. Erigon este o implementare complet reproiectată a lui Ethereum, actualmente scrisă în Go, dar care urmează să fie implementată și în alte limbaje. Scopul Erigon este de a oferi o implementare mai rapidă, mai modulară și mai optimizată a lui Ethereum. It can perform a full archive node sync using less than 2TB of disk space, in under 3 days

### Moduri de sincronizare {#sync-modes}

To follow and verify current data in the network, the Ethereum client needs to sync with the latest network state. Aceasta se realizează prin descărcarea datelor de la omologi și verificarea integrității lor prin criptografie, precum și prin construirea unei baze de date blockchain locale.

Synchronization modes represent different approaches to this process with various trade-offs. Clienții diferă şi prin implementarea algoritmilor de sincronizare. Consultați întotdeauna documentația oficială a clientului pe care l-ați ales pentru a afla detalii privind implementarea.

#### Prezentare generală a strategiilor {#overview-of-strategies}

Prezentare generală a metodelor de sincronizare utilizate în cazul clienților pregătiți pentru Mainnet:

##### Sincronizare completă

Sincronizarea completă descarcă toate blocurile (inclusiv anteturile, tranzacțiile și chitanțele) și generează incremental starea blockchain-ului, executând fiecare bloc de la geneză.

- Minimizează încrederea și oferă cea mai mare securitate prin verificarea fiecărei tranzacții.
- Odată cu creșterea numărului de tranzacții, procesarea tuturor tranzacțiilor poate dura câteva zile până la câteva săptămâni.

##### Sincronizare rapidă

Fast sync downloads all blocks (including headers, transactions, and receipts), verifies all headers, downloads the state and verifies it against the headers.

- Se bazează pe securitatea mecanismului de consens.
- Sincronizarea durează doar câteva ore.

##### Sincronizare ușoară

Modul client ușor descarcă toate anteturile de bloc, datele de bloc și le verifică pe unele în mod aleatoriu. Only syncs tip of the chain from the trusted checkpoint.

- Obține doar cea mai recentă stare, bazându-se în același timp pe încrederea în dezvoltatori și pe mecanismul de consens.
- Clientul este pregătit pentru utilizare cu starea curentă a rețelei în câteva minute.

[More on Light clients](https://www.parity.io/blog/what-is-a-light-client/)

##### Sincronizare instantanee

Implemented by Geth. Prin utilizarea instantaneelor dinamice servite de omologi, se recuperează toate datele de cont și de stocare fără să se descarce noduri trie intermediare și apoi se reconstruiește Merkle trie la nivel local.

- Este cea mai rapidă strategie de sincronizare dezvoltată de Geth, actualmente opţiunea sa implicită
- Economisește mult din spațiul de utilizare a discului și din lățimea de bandă a rețelei, fără a sacrifica securitatea.

[More on Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sincronizare Warp

Implementată de OpenEthereum. Nodes regularly generate a consensus-critical state snapshot and any peer can fetch these snapshots over the network, enabling a fast sync from this point.

- Este modul de sincronizare implicit și cel mai rapid din OpenEthereum, care se bazează pe instantanee statice servite de omologi.
- Este o strategie similară cu sincronizarea instantanee „snap sync”, dar fără anumite beneficii de securitate.

[More on Warp](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sincronizare Beam

Implementată de Nethermind și Trinity. Works like fast sync but also downloads the data needed to execute latest blocks, which allows you to query the chain within the first few minutes from starting.

- Sincronizează mai întâi starea și vă permite să interogați RPC în câteva minute.
- Sincronizarea în fundal „background sync” este încetinită deoarece este încă în curs de dezvoltare și nu este complet fiabilă, iar răspunsurile RPC pot eșua.

[More on Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configurare în client {#client-setup}

Clienții vă oferă opțiuni de configurare variate care să se conformeze necesităţilor dvs. Alegeți-o pe cea care vă convine cel mai mult, în funcție de nivelul de securitate, de datele disponibile și de costuri. În afară de algoritmul de sincronizare, puteți configura şi eliminarea diverselor tipuri de date vechi. Pruning-ul (curățarea) permite ștergerea datelor ieşite din uz, de exemplu, eliminarea nodurilor trie de stare care sunt inaccesibile din blocurile recente.

Verificați cu atenţie documentația sau pagina de ajutor a clientului pentru a afla care este modul de sincronizare implicit. Vă puteți defini tipul preferat de sincronizare atunci când vă configurați în modul următor:

**Setting up light sync in [GETH](https://geth.ethereum.org/) or [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

For further details, check out the tutorial on [running Geth light node](/developers/tutorials/run-light-node-geth/).

**Setting up full sync with archive in [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Ca orice altă configurație, aceasta poate fi definită cu ajutorul steguleţului de pornire sau în fișierul de configurare. Un alt exemplu este [Nethermind](https://docs.nethermind.io/nethermind/), care vă solicită să alegeți o configurație la prima inițializare și creează un fișier de configurare.

## Clienți de consens (anterior clienți „Eth2”) {#consensus-clients}

There are multiple consensus clients (previously known as 'Eth2' clients) to support the [consensus upgrades](/roadmap/beacon-chain/). They are running the Beacon Chain and will provide proof-of-stake consensus mechanism to execution clients after [The Merge](/roadmap/merge/).

| Client                                                      | Limbaj     | Sisteme de operare    | Rețele                                 |
| ----------------------------------------------------------- | ---------- | --------------------- | -------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | Lanţul Beacon, Goerli                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux, Windows, macOS | Lanţul Beacon, Goerli                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux, Windows, macOS | Lanţul Beacon, Goerli, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux, Windows, macOS | Lanţul Beacon, Goerli                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux, Windows, macOS | Lanţul Beacon, Gnosis, Goerli, Pyrmont |

## Hardware {#hardware}

Cerințele hardware diferă în funcție de client, dar în general nu sunt atât de mari, deoarece nodul trebuie doar să rămână sincronizat. Nu-l confunda cu mineritul care necesită mult mai multă putere de calcul. Cu toate acestea, timpul de sincronizare și performanța se îmbunătățesc cu un hardware mai puternic. În funcție de nevoile și dorințele dvs., Ethereum poate fi rulat pe computerul dvs., pe serverul de acasă, pe computere cu o singură placă (SBC) sau pe servere virtuale private în cloud.

O modalitate ușoară de a rula propriul nod este utilizarea casetelor „plug and play”, cum ar fi [DAppNode](https://dappnode.io/). Oferă hardware pentru rularea clienților și a aplicațiilor care depind de aceștia, cu o interfață de utilizator simplă.

### Cerințe {#requirements}

Înainte de a instala orice client, asigurați-vă că aveți suficiente resurse pe computerul dvs. pentru a-l rula. Cerințele minime și recomandate pot fi găsite mai jos, totuși partea cheie este spațiul pe disc. Sincronizarea blockchain-ului Ethereum presupune o utilizare intensivă a intrărilor/ieșirilor. Cel mai bine este să aveți un solid-state drive (SSD). Pentru a rula un client Ethereum pe HDD, veți avea nevoie de cel puțin 8GB de memorie RAM pentru a o folosi ca memorie cache.

#### Cerințe minime {#recommended-specifications}

- Procesor cu cel puțin 2 nuclee
- 4 GB RAM minimum cu un SSD, 8 GB minimum, dacă aveți un HDD
- Lățime de bandă de 8 MBit/s

#### Specificații recomandate {#recommended-specifications}

- Procesor rapid cu cel puțin 4 nuclee
- Minimum 16 GB RAM
- SSD rapid cu cel puțin 500 GB spațiu liber
- Lățime de bandă de cel puțin 25 MBit/s

Modul de sincronizare pe care îl alegeți va afecta spațiul necesar, dar am estimat mai jos spațiul pe disc de care veți avea nevoie pentru fiecare client.

| Client       | Mărimea discului (sinc. rapidă) | Mărimea discului (arhivă completă) |
| ------------ | ------------------------------- | ---------------------------------- |
| Geth         | Minimum 400 GB                  | Minimum 6TB                        |
| OpenEthereum | Minimum 280 GB                  | Minimum 6TB                        |
| Nethermind   | Minimum 200 GB                  | Minimum 5TB                        |
| Besu         | Minimum 750 GB                  | Minimum 5TB                        |
| Erigon       | Nu este cazul                   | Minimum 1TB                        |

- Observaţie: Erigon nu oferă sincronizarea rapidă, însă permite curățarea completă (~500 GB)

Aceste diagrame arată cum cerințele de stocare sunt mereu în schimbare. Pentru cele mai recente date referitoare la Geth și OpenEthereum, consultați [date complete de sincronizare](https://etherscan.io/chartsync/chaindefault) și [date arhivate de sincronizare](https://etherscan.io/chartsync/chainarchive).

### Ethereum pe un computer cu o singură placă (SBC) {#ethereum-on-a-single-board-computer}

Cel mai convenabil și mai ieftin mod de a rula nodul Ethereum este de a utiliza un computer cu o singură placă bazată pe arhitectură ARM precum Raspberry Pi. [Ethereum pe ARM](https://twitter.com/EthereumOnARM) oferă imagini ale clienților Geth, OpenEthereum, Nethermind și Besu. Iată un tutorial simplu despre modul [cum se construiește și se configurează un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Astfel de dispozitive mici, accesibile și eficiente sunt ideale pentru rularea unui nod la domiciliu.

## Referințe suplimentare {#further-reading}

There is a lot of information about Ethereum clients on the internet. Here are few resources that might be helpful.

- [Ethereum 101 - Partea 2 - Înțelegerea nodurilor](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 februarie 2019_
- [Rularea de noduri Ethereum complete: Un ghid pentru cei nu prea motivați](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 noiembrie 2019_
- [Analiza cerințelor de hardware pentru a fi un nod Ethereum validat complet](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 septembrie 2018_
- [Rularea unui nod Hyperledger Besu pe Mainnet-ul Ethereum: avantaje, cerințe și configurare](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 mai 2020_

## Subiecte corelate {#related-topics}

- [Blocuri](/developers/docs/blocks/)
- [Rețele](/developers/docs/networks/)

## Tutoriale corelate {#related-tutorials}

- [Rularea unui nod cu Geth](/developers/tutorials/run-light-node-geth/) _ – Cum se descarcă, se instalează şi se rulează Geth. Covering syncmodes, the JavaScript console, and more._
- [Transformați Raspberry Pi 4 într-un nod validator doar prin flash-area cardului MicroSD – Ghidul de instalare](/developers/tutorials/run-node-raspberry-pi/) _– Flash-ați Raspberry Pi 4, conectați un cablu ethernet, conectați discul SSD și porniți dispozitivul pentru a transforma Raspberry Pi 4 într-un nod Ethereum complet care rulează nivelul de execuție (Mainnet) și / sau nivelul de consens (Lanțul Beacon / validatorul)._
