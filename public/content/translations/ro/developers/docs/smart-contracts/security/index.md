---
title: Securitatea contractelor inteligente
description: Considerații de securitate pentru dezvoltatorii Ethereum
lang: ro
---

Contractele inteligente Ethereum sunt extrem de flexibile, capabile atât să dețină cantități mari de tokenuri (de multe ori peste 1 miliard USD), cât și să ruleze o logică imuabilă pe baza codului de contract inteligent implementat anterior. Pe de-o parte, acest lucru a creat un ecosistem vibrant și creativ de contracte inteligente ce nu necesită autorizarea, interconectate, dar este şi ecosistemul perfect pentru a atrage atacatorii care doresc să profite prin exploatarea vulnerabilității din contractele inteligente și a comportamentului neașteptat în Ethereum. Codul de contract inteligent, _de obicei_ nu poate fi schimbat ca să fie remediate defectele de securitate; activele care au fost furate din contracte inteligente sunt irecuperabile, iar activele furate sunt extrem de dificil de urmărit. The total of amount of value stolen or lost due to smart contract issues is easily over $1B. Unele dintre cele mai mari pierderi din cauza erorilor de programare a contractelor inteligente includ:

- [Problema nr. 1 cu Parity Multi-Sign - 30 mil. USD pierduți](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema nr. 2 cu Parity Multi-Sign - 300 mil. USD blocați](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [Atacul TheDAO, 3,6 mil. USD în ETH! Peste 1 mld. USD la prețul ETH-ului de astăzi](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Condiții prealabile {#prerequisites}

Se va vorbi despre securitatea contractelor inteligente, de aceea aveţi grijă să vă familiarizaţi cu [contractele inteligente](/developers/docs/smart-contracts/) înainte de a aborda securitatea.

## Cum să scrieţi coduri de contracte inteligente mai securizate {#how-to-write-more-secure-smart-contract-code}

Înainte de a lansa orice cod pe Mainnet, este important să luaţi suficiente măsuri de precauție pentru a proteja lucrurile de valoare încredințate contractului dvs. inteligent. În acest articol vom discuta despre câteva atacuri specifice, vă vom oferi resurse pentru a afla mai multe despre diferite tipuri de atacuri și vă vom furniza câteva instrumente de bază și cele mai bune practici pentru a vă garanta funcționarea corectă a contractelor dvs.

## Auditurile nu sunt o soluție perfectă {#audits-are-not-a-silver-bullet}

Cu ani înainte, instrumentele pentru scrierea, compilarea, testarea și implementarea contractelor inteligente erau foarte imature, permițând multor proiecte să scrie codul Solidity în moduri întâmplătoare, să îl arunce peste „gard” către un auditor care ar investiga codul pentru a se asigura că acesta funcționează securizat și conform aşteptărilor. În 2020, procesele de dezvoltare și instrumentele care acceptă scrierea Solidity sunt mult perfecţionate; valorificarea acestor bune practici nu numai că garantează facilitatea de gestionare a proiectuliu dvs., ci este o parte vitală a securității lui. Nu mai este suficient să auditaţi contractul inteligent când l-aţi terminat de scris ca singur aspect de care să ţineţi cont privind securitatea proiectului dvs. Securitatea începe înainte de a scrie prima linie de cod de contract inteligent, **securitatea începe cu procese de proiectare și dezvoltare corespunzătoare**.

## Procesul de dezvoltare a contractelor Inteligente {#smart-contract-development-process}

Cerințe minime:

- Toate codurile să fie stocate într-un sistem de control al versiunii, cum ar fi Git
- Toate modificările de cod să fie efectuate prin Pull Request-uri
- Toate Solicitările Pull să aibă cel puțin un examinator. _Dacă aveţi un proiect solo, gândiţi-vă să găsiţi un alt autor solo și negociaţi cu el recenzii de coduri!_
- Să existe o singură comandă care să compileze, să implementeze și să rulează o suită de teste cu codul dvs. utilizând un mediu Ethereum de dezvoltare
- Să rulaţi codul prin instrumente de analiză a codului de bază, cum ar fi Mythril și Slither, în mod ideal înainte ca fiecare Pull Request să fie acceptat, comparând diferențele rezultatelor
- Solidity să nu emită NICIUN avertisment al compilatorului
- Codul dvs. să fie bine documentat

Sunt mult mai multe de spus despre procesul de dezvoltare, dar este bine să începem cu aceste elemente. Pentru a afla mai multe elemente și explicații detaliate, consultaţi [lista de verificare a calității procesului furnizată de DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) este un serviciu public neoficial care publică recenzii despre diverse aplicații mari dApp de pe Ethereum publice. Un criteriu al sistemului de evaluare DeFiSafety este cât de bine aderă proiectul la această listă de verificare a calității procesului. Urmând aceste procese:

- Veţi produce un cod mai securizat, prin teste automate, reproductibile
- Veţi permite revizuirea proiectului în mod mai eficient de către auditori
- O mai ușoară integrare a noilor dezvoltatori
- Veţi permite dezvoltatorilor să itereze rapid, să testeze și să obțină feedback despre modificări
- Va fi mai puţin probabil ca proiectul dvs. să regreseze

## Atacuri și vulnerabilități {#attacks-and-vulnerabilities}

După ce aţi aflat cum să scrieţi cod Solidity folosind un proces de dezvoltare eficient, să analizăm câteva vulnerabilități comune din Solidity pentru a vedea unde se poate poticni.

### Re-intrare {#re-entrancy}

Re-intrarea este una dintre cele mai mari și mai semnificative probleme de securitate de luat în considerare atunci când se dezvoltă contracte inteligente. Deși EVM nu poate executa mai multe contracte simultan, un contract care apelează un alt contract întrerupe executarea contractului de apelare și starea memoriei până când apelul revine, moment în care executarea se desfășoară în mod normal. Această întrerupere și re-pornire poate crea o vulnerabilitate cunoscută sub numele de „re-intrare”.

Iată o versiune simplă a unui contract care este vulnerabil la re-intrare:

```solidity
// ACEST CONTRACT ARE VULNERABILITATE INTENȚIONATĂ, NU COPIA
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

Pentru a permite unui utilizator să retragă ETH-ul stocat anterior în contract, această funcție

1. Citește valoarea soldului unui utilizator
2. Îi trimite valoarea soldului în ETH
3. Resetează soldul la 0, deci nu își mai poate retrage din nou soldul.

If called from a regular account (such as your own MetaMask account), this functions as expected: msg.sender.call.value() simply sends your account ETH. Cu toate acestea, contractele inteligente pot efectua și ele apeluri. Dacă un contract personalizat rău intenționat este cel care apelează `withdraw()`, msg.sender.call.value() nu numai că va trimite `amount` de ETH, dar va apela implicit și contractul pentru a începe executarea codului. Imaginaţi-vă acest contract răuvoitor:

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

Apelarea Attacker.beginAttack() va începe un ciclu care arată cam aşa:

```
0.) Atacatorul EOA apelează Attacker.beginAttack() cu 1 ETH
0.) Attacker.beginAttack() depozitează 1 ETH în Victimă

  1.) Atacant -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Victima trimite ETH Atacantului (care execută funcția implicită)
    2.) Atacant -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Victima trimite ETH Atacantului (care execută funcția implicită)
      3.) Atacant -> Victim.withdraw()
      3.) Victim reads balances[msg.sender]
      3.) Victima trimite ETH Atacantului (care execută funcția implicită)
        4.) Atacantul nu mai are suficient gaz, se întoarce fără să apeleze din nou
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (a fost deja 0)
  1.) balances[msg.sender] = 0; (a fost deja 0)
