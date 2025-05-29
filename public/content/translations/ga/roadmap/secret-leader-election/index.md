---
title: Toghchán rúnda ceannaire
description: Míniú ar conas is féidir le toghchán rúnda ceannaire cabhrú le bailíochtóirí a chosaint ar ionsaithe
lang: ga
summaryPoints:
  - Is féidir seoladh IP na moltóirí bloc a bheith ar eolas roimh ré, rud a fhágann iad i mbaol ó ionsaithe
  - Cuireann toghchán rúnda ceannaire céannacht na mbailitheoirí i bhfolach ionas nach mbíonn siad ar an eolas roimh ré
  - Is síneadh ar an smaoineamh seo roghnú randamach a dhéanamh ar bailíochtóirí i ngach sliotán.
---

# Toghchán rúnda ceannaire {#single-secret-leader-election}

Sa mheicníocht chomhaontaithe atá bunaithe ar [cruthúnas gill](/developers/docs/consensus-mechanisms/pos) an lae inniu, tá liosta na moltóirí bloc atá le teacht poiblí agus is féidir a seoltaí IP a mhapáil. Ciallaíonn sé seo go bhféadfadh ionsaitheoirí a aithint cé na bailíochtóirí atá ar tí bloc a mholadh agus díriú orthu le hionsaí diúltaithe seirbhíse (DOS) a fhágann nach féidir leo a mbloc a mholadh in am.

D’fhéadfadh sé seo deiseanna a chruthú d’ionsaitheoir le brabús a dhéanamh. Mar shampla d'fhéadfadh moltóir bloc atá roghnaithe do shliot án `n+1` ionsaí  DOS a dhéanamh ar an moltóir i sliotán `n` ionas go gcaillfidh siad an deis chun bloc a mholadh. Cheadódh sé seo don mholtóir bloc atá ag ionsaí MEV an dá shliotán a bhaint as, nó na hidirbhearta go léir ar chóir a bheith roinnte thar dhá bhloc a ghabháil agus ina ionad sin iad go léir a áireamh i gceann amháin, agus na táillí gaolmhara go léir a ghnóthú. Is dócha go gcuirfidh sé seo isteach ar bhailíochtóirí baile níos mó ná ar bhailíochtóirí institiúideacha sofaisticiúla ar féidir leo modhanna níos forbartha a úsáid chun iad féin a chosaint ar ionsaithe DOS, agus d'fhéadfadh sé a bheith ina fhórsa láraithe mar sin.

