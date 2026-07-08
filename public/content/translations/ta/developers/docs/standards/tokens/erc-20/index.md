---
title: "ERC-20 வில்லை தரநிலை"
description: "எத்திரியத்தில் பரிமாற்றத்தக்க வில்லைகளுக்கான தரநிலையான ERC-20 பற்றி அறிந்துகொள்ளுங்கள், இது இயங்குதன்மையுள்ள வில்லை பயன்பாடுகளைச் செயல்படுத்துகிறது."
lang: ta
---

## அறிமுகம் {#introduction}

**வில்லை என்றால் என்ன?**

[எத்திரியத்தில்](/) வில்லைகள் எதை வேண்டுமானாலும் குறிக்கலாம்:

- இணையத் தளத்தில் உள்ள நற்பெயர் புள்ளிகள்
- விளையாட்டில் உள்ள ஒரு கதாபாத்திரத்தின் திறன்கள்
- ஒரு நிறுவனத்தின் பங்கு போன்ற நிதிச் சொத்துகள்
- USD போன்ற ஃபியட் நாணயம்
- ஒரு அவுன்ஸ் தங்கம்
- மற்றும் பல...

எத்திரியத்தின் இத்தகைய சக்திவாய்ந்த அம்சம் ஒரு வலுவான தரநிலையால் கையாளப்பட வேண்டும், இல்லையா? அங்குதான் ERC-20 தனது பங்கை வகிக்கிறது! இந்தத் தரநிலை, பிற தயாரிப்புகள் மற்றும் சேவைகளுடன் இயங்குதன்மையுள்ள வில்லை பயன்பாடுகளை உருவாக்க உருவாக்குநர்களை அனுமதிக்கிறது. [ஈதருக்கு](/glossary/#ether) கூடுதல் செயல்பாட்டை வழங்கவும் ERC-20 தரநிலை பயன்படுத்தப்படுகிறது.

**ERC-20 என்றால் என்ன?**

ERC-20 பரிமாற்றத்தக்க வில்லைகளுக்கான (Fungible Tokens) ஒரு தரநிலையை அறிமுகப்படுத்துகிறது, வேறுவிதமாகக் கூறினால், ஒவ்வொரு வில்லையும் மற்றொரு வில்லைக்கு (வகை மற்றும் மதிப்பில்) சரியாக ஒரே மாதிரியாக இருக்கும் பண்பைக் கொண்டுள்ளன. எடுத்துக்காட்டாக, ஒரு ERC-20 வில்லை ETH போலவே செயல்படுகிறது, அதாவது 1 வில்லை எப்போதும் மற்ற அனைத்து வில்லைகளுக்கும் சமமாக இருக்கும்.

## முன்நிபந்தனைகள் {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [திறன் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [வில்லை தரநிலைகள்](/developers/docs/standards/tokens/)

## உள்ளடக்கம் {#body}

நவம்பர் 2015 இல் ஃபேபியன் வோகல்ஸ்டெல்லரால் (Fabian Vogelsteller) முன்மொழியப்பட்ட ERC-20 (Ethereum Request for Comments 20) என்பது திறன் ஒப்பந்தங்களுக்குள் வில்லைகளுக்கான API-ஐச் செயல்படுத்தும் ஒரு வில்லை தரநிலையாகும்.

ERC-20 வழங்கும் எடுத்துக்காட்டு செயல்பாடுகள்:

- ஒரு கணக்கிலிருந்து மற்றொரு கணக்கிற்கு வில்லைகளைப் பரிமாற்றம் செய்தல்
- ஒரு கணக்கின் தற்போதைய வில்லை இருப்பைப் பெறுதல்
- பிணையத்தில் கிடைக்கும் வில்லையின் மொத்த விநியோகத்தைப் பெறுதல்
- ஒரு கணக்கிலிருந்து குறிப்பிட்ட அளவு வில்லையை மூன்றாம் தரப்பு கணக்கு செலவிடலாமா என்பதற்கு ஒப்புதல் அளித்தல்

ஒரு திறன் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அதை ERC-20 வில்லை ஒப்பந்தம் என்று அழைக்கலாம், மேலும் அது பயன்படுத்தப்பட்டவுடன், எத்திரியத்தில் உருவாக்கப்பட்ட வில்லைகளைக் கண்காணிக்கும் பொறுப்பை அது ஏற்கும்.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) இலிருந்து:

### முறைகள் {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### எடுத்துக்காட்டுகள் {#web3py-example}

எத்திரியத்தில் உள்ள எந்தவொரு ERC-20 வில்லை ஒப்பந்தத்தையும் நாம் எளிதாக ஆய்வு செய்வதற்கு ஒரு தரநிலை எவ்வளவு முக்கியமானது என்பதைப் பார்ப்போம். எந்தவொரு ERC-20 வில்லைக்கும் ஒரு இடைமுகத்தை உருவாக்க நமக்கு ஒப்பந்தப் பயன்பாட்டு பைனரி இடைமுகம் (Contract Application Binary Interface - ABI) மட்டுமே தேவை. கீழே நீங்கள் காண்பது போல, இதைப் புரிந்துகொள்ள எளிதான எடுத்துக்காட்டாக மாற்ற, எளிமைப்படுத்தப்பட்ட ABI-ஐப் பயன்படுத்துவோம்.

