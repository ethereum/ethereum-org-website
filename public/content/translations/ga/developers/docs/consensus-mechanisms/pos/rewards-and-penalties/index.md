---
title: Luaíochtaí agus pionóis cruthúnas-oibre
description: Foghlaim faoi na dreasachtaí in-phrótacal i cruthúnas-oibre Ethereum.
lang: ga
---

Tá Ethereum urraithe ag baint úsáide as a chriptea-airgeadra dúchais, éitear (ETH). Oibreoirí nód ar mian leo a bheith rannpháirteach i mbailíochtú bloic agus ceann an tslabhra a aithint, cuireann siad éitear isteach sa [conradh taisce](/staking/deposit-contract/) ar Ethereum. Íoctar iad ansin in éitear chun bogearraí bailíochtóra a rith a sheiceálann bailíocht na mbloic nua a fhaightear thar an líonra piaraí go piaraí agus a chuireann an algartam forc-rogha i bhfeidhm chun ceann an tslabhra a aithint.

Tá dhá phríomhról ag bailíochtóir: 1) bloic nua a sheiceáil agus “fianú” a dhéanamh orthu má tá siad bailí, 2) bloic nua a mholadh nuair a roghnaítear iad go randamach ón linn bailíochtóirí iomlán. Má theipeann ar an bhailíochtóir ceachtar de na tascanna seo a dhéanamh nuair a iarrtar orthu cailleann sé íocaíocht éitir. Uaireanta cuirtear comhiomlánú sínithe de chúram ar bhailíochtóirí agus páirt a ghlacadh i gcoistí sioncronaithe.

Tá gníomhartha ann freisin atá an-deacair a dhéanamh de thaisme agus a léiríonn rún mailíseach éigin, mar shampla bloic iolracha a mholadh don sliotán céanna nó bloic iolracha a fhianú don sliotán céanna. Is iompraíochtaí “in-slaiseáilte” iad seo a fhágann go ndóitear méid áirithe éitear (suas le 1 ETH) don bhailíochtóir sula mbaintear an bailíochtóir den líonra, rud a thógann 36 lá. Síothlaítear éitear an bhailíochtóra slaiseáilte go mall ar feadh an tréimhse scoir, ach ar an 18 lá faigheann siad “pionós comhghaoil” atá níos mó nuair a shlaiseáltar níos mó bailíochtóirí thart ar an am céanna. Dá bhrí sin íocann struchtúr dreasachta an mheicníocht chomhdhearcaldh as macántacht agus gearrtar pionós ar dhrochghníomhaithe.

Cuirtear gach luaíocht agus pionós i bhfeidhm uair amháin in aghaidh na ré.

Léigh ar aghaidh le haghaidh tuilleadh sonraí...

## Luaíochtaí agus pionóis {#rewards}

### Luaíochtaí {#rewards}

Faigheann bailíochtóirí luaíochtaí nuair a dhéanann siad vótaí atá comhsheasmhach le tromlach na mbailíochtóirí eile, nuair a mholann siad bloic, agus nuair a ghlacann siad páirt i gcoistí sioncronaithe. Ríomhtar luach na luaíochtaí i ngach tréimhse ó`bun_luaíocht`. Is é seo an bunaonad as a ríomhtar luaíochtaí eile. Léiríonn an `base_reward` an meánluach saothair a fhaigheann bailíochtóir faoi na coinníollacha is fearr in aghaidh na ré. Ríomhtar é seo ó chomhardú éifeachtach an bhailíochtóra agus ó líon iomlán na mbailíochtóirí gníomhacha mar seo a leanas:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

áit a bhfuil `fachtóir_bun_luaíochta` cothrom le 64, is é 4 an `ré-bun-luaíochta` agus is é `suim (iarmhéid ghníomhach)` an t-éitear iomlán geallta thar na bailíochtóirí gníomhacha go léir.

