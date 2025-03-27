---
title: Crainn Verkle
description: Cur síos ardleibhéil ar chrainn Verkle agus conas a úsáidfear iad chun Ethereum a uasghrádú
lang: ga
summaryPoints:
  - Faigh amach cad iad na crainn Verkle
  - Léigh cén fáth go bhfuil uasghrádú Crainn Verkle úsáideach do Ethereum
---

# Crainn Verkle {#verkle-trees}

Is struchtúr sonraí iad crainn Verkle (portmanta de "Tiomantas Veicteoir" agus "Crainn Merkle") is féidir a úsáid chun nóid Ethereum a uasghrádú ionas gur féidir leo stop a chur le suimeanna móra sonraí stáit a stóráil gan an cumas chun bloic a bhailíochtú a chailliúint.

## Gan stát {#statelessness}

Is céim ríthábhachtach iad crainn Verkle ar an gcosán do chliaint Ethereum gan stát. Is cliaint gan stát iad na cliaint nach gcaithfidh bunachar sonraí iomlán an stáit a stóráil chun bloic isteach a bhailíochtú. In ionad a gcóip áitiúil féin de stát Ethereum a úsáid chun bloic a fhíorú, úsáideann cliaint gan stát "finné" do na sonraí stáit a thagann leis an mbloc. Is ionann finné agus bailiúchán de phíosaí aonair de shonraí an stáit a theastaíonn chun sraith áirithe idirbhearta a fhorghníomhú, agus cruthúnas cripteagrafach go bhfuil an finné i ndáiríre mar chuid de na sonraí iomlána. Úsáidtear _an finné in áit_in áit bunachar sonraí an stáit. Chun go n-oibreoidh sé seo, ní mór do na finnéithe a bheith an-bheag, ionas gur féidir iad a chraoladh go sábháilte ar fud an líonra ionas go mbeidh na bailíochtóirí ábalta iad a phróiseáil laistigh de shliotán 12 soicind. Níl an struchtúr sonraí stáit reatha oiriúnach toisc go bhfuil finnéithe ró-mhór. Réitíonn crainn Verkle an fhadhb seo trí fhinnéithe beaga a chumasú, ag fáil réidh le ceann de na príomhbhacainní ar chliaint gan stát.

<ExpandableCard title="Cén fáth a dteastaíonn cliaint gan stát uainn?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Úsáideann cliaint Ethereum struchtúr sonraí ar a dtugtar Patricia Merkle Trie faoi láthair chun a sonraí stáit a stóráil. Stóráiltear faisnéis faoi chuntais aonair mar dhuilleoga ar an trie agus déantar péirí duilleoga a haiseáil arís agus arís eile go dtí nach bhfanann ach hais amháin. Tugtar an "fréamh" ar an hais deiridh seo. Chun bloic a fhíorú, déanann cliaint Ethereum na hidirbhearta go léir a fhorghníomhú i mbloc agus a gcuid trie stáit áitiúil a nuashonrú. Meastar go bhfuil an bloc bailí má tá fréamh an chrainn áitiúil comhionann leis an gceann a sholáthraíonn an moltóir bloic, toisc go mbeadh aon difríochtaí sa ríomh a dhéanann an moltóir bloic agus an nód bailíochtaithe ina chúis le hais an fhréamh a bheith go hiomlán difriúil. Is í an fhadhb atá leis seo ná go n-éilíonn fíorú an bhlocshlabhra ar gach cliant stát iomlán an trie a stóráil don bhloc cinn agus roinnt bloc stairiúla (is é an réamhshocrú i Geth sonraí stáit a choinneáil le haghaidh 128 bloc taobh thiar den cheann). Éilíonn sé seo go mbeadh rochtain ag cliaint ar líon mór spás diosca, rud atá ina bhac ar nóid iomlána a rith ar chrua-earraí saor, ísealchumhachta. Is réiteach amháin air seo trie an stát a uasdátú go struchtúr níos éifeachtaí (crann Verkle) ar féidir é a achoimriú le "finné" beag ar na sonraí is féidir a roinnt in ionad sonraí iomlána an stáit. Is slí é sonraí an stáit a athchóiriú ina chrann Verkle chun aistriú chuig cliaint gan stát.

