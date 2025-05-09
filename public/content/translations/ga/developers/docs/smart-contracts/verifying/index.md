---
title: Conarthaí cliste a fhíorú
description: Forbhreathnú ar fhíorú cód foinseach do chonarthaí cliste Ethereum
lang: ga
---

Tá [Conarthaí cliste](/developers/docs/smart-contracts/) deartha le bheith “neamhiontaofa”, rud a chiallaíonn nár cheart go mbeadh ar úsáideoirí muinín a bheith acu as tríú páirtithe (m.sh., forbróirí agus cuideachtaí) roimh idirghníomhú le conradh. Mar riachtanas don neamhiontaobh, caithfidh úsáideoirí agus forbróirí eile a bheith in ann cód foinse conartha cliste a fhíorú. Cinntíonn fíorú cód foinse d'úsáideoirí agus d'fhorbróirí gurb é an cód conartha foilsithe an cód céanna a ritheann ag seoladh an chonartha ar bhlocshlabhra Ethereum.

Tá sé tábhachtach idirdhealú a dhéanamh idir "fíorú cód foinse" agus "[fíorú foirmiúil](/developers/docs/smart-contracts/formal-verification/)". Tagraíonn fíorú an chód foinse, a mhíneofar go mion thíos, d’fhíorú go bhfuil cód foinse áirithe an chonartha chliste i dteanga ardleibhéil (m.sh. Solidity) tiomsaithe don bheartchód céanna atá le cur i gcrích ag seoladh an chonartha. Mar sin féin, cuireann fíorú foirmiúil síos ar chruinneas conartha chliste a fhíorú, rud a chiallaíonn go n-oibríonn an conradh mar a bhíothas ag súil leis. Cé go mbraitheann comhthéacs, tagraíonn fíorú conartha de ghnáth d'fhíorú an chóid fhoinse.

## Cad is fíorú cód foinse ann? {#what-is-source-code-verification}

Sula n-imscarfar conradh cliste i [Meaisín Fíorúil Ethereum (EVM)](/developers/docs/evm/), déanfaidh na forbróirí [>tiomsú](/developers/docs/smart-contracts/compiling/) ar chód foinse an chonartha - treoracha [scríofa i Solidity](/developers/docs/smart-contracts/languages/) nó ceann eile teanga ríomhchlárúcháin ardleibhéil - go bytecode. Toisc nach féidir leis an EVM treoracha ardleibhéil a léirmhíniú, tá gá le cód foinse a thiomsú go beartchód (i.e., treoracha meaisín leibhéal íseal) chun loighic conartha a rith san EVM.

Is éard atá i bhfíorú cód foinse ná cód foinse an chonartha chliste a chur i gcomparáid leis an mbeartchód tiomsaithe a úsáideadh le linn chruthú an chonartha chun aon difríochtaí a bhrath. Tá sé tábhachtach conarthaí cliste a fhíorú toisc go bhféadfadh cód an chonartha fógartha a bheith difriúil ón méid a ritheann ar an mblocshlabhra.

Cumasaíonn fíorú conartha cliste imscrúdú a dhéanamh ar cad a dhéanann conradh tríd an teanga ardleibhéil ina bhfuil sé scríofa, gan gá le cód meaisín a léamh. Fanann feidhmeanna, luachanna, agus go hiondúil na hainmneacha agus na tuairimí athraitheacha mar a chéile leis an mbunchód foinse a chuirtear le chéile agus a imscartar. Déanann sé seo léamh an chóid i bhfad níos éasca. Déanann fíorú foinse foráil freisin do dhoiciméadú cód, ionas go mbeidh a fhios ag úsáideoirí deiridh cad í feidhm dheartha an conartha cliste.

### Cad is fíorú iomlán ann? {#full-verification}

Tá codanna áirithe den chód foinse nach ndéanann difear don bheartchód tiomsaithe, mar shampla tuairimí nó ainmneacha athraitheacha. Ciallaíonn sé sin go mbeadh dhá chód foinseach le hainmneacha athraitheacha éagsúla agus tuairimí difriúla in ann an conradh céanna a fhíorú. Leis sin, is féidir le gníomhaí mailíseach tuairimí meabhlacha a chur leis nó ainmneacha athróg míthreoracha a thabhairt taobh istigh den chód foinse agus an conradh a fhíorú le cód foinse éagsúil ón gcód foinse bunaidh.

