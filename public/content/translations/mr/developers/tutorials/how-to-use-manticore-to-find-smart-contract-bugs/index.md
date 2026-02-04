---
title: स्मार्ट कॉन्ट्रॅक्ट्समधील बग शोधण्यासाठी Manticore चा वापर कसा करायचा
description: स्मार्ट कॉन्ट्रॅक्ट्समधील बग आपोआप शोधण्यासाठी Manticore चा वापर कसा करायचा
author: Trailofbits
lang: mr
tags:
  [
    "सॉलिडिटी",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "सुरक्षा",
    "चाचणी",
    "औपचारिक पडताळणी"
  ]
skill: advanced
published: 2020-01-13
source: सुरक्षित contracts तयार करणे
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

स्मार्ट कॉन्ट्रॅक्ट्समधील बग आपोआप शोधण्यासाठी Manticore चा वापर कसा करायचा हे दाखवणे या ट्युटोरियलचे उद्दिष्ट आहे.

## इन्स्टॉलेशन {#installation}

Manticore साठी >= python 3.6 आवश्यक आहे. हे pip द्वारे किंवा docker वापरून इंस्टॉल केले जाऊ शकते.

### docker द्वारे Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_शेवटचा कमांड तुमच्या सध्याच्या डिरेक्टरीमध्ये ऍक्सेस असलेल्या docker मध्ये eth-security-toolbox चालवतो. तुम्ही तुमच्या होस्टमधून फाइल्स बदलू शकता, आणि docker मधून फाइल्सवर टूल्स चालवू शकता_

docker मध्ये, चालवा:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip द्वारे Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 ची शिफारस केली जाते.

### स्क्रिप्ट चालवणे {#running-a-script}

python 3 सह python स्क्रिप्ट चालवण्यासाठी:

```bash
python3 script.py
```

## डायनॅमिक सिम्बॉलिक एक्झिक्युशनची ओळख {#introduction-to-dynamic-symbolic-execution}

### थोडक्यात डायनॅमिक सिम्बॉलिक एक्झिक्युशन {#dynamic-symbolic-execution-in-a-nutshell}

डायनॅमिक सिम्बॉलिक एक्झिक्युशन (DSE) हे एक प्रोग्राम विश्लेषण तंत्र आहे जे उच्च स्तरीय सिमेंटिक जागरुकतेसह स्टेट स्पेस एक्सप्लोर करते. हे तंत्र "प्रोग्राम पाथ्स" च्या शोधावर आधारित आहे, जे `path predicates` नावाच्या गणितीय सूत्रांद्वारे दर्शविले जातात. संकल्पनात्मकदृष्ट्या, हे तंत्र दोन टप्प्यांमध्ये पाथ प्रेडिकेट्सवर कार्य करते:

1. ते प्रोग्रामच्या इनपुटवरील मर्यादा वापरून तयार केले जातात.
2. त्यांचा वापर प्रोग्राम इनपुट तयार करण्यासाठी केला जातो ज्यामुळे संबंधित पाथ्स कार्यान्वित होतील.

या दृष्टिकोनामुळे कोणतेही फॉल्स पॉझिटिव्ह तयार होत नाहीत कारण सर्व ओळखलेले प्रोग्राम स्टेट्स ठोस अंमलबजावणी दरम्यान ट्रिगर केले जाऊ शकतात. उदाहरणार्थ, जर विश्लेषणात एखादा इंटीजर ओव्हरफ्लो आढळला, तर तो पुनरुत्पादित होण्याची हमी आहे.

### पाथ प्रेडिकेट उदाहरण {#path-predicate-example}

DSE कसे कार्य करते याची कल्पना येण्यासाठी, खालील उदाहरण विचारात घ्या:

```solidity
function f(uint a){

  if (a == 65) {
      // एक बग आहे
  }

}
```

`f()` मध्ये दोन पाथ असल्याने, DSE दोन भिन्न पाथ प्रेडिकेट्स तयार करेल:

- पाथ 1: `a == 65`
- पाथ 2: `Not (a == 65)`

