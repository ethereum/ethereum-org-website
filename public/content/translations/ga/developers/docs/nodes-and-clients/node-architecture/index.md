---
title: Ailtireacht nód
description: Réamhrá ar an gcaoi a n-eagraítear nóid Ethereum.
lang: ga
---

Tá nód Ethereum comhdhéanta de dhá chliant: [cliant reatha](/developers/docs/nodes-and-clients/#execution-clients) agus [cliant comhdhearcaidh](/developers/docs/nodes-and-clients/#consensus-clients). Ionas cur féidir le nód bloc nua a mholadh, ní mór dó [cliant bailíochtóra](#validators) a rith freisin.

Nuair a bhí [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/) in úsáid ag Ethereum, ba leor cliant reatha chun nód iomlán Ethereum a rith. Ó cuireadh [cruthúnas-gill](/developers/docs/consensus-mechanisms/pow/) i bhfeidhm, áfach, ní mór an cliant reatha a úsáid taobh le píosa eile bogearraí ar a dtugtar [cliant comhdhearcaidh](/developers/docs/nodes-and-clients/#consensus-clients).

Taispeánann an léaráid thíos an gaol idir an dá chliaint Ethereum. Nascann an dá chliaint lena líonraí piara-le-piara (P2P) faoi seach. Tá gá le líonraí P2P ar leithligh mar go ndéanann na cliaint reatha idirbhearta béadáin thar a líonra P2P, a chuireann ar a gcumas a linn idirbheart áitiúil a bhainistiú, fad a bhíonn na cliaint chomhdhearcaidh i mbun béadán bloc thar a líonra P2P, rud a chumasaíonn comhdhearcadh agus fás slabhra.

![](node-architecture-text-background.png)

_Tá go leor roghanna ann don chliant reatha lena n-áirítear Erigon, Nethermind, agus Besu_.

Le go n-oibreoidh an struchtúr dhá chliant seo, ní mór do chliaint chomhdhearcaidh beartáin idirbheart a chur ar aghaidh chuig an gcliant reatha. Déanann an cliant reatha na hidirbhearta go háitiúil chun a bhailíochtú nach sáraíonn na hidirbhearta aon rialacha Ethereum agus go bhfuil an nuashonrú atá beartaithe ar staid Ethereum ceart. Nuair a roghnaítear nód le bheith ina tháirgeoir bloc iarrann a chliant comhdhearcaidh cuacha idirbheart ón gcliant reatha lena n-áireamh sa bhloc nua agus iad a rith chun an staid dhomhanda a nuashonrú. Tiomáineann an cliant comhdhearcaidh an cliant reatha trí nasc RPC áitiúil le [hInneall API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Cad a dhéanann an cliant reatha? {#execution-client}

Tá an cliant reatha freagrach as bailíochtú, láimhseáil, agus béadán idirbheart, chomh maith le bainistíocht staide agus tacú le Meaisín Fíorúil Ethereum ([EVM](/developers/docs/evm/)). **Níl** sé freagrach as bloc-thógáil, as béadán bloc nó as láimhseáil loighic chomhdhearcaidh. Tá siad seo faoi shainchúram an chliaint chomhdhearcaidh.

Cruthaíonn an cliant reatha ualaí reatha - liosta na n-idirbheart, staid trie nuashonraithe, agus sonraí eile a bhaineann le rith. Áiríonn cliaint chomhdhearcaidh an t-ualach reatha i ngach bloc. Tá an cliant reatha freagrach freisin as idirbhearta a athrith i mbloic nua chun a chinntiú go bhfuil siad bailí. Ritear idirbhearta ar ríomhaire leabaithe an chliaint reatha, ar a dtugtar an [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm).

Cuireann an cliant reatha comhéadan úsáideora ar fáil do Ethereum freisin trí [modhanna RPC](/developers/docs/apis/json-rpc) a chuireann ar chumas úsáideoirí fiosrú a dhéanamh ar blocshlabhra Ethereum, idirbhearta a chur isteach agus conarthaí cliste a imscaradh. Is gnách go láimhseálann leabharlann mar [Web3js](https://docs.web3js.org/) glaonna RPC, [Web3py](https://web3py.readthedocs.io/en/v5/), nó trí chomhéadan úsáideora cosúil le sparán brabhsálaí.

Go hachomair, is ionann an cliant reatha agus:

- geata úsáideora go Ethereum
- baile an Meaisín Fíorúil Ethereum, comhthiomsú staide agus idirbhearta Ethereum.

## Cad a dhéanann an cliant comhdhearcaidh? {#consensus-client}

Déileálann an cliant comhdhearcaidh leis an loighic go léir a chuireann ar chumas nód fanacht i sioncrónú le líonra Ethereum. Áirítear leis seo bloic a fháil ó phiara agus algartam rogha forc a reáchtáil chun a chinntiú go leanann an nód an slabhra leis an gcarnadh is mó fianuithe i gcónaí (ualaithe ag iarmhéideanna éifeachtacha an bhailíochtóra). Cosúil leis an gcliant reatha, tá a líonra P2P féin ag cliaint chomhdhearcaidh trína roinneann siad bloic agus fianuithe.

Ní ghlacann an cliant comhdhearcaidh páirt i bhfianú nó i moladh bloic - déanann bailíochtóir é seo, breiseán roghnach do chliant comhdhearcaidh. Ní choinníonn cliant comhdhearcaidh gan bhailíochtóir ach suas le ceann an tslabhra, rud a ligeann don nód fanacht sioncrónaithe. Cuireann sé seo ar chumas úsáideora idirbhearta a dhéanamh le Ethereum ag baint úsáide as a gcliant reatha, muiníneach go bhfuil siad ar an slabhra ceart.

## Bailitheoirí {#validators}

Má dhéantar na bogearraí bailíochtóra a chruachadh agus a rith, beidh nód incháilithe le bheith roghnaithe chun bloc nua a mholadh. Is féidir le hoibreoirí nód bailíochtóir a chur lena gcliaint chomhdhearcaidh trí 32 ETH a thaisceadh sa chonradh taisce. Tagann an cliant bailíochtóra cuachta leis an gcliant comhdhearcaidh agus is féidir é a chur le nód ag am ar bith. Láimhseálann an bailíochtóir fianuithe agus blocthograí. Ligeann sé do nóid luaíochtaí a thuilleamh nó ETH a chailleadh trí phionóis nó slaiseáil.

[Tuilleadh faoi gheallchur](/staking/).

## Comhpháirteanna comparáide nód {#node-comparison}

| Cliant Reatha                                       | Cliant Comhdhearcaidh                                                                                                                                                    | Bailíochtóir                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| Idirbhearta béadáin thar a líonra P2P               | Bloic bhéadáin agus fianuithe thar a líonra P2P                                                                                                                          | Molann bloic                      |
| Déanann/athrithean idirbhearta                      | Ritheann an algartam rogha forc                                                                                                                                          | Fabhraíonn luach saothair/pionóis |
| Fíoraíonn sé athruithe staide isteach               | Coinníonn súil ar cheann an slabhra                                                                                                                                      | Déanann fianuithe                 |
| Bainistíonn trialacha staide agus fáltais           | Bainistíonn an staid Rabhcáin (tá faisnéis chomhdhearcaidh agus reatha ann)                                                                                              | Éilíonn 32 ETH a chur i ngeall    |
| Cruthaíonn pálasta reatha                           | Coinníonn sé súil ar randamacht charntha i RANDAO (algartam a sholáthraíonn randamacht infhíoraithe le haghaidh roghnú bailíochtóra agus oibríochtaí comhaontaithe eile) | Is féidir é a shaiseáil           |
| Nochtann JSON-RPC API chun idirghníomhú le Ethereum | Coinníonn sé rian ar fhírinniú agus ar thabhairt chun críche                                                                                                             |                                   |

## Tuilleadh léitheoireachta {#further-reading}

- [Cruthúnas-de-geall](/developers/docs/consensus-mechanisms/pos)
- [Togra blocála](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Luaíochtaí agus pionóis an bhailíochtóra](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
