---
title: స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలి
description: స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను స్వయంచాలకంగా కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలి
author: ట్రైల్ఆఫ్‌బిట్స్
lang: te
tags:
  ["Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "భద్రత", "పరీక్షించడం", "ఫార్మల్ వెరిఫికేషన్"]
skill: advanced
breadcrumb: మాంటికోర్
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

ఈ ట్యుటోరియల్ యొక్క ఉద్దేశ్యం స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను స్వయంచాలకంగా కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలో చూపించడం.

## ఇన్‌స్టాలేషన్ {#installation}

మాంటికోర్‌కు >= Python 3.6 అవసరం. దీనిని pip ద్వారా లేదా Docker ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు.

### Docker ద్వారా మాంటికోర్ {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న Dockerలో eth-security-toolboxని రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు మరియు Docker నుండి ఫైల్‌లపై టూల్స్‌ను రన్ చేయవచ్చు_

Docker లోపల, ఇలా రన్ చేయండి:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip ద్వారా మాంటికోర్ {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 సిఫార్సు చేయబడింది.

### స్క్రిప్ట్‌ను రన్ చేయడం {#running-a-script}

Python 3తో Python స్క్రిప్ట్‌ను రన్ చేయడానికి:

```bash
python3 script.py
```

## డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్ పరిచయం {#introduction-to-dynamic-symbolic-execution}

### డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్ (DSE) సంగ్రహంగా {#dynamic-symbolic-execution-in-a-nutshell}

డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్ (DSE) అనేది అధిక స్థాయి సెమాంటిక్ అవగాహనతో స్థితి (state) స్పేస్‌ను అన్వేషించే ప్రోగ్రామ్ విశ్లేషణ సాంకేతికత. ఈ సాంకేతికత "ప్రోగ్రామ్ పాత్‌ల" అన్వేషణపై ఆధారపడి ఉంటుంది, వీటిని `path predicates` అని పిలువబడే గణిత సూత్రాలుగా సూచిస్తారు. సంభావితంగా, ఈ సాంకేతికత పాత్ ప్రెడికేట్‌లపై రెండు దశల్లో పనిచేస్తుంది:

1. ప్రోగ్రామ్ ఇన్‌పుట్‌పై పరిమితులను ఉపయోగించి అవి నిర్మించబడతాయి.
2. అనుబంధిత పాత్‌లను అమలు చేయడానికి కారణమయ్యే ప్రోగ్రామ్ ఇన్‌పుట్‌లను రూపొందించడానికి అవి ఉపయోగించబడతాయి.

గుర్తించబడిన అన్ని ప్రోగ్రామ్ స్థితులను కాంక్రీట్ ఎగ్జిక్యూషన్ సమయంలో ట్రిగ్గర్ చేయవచ్చు కాబట్టి ఈ విధానం ఎలాంటి ఫాల్స్ పాజిటివ్‌లను ఉత్పత్తి చేయదు. ఉదాహరణకు, విశ్లేషణలో పూర్ణాంక ఓవర్‌ఫ్లో కనుగొనబడితే, అది పునరుత్పత్తి చేయబడుతుందని హామీ ఇవ్వబడుతుంది.

### పాత్ ప్రెడికేట్ ఉదాహరణ {#path-predicate-example}

DSE ఎలా పనిచేస్తుందో అర్థం చేసుకోవడానికి, కింది ఉదాహరణను పరిశీలించండి:

```solidity
function f(uint a){

  if (a == 65) {
      // ఒక బగ్ ఉంది
  }

}
```

`f()` రెండు పాత్‌లను కలిగి ఉన్నందున, DSE రెండు విభిన్న పాత్ ప్రెడికేట్‌లను నిర్మిస్తుంది:

- పాత్ 1: `a == 65`
- పాత్ 2: `Not (a == 65)`

ప్రతి పాత్ ప్రెడికేట్ అనేది ఒక గణిత సూత్రం, దీనిని [SMT పరిష్కర్త](https://wikipedia.org/wiki/Satisfiability_modulo_theories) అని పిలువబడే దానికి ఇవ్వవచ్చు, ఇది సమీకరణాన్ని పరిష్కరించడానికి ప్రయత్నిస్తుంది. `Path 1` కోసం, పాత్‌ను `a = 65`తో అన్వేషించవచ్చని పరిష్కర్త చెబుతుంది. `Path 2` కోసం, పరిష్కర్త `a`కి 65 కాకుండా మరేదైనా విలువను ఇవ్వగలదు, ఉదాహరణకు `a = 0`.

### లక్షణాలను ధృవీకరించడం {#verifying-properties}

ప్రతి పాత్ యొక్క మొత్తం ఎగ్జిక్యూషన్‌పై మాంటికోర్ పూర్తి నియంత్రణను అనుమతిస్తుంది. ఫలితంగా, ఇది దాదాపు దేనికైనా ఏకపక్ష పరిమితులను జోడించడానికి మిమ్మల్ని అనుమతిస్తుంది. ఈ నియంత్రణ కాంట్రాక్ట్‌పై లక్షణాలను సృష్టించడానికి అనుమతిస్తుంది.

కింది ఉదాహరణను పరిశీలించండి:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // ఓవర్‌ఫ్లో రక్షణ లేదు
  return c;
}
```

ఇక్కడ ఫంక్షన్‌లో అన్వేషించడానికి ఒకే ఒక పాత్ ఉంది:

- పాత్ 1: `c = a + b`

మాంటికోర్‌ని ఉపయోగించి, మీరు ఓవర్‌ఫ్లో కోసం తనిఖీ చేయవచ్చు మరియు పాత్ ప్రెడికేట్‌కు పరిమితులను జోదించవచ్చు:

- `c = a + b AND (c < a OR c < b)`

పైన ఉన్న పాత్ ప్రెడికేట్ సాధ్యమయ్యే `a` మరియు `b` యొక్క విలువను కనుగొనడం సాధ్యమైతే, మీరు ఓవర్‌ఫ్లోను కనుగొన్నారని అర్థం. ఉదాహరణకు పరిష్కర్త `a = 10 , b = MAXUINT256` ఇన్‌పుట్‌ను రూపొందించగలదు.

మీరు స్థిరమైన సంస్కరణను పరిశీలిస్తే:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ఓవర్‌ఫ్లో తనిఖీతో అనుబంధించబడిన సూత్రం ఇలా ఉంటుంది:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

ఈ సూత్రాన్ని పరిష్కరించలేము; మరో మాటలో చెప్పాలంటే, `safe_add`లో, `c` ఎల్లప్పుడూ పెరుగుతుందనడానికి ఇది ఒక **రుజువు**.

DSE అనేది మీ కోడ్‌పై ఏకపక్ష పరిమితులను ధృవీకరించగల శక్తివంతమైన సాధనం.

## మాంటికోర్ కింద రన్ చేయడం {#running-under-manticore}

మాంటికోర్ APIతో స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా అన్వేషించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### స్వతంత్ర అన్వేషణను రన్ చేయండి {#run-a-standalone-exploration}

కింది కమాండ్ ద్వారా మీరు మాంటికోర్‌ను నేరుగా స్మార్ట్ కాంట్రాక్ట్‌పై రన్ చేయవచ్చు (`project` అనేది Solidity ఫైల్ లేదా ప్రాజెక్ట్ డైరెక్టరీ కావచ్చు):

```bash
$ manticore project
```

మీరు దీనిలాంటి టెస్ట్‌కేస్‌ల అవుట్‌పుట్‌ను పొందుతారు (క్రమం మారవచ్చు):

```
...
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 0 రూపొందించబడింది - STOP
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 1 రూపొందించబడింది - REVERT
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 2 రూపొందించబడింది - RETURN
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 3 రూపొందించబడింది - REVERT
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 4 రూపొందించబడింది - STOP
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 5 రూపొందించబడింది - REVERT
... m.c.manticore:INFO: టెస్ట్‌కేస్ నం. 6 రూపొందించబడింది - REVERT
... m.c.manticore:INFO: ఫలితాలు /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3 లో ఉన్నాయి
...
```

అదనపు సమాచారం లేకుండా, మాంటికోర్ కాంట్రాక్ట్‌పై కొత్త పాత్‌లను అన్వేషించడం ఆపే వరకు కొత్త సింబాలిక్ లావాదేవీలతో కాంట్రాక్ట్‌ను అన్వేషిస్తుంది. విఫలమైన లావాదేవీ తర్వాత (ఉదా: రివర్ట్ తర్వాత) మాంటికోర్ కొత్త లావాదేవీలను రన్ చేయదు.

మాంటికోర్ సమాచారాన్ని `mcore_*` డైరెక్టరీలో అవుట్‌పుట్ చేస్తుంది. ఇతర వాటితో పాటు, మీరు ఈ డైరెక్టరీలో వీటిని కనుగొంటారు:

- `global.summary`: కవరేజ్ మరియు కంపైలర్ హెచ్చరికలు
- `test_XXXXX.summary`: కవరేజ్, చివరి సూచన, ప్రతి టెస్ట్ కేస్‌కు ఖాతా బ్యాలెన్స్‌లు
- `test_XXXXX.tx`: ప్రతి టెస్ట్ కేస్‌కు లావాదేవీల వివరణాత్మక జాబితా

ఇక్కడ మాంటికోర్ 7 టెస్ట్ కేసులను కనుగొంది, ఇవి వీటికి అనుగుణంగా ఉంటాయి (ఫైల్ పేరు క్రమం మారవచ్చు):

|                      |   లావాదేవీ 0   |   లావాదేవీ 1   | లావాదేవీ 2     | ఫలితం |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | కాంట్రాక్ట్ సృష్టి |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | కాంట్రాక్ట్ సృష్టి | ఫాల్‌బ్యాక్ ఫంక్షన్ |                   | REVERT |
| **test_00000002.tx** | కాంట్రాక్ట్ సృష్టి |                   |                   | RETURN |
| **test_00000003.tx** | కాంట్రాక్ట్ సృష్టి |       f(65)       |                   | REVERT |
| **test_00000004.tx** | కాంట్రాక్ట్ సృష్టి |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | కాంట్రాక్ట్ సృష్టి |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | కాంట్రాక్ట్ సృష్టి |      f(!=65)      | ఫాల్‌బ్యాక్ ఫంక్షన్ | REVERT |

_అన్వేషణ సారాంశం f(!=65) అనేది 65కి భిన్నమైన ఏదైనా విలువతో పిలువబడే fని సూచిస్తుంది._

మీరు గమనించినట్లుగా, ప్రతి విజయవంతమైన లేదా రివర్ట్ చేయబడిన లావాదేవీకి మాంటికోర్ ఒక ప్రత్యేకమైన టెస్ట్ కేస్‌ను రూపొందిస్తుంది.

మీకు వేగవంతమైన కోడ్ అన్వేషణ కావాలంటే `--quick-mode` ఫ్లాగ్‌ని ఉపయోగించండి (ఇది బగ్ డిటెక్టర్‌లు, గ్యాస్ గణన మొదలైనవాటిని నిలిపివేస్తుంది...)

### API ద్వారా స్మార్ట్ కాంట్రాక్ట్‌ను మార్చడం {#manipulate-a-smart-contract-through-the-api}

మాంటికోర్ Python API ద్వారా స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా మార్చాలో ఈ విభాగం వివరిస్తుంది. మీరు Python ఎక్స్‌టెన్షన్ `*.py`తో కొత్త ఫైల్‌ను సృష్టించవచ్చు మరియు ఈ ఫైల్‌లోకి API కమాండ్‌లను (వీటి ప్రాథమిక అంశాలు క్రింద వివరించబడతాయి) జోడించడం ద్వారా అవసరమైన కోడ్‌ను వ్రాయవచ్చు, ఆపై దానిని `$ python3 *.py` కమాండ్‌తో రన్ చేయవచ్చు. అలాగే మీరు కింది కమాండ్‌లను నేరుగా Python కన్సోల్‌లో అమలు చేయవచ్చు, కన్సోల్‌ను రన్ చేయడానికి `$ python3` కమాండ్‌ను ఉపయోగించండి.

### ఖాతాలను సృష్టించడం {#creating-accounts}

మీరు చేయవలసిన మొదటి విషయం కింది కమాండ్‌లతో కొత్త బ్లాక్‌చైన్‌ను ప్రారంభించడం:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

నాన్-కాంట్రాక్ట్ ఖాతా [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ఉపయోగించి సృష్టించబడుతుంది:

```python
user_account = m.create_account(balance=1000)
```

[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ఉపయోగించి Solidity కాంట్రాక్ట్‌ను డిప్లాయ్ చేయవచ్చు:

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

#### సారాంశం {#summary}

- మీరు [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) మరియు [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)తో వినియోగదారు మరియు కాంట్రాక్ట్ ఖాతాలను సృష్టించవచ్చు.

### లావాదేవీలను అమలు చేయడం {#executing-transactions}

మాంటికోర్ రెండు రకాల లావాదేవీలకు మద్దతు ఇస్తుంది:

- ముడి (Raw) లావాదేవీ: అన్ని ఫంక్షన్‌లు అన్వేషించబడతాయి
- పేరున్న (Named) లావాదేవీ: ఒక ఫంక్షన్ మాత్రమే అన్వేషించబడుతుంది

#### ముడి లావాదేవీ {#raw-transaction}

ముడి లావాదేవీ [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ఉపయోగించి అమలు చేయబడుతుంది:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

కాలర్, చిరునామా, డేటా లేదా లావాదేవీ విలువ కాంక్రీట్ లేదా సింబాలిక్ కావచ్చు:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) సింబాలిక్ విలువను సృష్టిస్తుంది.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) సింబాలిక్ బైట్ శ్రేణిని సృష్టిస్తుంది.

ఉదాహరణకు:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

డేటా సింబాలిక్ అయితే, లావాదేవీ అమలు సమయంలో మాంటికోర్ కాంట్రాక్ట్ యొక్క అన్ని ఫంక్షన్‌లను అన్వేషిస్తుంది. ఫంక్షన్ ఎంపిక ఎలా పనిచేస్తుందో అర్థం చేసుకోవడానికి [హ్యాండ్స్ ఆన్ ది ఈథర్‌నాట్ CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) కథనంలోని ఫాల్‌బ్యాక్ ఫంక్షన్ వివరణను చూడటం సహాయకరంగా ఉంటుంది.

#### పేరున్న లావాదేవీ {#named-transaction}

ఫంక్షన్‌లను వాటి పేరు ద్వారా అమలు చేయవచ్చు.
user_account నుండి సింబాలిక్ విలువతో మరియు 0 ఈథర్‌తో `f(uint var)`ని అమలు చేయడానికి, దీన్ని ఉపయోగించండి:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

లావాదేవీ యొక్క `value` పేర్కొనబడకపోతే, అది అప్రమేయంగా 0 అవుతుంది.

#### సారాంశం {#summary-1}

- లావాదేవీ యొక్క ఆర్గ్యుమెంట్‌లు కాంక్రీట్ లేదా సింబాలిక్ కావచ్చు
- ముడి లావాదేవీ అన్ని ఫంక్షన్‌లను అన్వేషిస్తుంది
- ఫంక్షన్‌ను వాటి పేరు ద్వారా పిలవవచ్చు

### వర్క్‌స్పేస్ {#workspace}

`m.workspace` అనేది రూపొందించబడిన అన్ని ఫైల్‌ల కోసం అవుట్‌పుట్ డైరెక్టరీగా ఉపయోగించబడే డైరెక్టరీ:

```python
print("Results are in {}".format(m.workspace))
```

### అన్వేషణను ముగించడం {#terminate-the-exploration}

అన్వేషణను ఆపడానికి [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)ని ఉపయోగించండి. ఈ పద్ధతిని పిలిచిన తర్వాత తదుపరి లావాదేవీలు పంపబడకూడదు మరియు అన్వేషించిన ప్రతి పాత్‌కు మాంటికోర్ టెస్ట్ కేసులను రూపొందిస్తుంది.

### సారాంశం: మాంటికోర్ కింద రన్ చేయడం {#summary-running-under-manticore}

మునుపటి దశలన్నింటినీ కలిపితే, మనకు ఇది వస్తుంది:

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
m.finalize() # అన్వేషణను నిలిపివేయండి
```

పైన ఉన్న కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు

## త్రోయింగ్ పాత్‌లను పొందడం {#getting-throwing-paths}

మేము ఇప్పుడు `f()`లో మినహాయింపును (exception) పెంచే పాత్‌ల కోసం నిర్దిష్ట ఇన్‌పుట్‌లను రూపొందిస్తాము. లక్ష్యం ఇప్పటికీ కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### స్థితి సమాచారాన్ని ఉపయోగించడం {#using-state-information}

అమలు చేయబడిన ప్రతి పాత్‌కు దాని బ్లాక్‌చైన్ స్థితి ఉంటుంది. ఒక స్థితి సిద్ధంగా ఉంటుంది లేదా అది చంపబడుతుంది (killed), అంటే అది THROW లేదా REVERT సూచనను చేరుకుంటుంది:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): సిద్ధంగా ఉన్న స్థితుల జాబితా (అవి REVERT/INVALIDని అమలు చేయలేదు)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): చంపబడిన స్థితుల జాబితా
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): అన్ని స్థితులు

