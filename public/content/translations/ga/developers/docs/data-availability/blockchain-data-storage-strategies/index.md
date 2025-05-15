---
title: Straitéisí Stórais Sonraí Blocshlabhra
description: Tá roinnt bealaí chun sonraí a stóráil ag baint úsáide as an blocshlabhra. Déanfaidh an t-alt seo comparáid idir na straitéisí éagsúla, a gcostais agus a lochtanna, chomh maith leis na ceanglais chun é a úsáid go sábháilte.
lang: ga
---

Tá go leor bealaí ann chun faisnéis a stóráil go díreach ar an mblocshlabhra, nó ar bhealach atá daingnithe ag an mblocshlabhra:

- EIP-4844 blobaí
- Calldata
- As slabhra le meicníochtaí L1
- Conradh "cód"
- Imeachtaí
- Stóras EVM

Tá rogha an mhodha le húsáid bunaithe ar roinnt critéar:

- Foinse na faisnéise. Ní féidir faisnéis i calldata teacht go díreach ón mblocshlabhra féin.
- Ceann scríbe na faisnéise. Níl calldata ar fáil ach san idirbheart a thionscnaíonn sé. Níl rochtain ar imeachtaí ar slabhra ar chor ar bith.
- Cé mhéad dua atá inghlactha? Is féidir le ríomhairí a ritheann nód lánscála níos mó próiseála ná cliant éadrom a dhéanamh i bhfeidhmchlár a ritheann i mbrabhsálaí.
- An gá rochtain éasca ar an bhfaisnéis ó gach nód a éascú?
- Na ceanglais slándála.

## Na ceanglais slándála {#security-requirements}

Go ginearálta, tá trí thréith i gceist le slándáil faisnéise:

- _Rúndacht_, níl cead ag aonáin neamhúdaraithe an fhaisnéis a léamh. Tá sé seo tábhachtach i go leor cásanna, ach ní anseo. _Níl aon rúin ar an mblocshlabhra_. Oibríonn Blocshlabhraí mar is féidir le duine ar bith na haistrithe staide a fhíorú, agus mar sin tá sé dodhéanta iad a úsáid chun rúin a stóráil go díreach. Tá bealaí ann chun faisnéis rúnda a stóráil ar an blocshlabhra, ach tá siad go léir ag brath ar roinnt comhpháirt as slabhra chun eochair a stóráil ar a laghad.

