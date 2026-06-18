---
title: "स्मार्ट अनुबंधों में बग खोजने के लिए मैन्टिकोर का उपयोग कैसे करें"
description: "स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए मैन्टिकोर का उपयोग कैसे करें"
author: "ट्रेलऑफ़बिट्स"
lang: hi
tags:
  ["Solidity", "स्मार्ट अनुबंध", "सुरक्षा", "परीक्षण", "औपचारिक सत्यापन"]
skill: advanced
breadcrumb: "मैन्टिकोर"
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

इस ट्यूटोरियल का उद्देश्य यह दिखाना है कि स्मार्ट अनुबंधों में स्वचालित रूप से बग खोजने के लिए मैन्टिकोर का उपयोग कैसे करें।

## इंस्टॉलेशन {#installation}

मैन्टिकोर के लिए >= Python 3.6 की आवश्यकता होती है। इसे pip के माध्यम से या Docker का उपयोग करके इंस्टॉल किया जा सकता है।

### Docker के माध्यम से मैन्टिकोर {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_अंतिम कमांड eth-security-toolbox को एक Docker में चलाता है जिसकी पहुंच आपकी वर्तमान डायरेक्टरी तक होती है। आप अपने होस्ट से फ़ाइलें बदल सकते हैं, और Docker से फ़ाइलों पर टूल चला सकते हैं_

