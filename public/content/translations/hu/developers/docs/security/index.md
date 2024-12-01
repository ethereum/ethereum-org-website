---
title: Biztonság
description: Biztonsági megfontolások Ethereum fejlesztőknek
lang: hu
---

Az Ethereum okosszerződések rendkívül flexibilisek, képesek nagy mennyiségű tokent tárolni (néha meghaladja az 1 Mrd. Usd-t) és megváltoztathatatlan logikát futtatni, mely korábban telepített okosszerződés kódon alapszik. Bár ez egy élénk és kreatív ökoszisztémát hozott létre a bizalom nélküli, egymással összekapcsolt okosszerződésekből, ugyanakkor tökéletes ökoszisztéma a profitra törekvő támadók számára is, aki az okosszerződések sebezhető pontjainak és az Ethereum váratlan viselkedésének kihasználásával szeretnének profitra szert tenni. Az okosszerződés kódot _általában_ nem lehet megváltoztatni biztonsági hibák javítása céljából, az okosszerződésekből ellopott vagyont nem lehet visszaszerezni, és a lopott vagyont rendkívül nehéz nyomon követni. Az okosszerződés hibák miatt ellopott vagy elveszett érték teljes összege már könnyedén meghaladja az 1 Mrd. USD-t. A nagyobb okosszerződés hibák között van a:

- [Parity multi-sig hiba #1 - 30 millió USD elveszett](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Parity multi-sig hiba#2 - 300 millió USD lekötve](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [A TheDAO hack, 3.6M ETH! Több mint 1 Mrd. USD a mai ETH árfolyamon](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Előfeltételek {#prerequisites}

Ez a cikk az okosszerződés biztonságról szól, így érdemes tisztában lenned az [okosszerződésekkel](/developers/docs/smart-contracts/), mielőtt belekezdenél a biztonságba.

## Hogyan lehet biztonságosabb okosszerződés kódot írni {#how-to-write-more-secure-smart-contract-code}

Mielőtt bármilyen kódot indítanánk a főhálózatra, fontos, hogy megfelelő elővigyázatossággal védjük meg az okosszerződésre rábízott értékeket. Ebben a cikkben néhány konkrét támadást megvitatunk, forrásokat biztosítunk további támadástípusok megismeréséhez, és hagyunk néhány alapvető eszközt és bevált gyakorlatot a szerződések megfelelő és biztonságos működéséhez.

## Az audit nem gyógyír mindenre {#audits-are-not-a-silver-bullet}

Évekkel ezelőtt az okosszerződések írásának, fordításának, tesztelésének és telepítésének eszközei nagyon kiforratlanok voltak, ami sok projektet arra késztettet, hogy rendszertelenül írják a Solidity kódot, majd átadják egy auditornak, aki megvizsgálta a kódot annak biztosítása érdekében, hogy biztonságosan működik-e az elvárásoknak megfelelően. 2020-ban a Solidity írást támogató fejlesztési folyamatok és eszközök lényegesen jobbak; a bevált gyakorlatok felhasználása nemcsak a projekt könnyebb kezelhetőségét biztosítja, hanem a projekt biztonságának létfontosságú része is. Az okosszerződés megírásának végén végzett audit már nem elegendő, mint a projekted egyetlen biztonsági szempontja. A biztonság már az okosszerződés kód első sorának megírása előtt elkezdődik, **a biztonság megfelelő tervezéssel és fejlesztési folyamatokkal kezdődik**.

## Okosszerződés fejlesztési folyamat {#smart-contract-development-process}

Minimum:

- Az összes kódot egy verzió követő rendszer tárolja, mint a git
- Minden kódmódosítást pull requesteken keresztül kell végezni
- Minden pull requestet át kell néznie legalább egy valakinek. _Ha egyedül vagy a projekten, akkor keress valakit aki szintén egyedül van és cseréljetek kód review-kat._
- Egy egyedüli parancs fordítja, telepíti és futtatja a tesztek sorozatát a kódodra egy Ethereum fejlesztői környezet használatával
- Végig futtatod a kódodat valamilyen alapszintű kód analitikai eszközzel, mint a Mythril vagy a Slither, ideálisan mielőtt az egyes pull requesteket mergeled, így össze tudod hasonlítani a végeredményeket
- A Solidity nem fog SEMMILYEN fordítói hibát visszaadni
- A kódot megfelelően dokumentációval kell ellátni

Sokkal többet el lehetne mondani még a fejlesztési folyamatról, de ezek a tételek jó kiindulópontot jelentenek. További szempontért és részletes magyarázatért tekintsd meg a [folyamat minőségi checklistát a DeFiSafety által](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). A [DefiSafety](https://defisafety.com/) egy nemhivatalos közszolgálat, mely értékeléseket publikál különböző nagyobb, nyilvános Ethereum dappról. A DeFiSafety minősítési rendszer egyik része, hogy a projekt mennyire tartja be ezt a folyamat minőségi ellenőrzőlistát. Ezeket a folyamatokat követve:

- Biztonságosabb kódot állítasz elő úrjafelhasználható, automatizált tesztekkel
- Az auditorok hatékonyabban fogják átnézni a projektedet
- Könnyebben tudnak új fejlesztők becsatlakozni
- A fejlesztők gyorsabban tudnak iterálni, tesztelni és visszajelzést kapni a módosításokról
- Kisebb a valószínűsége, hogy projekted visszafejlődést szenved el

## Támadások és sérülékenységek {#attacks-and-vulnerabilities}

Most, hogy a Solidity kódot már egy hatékony fejlesztési folyamat segítségével írod, nézzünk meg néhány általános Solidity biztonsági rést, hogy lássuk, mit ronthatunk el.

### Újbóli belépés (re-entrancy) {#re-entrancy}

Az újbóli belépés az egyik legnagyobb és legjelentősebb biztonsági probléma, melyet figyelembe kell venni okosszerződések fejlesztésekor. Míg az EVM nem tud egyszerre több szerződést futtatni, egy másik szerződést meghívó szerződés szünetelteti a hívó szerződés végrehajtását és memóriaállapotát, amíg a hívás vissza nem tér, ekkor a végrehajtás normálisan halad tovább. Ez a szüneteltetés és újraindítás egy "újbóli belépésnek" nevezett sérülékenységet eredményezhet.

Itt egy egyszerű szerződés verzió, mely ki van téve az újbóli belépésnek:

```solidity
// EZ A SZERZŐDÉS SZÁNDÉKOSAN SÉRÜLÉKENY, NE MÁSOLD LE
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

Ahhoz, hogy egy felhasználó ETH-et utalhasson ki, amit korábban a szerződésben tárolt ez a függvény

1. Leolvassa, a felhasználó egyenlegét
2. Elküldi neki az egyenleg összegét ETH-ben
3. Visszaállítja 0-ra az egyenleget, így nem tudja még egyszer kiutalni az összeget.

Ha meghívja egy normál számla (mint a saját MetaMask számlád), akkor az elvártnak megfelelően működik: msg.sender.call.value() egyszerűen ETH-et küld a számládra. Azonban az okosszerződések is tudnak hívásokat intézni. Ha egy egyedi, rosszindulatú szerződés a `withdraw()` függvény meghívója, akkor a msg.sender.call.value() nem csak `amount` összegű ETH-et fog küldeni, hanem implicit módon meghívja a szerződést, hogy elindítsa a kód végrehajtást. Képzeld el ezt a következő rosszindulatú szerződést:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Az Attacker.beginAttack() meghívása egy ciklust fog beindítani, mely valahogy így néz ki:

```
0.) A támadó EOA-ja (external owned account) meghívja a Attacker.beginAttack() függvényt 1 ETH-tel
0.) Az Attacker.beginAttack() beutal 1 ETH-et a Victim-be

  1.) Attacker -> Victim.withdraw()
  1.) Victim leolvassa a balanceOf[msg.sender] értéket
  1.) Victim ETH-et küld Attacker-nek (mely végrehajtja az alapértelmezett függvényt)
    2.) Attacker -> Victim.withdraw()
    2.) Victim leolvassa a balanceOf[msg.sender] értéket
   2.) Victim ETH-et küld Attacker-nek (mely végrehajtja az alapértelmezett függvényt)
      3.) Attacker -> Victim.withdraw()
      3.) Victim leolvassa a balanceOf[msg.sender] értéket
      3.) Victim ETH-et küld Attacker-nek (mely végrehajtja az alapértelmezett függvényt)
        4.) Attacker-nek nincs több gáza, hívás nélkül visszatér
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (már 0 volt az értéke)
  1.) balances[msg.sender] = 0; (már 0 volt az értéke)
