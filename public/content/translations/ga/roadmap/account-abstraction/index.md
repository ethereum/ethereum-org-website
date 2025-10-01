---
title: Astarraingt cuntais
description: Forbhreathnú ar phleananna Ethereum chun cuntais úsáideora a dhéanamh níos simplí agus níos sábháilte
lang: ga
summaryPoints:
  - Le hastarraingt cuntais bíonn sé i bhfad níos éasca sparáin chonartha cliste a thógáil
  - Le sparáin chonartha cliste bíonn sé i bhfad níos éasca rochtain ar chuntais Ethereum a bhainistiú
  - Is féidir eochracha caillte agus neamhchosanta a athshlánú trí úsáid a bhaint as cúltacaí iolracha
---

# Astarraingt cuntais {#account-abstraction}

Idirghníomhaíonn úsáideoirí le Ethereum trí úsáid a bhaint as **[cuntais faoi úinéireacht sheachtrach (EOAs)](/glossary/#eoa)**. Is é seo an t-aon bhealach chun idirbheart a thosú nó conradh cliste a fhorghníomhú. Cuireann sé seo teorainn le conas is féidir le húsáideoirí idirghníomhú le Ethereum. Mar shampla, bíonn sé deacair baisceanna idirbheart a dhéanamh agus bíonn ar úsáideoirí iarmhéid ETH a choinneáil i gcónaí chun gás a chlúdach.

Is bealach é astarraingt cuntais chun na fadhbanna seo a réiteach trí ligean d’úsáideoirí níos mó slándála agus eispéiris úsáideora níos fearr a ríomhchlárú go solúbtha ina gcuntais. Féadfaidh sé seo tarlú trí [EOAs a uasghrádú](https://eips.ethereum.org/EIPS/eip-3074) ionas gur féidir iad a rialú trí chonarthaí cliste, nó trí [conarthaí cliste a uasghrádú](https://eips.ethereum.org/EIPS/eip-2938) ionas gur féidir leo idirbhearta a thionscnamh. Éilíonn an dá rogha seo athruithe ar phrótacal Ethereum. Tá an tríú cosán ann freisin a bhaineann le [dara córas idirbhirt ar leith](https://eips.ethereum.org/EIPS/eip-4337) a chur leis le rith ag an am céanna leis an bprótacal reatha. Beag beann ar an mbealach, bíonn rochtain ar Ethereum trí sparán conartha cliste dá thoradh, le tacaíocht dhúchasach mar chuid den phrótacal reatha nó trí líonra idirbheart breiseán.

Díghlasálann sparán conartha cliste go leor buntáistí don úsáideoir, lena n-áirítear:

- do rialacha slándála solúbtha féin a shainiú
- do chuntas a aisghabháil má chailleann tú na heochracha
- do shlándáil chuntais a chomhroinnt thar ghléasanna iontaofa nó daoine aonair
- íoc as gás duine eile, nó a iarraidh ar dhuine eile do chuidse a íoc
- idirbhearta a nascadh le chéile (m.sh. babhtáil a cheadú agus a dhéanamh in aon turas amháin)
- níos mó deiseanna d’fhorbróirí dapps agus sparán a bheith nuálach le heispéiris úsáideoirí

Ní thacaítear leis na sochair seo ó dhúchas inniu toisc nach féidir ach le cuntais faoi úinéireacht sheachtrach ([EOAs](/glossary/#eoa)) idirbhearta a thosú. Níl in EOAnna ach eochairphéirí poiblí-príobháideacha. Oibríonn siad mar seo:

- má tá an eochair phríobháideach agat is féidir leat _rud ar bith_ a dhéanamh laistigh de rialacha Meaisín Fíorúil Ethereum (EVM)
- mura bhfuil an eochair phríobháideach agat ní féidir leat _rud ar bith_ a dhéanamh.

Má chailleann tú d'eochracha ní féidir iad a aisghabháil, agus tugann eochracha goidte rochtain láithreach do na gadaithe ar gach ciste atá i gcuntas.

Is iad sparáin chonartha cliste an réiteach ar na fadhbanna seo, ach inniu tá siad deacair a ríomhchlárú mar sa deireadh, ní mór aon loighic a chuireann siad i bhfeidhm a aistriú go sraith idirbhearta EOA sular féidir le Ethereum iad a phróiseáil. Cuireann astarraingt cuntais ar chumas conarthaí cliste idirbhearta a thionscnamh iad féin, ionas gur féidir aon loighic is mian leis an úsáideoir a chur i bhfeidhm a chódú isteach sa sparán conartha cliste féin agus a fhorghníomhú ar Ethereum.

I ndeireadh na dála, feabhsaíonn astarraingt cuntais tacaíocht do sparán conartha cliste, rud a fhágann go bhfuil siad níos éasca le tógáil agus níos sábháilte le húsáid. Sa deireadh, le astarraingt cuntais, is féidir le húsáideoirí taitneamh a bhaint as na buntáistí go léir a bhaineann le Ethereum gan a bheith ar an eolas nó ag tabhairt aire don teicneolaíocht bhunúsach.

## Thar frásaí síolta {#beyond-seed-phrases}

Déantar cuntais an lae inniu a urrú le heochracha príobháideacha a ríomhtar ó na frásaí síl. Is féidir le haon duine a bhfuil rochtain aige ar fhrása síl an eochair phríobháideach a chosnaíonn cuntas a fháil amach go héasca agus rochtain a fháil ar na sócmhainní go léir a chosnaíonn sé. Má chailltear eochair phríobháideach agus frása síl, ní féidir iad a aisghabháil choíche agus reoitear go deo na sócmhainní a rialaíonn siad. Tá sé deacair na frásaí síolta seo a urrú, fiú d'úsáideoirí an-eolacha agus tá fioscaireacht frása síolta ar cheann de na bealaí is coitianta ina ndéantar scéiméireacht ar úsáideoirí.

Déanfaidh astarraingt cuntais an fhadhb seo a réiteach trí chonradh cliste a úsáid chun sócmhainní a shealbhú agus idirbhearta a údarú. Is féidir na conarthaí cliste seo a mhaisiú ansin le loighic saincheaptha chun iad a dhéanamh chomh slán agus chomh hoiriúnaithe don úsáideoir agus is féidir. I ndeireadh na dála, úsáideann tú eochracha príobháideacha fós le rochtain ar do chuntas a rialú, ach le líontáin sábhála a dhéanann níos éasca iad agus níos sábháilte le bainistiú.

Mar shampla, is féidir eochracha cúltaca a chur le sparán ionas gur féidir eochair nua, slán a chur ina ionad má chailleann tú nó má nochtann tú do phríomheochair trí thimpiste, le cead ó na heochracha cúltaca. D'fhéadfá gach ceann de na heochracha seo a dhaingniú ar bhealach difriúil, nó iad a roinnt ar chaomhnóirí iontaofa. Dá bharr sin bíonn sé i bhfad níos deacra ag gadaí smacht iomlán a fháil ar do chuid cistí. Mar an gcéanna, is féidir leat rialacha a chur leis an sparán chun an tionchar a laghdú má sháraítear do phríomheochair, mar shampla, d’fhéadfá idirbhearta ar luach íseal a cheadú le síniú amháin, ach ceadú ó shínitheoirí iolracha a éileamh chun idirbhearta de luach níos airde a dhéanamh. Tá bealaí eile ann inar féidir le sparán cliste conartha cabhrú leat bac a chur ar gadaithe freisin, mar shampla, is féidir liosta ceadaithe a úsáid chun gach idirbheart a bhlocáil mura bhfuil sé chuig seoladh iontaofa nó fíoraithe ag roinnt de na heochracha réamhcheadaithe atá agat.

### Samplaí de loighic slándála is féidir a chur isteach i sparán conartha cliste:

- **Údarú multisig**: Is féidir leat dintiúir údaraithe a roinnt ar an iliomad daoine nó gléasanna a bhfuil muinín agat astu. Ansin is féidir an conradh a chumrú ionas go mbeidh údarú ag teastáil ó chion áirithe (m.sh. 3/5) de na páirtithe iontaofa ar idirbhearta atá níos mó ná luach réamhshocraithe. Mar shampla, d’fhéadfadh go mbeadh formheas ó ghléas soghluaiste agus ó sparán crua-earraí araon ag teastáil le haghaidh idirbhearta ardluacha, nó sínithe ó chuntais atá dáilte ar bhaill teaghlaigh iontaofa.
- **Reo cuntais**: Má chailltear nó má thruaillítear gaireas é is féidir an cuntas a ghlasáil ó ghaireas údaraithe eile, rud a chosnaíonn sócmhainní an úsáideora.
- **Athghabháil cuntais**: Gaireas caillte nó pasfhocal dearmadta agat? Sa paraidím reatha, ciallaíonn sé seo go bhféadfaí do shócmhainní a reoite go deo. Le sparán conartha cliste, is féidir leat liosta ceadaithe cuntas a shocrú a fhéadfaidh gléasanna nua a údarú agus rochtain a athshocrú.
- **Socraigh teorainneacha idirbhirt**: Sonraigh tairseacha laethúla don mhéid luach is féidir a aistriú ón gcuntas i lá/seachtain/mí. Ciallaíonn sé seo má fhaigheann ionsaitheoir rochtain ar do chuntas ní féidir leo gach rud a dhraenáil láithreach agus tá deiseanna agat rochtain a reo agus a athshocrú.
- **Cruthaigh liostaí ceadaithe**: Ná lig ach idirbhearta chuig seoltaí áirithe a bhfuil a fhios agat a bheith sábháilte. Ciallaíonn sé seo _fiú má goideadh_ d'eochair phríobháideach, ní fhéadfadh an t-ionsaitheoir ach airgead a sheoladh chuig cuntais sprice ar do liosta. Bheadh ​​sínithe iolracha ag teastáil ó na liostaí ceadaithe seo chun iad a athrú ionas nach bhféadfadh ionsaitheoir a sheoladh féin a chur leis an liosta mura raibh rochtain aige ar roinnt de na heochracha cúltaca atá agat.

## Taithí úsáideora níos fearr {#better-user-experience}

Ceadaíonn astarraingt cuntais **eispéireas iomlán níos fearr don úsáideoir** chomh maith le **slándáil fheabhsaithe** toisc go gcuireann sé tacaíocht le sparán conartha cliste ag leibhéal an phrótacail. Is é an chúis is tábhachtaí leis seo ná go dtabharfaidh sé i bhfad níos mó saoirse d’fhorbróirí conarthaí cliste, sparán agus feidhmchlár a bheith nuálach maidir le heispéireas an úsáideora ar bhealaí nach mbeimid in ann a réamh-mheas go fóill. I measc roinnt feabhsuithe soiléire a thiocfaidh chomh maith le hastarraingt cuntas tá beartú na n-idirbheart ar mhaithe le luas agus éifeachtúlacht. Mar shampla, ba cheart go mbeadh babhtáil shimplí ina oibríocht aon-chliceála, ach sa lá atá inniu ann éilíonn sé idirbhearta iolracha a shíniú chun caitheamh comharthaí aonair a cheadú sula ndéantar an bhabhtáil. Baineann astarraingt cuntais an frithchuimilt sin amach trí bheartú idirbheart a cheadú. Ina theannta sin, d’fhéadfadh an t-idirbheart cuachta luach ceart na n-airíonna a theastaíonn do gach idirbheart a cheadú go beacht agus ansin na formheasanna a chúlghairm tar éis don idirbheart a bheith críochnaithe, ag soláthar urrús breise.

Tá feabhas mór tagtha ar bhainistíocht an gháis freisin le hastarraingt cuntais. Ní hamháin gur féidir le hiarratais táillí gáis a n-úsáideoirí a thairiscint, ach is féidir táillí gáis a íoc mar chomharthaí seachas ETH, rud a fhágann nach mór d’úsáideoirí iarmhéid ETH a choinneáil le haghaidh idirbhearta maoinithe. D'oibreodh sé seo trí chomharthaí an úsáideora a mhalartú le haghaidh ETH taobh istigh den chonradh agus ansin an ETH a úsáid chun íoc as gás.

<ExpandableCard title="Conas is féidir le astarraingt cuntais cuidiú le gás?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Tá bainistíocht gháis ar cheann de na príomh-fhritíochtaí d'úsáideoirí Ethereum, go príomha toisc gurb é ETH an t-aon sócmhainn is féidir a úsáid chun íoc as idirbhearta. Samhlaigh go bhfuil sparán agat le hiarmhéid USDC, ach gan aon ETH. Ní féidir leat na comharthaí USDC sin a bhogadh ná a mhalartú toisc nach féidir leat gás a íoc. Ní féidir leat an USDC a mhalartú le haghaidh ETH ach an oiread, toisc go gcosnaíonn sé sin gás ann féin. Bheadh ​​ort níos mó ETH a sheoladh chuig do chuntas ó mhalartán nó ó sheoladh eile chun an fhadhb a réiteach. Le sparán conartha cliste, ní gá duit ach gás a íoc in USDC ina ionad sin, ag saoráil do chuntas. Ní gá duit iarmhéid ETH a choinneáil i do chuntais go léir a thuilleadh.

Ligeann astarraingt cuntais freisin d’fhorbróirí dapp a bheith cruthaitheach le bainistíocht gáis. Mar shampla, b'fhéidir go mbeifeá in ann tús a chur le táille sheasta a íoc leis an DEX is fearr leat gach mí le haghaidh idirbhearta neamhtheoranta. Seans go dtairgfidh Dapps do tháillí gáis go léir a íoc ar do shon mar luaíocht as a n-ardán a úsáid, nó mar thairiscint bordála. Beidh sé i bhfad níos éasca d'fhorbróirí nuálaíocht a dhéanamh ar ghás nuair a thacaítear le sparán conartha cliste ag leibhéal an phrótacail.

</ExpandableCard>

D’fhéadfadh seisiúin iontaofa a bheith claochlaitheach freisin d’eispéiris úsáideoirí, go háirithe d’fheidhmchláir mar chluichíocht, áit a bhféadfadh go mbeadh faomhadh ag teastáil ó líon mór idirbhearta beaga i mbeagán ama. Dá ndéanfaí gach idirbheart a fhaomhadh ina n-aonar bhrisfí an t-eispéireas cluichíochta, ach níl faomhadh buan sábháilte. D’fhéadfadh sparán conartha cliste idirbhearta áirithe a fhaomhadh ar feadh tréimhse socraithe, suas le luach sonrach nó díreach chuig seoltaí áirithe.

Tá sé suimiúil freisin a mheas conas a d’fhéadfadh ceannacháin athrú le hastarraingt cuntais. Sa lá atá inniu ann, ní mór gach idirbheart a fhaomhadh agus a fhorghníomhú ó sparán atá réamh-mhaoinithe le méid leordhóthanach den chomhartha ceart. Le astarraingt cuntais, d'fhéadfadh an taithí a bheith níos mó cosúil le gnáth-shiopadóireacht ar líne mar a dhéanfadh úsáideoir "ciseán" a líonadh le míreanna agus cliceáil uair amháin chun iad a cheannach ag an am céanna, agus an loighic ar fad a theastaíonn á láimhseáil ag an gconradh, ní ag an úsáideoir.

Níl iontu seo ach roinnt samplaí den chaoi a bhféadfaí eispéiris úsáideoirí a chothromú trí astarraingt cuntais, ach beidh go leor eile ann nach bhfuil samhlaithe againn go fóill. Saorann astarraingt cuntais forbróirí ó shrianta EOAnna an lae inniu, ligeann sé dóibh gnéithe maithe Web2 a thabhairt isteach i Web3 gan féin-choimeád a íobairt, agus haiceáil chruthaitheach a dhéanamh ar eispéiris airgtheacha nua úsáideoirí.

## Conas a chuirfear astarraingt cuntais i bhfeidhm? {#how-will-aa-be-implemented}

Tá sparán conartha cliste ann inniu ach tá siad dúshlánach a chur i bhfeidhm toisc nach dtacaíonn an EVM leo. Ina áit sin, bíonn siad ag brath ar chód sách casta a thimfhilleadh ar idirbhearta caighdeánacha Ethereum. Ethereum can change this by allowing smart contracts to initiate transactions, handling the necessary logic in Ethereum smart contracts instead of offchain. Má chuirtear an loighic i gconarthaí cliste, méadaítear dílárú Ethereum freisin ós rud é go mbainfidh sé an gá atá le "athsheoltóirí" arna reáchtáil ag forbróirí sparán chun teachtaireachtaí sínithe ag an úsáideoir a aistriú chuig idirbhearta rialta Ethereum.

<ExpandableCard title="EIP-2771: astarraingt cuntais ag baint úsáide as meitea-idirbhearta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

Tugann EIP-2771 isteach coincheap na meitea-idirbhearta a ligeann do thríú páirtithe íoc as costais gháis úsáideora gan athruithe a dhéanamh ar phrótacal Ethereum. Is é an smaoineamh go seolfar idirbhearta sínithe ag úsáideoir chuig conradh `Athsheoltóra`. Is aonán iontaofa é an t-athsheoltóir a fhíoraíonn go bhfuil idirbhearta bailí sula gcuirtear ar aghaidh chuig athsheachadán gáis iad. This is done offchain, avoiding the need to pay gas. Cuireann an sealaíocht gáis an t-idirbheart ar aghaidh chuig conradh `Faighteora`, ag íoc an gháis is gá chun an t-idirbheart a dhéanamh inrite ar Ethereum. Cuirtear an t-idirbheart i gcrích má tá aithne ag an bh'Faighteoir' ar an `Athsheoltóir` agus muinín aige as. Leis an tsamhail seo bíonn sé éasca d'fhorbróirí idirbhearta gan ghás a chur i bhfeidhm d'úsáideoirí.

</ExpandableCard>

<ExpandableCard title="EIP-4337: astarraingt cuntais gan prótacal Ethereum a athrú" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

Is é EIP-4337 an chéad chéim i dtreo tacaíocht a thabhairt do sparán conartha cliste dúchais ar bhealach díláraithe <em>gan athruithe ar phrótacal Ethereum</em> a éileamh. In ionad an ciseal comhthola a mhodhnú chun tacú le sparán conartha cliste, cuirtear córas nua ar leithligh leis an ngnáthphrótacal béadáin idirbhearta. Tá an córas ardleibhéil seo bunaithe ar réad nua ar a dtugtar <code>UserOperation</code> lena ndéantar gníomhartha ó úsáideoir a phacáistiú in éineacht leis na sínithe ábhartha. Craoltar na réada <code>UserOperation</code> seo ansin isteach i mempool tiomnaithe inar féidir le bailíochtóirí iad a bhailiú in “idirbheart cuachta”. Léiríonn an t-idirbheart cuachta seicheamh de mhórán <code>Oibríochtaí Úsáideora</code> aonair agus is féidir é a áireamh i mbloic Ethereum díreach cosúil le gnáth-idirbheart, agus d'fhéadfadh bailíochtóirí é a phiocadh suas ag baint úsáide as samhail roghnaithe chomhchosúil a uasmhéadaíonn táillí.

D’athródh an dóigh a n-oibreodh sparán freisin faoi EIP-4337. Seachas loighic chosanta choiteann ach casta a ath-fhorfheidhmiú, bheadh na feidhmeanna sin á ndéanamh ag conradh sparán domhanda ar a dtugtar an &quot;pointe iontrála&quot;. Láimhseálfadh sé seo oibríochtaí cosúil le táillí a íoc agus cód EVM a fhorghníomhú ionas gur féidir le forbróirí sparán díriú ar thaithí úsáideora den scoth a sholáthar.

<strong>Tabhair do d'aire</strong> rinneadh an conradh pointe iontrála EIP 4337 a imscaradh chuig Ethereum Mainnet ar 1ú Márta 2023. Is féidir leat an conradh a fheiceáil ar <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: prótacal Ethereum a athrú chun tacú le hastarraingt cuntas" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

Tá sé mar aidhm ag <a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> prótacal Ethereum a nuashonrú trí chineál nua idirbhirt a thabhairt isteach, <code>AA_TX_TYPE</code> a chuimsíonn trí réimse: <code>nonce</code>, <code>sprioc</code> agus <code>sonraí</code>, nuair is cuntar idirbheartaíochta é <code>nonce</code>, nuair is é<code>sprioc an seoladh pointe iontrála conartha </code> agus nuair is beartchód EVM é <code>sonraí</code>. Chun na hidirbhearta seo a rith, ní mór dhá threoir nua (ar a dtugtar opcodes) a chur leis an EVM: <code>NONCE</code> agus <code>PAYGAS</code>. Rianaíonn an opchód <code>NONCE</code> seicheamh an idirbhirt agus déanann <code>PAYGAS</code> an gás a theastaíonn chun an t-idirbheart a rith a ríomh agus a aistarraingt ó iarmhéid an chonartha. Ligeann na gnéithe nua seo do Ethereum tacaíocht a thabhairt do sparán cliste conartha ó dhúchas mar go bhfuil an bonneagar riachtanach ionsuite i bprótacal Ethereum.

Tabhair faoi deara nach bhfuil EIP-2938 gníomhach faoi láthair. Tá an pobal i bhfabhar EIP-4337 faoi láthair toisc nach dteastaíonn athruithe ar an bprótacal uaidh.

</ExpandableCard>

<ExpandableCard title="EIP-3074: cuntais faoi úinéireacht sheachtrach a uasghrádú le haghaidh astarraingt chuntais" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

Tá sé mar aidhm ag <a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> cuntais faoi úinéireacht sheachtrach Ethereum a nuashonrú trí ligean dóibh rialú a tharmligean chuig córas cliste conradh. Ciallaíonn sé seo go bhféadfadh loighic conartha chliste idirbhearta de thionscnamh EOA a cheadú. Cheadódh sé sin gnéithe cosúil le hidirbhearta gás-urraithe agus baisceanna. Ionas go n-oibreoidh sé seo, ní mór dhá opchód nua a chur leis an EVM: <code>AUTH</code> agus <code>AUTHCALL</code>. Le EIP-3074 cuirtear na buntáistí a bhaineann le sparán conartha cliste ar fáil <em>gan conradh a bheith ag teastáil</em> - ina ionad sin, láimhseálann cineál sonrach conartha gan stát, gan iontaobhas, neamh-uasghrádaithe ar a dtugtar "agairt" na hidirbhearta.

Tabhair faoi deara nach bhfuil EIP-3074 gníomhach faoi láthair. Tá an pobal i bhfabhar EIP-4337 faoi láthair toisc nach dteastaíonn athruithe ar an bprótacal uaidh.

</ExpandableCard>

## Dul chun cinn reatha {#current-progress}

Tá sparáin chonartha cliste ar fáil cheana féin, ach tá gá le tuilleadh uasghráduithe chun iad a dhéanamh chomh díláraithe agus gan chead agus is féidir. Is togra aibí é EIP-4337 nach n-éilíonn aon athruithe ar phrótacal Ethereum, agus mar sin is féidir go bhféadfaí é seo a chur i bhfeidhm go tapa. Mar sin féin, níl forbhairt ghníomhach á dhéanamh ar uasghráduithe a athraíonn prótacal Ethereum faoi láthair, agus mar sin b'fhéidir go dtógfaidh sé i bhfad níos faide na hathruithe sin a sheoladh. Is féidir freisin go bhfuil astarraingt cuntais bainte amach sách maith ag EIP-4337 nach dteastaíonn aon athruithe prótacail riamh.

**Note**: You can track adoption of ERC-4337 smart contract wallets [via this dashboard](https://www.bundlebear.com/overview/all).

## Tuilleadh léitheoireachta {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Plé painéil astarraingt Cuntas ó Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Cén fáth gur athchasadh do dapps é astarraingt cuntais" ó Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Astarraingt cuntais ELI5" ó Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Nótaí Vitalik faoi "Bóthar chuig Astarraingt Cuntais"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Postbhlag Vitalik ar sparán téarnaimh shóisialta](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [EIP-2938 nótaí](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Doiciméid EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 nótaí](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Doiciméid EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Doiciméid EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Bunús an Astarraingt Chuntas" -- Cad is Astarraingt Cuntais ann Cuid I](https://www.alchemy.com/blog/account-abstraction)
- [Charting Ethereum's Account Abstraction Roadmap I: EIP-3074, EIP-5806, & EIP-7702](https://research.2077.xyz/charting-ethereums-account-abstraction-roadmap-eip-3074-eip-5806-eip-7702)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
- [Modular Account Abstraction for Everyone Else](https://blog.rhinestone.wtf/part-1-modular-account-abstraction-for-everyone-else-84567422bc46)

