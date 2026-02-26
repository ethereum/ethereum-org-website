---
title: Usalama wa mkataba erevu
description: Muhtasari wa miongozo ya kuunda mikataba-erevu salama ya Ethereum
lang: sw
---

Mikataba mahiri ni rahisi kubadilika, na ina uwezo wa kudhibiti kiwango kikubwa cha thamani na data, huku ikiendesha mantiki isiyobadilika kulingana na msimbo uliowekwa kwenye kiambajengo. Hii imeunda mfumo mzuri wa ikolojia wa programu zisizoaminika na zilizotawanywa ambazo hutoa faida nyingi juu ya mifumo ya urithi. Pia zinawakilisha fursa kwa washambuliaji wanaotafuta faida kwa kutumia udhaifu katika mikataba mahiri.

Minyororo ya bloku ya umma, kama Ethereum, inazidisha ugumu wa suala la kulinda mikataba-erevu. Msimbo wa mkataba-erevu uliotumwa _kawaida_ hauwezi kubadilishwa ili kurekebisha dosari za usalama, ilhali mali zilizoibwa kutoka kwa mikataba-erevu ni ngumu sana kufuatilia na mara nyingi hazipatikani kwa sababu ya kutobadilika.

Ingawa takwimu zinatofautiana, inakadiriwa kuwa jumla ya thamani iliyoibiwa au kupotea kutokana na kasoro za kiusalama katika mikataba mahiri ni zaidi ya $1 bilioni kwa urahisi. Hii inajumuisha matukio mashuhuri, kama vile [udukuzi wa DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (ETH milioni 3.6 ziliibwa, zenye thamani ya zaidi ya dola bilioni 1 kwa bei za leo), [udukuzi wa mkoba wa Parity wenye saini nyingi](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (dola milioni 30 zilipotea kwa wadukuzi), na [suala la mkoba ulioganda wa Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (zaidi ya dola milioni 300 za ETH zimefungiwa milele).

Masuala yaliyotajwa hapo juu yanafanya kuwa muhimu kwa wasanifu programu kuwekeza juhudi katika kujenga mkataba mahiri iliyo salama, thabiti na inayostahimili uthabiti. Usalama wa mkataba-erevu ni jambo zito, na kila msanidi programu atafanya vizuri kujifunza. Mwongozo huu utashughulikia masuala ya usalama kwa wasanifu wa Ethereum na kuchunguza nyenzo za kuboresha usalama wa mikataba mahiri.

## Mahitaji ya awali {#prerequisites}

Hakikisha unafahamu [misingi ya usanidi wa mkataba-erevu](/developers/docs/smart-contracts/) kabla ya kushughulikia usalama.

## Miongozo ya kuunda mikataba-erevu salama ya Ethereum {#smart-contract-security-guidelines}

### 1. Buni vidhibiti sahihi vya ufikiaji {#design-proper-access-controls}

Katika mikataba-erevu, vitendaji vilivyowekwa alama ya `public` au `external` vinaweza kuitwa na akaunti zozote zinazomilikiwa na nje (EOAs) au akaunti za mkataba. Kubainisha mwonekano wa umma kwa vipengele ni muhimu ikiwa unataka wengine kuingiliana na mkataba wako. Hata hivyo, vitendaji vilivyowekwa alama ya `private` vinaweza tu kuitwa na vitendaji ndani ya mkataba-erevu, na si akaunti za nje. Kumpa kila mshiriki wa mtandao ufikiaji wa kazi za mkataba kunaweza kusababisha shida, haswa ikiwa inamaanisha kuwa mtu yeyote anaweza kufanya shughuli nyeti (k.m., kutengeneza tokeni mpya).

Ili kuzuia matumizi yasiyoidhinishwa ya vitendaji vya mkataba-erevu, ni muhimu kutekeleza vidhibiti salama vya ufikiaji. Mbinu za udhibiti wa ufikiaji huzuia uwezo wa kutumia kazi fulani katika mkataba mahiri kwa vyombo vilivyoidhinishwa, kama vile akaunti zinazowajibika kudhibiti mkataba. Muundo wa **Ownable** na **udhibiti unaotegemea majukumu** ni miundo miwili muhimu kwa kutekeleza udhibiti wa ufikiaji katika mikataba-erevu:

#### Muundo wa Ownable {#ownable-pattern}

Katika muundo wa Kumiliki, anwani imewekwa kama "mmiliki" wa mkataba wakati wa mchakato wa kuunda mkataba. Vitendaji vilivyolindwa hupewa kirekebishaji cha `OnlyOwner`, ambacho huhakikisha mkataba unathibitisha utambulisho wa anwani inayopiga simu kabla ya kutekeleza kitendaji. Simu za utendajikazi zinazolindwa kutoka kwa anwani zingine kando na mmiliki wa mkataba hurejeshwa kila wakati, na hivyo kuzuia ufikiaji usiohitajika.

#### Udhibiti wa ufikiaji unaotegemea majukumu {#role-based-access-control}

Kusajili anwani moja kama `Owner` katika mkataba-erevu huleta hatari ya uwekaji kati na huwakilisha sehemu moja ya kushindwa. Ikiwa funguo za akaunti ya mmiliki zitaathiriwa, washambuliaji wanaweza kushambulia mkataba unaomilikiwa. Hii ndiyo sababu kutumia muundo wa udhibiti wa ufikiaji wenye msingi wa dhima na akaunti nyingi za usimamizi inaweza kuwa chaguo bora.

Katika udhibiti wa ufikiaji unaotegemea jukumu, ufikiaji wa vipengele nyeti husambazwa kati ya seti ya washiriki wanaoaminika. Kwa mfano, akaunti moja inaweza kuwa na jukumu la kutengeneza tokeni, huku akaunti nyingine ikifanya marekebisho au kusitisha mkataba. Kutawanya udhibiti wa ufikiaji kwa njia hii huondoa alama moja ya kutofaulu na kupunguza mawazo ya kuaminiana kwa watumiaji.

##### Kutumia mikoba ya saini nyingi

Njia nyingine ya kutekeleza udhibiti salama wa ufikiaji ni kutumia [akaunti ya saini nyingi](/developers/docs/smart-contracts/#multisig) kudhibiti mkataba. Tofauti na EOA ya kawaida, akaunti zenye sahihi ni nyingi zinamilikiwa na mamlaka nyingi na zinahitaji sahihi kutoka kwa idadi ya chini ya akaunti—sema 3-ya-5—ili kutekeleza miamala.

Kutumia sahihi nyingi kwa udhibiti wa ufikiaji huleta safu ya ziada ya usalama kwani vitendo kwenye mkataba lengwa vinahitaji idhini kutoka kwa wahusika wengi. Hili ni muhimu hasa ikiwa ni muhimu kutumia muundo wa Kumiliki, kwa kuwa inafanya iwe vigumu zaidi kwa mshambulizi au mtu wa ndani kulaghai utendaji kazi nyeti wa mkataba kwa madhumuni mabaya.

### 2. Tumia kauli za require(), assert(), na revert() kulinda utendakazi wa mkataba {#use-require-assert-revert}

Kama ilivyotajwa, mtu yeyote anaweza kupiga simu kazi za umma katika mkataba wako mahiri mara tu utakapowekwa kwenye kiambajengo. Kwa kuwa huwezi kujua mapema jinsi akaunti za nje zitakavyoingiliana na mkataba, ni vyema kutekeleza ulinzi wa ndani dhidi ya utendaji kazi wenye matatizo kabla ya kupeleka. Unaweza kutekeleza tabia sahihi katika mikataba-erevu kwa kutumia kauli za `require()`, `assert()`, na `revert()` ili kusababisha vighairi na kurudisha mabadiliko ya hali ikiwa utekelezaji utashindwa kukidhi mahitaji fulani.

**`require()`**: `require` hufafanuliwa mwanzoni mwa vitendaji na huhakikisha masharti yaliyowekwa awali yanatimizwa kabla ya kitendaji kilichoitwa kutekelezwa. Kauli ya `require` inaweza kutumika kuthibitisha ingizo la mtumiaji, kuangalia vigezo vya hali, au kuthibitisha utambulisho wa akaunti inayopiga simu kabla ya kuendelea na kitendaji.

**`assert()`**: `assert()` hutumika kugundua makosa ya ndani na kuangalia ukiukaji wa “kanuni zisizobadilika” katika msimbo wako. Tofauti ni madai ya kimantiki kuhusu hali ya mkataba ambayo inapaswa kuwa ya kweli kwa utekelezaji wote wa kazi. Mfano wa kanuni isiyobadilika ni jumla ya kiwango cha juu cha usambazaji au salio la mkataba wa tokeni. Kutumia `assert()` huhakikisha kuwa mkataba wako haufikii hali hatarishi, na ikitokea, mabadiliko yote kwenye vigezo vya hali yanarejeshwa nyuma.

**`revert()`**: `revert()` inaweza kutumika katika kauli ya if-else ambayo husababisha kighairi ikiwa hali inayohitajika haijatimizwa. Mkataba wa sampuli hapa chini unatumia `revert()` kulinda utekelezaji wa vitendaji:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Hakuna Ether ya kutosha iliyotolewa.");
        // Tekeleza ununuzi.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Pima mikataba-erevu na thibitisha usahihi wa msimbo {#test-smart-contracts-and-verify-code-correctness}

Kutobadilika kwa msimbo unaoendeshwa katika [Mashine Halisi ya Ethereum](/developers/docs/evm/) kunamaanisha mikataba-erevu inahitaji kiwango cha juu cha tathmini ya ubora wakati wa awamu ya usanidi. Kupima mkataba wako kwa kina na kuuangalia kwa matokeo yoyote yasiyotarajiwa kutaboresha usalama kwa kiasi kikubwa na kulinda watumiaji wako kwa muda mrefu.

Njia ya kawaida ni kuandika majaribio madogo ya vitengo kwa kutumia data ya mfano ambayo mkataba unatarajiwa kupokea kutoka kwa watumiaji. [Upimaji wa vitengo](/developers/docs/smart-contracts/testing/#unit-testing) ni mzuri kwa kupima utendakazi wa vitendaji fulani na kuhakikisha mkataba-erevu unafanya kazi kama inavyotarajiwa.

Kwa bahati mbaya, upimaji wa vitengo hauna ufanisi mdogo katika kuboresha usalama wa mkataba-erevu unapotumika peke yake. Jaribio la kitengo linaweza kuthibitisha kuwa kitendaji kinajitekeleza vizuri kwa data ya mfano, lakini majaribio ya kitengo yana ufanisi tu kama majaribio yaliyoandikwa. Hii inafanya iwe vigumu kugundua visa vya pembeni vilivyokosekana na udhaifu ambao unaweza kuvunja usalama wa mkataba wako-erevu.

Njia bora ni kuchanganya upimaji wa vitengo na upimaji unaotegemea sifa unaofanywa kwa kutumia [uchanganuzi tuli na unaobadilika](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Uchanganuzi tuli hutegemea uwakilishi wa kiwango cha chini, kama vile [grafu za mtiririko wa udhibiti](https://en.wikipedia.org/wiki/Control-flow_graph) na [miti dhahania ya sintaksia](https://deepsource.io/glossary/ast/) ili kuchanganua hali za programu zinazoweza kufikiwa na njia za utekelezaji. Wakati huo huo, mbinu za uchanganuzi unaobadilika, kama vile [uchanganyaji wa mkataba-erevu](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), hutekeleza msimbo wa mkataba na thamani za ingizo nasibu ili kugundua operesheni zinazokiuka sifa za usalama.

[Uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification) ni mbinu nyingine ya kuthibitisha sifa za usalama katika mikataba-erevu. Tofauti na upimaji wa kawaida, uthibitishaji rasmi unaweza kuthibitisha kwa uhakika kutokuwepo kwa makosa katika mkataba-erevu. Hii inafanikiwa kwa kuunda vipimo rasmi ambavyo vinanasa sifa za usalama zinazohitajika na kuthibitisha kuwa muundo rasmi wa kandarasi unafuata vipimo hivi.

### 4. Omba mapitio huru ya msimbo wako {#get-independent-code-reviews}

Baada ya kupima mkataba wako, ni vizuri kuwaomba wengine wakague msimbo chanzo kwa masuala yoyote ya usalama. Majaribio hayatafichua kila dosari katika mkataba mzuri, lakini kupata hakiki huru huongeza uwezekano wa kugundua udhaifu.

#### Ukaguzi {#audits}

Kuagiza ukaguzi wa mkataba-erevu ni njia moja ya kufanya mapitio huru ya msimbo. Wakaguzi wana jukumu muhimu katika kuhakikisha kuwa mikataba mahiri ni salama na haina kasoro za ubora na hitilafu za muundo.

Hata hivyo, unapaswa kuepuka kuchukulia ukaguzi kama suluhisho la kila kitu. Ukaguzi mahiri wa mikataba hautashika kila hitilafu na mara nyingi umeundwa ili kutoa ukaguzi wa ziada, ambao unaweza kusaidia kugundua matatizo ambayo wasanidi programu hawakuyapata wakati wa utayarishaji na majaribio ya awali. Unapaswa pia kufuata mbinu bora za kufanya kazi na wakaguzi, kama vile kuandika msimbo ipasavyo na kuongeza maoni ya ndani, ili kuongeza manufaa ya ukaguzi wa mikataba mahiri.

- [Vidokezo na mbinu za ukaguzi wa mkataba-erevu](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Tumia ukaguzi wako kikamilifu](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Zawadi za mdudu {#bug-bounties}

Kuanzisha programu ya zawadi ya mdudu ni njia nyingine ya kutekeleza mapitio ya msimbo wa nje. Zawadi ya mdudu ni malipo ya kifedha yanayotolewa kwa watu binafsi (kawaida wadukuzi wa kofia nyeupe) wanaogundua udhaifu katika programu.

Zikitumiwa ipasavyo, zawadi za mdudu huwapa wanachama wa jumuiya ya wadukuzi motisha wa kukagua msimbo wako kwa dosari muhimu. Mfano halisi ni "mdudu wa pesa usio na kikomo" ambao ungemruhusu mshambuliaji kuunda kiasi kisicho na kikomo cha ether kwenye [Optimism](https://www.optimism.io/), itifaki ya [Safu ya 2](/layer-2/) inayoendeshwa kwenye Ethereum. Kwa bahati nzuri, mdukuzi wa kofia nyeupe [aligundua dosari hiyo](https://www.saurik.com/optimism.html) na kuijulisha timu, [na kupata malipo makubwa katika mchakato huo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Mkakati muhimu ni kuweka malipo ya programu ya zawadi ya mdudu kulingana na kiasi cha fedha zilizo hatarini. Ikifafanuliwa kama "[zawadi ya mdudu ya kuongeza kiwango](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", njia hii hutoa motisha wa kifedha kwa watu binafsi kufichua udhaifu kwa uwajibikaji badala ya kuutumia.

### 5. Fuata mbinu bora wakati wa usanidi wa mkataba-erevu {#follow-smart-contract-development-best-practices}

Uwepo wa ukaguzi na zawadi za mdudu haukuondolei jukumu lako la kuandika msimbo wa hali ya juu. Usalama mzuri wa mkataba-erevu huanza na kufuata michakato sahihi ya usanifu na usanidi:

- Hifadhi msimbo wote katika mfumo wa kudhibiti matoleo, kama vile git

- Fanya marekebisho yote ya msimbo kupitia maombi ya kuvuta

- Hakikisha maombi ya kuvuta yana angalau mkaguzi mmoja huru ikiwa unafanya kazi peke yako kwenye mradi, zingatia kutafuta wasanifu programu wengine na ukaguzi wa nambari za biashara

- Tumia [mazingira ya usanidi](/developers/docs/frameworks/) kwa kupima, kuandaa, na kutuma mikataba-erevu

- Pitia msimbo wako kupitia zana za msingi za uchambuzi wa msimbo, kama vile [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril na Slither. Kimsingi, unapaswa kufanya hivi kabla ya kila ombi la kuvuta kuunganishwa na kulinganisha tofauti katika matokeo

- Hakikisha msimbo wako unakusanywa bila makosa, na mkusanyaji wa Solidity hatoi maonyo yoyote

- Andika nyaraka za msimbo wako ipasavyo (ukitumia [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) na ueleze maelezo kuhusu usanifu wa mkataba katika lugha rahisi kueleweka. Hii itarahisisha wengine kukagua na kupitia msimbo wako.

### 6. Tekeleza mipango thabiti ya kukabiliana na maafa {#implement-disaster-recovery-plans}

Kubuni vidhibiti salama vya ufikiaji, kutekeleza virekebishaji vya utendaji kazi na mapendekezo mengine kunaweza kuboresha usalama wa mikataba mahiri, lakini hakuwezi kuondoa uwezekano wa matumizi mabaya. Kuunda mikataba mahiri iliyo salama kunahitaji "kujitayarisha kwa kutofaulu" na kuwa na mpango mbadala wa kujibu mashambulizi kwa ufanisi. Mpango sahihi wa kukabiliana na maafa utajumuisha baadhi au yote ya vipengele vifuatavyo:

#### Uboreshaji wa mkataba {#contract-upgrades}

Ingawa mikataba mahiri ya Ethereum haiwezi kubadilika kwa chaguo msingi, inawezekana kufikia kiwango fulani cha kubadilika kwa kutumia mifumo ya uboreshaji. Kuboresha mikataba ni muhimu katika hali ambapo kosa kubwa hufanya mkataba wako wa zamani kutotumika na kupeleka mantiki mpya ndilo chaguo linalowezekana zaidi.

Mbinu za uboreshaji wa mikataba hufanya kazi tofauti, lakini "mchoro wa seva mbadala" ni mojawapo ya mbinu maarufu zaidi za kuboresha mikataba mahiri. [Miundo ya proksi](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) hugawanya hali na mantiki ya programu kati ya mikataba _miwili_. Mkataba wa kwanza (unaoitwa ‘mkataba wa wakala’) huhifadhi vigezo vya hali (k.m., salio la mtumiaji), huku mkataba wa pili (unaoitwa ‘mkataba wa mantiki’) unashikilia msimbo wa kutekeleza majukumu ya mkataba.

Akaunti huingiliana na mkataba wa proksi, ambao hupeleka simu zote za vitendaji kwa mkataba wa mantiki kwa kutumia simu ya kiwango cha chini ya [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Tofauti na simu ya kawaida ya ujumbe, `delegatecall()` huhakikisha kuwa msimbo unaoendeshwa kwenye anwani ya mkataba wa mantiki unatekelezwa katika muktadha wa mkataba unaopiga simu. Hii inamaanisha kuwa mkataba wa mantiki utaandika kila wakati kwenye hifadhi ya proksi (badala ya hifadhi yake yenyewe) na thamani asili za `msg.sender` na `msg.value` huhifadhiwa.

Kukabidhi simu kwa mkataba wa mantiki kunahitaji kuhifadhi anwani yake katika hifadhi ya mkataba wa wakala. Kwa hivyo, kuboresha mantiki ya mkataba ni suala la kupeleka mkataba mwingine wa kimantiki na kuhifadhi anwani mpya katika mkataba wa wakala. Simu zinazofuata kwa mkataba wa wakala zinapoelekezwa kiotomatiki hadi kwa mkataba mpya wa kimantiki, ungekuwa "umeboresha" mkataba bila kurekebisha msimbo.

[Zaidi kuhusu uboreshaji wa mikataba](/developers/docs/smart-contracts/upgrading/).

#### Vituo vya dharura {#emergency-stops}

Kama ilivyoelezwa, ukaguzi na upimaji wa kina hauwezi kugundua mende zote kwenye mkataba-erevu. Athari ikitokea kwenye msimbo wako baada ya kutumwa, haiwezekani kuweka alama kwa kuwa huwezi kubadilisha msimbo unaotumika kwenye anwani ya mkataba. Pia, mbinu za uboreshaji (k.m., ruwaza za seva mbadala) zinaweza kuchukua muda kutekelezwa (mara nyingi zinahitaji idhini kutoka kwa wahusika tofauti), ambayo huwapa washambuliaji muda zaidi wa kusababisha uharibifu zaidi.

Chaguo la nyuklia ni kutekeleza chaguo la kukokotoa la "kusimamisha dharura" ambalo huzuia simu kwa kazi zinazoweza kuathiriwa katika mkataba. Vituo vya dharura kwa kawaida hujumuisha vipengele vifuatavyo:

1. Kigezo cha Boolean cha kimataifa kinachoonyesha ikiwa mkataba-erevu uko katika hali ya kusimamishwa au la. Kigezo hiki huwekwa kuwa `false` wakati wa kusanidi mkataba, lakini kitarudi kuwa `true` mara mkataba utakapositishwa.

2. Vitendaji vinavyorejelea kigezo cha Boolean katika utekelezaji wao. Vipengele kama hivyo vinaweza kufikiwa wakati mkataba mahiri haujasimamishwa, na hutoweza kufikiwa wakati kipengele cha kusimamisha dharura kinapoanzishwa.

3. Hulka yenye ufikiaji wa kitendaji cha kusimamisha dharura, ambacho huweka kigezo cha Boolean kuwa `true`. Ili kuzuia vitendo viovu, simu kwa chaguo hili la kazi zinaweza kuzuiwa kwa anwani inayoaminika (k.m., mmiliki wa mkataba).

Mara tu mkataba unapowasha kituo cha dharura, vitendaji fulani havitaitika. Hii inafanikiwa kwa kufunga vitendaji teule katika kirekebishaji kinachorejelea kigezo cha kimataifa. Hapo chini ni [mfano](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) unaoelezea utekelezaji wa muundo huu katika mikataba:

```solidity
// Msimbo huu haujakaguliwa kitaalamu na hautoi ahadi yoyote kuhusu usalama au usahihi. Tumia kwa hatari yako mwenyewe.

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
        // Angalia uidhinishaji wa msg.sender hapa
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Mantiki ya kuweka amana inatokea hapa
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Utoaji wa dharura unatokea hapa
    }
}
```

Mfano huu unaonyesha sifa za msingi za vituo vya dharura:

- `isStopped` ni Boolean inayotathminiwa kuwa `false` mwanzoni na `true` wakati mkataba unapoingia katika hali ya dharura.

- Virekebishaji vya vitendaji `onlyWhenStopped` na `stoppedInEmergency` hukagua kigezo cha `isStopped`. `stoppedInEmergency` hutumika kudhibiti vitendaji ambavyo havipaswi kufikiwa wakati mkataba uko hatarini (k.m., `deposit()`). Simu kwa vitendaji hivi zitarudi nyuma tu.

`onlyWhenStopped` hutumika kwa vitendaji ambavyo vinapaswa kuitika wakati wa dharura (k.m., `emergencyWithdraw()`). Kazi kama hizo zinaweza kusaidia kutatua hali hiyo, kwa hivyo kutengwa kwao kutoka kwa orodha ya "kazi zilizozuiliwa".

Kutumia utendaji kazi wa kusimamisha dharura kunatoa mwanya mzuri wa kushughulika na udhaifu mkubwa katika mkataba wako mahiri. Hata hivyo, huongeza hitaji la watumiaji kuamini wasanidi programu kutoiwasha kwa sababu za kibinafsi. Kufikia hili, kugatua udhibiti wa kituo cha dharura ama kwa kukiweka chini ya utaratibu wa upigaji kura wa mtandaoni, kufunga saa, au uidhinishaji kutoka kwa mikoba ya sahihi nyingni suluhisho zinazowezekana.

#### Ufuatiliaji wa matukio {#event-monitoring}

[Matukio](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) hukuruhusu kufuatilia simu kwa vitendaji vya mkataba-erevu na kufuatilia mabadiliko kwenye vigezo vya hali. Ni vyema kupanga mkataba wako mahiri ili kutangaza tukio wakati wowote mhusika anachukua hatua muhimu ya usalama (k.m., kutoa pesa).

Kuweka matukio na kuyafuatilia nje ya mnyororo hutoa maarifa juu ya utendakazi wa mikataba na kusaidia ugunduzi wa haraka wa vitendo viovu. Hii inamaanisha kuwa timu yako inaweza kukabiliana haraka na udukuzi na kuchukua hatua ili kupunguza athari kwa watumiaji, kama vile kusitisha utendakazi au kufanya uboreshaji.

Unaweza pia kuchagua zana ya ufuatiliaji ya nje ya rafu ambayo inasambaza arifa kiotomatiki wakati wowote mtu anapoingiliana na mikataba yako. Zana hizi zitakuruhusu kuunda arifa maalum kulingana na vichochezi tofauti, kama vile kiasi cha muamala, marudio ya simu za utendakazi, au vipengele maalum vinavyohusika. Kwa mfano, unaweza kupanga arifa inayokuja wakati kiasi kilichotolewa katika muamala mmoja kinavuka kiwango fulani.

### 7. Buni mifumo salama ya utawala {#design-secure-governance-systems}

Unaweza kutaka kugawa ombi lako kwa kugeuza udhibiti wa kandarasi za msingi kwa wanajamii. Katika hali hii, mfumo mahiri wa kandarasi utajumuisha moduli ya utawala utaratibu unaoruhusu wanajamii kuidhinisha vitendo vya usimamizi kupitia mfumo wa utawala wa mnyororo. Kwa mfano, pendekezo la kuboresha mkataba wa wakala hadi utekelezaji mpya linaweza kupigiwa kura na wenye tokeni.

Utawala uliogawanyika unaweza kuwa wa manufaa, hasa kwa sababu unapatanisha maslahi ya wasanifu programu na watumiaji wa mwisho. Hata hivyo, mbinu mahiri za usimamizi wa mikataba zinaweza kuleta hatari mpya zikitekelezwa kimakosa. Hali inayowezekana ni ikiwa mshambuliaji anapata nguvu kubwa ya kupiga kura (inayopimwa kwa idadi ya tokeni zilizoshikiliwa) kwa kuchukua [mkopo wa ghafla](/defi/#flash-loans) na kusukuma pendekezo ovu.

Njia moja ya kuzuia matatizo yanayohusiana na utawala kwenye mnyororo ni [kutumia kufuli ya muda](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Kufunga muda huzuia mkataba mahiri kutekeleza vitendo fulani hadi muda mahususi upite. Mikakati mingine ni pamoja na kugawa "uzito wa kupiga kura" kwa kila tokeni kulingana na muda ambao imekuwa imefungwa, au kupima uwezo wa kupiga kura wa anwani katika kipindi cha kihistoria (kwa mfano, vitalu 2-3 hapo awali) badala ya kizuizi cha sasa. Njia zote mbili hupunguza uwezekano wa kukusanya haraka nguvu ya kupiga kura ili kubadilisha kura kwenye mnyororo.

Zaidi kuhusu [kubuni mifumo salama ya utawala](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [mifumo tofauti ya upigaji kura katika DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos), na [vejeta za kawaida za mashambulizi ya DAO zinazotumia DeFi](https://dacian.me/dao-governance-defi-attacks) katika viungo vilivyoshirikiwa.

### 8. Punguza utata katika msimbo kwa kiwango cha chini {#reduce-code-complexity}

Wasanidi programu wa jadi wanafahamu kanuni ya KISS (“weka rahisi, mjinga”), ambayo inashauri dhidi ya kuleta utata usio wa lazima katika usanifu wa programu. Hii inafuata fikra ya muda mrefu kwamba “mifumo tata hushindwa kwa njia tata” na iko katika hatari zaidi ya makosa ya gharama kubwa.

Kuweka mambo rahisi ni muhimu sana wakati wa kuandika mikataba mahiri, ikizingatiwa kwamba mikataba mahiri inaweza kudhibiti kiwango kikubwa cha thamani. Kidokezo cha kufikia urahisi unapoandika mikataba-erevu ni kutumia tena maktaba zilizopo, kama vile [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), inapowezekana. Kwa sababu maktaba hizi zimekaguliwa sana na kujaribiwa na wasanifu programu, kuzitumia hupunguza uwezekano wa kuibua makosa kwa kuandika utendaji kazi mpya kuanzia mwanzo.

Ushauri mwingine wa kawaida ni kuandika kazi ndogo ndogo na kuweka mikataba ya kawaida kwa kugawanya mantiki ya biashara katika mikataba mingi. Sio tu kwamba kuandika msimbo rahisi hupunguza eneo la mashambulizi katika mkataba mahiri, pia hurahisisha kufikiria juu ya usahihi wa mfumo mzima na kugundua makosa yanayoweza kutokea ya muundo mapema.

### 9. Jilinde dhidi ya udhaifu wa kawaida wa mkataba-erevu {#mitigate-common-smart-contract-vulnerabilities}

#### Uingiaji upya {#reentrancy}

EVM hairuhusu upatanishi, kumaanisha kuwa mikataba miwili inayohusika katika simu ya ujumbe haiwezi kutekelezwa kwa wakati mmoja. Simu ya nje inasitisha utekelezaji wa mkataba wa kupiga simu na kumbukumbu hadi simu irudi, wakati ambapo utekelezaji unaendelea kama kawaida. Mchakato huu unaweza kuelezewa rasmi kama kuhamisha [mtiririko wa udhibiti](https://www.computerhope.com/jargon/c/contflow.htm) kwenda kwa mkataba mwingine.

Ingawa mara nyingi haina madhara, kuhamisha mtiririko wa udhibiti kwa mikataba isiyoaminika inaweza kusababisha matatizo, kama vile kurejea tena. Shambulio la kurejesha tena hutokea wakati mkataba mbovu unaporejesha kwenye mkataba unaoweza kuathiriwa kabla ya ombi la awali la utendaji kazi kukamilika. Aina hii ya shambulio inaelezewa vizuri zaidi kwa mfano.

Fikiria mkataba-erevu rahisi ('Mhanga') unaomruhusu yeyote kuweka na kutoa ether:

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

Mkataba huu unafichua kitendaji cha `withdraw()` ili kuruhusu watumiaji kutoa ETH iliyowekwa awali kwenye mkataba. Wakati wa kuchakata utoaji, mkataba hufanya operesheni zifuatazo:

1. Hukagua salio la ETH la mtumiaji
2. Hutuma fedha kwa anwani inayopiga simu
3. Huweka upya salio lao kuwa 0, kuzuia utoaji wa ziada kutoka kwa mtumiaji

Kitendaji cha `withdraw()` katika mkataba wa `Victim` hufuata muundo wa “ukaguzi-maingiliano-athari”. _Hukagua_ ikiwa masharti muhimu kwa utekelezaji yanatimizwa (yaani, mtumiaji ana salio chanya la ETH) na hufanya _maingiliano_ kwa kutuma ETH kwa anwani ya mpigaji, kabla ya kutumia _athari_ za muamala (yaani, kupunguza salio la mtumiaji).

Ikiwa `withdraw()` inaitwa kutoka kwa akaunti inayomilikiwa na nje (EOA), kitendaji hutekelezwa kama inavyotarajiwa: `msg.sender.call.value()` hutuma ETH kwa mpigaji. Hata hivyo, ikiwa `msg.sender` ni akaunti ya mkataba-erevu inayoita `withdraw()`, kutuma fedha kwa kutumia `msg.sender.call.value()` pia kutasababisha msimbo uliohifadhiwa kwenye anwani hiyo kuendeshwa.

Fikiria huu ndio msimbo uliotumwa kwenye anwani ya mkataba:

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

Mkataba huu umebuniwa kufanya mambo matatu:

1. Kubali amana kutoka kwa akaunti nyingine (labda EOA ya mshambuliaji)
2. Weka ETH 1 kwenye mkataba wa Mhanga
3. Toa ETH 1 iliyohifadhiwa kwenye mkataba-erevu

Hakuna tatizo hapa, isipokuwa `Attacker` ana kitendaji kingine kinachoita `withdraw()` katika `Victim` tena ikiwa gesi iliyobaki kutoka kwa `msg.sender.call.value` inayoingia ni zaidi ya 40,000. Hii inampa `Attacker` uwezo wa kuingia tena `Victim` na kutoa fedha zaidi _kabla_ ya wito wa kwanza wa `withdraw` kukamilika. Mzunguko unaonekana hivi:

```solidity
- EOA ya Mshambuliaji inaita `Attacker.beginAttack()` na ETH 1
- `Attacker.beginAttack()` inaweka ETH 1 kwenye `Victim`
- `Attacker` inaita `withdraw()` katika `Victim`
- `Victim` inakagua salio la `Attacker` (ETH 1)
- `Victim` inatuma ETH 1 kwa `Attacker` (ambayo inasababisha kitendaji cha chaguo-msingi)
- `Attacker` inaita `Victim.withdraw()` tena (kumbuka kwamba `Victim` haijapunguza salio la `Attacker` kutoka kwa utoaji wa kwanza)
- `Victim` inakagua salio la `Attacker` (ambalo bado ni ETH 1 kwa sababu haijatumia athari za simu ya kwanza)
- `Victim` inatuma ETH 1 kwa `Attacker` (ambayo inasababisha kitendaji cha chaguo-msingi na kumruhusu `Attacker` kuingia tena kwenye kitendaji cha `withdraw`)
- Mchakato unarudiwa hadi `Attacker` aishiwe na gesi, ambapo `msg.sender.call.value` inarudi bila kusababisha utoaji wa ziada
- `Victim` hatimaye inatumia matokeo ya muamala wa kwanza (na zinazofuata) kwenye hali yake, hivyo salio la `Attacker` linawekwa kuwa 0
```

Muhtasari ni kwamba kwa sababu salio la mpigaji simu halijawekwa kuwa 0 hadi utekelezaji wa chaguo la kazi ukamilike, maombi yatakayofuata yatafaulu na kumruhusu mpigaji simu kuondoa salio lake mara nyingi. Aina hii ya shambulio inaweza kutumika kumaliza fedha za mkataba-erevu, kama ilivyotokea katika [udukuzi wa DAO wa 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Mashambulio ya uingiaji upya bado ni suala muhimu kwa mikataba-erevu leo kama [orodha za umma za unyonyaji wa uingiaji upya](https://github.com/pcaversaccio/reentrancy-attacks) zinavyoonyesha.

##### Jinsi ya kuzuia mashambulio ya uingiaji upya

Njia moja ya kushughulikia uingiaji upya ni kufuata [muundo wa ukaguzi-athari-maingiliano](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Mchoro huu huamuru utekelezaji wa chaguo za kukokotoa kwa njia ambayo msimbo unaofanya ukaguzi unaohitajika kabla ya kuendelea na utekelezaji huja kwanza, ikifuatiwa na msimbo unaodhibiti hali ya mkataba, na msimbo unaoingiliana na mikataba mingine au EOA zinazofika mwisho.

Muundo wa ukaguzi-athari-maingiliano unatumika katika toleo lililorekebishwa la mkataba wa `Victim` ulioonyeshwa hapa chini:

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

Mkataba huu hufanya _ukaguzi_ kwenye salio la mtumiaji, hutumia _athari_ za kitendaji cha `withdraw()` (kwa kuweka upya salio la mtumiaji kuwa 0), na huendelea kufanya _maingiliano_ (kutuma ETH kwa anwani ya mtumiaji). Hii inahakikisha kwamba mkataba unasasisha hifadhi yake kabla ya simu ya nje, kuondoa hali ya kuingia tena iliyowezesha shambulio la kwanza. Mkataba wa `Attacker` bado ungeweza kurudi nyuma kwenye `NoLongerAVictim`, lakini kwa kuwa `balances[msg.sender]` imewekwa kuwa 0, utoaji wa ziada utatupa kosa.

Chaguo jingine ni kutumia kufuli ya kujumuisha (inayojulikana kama "mutex") ambayo hufunga sehemu ya hali ya mkataba hadi ombi la kukokotoa likamilike. Hii inatekelezwa kwa kutumia kigezo cha Boolean ambacho huwekwa kuwa `true` kabla ya kitendaji kutekelezwa na kurudi kuwa `false` baada ya wito kukamilika. Kama inavyoonekana katika mfano ulio hapa chini, kutumia mwito hulinda chaguo za kukokotoa dhidi ya simu zinazorudiwa wakati ombi la asili likiendelea kuchakatwa, hivyo basi kusimamisha kwa njia sahihi kurejesha.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Umezuiliwa kuingia upya.");
        locked = true;
        _;
        locked = false;
    }
    // Kitendaji hiki kinalindwa na mutex, kwa hivyo simu za kuingia upya kutoka ndani ya `msg.sender.call` haziwezi kuita `withdraw` tena.
    //  Kauli ya `return` inatathminiwa kuwa `true` lakini bado inatathmini kauli ya `locked = false` katika kirekebishaji
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Hakuna salio la kutoa.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Unaweza pia kutumia mfumo wa [malipo ya kuvuta](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) unaohitaji watumiaji kutoa fedha kutoka kwa mikataba-erevu, badala ya mfumo wa "malipo ya kusukuma" unaotuma fedha kwenye akaunti. Hii huondoa uwezekano wa kuanzisha msimbo bila kukusudia katika anwani zisizojulikana (na pia inaweza kuzuia mashambulizi fulani ya kunyimwa huduma).

#### Kupungua na kufurika kwa nambari kamili {#integer-underflows-and-overflows}

Kuongezeka kamili hutokea wakati matokeo ya utendaji kazi wa hesabu yanapotoka nje ya anuwai ya thamani zinazokubalika, na kusababisha "kupinduka" hadi thamani ya chini kabisa inayoweza kuwakilishwa. Kwa mfano, `uint8` inaweza tu kuhifadhi thamani hadi 2^8-1=255. Operesheni za hesabu zinazosababisha thamani za juu kuliko `255` zitafurika na kuweka upya `uint` kuwa `0`, sawa na jinsi odomita kwenye gari inavyowekwa upya kuwa 0 mara inapofikia maili ya juu zaidi (999999).

Kupungua kupita kiasi kwa namba kamili chini ya thamanini inayoweza kuwakilishwa hutokea kwa sababu sawa: matokeo ya utekelezaji ya hesabu huanguka chini ya masafa yanayokubalika. Sema ulijaribu kupunguza `0` katika `uint8`, matokeo yangevuka tu hadi thamani ya juu inayoweza kuwakilishwa (`255`).

Kujaza kamili na kupunguka kunaweza kusababisha mabadiliko yasiyotarajiwa kwa vigezo vya hali ya mkataba na kusababisha utekelezaji usiopangwa. Ufuatao ni mfano unaoonyesha jinsi mshambulizi anavyoweza kutumia wingi wa hesabu katika mikataba mahiri ili kutekeleza utekelezaji usio sahihi:

```
pragma solidity ^0.7.6;

// Mkataba huu umebuniwa kufanya kazi kama hifadhi ya muda.
// Mtumiaji anaweza kuweka amana kwenye mkataba huu lakini hawezi kutoa kwa angalau wiki moja.
// Mtumiaji anaweza pia kuongeza muda wa kusubiri zaidi ya kipindi cha kusubiri cha wiki 1.

/*
1. Tumia TimeLock
2. Tumia Attack na anwani ya TimeLock
3. Ita Attack.attack ukituma ether 1. Utaweza mara moja
   kutoa ether yako.

Nini kilitokea?
Attack ilisababisha TimeLock.lockTime kufurika na iliweza kutoa
kabla ya kipindi cha kusubiri cha wiki 1.
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
        require(balances[msg.sender] > 0, "Fedha haitoshi");
        require(block.timestamp > lockTime[msg.sender], "Muda wa kufunga haujaisha");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Imeshindwa kutuma Ether");
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
        kama t = muda wa sasa wa kufunga basi tunahitaji kupata x kiasi kwamba
        x + t = 2**256 = 0
        hivyo x = -t
        2**256 = type(uint).max + 1
        hivyo x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Jinsi ya kuzuia kupungua na kufurika kwa nambari kamili

Kuanzia toleo la 0.8.0, mkusanyaji wa Solidity hukataa msimbo unaosababisha kupungua na kufurika kwa nambari kamili. Hata hivyo, mikataba iliyokusanywa na toleo la chini la mkusanyaji inapaswa kufanya ukaguzi kwenye vitendaji vinavyohusisha operesheni za hesabu au kutumia maktaba (k.m., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) inayokagua kupungua/kufurika.

#### Udanganyifu wa Oracle {#oracle-manipulation}

[Maneno](/developers/docs/oracles/) hupata taarifa nje ya mnyororo na kuituma kwenye mnyororo ili mikataba-erevu itumie. Ukiwa na maneno, unaweza kubuni mikataba mahiri ambayo inashirikiana na mifumo ya nje ya mnyororo, kama vile masoko ya mitaji, na kupanua matumizi yao kwa kiasi kikubwa.

Lakini ikiwa chumba cha ndani kimeharibika na kutuma taarifa zisizo sahihi kwenye mnyororo, mikataba mahiri itatekelezwa kulingana na maingizo yenye makosa, ambayo yanaweza kusababisha matatizo. Huu ndio msingi wa "tatizo la chanzo cha data cha nje", ambalo linahusu kazi ya kuhakikisha habari kutoka kwa chumba cha kuzuia kiambajengo ni sahihi, ya kisasa na ya wakati.

Hoja inayohusiana na usalama ni kutumia oracle ya onchain, kama vile ubadilishanaji wa madaraka, ili kupata bei halisi ya mali. Mifumo ya ukopeshaji katika tasnia ya [fedha zilizogatuliwa (DeFi)](/defi/) mara nyingi hufanya hivi ili kubaini thamani ya dhamana ya mtumiaji ili kubaini ni kiasi gani wanaweza kukopa.

Bei za DEX mara nyingi huwa sahihi, hasa kutokana na wasuluhishi kurejesha usawa katika masoko. Hata hivyo, zinaweza kubadilishwa, hasa ikiwa chumba cha ndani cha mnyororo hukokotoa bei za vipengee kulingana na mifumo ya kihistoria ya biashara (kama kawaida).

Kwa mfano, mshambulizi anaweza kusukuma bei ya bidhaa kwa njia isiyo halali kwa kuchukua mkopo wa haraka kabla ya kuingiliana na mkataba wako wa ukopeshaji. Kuuliza DEX kwa bei ya kipengee kunaweza kurudisha thamani ya juu kuliko ya kawaida (kutokana na hitaji kubwa la mvamizi la "kununua" la kipengee), na kuwaruhusu kukopa zaidi ya inavyopaswa. "Mashambulizi ya mkopo wa flash" kama hayo yametumiwa kutumia utegemezi wa maneno ya bei kati ya programu za DeFi, na kugharimu itifaki za mamilioni ya pesa zilizopotea.

##### Jinsi ya kuzuia udanganyifu wa oracle

Sharti la chini kabisa la [kuepuka udanganyifu wa oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) ni kutumia mtandao wa oracle uliogatuliwa unaouliza taarifa kutoka vyanzo vingi ili kuepuka sehemu moja ya kushindwa. Mara nyingi, chanzo cha data cha nje kilichotawanywa huwa na motisha za kiuchumi za kikriptomito ili kuhimiza nodi za oracle kuripoti habari sahihi, na kuzifanya kuwa salama zaidi kuliko chanzo cha data cha kati.

Ikiwa unapanga kuuliza chanzo cha data cha ndani ya mnyororo kwa bei za mali, zingatia kutumia ile inayotekeleza utaratibu wa wastani wa bei uliopimwa kwa wakati (TWAP). Oracle ya [TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) huuliza bei ya mali kwa nyakati mbili tofauti (ambazo unaweza kurekebisha) na kukokotoa bei ya papo hapo kulingana na wastani uliopatikana. Kuchagua muda mrefu hulinda itifaki yako dhidi ya udanganyifu wa bei kwa kuwa maagizo makubwa yaliyotekelezwa hivi majuzi hayawezi kuathiri bei za mali.

## Rasilimali za usalama wa mkataba-erevu kwa wasanidi programu {#smart-contract-security-resources-for-developers}

### Zana za kuchambua mikataba-erevu na kuthibitisha usahihi wa msimbo {#code-analysis-tools}

- **[Zana na maktaba za upimaji](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Mkusanyiko wa zana na maktaba za kiwango cha tasnia za kufanya majaribio ya kitengo, uchambuzi tuli, na uchambuzi unaobadilika kwenye mikataba-erevu._

- **[Zana za uthibitishaji rasmi](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Zana za kuthibitisha usahihi wa utendaji katika mikataba-erevu na kuangalia kanuni zisizobadilika._

- **[Huduma za ukaguzi wa mkataba-erevu](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Orodha ya mashirika yanayotoa huduma za ukaguzi wa mkataba-erevu kwa miradi ya maendeleo ya Ethereum._

- **[Mifumo ya zawadi za mdudu](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Mifumo ya kuratibu zawadi za mdudu na kuthawabisha ufichuzi wa kuwajibika wa udhaifu muhimu katika mikataba-erevu._

- **[Kikagua Uma](https://forkchecker.hashex.org/)** - _Zana ya mtandaoni isiyolipishwa ya kuangalia taarifa zote zinazopatikana kuhusu mkataba uliogawanywa._

- **[Kisimbaji cha ABI](https://abi.hashex.org/)** - _Huduma ya mtandaoni isiyolipishwa ya kusimba vitendaji vya mkataba wako wa Solidity na hoja za ujenzi._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Kichanganuzi Tuli cha Solidity, kinachopitia Miti ya Sintaksia Dhahania (AST) ili kubainisha udhaifu unaoshukiwa na kuchapisha masuala katika umbizo la markdown linalotumika kwa urahisi._

### Zana za ufuatiliaji wa mikataba-erevu {#smart-contract-monitoring-tools}

- **[Arifa za Wakati Halisi za Tenderly](https://tenderly.co/monitoring)** - _Zana ya kupata arifa za wakati halisi wakati matukio yasiyo ya kawaida au yasiyotarajiwa yanapotokea kwenye mikataba yako erevu au mikoba._

### Zana za usimamizi salama wa mikataba-erevu {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Mkoba wa mkataba-erevu unaoendeshwa kwenye Ethereum unaohitaji idadi ya chini ya watu kuidhinisha muamala kabla haujatokea (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Maktaba za mikataba za kutekeleza vipengele vya kiutawala, ikiwa ni pamoja na umiliki wa mkataba, uboreshaji, vidhibiti vya ufikiaji, utawala, uwezo wa kusitishwa, na zaidi._

### Huduma za ukaguzi wa mkataba-erevu {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Huduma ya ukaguzi wa mkataba-erevu inayosaidia miradi katika mfumo mzima wa mnyororo wa bloku kuhakikisha itifaki zao ziko tayari kwa uzinduzi na zimejengwa ili kuwalinda watumiaji._

- **[CertiK](https://www.certik.com/)** - _Kampuni ya usalama ya mnyororo wa bloku inayoanzisha matumizi ya teknolojia ya kisasa ya Uthibitishaji rasmi kwenye mikataba-erevu na mitandao ya mnyororo wa bloku._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Kampuni ya usalama wa mtandao inayochanganya utafiti wa usalama na mtazamo wa mshambuliaji ili kupunguza hatari na kuimarisha msimbo._

- **[PeckShield](https://peckshield.com/)** - _Kampuni ya usalama ya mnyororo wa bloku inayotoa bidhaa na huduma kwa ajili ya usalama, faragha, na utumiaji wa mfumo mzima wa mnyororo wa bloku._

- **[QuantStamp](https://quantstamp.com/)** - _Huduma ya ukaguzi inayowezesha upitishaji mkuu wa teknolojia ya mnyororo wa bloku kupitia huduma za usalama na tathmini ya hatari._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Kampuni ya usalama wa mkataba-erevu inayotoa ukaguzi wa usalama kwa mifumo iliyogatuliwa._

- **[Runtime Verification](https://runtimeverification.com/)** - _Kampuni ya usalama inayobobea katika uundaji rasmi na uthibitishaji wa mikataba-erevu._

- **[Hacken](https://hacken.io)** - _Mkaguzi wa usalama wa mtandao wa Web3 anayeleta mbinu ya 360-degree kwa usalama wa mnyororo wa bloku._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Huduma za ukaguzi za Solidity na Cairo, zinazohakikisha uadilifu wa mikataba-erevu na usalama wa watumiaji kote Ethereum na Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx inazingatia ukaguzi wa mnyororo wa bloku na mkataba-erevu ili kuhakikisha usalama wa sarafu za kidigitali, ikitoa huduma kama vile maendeleo ya mkataba-erevu, upimaji wa kupenya, ushauri wa mnyororo wa bloku._

- **[Code4rena](https://code4rena.com/)** - _Jukwaa la ukaguzi shindani linalowapa motisha wataalam wa usalama wa mkataba-erevu kutafuta udhaifu na kusaidia kufanya web3 iwe salama zaidi._

- **[CodeHawks](https://codehawks.com/)** - _Jukwaa la ukaguzi shindani linaloandaa mashindano ya ukaguzi wa mikataba-erevu kwa watafiti wa usalama._

- **[Cyfrin](https://cyfrin.io)** - _Nguvu ya usalama ya Web3, inayokuza usalama wa crypto kupitia bidhaa na huduma za ukaguzi wa mkataba-erevu._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Kampuni ya usalama ya Web3 inayotoa ukaguzi wa usalama kwa mifumo ya mnyororo wa bloku kupitia timu ya wakaguzi wenye uzoefu na zana bora zaidi._

- **[Oxorio](https://oxor.io/)** - _Ukaguzi wa mikataba-erevu na huduma za usalama za mnyororo wa bloku zenye utaalamu katika EVM, Solidity, ZK, teknolojia ya minyororo-tofauti kwa kampuni za crypto na miradi ya DeFi._

- **[Inference](https://inference.ag/)** - _Kampuni ya ukaguzi wa usalama, iliyobobea katika ukaguzi wa mkataba-erevu kwa minyororo ya bloku inayotegemea EVM. Shukrani kwa wakaguzi wake waliobobea, wanatambua matatizo yanayoweza kutokea na kupendekeza njia zinazoweza kuchukuliwa ili kuyasuluhisha kabla ya kutumwa._

### Mifumo ya zawadi za mdudu {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Jukwaa la zawadi za mdudu kwa mikataba-erevu na miradi ya DeFi, ambapo watafiti wa usalama hupitia msimbo, hufichua udhaifu, hulipwa, na kufanya crypto iwe salama zaidi._

- **[HackerOne](https://www.hackerone.com/)** - _Jukwaa la uratibu wa udhaifu na zawadi za mdudu linalounganisha biashara na wapimaji wa kupenya na watafiti wa usalama wa mtandao._

- **[HackenProof](https://hackenproof.com/)** - _Jukwaa la kitaalamu la zawadi za mdudu kwa miradi ya crypto (DeFi, Mikataba-erevu, Mikoba, CEX na zaidi), ambapo wataalamu wa usalama hutoa huduma za uchunguzi na watafiti hulipwa kwa ripoti za mdudu zinazofaa na zilizothibitishwa._

- **[Sherlock](https://www.sherlock.xyz/)** - _Mtoa dhamana katika Web3 kwa usalama wa mkataba-erevu, na malipo kwa wakaguzi yanasimamiwa kupitia mikataba-erevu ili kuhakikisha kwamba mende husika zinalipwa kwa haki._

- **[CodeHawks](https://www.codehawks.com/)** - _Jukwaa la ushindani la zawadi za mdudu ambapo wakaguzi hushiriki katika mashindano na changamoto za usalama, na (hivi karibuni) katika ukaguzi wao wa kibinafsi._

### Machapisho ya udhaifu na unyonyaji unaojulikana wa mkataba-erevu {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Mashambulizi Yanayojulikana ya Mkataba-erevu](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Maelezo rahisi kwa wanaoanza kuhusu udhaifu muhimu zaidi wa mkataba, na msimbo wa sampuli kwa visa vingi._

- **[Rejesta ya SWC](https://swcregistry.io/)** - _Orodha iliyoratibiwa ya vitu vya Uorodheshaji wa Udhaifu wa Kawaida (CWE) vinavyotumika kwa mikataba-erevu ya Ethereum._

- **[Rekt](https://rekt.news/)** - _Chapisho linalosasishwa mara kwa mara la udukuzi na unyonyaji wa hali ya juu wa crypto, pamoja na ripoti za kina za baada ya tukio._

### Changamoto za kujifunza usalama wa mkataba-erevu {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Orodha iliyoratibiwa ya michezo ya vita ya usalama wa mnyororo wa bloku, changamoto, na mashindano ya [Kamata Bendera](https://www.webopedia.com/definitions/ctf-event/amp/) na maelezo ya suluhisho._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Mchezo wa vita wa kujifunza usalama wa mashambulizi wa mikataba-erevu ya DeFi na kujenga ujuzi katika uwindaji wa mende na ukaguzi wa usalama._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Mchezo wa vita unaotegemea Web3/Solidity ambapo kila ngazi ni mkataba-erevu unaohitaji 'kudukuliwa'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Changamoto ya udukuzi wa mkataba-erevu, iliyowekwa katika matukio ya njozi. Kukamilisha changamoto kwa mafanikio pia kunatoa ufikiaji kwa programu ya kibinafsi ya zawadi za mdudu._

### Mbinu bora za kulinda mikataba-erevu {#smart-contract-security-best-practices}

- **[ConsenSys: Mbinu Bora za Usalama wa Mkataba-erevu wa Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Orodha pana ya miongozo ya kulinda mikataba-erevu ya Ethereum._

- **[Nascent: Zana Rahisi ya Usalama](https://github.com/nascentxyz/simple-security-toolkit)** - _Mkusanyiko wa miongozo na orodha za ukaguzi zinazozingatia usalama kwa maendeleo ya mkataba-erevu._

- **[Miundo ya Solidity](https://fravoll.github.io/solidity-patterns/)** - _Mkusanyiko muhimu wa miundo salama na mbinu bora za lugha ya programu ya mkataba-erevu Solidity._

- **[Nyaraka za Solidity: Mambo ya Kuzingatia ya Usalama](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Miongozo ya kuandika mikataba-erevu salama na Solidity._

- **[Kiwango cha Uthibitishaji wa Usalama wa Mkataba-erevu](https://github.com/securing/SCSVS)** - _Orodha ya ukaguzi ya sehemu kumi na nne iliyoundwa ili kusawazisha usalama wa mikataba-erevu kwa wasanidi programu, wasanifu, wakaguzi wa usalama na wachuuzi._

- **[Jifunze Usalama na Ukaguzi wa Mkataba-erevu](https://updraft.cyfrin.io/courses/security)** - _Kozi ya mwisho ya usalama na ukaguzi wa mkataba-erevu, iliyoundwa kwa wasanidi programu wa mikataba-erevu wanaotaka kuboresha mbinu zao bora za usalama na kuwa watafiti wa usalama._

### Mafunzo kuhusu usalama wa mkataba-erevu {#tutorials-on-smart-contract-security}

- [Jinsi ya kuandika mikataba-erevu salama](/developers/tutorials/secure-development-workflow/)

- [Jinsi ya kutumia Slither kupata mende za mkataba-erevu](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Jinsi ya kutumia Manticore kupata mende za mkataba-erevu](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Miongozo ya usalama wa mkataba-erevu](/developers/tutorials/smart-contract-security-guidelines/)

- [Jinsi ya kuunganisha kwa usalama mkataba wako wa tokeni na tokeni holela](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Kozi kamili ya usalama na ukaguzi wa mikataba-erevu](https://updraft.cyfrin.io/courses/security)
