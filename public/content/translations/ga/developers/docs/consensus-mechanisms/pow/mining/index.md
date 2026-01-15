---
title: Mianadóireacht
description: Míniú ar conas a d'oibrigh mianadóireachta ar Ethereum.
lang: ga
---

<Alert variant="update">
<AlertEmoji text=":wave:" />
<AlertContent>
<AlertDescription>
Níl cruthúnas-oibre mar bhunús le meicníocht chomhdhearcaidh Ethereum a thuilleadh, rud a chiallaíonn go bhfuil an mhianadóireacht múchta. Ina áit sin, tá Ethereum urraithe ag bailíochtóirí a bhfuil ETH i ngeall acu. Is féidir leat tosú ag geallchur do chuid ETH inniu. Léigh tuilleadh ar <a href='/roadmap/merge/'>An Cumasc</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>cruthúnas-gill</a>, agus <a href='/staking/'>geallchur</a>. Leathanach le spéis stairiúil é seo.
</AlertDescription>
</AlertContent>
</Alert>

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar [idirbhearta](/developers/docs/transactions/) ar dtús, [bloic](/developers/docs/blocks/) a> agus [cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/).

## Cad é mianadóireacht Ethereum? {#what-is-ethereum-mining}

Is éard atá i gceist le mianadóireacht ná an próiseas a bhaineann le bloc idirbheart a chruthú atá le cur leis an blocshlabhra Ethereum in ailtireacht cruthúnas-oibre Ethereum nach bhfuil réamhmheasta anois.

Eascraíonn an focal mianadóireacht i gcomhthéacs an analaí óir do criptea-airgeadraí. Tá ór nó miotail lómhara gann, agus comharthaí digiteacha freisin, agus is é an t-aon bhealach é chun an méid iomlán i gcóras cruthúnas-oibre a mhéadú trí mhianadóireacht. I Ethereum cruthúnais-oibre, ba í an mhianadóireacht an t-aon mhodh eisiúna. Murab ionann agus ór nó miotail lómhara, áfach, ba é mianadóireacht Ethereum an bealach chun an líonra a dhaingniú trí bhlocanna a chruthú, a fhíorú, a fhoilsiú agus a iomadú sa blocshlabhra.

Mianadóireacht Éitir = An Líonra a Dhaingniú

Is é an mhianadóireacht croí aon blocshlabhra cruthúnas-oibre. D'úsáid mianadóirí Ethereum - ríomhairí a bhí ag rith bogearraí - a gcuid ama agus a gcumhacht ríomha chun idirbhearta a phróiseáil agus bloic a tháirgeadh roimh an aistriú chuig cruthúnas-oibre.

## Cén fáth a bhfuil mianadóirí ann? {#why-do-miners-exist}

I gcórais díláraithe cosúil le Ethereum, ní mór dúinn a chinntiú go n-aontaíonn gach duine ar ord na n-idirbheart. Chuidigh na mianadóirí leis seo trí thomhais a bhí deacair go ríomhaireachtúil a réiteach chun bloic a tháirgeadh, chun an líonra a dhaingniú ó ionsaithe.

[Tuilleadh faoi chruthúnas-oibre](/developers/docs/consensus-mechanisms/pow/)

Bhí duine ar bith roimhe seo in ann mianadóireacht a dhéanamh ar líonra Ethereum le ríomhaire. Mar sin féin, ní fhéadfadh gach duine éitear (ETH) a mhianadóireacht go brabúsach. I bhformhór na gcásanna, bhí ar na mianadóirí crua-earraí tiomnaithe ríomhaireachta a cheannach, agus rochtain a bheith acu ar fhoinsí fuinnimh neamhchostasach. Ní dócha go dtuillfeadh an gnáthríomhaire go leor luach saothair bloc chun na costais ghaolmhara a bhaineann le mianadóireacht a chlúdach.

### Costas na mianadóireachta {#cost-of-mining}

- Costais fhéideartha na gcrua-earraí is gá chun rige mianadóireachta a thógáil agus a chothabháil
- Costas leictreach an rige mianadóireachta a thiomáint
- Má bhí tú ag mianadóireacht i linn, is gnách go ngearrann na linnte seo táille chomhréidh % de gach bloc a ghineann an linn
- Costas féideartha trealaimh chun tacú le rige mianadóireachta (aeráil, monatóireacht fuinnimh, sreangú leictreach, etc.)

