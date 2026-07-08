---
title: Uhamisho na uidhinishaji wa tokeni za ERC-20 kutoka kwenye mkataba mahiri wa Solidity
description: Jenga mkataba mahiri wa DEX unaoshughulikia uhamisho na uidhinishaji wa tokeni za ERC-20 ukitumia Solidity.
author: "jdourlens"
tags: ["mikataba mahiri", "tokeni", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: Uhamisho wa ERC-20
lang: sw
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika mafunzo yaliyopita tulijifunza [muundo wa tokeni ya ERC-20 katika Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) kwenye mnyororo wa vitalu wa Ethereum. Katika makala haya tutaona jinsi tunavyoweza kutumia mkataba mahiri kuingiliana na tokeni kwa kutumia lugha ya Solidity.

Kwa mkataba mahiri huu, tutaunda soko la kubadilishana lililogatuliwa (DEX) la mfano ambapo mtumiaji anaweza kufanya badilishano la Etha kwa [tokeni yetu ya ERC-20](/developers/docs/standards/tokens/erc-20/) iliyosambazwa hivi karibuni.

Kwa mafunzo haya tutatumia msimbo tulioandika katika mafunzo yaliyopita kama msingi. DEX yetu itaunda mfano wa mkataba katika konstrukta yake na kufanya shughuli za:

- kubadilisha tokeni kuwa Etha
- kubadilisha Etha kuwa tokeni

Tutaaza msimbo wetu wa soko la kubadilishana lililogatuliwa kwa kuongeza msingi wetu rahisi wa msimbo wa ERC20:

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

Mkataba mahiri wetu mpya wa DEX utasambaza ERC-20 na kupata zote zilizotolewa:

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

Kwa hivyo sasa tuna DEX yetu na ina akiba yote ya tokeni inayopatikana. Mkataba una vipengele viwili:

- `buy`: Mtumiaji anaweza kutuma Etha na kupata tokeni kama badilishano
- `sell`: Mtumiaji anaweza kuamua kutuma tokeni ili kupata Etha

## Kipengele cha kununua {#the-buy-function}

Hebu tuandike msimbo wa kipengele cha kununua. Kwanza tutahitaji kuangalia kiasi cha Etha ambacho ujumbe unao na kuthibitisha kwamba mikataba inamiliki tokeni za kutosha na kwamba ujumbe una Etha ndani yake. Ikiwa mkataba unamiliki tokeni za kutosha utatuma idadi ya tokeni kwa mtumiaji na kutoa tukio la `Bought`.

Kumbuka kwamba ikiwa tutaita kipengele cha hitaji katika hali ya hitilafu Etha iliyotumwa itarejeshwa moja kwa moja na kurudishwa kwa mtumiaji.

Ili kurahisisha mambo, tunabadilisha tu tokeni 1 kwa Wei 1.

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

Katika hali ambapo ununuzi umefanikiwa tunapaswa kuona matukio mawili katika muamala: Tukio la `Transfer` la tokeni na tukio la `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Kipengele cha kuuza {#the-sell-function}

Kipengele kinachohusika na uuzaji kwanza kitahitaji mtumiaji awe ameidhinisha kiasi kwa kuita kipengele cha idhinisha kabla. Kuidhinisha hamisho kunahitaji tokeni ya ERC20Basic iliyoundwa na DEX iitwe na mtumiaji. Hili linaweza kufikiwa kwa kuita kwanza kipengele cha `token()` cha mkataba wa DEX ili kupata anwani ambapo DEX ilisambaza mkataba wa ERC20Basic unaoitwa `token`. Kisha tunaunda mfano wa mkataba huo katika kipindi chetu na kuita kipengele chake cha `approve`. Kisha tunaweza kuita kipengele cha `sell` cha DEX na kufanya badilishano la tokeni zetu kurudi kuwa Etha. Kwa mfano, hivi ndivyo inavyoonekana katika kipindi cha mwingiliano cha Brownie:

```python
#### Python katika kiweko cha mwingiliano cha Brownie...

# kusambaza DEX
dex = DEX.deploy({'from':account1})

# ita kitendakazi cha buy kufanya badilishano la Etha kwa tokeni
# 1e18 ni Etha 1 katika kipimo cha Wei
dex.buy({'from': account2, 1e18})

# pata anwani ya usambazaji ya tokeni ya ERC20
# ambayo ilisambazwa wakati wa uundaji wa mkataba wa DEX
# dex.token() inarejesha anwani iliyosambazwa ya tokeni
token = ERC20Basic.at(dex.token())

# ita kitendakazi cha idhinisha cha tokeni
# idhinisha anwani ya dex kama mtumiaji
# na ni tokeni zako ngapi inaruhusiwa kutumia
token.approve(dex.address, 3e18, {'from':account2})

```

Kisha wakati kipengele cha kuuza kinaitwa, tutaangalia ikiwa hamisho kutoka kwa anwani ya mpigaji hadi anwani ya mkataba lilifanikiwa na kisha kutuma Etha kurudi kwenye anwani ya mpigaji.

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

Ikiwa kila kitu kinafanya kazi unapaswa kuona matukio 2 (`Transfer` na `Sold`) katika muamala na salio lako la tokeni na salio la Etha kusasishwa.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Kutoka kwenye mafunzo haya tuliona jinsi ya kuangalia salio na kibali cha tokeni ya ERC-20 na pia jinsi ya kuita `Transfer` na `TransferFrom` ya mkataba mahiri wa ERC20 kwa kutumia kiolesura.

Mara tu unapofanya muamala tuna mafunzo ya JavaScript ya [kusubiri na kupata maelezo kuhusu miamala](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) iliyofanywa kwenye mkataba wako na [mafunzo ya kusimbua matukio yanayotokana na uhamisho wa tokeni au matukio mengine yoyote](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) mradi tu una ABI.

Huu hapa ni msimbo kamili wa mafunzo:

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