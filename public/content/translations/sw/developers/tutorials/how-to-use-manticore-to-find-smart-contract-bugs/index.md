---
title: Jinsi ya kutumia Manticore kupata hitilafu kwenye mikataba mahiri
description: Jinsi ya kutumia Manticore kupata hitilafu kiotomatiki kwenye mikataba mahiri
author: Trailofbits
lang: sw
tags:
  ["solidity", "mikataba mahiri", "usalama", "upimaji", "uthibitishaji rasmi"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Lengo la mafunzo haya ni kuonyesha jinsi ya kutumia Manticore kupata hitilafu kiotomatiki kwenye mikataba mahiri.

## Usakinishaji {#installation}

Manticore inahitaji >= python 3.6. Inaweza kusakinishwa kupitia pip au kwa kutumia Docker.

### Manticore kupitia Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Amri ya mwisho inaendesha eth-security-toolbox kwenye docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na kuendesha zana kwenye faili kutoka kwa docker_

Ndani ya docker, endesha:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore kupitia pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 inapendekezwa.

### Kuendesha hati {#running-a-script}

Ili kuendesha hati ya python na python 3:

```bash
python3 script.py
```

## Utangulizi wa utekelezaji wa ishara unaobadilika (dynamic symbolic execution) {#introduction-to-dynamic-symbolic-execution}

### Utekelezaji wa Ishara Unaobadilika kwa Ufupi {#dynamic-symbolic-execution-in-a-nutshell}

Utekelezaji wa ishara unaobadilika (DSE) ni mbinu ya uchanganuzi wa programu ambayo inachunguza nafasi ya hali kwa kiwango cha juu cha ufahamu wa kisemantiki. Mbinu hii inategemea ugunduzi wa "njia za programu", zinazowakilishwa kama fomula za hisabati zinazoitwa `path predicates`. Kimawazo, mbinu hii inafanya kazi kwenye viarifu vya njia katika hatua mbili:

1. Zinajengwa kwa kutumia vikwazo kwenye ingizo la programu.
2. Zinatumiwa kuzalisha maingizo ya programu ambayo yatasababisha njia zinazohusiana kutekelezwa.

Mbinu hii haitoi chanya za uongo kwa maana kwamba hali zote za programu zilizotambuliwa zinaweza kuanzishwa wakati wa utekelezaji halisi. Kwa mfano, ikiwa uchanganuzi utapata mzidio wa nambari kamili, unahakikishwa kuwa unaweza kuzalishwa tena.

### Mfano wa Kiarifu cha Njia {#path-predicate-example}

Ili kupata ufahamu wa jinsi DSE inavyofanya kazi, fikiria mfano ufuatao:

```solidity
function f(uint a){

  if (a == 65) {
      // Kuna hitilafu
  }

}
```

Kwa kuwa `f()` ina njia mbili, DSE itajenga viarifu viwili tofauti vya njia:

- Njia ya 1: `a == 65`
- Njia ya 2: `Not (a == 65)`

Kila kiarifu cha njia ni fomula ya hisabati ambayo inaweza kupewa kile kinachoitwa [mtatuaji wa SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), ambaye atajaribu kutatua mlinganyo. Kwa `Path 1`, mtatuaji atasema kwamba njia inaweza kuchunguzwa kwa `a = 65`. Kwa `Path 2`, mtatuaji anaweza kutoa `a` thamani yoyote isipokuwa 65, kwa mfano `a = 0`.

### Kuthibitisha sifa {#verifying-properties}

Manticore inaruhusu udhibiti kamili juu ya utekelezaji wote wa kila njia. Kama matokeo, inakuruhusu kuongeza vikwazo vya kiholela kwa karibu chochote. Udhibiti huu unaruhusu uundaji wa sifa kwenye mkataba.

Fikiria mfano ufuatao:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // hakuna ulinzi wa mzidio
  return c;
}
```

Hapa kuna njia moja tu ya kuchunguza katika fanksheni:

- Njia ya 1: `c = a + b`

Kwa kutumia Manticore, unaweza kuangalia mzidio, na kuongeza vikwazo kwenye kiarifu cha njia:

- `c = a + b AND (c < a OR c < b)`

Ikiwa inawezekana kupata uthamini wa `a` na `b` ambao kiarifu cha njia hapo juu kinawezekana, inamaanisha kuwa umepata mzidio. Kwa mfano mtatuaji anaweza kuzalisha ingizo `a = 10 , b = MAXUINT256`.

Ikiwa utafikiria toleo lililorekebishwa:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Fomula inayohusiana na ukaguzi wa mzidio itakuwa:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Fomula hii haiwezi kutatuliwa; kwa maneno mengine huu ni **uthibitisho** kwamba katika `safe_add`, `c` itaongezeka kila wakati.

DSE kwa hivyo ni zana yenye nguvu, inayoweza kuthibitisha vikwazo vya kiholela kwenye msimbo wako.

## Kuendesha chini ya Manticore {#running-under-manticore}

Tutaona jinsi ya kuchunguza mkataba mahiri na API ya Manticore. Lengo ni mkataba mahiri ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Endesha uchunguzi wa kujitegemea {#run-a-standalone-exploration}

Unaweza kuendesha Manticore moja kwa moja kwenye mkataba mahiri kwa amri ifuatayo (`project` inaweza kuwa Faili ya Solidity, au saraka ya mradi):

```bash
$ manticore project
```

Utapata matokeo ya visa vya majaribio kama hii (mpangilio unaweza kubadilika):

```
...
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 0 - STOP
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 1 - REVERT
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 2 - RETURN
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 3 - REVERT
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 4 - STOP
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 5 - REVERT
... m.c.manticore:INFO: Kisa cha majaribio kilichozalishwa Na. 6 - REVERT
... m.c.manticore:INFO: Matokeo katika /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Bila maelezo ya ziada, Manticore itachunguza mkataba na miamala mipya ya ishara hadi isichunguze njia mpya kwenye mkataba. Manticore haiendeshi miamala mipya baada ya ile iliyoshindwa (k.m: baada ya kutengua).