Docker के अंदर, चलाएं:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip के माध्यम से मैन्टिकोर {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 की अनुशंसा की जाती है।

### स्क्रिप्ट चलाना {#running-a-script}

Python 3 के साथ Python स्क्रिप्ट चलाने के लिए:

```bash
python3 script.py
```

## डायनामिक सिम्बोलिक एक्ज़ीक्यूशन का परिचय {#introduction-to-dynamic-symbolic-execution}

### संक्षेप में डायनामिक सिम्बोलिक एक्ज़ीक्यूशन {#dynamic-symbolic-execution-in-a-nutshell}

डायनामिक सिम्बोलिक एक्ज़ीक्यूशन (DSE) एक प्रोग्राम विश्लेषण तकनीक है जो उच्च स्तर की सिमेंटिक जागरूकता के साथ एक स्थिति (state) स्पेस की खोज करती है। यह तकनीक "प्रोग्राम पाथ" की खोज पर आधारित है, जिन्हें `path predicates` नामक गणितीय सूत्रों के रूप में दर्शाया जाता है। वैचारिक रूप से, यह तकनीक दो चरणों में पाथ प्रेडिकेट्स पर काम करती है:

1. इनका निर्माण प्रोग्राम के इनपुट पर बाधाओं (constraints) का उपयोग करके किया जाता है।
2. इनका उपयोग प्रोग्राम इनपुट उत्पन्न करने के लिए किया जाता है जो संबंधित पाथ को निष्पादित करने का कारण बनेंगे।

यह दृष्टिकोण इस अर्थ में कोई गलत सकारात्मक (false positive) परिणाम नहीं देता है कि सभी पहचानी गई प्रोग्राम स्थितियों को ठोस निष्पादन (concrete execution) के दौरान ट्रिगर किया जा सकता है। उदाहरण के लिए, यदि विश्लेषण में कोई इंटीजर ओवरफ़्लो मिलता है, तो इसके पुनरुत्पादन (reproducible) की गारंटी होती है।

### पाथ प्रेडिकेट का उदाहरण {#path-predicate-example}

DSE कैसे काम करता है, इसकी जानकारी प्राप्त करने के लिए, निम्नलिखित उदाहरण पर विचार करें:

```solidity
function f(uint a){

  if (a == 65) {
      // एक बग मौजूद है
  }

}
```

चूंकि `f()` में दो पाथ हैं, इसलिए एक DSE दो अलग-अलग पाथ प्रेडिकेट्स का निर्माण करेगा:

- पाथ 1: `a == 65`
- पाथ 2: `Not (a == 65)`

प्रत्येक पाथ प्रेडिकेट एक गणितीय सूत्र है जिसे एक तथाकथित [SMT समाधानकर्ता](https://wikipedia.org/wiki/Satisfiability_modulo_theories) को दिया जा सकता है, जो समीकरण को हल करने का प्रयास करेगा। `Path 1` के लिए, समाधानकर्ता कहेगा कि पाथ को `a = 65` के साथ खोजा जा सकता है। `Path 2` के लिए, समाधानकर्ता `a` को 65 के अलावा कोई भी मान दे सकता है, उदाहरण के लिए `a = 0`।

### गुणों का सत्यापन {#verifying-properties}

मैन्टिकोर प्रत्येक पाथ के सभी निष्पादन पर पूर्ण नियंत्रण की अनुमति देता है। परिणामस्वरूप, यह आपको लगभग किसी भी चीज़ में मनमानी बाधाएं (constraints) जोड़ने की अनुमति देता है। यह नियंत्रण अनुबंध पर गुणों (properties) के निर्माण की अनुमति देता है।

निम्नलिखित उदाहरण पर विचार करें:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // कोई ओवरफ़्लो सुरक्षा नहीं
  return c;
}
```

यहां फ़ंक्शन में खोजने के लिए केवल एक पाथ है:

- पाथ 1: `c = a + b`

मैन्टिकोर का उपयोग करके, आप ओवरफ़्लो की जांच कर सकते हैं, और पाथ प्रेडिकेट में बाधाएं जोड़ सकते हैं:

- `c = a + b AND (c < a OR c < b)`

यदि `a` और `b` का ऐसा मान खोजना संभव है जिसके लिए उपरोक्त पाथ प्रेडिकेट व्यवहार्य (feasible) है, तो इसका मतलब है कि आपको एक ओवरफ़्लो मिल गया है। उदाहरण के लिए समाधानकर्ता इनपुट `a = 10 , b = MAXUINT256` उत्पन्न कर सकता है।

यदि आप एक निश्चित (fixed) संस्करण पर विचार करते हैं:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ओवरफ़्लो जांच के साथ संबंधित सूत्र होगा:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

इस सूत्र को हल नहीं किया जा सकता है; दूसरे शब्दों में यह एक **प्रमाण** है कि `safe_add` में, `c` हमेशा बढ़ेगा।

इस प्रकार DSE एक शक्तिशाली उपकरण है, जो आपके कोड पर मनमानी बाधाओं को सत्यापित कर सकता है।

## मैन्टिकोर के अंतर्गत चलाना {#running-under-manticore}

हम देखेंगे कि मैन्टिकोर API के साथ एक स्मार्ट अनुबंध का अन्वेषण कैसे करें। लक्ष्य निम्नलिखित स्मार्ट अनुबंध [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) है:

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

### एक स्टैंडअलोन अन्वेषण चलाएं {#run-a-standalone-exploration}

आप निम्नलिखित कमांड द्वारा सीधे स्मार्ट अनुबंध पर मैन्टिकोर चला सकते हैं (`project` एक Solidity फ़ाइल, या एक प्रोजेक्ट डायरेक्टरी हो सकती है):

```bash
$ manticore project
```

आपको इस तरह के टेस्टकेस का आउटपुट मिलेगा (क्रम बदल सकता है):

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

अतिरिक्त जानकारी के बिना, मैन्टिकोर नए सिम्बोलिक लेन-देन के साथ अनुबंध का अन्वेषण करेगा जब तक कि यह अनुबंध पर नए पाथ का अन्वेषण नहीं कर लेता। मैन्टिकोर विफल होने के बाद (उदा: रिवर्ट के बाद) नए लेन-देन नहीं चलाता है।

मैन्टिकोर जानकारी को `mcore_*` डायरेक्टरी में आउटपुट करेगा। अन्य बातों के अलावा, आपको इस डायरेक्टरी में मिलेगा:

- `global.summary`: कवरेज और कंपाइलर चेतावनियां
- `test_XXXXX.summary`: कवरेज, अंतिम निर्देश, प्रति टेस्ट केस खाते का बैलेंस
- `test_XXXXX.tx`: प्रति टेस्ट केस लेन-देन की विस्तृत सूची

यहां मैन्टिकोर को 7 टेस्ट केस मिलते हैं, जो इसके अनुरूप हैं (फ़ाइल नाम का क्रम बदल सकता है):

|                      |   लेन-देन 0   |   लेन-देन 1   | लेन-देन 2     | परिणाम |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | अनुबंध निर्माण |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | अनुबंध निर्माण | फॉलबैक फ़ंक्शन |                   | REVERT |
| **test_00000002.tx** | अनुबंध निर्माण |                   |                   | RETURN |
| **test_00000003.tx** | अनुबंध निर्माण |       f(65)       |                   | REVERT |
| **test_00000004.tx** | अनुबंध निर्माण |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | अनुबंध निर्माण |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | अनुबंध निर्माण |      f(!=65)      | फॉलबैक फ़ंक्शन | REVERT |

_अन्वेषण सारांश f(!=65) दर्शाता है कि f को 65 से भिन्न किसी भी मान के साथ कॉल किया गया है।_

जैसा कि आप देख सकते हैं, मैन्टिकोर प्रत्येक सफल या रिवर्ट किए गए लेन-देन के लिए एक अद्वितीय टेस्ट केस उत्पन्न करता है।

यदि आप तेज़ कोड अन्वेषण चाहते हैं तो `--quick-mode` फ़्लैग का उपयोग करें (यह बग डिटेक्टर, गैस गणना, ... को अक्षम कर देता है)

### API के माध्यम से एक स्मार्ट अनुबंध में हेरफेर करें {#manipulate-a-smart-contract-through-the-api}

यह अनुभाग विवरण देता है कि मैन्टिकोर Python API के माध्यम से एक स्मार्ट अनुबंध में हेरफेर कैसे करें। आप Python एक्सटेंशन `*.py` के साथ नई फ़ाइल बना सकते हैं और इस फ़ाइल में API कमांड (जिनकी मूल बातें नीचे वर्णित की जाएंगी) जोड़कर आवश्यक कोड लिख सकते हैं और फिर इसे `$ python3 *.py` कमांड के साथ चला सकते हैं। इसके अलावा आप नीचे दिए गए कमांड को सीधे Python कंसोल में निष्पादित कर सकते हैं, कंसोल चलाने के लिए `$ python3` कमांड का उपयोग करें।

### खाते बनाना {#creating-accounts}

सबसे पहली चीज़ जो आपको करनी चाहिए वह है निम्नलिखित कमांड के साथ एक नया ब्लॉकचेन शुरू करना:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

एक गैर-अनुबंध खाता [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) का उपयोग करके बनाया जाता है:

```python
user_account = m.create_account(balance=1000)
```

एक Solidity अनुबंध को [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) का उपयोग करके परिनियोजित (deploy) किया जा सकता है:

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

- आप [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) और [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) के साथ उपयोगकर्ता और कॉन्ट्रैक्ट खाते बना सकते हैं।

### लेन-देन निष्पादित करना {#executing-transactions}

मैन्टिकोर दो प्रकार के लेन-देन का समर्थन करता है:

- रॉ (Raw) लेन-देन: सभी फ़ंक्शंस का अन्वेषण किया जाता है
- नामित (Named) लेन-देन: केवल एक फ़ंक्शन का अन्वेषण किया जाता है

#### रॉ लेन-देन {#raw-transaction}

एक रॉ लेन-देन [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) का उपयोग करके निष्पादित किया जाता है:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

कॉलर, पता, डेटा, या लेन-देन का मूल्य या तो ठोस (concrete) या सिम्बोलिक हो सकता है:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) एक सिम्बोलिक मान बनाता है।
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) एक सिम्बोलिक बाइट ऐरे बनाता है।

उदाहरण के लिए:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

यदि डेटा सिम्बोलिक है, तो मैन्टिकोर लेन-देन निष्पादन के दौरान अनुबंध के सभी फ़ंक्शंस का अन्वेषण करेगा। फ़ंक्शन चयन कैसे काम करता है, यह समझने के लिए [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) लेख में फॉलबैक फ़ंक्शन स्पष्टीकरण देखना मददगार होगा।

#### नामित लेन-देन {#named-transaction}

फ़ंक्शंस को उनके नाम के माध्यम से निष्पादित किया जा सकता है।
user_account से, और 0 ईथर के साथ, एक सिम्बोलिक मान के साथ `f(uint var)` को निष्पादित करने के लिए, उपयोग करें:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

यदि लेन-देन का `value` निर्दिष्ट नहीं है, तो यह डिफ़ॉल्ट रूप से 0 होता है।

#### सारांश {#summary-1}

- लेन-देन के तर्क (arguments) ठोस या सिम्बोलिक हो सकते हैं
- एक रॉ लेन-देन सभी फ़ंक्शंस का अन्वेषण करेगा
- फ़ंक्शन को उनके नाम से कॉल किया जा सकता है

### कार्यस्थान (Workspace) {#workspace}

`m.workspace` वह डायरेक्टरी है जिसका उपयोग उत्पन्न सभी फ़ाइलों के लिए आउटपुट डायरेक्टरी के रूप में किया जाता है:

```python
print("Results are in {}".format(m.workspace))
```

### अन्वेषण समाप्त करें {#terminate-the-exploration}

अन्वेषण को रोकने के लिए [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) का उपयोग करें। एक बार इस विधि को कॉल करने के बाद कोई और लेन-देन नहीं भेजा जाना चाहिए और मैन्टिकोर खोजे गए प्रत्येक पाथ के लिए टेस्ट केस उत्पन्न करता है।

### सारांश: मैन्टिकोर के अंतर्गत चलाना {#summary-running-under-manticore}

पिछले सभी चरणों को एक साथ रखने पर, हमें प्राप्त होता है:

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
m.finalize() # अन्वेषण रोकें
```

उपरोक्त सभी कोड आप [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) में पा सकते हैं

## थ्रोइंग (Throwing) पाथ प्राप्त करना {#getting-throwing-paths}

अब हम `f()` में अपवाद (exception) उत्पन्न करने वाले पाथ के लिए विशिष्ट इनपुट उत्पन्न करेंगे। लक्ष्य अभी भी निम्नलिखित स्मार्ट अनुबंध [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) है:

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

### स्थिति जानकारी का उपयोग करना {#using-state-information}

निष्पादित प्रत्येक पाथ की अपनी ब्लॉकचेन स्थिति होती है। एक स्थिति या तो तैयार (ready) होती है या इसे समाप्त (killed) कर दिया जाता है, जिसका अर्थ है कि यह THROW या REVERT निर्देश तक पहुंच जाती है:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): उन स्थितियों की सूची जो तैयार हैं (उन्होंने REVERT/INVALID निष्पादित नहीं किया)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): उन स्थितियों की सूची जो समाप्त हो गई हैं
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): सभी स्थितियां

