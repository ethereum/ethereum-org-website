---
title: Solidity స్మార్ట్ కాంట్రాక్ట్ నుండి ERC-20 టోకెన్‌ల బదిలీలు మరియు ఆమోదం
description: Solidityని ఉపయోగించి ERC-20 టోకెన్ బదిలీలు మరియు ఆమోదాలను నిర్వహించే DEX స్మార్ట్ కాంట్రాక్ట్‌ను రూపొందించండి.
author: "jdourlens"
tags: ["స్మార్ట్ కాంట్రాక్ట్‌లు", "టోకెన్‌లు", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 బదిలీలు
lang: te
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

మునుపటి ట్యుటోరియల్‌లో మనం ఎథీరియం బ్లాక్‌చైన్‌లో [Solidityలో ERC-20 టోకెన్ యొక్క నిర్మాణాన్ని](/developers/tutorials/understand-the-erc-20-token-smart-contract/) అధ్యయనం చేసాము. ఈ ఆర్టికల్‌లో, Solidity భాషను ఉపయోగించి టోకెన్‌తో ఇంటరాక్ట్ అవ్వడానికి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా ఉపయోగించవచ్చో చూద్దాం.

ఈ స్మార్ట్ కాంట్రాక్ట్ కోసం, మనం కొత్తగా డిప్లాయ్ చేసిన [ERC-20 టోకెన్](/developers/docs/standards/tokens/erc-20/) కోసం వినియోగదారు ఈథర్‌ను ట్రేడ్ చేయగల నిజమైన డమ్మీ వికేంద్రీకృత ఎక్స్ఛేంజ్‌ను సృష్టిస్తాము.

ఈ ట్యుటోరియల్ కోసం మనం మునుపటి ట్యుటోరియల్‌లో రాసిన కోడ్‌ను ఆధారంగా ఉపయోగిస్తాము. మన DEX దాని కన్స్ట్రక్టర్‌లో కాంట్రాక్ట్ యొక్క ఇన్‌స్టాన్స్‌ను ఇన్‌స్టాన్షియేట్ చేస్తుంది మరియు ఈ ఆపరేషన్‌లను నిర్వహిస్తుంది:

- టోకెన్‌లను ఈథర్‌గా మార్పిడి చేయడం
- ఈథర్‌ను టోకెన్‌లుగా మార్పిడి చేయడం

మన సాధారణ ERC20 కోడ్‌బేస్‌ను జోడించడం ద్వారా మన వికేంద్రీకృత ఎక్స్ఛేంజ్ కోడ్‌ను ప్రారంభిస్తాము:

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

మన కొత్త DEX స్మార్ట్ కాంట్రాక్ట్ ERC-20ని డిప్లాయ్ చేస్తుంది మరియు సరఫరా చేయబడిన వాటన్నింటినీ పొందుతుంది:

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

కాబట్టి ఇప్పుడు మన వద్ద DEX ఉంది మరియు దానికి మొత్తం టోకెన్ రిజర్వ్ అందుబాటులో ఉంది. కాంట్రాక్ట్ రెండు ఫంక్షన్‌లను కలిగి ఉంది:

- `buy`: వినియోగదారు ఈథర్‌ను పంపి, దానికి బదులుగా టోకెన్‌లను పొందవచ్చు
- `sell`: వినియోగదారు ఈథర్‌ను తిరిగి పొందడానికి టోకెన్‌లను పంపాలని నిర్ణయించుకోవచ్చు

## buy ఫంక్షన్ {#the-buy-function}

buy ఫంక్షన్‌ను కోడ్ చేద్దాం. మనం ముందుగా సందేశం కలిగి ఉన్న ఈథర్ మొత్తాన్ని తనిఖీ చేయాలి మరియు కాంట్రాక్ట్‌లు తగినన్ని టోకెన్‌లను కలిగి ఉన్నాయని మరియు సందేశంలో కొంత ఈథర్ ఉందని ధృవీకరించాలి. కాంట్రాక్ట్ తగినన్ని టోకెన్‌లను కలిగి ఉంటే, అది వినియోగదారుకు టోకెన్‌ల సంఖ్యను పంపుతుంది మరియు `Bought` ఈవెంట్‌ను విడుదల చేస్తుంది.

ఒకవేళ ఎర్రర్ వచ్చినప్పుడు మనం require ఫంక్షన్‌ను కాల్ చేస్తే, పంపిన ఈథర్ నేరుగా రివర్ట్ చేయబడుతుంది మరియు వినియోగదారుకు తిరిగి ఇవ్వబడుతుందని గమనించండి.

విషయాలను సరళంగా ఉంచడానికి, మనం కేవలం 1 Weiకి 1 టోకెన్‌ను మార్పిడి చేస్తాము.

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

కొనుగోలు విజయవంతమైన సందర్భంలో మనం లావాదేవీలో రెండు ఈవెంట్‌లను చూడాలి: టోకెన్ `Transfer` మరియు `Bought` ఈవెంట్.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell ఫంక్షన్ {#the-sell-function}

విక్రయానికి బాధ్యత వహించే ఫంక్షన్‌కు ముందుగా వినియోగదారు approve ఫంక్షన్‌ను కాల్ చేయడం ద్వారా మొత్తాన్ని ఆమోదించడం అవసరం. బదిలీని ఆమోదించడానికి DEX ద్వారా ఇన్‌స్టాన్షియేట్ చేయబడిన ERC20Basic టోకెన్‌ను వినియోగదారు కాల్ చేయాలి. DEX `token` అని పిలువబడే ERC20Basic కాంట్రాక్ట్‌ను డిప్లాయ్ చేసిన చిరునామాను తిరిగి పొందడానికి ముందుగా DEX కాంట్రాక్ట్ యొక్క `token()` ఫంక్షన్‌ను కాల్ చేయడం ద్వారా దీనిని సాధించవచ్చు. ఆపై మనం మన సెషన్‌లో ఆ కాంట్రాక్ట్ యొక్క ఇన్‌స్టాన్స్‌ను సృష్టిస్తాము మరియు దాని `approve` ఫంక్షన్‌ను కాల్ చేస్తాము. ఆ తర్వాత మనం DEX యొక్క `sell` ఫంక్షన్‌ను కాల్ చేయగలుగుతాము మరియు మన టోకెన్‌లను తిరిగి ఈథర్ కోసం మార్పిడి చేయగలుగుతాము. ఉదాహరణకు, ఇంటరాక్టివ్ Brownie సెషన్‌లో ఇది ఈ విధంగా కనిపిస్తుంది:

```python
#### ఇంటరాక్టివ్ Brownie కన్సోల్‌లో Python...

# DEXని డిప్లాయ్ చేయండి
dex = DEX.deploy({'from':account1})

# టోకెన్ కోసం ఈథర్‌ను మార్పిడి చేయడానికి buy ఫంక్షన్‌ను కాల్ చేయండి
# 1e18 అనేది Weiలో సూచించబడిన 1 ఈథర్
dex.buy({'from': account2, 1e18})

# ERC-20 టోకెన్ కోసం డిప్లాయ్‌మెంట్ చిరునామాను పొందండి
# ఇది DEX కాంట్రాక్ట్ సృష్టి సమయంలో డిప్లాయ్ చేయబడింది
# dex.token() టోకెన్ కోసం డిప్లాయ్ చేయబడిన చిరునామాను అందిస్తుంది
token = ERC20Basic.at(dex.token())

# టోకెన్ యొక్క ఆమోదించు ఫంక్షన్‌ను కాల్ చేయండి
# dex చిరునామాను ఖర్చు చేసేదిగా ఆమోదించండి
# మరియు ఇది మీ ఎన్ని టోకెన్‌లను ఖర్చు చేయడానికి అనుమతించబడుతుందో
token.approve(dex.address, 3e18, {'from':account2})

```

ఆపై sell ఫంక్షన్‌ను కాల్ చేసినప్పుడు, కాలర్ చిరునామా నుండి కాంట్రాక్ట్ చిరునామాకు బదిలీ విజయవంతమైందో లేదో మనం తనిఖీ చేస్తాము మరియు ఆపై ఈథర్‌లను తిరిగి కాలర్ చిరునామాకు పంపుతాము.

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

అంతా సరిగ్గా పనిచేస్తే మీరు లావాదేవీలో 2 ఈవెంట్‌లను (ఒక `Transfer` మరియు `Sold`) చూడాలి మరియు మీ టోకెన్ బ్యాలెన్స్ మరియు ఈథర్ బ్యాలెన్స్ అప్‌డేట్ చేయబడతాయి.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

ఈ ట్యుటోరియల్ నుండి మనం ERC-20 టోకెన్ యొక్క బ్యాలెన్స్ మరియు అనుమతి మొత్తాన్ని ఎలా తనిఖీ చేయాలో మరియు ఇంటర్‌ఫేస్‌ను ఉపయోగించి ERC20 స్మార్ట్ కాంట్రాక్ట్ యొక్క `Transfer` మరియు `TransferFrom`ని ఎలా కాల్ చేయాలో చూశాము.

మీరు లావాదేవీ చేసిన తర్వాత, మీ కాంట్రాక్ట్‌కు చేసిన [లావాదేవీల గురించి వేచి ఉండి వివరాలను పొందడానికి](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) మా వద్ద ఒక JavaScript ట్యుటోరియల్ ఉంది మరియు మీ వద్ద ABI ఉన్నంత వరకు [టోకెన్ బదిలీలు లేదా మరే ఇతర ఈవెంట్‌ల ద్వారా రూపొందించబడిన ఈవెంట్‌లను డీకోడ్ చేయడానికి ఒక ట్యుటోరియల్](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) ఉంది.

ట్యుటోరియల్ కోసం పూర్తి కోడ్ ఇక్కడ ఉంది:

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