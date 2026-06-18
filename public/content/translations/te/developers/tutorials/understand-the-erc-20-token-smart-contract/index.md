---
title: ERC-20 టోకెన్ స్మార్ట్ కాంట్రాక్ట్‌ను అర్థం చేసుకోండి
description: పూర్తి Solidity స్మార్ట్ కాంట్రాక్ట్ ఉదాహరణ మరియు వివరణతో ERC-20 టోకెన్ ప్రమాణాన్ని ఎలా అమలు చేయాలో తెలుసుకోండి.
author: jdourlens
tags:
  - స్మార్ట్ కాంట్రాక్ట్‌లు
  - టోకెన్‌లు
  - Solidity
  - ERC-20
skill: beginner
breadcrumb: ERC-20 టోకెన్ ప్రాథమిక అంశాలు
lang: te
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

ఎథీరియంపై అత్యంత ముఖ్యమైన [స్మార్ట్ కాంట్రాక్ట్ ప్రమాణాలలో](/developers/docs/standards/) ఒకటి [ERC-20](/developers/docs/standards/tokens/erc-20/)గా పిలువబడుతుంది, ఇది ఫంజిబుల్ టోకెన్ అమలుల కోసం ఎథీరియం బ్లాక్‌చైన్‌లోని అన్ని స్మార్ట్ కాంట్రాక్ట్‌లకు ఉపయోగించే సాంకేతిక ప్రమాణంగా ఉద్భవించింది.

అన్ని ఫంజిబుల్ ఎథీరియం టోకెన్‌లు కట్టుబడి ఉండాల్సిన సాధారణ నియమాల జాబితాను ERC-20 నిర్వచిస్తుంది. పర్యవసానంగా, ఈ టోకెన్ ప్రమాణం విస్తృత ఎథీరియం సిస్టమ్‌లో కొత్త టోకెన్‌లు ఎలా పనిచేస్తాయో ఖచ్చితంగా అంచనా వేయడానికి అన్ని రకాల డెవలపర్‌లకు అధికారం ఇస్తుంది. ఇది డెవలపర్‌ల పనులను సులభతరం చేస్తుంది, ఎందుకంటే టోకెన్ నియమాలను అనుసరించినంత కాలం, కొత్త టోకెన్ విడుదలైన ప్రతిసారీ ప్రతి కొత్త ప్రాజెక్ట్‌ను మళ్లీ చేయాల్సిన అవసరం లేదని తెలుసుకుని వారు తమ పనిని కొనసాగించవచ్చు.

ERC-20 అమలు చేయాల్సిన ఫంక్షన్‌లు ఇంటర్‌ఫేస్‌గా ఇక్కడ అందించబడ్డాయి. ఇంటర్‌ఫేస్ అంటే ఏమిటో మీకు ఖచ్చితంగా తెలియకపోతే: [Solidityలో OOP ప్రోగ్రామింగ్](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) గురించిన మా కథనాన్ని తనిఖీ చేయండి.

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

ప్రతి ఫంక్షన్ దేనికోసం ఉద్దేశించబడిందో వివరించే లైన్-బై-లైన్ వివరణ ఇక్కడ ఉంది. దీని తర్వాత మేము ERC-20 టోకెన్ యొక్క సాధారణ అమలును అందిస్తాము.

## గెట్టర్‌లు {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

ఉనికిలో ఉన్న టోకెన్‌ల మొత్తాన్ని అందిస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు ఇది కాంట్రాక్ట్ యొక్క స్థితిని సవరించదు. Solidityలో ఫ్లోట్‌లు (floats) లేవని గుర్తుంచుకోండి. అందువల్ల చాలా టోకెన్‌లు 18 దశాంశాలను స్వీకరిస్తాయి మరియు 1 టోకెన్‌కు 1000000000000000000గా మొత్తం సరఫరా మరియు ఇతర ఫలితాలను అందిస్తాయి. ప్రతి టోకెన్‌కు 18 దశాంశాలు ఉండవు మరియు టోకెన్‌లతో వ్యవహరించేటప్పుడు మీరు నిజంగా గమనించాల్సిన విషయం ఇది.

