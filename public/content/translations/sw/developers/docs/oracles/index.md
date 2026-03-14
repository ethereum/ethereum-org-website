---
title: Maneno
description: Vyanzo vya data vya nje hutoa mikataba mahiri ya Ethereum na ufikiaji wa data ya ulimwengu halisi, kufungua kesi nyingi za utumiaji na thamani kubwa kwa watumiaji.
lang: sw
---

Chabzo cha nje cha data ni programu zinazozalisha milisho ya data ambayo hufanya vyanzo vya data vya offchain kupatikana kwa blockchain kwa mikataba mahiri. Hii ni muhimu kwa sababu mikataba mahiri ya msingi wa Ethereum haiwezi, kwa chaguomsingi, kufikia maelezo yaliyohifadhiwa nje ya mtandao wa kiambajengo.

Kutoa kandarasi mahiri uwezo wa kutekeleza kwa kutumia data ya nje ya mnyororo huongeza matumizi na thamani ya programu zilizotawanywa. Kwa mfano, masoko ya utabiri wa ndani ya mnyororo hutegemea maneno ili kutoa taarifa kuhusu matokeo ambayo hutumia kuthibitisha utabiri wa mtumiaji. Tuseme Alice anabeti ETH 20 juu ya nani atakuwa U.S. ajaye. Rais. Katika hali hiyo, dapp ya soko la ubashiri inahitaji maandishi ili kuthibitisha matokeo ya uchaguzi na kubaini kama Alice anastahiki malipo.

## Mahitaji ya awali {#prerequisites}

