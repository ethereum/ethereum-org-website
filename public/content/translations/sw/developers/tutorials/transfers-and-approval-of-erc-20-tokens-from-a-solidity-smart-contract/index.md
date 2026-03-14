---
title: Uhamisho na uidhinishaji wa tokeni za ERC-20 kutoka kwa mkataba-erevu wa solidity
description: Jenga mkataba-erevu wa DEX unaoshughulikia uhamisho na uidhinishaji wa tokeni za ERC-20 kwa kutumia Solidity.
author: "jdourlens"
tags: [ "mikataba erevu", "tokeni", "uimara", "erc-20" ]
skill: intermediate
lang: sw
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Katika somo lililopita tulijifunza [anatomia ya tokeni ya ERC-20 katika Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) kwenye mnyororo wa bloku wa Ethereum. Katika makala hii tutaona jinsi tunavyoweza kutumia mkataba-erevu kuingiliana na tokeni kwa kutumia lugha ya Solidity.

Kwa ajili ya mkataba-erevu huu, tutaunda mfumo halisi wa majaribio wa kubadilishana uliogatuliwa ambapo mtumiaji anaweza kubadilisha ether kwa [tokeni yetu mpya ya ERC-20](/developers/docs/standards/tokens/erc-20/) iliyotumwa.

Kwa somo hili tutatumia msimbo tuliouandika katika somo lililopita kama msingi. DEX yetu itaanzisha mfano wa mkataba katika kiunda chake na kufanya shughuli za:

- kubadilishana tokeni kwa ether
- kubadilishana ether kwa tokeni

Tutaanzisha msimbo wetu wa kubadilishana uliogatuliwa kwa kuongeza msimbo wetu rahisi wa ERC20:

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

Mkataba-erevu wetu mpya wa DEX utatumia ERC-20 na kupata yote yaliyotolewa:

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

Kwa hiyo sasa tuna DEX yetu na ina hifadhi yote ya tokeni inayopatikana. Mkataba una vipengele viwili:

- `nunua`: Mtumiaji anaweza kutuma ether na kupata tokeni badala yake
- `uza`: Mtumiaji anaweza kuamua kutuma tokeni ili kurudishiwa ether

## Kipengele cha kununua {#the-buy-function}

Tuandike msimbo wa kipengele cha kununua. Kwanza tutahitaji kuangalia kiasi cha ether kilichomo kwenye ujumbe na kuthibitisha kuwa mikataba inamiliki tokeni za kutosha na kwamba ujumbe una kiasi fulani cha ether ndani yake. Ikiwa mkataba unamiliki tokeni za kutosha, utamtumia mtumiaji idadi ya tokeni na kutoa tukio la `Bought`.

Kumbuka kwamba tukiita kipengele cha `require` katika kisa cha kosa ether iliyotumwa itarejeshwa moja kwa moja na kurudishwa kwa mtumiaji.

Ili kurahisisha mambo, tunabadilishana tokeni 1 kwa Wei 1.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Unahitaji kutuma kiasi fulani cha ether");
    require(amountTobuy <= dexBalance, "Hakuna tokeni za kutosha katika hifadhi");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Katika hali ambapo ununuzi unafanikiwa tunapaswa kuona matukio mawili katika muamala: `Transfer` ya tokeni na tukio la `Bought`.

![Matukio mawili katika muamala: Transfer na Bought](./transfer-and-bought-events.png)

## Kipengele cha kuuza {#the-sell-function}

Kipengele kinachohusika na uuzaji kwanza kitahitaji mtumiaji awe ameidhinisha kiasi kwa kuita kipengele cha `approve` kabla. Kuidhinisha uhamisho kunahitaji tokeni ya ERC20Basic iliyoanzishwa na DEX iitwe na mtumiaji. Hii inaweza kufikiwa kwa kwanza kuita kipengele cha `token()` cha mkataba wa DEX ili kupata anwani ambapo DEX ilituma mkataba wa ERC20Basic unaoitwa `token`. Kisha tunaunda mfano wa mkataba huo katika kipindi chetu na kuita kipengele chake cha `approve`. Kisha tunaweza kuita kipengele cha `sell` cha DEX na kubadilisha tokeni zetu na kupata ether. Kwa mfano, hivi ndivyo inavyoonekana katika kipindi cha maingiliano cha brownie:

```python
#### Python katika koni ya maingiliano ya brownie...

# tuma DEX
dex = DEX.deploy({'from':account1})

# ita kipengele cha kununua ili kubadilisha ether kwa tokeni
# 1e18 ni ether 1 katika wei
dex.buy({'from': account2, 1e18})

# pata anwani ya utumaji ya tokeni ya ERC20
# ambayo ilitumwa wakati wa uundaji wa mkataba wa DEX
# dex.token() inarudisha anwani iliyotumwa ya tokeni
token = ERC20Basic.at(dex.token())

# ita kipengele cha kuidhinisha cha tokeni
# idhinisha anwani ya dex kama mtumiaji
# na ni tokeni zako ngapi inaruhusiwa kutumia
token.approve(dex.address, 3e18, {'from':account2})

```

Kisha kipengele cha `sell` kinapoitwa, tutaangalia kama uhamisho kutoka kwa anwani ya mpigaji kwenda kwa anwani ya mkataba ulifanikiwa na kisha tutatuma Ethers kurudi kwa anwani ya mpigaji.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Unahitaji kuuza angalau tokeni kadhaa");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Angalia ruhusa ya tokeni");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Ikiwa kila kitu kitafanya kazi unapaswa kuona matukio 2 (`Transfer` na `Sold`) katika muamala na salio lako la tokeni na salio la ether likisasishwa.

![Matukio mawili katika muamala: Transfer na Sold](./transfer-and-sold-events.png)

<Divider />

Kutoka kwa somo hili tumeona jinsi ya kuangalia salio na ruhusa ya tokeni ya ERC-20 na pia jinsi ya kuita `Transfer` na `TransferFrom` ya mkataba-erevu wa ERC20 kwa kutumia kiolesura.

Mara tu unapofanya muamala tuna somo la JavaScript la [kusubiri na kupata maelezo kuhusu miamala](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) ambayo ilifanywa kwa mkataba wako na [somo la kusimbua matukio yaliyotokana na uhamisho wa tokeni au matukio mengine yoyote](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) mradi tu una ABI.

Huu hapa msimbo kamili wa somo:

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
        require(amountTobuy > 0, "Unahitaji kutuma kiasi fulani cha ether");
        require(amountTobuy <= dexBalance, "Hakuna tokeni za kutosha katika hifadhi");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Unahitaji kuuza angalau tokeni kadhaa");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Angalia ruhusa ya tokeni");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