```

Az Attacker.beginAttack meghívása 1 ETH-tel egy újbóli belépés támadást fog indítani Victim ellen, ezzel több ETH-et kiutalva, mint amennyit beletesz (melyet más felhasználók egyenlegéből vont le, így a Victim szerződés alulfedezetté válik)

### Hogyan kezeljük az újbóli belépést (a rosszabb mód) {#how-to-deal-with-re-entrancy-the-wrong-way}

Fontolóra lehet venni az újbóli belépés kezelését azzal, hogy egyszerűen megakadályozzuk az okosszerződések interakcióját a kóddal. A stackoverflow-n az alábbi kód részletet lehet megtalálni rengeteg pozitív szavazattal:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Értelmesnek tűnik: a szerződésnek van kódja, ha a hívónak van kódja, akkor nem engedi letétet elhelyezni. Adjuk hozzá ezt:

```solidity
// EZ A SZERZŐDÉS SZÁNDÉKOSAN SÉRÜLÉKENY, NE MÁSOLD LE
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- ÚJ SOR
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

Ebben az esetben ahhoz, hogy ETH letétet tudj elhelyezni, az címeden nem szabad okosszerződés kódnak lennie. Azonban ezt könnyen meg lehet kerülni a következő Attacker szerződéssel:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- Új sor
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Míg az első támadás a szerződés logikája elleni támadás volt, ez az Ethereum szerződések telepítési viselkedése elleni támadás. A konstrukció alatt a szerződés nem adja vissza a kódját telepítettként a címén, de a teljes EVM kontrollt megtartja a folyamat ALATT.

Technikailag lehetséges megakadályozni az okosszerződéseket, hogy meghívják a kódodat ezzel a sorral:

```solidity
require(tx.origin == msg.sender)
```

Azonban ez még mindig nem egy jó megoldás. Az Ethereum egyik legizgalmasabb aspektusa az összeállíthatóság, amikor az okosszerződések integrálódnak és egymásra épülnek. A fenti sor használatával korlátozod a projekted hasznosságát.

### Hogyan kezeljük az újbóli belépést (a jobb mód) {#how-to-deal-with-re-entrancy-the-right-way}

Egyszerűen a tárhely frissítés és a külső hívás sorrendjének felcserélésével meg tudjuk akadályozni az újbóli belépés feltételét, mely lehetővé tette a támadást. A withdraw visszahívása, amíg lehetséges, nem lesz jövedelmező a támadó számára, mivel a `balances` tárhely már 0 értékre lesz állítva.

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

