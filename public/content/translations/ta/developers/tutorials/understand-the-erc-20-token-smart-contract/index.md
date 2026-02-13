---
title: "ERC-20 டோக்கன் ஸ்மார்ட் ஒப்பந்தத்தைப் புரிந்து கொள்ளுங்கள்"
description: "முழுமையான Solidity ஸ்மார்ட் ஒப்பந்த எடுத்துக்காட்டு மற்றும் விளக்கத்துடன் ERC-20 டோக்கன் தரநிலையை எவ்வாறு செயல்படுத்துவது என்பதை அறிக."
author: "jdourlens"
tags:
  [
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "டோக்கன்கள்",
    "திட்பம்",
    "erc-20"
  ]
skill: beginner
lang: ta
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

எத்தேரியமில் உள்ள மிக முக்கியமான [ஸ்மார்ட் ஒப்பந்தத் தரநிலைகளில்](/developers/docs/standards/) ஒன்று [ERC-20](/developers/docs/standards/tokens/erc-20/) என்று அழைக்கப்படுகிறது, இது மாற்றத்தக்க டோக்கன் செயலாக்கங்களுக்காக எத்தேரியம் பிளாக்செயினில் உள்ள அனைத்து ஸ்மார்ட் ஒப்பந்தங்களுக்கும் பயன்படுத்தப்படும் தொழில்நுட்பத் தரமாக உருவெடுத்துள்ளது.

ERC-20 அனைத்து மாற்றத்தக்க எத்தேரியம் டோக்கன்களும் பின்பற்ற வேண்டிய விதிகளின் பொதுவான பட்டியலை வரையறுக்கிறது. இதன் விளைவாக, இந்த டோக்கன் தரநிலை அனைத்து வகையான உருவாக்குநர்களுக்கும் பெரிய எத்தேரியம் அமைப்பிற்குள் புதிய டோக்கன்கள் எவ்வாறு செயல்படும் என்பதைத் துல்லியமாகக் கணிக்க உதவுகிறது. இது உருவாக்குநர்களின் பணிகளை எளிதாக்குகிறது, ஏனெனில் டோக்கன் விதிகளைப் பின்பற்றும் வரை, ஒவ்வொரு புதிய டோக்கன் வெளியிடப்படும் போதும் ஒவ்வொரு புதிய திட்டத்தையும் மீண்டும் செய்ய வேண்டியதில்லை என்பதை அறிந்து அவர்கள் தங்கள் வேலையைத் தொடரலாம்.

ஒரு இடைமுகமாக வழங்கப்படும், ஒரு ERC-20 செயல்படுத்த வேண்டிய செயல்பாடுகள் இங்கே உள்ளன. இடைமுகம் என்றால் என்ன என்பது பற்றி உங்களுக்குத் தெரியாவிட்டால்: [Solidity-இல் OOP புரோகிராமிங்](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) பற்றிய எங்கள் கட்டுரையைப் பார்க்கவும்.

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

ஒவ்வொரு செயல்பாடும் எதற்காக என்பது பற்றிய வரிக்கு வரி விளக்கம் இங்கே. இதற்குப் பிறகு, ERC-20 டோக்கனின் எளிய செயலாக்கத்தை நாங்கள் வழங்குவோம்.

## பெறுபவர்கள் {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

இருக்கும் டோக்கன்களின் அளவைத் திருப்பித் தருகிறது. இந்தச் செயல்பாடு ஒரு பெறுபவர் மற்றும் ஒப்பந்தத்தின் நிலையை மாற்றாது. Solidity-இல் மிதவைகள் இல்லை என்பதை நினைவில் கொள்ளுங்கள். எனவே பெரும்பாலான டோக்கன்கள் 18 தசமங்களை ஏற்றுக்கொள்கின்றன, மேலும் 1 டோக்கனுக்கு 1000000000000000000 எனப் பின்தொடரும் மொத்த வழங்கல் மற்றும் பிற முடிவுகளைத் தரும். ஒவ்வொரு டோக்கனுக்கும் 18 தசமங்கள் இல்லை, டோக்கன்களைக் கையாளும் போது நீங்கள் உண்மையில் கவனிக்க வேண்டிய ஒன்று இது.

