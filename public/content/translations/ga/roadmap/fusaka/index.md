---
title: Fulu-Osaka (Fusaka)
description: Foghlaim faoin uasghrádú prótacal Fusaka
lang: ga
---

# Fusaka {#fusaka}

Leanann uasghrádú líonra Fusaka [Pectra](/roadmap/pectra/) agus tugann sé níos mó gnéithe nua agus feabhsaíonn sé an taithí do gach úsáideoir agus forbróir Ethereum. Is éard atá san ainm ná uasghrádú an chiseal reatha Osaka agus leagan an chiseal comhaontaithe ainmnithe i ndiaidh réalta Fulu. Faigheann an dá chuid de Ethereum uasghrádú a chuireann scálú, slándáil agus taithí úsáideora Ethereum chun cinn sa todhchaí.

Tá an t-uasghrádú seo beartaithe do Ráithe 4 de 2025.

<InfoBanner>
Níl san uasghrádú Fusaka ach céim amháin i spriocanna forbartha fadtéarmacha Ethereum. Foghlaim tuilleadh faoin [treochlár prótacail](/roadmap/) agus [uasghráduithe roimhe seo](/history/).
</InfoBanner>

## Feabhsuithe ar Fusaka {#improvements-in-fusaka}

### Infhaighteacht sonraí & scálú L2 {#data-availability-and-l2-scaling}

#### PeerDAS {#peerdas}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7594

Acmhainní: https://youtu.be/bONWd1x2TjQ?t=328 (dapplion ar PeerDAS)

Seo _príomhghné_ fhorc Fusaka, an phríomhghné a cuireadh leis san uasghrádú seo. Faoi láthair, postálann Sraith 2s a gcuid sonraí chuig Ethereum i mblobaí, an cineál sonraí neamhbhuan a cruthaíodh go sonrach do shraith 2s. Roimh Fusaka, caithfidh gach nód iomlán gach bloba a stóráil chun a chinntiú go bhfuil na sonraí ann. De réir mar a mhéadaíonn an tréchur blobaí, bíonn an gá le hacmhainní a íoslódáil thar a bheith dian.

