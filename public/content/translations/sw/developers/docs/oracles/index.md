---
title: Orakeli
description: Orakeli hutoa mikataba mahiri ya Ethereum ufikiaji wa data ya ulimwengu halisi, na kufungua matumizi zaidi na thamani kubwa kwa watumiaji.
lang: sw
authors: ["Patrick Collins"]
---

Orakeli ni programu zinazozalisha milisho ya data inayofanya vyanzo vya data vya nje ya mnyororo vipatikane kwenye mnyororo wa vitalu kwa ajili ya mikataba mahiri. Hili ni muhimu kwa sababu mikataba mahiri inayotegemea Ethereum haiwezi, kwa chaguo-msingi, kufikia taarifa zilizohifadhiwa nje ya mtandao wa mnyororo wa vitalu.

Kuipa mikataba mahiri uwezo wa kutekeleza kwa kutumia data ya nje ya mnyororo huongeza matumizi na thamani ya programu tumizi zilizogatuliwa (dapps). Kwa mfano, masoko ya ubashiri mnyororoni hutegemea orakeli kutoa taarifa kuhusu matokeo wanayotumia kuthibitisha ubashiri wa watumiaji. Tuseme Alice anaweka dau la 20 ETH kuhusu nani atakuwa Rais ajaye wa Marekani. Katika hali hiyo, dapp ya soko la ubashiri inahitaji orakeli ili kuthibitisha matokeo ya uchaguzi na kubaini ikiwa Alice anastahili kulipwa.

## Masharti ya Awali {#prerequisites}

