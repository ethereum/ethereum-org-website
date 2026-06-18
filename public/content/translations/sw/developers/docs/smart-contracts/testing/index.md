---
title: Kujaribu mikataba mahiri
description: Muhtasari wa mbinu na mambo ya kuzingatia katika kujaribu mikataba mahiri ya Ethereum.
lang: sw
---

Minyororo ya vitalu ya umma kama Ethereum ni isiyobadilika, na kufanya iwe vigumu kubadilisha msimbo wa mikataba mahiri baada ya usambazaji. [Miundo ya kuboresha mkataba](/developers/docs/smart-contracts/upgrading/) kwa ajili ya kufanya "maboresho ya mtandaoni" ipo, lakini ni vigumu kuitekeleza na inahitaji mwafaka wa kijamii. Zaidi ya hayo, uboreshaji unaweza tu kurekebisha kosa _baada_ ya kugunduliwa—ikiwa mshambuliaji atagundua udhaifu kwanza, mkataba wako mahiri uko katika hatari ya kutumiwa vibaya.

Kwa sababu hizi, kujaribu mikataba mahiri kabla ya [kusambaza](/developers/docs/smart-contracts/deploying/) kwenye Mtandao Mkuu ni hitaji la chini kabisa kwa [usalama](/developers/docs/smart-contracts/security/). Kuna mbinu nyingi za kujaribu mikataba na kutathmini usahihi wa msimbo; unachochagua kinategemea mahitaji yako. Hata hivyo, mkusanyiko wa majaribio unaoundwa na zana na mbinu tofauti ni bora kwa kunasa dosari ndogo na kubwa za usalama katika msimbo wa mkataba.

## Mahitaji ya awali {#prerequisites}

Ukurasa huu unaeleza jinsi ya kujaribu mikataba mahiri kabla ya kusambaza kwenye mtandao wa Ethereum. Inachukulia kuwa unafahamu [mikataba mahiri](/developers/docs/smart-contracts/).

## Kujaribu mkataba mahiri ni nini? {#what-is-smart-contract-testing}

Kujaribu mkataba mahiri ni mchakato wa kuthibitisha kuwa msimbo wa mkataba mahiri unafanya kazi kama inavyotarajiwa. Kujaribu ni muhimu kwa kuangalia ikiwa mkataba mahiri fulani unakidhi mahitaji ya kutegemewa, utumiaji, na usalama.

