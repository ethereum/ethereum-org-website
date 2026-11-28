---
title: "Solidity திறன் ஒப்பந்தத்திலிருந்து ERC-20 வில்லைகளின் பரிமாற்றங்கள் மற்றும் ஒப்புதல்"
description: "Solidity-ஐப் பயன்படுத்தி ERC-20 வில்லை பரிமாற்றங்கள் மற்றும் ஒப்புதல்களைக் கையாளும் DEX திறன் ஒப்பந்தத்தை உருவாக்குங்கள்."
author: "jdourlens"
tags: ["திறன் ஒப்பந்தங்கள்", "வில்லைகள்", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "ERC-20 பரிமாற்றங்கள்"
lang: ta
published: 2020-04-07
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

முந்தைய பயிற்சியில் எத்திரியம் தொகுதிச்சங்கிலியில் [Solidity-இல் உள்ள ERC-20 வில்லைகளின் உடற்கூறியல்](/developers/tutorials/erc20-annotated-code/) பற்றிப் படித்தோம். இந்தக் கட்டுரையில், Solidity மொழியைப் பயன்படுத்தி ஒரு வில்லையுடன் தொடர்புகொள்ள திறன் ஒப்பந்தத்தை எவ்வாறு பயன்படுத்தலாம் என்பதைப் பார்ப்போம்.

இந்தத் திறன் ஒப்பந்தத்திற்காக, புதிதாக நிலைநிறுத்தப்பட்ட [ERC-20 வில்லைக்கு](/developers/docs/standards/tokens/erc-20/) ஈதரை பயனர் வர்த்தகம் செய்யக்கூடிய ஒரு உண்மையான மாதிரி பரவலாக்கப்பட்ட பரிமாற்றத்தை உருவாக்குவோம்.

இந்தப் பயிற்சிக்காக, குறைந்தபட்ச ERC-20 செயலாக்கத்தை அடிப்படையாகப் பயன்படுத்துவோம். எங்கள் DEX அதன் ஆக்கியில் ஒப்பந்தத்தின் ஒரு நிகழ்வை உருவாக்கி, பின்வரும் செயல்பாடுகளைச் செய்யும்:

- வில்லைகளை ஈதராக மாற்றுதல்
- ஈதரை வில்லைகளாக மாற்றுதல்

எங்கள் எளிய ERC20 குறியீட்டுத் தளத்தைச் சேர்ப்பதன் மூலம் எங்கள் பரவலாக்கப்பட்ட பரிமாற்றக் குறியீட்டைத் தொடங்குவோம்:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

எங்கள் புதிய DEX திறன் ஒப்பந்தம் ERC-20-ஐ நிலைநிறுத்தி, அனைத்து விநியோகத்தையும் பெறும்:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

எனவே இப்போது எங்களிடம் DEX உள்ளது, மேலும் அதில் அனைத்து வில்லை இருப்புகளும் உள்ளன. ஒப்பந்தம் இரண்டு செயல்பாடுகளைக் கொண்டுள்ளது:

- `buy`: பயனர் ஈதரை அனுப்பி, அதற்குப் பதிலாக வில்லைகளைப் பெறலாம்
- `sell`: பயனர் ஈதரைத் திரும்பப் பெற வில்லைகளை அனுப்ப முடிவு செய்யலாம்

## வாங்கும் செயல்பாடு {#the-buy-function}

buy செயல்பாட்டைக் குறியிடுவோம். செய்தியில் உள்ள ஈதரின் அளவை முதலில் சரிபார்த்து, ஒப்பந்தங்களில் போதுமான வில்லைகள் இருப்பதையும், செய்தியில் சிறிது ஈதர் இருப்பதையும் சரிபார்க்க வேண்டும். ஒப்பந்தத்தில் போதுமான வில்லைகள் இருந்தால், அது பயனருக்கு வில்லைகளின் எண்ணிக்கையை அனுப்பி, `Bought` நிகழ்வை வெளியிடும்.

பிழை ஏற்பட்டால் தேவை (require) செயல்பாட்டை அழைத்தால், அனுப்பப்பட்ட ஈதர் நேரடியாகத் திருப்பியளிக்கப்பட்டு பயனருக்குத் திரும்ப வழங்கப்படும் என்பதை நினைவில் கொள்ளவும்.

விஷயங்களை எளிமையாக வைத்திருக்க, 1 வில்லை அடிப்படை அலகை 1 Wei-க்கு மாற்றுகிறோம். ஈதரைப் போலவே வில்லைக்கும் 18 தசமங்கள் இருப்பதால், 1 ஈதரை அனுப்புவது சரியாக 1 வில்லையை வாங்குகிறது.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    require(token.transfer(msg.sender, amountTobuy), "Token transfer failed");
    emit Bought(amountTobuy);
}
```

வாங்குதல் வெற்றிகரமாக நடந்தால், பரிவர்த்தனையில் இரண்டு நிகழ்வுகளை நாம் காண வேண்டும்: வில்லை `Transfer` மற்றும் `Bought` நிகழ்வு.

![பரிவர்த்தனையில் இரண்டு நிகழ்வுகள்: பரிமாற்றம் மற்றும் வாங்குதல்](./transfer-and-bought-events.png)

## விற்கும் செயல்பாடு {#the-sell-function}

விற்பனைக்குப் பொறுப்பான செயல்பாடு, முதலில் ஒப்புதல் அளி (approve) செயல்பாட்டை அழைப்பதன் மூலம் பயனர் தொகைக்கு ஒப்புதல் அளித்திருக்க வேண்டும். பரிமாற்றத்திற்கு ஒப்புதல் அளிக்க, DEX ஆல் உருவாக்கப்பட்ட ERC20Basic வில்லையை பயனர் அழைக்க வேண்டும். DEX ஆனது `token` எனப்படும் ERC20Basic ஒப்பந்தத்தை நிலைநிறுத்திய முகவரியைப் பெற, முதலில் DEX ஒப்பந்தத்தின் `token()` செயல்பாட்டை அழைப்பதன் மூலம் இதை அடையலாம். பின்னர் அதன் `approve` செயல்பாட்டை அழைக்கிறோம். அதன் பிறகு, DEX-இன் `sell` செயல்பாட்டை அழைத்து, எங்கள் வில்லைகளை மீண்டும் ஈதருக்குப் பரிமாற்றம் செய்ய முடியும்.

Remix-இல், `token()` மூலம் வழங்கப்பட்ட முகவரியை நகலெடுத்து, Deploy & Run பேனலின் ஒப்பந்தப் பட்டியலில் `ERC20Basic` என்பதைத் தேர்ந்தெடுத்து, முகவரியை **At Address** என்பதில் ஒட்டி, அங்கிருந்து `approve` என்பதை அழைக்கவும். கட்டளை வரியிலிருந்து, [Foundry](https://getfoundry.sh/introduction/installation) மூலம் நீங்கள் இதைச் செய்யலாம்: இந்தப் பயிற்சியின் முடிவில் உள்ள முழுமையான குறியீட்டை ஒரு புதிய திட்டத்தில் (`forge init dex`) `src/DEX.sol` ஆகச் சேமிக்கவும், பின்னர் ஒரு தனி முனையத்தில் உள்ளூர் மேம்பாட்டுச் சங்கிலியைத் தொடங்கவும்:

```sh
anvil
```

Anvil நிதியளிக்கப்பட்ட சோதனை கணக்குகள் மற்றும் அவற்றின் தனிப்பட்ட விசைகளின் பட்டியலை அச்சிடுகிறது. DEX-ஐ நிலைநிறுத்தவும், வில்லைகளை வாங்கவும், அவற்றைச் செலவிட DEX-க்கு ஒப்புதல் அளிக்கவும் அவற்றில் இரண்டைப் பயன்படுத்தவும்:

```sh
export RPC_URL=http://127.0.0.1:8545
export ACCOUNT1_KEY=<private key (0) printed by anvil>
export ACCOUNT2_KEY=<private key (1) printed by anvil>

