---
title: Jinsi ya kutumia Slither kupata hitilafu za mikataba mahiri
description: Jinsi ya kutumia Slither kupata hitilafu kiotomatiki kwenye mikataba mahiri
author: Trailofbits
lang: sw
tags: ["Solidity", "mikataba mahiri", "usalama", "upimaji"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jinsi ya kutumia Slither {#how-to-use-slither}

Lengo la mafunzo haya ni kuonyesha jinsi ya kutumia Slither kupata hitilafu kiotomatiki kwenye mikataba mahiri.

- [Usakinishaji](#installation)
- [Matumizi ya mstari wa amri](#command-line)
- [Utangulizi wa uchanganuzi tuli](#static-analysis): Utangulizi mfupi wa uchanganuzi tuli
- [API](#api-basics): Maelezo ya API ya Python

## Usakinishaji {#installation}

Slither inahitaji Python >= 3.6. Inaweza kusakinishwa kupitia pip au kwa kutumia Docker.

Slither kupitia pip:

```bash
pip3 install --user slither-analyzer
```

Slither kupitia Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Amri ya mwisho inaendesha eth-security-toolbox kwenye Docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na kuendesha zana kwenye faili kutoka kwa Docker_

Ndani ya Docker, endesha:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Kuendesha hati {#running-a-script}

Ili kuendesha hati ya Python na Python 3:

```bash
python3 script.py
```

### Mstari wa amri {#command-line}

**Mstari wa amri dhidi ya hati zilizofafanuliwa na mtumiaji.** Slither inakuja na seti ya vigunduzi vilivyofafanuliwa awali ambavyo hupata hitilafu nyingi za kawaida. Kuita Slither kutoka kwenye mstari wa amri kutaendesha vigunduzi vyote, hakuna ujuzi wa kina wa uchanganuzi tuli unaohitajika:

```bash
slither project_paths
```

Mbali na vigunduzi, Slither ina uwezo wa kukagua msimbo kupitia [vichapishaji](https://github.com/crytic/slither#printers) na [zana](https://github.com/crytic/slither#tools) zake.

Tumia [crytic.io](https://github.com/crytic) kupata ufikiaji wa vigunduzi vya kibinafsi na ujumuishaji wa GitHub.

## Uchanganuzi tuli {#static-analysis}

Uwezo na muundo wa mfumo wa uchanganuzi tuli wa Slither umeelezwa katika machapisho ya blogu ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) na [jarida la kitaaluma](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Uchanganuzi tuli upo katika aina tofauti. Kuna uwezekano mkubwa unatambua kuwa vikusanyaji kama [clang](https://clang-analyzer.llvm.org/) na [gcc](https://lwn.net/Articles/806099/) hutegemea mbinu hizi za utafiti, lakini pia inasaidia ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) na zana zinazotegemea mbinu rasmi kama [Frama-C](https://frama-c.com/) na [Polyspace](https://www.mathworks.com/products/polyspace.html).

Hatutakuwa tukipitia kwa kina mbinu za uchanganuzi tuli na watafiti hapa. Badala yake, tutazingatia kile kinachohitajika kuelewa jinsi Slither inavyofanya kazi ili uweze kuitumia kwa ufanisi zaidi kupata hitilafu na kuelewa msimbo.

- [Uwakilishi wa msimbo](#code-representation)
- [Uchanganuzi wa msimbo](#analysis)
- [Uwakilishi wa kati](#intermediate-representation)

### Uwakilishi wa msimbo {#code-representation}

Tofauti na uchanganuzi thabiti, ambao hutoa sababu kuhusu njia moja ya utekelezaji, uchanganuzi tuli hutoa sababu kuhusu njia zote kwa wakati mmoja. Ili kufanya hivyo, inategemea uwakilishi tofauti wa msimbo. Mbili zinazojulikana zaidi ni mti wa sintaksia dhahania (AST) na grafu ya mtiririko wa udhibiti (CFG).

### Miti ya Sintaksia Dhahania (AST) {#abstract-syntax-trees-ast}

AST hutumiwa kila wakati kikusanyaji kinapochanganua msimbo. Pengine ni muundo wa kimsingi zaidi ambao uchanganuzi tuli unaweza kufanywa.

Kwa ufupi, AST ni mti uliopangwa ambapo, kwa kawaida, kila jani lina kigezo au mara kwa mara na nodi za ndani ni viendeshaji au shughuli za mtiririko wa udhibiti. Fikiria msimbo ufuatao:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST inayolingana imeonyeshwa katika:

![AST](./ast.png)

Slither hutumia AST iliyosafirishwa na solc.

Ingawa ni rahisi kujenga, AST ni muundo uliowekwa. Wakati mwingine, hii sio rahisi zaidi kuchanganua. Kwa mfano, ili kutambua shughuli zinazotumiwa na usemi `a + b <= a`, lazima kwanza uchanganue `<=` na kisha `+`. Mbinu ya kawaida ni kutumia kile kinachoitwa muundo wa mgeni, ambacho hupitia mti kwa kujirudia. Slither ina mgeni wa jumla katika [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Msimbo ufuatao unatumia `ExpressionVisitor` kugundua ikiwa usemi una nyongeza:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression ni kielelezo kinachopaswa kujaribiwa
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafu ya Mtiririko wa Udhibiti (CFG) {#control-flow-graph-cfg}

Uwakilishi wa pili wa msimbo unaojulikana zaidi ni grafu ya mtiririko wa udhibiti (CFG). Kama jina lake linavyopendekeza, ni uwakilishi unaotegemea grafu ambao unafichua njia zote za utekelezaji. Kila nodi ina maagizo moja au mengi. Kingo kwenye grafu zinawakilisha shughuli za mtiririko wa udhibiti (kama/basi/vinginevyo, kitanzi, n.k). CFG ya mfano wetu uliopita ni:

![CFG](./cfg.png)

CFG ni uwakilishi ambao juu yake uchanganuzi mwingi hujengwa.

Uwakilishi mwingine mwingi wa msimbo upo. Kila uwakilishi una faida na hasara kulingana na uchanganuzi unaotaka kufanya.

### Uchanganuzi {#analysis}

Aina rahisi zaidi ya uchanganuzi unaoweza kufanya na Slither ni uchanganuzi wa kisintaksia.

### Uchanganuzi wa sintaksia {#syntax-analysis}

Slither inaweza kupitia vipengele tofauti vya msimbo na uwakilishi wao ili kupata kutofautiana na dosari kwa kutumia mbinu inayofanana na kulinganisha muundo.

Kwa mfano vigunduzi vifuatavyo vinatafuta masuala yanayohusiana na sintaksia:

- [Kufunika kigezo cha hali](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): hurudia juu ya vigezo vyote vya hali na kuangalia ikiwa yoyote inafunika kigezo kutoka kwa mkataba uliorithiwa ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Kiolesura kisicho sahihi cha ERC-20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): tafuta sahihi zisizo sahihi za utendakazi wa ERC-20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Uchanganuzi wa kisemantiki {#semantic-analysis}

Tofauti na uchanganuzi wa sintaksia, uchanganuzi wa kisemantiki utaenda ndani zaidi na kuchanganua "maana" ya msimbo. Familia hii inajumuisha aina fulani pana za uchanganuzi. Zinasababisha matokeo yenye nguvu na muhimu zaidi, lakini pia ni ngumu zaidi kuandika.

Uchanganuzi wa kisemantiki hutumiwa kwa ugunduzi wa hali ya juu zaidi wa udhaifu.

#### Uchanganuzi wa utegemezi wa data {#fixed-point-computation}

Kigezo `variable_a` inasemekana kuwa inategemea data ya `variable_b` ikiwa kuna njia ambayo thamani ya `variable_a` inasukumwa na `variable_b`.

Katika msimbo ufuatao, `variable_a` inategemea `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither inakuja na uwezo uliojengewa ndani wa [utegemezi wa data](https://github.com/crytic/slither/wiki/data-dependency), shukrani kwa uwakilishi wake wa kati (uliojadiliwa katika sehemu ya baadaye).

Mfano wa matumizi ya utegemezi wa data unaweza kupatikana katika [kigunduzi hatari cha usawa mkali](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Hapa Slither itatafuta ulinganisho mkali wa usawa kwa thamani hatari ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), na itamjulisha mtumiaji kwamba inapaswa kutumia `>=` au `<=` badala ya `==`, ili kuzuia mshambuliaji kunasa mkataba. Miongoni mwa mengine, kigunduzi kitazingatia kama hatari thamani ya kurudi ya wito kwa `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), na itatumia injini ya utegemezi wa data kufuatilia matumizi yake.

#### Ukokotoaji wa uhakika uliowekwa {#fixed-point-computation-2}

Ikiwa uchanganuzi wako unapitia CFG na kufuata kingo, kuna uwezekano wa kuona nodi zilizotembelewa tayari. Kwa mfano, ikiwa kitanzi kinawasilishwa kama inavyoonyeshwa hapa chini:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Uchanganuzi wako utahitaji kujua wakati wa kuacha. Kuna mikakati miwili mikuu hapa: (1) kurudia kwenye kila nodi idadi isiyo na kikomo ya nyakati, (2) kukokotoa kile kinachoitwa _fixpoint_. Fixpoint kimsingi inamaanisha kuwa kuchanganua nodi hii hakutoi habari yoyote ya maana.

Mfano wa fixpoint inayotumiwa inaweza kupatikana katika vigunduzi vya uingiaji upya: Slither inachunguza nodi, na kutafuta simu za nje, kuandika na kusoma kwenye hifadhi. Mara tu inapofikia fixpoint ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), inasimamisha uchunguzi, na kuchanganua matokeo ili kuona ikiwa uingiaji upya upo, kupitia mifumo tofauti ya uingiaji upya ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Kuandika uchanganuzi kwa kutumia ukokotoaji mzuri wa uhakika uliowekwa kunahitaji uelewa mzuri wa jinsi uchanganuzi unavyoeneza habari zake.

### Uwakilishi wa kati {#intermediate-representation}

Uwakilishi wa kati (IR) ni lugha inayokusudiwa kuwa rahisi zaidi kwa uchanganuzi tuli kuliko ile ya asili. Slither inatafsiri Solidity kwa IR yake yenyewe: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Kuelewa SlithIR sio lazima ikiwa unataka tu kuandika hundi za msingi. Hata hivyo, itakuwa muhimu ikiwa unapanga kuandika uchanganuzi wa hali ya juu wa kisemantiki. Vichapishaji vya [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) na [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vitakusaidia kuelewa jinsi msimbo unavyotafsiriwa.

## Misingi ya API {#api-basics}

Slither ina API inayokuruhusu kuchunguza sifa za msingi za mkataba na utendaji wake.

Ili kupakia msingi wa msimbo:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Kuchunguza mikataba na utendaji {#exploring-contracts-and-functions}

Kitu cha `Slither` kina:

- `contracts (list(Contract)`: orodha ya mikataba
- `contracts_derived (list(Contract)`: orodha ya mikataba ambayo haijarithiwa na mkataba mwingine (kikundi kidogo cha mikataba)
- `get_contract_from_name (str)`: Rudisha mkataba kutoka kwa jina lake

Kitu cha `Contract` kina:

- `name (str)`: Jina la mkataba
- `functions (list(Function))`: Orodha ya utendaji
- `modifiers (list(Modifier))`: Orodha ya utendaji
- `all_functions_called (list(Function/Modifier))`: Orodha ya utendaji wote wa ndani unaoweza kufikiwa na mkataba
- `inheritance (list(Contract))`: Orodha ya mikataba iliyorithiwa
- `get_function_from_signature (str)`: Rudisha Utendaji kutoka kwa sahihi yake
- `get_modifier_from_signature (str)`: Rudisha Kirekebishaji kutoka kwa sahihi yake
- `get_state_variable_from_name (str)`: Rudisha Kigezo cha Hali kutoka kwa jina lake

Kitu cha `Function` au `Modifier` kina:

- `name (str)`: Jina la utendaji
- `contract (contract)`: mkataba ambapo utendaji umetangazwa
- `nodes (list(Node))`: Orodha ya nodi zinazounda CFG ya utendaji/kirekebishaji
- `entry_point (Node)`: Sehemu ya kuingia ya CFG
- `variables_read (list(Variable))`: Orodha ya vigezo vilivyosomwa
- `variables_written (list(Variable))`: Orodha ya vigezo vilivyoandikwa
- `state_variables_read (list(StateVariable))`: Orodha ya vigezo vya hali vilivyosomwa (kikundi kidogo cha vigezo vilivyosomwa)
- `state_variables_written (list(StateVariable))`: Orodha ya vigezo vya hali vilivyoandikwa (kikundi kidogo cha vigezo vilivyoandikwa)