Le [sampláil infhaighteachta sonraí](https://notes.ethereum.org/@fradamt/das-fork-choice), in ionad na sonraí blobaí go léir a stóráil, beidh gach nód freagrach as fo-thacar de na sonraí blobaí. Déantar blobaí a dháileadh go randamach go haonfhoirmeach ar fud nóid sa líonra agus ní bhíonn ach 1/8ú de na sonraí i ngach nód iomlán, rud a chuireann ar chumas scála teoiriciúil suas le 8x. Chun infhaighteacht na sonraí a chinntiú, is féidir aon chuid de na sonraí a atógáil ó aon 50% den iomlán atá ann cheana féin le modhanna a laghdaíonn an dóchúlacht go mbeidh sonraí míchearta nó ar iarraidh go leibhéal cripteagrafaíochta neamhbhríoch (~ceann amháin i 10²⁰ go ceann amháin i 10²⁴).

Coinníonn sé seo riachtanais chrua-earraí agus bandaleithead do nóid inbhuanaithe agus cumasaíonn sé scálú bloba as a dtagann scála níos mó le táillí níos lú do shraitheanna 2s.

Mionsonraithe: https://eprint.iacr.org/2024/1362.pdf

#### Foirc pharaiméadair bloba amháin {#blob-parameter-only-forks}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7892

Scálú Sraith 2s Ethereum - de réir mar a fhásann a líonraí, ní mór dóibh níos mó sonraí a phostáil chuig Ethereum. Ciallaíonn sé seo go mbeidh ar Ethereum líon na mblobaí atá ar fáil dóibh a mhéadú le himeacht ama. Cé go gcuireann PeerDAS ar chumas sonraí bloba a scálú, ní mór é a dhéanamh de réir a chéile agus go sábháilte.

Ós rud é gur cód é Ethereum atá ag rith ar na mílte nód neamhspleácha a éilíonn comhaontú ar na rialacha céanna, ní féidir linn athruithe a thabhairt isteach go simplí amhail líon na mblobaí a mhéadú ar an mbealach a imscarann ​​tú nuashonrú gréasáin. Ní mór aon athrú rialacha a bheith ina uasghrádú comhordaithe ina ndéantar uasghrádú ar gach nód, cliant agus bogearraí bailíochtóra roimh an mbloc réamhchinntithe céanna.

De ghnáth, bíonn a lán athruithe sna huasghráduithe comhordaithe seo, bíonn go leor tástála ag teastáil, agus tógann sé sin am. D'fhonn oiriúnú níos tapúla do riachtanais athraitheacha bhloba chiseal 2, ní thugann ach foirc pharaiméadar meicníocht isteach chun blobaí a mhéadú gan a bheith ag fanacht ar an sceideal uasghrádaithe sin.

Is féidir le cliaint fhorc paraiméadair bloba amháin a shocrú, ar an gcaoi chéanna le cumraíocht eile amhail teorainn gáis. Idir uasghráduithe móra Ethereum, is féidir le cliaint aontú na blobaí `sprioc` agus `uas` a mhéadú go m.sh. 9 agus 12 agus ansin déanfaidh oibreoirí nód nuashonrú chun páirt a ghlacadh sa bhforc beag bídeach sin. Is féidir na foirc seo, nach bhfuil ach paraiméadair bhloba iontu, a chumrú ag am ar bith.

#### Táille bonn bloba teoranta ag costais reatha {#blob-base-fee-bounded-by-execution-costs}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7918

Míniúchán ar an leabhar scéalta: https://notes.ethereum.org/@anderselowsson/AIG

Íocann sraitheanna 2s dhá bhille nuair a phostálann siad sonraí: an táille blobaí agus an gás reatha a theastaíonn chun na blobaí sin a fhíorú. Má bhíonn gás reatha i réim, is féidir leis an gceant táille bloba titim síos go 1 wei agus scor de bheith ina chomhartha praghais.

Cuireann EIP-7918 praghas forchoimeádta comhréireach faoi gach bloba. Nuair a bhíonn an cúlchiste níos airde ná an buntáille bloba ainmniúil, déanann an algartam coigeartaithe táille an bhloic a chóireáil mar rud atá os cionn na sprice agus stopann sé ag brú an táille síos agus ligeann dó méadú de ghnáth. Mar thoradh air sin:

- imoibríonn margadh na dtáillí bloba i gcónaí le plódú
- íocann ciseal 2s cuid shuntasach ar a laghad den ríomhaireacht a chuireann siad i bhfeidhm ar nóid
- ní féidir le spící táille bonn ar an EL an táille bloba a shnáithiú ag 1 wei a thuilleadh

### Teorainneacha gáis, táillí & cruachan DoS {#gas-limits-fees-and-dos-hardening}

#### Socraigh uasteorainneacha do MODEXP {#set-upper-bounds-for-modexp}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7823

Go dtí seo, ghlac réamh-thiomsú MODEXP le huimhreacha de bheagnach aon mhéid. Mar thoradh air sin, bhí sé deacair tástáil a dhéanamh air, éasca le mí-úsáid a bhaint as, agus rioscúil do chobhsaíocht an chliaint. Cuireann EIP-7823 teorainn shoiléir i bhfeidhm: ní féidir le gach uimhir ionchuir a bheith níos mó ná 8192 giotán (1024 beart) ar fhad. Diúltaítear d’aon rud níos mó, dóitear gás an idirbhirt, agus ní tharlaíonn aon athruithe staide. Clúdaíonn sé riachtanais an tsaoil réadaigh go han-chompordach agus baintear na cásanna foircneacha a chuir castacht ar phleanáil teorainneacha gáis agus ar athbhreithnithe slándála. Cuireann an t-athrú seo níos mó slándála agus cosaint DoS ar fáil gan cur isteach ar thaithí an úsáideora ná an fhorbróra.

#### Teorainn Gáis Idirbhirt {#transaction-gas-limit-cap}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7825

Cuireann EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) uasteorainn de 16,777,216 (2^24) gás in aghaidh an idirbhirt leis. Is cruachan réamhghníomhach DoS é tríd an gcostas is measa d'aon idirbheart aonair a theorannú de réir mar a ardaímid an teorainn gáis bloc. Déanann sé níos éasca samhaltú a dhéanamh ar bhailíochtú agus ar iomadú chun ligean dúinn dul i ngleic le scálú tríd an teorainn gáis a ardú.

Cén fáth go díreach gás 2^24? Tá sé níos lú go compordach ná teorainn gháis an lae inniu, tá sé mór go leor le haghaidh imscaradh conarthaí fíor & réamh-thiomsuithe troma, agus a bhuíochas le cumhacht 2, is furasta é a chur i bhfeidhm ar fud cliant. Tá an méid uasta idirbhirt nua seo cosúil le meánmhéid na mbloc roimh Pectra, rud a fhágann gur teorainn réasúnta é d'aon oibríocht ar Ethereum.

#### Méadú ar Chostas Gáis MODEXP {{#modexp-gas-cost-increase}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7883

Is feidhm réamh-thiomsaithe ionsuite í MODEXP a ríomhann easpónantúchán modúlach, cineál matamaitice uimhreacha móra a úsáidtear i gcórais fíoraithe agus cruthúnais sínithe RSA. Ligeann sé do chonarthaí na ríomhanna seo a rith go díreach gan iad a chur i bhfeidhm iad féin.

