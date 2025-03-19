---
title: Teicneolaíocht bhailíochtóra dáilte
description: Cumasaíonn teicneolaíocht bhailíochtóra dáilte ilpháirtithe le hoibriú dáilte a dhéanamh ar bhailíochtóir Ethereum.
lang: ga
---

# Teicneolaíocht bhailíochtóra dáilte {#distributed-validator-technology}

Is cur chuige é teicneolaíocht bhailíochtóra dáilte (DVT) i leith slándáil bhailíochtóra a leathnaíonn na príomhchúraimí bainistíochta agus sínithe amach thar pháirtithe éagsúla, chun pointí aonair teipe a laghdú, agus chun athléimneacht an bhailíochtóra a mhéadú.

Déanann sé é seo trí **an eochair phríobháideach a roinnt** a úsáidtear chun bailíochtóir **a dhaingniú thar go leor ríomhairí** eagraithe i "mbraisle". Is é an buntáiste a bhaineann leis seo ná go ndéanann sé an-deacair d’ionsaitheoirí rochtain a fháil ar an eochair, toisc nach bhfuil sé stóráilte go hiomlán ar aon mheaisín amháin. Ligeann sé freisin do roinnt nóid dul as líne, mar is féidir an síniú riachtanach a dhéanamh le fo-thacar de na meaisíní i ngach braisle. Laghdaíonn sé seo pointí aonair teipe ón líonra agus déanann sé an tacar bailíochtóra iomlán níos láidre.

![Léaráid a thaispeánann conas a roinntear eochair bhailíochtaithe aonair ina heochairscaireanna le dáileadh ar nóid iolracha le comhpháirteanna éagsúla.](./dvt-cluster.png)

## Cén fáth a bhfuil DVT ag teastáil uainn? {#why-do-we-need-dvt}

### Slándáil {#security}

Gineann bailíochtóirí dhá phéire eochair phoiblí-phríobháideacha: eochracha bailíochtóra chun páirt a ghlacadh i gcomhthoil agus eochracha aistarraingthe chun rochtain a fháil ar chistí. Cé gur féidir le bailíochtóirí eochracha aistarraingthe a fháil sa stór fuar, ní mór d’eochracha príobháideacha bailíochtóra a bheith ar líne 24/7. Má sháraítear eochair phríobháideach bhailíochtóra is féidir le hionsaitheoir an bailíochtóir a rialú, rud a d'fhéadfadh a bheith ina chúis le gearradh nó le cailliúint ETH an ghealltóra. Is féidir le DVT cabhrú leis an riosca seo a mhaolú. Mar seo:

Trí úsáid a bhaint as DVT, is féidir le geallsealbhóirí páirt a ghlacadh i ngealltóireacht agus eochair phríobháideach an bhaiíochtóra a choinneáil sa fuarstóráil. Baintear é seo amach tríd an bhun-eochair bhailíochtóra iomlán a chriptiú agus ansin é a roinnt ina phríomhscaireanna. Bíonn aa príomhscaireanna beo ar lína agus déantar iad a dháileadh ar nóid iolracha a chumasaíonn oibriú dáilte an bhailíochtóra. Tá sé seo indéanta toisc go n-úsáideann bailíochtóirí Ethereum sínithe BLS atá mar bhreiseán, rud a chiallaíonn gur féidir an eochair iomlán a athchruthú trína gcomhpháirteanna a achoimriú. Ligeann sé seo don ghealltóir an eochair bhailíochtóra bhunaidh 'máistir' iomlán a choinneáil slán as líne.

### Gan aon phointe teipe aonair {#no-single-point-of-failure}

Nuair a bhíonn bailíochtóir roinnte idir oibreoirí iolracha agus il-innill, féadann sé teipeanna crua-earraí agus bogearraí aonair a sheasamh gan dul as líne. Is féidir an riosca teipeanna a laghdú freisin trí úsáid a bhaint as cumraíochtaí éagsúla crua-earraí agus bogearraí trasna na nóid i mbraisle. Níl an athléimneacht seo ar fáil do chumraíochtaí bailíochtóra aon-nóid - tagann sé ón gciseal DVT.

Má théann ceann de na comhpháirteanna meaisín i mbraisle síos (mar shampla, má tá ceithre oibreoir i mbraisle bailíochtóra agus go n-úsáideann duine cliant ar leith a bhfuil fabht ann), cinntíonn na cinn eile go leanann an bailíochtóir ag rith.

### Dílárú {#decentralization}

