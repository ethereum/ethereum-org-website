---
title: Jinsi ya kutumia Manticore kupata hitilafu katika Mkataba-erevu
description: Jinsi ya kutumia Manticore kupata hitilafu kiotomatiki katika Mkataba-erevu
author: Trailofbits
lang: sw
tags:
  [
    "uimara",
    "mikataba erevu",
    "usalama",
    "majaribio",
    "uthibitishaji rasmi"
  ]
skill: advanced
published: 2020-01-13
source: Kujenga mikataba salama
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Lengo la mafunzo haya ni kuonyesha jinsi ya kutumia Manticore kupata hitilafu kiotomatiki katika Mkataba-erevu.

## Usakinishaji {#installation}

Manticore inahitaji >= python 3.6. Inaweza kusakinishwa kupitia pip au kwa kutumia docker.

### Manticore kupitia docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Amri ya mwisho huendesha eth-security-toolbox kwenye docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na uendeshe zana kwenye faili kutoka kwa docker_

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

## Utangulizi wa utekelezaji wa ishara wenye nguvu {#introduction-to-dynamic-symbolic-execution}

### Utekelezaji wa Ishara Wenye Nguvu kwa Kifupi {#dynamic-symbolic-execution-in-a-nutshell}

Utekelezaji wa ishara wenye nguvu (DSE) ni mbinu ya uchambuzi wa programu ambayo inachunguza nafasi ya hali na kiwango cha juu cha ufahamu wa kisemantiki. Mbinu hii inategemea ugunduzi wa "njia za programu", zinazowakilishwa kama kanuni za hisabati zinazoitwa `path predicates`. Kimsingi, mbinu hii hufanya kazi kwenye viarifu vya njia katika hatua mbili:

1. Zinajengwa kwa kutumia vikwazo kwenye pembejeo ya programu.
2. Zinatumika kutengeneza pembejeo za programu ambazo zitasababisha njia zinazohusiana kutekelezwa.

Mbinu hii haitoi chanya za uwongo kwa maana kwamba hali zote za programu zilizotambuliwa zinaweza kuanzishwa wakati wa utekelezaji halisi. Kwa mfano, ikiwa uchambuzi utapata kufurika kwa nambari, imehakikishwa kuwa inaweza kuzalishwa tena.

### Mfano wa Kiarifu cha Njia {#path-predicate-example}

Ili kupata maarifa ya jinsi DSE inavyofanya kazi, zingatia mfano ufuatao:

```solidity
function f(uint a){

  if (a == 65) {
      // Kuna hitilafu
  }

}
```

Kwa vile `f()` ina njia mbili, DSE itaunda viarifu viwili tofauti vya njia:

- Njia ya 1: `a == 65`
- Njia ya 2: `Si (a == 65)`

Kila kiarifu cha njia ni fomula ya hisabati ambayo inaweza kupewa kile kinachoitwa [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories), ambayo itajaribu kutatua mlingano. Kwa `Njia 1`, kisuluhishi kitasema kuwa njia inaweza kuchunguzwa na `a = 65`. Kwa `Njia 2`, kisuluhishi kinaweza kutoa `a` thamani yoyote isipokuwa 65, kwa mfano `a = 0`.

### Kuthibitisha sifa {#verifying-properties}

Manticore inaruhusu udhibiti kamili juu ya utekelezaji wote wa kila njia. Kwa hivyo, hukuruhusu kuongeza vikwazo vya kiholela kwa karibu kila kitu. Udhibiti huu unaruhusu uundaji wa sifa kwenye mkataba.

