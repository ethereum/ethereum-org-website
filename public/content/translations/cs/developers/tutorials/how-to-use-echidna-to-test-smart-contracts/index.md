---
title: "Jak používat Echidnu k testování chytrých kontraktů"
description: "Jak používat Echidnu k automatickému testování chytrých kontraktů"
author: "Trailofbits"
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "bezpečnost",
    "testování",
    "fuzzing"
  ]
skill: advanced
breadcrumb: "Echidna"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalace {#installation}

Echidnu lze nainstalovat prostřednictvím dockeru nebo pomocí předkompilovaného binárního souboru.

### Echidna prostřednictvím dockeru {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory z vašeho hostitele a spouštět nástroje na souborech z dockeru_

Uvnitř dockeru spusťte:

```bash
solc-select 0.5.11
cd /home/training
```

### Binární soubor {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Úvod do fuzzingu založeného na vlastnostech {#introduction-to-property-based-fuzzing}

Echidna je fuzzer založený na vlastnostech, který jsme popsali v našich předchozích příspěvcích na blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) je dobře známá technika v bezpečnostní komunitě. Spočívá v generování více či méně náhodných vstupů pro nalezení chyb v programu. Fuzzery pro tradiční software (jako je [AFL](http://lcamtuf.coredump.cx/afl/) nebo [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) jsou známé jako účinné nástroje pro hledání chyb.

Kromě čistě náhodného generování vstupů existuje mnoho technik a strategií pro generování dobrých vstupů, včetně:

- Získávání zpětné vazby z každého spuštění a její použití k řízení generování. Například, pokud nově vygenerovaný vstup vede k objevení nové cesty, může mít smysl generovat nové vstupy, které jsou mu blízké.
- Generování vstupu respektujícího strukturální omezení. Například, pokud váš vstup obsahuje hlavičku s kontrolním součtem, bude mít smysl nechat fuzzer generovat vstup ověřující kontrolní součet.
- Použití známých vstupů pro generování nových vstupů: pokud máte přístup k velkému souboru dat platných vstupů, váš fuzzer může z nich generovat nové vstupy, místo aby začínal generování od nuly. Ty se obvykle nazývají _seeds_.

### Fuzzing založený na vlastnostech {#property-based-fuzzing}

Echidna patří do specifické rodiny fuzzerů: fuzzing založený na vlastnostech, silně inspirovaný [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Na rozdíl od klasického fuzzeru, který se snaží najít pády, se Echidna snaží narušit uživatelem definované invarianty.

V chytrých kontraktech jsou invarianty funkce v Solidity, které mohou představovat jakýkoli nesprávný nebo neplatný stav, kterého může kontrakt dosáhnout, včetně:

- Nesprávná kontrola přístupu: útočník se stal vlastníkem kontraktu.
- Nesprávný stavový automat: tokeny mohou být převáděny, i když je kontrakt pozastaven.
- Nesprávná aritmetika: uživatel může způsobit podtečení svého zůstatku a získat neomezené množství tokenů zdarma.

### Testování vlastnosti s Echidnou {#testing-a-property-with-echidna}

Podíváme se, jak testovat chytrý kontrakt s Echidnou. Cílem je následující chytrý kontrakt [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

- Každý může mít maximálně 1000 tokenů
- Token nelze převést (nejedná se o token ERC20)

### Napsání vlastnosti {#write-a-property}

Vlastnosti Echidny jsou funkce v Solidity. Vlastnost musí:

- Nemít žádný argument
- Vrátit `true`, pokud je úspěšná
- Mít jméno začínající na `echidna`

Echidna bude:

- Automaticky generovat libovolné transakce pro testování vlastnosti.
- Hlásit jakékoli transakce, které vedou k tomu, že vlastnost vrátí `false` nebo vyhodí chybu.
- Zahodit vedlejší účinky při volání vlastnosti (tzn. pokud vlastnost změní stavovou proměnnou, je to po testu zahozeno)

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

Echidna potřebuje [konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) bez argumentu. Pokud váš kontrakt potřebuje specifickou inicializaci, musíte ji provést v konstruktoru.

V Echidně existují některé specifické adresy:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, která volá konstruktor.
- `0x10000`, `0x20000` a `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, které náhodně volají ostatní funkce.

V našem aktuálním příkladu nepotřebujeme žádnou zvláštní inicializaci, proto je náš konstruktor prázdný.

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

Následující text shrnuje spuštění Echidny na našem příkladu:

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

Echidna zjistila, že vlastnost je narušena, pokud je volána funkce `backdoor`.

## Filtrování funkcí pro volání během fuzzingové kampaně {#filtering-functions-to-call-during-a-fuzzing-campaign}

Ukážeme si, jak filtrovat funkce, které mají být fuzzovány.
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
Pro fuzzer je to obtížné (doporučuje se použít nástroj pro symbolické provádění, jako je [Manticore](https://github.com/trailofbits/manticore)).
Můžeme spustit Echidnu, abychom to ověřili:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrování funkcí {#filtering-functions}

Echidna má potíže s nalezením správné sekvence pro testování tohoto kontraktu, protože dvě resetovací funkce (`reset1` a `reset2`) nastaví všechny stavové proměnné na `false`.
Můžeme však použít speciální funkci Echidny a buď dát resetovací funkce na černou listinu, nebo na bílou listinu pouze funkce `f`, `g`,
`h` a `i`.

Chcete-li dát funkce na černou listinu, můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Dalším přístupem k filtrování funkcí je vypsání funkcí na bílé listině. K tomu můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` je ve výchozím nastavení `true`.
- Filtrování bude provedeno pouze podle jména (bez parametrů). Pokud máte `f()` a `f(uint256)`, filtr `"f"` bude odpovídat oběma funkcím.

### Spuštění Echidny {#run-echidna-1}

Chcete-li spustit Echidnu s konfiguračním souborem `blacklist.yaml`:

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

Echidna téměř okamžitě najde sekvenci transakcí, která vlastnost zneplatní.

### Shrnutí: Filtrování funkcí {#summary-filtering-functions}

Echidna může během fuzzingové kampaně buď dát funkce na černou listinu, nebo na bílou listinu pomocí:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna spustí fuzzingovou kampaň buď s funkcemi `f1`, `f2` a `f3` na černé listině, nebo voláním pouze těchto funkcí, podle
hodnoty booleovské proměnné `filterBlacklist`.

## Jak testovat assert v Solidity pomocí Echidny {#how-to-test-soliditys-assert-with-echidna}

V tomto krátkém návodu si ukážeme, jak používat Echidnu k testování kontroly tvrzení (assertions) v kontraktech. Předpokládejme, že máme kontrakt jako je tento:

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

### Napsání tvrzení (assertion) {#write-an-assertion}

Chceme se ujistit, že `tmp` je menší nebo rovno `counter` po vrácení jejich rozdílu. Mohli bychom napsat
vlastnost pro Echidnu, ale museli bychom hodnotu `tmp` někam uložit. Místo toho bychom mohli použít tvrzení (assertion) jako je toto:

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

Chcete-li povolit testování selhání tvrzení (assertion), vytvořte [konfigurační soubor Echidny](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

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

Jak můžete vidět, Echidna hlásí selhání tvrzení (assertion) ve funkci `inc`. Přidání více než jednoho tvrzení (assertion) na funkci je možné, ale Echidna nedokáže říct, které tvrzení selhalo.

### Kdy a jak používat tvrzení (assertions) {#when-and-how-use-assertions}

Tvrzení (assertions) lze použít jako alternativu k explicitním vlastnostem, zejména pokud jsou podmínky ke kontrole přímo spojeny se správným použitím nějaké operace `f`. Přidání tvrzení (assertions) za nějaký kód vynutí, že kontrola proběhne okamžitě po jeho vykonání:

```solidity
function f(..) public {
    // nějaký složitý kód
    ...
    assert (condition);
    ...
}

```

Naopak, použití explicitní vlastnosti echidna bude náhodně provádět transakce a neexistuje snadný způsob, jak vynutit, kdy přesně bude zkontrolována. Stále je možné použít toto řešení:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Existují však některé problémy:

- Selže, pokud je `f` deklarováno jako `internal` nebo `external`.
- Není jasné, které argumenty by se měly použít k volání `f`.
- Pokud se `f` vrátí, vlastnost selže.

Obecně doporučujeme řídit se [doporučením Johna Regehra](https://blog.regehr.org/archives/1091) o tom, jak používat tvrzení (assertions):

- Nevynucujte žádný vedlejší účinek během kontroly tvrzení. Například: `assert(ChangeStateAndReturn() == 1)`
- Netvrďte zjevné výroky. Například `assert(var >= 0)`, kde `var` je deklarováno jako `uint`.

Nakonec, prosím, **nepoužívejte** `require` místo `assert`, protože Echidna to nebude schopna detekovat (ale kontrakt se stejně vrátí).

### Shrnutí: Kontrola tvrzení (Assertion Checking) {#summary-assertion-checking}

Následující text shrnuje spuštění Echidny na našem příkladu:

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

Echidna zjistila, že tvrzení v `inc` může selhat, pokud je tato funkce volána vícekrát s velkými argumenty.

## Sběr a úprava korpusu Echidna {#collecting-and-modifying-an-echidna-corpus}

Ukážeme si, jak sbírat a používat korpus transakcí s Echidnou. Cílem je následující chytrý kontrakt [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Tento malý příklad nutí Echidnu najít určité hodnoty pro změnu stavové proměnné. Pro fuzzer je to obtížné
(doporučuje se použít nástroj pro symbolické provádění, jako je [Manticore](https://github.com/trailofbits/manticore)).
Můžeme spustit Echidnu, abychom to ověřili:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Můžeme však stále používat Echidnu ke sběru korpusu při spouštění této fuzzingové kampaně.

### Sběr korpusu {#collecting-a-corpus}

Chcete-li povolit sběr korpusu, vytvořte adresář korpusu:

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
Například jeden z těchto souborů byl:

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

### Nasazení korpusu {#seeding-a-corpus}

Echidna potřebuje pomoc, aby si poradila s funkcí `magic`. Zkopírujeme a upravíme vstup tak, aby používal vhodné
parametry:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Upravíme `new.txt` tak, aby volal `magic(42,129,333,0)`. Nyní můžeme Echidnu znovu spustit:

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

Tentokrát zjistila, že vlastnost je okamžitě narušena.

## Hledání transakcí s vysokou spotřebou paliva {#finding-transactions-with-high-gas-consumption}

Ukážeme si, jak s Echidnou najít transakce s vysokou spotřebou paliva. Cílem je následující chytrý kontrakt:

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

Zde může mít `expensive` velkou spotřebu paliva.

V současné době Echidna vždy potřebuje vlastnost k testování: zde `echidna_test` vždy vrací `true`.
Můžeme spustit Echidnu, abychom to ověřili:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Měření spotřeby paliva {#measuring-gas-consumption}

Chcete-li s Echidnou povolit spotřebu paliva, vytvořte konfigurační soubor `config.yaml`:

```yaml
estimateGas: true
```

V tomto příkladu také zmenšíme velikost sekvence transakcí, aby byly výsledky snáze pochopitelné:

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

- Zobrazené palivo je odhad poskytnutý [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Odfiltrování volání snižujících spotřebu paliva {#filtering-out-gas-reducing-calls}

Výše uvedený návod **Filtrování funkcí pro volání během fuzzingové kampaně** ukazuje, jak
odebrat některé funkce z testování.  
To může být zásadní pro získání přesného odhadu paliva.
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

Pokud může Echidna volat všechny funkce, nenajde snadno transakce s vysokými náklady na palivo:

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
Vyloučení funkcí `pop` a `clear` nám však dává mnohem lepší výsledky:

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

### Shrnutí: Hledání transakcí s vysokou spotřebou paliva {#summary-finding-transactions-with-high-gas-consumption}

Echidna může najít transakce s vysokou spotřebou paliva pomocí konfigurační volby `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Jakmile bude fuzzingová kampaň ukončena, Echidna nahlásí sekvenci s maximální spotřebou paliva pro každou funkci.