```

Apelarea Attacker.beginAttack cu 1 ETH va ataca prin re-intrare Victima, retrăgând mai mult ETH decât a furnizat (luat din soldurile altor utilizatori, iar din această cauză contractul Victimă ajunge să fie sub-garantat)

### Cum să abordaţi re-intrarea (modul greșit) {#how-to-deal-with-re-entrancy-the-wrong-way}

Aţi putea lua în calcul interziceţi re-intrarea împiedicând orice contract inteligent să interacționeze cu codul dvs. Când căutaţi stackoverflow, descoperiţi că acest fragment de cod (snippet) are tone de voturi pozitive:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Pare să aibă sens: contractele au cod, iar dacă apelantul are vreun cod, nu i se permite să depună. Haideţi să îl adăugăm:

```solidity
// ACEST CONTRACT ARE VULNERABILITATE INTENȚIONATĂ, NU COPIA
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- LINIE NOUĂ
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

Acum nu trebuie să aveţi codul de contract inteligent în adresa dvs. pentru a depune ETH. Totuși, se poate depăşi această situaţie cu următorul contract Atacator:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- Linie nouă
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

În timp ce primul atac a fost un atac asupra logicii contractelor, acesta este un atac asupra comportamentului de implementare a contractului Ethereum. În timpul construcției, un contract nu a răspuns prin codul său încă pentru a fi implementat la adresa sa, dar păstrează controlul complet EVM ÎN TIMPUL acestui proces.

Din punct de vedere tehnic, este posibil să împiedicaţi contractele inteligente să vă apeleze codul utilizând această linie:

```solidity
require(tx.origin == msg.sender)
```

Totuși, aceasta nu este încă o soluție bună. Unul dintre cele mai interesante aspecte ale lui Ethereum este combinabilitatea: contractele inteligente se integrează unul cu altul și se construiesc bizuindu-se unul pe celălalt. Prin utilizarea liniei de mai sus, vă limitaţi utilitatea proiectului.

### Cum să abordaţi re-intrarea (modul corect) {#how-to-deal-with-re-entrancy-the-right-way}

Prin simpla comutare a ordinii actualizării de stocare și a apelului extern, eliminăm condiția de re-intrare care a permis atacul. Apelarea înapoi la „withdraw” (retragere) cât timp este încă posibil nu va avantaja atacantul, deoarece `soldul` stocării va fi deja setat la 0.

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

