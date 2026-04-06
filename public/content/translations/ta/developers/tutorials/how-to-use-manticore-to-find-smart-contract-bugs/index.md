---
title: "ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைக் கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது"
description: "ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகவே கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது"
author: "ட்ரெயில்ஆஃப்பிட்ஸ்"
lang: ta
tags:
  ["Solidity", "ஸ்மார்ட் ஒப்பந்தங்கள்", "பாதுகாப்பு", "சோதனை", "முறையான சரிபார்ப்பு"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

இந்த டுடோரியலின் நோக்கம், ஸ்மார்ட் ஒப்பந்தங்களில் உள்ள பிழைகளைத் தானாகவே கண்டறிய Manticore-ஐ எவ்வாறு பயன்படுத்துவது என்பதைக் காட்டுவதாகும்.

## நிறுவல் {#installation}

Manticore-க்கு >= python 3.6 தேவை. இதை pip மூலமாகவோ அல்லது docker-ஐப் பயன்படுத்தியோ நிறுவலாம்.

### docker மூலம் Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_கடைசி கட்டளை eth-security-toolbox-ஐ உங்கள் தற்போதைய கோப்பகத்திற்கான அணுகலைக் கொண்ட ஒரு docker-இல் இயக்குகிறது. உங்கள் ஹோஸ்டிலிருந்து கோப்புகளை மாற்றலாம், மேலும் docker-இலிருந்து கோப்புகளில் கருவிகளை இயக்கலாம்_

docker-இன் உள்ளே, இயக்கவும்:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip மூலம் Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 பரிந்துரைக்கப்படுகிறது.

### ஸ்கிரிப்டை இயக்குதல் {#running-a-script}

python 3 உடன் python ஸ்கிரிப்டை இயக்க:

```bash
python3 script.py
```

## டைனமிக் சிம்பாலிக் எக்ஸிகியூஷன் அறிமுகம் {#introduction-to-dynamic-symbolic-execution}

### சுருக்கமாக டைனமிக் சிம்பாலிக் எக்ஸிகியூஷன் {#dynamic-symbolic-execution-in-a-nutshell}

டைனமிக் சிம்பாலிக் எக்ஸிகியூஷன் (DSE) என்பது அதிக அளவிலான சொற்பொருள் விழிப்புணர்வுடன் (semantic awareness) ஒரு நிலை வெளியை (state space) ஆராயும் ஒரு நிரல் பகுப்பாய்வு நுட்பமாகும். இந்த நுட்பம் "நிரல் பாதைகளை" (program paths) கண்டுபிடிப்பதை அடிப்படையாகக் கொண்டது, இவை `path predicates` எனப்படும் கணித சூத்திரங்களாகக் குறிக்கப்படுகின்றன. கருத்தியல் ரீதியாக, இந்த நுட்பம் இரண்டு படிகளில் path predicates-இல் செயல்படுகிறது:

1. நிரலின் உள்ளீட்டின் மீதான கட்டுப்பாடுகளைப் பயன்படுத்தி அவை கட்டமைக்கப்படுகின்றன.
2. தொடர்புடைய பாதைகளைச் செயல்படுத்தச் செய்யும் நிரல் உள்ளீடுகளை உருவாக்க அவை பயன்படுத்தப்படுகின்றன.

அடையாளம் காணப்பட்ட அனைத்து நிரல் நிலைகளையும் கான்கிரீட் எக்ஸிகியூஷனின் போது தூண்ட முடியும் என்ற பொருளில் இந்த அணுகுமுறை தவறான நேர்மறைகளை (false positives) உருவாக்காது. எடுத்துக்காட்டாக, பகுப்பாய்வு ஒரு முழு எண் ஓவர்ஃப்ளோவைக் (integer overflow) கண்டறிந்தால், அதை மீண்டும் உருவாக்க முடியும் என்பது உறுதி.

### Path Predicate எடுத்துக்காட்டு {#path-predicate-example}

DSE எவ்வாறு செயல்படுகிறது என்பதைப் பற்றிய நுண்ணறிவைப் பெற, பின்வரும் எடுத்துக்காட்டைக் கவனியுங்கள்:

```solidity
function f(uint a){

  if (a == 65) {
      // ஒரு பிழை உள்ளது
  }

}
```

`f()` இரண்டு பாதைகளைக் கொண்டிருப்பதால், ஒரு DSE இரண்டு வெவ்வேறு path predicates-ஐ உருவாக்கும்:

- பாதை 1: `a == 65`
- பாதை 2: `Not (a == 65)`

ஒவ்வொரு path predicate-உம் ஒரு கணித சூத்திரமாகும், இதை [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) எனப்படும் ஒன்றிற்குக் கொடுக்கலாம், இது சமன்பாட்டைத் தீர்க்க முயற்சிக்கும். `பாதை 1`-க்கு, `a = 65` மூலம் பாதையை ஆராயலாம் என்று solver கூறும். `பாதை 2`-க்கு, solver `a`-க்கு 65-ஐத் தவிர வேறு எந்த மதிப்பையும் கொடுக்கலாம், எடுத்துக்காட்டாக `a = 0`.

### பண்புகளைச் சரிபார்த்தல் {#verifying-properties}

ஒவ்வொரு பாதையின் அனைத்து செயல்பாடுகளின் மீதும் முழுமையான கட்டுப்பாட்டை Manticore அனுமதிக்கிறது. இதன் விளைவாக, கிட்டத்தட்ட எதற்கும் தன்னிச்சையான கட்டுப்பாடுகளைச் சேர்க்க இது உங்களை அனுமதிக்கிறது. இந்தக் கட்டுப்பாடு ஒப்பந்தத்தில் பண்புகளை உருவாக்க அனுமதிக்கிறது.

பின்வரும் எடுத்துக்காட்டைக் கவனியுங்கள்:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // வழிதல் பாதுகாப்பு இல்லை
  return c;
}
```

இங்கே செயல்பாட்டில் ஆராய ஒரே ஒரு பாதை மட்டுமே உள்ளது:

- பாதை 1: `c = a + b`

Manticore-ஐப் பயன்படுத்தி, நீங்கள் ஓவர்ஃப்ளோவைச் சரிபார்க்கலாம், மேலும் path predicate-க்குக் கட்டுப்பாடுகளைச் சேர்க்கலாம்:

- `c = a + b AND (c < a OR c < b)`

மேலே உள்ள path predicate சாத்தியமானதாக இருக்கும் `a` மற்றும் `b`-இன் மதிப்பீட்டைக் கண்டறிய முடிந்தால், நீங்கள் ஒரு ஓவர்ஃப்ளோவைக் கண்டறிந்துள்ளீர்கள் என்று அர்த்தம். எடுத்துக்காட்டாக, solver `a = 10 , b = MAXUINT256` என்ற உள்ளீட்டை உருவாக்கலாம்.

நீங்கள் ஒரு நிலையான பதிப்பைக் கருத்தில் கொண்டால்:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ஓவர்ஃப்ளோ சரிபார்ப்புடன் தொடர்புடைய சூத்திரம்:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

இந்தச் சூத்திரத்தைத் தீர்க்க முடியாது; வேறு வார்த்தைகளில் கூறுவதானால், `safe_add`-இல் `c` எப்போதும் அதிகரிக்கும் என்பதற்கான **ஆதாரம்** இதுவாகும்.

DSE என்பது ஒரு சக்திவாய்ந்த கருவியாகும், இது உங்கள் குறியீட்டில் உள்ள தன்னிச்சையான கட்டுப்பாடுகளைச் சரிபார்க்க முடியும்.

## Manticore-இன் கீழ் இயக்குதல் {#running-under-manticore}

Manticore API மூலம் ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு ஆராய்வது என்பதைப் பார்ப்போம். இலக்கு பின்வரும் ஸ்மார்ட் ஒப்பந்தம் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### தனித்த ஆய்வை இயக்குதல் {#run-a-standalone-exploration}

பின்வரும் கட்டளை மூலம் நீங்கள் Manticore-ஐ நேரடியாக ஸ்மார்ட் ஒப்பந்தத்தில் இயக்கலாம் (`project` என்பது ஒரு Solidity கோப்பாகவோ அல்லது திட்டக் கோப்பகமாகவோ இருக்கலாம்):

```bash
$ manticore project
```

இது போன்ற சோதனை வழக்குகளின் (testcases) வெளியீட்டைப் பெறுவீர்கள் (வரிசை மாறலாம்):

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

கூடுதல் தகவல் இல்லாமல், ஒப்பந்தத்தில் புதிய பாதைகளை ஆராயாத வரை Manticore புதிய சிம்பாலிக் பரிவர்த்தனைகளுடன் ஒப்பந்தத்தை ஆராயும். தோல்வியுற்ற பரிவர்த்தனைக்குப் பிறகு (எ.கா: revert-க்குப் பிறகு) Manticore புதிய பரிவர்த்தனைகளை இயக்காது.

Manticore தகவலை `mcore_*` கோப்பகத்தில் வெளியிடும். மற்றவற்றுடன், இந்தக் கோப்பகத்தில் நீங்கள் காண்பீர்கள்:

- `global.summary`: கவரேஜ் மற்றும் கம்பைலர் எச்சரிக்கைகள்
- `test_XXXXX.summary`: கவரேஜ், கடைசி அறிவுறுத்தல், ஒவ்வொரு சோதனை வழக்குக்குமான கணக்கு நிலுவைகள்
- `test_XXXXX.tx`: ஒவ்வொரு சோதனை வழக்குக்குமான பரிவர்த்தனைகளின் விரிவான பட்டியல்

இங்கே Manticore 7 சோதனை வழக்குகளைக் கண்டறிந்துள்ளது, அவை பின்வருவனவற்றுடன் தொடர்புடையவை (கோப்புப் பெயர் வரிசை மாறலாம்):

|                      |   பரிவர்த்தனை 0   |   பரிவர்த்தனை 1   | பரிவர்த்தனை 2     | முடிவு |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | ஒப்பந்த உருவாக்கம் |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | ஒப்பந்த உருவாக்கம் | fallback function |                   | REVERT |
| **test_00000002.tx** | ஒப்பந்த உருவாக்கம் |                   |                   | RETURN |
| **test_00000003.tx** | ஒப்பந்த உருவாக்கம் |       f(65)       |                   | REVERT |
| **test_00000004.tx** | ஒப்பந்த உருவாக்கம் |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | ஒப்பந்த உருவாக்கம் |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | ஒப்பந்த உருவாக்கம் |      f(!=65)      | fallback function | REVERT |

_ஆய்வுச் சுருக்கம் f(!=65) என்பது 65-ஐத் தவிர வேறு எந்த மதிப்புடனும் f அழைக்கப்படுவதைக் குறிக்கிறது._

நீங்கள் கவனித்தபடி, ஒவ்வொரு வெற்றிகரமான அல்லது திரும்பப் பெறப்பட்ட (reverted) பரிவர்த்தனைக்கும் Manticore ஒரு தனித்துவமான சோதனை வழக்கை உருவாக்குகிறது.

விரைவான குறியீடு ஆய்வை நீங்கள் விரும்பினால் `--quick-mode` கொடியைப் பயன்படுத்தவும் (இது பிழைக் கண்டறிதல்கள், எரிவாயு கணக்கீடு போன்றவற்றை முடக்குகிறது...)

### API மூலம் ஸ்மார்ட் ஒப்பந்தத்தைக் கையாளுதல் {#manipulate-a-smart-contract-through-the-api}

Manticore Python API மூலம் ஸ்மார்ட் ஒப்பந்தத்தை எவ்வாறு கையாளுவது என்பது குறித்த விவரங்களை இந்தப் பகுதி விவரிக்கிறது. நீங்கள் python நீட்டிப்பு `*.py` உடன் புதிய கோப்பை உருவாக்கலாம் மற்றும் API கட்டளைகளை (இதன் அடிப்படைகள் கீழே விவரிக்கப்படும்) இந்தக் கோப்பில் சேர்ப்பதன் மூலம் தேவையான குறியீட்டை எழுதலாம், பின்னர் அதை `$ python3 *.py` கட்டளையுடன் இயக்கலாம். மேலும் நீங்கள் கீழே உள்ள கட்டளைகளை நேரடியாக python கன்சோலில் இயக்கலாம், கன்சோலை இயக்க `$ python3` கட்டளையைப் பயன்படுத்தவும்.

### கணக்குகளை உருவாக்குதல் {#creating-accounts}

நீங்கள் செய்ய வேண்டிய முதல் விஷயம், பின்வரும் கட்டளைகளுடன் புதிய பிளாக்செயினைத் தொடங்குவதாகும்:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

ஒப்பந்தம் அல்லாத கணக்கு [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)-ஐப் பயன்படுத்தி உருவாக்கப்படுகிறது:

```python
user_account = m.create_account(balance=1000)
```

[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)-ஐப் பயன்படுத்தி ஒரு Solidity ஒப்பந்தத்தைப் பயன்படுத்தலாம்:

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

#### சுருக்கம் {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) மற்றும் [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) மூலம் பயனர் மற்றும் ஒப்பந்தக் கணக்குகளை உருவாக்கலாம்.

### பரிவர்த்தனைகளைச் செயல்படுத்துதல் {#executing-transactions}

Manticore இரண்டு வகையான பரிவர்த்தனைகளை ஆதரிக்கிறது:

- Raw பரிவர்த்தனை: அனைத்து செயல்பாடுகளும் ஆராயப்படுகின்றன
- Named பரிவர்த்தனை: ஒரே ஒரு செயல்பாடு மட்டுமே ஆராயப்படுகிறது

#### Raw பரிவர்த்தனை {#raw-transaction}

ஒரு raw பரிவர்த்தனை [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction)-ஐப் பயன்படுத்திச் செயல்படுத்தப்படுகிறது:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

அழைப்பாளர், முகவரி, தரவு அல்லது பரிவர்த்தனையின் மதிப்பு கான்கிரீட் அல்லது சிம்பாலிக் ஆக இருக்கலாம்:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) ஒரு சிம்பாலிக் மதிப்பை உருவாக்குகிறது.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) ஒரு சிம்பாலிக் பைட் வரிசையை உருவாக்குகிறது.

எடுத்துக்காட்டாக:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

தரவு சிம்பாலிக் ஆக இருந்தால், பரிவர்த்தனைச் செயலாக்கத்தின் போது ஒப்பந்தத்தின் அனைத்து செயல்பாடுகளையும் Manticore ஆராயும். செயல்பாடு தேர்வு எவ்வாறு செயல்படுகிறது என்பதைப் புரிந்துகொள்ள [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) கட்டுரையில் உள்ள Fallback Function விளக்கத்தைப் பார்ப்பது உதவியாக இருக்கும்.

#### Named பரிவர்த்தனை {#named-transaction}

செயல்பாடுகளை அவற்றின் பெயர் மூலம் செயல்படுத்தலாம்.
`f(uint var)`-ஐ ஒரு சிம்பாலிக் மதிப்புடன், user_account-இலிருந்து, மற்றும் 0 ஈதருடன் செயல்படுத்த, இதைப் பயன்படுத்தவும்:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

பரிவர்த்தனையின் `value` குறிப்பிடப்படவில்லை என்றால், அது இயல்பாகவே 0 ஆக இருக்கும்.

#### சுருக்கம் {#summary-1}

- பரிவர்த்தனையின் வாதங்கள் கான்கிரீட் அல்லது சிம்பாலிக் ஆக இருக்கலாம்
- ஒரு raw பரிவர்த்தனை அனைத்து செயல்பாடுகளையும் ஆராயும்
- செயல்பாட்டை அவற்றின் பெயரால் அழைக்கலாம்

### பணியிடம் {#workspace}

உருவாக்கப்பட்ட அனைத்து கோப்புகளுக்கும் வெளியீட்டு கோப்பகமாகப் பயன்படுத்தப்படும் கோப்பகம் `m.workspace` ஆகும்:

```python
print("Results are in {}".format(m.workspace))
```

### ஆய்வை முடித்தல் {#terminate-the-exploration}

ஆய்வை நிறுத்த [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)-ஐப் பயன்படுத்தவும். இந்த முறை அழைக்கப்பட்டவுடன் மேற்கொண்டு எந்தப் பரிவர்த்தனைகளும் அனுப்பப்படக் கூடாது, மேலும் ஆராயப்பட்ட ஒவ்வொரு பாதைக்கும் Manticore சோதனை வழக்குகளை உருவாக்குகிறது.

### சுருக்கம்: Manticore-இன் கீழ் இயக்குதல் {#summary-running-under-manticore}

முந்தைய அனைத்து படிகளையும் ஒன்றாக இணைத்தால், நாம் பெறுவது:

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
m.finalize() # ஆய்வை நிறுத்துக
```

