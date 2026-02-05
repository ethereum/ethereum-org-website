---
title: "Jak používat Manticore k vyhledávání chyb v chytrých kontraktech"
description: "Jak používat Manticore k automatickému vyhledávání chyb v chytrých kontraktech"
author: Trailofbits
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "bezpečnost",
    "testování",
    "formální verifikace"
  ]
skill: advanced
published: 2020-01-13
source: "Tvorba bezpečných kontraktů"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Cílem tohoto tutoriálu je ukázat, jak používat Manticore k automatickému vyhledávání chyb v chytrých kontraktech.

## Instalace {#installation}

Manticore vyžaduje python >= 3.6. Lze jej nainstalovat pomocí pip nebo s použitím dockeru.

### Manticore přes docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory z vašeho hostitele a spouštět nástroje na souborech z dockeru_

Uvnitř dockeru spusťte:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore přes pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Doporučuje se solc 0.5.11.

### Spuštění skriptu {#running-a-script}

Pro spuštění pythonového skriptu v pythonu 3:

```bash
python3 script.py
```

## Úvod do dynamického symbolického provádění {#introduction-to-dynamic-symbolic-execution}

### Dynamické symbolické provádění v kostce {#dynamic-symbolic-execution-in-a-nutshell}

Dynamické symbolické provádění (DSE) je technika analýzy programů, která prozkoumává stavový prostor s vysokou mírou sémantického povědomí. Tato technika je založena na objevování „cest programu“, které jsou reprezentovány jako matematické vzorce zvané `path predicates`. Koncepčně tato technika pracuje s predikáty cest ve dvou krocích:

1. Jsou vytvořeny pomocí omezení na vstupu programu.
2. Používají se ke generování vstupů programu, které způsobí provedení příslušných cest.

Tento přístup neprodukuje žádné falešně pozitivní výsledky v tom smyslu, že všechny identifikované stavy programu mohou být spuštěny během konkrétního provádění. Pokud například analýza najde celočíselné přetečení, je zaručeno, že bude reprodukovatelné.

### Příklad predikátu cesty {#path-predicate-example}

Pro lepší představu o tom, jak DSE funguje, zvažte následující příklad:

```solidity
function f(uint a){

  if (a == 65) {
      // Je přítomna chyba
  }

}
```

Protože `f()` obsahuje dvě cesty, DSE vytvoří dva různé predikáty cest:

- Cesta 1: `a == 65`
- Cesta 2: `Not (a == 65)`

Každý predikát cesty je matematický vzorec, který lze předat takzvanému [řešiči SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), který se pokusí rovnici vyřešit. Pro `Cestu 1` řešič řekne, že cestu lze prozkoumat s `a = 65`. Pro `Cestu 2` může řešič dát `a` jakoukoli jinou hodnotu než 65, například `a = 0`.

### Ověřování vlastností {#verifying-properties}

Manticore umožňuje plnou kontrolu nad veškerým prováděním každé cesty. V důsledku toho vám umožňuje přidat libovolná omezení téměř k čemukoli. Tato kontrola umožňuje vytváření vlastností kontraktu.

