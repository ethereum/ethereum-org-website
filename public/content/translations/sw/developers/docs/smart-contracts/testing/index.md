---
title: Kujaribu mikataba ya mahiri
description: Muhtasari wa mbinu na mazingatio ya kupima mikataba-erevu ya Ethereum.
lang: sw
---

Minyororo ya kiambajengo cha umma kama vile Ethereum hakiwezi kubadilika, hivyo kufanya iwe vigumu kubadilisha msimbo wa mikataba mahiri baada ya kutumwa. [Mifumo ya kuboresha mikataba](/developers/docs/smart-contracts/upgrading/) kwa ajili ya kufanya "maboresho ya mtandaoni" ipo, lakini hii ni vigumu kuitekeleza na inahitaji makubaliano ya kijamii. Zaidi ya hayo, sasisho linaweza kurekebisha hitilafu _baada_ ya kugunduliwa—ikiwa mshambulizi atagundua udhaifu kwanza, mkataba wako-erevu uko katika hatari ya kutumiwa vibaya.

Kwa sababu hizi, kupima mikataba-erevu kabla ya [kupeleka](/developers/docs/smart-contracts/deploying/) kwenye Mtandao Mkuu ni sharti la chini kabisa kwa [usalama](/developers/docs/smart-contracts/security/). Kuna mbinu nyingi za kupima mikataba na kutathmini usahihi wa kanuni, unachochagua kunategemea mahitaji yako. Hata hivyo kundi la majaribio linaloundwa na zana na mbinu tofauti ni bora kwa kupata dosari ndogo na kuu za usalama katika msimbo wa mkataba.

## Mahitaji ya awali {#prerequisites}

Ukurasa huu unaelezea jinsi ya kupima mikataba-erevu kabla ya kuipeleka kwenye mtandao wa Ethereum. Inachukulia kuwa unafahamu [mikataba-erevu](/developers/docs/smart-contracts/).

## Upimaji wa mkataba-erevu ni nini? {#what-is-smart-contract-testing}

Majaribio ya mkataba mahiri ni mchakato wa kuthibitisha kuwa msimbo wa mkataba mahiri hufanya kazi inavyotarajiwa. Majaribio ni muhimu kwa kuthibitisha kama mkataba mahiri unakidhi mahitaji ya kutegemewa, utumiaji na usalama.

