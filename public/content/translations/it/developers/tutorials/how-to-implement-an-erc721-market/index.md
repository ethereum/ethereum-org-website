---
title: Come implementare un market ERC-721
description: Come mettere in vendita oggetti tokenizzati su bacheche di annunci decentralizzate
author: "Alberto Cuesta Cañada"
tags:
  - "smart contract"
  - "erc-721"
  - "Solidity"
  - "token"
skill: intermediate
lang: it
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

In questo articolo, ti mostrerò come sviluppare in Craigslist per la blockchain Ethereum.

Prima di Gumtree, Ebay e Craigstlist, le bacheche di annunci erano più che altro di sughero o carta. C'erano bacheche nei corridoi delle scuole, sui giornali, sui lampioni o sulle vetrine.

Con Internet è cambiato tutto. Il numero di persone che potevano vedere una determinata bacheca di annunci si è moltiplicato a livello esponenziale. Di conseguenza, i mercati che rappresentano sono diventati molto più efficienti e si rivolgono a livello globale. Ebay è un business enorme che ha le sue origini proprio in queste bacheche di annunci fisiche.

Con la blockchain questi mercati sono destinati a cambiare di nuovo, vediamo come.

## Monetizzazione {#monetization}

Il modello di business di una bacheca di annunci su blockchain pubblica sarà diverso da quello di Ebay e simili.

Prima di tutto, c'è la [questione della decentralizzazione](/developers/docs/web2-vs-web3/). Le piattaforme esistenti devono mantenere i loro server. Una piattaforma decentralizzata è gestita dai suoi utenti, quindi il costo per tenere attiva la piattaforma base scende a zero per il proprietario della piattaforma.

Poi c'è il front end, ossia il sito Web o l'interfaccia che dà accesso alla piattaforma. Qua ci sono molte opzioni. Il proprietario della piattaforma può limitare l'accesso e costringere tutti a usare la propria interfaccia, imponendo un costo di utilizzo. I proprietari della piattaforma possono anche decidere di lasciare libero l'accesso (potere al popolo!) e di permettere che chiunque crei interfacce per la piattaforma. Oppure, potrebbero decidere qualsiasi altro tipo di approccio tra questi due estremi.

_Chi si occupa di affari e ha più visione di me saprà come monetizzare tutto questo. Tutto quello che io riesco a capire è che questo è diverso dallo status quo e probabilmente redditizio._

In più, c'è la questione dell'automazione e dei pagamenti. Alcuni articoli si prestano molto ad essere [tokenizzati in modo efficace](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e scambiati in una bacheca di annunci. Le risorse tokenizzate sono facilmente trasferibili su una blockchain. Metodi di pagamento altamente complessi possono essere facilmente implementati su una blockchain.

Sento odore di business. Una bacheca di annunci senza costi di gestione può facilmente essere implementata con complessi percorsi di pagamento inclusi in ogni transazione. Sono sicuro che qualcuno verrà fuori con qualche idea su come utilizzare tutto questo.

Io sono felice di occuparmi della programmazione. Diamo un'occhiata al codice.

## Implementazione {#implementation}

Un po' di tempo fa abbiamo iniziato un [repository open source](https://github.com/HQ20/contracts?ref=hackernoon.com) con implementazioni di esempio e altre cose interessanti, consiglio di dare una sbirciata.

Il codice di questa [bacheca di annunci Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) è qui, potete usarlo e anche abusarne. Occhio solo che non è stato verificato e quindi fate molta attenzione prima di metterci dei soldi.

Le basi della bacheca non sono difficili. Tutti gli annunci della bacheca saranno semplicemente uno struct con pochi campi:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Supponiamo che ci sia qualcuno che pubblica l'annuncio. Un oggetto in vendita. Un prezzo per l'oggetto. Lo stato dello scambio che può essere aperto, chiuso o annullato.

Tutti questi scambi saranno tenuti in un mapping. Perché tutto in Solidity sembra essere un mapping. E anche perché è comodo.

```solidity
mapping(uint256 => Trade) public trades;
```

Usare un mapping significa solo che dobbiamo trovare un ID per ogni annuncio prima di pubblicarlo e che dovremo conoscere l'ID di un annuncio prima di poter lavorare su di esso. Ci sono molti modi per affrontare questo problema sia con gli Smart Contract che nel front end. Chiedi se ti servono delle indicazioni.

La seconda questione è capire quali sono gli elementi con cui lavoriamo e qual è la valuta che deve essere usata per pagare la transazione.

Per gli elementi, chiederemo solo che implementino l'interfaccia [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), che è semplicemente un modo per rappresentare gli oggetti del mondo reale su una blockchain, anche se [funziona meglio con le risorse digitali](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Specificheremo il nostro contratto ERC271 nel costruttore, dicendo che ogni risorsa della nostra bacheca di annunci deve prima essere tokenizzata.

Per i pagamenti, faremo qualcosa di simile. La maggior parte dei progetti di blockchain definisce la propria criptovaluta [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Altri preferiscono usarne una popolare come DAI. In questa bacheca di annunci, dovrai solo decidere al momento della creazione quale sarà la tua valuta. Facile.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ci siamo quasi. Abbiamo annunci, oggetti da scambiare e una valuta per i pagamenti. Creare un annuncio significa mettere un oggetto in deposito per mostrare sia che tu lo possiedi, sia che non lo hai pubblicato due volte, magari in una bacheca diversa.

Il codice qui sotto fa esattamente questo. Mette l'oggetto in deposito, crea l'annuncio e fa un po' di altri lavoretti.

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

Accettare lo scambio significa scegliere un annuncio (scambio), pagare il prezzo, ricevere l'oggetto. Il codice qui sotto recupera uno scambio. Controlla se è disponibile. Paga l'oggetto. Recupera l'oggetto. Aggiorna l'annuncio.

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

Infine abbiamo un'opzione che permette al venditore di uscire da uno scambio prima che l'acquirente lo accetti. In alcuni modelli, invece, gli annunci rimangono online per un determinato periodo di tempo, prima di scadere. La scelta è tua, a seconda di come funziona il tuo marketplace.

Il codice è molto simile a quello usato per eseguire uno scambio, solo che qua non c'è moneta che passa di mano e l'oggetto torna indietro a chi ha pubblicato l'annuncio.

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

Ecco qua. Siamo giunti alla fine dell'implementazione. È sorprendente come alcuni concetti di business siano compatti quando vengono espressi con codice, e questo è uno di questi esempi. Guarda il contratto completo [nel nostro repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusione {#conclusion}

Le bacheche di annunci sono una configurazione di mercato comune che ha preso piede rapidamente con Internet, diventando un modello di business incredibilmente popolare, con alcuni monopoli che si sono accaparrati il segmento di mercato.

Sono anche uno strumento facile da replicare in un ambiente blockchain, con caratteristiche molto specifiche che permetteranno di sfidare i giganti attuali.

In questo articolo ho fatto un tentativo di collegare la realtà delle bacheche di annunci con l'implementazione tecnologica. Queste conoscenze, con le giuste capacità, dovrebbero aiutare a creare una vision e una roadmap per l'implementazione.

Come sempre, se vuoi creare qualcosa di interessante e vorresti qualche consiglio, [scrivimi](https://albertocuesta.es/)! Sono sempre felice di dare una mano.
