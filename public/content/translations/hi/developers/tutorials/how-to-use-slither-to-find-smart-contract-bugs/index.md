---
title: स्मार्ट अनुबंध बग खोजने के लिए स्लिथर का उपयोग कैसे करें
description: स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए स्लिथर का उपयोग कैसे करें
author: Trailofbits
lang: hi
tags:
  - solidity
  - स्मार्ट अनुबंध
  - सुरक्षा
  - परीक्षण
skill: advanced
breadcrumb: स्लिथर
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## स्लिथर का उपयोग कैसे करें {#how-to-use-slither}

इस ट्यूटोरियल का उद्देश्य यह दिखाना है कि स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए स्लिथर का उपयोग कैसे करें।

- [इंस्टॉलेशन](#installation)
- [कमांड लाइन का उपयोग](#command-line)
- [स्टेटिक विश्लेषण का परिचय](#static-analysis): स्टेटिक विश्लेषण का संक्षिप्त परिचय
- [API](#api-basics): Python API विवरण

## इंस्टॉलेशन {#installation}

स्लिथर के लिए Python >= 3.6 की आवश्यकता होती है। इसे pip के माध्यम से या Docker का उपयोग करके इंस्टॉल किया जा सकता है।

pip के माध्यम से स्लिथर:

```bash
pip3 install --user slither-analyzer
```

Docker के माध्यम से स्लिथर:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_अंतिम कमांड एक Docker में eth-security-toolbox चलाता है जिसकी आपकी वर्तमान डायरेक्टरी तक पहुंच होती है। आप अपने होस्ट से फ़ाइलें बदल सकते हैं, और Docker से फ़ाइलों पर टूल चला सकते हैं_

Docker के अंदर, चलाएं:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### स्क्रिप्ट चलाना {#running-a-script}

Python 3 के साथ Python स्क्रिप्ट चलाने के लिए:

```bash
python3 script.py
```

### कमांड लाइन {#command-line}

**कमांड लाइन बनाम उपयोगकर्ता-परिभाषित स्क्रिप्ट।** स्लिथर पूर्वनिर्धारित डिटेक्टरों के एक सेट के साथ आता है जो कई सामान्य बग ढूंढते हैं। कमांड लाइन से स्लिथर को कॉल करने पर सभी डिटेक्टर चलेंगे, इसके लिए स्टेटिक विश्लेषण के विस्तृत ज्ञान की आवश्यकता नहीं है:

```bash
slither project_paths
```

डिटेक्टरों के अलावा, स्लिथर में इसके [प्रिंटर](https://github.com/crytic/slither#printers) और [टूल](https://github.com/crytic/slither#tools) के माध्यम से कोड समीक्षा क्षमताएं हैं।

निजी डिटेक्टरों और GitHub एकीकरण तक पहुंच प्राप्त करने के लिए [crytic.io](https://github.com/crytic) का उपयोग करें।

## स्टेटिक विश्लेषण {#static-analysis}

स्लिथर स्टेटिक विश्लेषण फ्रेमवर्क की क्षमताओं और डिज़ाइन का वर्णन ब्लॉग पोस्ट ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) और एक [अकादमिक पेपर](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) में किया गया है।

स्टेटिक विश्लेषण विभिन्न प्रकारों में मौजूद है। आप शायद महसूस करते होंगे कि [clang](https://clang-analyzer.llvm.org/) और [gcc](https://lwn.net/Articles/806099/) जैसे कंपाइलर इन शोध तकनीकों पर निर्भर करते हैं, लेकिन यह ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) और [Frama-C](https://frama-c.com/) तथा [Polyspace](https://www.mathworks.com/products/polyspace.html) जैसे औपचारिक तरीकों पर आधारित टूल का भी आधार है।

हम यहां स्टेटिक विश्लेषण तकनीकों और शोधकर्ताओं की विस्तृत समीक्षा नहीं करेंगे। इसके बजाय, हम इस बात पर ध्यान केंद्रित करेंगे कि स्लिथर कैसे काम करता है, इसे समझने के लिए क्या आवश्यक है ताकि आप बग खोजने और कोड को समझने के लिए इसका अधिक प्रभावी ढंग से उपयोग कर सकें।

- [कोड प्रतिनिधित्व](#code-representation)
- [कोड विश्लेषण](#analysis)
- [मध्यवर्ती प्रतिनिधित्व](#intermediate-representation)

### कोड प्रतिनिधित्व {#code-representation}

डायनेमिक विश्लेषण के विपरीत, जो एक ही निष्पादन पथ के बारे में तर्क करता है, स्टेटिक विश्लेषण एक ही बार में सभी पथों के बारे में तर्क करता है। ऐसा करने के लिए, यह एक अलग कोड प्रतिनिधित्व पर निर्भर करता है। दो सबसे आम एब्सट्रैक्ट सिंटैक्स ट्री (AST) और कंट्रोल फ्लो ग्राफ (CFG) हैं।

### एब्सट्रैक्ट सिंटैक्स ट्री (AST) {#abstract-syntax-trees-ast}

हर बार जब कंपाइलर कोड को पार्स करता है तो AST का उपयोग किया जाता है। यह शायद सबसे बुनियादी संरचना है जिस पर स्टेटिक विश्लेषण किया जा सकता है।

संक्षेप में, एक AST एक संरचित ट्री है जहां, आमतौर पर, प्रत्येक लीफ में एक चर (variable) या एक स्थिरांक (constant) होता है और आंतरिक नोड ऑपरेंड या कंट्रोल फ्लो ऑपरेशन होते हैं। निम्नलिखित कोड पर विचार करें:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

संबंधित AST इसमें दिखाया गया है:

![AST](./ast.png)

स्लिथर solc द्वारा निर्यात किए गए AST का उपयोग करता है।

बनाने में सरल होने के बावजूद, AST एक नेस्टेड संरचना है। कभी-कभी, इसका विश्लेषण करना सबसे सीधा नहीं होता है। उदाहरण के लिए, `a + b <= a` अभिव्यक्ति द्वारा उपयोग किए जाने वाले ऑपरेशनों की पहचान करने के लिए, आपको पहले `<=` और फिर `+` का विश्लेषण करना होगा। एक सामान्य दृष्टिकोण तथाकथित विज़िटर पैटर्न का उपयोग करना है, जो ट्री के माध्यम से पुनरावर्ती (recursively) रूप से नेविगेट करता है। स्लिथर में [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) में एक सामान्य विज़िटर होता है।

निम्नलिखित कोड यह पता लगाने के लिए `ExpressionVisitor` का उपयोग करता है कि क्या अभिव्यक्ति में कोई जोड़ (addition) शामिल है:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression परीक्षण किया जाने वाला व्यंजक है
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### कंट्रोल फ्लो ग्राफ (CFG) {#control-flow-graph-cfg}

दूसरा सबसे आम कोड प्रतिनिधित्व कंट्रोल फ्लो ग्राफ (CFG) है। जैसा कि इसके नाम से पता चलता है, यह एक ग्राफ-आधारित प्रतिनिधित्व है जो सभी निष्पादन पथों को उजागर करता है। प्रत्येक नोड में एक या कई निर्देश होते हैं। ग्राफ में किनारे (edges) कंट्रोल फ्लो ऑपरेशनों (if/then/else, loop, आदि) का प्रतिनिधित्व करते हैं। हमारे पिछले उदाहरण का CFG है:

![CFG](./cfg.png)

CFG वह प्रतिनिधित्व है जिसके ऊपर अधिकांश विश्लेषण बनाए जाते हैं।

कई अन्य कोड प्रतिनिधित्व मौजूद हैं। आप जो विश्लेषण करना चाहते हैं उसके अनुसार प्रत्येक प्रतिनिधित्व के फायदे और कमियां हैं।

### विश्लेषण {#analysis}

स्लिथर के साथ आप जो सबसे सरल प्रकार के विश्लेषण कर सकते हैं वे सिंटैक्टिक विश्लेषण हैं।

### सिंटैक्स विश्लेषण {#syntax-analysis}

स्लिथर पैटर्न मैचिंग-जैसे दृष्टिकोण का उपयोग करके विसंगतियों और खामियों को खोजने के लिए कोड के विभिन्न घटकों और उनके प्रतिनिधित्व के माध्यम से नेविगेट कर सकता है।

उदाहरण के लिए निम्नलिखित डिटेक्टर सिंटैक्स-संबंधित समस्याओं की तलाश करते हैं:

- [स्थिति चर शैडोइंग (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): सभी स्थिति चरों पर पुनरावृति करता है और जांचता है कि क्या कोई विरासत में मिले अनुबंध से किसी चर को शैडो करता है ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [गलत ERC-20 इंटरफ़ेस](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): गलत ERC-20 फ़ंक्शन हस्ताक्षरों की तलाश करें ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### सिमेंटिक विश्लेषण {#semantic-analysis}

सिंटैक्स विश्लेषण के विपरीत, एक सिमेंटिक विश्लेषण गहराई में जाएगा और कोड के "अर्थ" का विश्लेषण करेगा। इस परिवार में कुछ व्यापक प्रकार के विश्लेषण शामिल हैं। वे अधिक शक्तिशाली और उपयोगी परिणाम देते हैं, लेकिन उन्हें लिखना भी अधिक जटिल है।

सिमेंटिक विश्लेषण का उपयोग सबसे उन्नत भेद्यता (vulnerability) का पता लगाने के लिए किया जाता है।

#### डेटा निर्भरता विश्लेषण {#fixed-point-computation}

एक चर `variable_a` को `variable_b` पर डेटा-निर्भर कहा जाता है यदि कोई ऐसा पथ है जिसके लिए `variable_a` का मान `variable_b` से प्रभावित होता है।

निम्नलिखित कोड में, `variable_a`, `variable_b` पर निर्भर है:

```solidity
// ...
variable_a = variable_b + 1;
```

स्लिथर अंतर्निहित [डेटा निर्भरता](https://github.com/crytic/slither/wiki/data-dependency) क्षमताओं के साथ आता है, जो इसके मध्यवर्ती प्रतिनिधित्व (बाद के अनुभाग में चर्चा की गई) के कारण संभव है।

डेटा निर्भरता उपयोग का एक उदाहरण [खतरनाक सख्त समानता डिटेक्टर (dangerous strict equality detector)](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) में पाया जा सकता है। यहां स्लिथर एक खतरनाक मान ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) के साथ सख्त समानता तुलना की तलाश करेगा, और उपयोगकर्ता को सूचित करेगा कि उसे `==` के बजाय `>=` या `<=` का उपयोग करना चाहिए, ताकि किसी हमलावर को अनुबंध को फंसाने से रोका जा सके। अन्य बातों के अलावा, डिटेक्टर `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) पर कॉल के रिटर्न मान को खतरनाक मानेगा, और इसके उपयोग को ट्रैक करने के लिए डेटा निर्भरता इंजन का उपयोग करेगा।

#### फिक्स्ड-पॉइंट गणना {#fixed-point-computation-2}

यदि आपका विश्लेषण CFG के माध्यम से नेविगेट करता है और किनारों का अनुसरण करता है, तो आपको पहले से देखे गए नोड दिखाई देने की संभावना है। उदाहरण के लिए, यदि कोई लूप नीचे दिखाए अनुसार प्रस्तुत किया गया है:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

आपके विश्लेषण को यह जानना होगा कि कब रुकना है। यहां दो मुख्य रणनीतियां हैं: (1) प्रत्येक नोड पर एक सीमित संख्या में पुनरावृति करें, (2) एक तथाकथित _फिक्सपॉइंट (fixpoint)_ की गणना करें। फिक्सपॉइंट का मूल रूप से मतलब है कि इस नोड का विश्लेषण करने से कोई सार्थक जानकारी नहीं मिलती है।

उपयोग किए गए फिक्सपॉइंट का एक उदाहरण पुन:प्रवेश (reentrancy) डिटेक्टरों में पाया जा सकता है: स्लिथर नोड्स का अन्वेषण करता है, और बाहरी कॉल, स्टोरेज में लिखने और पढ़ने की तलाश करता है। एक बार जब यह एक फिक्सपॉइंट ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)) पर पहुंच जाता है, तो यह अन्वेषण को रोक देता है, और विभिन्न पुन:प्रवेश पैटर्न ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) के माध्यम से यह देखने के लिए परिणामों का विश्लेषण करता है कि क्या कोई पुन:प्रवेश मौजूद है।

कुशल फिक्स्ड पॉइंट गणना का उपयोग करके विश्लेषण लिखने के लिए इस बात की अच्छी समझ की आवश्यकता होती है कि विश्लेषण अपनी जानकारी का प्रसार कैसे करता है।

### मध्यवर्ती प्रतिनिधित्व {#intermediate-representation}

एक मध्यवर्ती प्रतिनिधित्व (IR) एक ऐसी भाषा है जो मूल भाषा की तुलना में स्टेटिक विश्लेषण के लिए अधिक अनुकूल है। स्लिथर Solidity को अपने स्वयं के IR में अनुवादित करता है: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)।

यदि आप केवल बुनियादी जांच लिखना चाहते हैं तो SlithIR को समझना आवश्यक नहीं है। हालांकि, यदि आप उन्नत सिमेंटिक विश्लेषण लिखने की योजना बना रहे हैं तो यह काम आएगा। [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) और [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) प्रिंटर आपको यह समझने में मदद करेंगे कि कोड का अनुवाद कैसे किया जाता है।

## API की मूल बातें {#api-basics}

स्लिथर में एक API है जो आपको अनुबंध और उसके कार्यों की बुनियादी विशेषताओं का पता लगाने देता है।

कोडबेस लोड करने के लिए:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### अनुबंधों और कार्यों की खोज {#exploring-contracts-and-functions}

एक `Slither` ऑब्जेक्ट में होता है:

- `contracts (list(Contract)`: अनुबंधों की सूची
- `contracts_derived (list(Contract)`: उन अनुबंधों की सूची जो किसी अन्य अनुबंध द्वारा विरासत में नहीं मिले हैं (अनुबंधों का उपसमुच्चय)
- `get_contract_from_name (str)`: इसके नाम से एक अनुबंध लौटाएं

एक `Contract` ऑब्जेक्ट में होता है:

- `name (str)`: अनुबंध का नाम
- `functions (list(Function))`: कार्यों की सूची
- `modifiers (list(Modifier))`: कार्यों की सूची
- `all_functions_called (list(Function/Modifier))`: अनुबंध द्वारा पहुंचने योग्य सभी आंतरिक कार्यों की सूची
- `inheritance (list(Contract))`: विरासत में मिले अनुबंधों की सूची
- `get_function_from_signature (str)`: इसके हस्ताक्षर से एक फ़ंक्शन लौटाएं
- `get_modifier_from_signature (str)`: इसके हस्ताक्षर से एक संशोधक (Modifier) लौटाएं
- `get_state_variable_from_name (str)`: इसके नाम से एक स्थिति चर (StateVariable) लौटाएं

एक `Function` या एक `Modifier` ऑब्जेक्ट में होता है:

- `name (str)`: फ़ंक्शन का नाम
- `contract (contract)`: वह अनुबंध जहां फ़ंक्शन घोषित किया गया है
- `nodes (list(Node))`: फ़ंक्शन/संशोधक के CFG की रचना करने वाले नोड्स की सूची
- `entry_point (Node)`: CFG का प्रवेश बिंदु
- `variables_read (list(Variable))`: पढ़े गए चरों की सूची
- `variables_written (list(Variable))`: लिखे गए चरों की सूची
- `state_variables_read (list(StateVariable))`: पढ़े गए स्थिति चरों की सूची (पढ़े गए चरों का उपसमुच्चय)
- `state_variables_written (list(StateVariable))`: लिखे गए स्थिति चरों की सूची (लिखे गए चरों का उपसमुच्चय)