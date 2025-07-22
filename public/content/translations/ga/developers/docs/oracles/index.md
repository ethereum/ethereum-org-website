---
title: Oracail
description: Soláthraíonn Oracail conarthaí cliste Ethereum le rochtain ar shonraí an domhain fíor, ag díghlasáil níos mó cásanna úsáide agus luach níos mó d'úsáideoirí.
lang: ga
---

Is feidhmchláir iad Oracail a tháirgeann fothaí sonraí a chuireann foinsí sonraí as slabhra ar fáil don blocshlabhra le haghaidh conarthaí cliste. Tá sé seo riachtanach toisc nach féidir le conarthaí cliste bunaithe ar Ethereum, de réir réamhshocraithe, rochtain a fháil ar fhaisnéis atá stóráilte lasmuigh den líonra blocshlabhra.

Tríd an gcumas conarthaí cliste a fhorghníomhú ag baint úsáide as sonraí as slabhra, leathnaítear fóntais agus luach na n-iarratas díláraithe. Mar shampla, bíonn margaí tuartha ar slabhra ag brath ar oracail chun faisnéis a sholáthar faoi thorthaí a úsáideann siad chun tuar na n-úsáideoirí a bhailíochtú. Cuir geall Alice 20 ETH ar cé a bheidh mar an chéad Uachtarán eile ar SAM. Sa chás sin, tá oracal ag teastáil ón dapp tuar-mhargaidh chun torthaí toghcháin a dhearbhú agus a chinneadh an bhfuil Alice incháilithe le haghaidh íocaíochta.

## Réamhriachtanais {#prerequisites}