மேலே உள்ள அனைத்து குறியீடுகளையும் நீங்கள் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-இல் காணலாம்

## த்ரோயிங் பாதைகளைப் பெறுதல் {#getting-throwing-paths}

`f()`-இல் விதிவிலக்கை (exception) எழுப்பும் பாதைகளுக்கான குறிப்பிட்ட உள்ளீடுகளை இப்போது உருவாக்குவோம். இலக்கு இன்னும் பின்வரும் ஸ்மார்ட் ஒப்பந்தம் தான் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

செயல்படுத்தப்பட்ட ஒவ்வொரு பாதைக்கும் பிளாக்செயினின் நிலை உள்ளது. ஒரு நிலை தயாராக உள்ளது அல்லது அது கொல்லப்படுகிறது, அதாவது அது THROW அல்லது REVERT அறிவுறுத்தலை அடைகிறது:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): தயாராக உள்ள நிலைகளின் பட்டியல் (அவை REVERT/INVALID-ஐச் செயல்படுத்தவில்லை)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): கொல்லப்பட்ட நிலைகளின் பட்டியல்
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): அனைத்து நிலைகளும்

```python
for state in m.all_states:
    # நிலையுடன் ஏதேனும் செய்யவும்
```

நீங்கள் நிலைத் தகவலை அணுகலாம். எடுத்துக்காட்டாக:

- `state.platform.get_balance(account.address)`: கணக்கின் இருப்பு
- `state.platform.transactions`: பரிவர்த்தனைகளின் பட்டியல்
- `state.platform.transactions[-1].return_data`: கடைசிப் பரிவர்த்தனையால் வழங்கப்பட்ட தரவு

கடைசிப் பரிவர்த்தனையால் வழங்கப்பட்ட தரவு ஒரு வரிசையாகும், இதை ABI.deserialize மூலம் மதிப்பாக மாற்றலாம், எடுத்துக்காட்டாக:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### சோதனை வழக்கை எவ்வாறு உருவாக்குவது {#how-to-generate-testcase}

சோதனை வழக்கை உருவாக்க [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)-ஐப் பயன்படுத்தவும்:

```python
m.generate_testcase(state, 'BugFound')
```

### சுருக்கம் {#summary-2}

- m.all_states மூலம் நீங்கள் நிலையை மீண்டும் மீண்டும் செய்யலாம்
- `state.platform.get_balance(account.address)` கணக்கின் இருப்பை வழங்குகிறது
- `state.platform.transactions` பரிவர்த்தனைகளின் பட்டியலை வழங்குகிறது
- `transaction.return_data` என்பது வழங்கப்பட்ட தரவு
- `m.generate_testcase(state, name)` நிலைக்கான உள்ளீடுகளை உருவாக்குகிறது