```python
for state in m.all_states:
    # स्थिति के साथ कुछ करें
```

आप स्थिति जानकारी तक पहुंच सकते हैं। उदाहरण के लिए:

- `state.platform.get_balance(account.address)`: खाते का बैलेंस
- `state.platform.transactions`: लेन-देन की सूची
- `state.platform.transactions[-1].return_data`: अंतिम लेन-देन द्वारा लौटाया गया डेटा

अंतिम लेन-देन द्वारा लौटाया गया डेटा एक ऐरे है, जिसे ABI.deserialize के साथ एक मान में परिवर्तित किया जा सकता है, उदाहरण के लिए:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### टेस्टकेस कैसे उत्पन्न करें {#how-to-generate-testcase}

टेस्टकेस उत्पन्न करने के लिए [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) का उपयोग करें:

```python
m.generate_testcase(state, 'BugFound')
```

### सारांश {#summary-2}

- आप m.all_states के साथ स्थिति पर पुनरावृत्ति (iterate) कर सकते हैं
- `state.platform.get_balance(account.address)` खाते का बैलेंस लौटाता है
- `state.platform.transactions` लेन-देन की सूची लौटाता है
- `transaction.return_data` लौटाया गया डेटा है
- `m.generate_testcase(state, name)` स्थिति के लिए इनपुट उत्पन्न करता है