# DEX-ஐ நிலைநிறுத்து
forge create src/DEX.sol:DEX --rpc-url $RPC_URL --private-key $ACCOUNT1_KEY --broadcast

# மேலேயுள்ள வெளியீட்டிலிருந்து "Deployed to" முகவரியை நகலெடு
export DEX=<DEX contract address>

# ஈதரை வில்லைகளாகப் பரிமாற்றம் செய்ய buy சார்பை அழை
# 1 ஈதர் என்பது 10^18 Wei ஆகும், எனவே இது 1 முழு வில்லையை வாங்குகிறது
cast send $DEX "buy()" --value 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY

# ERC20 வில்லைக்கான நிலைநிறுத்த முகவரியைப் பெறு
# அது DEX ஒப்பந்த உருவாக்கத்தின் போது நிலைநிறுத்தப்பட்டது
export TOKEN=$(cast call $DEX "token()(address)" --rpc-url $RPC_URL)

# வில்லையின் ஒப்புதல் அளி சார்பை அழை
# DEX முகவரியை செலவிடுபவராக ஒப்புதல் அளி
# மேலும் உங்களின் எத்தனை வில்லைகளை அது செலவிட அனுமதிக்கப்படுகிறது
cast send $TOKEN "approve(address,uint256)" $DEX 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY
```

பின்னர் sell செயல்பாடு அழைக்கப்படும்போது, அழைப்பாளர் முகவரியிலிருந்து ஒப்பந்த முகவரிக்கு பரிமாற்றம் வெற்றிகரமாக நடந்ததா என்பதைச் சரிபார்த்து, பின்னர் ஈதர்களை அழைப்பாளர் முகவரிக்குத் திருப்பி அனுப்புவோம். [சரிபார்ப்புகள்-விளைவுகள்-தொடர்புகள் முறையைப் (checks-effects-interactions pattern)](https://docs.soliditylang.org/en/latest/security-considerations.html#use-the-checks-effects-interactions-pattern) பின்பற்றி, அனைத்துச் சரிபார்ப்புகள் மற்றும் நிலை மாற்றங்களுக்குப் பிறகு, ஈதர் கடைசியாக அனுப்பப்படுகிறது. Solidity-இன் சமீபத்திய பதிப்புகளில் `transfer` நிராகரிக்கப்பட்டதால், குறைந்த-நிலை `call` மூலம் அதை அனுப்பி, அது வெற்றிகரமாக நடந்ததா என்பதைச் சரிபார்க்கிறோம்.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
    emit Sold(amount);
    (bool sent, ) = payable(msg.sender).call{value: amount}("");
    require(sent, "Failed to send ether");
}
```

