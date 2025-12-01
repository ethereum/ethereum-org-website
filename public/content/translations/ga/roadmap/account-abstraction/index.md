---
title: Asbhaint cuntais
description: Forbhreathnú ar phleananna Ethereum chun cuntais úsáideora a dhéanamh níos simplí agus níos sábháilte
lang: ga
summaryPoints:
  - Le hastarraingt cuntais bíonn sé i bhfad níos éasca sparáin chonartha cliste a thógáil
  - Le sparáin chonartha cliste bíonn sé i bhfad níos éasca rochtain ar chuntais Ethereum a bhainistiú
  - Is féidir eochracha caillte agus neamhchosanta a athshlánú trí úsáid a bhaint as cúltacaí iolracha
---

# Asbhaint cuntais {#account-abstraction}

Idirghníomhaíonn formhór na n-úsáideoirí reatha le Ethereum ag baint úsáide as **[cuntais sheachtracha (EOAs)](/glossary/#eoa)**. Cuireann sé seo teorainn leis an gcaoi a bhféadann úsáideoirí idirghníomhú le Ethereum. Mar shampla, bíonn sé deacair baisceanna idirbheart a dhéanamh agus éilíonn sé ar úsáideoirí iarmhéid ETH a choinneáil i gcónaí chun táillí idirbhirt a íoc.

Is bealach é astarraingt cuntais chun na fadhbanna seo a réiteach trí ligean d’úsáideoirí níos mó slándála agus eispéiris úsáideora níos fearr a ríomhchlárú go solúbtha ina gcuntais. Is féidir é seo a tharlú trí [EOAnna a uasghrádú](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) ionas gur féidir iad a rialú le conarthaí cliste. Tá cosán eile ann freisin a bhaineann le [dara córas idirbheart ar leithligh](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) a chur leis chun rith i gcomhthráth leis an bprótacal atá ann cheana féin. Beag beann ar an mbealach, is é an toradh rochtain ar Ethereum trí sparán conartha cliste, a bhfuil tacaíocht dhúchasach acu mar chuid den phrótacal atá ann cheana féin nó trí líonra idirbheart breise.

Díghlasálann sparán conartha cliste go leor buntáistí don úsáideoir, lena n-áirítear:

- do rialacha slándála solúbtha féin a shainiú
- do chuntas a aisghabháil má chailleann tú na heochracha
- do shlándáil chuntais a chomhroinnt thar ghléasanna iontaofa nó daoine aonair
- íoc as gás duine eile, nó a iarraidh ar dhuine eile do chuidse a íoc
- idirbhearta baisce le chéile (e.g., malartú a cheadú agus a fhorghníomhú in aon iarracht amháin)
- níos mó deiseanna d’fhorbróirí dapps agus sparán a bheith nuálach le heispéiris úsáideoirí

Ní thacaítear leis na sochair seo ó dhúchas inniu toisc nach féidir ach le cuntais faoi úinéireacht sheachtrach ([EOAs](/glossary/#eoa)) idirbhearta a thosú. Níl in EOAnna ach eochairphéirí poiblí-príobháideacha. Oibríonn siad mar seo:

- má tá an eochair phríobháideach agat is féidir leat _rud ar bith_ a dhéanamh laistigh de rialacha Meaisín Fíorúil Ethereum (EVM)
- mura bhfuil an eochair phríobháideach agat ní féidir leat _rud ar bith_ a dhéanamh.

Má chailleann tú d'eochracha ní féidir iad a aisghabháil, agus tugann eochracha goidte rochtain láithreach do na gadaithe ar gach ciste atá i gcuntas.

Is iad sparáin chonartha cliste an réiteach ar na fadhbanna seo, ach inniu tá siad deacair a ríomhchlárú mar sa deireadh, ní mór aon loighic a chuireann siad i bhfeidhm a aistriú go sraith idirbhearta EOA sular féidir le Ethereum iad a phróiseáil. Cuireann astarraingt cuntais ar chumas conarthaí cliste idirbhearta a thionscnamh iad féin, ionas gur féidir aon loighic is mian leis an úsáideoir a chur i bhfeidhm a chódú isteach sa sparán conartha cliste féin agus a fhorghníomhú ar Ethereum.

I ndeireadh na dála, feabhsaíonn astarraingt cuntais tacaíocht do sparán conartha cliste, rud a fhágann go bhfuil siad níos éasca le tógáil agus níos sábháilte le húsáid. Le hastarraingt cuntais, is féidir le húsáideoirí taitneamh a bhaint as gach buntáiste a bhaineann le Ethereum gan an teicneolaíocht bhunúsach a thuiscint.

## Thar frásaí síolta {#beyond-seed-phrases}

Déantar cuntais an lae inniu a urrú le heochracha príobháideacha a ríomhtar ó na frásaí síl. Is féidir le duine ar bith a bhfuil rochtain aige ar fhrása síl an eochair phríobháideach a chosnaíonn cuntas a aimsiú go héasca agus rochtain a fháil ar na sócmhainní go léir a chosnaíonn sé. Má chailltear eochair phríobháideach agus frása síl, ní bheidh rochtain ar na sócmhainní i gcónaí. Tá sé deacair na frásaí síl seo a dhaingniú, fiú d'úsáideoirí saineolacha, agus tá fioscaireacht frásaí síl ar cheann de na camscéimeanna is coitianta.

Réitíonn asbhaint cuntais é seo trí chonradh cliste a úsáid chun sócmhainní a shealbhú agus idirbhearta a údarú. Is féidir le conarthaí cliste loighic saincheaptha a áireamh atá oiriúnaithe le haghaidh slándála agus inúsáidteachta uasta. Úsáideann úsáideoirí eochracha príobháideacha fós chun rochtain a rialú, ach le bearta sábháilteachta feabhsaithe.

Mar shampla, is féidir eochracha cúltaca a chur le sparán, rud a chuireann ar chumas eochracha a athsholáthar má chuirtear an phríomheochair i mbaol. Is féidir gach eochair a dhaingniú ar bhealach difriúil nó a dháileadh i measc daoine iontaofa, rud a mhéadaíonn an tslándáil go suntasach. Is féidir le rialacha breise sparán damáiste ó nochtadh eochrach a mhaolú, amhail sínithe iolracha a cheangal le haghaidh idirbhearta ardluacha nó idirbhearta a shrianadh do sheoltaí iontaofa.

## Taithí úsáideora níos fearr {#better-user-experience}

Feabhsaíonn teibíocht chuntais taithí agus slándáil an úsáideora go mór trí thacaíocht a thabhairt do sparán conartha cliste ag leibhéal an phrótacail. Is féidir le forbróirí nuálaíocht a dhéanamh go saor, rud a fheabhsaíonn pacáil idirbheart le haghaidh luas agus éifeachtúlachta. Is féidir malartuithe simplí a dhéanamh ina n-oibríochtaí aon-cliceáil, rud a fheabhsaíonn éascaíocht úsáide go suntasach.

Feabhsaíonn bainistíocht gáis go mór. Is féidir le feidhmchláir táillí gáis úsáideoirí a íoc nó íocaíocht a cheadú i gcomharthaí seachas ETH, rud a chuireann deireadh leis an ngá atá le cothromaíocht ETH a choinneáil.

## Conas a chuirfear astarraingt cuntais i bhfeidhm? {#how-will-aa-be-implemented}

Faoi láthair, tá sé dúshlánach sparán conartha cliste a chur i bhfeidhm toisc go mbraitheann siad ar idirbhearta caighdeánacha fillte cód casta. Is féidir le Ethereum é seo a athrú trí cheadú do chonarthaí cliste idirbhearta a thionscnamh go díreach, loighic a leabú i gconarthaí cliste Ethereum seachas brath ar athsheoltóirí seachtracha.

### EIP-4337: Asbhaint cuntais gan athruithe prótacail

Cumasaíonn EIP-4337 tacaíocht do sparán dúchasach conartha cliste gan prótacal lárnach Ethereum a mhodhnú. Tugann sé isteach réada `UserOperation` a bhailítear i mbearta idirbheart ag bailíochtóirí, rud a shimplíonn forbairt sparán. Imscaradh an conradh EIP-4337 EntryPoint chuig Ethereum Príomhlíonra an 1ú Márta 2023 agus tá sé tar éis cruthú breis is 26 milliún sparán cliste agus 170 milliún Oibríocht Úsáideora a éascú.

## Dul chun cinn reatha {#current-progress}

Mar chuid d'uasghrádú Pectra Ethereum, tá EIP-7702 sceidealaithe don 7 Bealtaine, 2025. Glacadh go forleathan le EIP-4337, [le breis is 26 milliún cuntas cliste imscartha agus breis is 170 milliún Oibríocht Úsáideora próiseáilte](https://www.bundlebear.com/overview/all).

## Tuilleadh léitheoireachta {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Doiciméid EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Doiciméid EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Painéal uchtaithe ERC-4337](https://www.bundlebear.com/overview/all)
- ["An Bealach chun Teibí na gCuntas" le Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blag Vitalik ar sparán téarnaimh shóisialta](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Asbhaint Iontach Chuntais](https://github.com/4337Mafia/awesome-account-abstraction)
