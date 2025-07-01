---
title: Gasper
description: Míniú ar mheicníocht cruthúnas-de-gill Gasper.
lang: ga
---

Is meascán é Gasper de Casper the Friendly Finality Gadget (Casper-FFG) agus an algartam rogha forc LMD-GHOST. Cruthaíonn na comhpháirteanna seo le chéile an mheicníocht chomhtdhearcaidh chun cruthúnas-gill Ethereum a fháil. Is é Casper an mheicníocht a uasghrádaíonn bloic áirithe go "críochnú" ionas gur féidir le hiontrálaithe nua isteach sa líonra a bheith muiníneach go bhfuil siad ag sioncronú an slabhra canónach. Úsáideann an t-algartam rogha forc vótaí carntha chun a chinntiú gur féidir le nóid an ceann ceart a roghnú go héasca nuair a thagann foirc chun cinn sa bhlocshlabhra.

**Tabhair faoi deara** gur nuashonraíodh an sainmhíniú bunaidh ar Casper-FFG beagán le cur san áireamh in Gasper. Ar an leathanach seo breithnímid an leagan nuashonraithe.

## Réamhriachtanais

Chun an t-ábhar seo a thuiscint is gá an leathanach tosaigh ar [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) a léamh.

## An ról atá ag Gasper {#role-of-gasper}

Suíonn Gasper ar bharr blocshlabhra cruthúnas-gill ina soláthraíonn nóid éitear mar thaisce slándála is féidir a scrios má tá siad leisciúil nó mímhacánta maidir le bloic a mholadh nó a bhailíochtú. Is é Gasper an mheicníocht a shainíonn conas a fhaigheann bailíochtóirí luach saothair agus a ngearrtar pionós orthu, a ndéanann siad cinneadh ar na bloic a nglacfar leo agus a dhiúltófar, agus cén forc den bhlocshlabhra ar chóir tógáil air.

## Cad is críochnaitheacht ann? {#what-is-finality}

Is maoin de chuid bloic áirithe é críochnúlacht a chiallaíonn nach féidir iad a thabhairt ar ais mura rud é go raibh teipthe comhdhearcadh criticiúil ann agus go bhfuil 1/3 ar a laghad den éitear cruachta iomlán scriosta ag ionsaitheoir. Is féidir smaoineamh ar bhlocanna críochnaithe mar fhaisnéis a bhfuil an blocshlabhra cinnte faoi. Ní mór do bhloc dul trí nós imeachta uasghrádaithe dhá chéim chun bloc a thabhairt chun críche:

1. Caithfidh gur vótáil dhá thrian den éitear iomlán atá geallta i bhfabhar cuimsiú an bhloc sin sa slabhra canónach. Uasghrádaíonn an coinníoll seo an bloc go "comhfhadaithe". Ní dócha go gcuirfear bloic chomhfhadaithe ar ais, ach is féidir leo a bheith faoi choinníollacha áirithe.
2. Nuair a bhíonn bloc comhfhadaithe eile ar bharr bloc inchosanta, déantar é a uasghrádú go "críochnú". Is gealltanas é bloc a thabhairt chun críche chun an bloc a áireamh sa slabhra canónach. Ní féidir é a fhilleadh mura scriosann ionsaitheoir na milliúin éitear (na billiúin $USD).

Ní tharlaíonn na huasghráduithe bloc seo i ngach sliotán. Ina áit sin, ní féidir ach bloic teorann ré a chomhfhadú agus a thabhairt chun críche. Tugtar "seicphointí" ar na bloic seo. Measann uasghrádú péirí seicphointí. Ní mór go mbeadh “nasc sártromlagih” ann idir dhá sheicphointí as a chéile (i.e. dhá thrian den vótáil iomlán éitir i ngeall gurb é seicphointe B an sliocht ceart de sheicphointe A) chun an seicphointe is lú déanaí a uasghrádú go dtí gur tugadh chun críche é agus go bhfuil an mbloc is déanaí comhfhadaithe.

Toisc go n-éilíonn críochnaitheacht comhaontú dhá thrian go bhfuil bloc canónach, ní féidir le hionsaitheoir slabhra críochnaithe eile a chruthú gan:

1. In úinéireacht ar nó ag ionramháil dhá thrian den éitear iomlán i gceist.
2. Ag scriosadh ar a laghad aon trian den éitear iomlán i gceist.

Tagann an chéad choinníoll chun cinn toisc go bhfuil gá le dhá thrian den éitear atá i gceist le slabhra a thabhairt chun críche. Tagann an dara coinníoll chun cinn mar má tá dhá thrian den ghealltanas iomlán tar éis vótáil i bhfabhar an dá fhorc, ansin caithfidh aon trian vótáil ar an dá cheann. Coinníoll slaiseála is ea vótáil faoi dhó a ghearrfaí an píonós is mó air, agus scriosfaí aon trian den gheall iomlán. Ó mhí na Bealtaine 2022, éilíonn sé seo ar ionsaitheoir luach timpeall $10 billiún d'éitear a dhó. Is foirm beagán modhnaithe é an t-algartam a thugann údar agus a thugann chun críche bloic in Gasper de [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Dreasachtaí agus Slaiseáil {#incentives-and-slashing}

