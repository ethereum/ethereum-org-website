---
title: Rollaí Leibhéal Eolais Nialasach
description: Réamheolas ar uas-scáluithe dífhianaise - réiteach scálaithe a úsáideann pobal Ethereum.
lang: ga
---

Is éard atá in uas-scáluithe dífhianaise (ZK-rollups) ciseal 2 [réitigh scálaithe](/developers/docs/scaling/) a mhéadaíonn tréchur ar Ethereum Príomhlíonra trí ríomhaireacht agus stóráil staide a bhogadh as slabhra. Is féidir le ZK-rollups na mílte idirbheart a phróiseáil i mbaisc agus ansin gan ach roinnt sonraí achoimre íosta a phostáil chuig Príomhlíonra. Sainmhíníonn na sonraí achoimre seo na hathruithe ba chóir a dhéanamh ar staid Ethereum agus roinnt cruthúnas cripteagrafach go bhfuil na hathruithe sin ceart.

## Réamhriachtanais {#prerequisites}

Ba cheart go mbeadh ár leathanach ar [scálú Ethereum](/developers/docs/scaling/) agus [ciseal 2](/layer-2) léite agus tuigthe agat.

## Cad iad uas-scáluithe dífhianaise? {#what-are-zk-rollups}

**Déanann uas-scáluithe dífhianaise (ZK-rollups)** beart (nó 'roll up') de idirbhearta a chur i mbaisceanna a dhéantar as slabhra. Laghdaíonn ríomh as slabhra an méid sonraí a chaithfear a phostáil chuig an mblocshlabhra. Cuireann oibreoirí ZK-rollup isteach achoimre ar na hathruithe is gá chun na hidirbhearta go léir a léiriú i mbaisc seachas gach idirbheart a sheoladh ina n-aonar. Táirgeann siad [cruthúnais bailíochta](/glossary/#validity-proof) freisin chun cruinneas na n-athruithe a chruthú.

Tá staid an ZK-rollup á chothabháil ag conradh cliste a imscartar ar líonra Ethereum. Chun an staid seo a nuashonrú, ní mór do nóid ZK-rollup cruthúnas bailíochta a chur isteach lena fhíorú. Mar a luadh, is dearbhú cripteagrafach é an cruthúnas bailíochta go bhfuil an t-athrú staide atá molta ag an uas-scálú i ndáiríre mar thoradh ar an mbaisc áirithe idirbheart a chur i gcrích. Ciallaíonn sé seo nach gá do ZK-rollups ach cruthúnais bailíochta a sholáthar chun idirbhearta a thabhairt chun críche ar Ethereum in ionad na sonraí idirbheart go léir a phostáil ar shlabhra mar [uas-scálú dóchasach](/developers/docs/scaling/optimistic-rollups/).

Níl aon mhoill ar chistí a aistriú ó ZK-rollup go Ethereum toisc go ndéantar idirbhearta scoir a luaithe a fhíoraíonn an conradh ZK-rollup an cruthúnas bailíochta. Os a choinne sin, tá aistarraingt chistí as uas-scáluithe dóchasacha faoi réir moille chun ligean d’aon duine dúshlán a thabhairt don idirbheart scoir le [cruthúnas calaoise](/glossary/#fraud-proof).

Scríobhann ZK-rollups idirbhearta chuig Ethereum mar `calldata`. Is é `calldata` an áit a stórálfar sonraí a chuimsítear i nglaonna seachtracha ar fheidhmeanna conartha cliste. Foilsítear faisnéis i `calldata` ar an mblocshlabhra, rud a ligeann do dhuine ar bith staid an uas-scálaithe a athchruthú go neamhspleách. Úsáideann ZK-rollups teicníochtaí comhbhrú chun sonraí idirbhirt a laghdú - mar shampla, déantar cuntais a léiriú trí innéacs seachas seoladh, a shábhálann 28 beart sonraí. Is costas suntasach é foilsiú sonraí ar slabhra ar uas-scáluithe, mar sin is féidir le comhbhrú sonraí táillí úsáideoirí a laghdú.

## Conas a idirghníomhaíonn ZK-rollups le Ethereum? {#zk-rollups-and-ethereum}

Is prótacal as slabhra é slabhra ZK-rollup a fheidhmíonn ar bharr an blocshlabhra Ethereum agus a bhainistíonn conarthaí cliste Ethereum ar slabhra. Déanann ZK-rollups idirbhearta lasmuigh de Mainnet, ach go tréimhsiúil cuireann siad baisceanna idirbheart as slabhra do conradh le haghaidh uas-scálú ar slabhra. Tá an taifead idirbhirt seo do-athraithe, cosúil le blocshlabhra Ethereum, agus cruthaíonn sé an slabhra ZK-rollup.

Tá croí-ailtireacht an ZK-rollup comhdhéanta de na comhpháirteanna seo a leanas:

1. **Conarthaí Ar slabhra **: Mar a luadh, tá an prótacal ZK-rollup á rialú ag conarthaí cliste a ritheann ar Ethereum. Áirítear leis seo an príomhchonradh a stórálann bloic uas-scálaithe, a rianaíonn taiscí, agus a dhéanann monatóireacht ar nuashonruithe staide. Fíoraíonn conradh eile ar slabhra (an conradh fíoraitheora) cruthúnais dhífhianaise a chuir táirgeoirí bloc isteach. Mar sin, feidhmíonn Ethereum mar bhunchiseal nó "ciseal 1" don ZK-rollup.

2. **Meaisín fíorúil As slabhra (VM)**: Cé go maireann an prótacal ZK-rollup ar Ethereum, tarlaíonn cur i gcrích idirbheart agus stóráil staide ar mheaisín fíorúil ar leith atá neamhspleách ar an [EVM](/developers/docs/evm/). Is é an VM as slabhra seo an timpeallacht reatha le haghaidh idirbhearta ar an ZK-rollup agus feidhmíonn sé mar an ciseal tánaisteach nó "ciseal 2" don phrótacal ZK-rollup. Ráthaíonn cruthúnais bhailíochta arna bhfíorú ar Ethereum Príomhlíonra cruinneas na n-aistrithe staide sa VM as slabhra.

Is "réitigh scálaithe hibrideach" iad ZK-rollups - prótacail as slabhra a fheidhmíonn go neamhspleách ach a dhíorthaíonn slándáil ó Ethereum. Go sonrach, forfheidhmíonn líonra Ethereum bailíocht nuashonruithe staide ar an ZK-rollup agus ráthaíonn sé infhaighteacht na sonraí taobh thiar de gach nuashonrú ar staid an uas-scálaithe. Mar thoradh air sin, tá ZK-rollups i bhfad níos sábháilte ná réitigh scálaithe as slabhra íon, mar [ slabhraí taobh](/developers/docs/scaling/sidechains/), atá freagrach as a n-airíonna slándála, nó [validiums](/developers/docs/scaling/validium/), ach a fhíoraíonn idirbhearta bailíochta in áiteanna eile chomh maith le Ethereum.

Braitheann ZK-rollups ar phríomhphrótacal Ethereum do na nithe seo a leanas:

### Infhaighteacht sonraí {#data-availability}

Foilsíonn ZK-rollups sonraí staide do gach idirbheart a phróiseáiltear as slabhra go Ethereum. Leis na sonraí seo, is féidir le daoine aonair nó gnólachtaí staid an uas-scálaithe a atáirgeadh agus an slabhra a bhailíochtú iad féin. Cuireann Ethereum na sonraí seo ar fáil do rannpháirtithe uile an líonra mar `calldata`.

Ní gá do ZK-rollups mórán sonraí idirbheart a fhoilsiú ar slabhra toisc go ndeimhníonn cruthúnais bailíochta barántúlacht aistrithe staide cheana féin. Mar sin féin, tá stóráil sonraí ar slabhra fós tábhachtach toisc go gceadaíonn sé fíorú neamhspleách gan chead ar staid an tslabhra L2 a ligeann d’aon duine baisceanna idirbheart a chur isteach, rud a chuireann cosc ​​ar oibreoirí mailíseacha an slabhra a chinsireacht nó a reo.

Tá ar slabhra ag teastáil d'úsáideoirí chun idirghníomhú leis an uas-scálú. Gan rochtain ar shonraí staide ní féidir le húsáideoirí iarmhéid a gcuntas a cheistiú ná idirbhearta a thionscnamh (m.sh. aistarraingtí) a bhíonn ag brath ar fhaisnéis staide.

### Críochnaitheacht idirbhirt {#transaction-finality}

Feidhmíonn Ethereum mar chiseal socraíochta le haghaidh ZK-rollups: ní thugtar idirbhearta L2 chun críche ach amháin má ghlacann an conradh L1 an cruthúnas bailíochta. Cuireann sé seo deireadh leis an mbaol go ndéanfaidh oibreoirí mailíseacha an slabhra a éilliú (m.sh. cistí uas-scálaithe a ghoid) toisc go gcaithfidh gach idirbheart a bheith ceadaithe ar Mainnet. Chomh maith leis sin, ráthaíonn Ethereum nach féidir oibríochtaí úsáideoirí a aisiompú nuair a bheidh siad críochnaithe ar L1.

### Friotaíocht chinsireachta {#censorship-resistance}

Úsáideann an chuid is mó de ZK-rollups "supernode" (an t-oibreoir) chun idirbhearta a rith, baisceanna a tháirgeadh, agus bloic a chur isteach chuig L1. Cé go n-áirithíonn sé seo éifeachtúlacht, méadaíonn sé an baol cinsireachta: is féidir le hoibreoirí mailíseacha ZK-rollup cinsireacht a dhéanamh ar úsáideoirí trí dhiúltú a gcuid idirbheart a áireamh i mbaisceanna.

Mar bheart slándála, cuireann ZK-rollups ar chumas úsáideoirí idirbhearta a chur isteach go díreach chuig an gconradh uas-scálaithe ar Mainnet má cheapann siad go bhfuil siad á gcinsireacht ag an oibreoir. Ligeann sé seo d’úsáideoirí iallach a chur scor ón ZK-rollup go Ethereum gan a bheith ag brath ar chead an oibreora.

## Conas a oibríonn ZK-rollups? {#how-do-zk-rollups-work}

### Idirbhearta {#transactions}

Síníonn úsáideoirí sna hidirbhearta ZK-rollup agus cuireann é faoi bhráid oibreoirí L2 lena phróiseáil agus a chuimsiú sa chéad bhaisc eile. I gcásanna áirithe, is aonán láraithe é an t-oibreoir, ar a dtugtar seicheamhóir, a dhéanann idirbhearta, a chomhiomlánaíonn i mbaisceanna iad, agus a chuireann faoi bhráid L1. Is é an seicheamhóir sa chóras seo an t-aon aonán a cheadaítear chun bloic L2 a tháirgeadh agus idirbhearta uas-scálaithe a chur leis an gconradh ZK-rollup.

Is féidir le ZK-rollups eile ról an oibreora a rothlú trí úsáid a bhaint as tacar bailíochtaithe [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/). Cuireann oibreoirí ionchasacha cistí i dtaisce sa chonradh uas-scálaithe, agus bíonn tionchar ag méid gach gill ar na seansanna atá ag na gealltóirí go roghnófar iad chun an chéad bhaisc uas-scálaithe eile a tháirgeadh. Is féidir geall an oibreora a laghdú má ghníomhaíonn sé go mailíseach, rud a spreagann iad chun bloic bhailí a phostáil.

#### Conas a fhoilsíonn ZK-rollups sonraí idirbheart ar Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Mar a mhínítear, foilsítear sonraí idirbhirt ar Ethereum mar `calldata`. Is réimse sonraí é `calldata` i gconradh cliste a úsáidtear chun argóintí a chur ar aghaidh chuig feidhm agus iompraíonn sé mar an gcéanna le [cuimhne](/developers/docs/smart-contracts/anatomy/#memory). Cé nach bhfuil `calldata` stóráilte mar chuid de stát Ethereum, leanann sé ar ar slabhra mar chuid de [logaí staire](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) de chuid slabhra Ethereum. Ní chuireann `calldata` isteach ar staid Ethereum, rud a fhágann gur bealach saor é chun sonraí a stóráil ar slabhra.

Is minic a shainaithníonn an eochairfhocal `calldata` an modh conartha cliste atá á ghlaoch ag idirbheart agus coinníonn sé ionchuir chuig an modh i bhfoirm seicheamh treallach beart. Úsáideann ZK-rollups `calldata` chun sonraí idirbheart comhbhrúite a fhoilsiú ar slabhra; go simplí cuireann an t-oibreoir uas-scálú baisc nua leis trí ghlaoch ar an bhfeidhm riachtanach sa chonradh uas-scálaithe agus seachadann sé na sonraí comhbhrúite mar argóintí feidhme. Cuidíonn sé seo le costais a laghdú d'úsáideoirí ós rud é go dtéann cuid mhór de na táillí uas-scálaithe chun sonraí idirbheart a stóráil ar slabhra.

### Gealltanais staide {#state-commitments}

Léirítear staid an ZK-rollup, lena n-áirítear cuntais agus iarmhéideanna L2, mar [Crann Merkle](/whitepaper/#merkle-trees). Stóráiltear hais cripteagrafach de fhréamh crann Merkle (fréimhe Merkle) sa chonradh ar slabhra, rud a ligeann don phrótacal uas-scálaithe athruithe ar staid an ZK-rollup a rianú.

Aistríonn an t-uas-scálú go staid nua tar éis sraith nua idirbheart a chur i gcrích. Ceanglaítear ar an oibreoir a chuir tús leis an aistriú staide fréamh stáit nua a ríomh agus a chur faoi bhráid an chonartha ar slabhra. Má dhéantar an cruthúnas bailíochta a bhaineann leis an mbaisc a fhíordheimhniú leis an gconradh fíoraithe, déantar fréamh staid chanónach an ZK-rollup de fhréamh nua Merkle.

Chomh maith le fréamhacha staide a ríomh, cruthaíonn an t-oibreoir ZK-rollup baiscfhréamh - fréamh crann Merkle a chuimsíonn gach idirbheart i mbaisc. Nuair a chuirtear baisc nua isteach, stórálann an conradh uas-scálaithe an fhréamh bhaisc, rud a ligeann d'úsáideoirí a chruthú go raibh idirbheart (m.sh. iarratas ar aistarraingt) san áireamh sa bhaisc. Beidh ar úsáideoirí sonraí idirbhirt a sholáthar, an fhréamh bhaisc, agus [ Cruthúnas Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) a thaispeánann an chonair chuimsithe.

### Cruthúnais bhailíochta {#validity-proofs}

Tá an fhréamh nua staide a chuireann an t-oibreoir ZK-rollup isteach sa chonradh L1 mar thoradh ar nuashonruithe ar staid an uas-scálaithe. Abair go seolann Alice 10 gcomhartha chuig Bob, ní dhéanann an t-oibreoir ach iarmhéid Alice a laghdú faoi 10 agus méadaíonn sé iarmhéid Bob faoi 10. Ansin déanann an t-oibreoir haiseáil ar na sonraí cuntais nuashonraithe, atógann sé crann Merkle an uas-scálaithe, agus cuireann sé an fhréamh Merkle nua faoi bhráid an chonartha ar slabhra.

Ach ní ghlacfaidh an conradh uas-scálaithe go huathoibríoch leis an ngealltanas molta staide go dtí go gcruthóidh an t-oibreoir an fhréamh Merkle nua mar thoradh ar nuashonruithe cearta ar staid an uas-scálaithe. Déanann an t-oibreoir ZK-rollup é seo trí chruthúnas bailíochta a tháirgeadh, gealltanas cripteagrafach gonta a fhíoraíonn cruinneas na n-idirbheart baisce.

Ligeann cruthúnais bhailíochta do pháirtithe cruinneas ráitis a chruthú gan an ráiteas féin a nochtadh—dá bhrí sin, tugtar cruthúnais dhífhianaise orthu freisin. Úsáideann ZK-rollups cruthúnais bailíochta chun cruinneas na n-aistrithe staide as slabhra a dhearbhú gan idirbhearta a ath-rith ar Ethereum. Is féidir na cruthúnais seo a dhéanamh i bhfoirm [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Argóint Ghonta Neamh-Idirghníomhach Dhífhianaise an Eolais) nó [ZK-STARK](https://eprint.iacr.org/2018/046) (Argóint Faisnéise Trédhearcach Inscálaithe Dhífhianaise).

Cuidíonn an dá SNARKs agus STARKs fianú sláine ríomh as slabhra i ZK-rollups, cé go bhfuil gnéithe sainiúla ag gach cineál cruthúnais.

**ZK-SNARcanna**

Chun go n-oibreoidh prótacal ZK-SNARK, ní mór Teaghrán Tagartha Coiteann (CRS) a chruthú: soláthraíonn an CRS paraiméadair phoiblí chun cruthúnais bhailíochta a chruthú agus a fhíorú. Braitheann slándáil an chórais chruthúnais ar shocrú CRS; má thagann faisnéis a úsáidtear chun paraiméadair phoiblí a chruthú i seilbh ghníomhaithe mailíseacha féadfaidh siad a bheith in ann cruthúnais bailíochta bréagacha a ghiniúint.

Déanann roinnt ZK-rollups iarracht an fhadhb seo a réiteach trí úsáid a bhaint as [searmanas ríomh ilpháirtí (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), a bhaineann le daoine aonair iontaofa, chun paraiméadair phoiblí a ghiniúint don chiorcad ZK-SNARK. Cuireann gach páirtí roinnt randamacht (ar a dtugtar "dramhaíl thocsaineach") le tógáil an CRS, a chaithfidh siad a scriosadh láithreach.

Úsáidtear socruithe iontaofa toisc go méadaíonn siad slándáil an tsocraithe CRS. Chomh fada agus a scriosann rannpháirtí macánta amháin a n-ionchur, tá slándáil an chórais ZK-SNARK ráthaithe. Mar sin féin, éilíonn an cur chuige seo muinín a bheith acu siúd atá i gceist as a randamacht shamplaithe a scriosadh agus gan an bonn a bhaint de ráthaíochtaí slándála an chórais.

Gan trácht ar bhoinn tuisceana iontaobhais, tá tóir ar ZK-SNARKanna mar gheall ar a méideanna beaga cruthúnais agus a bhfíorú tairisigh-ama. Toisc gurb ionann fíorú cruthúnais ar L1 agus an costas níos mó a bhaineann le ZK-rollup a oibriú, úsáideann L2anna ZK-SNARKanna chun cruthúnais a ghiniúint ar féidir iad a fhíorú go tapa agus go saor ar Mainnet.

**ZK-STARKanna**

Cosúil le ZK-SNARKanna, cruthaíonn ZK-STARKanna bailíocht ríomh as slabhra gan na hionchuir a nochtadh. Mar sin féin, meastar gur feabhas iad ZK-ZK-STARKanna ar ZK-ZK-STARKanna mar gheall ar a n-inscálaitheacht agus a dtrédhearcacht.

Tá ZK-STARKanna ‘trédhearcach’, mar is féidir leo oibriú gan socrú Teaghrán Tagartha Coiteann (CRS) iontaofa. Ina áit sin, bíonn ZK-STARKanna ag brath ar randamacht atá infhíoraithe go poiblí chun paraiméadair a shocrú chun cruthúnais a ghiniúint agus a fhíorú.

Soláthraíonn ZK-STARKanna níos mó inscálaitheachta freisin toisc go méadaíonn an t-am a theastaíonn chun cruthúnais bhailíochta a chruthú _go cuasailíneach_ i gcoibhéis le castacht na bunríomhaireachta. Le ZK-STARKanna, déantar amanna cruthaithe agus fíoraithe a scálú _go líneach_ i ndáil le méid na ríomha bunúsacha. Ciallaíonn sé seo go dteastaíonn níos lú ama ó ZK-STARKanna ná mar a bhíonn ó ZK-SNARKanna chun a chruthú agus a fhíorú nuair a bhíonn tacair shonraí móra i gceist, rud a fhágann go bhfuil siad úsáideach d’fheidhmchláir ard-toirte.

Tá ZK-STARKanna slán freisin i gcoinne ríomhairí chandamacha, agus creidtear go forleathan go bhfuil Cripteagrafaíocht Cuar Eiliptic (ECC) a úsáidtear i ZK-SNARKanna so-ghabhálach i leith ionsaithe ríomhaireachta chandamacha. Is é an míbhuntáiste a bhaineann le ZK-STARKanna ná go dtáirgeann siad méideanna cruthúnais níos mó, atá níos costasaí a fhíorú ar Ethereum.

#### Conas a oibríonn cruthúnais bailíochta i ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Giniúint chruthúnais

Sula nglacfaidh sé le hidirbhearta, déanfaidh an t-oibreoir na gnáthsheiceálacha. Áirítear leis seo a dhearbhú:

- Tá cuntais an tseoltóra agus an ghlacadóra mar chuid den chrann staide.
- Go bhfuil go leor cistí ag an seoltóir chun an t-idirbheart a phróiseáil.
- Go bhfuil an t-idirbheart ceart agus go meaitseálann sé eochair phoiblí an tseoltóra ar an uas-scálú.
- Go bhfuil nonce an tseoltóra ceart, srl.

Nuair a bhíonn dóthain idirbheart ag an nód ZK-rollup, comhiomlánaíonn sé iad ina bhaisc agus tiomsaíonn sé ionchuir chun go dtiomsóidh an ciorcad cruthúnais i ZK-cruthúnais gonta. Áirítear leis seo:

- Fréamh crann Merkle a chuimsíonn na hidirbhearta go léir sa bhaisc.
- Cruthuithe Merkle maidir le hidirbhearta chun cuimsiú sa bhaisc a chruthú.
- Tá cruthúnais Merkle do gach péire seoltóir-glacadóir in idirbhearta chun na cuntais sin a chruthú mar chuid de chrann staide an uas-scálaithe.
- Sraith fréamhacha stáit idirmheánacha, a dhíorthaítear ón bhfréamh staide a nuashonrú tar éis nuashonruithe staide a chur i bhfeidhm do gach idirbheart (i.e., cuntais seoltóra a laghdú agus cuntais glacadóra a mhéadú).

Ríomhann an ciorcad cruthaithe an cruthúnas bailíochta trí "lúb" thar gach idirbheart agus déanann sé na seiceálacha céanna a rinne an t-oibreoir roimh phróiseáil an idirbhirt. Ar an gcéad dul síos, fíoraíonn sé go bhfuil cuntas an tseoltóra mar chuid den fhréamh staide atá ann cheana ag baint úsáide as an cruthúnas Merkle a sholáthraítear. Ansin laghdaíonn sé iarmhéid an tseoltóra, méadaíonn sé a nonce, haiseálann na sonraí cuntais nuashonraithe agus comhcheanglaíonn sé le cruthúnas Merkle chun fréamh Merkle nua a ghiniúint.

Léiríonn an fhréamh Merkle seo an t-aon athrú ar staid an ZK-rollup: athrú ar chothromaíocht agus nonce an tseoltóra. Tá sé seo indéanta toisc go n-úsáidtear an cruthúnas Merkle a úsáideadh chun a chruthú go bhfuil an cuntas ann chun an fhréamh staide nua a dhíorthú.

Déanann an ciorcad cruthaithe an próiseas céanna ar chuntas an ghlacadóra. Seiceálann sé an bhfuil cuntas an ghlacadóra ann faoi fhréamh na staide idirmheánaí (ag baint úsáide as cruthúnas Merkle), méadaíonn sé a n-iarmhéid, ath-haiseálann sonraí an chuntais agus nascann sé le cruthúnas Merkle chun fréamh staide nua a ghiniúint.

Athdhéantar an próiseas do gach idirbheart; cruthaíonn gach "lúb" fréamh staide nua ó chuntas an tseoltóra a nuashonrú agus fréamh nua ina dhiaidh sin ó chuntas an ghlacadóra a nuashonrú. Mar a mhínítear, is ionann gach nuashonrú ar an bhfréamh staide agus cuid amháin d'athrú crann staide an uas-scálaithe.

Déanann an ciorcad ZK-proving atriail thar an bhaisc idirbheart ar fad, ag fíorú an t-ord nuashonruithe a eascraíonn i bhfréamh staide deiridh tar éis an t-idirbheart deireanach a rith. Is í an fhréamh dheireanach Merkle a ríomhtar an fhréamh staide chanónach is nuaí den ZK-rollup.

##### Fíorú cruthúnais

Tar éis don chiorcad cruthaithe cruinneas na nuashonruithe staide a fhíorú, cuireann an t-oibreoir L2 an cruthúnas bailíochta ríofa chuig an gconradh fíoraitheora ar L1. Fíoraíonn ciorcad fíoraithe an chonartha bailíocht an chruthúnais agus seiceálann sé freisin ionchuir phoiblí atá mar chuid den chruthúnas:

- **Fréamh réamhstaide**: Seanfhréamh staide an ZK-rollup (i.e., sular cuireadh na hidirbhearta baisce i gcrích), ag léiriú staid bhailí deiridh an tslabhra L2.

- **Fréamh iar-staide**: Fréamh staide nua an ZK-rollup (i.e., tar éis na hidirbhearta baisce a chur i gcrích), a léiríonn an staid is nuaí sa slabhra L2. Is é an fhréamh iar-staide an fhréamh dheiridh a dhíorthaítear tar éis nuashonruithe staide a chur i bhfeidhm sa chiorcad cruthaithe.

- **Fréamh an bhaisc**: Fréamh Merkle na baisce, a dhíorthaítear trí _fhréamhú Merkle_ a dhéanamh ar na hidirbhearta sa bhaisc agus fréamh an chrainn a haiseáil.

- **Ionchuir Idirbheart**: Sonraí a bhaineann leis na hidirbhearta a rinneadh mar chuid den bhaisc a cuireadh isteach.

Má shásaíonn an cruthúnas an ciorcad (i.e., tá sé bailí), ciallaíonn sé go bhfuil seicheamh idirbheart bailí ann a aistríonn an t-uas-scálú ón staid roimhe sin (méarloirg go cripteagrafach ag an bhfréamh réamhstaide) go staid nua (méarloirg go cripteach ag an bhfréamh iar-staide). Má mheaitseálann an fhréamh réamh-staide an fhréamh atá stóráilte sa chonradh uas-scálaithe, agus go bhfuil an cruthúnas bailí, tógann an conradh uas-scálaithe an fhréamh iar-staide ón gcruthúnas agus nuashonraíonn sé a chrann staide chun staid athraithe an uas-scálaithe a léiriú.

### Iontrálacha agus scoir {#entries-and-exits}

Téann úsáideoirí isteach sa ZK-rollup trí chomharthaí a thaisceadh i gconradh an uas-scálaithe a imscartar ar an slabhra L1. Tá an t-idirbheart seo curtha i scuaine toisc nach féidir ach le hoibreoirí idirbhearta a chur isteach sa chonradh uas-scálaithe.

Má thosaíonn an scuaine taisce atá ar feitheamh ag líonadh suas, tógfaidh an t-oibreoir ZK-rollup na hidirbhearta taisce agus cuirfidh sé faoi bhráid an chonartha uas-scálaithe iad. Nuair a bheidh cistí an úsáideora san uas-scálú, is féidir leo tosú ar idirbhearta trí idirbhearta a sheoladh chuig an oibreoir lena bpróiseáil. Is féidir le húsáideoirí iarmhéideanna ar an uas-scálú a fhíorú trí shonraí a gcuntas a haiseáil, an hais a sheoladh chuig an gconradh uas-scálaithe, agus cruthúnas Merkle a sholáthar chun a fhíorú i gcoinne an fhréamh staide reatha.

Tá sé éasca tarraingt siar ó ZK-rollup go L1. Cuireann an t-úsáideoir tús leis an idirbheart scoir trína gcuid sócmhainní a sheoladh ar an uas-scálú chuig cuntas sonraithe le dó. Má chuimsíonn an t-oibreoir an t-idirbheart sa chéad bhaisc eile, is féidir leis an úsáideoir iarratas ar aistarraingt a chur isteach sa chonradh ar slabhra. Áireofar na nithe seo a leanas san iarratas ar aistarraingt:

- Cruthúnas Merkle a chruthaíonn cuimsiú idirbheart an úsáideora chuig an gcuntas sruthán i mbaisc idirbhirt

- Sonraí idirbhirt

- Fréamh bhaisc

- Seoladh L1 chun cistí taiscthe a fháil

Haiseálann an conradh uas-scálaithe na sonraí idirbhirt, seiceálann an bhfuil an fhréamh bhaisc ann, agus úsáideann an cruthúnas Merkle le seiceáil an bhfuil an hais idirbheart mar chuid den fhréamh bhaisc. Ina dhiaidh sin, déanann an conradh an t-idirbheart scoir agus seolann sé cistí chuig an seoladh roghnaithe ag an úsáideoir ar L1.

## Comhoiriúnacht ZK-rollups agus EVM {#zk-rollups-and-evm-compatibility}

Murab ionann is uas-scáluithe dóchasacha, níl uas-scáluithe ZK-rollups éasca a chomhoiriúnú le [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm/). Tá sé níos deacra agus níos déine ó thaobh acmhainní de ríomh EVM ilchuspóireach a chruthú i gciorcaid ná ríomhanna simplí a chruthú (cosúil leis an aistriú comhartha a cuireadh síos cheana).

Mar sin féin, tá [dul chun cinn i dteicneolaíocht dhífhianaise](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) ag spreagadh spéise athnuaite i ríomh EVM a fhilleadh i gcruthúnas dífhianaise. Tá na hiarrachtaí seo dírithe ar chur chun feidhme EVM (zkEVM) ar dhífhianaise a chruthú a bheidh in ann cruinneas rith an chláir a fhíorú go héifeachtach. Déanann zkEVM athchruthú ar opcodes EVM atá ann cheana chun ciorcaid a chruthú/a fhíorú, rud a cheadaíonn conarthaí cliste a rith.

Cosúil leis an EVM, déantar aistrithe zkEVM idir staid tar éis ríomh a dhéanamh ar roinnt ionchuir. Is é an difríocht ná go gcruthaíonn an zkEVM cruthúnais dhífhianaise freisin chun cruinneas gach céime i rith an chláir a fhíorú. D’fhéadfadh cruthúnais bhailíochta cruinneas na n-oibríochtaí a dhéanann teagmháil le staid an VM (cuimhne, cruachta, stóráil) agus an ríomh féin a fhíorú (i.e., ar ghlaoigh an oibríocht ar na opcodes cearta agus ar ritheadh ​​​​iad i gceart?).

Táthar ag súil go gcabhróidh tabhairt isteach ZK-rollups atá comhoiriúnach le EVM le forbróirí chun ráthaíochtaí inscálaithe agus slándála cruthúnais dhífhianaise a ghiaráil. Níos tábhachtaí fós, ciallaíonn comhoiriúnacht le bonneagar dúchasach Ethereum gur féidir le forbróirí dapps atá neamhdhíobhálach don ZK a thógáil ag baint úsáide as uirlisí agus teangacha eolacha (agus cath-thástáil).

## Conas a oibríonn táillí ZK-rollup? {#how-do-zk-rollup-fees-work}

Tá an méid a íocann úsáideoirí as idirbhearta ar ZK-rollups ag brath ar an táille gháis, díreach mar atá ar Ethereum Mainnet. Mar sin féin, oibríonn táillí gáis ar bhealach difriúil ar L2 agus bíonn tionchar ag na costais seo a leanas orthu:

1. ** Scríobh Staide**: Tá costas seasta ar scríobh chuig staid Ethereum (i.e., idirbheart a chur isteach ar bhlocshlabhra Ethereum). Laghdaíonn ZK-rollups an costas seo trí idirbhearta a bhaisceadh agus costais sheasta a scaipeadh ar úsáideoirí iolracha.

2. **Foilsiú sonraí**: Foilsíonn ZK-rollups sonraí staide do gach idirbheart chuig Ethereum mar `calldata`. Tá costais `calldata` á rialú faoi láthair ag [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), a shonraíonn costas 16 ghás le haghaidh beart neamh-nialasach agus 4 ghás le haghaidh beart nialasach de `calldata`, faoi seach. Bíonn tionchar ag an gcostas a íoctar ar gach idirbheart ar an méid `calldata` is gá a phostáil ar slabhra dó.

3. **Táillí oibritheora L2**: Seo é an méid a íoctar leis an oibreoir uas-scálaithe mar chúiteamh ar chostais ríomhaireachtúla a thabhaítear in idirbhearta próiseála, cosúil le [táillí tosaíochta (leideanna) na hidirbhearta](/developers/docs/gas/#how-are-gas-fees-calculated) ar Ethereum Príomhlíonra.

4. **Giniúint cruthúnais agus fíorú**: Ní mór d'oibreoirí ZK-rollup cruthúnais bailíochta a tháirgeadh le haghaidh baisceanna idirbheart, atá dian ar acmhainní. Cosnaíonn sé gás (~ 500,000 gás) freisin nuair a dhéantar cruthúnais dhífhianaise a fhíorú ar Príomhlíonra.

Seachas idirbhearta baisce, laghdaíonn ZK-rollups táillí d'úsáideoirí trí shonraí idirbhirt a chomhbhrú. Is féidir leat [forbhreathnú fíor-ama a fheiceáil](https://l2fees.info/) ar an méid a chosnaíonn sé úsáid a bhaint as Ethereum ZK-rollups.

## Conas a scálaíonn ZK-rollups Ethereum? {#scaling-ethereum-with-zk-rollups}

### Comhbhrú sonraí idirbhirt {#transaction-data-compression}

Leathnaíonn ZK-rollups an tréchur ar bhunchiseal Ethereum trí ríomh a bhaint as slabhra, ach tagann an fíor-bhreisiú le haghaidh scálaithe ó chomhbhrú sonraí idirbhirt. Cuireann [méid an bhloic](/developers/docs/blocks/#block-size) teorainn leis na sonraí is féidir le gach bloc a choinneáil agus, dá réir sin, líon na n-idirbheart a phróiseáiltear in aghaidh an bhloic. Trí shonraí a bhaineann le hidirbhearta a chomhbhrú, méadaíonn ZK-rollups go suntasach líon na n-idirbheart a phróiseáiltear in aghaidh an bhloic.

Is féidir le ZK-rollups sonraí idirbhirt a chomhbhrú níos fearr ná uas-scáluithe dóchasacha ós rud é nach gá dóibh na sonraí go léir a theastaíonn chun gach idirbheart a bhailíochtú a phostáil. Ní bhíonn orthu ach na sonraí íosta atá riachtanach a phostáil chun staid na gcuntas agus na n-iarmhéideanna is déanaí a atógáil ar an uas-scálú.

### Cruthúnas athchúrsach {#recursive-proofs}

Buntáiste a bhaineann le cruthúnais dhífhianasie ná go mbíonn cruthúnais in ann cruthúnais eile a fhíorú. Mar shampla, is féidir le ZK-SNARK amháin ZK-SNARKanna eile a fhíorú. Tugtar cruthúnais athchúrsacha ar a leithéid de "cruthúnas-de-cruthúnais" agus méadaítear go mór an tréchur ar ZK-rollups.

Faoi láthair, gintear cruthúnais bhailíochta ar bhonn bloc ar bhloc agus cuirtear isteach sa chonradh L1 iad lena bhfíorú. Mar sin féin, cuireann fíorú cruthúnais bloc aonair teorainn leis an tréchur is féidir le ZK-rollups a bhaint amach ós rud é nach féidir ach bloc amháin a thabhairt chun críche nuair a chuireann an t-oibreoir cruthúnas isteach.

De bharr cruthúnais athfhillteacha, áfach, is féidir roinnt bloc a thabhairt chun críche le cruthúnas bailíochta amháin. Tá sé seo amhlaidh toisc go gcomhiomlánaíonn an ciorcad cruthaithe go hathchúrsach cruthúnais iolracha go dtí go gcruthaítear cruthúnas deiridh amháin. Cuireann an t-oibreoir L2 an cruthúnas athfhillteach seo isteach, agus má ghlacann an conradh leis, cuirfear na bloic ábhartha ar fad i gcrích láithreach. Le cruthúnais athchúrsacha, méadaíonn líon na n-idirbheart ZK-rollup is féidir a thabhairt chun críche ar Ethereum ag eatraimh.

### Buntáistí agus míbhuntáistí ZK-rollups {#zk-rollups-pros-and-cons}

| Buntáistí                                                                                                                                                                                                                          | Míbhuntáistí                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cinntíonn cruthúnais bhailíochta cruinneas na n-idirbheart as slabhra agus cuireann siad cosc ​​ar oibreoirí aistrithe neamhbhailí staide a dhéanamh.                                                                              | Is mór an costas a bhaineann le cruthúnais bhailíochta a ríomh agus a fhíorú agus féadann sé táillí a mhéadú d’úsáideoirí uas-scáluithe.                                                                                                                                   |
| Tairgeann sé críochnaitheacht idirbheartaíochta níos tapúla de réir mar a fhaomhtar nuashonruithe staide a luaithe a fhíoraítear cruthúnais bailíochta ar L1.                                                                      | Tá sé deacair ZK-rollups atá comhoiriúnach le EVM a thógáil mar gheall ar chastacht na teicneolaíochta dífhianaise.                                                                                                                                                        |
| Braitheann sé ar mheicníochtaí cripteagrafacha gan iontaoibh le haghaidh slándála, ní ar ionracas na ngníomhaithe dreasachta mar atá le [rollup dóchasach](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Teastaíonn crua-earraí speisialaithe chun cruthúnais bhailíochta a tháirgeadh, rud a d'fhéadfadh rialú láraithe ar an slabhra a spreagadh ag roinnt páirtithe.                                                                                                             |
| Stórálann sé na sonraí is gá chun an staid as slabhra a aisghabháil ar L1, a ráthaíonn slándáil, frithsheasmhacht cinsireachta agus dílárú.                                                                                        | Is féidir le hoibreoirí láraithe (seicheamhóirí) tionchar a imirt ar ordú na n-idirbheart.                                                                                                                                                                                 |
| Baineann úsáideoirí leas as éifeachtúlacht chaipitil níos fearr agus is féidir leo cistí a tharraingt siar ó L2 gan mhoill.                                                                                                        | D’fhéadfadh ceanglais chrua-earraí líon na rannpháirtithe a laghdú a fhéadfaidh iallach a chur ar an slabhra dul chun cinn a dhéanamh, rud a mhéadódh an baol go ndéanfaidh oibreoirí mailíseacha staid an uas-scálaithe a reo agus go ndéanfar cinsireacht ar úsáideoirí. |
| Níl sé ag brath ar thoimhdí beochta agus ní gá d'úsáideoirí an slabhra a bhailíochtú chun a gcuid cistí a chosaint.                                                                                                                | Éilíonn roinnt córas cruthaithe (m.sh., ZK-SNARK) socrú iontaofa a d’fhéadfadh, dá ndéanfaí mí-láimhseáil orthu, samhail slándála ZK-rollup a chur i mbaol.                                                                                                                |
| Is féidir le comhbhrú sonraí níos fearr cuidiú leis na costais a bhaineann le foilsiú `calldata` ar Ethereum a laghdú agus táillí uas-scálaithe d'úsáideoirí a íoslaghdú.                                                          |                                                                                                                                                                                                                                                                            |

### Míniú amhairc ar ZK-rollups {#zk-video}

Féach ar Finematics ag míniú ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />


## Cé atá ag obair ar zkEVM? {#zkevm-projects}

I measc na dtionscadal atá ag obair ar zkEVMs tá:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _ Is tionscadal é zkEVM atá maoinithe ag Fondúireacht Ethereum chun ZK-rollup atá comhoiriúnach le EVM a fhorbairt agus meicníocht chun bailíocht a chruthú le haghaidh bloic Ethereum._

- Is éard atá i **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _ ná ZK Rollup díláraithe ar Príomhlíonra Ethereum ag obair ar Meaisín Fíorúil Ethereum dífhianaise (zkEVM) a dhéanann idirbhearta Ethereum ar bhealach trédhearcach, lena n-áirítear conarthaí cliste a bhfuil bailíochtú dífhianaise orthu._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Is cuideachta theicneolaíocht-tiomáinte é Scroll a oibríonn ar Réiteach Sraith 2 ZkEVM dúchais a thógáil le haghaidh Ethereum._

- **[Taiko](https://taiko.xyz)** - _Is é Taiko ZK-rollup díláraithe, coibhéiseach Ethereum (a [Cineál 1 ZK- EVM](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ Is ZK Rollup atá comhoiriúnach le EVM é ZKsync Era arna thógáil ag Matter Labs, arna chumhachtú ag a zkEVM féin._

- **[Starknet](https://starkware.co/starknet/)** - _Is réiteach scálaithe ciseal 2 atá comhoiriúnach le EVM é StarkNet arna thógáil ag StarkWare._

- **[Morph](https://www.morphl2.io/)** - _ Is réiteach scálú uas-scálaithe hibrideach é morph a úsáideann zk-proof chun aghaidh a thabhairt ar shaincheist dhúshlán staide Sraith 2._

## Tuilleadh léitheoireachta maidir le léamh ZK-rollups {#further-reading-on-zk-rollups}

- [Cad is Uas-scálú Dífhianaise ann?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Cad iad uas-scáluithe dífhianaise?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Treoir Phraiticiúil Maidir le hUas-scáluithe Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [Cad is zkEVM ann?](https://www.alchemy.com/overviews/zkevm)
- [Cineálacha ZK-EVM: Ethereum-coibhéis, EVM-coibhéiseach, Cineál 1, Cineál 4, agus dordfhocail criptea eile](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Cur i láthair zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Cad iad L2anna ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Acmhainní iontacha-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKanna faoin gcochall](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Conas atá SNARKs indéanta?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
