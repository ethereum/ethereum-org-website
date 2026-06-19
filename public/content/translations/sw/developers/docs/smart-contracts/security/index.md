---
title: Usalama wa mkataba mahiri
description: Muhtasari wa miongozo ya kujenga mikataba mahiri salama ya Ethereum
lang: sw
---

Mikataba mahiri inabadilika sana, na ina uwezo wa kudhibiti kiasi kikubwa cha thamani na data, huku ikiendesha mantiki isiyobadilika kulingana na msimbo uliosambazwa kwenye mnyororo wa vitalu. Hili limeunda mfumo wa ikolojia mzuri wa programu bila hitaji la uaminifu na zilizogatuliwa ambazo hutoa faida nyingi ikilinganishwa na mifumo ya kizamani. Pia zinawakilisha fursa kwa washambuliaji wanaotafuta faida kwa kutumia udhaifu katika mikataba mahiri.

Minyororo ya vitalu ya umma, kama vile [Ethereum](/), inazidisha ugumu wa suala la kulinda mikataba mahiri. Msimbo wa mkataba uliosambazwa _kawaida_ hauwezi kubadilishwa ili kurekebisha kasoro za usalama, huku mali zilizoibiwa kutoka kwenye mikataba mahiri zikiwa ngumu sana kufuatilia na mara nyingi haziwezi kurejeshwa kutokana na kutobadilika.

