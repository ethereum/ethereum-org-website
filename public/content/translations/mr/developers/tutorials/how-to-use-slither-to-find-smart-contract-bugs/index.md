---
title: "स्मार्ट कॉन्ट्रॅक्ट बग शोधण्यासाठी स्लिदर कसे वापरावे"
description: "स्मार्ट कॉन्ट्रॅक्ट्समध्ये आपोआप बग शोधण्यासाठी स्लिदर कसे वापरावे"
author: Trailofbits
lang: mr
tags: [ "सॉलिडिटी", "स्मार्ट कॉन्ट्रॅक्ट", "सुरक्षा", "चाचणी" ]
skill: advanced
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## स्लिदर कसे वापरावे {#how-to-use-slither}

या ट्यूटोरियलचा उद्देश स्मार्ट कॉन्ट्रॅक्ट्समध्ये आपोआप बग शोधण्यासाठी स्लिदर कसे वापरावे हे दर्शविणे आहे.

- [इन्स्टॉलेशन](#installation)
- [कमांड लाईन वापर](#command-line)
- [स्टॅटिक विश्लेषणाची ओळख](#static-analysis): स्टॅटिक विश्लेषणाची संक्षिप्त ओळख
- [API](#api-basics): Python API वर्णन

## इन्स्टॉलेशन {#installation}

स्लिदरसाठी Python >= 3.6 आवश्यक आहे. हे pip द्वारे किंवा docker वापरून इंस्टॉल केले जाऊ शकते.

pip द्वारे स्लिदर:

```bash
pip3 install --user slither-analyzer
```

docker द्वारे स्लिदर:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_शेवटचा कमांड तुमच्या सध्याच्या डिरेक्टरीमध्ये ऍक्सेस असलेल्या docker मध्ये eth-security-toolbox चालवतो. तुम्ही तुमच्या होस्टमधून फाइल्स बदलू शकता, आणि docker मधून फाइल्सवर टूल्स चालवू शकता_

docker मध्ये, चालवा:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### स्क्रिप्ट चालवणे {#running-a-script}

python 3 सह python स्क्रिप्ट चालवण्यासाठी:

```bash
python3 script.py
```

### कमांड लाईन {#command-line}

**कमांड लाइन विरुद्ध युजर-डिफाइंड स्क्रिप्ट्स.** स्लिदर पूर्वनिर्धारित डिटेक्टरच्या सेटसह येते जे अनेक सामान्य बग शोधतात. कमांड लाइनवरून स्लिदरला कॉल केल्यास सर्व डिटेक्टर चालतील, स्टॅटिक विश्लेषणाच्या तपशीलवार ज्ञानाची आवश्यकता नाही:

```bash
slither project_paths
```

डिटेक्टर्स व्यतिरिक्त, स्लिदरमध्ये त्याच्या [प्रिंटर्स](https://github.com/crytic/slither#printers) आणि [टूल्स](https://github.com/crytic/slither#tools) द्वारे कोड पुनरावलोकन क्षमता आहेत.

प्रायव्हेट डिटेक्टर आणि GitHub इंटिग्रेशनमध्ये प्रवेश मिळविण्यासाठी [crytic.io](https://github.com/crytic) वापरा.

## स्थिर विश्लेषण {#static-analysis}

स्लिदर स्टॅटिक अ‍ॅनालिसिस फ्रेमवर्कची क्षमता आणि डिझाइन ब्लॉग पोस्ट्समध्ये ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) आणि एका [अकॅडमिक पेपरमध्ये](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) वर्णन केले आहे.

स्टॅटिक विश्लेषण विविध प्रकारांमध्ये अस्तित्वात आहे. तुम्हाला कदाचित याची जाणीव असेल की [clang](https://clang-analyzer.llvm.org/) आणि [gcc](https://lwn.net/Articles/806099/) सारखे कंपाइलर या संशोधन तंत्रांवर अवलंबून असतात, परंतु ते [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) आणि [Frama-C](https://frama-c.com/) आणि [Polyspace](https://www.mathworks.com/products/polyspace.html) सारख्या औपचारिक पद्धतींवर आधारित टूल्सला देखील आधार देते.

आम्ही येथे स्टॅटिक विश्लेषण तंत्र आणि संशोधकाचे संपूर्ण पुनरावलोकन करणार नाही. त्याऐवजी, स्लिदर कसे कार्य करते हे समजून घेण्यासाठी काय आवश्यक आहे यावर आम्ही लक्ष केंद्रित करू जेणेकरून आपण बग शोधण्यासाठी आणि कोड समजून घेण्यासाठी अधिक प्रभावीपणे त्याचा वापर करू शकाल.

- [कोड रिप्रेझेंटेशन](#code-representation)
- [कोड विश्लेषण](#analysis)
- [इंटरमीडिएट रिप्रेझेंटेशन](#intermediate-representation)

### कोड रिप्रेझेंटेशन {#code-representation}

डायनॅमिक विश्लेषणाच्या विपरीत, जे एकाच एक्झिक्युशन पाथबद्दल तर्क करते, स्टॅटिक विश्लेषण एकाच वेळी सर्व पाथबद्दल तर्क करते. असे करण्यासाठी, ते एका वेगळ्या कोड रिप्रेझेंटेशनवर अवलंबून असते. यातील दोन सर्वात सामान्य म्हणजे अ‍ॅबस्ट्रॅक्ट सिंटॅक्स ट्री (AST) आणि कंट्रोल फ्लो ग्राफ (CFG).

### अ‍ॅबस्ट्रॅक्ट सिंटॅक्स ट्री (AST) {#abstract-syntax-trees-ast}

जेव्हाही कंपाइलर कोड पार्स करतो तेव्हा AST वापरले जातात. ही कदाचित सर्वात मूलभूत रचना आहे ज्यावर स्टॅटिक विश्लेषण केले जाऊ शकते.

थोडक्यात सांगायचे झाल्यास, AST एक संरचित ट्री आहे जिथे, सामान्यतः, प्रत्येक लीफमध्ये एक व्हेरिएबल किंवा एक कॉन्स्टंट असते आणि इंटरनल नोड्स ऑपरेंड किंवा कंट्रोल फ्लो ऑपरेशन्स असतात. पुढील कोड विचारात घ्या:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

संबंधित AST यात दर्शविले आहे:

![AST](./ast.png)

स्लिदर solc द्वारे एक्सपोर्ट केलेले AST वापरते.

तयार करण्यास सोपे असले तरी, AST एक नेस्टेड रचना आहे. काहीवेळा, विश्लेषण करणे हे सर्वात सोपे नसते. उदाहरणार्थ, `a + b <= a` या एक्सप्रेशनद्वारे वापरल्या जाणार्‍या ऑपरेशन्स ओळखण्यासाठी, तुम्हाला प्रथम `<=` आणि नंतर `+` चे विश्लेषण करणे आवश्यक आहे. एक सामान्य दृष्टिकोन म्हणजे तथाकथित व्हिजिटर पॅटर्न वापरणे, जे रिकर्सिव्हली ट्रीमधून नेव्हिगेट करते. स्लिदरमध्ये [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) मध्ये एक जेनेरिक व्हिजिटर आहे.

पुढील कोड एक्सप्रेशनमध्ये अ‍ॅडिशन आहे की नाही हे शोधण्यासाठी `ExpressionVisitor` वापरतो:

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

### कंट्रोल फ्लो ग्राफ (CFG) {#control-flow-graph-cfg}

दुसरे सर्वात सामान्य कोड रिप्रेझेंटेशन म्हणजे कंट्रोल फ्लो ग्राफ (CFG). त्याच्या नावाप्रमाणेच, हे ग्राफ-आधारित रिप्रेझेंटेशन आहे जे सर्व एक्झिक्युशन पाथ उघड करते. प्रत्येक नोडमध्ये एक किंवा अनेक सूचना असतात. ग्राफमधील एजेस कंट्रोल फ्लो ऑपरेशन्स (if/then/else, लूप, इत्यादी) दर्शवतात. आमच्या मागील उदाहरणाचा CFG आहे:

![CFG](./cfg.png)

CFG हे असे रिप्रेझेंटेशन आहे ज्यावर बहुतेक विश्लेषणे तयार केली जातात.

इतर अनेक कोड रिप्रेझेंटेशन्स अस्तित्वात आहेत. तुम्ही करू इच्छित असलेल्या विश्लेषणानुसार प्रत्येक रिप्रेझेंटेशनचे फायदे आणि तोटे आहेत.

### विश्लेषण {#analysis}

स्लिदरसह तुम्ही करू शकता असे सर्वात सोपे प्रकारचे विश्लेषण म्हणजे सिंटॅक्टिक विश्लेषण.

### सिंटॅक्स विश्लेषण {#syntax-analysis}

स्लिदर पॅटर्न मॅचिंग सारखा दृष्टीकोन वापरून विसंगती आणि दोष शोधण्यासाठी कोडच्या विविध घटकांमधून आणि त्यांच्या रिप्रेझेंटेशनमधून नेव्हिगेट करू शकते.

उदाहरणार्थ, खालील डिटेक्टर सिंटॅक्स-संबंधित समस्या शोधतात:

- [स्टेट व्हेरिएबल शॅडोइंग](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): सर्व स्टेट व्हेरिएबल्सवर पुनरावृत्ती करते आणि तपासते की इनहेरिटेड कॉन्ट्रॅक्टमधील व्हेरिएबलला कोणताही शॅडो करतो का ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [अयोग्य ERC20 इंटरफेस](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): अयोग्य ERC20 फंक्शन सिग्ननेचर शोधा ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### सिमॅंटिक विश्लेषण {#semantic-analysis}

सिंटॅक्स विश्लेषणाच्या विपरीत, सिमॅंटिक विश्लेषण अधिक खोलवर जाईल आणि कोडचा “अर्थ” विश्लेषण करेल. या फॅमिलीमध्ये काही व्यापक प्रकारचे विश्लेषण समाविष्ट आहेत. ते अधिक शक्तिशाली आणि उपयुक्त परिणामांकडे नेतात, परंतु लिहिण्यासही अधिक क्लिष्ट आहेत.

सर्वात प्रगत व्हल्नरेबिलिटी डिटेक्शनसाठी सिमॅंटिक विश्लेषण वापरले जाते.

#### डेटा डिपेंडन्सी विश्लेषण {#fixed-point-computation}

एखादे व्हेरिएबल `variable_a` हे `variable_b` वर डेटा-डिपेंडंट आहे असे म्हटले जाते, जर असा एखादा मार्ग असेल ज्यासाठी `variable_a` चे मूल्य `variable_b` द्वारे प्रभावित होते.

पुढील कोडमध्ये, `variable_a` हे `variable_b` वर अवलंबून आहे:

```solidity
// ...
variable_a = variable_b + 1;
```

स्लिदर अंगभूत [डेटा डिपेंडन्सी](https://github.com/crytic/slither/wiki/data-dependency) क्षमतेसह येते, त्याच्या इंटरमीडिएट रिप्रेझेंटेशनमुळे (नंतरच्या विभागात चर्चा केली आहे).

डेटा डिपेंडन्सी वापराचे उदाहरण [डेंजरस स्ट्रिक्ट इक्वलिटी डिटेक्टर](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) मध्ये आढळू शकते. येथे स्लिदर एका धोकादायक मूल्याशी स्ट्रिक्ट इक्वलिटी कंपॅरिझन शोधेल ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), आणि वापरकर्त्याला सूचित करेल की त्याने `>=` किंवा `<=` ऐवजी `==` वापरावे, जेणेकरून अटॅकरला कॉन्ट्रॅक्टमध्ये अडकवण्यापासून रोखता येईल. इतर गोष्टींबरोबरच, डिटेक्टर `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) ला केलेल्या कॉलचे रिटर्न व्हॅल्यू धोकादायक मानेल आणि त्याचा वापर ट्रॅक करण्यासाठी डेटा डिपेंडन्सी इंजिन वापरेल.

#### फिक्स्ड-पॉइंट संगणन {#fixed-point-computation}

जर तुमचे विश्लेषण CFG मधून नेव्हिगेट करत असेल आणि एजेसचे अनुसरण करत असेल, तर तुम्हाला आधीच भेट दिलेले नोड्स दिसण्याची शक्यता आहे. उदाहरणार्थ, जर एखादे लूप खाली दर्शविल्याप्रमाणे सादर केले असेल तर:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

तुमच्या विश्लेषणाला केव्हा थांबायचे हे माहित असणे आवश्यक आहे. येथे दोन मुख्य धोरणे आहेत: (1) प्रत्येक नोडवर मर्यादित वेळा पुनरावृत्ती करणे, (2) तथाकथित _फिक्सपॉइंट_ मोजणे. फिक्सपॉइंटचा मुळात अर्थ असा आहे की या नोडचे विश्लेषण केल्याने कोणतीही अर्थपूर्ण माहिती मिळत नाही.

फिक्सपॉइंट वापराचे उदाहरण रीएन्ट्रन्सी डिटेक्टरमध्ये आढळू शकते: स्लिदर नोड्स एक्सप्लोर करते, आणि एक्सटर्नल कॉल्स, स्टोरेजमध्ये लिहिणे आणि वाचणे शोधते. एकदा ते फिक्सपॉइंटवर पोहोचले की ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), ते एक्सप्लोरेशन थांबवते, आणि रीएन्ट्रन्सी आहे की नाही हे पाहण्यासाठी परिणामांचे विश्लेषण करते, वेगवेगळ्या रीएन्ट्रन्सी पॅटर्नद्वारे ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

कार्यक्षम फिक्स्ड पॉइंट संगणन वापरून विश्लेषण लिहिण्यासाठी विश्लेषण त्याची माहिती कशी प्रसारित करते याची चांगली समज आवश्यक आहे.

### इंटरमीडिएट रिप्रेझेंटेशन {#intermediate-representation}

इंटरमीडिएट रिप्रेझेंटेशन (IR) ही मूळ भाषेपेक्षा स्टॅटिक विश्लेषणासाठी अधिक सोयीची अशी भाषा आहे. स्लिदर Solidity चे स्वतःच्या IR मध्ये भाषांतर करते: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

जर तुम्हाला फक्त मूलभूत तपासण्या लिहायच्या असतील तर SlithIR समजून घेणे आवश्यक नाही. तथापि, जर तुम्ही प्रगत सिमॅंटिक विश्लेषण लिहिण्याची योजना आखत असाल तर ते उपयोगी पडेल. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) आणि [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) प्रिंटर तुम्हाला कोडचे भाषांतर कसे केले जाते हे समजण्यास मदत करतील.

## API बेसिक्स {#api-basics}

स्लिदरकडे एक API आहे जे तुम्हाला कॉन्ट्रॅक्ट आणि त्याच्या फंक्शन्सचे मूलभूत गुणधर्म एक्सप्लोर करू देते.

कोडबेस लोड करण्यासाठी:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### कॉन्ट्रॅक्ट्स आणि फंक्शन्स एक्सप्लोर करणे {#exploring-contracts-and-functions}

`Slither` ऑब्जेक्टमध्ये आहे:

- `contracts (list(Contract)`: कॉन्ट्रॅक्ट्सची सूची
- `contracts_derived (list(Contract)`: दुसऱ्या कॉन्ट्रॅक्टद्वारे वारसा न मिळालेल्या कॉन्ट्रॅक्ट्सची सूची (कॉन्ट्रॅक्ट्सचा उपसंच)
- `get_contract_from_name (str)`: त्याच्या नावावरून एक कॉन्ट्रॅक्ट परत करा

`Contract` ऑब्जेक्टमध्ये आहे:

- `name (str)`: कॉन्ट्रॅक्टचे नाव
- `functions (list(Function))`: फंक्शन्सची सूची
- `modifiers (list(Modifier))`: फंक्शन्सची सूची
- `all_functions_called (list(Function/Modifier))`: कॉन्ट्रॅक्टद्वारे पोहोचता येणाऱ्या सर्व अंतर्गत फंक्शन्सची सूची
- `inheritance (list(Contract))`: इनहेरिटेड कॉन्ट्रॅक्ट्सची सूची
- `get_function_from_signature (str)`: त्याच्या सिग्ननेचरवरून एक फंक्शन परत करा
- `get_modifier_from_signature (str)`: त्याच्या सिग्ननेचरवरून एक मॉडिफायर परत करा
- `get_state_variable_from_name (str)`: त्याच्या नावावरून एक स्टेटव्हेरिएबल परत करा

`Function` किंवा `Modifier` ऑब्जेक्टमध्ये आहे:

- `name (str)`: फंक्शनचे नाव
- `contract (contract)`: कॉन्ट्रॅक्ट जिथे फंक्शन घोषित केले आहे
- `nodes (list(Node))`: फंक्शन/मॉडिफायरच्या CFG ची रचना करणाऱ्या नोड्सची सूची
- `entry_point (Node)`: CFG चा एंट्री पॉइंट
- `variables_read (list(Variable))`: वाचलेल्या व्हेरिएबल्सची सूची
- `variables_written (list(Variable))`: लिहिलेल्या व्हेरिएबल्सची सूची
- `state_variables_read (list(StateVariable))`: वाचलेल्या स्टेट व्हेरिएबल्सची सूची (व्हेरिएबल्स`read चा उपसंच)
- `state_variables_written (list(StateVariable))`: लिहिलेल्या स्टेट व्हेरिएबल्सची सूची (व्हेरिएबल्स`written चा उपसंच)
