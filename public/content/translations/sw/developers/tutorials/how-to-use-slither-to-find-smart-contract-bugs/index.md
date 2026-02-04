---
title: Jinsi ya kutumia Slither kupata hitilafu za mkataba-erevu
description: Jinsi ya kutumia Slither kupata hitilafu kiotomatiki katika mikataba-erevu
author: Trailofbits
lang: sw
tags: [ "uimara", "mikataba erevu", "usalama", "majaribio" ]
skill: advanced
published: 2020-06-09
source: Kujenga mikataba salama
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jinsi ya kutumia Slither {#how-to-use-slither}

Lengo la mafunzo haya ni kuonyesha jinsi ya kutumia Slither kupata hitilafu kiotomatiki katika mikataba-erevu.

- [Usakinishaji](#installation)
- [Matumizi ya mstari wa amri](#command-line)
- [Utangulizi wa uchambuzi tuli](#static-analysis): Utangulizi mfupi wa uchambuzi tuli
- [API](#api-basics): Maelezo ya API ya Python

## Usakinishaji {#installation}

Slither inahitaji Python >= 3.6. Inaweza kusakinishwa kupitia pip au kwa kutumia docker.

Slither kupitia pip:

```bash
pip3 install --user slither-analyzer
```

Slither kupitia docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Amri ya mwisho huendesha eth-security-toolbox kwenye docker ambayo ina ufikiaji wa saraka yako ya sasa. Unaweza kubadilisha faili kutoka kwa mwenyeji wako, na uendeshe zana kwenye faili kutoka kwa docker_

Ndani ya docker, endesha:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Kuendesha hati {#running-a-script}

Ili kuendesha hati ya python na python 3:

```bash
python3 script.py
```

### Mstari wa amri {#command-line}

**Mstari wa amri dhidi ya hati zilizobainishwa na mtumiaji.** Slither inakuja na seti ya vitambuzi vilivyobainishwa awali vinavyopata hitilafu nyingi za kawaida. Kuita Slither kutoka kwa mstari wa amri kutaendesha vitambuzi vyote, hakuna ujuzi wa kina wa uchambuzi tuli unaohitajika:

```bash
slither project_paths
```

Mbali na vitambuzi, Slither ina uwezo wa kukagua msimbo kupitia [printers](https://github.com/crytic/slither#printers) na [zana](https://github.com/crytic/slither#tools) zake.

Tumia [crytic.io](https://github.com/crytic) ili kupata ufikiaji wa vitambuzi vya faragha na muunganisho wa GitHub.

## Uchambuzi tuli {#static-analysis}

Uwezo na muundo wa mfumo wa uchambuzi tuli wa Slither umeelezewa katika machapisho ya blogu ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) na [karatasi ya kitaaluma](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Uchambuzi tuli upo katika aina tofauti. Pengine unagundua kwamba vikompilaji kama [clang](https://clang-analyzer.llvm.org/) na [gcc](https://lwn.net/Articles/806099/) hutegemea mbinu hizi za utafiti, lakini pia inasaidia ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) na zana zinazotegemea mbinu rasmi kama vile [Frama-C](https://frama-c.com/) na [Polyspace](https://www.mathworks.com/products/polyspace.html).

Hatutakuwa tukikagua kwa kina mbinu za uchambuzi tuli na watafiti hapa. Badala yake, tutazingatia kile kinachohitajika kuelewa jinsi Slither inavyofanya kazi ili uweze kuitumia kwa ufanisi zaidi kupata hitilafu na kuelewa msimbo.

- [Uwakilishi wa msimbo](#code-representation)
- [Uchambuzi wa msimbo](#analysis)
- [Uwakilishi wa kati](#intermediate-representation)

### Uwakilishi wa msimbo {#code-representation}

Tofauti na uchambuzi wenye mabadiliko, unaozingatia njia moja ya utekelezaji, uchambuzi tuli huzingatia njia zote kwa wakati mmoja. Ili kufanya hivyo, inategemea uwakilishi tofauti wa msimbo. Mbili za kawaida zaidi ni mti wa sintaksia dhahania (AST) na grafu ya mtiririko wa udhibiti (CFG).

### Miti ya Sintaksia Dhahania (AST) {#abstract-syntax-trees-ast}

AST hutumika kila wakati kikompilaji kinapochanganua msimbo. Pengine ndiyo muundo wa msingi zaidi ambao uchambuzi tuli unaweza kufanywa.

Kwa ufupi, AST ni mti uliopangiliwa ambapo, kwa kawaida, kila jani lina kigezo au thamani isiyobadilika na nodi za ndani ni viendeshaji au shughuli za mtiririko wa udhibiti. Zingatia msimbo ufuatao:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST inayolingana inaonyeshwa katika:

![AST](./ast.png)

Slither hutumia AST inayosafirishwa na solc.

Ingawa ni rahisi kuunda, AST ni muundo uliowekwa ndani. Wakati mwingine, hii siyo njia rahisi zaidi ya kuchambua. Kwa mfano, ili kubaini shughuli zinazotumiwa na usemi `a + b <= a`, lazima kwanza uchanganue `<=` na kisha `+`. Njia ya kawaida ni kutumia kinachoitwa muundo wa mtembeleaji, ambao hupitia mti kwa kujirudia. Slither ina mtembeleaji wa jumla katika [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Msimbo ufuatao unatumia `ExpressionVisitor` kugundua kama usemi una nyongeza:

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

### Grafu ya Mtiririko wa Udhibiti (CFG) {#control-flow-graph-cfg}

Uwakilishi wa pili wa kawaida wa msimbo ni grafu ya mtiririko wa udhibiti (CFG). Kama jina lake linavyopendekeza, ni uwakilishi unaotegemea grafu unaoonyesha njia zote za utekelezaji. Kila nodi ina maagizo moja au zaidi. Pande katika grafu zinawakilisha shughuli za mtiririko wa udhibiti (kama/basi/vinginevyo, kitanzi, n.k). CFG ya mfano wetu uliopita ni:

![CFG](./cfg.png)

CFG ndio uwakilishi ambao juu yake uchambuzi mwingi hujengwa.

Uwakilishi mwingine mwingi wa msimbo upo. Kila uwakilishi una faida na hasara kulingana na uchambuzi unaotaka kufanya.

### Uchambuzi {#analysis}

Aina rahisi zaidi ya uchambuzi unaweza kufanya na Slither ni uchambuzi wa sintaksia.

### Uchambuzi wa sintaksia {#syntax-analysis}

Slither inaweza kupitia vipengele tofauti vya msimbo na uwakilishi wao ili kupata kutofautiana na kasoro kwa kutumia mbinu inayofanana na ulinganishaji wa muundo.

Kwa mfano, vitambuzi vifuatavyo hutafuta masuala yanayohusiana na sintaksia:

- [Ufunikaji wa kigezo cha hali](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): hupitia vigezo vyote vya hali na kuangalia kama kigezo chochote kinafunika kigezo kutoka kwa mkataba uliorithiwa ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Kiolesura cha ERC20 kisicho sahihi](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): tafuta saini za chaguo la kukokotoa za ERC20 zisizo sahihi ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Uchambuzi wa maana {#semantic-analysis}

Tofauti na uchambuzi wa sintaksia, uchambuzi wa maana utaenda ndani zaidi na kuchambua "maana" ya msimbo. Familia hii inajumuisha aina pana za uchambuzi. Zinapelekea matokeo yenye nguvu zaidi na muhimu, lakini pia ni ngumu zaidi kuandika.

Uchambuzi wa maana hutumika kwa utambuzi wa hali ya juu zaidi ya udhaifu.

#### Uchambuzi wa utegemezi wa data {#fixed-point-computation}

Kigezo `variable_a` kinasemekana kuwa kinategemea data ya `variable_b` ikiwa kuna njia ambayo thamani ya `variable_a` inaathiriwa na `variable_b`.

Katika msimbo ufuatao, `variable_a` inategemea `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither inakuja na uwezo uliojengewa ndani wa [utegemezi wa data](https://github.com/crytic/slither/wiki/data-dependency), shukrani kwa uwakilishi wake wa kati (utakaoshughulikiwa katika sehemu ya baadaye).

Mfano wa matumizi ya utegemezi wa data unaweza kupatikana katika [kitambuzi hatari cha usawa mkali](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Hapa Slither itatafuta ulinganisho wa usawa mkali na thamani hatari ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), na itamjulisha mtumiaji kwamba anapaswa kutumia `>=` au `<=` badala ya `==`, ili kumzuia mshambulizi asitege mkataba. Miongoni mwa mambo mengine, kitambuzi kitazingatia thamani ya kurejesha ya mwito kwa `balanceOf(address)` kuwa hatari ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), na itatumia injini ya utegemezi wa data kufuatilia matumizi yake.

#### Hesabu ya nukta isiyobadilika {#fixed-point-computation}

Ikiwa uchambuzi wako unapitia CFG na kufuata pande, kuna uwezekano wa kuona nodi ambazo tayari zimetembelewa. Kwa mfano, ikiwa kitanzi kinaonyeshwa kama ilivyo hapo chini:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Uchambuzi wako utahitaji kujua wakati wa kusimama. Kuna mikakati miwili mikuu hapa: (1) kurudia kwenye kila nodi idadi maalum ya mara, (2) kuhesabu kinachoitwa _nukta isiyobadilika_. Nukta isiyobadilika kimsingi inamaanisha kuwa kuchambua nodi hii hakutoi taarifa yoyote ya maana.

Mfano wa nukta isiyobadilika iliyotumiwa unaweza kupatikana katika vitambuzi vya uingiaji tena: Slither inachunguza nodi, na kutafuta miito ya nje, kuandika na kusoma kwenye ghala. Mara tu inapofikia nukta isiyobadilika ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), inasitisha uchunguzi, na kuchambua matokeo ili kuona kama kuna uingiaji tena, kupitia miundo tofauti ya uingiaji tena ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Kuandika uchambuzi kwa kutumia hesabu ya nukta isiyobadilika inayofaa kunahitaji uelewa mzuri wa jinsi uchambuzi unavyoeneza taarifa zake.

### Uwakilishi wa kati {#intermediate-representation}

Uwakilishi wa kati (IR) ni lugha inayokusudiwa kuwa rahisi zaidi kwa uchambuzi tuli kuliko ile ya asili. Slither hutafsiri Solidity kuwa IR yake mwenyewe: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Kuelewa SlithIR si lazima ikiwa unataka tu kuandika ukaguzi wa msingi. Hata hivyo, itakuwa muhimu ikiwa unapanga kuandika uchambuzi wa maana wa hali ya juu. Vichapishi vya [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) na [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vitakusaidia kuelewa jinsi msimbo unavyotafsiriwa.

## Misingi ya API {#api-basics}

Slither ina API inayokuruhusu kuchunguza sifa za msingi za mkataba na chaguo zake za kukokotoa.

Ili kupakia codebase:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Kuchunguza mikataba na chaguo za kukokotoa {#exploring-contracts-and-functions}

Kitu cha `Slither` kina:

- `contracts (orodha(Mkataba)`: orodha ya mikataba
- `contracts_derived (orodha(Mkataba)`: orodha ya mikataba ambayo haijarithiwa na mkataba mwingine (sehemu ndogo ya mikataba)
- `get_contract_from_name (str)`: Rudisha mkataba kutoka kwa jina lake

Kitu cha `Mkataba` kina:

- `name (str)`: Jina la mkataba
- `functions (orodha(Chaguo la Kukokotoa))`: Orodha ya chaguo za kukokotoa
- `modifiers (orodha(Kibadilishi))`: Orodha ya vibadilishi
- `all_functions_called (orodha(Chaguo la Kukokotoa/Kibadilishi))`: Orodha ya chaguo zote za kukokotoa za ndani zinazoweza kufikiwa na mkataba
- `inheritance (orodha(Mkataba))`: Orodha ya mikataba iliyorithiwa
- `get_function_from_signature (str)`: Rudisha Chaguo la Kukokotoa kutoka kwa saini yake
- `get_modifier_from_signature (str)`: Rudisha Kibadilishi kutoka kwa saini yake
- `get_state_variable_from_name (str)`: Rudisha Kigezo cha Hali kutoka kwa jina lake

Kitu cha `Chaguo la Kukokotoa` au `Kibadilishi` kina:

- `name (str)`: Jina la chaguo la kukokotoa
- `contract (mkataba)`: mkataba ambapo chaguo la kukokotoa linatangazwa
- `nodes (orodha(Nodi))`: Orodha ya nodi zinazounda CFG ya chaguo la kukokotoa/kibadilishi
- `entry_point (Nodi)`: Sehemu ya kuingilia ya CFG
- `variables_read (orodha(Kigezo))`: Orodha ya vigezo vilivyosomwa
- `variables_written (orodha(Kigezo))`: Orodha ya vigezo vilivyoandikwa
- `state_variables_read (orodha(KigezoChaHali))`: Orodha ya vigezo vya hali vilivyosomwa (sehemu ndogo ya vigezo vilivyosomwa)
- `state_variables_written (orodha(KigezoChaHali))`: Orodha ya vigezo vya hali vilivyoandikwa (sehemu ndogo ya vigezo vilivyoandikwa)