Tá réitigh éagsúla ar an bhfadhb seo. Ceann acu is ea [Teicneolaíocht Dáilte Bailíochtóra](https://github.com/ethereum/distributed-validator-specs) a bhfuil sé mar aidhm aige na tascanna éagsúla a bhaineann le bailíochtóir a rith thar ilinnill, le hiomarcaíocht, a scaipeadh. ionas go mbeidh sé i bhfad níos deacra d'ionsaitheoir bloc a chosc ó bheith molta i sliotán ar leith. Is é an réiteach is láidre, áfach, ná **Toghchán Rúnda Ceannaire Aonair (SSLE)**.

## Toghchán ceannaire rúnda aonair {#secret-leader-election}

In SSLE, baintear úsáid as cripteagrafaíocht chliste le cinntiú nach bhfuil a fhios ach ag an mbailíochtóir roghnaithe go bhfuil siad roghnaithe. Oibríonn sé seo trí iarraidh ar gach bailíochtóir tiomantas a thabhairt do rún atá comhroinnte acu go léir. Déantar na tiomantais a athrú agus a athchumrú ionas nach féidir le duine ar bith tiomantais a mhapáil do bhailíochtóirí ach go mbíonn a fhios ag gach bailíochtóir cén tiomantas a bhaineann leo. Ansin, roghnaítear tiomantas amháin go randamach. Má bhraitheann bailíochtóir gur roghnaíodh a thiomantas, tá a fhios aige gurb é a sheal é bloc a mholadh.

Tugtar [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) ar phríomhfheidhmiú an smaoinimh seo. A oibríonn mar seo a leanas:

1. Bíonn bailíochtaithe tiomanta do rún comhroinnte. Tá an scéim tiomantais deartha ionas gur féidir í a cheangal le haitheantas bailíochtóra ach tá sí randamach freisin ionas nach mbeidh aon tríú páirtí in ann an ceangaltán a fhreaschur agus tiomantas sonrach a nascadh le bailíochtóir ar leith.
2. Ag tús aga, roghnaítear tacar randamach bailíochtaithe chun tiomantais ó 16,384 bailíochtóir a shamplú, ag baint úsáide as RANDAO.
3. Maidir leis na 8182 sliotán eile (1 lá), déanann na moltóirí bloc a shuaitheadh agus randamú ar fho-thacar de na tiomantais ag baint úsáide as a n-eantrópacht phríobháideach féin.
4. Tar éis don suaitheadh a bheith críochnaithe, úsáidtear RANDAO chun liosta ordaithe de na tiomantais a chruthú. Tá an liosta seo mapáilte ar shliotáin Ethereum.
5. Feiceann bailíochtóirí go bhfuil a dtiomantas ceangailte le sliotán ar leith, agus nuair a thagann an sliotán sin molann siad bloc.
6. Déan na céimeanna seo arís ionas go mbeidh sannadh na dtiomantas do shliotáin i bhfad chun tosaigh i gcónaí ar an sliotán reatha.

Cuireann sé seo cosc ​​ar ionsaitheoirí a bheith ar an eolas roimh ré cén bailíochtóir ar leith a mholfaidh an chéad bhloc eile, rud a chuireann cosc ​​ar chumas ionsaithe DOS.

## Toghchán rúnda ceannaire neamh-singil (SnSLE) {#secret-non-single-leader-election}

Tá togra ar leith ann freisin a bhfuil sé mar aidhm aige cás a chruthú ina mbeidh seans randamach ag gach bailíochtóir bloc a mholadh i ngach sliotán, ar an gcaoi chéanna leis an gcaoi a socraíodh bloc-togra faoi chruthúnas oibre, ar a dtugtar **toghchán rúnda neamh-aonair do cheannaire (SnSLE)**. Bealach simplí amháin chun é seo a dhéanamh ná úsáid a bhaint as an bhfeidhm RANDAO a úsáidtear chun bailíochtóirí a roghnú go randamach i bprótacal an lae inniu. Is é an smaoineamh le RANDAO ná go ngintear uimhir randamach go leor trí haiseanna a chuireann go leor bailíochtóirí neamhspleácha isteach a mheascadh. In SnSLE, d’fhéadfaí na haiseanna seo a úsáid chun an chéad mholtóir bloc eile a roghnú, mar shampla tríd an haiseanna den luach is ísle a roghnú. D'fhéadfaí srian a chur ar raon na haiseanna bailí chun an dóchúlacht go roghnófaí bailíochtóirí aonair i ngach sliotán a choigeartú. Má dhearbhaítear go gcaithfidh an hais a bheith níos lú ná `2^256 * 5 / N` áit a bhfuil `N` = líon na mbailíochtóirí gníomhacha, bheadh ​​seans ann go roghnófaí aon bhailíochtóir aonair i ngach sliotán cothrom le `5/N`. Sa sampla seo, bheadh ​​seans 99.3% ann go nginfeadh tairgeoir amháin ar a laghad hais bailí i ngach sliotán.

## Dul chun cinn reatha {#current-progress}

Tá SSLE agus SnSLE araon sa chéim taighde. Níl aon sonraíocht críochnaithe le haghaidh ceachtar den dá smaoineamh go fóill. Is tograí iomaíocha iad SSLE agus SnSLE agus ní féidir an dá cheann a chur i bhfeidhm. Sula gcuirtear ar aghaidh iad, teastaíonn níos mó taighde agus forbartha uathu, mar aon le fréamhshamhaltú agus cur chun feidhme ar líonraí tástála poiblí.

## Tuilleadh léitheoireachta {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
