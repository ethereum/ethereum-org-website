---
title: Cum se execută un nod ușor cu Geth
description: Cum se descarcă, se instalează și se execută Geth. Se acoperă syncmode-uri, consola JavaScript și multe altele
author: "Brian Gu"
tags:
  - "clienți"
  - "geth"
  - "noduri"
skill: intermediar
lang: ro
sidebar: true
published: 2020-06-14
---

Probabil ești interesat să rulezi un [nod Ethereum](/developers/docs/noses-and-clients/). Unul dintre cele mai simple moduri de a face acest lucru este prin descărcarea, instalarea și rularea Geth. Cu Geth, putem avea un nod ușor gata și funcțional în câteva minute.

Mai întâi, trebuie să [instalezi Geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum).

După ce ai instalat Geth, rularea unui nod complet Ethereum este la fel de simplă ca tastarea

```bash
$ geth
```

în linia de comandă (fără semnul dolar). NU face acest lucru ÎNCĂ! Când vei rula `Geth`, Geth va:

- inițializa o copie locală a unui EVM cu stare goală
- începe să descarce toate blocurile în istoricul Ethereum, începând cu blocul 0.
- relua toate tranzacțiile din toate blocurile în ordine, actualizând starea EVM cu fiecare tranzacție până când ajunge la starea actuală.

Acest proces poate dura de la ore la zile și necesită câteva sute GB de spațiu liber. Deocamdată, vom rula doar un nod ușor pe o rețea de testare pentru a ne familiariza cu modul de utilizare a Geth. Pentru a face acest lucru, va trebui să trecem prin câteva opțiuni și instrumente importante din linia de comandă.

## Rețeaua principală și cea de testare {#mainnet-and-testnet}

În mod implicit, Geth rulează un nod rețea principală. Poți rula `geth --testnet` pentru a rula un nod complet de testare Ropsten. Poți rula un nod pe Rinkeby prin schimbarea `testnet` pentru `rinkeby`.

[Află mai multe despre diferite rețele](/developers/docs/Networks/).

## Syncmode {#syncmode}

Geth are trei `syncmode`-uri.

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

Modul `"full"` rulează un nod complet exact așa cum te aștepți - aparatul inițializează o copie locală a EVM în starea sa inițială curată, descarcă fiecare bloc de la începutul blockchain-ului și execută fiecare tranzacție în fiecare bloc, actualizând starea EVM până când ajunge la starea actuală a EVM.

Modul `"fast"` descarcă toate blocurile, dar descarcă și un instantaneu recent al stării EVM de la un peer (în prezent, starea blocurilor EVM 64 în trecut), executând tranzacții doar în cele mai recente blocuri până când ajunge la starea actuală a EVM. Avantajul modului `"fast"` este că este că ia mai puțin timp pentru a se sincroniza cu starea actuală; cu toate acestea, se bazează pe un nod de arhivare peer complet pentru un instantaneu de stare, deci nu verifică totul pentru sine.

În cele din urmă, modul `"light"` rulează un nod ușor, despre care am discutat mai sus.

Pentru o explicație excelentă a diferențelor dintre cele trei moduri de sincronizare, consultă [Răspunsuri pe StackExchange](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast).

## Documentația și alte opțiuni ale liniei de comandă {#documentation-and-other-command-line-options}