Manticore itatoa maelezo katika saraka ya `mcore_*`. Miongoni mwa mengine, utapata katika saraka hii:

- `global.summary`: ufikiaji na maonyo ya kikusanyaji
- `test_XXXXX.summary`: ufikiaji, maagizo ya mwisho, salio la akaunti kwa kila kisa cha majaribio
- `test_XXXXX.tx`: orodha ya kina ya miamala kwa kila kisa cha majaribio

Hapa Manticore inagundua visa 7 vya majaribio, ambavyo vinalingana na (mpangilio wa jina la faili unaweza kubadilika):

|                      |   Muamala 0   |   Muamala 1   | Muamala 2     | Matokeo |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Uundaji wa mkataba |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Uundaji wa mkataba | fanksheni mbadala |                   | REVERT |
| **test_00000002.tx** | Uundaji wa mkataba |                   |                   | RETURN |
| **test_00000003.tx** | Uundaji wa mkataba |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Uundaji wa mkataba |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Uundaji wa mkataba |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Uundaji wa mkataba |      f(!=65)      | fanksheni mbadala | REVERT |

_Muhtasari wa uchunguzi f(!=65) unaonyesha f inaitwa na thamani yoyote tofauti na 65._

Kama unavyoweza kugundua, Manticore inazalisha kisa cha kipekee cha majaribio kwa kila muamala uliofanikiwa au uliotenguliwa.

Tumia alama ya `--quick-mode` ikiwa unataka uchunguzi wa haraka wa msimbo (inazima vigunduzi vya hitilafu, ukokotoaji wa gesi, ...)

### Dhibiti mkataba mahiri kupitia API {#manipulate-a-smart-contract-through-the-api}

