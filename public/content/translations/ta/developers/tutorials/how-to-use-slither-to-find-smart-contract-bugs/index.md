---
title: ஸ்மார்ட் ஒப்பந்தப் பிழைகளைக் கண்டறிய ஸ்லித்தர் (Slither) கருவியை எவ்வாறு பயன்படுத்துவது
description: ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகவே கண்டறிய ஸ்லித்தர் (Slither) கருவியை எவ்வாறு பயன்படுத்துவது
author: ட்ரெயில்ஆஃப்பிட்ஸ்
lang: ta
tags: ["solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்", "பாதுகாப்பு", "சோதனை"]
skill: advanced
breadcrumb: ஸ்லித்தர்
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## ஸ்லித்தர் (Slither) கருவியை எவ்வாறு பயன்படுத்துவது {#how-to-use-slither}

ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகவே கண்டறிய ஸ்லித்தர் கருவியை எவ்வாறு பயன்படுத்துவது என்பதைக் காட்டுவதே இந்தப் பயிற்சியின் நோக்கமாகும்.

- [நிறுவல்](#installation)
- [கட்டளை வரிப் பயன்பாடு](#command-line)
- [நிலையான பகுப்பாய்வுக்கான அறிமுகம்](#static-analysis): நிலையான பகுப்பாய்வு பற்றிய சுருக்கமான அறிமுகம்
- [API](#api-basics): Python API விளக்கம்

## நிறுவல் {#installation}

ஸ்லித்தருக்கு Python >= 3.6 தேவை. இதை pip மூலமாகவோ அல்லது Docker-ஐப் பயன்படுத்தியோ நிறுவலாம்.

pip மூலம் ஸ்லித்தர்:

```bash
pip3 install --user slither-analyzer
```

Docker மூலம் ஸ்லித்தர்:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_கடைசி கட்டளையானது, உங்கள் தற்போதைய கோப்பகத்திற்கான அணுகலைக் கொண்ட ஒரு Docker-இல் eth-security-toolbox-ஐ இயக்குகிறது. உங்கள் ஹோஸ்டிலிருந்து கோப்புகளை மாற்றலாம், மேலும் Docker-இலிருந்து கோப்புகளில் கருவிகளை இயக்கலாம்_

Docker-இன் உள்ளே, இதை இயக்கவும்:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### ஸ்கிரிப்டை இயக்குதல் {#running-a-script}

python 3 உடன் ஒரு python ஸ்கிரிப்டை இயக்க:

```bash
python3 script.py
```

### கட்டளை வரி {#command-line}

**கட்டளை வரி மற்றும் பயனர் வரையறுத்த ஸ்கிரிப்டுகள்.** பல பொதுவான பிழைகளைக் கண்டறியும் முன்வரையறுக்கப்பட்ட கண்டறிதல் கருவிகளின் (detectors) தொகுப்புடன் ஸ்லித்தர் வருகிறது. கட்டளை வரியிலிருந்து ஸ்லித்தரை அழைப்பது அனைத்து கண்டறிதல் கருவிகளையும் இயக்கும், இதற்கு நிலையான பகுப்பாய்வு பற்றிய விரிவான அறிவு தேவையில்லை:

```bash
slither project_paths
```

கண்டறிதல் கருவிகளுக்கு கூடுதலாக, ஸ்லித்தர் அதன் [பிரிண்டர்கள் (printers)](https://github.com/crytic/slither#printers) மற்றும் [கருவிகள்](https://github.com/crytic/slither#tools) மூலம் குறியீட்டு மதிப்பாய்வு திறன்களைக் கொண்டுள்ளது.

தனிப்பட்ட கண்டறிதல் கருவிகள் மற்றும் GitHub ஒருங்கிணைப்பிற்கான அணுகலைப் பெற [crytic.io](https://github.com/crytic)-ஐப் பயன்படுத்தவும்.

## நிலையான பகுப்பாய்வு {#static-analysis}

ஸ்லித்தர் நிலையான பகுப்பாய்வு கட்டமைப்பின் திறன்கள் மற்றும் வடிவமைப்பு வலைப்பதிவு இடுகைகளிலும் ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) மற்றும் ஒரு [கல்வி ஆய்வுக் கட்டுரையிலும்](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) விவரிக்கப்பட்டுள்ளது.

நிலையான பகுப்பாய்வு வெவ்வேறு வகைகளில் உள்ளது. [clang](https://clang-analyzer.llvm.org/) மற்றும் [gcc](https://lwn.net/Articles/806099/) போன்ற கம்பைலர்கள் இந்த ஆராய்ச்சி நுட்பங்களைச் சார்ந்துள்ளன என்பதை நீங்கள் பெரும்பாலும் உணர்ந்திருப்பீர்கள், ஆனால் இது ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) மற்றும் [Frama-C](https://frama-c.com/) மற்றும் [Polyspace](https://www.mathworks.com/products/polyspace.html) போன்ற முறையான வழிமுறைகளை அடிப்படையாகக் கொண்ட கருவிகளுக்கும் அடிப்படையாக அமைகிறது.

நிலையான பகுப்பாய்வு நுட்பங்கள் மற்றும் ஆராய்ச்சியாளர்களை நாங்கள் இங்கு முழுமையாக மதிப்பாய்வு செய்யப் போவதில்லை. அதற்குப் பதிலாக, ஸ்லித்தர் எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்துகொள்ள என்ன தேவை என்பதில் கவனம் செலுத்துவோம், இதன் மூலம் பிழைகளைக் கண்டறியவும் குறியீட்டைப் புரிந்துகொள்ளவும் நீங்கள் அதை மிகவும் திறம்படப் பயன்படுத்தலாம்.

- [குறியீட்டுப் பிரதிநிதித்துவம்](#code-representation)
- [குறியீட்டுப் பகுப்பாய்வு](#analysis)
- [இடைநிலை பிரதிநிதித்துவம்](#intermediate-representation)

### குறியீட்டுப் பிரதிநிதித்துவம் {#code-representation}

ஒரே ஒரு செயலாக்கப் பாதையைப் பற்றி ஆராயும் மாறும் பகுப்பாய்விற்கு (dynamic analysis) மாறாக, நிலையான பகுப்பாய்வு அனைத்துப் பாதைகளையும் ஒரே நேரத்தில் ஆராய்கிறது. அவ்வாறு செய்ய, இது வேறுபட்ட குறியீட்டுப் பிரதிநிதித்துவத்தை நம்பியுள்ளது. சுருக்கமான தொடரியல் மரம் (abstract syntax tree - AST) மற்றும் கட்டுப்பாட்டு ஓட்ட வரைபடம் (control flow graph - CFG) ஆகியவை மிகவும் பொதுவான இரண்டு பிரதிநிதித்துவங்களாகும்.

### சுருக்கமான தொடரியல் மரங்கள் (AST) {#abstract-syntax-trees-ast}

கம்பைலர் குறியீட்டைப் பாகுபடுத்தும் (parse) ஒவ்வொரு முறையும் AST பயன்படுத்தப்படுகிறது. நிலையான பகுப்பாய்வைச் செய்யக்கூடிய மிக அடிப்படையான கட்டமைப்பு இதுவாகத்தான் இருக்கும்.

சுருக்கமாகச் சொன்னால், AST என்பது ஒரு கட்டமைக்கப்பட்ட மரமாகும், இதில் பொதுவாக ஒவ்வொரு இலையிலும் ஒரு மாறி (variable) அல்லது மாறிலி (constant) இருக்கும், மேலும் உள் கணுக்கள் (nodes) செயலிழப்புகள் (operands) அல்லது கட்டுப்பாட்டு ஓட்ட செயல்பாடுகளாக இருக்கும். பின்வரும் குறியீட்டைக் கவனியுங்கள்:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

அதனுடன் தொடர்புடைய AST இதில் காட்டப்பட்டுள்ளது:

![AST](./ast.png)

solc மூலம் ஏற்றுமதி செய்யப்பட்ட AST-ஐ ஸ்லித்தர் பயன்படுத்துகிறது.

உருவாக்க எளிமையானதாக இருந்தாலும், AST என்பது ஒரு உள்ளமைக்கப்பட்ட (nested) கட்டமைப்பாகும். சில நேரங்களில், இது பகுப்பாய்வு செய்வதற்கு மிகவும் நேரடியானதாக இருக்காது. எடுத்துக்காட்டாக, `a + b <= a` என்ற கோவையால் பயன்படுத்தப்படும் செயல்பாடுகளை அடையாளம் காண, நீங்கள் முதலில் `<=`-ஐயும் பின்னர் `+`-ஐயும் பகுப்பாய்வு செய்ய வேண்டும். மரத்தின் வழியாக சுழல்முறையில் (recursively) செல்லும் விசிட்டர் பேட்டர்ன் (visitor pattern) என்று அழைக்கப்படுவதைப் பயன்படுத்துவது ஒரு பொதுவான அணுகுமுறையாகும். ஸ்லித்தர் [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)-இல் ஒரு பொதுவான விசிட்டரைக் கொண்டுள்ளது.

கோவையில் கூட்டல் உள்ளதா என்பதைக் கண்டறிய பின்வரும் குறியீடு `ExpressionVisitor`-ஐப் பயன்படுத்துகிறது:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression என்பது சோதிக்கப்பட வேண்டிய கோவை ஆகும்
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### கட்டுப்பாட்டு ஓட்ட வரைபடம் (CFG) {#control-flow-graph-cfg}

இரண்டாவது மிகவும் பொதுவான குறியீட்டுப் பிரதிநிதித்துவம் கட்டுப்பாட்டு ஓட்ட வரைபடம் (CFG) ஆகும். அதன் பெயர் குறிப்பிடுவது போல, இது அனைத்து செயலாக்கப் பாதைகளையும் வெளிப்படுத்தும் வரைபட அடிப்படையிலான பிரதிநிதித்துவமாகும். ஒவ்வொரு கணுவும் ஒன்று அல்லது பல வழிமுறைகளைக் கொண்டுள்ளது. வரைபடத்தில் உள்ள விளிம்புகள் கட்டுப்பாட்டு ஓட்ட செயல்பாடுகளைக் குறிக்கின்றன (if/then/else, loop போன்றவை). நமது முந்தைய எடுத்துக்காட்டின் CFG:

![CFG](./cfg.png)

CFG என்பது பெரும்பாலான பகுப்பாய்வுகள் கட்டமைக்கப்படும் பிரதிநிதித்துவமாகும்.

வேறு பல குறியீட்டுப் பிரதிநிதித்துவங்கள் உள்ளன. நீங்கள் செய்ய விரும்பும் பகுப்பாய்வைப் பொறுத்து ஒவ்வொரு பிரதிநிதித்துவத்திற்கும் நன்மைகள் மற்றும் குறைபாடுகள் உள்ளன.

### பகுப்பாய்வு {#analysis}

ஸ்லித்தர் மூலம் நீங்கள் செய்யக்கூடிய எளிமையான பகுப்பாய்வு தொடரியல் பகுப்பாய்வு (syntactic analysis) ஆகும்.

### தொடரியல் பகுப்பாய்வு {#syntax-analysis}

பேட்டர்ன் மேட்சிங் (pattern matching) போன்ற அணுகுமுறையைப் பயன்படுத்தி முரண்பாடுகள் மற்றும் குறைபாடுகளைக் கண்டறிய, குறியீட்டின் வெவ்வேறு கூறுகள் மற்றும் அவற்றின் பிரதிநிதித்துவத்தின் வழியாக ஸ்லித்தரால் செல்ல முடியும்.

எடுத்துக்காட்டாக, பின்வரும் கண்டறிதல் கருவிகள் தொடரியல் தொடர்பான சிக்கல்களைத் தேடுகின்றன:

- [நிலை மாறி மறைத்தல் (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): அனைத்து நிலை மாறிகள் மீதும் மீண்டும் மீண்டும் செயல்பட்டு, மரபுரிமையாகப் பெறப்பட்ட ஒப்பந்தத்திலிருந்து ஏதேனும் ஒரு மாறியை மறைக்கிறதா எனச் சரிபார்க்கிறது ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [தவறான ERC-20 இடைமுகம்](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): தவறான ERC-20 செயல்பாட்டுக் கையொப்பங்களைத் தேடுகிறது ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### சொற்பொருள் பகுப்பாய்வு (Semantic analysis) {#semantic-analysis}

தொடரியல் பகுப்பாய்விற்கு மாறாக, ஒரு சொற்பொருள் பகுப்பாய்வு ஆழமாகச் சென்று குறியீட்டின் "பொருளை" பகுப்பாய்வு செய்யும். இந்தக் குடும்பத்தில் சில பரந்த வகையான பகுப்பாய்வுகள் அடங்கும். அவை மிகவும் சக்திவாய்ந்த மற்றும் பயனுள்ள முடிவுகளுக்கு வழிவகுக்கின்றன, ஆனால் எழுதுவதற்கும் மிகவும் சிக்கலானவை.

மிகவும் மேம்பட்ட பாதிப்புகளைக் கண்டறிவதற்குச் சொற்பொருள் பகுப்பாய்வுகள் பயன்படுத்தப்படுகின்றன.

#### தரவு சார்புப் பகுப்பாய்வு {#fixed-point-computation}

`variable_a` இன் மதிப்பு `variable_b` ஆல் பாதிக்கப்படும் ஒரு பாதை இருந்தால், `variable_a` என்ற மாறி `variable_b` இன் தரவு சார்புடையது என்று கூறப்படுகிறது.

பின்வரும் குறியீட்டில், `variable_a` ஆனது `variable_b` ஐச் சார்ந்துள்ளது:

```solidity
// ...
variable_a = variable_b + 1;
```

ஸ்லித்தர் அதன் இடைநிலை பிரதிநிதித்துவத்தின் (பிற்பட்ட பிரிவில் விவாதிக்கப்பட்டுள்ளது) காரணமாக, உள்ளமைக்கப்பட்ட [தரவு சார்பு](https://github.com/crytic/slither/wiki/data-dependency) திறன்களுடன் வருகிறது.

தரவு சார்புப் பயன்பாட்டிற்கான ஒரு எடுத்துக்காட்டை [ஆபத்தான கண்டிப்பான சமத்துவக் கண்டறிதல் கருவியில் (dangerous strict equality detector)](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) காணலாம். இங்கே ஸ்லித்தர் ஒரு ஆபத்தான மதிப்பிற்கான கண்டிப்பான சமத்துவ ஒப்பீட்டைத் தேடும் ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), மேலும் தாக்குபவர் ஒப்பந்தத்தைப் பொறிவைப்பதைத் தடுக்க, `==`-க்குப் பதிலாக `>=` அல்லது `<=`-ஐப் பயன்படுத்த வேண்டும் என்று பயனருக்குத் தெரிவிக்கும். மற்றவற்றுடன், கண்டறிதல் கருவி `balanceOf(address)`-க்கான அழைப்பின் திரும்பும் மதிப்பை ஆபத்தானதாகக் கருதும் ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), மேலும் அதன் பயன்பாட்டைக் கண்காணிக்கத் தரவு சார்பு இயந்திரத்தைப் பயன்படுத்தும்.

#### நிலையான-புள்ளி கணக்கீடு (Fixed-point computation) {#fixed-point-computation-2}

உங்கள் பகுப்பாய்வு CFG வழியாகச் சென்று விளிம்புகளைப் பின்பற்றினால், ஏற்கனவே பார்வையிட்ட கணுக்களை நீங்கள் காண வாய்ப்புள்ளது. எடுத்துக்காட்டாக, கீழே காட்டப்பட்டுள்ளபடி ஒரு லூப் (loop) வழங்கப்பட்டால்:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

உங்கள் பகுப்பாய்வு எப்போது நிறுத்த வேண்டும் என்பதை அறிய வேண்டும். இங்கே இரண்டு முக்கிய உத்திகள் உள்ளன: (1) ஒவ்வொரு கணுவிலும் ஒரு குறிப்பிட்ட எண்ணிக்கையிலான முறை மீண்டும் மீண்டும் செயல்படுவது, (2) _ஃபிக்ஸ்பாயிண்ட் (fixpoint)_ என்று அழைக்கப்படுவதைக் கணக்கிடுவது. ஃபிக்ஸ்பாயிண்ட் என்பது அடிப்படையில் இந்தக் கணுவைப் பகுப்பாய்வு செய்வது எந்த அர்த்தமுள்ள தகவலையும் வழங்காது என்பதாகும்.

பயன்படுத்தப்படும் ஃபிக்ஸ்பாயிண்டின் ஒரு எடுத்துக்காட்டை மறுநுழைவுக் (reentrancy) கண்டறிதல் கருவிகளில் காணலாம்: ஸ்லித்தர் கணுக்களை ஆராய்கிறது, மேலும் வெளிப்புற அழைப்புகள், சேமிப்பகத்தில் எழுதுதல் மற்றும் படித்தல் ஆகியவற்றைத் தேடுகிறது. அது ஒரு ஃபிக்ஸ்பாயிண்டை அடைந்தவுடன் ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), அது ஆய்வை நிறுத்துகிறது, மேலும் வெவ்வேறு மறுநுழைவு வடிவங்கள் மூலம் ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) மறுநுழைவு உள்ளதா என்பதைப் பார்க்க முடிவுகளைப் பகுப்பாய்வு செய்கிறது.

திறமையான நிலையான புள்ளி கணக்கீட்டைப் பயன்படுத்திப் பகுப்பாய்வுகளை எழுதுவதற்கு, பகுப்பாய்வு அதன் தகவலை எவ்வாறு பரப்புகிறது என்பதைப் பற்றிய நல்ல புரிதல் தேவை.

### இடைநிலை பிரதிநிதித்துவம் {#intermediate-representation}

இடைநிலை பிரதிநிதித்துவம் (IR) என்பது அசல் மொழியை விட நிலையான பகுப்பாய்விற்கு மிகவும் ஏற்றதாக இருக்கும் ஒரு மொழியாகும். ஸ்லித்தர் Solidity-ஐ அதன் சொந்த IR-க்கு மொழிபெயர்க்கிறது: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

நீங்கள் அடிப்படைச் சரிபார்ப்புகளை மட்டுமே எழுத விரும்பினால் SlithIR-ஐப் புரிந்து கொள்ள வேண்டிய அவசியமில்லை. இருப்பினும், மேம்பட்ட சொற்பொருள் பகுப்பாய்வுகளை எழுதத் திட்டமிட்டால் இது கைக்கு வரும். குறியீடு எவ்வாறு மொழிபெயர்க்கப்படுகிறது என்பதைப் புரிந்துகொள்ள [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) மற்றும் [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) பிரிண்டர்கள் உங்களுக்கு உதவும்.

## API அடிப்படைகள் {#api-basics}

ஒப்பந்தம் மற்றும் அதன் செயல்பாடுகளின் அடிப்படைப் பண்புகளை ஆராய உங்களை அனுமதிக்கும் ஒரு API-ஐ ஸ்லித்தர் கொண்டுள்ளது.

ஒரு குறியீட்டுத் தளத்தை (codebase) ஏற்ற:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### ஒப்பந்தங்கள் மற்றும் செயல்பாடுகளை ஆராய்தல் {#exploring-contracts-and-functions}

ஒரு `Slither` ஆப்ஜெக்ட் (object) இவற்றைக் கொண்டுள்ளது:

- `contracts (list(Contract)`: ஒப்பந்தங்களின் பட்டியல்
- `contracts_derived (list(Contract)`: மற்றொரு ஒப்பந்தத்தால் மரபுரிமையாகப் பெறப்படாத ஒப்பந்தங்களின் பட்டியல் (ஒப்பந்தங்களின் துணைக்குழு)
- `get_contract_from_name (str)`: ஒரு ஒப்பந்தத்தை அதன் பெயரிலிருந்து வழங்குகிறது

ஒரு `Contract` ஆப்ஜெக்ட் இவற்றைக் கொண்டுள்ளது:

- `name (str)`: ஒப்பந்தத்தின் பெயர்
- `functions (list(Function))`: செயல்பாடுகளின் பட்டியல்
- `modifiers (list(Modifier))`: செயல்பாடுகளின் பட்டியல்
- `all_functions_called (list(Function/Modifier))`: ஒப்பந்தத்தால் அடையக்கூடிய அனைத்து உள் செயல்பாடுகளின் பட்டியல்
- `inheritance (list(Contract))`: மரபுரிமையாகப் பெறப்பட்ட ஒப்பந்தங்களின் பட்டியல்
- `get_function_from_signature (str)`: ஒரு செயல்பாட்டை அதன் கையொப்பத்திலிருந்து வழங்குகிறது
- `get_modifier_from_signature (str)`: ஒரு மாற்றி அமைப்பானை (Modifier) அதன் கையொப்பத்திலிருந்து வழங்குகிறது
- `get_state_variable_from_name (str)`: ஒரு நிலை மாறியை (StateVariable) அதன் பெயரிலிருந்து வழங்குகிறது

ஒரு `Function` அல்லது ஒரு `Modifier` ஆப்ஜெக்ட் இவற்றைக் கொண்டுள்ளது:

- `name (str)`: செயல்பாட்டின் பெயர்
- `contract (contract)`: செயல்பாடு அறிவிக்கப்பட்டுள்ள ஒப்பந்தம்
- `nodes (list(Node))`: செயல்பாடு/மாற்றி அமைப்பானின் CFG-ஐ உருவாக்கும் கணுக்களின் பட்டியல்
- `entry_point (Node)`: CFG-இன் நுழைவுப் புள்ளி
- `variables_read (list(Variable))`: படிக்கப்பட்ட மாறிகளின் பட்டியல்
- `variables_written (list(Variable))`: எழுதப்பட்ட மாறிகளின் பட்டியல்
- `state_variables_read (list(StateVariable))`: படிக்கப்பட்ட நிலை மாறிகளின் பட்டியல் (படிக்கப்பட்ட மாறிகளின் துணைக்குழு)
- `state_variables_written (list(StateVariable))`: எழுதப்பட்ட நிலை மாறிகளின் பட்டியல் (எழுதப்பட்ட மாறிகளின் துணைக்குழு)