- [Documentație completă](https://geth.ethereum.org/docs/)
- [Toate opțiunile liniei de comandă](https://geth.ethereum.org/docs/interface/command-line-options)

## Rularea nodului ușor {#running-your-light-node}

Vom rula un nod testnet ușor pentru a ne familiariza cu modul de a gestiona și de a interacționa cu un nod. Pentru aceasta rulează comanda

```bash
$ geth --testnet --syncmode "light"
```

Așteaptă câteva secunde și sperăm că vei obține o ieșire care arată așa:

```bash
$ geth --testnet --syncmode "light"
INFO [11-18|14:04:47] Maximum peer count                       ETH=0 LES=100 total=25
INFO [11-18|14:04:47] Starting peer-to-peer node               instance=Geth/v1.8.11-stable/darwin-amd64/go1.10.3
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
INFO [11-18|14:04:47] Persisted trie from memory database      nodes=355 size=51.89kB time=561.839µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [11-18|14:04:47] Initialised chain configuration          config="{ChainID: 3 Homestead: 0 DAO: <nil> DAOSupport: true EIP150: 0 EIP155: 10 EIP158: 10 Byzantium: 1700000 Constantinople: <nil> Engine: ethash}"
INFO [11-18|14:04:47] Disk storage enabled for ethash caches   dir=/Users/bgu/Library/Ethereum/testnet/geth/ethash count=3
INFO [11-18|14:04:47] Disk storage enabled for ethash DAGs     dir=/Users/bgu/.ethash                              count=2
INFO [11-18|14:04:47] Added trusted checkpoint                 chain=ropsten block=3375103 hash=9017ab…249e89
INFO [11-18|14:04:47] Loaded most recent local header          number=0 hash=419410…ca4a2d td=1048576
INFO [11-18|14:04:47] Starting P2P networking
INFO [11-18|14:04:49] UDP listener up                          net=enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303
WARN [11-18|14:04:49] Light client mode is an experimental feature
INFO [11-18|14:04:49] RLPx listener up                         self="enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303?discport=0"
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
INFO [11-18|14:04:51] Mapped network port                      proto=udp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:04:51] Mapped network port                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:08:55] Block synchronisation started
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=1.574s number=3375295 hash=62f6b1…95c47f ignored=0
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=127.088ms number=3375487 hash=ae759b…453ac5 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=960 elapsed=582.125ms number=3376447 hash=4cab62…445b82 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=169.936ms number=3376639 hash=470614…85ce15 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=384 elapsed=245.745ms number=3377023 hash=dad8ee…2862d2 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=128.514ms number=3377215 hash=ebcd84…ea26cb ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=125.427ms number=3377407 hash=fca10c…8ed04d ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.536ms number=3377599 hash=9aa141…f34080 ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.849ms number=3377791 hash=499f2d…e0c713 ignored=0
```

Notă: Este posibil să nu vezi mesajul „Sincronizare bloc pornită” urmat de „Anteturi de blocuri noi importate” pentru câteva minute sau chiar ore, dacă ești deosebit de ghinionist. În acest timp, clientul tău încearcă să găsească noduri „peers” complete dispuse să servească clienți ușori. În exemplul de mai sus, putem spune prin marcajul temporal, că mașina mea a trebuit să aștepte aproximativ patru minute între a începe să caute noduri peer și găsirea unuia pentru a descărca blocuri de pe el. Aceasta este în prezent o problemă deschisă în cadrul comunității Ethereum - cum putem motiva oamenii să ruleze noduri complete care deservesc clienți ușori?

Odată ce începe sincronizarea blocului, va dura câteva minute pentru ca mașina să ajungă la ultimele blocuri de pe blockchain. În acel moment, rezultatul va începe să semene cu:

```bash
INFO [11-18|16:06:04.025] Imported new block headers               count=2   elapsed=6.253ms   number=4456862 hash=ce0a0b…6ab128
INFO [11-18|16:06:27.819] Imported new block headers               count=2   elapsed=5.982ms   number=4456864 hash=04a054…b4f661
INFO [11-18|16:06:34.080] Imported new block headers               count=2   elapsed=4.774ms   number=4456866 hash=15a43c…efc782
INFO [11-18|16:06:45.464] Imported new block headers               count=2   elapsed=5.213ms   number=4456868 hash=eb02d5…227564
INFO [11-18|16:07:11.630] Imported new block headers               count=2   elapsed=5.835ms   number=4456870 hash=67daa7…66892d
```

În acest moment, mesajele vor începe să vină doar la fiecare 10-30 secunde, iar valoarea `count` (contor) va avea o singură cifră pentru fiecare mesaj.

## Unde sunt stocate datele blockchain și EVM? {#where-is-the-blockchain-and-evm-data-stored}

Directorul pe care Geth îl utilizează pentru a stoca datele brute blockchain depinde de sistemul de operare. La rularea Geth, caută un mesaj care arată ca

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Calea care urmează `„database=”` (baza de date) ar trebui să-ți spună unde sunt stocate datele blockchain pe mașină. Dacă rulezi un nod complet, acest director va conține toate datele despre fiecare bloc care a fost vreodată angajat la blockchain. Din moment ce noi rulăm un nod ușor, acest director conține doar anteturile blocului.

Merită subliniat aici că, la cel mai de jos nivel, aici trăiește blockchain-ul. Conținutul complet al blockchain-ului și starea EVM sunt stocate pe fiecare nod complet din rețeaua Ethereum, în directoare care seamănă foarte mult cu cele de pe computer.

## Atașarea la consola JavaScript {#attaching-to-the-javascript-console}

Rularea unui nod nu este utilă decât dacă putem interacționa cu acesta. De exemplu, am putea dori să difuzăm cereri de tranzacții sau să căutăm date EVM/blockchain (cum ar fi soldul contului). Geth are o consolă JavaScript încorporată și un API JavaScript denumit [web3js](https://github.com/ethereum/web3.js/) pe care îl poți utiliza pentru a interacționa cu nodul tău.

Pentru a utiliza consola JavaScript:

1. Începe să rulezi un nod într-o fereastră de terminal (nodul „full” și cel „light” sunt OK).
2. Caută un mesaj care arată astfel:

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

Acest mesaj trebuie înregistrat înainte de începerea sincronizării blocului.

3. Acest mesaj arată calea către endpoint-ul IPC (Comunicare interproces). Copiază această cale (în exemplul de mai sus, este `/users/bgu/Library/Ethereum/testnet/geth.ipc`).
4. Deschide o fereastră de terminal sau o nouă filă și execută următoarea comandă: `$ geth attach [calea ta la endpoint-ul IPC]`

Aceasta ar trebui să deschidă consola JavaScript. Acum putem folosi web3js pentru a interacționa cu nodul.

[Documentație web3js completă](http://web3js.readthedocs.io/)

Iată câteva obiecte utile expuse de acest API. Le poți accesa tastând în consola JavaScript.

- `eth.sincronizing` returnează un obiect dacă nodul a început, dar nu a finalizat sincronizarea blocului sau valoarea `false` dacă a finalizat sincronizarea sau nu a început. Dacă nodul încă se sincronizează, `eth.syncing` îți va indica cel mai recent număr de bloc ale cărui date le-ai primit, precum și numărul total de blocuri din blockchain-ul curent.
- `net.peerCount` returnează numărul de peers la care ești conectat. Dacă acesta este 0, probabil că va trebui să aștepți câteva minute sau să începi o căutare Google pentru soluții (ar putea fi un firewall sau o problemă de rețea sau altceva).
- `admin.peegers` îți oferă o listă cu orice peer la care este conectat nodul tău. Dacă acesta este gol, atunci nodul nu este conectat la niciun alt peer.

De asemenea, poți utiliza web3js pentru a inițializa conturile, a scrie și a difuza cererile de tranzacții în rețea, pentru a căuta soldurile conturilor și metadatele și multe altele. Vom acoperi aceste operațiuni într-o secțiune ulterioară; pentru moment, încearcă să rulezi următoarele pentru a căuta soldul unuia dintre conturile mele pe testul Ropsten:

```js
eth.getBalance('0x85d918c2B7F172d033D190152AEc58709Fb6D048')
# afișează 1059286000000000000 pe 18 noiembrie 2018. Această valoare este raportată în „Wei”.
# Un Wei este o denominație echivalentă cu 10^-18 eter.
# Soldul acestui cont în eter este de aproximativ 1,059 eth.
```

## Oprirea și repornirea nodului {#stopping-and-restarting-your-node}

Poți opri nodul în orice moment. Dacă dorești să repornești nodul, va dura câteva secunde sau minute pentru ca Geth să se sincronizeze din nou (descărcând blocurile și/sau anteturile blocurilor de unde a rămas când ultimul nod a încetat să ruleze). Dacă oricare dintre instrucțiunile de mai sus nu funcționează, primul lucru pe care trebuie să-l faci este să încerci să repornești nodul.

Dacă ești interesat să rulezi un nod complet Ethereum, în general, cel mai bine este să faci acest lucru de la o mașină dedicată, cu conectivitate bună la rețea, mai degrabă decât de la un computer personal. Iată un ghid pentru rularea unui nod cu AWS (acesta este un pic învechit, iar API-urile de referință nu mai sunt recente sau disponibile, deci este posibil să trebuiască să cauți puțin pe Google): [Cum să rulezi un nod pe AWS](https://medium.com/mercuryprotocol/how-to-run-an-ethereum-node-on-aws-a8774ed3acf6)
