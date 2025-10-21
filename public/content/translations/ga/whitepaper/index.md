---
title: Páipéar Bán Ethereum
description: Páipéar tosaigh ar Ethereum, a foilsíodh in 2013 sular seoladh é.
lang: ga
sidebarDepth: 2
hideEditButton: true
---

# Páipéar Bán Ethereum {#ethereum-whitepaper}

_D’fhoilsigh Vitalik Buterin, bunaitheoir [Ethereum](/what-is-ethereum/) an páipéar tosaigh seo ar dtús in 2014, sular seoladh an tionscadal in 2015. Is fiú a thabhairt faoi deara go bhfuil Ethereum, cosúil le go leor tionscadal bogearraí foinse oscailte faoi stiúir an phobail, tar éis teacht chun cinn ó bunaíodh é._

_Cé go bhfuil sé roinnt blianta d'aois, cothabhåilimid an páipéar seo mar thagairt úsáideach agus mar léiriú cruinn ar Ethereum agus a fhís. Chun foghlaim faoi na forbairtí is déanaí ar Ethereum, agus conas a dhéantar athruithe ar an bprótacal, molaimid [an treoir seo](/learn/)._

[Ba cheart do thaighdeoirí agus d’acadóirí atá ag lorg leagan stairiúil nó canónach den pháipéar bán [ó Nollaig 2014] an PDF seo a úsáid.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Conradh Cliste den Chéad Ghlúin Eile agus Ardán Iarratais Díláraithe {#a-next-generation-smart-contract-and-decentralized-application-platform}

Is minic a luadh forbairt Satoshi Nakamoto ar Bitcoin in 2009 mar fhorbairt radacach in airgead agus airgeadra, agus é ar an gcéad sampla de shócmhainn dhigiteach nach bhfuil aon tacaíocht nó [luach intreach](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" aaige ag an am céanna ná aon eisitheoir nó rialtóir láraithe. Mar sin féin, tá cuid eile, agus níos tábhachtaí b'fhéidir, is cuid den turgnamh Bitcoin an teicneolaíocht blocshlabhra bhunúsach mar uirlis comhdhearcadh dáilte, agus tá aird ag aistriú go tapa chuig an ngné eile seo de Bitcoin. I measc na na bhfeidhmeanna eile a luaitear go coitianta le teicneolaíocht blocshlabhra tá úsáid a bhaint as sócmhainní digiteacha ar-bhlocshlabhra chun airgeadraí saincheaptha agus ionstraimí airgeadais a léiriú ("[boinn dhaite](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), úinéireacht feiste fisiceach bunúsach ("[airí cliste](https://en.bitcoin.it/wiki/Smart_Property)"), sócmhainní neamh-inmheasctha amhail ainmneacha fearainn ("[Namecoin](http://namecoin.org)"), chomh maith le feidhmchláir níos casta a bhaineann le sócmhainní digiteacha a bheith á rialú go díreach ag píosa cód a chuireann rialacha treallacha chun feidhme ("[conarthaí cliste](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") nó fiú blocshlabhra-bhunaithe” [eagraíochtaí uathrialaithe díláraithe](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO). Is é an rud atá beartaithe ag Ethereum a sholáthar ná blocshlabhra le teanga ríomhchláraithe Turing iomlán ionsuite le h úsáid chun "conarthaí" a chruthú le feidhmeanna aistrithe stáit treallach a ionchódú, rud a ligeann d'úsáideoirí aon cheann de na córais thuasluaite a chruthú, chomh maith le go leor eile nár samhlaíodh fós, go simplí tríd an loighic a scríobh i roinnt línte cód.

## Réamhrá le Bitcoin agus Coincheapa Reatha {#introduction-to-bitcoin-and-existing-concepts}

### Stair {#history}

Tá coincheap airgeadra digiteach díláraithe, chomh maith le feidhmchláir mhalartacha cosúil le clárlanna maoine, ann le blianta. Chuir prótacail r-airgead gan ainm na 1980í agus na 1990idí, a bhí ag brath go príomha ar primitíbheach cripteagrafach ar a dtugtar dalladh Chaumian, airgeadra ardleibhéal príobháideachta ar fáil, ach theip ar na prótacail den chuid is mó aon dul chun cinn a dhéanamh mar gheall go raibh siad ag brath ar idirghabhálaí láraithe. Sa bhliain 1998, tháinig [b-money](http://www.weidai.com/bmoney.txt) de chuid Wei Dai, an chéad mholadh a thug isteach an smaoineamh airgead a chruthú trí puzail ríomhaireachtúla a réiteach chomh maith. comhdhearcadh díláraithe, ach ní raibh mórán sonraí sa togra maidir le conas a d’fhéadfaí comhdhearcadh díláraithe a chur chun feidhme i ndáiríre. In 2005, thug Hal Finney isteach coincheap de “[cruthúnais oibre in-athúsáidte](https://nakamotoinstitute.org/finney/rpow/)", córas a úsáideann smaointe ó b-airgead mar aon le puzail Hashcash ríomha deacair Adam Back le cruthú coincheap a chruthú e haghaidh criptea-airgeadra, ach arís eile theip ar an idéal trí bheith ag brath ar ríomhaireacht iontaofa mar chúl. Sa bhliain 2009, chuir Satoshi Nakamoto airgeadra dáilte i bhfeidhm den chéad uair go praiticiúil, agus é ag comhcheangal buneilimintí seanbhunaithe chun úinéireacht a bhainistiú tríd chripteagrafaíocht eochrach phoiblí le halgartam comhaontaithe chun súil a choinneáil ar cé leis na boinn, ar a dtugtar 'cruthúnas oibre'.

Bhí an mheicníocht taobh thiar de chruthúnas oibre chun cinn sa spás toisc gur réitigh sé dhá fhadhb ag an am céanna. Ar an gcéad dul síos, sholáthraigh sé algartam comhdhearcaidh simplí agus measartha éifeachtach, rud a ligeann do nóid sa líonra aontú le chéile ar shraith nuashonruithe canónacha ar staid mhórleabhair Bitcoin. Ar an dara dul síos, chuir sé meicníocht ar fáil chun iontráil saor in aisce sa phróiseas comhthola a cheadú, chun an fhadhb pholaitiúil a réiteach maidir le cinneadh a dhéanamh cé a rachaidh i bhfeidhm ar an gcomhdhearcadh, agus ionsaithe sibil a chosc ag an am céanna. Déanann sé é seo trí bhacainn fhoirmiúil ar rannpháirtíocht a bhunú, amhail an ceanglas a bheith cláraithe mar aonán uathúil ar liosta áirithe, le bacainn eacnamaíoch - tá meáchan nód aonair sa phróiseas vótála comhthola comhréireach go díreach leis an gcumhacht ríomhaireachta. a thugann an nód. Ó shin i leith, tá cur chuige eile molta ar a dtugtar _cruthúnas-gill_, lena ríomhtar meáchan nóid mar rud atá comhréireach lena shealúchais airgeadra agus nach acmhainní ríomhaireachtúla iad; tá an plé ar thuillteanais choibhneasta an dá chur chuige lasmuigh de raon feidhme an pháipéir seo ach ba chóir a thabhairt faoi deara gur féidir an dá chur chuige a úsáid mar chnámh droma criptea-airgeadra.

### Bitcoin Mar Chóras Idirthréimhse Staide {#bitcoin-as-a-state-transition-system}

![Aistriú staide Ethereum](./ethereum-state-transition.png)

Ón taobh teicniúil de, is féidir smaoineamh ar mhórleabhar criptea-airgeadra cosúil le Bitcoin mar chóras aistrithe staide, áit a bhfuil "staid" comhdhéanta de stádas úinéireachta na bitcoins go léir atá ann cheana féin agus "feidhm aistrithe staide" a thógann staid. agus idirbheart agus a aschuireann staid mar thoradh. I ngnáthchóras baincéireachta, mar shampla, is clár comhardaithe é an staid, is éard is idirbheart ann ná iarratas chun $X a aistriú ó A go B, agus laghdaíonn an fheidhm aistrithe staide an luach i gcuntas A faoi $X agus méadaítear an luach i gcuntas B. cuntas le $X. Má tá níos lú ná $X i gcuntas A ar an gcéad dul síos, filleann an fheidhm aistrithe satide earráid. Mar sin, is féidir sainmhíniú foirmiúil a thabhairt ar:

```
APPLY(S,TX) -> S' or ERROR
```

Sa chóras baincéireachta atá sainmhínithe thuas:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ach:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Is éard atá sa "staid" in Bitcoin bailiúchán na monaí go léir (go teicniúil, "aschuir idirbheart neamhchaite" nó UTXO) atá buailte agus nár caitheadh ​​fós, agus tá ainmníocht agus úinéir ag gach UTXO (arna shainiú ag seoladh 20 beart a go bunúsach is eochair phoiblí chripteagrafach í<sup>[fn1](#notes)</sup>). Tá ionchur amháin nó níos mó in idirbheart, le gach ionchur ina bhfuil tagairt do UTXO atá ann cheana agus síniú cripteagrafach arna tháirgeadh ag an eochair phríobháideach a bhaineann le seoladh an úinéara, agus aschur amháin nó níos mó, le gach aschur ina bhfuil UTXO nua le cur leis an staid.

An fheidhm trasdula stáit `APPLY(S,TX) -> Is féidir S'` a shainmhíniú go garbh mar seo a leanas:

<ol>
  <li>
    I gcás gach ionchur i <code>TX</code>:
    <ul>
    <li>
        Mura bhfuil an UTXO dá dtagraítear in <code>S</code>, cuir earráid ar ais.
    </li>
    <li>
        Mura dtagann an síniú a cuireadh ar fáil le húinéir an UTXO, cuir earráid ar ais.
    </li>
    </ul>
  </li>
  <li>
    Más lú suim ainmníochtaí gach UTXO ionchuir ná suim ainmníochtaí gach aschuir UTXO, cuir earráid ar ais.
  </li>
  <li>
    Seol <code>S</code> ar ais le gach ionchur UTXO bainte amach agus gach aschur UTXO curtha leis.
  </li>
</ol>

Cuireann an chéad leath den chéad chéim cosc ​​ar sheoltóirí idirbheart monaí nach bhfuil ann a chaitheamh, cuireann an dara leath den chéad chéim cosc ​​ar sheoltóirí idirbheart monaí daoine eile a chaitheamh, agus cuireann an dara céim caomhnú luacha i bhfeidhm. Chun é seo a úsáid le haghaidh íocaíochta, is é seo a leanas an prótacal. Cuir i gcás go bhfuil Alice ag iarraidh 11.7 BTC a sheoladh chuig Bob. Ar an gcéad dul síos, lorgóidh Alice tacar UTXO atá ar fáil agus atá ar úinéireacht aici a bhfuil suas le 11.7 BTC ar a laghad ann. Go réadúil, ní bheidh Alice in ann 11.7 BTC a fháil go díreach; abair gurb é an ceann is lú is féidir léi a fháil ná 6+4+2=12. Cruthaíonn sí idirbheart ansin leis na trí ionchur agus dhá aschur sin. Beidh an chéad aschur 11.7 BTC le seoladh Bob mar úinéir, agus is é an dara aschur an "sóinseáil" 0.3 BTC agus Alice í féin mar úinéir.

### Mianadóireacht {#mining}

![Bloic Ethereum](./ethereum-blocks.png)

Dá mbeadh teacht againn ar sheirbhís láraithe iontaofa, bheadh ​​sé éasca an córas seo a chur i bhfeidhm; d'fhéadfaí é a chódú go díreach mar a thuairiscítear, ag baint úsáide as tiomántán crua an fhreastalaí láraithe chun súil a choinneáil ar an staid. Mar sin féin, le Bitcoin táimid ag iarraidh córas airgeadra díláraithe a thógáil, agus mar sin beidh orainn an córas idirbheart staide a chomhcheangal le córas comhthola chun a chinntiú go n-aontaíonn gach duine ar ord na n-idirbheart. Éilíonn próiseas comhdhearcadh díláraithe Bitcoin nóid sa líonra iarracht leanúnach a dhéanamh ar phacáistí idirbheart ar a dtugtar "bloic" a tháirgeadh. Tá sé i gceist go gcruthóidh an líonra thart ar bhloc amháin gach deich nóiméad, agus beidh stampa ama, nonce, tagairt (i. e. hais) an bhloic roimhe seo agus liosta de na hidirbhearta go léir a tharla ón mbloc roimhe seo, i ngach bloc. Le himeacht ama, cruthaíonn sé seo "blocshlabhra" leanúnach, atá ag fás i gcónaí, a nuashonraítear i gcónaí chun an staid is déanaí den mhórleabhar Bitcoin a léiriú.

Seo a leanas an t-algartam chun seiceáil an bhfuil bloc bailí, arna chur in iúl sa pharaidím seo:

1. Seiceáil an bhfuil an bloc a ndearna an bloc tagairt dó roimhe seo ann agus an bhfuil sé bailí.
2. Cinntigh go bhfuil stampa ama an bhloic níos mó ná stampa ama an bhloic roimhe seo<sup>[fn2](#notes)</sup> agus níos lú ná 2 uair as seo amach
3. Seiceáil go bhfuil an cruthúnas-oibre ar an mbloc bailí.
4. Bíodh `S[0]` mar an staid ag deireadh an bhloic roimhe seo.
5. Abair gurb é `TX` liosta idirbhearta an bhloic le hidirbhearta `n`. I gcás gach `i` i `0...n-1`, socraigh `S[i+1] = APPLY(S[i],TX[i])` Má sheolann aon iarratas earráid ar ais, scoir agus seol ar ais bréagach.
6. Aischur fíor, agus cláraigh `S[n]` mar an staid ag deireadh an bhloic seo.

Go bunúsach, ní mór do gach idirbheart sa bhloc aistriú bailí staide a sholáthar ón stát canónach a bhí ann sular cuireadh an t-idirbheart i gcrích go staid nua éigin. Tabhair faoi deara nach bhfuil an staid códaithe sa bhloc ar bhealach ar bith; níl ann ach asbhaint amháin atá le cuimhneamh ag an nód bailíochtaithe agus ní féidir é a ríomh (go slán) d'aon bhloc ach tosú ón stát geineasais agus gach idirbheart i ngach bloc a chur i bhfeidhm go seicheamhach. Ina theannta sin, tabhair faoi deara go bhfuil an t-ordú ina n-áirítear an mianadóir idirbhearta isteach sa bhloc ábhartha; má tá dhá idirbheart A agus B i mbloc den sórt sin go gcaitheann B UTXO cruthaithe ag A, ansin beidh an bloc bailí má thagann A roimh B ach ní ar shlí eile.

Is é an coinníoll bailíochta amháin atá sa liosta thuas nach bhfuil le fáil i gcórais eile ná an ceanglas maidir le "cruthúnas-oibre". Is é an coinníoll beacht ná go gcaithfidh hais dúbailte-SHA256 gach bloic, a láimhseáiltear mar uimhir 256-ghiotán, a bheith níos lú ná sprioc arna choigeartú go dinimiciúil, atá thart ar 2<sup>187</sup> ag am scríofa. Is é an cuspóir atá leis seo cruthú bloic a dhéanamh “deacair” go ríomhaireachtúil, agus ar an gcaoi sin cosc ​​a chur ar ionsaitheoirí sibil an blocshlabhra iomlán a athdhéanamh ina bhfabhar. Toisc go bhfuil SHA256 deartha le bheith ina fheidhm bhréige randamach nach féidir a thuar go hiomlán, is é an t-aon bhealach le bloc bailí a chruthú ná triail agus earráid, an nonce a mhéadú arís agus arís eile agus féachaint an bhfuil an hais nua ag teacht leis.

Ag an sprioc reatha de ~2 <sup>187</sup>, caithfidh an líonra meán de ~2<sup>69</sup> iarracht a dhéanamh sula n-aimsítear bloc bailí; go ginearálta, déanann an líonra an sprioc a athchalabrú gach 2016 bloc ionas go mbeidh ar an meán bloc nua a tháirgtear ag nód éigin sa líonra gach deich nóiméad. Chun mianadóirí a chúiteamh as an obair ríomhaireachtúil seo, tá mianadóir gach bloic i dteideal idirbheart a chur san áireamh a thugann 25 BTC dóibh féin as tada. Ina theannta sin, má tá ainmníocht iomlán níos airde ag aon idirbheart ina ionchuir ná ina aschuir, téann an difríocht chuig an mianadóir mar "táille idirbhirt". Dála an scéil, is é seo an t-aon mheicníocht trína n-eisítear BTC; ní raibh boinn ar bith sa staid gheineasais.

D'fhonn tuiscint níos fearr a fháil ar chuspóir na mianadóireachta, déanaimis scrúdú ar cad a tharlaíonn i gcás ionsaitheoir mailíseach. Ós rud é go n-aithnítear go bhfuil cripteagrafaíocht bhunúsach Bitcoin slán, díreoidh an t-ionsaitheoir ar chuid amháin den chóras Bitcoin nach bhfuil cosanta ag cripteagrafaíocht go díreach: ord na n-idirbheart. Tá straitéis an ionsaitheora simplí:

1. Seol 100 BTC chuig ceannaí mar mhalairt ar tháirge éigin (b’fhearr earra digiteach seachad-tapa)
2. Fan le seachadadh an táirge
3. Idirbheart eile a tháirgeadh ag seoladh an 100 BTC céanna chuige féin
4. Déanann iarracht a chur ina luí ar an líonra gurb é an idirbheart chuige féin an ceann a tháinig ar dtús.

Nuair a bheidh céim (1) déanta, tar éis cúpla nóiméad áireoidh mianadóir an t-idirbheart i mbloc, abair bloc uimhir 270000. Tar éis thart ar uair an chloig, cuirfear cúig bhloc eile leis an slabhra tar éis an bhloic sin, agus beidh gach ceann de na bloic sin ag díriú go hindíreach ar an idirbheart agus mar sin "á dhearbhú". Ag an bpointe seo, glacfaidh an ceannaí leis an íocaíocht mar atá críochnaithe agus seachadfaidh sé an táirge; ós rud é go bhfuilimid ag glacadh leis gur leas digiteach é seo, tá seachadadh láithreach ann. Anois, cruthaíonn an t-ionsaitheoir idirbheart eile a sheolann an 100 BTC chuige féin. Mura ndéantar ach an t-ionsaitheoir a scaoileadh isteach sa bhfiántas, ní dhéanfar an t-idirbheart a phróiseáil; déanfaidh mianadóirí iarracht `APPLY(S,TX)` a rith agus tabharfaidh siad faoi deara go n-ídíonn `TX` UTXO nach bhfuil sa staid níos mó. Mar sin ina ionad sin, cruthaíonn an t-ionsaitheoir "forc" den bhlocshlabhra, ag tosú trí leagan eile den bhloc 270000 a mhianadóireacht a dhíríonn ar an mbloc céanna 269999 mar thuismitheoir ach leis an idirbheart nua in ionad an tseanchinn. Toisc go bhfuil na sonraí bloc difriúil, ní mór an cruthúnas oibre a athdhéanamh. Ina theannta sin, tá hais difriúil ag leagan nua an ionsaitheora de bhloc 270000, mar sin ní dhíríonn na bloic bunaidh 270001 go 270005" air; dá bhrí sin, tá an slabhra bunaidh agus slabhra nua an ionsaitheora go hiomlán ar leithligh. Is é an riail i bhforc go nglactar leis gurb é an blocshlabhra is faide an fhírinne, agus mar sin oibreoidh mianadóirí dlisteanacha ar an slabhra 270005 agus an t-ionsaitheoir ina n-aonar ag obair ar an slabhra 270000. D'fhonn go mbeidh an t-ionsaitheoir ábalta an blocshlabhra is faide a dhéanamh as a bhlocshlabhra féin, bheadh ​​níos mó cumhachta ríomhaireachta de dhíth air ná an chuid eile den líonra le chéile chun breith suas (dá bhrí sin, "ionsaí 51%").

### Crainn Merkle {#merkle-trees}

![SPV i Bitcoin](./spv-bitcoin.png)

_Ar chlé: is leor líon beag nóid i gcrann Merkle a chur i láthair le cruthúnas a thabhairt ar bhailíocht brainse._

_Ar dheis: beidh neamh-chomhsheasmhacht áit éigin suas an slabhra mar thoradh ar aon iarracht ar aon chuid den chrann Merkle a athrú._

Gné thábhachtach de inscálaitheacht de Bitcoin ná go bhfuil an bloc stóráilte i struchtúr sonraí il-leibhéil. Níl in "hais" bloic i ndáiríre ach hais cheanntáisc an bhloic, píosa thart ar 200-beart sonraí ina bhfuil an stampa ama, nonce, hais bloic roimhe sin agus an hais fréimhe de struchtúr sonraí ar a dtugtar an crann Merkle a stóráileann gach idirbheart sa bhloc. Is cineál crann dénártha é crann Merkle, comhdhéanta de thacar nód le líon mór nóid duille ag bun an chrainn ina bhfuil na sonraí bunúsacha, tacar de nóid idirmheánacha ina bhfuil gach nód ina hais dá bheirt leanaí, agus ar deireadh nód fréimhe amháin, déanta freisin as hais a bheirt leanaí, a ionadaíonn do "bharr" an chrainn. Is é cuspóir an chrainn Merkle seachadadh na sonraí i mbloc a cheadú de réir a chéile: ní féidir le nód ach ceanntásc an bhloic a íoslódáil ó fhoinse amháin, an chuid bheag den chrann atá ábhartha dóibh ó fhoinse eile, agus fós a bheith cinnte go bhfuil na sonraí go léir ceart. Is é an fáth a n-oibríonn sé seo ná go bhfuil haiseanna ag iomadú aníos: má dhéanann úsáideoir mailíseach iarracht babhtáil in idirbheart falsa isteach ag bun crann Merkle, beidh an t-athrú seo ina chúis le hathrú ar an nód thuas, agus ansin athrú ar an nód os a chionn sin., ag athrú ar deireadh an fhréamh an chrainn agus dá bhrí sin an hais an bhloc, is cúis leis an prótacal é a chlárú mar bhloc go hiomlán difriúil (beagnach cinnte le cruthúnas-oibre neamhbhailí).

D’fhéadfaí a mhaíomh go bhfuil prótacal crann Merkle riachtanach d’inbhuanaitheacht fhadtéarmach. Glacann "nód iomlán" sa líonra Bitcoin, ceann a stórálann agus a phróiseálann gach bloc iomlán, thart ar 15 GB de spás diosca sa líonra Bitcoin ó Aibreán 2014, agus tá sé ag fás le níos mó ná gigibheart in aghaidh na míosa. Faoi láthair, tá sé seo inmharthana do roinnt ríomhairí deisce ach níl do fhóin, agus ball ní bheidh ach gnólachtaí agus lucht caitheamh aimsire in ann a bheith rannpháirteach. Ceadaíonn prótacal ar a dtugtar "fíorú íocaíochta simplithe" (SPV) d'aicme eile nód a bheith ann, ar a dtugtar "nóid éadroma", a íoslódáil na ceanntásca bloc, an cruthúnas-oibre ar na ceanntásca bloc a fhíorú, agus ansin na "craobhacha" amháin a bhaineann le hidirbhearta a bhaineann leo a íoslódáil. Ligeann sé seo do nóid éadrom a chinneadh le ráthaíocht láidir slándála cad é stádas aon idirbheart Bitcoin, agus a n-iarmhéid reatha, gan ach cuid an-bheag den blocshlabhra iomlán a íoslódáil.

### Feidhmchláir Bhlocshlabhra Malartacha {#alternative-blockchain-applications}

Tá stair fhada ag baint le glacadh le bunsmaoineamh an bhlocshlabhra a lena chur i bhfeidhm ar choincheapa eile. Sa bhliain 2005, tháinig Nick Szabo amach leis an gcoincheap "[teidil maoine slán le húdarás úinéara](https://nakamotoinstitute.org/secure-property-titles/)", doiciméad a chuireann síos ar conas " le dul chun cinn nua i dteicneolaíocht na mbunachar sonraí macasamhlaithe" go mbeifear in ann córas atá bunaithe ar bhlocshlabhra chun clár a stóráil de na daoine is leis an talamh, agus cruthófar creat ilchasta lena n-áirítear coincheapa mar áitribh tí, seilbh chodarsnach agus Seoirseach. cáin talún. Ar an drochuair, ní raibh aon chóras bunachar sonraí macasamhail éifeachtach ar fáil ag an am, agus mar sin níor cuireadh an prótacal i bhfeidhm go praiticiúil. Tar éis 2009, áfach, a luaithe a forbraíodh comhdhearcadh díláraithe Bitcoin thosaigh roinnt feidhmchlár eile ag teacht chun cinn go tapa.

- **Namecoin** - cruthaithe in 2010 - is fearr cur síos ar [Namecoin](https://namecoin.org/) mar bhunachar sonraí clárúcháin ainmneacha díláraithe. I bprótacail dhíláraithe cosúil le Tor, Bitcoin agus BitMessage, bíonn bealach éigin de dhíth chun cuntais a aithint ionas gur féidir le daoine eile idirghníomhú leo, ach i ngach réiteach atá ann cheana féin is é an t-aon aitheantóir atá ar fáil ná hais bréige randamach cosúil le `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Go hidéalach, ba mhaith le daoine cuntas le hainm cosúil le "george" a bheith acu. Mar sin féin, is í an fhadhb atá ann, más féidir le duine amháin cuntas darb ainm "george" a chruthú ansin is féidir le duine eile an próiseas céanna a úsáid chun "George" a chlárú dóibh féin freisin agus iad a phearsanú. Is é an réiteach amháin paraidím chéad-go-comhad, i gcás ina n-éireoidh leis an chéad chláraitheoir agus go mainneoidh an dara ceann - fadhb a oireann go foirfe do phrótacal comhdhearcadh Bitcoin. Is é Namecoin an córas clárúcháin ainmneacha is sine, agus is rathúla, a úsáideann smaoineamh den sórt sin.
- **Monaí daite** - is é cuspóir [ monaí daite](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) feidhmiú mar phrótacal chun ligean do dhaoine a n-airgeadraí digiteacha féin a chruthú - nó, i gcás tábhachtach fánach airgeadra le naonad amháin, comharthaí digiteacha, ar bhlocshlabhra Bitcoin. I bprótacal na monaí daite, "eisíonn" ceann amháin airgeadra nua trí dhath a shannadh go poiblí do Bitcoin UTXO ar leith, agus sainmhíníonn an prótacal go hathchúrsach dath UTXO eile a bheith mar an gcéanna le dath na n-ionchur a chaith an t-idirbheart a chruthaigh iad. (Bíonn roinnt rialacha speisialta i bhfeidhm i gcás ionchur dathanna measctha). Ligeann sé seo d'úsáideoirí sparáin a chothabháil nach bhfuil iontu ach UTXO de dhath ar leith agus iad a sheoladh timpeall cosúil le bitcoins rialta, ag dul siar tríd an mblocshlabhra chun dath aon UTXO a fhaigheann siad a chinneadh.
- **Meiteamhonaí** - is é an smaoineamh atá taobh thiar de mheiteamhona ná prótacal a bheith ann a chónaíonn ar bharr Bitcoin, ag baint úsáide as idirbhearta Bitcoin chun idirbhearta meiteamhona a stóráil ach a bhfuil feidhm aistrithe staide eile aige, `APPLY'`. Toisc nach féidir leis an bprótacal metacoin idirbhearta neamhbhailí metacoin a chosc ó bheith le feiceáil i mblocshlabhra Bitcoin, cuirtear riail leis má sheolann `APPLY'(S,TX)` earráid ar ais, go réamhshocrú phrótacal `APPLY'( S,TX) = S`. Soláthraíonn sé seo meicníocht éasca chun prótacal criptea-airgeadra treallach a chruthú, a bhféadfadh gnéithe casta nach féidir a chur i bhfeidhm laistigh de Bitcoin féina bheith aige, ach le costas forbartha an-íseal ós rud é go bhfuil castachtaí mianadóireachta agus líonraithe á láimhseáil cheana féin ag an bprótacal Bitcoin. Baineadh úsáid as meiteamhonaí chun aicmí áirithe conarthaí airgeadais, clárú ainmneacha agus malartú díláraithe a chur i bhfeidhm.

Mar sin, go ginearálta, tá dhá chur chuige i dtreo prótacal comhdhearcadh a thógáil: líonra neamhspleách a thógáil, agus prótacal a thógáil ar bharr Bitcoin. Is deacair an cur chuige a bhí ann roimhe seo a chur i bhfeidhm, cé go n-éiríonn go réasúnta leis i gcás iarratais ar nós Namecoin; ní mór do gach feidhmiú aonair blocshlabhra neamhspleách a thosú, chomh maith leis an gcód aistrithe agus líonraithe staide riachtanacha go léir a thógáil agus a thástáil. Ina theannta sin, tuaraimid go leanfaidh an tsraith iarratas ar theicneolaíocht chomhdhearcaidhl díláraithe dáileadh dlí cumhachta ina mbeadh formhór mór na n-iarratas ró-bheag chun a mblocshlabhra féin a chosaint, agus tugaimid faoi deara go bhfuil aicmí móra d’iarratais díláraithe ann, go háirithe eagraíochtaí uathrialaithe díláraithe., ar gá dóibh idirghníomhú lena chéile.

Ar an láimh eile, tá an locht ar an gcur chuige atá bunaithe ar Bitcoin nach mbíonn ghnéithe fíoraithe íocaíochta simplithe Bitcoin mar oidhreacht aige. Oibríonn SPV do Bitcoin toisc go bhféadfaidh sé doimhneacht blocshlabhra a úsáid mar sheachvótálaí bailíochta; ag pointe éigin, a luaithe a théann sinsir idirbhirt siar fada go leor, tá sé sábháilte a rá go raibh siad mar chuid den staid go dlisteanach. Ar an láimh eile, ní féidir le meitea-phrótacail atá bunaithe ar blocshlabhra iallach a chur ar an blocshlabhra gan idirbhearta nach bhfuil bailí laistigh de chomhthéacs a bprótacal féin a áireamh. Mar sin, bheadh ​​gá le meitea-phrótacal SPV a chur i bhfeidhm go hiomlán slán scanadh siar an bealach ar fad go dtí tús bhlocshlabhra Bitcoin chun a chinneadh an bhfuil idirbhearta áirithe bailí nó nach bhfuil. Faoi láthair, tá gach feidhmiúchán "éadrom" de mheiteashonraí bunaithe ar Bitcoin ag brath ar fhreastalaí iontaofa chun na sonraí a sholáthar, is féidir a mhaíomh go bhfuil toradh an-fho-optamach go háirithe nuair is é ceann de phríomhchuspóirí criptea-airgeadra deireadh a chur leis an ngá atá le muinín.

### Scriptiú {#scripting}

Fiú gan aon bhreisithe, éascaíonn an prótacal Bitcoin i ndáiríre leagan lag de choincheap "conarthaí cliste". Is féidir le UTXO i Bitcoin a bheith faoi úinéireacht ní hamháin le heochair phoiblí, ach freisin le script níos casta a chuirtear in iúl i dteanga cláir shimplí atá bunaithe ar chruach. Sa pharaidím seo, ní mór do UTXO sonraí a sholáthar a shásaíonn an script i gcaiteachas idirbheart. Go deimhin, cuirtear fiú an mheicníocht bhunúsach úinéireachta eochair phoiblí i bhfeidhm trí script: glacann an script síniú cuar éilipseach mar ionchur, fíoraíonn sé é i gcoinne an idirbhirt agus an seoladh ar leis an UTXO é, agus filleann sé 1 má éiríonn leis an bhfíorú agus 0 ar shlí eile. Tá scripteanna eile, níos casta, ann do chásanna úsáide breise éagsúla. Mar shampla, is féidir script a thógáil a éilíonn sínithe ó dhá cheann as trí eochair phríobháideacha áirithe le bailíochtú ("multisig"), socrú atá úsáideach do chuntais chorparáideacha, do chuntais shábháilte choigiltis agus do roinnt cásanna eascró ceannaithe. Is féidir scripteanna a úsáid freisin chun deolchairí a íoc le haghaidh réitigh ar fhadhbanna ríomhaireachtúla, agus is féidir fiú script a thógáil a deir rud éigin cosúil le "Is leatsa an Bitcoin UTXO seo más féidir leat cruthúnas SPV a sholáthar gur sheol tú idirbheart Dogecoin den ainmníocht seo chugam", go bunúsach a cheadaíonn malartú tras-criptea-airgeadra díláraithe.

Mar sin féin, tá roinnt teorainneacha tábhachtacha ag an teanga scriptithe mar a chuirtear i bhfeidhm é i Bitcoin:

- **Easpa iomláine Turing** - is é sin le rá, cé go bhfuil fo-thacar mór ríofa a dtacaíonn an teanga scriptithe Bitcoin leis, ní thacaíonn sé le gach rud. Is é an príomhchatagóir atá ar iarraidh ná lúba. Déantar é seo chun lúba éigríochta a sheachaint le linn fíorú idirbheart; go teoiriciúil is constaic insroichte é do ríomhchláraitheoirí scripte, mar is féidir aon lúb a insamhlú ach an bunchód a athrá go minic le ráiteas, ach bíonn scripteanna an-neamhéifeachtúil ó thaobh spáis de mar thoradh air. Mar shampla, is dócha go mbeadh gá le 256 babhta iolraithe arís agus arís eile chun algartam sínithe cuar éilips eile a chur i bhfeidhm, iad ar fad san áireamh sa chód ina n-aonar.
- **Luach-daille** - níl aon bhealach ag script UTXO chun smacht mínghlan a sholáthar ar an méid is féidir a aistarraingt. Mar shampla, cás úsáide cumhachtach amháin de chonradh oracail is ea conradh fálaithe, áit ar chuir A agus B luach $1000 BTC isteach agus tar éis 30 lá seolann an script luach $1000 BTC chuig A agus an chuid eile chuig B. Bheadh ​​gá le h oracal luach 1 BTC a chinneadh i USD, ach fiú ansin is feabhas ollmhór é i dtéarmaí iontaobhais agus riachtanas bonneagair thar na réitigh láraithe go hiomlán atá ar fáil anois. Mar sin féin, toisc go bhfuil UTXO iomlán-nó-tada, is é an t-aon bhealach chun é seo a bhaint amach trí haiceáil an-neamhéifeachtúil go leor UTXO d'ainmníochtaí éagsúla a bheith ann (m. sh. UTXO amháin de 2<sup>k</sup> in aghaidh gach k suas go dtí 30) agus an t-oracal ag piocadh cé acu UTXO le cur chuig A agus cé acu chuig B.
- **Easpa staide** - is féidir UTXO a chaitheamh nó gan é a chaitheamh; níl aon deis ann conarthaí nó scripteanna ilchéime a choimeádann aon staid inmheánach eile níos faide ná sin. Dá bharr sin bíonn sé deacair conarthaí roghanna ilchéime a dhéanamh, tairiscintí malartaithe díláraithe nó prótacail gealltanas cripteagrafach dhá chéim (riachtanach le haghaidh deolchairí ríomhaireachtúla slána). Ciallaíonn sé freisin nach féidir UTXO a úsáid ach amháin chun conarthaí simplí, aonuaire a thógáil nach bhfuil níos casta ná conarthaí “staidiúla” cosúil le heagraíochtaí díláraithe, agus déanann sé deacair meiteaphrótacail a chur i bhfeidhm. Ciallaíonn staid dhénártha in éineacht le daille luach freisin go bhfuil iarratas tábhachtach eile, teorainneacha a tharraingt siar, dodhéanta.
- **Daille-Blocshlabhra** - Tá UTXO dall ar shonraí blocshlabhra ar nós an nonce, an stampa ama agus hais an bhloic roimhe seo. Cuireann sé seo teorainn mhór le feidhmchláir sa chearrbhachas, agus go leor catagóirí eile, trí fhoinse randamachta a d’fhéadfadh a bheith luachmhar a bhaint den teanga scripte.

Mar sin, feicimid trí chur chuige maidir le hiarratais fhorbartha a thógáil ar bharr criptea-airgeadra: blocshlabhra nua a thógáil, scriptiú a úsáid ar bharr Bitcoin, agus meitea-phrótacal a thógáil ar bharr Bitcoin. Ceadaíonn tógáil bhlocshlabhra nua saoirse neamhtheoranta maidir le tacar gnéithe a thógáil, ach ar chostas am forbartha, obair chrua agus slándáil. Tá sé éasca úsáid scripte a chur i bhfeidhm agus a chaighdeánú, ach tá sé an-teoranta ina chumais, agus tá lochtanna in inscálaithe ag baint le meiteaphrótacail, cé go bhfuil siad éasca. Le Ethereum, tá sé ar intinn againn creat malartach a thógáil a sholáthraíonn gnóthachain níos mó fós ar mhaithe le héascaíocht forbartha chomh maith le hairíonna cliant éadroma níos láidre, agus ag an am céanna a ligeann d'iarratais timpeallacht eacnamaíoch agus slándáil blocshlabhra a roinnt.

## Ethereum {#ethereum}

Is í aidhm Ethereum prótacal eile a chruthú chun feidhmchláir dhíláraithe a thógáil, ag soláthar tacar éagsúil trádála a chreidimid a bheidh an-úsáideach le haghaidh aicme mór d'fheidhmchláir dhíláraithe, le béim ar leith ar chásanna ina bhfuil am forbartha tapa, slándáil do dhaoine beaga agus do fheidhmchláir a úsáidtear go hannamh, agus cumas feidhmchláir éagsúla idirghníomhú go han-éifeachtach. Déanann Ethereum é seo tríd an gciseal bunúsach teibí deiridh a thógáil: blocshlabhra le teanga ríomhchlárúcháin iomlán Turing-tógtha, a ligeann do dhuine ar bith conarthaí cliste agus feidhmchláir dhíláraithe a scríobh inar féidir leo a rialacha treallacha féin a chruthú maidir le húinéireacht, formáidí idirbhirt agus feidhmeanna aistrithe staide. Is féidir leagan lom de Namecoin a scríobh in dhá líne de chód, agus is féidir prótacail eile cosúil le hairgeadraí agus córais cháile a chur isteach faoi bhun fiche. Is féidir conarthaí cliste, "boscaí" cripteagrafacha ina bhfuil luach agus nach scaoilfidh siad ach amháin má chomhlíontar coinníollacha áirithe, a thógáil freisin ar bharr an ardáin, le cumhacht i bhfad níos mó ná mar a thairgeann scripteáil Bitcoin mar gheall ar chumhachtaí breise Turing-iomláine, feasacht ar luach, feasacht bhlocshlabhra agus staid.

### Cuntais Ethereum {#ethereum-accounts}

In Ethereum, tá an staid comhdhéanta de rudaí ar a dtugtar "cuntais", agus tá seoladh 20 beart ag gach cuntas agus aistrithe staide mar aistrithe díreacha luacha agus faisnéise idir cuntais. Tá ceithre réimse i gcuntas Ethereum:

- An **nonce**, áiritheoir a úsáidtear chun a chinntiú nach féidir gach idirbheart a phróiseáil ach uair amháin
- **iarmhéid éitir** reatha an chuntais
- **cód conartha** an chuntais, más ann dó
- **Stóras** an chuntais (folamh de réir réamhshocraithe)

Is é "Éitear" príomh-bhreosla criptithe inmheánach Ethereum, agus úsáidtear é chun táillí idirbhirt a íoc. Go ginearálta, tá dhá chineál cuntais ann: **cuntais faoi úinéireacht sheachtrach**, arna rialú ag eochracha príobháideacha, agus **cuntais chonartha**, arna rialú ag a gcód conartha. Níl aon chód ag cuntas faoi úinéireacht sheachtrach, agus is féidir le duine teachtaireachtaí a sheoladh ó chuntas faoi úinéireacht sheachtrach trí idirbheart a chruthú agus a shíniú; i gcuntas conartha, gach uair a fhaigheann cuntas an chonartha teachtaireacht a ghníomhaíonn a chód, rud a ligeann dó léamh agus scríobh chuig an stóráil inmheánach agus teachtaireachtaí eile a sheoladh nó conarthaí a chruthú ar a seal.

Tabhair faoi deara nár cheart "conarthaí" in Ethereum a fheiceáil mar rud ar cheart "a chomhlíonadh" nó "cloí leo"; in áit sin, tá siad níos mó cosúil le "gníomhairí uathrialacha" a chónaíonn taobh istigh de thimpeallacht reatha Ethereum, i gcónaí ag rith píosa sonrach cóid le "priocadh" ó theachtaireacht nó idirbheart, agus smacht díreach acu ar a n-iarmhéid éitirr féin agus a n-eochair féin / stór luach chun súil a choinneáil ar athróga leanúnacha.

### Teachtaireachtaí agus Idirbhearta {#messages-and-transactions}

Úsáidtear an téarma "idirbheart" in Ethereum le tagairt don phacáiste sonraí sínithe a stórálann teachtaireacht le seoladh ó chuntas faoi úinéireacht sheachtrach. Cuimsíonn na hidirbhearta:

- Faighteoir na teachtaireachta
- Síniú lena sainaithnítear an seoltóir
- An méid éitir atá le haistriú ón seoltóir chuig an bhfaighteoir
- Réimse sonraí roghnach
- Luach `STARTGAS`, arb ionann é agus uaslíon na gcéimeanna ríomhaireachtúla a cheadaítear do rith idirbhirt
- Luach `GASPRICE`, a léiríonn an táille a íocann an seoltóir in aghaidh na céime ríomhaireachta

Is iad na chéad trí réimsí caighdeánacha a bhfuiltear ag súil leo in aon criptea-airgeadra. Níl aon fheidhm réamhshocraithe ag an réimse sonraí, ach tá opcode ag an meaisín fíorúil trína bhféadfaidh conradh rochtain a fháil ar na sonraí; mar shampla de chás úsáide, má tá conradh ag feidhmiú mar sheirbhís chlárúcháin fearainn ar-blocshlabhra, b'fhéidir gur mhaith leis na sonraí atá á gcur ar aghaidh chuige a léirmhíniú mar go bhfuil dhá "réimse" iontu, agus is fearann ​​é an chéad réimse le clárú agus an dara réimse. réimse a bheith mar an seoladh IP chun é a chlárú. Léireodh an conradh na luachanna seo ó shonraí na teachtaireachta agus chuirfí i stóras cuí iad.

Tá na réimsí `STARTGAS` agus `GASPRICE` ríthábhachtach do shamhail frithshéanta seirbhíse Ethereum. Chun lúba éigríochta de thaisme nó naimhdeach nó cur amú ríomhaireachtúil eile sa chód a chosc, ní mór do gach idirbheart teorainn a shocrú maidir le cé mhéad céimeanna ríomha chun cód a rith is féidir leis a úsáid. Is é "gás" an bunaonad ríomha; de ghnáth, cosnaíonn céim ríomhaireachtúil 1 ghás, ach cosnaíonn roinnt oibríochtaí méideanna níos airde gáis toisc go bhfuil siad níos costasaí ó thaobh ríomha, nó go n-ardóidh siad an méid sonraí a chaithfear a stóráil mar chuid den staid. Tá táille 5 gháis ann freisin do gach beart i sonraí an idirbhirt. Is é rún an chórais táillí go gceanglófar ar ionsaitheoir íoc go comhréireach as gach acmhainn a úsáidfidh sé, lena n‑áirítear ríomh, bandaleithead agus stóráil; mar sin, ní mór táille gháis a bheith ag gach idirbheart as a n‑ídíonn an líonra méid níos mó acmhainní ar bith atá i gcomhréir go garbh leis an incrimint.

### Teachtaireachtaí {#messages}

Tá sé de chumas ag conarthaí "teachtaireachtaí" a sheoladh chuig conarthaí eile. Is réada fíorúla iad teachtaireachtaí nach ndéantar srathú orthu riamh agus nach bhfuil ann ach i dtimpeallacht reatha Ethereum. Ábhar atá sa teachtaireacht:

- Seoltóir na teachtaireachta (intuigthe)
- Faighteoir na teachtaireachta
- An méid éitir le haistriú taobh leis an teachtaireacht
- Réimse sonraí roghnach
- Luach `STARTGAS`

Go bunúsach, tá teachtaireacht cosúil le hidirbheart, ach amháin gur conradh a tháirgtear í agus ní gníomhaí seachtrach. Léirítear teachtaireacht nuair a ritheann conradh atá á rith faoi láthair an cód opcode `CALL`, a tháirgeann agus a ritheann teachtaireacht. Cosúil le hidirbheart, is é an toradh a bhíonn ar theachtaireacht ná go n-oibríonn cuntas an fhaighteora a chód. Mar sin, is féidir caidreamh a bheith ag conarthaí le conarthaí eile ar an mbealach céanna go díreach agus is féidir le gníomhaithe seachtracha.

Tabhair faoi deara go mbaineann an liúntas gáis arna sannta ag idirbheart nó conradh leis an ngás iomlán arna thomhailt ag an idirbheart sin agus le gach rith. Mar shampla, má sheolann gníomhaí seachtrach A idirbheart chuig B le 1000 gás, agus go n-ídíonn B 600 gás sula gcuirtear teachtaireacht chuig C, agus go n-ídíonn rith inmheánach C 300 gás sula dtéann sé ar ais, ansin is féidir le B 100 gás eile a chaitheamh roimh rith as gás.

### Feidhm Aistrithe Staide Ethereum {#ethereum-state-transition-function}

![Aistriú staide éitir](./ether-state-transition.png)

Feidhm trasdula staide Ethereum, `APPLY(S,TX) -> Is féidir S'` a shainmhíniú mar seo a leanas:

1. Seiceáil an bhfuil an t-idirbheart dea-chruthaithe (. i. an bhfuil an líon ceart luachanna ann), go bhfuil an síniú bailí, agus nach dtagann an nonce leis an nonce i gcuntas an tseoltóra. Mura bhfuil, cuir earráid ar ais.
2. Ríomh an táille idirbhirt mar `STARTGAS * GASPRICE`, agus deimhnigh an seoladh seolta ón síniú. Dealaigh an táille ó iarmhéid chuntais an tseoltóra agus incrimint an tseoltóra ar nonce. Mura bhfuil go leor iarmhéid ann le caitheamh, cuir earráid ar ais.
3. Tosaigh `GAS = STARTGAS`, agus bain de méid áirithe gáis in aghaidh an bhirt chun íoc as na bearta san idirbheart.
4. Aistrigh luach an idirbhirt ó chuntas an tseoltóra go dtí an cuntas fála. Mura bhfuil an cuntas fála ann fós, cruthaigh é. Más conradh é an cuntas fála, rith cód an chonartha go dtí go mbeidh sé críochnaithe nó go dtí go n-imeoidh an forghníomhú as gás.
5. Má theip ar an aistriú luacha toisc nach raibh go leor airgid ag an seoltóir, nó gur imigh rith an chóid as gás, cuir na hathruithe staide go léir ar ais ach amháin íoc na dtáillí, agus cuir na táillí le cuntas an mhianadóra.
6. Seachas sin, aisíoc na táillí don ghás go léir atá fágtha chuig an seoltóir, agus seol na táillí a íocadh as gás a chaitear chuig an mianadóir.

Mar shampla, más é cód an chonartha:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Tabhair faoi deara, i ndáiríre, go bhfuil cód an chonartha scríofa sa chód EVM íseal-leibhéil; tá an sampla seo scríofa i Serpent, ceann dár dteangacha ardleibhéil, ar mhaithe le soiléireacht, agus is féidir é a thiomsú síos go dtí cód EVM. Abair go dtosaíonn stóras an chonartha folamh, agus seoltar idirbheart le luach éitear 10, 2000 gás, 0.001 éitear gasprice, agus 64 beart sonraí, le bearta 0-31 a sheasann don uimhir `2` agus beart 32-63 a sheasann don teaghrán `CHARLIE`. Is é seo a leanas an próiseas don fheidhm aistrithe staide sa chás seo:

1. Seiceáil go bhfuil an t-idirbheart bailí agus dea-chruthaithe.
2. Seiceáil go bhfuil ar a laghad 2000 \* 0.001 = 2 éitear ag seoltóir an idirbhirt. Más é, déan éitear 2 a bhaint as cuntas an tseoltóra.
3. Túsaigh gás = 2000; ag glacadh leis go bhfuil an t‑idirbheart 170 beart ar fad agus go bhfuil an beart‑táille 5, dealaigh 850 ionas go mbeidh 1150 gás fágtha.
4. Dealaigh 10 n-éitear níos mó ó chuntas an tseoltóra, agus cuir le cuntas an chonartha é.
5. Rith an cód. Sa chás seo, tá sé seo simplí: seiceálann sé an mbaintear úsáid as stóras an chonartha ag innéacs `2`, tugann sé faoi deara nach bhfuil, agus mar sin socraíonn sé an stóras ag innéacs `2` go luach `CHARLIE`. Má thógann sé seo 187 gás, mar sin is é an méid gáis atá fágtha ná 1150 - 187 = 963
6. Cuir 963 \* 0.001 = 0.963 éitir ar ais go cuntas an tseoltóra, agus cuir ar ais an staid mar thoradh air.

Mura mbeadh aon chonradh ag pointe glactha an idirbhirt, bheadh ​​táille iomlán an idirbhirt díreach comhionann leis an `GASPRICE` arna sholáthar arna iolrú faoi fhad an idirbhirt i mbearta, agus bheadh na sonraí a seoladh taobh leis an idirbheart ​​​​neamhábhartha.

Tabhair faoi deara go n-oibríonn teachtaireachtaí ar chomhchéim le hidirbhearta i dtéarmaí fillte: má ritheann rith teachtaireachta as gás, ansin filleann rith na teachtaireachta sin, agus gach rith eile a spreag an forghníomhú sin, ar ais, ach ní gá do rith tuismitheora filleadh. Ciallaíonn sé seo go bhfuil sé "sábháilte" do chonradh glaoch ar chonradh eile, mar má ghlaonn A ar B le G gás ansin ráthaítear go gcaillfidh rith A gás G ar a mhéad. Ar deireadh, tabhair faoi deara go bhfuil opcode ann, `CREATE`, a chruthaíonn conradh; tá a mheicníochtaí reatha cosúil go ginearálta le `CALL`, cé is moite de go gcinneann aschur an reatha cód conartha nuachruthaithe.

### Rith Cóid {#code-execution}

Tá an cód i gconarthaí Ethereum scríofa i dteanga bytecode íseal-leibhéal, cruach-bhunaithe, dá ngairtear "cód meaisín fíorúil Ethereum" nó "cód EVM". Is éard atá sa chód ná tacar bearta, ina léiríonn gach beart oibríocht. Go ginearálta, is lúb éigríochta é forghníomhú cód mar ndéantar an oibríocht arís agus arís eile ag an áiritheoir clár reatha (a thosaíonn ag nialas) agus ansin an t-áiritheoir cláir a bhreisiú faoi haon, go dtí go sroichtear deireadh an chóid nó earráid nó go mbraitear treoir `STOP` nó `RETURN`. Tá rochtain ag na hoibríochtaí ar thrí chineál spáis inar féidir sonraí a stóráil:

- An **cruach**: coimeádán is déanaí isteach is túisce amach inar féidir luachanna a bhrú agus a phreabadh
- **Cuimhne**, eagar beart is féidir a leathnú gan teorainn
- **stóras** fadtéarmach an chonartha, stóras eochrach/luacha. Murab ionann agus cruachta agus cuimhne, a athshocraíonn tar éis don ríomh críochnú, maireann an stóras go fadtéarmach.

Is féidir leis an gcód luach, seoltóir agus sonraí na teachtaireachta isteach a rochtain freisin, chomh maith le sonraí ceanntásc bloic, agus is féidir leis an gcód sraith de bhearta sonraí a thabhairt ar ais mar aschur freisin.

Tá samhaltán reatha foirmiúil chód EVM iontach simplí. Agus an meaisín fíorúil Ethereum ag rith, is féidir a staid ríomhaireachtúil iomlán a shainiú leis an `(block_state, transaction, message, code, memory, stack, pc, gas)`, áit a bhfuil `block_state` is é cód an staid dhomhanda ina bhfuil na cuntais go léir agus folaíonn sé iarmhéideanna agus stóráil. Ag tús gach babhta reatha, faightear an treoir reatha tríd an `pc`ú beart den `chód` (nó 0 más `pc >= len(code)`), agus tá a shainmhíniú féin ag gach treoir maidir leis an gcaoi a dtéann sé i bhfeidhm ar an tuple. Mar shampla, popálann `ADD` dhá mhír den chruach agus brúnn sé a suim, laghdaítear `gas` faoi 1 agus méadaíonn sé `pc` faoi 1, agus buaileann `SSTORE` an dá mhír is airde den chruach agus cuireann sé an dara mír isteach i stóras an chonartha ag an innéacs atá sonraithe ag an gcéad mhír. Cé go bhfuil go leor bealaí ann chun rith meaisín fíorúil Ethereum a bharrfheabhsú trí thiomsú díreach-in-am, is féidir feidhmiú bunúsach Ethereum a dhéanamh i gceann cúpla céad líne de chód.

### Blocshlabhra agus Mianadóireacht {#blockchain-and-mining}

![Léaráid bloc iarratais Ethereum](./ethereum-apply-block-diagram.png)

Tá an blocshlabhra Ethereum cosúil le blocshlabhra Bitcoin ar go leor bealaí, cé go bhfuil roinnt difríochtaí ann. Is é an príomhdhifríocht idir Ethereum agus Bitcoin maidir leis an ailtireacht blocshlabhra ná, murab ionann agus Bitcoin, go bhfuil cóip den liosta idirbheart agus den staid is déanaí i mbloic Ethereum. Seachas sin, déantar dhá luach eile, an uimhir bhloic agus an deacracht, a stóráil sa bhloc freisin. Is é seo a leanas an t-algartam bailíochtaithe bloc bunúsach in Ethereum:

1. Seiceáil an bhfuil an bloc tagartha roimhe seo ann agus an bhfuil sé bailí.
2. Cinntigh go bhfuil stampa ama an bhloic níos mó ná stampa ama an bhloic a luadh roimhe seo agus níos lú ná 15 nóiméad amach anseo
3. Seiceáil go bhfuil líon na mbloc, deacracht, fréamh idirbhirt, fréamh uncail agus teorainn gháis (coincheapa éagsúla a bhaineann go sonrach le Ethereum ar leibhéal íseal) bailí.
4. Seiceáil go bhfuil an cruthúnas-oibre ar an mbloc bailí.
5. Bíodh `S[0]` mar an staid ag deireadh an bhloic roimhe seo.
6. Bíodh `TX` mar liosta idirbhearta an bhloc, le hidirbhearta `n`. I gcás gach `i` i `0...n-1`, socraigh `S[i+1] = APPLY(S[i],TX[i])`. Má sheolann feidhmchlár earráid ar ais, nó má sháraíonn an gás iomlán a ídíodh sa bhloc suas go dtí an pointe seo an `GASLIMIT`, seol earráid ar ais.
7. Bíodh `S_FINAL` ina `S[n]`, ach ag cur an luach saothair bloc a íocadh leis an mianadóir leis.
8. Seiceáil an bhfuil fréamh crainn Merkle an stáit `S_FINAL` cothrom leis an bhfréamh staid dheiridh a thugtar sa cheanntásc bloic. Má tá, tá an bloc bailí; ar shlí eile, níl sé bailí.

Bíonn cuma an-éifeachtach ar an gcur chuige ar an gcéad amharc, mar ní mór an staid iomlán a stóráil le gach bloc, ach i ndáiríre ba chóir don éifeachtacht a bheith inchomparáide le cuid Bitcoin. Is é an chúis atá leis ná go bhfuil an staid stóráilte i struchtúr an chrainn, agus tar éis gach bloc ní gá ach cuid bheag den chrann a athrú. Mar sin, go ginearálta, idir dhá bhloc in aice le chéile, ba chóir go mbeadh formhór mór an chrainn mar an gcéanna, agus dá bhrí sin is féidir na sonraí a stóráil uair amháin agus tagairt a dhéanamh dóibh faoi dhó le pointeoirí (ie. haiseanna de fho-chrainn). Úsáidtear crann speisialta ar a dtugtar "crann Patricia" chun é seo a bhaint amach, le modhnú ar choincheap an chrainn Merkle a cheadaíonn nóid a chur isteach agus a scriosadh, agus ní hamháin a athrú, go héifeachtach. Ina theannta sin, toisc go bhfuil an fhaisnéis staide go léir mar chuid den bhloc deireanach, níl aon ghá le stair iomlán an bhlocshlabhra a stóráil - straitéis ar féidir, dá bhféadfaí é a chur i bhfeidhm ar Bitcoin, a ríomh chun coigilteas 5-20x a sholáthar sa spás.

Ceist a chuirtear go coitianta is ea "cá" ritear cód conartha, i dtéarmaí crua-earraí fisiceacha. Tá freagra simplí air seo: tá an próiseas maidir le cód conartha a rith mar chuid den sainmhíniú ar fheidhm aistrithe na staide, atá mar chuid den algartam bailíochtaithe bloc, mar sin má chuirtear idirbheart isteach sa bhloc `B` an cód déanfaidh gach nód, anois agus amach anseo, a dhéanann an bloc `B` a íoslódáil agus a bhailíochtú an rith a bheidh déanta ag an idirbheart sin.

## Feidhchláir {#applications}

Go ginearálta, tá trí chineál feidhmchlár ar bharr Ethereum. Is é an chéad chatagóir ná feidhmchláir airgeadais, a sholáthraíonn bealaí níos cumhachtaí d'úsáideoirí chun conarthaí a bhainistiú agus a dhéanamh lena gcuid airgid. Áirítear leis seo fo-airgeadraí, díorthaigh airgeadais, conarthaí fálaithe, sparán coigiltis, uachtanna, agus sa deireadh fiú roinnt cineálacha conarthaí fostaíochta ar scála iomlán. Is é an dara catagóir feidhmchláir leath-airgeadais, áit a bhfuil airgead i gceist ach go bhfuil taobh trom neamh-airgeadaíochta ag baint leis an méid atá á dhéanamh; sampla iontach is ea deolchairí féin-rite chun fadhbanna ríomhaireachtúla a réiteach. Ar deireadh, tá feidhmchláir amhail vótáil ar líne agus rialachas díláraithe ann nach feidhmchláir airgeadais iad ar chor ar bith.

### Córais Chomharthaí {#token-systems}

Tá go leor feidhmchlár ag córais chomharthaí blocshlabhra ó fho-airgeadraí a léiríonn sócmhainní cosúil le USD nó ór go stoic chuideachta, comharthaí aonair a léiríonn maoin chliste, cúpóin shlána dhobhriste, agus fiú córais chomharthaí nach bhfuil aon cheangail acu le gnáthluach ar bith, a úsáidtear mar phointe córais dreasachta. Is iontach chomh héasca is atá sé córais chomharthaí a chur i bhfeidhm in Ethereum. Is é an príomhphointe atá le tuiscint ná gur bunachar sonraí é airgeadra, nó córas comharthaí, go bunúsach, ina bhfuil oibríocht amháin: bain X aonaid ó A agus tabhair X aonaid go B, ar an gcoinníoll (i) go raibh X aonad ar laghad ag A roimh an idirbheart agus (2) go bhfuil an t-idirbheart ceadaithe ag A. Níl le déanamh chun córas comharthaí a chur i bhfeidhm ach an loighic seo a chur i bhfeidhm i gconradh.

Is é seo a leanas an bunchód chun córas comharthaí a chur i bhfeidhm i Serpent:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Go bunúsach is cur i bhfeidhm litriúil é seo d’fheidhm aistrithe staide an “chórais bhaincéireachta” ar a bhfuil cur síos níos mine thuas sa doiciméad seo. Is gá cúpla líne breise de chód a chur leis chun foráil a dhéanamh don chéad chéim de dháileadh na n-aonad airgeadra ar an gcéad dul síos agus cúpla cás imill eile, agus go hidéalach chuirfí feidhm leis chun ligean do chonarthaí eile fiosrú a dhéanamh maidir le hiarmhéid seolta. Ach níl ann ach sin. Go teoiriciúil, is féidir gné thábhachtach eile a chur san áireamh i gcórais chomhartha atá bunaithe ar Ethereum atá ag gníomhú mar fho-airgeadraí nach bhfuil meitea-airgeadraí ar slabhra bunaithe ar Bitcoin: an cumas táillí idirbhirt a íoc go díreach san airgeadra sin. Chuirfí é seo i bhfeidhm trí iarmhéid éitir a chothabháil a chonradh lena n-aisíocfadh sé éitear a úsáideadh chun táillí a íoc leis an seoltóir, agus go n-athlíonfadh sé an t-iarmhéid sin trí na haonaid airgeadra inmheánaigh a thógann sé i dtáillí a bhailiú agus iad a athdhíol i gceant reatha leanúnach. Mar sin bheadh ​​ar úsáideoirí a gcuntais a “ghníomhachtú” le héitear, ach nuair a bheidh an t-éitear ann bheadh ​​sé in-athúsáidte toisc go n-aisíocfadh an conradh é gach uair.

### Díorthaigh airgeadais agus Airgeadraí Luacha Cobhsaí {#financial-derivatives-and-stable-value-currencies}

Is iad díorthaigh airgeadais an cur i bhfeidhm is coitianta ar "chonradh cliste", agus ceann de na cinn is simplí le cur i bhfeidhm sa chód. Is é an príomhdhúshlán a bhaineann le conarthaí airgeadais a fheidhmiú ná go n-éilíonn a bhformhór tagairt do thicéadóir seachtrach praghais; mar shampla, is éard atá i gceist le hiarratas an-inmhianaithe ná conradh cliste a dhéanann fálú i gcoinne luaineacht éitir (nó criptea-airgeadra eile) maidir le dollar SAM, ach chun é seo a dhéanamh ní mór go mbeadh a fhios ag an gconradh cad é luach ETH/USD. Is é an bealach is simplí chun é seo a dhéanamh ná trí chonradh "fotha sonraí" arna chothabháil ag páirtí ar leith (m. sh. NASDAQ) atá deartha ionas go mbeidh an cumas ag an bpáirtí sin an conradh a nuashonrú de réir mar is gá, agus comhéadan a sholáthar a ligeann do chonarthaí eile teachtaireacht a sheoladh chuig an gconradh sin agus freagra a fháil ar ais a sholáthraíonn an praghas.

Agus an comhábhar ríthábhachtach sin á chur san áireamh, is mar seo a leanas a bheadh ​​cuma an chonartha fálaithe:

1. Fan le páirtí A chun 1000 éitear a ionchur.
2. Fan go gcuirfidh páirtí B 1000 éitear isteach.
3. Taifead an luach USD de 1000 éitear, arna ríomh trí cheist a chur faoin gconradh beathaithe sonraí, i stóráil, abair gurb é seo $x.
4. Tar éis 30 lá, lig do A nó B an conradh a “athghníomhachtú” chun éitear de luach $x (arna ríomh tríd an gconradh fothaithe sonraí a cheistiú arís chun an praghas nua a fháil) a sheoladh chuig A agus an chuid eile chuig B.

Bheadh ​​cumas suntasach ag conradh den sórt sin i criptea-thráchtáil. Ceann de na fadhbanna is mó a luadh faoi criptea-airgeadra is ea an fíric go bhfuil sé luaineach; cé go bhféadfadh go mbeadh go leor úsáideoirí agus díoltóirí ag iarraidh an tslándáil agus an áisiúlacht chun déileáil le sócmhainní cripteagrafacha, níor mhian le go leor acu aghaidh a thabhairt ar an ionchas sin 23% de luach a gcistí a chailleadh in aon lá amháin. Go dtí seo, is é an réiteach is coitianta a mholtar ná sócmhainní arna dtacú ag eisitheoirí; is é an smaoineamh go gcruthaíonn eisitheoir fo-airgeadra ina bhfuil sé de cheart aige aonaid a eisiúint agus a chúlghairm, agus aonad amháin den airgeadra a sholáthar d’aon duine a sholáthraíonn (as líne) aonad amháin de bhunsócmhainn shonraithe dóibh (eg. ór , USD). Geallann an t-eisitheoir ansin aonad amháin den bhunsócmhainn a sholáthar do dhuine ar bith a sheolann aonad amháin den tsócmhainn criptea ar ais. Ceadaíonn an mheicníocht seo aon sócmhainn neamh-chripteagrafach a "ardú" isteach i sócmhainn chripteagrafach, ar choinníoll gur féidir muinín a chur san eisitheoir.

Go praiticiúil, áfach, ní bhíonn eisitheoirí iontaofa i gcónaí, agus i gcásanna áirithe bíonn an bonneagar baincéireachta ró-lag, nó ró-naimhdeach, le go mbeadh a leithéid de sheirbhísí ann. Soláthraíonn díorthaigh airgeadais rogha eile. Anseo, in ionad eisitheoir aonair a sholáthraíonn cistí mar chúltaca do shócmhainn, imríonn margadh díláraithe amhantraithe, a chuireann geall go n-ardóidh praghas sócmhainn tagartha cripteagrafach (m. sh. ETH). Murab ionann agus eisitheoirí, níl aon rogha ag amhantraithe mainneachtain a dhéanamh ar a dtaobh féin den mhargadh toisc go gcoimeádann an conradh fálaithe a gcuid cistí in eascró. Tabhair faoi deara nach bhfuil an cur chuige seo díláraithe go hiomlán, toisc go bhfuil foinse iontaofa fós ag teastáil chun an ticeoir praghais a sholáthar, cé gur féidir a mhaíomh go fóill gur feabhas ollmhór é seo maidir le ceanglais bhonneagair a laghdú (murab ionann agus a bheith i d’eisitheoir, níl aon cheadúnais ag teastáil chun fotha praghais a eisiúint agus is dócha gur féidir iad a chatagóiriú mar shaorchaint) agus an poitéinseal calaoise a laghdú.

### Córais Aitheantais agus Clú {#identity-and-reputation-systems}

Rinne an criptea-airgeadra malartach is luaithe ar fad, [Namecoin](http://namecoin.org/), iarracht úsáid a bhaint as blocshlabhra cosúil le Bitcoin chun córas clárúcháin ainmneacha a sholáthar, inar féidir le húsáideoirí a n-ainmneacha a chlárú i mbunachar sonraí poiblí mar aon le sonraí eile. Baineann an mórchás úsáide a luadh le córas [DNS](https://wikipedia.org/wiki/Domain_Name_System), ag mapáil ainmneacha fearainn ar nós "bitcoin.org" (nó, i gcás Namecoin," bitcoin.bit”) chuig seoladh IP. I measc cásanna úsáide eile tá fíordheimhniú ríomhphoist agus córais chlú a d’fhéadfadh a bheith níos forbartha. Seo an bunchonradh chun córas clárúcháin ainm cosúil le Namecoin a sholáthar ar Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Tá an conradh an-simplí; níl ann ach bunachar sonraí taobh istigh den líonra Ethereum is féidir cur leis, ach nach bhfuil á mhodhnú ná baint de. Is féidir le duine ar bith ainm a chlárú a bhfuil luach éigin ag baint leis, agus fanann an clárú sin go deo. Beidh “clásal feidhme” ag conradh clárúcháin ainm níos sofaisticiúla freisin a cheadóidh do chonarthaí eile é a cheistiú, chomh maith le meicníocht don “úinéir” (ie an chéad chláraitheoir) den ainm na sonraí a athrú nó úinéireacht a aistriú. Is féidir fiú clú agus feidhmiúlacht iontaofacht ghréasáin a chur ar an mbarr.

### Stóras Comhad Díláraithe {#decentralized-file-storage}

Le blianta beaga anuas, tá roinnt gnólachtaí nuathionasnta stórála comhad ar líne a bhfuil an-tóir orthu tagtha chun cinn, agus Dropbox ar na cinn is suntasaí, ag iarraidh ligean d’úsáideoirí cúltaca dá dtiomántán crua a uaslódáil agus an tseirbhís cúltaca a stóráil agus ligean don úsáideoir rochtain a fháil air. mar mhalairt ar tháille mhíosúil. Mar sin féin, ag an bpointe seo tá an margadh stóras comhad sách mí-éifeachtach uaireanta; Léiríonn sracfhéachaint ar réitigh éagsúla reatha, go háirithe ag an leibhéal "ghleann ait" 20-200 GB nach bhfuil cuótaí saor in aisce ná lascainí leibhéal fiontair á spreagadh acu, go bhfuil praghsanna míosúla do chostais stóras comhad príomhshrutha chomh hard sin go bhfuil tú ag íoc as níos mó ná costas an tiomántáin chrua ar fad in aon mhí amháin. Is féidir le conarthaí Ethereum éiceachóras stóras comhad díláraithe a fhorbairt, áit ar féidir le húsáideoirí aonair méideanna beaga airgid a thuilleamh trína dtiomántáin chrua féin a ligean ar cíos agus is féidir spás neamhúsáidte a úsáid chun costais stóras comhad a laghdú tuilleadh.

Is é an príomhphíosa a bheadh ​​mar bhonn ag feiste den sórt sin ná an rud ar a dtugamar an "conradh díláraithe Dropbox". Oibríonn an conradh seo mar seo a leanas. Ar dtús, scoiltear na sonraí atá ag teastáil ina mbloic, ag criptiú gach bloc le haghaidh príobháideachta, agus tógann sé crann Merkle as. Déantar conradh ansin leis an riail, gach bloic N, go bpiocfadh ​​​​an conradh innéacs randamach i gcrann Merkle (ag baint úsáide as an hais bloc roimhe sin, inrochtana ó chód conartha, mar fhoinse randamach), ag tabhairt X éitear don chéad aonán a sholáthróidh idirbheart le cruthúnas ar úinéireacht an bhloic atá cosúil le fíorú íocaíochta simplithe ag an innéacs áirithe sin sa chrann. Nuair is mian le húsáideoir a chomhad a ath-íoslódáil, is féidir leo prótacal cainéal micreaíocaíochta a úsáid (m. sh. íoc 1 szabo in aghaidh 32 cilibheart) chun an comhad a aisghabháil; is é an cur chuige is tíosaí ar tháillí ná nach bhfoilseoidh an t-íocóir an t-idirbheart go dtí an deireadh, agus ina ionad sin cuirtear ceann beagán níos brabúsaí in ionad an idirbhirt leis an nonce céanna tar éis gach 32 cilibheart.

Gné thábhachtach den phrótacal is ea, cé go bhfuil an chuma air go bhfuil duine ag cur muiníne i mórán nóid randamacha gan dearmad a dhéanamh ar an gcomhad, is féidir an riosca sin a laghdú go dtí gar-nialas tríd an gcomhad a roinnt i mórán píosaí trí chomhroinnt rúnda, agus faire ar na conarthaí le feiceáil go bhfuil gach píosa fós i seilbh nód éigin. Má tá conradh fós ag íoc airgid amach, cuireann sé sin cruthúnas cripteagrafach ar fáil go bhfuil an comhad á stóráil ag duine éigin amuigh ansin.

### Eagraíochtaí Uathrialacha Díláraithe {#decentralized-autonomous-organizations}

Is é an coincheap ginearálta "eagraíocht uathrialaitheach díláraithe" ná aonán fíorúil a bhfuil tacar áirithe comhaltaí nó scairshealbhóirí aige, a bhfuil an ceart acu, b'fhéidir le tromlach 67%, cistí an aonáin a chaitheamh agus a chód a mhodhnú. Dhéanfadh na comhaltaí cinneadh le chéile ar conas ba cheart don eagraíocht a cistí a leithdháileadh. D’fhéadfadh modhanna a bheith ann chun cistí OCC a leithdháileadh, ó dheolchairí, tuarastail agus meicníochtaí níos aistí fós, amhail airgeadra inmheánach chun luach saothair a thabhairt don obair. Go bunúsach, is éard atá i gceist leis seo ná ornaíocht dhlíthiúil chuideachta thraidisiúnta nó neamhbhrabúis nach mbaineann úsáid as teicneolaíocht bhlocshlabhra chripteagrafach ach le haghaidh forfheidhmithe. Go dtí seo bhí cuid mhór den chaint ar OCTanna bunaithe ar mhúnla "caipitleach" de "chorparáid uathrialaitheach dhíláraithe" (DAC) le scairshealbhóirí a fhaigheann díbhinní agus scaireanna intrádála; rogha eile, “pobal uathrialaithe díláraithe” b’fhéidir, mar a mbeadh sciar cothrom ag gach ball sa chinnteoireacht agus go n-éileodh 67% de chomhaltaí láithreacha aontú comhalta a chur leis nó a bhaint. Ní mór don ghrúpa an ceanglas nach bhféadfaidh ach comhaltas amháin a bheith ag duine amháin a fhorfheidhmiú le chéile ansin.

Seo a leanas cur síos ginearálta ar conas DAO a chódú. Níl sa dearadh is simplí ach píosa cód féinmhodhnaithe a athraíonn má aontaíonn dhá thrian de na baill ar athrú. Cé go bhfuil an cód do-athraithe go teoiriciúil, is féidir teacht timpeall air seo go héasca agus inathraitheacht de-facto a bheith agat trí smután den chód a bheith i gconarthaí ar leith, agus seoladh na gconarthaí atá le glaoch a bheith stóráilte sa stóráil inathraithe. Agus conradh DAO den sórt sin á chur chun feidhme go simplí, bheadh ​​trí chineál idirbhirt ann, arna idirdhealú ag na sonraí a chuirtear ar fáil san idirbheart:

- `[0,i,K,V]` chun moladh a chlárú le hinnéacs `i` chun an seoladh ag an innéacs stórála ` K` a athrú go luach ` V`
- `[1,i]` chun vóta a chlárú i bhfabhar thogra `i`
- `[2,i]` chun an togra `i` a thabhairt chun críche má tá go leor vótaí déanta

Bheadh ​​clásail sa chonradh ansin do gach ceann díobh seo. Choimeádfadh sé taifead ar gach athrú stórais oscailte, mar aon le liosta de na daoine a vótáil ar a shon. Bheadh ​​liosta de na baill ar fad ann freisin. Nuair a vótálann dhá thrian de na comhaltaí ar son aon athrú stórais, d’fhéadfaí críochnú idirbhirt an t-athrú a dhéanamh. Bheadh ​​cumas vótála ionsuite ag creatlach níos sofaisticiúla freisin le haghaidh gnéithe cosúil le hidirbheart a sheoladh, baill a chur leis agus baill a bhaint, agus d'fhéadfadh sé fiú foráil a dhéanamh don [Daonlathas Leachtach ](https://wikipedia.org/wiki/Liquid_democracy)-stíl tharmligean vóta (i.e., is féidir le duine ar bith duine éigin a shannadh chun vótáil ar a son, agus tá an sannadh neamhbhuan mar sin má shannann A B agus smá shannann B C ansin cinneann C ceann A vóta). Cheadódh an dearadh seo don DAO fás go horgánach mar phobal díláraithe, rud a ligeann do dhaoine an tasc a bhaineann le scagadh amach cé atá ina bhall a tharmligean chuig speisialtóirí, cé, go murab ionann agus an "córas reatha", gur féidir le speisialtóirí teacht isteach agus amach go héasca le himeacht ama. de réir mar a athraíonn baill aonair pobail a gcuid ailínithe.

Is samhail mhalartach é do chorparáid dhíláraithe, nuair is féidir le nialas nó níos mó scaireanna a bheith ag aon chuntas, agus éilítear dhá thrian de na scaireanna chun cinneadh a dhéanamh. Bheadh ​​feidhmiúlacht bainistíochta sócmhainní i gceist le creatlach iomlán, an cumas chun tairiscint a dhéanamh chun scaireanna a cheannach nó a dhíol, agus an cumas glacadh le tairiscintí (b’fhearr le meicníocht ordaithe laistigh den chonradh). Bheadh ​​an tarmligean ann freisin ar nós an Daonlathais Leachtaigh, rud a dhéanfadh ginearálú ar choincheap “bord stiúrthóirí”.

### Tuilleadh Feidhmchláir {#further-applications}

**1. Sparáin choigiltis**. Cuir i gcás go bhfuil Alice ag iarraidh a cuid cistí a choinneáil slán, ach go bhfuil imní uirthi go gcaillfidh sí nó go heaiceálfaidh duine éigin a heochair phríobháideach. Cuireann sí éitear i gconradh le Bob, banc, mar seo a leanas:

- Is í Alice amháin atá in ann uasmhéid de 1% de na cistí a aistarraingt in aghaidh an lae.
- Is féidir le Bob ina aonar uasmhéid de 1% de na cistí a tharraingt siar in aghaidh an lae, ach tá sé ar chumas Alice idirbheart a dhéanamh agus a heochair ag múchadh an cumas seo.
- Is féidir le Alice agus Bob le chéile rud ar bith a aistarraingt.

De ghnáth, is leor 1% in aghaidh an lae do Alice, agus má tá Alice ag iarraidh níos mó a aistarraingt féadfaidh sí teagmháil a dhéanamh le Bob chun cabhair a fháil. Má dhéantar eochair Alice a haiceáil, téann sí chuig Bob chun na cistí a aistriú chuig conradh nua. Má chailleann sí a heochair, bainfidh Bob an t-airgead amach sa deireadh. Má tharlaíonn go bhfuil Bob mailíseach, is féidir léi a chumas aistarraingthe a mhúchadh.

**2. Árachas bearrtha**. Is féidir conradh díorthach airgeadais a dhéanamh go héasca ach úsáid a bhaint as fotha sonraí den aimsir in ionad aon innéacs praghsanna. Má cheannaíonn feirmeoir in Iowa díorthach a íocann go contrártha ar an bhfrasaíocht in Iowa, ansin má bhíonn triomach ann, gheobhaidh an feirmeoir airgead go huathoibríoch agus má bhíonn dóthain báistí ann beidh an feirmeoir sásta mar go n-éireodh go maith lena bharra. Is féidir é seo a leathnú chuig árachas tubaiste nádúrtha go ginearálta.

**3. Fotha sonraí díláraithe**. I gcás conarthaí difríochta airgeadais, d’fhéadfadh sé a bheith indéanta an fotha sonraí a dhílárú trí phrótacal ar a dtugtar “[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". Oibríonn SchellingCoin go bunúsach mar seo a leanas: chuir N páirtithe go léir isteach sa chóras luach sonra ar leith (m. sh. an praghas ETH/USD), déantar na luachanna a shórtáil, agus faigheann gach duine idir an 25ú agus an 75ú peircintíl comhartha amháin mar luach saothair. Tá dreasacht ag gach duine an freagra a sholáthróidh gach duine eile a sholáthar, agus is é an t-aon luach ar féidir le líon mór imreoirí aontú go réalaíoch air ná an réamhshocrú soiléir: an fhírinne. Cruthaíonn sé seo prótacal díláraithe a fhéadfaidh líon ar bith luachanna a sholáthar go teoiriciúil, lena n-áirítear an praghas ETH/USD, an teocht i mBeirlín nó fiú toradh ríomh crua ar leith.

**4. Eascró cliste le síniú iolrach**. Ceadaíonn Bitcoin conarthaí idirbhirt le síniú iolrach mar ar féidir, mar shampla, le trí cinn as cúig eochracha ar leith na cistí a chaitheamh. Ceadaíonn Ethereum níos mó gráinneachta; mar shampla, is féidir le ceathrar as gach cúigear gach rud a chaitheamh, is féidir le triúr as gach cúigear suas le 10% a chaitheamh in aghaidh an lae, agus is féidir le beirt as gach cúigear suas le 0.5% a chaitheamh in aghaidh an lae. Ina theannta sin, tá Ethereum multisig aisioncronach - is féidir le dhá pháirtí a gcuid sínithe a chlárú ar an mblocshlabhra ag amanna éagsúla agus seolfaidh an síniú deireanach an t-idirbheart go huathoibríoch.

**5. Néalríomhaireacht**. Is féidir an teicneolaíocht EVM a úsáid freisin chun timpeallacht ríomhaireachta infhíoraithe a chruthú, rud a ligeann d’úsáideoirí iarraidh ar dhaoine eile ríomhanna a dhéanamh agus ansin cruthúnais a iarraidh go roghnach go ndearnadh ríomhanna ag seicphointí roghnaithe go randamach i gceart. Ceadaíonn sé seo margadh néalríomhaireachta a chruthú inar féidir le haon úsáideoir a bheith rannpháirteach lena ríomhaire deisce, glúine nó freastalaí speisialaithe, agus is féidir spotseiceáil mar aon le taiscí slándála a úsáid lena chinntiú go bhfuil an córas iontaofa (ie. ní féidir le nóid caimiléireacht a dhéanamh go brabúsach). Cé go mb’fhéidir nach mbeadh a leithéid de chóras oiriúnach do gach tasc; ní féidir tascanna a éilíonn ardleibhéal cumarsáide idirphróisis, mar shampla, a dhéanamh go héasca ar scamall mór nód. Tá tascanna eile, áfach, i bhfad níos éasca a chomhthreomharú; is furasta tionscadail mar SETI@home, folding@home agus halgartaim ghéiniteacha a chur i bhfeidhm ar bharr ardán dá leithéid.

**6. Cearrbhachas idir piaraí**. Is féidir líon ar bith de phrótacail chearrbhachais idir comhghleacaithe, mar shampla Frank Stajano agus Richard Clayton [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf), a chur i bhfeidhm ar bhlocshlabhra Ethereum. Is é an prótacal cearrbhachais is simplí i ndáiríre ná conradh le haghaidh difríochta ar an gcéad bhloc haise eile, agus is féidir prótacail níos airde a thógáil as sin, ag cruthú seirbhísí cearrbhachais le táillí gar-nialas nach bhfuil ar a gcumas caimiléireacht.

**7. Margaí tuartha**. Ar choinníoll oracal nó SchellingCoin, tá margaí tuar éasca a chur i bhfeidhm freisin, agus d'fhéadfadh margaí tuar mar aon le SchellingCoin a chruthú a bheith ar an gcéad iarratas príomhshrutha [futarchy ](http://hanson.gmu.edu/futarchy.html) mar phrótacal rialachais le haghaidh eagraíochtaí díláraithe.

**8. Ar ionaid mhargaidh díláraithe ar slabhra**, ag baint úsáide as an gcóras aitheantais agus clú mar bhonn.

## Ábhair Ilghnéitheacha Agus Imní {#miscellanea-and-concerns}

### Feidhmiú Athraithe GHOST {#modified-ghost-implementation}

Is nuálaíocht é an prótacal "Fo-chrann Santach is Troime" (GHOST) a thug Yonatan Sompolinsky agus Aviv Zohar isteach den chéad uair i [Nollaig 2013](https://eprint.iacr.org/2013/881.pdf). Is é an spreagadh taobh thiar de GHOST ná go bhfuil blocshlabhraí le hamanna daingnithe tapa ag fulaingt faoi láthair ó shlándáil laghdaithe mar gheall ar ráta ard seanchaite - toisc go dtógann bloic am áirithe chun iomadú tríd an líonra, má tá mianadóir A ag mianú bloc agus ansin mianadóir B ag mianú mianach eile bloc. sula n-iomadaítear bloc mianadóir A go B, cuirfear amú bloc mianadóir B agus ní chuirfidh sé le slándáil líonra. Ina theannta sin, tá ceist láraithe ann: má tá mianadóir A ina linn mianadóireachta le 30% haischumhacht agus 10% haischumhacht ag B, beidh an baol ann go dtáirgfear bloc seanchaite 70% den am (ó 30% eile den am tháirg A an bloc deireanach agus mar sin gheobhaidh sé sonraí mianadóireachta láithreach) ach beidh an baol ann go dtáirgfidh B bloc seanchaite 90% den am. Mar sin, má tá an bloc-eatramh gearr go leor le go mbeidh an ráta seanchaite ard, beidh A i bhfad níos éifeachtaí go simplí de bharr a mhéide. Agus an dá éifeacht seo le chéile, is dóichí go n-eascróidh linn mhianadóireachta amháin as blocshlabhra a tháirgeann bloic go tapa le céatadán sách mór den hais-chumhacht líonra chun smacht de facto a bheith aige ar an bpróiseas mianadóireachta.

Mar atá tuairiscithe ag Sompolinsky agus Zohar, réitíonn GHOST an chéad cheist maidir le caillteanas slándála líonra trí bhloic sheanchaite a áireamh agus an slabhra “is faide” á ríomh; is é sin le rá, ní hamháin tuismitheoir agus sinsear breise an bhloic, ach freisin cuirtear sliocht sean-shinsear an bhloc (i mbéarlagair Ethereum, "uncailí") leis an ríomh cé acu bloc a bhfuil an cruthúnas-oibre iomlán is mó ag tacú leis. Chun an dara saincheist a bhaineann le claonadh láraithe a réiteach, téann muid thar an bprótacal a ndearna Sompolinsky agus Zohar cur síos air, agus cuirimid luach saothair bloc ar fáil do bhloic sheanchaite: faigheann bloc seanchaite 87.5% dá luach saothair boinn, agus faigheann an nia lena n-áirítear an bloc seanchaite an chuid eile. 12.5%. Ní bhronntar táillí idirbhirt, áfach, ar uncailí.

Ní bhronntar táillí idirbhirt, áfach, ar uncailí. Go sonrach, sainmhínítear é mar seo a leanas:

- Caithfidh bloc tuismitheoir a shonrú, agus caithfidh sé 0 uncail nó níos mó a shonrú
- Caithfidh na hairíonna seo a leanas a bheith ag uncail atá áirithe i mbloc B:
  - Caithfidh sé a bheith ina leanbh díreach de sinsear kth ghlúin B, áit a bhfuil `2 <= k <= 7`.
  - Ní féidir leis a bheith ina shinsear ag B
  - Caithfidh uncail a bheith ina cheanntásc bailí bloic, ach ní gá gur bloc fíoraithe roimhe seo nó fiú bloc bailí é
  - Caithfidh uncail a bheith difriúil ó na huncailí go léir atá san áireamh i mbloic roimhe seo agus na h-uncailí go léir eile atá san áireamh sa bhloc céanna (cuimsiú neamhdhúbailte)
- I gcás gach uncail U i mbloc B, faigheann mianadóir B 3.125% breise a chuirtear lena luach saothair mona bhoinn agus faigheann mianadóir U 93.75% de luach saothair caighdeánach monabhoinn.

Baineadh úsáid as an leagan teoranta seo de GHOST, le huncailí san áireamh ach suas le 7 nglúin, ar dhá chúis. Ar an gcéad dul síos, d’áireofaí in GHOST neamhtheoranta an iomarca aimhréidheanna a mbeadh uncailí do bhloc áirithe bailí sa ríomh. Ar an dara dul síos, baineann GHOST neamhtheoranta le cúiteamh mar a úsáidtear in Ethereum an dreasacht do mhianadóir mianach a dhéanamh ar an bpríomhshlabhra agus ní ar shlabhra ionsaitheora poiblí.

### Táillí {#fees}

Toisc go gcuireann gach idirbheart a fhoilsítear sa bhlocshlabhra an costas ar an líonra chun é a íoslódáil agus a fhíorú, tá gá le meicníocht rialála éigin, a bhaineann go hiondúil le táillí idirbhirt, chun mí-úsáid a chosc. Is é an cur chuige réamhshocraithe, a úsáidtear i Bitcoin, ná táillí deonacha amháin a bheith ann, ag brath ar mhianadóirí chun gníomhú mar gheataí agus íosmhéideanna dinimiciúla a shocrú. Tá glactha go an-fhabhrach leis an gcur chuige i bpobal Bitcoin go háirithe toisc go bhfuil sé "bunaithe ar an margadh", rud a cheadaíonn soláthar agus éileamh idir mianadóirí agus seoltóirí idirbheart an praghas a chinneadh. Is í an fhadhb leis an líne réasúnaíochta seo, áfach, nach margadh é próiseáil idirbheart; cé go bhfuil sé tarraingteach go hintuigthe próiseáil idirbheart a fhorléiriú mar sheirbhís atá á tairiscint ag an mianadóir don seoltóir, i ndáiríre ní mór do gach nód sa líonra gach idirbheart a chuimsíonn mianadóir a phróiseáil, agus mar sin tá formhór mór an chostais phróiseála idirbhirt á iompar ag tríú páirtithe agus ní ag an mianadóir atá ag déanamh an chinnidh an áireofar nó nach gn-áireofar é. Mar sin, is beag seans go dtarlóidh fadhbanna tragóid na ndaoine coitianta.

Mar sin féin, mar a tharlaíonn, cealaíonn an locht sa mheicníocht atá bunaithe ar an margadh, nuair a thugtar toimhde simplithe mhíchruinn ar leith dó, é féin go draíochta. Seo a leanas an argóint. Cuir i gcás:

1. Is é an toradh a bhíonn ar idirbheart ná oibríochtaí `k`, ag tairiscint an luach saothair `kR` do mhianadóir ar bith a chuimsíonn é nuair a shocraíonn an seoltóir `R` agus tá `k` agus `R` (beagán) le feiceáil ag an mianadóir roimh ré.
2. Tá costas próiseála `C` ag oibríocht ar aon nód (. i. tá an éifeachtacht chéanna ag gach nód)
3. Tá nóid mhianadóireachta `N` ann, gach ceann acu ar cóimhéid le cumhacht próiseála (ie. `1/N` den iomlán)
4. Níl aon nóid iomlána neamh-mhianadóireachta ann.

Bheadh ​​​​mianadóir sásta idirbheart a phróiseáil má tá an luach saothair ionchais níos mó ná an costas. Mar sin, is é `kR/N` an luach saothair a bhfuiltear ag súil leis toisc go bhfuil seans `1/N` ag an mianadóir an chéad bhloc eile a phróiseáil, agus is é an costas próiseála don mhianadóir ` kC`. Mar sin, áireoidh mianadóirí idirbhearta ina bhfuil `kR/N > kC`, nó `R > NC`. Tabhair faoi deara gurb é `R` an táille in aghaidh na hoibríochta a sholáthraíonn an seoltóir, agus mar sin tá teorainn níos ísle ar an sochar a fhaigheann an seoltóir ón idirbheart, agus is é `NC` an costas don líonra iomlán le chéile chun oibríocht a phróiseáil. Dá bhrí sin, tá dreasacht ag mianadóirí gan ach na hidirbhearta sin a sháraíonn an sochar fónta iomlán ná an costas a chur san áireamh.

Mar sin féin, tá roinnt diallais thábhachtacha ann ó na boinn tuisceana sin i ndáiríre:

1. Íocann an miandóir costas níos airde chun an t-idirbheart a phróiseáil ná na nóid fíoraithe eile, ós rud é go gcuireann an t-am breise fíoraithe moill ar iomadú bloc agus dá bhrí sin méadaíonn sé an seans go mbeidh an bloc sean.
2. Tá nóid iomlána neamh-mhianadóireachta ann.
3. D'fhéadfadh go mbeadh an dáileadh cumhachta mianadóireachta go hiomlán míchothromaíoch i ndáiríre.
4. Tá amhantraithe, naimhde polaitiúla agus na gealta a n-áirítear ina bhfeidhm fóntais díobháil a dhéanamh don líonra ann, agus is féidir leo conarthaí a chur ar bun go cliste nuair a bhíonn a gcostas i bhfad níos ísle ná an costas a íocann nóid fhíoraithe eile.

(1) foráiltear claonadh sa mhianadóir níos lú idirbheart a áireamh, agus (2) méadaíonn `NC`; mar sin, cealaíonn an dá éifeacht chéile ar a laghad go páirteach.<sup>[Conas?]( https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> is iad (3) agus (4) is tábhachtaí; chun iad a réiteach ní dhéanaimid ach caidhp cothlúthaithe a bhunú: ní féidir níos mó oibríochtaí a bheith ag aon bhloc ná `BLK_LIMIT_FACTOR` an meán gluaiseachta easpónantúil fadtéarmach. Go sonrach:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

Is tairisigh iad `BLK_LIMIT_FACTOR` agus `EMA_FACTOR` a shocrófar go 65536 agus 1.5 faoi láthair, ach is dócha go n-athrófar iad tar éis tuilleadh anailíse.

Tá fachtóir eile ann a dhídhreasaíonn méideanna móra bloc i Bitcoin: tógfaidh sé níos faide bloic mhóra a iomadú, agus mar sin beidh dóchúlacht níos airde acu go mbeidh siad seanchaite. In Ethereum, is féidir go dtógfaidh sé níos mó ama ar bhloic a ídíonn cuid mhór gáis an dá cheann a iomadú toisc go bhfuil siad níos mó go fisiciúil agus toisc go dtógann sé níos mó ama chun aistrithe staide an idirbhirt a phróiseáil le bailíochtú. Is breithniú suntasach é an dídhreasacht moille seo i Bitcoin, ach níos lú ná sin in Ethereum mar gheall ar phrótacal GHOST; mar sin, trí bheith ag brath ar theorainneacha rialaithe bloc soláthraíonn sé bonnlíne níos cobhsaí.

### Comhláine Ríomha Agus Turing {#computation-and-turing-completeness}

Nóta tábhachtach ná go bhfuil an meaisín fíorúil Ethereum Turing-iomlán; ciallaíonn sé seo gur féidir le cód EVM aon ríomh a ionchódú is féidir a dhéanamh go samhlaíoch, lena n-áirítear lúba éigríochta. Ceadaíonn cód EVM lúbadh ar dhá bhealach. Ar dtús, tá treoir `JUMP` ann a ligeann don ríomhchlár léim siar go dtí an spota roimhe seo sa chód, agus treoir `JUMPI` chun léim choinníollach a dhéanamh, a cheadaíonn ráitis mar `while x < 27: x = x * 2`. Ar an dara dul síos, is féidir le conarthaí glaoch ar chonarthaí eile, rud a d'fhéadfadh lúbadh trí atarlú a cheadú. Cruthaíonn sé seo fadhb go nádúrtha: an féidir le húsáideoirí mailíseach mianadóirí agus nóid iomlána a dhúnadh go bunúsach trí iallach a chur orthu dul isteach i lúb éigríochta? Tagann an tsaincheist chun cinn mar gheall ar fhadhb san eolaíocht ríomhaireachta ar a dtugtar an fhadhb stad: níl aon bhealach ann a rá, go ginearálta, an dtiocfaidh nó nach dtiocfaidh deireadh le feidhmchlár áirithe.

Mar a thuairiscítear sa rannán aistrithe staide, oibríonn ár réiteach trí cheangal a chur ar idirbheart uaslíon céimeanna ríomhaireachtúla a cheadaítear dó a ghlacadh, agus má thógann sé níos faide é a rith filltear an ríomh ach bíonn táillí fós le híoc. Oibríonn teachtaireachtaí ar an mbealach céanna. Chun an spreagadh atá taobh thiar dár réiteach a thaispeáint, smaoinigh ar na samplaí seo a leanas:

- Cruthaíonn ionsaitheoir conradh a ritheann lúb éigríochta, agus ansin cuireann sé idirbheart chun an lúb sin a ghníomhachtú chuig an mianadóir. Cruthaíonn ionsaitheoir conradh a ritheann lúb éigríochta, agus ansin cuireann sé idirbheart chun an lúb sin a ghníomhachtú chuig an mianadóir. Cé go n-imíonn an rith amach as gás agus go stopann sé leath bealaigh tríd, tá an t-idirbheart fós bailí agus éilíonn an mianadóir an táille ón ionsaitheoir do gach céim ríomhaireachtúil.
- Cruthaíonn ionsaitheoir lúb éigríochta an-fhada le hintinn iallach a chur ar an mianadóir leanúint leis an ríomhaireacht chomh fada sin go mbeidh cúpla bloc eile tagtha amach faoin am a chríochnaíonn an ríomh agus ní bheidh sé indéanta don mhianadóir an t-idirbheart a chur san áireamh. chun an táille a éileamh. Beidh ar an ionsaitheoir, áfach, luach a chur isteach le haghaidh `STARTGAS` a theorannóidh líon na gcéimeanna ríomha is féidir leis an rith a dhéanamh, ionas go mbeidh a fhios ag an mianadóir roimh ré go nglacfaidh an ríomh líon ró-mhór céimeanna.
- Feiceann ionsaitheoir conradh le cód de chineál éigin mar `send(A,contract.storage[A]); contract.storage[A] = 0` agus seolann sé idirbheart ina bhfuil dóthain gáis chun an chéad chéim a rith ach ní an dara céim (.i. aistarraingt a dhéanamh ach gan an t-iarmhéid a ligean síos). Ní gá don údar conartha a bheith buartha faoi chosaint i gcoinne ionsaithe den sórt sin, mar má stopann rith leath bealaigh tríd filltear na hathruithe.
- Oibríonn conradh airgeadais trí mheán na naoi bhfotha sonraí dílsithe a ghlacadh chun riosca a íoslaghdú. Glacann ionsaitheoir ceann de na fothaí sonraí ar láimh, atá deartha le bheith inathraithe tríd an meicníocht glao inathraithe-seoladh a bhfuil cur síos air sa rannán ar DAO, agus tiontaíonn sé é chun lúb éigríochta a rith, agus ar an gcaoi sin déantar iarracht aon iarrachtaí cistí a éileamh ón gconradh airgeadais rith amach as gás. Mar sin féin, is féidir leis an gconradh airgeadais teorainn gháis a shocrú ar an teachtaireacht chun an fhadhb seo a chosc.

Is é an rogha eile seachas turing-iomláine ná Turing-neamhiomlán, áit nach bhfuil `JUMP` agus `JUMPI` ann agus nach gceadaítear ach cóip amháin de gach conradh a bheith sa chruach glaonna ag aon am ar leith. Leis an gcóras seo, b’fhéidir nach mbeadh gá leis an gcóras táillí luaite agus leis na héiginnteachtaí maidir le héifeachtacht ár réitigh, toisc go mbeadh an costas a bhainfeadh le conradh a rith teoranta ag a mhéid. Ina theannta sin, ní teorainn chomh mór sin é Turing-neamhiomlán; as na samplaí conartha go léir atá ceaptha againn go hinmheánach, go dtí seo níor theastaigh ach lúb amháin, agus d'fhéadfaí fiú an lúb sin a bhaint trí 26 athrá de phíosa cód aonlíne a dhéanamh. I bhfianaise na n-impleachtaí tromchúiseacha a bhaineann le iomláine Turing, agus an tairbhe theoranta, cén fáth nach mbeadh ann ach teanga Turing neamhiomlán? I ndáiríre, áfach, is fada ó réiteach néata ar an bhfadhb é Turing-neamhiomlán. Le fáil amach cén fáth, smaoinigh ar na conarthaí seo a leanas:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Anois, seol idirbheart chuig A. Mar sin, i 51 idirbheart, tá conradh againn a thógann suas le 2 chéim ríomhaireachtúla <sup>50</sup>. D’fhéadfadh mianadóirí iarracht a dhéanamh buamaí loighce den sórt sin a bhrath roimh an am trí luach a choinneáil taobh le gach conradh ag sonrú uaslíon na gcéimeanna ríomha is féidir leo a ghlacadh, agus é seo a ríomh le haghaidh conarthaí a ghlaonn conarthaí eile go hathchúrsach, ach a d’éileodh ar mianadóirí conarthaí a chosc a chruthaíonn. conarthaí eile (ó cruthaíodh agus gur féidir na 26 conradh thuas a chruthú agus a chur i gcrích go héasca a rolladh isteach in aon chonradh amháin). Fadhb eile is ea gur athróg é réimse seoltaí na teachtaireachta, agus mar sin go ginearálta b’fhéidir nach mbeifear in ann a rá cé na conarthaí eile a bheidh i gceist le conradh áirithe roimh an am. Mar sin, ar an iomlán, tá conclúid aisteach againn: Is éasca iomláine Turing a bhainistiú, agus bíonn easpa iomláine Turing chomh deacair céanna a bhainistiú mura bhfuil na rialuithe céanna i bhfeidhm - ach sa chás sin cén fáth nach ligtear don phrótacal a bheith Turing-iomlán?

### Airgeadra Agus Eisiúint {#currency-and-issuance}

Áirítear ar líonra Ethereum a airgeadra ionsuite féin, éitear, a fhreastalaíonn ar dhá chuspóir ciseal leachtachta príomhúil a sholáthar chun malartú éifeachtach idir cineálacha éagsúla sócmhainní digiteacha a cheadú agus, níos tábhachtaí fós, meicníocht a sholáthar chun táillí idirbhirt a íoc. Ar mhaithe le caoithiúlacht agus chun argóint sa todhchaí a sheachaint (féach an díospóireacht reatha mBTC/uBTC/satoshi i Bitcoin), déanfar na hainmníochtaí a réamh-lipéadú:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: éitear

Ba cheart é seo a ghlacadh mar leagan leathnaithe den choincheap "dollar" agus "cents" nó "BTC" agus "satoshi". Go luath amach anseo, táimid ag súil go n-úsáidfear "éitear" le haghaidh gnáth-idirbheart, "finney" le haghaidh micrea-idirbhearta agus "szabo" agus "wei" le haghaidh plé teicniúil maidir le táillí agus cur i bhfeidhm prótacail; féadfaidh na hainmníochtaí atá fágtha a bheith úsáideach níos déanaí agus níor cheart iad a áireamh i gcliant ag an bpointe seo.

Beidh an samhaltán eisiúna mar seo a leanas:

- Scaoilfear éitear i ndíolachán airgeadra ar phraghas 1000-2000 éitear in aghaidh an BTC, meicníocht atá beartaithe chun eagraíocht Ethereum a mhaoiniú agus íoc as forbairt a d'úsáid ardáin eile ar nós Mastercoin agus NXT go rathúil. Bainfidh ceannaitheoirí luatha leas as lascainí níos mó. Úsáidfear an BTC a fhaightear ón díolachán go hiomlán chun tuarastail agus deolchairí a íoc le forbróirí agus infheisteofar i dtionscadail éagsúla brabúis agus neamhbhrabúis san éiceachóras Ethereum agus criptea-airgeadra.
- 0.099x an méid iomlán a dhíoltar (60102216 ETH) a leithdháiltear ar an eagraíocht chun ranníocóirí luath a chúiteamh agus costais ainmnithe ETH a íoc roimh an bloc geineasas.
- 0.099x an méid iomlán a dhíoltar a choinneáil mar chúlchiste fadtéarmach.
- 0.26x an méid iomlán a dhíolfar a leithdháiltear ar mianadóirí in aghaidh na bliana go deo tar éis an bpointe sin.

| Grúpa                       | Ag lainseáil | Tar éis 1 bhliain | Tar éis 5 bliana |
| --------------------------- | ------------ | ----------------- | ---------------- |
| Aonaid airgeadra            | 1.198X       | 1.458X            | 2.498X           |
| Ceannaitheoirí              | 83.5%        | 68.6%             | 40.0%            |
| Cúlchiste caite réamhdhíola | 8.26%        | 6.79%             | 3.96%            |
| Cúlchiste úsáidte iar-díola | 8.26%        | 6.79%             | 3.96%            |
| Mianadóirí                  | 0%           | 17.8%             | 52.0%            |

#### Ráta Fáis Soláthair Fadtéarmach (céatadán)

![Boilsciú Ethereum](./ethereum-inflation.png)

_In ainneoin na heisiúna airgeadra líneach, díreach cosúil le Bitcoin le himeacht ama is gnách go dtéann an ráta fáis soláthair i dtreo nialas mar sin féin._

Is iad an dá phríomhrogha sa tsamhail thuas ná (1) comhthiomsú dearlaice a bheith ann agus a mhéid, agus (2) soláthar líneach atá ag fás go buan a bheith ann, i gcomparáid le soláthar caipínithe mar atá i Bitcoin. Is é seo a leanas an bonn cirt leis an linn dearlaice. Mura raibh an linn dearlaice ann, agus an t-eisiúint líneach laghdaithe go 0.217x chun an ráta boilscithe céanna a sholáthar, ansin bheadh ​​cainníocht iomlán an éitear 16.5% níos lú agus mar sin bheadh ​​​​gach aonad 19.8% níos luachmhaire. Mar sin, sa chothromaíocht cheannófaí 19.8% níos mó éitir sa díolachán, agus mar sin bheadh ​​gach aonad chomh luachmhar céanna arís agus a bhíodh. Bheadh ​​1.198x an oiread BTC ag an eagraíocht freisin, ar féidir a mheas a bheith roinnte ina dhá shlis: an BTC bunaidh, agus an 0.198x breise. Mar sin, tá an cás seo _díreach coibhéiseach_ leis an dearlaic, ach le difríocht thábhachtach amháin: níl ach BTC aag an eagraíocht, agus mar sin ní spreagtar í chun tacú le luach an aonad éitir.

Laghdaíonn an tsamhail buanfhás soláthair líneach an baol a mheasann roinnt daoine a bheith ann go mbeadh an iomarca comhchruinnithe saibhris i Bitcoin, agus tugann sé deis chothrom do dhaoine aonair atá ina gcónaí sa ré seo agus sa todhchaí aonaid airgeadra a fháil, agus ag an am céanna dreasacht láidir a choinneáil chun éitear a fháil agus a shealbhú toisc go bhfuil an "ráta fáis soláthair" mar chéatadán fós ag nialas le himeacht ama. Is é ár dtuairim freisin, toisc go gcailltear monaí i gcónaí le himeacht ama mar gheall ar mhíchúram, bás, srl, agus gur féidir caillteanas monaí a shamhaltú mar chéatadán den soláthar iomlán in aghaidh na bliana, go dtiocfaidh cobhsú ar luach iomlán an tsoláthair airgeadra atá i gcúrsaíocht ar deireadh thiar. comhionann leis an eisiúint bhliantúil roinnte ar an ráta caillteanais (m. sh. ag ráta caillteanais 1%, nuair a shroicheann an soláthar 26X ansin déanfar 0.26X a bhaint amach agus 0.26X caillte gach bliain, rud a chruthaíonn cothromaíochta).

Tabhair faoi deara, sa todhchaí, is dócha go n-aistreoidh Ethereum go múnla cruthúnais le haghaidh slándála, ag laghdú an riachtanas eisiúna go dtí áit éigin idir nialas agus 0.05X in aghaidh na bliana. Sa chás go gcailleann an eagraíocht Ethereum maoiniú nó go n-imíonn sé as ar chúis ar bith eile, fágaimid "conradh sóisialta" ar oscailt: tá sé de cheart ag duine ar bith leagan iarrthóra de Ethereum a chruthú sa todhchaí, agus is é an t-aon choinníoll ná go gcaithfidh cainníocht an éitir a bheith ar a mhéad cothrom le `60102216 * (1.198 + 0.26 * n)` áit arb é `n` líon na mblianta i ndiaidh an bhloc ghéinis. Tá cead ag cruthaitheoirí slua-dhíol nó cuid den difríocht nó an difríocht ar fad a shannadh ar bhealach eile idir an leathnú soláthair atá á thiomáint ag PoS agus an t-uasmhéadú soláthair incheadaithe chun íoc as an bhforbairt. D’fhéadfadh sé go mbeadh bonn cirt le huasghráduithe iarrthóirí nach gcomhlíonann an conradh sóisialta a chur isteach i leaganacha comhlíontacha.

### Lárú Mianadóireachta {#mining-centralization}

Oibríonn an t-algartam mianadóireachta Bitcoin trí iarraidh ar mhianadóirí SHA256 a ríomh ar leaganacha beagán modhnaithe den cheannteideal bloc na milliúin uaireanta arís agus arís eile, go dtí go dtiocfaidh nód amháin suas le leagan a bhfuil a hais níos lú ná an sprioc (thart ar 2<sup>192</sup> faoi láthair). Mar sin féin, tá an t-algartam mianadóireachta seo i mbaol ó dhá chineál láraithe. Sa chéad dul síos, tá an t-éiceachóras mianadóireachta faoi cheannas ASICs (ciorcaid iomlánaithe a bhaineann go sonrach le feidhm) anois, sliseanna ríomhaire atá deartha le haghaidh tasc sonrach mianadóireachta Bitcoin,, agus mar sin na mílte uaire níos éifeachtaí. Ciallaíonn sé seo nach bhfuil mianadóireacht Bitcoin ina shaothrú an-díláraithe agus cothromaíoch a thuilleadh, éilíonn sé na milliúin dollar caipitil le bheith rannpháirteach go héifeachtach ann. Sa dara háit, ní dhéanann an chuid is mó de na mianadóirí Bitcoin bailíochtú bloc go háitiúil i ndáiríre; ina ionad sin, bíonn siad ag brath ar chomhthiomsú mianadóireachta láraithe chun na ceannteidil bloc a sholáthar. D’fhéadfaí a mhaíomh go bhfuil an fhadhb seo níos measa: ó scríobhadh an méid seo, rialaíonn na trí linnte mianadóireachta is mó go hindíreach thart ar 50% den chumhacht próiseála i líonra Bitcoin, cé go maolaítear é seo toisc gur féidir le mianadóirí aistriú chuig linnte mianadóireachta eile má dhéanann linn nó comhaltas mianadóireachta iarracht ionsaí 51%.

Is í intinn Ethereum faoi láthair algartam mianadóireachta a úsáid ina n-éilítear ar mhianadóirí sonraí randamacha a fháil ón staid, roinnt idirbheart a roghnaíodh go randamach a ríomh ó na bloic N deiridh sa bhlocshlabhra, agus hais an toraidh a sheoladh ar ais. Tá dhá bhuntáiste thábhachtacha ag baint leis seo. Sa chéad áit, is féidir go n-áireofaí ríomh de chineál ar bith i gconarthaí Ethereum, mar sin bheadh ​​​​ASIC Ethereum go bunúsach ina ASIC le haghaidh ríomh ginearálta - ie. LAP níos fearr. Ar an dara dul síos, éilíonn mianadóireacht rochtain ar an mblocshlabhra iomlán, rud a chuireann iallach ar mhianadóirí an blocshlabhra iomlán a stóráil agus a bheith in ann gach idirbheart a fhíorú ar a laghad. Cuireann sé seo deireadh leis an ngá atá le linnte mianadóireachta láraithe; cé gur féidir le linnte mianadóireachta freastal fós ar an ról dlisteanach a bhaineann le randamacht dáileadh luach saothair a chothromú, is féidir freastal chomh maith céanna ar an bhfeidhm seo trí chomhthiomsuithe piara le piaraí nach bhfuil aon smacht lárnach acu.

Tá an tsamhail seo gan tástáil, agus d'fhéadfadh deacrachtaí a bheith ann maidir le leas iomlán a bhaint as optamuithe cliste áirithe a sheachaint agus rith conartha á úsáid mar algartam mianadóireachta. Gné an-suimiúil amháin den algartam seo, áfach, is ea go gceadaíonn sé do dhuine ar bith "an tobar a nimhiú", trí líon mór conarthaí a thabhairt isteach sa bhlocshlabhra atá deartha go sonrach chun ASICanna áirithe a chosc. Tá dreasachtaí eacnamaíocha ann do mhonaróirí ASIC cleas den sórt sin a úsáid chun ionsaí a dhéanamh ar a chéile. Mar sin, is réiteach oiriúnaitheach eacnamaíoch daonna é an réiteach atá á fhorbairt againn ar deireadh seachas réiteach teicniúil amháin.

### Inscálaitheacht {#scalability}

Ábhar imní coitianta amháin faoi Ethereum ná ceist na hinscálaitheachta. Cosúil le Bitcoin, tá sé de locht ar Ethereum gur gá gach idirbheart a phróiseáil ag gach nód sa líonra. Le Bitcoin, luíonn méid an blocshlabhra reatha ag thart ar 15 GB, ag fás de thart ar 1 MB in aghaidh na huaire. Dá ndéanfadh an líonra Bitcoin idirbhearta 2000 Visa in aghaidh an tsoicind a phróiseáil, d'fhásfadh sé 1 MB in aghaidh na trí shoicind (1 GB in aghaidh na huaire, 8 TB in aghaidh na bliana). Is dócha go bhfulaingeoidh Ethereum patrún fáis den chineál céanna, níos measa mar go mbeidh go leor iarratas ar bharr an bhlocshlabhra Ethereum in ionad airgeadra díreach mar atá an cás le Bitcoin, ach feabhsaithe mar nach gcaithfidh Ethereum ach nóid iomlána a stóráil seachas stair iomlán an bhlocshlabhra.

Is í an fhadhb le blocshlabhra chomh mór an riosca láraithe. Má mhéadaíonn an méid blocshlabhra go, abair, 100 TB, is é an cás dóchúil ná nach mbeadh ach líon an-bheag gnólachtaí móra ag rith nóid iomlána, agus na húsáideoirí rialta go léir ag baint úsáide as nóid SPV éadroma. I gcás mar seo, bheadh sé ina ábhar imní go bhféadfadh na nóid iomlána teacht le chéile agus aontú chun caimiléireacht a dhéanamh i slí brabúsach (mar shampla, athrú ar an deolchaire bloic, nó BTC a thabhairt dóibh féin). Ní bheadh ​​aon bhealach ag nóid solais é seo a bhrath láithreach. Ar ndóigh, is dócha go mbeadh nód iomlán macánta amháin ann, agus tar éis cúpla uair an chloig bheadh ​​faisnéis faoin gcalaois breactha amach trí bhealaí cosúil le Reddit, ach ag an bpointe sin bheadh ​​​​sé ró-dhéanach: bheadh ​​​​sé faoi na gnáthúsáideoirí iarracht a eagrú chun na bloic a tugadh a chur ar liosta dubh, fadhb chomhordaithe ollmhór agus ní dócha go mbeadh sé indéanta ar scála cosúil leis an gceann a bhain le hionsaí rathúil 51%. I gcás Bitcoin, is fadhb é seo faoi láthair, ach tá modhnú blocshlabhra ann [molta ag Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) a mhaolóidh an cheist seo.

Sa luath-théarma, úsáidfidh Ethereum dhá straitéis bhreise chun dul i ngleic leis an bhfadhb seo. Ar an gcéad dul síos, mar gheall ar na halgartaim mianadóireachta atá bunaithe ar blocshlabhra, beidh iallach gach mianadóir a bheith ina nód iomlán ar a laghad, rud a chruthaíonn teorainn níos ísle ar líon na nóid iomlána. Ar an dara dul síos agus níos tábhachtaí fós, áfach, áireoimid fréamh crainn staide idirmheánaigh sa bhlocshlabhra tar éis gach idirbheart a phróiseáil. Fiú má tá bailíochtú bloic láraithe, chomh fada agus atá nód fíoraithe macánta amháin ann, is féidir an fhadhb láraithe a shárú trí phrótacal fíorúcháin. Má fhoilsíonn mianadóir bloc neamhbhailí, ní foláir go bhfuil an bloc sin formáidithe go dona, nó go bhfuil an staid `S[n]` mícheart. Ós eol go bhfuil `S[0]` ceart, caithfidh go bhfuil an chéad staid `S[i]` mícheart nuair a bhíonn `S[i-1]` ceart. Thabharfadh an nód fíoraithe an t-innéacs `i`, mar aon le "cruthúnas neamhbhailíochta" ina mbeadh an fothacar de nóid chrainn Patricia ar gá `APPLY(S[i-1],TX[i]) -> S[i]` a phróiseáil. Bheadh ​​na nóid in ann na nóid sin a úsáid chun an chuid sin den ríomh a rith, agus a fheiceáil nach bhfuil an `S[i]` ginte ag teacht leis an `S[i]` a soláthraíodh.

Ionsaí eile, níos sofaisticiúla, a bheadh ​​i gceist leis na mianadóirí mailíseacha ag foilsiú bloic neamhiomlána, mar sin níl an fhaisnéis iomlán ann fiú chun a chinneadh an bhfuil bloic bailí nó nach bhfuil. Is é an réiteach air seo ná prótacal freagartha dúshláin: eisíonn nóid fíoraithe "dúshláin" i bhfoirm innéacsanna sprice idirbhearta, agus nuair a aimsíonn siad nód éadrom déileálann siad leis an mbloc mar rud nach bhfuil iontaofa go dtí go soláthraíonn nód eile, an mianadóir nó fíoraitheoir eile é, fothacar de nóid Patricia mar chruthúnas ar bhailíocht.

## Conclúid {#conclusion}

Ceapadh prótacal Ethereum ar dtús mar leagan uasghrádaithe de criptea-airgeadra, ag soláthar ardghnéithe mar eascró ar-blocshlabhra, teorainneacha aistarraingthe, conarthaí airgeadais, margaí cearrbhachais agus a leithéidí trí theanga ríomhchlárúcháin an-ghinearálaithe. Ní thacódh prótacal Ethereum le haon cheann de na hiarratais go díreach, ach ciallaíonn teanga ríomhchláraithe Turing-iomlán a bheith ann gur féidir conarthaí treallacha a chruthú go teoiriciúil le haghaidh aon chineál idirbhirt nó feidhmchlár. Is é an rud atá níos suimiúla faoi Ethereum, áfach, ná go mbogann prótacal Ethereum i bhfad níos faide ná airgeadra díreach. D’fhéadfadh prótacail a bhaineann le stóras comhad díláraithe, ríomh díláraithe agus margaí tuar díláraithe, i measc an iliomad coincheap eile den sórt sin, éifeachtúlacht an tionscail ríomhaireachtúil a mhéadú go suntasach, agus borradh ollmhór a chur faoi phrótacail eile idir piaraí trí chur leis an ciseal eacnamaíoch den chéad uair. Ar deireadh, tá raon suntasach feidhmchlár ann freisin nach bhfuil baint ar bith acu leis an airgead.

Soláthraíonn coincheap heidhm aistrithe staide treallach mar a chuirtear i bhfeidhm é ag prótacal Ethereum ardán a bhfuil acmhainneacht uathúil aige; seachas a bheith ina phrótacal aonfheidhme dúnta atá beartaithe le haghaidh raon sainiúil feidhmchlár i stóras sonraí, i gcearrbhachas nó i gcúrsaí airgeadais, tá Ethereum oscailte ó thaobh dearaidh de, agus creidimid go bhfuil sé thar a bheith feiliúnach chun fónamh mar chiseal dúshraithe do líon an-mhór de phrótacail airgeadais agus neamhairgeadais sna blianta atá le teacht.

## Nótaí agus Tuilleadh Léitheoireachta {#notes-and-further-reading}

### Nótaí {#notes}

1. Féadfaidh léitheoir sofaisticiúla a thabhairt faoi deara gur hais eochair phoiblí an chuair éiliptigh is ea seoladh Bitcoin i ndáiríre, agus ní an eochair phoiblí féin. Mar sin féin, is téarmaíocht chripteagrafach fhíordhlisteanach é tagairt a dhéanamh don hais pubkey mar eochair phoiblí féin. Tá sé seo toisc gur féidir cripteagrafaíocht Bitcoin a mheas mar algartam sínithe digiteach saincheaptha, áit a bhfuil an eochair phoiblí comhdhéanta de hais an ECC pubkey, is éard atá sa síniú an pubkey ECC atá comhghaolaithe le síniú an ECC, agus is éard atá i gceist leis an algartam fíoraithe seiceáil an ECC pubkey sa síniú i gcoinne an ECC pubkey hais ar fáil mar eochair phoiblí agus ansin a fhíorú an síniú ECC i gcoinne an pubkey ECC.
2. Go teicniúil, airmheán de na 11 bloic roimhe seo.
3. Go hinmheánach, is uimhreacha <sup>[fn3](#notes)</sup> iad 2 agus "CHARLIE", agus tá an dara ceann acu i mbunús mór-cheannaigh 256. Is féidir le huimhreacha a bheith 0 ar a laghad agus 2<sup>256</sup>-1 ar a mhéad.

### Further Reading {#further-reading}

1. [Luach intreach](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Maoin chliste](https://en.bitcoin.it/wiki/Smart_Property)
3. [Conarthaí cliste](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Cruthúnas oibre ath-inúsáidte](https://nakamotoinstitute.org/finney/rpow/)
6. [Teidil maoine a dhaingniú le húdarás úinéara](https://nakamotoinstitute.org/secure-property-titles/)
7. [Páipéar bán Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triantán Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Páipéar bá na monaí daite](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Páipéar bán Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Corparáidí uathrialaitheacha díláraithe, Irisleabhar Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Fíorú íocaíochta simplithe](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Crainn merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Crainn Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ agus Gníomhairí Uathrialacha, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn ar Mhaoin Chliste ag Féile Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Crainn Ethereum Merkle Patricia](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd ar chrainn suim Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Le haghaidh stair an pháipéir bháin, féach [an vicí seo](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Tá Ethereum, cosúil le go leor tionscadal bogearraí foinse oscailte faoi stiúir an phobail, tar éis athrú ó bunaíodh é. Chun foghlaim faoi na forbairtí is déanaí ar Ethereum, agus conas a dhéantar athruithe ar an bprótacal, molaimid [an treoir seo](/learn/)._