```solidity
function balanceOf(address account) external view returns (uint256);
```

ஒரு முகவரி (`கணக்கு`) வைத்திருக்கும் டோக்கன்களின் அளவைத் திருப்பித் தருகிறது. இந்தச் செயல்பாடு ஒரு பெறுபவர் மற்றும் ஒப்பந்தத்தின் நிலையை மாற்றாது.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 தரநிலையானது ஒரு முகவரிக்கு மற்றொரு முகவரிக்கு அதிலிருந்து டோக்கன்களைப் பெறுவதற்கான கொடுப்பனவை வழங்க அனுமதிக்கிறது. `owner` சார்பாக `spender` செலவழிக்க அனுமதிக்கப்படும் மீதமுள்ள டோக்கன்களின் எண்ணிக்கையை இந்த பெறுபவர் வழங்குகிறார். இந்தச் செயல்பாடு ஒரு பெறுபவர் மற்றும் ஒப்பந்தத்தின் நிலையை மாற்றாது மற்றும் இயல்பாக 0ஐத் திருப்பித் தர வேண்டும்.

## செயல்பாடுகள் {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

செயல்பாட்டு அழைப்பாளர் முகவரியிலிருந்து (`msg.sender`) டோக்கன்களின் `தொகை`யை பெறுநர் முகவரிக்கு நகர்த்துகிறது. இந்தப் செயல்பாடு பின்னர் வரையறுக்கப்பட்ட `பரிமாற்ற` நிகழ்வை வெளியிடுகிறது. பரிமாற்றம் சாத்தியமானால் அது உண்மை என்று திரும்பும்.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

செயல்பாட்டு அழைப்பாளரின் (`msg.sender`) இருப்பில் இருந்து `spender` பரிமாற்ற அனுமதிக்கப்பட்ட `allowance` தொகையை அமைக்கவும். இந்தச் செயல்பாடு ஒப்புதல் நிகழ்வை வெளியிடுகிறது. கொடுப்பனவு வெற்றிகரமாக அமைக்கப்பட்டதா என்பதை செயல்பாடு வழங்குகிறது.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

`அனுமதி` பொறிமுறையைப் பயன்படுத்தி டோக்கன்களின் `தொகை`யை `அனுப்புநர்` இடமிருந்து `பெறுநர்`க்கு நகர்த்துகிறது. தொகை பின்னர் அழைப்பாளரின் கொடுப்பனவிலிருந்து கழிக்கப்படும். இந்தச் செயல்பாடு `பரிமாற்ற` நிகழ்வை வெளியிடுகிறது.

## நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

`from` முகவரியிலிருந்து `to` முகவரிக்கு டோக்கன்களின் அளவு (மதிப்பு) அனுப்பப்படும்போது இந்த நிகழ்வு வெளியிடப்படுகிறது.

புதிய டோக்கன்களை உருவாக்கும் பட்சத்தில், பரிமாற்றம் வழக்கமாக 0x00..0000 முகவரியிலிருந்து `இருந்து` செய்யப்படுகிறது, அதே சமயம் டோக்கன்களை எரிக்கும் போது பரிமாற்றம் 0x00..0000 க்கு `செய்யப்படுகிறது`.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

`செலவழிப்பவரால்` பயன்படுத்த `உரிமையாளரால்` டோக்கன்களின் அளவு (`மதிப்பு`) அங்கீகரிக்கப்படும்போது இந்த நிகழ்வு வெளியிடப்படுகிறது.

## ERC-20 டோக்கன்களின் அடிப்படைச் செயலாக்கம் {#a-basic-implementation-of-erc-20-tokens}

உங்கள் ERC-20 டோக்கனை அடிப்படையாகக் கொண்ட எளிய குறியீடு இங்கே:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

ERC-20 டோக்கன் தரநிலையின் மற்றொரு சிறந்த செயலாக்கம் [OpenZeppelin ERC-20 செயலாக்கம்](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) ஆகும்.