Ciallaíonn sé seo go bhfuil an bun-luaíocht i gcomhréir le cothromaíocht éifeachtach an bhailíochtóra agus comhréireach go contrártha le líon na mbailíochtóirí ar an líonra. Dá mhéid bailíochtóirí a bhíonn ann, is ea is mó an eisiúint iomlán (mar `sqrt(N)` ach is lú an `bun-luaiocht` in aghaidh an bhailíochtóra (mar `1/sqrt(N)`). Bíonn tionchar ag na fachtóirí seo ar an APR le haghaidh nód gill. Léigh an réasúnaíocht leis seo in [Nótaí Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Ríomhtar an luaíocht iomlán ansin mar shuim na gcúig chomhpháirt a bhfuil ualú ag gach ceann díobh a shocraíonn cé mhéad a chuireann gach comhpháirt leis an luaíocht iomlán. Is iad na comhpháirteanna:

```
1. source vote: the validator has made a timely vote for the correct source checkpoint
2. target vote: the validator has made a timely vote for the correct target checkpoint
3. head vote: the validator has made a timely vote for the correct head block
4. sync committee reward: the validator has participated in a sync committee
5. proposer reward: the validator has proposed a block in the correct slot
```

Is iad seo a leanas na hualuithe do gach comhpháirt:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

64 suim na n-ualach seo. Ríomhtar an luaíocht mar shuim na n-ualuithe infheidhme roinnte ar 64. D'fhéadfadh bailíochtóir a rinne vótaí tráthúla foinse, sprice agus cinn, a mhol bloc agus a ghlac páirt i gcoiste sioncronaithe `64/64 * bun_luaíocht == bun_luaíocht` a fháil. Mar sin féin, ní gnáthach gur moltóir bloic é bailíochtóir, mar sin is é an luaíocht uasta ná `64-8 /64 * bun_luaíocht == 7/8 * bun_luaíocht`. Is féidir le bailíochtóirí nach moltóirí bloic iad ná ar choiste sioncronaithe `64-8-2 / 64 * bun_luaíocht == 6.75/8 * bun_luaíocht` a fháil.

Cuirtear luaíocht breise leis chun fianuithe tapa a dhreasú. Seo é an ` luaíocht_moill_iniaimh`. Tá luach aige seo ar cóimhéid leis an `bbun_luaíocht` arna iolrú faoi `1/delay` áit arb é `delay` líon na sliotán a scarann ​​an togra bloc agus an fianú. Mar shampla, má chuirtear an fianú isteach laistigh de shliotán amháin den bhloc-thogra gheobhaidh an fianóir `bun_luaíocht * 1/1 == bun_luaíocht`. Má shroicheann an fianú an chéad sliotán eile, gheobhaidh an fianóir `bun_luaíocht * 1/2` agus mar sin de.

Faigheann moltóirí bloic ` 8 / 64 * bun_luaíocht` le haghaidh **gach fianú bailí** atá san áireamh sa bhloc, mar sin luach iarbhír na scálaí luaíochta agus líon na ag fianú bailíochtaithe. Is féidir le tairgeoirí bloc a luaíocht a mhéadú freisin trí fhianaise ar mhí-iompraíocht ó bhailíochtóirí eile a áireamh sa bhloc atá beartaithe acu. Is iad na luaíochtaí seo na "cairéid" a spreagann macántacht bhailíochtóra. Bronnfar an `iarmhéid_éifeachtach_bailíochtóirí_slaiseálta / 512` ar mholtóir bloc lena n-áirítear slaiseáíl.

### Pionóis {#penalties}

Go dtí seo tá breithniú déanta againn ar bhailíochtóirí dea-mhúinte, ach cad faoi bhailíochtóirí nach ndéanann vótaí cinn, foinse agus sprice tráthúil nó nach ndéanann go mall?

Is ionann na pionóis a ghearrtar ar na vótaí sprice agus foinse agus na luaíochtaí a gheobhadh an fianóir dá gcuirfeadh sé isteach iad. Ciallaíonn sé seo, in ionad an luaíocht a bheith curtha lena n-iarmhéid, go mbaintear luach comhionann óna n-iarmhéid. Níl aon phionós as an vóta cinn a bheith ar iarraidh (i.e. ní thugtar ach luaíocht do vótaí cinn, ní ghearrtar pionós orthu). Níl aon phionós ag baint leis an `moill_iniaimh` - go simplí ní chuirfear an luaíocht le hiarmhéid an bhailíochtóra. Níl aon phionós ach oiread as mainneachtain bloc a mholadh.

Léigh tuilleadh faoi luaíochtaí agus pionóis sa [sonrú comhdhearcaidh](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Coigeartaíodh luaíochtaí agus pionóis in uasghrádú Bellatrix - féach ar Danny Ryan agus Vitalik á phlé seo sa [Peep an EIP video](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slaiseáil {#slashing}

Is gníomh níos déine é slaiseáil a fhágann go mbaintear bailíochtóir go láidir den líonra agus go gcailleann siad a n-éitear i ngeall. Tá trí bhealach ann inar féidir bailíochtóir a shlaiseáil, agus is ionann iad seo agus moladh mímhacánta nó fianú bloic:

- Trí dhá bhloc éagsúla a mholadh agus a shíniú don sliotán céanna
- Trí fhianú a dhéanamh ar bhloc a "thimpeallaíonn" ceann eile (ag athrú na staire go héifeachtach)
- Trí "vótáil dhúbailte" trí fhianú a dhéanamh ar bheirt iarrthóirí don bhloc céanna

Má aimsítear na gníomhartha seo, slaisteáiltear an bailíochtóir. Ciallaíonn sé seo go ndéantar 0.0078125 a dhó láithreach le haghaidh bailíochtóra 32 ETH (scálaithe go líneach le hiarmhéid gníomhach), ansin tosaíonn tréimhse bainte 36 lá. Le linn na tréimhse aistrithe seo síothlaítear sciar gill an bhailíochtóra de réir a chéile. Ag an lárphointe (Lá 18) cuirtear pionós breise i bhfeidhm a bhfuil a scálaí méide le héitear geallta iomlán na mbailitheoirí slaiseáilte go léir i bhfeidhm sna 36 lá roimh an teagmhas slaiseála. Ciallaíónn sé seo nuair a ghearrtar níos mó bailíochtóirí, go méadaíonn méid na slaiseála. Is é an t-uasmhéid slaiseála ná comhardú iomlán éifeachtach na mbailíochtóirí go léir a bhfuil slaiseáil déanta orthu (i.e. má tá go leor bailíochtóirí á slaiseáil, d’fhéadfaidís a ngeall iomlán a chailleadh). Ar an taobh eile de, ní dhóitear ach cuid bheag de geall an bhailíochtóra trí imeacht slaiseála aonair amháin. Tugtar "pionós comhghaoil" ar an bpionós lárphointe seo a scálaíonn le líon na mbailitheoirí slaiseáilte.

## Sceitheadh ​​neamhghníomhaíochta {#inactivity-leak}

Má tá níos mó ná ceithre ré caite ag an gciseal comhdhearcaidh gan críochnú, cuirtear prótacal éigeandála ar a dtugtar an "sceitheadh ​​​​neamhghníomhaíochta" i ngníomh. Is í aidhm dheiridh an sceitheadh neamhghníomhaíochta na coinníollacha a chruthú a theastaíonn le go bhféadfaidh an slabhra críochnaitheachta a ghnóthú. Mar a mhínítear thuas, éilíonn críochnaitheacht tromlach 2/3 den éitear iomlán atá geallta chun aontú ar sheicphointí foinse agus sprice. Má théann bailíochtóirí arb ionann iad agus níos mó ná 1/3 de na bailíochtóirí iomlána as líne nó má theipeann orthu fianuithe cearta a thíolacadh, ní féidir le sárthromlach 2/3 seicphointí a thabhairt chun críche. Ligeann an sceitheadh ​​​​neamhghníomhaíochta an geall a bhaineann leis na bailíochtóirí neamhghníomhacha síothlú de réir a chéile go dtí go rialaíonn siad níos lú ná 1/3 den sciar iomlán, rud a ligeann do na bailíochtóirí gníomhacha eile an slabhra a thabhairt chun críche. Is cuma cé chomh mór is atá an líon bailíochtóirí neamhghníomhacha, rialóidh na bailíochtóirí gníomhacha eile ar deireadh >2/3 den gheall. Is dreasacht láidir é an caillteanas gill do bhailíochtóirí neamhghníomhacha athghníomhú a luaithe is féidir má chailltear an Sciar! Thángthas ar chás sceite neamhghníomhaíochta ar líonra tástála Medalla nuair a bhí < 66% de bhailíochtóirí gníomhacha in ann teacht ar chomhdhearcadh maidir le ceann reatha an blocshlabhra. Cuireadh an sceitheadh ​​​​neamhghníomhaíochta i ngníomh agus fuarthas an chríochnúlacht arís ar deireadh!

Spreagann dearadh luaíochtaí, pionós agus slaiseála na meicníochta comhaontaithe bailíochtóirí aonair chun iad féin a iompar i gceart. Mar sin féin, tagann córas chun cinn ó na roghanna dearaidh seo a spreagann go láidir dáileadh cothrom na mbailíochtóirí thar ilchliant, agus ba cheart go ndídhreasódh sé ceannasacht cliant aonair go láidir.

## Tuilleadh léitheoireachta {#further-reading}

- [Uasghrádú Ethereum: An ciseal dreasachta](https://eth2book.info/altair/part2/incentives)
- [Dreasachtaí i bprótacal Casper hibrideach Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Sonra anótáilte Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Eth2 Leideanna um Slaiseáil a Chosc](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [EIP-7251 Mínithe: Iarmhéid Éifeachtach Uasta a Mhéadú Do Bhailíochtóirí](https://research.2077.xyz/eip-7251_Increase_MAX_EFFECTIVE_BALANCE)
- [Anailís ar phionóis sleaseála faoi EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Foinsí_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
