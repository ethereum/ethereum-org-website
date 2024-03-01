---
title: Cum să implementăm o piață ERC-721
description: Cum să pui articole tokenizate de vânzare pe un panou publicitar descentralizat
author: "Alberto Cuesta Cañada"
tags:
  - "contracte inteligente"
  - "erc-721"
  - "solidity"
  - "tokenuri"
skill: intermediate
lang: ro
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

În acest articol, am de gând să-ți arăt cum să creezi un cod Craigslist pentru blockchain-ul Ethereum.

Înainte de Gumtree, Ebay și Craigslist, tablourile publicitare erau în cea mai mare parte din plută sau hârtie. Erau pe coridoarele școlii, în ziare, pe stâlpii de lumini de pe stradă, în vitrine.

Totul s-a schimbat odată cu internetul. Numărul de persoane care ar putea vedea un anumit tablou publicitar s-a înmulțit cu mai multe ordine de mărime. Din acest motiv, piețele pe care le reprezintă au devenit mult mai eficiente și scalate la dimensiunea globală. Ebay este o afacere masivă, care își are originile în aceste panouri publicitare fizice.

Cu blockchain-ul, aceste piețe sunt configurate să se schimbe încă o dată, permite-mi să-ți arăt.

## Monetizare {#monetization}

Modelul de afaceri al unui panou publicitar public blockchain va trebui să fie diferit de cel al Ebay și companie.

În primul rând, există [unghiul de descentralizare](/developers/docs/web2-vs-web3/). Platformele existente trebuie să-și mențină propriile servere. O platformă descentralizată este menținută de utilizatorii săi, de aceea costul de funcționare al platformei de bază scade la zero pentru proprietarul platformei.

Apoi, există front-end-ul, site-ul sau interfața web care oferă acces la platforma. Aici există mai multe opțiuni. Proprietarii platformei pot restricționa accesul și pot forța ca toată lumea să-i folosească interfața, percepându-le o taxă. Proprietarii platformei pot decide, de asemenea, să deschidă accesul (Puterea în mâinile poporului!) și să lase pe oricine să construiască interfețe cu platforma. (3) Sau proprietarii ar putea decide orice abordare între aceste extreme.

_Liderii de afaceri cu mai multă viziune decât mine știu cum să monetizeze acest lucru. Tot ce văd este că acest lucru este diferit de condițiile existente și, probabil, profitabile._

În plus, există unghiul de automatizare și plăți. Unele lucruri pot fi foarte [eficient tokenizate](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) și tranzacționate într-un panou publicitar. Activele tokenizate sunt ușor de transferat într-un blockchain. Metode de plată extrem de complexe pot fi implementate cu ușurință într-un blockchain.

Simt o oportunitate de afaceri aici. Un panou publicitar fără costuri de funcționare poate fi implementat cu ușurință, cu căi de plată complexe incluse în fiecare tranzacție. Sunt sigur că cineva o să vină cu o idee despre cum să folosească acest lucru.

Sunt doar fericit să-l construiesc. Să aruncăm o privire la cod.

## Implementarea {#implementation}

Cu câtva timp în urmă am început un [depozit open source](https://github.com/HQ20/contracts?ref=hackernoon.com) cu implementări de exemple de afaceri și alte bunătăți, te rog să arunci o privire.

Codul pentru acest [panou publicitar Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) este acolo, te rog să-l utilizezi și să-l abuzezi. Reține doar că acest cod nu a fost auditat și că este nevoie să-ți iei propriile măsuri de precauție înainte de a investi bani în el.

Elementele de bază ale panoului nu sunt complexe. Toate anunțurile din panou vor fi doar o structură cu câteva câmpuri:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Să presupunem că cineva a postat un anunț. Un articol de vânzare. Un preț pentru articol. Starea tranzacției care poate fi deschisă, executată sau anulată.

Toate aceste tranzacții vor fi păstrate într-o cartografiere. Pentru că totul în Solidity pare a fi o cartografiere. De asemenea, pentru că este convenabil.

```solidity
mapping(uint256 => Trade) public trades;
```

Utilizarea unei cartografii înseamnă doar că trebuie să venim cu un id pentru fiecare reclamă înainte de a o posta și va trebui să cunoaștem id-ul unei reclame înainte de a o putea opera. Acest lucru se poate face în câteva feluri, fie în contractul inteligent, fie în front-end. Te rog să întrebi dacă ai nevoie de unele indicii.

Apoi urmează întrebarea, care sunt acele elemente cu care avem de-a face și care este această monedă care este folosită pentru a plăti tranzacția.

Pentru articole, vom cere doar ca acestea să implementeze interfața [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), care este de fapt doar o modalitate de a reprezenta elemente din lumea reală într-un blockchain, deși [funcționează cel mai bine cu active digitale](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vom specifica propriul nostru contract ERC721 în constructor, ceea ce înseamnă că orice active din panoul nostru publicitar trebuie să fi fost tokenizate în prealabil.

Pentru plăți, vom face ceva similar. Majoritatea proiectelor blockchain își definesc propria criptomonedă [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Alții preferă să folosească una convențională cum ar fi DAI. În acest panou publicitar, va trebui doar să decizi la construire ce moneda vei folosi. Ușor.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ajungem acolo. Avem reclame, articole pentru tranzacție și o monedă pentru plăți. A face un anunț înseamnă a pune un articol în garanție pentru a arăta atât că îl ai, cât și că nu l-ai postat de două ori, eventual într-un alt panou.

Codul de mai jos face exact asta. Pune articolul în garanție, creează anunțul, face puțin menaj.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Acceptarea tranzacției înseamnă alegerea un anunț (tranzacție), plata prețului, și primirea articolului. Codul de mai jos recuperează un articol cumpărat. Verifică dacă e disponibil. Plătește articolul. Recuperează articolul cumpărat. Actualizează reclama.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

În cele din urmă, avem o opțiune pentru vânzători să se retragă din comerț înainte ca un cumpărător să accepte. În unele modele, reclamele ar fi în schimb live pentru o perioadă înainte de expirarea lor. Alegerea ta, depinde de designul pieței tale.

Codul este foarte similar cu cel folosit pentru a executa un comerț, numai că nu există niciun transfer de monedă dintr-o mână într-alta iar articolul merge înapoi la cel care l-a postat.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Asta-i tot. Ai ajuns la sfârșitul implementării. Este destul de surprinzător cât de compacte pot fi unele concepte de afaceri atunci când sunt exprimate în cod, iar acesta este unul dintre acele cazuri. Check the complete contract [in our repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Concluzie {#conclusion}

Panourile publicitare sunt o configurație de piață obișnuită, care s-a mărit masiv odată cu internetul, devenind un model de afaceri extrem de popular, cu câțiva câștigători monopoliști.

Panourile publicitare, de asemenea, sunt un instrument ușor de replicat într-un mediu blockchain, cu caracteristici foarte specifice care vor face posibilă o provocare pentru giganții existenți.

În acest articol, am încercat să leg realitatea de afaceri a unei companii de anunțuri publicitare cu implementarea tehnologică. Aceste cunoștințe ar trebui să te ajute să-ți creezi o viziune și o foaie de parcurs pentru implementare, dacă ai abilitățile potrivite.

Ca întotdeauna, dacă dorești să construiești ceva distractiv și dorești câteva sfaturi, te rog [să mă contactezi](https://albertocuesta.es/)! Sunt întotdeauna fericit să te ajut.