Ukurasa huu unachukulia kuwa msomaji anafahamu misingi ya [Ethereum](/), ikiwa ni pamoja na [nodi](/developers/docs/nodes-and-clients/), [mbinu za mwafaka](/developers/docs/consensus-mechanisms/), na [EVM](/developers/docs/evm/). Unapaswa pia kuwa na uelewa mzuri wa [mikataba mahiri](/developers/docs/smart-contracts/) na [muundo wa mkataba mahiri](/developers/docs/smart-contracts/anatomy/), hasa [matukio](/glossary/#events).

## Orako ya mnyororo wa vitalu ni nini? {#what-is-a-blockchain-oracle}

Orakeli ni programu zinazotafuta, kuthibitisha, na kusambaza taarifa za nje (yaani, taarifa zilizohifadhiwa nje ya mnyororo) kwenye mikataba mahiri inayoendeshwa kwenye mnyororo wa vitalu. Kando na “kuvuta” data ya nje ya mnyororo na kuisambaza kwenye Ethereum, orakeli zinaweza pia “kusukuma” taarifa kutoka kwenye mnyororo wa vitalu kwenda kwenye mifumo ya nje, k.m., kufungua kufuli mahiri mara tu mtumiaji anapotuma ada kupitia muamala wa Ethereum.

Bila orakeli, mkataba mahiri ungekuwa na kikomo kabisa kwenye data ya mnyororoni.

Orakeli hutofautiana kulingana na chanzo cha data (chanzo kimoja au vingi), miundo ya uaminifu (iliyowekwa kati au iliyogatuliwa), na usanifu wa mfumo (kusoma-mara-moja, kuchapisha-kujiandikisha, na kuomba-kujibu). Tunaweza pia kutofautisha kati ya orakeli kulingana na kama zinarejesha data ya nje kwa matumizi ya mikataba ya mnyororoni (orakeli za kuingiza), kutuma taarifa kutoka kwenye mnyororo wa vitalu kwenda kwenye programu za nje ya mnyororo (orakeli za kutoa), au kufanya kazi za kimahesabu nje ya mnyororo (orakeli za kimahesabu).

## Kwa nini mikataba mahiri inahitaji orakeli? {#why-do-smart-contracts-need-oracles}

Wasanidi wengi huona mikataba mahiri kama msimbo unaoendeshwa kwenye anwani mahususi kwenye mnyororo wa vitalu. Hata hivyo, [mtazamo wa jumla zaidi wa mikataba mahiri](/smart-contracts/) ni kwamba ni programu za kompyuta zinazojitekeleza zenyewe zenye uwezo wa kutekeleza makubaliano kati ya pande mbili mara tu masharti mahususi yanapotimizwa - hivyo basi neno “mikataba mahiri.”

Lakini kutumia mikataba mahiri kutekeleza makubaliano kati ya watu si jambo la moja kwa moja, ikizingatiwa kuwa Ethereum ni ya kiutabiri (deterministic). [Mfumo wa kiutabiri](https://en.wikipedia.org/wiki/Deterministic_algorithm) ni ule ambao daima hutoa matokeo sawa kutokana na hali ya awali na ingizo fulani, ikimaanisha hakuna unasibu au tofauti katika mchakato wa kukokotoa matokeo kutoka kwenye maingizo.

Ili kufikia utekelezaji wa kiutabiri, minyororo ya vitalu huwekea kikomo nodi kufikia mwafaka kwenye maswali rahisi ya mfumo wa namba mbili (kweli/si kweli) kwa kutumia _tu_ data iliyohifadhiwa kwenye mnyororo wa vitalu wenyewe. Mifano ya maswali kama haya ni pamoja na:

- “Je, mmiliki wa akaunti (aliyetambuliwa kwa ufunguo wa umma) alisaini muamala huu kwa ufunguo wa siri unaolingana?”
- “Je, akaunti hii ina fedha za kutosha kugharamia muamala?”
- “Je, muamala huu ni halali katika muktadha wa mkataba huu mahiri?”, n.k.

Ikiwa minyororo ya vitalu ingepokea taarifa kutoka vyanzo vya nje (yaani, kutoka ulimwengu halisi), utabiri ungekuwa hauwezekani kufikiwa, na kuzuia nodi kukubaliana juu ya uhalali wa mabadiliko kwenye hali ya mnyororo wa vitalu. Chukulia kwa mfano mkataba mahiri unaotekeleza muamala kulingana na kiwango cha sasa cha ubadilishaji cha ETH-USD kilichopatikana kutoka kwenye API ya bei ya kitamaduni. Takwimu hii ina uwezekano wa kubadilika mara kwa mara (bila kusahau kuwa API inaweza kuachwa kutumika au kudukuliwa), ikimaanisha nodi zinazotekeleza msimbo sawa wa mkataba zingefikia matokeo tofauti.

Kwa mnyororo wa vitalu wa umma kama Ethereum, wenye maelfu ya nodi duniani kote zinazochakata miamala, utabiri ni muhimu sana. Kwa kuwa hakuna mamlaka kuu inayotumika kama chanzo cha ukweli, nodi zinahitaji mbinu za kufikia hali sawa baada ya kutumia miamala sawa. Hali ambapo nodi A inatekeleza msimbo wa mkataba mahiri na kupata "3" kama matokeo, huku nodi B ikipata "7" baada ya kuendesha muamala sawa ingesababisha mwafaka kuvunjika na kuondoa thamani ya Ethereum kama jukwaa la kompyuta lililogatuliwa.

Hali hii pia inaangazia tatizo la kubuni minyororo ya vitalu ili kuvuta taarifa kutoka vyanzo vya nje. Orakeli, hata hivyo, hutatua tatizo hili kwa kuchukua taarifa kutoka vyanzo vya nje ya mnyororo na kuihifadhi kwenye mnyororo wa vitalu ili mikataba mahiri itumie. Kwa kuwa taarifa iliyohifadhiwa mnyororoni haibadiliki na inapatikana kwa umma, nodi za Ethereum zinaweza kutumia kwa usalama data ya nje ya mnyororo iliyoingizwa na orakeli ili kukokotoa mabadiliko ya hali bila kuvunja mwafaka.

Ili kufanya hivi, orakeli kwa kawaida huundwa na mkataba mahiri unaoendeshwa mnyororoni na baadhi ya vipengele vya nje ya mnyororo. Mkataba wa mnyororoni hupokea maombi ya data kutoka kwenye mikataba mingine mahiri, ambayo huipitisha kwenye kipengele cha nje ya mnyororo (kinachoitwa nodi ya orakeli). Nodi hii ya orakeli inaweza kuuliza vyanzo vya data—kwa kutumia API, kwa mfano—na kutuma miamala ili kuhifadhi data iliyoombwa kwenye hifadhi ya mkataba mahiri.

Kimsingi, orako ya mnyororo wa vitalu huziba pengo la taarifa kati ya mnyororo wa vitalu na mazingira ya nje, na kuunda “mikataba mahiri ya mseto”. Mkataba mahiri wa mseto ni ule unaofanya kazi kulingana na mchanganyiko wa msimbo wa mkataba wa mnyororoni na miundombinu ya nje ya mnyororo. Masoko ya ubashiri yaliyogatuliwa ni mfano bora wa mikataba mahiri ya mseto. Mifano mingine inaweza kujumuisha mikataba mahiri ya bima ya mazao inayolipa wakati kundi la orakeli linapobaini kuwa matukio fulani ya hali ya hewa yametokea.

## Tatizo la oracle ni nini? {#the-oracle-problem}

Orakeli hutatua tatizo muhimu, lakini pia huleta baadhi ya matatizo, k.m.,:

- Je, tunathibitishaje kuwa taarifa iliyoingizwa ilitolewa kutoka kwenye chanzo sahihi au haijachezewa?

- Je, tunahakikishaje kuwa data hii inapatikana kila wakati na inasasishwa mara kwa mara?

Kinachojulikana kama “tatizo la oracle” kinaonyesha masuala yanayokuja na kutumia orako za mnyororo wa vitalu kutuma maingizo kwenye mikataba mahiri. Data kutoka kwenye orakeli lazima iwe sahihi ili mkataba mahiri utekelezwe kwa usahihi. Zaidi ya hayo, kulazimika 'kuamini' waendeshaji wa orakeli kutoa taarifa sahihi kunadhoofisha kipengele cha 'bila hitaji la uaminifu' cha mikataba mahiri.

Orakeli tofauti hutoa suluhu tofauti kwa tatizo la oracle, ambalo tutalichunguza baadaye. Orakeli kwa kawaida hutathminiwa kulingana na jinsi zinavyoweza kushughulikia changamoto zifuatazo vizuri:

1. **Usahihi**: Orakeli haipaswi kusababisha mikataba mahiri kuanzisha mabadiliko ya hali kulingana na data batili ya nje ya mnyororo. Orakeli lazima ihakikishe _uhalisi_ na _uadilifu_ wa data. Uhalisi unamaanisha data ilipatikana kutoka kwenye chanzo sahihi, huku uadilifu ukimaanisha data ilibaki sawa (yaani, haikubadilishwa) kabla ya kutumwa mnyororoni.

2. **Upatikanaji**: Orakeli haipaswi kuchelewesha au kuzuia mikataba mahiri kutekeleza vitendo na kuanzisha mabadiliko ya hali. Hii inamaanisha kuwa data kutoka kwenye orakeli lazima iwe _inapatikana kwa ombi_ bila usumbufu.

3. **Utangamano wa motisha**: Orakeli inapaswa kuwapa motisha watoa data wa nje ya mnyororo kuwasilisha taarifa sahihi kwenye mikataba mahiri. Utangamano wa motisha unahusisha _uwezo wa kuhusishwa_ na _uwajibikaji_. Uwezo wa kuhusishwa unaruhusu kuunganisha kipande cha taarifa ya nje na mtoa huduma wake, huku uwajibikaji ukiwafunga watoa data kwenye taarifa wanayotoa, ili waweze kutuzwa au kuadhibiwa kulingana na ubora wa taarifa iliyotolewa.

## Huduma ya orako ya mnyororo wa vitalu inafanyaje kazi? {#how-does-a-blockchain-oracle-service-work}

### Watumiaji {#users}

Watumiaji ni huluki (yaani, mikataba mahiri) zinazohitaji taarifa za nje ya mnyororo wa vitalu ili kukamilisha vitendo mahususi. Mtiririko wa msingi wa kazi wa huduma ya orakeli huanza na mtumiaji kutuma ombi la data kwenye mkataba wa orakeli. Maombi ya data kwa kawaida yatajibu baadhi au maswali yote yafuatayo:

1. Ni vyanzo gani ambavyo nodi za nje ya mnyororo zinaweza kushauriana kwa taarifa iliyoombwa?

2. Je, waripoti huchakataje taarifa kutoka kwenye vyanzo vya data na kutoa pointi muhimu za data?

3. Ni nodi ngapi za orakeli zinaweza kushiriki katika kurejesha data?

4. Je, tofauti katika ripoti za orakeli zinapaswa kusimamiwaje?

5. Ni mbinu gani inapaswa kutekelezwa katika kuchuja mawasilisho na kujumlisha ripoti kuwa thamani moja?

### Mkataba wa orakeli {#oracle-contract}

Mkataba wa orakeli ni kipengele cha mnyororoni kwa huduma ya orakeli. Husikiliza maombi ya data kutoka kwenye mikataba mingine, hupitisha maswali ya data kwenye nodi za orakeli, na kusambaza data iliyorejeshwa kwenye mikataba ya wateja. Mkataba huu unaweza pia kufanya baadhi ya ukokotoaji kwenye pointi za data zilizorejeshwa ili kutoa thamani ya jumla ya kutuma kwenye mkataba unaoomba.

Mkataba wa orakeli hufichua baadhi ya vipengele ambavyo mikataba ya wateja huita wakati wa kufanya ombi la data. Baada ya kupokea swali jipya, mkataba mahiri utatoa [tukio la logi](/developers/docs/smart-contracts/anatomy/#events-and-logs) lenye maelezo ya ombi la data. Hili hufahamisha nodi za nje ya mnyororo zilizojiandikisha kwenye logi (kwa kawaida kwa kutumia kitu kama amri ya JSON-RPC `eth_subscribe`), ambazo huendelea kurejesha data iliyofafanuliwa katika tukio la logi.

Hapa chini kuna [mfano wa mkataba wa orakeli](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) na Pedro Costa. Hii ni huduma rahisi ya orakeli inayoweza kuuliza API za nje ya mnyororo kwa ombi la mikataba mingine mahiri na kuhifadhi taarifa iliyoombwa kwenye mnyororo wa vitalu:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //orodha ya maombi yaliyofanywa kwa mkataba
  uint currentId = 0; //kitambulisho cha ombi kinachoongezeka
  uint minQuorum = 2; //idadi ya chini ya majibu ya kupokea kabla ya kutangaza matokeo ya mwisho
  uint totalOracleCount = 3; // idadi ya orakeli iliyowekwa moja kwa moja

  // inafafanua ombi la jumla la API
  struct Request {
    uint id;                            //kitambulisho cha ombi
    string urlToQuery;                  //url ya API
    string attributeToFetch;            //sifa ya json (ufunguo) ya kupata katika jibu
    string agreedValue;                 //thamani kutoka kwa ufunguo
    mapping(uint => string) answers;     //majibu yaliyotolewa na orakeli
    mapping(address => uint) quorum;    //orakeli ambazo zitauliza jibu (1=orakeli haijapiga kura, 2=orakeli imepiga kura)
  }

  //tukio linaloanzisha orakeli nje ya mnyororo wa vitalu
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //huanzishwa wakati kuna mwafaka juu ya matokeo ya mwisho
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

    // anwani za orakeli zilizowekwa moja kwa moja
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // anzisha tukio ili litambuliwe na orakeli nje ya mnyororo wa vitalu
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // ongeza kitambulisho cha ombi
    currentId++;
  }

  //inaitwa na orakeli kurekodi jibu lake
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //angalia kama orakeli iko kwenye orodha ya orakeli zinazoaminika
    //na kama orakeli bado haijapiga kura
    if(currRequest.quorum[address(msg.sender)] == 1){

      //kuweka alama kwamba anwani hii imepiga kura
      currRequest.quorum[msg.sender] = 2;

      //pitia kwenye "safu" ya majibu hadi nafasi iwe wazi na uhifadhi thamani iliyopatikana
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //tafuta nafasi ya kwanza iliyo wazi
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //pitia kwenye orodha ya orakeli na uangalie kama kuna orakeli za kutosha (kiwango cha chini cha akidi)
      //zimepiga kura jibu sawa na hili la sasa
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

### Nodi za orakeli {#oracle-nodes}

Nodi ya orakeli ni kipengele cha nje ya mnyororo cha huduma ya orakeli. Hutoa taarifa kutoka vyanzo vya nje, kama vile API zinazopangishwa kwenye seva za wahusika wengine, na kuiweka mnyororoni kwa matumizi ya mikataba mahiri. Nodi za orakeli husikiliza matukio kutoka kwenye mkataba wa orakeli wa mnyororoni na kuendelea kukamilisha kazi iliyoelezwa kwenye logi.

Kazi ya kawaida kwa nodi za orakeli ni kutuma ombi la [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) kwenye huduma ya API, kuchanganua jibu ili kutoa data husika, kuiumbiza kuwa towe linalosomeka na mnyororo wa vitalu, na kuituma mnyororoni kwa kuijumuisha katika muamala kwenye mkataba wa orakeli. Nodi ya orakeli inaweza pia kuhitajika kuthibitisha uhalali na uadilifu wa taarifa iliyowasilishwa kwa kutumia “uthibitisho wa uhalisi”, ambao tutauchunguza baadaye.

Orakeli za kimahesabu pia hutegemea nodi za nje ya mnyororo kufanya kazi za kimahesabu ambazo zingekuwa haziwezekani kutekelezwa mnyororoni, ikizingatiwa gharama za gesi na vikomo vya ukubwa wa kitalu. Kwa mfano, nodi ya orakeli inaweza kupewa jukumu la kuzalisha takwimu ya unasibu inayoweza kuthibitishwa (k.m., kwa michezo inayotegemea mnyororo wa vitalu).

## Miundo ya usanifu wa orakeli {#oracle-design-patterns}

Orakeli huja katika aina tofauti, ikiwa ni pamoja na _kusoma-mara-moja_, _kuchapisha-kujiandikisha_, na _kuomba-kujibu_, huku mbili za mwisho zikiwa maarufu zaidi kati ya mikataba mahiri ya Ethereum. Hapa tunaelezea kwa ufupi miundo ya kuchapisha-kujiandikisha na kuomba-kujibu.

### Orakeli za kuchapisha-kujiandikisha {#publish-subscribe-oracles}

Aina hii ya orakeli hufichua “mlisho wa data” ambao mikataba mingine inaweza kusoma mara kwa mara kwa taarifa. Data katika kesi hii inatarajiwa kubadilika mara kwa mara, kwa hivyo mikataba ya wateja lazima isikilize masasisho ya data kwenye hifadhi ya orakeli. Mfano ni orakeli inayotoa taarifa za hivi punde za bei ya ETH-USD kwa watumiaji.

### Orakeli za kuomba-kujibu {#request-response-oracles}

Usanidi wa kuomba-kujibu huruhusu mkataba wa mteja kuomba data yoyote isipokuwa ile inayotolewa na orakeli ya kuchapisha-kujiandikisha. Orakeli za kuomba-kujibu ni bora wakati seti ya data ni kubwa mno kuhifadhiwa kwenye hifadhi ya mkataba mahiri, na/au watumiaji watahitaji tu sehemu ndogo ya data wakati wowote.

Ingawa ni ngumu zaidi kuliko miundo ya kuchapisha-kujiandikisha, orakeli za kuomba-kujibu kimsingi ni kile tulichoelezea katika sehemu iliyopita. Orakeli itakuwa na kipengele cha mnyororoni kinachopokea ombi la data na kukipitisha kwenye nodi ya nje ya mnyororo kwa uchakataji.

Watumiaji wanaoanzisha maswali ya data lazima wagharamie kurejesha taarifa kutoka kwenye chanzo cha nje ya mnyororo. Mkataba wa mteja lazima pia utoe fedha za kugharamia gharama za gesi zinazotokana na mkataba wa orakeli katika kurejesha jibu kupitia kipengele cha kurejesha simu kilichobainishwa kwenye ombi.

## Orakeli zilizowekwa kati dhidi ya zilizogatuliwa {#types-of-oracles}

### Orakeli zilizowekwa kati {#centralized-oracles}

Orakeli iliyowekwa kati inadhibitiwa na huluki moja inayohusika na kujumlisha taarifa za nje ya mnyororo na kusasisha data ya mkataba wa orakeli kama ilivyoombwa. Orakeli zilizowekwa kati zina ufanisi kwa kuwa zinategemea chanzo kimoja cha ukweli. Zinaweza kufanya kazi vizuri zaidi katika hali ambapo seti za data za umiliki zinachapishwa moja kwa moja na mmiliki kwa sahihi inayokubalika na wengi. Hata hivyo, zinaleta hasara pia:

#### Dhamana ndogo za usahihi {#low-correctness-guarantees}

Kwa orakeli zilizowekwa kati, hakuna njia ya kuthibitisha ikiwa taarifa iliyotolewa ni sahihi au la. Hata watoa huduma "wanaoheshimika" wanaweza kwenda kinyume au kudukuliwa. Ikiwa orakeli itaharibika, mikataba mahiri itatekelezwa kulingana na data mbaya.

#### Upatikanaji duni {#poor-availability}

Orakeli zilizowekwa kati hazijahakikishiwa kufanya data ya nje ya mnyororo ipatikane kila wakati kwa mikataba mingine mahiri. Ikiwa mtoa huduma ataamua kuzima huduma au mdukuzi atateka nyara kipengele cha nje ya mnyororo cha orakeli, mkataba wako mahiri uko hatarini mwa shambulio la kunyimwa huduma (DoS).

#### Utangamano duni wa motisha {#poor-incentive-compatibility}

Orakeli zilizowekwa kati mara nyingi huwa na motisha zilizoundwa vibaya au zisizokuwepo kwa mtoa data kutuma taarifa sahihi/zisizobadilishwa. Kuilipa orakeli kwa usahihi hakuhakikishi uaminifu. Tatizo hili linakuwa kubwa kadiri kiasi cha thamani kinachodhibitiwa na mikataba mahiri kinavyoongezeka.

### Orakeli zilizogatuliwa {#decentralized-oracles}

Orakeli zilizogatuliwa zimeundwa ili kuondokana na mapungufu ya orakeli zilizowekwa kati kwa kuondoa pointi moja za kushindwa. Huduma ya orakeli iliyogatuliwa inajumuisha washiriki wengi katika mtandao wa rika-kwa-rika wanaounda mwafaka kwenye data ya nje ya mnyororo kabla ya kuituma kwenye mkataba mahiri.

Orakeli iliyogatuliwa inapaswa (kwa hakika) kuwa bila ruhusa, bila hitaji la uaminifu, na huru kutokana na usimamizi wa upande mkuu; kiuhalisia, ugatuzi kati ya orakeli uko kwenye wigo. Kuna mitandao ya orakeli iliyogatuliwa nusu ambapo mtu yeyote anaweza kushiriki, lakini ikiwa na “mmiliki” anayeidhinisha na kuondoa nodi kulingana na utendaji wa kihistoria. Mitandao ya orakeli iliyogatuliwa kikamilifu pia ipo: hii kwa kawaida huendeshwa kama minyororo ya vitalu inayojitegemea na ina mbinu zilizofafanuliwa za mwafaka za kuratibu nodi na kuadhibu tabia mbaya.

Kutumia orakeli zilizogatuliwa kunakuja na faida zifuatazo:

### Dhamana za juu za usahihi {#high-correctness-guarantees}

Orakeli zilizogatuliwa hujaribu kufikia usahihi wa data kwa kutumia mbinu tofauti. Hii inajumuisha kutumia uthibitisho unaoshuhudia uhalisi na uadilifu wa taarifa iliyorejeshwa na kuhitaji huluki nyingi kukubaliana kwa pamoja juu ya uhalali wa data ya nje ya mnyororo.

#### Uthibitisho wa uhalisi {#authenticity-proofs}

Uthibitisho wa uhalisi ni mbinu za kificho zinazowezesha uthibitishaji huru wa taarifa iliyorejeshwa kutoka vyanzo vya nje. Uthibitisho huu unaweza kuthibitisha chanzo cha taarifa na kugundua mabadiliko yanayowezekana kwenye data baada ya kurejeshwa.

Mifano ya uthibitisho wa uhalisi ni pamoja na:

**Uthibitisho wa Usalama wa Tabaka la Usafiri (TLS)**: Nodi za orakeli mara nyingi hurejesha data kutoka vyanzo vya nje kwa kutumia muunganisho salama wa HTTP kulingana na itifaki ya Usalama wa Tabaka la Usafiri (TLS). Baadhi ya orakeli zilizogatuliwa hutumia uthibitisho wa uhalisi ili kuthibitisha vipindi vya TLS (yaani, kuthibitisha ubadilishanaji wa taarifa kati ya nodi na seva mahususi) na kuthibitisha kuwa yaliyomo kwenye kipindi hayakubadilishwa.

**Uthibitisho wa Mazingira ya Utekelezaji Yanayoaminika (TEE)**: [Mazingira ya utekelezaji yanayoaminika](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) ni mazingira ya kimahesabu yaliyotengwa ambayo yametengwa na michakato ya uendeshaji ya mfumo wake wa kupangisha. TEE huhakikisha kuwa msimbo wowote wa programu au data iliyohifadhiwa/kutumika katika mazingira ya ukokotoaji huhifadhi uadilifu, usiri, na kutobadilika. Watumiaji wanaweza pia kuzalisha uthibitisho ili kuthibitisha kuwa mfano wa programu unaendeshwa ndani ya mazingira ya utekelezaji yanayoaminika.

Aina fulani za orakeli zilizogatuliwa zinahitaji waendeshaji wa nodi za orakeli kutoa uthibitisho wa TEE. Hili linathibitisha kwa mtumiaji kuwa mwendeshaji wa nodi anaendesha mfano wa mteja wa orakeli katika mazingira ya utekelezaji yanayoaminika. TEE huzuia michakato ya nje kubadilisha au kusoma msimbo na data ya programu, kwa hivyo, uthibitisho huo unathibitisha kuwa nodi ya orakeli imeweka taarifa sawa na kwa siri.

#### Uthibitishaji wa taarifa kulingana na mwafaka {#consensus-based-validation-of-information}

Orakeli zilizowekwa kati hutegemea chanzo kimoja cha ukweli wakati wa kutoa data kwenye mikataba mahiri, jambo ambalo huleta uwezekano wa kuchapisha taarifa zisizo sahihi. Orakeli zilizogatuliwa hutatua tatizo hili kwa kutegemea nodi nyingi za orakeli kuuliza taarifa za nje ya mnyororo. Kwa kulinganisha data kutoka vyanzo vingi, orakeli zilizogatuliwa hupunguza hatari ya kupitisha taarifa batili kwenye mikataba ya mnyororoni.

Orakeli zilizogatuliwa, hata hivyo, lazima zishughulikie tofauti katika taarifa iliyorejeshwa kutoka vyanzo vingi vya nje ya mnyororo. Ili kupunguza tofauti katika taarifa na kuhakikisha data iliyopitishwa kwenye mkataba wa orakeli inaonyesha maoni ya pamoja ya nodi za orakeli, orakeli zilizogatuliwa hutumia mbinu zifuatazo:

##### Kupiga kura/kuweka dhamana juu ya usahihi wa data

Baadhi ya mitandao ya orakeli iliyogatuliwa inahitaji washiriki kupiga kura au kuweka dhamana juu ya usahihi wa majibu ya maswali ya data (k.m., "Nani alishinda uchaguzi wa Marekani wa 2020?") kwa kutumia tokeni asili ya mtandao. Itifaki ya ujumlishaji kisha hujumlisha kura na dhamana na kuchukua jibu linaloungwa mkono na wengi kama lile halali.

Nodi ambazo majibu yake yanatofautiana na jibu la wengi huadhibiwa kwa kusambaza tokeni zao kwa wengine wanaotoa thamani sahihi zaidi. Kulazimisha nodi kutoa dhamana kabla ya kutoa data kunahamasisha majibu ya uaminifu kwa kuwa wanachukuliwa kuwa wahusika wa kiuchumi wenye mantiki wanaokusudia kuongeza mapato.

Kuweka dhamana/kupiga kura pia hulinda orakeli zilizogatuliwa dhidi ya [mashambulizi ya Sybil](/glossary/#sybil-attack) ambapo wahusika wabaya huunda vitambulisho vingi ili kuchezea mfumo wa mwafaka. Hata hivyo, kuweka dhamana hakuwezi kuzuia “kudandia” (nodi za orakeli kunakili taarifa kutoka kwa wengine) na “uthibitishaji mvivu” (nodi za orakeli kufuata wengi bila kuthibitisha taarifa zenyewe).

##### Mbinu za pointi ya Schelling

[Pointi ya Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) ni dhana ya nadharia ya mchezo inayochukulia kuwa huluki nyingi daima zitaelekea kwenye suluhu ya kawaida kwa tatizo bila mawasiliano yoyote. Mbinu za pointi ya Schelling mara nyingi hutumika katika mitandao ya orakeli iliyogatuliwa ili kuwezesha nodi kufikia mwafaka juu ya majibu ya maombi ya data.

Wazo la awali la hili lilikuwa [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), mlisho wa data uliopendekezwa ambapo washiriki huwasilisha majibu kwa maswali ya "skala" (maswali ambayo majibu yake yanaelezwa kwa ukubwa, k.m., "bei ya ETH ni nini?"), pamoja na amana. Watumiaji wanaotoa thamani kati ya [asilimia](https://en.wikipedia.org/wiki/Percentile) ya 25 na 75 hutuzwa, huku wale ambao thamani zao zinatofautiana kwa kiasi kikubwa na thamani ya wastani huadhibiwa.

Ingawa SchellingCoin haipo leo, idadi ya orakeli zilizogatuliwa—hasa [Orakeli za Itifaki ya Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)—hutumia mbinu ya pointi ya schelling ili kuboresha usahihi wa data ya orakeli. Kila Orakeli ya Maker inajumuisha mtandao wa P2P wa nje ya mnyororo wa nodi ("wapelekaji" na "milisho") wanaowasilisha bei za soko kwa mali za dhamana na mkataba wa mnyororoni wa “Medianizer” unaokokotoa wastani wa thamani zote zilizotolewa. Mara tu kipindi cha ucheleweshaji kilichobainishwa kinapoisha, thamani hii ya wastani inakuwa bei mpya ya marejeleo kwa mali inayohusishwa.

Mifano mingine ya orakeli zinazotumia mbinu za pointi ya Schelling ni pamoja na [Kuripoti Nje ya Mnyororo kwa Chainlink](https://docs.chain.link/architecture-overview/off-chain-reporting) na [Witnet](https://witnet.io/). Katika mifumo yote miwili, majibu kutoka kwenye nodi za orakeli katika mtandao wa rika-kwa-rika hujumlishwa kuwa thamani moja ya jumla, kama vile wastani au kati. Nodi hutuzwa au kuadhibiwa kulingana na kiwango ambacho majibu yao yanalingana au kutofautiana na thamani ya jumla.

Mbinu za pointi ya Schelling zinavutia kwa sababu zinapunguza alama ya mnyororoni (muamala mmoja tu unahitaji kutumwa) huku zikihakikisha ugatuzi. Hili la mwisho linawezekana kwa sababu nodi lazima zisaini orodha ya majibu yaliyowasilishwa kabla ya kuingizwa kwenye algoriti inayozalisha thamani ya wastani/kati.

### Upatikanaji {#availability}

Huduma za orakeli zilizogatuliwa huhakikisha upatikanaji wa juu wa data ya nje ya mnyororo kwenye mikataba mahiri. Hili linafikiwa kwa kugatua chanzo cha taarifa za nje ya mnyororo na nodi zinazohusika na kuhamisha taarifa mnyororoni.

Hili huhakikisha uvumilivu wa makosa kwa kuwa mkataba wa orakeli unaweza kutegemea nodi nyingi (ambazo pia zinategemea vyanzo vingi vya data) kutekeleza maswali kutoka kwenye mikataba mingine. Ugatuzi katika kiwango cha chanzo _na_ mwendeshaji wa nodi ni muhimu—mtandao wa nodi za orakeli unaohudumia taarifa iliyorejeshwa kutoka chanzo kimoja utakumbana na tatizo sawa na orakeli iliyowekwa kati.

Inawezekana pia kwa orakeli zinazotegemea dhamana kufanya ukataji kwa waendeshaji wa nodi wanaoshindwa kujibu haraka maombi ya data. Hili huhamasisha kwa kiasi kikubwa nodi za orakeli kuwekeza katika miundombinu inayostahimili makosa na kutoa data kwa wakati.

### Utangamano mzuri wa motisha {#good-incentive-compatibility}

Orakeli zilizogatuliwa hutekeleza miundo mbalimbali ya motisha ili kuzuia tabia ya [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) kati ya nodi za orakeli. Hasa, zinafikia _uwezo wa kuhusishwa_ na _uwajibikaji_:

1. Nodi za orakeli zilizogatuliwa mara nyingi zinahitajika kusaini data wanayotoa kujibu maombi ya data. Taarifa hii husaidia katika kutathmini utendaji wa kihistoria wa nodi za orakeli, kiasi kwamba watumiaji wanaweza kuchuja nodi za orakeli zisizotegemewa wakati wa kufanya maombi ya data. Mfano ni [Mfumo wa Sifa wa Kialgoriti](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) wa Witnet.

2. Orakeli zilizogatuliwa—kama ilivyoelezwa hapo awali—zinaweza kuhitaji nodi kuweka dhamana juu ya imani yao katika ukweli wa data wanayowasilisha. Ikiwa dai litathibitishwa, dhamana hii inaweza kurejeshwa pamoja na tuzo kwa huduma ya uaminifu. Lakini inaweza pia kukatwa ikiwa taarifa si sahihi, jambo ambalo hutoa kipimo fulani cha uwajibikaji.

## Matumizi ya orakeli katika mikataba mahiri {#applications-of-oracles-in-smart-contracts}

Yafuatayo ni matumizi ya kawaida ya orakeli katika Ethereum:

### Kurejesha data ya kifedha {#retrieving-financial-data}

Programu za [fedha zilizogatuliwa (DeFi)](/defi/) huruhusu ukopeshaji, ukopaji, na biashara ya mali ya rika-kwa-rika. Hili mara nyingi huhitaji kupata taarifa tofauti za kifedha, ikiwa ni pamoja na data ya kiwango cha ubadilishaji (kwa kukokotoa thamani ya fiat ya fedha za kripto au kulinganisha bei za tokeni) na data ya masoko ya mitaji (kwa kukokotoa thamani ya mali zilizofanywa tokeni, kama vile dhahabu au dola ya Marekani).

Itifaki ya ukopeshaji ya DeFi, kwa mfano, inahitaji kuuliza bei za sasa za soko kwa mali (k.m., ETH) zilizowekwa kama dhamana. Hili huruhusu mkataba kubaini thamani ya mali za dhamana na kubaini ni kiasi gani inaweza kukopa kutoka kwenye mfumo.

"Orakeli za bei" maarufu (kama zinavyoitwa mara nyingi) katika DeFi ni pamoja na Milisho ya Bei ya Chainlink, [Mlisho wa Bei Wazi](https://compound.finance/docs/prices) wa Itifaki ya Compound, [Bei za Wastani Zilizopimwa kwa Wakati (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) za Uniswap, na [Orakeli za Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Wajenzi wanapaswa kuelewa maonyo yanayokuja na orakeli hizi za bei kabla ya kuziunganisha kwenye mradi wao. [Makala](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) hii inatoa uchambuzi wa kina wa nini cha kuzingatia wakati wa kupanga kutumia orakeli yoyote ya bei iliyotajwa.

Hapa chini kuna mfano wa jinsi unavyoweza kurejesha bei ya hivi punde ya ETH katika mkataba wako mahiri kwa kutumia mlisho wa bei wa Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Mtandao: Kovan
     * Kikusanyaji: ETH/USD
     * Anwani: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Inarudisha bei ya hivi punde
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

### Kuzalisha unasibu unaothibitishwa {#generating-verifiable-randomness}

Baadhi ya programu za mnyororo wa vitalu, kama vile michezo inayotegemea mnyororo wa vitalu au mipango ya bahati nasibu, zinahitaji kiwango cha juu cha kutotabirika na unasibu ili kufanya kazi kwa ufanisi. Hata hivyo, utekelezaji wa kiutabiri wa minyororo ya vitalu huondoa unasibu.

Mbinu ya awali ilikuwa kutumia vipengele vya kificho vya unasibu bandia, kama vile `blockhash`, lakini hivi vingeweza [kuchezewa na wachimbaji](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) wanaotatua algoriti ya Uthibitisho wa Kazi (PoW). Pia, [kubadili kwa Ethereum kwenda kwenye Uthibitisho wa Dau (PoS)](/roadmap/merge/) kunamaanisha wasanidi hawawezi tena kutegemea `blockhash` kwa unasibu wa mnyororoni. [Mbinu ya RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) ya Mnyororo wa Beacon hutoa chanzo mbadala cha unasibu badala yake.

Inawezekana kuzalisha thamani ya unasibu nje ya mnyororo na kuituma mnyororoni, lakini kufanya hivyo kunaweka mahitaji makubwa ya uaminifu kwa watumiaji. Lazima waamini kuwa thamani ilizalishwa kweli kupitia mbinu zisizotabirika na haikubadilishwa wakati wa usafirishaji.

Orakeli zilizoundwa kwa ajili ya ukokotoaji wa nje ya mnyororo hutatua tatizo hili kwa kuzalisha kwa usalama matokeo ya unasibu nje ya mnyororo ambayo zinasambaza mnyororoni pamoja na uthibitisho wa kificho unaoshuhudia kutotabirika kwa mchakato. Mfano ni [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Kipengele cha Unasibu Kinachothibitishwa), ambacho ni jenereta ya nambari ya unasibu (RNG) yenye haki inayothibitishwa na isiyoweza kuchezewa, muhimu kwa kujenga mikataba mahiri inayotegemewa kwa programu zinazotegemea matokeo yasiyotabirika.

### Kupata matokeo ya matukio {#getting-outcomes-for-events}

Kwa orakeli, kuunda mikataba mahiri inayojibu matukio ya ulimwengu halisi ni rahisi. Huduma za orakeli hufanya hili liwezekane kwa kuruhusu mikataba kuunganishwa kwenye API za nje kupitia vipengele vya nje ya mnyororo na kutumia taarifa kutoka kwenye vyanzo hivyo vya data. Kwa mfano, dapp ya ubashiri iliyotajwa hapo awali inaweza kuomba orakeli kurejesha matokeo ya uchaguzi kutoka kwenye chanzo kinachoaminika cha nje ya mnyororo (k.m., Associated Press).

Kutumia orakeli kurejesha data kulingana na matokeo ya ulimwengu halisi huwezesha matumizi mengine mapya; kwa mfano, bidhaa ya bima iliyogatuliwa inahitaji taarifa sahihi kuhusu hali ya hewa, majanga, n.k. ili kufanya kazi kwa ufanisi.

### Kuendesha mikataba mahiri kiotomatiki {#automating-smart-contracts}

Mikataba mahiri haiendeshwi kiotomatiki; badala yake, akaunti inayomilikiwa na nje (EOA), au akaunti nyingine ya mkataba, lazima ianzishe vipengele sahihi ili kutekeleza msimbo wa mkataba. Katika hali nyingi, sehemu kubwa ya vipengele vya mkataba ni vya umma na vinaweza kuitwa na EOA na mikataba mingine.

Lakini pia kuna _vipengele vya siri_ ndani ya mkataba ambavyo haviwezi kufikiwa na wengine;, lakini ambavyo ni muhimu kwa utendaji wa jumla wa dapp. Mifano ni pamoja na kipengele cha `mintERC721Token()` ambacho hutengeneza NFT mpya mara kwa mara kwa watumiaji, kipengele cha kutoa malipo katika soko la ubashiri, au kipengele cha kufungua tokeni zilizowekwa dhamana katika DEX.

Wasanidi watahitaji kuanzisha vipengele kama hivyo kwa vipindi ili kuweka programu iendelee vizuri. Hata hivyo, hili linaweza kusababisha saa nyingi kupotea kwenye kazi za kawaida kwa wasanidi, ndiyo maana kuendesha utekelezaji wa mikataba mahiri kiotomatiki kunavutia.

Baadhi ya mitandao ya orakeli iliyogatuliwa hutoa huduma za kiotomatiki, ambazo huruhusu nodi za orakeli za nje ya mnyororo kuanzisha vipengele vya mkataba mahiri kulingana na vigezo vilivyofafanuliwa na mtumiaji. Kwa kawaida, hili linahitaji “kusajili” mkataba lengwa na huduma ya orakeli, kutoa fedha za kumlipa mwendeshaji wa orakeli, na kubainisha masharti au nyakati za kuanzisha mkataba.

[Mtandao wa Keeper](https://chain.link/keepers) wa Chainlink hutoa chaguo kwa mikataba mahiri kutoa kazi za kawaida za matengenezo kwa njia iliyopunguzwa uaminifu na iliyogatuliwa. Soma [nyaraka rasmi za Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) kwa taarifa kuhusu kufanya mkataba wako uendane na Keeper na kutumia huduma ya Upkeep.

## Jinsi ya kutumia orako za mnyororo wa vitalu {#use-blockchain-oracles}

Kuna programu nyingi za orakeli unazoweza kuunganisha kwenye dapp yako ya Ethereum:

**[Chainlink](https://chain.link/)** - _Mitandao ya orakeli iliyogatuliwa ya Chainlink hutoa maingizo, matokeo, na ukokotoaji usioingiliwa ili kusaidia mikataba mahiri ya hali ya juu kwenye mnyororo wowote wa vitalu._

**[Orakeli za RedStone](https://redstone.finance/)** - _RedStone ni orakeli ya kawaida iliyogatuliwa inayotoa milisho ya data iliyoboreshwa kwa gesi. Inajishughulisha na kutoa milisho ya bei kwa mali zinazoibuka, kama vile tokani ya uwekaji amana wenye ukwasi (lst), tokeni za uwekaji dhamana upya wenye ukwasi (LRTs), na bidhaa zinazotokana na uwekaji dhamana wa Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle inashinda mapungufu ya sasa ya kuhamisha data mnyororoni kwa kuunda orakeli zinazoweza kupanuka kweli, zenye ufanisi wa gharama, zilizogatuliwa, na zinazoweza kuthibitishwa._

**[Witnet](https://witnet.io/)** - _Witnet ni orakeli isiyo na ruhusa, iliyogatuliwa, na inayostahimili udhibiti inayosaidia mikataba mahiri kujibu matukio ya ulimwengu halisi kwa dhamana dhabiti za kiuchumi za kripto._

**[Orakeli ya UMA](https://uma.xyz)** - _Orakeli yenye matumaini ya UMA inaruhusu mikataba mahiri kupokea haraka aina yoyote ya data kwa programu tofauti, ikiwa ni pamoja na bima, bidhaa zinazotokana na fedha, na masoko ya ubashiri._

**[Tellor](https://tellor.io/)** - _Tellor ni itifaki ya orakeli iliyo wazi na isiyo na ruhusa kwa mkataba wako mahiri kupata kwa urahisi data yoyote wakati wowote inapoihitaji._

**[Itifaki ya Band](https://bandprotocol.com/)** - _Itifaki ya Band ni jukwaa la orakeli ya data ya mtambuko-mnyororo inayojumlisha na kuunganisha data ya ulimwengu halisi na API kwenye mikataba mahiri._

**[Mtandao wa Pyth](https://pyth.network/)** - _Mtandao wa Pyth ni mtandao wa orakeli ya kifedha wa upande wa kwanza ulioundwa kuchapisha data endelevu ya ulimwengu halisi mnyororoni katika mazingira yanayostahimili kuchezewa, yaliyogatuliwa, na yanayojitegemea._

**[API3 DAO](https://api3.org/)** - _API3 DAO inatoa suluhu za orakeli za upande wa kwanza zinazotoa uwazi mkubwa wa chanzo, usalama na uwezo wa kupanuka katika suluhu iliyogatuliwa kwa mikataba mahiri_

**[Supra](https://supra.com/)** - Zana iliyounganishwa kiwima ya suluhu za mtambuko-mnyororo zinazounganisha minyororo yote ya vitalu, ya umma (L1s na L2s) au ya kibinafsi (makampuni), ikitoa milisho ya bei ya orakeli iliyogatuliwa inayoweza kutumika kwa matumizi ya mnyororoni na nje ya mnyororo. 

**[Mtandao wa Gesi](https://gas.network/)** - Jukwaa la orakeli lililosambazwa linalotoa data ya bei ya gesi ya wakati halisi kwenye mnyororo wa vitalu. Kwa kuleta data kutoka kwa watoa data wakuu wa bei ya gesi mnyororoni, Mtandao wa Gesi unasaidia kuendesha mwingiliano. Mtandao wa Gesi unasaidia data kwa zaidi ya minyororo 35, ikiwa ni pamoja na Mtandao Mkuu wa Ethereum na L2 nyingi zinazoongoza.

**[DIA](https://www.diadata.org/)** - Mtandao wa orakeli wa mtambuko-mnyororo unaotoa milisho ya data inayoweza kuthibitishwa kwa mali 20,000+ katika madaraja yote makuu ya mali. DIA hupata data ghafi ya biashara moja kwa moja kutoka masoko ya msingi 100+ na kuikokotoa mnyororoni, ikihakikisha uwazi kamili wa data na uwezo wa kuthibitishwa kwa usanidi maalum kwa matumizi yoyote.

**[Stork](https://stork.network)** - Stork inatoa data ya bei kwa ucheleweshaji wa chini sana, ikisaidia anuwai ya matumizi ikiwa ni pamoja na masoko ya kudumu, itifaki za ukopeshaji, na mifumo ikolojia ya DeFi, huku mali mpya zikisaidiwa haraka kwenye uorodheshaji.

## Usomaji zaidi {#further-reading}

**Makala**

- [Orako ya Mnyororo wa Vitalu ni Nini?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Orako ya Mnyororo wa Vitalu ni Nini?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Orakeli Zilizogatuliwa: muhtasari wa kina](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Kutekeleza Orako ya Mnyororo wa Vitalu kwenye Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Kwa nini mikataba mahiri haiwezi kupiga simu za API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Kwa hivyo unataka kutumia orakeli ya bei](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Orakeli na Upanuzi wa Matumizi ya Mnyororo wa Vitalu](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Mafunzo**

- [Jinsi ya Kuleta Bei ya Sasa ya Ethereum katika Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Kutumia Data ya Orakeli](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Changamoto ya Orakeli](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Miradi ya mfano**

- [Mradi kamili wa kuanzia wa Chainlink kwa Ethereum katika Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
