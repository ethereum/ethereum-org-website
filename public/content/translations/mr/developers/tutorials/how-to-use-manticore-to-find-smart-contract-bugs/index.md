---
title: स्मार्ट कॉन्ट्रॅक्ट्समधील बग्स शोधण्यासाठी मॅन्टिकोर कसे वापरावे
description: स्मार्ट कॉन्ट्रॅक्ट्समधील बग्स स्वयंचलितपणे शोधण्यासाठी मॅन्टिकोर कसे वापरावे
author: ट्रेलऑफबिट्स
lang: mr
tags:
  ["Solidity", "स्मार्ट कॉन्ट्रॅक्ट्स", "सुरक्षा", "चाचणी", "औपचारिक पडताळणी"]
skill: advanced
breadcrumb: मॅन्टिकोर
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

या ट्युटोरियलचा उद्देश स्मार्ट कॉन्ट्रॅक्ट्समधील बग्स स्वयंचलितपणे शोधण्यासाठी मॅन्टिकोर कसे वापरावे हे दर्शविणे आहे.

## इन्स्टॉलेशन {#installation}

मॅन्टिकोरसाठी >= Python 3.6 आवश्यक आहे. हे pip द्वारे किंवा Docker वापरून इन्स्टॉल केले जाऊ शकते.

### Docker द्वारे मॅन्टिकोर {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_शेवटची कमांड eth-security-toolbox ला अशा Docker मध्ये चालवते ज्याला तुमच्या वर्तमान डिरेक्टरीचा अ‍ॅक्सेस असतो. तुम्ही तुमच्या होस्टवरून फाइल्स बदलू शकता आणि Docker मधील फाइल्सवर टूल्स चालवू शकता._

