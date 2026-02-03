---
title: "ஸ்மார்ட் ஒப்பந்தப் பிழைகளைக் கண்டறிய Slither-ஐ எவ்வாறு பயன்படுத்துவது"
description: "ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகக் கண்டறிய Slither-ஐ எவ்வாறு பயன்படுத்துவது"
author: Trailofbits
lang: ta
tags:
  [
    "திட்பம்",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "பாதுகாப்பு",
    "சோதனை"
  ]
skill: advanced
published: 2020-06-09
source: "பாதுகாப்பான ஒப்பந்தங்களை உருவாக்குதல்"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither-ஐ எவ்வாறு பயன்படுத்துவது {#how-to-use-slither}

ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகக் கண்டறிய Slither-ஐ எவ்வாறு பயன்படுத்துவது என்பதைக் காண்பிப்பதே இந்தப் பயிற்சியின் நோக்கம்.

- [நிறுவல்](#installation)
- [கட்டளை வரி பயன்பாடு](#command-line)
- [நிலையான பகுப்பாய்வுக்கான அறிமுகம்](#static-analysis): நிலையான பகுப்பாய்வுக்கான சுருக்கமான அறிமுகம்
- [பயன்பாட்டு நிரலாக்க இடைமுகம்](#api-basics): பைத்தான் பயன்பாட்டு நிரலாக்க இடைமுகத்தின் விளக்கம்

## நிறுவல் {#installation}

Slither-க்கு Python >= 3.6 தேவைப்படுகிறது. இதை pip மூலமாகவோ அல்லது docker-ஐப் பயன்படுத்தியோ நிறுவலாம்.

pip வழியாக Slither:

```bash
pip3 install --user slither-analyzer
```

docker வழியாக Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_கடைசிக் கட்டளை eth-security-toolbox-ஐ உங்கள் தற்போதைய கோப்பகத்திற்கான அணுகலைக் கொண்ட docker-இல் இயக்குகிறது. உங்கள் ஹோஸ்டிலிருந்து கோப்புகளை மாற்றலாம், மேலும் docker-இலிருந்து கோப்புகளில் கருவிகளை இயக்கலாம்_

docker-க்குள், இயக்கவும்:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### ஒரு ஸ்கிரிப்டை இயக்குதல் {#running-a-script}

python 3 உடன் ஒரு பைதான் ஸ்கிரிப்டை இயக்க:

```bash
python3 script.py
```

### கட்டளை வரி {#command-line}

**கட்டளை வரி மற்றும் பயனர் வரையறுத்த ஸ்கிரிப்டுகள்.** பல பொதுவான பிழைகளைக் கண்டறியும் முன்வரையறுக்கப்பட்ட கண்டறிவான்களின் தொகுப்புடன் Slither வருகிறது. கட்டளை வரியிலிருந்து Slither-ஐ அழைப்பது அனைத்து கண்டறிவான்களையும் இயக்கும், நிலையான பகுப்பாய்வு பற்றிய விரிவான அறிவு தேவையில்லை:

```bash
slither project_paths
```

கண்டறிவான்களுடன் கூடுதலாக, Slither அதன் [அச்சுப்பொறிகள்](https://github.com/crytic/slither#printers) மற்றும் [கருவிகள்](https://github.com/crytic/slither#tools) மூலம் குறியீடு மறுஆய்வு திறன்களையும் கொண்டுள்ளது.

தனியுரிம கண்டறிவான்களுக்கான அணுகலையும் GitHub ஒருங்கிணைப்பையும் பெற [crytic.io](https://github.com/crytic)-ஐப் பயன்படுத்தவும்.

## நிலையான பகுப்பாய்வு {#static-analysis}

Slither நிலையான பகுப்பாய்வு கட்டமைப்பின் திறன்களும் வடிவமைப்பும் வலைப்பதிவு இடுகைகளிலும் ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) மற்றும் ஒரு [கல்விசார் கட்டுரையிலும்](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) விவரிக்கப்பட்டுள்ளன.

நிலையான பகுப்பாய்வு வெவ்வேறு வகைகளில் உள்ளது. [clang](https://clang-analyzer.llvm.org/) மற்றும் [gcc](https://lwn.net/Articles/806099/) போன்ற தொகுப்பிகள் இந்த ஆராய்ச்சி நுட்பங்களைச் சார்ந்துள்ளன என்பதை நீங்கள் பெரும்பாலும் உணர்ந்திருப்பீர்கள், ஆனால் இது ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) மற்றும் [Frama-C](https://frama-c.com/) மற்றும் [Polyspace](https://www.mathworks.com/products/polyspace.html) போன்ற முறையான முறைகளை அடிப்படையாகக் கொண்ட கருவிகளையும் ஆதரிக்கிறது.

நிலையான பகுப்பாய்வு நுட்பங்களையும் ஆராய்ச்சியாளரையும் இங்கு நாம் முழுமையாக மதிப்பாய்வு செய்யப் போவதில்லை. மாறாக, Slither எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்துகொள்வதற்குத் தேவையானவற்றில் நாம் கவனம் செலுத்துவோம், இதன்மூலம் பிழைகளைக் கண்டறியவும் குறியீட்டைப் புரிந்துகொள்ளவும் அதை நீங்கள் மிகவும் திறம்படப் பயன்படுத்த முடியும்.

- [குறியீட்டுப் பிரதிநிதித்துவம்](#code-representation)
- [குறியீட்டுப் பகுப்பாய்வு](#analysis)
- [இடைநிலை பிரதிநிதித்துவம்](#intermediate-representation)

### குறியீட்டுப் பிரதிநிதித்துவம் {#code-representation}

ஒற்றை செயல்படுத்தும் பாதையைப் பற்றி மட்டுமே பகுத்தாயும் இயக்க பகுப்பாய்வுக்கு மாறாக, நிலையான பகுப்பாய்வு அனைத்துப் பாதைகளையும் ஒரே நேரத்தில் பகுத்தாய்கிறது. அவ்வாறு செய்ய, அது ஒரு வெவ்வேறு குறியீட்டுப் பிரதிநிதித்துவத்தை நம்பியுள்ளது. சுருக்க தொடரியல் மரம் (AST) மற்றும் கட்டுப்பாட்டு ஓட்ட வரைபடம் (CFG) ஆகியவை இரண்டு மிகவும் பொதுவானவை.

### சுருக்க தொடரியல் மரங்கள் (AST) {#abstract-syntax-trees-ast}

ஒவ்வொரு முறையும் தொகுப்பி குறியீட்டைப் பாகுபடுத்தும்போது AST-கள் பயன்படுத்தப்படுகின்றன. நிலையான பகுப்பாய்வைச் செய்யக்கூடிய மிகவும் அடிப்படையான கட்டமைப்பு இதுவாக இருக்கலாம்.

சுருக்கமாகச் சொன்னால், ஒரு AST என்பது ஒரு கட்டமைக்கப்பட்ட மரம், இதில் பொதுவாக, ஒவ்வொரு இலையும் ஒரு மாறி அல்லது ஒரு மாறிலியைக் கொண்டிருக்கும் மற்றும் உள் முனைகள் செயலுருபுகள் அல்லது கட்டுப்பாட்டு ஓட்ட செயல்பாடுகளாக இருக்கும். பின்வரும் குறியீட்டைக் கவனியுங்கள்:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

அதனுடன் தொடர்புடைய AST கீழே காட்டப்பட்டுள்ளது:

![AST](./ast.png)

Slither ஆனது solc மூலம் ஏற்றுமதி செய்யப்பட்ட AST-ஐப் பயன்படுத்துகிறது.

உருவாக்குவதற்கு எளிமையானதாக இருந்தாலும், AST ஒரு பின்னப்பட்ட கட்டமைப்பாகும். சில நேரங்களில், இதை பகுப்பாய்வு செய்வது மிகவும் நேரடியானதாக இருக்காது. உதாரணமாக, `a + b <= a` என்ற கோவையால் பயன்படுத்தப்படும் செயல்பாடுகளை அடையாளம் காண, நீங்கள் முதலில் `<=` ஐயும் பின்னர் `+` ஐயும் பகுப்பாய்வு செய்ய வேண்டும். பார்வையாளர் மாதிரி எனப்படும் ஒன்றைப் பயன்படுத்துவது ஒரு பொதுவான அணுகுமுறையாகும், இது மரத்தின் வழியாக சுழல் முறையில் பயணிக்கிறது. Slither, [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) இல் ஒரு பொதுவான பார்வையாளரைக் கொண்டுள்ளது.

பின்வரும் குறியீடு, ஒரு கோவையில் கூட்டல் உள்ளதா என்பதைக் கண்டறிய `ExpressionVisitor`-ஐப் பயன்படுத்துகிறது:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression என்பது சோதிக்கப்பட வேண்டிய கோவை
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### கட்டுப்பாட்டு ஓட்ட வரைபடம் (CFG) {#control-flow-graph-cfg}

இரண்டாவது மிகவும் பொதுவான குறியீட்டுப் பிரதிநிதித்துவம் கட்டுப்பாட்டு ஓட்ட வரைபடம் (CFG) ஆகும். அதன் பெயர் குறிப்பிடுவது போல, இது அனைத்து செயல்படுத்தும் பாதைகளையும் வெளிப்படுத்தும் ஒரு வரைபட அடிப்படையிலான பிரதிநிதித்துவம் ஆகும். ஒவ்வொரு முனையும் ஒன்று அல்லது பல அறிவுறுத்தல்களைக் கொண்டுள்ளது. வரைபடத்தில் உள்ள விளிம்புகள் கட்டுப்பாட்டு ஓட்ட செயல்பாடுகளை (if/then/else, loop, போன்றவை) குறிக்கின்றன. நமது முந்தைய உதாரணத்தின் CFG:

![CFG](./cfg.png)

CFG என்பது பெரும்பாலான பகுப்பாய்வுகள் உருவாக்கப்படும் ஒரு பிரதிநிதித்துவம் ஆகும்.

பல பிற குறியீட்டுப் பிரதிநிதித்துவங்கள் உள்ளன. நீங்கள் செய்ய விரும்பும் பகுப்பாய்வைப் பொறுத்து ஒவ்வொரு பிரதிநிதித்துவத்திற்கும் நன்மைகள் மற்றும் தீமைகள் உள்ளன.

### பகுப்பாய்வு {#analysis}

Slither மூலம் நீங்கள் செய்யக்கூடிய எளிமையான பகுப்பாய்வு வகை தொடரியல் பகுப்பாய்வுகள் ஆகும்.

### தொடரியல் பகுப்பாய்வு {#syntax-analysis}

மாதிரிப் பொருத்தம் போன்ற அணுகுமுறையைப் பயன்படுத்தி முரண்பாடுகளையும் குறைபாடுகளையும் கண்டறிய, குறியீட்டின் வெவ்வேறு கூறுகளையும் அவற்றின் பிரதிநிதித்துவத்தையும் Slither ஆராய முடியும்.

உதாரணமாக, பின்வரும் கண்டறிவான்கள் தொடரியல் தொடர்பான சிக்கல்களைத் தேடுகின்றன:

- [நிலை மாறி நிழலாடல்](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): அனைத்து நிலை மாறிகளையும் மீண்டும் மீண்டும் ஆராய்ந்து, மரபுரிமையாகப் பெறப்பட்ட ஒப்பந்தத்தில் இருந்து ஏதேனும் ஒரு மாறி நிழலாடுகிறதா எனச் சரிபார்க்கிறது ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [தவறான ERC20 இடைமுகம்](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): தவறான ERC20 செயல்பாட்டுக் கையொப்பங்களைத் தேடுகிறது ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### சொற்பொருள் பகுப்பாய்வு {#semantic-analysis}

தொடரியல் பகுப்பாய்வுக்கு மாறாக, ஒரு சொற்பொருள் பகுப்பாய்வு ஆழமாகச் சென்று குறியீட்டின் "பொருளை" பகுப்பாய்வு செய்யும். இந்தக் குடும்பத்தில் சில பரந்த வகை பகுப்பாய்வுகள் அடங்கும். அவை மிகவும் சக்திவாய்ந்த மற்றும் பயனுள்ள முடிவுகளுக்கு வழிவகுக்கின்றன, ஆனால் எழுதுவதற்கும் மிகவும் சிக்கலானவையாக உள்ளன.

சொற்பொருள் பகுப்பாய்வுகள் மிகவும் மேம்பட்ட பாதிப்பு கண்டறிதல்களுக்குப் பயன்படுத்தப்படுகின்றன.

#### தரவு சார்பு பகுப்பாய்வு {#fixed-point-computation}

`variable_a` என்ற மாறியின் மதிப்பு `variable_b` ஆல் பாதிக்கப்படும் ஒரு பாதை இருந்தால், `variable_a` ஆனது `variable_b`-ஐ தரவு சார்ந்துள்ளது என்று கூறப்படுகிறது.

பின்வரும் குறியீட்டில், `variable_a` ஆனது `variable_b`-ஐச் சார்ந்துள்ளது:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither அதன் இடைநிலை பிரதிநிதித்துவத்திற்கு நன்றி, உள்ளமைக்கப்பட்ட [தரவு சார்பு](https://github.com/crytic/slither/wiki/data-dependency) திறன்களுடன் வருகிறது (பிற்காலப் பிரிவில் விவாதிக்கப்பட்டது).

தரவு சார்பு பயன்பாட்டின் ஒரு உதாரணத்தை [அபாயகரமான கடுமையான சமத்துவக் கண்டறிவான்](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)-இல் காணலாம். இங்கே Slither ஒரு அபாயகரமான மதிப்புடன் கடுமையான சமத்துவ ஒப்பீட்டைத் தேடும் ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), மேலும் ஒரு தாக்குபவர் ஒப்பந்தத்தைச் சிக்க வைப்பதைத் தடுக்க, `==`-க்குப் பதிலாக `>=` அல்லது `<=`-ஐப் பயன்படுத்த வேண்டும் என்று பயனருக்குத் தெரிவிக்கும். மற்றவற்றுடன், `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) என்ற அழைப்பின் திரும்பும் மதிப்பை கண்டறிவான் அபாயகரமானதாகக் கருதும், மேலும் அதன் பயன்பாட்டைக் கண்காணிக்க தரவு சார்பு இயந்திரத்தைப் பயன்படுத்தும்.

#### நிலையான புள்ளி கணக்கீடு {#fixed-point-computation}

உங்கள் பகுப்பாய்வு CFG வழியாகச் சென்று விளிம்புகளைப் பின்தொடர்ந்தால், நீங்கள் ஏற்கனவே பார்வையிட்ட முனைகளைக் காண வாய்ப்புள்ளது. உதாரணமாக, கீழே காட்டப்பட்டுள்ளபடி ஒரு லூப் வழங்கப்பட்டால்:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

உங்கள் பகுப்பாய்வு எப்போது நிறுத்த வேண்டும் என்பதைத் தெரிந்து கொள்ள வேண்டும். இங்கே இரண்டு முக்கிய உத்திகள் உள்ளன: (1) ஒவ்வொரு முனையிலும் ஒரு குறிப்பிட்ட எண்ணிக்கையிலான முறை மீண்டும் மீண்டும் செயல்படுத்துதல், (2) _நிலையான புள்ளி_ எனப்படும் ஒன்றைக் கணக்கிடுதல். ஒரு நிலையான புள்ளி என்பது அடிப்படையில் இந்த முனையை பகுப்பாய்வு செய்வது எந்த அர்த்தமுள்ள தகவலையும் வழங்காது என்பதாகும்.

பயன்படுத்தப்பட்ட நிலையான புள்ளிக்கு ஒரு உதாரணத்தை மறுநுழைவு கண்டறிவான்களில் காணலாம்: Slither முனைகளை ஆராய்ந்து, வெளிப்புற அழைப்புகள், சேமிப்பகத்தில் எழுதுதல் மற்றும் படித்தல் ஆகியவற்றைத் தேடுகிறது. அது ஒரு நிலையான புள்ளியை ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)) அடைந்தவுடன், அது ஆய்வை நிறுத்திவிட்டு, வெவ்வேறு மறுநுழைவு மாதிரிகள் ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) மூலம் மறுநுழைவு உள்ளதா என்பதைப் பார்க்க முடிவுகளை பகுப்பாய்வு செய்கிறது.

திறமையான நிலையான புள்ளி கணக்கீட்டைப் பயன்படுத்தி பகுப்பாய்வுகளை எழுதுவதற்கு, பகுப்பாய்வு அதன் தகவல்களை எவ்வாறு பரப்புகிறது என்பது பற்றிய நல்ல புரிதல் தேவை.

### இடைநிலை பிரதிநிதித்துவம் {#intermediate-representation}

ஒரு இடைநிலை பிரதிநிதித்துவம் (IR) என்பது அசல் மொழியை விட நிலையான பகுப்பாய்வுக்கு மிகவும் உகந்ததாக இருக்கும் ஒரு மொழியாகும். Slither, Solidity-ஐ அதன் சொந்த IR-ஆன [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)-க்கு மொழிபெயர்க்கிறது.

நீங்கள் அடிப்படைச் சரிபார்ப்புகளை மட்டுமே எழுத விரும்பினால், SlithIR-ஐப் புரிந்துகொள்வது அவசியமில்லை. இருப்பினும், நீங்கள் மேம்பட்ட சொற்பொருள் பகுப்பாய்வுகளை எழுதத் திட்டமிட்டால் இது பயனுள்ளதாக இருக்கும். [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) மற்றும் [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) அச்சுப்பொறிகள் குறியீடு எவ்வாறு மொழிபெயர்க்கப்படுகிறது என்பதைப் புரிந்துகொள்ள உங்களுக்கு உதவும்.

## பயன்பாட்டு நிரலாக்க இடைமுக அடிப்படைகள் {#api-basics}

Slither ஒரு பயன்பாட்டு நிரலாக்க இடைமுகத்தைக் கொண்டுள்ளது, இது ஒப்பந்தம் மற்றும் அதன் செயல்பாடுகளின் அடிப்படைப் பண்புகளை ஆராய உங்களை அனுமதிக்கிறது.

ஒரு குறியீட்டுத் தளத்தை ஏற்றுவதற்கு:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### ஒப்பந்தங்கள் மற்றும் செயல்பாடுகளை ஆராய்தல் {#exploring-contracts-and-functions}

ஒரு `Slither` பொருள் கொண்டுள்ளது:

- `contracts (list(Contract)`: ஒப்பந்தங்களின் பட்டியல்
- `contracts_derived (list(Contract)`: மற்றொரு ஒப்பந்தத்தால் மரபுரிமையாகப் பெறப்படாத ஒப்பந்தங்களின் பட்டியல் (ஒப்பந்தங்களின் துணைக்குழு)
- `get_contract_from_name (str)`: ஒரு ஒப்பந்தத்தை அதன் பெயரிலிருந்து திருப்பியளிக்கும்

ஒரு `Contract` பொருள் கொண்டுள்ளது:

- `name (str)`: ஒப்பந்தத்தின் பெயர்
- `functions (list(Function))`: செயல்பாடுகளின் பட்டியல்
- `modifiers (list(Modifier))`: மாற்றியமைப்பான்களின் பட்டியல்
- `all_functions_called (list(Function/Modifier))`: ஒப்பந்தத்தால் அடையக்கூடிய அனைத்து உள் செயல்பாடுகளின் பட்டியல்
- `inheritance (list(Contract))`: மரபுரிமையாகப் பெறப்பட்ட ஒப்பந்தங்களின் பட்டியல்
- `get_function_from_signature (str)`: ஒரு செயல்பாட்டை அதன் கையொப்பத்திலிருந்து திருப்பியளிக்கும்
- `get_modifier_from_signature (str)`: ஒரு மாற்றியமைப்பானை அதன் கையொப்பத்திலிருந்து திருப்பியளிக்கும்
- `get_state_variable_from_name (str)`: ஒரு நிலை மாறியை அதன் பெயரிலிருந்து திருப்பியளிக்கும்

ஒரு `Function` அல்லது ஒரு `Modifier` பொருள் கொண்டுள்ளது:

- `name (str)`: செயல்பாட்டின் பெயர்
- `contract (contract)`: செயல்பாடு அறிவிக்கப்பட்ட ஒப்பந்தம்
- `nodes (list(Node))`: செயல்பாடு/மாற்றியமைப்பானின் CFG-ஐ உருவாக்கும் முனைகளின் பட்டியல்
- `entry_point (Node)`: CFG-இன் நுழைவுப் புள்ளி
- `variables_read (list(Variable))`: படிக்கப்பட்ட மாறிகளின் பட்டியல்
- `variables_written (list(Variable))`: எழுதப்பட்ட மாறிகளின் பட்டியல்
- `state_variables_read (list(StateVariable))`: படிக்கப்பட்ட நிலை மாறிகளின் பட்டியல் (படிக்கப்பட்ட மாறிகளின் துணைக்குழு)
- `state_variables_written (list(StateVariable))`: எழுதப்பட்ட நிலை மாறிகளின் பட்டியல் (எழுதப்பட்ட மாறிகளின் துணைக்குழு)
