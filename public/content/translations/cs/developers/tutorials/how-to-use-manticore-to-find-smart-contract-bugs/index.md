---
title: "Jak používat Manticore k hledání chyb v chytrých kontraktech"
description: "Jak používat Manticore k automatickému hledání chyb v chytrých kontraktech"
author: Trailofbits
lang: cs
tags:
  - solidity
  - chytré kontrakty
  - bezpečnost
  - testování
  - formální verifikace
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Cílem tohoto tutoriálu je ukázat, jak používat Manticore k automatickému hledání chyb v chytrých kontraktech.

## Instalace {#installation}

Manticore vyžaduje >= Python 3.6. Lze jej nainstalovat přes pip nebo pomocí Dockeru.

### Manticore přes Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v Dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory ze svého hostitelského systému a spouštět nástroje na souborech z Dockeru._

Uvnitř Dockeru spusťte:

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

Pro spuštění skriptu v Pythonu pomocí Python 3:

```bash
python3 script.py
```

## Úvod do dynamického symbolického provádění {#introduction-to-dynamic-symbolic-execution}

### Dynamické symbolické provádění v kostce {#dynamic-symbolic-execution-in-a-nutshell}

Dynamické symbolické provádění (DSE) je technika analýzy programů, která prozkoumává stavový prostor s vysokou mírou sémantického povědomí. Tato technika je založena na objevování „programových cest“, reprezentovaných jako matematické vzorce zvané `path predicates`. Koncepčně tato technika pracuje s predikáty cest ve dvou krocích:

1. Jsou konstruovány pomocí omezení na vstupu programu.
2. Používají se ke generování vstupů programu, které způsobí spuštění přidružených cest.

Tento přístup neprodukuje žádné falešně pozitivní výsledky v tom smyslu, že všechny identifikované stavy programu lze vyvolat během konkrétního provádění. Pokud například analýza najde přetečení celého čísla, je zaručeno, že je reprodukovatelné.

### Příklad predikátu cesty {#path-predicate-example}

Chcete-li získat představu o tom, jak DSE funguje, zvažte následující příklad:

```solidity
function f(uint a){

  if (a == 65) {
      // Je přítomna chyba
  }

}
```

Vzhledem k tomu, že `f()` obsahuje dvě cesty, DSE zkonstruuje dva různé predikáty cest:

- Cesta 1: `a == 65`
- Cesta 2: `Not (a == 65)`

