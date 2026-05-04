---
title: "ERC-20 டோக்கன் ஸ்மார்ட் ஒப்பந்தத்தைப் புரிந்துகொள்ளுதல்"
description: "முழுமையான Solidity ஸ்மார்ட் ஒப்பந்த உதாரணம் மற்றும் விளக்கத்துடன் ERC-20 டோக்கன் தரநிலையை எவ்வாறு செயல்படுத்துவது என்பதை அறிக."
author: "jdourlens"
tags: ["ஸ்மார்ட் ஒப்பந்தங்கள்", "டோக்கன்கள்", "Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20 டோக்கன் அடிப்படைகள்"
lang: ta
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum இல் உள்ள மிக முக்கியமான [ஸ்மார்ட் ஒப்பந்தத் தரநிலைகளில்](/developers/docs/standards/) ஒன்று [ERC-20](/developers/docs/standards/tokens/erc-20/) என அழைக்கப்படுகிறது, இது பூஞ்சையக்கூடிய (fungible) டோக்கன் செயலாக்கங்களுக்காக Ethereum பிளாக்செயினில் உள்ள அனைத்து ஸ்மார்ட் ஒப்பந்தங்களுக்கும் பயன்படுத்தப்படும் தொழில்நுட்பத் தரநிலையாக உருவெடுத்துள்ளது.

அனைத்து பூஞ்சையக்கூடிய Ethereum டோக்கன்களும் பின்பற்ற வேண்டிய பொதுவான விதிகளின் பட்டியலை ERC-20 வரையறுக்கிறது. இதன் விளைவாக, இந்த டோக்கன் தரநிலையானது, பெரிய Ethereum அமைப்பிற்குள் புதிய டோக்கன்கள் எவ்வாறு செயல்படும் என்பதைத் துல்லியமாகக் கணிக்க அனைத்து வகையான டெவலப்பர்களுக்கும் அதிகாரம் அளிக்கிறது. இது டெவலப்பர்களின் பணிகளை எளிதாக்குகிறது, ஏனெனில் டோக்கன் விதிகளைப் பின்பற்றும் வரை, ஒவ்வொரு புதிய டோக்கன் வெளியிடப்படும் போதும் ஒவ்வொரு புதிய திட்டத்தையும் மீண்டும் செய்ய வேண்டியதில்லை என்பதை அறிந்து அவர்கள் தங்கள் வேலையைத் தொடரலாம்.

ERC-20 செயல்படுத்த வேண்டிய செயல்பாடுகள் இங்கே ஒரு இடைமுகமாக (interface) வழங்கப்பட்டுள்ளன. இடைமுகம் என்றால் என்னவென்று உங்களுக்குத் தெரியாவிட்டால்: [OOP programming in Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) பற்றிய எங்கள் கட்டுரையைப் பார்க்கவும்.

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

ஒவ்வொரு செயல்பாடும் எதற்காக என்பதைப் பற்றிய வரிக்கு வரி விளக்கம் இங்கே உள்ளது. இதற்குப் பிறகு ERC-20 டோக்கனின் எளிய செயலாக்கத்தை வழங்குவோம்.

## Getters {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

இருப்பில் உள்ள டோக்கன்களின் அளவை வழங்குகிறது. இந்தச் செயல்பாடு ஒரு getter ஆகும், மேலும் இது ஒப்பந்தத்தின் நிலையை மாற்றாது. Solidity இல் மிதவை எண்கள் (floats) இல்லை என்பதை நினைவில் கொள்ளவும். எனவே பெரும்பாலான டோக்கன்கள் 18 தசமங்களை ஏற்றுக்கொள்கின்றன, மேலும் 1 டோக்கனுக்கு 1000000000000000000 என மொத்த விநியோகத்தையும் பிற முடிவுகளையும் வழங்கும். ஒவ்வொரு டோக்கனுக்கும் 18 தசமங்கள் இருக்காது, டோக்கன்களைக் கையாளும் போது நீங்கள் இதை மிகவும் கவனிக்க வேண்டும்.

```solidity
function balanceOf(address account) external view returns (uint256);
```

ஒரு முகவரிக்குச் (`account`) சொந்தமான டோக்கன்களின் அளவை வழங்குகிறது. இந்தச் செயல்பாடு ஒரு getter ஆகும், மேலும் இது ஒப்பந்தத்தின் நிலையை மாற்றாது.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 தரநிலையானது ஒரு முகவரியிலிருந்து டோக்கன்களை மீட்டெடுக்க மற்றொரு முகவரிக்கு அனுமதி வழங்க அனுமதிக்கிறது. இந்த getter, `owner` சார்பாகச் செலவழிக்க `spender` அனுமதிக்கப்படும் மீதமுள்ள டோக்கன்களின் எண்ணிக்கையை வழங்குகிறது. இந்தச் செயல்பாடு ஒரு getter ஆகும், மேலும் இது ஒப்பந்தத்தின் நிலையை மாற்றாது, இயல்பாகவே 0 ஐ வழங்க வேண்டும்.

## செயல்பாடுகள் {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

செயல்பாட்டை அழைப்பவரின் முகவரியிலிருந்து (`msg.sender`) பெறுநரின் முகவரிக்கு டோக்கன்களின் `amount` ஐ நகர்த்துகிறது. இந்தச் செயல்பாடு பின்னர் வரையறுக்கப்பட்ட `Transfer` நிகழ்வை வெளியிடுகிறது. பரிமாற்றம் சாத்தியமானால் இது true என்பதை வழங்கும்.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

செயல்பாட்டை அழைப்பவரின் (`msg.sender`) இருப்பிலிருந்து `spender` மாற்ற அனுமதிக்கப்படும் `allowance` அளவை அமைக்கிறது. இந்தச் செயல்பாடு Approval நிகழ்வை வெளியிடுகிறது. அனுமதி வெற்றிகரமாக அமைக்கப்பட்டதா என்பதை இந்தச் செயல்பாடு வழங்குகிறது.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

அனுமதி பொறிமுறையைப் பயன்படுத்தி `sender` இடமிருந்து `recipient` க்கு டோக்கன்களின் `amount` ஐ நகர்த்துகிறது. பின்னர் அழைப்பாளரின் அனுமதியிலிருந்து அந்த அளவு கழிக்கப்படும். இந்தச் செயல்பாடு `Transfer` நிகழ்வை வெளியிடுகிறது.

## நிகழ்வுகள் {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

டோக்கன்களின் அளவு (மதிப்பு) `from` முகவரியிலிருந்து `to` முகவரிக்கு அனுப்பப்படும்போது இந்த நிகழ்வு வெளியிடப்படுகிறது.

புதிய டோக்கன்களை உருவாக்கும் (minting) போது, பரிமாற்றம் பொதுவாக 0x00..0000 முகவரியிலிருந்து (`from`) இருக்கும், அதே சமயம் டோக்கன்களை எரிக்கும் (burning) போது பரிமாற்றம் 0x00..0000 முகவரிக்கு (`to`) இருக்கும்.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

`spender` பயன்படுத்துவதற்காக `owner` ஆல் டோக்கன்களின் அளவு (`value`) அங்கீகரிக்கப்படும்போது இந்த நிகழ்வு வெளியிடப்படுகிறது.

## ERC-20 டோக்கன்களின் அடிப்படைச் செயலாக்கம் {#a-basic-implementation-of-erc-20-tokens}

உங்கள் ERC-20 டோக்கனை அடிப்படையாகக் கொண்ட மிக எளிய குறியீடு இங்கே:

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

ERC-20 டோக்கன் தரநிலையின் மற்றொரு சிறந்த செயலாக்கம் [OpenZeppelin ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) ஆகும்.