</ExpandableCard>

## Cad is finné ann agus cén fáth a bhfuil gá againn leo? {#what-is-a-witness}

Ciallaíonn fíorú bloic na hidirbhearta atá sa bhloc a ath-fhorghníomhú, na hathruithe a chur i bhfeidhm ar trie stáit Ethereum, agus an hais fréimhe nua a ríomh. Is ionann bloc fíoraithe agus ceann a bhfuil hais fréimhe stáit ríofa mar an gcéanna leis an gceann a cuireadh ar fáil leis an mbloc (toisc go bhfuil an ríomh a deir siad a bheith déanta, déanta i ndáiríre). I gcliant Ethereum an lae inniu, éilíonn nuashonrú an stáit rochtain ar an trie stáit ar fad, ar struchtúr sonraí mór é a chaithfear a stóráil go háitiúil. Ní bhíonn ag finné ach na blúirí de na sonraí stáit a theastaíonn chun na hidirbhearta sa bhloc a fhorghníomhú. Ní féidir le bailíochtóir ansin ach na blúirí sin a úsáid chun a fhíorú go ndearna an moltóir bloic na hidirbhearta bloic agus go ndearna sé uasdátú ceart ar an stát. Ciallaíonn sé seo áfach gur gá an finné a aistriú idir piaraí ar líonra Ethereum atá tapa go leor chun a bheith faighte agus próiseáilte ag gach nód go sábháilte laistigh de shliotán 12 soicind. Má tá an finné rómhór, d'fhéadfadh sé go dtógfadh sé an iomarca ama ar nóid é a íoslódáil agus coinneáil suas leis an slabhra. Is fórsa láraithe é seo toisc go gciallaíonn sé nach féidir ach le nóid a bhfuil naisc thapa idirlín acu páirt a ghlacadh i mbloic bhailíochtaithe. Le crainn Verkle ní gá an stát a stóráil ar do dhiosca crua; tá _gach rud_ atá uait le bloc a fhíorú laistigh den bhloc féin. Ar an drochuair, tá na finnéithe is féidir a tháirgeadh ó thriail Merkle ró-mhór chun tacú le cliaint gan stát.

## Cén fáth go gcumasaíonn crainn Verkle finnéithe níos lú? {#why-do-verkle-trees-enable-smaller-witnesses}

Mar gheall ar struchtúr Merkle Trie tá méideanna finnéithe an-mhór - ró-mhór le craoladh go sábháilte idir piaraí laistigh de shliotán 12 soicind. Tá sé seo amhlaidh toisc gur cosán é an finné a nascann na sonraí, a choinnítear i nduilleoga, leis an hais fréimhe. Chun na sonraí a fhíorú is gá a bheith ní hamháin na haiseanna idirmheánacha go léir a cheanglaíonn gach duilleog leis an bhfréamh, ach freisin gach nóid "siblín". Tá siblín ag gach nód sa chruthúnas a bhfuil hais leis chun an chéad haiseanna eile a chruthú suas an trie. Is mór an méid sonraí é seo. Laghdaíonn crainn verkle méid an fhinné tríd an fad idir duilleoga an chrainn agus a fhréamh a ghiorrú agus freisin deireadh a chur leis an ngá atá le nóid siblíní a sholáthar chun an hais fréimhe a fhíorú. Is féidir éifeachtacht spáis níos mó a ghnóthú trí scéim thiomantais iltéarmach chumhachtach a úsáid in ionad an ghealltanais veicteora i stíl hais. Ceadaíonn an tiomantas iltéarmach méid seasta a bheith ag an bhfinné beag beann ar líon na duilleoga a chruthaíonn sé.