Ukurasa huu unadhani msomaji anafahamu misingi ya Ethereum, ikiwa ni pamoja na [nodi](/developers/docs/nodes-and-clients/), [mbinu za makubaliano](/developers/docs/consensus-mechanisms/), na [EVM](/developers/docs/evm/). Unapaswa pia kuwa na ufahamu mzuri wa [mikataba mahiri](/developers/docs/smart-contracts/) na [muundo wa mikataba mahiri](/developers/docs/smart-contracts/anatomy/), hasa [matukio](/glossary/#events).

## Oracle ya mnyororo wa bloku ni nini? {#what-is-a-blockchain-oracle}

Oracles ni programu zinazotoa, kuthibitisha, na kusambaza taarifa za nje (yaani, taarifa zilizohifadhiwa nje ya mnyororo) kwa mikataba mahiri inayoendeshwa kwenye mnyororo wa bloku. Kando na "kuvuta" data ya nje ya mnyororo na kuitangaza kwenye Ethereum, chanzo cha data cha nje pia kinaweza "kusukuma" habari kutoka kwa blockchain hadi mifumo ya nje, kwa mfano, kufungua kufuli mahiri mara tu mtumiaji anapotuma ada kupitia shughuli ya Ethereum.

Bila oracle, mkataba mahiri ungekuwa na data ya kwenye mnyororo pekee.

Maneno hutofautiana kulingana na chanzo cha data (chanzo kimoja au vingi), miundo ya uaminifu (iliyowekwa kati au iliyogatuliwa), na usanifu wa mfumo (kusoma mara moja, kuchapisha-kujisajili na kujibu ombi). Tunaweza pia kutofautisha kati ya hotuba kulingana na ikiwa zinapata data ya nje kwa ajili ya matumizi ya kandarasi za ndani ya mnyororo(neno za pembejeo), kutuma taarifa kutoka kwa kiambajengo hadi kwa programu za nje ya mnyororo (neno za pato), au kutekeleza majukumu ya kimahesabu nje ya mnyororo (neno za tarakilishi).

## Kwa nini mikataba mahiri inahitaji oracles? {#why-do-smart-contracts-need-oracles}

Wasanidi programu wengi huona mikataba mahiri kama msimbo unaoendeshwa kwenye anwani maalum kwenye mnyororo wa bloku. Hata hivyo, mtazamo [mpana zaidi wa mikataba mahiri](/smart-contracts/) ni kwamba ni programu za kompyuta zinazojitekeleza zenye uwezo wa kutekeleza makubaliano kati ya pande mbalimbali pindi masharti maalum yanapotimizwa - ndiyo maana ya neno “mikataba mahiri.”

Lakini kutumia mikataba mahiri kutekeleza makubaliano kati ya watu si jambo la moja kwa moja, ikizingatiwa kwamba Ethereum ni ya kuamua. [Mfumo wa kubainisha](https://en.wikipedia.org/wiki/Deterministic_algorithm) ni ule ambao daima hutoa matokeo sawa kwa kupewa hali ya awali na ingizo fulani, ikimaanisha hakuna nasibu au tofauti katika mchakato wa kukokotoa matokeo kutoka kwa ingizo.

Ili kufikia utekelezaji wa kubainisha, mnyororo wa bloku huweka kikomo nodi kufikia makubaliano juu ya maswali rahisi ya binary (kweli/sivyo) kwa kutumia data _pekee_ iliyohifadhiwa kwenye mnyororo wa bloku wenyewe. Mifano ya maswali kama hayo ni pamoja na:

- "Je, mmiliki wa akaunti (aliyetambuliwa kwa ufunguo wa umma) alitia saini shughuli hii kwa ufunguo wa faragha uliooanishwa?"
- “Je, akaunti hii ina fedha za kutosha kulipia muamala?”
- “Je, muamala huu ni halali katika muktadha wa mkataba huu mahiri?”, n.k.

Ikiwa mnyororo wa bloku ungepokea taarifa kutoka vyanzo vya nje (yaani, kutoka ulimwengu halisi), uamuzi haungewezekana kufikiwa, na kuzuia nodi kukubaliana juu ya uhalali wa mabadiliko kwenye hali ya mnyororo wa bloku. Chukua kwa mfano mkataba mahiri ambao hutekeleza shughuli kulingana na kiwango cha ubadilishaji cha ETH-USD kilichopatikana kutoka kwa API ya bei ya kawaida. Idadi hii ina uwezekano wa kubadilika mara kwa mara (bila kutaja kuwa API inaweza kuacha kutumika au kudukuliwa), ikimaanisha kwamba nodi zinazotekeleza msimbo sawa wa mkataba zinaweza kufikia matokeo tofauti.

Kwa kiambajeng cha umma kama Ethereum, iliyo na maelfu ya nodi kote ulimwenguni kuchakata miamala, uamuzi ni muhimu. Bila mamlaka kuu inayotumika kama chanzo cha ukweli, nodi zinahitaji mbinu za kuwasili katika hali sawa baada ya kutumia shughuli sawa. Kesi ambapo nodi A hutekeleza msimbo wa mkataba mahiri na kupata "3" kama matokeo, huku nodi B ikipata "7" baada ya kufanya shughuli hiyo hiyo inaweza kusababisha makubaliano kuvunjika na kuondoa thamani ya Ethereum kama jukwaa la kompyuta lililotawanywa.

Hali hii pia inaangazia tatizo la kubuni viambajengo ili kuvuta taarifa kutoka kwa vyanzo vya nje. Chanzo cha data cha nje, hata hivyo, hutatua tatizo hili kwa kuchukua maelezo kutoka kwa vyanzo vya offchain na kuyahifadhi kwenye kiambajengo ili mkataba mahiri zitumike. Kwa kuwa maelezo yaliyohifadhiwa kwenye mnyororo hayabadiliki na yanapatikana kwa umma, nodi za Ethereum zinaweza kutumia kwa usalama data ya chumba kilicholetwa nje ya mnyororo ili kukokotoa mabadiliko ya hali bila kuvunja makubaliano.

Ili kufanya hivyo, chumba cha ndani kwa kawaida huundwa na kandarasi mahiri inayoendesha mnyororo na baadhi ya vipengele vya nje ya mnyororo. Mkataba wa ndani ya mnyororo hupokea maombi ya data kutoka kwa mikataba mingine mahiri, ambayo hupitishwa kwa sehemu ya nje ya mnyororo(inayoitwa nodi ya chanzo cha nje). Nodi hii ya chumba cha ndani inaweza kuuliza vyanzo vya data kwa kutumia violesura vya utayarishaji wa programu (API), kwa mfano na kutuma miamala ili kuhifadhi data iliyoombwa kwenye hifadhi ya mkataba mahiri.

Kimsingi, chumba cha ndani cha blockchain hufunga pengo la habari kati ya kiamabjengo na mazingira ya nje, na kuunda "mkataba wa mahiri wa mseto". Mkataba wa mahiri wa mseto ni ule unaofanya kazi kulingana na mseto wa msimbo wa mkataba wa onchain na miundombinu ya ndani ya mnyororo. Masoko ya utabiri yaliyogatuliwa ni mfano bora wa mikataba mahiri ya mseto. Mifano mingine inaweza kujumuisha mikataba mahiri ya bima ya mazao ambayo hulipa wakati seti ya maneno hubaini kuwa matukio fulani ya hali ya hewa yamefanyika.

## Tatizo la oracle ni nini? {#the-oracle-problem}

Oracles hutatua tatizo muhimu, lakini pia huleta matatizo fulani, k.m.,:

- Je, tunawezaje kuthibitisha kuwa maelezo yaliyodungwa yalitolewa kutoka kwa chanzo sahihi au hayajachezewa?

- Tunahakikishaje kuwa data hii inapatikana kila wakati na inasasishwa mara kwa mara?

Kinachojulikana kama "tatizo la ombi" linaonyesha maswala ambayo huja kwa kutumia maneno ya kiambajengo kutuma maoni kwa mkataba mahiri. Data kutoka kwa oracle lazima iwe sahihi ili mkataba mahiri utekelezwe ipasavyo. Zaidi ya hayo, kulazimika ‘kuamini’ waendeshaji mazungumzo kutoa taarifa sahihi kunadhoofisha kipengele cha 'kutoaminika' cha mikataba mahiri.

Nadharia tofauti hutoa suluhu tofauti kwa tatizo la oracle, ambayo tutachunguza baadaye. Oracles kwa kawaida hutathminiwa kulingana na jinsi wanavyoweza kushughulikia changamoto zifuatazo:

1. **Usahihi**: Oracle haipaswi kusababisha mikataba mahiri kuanzisha mabadiliko ya hali kulingana na data batili ya nje ya mnyororo. Oracle lazima ihakikishe _uhalisi_ na _uadilifu_ wa data. Uhalisi unamaanisha data ilipatikana kutoka chanzo sahihi, huku uadilifu ukimaanisha data ilibaki bila kubadilika (yaani, haikubadilishwa) kabla ya kutumwa kwenye mnyororo.

2. **Upatikanaji**: Oracle haipaswi kuchelewesha au kuzuia mikataba mahiri kutekeleza vitendo na kuanzisha mabadiliko ya hali. Hii inamaanisha kuwa data kutoka kwa oracle lazima _ipatikane unapoomba_ bila kukatizwa.

3. **Utangamano wa motisha**: Oracle inapaswa kuhamasisha watoa data wa nje ya mnyororo kuwasilisha taarifa sahihi kwa mikataba mahiri. Utangamano wa motisha unahusisha _uwezo wa kuhusishwa_ na _uwajibikaji_. Uwezo wa kuhusishwa huruhusu kuunganisha sehemu ya taarifa ya nje na mtoa huduma wake, ilhali uwajibikaji huwaunganisha watoa huduma wa data na taarifa wanazotoa, ili waweze kuzawadiwa au kuadhibiwa kulingana na ubora wa taarifa inayotolewa.

## Huduma ya oracle ya mnyororo wa bloku hufanyaje kazi? {#how-does-a-blockchain-oracle-service-work}

### Watumiaji {#users}

Watumiaji ni vyombo (yaani, mikataba mahiri) vinavyohitaji taarifa za nje ya mnyororo wa bloku ili kukamilisha vitendo maalum. Mtiririko wa kazi wa msingi wa huduma ya oracle huanza na mtumiaji kutuma ombi la data kwa mkataba wa oracle. Maombi ya data kwa kawaida yatajibu baadhi au maswali yote yafuatayo:

1. Ni vyanzo gani ambavyo nodi za nje ya mnyororo zinaweza kushauriana kwa taarifa zilizoombwa?

2. Jinsi gani waandishi wa habari huchakata taarifa kutoka vyanzo vya data na kutoa pointi za data muhimu?

3. Ni nodi ngapi za oracle zinaweza kushiriki katika kupata data?

4. Tofauti katika ripoti za oracle zishughulikiwe vipi?

5. Ni mbinu gani inapaswa kutekelezwa katika kuchuja mawasilisho na kujumlisha ripoti katika thamani moja?

### Mkataba wa Oracle {#oracle-contract}

Mkataba wa oracle ni sehemu ya kwenye mnyororo kwa ajili ya huduma ya oracle. Husikiliza maombi ya data kutoka kwa mikataba mingine, hupeleka maswali ya data kwa nodi za oracle, na kutangaza data iliyorejeshwa kwa mikataba ya mteja. Mkataba huu unaweza pia kufanya hesabu fulani kwenye pointi za data zilizorejeshwa ili kutoa thamani ya jumla ya kutuma kwa mkataba unaoomba.

Mkataba wa oracle hufichua baadhi ya vipengele ambavyo mikataba ya mteja huita wakati wa kutuma ombi la data. Baada ya kupokea swali jipya, mkataba mahiri utatoa [tukio la kumbukumbu](/developers/docs/smart-contracts/anatomy/#events-and-logs) na maelezo ya ombi la data. Hii huarifu nodi za nje ya mnyororo zilizojisajili kwenye kumbukumbu (kawaida kwa kutumia kitu kama amri ya JSON-RPC `eth_subscribe`), ambao huendelea kupata data iliyobainishwa katika tukio la kumbukumbu.

Hapo chini kuna [mfano wa mkataba wa oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) na Pedro Costa. Hii ni huduma rahisi ya oracle ambayo inaweza kuuliza API za nje ya mnyororo kwa ombi la mikataba mingine mahiri na kuhifadhi taarifa zilizoombwa kwenye mnyororo wa bloku:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; // orodha ya maombi yaliyotumwa kwa mkataba
  uint currentId = 0; // kuongeza kitambulisho cha ombi
  uint minQuorum = 2; // idadi ya chini ya majibu ya kupokea kabla ya kutangaza matokeo ya mwisho
  uint totalOracleCount = 3; // Hesabu ya oracle iliyosimbikwa

  // inafafanua ombi la jumla la api
  struct Request {
    uint id;                            // kitambulisho cha ombi
    string urlToQuery;                  // URL ya API
    string attributeToFetch;            // sifa ya json (ufunguo) ya kupata katika jibu
    string agreedValue;                 // thamani kutoka kwa ufunguo
    mapping(uint => string) answers;     // majibu yaliyotolewa na oracles
    mapping(address => uint) quorum;    // oracles ambazo zitauliza jibu (1=oracle haijapiga kura, 2=oracle imepiga kura)
  }

  // tukio linaloanzisha oracle nje ya mnyororo wa bloku
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  // huanzishwa kunapokuwa na makubaliano juu ya matokeo ya mwisho
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

    // Anwani za oracles zilizosimbikwa
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // anzisha tukio litakalogunduliwa na oracle nje ya mnyororo wa bloku
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // ongeza kitambulisho cha ombi
    currentId++;
  }

  // huitwa na oracle kurekodi jibu lake
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    // angalia kama oracle iko kwenye orodha ya oracles zinazoaminika
    // na kama oracle haijapiga kura bado
    if(currRequest.quorum[address(msg.sender)] == 1){

      // kuashiria kuwa anwani hii imepiga kura
      currRequest.quorum[msg.sender] = 2;

      // pitia "safu" ya majibu hadi nafasi iwe huru na uhifadhi thamani iliyopatikana
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        // tafuta nafasi ya kwanza tupu
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      // pitia orodha ya oracle na uangalie ikiwa oracles za kutosha (akidi ya chini)
      // wamepiga kura jibu sawa na la sasa
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

### Nodi za Oracle {#oracle-nodes}

Nodi ya oracle ni sehemu ya nje ya mnyororo ya huduma ya oracle. Hutoa taarifa kutoka vyanzo vya nje, kama vile API zilizopangishwa kwenye seva za watu wengine, na kuiweka kwenye mnyororo kwa matumizi ya mikataba mahiri. Nodi za Oracle husikiliza matukio kutoka kwa mkataba wa oracle wa kwenye mnyororo na kuendelea kukamilisha kazi iliyoelezwa kwenye kumbukumbu.

Kazi ya kawaida kwa nodi za oracle ni kutuma ombi la [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) kwa huduma ya API, kuchanganua jibu ili kutoa data husika, kuiweka katika umbizo linaloweza kusomeka na blockchain, na kuituma kwenye mnyororo kwa kuijumuisha katika muamala kwa mkataba wa oracle. Nodi ya oracle inaweza pia kuhitajika kuthibitisha uhalali na uadilifu wa taarifa iliyowasilishwa kwa kutumia “uthibitisho wa uhalisi”, ambao tutauchunguza baadaye.

Oracles za kukokotoa pia hutegemea nodi za nje ya mnyororo kutekeleza kazi za kukokotoa ambazo hazingewezekana kutekeleza kwenye mnyororo, kutokana na gharama za gesi na vikomo vya ukubwa wa bloku. Kwa mfano, nodi ya chumba cha ndani inaweza kuwa na jukumu la kuzalisha takwimu isiyo ya kawaida (k.m., kwa michezo ya kiambajengo).

## Miundo ya usanifu wa Oracle {#oracle-design-patterns}

Oracles huja katika aina tofauti, ikiwa ni pamoja na _usomaji-wa-papo-hapo_, _uchapishaji-usajili_, na _ombi-jibu_, huku mbili za mwisho zikiwa maarufu zaidi miongoni mwa mikataba mahiri ya Ethereum. Hapa tunaelezea kwa ufupi mifumo ya uchapishaji-usajili na ombi-jibu.

### Oracles za uchapishaji-usajili {#publish-subscribe-oracles}

Aina hii ya ora hufichua "mlisho wa data" ambao mikataba mingine inaweza kusoma mara kwa mara ili kupata taarifa. Data katika kesi hii inatarajiwa kubadilika mara kwa mara, kwa hivyo ni lazima mikataba ya mteja isikilize masasisho ya data iliyo kwenye hifadhi ya chumba cha ndani. Mfano ni oracle inayotoa taarifa za hivi punde za bei ya ETH-USD kwa watumiaji.

### Oracles za ombi-jibu {#request-response-oracles}

Usanidi wa jibu la ombi huruhusu kandarasi ya mteja kuomba data kiholela isipokuwa ile iliyotolewa na ombi la uchapishaji wa kujisajili. Maagizo ya majibu ya ombi ni bora wakati mkusanyiko wa data ni mkubwa mno kuhifadhiwa kwenye hifadhi ya mkataba mahiri, na/au watumiaji watahitaji tu sehemu ndogo ya data wakati wowote.

Ingawa ni ngumu zaidi kuliko miundo ya kujiandikisha kwa uchapishaji, maneno ya ombi majibu kimsingi ndiyo tuliyoelezea katika sehemu iliyotangulia. Chanzo cha data cha nje itakuwa na sehemu ya ndani ya mnyororo ambayo inapokea ombi la data na kuipitisha kwa nodi ya nje ya mnyororo kwa usindikaji.

Watumiaji wanaoanzisha hoja za data lazima walipe gharama ya kurejesha maelezo kutoka kwa chanzo cha nje ya mnyororo. Watumiaji wanaoanzisha hoja za data lazima walipe gharama ya kurejesha maelezo kutoka kwa chanzo cha nje ya mnyororo.

## Oracles za kati dhidi ya zilizogatuliwa {#types-of-oracles}

### Oracles za kati {#centralized-oracles}

Sehemu kuu ya ndani inadhibitiwa na huluki moja inayohusika na kukusanya maelezo ya nje ya mnyororo na kusasisha data ya mkataba wa chumba cha ndani kama ilivyoombwa. Oracles za kati ni bora kwa vile zinategemea chanzo kimoja cha ukweli. Zinaweza kufanya kazi vyema zaidi katika hali ambapo hifadhidata za wamiliki zinachapishwa moja kwa moja na mmiliki kwa saini inayokubaliwa na wengi. Hata hivyo, huleta hasara pia:

#### Dhamana za chini za usahihi {#low-correctness-guarantees}

Ukiwa na oracles za kati, hakuna njia ya kuthibitisha ikiwa taarifa iliyotolewa ni sahihi au la. Hata watoa huduma "wanaoaminika" wanaweza kuharibika au kudukuliwa. Ikiwa oracle itaharibika, mikataba mahiri itatekelezwa kulingana na data mbovu.

#### Upatikanaji duni {#poor-availability}

Maneno ya kati hayana hakikisho ya kufanya data ya nje ya mtandao ipatikane kwa mikataba mingine mahiri kila wakati. Iwapo mtoa huduma ataamua kuzima huduma au mdukuzi anateka sehemu ya chanzo cha nje ya mnyororo, mkataba wako mahiri uko katika hatari ya shambulio la kunyimwa huduma (DoS).

#### Utangamano duni wa motisha {#poor-incentive-compatibility}

Maandishi ya kati mara nyingi huwa na vivutio vilivyoundwa vibaya au kutokuwepo kwa mtoa data kutuma taarifa sahihi/ambayo haijabadilishwa. Kulipa oracle kwa usahihi hakuhakikishi uaminifu. Tatizo hili linakuwa kubwa zaidi kadiri kiasi cha thamani kinachodhibitiwa na mikataba mahiri kinavyoongezeka.

### Oracles zilizogatuliwa {#decentralized-oracles}

Maneno yaliyogatuliwa yameundwa ili kushinda mapungufu ya hotuba kuu kwa kuondoa alama moja za kutofaulu. Huduma ya hotuba iliyogatuliwa hujumuisha washiriki wengi katika mtandao wa kati-ka-rika ambao huunda makubaliano kuhusu data ya offchain kabla ya kuituma kwa mkataba mahiri.

Sehemu ya hotuba iliyogatuliwa inapaswa (ikiwezekana) kuwa isiyo na ruhusa, isiyoaminika, na isiyo na usimamizi wa chama kikuu; kwa kweli, ugatuaji kati ya hotuba ni juu ya wigo. Kuna mitandao ya siri iliyogatuliwa ambapo mtu yeyote anaweza kushiriki, lakini akiwa na "mmiliki" anayeidhinisha na kuondoa nodi kulingana na utendakazi wa kihistoria. Mitandao ya siri iliyotawanywa kikamilifu pia ipo: kwa kawaida hii huendeshwa kama misururu ya pekee na imefafanua mbinu za maafikiano za kuratibu nodi na kuadhibu tabia mbaya.

Kutumia oracles zilizogatuliwa huja na manufaa yafuatayo:

### Dhamana za juu za usahihi {#high-correctness-guarantees}

Oracles zilizogatuliwa hujaribu kufikia usahihi wa data kwa kutumia mbinu tofauti. Hii ni pamoja na kutumia uthibitisho unaothibitisha uhalisi na uadilifu wa taarifa iliyorejeshwa na kuhitaji huluki nyingi kukubaliana kwa pamoja juu ya uhalali wa data ya nje ya mnyororo.

#### Uthibitisho wa uhalisi {#authenticity-proofs}

Uthibitisho wa uhalisi ni mbinu za kriptografia ambazo huwezesha uthibitishaji huru wa maelezo yaliyopatikana kutoka kwa vyanzo vya nje. Uthibitisho huu unaweza kuthibitisha chanzo cha habari na kugundua mabadiliko yanayoweza kutokea kwa data baada ya kurejesha.

Mifano ya uthibitisho wa uhalisi ni pamoja na:

**Uthibitisho wa Usalama wa Tabaka la Usafiri (TLS)**: Nodi za Oracle mara nyingi hupata data kutoka vyanzo vya nje kwa kutumia muunganisho salama wa HTTP kulingana na itifaki ya Usalama wa Tabaka la Usafiri (TLS). Baadhi ya hotuba zilizogatuliwa hutumia uthibitisho wa uhalisi ili kuthibitisha vipindi vya TLS (yaani, kuthibitisha ubadilishanaji wa taarifa kati ya nodi na seva mahususi) na kuthibitisha kuwa maudhui ya kipindi hayakubadilishwa.

**Uthibitisho wa Mazingira ya Utekelezaji Yanayoaminika (TEE)**: [Mazingira ya utekelezaji yanayoaminika](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ni mazingira ya ukokotoaji yaliyowekwa kwenye sandbox ambayo yametengwa na michakato ya uendeshaji ya mfumo wake mkuu. TEE huhakikisha kwamba msimbo wowote wa programu au data iliyohifadhiwa/inayotumiwa katika mazingira ya ukokotoaji huhifadhi uadilifu, usiri, na kutobadilika. Watumiaji wanaweza pia kutoa uthibitisho ili kuthibitisha kuwa kielelezo cha programu kinaendeshwa ndani ya mazingira ya utekelezaji yanayoaminika.

Aina fulani za oracles zilizogatuliwa zinahitaji waendeshaji wa nodi za oracle kutoa uthibitisho wa TEE. Hii inathibitisha kwa mtumiaji kwamba mwendeshaji wa nodi anaendesha kielelezo cha mteja wa oracle katika mazingira ya utekelezaji yanayoaminika. TEE huzuia michakato ya nje kubadilisha au kusoma msimbo na data ya programu, kwa hiyo, uthibitisho huo unathibitisha kwamba nodi ya oracle imehifadhi taarifa hizo bila kubadilika na kwa siri.

#### Uthibitishaji wa taarifa kulingana na makubaliano {#consensus-based-validation-of-information}

Oracles za kati hutegemea chanzo kimoja cha ukweli wakati wa kutoa data kwa mikataba mahiri, jambo ambalo huleta uwezekano wa kuchapisha taarifa zisizo sahihi. Oracles zilizogatuliwa hutatua tatizo hili kwa kutegemea nodi nyingi za oracle kuuliza taarifa za nje ya mnyororo. Kwa kulinganisha data kutoka vyanzo vingi, oracles zilizogatuliwa hupunguza hatari ya kupitisha taarifa batili kwa mikataba ya kwenye mnyororo.

Hata hivyo, oracles zilizogatuliwa lazima zishughulikie tofauti katika taarifa zilizopatikana kutoka vyanzo vingi vya nje ya mnyororo. Ili kupunguza tofauti katika taarifa na kuhakikisha data inayopitishwa kwa mkataba wa oracle inaonyesha maoni ya pamoja ya nodi za oracle, oracles zilizogatuliwa hutumia mifumo ifuatayo:

##### Upigaji kura/uwekaji hisa juu ya usahihi wa data

Baadhi ya mitandao ya oracle iliyogatuliwa inahitaji washiriki kupiga kura au kuweka hisa juu ya usahihi wa majibu kwa maswali ya data (k.m., "Nani alishinda uchaguzi wa Marekani wa 2020?") kwa kutumia tokeni asili ya mtandao. Itifaki ya ujumlishaji kisha hujumlisha kura na hisa na kuchukua jibu linaloungwa mkono na walio wengi kama lile halali.

Nodi ambazo majibu yake yanatofautiana na jibu la wengi huadhibiwa kwa kugawiwa tokeni zao kwa wengine wanaotoa thamani sahihi zaidi. Kulazimisha nodi kutoa dhamana kabla ya kutoa data huhamasisha majibu ya uaminifu kwani wanachukuliwa kuwa watendaji wa kiuchumi wenye busara wanaokusudia kuongeza mapato.

Uwekaji hisa/upigaji kura pia hulinda oracles zilizogatuliwa dhidi ya [mashambulizi ya Sybil](/glossary/#sybil-attack) ambapo watendaji hasidi huunda vitambulisho vingi ili kudanganya mfumo wa makubaliano. Hata hivyo, uwekaji hisa hauwezi kuzuia “utegaji” (nodi za oracle kunakili taarifa kutoka kwa wengine) na “uthibitishaji wa uvivu” (nodi za oracle kufuata walio wengi bila kuthibitisha taarifa wenyewe).

##### Mifumo ya Schelling point

[Schelling point](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) ni dhana ya nadharia ya mchezo inayodhani kuwa vyombo vingi daima vitachagua suluhisho la kawaida kwa tatizo bila mawasiliano yoyote. Mifumo ya Schelling-point mara nyingi hutumiwa katika mitandao ya oracle iliyogatuliwa ili kuwezesha nodi kufikia makubaliano juu ya majibu kwa maombi ya data.

Wazo la mapema kwa hili lilikuwa [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), mlisho wa data uliopendekezwa ambapo washiriki huwasilisha majibu kwa maswali ya "scalar" (maswali ambayo majibu yake yanaelezewa na ukubwa, k.m., "bei ya ETH ni nini?"), pamoja na amana. Watumiaji wanaotoa thamani kati ya [percentile](https://en.wikipedia.org/wiki/Percentile) ya 25 na 75 wanazawadiwa, huku wale ambao thamani zao zinatofautiana sana na thamani ya wastani wanaadhibiwa.

Ingawa SchellingCoin haipo leo, idadi ya oracles zilizogatuliwa—hasa [Oracles za Maker Protocol](https://docs.makerdao.com/smart-contract-modules/oracle-module)—hutumia mfumo wa schelling-point ili kuboresha usahihi wa data ya oracle. Kila Oracle ya Maker ina mtandao wa P2P wa nje ya mnyororo wa nodi ("relayers" na "feeds") ambao huwasilisha bei za soko kwa mali za dhamana na mkataba wa kwenye mnyororo wa “Medianizer” unaokokotoa wastani wa thamani zote zilizotolewa. Mara tu kipindi maalum cha kucheleweshwa kinapoisha, thamani hii ya wastani inakuwa bei mpya ya kumbukumbu ya mali inayohusishwa.

Mifano mingine ya oracles zinazotumia mifumo ya Schelling point ni pamoja na [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) na [Witnet](https://witnet.io/). Katika mifumo yote miwili, majibu kutoka kwa nodi za oracle katika mtandao wa rika-kwa-rika hujumlishwa kuwa thamani moja ya jumla, kama vile wastani au wastani. Nodi hutuzwa au kuadhibiwa kulingana na kiwango ambacho majibu yao yanalingana au kupotoka kutoka kwa jumla ya thamani.

Taratibu za sehemu za Schelling zinavutia kwa sababu zinapunguza alama ya onchain (muamala mmoja tu ndio unahitaji kutumwa) huku ukihakikisha utawanyaji. La mwisho linawezekana kwa sababu nodi lazima ziondoke kwenye orodha ya majibu yaliyowasilishwa kabla ya kulishwa kwenye algoriti inayotoa thamani ya wastani/wastani.

### Upatikanaji {#availability}

Huduma za oracle zilizogatuliwa huhakikisha upatikanaji wa juu wa data ya nje ya mnyororo kwa mikataba mahiri. Hili linaafikiwa kwa kugawanya vyanzo vyote viwili vya maelezo ya nje ya mnyororo na nodi zinazohusika na kuhamisha taarifa kwenye mnyororo.

Hii inahakikisha uvumilivu wa hitilafu kwa kuwa mkataba wa chumba cha ndani unaweza kutegemea nodi nyingi (ambazo pia hutegemea vyanzo vingi vya data) kutekeleza hoja kutoka kwa mikataba mingine. Ugatuzi katika chanzo _na_ kiwango cha mwendeshaji-nodi ni muhimu—mtandao wa nodi za oracle unaotoa taarifa zilizopatikana kutoka chanzo kimoja utakumbana na tatizo sawa na oracle ya kati.

Inawezekana pia kwa maneno yanayotegemea hisa kufyeka waendeshaji wa nodi ambao wanashindwa kujibu maombi ya data haraka. Hii inatia motisha kwa kiasi kikubwa nodi za oracle kuwekeza katika miundombinu inayostahimili hitilafu na kutoa data kwa wakati ufaao.

### Utangamano mzuri wa motisha {#good-incentive-compatibility}

Oracles zilizogatuliwa hutekeleza miundo mbalimbali ya motisha ili kuzuia tabia ya [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) miongoni mwa nodi za oracle. Hasa, wanafanikisha _uwezo wa kuhusishwa_ na _uwajibikaji_:

1. Nodi za chanzo cha data cha nje kilichotawanywa mara nyingi huhitajika kutia sahihi data wanazotoa kujibu maombi ya data. Maelezo haya husaidia kutathmini utendakazi wa kihistoria wa nodi za oracle, ili watumiaji waweze kuchuja nodi za siri zisizotegemewa wanapotuma maombi ya data. Mfano ni [Mfumo wa Sifa za Algorithmic](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) wa Witnet.

2. Maandishi yaliyotawanywa kama ilivyoelezwa hapo awali huenda ikahitaji nodi kuweka hisa kwenye imani yao katika ukweli wa data wanayowasilisha. Ikiwa dai litathibitishwa, hisa hii inaweza kurejeshwa pamoja na zawadi kwa huduma ya uaminifu. Lakini pia inaweza kupunguzwa ikiwa habari si sahihi, ambayo hutoa kipimo fulani cha uwajibikaji.

## Matumizi ya oracles katika mikataba mahiri {#applications-of-oracles-in-smart-contracts}

Yafuatayo ni matumizi ya kawaida ya oracles katika Ethereum:

### Kupata data ya kifedha {#retrieving-financial-data}

Programu za [fedha zilizogatuliwa](/defi/) (DeFi) huruhusu ukopeshaji, ukopaji, na biashara ya mali baina ya watu. Hii mara nyingi huhitaji kupata taarifa tofauti za kifedha, ikiwa ni pamoja na data ya kiwango cha ubadilishaji (kwa kukokotoa thamani ya fiat ya sarafu za siri au kulinganisha bei za tokeni) na data ya masoko ya mitaji (kwa kukokotoa thamani ya mali iliyowekewa alama, kama vile dhahabu au dola ya Marekani).

Itifaki ya ukopeshaji wa DeFi, kwa mfano, inahitaji kuuliza bei za sasa za soko za mali (k.m., ETH) zilizowekwa kama dhamana. Hii huruhusu mkataba kubainisha thamani ya mali ya dhamana na kubainisha ni kiasi gani kinaweza kukopa kutoka kwa mfumo.

"Oracles za bei" maarufu (kama zinavyoitwa mara nyingi) katika DeFi ni pamoja na Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) ya Compound Protocol, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) za Uniswap, na [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Wajenzi wanapaswa kuelewa tahadhari zinazokuja na maneno haya ya bei kabla ya kujumuisha katika mradi wao. [Makala](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) hii inatoa uchambuzi wa kina wa nini cha kuzingatia unapopanga kutumia mojawapo ya oracles za bei zilizotajwa.

Ufuatao ni mfano wa jinsi unavyoweza kurejesha bei ya hivi punde ya ETH katika mkataba wako mahiri kwa kutumia mlisho wa bei wa Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Mtandao: Kovan
     * Mjumlishi: ETH/USD
     * Anwani: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Hurejesha bei ya hivi punde
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

### Kuzalisha unasibu unaoweza kuthibitishwa {#generating-verifiable-randomness}

Baadhi ya programu za blockchain, kama vile michezo ya kiambajengo au miradi ya bahati nasibu, zinahitaji kiwango cha juu cha kutotabirika na nasibu ili kufanya kazi kwa ufanisi. Hata hivyo, utekelezaji wa kubainisha wa blockchains huondoa unasibu.

Mbinu ya awali ilikuwa kutumia vitendaji vya kriptografia vya pseudorandom, kama vile `blockhash`, lakini hizi zinaweza [kudanganywa na wachimbaji](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) kutatua algoriti ya uthibitisho-wa-kazi. Pia, [mabadiliko ya Ethereum kwenda uthibitisho-wa-hisa](/roadmap/merge/) inamaanisha wasanidi programu hawawezi tena kutegemea `blockhash` kwa unasibu wa kwenye mnyororo. Mfumo wa [RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) wa Beacon Chain hutoa chanzo mbadala cha unasibu badala yake.

Inawezekana kutoa thamani nasibu nje ya mnyororo na kuituma kwenye mnyororo, lakini kufanya hivyo huweka mahitaji ya juu ya uaminifu kwa watumiaji. Ni lazima waamini kwamba thamani ilitolewa kupitia njia zisizotabirika na haikubadilishwa katika usafiri.

Maandishi yaliyoundwa kwa ajili ya kukokotoa nje ya mnyororo hutatua tatizo hili kwa kutoa matokeo nasibu nje ya mnyororo kwa usalama ambayo hutangaza kwenye msururu pamoja na uthibitisho wa kriptografia unaothibitisha kutotabirika kwa mchakato huo. Mfano ni [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), ambayo ni jenereta ya nambari nasibu (RNG) inayoweza kuthibitishwa kuwa ya haki na isiyoweza kuchezewa, muhimu kwa ajili ya kujenga mikataba mahiri ya kuaminika kwa programu zinazotegemea matokeo yasiyotabirika.

### Kupata matokeo ya matukio {#getting-outcomes-for-events}

Ukiwa na oracles, kuunda mikataba mahiri inayojibu matukio ya ulimwengu halisi ni rahisi. Huduma za chanzo cha data cha nje hurahisisha hili kwa kuruhusu kandarasi kuunganishwa kwa API za nje kupitia vipengele vya offchain na kutumia taarifa kutoka kwa vyanzo hivyo vya data. Kwa mfano, utabiri wa dapp uliotajwa hapo awali unaweza kuomba hotuba ya kurudisha matokeo ya uchaguzi kutoka kwa chanzo kinachoaminika (k.m., Associated Press).

Kutumia hotuba kupata data kulingana na matokeo ya ulimwengu halisi huwezesha visa vingine vya utumiaji wa riwaya; kwa mfano, bidhaa ya bima iliyogatuliwa inahitaji taarifa sahihi kuhusu hali ya hewa, majanga, n. k. ili kufanya kazi kwa ufanisi.

### Kufanya mikataba mahiri ijiendeshe yenyewe {#automating-smart-contracts}

Mikataba mahiri haiendeshwi kiotomatiki; badala yake, akaunti inayomilikiwa na nje (EOA), au akaunti nyingine ya mkataba, lazima ianzishe kazi zinazofaa ili kutekeleza msimbo wa mkataba. Mara nyingi, sehemu kubwa ya kazi za mkataba ni za umma na zinaweza kutumiwa na EOAs na mikataba mingine.

Lakini pia kuna _vitendaji vya faragha_ ndani ya mkataba ambavyo havifikiki kwa wengine;, lakini ni muhimu kwa utendakazi wa jumla wa dapp. Mifano ni pamoja na kitendaji cha `mintERC721Token()` ambacho mara kwa mara huchapisha NFTs mpya kwa watumiaji, kitendaji cha kutoa malipo katika soko la utabiri, au kitendaji cha kufungua tokeni zilizowekwa hisa katika DEX.

Wasanidi programu watahitaji kuanzisha vitendaji hivyo kwa vipindi ili kuweka programu iendeshe vizuri. Hata hivyo, hii inaweza kusababisha kupoteza masaa mengi zaidi kwenye kazi za kawaida kwa wasanidi programu, ndiyo maana kufanya utekelezaji wa mikataba mahiri ujiendeshe wenyewe kunavutia.

Baadhi ya mitandao ya oracle iliyogatuliwa hutoa huduma za kujiendesha, ambazo huruhusu nodi za oracle za nje ya mnyororo kuanzisha vitendaji vya mkataba mahiri kulingana na vigezo vilivyobainishwa na mtumiaji. Kwa kawaida, hii inahitaji “kusajili” mkataba lengwa na huduma ya oracle, kutoa fedha za kumlipa mwendeshaji wa oracle, na kubainisha masharti au nyakati za kuanzisha mkataba.

[Mtandao wa Keeper](https://chain.link/keepers) wa Chainlink hutoa chaguo kwa mikataba mahiri kutoa kazi za matengenezo ya mara kwa mara kwa njia ya kupunguza uaminifu na iliyogatuliwa. Soma [nyaraka](https://docs.chain.link/docs/chainlink-keepers/introduction/) rasmi za Keeper kwa taarifa juu ya kufanya mkataba wako uendane na Keeper na kutumia huduma ya Upkeep.

## Jinsi ya kutumia oracles za mnyororo wa bloku {#use-blockchain-oracles}

Kuna programu nyingi za oracle unazoweza kuunganisha kwenye dapp yako ya Ethereum:

**[Chainlink](https://chain.link/)** - _Mitandao ya oracle iliyogatuliwa ya Chainlink hutoa ingizo, matokeo, na hesabu zisizoweza kuchezewa ili kusaidia mikataba mahiri ya hali ya juu kwenye mnyororo wowote wa bloku._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone ni oracle ya msimu iliyogatuliwa inayotoa milisho ya data iliyoboreshwa kwa gesi. Inajihusisha na kutoa milisho ya bei kwa mali zinazoibuka, kama vile tokeni za uwekaji hisa kioevu (LSTs), tokeni za uwekaji hisa kioevu (LRTs), na derivatives za uwekaji hisa za Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle inashinda vikwazo vya sasa vya kuhamisha data kwenye mnyororo kwa kuendeleza oracles zinazoweza kuongezeka, za gharama nafuu, zilizogatuliwa, na zinazoweza kuthibitishwa._

**[Witnet](https://witnet.io/)** - _Witnet ni oracle isiyo na ruhusa, iliyogatuliwa, na inayostahimili udhibiti inayosaidia mikataba mahiri kujibu matukio ya ulimwengu halisi na dhamana dhabiti za kiuchumi-kripto._

**[UMA Oracle](https://uma.xyz)** - _Oracle ya matumaini ya UMA inaruhusu mikataba mahiri kupokea haraka na aina yoyote ya data kwa programu tofauti, ikiwa ni pamoja na bima, derivatives za kifedha, na masoko ya utabiri._

**[Tellor](https://tellor.io/)** - _Tellor ni itifaki ya oracle ya uwazi na isiyo na ruhusa kwa mkataba wako mahiri kupata data yoyote kwa urahisi wakati wowote inapohitaji._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol ni jukwaa la oracle la data la mnyororo-tofauti ambalo hujumlisha na kuunganisha data ya ulimwengu halisi na API kwa mikataba mahiri._

**[Pyth Network](https://pyth.network/)** - _Mtandao wa Pyth ni mtandao wa oracle wa kifedha wa wahusika wa kwanza ulioundwa kuchapisha data endelevu ya ulimwengu halisi kwenye mnyororo katika mazingira yasiyoweza kuchezewa, yaliyogatuliwa, na yanayojitegemea._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO inatoa suluhisho za oracle za wahusika wa kwanza ambazo hutoa uwazi zaidi wa chanzo, usalama na uwezo wa kuongezeka katika suluhisho lililogatuliwa kwa mikataba mahiri_

**[Supra](https://supra.com/)** - Zana iliyounganishwa kiwima ya suluhisho za mnyororo-tofauti zinazounganisha blockchains zote, za umma (L1s na L2s) au za kibinafsi (biashara), ikitoa milisho ya bei ya oracle iliyogatuliwa ambayo inaweza kutumika kwa matumizi ya kwenye mnyororo na nje ya mnyororo.

**[Gas Network](https://gas.network/)** - Jukwaa la oracle lililosambazwa linalotoa data ya bei ya gesi ya wakati halisi kote kwenye mnyororo wa bloku. Kwa kuleta data kutoka kwa watoa huduma wakuu wa data ya bei ya gesi kwenye mnyororo, Gas Network inasaidia kuendesha ushirikiano. Gas Network inasaidia data kwa minyororo zaidi ya 35, ikiwa ni pamoja na Ethereum Mainnet na L2 nyingi zinazoongoza.

## Masomo zaidi {#further-reading}

**Makala**

- [Oracle ya Mnyororo wa Bloku ni Nini?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Oracle ya Mnyororo wa Bloku ni Nini?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracles Zilizogatuliwa: muhtasari wa kina](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Kutekeleza Oracle ya Mnyororo wa Bloku kwenye Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Kwa nini mikataba mahiri haiwezi kupiga simu za API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Kwa hiyo unataka kutumia oracle ya bei](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Oracles na Upanuzi wa Matumizi ya Mnyororo wa Bloku](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Mafunzo**

- [Jinsi ya Kupata Bei ya Sasa ya Ethereum katika Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Kutumia Data ya Oracle](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Mifano ya kazi**

- [Mradi kamili wa kuanzia wa Chainlink kwa Ethereum katika Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