Docker च्या आत, चालवा:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip द्वारे मॅन्टिकोर {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 ची शिफारस केली जाते.

### स्क्रिप्ट चालवणे {#running-a-script}

Python 3 सह Python स्क्रिप्ट चालवण्यासाठी:

```bash
python3 script.py
```

## डायनॅमिक सिम्बॉलिक एक्झिक्यूशनची ओळख {#introduction-to-dynamic-symbolic-execution}

### थोडक्यात डायनॅमिक सिम्बॉलिक एक्झिक्यूशन {#dynamic-symbolic-execution-in-a-nutshell}

डायनॅमिक सिम्बॉलिक एक्झिक्यूशन (DSE) हे एक प्रोग्राम विश्लेषण तंत्र आहे जे उच्च दर्जाच्या सिमेंटिक जागरूकतेसह स्थिती स्पेस एक्सप्लोर करते. हे तंत्र "प्रोग्राम पाथ्स" च्या शोधावर आधारित आहे, जे `path predicates` नावाच्या गणितीय सूत्रांच्या रूपात दर्शविले जातात. संकल्पनात्मकदृष्ट्या, हे तंत्र पाथ प्रेडिकेट्सवर दोन टप्प्यांत कार्य करते:

1. ते प्रोग्रामच्या इनपुटवरील मर्यादा (constraints) वापरून तयार केले जातात.
2. त्यांचा वापर प्रोग्राम इनपुट्स तयार करण्यासाठी केला जातो ज्यामुळे संबंधित पाथ्स कार्यान्वित होतील.

हा दृष्टिकोन कोणतेही फॉल्स पॉझिटिव्ह (false positives) निर्माण करत नाही, कारण सर्व ओळखल्या गेलेल्या प्रोग्राम स्थिती प्रत्यक्ष अंमलबजावणीदरम्यान ट्रिगर केल्या जाऊ शकतात. उदाहरणार्थ, जर विश्लेषणात इंटिजर ओव्हरफ्लो आढळला, तर तो पुन्हा तयार करता येण्याजोगा (reproducible) असल्याची खात्री असते.

### पाथ प्रेडिकेटचे उदाहरण {#path-predicate-example}

DSE कसे कार्य करते हे समजून घेण्यासाठी, खालील उदाहरणाचा विचार करा:

```solidity
function f(uint a){

  if (a == 65) {
      // बग उपस्थित आहे
  }

}
```

`f()` मध्ये दोन पाथ्स असल्यामुळे, DSE दोन भिन्न पाथ प्रेडिकेट्स तयार करेल:

- पाथ 1: `a == 65`
- पाथ 2: `Not (a == 65)`

प्रत्येक पाथ प्रेडिकेट हे एक गणितीय सूत्र असते जे [SMT सॉल्व्हर](https://wikipedia.org/wiki/Satisfiability_modulo_theories) ला दिले जाऊ शकते, जे समीकरण सोडवण्याचा प्रयत्न करेल. `Path 1` साठी, सॉल्व्हर म्हणेल की पाथ `a = 65` सह एक्सप्लोर केला जाऊ शकतो. `Path 2` साठी, सॉल्व्हर `a` ला 65 व्यतिरिक्त कोणतीही किंमत देऊ शकतो, उदाहरणार्थ `a = 0`.

### गुणधर्मांची पडताळणी {#verifying-properties}

मॅन्टिकोर प्रत्येक पाथच्या सर्व अंमलबजावणीवर पूर्ण नियंत्रण ठेवण्याची परवानगी देते. परिणामी, हे तुम्हाला जवळजवळ कोणत्याही गोष्टीवर अनियंत्रित मर्यादा (arbitrary constraints) जोडण्याची परवानगी देते. हे नियंत्रण कॉन्ट्रॅक्टवर गुणधर्म (properties) तयार करण्यास अनुमती देते.

खालील उदाहरणाचा विचार करा:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // ओव्हरफ्लो संरक्षण नाही
  return c;
}
```

येथे फंक्शनमध्ये एक्सप्लोर करण्यासाठी फक्त एकच पाथ आहे:

- पाथ 1: `c = a + b`

मॅन्टिकोर वापरून, तुम्ही ओव्हरफ्लो तपासू शकता आणि पाथ प्रेडिकेटमध्ये मर्यादा जोडू शकता:

- `c = a + b AND (c < a OR c < b)`

जर `a` आणि `b` चे असे मूल्य शोधणे शक्य असेल ज्यासाठी वरील पाथ प्रेडिकेट शक्य (feasible) आहे, तर याचा अर्थ तुम्हाला ओव्हरफ्लो सापडला आहे. उदाहरणार्थ सॉल्व्हर `a = 10 , b = MAXUINT256` इनपुट तयार करू शकतो.

जर तुम्ही निश्चित (fixed) आवृत्तीचा विचार केला:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ओव्हरफ्लो तपासणीसह संबंधित सूत्र असेल:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

हे सूत्र सोडवले जाऊ शकत नाही; दुसऱ्या शब्दांत हा एक **पुरावा** आहे की `safe_add` मध्ये, `c` नेहमी वाढेल.

त्यामुळे DSE हे एक शक्तिशाली साधन आहे, जे तुमच्या कोडवरील अनियंत्रित मर्यादांची पडताळणी करू शकते.

## मॅन्टिकोर अंतर्गत चालवणे {#running-under-manticore}

मॅन्टिकोर API सह स्मार्ट कॉन्ट्रॅक्ट कसे एक्सप्लोर करायचे ते आपण पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### स्टँडअलोन एक्सप्लोरेशन चालवणे {#run-a-standalone-exploration}

तुम्ही खालील कमांडद्वारे थेट स्मार्ट कॉन्ट्रॅक्टवर मॅन्टिकोर चालवू शकता (`project` ही Solidity फाइल किंवा प्रोजेक्ट डिरेक्टरी असू शकते):

```bash
$ manticore project
```

तुम्हाला यासारख्या टेस्टकेसचे आउटपुट मिळेल (क्रम बदलू शकतो):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

अतिरिक्त माहितीशिवाय, मॅन्टिकोर कॉन्ट्रॅक्टवर नवीन पाथ्स एक्सप्लोर करत नाही तोपर्यंत नवीन सिम्बॉलिक व्यवहारांसह कॉन्ट्रॅक्ट एक्सप्लोर करेल. मॅन्टिकोर अयशस्वी व्यवहारानंतर (उदा: पूर्ववत करणे (revert) नंतर) नवीन व्यवहार चालवत नाही.

मॅन्टिकोर `mcore_*` डिरेक्टरीमध्ये माहिती आउटपुट करेल. इतर गोष्टींबरोबरच, तुम्हाला या डिरेक्टरीमध्ये हे आढळेल:

- `global.summary`: कव्हरेज आणि कंपायलर चेतावणी
- `test_XXXXX.summary`: कव्हरेज, शेवटची सूचना, प्रति टेस्टकेस खाते शिल्लक
- `test_XXXXX.tx`: प्रति टेस्टकेस व्यवहारांची तपशीलवार यादी

येथे मॅन्टिकोरला 7 टेस्ट केसेस सापडल्या आहेत, ज्या याच्याशी संबंधित आहेत (फाइल नावाचा क्रम बदलू शकतो):

|                      |   व्यवहार 0   |   व्यवहार 1   | व्यवहार 2     | निकाल |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | कॉन्ट्रॅक्ट निर्मिती |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | कॉन्ट्रॅक्ट निर्मिती | फॉलबॅक फंक्शन |                   | REVERT |
| **test_00000002.tx** | कॉन्ट्रॅक्ट निर्मिती |                   |                   | RETURN |
| **test_00000003.tx** | कॉन्ट्रॅक्ट निर्मिती |       f(65)       |                   | REVERT |
| **test_00000004.tx** | कॉन्ट्रॅक्ट निर्मिती |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | कॉन्ट्रॅक्ट निर्मिती |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | कॉन्ट्रॅक्ट निर्मिती |      f(!=65)      | फॉलबॅक फंक्शन | REVERT |

_एक्सप्लोरेशन सारांश f(!=65) हे दर्शविते की f ला 65 व्यतिरिक्त कोणत्याही मूल्याने कॉल केले आहे._

जसे तुम्ही पाहू शकता, मॅन्टिकोर प्रत्येक यशस्वी किंवा पूर्ववत केलेल्या (reverted) व्यवहारासाठी एक अद्वितीय टेस्ट केस तयार करते.

जर तुम्हाला जलद कोड एक्सप्लोरेशन हवे असेल तर `--quick-mode` फ्लॅग वापरा (हे बग डिटेक्टर्स, गॅस गणना, ... अक्षम करते)

### API द्वारे स्मार्ट कॉन्ट्रॅक्ट हाताळणे {#manipulate-a-smart-contract-through-the-api}

हा विभाग मॅन्टिकोर Python API द्वारे स्मार्ट कॉन्ट्रॅक्ट कसे हाताळायचे याचे तपशील वर्णन करतो. तुम्ही Python एक्स्टेंशन `*.py` सह नवीन फाइल तयार करू शकता आणि या फाइलमध्ये API कमांड्स (ज्यांच्या मूलभूत गोष्टी खाली वर्णन केल्या जातील) जोडून आवश्यक कोड लिहू शकता आणि नंतर `$ python3 *.py` कमांडसह चालवू शकता. तसेच तुम्ही खालील कमांड्स थेट Python कन्सोलमध्ये कार्यान्वित करू शकता, कन्सोल चालवण्यासाठी `$ python3` कमांड वापरा.

### खाती तयार करणे {#creating-accounts}

तुम्ही पहिली गोष्ट म्हणजे खालील कमांड्ससह नवीन ब्लॉकचेन सुरू करणे:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

[m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) वापरून नॉन-कॉन्ट्रॅक्ट खाते तयार केले जाते:

```python
user_account = m.create_account(balance=1000)
```

[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) वापरून Solidity कॉन्ट्रॅक्ट डिप्लॉय केले जाऊ शकते:

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### सारांश {#summary}

- तुम्ही [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) आणि [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) सह वापरकर्ता आणि कॉन्ट्रॅक्ट खाती तयार करू शकता.

### व्यवहार कार्यान्वित करणे {#executing-transactions}

मॅन्टिकोर दोन प्रकारच्या व्यवहारांना समर्थन देते:

- रॉ व्यवहार: सर्व फंक्शन्स एक्सप्लोर केली जातात
- नामित व्यवहार: फक्त एकच फंक्शन एक्सप्लोर केले जाते

#### रॉ व्यवहार {#raw-transaction}

[m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) वापरून रॉ व्यवहार कार्यान्वित केला जातो:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

व्यवहाराचा कॉलर, पत्ता, डेटा किंवा मूल्य एकतर कॉंक्रिट किंवा सिम्बॉलिक असू शकते:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) सिम्बॉलिक मूल्य तयार करते.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) सिम्बॉलिक बाइट अ‍ॅरे तयार करते.

उदाहरणार्थ:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

जर डेटा सिम्बॉलिक असेल, तर मॅन्टिकोर व्यवहार अंमलबजावणीदरम्यान कॉन्ट्रॅक्टची सर्व फंक्शन्स एक्सप्लोर करेल. फंक्शनची निवड कशी कार्य करते हे समजून घेण्यासाठी [हँड्स ऑन द इथरनॉट CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) लेखामधील फॉलबॅक फंक्शनचे स्पष्टीकरण पाहणे उपयुक्त ठरेल.

#### नामित व्यवहार {#named-transaction}

फंक्शन्स त्यांच्या नावाद्वारे कार्यान्वित केली जाऊ शकतात.
user_account वरून आणि 0 इथरसह, सिम्बॉलिक मूल्यासह `f(uint var)` कार्यान्वित करण्यासाठी, हे वापरा:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

जर व्यवहाराचे `value` निर्दिष्ट केले नसेल, तर ते डीफॉल्टनुसार 0 असते.

#### सारांश {#summary-1}

- व्यवहाराचे आर्ग्युमेंट्स कॉंक्रिट किंवा सिम्बॉलिक असू शकतात
- रॉ व्यवहार सर्व फंक्शन्स एक्सप्लोर करेल
- फंक्शनला त्यांच्या नावाने कॉल केले जाऊ शकते

### वर्कस्पेस {#workspace}

`m.workspace` ही तयार केलेल्या सर्व फाइल्ससाठी आउटपुट डिरेक्टरी म्हणून वापरली जाणारी डिरेक्टरी आहे:

```python
print("Results are in {}".format(m.workspace))
```

### एक्सप्लोरेशन समाप्त करणे {#terminate-the-exploration}

एक्सप्लोरेशन थांबवण्यासाठी [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) वापरा. एकदा ही पद्धत कॉल केली की कोणतेही पुढील व्यवहार पाठवले जाऊ नयेत आणि मॅन्टिकोर एक्सप्लोर केलेल्या प्रत्येक पाथसाठी टेस्ट केसेस तयार करते.

### सारांश: मॅन्टिकोर अंतर्गत चालवणे {#summary-running-under-manticore}

मागील सर्व टप्पे एकत्र केल्यास, आपल्याला हे मिळते:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # अन्वेषण थांबवा
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये सापडेल

## थ्रोइंग पाथ्स मिळवणे {#getting-throwing-paths}

आता आपण `f()` मध्ये अपवाद (exception) निर्माण करणाऱ्या पाथ्ससाठी विशिष्ट इनपुट्स तयार करू. लक्ष्य अद्याप खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### स्थिती माहिती वापरणे {#using-state-information}

कार्यान्वित केलेल्या प्रत्येक पाथची स्वतःची ब्लॉकचेन स्थिती असते. स्थिती एकतर तयार (ready) असते किंवा ती नष्ट (killed) होते, याचा अर्थ ती THROW किंवा REVERT सूचनेपर्यंत पोहोचते:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): तयार असलेल्या स्थितींची यादी (त्यांनी REVERT/INVALID कार्यान्वित केले नाही)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): नष्ट झालेल्या स्थितींची यादी
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): सर्व स्थिती

```python
for state in m.all_states:
    # स्थितीसह काहीतरी करा
```

तुम्ही स्थिती माहिती अ‍ॅक्सेस करू शकता. उदाहरणार्थ:

- `state.platform.get_balance(account.address)`: खात्याची शिल्लक
- `state.platform.transactions`: व्यवहारांची यादी
- `state.platform.transactions[-1].return_data`: शेवटच्या व्यवहाराद्वारे परत केलेला डेटा

शेवटच्या व्यवहाराद्वारे परत केलेला डेटा एक अ‍ॅरे असतो, जो ABI.deserialize सह मूल्यामध्ये रूपांतरित केला जाऊ शकतो, उदाहरणार्थ:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### टेस्टकेस कशी तयार करावी {#how-to-generate-testcase}

टेस्टकेस तयार करण्यासाठी [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) वापरा:

```python
m.generate_testcase(state, 'BugFound')
```

### सारांश {#summary-2}

- तुम्ही m.all_states सह स्थितीवर पुनरावृत्ती (iterate) करू शकता
- `state.platform.get_balance(account.address)` खात्याची शिल्लक परत करते
- `state.platform.transactions` व्यवहारांची यादी परत करते
- `transaction.return_data` हा परत केलेला डेटा आहे
- `m.generate_testcase(state, name)` स्थितीसाठी इनपुट्स तयार करते

### सारांश: थ्रोइंग पाथ मिळवणे {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## अंमलबजावणी पूर्ववत करणे किंवा INVALID ने संपते का ते तपासा
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये सापडेल

_लक्षात घ्या की आपण खूप सोपी स्क्रिप्ट तयार करू शकलो असतो, कारण terminated_state द्वारे परत केलेल्या सर्व स्थितींच्या निकालात REVERT किंवा INVALID असते: हे उदाहरण केवळ API कसे हाताळायचे हे दर्शविण्यासाठी होते._

## मर्यादा जोडणे {#adding-constraints}

आपण एक्सप्लोरेशन कसे मर्यादित करायचे ते पाहू. आपण असे गृहीत धरू की `f()` च्या दस्तऐवजीकरणात असे नमूद केले आहे की फंक्शनला कधीही `a == 65` सह कॉल केले जात नाही, त्यामुळे `a == 65` सह असलेला कोणताही बग हा खरा बग नाही. लक्ष्य अद्याप खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### ऑपरेटर्स {#operators}

[ऑपरेटर्स](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) मॉड्यूल मर्यादा हाताळणे सुलभ करते, इतर गोष्टींबरोबरच ते हे प्रदान करते:

- Operators.AND,
- Operators.OR,
- Operators.UGT (अनसाइन्ड ग्रेटर दॅन),
- Operators.UGE (अनसाइन्ड ग्रेटर दॅन ऑर इक्वल टू),
- Operators.ULT (अनसाइन्ड लोअर दॅन),
- Operators.ULE (अनसाइन्ड लोअर दॅन ऑर इक्वल टू).

मॉड्यूल इम्पोर्ट करण्यासाठी खालील वापरा:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` चा वापर अ‍ॅरेला मूल्याशी जोडण्यासाठी (concatenate) केला जातो. उदाहरणार्थ, व्यवहाराचा return_data दुसऱ्या मूल्याविरुद्ध तपासण्यासाठी मूल्यामध्ये बदलणे आवश्यक आहे:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### मर्यादा {#state-constraint}

तुम्ही जागतिक स्तरावर (globally) किंवा विशिष्ट स्थितीसाठी मर्यादा वापरू शकता.

#### जागतिक मर्यादा {#state-constraint-2}

जागतिक मर्यादा जोडण्यासाठी `m.constrain(constraint)` वापरा.
उदाहरणार्थ, तुम्ही सिम्बॉलिक पत्त्यावरून कॉन्ट्रॅक्ट कॉल करू शकता आणि या पत्त्याला विशिष्ट मूल्यांपुरते मर्यादित करू शकता:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### स्थिती मर्यादा {#state-constraint-3}

विशिष्ट स्थितीला मर्यादा जोडण्यासाठी [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) वापरा.
याचा वापर एक्सप्लोरेशननंतर स्थितीवर काही गुणधर्म तपासण्यासाठी मर्यादित करण्यासाठी केला जाऊ शकतो.

### मर्यादा तपासणे {#checking-constraint}

मर्यादा अद्याप शक्य (feasible) आहे की नाही हे जाणून घेण्यासाठी `solver.check(state.constraints)` वापरा.
उदाहरणार्थ, खालील symbolic_value ला 65 पेक्षा वेगळे राहण्यासाठी मर्यादित करेल आणि स्थिती अद्याप शक्य आहे की नाही ते तपासेल:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # स्थिती व्यवहार्य आहे
```

### सारांश: मर्यादा जोडणे {#summary-adding-constraints}

मागील कोडमध्ये मर्यादा जोडल्यास, आपल्याला हे मिळते:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## अंमलबजावणी पूर्ववत करणे किंवा INVALID ने संपते का ते तपासा
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # आम्ही a == 65 असलेल्या मार्गाचा विचार करत नाही
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये सापडेल