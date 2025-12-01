---
title: Treoirlínte Pectra 7702
description: Foghlaim tuilleadh faoi 7702 in eisiúint Pectra
lang: ga
---

# Pectra 7702

## Achoimre {#abstract}

Sainmhíníonn EIP 7702 meicníocht chun cód a chur le EOA. Leis an togra seo, is féidir le hEOAnna, na cuntais oidhreachta Ethereum, feabhsuithe gearrthéarmacha feidhmiúlachta a fháil, rud a mhéadaíonn inúsáidteacht feidhmchlár. Déantar é seo trí phointeoir a shocrú chuig cód atá imscartha cheana féin ag baint úsáide as cineál nua idirbhirt: 4.

Tugann an cineál nua idirbhirt seo liosta údaraithe isteach. Sainmhínítear gach tuple údaraithe sa liosta mar

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**seoladh** an toscaireacht (cód beart atá imscartha cheana féin a úsáidfidh an EOA)
**chain_id** glasálann an t-údarú chuig slabhra ar leith (nó 0 do na slabhraí uile)
**nonce** glasálann an t-údarú chuig cuntas ar leith nonce
(**y_parity, r, s**) síniú an tupla údaraithe, arna shainmhíniú mar keccak(0x05 || rlp ([chain_id, seoladh, nonce])) ag eochair phríobháideach EOA lena mbaineann an t-údarú (ar a dtugtar an t-údarás freisin)

Is féidir toscaireacht a athshocrú trí tharmligean chuig an seoladh nialasach.

Coinníonn eochair phríobháideach an EOA smacht iomlán ar an gcuntas tar éis an tarmligin. Mar shampla, ní chiallaíonn tarmligean chuig Sábháilte gur ilsíniú é an cuntas mar go bhfuil eochair aonair ann fós ar féidir léi aon pholasaí sínithe a sheachbhóthar. As seo amach, ba cheart d’fhorbróirí dearadh a dhéanamh leis an toimhde go bhféadfadh aon rannpháirtí sa chóras a bheith ina chonradh cliste. I gcás forbróirí conarthaí cliste, níl sé sábháilte a thuilleadh glacadh leis go dtagraíonn `tx.origin` do EOA.

## Dea-chleachtais {#best-practices}

**Asbhaint Chuntais**: Ba cheart go mbeadh conradh tarmligin ailínithe le caighdeáin níos leithne astarraingthe cuntais (AA) Ethereum chun comhoiriúnacht a uasmhéadú. Go háirithe, ba cheart go mbeadh sé i gcomhréir le ERC-4337 nó comhoiriúnach leis an gcóras go hidéalach.

