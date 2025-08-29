---
title: Todhchaí Ethereum a rathú
description: Stroighníonn na huasghráduithe seo Ethereum mar bhunchiseal athléimneach, díláraithe don todhchaí, is cuma cad é.
lang: ga
image: /images/roadmap/roadmap-future.png
alt: "Treochlár Ethereum"
template: roadmap
---

Ní gá go mbeadh codanna áirithe den treochlár ag teastáil chun Ethereum a roinnt nó a dhaingniú sa ghearrthéarma, ach Ethereum a shocrú le haghaidh cobhsaíochta agus iontaofachta i bhfad amach anseo.

## Friotaíocht chandamach {#quantum-resistance}

Déanfar cuid den [cripteagrafaíocht](/glossary/#cryptography) a dhaingníonn Ethereum an lae inniu a chur i mbaol nuair a thiocfaidh an ríomhaireacht chandamach i gcrích. Cé gur dócha go bhfuil ríomhairí chandamach fiche nó tríocha bliain ar shiúl ó bheith ina bhagairt fíor do cripteagrafaíocht nua-aimseartha, tá Ethereum á thógáil chun a bheith slán ar feadh na gcéadta bliain amach romhainn. Ciallaíonn sé seo [Ethereum frithchandamach](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) a dhéanamh chomh luath agus is féidir.

Is é an dúshlán atá roimh fhorbróirí Ethereum ná go mbraitheann an prótacal reatha [cruthúnas-gheallta](/glossary/#pos) ar scéim sínithe an-éifeachtach ar a dtugtar BLS chun vótaí a chomhiomlánú ar [bhloic bhailí](/glossary/#block). Tá an scéim sínithe seo briste ag ríomhairí chandamacha, ach níl na roghanna frithsheasmhacha chandamach chomh héifeachtach.

Is eol go bhfuil na scéimeanna gealltanais [“KZG”](/roadmap/danksharding/#what-is-kzg) a úsáidtear in áiteanna éagsúla ar fud Ethereum chun rúin cripteagrafacha a ghiniúint candamach-leochaileach. Faoi láthair, seachnaítear é seo trí “socruithe iontaofa” a úsáid (a ndearnadh an príomh-seanchas socraithe a chríochnú go rathúil in 2023), áit ar ghin go leor úsáideoirí randamacht nach féidir le ríomhaire candamach a ais-innealtóireacht. Mar sin féin, is é an réiteach fadtéarmach idéalach ná cripteagrafaíocht shábháilte chandamach a ionchorprú ina ionad. Tá dhá chur chuige cheannródaíocha ann a d’fhéadfadh a bheith ina n-ionadaí éifeachtacha don scéim BLS: [STARK-bhunaithe](https://hackmd.io/@vbuterin/stark_aggregation) agus [laitíse-bhunaithe](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) ag síniú. **Tá taighde agus fréamhshamhlacha á ndéanamh orthu seo fós.**.

[Léigh faoi KZG agus socruithe iontaofa](/roadmap/danksharding#what-is-kzg)

## Ethereum níos simplí agus níos éifeachtaí {#simpler-more-efficient-ethereum}

Cruthaíonn castacht deiseanna le haghaidh fabhtanna nó leochaileachtaí ar féidir le hionsaitheoirí leas a bhaint astu. Dá bhrí sin, is cuid den phlean oibre Ethereum a shimpliú agus cód a bhaint nó a mhodhnú atá fágtha le linn uasghráduithe éagsúla ach nach bhfuil gá leis a thuilleadh nó ar féidir feabhas a chur air anois. Is fusa d’fhorbróirí bunachar cóid níos éadroime agus níos simplí a chothabháil agus réasúnú a dhéanamh faoi.

Chun [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm) a dhéanamh níos simplí agus níos éifeachtaí, déantar feabhsuithe a thaighde agus a chur i bhfeidhm i gcónaí. Baineann sé seo le dul i ngleic le comhpháirteanna oidhreachta agus optamuithe a thabhairt isteach araon.

**Athruithe a cuireadh i bhfeidhm le déanaí:**

- **Athchóiriú ar Ríomh Gáis:** Feabhsaíodh an bealach a [gás](/glossary/#gas) go suntasach le **EIP-1559 (a cuireadh i bhfeidhm in uasghrádú Londain, 2021)**, rud a thug isteach táille bhunúsach agus sásra dóite le haghaidh praghsáil idirbhirt níos intuartha.
- Srian ar **`SELFDESTRUCT`:** Cé nach n-úsáidtear an cód oibríochta `SELFDESTRUCT` go minic, bhí rioscaí féideartha ann. Cuireadh srian mór ar a **fheidhmiúlacht in uasghrádú Dencun (Márta 2024) trí EIP-6780** chun contúirtí a mhaolú, go háirithe maidir le bainistíocht stáit.
- **Cineálacha Idirbhirt Nuachóirithe:** Tugadh isteach formáidí nua idirbhirt (m.sh., trí **EIP-2718** agus **EIP-4844** le haghaidh blobanna san uasghrádú Dencun) chun tacú le gnéithe nua agus éifeachtúlacht a fheabhsú thar chineálacha oidhreachta.

**Spriocanna leanúnacha agus amach anseo:**

- **Tuilleadh Láimhseála `SELFDESTRUCT`:** Cé go bhfuil srian leis, táthar fós ag smaoineamh ar **bhaint iomlán fhéideartha** an opcode `SELFDESTRUCT` le haghaidh uasghráduithe amach anseo chun staid an EVM a shimpliú tuilleadh. ([Tuilleadh comhthéacs ar shaincheisteanna SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Deireadh a Chur le hIdirbhearta Seanré de réir a chéile:** Cé go dtacaíonn [cliaint Ethereum](/glossary/#consensus-client) fós le cineálacha idirbheart níos sine le haghaidh comhoiriúnachta siarghabhálach, is é an sprioc ná imirce chuig cineálacha níos nuaí a spreagadh agus **tacaíocht do na formáidí is sine a dhíchur nó a bhaint go hiomlán** sa todhchaí.
- **Taighde ar Éifeachtúlacht Gháis Leantach:** Leanann an taiscéalaíocht ar aghaidh chuig **feabhsuithe breise le haghaidh ríomh gáis**, lena n-áirítear coincheapa amhail gás iltoiseach chun úsáid acmhainní a léiriú níos fearr.
- **Oibríochtaí Cripteagrafacha Optamaithe:** Tá iarrachtaí ar bun chun **modhanna níos éifeachtaí a thabhairt isteach don uimhríocht** a bhuntacaíonn le hoibríochtaí cripteagrafacha a úsáidtear laistigh den EVM.

Ar an gcaoi chéanna, tá nuashonruithe ann is féidir a dhéanamh ar chodanna eile de chliaint Ethereum an lae inniu. Sampla amháin is ea go n-úsáideann cliaint fhorghníomhaithe agus comhthola reatha cineál difriúil comhbhrú sonraí. Beidh sé i bhfad níos éasca agus níos iomasaí sonraí a roinnt idir cliaint nuair a bheidh an scéim chomhbhrúite aontaithe ar fud an líonra ar fad. Is réimse taiscéalaíochta é seo fós.

## Dul chun cinn reatha {#current-progress}

Tá go leor de na huasghráduithe fadtéarmacha a fhéachfaidh leis an todhchaí, go háirithe **friotaíocht iomlán chandamach do phrótacail lárnacha, fós sa chéim taighde agus d'fhéadfadh sé go mbeadh roinnt blianta ann** sula gcuirfear i bhfeidhm iad.

Mar sin féin, **tá dul chun cinn suntasach déanta cheana féin ar iarrachtaí simplithe.** Mar shampla, cuireadh príomhathruithe ar nós an **srian ar `SELFDESTRUCT` (EIP-6780)** agus tabhairt isteach **idirbhearta iompar blóige (EIP-484)** i bhfeidhm sna **uasghrádú Dencun (Márta 2024)**. Leanann an obair ar chomhchuibhiú scéimeanna comhbhrú cliant agus feabhsuithe eile ar éifeachtúlacht ar aghaidh freisin.

**Tuilleadh léitheoireachta**

- [Gás](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Struchtúir sonraí](/developers/docs/data-structures-and-encoding)