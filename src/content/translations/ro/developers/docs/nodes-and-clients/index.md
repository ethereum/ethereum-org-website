---
title: Noduri și clienți
description: O prezentare generală a nodurilor Ethereum și a software-ului client, plus modul de configurare a unui nod și de ce ar trebui să o faci.
lang: ro
sidebar: true
sidebarDepth: 2
---

Pentru ca Ethereum să funcționeze în mod descentralizat, are nevoie de o rețea distribuită de noduri care să poată verifica blocurile și datele tranzacțiilor. Ai nevoie de o aplicație, cunoscută sub numele de client, pe dispozitivul tău pentru a „rula” un nod.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegi conceptul unei rețele descentralizate înainte de a continua și de a rula propria instanță de client Ethereum. Aruncă o privire la [ introducerea în Ethereum](/developers/docs/intro-to-ethereum/).

## Ce sunt nodurile și clienții? {#what-are-nodes-and-clients}

„Nod” se referă la un software cunoscut sub numele de client. Un client este o implementare a Ethereum care verifică toate tranzacțiile din fiecare bloc, păstrând rețeaua în siguranță și datele corecte.

Poți vizualiza în timp real rețeaua Ethereum uitându-te la această [hartă a nodurilor](https://etherscan.io/nodetracker).

Multe [implementări ale clienților Ethereum](/developers/docs/nodes-and-clients/#clients) există într-o varietate de limbaje. Ceea ce au în comun aceste implementări ale clienților este că toate respectă o specificație formală. Această specificație dictează modul în care funcționează rețeaua Ethereum și blockchain-ul.

![Client Eth1x](../../../../../developers/docs/nodes-and-clients/client-diagram.png) Diagramă simplificată a caracteristicilor clientului Ethereum.

## Tipuri de noduri {#node-types}

Dacă dorești să rulezi propriul tău nod, ar trebui să înțelegi că există diferite tipuri de noduri care consumă date în mod diferit. De fapt, clienții pot rula 3 tipuri diferite de noduri - ușoare, complete și arhive. Există, de asemenea, opțiuni ale diferitelor strategii de sincronizare, care permit un timp de sincronizare mai rapid. Sincronizarea se referă la cât de repede poate obține cele mai actualizate informații despre starea Ethereum.

### Nod complet {#full-node}

- Stochează date complete despre blockchain.
- Participă la validarea blocurilor, verifică toate blocurile și stările.
- Toate stările pot fi derivate dintr-un nod complet.
- Servește rețeaua și oferă date la cerere.

### Nod ușor {#light-node}

- Stochează antetul lanțului și solicită orice altceva.
- Poți verifica validitatea datelor în raport cu rădăcinile de stare din anteturile blocului.
- Util pentru dispozitivele de capacitate redusă, cum ar fi dispozitivele încorporate sau telefoanele mobile, care nu își permit să stocheze gigabyți de date blockchain.

### Nod de arhivă {#archive-node}

- Stochează tot ce este păstrat în nodul complet și construiește o arhivă de stări istorice. Este necesar dacă dorești să soliciți ceva de genul soldului contului la blocul # 4.000.000.
- Aceste date reprezintă unități de terabyți, ceea ce face ca nodurile de arhivă să fie mai puțin atractive pentru utilizatorii obișnuiți, dar pot fi la îndemână pentru servicii precum exploratorii de blocuri, furnizorii de portofele și analiza lanțului.

Sincronizarea clienților în orice mod, altul decât arhiva, va duce la pierderea de date din blockchain. Aceasta înseamnă că nu există o arhivă a tuturor stărilor istorice, dar nodul complet este capabil să le construiască la cerere.

## De ce ar trebui să rulez un nod Ethereum? {#why-should-i-run-an-ethereum-node}

Rularea unui nod îți permite să utilizezi fără încredere și privat Ethereum în timp ce sprijini ecosistemul.

### Beneficiile tale {#benefits-to-you}

Rularea propriul nod îți permite să utilizezi Ethereum într-un mod cu adevărat privat, auto-suficient și lipsit de încredere. Nu trebuie să ai încredere în rețea, deoarece poți verifica singur datele cu clientul. „Nu te încrede, verifică” este o mantra blockchain populară.

- Nodul tău verifică autonom toate tranzacțiile și blocurile în raport cu regulile de consens. Aceasta înseamnă că nu trebuie să te bazezi pe alte noduri din rețea sau să ai încredere deplină în ele.
- Nu va trebui să-ți dezvălui adresele și soldurile către noduri aleatorii. Totul poate fi verificat cu propriul client.
- Aplicația ta dapp poate fi mai sigură și mai privată dacă folosești propriul nod. [Metamask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) și alte portofele pot fi ușor direcționate către propriul nod local.

![Cum să accesezi Ethereum prin intermediul aplicației și nodurilor](../../../../../developers/docs/nodes-and-clients/nodes.png)

### Beneficiile rețelei {#network-benefits}

Un set divers de noduri este important pentru sănătatea, securitatea și rezistența operațională a Ethereum.

- Acestea oferă acces la datele blockchain pentru clienții ușori care depind de aceasta. În perioadele de vârf de utilizare, trebuie să existe suficiente noduri complete pentru a ajuta la sincronizarea nodurilor ușoare. Nodurile ușoare nu stochează întregul blockchain, ci verifică datele prin [rădăcinile stării din anteturile de blocuri](/developers/docs/blocks/#block-anatomy). Ele pot solicita mai multe informații de la blocuri dacă au nevoie de ele.
- Nodurile complete aplică regulile de consens pentru dovada muncii, deci nu pot fi păcălite să accepte blocuri care nu le urmează. Acest lucru oferă o securitate suplimentară în rețea, deoarece dacă toate nodurile ar fi noduri ușoare, care nu fac verificarea completă, minerii ar putea ataca rețeaua și de exemplu, ar putea crea blocuri cu recompense mai mari.

Dacă rulezi un nod complet, întreaga rețea Ethereum beneficiază de acesta.

## Rularea propriului tău nod {#running-your-own-node}

### Proiecte {#projects}

[**Selectează un client și urmează instrucțiunile acestuia**](#clients)

**ethnode -** **_rulează un nod Ethereum (Geth sau Parity) pentru dezvoltare locală._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** ** _sistem de operare pentru rularea nodurilor Web3, inclusiv Ethereum, pe o mașină dedicată._**

- [dappnode.io](https://dappnode.io)

### Resurse {#resources}

- [Running Ethereum Full Nodes: A Complete Guide](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _7 noiembrie 2019 - Justin Leroux_
- [Node Configuration Cheat Sheet](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _5 ianuarie 2019 - Afri Schoeden_
- [How To Install & Run a Geth Node](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _4 octombrie 2020 - Sahil Sen_
- [How To Install & Run a OpenEthereum (fka. Parity) Node](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _22 septembrie 2020 - Sahil Sen_

## Alternative {#alternatives}

Rularea propriului nod poate fi dificilă și nu este nevoie să rulezi întotdeauna propria instanță. În acest caz, poți utiliza un furnizor API parte terță, cum ar fi [Infura](https://infura.io), [Alchemy](https://alchemyapi.io) sau [QuikNode](https://www.quiknode.io). Alternativ, [ArchiveNode](https://archivenode.io/) este un nod Archive finanțat de comunitate care speră să aducă date de arhivă pe blockchain-ul Ethereum programatorilor independenți care altfel nu și-ar putea permite.

Dacă cineva rulează un nod Ethereum cu un API public în comunitatea sa, îți poți îndrepta portofelele ușoare (cum ar fi MetaMask) către un nod comunitar [prin RPC personalizat](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) și câștiga mai multă confidențialitate decât cu un terț aleatoriu.

Pe de altă parte, dacă rulezi un client, îl poți partaja cu prietenii tăi care ar putea avea nevoie de el.

## Clienți {#clients}

Ethereum este conceput pentru a oferi clienți diferiți, dezvoltați de diferite echipe care utilizează diferite limbaje de programare. Acest lucru face ca rețeaua să fie mai puternică și mai diversă. Scopul ideal este de a realiza diversitatea fără ca niciun client să domine pentru a reduce punctele de eșec.

Acest tabel sintetizează diferiți clienți. Se lucrează în mod activ la toate, sunt întreținute și trec [testele clientului](https://github.com/ethereum/tests).

| Client                                                       | Limbaj   | Sisteme de operare    | Rețele                                               | Strategii de sincronizare  | Starea curățării |
| ------------------------------------------------------------ | -------- | --------------------- | ---------------------------------------------------- | -------------------------- | ---------------- |
| [Geth](https://geth.ethereum.org/)                           | Go       | Linux, Windows, macOS | Rețea principală, Görli, Rinkeby, Ropsten            | Rapid, complet             | Arhivă, Curățat  |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust     | Linux, Windows, macOS | Rețea principală, Kovan, Ropsten, și altele          | Warp, Complet              | Arhivă, Curățat  |
| [Nethermind](http://nethermind.io/)                          | C#, .NET | Linux, Windows, macOS | Rețea principală, Görli, Ropsten, Rinkeby, și altele | Rapid, Complet             | Arhivă, Curățat  |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java     | Linux, Windows, macOS | Rețea principală, Rinkeby, Ropsten și Görli          | Rapid, Complet             | Arhivă, Curățat  |
| [Trinity](https://trinity.ethereum.org/)                     | Python   | Linux, macOS          | Rețea principală, Görli, Ropsten și altele           | Complet, Beam, Rapid/Antet | Arhivă           |

Pentru mai multe informații despre rețelele acceptate, citește [rețelele Ethereum](/developers/docs/networks/).

### Avantajele diferitelor implementări {#advantages-of-different-implementations}

Fiecare client are cazuri de utilizare și avantaje unice, deci ar trebui să alegi unul pe baza propriilor preferințe. Diversitatea permite ca implementările să se concentreze pe diferite funcții și pe publicul utilizatorilor. Poate dorești să alegi un client în funcție de caracteristici, asistență, limbaj de programare sau licențe.

#### Go Ethereum (GeTh) {#geth}

Go Ethereum (Geth pe scurt) este una dintre implementările originale ale protocolului Ethereum. În prezent, este cel mai răspândit client cu cea mai mare bază de utilizatori și o varietate de instrumente pentru utilizatori și programatori. Este scris în Go, complet open source și licențiat sub GNU LGPL v3.

#### OpenEthereum {#openethereum}

OpenEthereum este un client Ethereum rapid, bogat în funcții și avansat bazat pe CLI. Este construit pentru a oferi infrastructura esențială pentru servicii rapide și fiabile, care necesită sincronizare rapidă și timp maxim de funcționare. Obiectivul OpenEthereum este de a fi cel mai rapid, mai ușor și mai sigur client Ethereum. Oferă o bază de cod modulară curată pentru:

- personalizare ușoară.
- integrarea ușoară în servicii sau produse.
- consum minim de memorie și de stocare.

OpenEthereum este dezvoltat folosind limbajul de programare Rust de ultimă oră și licențiat sub GPLv3.

#### Nethermind {#nethermind}

Nethermind este o implementare Ethereum creată cu stiva de tehnologie C# .NET, care rulează pe toate platformele majore, inclusiv ARM. Acesta oferă o mare performanță cu:

- o mașină virtuală optimizată
- acces la stare
- rețea și funcții bogate, cum ar fi tablourile de bord Prometheus/Graphana, suport pentru jurnalizarea întreprinderilor, urmărirea JSON RPC și plugin-uri de analiză.

Nethermind are [documentație detaliată](https://docs.nethermind.io), suport puternic pentru programatori, o comunitate online și 24/7 suport disponibil pentru utilizatorii premium.

#### Besu {#besu}

Hyperledger Besu este un client Ethereum de nivel întreprindere pentru rețele publice și autorizate. Rulează toate caracteristicile principale Ethereum, de la trasare la GraphQL, are o monitorizare extensivă și este susținut de ConsenSys, atât în cadrul unor canale comunitare deschise, cât și prin intermediul unor acorduri interregionale comerciale pentru întreprinderi. Este scris în Java și are licență Apache 2.0.

### Mod sincronizare {#sync-modes}

- Complet – descarcă toate blocurile (inclusiv anteturi, tranzacții și chitanțe) și generează starea blockchain-ului incremental executând fiecare bloc.
- Rapid (Implicit) – descarcă toate blocurile (inclusiv anteturile, tranzacțiile și chitanțele), verifică toate anteturile și descarcă starea și o verifică în raport cu anteturile.
- Light – descarcă toate anteturile de bloc, blochează datele și verifică unele aleatoriu.
- Sincronizare Warp – la fiecare 5.000 de blocuri, nodurile vor realiza un instantaneu consensual decisiv pentru starea acelui bloc. Orice nod poate prelua aceste instantanee prin rețea, permițând o sincronizare rapidă. [Mai multe despre Warp](https://openethereum.github.io/wiki/Warp-Sync-Snapshot-Format)
- Beam sync – mod de sincronizare care îți permite să mergi mai repede. Nu necesită așteptări lungi pentru sincronizare, în schimb, umple din nou datele în timp. [Mai multe despre Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)
- Sincronizare Antet – poți utiliza un punct de control de încredere pentru a începe sincronizarea dintr-un antet mai recent și apoi să-l lași într-un proces de fundal pentru a umple golurile în cele din urmă

Definești tipul de sincronizare atunci când configurezi, astfel:

**Configurarea sincronizării Light în [GETH](https://geth.ethereum.org/)**

`geth --syncmode "light"`

**Configurarea sincronizării antetului în Trinity**

`trinity --sync-from-checkpoint eth://block/byhash/0xa65877df954e1ff2012473efee8287252eee956c0d395a5791f1103a950a1e21?score=15,835,269,727,022,672,760,774`

## Hardware {#hardware}

Cerințele hardware diferă în funcție de client, dar în general nu sunt atât de mari, deoarece nodul trebuie doar să rămână sincronizat. Nu-l confunda cu mineritul care necesită mult mai multă putere de calcul. Cu toate acestea, timpul de sincronizare și performanța se îmbunătățesc cu hardware mai puternic. În funcție de nevoile și dorințele tale, Ethereum poate fi rulat pe computerul tău, serverul de acasă, computerele cu o singură placă (SBC) sau serverele private virtuale din cloud.

O modalitate ușoară de a rula propriul nod este utilizarea casetelor „plug and play”, cum ar fi [DAppNode](https://dappnode.io/). Oferă hardware pentru rularea clienților și a aplicațiilor care depind de aceștia, cu o interfață de utilizator simplă.

### Cerințe {#requirements}

Înainte de a instala orice client, asigură-te că ai resurse suficiente pe computerul tău pentru a-l rula. Cerințele minime și recomandate pot fi găsite mai jos, totuși partea cheie este spațiul pe disc. Sincronizarea blockchain-ului Ethereum presupune foare multe operații de intrare/ieșire. Cel mai bine este să ai un solid-state drive (SSD). Pentru a rula un client Ethereum pe HDD, vei avea nevoie de cel puțin 8 GB de RAM pentru a-i utiliza precum cache.

#### Cerințe minime {#recommended-specifications}

- CPU cu cel puțin 2 nuclee
- 4 GB RAM minimum cu un SSD, 8 GB minimum, dacă ai un HDD
- Lățime de bandă de 8 MBit/s

#### Specificații recomandate {#recommended-specifications}

- Procesor rapid cu cel puțin 4 nuclee
- Minimum 16 GB RAM
- SSD rapid cu cel puțin 500 GB spațiu liber
- Lățime de bandă de cel puțin 25 MBit/s

În funcție de ce software și ce mod de sincronizare vei folosi, sute de GB de spațiu pe disc sunt necesari. Numerele aproximative și creșterea pot fi găsite mai jos.

| Client       | Mărime disc (sinc. rapidă) | Mărime disc (arhivă completă) |
| ------------ | -------------------------- | ----------------------------- |
| Geth         | Minimum 400 GB             | Minimum 4,7 TB                |
| OpenEthereum | Minimum 280 GB             | Minimum 4,6 TB                |
| Nethermind   | Minimum 200 GB             | Minimum 3 TB                  |
| Besu         | Minimum 750 GB             | Minimum 4 TB                  |

![O diagramă care arată că numărul de GB necesari la o sincronizare completă este în creștere](../../../../../developers/docs/nodes-and-clients/full-sync.png)

![O diagramă care arată că numărul de GB necesari la o sincronizare arhivă este în creștere](../../../../../developers/docs/nodes-and-clients/archive-sync.png)

Aceste diagrame arată cum cerințele de stocare sunt mereu în schimbare. Pentru cele mai recente date ale Geth și Parity, consultă [datele de sincronizare completă](https://etherscan.io/chartsync/chaindefault) și [arhivarea datelor de sincronizare](https://etherscan.io/chartsync/chainarchive).

### Ethereum pe un computer cu o singură placă (SBC) {#ethereum-on-a-single-board-computer}

Cel mai convenabil și mai ieftin mod de a rula nodul Ethereum este de a utiliza un computer cu o singură placă bazată pe arhitectură ARM precum Raspberry Pi. [Ethereum pe ARM](https://twitter.com/EthereumOnARM) oferă imagini cu clienții Geth, Parity, Nethermind și Besu. Iată un tutorial simplu despre [cum să construiești și să configurezi un client ARM](/developers/tutorials/run-node-raspberry-pi/).

Dispozitive mici, accesibile și eficiente ca acestea sunt ideale pentru rularea unui nod acasă.

## Clienții Eth2 {#eth2-clients}

Există clienți noi pentru a sprijini [upgrade-urile Eth2](/eth2/beacon-chain/). Aceștia vor executa lanțul Beacon și vor sprijini noul mecanism de consens al [dovezii mizei (PoS)](/developers/docs/consensus-mechanisms/pos/).

[Vezi clienții Eth2](/eth2/get-involved/#clients).

## Referințe suplimentare {#further-reading}

Există o mulțime de instrucțiuni și informații despre clienții Ethereum pe internet, aici sunt câteva care ar putea fi de ajutor.

- [Ethereum 101 - Partea 2 - Înțelegerea nodurilor](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 februarie 2019_
- [Rularea de Noduri Ethereum complete: Un ghid pentru cei abia motivați](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 noiembrie 2019_
- [Executarea unui nod Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, actualizează des_
- [Analizarea cerințelor hardware pentru a fi un nod Ethereum validat complet](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 septembrie 2018_
- [Rularea unui nod Besu Hyperledder pe Mainnet Ethereum: Beneficii, cerințe și instalare](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 mai 2020_

## Subiecte corelate {#related-topics}

- [Blocuri](/developers/docs/blocks/)
- [Rețele](/developers/docs/networks/)

## Tutoriale corelate {#related-tutorials}

- [Rularea unui nod cu Geth](/developers/tutorials/run-light-node-geth/) _ – Cum să descarci, să instalezi și să rulezi Geth. Acoperă syncmode-urile, consola JavaScript, și mai multe._
- [Transformă-ți Raspberry Pi 4 într-un nod Eth 1.0 sau Eth 2.0 doar flashing cartea MicroSD – Ghid de instalare](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4, conectează un cablu ethernet, conectează un disc SSD și deschide dispozitivul pentru a transforma Raspberry Pi 4 într-un nod complet Ethereum 1.0 sau Ethereum 2.0 (lanț Beacon / validator)_
