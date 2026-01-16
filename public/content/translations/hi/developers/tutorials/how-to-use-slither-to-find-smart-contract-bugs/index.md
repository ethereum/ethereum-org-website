---
title: स्मार्ट अनुबंध बग खोजने के लिए Slither का उपयोग कैसे करें
description: स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए स्लिथर का उपयोग कैसे करें
author: Trailofbits
lang: hi
tags: [ "सोलिडीटी", "स्मार्ट अनुबंध", "सुरक्षा", "परिक्षण" ]
skill: advanced
published: 2020-06-09
source: सुरक्षित अनुबंध बनाना
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither का उपयोग कैसे करें {#how-to-use-slither}

इस ट्यूटोरियल का उद्देश्य यह दिखाना है कि स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए स्लिथर का उपयोग कैसे करें।

- [इंस्टॉलेशन](#installation)
- [कमांड लाइन उपयोग](#command-line)
- [स्टैटिक विश्लेषण का परिचय](#static-analysis): स्टैटिक विश्लेषण का संक्षिप्त परिचय
- [API](#api-basics): Python API विवरण

## इंस्टॉलेशन {#installation}

Slither के लिए Python >= 3.6 की आवश्यकता है। इसे pip के माध्यम से या डॉकर का उपयोग करके इंस्टॉल किया जा सकता है।

pip के माध्यम से Slither:

```bash
pip3 install --user slither-analyzer
```

docker के माध्यम से Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_अंतिम कमांड आपकी वर्तमान डायरेक्टरी तक पहुंच वाले डॉकर में eth-security-toolbox चलाता है। आप अपने होस्ट से फ़ाइलें बदल सकते हैं, और डॉकर से फ़ाइलों पर टूल चला सकते हैं_

डॉकर के अंदर, चलाएँ:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### एक स्क्रिप्ट चलाना {#running-a-script}

python 3 के साथ एक python स्क्रिप्ट चलाने के लिए:

```bash
python3 script.py
```

### कमांड लाइन {#command-line}

**कमांड लाइन बनाम उपयोगकर्ता-परिभाषित स्क्रिप्ट।** Slither पूर्वनिर्धारित डिटेक्टरों के एक सेट के साथ आता है जो कई सामान्य बग ढूंढते हैं। कमांड लाइन से Slither को कॉल करने पर सभी डिटेक्टर चलेंगे, स्टैटिक विश्लेषण के विस्तृत ज्ञान की कोई आवश्यकता नहीं है:

```bash
slither project_paths
```

डिटेक्टर के अलावा, Slither में अपने [प्रिंटर](https://github.com/crytic/slither#printers) और [उपकरणों](https://github.com/crytic/slither#tools) के माध्यम से कोड समीक्षा की क्षमताएं हैं।

निजी डिटेक्टरों और GitHub एकीकरण तक पहुंच प्राप्त करने के लिए [crytic.io](https://github.com/crytic) का उपयोग करें।

## स्टेटिक विश्लेषण {#static-analysis}

Slither स्टैटिक विश्लेषण फ्रेमवर्क की क्षमताओं और डिज़ाइन का वर्णन ब्लॉग पोस्ट ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) और एक [अकादमिक पेपर](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) में किया गया है।

स्टैटिक विश्लेषण विभिन्न प्रकारों में मौजूद है। आप शायद यह महसूस करते हैं कि [clang](https://clang-analyzer.llvm.org/) और [gcc](https://lwn.net/Articles/806099/) जैसे कंपाइलर इन अनुसंधान तकनीकों पर निर्भर करते हैं, लेकिन यह ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) और [Frama-C](https://frama-c.com/) और [Polyspace](https://www.mathworks.com/products/polyspace.html) जैसे औपचारिक तरीकों पर आधारित उपकरणों) को भी रेखांकित करता है।

हम यहां स्टैटिक विश्लेषण तकनीकों और शोधकर्ताओं की विस्तृत समीक्षा नहीं करेंगे। इसके बजाय, हम इस बात पर ध्यान केंद्रित करेंगे कि Slither कैसे काम करता है, यह समझने के लिए क्या आवश्यक है ताकि आप बग खोजने और कोड को समझने के लिए इसका अधिक प्रभावी ढंग से उपयोग कर सकें।

- [कोड निरूपण](#code-representation)
- [कोड विश्लेषण](#analysis)
- [मध्यवर्ती निरूपण](#intermediate-representation)

### कोड निरूपण {#code-representation}

एक गतिशील विश्लेषण के विपरीत, जो एक एकल निष्पादन पथ के बारे में तर्क करता है, स्टैटिक विश्लेषण एक ही बार में सभी पथों के बारे में तर्क करता है। ऐसा करने के लिए, यह एक अलग कोड निरूपण पर निर्भर करता है। दो सबसे आम हैं सार सिंटैक्स ट्री (AST) और नियंत्रण प्रवाह ग्राफ (CFG)।

### सार सिंटैक्स ट्री (AST) {#abstract-syntax-trees-ast}

कंपाइलर द्वारा कोड पार्स करने पर हर बार AST का उपयोग किया जाता है। यह शायद सबसे बुनियादी संरचना है जिस पर स्टैटिक विश्लेषण किया जा सकता है।

संक्षेप में, एक AST एक संरचित ट्री है जहां, आमतौर पर, प्रत्येक लीफ में एक चर या एक स्थिरांक होता है और आंतरिक नोड ऑपरेंड या नियंत्रण प्रवाह संचालन होते हैं। निम्नलिखित कोड पर विचार करें:

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

Slither solc द्वारा निर्यात किए गए AST का उपयोग करता है।

निर्माण में सरल होने के बावजूद, AST एक नेस्टेड संरचना है। कभी-कभी, इसका विश्लेषण करना सबसे सीधा नहीं होता है। उदाहरण के लिए, एक्सप्रेशन `a + b <= a` द्वारा उपयोग किए गए ऑपरेशनों की पहचान करने के लिए, आपको पहले `<=` और फिर `+` का विश्लेषण करना होगा। एक सामान्य दृष्टिकोण तथाकथित विज़िटर पैटर्न का उपयोग करना है, जो ट्री के माध्यम से पुनरावर्ती रूप से नेविगेट करता है। Slither में [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) में एक सामान्य विज़िटर है।

निम्नलिखित कोड यह पता लगाने के लिए `ExpressionVisitor` का उपयोग करता है कि क्या एक्सप्रेशन में एक जोड़ है:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # एक्सप्रेशन वह एक्सप्रेशन है जिसका परीक्षण किया जाना है
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### कंट्रोल फ्लो ग्राफ (CFG) {#control-flow-graph-cfg}

दूसरा सबसे आम कोड निरूपण कंट्रोल फ्लो ग्राफ (CFG) है। जैसा कि इसके नाम से पता चलता है, यह एक ग्राफ-आधारित निरूपण है जो सभी निष्पादन पथों को उजागर करता है। प्रत्येक नोड में एक या अधिक निर्देश होते हैं। ग्राफ में किनारे नियंत्रण प्रवाह संचालन (यदि/तो/अन्यथा, लूप, आदि) का प्रतिनिधित्व करते हैं। हमारे पिछले उदाहरण का CFG है:

![CFG](./cfg.png)

CFG वह निरूपण है जिसके ऊपर अधिकांश विश्लेषण बनाए जाते हैं।

कई अन्य कोड निरूपण मौजूद हैं। आपके द्वारा किए जाने वाले विश्लेषण के अनुसार प्रत्येक निरूपण के फायदे और नुकसान हैं।

### विश्लेषण {#analysis}

स्लिथर के साथ आप जो सबसे सरल प्रकार के विश्लेषण कर सकते हैं, वे हैं वाक्यात्मक विश्लेषण।

### सिंटैक्स विश्लेषण {#syntax-analysis}

Slither एक पैटर्न मिलान-जैसे दृष्टिकोण का उपयोग करके विसंगतियों और खामियों को खोजने के लिए कोड के विभिन्न घटकों और उनके निरूपण के माध्यम से नेविगेट कर सकता है।

उदाहरण के लिए निम्नलिखित डिटेक्टर सिंटैक्स-संबंधित समस्याओं की तलाश करते हैं:

- [स्टेट वैरिएबल शैडोइंग](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): सभी स्टेट वैरिएबल्स पर पुनरावृति करता है और जांचता है कि क्या कोई एक वंशानुगत अनुबंध से एक वैरिएबल को शैडो करता है ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [गलत ERC20 इंटरफ़ेस](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): गलत ERC20 फ़ंक्शन सिगनेचर की तलाश करें ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### सिमेंटिक विश्लेषण {#semantic-analysis}

सिंटैक्स विश्लेषण के विपरीत, एक सिमेंटिक विश्लेषण गहराई में जाएगा और कोड के “अर्थ” का विश्लेषण करेगा। इस परिवार में कुछ व्यापक प्रकार के विश्लेषण शामिल हैं। वे अधिक शक्तिशाली और उपयोगी परिणाम देते हैं, लेकिन लिखने में भी अधिक जटिल होते हैं।

सबसे उन्नत भेद्यता का पता लगाने के लिए सिमेंटिक विश्लेषण का उपयोग किया जाता है।

#### डेटा निर्भरता विश्लेषण {#fixed-point-computation}

एक वैरिएबल `variable_a` को `variable_b` पर डेटा-निर्भर कहा जाता है यदि कोई ऐसा पथ है जिसके लिए `variable_a` का मान `variable_b` से प्रभावित होता है।

निम्नलिखित कोड में, `variable_a` `variable_b` पर निर्भर है:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither अपने मध्यवर्ती निरूपण (बाद के खंड में चर्चा की गई) के कारण अंतर्निहित [डेटा निर्भरता](https://github.com/crytic/slither/wiki/data-dependency) क्षमताओं के साथ आता है।

डेटा निर्भरता उपयोग का एक उदाहरण [खतरनाक सख्त समानता डिटेक्टर](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) में पाया जा सकता है। यहां Slither एक खतरनाक मान से सख्त समानता तुलना की तलाश करेगा ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), और यूज़र को सूचित करेगा कि उसे `==` के बजाय `>=` या `<=` का उपयोग करना चाहिए, ताकि एक हमलावर को अनुबंध को ट्रैप करने से रोका जा सके। अन्य बातों के अलावा, डिटेक्टर `balanceOf(address)` पर कॉल के रिटर्न मान को खतरनाक मानेगा ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), और इसके उपयोग को ट्रैक करने के लिए डेटा निर्भरता इंजन का उपयोग करेगा।

#### फिक्स्ड-पॉइंट गणना {#fixed-point-computation}

यदि आपका विश्लेषण CFG के माध्यम से नेविगेट करता है और किनारों का अनुसरण करता है, तो आपको पहले से देखे गए नोड देखने की संभावना है। उदाहरण के लिए, यदि एक लूप नीचे दिखाए अनुसार प्रस्तुत किया गया है:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

आपके विश्लेषण को यह जानना होगा कि कब रुकना है। यहां दो मुख्य रणनीतियां हैं: (1) प्रत्येक नोड पर एक सीमित संख्या में पुनरावृति करें, (2) एक तथाकथित _फिक्सपॉइंट_ की गणना करें। एक फिक्सपॉइंट का मूल रूप से मतलब है कि इस नोड का विश्लेषण करने से कोई सार्थक जानकारी नहीं मिलती है।

फिक्सपॉइंट उपयोग का एक उदाहरण रीएंट्रेंसी डिटेक्टरों में पाया जा सकता है: Slither नोड्स की खोज करता है, और बाहरी कॉल, स्टोरेज में लिखने और पढ़ने की तलाश करता है। एक बार जब यह एक फिक्सपॉइंट पर पहुंच जाता है ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), यह अन्वेषण को रोक देता है, और परिणामों का विश्लेषण करके यह देखता है कि क्या विभिन्न रीएंट्रेंसी पैटर्न ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) के माध्यम से एक रीएंट्रेंसी मौजूद है।

कुशल फिक्स्ड पॉइंट गणना का उपयोग करके विश्लेषण लिखने के लिए यह अच्छी तरह से समझना आवश्यक है कि विश्लेषण अपनी जानकारी कैसे प्रसारित करता है।

### मध्यवर्ती निरूपण {#intermediate-representation}

एक मध्यवर्ती निरूपण (IR) एक ऐसी भाषा है जो मूल भाषा की तुलना में स्टैटिक विश्लेषण के लिए अधिक अनुकूल होती है। Slither Solidity को अपने स्वयं के IR में अनुवादित करता है: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)।

यदि आप केवल बुनियादी जांच लिखना चाहते हैं तो SlithIR को समझना आवश्यक नहीं है। हालांकि, यदि आप उन्नत सिमेंटिक विश्लेषण लिखने की योजना बनाते हैं तो यह उपयोगी होगा। [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) और [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) प्रिंटर आपको यह समझने में मदद करेंगे कि कोड का अनुवाद कैसे किया जाता है।

## API की मूल बातें {#api-basics}

Slither में एक API है जो आपको अनुबंध और उसके कार्यों की बुनियादी विशेषताओं का पता लगाने देता है।

एक कोडबेस लोड करने के लिए:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### अनुबंधों और कार्यों की खोज {#exploring-contracts-and-functions}

एक `Slither` ऑब्जेक्ट में है:

- `contracts (list(Contract)`: अनुबंधों की सूची
- `contracts_derived (list(Contract)`: अनुबंधों की सूची जो किसी अन्य अनुबंध द्वारा विरासत में नहीं मिली हैं (अनुबंधों का सबसेट)
- `get_contract_from_name (str)`: उसके नाम से एक अनुबंध लौटाएं

एक `Contract` ऑब्जेक्ट में है:

- `name (str)`: अनुबंध का नाम
- `functions (list(Function))`: कार्यों की सूची
- `modifiers (list(Modifier))`: कार्यों की सूची
- `all_functions_called (list(Function/Modifier))`: अनुबंध द्वारा पहुंच योग्य सभी आंतरिक कार्यों की सूची
- `inheritance (list(Contract))`: विरासत में मिले अनुबंधों की सूची
- `get_function_from_signature (str)`: उसके सिगनेचर से एक फ़ंक्शन लौटाएं
- `get_modifier_from_signature (str)`: उसके सिगनेचर से एक संशोधक लौटाएं
- `get_state_variable_from_name (str)`: उसके नाम से एक StateVariable लौटाएं

एक `Function` या `Modifier` ऑब्जेक्ट में है:

- `name (str)`: फ़ंक्शन का नाम
- `contract (contract)`: वह अनुबंध जहां फ़ंक्शन घोषित किया गया है
- `nodes (list(Node))`: फ़ंक्शन/संशोधक के CFG बनाने वाले नोड्स की सूची
- `entry_point (Node)`: CFG का एंट्री पॉइंट
- `variables_read (list(Variable))`: पढ़े गए वैरिएबल्स की सूची
- `variables_written (list(Variable))`: लिखे गए वैरिएबल्स की सूची
- `state_variables_read (list(StateVariable))`: पढ़े गए स्टेट वैरिएबल्स की सूची (वैरिएबल्स\`read का सबसेट)
- `state_variables_written (list(StateVariable))`: लिखे गए स्टेट वैरिएबल्स की सूची (वैरिएबल्स\`written का सबसेट)
