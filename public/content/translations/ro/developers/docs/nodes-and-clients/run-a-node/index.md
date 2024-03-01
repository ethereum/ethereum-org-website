---
title: Creați-vă propriul nod Ethereum
description: Introducere generală despre rularea propriei instanțe a unui client Ethereum.
lang: ro
sidebarDepth: 2
---

Rularea propriului nod vă oferă diverse beneficii, deschide noi posibilități și ajută la susținerea ecosistemului. Această pagină vă va îndruma prin procesul de creare a propriului nod și de participare la validarea tranzacțiilor Ethereum.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeți ce este un nod Ethereum și de ce este de dorit să rulați un client. Acest aspect este tratat în secțiunea [Noduri și clienți](/developers/docs/nodes-and-clients/).

If you're new to the topic of running a node, or looking for a less technical path, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Alegerea unei metode de abordare {#choosing-approach}

Primul pas în crearea nodului dvs. este să vă alegeţi un mod de abordare. You have to choose the client (the software), the environment, and the parameters you want to start with. Vizualizați toți [clienţii din Mainnet](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) disponibili.

### Setările pentru client {#client-settings}

Implementările clienţilor activează diferite moduri de sincronizare și diverse alte opțiuni. [Modurile de sincronizare](/developers/docs/nodes-and-clients/#sync-modes) reprezintă diferite metode de descărcare și validare a datelor din blockchain. Before starting the node, you should decide what network and sync mode to use. Cele mai importante lucruril de luat în considerare sunt spațiul pe disc și timpul de sincronizare de care va avea nevoie clientul.

Puteţi afla toate funcţionalităţile și opțiunile în documentația clientului. Se pot seta diverse configurații ale clientului prin executarea clientului cu flagurile corespunzătoare. În scopul testării, este preferabil să executați un client pe una dintre rețelele testnet. [Vedeți o prezentare generală a rețelelor acceptate](/developers/docs/nodes-and-clients/#execution-clients).

### Mediu și hardware {#environment-and-hardware}

#### Local sau în cloud {#local-vs-cloud}

Clienții Ethereum pot rula pe computerele obişnuite ale consumatorilor și nu necesită un hardware special, cum ar fi, de exemplu, cel de minare. Prin urmare, aveți diverse opțiuni pentru implementare în funcţie de necesităţile dvs. Pentru a simplifica, să ne gândim să rulăm un nod atât pe un computer fizic local, cât și pe un server în cloud:

- Cloud
  - Furnizorii oferă o disponibilitate ridicată a timpului de server, adrese IP publice statice
  - Să obţineţi un server dedicat sau virtual poate fi mai comodă decât să vă construiţi un server propriu
  - Compromisul este de a vă încrede într-un terţ - furnizorul serverului
  - Din cauza dimensiunii de stocare necesare pentru un nod complet, prețul unui server închiriat ar putea să crească
- Hardware propriu
  - O abordare ce nu necesită să vă bizuiţi pe încredere și care este mai independentă
  - O investiție unică
  - O opțiune de a cumpăra un computere preconfigurate
  - Trebuie să întrețineți, să mențineți și eventual să depanați computerul, în mod fizic

Ambele opțiuni au diverse avantaje, rezumate mai sus. Dacă sunteți interesat de o soluție în cloud, pe lângă numeroșii furnizori tradiționali de cloud computing, există și servicii axate pe implementarea de noduri. De exemplu:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Hardware {#hardware}

Cu toate acestea, o rețea rezistentă la cenzură, descentralizată nu ar trebui să se bazeze pe furnizorii de servicii în cloud. Este mai sănătos pentru ecosistem dacă vă rulaţi propriul nod pe hardware. Cele mai simple opțiuni sunt constituite de computerele preconfigurate, cum ar fi:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Verificați [cerinţele de spațiu pe disc ale fiecărui client și mod de sincronizare](/developers/docs/nodes-and-clients/#requirements) minime şi recomandate. Generally, modest computing power should be enough. De obicei problema este reprezentată de viteza unității. During initial sync, Ethereum clients perform a lot of read/write operations. De aceea se recomandă insistent un SSD. S-ar putea ca un client să nu [poată nici măcar să sincronizeze starea curentă pe HDD](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) și să rămână blocat la câteva blocuri în spatele Mainnet-ului. Puteți rula cei mai mulți clienți pe un [computer cu o singură placă pe procesoare cu arhitectură ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). You can also use the [Ethbian](https://ethbian.org/index.html) operating system for Raspberry Pi 4. This lets you [run a client by flashing the SD card](/developers/tutorials/run-node-raspberry-pi/). Pe baza opțiunilor dvs. de software și hardware, timpul pentru sincronizarea inițială și cerințele de stocare pot varia. Aveţi grijă să [verificaţi timpii de sincronizare și cerințele de stocare](/developers/docs/nodes-and-clients/#recommended-specifications). Totodată, verificați că nu aveți o conexiune la internet limitată de un [plafon de lățime de bandă](https://wikipedia.org/wiki/Data_cap). Este recomandat să utilizați o conexiune nelimitată, deoarece sincronizarea inițială și datele difuzate în rețea ar putea depăși limita dvs.

#### Sistemul de operare {#operating-system}

All clients support major operating systems - Linux, MacOS, Windows. Aceasta înseamnă că puteți rula nodurile pe computere desktop obișnuite sau pe servere cu sistemul de operare (SO) preferat. Asigurați-vă că sistemul dvs. de operare este actualizat, pentru a evita eventualele probleme și vulnerabilități de securitate.

## Crearea nodului {#spinning-up-node}

### Procurarea software-ului client {#getting-the-client}

Mai întâi descărcați [software-ul client](/developers/docs/nodes-and-clients/#execution-clients) preferat

Nu trebuie decât să descărcați o aplicație executabilă sau un pachet de instalare adaptat sistemului dvs. de operare și arhitecturii dvs. Always verify signatures and checksums of downloaded packages. Anumiți clienți oferă şi depozitare pentru a facilita instalarea și actualizările. If you prefer, you can build from source. All of the clients are open source so you can build them from source code with the proper compiler.

Fișierele binare executabile destinate implementărilor clienților Mainnet stabili se pot descărca de pe paginile lor de lansare:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Rețineți că OpenEthereum [a fost dezaprobat](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) și nu mai este întreținut.** Folosiți-l cu precauție și este preferabil să treceți la o altă implementare de client.

### Lansarea clientului {#starting-the-client}

Este bine ca, înainte de a porni software-ul client Ethereum, să efectuați o ultimă verificare că mediul dvs. este pregătit. For example, make sure:

- Aveți suficient spațiu pe disc, în funcție de rețeaua aleasă și de modul de sincronizare.
- Memoria și CPU-ul nu sunt oprite de alte programe.
- Sistemul de operare este actualizat la ultima versiune.
- Data și ora sistemului sunt corecte.
- Routerul și firewall-ul acceptă conexiuni pe porturile de ascultare. Clienții Ethereum utilizează în mod implicit un port de ascultare (TCP) și un port de descoperire (UDP), ambele pe 30303 în mod implicit.

Rulaţi mai întâi clientul pe un testnet, pentru a vă asigura că totul funcționează corect. [Dacă rulaţi un nod ușor Geth](/developers/tutorials/run-light-node-geth/), aceasta ar trebui să vă ajute. Toate setările de client ce nu sunt cele implicite trebuie să fie declarate de la început. You can use flags or the config file to declare your preferred configuration. Consultați documentația clientului dvs. pentru detalii Execuția clientului va iniția funcțiile sale de bază, endpoint-urile alese și va începe să caute partenerii. După ce a reuşit să descopere partenerii, clientul începe sincronizarea. Datele actualizate ale blockchain-ului vor fi disponibile după sincronizarea cu succes a clientului cu starea actuală.

### Utilizarea clientului {#using-the-client}

Clienții oferă endpoint-uri API RPC pe care le puteți utiliza pentru a controla clientul și a interacționa cu rețeaua Ethereum în diverse moduri:

- Apelându-i manual cu un protocol adecvat (de exemplu, folosind `curl`)
- Atașându-le o consolă furnizată (de exemplu, `geth attach`)
- Implementându-i în aplicații

Diverși clienți au implementări diferite ale endpoint-urilor RPC. Există însă un JSON-RPC standard pe care îl puteţi utiliza cu orice client. Ca să aflaţi o prezentare generală, [citiți documentația JSON-RPC](https://eth.wiki/json-rpc/API). Aplicațiile care au nevoie de informații din rețeaua Ethereum pot folosi acest RPC. For example, popular wallet MetaMask lets you [run a local blockchain instance and connect to it](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Atingerea RPC-ului {#reaching-rpc}

Portul implicit al JSON-RPC este `8545`, dar puteţi modifica porturile endpoint-urilor locale în fișierul de configurare. By default, the RPC interface is only reachable on the localhost of your computer. To make it remotely accessible, you might want to expose it to the public by changing the address to `0.0.0.0`. This will make it reachable over local and public IP addresses. De cele mai multe ori va trebui să configurați și redirecționarea porturilor pe router.

Trebuie să faceți aceasta cu multă precauție, deoarece astfel oricine de pe internet va putea să vă controleze nodul. Actorii rău intenționați ar putea să vă acceseze nodul, fie pentru a vă distruge sistemul, fie pentru a vă fura fondurile, dacă vă folosiți clientul ca portofel.

O metodă de evitare a acestui lucru este de a nu permite ca unele metode RPC potențial dăunătoare să poată fi modificabile. For example, with `geth`, you can declare modifiable methods with a flag: `--http.api web3,eth,txpool`.

You can also host access to your RPC interface by pointing service of web server, like Nginx, to your client's local address and port.

The most privacy-preserving and simple way to set up a publicly reachable endpoint, you can host it on your own [Tor](https://www.torproject.org/) onion service. This will let you reach the RPC outside your local network without a static public IP address or opened ports. To do this:

- Instalați `tor`
- Editați configurația `torrc` pentru a activa serviciul ascuns cu adresa și portul RPC al clientului dvs.
- Reporniți serviciul `tor`

Once you restart Tor, you'll get hidden service keys and a hostname in your desired directory. From then, your RPC will be reachable on a `.onion` hostname.

### Exploatarea nodului {#operating-the-node}

You should regularly monitor your node to make sure it's running properly. You may need to do occasional maintenance.

#### Păstrarea online a nodului {#keeping-node-online}

Your node doesn't have to be online nonstop but you should keep it online as much as possible to keep it in sync with the network. You can shut it down to restart it but keep in mind that:

- Închiderea poate dura câteva minute dacă starea actuală este încă scrisă pe disc.
- Închiderile forțate pot deteriora baza de date.
- Clientul dvs. se va desincroniza de la rețea și va trebui să se resincronizeze atunci când îl reporniți.

_This doesn't apply on consensus layer validator nodes._ Taking your node offline will affect all services dependent on it. If you are running a node for _staking_ purposes you should try to minimize downtime as much as possible.

#### Crearea unui serviciu client {#creating-client-service}

Consider creating a service to run your client automatically on startup. For example on Linux servers, good practice would be creating a service that executes the client with proper config, under user with limited privileges and automatically restarts.

#### Actualizarea clientului {#updating-client}

You need to keep your client software up-to-date with the latest security patches, features, and [EIPs](/eips/). Especially before [hard forks](/history/), make sure you are running the correct client version.

#### Rularea de servicii suplimentare {#running-additional-services}

Running your own node lets you use services that require direct access to Ethereum client RPC. These are services built on top of Ethereum like [layer 2 solutions](/developers/docs/scaling/#layer-2-scaling), [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients), and other Ethereum infrastructure.

#### Monitorizarea nodului {#monitoring-the-node}

"To properly monitor your node, consider collecting metrics. Clients provide metrics endpoints so you can get comprehensive data about your node. Use tools like [InfluxDB](https://www.influxdata.com/get-influxdb/) or [Prometheus](https://prometheus.io/) to create databases which you can turn into visualizations and charts in software like [Grafana](https://grafana.com/). There are many setups for using this software and different Grafana dashboards for you to visualise your node and the network as a whole. As part of your monitoring, make sure to keep an eye on your machine's performance. During your node's initial sync, the client software may be very heavy on CPU and RAM. In addition to Grafana, you can use the tools your OS offers like `htop` or `uptime` to do this.

## Referințe suplimentare {#further-reading}

- [Analizarea cerințelor hardware pentru a fi un nod Ethereum validat complet](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 septembrie 2018_
- [Rularea de Noduri Ethereum complete: Un ghid pentru cei abia motivați](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 noiembrie 2019_
- [Rularea unui nod Besu Hyperledder pe Mainnet Ethereum: Beneficii, cerințe și instalare](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 mai 2020_
- [Implementarea Clientului Nethermind Ethereum cu stiva de monitorizare](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 iulie 2020_

## Subiecte corelate {#related-topics}

- [Noduri și clienți](/developers/docs/nodes-and-clients/)
- [Blocuri](/developers/docs/blocks/)
- [Rețele](/developers/docs/networks/)