#### Web3.py எடுத்துக்காட்டு {#web3py-example-2}

முதலில், நீங்கள் [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python நிரலகத்தை நிறுவியுள்ளீர்கள் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # பொதியப்பட்ட ஈதர் (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # யூனிஸ்வாப் V2: DAI 2

# இது ஒரு ERC-20 வில்லை ஒப்பந்தத்தின் எளிமையாக்கப்பட்ட ஒப்பந்த பயன்பாட்டு பைனரி இடைமுகம் (ABI) ஆகும்.
# இது balanceOf(address), decimals(), symbol() மற்றும் totalSupply() ஆகிய முறைகளை மட்டுமே வெளிப்படுத்தும்.
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## அறியப்பட்ட சிக்கல்கள் {#erc20-issues}

### ERC-20 வில்லை பெறுதல் சிக்கல் {#reception-issue}

**06/20/2024 நிலவரப்படி, இந்தச் சிக்கலால் குறைந்தது $83,656,418 மதிப்பிலான ERC-20 வில்லைகள் இழக்கப்பட்டுள்ளன. கீழே பட்டியலிடப்பட்டுள்ளபடி தரநிலையின் மேல் கூடுதல் கட்டுப்பாடுகளை நீங்கள் செயல்படுத்தாவிட்டால், ஒரு தூய்மையான ERC-20 செயலாக்கம் இந்தச் சிக்கலுக்கு ஆளாக நேரிடும் என்பதை நினைவில் கொள்க.**

ERC-20 வில்லைகளைக் கையாள வடிவமைக்கப்படாத ஒரு திறன் ஒப்பந்தத்திற்கு ERC-20 வில்லைகள் அனுப்பப்படும்போது, அந்த வில்லைகள் நிரந்தரமாக இழக்கப்படலாம். பெறும் ஒப்பந்தத்திற்கு உள்வரும் வில்லைகளை அடையாளம் காணவோ அல்லது பதிலளிக்கவோ செயல்பாடு இல்லாததாலும், உள்வரும் வில்லைகளைப் பற்றி பெறும் ஒப்பந்தத்திற்குத் தெரிவிக்க ERC-20 தரநிலையில் எந்த வழிமுறையும் இல்லாததாலும் இது நிகழ்கிறது. இந்தச் சிக்கல் உருவாகும் முக்கிய வழிகள்:

1.	வில்லை பரிமாற்ற வழிமுறை
  - ERC-20 வில்லைகள் transfer அல்லது transferFrom செயல்பாடுகளைப் பயன்படுத்திப் பரிமாற்றம் செய்யப்படுகின்றன
	-	பயனர் இந்தச் செயல்பாடுகளைப் பயன்படுத்தி ஒரு ஒப்பந்த முகவரிக்கு வில்லைகளை அனுப்பும்போது, பெறும் ஒப்பந்தம் அவற்றைக் கையாள வடிவமைக்கப்பட்டுள்ளதா என்பதைப் பொருட்படுத்தாமல் வில்லைகள் பரிமாற்றம் செய்யப்படுகின்றன
2.	அறிவிப்பு இல்லாமை
	-	பெறும் ஒப்பந்தத்திற்கு வில்லைகள் அனுப்பப்பட்டுள்ளன என்ற அறிவிப்போ அல்லது திரும்ப அழைப்போ (callback) கிடைப்பதில்லை
	-	பெறும் ஒப்பந்தத்தில் வில்லைகளைக் கையாளும் வழிமுறை (எ.கா., ஒரு பின்னடைவுச் செயல்பாடு அல்லது வில்லை பெறுதலை நிர்வகிக்க ஒரு பிரத்யேகச் செயல்பாடு) இல்லையென்றால், வில்லைகள் ஒப்பந்தத்தின் முகவரியில் சிக்கிக்கொள்ளும்
3.	உள்ளமைக்கப்பட்ட கையாளுதல் இல்லாமை
	-	ERC-20 தரநிலையானது பெறும் ஒப்பந்தங்கள் செயல்படுத்துவதற்கான கட்டாயச் செயல்பாட்டை உள்ளடக்கவில்லை, இதனால் பல ஒப்பந்தங்கள் உள்வரும் வில்லைகளைச் சரியாக நிர்வகிக்க முடியாத நிலை ஏற்படுகிறது

**சாத்தியமான தீர்வுகள்**

ERC-20 மூலம் இந்தச் சிக்கலை முழுமையாகத் தடுக்க முடியாது என்றாலும், இறுதிப் பயனருக்கு வில்லைகள் இழக்கப்படுவதற்கான சாத்தியக்கூறுகளைக் கணிசமாகக் குறைக்க அனுமதிக்கும் முறைகள் உள்ளன:

- பயனர் வில்லைகளை வில்லை ஒப்பந்த முகவரிக்கே அனுப்பும்போது (எ.கா., USDT வில்லை ஒப்பந்தத்தின் முகவரியில் USDT டெபாசிட் செய்யப்படுவது) மிகவும் பொதுவான சிக்கல் ஏற்படுகிறது. இத்தகைய பரிமாற்ற முயற்சிகளை மீளமை செய்ய `transfer(..)` செயல்பாட்டைக் கட்டுப்படுத்தப் பரிந்துரைக்கப்படுகிறது. `transfer(..)` செயல்பாட்டின் செயலாக்கத்திற்குள் `require(_to != address(this));` சரிபார்ப்பைச் சேர்ப்பதைக் கருத்தில் கொள்க.
- பொதுவாக `transfer(..)` செயல்பாடு ஒப்பந்தங்களில் வில்லைகளை டெபாசிட் செய்ய வடிவமைக்கப்படவில்லை. அதற்குப் பதிலாக ஒப்பந்தங்களில் ERC-20 வில்லைகளை டெபாசிட் செய்ய `approve(..) & transferFrom(..)` முறை பயன்படுத்தப்படுகிறது. எந்தவொரு ஒப்பந்தத்திலும் வில்லைகளை டெபாசிட் செய்வதை அனுமதிக்காதபடி பரிமாற்றச் செயல்பாட்டைக் கட்டுப்படுத்த முடியும், இருப்பினும் இது `transfer(..)` செயல்பாட்டைக் கொண்டு ஒப்பந்தங்களில் வில்லைகளை டெபாசிட் செய்யலாம் என்று கருதும் ஒப்பந்தங்களுடனான (எ.கா., யூனிஸ்வாப் நீர்மைத்தன்மை குளங்கள்) இணக்கத்தன்மையை உடைக்கக்கூடும்.
- உங்கள் ஒப்பந்தம் எதையும் பெறக்கூடாது என்றாலும், ERC-20 வில்லைகள் உங்கள் ஒப்பந்தத்தில் வந்து சேரலாம் என்று எப்போதும் கருதுங்கள். பெறுநரின் முனையில் தற்செயலான டெபாசிட்டுகளைத் தடுக்கவோ அல்லது நிராகரிக்கவோ எந்த வழியும் இல்லை. தற்செயலாக டெபாசிட் செய்யப்பட்ட ERC-20 வில்லைகளைப் பிரித்தெடுக்க அனுமதிக்கும் ஒரு செயல்பாட்டைச் செயல்படுத்தப் பரிந்துரைக்கப்படுகிறது.
- மாற்று வில்லை தரநிலைகளைப் பயன்படுத்துவதைக் கருத்தில் கொள்க.

இந்தச் சிக்கலிலிருந்து [ERC-223](/developers/docs/standards/tokens/erc-223) அல்லது [ERC-1363](/developers/docs/standards/tokens/erc-1363) போன்ற சில மாற்றுத் தரநிலைகள் வெளிவந்துள்ளன.

## மேலும் படிக்க {#further-reading}

- [EIP-20: ERC-20 வில்லை தரநிலை](https://eips.ethereum.org/EIPS/eip-20)
- [ஓப்பன்செப்பெலின் - வில்லைகள்](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ஓப்பன்செப்பெலின் - ERC-20 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 வில்லைகளுக்கான வழிகாட்டி](https://www.alchemy.com/overviews/erc20-solidity)

## பிற பரிமாற்றத்தக்க வில்லை தரநிலைகள் {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - வில்லைகளாக்கப்பட்ட பெட்டகங்கள் (Tokenized vaults)](/developers/docs/standards/tokens/erc-4626)

## பயிற்சிகள்: எத்திரியத்தில் ERC-20 உடன் உருவாக்குதல் {#tutorials}

- [ERC-20 ஒப்பந்த வழிகாட்டி](/developers/tutorials/erc20-annotated-code/) _– ஓப்பன்செப்பெலின் ERC-20 ஒப்பந்தச் செயலாக்கத்தின் வரிக்கு வரி விளக்கமளிக்கப்பட்ட வழிகாட்டி._
- [பாதுகாப்பு வளையங்களுடன் ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– பயனர்கள் பொதுவான தவறுகளைத் தவிர்க்க உதவ, ERC-20 வில்லைகளில் பாதுகாப்புகளை எவ்வாறு சேர்ப்பது._
- [Ethers.js ஐப் பயன்படுத்தி வில்லைகளை அனுப்புதல்](/developers/tutorials/send-token-ethersjs/) _– Ethers.js ஐப் பயன்படுத்தி ERC-20 வில்லைகளைப் பரிமாற்றம் செய்வதற்கான தொடக்கநிலையாளர்களுக்கான வழிகாட்டி._
- [மோசடி வில்லைகளால் பயன்படுத்தப்படும் சில தந்திரங்கள் மற்றும் அவற்றைக் கண்டறிவது எப்படி](/developers/tutorials/scam-token-tricks/) _– மோசடியான ERC-20 வில்லை வடிவங்கள் மற்றும் அவற்றை எவ்வாறு அடையாளம் காண்பது என்பது பற்றிய விரிவான பார்வை._