Fikiria mfano ufuatao:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // hakuna ulinzi wa kufurika
  return c;
}
```

Hapa kuna njia moja tu ya kuchunguza katika kitendakazi:

- Njia ya 1: `c = a + b`

Ukitumia Manticore, unaweza kuangalia kufurika, na kuongeza vikwazo kwa kiarifu cha njia:

- `c = a + b NA (c < a AU c < b)`

Ikiwezekana kupata uthamini wa `a` na `b` ambapo kiarifu cha njia hapo juu kinawezekana, inamaanisha kuwa umepata kufurika. Kwa mfano, kisuluhishi kinaweza kutoa ingizo `a = 10, b = MAXUINT256`.

Ukizingatia toleo lililorekebishwa:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Fomula inayohusishwa na ukaguzi wa kufurika itakuwa:

- `c = a + b NA (c >= a) NA (c=>b) NA (c < a AU c < b)`

Fomula hii haiwezi kutatuliwa; kwa maneno mengine huu ni **uthibitisho** kwamba katika `safe_add`, `c` itaongezeka kila wakati.

Kwa hivyo DSE ni zana yenye nguvu, ambayo inaweza kuthibitisha vikwazo vya kiholela kwenye msimbo wako.

## Inaendeshwa chini ya Manticore {#running-under-manticore}

Tutaona jinsi ya kuchunguza Mkataba-erevu na API ya Manticore. Lengo ni Mkataba-erevu ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Endesha uchunguzi wa pekee {#run-a-standalone-exploration}

Unaweza kuendesha Manticore moja kwa moja kwenye Mkataba-erevu kwa amri ifuatayo (`project` inaweza kuwa Faili ya Solidity, au saraka ya mradi):

```bash
$ manticore project
```

Utapata matokeo ya kesi za majaribio kama hii (mpangilio unaweza kubadilika):

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

Bila maelezo ya ziada, Manticore itachunguza mkataba na miamala mipya ya ishara
hadi isichugunze njia mpya kwenye mkataba. Manticore haiendeshi miamala mipya baada ya ule ulioshindwa (k.m: baada ya kurudishwa).

Manticore itatoa taarifa katika saraka ya `mcore_*`. Miongoni mwa mengine, utapata katika saraka hii:

- `global.summary`: ufikiaji na maonyo ya mkusanyaji
- `test_XXXXX.summary`: ufikiaji, maagizo ya mwisho, salio za akaunti kwa kila kesi ya jaribio
- `test_XXXXX.tx`: orodha ya kina ya miamala kwa kila kesi ya jaribio

Hapa Manticore ilipata kesi 7 za majaribio, ambazo zinalingana na (mpangilio wa jina la faili unaweza kubadilika):

|                                                           |      Muamala 0     |          Muamala 1         | Muamala 2                  | Matokeo |
| :-------------------------------------------------------: | :----------------: | :------------------------: | -------------------------- | :-----: |
| **test_00000000.tx** | Uundaji wa mkataba | f(!=65) | f(!=65) |   STOP  |
| **test_00000001.tx** | Uundaji wa mkataba | kitendaji cha kurudi nyuma |                            |  REVERT |
| **test_00000002.tx** | Uundaji wa mkataba |                            |                            |  RETURN |
| **test_00000003.tx** | Uundaji wa mkataba |  f(65)  |                            |  REVERT |
| **test_00000004.tx** | Uundaji wa mkataba | f(!=65) |                            |   STOP  |
| **test_00000005.tx** | Uundaji wa mkataba | f(!=65) | f(65)   |  REVERT |
| **test_00000006.tx** | Uundaji wa mkataba | f(!=65) | kitendaji cha kurudi nyuma |  REVERT |

_Muhtasari wa uchunguzi f(!=65) unaashiria f kuitwa na thamani yoyote tofauti na 65._

Kama unavyoweza kuona, Manticore inazalisha kesi ya kipekee ya majaribio kwa kila muamala uliofaulu au uliorudishwa.

Tumia alama ya `--quick-mode` ikiwa unataka uchunguzi wa haraka wa msimbo (huzima vitambua hitilafu, ukokotoaji wa gesi, ...)

### Kudhibiti Mkataba-erevu kupitia API {#manipulate-a-smart-contract-through-the-api}

Sehemu hii inaelezea kwa undani jinsi ya kudhibiti Mkataba-erevu kupitia API ya Python ya Manticore. Unaweza kuunda faili mpya yenye kiendelezi cha python `*.py` na uandike msimbo unaohitajika kwa kuongeza amri za API (misingi yake itaelezwa hapa chini) kwenye faili hii na kisha kuiendesha kwa amri ya `$ python3 *.py`. Pia unaweza kutekeleza amri zilizo hapa chini moja kwa moja kwenye konsoli ya python, ili kuendesha konsoli tumia amri ya `$ python3`.

### Kuunda Akaunti {#creating-accounts}

Jambo la kwanza unapaswa kufanya ni kuanzisha mnyororo wa bloku mpya na amri zifuatazo:

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
# Anzisha mkataba
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Muhtasari {#summary}

- Unaweza kuunda akaunti za mtumiaji na akaunti za mkataba kwa kutumia [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) na [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Kutekeleza miamala {#executing-transactions}

Manticore inasaidia aina mbili za miamala:

- Muamala ghafi: vitendakazi vyote vinachunguzwa
- Muamala wenye jina: kitendakazi kimoja tu ndicho kinachunguzwa

#### Muamala ghafi {#raw-transaction}

Muamala ghafi unatekelezwa kwa kutumia [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Mpigaji simu, anwani, data, au thamani ya muamala inaweza kuwa halisi au ya kiishara:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) huunda thamani ya kiishara.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) huunda safu ya baiti ya kiishara.

Kwa mfano:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Ikiwa data ni ya kiishara, Manticore itachunguza vitendakazi vyote vya mkataba wakati wa utekelezaji wa muamala. Itakuwa na msaada kuona maelezo ya Kitendaji cha Kurudi Nyuma katika makala ya [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) kwa kuelewa jinsi uteuzi wa kitendakazi unavyofanya kazi.

#### Muamala wenye jina {#named-transaction}

Vitendakazi vinaweza kutekelezwa kupitia jina lao.
Ili kutekeleza `f(uint var)` na thamani ya kiishara, kutoka user_account, na ether 0, tumia:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Ikiwa `thamani` ya muamala haijaainishwa, ni 0 kwa chaguo-msingi.

#### Muhtasari {#summary-1}

- Hoja za muamala zinaweza kuwa halisi au za kiishara
- Muamala ghafi utachunguza vitendakazi vyote
- Kitendakazi kinaweza kuitwa kwa jina lake

### Eneo la kazi {#workspace}

`m.workspace` ni saraka inayotumika kama saraka ya matokeo kwa faili zote zinazozalishwa:

```python
print("Matokeo yako katika {}".format(m.workspace))
```

### Sisha Uchunguzi {#terminate-the-exploration}

Ili kusimamisha uchunguzi tumia [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Hakuna miamala zaidi inapaswa kutumwa mara tu mbinu hii inapoitwa na Manticore hutoa kesi za majaribio kwa kila njia iliyochunguzwa.

### Muhtasari: Inaendeshwa chini ya Manticore {#summary-running-under-manticore}

Kuweka hatua zote zilizopita pamoja, tunapata:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Matokeo yako katika {}".format(m.workspace))
m.finalize() # simamisha uchunguzi
```

