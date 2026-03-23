---
title: "సాలిడిటీ స్మార్ట్ కాంట్రాక్ట్ నుండి ERC-20 టోకెన్ల బదిలీలు మరియు ఆమోదం"
description: "సాలిడిటీని ఉపయోగించి ERC-20 టోకెన్ బదిలీలు మరియు ఆమోదాలను నిర్వహించే DEX స్మార్ట్ కాంట్రాక్ట్‌ను నిర్మించండి."
author: "jdourlens"
tags:
  [
    "స్మార్ట్ కాంట్రాక్టులు",
    "టోకెన్లు",
    "దృఢత్వం",
    "erc-20"
  ]
skill: intermediate
lang: te
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

మునుపటి ట్యుటోరియల్‌లో మేము ఇతీరియము బ్లాక్‌చైన్‌లో [సాలిడిటీలో ERC-20 టోకెన్ యొక్క అనాటమీ](/developers/tutorials/understand-the-erc-20-token-smart-contract/) గురించి అధ్యయనం చేశాము. ఈ ఆర్టికల్‌లో మనం సాలిడిటీ భాషను ఉపయోగించి ఒక టోకెన్‌తో ఇంటరాక్ట్ అవ్వడానికి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా ఉపయోగించవచ్చో చూద్దాం.

ఈ స్మార్ట్ కాంట్రాక్ట్ కోసం, మేము ఒక నిజమైన డమ్మీ వికేంద్రీకృత మార్పిడిని సృష్టిస్తాము, ఇక్కడ ఒక వినియోగదారుడు మన కొత్తగా డిప్లాయ్ చేసిన [ERC-20 టోకెన్](/developers/docs/standards/tokens/erc-20/) కోసం ఈథర్‌ను ట్రేడ్ చేయవచ్చు.

ఈ ట్యుటోరియల్ కోసం మేము మునుపటి ట్యుటోరియల్‌లో రాసిన కోడ్‌ను బేస్‌గా ఉపయోగిస్తాము. మన DEX దాని కన్‌స్ట్రక్టర్‌లో కాంట్రాక్ట్ యొక్క ఇన్‌స్టాన్స్‌ను ఇన్‌స్టాన్షియేట్ చేస్తుంది మరియు ఈ క్రింది ఆపరేషన్‌లను నిర్వహిస్తుంది:

- టోకెన్లను ఈథర్‌కు మార్పిడి చేయడం
- ఈథర్‌ను టోకెన్లకు మార్పిడి చేయడం

మనం మన సాధారణ ERC20 కోడ్‌బేస్‌ను జోడించడం ద్వారా మన వికేంద్రీకృత మార్పిడి కోడ్‌ను ప్రారంభిస్తాము:

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

మన కొత్త DEX స్మార్ట్ కాంట్రాక్ట్ ERC-20 ని డిప్లాయ్ చేస్తుంది మరియు సరఫరా చేయబడినవన్నీ పొందుతుంది:

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

కాబట్టి ఇప్పుడు మనకు మన DEX ఉంది మరియు దానిలో అందుబాటులో ఉన్న టోకెన్ రిజర్వ్ అంతా ఉంది. కాంట్రాక్ట్ రెండు ఫంక్షన్‌లను కలిగి ఉంది:

- `buy`: వినియోగదారుడు ఈథర్‌ను పంపి బదులుగా టోకెన్‌లను పొందవచ్చు
- `sell`: వినియోగదారుడు ఈథర్‌ను తిరిగి పొందడానికి టోకెన్‌లను పంపాలని నిర్ణయించుకోవచ్చు

## కొనుగోలు ఫంక్షన్ {#the-buy-function}

కొనుగోలు ఫంక్షన్‌ను కోడ్ చేద్దాం. మనం ముందుగా సందేశంలో ఎంత ఈథర్ ఉందో తనిఖీ చేయాలి మరియు కాంట్రాక్ట్‌లలో తగినన్ని టోకెన్లు ఉన్నాయని, అలాగే సందేశంలో కొంత ఈథర్ ఉందని ధృవీకరించాలి. కాంట్రాక్ట్‌లో తగినన్ని టోకెన్‌లు ఉంటే, అది వినియోగదారుడికి టోకెన్‌ల సంఖ్యను పంపి, `Bought` ఈవెంట్‌ను విడుదల చేస్తుంది.

లోపం సంభవించినప్పుడు మనం రిక్వైర్ ఫంక్షన్‌ను కాల్ చేస్తే, పంపిన ఈథర్ నేరుగా రివర్ట్ చేయబడి వినియోగదారుడికి తిరిగి ఇవ్వబడుతుందని గమనించండి.

విషయాలను సరళంగా ఉంచడానికి, మనం 1 టోకెన్‌కు 1 వెయిని మార్పిడి చేస్తాము.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "మీరు కొంత ఈథర్‌ను పంపాలి");
    require(amountTobuy <= dexBalance, "రిజర్వ్‌లో తగినన్ని టోకెన్‌లు లేవు");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

కొనుగోలు విజయవంతం అయిన సందర్భంలో, మనం లావాదేవీలో రెండు ఈవెంట్‌లను చూడాలి: టోకెన్ `Transfer` మరియు `Bought` ఈవెంట్.

![లావాదేవీలో రెండు ఈవెంట్‌లు: బదిలీ మరియు కొనుగోలు](./transfer-and-bought-events.png)

## అమ్మకం ఫంక్షన్ {#the-sell-function}