Faoin scéim tiomantais iltéarmaigh, tá méideanna soláimhsithe ag na finnéithe ar féidir iad a aistriú go héasca ar an líonra piara go piara. Ceadaíonn sé seo do chliaint athruithe stáit a fhíorú i ngach bloc le híosmhéid sonraí.

<ExpandableCard title="Cén laghdú go díreach is féidir le crainn Verkle ar mhéid finnéithe?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Athraíonn méid na bhfinnéithe ag brath ar líon na duilleoga a chuimsítear ann. Ag glacadh leis go gclúdaíonn an finné 1000 duilleog, bheadh ​​finné le haghaidh trie Merkle thart ar 3.5MB (ag glacadh le 7 leibhéal sa trie). Bheadh ​​finné do na sonraí céanna i gcrann Verkle (ag glacadh leis go bhfuil 4 leibhéal sa chrann) thart ar 150 kB - **thart ar 23x níos lú**. Fágfaidh an laghdú seo ar mhéid na bhfinnéithe gur féidir le finnéithe cliaint gan stát a bheith inghlactha beag. Is ionann finnéithe iltéarmacha 0.128 -1 kB ag brath ar an tiomantas iltéarmach sonrach a úsáidtear.

</ExpandableCard>

## Cad é struchtúr crann Verkle? {#what-is-the-structure-of-a-verkle-tree}

Is péirí `(eochair, luach)` iad crainn verkle ina bhfuil na heochracha ina n-eilimintí 32 beart comhdhéanta de 31 beart _gas_ agus beart amháin _iarmhír_. Eagraítear na heochracha seo ina nóid _síneadh_ agus ina nóid _inmheánach_. Is ionann nóid shínte agus gas amháin do 256 leanbh a bhfuil iarmhíreanna éagsúla acu. Tá 256 leanbh ag nóid istigh freisin, ach is féidir leo a bheith ina nóid síneadh eile. Is é an príomhdhifríocht idir an crann Verkle agus struchtúr crann Merkle ná go bhfuil an crann Verkle i bhfad níos leibhéalta, rud a chiallaíonn go bhfuil níos lú nóid idirmheánacha ag nascadh duilleog leis an bhfréamh, agus mar sin níos lú sonraí ag teastáil chun cruthúnas a ghiniúint.

![](./verkle.png)

[Léigh tuilleadh faoi struchtúr na gcrann Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Dul chun cinn reatha {#current-progress}

Tá testnets crann Verkle ar bun cheana féin, ach tá nuashonruithe suntasacha fós le déanamh do chliaint a theastaíonn chun tacú le crainn Verkle. Is féidir leat cabhrú le dul chun cinn a luathú trí chonarthaí a imscaradh chuig na líonraí tástála nó trí líonraí cliaint a rith.

[Déan iniúchadh ar líonra tástála Verkle Gen Devnet 6](https://verkle-gen-devnet-6.ethpandaops.io/)

[Féach ar Guillaume Ballet ag míniú an tástáil líonra Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (tabhair faoi deara gur cruthúnas-oibre a bhí i ngréasán tástála Condrieu agus go bhfuil testnet Verkle Gen Devnet 6) ina áit anois.

## Tuilleadh léitheoireachta {#further-reading}

- [Verkle Trees le haghaidh Neamhstáit](https://verkle.info/)
- [Míníonn Dankrad Feist crainn Verkle ar PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Verkle Trees For The Rest Of Us](https://research.2077.xyz/verkle-trees)
- [Anatomy of A Verkle Proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Míníonn Guillaume Ballet crainn Verkle ag ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Conas a dhéanann crainn Verkle Ethereum caol agus dána" ag Guillaume Ballet ag Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam ar chliaint gan stát ó ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Míníonn Dankrad Fiest crainn Verkle agus gan stát ar phodchraoladh Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin ar na crainn Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist ar chrainn Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Doiciméadú EIP crann Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
