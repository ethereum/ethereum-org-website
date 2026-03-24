---
title: Come implementare un mercato ERC-721
description: Come mettere in vendita oggetti tokenizzati su una bacheca di annunci decentralizzata
author: "Alberto Cuesta Cañada"
tags: ["contratti intelligenti", "erc-721", "Solidity", "token"]
skill: intermediate
breadcrumb: Mercato ERC-721
lang: it
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

In questo articolo, ti mostrerò come programmare Craigslist per la blockchain di Ethereum.

Prima di Gumtree, Ebay e Craigslist, le bacheche di annunci erano per lo più fatte di sughero o carta. C'erano bacheche di annunci nei corridoi delle scuole, sui giornali, sui lampioni, nelle vetrine dei negozi.

Tutto questo è cambiato con Internet. Il numero di persone che potevano vedere una specifica bacheca di annunci si è moltiplicato di molti ordini di grandezza. Con ciò, i mercati che rappresentano sono diventati molto più efficienti e sono scalati a dimensioni globali. Ebay è un'azienda enorme che affonda le sue origini in queste bacheche di annunci fisiche.

Con la blockchain questi mercati sono destinati a cambiare ancora una volta, lascia che ti mostri come.

## Monetizzazione {#monetization}

Il modello di business di una bacheca di annunci su una blockchain pubblica dovrà essere diverso da quello di Ebay e compagnia.

Innanzitutto, c'è [l'aspetto della decentralizzazione](/developers/docs/web2-vs-web3/). Le piattaforme esistenti devono mantenere i propri server. Una piattaforma decentralizzata è mantenuta dai suoi utenti, quindi il costo di gestione della piattaforma principale scende a zero per il proprietario della piattaforma.

Poi c'è il front-end, il sito web o l'interfaccia che dà accesso alla piattaforma. Qui ci sono molte opzioni. I proprietari della piattaforma possono limitare l'accesso e costringere tutti a usare la loro interfaccia, addebitando una commissione. I proprietari della piattaforma possono anche decidere di aprire l'accesso (Potere al Popolo!) e lasciare che chiunque costruisca interfacce per la piattaforma. Oppure i proprietari potrebbero decidere per un approccio a metà tra questi estremi.

_I leader aziendali con più visione di me sapranno come monetizzare tutto questo. Tutto ciò che vedo è che questo è diverso dallo status quo e probabilmente redditizio._

Inoltre, c'è l'aspetto dell'automazione e dei pagamenti. Alcune cose possono essere [tokenizzate in modo molto efficace](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e scambiate in una bacheca di annunci. Gli asset tokenizzati sono facilmente trasferibili in una blockchain. Metodi di pagamento altamente complessi possono essere facilmente implementati in una blockchain.

Sento odore di un'opportunità di business qui. Una bacheca di annunci senza costi di gestione può essere facilmente implementata, con percorsi di pagamento complessi inclusi in ogni transazione. Sono sicuro che a qualcuno verrà in mente un'idea su come utilizzarla.

Io sono solo felice di costruirla. Diamo un'occhiata al codice.

## Implementazione {#implementation}

Qualche tempo fa abbiamo avviato un [repository open source](https://github.com/HQ20/contracts?ref=hackernoon.com) con implementazioni di esempi di casi aziendali e altre chicche, dacci un'occhiata.

Il codice per questa [Bacheca di Annunci di Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) è lì, per favore usalo e abusane. Tieni solo presente che il codice non è stato verificato e devi fare la tua due diligence prima di investirci del denaro.

Le basi della bacheca non sono complesse. Tutti gli annunci nella bacheca saranno solo una struct con alcuni campi:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Aperto, Eseguito, Annullato
}
```

Quindi c'è qualcuno che pubblica l'annuncio. Un oggetto in vendita. Un prezzo per l'oggetto. Lo stato dello scambio che può essere aperto, eseguito o annullato.

Tutti questi scambi saranno conservati in una mappatura. Perché tutto in Solidity sembra essere una mappatura. Anche perché è conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

Usare una mappatura significa solo che dobbiamo inventare un ID per ogni annuncio prima di pubblicarlo, e avremo bisogno di conoscere l'ID di un annuncio prima di potervi operare. Ci sono molti modi per affrontare questo problema sia nel contratto intelligente che nel front-end. Chiedi pure se hai bisogno di qualche dritta.

Poi sorge la domanda su quali siano quegli oggetti di cui ci occupiamo, e quale sia questa valuta utilizzata per pagare la transazione.

Per gli oggetti, chiederemo semplicemente che implementino l'interfaccia [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), che in realtà è solo un modo per rappresentare oggetti del mondo reale in una blockchain, sebbene [funzioni meglio con gli asset digitali](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Specificheremo il nostro contratto ERC721 nel costruttore, il che significa che qualsiasi asset nella nostra bacheca di annunci deve essere stato tokenizzato in precedenza.

Per i pagamenti, faremo qualcosa di simile. La maggior parte dei progetti blockchain definisce la propria criptovaluta [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Altri preferiscono usarne una tradizionale come DAI. In questa bacheca di annunci, devi solo decidere al momento della costruzione quale sarà la tua valuta. Facile.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Ci stiamo arrivando. Abbiamo annunci, oggetti da scambiare e una valuta per i pagamenti. Creare un annuncio significa mettere un oggetto in garanzia (escrow) per dimostrare sia che lo possiedi sia che non lo hai pubblicato due volte, possibilmente in una bacheca diversa.

Il codice qui sotto fa esattamente questo. Mette l'oggetto in garanzia, crea l'annuncio, fa un po' di pulizia.

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

Accettare lo scambio significa scegliere un annuncio (scambio), pagare il prezzo, ricevere l'oggetto. Il codice qui sotto recupera uno scambio. Controlla che sia disponibile. Paga l'oggetto. Recupera l'oggetto. Aggiorna l'annuncio.

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

Infine, abbiamo un'opzione per i venditori di ritirarsi da uno scambio prima che un acquirente lo accetti. In alcuni modelli, gli annunci rimarrebbero invece attivi per un periodo di tempo prima di scadere. A te la scelta, a seconda del design del tuo mercato.

Il codice è molto simile a quello utilizzato per eseguire uno scambio, solo che non c'è alcun passaggio di valuta e l'oggetto torna a chi ha pubblicato l'annuncio.

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

Questo è tutto. Sei arrivato alla fine dell'implementazione. È abbastanza sorprendente quanto siano compatti alcuni concetti aziendali quando espressi in codice, e questo è uno di quei casi. Controlla il contratto completo [nel nostro repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusione {#conclusion}

Le bacheche di annunci sono una configurazione di mercato comune che è scalata massicciamente con Internet, diventando un modello di business estremamente popolare con pochi vincitori monopolistici.

Le bacheche di annunci si rivelano anche uno strumento facile da replicare in un ambiente blockchain, con caratteristiche molto specifiche che renderanno possibile una sfida ai giganti esistenti.

In questo articolo, ho fatto un tentativo di collegare la realtà aziendale di un business di bacheche di annunci con l'implementazione tecnologica. Questa conoscenza dovrebbe aiutarti a creare una visione e un piano d'azione per l'implementazione se hai le giuste competenze.

Come sempre, se hai intenzione di costruire qualcosa di divertente e gradiresti qualche consiglio, per favore [scrivimi](https://albertocuesta.es/)! Sono sempre felice di aiutare.