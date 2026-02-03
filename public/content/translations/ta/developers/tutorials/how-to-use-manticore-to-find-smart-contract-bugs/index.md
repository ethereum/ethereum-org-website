---
title: ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைக் கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது
description: ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகக் கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது
author: Trailofbits
lang: ta
tags:
  [
    "திட்பம்",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "பாதுகாப்பு",
    "சோதனை",
    "முறையான சரிபார்ப்பு"
  ]
skill: advanced
published: 2020-01-13
source: பாதுகாப்பான ஒப்பந்தங்களை உருவாக்குதல்
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

இந்த பயிற்சியின் நோக்கம், ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகக் கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது என்பதைக் காண்பிப்பதாகும்.

## நிறுவல் {#installation}

Manticore-க்கு >= python 3.6 தேவை. இதை pip மூலமாகவோ அல்லது docker-ஐப் பயன்படுத்தியோ நிறுவலாம்.

### docker வழியாக Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_கடைசிக் கட்டளை eth-security-toolbox-ஐ உங்கள் தற்போதைய கோப்பகத்திற்கான அணுகலைக் கொண்ட docker-இல் இயக்குகிறது. உங்கள் ஹோஸ்டிலிருந்து கோப்புகளை மாற்றலாம், மேலும் docker-இலிருந்து கோப்புகளில் கருவிகளை இயக்கலாம்_

docker-க்குள், இயக்கவும்:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip வழியாக Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 பரிந்துரைக்கப்படுகிறது.

### ஒரு ஸ்கிரிப்டை இயக்குதல் {#running-a-script}

python 3 உடன் ஒரு பைதான் ஸ்கிரிப்டை இயக்க:

```bash
python3 script.py
```

## இயங்குநிலை குறியீட்டு செயலாக்கத்திற்கான அறிமுகம் {#introduction-to-dynamic-symbolic-execution}

### இயங்குநிலை குறியீட்டு செயலாக்கம் சுருக்கமாக {#dynamic-symbolic-execution-in-a-nutshell}

இயங்குநிலை குறியீட்டு செயலாக்கம் (DSE) என்பது ஒரு நிரல் பகுப்பாய்வு நுட்பமாகும், இது அதிக அளவு சொற்பொருள் விழிப்புணர்வுடன் ஒரு நிலை வெளியை ஆராய்கிறது. இந்த நுட்பம் `பாதை முன்கணிப்புகள்` என்று அழைக்கப்படும் கணித சூத்திரங்களாக குறிப்பிடப்படும் "நிரல் பாதைகளின்" கண்டுபிடிப்பை அடிப்படையாகக் கொண்டது. கருத்தியல் ரீதியாக, இந்த நுட்பம் பாதை முன்கணிப்புகளில் இரண்டு படிகளில் செயல்படுகிறது:

1. அவை நிரலின் உள்ளீட்டின் மீதான கட்டுப்பாடுகளைப் பயன்படுத்தி உருவாக்கப்படுகின்றன.
2. தொடர்புடைய பாதைகளை இயக்கச் செய்யும் நிரல் உள்ளீடுகளை உருவாக்க அவை பயன்படுத்தப்படுகின்றன.

இந்த அணுகுமுறை தவறான நேர்மறைகளை உருவாக்காது, அதாவது அடையாளம் காணப்பட்ட அனைத்து நிரல் நிலைகளையும் உறுதியான செயலாக்கத்தின் போது இயக்க முடியும். எடுத்துக்காட்டாக, பகுப்பாய்வு ஒரு முழுஎண் overflow-ஐக் கண்டறிந்தால், அது மீண்டும் உருவாக்கப்படக்கூடியது என்று உத்தரவாதம் அளிக்கப்படுகிறது.

### பாதை முன்கணிப்பு எடுத்துக்காட்டு {#path-predicate-example}

DSE எவ்வாறு செயல்படுகிறது என்பதைப் பற்றிய ஒரு பார்வையைப் பெற, பின்வரும் எடுத்துக்காட்டைக் கவனியுங்கள்:

```solidity
function f(uint a){

  if (a == 65) {
      // ஒரு பிழை உள்ளது
  }

}
```