Ingawa mbinu zinatofautiana, mbinu nyingi za majaribio zinahitaji kutekeleza mkataba mahiri na sampuli ndogo ya data inayotarajiwa kushughulikia. Ikiwa mkataba unatoa matokeo sahihi kwa data ya sampuli, inachukuliwa kuwa inafanya kazi vizuri. Zana nyingi za majaribio hutoa rasilimali za kuandika na kutekeleza [matukio ya majaribio](https://en.m.wikipedia.org/wiki/Test_case) ili kuangalia ikiwa utekelezaji wa mkataba unalingana na matokeo yanayotarajiwa.

### Kwa nini ni muhimu kujaribu mikataba mahiri? {#importance-of-testing-smart-contracts}

Kwa kuwa mikataba mahiri mara nyingi husimamia mali za kifedha zenye thamani kubwa, makosa madogo ya upangaji programu yanaweza na mara nyingi husababisha [hasara kubwa kwa watumiaji](https://rekt.news/leaderboard/). Majaribio makali yanaweza, hata hivyo, kukusaidia kugundua kasoro na masuala katika msimbo wa mkataba mahiri mapema na kuyarekebisha kabla ya kuzindua kwenye Mtandao Mkuu.

Ingawa inawezekana kuboresha mkataba ikiwa hitilafu itagunduliwa, maboresho ni magumu na yanaweza [kusababisha makosa](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) yakishughulikiwa isivyofaa. Kuboresha mkataba kunapingana zaidi na kanuni ya kutobadilika na kuwapa watumiaji mzigo wa dhana za uaminifu za ziada. Kinyume chake, mpango wa kina wa kujaribu mkataba wako unapunguza hatari za usalama za mkataba mahiri na kupunguza hitaji la kufanya maboresho magumu ya kimantiki baada ya kusambaza.

## Mbinu za kujaribu mikataba mahiri {#methods-for-testing-smart-contracts}

Mbinu za kujaribu mikataba mahiri ya Ethereum ziko chini ya makundi mawili mapana: **majaribio ya kiotomatiki** na **majaribio ya mikono**. Majaribio ya kiotomatiki na majaribio ya mikono hutoa faida na hasara za kipekee, lakini unaweza kuchanganya zote mbili ili kuunda mpango thabiti wa kuchanganua mikataba yako.

### Majaribio ya kiotomatiki {#automated-testing}

Majaribio ya kiotomatiki hutumia zana ambazo huangalia kiotomatiki msimbo wa mkataba mahiri kwa makosa katika utekelezaji. Faida ya majaribio ya kiotomatiki inatokana na kutumia [hati](https://www.techtarget.com/whatis/definition/script?amp=1) kuongoza tathmini ya utendaji wa mkataba. Majaribio yaliyoandikwa yanaweza kupangwa kufanya kazi mara kwa mara kwa uingiliaji mdogo wa binadamu, na kufanya majaribio ya kiotomatiki kuwa na ufanisi zaidi kuliko mbinu za majaribio za mikono.

Majaribio ya kiotomatiki ni muhimu sana wakati majaribio yanajirudia na kuchukua muda mwingi; ni magumu kufanya kwa mikono; yanaweza kuwa na makosa ya kibinadamu; au yanahusisha kutathmini utendaji muhimu wa mkataba. Lakini zana za majaribio za kiotomatiki zinaweza kuwa na mapungufu—zinaweza kukosa hitilafu fulani na kutoa [chanya za uongo](https://www.contrastsecurity.com/glossary/false-positive) nyingi. Kwa hivyo, kuoanisha majaribio ya kiotomatiki na majaribio ya mikono kwa mikataba mahiri ni bora.

### Majaribio ya mikono {#manual-testing}

Majaribio ya mikono yanasaidiwa na binadamu na yanahusisha kutekeleza kila tukio la jaribio katika mkusanyiko wako wa majaribio moja baada ya jingine wakati wa kuchanganua usahihi wa mkataba mahiri. Hii ni tofauti na majaribio ya kiotomatiki ambapo unaweza kuendesha majaribio mengi yaliyotengwa kwa wakati mmoja kwenye mkataba na kupata ripoti inayoonyesha majaribio yote yaliyofeli na kufaulu.

Majaribio ya mikono yanaweza kufanywa na mtu mmoja kufuatia mpango wa majaribio ulioandikwa ambao unashughulikia matukio tofauti ya majaribio. Unaweza pia kuwa na watu au vikundi vingi vinavyoingiliana na mkataba mahiri kwa kipindi maalum kama sehemu ya majaribio ya mikono. Wajaribu watalinganisha tabia halisi ya mkataba dhidi ya tabia inayotarajiwa, na kuashiria tofauti yoyote kama hitilafu.

Majaribio ya mikono yenye ufanisi yanahitaji rasilimali nyingi (ujuzi, muda, pesa, na juhudi), na inawezekana—kwa sababu ya makosa ya kibinadamu—kukosa makosa fulani wakati wa kutekeleza majaribio. Lakini majaribio ya mikono yanaweza pia kuwa na faida—kwa mfano, mjaribu wa kibinadamu (k.m., mkaguzi) anaweza kutumia angalizo kugundua matukio ya ukingoni ambayo zana ya majaribio ya kiotomatiki ingekosa.

## Majaribio ya kiotomatiki kwa mikataba mahiri {#automated-testing-for-smart-contracts}

### Majaribio ya kitengo {#unit-testing-for-smart-contracts}

Majaribio ya kitengo hutathmini utendaji wa mkataba kando na kuangalia kuwa kila kijenzi kinafanya kazi kwa usahihi. Majaribio mazuri ya kitengo yanapaswa kuwa rahisi, ya haraka kuendesha na kutoa wazo wazi la nini kilienda vibaya ikiwa majaribio yatafeli.

Majaribio ya kitengo ni muhimu kwa kuangalia kuwa utendaji unarudisha thamani zinazotarajiwa na kwamba hifadhi ya mkataba inasasishwa vizuri baada ya utekelezaji wa utendaji. Zaidi ya hayo, kuendesha majaribio ya kitengo baada ya kufanya mabadiliko kwenye msimbo wa mkataba kunahakikisha kuongeza mantiki mpya hakuleti makosa. Hapa chini kuna baadhi ya miongozo ya kuendesha majaribio ya kitengo yenye ufanisi:

#### Miongozo ya majaribio ya kitengo ya mikataba mahiri {#unit-testing-guidelines}

##### 1. Elewa mantiki ya biashara ya mkataba wako na mtiririko wa kazi {#integration-testing-for-smart-contracts}

Kabla ya kuandika majaribio ya kitengo, inasaidia kujua ni utendaji gani mkataba mahiri unatoa na jinsi watumiaji watafikia na kutumia utendaji huo. Hii ni muhimu sana kwa kuendesha [majaribio ya njia yenye furaha](https://en.m.wikipedia.org/wiki/Happy_path) ambayo huamua ikiwa utendaji katika mkataba unarudisha matokeo sahihi kwa ingizo halali la mtumiaji. Tutaelezea dhana hii kwa kutumia mfano huu (uliofupishwa) wa [mkataba wa mnada](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Huu ni mkataba rahisi wa mnada ulioundwa kupokea zabuni wakati wa kipindi cha zabuni. Ikiwa `highestBid` itaongezeka, mzabuni wa juu zaidi wa awali anapokea pesa zake; mara tu kipindi cha zabuni kinapoisha, `beneficiary` huita mkataba ili kupata pesa zao.

Majaribio ya kitengo kwa mkataba kama huu yatashughulikia utendaji tofauti ambao mtumiaji anaweza kuita wakati wa kuingiliana na mkataba. Mfano utakuwa jaribio la kitengo ambalo huangalia ikiwa mtumiaji anaweza kuweka zabuni wakati mnada unaendelea (yaani, wito kwa `bid()` unafanikiwa) au lile linaloangalia ikiwa mtumiaji anaweza kuweka zabuni ya juu kuliko `highestBid` ya sasa.

Kuelewa mtiririko wa kazi wa uendeshaji wa mkataba pia husaidia katika kuandika majaribio ya kitengo ambayo huangalia ikiwa utekelezaji unakidhi mahitaji. Kwa mfano, mkataba wa mnada unabainisha kuwa watumiaji hawawezi kuweka zabuni wakati mnada umekwisha (yaani, wakati `auctionEndTime` iko chini ya `block.timestamp`). Kwa hivyo, msanidi programu anaweza kuendesha jaribio la kitengo ambalo huangalia ikiwa wito kwa utendaji wa `bid()` unafanikiwa au kufeli wakati mnada umekwisha (yaani, wakati `auctionEndTime` > `block.timestamp`).

##### 2. Tathmini dhana zote zinazohusiana na utekelezaji wa mkataba {#property-based-testing-for-smart-contracts}

Ni muhimu kuandika dhana zozote kuhusu utekelezaji wa mkataba na kuandika majaribio ya kitengo ili kuthibitisha uhalali wa dhana hizo. Mbali na kutoa ulinzi dhidi ya utekelezaji usiotarajiwa, kujaribu madai kunakulazimisha kufikiria kuhusu shughuli zinazoweza kuvunja muundo wa usalama wa mkataba mahiri. Kidokezo muhimu ni kwenda zaidi ya "majaribio ya mtumiaji mwenye furaha" na kuandika majaribio hasi ambayo huangalia ikiwa utendaji unafeli kwa ingizo zisizo sahihi.

Mifumo mingi ya majaribio ya kitengo inakuruhusu kuunda madai—kauli rahisi zinazoeleza kile mkataba unaweza na hauwezi kufanya—na kuendesha majaribio ili kuona ikiwa madai hayo yanashikilia chini ya utekelezaji. Msanidi programu anayefanya kazi kwenye mkataba wa mnada ulioelezwa hapo awali anaweza kutoa madai yafuatayo kuhusu tabia yake kabla ya kuendesha majaribio hasi:

- Watumiaji hawawezi kuweka zabuni wakati mnada umekwisha au haujaanza.

- Mkataba wa mnada unarudi nyuma ikiwa zabuni iko chini ya kiwango kinachokubalika.

- Watumiaji wanaoshindwa kushinda zabuni wanawekewa fedha zao

**Kumbuka**: Njia nyingine ya kujaribu dhana ni kuandika majaribio ambayo huchochea [virekebishaji vya utendaji](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) katika mkataba, hasa kauli za `require`, `assert`, na `if…else`.

##### 3. Pima ufunikaji wa msimbo {#static-analysis}

[Ufunikaji wa msimbo](https://en.m.wikipedia.org/wiki/Code_coverage) ni kipimo cha majaribio ambacho hufuatilia idadi ya matawi, mistari, na kauli katika msimbo wako zilizotekelezwa wakati wa majaribio. Majaribio yanapaswa kuwa na ufunikaji mzuri wa msimbo ili kupunguza hatari ya udhaifu ambao haujajaribiwa. Bila ufunikaji wa kutosha, unaweza kudhani kimakosa kuwa mkataba wako uko salama kwa sababu majaribio yote yanafaulu, wakati udhaifu bado upo katika njia za msimbo ambazo hazijajaribiwa. Kurekodi ufunikaji wa juu wa msimbo, hata hivyo, kunatoa hakikisho kuwa kauli/utendaji wote katika mkataba mahiri ulijaribiwa vya kutosha kwa usahihi.

##### 4. Tumia mifumo ya majaribio iliyotengenezwa vizuri {#dynamic-analysis}

Ubora wa zana zinazotumiwa katika kuendesha majaribio ya kitengo kwa mikataba yako mahiri ni muhimu. Mfumo bora wa majaribio ni ule unaodumishwa mara kwa mara; hutoa vipengele muhimu (k.m., uwezo wa kuweka kumbukumbu na kuripoti); na lazima uwe umetumiwa sana na kuhakikiwa na wasanidi programu wengine.

Mifumo ya majaribio ya kitengo kwa mikataba mahiri ya Solidity inakuja katika lugha tofauti (hasa JavaScript, Python, na Rust). Tazama baadhi ya miongozo hapa chini kwa maelezo kuhusu jinsi ya kuanza kuendesha majaribio ya kitengo na mifumo tofauti ya majaribio:

- **[Kuendesha majaribio ya kitengo na Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Kuendesha majaribio ya kitengo na Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Kuendesha majaribio ya kitengo na Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Kuendesha majaribio ya kitengo na Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Kuendesha majaribio ya kitengo na Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Kuendesha majaribio ya kitengo na Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Kuendesha majaribio ya kitengo na Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Majaribio ya ujumuishaji {#running-property-based-tests}

Wakati majaribio ya kitengo yanatatua utendaji wa mkataba kwa kutengwa, majaribio ya ujumuishaji hutathmini vijenzi vya mkataba mahiri kwa ujumla. Majaribio ya ujumuishaji yanaweza kugundua masuala yanayotokana na wito wa mikataba tofauti au mwingiliano kati ya utendaji tofauti katika mkataba mahiri huo huo. Kwa mfano, majaribio ya ujumuishaji yanaweza kusaidia kuangalia ikiwa mambo kama [urithi](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) na uingizaji wa utegemezi yanafanya kazi vizuri.

Majaribio ya ujumuishaji ni muhimu ikiwa mkataba wako unachukua usanifu wa kawaida au unaingiliana na mikataba mingine mnyororoni wakati wa utekelezaji. Njia moja ya kuendesha majaribio ya ujumuishaji ni [kuchepusha mnyororo wa vitalu](/glossary/#fork) kwa urefu maalum (kwa kutumia zana kama [Forge](https://book.getfoundry.sh/forge/fork-testing) au [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) na kuiga mwingiliano kati ya mkataba wako na mikataba iliyosambazwa.

Mnyororo wa vitalu uliochepushwa utafanya kazi sawa na Mtandao Mkuu na kuwa na akaunti zilizo na hali na salio zinazohusiana. Lakini inafanya kazi tu kama mazingira ya maendeleo ya ndani yaliyotengwa, ikimaanisha hutahitaji ETH halisi kwa miamala, kwa mfano, wala mabadiliko yako hayataathiri itifaki halisi ya Ethereum.

### Majaribio kulingana na sifa {#manual-testing-for-smart-contracts}

Majaribio kulingana na sifa ni mchakato wa kuangalia kuwa mkataba mahiri unakidhi sifa fulani iliyofafanuliwa. Sifa zinathibitisha ukweli kuhusu tabia ya mkataba ambayo inatarajiwa kubaki kweli katika matukio tofauti—mfano wa sifa ya mkataba mahiri inaweza kuwa "Shughuli za hesabu katika mkataba hazipati mzidio au upungufu kamwe."

**Uchanganuzi tuli** na **uchanganuzi thabiti** ni mbinu mbili za kawaida za kutekeleza majaribio kulingana na sifa, na zote mbili zinaweza kuthibitisha kuwa msimbo wa programu (mkataba mahiri katika kesi hii) unakidhi sifa fulani iliyofafanuliwa awali. Baadhi ya zana za majaribio kulingana na sifa huja na sheria zilizofafanuliwa awali kuhusu sifa zinazotarajiwa za mkataba na kuangalia msimbo dhidi ya sheria hizo, wakati zingine zinakuruhusu kuunda sifa maalum kwa mkataba mahiri.

#### Uchanganuzi tuli {#testing-on-local-blockchain}

Kichanganuzi tuli huchukua kama ingizo msimbo wa chanzo wa mkataba mahiri na kutoa matokeo yanayotangaza ikiwa mkataba unakidhi sifa au la. Tofauti na uchanganuzi thabiti, uchanganuzi tuli hauhusishi kutekeleza mkataba ili kuuchanganua kwa usahihi. Badala yake, uchanganuzi tuli hufikiri kuhusu njia zote zinazowezekana ambazo mkataba mahiri unaweza kuchukua wakati wa utekelezaji (yaani, kwa kuchunguza muundo wa msimbo wa chanzo ili kubaini itamaanisha nini kwa uendeshaji wa mkataba wakati wa utekelezaji).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) na [majaribio tuli](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) ni mbinu za kawaida za kuendesha uchanganuzi tuli kwenye mikataba. Zote mbili zinahitaji kuchanganua uwakilishi wa kiwango cha chini wa utekelezaji wa mkataba kama vile [miti ya sintaksia dhahania](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) na [grafu za mtiririko wa udhibiti](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) zinazotolewa na kikusanyaji.

Katika hali nyingi, uchanganuzi tuli ni muhimu kwa kugundua masuala ya usalama kama vile matumizi ya miundo isiyo salama, makosa ya sintaksia, au ukiukaji wa viwango vya usimbaji katika msimbo wa mkataba. Hata hivyo, vichanganuzi tuli vinajulikana kuwa kwa ujumla si thabiti katika kugundua udhaifu wa kina, na vinaweza kutoa chanya za uongo nyingi kupita kiasi.

#### Uchanganuzi thabiti {#testing-contracts-on-testnets}

Uchanganuzi thabiti huzalisha ingizo za kiishara (k.m., katika [utekelezaji wa kiishara](https://en.m.wikipedia.org/wiki/Symbolic_execution)) au ingizo halisi (k.m., katika [fuzzing](https://owasp.org/www-community/Fuzzing)) kwa utendaji wa mkataba mahiri ili kuona ikiwa ufuatiliaji wowote wa utekelezaji unakiuka sifa maalum. Aina hii ya majaribio kulingana na sifa inatofautiana na majaribio ya kitengo kwa kuwa matukio ya majaribio yanashughulikia matukio mengi na programu inashughulikia uzalishaji wa matukio ya majaribio.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) ni mfano wa mbinu ya uchanganuzi thabiti ya kuthibitisha sifa za kiholela katika mikataba mahiri. Fuzzer huita utendaji katika mkataba lengwa na tofauti za nasibu au zilizoharibika za thamani ya ingizo iliyofafanuliwa. Ikiwa mkataba mahiri unaingia katika hali ya kosa (k.m., ambapo dai linafeli), tatizo linaashiriwa na ingizo zinazoendesha utekelezaji kuelekea njia dhaifu zinatolewa katika ripoti.

Fuzzing ni muhimu kwa kutathmini utaratibu wa uthibitishaji wa ingizo wa mkataba mahiri kwa kuwa ushughulikiaji usiofaa wa ingizo zisizotarajiwa unaweza kusababisha utekelezaji usiotarajiwa na kutoa athari hatari. Aina hii ya majaribio kulingana na sifa inaweza kuwa bora kwa sababu nyingi:

1. **Kuandika matukio ya majaribio ili kushughulikia matukio mengi ni vigumu.** Jaribio la sifa linahitaji tu ufafanue tabia na anuwai ya data ya kujaribu tabia hiyo—programu huzalisha kiotomatiki matukio ya majaribio kulingana na sifa iliyofafanuliwa.

2. **Mkusanyiko wako wa majaribio unaweza usishughulikie vya kutosha njia zote zinazowezekana ndani ya programu.** Hata kwa ufunikaji wa 100%, inawezekana kukosa matukio ya ukingoni.

3. **Majaribio ya kitengo yanathibitisha mkataba unatekelezwa kwa usahihi kwa data ya sampuli, lakini ikiwa mkataba unatekelezwa kwa usahihi kwa ingizo nje ya sampuli bado haijulikani.** Majaribio ya sifa hutekeleza mkataba lengwa na tofauti nyingi za thamani fulani ya ingizo ili kupata ufuatiliaji wa utekelezaji unaosababisha kufeli kwa madai. Kwa hivyo, jaribio la sifa hutoa dhamana zaidi kwamba mkataba unatekelezwa kwa usahihi kwa kundi pana la data ya ingizo.

### Miongozo ya kuendesha majaribio kulingana na sifa kwa mikataba mahiri {#testing-vs-formal-verification}

Kuendesha majaribio kulingana na sifa kwa kawaida huanza na kufafanua sifa (k.m., kutokuwepo kwa [mizidio ya nambari kamili](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) au mkusanyiko wa sifa unazotaka kuthibitisha katika mkataba mahiri. Unaweza pia kuhitaji kufafanua anuwai ya thamani ambazo programu inaweza kuzalisha data kwa ingizo za muamala wakati wa kuandika majaribio ya sifa.

Ikisanidiwa vizuri, zana ya majaribio ya sifa itatekeleza utendaji wa mikataba yako mahiri na ingizo zilizozalishwa kwa nasibu. Ikiwa kuna ukiukaji wowote wa madai, unapaswa kupata ripoti iliyo na data halisi ya ingizo inayokiuka sifa inayotathminiwa. Tazama baadhi ya miongozo hapa chini ili kuanza kuendesha majaribio kulingana na sifa na zana tofauti:

- **[Uchanganuzi tuli wa mikataba mahiri na Slither](https://github.com/crytic/slither)**
- **[Uchanganuzi tuli wa mikataba mahiri na Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Majaribio kulingana na sifa na Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing ya mikataba na Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing ya mikataba na Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing ya mikataba na Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Utekelezaji wa kiishara wa mikataba mahiri na Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Utekelezaji wa kiishara wa mikataba mahiri na Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Majaribio ya mikono kwa mikataba mahiri {#testing-vs-audits-bug-bounties}

Majaribio ya mikono ya mikataba mahiri mara nyingi huja baadaye katika mzunguko wa maendeleo baada ya kuendesha majaribio ya kiotomatiki. Aina hii ya majaribio hutathmini mkataba mahiri kama bidhaa moja iliyojumuishwa kikamilifu ili kuona ikiwa inafanya kazi kama ilivyobainishwa katika mahitaji ya kiufundi.

### Kujaribu mikataba kwenye mnyororo wa vitalu wa ndani {#testing-tools-and-libraries}

Wakati majaribio ya kiotomatiki yanayofanywa katika mazingira ya maendeleo ya ndani yanaweza kutoa maelezo muhimu ya utatuzi, utataka kujua jinsi mkataba wako mahiri unavyofanya kazi katika mazingira ya uzalishaji. Hata hivyo, kusambaza kwenye mnyororo mkuu wa Ethereum kunagharimu ada za gesi—bila kusahau kwamba wewe au watumiaji wako mnaweza kupoteza pesa halisi ikiwa mkataba wako mahiri bado una hitilafu.

Kujaribu mkataba wako kwenye mnyororo wa vitalu wa ndani (pia unajulikana kama [mtandao wa maendeleo](/developers/docs/development-networks/)) ni mbadala unaopendekezwa kwa kujaribu kwenye Mtandao Mkuu. Mnyororo wa vitalu wa ndani ni nakala ya mnyororo wa vitalu wa Ethereum inayoendeshwa ndani ya kompyuta yako ambayo inaiga tabia ya tabaka la utekelezaji la Ethereum. Kwa hivyo, unaweza kupanga miamala ili kuingiliana na mkataba bila kupata gharama kubwa.

Kuendesha mikataba kwenye mnyororo wa vitalu wa ndani kunaweza kuwa muhimu kama aina ya majaribio ya ujumuishaji ya mikono. [Mikataba mahiri inakubalika sana kuunganishwa](/developers/docs/smart-contracts/composability/), ikikuruhusu kuunganisha na itifaki zilizopo—lakini bado utahitaji kuhakikisha kuwa mwingiliano huo mgumu mnyororoni unatoa matokeo sahihi.

[Zaidi kuhusu mitandao ya maendeleo.](/developers/docs/development-networks/)

### Kujaribu mikataba kwenye mitandao ya majaribio {#unit-testing-tools}

Mtandao wa majaribio unafanya kazi sawa na Mtandao Mkuu wa Ethereum, isipokuwa kwamba unatumia Etha (ETH) isiyo na thamani ya ulimwengu halisi. Kusambaza mkataba wako kwenye [mtandao wa majaribio](/developers/docs/networks/#ethereum-testnets) inamaanisha mtu yeyote anaweza kuingiliana nao (k.m., kupitia sehemu ya mbele ya programu tumizi iliyogatuliwa (dapp)) bila kuweka fedha hatarini.

Aina hii ya majaribio ya mikono ni muhimu kwa kutathmini mtiririko wa mwisho hadi mwisho wa programu yako kutoka kwa mtazamo wa mtumiaji. Hapa, wajaribu wa beta wanaweza pia kufanya majaribio na kuripoti masuala yoyote na mantiki ya biashara ya mkataba na utendaji wa jumla.

Kusambaza kwenye mtandao wa majaribio baada ya kujaribu kwenye mnyororo wa vitalu wa ndani ni bora kwa kuwa ya kwanza iko karibu na tabia ya Mashine ya Mtandaoni ya Ethereum. Kwa hivyo, ni kawaida kwa miradi mingi ya asili ya Ethereum kusambaza dapps kwenye mitandao ya majaribio ili kutathmini uendeshaji wa mikataba mahiri chini ya hali halisi ya ulimwengu.

[Zaidi kuhusu mitandao ya majaribio ya Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Majaribio dhidi ya uthibitishaji rasmi {#property-based-testing-tools}

Wakati majaribio yanasaidia kuthibitisha kuwa mkataba unarudisha matokeo yanayotarajiwa kwa baadhi ya ingizo za data, hayawezi kuthibitisha kwa uhakika sawa kwa ingizo ambazo hazikutumika wakati wa majaribio. Kujaribu mkataba mahiri, kwa hivyo, hakuwezi kuhakikisha "usahihi wa utendaji" (yaani, hakuwezi kuonyesha kuwa programu inafanya kazi kama inavyotakiwa kwa seti _zote_ za thamani za ingizo).

Uthibitishaji rasmi ni mbinu ya kutathmini usahihi wa programu kwa kuangalia ikiwa muundo rasmi wa programu unalingana na vipimo rasmi. Muundo rasmi ni uwakilishi dhahania wa hisabati wa programu, wakati vipimo rasmi vinafafanua sifa za programu (yaani, madai ya kimantiki kuhusu utekelezaji wa programu).

Kwa sababu sifa zimeandikwa kwa maneno ya hisabati, inakuwa rahisi kuthibitisha kuwa muundo rasmi (wa hisabati) wa mfumo unakidhi vipimo kwa kutumia sheria za kimantiki za uelekezaji. Kwa hivyo, zana za uthibitishaji rasmi zinasemekana kutoa 'uthibitisho wa hisabati' wa usahihi wa mfumo.

Tofauti na majaribio, uthibitishaji rasmi unaweza kutumika kuthibitisha utekelezaji wa mkataba mahiri unakidhi vipimo rasmi kwa utekelezaji _wote_ (yaani, hauna hitilafu) bila kuhitaji kuutekeleza na data ya sampuli. Sio tu kwamba hii inapunguza muda unaotumika kuendesha makumi ya majaribio ya kitengo, lakini pia ina ufanisi zaidi katika kunasa udhaifu uliofichwa. Hiyo inasemwa, mbinu za uthibitishaji rasmi ziko kwenye wigo kulingana na ugumu wao wa utekelezaji na manufaa.

[Zaidi kuhusu uthibitishaji rasmi kwa mikataba mahiri.](/developers/docs/smart-contracts/formal-verification)

## Majaribio dhidi ya ukaguzi na zawadi za hitilafu {#static-analysis-tools}

Kama ilivyotajwa, majaribio makali mara chache yanaweza kuhakikisha kutokuwepo kwa hitilafu katika mkataba; mbinu za uthibitishaji rasmi zinaweza kutoa hakikisho lenye nguvu zaidi la usahihi lakini kwa sasa ni ngumu kutumia na zinagharimu sana.

Bado, unaweza kuongeza zaidi uwezekano wa kunasa udhaifu wa mkataba kwa kupata ukaguzi huru wa msimbo. [Ukaguzi wa mkataba mahiri](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) na [zawadi za hitilafu](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) ni njia mbili za kupata wengine kuchanganua mikataba yako.

Ukaguzi unafanywa by wakaguzi wenye uzoefu katika kutafuta matukio ya dosari za usalama na mazoea duni ya maendeleo katika mikataba mahiri. Ukaguzi kwa kawaida utajumuisha majaribio (na ikiwezekana uthibitishaji rasmi) pamoja na ukaguzi wa mikono wa msimbo mzima.

Kinyume chake, programu ya zawadi ya hitilafu kwa kawaida inahusisha kutoa tuzo ya kifedha kwa mtu (kawaida huelezewa kama [wadukuzi wema](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) anayegundua udhaifu katika mkataba mahiri na kuufichua kwa wasanidi programu. Zawadi za hitilafu ni sawa na ukaguzi kwa kuwa inahusisha kuwauliza wengine kusaidia kupata kasoro katika mikataba mahiri.

Tofauti kubwa ni kwamba programu za zawadi za hitilafu ziko wazi kwa jamii pana ya wasanidi programu/wadukuzi na huvutia kundi pana la wadukuzi wa kimaadili na wataalamu huru wa usalama wenye ujuzi na uzoefu wa kipekee. Hii inaweza kuwa faida juu ya ukaguzi wa mkataba mahiri ambao unategemea zaidi timu ambazo zinaweza kuwa na utaalamu mdogo au finyu.

## Zana za majaribio na maktaba {#dynamic-analysis-tools}

### Zana za majaribio ya kitengo {#related-tutorials}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Zana ya ufunikaji wa msimbo kwa mikataba mahiri iliyoandikwa katika Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Mfumo wa maendeleo na majaribio ya hali ya juu ya mkataba mahiri (kulingana na Ethers.js)_.

- **[Majaribio ya Remix](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Zana ya kujaribu mikataba mahiri ya Solidity. Inafanya kazi chini ya programu-jalizi ya Remix IDE "Solidity Unit Testing" ambayo inatumika kuandika na kuendesha matukio ya majaribio kwa mkataba._

- **[Wasaidizi wa Majaribio wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Maktaba ya madai kwa majaribio ya mkataba mahiri wa Ethereum. Hakikisha mikataba yako inafanya kazi kama inavyotarajiwa!_

- **[Mfumo wa majaribio ya kitengo wa Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie hutumia Pytest, mfumo wa majaribio wenye vipengele vingi unaokuruhusu kuandika majaribio madogo na msimbo mdogo, unakua vizuri kwa miradi mikubwa, na unaweza kupanuliwa sana._

- **[Majaribio ya Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry inatoa Forge, mfumo wa majaribio wa Ethereum wa haraka na unaobadilika wenye uwezo wa kutekeleza majaribio rahisi ya kitengo, ukaguzi wa matumizi bora ya gesi, na fuzzing ya mkataba._

- **[Majaribio ya Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Mfumo wa kujaribu mikataba mahiri kulingana na Ethers.js, Mocha, na Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Mfumo wa maendeleo na majaribio kulingana na Python kwa mikataba mahiri inayolenga Mashine ya Mtandaoni ya Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Mfumo kulingana na Python kwa majaribio ya kitengo na fuzzing wenye uwezo mkubwa wa utatuzi na usaidizi wa majaribio ya mtambuko-mnyororo, ukitumia pytest na Anvil kwa uzoefu bora wa mtumiaji na utendaji._

### Zana za majaribio kulingana na sifa {#further-reading}

#### Zana za uchanganuzi tuli {#tutorials}

- **[Slither](https://github.com/crytic/slither)** - _Mfumo wa uchanganuzi tuli wa Solidity kulingana na Python kwa kupata udhaifu, kuimarisha uelewa wa msimbo, na kuandika uchanganuzi maalum kwa mikataba mahiri._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter kwa kutekeleza mtindo na mbinu bora za usalama kwa lugha ya upangaji programu ya mkataba mahiri ya Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Kichanganuzi tuli kulingana na Rust kilichoundwa mahususi kwa usalama na maendeleo ya mkataba mahiri wa Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Mfumo wa uchanganuzi tuli kulingana na Python wenye vigunduzi vya udhaifu na ubora wa msimbo, vichapishaji vya kutoa taarifa muhimu kutoka kwa msimbo na usaidizi wa kuandika moduli ndogo maalum._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Linter rahisi na yenye nguvu kwa Solidity._

#### Zana za uchanganuzi thabiti

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer ya mkataba ya haraka kwa kugundua udhaifu katika mikataba mahiri kupitia majaribio kulingana na sifa._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Zana ya fuzzing ya kiotomatiki muhimu kwa kugundua ukiukaji wa sifa katika msimbo wa mkataba mahiri._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Mfumo wa utekelezaji wa kiishara thabiti kwa kuchanganua msimbo wa baiti wa EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Zana ya tathmini ya msimbo wa baiti wa EVM kwa kugundua udhaifu wa mkataba kwa kutumia uchanganuzi wa taint, uchanganuzi wa concolic, na ukaguzi wa mtiririko wa udhibiti._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble ni lugha ya vipimo na zana ya uthibitishaji wa wakati wa utekelezaji inayokuruhusu kufafanua mikataba mahiri na sifa zinazokuruhusu kujaribu kiotomatiki mikataba na zana kama vile Diligence Fuzzing au MythX._

## Mafunzo yanayohusiana

- [Muhtasari na ulinganisho wa bidhaa tofauti za majaribio](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Jinsi ya kutumia Echidna kujaribu mikataba mahiri](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Jinsi ya kutumia Manticore kupata hitilafu za mkataba mahiri](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Jinsi ya kutumia Slither kupata hitilafu za mkataba mahiri](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Jinsi ya kuiga mikataba ya Solidity kwa majaribio](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Jinsi ya kuendesha majaribio ya kitengo katika Solidity kwa kutumia Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Usomaji zaidi

- [Mwongozo wa kina wa kujaribu mikataba mahiri ya Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Jinsi ya kujaribu mikataba mahiri ya Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Mwongozo wa majaribio ya kitengo wa MolochDAO kwa wasanidi programu](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Jinsi ya kujaribu mikataba mahiri kama nyota](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Mafunzo: Kujaribu mkataba mahiri kwenye Ethereum

- [Jinsi ya kuendeleza na kujaribu dApp kwenye mtandao wa majaribio wa ndani, wa wateja wengi](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Mwongozo wa kusambaza mkataba mahiri kwenye mtandao wa majaribio wa ndani na kufanya majaribio._
- [Jinsi ya kuiga mikataba mahiri ya Solidity kwa majaribio](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Mafunzo ya kati kuhusu jinsi ya kutumia data ya kuiga na kutekeleza majaribio ya kitengo._
- [Jinsi ya kutumia Echidna kujaribu mikataba mahiri](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Mbinu za hali ya juu za fuzzing na majaribio ya mkataba mahiri._