Codul de mai sus urmează modelul de concept „Verificări-Efecte-Interacțiuni”, care ajută la protejarea împotriva re-intrării. Puteţi [citi mai multe despre Verificări-Efecte-Interacțiuni aici](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Cum să abordaţi re-intrarea (opțiunea nucleară) {#how-to-deal-with-re-entrancy-the-nuclear-option}

De fiecare dată când trimiteți ETH la o adresă care nu este de încredere sau interacționaţi cu un contract necunoscut (cum ar fi apelarea `transfer()` a unei adrese de token furnizate de utilizator), faceţi loc chiar dvs. posibilităţii de re-intrare. **Proiectând contracte care nici nu trimit ETH, și nici nu apelează contracte nesigure, eliminaţi posibilitatea re-intrării!**

## Mai multe tipuri de atacuri {#more-attack-types}

Tipurile de atac de mai sus tratează problemele de programare a contractelor inteligente (re-intrarea) și ciudățeniile din Ethereum (executarea codului în interiorul constructorilor de contracte înainte ca acest cod să fie disponibil la adresa contractului). Există multe, multe alte tipuri de atacuri despre care trebuie să știţi, cum ar fi:

- Front-running
- Refuzul de a trimite ETH
- Depăşiri/sub-depăşiri de numere întregi

Referințe suplimentare:

- [Atacuri cunoscute ale contractelor inteligente Consensys](https://consensys.github.io/smart-contract-best-practices/attacks/) - O explicație foarte lizibilă a celor mai semnificative vulnerabilități, majoritatea cu un exemplu de cod.
- [Registru SWC](https://swcregistry.io/docs/SWC-128) - Lista selectată de CWE-uri care se aplică la Ethereum și la contractele inteligente

## Instrumente de securitate {#security-tools}

Deși este de neînlocuit înțelegerea elementelor de bază ale securității Ethereum și angajarea unei firme de audit profesionale pentru a vă examina codul, există multe instrumente disponibile pentru a evidenția problemele potențiale cu codul dvs.

### Securitatea contractelor inteligente {#smart-contract-security}

**Slither -** **_framework de analiză statică Solidity scris în Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API de analiză de securitate pentru contractele inteligente Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentație](https://docs.mythx.io/)

**Mythril -** **_instrument de analiză de securitate pentru bytecode-ul EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentație](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_o interfață tip linie de comandă care utilizează un instrument de execuție simbolică pe contracte inteligente și binare._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentație](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_scanner de securitate pentru contractele inteligente Ethereum_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_un instrument de verificare folosit pentru a controla conformitatea unui contract cu standardul ERC20._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificare formală {#formal-verification}

**Informații despre verificarea formală**

- [Cum funcționează verificarea formală a contactelor inteligente](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 Iulie 2018 - Brian Marick_
- [Modul în care verificarea formală poate asigura contracte inteligente fără greşeli](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 ianuarie 2018 - Bernard Mueller_

### Folosirea instrumentelor {#using-tools}

Două dintre cele mai populare instrumente pentru analiza securității contractelor inteligente sunt:

- [Slither](https://github.com/crytic/slither) de [Trail of Bits](https://www.trailofbits.com/) (versiune găzduită: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) by [ConsenSys](https://consensys.net/) (versiune găzduită: [MythX](https://mythx.io/))

Ambele sunt instrumente utile care vă analizează codul și raportează probleme. Fiecare are o versiune [commercial] găzduită, dar și o versiune gratuită pentru a rula local. Urmează un exemplu rapid al modalităţii de rulare a Slither, care este disponibil într-o imagine Docker convenabilă `trailofbits/eth-security-toolbox`. Va trebui să [instalaţi Docker dacă nu l-aţi instalat deja](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Va genera rezultatul următor:

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

Slither a identificat aici potențialul de re-intrare, identificând liniile cheie în care ar putea apărea problema, oferindu-ne un link pentru mai multe detalii despre problemă:

> Referință: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

permițându-vă să aflaţi rapid despre potențialele probleme cu codul. Ca toate instrumentele de testare automată, Slither nu este perfect și greșește, raportând prea mult. Poate avertiza despre o potențială re-intrare, chiar și atunci când nu există o vulnerabilitate exploatabilă. Adesea, revizuirea DIFERENȚEI modificării codului la rezultatele Slither este extrem de folositoare, ajutând la descoperirea de vulnerabilități introduse cu mult înainte decât aşteptând până la codificarea completă a proiectului dvs.

## Referințe suplimentare {#further-reading}

**Ghid de bune practici pentru securitatea contractelor inteligente**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Colecție agregată de recomandări și bune practici pentru securitate](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standardul de verificare a securității contractelor inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Tutoriale corelate {#related-tutorials}

- [Flux de lucru pentru dezvoltarea securizată](/developers/tutorials/secure-development-workflow/)
- [Cum se folosește Slither pentru a depista bug-urile din contractele inteligente](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cum se folosește Manticore pentru a depista bug-urile din contractele inteligente](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Instrucţiuni pentru securitate](/developers/tutorials/smart-contract-security-guidelines/)
- [Token de securitate](/developers/tutorials/token-integration-checklist/)
