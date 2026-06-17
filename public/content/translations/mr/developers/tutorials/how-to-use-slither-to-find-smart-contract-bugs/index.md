---
title: "स्मार्ट कॉन्ट्रॅक्टमधील बग्स शोधण्यासाठी स्लिदर कसे वापरावे"
description: "स्मार्ट कॉन्ट्रॅक्ट्समध्ये स्वयंचलितपणे बग्स शोधण्यासाठी स्लिदर कसे वापरावे"
author: "ट्रेलऑफबिट्स"
lang: mr
tags: ["Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स", "सुरक्षा", "चाचणी"]
skill: advanced
breadcrumb: "स्लिदर"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## स्लिदर कसे वापरावे {#how-to-use-slither}

या ट्यूटोरियलचा उद्देश स्मार्ट कॉन्ट्रॅक्ट्समध्ये स्वयंचलितपणे बग्स शोधण्यासाठी स्लिदर कसे वापरावे हे दर्शविणे आहे.

- [इन्स्टॉलेशन](#installation)
- [कमांड लाइनचा वापर](#command-line)
- [स्टॅटिक ॲनालिसिसची ओळख](#static-analysis): स्टॅटिक ॲनालिसिसची थोडक्यात ओळख
- [API](#api-basics): Python API चे वर्णन

## इन्स्टॉलेशन {#installation}

स्लिदरसाठी Python >= 3.6 आवश्यक आहे. हे pip द्वारे किंवा Docker वापरून इन्स्टॉल केले जाऊ शकते.

pip द्वारे स्लिदर:

```bash
pip3 install --user slither-analyzer
```

Docker द्वारे स्लिदर:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_शेवटची कमांड eth-security-toolbox ला अशा Docker मध्ये चालवते ज्याला तुमच्या सध्याच्या डिरेक्टरीचा ॲक्सेस असतो. तुम्ही तुमच्या होस्टवरून फाइल्स बदलू शकता आणि Docker मधील फाइल्सवर टूल्स चालवू शकता_

Docker च्या आत, चालवा:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### स्क्रिप्ट चालवणे {#running-a-script}

Python 3 सह Python स्क्रिप्ट चालवण्यासाठी:

```bash
python3 script.py
```

### कमांड लाइन {#command-line}

**कमांड लाइन विरुद्ध वापरकर्ता-परिभाषित स्क्रिप्ट्स.** स्लिदर पूर्वनिर्धारित डिटेक्टर्सच्या संचासह येते जे अनेक सामान्य बग्स शोधतात. कमांड लाइनवरून स्लिदरला कॉल केल्याने सर्व डिटेक्टर्स चालतील, यासाठी स्टॅटिक ॲनालिसिसच्या सविस्तर ज्ञानाची आवश्यकता नाही:

```bash
slither project_paths
```

डिटेक्टर्स व्यतिरिक्त, स्लिदरमध्ये त्याच्या [प्रिंटर्स](https://github.com/crytic/slither#printers) आणि [टूल्स](https://github.com/crytic/slither#tools) द्वारे कोड रिव्ह्यू करण्याची क्षमता आहे.

खाजगी डिटेक्टर्स आणि GitHub इंटिग्रेशनचा ॲक्सेस मिळवण्यासाठी [crytic.io](https://github.com/crytic) वापरा.

## स्टॅटिक ॲनालिसिस {#static-analysis}

स्लिदर स्टॅटिक ॲनालिसिस फ्रेमवर्कची क्षमता आणि डिझाइन ब्लॉग पोस्ट्स ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) आणि एका [शैक्षणिक पेपरमध्ये](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) वर्णन केले आहे.

स्टॅटिक ॲनालिसिस वेगवेगळ्या प्रकारांमध्ये अस्तित्वात आहे. तुम्हाला बहुधा हे समजले असेल की [clang](https://clang-analyzer.llvm.org/) आणि [gcc](https://lwn.net/Articles/806099/) सारखे कंपायलर्स या संशोधन तंत्रांवर अवलंबून असतात, परंतु ते ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) आणि [Frama-C](https://frama-c.com/) व [Polyspace](https://www.mathworks.com/products/polyspace.html) सारख्या औपचारिक पद्धतींवर आधारित टूल्सचा देखील पाया आहे.

आम्ही येथे स्टॅटिक ॲनालिसिस तंत्र आणि संशोधकांचे सविस्तर पुनरावलोकन करणार नाही. त्याऐवजी, स्लिदर कसे कार्य करते हे समजून घेण्यासाठी काय आवश्यक आहे यावर आम्ही लक्ष केंद्रित करू जेणेकरून तुम्ही बग्स शोधण्यासाठी आणि कोड समजून घेण्यासाठी त्याचा अधिक प्रभावीपणे वापर करू शकाल.

- [कोड रिप्रेझेंटेशन](#code-representation)
- [कोड ॲनालिसिस](#analysis)
- [इंटरमीडिएट रिप्रेझेंटेशन](#intermediate-representation)

### कोड रिप्रेझेंटेशन {#code-representation}

डायनॅमिक ॲनालिसिसच्या विपरीत, जे एकाच एक्झिक्यूशन पाथबद्दल विचार करते, स्टॅटिक ॲनालिसिस एकाच वेळी सर्व पाथ्सबद्दल विचार करते. असे करण्यासाठी, ते वेगळ्या कोड रिप्रेझेंटेशनवर अवलंबून असते. ॲब्स्ट्रॅक्ट सिंटॅक्स ट्री (AST) आणि कंट्रोल फ्लो ग्राफ (CFG) हे दोन सर्वात सामान्य प्रकार आहेत.

### ॲब्स्ट्रॅक्ट सिंटॅक्स ट्रीज (AST) {#abstract-syntax-trees-ast}

जेव्हाही कंपायलर कोड पार्स करतो तेव्हा AST वापरले जाते. ही बहुधा सर्वात मूलभूत रचना आहे ज्यावर स्टॅटिक ॲनालिसिस केले जाऊ शकते.

थोडक्यात सांगायचे तर, AST हे एक स्ट्रक्चर्ड ट्री आहे जिथे, सहसा, प्रत्येक लीफमध्ये व्हेरिएबल किंवा कॉन्स्टंट असते आणि अंतर्गत नोड्स ऑपरेंड्स किंवा कंट्रोल फ्लो ऑपरेशन्स असतात. खालील कोडचा विचार करा:

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

तयार करायला सोपे असले तरी, AST ही एक नेस्टेड रचना आहे. काही वेळा, याचे विश्लेषण करणे सर्वात सोपे नसते. उदाहरणार्थ, `a + b <= a` या एक्स्प्रेशनद्वारे वापरलेली ऑपरेशन्स ओळखण्यासाठी, तुम्हाला प्रथम `<=` आणि नंतर `+` चे विश्लेषण करावे लागेल. एक सामान्य दृष्टिकोन म्हणजे व्हिजिटर पॅटर्न वापरणे, जे ट्रीमध्ये रिकर्सिव्हली नेव्हिगेट करते. स्लिदरमध्ये [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) मध्ये एक जेनेरिक व्हिजिटर असतो.

एक्स्प्रेशनमध्ये बेरीज आहे की नाही हे शोधण्यासाठी खालील कोड `ExpressionVisitor` वापरतो:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression ही तपासली जाणारी अभिव्यक्ती आहे
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### कंट्रोल फ्लो ग्राफ (CFG) {#control-flow-graph-cfg}

दुसरे सर्वात सामान्य कोड रिप्रेझेंटेशन म्हणजे कंट्रोल फ्लो ग्राफ (CFG). त्याच्या नावाप्रमाणेच, हे एक ग्राफ-आधारित रिप्रेझेंटेशन आहे जे सर्व एक्झिक्यूशन पाथ्स उघड करते. प्रत्येक नोडमध्ये एक किंवा अनेक सूचना असतात. ग्राफमधील कडा (Edges) कंट्रोल फ्लो ऑपरेशन्स (if/then/else, loop, इ.) दर्शवतात. आपल्या मागील उदाहरणाचा CFG असा आहे:

![CFG](./cfg.png)

CFG हे असे रिप्रेझेंटेशन आहे ज्यावर बहुतेक ॲनालिसिस तयार केले जातात.

इतर अनेक कोड रिप्रेझेंटेशन्स अस्तित्वात आहेत. तुम्हाला जे ॲनालिसिस करायचे आहे त्यानुसार प्रत्येक रिप्रेझेंटेशनचे फायदे आणि तोटे आहेत.

### ॲनालिसिस {#analysis}

स्लिदरसह तुम्ही करू शकणारा सर्वात सोपा ॲनालिसिसचा प्रकार म्हणजे सिंटॅक्टिक ॲनालिसिस.

### सिंटॅक्स ॲनालिसिस {#syntax-analysis}

पॅटर्न मॅचिंगसारखा दृष्टिकोन वापरून विसंगती आणि त्रुटी शोधण्यासाठी स्लिदर कोडच्या विविध घटकांमधून आणि त्यांच्या रिप्रेझेंटेशनमधून नेव्हिगेट करू शकते.

उदाहरणार्थ खालील डिटेक्टर्स सिंटॅक्स-संबंधित समस्या शोधतात:

- [स्थिती व्हेरिएबल शॅडोइंग](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): सर्व स्थिती व्हेरिएबल्सवर इटरेट करते आणि इनहेरिट केलेल्या कॉन्ट्रॅक्टमधील एखाद्या व्हेरिएबलला शॅडो करते का ते तपासते ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [चुकीचा ERC-20 इंटरफेस](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): चुकीच्या ERC-20 फंक्शन स्वाक्षऱ्या शोधते ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### सिमेंटिक ॲनालिसिस {#semantic-analysis}

सिंटॅक्स ॲनालिसिसच्या विपरीत, सिमेंटिक ॲनालिसिस अधिक खोलवर जाईल आणि कोडच्या "अर्थाचे" विश्लेषण करेल. या कुटुंबात काही व्यापक प्रकारच्या ॲनालिसिसचा समावेश आहे. ते अधिक शक्तिशाली आणि उपयुक्त परिणामांकडे नेतात, परंतु ते लिहिण्यास अधिक गुंतागुंतीचे देखील असतात.

सर्वात प्रगत असुरक्षितता शोधण्यासाठी सिमेंटिक ॲनालिसिस वापरले जातात.

#### डेटा डिपेंडन्सी ॲनालिसिस {#fixed-point-computation}

जर असा एखादा पाथ असेल ज्यासाठी `variable_a` चे मूल्य `variable_b` द्वारे प्रभावित होत असेल, तर `variable_a` हे व्हेरिएबल `variable_b` वर डेटा-अवलंबून असल्याचे म्हटले जाते.

खालील कोडमध्ये, `variable_a` हे `variable_b` वर अवलंबून आहे:

```solidity
// ...
variable_a = variable_b + 1;
```

स्लिदरमध्ये अंगभूत [डेटा डिपेंडन्सी](https://github.com/crytic/slither/wiki/data-dependency) क्षमता आहेत, त्याच्या इंटरमीडिएट रिप्रेझेंटेशनमुळे (पुढील विभागात चर्चा केली आहे).

डेटा डिपेंडन्सी वापराचे उदाहरण [डेंजरस स्ट्रिक्ट इक्वॅलिटी डिटेक्टरमध्ये](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) आढळू शकते. येथे स्लिदर धोकादायक मूल्याशी स्ट्रिक्ट इक्वॅलिटीची तुलना शोधेल ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), आणि वापरकर्त्याला सूचित करेल की त्याने `==` ऐवजी `>=` किंवा `<=` वापरावे, जेणेकरून हल्लेखोराला कॉन्ट्रॅक्ट अडकवण्यापासून रोखता येईल. इतर गोष्टींबरोबरच, डिटेक्टर `balanceOf(address)` च्या कॉलचे रिटर्न व्हॅल्यू धोकादायक मानेल ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), आणि त्याचा वापर ट्रॅक करण्यासाठी डेटा डिपेंडन्सी इंजिन वापरेल.

#### फिक्स्ड-पॉइंट कॉम्प्युटेशन {#fixed-point-computation-2}

जर तुमचे ॲनालिसिस CFG मधून नेव्हिगेट करत असेल आणि कडांचे (edges) अनुसरण करत असेल, तर तुम्हाला आधीच भेट दिलेले नोड्स दिसण्याची शक्यता आहे. उदाहरणार्थ, जर खाली दर्शविल्याप्रमाणे लूप असेल:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

तुमच्या ॲनालिसिसला कधी थांबायचे हे माहित असणे आवश्यक आहे. येथे दोन मुख्य धोरणे आहेत: (1) प्रत्येक नोडवर मर्यादित वेळा इटरेट करणे, (2) तथाकथित _फिक्सपॉइंट_ (fixpoint) मोजणे. फिक्सपॉइंटचा मूळ अर्थ असा आहे की या नोडचे विश्लेषण केल्याने कोणतीही अर्थपूर्ण माहिती मिळत नाही.

वापरलेल्या फिक्सपॉइंटचे उदाहरण पुनर्प्रवेश (reentrancy) डिटेक्टर्समध्ये आढळू शकते: स्लिदर नोड्स एक्सप्लोर करते आणि एक्सटर्नल कॉल्स, स्टोरेजमध्ये लिहिणे आणि वाचणे शोधते. एकदा ते फिक्सपॉइंटवर पोहोचले ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), ते एक्सप्लोरेशन थांबवते आणि वेगवेगळ्या पुनर्प्रवेश पॅटर्नद्वारे ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) पुनर्प्रवेश उपस्थित आहे की नाही हे पाहण्यासाठी परिणामांचे विश्लेषण करते.

कार्यक्षम फिक्स्ड पॉइंट कॉम्प्युटेशन वापरून ॲनालिसिस लिहिण्यासाठी ॲनालिसिस आपली माहिती कशी प्रसारित करते याची चांगली समज असणे आवश्यक आहे.

### इंटरमीडिएट रिप्रेझेंटेशन {#intermediate-representation}

इंटरमीडिएट रिप्रेझेंटेशन (IR) ही एक अशी भाषा आहे जी मूळ भाषेपेक्षा स्टॅटिक ॲनालिसिससाठी अधिक अनुकूल असावी असा उद्देश आहे. स्लिदर Solidity ला स्वतःच्या IR मध्ये अनुवादित करते: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

जर तुम्हाला फक्त मूलभूत तपासण्या लिहायच्या असतील तर SlithIR समजून घेणे आवश्यक नाही. तथापि, जर तुम्ही प्रगत सिमेंटिक ॲनालिसिस लिहिण्याची योजना आखत असाल तर ते उपयुक्त ठरेल. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) आणि [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) प्रिंटर्स तुम्हाला कोड कसा अनुवादित केला जातो हे समजून घेण्यास मदत करतील.

## API च्या मूलभूत गोष्टी {#api-basics}

स्लिदरमध्ये एक API आहे जे तुम्हाला कॉन्ट्रॅक्ट आणि त्याच्या फंक्शन्सचे मूलभूत ॲट्रिब्यूट्स एक्सप्लोर करू देते.

कोडबेस लोड करण्यासाठी:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### कॉन्ट्रॅक्ट्स आणि फंक्शन्स एक्सप्लोर करणे {#exploring-contracts-and-functions}

`Slither` ऑब्जेक्टमध्ये हे असते:

- `contracts (list(Contract)`: कॉन्ट्रॅक्ट्सची यादी
- `contracts_derived (list(Contract)`: अशा कॉन्ट्रॅक्ट्सची यादी जे दुसऱ्या कॉन्ट्रॅक्टद्वारे इनहेरिट केलेले नाहीत (कॉन्ट्रॅक्ट्सचा उपसंच)
- `get_contract_from_name (str)`: त्याच्या नावावरून कॉन्ट्रॅक्ट परत करते

`Contract` ऑब्जेक्टमध्ये हे असते:

- `name (str)`: कॉन्ट्रॅक्टचे नाव
- `functions (list(Function))`: फंक्शन्सची यादी
- `modifiers (list(Modifier))`: फंक्शन्सची यादी
- `all_functions_called (list(Function/Modifier))`: कॉन्ट्रॅक्टद्वारे पोहोचता येण्याजोग्या सर्व इंटरनल फंक्शन्सची यादी
- `inheritance (list(Contract))`: इनहेरिट केलेल्या कॉन्ट्रॅक्ट्सची यादी
- `get_function_from_signature (str)`: त्याच्या स्वाक्षरीवरून फंक्शन परत करते
- `get_modifier_from_signature (str)`: त्याच्या स्वाक्षरीवरून मॉडिफायर परत करते
- `get_state_variable_from_name (str)`: त्याच्या नावावरून स्थिती व्हेरिएबल (StateVariable) परत करते

`Function` किंवा `Modifier` ऑब्जेक्टमध्ये हे असते:

- `name (str)`: फंक्शनचे नाव
- `contract (contract)`: ते कॉन्ट्रॅक्ट जिथे फंक्शन घोषित केले आहे
- `nodes (list(Node))`: फंक्शन/मॉडिफायरचा CFG तयार करणाऱ्या नोड्सची यादी
- `entry_point (Node)`: CFG चा एंट्री पॉइंट
- `variables_read (list(Variable))`: वाचलेल्या व्हेरिएबल्सची यादी
- `variables_written (list(Variable))`: लिहिलेल्या व्हेरिएबल्सची यादी
- `state_variables_read (list(StateVariable))`: वाचलेल्या स्थिती व्हेरिएबल्सची यादी (variables`read चा उपसंच)
- `state_variables_written (list(StateVariable))`: लिहिलेल्या स्थिती व्हेरिएबल्सची यादी (variables`written चा उपसंच)