प्रत्येक पाथ प्रेडिकेट हे एक गणितीय सूत्र आहे जे [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) नावाच्या सॉल्व्हरला दिले जाऊ शकते, जो समीकरण सोडवण्याचा प्रयत्न करेल. `पाथ 1` साठी, सॉल्व्हर सांगेल की पाथ `a = 65` सह एक्सप्लोर केला जाऊ शकतो. `पाथ 2` साठी, सॉल्व्हर `a` ला 65 व्यतिरिक्त कोणतेही मूल्य देऊ शकतो, उदाहरणार्थ `a = 0`.

### गुणधर्मांची पडताळणी करणे {#verifying-properties}

Manticore प्रत्येक पाथच्या सर्व एक्झिक्युशनवर पूर्ण नियंत्रण ठेवण्यास परवानगी देतो. परिणामी, हे तुम्हाला जवळजवळ कोणत्याही गोष्टीवर अनियंत्रित मर्यादा घालण्याची परवानगी देते. हे नियंत्रण कॉन्ट्रॅक्टवर गुणधर्म तयार करण्यास अनुमती देते.

खालील उदाहरण विचारात घ्या:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // ओव्हरफ्लो संरक्षण नाही
  return c;
}
```

येथे फंक्शनमध्ये एक्सप्लोर करण्यासाठी फक्त एकच पाथ आहे:

- पाथ 1: `c = a + b`

Manticore वापरून, तुम्ही ओव्हरफ्लो तपासू शकता, आणि पाथ प्रेडिकेटमध्ये मर्यादा घालू शकता:

- `c = a + b AND (c < a OR c < b)`

जर `a` आणि `b` साठी असे मूल्यमापन शोधणे शक्य असेल ज्यासाठी वरील पाथ प्रेडिकेट व्यवहार्य आहे, तर याचा अर्थ तुम्हाला ओव्हरफ्लो आढळला आहे. उदाहरणार्थ सॉल्व्हर `a = 10 , b = MAXUINT256` हे इनपुट तयार करू शकतो.

तुम्ही एक निश्चित आवृत्ती विचारात घेतल्यास:

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

हे सूत्र सोडवले जाऊ शकत नाही; दुसऱ्या शब्दांत, हा एक **पुरावा** आहे की `safe_add` मध्ये, `c` नेहमी वाढेल.

त्यामुळे DSE हे एक शक्तिशाली साधन आहे, जे तुमच्या कोडवर अनियंत्रित मर्यादांची पडताळणी करू शकते.

## Manticore अंतर्गत चालवणे {#running-under-manticore}

Manticore API सह स्मार्ट कॉन्ट्रॅक्ट कसे एक्सप्लोर करायचे ते आपण पाहू. लक्ष्य खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

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

### स्वतंत्र एक्सप्लोरेशन चालवा {#run-a-standalone-exploration}

तुम्ही खालील कमांडद्वारे थेट स्मार्ट कॉन्ट्रॅक्टवर Manticore चालवू शकता (`project` एक Solidity फाइल, किंवा प्रोजेक्ट डिरेक्टरी असू शकते):

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

अतिरिक्त माहितीशिवाय, Manticore नवीन सिम्बॉलिक
ट्रान्झॅक्शनसह कॉन्ट्रॅक्ट एक्सप्लोर करेल जोपर्यंत तो कॉन्ट्रॅक्टवर नवीन पाथ्स एक्सप्लोर करत नाही. Manticore अयशस्वी ट्रान्झॅक्शननंतर (उदा: रिव्हर्टनंतर) नवीन ट्रान्झॅक्शन चालवत नाही.

Manticore `mcore_*` डिरेक्टरीमध्ये माहिती आउटपुट करेल. इतर गोष्टींबरोबरच, तुम्हाला या डिरेक्टरीमध्ये आढळेल:

- `global.summary`: कव्हरेज आणि कंपाइलर चेतावणी
- `test_XXXXX.summary`: कव्हरेज, शेवटची सूचना, प्रति टेस्ट केस अकाउंट बॅलन्स
- `test_XXXXX.tx`: प्रति टेस्ट केस ट्रान्झॅक्शनची तपशीलवार यादी

येथे Manticore ला 7 टेस्ट केसेस आढळल्या, ज्या खालीलप्रमाणे आहेत (फाईल नावाचा क्रम बदलू शकतो):

|                                                           |    ट्रान्झॅक्शन 0    |       ट्रान्झॅक्शन 1       | ट्रान्झॅक्शन 2             | परिणाम |
| :-------------------------------------------------------: | :------------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | कॉन्ट्रॅक्ट निर्मिती | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | कॉन्ट्रॅक्ट निर्मिती |        फॉलबॅक फंक्शन       |                            | REVERT |
| **test_00000002.tx** | कॉन्ट्रॅक्ट निर्मिती |                            |                            | RETURN |
| **test_00000003.tx** | कॉन्ट्रॅक्ट निर्मिती |  f(65)  |                            | REVERT |
| **test_00000004.tx** | कॉन्ट्रॅक्ट निर्मिती | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | कॉन्ट्रॅक्ट निर्मिती | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | कॉन्ट्रॅक्ट निर्मिती | f(!=65) | फॉलबॅक फंक्शन              | REVERT |

_एक्सप्लोरेशन सारांश f(!=65) हे दर्शवते की f ला 65 पेक्षा भिन्न कोणत्याही मूल्याने कॉल केले आहे._

तुम्ही पाहू शकता, Manticore प्रत्येक यशस्वी किंवा रिव्हर्ट केलेल्या ट्रान्झॅक्शनसाठी एक युनिक टेस्ट केस तयार करतो.

जर तुम्हाला जलद कोड एक्सप्लोरेशन हवे असेल तर `--quick-mode` फ्लॅग वापरा (तो बग डिटेक्टर, गॅस गणना, ... अक्षम करतो)

### API द्वारे स्मार्ट कॉन्ट्रॅक्टमध्ये फेरफार करणे {#manipulate-a-smart-contract-through-the-api}

हा विभाग Manticore Python API द्वारे स्मार्ट कॉन्ट्रॅक्टमध्ये कसे फेरफार करायचे याचे तपशील वर्णन करतो. तुम्ही `*.py` या python एक्सटेंशनसह नवीन फाइल तयार करू शकता आणि या फाइलमध्ये API कमांड्स (ज्यांचे मूलभूत वर्णन खाली केले जाईल) जोडून आवश्यक कोड लिहू शकता आणि नंतर `$ python3 *.py` या कमांडने चालवू शकता. तसेच तुम्ही खालील कमांड थेट python कंसोलमध्ये कार्यान्वित करू शकता, कंसोल चालवण्यासाठी `$ python3` कमांड वापरा.

### अकाउंट्स तयार करणे {#creating-accounts}

पहिली गोष्ट जी तुम्ही केली पाहिजे ती म्हणजे खालील कमांडसह नवीन ब्लॉकचेन सुरू करणे:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

एक नॉन-कॉन्ट्रॅक्ट अकाउंट [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) वापरून तयार केले जाते:

```python
user_account = m.create_account(balance=1000)
```

एक Solidity कॉन्ट्रॅक्ट [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) वापरून तैनात केले जाऊ शकते:

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
# कॉन्ट्रॅक्ट सुरू करा
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### सारांश {#summary}

- तुम्ही [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) आणि [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) सह युझर आणि कॉन्ट्रॅक्ट अकाउंट्स तयार करू शकता.

### ट्रान्झॅक्शन कार्यान्वित करणे {#executing-transactions}

Manticore दोन प्रकारच्या ट्रान्झॅक्शनना समर्थन देतो:

- रॉ ट्रान्झॅक्शन: सर्व फंक्शन्स एक्सप्लोर केली जातात
- नेम्ड ट्रान्झॅक्शन: फक्त एकच फंक्शन एक्सप्लोर केले जाते

#### रॉ ट्रान्झॅक्शन {#raw-transaction}

एक रॉ ट्रान्झॅक्शन [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) वापरून कार्यान्वित केले जाते:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

कॉलर, ॲड्रेस, डेटा, किंवा ट्रान्झॅक्शनचे मूल्य ठोस किंवा सिम्बॉलिक असू शकते:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) एक सिम्बॉलिक मूल्य तयार करते.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) एक सिम्बॉलिक बाईट ॲरे तयार करते.

उदाहरणार्थ:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

जर डेटा सिम्बॉलिक असेल, तर Manticore ट्रान्झॅक्शन एक्झिक्युशन दरम्यान कॉन्ट्रॅक्टची सर्व फंक्शन्स एक्सप्लोर करेल. फंक्शन सिलेक्शन कसे कार्य करते हे समजून घेण्यासाठी [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) लेखातील फॉलबॅक फंक्शनचे स्पष्टीकरण पाहणे उपयुक्त ठरेल.

#### नेम्ड ट्रान्झॅक्शन {#named-transaction}

फंक्शन्स त्यांच्या नावाद्वारे कार्यान्वित केले जाऊ शकतात.
`f(uint var)` ला सिम्बॉलिक मूल्याने, user_account मधून, आणि 0 ईथरसह कार्यान्वित करण्यासाठी, वापरा:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

जर ट्रान्झॅक्शनचे `value` निर्दिष्ट केले नसेल, तर ते डिफॉल्टनुसार 0 असते.

#### सारांश {#summary-1}

- ट्रान्झॅक्शनचे वितर्क ठोस किंवा सिम्बॉलिक असू शकतात
- एक रॉ ट्रान्झॅक्शन सर्व फंक्शन्स एक्सप्लोर करेल
- फंक्शनला त्यांच्या नावाने कॉल केले जाऊ शकते

### वर्कस्पेस {#workspace}

`m.workspace` ही तयार केलेल्या सर्व फाइल्ससाठी आउटपुट डिरेक्टरी म्हणून वापरली जाणारी डिरेक्टरी आहे:

```python
print("निकाल {} मध्ये आहेत".format(m.workspace))
```

### एक्सप्लोरेशन समाप्त करा {#terminate-the-exploration}

एक्सप्लोरेशन थांबवण्यासाठी [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) वापरा. एकदा ही पद्धत कॉल केल्यावर कोणतेही पुढील ट्रान्झॅक्शन पाठवले जाऊ नयेत आणि Manticore एक्सप्लोर केलेल्या प्रत्येक पाथसाठी टेस्ट केसेस तयार करतो.

### सारांश: Manticore अंतर्गत चालवणे {#summary-running-under-manticore}

मागील सर्व पायऱ्या एकत्र ठेवल्यास, आपल्याला मिळते:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("निकाल {} मध्ये आहेत".format(m.workspace))
m.finalize() # एक्सप्लोरेशन थांबवा
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये मिळेल

## थ्रोइंग पाथ्स मिळवणे {#getting-throwing-paths}

आता आपण `f()` मध्ये अपवाद निर्माण करणाऱ्या पाथसाठी विशिष्ट इनपुट तयार करू. लक्ष्य अजूनही खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

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

### स्टेट माहिती वापरणे {#using-state-information}

कार्यान्वित केलेल्या प्रत्येक पाथची ब्लॉकचेनची स्वतःची स्टेट असते. एक स्टेट एकतर तयार असते किंवा ती किल्ड होते, याचा अर्थ ती THROW किंवा REVERT सूचनेपर्यंत पोहोचते:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): तयार असलेल्या स्टेट्सची यादी (त्यांनी REVERT/INVALID कार्यान्वित केलेले नाही)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): किल्ड झालेल्या स्टेट्सची यादी
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): सर्व स्टेट्स

```python
for state in m.all_states:
    # स्टेटसह काहीतरी करा
