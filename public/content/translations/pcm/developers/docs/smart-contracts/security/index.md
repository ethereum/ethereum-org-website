---
title: Smart Kontrakts Sekurity
description: Ovaview of rules wey dem dey yus build sekure Ethereum smart kontracts
lang: pcm
---

Smart kontracts dey very flexibol, and dem kapabol to dey kontrol big-big amounts of value and data, as dem dey run immutabol logik based on di code wey dem dey run on di blockchain. Dis don kreate one ogbonge ekosystem of aplikashons wey dem nor trust and dey disentralize wey dey provide plenti advantaj ova di legacy systems. Dem dey also reprisent oportunitis for atackas wey dey find profit as dem dey kolobi weak spots wey dey smart kontracts.

Blockchains wey dey publik laik Ethereum, dey make di issues to dey sekure smart kontracts more hard. Dem nor fit shanj kontract code wey dem deploy _ushually_ to patch-patch sekurity wey nor strong, as asset wey dem steal from smart kontracts dey very difikut to track and most taims dem nor fit rikova dem bikos kontract nor dey shanj.

Aldoh numbas dey difren, dem don estimate sey di total amount of value wey dem steal abi don lost bikos of sekurity wey get fault don pass $1 billion. Dis inklude events wey dey very high, laik di [DAO hack](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3.6M ETH wey dem steal, worth pass $1B for today prices), [Parity multi-sig wallet hack](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) (wey lose $30M to dem hackers), and di [Parity frozen wallet issue](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (ova $300M in ETH wey dey lock foreva).

Di issues menshon bifor make am impotant for divelopas to invest effort to dey build sekure, robust, and strong smart kontracts. Smart kontract sekurity na serious biznes, and one wey efri divelopa go do well to learn. Dis guide go kover sekurity konsiderashons for Ethereum divelopas and eksplore risorsis to dey impruf smart kontract sekurity.

## Prerequisites {#prerequisites}

Make sure sey yu sabi di [fundamentals of smart kontract divelopment](/developers/docs/smart-contracts/) bifor yu go dey tackol sekurity.

## Rules to dey build sekure Ethereum smart kontracts {#smart-contract-security-guidelines}

### 1. Make yu disign proper access kontrols {#design-proper-access-controls}

For smart kontracts, funshons wey dem mark `publik` abi `ekstanal` na im dem fit koll by any akant wey dey own ekstanaly (EOAs) abi kontract akants. To dey spesify publik visibility for funshon dey impotant i yu wont odas to interact wit yor kontract. Funshons wey dem mark `private` haueva fit only dey koll funshons inside di smart kontracts, and nor bi ekstanal akants. To give efri netwok partisipant access to kontract funshons fit kause palava, espeshialy if im mean anyone fit pafom sensitive operashons (e.g., minting new tokens).

Tp privent yus of smart kontract funshons wey wi nor apruf, im dey impotant to impliment sekure access kontrols. Access kontrol mekanisim dey stop di ability to yus satain funshons in one smart kontract to apruf entitis, such as akants responsibol for manajin di kontract. Di **Ownabol pattern** and **role-based kontrol** na two patterns wey dey very yusful to impliment access kontrol for smart kontracts:

#### Ownabol pattern {#ownable-pattern}

In di Ownabol pattern, one address set as di "owner" of di kontract durin di kreashon of kontract process. Dem don assign funshons wey dem protet to one `OnlyOwner` modifier, wey go make sure say di kontract dey konfam di identity of di address wey dem koll bifor dem run di funshon. Kolls to funshons wey dem protet from oda address aside from di kontract owna always revert, to dey privent access wey dem nor wont.

#### Role-based access kontrol {#role-based-access-control}

To dey regista one singol address as `Owna` in one smart kontract dey introdus di risk of sentralizashon and reprisent one singol point-of-failure. If di owna akant keys dey kompromise, attakas fit attak di kontract wey dem own. Dis na why to dey yus role-based access kontrol pattern wit plenti adminstrative akants fit bi betta opshon.

For role-based access kontrol, dem don distribute access to sensitive funshon bitwin one set of partisipants wey dem trust. For instans, one akant fit dey responsibol to dey minst tokens, as anoda akant dey pafom upgrades abi dey pause di kontract. To dey disentralize access kontrol dis way dey eliminates singol points of failure and dey reduce trust assumpshon for users.

##### To dey yus multi-signashure wallets

Anoda way wey yu fit get sekure access kontrol na to dey yus [multi-signashure akant](/developers/docs/smart-contracts/#multisig) to manaj kontract. Unlaik one regular EOA, na plenti entitis wey own multi-signashure akants and rikwaya signashure from one minimum numba of akants—laik 3-of-5—to run transakshons.

To dey yus multisig for access kontrol dey add extra sekurity bikos to take akshons for di target kontract go nid agriment from plenti pipol. Dis dey yusful wella if im necessary to dey yus Ownabol pattern, as im dey make am more diffikut for attaka abi rogue insida to manipulate sensitive kontract funshons for pupose wey nor bad.

### 2. Yus require(), assert(), and revert() statements to protet kontract operashons {#use-require-assert-revert}

As wi don menshon, anyone fit koll publik funshons for yor smart kontract wons dem don deploy am on di blockchain. Sinse yu nor fit sabi in advans hau ekstanal akants go interact wit one kontract, im dey ideal to impliment internal safeguards against problematik operashons bifor deploy. Yu fit forse koret bihavior for smart kontracts as yu dey yus di `require()`, `assert()`, and `revert()` statements to trigga eksepshons and revert state shanjis if exekushon fails to satisfy satain rikwayaments.

**`require()`**: `require` Dem dey put require for di start of funshons to make sure sey dem don meet satain konditshons bifor dem run di funshon. Yu fit yus one `require` statement to konfam user inputs, sheck state variabols, abi konfam sey na di korect pesin wey dey koll di funshon bifor dem move forwod wit one funshon.

**`assert()`**: `assert()` Dem dey yus am detect intanal errors and dey sheck for violashons of "invariants" in yor code. One invariant na logika fact about hau kontract bi wey supose dey true for all di funshon im dey run. One eksampol invariant na di maximum total supply abi balas of token kontract. To dey yus `assert()` dey make sure sey yor kontract neva rish one vulnerabol state, and if im do, dem don roll all di shanjis to state variabol back.

**`revert()`**: Dem fit yus `revert()` for one if-else statement wey dey trigga eksepshon if dem nor meet di kondishon. Di sampol kontract wey dey bilow dey `revert()` protet di funshons to run:

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

### 3. Test smart kontracts and verify kode dey koret {#test-smart-contracts-and-verify-code-correctness}

Bikos di kode wey dey run nor fit shanj [Ethereum Virtual Machine](/developers/docs/evm/) mean sey smart kontracts nid kwolity sheck wey high pass durin di divelopment piriod. To dey test yor kontract wella and dey obsarve am for any rizut wi nor ekspet to impruf sekurity wella and protet yor user in di long run.

Di normal metod na to write smoll unit tests as yu dey yus mock data wey di kontract dey ekspet to risiv from users. [Unit testing](/developers/docs/smart-contracts/testing/#unit-testing) dey good to dey test hau satain funshon dey work and dey sure sey one samrt kontract dey work as im suppose work.

But e bad sey, to dey test unit nor too dey sharp to dey impruf smart kontract sekurity wen dem yus am alone. Unit test fit show sey funshon dey run wella for mock data, but unit tests nor only dey sharp as di test wey dem write. Dis dey make am difikut to sabi edge kases wey dem don miss and wiknes wey fit spoil di safety of yor smart kontract.

Approach wey betta na to kombine unit testin wit property-based testin as dem dey yus [statik and dynamic analysis](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Statik analysis dey yus low-level reprisentashons, laik [kontrol flow graphs](https://en.wikipedia.org/wiki/Control-flow_graph) and [abstract syntax trees](https://deepsource.io/glossary/ast/) to analyze program states and exekushon paths wey dem nor fit reach. Meanwhile, dynamic analysis tekniks dem, laik [smart kontract fuzzing](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), dey run kontract kode wit random input values to find operashons wey dey go against sekurity propatis.

[Formal verifikashon](/developers/docs/smart-contracts/formal-verification) na anoda teknik to dey verify sekurity propatis for smart kontracts. Unlaik regular testin, formal verifikashon fit pruf di absens of errors for one smart kontracts. Dem fit ashive di as dem dey kreate one formal spek wey kapshure sekurity propatis dem wont and dey pruf sey one formal model of di kontracts agri to di spek.

### 4. Make yu ask for one indipendent review of yor kode {#get-independent-code-reviews}

Afta yu don test yor kontract, im good to ask odas to sheck di sourse kode for any sekurity issues. To dey testnor go open efri mistakes in one smart kontract, but dey get one indipendent review go inkrease di chanse to si di wiknes.

#### Audits {#audits}

To dey komishon one smart kontract audit na one way to dey konduct one indipendent kode review. Auditors dey play impotant role to sure sey dat smart kontracts dey sekure and free from kwolity mistaks and disign errors.

As wi don toks am, yu suppose afoid to dey trit audits as one silver bullet. Smart kontract audits nor go katch efri bug and dem dey disign to provide adishonal round of reviews, wey fit helep sabi issues dem don miss by divelopas durin di first divelopment and testin. Yu suppose also folow di praktis wey betta pass to dey wok wit auditors, laik to dey dokument kode wella and dey add inline koments, to maximize di benefit of one smart kontract audit.

- [Smart kontract auditing tips & tricks](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Make yu yus yor audit wella](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug bountis {#bug-bounties}

To dey set up bug bounty program na anoda way to do external kode review. Bug bounty na moni wey dem dey giv pipol (ushualy whitehat hackers) wey fit find wiknes for aplikashon.

If dem yus am well, bug bountis dey giv membas of di hacker komunity rizin to sheck yor kode for sirios palava. One real-life eksampol na di "infinite money bug" wey fit let one attaka kreate unlimited amount of Ether on [Optimism](https://www.optimism.io/), one [Layer 2](/layer-2/) protokol wey dey run on Ethereum. E good sey, one whitehat hacker [see di mistak](https://www.saurik.com/optimism.html) kon tell di team, and [get big moni in di process](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

One yusful way na to set di payout of one bug bounty program in proporshon to di amount of funds at stake. As dem diskribe am as "[scaling bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)", dis way dey provide finashial insentives for individuals to responsibly disklose wiknes insted to dey sheat dem.

### 5. Make yu folow di praktis wey betta pass during smart kontract divelopment {#follow-smart-contract-development-best-practices}

Di existens of audits and bug bountis nor dey komot yor responsibility to write high-kwolity kode. Good smart kontract sekurity dey start wit di folowin koret disign and divelopment process:

- Store all kode for vashon kontrol system, laik git

- Make all kode modifikashons thru pull rikwests

- Make sure say pull rikwests get at least one indipendent reviewer—if yu dey wok solo on one project, konsida to dey find oda divelopas and trade kode reviews

- Make yu yus [divelopment environment ](/developers/docs/frameworks/)to dey test, kompile, deploy smart kontracts

- Make yu run yor kode thru basik kode analysis tools, laik [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril and Slither. Normal, yu suppose do dis bifor ish pull rikwest join togeda and kompia difrens in output

- Make sure sey yor kode dey kompile witout errors, and di Solidity kompila nor dey show warnings

- Make yu kip yor kode well (as yu dey yus [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) and diskribe di tins about di kontract architecture for languaj wey dey izy to ondastand. Dis go make am izy pass for odas to audit and review yor kode.

### 6. Make yu do robust disasta rikovery plans {#implement-disaster-recovery-plans}

To dey disign sekure access kontrols, dey impliment finshon modifiers, and oda sijesshons fit imprif smart kontract sekurity, but dem nor fit komot di bad tins wey dey posibol to hapun. To dey build sekure smart kontracts rikwaya "to dey pripia for failure" and dey get one fallbak plan to dey respond wella to attaks. One propa disasta rikovery plan go put some abi all of di folowin komponents:

#### Kontract upgrades {#contract-upgrades}

As Ethereum smart kontract nor dey shanj normal, im dey posibol to ashieve some level of shanj if yu yus upgrade patterns. To dey upgrade kontracts dey necessary for cases wia kritical mistak don make yor old kontract yusles kon deploy new logik na di opshon wey make sence pass.

Hau kontract upgrade dey wok dey difren, but di "proxy pattern" na di one of di ways wey popular pass to dey upgrade smart kontracts. [Proxy patterns](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) split one aplikashon state and logik bitwin _two_ kontracts. Di first kontract (wey dem koll 'proxy kontract') det store state variabols (e.g., user balans), as di sekond kontract (wey dem koll 'logik kontract') dey hold di kode to dey run kontract funshons.

Akants dey interact wit di proxy kontract, wey dey send all funshon kolls to di logik kontract wit di [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) low-level koll. Dis one nor dey laik di regular messaj koll, `delegatecall()` dey make sure sey di kode wey dey run for di logik kontract address dey run for di kontext of di kontract dem dey koll. Dis mean sey di logik kontract go always write to di proxy storaj (insted of im own storaj) and di orijina values of `msg.sender` and `msg.value` nor dey shanj.

To dey delegate kolls to di logik kontract go nid make dem store di address for di proxy kontract storaj. So, to dey upgrade di kontract logik na only matta of deployin anoda logik kontract and dey store di new address in di proxy kontract. As dem dey automatikaly diret di kolls wey dey kome from di proxy kontract to di new logik kontract, yu for don "upgrade" di kontract witout akshualy modifyin di kode.

[More on upgrading kontracts](/developers/docs/smart-contracts/upgrading/).

#### Emergency stops {#emergency-stops}

As dem tok bifor, even if dem test and audit kontract wella, e nor mean sey dem go diskova all bugs inside one smrt kontract. If one wiknes show face for yor kode afta yu don run am, to dey patch am nor posibol bikos yu nor fit shanj di kode wey dey run for di kontract address. Also, upgrade di way (laik proxy patterns) fit take taim to start to dey run am (dem often nid approval from difren pipol), wey dey only give attakas more taim to kause more damaj.

Di last opshon an to run "emergency stop" funshon wey dey block kolls to vulnerabol funshons for kontract. Emergency dey stop to komprise di folowing komponents:

1. One global Boolean variabol wey dey show if di smart kontract dey stop state abi not. Dis variabol dey set to `false` wen dem dey set up di kontract, but im go shanj to `true` wons dem stop di kontract.

2. Funshons wey refrens di Boolean variabol in wetin dem dey run. Dem fit get such funshons wen di smart kontract nor stop, and dem nor go fit get am wen dem start di emergency stop feature.

3. One entity wey get access to di emergency stop funshon, wey go set di Boolean variabol to `true`. To privent bad akshons, dem fit restrict calls to dis function to trusted address (laik di kontract owna).

Wons di kontract don start di emergency stop, some funshons nor go wok again. Yu fit ashieve dis as yu dey wrap select funshon for modifier wey dey refer to di global variabol. Bilow na [one eksampol](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) wey dey diskribe one implimentashon of dis pattern in kontracts:

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

Dis eksampol dey show di basik features of di emergency stops:

- `isStopped` na Boolean wey dey evaluate to `false` for di beginning and to `true` wen di kontract enta emergency mode.

- Di funshon modifiers `onlyWhenStopped` and `stoppedInEmergency` sheck di `isStopped` variabol. Dem dey yus `stoppedInEmergency` to dey kontrol funshons wey yu nor supose enta wen di kontract dey wik (`laik deposit()`). Kolls to dis funshons go simply revert.

Dem dey yus `onlyWhenStopped` for funshons wey supose fit koll durin emergency (laik `emergencyWithdraw()`). Such funshons fit helep resolve di situashon, so dem nor dey for di "restricted funshons" list.

To dey yus emergency stop funshons dey provide one effectiv stopgap to dey deal wit sirios wiknes in yor smart kontract. Haueva, im dey inkrease di nid for users to trust divelopas make dem nor start to dey rizin sef-serving. To dis end, to dey disentralize kontrol of di emergency stop may bi by allowin am to one on-chain voting metod, taimlock, abi approval from one multisig wallet na posibol solushons.

#### Event to dey monitor {#event-monitoring}

[Events](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) dey allow yu track kolls to smart kontract funshons and monitor shanjis to state variabols. Im dey good to program yor smart kontract to emit one event weneva some party dey take safety akshon wey kritical (laik to dey witdraw funds).

To dey log events and monitor dem off-chain dey provide insights on kontract operashons and dey helep to diskova bad akshons fast-fast. Dis mean sey yor team fit respond fasta to hacks and take akshon to ridus impact on users, laik to dey pause funshons abi dey pafom upgrade.

Yu fit also go for one off-di-shef tool wey dey monitor and dey automatikaly forwod alerts weneva someone dey interact wit yor kontracts. Dis tools go allow yu kreate kustom alerts wey base on difren triggas, such as transakshon volume, frekwensy of funshon kolls, abi di spesifik funshons wey dey involve. For eksampol, yu fit program one alert wey dey kome in wen di amount dem witdraw in one singol transakshon dey kross one patikular level.

### 7. Make yu disign sekure gofanans systems {#design-secure-governance-systems}

Yu fit wont disentralize yor aplikashon as yu dey turn ova kontrol of kore smart kontract to komunity membas. For dis kase, di smart kontract system go inklude gofanans module—one metod wey dey allow komunity membas to apruf administrative akshons thru on-chain gofanans system. For eksampol, proposal to upgrade proxy kontract to one new implimentashon fit get vote from token-holdas.

Disentralized gofanans fit benefit yu, espeshialy bikos im align to di intrest of divelopas and end-users. Even as e bi, smart kontract gofanans metods fit introdus new risks if yu nor do am in koret ways. One posibol scenario na if one attaka nid plenti voting pawa (wey dem meashure in numba of tokens wey im hold) as yu dey komot one [flash loan](/defi/#flash-loans) and dey push thru bad proposal.

One way to dey privent palava wey rilate to on-chain gofanans na to [yus one taimlock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). One taimlock dey privent smart kontract from exekuting satain akshons ontil one spesifik amount of taim wey dey pass. Oda strategis inklude to dey assign "voting weight" to ish token wey base on hau long dem don lock am up, abi to dey meashure di voting pawa of address for historical piriod (for eksampol, 2-3 blocks wey don pass) insted of di kurent block. Do two metods dey ridus di posibility to dey gada voting pawa kwik-kwik to swing on-chain votes.

More on [ hau to dey disign sekure gofanas systems](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [difren voting metods in DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos), and [di komon DAO attak vectors wey dipend on DeFi](https://dacian.me/dao-governance-defi-attacks) in di links wey dem shia.

### 8. Ridus komplexity in kode to di minimum {#reduce-code-complexity}

Tradishonal softwia divelopas sabi di KISS ("kip am simpol, stupid") prinsipol, wey advise make dem nor introdus unnecessary hardnes for softwia disign. Dis dey folow di long-held tinkin wet "komplex systems fail for komplex ways" and dem dey wik to errors wey kost.

To kip tins simpol na of patikular impotans wen yu dey write smart kontracts, given sey smart kontracts dey kontrol big amounts of value. One tip to ashieve simplisity wen yu dey write smart kontracts na to yus libraries wey dey exist again, laik [OpenZeppelin Kontracts](https://docs.openzeppelin.com/contracts/4.x/), wia im posibol. Bikos dem don audit and test dis libraris wella by divelopas, to dey yus dem ridus di shans to dey introdus bugs by writing new funshons from di start.

Anoda komon advice na to write smoll funshons and kip kontracts modular by dividing biznes logik akross plenti kontracts. Not to dey only write kode wey simpol pass dey ridus di attak surface for one smart kontract, im also dey make am izy to rizin about di koretnes of di overall system and detect posibol disign errors early.

### 9. Difend against komon smart kontract wiknes {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancy {#reentrancy}

Di EVM nor dey allow konkurrency, dey mean two kontracts wey involve in one messaj koll nor fit run at di same taim. One ekstanal koll dey pause di kolling kontract exekushon and memory ontil di koll riturn, for wich point exekushon dey proceed normal. Dem fit don process dis bifor wey dem deskribe as transferring [kontrol flow](https://www.computerhope.com/jargon/c/contflow.htm) to anoda kontract.

Aldoh as im nor dey harm, to dey transfa kontrol flow to kontracts wey yu nor trust fit kause palava, such as reentrancy. Reentrancy attak dey hapun wen bad kontract koll back into wik kontract bifor di orijinal funshon invokashon don komplete. Dem don eksplain dis type of attak betta pass wit eksampol.

Konsida simpol kontract (‘Victim’) wey dey allow anyone to deposit and witdraw Ether:

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

Dis kontract dey ekspose one `witdraw()` funshon to allow users to witdraw ETH wey dem deposit bifor into di kontract. Wen to dey process one witdrawal, di kontract dey pafom di folowing operashons:

1. Dey sheck di user ETH balans
2. Dey send funds to di kolling address
3. Dey resets dem balans to 0, to dey privent adishonal witdrawals from di user

Di `withdraw()` funshon in `Victim` kontract dey follow di “checks-interactions-effects” pattern. Im dey _sheck_ if dem satisfy kondishon to dey run (i.e., di user get positive ETH balans) and dey paform di _interakshon_ by sending ETH to di address of di kolla, bifor yu apply di _effects_ of di transakshon (i.e., by ridusing di user balans).

If dem koll `withdraw()`from one akant wey dem get outside (EOA), di funshon go run as dem ekspet: `msg.sender.call.value()` dey send ETH to di kolla. Haueva, if `msg.sender` na smart kontract akant kolls `withdraw()`, dey send di funds as dem dey yus `msg.sender.call.value()` go trigga kode wey dem kip for dat adress to run.

Imajin dis na di kode wey dem deploy at di kontract address:

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

Dem disign dis disign to do three tins:

1. Asept one deposit from anoda akant (im fit bi EOA for di attakas)
2. Make yu deposit 1 ETH into di Victim kontract
3. Witdraw di 1 ETH dem store in di smart kontract

Nortin dey wrong here, eksept dat `Attacka` get anoda funshon wey koll`withdraw()` in `Victim` again if di gas left ova from di `msg.sender.call.value` wey dey kome in pass 40,000. Dis one dey giv `Attacka` di pawa to reenta di `Victim` and witdraw more funds _bifor_ di first invokashon of `witdraw` komplete. Di cycle dey look laik dis:

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

Di summary bi sey bikos di kolla balans nor dey set to 0 ontil di funshon don run finish, invokashons wey follow go succeed and go allow di kolla to witdraw dia balana plenti taims. Dem fit yus dis kain attak take drain funds from di smart kontract, laik wetin hapun in di [2016 DAO hack](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Reentrancy attaks still dey kritical issue for smart kontracts today as [di publik listings of reentrancy exploits](https://github.com/pcaversaccio/reentrancy-attacks) dey show.

##### Hau yu fit privent reentrancy attaks

One way to dey deal wit reentrancy na to dey follow di [checks-effects-interakshons pattern](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Dis pattern dey order di exekushon of funshons in way wey kode wey dey paform necessary shecks bifor im kontinu to dey run am kome first, follow by kode wey dey manipulate kontract state, wit kode wey dey interact wit oda kontracts abi EOAs wey dey kome last.

Dem don yus shecks-effect-interakshon pattern to dey revise vashon of di `Victim` kontract wey wi show bilow:

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

Dis kontract dey do one _sheck_ on di user balans, dey apply di _effects_ of di `withdraw()` funshon (as im dey make di user balans go back to 0), e go nau go ahead to do di _interakshon_ (wey dey send ETH to di user address). Dis dey make sure sey di kontracts don update im storaj bifor di koll wey dey kome from outside, dis go komot di re-entrancy kondishon wey dey enabol di first attak. Di `Attacka` kontract still fit koll back into di `NoLongerAVictim`, but sinse `balances[msg.sender]` don dey set to 0. adishonal witdrawals go throw error kome.

Anoda opshon na to yus one mushual esklushon lock (wey dem komonly deskribe as "mutex") wey dey lock porshon of kontract state ontil funshon invokashon don komplete. Dem impliment dis as dem dey yus Boolean variabol wey dem set to `true` bifor di funshon dey run and dey riturn to `false` afta di invokashon don finish. As yu don si in di eksampol bilow, to dey yus mutex dey protect funshon against rekursiv kolls as di orijinal invokashon still dey process, as im dey stop reentrancy wella.

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
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Yu fit also yus [pull payments](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment) system wey nid users to witdraw funds from di smart kontracts, insted of "push payments" system wey dey send funds to akants. Dis one dey rimuv di possibility to mistakenly trigga kode for unknown addresses (and e fit also privent satain denial-of-service attaks).

#### Integer ondaflows and ovaflows {#integer-underflows-and-overflows}

Integer ovaflow dey hapun wen di rizuts of arithmetik operashon foll outside di aseptabol range of values, wey go kause am to "roll ova" to di lowest reprisentabol value. For eksampol, `uint8` fit only store values up to 2^8-1=255. Arithmetik operashons wey dey rizut for values wey high pass `255` go ovaflow and reset `uint` to `0`, wey look laik di odometer for car dey reset to 0 wons im reach di maximum mileage (999999).

Integer onderflows dey hapun for same rizins: di rizuts of arithmetik operashon foll bilow di range im fit asept. Imajin sey yu try to dey dikrement `0` for `uint8`, di rizut go simply roll ova to di maximum value im fit reprisent (`255`).

Both integer ovaflows and ondaflows fit lead to shanjis wey wi nor ekspect to kontract state variabols and go giv rizuts for exekushon we wi nor plan for. Bilow na eksampol wey dey show hau attacka fit sheat arithmetik ovaflow for smart kontract to paform invalid operashon:

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

##### Hau to privent integer ondaflows and ovaflows

As of vashon 0.8.0, di Solidity kompiler dey reject kode wey rizut for integer ondaflows and ovaflows. Haueva, kontracts wey dem join togeda wit lower kompiler vashon supose dey paform shecks on funshons wey get arithmetik operashons abi yus library (e.g., [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) wey dey sheck for ondaflow/ovaflow.

#### Orakol manipulashon {#oracle-manipulation}

[Orakols](/developers/docs/oracles/) dey find off-chain infomashon kon send am on-chain for smart kontracts to yus. Wit orakols, yu fit disign smart kontracts wey fit work wit off-chain systems, laik kapital markets, greatly ekspandin dem aplikashon.

But if di orakol dey korrupt and dey send infomashon on-chain wey nor koret, smart kontracts go run based on wrong inputs, wey fit kause palava. Dis na di basis of di "orakol palava", wey konsan di task to make sure sey infomashon from blockchain orakol dey akurate, up-to-date, and on taim.

One sekurity konsan wey look di same na to dey yus on-chain orakol, laik disentralized ekshanj, to get di spot price for asset. To dey lend platfoms for [disentralized finans(DeFi)](/defi/) industry dey do dis to ditamin di value of user kolateral to sabi hau much dem fit borow.

DEX prices dey akurate most taims, largely due to dem arbitrageurs wey dey restore parity for markets. Haueva, dem dey open to manipulashon, partikularly if di on-chain orakol dey kalkulate asset prices based on historical trading patterns (as e dey ushualy bi di kase).

For instans, one attacka fit artifishialy pump di spot price of asset by taking out flash loan rite bifor im interact wit yor lending kontract. To query di DEX for di asset price go riturn higher-than-normal value (due to di attacka large "buy order" wey dey skew dimand for di asset), dey allow make dem borrow pass wetin dem supose borow. Dem don yus such "flash loan attaks" to sheat relians on price orakols among plenti DeFi aplikashons, dey kost plenti protokols millions for lost funds.

##### Hau to privent orakol manipulashon

Di minimum tin yu nid to [afoid orakol manipulashon](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) na to yus disentralized orakol netwok wey dey query infomashon from plenti sorsis to afoid singol points of failure. For most kases, disentralized orakols get built-in cryptoekonomik incentives to enkoraj orakol nodes to report koret infomashon wey dey make dem more sekure pass sentralized orakols.

If yu dey plan query on-chain orakol for asset prices, make yu konsida to dey yus one wey dey use one time-weighted averaj price (TWAP) metod. [TWAP orakol](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) dey query di price of asset at two difren taims (wey yu fit modify) and kalkulate di spot price based on di averaj wey im get. To dey shuse taim wey long pass, yu dey protect yor protokol against price manipulashon sinse large orders wey dem just run nor fit impact asset prices.

## Smart kontract sekurity risorsis for divelopas {#smart-contract-security-resources-for-developers}

### Tools wey yu fit yus analyze smart kontracts and verify kode koretnes {#code-analysis-tools}

- **[Testing tools and libraries](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _ Kollecshon of industry-standard tools and libraries wey dem dey yus paform unit tests, statik analysis, and dynamik analysis on smart kontracts._

- **[Formal verifikashon tools](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _ Tools to dey yus verify funshonal koretnes in smart kontracts and dey sheck invariants._

- **[Smart kontract auditing savis](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Listing of organizashons wey dey provide smart kontract auditing savis for Ethereum divelopment projects._

- **[Bug bounty platfoms](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _ Platfoms to dey yus koordinate bug bountis and to riwod responsibol disklosure of kritikal wiknes in smart kontracts._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _ One free online tool wey dem dey yus sheck all afailabol infomashon wey regard forked kontract._

- **[ABI Encoder](https://abi.hashex.org/)** - _ One free online savis for encoding yor Solidity kontract funshons and konstructor arguments._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Solidity Statik Analyzer, wey dey traverse di Abstract Syntax Trees (AST) to pinpoint suspected wikneses and dey print out issues for one easy-to-consume markdown format._

### Tools to dey yus monitor smart kontracts {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** - _ One tool to automatikaly monitor and respond to events, funshons, and transakshon parametas on yor smart kontracts._

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** - _One tool wey yu fit yus get real-time notifikashons wen unusual abi unexpected events hapun on yor smart kontracts abi wallets._

### Tools to dey yus sekure administrashon of smart kontracts {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** - _ Dis one na Intafase for managing smart kontract administrashon, wey inklude access kontrols, upgrades, and pausing._

- **[Safe](https://safe.global/)** - _ Dis one na smart kontract wallet wey dey run on Ethereum. Im nid minimum numba of pipol to apruf one transakshon bifor im fit hapun (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)** - _ Kontract libraries wey dem dey yus impliment administrative features, wey inklude kontract ownaship, upgrades, access kontrols, gofanans, pauseability, and more._

### Smart kontract auditing savis {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Smart kontract auditing savis dey helep projects akross di blockchain ekosystem make sure say dia protokols dey ready for launch and dem build am to protect users._

- **[CertiK](https://www.certik.com/)** - _ Blockchain sekurity firm wey first start to dey yus kutting-edge formal Verifikashon teknology on smart kontracts and blockchain netwoks._

- **[Trail of Bits](https://www.trailofbits.com/)** - _ Cybersecurity kompany wey dey kombine sekurity risearch wit one attacka mentality to ridus risk and make kode strong._

- **[PeckShield](https://peckshield.com/)** - _ Blockchain sekurity kompany wey dey offa products and savis for di sekurity, privacy, and usability of di entaya blockchain ekosystem._

- **[QuantStamp](https://quantstamp.com/)** - _Auditing service dey facilitate di mainstream adopshon of blockchain teknology thru sekurity and risk assessment savis._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _ Smart kontract sekurity kompany wey dey providie sekurity audits for systems dem distribut._

- **[Runtime Verifikashon](https://runtimeverification.com/)** - _ Na sekurity kompany wey dey speshialize in formal modeling and verifikashon of smart kontracts._

- **[Hacken](https://hacken.io)** - _ Web3 cybersekurity auditor wey dey bring di 360-degree approach to blockchain sekurity._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _ Solidity and Cairo auditing savis wey sure sey di intergrity of smart kontracts and di safety of di users akross Ethereum and Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx dey fokus on blockchain and di smart kontract auditing to sure sey di sekurity of cryptocurrencies, dey provide savis laik smart kontract divelopment, penetrashon testing, blockchain konsulting._

- **[Code4rena](https://code4rena.com/)** - _ Dis one na kompetitive audit platfom wey dey incentivizes smart kontract sekurity experts make dem find wiknes and to helep make web3 more sekure._

- **[CodeHawks](https://codehawks.com/)** - _ Kompetitive audits platfom to dey host smart kontracts auditing kompetitshons for pipol wey dey do sekurity risearch._

- **[Cyfrin](https://cyfrin.io)** - _ Web3 sekurity pawahaus, to dey inkubate crypto sekurity thru products and smart kontract auditing savis._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _ Web3 sekurity firm wey dey give sekurity audits for blockchain systems thru one team wey get ekspiriens auditors and best-in-class tools._

- **[Oxorio](https://oxor.io/)** - _ Smart kontract audits and blockchain sekurity savis wit expatise in EVM, Solidity, ZK, Cross-chain tech for crypto firms and DeFi projects._

- **[Inference](https://inference.ag/)** - _ Sekurity auditing kompany, wey speshialize in smart kontract auditing for EVM-based blockchains. Tanks to im expert auditors wey dem sabi to bi potenshial issues and suggest akshonabol solushons so users fit fix dem bifor deployment._

### Bug bounty platfoms {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Bug bounty platfom for smart kontracts and DeFi projects, wia sekurity risearchas go review kode, disklose wiknes, get paid, and make crypto safer._

- **[HackerOne](https://www.hackerone.com/)** - _ Wiknes koordinashon and bug bounty platfom wey dey konet biznes wit penetrashon testas and cybersekurity risearchas._

- **[HackenProof](https://hackenproof.com/)** - _ Expert bug bounty platfom for crypto projects (DeFi, Smart Kontracts, Wallets, CEX and more), wia sekurity profeshonals dey provide triage savis and risearchas dey get paid for relivant, bug reports wey dem verify._

-  **[Sherlock](https://www.sherlock.xyz/)** - _ Ondawrita in Web3 for smart kontract kecurity, wit payouts for auditors don manaj thru smart kontracts to sekure dat relivant bugs are paid fairly._

-  **[CodeHawks](https://www.codehawks.com/)** - _ Kompetitive bug bounty platfom wia auditors dey take part in sekurity kontests and challenjis, and (soon) in dem own private audits._

### Publikashons of smart kontract wiknes and exploits wey wi sabi {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Smart Kontract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _ Biginna-friendly eksplanashon of di most signifikant kontract wiknes, wit sampol kode for most kases._

- **[SWC Registry](https://swcregistry.io/)** - _ Curated list of Komon Wiknes Enumerashon (CWE) items wey apply to Ethereum smart kontracts._

- **[Rekt](https://rekt.news/)** - _Dis one na publikashon wey dey update regularly for high-profile crypto hacks and exploits, along wit detailed post-mortem reports._

### Palava to dey learn smart kontract sekurity {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _ Kurated list of blockchain sekurity wargames, chanlejis, and [Kapshure di Flag](https://www.webopedia.com/definitions/ctf-event/amp/) kompetishons and solushon writeups._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _ Wargame to learn offensive sekurity of DeFi smart kontracts and build skills in bug-hunting and sekurity auditing._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Web3/Solidity-based wargame wia ish level na smart kontract wey nid to dey 'hacked'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _ Dis one na di smart kontract hacking palava, wey dey set in a fantasy advenshure. Successful komplishon od di chalenj, e go also give dem access to a private bug bounty program._

### Best praktis to dey sekure smart kontracts {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Smart Kontract Sekurity Best Praktis](https://consensys.github.io/smart-contract-best-practices/)** - _ Im get komprehensive list of guidelines to dey sekure Ethereum smart kontracts._

- **[Nascent: Simpol Sekurity Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _ Dis one na koleshon of pratikal sekurity-fokused guides and checklists for smart kontract divelopment._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Dis one na yusful kompilashon of sekure patterns and praktis wey betta pass for di smart kontract programming languaj Solidity._

- **[Solidity Docs: Sekurity Konsiderashons](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Dis one na guidelines to dey write sekure smart kontracts wit Solidity._

- **[Smart Kontract Sekurity Verifikashon Standard](https://github.com/securing/SCSVS)** - _ Fourteen-part shecklist wey dem kreate to standardize di sekurity of smart kontracts for divelopas, architects, sekurity riviewas and vendors._

- **[Learn Smart Kontract Sekurity and Auditing](https://updraft.cyfrin.io/courses/security) - _Dis one na di ogbonge smart kontract sekurity and auditing kourse, wey dem kreate for smart kontract divelopas wey dey look to level up dia sekurity praktis wey betta pass and bikom sekurity risearchas._

### Tutorials on smart kontract sekurity {#tutorials-on-smart-contract-security}

- [Hau to write smart kontracts wey sekure](/developers/tutorials/secure-development-workflow/)

- [Hau yu fit yus Slither to find smart kontract bugs](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [How to use Manticore to find smart contract bugs](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Smart kontract sekurity rules](/developers/tutorials/smart-contract-security-guidelines/)

- [Hau yu fit safely integrate yor token kontract wit arbitrary tokens](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Smart kontracts sekurity and auditing full kourse](https://updraft.cyfrin.io/courses/security)