### சுருக்கம்: த்ரோயிங் பாதையைப் பெறுதல் {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

# # ஒரு நிறைவேற்றம் REVERT அல்லது INVALID உடன் முடிகிறதா என சரிபார்க்கவும்
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

மேலே உள்ள அனைத்து குறியீடுகளையும் நீங்கள் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-இல் காணலாம்

_குறிப்பு: terminated_state மூலம் வழங்கப்பட்ட அனைத்து நிலைகளும் அவற்றின் முடிவில் REVERT அல்லது INVALID-ஐக் கொண்டிருப்பதால், நாம் மிகவும் எளிமையான ஸ்கிரிப்டை உருவாக்கியிருக்கலாம்: இந்த எடுத்துக்காட்டு API-ஐ எவ்வாறு கையாளுவது என்பதை விளக்குவதற்காக மட்டுமே._

## கட்டுப்பாடுகளைச் சேர்த்தல் {#adding-constraints}

ஆய்வை எவ்வாறு கட்டுப்படுத்துவது என்பதைப் பார்ப்போம். `f()`-இன் ஆவணங்கள் `a == 65` உடன் செயல்பாடு ஒருபோதும் அழைக்கப்படாது என்று கூறுவதாக நாம் கருதுவோம், எனவே `a == 65` உள்ள எந்தப் பிழையும் உண்மையான பிழை அல்ல. இலக்கு இன்னும் பின்வரும் ஸ்மார்ட் ஒப்பந்தம் தான் [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) தொகுதி கட்டுப்பாடுகளைக் கையாளுவதை எளிதாக்குகிறது, மற்றவற்றுடன் இது பின்வருவனவற்றை வழங்குகிறது:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

