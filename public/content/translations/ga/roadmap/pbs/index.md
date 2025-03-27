---
title: Scaradh tairgeoir-tógálaí
description: Foghlaim conas agus cén fáth a mbeidh a gcuid freagrachtaí blocthógála agus blocchraolacháin á scoilteadh ag bailíochtóirí Ethereum.
lang: ga
---

# Scaradh tairgeoir-tógálaí {#proposer-builder-separation}

Cruthaíonn bailíochtóirí Ethereum an lae inniu bloic _agus_ craolann siad iad. Déanann siad idirbhearta ar chuala siad fúthu tríd an líonra biadáin a chur le chéile agus a phacáistiú i mbloc a sheoltar amach chuig piaraí ar líonra Ethereum. Roinneann **deighilt tairgeoir-tógálaí (PBS)** na tascanna seo thar bhailíochtóirí iolracha. Éiríonn tógálaithe bloc freagrach as bloic a chruthú agus iad a thairiscint don mholtóir bloc i ngach sliotán. Ní féidir leis an moltóir bloc inneachar an bhloic a fheiceáil, ní roghnaíonn siad ach an ceann is brabúsaí, ag íoc táille leis an tógálaí bloc sula seolann siad an bloc chuig a bpiaraí.

Is uasghrádú tábhachtach é seo ar chúiseanna éagsúla. Ar an gcéad dul síos, cruthaíonn sé deiseanna chun cinsireacht idirbhearta a chosc ar leibhéal an phrótacail. Ar an dara dul síos, cuireann sé cosc ​​ar bhailitheoirí caitheamh aimsire a bheith sáraithe ag imreoirí institiúideacha ar féidir leo brabúsacht a gcuid blocthógála a bharrfheabhsú. Sa tríú háit, cabhraíonn sé le Ethereum a scálú trí uasghrádú Danksharding a chumasú.

## PBS agus friotaíocht chinsireachta {#pbs-and-censorship-resistance}

Má scartar tógálaithe bloc agus moltóirí bloc óna chéile tá sé i bhfad níos deacra do thógálaithe bloc idirbhearta cinsireachta a dhéanamh. Is é an fáth atá leis seo ná gur féidir critéir chuimsithe sách casta a chur leis a chinntíonn nach ndearnadh aon chinsireacht sula moltar an bloc. Toisc gur aonán ar leith é an moltóir bloc ón tógálaí bloc, is féidir leis ról an chosantóra a ghlacadh i gcoinne tógálaithe bloc cinsireachta.

Mar shampla, is féidir liostaí cuimsithe a thabhairt isteach ionas gur féidir le bailíochtaithe iad a fhorchur mar nithe riachtanacha sa chéad bhloc eile nuair a bhíonn a fhios ag bailíochtaithe faoi idirbhearta ach nach bhfeiceann siad iad i mbloic. Gintear an liosta cuimsitheachta ó mhempool áitiúil na moltóirí bloc (liosta na n-idirbheart a bhfuil sé ar an eolas faoi) agus seoltar é chuig a bpiaraí díreach sula moltar bloc. Má tá aon cheann de na hidirbhearta ón liosta cuimsithe in easnamh, d’fhéadfadh an moltóir an bloc a dhiúltú, na hidirbhearta atá ar iarraidh a chur leis roimh é a mholadh, nó é a mholadh agus ligean do bhailíochtóirí eile é a dhiúltú nuair a fhaigheann siad é. Tá leagan a d'fhéadfadh a bheith níos éifeachtaí den smaoineamh seo ann freisin a dhearbhaíonn go gcaithfidh tógálaithe úsáid iomlán a bhaint as an spás bloc atá ar fáil agus mura ndéanann siad é sin cuirtear idirbhearta ó liosta cuimsitheachta an mholtóra leis. Is réimse taighde gníomhach é seo fós agus níl an chumraíocht is fearr do na liostaí cuimsithe socraithe go fóill.

Le [mempools criptithe](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) d'fhéadfadh sé a bheith dodhéanta freisin do thógálaithe agus do mholtóirí a bheith eolach faoi na hidirbhearta atá á áireamh i mbloc acu go dtí go mbíonn an bloc craolta cheana féin.

<ExpandableCard title="Cad iad na cineálacha cinsireachta a réitíonn PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Is féidir le heagraíochtaí cumhachtacha brú a chur ar bhailitheoirí cinsireacht a dhéanamh ar idirbhearta chuig seoltaí áirithe nó uathu. Comhlíonann bailíochtóirí an brú seo trí sheoltaí ar an liosta dubh a bhrath ina linn idirbhearta agus iad a fhágáil ar lár ó na bloic atá beartaithe acu. Tar éis PBS ní bheidh sé seo indéanta a thuilleadh mar ní bheidh a fhios ag tairgeoirí bloc cad iad na hidirbhearta atá á gcraoladh acu ina mbloic. D’fhéadfadh sé a bheith tábhachtach go gcloífeadh daoine aonair nó aipeanna áirithe le rialacha cinsireachta, mar shampla nuair a dhéantar dlí díobh ina réigiún féin. Sna cásanna seo, tarlaíonn comhlíonadh ag leibhéal an fheidhmchláir, agus fanann an prótacal gan chead agus saor ó chinsireacht.

</ExpandableCard>

## PBS agus MEV {#pbs-and-mev}