అమ్మకానికి బాధ్యత వహించే ఫంక్షన్, అప్రూవ్ ఫంక్షన్‌ను ముందుగానే కాల్ చేయడం ద్వారా వినియోగదారుడు మొత్తాన్ని ఆమోదించడాన్ని కోరుతుంది. బదిలీని ఆమోదించడానికి DEX ద్వారా ఇన్‌స్టాన్షియేట్ చేయబడిన ERC20Basic టోకెన్‌ను వినియోగదారుడు కాల్ చేయాల్సి ఉంటుంది. DEX `token` అని పిలవబడే ERC20Basic కాంట్రాక్ట్‌ను ఎక్కడ డిప్లాయ్ చేసిందో ఆ చిరునామాను తిరిగి పొందడానికి, ముందుగా DEX కాంట్రాక్ట్ యొక్క `token()` ఫంక్షన్‌ను కాల్ చేయడం ద్వారా ఇది సాధించవచ్చు. ఆ తర్వాత మనం మన సెషన్‌లో ఆ కాంట్రాక్ట్ యొక్క ఒక ఇన్‌స్టాన్స్‌ను సృష్టించి, దాని `approve` ఫంక్షన్‌ను కాల్ చేస్తాము. అప్పుడు మనం DEX యొక్క `sell` ఫంక్షన్‌ను కాల్ చేసి, మన టోకెన్‌లను తిరిగి ఈథర్ కోసం స్వాప్ చేయగలుగుతాము. ఉదాహరణకు, ఒక ఇంటరాక్టివ్ బ్రౌనీ సెషన్‌లో ఇది ఇలా కనిపిస్తుంది:

```python
#### ఇంటరాక్టివ్ బ్రౌనీ కన్సోల్‌లో పైథాన్...

# DEX ని డిప్లాయ్ చేయండి
dex = DEX.deploy({'from':account1})

# టోకెన్ కోసం ఈథర్‌ను స్వాప్ చేయడానికి బై ఫంక్షన్‌ను కాల్ చేయండి
# 1e18 అనేది వెయిలో సూచించబడిన 1 ఈథర్
dex.buy({'from': account2, 1e18})

# ERC20 టోకెన్ కోసం డిప్లాయ్‌మెంట్ చిరునామాను పొందండి
# ఇది DEX కాంట్రాక్ట్ సృష్టి సమయంలో డిప్లాయ్ చేయబడింది
# dex.token() టోకెన్ కోసం డిప్లాయ్ చేయబడిన చిరునామాను తిరిగి ఇస్తుంది
token = ERC20Basic.at(dex.token())

# టోకెన్ యొక్క అప్రూవ్ ఫంక్షన్‌ను కాల్ చేయండి
# డెక్స్ చిరునామాను స్పేండర్‌గా ఆమోదించండి
# మరియు అది మీ టోకెన్‌లలో ఎన్ని ఖర్చు చేయడానికి అనుమతించబడిందో
token.approve(dex.address, 3e18, {'from':account2})

```

ఆ తర్వాత సెల్ ఫంక్షన్‌ను కాల్ చేసినప్పుడు, కాలర్ చిరునామా నుండి కాంట్రాక్ట్ చిరునామాకు బదిలీ విజయవంతమైందో లేదో తనిఖీ చేసి, ఆపై ఈథర్‌లను తిరిగి కాలర్ చిరునామాకు పంపుతాము.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "మీరు కనీసం కొన్ని టోకెన్‌లను అమ్మాలి");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "టోకెన్ అలవెన్సును తనిఖీ చేయండి");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

అన్నీ సరిగ్గా పనిచేస్తే, మీరు లావాదేవీలో 2 ఈవెంట్‌లను (`Transfer` మరియు `Sold`) చూడాలి మరియు మీ టోకెన్ బ్యాలెన్స్ మరియు ఈథర్ బ్యాలెన్స్ నవీకరించబడతాయి.

![లావాదేవీలో రెండు ఈవెంట్‌లు: బదిలీ మరియు అమ్మకం](./transfer-and-sold-events.png)

<Divider />

ఈ ట్యుటోరియల్ నుండి మనం ఒక ERC-20 టోకెన్ యొక్క బ్యాలెన్స్ మరియు అలవెన్సును ఎలా తనిఖీ చేయాలో, అలాగే ఇంటర్‌ఫేస్‌ను ఉపయోగించి ఒక ERC20 స్మార్ట్ కాంట్రాక్ట్ యొక్క `Transfer` మరియు `TransferFrom`ను ఎలా కాల్ చేయాలో చూశాము.

మీరు ఒక లావాదేవీ చేసిన తర్వాత, మీ కాంట్రాక్ట్‌కు చేయబడిన [లావాదేవీల కోసం వేచి ఉండి వాటి వివరాలను పొందడానికి](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) మా వద్ద ఒక జావాస్క్రిప్ట్ ట్యుటోరియల్ ఉంది, మరియు మీ వద్ద ABI ఉన్నంత వరకు టోకెన్ బదిలీలు లేదా మరే ఇతర ఈవెంట్‌ల ద్వారా ఉత్పత్తి చేయబడిన [ఈవెంట్‌లను డీకోడ్ చేయడానికి ఒక ట్యుటోరియల్](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) కూడా ఉంది.

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
        require(amountTobuy > 0, "మీరు కొంత ఈథర్‌ను పంపాలి");
        require(amountTobuy <= dexBalance, "రిజర్వ్‌లో తగినన్ని టోకెన్‌లు లేవు");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "మీరు కనీసం కొన్ని టోకెన్‌లను అమ్మాలి");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "టోకెన్ అలవెన్సును తనిఖీ చేయండి");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
