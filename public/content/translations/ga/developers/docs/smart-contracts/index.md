---
title: Cur i láthair maidir le conarthaí cliste
description: Forbhreathnú ar chonarthaí cliste, ag díriú ar a saintréithe agus a dteorainneacha uathúla.
lang: ga
---

## Cad is conradh cliste ann? {#what-is-a-smart-contract}

Is ionann "conradh cliste" agus clár a ritheann ar blocshlabhra Ethereum. Is bailiúchán de chód (a fheidhmeanna) agus sonraí (a staid) atá lonnaithe ag seoladh ar leith ar an blocshlabhra Ethereum.

Is cineál [cuntais Ethereum](/developers/docs/accounts/) iad conarthaí cliste. Ciallaíonn sé seo go bhfuil iarmhéid acu agus gur féidir iad a úsáid mar sprioc -idirbheart. Níl siad á rialú ag úsáideoir, áfach, ina ionad sin déantar iad a imscaradh chuig an líonra agus a rith mar atá cláraithe. Is féidir le cuntais úsáideora idirghníomhú ansin le conradh cliste trí idirbhearta a chur isteach a fhorghníomhaíonn feidhm atá sainithe ar an gconradh cliste. Is féidir le conarthaí cliste rialacha a shainiú, amhail conradh rialta, agus iad a fhorfheidhmiú go huathoibríoch tríd an gcód. Ní féidir conarthaí cliste a scriosadh de réir réamhshocraithe, agus tá idirghníomhaíochtaí leo do-aisiompaithe.

## Réamhriachtanais {#prerequisites}

Má tá tú díreach ag tosú amach nó ag lorg réamhrá nach bhfuil chomh teicniúil, molaimid ár [réamhrá ar chonarthaí cliste](/smart-contracts/).

Bí cinnte go mbíonn staidéar déanta agat ar [cuntais](/developers/docs/accounts/), [idirbhearta](/developers/docs/transactions/) agus na [meaisín fíorúil Ethereum](/developers/docs/evm/) roimh léim isteach i saol na gconarthaí cliste.

## Meaisín díola digiteach {#a-digital-vending-machine}

