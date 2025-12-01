---
title: Eochracha i Ethereum cruthúnas-gill
description: Míniú ar na heochracha a úsáidtear i meicníocht comhdhearcadh cruthúnais-gill Ethereum
lang: ga
---

Daingníonn Ethereum sócmhainní úsáideoirí ag baint úsáide as cripteagrafaíocht eochair phoiblí-phríobháideach. Úsáidtear an eochair phoiblí mar bhunús do sheoladh Ethereum - is é sin, tá sé le feiceáil ag an bpobal i gcoitinne agus in úsáid mar aitheantóir uathúil. Níor cheart go mbeadh an eochair phríobháideach (nó 'rúnda') inrochtana ach d'úinéir cuntais. Úsáidtear an eochair phríobháideach chun idirbhearta agus sonraí a ‘shíniú’ ionas gur féidir le cripteagrafaíocht a chruthú go gceadaíonn an sealbhóir gníomh éigin d’eochair phríobháideach ar leith.

Gintear eochracha Ethereum trí úsáid a bhaint as [cripteagrafaíocht chuar elliptic](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Mar sin féin, nuair a d’athraigh Ethereum ó [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow) go [ cruthúnas ar an gceist](/developers/docs/consensus-mechanisms/pos) cuireadh cineál nua eochair le Ethereum. Oibríonn na heochracha bunaidh fós díreach mar a bhí roimhe seo - ní raibh aon athruithe ar na heochracha éilips-bhunaithe chun cuntais a dhaingniú. Mar sin féin, bhí cineál nua eochrachag teastáil ó úsáideoirí chun páirt a ghlacadh i gcruthúnas-gil trí ETH a chealú agus bailíochtóirí a rith. D'eascair an gá seo as dúshláin inscálaithe a bhain le go leor teachtaireachtaí a cuireadh ar aghaidh idir líon mór bailíochtóirí a d'éiligh modh cripteagrafach a d'fhéadfaí a chomhiomlánú go héasca chun an méid cumarsáide a theastaíonn le go dtiocfadh an líonra ar chomhdhearcadh a laghdú.

Úsáideann an cineál nua eochair seo an [**scéim síniú Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). Cumasaíonn BLS comhiomlánú an-éifeachtach sínithe ach ceadaíonn sé freisin innealtóireacht droim ar ais ar eochracha comhiomlánaithe aonair bailíochtóra agus tá sé oiriúnach chun gníomhaíochtaí idir bailíochtóirí a bhainistiú.

## An dá chineál eochracha bailíochtóra {#two-types-of-keys}

Roimh an athrú go cruthúnas-gill, ní raibh ach eochair phríobháideach amháin bunaithe ar chuar éilipseach amháin ag úsáideoirí Ethereum chun rochtain a fháil ar a gcuid cistí. Le tabhairt isteach cruthúnais-gill bhí **eochair bhailíochtóra** agus **eochair aistarraingthe ag teastáil ó úsáideoirí ar mhian leo a bheith ina ngeallta aonair **.

### An eochair bailíochtóra {#validator-key}

Tá dhá eilimint in eochair sínithe an bhailíochtóra:

- Bailíochtóir **eochair phríobháideach**
- Eochair bhailíochtóra **poiblí**

Is é cuspóir eochair phríobháideach an bhailíochtóra oibríochtaí ar slabhra a shíniú mar bhlocthograí agus fianuithe. Mar gheall air seo, ní mór na heochracha seo a shealbhú i sparán te.

Tá sé de bhuntáiste ag an tsolúbthacht seo go n-aistrítear eochracha sínithe bailíochtóra go han-tapa ó ghléas amháin go gléas eile, ach má bhíonn siad caillte nó goidte, seans go mbeidh gadaí in ann **gníomhú go mailíseach** ar chúpla bealach:

- Déan slaiseáil ar an mbailíochtóir mar seo:
  - A bheith i do mholtóir agus dhá bhloc rabhcháin éagsúla a shíniú don sliotán céanna
  - A bheith i d'fhianóir agus ag síniú fianú a "timpeall" ceann eile
  - Bheith i d’fhianóir agus dhá fhianú éagsúla a bhfuil an sprioc chéanna acu a shíniú
- Cuir iallach ar imeacht dheonach, a stopann an bailíochtóir ó bheartú, agus a thugann rochtain ar a iarmhéid ETH don úinéir eochrach aistarraingthe

Cuirtear an **eochair phoiblí bhailíochtóra** san áireamh sna sonraí idirbhirt nuair a thaisceann úsáideoir ETH don chonradh taisce geallta. _sonraí taisce_ a thugtar air seo agus ligeann sé do Ethereum an bailíochtóir a shainaithint.

### Dintiúir aistarraingthe {#withdrawal-credentials}

Tá airí ar a dtugtar _dintiúir aistarraingthe_ ag gach bailíochtóir. Tosaíonn an réimse 32 beart seo le `0x00`, a léiríonn dintiúir aistarraingthe BLS, nó `0x01`, a ionadaíonn dintiúir a léiríonn seoladh reatha.

Ní mór do bhailíochtóirí a bhfuil eochracha `0x00` acu na dintiúir seo a nuashonrú chun seoladh reatha a chur in iúl d'fhonn ró-íocaíochtaí iarmhéid nó aistarraingt iomlán ón ngeallchur a ghníomhachtú. Is féidir é seo a dhéanamh trí sheoladh reatha a sholáthar sna sonraí taisce le linn na heochrach giniúna tosaigh, _ NÓ_ tríd an eochair aistarraingthe a úsáid níos déanaí chun teachtaireacht ` BLSToExecutionChange`a shíniú agus a chraoladh.

### An eochair aistarraingthe {#withdrawal-key}

Beidh an eochair aistarraingthe ag teastáil chun dintiúir aistarraingthe a nuashonrú chun seoladh reatha a chur in iúl, mura socraítear é le linn na taisce tosaigh. Cuirfidh sé seo ar chumas na n-íocaíochtaí iarmhéid iomarcacha tosú á bpróiseáil, agus ligfidh sé d'úsáideoirí freisin a ngeallta ETH a aistarraingt go hiomlán.

Díreach cosúil leis na heochracha bailíochtóra, tá dhá chomhpháirt sna heochracha aistarraingthe freisin:

- Eochair **phríobháideach** aistarraingthe
- Eochair **phoiblí** aistarraingthe

Má chailleann tú an eochair seo sula nuashonraítear dintiúir aistarraingthe go cineál `0x01`, caillfear rochtain ar iarmhéid an bhailíochtóra. Is féidir leis an bhailíochtóir fianuithe agus bloic a shíniú fós ós rud é go dteastaíonn eochair phríobháideach an bhailíochtóra leis na gníomhartha seo, ach is beag an dreasacht atá ann má chailltear na heochracha aistarraingthe.

Trí na heochracha bailíochtóra a scaradh ó eochracha cuntais Ethereum is féidir le húsáideoir aonair il-bhailíochtóirí a rith.

![scéimre eochair bhailíochtóra](validator-key-schematic.png)

**Tabhair faoi deara**: Ní mór [teachtaireacht scoir dheonaigh (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) a shíniú leis an eochair bhailíochtóra chun éirí as dualgais gealltchuir agus chun iarmhéid an bhailíochtóra a aistarraingt. Mar sin féin, is togra é [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) a ligfidh d'úsáideoir imeacht ón bhailíochtóir agus a iarmhéid a aistarraingt trí theachtaireachtaí scoir a shíniú leis an eochair aistarraingthe amach anseo. Laghdóidh sé seo boinn tuisceana iontaoibhe trí chur ar chumas na ngeallsealbhóirí a tharmligean ETH chuig [soláthraithe geallchur-mar-sheirbhíse](https://ethereum.org/en/staking/saas/#what-is-staking-as-a-service) smacht a choinneáil ar a gcuid cistí.

## Eochracha a dhíorthú as frása síl {#deriving-keys-from-seed}

Dá mbeadh sraith nua de 2 eochair neamhspleácha ag teastáil ó gach 32 ETH atá i gceist, bheadh an príomhbhainistíocht ciotach go tapa, go háirithe d'úsáideoirí a bhfuil il-bhailíochtóirí á rith acu. Ina áit sin, is féidir eochracha bailíochtóra iolracha a dhíorthú ó rún coiteann amháin agus ceadaíonn stóráil an rún aonair sin rochtain ar il-eochracha bailíochtóra.

Is gnéithe suntasacha iad [Néamóinic](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) agus cosáin ar minic a bhíonn úsáideoirí ag teacht orthu nuair a fhaigheann [siad rochtain](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ar a gcuid sparán. Is seicheamh focal é an cuimhneach a fheidhmíonn mar shíol tosaigh d’eochair phríobháideach. Nuair a chuirtear le chéile é le sonraí breise, gineann an cuimhneachán hais ar a dtugtar an 'máistir eochair'. Is féidir smaoineamh air seo mar fhréamh crann. Is féidir craobhacha ón bhfréamh seo a dhíorthú ansin trí úsáid a bhaint as cosán ordlathach ionas gur féidir nóid linbh a bheith ann mar theaglaim de hash a nód tuismitheora agus a n-innéacs sa chrann. Léigh faoi [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) agus [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) caighdeáin le haghaidh eochrach atá bunaithe ar chuimhneamh a ghiniúint.

Tá an struchtúr seo a leanas ag na cosáin seo, a bheidh aitheanta d’úsáideoirí a d’idirghníomhaigh le sparán crua-earraí:

```
m/44'/60'/0'/0`
```

Scarann ​​na slaiseanna sa chonair seo comhpháirteanna den eochair phríobháideach mar seo a leanas:

```
master_key / purpose / coin_type / account / change / address_index
```

Cuireann an loighic seo ar chumas úsáideoirí a oiread bailíochtóirí agus is féidir a cheangal le ** frása neamónach amháin** toisc gur féidir le fréamh an chrainn a bheith coitianta, agus is féidir le difreáil tarlú ag na brainsí. Is féidir leis an úsáideoir **aon líon eochracha** a fháil ón bhfrása cuimhneach.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Tá `/` ag gach brainse mar sin ciallaíonn `m/2` tosú leis an máistir-eochair agus lean brainse 2. Sa scéimreach thíos úsáidtear frása neamónach amháin chun trí eochair aistarraingthe a stóráil, agus tá dhá bhailíochtoir gaolmhar ag gach ceann díobh.

![loighic eochair bhailíochtóra](multiple-keys.png)

## Tuilleadh léitheoireachta {#further-reading}

- [Post bhlag Fondúireacht Ethereum le Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 BLS12-381 giniúint eochair](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Ciseal Rith Scoir Spreagtha](https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Príomhbhainistíocht ar scála](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