தொகுதியை இறக்குமதி செய்யப் பின்வருவனவற்றைப் பயன்படுத்தவும்:

```python
from manticore.core.smtlib import Operators
```

ஒரு வரிசையை ஒரு மதிப்புடன் இணைக்க `Operators.CONCAT` பயன்படுத்தப்படுகிறது. எடுத்துக்காட்டாக, ஒரு பரிவர்த்தனையின் return_data-ஐ மற்றொரு மதிப்புடன் சரிபார்க்க ஒரு மதிப்பாக மாற்ற வேண்டும்:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### கட்டுப்பாடுகள் {#state-constraint}

நீங்கள் கட்டுப்பாடுகளை உலகளாவிய ரீதியிலோ அல்லது ஒரு குறிப்பிட்ட நிலைக்கோ பயன்படுத்தலாம்.

#### உலகளாவிய கட்டுப்பாடு {#state-constraint}

உலகளாவிய கட்டுப்பாட்டைச் சேர்க்க `m.constrain(constraint)`-ஐப் பயன்படுத்தவும்.
எடுத்துக்காட்டாக, நீங்கள் ஒரு சிம்பாலிக் முகவரியிலிருந்து ஒரு ஒப்பந்தத்தை அழைக்கலாம், மேலும் இந்த முகவரியைக் குறிப்பிட்ட மதிப்புகளாகக் கட்டுப்படுத்தலாம்:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### நிலைக் கட்டுப்பாடு {#state-constraint}

