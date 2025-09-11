---
title: Slándáil chonartha cliste
description: Forbhreathnú ar threoirlínte chun conarthaí cliste Ethereum a thógáil
lang: ga
---

Tá conarthaí cliste thar a bheith solúbtha, agus tá siad in ann méideanna móra luacha agus sonraí a rialú, agus an loighic do-athraithe a reáchtáil bunaithe ar chód a imscartar ar an blocshlabhra. Chruthaigh sé seo éiceachóras bríomhar d’fheidhmchláir dhíláraithe gan iontaoibh a sholáthraíonn go leor buntáistí thar chórais oidhreachta. Léiríonn siad freisin deiseanna d’ionsaitheoirí atá ag iarraidh brabús a dhéanamh trí leas a bhaint as leochaileachtaí i gconarthaí cliste.

Déanann blocshlabhraí poiblí, cosúil le Ethereum, an cheist maidir le conarthaí cliste a dhaingniú níos casta fós. Ní féidir cód conartha imlonnaithe _go hiondúil_ a athrú le lochtanna slándála a phaisteáil, agus bíonn sé fíordheacair sócmhainní a ghoidtear ó chonarthaí cliste a rianú agus de ghnáth ní féidir iad a aisghabháil mar gheall ar dho- athraitheacht.

Cé go n-athraíonn figiúirí, meastar go bhfuil an méid iomlán luach a goideadh nó a cailleadh de bharr lochtanna slándála i gconarthaí cliste níos mó go mór ná $1 billiún. Áirítear leis seo teagmhais ardphróifíle, mar an [hack DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3.6M ETH goidte, luach os cionn $1B i bpraghsanna an lae inniu), [Haic sparán il-sig Parity](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) ($30M caillte ag hackers), agus an [Parity eisiúint sparán reoite](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (os cionn $300M in ETH faoi ghlas go deo).

De bharr na saincheisteanna thuasluaite tá sé ríthábhachtach d’fhorbróirí iarracht a dhéanamh chun conarthaí cliste atá slán, láidir agus athléimneach a thógáil. Is gnó tromchúiseach é slándáil conartha chliste, agus ní mór do gach forbróir é a fhoghlaim. Clúdóidh an treoir seo breithnithe slándála d’fhorbróirí Ethereum agus scrúdóidh sé acmhainní chun slándáil conarthaí cliste a fheabhsú.

## Réamhriachtanais {#prerequisites}

Cinntigh go bhfuil tú eolach ar na [bunphrionsabail fhorbartha conartha cliste](/developers/docs/smart-contracts/) sula dtéann tú i ngleic leis an tslándáil.

## Treoirlínte maidir le conarthaí cliste Ethereum a thógáil {#smart-contract-security-guidelines}

### 1. Dear rialuithe cearta rochtana {#design-proper-access-controls}

I gconarthaí cliste, is féidir le feidhmeanna atá marcáilte `poiblí` nó `seachtrach` a ghlaoch ó aon chuntais faoi úinéireacht sheachtrach (EOAanna) nó cuntais chonartha. Is gá infheictheacht phoiblí d’fheidhmeanna a shonrú más mian leat go n-idirghníomhaíonn daoine eile le do chonradh. Ní féidir feidhmeanna atá marcáilte `príobháideach` a ghlaoch, áfach, ach amháin ag feidhmeanna laistigh den chonradh cliste, agus ní cuntais sheachtracha. Má thugtar rochtain do gach rannpháirtí líonra ar fheidhmeanna conartha is féidir fadhbanna a chruthú, go háirithe má chiallaíonn sé gur féidir le haon duine oibríochtaí íogaire a dhéanamh (m.sh. comharthaí nua a bhualadh).

Chun úsáid neamhúdaraithe feidhmeanna conartha cliste a chosc, is gá rialuithe rochtana slána a chur i bhfeidhm. Cuireann meicníochtaí rialaithe rochtana srian ar an gcumas feidhmeanna áirithe i gconradh cliste a úsáid d’eintitis fhormheasta, amhail cuntais atá freagrach as an gconradh a bhainistiú. Is dhá phatrún úsáideach iad an **patrún inúinéireachta** agus an **rialú bunaithe ar ról** chun rialú rochtana a chur i bhfeidhm i gconarthaí cliste:

#### Patrún inúinéireachta {#ownable-pattern}

Sa phatrún Inúinéireachta, socraítear seoladh mar “úinéir” an chonartha le linn phróiseas cruthaithe an chonartha. Sanntar modhnóir `OnlyOwner` d’fheidhmeanna cosanta, rud a chinntíonn go bhfíordheimhníonn an conradh céannacht an tseolta glaonna sula gcuirtear an fheidhm i gcrích. Filleann glaonna chuig feidhmeanna cosanta ó sheoltaí eile seachas úinéir an chonartha i gcónaí, rud a chuireann cosc ​​ar rochtain nach dteastaíonn.

#### Rialú rochtana ról-bhunaithe {#role-based-access-control}

Má chláraítear seoladh aonair mar `Úinéir` i gconradh cliste, tugtar isteach riosca lárúcháin agus is pointe aonair teipe é. Má sháraítear eochracha cuntais an úinéara, is féidir le hionsaitheoirí ionsaí a dhéanamh ar an gconradh faoi úinéireacht. Sin é an fáth go bhféadfadh sé gur rogha níos fearr patrún rialaithe rochtana ról-bhunaithe a úsáid le cuntais riaracháin iolracha.

I rialú rochtana ról-bhunaithe, déantar rochtain ar fheidhmeanna íogaire a dháileadh idir sraith rannpháirtithe iontaofa. Mar shampla, d’fhéadfadh cuntas amháin a bheith freagrach as comharthaí a mhionú, agus déanann cuntas eile uasghrádú nó sos don chonradh. Má dhéantar rialú rochtana a dhílárú ar an mbealach seo, cuirtear deireadh le pointí aonair teipe agus laghdaítear boinn tuisceana iontaobhais d’úsáideoirí.

##### Ag baint úsáide as sparán le sínithe iolracha

Cur chuige eile chun rialú rochtana slána a chur i bhfeidhm is ea [chuntas le sínithe iolracha](/developers/docs/smart-contracts/#multisig) a úsáid chun conradh a bhainistiú. Murab ionann agus EOA rialta, tá cuntais le sínithe iolracha faoi úinéireacht aonáin iolracha agus éilíonn siad sínithe ó líon íosta cuntas - abair 3-de-5 - chun idirbhearta a chur i gcrích.

Trí multisig a úsáid le haghaidh rialú rochtana tugtar isteach sraith bhreise slándála ós rud é go dteastaíonn toiliú ó pháirtithe iolracha le gníomhartha ar an spriocchonradh. Tá sé seo úsáideach go háirithe má tá gá leis an bpatrún Inúinéireachta a úsáid, toisc go mbíonn sé níos deacra d’ionsaitheoir nó do chos istigh bradacha feidhmeanna conartha íogaire a ionramháil ar son críocha mailíseacha.

### 2. Úsáid ráitis require(), assert(), agus revert() chun oibríochtaí conartha a chosaint {#use-require-assert-revert}

Mar atá luaite, is féidir le duine ar bith feidhmeanna poiblí a ghlaoch i do chonradh cliste nuair a bheidh sé imscaradh ar an blocshlabhra. Ós rud é nach bhfuil a fhios agat roimh ré conas a idirghníomhóidh cuntais sheachtracha le conradh, is fearr cosaintí inmheánacha a chur i bhfeidhm in aghaidh oibríochtaí fadhbacha roimh imscaradh. Is féidir leat iompar ceart a chur i bhfeidhm i gconarthaí cliste trí úsáid a bhaint as na ráitis `require()`, `assert()`, agus `revert()` chun eisceachtaí a spreagadh agus dul ar ais athruithe staide a chealú má theipeann ar fhorghníomhú ceanglais áirithe a shásamh.

**`require()`**: sainmhínítear `require` ag tús na bhfeidhmeanna agus cinntíonn sé go gcomhlíontar coinníollacha réamhshainithe sula ritear an fheidhm ghlaoite. Is féidir ráiteas `require` a úsáid chun ionchuir úsáideora a bhailíochtú, athróga staide a sheiceáil, nó chun aitheantas an chuntais ghlao a fhíordheimhniú sula dtéann tú ar aghaidh le feidhm.

**`assert()`**: úsáidtear `assert()` chun earráidí inmheánacha a bhrath agus chun sáruithe ar “do-athraithigh” a sheiceáil i do chód. Is dearbhú loighciúil é do-athraitheach faoi staid an chonartha agus ba cheart go mbeadh sé fíor i gcás gach feidhme a ritear. Sampla ide dho-athraitheach is ea an t-uas-soláthar iomlán nó iarmhéid conartha dearbháin. Trí úsáid a bhaint as `assert()` cinntíonn sé nach sroicheann do chonradh staid leochaileach choíche, agus má dhéanann sé, déantar gach athrú ar athróga staide a rolladh siar.

**`revert()`**: Is féidir `revert()` a úsáid i ráiteas eile a spreagann eisceacht mura mbíonn an coinníoll riachtanach sásta. Úsáideann an conradh samplach thíos `revert()` chun comhlíonadh feidhmeanna a chosaint:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Conarthaí cliste a thástáil agus cruinneas an chóid a fhíorú {#test-smart-contracts-and-verify-code-correctness}

Ciallaíonn do-athraitheacht an chóid a fheidhmíonn i [Meaisín Fíorúil Ethereum](/developers/docs/evm/) go n-éilíonn conarthaí cliste leibhéal measúnaithe cáilíochta níos airde le linn na céime forbartha. Feabhsófar an tslándáil go mó má dhéantar tástáil fhairsing ar do chonradh agus é a bhreathnú le haghaidh aon torthaí gan choinne, agus cosnóidh sé d’úsáideoirí san fhadtréimhse.

Is é an gnáth-mhodh tástálacha aonaid bheaga a scríobh le sonraí bréige a den chineál a mbeadh súil leo ó úsáideoirí an chonartha. Tá [Tástáil aonaid](/developers/docs/smart-contracts/testing/#unit-testing) go maith chun feidhmiúlacht fheidhmeanna áirithe a thástáil agus chun a chinntiú go n-oibríonn conradh cliste mar a bhíothas ag súil leis.

Ar an drochuair, níl an tástáil aonaid chomh héifeachtach agus is féidir chun slándáil conartha cliste a fheabhsú nuair a úsáidtear iad ina n-aonar. D’fhéadfadh tástáil aonaid a chruthú go bhfeidhmíonn feidhm i gceart le haghaidh sonraí bréige, ach níl tástálacha aonaid ach chomh héifeachtach leis na tástálacha atá scríofa. Is deacair cásanna imill caillte agus leochaileachtaí a bhrath a d'fhéadfadh sábháilteacht do chonartha cliste a bhriseadh.

Is fearr mar chur chuige tástáil aonaid a chomhcheangal le tástáil bunaithe ar mhaoin a dhéantar trí úsáid a bhaint as [anailís statach agus dinimiciúil](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Braitheann anailís statach ar léirithe íseal-leibhéil, mar [sreabhghraif rialaithe](https://en.wikipedia.org/wiki/Control-flow_graph) agus [crainn chomhréire teibí](https://deepsource.io/glossary/ast/) chun anailís a dhéanamh ar ríomhstaid insroichte agus ar chonairí feidhmithe. Idir an dá linn, déanann teicnící anailíse dinimiciúla, mar [beachtú conarthaí cliste](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), conradh cóid a rith le luachanna ionchuir randamacha chun oibríochtaí a sháraíonn airíonna slándála a bhrath.

Teicníc eile is ea [Fíorú foirmiúil](/developers/docs/smart-contracts/formal-verification) chun airíonna slándála i gconarthaí cliste a fhíorú. Murab ionann agus tástáil rialta, is féidir le fíorú foirmiúil easpa earráidí a chruthú go cinntitheach i gconradh cliste. Baintear é seo amach trí shonraíocht fhoirmiúil a chruthú a chuimsíonn na hairíonna slándála inmhianaithe agus a chruthaíonn go gcloíonn samhail fhoirmiúil de na conarthaí leis an tsonraíocht seo.

### 4. Iarr athbhreithniú neamhspleách ar do chód {#get-independent-code-reviews}

Tar éis do chonradh a thástáil, is maith an rud é iarraidh ar dhaoine eile an cód foinse a sheiceáil le haghaidh aon saincheisteanna slándála. Ní nochtfaidh an tástáil gach locht i gconradh cliste, ach má fhaightear athbhreithniú neamhspleách méadaítear an fhéidearthacht go bhfeicfidh tú leochaileachtaí.

#### Iniúchtaí {#audits}

Bealach amháin chun athbhreithniú neamhspleách ar an gcód a dhéanamh is ea iniúchadh conartha cliste a choimisiúnú. Tá ról tábhachtach ag iniúchóirí lena chinntiú go bhfuil conarthaí cliste slán agus saor ó lochtanna cáilíochta agus earráidí dearaidh.

Mar sin féin, ba cheart duit iniúchtaí a sheachaint mar réiteach draíochta. Ní fheicfidh iniúchtaí cliste conartha gach fabht agus tá siad deartha den chuid is mó chun babhta breise athbhreithnithe a sholáthar, ar féidir leo cabhrú le saincheisteanna a bhrath a chaill forbróirí le linn na forbartha agus na tástála tosaigh. Ba cheart duit na cleachtais is fearr a leanúint freisin maidir le bheith ag obair le hiniúchóirí, mar chód a dhoiciméadú i gceart agus tuairimí inlíne a chur leis, chun an leas is fearr a bhaint as iniúchadh conartha cliste.

- [ Leideanna iniúchta conartha cliste & cleasanna](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Bain an tairbhe is mó as d’iniúchadh](https://inference.ag/blog/2023-08-14-tips/) - _Tátail_

#### Deolchairí fabht {#bug-bounties}

Is cur chuige eile é clár deolchairí fabht a bhunú chun athbhreithnithe cód seachtracha a chur i bhfeidhm. Is luach saothair airgeadais é deolchairí fabht a thugtar do dhaoine aonair (go hiondúil Haiceálaithe bána) a aimsíonn leochaileachtaí in iarratas.

Nuair a úsáidtear i gceart iad, tugann deolchairí fabhtanna dreasacht do bhaill an phobail haiceála chun do chód a iniúchadh le haghaidh lochtanna criticiúla. Sampla ón bhfíorshaol is ea an “fabht airgid gan teorainn” a ligfeadh d’ionsaitheoir méid neamhtheoranta éitear a chruthú ar [Soirbhíochas](https://www.optimism.io/), prótacal [Ciseal 2](/layer-2/) a ritheann ar Ethereum. Ar ámharaí an tsaoil, d’aimsigh haiceálaí bán [an locht](https://www.saurik.com/optimism.html) agus chuir sé in iúl don fhoireann é, [agus thuill sé íocaíocht mhór ar a shon](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Straitéis úsáideach is ea íocaíocht amach clár deolchaire fabhtanna a shocrú i gcomhréir le méid na gcistí atá i gceist. Déantar cur síos air mar “[deolchaire fabht scálaithe](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) dreasachtaí airgeadais do dhaoine aonair chun leochaileachtaí a nochtadh go freagrach in ionad iad a shaothrú.

### 5. Lean na cleachtais is fearr le linn forbairt conarthaí cliste {#follow-smart-contract-development-best-practices}

Ní fhágann iniúchtaí agus deolchairí fabhtanna nach gá duit cód ardcháilíochta a scríobh. Cuirtear bonn le dea-shlándáil conartha cliste leis na próisis chuí deartha agus forbartha seo a leanas:

- Stóráil gach cód i gcóras rialaithe leagan, mar shampla git

- Déan gach modhnú cód trí iarratais ar tharraingt

- Cinntigh go mbíonn athbhreithneoir neamhspleách amháin ar a laghad ag iarratais tarraingthe - má tá tú ag obair leat féin ar thionscadal, smaoinigh ar fhorbróirí eile a aimsiú agus athbhreithnithe ar chóid trádála

- Úsáid [timpeallacht forbartha](/developers/docs/frameworks/) chun conarthaí cliste a thástáil, a thiomsú agus a imscaradh

- Rith do chód trí bhunuirlisí anailíse cóid, mar, [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril agus Slither. Go hidéalach, ba chóir duit é seo a dhéanamh sula ndéantar gach iarratas ar tharraingt a chumasc agus difríochtaí san aschur a chur i gcomparáid

- Cinntigh go dtiomsaíonn do chód gan earráidí, agus nach scaoileann an tiomsaitheoir Solidity aon rabhaidh

- Déan do chód a dhoiciméadú i gceart (ag baint úsáide as [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) agus déan cur síos i dteanga shothuigthe ar shonraí ailtireachta an chonartha. Déanfaidh sé seo níos fusa do dhaoine eile do chód a iniúchadh agus a athbhreithniú.

### 6. Pleananna láidre athshlánaithe ó thubaiste a chur i bhfeidhm {#implement-disaster-recovery-plans}

Má dhéantar rialuithe slána rochtana a dhearadh, modhnóirí feidhme a chur i bhfeidhm, agus moltaí eile is féidir feabhas a chur ar shlándáil chonarthaí cliste, ach ní féidir leo an seans go ndéanfar bradaíl mhailíseach as an áireamh. Chun conarthaí cliste slána a thógáil ní mór “ullmhú don teip” agus plean tacachumais a bheith ann chun freagairt go héifeachtach d’ionsaithe. Cuimseoidh plean ceart athshlánaithe tubaiste cuid de na comhpháirteanna seo a leanas nó iad uile:

#### Uasghráduithe conartha {#contract-upgrades}

Cé go bhfuil conarthaí cliste Ethereum do-athraithe de réir réamhshocraithe, is féidir méid áirithe inathraitheachta a bhaint amach trí úsáid a bhaint as patrúin uasghrádaithe. Is gá conarthaí a uasghrádú i gcásanna nach féidir do sheanchonradh a úsáid mar gheall ar locht criticiúil agus gurb é an rogha is indéanta an loighic nua a úsáid.

Oibríonn meicníochtaí uasghrádaithe conartha ar bhealach difriúil, ach tá an “patrún seachfhreastalaí” ar cheann de na cineálacha cur chuige is coitianta chun conarthaí cliste a uasghrádú. Roinneann [patrúin seachfhreastalaí](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) staid agus loighic feidhmchláir idir _dhá_ chonradh. Stórálann an chéad chonradh (ar a dtugtar ‘conradh seachfhreastalaí’) athróga staide (m.sh., iarmhéideanna úsáideoirí), agus coimeádann an dara conradh (ar a dtugtar ‘conradh loighce’) an cód chun feidhmeanna conartha a rith.

Idirghníomhaíonn cuntais leis an gconradh seachfhreastalaí, a sheolann gach glao feidhme chuig an gconradh loighce trí [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) glao ar leibhéal íseal. Murab ionann agus gnáthghlao teachtaireachta, cinntíonn `delegatecall()` an cód a ritheann ag seoladh an chonartha loighce go gcuirtear i bhfeidhm é i gcomhthéacs an chonartha glaonna. Ciallaíonn sé seo go scríobhfaidh an conradh loighce i gcónaí chuig stóras an tseachfhreastalaí (seachas a stór féin) agus go gcaomhnaítear bunluachanna `msg.sender` agus `msg.value`.

Chun glaonna a tharmligean chuig an gconradh loighce ní mór a sheoladh a stóráil i stóras an chonartha seachfhreastalaí. Mar sin, níl i gceist le huasghrádú loighic an chonartha ach conradh loighce eile a imscaradh agus an seoladh nua a stóráil sa chonradh seachfhreastalaí. Ós rud é go seoltar glaonna ar an gconradh seachfhreastalaí go huathoibríoch chuig an gconradh loighce nua, bheadh ​​“uasghrádú” déanta agat ar an gconradh gan an cód a mhodhnú i ndáiríre.

[Tuilleadh faoi chonarthaí a uasghrádú](/developers/docs/smart-contracts/upgrading/).

#### Stopanna éigeandála {#emergency-stops}

Mar a luadh, ní féidir le hiniúchadh agus tástáil fhairsing gach fabht a aimsiú i gconradh cliste. Má tá leochaileacht le feiceáil i do chód tar éis imscartha, ní féidir é a phaisteáil toisc nach féidir leat an cód atá ag seoladh an chonartha a athrú. Chomh maith leis sin, d’fhéadfadh go dtógfadh sé am meicníochtaí uasghrádaithe (m.sh. patrúin seachfhreastalaí) a chur i bhfeidhm (is minic a éilíonn siad ceadú ó pháirtithe éagsúla), rud a thugann níos mó ama d’ionsaitheoirí chun níos mó damáiste a dhéanamh.

Is é an rogha núicléach feidhm “stop éigeandála” a chur i bhfeidhm a bhlocálann glaonna chuig feidhmeanna leochaileacha i gconradh. Is gnách go mbíonn na comhpháirteanna seo a leanas i stopanna éigeandála:

1. Athróg dhomhanda Boole a thugann le fios an bhfuil an conradh cliste i riocht stoptha nó nach bhfuil. Socraítear an athróg seo mar `false` agus an conradh á shocrú, ach rachaidh sé ar ais go `true` nuair a stopfar an conradh.

2. Feidhmeanna a thagraíonn don athróg Boole agus iad á gcur i gcrích. Tá feidhmeanna den sórt sin inrochtana nuair nach gcuirtear stop leis an gconradh cliste, agus éiríonn siad dorochtana nuair a spreagtar an ghné stop éigeandála.

3. Aonán a bhfuil rochtain aige ar an bhfeidhm stad éigeandála, a shocraíonn an athróg Boole mar `true`. Chun gníomhartha mailíseacha a chosc, is féidir glaonna chuig an bhfeidhm seo a theorannú chuig seoladh iontaofa (m.sh., úinéir an chonartha).

Nuair a ghníomhaíonn an conradh an stad éigeandála, ní bheidh feidhmeanna áirithe inghlaoite. Baintear é seo amach trí fheidhmeanna roghnaithe a thimfhilleadh i modhnóir a dhéanann tagairt don athróg dhomhanda. Seo thíos [sampla](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) ag cur síos ar chur i bhfeidhm an phatrúin seo i gconarthaí:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Léiríonn an sampla seo bunghnéithe stadanna éigeandála:

- Is Boole é `isStopped` a dhéanann meastóireacht ar `false` ag an tús agus `true` nuair a théann an conradh isteach sa mhód éigeandála.

- Seiceálann na modhnóirí feidhmeanna `onlyWhenStopped` agus `stopedInEmergency` an athróg `isStopped`. Úsáidtear `stopedInEmergency` chun feidhmeanna a rialú nár cheart a bheith inrochtana nuair a bhíonn an conradh leochaileach (m.sh., `taisce()`). Go simplí, fillfidh glaonna ar na feidhmeanna seo.

Úsáidtear `onlyWhenStopped` le haghaidh feidhmeanna ba cheart a bheith inghlaoite le linn éigeandála (m.sh., `emergencyWithdraw()`). Is féidir le feidhmeanna den sórt sin cabhrú leis an gcás a réiteach, agus dá bhrí sin fágtar iad as an liosta “feidhmeanna srianta”.

Trí úsáid a bhaint as feidhmiúlacht stad éigeandála cuirtear bac éifeachtach ar fáil chun déileáil le leochaileachtaí tromchúiseacha i do chonradh cliste. Mar sin féin, méadaíonn sé an gá atá ag úsáideoirí muinín a bheith acu as forbróirí gan é a ghníomhachtú ar chúiseanna leithleacha. Chuige sin, is réitigh fhéideartha iad rialú an stad éigeandála a dhílárú trí mheicníocht vótála ar slabhra, glas ama, nó formheas ó sparán síniú iolrach a chur faoina réir.

#### Monatóireacht ar imeachtaí {#event-monitoring}

Ligeann [Imeachtaí](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) duit glaonna ar fheidhmeanna conartha cliste a rianú agus monatóireacht a dhéanamh ar athruithe ar athróga staide. Is fearr do chonradh cliste a ríomhchlárú chun imeacht a astú aon uair a dhéanann páirtí éigin gníomh atá ríthábhachtach don tsábháilteacht (m.sh. cistí a aistarraingt).

Soláthraíonn logáil imeachtaí agus monatóireacht orthu as slabhra léargais ar oibríochtaí conartha agus cabhraíonn sé le gníomhartha mailíseacha a aimsiú níos tapúla. Ciallaíonn sé seo gur féidir le d'fhoireann freagairt níos tapúla ar haiceanna agus gníomhú chun tionchar ar úsáideoirí a mhaolú, mar shampla feidhmeanna a chur ar sos nó uasghrádú a dhéanamh.

Is féidir leat uirlis monatóireachta réamhdhéanta a roghnú freisin a chuireann foláirimh ar aghaidh go huathoibríoch gach uair a idirghníomhaíonn duine le do chonarthaí. Ligfidh na huirlisí seo duit foláirimh saincheaptha a chruthú bunaithe ar thruicir éagsúla, amhail méid an idirbhirt, minicíocht glaonna feidhme, nó na feidhmeanna sonracha atá i gceist. Mar shampla, d’fhéadfá foláireamh a thagann isteach a ríomhchlárú nuair a thrasnaíonn an méid a aistarraingíodh in aon idirbheart amháin tairseach ar leith.

### 7. Córais rialachais shlána a dhearadh {#design-secure-governance-systems}

B’fhéidir gur mhaith leat d’iarratas a dhílárú trí smacht a chur ar chroíchonarthaí cliste chuig baill an phobail. Sa chás seo, áireofar sa chóras conartha cliste modúl rialachais — meicníocht a cheadaíonn do bhaill an phobail gníomhartha riaracháin a fhormheas trí chóras rialachais ar slabhra. Mar shampla, féadfaidh sealbhóirí dearbhán vótáil ar thogra chun conradh seachfhreastalaí a uasghrádú go cur chun feidhme nua.

Is féidir le rialachas díláraithe a bheith tairbheach, go háirithe toisc go ndéanann sé leas na bhforbróirí agus na n-úsáideoirí deiridh a ailíniú. Mar sin féin, féadfaidh sásraí cliste rialachais conarthaí rioscaí nua a thabhairt isteach má chuirtear chun feidhme iad go mícheart. Cás sochreidte is ea má fhaigheann ionsaitheoir cumhacht ollmhór vótála (arna thomhas i líon na n-airíonna atá á sealbhú) trí [iasacht flash](/defi/#flash-loans) a fháil agus má chuireann siad togra mailíseach chun cinn.

Bealach amháin chun fadhbanna a bhaineann le rialachas ar slabhra a chosc is ea [glas ama a úsáid](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Cuireann glas ama cosc ​​ar chonradh cliste ó ghníomhartha áirithe a dhéanamh go dtí go n-imíonn méid áirithe ama thart. I measc na straitéisí eile tá “meáchan vótála” a shannadh do gach comhartha bunaithe ar cé chomh fada agus a cuireadh faoi ghlas é, nó cumhacht vótála seolta ag tréimhse stairiúil a thomhas (mar shampla, 2-3 bhloc san am a chuaigh thart) in ionad an bloc reatha. Laghdaíonn an dá mhodh an fhéidearthacht cumhacht vótála a bhailiú go tapa chun vótaí ar slabhra a mhealladh.

Tuilleadh faoi [córais shlána rialachais a dhearadh](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [meicníochtaí éagsúla vótála sna DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos), agus [na gnáth-veicteora ionsaithe DAO a ghiaráil DeFi](https://dacian.me/dao-governance-defi-attacks) sna naisc chomhroinnte.

### 8. Laghdaigh castacht an chóid a oiread is féidir {#reduce-code-complexity}

Tá aithne ag forbróirí bogearraí traidisiúnta ar an bprionsabal KISS ("coimeád simplí é, a dhúramáin") é, mar a moltar gan castacht neamhriachtanach a thabhairt isteach i ndearadh bogearraí. Leanann sé seo an smaoineamh fadtréimhseach go “dteipeann ar chórais chasta ar bhealaí casta” agus go bhfuil siad níos mó i mbaol ó earráidí costasacha.

Tá tábhacht ar leith ag baint le rudaí a choinneáil simplí agus conarthaí cliste á scríobh, ós rud é go bhféadfadh conarthaí cliste méideanna móra luacha a rialú. Leid chun simplíocht a bhaint amach agus conarthaí cliste á scríobh ná leabharlanna atá ann cheana a athúsáid, ar nós [Conarthaí OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), nuair is féidir. Toisc go ndearna forbróirí iniúchadh agus tástáil fhairsing ar na leabharlanna seo, laghdaítear an seans go dtabharfar isteach fabhtanna trí fheidhmiúlacht nua a scríobh ón tús.

Comhairle choitianta eile is ea feidhmeanna beaga a scríobh agus conarthaí modúlacha a choinneáil trí loighic ghnó a roinnt thar chonarthaí iolracha. Ní hamháin go laghdaítear an dromchla ionsaí i gconradh cliste nuair a scríobhtar cód níos simplí, déanann sé níos éasca freisin réasúnú a dhéanamh faoi chruinneas an chórais iomláin agus earráidí dearaidh féideartha a bhrath go luath.

### 9. Cosain in aghaidh leochaileachtaí coitianta i gconarthaí cliste {#mitigate-common-smart-contract-vulnerabilities}

#### Athiontráil {#reentrancy}

Ní cheadaíonn an EVM comhrith, rud a chiallaíonn nach féidir le dhá chonradh a bhaineann le glao teachtaireachta oibriú go comhuaineach. Cuireann glao seachtrach feidhmiú agus cuimhne an chonartha glaonna ar sos go dtí go dtagann an glao ar ais, agus ag an bpointe sin is gnách go leantar den fhorghníomhú. Is féidir cur síos foirmiúil a dhéanamh ar an bpróiseas seo mar aistriú [sreabhadh rialaithe](https://www.computerhope.com/jargon/c/contflow.htm) chuig conradh eile.

Cé go bhfuil sé neamhdhíobhálach don chuid is mó, is féidir fadhbanna a chruthú, mar athiontráil, trí shreabhadh rialaithe a aistriú chuig conarthaí neamhiontaofa. Tarlaíonn ionsaí athiontrála nuair a ghlaonn conradh mailíseach ar ais isteach i gconradh leochaileach sula mbíonn agairt na bunfheidhme críochnaithe. Is fearr an cineál ionsaí seo a mhíniú le sampla.

Smaoinigh ar chonradh cliste simplí (‘Íospartach’) a ligeann do dhuine ar bith éitear a thaisceadh agus a aistarraingt:

```solidity
// This contract is vulnerable. Do not use in production

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Nochtann an conradh seo feidhm `aistarraing()` chun ligean d’úsáideoirí ETH a bhí i dtaisce sa chonradh roimhe seo a aistarraingt. Nuair a dhéantar aistarraingt a phróiseáil, déanann an conradh na hoibríochtaí seo a leanas:

1. Seiceálann sé iarmhéid ETH an úsáideora
2. Seolann cistí chuig an seoladh glaonna
3. Athshocraíonn siad a n-iarmhéid go 0, rud a choscann aistarraingtí breise ón úsáideoir

Leanann an fheidhm `withdraw()` i gconradh `Victim` patrún “seiceálacha-idirghníomhaíochtaí-éifeachtaí”. Déanann sé _seiceáil_ má shásaítear na coinníollacha atá riachtanach don fhorghníomhú (i.e., tá cothromaíocht dhearfach ETH ag an úsáideoir) agus déanann sé an _idirghníomhaíocht_ em> trí ETH a sheoladh chuig seoladh an ghlaoiteora, sula gcuirtear _éifeachtaí_ an idirbhirt i bhfeidhm (i.e. iarmhéid an úsáideora a laghdú).

Má ghlaoitear `aistarraing()` ó chuntas faoi úinéireacht sheachtrach (EOA), feidhmíonn an fheidhm mar a bhíothas ag súil leis: seolann `msg.sender.call.value()` ETH chuig an nglaoiteoir. Mar sin féin, más cuntas conartha cliste é `msg.sender` glaonna `aistarraing()`, seolfar cistí trí úsáid a bhaint as `msg.sender.call.value()` agus spreagfar cód atá stóráilte ag an seoladh sin a rith.

Samhlaigh gurb é seo an cód a úsáidtear ag seoladh an chonartha:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Tá an conradh seo deartha chun trí rud a dhéanamh:

1. Glacadh le héarlais ó chuntas eile (EOA an ionsaitheora is dócha)
2. Taisce 1 ETH isteach sa chonradh Íospartach
3. Aisarraingt an 1 ETH atá stóráilte sa chonradh cliste

Níl aon rud mícheart anseo, ach amháin go bhfuil feidhm eile ag `Ionsaitheoir` a ghlaonn `aistarraing()` sa `Victim` arís má bhíonn an gás atá fágtha ón gcód ` msg.sender.call.value` níos mó ná 40,000. Tugann sé seo an cumas do `Ionsaitheoir` `Íospartach` a iontráil arís agus tuilleadh cistí a aistarraingt _roimh_ an chéad agairt `aistarraing` críochnaithe. Breathnaíonn an timthriall mar seo:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

Is é an achoimre ná toisc nach bhfuil iarmhéid an ghlaoiteora socraithe ag 0 go dtí go gcríochnaítear feidhmiú na feidhme, go n-éireoidh le hagairtí ina dhiaidh sin agus go gceadóidh siad don ghlaoiteoir a iarmhéid a aistarraingt go minic. Is féidir ionsaí den chineál seo a úsáid chun a chistí a dhísciú as conradh cliste, mar a tharla sa [haic DAO 2016](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Tá ionsaithe athiontrála fós ina fhadhb mhór do chonarthaí cliste inniu mar a léiríonn [liostaí poiblí de bhradaíl athiontrála](https://github.com/pcaversaccio/reentrancy-attacks).

##### Conas ionsaithe athiontrála a chosc

Cur chuige chun déileáil le hathiontráil is ea [seiceálacha-éifeachtaí-idirghníomhaíochtaí patrún](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Ordaítear leis an bpatrún seo feidhmeanna a rith ar bhealach go ndéanann an cód na seiceálacha riachtanacha roimh dhul ar aghaidh le rith ar dtús, agus ina dhiaidh sin cód a ionramhálann staid chonartha, le cód a idirghníomhaíonn le conarthaí eile nó EOAnna ag an deireadh.

Úsáidtear an patrún seiceálacha-éifeacht-idirghníomhaíochta i leagan athbhreithnithe den chonradh `Íospartach` a thaispeántar thíos:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Déanann an conradh seo _seiceáil_ ar iarmhéid an úsáideora, feidhmíonn sé _éifeachtaí_ an `aistarraing()` (trí iarmhéid an úsáideora a athshocrú go 0), agus leanann sé ar aghaidh chun an _idirghníomhaíocht_ a dhéanamh (ETH a sheoladh chuig seoladh an úsáideora). Cinntíonn sé seo go ndéanann an conradh a stóras a nuashonrú roimh an nglao seachtrach, rud a chuireann deireadh leis an gcoinníoll athiontrála a chumasaigh an chéad ionsaí. D'fhéadfaí an conradh `Ionsaitheoir` a ghlaoch ar ais go `NoLongerAVictim` fós, ach ós rud é go bhfuil `iarmhéideanna[msg.sender]` socraithe go 0, léireoidh aistarraingtí breise earráid.

Rogha eile is ea glas eisiatachta fhrithpháirtigh a úsáid (ar a dtugtar “mutex” de ghnáth) a ghlasálann cuid de stát conartha go dtí go gcríochnaítear agairt feidhme. Cuirtear é seo i bhfeidhm le hathróg Boole a shocraítear go `true` sula bhfeidhmíonn an fheidhm agus a fhilleann go `false` tar éis an agairt a dhéanamh. Mar atá sa sampla thíos, cosnaíonn úsáid mutex feidhm ar ghlaonna athfhillteacha agus an agairt bhunaidh fós ag próiseáil, rud a chuireann stop le hathiontráil.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    // Déanann an ráiteas `return` luacháil go `true` ach fós déanann sé `locked = false` measúnú ar an ráiteas sa mhodhnóir
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Is féidir leat córas [tarraingt íocaíochtaí](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) a úsáid freisin a éilíonn ar úsáideoirí cistí a aistarraingt ó na conarthaí cliste, in ionad córas "brú-íocaíochtaí" a sheolann cistí chuig cuntais. Cuireann sé seo deireadh leis an bhféidearthacht cód a spreagadh gan chuimhneamh ag seoltaí anaithnide (agus féadann sé ionsaithe áirithe diúltú seirbhíse a chosc freisin).

#### Gannsreabhadh agus róshreabhadh slánuimhreacha {#integer-underflows-and-overflows}

Tarlaíonn róshreabhadh slánuimhir nuair a thiteann torthaí oibríochta uimhríochta lasmuigh den raon luachanna inghlactha, rud a fhágann “rolladh anonn” go dtí an luach inléirithe is ísle. Mar shampla, ní féidir le `uint8` ach luachanna suas go 2^8-1=255 a stóráil. Déanfaidh oibríochtaí uimhríochta a mbíonn luachanna níos airde ná `255` mar thoradh orthu róshreabhadh agus athshocróidh siad `uint` go `0`, mar a athshocraíonn an odaiméadair ar charr go 0 uair amháin sroicheann sé an t-uasmhílteáiste (999999).

Tarlaíonn foshreafaí slánuimhir ar chúiseanna comhchosúla: titeann torthaí oibríochta uimhríochta faoin raon inghlactha. Abair go ndearna tú iarracht `0` a laghdú i `uint8`, ní bheadh ​​ann ach an toradh a rolladh anonn go dtí an t-uasluach inléirithe (`255`).

D’fhéadfadh athruithe gan choinne ar athróga stáit an chonartha a bheith mar thoradh ar róshreabhadh agus ar ghannsreabhadh agus is féidir rith neamhphleanáilte a bheith mar thoradh air. Seo thíos sampla a thaispeánann conas is féidir le hionsaitheoir leas a bhaint as róshreabhadh uimhríochta i gconradh cliste chun oibríocht neamhbhailí a dhéanamh:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Conas gannsreabhadh agus róshreabhadh slánuimhir a chosc

Ón leagan 0.8.0, diúltaíonn an tiomsaitheoir Solidity cód a mbíonn gannsreafaí agus rósreafaí slánuimhir mar thoradh air. Mar sin féin, ba cheart do chonarthaí arna dtiomsú le leagan tiomsaitheora níos ísle seiceálacha a dhéanamh ar fheidhmeanna a bhaineann le hoibríochtaí uimhríochta nó úsáid a bhaint as leabharlann (m.sh., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) a sheiceálann le haghaidh gannsreabhadh/róshreabhadh.

#### Ionramháil Oracle {#oracle-manipulation}

Foinsíonn [Oracail](/developers/docs/oracles/) faisnéis atá as slabhra agus seolann siad ar slabhra í le húsáid ag conarthaí cliste. Le horacail, is féidir leat conarthaí cliste a dhearadh a idirghníomhaíonn le córais as slabhra, mar mhargaí caipitil, ag leathnú a bhfeidhmiú go mór.

Ach má bhíonn an t-oracal truaillithe agus faisnéis chontráilte á chur aige ar slabhra, rithfear conarthaí cliste bunaithe ar ionchuir earráideacha, rud a d'fhéadfadh fadhbanna a chruthú. Is é seo bunús an “fhadhb oracail”, a bhaineann lena chinntiú go bhfuil faisnéis ó oracal bhlocshlabhra cruinn, cothrom le dáta agus tráthúil.

Ábhar imní slándála gaolmhar is ea oracal ar slabhra a úsáid, amhail malartán díláraithe, chun spotphraghas sócmhainne a fháil. Is minic a dhéanann ardáin iasachtaithe sa tionscal [airgeadais díláraithe (DeFi)](/defi/) é seo chun luach comhthaobhachta úsáideora a chinneadh chun a fháil amach cé mhéad is féidir leo a fháil ar iasacht.

Is minic a bhíonn praghsanna DEX cruinn, go príomha mar gheall ar arbatráisteoirí ag athbhunú paireacht sna margaí. Mar sin féin, is féidir iad a ionramháil, go háirithe má ríomhann an t-oracal ar slabhra praghsanna sócmhainní bunaithe ar phatrúin trádála stairiúla (mar a bhíonn de ghnáth).

Mar shampla, d'fhéadfadh ionsaitheoir spotphraghas sócmhainne a chaidéalú go saorga trí splanc-iasacht a fháil díreach roimh idirghníomhú le do chonradh iasachta. Dá gcuirfí ceist ar an DEX faoi phraghas na sócmhainne, thabharfadh sé luach níos airde ná an gnáthluach (mar gheall ar éileamh mór “ordú ceannaigh” an ionsaitheora ar an tsócmhainn), rud a ligeann dóibh níos mó a fháil ar iasacht ná mar ba chóir. Baineadh úsáid as "ionsaithe splanc iasachta" den sórt sin chun leas a bhaint as brath ar oracail phraghais i measc iarratais DeFi, rud a chosnaíonn na milliúin prótacail i gcistí caillte.

##### Conas ionramháil oracail a chosc

Is é an t-íosriachtanas chun [ionramháil oracail a sheachaint](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) ná líonra díláraithe oracail a úsáid a cheistíonn faisnéis ó fhoinsí iolracha chun pointí aonair teipe a sheachaint. I bhformhór na gcásanna, tá dreasachtaí cripteacnamaíocha tógtha ag oracail dhíláraithe chun nóid oracail a spreagadh chun faisnéis cheart a thuairisciú, rud a fhágann go bhfuil siad níos sláine ná oracail láraithe.

Má tá sé ar intinn agat ceist a chur ar oracal ar slabhra maidir le praghsanna sócmhainne, smaoinigh ar cheann a úsáid a chuireann meicníocht meánphraghais ualaithe ó thaobh ama (TWAP) i bhfeidhm. Ceistíonn [TWAP oracle](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) praghas sócmhainne ag dhá phointe éagsúla ama (a dhéanann tú is féidir é a mhodhnú) agus ríomhann sé an spotphraghas bunaithe ar an meán a fhaightear. Má roghnaíonn tú tréimhsí ama níos faide, cosnaíonn tú do phrótacal in aghaidh ionramhála praghsanna toisc nach féidir le horduithe móra a rinneadh le déanaí tionchar a imirt ar phraghsanna sócmhainní.

## Acmhainní slándála conartha cliste d'fhorbróirí {#smart-contract-security-resources-for-developers}

### Uirlisí chun conarthaí cliste a anailísiú agus chun cruinneas an chóid a fhíorú {#code-analysis-tools}

- **[Uirlisí tástála agus leabharlanna](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Bailiúchán uirlisí agus leabharlann de chaighdeán an tionscail chun tástálacha aonaid a dhéanamh, anailís statach, agus anailís dhinimiciúil ar chonarthaí cliste._

- **[Uirlisí fíoraithe foirmiúla](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Uirlisí chun cruinneas feidhme i gconarthaí cliste a fhíorú agus chun malairtí a sheiceáil._

- **[Seirbhísí cliste iniúchóireachta conartha](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Liosta de na heagraíochtaí a sholáthraíonn seirbhísí iniúchta conarthaí cliste do thionscadail forbartha Ethereum._

- **[Ardáin deolchaire fabht](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Ardáin chun deolchairí fabhtanna a chomhordú agus luach saothair a thabhairt do nochtadh freagrach leochaileachtaí ríthábhachtacha i gconarthaí cliste._

- **[Seiceálaí Forc](https://forkchecker.hashex.org/)** - _Uirlis in aisce ar líne chun gach faisnéis atá ar fáil maidir le conradh foirc a sheiceáil._

- **[Ionchódóir ABI](https://abi.hashex.org/)** - _ Seirbhís saor in aisce ar líne chun feidhmeanna do chonartha Solidity agus argóintí cruthaitheora a ionchódú._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Anailíseoir Statach Solidity, ag trasnú na gCrann Comhréire Teibí (AST) chun leochaileachtaí amhrasta a aimsiú agus saincheisteanna a phriontáil amach i bhformáid marcáil síos atá éasca le tomhailt._

### Uirlisí chun monatóireacht a dhéanamh ar chonarthaí cliste {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** - _Uirlis chun fógraí fíor-ama a fháil nuair a tharlaíonn imeachtaí neamhghnácha nó gan choinne ar do chonarthaí nó ar do sparáin chliste._

### Uirlisí le haghaidh riarachán slán chonarthaí cliste {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _ Sparán conartha cliste ag rith ar Ethereum a éilíonn líon íosta daoine chun idirbheart a cheadú sular féidir leis tarlú (M-de-N)._

- **[Conarthaí OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)** - _Leabharlanna conartha chun gnéithe riaracháin a chur i bhfeidhm, lena n-áirítear úinéireacht conartha, uasghráduithe, rialuithe rochtana, rialachas, sos-ábaltacht, agus go leor eile._

### Seirbhísí cliste iniúchta conartha {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Conradh cliste seirbhís iniúchta ag cabhrú le tionscadail ar fud an éiceachóras blocshlabhra a chinntiú go bhfuil a gcuid prótacail réidh le seoladh agus tógtha chun úsáideoirí a chosaint._

- **[CertiK](https://www.certik.com/)** - _Gnólacht slándála blocshlabhra le ceannródaíocht a dhéanamh ar úsáid na teicneolaíochta Fíorúcháin fhoirmiúil cheannródaíoch ar chonarthaí cliste agus líonraí blocshlabhra._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Cuideachta chíbearshlándála a chomhcheanglaíonn taighde slándála le meon ionsaitheora chun riosca a laghdú agus cód a neartú._

- **[PeckShield](https://peckshield.com/)** - _Cuideachta slándála Blocshlabhra a thairgeann táirgí agus seirbhísí ar mhaithe le slándáil, príobháideacht agus inúsáidteacht an éiceachóras blocshlabhra ar fad._

- **[QuantStamp](https://quantstamp.com/)** - _Seirbhís iniúchta a éascaíonn glacadh príomhshrutha le teicneolaíocht blocshlabhra trí sheirbhísí slándála agus measúnaithe riosca._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _ Cuideachta conartha cliste slándála a sholáthraíonn iniúchtaí slándála ar chórais dáilte._

- **[Fíorú Am Reatha](https://runtimeverification.com/)** - _ Cuideachta slándála a dhéanann sainchúram de shamhaltú foirmiúil agus fíorú conarthaí cliste._

- **[Hacken](https://hacken.io)** - _ Iniúchóir cibearshlándála Web3 le cur chuige 360-céim maidir le slándáil blocshlabhra. _

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _ Seirbhísí iniúchta Solidity agus Cairo, ag cinntiú sláine conarthaí cliste agus sábháilteacht úsáideoirí ar fud Ethereum agus Starknet._

- **[HashEx](https://hashex.org/)** - _Díríonn HashEx ar bhlocshlabhra agus iniúchadh conartha cliste chun slándáil criptea-airgeadraí a chinntiú, ag soláthar seirbhísí cosúil le forbairt conarthaí cliste, bréagionsaithe tástála, comhairliúchán blocshlabhra._

- **[Code4rena](https://code4rena.com/)** - _Ardán iniúchta iomaíoch a spreagann saineolaithe slándála conartha cliste chun leochaileachtaí a aimsiú agus cabhrú le web3 a dhéanamh níos sláine._

- **[CodeHawks](https://codehawks.com/)** - _Ardán iniúchtaí iomaíoch a dhéanann óstáil ar chomórtais iniúchta cliste do thaighdeoirí slándála._

- **[Cyfriin](https://cyfrin.io)** - _Lárionad cumhachta slándála Web3, ag goradh criptea-shlándáil trí tháirgí agus seirbhísí iniúchta conarthaí cliste._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _Gnólacht slándála Web3 a thairgeann iniúchtaí slándála ar chórais blocshlabhra trí fhoireann iniúchóirí a bhfuil taithí acu agus uirlisí den scoth._

- **[Oxorio](https://oxor.io/)** - _Iniúchtaí conartha cliste agus blocshlabhra seirbhísí slándála le saineolas ar EVM, Solidity, ZK, teicneolaíocht tras-shlabhra do ghnólachtaí cripte agus tionscadail DeFi._

- **[Inference](https://inference.ag/)** - _Cuideachta iniúchta slándála, le sainchúram in iniúchadh conartha cliste le haghaidh blocshlabhra EVM-bhunaithe. A bhuí lena n-iniúchóirí saineolacha sainaithníonn siad fadhbanna a d’fhéadfadh a bheith ann agus molann siad réitigh inghníomhaithe chun iad a réiteach roimh imscaradh._

### Ardáin deolchairí lochtanna {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _ardán deolchaire fabhtanna le haghaidh conarthaí cliste agus tionscadail DeFi, ina ndéanann taighdeoirí slándála athbhreithniú ar an gcód, le leochaileachtaí a nochtadh, íocaíocht a fháil, agus criptiúchán níos sábháilte a dhéanamh._

- **[HackerOne](https://www.hackerone.com/)** - _Comhordú leochaileachta agus ardáin deolchaire fabhtanna a nascann gnólachtaí le tástálaithe bréagionsaithe agus taighdeoirí cibearshlándála._

- **[HackenProof](https://hackenproof.com/)** - _Sain-ardáin deilchaire fabhtanna do tionscadail cripte (DeFi, Conarthaí Cliste, Sparán, CEX agus tuilleadh), ina soláthraíonn gairmithe slándála seirbhísí triáise agus ina n-íoctar taighdeoirí as tuarascálacha ábhartha, fíoraithe faoi fhabht._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Frithgheallaí in Web3 maidir le slándáil conarthaí cliste, le híocaíochtaí d’iniúchóirí arna mbainistiú trí chonarthaí cliste chun a chinntiú go n-íoctar fabhtanna ábhartha go cothrom._

-  **[CodeHawks](https://www.codehawks.com/)** - _ Ardáin iomaíoch deolchaire fabhtanna ina nglacann iniúchóirí páirt i gcomórtais agus i ndúshláin slándála, agus (go luath) ina n-iniúchtaí príobháideacha féin._

### Foilseacháin ar leochaileachtaí agus ar shaothair conartha cliste aitheanta {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Ionsaithe Aitheanta ar Chonarthaí Cliste](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Míniú sothuigthe do thosaitheoirí ar na leochaileachtaí conartha is suntasaí, le cód samplach d'fhormhór na gcásanna._

- **[Clárlann SWC](https://swcregistry.io/)** - _Liosta coimeádta de Mhíreanna Áirimh Laige Coitianta (CWE) a bhaineann le conarthaí cliste Ethereum._

- **[Rekt](https://rekt.news/)** - _Foilseachán a nuashonraítear go rialta de haiceanna agus dúshaothair ardphróifíle cripte, mar aon le tuarascálacha mionsonraithe iarbháis._

### Dúshláin maidir le slándáil conartha cliste a fhoghlaim {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF ](https://github.com/blockthreat/blocksec-ctfs)** -_Liosta coimeádta de chluichí cogaidh slándála blocshlabhra, dúshláin, agus comórtais [Gabháil na Brataí](https://www.webopedia.com/definitions/ctf-event/amp/) agus réiteach scríbhinní._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Cluiche cogaidh chun slándáil ionsaitheach conarthaí cliste DeFi a fhoghlaim agus scileanna a fhorbairt i bhfiach fabhtanna agus in iniúchadh slándála._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Cluiche cogaidh bunaithe ar Web3/Solidity mar a bhfuil gach leibhéal ina chonradh cliste nach mór a 'haiceáil'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _ Dúshlán cliste haiceála conartha, suite in eachtra fantaisíochta. Má chuirtear an dúshlán i gcrích go rathúil tugtar rochtain freisin ar chlár príobháideach deolchaire fabhtanna._

### Na cleachtais is fearr chun conarthaí cliste a dhaingniú {#smart-contract-security-best-practices}

- **[ConsenSys: Dea-Chleachtais Slándála Conarthaí Cliste Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Liosta cuimsitheach treoirlínte chun conarthaí cliste Ethereum a dhaingniú._

- **[Nascent: Uirlisí Slándála Simplí](https://github.com/nascentxyz/simple-security-toolkit)** - _Bailiúchán de threoracha praiticiúla atá dírithe ar shlándáil agus seicliostaí chun conarthaí cliste a fhorbairt._

- **[Patrúin Solidity](https://fravoll.github.io/solidity-patterns/)** - _Tiomsú úsáideach de phatrúin shlána agus de dhea-chleachtais do theanga ríomhchlárúcháin na gconarthaí cliste Solidity._

- **[Doiciméid Solidity: Cúrsaí Slándála](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Treoirlínte chun conarthaí cliste slána a scríobh le Solidity._

- **[Caighdeán Fíoraithe Slándála Conarthaí Cliste](https://github.com/securing/SCSVS)** - _Seicliosta ceithre pháirt déag cruthaithe chun slándáil conarthaí cliste a chaighdeánú d’fhorbróirí, d’ailtirí, d’athbhreithneoirí slándála agus do dhíoltóirí._

- **[Foghlaim Slándáil agus Iniúchadh Conarthaí Cliste](https://updraft.cyfrin.io/courses/security)** - _Cúrsa deiridh um shlándáil agus iniúchadh conartha cliste, cruthaithe d'fhorbróirí conarthaí cliste atá ag iarraidh a gcuid cleachtais slándála is fearr a fheabhsú agus a bheith ina dtaighdeoirí slándála._

### Teagaisc ar shlándáil conarthaí cliste {#tutorials-on-smart-contract-security}

- [Conas conarthaí cliste slán a scríobh](/developers/tutorials/secure-development-workflow/)

- [Conas Slither a úsáid chun fabhtanna conartha cliste a aimsiú](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Conas Manticore a úsáid chun fabhtanna conartha cliste a aimsiú](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Treoir maidir le slándáil conarthaí cliste](/developers/tutorials/smart-contract-security-guidelines/)

- [Conas do chonradh dearbhán a chomhtháthú go sábháilte le comharthaí treallacha](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Cúrsa iomlán slándála conarthaí cliste agus iniúchta](https://updraft.cyfrin.io/courses/security)
