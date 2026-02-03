---
title: స్మార్ట్ కాంట్రాక్ట్‌లలో బగ్‌లను కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలి
description: స్మార్ట్ కాంట్రాక్ట్‌లలో స్వయంచాలకంగా బగ్‌లను కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలి
author: Trailofbits
lang: te
tags:
  [
    "దృఢత్వం",
    "స్మార్ట్ కాంట్రాక్టులు",
    "భద్రత",
    "పరీక్షించడం",
    "ఫార్మల్ వెరిఫికేషన్"
  ]
skill: అధునాతనం
published: 2020-01-13
source: సురక్షితమైన కాంట్రాక్టులను నిర్మించడం
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

ఈ ట్యుటోరియల్ యొక్క లక్ష్యం స్మార్ట్ కాంట్రాక్ట్‌లలో స్వయంచాలకంగా బగ్‌లను కనుగొనడానికి మాంటికోర్‌ను ఎలా ఉపయోగించాలో చూపించడం.

## సంస్థాపన {#installation}

మాంటికోర్‌కు >= పైథాన్ 3.6 అవసరం. దీనిని పిప్ ద్వారా లేదా డాకర్‌ని ఉపయోగించి ఇన్‌స్టాల్ చేయవచ్చు.

### డాకర్ ద్వారా మాంటికోర్ {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_చివరి కమాండ్ మీ ప్రస్తుత డైరెక్టరీకి యాక్సెస్ ఉన్న డాకర్‌లో eth-security-toolboxను రన్ చేస్తుంది. మీరు మీ హోస్ట్ నుండి ఫైల్‌లను మార్చవచ్చు, మరియు డాకర్_ నుండి ఫైల్‌లపై సాధనాలను అమలు చేయండి

డాకర్ లోపల, రన్ చేయండి:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### పిప్ ద్వారా మాంటికోర్ {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 సిఫార్సు చేయబడింది.

### ఒక స్క్రిప్ట్‌ను అమలు చేయడం {#running-a-script}

పైథాన్ 3 తో పైథాన్ స్క్రిప్ట్‌ను అమలు చేయడానికి:

```bash
python3 script.py
```

## డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్‌కు పరిచయం {#introduction-to-dynamic-symbolic-execution}

### సంక్షిప్తంగా డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్ {#dynamic-symbolic-execution-in-a-nutshell}

డైనమిక్ సింబాలిక్ ఎగ్జిక్యూషన్ (DSE) అనేది అధిక స్థాయి సెమాంటిక్ అవగాహనతో ఒక స్టేట్ స్పేస్‌ను అన్వేషించే ఒక ప్రోగ్రామ్ విశ్లేషణ పద్ధతి. ఈ పద్ధతి "ప్రోగ్రామ్ పాత్‌ల" ఆవిష్కరణపై ఆధారపడి ఉంటుంది, వీటిని `పాత్ ప్రిడికేట్స్` అని పిలిచే గణిత సూత్రాలుగా సూచిస్తారు. సంభావితంగా, ఈ పద్ధతి పాత్ ప్రిడికేట్‌లపై రెండు దశలలో పనిచేస్తుంది:

1. ప్రోగ్రామ్ ఇన్‌పుట్‌పై పరిమితులను ఉపయోగించి అవి నిర్మించబడ్డాయి.
2. అనుబంధిత పాత్‌లను అమలు చేయడానికి కారణమయ్యే ప్రోగ్రామ్ ఇన్‌పుట్‌లను రూపొందించడానికి అవి ఉపయోగించబడతాయి.

గుర్తించబడిన అన్ని ప్రోగ్రామ్ స్టేట్‌లు కాంక్రీట్ ఎగ్జిక్యూషన్ సమయంలో ప్రేరేపించబడతాయి అనే అర్థంలో ఈ విధానం ఎటువంటి తప్పుడు పాజిటివ్‌లను ఉత్పత్తి చేయదు. ఉదాహరణకు, విశ్లేషణలో ఒక పూర్ణాంక ఓవర్‌ఫ్లో కనుగొనబడితే, అది పునరుత్పత్తి చేయబడుతుందని హామీ ఇవ్వబడింది.