Ingawa mbinu hutofautiana, mbinu nyingi za majaribio zinahitaji kutekeleza mkataba mahiri na sampuli ndogo ya data inayotarajiwa kushughulikia. Ikiwa mkataba utatoa matokeo sahihi kwa data ya sampuli, inachukuliwa kuwa unafanya kazi ipasavyo. Zana nyingi za upimaji hutoa rasilimali za kuandika na kutekeleza [kesi za majaribio](https://en.m.wikipedia.org/wiki/Test_case) ili kuangalia kama utekelezaji wa mikataba unalingana na matokeo yanayotarajiwa.

### Kwa nini ni muhimu kupima mikataba-erevu? {#importance-of-testing-smart-contracts}

Kwa kuwa mikataba-erevu mara nyingi hudhibiti mali za kifedha za thamani ya juu, makosa madogo ya programu yanaweza na mara nyingi husababisha [hasara kubwa kwa watumiaji](https://rekt.news/leaderboard/). Majaribio thabiti yanaweza, hata hivyo, kukusaidia kugundua kasoro na matatizo katika msimbo mahiri wa mkataba na kuyarekebisha kabla ya kuzindua kwenye Mainnet.

Ingawa inawezekana kuboresha mkataba ikiwa hitilafu itagunduliwa, maboresho ni magumu na yanaweza [kusababisha makosa](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) ikiwa hayatashughulikiwa ipasavyo. Kuboresha mkataba kunakanusha zaidi kanuni ya kutobadilika na kubebea watumiaji mawazo ya ziada ya uaminifu. Kinyume chake, mpango wa kina wa kupima mkataba wako hupunguza hatari za usalama wa mkataba na kupunguza hitaji la kufanya maboresho changamano baada ya kupeleka.

## Mbinu za kupima mikataba-erevu {#methods-for-testing-smart-contracts}

Mbinu za kupima mikataba-erevu ya Ethereum ziko chini ya kategoria mbili pana: **upimaji wa kiotomatiki** na **upimaji wa mikono**. Majaribio ya kiotomatiki na majaribio ya mikono hutoa manufaa ya kipekee na usuluhishi, lakini unaweza kuchanganya zote mbili ili kuunda mpango thabiti wa kuchanganua mikataba yako.

### Upimaji wa kiotomatiki {#automated-testing}

Jaribio la kiotomatiki hutumia zana zinazokagua kiotomatiki msimbo mahiri wa mikataba kwa hitilafu katika utekelezaji. Faida ya upimaji wa kiotomatiki hutokana na kutumia [skripti](https://www.techtarget.com/whatis/definition/script?amp=1) kuongoza tathmini ya utendakazi wa mkataba. Majaribio ya hati yanaweza kuratibiwa kufanya kazi mara kwa mara bila uingiliaji kati wa binadamu, hivyo kufanya majaribio ya kiotomatiki kuwa na ufanisi zaidi kuliko mbinu za mikono za majaribio.

Jaribio la kiotomatiki ni muhimu sana wakati majaribio yanarudiwa na kuchukua muda; ngumu kutekeleza kwa mikono; hushambuliwa na makosa ya kibinadamu; au kuhusisha kutathmini kazi muhimu za mkataba. Lakini zana za kupima za kiotomatiki zinaweza kuwa na hasara—zinaweza kukosa hitilafu fulani na kutoa [chanya za uwongo](https://www.contrastsecurity.com/glossary/false-positive) nyingi. Hivyo, kuoanisha upimaji wa kiotomatiki na upimaji wa mikono kwa mikataba-erevu ni bora.

### Upimaji wa mikono {#manual-testing}

Uthibitishaji wa mikono linasaidiwa na binadamu na linahusisha kutekeleza kila kesi ya jaribio katika kundi lako la majaribio moja baada ya jingine wakati wa kuchanganua usahihi wa mikataba mahiri. Hii ni tofauti na majaribio ya kiotomatiki ambapo unaweza kufanya majaribio mengi ya pekee kwenye mkataba kwa wakati mmoja na kupata ripoti inayoonyesha majaribio yote yaliyofeli na kufaulu.

Jaribio la kibinafsi linaweza kufanywa na mtu mmoja kufuatia mpango wa jaribio ulioandikwa ambao unashughulikia hali tofauti za majaribio. Unaweza pia kuwa na watu au vikundi vingi kushirikiana na mkataba mzuri katika kipindi fulani kama sehemu ya majaribio ya mikono. Wanaojaribu watalinganisha tabia halisi ya mkataba dhidi ya tabia inayotarajiwa, kuashiria tofauti yoyote kama kosa.

Upimaji wa mwongozo unaofaa unahitaji rasilimali nyingi (ustadi, muda, pesa, na juhudi), na inawezekana—kutokana na makosa ya kibinadamu—kukosa makosa fulani wakati wa kufanya majaribio. Lakini uthibitishaji kwa mkono kunaweza pia kuwa na manufaa—kwa mfano, mtu anayejaribu (k.m., mkaguzi) anaweza kutumia angavu kutambua matukio makali ambayo chombo cha kupima kiotomatiki kinaweza kukosa.

## Upimaji wa kiotomatiki kwa mikataba-erevu {#automated-testing-for-smart-contracts}

### Upimaji wa vitengo {#unit-testing-for-smart-contracts}

Upimaji wa kitengo hutathmini utendaji kazi wa mkataba kando na hukagua kuwa kila sehemu inafanya kazi kwa usahihi. Majaribio mazuri ya vipimo yanapaswa kuwa rahisi, ya haraka na kutoa wazo wazi la nini kilienda vibaya ikiwa majaribio hayatafaulu.

Majaribio ya vipimo ni muhimu kwa kuangalia kuwa chaguo za kukokotoa hurejesha thamani zinazotarajiwa na kwamba hifadhi ya mkataba inaboreshashwa ipasavyo baada ya kutekeleza utendaji kazi. Zaidi ya hayo, kufanya majaribio ya kitengo baada ya kufanya mabadiliko kwa msingi wa mikataba huhakikisha kuongeza mantiki mpya hakuleti makosa. Hapa chini kuna miongozo ya kufanya upimaji wa vitengo kwa ufanisi:

#### Miongozo ya upimaji wa vitengo vya mikataba-erevu {#unit-testing-guidelines}

##### 1. Elewa mantiki ya biashara na mtiririko wa kazi wa mikataba yako

Kabla ya kuandika uthibitishaji wa vipimo, inasaidia kujua ni utendaji gani ambao mkataba mahiri hutoa na jinsi watumiaji watakavyofikia na kutumia vipengele hivyo. Hii ni muhimu hasa kwa kufanya [majaribio ya njia ya furaha](https://en.m.wikipedia.org/wiki/Happy_path) ambayo huamua kama utendakazi katika mkataba hurejesha matokeo sahihi kwa ingizo halali za watumiaji. Tutaeleza dhana hii kwa kutumia mfano huu (uliofupishwa) wa [mkataba wa mnada](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Huu ni mkataba rahisi wa mnada ulioundwa kupokea zabuni wakati wa kipindi cha kutoa zabuni. Ikiwa `highestBid` itaongezeka, mzabuni wa awali aliyetoa zabuni ya juu zaidi hupokea pesa zake; mara tu kipindi cha zabuni kinapoisha, `beneficiary` huita mkataba ili kupata pesa zake.

Upimaji wa vitengo kwa mkataba kama huu ungejumuisha utendakazi tofauti ambao mtumiaji anaweza kuita anapoingiliana na mkataba. Mfano ungekuwa upimaji wa kitengo unaoangalia ikiwa mtumiaji anaweza kuweka zabuni wakati mnada unaendelea (yaani, wito kwa `bid()` hufaulu) au unaoangalia ikiwa mtumiaji anaweza kuweka zabuni ya juu kuliko `highestBid` ya sasa.

Kuelewa mtiririko wa kazi wa utendaji wa mkataba pia husaidia katika kuandika upimaji wa vitengo unaoangalia ikiwa utekelezaji unakidhi mahitaji. Kwa mfano, mkataba wa mnada unabainisha kuwa watumiaji hawawezi kuweka zabuni wakati mnada umeisha (yaani, wakati `auctionEndTime` ni chini kuliko `block.timestamp`). Kwa hivyo, msanidi programu anaweza kufanya upimaji wa kitengo unaoangalia ikiwa wito kwa utendakazi wa `bid()` hufaulu au hushindwa wakati mnada umeisha (yaani, wakati `auctionEndTime` > `block.timestamp`).

##### 2. Tathmini dhana zote zinazohusiana na utekelezaji wa mkataba

Ni muhimu kuweka kumbukumbu ya dhana zozote kuhusu utekelezaji wa mkataba na kuandika upimaji wa vitengo ili kuthibitisha uhalali wa dhana hizo. Mbali na kutoa ulinzi dhidi ya utekelezaji usiotarajiwa, madai ya upimaji yanakulazimisha kufikiria juu ya shughuli ambazo zinaweza kuvunja mfumo wa usalama wa mkataba-erevu. Kidokezo muhimu ni kwenda mbali zaidi ya "majaribio ya mtumiaji mwenye furaha" na kuandika majaribio hasi yanayoangalia ikiwa utendakazi unashindwa kwa ingizo zisizo sahihi.

Mifumo mingi ya upimaji wa vitengo inakuruhusu kuunda madai—kauli rahisi zinazoeleza kile mkataba unaweza na hauwezi kufanya—na kufanya majaribio kuona ikiwa madai hayo yanadumu chini ya utekelezaji. Msanidi programu anayeshughulikia mkataba wa mnada ulioelezwa hapo awali anaweza kutoa madai yafuatayo kuhusu tabia yake kabla ya kufanya majaribio hasi:

- Watumiaji hawawezi kuweka zabuni wakati mnada umeisha au haujaanza.

- Mkataba wa mnada hurejea nyuma ikiwa zabuni iko chini ya kiwango kinachokubalika.

- Watumiaji wanaoshindwa kushinda zabuni hurejeshewa fedha zao

**Kumbuka**: Njia nyingine ya kupima dhana ni kuandika majaribio yanayoanzisha [virekebishaji vya utendakazi](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) katika mkataba, hasa kauli za `require`, `assert`, na `if…else`.

##### 3. Pima ufikiaji wa msimbo

[Ufikiaji wa msimbo](https://en.m.wikipedia.org/wiki/Code_coverage) ni kipimo cha upimaji kinachofuatilia idadi ya matawi, mistari, na kauli katika msimbo wako zilizotekelezwa wakati wa majaribio. Majaribio yanapaswa kuwa na ufikiaji mzuri wa msimbo ili kupunguza hatari ya udhaifu ambao haujapimwa. Bila ufikiaji wa kutosha, unaweza kudhani kimakosa kuwa mkataba wako ni salama kwa sababu majaribio yote yamefaulu, wakati udhaifu bado upo katika njia za msimbo ambazo hazijapimwa. Hata hivyo, kurekodi ufikiaji wa juu wa msimbo kunatoa uhakikisho kwamba kauli/utendakazi wote katika mkataba-erevu vilipimwa vya kutosha kwa usahihi.

##### 4. Tumia mifumo ya upimaji iliyoendelezwa vizuri

Ubora wa zana zinazotumika katika kufanya upimaji wa vitengo kwa mikataba-erevu yako ni muhimu sana. Mfumo bora wa upimaji ni ule unaotunzwa mara kwa mara; hutoa vipengele muhimu (k.m., uwezo wa kukata kumbukumbu na kutoa ripoti); na lazima uwe umetumiwa sana na kuchunguzwa na wasanidi programu wengine.

Mifumo ya upimaji wa vitengo kwa mikataba-erevu ya Solidity huja katika lugha tofauti (zaidi JavaScript, Python, na Rust). Angalia baadhi ya miongozo hapa chini kwa taarifa juu ya jinsi ya kuanza kufanya upimaji wa vitengo na mifumo tofauti ya upimaji:

- **[Kufanya upimaji wa vitengo na Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Kufanya upimaji wa vitengo na Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Kufanya upimaji wa vitengo na Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Kufanya upimaji wa vitengo na Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Kufanya upimaji wa vitengo na Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Kufanya upimaji wa vitengo na Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Kufanya upimaji wa vitengo na Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Upimaji wa ujumuishaji {#integration-testing-for-smart-contracts}

Wakati uthibitishaji wa vipimo hutatua kazi za mkataba kwa kutengwa, majaribio ya ujumuishaji hutathmini vipengele vya mkataba mahiri kwa ujumla. Jaribio la ujumuishaji linaweza kugundua matatizo yanayotokana na simu za mkataba mtambuka au mwingiliano kati ya utendakazi tofauti katika mkataba huo mahiri. Kwa mfano, majaribio ya ujumuishaji yanaweza kusaidia kuangalia kama mambo kama [urithi](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) na sindano ya utegemezi hufanya kazi ipasavyo.

Jaribio la ujumuishaji ni muhimu ikiwa mkataba wako utakubali usanifu wa kawaida au miingiliano na mikataba mingine ya onchain wakati wa utekelezaji. Njia moja ya kufanya majaribio ya ujumuishaji ni [kufanya uma mnyororo wa bloku](/glossary/#fork) katika urefu maalum (kwa kutumia zana kama [Forge](https://book.getfoundry.sh/forge/fork-testing) au [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) na kuiga mwingiliano kati ya mkataba wako na mikataba iliyopelekwa.

Kiambajengo kiliyogawanyika itafanya kazi sawa na Mainnet na kuwa na akaunti na majimbo na salio zinazohusiana. Lakini inafanya kazi tu kama mazingira ya maendeleo ya ndani yaliyowekwa mchanga, kumaanisha kuwa hutahitaji ETH halisi kwa shughuli, kwa mfano, wala mabadiliko yako hayataathiri itifaki halisi ya Ethereum.

### Upimaji unaozingatia sifa {#property-based-testing-for-smart-contracts}

Upimaji kulingana na mali ni mchakato wa kuangalia kama mkataba mzuri unakidhi baadhi ya mali iliyobainishwa. Sifa huthibitisha ukweli kuhusu tabia ya mkataba ambao unatarajiwa kubaki kuwa kweli katika hali tofauti-mfano wa mali mahiri ya mkataba unaweza kuwa "Shughuli za hesabu katika mkataba kamwe hazifuriki au hazifukiwi."

**Uchambuzi tuli** na **uchambuzi wa nguvu** ni mbinu mbili za kawaida za kutekeleza upimaji unaozingatia sifa, na zote mbili zinaweza kuthibitisha kuwa msimbo wa programu (mkataba-erevu katika kesi hii) unakidhi sifa fulani iliyoainishwa awali. Baadhi ya zana za kupima kulingana na mali huja na sheria zilizobainishwa mapema kuhusu sifa za mkataba zinazotarajiwa na kuangalia msimbo dhidi ya sheria hizo, huku zingine hukuruhusu kuunda sifa maalum kwa mkataba mzuri.

#### Uchambuzi tuli {#static-analysis}

Kichanganuzi tuli huchukua msimbo wa chanzo wa mkataba mahiri kama ingizo na matokeo ya matokeo yanayotangaza kama mkataba unakidhi mali au la. Tofauti na uchanganuzi unaobadilika, uchanganuzi tuli haujumuishi kutekeleza mkataba ili kuuchanganua kwa usahihi. Uchanganuzi thabiti badala yake unasababu kuhusu njia zote zinazowezekana ambazo mkataba mahiri unaweza kuchukua wakati wa utekelezaji (yaani, kwa kuchunguza muundo wa msimbo wa chanzo ili kubaini kitakachomaanisha kwa utendakazi wa mikataba wakati wa utekelezaji).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) na [upimaji tuli](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) ni mbinu za kawaida za kufanya uchambuzi tuli kwenye mikataba. Zote zinahitaji kuchanganua uwakilishi wa kiwango cha chini wa utekelezaji wa mikataba kama vile [miti ya sintaksia dhahania](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) na [grafu za mtiririko wa udhibiti](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) zinazotolewa na mkusanyaji.

Katika hali nyingi, uchanganuzi tuli ni muhimu kwa kugundua maswala ya usalama kama vile matumizi ya miundo isiyo salama, hitilafu za sintaksia, au ukiukaji wa viwango vya usimbaji katika msimbo wa mikataba. Hata hivyo, vichanganuzi tuli vinajulikana kwa ujumla kutokuwa sawa katika kugundua udhaifu mkubwa zaidi, na vinaweza kutoa chanya nyingi za uwongo.

#### Uchambuzi wa nguvu {#dynamic-analysis}

Uchambuzi wa nguvu hutoa ingizo za ishara (k.m., katika [utekelezaji wa ishara](https://en.m.wikipedia.org/wiki/Symbolic_execution)) au ingizo halisi (k.m., katika [fuzzing](https://owasp.org/www-community/Fuzzing)) kwa utendakazi wa mikataba-erevu ili kuona kama ufuatiliaji wowote wa utekelezaji unakiuka sifa maalum. Aina hii ya majaribio kulingana na mali hutofautiana na majaribio ya kitengo kwa kuwa kesi za majaribio hushughulikia hali nyingi na mpango hushughulikia uzalishaji wa kesi za majaribio.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) ni mfano wa mbinu ya uchambuzi wa nguvu ya kuthibitisha sifa za kiholela katika mikataba-erevu. Fuzzer huomba utendakazi katika mkataba lengwa na tofauti za nasibu au zisizo na hitilafu za thamani iliyobainishwa ya ingizo. Iwapo mkataba mahiri utaingia katika hali ya hitilafu (k.m., ambapo madai hayatafaulu), tatizo hualamishwa na michango ambayo husababisha utekelezaji kuelekea njia hatarishi hutolewa katika ripoti.

Fuzzing ni muhimu kwa kutathmini utaratibu mzuri wa uthibitishaji wa pembejeo za mikataba kwa kuwa utunzaji usiofaa wa pembejeo zisizotarajiwa kunaweza kusababisha utekelezaji usiotarajiwa na kutoa athari hatari. Aina hii ya upimaji unaozingatia sifa inaweza kuwa bora kwa sababu nyingi:

1. **Kuandika kesi za majaribio kufunika hali nyingi ni ngumu.** Jaribio la sifa linahitaji tu uainishe tabia na anuwai ya data ili kujaribu tabia hiyo—programu huunda kesi za majaribio kiotomatiki kulingana na sifa iliyoainishwa.

2. **Seti yako ya majaribio haiwezi kufunika vya kutosha njia zote zinazowezekana ndani ya programu.** Hata kwa ufikiaji wa 100%, inawezekana kukosa kesi za pembezoni.

3. **Upimaji wa vitengo huthibitisha kuwa mkataba unatekelezwa kwa usahihi kwa data ya sampuli, lakini kama mkataba utatekelezwa kwa usahihi kwa ingizo nje ya sampuli bado haijulikani.** Majaribio ya sifa hutekeleza mkataba lengwa na tofauti nyingi za thamani ya ingizo ili kupata athari za utekelezaji zinazosababisha kushindwa kwa madai. Kwa hivyo, jaribio la mali hutoa hakikisho zaidi kwamba mkataba hutekelezwa kwa usahihi kwa darasa pana la data ya ingizo.

### Miongozo ya kufanya upimaji unaozingatia sifa kwa mikataba-erevu {#running-property-based-tests}

Kufanya upimaji unaozingatia sifa kwa kawaida huanza kwa kufafanua sifa (k.m., kutokuwepo kwa [mafuriko ya nambari kamili](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) au mkusanyiko wa sifa ambazo unataka kuthibitisha katika mkataba-erevu. Unaweza pia kuhitaji kufafanua safu ya thamani ambazo programu inaweza kutoa data ya pembejeo za miamala wakati wa kuandika majaribio ya mali.

Baada ya kupangwa ipasavyo, zana ya kupima mali itatekeleza utendakazi wako wa mikataba mahiri kwa ingizo zinazozalishwa bila mpangilio. Iwapo kuna ukiukaji wowote wa madai, unapaswa kupata ripoti iliyo na data thabiti ya ingizo ambayo inakiuka mali inayotathminiwa. Tazama baadhi ya miongozo hapa chini ili kuanza na kuendesha majaribio ya msingi wa mali kwa zana tofauti:

- **[Uchambuzi tuli wa mikataba-erevu na Slither](https://github.com/crytic/slither)**
- **[Uchambuzi tuli wa mikataba-erevu na Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Upimaji unaozingatia sifa na Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Kufanya fuzzing kwenye mikataba na Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Kufanya fuzzing kwenye mikataba na Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Kufanya fuzzing kwenye mikataba na Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Utekelezaji wa ishara wa mikataba-erevu na Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Utekelezaji wa ishara wa mikataba-erevu na Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Upimaji wa mikono kwa mikataba-erevu {#manual-testing-for-smart-contracts}

Upimaji wa mikono wa mikataba-erevu mara nyingi huja baadaye katika mzunguko wa maendeleo baada ya kufanya majaribio ya kiotomatiki. Aina hii ya upimaji hutathmini mkataba-erevu kama bidhaa moja iliyojumuishwa kikamilifu ili kuona ikiwa inafanya kazi kama ilivyoainishwa katika mahitaji ya kiufundi.

### Kupima mikataba kwenye mnyororo wa bloku wa ndani {#testing-on-local-blockchain}

Ingawa upimaji wa kiotomatiki unaofanywa katika mazingira ya maendeleo ya ndani unaweza kutoa taarifa muhimu za utatuzi, utataka kujua jinsi mkataba-erevu wako unavyofanya kazi katika mazingira ya uzalishaji. Hata hivyo, kupeleka kwenye mnyororo mkuu wa Ethereum kunasababisha ada za gesi—bila kusahau kwamba wewe au watumiaji wako mnaweza kupoteza pesa halisi ikiwa mkataba-erevu wako bado una hitilafu.

Kupima mkataba wako kwenye mnyororo wa bloku wa ndani (pia unajulikana kama [mtandao wa maendeleo](/developers/docs/development-networks/)) ni mbadala unaopendekezwa badala ya kupima kwenye Mtandao Mkuu. Mnyororo wa bloku wa ndani ni nakala ya mnyororo wa bloku wa Ethereum unaoendeshwa ndani ya kompyuta yako ambao unaiga tabia ya safu ya utekelezaji ya Ethereum. Kwa hivyo, unaweza kupanga miamala ili kuingiliana na mkataba bila kupata gharama kubwa.

Kuendesha mikataba kwenye mnyororo wa bloku wa ndani kunaweza kuwa muhimu kama aina ya upimaji wa ujumuishaji wa mikono. [Mikataba-erevu inaweza kutungwa kwa urahisi sana](/developers/docs/smart-contracts/composability/), ikikuruhusu kujumuika na itifaki zilizopo—lakini bado utahitaji kuhakikisha kuwa mwingiliano huo changamano wa kwenye mnyororo unatoa matokeo sahihi.

[Zaidi kuhusu mitandao ya maendeleo.](/developers/docs/development-networks/)

### Kupima mikataba kwenye testnet {#testing-contracts-on-testnets}

Mtandao wa majaribio au testnet hufanya kazi sawa kabisa na Mtandao Mkuu wa Ethereum, isipokuwa kwamba hutumia ether (ETH) isiyo na thamani ya ulimwengu halisi. Kupeleka mkataba wako kwenye [testnet](/developers/docs/networks/#ethereum-testnets) kunamaanisha mtu yeyote anaweza kuingiliana nao (k.m., kupitia sehemu ya mbele ya mfumo mtawanyo wa kimamlaka) bila kuweka fedha hatarini.

Aina hii ya upimaji wa mikono ni muhimu kwa kutathmini mtiririko wa mwisho-hadi-mwisho wa programu yako kutoka kwa mtazamo wa mtumiaji. Hapa, wajaribu wa beta wanaweza pia kufanya majaribio na kuripoti masuala yoyote na mantiki ya biashara ya mkataba na utendakazi wa jumla.

Kupeleka kwenye testnet baada ya kupima kwenye mnyororo wa bloku wa ndani ni bora kwani ya kwanza iko karibu zaidi na tabia ya mashine halisi ya ethereum. Kwa hivyo, ni kawaida kwa miradi mingi ya asili ya Ethereum kupeleka mfumo mtawanyo wa kimamlaka kwenye testnet kutathmini utendaji wa mkataba-erevu chini ya hali za ulimwengu halisi.

[Zaidi kuhusu testnet za Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Upimaji dhidi ya uthibitishaji rasmi {#testing-vs-formal-verification}

Ingawa upimaji husaidia kuthibitisha kuwa mkataba unarudisha matokeo yanayotarajiwa kwa baadhi ya ingizo za data, hauwezi kuthibitisha kwa uhakika vivyo hivyo kwa ingizo ambazo hazikutumika wakati wa majaribio. Kupima mkataba-erevu, kwa hivyo, hakuwezi kuhakikisha "usahihi wa kiutendaji" (yaani, hakuwezi kuonyesha kwamba programu inafanya kazi kama inavyotakiwa kwa seti _zote_ za thamani za ingizo).

Uthibitishaji rasmi ni mbinu ya kutathmini usahihi wa programu kwa kuangalia kama mfumo rasmi wa programu unalingana na vipimo rasmi. Mfumo rasmi ni uwakilishi dhahania wa kihisabati wa programu, wakati vipimo rasmi vinafafanua sifa za programu (yaani, madai ya kimantiki kuhusu utekelezaji wa programu).

Kwa sababu sifa zimeandikwa kwa maneno ya kihisabati, inawezekana kuthibitisha kuwa mfumo rasmi (wa kihisabati) wa mfumo unakidhi vipimo kwa kutumia kanuni za kimantiki za kuhitimisha. Kwa hivyo, zana za uthibitishaji rasmi zinasemekana kutoa 'uthibitisho wa kihisabati' wa usahihi wa mfumo.

Tofauti na upimaji, uthibitishaji rasmi unaweza kutumika kuthibitisha utekelezaji wa mkataba-erevu unakidhi vipimo rasmi kwa utekelezaji _wote_ (yaani, hauna hitilafu) bila kuhitaji kuutekeleza kwa data ya sampuli. Hii haipunguzi tu muda unaotumika kufanya majaribio kadhaa ya vitengo, lakini pia ni bora zaidi katika kugundua udhaifu uliofichwa. Hata hivyo, mbinu za uthibitishaji rasmi ziko kwenye wigo kulingana na ugumu wao wa utekelezaji na manufaa.

[Zaidi kuhusu uthibitishaji rasmi wa mikataba-erevu.](/developers/docs/smart-contracts/formal-verification)

## Upimaji dhidi ya ukaguzi na zawadi za hitilafu {#testing-vs-audits-bug-bounties}

Kama ilivyoelezwa, upimaji mkali mara chache unaweza kuhakikisha kutokuwepo kwa hitilafu katika mkataba; mbinu za uthibitishaji rasmi zinaweza kutoa uhakikisho wenye nguvu zaidi wa usahihi lakini kwa sasa ni ngumu kutumia na zinahusisha gharama kubwa.

Bado, unaweza kuongeza zaidi uwezekano wa kugundua udhaifu wa mkataba kwa kupata ukaguzi huru wa msimbo. [Ukaguzi wa mikataba-erevu](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) na [zawadi za hitilafu](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) ni njia mbili za kuwafanya wengine wachanganue mikataba yako.

Ukaguzi hufanywa na wakaguzi wenye uzoefu katika kutafuta kesi za dosari za usalama na mazoea duni ya maendeleo katika kandarasi mahiri. Ukaguzi kwa kawaida utajumuisha majaribio (na ikiwezekana uthibitishaji rasmi) pamoja na uhakiki wa mwongozo wa msingi wote wa msimbo.

Kinyume chake, programu ya zawadi ya hitilafu kwa kawaida huhusisha kutoa zawadi ya kifedha kwa mtu binafsi (anayejulikana kama [wadukuzi wa kofia nyeupe](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) anayegundua udhaifu katika mkataba-erevu na kuufichua kwa wasanidi programu. Fadhila za kosa ni sawa na ukaguzi kwa vile unahusisha kuwauliza wengine kusaidia kupata kasoro katika mikataba mahiri.

Tofauti kuu ni kwamba programu za fadhila za kosa ziko wazi kwa jumuiya pana ya wasanifu/wadukuzi na kuvutia tabaka pana la wavamizi wa maadili na wataalamu huru wa usalama walio na ujuzi na uzoefu wa kipekee. Hii inaweza kuwa faida zaidi ya ukaguzi mzuri wa mikataba ambayo inategemea sana timu ambazo zinaweza kuwa na utaalamu mdogo au finyu.

## Zana na maktaba za upimaji {#testing-tools-and-libraries}

### Zana za upimaji wa vitengo {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Zana ya kufunika msimbo kwa mikataba-erevu iliyoandikwa katika Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Mfumo wa maendeleo ya hali ya juu ya mkataba-erevu na upimaji (kwa kuzingatia ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Zana ya kupima mikataba-erevu ya Solidity. Hufanya kazi chini ya programu-jalizi ya Remix IDE "Solidity Unit Testing" ambayo hutumika kuandika na kuendesha kesi za majaribio kwa mkataba._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Maktaba ya madai kwa ajili ya upimaji wa mkataba-erevu wa Ethereum. Hakikisha mikataba yako inafanya kazi kama inavyotarajiwa!_

- **[Mfumo wa upimaji wa kitengo wa Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie hutumia Pytest, mfumo wa majaribio wenye vipengele vingi unaokuruhusu kuandika majaribio madogo na msimbo mdogo, unaongezeka vizuri kwa miradi mikubwa, na unaweza kupanuliwa sana._

- **[Majaribio ya Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry inatoa Forge, mfumo wa upimaji wa haraka na rahisi wa Ethereum unaoweza kutekeleza upimaji rahisi wa vitengo, ukaguzi wa uboreshaji wa gesi, na ufanyaji wa fuzzing kwenye mikataba._

- **[Majaribio ya Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Mfumo wa kupima mikataba-erevu unaozingatia ethers.js, Mocha, na Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Mfumo wa maendeleo na upimaji unaotegemea Python kwa mikataba-erevu unaolenga mashine halisi ya ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Mfumo unaotegemea Python kwa upimaji wa vitengo na fuzzing na uwezo mkubwa wa utatuzi na usaidizi wa upimaji wa minyororo mbalimbali, ukitumia pytest na Anvil kwa uzoefu bora wa mtumiaji na utendakazi._

### Zana za upimaji unaozingatia sifa {#property-based-testing-tools}

#### Zana za uchambuzi tuli {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Mfumo wa uchambuzi tuli wa Solidity unaotegemea Python wa kupata udhaifu, kuboresha uelewa wa msimbo, na kuandika uchambuzi maalum wa mikataba-erevu._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter ya kutekeleza mtindo na mbinu bora za usalama kwa lugha ya programu ya mkataba-erevu ya Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Kichanganuzi tuli chenye msingi wa Rust kilichoundwa mahsusi kwa usalama na maendeleo ya mkataba-erevu wa Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Mfumo wa uchambuzi tuli unaotegemea Python na vigunduzi vya udhaifu na ubora wa msimbo, vichapishi vya kutoa taarifa muhimu kutoka kwa msimbo na usaidizi wa kuandika moduli ndogo maalum._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Linter rahisi na yenye nguvu kwa Solidity._

#### Zana za uchambuzi wa nguvu {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer ya mikataba ya haraka ya kugundua udhaifu katika mikataba-erevu kupitia upimaji unaozingatia sifa._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Zana ya kiotomatiki ya fuzzing inayofaa kugundua ukiukaji wa sifa katika msimbo wa mkataba-erevu._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Mfumo wa utekelezaji wa ishara wa nguvu wa kuchambua bytecode ya EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Zana ya tathmini ya bytecode ya EVM ya kugundua udhaifu wa mkataba kwa kutumia uchambuzi wa doa, uchambuzi wa concolic, na ukaguzi wa mtiririko wa udhibiti._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble ni lugha ya vipimo na zana ya uthibitishaji wakati wa utekelezaji inayokuruhusu kufafanua mikataba-erevu na sifa zinazokuwezesha kupima mikataba kiotomatiki na zana kama vile Diligence Fuzzing au MythX._

## Mafunzo yanayohusiana {#related-tutorials}

- [Muhtasari na ulinganisho wa bidhaa tofauti za upimaji](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jinsi ya kutumia Echidna kupima mikataba-erevu](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jinsi ya kutumia Manticore kupata mende za mkataba-erevu](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jinsi ya kutumia Slither kupata mende za mkataba-erevu](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jinsi ya kuiga mikataba ya Solidity kwa ajili ya upimaji](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jinsi ya kufanya upimaji wa vitengo katika Solidity kwa kutumia Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Masomo zaidi {#further-reading}

- [Mwongozo wa kina wa kupima mikataba-erevu ya Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jinsi ya kupima mikataba-erevu ya Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Mwongozo wa MolochDAO wa upimaji wa vitengo kwa wasanidi programu](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jinsi ya kupima mikataba-erevu kama nyota wa rock](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
