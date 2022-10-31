---
title: O introducere pentru dezvoltatorii Python despre Ethereum, partea 1
description: O introducere despre dezvoltarea Ethereum, utilă în special pentru cei care au cunoștințe de programare în limbajul Python
author: Marc Garreau
lang: ro
tags:
  - "noțiuni de bază"
  - "python"
  - "blockchain"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Așadar, ați auzit despre acest Ethereum și sunteți gata să vă aventuraţi? Această postare va aborda succint câteva noțiuni elementare despre blockchain, apoi vă va îndruma să interacționați cu un nod Ethereum simulat – prin citirea datelor blocului, verificarea soldurilor conturilor și trimiterea de tranzacții. Pe parcurs vom evidenția diferențele dintre metodele tradiționale de construire a aplicațiilor și această nouă paradigmă descentralizată.

## Condiții prealabile (soft) {#soft-prerequisites}

Această postare îşi propune să fie accesibilă unei game largi de dezvoltatori. Vor fi implicate [instrumente Python](/developers/docs/programming-languages/python/), dar acestea constituie doar un vehicul pentru idei – nu este nicio problemă dacă nu sunteți dezvoltator Python. Voi face totuşi doar câteva presupuneri despre ceea ce cunoașteți deja, astfel încât să putem trece rapid la aspectele specifice pentru Ethereum.

Ipoteze:

- ştiţi cum să folosiți un terminal,
- ați scris deja câteva linii de cod Python,
- aveți instalat Python în versiunea 3.6 sau ulterioară pe computer (utilizarea unui [mediu virtual](https://realpython.com/effective-python-environment/#virtual-environments) este foarte recomandată) și
- ați folosit `pip`, programul de instalare a pachetelor Python. Reamintim că, în cazul când oricare dintre acestea nu este adevărată sau dacă nu intenționați să reproduceți codul din acest articol, sunt şanse să puteţi ţine pasul fără probleme.

## Blockchain-urile, pe scurt {#blockchains-briefly}

Ethereum poate fi descris în mai multe feluri, dar în esență este un blockchain. Blockchain-urile sunt alcătuite dintr-o serie de blocuri, deci haideți să începem de aici. La modul cel mai simplu, fiecare bloc de pe blockchain-ul Ethereum reprezintă pur și simplu niște metadate și o listă de tranzacții. În format JSON, aceasta arată cam așa:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Fiecare [bloc](/developers/docs/blocks/) conține o referință la blocul precedent; `„parentHash”` este pur și simplu hash-ul blocului anterior.

<div class="featured">Observaţie: Ethereum utilizează în mod regulat <a href="https://en.wikipedia.org/wiki/Hash_function">funcții hash</a> pentru a produce valori de mărime fixă („hash-uri”). Hash-urile joacă un rol important în Ethereum, dar deocamdată puteți să le consideraţi niște ID-uri unice.</div>

![O diagramă care ilustrează un blockchain, inclusiv datele din interiorul fiecărui bloc](./blockchain-diagram.png)

_Un blockchain este în esență o listă de link-uri; fiecare bloc face referire la blocul anterior._

Această structură de date nu reprezintă o noutate în sine, însă regulile (adică protocoalele peer-to-peer) care guvernează rețeaua sunt noi. Nu există o autoritate centrală; rețeaua de omologi („peers”) trebuie să colaboreze pentru a susține rețeaua și intră în competiţie pentru a decide ce tranzacții vor fi incluse în blocul următor. De aceea, atunci când doriți să trimiteți niște bani unui prieten, trebuie să transmiteți tranzacția în rețea, apoi să așteptați ca aceasta să fie inclusă într-un bloc ce urmează.

Singura modalitate ca blockchain-ul să verifice dacă banii au fost cu adevărat trimiși de la un utilizator la altul este să folosească o monedă nativă a acelui blockchain (adică creată și guvernată de acesta). În Ethereum această monedă se numește ether, iar blockchain-ul Ethereum conține singura înregistrare oficială a soldurilor conturilor.

## O nouă paradigmă {#a-new-paradigm}

Această nouă stivă tehnologică descentralizată a generat noi instrumente pentru dezvoltatori. Astfel de instrumente există în multe limbaje de programare, însă noi le vom analiza prin prisma Python. Menţionăm din nou: chiar dacă Python nu este limbajul dvs. preferat, nu va fi dificil să ţineţi pasul.

Dezvoltatorii Python care vor să interacționeze cu Ethereum vor căuta probabil să utilizeze [Web3.py](https://web3py.readthedocs.io/). Web3.py este o bibliotecă ce simplifică mult felul în care vă conectați la un nod Ethereum, după care trimiteți și primiți date de la acesta.

<div class="featured">Observaţie: noţiunile de „nod Ethereum” și „client Ethereum” sunt utilizate ca sinonime. În ambele cazuri, se referă la software-ul rulat de un participant la rețeaua Ethereum. Acest software poate să citească datele blocurilor, să primească actualizări când se adaugă noi blocuri în lanț („minate”), să transmită noi tranzacții și multe altele.</div>

[Clienții Ethereum](/developers/docs/nodes-and-clients/) pot fi configurați pentru a fi accesați prin [IPC](https://en.wikipedia.org/wiki/Inter-process_communication), HTTP sau Websockets, astfel încât Web3.py va trebui să reflecte aceste configurații. Web3.py se referă la aceste opțiuni de conectare ca **furnizori (providers)**. Va trebui să alegeți unul dintre cei trei furnizori pentru a conecta instanța Web3.py la nodul dvs.

![O diagramă care arată cum foloseşte web3.py IPC-ul pentru a vă conecta aplicația la un nod Ethereum](./web3py-and-nodes.png)

_Configurați nodul Ethereum și Web3.py pentru a comunica prin același protocol, de exemplu, IPC în această diagramă._

Odată ce Web3.py este configurat corespunzător, puteți începe să interacționați cu blockchain-ul. Iată câteva exemple de utilizare a Web3.py ca o previzualizare a ceea ce va urma:

```python
# read block data:
w3.eth.getBlock('latest')

# send a transaction:
w3.eth.sendTransaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalare {#installation}

În această prezentare vom lucra doar în cadrul unui interpretator Python. Nu vom crea niciun dosar, fișier, nici clase sau funcții.

<div class="featured">Observaţie: În exemplele de mai jos, comenzile care încep cu „$” sunt destinate a fi rulate în terminal. (Nu tastați „$”, acesta semnifică doar începutul liniei.)</div>

Mai întâi instalați [IPython](https://ipython.org/) pentru a explora într-un mediu ușor de utilizat. IPython oferă, printre alte funcţionalităţi, completarea filei, ceea ce face mult mai ușor de văzut ce este posibil în Web3.py.

```bash
$ pip install ipython
```

Web3.py este publicat sub numele de `web3`. Se instalează în felul următor:

```bash
$ pip install web3
```

Încă un lucru – mai târziu vom simula un blockchain, ceea ce necesită alte câteva dependențe. Le puteți instala prin comanda:

```bash
$ pip install 'web3[tester]'
```

Sunteți gata să începeţi!

## Deschideți un sandbox {#spin-up-a-sandbox}

Deschideți un mediu Python nou rulând `ipython` în terminalul dvs. Este similar cu a rula `python`, dar oferă funcţionalităţi mai speciale.

```bash
$ ipython
```

Aceasta va afișa câteva informații despre versiunile de Python și IPython pe care le rulați, apoi ar trebui să vedeți un prompt care așteaptă introducere de date:

```python
In [1]:
```

Acum vedeți un shell Python interactiv. Practic, este un sandbox în care puteți juca. Dacă ați ajuns până aici, este timpul să importați Web.py:

```python
In [1]: from web3 import Web3
```

## Prezentarea modulului Web3 {#introducing-the-web3-module}

Pe lângă faptul că este un portal de acces la Ethereum, modulul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) oferă câteva funcții practice. Să explorăm câteva dintre acestea.

Într-o aplicație Ethereum va trebui în mod normal să convertiți denominațiile monetare. Modulul Web3 oferă câteva metode ajutătoare exact pentru acest lucru: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) și [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Observaţie: Computerele sunt extraordinar de slabe la manipularea zecimalelor în matematică. Pentru a rezolva această problemă, dezvoltatorii stochează adesea sumele de dolari în cenți. De exemplu, un articol cu un preț de 5,99 dolari poate fi stocat în baza de date ca fiind 599.

Un model similar este utilizat la gestionarea tranzacțiilor în <b>ether</b>. Numai că, în loc de două zecimale, ether-ul are 18! Cea mai mică denominație de ether se numește <b>wei</b>, prin urmare aceasta este valoarea specificată la trimiterea tranzacțiilor.

1 ether = 100000000000000000000000000 wei

1 wei = 0.00000000000000000000000001 ether

</div>

Încercați să convertiți câteva valori în și din wei. Rețineți că [există și alte denumiri pentru numeroasele denominații](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) între ether și wei. Una din cele mai cunoscute dintre ele este **gwei**, deoarece este adesea modalitatea de reprezentare a taxelor de tranzacție.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Alte metode utilitare din modulul Web3 cuprind convertoare de formate de date (de exemplu, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), ajutoare de adrese (de exemplu, [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) și funcții hash (de exemplu, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Multe dintre acestea vor fi abordate mai târziu în această serie. Pentru a vizualiza toate metodele și proprietățile disponibile, utilizați autocompletarea IPython, tastând `Web3`. și apăsând tasta „Tab” de două ori după punct.

## Comunicaţi cu lanțul {#talk-to-the-chain}

Metodele practice sunt excelente, dar haideți să trecem la blockchain. Pasul următor este configurarea Web3.py pentru a comunica cu un nod Ethereum. Aici avem opțiunea de a folosi furnizorii IPC, HTTP sau Websocket.

Nu vom merge pe această cale, dar un exemplu de flux de lucru complet folosind furnizorul HTTP ar putea arăta cam așa:

- Descărcați un nod Ethereum, de exemplu, [Geth](https://geth.ethereum.org/).
- Porniți Geth într-o fereastră de terminal și așteptați ca acesta să sincronizeze rețeaua. Portul HTTP implicit este `8545`, dar este configurabil.
- Spuneți-i modulului Web3.py să se conecteze la nod prin HTTP, pe `localhost:8545`. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Utilizați instanța `w3` pentru a interacționa cu nodul.

Deși acesta este un mod „real” de a o face, procesul de sincronizare durează ore întregi și nu este necesar dacă doriți doar un mediu de dezvoltare. Web3.py afișează un al patrulea furnizor în acest scop, **EthereumTesterProvider**. Acest furnizor de testare face legătura cu un nod Ethereum simulat, cu permisiuni relaxate și monedă falsă cu care puteţi testa.

![O diagramă care ilustrează EthereumTesterProvider, ce leagă aplicația web3.py de un nod Ethereum simulat](./ethereumtesterprovider.png)

_EthereumTesterProvider se conectează la un nod simulat și este la îndemână pentru mediile de dezvoltare rapidă._

Acel nod simulat se numește [eth-tester](https://github.com/ethereum/eth-tester) și l-am instalat în cadrul comenzii `pip install web3[tester]`. Configurarea Web3.py pentru a utiliza acest furnizor tester este foarte simplă:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Acum sunteți gata pentru a naviga în lanț! Unii oameni spun că acest lucru nu există. Este invenţia mea. Haideți să facem un tur rapid.

## Turul rapid {#the-quick-tour}

Să începem cu începutul, o verificare a sănătății:

```python
In [5]: w3.isConnected()
Out[5]: True
```

Din moment ce folosim furnizorul de testare, acesta nu este un test foarte valoros, dar dacă eșuează, este posibil să fi tastat ceva greșit la instanțierea variabilei `w3`. Verificați încă o dată dacă ați inclus parantezele interioare, adică `Web3.EthereumTesterProvider()`.

## Oprirea nr. 1: [conturi](/developers/docs/accounts/) {#tour-stop-1-accounts}

Pentru comoditate, furnizorul de testare a creat câteva conturi și le-a preîncărcat cu ether de testare.

În primul rând, să vedem o listă a acestor conturi:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Dacă executați această comandă, ar trebui să vedeți o listă de zece șiruri care încep cu `0x`. Fiecare este o **adresă publică** și este oarecum analogă cu numărul de cont al unui cont de verificare. Ați furniza această adresă cuiva care ar dori să vă trimită ether.

Așa cum am menționat, furnizorul de testare a preîncărcat fiecare dintre aceste conturi cu niște ether de test. Să aflăm cât avem în primul cont:

```python
In [7]: w3.eth.getBalance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Asta înseamnă o mulțime de zerouri! Înainte de a vă bucura că aveți o tonă de bani, amintiți-vă de lecția dinainte despre denominaţiile monetare. Valorile etherului sunt reprezentate în cea mai mică denominaţie, wei. Convertiți-o în ether:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un milion de ether de test – totuși nu este chiar atât de rău.

## Oprirea nr. 2: datele blocului {#tour-stop-2-block-data}

Haideți să aruncăm o privire la starea acestui blockchain simulat:

```python
In [9]: w3.eth.getBlock('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Răspunsul cuprinde o mulţime de informaţii despre bloc, dar sunt numai câteva lucruri de subliniat aici:

- Numărul blocului este zero - indiferent cu cât timp în urmă ați configurat furnizorul de testare. Spre deosebire de rețeaua Ethereum reală, care minează un bloc nou aproximativ la fiecare 15 secunde, această simulare va aștepta până când îi veți da ceva de lucru.
- `tranzactii` este o listă goală, din același motiv: nu am făcut încă nimic. Acest prim bloc este un **bloc gol**, doar pentru a demara lanțul.
- Observați că `parentHash` este doar un grup de octeți goi. Acest lucru înseamnă că este primul bloc din lanț, cunoscut și sub numele de **blocul de geneză**.

## Oprirea nr. 3: [tranzacții](/developers/docs/transactions/) {#tour-stop-3-transactions}

Suntem blocați la blocul zero până când va exista o tranzacție de minat, așa că haideţi să-i dăm una. Trimiteți câțiva ether de test de la un cont la altul:

```python
In [10]: tx_hash = w3.eth.sendTransaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether')
})
```

Acesta este de obicei punctul în care așteptați câteva secunde pentru ca tranzacția dvs. să fie minată într-un bloc nou. Procesul complet se desfășoară cam așa:

1. Trimiteți o tranzacție și păstrați hash-ul tranzacției. Până când este minată, tranzacția este „în așteptare.” `tx_hash = w3.eth.sendTransaction({ … })`
2. Așteptați ca tranzacția să fie minată: `w3.eth.waitForTransactionReceipt(tx_hash)`
3. Continuați logica aplicației. Pentru a vizualiza tranzacția reușită: `w3.eth.getTransaction(tx_hash)`

Mediul nostru simulat va adăuga instantaneu tranzacția într-un bloc nou, astfel încât să putem vizualiza imediat tranzacția:

```python
In [11]: w3.eth.getTransaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Veți vedea câteva detalii familiare aici: câmpurile `de la`, `la` și `valoare` ar trebui să corespundă cu datele introduse din apelul nostru `sendTransaction`. Celălalt aspect încurajator este că această tranzacție a fost inclusă ca primă tranzacție (`'transactionIndex': 0`) în cadrul blocului numărul 1.

De asemenea, putem să vedem cu ușurință dacă tranzacţia a reuşit verificând soldurile celor două conturi implicate. Trei ether trebuie că s-au mutat de la unul la altul.

```python
In [12]: w3.eth.getBalance(w3.eth.accounts[0])
Out[12]: 999996999999999999979000

In [13]: w3.eth.getBalance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Acesta din urmă arată bine! Soldul a trecut de la 1.000.000 la 1.000.003 ether. Dar ce s-a întâmplat cu primul cont? Se pare că a pierdut ceva mai mult de trei ether. Din nefericire, nimic nu este gratuit în viaţă, iar utilizarea rețelei publice Ethereum necesită să vă recompensați colegii pentru rolul lor de sprijin. A fost dedusă o mică taxă de tranzacție de 21000 de wei din contul care a efectuat tranzacția.

<div class="featured">Observaţie: În rețeaua publică, taxele de tranzacție sunt variabile în funcție de cererea rețelei și de rapiditatea cu care doriți ca o tranzacție să fie procesată. Dacă vă interesează o defalcare a modului în care sunt calculate taxele, consultați postarea mea anterioară despre <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cum sunt incluse tranzacțiile într-un bloc</a>.</div>

## Și respirați {#and-breathe}

Ne-am ocupat de aceste lucruri de ceva vreme, așa că acum este un moment la fel de bun ca oricare altul pentru a lua o pauză. Aventura continuă şi ne vom continua explorarea în partea a doua a acestei serii. Câteva concepte care vor urma: conectarea la un nod real, contracte inteligente și tokenuri. Aveți întrebări în continuare? Anunțați-mă! Feedback-ul dvs. va influența direcția în care vom merge de aici încolo. Primim cu plăcere solicitări prin [Twitter](https://twitter.com/wolovim).