D'aithin forbróirí agus foirne cliant gur constaic mór é MODEXP maidir le teorainn an bhlocgháis a mhéadú toisc go minic go ndéanann praghsáil reatha an gháis meastachán faoina luach ar an méid cumhachta ríomhaireachta a theastaíonn ó ionchur áirithe. Ciallaíonn sé seo go bhféadfadh idirbheart amháin ag baint úsáide as MODEXP an chuid is mó den am a theastaíonn chun bloc iomlán a phróiseáil a thógáil, rud a chuirfeadh moill ar an líonra.

Athraíonn EIP-7883 an praghsáil chun freastal ar fhíorchostais ríomhaireachtúla trí:

- an muirear íosta a ardú ó 200 go 500 gás agus an lascaine aon trian ó EIP-2565 a bhaint ar ríomh an chostais ghinearálta
- ag méadú an chostais níos géire nuair a bhíonn an t-ionchur easpónant an-fhada. má tá an t-easpónant (an uimhir “chumhachta” a chuireann tú isteach mar an dara hargóint) níos faide ná 32 beart / 256 giotán, ardaíonn an muirear gáis i bhfad níos tapúla le haghaidh gach beart breise
- bonn mór nó modúl breise a mhuirearú chomh maith. Glactar leis go bhfuil an dá uimhir eile (an bonn agus an modúl) de 32 beart ar a laghad - má tá ceachtar acu níos mó, ardaíonn an costas i gcomhréir lena mhéid

Trí chostais a mheaitseáil níos fearr leis an am próiseála iarbhír, ní féidir le MODEXP a chur faoi deara go dtógfaidh sé ró-fhada ar bhloc a bhailíochtú a thuilleadh. Tá an t-athrú seo ar cheann de roinnt athruithe atá dírithe ar shábháilteacht teorainn gháis bhloc Ethereum a mhéadú amach anseo.

#### Teorainn Mhéide Bloc Reatha RLP {#rlp-execution-block-size-limit}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7934

Cuireann Ethereum teorainn chrua ar mhéid an bhloic reatha atá ionchódaithe ag [RLP](/developers/docs/data-structures-and-encoding/rlp/): 10 MiB san iomlán, le corrlach sábháilteachta 2 MiB curtha in áirithe le haghaidh frámaíocht bloic beacon. Go praiticiúil, sainmhíníonn cliaint `MAX_BLOCK_SIZE = 10,485,760` beart agus `SAFETY_MARGIN = 2,097,152` beart, agus diúltaíonn siad d'aon bhloc reatha a bhfuil a ualach RLP níos mó ná `MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`. Is é an sprioc an t-am iomadúcháin/bailíochtaithe is measa a theorannú agus ailíniú le hiompar béadáin CL (ní iomadaítear bloic os cionn ~10 MiB), rud a laghdaíonn riosca ath-eagrúcháin/DoS gan cuntasaíocht gáis a athrú.

#### Socraigh an teorainn réamhshocraithe gáis go XX milliún{#set-default-gas-limit-to-xx-million}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7935

Sula ar ardaíodh an teorainn gáis ó 30M go 36M i mí Feabhra 2025 (agus ina dhiaidh sin go 45M), níor athraigh an luach seo ó tharla an Cumaisc (Meán Fómhair 2022). Tá sé mar aidhm ag an EIP seo tosaíocht a thabhairt do scálú comhsheasmhach.

Comhordaíonn EIP-7935 foirne cliant EL chun an teorainn gháis réamhshocraithe a ardú os cionn 45M an lae inniu do Fusaka. Is EIP Faisnéise é, ach iarrann sé go sainráite ar chliaint teorainneacha níos airde a thástáil ar devnets, teacht ar luach sábháilte, agus an uimhir sin a sheoladh ina n-eisiúintí Fusaka.

Tá sé mar aidhm ag pleanáil Devnet strus ~60M (bloic iomlána le hualach sintéiseach) agus cnapáin athchleachtacha a úsáid; deir taighde nach gceart go mbeadh paiteolaíochtaí méid bloc sa chás is measa ceangailte faoi bhun ~150M. Ba cheart an rolladh amach a phéireáil leis an uasteorainn gáis idirbhirt (EIP-7825) ionas nach féidir le haon idirbheart aonair a bheith i réim de réir mar a ardaíonn teorainneacha.

### Tacaíocht réamhdheimhnithe {#preconfirmation-support}

#### Breathnú chun cinn ar mholtóir cinntitheach {#deterministic-proposer-lookahead}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7917

Le EIP-7917, beidh Beacon Chain ar an eolas faoi mholtóirí bloc atá le teacht don chéad ré eile. Trí dhearcadh cinntitheach a bheith agat maidir leis na bailíochtóirí a bheidh ag moladh bloic amach anseo, is féidir réamhdheimhnithe a chumasú (https://ethresear.ch/t/based-preconfirmations/17353) - gealltanas leis an moltóir atá le teacht a ráthaíonn go gcuirfear idirbheart an úsáideora san áireamh ina mbloc gan fanacht leis an mbloc iarbhír.

Déanann an ghné seo leas d'fheidhmiú cliant agus slándáil an líonra toisc go gcuireann sí cosc ​​ar chásanna imeallacha inar féidir le bailíochtóirí sceideal an mholtóra a ionramháil. Ligeann an breathnú chun cinn níos lú castachta i gcur i bhfeidhm freisin.

### Opcodes & precompiles (bronntanais d'fhorbróirí) {#opcodes-and-precomliles}

#### Cód oibríochta comhaireamh nialais tosaigh (CLZ) {#count-leading-zeros-opcode}

Sonraíocht: https://eips.ethereum.org/EIPS/eip-7939

Cuireann EIP-7939 treoir bheag EVM, CLZ (“nialais tosaigh a chomhaireamh”). Má tá luach 256-giotán tugtha, tugann sé ar ais cé mhéad nialas-giotán atá ag an tosach — agus tugann sé 256 ar ais má tá an luach go hiomlán nialasach. Is gné choitianta í seo i go leor ailtireachtaí tacair treoracha toisc go gcuireann sé ar chumas oibríochtaí uimhríochta níos éifeachtaí. Go praiticiúil, laghdaíonn sé seo scanta giotán rollta láimhe an lae inniu i gcéim amháin, mar sin bíonn sé níos simplí agus níos saoire an chéad giotán tacair a aimsiú, beart a scanadh, nó réimsí giotán a pharsáil. Tá an cód oibríochta íseal, ar chostas seasta agus tá sé tagarmharcáilte le bheith ar aon dul le breiseán bunúsach, a laghdaíonn an cód beart agus a shábhálann gás don obair chéanna.

## An mbíonn tionchar ag an uasghrádú seo ar gach nód agus bailíochtóir Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sea, éilíonn uasghrádú Fusaka nuashonruithe ar [chliaint reatha agus chliaint chomhdhearcaidh](/developers/docs/nodes-and-clients/) araon. Scaoilfidh gach príomhchliant Ethereum leaganacha a thacaíonn leis an bhforc crua atá marcáilte mar thosaíocht ard. Is féidir leat a bheith ar an eolas faoi cathain a bheidh na heisiúintí seo ar fáil i stórtha Github na gcliant, ina [cainéil Discord](https://ethstaker.org/support), an [EthStaker Discord](https://dsc.gg/ethstaker), nó trí shíntiús a íoc le blag Ethereum le haghaidh nuashonruithe prótacail. Chun sioncrónú a choinneáil le hiar-uasghrádú líonra Ethereum, ní mór d'oibreoirí nód a chinntiú go bhfuil leagan cliant tacaithe á rith acu. Tabhair faoi deara go bhfuil an fhaisnéis faoi eisiúintí cliant íogair ó thaobh ama de, agus ba cheart d'úsáideoirí tagairt a dhéanamh do na nuashonruithe is déanaí le haghaidh na sonraí is déanaí.

## Conas is féidir ETH a thiontú tar éis an gabhal crua? {#how-can-eth-be-converted-after-the-hardfork}

- **Níl aon ghníomh ag teastáil le haghaidh d’ETH**: Tar éis uasghrádú Ethereum Fusaka, níl aon ghá le d’ETH a thiontú ná a uasghrádú. Fanfaidh iarmhéid do chuntais mar a chéile, agus beidh an ETH atá agat faoi láthair fós inrochtana ina fhoirm láithreach tar éis an ghabhail chrua.
- **Bí ar an airdeall ar Camscéimeanna!** <Emoji text="⚠️" /> \*\* tá aon duine a thugann treoir duit do ETH a "uasghrádú" i mbun scéiméireachta.\*\* Níl aon rud le déanamh agat maidir leis an uasghrádú seo. Ní dhéanfar aon difear do do shócmhainní. Cuimhnigh, is é fanacht ar an eolas an chosaint is fearr i gcoinne camscéimeanna.

[Tuilleadh maidir le camscéimeanna a aithint agus a sheachaint](/slándáil/)

## Tuilleadh léitheoireachta {#further-reading}

- [Treochlár Ethereum](/roadmap/)
- [Forc-chraoladh: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Gan Baic: Cad a thabharfaidh Fusaka & Pectra le Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Uasghráduithe Ethereum ina Dhiaidh Seo: Fusaka, Glamsterdam & Níos Mó le Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
