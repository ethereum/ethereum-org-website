---
title: Fianuithe
description: Cur síos ar fianuithe ar Ethereum cruthúnas-gill.
lang: ga
---

Táthar ag súil go gcruthóidh, go síneoidh agus go gcraolfaidh bailíochtóir fianú le linn gach ré. Imlíníonn an leathanach seo an chuma atá ar na fianuithe seo agus conas a dhéantar iad a phróiseáil agus a chur in iúl idir cliaint chomhthoil.

## Cad is ré ann? {#what-is-an-attestation}

Gach [ré](/glossary/#epoch) (6.4 nóiméad) molann bailíochtóir ré don líonra. Tá an fianú ann do shliotán ar leith sa ré. Is é cuspóir an fhianaithe vótáil i bhfabhar thuairim an bhailíochtóra ar an slabhra, go háirithe an bloc is déanaí a bhfuil údar leis agus an chéad bhloc sa ré reatha (ar a dtugtar ` foinse` agus `sprioc` seicphointí). Cuirtear an fhaisnéis seo le chéile do gach bailíochtóir rannpháirteach, rud a chuireann ar chumas an líonra teacht ar chomhdhearcadh maidir le staid an blocshlabhra.

Tá na comhpháirteanna seo a leanas san fhianú:

- `aggregation_bits`: liosta giotáin de bhailíochtóirí ina mapálann an suíomh chuig an innéacs bailíochtóra ina gcoiste; léiríonn an luach (0/1) cé acu ar shínigh an bailíochtóir na `data` (i.e. an bhfuil siad gníomhach agus an aontaíonn siad leis an moltóir bloic)
- `data`: sonraí a bhaineann leis an bhfianú, mar atá sainmhínithe thíos
- `signature`: síniú BLS a chomhiomlánaíonn sínithe bailíochtóirí aonair

Is é an chéad tasc a bheidh ag bailíochtóir fianaithe ná na `sonraí` a thógáil. Tá an fhaisnéis seo a leanas sa `data`:

- `slot`: An uimhir sliotán dá dtagraíonn an fianú
- `index`: Uimhir a shainaithníonn cén coiste lena mbaineann an bailíochtóir i sliotán ar leith
- `beacon_block_root`: Fréamh hais an bhloic a fheiceann an bailíochtóir ag ceann an tslabhra (toradh ar chur i bhfeidhm an algartam forc-rogha)
- `foinse`: Cuid den vóta críochnaitheach a thugann le fios cad é an bloc is déanaí a bhfuil údar leis dar leis na bailíochtóirí
- `sprioc`: Cuid den vóta críochnaitheach a thugann le fios cad a fheiceann na bailíochtaithe mar an chéad bhloc sa ré reatha

Nuair a bheidh na `sonraí` tógtha, is féidir leis an bhailíochtóir an giotán a smeachadh i `aggregation_bits` a fhreagraíonn dá innéacs bailíochtóra féin ó 0 go 1 lena thaispeáint gur ghlac sé páirt.

Ar deireadh, síníonn an bailíochtóir an fianú agus craolann sé chuig an líonra é.

### Fianú comhiomlán {#aggregated-attestation}

Baineann forchostas substaintiúil leis na sonraí seo a chur ar aghaidh timpeall an líonra do gach bailíochtóir. Mar sin, déantar na fianuithe ó bhailíochtóirí aonair a chomhiomlánú laistigh d'fholíonta sula gcraoltar iad ar bhonn níos leithne. Áiríonn sé seo sínithe a chomhbhailiú le chéile ionas go n-áirítear i bhfianú a chraoltar an comhdhearcadh `data` agus síniú amháin a chruthaítear trí shínithe na mbailitheoirí go léir a chomhaontaíonn leis an `sonra` sin a chomhcheangal. Is féidir é seo a sheiceáil le `aggregation_bits` toisc go soláthraíonn sé seo innéacs gach bailíochtóra ina choiste (a bhfuil a n-aitheantas curtha ar fáil i `data`) ar féidir a úsáid chun sínithe aonair a fhiosrú.

I ngach ré roghnaítear 16 bailíochtóirí i ngach folíon mar `chomhbhailitheoirí`. Bailíonn na comhbhailitheoirí na fianuithe go léir a chloiseann siad fúthu thar an líonra béadáin a bhfuil `data` comhionann lena gcuid féin. Taifeadtar seoltóir gach fianaithe meaitseála sa `aggregation_bits`. Ansin chraolann na comhbhailitheoirí an comhiomlán fianuithe chuig an líonra níos leithne.

Nuair a roghnaítear bailíochtóir le bheith ina mholtóir bloic déanann siad fianuithe comhiomlána a phacáistiú ó na folíonta suas go dtí an sliotán is déanaí sa bhloc nua.

### Saolré cuimsiú fianaithe {#attestation-inclusion-lifecycle}

1. Giniúint
2. Iomadú
3. Comhiomlánú
4. Iomadú
5. Cuimsiú

Tá saolré an fhianaithe leagtha amach sa scéimre thíos:

![saolré fianú](./attestation_schematic.png)

## Luaíochtaí {#rewards}

Tugtar luach saothair do bhailíochtóirí as fianuithe a chur isteach. Braitheann luach saothair an fhianaithe ar na bratacha rannpháirtíochta (foinse, sprioc agus ceann), an luach saothair bonn agus an ráta rannpháirtíochta.

Is féidir le gach ceann de na bratacha rannpháirtíochta a bheith fíor nó bréagach, ag brath ar an bhfianú a cuireadh isteach agus an mhoill a bhaineann leis.

Tarlaíonn an cás is fearr nuair a bhíonn na trí bhratach fíor, agus sa chás sin gnothóidh an bailíochtóir (de réir na brataí ceart):

`luach saothair += luach saothair bonn * meáchan na brataí * ráta fianaithe na brataí/64`

Déantar ráta fianaithe na brataí a thomhas agus leas á bhaint as suim iarmhéideanna éifeachtacha na mbailíochtóirí fianaithe go léir don bhratach a tugadh i gcomparáid leis an iarmhéid iomlán gníomhach.

### Bonn luach saothair {#base-reward}

Ríomhtar an bonn-luach saothair de réir líon na mbailíochtóirí fianaithe agus a n-iarmhéideanna éifeachtacha éitear:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Moill ar chuimsiú {#inclusion-delay}

Ag an am ar vótáil na mbailíochtóirí ar cheann an tslabhra (`block n`), ní raibh `block n+1` molta fós. Mar sin cuimsítear fianuithe go nádúrtha **bloc amháin níos déanaí** mar sin cuireadh gach fianú a vótáil ar `block n` mar cheann an tslabhra san áireamh i `block n+ 1` agus, is é 1 an **mhoill chuimsithe**. Má mhéadaíonn an mhoill chuimsithe faoi dhó go dhá shliotán, leathfaidh an luach saothair fianaithe, mar chun an luach saothair fianaithe a ríomh iolraítear an luach saothair bonn faoi chómhalartach na moille ar chuimsiú.

### Cásanna fianaithe {#attestation-scenarios}

#### Bailíochtóir Vótála ar Iarraidh {#missing-voting-validator}

Tá 1 ré amháin ar a mhéad ag bailíochtóirí chun a bhfianú a chur isteach. Más rud é gur theip ar an bhfianú i ré 0, is féidir leo é a chur isteach le moill áirithinte i ré 1.

#### Comhbhailitheoir ar Iarraidh {#missing-aggregator}

Tá 16 Comhbhailitheoir in aghaidh na ré san iomlán. Ina theannta sin, liostálann bailíochtóirí randamacha le **dhá fholíon le haghaidh 256 ré** agus feidhmíonn siad mar chúltaca ar eagla go bhfuil comhbhailitheoirí in easnamh.

#### Moltóir bloic ar iarraidh {#missing-block-proposer}

Tabhair faoi deara i gcásanna áirithe go bhféadfadh comhbhailitheoir ámharach a bheith ina mholtóir bloc freisin. Murar cuireadh an fianú san áireamh toisc go bhfuil an moltóir bloic ar iarraidh, roghnódh an chéad mholtóir bloic eile an fianú comhiomlán agus chuirfeadh sé isteach sa chéad bhloc eile é. Mar sin féin, méadóidh an **mhoill chuimsithe** faoi cheann amháin.

## Tuilleadh léitheoireachta {#further-reading}

- [Fianuithe i sonraíocht chomhdhearcadh anótáilte Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Fianuithe in eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