B’fhéidir gurb é an meafar is fearr le haghaidh conradh cliste ná meaisín díola, mar a thuairiscíonn [Nick Szabo](https://unenumerated.blogspot.com/). Leis na hionchuir chearta, ráthaítear aschur áirithe.

Sneaiceanna a fháil ó mheaisín díola:

```
money + snack selection = snack dispensed
```

Tá an loighic seo ríomhchláraithe isteach sa mheaisín díola.

Tá loighic ríomhchláraithe isteach i gconradh cliste, cosúil le meaisín díola. Seo sampla simplí den chuma a bheadh ​​ar an meaisín díola seo dá mba chonradh cliste é a scríobhadh i Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Mar a chuireann meaisín díola deireadh leis an ngá atá le fostaí díoltóra, is féidir le conarthaí cliste áit idirghabhálaithe a ghlacadh i go leor tionscail.

## Gan chead {#permissionless}

Is féidir le duine ar bith conradh cliste a scríobh agus é a imscaradh chuig an líonra. Ní gá duit ach foghlaim conas códú i [dteanga conartha chliste](/developers/docs/smart-contracts/languages/), agus go leor ETH a bheith agat chun do chonradh a imscaradh. Is idirbheart teicniúil é conradh cliste a imscaradh, mar sin ní mór duit [gas](/developers/docs/gas/) a íoc ar an mbealach céanna is gá duit gás a íoc as aistriú simplí ETH. Mar sin féin, tá costais gháis le haghaidh imscaradh conartha i bhfad níos airde.

Tá teangacha atá áisiúil don fhorbróir ag Ethereum chun conarthaí cliste a scríobh:

- Solidity
- Vyper

[Tuilleadh faoi theangacha](/developers/docs/smart-contracts/languages/)

Mar sin féin, ní mór iad a thiomsú sular féidir iad a imscaradh ionas gur féidir le meaisín fíorúil Ethereum an conradh a léirmhíniú agus a stóráil. [Tuilleadh faoin tiomsú](/developers/docs/smart-contracts/compiling/)

## In-chumthacht {#composability}

Tá conarthaí cliste poiblí ar Ethereum agus is féidir smaoineamh orthu mar API oscailte. Ciallaíonn sé seo gur féidir leat conarthaí cliste eile a ghlaoch i do chonradh cliste féin chun an méid atá indéanta a leathnú go mór. Is féidir le conarthaí fiú conarthaí eile a imscaradh.

Foghlaim tuilleadh faoi [inchumthacht conartha cliste](/developers/docs/smart-contracts/composability/).

## Teorainneacha {#limitations}

Ní féidir le conarthaí cliste leo féin faisnéis a fháil faoi imeachtaí “dáiríre” toisc nach féidir leo sonraí a aisghabháil ó fhoinsí seachshlabhra. Ciallaíonn sé seo nach féidir leo freagairt d'imeachtaí sa saol fíor. Is d'aon ghnó atá sé seo amhlaidh. D’fhéadfaí comhdhearcadh a chur i mbaol, rud atá tábhachtach don tslándáil agus don dílárú, trí bheith ag brath ar fhaisnéis sheachtrach.

Mar sin féin, tá sé tábhachtach go mbeadh feidhmchláir bhlocshlabhra in ann sonraí as slabhra a úsáid. Is é an réiteach ná [oracail](/developers/docs/oracles/), uirlisí a ionchorpraíonn sonraí as slabhra agus a chuireann ar fáil do chonarthaí cliste iad.

Teorainn eile ar chonarthaí cliste ná uasmhéid an chonartha. Is féidir le conradh cliste a bheith d'uasmhéid 24KB nó rithfidh sé as gás. Is féidir dul timpeall air seo trí úsáid a bhaint as [An Patrún Diamond](https://eips.ethereum.org/EIPS/eip-2535).

## Conarthaí multisig {#multisig}

Is éard atá i gconarthaí multisig (sínithe iolracha) cuntais chonarthaí cliste a éilíonn sínithe bailí iolracha chun idirbheart a dhéanamh. Tá sé seo an-úsáideach chun pointí aonair teipe a sheachaint i gcás conarthaí a bhfuil méideanna suntasacha éitear nó comharthaí eile acu. Roinneann Multisigs freisin an fhreagracht as forghníomhú conartha agus an phríomhbhainistíocht idir ilpháirtithe agus cuireann siad cosc ​​ar chailliúint eochair phríobháideach aonair as a dtiocfaidh caillteanas do-aisiompaithe cistí. Ar na cúiseanna sin, is féidir conarthaí multisig a úsáid le haghaidh rialachas simplí DAO. Éilíonn multisigs N sínithe as M sínithe inghlactha féideartha (nuair a bhíonn N ≤ M, agus M > 1) chun é a rith. Úsáidtear `N = 3, M = 5` agus `N = 4, M = 7` go coitianta. Éilíonn multisig 4/7 ceithre as seacht síniú bailí féideartha. Ciallaíonn sé seo go bhfuil na cistí fós in-aisghabhála fiú má chailltear trí shíniú. Sa chás seo, ciallaíonn sé freisin go gcaithfidh formhór na sealbhóirí eochracha aontú agus síniú chun an conradh a fhorghníomhú.

## Acmhainní conartha cliste {#smart-contract-resources}

**Conarthaí OpenZeppelin -** **_Leabharlann le haghaidh forbairt conartha cliste slán._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Fóram Pobail](https://forum.openzeppelin.com/c/general/16)

## Tuilleadh léitheoireachta {#further-reading}

- [Coinbase: Cad is conradh cliste ann?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Cad is conradh cliste ann?](https://chain.link/education/smart-contracts)
- [Físeán: Mínithe Go Simplí - Conarthaí Cliste](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: ardán foghlama agus iniúchta Web3](https://updraft.cyfrin.io)