Tugtar luaíocht do bhailíochtóirí as bloic a mholadh agus a bhailíochtú go hionraic. Bronntar luaíocht ar éitear agus cuirtear lena ngeall é. Ar an láimh eile, ní chailleann bailíochtóirí atá as láthair agus nach ngníomhaíonn siad nuair a iarrtar orthu na luaíochtaí seo agus uaireanta caillfidh siad cuid bheag dá ngeallta reatha. Mar sin féin, is beag na pionóis as a bheith as líne agus, i bhformhór na gcásanna, is ionann iad agus costais deise a bhaineann le luaíocht a chailliúint. Mar sin féin, tá sé an-deacair roinnt gníomhartha bailíochtóra a dhéanamh de thaisme agus léiríonn siad rún mailíseach éigin, mar shampla bloic iolracha a mholadh don sliotán céanna, fianú bloic iolracha don sliotán céanna, nó dul in aghaidh na vótaí seicphointe roimhe seo. Is iompraíochtaí “slaiseála” iad seo a ngearrtar pionós níos géire orthu – scriostar cuid de sciar an bhailíochtóra agus baintear an bailíochtóir as líonra na mbailíochtóirí dá bharr. Tógann an próiseas seo 36 lá. Ar Lá 1, tá pionós tosaigh suas le 1 ETH ann. Ansin síothlaíonn éitear an bhailíochtóra slaiseáilte go mall ar feadh na tréimhse fágála, ach ar Lá 18, faigheann siad "pionós comhghaoil", rud atá níos mó nuair a ghearrtar níos mó bailíochtóirí thart ar an am céanna. Is é an t-uasphionós an geall iomlán. Tá na luach saothair agus na pionóis seo deartha chun bailíochtóirí macánta a dhreasú agus chun ionsaithe ar an líonra a dhídhreasú.

### Sceitheadh ​​Neamhghníomhaíochta {#inactivity-leak}

Chomh maith le slándáil, soláthraíonn Gasper "beocht shochreidte" freisin. Is é seo an coinníoll, chomh fada agus a bhfuil dhá thrian den éitear iomlán atá i gceist ag vótáil go hionraic agus ag leanúint leis an bprótacal, beidh an slabhra in ann tabhairt chun críche beag beann ar aon ghníomhaíocht eile (amhail ionsaithe, saincheisteanna aga folaigh, nó slaiseáil). Ar bhealach eile, ní mór aon trian den éitear iomlán atá i ngeall a chur i gcontúirt ar bhealach éigin chun an slabhra a chosc ó chríochnú. I Gasper, tá líne chosanta breise i gcoinne teip bheochta, ar a dtugtar an "sceitheadh ​​​​neamhghníomhaíochta". Gníomhaíonn an mheicníocht seo nuair a theip ar an slabhra a thabhairt chun críche ar feadh níos mó ná ceithre ré. Na bailíochtóirí nach bhfuil ag fianú go gníomhach don slabhra tromlaigh, déantar a ngeall a shíothlú de réir a chéile go dtí go n-aisghabhann an tromlach dhá thrian den gheall iomlán, ag cinntiú nach bhfuil teipeanna beochta ach sealadach.

### Rogha foirc {#fork-choice}

Áiríodh leis an sainmhíniú bunaidh ar Casper-FFG algartam rogha forc a chuir an riail i bhfeidhm: `lean an slabhra ina bhufil an seicphointe comhfhadaithe leis an airde is mó` áit a sainmhínítear airde mar an fad is mó ón mbloc géinis. I Gasper, tá an riail bunaidh maidir le rogha forc dímheasta i bhfabhar algartam níos sofaisticiúla ar a dtugtar LMD-GHOST. Tá sé tábhachtach a thuiscint, faoi ghnáthchoinníollacha, nach bhfuil gá le riail maidir le rogha forc - tá moltóir bloc amháin ann do gach sliotán, agus fianaíonn bailíochtóirí macánta é. Is i gcásanna aisioncronachta líonra mór amháin nó nuair a d'éiligh moltóir bloc mímhacánta go bhfuil gá le algartam rogha forc. Mar sin féin, nuair a thagann na cásanna sin chun cinn, is cosaint ríthábhachtach é an t-algartam rogha forc a dhaingníonn an slabhra ceart.

Seasann LMD-GHOST don “fo-chrann sanntach is troime a bhreathnaítear ar an teachtaireacht is déanaí”. Is bealach trom béarlagair é seo chun algartam a shainiú a roghnaíonn an forc leis an meáchan carntha is mó de na fianuithe mar an gceann canónach (fochrainn sanntach is troime) agus má fhaightear teachtaireachtaí iolracha ó bhailíochtóir, ní mheastar ach an ceann is déanaí (is déanaí -teachtaireacht tiomáinte). Sula gcuirtear an bloc is troime lena shlabhra canónach, déanann gach bailíochtóir measúnú ar gach bloc ag baint úsáide as an riail seo.

## Further Reading {#further-reading}

- [Gasper: GHOST agus Casper a chomhcheangal](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper an Giuirléid Críochnaitheachta Cairdiúil](https://arxiv.org/pdf/1710.09437.pdf)