```python
for state in m.all_states:
    # స్థితితో ఏదైనా చేయండి
```

మీరు స్థితి సమాచారాన్ని యాక్సెస్ చేయవచ్చు. ఉదాహరణకు:

- `state.platform.get_balance(account.address)`: ఖాతా బ్యాలెన్స్
- `state.platform.transactions`: లావాదేవీల జాబితా
- `state.platform.transactions[-1].return_data`: చివరి లావాదేవీ ద్వారా అందించబడిన డేటా

చివరి లావాదేవీ ద్వారా అందించబడిన డేటా ఒక శ్రేణి (array), దీనిని ABI.deserializeతో విలువగా మార్చవచ్చు, ఉదాహరణకు:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### టెస్ట్‌కేస్‌ను ఎలా రూపొందించాలి {#how-to-generate-testcase}

టెస్ట్‌కేస్‌ను రూపొందించడానికి [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)ని ఉపయోగించండి:

```python
m.generate_testcase(state, 'BugFound')
```

### సారాంశం {#summary-2}

- మీరు m.all_statesతో స్థితిపై మళ్ళీ మళ్ళీ (iterate) చేయవచ్చు
- `state.platform.get_balance(account.address)` ఖాతా బ్యాలెన్స్‌ను అందిస్తుంది
- `state.platform.transactions` లావాదేవీల జాబితాను అందిస్తుంది
- `transaction.return_data` అనేది అందించబడిన డేటా
- `m.generate_testcase(state, name)` స్థితి కోసం ఇన్‌పుట్‌లను రూపొందిస్తుంది

