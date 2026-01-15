---
title: Dea-chleachtais deartha um mhalartú díláraithe (DEX)
description: Treoir a mhíníonn cinntí UX/UI chun comharthaí a mhalartú.
lang: ga
---

Ó seoladh Uniswap in 2018, tá na céadta malartuithe díláraithe seolta ar fud an iliomad slabhraí éagsúla.
Thug go leor díobh seo gnéithe nua isteach nó chuir siad a gcor féin leo, ach d'fhan an comhéadan mar a chéile go ginearálta.

Cúis amháin leis seo ná [Dlí Jakob](https://lawsofux.com/jakobs-law/):

> Caitheann úsáideoirí an chuid is mó dá gcuid ama ar shuímh eile. Ciallaíonn sé seo gur fearr le húsáideoirí go n-oibreoidh do shuíomh ar an mbealach céanna leis na suímh eile go léir a bhfuil aithne acu orthu cheana féin.

A bhuí le nuálaithe luatha mar Uniswap, Pancakeswap, agus Sushiswap, tá comhthuiscint ag úsáideoirí DeFi ar an gcuma atá ar DEX.
Ar an gcúis seo, tá rud éigin cosúil le “dea-chleachtas” ag teacht chun cinn anois. Feicimid níos mó agus níos mó cinntí dearaidh á gcaighdeánú trasna suíomhanna. Is sampla ollmhór den tástáil bheo iad na DEXanna. D’fhan rudaí a d’oibrigh, agus caitheadh amach na rudaí nár oibrigh. Tá spás ann do phearsantacht fós, ach tá caighdeáin áirithe ann ar cheart do DEX cloí leo.

Is achoimre é an t-alt seo ar:

- cad atá le cur san áireamh
- conas é a dhéanamh chomh inúsáidte agus is féidir
- na príomhbhealaí chun an dearadh a shaincheapadh

Rinneadh na frámaí sreang samplacha go léir go sonrach don Airteagal seo, cé go bhfuil siad go léir bunaithe ar thionscadail fhíora.

Tá an trealamh Figma san áireamh freisin ag bun an leathanaigh - ná bíodh drogall ort é a úsáid agus do shreangfhrámaí féin a bhrostú!

## Anatamaíocht bhunúsach DEX {#basic-anatomy-of-a-dex}

Go ginearálta tá trí ghné san Chomhéadain:

1. Príomhfhoirm
2. Cnaipe
3. Painéal sonraí

![Chomhéadain Cineálach DEX, ag taispeáint na trí phríomhghné](./1.png)

## Athruithe {#variations}

Beidh sé seo ina théama coitianta san airteagal seo, ach tá bealaí éagsúla inar féidir na heilimintí seo a eagrú. Is féidir leis an “painéal sonraí” a bheith:

- Os cionn an cnaipe
- Faoin gcnaipe
- I bhfolach i bpainéal cairdín
- Agus/nó ar mhodh “réamhamharc”

N.B. Tá modúl “réamhamharic” roghnach, ach mura bhfuil ach fíorbheagán sonraí á thaispeáint agat ar an bpríomh-chomhéadain, beidh sé riachtanach.

## Struchtúr na príomhfhoirme {#structure-of-the-main-form}

Is é seo an bosca ina roghnaíonn tú i ndáiríre an comhartha is mian leat a mhalartú. Is éard atá sa chomhpháirt réimse ionchuir agus cnaipe beag i ndiaidh a chéile.

Is gnách go dtaispeánann DEXanna sonraí breise i ró amháin thuas agus i sraith amháin thíos, cé gur féidir é seo a chumrú ar bhealach difriúil.

![Ró ionchuir, le sraith sonraí thuas agus thíos](./2.png)

## Athruithe {#variations2}

Taispeántar dhá athrú Comhéadain anseo; ceann gan teorainneacha, a chruthaíonn dearadh an-oscailte, agus ceann ina bhfuil teorainn leis an tsraith ionchuir, a chruthaíonn fócas ar an eilimint sin.

![Dhá athrú Chomhéadain den phríomhfhoirm](./3.png)

Leis an struchtúr bunúsach seo is féidir **ceithre phríomhphíosa eolais** a thaispeáint sa dearadh: ceann amháin i ngach cúinne. Mura bhfuil ann ach ró barr/bun amháin, níl ach dhá spota ann.

Le linn éabhlóid DeFi, cuireadh go leor rudaí éagsúla san áireamh anseo.

## Príomhfhaisnéis le {#key-info-to-include}

- Iarmhéid sa sparán
- Cnaipe uasta
- Comhionann Fiat
- Tionchar praghais ar an méid “faighte”

I laethanta tosaigh DeFi, bhí an choibhéis fiat in easnamh go minic. Má tá tú ag tógáil aon sórt tionscadail Web3, tá sé riachtanach go dtaispeántar coibhéis fiat. Smaoiníonn úsáideoirí fós i dtéarmaí airgeadraí áitiúla, mar sin d'fhonn samhlacha meabhracha an domhain fíor a mheaitseáil, ba cheart é seo a chur san áireamh.

Ar an dara réimse (an ceann ina roghnaíonn tú an comhartha a bhfuil tú ag malartú dó) is féidir leat an tionchar praghais in aice leis an méid airgeadra fiat a áireamh freisin, tríd an difríocht idir an méid ionchuir agus méideanna measta aschuir a ríomh. Is mionsonra úsáideach é seo le cur san áireamh.

Is féidir le cnaipí céatadáin (m.sh. 25%, 50%, 75%) a bheith úsáideach mar ghné, ach tógann siad níos mó spáis, cuireann siad níos mó glaonna le gníomhartha, agus cuireann siad ualach meabhrach níos mó orthu. Mar an gcéanna le sleamhnáin chéatadáin. Beidh cuid de na cinntí Chomhéadain seo ag brath ar do bhranda agus ar do chineál úsáideora.

Is féidir sonraí breise a thaispeáint faoin bpríomhfhoirm. Toisc go mbaineann an cineál seo faisnéise den chuid is mó le húsáideoirí pro, tá ciall leis:

- coinnigh é chomh íosta agus is féidir, nó;
- folaigh i bpainéal cairdín é

![Mionsonraí léirithe i gcoirnéil na príomhfhoirme sin](./4.png)

## Faisnéis bhreise le {#extra-info-to-include} a chur san áireamh

- Praghas dearbháin
- Sciorradh
- Íosmhéid faighte
- Aschur ionchais
- Tionchar praghais
- Meastachán ar chostais gháis
- Táillí eile
- Ordú ródaithe

D’fhéadfaí a mhaíomh, go bhféadfadh cuid de na sonraí seo a bheith roghnach.

Tá ordú ródaithe suimiúil, ach ní dhéanann sé mórán difríochta don chuid is mó d’úsáideoirí.

Níl i roinnt sonraí eile ach an rud céanna a athlua ar bhealaí éagsúla. Mar shampla is dhá thaobh den bhonn chéanna iad “íosmhéid faighte” agus “sleamhnú”. Má tá sciorradh socraithe agat ag 1%, ansin an t-íosmhéid ar féidir leat a bheith ag súil leis = aschur ionchais-1%. Léireoidh roinnt UIanna méid ionchais, íosmhéid, agus sciorradh… Atá úsáideach ach b'fhéidir iomarcach.

Fágfaidh formhór na n-úsáideoirí sciorradh réamhshocraithe ar aon nós.

Is minic a léirítear “tionchar praghais” idir lúibíní in aice leis an gcoibhéis fiat sa réimse “go”. Is mionsonra ux iontach é seo le cur leis, ach má léirítear anseo é, an gá é a thaispeáint arís thíos i ndáiríre? Agus ansin arís ar scáileán réamhamhairc?

Is cuma le go leor úsáideoirí (go háirithe iad siúd a bhíonn ag malartú méideanna beaga) faoi na sonraí seo; ní bheidh siad ag iontráil uimhir agus ag bualadh babhtáil.

![Léiríonn roinnt sonraí an rud céanna](./5.png)

Braithfidh na sonraí beachta a thaispeánfar ar do lucht féachana agus cad ba mhaith leat a bheith san aip.

Má chuireann tú lamháltas sciorrtha san áireamh sa phainéal sonraí, ba cheart duit é a chur in eagar go díreach as seo. Is sampla maith é seo de “luasaire”; cleas UX néata ar féidir leis sreafaí úsáideoirí a bhfuil taithí acu a bhrostú, gan cur isteach ar inúsáidteacht ghinearálta na haipe.

![Is féidir sciorradh a rialú ón bpainéal sonraí](./6.png)

Is fiú smaoineamh go cúramach ní hamháin ar phíosa faisnéise ar leith ar scáileán amháin, ach ar an sreabhadh iomlán trí:
Uimhreacha a chur isteach sa Phríomhfhoirm → Sonraí Scanta → Cliceáil ar an Scáileán Réamhamhairc (má tá scáileán réamhamhairc agat).
Ar chóir go mbeadh an painéal sonraí le feiceáil i gcónaí, nó an gá don úsáideoir cliceáil air chun é a leathnú?
Ar cheart duit frithchuimilt a chruthú trí scáileán réamhamhairc a chur leis? Cuireann sé seo iallach ar an úsáideoir a thrádáil a mhoilliú agus a mheas, rud is féidir a bheith úsáideach. Ach ar mhaith leo an t-eolas céanna a fheiceáil arís? Cad é is úsáidí dóibh ag an bpointe seo?

## Roghanna dearaidh {#design-options}

Mar a luadh, braitheann go leor de seo ar do stíl phearsanta
Cé hé d'úsáideoir?
Cad é do bhranda?
Ar mhaith leat comhéadan “proifisiúnta” a thaispeánann gach mionsonra, nó ar mhaith leat a bheith íostach?
Fiú má tá tú ag díriú ar na húsáideoirí pro atá ag iarraidh gach eolas is féidir, ba cheart duit cuimhneamh fós ar fhocail ciallmhar Alan Cooper:

> Is cuma cé chomh hálainn, is cuma cé chomh faiseanta do chomhéadan, is fearr níos lú de a bheith ann.

### Struchtúr {#structure}

- comharthaí ar chlé, nó comharthaí ar dheis
- 2 ró nó 3 ró
- sonraí os cionn nó faoi bhun an chnaipe
- sonraí leathnaithe, íoslaghdaithe, nó nach bhfuil léirithe

### Stíl chomhpháirte {#component-style}

- folamh
- imlínithe
- líonadh

Ó thaobh UX glan de, tá stíl Chomhéadain níos lú ná mar a cheapann tú. Tagann agus téann treochtaí amhairc i dtimthriallta, agus tá go leor de tosaíocht suibiachtúil.

Is é an bealach is éasca chun tuiscint a fháil air seo - agus smaoineamh ar na cumraíochtaí éagsúla - ná breathnú ar roinnt samplaí agus ansin roinnt turgnamh a dhéanamh leat féin.

Tá comhpháirteanna folmha, imlíne agus líonta sa trealamh Figma atá san áireamh.

Breathnaigh ar na samplaí thíos chun bealaí éagsúla a fheiceáil inar féidir leat é a chur le chéile:

![3 shraith i stíl líonta](./7.png)

![3 shraith i stíl imlíne](./8.png)

![2 shraith i stíl folamh](./9.png)

![3 shraith i stíl imlíne, le painéal sonraí](./10.png)

![3 shraith leis an tsraith ionchuir i stíl imlíne](./11.png)

![2 shraith i stíl líonta](./12.png)

## Ach cén taobh ar cheart don chomhartha dul air? {#but-which-side-should-the-token-go-on}

Is é an príomhrud ná gur dócha nach ndéanann sé difríocht mhór don inúsáidteacht. Tá roinnt rudaí le cur san áireamh, áfach, a d’fhéadfá a chur faoi smacht, bealach amháin nó bealach eile.

Bhí sé suimiúil go leor an faisean a fheiceáil ag athrú le himeacht ama. Ar dtús bhí an comhartha ag Uniswap ar chlé, ach tá sé tar éis bogadh ar dheis ó shin. Rinne Sushiswap an t-athrú seo freisin le linn uasghrádú dearaidh. Lean formhór na bprótacal, ach ní iad léir, an nós seo.

Go traidisiúnta cuireann coinbhinsiún airgeadais an tsiombail airgeadra roimh an uimhir, e.g., $50, €50, £50, ach _deirimid_ 50 dollar, 50 Euro, 50 punt.

Don úsáideoir ginearálta - go háirithe duine a léann ó chlé go deas, ó bharr go bun - is dócha go mothaíonn comhartha ar dheis níos nádúrtha.

![UI le comharthaí ar chlé](./13.png)

Tá cuma thaitneamhach shiméadrach an comhartha a chur ar chlé agus na huimhreacha go léir ar dheis, agus is buntáiste é sin, ach tá míbhuntáiste eile ag baint leis an leagan amach seo.

Sonraítear i ndlí na gaireachta go mbreathnaítear ar nithe atá gar dá chéile a bheith gaolmhar. Dá réir sin, ba mhaith linn míreanna gaolmhara a chur in aice lena chéile. Baineann an t-iarmhéid chomharthaí go díreach leis an chomhartha féin, agus athrófar é nuair a roghnaítear comhartha nua. Déanann sé beagán níos mó céille dá bhrí sin an t-iarmhéid chomharthaí a chur in aice leis an gcnaipe roghnaithe comharthaí. D’fhéadfaí é a bhogadh faoin chomhartha, ach briseann sé sin siméadracht an leagan amach.

I ndeireadh na dála, tá buntáistí agus míbhuntáistí ann don dá rogha, ach tá sé suimiúil gur cosúil go bhfuil an treocht i dtreo comharthaí ar dheis.

## Iompar cnaipe {#button-behavior}

Ná bíodh cnaipe ar leith agat le haghaidh Faomhadh. Chomh maith leis sin ná bíodh cliceáil ar leith agat le haghaidh Ceadaigh. Is mian leis an úsáideoir Babhtáil, mar sin abair “babhtáil” ar an gcnaipe agus cuir tús leis an gceadú mar an chéad chéim. Is féidir le modal dul i láthair le céimire, nó le fógra simplí 'tx 1 de 2 - á cheadú'.

![UI le cnaipí ar leith le haghaidh ceadaigh agus babhtáil](./14.png)

![UI le cnaipe amháin a deir ceadaigh](./15.png)

### Cnaipe mar chabhair chomhthéacsúil {#button-as-contextual-help}

Is féidir leis an gcnaipe dualgas dúbailte a dhéanamh mar fholáireamh!

Is patrún dearaidh measartha neamhghnách é seo taobh amuigh de Web3, ach tá sé tar éis éirí caighdeánach laistigh de. Is nuálaíocht mhaith é seo toisc go sábhálann sé spás, agus coinníonn sé aird dírithe.

Mura bhfuil an príomhghníomh - SWAP - ar fáil mar gheall ar earráid, is féidir an chúis a mhíniú leis an gcnaipe, m.sh.:

- lasc líonra
- ceangail sparán
- earráidí éagsúla

Is féidir an cnaipe a **mhapáil chuig an ngníomh** freisin nach mór a dhéanamh. Mar shampla, murar féidir leis an úsáideoir babhtáil toisc go bhfuil siad ar an líonra mícheart, ba chóir go ndéarfadh an cnaipe "athraigh go Ethereum", agus nuair a chliceálann an t-úsáideoir ar an gcnaipe, ba chóir dó an líonra a aistriú go Ethereum. Cuireann sé seo go mór le sreabhadh an úsáideora.

![Príomhghníomhartha á dtionscnamh ón bpríomh-CTA](./16.png)

![Teachtaireacht earráide léirithe laistigh den phríomh CTA](./17.png)

### Tóg do cheann féin leis an gcomhad figma seo {#build-your-own-with-this-figma-file}

A bhuí le hobair chrua na bprótacal iolrach, tá feabhas mór tagtha ar dhearadh DEX. Tá a fhios againn cén fhaisnéis a theastaíonn ón úsáideoir, conas ba cheart dúinn é a thaispeáint, agus conas an sreabhadh a dhéanamh chomh réidh agus is féidir.
Tá súil agam go dtugann an t-alt seo forbhreathnú láidir ar phrionsabail UX.

Más mian leat triail a bhaint as, ná bíodh leisce ort an trealamh sreangfhráma Figma a úsáid. Coinnítear é chomh simplí agus is féidir, ach tá go leor solúbthachta aige chun an bunstruchtúr a thógáil ar bhealaí éagsúla.

[Figma sreangfhráma trealamh](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

Leanfaidh DeFi ag éabhlóidiú, agus tá deis ann i gcónaí feabhas a chur ar.

Ádh mór!