```solidity
function balanceOf(address account) external view returns (uint256);
```

ఒక చిరునామా (`account`) కలిగి ఉన్న టోకెన్‌ల మొత్తాన్ని అందిస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు ఇది కాంట్రాక్ట్ యొక్క స్థితిని సవరించదు.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 ప్రమాణం ఒక చిరునామా నుండి టోకెన్‌లను తిరిగి పొందగలిగేలా మరొక చిరునామాకు అనుమతి మొత్తం ఇవ్వడానికి అనుమతిస్తుంది. ఈ గెట్టర్ `owner` తరపున ఖర్చు చేయడానికి `spender`కి అనుమతించబడే మిగిలిన టోకెన్‌ల సంఖ్యను అందిస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు ఇది కాంట్రాక్ట్ యొక్క స్థితిని సవరించదు మరియు డిఫాల్ట్‌గా 0ని అందించాలి.

## ఫంక్షన్‌లు {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ఫంక్షన్ కాలర్ చిరునామా (`msg.sender`) నుండి స్వీకర్త చిరునామాకు టోకెన్‌ల `amount`ను బదిలీ చేస్తుంది. ఈ ఫంక్షన్ తర్వాత నిర్వచించబడిన `Transfer` ఈవెంట్‌ను విడుదల చేస్తుంది. బదిలీ సాధ్యమైతే ఇది trueని అందిస్తుంది.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

ఫంక్షన్ కాలర్ (`msg.sender`) బ్యాలెన్స్ నుండి బదిలీ చేయడానికి `spender`కి అనుమతించబడిన `allowance` మొత్తాన్ని సెట్ చేస్తుంది. ఈ ఫంక్షన్ Approval ఈవెంట్‌ను విడుదల చేస్తుంది. అనుమతి మొత్తం విజయవంతంగా సెట్ చేయబడిందో లేదో ఈ ఫంక్షన్ అందిస్తుంది.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

అనుమతి మొత్తం మెకానిజంను ఉపయోగించి `sender` నుండి `recipient`కి టోకెన్‌ల `amount`ను బదిలీ చేస్తుంది. ఆ తర్వాత కాలర్ యొక్క అనుమతి మొత్తం నుండి ఆ మొత్తం తీసివేయబడుతుంది. ఈ ఫంక్షన్ `Transfer` ఈవెంట్‌ను విడుదల చేస్తుంది.

## ఈవెంట్‌లు {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

టోకెన్‌ల మొత్తం (విలువ) `from` చిరునామా నుండి `to` చిరునామాకు పంపబడినప్పుడు ఈ ఈవెంట్ విడుదల చేయబడుతుంది.

కొత్త టోకెన్‌లను ముద్రించడం విషయంలో, బదిలీ సాధారణంగా 0x00..0000 చిరునామా `from` జరుగుతుంది, అయితే టోకెన్‌లను దహనం చేయు విషయంలో బదిలీ 0x00..0000 `to` జరుగుతుంది.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

టోకెన్‌ల మొత్తం (`value`) `spender` ద్వారా ఉపయోగించబడటానికి `owner` ద్వారా ఆమోదించబడినప్పుడు ఈ ఈవెంట్ విడుదల చేయబడుతుంది.

## ERC-20 టోకెన్‌ల యొక్క ప్రాథమిక అమలు {#a-basic-implementation-of-erc-20-tokens}

మీ ERC-20 టోకెన్‌ను ఆధారం చేసుకోవడానికి అత్యంత సులభమైన కోడ్ ఇక్కడ ఉంది:

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

ERC-20 టోకెన్ ప్రమాణం యొక్క మరొక అద్భుతమైన అమలు [ఓపెన్‌జెప్పెలిన్ ERC-20 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).