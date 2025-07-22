---
title: Meaisín Fíorúil Ethereum (EVM)
description: Réamhrá ar an meaisín fíorúil Ethereum agus conas a bhaineann sé le staid, idirbhearta, agus conarthaí cliste.
lang: ga
---

Is timpeallacht fhíorúil dhíláraithe é Meaisín Fíorúil Ethereum (EVM) a ritheann cód go comhsheasmhach agus go slán ar fud na nóid Ethereum go léir. Ritheann Nóid an EVM chun conarthaí cliste a dhéanamh, ag baint úsáide as "[gas](/developers/docs/gas/)" chun an iarracht ríomhaireachtúil atá ag teastáil le haghaidh [ oibríochtaí](/developers/docs/evm/opcodes/), lena gcinntítear leithdháileadh éifeachtach acmhainní agus slándáil líonra.

## Réamhriachtanais {#prerequisites}

Tá eolas bunúsach ar théarmaíocht choiteann san ríomheolaíocht mar [bearta](https://wikipedia.org/wiki/Byte), [cuimhne](https://wikipedia.org/wiki/computer_memory), agus [cruach](https://wikipedia.org/wiki/Stack_(abstract_data_type)) riachtanach chun an EVM a thuiscint. Bheadh ​​sé ina chuidiú freisin a bheith compordach le coincheapa cripteagrafaíochta/blocshlabhra mar [haisfheidhmeanna](https://wikipedia.org/wiki/Cryptographic_hash_function) agus an [Crann Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Ó mhórleabhar go meaisín staide {#from-ledger-to-state-machine}

Is minic a úsáidtear an t-analach 'mórleabhar dáilte' mar thuairisc ar bhlocshlabhra cosúil le Bitcoin, a chumasaíonn airgeadra díláraithe le huirlisí bunúsacha cripteagrafaíochta. Cothabhálann an mórleabhar taifead gníomhaíochta nach mór dó cloí le sraith rialacha a rialaíonn cad is féidir agus nach féidir le duine a dhéanamh chun an mórleabhar a mhodhnú. Mar shampla, ní féidir le seoladh Bitcoin níos mó Bitcoin a chaitheamh ná mar atá faighte aige roimhe seo. Tá na rialacha seo mar bhonn agus mar thaca ag gach idirbheart ar Bitcoin agus go leor blocshlabhraí eile.

While Ethereum has its own native cryptocurrency (ether) that follows almost exactly the same intuitive rules, it also enables a much more powerful function: [smart contracts](/developers/docs/smart-contracts/). Don ghné níos casta seo, tá analach níos sofaisticiúla ag teastáil. In ionad mórleabhar dáilte, is [meaisín staide](https://wikipedia.org/wiki/Finite-state_machine) dáilte é Ethereum. Is struchtúr mór sonraí é staid Ethereum a choinníonn ní hamháin gach cuntas agus iarmhéid, ach _staid mheaisín_, ar féidir é a athrú ó bhloc go bloc de réir thacar réamhshainithe de rialacha, agus ar féidir leo cód meaisín treallach a rith. Sainmhíníonn an EVM na rialacha sonracha maidir le staid a athrú ó bhloc go bloc.

![Léaráid a thaispeánann comhdhéanamh an EVM](./evm.png) _Léaráid oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Feidhm aistrithe staide Ethereum {#the-ethereum-state-transition-function}

Feidhmíonn an EVM mar fheidhm mhatamaiticiúil: Nuair a thugtar ionchur dó, táirgeann sé aschur cinntitheach. Is mór an chabhair mar sin cur síos níos foirmiúla a dhéanamh ar Ethereum agus a rá go bhfuil **feidhm aistrithe staid** aige:

```
Y(S, T)= S'
```

Nuair a thugtar seanstaid bhailí `(S)` agus sraith nua idirbheart bailí `(T)`, táirgeann feidhm trasdula staide Ethereum `Y(S, T)` staid aschuir bhailí nua `S'`

### Staid {#state}

I gcomhthéacs Ethereum, is struchtúr ollmhór sonraí é an staid ar a dtugtar [ Trie modhnaithe Merkle Patricia](/developers/docs/data-structures-and-ioncoding/patricia-merkle-trie/), a choimeádann gach [cuntas](/developers/docs/accounts/) nasctha le haiseanna agus atá in-laghdaithe le hais fréimhe amháin atá stóráilte ar an mblocshlabhra.

### Idirbhearta {#transactions}

Is treoracha sínithe go cripteagrafach ó chuntais iad idirbhearta. Tá dhá chineál idirbhirt ann: iad sin a mbíonn glaonna teachtaireachtaí mar thoradh orthu agus iad siúd a chruthaíonn conarthaí.

Cruthaítear cuntas conartha nua mar thoradh ar chruthú conarthaí ina bhfuil [conradh cliste](/developers/docs/smart-contracts/anatomy/) beartchód tiomsaithe. Aon uair a dhéanann cuntas eile glao teachtaireachta chuig an gconradh sin, ritheann sé a bheartchód.

## Treoracha EVM {#evm-instructions}

Feidhmíonn an EVM mar [mheaisín cruachta](https://wikipedia.org/wiki/Stack_machine) le doimhneacht de 1024 mír. Is focal 256-giotán gach mír, a roghnaíodh ar mhaithe le héascaíocht úsáide le cripteagrafaíocht 256-giotán (cosúil le haiseanna eccak-256 nó sínithe secp256k1).

Le linn an reatha, coinníonn an EVM _cuimhne neamhbhuan_ (mar eagar beart focal-seolta), nach seasann idir idirbhearta.

I gconarthaí, áfach, tá _stóráil_ trie Merkle Patricia (mar eagar focal inseolta), a bhaineann leis an gcuntas atá i gceist agus cuid den staid dhomhanda.

Ritear beartchód conartha cliste tiomsaithe mar líon [opcodes](/developers/docs/evm/opcodes) EVM, a dhéanann gnáthoibríochtaí cruachta amhail `XOR`, `AND `, `ADD`, `SUB`, etc. Cuireann an EVM roinnt oibríochtaí cruachta a bhaineann go sonrach le blocshlabhra i bhfeidhm freisin, mar `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc.

![Léaráid a thaispeánann cá bhfuil gás ag teastáil le haghaidh oibríochtaí EVM](../gas/gas.png) _Léaráidí oiriúnaithe ó [Ethereum EVM léirithe](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Feidhmithe EVM {#evm-implementations}

Ní mór do gach feidhmiú den EVM cloí leis an tsonraíocht a thuairiscítear sa Ethereum Yellowpaper.

Thar stair naoi mbliana Ethereum, rinneadh roinnt leasuithe ar an EVM, agus tá roinnt feidhmiúcháin den EVM i dteangacha ríomhchlárúcháin éagsúla.

Áirítear le [cliaint reatha Ethereum](/developers/docs/nodes-and-clients/#execution-clients) feidhmiú EVM. Ina theannta sin, tá iliomad feidhmiúcháin neamhspleácha ann, lena n-áirítear:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Further Reading {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Séimeantaic EVM i K](https://jellopaper.org/)
- [Beigepaper](https://github.com/chronaeon/beigepaper)
- [Cóid oibríochta Meaisín Fíorúil Ethereum](https://www.ethervm.io/)
- [Tagairt Idirghníomhach Cóid Oibríochta Meaisín Fíorúil Ethereum](https://www.evm.codes/)
- [Réamhrá gearr i ndoiciméadú Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Máistreacht Ethereum - An Meaisín Fíorúil Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Ábhair Ghaolmhara {#related-topics}

- [Gás](/developers/docs/gas/)
