---
title: Kuelewa mkataba mahiri wa tokeni ya ERC-20
description: Jifunze jinsi ya kutekeleza kiwango cha tokeni ya ERC-20 kwa mfano kamili wa mkataba mahiri wa Solidity na maelezo.
author: "jdourlens"
tags: ["mikataba mahiri", "tokeni", "solidity", "erc-20"]
skill: beginner
breadcrumb: Misingi ya tokeni ya ERC-20
lang: sw
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Moja ya viwango muhimu zaidi vya [mikataba mahiri](/developers/docs/standards/) kwenye Ethereum inajulikana kama [ERC-20](/developers/docs/standards/tokens/erc-20/), ambayo imeibuka kama kiwango cha kiufundi kinachotumiwa kwa mikataba mahiri yote kwenye mnyororo wa vitalu wa Ethereum kwa utekelezaji wa tokheni mbadala.

ERC-20 inafafanua orodha ya kawaida ya sheria ambazo tokheni mbadala zote za Ethereum zinapaswa kuzingatia. Kwa hivyo, kiwango hiki cha tokeni kinawawezesha wasanidi wa aina zote kutabiri kwa usahihi jinsi tokeni mpya zitakavyofanya kazi ndani ya mfumo mkubwa wa Ethereum. Hii inarahisisha na kupunguza kazi za wasanidi, kwa sababu wanaweza kuendelea na kazi yao, wakijua kwamba kila mradi mpya hautahitaji kufanywa upya kila wakati tokeni mpya inapotolewa, mradi tu tokeni inafuata sheria.

Hapa kuna kazi ambazo ERC-20 lazima itekeleze, zilizowasilishwa kama kiolesura. Ikiwa huna uhakika kuhusu kiolesura ni nini: angalia makala yetu kuhusu [upangaji wa OOP katika Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Hapa kuna maelezo ya mstari kwa mstari ya kazi ya kila kipengele. Baada ya haya tutawasilisha utekelezaji rahisi wa tokeni ya ERC-20.

## Vipataji {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Hurejesha kiasi cha tokeni zilizopo. Kazi hii ni kipataji na haibadilishi hali ya mkataba. Kumbuka kwamba hakuna nambari za desimali (floats) katika Solidity. Kwa hivyo tokeni nyingi huchukua desimali 18 na zitarudisha usambazaji wa jumla na matokeo mengine kama ifuatavyo 1000000000000000000 kwa tokeni 1. Sio kila tokeni ina desimali 18 na hili ni jambo ambalo unahitaji kuliangalia sana unaposhughulika na tokeni.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Hurejesha kiasi cha tokeni zinazomilikiwa na anwani (`account`). Kazi hii ni kipataji na haibadilishi hali ya mkataba.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Kiwango cha ERC-20 kinaruhusu anwani kutoa kibali kwa anwani nyingine ili kuweza kupata tokeni kutoka kwayo. Kipataji hiki hurejesha idadi iliyobaki ya tokeni ambazo `spender` itaruhusiwa kutumia kwa niaba ya `owner`. Kazi hii ni kipataji na haibadilishi hali ya mkataba na inapaswa kurejesha 0 kwa chaguo-msingi.

## Kazi {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Huhamisha `amount` ya tokeni kutoka kwa anwani ya mpigaji wa kazi (`msg.sender`) hadi kwa anwani ya mpokeaji. Kazi hii hutoa tukio la `Transfer` lililofafanuliwa baadaye. Inarejesha kweli (true) ikiwa hamisho liliwezekana.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Weka kiasi cha `allowance` ambacho `spender` inaruhusiwa kuhamisha kutoka kwa salio la mpigaji wa kazi (`msg.sender`). Kazi hii hutoa tukio la Uidhinishaji (Approval). Kazi inarejesha ikiwa kibali kiliwekwa kwa mafanikio.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Huhamisha `amount` ya tokeni kutoka `sender` hadi `recipient` kwa kutumia utaratibu wa kibali. kiasi (amount) kisha hukatwa kutoka kwa kibali cha mpigaji. Kazi hii hutoa tukio la `Transfer`.

## Matukio {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Tukio hili hutolewa wakati kiasi cha tokeni (thamani) kinatumwa kutoka kwa anwani ya `from` hadi kwa anwani ya `to`.

Katika kesi ya ufuzi wa tokeni mpya, hamisho kawaida ni `from` anwani ya 0x00..0000 wakati katika kesi ya kuteketeza tokeni hamisho ni `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Tukio hili hutolewa wakati kiasi cha tokeni (`value`) kinapoidhinishwa na `owner` kutumiwa na `spender`.

## Utekelezaji wa kimsingi wa tokeni za ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Hapa kuna msimbo rahisi zaidi wa kutumia kama msingi wa tokeni yako ya ERC-20:

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

Utekelezaji mwingine bora wa kiwango cha tokeni cha ERC-20 ni [utekelezaji wa ERC-20 wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).