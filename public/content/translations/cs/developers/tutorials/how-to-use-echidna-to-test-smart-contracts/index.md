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

Echidnu lze nainstalovat přes Docker, Homebrew nebo pomocí předkompilované binárky. Příklady v tomto tutoriálu byly testovány s Echidnou 2.3.3 a solc 0.8.37.

### Echidna přes Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Poslední příkaz spustí obraz Echidny v Dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory na svém hostitelském počítači a spouštět nástroje na souborech z Dockeru. Obraz také obsahuje [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) a [solc-select](https://github.com/crytic/solc-select)._

Uvnitř Dockeru spusťte:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binárka {#binary}

Stáhněte si nejnovější vydání pro vaši platformu z [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Na macOS nebo Linuxu můžete také spustit `brew install echidna`, což spolu s ní nainstaluje Slither a crytic-compile.

Při použití vydané binárky si nainstalujte [Slither](https://github.com/crytic/slither) a [solc-select](https://github.com/crytic/solc-select) sami (například `pip3 install slither-analyzer solc-select` ve virtuálním prostředí Pythonu) a vyberte verzi kompilátoru:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna běží i bez Slitheru, ale Slither extrahuje konstanty, jako jsou magická čísla použitá v příkazech `require`, a několik níže uvedených příkladů na něm závisí, aby rychle našly chyby.

## Úvod do fuzzingu založeného na vlastnostech {#introduction-to-property-based-fuzzing}

Echidna je fuzzer založený na vlastnostech, který jsme popsali v našich předchozích příspěvcích na blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) je v bezpečnostní komunitě dobře známá technika. Spočívá v generování více či méně náhodných vstupů za účelem nalezení chyb v programu. Fuzzery pro tradiční software (jako [AFL](http://lcamtuf.coredump.cx/afl/) nebo [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) jsou známé jako efektivní nástroje k hledání chyb.

Kromě čistě náhodného generování vstupů existuje mnoho technik a strategií pro generování dobrých vstupů, včetně:

- Získání zpětné vazby z každého spuštění a její využití k usměrnění generování. Například pokud nově vygenerovaný vstup vede k objevování nové cesty, může mít smysl generovat nové vstupy, které jsou mu blízké.
- Generování vstupu s ohledem na strukturální omezení. Například pokud váš vstup obsahuje hlavičku s kontrolním součtem, bude dávat smysl nechat fuzzer generovat vstup, který tento kontrolní součet validuje.
- Použití známých vstupů ke generování nových vstupů: pokud máte přístup k velké datové sadě platných vstupů, váš fuzzer z nich může generovat nové vstupy, místo aby začínal s generováním od nuly. Ty se obvykle nazývají _seedy_ (semínka).

### Fuzzing založený na vlastnostech {#property-based-fuzzing}

Echidna patří do specifické rodiny fuzzerů: fuzzing založený na vlastnostech, silně inspirovaný nástrojem [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Na rozdíl od klasického fuzzeru, který se bude snažit najít pády, se Echidna bude snažit porušit uživatelem definované invarianty.

V chytrých kontraktech jsou invarianty funkce v Solidity, které mohou představovat jakýkoli nesprávný nebo neplatný stav, do kterého se kontrakt může dostat, včetně:

- Nesprávné řízení přístupu: útočník se stal vlastníkem kontraktu.
- Nesprávný stavový automat: tokeny lze převádět, i když je kontrakt pozastaven.
- Nesprávná aritmetika: uživatel může podtéct svůj zůstatek a získat neomezené množství tokenů zdarma.

### Testování vlastnosti pomocí Echidny {#testing-a-property-with-echidna}

Ukážeme si, jak otestovat chytrý kontrakt pomocí Echidny. Cílem je následující chytrý kontrakt [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Budeme předpokládat, že tento token musí mít následující vlastnosti:

- Kdokoli může mít maximálně 1000 tokenů
- Token nelze převádět (není to ERC-20 token)

### Napsání vlastnosti {#write-a-property}

Vlastnosti v Echidně jsou funkce v Solidity. Vlastnost musí:

- Být bez argumentů
- Vrátit `true`, pokud je úspěšná
- Mít název začínající na `echidna`

Echidna provede následující:

- Automaticky vygeneruje libovolné transakce k otestování vlastnosti.
- Nahlásí jakékoli transakce, které vedou k tomu, že vlastnost vrátí `false` nebo vyhodí chybu.
- Zahodí vedlejší efekty při volání vlastnosti (tj. pokud vlastnost změní stavovou proměnnou, je po testu zahozeno).

Následující vlastnost kontroluje, že volající nemá více než 1000 tokenů:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Použijte dědičnost k oddělení vašeho kontraktu od vašich vlastností:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementuje vlastnost a dědí z tokenu.

### Inicializace kontraktu {#initiate-a-contract}

Echidna potřebuje [konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) bez argumentů. Pokud váš kontrakt potřebuje specifickou inicializaci, musíte ji provést v konstruktoru.

V Echidně existují některé specifické adresy:

- `0x30000`, která volá konstruktor.
- `0x10000`, `0x20000` a `0x30000`, které náhodně volají ostatní funkce.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, kde je nasazen testovaný kontrakt.

V našem současném příkladu nepotřebujeme žádnou zvláštní inicializaci, a proto je náš konstruktor prázdný.

### Spuštění Echidny {#run-echidna}

Echidna se spouští pomocí:

```sh
echidna contract.sol
```

Pokud contract.sol obsahuje více kontraktů, můžete specifikovat cíl:

```sh
echidna contract.sol --contract MyContract
```

Při spuštění v terminálu zobrazí Echidna interaktivní uživatelské rozhraní. Přidejte `--format text`, abyste získali prostý textový výstup jako v příkladech níže.

### Shrnutí: Testování vlastnosti {#summary-testing-a-property}

Následující text shrnuje běh Echidny na našem příkladu:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna zjistila, že vlastnost je porušena, pokud je zavolána funkce `backdoor`.

## Filtrování funkcí volaných během fuzzingové kampaně {#filtering-functions-to-call-during-a-fuzzing-campaign}

Ukážeme si, jak filtrovat funkce, které se mají fuzzovat.
Cílem je následující chytrý kontrakt:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
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

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Tento malý příklad nutí Echidnu najít určitou sekvenci transakcí ke změně stavové proměnné.
To je pro fuzzer obtížné.
Můžeme spustit Echidnu, abychom si to ověřili:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrování funkcí {#filtering-functions}

Echidna má potíže s nalezením správné sekvence k otestování tohoto kontraktu, protože dvě resetovací funkce (`reset1` a `reset2`) nastaví všechny stavové proměnné na `false`.
Můžeme však použít speciální funkci Echidny k tomu, abychom buď přidali resetovací funkci na blacklist, nebo přidali na whitelist pouze funkce `f`, `g`,
`h` a `i`.

K přidání funkcí na blacklist můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Dalším přístupem k filtrování funkcí je vypsat funkce na whitelistu. K tomu můžeme použít tento konfigurační soubor:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` je ve výchozím nastavení `true`.
- Filtrování se provádí na základě celého názvu funkce: názvu kontraktu, `.` a podpisu aplikačního binárního rozhraní (ABI) (například `C.f(uint256)`). Pokud máte `f()` a `f(uint256)`, můžete si přesně vybrat, kterou z nich filtrovat. Samotný název jako `"reset1"` neodpovídá ničemu.

### Spuštění Echidny {#run-echidna-1}

Pro spuštění Echidny s konfiguračním souborem `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna najde sekvenci transakcí k vyvrácení vlastnosti téměř okamžitě.

### Shrnutí: Filtrování funkcí {#summary-filtering-functions}

Echidna může přidat funkce na blacklist nebo whitelist pro volání během fuzzingové kampaně pomocí:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna zahájí fuzzingovou kampaň buď s `C.f1()`, `C.f2()` a `C.f3()` na blacklistu, nebo bude volat pouze tyto funkce, v závislosti
na hodnotě booleovské proměnné `filterBlacklist`.

## Jak testovat asert v Solidity pomocí Echidny {#how-to-test-soliditys-assert-with-echidna}

V tomto krátkém tutoriálu si ukážeme, jak používat Echidnu k testování kontroly asertů v kontraktech. Předpokládejme, že máme kontrakt jako je tento:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Od verze Solidity 0.8 se aritmetická přetečení ve výchozím nastavení zvrátí. Blok `unchecked` obnovuje chování přetáčení (wrapping), takže `counter` může přetéct, což je chyba, kterou chceme, aby Echidna našla.

### Napsání asertu {#write-an-assertion}

Chceme se ujistit, že `tmp` je menší nebo rovno `counter` po vrácení jejich rozdílu. Mohli bychom napsat
vlastnost pro Echidnu, ale museli bychom hodnotu `tmp` někam uložit. Místo toho můžeme použít asert jako je tento:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Spuštění Echidny {#run-echidna-2}

Chcete-li povolit testování selhání asertu, předejte `--test-mode assertion` na příkazovém řádku, nebo vytvořte [konfigurační soubor Echidny](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Když spustíme tento kontrakt v Echidně, získáme očekávané výsledky:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Jak vidíte, Echidna hlásí selhání asertu ve funkci `inc`. Přidání více než jednoho asertu na funkci je možné, ale Echidna nedokáže říct, který asert selhal.

### Kdy a jak používat aserty {#when-and-how-use-assertions}

Aserty lze použít jako alternativy k explicitním vlastnostem, zejména pokud podmínky ke kontrole přímo souvisejí se správným použitím nějaké operace `f`. Přidání asertů za nějaký kód vynutí, že kontrola proběhne bezprostředně po jeho spuštění:

```solidity
function f(..) public {
    // nějaký složitý kód
    ...
    assert (condition);
    ...
}

```

Naopak použití explicitní vlastnosti Echidny bude náhodně spouštět transakce a neexistuje snadný způsob, jak přesně vynutit, kdy bude zkontrolována. Stále je však možné použít toto náhradní řešení:

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

- Nevynucujte žádné vedlejší efekty během kontroly asertu. Například: `assert(ChangeStateAndReturn() == 1)`
- Neasertujte zřejmá tvrzení. Například `assert(var >= 0)`, kde je `var` deklarováno jako `uint`.

Nakonec prosím **nepoužívejte** `require` místo `assert`, protože Echidna to nebude schopna detekovat (ale kontrakt se stejně zvrátí).

### Shrnutí: Kontrola asertů {#summary-assertion-checking}

Následující text shrnuje běh Echidny na našem příkladu:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna zjistila, že asert ve funkci `inc` může selhat, pokud je tato funkce volána vícekrát s velkými argumenty.

## Shromažďování a úprava korpusu Echidny {#collecting-and-modifying-an-echidna-corpus}

Ukážeme si, jak shromažďovat a používat korpus transakcí s Echidnou. Cílem je následující chytrý kontrakt [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Tento malý příklad nutí Echidnu najít určité hodnoty ke změně stavové proměnné. To je pro fuzzer obtížné.
Můžeme spustit Echidnu, abychom si to ověřili:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Stále však můžeme použít Echidnu ke shromažďování korpusu při spuštění této fuzzingové kampaně.

### Shromažďování korpusu {#collecting-a-corpus}

Chcete-li povolit shromažďování korpusu, vytvořte adresář pro korpus:

```sh
mkdir corpus-magic
```

A [konfigurační soubor Echidny](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Nyní můžeme spustit náš nástroj a zkontrolovat shromážděný korpus:

```sh
echidna magic.sol --config config.yaml
```

Echidna stále nemůže najít správné magické hodnoty. Chcete-li vidět, kde se zasekla, podívejte se na zprávu o pokrytí `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Značka `r` znamená, že Echidna dosáhla tohoto řádku, ale provádění se tam zvrátilo a řádky za posledním `require` se nikdy neprovedou.

Sekvence transakcí, které Echidna shromáždila, jsou uloženy jako soubory JSON v `corpus-magic/coverage/`. Například první transakce jednoho z těchto souborů byla:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Je zřejmé, že tento vstup nespustí selhání v naší vlastnosti. V dalším kroku však uvidíme, jak jej pro tento účel upravit.

### Seedování korpusu {#seeding-a-corpus}

Echidna potřebuje trochu pomoci, aby se vypořádala s funkcí `magic`. Zkopírujeme a upravíme vstup tak, abychom pro ni použili vhodné
parametry (názvy souborů jsou náhodné, takže použijte nějaký z vašeho vlastního adresáře `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Upravíme `new.txt` tak, aby obsahoval jedinou transakci volající `magic(42,129,333,0)`. Nyní můžeme Echidnu spustit znovu:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Tentokrát zjistila, že vlastnost je porušena okamžitě.

## Hledání transakcí s vysokou spotřebou gasu {#finding-transactions-with-high-gas-consumption}

Ukážeme si, jak pomocí Echidny najít transakce s vysokou spotřebou gasu. Starší verze Echidny pro to měly volbu `estimateGas`; ta byla ve verzi Echidna 2.3.0 odstranena. Místo toho měříme gas pomocí `gasleft()` a necháme [optimalizační režim](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) Echidny, aby jej maximalizoval. Cílem je následující chytrý kontrakt:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Zde může mít `expensive` velkou spotřebu gasu.

### Měření spotřeby gasu {#measuring-gas-consumption}

V optimalizačním režimu hledá Echidna funkce začínající na `echidna_`, které neberou žádný argument a vracejí `int256`, a snaží se najít sekvenci transakcí, která maximalizuje vrácenou hodnotu. Přidáme testovací kontrakt, který volá `f`, zaznamenává spotřebovaný gas a vystavuje maximum (uložte oba kontrakty do `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Chcete-li povolit optimalizační režim, vytvořte konfigurační soubor `config.yaml`. V tomto příkladu také zmenšíme velikost sekvence transakcí, aby byly výsledky snáze srozumitelné:

```yaml
testMode: optimization
seqLen: 2
```

### Spuštění Echidny {#run-echidna-3}

Jakmile máme vytvořený konfigurační soubor, můžeme Echidnu spustit takto:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Zobrazený gas je měřen implementací virtuálního stroje Etherea (EVM), na které Echidna běží, [hevm](https://github.com/argotorg/hevm), a zahrnuje režii interního volání z `measureF`.
- Maximum není unikátní: každá kampaň je náhodná a delší kampaně (například `--test-limit 200000`) mají tendenci nacházet vyšší hodnoty.

### Odfiltrování volání snižujících gas {#filtering-out-gas-reducing-calls}

Výše uvedený tutoriál o **filtrování funkcí volaných během fuzzingové kampaně** ukazuje, jak
odstranit některé funkce z vašeho testování.
To může být kritické pro získání přesného odhadu gasu.
Zvažte následující příklad:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` volá `check` a vrací jeho náklady na gas. Jako u každé testovací funkce Echidny jsou její změny stavu následně zahozeny.

Pokud může Echidna volat všechny funkce, nenajde snadno transakce s vysokými náklady na gas:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Je to proto, že náklady závisí na velikosti `addrs` a náhodná volání mají tendenci ponechat pole téměř prázdné.
Přidání `pop` a `clear` na blacklist nám však dává mnohem lepší výsledky:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Zkrácení sekvence volání pro tento výsledek trvá několik minut, protože každé přehrání volá nákladnou funkci `check`.

### Shrnutí: Hledání transakcí s vysokou spotřebou gasu {#summary-finding-transactions-with-high-gas-consumption}

Echidna dokáže najít transakce s vysokou spotřebou gasu měřením gasu pomocí `gasleft()` ve funkci `echidna_`, která vrací `int256`, a spuštěním v optimalizačním režimu:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Jakmile fuzzingová kampaň skončí, Echidna nahlásí nalezenou maximální hodnotu a sekvenci transakcí, která ji vyprodukovala.