Is é an cás idéalach do Ethereum ná an oiread bailíochtóirí agus is féidir a oibriú go neamhspleách. Mar sin féin, tá an-tóir ar roinnt soláthraithe geallta agus is iad is cúis le cuid mhór den ETH iomlán atá i ngeall ar an líonra. Is féidir le DVT ligean do na hoibreoirí seo a bheith ann agus dílárú na ngeall a chaomhnú. Is é an fáth atá leis seo ná go ndáiltear na heochracha do gach bailíochtóir ar go leor meaisíní agus go dtógfadh sé i bhfad níos mó claonpháirteachais do bhailíochtóir iompú go mailíseach.

Gan DVT, tá sé níos fusa do sholáthróirí gealltanais gan ach ceann amháin nó dhá chumraíocht cliant a thacú dá mbailíochtóirí uile, rud a mhéadaíonn tionchar fabht cliaint. Is féidir DVT a úsáid chun an riosca a scaipeadh ar fud cumraíochtaí iolracha cliant agus crua-earraí éagsúla, rud a chruthaíonn athléimneacht trí éagsúlacht.

**Cuireann DVT na buntáistí seo a leanas ar fáil do Ethereum:**

1. **Dílárú** ar chomhdthoil cruthúnais Ethereum
2. Cinntíonn sé **beocht** an líonra
3. Cruthaíonn bailíochtóir **lamháltas lochtanna**
4. ** Muinín íoslaghdaithe** oibríocht bailíochtaithe
5. ** Riosca gearrtha** agus aga neamhfhónaimh íoslaghdaithe
6. **Feabhsaítear éagsúlacht** (cliant, ionad sonraí, suíomh, rialachán, srl.)
7. **Slándáil fheabhsaithe** bainistíochta eochrach bailíochtóra

## Conas a oibríonn DVT? {#how-does-dvt-work}

Tá na comhpháirteanna seo a leanas i réiteach DVT:

- **[Roinnt rúnda Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Úsáideann bailíochóirí [eochracha BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Is féidir "eochairscaireanna" aonair BLS ("príomhscaireanna") a chomhcheangal in eochair chomhiomlán amháin (síniú). In DVT, is ionann eochair phríobháideach do bhailíochtóir agus síniú BLS comhcheangailte gach oibreora sa bhraisle.
- **[Scéim sínithe tairsí](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Cinneann sé líon na bpríomhscaireanna aonair a theastaíonn le haghaidh dualgais sínithe, m.sh., 3 as 4.
- **[Giniúint eochrach dáilte (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Próiseas cripteagrafach a ghineann na príomhscaireanna agus a úsáidtear chun scaireanna eochair bhailíochtóra reatha nó nua a dháileadh ar na nóid i mbraisle.
- **[Ríomh ilpháirtí (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Gintear an eochair bhailíochtóra iomlán faoi rún ag baint úsáide as ríomhaireacht ilpháirtí. Ní bhíonn an eochair iomlán ar eolas ag aon oibreoir aonair – ní bhíonn ar eolas acu ach a gcuid féin di (a “scair”).
- **Prótacal comhtholal** - Roghnaíonn an prótacal comhthola nód amháin le bheith mar mholtóir an bhloic. Roinneann siad an bloc leis na nóid eile sa bhraisle, a chuireann a gcuid eochairscaireanna leis an síniú comhiomlán. Nuair a bheidh go leor príomhscaireanna comhiomlánaithe, moltar an bloc ar Ethereum.

Tá lamháltas lochtanna ionsuite ag bailíochtóirí dáilte agus is féidir leo leanúint ar aghaidh fiú má théann cuid de na nóid aonair as líne. Ciallaíonn sé seo go bhfuil an braisle athléimneach fiú má tharlaíonn sé go bhfuil cuid de na nóid laistigh de mailíseach nó leisciúil.

## Cásanna úsáide DVT {#dvt-use-cases}

Tá impleachtaí suntasacha ag DVT don tionscal geallta níos leithne:

### Geallta aonair {#solo-stakers}

Cumasaíonn DVT coinneáil neamh-chumhdaigh freisin trí ligean duit d’eochair bhailíochtóra a dháileadh thar nóid chianda agus an eochair iomlán a choinneáil go hiomlán as líne. Ciallaíonn sé seo nach gá go gcaithfeadh geallsealbhóirí baile eisíocaíocht a dhéanamh ar chrua-earraí, agus d’fhéadfadh dáileadh na bpríomhscaireanna cabhrú leo iad a neartú i gcoinne haiceanna féideartha.

### Glacadh mar sheirbhís (SaaS) {#saas}

Is féidir le hoibreoirí (cosúil le linnte geallta agus geallsealbhóirí institiúideacha) a bhainistíonn go leor bailíochóirí DVT a úsáid chun a riosca a laghdú. Tríd a mbonneagar a dháileadh, féadfaidh siad iomarcaíocht a chur lena n-oibríochtaí agus na cineálacha crua-earraí a úsáideann siad a éagsúlú.

Roinneann DVT freagracht as príomhbhainistíocht thar nóid iolracha, rud a chiallaíonn gur féidir roinnt costas oibriúcháin a roinnt freisin. Is féidir le DVT riosca oibriúcháin agus costais árachais do sholáthraithe geallta a laghdú freisin.

### Linnte geallála {#staking-pools}

De bharr socruithe caighdeánacha bailíochtóra, tá sé d’iallach ar sholáthraithe gealltanais agus ar sholáthróirí gealltanais leachta leibhéil éagsúla iontaoibhe a bheith acu ó oibritheoir aonair ós rud é go ndéantar gnóthachain agus caillteanais a shóisialú ar fud na linne. Bíonn siad ag brath freisin ar oibreoirí chun eochracha sínithe a chosaint mar, go dtí seo, ní raibh aon rogha eile ann dóibh.

Cé go ndéantar iarrachtaí go traidisiúnta riosca a scaipeadh trí gheallanna a dháileadh ar oibreoirí iolracha, bíonn geall suntasach á bhainisiú go neamhspleách ag gach oibreoir. Tá rioscaí ollmhóra ag baint le bheith ag brath ar oibreoir aonair má dhéanann siad tearcfheidhmíocht, má bhíonn aga neamhfhónaimh acu, má chuirtear isteach orthu nó má ghníomhaíonn siad go mailíseach.

Trí DVT a ghiaráil, laghdaítear an mhuinín a theastaíonn ó oibreoirí go suntasach. **Is féidir le linnte cur ar chumas oibritheoirí geallta a choinneáil gan eochracha bailíochóra a bheith de dhíth orthu** (toisc nach n-úsáidtear ach príomhscaireanna). Ligeann sé freisin gealltanais bhainistithe a dháileadh ar níos mó oibreoirí (m.sh., in ionad oibreoir aonair a bheith ag bainistiú 1000 bailíochtóir, cuireann DVT ar chumas na mbaliíochtóirí sin a bheith á reáchtáil le chéile ag oibreoirí iolracha). Cinnteoidh cumraíochtaí oibreoirí éagsúla go mbeidh na cinn eile fós in ann ianú má théann oibreoir amháin síos. Bíonn iomarcaíocht agus éagsúlú mar thoradh air seo as a dtagann feidhmíocht agus athléimneacht níos fearr, agus luach saothair á uasmhéadú ag an am céanna.

Buntáiste eile a bhaineann le muinín oibritheora aonair a íoslaghdú is ea gur féidir le linnte gealltanais rannpháirtíocht oibreoirí níos oscailte agus gan chead a cheadú. Trí seo a dhéanamh, is féidir le seirbhísí a riosca a laghdú agus tacú le dílárú Ethereum trí úsáid a bhaint as tacair oibreoirí coimeádta agus gan chead, mar shampla, trí pháirtithe leasmhara baile nó níos lú a chur le chéile le cinn níos mó.

## Míbhuntáistí féideartha a bhaineann le DVT a úsáid {#potential-drawbacks-of-using-dvt}

- **Comhpháirt bhreise** - má thugtar nód DVT isteach cuirfear páirt eile leis a d’fhéadfadh a bheith lochtach nó leochaileach. Bealach chun é seo a mhaolú ná saothrú le haghaidh ilfheidhmithe nód DVT, rud a chiallaíonn go bhfuil cliaint iolracha DVT (mar atá cliaint iolracha ann do na sraitheanna comhaontaithe agus forghníomhaithe).
- **Costais oibriúcháin** - toisc go ndéanann DVT an bailíochtóir a dháileadh idir páirtithe iolracha, tá gá le níos mó nóid chun oibriú in ionad nód amháin, rud a mhéadaíonn costais oibriúcháin.
- **Aga folaithe méadaithe féideartha** - ós rud é go n-úsáideann DVT prótacal comhthola chun comhthoil a bhaint amach idir na nóid iolracha a oibríonn bailíochtóir, d’fhéadfadh sé aga folaithe méadaithe a chruthú.

## Further Reading {#further-reading}

- [Sonraíochtaí bailíochtóra dáilte Ethereum (ardleibhéal)](https://github.com/ethereum/distributed-validator-specs)
- [Sonraíochtaí teicniúla dáilte bailíochtóra Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aip taispeána comhroinnte rúnda Shamir](https://iancoleman.io/shamir/)