### సారాంశం: త్రోయింగ్ పాత్‌ను పొందడం {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## అమలు రివర్ట్ లేదా INVALID తో ముగుస్తుందో లేదో తనిఖీ చేయండి
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

పైన ఉన్న కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు

_గమనిక, terminated_state ద్వారా అందించబడిన అన్ని స్థితులు వాటి ఫలితంలో REVERT లేదా INVALIDని కలిగి ఉన్నందున, మేము చాలా సులభమైన స్క్రిప్ట్‌ను రూపొందించి ఉండవచ్చు: ఈ ఉదాహరణ APIని ఎలా మార్చాలో ప్రదర్శించడానికి మాత్రమే ఉద్దేశించబడింది._

## పరిమితులను జోడించడం {#adding-constraints}

అన్వేషణను ఎలా పరిమితం చేయాలో మనం చూస్తాము. `f()` యొక్క డాక్యుమెంటేషన్ ఫంక్షన్ ఎప్పుడూ `a == 65`తో పిలవబడదని పేర్కొంటుందని మేము ఊహిస్తాము, కాబట్టి `a == 65`తో ఉన్న ఏదైనా బగ్ నిజమైన బగ్ కాదు. లక్ష్యం ఇప్పటికీ కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### ఆపరేటర్లు {#operators}

