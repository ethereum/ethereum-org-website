---
title: Cum se folosește Echidna pentru a testa contracte inteligente
description: Cum să utilizați Echidna pentru a testa automat contractele inteligente
author: "Trailofbits"
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
  - "testare"
  - "fuzzing"
skill: advanced
published: 2020-04-10
source: Construirea de contracte securizate
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalare {#installation}

Echidna poate fi instalat prin docker sau utilizând pachetul binar pre-compilat.

### Echidna prin docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Ultima comandă rulează „eth-security-toolbox” într-un docker care are acces la directorul dvs. curent. Puteți modifica fișierele de pe gazda dvs. și puteți rula instrumentele pe fișierele din docker_

În interiorul docker-ului, executați:

```bash
solc-select 0.5.11
cd /home/training
```

### Sursa binară {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introducere despre fuzzing-ul bazat pe proprietăți {#introduction-to-property-based-fuzzing}

Echidna este un fuzzer bazat pe proprietăți, așa cum am descris în articolele noastre anterioare de pe blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing-ul](https://wikipedia.org/wiki/Fuzzing) este o tehnică binecunoscută în comunitatea de securitate. Aceasta constă în generarea de date de intrare mai mult sau mai puțin aleatorii pentru a găsi bug-uri în program. Se știe că fuzzer-ii pentru software-uri tradiționale (cum ar fi [AFL](http://lcamtuf.coredump.cx/afl/) sau [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sunt instrumente eficiente pentru a găsi bug-uri.

În afară de generarea pur aleatorie a datelor de intrare, există numeroase tehnici și strategii pentru a genera date bune de intrare, printre care se numără:

- Obținerea feedback-ului de la fiecare execuție și orientarea generării cu ajutorul acestuia. De exemplu, dacă datele de intrare nou generate conduc la descoperirea unei noi căi, pare normal să fie generate noi date de intrare apropiate de acestea.
- Generarea datelor de intrare respectând o obligație structurală. De exemplu, dacă datele dvs. de intrare conțin un antet cu o sumă de control, va fi logic să lăsați fuzzer-ul să genereze date de intrare care validează suma de control.
- Utilizarea datelor de intrare cunoscute pentru a genera noi date de intrare: dacă aveți acces la un set mare de date de intrare valide, fuzzer-ul dvs. poate genera noi date de intrare din acestea, în loc să înceapă generarea acestora de la zero. Acestea se numesc de regulă _seeds_.

### Fuzzing-ul bazat pe proprietăți {#property-based-fuzzing}

Echidna aparține unei familii specifice de fuzzer-i: fuzzing-ul bazat pe proprietăți inspirat puternic de [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Spre deosebire de fuzzer-ii clasici, care încearcă să găsească erori, Echidna încearcă să spargă invarianții definiți de utilizator.

În contractele inteligente, invarianții sunt funcții Solidity care pot reprezenta orice stare incorectă sau nevalidă pe care o poate atinge un contract, inclusiv:

- Controlul incorect al accesului: atacatorul a devenit proprietarul contractului.
- Mașină de stare incorectă: tokenurile pot fi transferate în timp ce contractul este în pauză.
- Aritmetică incorectă: utilizatorul, printr-un „underflow” al soldului său, poate obține un număr nelimitat de tokenuri gratuite.

### Testarea unei proprietăți cu Echidna {#testing-a-property-with-echidna}

Vom vedea cum să testăm un contract inteligent cu Echidna. Obiectivul este următorul contract inteligent [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Vom presupune că acest token trebuie să aibă următoarele proprietăți:

- Oricine poate avea cel mult 1000 de tokenuri
- Tokenul nu poate fi transferat (nu este un token ERC20)

### Scrieți o proprietate {#write-a-property}

Proprietățile Echidna sunt funcții Solidity. O proprietate trebuie să:

- nu aibă niciun argument
- răspundă prin `true` dacă are succes
- aibă un nume care să înceapă cu `echidna`

Echidna va face următoarele:

- va genera automat tranzacții arbitrare pentru a testa proprietatea.
- va raporta orice tranzacție care face ca o proprietate să răspundă prin `false` sau să genereze o eroare.
- va elimina efectul secundar atunci când apelează o proprietate (adică, dacă proprietatea modifică o variabilă de stare, aceasta este eliminată după test)

Următoarea proprietate verifică dacă apelantul nu are mai mult de 1000 de tokenuri:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Utilizați moștenirea („inheritance”) pentru a vă separa contractul de proprietăți:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementează proprietatea și moștenește de la token.

### Inițiați un contract {#initiate-a-contract}

Echidna are nevoie de un [constructor](/developers/docs/smart-contracts/anatomy/#constructor-functions) fără argument. În cazul în care contractul dvs. are nevoie de o inițializare anume, trebuie să o faceți în cadrul constructorului.

Există câteva adrese specifice în Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` care apelează constructorul.
- `0x10000`, `0x20000` și `0x00a329C0648769a73afAC7F9381e08fb43DBEA70 ` care apelează aleatoriu celelalte funcții.

Nu avem nevoie de nicio inițializare specială în exemplul nostru actual, de aceea constructorul nostru este gol.

### Executați Echidna {#run-echidna}

Echidna se lansează cu:

```bash
$ echidna-test contract.sol
```

În cazul în care „contract.sol” conține mai multe contracte, puteți specifica ținta:

```bash
$ echidna-test contract.sol --contract MyContract
```

### Rezumat: testarea unei proprietăți {#summary-testing-a-property}

Ceea ce urmează sintetizează cum se execută Echidna în exemplul nostru:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
$ echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna a constatat că proprietatea este încălcată dacă se apelează funcția `backdoor`.

## Filtrarea funcțiilor care trebuie apelate în timpul unei campanii de fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Vom vedea cum să filtrăm funcțiile care urmează să fie fuzzate. Obiectivul este următorul contract inteligent:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
    require(state2);
    require(x == 42);
    state3 = true;
  }

 function i() public {
    require(state3);
    state4 = true;
  }

  function reset1() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function reset2() public {
    state1 = false;
    state2 = false;
    state3 = false;
    return;
  }

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Acest mic exemplu forțează Echidna să găsească o anumită secvență de tranzacții pentru a modifica o variabilă de stare. Acest lucru este dificil pentru un fuzzer (se recomandă utilizarea unui instrument simbolic de execuție precum [Manticore](https://github.com/trailofbits/manticore)). Pentru a verifica aceasta, putem executa Echidna:

```bash
$ echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Funcții de filtrare {#filtering-functions}

Este dificil pentru Echidna să găsească secvența corectă pentru a testa acest contract, pentru că cele două funcții de resetare (`reset1` și `reset2`) vor configura toate variabilele de stare ca `false`. Totuși, putem utiliza o funcție specială Echidna fie pentru a pune pe lista neagră funcția de resetare, fie pentru a pune pe lista albă doar funcțiile `f`, `g`, `h` și `i`.

Pentru a pune funcțiile pe lista neagră, putem folosi acest fișier de configurare:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

O altă abordare pentru filtrarea funcțiilor este să listăm funcțiile de pe lista albă. Pentru a face aceasta, putem utiliza acest fișier de configurare:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` este `true` în mod implicit.
- Filtrarea va fi efectuată numai după nume (fără parametri). Dacă aveți `f()` și `f(uint256)`, filtrul `”f”` va marca ambele funcții ca fiind corespunzătoare.

### Executați Echidna {#run-echidna-1}

Pentru a executa Echidna cu un fișier de configurare `blacklist.yaml`:

```bash
$ echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!
  Secvența de apelare:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna va găsi secvența de tranzacții de falsificare a proprietății aproape imediat.

### Rezumat: Funcții de filtrare {#summary-filtering-functions}

Echidna poate pune pe lista neagră sau pe lista albă funcțiile care trebuie apelate în timpul unei campanii de fuzzing folosind:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna pornește o campanie de fuzzing fie punând pe lista neagră `f1`, `f2` și `f3`, fie apelându-le numai pe acestea, în funcție de valoarea booleanului `filterBlacklist`.

## Cum să testați aserțiunea Solidity cu Echidna {#how-to-test-soliditys-assert-with-echidna}

În acest scurt tutorial vom arăta cum se utilizează Echidna pentru a testa verificarea aserțiunilor în contracte. Să presupunem că avem un contract ca acesta:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Scrieți o aserțiune {#write-an-assertion}

Vrem să ne asigurăm că `tmp` este mai mic sau egal cu `counter` după ce a răspuns prin diferența acestora. Am putea scrie o proprietate Echidna, dar va trebui să stocăm undeva această valoare `tmp`. În schimb, am putea folosi o afirmație ca aceasta:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Executați Echidna {#run-echidna-2}

To enable the assertion failure testing, create an [Echidna configuration file](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Când executăm acest contract în Echidna, obținem rezultatele așteptate:

```bash
$ echidna-test assert.sol --config config.yaml
Analizarea contractului: assert.sol:Incrementor
assertion in inc: failed!
  Secvență de apeluri, micșorarea (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

După cum puteți vedea, Echidna raportează unele eșecuri de aserțiune în funcția `inc`. Este posibilă adăugarea mai multor aserțiuni pe funcție, dar Echidna nu poate determina care aserțiune a eșuat.

### Când și cum se utilizează aserțiunile {#when-and-how-use-assertions}

Aserțiunile pot fi utilizate ca alternative la proprietățile explicite, mai ales atunci când condițiile de verificat sunt direct legate de utilizarea corectă a unei operații `f`. Adding assertions after some code will enforce that the check will happen immediately after it was executed:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Dimpotrivă, dacă se utilizează o proprietate Echidna explicită, tranzacțiile se vor executa aleatoriu și nu este ușor de a stabili momentul când se va efectua obligatoriu verificarea. Puteți totusi utiliza această soluție:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Cu toate acestea, există unele probleme:

- Eșuează dacă `f` este declarat ca fiind `internal` sau `external`.
- Nu este prea clar ce argumente ar trebui utilizate pentru a apela `f`.
- Dacă se inversează `f`, proprietatea va eșua.

În general, vă recomandăm să urmați [recomandarea lui John Regehr](https://blog.regehr.org/archives/1091) despre modul cum să utilizați aserțiunile:

- Nu impuneți niciun efect secundar în timpul verificării aserțiunilor. De exemplu: `assert(ChangeStateAndReturn() == 1)`
- Nu faceți aserțiuni evidente. De exemplu, `assert(var >= 0)` în cazul în care `var` este declarat ca `uint`.

În cele din urmă, vă rugăm **să nu utilizați** `require` în loc de `assert`, deoarece Echidna nu va putea detecta acest lucru (dar contractul se va inversa oricum).

### Rezumat: verificarea aserțiunilor {#summary-assertion-checking}

Ceea ce urmează sintetizează cum se execută Echidna în exemplul nostru:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna a constatat că aserțiunea din `inc` poate eșua dacă această funcție este apelată de mai multe ori cu argumente mari.

## Colectarea și modificarea unui corpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Vom vedea cum putem colecta și utiliza un corpus de tranzacții cu Echidna. Obiectivul este următorul contract inteligent [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Acest mic exemplu forțează Echidna să găsească anumite valori pentru a modifica o variabilă de stare. Acest lucru este dificil pentru un fuzzer (se recomandă utilizarea unui instrument simbolic de execuție precum [Manticore](https://github.com/trailofbits/manticore)). Pentru a verifica aceasta, putem executa Echidna:

```bash
$ echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Cu toate acestea, putem folosi în continuare Echidna pentru a colecta corpus atunci când executăm această campanie de fuzzing.

### Colectarea unui corpus {#collecting-a-corpus}

Pentru a activa colectarea unui corpus, creați un director corpus:

```bash
$ mkdir corpus-magic
```

Și un [fișier de configurare Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Acum putem să rulăm instrumentul nostru și să verificăm corpusul colectat:

```bash
$ echidna-test magic.sol --config config.yaml
```

Echidna tot nu poate găsi valorile „magic” corecte, dar ne putem uita la corpusul pe care l-a colectat. De pildă, unul dintre aceste fișiere era:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Este evident că aceste date de intrare nu vor declanșa eșecul în proprietatea noastră. Totuși, vom vedea în etapa următoare cum putem să o modificăm în acest sens.

### Adăugarea de surse la un corpus {#seeding-a-corpus}

Echidna are nevoie de puțin ajutor pentru a se ocupa de funcția `magic`. Vom copia și vom modifica datele de intrare ca să utilizăm parametri adecvați pentru aceasta:

```bash
$ cp corpus/2712688662897926208.txt corpus/new.txt
```

Vom modifica `new.txt` pentru a apela `magic(42,129,333,0)`. Acum putem executa din nou Echidna:

```bash
$ echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

This time, it found that the property is violated immediately.

## Găsirea tranzacțiilor cu un consum ridicat de gaz {#finding-transactions-with-high-gas-consumption}

We will see how to find the transactions with high gas consumption with Echidna. Obiectivul este următorul contract inteligent:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Aici `expensive` poate avea un consum mare de gaz.

Actualmente Echidna are totdeauna nevoie să testeze o proprietate: aici `echidna_test` răspunde întotdeauna prin `true`. Pentru a verifica aceasta, putem executa Echidna:

```
$ echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Măsurarea consumului de gaz {#measuring-gas-consumption}

To enable the gas consumption with Echidna, create a configuration file `config.yaml`:

```yaml
estimateGas: true
```

În acest exemplu vom și reduce dimensiunea secvenței de tranzacții pentru a facilita înțelegerea rezultatelor:

```yaml
seqLen: 2
estimateGas: true
```

### Run Echidna {#run-echidna-3}

După ce am creat fișierul de configurare, putem rula Echidna în felul următor:

```bash
$ echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Gazul afișat este o estimare furnizată de [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrarea apelurilor de reducere a gazului {#filtering-out-gas-reducing-calls}

Tutorialul privind **funcțiile de filtrare care trebuie apelate în timpul unei campanii de fuzzing** de mai sus arată cum să eliminați unele funcții din testele dvs.  
Acest lucru poate fi esențial pentru a obține o estimare precisă a gazului. Să considerăm următorul exemplu:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Dacă Echidna poate apela toate funcțiile, nu va găsi cu ușurință tranzacțiile cu un cost ridicat al gazului:

```
$ echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Aceasta deoarece costul depinde de mărimea `addrs` și apelurile aleatorii tind să lase matricea aproape goală. Cu toate acestea, dacă punem pe lista neagră funcțiile `pop` și `clear`, obținem rezultate mult mai bune:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
$ echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Rezumat: găsirea tranzacțiilor cu un consum ridicat de gaz {#summary-finding-transactions-with-high-gas-consumption}

Echidna poate găsi tranzacțiile cu un consum ridicat de gaz prin utilizarea opțiunii de configurare `estimateGas`:

```yaml
estimateGas: true
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna va raporta o secvență cu consumul maxim de gaz pentru fiecare funcție odată ce s-a încheiat campania de fuzzing.
