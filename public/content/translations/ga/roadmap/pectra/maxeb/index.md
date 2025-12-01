---
title: Pectra MaxEB
description: Foghlaim tuilleadh faoi MaxEB sa leagan Pectra
lang: ga
---

# MaxEB {#maxeb}

_tl;dr:_ Ligeann forc crua Pectra do bhailíochtóirí Ethereum rogha a dhéanamh i dtreo uasmhéid éifeachtach agus comhdhlúthú níos airde trí dhintiúir aistarraingthe **Cineál 1** a thiontú go dintiúir aistarraingthe **Cineál 2**. Is é Launchpad an uirlis oifigiúil chun seo a dhéanamh. Ní féidir an oibríocht seo a aisiompú.

## Forbhreathnú {#overview}

### Cé atá thíos leis? {#who-is-affected}

Duine ar bith a ritheann bailíochtóir - is dócha gur duine é a bhfuil innéacs bailíochtóra atá faoina smacht ar eolas aige/aici (e.g. [Bailíochtóir #12345](https://beaconcha.in/validator/12345)). Má úsáideann tú prótacal chun bailíochtóir a rith (m.sh. Lido CSM nó Rocket Pool), beidh ort seiceáil leo chun a fháil amach an dtacaíonn siad le maxEB agus cathain a thacaíonn siad leis.

Mura bhfuil tú ag baint úsáide as comhartha geallchur leachtach (m.sh. rETH nó stETH), níl aon ghníomh riachtanach ná molta.

### Cad is "maxEB" ann? {#what-is-maxeb}

maxEB = Uasmhéid Iarmhéid Éifeachtach bhailíochtóra. Go dtí an forc crua Pectra, tuilleann gach bailíochtóir ar uasmhéid de 32 ETH. Tar éis Pectra, tá an rogha ag bailíochtóirí tuilleamh a dhéanamh ar aon iarmhéid idir 32 agus 2048 ETH, i méaduithe 1 ETH trí rogha a dhéanamh isteach san athrú.

### Conas is féidir le bailíochtóir liostáil? {#how-does-a-validator-opt-in}

Roghnaíonn bailíochtóir an t-athrú maxEB trí dhintiúir aistarraingthe **Cineál 1** a thiontú go dintiúir aistarraingthe **Cineál 2**. Is féidir é seo a dhéanamh ar an [Launchpad](https://launchpad.ethereum.org/) tar éis don chrua-fhorc Pectra dul beo. Mar atá le **Cineál 0** → **Cineál 1**, is próiseas dochúlaithe é tiontú ó **Cineál 1** → **Cineál 2**.

### Cad is dintiúir aistarraingthe ann? {#whats-a-withdrawal-credential}

Nuair a ritheann tú bailíochtóir, bíonn sraith dintiúir aistarraingthe agat. Is féidir iad seo a fháil i do shonraí taisce json nó is féidir leat iad a fheiceáil ar beaconcha.in [tab taisce] do bhailíochtóra (https://beaconcha.in/validator/12345#deposits).

1. **Clóscríobh 0** dintiúir aistarraingthe: Má thosaíonn dintiúir aistarraingthe do bhailíochtóra le `0x00...`, rinne tú taisceadh roimh an bhforc crua Shapella agus níl seoladh aistarraingthe socraithe agat fós.

![Cineál dintiúir aistarraingthe 0](./0x00-wd.png)

2. **Dintiúir aistarraingthe Cineál 1**: Má thosaíonn dintiúir aistarraingthe do bhailíochtóra le `0x01...`, tá taisce déanta agat tar éis an fhorc chrua Shapella nó tá do dhintiúir **Cineál 0** tiontaithe agat cheana féin go dintiúir **Cineál 1**.

![Creidiúint aistarraingthe Cineál 1](./0x01-wd.png)

3. **Dintiúir aistarraingthe Cineál 2**: Tosóidh an cineál dintiúir aistarraingthe nua seo le `0x02...` agus cumasaítear é tar éis Pectra. Uaireanta tugtar "bailíochtóirí cumaisc" ar bhailíochtóirí a bhfuil dintiúir aistarraingthe **Cineál 2** acu

| **Ceadaithe**         | **Ní cheadaítear**    |
| --------------------- | --------------------- |
| ✅ Cineál 0 → Cineál 1 | ❌ Cineál 0 → Cineál 2 |
| ✅ Cineál 1 → Cineál 2 | ❌ Cineál 1 → Cineál 0 |
|                       | ❌ Cineál 2 → Cineál 1 |
|                       | ❌ Cineál 2 → Cineál 0 |

### Rioscaí {#risks}

Cumasaíonn MaxEB do bhailíochtóir a iarmhéid iomlán a sheoladh chuig bailíochtóir eile. Ba chóir d'úsáideoirí atá ag cur isteach iarratas comhdhlúthaithe foinse agus ábhar an idirbhirt atá á shíniú acu a fhíorú. Is é an Launchpad an uirlis oifigiúil chun leas a bhaint as gnéithe maxEB. Má shocraíonn tú uirlis tríú páirtí a úsáid, ba cheart duit a fhíorú:

- Tá eochair phoiblí agus seoladh aistarraingthe an bhailíochtóra foinse ag teacht leis an mbailíochtóir a rialaíonn siad
- Tá eochair phoiblí an bhailíochtóra sprice ceart agus is leis/léi í
- Is tiontú an iarratas, ní comhdhlúthú, mura bhfuil sé beartaithe acu cistí a sheoladh chuig bailíochtóir eile
- Tá an t-idirbheart á shíniú ag an seoladh aistarraingthe ceart

Molaimid **go láidir** aon uirlis tríú páirtí a bheartaíonn tú a úsáid a phlé leis an [pobal EthStaker](https://ethstaker.org/about). Is áit chabhrach í chun do shláinte mheabhrach a sheiceáil agus botúin a sheachaint. Má úsáideann tú uirlis mhailíseach nó mhíchumraithe, **d’fhéadfaí d’iarmhéid bailíochtóra iomlán a sheoladh chuig bailíochtóir nach bhfuil faoi do smacht** — gan aon bhealach é a fháil ar ais.

## Sonraí teicniúla {#technical-details}

### An sreabhadh {#the-flow}

Beidh dhá úsáid ann don oibríocht `ConsolidationRequest`:

1. Bailíochtóir atá ann cheana a thiontú ó bhailíochtóir **Cineál 1** go bailíochtóir **Cineál 2**
2. Bailíochtóirí eile a chomhdhlúthú i mbailíochtóir **Cineál 2** atá ann cheana féin

N iompú bhailíochtóir **Cineál 1** go bailíochtóir **Cineál 2**, is iad _foinse_ agus _sprioc_ araon an bailíochtóra atá á n-iompú agat. Cosnóidh an oibríocht gásailín agus beidh sí i scuaine taobh thiar d’iarratais chomhdhlúthaithe eile. Tá an scuaine seo **ar leithligh** ón scuaine taiscí agus níl aon tionchar ag taiscí nua bailíochtóra uirthi agus is féidir í a fheiceáil ar [pectrified.com](https://pectrified.com/).

Chun bailíochtóirí a chomhdhlúthú, ní mór _bailíochtóir sprice_ a bheith agat a bhfuil dintiúir aistarraingthe **Cineál 2** aige. Seo ceann scríbe aon iarmhéid bhailíochtóra atá á gcomhdhlúthú, agus an t-innéacs atá á chaomhnú.

### Riachtanais maidir le tiontú go Cineál 2 {#requirements-for-converting-to-type-2}

Beidh sé seo ag teastáil don chéad bhailíochtóir a thiontóidh tú go **Cineál 2**. Tá innéacs an bhailíochtóra seo caomhnaithe agus gníomhach. I gcás tiontaithe, is é an _bailíochtóir foinse_ == an _bailíochtóir sprice._

Caithfidh an bailíochtóir...

- bí gníomhach
- tá dintiúir aistarraingthe **Cineál 1** agat
- gan a bheith i riocht scoir (nó gearrtha)
- gan aistarraingtí láimhghníomhacha ar feitheamh a bheith acu (ní bhaineann sé seo le scuabtha)

![léaráid chomhshó](./conversion.png)

### Riachtanais chun {#requirements-for-consolidating} a chomhdhlúthú

Is é seo an _oibríocht chéanna_ atá i gceist le tiontú ach tarlaíonn sé nuair a bhíonn an _bailíochtóir foinse_ difriúil ón _mbailíochtóir sprice_. Caomhnaítear innéacs an bhailíochtóra sprice agus glacann sé leis an iarmhéid ón bhailíochtóir foinse. Cuirtear innéacs an bhailíochtóra foinse i riocht `EXITED`.

Sa chás seo, tá na ceanglais chéanna ag an mbailíochtóir foinse agus atá thuas chomh maith le:

- tá sé gníomhach ar feadh ~27.3 uair an chloig ar a laghad (`SHARD_COMMITTEE_PERIOD` amháin)

Ní mór don bhailíochtóir sprice

- tá dintiúir aistarraingthe **Cineál 2** agat
- gan a bheith i riocht scoir.

![léaráid chomhdhlúthaithe](./consolidation.png)

### An t-iarratas comhdhlúthaithe {#the-consolidation-request}

Síneoidh an seoladh aistarraingthe a bhaineann leis an mbailíochtóir foinse an t-iarratas comhdhlúthaithe agus beidh an méid seo a leanas ann:

1. Seoladh an bhailíochtóra foinse (m.sh. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Eochair phoiblí an bhailíochtóra foinse (m.sh. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Eochair phoiblí an bhailíochtóra sprice sin

In iompú, beidh 2 & 3 mar an gcéanna. Is féidir an oibríocht seo a dhéanamh ar an [Launchpad](https://launchpad.ethereum.org/).

### Riachtanais shínithe {#signing-requirements}

Chun `Iarratas Comhdhlúthaithe` a chur isteach, ní mór do **seoladh aistarraingthe an bhailíochtóra foinse** an t-iarratas a shíniú. Cruthaíonn sé seo smacht ar chistí an bhailíochtóra.

### Cad atá sínithe? {#what-is-signed}

Úsáidtear [fréamh sínithe](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) den réad `ConsolidationRequest` atá scartha ó fhearainn.

- **Fearann:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Réimsí fréimhe sínithe:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Cuirtear an **síniú BLS** a eascraíonn as sin isteach in éineacht leis an iarratas.

Nóta: Déantar an síniú leis an seoladh aistarraingthe, ní leis an eochair bailíochtóra.

### Aistarraingtí páirteacha {#partial-withdrawals}

Faigheann bailíochtóirí a bhfuil dintiúir **Cineál 1** acu scuabadh uathoibríoch, gan ghás, dá n-iarmhéid breise (aon rud os cionn 32 ETH) chuig a seoladh aistarraingthe. Ós rud é go gceadaíonn **Cineál 2** do bhailíochtóir iarmhéideanna a chomhcheangal i méaduithe 1 ETH, ní dhéanfaidh sé iarmhéideanna a scuabadh go huathoibríoch go dtí go sroichfidh sé 2048 ETH. Ní mór aistarraingtí páirteacha ar bhailíochtóirí **Cineál 2** a spreagadh de láimh agus cosnóidh siad gásailín.

## Uirlisí comhdhlúthaithe {#consolidation-tooling}

Tá roinnt uirlisí ar fáil chun comhdhlúthuithe a bhainistiú. Is é an [Launchpad](https://launchpad.ethereum.org/en/validator-actions) an uirlis oifigiúil, cruthaithe ag Fondúireacht Ethereum. Tá uirlisí tríú páirtí ann freisin arna gcruthú ag aonáin ón bpobal geallchur a d'fhéadfadh gnéithe nach soláthraíonn an Launchpad a thairiscint. Cé nach ndéanann Fondúireacht Ethereum iniúchadh ná formhuiniú ar na huirlisí anseo, is uirlisí foinse oscailte iad seo a leanas ó bhaill aitheanta den phobal.

| Uirlis                                     | Suíomh Gréasáin                                              | Foinse oscailte                 | Creator                                        | Arna iniúchadh                                                                                                                                            | Comhéadan                                                    | Gnéithe suntasacha                                                    |
| ------------------------------------------ | ------------------------------------------------------------ | ------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- |
| Bainisteoir Geallchur Pectra               | pectrastaking.com                            | Sea, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Níl                                                                                                                                                       | UI Gréasáin                                                  | Wallet Connect, oibríonn sé le SAFE                                   |
| Uirlis CLI Oibríochtaí Bailíochtóra Pectra | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Yes, MIT                        | [Luganodes](https://www.luganodes.com/)        | Sea, Quantstamp [Bealtaine 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Líne ordaithe                                                | Baisceáil, do go leor bailíochtóirí ag an am céanna                   |
| Ethereal                                   | [GitHub](https://github.com/wealdtech/ethereal)              | Sea, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Níl                                                                                                                                                       | Líne ordaithe                                                | Tacar gnéithe iomlán le haghaidh bailíochtóirí agus bainistíocht nóid |
| Siren                                      | [GitHub](https://github.com/sigp/siren)                      | Sea, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Níl                                                                                                                                                       | Roinnt líne ordaithe, ach comhéadan gréasáin den chuid is mó | Ní oibríonn sé ach má tá tú ag úsáid cliant comhdhearcaidh Lighthouse |

## Ceisteanna Coitianta {#faq}

### An mbíonn tionchar ag liostáil ar ádh nó ar luaíochtaí mo thogra? {#change-luck-or-rewards}

Ní féidir. Ní laghdaíonn liostáil d’athrú togra - fanann do dhualgais agus do rogha togra mar a chéile. Mar shampla, má tá dhá bhailíochtóir 32 ETH agat i gcomparáid le bailíochtóir amháin 64 ETH, beidh na seansanna céanna agat go roghnófar tú chun bloc a mholadh agus luaíochtaí a thuilleamh.

### An athraíonn rogha liostála mo riosca slaiseála? {#change-slashing-risk}

I gcás oibreoirí níos lú nó neamhghairmiúla, is é an freagra gairid ná nach n-athraíonn. Is é an freagra is faide ná, i gcás oibreoirí gairmiúla a bhfuil go leor bailíochtóirí á rith acu in aghaidh an nóid le foláirimh thapa, go bhféadfadh comhdhlúthú i níos lú bailíochtóirí a gcumas freagairt do laghdú agus imeachtaí easghluaiseachta a chosc a laghdú. Tá an _pionós_ gearrtha tosaigh do gach bailíochtóir laghdaithe go suntasach ó 1 ETH (in aghaidh gach 32 ETH) go 0.0078125 ETH (in aghaidh gach 32 ETH) chun an riosca seo a fhritháireamh.

### An gcaithfidh mé mo bhailíochtóir a fhágáil chun tiontú? {#exit-validator}

Ní féidir. Is féidir leat tiontú ar an láthair gan scor.

### Cá fhad a thógfaidh sé chun é a thiontú/a chomhdhlúthú? {#how-long}

Íosmhéid 27.3 uair an chloig ach tá comhdhlúthuithe faoi réir scuaine freisin. Tá an scuaine seo neamhspleách ar na scuainí taisce agus aistarraingthe agus ní dhéanann siad difear di.

### An féidir liom m’innéacs bailíochtóra a choinneáil? {#keep-validator-index}

Tá. Coinníonn tiontú in-áit an t-innéacs bailíochtóra céanna. Má chomhdhlúthaíonn tú il-bhailíochtóirí, ní bheidh tú in ann ach innéacs an _bhailíochtóra sprice_ a choinneáil.

### An gcaillfidh mé dearbhuithe? {#miss-attestations}

Le linn comhdhlúthú isteach i mbailíochtóir eile, scoirtear an bailíochtóir foinse agus bíonn tréimhse feithimh ~27 uair an chloig ann sula mbíonn an t-iarmhéid gníomhach ar an bailíochtóir sprice. Ní chuireann an tréimhse seo \*\* isteach ar mhéadracht feidhmíochta\*\*.

### An mbeidh pionóis i gceist? {#incur-penalties}

Ní féidir. Chomh fada agus atá do bhailíochtóir ar líne, ní bheidh aon phionóis ort.

### An gcaithfidh seoltaí aistarraingthe na mbailíochtóirí atá á gcomhdhlúthú a bheith mar an gcéanna? {#withdrawal-addresses-match}

Ní féidir. Ach ní mór don _fhoinse_ an t-iarratas a údarú óna seoladh féin.

### An mbeidh mo luaíochtaí níos measa tar éis iompú? {#rewards-compound}

Tá. Le dintiúir **Cineál 2**, athghabhtar duaiseanna os cionn 32 ETH go huathoibríoch — ach ní láithreach. Mar gheall ar mhaolán beag (ar a dtugtar [_histéiréis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), ní mór do d’iarmhéid **thart ar 1.25 ETH breise** a bhaint amach sula n-athghabhtar an t-airgead breise. Mar sin, in ionad comhdhlúthú ag 33.0 ETH, tarlaíonn sé ag 33.25 (iarmhéid éifeachtach = 33 ETH), ansin 34.25 (iarmhéid éifeachtach = 34 ETH), agus mar sin de.

### An féidir liom scuabadh uathoibríoch a fháil fós tar éis tiontaithe? {#automatic-sweep}

Ní tharlóidh scuabadh uathoibríoch ach amháin le hiarmhéideanna iomarcacha thar 2048. I gcás gach aistarraingt pháirteach eile, beidh ort iad a spreagadh de láimh.

### An féidir liom m’intinn a athrú agus filleadh ó Chineál 2 go Cineál 1? {#go-back-to-type1}

Ní féidir. Ní féidir tiontú go **Cineál 2** a aisiompú.

### Más mian liom il-bhailíochtóirí a chomhdhlúthú, an gcaithfidh mé gach ceann acu a thiontú go Cineál 2 ar dtús? {#consolidate-multiple-validators}

Ní féidir! Tiontaigh bailíochtóir amháin go Cineál 2 agus bain úsáid as sin mar an sprioc. Is féidir le gach bailíochtóir eile atá comhdhlúite sa sprioc Cineál 2 sin a bheith Cineál 1 nó Cineál 2

### Tá mo bhailíochtóir as líne nó faoi bhun 32 ETH - an féidir liom é a thiontú fós? {#offline-or-below-32eth}

Tá. Chomh fada agus atá sé gníomhach (gan a bheith scortha) agus gur féidir leat síniú lena sheoladh aistarraingthe, is féidir leat é a thiontú.

## Acmhainní {#resources}

- [Sonraíochtaí comhdhearcaidh Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Seo an leagan is 'fíre' ar cheart duit brath air. Nuair a bhíonn amhras ort, léigh na sonraíochtaí
- Ní bhíonn gach duine compordach ag dul trí chód, mar sin is féidir leis an [maxEB-GPT seo](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) cabhrú le léirmhíniú a dhéanamh ar na sonraíochtaí. _Séanadh: Ba chóir brath ar na sonraíochtaí, ní ar an Intleacht Shaorga, mar fhírinne, toisc go bhféadfadh an Intleacht Shaorga míbhrí a bhaint as faisnéis nó freagraí a shamhlú_
- [pectrified.com](https://pectrified.com/): Féach ar staid na gcomhdhlúthuithe, na dtaisce agus amanna feithimh na scuaine
- [Ethereal](https://github.com/wealdtech/ethereal): Uirlis CLI cruthaithe ag an bpobal chun tascanna bailíochtóra coitianta a bhainistiú
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Conradh cruthaithe ag an bpobal a cheadaíonn il-bhailíochtóirí Ethereum a thaisceadh in aon idirbheart amháin
