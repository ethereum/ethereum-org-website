---
title: Uasghrádú conarthaí cliste
description: Forbhreathnú ar phatrúin uasghrádaithe do chonarthaí cliste Ethereum
lang: ga
---

Is cláir féin-reatha iad conarthaí cliste ar Ethereum a ritheann i Meaisín Fíorúil Ethereum (EVM). Tá na cláir seo do-athraithe ó thaobh dearaidh de, rud a chuireann cosc ​​ar aon nuashonrú ar an loighic ghnó nuair atá an conradh imscartha.

Cé go bhfuil gá le do-athraitheacht le haghaidh easpa iontaobhais, díláraithe, agus slándáil conarthaí cliste, d’fhéadfadh sé a bheith ina mhíbhuntáiste i gcásanna áirithe. Mar shampla, le cód do-athraithe é d'fhéadfadh sé a bheith dodhéanta d'fhorbróirí conarthaí leochaileacha a shocrú.

Mar sin féin, de bharr taighde méadaithe maidir le conarthaí cliste a fheabhsú, tugadh isteach roinnt patrún uasghrádaithe. Cuireann na patrúin uasghrádaithe seo ar chumas na bhforbróirí conarthaí cliste a uasghrádú (agus do- athraitheacht á caomhnú) trí loighic ghnó a chur i gconarthaí éagsúla.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh tuiscint mhaith agat ar [chonarthaí cliste](/developers/docs/smart-contracts/), [ anatamaíocht chonradh cliste](/developers/docs/smart-contracts/anatomy/), agus an [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm/). Glacann an treoir seo leis freisin go bhfuil tuiscint ag léitheoirí ar chonarthaí cliste a ríomhchlárú.

## Cad is uasghrádú conartha cliste ann? {#what-is-a-smart-contract-upgrade}

Is éard atá i gceist le huasghrádú conartha cliste ná loighic ghnó conradh cliste a athrú agus staid an chonartha á caomhnú. Tá sé tábhachtach a shoiléiriú nach ionann an t-uasghrádú agus an luaineacht, go háirithe i gcomhthéacs conarthaí cliste.

Ní féidir leat clár a imscartar chuig seoladh ar líonra Ethereum a athrú go fóill. Ach is féidir leat an cód a ritear a athrú nuair a idirghníomhaíonn úsáideoirí le conradh cliste.

Is féidir é seo a dhéanamh trí na modhanna seo a leanas:

1. Leaganacha iolracha de chonradh cliste a chruthú agus staid ascnaimh (i.e. sonraí) ón seanchonradh go dtí ásc nua den chonradh.

2. Conarthaí ar leith a chruthú chun loighic agus staid ghnó a stóráil.

3. Úsáid a bhaint as patrúin seachfhreastalaí chun glaonna feidhme a tharmligean ó chonradh seachfhreastalaí do-athraithe go conradh loighce inathraithe.

4. Príomhchonradh do-athraithe a chruthú a labhraíonn le, agus a bhraitheann ar chonarthaí satailíte solúbtha chun feidhmeanna sonracha a rith.

5. An patrún muileata a úsáid chun glaonna feidhme a tharmligean ó chonradh seachfhreastalaí go conarthaí loighce.

### Meicníocht uasghrádaithe #1: Ascnamh conartha {#contract-migration}

Bunaítear ascnamh conartha ar leagan – an smaoineamh staideanna uathúla de na bogearraí céanna a chruthú agus a bhainistiú. Is éard atá i gceist le haistriú conartha ná sampla nua de chonradh cliste atá ann cheana a imscaradh agus stóras agus iarmhéideanna a aistriú chuig an gconradh nua.

Beidh stóras folamh ag an gconradh nua-imlonnaithe, rud a ligeann duit sonraí a aisghabháil ón seanchonradh agus é a scríobh chuig an gcur chun feidhme nua. Ina dhiaidh sin, beidh ort na conarthaí go léir a d'oibrigh leis an seanchonradh a nuashonrú chun an seoladh nua a léiriú.

Is í an chéim dheireanach in ascnamh conartha ná cur ina luí ar úsáideoirí athrú chuig an gconradh nua a úsáid. Coinneoidh an leagan conartha nua iarmhéideanna agus seoltaí úsáideoirí, rud a chaomhnóidh do-athraitheacht. Más conradh atá bunaithe ar chomharthaí é, beidh ort dul i dteagmháil le malartáin freisin chun an seanchonradh a chaitheamh amach agus an conradh nua a úsáid.

