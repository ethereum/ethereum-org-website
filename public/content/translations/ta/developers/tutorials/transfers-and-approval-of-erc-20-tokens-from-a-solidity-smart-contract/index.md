---
title: "ஒரு சாலிடிட்டி ஸ்மார்ட் ஒப்பந்தத்திலிருந்து ERC-20 டோக்கன்களின் இடமாற்றங்கள் மற்றும் ஒப்புதல்"
description: "சாலிடிட்டியைப் பயன்படுத்தி ERC-20 டோக்கன் இடமாற்றங்கள் மற்றும் ஒப்புதல்களைக் கையாளும் ஒரு DEX ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்குங்கள்."
author: "jdourlens"
tags:
  [
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "டோக்கன்கள்",
    "திட்பம்",
    "erc-20"
  ]
skill: intermediate
lang: ta
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

எத்தேரியம் பிளாக்செயினில் [சாலிடிட்டியில் ஒரு ERC-20 டோக்கனின் கட்டமைப்பு](/developers/tutorials/understand-the-erc-20-token-smart-contract/) பற்றி முந்தைய வழிகாட்டியில் நாம் படித்தோம். சாலிடிட்டி மொழியைப் பயன்படுத்தி ஒரு டோக்கனுடன் தொடர்பு கொள்ள ஒரு ஸ்மார்ட் ஒப்பந்தத்தை நாம் எப்படிப் பயன்படுத்தலாம் என்பதை இந்தக் கட்டுரையில் பார்ப்போம்.

இந்த ஸ்மார்ட் ஒப்பந்தத்திற்காக, நாங்கள் ஒரு உண்மையான மாதிரி பரவலாக்கப்பட்ட பரிமாற்றத்தை உருவாக்குவோம், அங்கு ஒரு பயனர் எங்கள் புதிதாக பயன்படுத்தப்பட்ட [ERC-20 டோக்கனுக்காக](/developers/docs/standards/tokens/erc-20/) ஈதரை வர்த்தகம் செய்யலாம்.

இந்த வழிகாட்டிக்கு, முந்தைய வழிகாட்டியில் நாங்கள் எழுதிய குறியீட்டை ஒரு அடிப்படையாகப் பயன்படுத்துவோம். எங்கள் DEX அதன் கட்டமைப்பாளரில் ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கி பின்வரும் செயல்பாடுகளைச் செய்யும்:

- டோக்கன்களை ஈதராக மாற்றுதல்
- ஈதரை டோக்கன்களாக மாற்றுதல்

எங்கள் எளிய ERC20 குறியீட்டுத் தளத்தைச் சேர்ப்பதன் மூலம் எங்கள் பரவலாக்கப்பட்ட பரிமாற்றக் குறியீட்டைத் தொடங்குவோம்:

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

எங்கள் புதிய DEX ஸ்மார்ட் ஒப்பந்தம் ERC-20 ஐப் பயன்படுத்தும் மற்றும் வழங்கப்பட்ட அனைத்தையும் பெறும்:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // செய்ய வேண்டும்
    }

    function sell(uint256 amount) public {
        // செய்ய வேண்டும்
    }

}
```

எனவே இப்போது எங்களிடம் எங்கள் DEX உள்ளது மற்றும் அதில் அனைத்து டோக்கன் இருப்புக்களும் கிடைக்கின்றன. ஒப்பந்தத்தில் இரண்டு செயல்பாடுகள் உள்ளன:

- `வாங்கு`: பயனர் ஈதரை அனுப்பி, பரிமாற்றமாக டோக்கன்களைப் பெறலாம்
- `விற்`: பயனர் ஈதரைத் திரும்பப் பெற டோக்கன்களை அனுப்ப முடிவு செய்யலாம்

## வாங்கும் செயல்பாடு {#the-buy-function}

வாங்கும் செயல்பாட்டைக் குறியீடு செய்வோம். முதலில் மெசேஜில் உள்ள ஈதரின் அளவைச் சரிபார்க்க வேண்டும் மற்றும் ஒப்பந்தங்கள் போதுமான டோக்கன்களை வைத்திருக்கின்றனவா என்பதையும் அந்த மெசேஜில் சிறிது ஈதர் உள்ளதா என்பதையும் சரிபார்க்க வேண்டும். ஒப்பந்தத்தில் போதுமான டோக்கன்கள் இருந்தால், அது பயனருக்கு டோக்கன்களின் எண்ணிக்கையை அனுப்பி `Bought` நிகழ்வை வெளியிடும்.

பிழை ஏற்பட்டால், நாம் require செயல்பாட்டை அழைத்தால், அனுப்பப்பட்ட ஈதர் நேரடியாகத் திரும்பப் பெறப்பட்டு பயனருக்குத் திருப்பித் தரப்படும் என்பதை நினைவில் கொள்ளவும்.

விஷயங்களை எளிமையாக வைத்திருக்க, நாங்கள் 1 டோக்கனை 1 Weiக்கு பரிமாறிக்கொள்கிறோம்.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "நீங்கள் சிறிது ஈதரை அனுப்ப வேண்டும்");
    require(amountTobuy <= dexBalance, "இருப்பில் போதுமான டோக்கன்கள் இல்லை");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

வாங்குதல் வெற்றிகரமாக இருக்கும் பட்சத்தில், பரிவர்த்தனையில் இரண்டு நிகழ்வுகளை நாம் காண வேண்டும்: டோக்கன் `Transfer` மற்றும் `Bought` நிகழ்வு.

![பரிவர்த்தனையில் இரண்டு நிகழ்வுகள்: Transfer மற்றும் Bought](./transfer-and-bought-events.png)

## விற்கும் செயல்பாடு {#the-sell-function}

விற்பனைக்குப் பொறுப்பான செயல்பாட்டிற்கு, பயனர் முன்கூட்டியே approve செயல்பாட்டை அழைப்பதன் மூலம் தொகையை அங்கீகரித்திருக்க வேண்டும். இடமாற்றத்திற்கு ஒப்புதல் அளிக்க, DEX ஆல் உருவாக்கப்பட்ட ERC20Basic டோக்கன் பயனரால் அழைக்கப்பட வேண்டும். DEX, `token` எனப்படும் ERC20Basic ஒப்பந்தத்தை எங்கு பயன்படுத்தியது என்ற முகவரியைப் பெற, முதலில் DEX ஒப்பந்தத்தின் `token()` செயல்பாட்டை அழைப்பதன் மூலம் இதைச் செய்யலாம். பின்னர் எங்கள் அமர்வில் அந்த ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கி அதன் `approve` செயல்பாட்டை அழைக்கிறோம். பின்னர் நாம் DEX இன் `sell` செயல்பாட்டை அழைத்து எங்கள் டோக்கன்களை மீண்டும் ஈதருக்கு மாற்றிக்கொள்ளலாம். உதாரணமாக, இது ஒரு ஊடாடும் பிரவுனி அமர்வில் எப்படி இருக்கும் என்பது இங்கே:

```python
#### ஊடாடும் பிரவுனி கன்சோலில் பைத்தான்...