- _Ionracas_, tá an fhaisnéis ceart, ní féidir le haonáin neamhúdaraithe é a athrú, ná ar bhealaí neamhúdaraithe (mar shampla, [ERC-20 comharthaí](https://eips.ethereum.org/EIPS/eip-20#events) a aistriú gan imeacht `Aistrigh`). Ar an blocshlabhra, déanann gach nód gach athrú staide a fhíorú, rud a chinntíonn sláine.

- _Infhaighteacht_, tá an fhaisnéis ar fáil d'aon aonán údaraithe. Ar an blocshlabhra, déantar é seo de ghnáth tríd an bhfaisnéis a bheith ar fáil ar gach [nód iomlán](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Tá sláine den scoth ag na réitigh éagsúla anseo, toisc go gcuirtear haiseanna ar fáil ar L1. Mar sin féin, tá ráthaíochtaí infhaighteachta éagsúla acu.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh tuiscint mhaith agat ar [bunúsacha blocshlabhra](/developers/docs/intro-to-ethereum/). Glacann an leathanach seo leis freisin go bhfuil an léitheoir eolach ar [bloic](/developers/docs/blocks/), [idirbhearta(]/developers/docs/transactions/), agus ábhair ábhartha eile.

## Blobaí EIP-4844 {#eip-4844-blobs}

Ag tosú le [hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) folaíonn an blocshlabhra Ethereum [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), a chuireann go mór le thart ar bhlobaí sonraí Ethereum (thart ar [18 lá] ar dtús](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Déantar na blobaí seo a phraghsáil ar leithligh ón [gás forghníomhaithe](/developers/docs/gas), cé go n-úsáidtear meicníocht chomhchosúil. Is bealach saor iad chun sonraí sealadacha a phostáil.

Is é an cás úsáide is mó le haghaidh blobaí EIP-4844 ná rolladh chun a n-idirbheart a fhoilsiú. Ní mór do [rolluithe dóchasacha](/developers/docs/scaling/optimistic-rollups) na hidirbhearta a fhoilsiú ar a gcuid blocshlabhraí. Caithfidh na hidirbhearta sin a bheith ar fáil d’aon duine le linn na [tréimhse dhúshláin](https://docs.optimism.io/connect/resources/glossary#challenge-period) chun a chur ar chumas [bailíochtóirí](https://docs.optimism.io/connect/resources/glossary#validator) an botún a shocrú má tá an rolladh suas [seicheamh](https://docs.optimism.io/connect/resources/glossary#sequencer) postáil fréamh staide mícheart.

Mar sin féin, a luaithe a bheidh an tréimhse dúshláin thart agus an fhréamh staide tugtha chun críche, is é an cuspóir atá fágtha chun a bheith eolach ar na hidirbhearta seo ná staid reatha an tslabhra a mhacasamhlú. Tá an staid seo ar fáil freisin ó nóid slabhra, agus tá i bhfad níos lú próiseála ag teastáil. Mar sin ba cheart faisnéis idirbheart a chaomhnú i roinnt áiteanna, mar shampla [taiscéalaithe bloc] (/developers/docs/data-and-analytics/block-explorers), ach ní gá íoc as an leibhéal friotaíochta cinsireachta a sholáthraíonn Ethereum.

Déanann [rollaí nialais eolais](/developers/docs/scaling/zk-rollups/#data-availability) a gcuid sonraí idirbhirt a phostáil freisin chun cur ar chumas nóid eile an staid reatha a mhacasamhlú agus cruthúnais bhailíochta a fhíorú, ach arís is ceanglas gearrthéarmach é sin.

Nuair a scríobhtar postáil ar EIP-4844 cosnaíonn sé wei amháin (10<sup>-18</sup> ETH) in aghaidh an bhirt, rud atá suarach i gcomparáid leis an [an 21,000 gás reatha a chosnaíonn aon idirbheart, lena n-áirítear ceann a phostálann blobaí](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Is féidir leat an praghas reatha EIP-4844 a fheiceáil ar [blobscan.com](https://blobscan.com/blocks).

Seo iad na seoltaí chun na blobaí a fheiceáil arna bpostáil ag roinnt rollaí cáiliúla.

| Rollú suas                         | Seoladh bosca poist                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Dóchas](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)   | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)          | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Glao-shonraí {#calldata}

Tagraíonn Glao-shonraí do na bearta a sheoltar mar chuid den idirbheart. Déantar é a stóráil mar chuid de thaifead buan an blocshlabhra sa bhloc a chuimsíonn an t-idirbheart sin.

Is é seo an modh is saoire chun sonraí a chur go buan sa blocshlabhra. Is é an costas in aghaidh an bhirt ná 4 ghás reatha (más nialas an beart) nó 16 ghás (aon luach eile). Má tá na sonraí comhbhrúite, arb é cleachtas caighdeánach é, ansin tá gach luach beart chomh dóchúil, agus mar sin tá an meánchostas thart ar 15.95 gás in aghaidh an bhirt.

Agus é seo á scríobh, is iad na praghsanna ná 12 gwei/gas agus 2300 $/ETH, rud a chiallaíonn go bhfuil an costas thart ar 45 cent in aghaidh na cileavata. Toisc gurbh é seo an modh is saoire roimh EIP-4844, is é seo an modh rollta a úsáideadh chun faisnéis idirbheart a stóráil, a chaithfidh a bheith ar fáil le haghaidh [dúshláin lochtanna](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ach ní gá go mbeadh rochtain dhíreach orthu ar slabhra.

Seo iad na seoltaí chun na hidirbhearta a phostáil roinnt rolluithe cáiliúla a fheiceáil.

| Rollú suas                         | Seoladh bosca poist                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Dóchas](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)   | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)          | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Lasmuigh den slabhra le meicníochtaí L1 {#offchain-with-l1-mechs}

Ag brath ar do chomhbhabhtáil slándála, d'fhéadfadh sé a bheith inghlactha an fhaisnéis a chur in áit eile agus meicníocht a úsáid a chinntíonn go bhfuil na sonraí ar fáil nuair is gá. Tá dhá riachtanas ann go n-oibreoidh sé seo:

1. Postáil [hais](https://en.wikipedia.org/wiki/Cryptographic_hash_function) de na sonraí ar an blocshlabhra, ar a dtugtar _input commitment_. Is féidir é seo a bheith ina fhocal amháin 32 beart, mar sin níl sé costasach. Chomh fada agus atá an gealltanas ionchuir ar fáil, cinntítear sláine toisc nach bhfuil sé indéanta aon sonraí eile a aimsiú a mbeadh an luach céanna ag baint leis. Mar sin má chuirtear sonraí míchearta ar fáil, is féidir é a bhrath.

2. Bíodh meicníocht agat a chinntíonn infhaighteacht. Mar shampla, in [Redstone](https://redstone.xyz/docs/what-is-redstone) is féidir le nód ar bith dúshlán infhaighteachta a chur isteach. Mura bhfreagraíonn an seicheamhóir ar slabhra faoin spriocdháta, cuirtear an gealltanas ionchuir i leataobh, mar sin meastar nár postáladh an fhaisnéis riamh.

Tá sé seo inghlactha le haghaidh rollú suas dóchasach toisc go bhfuilimid ag brath cheana féin ar fhíoraitheoir macánta amháin ar a laghad a bheith againn don fhréamh staide. Cinnteoidh fíoraitheoir macánta den sórt sin freisin go bhfuil na sonraí aige chun bloic a phróiseáil, agus eiseoidh sé dúshlán infhaighteachta mura bhfuil an fhaisnéis ar fáil as slabhra. Tugtar [plasma](/developers/docs/scaling/plasma/) ar an gcineál seo rollta dóchasach.

## Cód conartha {#contract-code}

Is féidir faisnéis nach gá a scríobh ach uair amháin, nach ndéantar forscríobh riamh uirthi, agus nach mór a bheith ar fáil ar slabhra a stóráil mar chód conartha. Ciallaíonn sé seo go gcruthóimid "conradh cliste" leis na sonraí agus ansin úsáidimid [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) chun an fhaisnéis a léamh. Is é an buntáiste go bhfuil cóipeáil cód sách saor.

Seachas an costas a bhaineann le leathnú cuimhne, cosnaíonn `EXTCODECOPY` 2600 gás don chéad rochtain ar chonradh (nuair a bhíonn sé "fuar") agus 100 gás le haghaidh cóipeanna ina dhiaidh sin ón gconradh céanna móide 3 ghás in aghaidh an 32 beart focal. I gcomparáid le glao-shonraí, a chosnaíonn 15.95 an beart, tá sé seo níos saoire ag tosú ag thart ar 200 beart. Bunaithe ar [an fhoirmle do chostais mhéadaithe cuimhne](https://www.evm.codes/about#memoryexpansion), chomh fada agus nach bhfuil níos mó ná 4MB de chuimhne ag teastáil uait, tá an costas méadaithe cuimhne níos lú ná an costas a bhaineann le sonraí call a chur leis.

Ar ndóigh, níl anseo ach an costas a bhaineann leis na sonraí a _léamh_. Cosnaíonn an conradh thart ar 32,000 gás + 200/beart chun an conradh a chruthú. Níl an modh seo barainneach ach amháin nuair is gá an fhaisnéis chéanna a léamh go minic in idirbhearta éagsúla.

Is féidir le cód conartha a bheith gan chiall, chomh fada agus nach dtosaíonn sé le `0xEF`. Léirítear conarthaí a thosaíonn le `0xEF` mar [formáid oibiachta ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), a bhfuil ceanglais i bhfad níos déine orthu.

## Imeachtaí {#events}

[Imeachtaí](https://docs.alchemy.com/docs/solidity-events) astaíonn conarthaí cliste, agus léann bogearraí as slabhra iad.
Is é an buntáiste a bhaineann leo ná gur féidir le cód as slabhra éisteacht le haghaidh imeachtaí. Is é an costas ná [gás](https://www.evm.codes/#a0?fork=cancun), 375 móide 8 ngás in aghaidh an bheart sonraí. Ag 12 gwei/gás agus 2300 $/ETH, aistríonn sé seo go cent amháin móide 22 cent in aghaidh na cilibheart.

## Stóras {#storage}

Tá rochtain ag conarthaí cliste ar [stóras seasmhach](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Mar sin féin, tá sé an-daor. Má scríobhtar focal 32 beart chuig sliotán stórais a bhí folamh roimhe seo is féidir [22,100 gás a bheith mar chostas](https://www.evm.codes/#55?fork=cancun). Ag 12 gwei/gás agus 2300 $/ETH, tá sé seo thart ar 61 cent in aghaidh na hoibríochta scríofa, nó $19.5 in aghaidh na cileavata.

Is é seo an fhoirm stórais is daoire in Ethereum.

## Achoimre {#summary}

Déanann an tábla seo achoimre ar na roghanna difríochta, na buntáistí agus na míbhuntáistí a bhaineann leo.

| Cineál stórais                | Foinse sonraí            | Ráthaíocht infhaighteachta                                                                                                                             | Infhaighteacht ar slabhra                                                        | Teorainneacha breise                                                    |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844 blobaí               | As slabhra               | Ráthaíocht Ethereum ar feadh [~18 lá](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Níl ach hais ar fáil                                                             |                                                                         |
| Calldata                      | As slabhra               | Ráthaíocht Ethereum go deo (cuid den blocshlabhra)                                                                                  | Ní bhíonn ar fáil ach amháin má scríobhtar le conradh, agus ag an idirbheart sin |                                                                         |
| As slabhra le meicníochtaí L1 | As slabhra               | Ráthaíocht "Fíoraitheoir macánta amháin" le linn na tréimhse dúshláin                                                                                  | Hais amháin                                                                      | Ráthaithe ag an sásra dúshláin, ach amháin le linn na tréimhse dúshláin |
| Cód conartha                  | Ar slabhra nó as slabhra | Ráthaíocht Ethereum go deo (cuid den blocshlabhra)                                                                                  | Tá                                                                               | Scríofa chuig seoladh “randamach”, ní féidir tosú le `0xEF`             |
| Imeachtaí                     | Ar slabhra               | Ráthaíocht Ethereum go deo (cuid den blocshlabhra)                                                                                  | Níl                                                                              |                                                                         |
| Stóráil                       | Ar slabhra               | Ráthaíocht Ethereum go deo (cuid den blocshlabhra agus an staid reatha go dtí go bhfuil sé forscríofa)                              | Tá                                                                               |                                                                         |