Každý predikát cesty je matematický vzorec, který lze předat takzvanému [SMT řešiteli](https://wikipedia.org/wiki/Satisfiability_modulo_theories), jenž se pokusí rovnici vyřešit. Pro `Path 1` řešitel řekne, že cestu lze prozkoumat s `a = 65`. Pro `Path 2` může řešitel přiřadit `a` jakoukoli hodnotu jinou než 65, například `a = 0`.

### Ověřování vlastností {#verifying-properties}

Manticore umožňuje plnou kontrolu nad celým prováděním každé cesty. Díky tomu vám umožňuje přidávat libovolná omezení téměř k čemukoli. Tato kontrola umožňuje vytváření vlastností na kontraktu.

Zvažte následující příklad:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // žádná ochrana proti přetečení
  return c;
}
```

Zde je ve funkci k prozkoumání pouze jedna cesta:

- Cesta 1: `c = a + b`

Pomocí Manticore můžete zkontrolovat přetečení a přidat omezení do predikátu cesty:

- `c = a + b AND (c < a OR c < b)`

Pokud je možné najít ohodnocení `a` a `b`, pro které je výše uvedený predikát cesty splnitelný, znamená to, že jste našli přetečení. Řešitel může například vygenerovat vstup `a = 10 , b = MAXUINT256`.

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

Tento vzorec nelze vyřešit; jinými slovy je to **důkaz**, že v `safe_add` se `c` vždy zvýší.

DSE je tak mocný nástroj, který dokáže ověřit libovolná omezení ve vašem kódu.

## Spuštění pod Manticore {#running-under-manticore}

Podíváme se, jak prozkoumat chytrý kontrakt pomocí Manticore API. Cílem je následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Spuštění samostatného průzkumu {#run-a-standalone-exploration}

Manticore můžete spustit přímo na chytrém kontraktu pomocí následujícího příkazu (`project` může být soubor Solidity nebo adresář projektu):

```bash
$ manticore project
```

Získáte výstup testovacích případů podobný tomuto (pořadí se může změnit):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Vygenerován testovací případ č. 1 - REVERT
... m.c.manticore:INFO: Vygenerován testovací případ č. 2 - RETURN
... m.c.manticore:INFO: Vygenerován testovací případ č. 3 - REVERT
... m.c.manticore:INFO: Vygenerován testovací případ č. 4 - STOP
... m.c.manticore:INFO: Vygenerován testovací případ č. 5 - REVERT
... m.c.manticore:INFO: Vygenerován testovací případ č. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Bez dalších informací bude Manticore prozkoumávat kontrakt pomocí nových symbolických transakcí, dokud na kontraktu neobjeví nové cesty. Manticore nespouští nové transakce po té, která selhala (např. po zvrácení).

Manticore vypíše informace do adresáře `mcore_*`. Mimo jiné v tomto adresáři najdete:

- `global.summary`: pokrytí a varování kompilátoru
- `test_XXXXX.summary`: pokrytí, poslední instrukce, zůstatky na účtech pro každý testovací případ
- `test_XXXXX.tx`: podrobný seznam transakcí pro každý testovací případ

Zde Manticore našel 7 testovacích případů, které odpovídají (pořadí názvů souborů se může změnit):

|                      |   Transakce 0   |   Transakce 1   | Transakce 2     | Výsledek |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Vytvoření kontraktu |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Vytvoření kontraktu | záložní funkce |                   | REVERT |
| **test_00000002.tx** | Vytvoření kontraktu |                   |                   | RETURN |
| **test_00000003.tx** | Vytvoření kontraktu |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Vytvoření kontraktu |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Vytvoření kontraktu |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Vytvoření kontraktu |      f(!=65)      | záložní funkce | REVERT |

_Shrnutí průzkumu: f(!=65) označuje volání f s jakoukoli hodnotou odlišnou od 65._

Jak si můžete všimnout, Manticore generuje unikátní testovací případ pro každou úspěšnou nebo zvrácenou transakci.

Použijte příznak `--quick-mode`, pokud chcete rychlý průzkum kódu (zakáže detektory chyb, výpočet gasu atd.).

### Manipulace s chytrým kontraktem přes API {#manipulate-a-smart-contract-through-the-api}

Tato část podrobně popisuje, jak manipulovat s chytrým kontraktem prostřednictvím Manticore Python API. Můžete vytvořit nový soubor s příponou Pythonu `*.py` a napsat potřebný kód přidáním příkazů API (jejichž základy budou popsány níže) do tohoto souboru a poté jej spustit příkazem `$ python3 *.py`. Níže uvedené příkazy můžete také spouštět přímo v konzoli Pythonu; pro spuštění konzole použijte příkaz `$ python3`.

### Vytváření účtů {#creating-accounts}

První věc, kterou byste měli udělat, je inicializovat nový blockchain pomocí následujících příkazů:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Účet, který není kontraktem, se vytvoří pomocí [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Shrnutí {#summary}

- Uživatelské a kontraktové účty můžete vytvářet pomocí [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) a [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Provádění transakcí {#executing-transactions}

Manticore podporuje dva typy transakcí:

- Surová transakce (raw transaction): prozkoumají se všechny funkce
- Pojmenovaná transakce (named transaction): prozkoumá se pouze jedna funkce

#### Surová transakce {#raw-transaction}

Surová transakce se provádí pomocí [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Volající, adresa, data nebo hodnota transakce mohou být buď konkrétní, nebo symbolické:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) vytvoří symbolickou hodnotu.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) vytvoří symbolické pole bajtů.

Například:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Pokud jsou data symbolická, Manticore během provádění transakce prozkoumá všechny funkce kontraktu. Pro pochopení toho, jak funguje výběr funkcí, bude užitečné podívat se na vysvětlení záložní funkce v článku [Prakticky s Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/).

#### Pojmenovaná transakce {#named-transaction}

Funkce lze spouštět prostřednictvím jejich názvu.
Pro spuštění `f(uint var)` se symbolickou hodnotou, z user_account a s 0 ethery použijte:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Pokud není zadána `value` transakce, je ve výchozím nastavení 0.

#### Shrnutí {#summary-1}

- Argumenty transakce mohou být konkrétní nebo symbolické
- Surová transakce prozkoumá všechny funkce
- Funkce lze volat jejich jménem

### Pracovní prostor {#workspace}

`m.workspace` je adresář používaný jako výstupní adresář pro všechny vygenerované soubory:

```python
print("Results are in {}".format(m.workspace))
```

### Ukončení průzkumu {#terminate-the-exploration}

K zastavení průzkumu použijte [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Jakmile je tato metoda zavolána, neměly by být odesílány žádné další transakce a Manticore vygeneruje testovací případy pro každou prozkoumanou cestu.

### Shrnutí: Spuštění pod Manticore {#summary-running-under-manticore}

Spojením všech předchozích kroků dohromady získáme:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # zastavit průzkum
```