# DEX ஐ பயன்படுத்தவும்
dex = DEX.deploy({'from':account1})

# டோக்கனுக்காக ஈதரை மாற்ற buy செயல்பாட்டை அழைக்கவும்
# 1e18 என்பது wei இல் குறிப்பிடப்பட்ட 1 ஈதர் ஆகும்
dex.buy({'from': account2, 1e18})

# ERC20 டோக்கனுக்கான பயன்பாட்டு முகவரியைப் பெறவும்
# DEX ஒப்பந்தம் உருவாக்கத்தின் போது பயன்படுத்தப்பட்டது
# dex.token() டோக்கனுக்கான பயன்படுத்தப்பட்ட முகவரியை வழங்குகிறது
token = ERC20Basic.at(dex.token())

# டோக்கனின் approve செயல்பாட்டை அழைக்கவும்
# dex முகவரியை செலவழிப்பாளராக அங்கீகரிக்கவும்
# மற்றும் உங்கள் டோக்கன்களில் எத்தனை செலவழிக்க அனுமதிக்கப்படுகிறது
token.approve(dex.address, 3e18, {'from':account2})

```

பின்னர் sell செயல்பாடு அழைக்கப்படும் போது, அழைப்பாளர் முகவரியிலிருந்து ஒப்பந்த முகவரிக்கு இடமாற்றம் வெற்றிகரமாக இருந்ததா என்பதை நாங்கள் சரிபார்த்து, பின்னர் ஈதர்களை மீண்டும் அழைப்பாளர் முகவரிக்கு அனுப்புவோம்.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "நீங்கள் குறைந்தபட்சம் சில டோக்கன்களையாவது விற்க வேண்டும்");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "டோக்கன் அனுமதியைச் சரிபார்க்கவும்");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

எல்லாம் சரியாக வேலை செய்தால், பரிவர்த்தனையில் 2 நிகழ்வுகளை (`Transfer` மற்றும் `Sold`) நீங்கள் காண வேண்டும் மற்றும் உங்கள் டோக்கன் இருப்பு மற்றும் ஈதர் இருப்பு புதுப்பிக்கப்படும்.

![பரிவர்த்தனையில் இரண்டு நிகழ்வுகள்: Transfer மற்றும் Sold](./transfer-and-sold-events.png)

<Divider />

இந்த வழிகாட்டியிலிருந்து, ஒரு ERC-20 டோக்கனின் இருப்பு மற்றும் அனுமதியை எவ்வாறு சரிபார்ப்பது என்றும், இடைமுகத்தைப் பயன்படுத்தி ஒரு ERC20 ஸ்மார்ட் ஒப்பந்தத்தின் `Transfer` மற்றும் `TransferFrom` ஐ எவ்வாறு அழைப்பது என்றும் பார்த்தோம்.

நீங்கள் ஒரு பரிவர்த்தனை செய்தவுடன், உங்கள் ஒப்பந்தத்திற்கு செய்யப்பட்ட [பரிவர்த்தனைகளைப் பற்றி காத்திருந்து விவரங்களைப் பெற](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) எங்களிடம் ஒரு ஜாவாஸ்கிரிப்ட் வழிகாட்டி உள்ளது, மேலும் உங்களிடம் ABI இருக்கும் வரை [டோக்கன் இடமாற்றங்கள் அல்லது வேறு எந்த நிகழ்வுகளாலும் உருவாக்கப்பட்ட நிகழ்வுகளை டிகோட் செய்வதற்கான வழிகாட்டி](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) உள்ளது.

வழிகாட்டியின் முழுமையான குறியீடு இங்கே:

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
        require(amountTobuy > 0, "நீங்கள் சிறிது ஈதரை அனுப்ப வேண்டும்");
        require(amountTobuy <= dexBalance, "இருப்பில் போதுமான டோக்கன்கள் இல்லை");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "நீங்கள் குறைந்தபட்சம் சில டோக்கன்களையாவது விற்க வேண்டும்");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "டோக்கன் அனுமதியைச் சரிபார்க்கவும்");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
