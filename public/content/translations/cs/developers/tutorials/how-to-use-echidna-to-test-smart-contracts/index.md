---
title: "Jak používat Echidnu k testování chytrých kontraktů"
description: "Jak používat Echidnu k automatickému testování chytrých kontraktů"
author: "Trailofbits"
lang: cs
tags: ["Solidity", "chytré kontrakty", "bezpečnost", "testování", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalace {#installation}

Echidna může být nainstalována pomocí Dockeru nebo pomocí předkompilované binárky.

### Echidna přes Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v Dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory na svém hostitelském počítači a spouštět nástroje na souborech z Dockeru._

Uvnitř Dockeru spusťte:

```bash
solc-select 0.5.11
cd /home/training
```

### Binárka {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Úvod do fuzzingu založeného na vlastnostech {#introduction-to-property-based-fuzzing}

Echidna je fuzzer založený na vlastnostech, který jsme popsali v našich předchozích příspěvcích na blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) je v bezpečnostní komunitě dobře známá technika. Spočívá v generování více či méně náhodných vstupů za účelem nalezení chyb v programu. Fuzzery pro tradiční software (jako je [AFL](http://lcamtuf.coredump.cx/afl/) nebo [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) jsou známé jako efektivní nástroje pro hledání chyb.

Kromě čistě náhodného generování vstupů existuje mnoho technik a strategií pro generování dobrých vstupů, včetně:

- Získávání zpětné vazby z každého spuštění a její využití k usměrnění generování. Pokud například nově vygenerovaný vstup vede k objevování nové cesty, může mít smysl generovat nové vstupy, které jsou mu blízké.
- Generování vstupu s ohledem na strukturální omezení. Pokud například váš vstup obsahuje hlavičku s kontrolním součtem, bude dávat smysl nechat fuzzer generovat vstupy, které tento kontrolní součet validují.
- Použití známých vstupů ke generování nových vstupů: pokud máte přístup k velké datové sadě platných vstupů, váš fuzzer z nich může generovat nové vstupy, místo aby začínal s generováním od nuly. Tyto vstupy se obvykle nazývají _seedy_ (semínka).

### Fuzzing založený na vlastnostech {#property-based-fuzzing}

Echidna patří do specifické rodiny fuzzerů: fuzzing založený na vlastnostech, který je silně inspirován nástrojem [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Na rozdíl od klasických fuzzerů, které se snaží najít pády aplikace, se Echidna bude snažit porušit uživatelem definované invarianty.

V chytrých kontraktech jsou invarianty funkce v Solidity, které mohou představovat jakýkoli nesprávný nebo neplatný stav, do kterého se kontrakt může dostat, včetně:

- Nesprávné řízení přístupu: útočník se stal vlastníkem kontraktu.
- Nesprávný stavový automat: tokeny lze převádět, i když je kontrakt pozastaven.
- Nesprávná aritmetika: uživatel může podtéct (underflow) svůj zůstatek a získat neomezené množství tokenů zdarma.

### Testování vlastnosti pomocí Echidny {#testing-a-property-with-echidna}

Ukážeme si, jak otestovat chytrý kontrakt pomocí Echidny. Cílem je následující chytrý kontrakt [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Budeme předpokládat, že tento token musí mít následující vlastnosti:

- Kdokoli může mít maximálně 1000 tokenů
- Token nelze převádět (nejde o ERC-20 token)

### Napsání vlastnosti {#write-a-property}

Vlastnosti v Echidně jsou funkce v Solidity. Vlastnost musí:

- Být bez argumentů
- Vracet `true`, pokud je úspěšná
- Mít název začínající na `echidna`

Echidna provede následující:

- Automaticky vygeneruje libovolné transakce k otestování vlastnosti.
- Nahlásí jakékoli transakce, které vedou k tomu, že vlastnost vrátí `false` nebo vyhodí chybu.
- Zahodí vedlejší efekty při volání vlastnosti (tj. pokud vlastnost změní stavovou proměnnou, je tato změna po testu zvrácena)

Následující vlastnost kontroluje, že volající nemá více než 1000 tokenů:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Použijte dědičnost k oddělení vašeho kontraktu od vašich vlastností:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementuje vlastnost a dědí z tokenu.

### Inicializace kontraktu {#initiate-a-contract}

Echidna potřebuje [konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) bez argumentů. Pokud váš kontrakt vyžaduje specifickou inicializaci, musíte ji provést v konstruktoru.

V Echidně existují určité specifické adresy:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, která volá konstruktor.
- `0x10000`, `0x20000` a `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, které náhodně volají ostatní funkce.

V našem aktuálním příkladu nepotřebujeme žádnou zvláštní inicializaci, a proto je náš konstruktor prázdný.

### Spuštění Echidny {#run-echidna}

Echidna se spouští pomocí:

```bash
echidna-test contract.sol
```

Pokud contract.sol obsahuje více kontraktů, můžete specifikovat cíl:

```bash
echidna-test contract.sol --contract MyContract
```

### Shrnutí: Testování vlastnosti {#summary-testing-a-property}

Následující text shrnuje běh Echidny na našem příkladu:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna zjistila, že vlastnost je porušena, pokud je zavolána funkce `backdoor`.

## Filtrování funkcí volaných během fuzzingové kampaně {#filtering-functions-to-call-during-a-fuzzing-campaign}

Ukážeme si, jak filtrovat funkce, které se mají fuzzovat.
Cílem je následující chytrý kontrakt:

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

Tento malý příklad nutí Echidnu najít určitou sekvenci transakcí ke změně stavové proměnné.
To je pro fuzzer obtížné (doporučuje se použít nástroj pro symbolické provádění, jako je [Manticore](https://github.com/trailofbits/manticore)).
Můžeme spustit Echidnu, abychom si to ověřili:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrování funkcí {#filtering-functions}

Echidna má potíže s nalezením správné sekvence k otestování tohoto kontraktu, protože dvě resetovací funkce (`reset1` a `reset2`) nastaví všechny stavové proměnné na `false`.
Můžeme však použít speciální funkci Echidny k tomu, abychom buď přidali resetovací funkci na blacklist, nebo přidali na whitelist pouze funkce `f`, `g`,
`h` a `i`.

Pro přidání funkcí na blacklist můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Dalším přístupem k filtrování funkcí je vypsat funkce na whitelistu. K tomu můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` je ve výchozím nastavení `true`.
- Filtrování se bude provádět pouze podle názvu (bez parametrů). Pokud máte `f()` a `f(uint256)`, filtr `"f"` bude odpovídat oběma funkcím.

### Spuštění Echidny {#run-echidna-1}

Pro spuštění Echidny s konfiguračním souborem `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna najde sekvenci transakcí k falzifikaci vlastnosti téměř okamžitě.

### Shrnutí: Filtrování funkcí {#summary-filtering-functions}

Echidna může během fuzzingové kampaně přidávat funkce na blacklist nebo whitelist pomocí:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna zahájí fuzzingovou kampaň buď s blacklistem funkcí `f1`, `f2` a `f3`, nebo bude volat pouze tyto funkce, v závislosti na hodnotě booleovské proměnné `filterBlacklist`.

## Jak testovat asert v Solidity pomocí Echidny {#how-to-test-soliditys-assert-with-echidna}

V tomto krátkém tutoriálu si ukážeme, jak používat Echidnu k testování kontroly asertů v kontraktech. Předpokládejme, že máme kontrakt jako je tento:

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

### Napsání asertu {#write-an-assertion}

Chceme se ujistit, že `tmp` je menší nebo rovno `counter` po vrácení jejich rozdílu. Mohli bychom napsat vlastnost pro Echidnu, ale museli bychom někam uložit hodnotu `tmp`. Místo toho můžeme použít asert jako je tento:

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

### Spuštění Echidny {#run-echidna-2}

Chcete-li povolit testování selhání asertů, vytvořte [konfigurační soubor Echidny](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Když spustíme tento kontrakt v Echidně, získáme očekávané výsledky:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Jak vidíte, Echidna hlásí selhání asertu ve funkci `inc`. Přidání více než jednoho asertu na funkci je možné, ale Echidna nedokáže říct, který asert selhal.

### Kdy a jak používat aserty {#when-and-how-use-assertions}

Aserty lze použít jako alternativy k explicitním vlastnostem, zejména pokud podmínky, které se mají kontrolovat, přímo souvisejí se správným použitím nějaké operace `f`. Přidání asertů za nějaký kód vynutí, že kontrola proběhne bezprostředně po jeho provedení:

```solidity
function f(..) public {
    // nějaký složitý kód
    ...
    assert (condition);
    ...
}

```

Naopak použití explicitní vlastnosti v Echidně bude náhodně provádět transakce a neexistuje snadný způsob, jak přesně vynutit, kdy bude zkontrolována. Stále je však možné použít toto náhradní řešení:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Existují zde však určité problémy:

- Selže, pokud je `f` deklarována jako `internal` nebo `external`.
- Není jasné, jaké argumenty by měly být použity k volání `f`.
- Pokud se `f` zvrátí, vlastnost selže.

Obecně doporučujeme dodržovat [doporučení Johna Regehra](https://blog.regehr.org/archives/1091) ohledně používání asertů:

- Během kontroly asertu nevynucujte žádné vedlejší efekty. Například: `assert(ChangeStateAndReturn() == 1)`
- Neasertujte zřejmá tvrzení. Například `assert(var >= 0)`, kde je `var` deklarováno jako `uint`.

Nakonec prosím **nepoužívejte** `require` místo `assert`, protože Echidna to nebude schopna detekovat (ale kontrakt se stejně zvrátí).

### Shrnutí: Kontrola asertů {#summary-assertion-checking}

Následující text shrnuje běh Echidny na našem příkladu:

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
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna zjistila, že asert ve funkci `inc` může selhat, pokud je tato funkce volána vícekrát s velkými argumenty.

## Shromažďování a úprava korpusu Echidny {#collecting-and-modifying-an-echidna-corpus}

Ukážeme si, jak shromažďovat a používat korpus transakcí pomocí Echidny. Cílem je následující chytrý kontrakt [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Tento malý příklad nutí Echidnu najít určité hodnoty ke změně stavové proměnné. To je pro fuzzer obtížné
(doporučuje se použít nástroj pro symbolické provádění, jako je [Manticore](https://github.com/trailofbits/manticore)).
Můžeme spustit Echidnu, abychom si to ověřili:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Stále však můžeme použít Echidnu ke shromažďování korpusu při spuštění této fuzzingové kampaně.

### Shromažďování korpusu {#collecting-a-corpus}

Chcete-li povolit shromažďování korpusu, vytvořte adresář pro korpus:

```bash
mkdir corpus-magic
```

A [konfigurační soubor Echidny](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Nyní můžeme spustit náš nástroj a zkontrolovat shromážděný korpus:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna stále nemůže najít správné magické hodnoty, ale můžeme se podívat na korpus, který shromáždila.
Například jedním z těchto souborů byl:

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

Je zřejmé, že tento vstup nespustí selhání v naší vlastnosti. V dalším kroku si však ukážeme, jak jej pro tento účel upravit.

### Seedování korpusu {#seeding-a-corpus}

Echidna potřebuje trochu pomoci, aby se vypořádala s funkcí `magic`. Zkopírujeme a upravíme vstup tak, abychom pro něj použili vhodné parametry:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Upravíme `new.txt` tak, aby volal `magic(42,129,333,0)`. Nyní můžeme Echidnu spustit znovu:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Tentokrát okamžitě zjistila, že vlastnost je porušena.

## Hledání transakcí s vysokou spotřebou gasu {#finding-transactions-with-high-gas-consumption}

Ukážeme si, jak pomocí Echidny najít transakce s vysokou spotřebou gasu. Cílem je následující chytrý kontrakt:

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

Zde může mít `expensive` velkou spotřebu gasu.

V současné době Echidna vždy potřebuje vlastnost k testování: zde `echidna_test` vždy vrací `true`.
Můžeme spustit Echidnu, abychom si to ověřili:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Měření spotřeby gasu {#measuring-gas-consumption}

Chcete-li v Echidně povolit měření spotřeby gasu, vytvořte konfigurační soubor `config.yaml`:

```yaml
estimateGas: true
```

V tomto příkladu také zmenšíme velikost sekvence transakcí, aby byly výsledky snáze srozumitelné:

```yaml
seqLen: 2
estimateGas: true
```

### Spuštění Echidny {#run-echidna-3}

Jakmile máme vytvořený konfigurační soubor, můžeme Echidnu spustit takto:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Zobrazený gas je odhad poskytnutý nástrojem [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Odfiltrování volání snižujících gas {#filtering-out-gas-reducing-calls}

Výše uvedený tutoriál o **filtrování funkcí volaných během fuzzingové kampaně** ukazuje, jak z testování odstranit některé funkce.  
To může být kritické pro získání přesného odhadu gasu.
Zvažte následující příklad:

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

Pokud Echidna může volat všechny funkce, nenajde snadno transakce s vysokými náklady na gas:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Je to proto, že náklady závisí na velikosti `addrs` a náhodná volání mají tendenci ponechat pole téměř prázdné.
Přidání `pop` a `clear` na blacklist nám však dává mnohem lepší výsledky:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Shrnutí: Hledání transakcí s vysokou spotřebou gasu {#summary-finding-transactions-with-high-gas-consumption}

Echidna dokáže najít transakce s vysokou spotřebou gasu pomocí konfigurační volby `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Jakmile fuzzingová kampaň skončí, Echidna nahlásí sekvenci s maximální spotřebou gasu pro každou funkci.