Sehemu hii inaelezea maelezo ya jinsi ya kudhibiti mkataba mahiri kupitia API ya Python ya Manticore. Unaweza kuunda faili mpya na kiendelezi cha python `*.py` na uandike msimbo unaohitajika kwa kuongeza amri za API (misingi ambayo itaelezwa hapa chini) kwenye faili hili na kisha uiendeshe kwa amri `$ python3 *.py`. Pia unaweza kutekeleza amri hapa chini moja kwa moja kwenye kiweko cha python, ili kuendesha kiweko tumia amri `$ python3`.

### Kuunda Akaunti {#creating-accounts}

Jambo la kwanza unalopaswa kufanya ni kuanzisha mnyororo wa vitalu mpya kwa amri zifuatazo:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Akaunti isiyo ya mkataba inaundwa kwa kutumia [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Mkataba wa Solidity unaweza kusambazwa kwa kutumia [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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

#### Muhtasari {#summary}

- Unaweza kuunda akaunti za mtumiaji na za mkataba kwa [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) na [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Kutekeleza miamala {#executing-transactions}

Manticore inasaidia aina mbili za muamala:

- Muamala ghafi: fanksheni zote zinachunguzwa
- Muamala uliotajwa: fanksheni moja tu inachunguzwa

#### Muamala ghafi {#raw-transaction}

Muamala ghafi unatekelezwa kwa kutumia [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Mpigaji, anwani, data, au thamani ya muamala inaweza kuwa halisi au ya ishara:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) inaunda thamani ya ishara.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) inaunda safu ya baiti ya ishara.

Kwa mfano:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Ikiwa data ni ya ishara, Manticore itachunguza fanksheni zote za mkataba wakati wa utekelezaji wa muamala. Itakuwa na manufaa kuona maelezo ya Fanksheni Mbadala katika makala ya [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) kwa kuelewa jinsi uteuzi wa fanksheni unavyofanya kazi.

#### Muamala uliotajwa {#named-transaction}

Fanksheni zinaweza kutekelezwa kupitia jina lake.
Ili kutekeleza `f(uint var)` na thamani ya ishara, kutoka kwa user_account, na kwa Etha 0, tumia:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Ikiwa `value` ya muamala haijabainishwa, ni 0 kwa chaguo-msingi.

#### Muhtasari {#summary-1}

- Hoja za muamala zinaweza kuwa halisi au za ishara
- Muamala ghafi utachunguza fanksheni zote
- Fanksheni inaweza kuitwa kwa jina lake

### Nafasi ya kazi {#workspace}

`m.workspace` ni saraka inayotumika kama saraka ya matokeo kwa faili zote zinazozalishwa:

```python
print("Results are in {}".format(m.workspace))
```

### Sitisha Uchunguzi {#terminate-the-exploration}

Ili kusimamisha uchunguzi tumia [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Hakuna miamala zaidi inayopaswa kutumwa mara tu mbinu hii inapoitwa na Manticore inazalisha visa vya majaribio kwa kila njia iliyochunguzwa.

### Muhtasari: Kuendesha chini ya Manticore {#summary-running-under-manticore}

Tukiweka hatua zote zilizopita pamoja, tunapata:

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
m.finalize() # simamisha uchunguzi
```

Msimbo wote hapo juu unaweza kuupata katika [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Kupata njia za kurusha (throwing paths) {#getting-throwing-paths}

Sasa tutazalisha maingizo maalum kwa njia zinazoibua ubaguzi katika `f()`. Lengo bado ni mkataba mahiri ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Kutumia maelezo ya hali {#using-state-information}

Kila njia iliyotekelezwa ina hali yake ya mnyororo wa vitalu. Hali iko tayari au inauawa, ikimaanisha kuwa inafikia agizo la THROW au REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): orodha ya hali ambazo ziko tayari (hazikutekeleza REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): orodha ya hali ambazo zinauawa
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): hali zote

```python
for state in m.all_states:
    # fanya kitu na hali
```

Unaweza kufikia maelezo ya hali. Kwa mfano:

- `state.platform.get_balance(account.address)`: salio la akaunti
- `state.platform.transactions`: orodha ya miamala
- `state.platform.transactions[-1].return_data`: data iliyorejeshwa na muamala wa mwisho

Data iliyorejeshwa na muamala wa mwisho ni safu, ambayo inaweza kubadilishwa kuwa thamani na ABI.deserialize, kwa mfano:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Jinsi ya kuzalisha kisa cha majaribio {#how-to-generate-testcase}

Tumia [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) kuzalisha kisa cha majaribio:

```python
m.generate_testcase(state, 'BugFound')
```

### Muhtasari {#summary-2}

- Unaweza kurudia juu ya hali na m.all_states
- `state.platform.get_balance(account.address)` inarejesha salio la akaunti
- `state.platform.transactions` inarejesha orodha ya miamala
- `transaction.return_data` ni data iliyorejeshwa
- `m.generate_testcase(state, name)` inazalisha maingizo kwa ajili ya hali

### Muhtasari: Kupata Njia ya Kurusha {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Kagua kama utekelezaji unaishia na TENGUA au BATILI
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Msimbo wote hapo juu unaweza kuupata katika [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Kumbuka tungeweza kuzalisha hati rahisi zaidi, kwani hali zote zilizorejeshwa na terminated_state zina REVERT au INVALID katika matokeo yao: mfano huu ulikusudiwa tu kuonyesha jinsi ya kudhibiti API._

## Kuongeza vikwazo {#adding-constraints}

Tutaona jinsi ya kuzuia uchunguzi. Tutafanya dhana kwamba nyaraka za `f()` zinasema kwamba fanksheni haijawahi kuitwa na `a == 65`, kwa hivyo hitilafu yoyote na `a == 65` sio hitilafu halisi. Lengo bado ni mkataba mahiri ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Waendeshaji {#operators}

Moduli ya [Waendeshaji](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) inawezesha udhibiti wa vikwazo, miongoni mwa mengine inatoa:

- Operators.AND,
- Operators.OR,
- Operators.UGT (isiyotiwa saini kubwa kuliko),
- Operators.UGE (isiyotiwa saini kubwa kuliko au sawa na),
- Operators.ULT (isiyotiwa saini ndogo kuliko),
- Operators.ULE (isiyotiwa saini ndogo kuliko au sawa na).

Ili kuingiza moduli tumia yafuatayo:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` inatumika kuunganisha safu kwa thamani. Kwa mfano, return_data ya muamala inahitaji kubadilishwa kuwa thamani ili kuangaliwa dhidi ya thamani nyingine:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Vikwazo {#state-constraint}

Unaweza kutumia vikwazo ulimwenguni kote au kwa hali maalum.

#### Kikwazo cha ulimwengu {#state-constraint-2}

Tumia `m.constrain(constraint)` kuongeza kikwazo cha ulimwengu.
Kwa mfano, unaweza kuita mkataba kutoka kwa anwani ya ishara, na kuzuia anwani hii kuwa maadili maalum:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Kikwazo cha hali {#state-constraint-3}

Tumia [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) kuongeza kikwazo kwa hali maalum.
Inaweza kutumika kuzuia hali baada ya uchunguzi wake ili kuangalia sifa fulani juu yake.

### Kuangalia Kikwazo {#checking-constraint}

Tumia `solver.check(state.constraints)` kujua ikiwa kikwazo bado kinawezekana.
Kwa mfano, ifuatayo itazuia symbolic_value kuwa tofauti na 65 na kuangalia ikiwa hali bado inawezekana:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # hali inatekelezeka
```

### Muhtasari: Kuongeza Vikwazo {#summary-adding-constraints}

Kuongeza kikwazo kwenye msimbo uliopita, tunapata:

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

## Kagua kama utekelezaji unaishia na TENGUA au BATILI
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # hatuzingatii njia ambapo a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Msimbo wote hapo juu unaweza kuupata katika [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)