Glacann an leathanach seo leis go bhfuil an léitheoir eolach ar bhunghnéithe Ethereum, lena n-áirítear [nóid](/developers/docs/nodes-and-clients/), [meicníochtaí comhdhearcadh](/developers/docs/consensus-mechanisms/), agus na [EVM](/developers/docs/evm/). Ba cheart go mbeadh tuiscint mhaith agat freisin ar [chonarthaí cliste](/developers/docs/smart-contracts/) agus [anatamaíocht chonarthaí cliste](/developers/docs/smart-contracts/anatomy/), go háirithe [imeachtaí](/glossary/#events).

## Cad is oracal blocshlabhra ann? {#what-is-a-blockchain-oracle}

Is feidhmchláir iad Oracail a fhoinsíonn, a fhíoraíonn agus a tharchuireann faisnéis sheachtrach (i.e. faisnéis a stóráiltear as slabhra) chuig conarthaí cliste a ritheann ar an mblocshlabhra. Chomh maith le sonraí a "tharraingt" as slabhra agus é a chraoladh ar Ethereum, is féidir le horacail faisnéis a “bhrú” ón mBlocshlabhra chuig córais sheachtracha, m.sh. glas cliste a dhíghlasáil a luaithe a sheolann an t-úsáideoir táille trí idirbheart Ethereum.

Gan oracal, bheadh ​​conradh cliste teoranta go hiomlán do shonraí ar slabhra.

Tá difríocht idir Oracail atá bunaithe ar fhoinse na sonraí (foinse amháin nó iolrach), samhlacha muiníne (láraithe nó díláraithe), agus ailtireacht chórais (léite láithreach, foilsigh-liostáil, agus freagra iarratais). Is féidir linn idirdhealú a dhéanamh freisin idir oracail atá bunaithe ar cibé acu a dhéanann siad sonraí seachtracha a aisghabháil lena n-úsáid ag conarthaí ar slabhra (oracail ionchuir), faisnéis a sheoladh ón mblocshlabhra chuig na hiarratais as slabhra (oracail aschuir), nó an ndéanann siad tascanna ríomhaireachtúla as slabhra (oracail ríomhaireachta).

## Cén fáth a bhfuil oracail ag teastáil ó chonarthaí cliste? {#why-do-smart-contracts-need-oracles}

Feiceann go leor forbróirí conarthaí cliste mar chód a ritheann ag seoltaí sonracha ar an blocshlabhra. Mar sin féin, [dar le dearcadh ginearálta ar chonarthaí cliste](/smart-contracts/) is gur cláir bhogearraí féin-reatha iad atá in ann comhaontuithe idir páirtithe a fhorghníomhú a luaithe a chomhlíontar coinníollacha sonracha - is é sin bunús an téarma “conarthaí cliste.”

Ach níl sé simplí conarthaí cliste a úsáid chun comhaontuithe idir daoine a fhorfheidhmiú, ós rud é go bhfuil Ethereum cinntitheach. Is córas é [córas cinntitheach](https://en.wikipedia.org/wiki/Deterministic_algorithm) a thairgeann na torthaí céanna i gcónaí nuair a thugtar staid thosaigh agus ionchur ar leith, rud a chiallaíonn nach bhfuil aon randamacht nó éagsúlacht sa phróiseas ríomh aschuir ó ionchuir.

Chun forghníomhú cinntitheach a bhaint amach, teorannaíonn blocshlabhra nóid le teacht ar chomhdhearcadh ar cheisteanna simplí dénártha (fíor/bréagach) ag baint úsáide as sonraí _amháin_ atá stóráilte ar an blocshlabhra féin. I measc samplaí de cheisteanna den sórt sin tá:

- “Ar shínigh úinéir an chuntais (arna sainaithint le heochair phoiblí) an t-idirbheart seo leis an eochair phríobháideach péireáilte?"
- “An bhfuil go leor cistí ag an gcuntas seo chun an t-idirbheart a chlúdach?”
- “An bhfuil an t-idirbheart seo bailí i gcomhthéacs an chonartha chliste seo?”, etc.

Dá bhfaigheadh ​​blocshlabhra faisnéis ó fhoinsí seachtracha (i.e. ón bhfíorshaol), bheadh ​​sé dodhéanta cinntitheacht a bhaint amach, rud a chuirfeadh cosc ​​ar nóid aontú ar bhailíocht athruithe ar staid na blocshlabhra. Tóg mar shampla conradh cliste a ritheann idirbheart bunaithe ar an ráta malairte ETH-USD reatha a fhaightear ó API praghais traidisiúnta. Is dócha go n-athróidh an figiúr seo go minic (gan trácht ar go bhféadfaí an API a dhímholadh nó a haiceáil), rud a chiallaíonn go dtiocfadh torthaí éagsúla ar nóid a fhorghníomhaíonn an cód conartha céanna.

I gcás blocshlabhra poiblí cosúil le Ethereum, ina bhfuil na mílte nód ar fud an domhain ag próiseáil idirbhearta, tá cinntitheacht ríthábhachtach. Gan aon údarás lárnach ag feidhmiú mar fhoinse na fírinne, tá meicníochtaí ag teastáil ó nóid chun teacht ar an staid chéanna tar éis na hidirbhearta céanna a chur i bhfeidhm. Má ritheann nód A cód conartha cliste agus go bhfaigheann sé “3” mar thoradh air sin, cé go bhfaigheann nód B “7” tar éis an t-idirbheart céanna a rith, bheadh ​​comhaontú ann chun luach Ethereum a bhriseadh síos mar ardán ríomhaireachta díláraithe agus é a dhíchur.

Leagann an cás seo béim freisin ar an bhfadhb maidir le blocshlabhraí a dhearadh chun faisnéis a tharraingt ó fhoinsí seachtracha. Réitíonn Oracail, áfach, an fhadhb seo trí fhaisnéis a ghlacadh ó fhoinsí lasmuigh den slabhra agus é a stóráil ar an mblocshlabhra chun conarthaí cliste a ídiú. Ós rud é go bhfuil an fhaisnéis atá stóráilte ar slabhra do-athraithe agus ar fáil go poiblí, is féidir le nóid Ethereum úsáid a bhaint as sonraí oracal allmhairithe lasmuigh den slabhra chun athruithe staide a ríomh gan comhaontú a bhriseadh.

Chun seo a dhéanamh, is gnách go mbíonn oracal comhdhéanta de chonradh cliste a ritheann ar slabhra agus roinnt comhpháirteanna as slabhra. Faigheann an conradh ar slabhra iarratais ar shonraí ó chonarthaí cliste eile, a aistrítear chuig an gcomhpháirt lasmuigh den slabhra (ar a dtugtar nód oracal). Is féidir leis an nód oracail seo foinsí sonraí a cheistiú - ag baint úsáide as comhéadain ríomhchláraithe feidhmchlár (APIanna), mar shampla - agus idirbhearta a sheoladh chun na sonraí iarrtha a stóráil i stóráil an chonartha chliste.

Go bunúsach, déanann oracal blocshlabhra an bhearna faisnéise idir an blocshlabhra agus an timpeallacht sheachtrach a líonadh, rud a chruthaíonn “conarthaí cliste hibrideacha”. Is éard atá i gconradh cliste hibrideach ná ceann a fheidhmíonn bunaithe ar mheascán de chód conartha ar slabhra agus bonneagar as slabhra. Is sampla iontach de chonarthaí cliste hibrideacha iad margaí tuar díláraithe. I measc na samplaí eile a d’fhéadfadh a bheith ann tá conarthaí cliste um árachas barr a íocann nuair a chinneann sraith oracal gur tharla feiniméin aimsire áirithe.

## Cad é an fhadhb oracal? {#the-oracle-problem}

Réitíonn oracail fadhb thábhachtach, ach tugann siad roinnt deacrachtaí isteach freisin, m.sh.:

- Conas a dheimhnímid gur baineadh an fhaisnéis a fuarthas ón bhfoinse cheart nó nár cuireadh isteach uirthi?

- Conas a chinntímid go mbíonn na sonraí seo ar fáil i gcónaí agus go ndéantar iad a nuashonrú go rialta?

Léiríonn an “fhadhb oracal” mar a thugtar air na saincheisteanna a bhaineann le húsáid oracal blocshlabhra chun ionchuir a sheoladh chuig conarthaí cliste. Ní mór sonraí ó oracal a bheith ceart chun conradh cliste a rith i gceart. Ina theannta sin, baintear an bonn den ghné 'neamhiontaofa' de chonarthaí cliste nuair a chuirtear 'muinín' in oibreoirí oracal faisnéis chruinn a sholáthar.

Tairgeann oracail éagsúla réitigh éagsúla ar fhadhb na n-oracal, a ndéanaimid iniúchadh orthu níos déanaí. De ghnáth déantar measúnú ar Oracail de réir chomh maith agus is féidir leo na dúshláin seo a leanas a láimhseáil:

1. **Cruinneas**: Níor cheart go gcuirfeadh oracal faoi deara go spreagfadh conarthaí cliste athruithe staide bunaithe ar shonraí neamhbhailí as slabhra. Caithfidh oracal _barántúlacht_ agus _sláine_ na sonraí a ráthú. Ciallaíonn barántúlacht go bhfuarthas na sonraí ón bhfoinse cheart, agus ciallaíonn sláine gur fhan na sonraí slán (i.e. níor athraíodh iad) sular seoladh iad ar slabhra.

2. **Infhaighteacht**: Níor cheart go gcuirfeadh oracal moill nó cosc ​​ar chonarthaí cliste ó ghníomhartha a dhéanamh agus athruithe staide a chur i bhfeidhm. Ciallaíonn sé seo go gcaithfidh sonraí ó oracal a bheith _ar fáil ach iad a iarraidh_ gan aon bhriseadh.

3. **Comhoiriúnacht Dreasachta**: Ba cheart go spreagfadh oracail soláthraithe sonraí as slabhra chun faisnéis cheart a chur isteach i gconarthaí cliste. Is éard atá i gceist le comhoiriúnacht dreasachta ná _inchurthacht_ agus _cuntasacht_. Ceadaíonn inchurthacht píosa faisnéise seachtraí a nascadh lena sholáthraí, agus ceanglaionn bannaí cuntasachta soláthraithe sonraí leis an bhfaisnéis a thugann siad, ionas gur féidir luach saothair a thabhairt dóibh nó pionós a ghearradh orthu bunaithe ar cháilíocht na faisnéise a chuirtear ar fáil.

## Conas a oibríonn seirbhís blocshlabhra oracal? {#how-does-a-blockchain-oracle-service-work}

### Úsáideoirí {#users}

Is aonáin iad úsáideoirí (i.e., conarthaí cliste) a dteastaíonn faisnéis lasmuigh den blocshlabhra uathu chun gníomhartha sonracha a chur i gcrích. Tosaíonn sreabhadh oibre bunúsach seirbhís oracal nuair a chuireann an t-úsáideoir iarratas sonraí chuig an gconradh oracal. De ghnáth freagróidh iarratais ar shonraí cuid de na ceisteanna seo a leanas nó iad uile:

1. Cad iad na foinsí ar féidir le nóid as slabhra dul i gcomhairle leo le haghaidh na faisnéise iarrtha?

2. Conas a phróiseálann tuairisceoirí faisnéis ó fhoinsí sonraí agus conas a bhaintear amach pointí sonraí úsáideacha?

3. Cé mhéad nóid oracal is féidir a bheith rannpháirteach in aisghabháil na sonraí?

4. Conas is ceart neamhréireachtaí i dtuairiscí oracal a bhainistiú?

5. Cén modh ba chóir a chur i bhfeidhm chun aighneachtaí a scagadh agus tuarascálacha a chomhiomlánú ina luach aonair?

### Conradh oracal {#oracle-contract}

Is é an conradh oracal an chomhpháirt ar slabhra don tseirbhís oracal. Éisteann sé le hiarratais ar shonraí ó chonarthaí eile, athsheoltar fiosrúcháin sonraí chuig nóid oracal, agus craolann sé sonraí a chuirtear ar ais chuig conarthaí cliant. Féadfaidh an conradh seo roinnt ríomh a dhéanamh freisin ar na pointí sonraí aischurtha chun luach comhiomlán a sholáthar le cur chuig an gconradh iarrthach.

Nochtann an conradh oracal roinnt feidhmeanna a mbíonn gá ag conarthaí cliant leo agus iarratas sonraí á dhéanamh. Ar cheist nua a fháil, taispeánfaidh an conradh cliste [imeacht logála](/developers/docs/smart-contracts/anatomy/#events-and-logs) le sonraí faoin iarratas ar shonraí. Tugann sé seo fógra do nóid as slabhra atá suibscríofa don loga (go hiondúil ag baint úsáide as rud éigin cosúil leis an ordú JSON-RPC `eth_subscribe`), a leanann ar aghaidh ag aisghabháil na sonraí a shainítear san imeacht loga.

Seo thíos [mar shampla conradh oracal](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) le Pedro Costa. Is seirbhís simplí oracal é seo ar féidir APIanna as-slabhra a fhiosrú arna iarraidh sin ag conarthaí cliste eile agus an fhaisnéis iarrtha a stóráil ar an blocshlabhra:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer as the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Nóid oracal {#oracle-nodes}

Is é an nód oracal an chomhpháirt as slabhra den tseirbhís oracal. Baineann sé faisnéis as foinsí seachtracha, ar nós APIanna arna óstáil ar fhreastalaithe tríú páirtí, agus cuireann sé ar shlabhra í lena tomhaltas ag conarthaí cliste. Éisteann nóid oracal le haghaidh imeachtaí ón gconradh oracal ar slabhra agus téigh ar aghaidh chun an tasc a thuairiscítear sa logáil a chríochnú.

Tasc coiteann do nóid oracal is ea iarratas [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) a sheoladh chuig seirbhís API, an freagra a pharsáil chun sonraí ábhartha a bhaint, formáidiú isteach in aschur inléite blocshlabhra, agus é a sheoladh ar slabhra trína áireamh in idirbheart chuig an gconradh oracal. D’fhéadfadh go mbeadh gá leis an nód oracal freisin chun bailíocht agus sláine na faisnéise a cuireadh isteach a fhianú trí úsáid a bhaint as “cruthúnais bharántúlachta”, a ndéanaimid iniúchadh orthu níos déanaí.

Bíonn oracail ríomhaireachtúla ag brath freisin ar nóid as slabhra chun tascanna ríomhaireachtúla a dhéanamh a bheadh ​​neamhphraiticiúil a rith ar slabhra, i bhfianaise na gcostas gáis agus na srianta ar mhéid na mbloc. Mar shampla, is féidir go gcuirfí de chúram ar an nód oracal figiúr infhíoraithe randamach a ghiniúint (m.sh., le haghaidh cluichí bunaithe ar blocshlabhra).

## Patrúin dearadh oracal {#oracle-design-patterns}

Tagann oracail i gcineálacha éagsúla, lena n-áirítear _léamh láithreach_, _foilsigh-liostáil_, agus _iarratas-freagra_, agus an dá cheann deiridh ar na cinn is mó tóir i measc conarthaí cliste Ethereum. Anseo tugaimid cur síos achomair ar na samhlacha foilsigh-liostáil agus iarratas-freagra.

### Oracail a fhoilsiú-liostáil {#publish-subscribe-oracles}

Nochtann an cineál seo oracal “fotha sonraí” ar féidir le conarthaí eile a léamh go rialta mar eolas. Táthar ag súil go n-athróidh na sonraí sa chás seo go minic, mar sin ní mór do chonarthaí cliant éisteacht le haghaidh nuashonruithe ar na sonraí i stóráil an oracal. Is sampla é oracal a sholáthraíonn an fhaisnéis phraghais ETH-USD is déanaí d'úsáideoirí.

### Oracail Iarratas-freagra {#request-response-oracles}

Ligeann socrú iarratais-freagra don chonradh cliant sonraí treallacha a iarraidh seachas na sonraí a sholáthraíonn oracal foilsigh-síntiúis. Tá oracail freagra iarratais iontach nuair a bhíonn an tacar sonraí ró-mhór le stóráil i stóras conartha cliste, agus/nó nach mbíonn ach cuid bheag de na sonraí ag teastáil ó úsáideoirí ag aon am.

Cé go bhfuil sé níos casta ná samhaltáin foilsigh-síntiús, is iad oracail iarratas-freagra go bunúsach an rud a bhfuil cur síos déanta againn air roimhe seo. Beidh comhpháirt ar slabhra ag an oracal a fhaigheann iarratas ar shonraí agus a chuirfidh ar aghaidh chuig nód as slabhra é lena phróiseáil.

Ní mór d’úsáideoirí a thionscnaíonn fiosrúcháin sonraí an costas a bhaineann le faisnéis a aisghabháil ón bhfoinse as slabhra a chlúdach. Ní mór don chonradh cliant cistí a sholáthar freisin chun costais gháis arna dtabhú ag an gconradh oracail a chlúdach chun an freagra a thabhairt ar ais tríd an bhfeidhm aisghlao a shonraítear san iarraidh a chlúdach.

## Oracail láraithe vs díláraithe {#types-of-oracles}

### Oracail láraithe {#centralized-oracles}

Tá oracal láraithe á rialú ag aonán amháin atá freagrach as faisnéis as slabhra a chomhiomlánú agus sonraí an chonartha oracail a nuashonrú de réir mar a iarrtar. Tá oracail láraithe éifeachtach ós rud é go mbraitheann siad ar fhoinse amháin fírinne. Féadfaidh siad feidhmiú níos fearr i gcásanna ina bhfoilsíonn an t-úinéir tacair sonraí dílseánaigh go díreach le síniú a nglactar leis go forleathan. Mar sin féin, gabhann míbhuntáistí leo freisin:

#### Ráthaíochtaí íseal cruinnis {#low-correctness-guarantees}

Le oracail láraithe, níl aon bhealach ann le dearbhú an bhfuil an fhaisnéis a tugadh ceart nó nach bhfuil. Is féidir le soláthraithe “cáiliúla” fiú dul fiáin nó a bheith haiceáilte. Má éiríonn an t-oracal truaillithe, rithfear conarthaí cliste bunaithe ar dhrochshonraí.

#### Infhaighteacht lag {#poor-availability}

Ní ráthaítear go gcuirfidh oracail láraithe sonraí as slabhra ar fáil do chonarthaí cliste eile i gcónaí. Má chinneann an soláthraí an tseirbhís a mhúchadh nó má dhéanann haiceálaí comhpháirt as slabhra an oracail a fhuadach, tá do chonradh cliste i mbaol ionsaí séanadh seirbhíse (DoS).

#### Comhoiriúnacht dreasachta lag {#poor-incentive-compatibility}

Is minic a bhíonn droch-dhearadh ag oracail láraithe nó ní bhíonn dreasachtaí ann don soláthraí sonraí chun faisnéis chruinn/neamhathraithe a sheoladh. Ní ráthaítear macántacht má íoctar oracal as cruinneas. Éiríonn an fhadhb seo níos mó de réir mar a mhéadaíonn an luach a rialaítear le conarthaí cliste.

### Oracail dhíláraithe {#decentralized-oracles}

Tá oracail dhíláraithe deartha chun teorainneacha oracal láraithe a shárú trí dheireadh a chur le pointí aonair teip. Cuimsíonn seirbhís díláraithe oracal rannpháirtithe iolracha i líonra piaraí le piaraí a thagann ar chomhdhearcadh maidir le sonraí as slabhra sula gcuirtear chuig conradh cliste é.

Ba cheart go mbeadh oracal díláraithe (go hidéalach) gan chead, gan iontaoibh, agus saor ó riarachán ag páirtí lárnach; i ndáiríre, tá dílárú i measc oracal ar speictream. Tá líonraí oracal leath-dhíláraithe ann inar féidir le haon duine a bheith rannpháirteach iontu, ach le “úinéir” a fhormheasann agus a bhaintear nóid bunaithe ar fheidhmíocht stairiúil. Tá líonraí oracal lán-díláraithe ann freisin: is gnách go ritheann siad seo mar bhlocshlabhraí neamhspleácha agus tá meicníochtaí comhaontaithe sainithe acu chun nóid a chomhordú agus chun mí-iompraíocht a phionósú.

Tagann na buntáistí seo a leanas le húsáid oracal díláraithe:

### Ráthaíochtaí cruinnis ard {#high-correctness-guarantees}

Déanann oracail dhíláraithe iarracht cruinneas sonraí a bhaint amach trí úsáid a bhaint as cineálacha cur chuige éagsúla. Áirítear leis sin úsáid a bhaint as cruthúnais a dheimhníonn barántúlacht agus sláine na faisnéise aischurtha agus a éilíonn ar aonáin iolracha aontú faoi bhailíocht na sonraí as slabhra.

#### Cruthúnas barántúlachta {#authenticity-proofs}

Is meicníochtaí cripteagrafaíocha iad cruthúnais bharántúlachta a chumasaíonn fíorú neamhspleách faisnéise a fhaightear ó fhoinsí seachtracha. Is féidir leis na cruthúnais seo foinse na faisnéise a bhailíochtú agus athruithe féideartha ar na sonraí a bhrath tar éis iad a fháil.

I measc samplaí de chruthúnais bharántúlachta tá:

**Cruthúnais Slándála Sraithe Iompair (TLS)**: Is minic a dhéanann nóid Oracle sonraí a aisghabháil ó fhoinsí seachtracha trí úsáid a bhaint as nasc slán HTTP bunaithe ar phrótacal Slándáil Sraithe Iompair(TLS). Úsáideann roinnt oracal díláraithe cruthúnais barántúlachta chun seisiúin TLS a fhíorú (i.e. malartú faisnéise idir nód agus freastalaí ar leith a dhearbhú) agus chun a dhearbhú nár athraíodh a bhfuil sa seisiún.

**Timpeallacht Fhianaithe Iontaofa Reatha (TEE)**: Is timpeallacht ríomhbhosca gainimh é [timpeallacht reatha iontaofa](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) atá scoite amach ó phróisis oibriúcháin a chórais óstaigh. Cinntíonn TEEanna go gcoimeádtar sláine, rúndacht agus neamh-inaistritheacht cibé cód feidhmchláir nó sonraí a stóráiltear/a úsáidtear sa timpeallacht ríomha. Is féidir le húsáideoirí fianú a ghiniúint freisin chun a chruthú go bhfuil ásc feidhmchláir ag rith laistigh den timpeallacht reatha iontaofa.

Éilíonn aicmí áirithe oracal díláraithe ar oibritheoirí nód oracal fianuithe TEE a sholáthar. Deimhníonn sé seo d'úsáideoir go bhfuil an t-oibreoir nód ag rith cliant oracal i dtimpeallacht reatha iontaofa. Cuireann TEEanna cosc ​​ar phróisis sheachtracha cód agus sonraí feidhmchláir a athrú nó a léamh, mar sin, cruthaíonn na fianuithe sin gur choinnigh an nód oracal an fhaisnéis slán agus faoi rún.

#### Bailíochtú faisnéise bunaithe ar chomhdhearcadh {#consensus-based-validation-of-information}

Bíonn oracail láraithe ag brath ar fhoinse amháin fírinne agus iad ag soláthar sonraí do chonarthaí cliste, rud a thugann isteach an fhéidearthacht faisnéis mhíchruinn a fhoilsiú. Réitíonn oracail dhíláraithe an fhadhb seo trí bheith ag brath ar nóid oracail iolracha chun faisnéis slabhra a cheistiú. Trí shonraí ó fhoinsí iolracha a chur i gcomparáid, laghdaíonn oracail dhíláraithe an baol go dtabharfar faisnéis neamhbhailí chuig conarthaí slabhra.

Caithfidh oracail dhíláraithe, áfach, déileáil le neamhréireachtaí san fhaisnéis a fhaightear ó fhoinsí iomadúla as slabhra. Chun difríochtaí faisnéise a íoslaghdú agus a chinntiú go léiríonn na sonraí a chuirtear ar aghaidh chuig an gconradh oracal an tuairim chomhchoiteann ar nóid oracal, úsáideann oracail dhíláraithe na meicníochtaí seo a leanas:

##### Vótáil/geallchurr chruinneas na sonraí

Éilíonn roinnt líonraí oracal díláraithe ar rannpháirtithe vótáil nó geall a dhéanamh ar chruinneas na bhfreagraí ar cheisteanna sonraí (m.sh., "Cé a bhuaigh toghchán SAM 2020?") ag baint úsáide as comhartha dúchais an líonra. Déanann prótacal comhiomlánaithe na vótaí agus na geallta a chomhiomlánú ansin agus glacann sé leis an bhfreagra le tacú ón tromlach mar an freagra bailí.

Gearrtar pionós ar nóid a imíonn a bhfreagraí ó fhreagra an tromlaigh nuair a dháiltear a gcuid comharthaí ar dhaoine eile a sholáthraíonn luachanna níos cruinne. Má chuirtear iallach ar nóid banna a sholáthar sula gcuirtear sonraí ar fáil spreagtar freagairtí macánta ós rud é go nglactar leis gur gníomhaithe eacnamaíocha réasúnacha iad a bhfuil sé de rún acu torthaí a uasmhéadú.

Cosnaíonn geallchur/vótáil oracail dhíláraithe freisin ó [ionsaithe Scoil](/glossary/#sybil-attack) nuair a chruthaíonn gníomhaithe mailíseacha féiniúlachtaí iolracha chun cluiche a dhéanamh ar an gcóras comhthoil. Mar sin féin, ní féidir le geallála “diúgaireacht” a chosc (nóid oracal ag cóipeáil faisnéise ó dhaoine eile) agus “bailíochtú leisciúil” (nóid oracal ag leanúint an tromlaigh gan an fhaisnéis a fhíorú iad féin).

##### Meicníochtaí pointe Schelling

[Is coincheap teoirice cluiche é Pointe Schelling](https://en.wikipedia.org/wiki/Focal_point_(game_theory)) a ghlacann leis go mbeidh aonáin iolracha réamhshocraithe i gcónaí ar réiteach coiteann ar fhadhb in éagmais aon chumarsáide. Is minic a úsáidtear meicníochtaí pointe sceidealaithe i líonraí oracal díláraithe chun a chur ar chumas nóid teacht ar chomhdhearcadh maidir le freagraí ar iarratais ar shonraí.

Smaoineamh luath chuige seo ab ea [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), fotha sonraí atá beartaithe ina gcuireann rannpháirtithe freagraí isteach ar cheisteanna “scálacha” (ceisteanna a bhfuil cur síos ar a gcuid freagraí de réir méide, m.sh., "cad é praghas ETH?"), chomh maith le héarlais. Tugtar luach saothair d'úsáideoirí a sholáthraíonn luachanna idir an 25ú agus an 75ú [peircintíl](https://en.wikipedia.org/wiki/Percentile), agus gearrtar pionós orthu siúd a bhfuil a gcuid luachanna den chuid is mó ag imeacht ón luach airmheánach.

Cé nach bhfuil SchellingCoin ann níos mó, tá roinnt oracal díláraithe - go háirithe [Prótacal Déantóra Oracal](https://docs.makerdao.com/smart-contract-modules/oracle-module) - ag baint úsáide as meicníocht na n-oracal schelling chun cruinneas na sonraí oracal a fheabhsú. Is éard atá i ngach Déantóir Oracle líonra nóid P2P lasmuigh ("athsheoltóirí" agus "fothaí") a chuireann isteach praghsanna margaidh do shócmhainní comhthaobhachta agus conradh “Medianizer” ar slabhra a ríomhann airmheán gach luach a sholáthraítear. Nuair a bheidh an tréimhse moille shonraithe thart, is é an luach airmheánach seo an praghas tagartha nua don tsócmhainn ghaolmhar.

I measc na samplaí eile d'oracail a úsáideann meicníochtaí pointe Schelling tá [Tuairisciú As Slabhra Chainlink](https://docs.chain.link/docs/offchain-reporting/) agus [Witnet](https://witnet.io/). Sa dá chóras, déantar freagairtí ó nóid oracail sa líonra piara-le-piara a chomhiomlánú i luach comhiomlán amháin, amhail meán nó airmheán. Tugtar luach saothair nó pionós do nóid de réir a mhéid a ailíníonn a bhfreagraí leis an luach comhiomlán nó a chlaonann siad uaidh.

Tá meicníochtaí pointe Schelling tarraingteach toisc go n-íoslaghdaíonn siad lorg ar slabhra (ní gá ach idirbheart amháin a sheoladh) agus dílárú á ráthú acu. Is féidir an dara ceann a dhéanamh toisc go gcaithfidh nóid síniú a chur leis an liosta freagraí a cuireadh isteach sula gcuirtear san áireamh é san algartam a tháirgeann an meánluach/an luach airmheánach.

### Infhaighteacht {#availability}

Cinntíonn seirbhísí díláraithe oracal infhaighteacht ard sonraí as slabhra ar chonarthaí cliste. Baintear é seo amach tríd an bhfoinse faisnéise as slabhra agus na nóid atá freagrach as an fhaisnéis a aistriú ar an slabhra a dhílárú.

Cinntíonn sé seo lamháltas lochtanna toisc gur féidir leis an gconradh oracal a bheith ag brath ar nóid iolracha (a bhíonn ag brath ar fhoinsí iomadúla sonraí freisin) chun fiosrúcháin ó chonarthaí eile a rith. Tá dílárú ag leibhéal na n-oibreoir nód foinse _agus_ ríthábhachtach - rithfidh líonra de nóid oracal a fhreastalaíonn ar fhaisnéis arna haisghabháil ón bhfoinse chéanna san fhadhb chéanna le oracal láraithe.

Is féidir freisin d'oracail geall-bhunaithe oibreoirí nód nach dtugann freagra tapa ar iarratais ar shonraí a íoslaghdú. Spreagann sé seo nóid oracal go mór le hinfheistíocht a dhéanamh i mbonneagar a fhulaingíonn lochtanna agus sonraí a sholáthar go tráthúil.

### Comhoiriúnacht dreasachta maith {#good-incentive-compatibility}

Cuireann oracail dhíláraithe dearaí dreasachta éagsúla i bhfeidhm chun iompar [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) a chosc i measc nóid oracal. Go sonrach, sroicheann siad _ inchurthacht_ agus _cuntasacht_:

1. Is minic go mbíonn gá le nóid oracal díláraithe chun na sonraí a sholáthraíonn siad a shíniú mar fhreagra ar iarratais ar shonraí. Cuidíonn an fhaisnéis seo le feidhmíocht stairiúil na nóid oracal a mheas, ionas gur féidir le húsáideoirí nóid oracal neamhiontaofa a scagadh agus iad ag déanamh iarratais ar shonraí. Sampla is ea [Córas Clú Algartam](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) de chuid Witnet.

2. D'fhéadfadh go n-éileodh oracail dhíláraithe - mar a míníodh níos luaithe - nóid geall a chur ar a muinín i bhfírinne na sonraí a chuireann siad isteach. Má sheasann an t-éileamh, is féidir an geall seo a thabhairt ar ais mar aon le luaíochtaí as seirbhís macánta. Ach is féidir é a laghdú freisin i gcás go bhfuil an fhaisnéis mícheart, rud a thugann tomhas áirithe cuntasachta.

## Feidhmchláir oracail i gconarthaí cliste {#applications-of-oracles-in-smart-contracts}

Is cásanna úsáide coitianta iad seo a leanas le haghaidh oracail in Ethereum:

### Sonraí airgeadais a aisghabháil {#retrieving-financial-data}

Ceadaíonn feidhmchláir [airgeadais dhíláraithe](/defi/) (DeFi) iasachtú piara le piara, iasachtaíocht agus trádáil sócmhainní. Éilíonn sé seo go minic faisnéis airgeadais dhifriúil a fháil, lena n-áirítear sonraí ráta malairte (chun luach fiat criptea-airgeadraí a ríomh nó chun praghsanna comharthaíochta a chur i gcomparáid) agus sonraí margaí caipitil (chun luach sócmhainní comharthaithe a ríomh, amhail ór nó dollar SAM).

Ní mór do phrótacal iasachta DeFi, mar shampla, praghsanna reatha an mhargaidh do shócmhainní (m.sh., ETH) a thaisceadh mar chomhthaobhacht a cheistiú. Ligeann sé seo don chonradh luach na sócmhainní comhthaobhachta a chinneadh agus a chinneadh cé mhéad is féidir leis a fháil ar iasacht ón gcóras.

I measc na “n-oracal praghais” coitianta (mar a thugtar orthu go minic) i DeFi tá Fothaí Praghas Chainlink, [Fotha Praghas Oscailte](https://compound.finance/docs/prices), [ Meánphraghsanna Am-ualaithe (TWAPanna)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles), agus [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Ba cheart go dtuigfeadh tógálaithe na fainicí a thagann leis na horacail praghais seo sula ndéantar iad a chomhtháthú ina dtionscadal. Soláthraíonn an [t-airteagal](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) anailís mhionsonraithe ar cad ba cheart a chur san áireamh nuair a bhíonn sé beartaithe aon cheann de na horacail phraghais luaite a úsáid.

Seo thíos sampla de conas is féidir leat an praghas ETH is déanaí a fháil ar ais i do chonradh cliste ag baint úsáide as fotha praghsanna Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Randamacht infhíoraithe a ghiniúint {#generating-verifiable-randomness}

Éilíonn iarratais blocshlabhra áirithe, mar shampla cluichí bunaithe ar blocshlabhra nó scéimeanna crannchuir, ardleibhéal dothuartha agus randamacht chun oibriú go héifeachtach. Mar sin féin, cuireann rith cinntitheach blocshlabhraí deireadh le randamacht.

Ba é an cur chuige bunaidh ná feidhmeanna cripteagrafacha bréige a úsáid, mar `blockhash`, ach d'fhéadfadh gur[láimhsithe ag mianadóirí](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) ag réiteach an algartam cruthúnais-oibre. Chomh maith leis sin, ciallaíonn [athrú go cruthúnas i ngeall ar Ethereum](/roadmap/merge/) nach féidir le forbróirí brath ar `blockhash` a thuilleadh le haghaidh randamacht ar slabhra. Soláthraíonn [meicníocht RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) an Slabhra Beacon foinse eile randamachta ina ionad sin.

Is féidir an luach randamach as slabhra a ghiniúint agus é a sheoladh ar slabhra, ach cuireann sé sin ceanglais arda muiníne ar úsáideoirí. Caithfidh siad a chreidiúint gur gineadh an luach go fírinneach trí mheicníochtaí nach féidir a thuar agus nár athraíodh é faoi bhealach.

Réitíonn oracail atá deartha le haghaidh ríomh as slabhra an fhadhb seo trí thorthaí randamacha a ghiniúint go slán as slabhra a chraolann siad ar slabhra mar aon le cruthúnais cripteagrafacha a dhearbhaíonn nach féidir an próiseas a thuar. Sampla is ea [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Feidhm Randamach Infhíoraithe), ar gineadóir uimhreacha randamacha infhíoraithe é atá cothrom agus nach féidir a chur isteach (RNG) úsáideach chun conarthaí cliste iontaofa a thógáil le haghaidh feidhmchláir a bhraitheann ar thorthaí nach féidir a thuar. Sampla eile is ea [API3 QRNG](https://docs.api3.org/explore/qrng/) a fhreastalaíonn ar ghiniúint uimhreacha randamacha Quantum (QRNG) ná modh poiblí Web3 RNG bunaithe ar fheiniméin chandamach, arna sheirbheáil le caoinchead ó Ollscoil Náisiúnta na hAstráile (ANU).

### Torthaí a fháil le haghaidh imeachtaí {#getting-outcomes-for-events}

Le horacail, tá sé éasca conarthaí cliste a chruthú a fhreagraíonn d'imeachtaí an domhain fíor. Is féidir é seo a dhéanamh le seirbhísí oracal trí chonarthaí a cheadú chun nascadh le APIanna seachtracha trí chomhpháirteanna as slabhra agus faisnéis a ithe ó na foinsí sonraí sin. Mar shampla, féadfaidh an dapp tuar a luadh níos luaithe a iarraidh ar oracal torthaí toghcháin a thabhairt ar ais ó fhoinse iontaofa as slabhra (m.sh., Associated Press).

Trí oracal a úsáid chun sonraí a aisghabháil bunaithe ar thorthaí an fhíorshaoil ​​is féidir cásanna úsáide núíosacha eile a úsáid; mar shampla, teastaíonn faisnéis chruinn faoin aimsir, faoi thubaistí, srl. ó tháirge árachais díláraithe chun oibriú go héifeachtach.

### Conarthaí cliste a uathoibriú {#automating-smart-contracts}

Ní ritheann conarthaí cliste go huathoibríoch; ina áit sin, ní mór do chuntas faoi úinéireacht sheachtrach (EOA), nó cuntas conartha eile, na feidhmeanna cearta a spreagadh chun cód an chonartha a rith. I bhformhór na gcásanna, is feidhmeanna poiblí an chuid is mó d’fheidhmeanna an chonartha agus is féidir le EOAnna agus conarthaí eile iad a agairt.

Ach tá _feidhmeanna príobháideacha_ laistigh de chonradh freisin nach bhfuil rochtain ag daoine eile orthu;, ach atá ríthábhachtach d’fheidhmiúlacht iomlán dapp. I measc na samplaí tá feidhm `mintERC721Token()` a bhualann NFTanna nua d’úsáideoirí go tréimhsiúil, feidhm chun íocaíochtaí a dhámhachtain i margadh réamh-mheastacháin, nó feidhm chun comharthaí geallta a dhíghlasáil i DEX.

Beidh ar fhorbróirí feidhmeanna den sórt sin a spreagadh ag eatraimh chun an feidhmchlár a choinneáil ag rith go réidh. Mar sin féin, d'fhéadfadh sé mar gheall air seo go gcaillfí níos mó uaireanta an chloig ar thascanna leamha d'fhorbróirí, agus is é sin an fáth go bhfuil sé tarraingteach rith conarthaí cliste a uathoibriú.

Tairgeann roinnt líonraí oracal díláraithe seirbhísí uathoibrithe, a ligeann do nóid oracal lasmuigh den slabhra feidhmeanna conartha cliste a spreagadh de réir pharaiméadair arna sainiú ag an úsáideoir. De ghnáth, éilíonn sé seo “clárú” an chonartha sprice leis an tseirbhís oracal, cistí a sholáthar chun an t-oibreoir oracal a íoc, agus na coinníollacha nó na hamanna a shonrú chun an conradh a chur i bhfeidhm.

Soláthraíonn [Keeper Network](https://chain.link/keepers) roghanna le haghaidh conarthaí cliste chun tascanna cothabhála rialta a sheachfhoinsiú ar bhealach muiníne íoslaghdaithe agus díláraithe. Léigh [doiciméid an Choimeádta](https://docs.chain.link/docs/chainlink-keepers/introduction/) chun faisnéis a fháil faoi do chonradh a dhéanamh comhoiriúnach do Choimeádaí agus an tseirbhís Upkeep a úsáid.

## Conas oracail bhlocshlabhraí a úsáid {#use-blockchain-oracles}

Tá iliomad feidhmchlár oracal ann ar féidir leat a chomhtháthú isteach i do dapp Ethereum:

**[Chainlink](https://chain.link/)** - _Soláthraíonn líonraí oracal díláraithe Chainlink ionchuir, aschuir agus ríomhanna nach bhfuil aon chur isteach orthu chun tacú le hardchonarthaí cliste ar aon bhlocshlabhra._

**[RedStone Oracles](https://redstone.finance/)** - _Is oracal modúlach díláraithe é RedStone a sholáthraíonn fothaí sonraí optamaithe gás. Is sainfheidhm aige fothaí praghais a thairiscint do shócmhainní atá ag teacht chun cinn, mar chomharthaí coinneála leachta (LSTanna), comharthaí ath-ghill leachta (LRTanna), agus díorthaigh ngeallta Bitcoin._

**[Croinic](https://chroniclelabs.org/)** - _ Sáraíonn Croinic na teorainneacha reatha maidir le sonraí a aistriú ar slabhra trí oracail inscálaithe, cost-éifeachtach, díláraithe agus infhíoraithe a fhorbairt._

**[Witnet](https://witnet.io/)** - _ Oracal gan chead, díláraithe agus frithchinsireachta atá frithsheasmhach in aghaidh na cinsireachta a chabhraíonn le conarthaí cliste freagairt d'imeachtaí an domhain le ráthaíochtaí láidre cripte-eacnamaíochta._

**[UMA Oracle](https://uma.xyz)** - _ Ligeann oracal dóchasach UMA le conarthaí cliste sonraí de chineál ar bith d’fheidhmchláir éagsúla a fháil go tapa agus a fháil, lena n-áirítear árachas, díorthaigh airgeadais, agus margaí tuar._

**[Tellor](https://tellor.io/)** - _Is prótacal oracal trédhearcach agus gan cead é Tellor le haghaidh do chonradh cliste chun aon sonraí a fháil go héasca aon uair is gá é._

**[Prótacal Banna](https://bandprotocol.com/)** - _Is ardán oracail sonraí tras-slabhra é an Prótacal Banna a chomhbhailíonn agus a nascann sonraí ón bhfíorshaol agus APIanna le conarthaí cliste._

**[Paralink](https://paralink.network/)** - _ Soláthraíonn Paralink ardán oracal foinse oscailte agus díláraithe le haghaidh conarthaí cliste a ritheann ar Ethereum agus blocshlabhraí tóir eile._

**[Pyth Network](https://pyth.network/)** - _Is líonra oracal airgeadais céadpháirtí é an líonra Pyth atá deartha chun sonraí leanúnacha ón saol fíor a fhoilsiú ar shlabhra i dtimpeallacht dhíláraithe, dhíláraithe, agus féin-inbhuanaithe._

**[API3 DAO](https://www.api3.org/)** - _Tá API3 DAO ag seachadadh réitigh oracle céadpháirtí a sheachadann trédhearcacht, slándáil agus inscálaitheacht foinse níos fearr i réiteach díláraithe le haghaidh conarthaí cliste_

**[Supra](https://supra.com/)** - Foireann uirlisí atá comhtháite go hingearach de réitigh thras-slabhra a nascann gach blocshlabhra, poiblí (L1anna agus L2) nó príobháideach (fiontair), ag soláthar fothaí díláraithe praghais oracal is féidir a úsáid le haghaidh cásanna úsáide slabhra agus as slabhra.

## Tuilleadh léitheoireachta {#further-reading}

**Ailt**

- [Cad is Oracal Blocshlabhra ann?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Cad is Oracal Blocshlabhra ann?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Oracail Dhíláraithe: forbhreathnú cuimsitheach](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Oracal Blocshlabhra a chur i bhfeidhm ar Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) - _Pedro Costa_
- [Cén fáth nach féidir le conarthaí cliste glaonna API a dhéanamh?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Cén fáth a dteastaíonn oracail dhíláraithe uainn](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) — _Bankless_
- [Mar sin ba mhaith leat oracle praghais a úsáid](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Físeáin**

- [Oracail agus Fairsingiú Saoráid Blocshlabhra](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_
- [Na difríochtaí idir oracail an chéad pháirtí agus oracail tríú páirtí](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) - _Cruinniú Mullaigh Oracal Blocshlabhra_

**Ranganna Teagaisc**

- [Conas Praghas Reatha Ethereum i Solidity a Fháil](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
- [Sonraí Oracal á n-ídiú](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Tionscadail shamplacha**

- [tionscadal tosaithe iomlán Chainlink le haghaidh Ethereum i Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
