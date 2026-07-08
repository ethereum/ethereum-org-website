---
title: "స్మార్ట్ కాంట్రాక్ట్ బగ్‌లను కనుగొనడానికి స్లిదర్‌ను ఎలా ఉపయోగించాలి"
description: "స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను ఆటోమేటిక్‌గా కనుగొనడానికి స్లిదర్‌ను ఎలా ఉపయోగించాలి"
author: "ట్రైల్ఆఫ్‌బిట్స్"
lang: te
tags: ["Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "భద్రత", "టెస్టింగ్"]
skill: advanced
breadcrumb: "స్లిదర్"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## స్లిదర్‌ను ఎలా ఉపయోగించాలి {#how-to-use-slither}

స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను ఆటోమేటిక్‌గా కనుగొనడానికి స్లిదర్‌ను ఎలా ఉపయోగించాలో చూపించడమే ఈ ట్యుటోరియల్ లక్ష్యం.

- [ఇన్‌స్టాలేషన్](#installation)
- [కమాండ్ లైన్ వినియోగం](#command-line)
- [స్టాటిక్ అనాలిసిస్ పరిచయం](#static-analysis): స్టాటిక్ అనాలిసిస్‌కు సంక్షిప్త పరిచయం
- [API](#api-basics): Python API వివరణ

## ఇన్‌స్టాలేషన్ {#installation}

స్లిదర్‌కు Python >= 3.6 అవసరం. దీనిని pip ద్వారా లేదా Docker ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు.

pip ద్వారా స్లిదర్:

```bash
pip3 install --user slither-analyzer
```

Docker ద్వారా స్లిదర్:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న Dockerలో eth-security-toolboxని రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు మరియు Docker నుండి ఫైల్‌లపై టూల్స్‌ను రన్ చేయవచ్చు_

Docker లోపల, ఇలా రన్ చేయండి:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### స్క్రిప్ట్‌ను రన్ చేయడం {#running-a-script}

Python 3తో python స్క్రిప్ట్‌ను రన్ చేయడానికి:

```bash
python3 script.py
```

### కమాండ్ లైన్ {#command-line}

**కమాండ్ లైన్ వర్సెస్ యూజర్-డిఫైన్డ్ స్క్రిప్ట్‌లు.** స్లిదర్ అనేక సాధారణ బగ్‌లను కనుగొనే ముందే నిర్వచించిన డిటెక్టర్‌ల సెట్‌తో వస్తుంది. కమాండ్ లైన్ నుండి స్లిదర్‌ను కాల్ చేయడం ద్వారా అన్ని డిటెక్టర్‌లు రన్ అవుతాయి, స్టాటిక్ అనాలిసిస్ గురించి వివరణాత్మక జ్ఞానం అవసరం లేదు:

```bash
slither project_paths
```

డిటెక్టర్‌లతో పాటు, స్లిదర్ దాని [ప్రింటర్‌లు](https://github.com/crytic/slither#printers) మరియు [టూల్స్](https://github.com/crytic/slither#tools) ద్వారా కోడ్ రివ్యూ సామర్థ్యాలను కలిగి ఉంది.

ప్రైవేట్ డిటెక్టర్‌లు మరియు GitHub ఇంటిగ్రేషన్‌కు యాక్సెస్ పొందడానికి [crytic.io](https://github.com/crytic)ని ఉపయోగించండి.

## స్టాటిక్ అనాలిసిస్ {#static-analysis}

స్లిదర్ స్టాటిక్ అనాలిసిస్ ఫ్రేమ్‌వర్క్ యొక్క సామర్థ్యాలు మరియు డిజైన్ బ్లాగ్ పోస్ట్‌లలో ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) మరియు ఒక [అకడమిక్ పేపర్‌](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)లో వివరించబడ్డాయి.

స్టాటిక్ అనాలిసిస్ వివిధ రకాలుగా ఉంటుంది. [clang](https://clang-analyzer.llvm.org/) మరియు [gcc](https://lwn.net/Articles/806099/) వంటి కంపైలర్‌లు ఈ పరిశోధనా పద్ధతులపై ఆధారపడి ఉంటాయని మీరు బహుశా గ్రహించి ఉంటారు, అయితే ఇది ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) మరియు [Frama-C](https://frama-c.com/) మరియు [Polyspace](https://www.mathworks.com/products/polyspace.html) వంటి ఫార్మల్ పద్ధతులపై ఆధారపడిన టూల్స్‌కు కూడా ఆధారం.

మేము ఇక్కడ స్టాటిక్ అనాలిసిస్ పద్ధతులు మరియు పరిశోధనలను సమగ్రంగా సమీక్షించము. బదులుగా, స్లిదర్ ఎలా పనిచేస్తుందో అర్థం చేసుకోవడానికి ఏమి అవసరమో దానిపై మేము దృష్టి పెడతాము, తద్వారా మీరు బగ్‌లను కనుగొనడానికి మరియు కోడ్‌ను అర్థం చేసుకోవడానికి దీన్ని మరింత సమర్థవంతంగా ఉపయోగించవచ్చు.

- [కోడ్ రిప్రజెంటేషన్](#code-representation)
- [కోడ్ అనాలిసిస్](#analysis)
- [ఇంటర్మీడియట్ రిప్రజెంటేషన్](#intermediate-representation)

### కోడ్ రిప్రజెంటేషన్ {#code-representation}

ఒకే ఎగ్జిక్యూషన్ పాత్ గురించి విశ్లేషించే డైనమిక్ అనాలిసిస్‌కు భిన్నంగా, స్టాటిక్ అనాలిసిస్ ఒకేసారి అన్ని పాత్‌ల గురించి విశ్లేషిస్తుంది. అలా చేయడానికి, ఇది వేరొక కోడ్ రిప్రజెంటేషన్‌పై ఆధారపడుతుంది. వాటిలో అత్యంత సాధారణమైనవి రెండు: అబ్‌స్ట్రాక్ట్ సింటాక్స్ ట్రీ (AST) మరియు కంట్రోల్ ఫ్లో గ్రాఫ్ (CFG).

### అబ్‌స్ట్రాక్ట్ సింటాక్స్ ట్రీస్ (AST) {#abstract-syntax-trees-ast}

కంపైలర్ కోడ్‌ను పార్స్ చేసిన ప్రతిసారీ AST ఉపయోగించబడుతుంది. స్టాటిక్ అనాలిసిస్ చేయగల అత్యంత ప్రాథమిక నిర్మాణం బహుశా ఇదే.

క్లుప్తంగా చెప్పాలంటే, AST అనేది ఒక స్ట్రక్చర్డ్ ట్రీ, ఇక్కడ సాధారణంగా ప్రతి ఆకు (leaf) ఒక వేరియబుల్ లేదా స్థిరాంకాన్ని కలిగి ఉంటుంది మరియు అంతర్గత నోడ్‌లు ఆపరాండ్‌లు లేదా కంట్రోల్ ఫ్లో ఆపరేషన్‌లు. కింది కోడ్‌ను పరిశీలించండి:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

దీనికి సంబంధించిన AST ఇందులో చూపబడింది:

![AST](./ast.png)

solc ఎగుమతి చేసిన ASTని స్లిదర్ ఉపయోగిస్తుంది.

నిర్మించడానికి సులభమైనప్పటికీ, AST అనేది ఒక నెస్టెడ్ స్ట్రక్చర్. కొన్నిసార్లు, దీన్ని విశ్లేషించడం అంత సులభం కాదు. ఉదాహరణకు, `a + b <= a` ఎక్స్‌ప్రెషన్ ఉపయోగించే ఆపరేషన్‌లను గుర్తించడానికి, మీరు ముందుగా `<=`ని ఆపై `+`ని విశ్లేషించాలి. ఒక సాధారణ విధానం ఏమిటంటే విజిటర్ ప్యాటర్న్ అని పిలువబడే దాన్ని ఉపయోగించడం, ఇది ట్రీ ద్వారా రికర్సివ్‌గా నావిగేట్ చేస్తుంది. స్లిదర్ [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)లో జెనరిక్ విజిటర్‌ను కలిగి ఉంటుంది.

ఎక్స్‌ప్రెషన్‌లో కూడిక ఉందో లేదో గుర్తించడానికి కింది కోడ్ `ExpressionVisitor`ని ఉపయోగిస్తుంది:

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

రెండవ అత్యంత సాధారణ కోడ్ రిప్రజెంటేషన్ కంట్రోల్ ఫ్లో గ్రాఫ్ (CFG). దాని పేరు సూచించినట్లుగా, ఇది అన్ని ఎగ్జిక్యూషన్ పాత్‌లను బహిర్గతం చేసే గ్రాఫ్-ఆధారిత రిప్రజెంటేషన్. ప్రతి నోడ్ ఒకటి లేదా బహుళ సూచనలను కలిగి ఉంటుంది. గ్రాఫ్‌లోని అంచులు (edges) కంట్రోల్ ఫ్లో ఆపరేషన్‌లను (if/then/else, loop మొదలైనవి) సూచిస్తాయి. మన మునుపటి ఉదాహరణ యొక్క CFG:

![CFG](./cfg.png)

CFG అనేది చాలా అనాలిసిస్‌లు నిర్మించబడిన రిప్రజెంటేషన్.

అనేక ఇతర కోడ్ రిప్రజెంటేషన్‌లు ఉన్నాయి. మీరు చేయాలనుకుంటున్న అనాలిసిస్ ప్రకారం ప్రతి రిప్రజెంటేషన్‌కు ప్రయోజనాలు మరియు లోపాలు ఉంటాయి.

### అనాలిసిస్ {#analysis}

స్లిదర్‌తో మీరు చేయగల సరళమైన అనాలిసిస్ సింటాక్టిక్ అనాలిసిస్.

### సింటాక్స్ అనాలిసిస్ {#syntax-analysis}

ప్యాటర్న్ మ్యాచింగ్ లాంటి విధానాన్ని ఉపయోగించి అసమానతలు మరియు లోపాలను కనుగొనడానికి స్లిదర్ కోడ్ యొక్క విభిన్న భాగాలు మరియు వాటి రిప్రజెంటేషన్ ద్వారా నావిగేట్ చేయగలదు.

ఉదాహరణకు కింది డిటెక్టర్‌లు సింటాక్స్‌కు సంబంధించిన సమస్యల కోసం వెతుకుతాయి:

- [స్టేట్ వేరియబుల్ షాడోయింగ్](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): అన్ని స్థితి వేరియబుల్స్‌పై ఇటరేట్ చేస్తుంది మరియు వారసత్వంగా వచ్చిన కాంట్రాక్ట్ నుండి ఏదైనా వేరియబుల్‌ను షాడో చేస్తుందో లేదో తనిఖీ చేస్తుంది ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [సరికాని ERC-20 ఇంటర్‌ఫేస్](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): సరికాని ERC-20 ఫంక్షన్ సంతకాల కోసం వెతుకుతుంది ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### సెమాంటిక్ అనాలిసిస్ {#semantic-analysis}

సింటాక్స్ అనాలిసిస్‌కు భిన్నంగా, సెమాంటిక్ అనాలిసిస్ లోతుగా వెళ్లి కోడ్ యొక్క “అర్థాన్ని” విశ్లేషిస్తుంది. ఈ కుటుంబంలో కొన్ని విస్తృత రకాల అనాలిసిస్‌లు ఉన్నాయి. అవి మరింత శక్తివంతమైన మరియు ఉపయోగకరమైన ఫలితాలకు దారితీస్తాయి, కానీ రాయడానికి మరింత సంక్లిష్టంగా ఉంటాయి.

అత్యంత అధునాతన దుర్బలత్వ గుర్తింపుల కోసం సెమాంటిక్ అనాలిసిస్‌లు ఉపయోగించబడతాయి.

#### డేటా డిపెండెన్సీ అనాలిసిస్ {#fixed-point-computation}

`variable_a` విలువ `variable_b` ద్వారా ప్రభావితమయ్యే మార్గం ఉంటే, `variable_a` వేరియబుల్ `variable_b`పై డేటా-ఆధారితమైనదిగా చెప్పబడుతుంది.

కింది కోడ్‌లో, `variable_a` అనేది `variable_b`పై ఆధారపడి ఉంటుంది:

```solidity
// ...
variable_a = variable_b + 1;
```

స్లిదర్ అంతర్నిర్మిత [డేటా డిపెండెన్సీ](https://github.com/crytic/slither/wiki/data-dependency) సామర్థ్యాలతో వస్తుంది, దాని ఇంటర్మీడియట్ రిప్రజెంటేషన్‌కు ధన్యవాదాలు (తరువాతి విభాగంలో చర్చించబడింది).

డేటా డిపెండెన్సీ వినియోగానికి ఉదాహరణ [ప్రమాదకరమైన కఠినమైన సమానత్వ డిటెక్టర్‌](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)లో కనుగొనవచ్చు. ఇక్కడ స్లిదర్ ప్రమాదకరమైన విలువతో కఠినమైన సమానత్వ పోలిక కోసం వెతుకుతుంది ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), మరియు దాడి చేసే వ్యక్తి కాంట్రాక్ట్‌ను ట్రాప్ చేయకుండా నిరోధించడానికి, `==`కి బదులుగా `>=` లేదా `<=`ని ఉపయోగించాలని వినియోగదారుకు తెలియజేస్తుంది. ఇతర విషయాలతోపాటు, డిటెక్టర్ `balanceOf(address)`కి కాల్ చేసిన రిటర్న్ విలువను ప్రమాదకరమైనదిగా పరిగణిస్తుంది ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), మరియు దాని వినియోగాన్ని ట్రాక్ చేయడానికి డేటా డిపెండెన్సీ ఇంజిన్‌ను ఉపయోగిస్తుంది.

#### ఫిక్స్‌డ్-పాయింట్ కంప్యూటేషన్ {#fixed-point-computation-2}

మీ అనాలిసిస్ CFG ద్వారా నావిగేట్ చేసి, అంచులను అనుసరిస్తే, మీరు ఇప్పటికే సందర్శించిన నోడ్‌లను చూసే అవకాశం ఉంది. ఉదాహరణకు, కింద చూపిన విధంగా లూప్ ఉంటే:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

ఎప్పుడు ఆపాలో మీ అనాలిసిస్‌కు తెలియాలి. ఇక్కడ రెండు ప్రధాన వ్యూహాలు ఉన్నాయి: (1) ప్రతి నోడ్‌పై పరిమిత సంఖ్యలో ఇటరేట్ చేయడం, (2) _ఫిక్స్‌పాయింట్_ అని పిలువబడే దాన్ని లెక్కించడం. ఫిక్స్‌పాయింట్ అంటే ప్రాథమికంగా ఈ నోడ్‌ను విశ్లేషించడం వల్ల ఎలాంటి అర్థవంతమైన సమాచారం లభించదు.

ఉపయోగించిన ఫిక్స్‌పాయింట్‌కు ఉదాహరణ రీఎంట్రెన్సీ డిటెక్టర్‌లలో కనుగొనవచ్చు: స్లిదర్ నోడ్‌లను అన్వేషిస్తుంది మరియు ఎక్స్‌టర్నల్ కాల్స్, స్టోరేజ్‌కి రాయడం మరియు చదవడం కోసం వెతుకుతుంది. అది ఫిక్స్‌పాయింట్‌కు చేరుకున్న తర్వాత ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), అది అన్వేషణను ఆపివేస్తుంది మరియు విభిన్న రీఎంట్రెన్సీ ప్యాటర్న్‌ల ద్వారా రీఎంట్రెన్సీ ఉందో లేదో చూడటానికి ఫలితాలను విశ్లేషిస్తుంది ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

సమర్థవంతమైన ఫిక్స్‌డ్ పాయింట్ కంప్యూటేషన్‌ని ఉపయోగించి అనాలిసిస్‌లను రాయడానికి, అనాలిసిస్ దాని సమాచారాన్ని ఎలా ప్రచారం చేస్తుందనే దానిపై మంచి అవగాహన అవసరం.

### ఇంటర్మీడియట్ రిప్రజెంటేషన్ {#intermediate-representation}

ఇంటర్మీడియట్ రిప్రజెంటేషన్ (IR) అనేది అసలు భాష కంటే స్టాటిక్ అనాలిసిస్‌కు మరింత అనుకూలంగా ఉండేలా ఉద్దేశించిన భాష. స్లిదర్ Solidityని దాని స్వంత IRకి అనువదిస్తుంది: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

మీరు కేవలం ప్రాథమిక తనిఖీలను మాత్రమే రాయాలనుకుంటే SlithIRని అర్థం చేసుకోవడం అవసరం లేదు. అయితే, మీరు అధునాతన సెమాంటిక్ అనాలిసిస్‌లను రాయాలని ప్లాన్ చేస్తే ఇది ఉపయోగపడుతుంది. కోడ్ ఎలా అనువదించబడిందో అర్థం చేసుకోవడానికి [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) మరియు [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) ప్రింటర్‌లు మీకు సహాయపడతాయి.

## API బేసిక్స్ {#api-basics}

కాంట్రాక్ట్ మరియు దాని ఫంక్షన్‌ల ప్రాథమిక లక్షణాలను అన్వేషించడానికి మిమ్మల్ని అనుమతించే APIని స్లిదర్ కలిగి ఉంది.

కోడ్‌బేస్‌ను లోడ్ చేయడానికి:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### కాంట్రాక్ట్‌లు మరియు ఫంక్షన్‌లను అన్వేషించడం {#exploring-contracts-and-functions}

`Slither` ఆబ్జెక్ట్ వీటిని కలిగి ఉంటుంది:

- `contracts (list(Contract)`: కాంట్రాక్ట్‌ల జాబితా
- `contracts_derived (list(Contract)`: మరొక కాంట్రాక్ట్ ద్వారా వారసత్వంగా పొందని కాంట్రాక్ట్‌ల జాబితా (కాంట్రాక్ట్‌ల ఉపసమితి)
- `get_contract_from_name (str)`: దాని పేరు నుండి కాంట్రాక్ట్‌ను తిరిగి ఇస్తుంది

`Contract` ఆబ్జెక్ట్ వీటిని కలిగి ఉంటుంది:

- `name (str)`: కాంట్రాక్ట్ పేరు
- `functions (list(Function))`: ఫంక్షన్‌ల జాబితా
- `modifiers (list(Modifier))`: ఫంక్షన్‌ల జాబితా
- `all_functions_called (list(Function/Modifier))`: కాంట్రాక్ట్ ద్వారా చేరుకోగల అన్ని అంతర్గత ఫంక్షన్‌ల జాబితా
- `inheritance (list(Contract))`: వారసత్వంగా వచ్చిన కాంట్రాక్ట్‌ల జాబితా
- `get_function_from_signature (str)`: దాని సంతకం నుండి ఫంక్షన్‌ను తిరిగి ఇస్తుంది
- `get_modifier_from_signature (str)`: దాని సంతకం నుండి మాడిఫైయర్‌ను తిరిగి ఇస్తుంది
- `get_state_variable_from_name (str)`: దాని పేరు నుండి స్టేట్‌వేరియబుల్‌ను తిరిగి ఇస్తుంది

`Function` లేదా `Modifier` ఆబ్జెక్ట్ వీటిని కలిగి ఉంటుంది:

- `name (str)`: ఫంక్షన్ పేరు
- `contract (contract)`: ఫంక్షన్ ప్రకటించబడిన కాంట్రాక్ట్
- `nodes (list(Node))`: ఫంక్షన్/మాడిఫైయర్ యొక్క CFGని కంపోజ్ చేసే నోడ్‌ల జాబితా
- `entry_point (Node)`: CFG యొక్క ఎంట్రీ పాయింట్
- `variables_read (list(Variable))`: చదివిన వేరియబుల్స్ జాబితా
- `variables_written (list(Variable))`: రాసిన వేరియబుల్స్ జాబితా
- `state_variables_read (list(StateVariable))`: చదివిన స్థితి వేరియబుల్స్ జాబితా (చదివిన వేరియబుల్స్ ఉపసమితి)
- `state_variables_written (list(StateVariable))`: రాసిన స్థితి వేరియబుల్స్ జాబితా (రాసిన వేరియబుల్స్ ఉపసమితి)