Tagraíonn **Uasluach in-eastósctha (MEV)** do bhailíochtóirí a uasmhéadaíonn a mbrabúsacht trí idirbhearta a ordú go fabhrach. I measc na samplaí coitianta tá babhtálacha eadrána ar mhalartuithe díláraithe (m.sh. díolachán nó ceannach mór a chur chun tosaigh) nó deiseanna a aithint chun seasaimh DeFi a leachtú. Chun MEV a uasmhéadú, teastaíonn fios gnó teicniúil sofaisticiúil agus bogearraí saincheaptha atá i gceangal le gnáthbhailíochtóiríí, rud a fhágann go bhfuil sé i bhfad níos dóchúla go n-éireoidh le hoibreoirí institiúideacha níos fearr ná daoine aonair agus bailíochtóirí caitheamh aimsire ag eastóscadh MEV. Ciallaíonn sé seo gur dócha go mbeidh fáltais geall níos airde le hoibreoirí láraithe, rud a chruthóidh fórsa láraithe a dhídhreasaíonn geallta baile.

Réitíonn PBS an fhadhb seo trí eacnamaíocht MEV a athchumrú. In ionad an moltóir bloc a chuardach MEV féin a dhéanamh, ní roghnaíonn siad ach bloc ó go leor a thairgeann tógálaithe bloc dóibh. B'fhéidir go ndearna na tógálaithe bloc eastóscadh MEV sofaisticiúla, ach téann a luach saothair chuig an moltóir bloc. Ciallaíonn sé seo, fiú má tá líon beag de na tógálaithe bloc speisialaithe i gceannas ar eastóscadh MEV, d'fhéadfadh a luach saothair dul chuig aon bhailíochtóir ar an líonra, lena n-áirítear geallsealbhóirí aonair baile.

<ExpandableCard title="Cén fáth a bhfuil sé ceart go leor blocthógáil a lárú?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

D’fhéadfaí daoine aonair a dhreasú chun dul i ngeall le linnte seachas leo féin mar gheall ar an luach saothair feabhsaithe a chuireann straitéisí sofaisticiúla MEV ar fáil. Má dhéantar an blocthógáil a scaradh ón moladh bloc, déanfar an MEV a bhaintear a dháileadh thar níos mó bailíochtaithe seachas é a lárú leis an gcuardaitheoir MEV is éifeachtaí. Ag an am céanna, nuair a cheadaítear do thógálaithe bloc speisialaithe a bheith ann baintear an t-ualach a bhaineann le bloc-thógáil ó dhaoine aonair, agus cuireann sé cosc ​​​​ar dhaoine aonair MEV a ghoid dóibh féin, agus déantar líon na mbailitheoirí aonair, neamhspleácha ar féidir leo a sheiceáil go bhfuil na bloic macánta a uasmhéadú. Is é an coincheap tábhachtach ná "neamhshiméadracht cruthaitheoir-fhíoraitheora" a thagraíonn don smaoineamh go bhfuil táirgeadh bloc láraithe go breá chomh fada agus go bhfuil líonra bailíochtóirí láidir agus díláraithe uasta in ann a chruthú go bhfuil na bloic macánta. Is acmhainn é an dílárú, ní sprioc deiridh - is iad na bloic macánta atá uainn.
</ExpandableCard>

## PBS agus Danksharding {#pbs-and-danksharding}

Is é Danksharding an bealach a dhéanfaidh Ethereum scála go >100,000 idirbheart in aghaidh an tsoicind agus táillí a íoslaghdú d'úsáideoirí rollta suas. Braitheann sé ar PBS toisc go gcuireann sé leis an ualach oibre do thógálaithe bloc, a mbeidh orthu cruthúnais a ríomh ar feadh suas le 64 MB de shonraí rollta i níos lú ná 1 soicind. Is dócha go mbeidh gá le tógálaithe speisialaithe a bheidh in ann crua-earraí sách substaintiúil a thiomnú don tasc. Mar sin féin, sa staid reatha d'fhéadfadh blocthógáil a bheith níos láraithe ar oibreoirí níos sofaisticiúla agus níos cumhachtaí ar aon nós mar gheall ar eastóscadh MEV. Is bealach é deighilt idir tograí agus tógálaí chun glacadh leis an réaltacht seo agus cosc ​​a chur air fórsa láraithe a chur i bhfeidhm ar bhailíochtú bloc (an chuid thábhachtach) nó ar dháileadh luach saothair geallta. Is buntáiste mór é go bhfuil na tógálaithe bloc speisialaithe toilteanach agus in ann na cruthúnais sonraí is gá le haghaidh Danksharding a ríomh.

## Dul chun cinn reatha {#current-progress}

Tá PBS i gcéim ard taighde, ach tá roinnt ceisteanna dearaidh tábhachtacha fós ann a chaithfear a réiteach sular féidir é a fhréamhshamhlú i gcliant Ethereum. Níl aon sonraíocht tugtha chun críche fós. Ciallaíonn sé seo gur dócha go mbeidh PBS bliain ar shiúl nó níos mó. Seiceáil an [staid an taighde](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) is déanaí.

## Further Reading {#further-reading}

- [Staid an taighde: friotaíocht cinsireachta faoi PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Dearaí margaidh táillí atá neamhdhíobhálach don PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS agus friotaíocht chinsireachta](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Liostaí cuimsithe](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