[ఆపరేటర్లు](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) మాడ్యూల్ పరిమితుల తారుమారుని సులభతరం చేస్తుంది, ఇతర వాటితో పాటు ఇది వీటిని అందిస్తుంది:

- Operators.AND,
- Operators.OR,
- Operators.UGT (అన్‌సైన్డ్ గ్రేటర్ దేన్),
- Operators.UGE (అన్‌సైన్డ్ గ్రేటర్ దేన్ లేదా ఈక్వల్ టు),
- Operators.ULT (అన్‌సైన్డ్ లోయర్ దేన్),
- Operators.ULE (అన్‌సైన్డ్ లోయర్ దేన్ లేదా ఈక్వల్ టు).

మాడ్యూల్‌ను దిగుమతి చేయడానికి కింది వాటిని ఉపయోగించండి:

```python
from manticore.core.smtlib import Operators
```

శ్రేణిని విలువకు కలపడానికి (concatenate) `Operators.CONCAT` ఉపయోగించబడుతుంది. ఉదాహరణకు, లావాదేవీ యొక్క return_data మరొక విలువతో తనిఖీ చేయడానికి విలువగా మార్చబడాలి:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### పరిమితులు {#state-constraint}

మీరు పరిమితులను ప్రపంచవ్యాప్తంగా (globally) లేదా నిర్దిష్ట స్థితి కోసం ఉపయోగించవచ్చు.