ஒரு குறிப்பிட்ட நிலைக்குக் கட்டுப்பாட்டைச் சேர்க்க [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)-ஐப் பயன்படுத்தவும்.
அதன் மீது சில பண்புகளைச் சரிபார்க்க அதன் ஆய்வுக்குப் பிறகு நிலையைக் கட்டுப்படுத்த இதைப் பயன்படுத்தலாம்.

### கட்டுப்பாட்டைச் சரிபார்த்தல் {#checking-constraint}

ஒரு கட்டுப்பாடு இன்னும் சாத்தியமானதா என்பதை அறிய `solver.check(state.constraints)`-ஐப் பயன்படுத்தவும்.
எடுத்துக்காட்டாக, பின்வருபவை symbolic_value-ஐ 65-இலிருந்து வேறுபட்டதாகக் கட்டுப்படுத்தும் மற்றும் நிலை இன்னும் சாத்தியமானதா என்பதைச் சரிபார்க்கும்:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # நிலை சாத்தியமானது
```

### சுருக்கம்: கட்டுப்பாடுகளைச் சேர்த்தல் {#summary-adding-constraints}

முந்தைய குறியீட்டில் கட்டுப்பாட்டைச் சேர்த்தால், நாம் பெறுவது:

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

# # ஒரு நிறைவேற்றம் REVERT அல்லது INVALID உடன் முடிகிறதா என சரிபார்க்கவும்
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 ஆக இருக்கும் பாதையை நாங்கள் கருத்தில் கொள்ளவில்லை
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

மேலே உள்ள அனைத்து குறியீடுகளையும் நீங்கள் [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-இல் காணலாம்