Foundry மூலம், திரும்பப் பரிமாற்றம் செய்வது இப்படி இருக்கும்:

```sh
cast send $DEX "sell(uint256)" 1ether --rpc-url $RPC_URL --private-key $ACCOUNT2_KEY

# இரண்டாவது கணக்கின் நிலுவைகளைச் சரிபார்
export ACCOUNT2=$(cast wallet address --private-key $ACCOUNT2_KEY)
cast call $TOKEN "balanceOf(address)(uint256)" $ACCOUNT2 --rpc-url $RPC_URL
cast balance $ACCOUNT2 --ether --rpc-url $RPC_URL
```

எல்லாம் சரியாக வேலை செய்தால், பரிவர்த்தனையில் 2 நிகழ்வுகளை (`Transfer` மற்றும் `Sold`) நீங்கள் காண வேண்டும், மேலும் உங்கள் வில்லை இருப்பு மற்றும் ஈதர் இருப்பு புதுப்பிக்கப்பட்டிருக்கும்.

![பரிவர்த்தனையில் இரண்டு நிகழ்வுகள்: பரிமாற்றம் மற்றும் விற்கப்பட்டது](./transfer-and-sold-events.png)

<Divider />

இந்தப் பயிற்சியிலிருந்து, ERC-20 வில்லையின் இருப்பு மற்றும் அனுமதித்தொகையை எவ்வாறு சரிபார்ப்பது என்பதையும், இடைமுகத்தைப் பயன்படுத்தி ERC20 திறன் ஒப்பந்தத்தின் `Transfer` மற்றும் `TransferFrom` ஆகியவற்றை எவ்வாறு அழைப்பது என்பதையும் பார்த்தோம்.

`transfer` மற்றும் `transferFrom` மூலம் வழங்கப்படும் `bool` என்பதை DEX சரிபார்க்கிறது என்பதை நினைவில் கொள்ளவும். நடைமுறையில் உள்ள சில வில்லைகள் தரநிலையைச் சரியாகப் பின்பற்றுவதில்லை மற்றும் எதையும் வழங்குவதில்லை; உங்கள் ஒப்பந்தம் தன்னிச்சையான ERC-20 வில்லைகளுடன் வேலை செய்ய வேண்டியிருக்கும் போது, OpenZeppelin-இன் [SafeERC20](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#SafeERC20) போன்ற ரேப்பரைப் பயன்படுத்தவும்.

நீங்கள் ஒரு பரிவர்த்தனையைச் செய்தவுடன், உங்களிடம் ABI இருக்கும் வரை, [பரிவர்த்தனை ஒரு தொகுதியில் சேர்க்கப்படும் வரை காத்திருக்க](https://viem.sh/docs/actions/public/waitForTransactionReceipt) மற்றும் வில்லை பரிமாற்றங்கள் அல்லது வேறு ஏதேனும் நிகழ்வுகளால் உருவாக்கப்பட்ட [நிகழ்வுகளை டிகோட் செய்ய](https://viem.sh/docs/contract/parseEventLogs) Viem போன்ற JavaScript நிரலகத்தைப் பயன்படுத்தலாம். [நிகழ்வுகளுடன் திறன் ஒப்பந்தங்களிலிருந்து தரவைப் பதிவுசெய்தல்](/developers/tutorials/logging-events-smart-contracts/) என்பதையும் பார்க்கவும்.

பயிற்சிக்கான முழுமையான குறியீடு இங்கே:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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
        require(token.transfer(msg.sender, amountTobuy), "Token transfer failed");
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        emit Sold(amount);
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send ether");
    }

}
```