Veškerý výše uvedený kód najdete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Získání cest vyvolávajících výjimky {#getting-throwing-paths}

Nyní vygenerujeme specifické vstupy pro cesty vyvolávající výjimku v `f()`. Cílem je stále následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Každá provedená cesta má svůj stav blockchainu. Stav je buď připravený (ready), nebo je ukončený (killed), což znamená, že dosáhne instrukce THROW nebo REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): seznam stavů, které jsou připravené (neprovedly REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): seznam stavů, které jsou ukončené
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): všechny stavy

```python
for state in m.all_states:
    # udělat něco se stavem
```

Můžete přistupovat k informacím o stavu. Například:

- `state.platform.get_balance(account.address)`: zůstatek na účtu
- `state.platform.transactions`: seznam transakcí
- `state.platform.transactions[-1].return_data`: data vrácená poslední transakcí

Data vrácená poslední transakcí jsou pole, které lze převést na hodnotu pomocí ABI.deserialize, například:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Jak vygenerovat testovací případ {#how-to-generate-testcase}

K vygenerování testovacího případu použijte [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase):

```python
m.generate_testcase(state, 'BugFound')
```

### Shrnutí {#summary-2}

- Můžete iterovat přes stavy pomocí m.all_states
- `state.platform.get_balance(account.address)` vrací zůstatek účtu
- `state.platform.transactions` vrací seznam transakcí
- `transaction.return_data` jsou vrácená data
- `m.generate_testcase(state, name)` generuje vstupy pro daný stav

### Shrnutí: Získání cesty vyvolávající výjimku {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Zkontrolujte, zda provádění končí ZVRÁCENÍM nebo INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Veškerý výše uvedený kód najdete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Poznámka: Mohli jsme vygenerovat mnohem jednodušší skript, protože všechny stavy vrácené terminated_state mají ve svém výsledku REVERT nebo INVALID. Tento příklad měl pouze demonstrovat, jak manipulovat s API._

## Přidávání omezení {#adding-constraints}

Podíváme se, jak omezit průzkum. Budeme předpokládat, že dokumentace `f()` uvádí, že funkce není nikdy volána s `a == 65`, takže jakákoli chyba s `a == 65` není skutečnou chybou. Cílem je stále následující chytrý kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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
- Operators.UGT (unsigned greater than - neznaménkové větší než),
- Operators.UGE (unsigned greater than or equal to - neznaménkové větší než nebo rovno),
- Operators.ULT (unsigned lower than - neznaménkové menší než),
- Operators.ULE (unsigned lower than or equal to - neznaménkové menší než nebo rovno).

Pro import modulu použijte následující:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` se používá ke zřetězení pole na hodnotu. Například return_data transakce je třeba změnit na hodnotu, aby ji bylo možné porovnat s jinou hodnotou:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Omezení {#state-constraint}

Omezení můžete použít globálně nebo pro konkrétní stav.

#### Globální omezení {#state-constraint-2}

K přidání globálního omezení použijte `m.constrain(constraint)`.
Můžete například zavolat kontrakt ze symbolické adresy a omezit tuto adresu na konkrétní hodnoty:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Omezení stavu {#state-constraint-3}

K přidání omezení pro konkrétní stav použijte [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain).
Lze jej použít k omezení stavu po jeho prozkoumání za účelem kontroly nějaké jeho vlastnosti.

### Kontrola omezení {#checking-constraint}

Použijte `solver.check(state.constraints)`, abyste zjistili, zda je omezení stále splnitelné.
Následující kód například omezí symbolic_value tak, aby se lišila od 65, a zkontroluje, zda je stav stále dosažitelný:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # stav je proveditelný
```

### Shrnutí: Přidávání omezení {#summary-adding-constraints}

Přidáním omezení do předchozího kódu získáme:

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

## Zkontrolujte, zda provádění končí ZVRÁCENÍM nebo INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # neuvažujeme cestu, kde a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Veškerý výše uvedený kód najdete v [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)