`f()` இரண்டு பாதைகளைக் கொண்டிருப்பதால், ஒரு DSE இரண்டு வெவ்வேறு பாதை முன்கணிப்புகளை உருவாக்கும்:

- பாதை 1: `a == 65`
- பாதை 2: `Not (a == 65)`

ஒவ்வொரு பாதை முன்கணிப்பும் ஒரு கணித சூத்திரமாகும், இது [SMT தீர்ப்பான்](https://wikipedia.org/wiki/Satisfiability_modulo_theories) எனப்படும் ஒன்றுக்கு கொடுக்கப்படலாம், இது சமன்பாட்டைத் தீர்க்க முயற்சிக்கும். `பாதை 1`-க்கு, `a = 65` உடன் பாதையை ஆராயலாம் என்று தீர்ப்பான் சொல்லும். `பாதை 2`-க்கு, தீர்ப்பான் `a`-க்கு 65-ஐத் தவிர வேறு எந்த மதிப்பையும் கொடுக்கலாம், எடுத்துக்காட்டாக `a = 0`.

### பண்புகளை சரிபார்த்தல் {#verifying-properties}

ஒவ்வொரு பாதையின் அனைத்து செயலாக்கத்தின் மீதும் ஒரு முழுமையான கட்டுப்பாட்டை Manticore அனுமதிக்கிறது. இதன் விளைவாக, இது ஏறக்குறைய எதற்கும் தன்னிச்சையான கட்டுப்பாடுகளைச் சேர்க்க உங்களை அனுமதிக்கிறது. இந்தக் கட்டுப்பாடு ஒப்பந்தத்தில் பண்புகளை உருவாக்க அனுமதிக்கிறது.

பின்வரும் எடுத்துக்காட்டைக் கவனியுங்கள்:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // overflow பாதுகாப்பு இல்லை
  return c;
}
```

இங்கே செயல்பாட்டில் ஆராய ஒரே ஒரு பாதை மட்டுமே உள்ளது:

- பாதை 1: `c = a + b`

Manticore-ஐப் பயன்படுத்தி, நீங்கள் overflow-க்காக சரிபார்த்து, பாதை முன்கணிப்பிற்கு கட்டுப்பாடுகளைச் சேர்க்கலாம்:

- `c = a + b AND (c < a OR c < b)`

மேலே உள்ள பாதை முன்கணிப்பு சாத்தியமான `a` மற்றும் `b`-இன் மதிப்பீட்டைக் கண்டறிய முடிந்தால், நீங்கள் ஒரு overflow-ஐக் கண்டறிந்துள்ளீர்கள் என்று அர்த்தம். எடுத்துக்காட்டாக, தீர்ப்பான் `a = 10 , b = MAXUINT256` உள்ளீட்டை உருவாக்க முடியும்.

நீங்கள் ஒரு சரிசெய்யப்பட்ட பதிப்பைக் கருதினால்:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

overflow சரிபார்ப்புடன் தொடர்புடைய சூத்திரம்:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

இந்த சூத்திரத்தை தீர்க்க முடியாது; வேறுவிதமாகக் கூறினால், `safe_add`-இல், `c` எப்போதும் அதிகரிக்கும் என்பதற்கு இது ஒரு **நிரூபணம்**.

DSE என்பது ஒரு சக்திவாய்ந்த கருவியாகும், இது உங்கள் குறியீட்டில் தன்னிச்சையான கட்டுப்பாடுகளைச் சரிபார்க்கும்.

## Manticore-இன் கீழ் இயக்குதல் {#running-under-manticore}

Manticore API உடன் ஒரு ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு ஆராய்வது என்று பார்ப்போம். இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### ஒரு தனித்தியங்கும் ஆய்வை இயக்கவும் {#run-a-standalone-exploration}

பின்வரும் கட்டளையின் மூலம் நீங்கள் Manticore-ஐ நேரடியாக ஸ்மார்ட் ஒப்பந்தத்தில் இயக்கலாம் (`project` என்பது ஒரு Solidity கோப்பு அல்லது ஒரு திட்டக் கோப்பகமாக இருக்கலாம்):

```bash
$ manticore project
```

இது போன்ற சோதனைகளின் வெளியீட்டைப் பெறுவீர்கள் (வரிசை மாறலாம்):

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

கூடுதல் தகவல் இல்லாமல், Manticore ஒப்பந்தத்தில் புதிய பாதைகளை ஆராயாத வரை புதிய குறியீட்டு பரிவர்த்தனைகளுடன் ஒப்பந்தத்தை ஆராயும். தோல்வியுற்ற பரிவர்த்தனைக்குப் பிறகு Manticore புதிய பரிவர்த்தனைகளை இயக்காது (எ.கா: ஒரு revert-க்குப் பிறகு).

Manticore ஒரு `mcore_*` கோப்பகத்தில் தகவலை வெளியிடும். மற்றவற்றுடன், இந்த கோப்பகத்தில் நீங்கள் காணலாம்:

- `global.summary`: கவரேஜ் மற்றும் தொகுப்பி எச்சரிக்கைகள்
- `test_XXXXX.summary`: கவரேஜ், கடைசி அறிவுறுத்தல், ஒரு சோதனை வழக்கிற்கான கணக்கு இருப்புக்கள்
- `test_XXXXX.tx`: ஒரு சோதனை வழக்கிற்கான பரிவர்த்தனைகளின் விரிவான பட்டியல்

இங்கே Manticore 7 சோதனை நிகழ்வுகளைக் கண்டறிந்தது, அவை (கோப்புப்பெயர் வரிசை மாறலாம்):

|                                                           |    பரிவர்த்தனை 0   |        பரிவர்த்தனை 1       | பரிவர்த்தனை 2              | முடிவு |
| :-------------------------------------------------------: | :----------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | ஒப்பந்த உருவாக்கம் | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | ஒப்பந்த உருவாக்கம் |    பின்வாங்கல் செயல்பாடு   |                            | REVERT |
| **test_00000002.tx** | ஒப்பந்த உருவாக்கம் |                            |                            | RETURN |
| **test_00000003.tx** | ஒப்பந்த உருவாக்கம் |  f(65)  |                            | REVERT |
| **test_00000004.tx** | ஒப்பந்த உருவாக்கம் | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | ஒப்பந்த உருவாக்கம் | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | ஒப்பந்த உருவாக்கம் | f(!=65) | பின்வாங்கல் செயல்பாடு      | REVERT |

_ஆய்வுச் சுருக்கம் f(!=65) என்பது 65-ஐ விட வேறுபட்ட எந்த மதிப்புடனும் f அழைக்கப்பட்டது என்பதைக் குறிக்கிறது._

நீங்கள் கவனித்தபடி, ஒவ்வொரு வெற்றிகரமான அல்லது திரும்பப்பெற்ற பரிவர்த்தனைக்கும் Manticore ஒரு தனித்துவமான சோதனை நிகழ்வை உருவாக்குகிறது.

வேகமான குறியீடு ஆய்வுக்கு நீங்கள் விரும்பினால் `--quick-mode` கொடியைப் பயன்படுத்தவும் (இது பிழை கண்டறிவான்களை முடக்குகிறது, எரிவாயு கணக்கீடு, ...)

### API மூலம் ஒரு ஸ்மார்ட் ஒப்பந்தத்தைக் கையாளுதல் {#manipulate-a-smart-contract-through-the-api}

இந்த பகுதி Manticore Python API மூலம் ஒரு ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு கையாள்வது என்பதை விவரிக்கிறது. நீங்கள் `*.py` என்ற பைதான் நீட்டிப்புடன் புதிய கோப்பை உருவாக்கலாம் மற்றும் API கட்டளைகளைச் சேர்ப்பதன் மூலம் தேவையான குறியீட்டை எழுதலாம் (அதன் அடிப்படைகள் கீழே விவரிக்கப்படும்) பின்னர் `$ python3 *.py` கட்டளையுடன் இயக்கவும். மேலும் நீங்கள் கீழே உள்ள கட்டளைகளை நேரடியாக பைதான் கன்சோலில் இயக்கலாம், கன்சோலை இயக்க `$ python3` கட்டளையைப் பயன்படுத்தவும்.

### கணக்குகளை உருவாக்குதல் {#creating-accounts}

நீங்கள் செய்ய வேண்டிய முதல் விஷயம், பின்வரும் கட்டளைகளுடன் ஒரு புதிய பிளாக்செயினைத் தொடங்குவதாகும்:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

[m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ஐப் பயன்படுத்தி ஒரு ஒப்பந்தம் அல்லாத கணக்கு உருவாக்கப்படுகிறது:

```python
user_account = m.create_account(balance=1000)
```

[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ஐப் பயன்படுத்தி ஒரு Solidity ஒப்பந்தத்தை வரிசைப்படுத்தலாம்:

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
# ஒப்பந்தத்தைத் தொடங்கவும்
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### சுருக்கம் {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) மற்றும் [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) மூலம் பயனர் மற்றும் ஒப்பந்தக் கணக்குகளை உருவாக்கலாம்.

### பரிவர்த்தனைகளைச் செயல்படுத்துதல் {#executing-transactions}

Manticore இரண்டு வகையான பரிவர்த்தனைகளை ஆதரிக்கிறது:

- மூலப் பரிவர்த்தனை: அனைத்து செயல்பாடுகளும் ஆராயப்படுகின்றன
- பெயரிடப்பட்ட பரிவர்த்தனை: ஒரு செயல்பாடு மட்டுமே ஆராயப்படுகிறது

#### மூலப் பரிவர்த்தனை {#raw-transaction}

[m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ஐப் பயன்படுத்தி ஒரு மூலப் பரிவர்த்தனை செயல்படுத்தப்படுகிறது:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

பரிவர்த்தனையின் அழைப்பாளர், முகவரி, தரவு அல்லது மதிப்பு உறுதியானதாகவோ அல்லது குறியீடாகவோ இருக்கலாம்:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ஒரு குறியீட்டு மதிப்பை உருவாக்குகிறது.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ஒரு குறியீட்டு பைட் வரிசையை உருவாக்குகிறது.

உதாரணமாக:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

தரவு குறியீடாக இருந்தால், பரிவர்த்தனை செயல்படுத்தும் போது Manticore ஒப்பந்தத்தின் அனைத்து செயல்பாடுகளையும் ஆராயும். செயல்பாடு தேர்வு எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்துகொள்ள [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) கட்டுரையில் உள்ள பின்வாங்கல் செயல்பாட்டின் விளக்கத்தைப் பார்ப்பது உதவியாக இருக்கும்.

#### பெயரிடப்பட்ட பரிவர்த்தனை {#named-transaction}

செயல்பாடுகளை அவற்றின் பெயர் மூலம் செயல்படுத்தலாம்.
`f(uint var)` ஐ ஒரு குறியீட்டு மதிப்புடன், user_account-இலிருந்து, மற்றும் 0 ஈதருடன் இயக்க, பயன்படுத்தவும்:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

பரிவர்த்தனையின் `மதிப்பு` குறிப்பிடப்படவில்லை என்றால், அது இயல்பாக 0 ஆகும்.

#### சுருக்கம் {#summary-1}

- ஒரு பரிவர்த்தனையின் வாதங்கள் உறுதியானதாகவோ அல்லது குறியீடாகவோ இருக்கலாம்
- ஒரு மூலப் பரிவர்த்தனை அனைத்து செயல்பாடுகளையும் ஆராயும்
- செயல்பாட்டை அவற்றின் பெயரால் அழைக்கலாம்

### பணியிடம் {#workspace}

`m.workspace` என்பது உருவாக்கப்பட்ட அனைத்து கோப்புகளுக்கும் வெளியீட்டு கோப்பகமாக பயன்படுத்தப்படும் கோப்பகம்:

```python
print("முடிவுகள் {} இல் உள்ளன".format(m.workspace))
```

### ஆய்வை நிறுத்துதல் {#terminate-the-exploration}

ஆய்வை நிறுத்த [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) ஐப் பயன்படுத்தவும். இந்த முறை அழைக்கப்பட்டவுடன் மேலும் பரிவர்த்தனைகள் அனுப்பப்படக்கூடாது, மேலும் ஆராயப்பட்ட ஒவ்வொரு பாதைக்கும் Manticore சோதனை நிகழ்வுகளை உருவாக்குகிறது.

### சுருக்கம்: Manticore-இன் கீழ் இயக்குதல் {#summary-running-under-manticore}

முந்தைய அனைத்து படிகளையும் ஒன்றாக இணைத்து, நாம் பெறுவது:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("முடிவுகள் {} இல் உள்ளன".format(m.workspace))
m.finalize() # ஆய்வை நிறுத்தவும்
```