Ingawa takwimu zinatofautiana, inakadiriwa kuwa jumla ya kiasi cha thamani iliyoibiwa au kupotea kutokana na kasoro za usalama katika mikataba mahiri ni zaidi ya dola bilioni 1 kwa urahisi. Hii inajumuisha matukio makubwa, kama vile [udukuzi wa DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (ETH milioni 3.6 ziliibiwa, zenye thamani ya zaidi ya dola bilioni 1 kwa bei za leo), [udukuzi wa mkoba wa saini-nyingi wa Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (dola milioni 30 zilipotea kwa wadukuzi), na [suala la mkoba uliogandishwa wa Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (zaidi ya dola milioni 300 katika ETH zimefungiwa milele).

Masuala yaliyotajwa hapo juu yanafanya iwe lazima kwa wasanidi programu kuwekeza juhudi katika kujenga mikataba mahiri iliyo salama, thabiti, na yenye ustahimilivu. Usalama wa mkataba mahiri ni biashara nzito, na ambayo kila msanidi programu atafanya vyema kujifunza. Mwongozo huu utashughulikia mambo ya kuzingatia kuhusu usalama kwa wasanidi programu wa Ethereum na kuchunguza rasilimali za kuboresha usalama wa mkataba mahiri.

## Mahitaji ya awali {#prerequisites}

Hakikisha unafahamu [misingi ya uendelezaji wa mkataba mahiri](/developers/docs/smart-contracts/) kabla ya kushughulikia usalama.

## Miongozo ya kujenga mikataba mahiri ya Ethereum iliyo salama {#smart-contract-security-guidelines}

### 1. Buni vidhibiti sahihi vya ufikiaji {#design-proper-access-controls}

Katika mikataba mahiri, vipengele vya utendaji vilivyowekewa alama ya `public` au `external` vinaweza kuitwa na akaunti zozote zinazomilikiwa na watu wa nje (EOAs) au akaunti za mikataba. Kubainisha mwonekano wa umma kwa vipengele vya utendaji ni muhimu ikiwa unataka wengine waingiliane na mkataba wako. Hata hivyo, vipengele vya utendaji vilivyowekewa alama ya `private` vinaweza tu kuitwa na vipengele vya utendaji ndani ya mkataba mahiri, na si akaunti za nje. Kumpa kila mshiriki wa mtandao ufikiaji wa vipengele vya utendaji vya mkataba kunaweza kusababisha matatizo, hasa ikiwa inamaanisha mtu yeyote anaweza kufanya shughuli nyeti (k.m., ufuzi wa tokeni mpya).

Ili kuzuia matumizi yasiyoidhinishwa ya vipengele vya utendaji vya mkataba mahiri, ni muhimu kutekeleza vidhibiti salama vya ufikiaji. Taratibu za udhibiti wa ufikiaji huzuia uwezo wa kutumia vipengele fulani vya utendaji katika mkataba mahiri kwa huluki zilizoidhinishwa, kama vile akaunti zinazohusika na kusimamia mkataba. **Muundo wa Umiliki (Ownable pattern)** na **udhibiti unaotegemea jukumu (role-based control)** ni miundo miwili muhimu kwa ajili ya kutekeleza udhibiti wa ufikiaji katika mikataba mahiri:

#### Muundo wa Umiliki {#ownable-pattern}

Katika muundo wa Umiliki, anwani huwekwa kama "mmiliki" wa mkataba wakati wa mchakato wa kuunda mkataba. Vipengele vya utendaji vilivyolindwa hupewa kirekebishaji cha `OnlyOwner`, ambacho huhakikisha mkataba unathibitisha utambulisho wa anwani inayoita kabla ya kutekeleza kipengele cha utendaji. Miito kwa vipengele vya utendaji vilivyolindwa kutoka kwa anwani zingine kando na mmiliki wa mkataba daima hutengua, na kuzuia ufikiaji usiotakikana.

#### Udhibiti wa ufikiaji unaotegemea jukumu {#role-based-access-control}

Kusajili anwani moja kama `Owner` katika mkataba mahiri huleta hatari ya uwekaji kati na inawakilisha hatua moja ya kutofaulu. Ikiwa funguo za akaunti ya mmiliki zitaathiriwa, washambuliaji wanaweza kushambulia mkataba unaomilikiwa. Hii ndiyo sababu kutumia muundo wa udhibiti wa ufikiaji unaotegemea jukumu na akaunti nyingi za usimamizi inaweza kuwa chaguo bora.

Katika udhibiti wa ufikiaji unaotegemea jukumu, ufikiaji wa vipengele nyeti vya utendaji husambazwa kati ya kundi la washiriki wanaoaminika. Kwa mfano, akaunti moja inaweza kuwajibika kwa ufuzi wa tokeni, huku akaunti nyingine ikifanya uboreshaji au kusitisha mkataba. Kugatua udhibiti wa ufikiaji kwa njia hii huondoa hatua moja ya kutofaulu na kupunguza dhana za uaminifu kwa watumiaji.

##### Kutumia mikoba ya saini-nyingi {#use-require-assert-revert}

Mbinu nyingine ya kutekeleza udhibiti salama wa ufikiaji ni kutumia [akaunti ya saini-nyingi](/developers/docs/smart-contracts/#multisig) kusimamia mkataba. Tofauti na EOA ya kawaida, akaunti za saini-nyingi zinamilikiwa na huluki nyingi na zinahitaji saini kutoka kwa idadi ya chini ya akaunti—tuseme 3-kati-ya-5—ili kutekeleza miamala.

Kutumia saini-nyingi kwa udhibiti wa ufikiaji huleta tabaka la ziada la usalama kwa kuwa vitendo kwenye mkataba lengwa vinahitaji idhini kutoka kwa pande nyingi. Hili ni muhimu hasa ikiwa kutumia muundo wa Umiliki ni muhimu, kwani inafanya iwe vigumu zaidi kwa mshambuliaji au mtu wa ndani mpotovu kuchezea vipengele nyeti vya utendaji vya mkataba kwa madhumuni mabaya.

### 2. Tumia kauli za require(), assert(), na revert() kulinda shughuli za mkataba {#test-smart-contracts-and-verify-code-correctness}

Kama ilivyotajwa, mtu yeyote anaweza kuita vipengele vya utendaji vya umma katika mkataba mahiri wako pindi unaposambazwa kwenye mnyororo wa vitalu. Kwa kuwa huwezi kujua mapema jinsi akaunti za nje zitaingiliana na mkataba, ni bora kutekeleza ulinzi wa ndani dhidi ya shughuli zenye matatizo kabla ya usambazaji. Unaweza kutekeleza tabia sahihi katika mikataba mahiri kwa kutumia kauli za `require()`, `assert()`, na `revert()` ili kuanzisha vighairi na kutengua mabadiliko ya hali ikiwa utekelezaji utashindwa kukidhi mahitaji fulani.

**`require()`**: `require` hufafanuliwa mwanzoni mwa vipengele vya utendaji na huhakikisha masharti yaliyobainishwa mapema yametimizwa kabla ya kipengele cha utendaji kilichoitwa kutekelezwa. Kauli ya `require` inaweza kutumika kuthibitisha maingizo ya mtumiaji, kuangalia vigeu vya hali, au kuthibitisha utambulisho wa akaunti inayoita kabla ya kuendelea na kipengele cha utendaji.

**`assert()`**: `assert()` hutumika kugundua makosa ya ndani na kuangalia ukiukaji wa "invariants" (vitu visivyobadilika) katika msimbo wako. Invariant ni uthibitisho wa kimantiki kuhusu hali ya mkataba ambao unapaswa kuwa kweli kwa utekelezaji wote wa vipengele vya utendaji. Mfano wa invariant ni kiwango cha juu cha usambazaji au salio la mkataba wa tokeni. Kutumia `assert()` huhakikisha kwamba mkataba wako haufikii hali iliyo hatarini, na ikiwa itafikia, mabadiliko yote kwa vigeu vya hali hurudishwa nyuma.

**`revert()`**: `revert()` inaweza kutumika katika kauli ya if-else ambayo huanzisha kighairi ikiwa sharti linalohitajika halijatimizwa. Mkataba wa mfano hapa chini unatumia `revert()` kulinda utekelezaji wa vipengele vya utendaji:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Fanya ununuzi.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Jaribu mikataba mahiri na uthibitishe usahihi wa msimbo {#get-independent-code-reviews}

Kutobadilika kwa msimbo unaoendeshwa katika [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/) kunamaanisha mikataba mahiri inahitaji kiwango cha juu cha tathmini ya ubora wakati wa awamu ya uundaji. Kujaribu mkataba wako kwa kina na kuuangalia kwa matokeo yoyote yasiyotarajiwa kutaboresha usalama kwa kiasi kikubwa na kuwalinda watumiaji wako kwa muda mrefu.

Mbinu ya kawaida ni kuandika majaribio madogo ya vipengele (unit tests) kwa kutumia data ya majaribio ambayo mkataba unatarajiwa kupokea kutoka kwa watumiaji. [Majaribio ya vipengele](/developers/docs/smart-contracts/testing/#unit-testing) ni mazuri kwa kujaribu utendaji wa vipengele fulani na kuhakikisha mkataba mahiri unafanya kazi kama inavyotarajiwa.

Kwa bahati mbaya, majaribio ya vipengele yana ufanisi mdogo katika kuboresha usalama wa mkataba mahiri yanapotumika pekee. Jaribio la kipengele linaweza kuthibitisha kuwa kipengele cha utendaji kinatekelezwa ipasavyo kwa data ya majaribio, lakini majaribio ya vipengele yana ufanisi sawa tu na majaribio yaliyoandikwa. Hii inafanya iwe vigumu kugundua hali za kipekee zilizokosekana na udhaifu ambao unaweza kuvunja usalama wa mkataba mahiri wako.

Mbinu bora ni kuchanganya majaribio ya vipengele na majaribio yanayotegemea sifa yanayofanywa kwa kutumia [uchanganuzi tuli na thabiti](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Uchanganuzi tuli unategemea uwakilishi wa kiwango cha chini, kama vile [grafu za mtiririko wa udhibiti](https://en.wikipedia.org/wiki/Control-flow_graph) na [miti dhahania ya sintaksia](https://deepsource.io/glossary/ast/) ili kuchanganua hali za programu zinazofikika na njia za utekelezaji. Wakati huo huo, mbinu za uchanganuzi thabiti, kama vile [fuzzing ya mkataba mahiri](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), hutekeleza msimbo wa mkataba na thamani za uingizaji za nasibu ili kugundua shughuli zinazokiuka sifa za usalama.

[Uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification) ni mbinu nyingine ya kuthibitisha sifa za usalama katika mikataba mahiri. Tofauti na majaribio ya kawaida, uthibitishaji rasmi unaweza kuthibitisha kwa uhakika kutokuwepo kwa makosa katika mkataba mahiri. Hili linafikiwa kwa kuunda vipimo rasmi vinavyonasa sifa za usalama zinazohitajika na kuthibitisha kwamba muundo rasmi wa mikataba unazingatia vipimo hivi.

### 4. Omba ukaguzi huru wa msimbo wako {#audits}

Baada ya kujaribu mkataba wako, ni vyema kuwaomba wengine wakague msimbo wa chanzo kwa masuala yoyote ya usalama. Majaribio hayatagundua kila dosari katika mkataba mahiri, lakini kupata ukaguzi huru huongeza uwezekano wa kuona udhaifu.

#### Kaguzi {#bug-bounties}

Kuidhinisha ukaguzi wa mkataba mahiri ni njia mojawapo ya kufanya ukaguzi huru wa msimbo. Wakaguzi wana jukumu muhimu katika kuhakikisha kwamba mikataba mahiri ni salama na haina kasoro za ubora na makosa ya muundo.

Hata hivyo, unapaswa kuepuka kuchukulia kaguzi kama suluhisho la kila kitu. Kaguzi za mkataba mahiri hazitashika kila hitilafu na zimeundwa zaidi kutoa duru ya ziada ya ukaguzi, ambayo inaweza kusaidia kugundua masuala yaliyokosekana na wasanidi programu wakati wa uundaji na majaribio ya awali. Unapaswa pia kufuata mbinu bora za kufanya kazi na wakaguzi, kama vile kuweka kumbukumbu za msimbo ipasavyo na kuongeza maoni ya ndani ya mstari, ili kuongeza manufaa ya ukaguzi wa mkataba mahiri.

- [Vidokezo na mbinu za ukaguzi wa mkataba mahiri](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Pata manufaa zaidi kutokana na ukaguzi wako](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Zawadi za kugundua hitilafu (Bug bounties) {#follow-smart-contract-development-best-practices}

Kuanzisha programu ya zawadi ya kugundua hitilafu ni mbinu nyingine ya kutekeleza ukaguzi wa msimbo wa nje. Zawadi ya kugundua hitilafu ni tuzo ya kifedha inayotolewa kwa watu binafsi (kawaida wadukuzi wema au 'whitehat hackers') wanaogundua udhaifu katika programu.

Inapotumiwa ipasavyo, zawadi za kugundua hitilafu huwapa wanachama wa jumuiya ya wadukuzi motisha ya kukagua msimbo wako kwa dosari muhimu. Mfano halisi ni "hitilafu ya pesa isiyo na kikomo" ambayo ingemruhusu mshambuliaji kuunda kiasi kisicho na kikomo cha Etha kwenye [Optimism](https://www.optimism.io/), itifaki ya [tabaka la 2 (l2)](/layer-2/) inayoendeshwa kwenye Ethereum. Kwa bahati nzuri, mdukuzi mwema [aligundua dosari hiyo](https://www.saurik.com/optimism.html) na kuijulisha timu, [na kupata malipo makubwa katika mchakato huo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Mkakati muhimu ni kuweka malipo ya programu ya zawadi ya kugundua hitilafu kulingana na kiasi cha fedha kilicho hatarini. Ikifafanuliwa kama "[zawadi ya kugundua hitilafu inayoongezeka](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", mbinu hii hutoa motisha ya kifedha kwa watu binafsi kufichua udhaifu kwa kuwajibika badala ya kuutumia vibaya.

### 5. Fuata mbinu bora wakati wa uundaji wa mkataba mahiri {#implement-disaster-recovery-plans}

Kuwepo kwa kaguzi na zawadi za kugundua hitilafu hakukuondolei jukumu lako la kuandika msimbo wa ubora wa juu. Usalama mzuri wa mkataba mahiri huanza kwa kufuata michakato sahihi ya muundo na uundaji:

- Hifadhi msimbo wote katika mfumo wa udhibiti wa matoleo, kama vile git

- Fanya marekebisho yote ya msimbo kupitia maombi ya kuvuta (pull requests)

- Hakikisha maombi ya kuvuta yana angalau mkaguzi mmoja huru—ikiwa unafanya kazi peke yako kwenye mradi, fikiria kutafuta wasanidi programu wengine na kubadilishana kaguzi za msimbo

- Tumia [mazingira ya uundaji](/developers/docs/frameworks/) kwa ajili ya kujaribu, ukusanyaji, na usambazaji wa mikataba mahiri

- Endesha msimbo wako kupitia zana za msingi za uchanganuzi wa msimbo, kama vile, [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril na Slither. Kimsingi, unapaswa kufanya hivi kabla ya kila ombi la kuvuta kuunganishwa na kulinganisha tofauti katika matokeo

- Hakikisha msimbo wako unakusanywa bila makosa, na kikusanyaji cha Solidity hakitoi maonyo yoyote

- Weka kumbukumbu za msimbo wako ipasavyo (kwa kutumia [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) na ueleze maelezo kuhusu usanifu wa mkataba katika lugha rahisi kueleweka. Hii itafanya iwe rahisi kwa wengine kukagua na kupitia msimbo wako.

### 6. Tekeleza mipango thabiti ya kurejesha hali baada ya maafa {#contract-upgrades}

Kubuni vidhibiti salama vya ufikiaji, kutekeleza virekebishaji vya vipengele vya utendaji, na mapendekezo mengine kunaweza kuboresha usalama wa mkataba mahiri, lakini haviwezi kuondoa uwezekano wa unyonyaji mbaya. Kujenga mikataba mahiri iliyo salama kunahitaji "kujitayarisha kwa kutofaulu" na kuwa na mpango mbadala wa kujibu mashambulizi kwa ufanisi. Mpango sahihi wa kurejesha hali baada ya maafa utajumuisha baadhi au vipengele vyote vifuatavyo:

#### Uboreshaji wa mkataba {#emergency-stops}

Ingawa mikataba mahiri ya Ethereum ni isiyobadilika kwa chaguo-msingi, inawezekana kufikia kiwango fulani cha ubadilikaji kwa kutumia miundo ya uboreshaji. Kuboresha mikataba ni muhimu katika matukio ambapo dosari muhimu inafanya mkataba wako wa zamani kutotumika na kusambaza mantiki mpya ndilo chaguo linalowezekana zaidi.

Taratibu za uboreshaji wa mkataba hufanya kazi tofauti, lakini "muundo wa uwakilishi" ni mojawapo ya mbinu maarufu zaidi za kuboresha mikataba mahiri. [Miundo ya uwakilishi](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) hugawanya hali na mantiki ya programu kati ya mikataba _miwili_. Mkataba wa kwanza (unaoitwa 'mkataba wa uwakilishi') huhifadhi vigeu vya hali (k.m., salio la mtumiaji), huku mkataba wa pili (unaoitwa 'mkataba wa mantiki') unashikilia msimbo wa kutekeleza vipengele vya utendaji vya mkataba.

Akaunti huingiliana na mkataba wa uwakilishi, ambao hutuma miito yote ya vipengele vya utendaji kwa mkataba wa mantiki kwa kutumia mwito wa kiwango cha chini wa [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Tofauti na mwito wa ujumbe wa kawaida, `delegatecall()` huhakikisha msimbo unaoendeshwa kwenye anwani ya mkataba wa mantiki unatekelezwa katika muktadha wa mkataba unaoita. Hii inamaanisha mkataba wa mantiki utaandika kila wakati kwenye hifadhi ya uwakilishi (badala ya hifadhi yake yenyewe) na thamani asili za `msg.sender` na `msg.value` zinahifadhiwa.

Kukabidhi miito kwa mkataba wa mantiki kunahitaji kuhifadhi anwani yake katika hifadhi ya mkataba wa uwakilishi. Kwa hivyo, kuboresha mantiki ya mkataba ni suala tu la kusambaza mkataba mwingine wa mantiki na kuhifadhi anwani mpya katika mkataba wa uwakilishi. Kwa kuwa miito inayofuata kwa mkataba wa uwakilishi inaelekezwa kiotomatiki kwa mkataba mpya wa mantiki, utakuwa "umeboresha" mkataba bila kurekebisha msimbo wenyewe.

[Zaidi kuhusu kuboresha mikataba](/developers/docs/smart-contracts/upgrading/).

#### Vituo vya dharura {#event-monitoring}

Kama ilivyotajwa, ukaguzi na majaribio ya kina hayawezi kugundua hitilafu zote katika mkataba mahiri. Ikiwa udhaifu utaonekana katika msimbo wako baada ya usambazaji, kuurekebisha haiwezekani kwa kuwa huwezi kubadilisha msimbo unaoendeshwa kwenye anwani ya mkataba. Pia, taratibu za uboreshaji (k.m., miundo ya uwakilishi) zinaweza kuchukua muda kutekelezwa (mara nyingi zinahitaji idhini kutoka kwa pande tofauti), ambayo huwapa tu washambuliaji muda zaidi wa kusababisha uharibifu zaidi.

Chaguo la mwisho ni kutekeleza kipengele cha utendaji cha "kituo cha dharura" ambacho huzuia miito kwa vipengele vya utendaji vilivyo hatarini katika mkataba. Vituo vya dharura kwa kawaida hujumuisha vipengele vifuatavyo:

1. Kigeu cha kimataifa cha Boolean kinachoonyesha ikiwa mkataba mahiri uko katika hali ya kusimamishwa au la. Kigeu hiki huwekwa kuwa `false` wakati wa kuanzisha mkataba, lakini kitarudi kuwa `true` pindi mkataba unaposimamishwa.

2. Vipengele vya utendaji vinavyorejelea kigeu cha Boolean katika utekelezaji wao. Vipengele kama hivyo vinafikika wakati mkataba mahiri haujasimamishwa, na haviwezi kufikika wakati kipengele cha kituo cha dharura kinapoanzishwa.

3. Huluki ambayo ina ufikiaji wa kipengele cha utendaji cha kituo cha dharura, ambacho huweka kigeu cha Boolean kuwa `true`. Ili kuzuia vitendo viovu, miito kwa kipengele hiki inaweza kuzuiwa kwa anwani inayoaminika (k.m., mmiliki wa mkataba).

Pindi mkataba unapowasha kituo cha dharura, vipengele fulani vya utendaji havitaweza kuitwa. Hili linafikiwa kwa kufunga vipengele teule vya utendaji katika kirekebishaji kinachorejelea kigeu cha kimataifa. Hapa chini kuna [mfano](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) unaoelezea utekelezaji wa muundo huu katika mikataba:

```solidity
// Msimbo huu haujakaguliwa kitaalamu na hautoi ahadi zozote kuhusu usalama au usahihi. Tumia kwa hatari yako mwenyewe.

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
        // Kagua idhini ya msg.sender hapa
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Mantiki ya kuweka amana inafanyika hapa
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Utoaji wa dharura unafanyika hapa
    }
}
```

Mfano huu unaonyesha vipengele vya msingi vya vituo vya dharura:

- `isStopped` ni Boolean ambayo hutathminiwa kuwa `false` mwanzoni na `true` wakati mkataba unapoingia katika hali ya dharura.

- Virekebishaji vya vipengele vya utendaji `onlyWhenStopped` na `stoppedInEmergency` huangalia kigeu cha `isStopped`. `stoppedInEmergency` hutumika kudhibiti vipengele vya utendaji ambavyo havipaswi kufikika wakati mkataba uko hatarini (k.m., `deposit()`). Miito kwa vipengele hivi itatengua tu.

`onlyWhenStopped` hutumika kwa vipengele vya utendaji ambavyo vinapaswa kuitwa wakati wa dharura (k.m., `emergencyWithdraw()`). Vipengele kama hivyo vinaweza kusaidia kutatua hali hiyo, hivyo kutengwa kwao kutoka kwenye orodha ya "vipengele vya utendaji vilivyozuiwa".

Kutumia utendaji wa kituo cha dharura hutoa suluhisho la muda la ufanisi kwa kushughulikia udhaifu mkubwa katika mkataba mahiri wako. Hata hivyo, inaongeza hitaji la watumiaji kuwaamini wasanidi programu kutoiwasha kwa sababu za kujinufaisha. Ili kufikia lengo hili, kugatua udhibiti wa kituo cha dharura ama kwa kukiweka chini ya utaratibu wa kura mnyororoni, kufuli ya muda (timelock), au idhini kutoka kwa mkoba wa saini-nyingi ni masuluhisho yanayowezekana.

#### Ufuatiliaji wa matukio {#design-secure-governance-systems}

[Matukio](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) hukuruhusu kufuatilia miito kwa vipengele vya utendaji vya mkataba mahiri na kufuatilia mabadiliko kwa vigeu vya hali. Ni bora kupanga mkataba mahiri wako kutoa tukio wakati wowote upande fulani unapochukua hatua muhimu kwa usalama (k.m., utoaji wa fedha).

Kurekodi matukio na kuyafuatilia nje ya mnyororo hutoa maarifa kuhusu shughuli za mkataba na kusaidia ugunduzi wa haraka wa vitendo viovu. Hii inamaanisha timu yako inaweza kujibu haraka udukuzi na kuchukua hatua ili kupunguza athari kwa watumiaji, kama vile kusitisha vipengele vya utendaji au kufanya uboreshaji.

Unaweza pia kuchagua zana ya ufuatiliaji iliyo tayari kutumika ambayo hutuma arifa kiotomatiki wakati wowote mtu anapoingiliana na mikataba yako. Zana hizi zitakuruhusu kuunda arifa maalum kulingana na vichochezi tofauti, kama vile kiasi cha muamala, marudio ya miito ya vipengele vya utendaji, au vipengele maalum vinavyohusika. Kwa mfano, unaweza kupanga arifa inayokuja wakati kiasi kilichotolewa katika muamala mmoja kinapovuka kikomo fulani.

### 7. Buni mifumo salama ya utawala {#reduce-code-complexity}

Unaweza kutaka kugatua programu yako kwa kukabidhi udhibiti wa mikataba mahiri ya msingi kwa wanachama wa jumuiya. Katika hali hii, mfumo wa mkataba mahiri utajumuisha moduli ya utawala—utaratibu unaoruhusu wanachama wa jumuiya kuidhinisha vitendo vya usimamizi kupitia mfumo wa utawala mnyororoni. Kwa mfano, pendekezo la kuboresha mkataba wa uwakilishi kwa utekelezaji mpya linaweza kupigiwa kura na wamiliki wa tokeni.

Utawala uliogatuliwa unaweza kuwa na manufaa, hasa kwa sababu unalinganisha maslahi ya wasanidi programu na watumiaji wa mwisho. Hata hivyo, taratibu za utawala wa mkataba mahiri zinaweza kuleta hatari mpya ikiwa zitatekelezwa vibaya. Hali inayowezekana ni ikiwa mshambuliaji atapata nguvu kubwa ya kupiga kura (inayopimwa kwa idadi ya tokeni zinazoshikiliwa) kwa kuchukua [mkopo wa ghafla](/defi/#flash-loans) na kupitisha pendekezo baya.

Njia moja ya kuzuia matatizo yanayohusiana na utawala mnyororoni ni [kutumia kufuli ya muda (timelock)](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Kufuli ya muda huzuia mkataba mahiri kutekeleza vitendo fulani hadi kiasi maalum cha muda kipite. Mikakati mingine ni pamoja na kugawa "uzito wa kura" kwa kila tokeni kulingana na muda ambao imefungiwa, au kupima nguvu ya kupiga kura ya anwani katika kipindi cha kihistoria (kwa mfano, vitalu 2-3 vilivyopita) badala ya kitalu cha sasa. Mbinu zote mbili hupunguza uwezekano wa kukusanya haraka nguvu ya kupiga kura ili kuyumbisha kura mnyororoni.

Zaidi kuhusu [kubuni mifumo salama ya utawala](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [taratibu tofauti za kupiga kura katika DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), na [njia za kawaida za mashambulizi ya DAO zinazotumia DeFi](https://dacian.me/dao-governance-defi-attacks) katika viungo vilivyoshirikiwa.

### 8. Punguza utata katika msimbo kwa kiwango cha chini zaidi {#mitigate-common-smart-contract-vulnerabilities}

Wasanidi programu wa jadi wanafahamu kanuni ya KISS ("keep it simple, stupid" - iweke rahisi), ambayo inashauri dhidi ya kuleta utata usio wa lazima katika muundo wa programu. Hii inafuata fikra ya muda mrefu kwamba "mifumo tata inashindwa kwa njia tata" na ina uwezekano mkubwa wa kupata makosa ya gharama kubwa.

Kuweka mambo rahisi ni muhimu sana wakati wa kuandika mikataba mahiri, ikizingatiwa kwamba mikataba mahiri inaweza kudhibiti kiasi kikubwa cha thamani. Kidokezo cha kufikia urahisi wakati wa kuandika mikataba mahiri ni kutumia tena maktaba zilizopo, kama vile [Mikataba ya OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), inapowezekana. Kwa sababu maktaba hizi zimekaguliwa na kujaribiwa kwa kina na wasanidi programu, kuzitumia hupunguza uwezekano wa kuleta hitilafu kwa kuandika utendaji mpya kutoka mwanzo.

Ushauri mwingine wa kawaida ni kuandika vipengele vidogo vya utendaji na kuweka mikataba katika moduli kwa kugawanya mantiki ya biashara katika mikataba mingi. Sio tu kwamba kuandika msimbo rahisi hupunguza eneo la mashambulizi katika mkataba mahiri, pia inafanya iwe rahisi kufikiri kuhusu usahihi wa mfumo mzima na kugundua makosa yanayowezekana ya muundo mapema.

### 9. Jilinde dhidi ya udhaifu wa kawaida wa mkataba mahiri {#reentrancy}

#### Uingiaji upya {#integer-underflows-and-overflows}

EVM hairuhusu usawazishaji (concurrency), ikimaanisha mikataba miwili inayohusika katika mwito wa ujumbe haiwezi kuendeshwa kwa wakati mmoja. Mwito wa nje husitisha utekelezaji na kumbukumbu ya mkataba unaoita hadi mwito urudi, ambapo utekelezaji unaendelea kama kawaida. Mchakato huu unaweza kuelezewa rasmi kama kuhamisha [mtiririko wa udhibiti](https://www.computerhope.com/jargon/c/contflow.htm) kwa mkataba mwingine.

Ingawa mara nyingi haina madhara, kuhamisha mtiririko wa udhibiti kwa mikataba isiyoaminika kunaweza kusababisha matatizo, kama vile uingiaji upya. Shambulio la uingiaji upya hutokea wakati mkataba mbaya unapoita tena kwenye mkataba ulio hatarini kabla ya uanzishaji wa kipengele cha utendaji asili kukamilika. Aina hii ya shambulio inaelezwa vyema kwa mfano.

Fikiria mkataba mahiri rahisi ('Mhasiriwa') unaoruhusu mtu yeyote kuweka na kutoa Etha:

```solidity
// Mkataba huu una udhaifu. Usitumie katika uzalishaji

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

Mkataba huu unaweka wazi kipengele cha utendaji cha `withdraw()` ili kuruhusu watumiaji kutoa ETH iliyowekwa hapo awali kwenye mkataba. Wakati wa kuchakata utoaji, mkataba hufanya shughuli zifuatazo:

1. Huangalia salio la ETH la mtumiaji
2. Hutuma fedha kwa anwani inayoita
3. Huweka upya salio lao kuwa 0, na kuzuia utoaji wa ziada kutoka kwa mtumiaji

Kipengele cha utendaji cha `withdraw()` katika mkataba wa `Victim` hufuata muundo wa "ukaguzi-mwingiliano-athari". _Hukagua_ ikiwa masharti muhimu kwa utekelezaji yametimizwa (yaani, mtumiaji ana salio chanya la ETH) na hufanya _mwingiliano_ kwa kutuma ETH kwa anwani ya mpigaji, kabla ya kutumia _athari_ za muamala (yaani, kupunguza salio la mtumiaji).

Ikiwa `withdraw()` inaitwa kutoka kwa akaunti inayomilikiwa na mtu wa nje (EOA), kipengele cha utendaji kinatekelezwa kama inavyotarajiwa: `msg.sender.call.value()` hutuma ETH kwa mpigaji. Hata hivyo, ikiwa `msg.sender` ni akaunti ya mkataba mahiri inayoita `withdraw()`, kutuma fedha kwa kutumia `msg.sender.call.value()` pia kutaanzisha msimbo uliohifadhiwa kwenye anwani hiyo kuendeshwa.

Fikiria huu ndio msimbo uliosambazwa kwenye anwani ya mkataba:

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

Mkataba huu umeundwa kufanya mambo matatu:

1. Kukubali amana kutoka kwa akaunti nyingine (kuna uwezekano ni EOA ya mshambuliaji)
2. Kuweka 1 ETH kwenye mkataba wa Mhasiriwa
3. Kutoa 1 ETH iliyohifadhiwa katika mkataba mahiri

Hakuna kosa hapa, isipokuwa kwamba `Attacker` ina kipengele kingine cha utendaji kinachoita `withdraw()` katika `Victim` tena ikiwa gesi iliyosalia kutoka kwa `msg.sender.call.value` inayoingia ni zaidi ya 40,000. Hii inapa `Attacker` uwezo wa kuingia upya kwenye `Victim` na kutoa fedha zaidi _kabla_ ya uanzishaji wa kwanza wa `withdraw` kukamilika. Mzunguko unaonekana hivi:

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

Muhtasari ni kwamba kwa sababu salio la mpigaji halijawekwa kuwa 0 hadi utekelezaji wa kipengele cha utendaji ukamilike, uanzishaji unaofuata utafaulu na kuruhusu mpigaji kutoa salio lake mara nyingi. Aina hii ya shambulio inaweza kutumika kukausha mkataba mahiri wa fedha zake, kama kile kilichotokea katika [udukuzi wa DAO wa 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Mashambulizi ya uingiaji upya bado ni suala muhimu kwa mikataba mahiri leo kama [orodha za umma za unyonyaji wa uingiaji upya](https://github.com/pcaversaccio/reentrancy-attacks) zinavyoonyesha.

##### Jinsi ya kuzuia mashambulizi ya uingiaji upya {#oracle-manipulation}

Mbinu ya kushughulikia uingiaji upya ni kufuata [muundo wa ukaguzi-athari-mwingiliano](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Muundo huu hupanga utekelezaji wa vipengele vya utendaji kwa njia ambayo msimbo unaofanya ukaguzi muhimu kabla ya kuendelea na utekelezaji unakuja kwanza, ukifuatiwa na msimbo unaodhibiti hali ya mkataba, na msimbo unaoingiliana na mikataba mingine au EOAs ukifika mwisho.

Muundo wa ukaguzi-athari-mwingiliano unatumika katika toleo lililorekebishwa la mkataba wa `Victim` ulioonyeshwa hapa chini:

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

Mkataba huu hufanya _ukaguzi_ kwenye salio la mtumiaji, hutumia _athari_ za kipengele cha utendaji cha `withdraw()` (kwa kuweka upya salio la mtumiaji kuwa 0), na kuendelea kufanya _mwingiliano_ (kutuma ETH kwa anwani ya mtumiaji). Hii inahakikisha mkataba unasasisha hifadhi yake kabla ya mwito wa nje, na kuondoa hali ya uingiaji upya iliyowezesha shambulio la kwanza. Mkataba wa `Attacker` bado unaweza kuita tena kwenye `NoLongerAVictim`, lakini kwa kuwa `balances[msg.sender]` imewekwa kuwa 0, utoaji wa ziada utaleta kosa.

Chaguo jingine ni kutumia kufuli ya kutengana (inayoelezewa kwa kawaida kama "mutex") ambayo hufunga sehemu ya hali ya mkataba hadi uanzishaji wa kipengele cha utendaji ukamilike. Hili linatekelezwa kwa kutumia kigeu cha Boolean ambacho huwekwa kuwa `true` kabla ya kipengele cha utendaji kutekelezwa na kurudi kuwa `false` baada ya uanzishaji kufanywa. Kama inavyoonekana katika mfano hapa chini, kutumia mutex hulinda kipengele cha utendaji dhidi ya miito ya kujirudia wakati uanzishaji asili bado unachakatwa, na kusimamisha uingiaji upya kwa ufanisi.

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
    // Kazi hii inalindwa na mutex, hivyo miito ya uingiaji upya kutoka ndani ya `msg.sender.call` haiwezi kuita `withdraw` tena.
    //  Kauli ya `return` inatathminiwa kuwa `true` lakini bado inatathmini kauli ya `locked = false` katika kirekebishaji
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Unaweza pia kutumia mfumo wa [malipo ya kuvuta (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) ambao unahitaji watumiaji kutoa fedha kutoka kwa mikataba mahiri, badala ya mfumo wa "malipo ya kusukuma (push payments)" ambao hutuma fedha kwa akaunti. Hii huondoa uwezekano wa kuanzisha msimbo bila kukusudia kwenye anwani zisizojulikana (na pia inaweza kuzuia mashambulizi fulani ya kunyimwa huduma).

#### Mizidio ya chini na mizidio ya nambari kamili {#smart-contract-security-resources-for-developers}

Mzidio wa nambari kamili hutokea wakati matokeo ya operesheni ya hesabu yanapoanguka nje ya masafa yanayokubalika ya thamani, na kuisababisha "kuzunguka" hadi thamani ya chini kabisa inayowakilishwa. Kwa mfano, `uint8` inaweza tu kuhifadhi thamani hadi 2^8-1=255. Operesheni za hesabu zinazosababisha thamani za juu kuliko `255` zitazidi na kuweka upya `uint` kuwa `0`, sawa na jinsi odomita kwenye gari inavyoweka upya kuwa 0 pindi inapofikia umbali wa juu zaidi (999999).

Mizidio ya chini ya nambari kamili hutokea kwa sababu sawa: matokeo ya operesheni ya hesabu yanaanguka chini ya masafa yanayokubalika. Tuseme ulijaribu kupunguza `0` katika `uint8`, matokeo yangezunguka tu hadi thamani ya juu zaidi inayowakilishwa (`255`).

Mizidio na mizidio ya chini ya nambari kamili inaweza kusababisha mabadiliko yasiyotarajiwa kwa vigeu vya hali ya mkataba na kusababisha utekelezaji usiopangwa. Hapa chini kuna mfano unaoonyesha jinsi mshambuliaji anavyoweza kutumia mzidio wa hesabu katika mkataba mahiri kufanya operesheni batili:

```
pragma solidity ^0.7.6;

// Mkataba huu umeundwa kufanya kazi kama hifadhi ya muda.
// Mtumiaji anaweza kuweka kwenye mkataba huu lakini hawezi kutoa kwa angalau wiki moja.
// Mtumiaji anaweza pia kuongeza muda wa kusubiri zaidi ya kipindi cha kusubiri cha wiki 1.

/*
1. Sambaza TimeLock
2. Sambaza Attack na anwani ya TimeLock
3. Ita Attack.attack ukituma 1 ether. Utaweza kutoa ether yako mara moja.

Nini kimetokea?
Attack ilisababisha TimeLock.lockTime kuzidi na iliweza kutoa kabla ya kipindi cha kusubiri cha wiki 1.
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
        ikiwa t = muda wa sasa wa kufunga basi tunahitaji kupata x ili
        x + t = 2**256 = 0
        kwa hivyo x = -t
        2**256 = type(uint).max + 1
        kwa hivyo x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Jinsi ya kuzuia mizidio ya chini na mizidio ya nambari kamili {#code-analysis-tools}

Kuanzia toleo la 0.8.0, kikusanyaji cha Solidity kinakataa msimbo unaosababisha mizidio ya chini na mizidio ya nambari kamili. Hata hivyo, mikataba iliyokusanywa na toleo la chini la kikusanyaji inapaswa kufanya ukaguzi kwenye vipengele vya utendaji vinavyohusisha operesheni za hesabu au kutumia maktaba (k.m., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) ambayo hukagua mzidio wa chini/mzidio.

#### Udanganyifu wa orakeli {#smart-contract-monitoring-tools}

[Orakeli](/developers/docs/oracles/) hupata taarifa nje ya mnyororo na kuzituma mnyororoni ili mikataba mahiri izitumie. Ukiwa na orakeli, unaweza kubuni mikataba mahiri inayoingiliana na mifumo ya nje ya mnyororo, kama vile masoko ya mitaji, na kupanua sana matumizi yake.

Lakini ikiwa orakeli itaharibiwa na kutuma taarifa zisizo sahihi mnyororoni, mikataba mahiri itatekelezwa kulingana na maingizo yenye makosa, ambayo yanaweza kusababisha matatizo. Huu ndio msingi wa "tatizo la oracle", ambalo linahusu kazi ya kuhakikisha taarifa kutoka kwa orako ya mnyororo wa vitalu ni sahihi, ya kisasa, na kwa wakati.

Wasiwasi unaohusiana wa usalama ni kutumia orakeli ya mnyororoni, kama vile soko la kubadilishana lililogatuliwa, kupata bei ya papo hapo ya rasilimali. Majukwaa ya ukopeshaji katika sekta ya [fedha zilizogatuliwa (DeFi)](/defi/) mara nyingi hufanya hivi ili kubaini thamani ya dhamana ya mtumiaji ili kubaini kiasi anachoweza kukopa.

Bei za DEX mara nyingi ni sahihi, kwa kiasi kikubwa kutokana na wafanyabiashara wa usuluhishi (arbitrageurs) kurejesha usawa katika masoko. Hata hivyo, ziko wazi kwa udanganyifu, hasa ikiwa orakeli ya mnyororoni inakokotoa bei za rasilimali kulingana na mifumo ya kihistoria ya biashara (kama ilivyo kawaida).

Kwa mfano, mshambuliaji anaweza kupandisha bei ya papo hapo ya rasilimali kwa njia isiyo ya asili kwa kuchukua mkopo wa ghafla kabla tu ya kuingiliana na mkataba wako wa ukopeshaji. Kuuliza DEX kwa bei ya rasilimali kungerudisha thamani ya juu kuliko kawaida (kutokana na "agizo la kununua" kubwa la mshambuliaji kupotosha mahitaji ya rasilimali), na kuwaruhusu kukopa zaidi ya wanavyopaswa. "Mashambulizi ya mkopo wa ghafla" kama haya yametumika kutumia vibaya utegemezi wa orakeli za bei kati ya programu za DeFi, na kugharimu itifaki mamilioni ya fedha zilizopotea.

##### Jinsi ya kuzuia udanganyifu wa orakeli {#smart-contract-administration-tools}

Sharti la chini kabisa la [kuepuka udanganyifu wa orakeli](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) ni kutumia mtandao wa orakeli uliogatuliwa ambao unauliza taarifa kutoka kwa vyanzo vingi ili kuepuka hatua moja ya kutofaulu. Katika hali nyingi, orakeli zilizogatuliwa zina motisha za kiuchumi za kripto zilizojengewa ndani ili kuhimiza nodi za orakeli kuripoti taarifa sahihi, na kuzifanya kuwa salama zaidi kuliko orakeli zilizowekwa kati.

Ikiwa unapanga kuuliza orakeli ya mnyororoni kwa bei za rasilimali, fikiria kutumia ile inayotekeleza utaratibu wa bei ya wastani iliyopimwa kwa wakati (TWAP). [Orakeli ya TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) huuliza bei ya rasilimali katika nyakati mbili tofauti (ambazo unaweza kurekebisha) na kukokotoa bei ya papo hapo kulingana na wastani uliopatikana. Kuchagua vipindi virefu vya muda hulinda itifaki yako dhidi ya udanganyifu wa bei kwa kuwa maagizo makubwa yaliyotekelezwa hivi karibuni hayawezi kuathiri bei za rasilimali.

## Rasilimali za usalama wa mkataba mahiri kwa wasanidi {#smart-contract-auditing-services}

### Zana za kuchanganua mikataba mahiri na kuthibitisha usahihi wa kodi {#bug-bounty-platforms}

- **[Zana za majaribio na maktaba](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Mkusanyiko wa zana na maktaba za viwango vya tasnia kwa ajili ya kufanya majaribio ya vipengele, uchanganuzi tuli, na uchanganuzi thabiti kwenye mikataba mahiri._

- **[Zana za uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Zana za kuthibitisha usahihi wa utendaji katika mikataba mahiri na kuangalia vitu visivyobadilika._

- **[Huduma za ukaguzi wa mkataba mahiri](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Orodha ya mashirika yanayotoa huduma za ukaguzi wa mkataba mahiri kwa miradi ya usanidi wa Ethereum._

- **[Majukwaa ya tuzo za hitilafu](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Majukwaa ya kuratibu tuzo za hitilafu na kutoa tuzo kwa ufichuaji wa kuwajibika wa udhaifu muhimu katika mikataba mahiri._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Zana ya mtandaoni isiyolipishwa ya kuangalia taarifa zote zinazopatikana kuhusu mkataba wenye mchepuo._

- **[ABI Encoder](https://abi.hashex.org/)** - _Huduma ya mtandaoni isiyolipishwa ya kusimba vitendaji vyako vya mkataba wa Solidity na hoja za konstrukta._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Kichanganuzi Tuli cha Solidity, kinachopitia Abstract Syntax Trees (AST) ili kubainisha udhaifu unaoshukiwa na kuchapisha matatizo katika umbizo la markdown ambalo ni rahisi kusoma._

### Zana za kufuatilia mikataba mahiri {#common-smart-contract-vulnerabilities-and-exploits}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Zana ya kupata arifa za wakati halisi wakati matukio yasiyo ya kawaida au yasiyotarajiwa yanapotokea kwenye mikataba mahiri au mikoba yako._

### Zana za usimamizi salama wa mikataba mahiri {#challenges-for-learning-smart-contract-security}

- **[Safe](https://safe.global/)** - _Mkoba wa mkataba mahiri unaoendeshwa kwenye Ethereum ambao unahitaji idadi ya chini ya watu kuidhinisha muamala kabla ya kufanyika (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Maktaba za mkataba za kutekeleza vipengele vya usimamizi, ikijumuisha umiliki wa mkataba, uboreshaji, vidhibiti vya ufikiaji, utawala, uwezo wa kusitisha, na zaidi._

### Huduma za ukaguzi wa mkataba mahiri {#smart-contract-security-best-practices}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Huduma ya ukaguzi wa mkataba mahiri inayosaidia miradi katika mfumo ikolojia wa mnyororo wa vitalu kuhakikisha itifaki zao ziko tayari kwa uzinduzi na zimejengwa ili kulinda watumiaji._

- **[CertiK](https://www.certik.com/)** - _Kampuni ya usalama ya mnyororo wa vitalu inayoongoza katika matumizi ya teknolojia ya kisasa ya uthibitishaji rasmi kwenye mikataba mahiri na mitandao ya mnyororo wa vitalu._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Kampuni ya usalama wa mtandao inayochanganya utafiti wa usalama na mawazo ya mshambuliaji ili kupunguza hatari na kuimarisha kodi._

- **[PeckShield](https://peckshield.com/)** - _Kampuni ya usalama ya mnyororo wa vitalu inayotoa bidhaa na huduma kwa ajili ya usalama, faragha, na utumiaji wa mfumo ikolojia mzima wa mnyororo wa vitalu._

- **[QuantStamp](https://quantstamp.com/)** - _Huduma ya ukaguzi inayowezesha upitishaji mkuu wa teknolojia ya mnyororo wa vitalu kupitia huduma za usalama na tathmini ya hatari._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Kampuni ya usalama ya mkataba mahiri inayotoa ukaguzi wa usalama kwa mifumo iliyosambazwa._

- **[Runtime Verification](https://runtimeverification.com/)** - _Kampuni ya usalama inayobobea katika uundaji rasmi na uthibitishaji wa mikataba mahiri._

- **[Hacken](https://hacken.io)** - _Mkaguzi wa usalama wa mtandao wa Web3 anayeleta mbinu ya digrii 360 kwa usalama wa mnyororo wa vitalu._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Huduma za ukaguzi za Solidity na Cairo, zinazohakikisha uadilifu wa mikataba mahiri na usalama wa watumiaji kote kwenye Ethereum na Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx inaangazia ukaguzi wa mnyororo wa vitalu na mkataba mahiri ili kuhakikisha usalama wa sarafu za kripto, ikitoa huduma kama vile usanidi wa mkataba mahiri, majaribio ya kupenya, na ushauri wa mnyororo wa vitalu._

- **[Code4rena](https://code4rena.com/)** - _Jukwaa la ukaguzi la ushindani ambalo huwapa motisha wataalamu wa usalama wa mkataba mahiri kupata udhaifu na kusaidia kufanya Web3 kuwa salama zaidi._

- **[CodeHawks](https://codehawks.com/)** - _Jukwaa la ukaguzi la ushindani linaloandaa mashindano ya ukaguzi wa mikataba mahiri kwa watafiti wa usalama._

- **[Cyfrin](https://cyfrin.io)** - _Kituo kikuu cha usalama cha Web3, kinachokuza usalama wa kripto kupitia bidhaa na huduma za ukaguzi wa mkataba mahiri._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Kampuni ya usalama ya Web3 inayotoa ukaguzi wa usalama kwa mifumo ya mnyororo wa vitalu kupitia timu ya wakaguzi wenye uzoefu na zana bora zaidi._

- **[Oxorio](https://oxor.io/)** - _Ukaguzi wa mkataba mahiri na huduma za usalama za mnyororo wa vitalu zenye utaalamu katika EVM, Solidity, ZK, teknolojia ya mtambuko-mnyororo kwa makampuni ya kripto na miradi ya fedha zilizogatuliwa (DeFi)._

- **[Inference](https://inference.ag/)** - _Kampuni ya ukaguzi wa usalama, iliyobobea katika ukaguzi wa mkataba mahiri kwa minyororo ya vitalu inayotegemea EVM. Shukrani kwa wakaguzi wake wataalamu wanatambua matatizo yanayoweza kutokea na kupendekeza masuluhisho yanayoweza kutekelezeka ili kuyarekebisha kabla ya usambazaji._

### Majukwaa ya tuzo za hitilafu {#tutorials-on-smart-contract-security}

- **[Immunefi](https://immunefi.com/)** - _Jukwaa la tuzo za hitilafu kwa mikataba mahiri na miradi ya fedha zilizogatuliwa (DeFi), ambapo watafiti wa usalama hukagua kodi, kufichua udhaifu, kulipwa, na kufanya kripto kuwa salama zaidi._

- **[HackerOne](https://www.hackerone.com/)** - _Jukwaa la uratibu wa udhaifu na tuzo za hitilafu linalounganisha biashara na wajaribu wa kupenya na watafiti wa usalama wa mtandao._

- **[HackenProof](https://hackenproof.com/)** - _Jukwaa la kitaalamu la tuzo za hitilafu kwa miradi ya kripto (fedha zilizogatuliwa (DeFi), Mikataba Mahiri, Mikoba, CEX na zaidi), ambapo wataalamu wa usalama hutoa huduma za kuchuja na watafiti hulipwa kwa ripoti muhimu, zilizothibitishwa za hitilafu._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Mweka dhamana katika Web3 kwa usalama wa mkataba mahiri, na malipo kwa wakaguzi yanayosimamiwa kupitia mikataba mahiri ili kuhakikisha kuwa hitilafu muhimu zinalipwa kwa haki._

-  **[CodeHawks](https://www.codehawks.com/)** - _Jukwaa la ushindani la tuzo za hitilafu ambapo wakaguzi hushiriki katika mashindano na changamoto za usalama, na (hivi karibuni) katika ukaguzi wao wenyewe wa kibinafsi._

### Machapisho ya udhaifu na unyonyaji unaojulikana wa mkataba mahiri

- **[ConsenSys: Mashambulizi Yanayojulikana ya Mkataba Mahiri](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Maelezo yanayofaa kwa wanaoanza ya udhaifu muhimu zaidi wa mkataba, na kodi ya mfano kwa matukio mengi._

- **[SWC Registry](https://swcregistry.io/)** - _Orodha iliyoratibiwa ya vipengee vya Common Weakness Enumeration (CWE) vinavyotumika kwa mikataba mahiri ya Ethereum._

- **[Rekt](https://rekt.news/)** - _Chapisho linalosasishwa mara kwa mara la udukuzi na unyonyaji wa hali ya juu wa kripto, pamoja na ripoti za kina za baada ya tukio._

### Changamoto za kujifunza usalama wa mkataba mahiri

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Orodha iliyoratibiwa ya michezo ya kivita ya usalama wa mnyororo wa vitalu, changamoto, na mashindano ya [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) na maandishi ya masuluhisho._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Mchezo wa kivita wa kujifunza usalama wa kushambulia wa mikataba mahiri ya fedha zilizogatuliwa (DeFi) na kujenga ujuzi katika uwindaji wa hitilafu na ukaguzi wa usalama._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Mchezo wa kivita unaotegemea Web3/Solidity ambapo kila kiwango ni mkataba mahiri unaohitaji 'kudukuliwa'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Changamoto ya udukuzi wa mkataba mahiri, iliyowekwa katika tukio la njozi. Kukamilisha kwa mafanikio changamoto hiyo pia kunatoa ufikiaji wa programu ya kibinafsi ya tuzo za hitilafu._

### Mbinu bora za kulinda mikataba mahiri

- **[ConsenSys: Mbinu Bora za Usalama za Mkataba Mahiri wa Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Orodha ya kina ya miongozo ya kulinda mikataba mahiri ya Ethereum._

- **[Nascent: Zana Rahisi za Usalama](https://github.com/nascentxyz/simple-security-toolkit)** - _Mkusanyiko wa miongozo ya vitendo inayozingatia usalama na orodha za ukaguzi kwa ajili ya usanidi wa mkataba mahiri._

- **[Miundo ya Solidity](https://fravoll.github.io/solidity-patterns/)** - _Mkusanyiko muhimu wa miundo salama na mbinu bora za lugha ya upangaji ya mkataba mahiri ya Solidity._

- **[Hati za Solidity: Mambo ya Kuzingatia KiUsalama](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Miongozo ya kuandika mikataba mahiri salama kwa kutumia Solidity._

- **[Kiwango cha Uthibitishaji wa Usalama wa Mkataba Mahiri](https://github.com/securing/SCSVS)** - _Orodha ya ukaguzi yenye sehemu kumi na nne iliyoundwa ili kusanifisha usalama wa mikataba mahiri kwa wasanidi, wasanifu, wakaguzi wa usalama na wachuuzi._

- **[Jifunze Usalama na Ukaguzi wa Mkataba Mahiri](https://updraft.cyfrin.io/courses/security)** - _Kozi kuu ya usalama na ukaguzi wa mkataba mahiri, iliyoundwa kwa ajili ya wasanidi wa mkataba mahiri wanaotafuta kuongeza kiwango cha mbinu zao bora za usalama na kuwa watafiti wa usalama._

### Mafunzo kuhusu usalama wa mkataba mahiri

- [Jinsi ya kuandika mikataba mahiri salama](/developers/tutorials/secure-development-workflow/)

- [Jinsi ya kutumia Slither kupata hitilafu za mkataba mahiri](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jinsi ya kutumia Manticore kupata hitilafu za mkataba mahiri](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Miongozo ya usalama wa mkataba mahiri](/developers/tutorials/smart-contract-security-guidelines/)

- [Jinsi ya kuunganisha kwa usalama mkataba wako wa tokeni na tokeni za kiholela](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Kozi kamili ya usalama na ukaguzi wa mikataba mahiri](https://updraft.cyfrin.io/courses/security)