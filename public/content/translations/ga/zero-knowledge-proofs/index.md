---
title: Cruthúnais nialais-eolais
description: Réamhrá neamhtheicniúil ar chruthúnas nialas-eolais do thosaitheoirí.
lang: ga
---

# Cad iad cruthúnais nial-eolais? {#what-are-zk-proofs}

Is bealach é cruthúnas nial-eolais chun bailíocht ráitis a chruthú gan an ráiteas féin a nochtadh. Is é an promhadóir (nó ‘prover’) an páirtí atá ag iarraidh éileamh a chruthú, agus is é an ‘fíoraitheoir’ atá freagrach as an éileamh a bhailíochtú.

Léiríodh cruthúnais nial-eolais ar dtús i bpáipéar 1985, “[Castacht an eolais i gcórais cruthúnais idirghníomhacha](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” ina sholáthraítear sainmhíniú ar cruthúnais nial-eolais a úsáidtear go forleathan inniu:

> Is modh é prótacal nial-eolais trína bhféadfaidh páirtí amháin (an promhadóir) **a chruthú** do pháirtí eile (an fíoraitheoir) **go bhfuil rud éigin fíor, gan aon fhaisnéis a nochtadh** seachas go bhfuil an ráiteas sonrach seo fíor.

Tá feabhas tagtha ar na cruthúnais nial-eolais thar na blianta agus tá siad á n-úsáid anois i roinnt feidhmeanna fíordhomhain.

<YouTube id="fOGdb1CTu5c" />

## Cén fáth a bhfuil cruthúnais nial-eolais de dhíth orainn? {#why-zero-knowledge-proofs-are-important}

Bhí cruthúnais nial-eolais chun cinn sa chripteagrafaíocht fheidhmeach, mar gheall go bhfeabhsódh siad slándáil faisnéise do dhaoine aonair. Smaoinigh ar conas a d’fhéadfá éileamh a chruthú (m.sh., “Is saoránach de thír X mé”) chuig páirtí eile (m.sh., soláthraí seirbhíse). Bheadh ​​ort “fianaise” a sholáthar chun d’éileamh a thacú, amhail pas náisiúnta nó ceadúnas tiomána.

Ach tá fadhbanna leis an gcur chuige seo, go háirithe an easpa phríobháideachta. Stóráiltear Faisnéis Inaitheanta Pearsanta (PII) a roinntear le seirbhísí tríú páirtí i mbunachair sonraí lárnacha, atá i mbaol haiceála. Agus goid céannachta ag éirí ina ceist ríthábhachtach, tá cuid daoine ag éileamh modhanna cosanta príobháideachais chun faisnéis íogair a roinnt.

Réitíonn cruthúnais nial-eolais an fhadhb seo trí **dheireadh a chur leis an ngá atá le faisnéis a nochtadh chun bailíocht éilimh a chruthú**. Úsáideann an prótacal nial-eolais an ráiteas (ar a dtugtar ‘finné’) mar ionchur chun cruthúnas gonta ar a bhailíocht a chruthú. Tugann an cruthúnas seo ráthaíochtaí láidre go bhfuil ráiteas fíor gan an fhaisnéis a úsáideadh chun é a chruthú a nochtadh.

Ag dul ar ais chuig ár sampla níos luaithe, is é an t-aon fhianaise atá uait chun d’éileamh saoránachta a chruthú ná cruthúnas nial-eolais. Ní gá don fhíoraitheoir ach seiceáil an bhfuil airíonna áirithe an chruthúnais fíor chun a bheith cinnte go bhfuil an bunráiteas fíor freisin.

## Cásanna úsáide le haghaidh cruthúnais nial-eolais {#use-cases-for-zero-knowledge-proofs}

### Íocaíochtaí gan ainm {#anonymous-payments}

Is minic a bhíonn íocaíochtaí le cárta creidmheasa le feiceáil ag an iomad páirtí, lena n-áirítear an soláthraí íocaíochtaí, bainc agus páirtithe leasmhara eile (m.sh., údaráis rialtais). Cé go bhfuil buntáistí ag faireachas airgeadais chun gníomhaíocht mhídhleathach a shainaithint, baineann sé an bonn de phríobháideachas na ngnáthshaoránach freisin.

Bhí sé mar aidhm ag cripte-airgeadraí bealach a sholáthar d'úsáideoirí chun idirbhearta príobháideacha, piaraí le piaraí a dhéanamh. Ach tá formhór na n-idirbheart criptea-airgeadraí le feiceáil go hoscailte ar bhlocshlabhra poiblí. Is minic a bhíonn féiniúlachtaí úsáideora bréige agus nasctar iad go toiliúil le féiniúlachtaí fíorshaol (m.sh. trí sheoltaí ETH a chur san áireamh ar phróifílí Twitter nó GitHub) nó is féidir iad a nascadh le féiniúlachtaí sa saol fíor ag baint úsáide as anailís bhunúsach ar shonraí agus as slabhra.

Tá “boinn phríobháideachais” ar leith ann atá deartha le haghaidh idirbhearta go hiomlán gan ainm. Trí bhlocshlabhraí atá dírithe ar phríobháideacht, mar shampla Zcash agus Monero, tugtar cosaint do shonraí idirbhirt, lena n-áirítear seoltaí seoltóra/glacadóir, cineál sócmhainne, cainníocht agus amlíne an idirbhirt.

Tríd an teicneolaíocht eolais ar bhonn nialasach a ghlacadh isteach sa phrótacal, ceadaíonn líonraí [blocshlabhra](/glossary/#blockchain) atá dírithe ar phríobháideachas [nóid](/glossary/#node) chun idirbhearta a bhailíochtú gan gá rochtain a fháil ar shonraí idirbhirt. Is sampla é [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) de dhearadh atá beartaithe a chumasóidh aistrithe príobháideacha dúchasacha de luach ar blocshlabhra Ethereum. Tá sé deacair, áfach, moltaí den sórt sin a chur chun feidhme mar gheall ar mheascán d’ábhair imní maidir le slándáil, rialú agus UX.

**Tá cruthúnais nial-eolais á gcur i bhfeidhm freisin maidir le hidirbhearta ar bhlocshlabhraí poiblí a anaithnidiú**. Sampla is ea Tornado Cash, seirbhís dhíláraithe, neamhchoinneálach trína ligtear d’úsáideoirí idirbhearta príobháideacha a dhéanamh ar Ethereum. Úsáideann Tornado Cash cruthúnais nial-eolais chun sonraí idirbhirt a cheilt agus chun príobháideacht airgeadais a ráthú. Ar an drochuair, toisc gur uirlisí príobháideachais “diúltaithe” iad seo tá baint acu le gníomhaíocht aindleathach. Chun é seo a shárú, caithfidh príobháideacht a bheith ina réamhshocrú ar bhlocshlabhra poiblí ar deireadh.

### Cosaint aitheantais {#identity-protection}

Le córais reatha bhainistíochta céannachta cuirtear faisnéis phearsanta i mbaol. Is féidir le cruthúnais nial-eolais cabhrú le daoine aonair céannacht a bhailíochtú agus sonraí íogaire a chosaint.

Tá cruthúnais nial-eolais an-úsáideach i gcomhthéacs [céannacht díláraithe](/decentralized-identity/). Tugann céannacht dhíláraithe (a dtugtar ‘féiniúlacht fhéincheannasach’ uirthi freisin) an cumas don duine rochtain ar aitheantóirí pearsanta a rialú. Is sampla maith é do shaoránacht a chruthú gan do chéannacht cánach nó do shonraí pas a nochtadh den chaoi a gcumasaíonn teicneolaíocht nial-eolais céannacht dhíláraithe.

### Cruthúnas na Daonnachta {#proof-of-humanity}

Ceann de na samplaí is forleithne de chruthúnais nialasacha eolais atá i mbun gnímh inniu ná an [prótacal Domhanda ID](https://world.org/blog/world/world-id-faqs), ar féidir smaoineamh air mar “pas digiteach domhanda d’aois na hintleachta saorga.” Ligeann sé do dhaoine a chruthú gur daoine uathúla iad gan faisnéis phearsanta a nochtadh. Baintear é seo amach trí fheiste ar a dtugtar an Orb, a scanann iris duine agus a ghineann cód iris. Déantar cód an iris a sheiceáil agus a fhíorú chun a dhearbhú gur duine uathúil ó thaobh na bitheolaíochta de an duine. Tar éis fíoraithe, cuirtear gealltanas céannachta a ghintear ar ghléas an úsáideora (agus nach bhfuil nasctha leis na sonraí bithmhéadracha ná díorthaithe uathu) le liosta slán ar an blocshlabhra. Ansin, aon uair is mian leis an úsáideoir a chruthú gur duine fíoraithe iad – bíodh sé chun síniú isteach, vótáil, nó gníomhartha eile a dhéanamh – is féidir leo cruthúnas eolais nialasach a ghiniúint a dhearbhaíonn a mballraíocht sa liosta. Is é áilleacht cruthúnas eolais nialasach a úsáid ná nach nochtar ach ráiteas amháin: tá an duine seo uathúil. Fanann gach rud eile príobháideach.

Braitheann World ID ar an [prótacal Semaphore](https://docs.semaphore.pse.dev/) arna fhorbairt ag an [foireann PSE](https://pse.dev/) ag Fondúireacht Ethereum. Tá Semaphore deartha le bheith ina bhealach éadrom ach cumhachtach chun cruthúnais eolais nialasacha a ghiniúint agus a fhíorú. Ligeann sé d'úsáideoirí a chruthú gur cuid de ghrúpa iad (daoine fíoraithe sa chás seo) gan a thaispeáint cé acu ball den ghrúpa iad. Tá Semaphore an-solúbtha freisin, rud a cheadaíonn grúpaí a chruthú bunaithe ar raon leathan critéar amhail fíorú céannachta, rannpháirtíocht in imeachtaí, nó úinéireacht dintiúir.

### Fíordheimhniú {#authentication}

Ní mór do chéannacht agus do cheart chun rochtain a fháil ar na hardáin sin a chruthú chun seirbhísí ar líne a úsáid. Éilíonn sé seo go minic faisnéis phearsanta a sholáthar, amhail ainmneacha, seoltaí ríomhphoist, dátaí breithe, agus mar sin de. Seans go mbeidh ort pasfhocail fhada a chur de ghlanmheabhair nó go gcaillfidh tú rochtain.

Is féidir le cruthúnais nial-eolais, áfach, fíordheimhniú a shimpliú d’ardáin agus d’úsáideoirí araon. Nuair a bheidh cruthúnas ZK ginte trí úsáid a bhaint as ionchuir phoiblí (m.sh., sonraí a fhianaíonn ballraíocht an úsáideora ar an ardán) agus ionchuir phríobháideacha (m.sh., sonraí an úsáideora), is féidir leis an úsáideoir é a chur i láthair go simplí chun a chéannacht a fhíordheimhniú nuair is gá dóibh rochtain a fháil ar an tseirbhís. Feabhsaíonn sé sin an taithí d’úsáideoirí agus saorann sé eagraíochtaí ón ngá atá le méideanna ollmhóra faisnéise úsáideoirí a stóráil.

### Ríomh infhíoraithe {#verifiable-computation}

Feidhm eile de theicneolaíocht nial-eolais is ea ríomh infhíoraithe chun dearaí blocshlabhra a fheabhsú. Ligeann ríomhaireacht infhíoraithe dúinn ríomh a sheachfhoinsiú chuig aonán eile agus torthaí infhíoraithe á gcoinneáil againn. Cuireann an t-eintiteas an toradh isteach mar aon le cruthúnas a fhíoraíonn gur cuireadh an clár i gcrích i gceart.

Tá ríomh infhíoraithe **ríthábhachtach chun luasanna próiseála ar bhlocshlabhraí a fheabhsú** gan slándáil a laghdú. Chun é seo a thuiscint ní mór fios a bheith agat faoi na difríochtaí i réitigh mholta le haghaidh scálú Ethereum.

Éilíonn [ Réitigh scálaithe ar slabhra](/developers/docs/scaling/#onchain-scaling), amhail bearradh, modhnú fairsing ar bhunchiseal an blocshlabhra. Mar sin féin, tá an cur chuige seo an-chasta agus is féidir le hearráidí sa chur i bhfeidhm an bonn a bhaint de mhúnla slándála Ethereum.

[ Maidir le réitigh scálaithe as slabhra,](/developers/docs/scaling/#offchain-scaling) ní gá an croíphrótacal Ethereum a athdhearadh. Ina áit sin bíonn siad ag brath ar mhúnla ríomha seachfhoinsithe chun tréchur a fheabhsú ar bhunchiseal Ethereum.

Seo mar a oibríonn sé sin go praiticiúil:

- In ionad gach idirbheart a phróiseáil, díluchtaíonn Ethereum an forghníomhú go slabhra ar leith.

- Tar éis idirbhearta a phróiseáil, cuireann an slabhra eile na torthaí ar ais le cur i bhfeidhm ar staid Ethereum.

Is é an buntáiste atá leis seo ná nach gcaithfidh Ethereum aon fhorghníomhú a dhéanamh agus ní gá dó ach torthaí ó ríomh foinsithe allamuigh a chur i bhfeidhm ar a stát. Laghdaíonn sé seo brú tráchta líonra agus feabhsaítear luasanna idirbhirt freisin (bíonn prótacail as slabhra optamaithe le go gcuirfear i gcrích iad níos tapúla).

Teastaíonn bealach ón slabhra chun idirbhearta as slabhra a bhailíochtú gan iad a ath-fhorghníomhú, nó caillfear luach an fhorghníomhaithe as slabhra.

Seo an áit a dtagann ríomh infhíoraithe i bhfeidhm. Nuair a dhéanann nód idirbheart lasmuigh de Ethereum, cuireann sé cruthúnas eolais ar bhonn nailasach isteach chun cruinneas forghníomhaithe as slabhra a chruthú. Cinntíonn an cruthúnas seo (ar a dtugtar [cruthúnas bailíochta](/glossary/#validity-proof)) go bhfuil idirbheart bailí, rud a ligeann d'Ethereum an toradh a chur i bhfeidhm ina stát - gan fanacht le haon duine a dhíospóid.

Dhá réiteach scálaithe as slabhra is ea [rollta eolais ar bhonn nialasach](/developers/docs/scaling/zk-rollups) agus [validiums](/developers/docs/scaling/validium/)a úsáideann cruthúnais bhailíochta chun inscálaitheacht shlán a sholáthar. Déanann na prótacail seo na mílte idirbheart a fhorghníomhú as slabhra agus cuireann siad isteach cruthúnais le fíorú ar Ethereum. Is féidir na torthaí sin a chur i bhfeidhm láithreach tar éis an cruthúnas a fhíorú, rud a ligeann d'Ethereum níos mó idirbheart a phróiseáil gan ríomh a mhéadú ar an mbonnchiseal.

### Breabaireacht agus claonpháirteachas sa vótáil ar slabhra a laghdú {#secure-blockchain-voting}

Tá go leor tréithe fabhracha ag scéimeanna vótála blocshlabhra: tá siad in-iniúchta go hiomlán, slán i gcoinne ionsaithe, frithsheasmhach do chinsireacht, agus saor ó shrianta geografacha. Ach níl fiú scéimeanna vótála ar slabhra díolmhaithe ó fhadhb an **chlaonpháirteachais**.

Agus é sainmhínithe mar “comhordú chun iomaíocht oscailte a theorannú trí mheabhlaireacht, calaois a dhéanamh agus daoine eile a chur amú,” d’fhéadfadh claonpháirteachas a bheith i bhfoirm gníomhaí mailíseach a imríonn tionchar ar vótáil trí bhreabanna a thairiscint. Mar shampla, seans go bhfaighidh Alice breab ó Bob chun vótáil ar son `rogha B` ar bhallóid fiú más fearr léi `rogha A`.

Cuireann breabaireacht agus claonpháirteachas teorainn le héifeachtacht aon phróisis a úsáideann vótáil mar mheicníocht chomharthaíochta (go háirithe nuair is féidir le húsáideoirí a chruthú conas a vótáil siad). D’fhéadfaí go mbeadh iarmhairtí suntasacha ag baint leis sin, go háirithe i gcás ina bhfuil leithdháileadh na n-acmhainní ganna ag brath ar na vótaí.

Mar shampla, braitheann [meicníochtaí cuardratacha cistiúcháin](https://www.radicalxchange.org/concepts/plural-funding/) ar thabhartais chun tosaíocht a thomhas do roghanna áirithe i measc tionscadal leasa phoiblí éagsúla. Áirítear gach deonachán mar "vóta" do thionscadal ar leith, agus is iad na tionscadail a fhaigheann níos mó vótaí a thugtar níos mó cistí dóibh ón linn meaitseála.

Má úsáidtear vótáil ar shlabhra, is féidir cistiú cearnach a dhéanamh soghabhálach don chlaonpháirteachas: bíonn idirbhearta blocshlabhra poiblí, mar sin is féidir le breabairí gníomhaíocht ar slabhra an duine ar tugadh breab dó a fheiceáil chun féachaint ar conas a “vótáil" siad. Ar an mbealach seo cuirtear stop le maoiniú cuadratach a bheith ina mhodh éifeachtach chun cistí a leithdháileadh bunaithe ar roghanna comhiomlánaithe an phobail.

Ar an dea-uair, tá réitigh níos nuaí cosúil le MACI (Bonneagar Frith-Cholaiteachta Íosta) ag baint úsáide as cruthúnais nialaischun vótáil ar slabhra (m. sh., meicníochtaí cistiúcháin cearnacha) a dhéanamh in aghaidh breabaireachta agus claonpháirteachais. Is sraith de chonarthaí cliste agus scripteanna é MACI a ligeann do riarthóir lárnach (ar a dtugtar "comhordaitheoir") vótaí agus torthaí a chomhiomlánú _gan_ sonraí a nochtadh faoin gcaoi ar vótáil gach duine. Mar sin féin, is féidir a fhíorú go fóill gur comhairíodh na vótaí i gceart, nó a dheimhniú gur ghlac duine ar leith páirt sa bhabhta vótála.

#### Conas a oibríonn MACI le cruthúnais nial-eolais? {#how-maci-works-with-zk-proofs}

Ag an tús, úsáideann ​​an comhordaitheoir an conradh MACI ar Ethereum, agus ina dhiaidh sin is féidir le húsáideoirí clárú le haghaidh vótála (trína eochair phoiblí a chlárú sa chonradh cliste). Chaith úsáideoirí vótaí trí theachtaireachtaí criptithe lena n-eochair phoiblí a sheoladh chuig an gconradh cliste (ní mór vóta bailí a shíniú leis an eochair phoiblí is déanaí a bhaineann le céannacht an úsáideora, i measc critéar eile). Ina dhiaidh sin, próiseálann an comhordaitheoir gach teachtaireacht a luaithe a chríochnaíonn an tréimhse vótála, suimíonn sé na vótaí, agus fíoraíonn sé na torthaí ar shlabhra.

In MACI, baintear úsáid as cruthúnais nial-eolais chun beachtas na ríomha a chinntiú trína dhéanamh dodhéanta don chomhordaitheoir vótaí agus torthaí scóir a phróiseáil go mícheart. Baintear é seo amach trína cheangal ar an gcomhordaitheoir cruthúnais ZK-SNARK a ghiniúint lena bhfíorófar a) gur próiseáladh gach teachtaireacht i gceart b) go gcomhfhreagraíonn an toradh deiridh do shuim na vótaí _bailí_ go léir.

Mar sin, fiú gan miondealú ar na vótaí in aghaidh an úsáideora a roinnt (mar a bhíonn de ghnáth), ráthaíonn MACI sláine na dtorthaí a ríomhtar le linn an phróisis scóir. Tá an ghné seo úsáideach chun éifeachtacht na scéimeanna bunúsacha claonpháirteacha a laghdú. Is féidir linn an fhéidearthacht seo a iniúchadh trí úsáid a bhaint as an sampla roimhe seo de Bob ag breabadh ar Alice chun vótáil ar son rogha:

- Cláraíonn Alice chun vótáil trína n-eochair phoiblí a sheoladh chuig conradh cliste.
- Aontaíonn Alice vótáil ar son `rogha B` mar mhalairt ar bhreab ó Bob.
- Vótáil Alice ar son `rogha B`.
- Seolann Alice go rúnda idirbheart criptithe chun an eochair phoiblí a bhaineann lena haitheantas a athrú.
- Seolann Alice teachtaireacht eile (criptithe) chuig an gconradh cliste ag vótáil do `rogha A` ag baint úsáide as an eochair phoiblí nua.
- Taispeánann Alice idirbheart do Bob a thaispeánann gur vótáil sí ar son `rogha B` (atá neamhbhailí toisc nach bhfuil baint ag an eochair phoiblí le céannacht Alice sa chóras a thuilleadh)
- Agus teachtaireachtaí á bpróiseáil aige, ní dhéanann an comhordaitheoir vóta Alice ar son `rogha B` agus ní chomhaireamh ach an vóta do `rogha A`. Mar sin, teipeann ar iarracht Bob dul i ngleic le Alice agus an vóta ar slabhra a ionramháil.

Éilíonn úsáid MACI _muinín_ a bheith agat sa chomhordaitheoir nach gcomhoibreoidh sé le daoine a thugann luachmhaireacht nó nach ndéanfaidh sé féin iarracht lucht vótála a bhréagnú. Is féidir leis an gcomhordaitheoir teachtaireachtaí úsáideora a dhíchriptiú (riachtanach chun an cruthúnas a chruthú), ionas gur féidir leo a fhíorú go cruinn conas a vótáil gach duine.

Ach i gcásanna ina bhfanann an comhordaitheoir macánta, is uirlis chumhachtach é MACI chun dosháraitheacht na vótála ar slabhra a ráthú. Míníonn sé seo an tóir atá air i measc feidhmchlár ar mhaoiniú cuadratach (m.sh., [clr.fund](https://clr.fund/#/about/maci)) a bhíonn ag brath go mór ar ionracas roghanna vótála gach duine.

[Foghlaim tuilleadh faoi MACI](https://privacy-scaling-explorations.github.io/maci/).

## Conas a oibríonn cruthúnais nial-eolais? {#how-do-zero-knowledge-proofs-work}

Ligeann cruthúnas nialas-eolais duit fírinne ráitis a chruthú gan ábhar an ráitis a roinnt nó conas a fuair tú amach an fhírinne a nochtadh. Chun é seo a dhéanamh, bíonn prótacail nial-eolais ag brath ar algartaim a ghlacann roinnt sonraí mar ionchur agus a chuireann ‘fíor’ nó ‘bréagach’ ar ais mar aschur.

Caithfidh prótacal nial-eolais na critéir seo a leanas a shásamh:

1. ** Iomláine**: Má tá an t-ionchur bailí, filleann an prótacal nial-eolais 'fíor' i gcónaí. Mar sin, má tá an bunráiteas fíor, agus má ghníomhaíonn an cruthaitheoir agus an fíoraitheoir go hionraic, is féidir glacadh leis an gcruthúnas.

2. **Iontaofacht**: Má tá an t-ionchur neamhbhailí, tá sé dodhéanta go teoiriciúil bob a chur ar an bprótacal nial-eolais chun ‘fíor’ a thabhairt ar ais. Mar sin, ní féidir le promhadóir bréaga a mhealladh ar fhíoraitheoir macánta le go gcreidfidh sé uaidh go bhfuil ráiteas neamhbhailí bailí (ach amháin le dornán bheag dóchúlachta).

3. **Nial-eolas**: Ní fhoghlaimíonn an fíoraitheoir rud ar bith faoi ráiteas a théann thar a bhailíocht nó a bhréagacht (níl "eolas ar bith acu" ar an ráiteas). Cuireann an ceanglas seo cosc ​​freisin ar an bhfíoraitheoir an t-ionchur bunaidh (ábhar an ráitis) a dhíorthú ón gcruthúnas.

I bhfoirm bhunúsach, tá trí ghné i gcruthúnas nial-eolais: **finné**, **dúshlán** agus **freagra**.

- **Finné**: Le cruthúnas nial-eolais, tá an cruthaitheoir ag iarraidh eolas ar roinnt faisnéise folaithe a chruthú. Is í an fhaisnéis rúnda “finné” an chruthúnais, agus bunaíonn eolas toimhdithe an fhíoraí ar an bhfinné sraith ceisteanna nach féidir a fhreagairt ach ag páirtí a bhfuil eolas aige ar an bhfaisnéis. Mar sin, cuireann an promhadóir tús leis an bpróiseas cruthaithe trí cheist a roghnú go randamach, an freagra a ríomh, agus é a sheoladh chuig an bhfíoraitheoir.

- **Dúshlán**: Roghnaíonn an fíoraitheoir ceist eile go randamach as an tacar agus iarrann sé ar an bpromhadóir í a fhreagairt.

- **Freagra**: Glacann an promhadóir leis an gceist, ríomhann sé an freagra agus cuireann sé ar ais chuig an bhfíoraitheoir í. Ligeann freagra an phomhadóir don fhíoraitheoir seiceáil an bhfuil rochtain ag an gcéad duine ar an bhfinné i ndáiríre. Chun a chinntiú nach bhfuil an promhadóir ag buille faoi thuairim i nganfhios agus ag fáil na bhfreagraí cearta de sheans, roghnaíonn an fíoraitheoir tuilleadh ceisteanna le cur air. Tríd an idirghníomhaíocht seo a athdhéanamh arís agus arís eile, laghdaítear go mór an fhéidearthacht go bhfuil an t-eolas cruthaithe ag an bhfinné sásta go dtí go mbíonn an fíoraitheoir sásta.

Déanann an méid thuas cur síos ar struchtúr ‘cruthúnas eolais nialais idirghníomhach’. Bhain luathphrótacail nial-eolais úsáid as cruthú idirghníomhach, nuair a theastaigh cumarsáid anonn is anall idir na cruthaitheoirí agus na fíoraitheoirí chun bailíocht ráitis a fhíorú.

Sampla maith a léiríonn an chaoi a n-oibríonn cruthúnais idirghníomhacha ná [scéal uaimh Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave), saothar cáiliúil de chuid Jean-Jacques Quisqater. Sa scéal, tá Peigí (an promhadóir) ag iarraidh a chruthú do Victor (an fíoraitheoir) go bhfuil an frása rúnda ar eolas aici chun doras draíochta a oscailt gan an frása a nochtadh.

### Cruthuithe neamh-idirghníomhacha nial-eolais {#non-interactive-zero-knowledge-proofs}

Cé go raibh an cruthú réabhlóideach, bhí an promhú idirghníomhach teoranta ó thaobh úsáidí de toisc go raibh gá leis an dá pháirtí a bheith ar fáil agus idirghníomhú arís agus arís eile. Fiú dá mbeadh fíoraitheoir cinnte faoi ionracas an phromhadóra, ní bheadh ​​an cruthúnas ar fáil le haghaidh fíorú neamhspleách (chun cruthúnais nua a ríomh bhí gá le sraith nua teachtaireachtaí idir an promhadóir agus an fíoraitheoir).

Chun an fhadhb seo a réiteach, mhol Manuel Blum, Paul Feldman, agus Silvio Micali na chéad [cruthúnais nial-eolais neamh-idirghníomhach](https://dl.acm.org/doi/10.1145/62212.62222) áit a bhfuil eochair roinnte ag an seanfhocal agus ag an bhfíoraitheoir. Ligeann sé seo don chruthaitheoir a gcuid eolais ar roinnt faisnéise a léiriú (i.e. finné) gan an fhaisnéis féin a sholáthar.

Murab ionann agus cruthúnais idirghníomhacha, níor theastaigh ach babhta cumarsáide amháin idir rannpháirtithe (promhadóir agus fíoraitheoir) le cruthúnais neamh-idirghníomhacha. Cuireann an promhadóir an fhaisnéis rúnda ar aghaidh chuig algartam speisialta chun cruthúnas nial-eolais a ríomh. Seoltar an cruthúnas seo chuig an bhfíoraitheoir, a sheiceálann go bhfuil an fhaisnéis rúnda ar eolas ag an bpromhadóir trí úsáid a bhaint as algartam eile.

Laghdaíonn cruthú neamh-idirghníomhach cumarsáid idir promhadóir agus fíoraitheoir, rud a fhágann go bhfuil cruthúnais ZK níos éifeachtaí. Ina theannta sin, a luaithe a ghintear cruthúnas, tá sé ar fáil d'aon duine eile (le rochtain ar an eochair roinnte agus algartam fíorúcháin) lena fhíorú.

Bhí cruthúnais neamh-idirghníomhacha ina ndul chun cinn don teicneolaíocht nial-eolais agus spreag siad forbairt na gcóras cruthaithe a úsáidtear inniu. Déanaimid plé ar na cineálacha cruthúnais seo thíos:

### Cineálacha cruthúnais nial-eolais {#types-of-zero-knowledge-proofs}

#### ZK-SNARcanna {#zk-snarks}

Is acrainm é ZK-SNARK le haghaidh **Argóint Faisnéise Gonta Neamh-Idirghníomhaí**. Tá na cáilíochtaí seo a leanas ag prótacal ZK-SNARK:

- **Nial-eolais**: Is féidir le fíoraitheoir sláine ráitis a bhailíochtú gan aon rud eile a bheith ar an eolas faoin ráiteas. Is é an t-aon eolas atá ag an bhfíoraitheoir ar an ráiteas ná an bhfuil sé fíor nó bréagach.

- **Gonta**: Tá an cruthúnas nial-eolais níos lú ná an finné agus is féidir é a fhíorú go tapa.

- **Neamh-idirghníomhach**: Tá an cruthúnas ‘neamh-idirghníomhach’ toisc nach n-idirghníomhaíonn an promhadóir agus an fíoraitheoir ach aon uair amháin, murab ionann agus cruthúnais idirghníomhacha a éilíonn go leor babhtaí cumarsáide.

- **Argóint**: Sásaíonn an cruthúnas an ceanglas maidir le hiontaofacht, agus mar sin ní dócha go ndéanfar caimiléireacht.

- **(As) Eolas**: Ní féidir an cruthúnas nial-eolais a chruthú gan rochtain ar an bhfaisnéis rúnda (finné). Is deacair, mura dodhéanta, do chruthaí nach bhfuil an finné aige cruthúnas bailí nial-eolais a ríomh.

Tagraíonn an ‘eochair chomhroinnte’ a luadh níos luaithe do pharaiméadair phoiblí a chomhaontaíonn an promhadóir agus an fíoraitheoir a úsáid chun cruthúnais a ghiniúint agus a fhíorú. Is oibríocht íogair é na paraiméadair phoiblí a ghiniúint (ar a dtugtar an Teaghrán Coiteann Tagartha (CRS) le chéile) mar gheall ar a thábhachtaí atá sé i slándáil an phrótacail. Má théann an eantrópachta (randamacht) a úsáidtear chun an CRS a ghiniúint isteach i lámha cruthaitheoir mímhacánta, féadfaidh siad cruthúnais bhréagacha a ríomh.

Is bealach é [Ríomh Ilpháirtí (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) chun na rioscaí a laghdú a bhaineann le paraiméadair phoiblí a ghiniúint. Glacann páirtithe iomadúla páirt i [searmanas socraithe iontaofa](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), áit a gcuireann gach duine roinnt luachanna randamacha leis chun an CRS a ghiniúint. Chomh fada agus a scriosann páirtí macánta amháin a gcuid den eantrópacht, coimeádann prótacal ZK-SNARK iontaofacht ríomhaireachtúil.

Éilíonn socruithe iontaofa ar úsáideoirí muinín a bheith acu as na rannpháirtithe i nginiúint pharaiméadair. Mar sin féin, chuir forbairt ZK-STARKs ar chumas prótacail a chruthú a oibríonn le socrú neamhiontaofa.

#### ZK-STARKanna {#zk-starks}

Is acrainm é ZK-STARK le haghaidh **Argóint Trédhearcach Eolais Inscálaithe Nial-Eolais**. Tá ZK-STARKs cosúil le ZK-SNARKs, ach amháin go bhfuil siad:

- **Inscálaithe**: Tá ZK-STARK níos tapúla ná ZK-SNARK maidir le cruthúnais a ghiniúint agus a fhíorú nuair is mó méid an fhinné. Le cruthúnais STARK, ní mhéadaíonn amanna cruthaitheachta agus fíoraithe ach beagán de réir mar a fhásann an finné (méadaíonn amanna cruthaitheoir agus fíoraitheora SNARK go líneach de réir mhéid an fhinné).

- **Trédhearcach**: Braitheann ZK-STARK ar randamacht infhíoraithe go poiblí chun paraiméadair phoiblí a ghiniúint chun cruthú agus fíorú a dhéanamh in ionad socrú iontaofa. Mar sin, tá siad níos trédhearcaí i gcomparáid le ZK-SNARKs.

Táirgeann ZK-STARKanna cruthúnais níos mó ná ZK-SNARKanna, rud a chiallaíonn go mbíonn forchostais fíoraithe níos airde acu de ghnáth. Mar sin féin, tá cásanna ann (cosúil le tacair shonraí móra a chruthú) ina bhféadfadh ZK-STARKs a bheith níos cost-éifeachtaí ná ZK-SNARKs.

## Míbhuntáistí a bhaineann le cruthúnais nial-eolais a úsáid {#drawbacks-of-using-zero-knowledge-proofs}

### Costais crua-earraí {#hardware-costs}

Is éard atá i gceist le cruthúnais náid-eolais ná ríomhanna an-chasta a dhéantar ar mheaisíní speisialaithe. Toisc go bhfuil na meaisíní seo costasach, is minic nach mbíonn gnáthdhaoine in ann iad a úsáid. Ina theannta sin, ní mór d’fheidhmchláir atá ag iarraidh teicneolaíocht nial-eolais a úsáid costais chrua-earraí a chur san áireamh – rud a d’fhéadfadh costais a mhéadú d’úsáideoirí deiridh.

### Costais fíoraithe cruthúnais {#proof-verification-costs}

Teastaíonn ríomh casta freisin chun cruthúnais a fhíorú agus méadaítear na costais a bhaineann le teicneolaíocht nial-eolais a chur i bhfeidhm i bhfeidhmchláir. Tá an costas seo ábhartha go háirithe i gcomhthéacs ríomh a chruthú. Mar shampla, íocann ZK-rollups ~ 500,000 gáis chun cruthúnas ZK-SNARK amháin a fhíorú ar Ethereum, agus éilíonn ZK-STARK táillí níos airde fós.

### Toimhdí muiníne {#trust-assumptions}

In ZK-SNARK, gintear an Teaghrán Tagartha Coiteann (paraiméadair phoiblí) uair amháin agus tá sé ar fáil lena athúsáid do pháirtithe ar mian leo páirt a ghlacadh sa phrótacal nial-eolais. Cruthaítear paraiméadair phoiblí trí shearmanas socraithe iontaofa, áit a nglactar leis go bhfuil na rannpháirtithe macánta.

Ach i ndáiríre níl aon bhealach ag úsáideoirí macántacht na rannpháirtithe a mheas agus ní mór d'úsáideoirí focail na forbróirí chreidiúint. Tá ZK-STARKanna saor ó bhoinn tuisceana ós rud é go bhfuil an randamacht a úsáidtear chun an tsreang a ghiniúint infhíoraithe go poiblí. Idir an dá linn, tá taighdeoirí ag obair ar shocruithe neamhiontaofa do ZK-SNARKanna chun slándáil na meicníochtaí cruthaithe a mhéadú.

### Bagairtí ríomhaireachta candamaí {#quantum-computing-threats}

Úsáideann ZK-SNARK cripteagrafaíocht cuar éilipseach le haghaidh criptithe. Cé go nglactar leis go bhfuil fadhb logartamach scoite an chuair éilipigh do-rianta faoi láthair, d’fhéadfadh forbairt ríomhairí candamacha an tsamhail slándála seo a bhriseadh amach anseo.

Meastar go bhfuil ZK-STARK díolmhaithe ó bhagairt na ríomhaireachta chandamach, toisc nach mbraitheann sé ach ar fheidhmeanna hash atá in aghaidh imbhuailte ar mhaithe lena shlándáil. Murab ionann agus eochairphéireálacha poiblí-príobháideacha a úsáidtear i gcripteagrafaíocht chuar éilipseach, tá sé níos deacra d'algartaim ríomhaireachta candamaí briseadh a dhéanamh ar haiseáil atá in aghaidh imbhuailte.

## Tuilleadh léitheoireachta {#further-reading}

- [Forbhreathnú ar chásanna úsáide le haghaidh cruthúnais nial-eolais](https://pse.dev/projects) — _Foireann Taiscéalaíochta Príobháideachais agus Scálaithe_
- [SNARKanna vs. STARKanna vs. SNARKanna athbhreacacha](https://www.alchemy.com/overviews/snarks-vs-starks) — _Forbhreathnuithe Alchemy_
- [ Cruthúnas Nial-Eolais: Príobháideacht ar Bhlocshlabhra a Fheabhsú](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs - Sampla Réalaíoch Nial-Eolais agus Tumadóireacht Dhomhan](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKanna — Cruthaigh Muinín Infhíoraithe, fiú i gcoinne Ríomhaireachtaí Cúantamacha](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [ Tuairim gharbh ar conas is féidir zk-SNARKanna](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Cén fáth a n-athrófar céannacht féincheannasach le Cruthúnais Nial-Eolais (ZKPanna)](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Mínithe: Aistrithe Príobháideacha a Chumasú ar Ethereum Le Cruthúnas ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) - _Emmanuel Awos_