### सारांश: थ्रोइंग पाथ प्राप्त करना {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## जांचें कि क्या निष्पादन रिवर्ट या INVALID के साथ समाप्त होता है
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

उपरोक्त सभी कोड आप [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) में पा सकते हैं

_ध्यान दें कि हम एक बहुत ही सरल स्क्रिप्ट उत्पन्न कर सकते थे, क्योंकि terminated_state द्वारा लौटाई गई सभी स्थितियों के परिणाम में REVERT या INVALID होता है: इस उदाहरण का उद्देश्य केवल यह प्रदर्शित करना था कि API में हेरफेर कैसे करें।_

## बाधाएं (Constraints) जोड़ना {#adding-constraints}

हम देखेंगे कि अन्वेषण को कैसे बाधित (constrain) किया जाए। हम यह मान लेंगे कि `f()` का दस्तावेज़ीकरण बताता है कि फ़ंक्शन को कभी भी `a == 65` के साथ कॉल नहीं किया जाता है, इसलिए `a == 65` के साथ कोई भी बग वास्तविक बग नहीं है। लक्ष्य अभी भी निम्नलिखित स्मार्ट अनुबंध [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) है:

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

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) मॉड्यूल बाधाओं के हेरफेर की सुविधा प्रदान करता है, अन्य बातों के अलावा यह प्रदान करता है:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