### పాత్ ప్రిడికేట్ ఉదాహరణ {#path-predicate-example}

DSE ఎలా పనిచేస్తుందో ఒక అవగాహన పొందడానికి, కింది ఉదాహరణను పరిగణించండి:

```solidity
function f(uint a){

  if (a == 65) {
      // ఒక బగ్ ఉంది
  }

}
```

`f()` రెండు పాత్‌లను కలిగి ఉన్నందున, ఒక DSE రెండు వేర్వేరు పాత్ ప్రిడికేట్‌లను నిర్మిస్తుంది:

- పాత్ 1: `a == 65`
- పాత్ 2: `కాదు (a == 65)`

ప్రతి పాత్ ప్రిడికేట్ ఒక గణిత సూత్రం, దీనిని [SMT సాల్వర్](https://wikipedia.org/wiki/Satisfiability_modulo_theories) అని పిలవబడే దానికి ఇవ్వవచ్చు, అది సమీకరణాన్ని పరిష్కరించడానికి ప్రయత్నిస్తుంది. `పాత్ 1` కోసం, సాల్వర్ `a = 65` తో పాత్‌ను అన్వేషించవచ్చని చెబుతుంది. `పాత్ 2` కోసం, సాల్వర్ `a` కు 65 కాకుండా ఏదైనా విలువను ఇవ్వగలదు, ఉదాహరణకు `a = 0`.

### లక్షణాలను ధృవీకరించడం {#verifying-properties}

మాంటికోర్ ప్రతి పాత్ యొక్క అన్ని ఎగ్జిక్యూషన్‌పై పూర్తి నియంత్రణను అనుమతిస్తుంది. ఫలితంగా, ఇది దాదాపు దేనికైనా యాదృచ్ఛిక పరిమితులను జోడించడానికి మిమ్మల్ని అనుమతిస్తుంది. ఈ నియంత్రణ కాంట్రాక్ట్‌పై లక్షణాల సృష్టికి అనుమతిస్తుంది.

కింది ఉదాహరణను పరిగణించండి:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // ఓవర్‌ఫ్లో రక్షణ లేదు
  return c;
}
```

ఇక్కడ ఫంక్షన్‌లో అన్వేషించడానికి ఒకే ఒక్క పాత్ ఉంది:

- పాత్ 1: `c = a + b`

మాంటికోర్‌ను ఉపయోగించి, మీరు ఓవర్‌ఫ్లో కోసం తనిఖీ చేయవచ్చు, మరియు పాత్ ప్రిడికేట్‌కు పరిమితులను జోడించవచ్చు:

- `c = a + b AND (c < a OR c < b)`

పైన ఉన్న పాత్ ప్రిడికేట్ సాధ్యమయ్యే `a` మరియు `b` యొక్క మూల్యాంకనాన్ని కనుగొనడం సాధ్యమైతే, మీరు ఒక ఓవర్‌ఫ్లోను కనుగొన్నారని అర్థం. ఉదాహరణకు సాల్వర్ ఇన్‌పుట్ `a = 10 , b = MAXUINT256`ను రూపొందించగలదు.

మీరు ఒక స్థిరమైన సంస్కరణను పరిగణించినట్లయితే:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ఓవర్‌ఫ్లో తనిఖీతో అనుబంధిత సూత్రం ఇలా ఉంటుంది:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

ఈ సూత్రాన్ని పరిష్కరించలేము; మరో మాటలో చెప్పాలంటే, ఇది `safe_add`లో `c` ఎల్లప్పుడూ పెరుగుతుందనడానికి ఒక **రుజువు**.

అందువల్ల DSE ఒక శక్తివంతమైన సాధనం, ఇది మీ కోడ్‌పై యాదృచ్ఛిక పరిమితులను ధృవీకరించగలదు.

## మాంటికోర్ కింద నడుస్తోంది {#running-under-manticore}

మాంటికోర్ API తో స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా అన్వేషించాలో మనం చూస్తాము. లక్ష్యం కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### ఒక స్వతంత్ర అన్వేషణను అమలు చేయండి {#run-a-standalone-exploration}

మీరు కింది కమాండ్ ద్వారా నేరుగా స్మార్ట్ కాంట్రాక్ట్‌పై మాంటికోర్‌ను అమలు చేయవచ్చు (`project` ఒక సాలిడిటీ ఫైల్ లేదా ప్రాజెక్ట్ డైరెక్టరీ కావచ్చు):

```bash
$ manticore project
```

మీరు ఇలాంటి టెస్ట్‌కేసుల అవుట్‌పుట్‌ను పొందుతారు (ఆర్డర్ మారవచ్చు):

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

అదనపు సమాచారం లేకుండా, మాంటికోర్ కొత్త సింబాలిక్ లావాదేవీలతో కాంట్రాక్ట్‌ను అన్వేషిస్తుంది, అది కాంట్రాక్ట్‌లో కొత్త పాత్‌లను అన్వేషించే వరకు. విఫలమైన దాని తర్వాత మాంటికోర్ కొత్త లావాదేవీలను అమలు చేయదు (ఉదా: రివర్ట్ తర్వాత).

మాంటికోర్ సమాచారాన్ని `mcore_*` డైరెక్టరీలో అవుట్‌పుట్ చేస్తుంది. ఇతర వాటితో పాటు, మీరు ఈ డైరెక్టరీలో కనుగొంటారు:

- `global.summary`: కవరేజ్ మరియు కంపైలర్ హెచ్చరికలు
- `test_XXXXX.summary`: కవరేజ్, చివరి సూచన, ప్రతి టెస్ట్ కేసుకు ఖాతా బ్యాలెన్స్‌లు
- `test_XXXXX.tx`: ప్రతి టెస్ట్ కేసుకు లావాదేవీల వివరణాత్మక జాబితా

ఇక్కడ మాంటికోర్ 7 టెస్ట్ కేసులను కనుగొంది, అవి వీటికి అనుగుణంగా ఉంటాయి (ఫైల్‌నేమ్ ఆర్డర్ మారవచ్చు):

|                                                           |     లావాదేవీ 0     |         లావాదేవీ 1         | లావాదేవీ 2                 |  ఫలితం |
| :-------------------------------------------------------: | :----------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | కాంట్రాక్ట్ సృష్టి | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | కాంట్రాక్ట్ సృష్టి |     ఫాల్‌బ్యాక్ ఫంక్షన్    |                            | REVERT |
| **test_00000002.tx** | కాంట్రాక్ట్ సృష్టి |                            |                            | RETURN |
| **test_00000003.tx** | కాంట్రాక్ట్ సృష్టి |  f(65)  |                            | REVERT |
| **test_00000004.tx** | కాంట్రాక్ట్ సృష్టి | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | కాంట్రాక్ట్ సృష్టి | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | కాంట్రాక్ట్ సృష్టి | f(!=65) | ఫాల్‌బ్యాక్ ఫంక్షన్        | REVERT |

_అన్వేషణ సారాంశం f(!=65) అంటే 65 కంటే భిన్నమైన ఏదైనా విలువతో f పిలువబడిందని సూచిస్తుంది._

మీరు గమనించినట్లుగా, మాంటికోర్ ప్రతి విజయవంతమైన లేదా రివర్ట్ చేయబడిన లావాదేవీకి ఒక ప్రత్యేకమైన టెస్ట్ కేసును ఉత్పత్తి చేస్తుంది.

మీరు వేగవంతమైన కోడ్ అన్వేషణను కోరుకుంటే `--quick-mode` ఫ్లాగ్‌ను ఉపయోగించండి (ఇది బగ్ డిటెక్టర్లు, గ్యాస్ గణన మొదలైనవాటిని నిలిపివేస్తుంది)

### API ద్వారా స్మార్ట్ కాంట్రాక్ట్‌ను మార్చడం {#manipulate-a-smart-contract-through-the-api}

ఈ విభాగం మాంటికోర్ పైథాన్ API ద్వారా స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా మార్చాలో వివరిస్తుంది. మీరు పైథాన్ ఎక్స్‌టెన్షన్ `*.py` తో కొత్త ఫైల్‌ను సృష్టించవచ్చు మరియు API ఆదేశాలను (వీటి ప్రాథమికాలు క్రింద వివరించబడతాయి) ఈ ఫైల్‌లోకి జోడించడం ద్వారా అవసరమైన కోడ్‌ను వ్రాయవచ్చు, ఆపై `$ python3 *.py` ఆదేశంతో దాన్ని అమలు చేయండి. అలాగే మీరు కింది ఆదేశాలను నేరుగా పైథాన్ కన్సోల్‌లోకి అమలు చేయవచ్చు, కన్సోల్‌ను అమలు చేయడానికి `$ python3` ఆదేశాన్ని ఉపయోగించండి.

### ఖాతాలను సృష్టించడం {#creating-accounts}

మీరు చేయవలసిన మొదటి విషయం కింది ఆదేశాలతో కొత్త బ్లాక్ చైనును ప్రారంభించడం:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

ఒక నాన్-కాంట్రాక్ట్ ఖాతా [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ఉపయోగించి సృష్టించబడుతుంది:

```python
user_account = m.create_account(balance=1000)
```

ఒక సాలిడిటీ కాంట్రాక్ట్‌ను [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ఉపయోగించి అమలు చేయవచ్చు:

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

- మీరు [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) మరియు [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) తో వినియోగదారు మరియు కాంట్రాక్ట్ ఖాతాలను సృష్టించవచ్చు.

### లావాదేవీలను అమలు చేయడం {#executing-transactions}

మాంటికోర్ రెండు రకాల లావాదేవీలకు మద్దతు ఇస్తుంది:

- రా లావాదేవీ: అన్ని ఫంక్షన్లు అన్వేషించబడతాయి
- పేరున్న లావాదేవీ: ఒకే ఒక ఫంక్షన్ అన్వేషించబడుతుంది

#### రా లావాదేవీ {#raw-transaction}

ఒక రా లావాదేవీ [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ఉపయోగించి అమలు చేయబడుతుంది:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

కాలర్, చిరునామా, డేటా, లేదా లావాదేవీ యొక్క విలువ కాంక్రీట్ లేదా సింబాలిక్ కావచ్చు:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ఒక సింబాలిక్ విలువను సృష్టిస్తుంది.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ఒక సింబాలిక్ బైట్ శ్రేణిని సృష్టిస్తుంది.

ఉదాహరణకి:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

డేటా సింబాలిక్ అయితే, మాంటికోర్ లావాదేవీ అమలు సమయంలో కాంట్రాక్ట్ యొక్క అన్ని ఫంక్షన్లను అన్వేషిస్తుంది. ఫంక్షన్ ఎంపిక ఎలా పనిచేస్తుందో అర్థం చేసుకోవడానికి [హ్యాండ్స్ ఆన్ ది ఈథర్నాట్ CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) కథనంలో ఫాల్‌బ్యాక్ ఫంక్షన్ వివరణను చూడటం సహాయకరంగా ఉంటుంది.

#### పేరున్న లావాదేవీ {#named-transaction}

ఫంక్షన్లను వాటి పేరు ద్వారా అమలు చేయవచ్చు.
సింబాలిక్ విలువతో `f(uint var)` ను user_account నుండి, మరియు 0 ఈథర్‌తో అమలు చేయడానికి, ఉపయోగించండి:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

లావాదేవీ యొక్క `value` పేర్కొనకపోతే, అది డిఫాల్ట్‌గా 0 అవుతుంది.

#### సారాంశం {#summary-1}

- ఒక లావాదేవీ యొక్క వాదనలు కాంక్రీట్ లేదా సింబాలిక్ కావచ్చు
- ఒక రా లావాదేవీ అన్ని ఫంక్షన్లను అన్వేషిస్తుంది
- ఫంక్షన్‌ను వాటి పేరు ద్వారా పిలవవచ్చు

### వర్క్‌స్పేస్ {#workspace}

`m.workspace` అనేది రూపొందించబడిన అన్ని ఫైల్‌ల కోసం అవుట్‌పుట్ డైరెక్టరీగా ఉపయోగించబడే డైరెక్టరీ:

```python
print("Results are in {}".format(m.workspace))
```

### అన్వేషణను ముగించండి {#terminate-the-exploration}

అన్వేషణను ఆపడానికి [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)ని ఉపయోగించండి. ఈ పద్ధతిని పిలిచిన తర్వాత తదుపరి లావాదేవీలు పంపకూడదు మరియు మాంటికోర్ అన్వేషించబడిన ప్రతి పాత్‌కు టెస్ట్ కేసులను ఉత్పత్తి చేస్తుంది.

### సారాంశం: మాంటికోర్ కింద నడుస్తోంది {#summary-running-under-manticore}

మునుపటి దశలన్నింటినీ కలిపి, మనం పొందుతాము:

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
m.finalize() # stop the exploration
```