```

तुम्ही स्टेट माहिती ऍक्सेस करू शकता. उदाहरणार्थ:

- `state.platform.get_balance(account.address)`: अकाउंटचा बॅलन्स
- `state.platform.transactions`: ट्रान्झॅक्शनची यादी
- `state.platform.transactions[-1].return_data`: शेवटच्या ट्रान्झॅक्शनद्वारे परत केलेला डेटा

शेवटच्या ट्रान्झॅक्शनद्वारे परत केलेला डेटा एक ॲरे आहे, जो ABI.deserialize सह एका मूल्यात रूपांतरित केला जाऊ शकतो, उदाहरणार्थ:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### टेस्टकेस कसे तयार करावे {#how-to-generate-testcase}

टेस्टकेस तयार करण्यासाठी [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) वापरा:

```python
m.generate_testcase(state, 'BugFound')
```

### सारांश {#summary-2}

- तुम्ही m.all_states सह स्टेटवर पुनरावृत्ती करू शकता
- `state.platform.get_balance(account.address)` अकाउंटचा बॅलन्स परत करतो
- `state.platform.transactions` ट्रान्झॅक्शनची यादी परत करतो
- `transaction.return_data` हा परत केलेला डेटा आहे
- `m.generate_testcase(state, name)` स्टेटसाठी इनपुट तयार करते

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

## एक्झिक्युशन REVERT किंवा INVALID ने संपते का ते तपासा
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('थ्रो आढळला {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये मिळेल

_टीप: आम्ही एक अधिक सोपी स्क्रिप्ट तयार करू शकलो असतो, कारण terminated_state द्वारे परत केलेल्या सर्व स्टेट्सच्या निकालात REVERT किंवा INVALID आहे: हे उदाहरण फक्त API मध्ये कसे फेरफार करायचे हे दाखवण्यासाठी होते._

## मर्यादा जोडणे {#adding-constraints}

आपण एक्सप्लोरेशनवर कसे बंधन घालायचे ते पाहू. आम्ही असे गृहीत धरू की `f()` च्या डॉक्युमेंटेशनमध्ये असे म्हटले आहे की फंक्शनला `a == 65` सह कधीही कॉल केले जात नाही, त्यामुळे `a == 65` सह कोणताही बग खरा बग नाही. लक्ष्य अजूनही खालील स्मार्ट कॉन्ट्रॅक्ट [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) आहे:

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

[ऑपरेटर्स](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) मॉड्यूल मर्यादांच्या हाताळणीला सुलभ करते, इतर गोष्टींबरोबरच ते प्रदान करते:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

मॉड्यूल इम्पोर्ट करण्यासाठी खालील वापरा:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` चा वापर ॲरेला मूल्याशी जोडण्यासाठी केला जातो. उदाहरणार्थ, ट्रान्झॅक्शनच्या return_data ला एका मूल्यात बदलण्याची आवश्यकता आहे जेणेकरून ते दुसऱ्या मूल्याशी तपासले जाईल:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### मर्यादा {#state-constraint}