மேலே உள்ள அனைத்து குறியீடுகளையும் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) இல் காணலாம்

## பிழை எறியும் பாதைகளைப் பெறுதல் {#getting-throwing-paths}

`f()` இல் ஒரு விதிவிலக்கை எழுப்பும் பாதைகளுக்கு குறிப்பிட்ட உள்ளீடுகளை இப்போது உருவாக்குவோம். இலக்கு இன்னும் பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### நிலைத் தகவலைப் பயன்படுத்துதல் {#using-state-information}

செயல்படுத்தப்பட்ட ஒவ்வொரு பாதைக்கும் பிளாக்செயினின் அதன் நிலை உள்ளது. ஒரு நிலை தயாராக உள்ளது அல்லது அது கொல்லப்படுகிறது, அதாவது அது ஒரு THROW அல்லது REVERT அறிவுறுத்தலை அடைகிறது:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): தயாராக உள்ள நிலைகளின் பட்டியல் (அவை REVERT/INVALID ஐ இயக்கவில்லை)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): கொல்லப்பட்ட நிலைகளின் பட்டியல்
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): அனைத்து நிலைகளும்

```python
for state in m.all_states:
    # நிலையுடன் ஏதாவது செய்யுங்கள்
```

நீங்கள் நிலைத் தகவலை அணுகலாம். உதாரணமாக:

- `state.platform.get_balance(account.address)`: கணக்கின் இருப்பு
- `state.platform.transactions`: பரிவர்த்தனைகளின் பட்டியல்
- `state.platform.transactions[-1].return_data`: கடைசி பரிவர்த்தனையால் திருப்பியளிக்கப்பட்ட தரவு

கடைசி பரிவர்த்தனையால் திருப்பியளிக்கப்பட்ட தரவு ஒரு வரிசையாகும், இதை ABI.deserialize உடன் ஒரு மதிப்பாக மாற்றலாம், எடுத்துக்காட்டாக:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### சோதனை நிகழ்வை உருவாக்குவது எப்படி {#how-to-generate-testcase}

சோதனை நிகழ்வை உருவாக்க [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) ஐப் பயன்படுத்தவும்:

```python
m.generate_testcase(state, 'BugFound')
```

### சுருக்கம் {#summary-2}

- நீங்கள் m.all_states உடன் நிலையின் மீது மீண்டும் மீண்டும் செல்லலாம்
- `state.platform.get_balance(account.address)` கணக்கின் இருப்பைத் திருப்பித் தருகிறது
- `state.platform.transactions` பரிவர்த்தனைகளின் பட்டியலைத் திருப்பித் தருகிறது
- `transaction.return_data` என்பது திருப்பியளிக்கப்பட்ட தரவு
- `m.generate_testcase(state, name)` நிலைக்கான உள்ளீடுகளை உருவாக்குகிறது