Zvažte následující příklad:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // žádná ochrana proti přetečení
  return c;
}
```

Zde je ve funkci k prozkoumání pouze jedna cesta:

- Cesta 1: `c = a + b`

Pomocí Manticore můžete zkontrolovat přetečení a přidat omezení k predikátu cesty:

- `c = a + b AND (c < a OR c < b)`

Pokud je možné najít ohodnocení `a` a `b`, pro které je výše uvedený predikát cesty proveditelný, znamená to, že jste našli přetečení. Řešič může například vygenerovat vstup `a = 10, b = MAXUINT256`.

Pokud zvážíte opravenou verzi:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Přidružený vzorec s kontrolou přetečení by byl:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Tento vzorec nelze vyřešit; jinými slovy, je to **důkaz**, že v `safe_add` se `c` vždy zvýší.

DSE je proto mocný nástroj, který dokáže ověřit libovolná omezení ve vašem kódu.

## Spuštění pod Manticore {#running-under-manticore}

Podíváme se, jak prozkoumat chytrý kontrakt s Manticore API. Cílem je následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Spustit samostatné prozkoumávání {#run-a-standalone-exploration}

Manticore můžete spustit přímo na chytrém kontraktu pomocí následujícího příkazu (`project` může být soubor Solidity nebo adresář projektu):

```bash
$ manticore project
```

Získáte výstup testovacích případů, jako je tento (pořadí se může změnit):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Bez dalších informací bude Manticore prozkoumávat kontrakt s novými symbolickými
transakcemi, dokud neprozkoumá nové cesty v kontraktu. Manticore nespouští nové transakce po neúspěšné (např. po revertu).

Manticore vypíše informace do adresáře `mcore_*`. V tomto adresáři mimo jiné najdete:

- `global.summary`: pokrytí a varování kompilátoru
- `test_XXXXX.summary`: pokrytí, poslední instrukce, zůstatky na účtech pro každý testovací případ
- `test_XXXXX.tx`: podrobný seznam transakcí pro každý testovací případ

Zde Manticore našel 7 testovacích případů, které odpovídají (pořadí souborů se může změnit):

|                                                           |     Transakce 0     |         Transakce 1        | Transakce 2                | Výsledek |
| :-------------------------------------------------------: | :-----------------: | :------------------------: | -------------------------- | :------: |
| **test_00000000.tx** | Vytvoření kontraktu | f(!=65) | f(!=65) |   STOP   |
| **test_00000001.tx** | Vytvoření kontraktu |       záložní funkce       |                            |  REVERT  |
| **test_00000002.tx** | Vytvoření kontraktu |                            |                            |  RETURN  |
| **test_00000003.tx** | Vytvoření kontraktu |  f(65)  |                            |  REVERT  |
| **test_00000004.tx** | Vytvoření kontraktu | f(!=65) |                            |   STOP   |
| **test_00000005.tx** | Vytvoření kontraktu | f(!=65) | f(65)   |  REVERT  |
| **test_00000006.tx** | Vytvoření kontraktu | f(!=65) | záložní funkce             |  REVERT  |

_Shrnutí prozkoumávání f(!=65) označuje volání f s jakoukoliv hodnotou jinou než 65._

Jak si můžete všimnout, Manticore generuje jedinečný testovací případ pro každou úspěšnou nebo vrácenou transakci.

Použijte příznak `--quick-mode`, pokud chcete rychlé prozkoumání kódu (vypíná detektory chyb, výpočet gasu atd.)

### Manipulace s chytrým kontraktem přes API {#manipulate-a-smart-contract-through-the-api}

Tato část popisuje podrobnosti o tom, jak manipulovat s chytrým kontraktem prostřednictvím Python API Manticore. Můžete vytvořit nový soubor s příponou pythonu `*.py` a napsat potřebný kód přidáním příkazů API (jejichž základy budou popsány níže) do tohoto souboru a poté jej spustit příkazem `$ python3 *.py`. Níže uvedené příkazy můžete také provést přímo v konzoli pythonu. Konzoli spustíte příkazem `$ python3`.

### Vytváření účtů {#creating-accounts}

První věc, kterou byste měli udělat, je inicializovat nový blockchain pomocí následujících příkazů:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Účet, který není kontraktem, se vytváří pomocí [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrakt v Solidity lze nasadit pomocí [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Inicializace kontraktu
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Shrnutí {#summary}

- Uživatelské účty a účty kontraktů můžete vytvořit pomocí [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) a [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Provádění transakcí {#executing-transactions}

Manticore podporuje dva typy transakcí:

- Nezpracovaná transakce: prozkoumány jsou všechny funkce
- Pojmenovaná transakce: je prozkoumána pouze jedna funkce

#### Nezpracovaná transakce {#raw-transaction}

Nezpracovaná transakce se provádí pomocí [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Volající, adresa, data nebo hodnota transakce mohou být buď konkrétní, nebo symbolické:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) vytvoří symbolickou hodnotu.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) vytvoří symbolické bajtové pole.

Například:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Pokud jsou data symbolická, Manticore prozkoumá všechny funkce kontraktu během provádění transakce. Pro pochopení toho, jak funguje výběr funkcí, bude užitečné podívat se na vysvětlení záložní funkce v článku [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/).

#### Pojmenovaná transakce {#named-transaction}

Funkce lze spouštět prostřednictvím jejich názvu.
Pro spuštění `f(uint var)` se symbolickou hodnotou z user_account a s 0 ethery použijte:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Pokud není `hodnota` transakce specifikována, je ve výchozím nastavení 0.

#### Shrnutí {#summary-1}

- Argumenty transakce mohou být konkrétní nebo symbolické
- Nezpracovaná transakce prozkoumá všechny funkce
- Funkci lze volat podle jejího jména

### Pracovní prostor {#workspace}

`m.workspace` je adresář používaný jako výstupní adresář pro všechny generované soubory:

```python
print("Výsledky jsou v {}".format(m.workspace))
```

### Ukončení prozkoumávání {#terminate-the-exploration}

Pro zastavení prozkoumávání použijte [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Po zavolání této metody by se neměly odesílat žádné další transakce a Manticore vygeneruje testovací případy pro každou prozkoumanou cestu.

### Shrnutí: Spuštění pod Manticore {#summary-running-under-manticore}

Když spojíme všechny předchozí kroky, získáme:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Výsledky jsou v {}".format(m.workspace))
m.finalize() # zastavení prozkoumávání
```