పై కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు

## త్రోయింగ్ పాత్‌లను పొందడం {#getting-throwing-paths}

ఇప్పుడు మనం `f()`లో మినహాయింపును పెంచే పాత్‌ల కోసం నిర్దిష్ట ఇన్‌పుట్‌లను రూపొందిస్తాము. లక్ష్యం ఇప్పటికీ కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### స్టేట్ సమాచారాన్ని ఉపయోగించడం {#using-state-information}

అమలు చేయబడిన ప్రతి పాత్ బ్లాక్ చైను యొక్క దాని స్థితిని కలిగి ఉంటుంది. ఒక స్థితి సిద్ధంగా ఉంటుంది లేదా అది చంపబడుతుంది, అంటే అది THROW లేదా REVERT సూచనను చేరుకుంటుంది:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): సిద్ధంగా ఉన్న స్థితుల జాబితా (అవి REVERT/INVALID ను అమలు చేయలేదు)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): చంపబడిన స్థితుల జాబితా
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): అన్ని స్థితులు

```python
for state in m.all_states:
    # స్టేట్‌తో ఏదైనా చేయండి
```

మీరు స్థితి సమాచారాన్ని యాక్సెస్ చేయవచ్చు. ఉదాహరణకి:

- `state.platform.get_balance(account.address)`: ఖాతా యొక్క బ్యాలెన్స్
- `state.platform.transactions`: లావాదేవీల జాబితా
- `state.platform.transactions[-1].return_data`: చివరి లావాదేవీ ద్వారా తిరిగి ఇవ్వబడిన డేటా

