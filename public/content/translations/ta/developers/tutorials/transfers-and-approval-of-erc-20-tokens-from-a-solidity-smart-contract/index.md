---
title: Solidity திறன் ஒப்பந்தத்திலிருந்து ERC-20 வில்லைகளின் பரிமாற்றங்கள் மற்றும் ஒப்புதல்
description: Solidity-ஐப் பயன்படுத்தி ERC-20 வில்லை பரிமாற்றங்கள் மற்றும் ஒப்புதல்களைக் கையாளும் DEX திறன் ஒப்பந்தத்தை உருவாக்குங்கள்.
author: "jdourlens"
tags: ["திறன் ஒப்பந்தங்கள்", "வில்லைகள்", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 பரிமாற்றங்கள்
lang: ta
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

முந்தைய வழிகாட்டியில் எத்திரியம் தொகுதிச்சங்கிலியில் [Solidity-இல் உள்ள ERC-20 வில்லையின் அமைப்பை](/developers/tutorials/understand-the-erc-20-token-smart-contract/) நாங்கள் படித்தோம். இந்தக் கட்டுரையில், Solidity மொழியைப் பயன்படுத்தி ஒரு வில்லையுடன் தொடர்புகொள்ள திறன் ஒப்பந்தத்தை எவ்வாறு பயன்படுத்தலாம் என்பதைப் பார்ப்போம்.

இந்தத் திறன் ஒப்பந்தத்திற்காக, புதிதாக நிலைநிறுத்தப்பட்ட நமது [ERC-20 வில்லைக்கு](/developers/docs/standards/tokens/erc-20/) ஈதரை ஒரு பயனர் வர்த்தகம் செய்யக்கூடிய ஒரு உண்மையான மாதிரி பரவலாக்கப்பட்ட பரிமாற்றத்தை (decentralized exchange - DEX) உருவாக்குவோம்.

இந்த வழிகாட்டிக்காக, முந்தைய வழிகாட்டியில் நாங்கள் எழுதிய குறியீட்டை அடிப்படையாகப் பயன்படுத்துவோம். நமது DEX அதன் ஆக்கியில் ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கி, பின்வரும் செயல்பாடுகளைச் செய்யும்:

- வில்லைகளை ஈதராக மாற்றுதல்
- ஈதரை வில்லைகளாக மாற்றுதல்

நமது எளிய ERC20 குறியீட்டுத் தளத்தைச் சேர்ப்பதன் மூலம் நமது பரவலாக்கப்பட்ட பரிமாற்றக் குறியீட்டைத் தொடங்குவோம்:

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

நமது புதிய DEX திறன் ஒப்பந்தம் ERC-20-ஐ நிலைநிறுத்தி, வழங்கப்பட்ட அனைத்தையும் பெறும்:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // செய்ய வேண்டியவை
    }

    function sell(uint256 amount) public {
        // செய்ய வேண்டியவை
    }

}
```

எனவே இப்போது நம்மிடம் DEX உள்ளது, மேலும் அதில் அனைத்து வில்லை இருப்புகளும் உள்ளன. ஒப்பந்தம் இரண்டு செயல்பாடுகளைக் கொண்டுள்ளது:

- `buy`: பயனர் ஈதரை அனுப்பி அதற்குப் பதிலாக வில்லைகளைப் பெறலாம்
- `sell`: பயனர் வில்லைகளை அனுப்பி ஈதரைத் திரும்பப் பெற முடிவு செய்யலாம்

## buy செயல்பாடு {#the-buy-function}

buy செயல்பாட்டைக் குறியிடுவோம். செய்தி எவ்வளவு ஈதரைக் கொண்டுள்ளது என்பதை முதலில் சரிபார்த்து, ஒப்பந்தங்களில் போதுமான வில்லைகள் இருப்பதையும், செய்தியில் சிறிது ஈதர் இருப்பதையும் உறுதிசெய்ய வேண்டும். ஒப்பந்தத்தில் போதுமான வில்லைகள் இருந்தால், அது பயனருக்கு வில்லைகளின் எண்ணிக்கையை அனுப்பி `Bought` நிகழ்வை வெளியிடும்.

பிழை ஏற்பட்டால் require செயல்பாட்டை அழைத்தால், அனுப்பப்பட்ட ஈதர் நேரடியாகத் திரும்பப் பெறப்பட்டு பயனருக்குத் திருப்பித் தரப்படும் என்பதை நினைவில் கொள்ளவும்.

விஷயங்களை எளிமையாக வைத்திருக்க, 1 வில்லைக்கு 1 Wei-ஐப் பரிமாற்றம் செய்கிறோம்.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

வாங்குதல் வெற்றிகரமாக நடந்தால், பரிவர்த்தனையில் இரண்டு நிகழ்வுகளை நாம் காண வேண்டும்: வில்லை `Transfer` மற்றும் `Bought` நிகழ்வு.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell செயல்பாடு {#the-sell-function}

விற்பனைக்குப் பொறுப்பான செயல்பாடு, முதலில் approve செயல்பாட்டை அழைப்பதன் மூலம் பயனர் தொகையை ஒப்புதல் அளித்திருக்க வேண்டும். பரிமாற்றத்திற்கு ஒப்புதல் அளிக்க, DEX ஆல் உருவாக்கப்பட்ட ERC20Basic வில்லையைப் பயனர் அழைக்க வேண்டும். `token` எனப்படும் ERC20Basic ஒப்பந்தத்தை DEX எங்கு நிலைநிறுத்தியது என்ற முகவரியைப் பெற, முதலில் DEX ஒப்பந்தத்தின் `token()` செயல்பாட்டை அழைப்பதன் மூலம் இதை அடையலாம். பின்னர் நமது அமர்வில் அந்த ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கி, அதன் `approve` செயல்பாட்டை அழைக்கிறோம். அதன் பிறகு, DEX-இன் `sell` செயல்பாட்டை அழைத்து, நமது வில்லைகளை மீண்டும் ஈதராகப் பரிமாற்றம் செய்ய முடியும். எடுத்துக்காட்டாக, ஒரு ஊடாடும் Brownie அமர்வில் இது இப்படித்தான் இருக்கும்:

```python
#### ஊடாடும் Brownie கன்சோலில் Python...

