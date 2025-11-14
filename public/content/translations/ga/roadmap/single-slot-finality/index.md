---
title: Críochnaitheacht sliotán aonair
description: Míniú ar chríochnúlacht sliotán aonair
lang: ga
---

# Críochnaitheacht sliotán aonair {#single-slot-finality}

Tógann sé thart ar 15 nóiméad bloc Ethereum a thabhairt chun críche. Mar sin féin, is féidir linn meicníocht chomhthola Ethereum a dhéanamh chun bloic a bhailíochtú ar bhealach níos éifeachtaí agus laghdú suntasach a dhéanamh ar am go deireadh. In ionad fanacht cúig nóiméad déag, d'fhéadfaí na bloic a mholadh agus a thabhairt chun críche sa sliotán céanna. **críochnaitheacht sliotán aonair (SSF)** a thugtar ar an gcoincheap seo.

## Cad is críochnúlacht? {#what-is-finality}

I meicníocht chomhthola bunaithe ar chruthúnas Ethereum, tagraíonn críochnaitheacht don ráthaíocht nach féidir bloc a athrú nó a bhaint as an mblocshlabhra gan ar a laghad 33% den ETH iomlán atá i gceist a dhó. Is slándáil ‘cripti-eacnamaíoch’ é seo toisc go dtagann muinín as an gcostas fíor-ard a bhaineann le hordú nó ábhar an tslabhra a athrú a chuirfeadh cosc ​​ar aon ghníomhaí eacnamaíoch réasúnach triail a bhaint as.

## Cén fáth díriú ar chríochnúlacht níos tapúla? {#why-aim-for-quicker-finality}

Tarlaíonn sé go bhfuil an t-am reatha chun deiridh ró-fhada. Ní mian leis an chuid is mó d’úsáideoirí fanacht 15 nóiméad le haghaidh críochnaitheacht, agus tá sé míchaoithiúil go mbeadh ar aipeanna agus malartuithe a mbeadh tréchur ard idirbhearta uathu fanacht chomh fada sin le bheith cinnte go bhfuil a n-idirbhearta buan. Nuair a bhíonn moill idir moladh agus bailchríoch bloic cruthaítear deis freisin d'atheagruithe gearra a d’fhéadfadh ionsaitheoir a úsáid chun bloic áirithe a chinsireacht nó MEV a bhaint. Tá an mheicníocht a dhéileálann le bloic a uasghrádú i gcéimeanna freisin casta go leor agus tá paisteáil déanta uirthi arís agus arís eile chun leochaileachtaí slándála a dhúnadh, rud a fhágann go bhfuil sí ar cheann de na codanna den bhunchód Ethereum ina bhfuil seans níos mó go dtiocfaidh fabhtanna fíneáilte chun cinn. D'fhéadfaí deireadh a chur leis na fadhbanna seo go léir tríd an t-am go críochnaitheacht a laghdú go sliotán amháin.

## An chomhbhabhtáil díláraithe / ama / forchostais {#the-decentralization-time-overhead-tradeoff}

Ní tréith láithreach de bhloc nua é an ráthaíocht críochnaitheachta; tógann sé am bloc nua a thabhairt chun críche. Is é an chúis atá leis seo ná go gcaithfidh bailíochtóirí a dhéanann ionadaíocht ar 2/3 ar a laghad den ETH iomlán atá i ngeall ar an líonra vótáil ar son an bhloic ("fianaise") chun go measfar é a bheith críochnaithe. Ní mór do gach nód bailíochtaithe ar an líonra fianuithe ó nóid eile a phróiseáil ionas go mbeidh a fhios aige go bhfuil, nó nach bhfuil, an tairseach 2/3 bainte amach ag bloc.

Dá ghiorra an t-am a cheadaítear le críochnú a bhaint amach, is gá níos mó cumhachta ríomhaireachta a bheith ag gach nód mar go gcaithfear an próiseáil fianaithe a dhéanamh níos tapúla. Chomh maith leis sin, dá mhéid nóid bhailíochtaithe atá ar an líonra, is ea is mó fianuithe a chaithfidh gach bloc a phróiseáil, ag cur leis an gcumhacht próiseála atá ag teastáil freisin. Dá mhéad cumhacht próiseála a theastaíonn, is lú is féidir le daoine a bheith rannpháirteach toisc go bhfuil gá le crua-earraí níos costasaí chun gach nód bailíochtaithe a rith. Má mhéadaítear an t-am idir bloic laghdaítear an chumhacht ríomhaireachta atá ag teastáil ag gach nód ach méadaítear an t-am go críoch freisin, toisc go ndéantar fianuithe a phróiseáil níos moille.