చివరి లావాదేవీ ద్వారా తిరిగి ఇవ్వబడిన డేటా ఒక శ్రేణి, దీనిని ABI.deserialize తో ఒక విలువగా మార్చవచ్చు, ఉదాహరణకు:

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

- మీరు m.all_states తో స్థితిపై పునరావృతం చేయవచ్చు
- `state.platform.get_balance(account.address)` ఖాతా బ్యాలెన్స్‌ను తిరిగి ఇస్తుంది
- `state.platform.transactions` లావాదేవీల జాబితాను తిరిగి ఇస్తుంది
- `transaction.return_data` అనేది తిరిగి ఇవ్వబడిన డేటా
- `m.generate_testcase(state, name)` స్థితి కోసం ఇన్‌పుట్‌లను ఉత్పత్తి చేస్తుంది

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

పై కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు

_గమనిక మేము చాలా సరళమైన స్క్రిప్ట్‌ను రూపొందించగలిగేవాళ్లం, ఎందుకంటే terminated_state ద్వారా తిరిగి ఇవ్వబడిన అన్ని స్థితుల ఫలితంలో REVERT లేదా INVALID ఉంది: ఈ ఉదాహరణ కేవలం APIని ఎలా మార్చాలో ప్రదర్శించడానికి మాత్రమే ఉద్దేశించబడింది._