**Dearadh Gan Chead agus Frithsheasmhach in aghaidh Cinsireachta**: Luachálann Ethereum rannpháirtíocht gan chead. NÍ CEART conradh tarmligin a chódú go crua ná a bheith ag brath ar aon athsheoltóir nó seirbhís “iontaofa”. Chuirfeadh sé seo deireadh leis an gcuntas dá rachadh an t-athsheoltóir as líne. Is féidir leis an EOA féin gnéithe cosúil le baisceáil (m.sh. ceadaigh+aistriúÓ) a úsáid gan athsheoltóir. I gcás forbróirí feidhmchlár ar mian leo gnéithe ardleibhéil a úsáid atá cumasaithe ag 7702 (Aistarraingt Gháis, Aistarraingtí a Chaomhnú Príobháideachta) beidh athsheoltóir ag teastáil uait. Cé go bhfuil ailtireachtaí athsheachadóra éagsúla ann, is é ár moladh [cuachóirí 4337](https://www.erc4337.io/bundlers) a úsáid ag pointeáil ar a laghad [pointe iontrála 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) mar gheall ar:

- Soláthraíonn siad comhéadain chaighdeánaithe le haghaidh athsheolta
- Cuir córais phá-mháistir ionsuite san áireamh
- Cinntigh comhoiriúnacht ar aghaidh
- Is féidir tacú le friotaíocht cinsireachta trí [mempool poiblí](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Is féidir a cheangal nach nglaofar an fheidhm init ach ó [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Is é sin le rá, ba cheart go mbeadh aon duine in ann gníomhú mar urraitheoir/athsheoltóir idirbhirt chomh fada agus a sholáthraíonn siad an síniú nó an Oibríocht Úsáideora bailí riachtanach ón gcuntas. Cinntíonn sé seo friotaíocht i gcoinne cinsireachta: mura bhfuil aon bhonneagar saincheaptha ag teastáil, ní féidir le hathsheoltóir geata-choimeádta idirbhearta úsáideora a bhac go treallach. Mar shampla, oibríonn [Tacar Uirlisí Delegation MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) go sainráite le haon phacálaí ERC-4337 nó máistir íocaíochta ar aon slabhra, seachas freastalaí sainiúil do MetaMask a bheith ag teastáil.

**Comhtháthú dApps trí Chomhéadain Sparán**:

Ós rud é go gcuirfidh sparán conarthaí tarmligin sonracha le haghaidh EIP-7702 ar liosta bán, níor cheart go mbeadh dApps ag súil go n-iarrfaidh siad údaruithe 7702 go díreach. Ina áit sin, ba cheart comhtháthú a dhéanamh trí chomhéadain sparán caighdeánaithe:

- **ERC-5792 (`wallet_sendCalls`)**: Cumasaíonn sé seo dApps chun iarraidh ar sparán glaonna baisce a rith, rud a éascaíonn feidhmiúlachtaí cosúil le baisceáil idirbheart agus astarraingt gáis.

- **ERC-6900**: Ceadaíonn sé do dApps leas a bhaint as cumais chuntais chliste modúlacha, amhail eochracha seisiúin agus aisghabháil cuntas, trí mhodúil atá bainistithe ag sparán.

Trí úsáid a bhaint as na comhéadain seo, is féidir le dApps rochtain a fháil ar fheidhmiúlachtaí cuntas cliste a sholáthraíonn EIP-7702 gan toscaireachtaí a bhainistiú go díreach, rud a chinntíonn comhoiriúnacht agus slándáil ar fud cur i bhfeidhm sparán éagsúla.

> Nóta: Níl aon mhodh caighdeánaithe ann do dApps chun sínithe údaraithe 7702 a iarraidh go díreach. Caithfidh DApps brath ar chomhéadain sparán sonracha cosúil le ERC-6900 chun leas a bhaint as gnéithe EIP-7702.

Le haghaidh tuilleadh eolais:

- [Sonraíocht ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Sonraíocht ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Glasáil Díoltóra a Sheachaint**: I gcomhréir leis an méid thuas, bíonn cur i bhfeidhm maith neodrach ó thaobh díoltóra de agus idir-inoibritheach. Is minic a chiallaíonn sé seo cloí le caighdeáin atá ag teacht chun cinn le haghaidh cuntais chliste. Mar shampla, úsáideann [Cuntas Modúlach Alchemy](https://github.com/alchemyplatform/modular-account) an caighdeán ERC-6900 do chuntais chliste modúlacha agus tá sé deartha agus “úsáid idir-inoibritheach gan chead” i gcuimhne.

**Caomhnú Príobháideachta**: Cé go bhfuil príobháideacht ar an slabhra teoranta, ba cheart go ndéanfadh conradh tarmligin iarracht nochtadh agus in-nascthacht sonraí a íoslaghdú. Is féidir é seo a bhaint amach trí thacú le gnéithe cosúil le híocaíochtaí gáis i gcomharthaí ERC-20 (mar sin ní gá d’úsáideoirí iarmhéid ETH poiblí a choinneáil, rud a fheabhsaíonn príobháideacht agus UX) agus eochracha seisiúin aonuaire (rud a laghdaíonn an spleáchas ar eochair fhadtéarmach amháin). Mar shampla, cumasaíonn EIP-7702 íoc gáis i gcomharthaí trí idirbhearta urraithe, agus le feidhmiú maith beidh sé éasca na máistrí íoc sin a chomhtháthú gan níos mó faisnéise a sceitheadh ​​ná mar is gá. Ina theannta sin, ciallaíonn tarmligean ceaduithe áirithe lasmuigh den slabhra (ag baint úsáide as sínithe atá fíoraithe ar an slabhra) níos lú idirbhearta ar an slabhra le príomheochair an úsáideora, rud a chuidíonn le príobháideacht. Cuireann cuntais a bhfuil athsheoltóir ag teastáil uathu iallach ar úsáideoirí a seoltaí IP a nochtadh. Feabhsaíonn PublicMempools é seo, nuair a scaipeann idirbheart/UserOp tríd an mempool ní féidir leat a rá ar tháinig sé ón IP a sheol é, nó an ndearnadh é a athsheoladh tríd an bprótacal p2p.

**Inleathnú agus Slándáil Mhodúlach**: Ba cheart go mbeadh cur i bhfeidhm cuntas inleathnaithe ionas gur féidir leo forbairt le gnéithe nua agus feabhsuithe slándála. Is féidir uasghrádú a dhéanamh ó nádúr le EIP-7702 (toisc gur féidir le EOA a tharmligean i gcónaí chuig conradh nua amach anseo chun a loighic a uasghrádú). De bhreis ar an uasghrádaitheacht, ceadaíonn dearadh maith modúlacht – e.g. modúil breiseán le haghaidh scéimeanna sínithe nó beartais chaiteachais éagsúla – gan gá le hath-imscaradh go hiomlán. Is sampla den scoth é Tacar Cuntais Alchemy, rud a ligeann d’fhorbróirí modúil bailíochtaithe a shuiteáil (le haghaidh cineálacha éagsúla sínithe cosúil le ECDSA, BLS, srl.) agus modúil reatha le haghaidh loighic saincheaptha. Chun solúbthacht agus slándáil níos fearr a bhaint amach i gcuntais atá cumasaithe ag EIP-7702, moltar d’fhorbróirí tarmligean a dhéanamh chuig conradh seachfhreastalaí seachas go díreach chuig cur i bhfeidhm ar leith. Leis an gcur chuige seo, is féidir uasghráduithe agus modúlacht gan uaim a dhéanamh gan údaruithe breise EIP-7702 a bheith ag teastáil le haghaidh gach athraithe.

Buntáistí an Phatrúin Seachfhreastalaí:

- **In-uasghrádaithe**: Nuashonraigh loighic an chonartha tríd an seachfhreastalaí a dhíriú chuig conradh cur chun feidhme nua.

- **In-uasghrádaithe**: Nuashonraigh loighic an chonartha tríd an seachfhreastalaí a dhíriú chuig conradh cur chun feidhme nua.

Mar shampla, léiríonn [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) conas is féidir seachfhreastalaí a úsáid chun toscaireachtaí a thosú agus a bhainistiú go slán i gcuntais atá comhoiriúnach le EIP-7702.

Míbhuntáistí an Phatrúin Seachfhreastalaí:

- **Spleáchas ar ghníomhaithe seachtracha**: Caithfidh tú brath ar fhoireann sheachtrach chun nach n-uasghrádófar chuig conradh neamhshábháilte.

## Breithnithe Slándála {#security-considerations}

**Cosaint athiontrála**: Le tabhairt isteach tarmligean EIP-7702, is féidir le cuntas úsáideora aistriú go dinimiciúil idir Cuntas faoi Úinéireacht Sheachtrach (EOA) agus Conradh Cliste (SC). Cuireann an tsolúbthacht seo ar chumas an chuntais idirbhearta a thionscnamh agus a bheith ina sprioc do ghlaonna araon. Mar thoradh air sin, i gcásanna ina nglaonn cuntas air féin agus ina ndéanann sé glaonna seachtracha, beidh `msg.sender` cothrom le `tx.origin`, rud a bhaineann an bonn de thoimhdí slándála áirithe a bhí ag brath roimhe seo ar `tx.origin` a bheith ina EOA i gcónaí.

I gcás forbróirí conarthaí cliste, níl sé sábháilte a thuilleadh glacadh leis go dtagraíonn `tx.origin` do EOA. Mar an gcéanna, ní straitéis iontaofa a thuilleadh é `msg.sender == tx.origin` a úsáid mar chosaint i gcoinne ionsaithe athiontrála.

As seo amach, ba cheart d’fhorbróirí dearadh a dhéanamh leis an toimhde go bhféadfadh aon rannpháirtí sa chóras a bheith ina chonradh cliste. Nó d’fhéadfaidís cosaint athiontrála shoiléir a chur i bhfeidhm ag baint úsáide as gardaí athiontrála le patrúin mhodhnóra `nonReentrant`. Molaimid mionathraitheoir iniúchta a leanúint m.sh. [Open Zeppelin's Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). D’fhéadfaidís [athróg stórála neamhbhuan](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) a úsáid freisin.

**Breithnithe Slándála maidir le Túsú**

Tugann cur i bhfeidhm conarthaí tarmligin EIP-7702 dúshláin slándála sonracha chun cinn, go háirithe maidir leis an bpróiseas tosaithe. Éiríonn leochaileacht chriticiúil nuair a bhíonn an fheidhm tosaithe (`init`) cúpláilte go hadamhach leis an bpróiseas tarmligin. I gcásanna den sórt sin, d’fhéadfadh ceannródaí an síniú toscaireachta a idircheapadh agus an fheidhm `init` a rith le paraiméadair athraithe, agus b’fhéidir smacht a ghlacadh ar an gcuntas.

Tá an riosca seo thar a bheith ábhartha agus iarracht á déanamh feidhmithe Cuntas Conartha Cliste (SCA) atá ann cheana a úsáid le EIP-7702 gan a meicníochtaí tosaithe a mhodhnú.

**Réitigh chun Leochaileachtaí Tosaithe a Mhaolú**

- Cuir `initWithSig` i bhfeidhm
  Cuir feidhm `initWithSig` in ionad na feidhme caighdeánaí `init` a éilíonn ar an úsáideoir na paraiméadair tosaithe a shíniú. Cinntíonn an cur chuige seo nach féidir leis an túsú dul ar aghaidh ach amháin le toiliú sainráite an úsáideora, rud a laghdaíonn rioscaí túsaithe neamhúdaraithe.

- Bain úsáid as EntryPoint ERC-4337
  Éiligh go nglaofar an fheidhm tosaithe go heisiach ón gconradh EntryPoint ERC-4337. Baineann an modh seo leas as an gcreatlach caighdeánaithe bailíochtaithe agus reatha a sholáthraíonn ERC-4337, rud a chuireann ciseal breise slándála leis an bpróiseas tosaithe.  
  _(Féach: [Doiciméid Shábháilte](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Trí na réitigh seo a ghlacadh, is féidir le forbróirí slándáil chonarthaí toscaireachta EIP-7702 a fheabhsú, ag cosaint i gcoinne ionsaithe tosaigh féideartha le linn chéim an tosaithe.

**Imbhuailtí Stórála** Ní ghlanann tarmligean cód an stóráil atá ann cheana féin. Agus aistriú á dhéanamh ó chonradh tarmligin amháin go conradh eile, fanann na sonraí iarmharacha ón gconradh roimhe sin. Má úsáideann an conradh nua na sliotáin stórála céanna ach má dhéantar iad a léirmhíniú ar bhealach difriúil, is féidir go dtarlóidh iompar neamhbheartaithe dá bharr. Mar shampla, má bhí an toscaireacht tosaigh chuig conradh ina seasann sliotán stórála do `bool`, agus má tá an toscaireacht ina dhiaidh sin chuig conradh ina seasann an sliotán céanna do `uint`, is féidir leis an neamhréir torthaí dothuartha a bheith mar thoradh air.

**Rioscaí fioscaireachta** Le cur i bhfeidhm tarmligean EIP-7702, féadfaidh conarthaí cliste rialú iomlán a dhéanamh ar shócmhainní i gcuntas úsáideora. Má tharmligeann úsáideoir a gcuntas chuig conradh mailíseach i ngan fhios dó, d'fhéadfadh ionsaitheoir smacht a fháil go héasca agus cistí a ghoid. Agus `chain_id=0` in úsáid, cuirtear an toscaireacht i bhfeidhm ar gach aitheantóir slabhra. Ná déan ach conradh dochloíte a tharmligean (ná déan riamh tarmligean chuig seachfhreastalaí), agus chuig conarthaí a imscaradh ag baint úsáide as CREATE2 amháin (leis an gcód tosaigh caighdeánach - gan aon chonarthaí meiteamorfacha) ionas nach féidir leis an imscaradóir rud éigin difriúil a imscaradh chuig an seoladh céanna in áit eile. Seachas sin, cuireann do tharmligean do chuntas i mbaol ar gach slabhra EVM eile.

Nuair a dhéanann úsáideoirí sínithe tarmligthe, ba cheart an conradh sprice a fhaigheann an tarmligean a thaispeáint go soiléir agus go feiceálach chun cabhrú le rioscaí fioscaireachta a mhaolú.

**Dromchla & Slándáil Íosta Iontaofa**: Cé go dtugann sé solúbthacht, ba cheart go mbeadh a phríomhloighic i gconradh tarmligin íosta agus in-iniúchta. Is síneadh ar Chomhaontú Eolais an úsáideora an conradh go héifeachtach, mar sin is féidir le haon locht a bheith tubaisteach. Ba cheart go leanfadh cur i bhfeidhm dea-chleachtais ó phobal slándála conarthaí cliste. Mar shampla, ní mór feidhmeanna tógálaí nó tosaitheoirí a dhaingniú go cúramach – mar a léirigh Alchemy, má úsáidtear patrún seachfhreastalaí faoi 7702, d’fhéadfadh tosaitheoir neamhchosanta ligean d’ionsaitheoir an cuntas a ghlacadh ar láimh. Ba chóir d'fhoirne díriú ar an gcód ar slabhra a choinneáil simplí: níl ach ~200 líne de Solidity i gconradh 7702 Ambire, agus castacht á híoslaghdú d'aon ghnó chun fabhtanna a laghdú. Ní mór cothromaíocht a bhaint amach idir loighic shaibhir ó thaobh gnéithe de agus an simplíocht a éascaíonn iniúchóireacht.

### Feidhmithe aitheanta {#known-implementations}

Mar gheall ar nádúr EIP 7702, moltar do sparán a bheith cúramach agus iad ag cabhrú le húsáideoirí conradh tríú páirtí a tharmligean. Tá bailiúchán d'fheidhmithe aitheanta a ndearnadh iniúchadh orthu liostaithe thíos:

| Seoladh conartha                           | Foinse                                                                                                                                     | Iniúchtaí                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [iniúchtaí](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [iniúchtaí](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [iniúchtaí](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [iniúchtaí](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [iniúchtaí](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |

## Treoirlínte sparán crua-earraí {#hardware-wallet-guidelines}

Níor cheart go nochtfadh sparán crua-earraí tarmligean treallach. Is é an comhdhearcadh i réimse na sparán crua-earraí ná liosta de chonarthaí tarmligthe iontaofa a úsáid. Molaimid cead a thabhairt do na feidhmithe atá ar eolas thuas agus cinn eile a bhreithniú ar bhonn cás ar chás. Ós rud é go dtugann tarmligean do EOA chuig conradh smacht ar na sócmhainní go léir, ba cheart do sparán crua-earraí a bheith cúramach leis an gcaoi a gcuireann siad 7702 i bhfeidhm.

### Cásanna comhtháthaithe le haghaidh aipeanna comhlántacha {#integration-scenarios-for-companion-apps}

#### Leisciúil {#lazy}

Ós rud é go bhfuil an EOA fós ag feidhmiú mar is gnách, níl aon rud le déanamh.

Nóta: d’fhéadfadh an cód tarmligin roinnt sócmhainní a dhiúltú go huathoibríoch, amhail NFTanna ERC 1155, agus ba cheart don lucht tacaíochta a bheith ar an eolas faoi sin.

#### Ar an eolas {#aware}

Cuir an t-úsáideoir ar an eolas go bhfuil toscaireacht i bhfeidhm don EOA trína chód a sheiceáil, agus tairg an toscaireacht a bhaint más mian leat.

#### Toscaireacht choiteann {#common-delegation}

Cuireann soláthraithe crua-earraí conarthaí toscaireachta aitheanta ar liosta bán agus cuireann siad a dtacaíocht i bhfeidhm i gcomhlach bogearraí. Moltar conradh a roghnú le tacaíocht iomlán ERC 4337.

Déileálfar le hEOAanna a tharmligtear chuig ceann eile mar EOAanna caighdeánacha.

#### Toscaireacht saincheaptha {#custom-delegation}

Cuireann an soláthraí crua-earraí a chonradh tarmligin féin i bhfeidhm agus cuireann sé leis na liostaí é agus cuireann sé a thacaíocht i bhfeidhm i bogearraí compánach. Moltar conradh a thógáil le tacaíocht iomlán ERC 4337.

Déileálfar le hEOAanna a tharmligtear chuig ceann eile mar EOAanna caighdeánacha.
