---
title: Securitate
description: Considerații de securitate pentru programatorii Ethereum
lang: ro
---

Contractele inteligente Ethereum sunt extrem de flexibile, capabile atât să dețină cantități mari de tokenuri (de multe ori mai mari de 1 miliard USD), cât și să ruleze o logică imuabilă pe baza codului de contract inteligent desfășurat anterior. Deși acest lucru a creat un ecosistem vibrant și creativ de contracte inteligente fără încredere, interconectate, este de asemenea, ecosistemul perfect pentru a atrage atacatorii care doresc să profite prin exploatarea vulnerabilității din contractele inteligente și a comportamentului neașteptat în Ethereum. Codul de contract inteligent, _de obicei_ nu poate fi schimbat ca să fie reparate defectele de securitate, activele care au fost furate din contracte inteligente sunt irecuperabile, iar activele furate sunt extrem de dificil de urmărit. Suma totală a valorii furate sau pierdute din cauza problemelor de contract inteligent este cu ușurință de 1 miliard de dolari. Unele dintre cele mai mari pierderi din cauza erorilor de codare a contractelor inteligente includ:

- [Problema nr. 1 cu Parity Multi-Sign - 30 mil. de dolari pierduți](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema nr. 2 cu Parity Multi-Sign - 300 mil. de dolari blocați](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [Piratare DAO, 3.6 mil. de dolari ETH! Peste 1 mld. de dolari în prețurile ETH de astăzi](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Condiții prealabile {#prerequisites}

Aceasta va acoperi securitatea contractelor inteligente, de aceea asigură-te că ești familiarizat cu [contractele inteligente](/developers/docs/smart-contracts/) înainte de a aborda securitatea.

## Cum să scrii coduri de contracte inteligente mai sigure {#how-to-write-more-secure-smart-contract-code}

Înainte de a lansa orice cod pe rețeaua principală, este important să iei suficiente măsuri de precauție pentru a proteja lucrurile de valoare încredințate contractului inteligent. În acest articol, vom discuta câteva atacuri specifice, îți vom oferi resurse pentru a afla mai multe despre diferite tipuri de atacuri și îți vom lăsa câteva instrumente de bază și cele mai bune practici pentru a te asigura de funcționarea corectă a contractelor tale.

## Auditurile nu sunt o soluție perfectă {#audits-are-not-a-silver-bullet}

Cu ani înainte, instrumentele pentru scrierea, compilarea, testarea și implementarea contractelor inteligente erau foarte imature, permițând multor proiecte să scrie codul Solidity în moduri întâmplătoare, să-l arunce peste „gard” către un auditor care ar investiga codul pentru a se asigura că acesta funcționează în siguranță și cum era de așteptat. În 2020, procesele de dezvoltare și instrumentele care sprijină scrierea Solidity sunt semnificativ mai bune; valorificarea acestor bune practici nu numai că asigură că proiectul tău este mai ușor de gestionat, ci este o parte vitală a securității lui. Un audit la sfârșitul redactării contractului tău inteligent nu mai este suficient ca singurul aspect de securitate pe care îl ia proiectul tău. Securitatea începe înainte de a scrie prima linie de cod de contract inteligent, **securitatea începe cu procese de proiectare și dezvoltare corespunzătoare**.

## Procesul de dezvoltare al contractelor Inteligente {#smart-contract-development-process}

Cel puțin:

- Toate codurile stocate într-un sistem de control al versiunii, cum ar fi Git
- Toate modificările de cod efectuate prin Solicitări Pull
- Toate Solicitările Pull au cel puțin un examinator. _Dacă ești într-un proiect solo, ia în considerare găsirea unui alt autor solo și negociază cu el recenzii de coduri!_
- O singură comandă compilează, implementează și rulează o suită de teste împotriva codului tău utilizând un mediu Ethereum de dezvoltare
- Ai rulat codul prin instrumente de analiză a codului de bază, cum ar fi Mythril și Slither, în mod ideal înainte ca fiecare solicitare de extragere să fie îmbinată, comparând diferențele de ieșire
- Solidity nu emite NICIUN avertisment al compilatorului
- Codul tău este bine documentat

Sunt mult mai multe de spus despre procesul de dezvoltare, dar aceste elemente sunt un loc bun de început. Pentru mai multe elemente și explicații detaliate, consultă [lista de verificare a calității procesului furnizată de DeFiSafety](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) este un serviciu public neoficial care publică diverse recenzii despre mari aplicații dapp Ethereun publice. O parte a sistemului de evaluare DeFiSafety include cât de bine aderă proiectul la această listă de verificare a calității procesului. Urmând aceste procese:

- Vei produce un cod mai sigur, prin teste automate, reproductibile
- Vei permite revizuirea proiectului mai eficient de către auditori
- Vei integra mai ușor noi programatori
- Vei permite programatorilor să itereze rapid, să testeze și să obțină feedback despre modificări
- Vei avea mai puține șanse ca proiectul să aibă regresii

## Atacuri și vulnerabilități {#attacks-and-vulnerabilities}

După ce ai aflat cum să scrii cod Solidity folosind un proces de dezvoltare eficient, să analizăm câteva vulnerabilități comune Solidity pentru a vedea ce nu poate să meargă bine.

### Re-intrare {#re-entrancy}

Re-intrarea este una dintre cele mai mari și mai semnificative probleme de securitate de luat în considerare atunci când se dezvoltă contracte inteligente. Deși EVM nu poate executa mai multe contracte simultan, un contract care apelează un alt contract, întrerupe executarea contractului de apelare și starea memoriei până când apelul revine, moment în care executarea se desfășoară în mod normal. Această întrerupere și re-pornire poate crea o vulnerabilitate cunoscută sub numele de „re-intrare”.

Aici este o versiune simplă a unui contract care este vulnerabil la re-intrare:

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
2. Le trimite valoarea soldului în ETH
3. Resetează soldul la 0, deci nu își mai pot retrage din nou soldul.

Dacă este apelată dintr-un cont obișnuit (cum ar fi propriul tău cont MetaMask), acest lucru funcționează așa cum te aștepți: msg.sender.call.value() pur și simplu trimite contul ETH. Cu toate acestea, contractele inteligente pot efectua și ele apeluri. Dacă un contract personalizat, rău intenționat este cel care apelează `withdraw()`, msg.sender.call.value() nu numai că va trimite `amount` din ETH, va apela implicit și contractul pentru a începe executarea codului. Imaginează-ți acest contract răuvoitor:

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

Apelarea Attacker.beginAttack() va începe un ciclu care arată ceva de genul:

```
0.) Atacatorul EOA apelează Attacker.beginAttack() cu 1 ETH
0.) Attacker.beginAttack() depozitează 1 ETH în Victimă

  1.) Atacant -> Victim.withdraw()
  1.) Victima citește balanceOf[msg.sender]
  1.) Victima trimite ETH Atacantului (care execută funcția implicită)
    2.) Atacant -> Victim.withdraw()
    2.) Victima citește balanceOf[msg.sender]
    2.) Victima trimite ETH Atacantului (care execută funcția implicită)
      3.) Atacant -> Victim.withdraw()
      3.) Victima citește balanceOf[msg.sender]
      3.) Victima trimite ETH Atacantului (care execută funcția implicită)
        4.) Atacantul nu mai are suficient gaz, se întoarce fără să apeleze din nou
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (a fost deja 0)
  1.) balances[msg.sender] = 0; (a fost deja 0)
```

Apelul Attacker.beginAttack cu 1 ETH va ataca prin re-intrare Victima, retrăgând mai mult ETH decât a furnizat (luat din soldurile altor utilizatori, cauzând contractul Victimă să devină sub-garantat)

### Cum să te descurci cu re-intrarea (modul greșit) {#how-to-deal-with-re-entrancy-the-wrong-way}

Ai putea lua în calcul să învingi re-intrarea împiedicând orice contract inteligent să interacționeze cu codul tău. Când cauți stackoverflow, găsești acest fragment de code (snippet) cu tone de voturi pozitive:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Pare să aibă sens: contractele au cod, dacă apelantul are orice cod, nu-i permite să depună. Hai să-l adăugăm:

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

Acum, pentru a depune ETH, nu trebuie să ai codul de contract inteligent în adresa ta. Totuși, acest lucru este ușor de învins cu următorul contract Atacator:

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

În timp ce primul atac a fost un atac asupra logicii contractelor, acesta este un atac asupra comportamentului de implementare a contractului Ethereum. În timpul construcției, un contract nu a returnat codul său încă pentru a fi implementat la adresa sa, dar păstrează controlul complet EVM ÎN TIMPUL acestui proces.

Din punct de vedere tehnic, este posibil să împiedici contractele inteligente să-ți apeleze codul, utilizând această linie:

```solidity
require(tx.origin == msg.sender)
```

Totuși, aceasta nu este încă o soluție bună. Unul dintre cele mai interesante aspecte ale Ethereum este combinabilitatea: contractele inteligente se integrează și se construiesc unul pe celălalt. Prin utilizarea liniei de mai sus, limitezi utilitatea proiectului.

### Cum să te descurci cu re-intrarea (modul corect) {#how-to-deal-with-re-entrancy-the-right-way}

Prin simpla comutare a ordinii actualizării de stocare și a apelului extern, prevenim condiția de re-intrare care a permis atacul. Apelarea înapoi la „withdraw” (retragere), cât timp este încă posibil, nu va avantaja atacantul, deoarece `soldul` stocării va fi deja setat la 0.

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

Codul de mai sus urmează modelul de design „Verificări-Efecte-Interacțiuni”, care ajută la protejarea împotriva re-intrării. Poți [citi mai multe despre Verificări-Efecte-Interacțiuni aici](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Cum să te descurci cu re-intrarea (opțiunea nucleară) {#how-to-deal-with-re-entrancy-the-nuclear-option}

De fiecare dată când trimiți ETH la o adresă care nu este de încredere sau interacționezi cu un contract necunoscut (cum ar fi apelarea `transfer()` a unei adrese de token furnizate de utilizator), te deschizi singur la posibilitatea re-intrării. **Proiectând contracte care nu trimit nici ETH și nici nu apelează contracte nesigure, împiedici posibilitatea re-intrării!**

## Mai multe tipuri de atac {#more-attack-types}

Tipurile de atac de mai sus acoperă probleme de codificare a contractelor inteligente (re-intrare) și ciudățenii Ethereum (executarea codului în interiorul constructorilor de contracte, înainte ca acest cod să fie disponibil la adresa contractului). Există multe, multe alte tipuri de atac de care trebuie să știi, cum ar fi:

- Front-running
- Refuzul de a trimite ETH
- Overflow/underflow de numere întregi

Referințe suplimentare:

- [Atacuri cunoscute a contractelor inteligente Consensys](https://consensys.github.io/smart-contract-best-practices/attacks/) - O explicație foarte lizibilă a celor mai semnificative vulnerabilități, majoritatea cu un exemplu de cod.
- [Registru SWC](https://swcregistry.io/docs/SWC-128) - Lista selectată de CWE-uri care se aplică la Ethereum și la contractele inteligente

## Instrumente de securitate {#security-tools}

Deși nu există nici un substitut pentru înțelegerea elementelor de bază ale securității Ethereum și angajarea unei firme de audit profesionale pentru a-ți examina codul, există multe instrumente disponibile pentru a evidenția probleme potențiale cu codul tău.

### Securitatea contractelor inteligente {#smart-contract-security}

**Slither -** **_cadru de analiză statică a Solidity scris în Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API de analiză de securitate pentru contracte inteligente Ethereum._**

- [mythx.io](https://mythx.io/)
- [Documentație](https://docs.mythx.io/en/latest/)

**Mythril -** **_instrument de analiză de securitate pentru bytecode EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentație](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_o interfață tip linie de comandă care utilizează un instrument de execuție simbolică pe contracte inteligente și binare._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentație](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_scaner de securitate pentru contracte inteligente Ethereum_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_un instrument de verificare folosit pentru a controla conformitatea unui contract cu standardul ERC20A._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verificare formală {#formal-verification}

**Informații despre verificarea formală**

- [Cum funcționează verificarea formală a contactelor inteligente](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _Iulie 2018 - Brian Marick_
- [Modul în care verificarea formală poate asigura contracte inteligente fără greșeală](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 ianuarie 2018 - Bernard Mueller_

### Folosirea instrumentelor {#using-tools}

Două dintre cele mai populare instrumente pentru analiza securității contractelor inteligente sunt:

- [Slither](https://github.com/crytic/slither) by [Trail of Bits](https://www.trailofbits.com/) (versiune găzduită:[Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) by [ConsenSys](https://consensys.net/) (versiune găzduită: [MythX](https://mythx.io/))

Ambele sunt instrumente utile care analizează codul tău și raportează probleme. Fiecare are o versiune [commercial] găzduită, dar și o versiune gratuită pentru a rula local. Următorul este un exemplu rapid de cum să rulezi Slither, care este disponibil într-o imagine Docker convenabilă `trailofbits/eth-security-toolbox`. Va trebui să [instalezi Docker-ul dacă nu l-ai instalat deja](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Va genera această ieșire:

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

Slither a identificat potențialul de re-intrare aici, identificând liniile cheie în care ar putea apare problema, oferindu-ne un link pentru mai multe detalii despre problemă:

> Referință: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

permițându-ți să afli rapid despre probleme potențiale cu codul. Ca toate instrumentele de testare automată, Slither nu este perfect și greșește, raportând prea mult. Poate avertiza despre o potențială re-intrare, chiar și atunci când nu există o vulnerabilitate exploatabilă. Adesea, revizuirea DIFERENȚEI modificării codului în ieșirile Slither, este extrem de folositoare, ajutând la descoperirea de vulnerabilități care au fost introduse mult mai devreme decât să aștepți până când proiectul tău este complet codificat.

## Referințe suplimentare {#further-reading}

**Ghid de practici bune în materie de securitate a contractelor inteligente**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Colecție agregată de recomandări și de cele mai bune practici de securitate](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standard de verificare a securității contractelor inteligente (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Tutoriale corelate {#related-tutorials}

- [Flux de lucru de dezvoltare securizată](/developers/tutorials/secure-development-workflow/)
- [Cum se folosește Slither pentru a găsi erori în contractele inteligente](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cum se folosește Manticore pentru a găsi erori în contractele inteligente](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Instrucțiuni de securitate](/developers/tutorials/smart-contract-security-guidelines/)
- [Token de securitate](/developers/tutorials/token-integration-checklist/)