## పరిమితులను జోడించడం {#adding-constraints}

అన్వేషణను ఎలా నియంత్రించాలో చూద్దాం. ఫంక్షన్ ఎప్పుడూ `a == 65` తో పిలువబడదని `f()` యొక్క డాక్యుమెంటేషన్ పేర్కొంటుందని మేము ఊహిస్తాము, కాబట్టి `a == 65` తో ఉన్న ఏ బగ్ అయినా నిజమైన బగ్ కాదు. లక్ష్యం ఇప్పటికీ కింది స్మార్ట్ కాంట్రాక్ట్ [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

[ఆపరేటర్లు](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) మాడ్యూల్ పరిమితుల మార్పును సులభతరం చేస్తుంది, ఇతర వాటితో పాటు ఇది అందిస్తుంది:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

మాడ్యూల్‌ను దిగుమతి చేయడానికి కింది వాటిని ఉపయోగించండి:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` అనేది ఒక శ్రేణిని ఒక విలువకు కలపడానికి ఉపయోగించబడుతుంది. ఉదాహరణకు, ఒక లావాదేవీ యొక్క return_data ను మరొక విలువతో సరిపోల్చడానికి ఒక విలువగా మార్చాలి:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### పరిమితులు {#state-constraint}

మీరు పరిమితులను ప్రపంచవ్యాప్తంగా లేదా ఒక నిర్దిష్ట స్థితి కోసం ఉపయోగించవచ్చు.

#### గ్లోబల్ పరిమితి {#state-constraint}

గ్లోబల్ పరిమితిని జోడించడానికి `m.constrain(constraint)` ను ఉపయోగించండి.
ఉదాహరణకు, మీరు ఒక సింబాలిక్ చిరునామా నుండి ఒక కాంట్రాక్ట్‌ను పిలవవచ్చు మరియు ఈ చిరునామాను నిర్దిష్ట విలువలకు పరిమితం చేయవచ్చు:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### స్థితి పరిమితి {#state-constraint}

ఒక నిర్దిష్ట స్థితికి పరిమితిని జోడించడానికి [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)ని ఉపయోగించండి.
దానిపై కొన్ని లక్షణాలను తనిఖీ చేయడానికి దాని అన్వేషణ తర్వాత స్థితిని పరిమితం చేయడానికి దీనిని ఉపయోగించవచ్చు.

### పరిమితిని తనిఖీ చేయడం {#checking-constraint}

ఒక పరిమితి ఇప్పటికీ సాధ్యమేనా అని తెలుసుకోవడానికి `solver.check(state.constraints)` ను ఉపయోగించండి.
ఉదాహరణకు, కిందిది symbolic_value ను 65 కంటే భిన్నంగా ఉండేలా పరిమితం చేస్తుంది మరియు స్థితి ఇప్పటికీ సాధ్యమేనా అని తనిఖీ చేస్తుంది:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### సారాంశం: పరిమితులను జోడించడం {#summary-adding-constraints}

మునుపటి కోడ్‌కు పరిమితిని జోడిస్తే, మనం పొందుతాము:

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

## ఒక ఎగ్జిక్యూషన్ REVERT లేదా INVALID తో ముగుస్తుందో లేదో తనిఖీ చేయండి
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 అయిన పాత్‌ను మేము పరిగణించము
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'బగ్ కనుగొనబడింది, ఫలితాలు {m.workspace} లో ఉన్నాయి')
            no_bug_found = False

if no_bug_found:
    print(f'బగ్ ఏదీ కనుగొనబడలేదు')
```

పై కోడ్ అంతా మీరు [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)లో కనుగొనవచ్చు