Is féidir é seo a sheachaint trí shonraí breise a chur leis an mbeartchód chun feidhmiú mar _ráthaíocht chripteagrafach_ maidir le beachtas an chóid foinse, agus mar _mhéarloirg_ na faisnéise tiomsaithe. Tá an fhaisnéis riachtanach le fáil i [meiteashonraí conartha Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), agus cuirtear hais an chomhaid seo i gceangal le beartchód an chonartha. Is féidir leat é a fheiceáil i ngníomh i [gclós súgartha meiteashonraí](https://playground.sourcify.dev)

Tá faisnéis sa chomhad meiteashonraí maidir le tiomsú an chonartha lena n-áirítear na comhaid fhoinseacha agus na haiseanna atá acu. Ciallaíonn sé má athraíonn aon cheann de na socruithe tiomsaithe nó fiú beart i gceann de na comhaid foinseacha, go n-athraíonn an comhad meiteashonraí. Mar thoradh air sin athraíonn hais an chomhaid meiteashonraí, atá i gceangal leis an mbeartchód, freisin. Ciallaíonn sé sin má mheaitseálann beartchód an chonartha + an hais meiteashonraí atá i gceangal leis an gcód foinseach tugtha agus na socruithe tiomsaithe, is féidir linn a bheith cinnte gurb é seo go díreach an cód foinseach céanna a úsáideadh sa tiomsú bunaidh, gan fiú beart amháin difriúil.

Tagraítear don chineál seo fíoraithe a ghiarálann hais na meiteashonraí mar **" [fíorú iomlán](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (freisin "fíorú foirfe"). Mura n-oireann na haiseanna meiteashonraí nó mura mbreathnaítear orthu le linn fíorú, "comhoiriúnú páirteach" a bheadh ​​ann, arb é an bealach is coitianta faoi láthair conarthaí a fhíorú. Is féidir [cód mailíseach a chur isteach](https://samczsun.com/hiding-in-plain-sight/) nach léireofaí sa chód foinseach fíoraithe gan fíorú iomlán. Níl an chuid is mó d’fhorbróirí eolach ar an bhfíorú iomlán agus ní choinníonn siad an comhad meiteashonraí dá dtiomsú, dá bhrí sin is é an fíordheimhniú páirteach an modh de facto chun conarthaí a fhíorú go dtí seo.

## Cén fáth a bhfuil fíorú an chóid foinseach tábhachtach? {#importance-of-source-code-verification}

### Neamh-Iontaobhas {#trustlessness}

D’fhéadfaí a mhaíomh go bhfuil an easpa muiníne ar an mbonn is mó maidir le conarthaí cliste agus [feidhmchláir dhíláraithe (dapps)](/developers/docs/dapps/). Tá conarthaí cliste “do-athraithe” - ní féidir iad a athrú; ní rithfidh conradh ach an loighic ghnó a shainítear sa chód tráth an imscartha. Ciallaíonn sé seo nach féidir le forbróirí agus fiontair cur isteach ar chód conartha tar éis é a imscaradh ar Ethereum.

Chun conradh cliste a bheith neamhiontaofa, ba cheart go mbeadh cód an chonartha ar fáil fíorú go neamhspleách. Cé go bhfuil an beartchód tiomsaithe do gach conradh cliste ar fáil go poiblí ar an mblocshlabhra, tá sé deacair teanga íseal-leibhéil a thuiscint - d'fhorbróirí agus d'úsáideoirí araon.

Laghdaíonn tionscadail boinn tuisceana iontaobhais trí chód foinseach a gconarthaí a fhoilsiú. Ach tagann fadhb eile as seo: tá sé deacair a fhíorú go bhfuil an cód foinseach foilsithe ag teacht le beartchód an chonartha. Sa chás seo, cailltear luach na hiontaofachta toisc go gcaithfidh úsáideoirí muinín a bheith acu as forbróirí gan loighic ghnó an chonartha a athrú (i.e., tríd an beartchód a athrú) sula n-imscartar ar an blocshlabhra é.

Soláthraíonn uirlisí fíoraithe cód foinseach ráthaíochtaí go dtagann comhaid cód foinseach an chonartha chliste leis an gcód tionóil. Is é an toradh atá ann ná éiceachóras iontaofa, áit nach gcuireann úsáideoirí muinín go dall i dtríú pháirtithe agus ina ndéanann siad fíorú ar an gcód sula ndéanann siad cistí a thaisceadh i gconradh.

### Sábháilteacht Úsáideoirí {#user-safety}

Le conarthaí cliste, is gnách go mbíonn go leor airgid i gceist. Éilíonn sé seo ráthaíochtaí slándála níos airde agus fíorú loighic conartha cliste roimh é a úsáid. Is í an fhadhb atá ann gur féidir le forbróirí neamhscrupallacha úsáideoirí a mhealladh trí chód mailíseach a chur isteach i gconradh cliste. Gan fíorú, féadfaidh conarthaí cliste mailíseacha [cúldoirse](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts) le meicníochtaí rochtana chonspóideacha rialaithe, leochaileachtaí insaothraithe, agus rudaí eile a chuireann sábháilteacht úsáideoirí i gcontúirt agus nach dtabharfaí faoi deara a shuiteáil.

Má fhoilsítear comhaid chód foinseach an chonartha chliste beidh sé níos éasca dóibh siúd a bhfuil suim acu ann, mar iniúchóirí, measúnú a dhéanamh ar an gconradh le haghaidh veicteoirí ionsaithe féideartha. Agus ilpháirtithe ag fíorú conradh cliste go neamhspleách, bíonn ráthaíochtaí slándála níos láidre ag úsáideoirí.

## Conas cód foinseach a fhíorú le haghaidh conarthaí cliste Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Chun conradh cliste a imscaradh ar Ethereum](/developers/docs/smart-contracts/deploying/) is gá idirbheart le pálasta sonraí (beartchód tiomsaithe) a sheoladh chuig seoladh speisialta. Gintear an pálasta sonraí tríd an gcód foinseach a thiomsú, chomh maith le [argóintí tógálaí](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) an chonartha mar shampla ag gabháil leis an pálasta sonraí san idirbheart. Tá tiomsú cinntitheach, rud a chiallaíonn go dtáirgeann sé an t-aschur céanna i gcónaí (i.e., beartchód conartha) má úsáidtear na comhaid foinse céanna, agus socruithe tiomsaithe (m.sh. leagan tiomsaithe, optamóir).

![Léaráid a thaispeánann fíorú cód foinseach an chonartha cliste](./source-code-verification.png)

Go bunúsach tá na céimeanna seo a leanas i gceist le conradh cliste a fhíorú:

1. Cuir na comhaid foinse agus na socruithe tiomsaithe isteach i dtiomsaitheoir.

2. Aschuireann tiomsaitheoir beartchód an chonartha

3. Faigh beartchód an chonartha imlonnaithe ag seoladh ar leith

4. Déan comparáid idir an beartchód imlonnaithe agus an beartchód ath-thiomsaithe. Má mheaitseálann na cóid, fíorófar an conradh leis an gcód foinseach tugtha agus leis na socruithe tiomsaithe.

5. Ina theannta sin, má tá na meiteashonraí haise ag deireadh an chluiche beartchód, beidh sé ar chluiche iomlán.

Tabhair faoi deara gur cur síos simplíoch é seo ar an bhfíorú agus go bhfuil go leor eisceachtaí ann nach n-oibreodh leis seo, mar shampla [athróga neamh-inchurtha](https://docs.sourcify.dev/docs/immutables/).

## Uirlisí fíoraithe cód foinseach {#source-code-verification-tools}

Is féidir leis an bpróiseas traidisiúnta chun conarthaí a fhíorú a bheith casta. Sin é an fáth go bhfuil uirlisí againn chun cód foinseach a fhíorú le haghaidh conarthaí cliste a imscartar ar Ethereum. Déanann na huirlisí seo codanna móra d'fhíorú an chóid fhoinseach a uathoibriú agus coimeádann siad conarthaí fíoraithe ar mhaithe le húsáideoirí.

### Etherscan {#etherscan}

Cé go dtugtar [taiscéalaí blocshlabhra Ethereum](/developers/docs/data-and-analytics/block-explorers/) air den chuid is mó, soláthraíonn Etherscan [seirbhís fíoraithe cód foinseach](https://etherscan.io/verifyContract) d'fhorbróirí agus d'úsáideoirí conarthaí cliste.

Ligeann Etherscan duit beartchód conartha a ath-thiomsú ón bpálasta sonraí bunaidh (cód foinseach, seoladh leabharlainne, socruithe tiomsaitheora, seoladh conartha, etc.) Má bhaineann an beartchód ath-thiomsaithe le beartchód (agus paraiméadair tógálach) an chonartha ar slabhra, ansin [déantar an conradh a fhíorú](https://info.etherscan.com/types-of-contract-verification/).

Nuair a bheidh sé fíoraithe, faigheann cód foinseach do chonartha lipéad "Fíoraithe" agus foilsítear é ar Etherscan chun go bhféadfaidh daoine eile é a iniúchadh. Cuirtear leis an rannán [Conarthaí Fíoraithe](https://etherscan.io/contractsVerified/) é freisin — stór conarthaí cliste le cóid foinseach fíoraithe.

Is é Etherscan an uirlis is mó a úsáidtear chun conarthaí a fhíorú. Mar sin féin, tá míbhuntáiste ag baint le fíorú conartha Etherscan: teipeann air comparáid a dhéanamh idir **hais meiteashonraí** an bheartchóid ar slabhra agus an beartchód ath-thiomsaithe. Mar sin is meaitseálaithe páirteacha iad na meaitseálaithe in Etherscan.

[Tuilleadh maidir le conarthaí ar Etherscan a fhíorú](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Soursify {#sourcify}

Uirlis eile is ea [Sourcify](https://sourcify.dev/#/verifier) chun conarthaí foinse oscailte agus díláraithe a fhíorú. Ní taiscéalaí bloic é agus ní fhíoraíonn sé ach conarthaí ar [líonraí éagsúla bunaithe ar EVM](https://docs.sourcify.dev/docs/chains). Feidhmíonn sé mar bhonneagar poiblí le haghaidh uirlisí eile de bhreis air, agus tá sé mar aidhm aige idirghníomhaíochtaí conartha atá níos éasca don duine a chumasú trí úsáid a bhaint as [ Tráchtanna ABI](/developers/docs/smart-contracts/compiling/#web-applications) agus [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) a aimsíodh sna comhaid mheiteashonraí.

Murab ionann agus Etherscan, tacaíonn Sourcify le meaitseáil iomlán leis an hais meiteashonraí. Déantar na conarthaí fíoraithe a sheirbheáil ina [stór poiblí](https://docs.sourcify.dev/docs/repository/) ar HTTP agus[IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), atá díláraithe, [inneachar-dírithe](https://web3.storage/docs/concepts/content-addressing/) ar stóras. Ligeann sé seo duit comhad meiteashonraí conartha a fháil thar IPFS ós rud é gur hais IPFS an hais meiteashonraí atá ag gabháil leis.

Ina theannta sin, is féidir na comhaid cód foinseach a aisghabháil thar IPFS freisin, mar go bhfuil hais IPFS de na comhaid seo le fáil sna meiteashonraí freisin. Is féidir conradh a fhíorú tríd an gcomhad meiteashonraí agus na comhaid fhoinseacha a sholáthar thar a API nó an [UI](https://sourcify.dev/#/verifier), nó trí na forlíontáin a úsáid. Éisteann uirlis monatóireachta Sourcify freisin le cruthú conarthaí ar bhloic nua agus déanann sé iarracht na conarthaí a fhíorú má fhoilsítear a meiteashonraí agus a gcomhaid foinseacha ar IPFS.

[Tuilleadh maidir le conarthaí ar Sourcify a fhíorú](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

Cuireann an [ardán Tenderly](https://tenderly.co/) ar chumas forbróirí Web3 conarthaí cliste a thógáil, a thástáil, monatóireacht a dhéanamh orthu agus iad a oibriú. Trí uirlisí dífhabhtaithe a chomhcheangal le hinbhraiteacht agus bloic thógála bonneagair, cabhraíonn Tenderly le forbróirí forbairt conarthaí cliste a luathú. Chun gnéithe Tenderly a chumasú go hiomlán, ní mór d'fhorbróirí [fíorú cód foinseach a dhéanamh](https://docs.tenderly.co/monitoring/contract-verification) ag baint úsáide as roinnt modhanna.

Is féidir conradh a fhíorú go príobháideach nó go poiblí. Má dhéantar é a fhíorú go príobháideach, ní bheidh an conradh cliste le feiceáil ach agat féin (agus do bhaill eile i do thionscadal). Má dhéantar conradh a fhíorú go poiblí, beidh sé le feiceáil ag gach duine a úsáideann ardán Tenderly.

Is féidir leat do chonarthaí a fhíorú trí úsáid a bhaint as an [Daischlár](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), [Breiseán Tenderly Hardhat](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin), nó [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Agus conarthaí á bhfíorú tríd an Deais, ní mór duit an comhad foinseach nó an comhad meiteashonraí ginte ag an tiomsaitheoir Solidity, an seoladh/líonra, agus socruithe an tiomsaitheora a iompórtáil.

Trí úsáid a bhaint as an mbreiseán Tenderly Hardhat is féidir níos mó smachta a fháil ar an bpróiseas fíoraithe le níos lú iarrachta, rud a chuirfidh ar do chumas rogha a dhéanamh idir fíorú uathoibríoch (gan chód) agus fíorú láimhe (cód-bhunaithe).

## Tuilleadh léitheoireachta {#further-reading}

- [Cód foinse an chonartha á fhíorú](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