Veškerý výše uvedený kód najdete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Získání cest s výjimkami {#getting-throwing-paths}

Nyní vygenerujeme specifické vstupy pro cesty, které vyvolávají výjimku v `f()`. Cílem je stále následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Použití informací o stavu {#using-state-information}

Každá provedená cesta má svůj stav blockchainu. Stav je buď připraven, nebo je ukončen, což znamená, že dosáhne instrukce THROW nebo REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): seznam stavů, které jsou připraveny (neprovedly REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): seznam stavů, které jsou ukončeny
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): všechny stavy

```python
for state in m.all_states:
    # udělat něco se stavem
```

Můžete přistupovat k informacím o stavu. Například:

- `state.platform.get_balance(account.address)`: zůstatek účtu
- `state.platform.transactions`: seznam transakcí
- `state.platform.transactions[-1].return_data`: data vrácená poslední transakcí

Data vrácená poslední transakcí jsou pole, které lze převést na hodnotu pomocí ABI.deserialize, například:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Jak generovat testovací případ {#how-to-generate-testcase}

Pro generování testovacího případu použijte [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase):

```python
m.generate_testcase(state, 'BugFound')
```

### Shrnutí {#summary-2}

- Stav můžete iterovat pomocí m.all_states
- `state.platform.get_balance(account.address)` vrací zůstatek účtu
- `state.platform.transactions` vrací seznam transakcí
- `transaction.return_data` jsou vrácená data
- `m.generate_testcase(state, name)` generuje vstupy pro daný stav

### Shrnutí: Získání cesty s výjimkou {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Zkontrolujte, zda provádění končí s REVERT nebo INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Nalezena výjimka {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Veškerý výše uvedený kód naleznete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Poznámka: mohli jsme vygenerovat mnohem jednodušší skript, protože všechny stavy vrácené terminated_state mají ve svém výsledku REVERT nebo INVALID: tento příklad měl pouze demonstrovat, jak manipulovat s API._

## Přidávání omezení {#adding-constraints}

Podíváme se, jak omezit prozkoumávání. Budeme vycházet z předpokladu, že
dokumentace funkce `f()` uvádí, že funkce se nikdy nevolá s `a == 65`, takže jakákoli chyba s `a == 65` není skutečnou chybou. Cílem je stále následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operátory {#operators}

Modul [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) usnadňuje manipulaci s omezeními, mimo jiné poskytuje:

- Operators.AND,
- Operators.OR,
- Operators.UGT (větší než bez znaménka),
- Operators.UGE (větší nebo rovno bez znaménka),
- Operators.ULT (menší než bez znaménka),
- Operators.ULE (menší nebo rovno bez znaménka).

Pro import modulu použijte následující příkaz:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` se používá ke zřetězení pole na hodnotu. Například return_data transakce musí být změněna na hodnotu, která se má porovnat s jinou hodnotou:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Omezení {#state-constraint}

Omezení můžete použít globálně nebo pro určitý stav.

#### Globální omezení {#state-constraint}

Použijte `m.constrain(constraint)` pro přidání globálního omezení.
Můžete například zavolat kontrakt ze symbolické adresy a omezit tuto adresu na konkrétní hodnoty:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Omezení stavu {#state-constraint}

Použijte [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) k přidání omezení ke konkrétnímu stavu.
Lze jej použít k omezení stavu po jeho prozkoumání a ke kontrole nějaké jeho vlastnosti.

### Kontrola omezení {#checking-constraint}

Použijte `solver.check(state.constraints)`, abyste zjistili, zda je omezení stále proveditelné.
Následující příklad například omezí symbolic_value tak, aby se lišila od 65, a zkontroluje, zda je stav stále proveditelný:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # stav je proveditelný
```

### Shrnutí: Přidání omezení {#summary-adding-constraints}

Přidáním omezení k předchozímu kódu získáme:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Zkontrolujte, zda provádění končí s REVERT nebo INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # nebereme v úvahu cestu, kde a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Byla nalezena chyba, výsledky jsou v {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Nebyla nalezena žádná chyba')
```

Veškerý výše uvedený kód naleznete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