Chun brabúsacht mhianadóireachta a iniúchadh tuilleadh, bain úsáid as áireamhán mianadóireachta, mar an ceann a sholáthraíonn [Etherscan](https://etherscan.io/ether-mining-calculator).

## Conas a rinneadh mianadóireacht ar idirbhearta Ethereum {#how-ethereum-transactions-were-mined}

Tugann an méid seo a leanas forbhreathnú ar an gcaoi a ndearnadh idirbhearta a bhaint amach i gcruthúnas-oibre Ethereum. Is féidir cur síos analógach ar an bpróiseas seo do cruthúnas-gill Ethereum a fháil [anseo](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Scríobhann agus síníonn úsáideoir iarratas [idirbheart](/developers/docs/transactions/) le heochair phríobháideach [chuntais](/developers/docs/accounts/) éigin.
2. Craolann an t-úsáideoir an t-iarratas idirbheart chuig líonra iomlán Ethereum ó roinnt [nód](/developers/docs/nodes-and-clients/).
3. Nuair a chloiseann siad faoin iarratas ar idirbheart nua, cuireann gach nód i líonra Ethereum an t-iarratas chuig a mempool áitiúil, liosta de na hiarratais uile ar idirbhirt a chuala siad faoi nach bhfuil geallta fós don blocshlabhra i mbloc.
4. Ag pointe éigin, comhiomlánaíonn nód mianadóireachta roinnt dosaen nó céadta iarratas idirbhirt ina [mbloc](/developers/docs/blocks/) féideartha, ar bhealach a uasmhéadaíonn an [táillí idirbhirt](/developers/docs/gas/) a thuilleann siad fad a fhanann siad faoin teorainn bhlocgháis. Déanann an nód mianadóireachta ansin:
   1. Fíoraíonn sé bailíocht gach iarratas idirbhirt (i.e., níl aon duine ag iarraidh éitear a aistriú amach as cuntas nár tháirg siad síniú dó, níl an t-iarratas míchumtha, etc.), agus ansin déanann sé cód an iarratais a fhorghníomhú, ag athrú an staid a gcóip áitiúil den EVM. Bronnann an mianadóir táille idirbhirt gach iarratas idirbhirt dá leithéid ar a chuntas féin.
   2. Cuirtear tús leis an bpróiseas chun an “deimhniú dlisteanachta” cruthúnas-oibre a tháirgeadh don bhloc féideartha, a luaithe a bheidh gach iarratas idirbhirt sa bhloc fíoraithe agus curtha i gcrích ar an gcóip EVM áitiúil.
5. Faoi dheireadh, críochnóidh mianadóir deimhniú a tháirgeadh le haghaidh bloc a chuimsíonn ár n-iarratas idirbhirt sonrach. Ansin craolann an mianadóir an bloc críochnaithe, lena n-áirítear an deimhniú agus seic ar an stát EVM nua a éilítear.
6. Cluineann nóid eile faoin mbloc nua. Deimhníonn siad an deimhniú, déanann siad gach idirbheart ar an mbloc iad féin (lena n-áirítear an t-idirbheart a chraol ár n-úsáideoir ar dtús), agus deimhníonn siad go bhfuil suim sheiceála a staid EVM nua tar éis na hidirbhearta go léir a chur i gcrích ag teacht le suim sheiceála na staide arna éileamh ag bloc an mhianadóir. Is ansin amháin a dhéanann na nóid seo an bloc seo a cheangal le heireaball a mblocshlabhra, agus glacadh leis an staid EVM nua mar an staid chanónach.
7. Baineann gach nód gach idirbheart sa bhloc nua óna mempool áitiúil d’iarratais idirbheart nár comhlíonadh.
8. Íoslódálann nóid nua a iontrálann an líonra na bloic go léir in ord, lena n-áirítear an bloc ina bhfuil ár n-idirbheart leasa. Túsaíonn siad cóip EVM áitiúil (a thosaíonn mar EVM stát bán), agus ansin téann siad tríd an bpróiseas chun gach idirbheart a dhéanamh i ngach bloc ar bharr a gcóip EVM áitiúil, ag fíorú seiceálacha staide ag gach bloc feadh na slí.

Déantar gach idirbheart a chinneadh (áirithe i mbloc nua agus iomadaithe den chéad uair) uair amháin, ach déantar é a rith agus a fhíorú ag gach rannpháirtí sa phróiseas chun an staid chanónach EVM a chur chun cinn. Aibhsíonn sé seo ceann de mhantraí lárnacha an bhlocshlabhra: **Ná cuir muinín, fíoraigh**.

## Bloic ommer (uncail) {#ommer-blocks}

Bhí mianadóireacht bloc ar cruthúnas-oibre dóchúlaíoch, rud a chiallaíonn uaireanta gur foilsíodh dhá bhloc bhailí go comhuaineach mar gheall ar aga folaigh líonra. Sa chás seo, bhí ar an bprótacal an slabhra is faide (agus dá bhrí sin is "bailí") a chinneadh agus cothroime i dtreo na mianadóirí a chinntiú trí luach saothair a thabhairt don bhloc bailí neamháirithe atá beartaithe. Spreag sé seo dílárú breise ar an líonra mar go bhféadfadh mianadóirí níos lú, a d’fhéadfadh a bheith níos foighní, tuairisceáin a ghiniúint trí luach saothair bloc[ommer](/glossary/#ommer).

Is é an téarma "ommer" an téarma is fearr inscne-neodrach le haghaidh deartháir nó deirfiúr bloc tuismitheora, ach uaireanta tugtar "uncail" air seo freisin. **Ó aistriú Ethereum chuig cruthúnais-gill, ní bhaintear bloic ommer a thuilleadh** toisc nach dtoghtar ach moltóir amháin i ngach sliotán. Is féidir leat an t-athrú seo a fheiceáil ach féachaint ar [chairt stairiúil](https://ycharts.com/indicators/ethereum_uncle_rate) de na bloic ommer a ndearnadh mianadóireacht orthu.

## Léiriú físe {#a-visual-demo}

Lig d'Austin tú a threorú tríd an mhianadóireacht agus an blocshlabhra cruthúnas-oibre.

<YouTube id="zcX7OJ-L8XQ" />

## An t-algartam mianadóireachta {#mining-algorithm}

Níor úsáid Ethereum Mainnet ach algartam mianadóireachta amháin riamh - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Tháinig Ethash i gcomharbacht ar bhunalgartam T&F ar a dtugtar ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Tuilleadh faoi algartaim mhianadóireachta](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Ábhair ghaolmhara {#related-topics}

- [Gás](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Cruthúnas-ar-obair](/developers/docs/consensus-mechanisms/pow/)