# DEX ஐ நிலைநிறுத்துக
dex = DEX.deploy({'from':account1})

# ஈதரை வில்லைக்கு பரிமாற்றம் செய்ய buy சார்பை அழைக்கவும்
# 1e18 என்பது Wei-யில் குறிப்பிடப்பட்ட 1 ஈதர் ஆகும்
dex.buy({'from': account2, 1e18})

# ERC20 வில்லைக்கான நிலைநிறுத்துதல் முகவரியைப் பெறவும்
# அது DEX ஒப்பந்தம் உருவாக்கத்தின் போது நிலைநிறுத்தப்பட்டது
# dex.token() வில்லைக்கான நிலைநிறுத்தப்பட்ட முகவரியை வழங்குகிறது
token = ERC20Basic.at(dex.token())

# வில்லையின் approve சார்பை அழைக்கவும்
# dex முகவரியை செலவிடுபவராக ஒப்புதல் அளிக்கவும்
# மேலும் இது உங்களின் எத்தனை வில்லைகளை செலவிட அனுமதிக்கப்படுகிறது
token.approve(dex.address, 3e18, {'from':account2})

```

பின்னர் sell செயல்பாடு அழைக்கப்படும்போது, அழைப்பாளர் முகவரியிலிருந்து ஒப்பந்த முகவரிக்கு பரிமாற்றம் வெற்றிகரமாக நடந்ததா என்பதைச் சரிபார்த்து, ஈதர்களை அழைப்பாளர் முகவரிக்குத் திருப்பி அனுப்புவோம்.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

எல்லாம் சரியாக வேலை செய்தால், பரிவர்த்தனையில் 2 நிகழ்வுகளை (ஒரு `Transfer` மற்றும் `Sold`) நீங்கள் காண வேண்டும், மேலும் உங்கள் வில்லை இருப்பு மற்றும் ஈதர் இருப்பு புதுப்பிக்கப்பட்டிருக்கும்.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

இந்த வழிகாட்டியிலிருந்து, ERC-20 வில்லையின் இருப்பு மற்றும் அனுமதித்தொகையை எவ்வாறு சரிபார்ப்பது என்பதையும், இடைமுகத்தைப் பயன்படுத்தி ERC20 திறன் ஒப்பந்தத்தின் `Transfer` மற்றும் `TransferFrom` ஆகியவற்றை எவ்வாறு அழைப்பது என்பதையும் பார்த்தோம்.

நீங்கள் ஒரு பரிவர்த்தனையைச் செய்தவுடன், உங்கள் ஒப்பந்தத்தில் செய்யப்பட்ட [பரிவர்த்தனைகளுக்காகக் காத்திருந்து அவற்றைப் பற்றிய விவரங்களைப் பெற](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) ஒரு JavaScript வழிகாட்டியும், உங்களிடம் ABI இருக்கும் வரை [வில்லை பரிமாற்றங்கள் அல்லது வேறு ஏதேனும் நிகழ்வுகளால் உருவாக்கப்பட்ட நிகழ்வுகளை குறிவிலக்க ஒரு வழிகாட்டியும்](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) எங்களிடம் உள்ளன.

வழிகாட்டிக்கான முழுமையான குறியீடு இங்கே:

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```