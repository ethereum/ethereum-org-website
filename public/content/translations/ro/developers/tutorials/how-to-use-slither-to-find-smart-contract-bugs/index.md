---
title: Cum se utilizează Slither pentru a găsi erori în contractele inteligente
description: Cum se utilizează Slither pentru a găsi automat erori în contractele Inteligente
author: Trailofbits
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
  - "testare"
  - "analiză statică"
skill: advanced
published: 2020-06-09
source: Construirea de contracte sigure
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cum se utilizează Slither {#how-to-use-slither}

Intenția acestui tutorial este de a arăta cum se utilizează Slither pentru a găsi automat erori în contracte inteligente.

- [Instalare](#installation)
- [Utilizarea liniei de comandă](#command-line)
- [Introducere în analiza statică](#static-Analysis): Scurtă introducere în analiza statică
- [API](#api-basics): Descriere API Python

## Instalare {#installation}

Slitter necesită Python >= 3.6. Acesta poate fi instalat prin pip sau folosind docker.

Slither prin pip:

```bash
pip3 install --user slither-analyzer
```

Slither prin docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Ultima comandă rulează eth-Security-Toolbox într-un docker care are acces la directorul curent. Poți să schimbi fișierele din gazdă și să execuți instrumentele de pe fișiere din docker_

În interiorul docker, execută:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Rularea unui script {#running-a-script}

Pentru a rula un script python cu python 3:

```bash
python3 script.py
```

### Linie de comandă {#command-line}

**Linia de comandă în comparație cu scripturile definite de utilizator.** Slither vine cu un set de detectoare predefinite care găsesc multe erori obișnuite. Apelarea Slither din linia de comandă va rula toate detectoarele, fără cunoștințe detaliate de analiză statică necesare:

```bash
slither project_paths
```

Pe lângă detectoare, Slither are capacități de revizuire a codului prin [imprimante](https://github.com/crytic/slither#printers) și [instrumente](https://github.com/crytic/slither#tools).

Use [crytic.io](https://github.com/crytic) to get access to private detectors and GitHub integration.

## Analiză statică {#static-analysis}

Capacitățile și designul cadrului de analiză statică Slither au fost descrise în postările de pe blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) și [academic paper](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Analiza statică există în diferite arome. Cel mai probabil, vei realiza că unele compilatoare precum [clang](https://clang-analyzer.llvm.org/) și [gcc](https://lwn.net/Articles/806099/) depind de aceste tehnici de cercetare, dar și sprijină ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) și instrumente bazate pe metode formale precum [Frama-C](https://frama-c.com/) și [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nu vom analiza exhaustiv tehnicile de analiză statică și cercetătorii aici. În schimb, ne vom concentra pe ce este nevoie pentru a înțelege modul de funcționare a Slither, încât să îl poți folosi mai eficient pentru a găsi erori și înțelege codul.

- [Reprezentarea codului](#code-representation)
- [Analiza codului](#analysis)
- [Reprezentare intermediară](#intermediate-representation)

### Reprezentarea codului {#code-representation}

Spre deosebire de o analiză dinamică, care analizează o singură cale de execuție, analiza statică raționează toate căile simultan. Pentru a face acest lucru, se bazează pe o reprezentare de cod diferită. Două din cele mai frecvente sunt arborele de sintaxă abstractă (AST) și graficul fluxului de control (CFG).

### Arborele de sintaxă abstractă (AST) {#abstract-syntax-trees-ast}

AST este utilizat de fiecare dată când compilatorul analizează codul. Este probabil cea mai de bază structură pe care poate fi efectuată analiza statică.

Pe scurt, un AST este un arbore structurat în care, de obicei, fiecare frunză conține o variabilă sau o constantă și nodurile interne sunt operatori sau operațiuni de control al fluxului. Să considerăm următorul cod:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST-ul corespunzător este indicat în:

![AST](./ast.png)

Slither utilizează AST-ul exportat de solc.

Deși este simplu de construit, AST este o structură imbricată. Uneori, acest lucru nu este cel mai simplu de analizat. De exemplu, pentru a identifica operațiile utilizate de expresia `a + b <= a`, trebuie să analizezi mai întâi `<=` și apoi `+`. O abordare comună este utilizarea așa-numitului model de vizitator, care navighează prin arbore recursiv. Slither conține un vizitator generic în [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Următorul cod utilizează `ExpresionVisitor` pentru a detecta dacă expresia conține o adăugare:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Graficul fluxului de control (CFG) {#control-flow-graph-cfg}

Cea de-a doua reprezentare a codurilor este graficul fluxului de control (CFG). După cum sugerează și numele, este o reprezentare pe bază de grafic care expune toate căile de execuție. Fiecare nod conține una sau mai multe instrucțiuni. Marginile din grafic reprezintă operațiunile fluxului de control (dacă/atunci/altfel, buclă etc.). CFG-ul exemplului nostru anterior este:

![CFG](./cfg.png)

CFG este reprezentarea pe baza căreia sunt construite cele mai multe analize.

Există multe alte reprezentări de cod. Fiecare reprezentare are avantaje și dezavantaje în funcție de analiza pe care dorești să o efectuezi.

### Analiză {#analysis}

Cel mai simplu tip de analize pe care le poți efectua cu Slither sunt analizele sintactice.

### Analiza sintaxei {#syntax-analysis}

Slither poate naviga prin diferite componente ale codului și reprezentarea lor pentru a găsi incoerențe și defecte folosind o abordare asemănătoare modelului.

De exemplu, următoarele detectoare caută probleme legate de sintaxă:

- [„Variabila de stare shadowing”](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): Iterează peste toate variabilele de stare și verifică dacă există vreo variabilă „shadow" dintr-un contract moștenit ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interfață incorectă ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): Caută semnături incorecte pentru funcția ERC20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analiza semantică {#semantic-analysis}

Spre deosebire de analiza sintaxei, o analiză semantică va merge mai adânc și va analiza „sensul" codului. Această familie include câteva tipuri largi de analize. Ele duc la rezultate mai puternice și utile, dar sunt, de asemenea, mai complex de scris.

Analizele semantice sunt utilizate pentru cele mai avansate detectări de vulnerabilitate.

#### Analiza dependenței de date {#fixed-point-computation}

Se spune despre o variabilă cum ar fi `variable_a` că este data dependentă de `variable_b` dacă există o modalitate prin care valoarea `variable_a` să fie influențată de `variable_b`.

În codul următor, `variable_a` depinde de `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither vine cu capabilități [dependențe de date](https://github.com/crytic/slither/wiki/data-dependency) încorporate, datorită reprezentării sale intermediare (discutate într-o secțiune ulterioară).

Un exemplu de utilizare a dependenței de date poate fi găsit în [detectorul de egalitate strictă periculoasă](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Aici Slither va căuta o comparație strictă a egalității cu o valoare periculoasă ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) și va informa utilizatorul că ar trebui să utilizeze `>=` sau `<=` în loc de `==`, pentru a împiedica un atacator să blocheze contractul. Printre altele, detectorul va considera ca fiind periculoasă valoarea returnată a unui apel către `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) și va utiliza motorul dependent de date pentru a urmări utilizarea acestuia.

#### Calcul de punct fix {#fixed-point-computation}

Dacă analiza ta navighează prin CFG și urmează marginile, este posibil să vezi noduri deja vizitate. De exemplu, dacă o buclă este prezentată precum cea de mai jos:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analiza ta va trebui să știe când să se oprească. Există două strategii principale aici: (1) iterare pe fiecare nod un număr finit de ori, (2) calcularea unui așa-numit _fixpoint_. Un fixpoint înseamnă că analiza acestui nod nu oferă nici o informație semnificativa.

Un exemplu de „fixpoint” utilizat poate fi găsit în detectoare de reintrare: Slither explorează nodurile și caută apeluri externe, scrie și citește în stocare. După ce a ajuns la un „fixpoint” ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), acesta oprește explorarea și analizează rezultatele pentru a vedea dacă există o reintrare, prin diferite modele de reintrare ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Scrierea analizelor folosind calculul eficient de punct fix necesită o bună înțelegere a modului în care analiza își propagă informațiile.

### Reprezentarea intermediară {#intermediate-representation}

O reprezentare intermediară (IR) este un limbaj care se dorește a fi mai adecvat la analiza statică decât cea inițială. Slither traduce Solidity în propria sa IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Înțelegerea SlithIR nu este necesară dacă dorești numai să scrii verificări de bază. Cu toate acestea, va fi utilă dacă intenționezi să scrii analize semantice avansate. Imprimantele [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) și [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) te vor ajuta să înțelegi modul în care este tradus codul.

## Principii API {#api-basics}

Slither are un API care îți permite să explorezi atributele de bază ale contractului și funcțiile sale.

Pentru a încărca un cod de bază:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Explorarea contractelor și a funcțiilor {#exploring-contracts-and-functions}

Un obiect `Slitter` are:

- `contracts (list(Contract)`: listă de contracte
- `contracts_derived (list(Contract)`: lista contractelor care nu sunt moștenite de un alt contract (subset de contracte)
- `get_contract_from_name (str)`: Returnează un contract din numele său

Un obiect `contract` are:

- `name (str)`: Numele contractului
- `functions (list(Function))`: Listă de funcții
- `modifiers (list(Modifier))`: Listă de funcții
- `all_functions_called (list(Function/Modifier))`: Lista tuturor funcțiilor interne accesibile prin contract
- `inheritance (list(Contract))`: Lista contractelor moștenite
- `get_function_from_signature (str)`: Returnează o funcție de la semnătură
- `get_modifier_from_signature (str)`: Returnează un modificator de la semnătură
- `get_state_variable_from_name (str)`: Returnează o variabilă de stare din numele său

Un obiect `Function` sau un obiect `Modifier` are:

- `name (str)`: Numele funcției
- `contract (contract)`: contractul în care este declarată funcția
- `nodes (list(Node))`: Lista nodurilor care compun CFG-ul funcției/modificatorului
- `entry_point (Node)`: Punctul de intrare al CFG
- `variables_read (list(Variable))`: Lista variabilelor citite
- `variables_written (list(Variable))`: Lista variabilelor scrise
- `state_variables_read (list(StateVariable))`: Lista variabilelor de stare citite (subset de variabile`read)
- `state_variables_written (list(StateVariable))`: Lista variabilelor de stare scrise (subset de variabile`scris)
