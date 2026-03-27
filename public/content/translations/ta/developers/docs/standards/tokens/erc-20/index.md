---
title: "ERC-20 டோக்கன் தரநிலை"
description: "Ethereum-இல் இயங்கக்கூடிய டோக்கன் பயன்பாடுகளைச் செயல்படுத்தும் பூஞ்சை டோக்கன்களுக்கான (fungible tokens) தரநிலையான ERC-20 பற்றி அறிக."
lang: ta
---

## அறிமுகம் {#introduction}

**டோக்கன் என்றால் என்ன?**

[Ethereum](/)-இல் டோக்கன்கள் எதை வேண்டுமானாலும் குறிக்கலாம்:

- ஆன்லைன் தளத்தில் உள்ள நற்பெயர் புள்ளிகள் (reputation points)
- ஒரு விளையாட்டில் உள்ள கதாபாத்திரத்தின் திறன்கள்
- ஒரு நிறுவனத்தின் பங்கு போன்ற நிதி சொத்துக்கள்
- USD போன்ற ஃபியட் நாணயம்
- ஒரு அவுன்ஸ் தங்கம்
- மற்றும் பல...

Ethereum-இன் இத்தகைய சக்திவாய்ந்த அம்சம் ஒரு வலுவான தரநிலையால் கையாளப்பட வேண்டும், இல்லையா? அங்குதான் ERC-20 தனது பங்கை வகிக்கிறது! இந்தத் தரநிலையானது மற்ற தயாரிப்புகள் மற்றும் சேவைகளுடன் இயங்கக்கூடிய டோக்கன் பயன்பாடுகளை உருவாக்க டெவலப்பர்களை அனுமதிக்கிறது. [ether](/glossary/#ether)-க்கு கூடுதல் செயல்பாட்டை வழங்கவும் ERC-20 தரநிலை பயன்படுத்தப்படுகிறது.

**ERC-20 என்றால் என்ன?**

ERC-20 ஃபங்கிபிள் டோக்கன்களுக்கான (Fungible Tokens) தரநிலையை அறிமுகப்படுத்துகிறது, வேறுவிதமாகக் கூறினால், ஒவ்வொரு டோக்கனும் மற்றொரு டோக்கனைப் போலவே (வகை மற்றும் மதிப்பில்) சரியாக இருக்கும் பண்பைக் கொண்டுள்ளன. எடுத்துக்காட்டாக, ஒரு ERC-20 டோக்கன் ETH-ஐப் போலவே செயல்படுகிறது, அதாவது 1 டோக்கன் எப்போதும் மற்ற அனைத்து டோக்கன்களுக்கும் சமமாக இருக்கும்.

## முன்நிபந்தனைகள் {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)

## உள்ளடக்கம் {#body}

நவம்பர் 2015 இல் Fabian Vogelsteller என்பவரால் முன்மொழியப்பட்ட ERC-20 (Ethereum Request for Comments 20) என்பது ஸ்மார்ட் ஒப்பந்தங்களுக்குள் டோக்கன்களுக்கான API-ஐச் செயல்படுத்தும் ஒரு டோக்கன் தரநிலையாகும்.

ERC-20 வழங்கும் எடுத்துக்காட்டு செயல்பாடுகள்:

- ஒரு கணக்கிலிருந்து மற்றொரு கணக்கிற்கு டோக்கன்களை மாற்றுதல்
- ஒரு கணக்கின் தற்போதைய டோக்கன் இருப்பைப் பெறுதல்
- நெட்வொர்க்கில் கிடைக்கும் டோக்கனின் மொத்த விநியோகத்தைப் பெறுதல்
- ஒரு கணக்கிலிருந்து ஒரு குறிப்பிட்ட அளவு டோக்கனை மூன்றாம் தரப்பு கணக்கு செலவழிக்க முடியுமா என்பதை அங்கீகரித்தல்

ஒரு ஸ்மார்ட் ஒப்பந்தம் பின்வரும் முறைகள் மற்றும் நிகழ்வுகளைச் செயல்படுத்தினால், அதை ERC-20 டோக்கன் ஒப்பந்தம் என்று அழைக்கலாம், மேலும் அது பயன்படுத்தப்பட்டவுடன், Ethereum-இல் உருவாக்கப்பட்ட டோக்கன்களைக் கண்காணிக்கும் பொறுப்பை அது ஏற்கும்.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20)-லிருந்து:

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

Ethereum-இல் உள்ள எந்தவொரு ERC-20 டோக்கன் ஒப்பந்தத்தையும் நாம் ஆய்வு செய்வதை எளிதாக்குவதற்கு ஒரு தரநிலை எவ்வளவு முக்கியமானது என்பதைப் பார்ப்போம். எந்தவொரு ERC-20 டோக்கனுக்கும் ஒரு இடைமுகத்தை (interface) உருவாக்க நமக்கு ஒப்பந்த பயன்பாட்டு பைனரி இடைமுகம் (Contract Application Binary Interface - ABI) மட்டுமே தேவை. கீழே நீங்கள் பார்ப்பது போல், இதைப் புரிந்துகொள்ள எளிதான எடுத்துக்காட்டாக மாற்ற, எளிமைப்படுத்தப்பட்ட ABI-ஐப் பயன்படுத்துவோம்.

#### Web3.py எடுத்துக்காட்டு {#web3py-example}

முதலில், நீங்கள் [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) பைதான் நூலகத்தை (Python library) நிறுவியுள்ளீர்கள் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F" # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" # ராப்ட் ஈதர் (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" # யூனிஸ்வாப் V2: DAI 2

# இது ஒரு ERC-20 டோக்கன் ஒப்பந்தத்தின் எளிமைப்படுத்தப்பட்ட ஒப்பந்த பயன்பாட்டு பைனரி இடைமுகம் (ABI) ஆகும்.
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

# DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

# WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## அறியப்பட்ட சிக்கல்கள் {#erc20-issues}

### ERC-20 டோக்கன் பெறுதல் சிக்கல் {#reception-issue}

**06/20/2024 நிலவரப்படி, இந்தச் சிக்கலால் குறைந்தது $83,656,418 மதிப்பிலான ERC-20 டோக்கன்கள் இழக்கப்பட்டுள்ளன. கீழே பட்டியலிடப்பட்டுள்ளபடி தரநிலையின் மேல் கூடுதல் கட்டுப்பாடுகளை நீங்கள் செயல்படுத்தாவிட்டால், தூய்மையான ERC-20 செயலாக்கம் இந்தச் சிக்கலுக்கு ஆளாக நேரிடும் என்பதை நினைவில் கொள்ளவும்.**

ERC-20 டோக்கன்களைக் கையாள வடிவமைக்கப்படாத ஸ்மார்ட் ஒப்பந்தத்திற்கு ERC-20 டோக்கன்கள் அனுப்பப்படும்போது, அந்த டோக்கன்கள் நிரந்தரமாக இழக்கப்படலாம். உள்வரும் டோக்கன்களை அடையாளம் காணவோ அல்லது பதிலளிக்கவோ பெறும் ஒப்பந்தத்திற்கு செயல்பாடு இல்லாததால் இது நிகழ்கிறது, மேலும் உள்வரும் டோக்கன்களைப் பற்றி பெறும் ஒப்பந்தத்திற்குத் தெரிவிக்க ERC-20 தரநிலையில் எந்த வழிமுறையும் இல்லை. இந்தச் சிக்கல் உருவாகும் முக்கிய வழிகள்:

1.	டோக்கன் பரிமாற்ற வழிமுறை
  - ERC-20 டோக்கன்கள் transfer அல்லது transferFrom செயல்பாடுகளைப் பயன்படுத்தி மாற்றப்படுகின்றன
	-	ஒரு பயனர் இந்தச் செயல்பாடுகளைப் பயன்படுத்தி ஒப்பந்த முகவரிக்கு டோக்கன்களை அனுப்பும்போது, பெறும் ஒப்பந்தம் அவற்றைக் கையாள வடிவமைக்கப்பட்டுள்ளதா என்பதைப் பொருட்படுத்தாமல் டோக்கன்கள் மாற்றப்படும்
2.	அறிவிப்பு இல்லாமை
	-	டோக்கன்கள் அனுப்பப்பட்டுள்ளன என்ற அறிவிப்பையோ அல்லது கால்பேக்கையோ (callback) பெறும் ஒப்பந்தம் பெறுவதில்லை
	-	பெறும் ஒப்பந்தத்தில் டோக்கன்களைக் கையாளும் வழிமுறை இல்லையென்றால் (எ.கா., ஃபால்பேக் செயல்பாடு அல்லது டோக்கன் பெறுதலை நிர்வகிப்பதற்கான பிரத்யேக செயல்பாடு), டோக்கன்கள் ஒப்பந்தத்தின் முகவரியில் சிக்கிக்கொள்ளும்
3.	உள்ளமைக்கப்பட்ட கையாளுதல் இல்லை
	-	ERC-20 தரநிலையானது பெறும் ஒப்பந்தங்கள் செயல்படுத்துவதற்கான கட்டாயச் செயல்பாட்டை உள்ளடக்கவில்லை, இதனால் பல ஒப்பந்தங்கள் உள்வரும் டோக்கன்களைச் சரியாக நிர்வகிக்க முடியாத சூழ்நிலைக்கு வழிவகுக்கிறது

**சாத்தியமான தீர்வுகள்**

ERC-20 மூலம் இந்தச் சிக்கலை முழுமையாகத் தடுக்க முடியாது என்றாலும், இறுதிப் பயனருக்கு டோக்கன்கள் இழக்கப்படுவதற்கான சாத்தியக்கூறுகளைக் கணிசமாகக் குறைக்க அனுமதிக்கும் முறைகள் உள்ளன:

- ஒரு பயனர் டோக்கன் ஒப்பந்த முகவரிக்கே டோக்கன்களை அனுப்பும்போது (எ.கா., USDT டோக்கன் ஒப்பந்தத்தின் முகவரியில் டெபாசிட் செய்யப்பட்ட USDT) மிகவும் பொதுவான சிக்கல் ஏற்படுகிறது. இத்தகைய பரிமாற்ற முயற்சிகளைத் திரும்பப் பெற `transfer(..)` செயல்பாட்டைக் கட்டுப்படுத்தப் பரிந்துரைக்கப்படுகிறது. `transfer(..)` செயல்பாட்டின் செயலாக்கத்திற்குள் `require(_to != address(this));` சரிபார்ப்பைச் சேர்ப்பதைக் கருத்தில் கொள்ளவும்.
- பொதுவாக `transfer(..)` செயல்பாடு ஒப்பந்தங்களில் டோக்கன்களை டெபாசிட் செய்ய வடிவமைக்கப்படவில்லை. அதற்குப் பதிலாக ERC-20 டோக்கன்களை ஒப்பந்தங்களில் டெபாசிட் செய்ய `approve(..) & transferFrom(..)` முறை பயன்படுத்தப்படுகிறது. எந்தவொரு ஒப்பந்தங்களுக்கும் டோக்கன்களை டெபாசிட் செய்வதை அனுமதிக்காதபடி பரிமாற்றச் செயல்பாட்டைக் கட்டுப்படுத்த முடியும், இருப்பினும் `transfer(..)` செயல்பாட்டைக் கொண்டு ஒப்பந்தங்களில் டோக்கன்களை டெபாசிட் செய்யலாம் என்று கருதும் ஒப்பந்தங்களுடனான இணக்கத்தன்மையை இது உடைக்கக்கூடும் (எ.கா., Uniswap லிக்விடிட்டி பூல்கள்).
- உங்கள் ஒப்பந்தம் எதையும் பெறக்கூடாது என்றாலும், ERC-20 டோக்கன்கள் உங்கள் ஒப்பந்தத்தில் வந்து சேரலாம் என்று எப்போதும் கருதுங்கள். பெறுநர்கள் முனையில் தற்செயலான டெபாசிட்டுகளைத் தடுக்கவோ அல்லது நிராகரிக்கவோ வழி இல்லை. தற்செயலாக டெபாசிட் செய்யப்பட்ட ERC-20 டோக்கன்களைப் பிரித்தெடுக்க அனுமதிக்கும் ஒரு செயல்பாட்டைச் செயல்படுத்தப் பரிந்துரைக்கப்படுகிறது.
- மாற்று டோக்கன் தரநிலைகளைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளவும்.

இந்தச் சிக்கலிலிருந்து [ERC-223](/developers/docs/standards/tokens/erc-223) அல்லது [ERC-1363](/developers/docs/standards/tokens/erc-1363) போன்ற சில மாற்றுத் தரநிலைகள் வெளிவந்துள்ளன.

## மேலும் படிக்க {#further-reading}

- [EIP-20: ERC-20 டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - டோக்கன்கள்](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 டோக்கன்களுக்கான வழிகாட்டி](https://www.alchemy.com/overviews/erc20-solidity)

## பிற ஃபங்கிபிள் டோக்கன் தரநிலைகள் {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - டோக்கனைஸ்டு வால்ட்கள் (Tokenized vaults)](/developers/docs/standards/tokens/erc-4626)

## பயிற்சிகள்: Ethereum-இல் ERC-20 உடன் உருவாக்குதல் {#tutorials}

- [ERC-20 ஒப்பந்த வழிகாட்டி](/developers/tutorials/erc20-annotated-code/) _– OpenZeppelin ERC-20 ஒப்பந்தச் செயலாக்கத்தின் வரிக்கு வரி விளக்கப்பட்ட வழிகாட்டி._
- [பாதுகாப்பு வளையங்களுடன் ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– பயனர்கள் பொதுவான தவறுகளைத் தவிர்க்க உதவும் வகையில் ERC-20 டோக்கன்களில் பாதுகாப்புகளை எவ்வாறு சேர்ப்பது._
- [ethers.js ஐப் பயன்படுத்தி டோக்கன்களை அனுப்புதல்](/developers/tutorials/send-token-ethersjs/) _– ethers.js ஐப் பயன்படுத்தி ERC-20 டோக்கன்களை மாற்றுவதற்கான தொடக்கநிலையாளர்-நட்பு வழிகாட்டி._
- [மோசடி டோக்கன்களால் பயன்படுத்தப்படும் சில தந்திரங்கள் மற்றும் அவற்றைக் கண்டறிவது எப்படி](/developers/tutorials/scam-token-tricks/) _– மோசடி ERC-20 டோக்கன் வடிவங்கள் மற்றும் அவற்றை எவ்வாறு அடையாளம் காண்பது என்பது பற்றிய ஆழமான பார்வை._