### சுருக்கம்: பிழை எறியும் பாதையைப் பெறுதல் {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## ஒரு செயலாக்கம் REVERT அல்லது INVALID உடன் முடிவடைகிறதா என சரிபார்க்கவும்
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('பிழை கண்டறியப்பட்டது {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

மேலே உள்ள அனைத்து குறியீடுகளையும் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) இல் காணலாம்

_குறிப்பு: terminated_state மூலம் திருப்பியளிக்கப்பட்ட அனைத்து நிலைகளும் அவற்றின் முடிவில் REVERT அல்லது INVALID ஐக் கொண்டிருப்பதால், நாங்கள் மிகவும் எளிமையான ஸ்கிரிப்டை உருவாக்கியிருக்கலாம்: இந்த எடுத்துக்காட்டு API-ஐ எவ்வாறு கையாள்வது என்பதை நிரூபிக்க மட்டுமே._

## கட்டுப்பாடுகளைச் சேர்த்தல் {#adding-constraints}

ஆய்வைக் கட்டுப்படுத்துவது எப்படி என்று பார்ப்போம். `f()` இன் ஆவணப்படுத்தல் `a == 65` உடன் செயல்பாடு ஒருபோதும் அழைக்கப்படவில்லை என்று கூறுகிறது என்று நாங்கள் கருதுவோம், எனவே `a == 65` உடன் எந்த பிழையும் உண்மையான பிழை அல்ல. இலக்கு இன்னும் பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### ஆபரேட்டர்கள் {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) தொகுதி கட்டுப்பாடுகளை கையாளுவதை எளிதாக்குகிறது, மற்றவற்றுடன் இது வழங்குகிறது:

- Operators.AND,
- Operators.OR,
- Operators.UGT (குறியிடப்படாத பெரியது),
- Operators.UGE (குறியிடப்படாத பெரியது அல்லது சமம்),
- Operators.ULT (குறியிடப்படாத சிறியது),
- Operators.ULE (குறியிடப்படாத சிறியது அல்லது சமம்).

தொகுதியை இறக்குமதி செய்ய பின்வருவனவற்றைப் பயன்படுத்தவும்:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` ஒரு வரிசையை ஒரு மதிப்புடன் இணைக்கப் பயன்படுகிறது. எடுத்துக்காட்டாக, ஒரு பரிவர்த்தனையின் return_data மற்றொரு மதிப்புக்கு எதிராக சரிபார்க்க ஒரு மதிப்பாக மாற்றப்பட வேண்டும்:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### கட்டுப்பாடுகள் {#state-constraint}

நீங்கள் உலகளாவிய ரீதியாக அல்லது ஒரு குறிப்பிட்ட நிலைக்காக கட்டுப்பாடுகளைப் பயன்படுத்தலாம்.

#### உலகளாவிய கட்டுப்பாடு {#state-constraint}

ஒரு உலகளாவிய கட்டுப்பாட்டைச் சேர்க்க `m.constrain(constraint)` ஐப் பயன்படுத்தவும்.
எடுத்துக்காட்டாக, நீங்கள் ஒரு குறியீட்டு முகவரியிலிருந்து ஒரு ஒப்பந்தத்தை அழைக்கலாம், மேலும் இந்த முகவரியை குறிப்பிட்ட மதிப்புகளுக்கு கட்டுப்படுத்தலாம்:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### நிலைக் கட்டுப்பாடு {#state-constraint}

ஒரு குறிப்பிட்ட நிலைக்கு ஒரு கட்டுப்பாட்டைச் சேர்க்க [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) ஐப் பயன்படுத்தவும்.
அதன் மீது சில பண்புகளைச் சரிபார்க்க அதன் ஆய்வுக்குப் பிறகு நிலையை கட்டுப்படுத்த இது பயன்படுத்தப்படலாம்.

### கட்டுப்பாட்டை சரிபார்த்தல் {#checking-constraint}

ஒரு கட்டுப்பாடு இன்னும் சாத்தியமானதா என்பதை அறிய `solver.check(state.constraints)` ஐப் பயன்படுத்தவும்.
எடுத்துக்காட்டாக, பின்வருபவை symbolic_value-ஐ 65-இலிருந்து வேறுபட்டதாகக் கட்டுப்படுத்தும் மற்றும் நிலை இன்னும் சாத்தியமானதா எனச் சரிபார்க்கும்:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # நிலை சாத்தியமானது
```

### சுருக்கம்: கட்டுப்பாடுகளைச் சேர்த்தல் {#summary-adding-constraints}

முந்தைய குறியீட்டிற்கு கட்டுப்பாட்டைச் சேர்ப்பதன் மூலம், நாம் பெறுவது:

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

## ஒரு செயலாக்கம் REVERT அல்லது INVALID உடன் முடிவடைகிறதா என சரிபார்க்கவும்
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 ஆக இருக்கும் பாதையை நாங்கள் கருத்தில் கொள்ளவில்லை
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'பிழை கண்டறியப்பட்டது, முடிவுகள் {m.workspace} இல் உள்ளன')
            no_bug_found = False

if no_bug_found:
    print(f'பிழை எதுவும் கண்டறியப்படவில்லை')
```

மேலே உள்ள அனைத்து குறியீடுகளையும் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) இல் காணலாம்