Msimbo wote hapo juu unaweza kuupata katika [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Kupata njia za kurusha {#getting-throwing-paths}

Sasa tutatoa pembejeo maalum kwa njia zinazoibua ubaguzi katika `f()`. Lengo bado ni Mkataba-erevu ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Kutumia taarifa ya hali {#using-state-information}

Kila njia inayotekelezwa ina hali yake ya mnyororo wa bloku. Hali iko tayari au inauawa, ikimaanisha kwamba inafikia maagizo ya KUTUPA au KURUDISHA:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): orodha ya hali ambazo ziko tayari (hazikutekeleza REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): orodha ya hali ambazo zimeuawa
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

### Jinsi ya kuzalisha kesi ya majaribio {#how-to-generate-testcase}

Tumia [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) kuzalisha kesi ya majaribio:

```python
m.generate_testcase(state, 'BugFound')
```

### Muhtasari {#summary-2}

- Unaweza kurudia hali kwa m.all_states
- `state.platform.get_balance(account.address)` inarudisha salio la akaunti
- `state.platform.transactions` inarudisha orodha ya miamala
- `transaction.return_data` ni data iliyorejeshwa
- `m.generate_testcase(state, name)` inazalisha pembejeo za hali

### Muhtasari: Kupata Njia ya Kutupa {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Angalia ikiwa utekelezaji unaisha na REVERT au INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Tupa imepatikana {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Msimbo wote ulio hapo juu unaweza kuupata kwenye [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Kumbuka tungeweza kutoa hati rahisi zaidi, kwani hali zote zilizorejeshwa na terminated_state zina REVERT au INVALID katika matokeo yao: mfano huu ulikusudiwa tu kuonyesha jinsi ya kuendesha API._

## Kuongeza vikwazo {#adding-constraints}

Tutaona jinsi ya kuzuia uchunguzi. Tutafanya dhana kwamba nyaraka
za `f()` inasema kwamba kitendakazi hakijaitwa kamwe na `a == 65`, kwa hivyo hitilafu yoyote na `a == 65` sio hitilafu halisi. Lengo bado ni Mkataba-erevu ufuatao [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Sehemu ya [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) hurahisisha upotoshaji wa vikwazo, miongoni mwa vingine hutoa:

- Operators.NA,
- Operators.AU,
- Operators.UGT (kubwa kuliko isiyo na alama),
- Operators.UGE (kubwa kuliko au sawa na isiyo na alama),
- Operators.ULT (chini kuliko isiyo na alama),
- Operators.ULE (chini kuliko au sawa na isiyo na alama).

Ili kuingiza moduli tumia yafuatayo:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` hutumiwa kuunganisha safu kwa thamani. Kwa mfano, return_data ya muamala inahitaji kubadilishwa kuwa thamani ili kuangaliwa dhidi ya thamani nyingine:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Vikwazo {#state-constraint}

Unaweza kutumia vikwazo kimataifa au kwa hali maalum.

#### Kikwazo cha kimataifa {#state-constraint}

Tumia `m.constrain(constraint)` kuongeza kikwazo cha kimataifa.
Kwa mfano, unaweza kuita mkataba kutoka kwa anwani ya ishara, na kuzuia anwani hii kuwa na maadili maalum:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Kikwazo cha hali {#state-constraint}

Tumia [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) kuongeza kikwazo kwa hali maalum.
Inaweza kutumika kuzuia hali baada ya uchunguzi wake kuangalia mali fulani juu yake.

### Kuangalia Kikwazo {#checking-constraint}

Tumia `solver.check(state.constraints)` kujua kama kikwazo bado kinawezekana.
Kwa mfano, yafuatayo yatazuia symbolic_value kuwa tofauti na 65 na kuangalia kama hali bado inawezekana:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # hali inawezekana
```

### Muhtasari: Kuongeza Vikwazo {#summary-adding-constraints}

Kuongeza kikwazo kwa msimbo uliopita, tunapata:

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

## Angalia ikiwa utekelezaji unaisha na REVERT au INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # hatuzingatii njia ambapo a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Hitilafu imepatikana, matokeo yapo kwenye {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Hakuna hitilafu iliyopatikana')
```

Msimbo wote ulio hapo juu unaweza kuupata kwenye [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