A fenti kód a "Checks-Effects-Interactions" tervezési mintát követi, amely segít megvédeni az újbóli belépéstől. Többet [olvashatsz itt a Checks-Effects-Interactions-ról itt](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Hogyan kezeljük az újbóli belépést (ágyúval verébre) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Bármikor amikor ETH-et küldesz egy nem megbízható címre vagy interakcióba lépsz egy ismeretlen szerződéssel (vagyis meghívod a `transfer()` függvényét egy felhasználó által biztosított token címnek), kitetté válsz egy lehetséges újbóli belépéses támadásnak. **Olyan szerződések tervezésével, melyek sem az ETH küldést, sem a nem megbízható szerződések hívását sem támogatják, megelőzhető egy lehetséges újbóli belépés!**

## Több támadás típus {#more-attack-types}

A fenti támadástípusok az okosszerződések kódjához (újbóli belépés) és az Ethereum furcsaságaihoz kapcsolódnak (kód futtatása a szerződés konstruktoron belül, mielőtt a kód elérhető lenne a szerződés címén). Sok, sok más fajta támadás típus létezik, melyekre figyelni kell, mint a:

- Front-running
- ETH küldés elutasítás
- Integer overflow/underflow

További olvasnivaló:

- [Consensys Okosszerződés Ismet Támadások](https://consensys.github.io/smart-contract-best-practices/attacks/) - Egy nagyon olvasmányos magyarázat a legkomolyabb sérülékenységekről, a legtöbbhöz minta kóddal is.
- [SWC Registry](https://swcregistry.io/docs/SWC-128) - A CWE válogatott listája, mely az Ethereumra és az okosszerződésekre is érvényes

## Biztonsági eszközök {#security-tools}

Bár nem helyettesítheti az Ethereum biztonsági alapismereteinek megértését és a szakmai auditáló cég bevonását a kód felülvizsgálatába, számos eszköz áll rendelkezésre a kódban felmerülő lehetséges problémák kiemelésére.

### Okosszerződés Biztonság {#smart-contract-security}

**Slither -** **_Solidity statikus analízis keretrendszer Python 3-ban írva._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_Biztonsági analízis API Ethereum okos szerződéseknek_**

- [mythx.io](https://mythx.io/)
- [Dokumentáció](https://docs.mythx.io/en/latest/)

**Mythril -** **_Biztonsági analitika eszköz EVM bájt-kódra._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Dokumentáció](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Egy Cli, ami egy szimbolikus futtató eszközt használ okosszerződésekre és binary-kre._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Dokumentáció](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Biztonsági szkenner Ethereum okosszerződésekre._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Egy ellenőrző eszköz arra, hogy egy szerződés megfelel-e az ERC20 szabványnak._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Fórum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Formális Ellenőrzés {#formal-verification}

**Formális Ellenőrzés információ**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _Jan 29, 2018 - Bernard Mueller_

### Eszközök használata {#using-tools}

A két legnépszerűbb okosszerződés biztonsági analitikai eszköz:

- [Slither](https://github.com/crytic/slither) a [Trail of Bits által](https://www.trailofbits.com/) (hosztolt verzió: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) a [ConsenSys által](https://consensys.net/) (hosztolt verzió: [MythX](https://mythx.io/))

Mindkettő hasznos eszköz a kód elemzésére és a problémák jelentésére. Mindkettőnek van egy [commercial] hosztolt verziója, de ingyenesen is lehet őket lokálisan futtatni. Az alábbiakban bemutatunk egy gyors példát a Slither futtatására, amely egy kényelmes Docker image-dzsel érhető el: `trailofbits/eth-security-toolbox`. Szükség lesz a [Docker telepítésére, ha még nincs feltelepítve](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Ez a kimenetet fogja generálni:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

A Slither itt azonosította az újbóli belépés lehetőségét, meghatározta azokat a kulcsfontosságú sorokat, ahol a probléma felmerülhet, és linket adott a probléma további részleteihez:

> Referencia: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

mely lehetővé teszi, hogy gyorsan megismerd a potenciális problémákat a kódoddal. Mint minden automatizált tesztelő eszköz, a Slither sem tökéletes, és a jelentések esetében hibázik túl sokat. Akkor is figyelmeztet potenciális újbóli belépésről, ha nincs is kihasználható sérülékenység. Gyakran a DIFFERENCE megtekintése a kód változtatások között a Slitherben rendkívüli felvilágosítással bírhat, mely segít felderíteni olyan sérülékenységeket, melyek sokkal korábban jöttek elő, minthogy a projekt kódja készen állt volna.

## További olvasnivaló {#further-reading}

**Okosszerződés Biztonság Bevált Gyakorlatok Útmutató**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [A biztonsági ajánlások és a bevált gyakorlatok összesített gyűjteménye](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Smart Contract Security Verification Standard (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_

## Kapcsolódó útmutatók {#related-tutorials}

- [Biztonságos fejlesztési workflow](/developers/tutorials/secure-development-workflow/)
- [A Slither használata okosszerződés bugok felderítésére](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [A Manticore használata okosszerződés bugok felderítésére](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Biztonsági irányelvek](/developers/tutorials/smart-contract-security-guidelines/)
- [Token biztonság](/developers/tutorials/token-integration-checklist/)