Is beart réasúnta simplí agus sábháilte é imirce conartha chun conarthaí cliste a uasghrádú gan idirghníomhaíochtaí úsáideoirí a bhriseadh. Mar sin féin, bíonn sé fadálach stóráil agus iarmhéideanna úsáideoirí a aistriú de láimh chuig an gconradh nua agus d'fhéadfadh costais arda gáis a bheith i gceist.

[Tuilleadh faoi imirce conartha.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Meicníocht uasghrádaithe #2: Deighilt sonraí {#data-separation}

Modh eile chun conarthaí cliste a uasghrádú ná loighic ghnó agus stóras sonraí a dheighilt i gconarthaí ar leith. Ciallaíonn sé seo go n-idirghníomhaíonn úsáideoirí leis an gconradh loighce, agus sonraí á stóráil sa chonradh stórais.

Tá an cód a fhorghníomhaítear nuair a idirghníomhaíonn úsáideoirí leis an bhfeidhmchlár sa chonradh loighce. Coinníonn sé seoladh an chonartha stórais freisin agus idirghníomhaíonn sé leis chun sonraí a fháil agus a shocrú.

Idir an dá linn, coinníonn an conradh stórála an staid a bhaineann leis an gconradh cliste, mar shampla iarmhéideanna agus seoltaí úsáideoirí. Tabhair faoi deara go bhfuil an conradh stórais faoi úinéireacht an chonartha loighce agus go bhfuil sé cumraithe le seoladh an dara ceann ag an imscaradh. Cuireann sé seo cosc ​​ar chonarthaí neamhúdaraithe an conradh stórais a ghlaoch nó a sonraí a nuashonrú.

De réir réamhshocraithe, bíonn an conradh stórála do-athraithe - ach is féidir leat cur i bhfeidhm nua a chur in ionad an chonartha loighce a luann sé. Athróidh sé seo an cód a ritheann san EVM, agus an stóras agus na hiarmhéideanna a choinneáil slán.

Chun an modh uasghrádaithe seo a úsáid is gá seoladh an chonartha loighce sa chonradh stórais a nuashonrú. Ní mór duit freisin an conradh loighce nua a chumrú le seoladh an chonartha stórais ar chúiseanna atá mínithe cheana.

D’fhéadfaí a áitiú gur fusa an patrún deighilte sonraí a chur i bhfeidhm i gcomparáid le haistriú conartha. Mar sin féin, beidh ort conarthaí iolracha a bhainistiú agus scéimeanna údaraithe casta a chur i bhfeidhm chun conarthaí cliste a chosaint ó uasghrádú mailíseach.

### Meicníocht uasghrádaithe #3: Patrúin seachfhreastalaí {#proxy-patterns}

Úsáideann an patrún seachfhreastalaí freisin scarúint sonraí chun loighic ghnó agus sonraí a choinneáil i gconarthaí ar leithligh. Mar sin féin, i bpatrún seachfhreastalaí, glaonn an conradh stórais (ar a dtugtar seachfhreastalaí) an conradh loighic le linn rith cóid. Is iompú droim ar ais é seo ar an modh deighilte sonraí, áit a nglaonn an conradh loighce ar an gconradh stórais.

Is é seo a tharlaíonn i bpatrún seachfhreastalaí:

1. Idirghníomhaíonn úsáideoirí leis an gconradh seachfhreastalaí, a stórálann sonraí, ach nach bhfuil an loighic ghnó aige.

2. Stórálann an conradh seachfhreastalaí seoladh an chonartha loighce agus tarmligeann sé gach glao feidhme chuig an gconradh loighce (a bhfuil an loighic ghnó aige) ag baint úsáide as an bhfeidhm `delegatecall`.

3. Tar éis an glao a chur ar aghaidh chuig an gconradh loighce, aisghabháiltear na sonraí a cuireadh ar ais ón gconradh loighce agus cuirtear ar ais chuig an úsáideoir iad.

Teastaíonn tuiscint ar fheidhm **glaoch toscaire** chun na patrúin seachfhreastalaí a úsáid. Go bunúsach, is opcode é `glaoch toscaire` a ligeann do chonradh conradh eile a ghlaoch, agus tarlaíonn forghníomhú an chóid iarbhír i gcomhthéacs an chonartha ag glaoch. Impleacht a bhaineann le `delegatecall` a úsáid i bpatrúin seachfhreastalaí is ea go léann agus go scríobhann an conradh seachfhreastalaí chuig a stóras agus go bhfeidhmíonn sé an loighic atá stóráilte ag an gconradh loighce amhail is dá nglaofaí feidhm inmheánach.

Ón [Doiciméadú Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Tá leagan speisialta de ghlao teachtaireachta ann, darb ainm **glao toscaire** atá comhionann le glao teachtaireachta seachas an cód ag an sprioc-seoladh a dhéantar i gcomhthéacs (i.e. ag an seoladh) den chonradh glaonna agus `msg.sender` agus `msg.value` ná a luachanna a athrú._ _ Ciallaíonn sé seo gur féidir le conradh cód a lódáil go dinimiciúil ó sheoladh eile ag am rite. Tagraíonn stóras, seoladh reatha agus iarmhéid don chonradh atá ag glaoch, ní thógtar ach an cód ón seoladh a nglaoitear air._

Tá a fhios ag an gconradh seachfhreastalaí `glaochtoscaire` a agairt aon uair a ghlaonn úsáideoir ar fheidhm toisc go bhfuil feidhm `tacachumais` ionsuite ann. I ríomhchlárú Solidity déantar an [fheidhm tacachumais](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) nuair nach meaitseálann glao feidhme na feidhmeanna sonraithe i gconradh.

Chun go n-oibreoidh an patrún seachfhreastalaí ní mór feidhm tacachumais shaincheaptha a scríobh a shonraíonn an chaoi ar cheart don chonradh seachfhreastalaí glaonna feidhme nach dtacaíonn sé leo a láimhseáil. Sa chás seo tá feidhm tacachumais an tseachvótálaí cláraithe chun glao toscaire a thionscnamh agus chun iarratas an úsáideora a athródú chuig cur i bhfeidhm an chonartha loighce reatha.

Tá an conradh seachfhreastalaí do-athraithe de réir réamhshocraithe, ach is féidir conarthaí loighce nua le loighic ghnó nuashonraithe a chruthú. Déantar an t-uasghrádú ansin trí sheoladh an chonartha loighce dá dtagraítear sa chonradh seachfhreastalaí a athrú.

Tríd an gconradh seachfhreastalaí a phointeáil go chonradh nua loighce, déantar an cód a rith nuair a ghlaonn úsáideoirí ar athruithe ar fheidhm an chonartha seachfhreastalaí. Ligeann sé seo dúinn loighic conartha a uasghrádú gan iarraidh ar úsáideoirí idirghníomhú le conradh nua.

Is modh coitianta iad patrúin seachfhreastalaí chun conarthaí cliste a uasghrádú mar go gcuireann siad deireadh leis na deacrachtaí a bhaineann le himirce conartha. Mar sin féin, tá patrúin seachfhreastalaí níos casta le húsáid agus féadann siad lochtanna criticiúla a thabhairt isteach, mar [troideanna roghnóir feidhme](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), má úsáidtear go míchuí é.

[Tuilleadh faoi phatrúin seachfhreastalaí](https://blog.openzeppelin.com/proxy-patterns/).

### Meicníocht uasghrádaithe #4: Patrún straitéise {#strategy-pattern}

Bíonn tionchar ag an [bpatrún straitéise](https://en.wikipedia.org/wiki/Strategy_pattern) ar an teicníocht seo, rud a spreagann cruthú cláir bhogearraí a dhéanann comhéadan le cláir eile chun gnéithe sonracha a chur i bhfeidhm. Dá gcuirfí patrún na straitéise i bhfeidhm ar fhorbairt Ethereum chiallódh sé conradh cliste a thógáil a ghlaonn feidhmeanna ó chonarthaí eile.

Sa phríomhchonradh sa chás seo tá an loighic lárnach gnó, ach déanann sé comhéadan le conarthaí cliste eile ("conarthaí satailíte") chun feidhmeanna áirithe a rith. Stórálann an príomhchonradh seo seoladh gach conartha satailíte agus féadann sé aistriú idir feidhmeanna éagsúla an chonartha satailíte.

Is féidir leat conradh satailíte nua a thógáil agus an príomhchonradh a chumrú leis an seoladh nua. Ligeann sé seo duit _straitéisí_ a athrú (i.e. loighic nua a chur i bhfeidhm) le haghaidh conradh cliste.

Cé go bhfuil sé cosúil leis an bpatrún seachfhreastalaí a pléadh níos luaithe, tá patrún na straitéise difriúil toisc go bhfuil loighic an ghnó i seilbh an phríomhchonartha, a n-idirghníomhaíonn úsáideoirí leis. Trí úsáid a bhaint as an bpatrún seo tugtar an deis duit athruithe teoranta a thabhairt isteach ar chonradh cliste gan cur isteach ar an mbonneagar lárnach.

Is é an príomh-mhíbhuntáiste go bhfuil an patrún seo úsáideach den chuid is mó chun mion-uasghráduithe a chur i bhfeidhm. Chomh maith leis sin, má tá an príomhchonradh i gcontúirt (m.sh., trí haic), ní féidir leat an modh uasghrádaithe seo a úsáid.

### Meicníocht uasghrádaithe #5: Patrún muileata {#diamond-pattern}

Is féidir an patrún muileata a mheas mar fheabhsú ar an bpatrún seachfhreastalaí. Ní hionann patrúin mhuileata agus patrúin seachfhreastalaí mar is féidir leis an gconradh seachfhreastalaí muileata glaonna feidhme a tharmligean chuig níos mó ná conradh loighce amháin.

_Gruanna_ a thugtar ar na conarthaí loighce sa phatrún muileata. Le go n-oibreoidh an patrún muileata, ní mór duit léarscáiliú a chruthú sa chonradh seachfhreastalaí a mhapálann [feidhm roghnóir](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) chuig seoltaí gné éagsúla.

Nuair a dhéanann úsáideoir glao feidhme, seiceálann an conradh seachfhreastalaí an léarscáiliú chun teacht ar an ngné atá freagrach as an bhfeidhm sin a chur i gcrích. Ansin déanann sé `glaochtoscaire` a agairt (ag baint úsáide as an bhfeidhm tacachumais) agus atreoraíonn sé an glao chuig an gconradh loighce cuí.

Tá roinnt buntáistí ag an bpatrún uasghrádaithe muileata thar phatrúin uasghrádaithe seachfhreastalaí traidisiúnta:

1. Ligeann sé duit cuid bheag den chonradh a uasghrádú gan an cód ar fad a athrú. Chun úsáid a bhaint as an bpatrún seachfhreastalaí le haghaidh uasghráduithe ní mór conradh loighce iomlán nua a chruthú, fiú i gcás mion-uasghráduithe.

2. Tá teorainn méide 24KB ag gach conradh cliste (lena n-áirítear conarthaí loighce a úsáidtear i bpatrúin seachvótálaithe), ar féidir leis a bheith ina teorainn - go háirithe i gcás conarthaí casta a éilíonn níos mó feidhmeanna. Déanann an patrún muileata an fhadhb seo a réiteach go héasca trí fheidhmeanna a roinnt thar chonarthaí iolracha loighce.

3. Glacann patrúin seachfhreastalaí cur chuige uileghabhálach maidir le rialuithe rochtana. Is féidir le haonán a bhfuil rochtain aige ar fheidhmeanna uasghrádaithe an conradh _iomlán_ a athrú. Ach cuireann an patrún muileata ar chumas cur chuige ceadanna modúlach, áit ar féidir leat aonáin a shrianadh chun feidhmeanna áirithe a uasghrádú laistigh de chonradh cliste.

[Tuilleadh faoin bpatrún muileata](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Buntáistí agus míbhuntáistí a bhaineann le conarthaí cliste a uasghrádú {#pros-and-cons-of-upgrading-smart-contracts}

| Buntáistí                                                                                                                                 | Míbhuntáistí                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Is féidir le huasghrádú conartha cliste é a dhéanamh níos fusa leochaileachtaí a aimsítear sa chéim iar-imscartha a shocrú.               | Frithoibríonn uasghrádú conarthaí cliste smaoineamh an neamh-luaineacht cóid, a bhfuil impleachtaí aige maidir le dílárú agus slándáil.                                      |
| Is féidir le forbróirí uasghráduithe loighce a úsáid chun gnéithe nua a chur le feidhmchláir dhíláraithe.                                 | Caithfidh úsáideoirí muinín a bheith acu as forbróirí gan conarthaí cliste a mhodhnú go treallach.                                                                           |
| Is féidir le huasghráduithe cliste conartha feabhas a chur ar shábháilteacht úsáideoirí deiridh mar is féidir fabhtanna a shocrú go tapa. | Cruthaíonn clárú feidhmiúlacht uasghrádaithe ríomhchláraithe i gconarthaí cliste sraith eile castachta agus méadaítear an fhéidearthacht go mbeidh lochtanna criticiúla ann. |
| Tugann uasghrádú conartha níos mó spáis d'fhorbróirí triail a bhaint as gnéithe éagsúla agus feabhas a chur ar dapps le himeacht ama.     | Féadfaidh an deis chun conarthaí cliste a uasghrádú forbróirí a spreagadh chun tionscadail a sheoladh níos tapúla gan dícheall cuí a dhéanamh le linn na céime forbartha.    |
|                                                                                                                                           | Is féidir le rialú rochtana nó lárú neamhdhaingnithe i gconarthaí cliste é a dhéanamh níos fusa do ghníomhaithe mailíseacha uasghrádú neamhúdaraithe a dhéanamh.             |

## Ceisteanna maidir le conarthaí cliste a uasghrádú {#considerations-for-upgrading-smart-contracts}

1. Bain úsáid as meicníochtaí slána um rialú rochtana/údaraithe chun uasghráduithe conartha cliste neamhúdaraithe a chosc, go háirithe má úsáidtear patrúin seachfhreastalaí, patrúin straitéise, nó scarúint sonraí. Sampla is ea rochtain ar an bhfeidhm uasghrádaithe a shrianadh, ionas nach bhféadfaidh ach úinéir an chonartha glaoch a chur uirthi.

2. Is gníomhaíocht chasta é conarthaí cliste a uasghrádú agus éilíonn sé leibhéal ard díchill chun tabhairt isteach leochaileachtaí a chosc.

3. Laghdaigh toimhdí muiníne tríd an bpróiseas uasghrádaithe a chur i bhfeidhm a dhílárú. Áirítear le straitéisí féideartha úsáid a bhaint as conradh [sparán multisig](/developers/docs/smart-contracts/#multisig) chun uasghrádú a rialú, nó chun [comhaltaí de DAO](/dao/) chun vótáil ar cheadú an uasghrádú.

4. Bí ar an eolas faoi na costais a bhaineann le conarthaí a uasghrádú. Mar shampla, d’fhéadfadh go mbeadh gá le níos mó ná idirbheart amháin chun staid a chóipeáil (m.sh. iarmhéideanna úsáideoirí) ó sheanchonradh go conradh nua le linn ascnaimh chonartha, rud a chiallódh go mbeadh níos mó táillí gáis ag teastáil.

5. Smaoinigh ar **ghlais ama** a chur i bhfeidhm chun úsáideoirí a chosaint. Tagraíonn glas ama do mhoill a chuirtear i bhfeidhm ar athruithe ar chóras. Is féidir glais ama a chomhcheangal le córas rialachais multisig chun uasghráduithe a rialú: má shroicheann gníomh atá beartaithe an tairseach formheasa riachtanach, ní fhorghníomhaíonn sé go dtí go dtéann an tréimhse moille réamhshainithe thart.

Tugann glais ama roinnt ama d’úsáideoirí éirí as an gcóras mura n-aontaíonn siad le hathrú molta (m.sh. uasghrádú loighce nó scéimeanna táillí nua). Gan glas ama, ní mór d’úsáideoirí muinín a chur sna forbróirí gan athruithe treallacha i gconradh cliste a chur i bhfeidhm gan fógra a thabhairt roimh ré. Is é an míbhuntáiste anseo ná go gcuireann glais ama srian ar an gcumas leochaileachtaí a réiteach go tapa.

## Acmhainní {#resources}

**Breiseáin Uasghrádaithe OpenZeppelin - _Sraith uirlisí chun conarthaí cliste in-uasghrádaithe a imscaradh agus a dhaingniú._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Doiciméadúchán](https://docs.openzeppelin.com/upgrades)

## Ranganna Teagaisc {#tutorials}

- [Do Chonarthaí Cliste a uasghrádú | Teagaisc YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) le Patrick Collins
- [Ethereum Smart Contract Migration Tutorial](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) le Austin Griffith
- [Úsáid a bhaint as patrún seachfhreastalaí UUPS chun conarthaí cliste a uasghrádú](https://blog.logrocket.com/author/praneshas/) le Pranesh A.S
- [Teagasc Web3: Scríobh conradh cliste uasghrádaithe (seachfhreastalaí) ag úsáid OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) ag fangjun.eth

## Tuilleadh léitheoireachta {#further-reading}

- [Staid Uasghráduithe Conartha Cliste](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) le Santiago Palladino
- [Ilbhealaí chun conradh cliste Solidity a uasghrádú](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - blag Crypto Market Pool
- [Foghlaim: Conarthaí Cliste a Uasghrádú](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Doiciméid OpenZeppelin
- [ Patrúin Seachfhreastalaí Le hAghaidh Uasghrádú Conarthaí Dlúthachta: Trédhearcach vs Proxies UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) le Naveen Sahu
- [Conas a Oibríonn Uasghrádú Muileata](https://dev.to/mudgen/how-diamond-upgrades-work-417j) le Nick Mudge