#### గ్లోబల్ పరిమితి {#state-constraint-2}

గ్లోబల్ పరిమితిని జోడించడానికి `m.constrain(constraint)`ని ఉపయోగించండి.
ఉదాహరణకు, మీరు సింబాలిక్ చిరునామా నుండి కాంట్రాక్ట్‌ను పిలవవచ్చు మరియు ఈ చిరునామాను నిర్దిష్ట విలువలకే పరిమితం చేయవచ్చు:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### స్థితి పరిమితి {#state-constraint-3}

నిర్దిష్ట స్థితికి పరిమితిని జోడించడానికి [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)ని ఉపయోగించండి.
దానిపై కొంత లక్షణాన్ని తనిఖీ చేయడానికి దాని అన్వేషణ తర్వాత స్థితిని పరిమితం చేయడానికి దీనిని ఉపయోగించవచ్చు.

### పరిమితిని తనిఖీ చేయడం {#checking-constraint}

పరిమితి ఇంకా సాధ్యమేనా అని తెలుసుకోవడానికి `solver.check(state.constraints)`ని ఉపయోగించండి.
ఉదాహరణకు, కిందివి symbolic_valueని 65కి భిన్నంగా ఉండేలా పరిమితం చేస్తాయి మరియు స్థితి ఇంకా సాధ్యమేనా అని తనిఖీ చేస్తాయి:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # స్థితి సాధ్యమే
```

### సారాంశం: పరిమితులను జోడించడం {#summary-adding-constraints}

మునుపటి కోడ్‌కు పరిమితిని జోడిస్తే, మనకు ఇది వస్తుంది:

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

## అమలు రివర్ట్ లేదా INVALID తో ముగుస్తుందో లేదో తనిఖీ చేయండి
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 ఉన్న మార్గాన్ని మేము పరిగణించము
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

పైన ఉన్న కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు