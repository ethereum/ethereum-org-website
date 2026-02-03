---
title: ERC-20 டோக்கன் தரநிலை
description: ERC-20 பற்றி அறிக, இது எத்தேரியத்தில் மாற்றத்தக்க டோக்கன்களுக்கான தரநிலையாகும், இது ஊடாடக்கூடிய டோக்கன் பயன்பாடுகளை செயல்படுத்துகிறது.
lang: ta
---

## அறிமுகம் {#introduction}

**டோக்கன் என்றால் என்ன?**

டோக்கன்கள் எத்தேரியத்தில் கிட்டத்தட்ட எதையும் குறிப்பிடலாம்:

- ஒரு ஆன்லைன் தளத்தில் உள்ள நற்பெயர் புள்ளிகள்
- ஒரு விளையாட்டில் ஒரு கதாபாத்திரத்தின் திறன்கள்
- ஒரு நிறுவனத்தில் உள்ள ஒரு பங்கு போன்ற நிதிச் சொத்துக்கள்
- USD போன்ற ஒரு ஃபியட் நாணயம்
- ஒரு அவுன்ஸ் தங்கம்
- மேலும் பல...

எத்தேரியத்தின் இத்தகைய சக்திவாய்ந்த அம்சம் ஒரு வலுவான தரநிலையால் கையாளப்பட வேண்டும், இல்லையா? சரியாக
இங்குதான் ERC-20 அதன் பங்கை வகிக்கிறது! இந்தத் தரநிலை, மற்ற தயாரிப்புகள் மற்றும் சேவைகளுடன் ஊடாடக்கூடிய டோக்கன் பயன்பாடுகளை உருவாக்க உருவாக்குநர்களை (டெவலப்பர்களை) அனுமதிக்கிறது. [ஈதருக்கு](/glossary/#ether) கூடுதல் செயல்பாட்டை வழங்க ERC-20 தரநிலையும் பயன்படுத்தப்படுகிறது.

**ERC-20 என்றால் என்ன?**

ERC-20 மாற்றத்தக்க டோக்கன்களுக்கான ஒரு தரநிலையை அறிமுகப்படுத்துகிறது, வேறுவிதமாகக் கூறினால், அவை ஒவ்வொரு டோக்கனையும் மற்றொரு டோக்கனைப் போலவே (வகை மற்றும் மதிப்பில்) சரியாக
ஒரே மாதிரியாக மாற்றும் ஒரு பண்பைக் கொண்டுள்ளன. உதாரணமாக, ஒரு ERC-20 டோக்கன் ETH போலவே செயல்படுகிறது, அதாவது 1 டோக்கன்
மற்ற எல்லா டோக்கன்களுக்கும் சமமாக இருக்கிறது மற்றும் எப்போதும் சமமாகவே இருக்கும்.

## முன்னேற்றக் கட்டுரை {#prerequisites}

- [கணக்குகள்](/developers/docs/accounts)
- [ஸ்மார்ட் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/)
- [டோக்கன் தரநிலைகள்](/developers/docs/standards/tokens/)

## உள்ளடக்கம் {#body}

நவம்பர் 2015 இல் ஃபேபியன் வோகல்ஸ்டெல்லரால் முன்மொழியப்பட்ட ERC-20 (Ethereum Request for Comments 20), என்பது ஸ்மார்ட் ஒப்பந்தங்களுக்குள் டோக்கன்களுக்கான ஒரு பயன்பாட்டு நிரலாக்க இடைமுகத்தை (API)
செயல்படுத்தும் ஒரு டோக்கன் தரநிலையாகும்.

ERC-20 வழங்கும் உதாரண செயல்பாடுகள்:

- ஒரு கணக்கிலிருந்து மற்றொரு கணக்கிற்கு டோக்கன்களைப் பரிமாற்றுதல்
- ஒரு கணக்கின் தற்போதைய டோக்கன் இருப்பைப் பெறுதல்
- நெட்வொர்க்கில் கிடைக்கும் டோக்கனின் மொத்த விநியோகத்தைப் பெறுதல்
- ஒரு கணக்கிலிருந்து ஒரு குறிப்பிட்ட அளவு டோக்கனை ஒரு மூன்றாம் தரப்புக் கணக்கு செலவழிக்க முடியுமா என்பதை அங்கீகரித்தல்

ஒரு ஸ்மார்ட் ஒப்பந்தம் பின்வரும் முறைகளையும் நிகழ்வுகளையும் செயல்படுத்தினால், அதை ERC-20 டோக்கன் ஒப்பந்தம் என அழைக்கலாம், மேலும், வரிசைப்படுத்தப்பட்டவுடன், அது
எத்தேரியத்தில் உருவாக்கப்பட்ட டோக்கன்களைக் கண்காணிக்கும் பொறுப்பை ஏற்கும்.

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

### உதாரணங்கள் {#web3py-example}

எத்தேரியத்தில் உள்ள எந்த ERC-20 டோக்கன் ஒப்பந்தத்தையும் ஆய்வு செய்வதை நமக்கு எளிதாக்குவதில் ஒரு தரநிலை எவ்வளவு முக்கியமானது என்பதைப் பார்ப்போம்.
எந்தவொரு ERC-20 டோக்கனுக்கும் ஒரு இடைமுகத்தை உருவாக்க, நமக்கு ஒப்பந்த பயன்பாட்டு பைனரி இடைமுகம் (ABI) மட்டுமே தேவை. நீங்கள் கீழே காண்பது போல்,
இதை ஒரு சிக்கலற்ற எடுத்துக்காட்டாக மாற்றுவதற்கு நாங்கள் ஒரு எளிமைப்படுத்தப்பட்ட ABI-ஐப் பயன்படுத்துவோம்.

#### Web3.py உதாரணம் {#web3py-example}

முதலில், நீங்கள் [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) பைத்தான் லைப்ரரியை நிறுவியுள்ளீர்கள் என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # சுற்றப்பட்ட ஈதர் (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

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

### ERC-20 டோக்கன் பெறும் சிக்கல் {#reception-issue}

\*\*06/20/2024 நிலவரப்படி, இந்தச் சிக்கலால் குறைந்தபட்சம் $83,656,418 மதிப்புள்ள ERC-20 டோக்கன்கள் இழக்கப்பட்டன. **கீழே பட்டியலிடப்பட்டுள்ளபடி, தரநிலையின் மேல் கூடுதல் கட்டுப்பாடுகளின் தொகுப்பைச் செயல்படுத்தாவிட்டால், ஒரு தூய ERC-20 செயலாக்கம் இந்தச் சிக்கலுக்கு ஆளாகக்கூடும் என்பதை நினைவில் கொள்க.**

ERC-20 டோக்கன்களைக் கையாள வடிவமைக்கப்படாத ஒரு ஸ்மார்ட் ஒப்பந்தத்திற்கு அவை அனுப்பப்படும்போது, அந்த டோக்கன்கள் நிரந்தரமாக இழக்கப்படலாம். உள்வரும் டோக்கன்களை அங்கீகரிக்க அல்லது பதிலளிப்பதற்கான செயல்பாடு பெறும் ஒப்பந்தத்தில் இல்லாததாலும், உள்வரும் டோக்கன்களைப் பற்றி பெறும் ஒப்பந்தத்திற்கு அறிவிக்க ERC-20 தரநிலையில் எந்த வழிமுறையும் இல்லாததாலும் இது நிகழ்கிறது. இந்தச் சிக்கல் பின்வரும் முக்கிய வழிகளில் உருவாகிறது:

1. டோக்கன் பரிமாற்ற வழிமுறை

- ERC-20 டோக்கன்கள் transfer அல்லது transferFrom செயல்பாடுகளைப் பயன்படுத்தி மாற்றப்படுகின்றன
  - ஒரு பயனர் இந்த செயல்பாடுகளைப் பயன்படுத்தி ஒரு ஒப்பந்த முகவரிக்கு டோக்கன்களை அனுப்பும்போது, பெறும் ஒப்பந்தம் அவற்றை கையாள வடிவமைக்கப்பட்டுள்ளதா என்பதைப் பொருட்படுத்தாமல் டோக்கன்கள் மாற்றப்படுகின்றன

2. அறிவிப்பு இல்லாமை
   - டோக்கன்கள் தனக்கு அனுப்பப்பட்டதற்கான அறிவிப்பையோ அல்லது கால்பேக்கையோ பெறும் ஒப்பந்தம் பெறுவதில்லை.
   - டோக்கன்களைக் கையாளும் ஒரு பொறிமுறை (எ.கா., ஒரு ஃபால்பேக் செயல்பாடு அல்லது டோக்கன் பெறுதலை நிர்வகிக்க ஒரு பிரத்யேக செயல்பாடு) பெறும் ஒப்பந்தத்தில் இல்லை என்றால், டோக்கன்கள் திறம்பட ஒப்பந்தத்தின் முகவரியில் சிக்கிக்கொள்கின்றன.
3. உள்ளமைக்கப்பட்ட கையாளுதல் இல்லை
   - ERC-20 தரநிலையானது பெறும் ஒப்பந்தங்கள் செயல்படுத்துவதற்கு ஒரு கட்டாயமான செயல்பாட்டை உள்ளடக்கவில்லை, இது பல ஒப்பந்தங்கள் உள்வரும் டோக்கன்களை முறையாக நிர்வகிக்க முடியாத சூழ்நிலைக்கு வழிவகுக்கிறது.

**சாத்தியமான தீர்வுகள்**

ERC-20 உடன் இந்தச் சிக்கலை முழுமையாகத் தடுக்க முடியாவிட்டாலும், இறுதிப் பயனருக்கான டோக்கன் இழப்புக்கான சாத்தியக்கூறுகளைக் கணிசமாகக் குறைக்க அனுமதிக்கும் முறைகள் உள்ளன:

- மிகவும் பொதுவான பிரச்சனை என்னவென்றால், ஒரு பயனர் டோக்கன்களை டோக்கன் ஒப்பந்த முகவரிக்கே அனுப்பும்போது (எ.கா., USDT டோக்கன் ஒப்பந்தத்தின் முகவரிக்கு USDT டெபாசிட் செய்யப்படுவது). அத்தகைய பரிமாற்ற முயற்சிகளைத் திரும்பப்பெற `transfer(..)` செயல்பாட்டைக் கட்டுப்படுத்தப் பரிந்துரைக்கப்படுகிறது. `transfer(..)` செயல்பாட்டின் செயலாக்கத்திற்குள் `require(_to != address(this));` சரிபார்ப்பைச் சேர்ப்பதைக் கவனியுங்கள்.
- பொதுவாக `transfer(..)` செயல்பாடானது ஒப்பந்தங்களுக்கு டோக்கன்களை டெபாசிட் செய்வதற்காக வடிவமைக்கப்படவில்லை. `approve(..) `& transferFrom(..)`முறை அதற்குப் பதிலாக ERC-20 டோக்கன்களை ஒப்பந்தங்களில் டெபாசிட் செய்யப் பயன்படுகிறது. பரிமாற்றச் செயல்பாட்டை கட்டுப்படுத்துவதன் மூலம், அதனுடன் எந்த ஒப்பந்தங்களுக்கும் டோக்கன்களை டெபாசிட் செய்வதைத் தடுக்க முடியும், இருப்பினும் இது`trasnfer(..)\` செயல்பாட்டின் மூலம் ஒப்பந்தங்களில் டோக்கன்களை டெபாசிட் செய்யலாம் என்று கருதும் ஒப்பந்தங்களுடன் (எ.கா., யூனிஸ்வாப் நீர்மைப் பூல்கள்) பொருந்தக்கூடிய தன்மையை உடைக்கக்கூடும்.
- உங்கள் ஒப்பந்தம் எப்போதாவது எதையும் பெற வேண்டும் என்று கருதப்படாவிட்டாலும் கூட, ERC-20 டோக்கன்கள் உங்கள் ஒப்பந்தத்தில் முடிவடையக்கூடும் என எப்போதும் கருதுங்கள். பெறுநரின் தரப்பிலிருந்து தற்செயலான வைப்புகளைத் தடுக்கவோ அல்லது நிராகரிக்கவோ வழியில்லை. தற்செயலாக டெபாசிட் செய்யப்பட்ட ERC-20 டோக்கன்களை மீட்டெடுக்க அனுமதிக்கும் ஒரு செயல்பாட்டைச் செயல்படுத்தப் பரிந்துரைக்கப்படுகிறது.
- மாற்று டோக்கன் தரநிலைகளைப் பயன்படுத்துவதைக் கருத்தில் கொள்ளுங்கள்.

இந்த சிக்கலில் இருந்து [ERC-223](/developers/docs/standards/tokens/erc-223) அல்லது [ERC-1363](/developers/docs/standards/tokens/erc-1363) போன்ற சில மாற்று தரநிலைகள் வந்துள்ளன.

## மேலும் வாசிக்க {#further-reading}

- [EIP-20: ERC-20 டோக்கன் தரநிலை](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - டோக்கன்கள்](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 டோக்கன்களுக்கான வழிகாட்டி](https://www.alchemy.com/overviews/erc20-solidity)

## மற்ற மாற்றத்தக்க டோக்கன் தரநிலைகள் {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - டோக்கனைஸ்டு வால்ட்கள்](/developers/docs/standards/tokens/erc-4626)