मॉड्यूल आयात करने के लिए निम्नलिखित का उपयोग करें:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` का उपयोग किसी ऐरे को एक मान से जोड़ने (concatenate) के लिए किया जाता है। उदाहरण के लिए, किसी लेन-देन के return_data को किसी अन्य मान के विरुद्ध जांचने के लिए एक मान में बदलने की आवश्यकता होती है:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### बाधाएं {#state-constraint}

आप विश्व स्तर पर (globally) या किसी विशिष्ट स्थिति के लिए बाधाओं का उपयोग कर सकते हैं।

#### ग्लोबल बाधा {#state-constraint-2}

ग्लोबल बाधा जोड़ने के लिए `m.constrain(constraint)` का उपयोग करें।
उदाहरण के लिए, आप एक सिम्बोलिक पते से एक अनुबंध को कॉल कर सकते हैं, और इस पते को विशिष्ट मान होने के लिए प्रतिबंधित कर सकते हैं:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### स्थिति बाधा {#state-constraint-3}

किसी विशिष्ट स्थिति में बाधा जोड़ने के लिए [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) का उपयोग करें।
इसका उपयोग अन्वेषण के बाद स्थिति को बाधित करने के लिए किया जा सकता है ताकि उस पर कुछ गुणों की जांच की जा सके।

### बाधा की जांच करना {#checking-constraint}

यह जानने के लिए कि क्या कोई बाधा अभी भी व्यवहार्य है, `solver.check(state.constraints)` का उपयोग करें।
उदाहरण के लिए, निम्नलिखित symbolic_value को 65 से भिन्न होने के लिए बाधित करेगा और जांच करेगा कि क्या स्थिति अभी भी व्यवहार्य है:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # स्थिति व्यवहार्य है
```

### सारांश: बाधाएं जोड़ना {#summary-adding-constraints}

पिछले कोड में बाधा जोड़ने पर, हमें प्राप्त होता है:

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

## जांचें कि क्या निष्पादन रिवर्ट या INVALID के साथ समाप्त होता है
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # हम उस पथ पर विचार नहीं करते जहाँ a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

उपरोक्त सभी कोड आप [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) में पा सकते हैं