Mar sin, tá comhbhabhtáil idir an forchostas (cumhacht ríomhaireachta), an dílárú (líon na nód ar féidir leo a bheith rannpháirteach i mbailíochtú an tslabhra) agus an t-am go dtí an chríochnaitheacht. Déanann an córas idéalach íoschumhacht ríomhaireachta, dílárú uasta agus íosmhéid ama chun deiridh a chothromú.

Rinne meicníocht chomhdhearcadh reatha Ethereum na trí pharaiméadar seo a chothromú trí:

- **An t-íosmhéid geall a shocrú go 32 ETH**. Socraíonn sé seo uasteorainn ar líon fhianuithe na mbailíochtóirí a chaithfidh nóid aonair a phróiseáil, agus mar sin uasteorainn do na ceanglais ríomha do gach nód.
- **An t-am chun críochnaitheachta a shocrú ag ~15 nóiméad**. Tugann sé seo dóthain ama do bhailitheoirí a ritheann ar ghnáthríomhairí baile chun fianuithe do gach bloc a phróiseáil go sábháilte.

Leis an dearadh meicníochta atá ann faoi láthair, chun an t-am chun críochnaitheachta a laghdú, is gá líon na mbailíochtóirí ar an líonra a laghdú nó na tiomantais crua-earraí do gach nód a mhéadú. Mar sin féin, tá feabhsuithe ar féidir a dhéanamh ar an mbealach a phróiseáiltear fianuithe a cheadaíonn tuilleadh fianuithe a chomhaireamh gan cur leis an bhforchostas ag gach nód. Le próiseáil níos éifeachtaí beifear in ann críochnaitheacht a chinneadh laistigh d’aon sliotán amháin, seachas thar dhá aga.

## Bealaí chuig SSF {#routes-to-ssf}

<ExpandableCard title= "Cén fáth nach féidir SSF a bheith againn inniu?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Comhcheanglaíonn an mheicníocht chomhthola reatha fianuithe ó bhailíochtóirí iolracha, ar a dtugtar coistí, chun líon na dteachtaireachtaí a chaithfidh gach bailíochtóir a phróiseáil chun bloc a bhailíochtú a laghdú. Bíonn deis ag gach bailíochtóir fianú a dhéanamh i ngach tréimhse (32 sliotán) ach i ngach sliotán, níl ach fo-thacar de bhailitheoirí, ar a dtugtar fianú 'coiste'. Déanann siad é sin trí fho-líonraí a roinnt ina roghnaítear roinnt bailíochtóirí le bheith ina 'gcomhbhailíochtóirí'. Comhcheanglaíonn na comhbhailíochtóiirí sin na sínithe go léir a fheiceann siad ó bhailíochtóirí eile ina bhfo-líon isteach i síniú comhiomlán amháin. Déanann an comhbhailíochtóir a áiríonn an líon is mó ranníocaíochtaí aonair a síniú comhiomlán a chur ar aghaidh chuig an moltóir bloc, a áiríonn sa bhloc mar aon leis an síniú comhiomlán ó na coistí eile.

Soláthraíonn an próiseas seo dóthain acmhainne do gach bailíochtóir vótáil i ngach aga, mar go bhfuil `32 sliotán * 64 coiste * 256 bailíochtóir in aghaidh an choiste = 524,288 bailíochtaithe in aghaidh na tréimhse `. Agus é seo á scríobh (Feabhra 2023) tá ~513,000 bailíochtóir gníomhach.

Sa scéim seo, ní féidir le gach bailíochtóir vóta a chaitheamh ar bhloc ach trína bhfianuithe a dháileadh thar an tréimhse iomlán. Mar sin féin, tá bealaí féideartha ann chun an mheicníocht a fheabhsú ionas go mbeidh deis ag gach bailíochtóir fianú i ngach sliotán_.
</ExpandableCard>