तुम्ही जागतिक स्तरावर किंवा विशिष्ट स्टेटसाठी मर्यादा वापरू शकता.

#### जागतिक मर्यादा {#state-constraint}

जागतिक मर्यादा जोडण्यासाठी `m.constrain(constraint)` वापरा.
उदाहरणार्थ, तुम्ही एका सिम्बॉलिक ॲड्रेसवरून कॉन्ट्रॅक्टला कॉल करू शकता, आणि या ॲड्रेसला विशिष्ट मूल्यांवर मर्यादित करू शकता:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### स्टेट मर्यादा {#state-constraint}

एका विशिष्ट स्टेटला मर्यादा जोडण्यासाठी [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) वापरा.
त्याच्या एक्सप्लोरेशननंतर स्टेटवर काही गुणधर्म तपासण्यासाठी मर्यादा घालण्यासाठी याचा वापर केला जाऊ शकतो.

### मर्यादा तपासणे {#checking-constraint}

एक मर्यादा अजूनही व्यवहार्य आहे की नाही हे जाणून घेण्यासाठी `solver.check(state.constraints)` वापरा.
उदाहरणार्थ, खालील symbolic_value ला 65 पेक्षा वेगळे ठेवेल आणि स्टेट अजूनही व्यवहार्य आहे की नाही हे तपासेल:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # स्टेट व्यवहार्य आहे
```

### सारांश: मर्यादा जोडणे {#summary-adding-constraints}

मागील कोडमध्ये मर्यादा जोडल्यास, आपल्याला मिळते:

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

## एक्झिक्युशन REVERT किंवा INVALID ने संपते का ते तपासा
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # आम्ही a == 65 असलेला पाथ विचारात घेत नाही
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'बग आढळला, निकाल {m.workspace} मध्ये आहेत')
            no_bug_found = False

if no_bug_found:
    print(f'कोणताही बग आढळला नाही')
```

वरील सर्व कोड तुम्हाला [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) मध्ये मिळेल
