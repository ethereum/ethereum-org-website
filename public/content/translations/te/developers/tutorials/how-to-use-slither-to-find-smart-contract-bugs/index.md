---
title: స్మార్ట్ కాంట్రాక్ట్ బగ్స్‌ను కనుగొనడానికి స్లిథర్‌ను ఎలా ఉపయోగించాలి
description: స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్స్‌ను స్వయంచాలకంగా కనుగొనడానికి స్లిథర్‌ను ఎలా ఉపయోగించాలి
author: Trailofbits
lang: te
tags:
  [
    "దృఢత్వం",
    "స్మార్ట్ కాంట్రాక్టులు",
    "భద్రత",
    "పరీక్షించడం"
  ]
skill: అధునాతనం
published: 2020-06-09
source: సురక్షితమైన కాంట్రాక్టులను నిర్మించడం
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## స్లిథర్‌ను ఎలా ఉపయోగించాలి {#how-to-use-slither}

స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్స్‌ను స్వయంచాలకంగా కనుగొనడానికి స్లిథర్‌ను ఎలా ఉపయోగించాలో చూపడమే ఈ ట్యుటోరియల్ లక్ష్యం.

- [ఇన్‌స్టాలేషన్](#installation)
- [కమాండ్ లైన్ వినియోగం](#command-line)
- [స్టాటిక్ అనాలిసిస్‌కు పరిచయం](#static-analysis): స్టాటిక్ అనాలిసిస్‌కు సంక్షిప్త పరిచయం
- [API](#api-basics): పైథాన్ API వివరణ

## సంస్థాపన {#installation}

స్లిథర్‌కు పైథాన్ >= 3.6 అవసరం. దీనిని పిప్ ద్వారా లేదా డాకర్‌ని ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు.

pip ద్వారా స్లిథర్:

```bash
pip3 install --user slither-analyzer
```

డాకర్ ద్వారా స్లిథర్:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న డాకర్‌లో eth-security-toolboxను రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు, మరియు డాకర్_ నుండి ఫైల్‌లపై సాధనాలను అమలు చేయండి

డాకర్ లోపల, రన్ చేయండి:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### ఒక స్క్రిప్ట్‌ను అమలు చేయడం {#running-a-script}

పైథాన్ 3 తో పైథాన్ స్క్రిప్ట్‌ను అమలు చేయడానికి:

```bash
python3 script.py
```

### కమాండ్ లైన్ {#command-line}

**కమాండ్ లైన్ వర్సెస్ యూజర్-డిఫైన్డ్ స్క్రిప్ట్‌లు.** స్లిథర్ అనేక సాధారణ బగ్‌లను కనుగొనే ముందే నిర్వచించిన డిటెక్టర్‌ల సమితితో వస్తుంది. కమాండ్ లైన్ నుండి స్లిథర్‌ను కాల్ చేయడం వల్ల అన్ని డిటెక్టర్లు రన్ అవుతాయి, స్టాటిక్ అనాలిసిస్ గురించి వివరణాత్మక జ్ఞానం అవసరం లేదు:

```bash
slither project_paths
```

డిటెక్టర్లతో పాటు, స్లిథర్ దాని [ప్రింటర్లు](https://github.com/crytic/slither#printers) మరియు [టూల్స్](https://github.com/crytic/slither#tools) ద్వారా కోడ్ సమీక్ష సామర్థ్యాలను కలిగి ఉంది.

ప్రైవేట్ డిటెక్టర్లు మరియు GitHub ఇంటిగ్రేషన్‌కు యాక్సెస్ పొందడానికి [crytic.io](https://github.com/crytic)ని ఉపయోగించండి.

## స్టాటిక్ విశ్లేషణ {#static-analysis}

స్లిథర్ స్టాటిక్ అనాలిసిస్ ఫ్రేమ్‌వర్క్ యొక్క సామర్థ్యాలు మరియు డిజైన్ బ్లాగ్ పోస్టులలో ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) మరియు ఒక [అకాడెమిక్ పేపర్](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)లో వివరించబడింది.

స్టాటిక్ విశ్లేషణ వివిధ రకాలుగా ఉంటుంది. [clang](https://clang-analyzer.llvm.org/) మరియు [gcc](https://lwn.net/Articles/806099/) వంటి కంపైలర్లు ఈ పరిశోధన పద్ధతులపై ఆధారపడతాయని మీరు బహుశా గ్రహించి ఉంటారు, కానీ ఇది ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) మరియు [Frama-C](https://frama-c.com/) మరియు [Polyspace](https://www.mathworks.com/products/polyspace.html) వంటి ఫార్మల్ మెథడ్స్ ఆధారిత టూల్స్‌కు) కూడా ఆధారం.

మేము ఇక్కడ స్టాటిక్ విశ్లేషణ పద్ధతులు మరియు పరిశోధకులను సమగ్రంగా సమీక్షించము. దానికి బదులుగా, స్లిథర్ ఎలా పనిచేస్తుందో అర్థం చేసుకోవడానికి ఏమి అవసరమో దానిపై మేము దృష్టి పెడతాము, తద్వారా మీరు బగ్‌లను కనుగొనడానికి మరియు కోడ్‌ను అర్థం చేసుకోవడానికి దాన్ని మరింత సమర్థవంతంగా ఉపయోగించవచ్చు.

- [కోడ్ ప్రాతినిధ్యం](#code-representation)
- [కోడ్ విశ్లేషణ](#analysis)
- [మధ్యంతర ప్రాతినిధ్యం](#intermediate-representation)

### కోడ్ ప్రాతినిధ్యం {#code-representation}

ఒకే ఒక ఎగ్జిక్యూషన్ పాత్ గురించి తర్కించే డైనమిక్ అనాలిసిస్‌కు విరుద్ధంగా, స్టాటిక్ అనాలిసిస్ అన్ని పాత్‌ల గురించి ఒకేసారి తర్కిస్తుంది. అలా చేయడానికి, ఇది వేరే కోడ్ ప్రాతినిధ్యంపై ఆధారపడుతుంది. అబ్‌స్ట్రాక్ట్ సింటాక్స్ ట్రీ (AST) మరియు కంట్రోల్ ఫ్లో గ్రాఫ్ (CFG) అనేవి రెండు అత్యంత సాధారణమైనవి.

### అబ్‌స్ట్రాక్ట్ సింటాక్స్ ట్రీలు (AST) {#abstract-syntax-trees-ast}

కంపైలర్ కోడ్‌ను పార్స్ చేసిన ప్రతిసారీ ASTలు ఉపయోగించబడతాయి. స్టాటిక్ విశ్లేషణను నిర్వహించగల అత్యంత ప్రాథమిక నిర్మాణం బహుశా ఇదే.

సంక్షిప్తంగా, AST అనేది ఒక నిర్మాణాత్మక ట్రీ, ఇక్కడ సాధారణంగా, ప్రతి లీఫ్‌లో ఒక వేరియబుల్ లేదా ఒక కాన్‌స్టాంట్ ఉంటుంది మరియు అంతర్గత నోడ్స్ ఆపరాండ్‌లు లేదా కంట్రోల్ ఫ్లో ఆపరేషన్‌లు. కింది కోడ్‌ను పరిగణించండి:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

సంబంధిత AST ఇందులో చూపబడింది:

![AST](./ast.png)

స్లిథర్ solc ద్వారా ఎగుమతి చేయబడిన ASTని ఉపయోగిస్తుంది.

నిర్మించడానికి సులభమైనప్పటికీ, AST ఒక నెస్ట్ చేయబడిన నిర్మాణం. కొన్నిసార్లు, విశ్లేషించడానికి ఇది చాలా సరళమైనది కాదు. `a + b <= a` అనే ఎక్స్‌ప్రెషన్ ద్వారా ఉపయోగించే ఆపరేషన్‌లను గుర్తించడానికి, మీరు మొదట `<=` మరియు తర్వాత `+`ని విశ్లేషించాలి. ఒక సాధారణ పద్ధతి విజిటర్ ప్యాటర్న్‌ను ఉపయోగించడం, ఇది ట్రీ ద్వారా పునరావృతంగా నావిగేట్ చేస్తుంది. స్లిథర్ [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)లో ఒక జెనరిక్ విజిటర్‌ను కలిగి ఉంది.

కింది కోడ్ ఒక ఎక్స్‌ప్రెషన్‌లో అడిషన్ ఉందో లేదో గుర్తించడానికి `ExpressionVisitor`ని ఉపయోగిస్తుంది:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression అనేది పరీక్షించాల్సిన ఎక్స్‌ప్రెషన్
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### కంట్రోల్ ఫ్లో గ్రాఫ్ (CFG) {#control-flow-graph-cfg}

రెండవ అత్యంత సాధారణ కోడ్ ప్రాతినిధ్యం కంట్రోల్ ఫ్లో గ్రాఫ్ (CFG). దాని పేరు సూచించినట్లుగా, ఇది అన్ని ఎగ్జిక్యూషన్ పాత్‌లను బహిర్గతం చేసే గ్రాఫ్-ఆధారిత ప్రాతినిధ్యం. ప్రతి నోడ్ ఒకటి లేదా అంతకంటే ఎక్కువ సూచనలను కలిగి ఉంటుంది. గ్రాఫ్‌లోని ఎడ్జ్‌లు కంట్రోల్ ఫ్లో ఆపరేషన్‌లను (if/then/else, loop, etc) సూచిస్తాయి. మా మునుపటి ఉదాహరణ యొక్క CFG:

![CFG](./cfg.png)

చాలా విశ్లేషణలు నిర్మించబడిన ప్రాతినిధ్యం CFG.

అనేక ఇతర కోడ్ ప్రాతినిధ్యాలు ఉన్నాయి. మీరు చేయాలనుకుంటున్న విశ్లేషణ ప్రకారం ప్రతి ప్రాతినిధ్యానికి ప్రయోజనాలు మరియు నష్టాలు ఉన్నాయి.

### విశ్లేషణ {#analysis}

మీరు స్లిథర్‌తో చేయగల సరళమైన విశ్లేషణ రకాలు సింటాక్టిక్ విశ్లేషణలు.

### సింటాక్స్ విశ్లేషణ {#syntax-analysis}

ఒక ప్యాట్రన్ మ్యాచింగ్-లాంటి పద్ధతిని ఉపయోగించి, అననుకూలతలు మరియు లోపాలను కనుగొనడానికి స్లిథర్ కోడ్ యొక్క వివిధ భాగాలు మరియు వాటి ప్రాతినిధ్యం ద్వారా నావిగేట్ చేయగలదు.

ఉదాహరణకు, కింది డిటెక్టర్లు సింటాక్స్‌కు సంబంధించిన సమస్యల కోసం చూస్తాయి:

- [స్టేట్ వేరియబుల్ షాడోయింగ్](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): అన్ని స్టేట్ వేరియబుల్స్‌పై పునరావృతమవుతుంది మరియు ఏదైనా ఒక ఇన్హెరిట్ చేయబడిన కాంట్రాక్ట్ నుండి వేరియబుల్‌ను షాడో చేస్తుందో లేదో తనిఖీ చేస్తుంది ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [తప్పు ERC20 ఇంటర్‌ఫేస్](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): తప్పు ERC20 ఫంక్షన్ సంతకాల కోసం చూడండి ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### సెమాంటిక్ విశ్లేషణ {#semantic-analysis}

సింటాక్స్ విశ్లేషణకు విరుద్ధంగా, ఒక సెమాంటిక్ విశ్లేషణ లోతుగా వెళ్లి కోడ్ యొక్క “అర్థాన్ని” విశ్లేషిస్తుంది. ఈ కుటుంబంలో కొన్ని విస్తృత రకాల విశ్లేషణలు ఉన్నాయి. అవి మరింత శక్తివంతమైన మరియు ఉపయోగకరమైన ఫలితాలకు దారితీస్తాయి, కానీ వ్రాయడానికి కూడా చాలా క్లిష్టంగా ఉంటాయి.

అత్యంత అధునాతన దుర్బలత్వ గుర్తింపుల కోసం సెమాంటిక్ విశ్లేషణలు ఉపయోగించబడతాయి.

#### డేటా డిపెండెన్సీ విశ్లేషణ {#fixed-point-computation}

`variable_a` విలువ `variable_b` ద్వారా ప్రభావితమయ్యే మార్గం ఉంటే, `variable_a` వేరియబుల్ `variable_b`పై డేటా-ఆధారితమని చెప్పబడుతుంది.

కింది కోడ్‌లో, `variable_a` `variable_b`పై ఆధారపడి ఉంటుంది:

```solidity
// ...
variable_a = variable_b + 1;
```

స్లిథర్ దాని ఇంటర్మీడియట్ రిప్రజెంటేషన్ (తరువాతి విభాగంలో చర్చించబడింది) కారణంగా, అంతర్నిర్మిత [డేటా డిపెండెన్సీ](https://github.com/crytic/slither/wiki/data-dependency) సామర్థ్యాలతో వస్తుంది.

డేటా డిపెండెన్సీ వినియోగం యొక్క ఉదాహరణ [ప్రమాదకరమైన కఠినమైన సమానత్వ డిటెక్టర్](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)లో కనుగొనవచ్చు. ఇక్కడ స్లిథర్ ఒక ప్రమాదకరమైన విలువతో కఠినమైన సమానత్వ పోలిక కోసం చూస్తుంది ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), మరియు దాడి చేసే వ్యక్తి కాంట్రాక్ట్‌ను ట్రాప్ చేయకుండా నిరోధించడానికి, `==`కి బదులుగా `>=` లేదా `<=`ని ఉపయోగించాలని వినియోగదారునికి తెలియజేస్తుంది. ఇతర వాటితో పాటు, డిటెక్టర్ `balanceOf(address)`కి కాల్ యొక్క రిటర్న్ విలువను ప్రమాదకరమైనదిగా పరిగణిస్తుంది ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), మరియు దాని వినియోగాన్ని ట్రాక్ చేయడానికి డేటా డిపెండెన్సీ ఇంజిన్‌ను ఉపయోగిస్తుంది.

#### ఫిక్స్‌డ్-పాయింట్ కంప్యూటేషన్ {#fixed-point-computation}

మీ విశ్లేషణ CFG ద్వారా నావిగేట్ చేసి, ఎడ్జ్‌లను అనుసరిస్తే, మీరు ఇప్పటికే సందర్శించిన నోడ్స్‌ను చూసే అవకాశం ఉంది. ఉదాహరణకు, ఒక లూప్ క్రింద చూపిన విధంగా ఉంటే:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

మీ విశ్లేషణ ఎప్పుడు ఆపాలో తెలుసుకోవాలి. ఇక్కడ రెండు ప్రధాన వ్యూహాలు ఉన్నాయి: (1) ప్రతి నోడ్‌పై పరిమిత సంఖ్యలో పునరావృతం చేయడం, (2) _ఫిక్స్‌పాయింట్_ అని పిలవబడే దానిని లెక్కించడం. ఒక ఫిక్స్‌పాయింట్ అంటే ప్రాథమికంగా ఈ నోడ్‌ను విశ్లేషించడం వల్ల ఎటువంటి అర్థవంతమైన సమాచారం లభించదు.

ఫిక్స్‌పాయింట్ ఉపయోగించిన ఉదాహరణ రీఎంట్రన్సీ డిటెక్టర్లలో కనుగొనవచ్చు: స్లిథర్ నోడ్స్‌ను అన్వేషిస్తుంది మరియు బాహ్య కాల్స్, స్టోరేజ్‌కు వ్రాయడం మరియు చదవడం కోసం చూస్తుంది. ఒకసారి అది ఒక ఫిక్స్‌పాయింట్‌ను చేరుకున్న తర్వాత ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), అది అన్వేషణను ఆపివేస్తుంది మరియు వివిధ రీఎంట్రన్సీ ప్యాట్రన్‌ల ద్వారా రీఎంట్రన్సీ ఉందో లేదో చూడటానికి ఫలితాలను విశ్లేషిస్తుంది ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

సమర్థవంతమైన ఫిక్స్‌డ్ పాయింట్ కంప్యూటేషన్‌ను ఉపయోగించి విశ్లేషణలు రాయడానికి, విశ్లేషణ దాని సమాచారాన్ని ఎలా ప్రచారం చేస్తుందనే దానిపై మంచి అవగాహన అవసరం.

### మధ్యంతర ప్రాతినిధ్యం {#intermediate-representation}

ఇంటర్మీడియట్ రిప్రజెంటేషన్ (IR) అనేది అసలు భాష కంటే స్టాటిక్ విశ్లేషణకు మరింత అనుకూలంగా ఉండేలా ఉద్దేశించిన భాష. స్లిథర్ సాలిడిటీని దాని స్వంత IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)కి అనువదిస్తుంది.

మీరు కేవలం ప్రాథమిక తనిఖీలను వ్రాయాలనుకుంటే SlithIRను అర్థం చేసుకోవడం అవసరం లేదు. అయితే, మీరు అధునాతన సెమాంటిక్ విశ్లేషణలను వ్రాయాలని ప్లాన్ చేస్తే ఇది ఉపయోగపడుతుంది. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) మరియు [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) ప్రింటర్లు కోడ్ ఎలా అనువదించబడిందో అర్థం చేసుకోవడానికి మీకు సహాయపడతాయి.

## API బేసిక్స్ {#api-basics}

స్లిథర్ ఒక APIని కలిగి ఉంది, ఇది కాంట్రాక్ట్ మరియు దాని ఫంక్షన్ల యొక్క ప్రాథమిక లక్షణాలను అన్వేషించడానికి మిమ్మల్ని అనుమతిస్తుంది.

ఒక కోడ్‌బేస్‌ను లోడ్ చేయడానికి:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### కాంట్రాక్ట్‌లు మరియు ఫంక్షన్లను అన్వేషించడం {#exploring-contracts-and-functions}

ఒక `Slither` ఆబ్జెక్ట్ కలిగి ఉంది:

- `contracts (list(Contract)`: కాంట్రాక్ట్‌ల జాబితా
- `contracts_derived (list(Contract)`: మరొక కాంట్రాక్ట్ ద్వారా ఇన్హెరిట్ చేయబడని కాంట్రాక్ట్‌ల జాబితా (కాంట్రాక్ట్‌ల ఉపసమితి)
- `get_contract_from_name (str)`: దాని పేరు నుండి ఒక కాంట్రాక్ట్‌ను తిరిగి ఇస్తుంది

ఒక `Contract` ఆబ్జెక్ట్ కలిగి ఉంది:

- `name (str)`: కాంట్రాక్ట్ పేరు
- `functions (list(Function))`: ఫంక్షన్ల జాబితా
- `modifiers (list(Modifier))`: మాడిఫైయర్ల జాబితా
- `all_functions_called (list(Function/Modifier))`: కాంట్రాక్ట్ ద్వారా చేరగల అన్ని అంతర్గత ఫంక్షన్ల జాబితా
- `inheritance (list(Contract))`: ఇన్హెరిట్ చేయబడిన కాంట్రాక్ట్‌ల జాబితా
- `get_function_from_signature (str)`: దాని సంతకం నుండి ఒక ఫంక్షన్‌ను తిరిగి ఇస్తుంది
- `get_modifier_from_signature (str)`: దాని సంతకం నుండి ఒక మాడిఫైయర్‌ను తిరిగి ఇస్తుంది
- `get_state_variable_from_name (str)`: దాని పేరు నుండి ఒక స్టేట్‌వేరియబుల్‌ను తిరిగి ఇస్తుంది

ఒక `Function` లేదా `Modifier` ఆబ్జెక్ట్ కలిగి ఉంది:

- `name (str)`: ఫంక్షన్ పేరు
- `contract (contract)`: ఫంక్షన్ ప్రకటించబడిన కాంట్రాక్ట్
- `nodes (list(Node))`: ఫంక్షన్/మాడిఫైయర్ యొక్క CFGని కంపోజ్ చేసే నోడ్స్ జాబితా
- `entry_point (Node)`: CFG యొక్క ఎంట్రీ పాయింట్
- `variables_read (list(Variable))`: చదవబడిన వేరియబుల్స్ జాబితా
- `variables_written (list(Variable))`: వ్రాయబడిన వేరియబుల్స్ జాబితా
- `state_variables_read (list(StateVariable))`: చదవబడిన స్టేట్ వేరియబుల్స్ జాబితా (వేరియబుల్స్ `read` యొక్క ఉపసమితి)
- `state_variables_written (list(StateVariable))`: వ్రాయబడిన స్టేట్ వేరియబుల్స్ జాబితా (వేరియబుల్స్ `written` యొక్క ఉపసమితి)