Ó dearadh meicníocht chomhthola Ethereum, fuarthas amach go bhfuil an scéim chomhiomlánaithe sínithe (BLS) i bhfad níos inscálaithe ná mar a ceapadh ar dtús, agus tá feabhas tagtha freisin ar chumas na gcliant sínithe a phróiseáil agus a fhíorú. Tarlaíonn sé go bhfuil sé indéanta fianuithe a phróiseáil ó líon mór bailíochtaithe laistigh d'aon sliotán amháin. Mar shampla, le milliún bailíochtóir an ceann ag vótáil faoi dhó i ngach sliotán, agus amanna sliotán arna gcoigeartú go 16 soicind, bheadh ​​gá le nóid sínithe a fhíorú ag íosráta 125,000 comhiomlán in aghaidh an tsoicind chun gach 1 milliún fianú laistigh den sliotán a phróiseáil. I ndáiríre, tógann sé thart ar 500 nanashoicind ar ghnáthríomhaire fíorú sínithe amháin a dhéanamh, rud a chiallaíonn gur féidir 125,000 a dhéanamh i ~62.5 ms - i bhfad faoi bhun na tairsí soicind amháin.

D’fhéadfaí tuilleadh gnóthachain éifeachtachta a bhaint amach trí shárchoistí a chruthú de m.sh. 125,000 bailíochtóir roghnaithe go randamach in aghaidh na sliotán. Ní fhaigheann ach na bailíochtóirí sin vóta ar bhloc agus mar sin ní chinneann ach an fo-thacar seo de bhailíochtóirí an dtabharfar bloc go críochnaitheacht. Cé acu an smaoineamh maith é seo nó nach ea, braitheann sé ar cé chomh costasach is fearr leis an bpobal ionsaí rathúil ar Ethereum a bheith. Tá sé seo amhlaidh toisc go bhféadfadh ionsaitheoir bloc mímhacánta a thabhairt go críochnaitheacht ina mbeadh 2/3 den éitear cruachta _san sárchoiste sin_ in ionad 2/3 den éitear iomlán a bheith ag teastáil. Is réimse gníomhach taighde é seo go fóill, ach tá dealramh leis go mbeidh costas an-ard ar ionsaí ar cheann de na fochoistí sin i gcás tacar bailíochtaithe atá sách mór chun go mbeadh ollchoistí uathu (m.sh. bheadh ​​costas an ionsaí ainmnithe ag ETH. `2/3 * 125,000 * 32 = ~2.6 milliún ETH`). Is féidir costas an ionsaithe a choigeartú trí mhéid an tacair bhailíochtóra a mhéadú (m.sh. méid an bhailíochtóra a oiriúnú ionas go mbeidh costas an ionsaithe comhionann le 1 milliún éitear, 4 mhilliún éitear, 10 milliún éitear, srl). Is cosúil go dtugann [Réamh pobalbhreith](https://youtu.be/ojBgyFl6-v4?t=755) an phobail le fios gur costas inghlactha ionsaí é 1-2 mhilliún éitear, rud a chiallaíonn ~ 65,536 - 97,152 bailíochtóir in aghaidh an ollchoiste.

Mar sin féin, ní hé an fíorú an bac fíor - is é an comhiomlánú sínithe an dúshlán is mó do na nóid bhailíochtóirí. Chun comhiomlánú sínithe a scálú is dócha go mbeidh gá le méadú ar líon na bhailitheoirí i ngach folíonra, ag méadú líon na bhfo-líonraí, nó ag cur sraitheanna breise comhiomlánaithe (i.e., coistí coistí forfheidhmithe). D'fhéadfadh go gceadódh cuid den réiteach comhbhailitheoirí speisialaithe - cosúil leis an gcaoi a ndéanfar blocthógáil agus tiomantais a ghiniúint le haghaidh sonraí rollta suas a fhoinsiú allamuigh chuig tógálaithe bloc speisialaithe faoi scaradh moltóir-tógálaí (PBS) agus Danksharding.

## Cén ról atá ag an riail forc-rogha san SSF? {#role-of-the-fork-choice-rule}

Tá an meicníocht chomhoiriúnachta atá ann inniu ag brath ar nasc dlúth idir an uirlis chríochnaitheachta (an algartam a chinneann an bhfuil 2/3 de na bailitheoirí tar éis aontú le slabhra áirithe) agus rialáil rogha gabhail (an algartam a shocraíonn cén slabhra atá ceart nuair atá roghanna iomadúla ann). Ní bhreithnítear san algartam rogha forc ach na bloic _ó_ an bloc críochnaitheach deiridh. Faoin SSF ní bheadh ​​bloc ar bith le breithniú ag an riail maidir le rogha na ngabhal, toisc go dtarlaíonn críochnaitheacht sa sliotán céanna leis an mbloc atá molta. Ciallaíonn sé seo, faoi SSF _ceachtar_ go mbeadh an t-algartam rogha gabhail _ nó_ an ghiuirléid críochnaitheachta gníomhach ag am ar bith. Dhéanfadh an ghiuirléid críochnaitheachta bloic a thabhairt chun críche ina mbeadh 2/3 de bhailiíochtóirí ar líne agus ag fianú go hionraic. Mura bhfuil bloc in ann an tairseach 2/3 a shárú, chuirfí tús leis an riail maidir le rogha an fhoirc chun a chinneadh cén slabhra ba cheart a leanúint. Cruthaíonn sé seo deis freisin an mheicníocht sceite neamhghníomhaíochta a chothabháil a aisghabhann slabhra ina dtéann bailíochtóirí >1/3 as líne, cé go bhfuil roinnt miondifríochtaí breise i gceist.

## Saincheisteanna gan réiteach {#outstanding-issues}

Is í an fhadhb a bhaineann le comhiomlánú scálaithe trí líon na mbailíochtórí in aghaidh an fho-líonra a mhéadú ná go mbíonn ualach níos mó ar an líonra piara le piara mar thoradh air. Is í an fhadhb a bhaineann le sraitheanna comhiomlána a chur leis ná go mbaineann innealtóireacht measartha casta leis agus go gcuireann sé aga folaigh leis (i.e., d’fhéadfadh níos mó ama a bheith de dhíth ar an mholtóir an bhloic cloisteáil ó na comhbhailitheoirí folíonra go léir). Níl sé soiléir freisin conas déileáil leis an gcás go bhfuil níos mó bailíochtóirí gníomhacha ar an líonra ná mar is féidir a phróiseáil i ngach sliotán, fiú le comhiomlánú sínithe BLS. Réiteach amháin is ea, toisc go mbíonn gach bailíochtóir ag fianú i ngach sliotán agus nach bhfuil aon choistí faoi SSF, go bhféadfaí an teorainn 32 ETH ar an gcothromaíocht éifeachtach a bhaint go hiomlán, agus bheadh oibreoirí a bhainistíonn bailíochtóiirí iolracha a ngeall a chomhdhlúthú agus níos lú a reáchtáil, rud a laghdódh an líon teachtaireachtaí a bhíonn le proiseáil ag nóid bhailíochtaithe chun cuntas a thabhairt ar an tacar bailíochtaithe ar fad. Braitheann sé seo ar chomhaontú a bheith idir geallsealbhóírí móra a gcuid bailíochtaithe a chomhdhlúthú. Is féidir freisin teorainn sheasta a fhorchur ar líon na mbailíochtóirí nó ar an méid ETH atá i gceist tráth ar bith. Éilíonn sé seo meicníocht éigin le cinneadh cé na bailíochtóirí a cheadaítear a bheith rannpháirteach agus cé nach bhfuil, áfach, agus d'fhéadfaí éifeachtaí tánaisteacha nach dteastaíonn a chruthú dá bharr.

## Dul chun cinn reatha {#current-progress}

Tá SSF sa chéim taighde. Níltear ag súil go seolfar é go ceann roinnt blianta, is dócha tar éis uasghráduithe suntasacha eile ar nós [crann Verkle](/roadmap/verkle-trees/) agus [ Danksharding](/roadmap/danksharding/).

## Tuilleadh léitheoireachta {#further-reading}

- [Vitalik ar SSF ag EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Nótaí Vitalik: Cosáin chuig críochnaitheacht sliotán aonair](https://notes.ethereum.org/@vbuterin/single_slot_finality)
