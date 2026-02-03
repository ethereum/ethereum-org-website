---
title: "ERC-20 టోకెన్ స్మార్ట్ కాంట్రాక్టును అర్థం చేసుకోండి"
description: "పూర్తి Solidity స్మార్ట్ కాంట్రాక్టు ఉదాహరణ మరియు వివరణతో ERC-20 టోకెన్ ప్రామాణికాన్ని ఎలా అమలు చేయాలో తెలుసుకోండి."
author: "jdourlens"
tags:
  [
    "స్మార్ట్ కాంట్రాక్టులు",
    "టోకెన్లు",
    "దృఢత్వం",
    "erc-20"
  ]
skill: "ఆరంభకులు"
lang: te
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereumలో అత్యంత ముఖ్యమైన [స్మార్ట్ కాంట్రాక్టు ప్రామాణికాలలో](/developers/docs/standards/) ఒకటి [ERC-20](/developers/docs/standards/tokens/erc-20/)గా పిలువబడుతుంది, ఇది ఫంగిబుల్ టోకెన్ అమలుల కోసం Ethereum బ్లాక్ చైనులో అన్ని స్మార్ట్ కాంట్రాక్టుల కొరకు ఉపయోగించే సాంకేతిక ప్రామాణికంగా ఉద్భవించింది.

అన్ని ఫంగిబుల్ Ethereum టోకెన్‌లు కట్టుబడి ఉండవలసిన సాధారణ నియమాల జాబితాను ERC-20 నిర్వచిస్తుంది. పర్యవసానంగా, ఈ టోకెన్ ప్రామాణికం అన్ని రకాల డెవలపర్‌లకు పెద్ద Ethereum వ్యవస్థలో కొత్త టోకెన్‌లు ఎలా పనిచేస్తాయో ఖచ్చితంగా అంచనా వేయడానికి అధికారం ఇస్తుంది. ఇది డెవలపర్‌ల పనులను సరళతరం చేస్తుంది మరియు సులభతరం చేస్తుంది, ఎందుకంటే టోకెన్ నియమాలను అనుసరిస్తున్నంత వరకు, ప్రతి కొత్త టోకెన్ విడుదలైన ప్రతిసారీ ప్రతి కొత్త ప్రాజెక్ట్‌ను పునరావృతం చేయాల్సిన అవసరం లేదని తెలుసుకుని వారు తమ పనిని కొనసాగించవచ్చు.

ఒక ఇంటర్‌ఫేస్‌గా ఇక్కడ ప్రదర్శించబడింది, ఒక ERC-20 అమలు చేయవలసిన ఫంక్షన్‌లు. ఒక ఇంటర్‌ఫేస్ అంటే ఏమిటో మీకు ఖచ్చితంగా తెలియకపోతే: [Solidityలో OOP ప్రోగ్రామింగ్](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) గురించిన మా కథనాన్ని తనిఖీ చేయండి.

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

ప్రతి ఫంక్షన్ దేనికి ఉపయోగపడుతుందో ఇక్కడ ఒక లైన్-ద్వారా-లైన్ వివరణ ఉంది. దీని తర్వాత మేము ERC-20 టోకెన్ యొక్క ఒక సాధారణ అమలును ప్రదర్శిస్తాము.

## గెట్టర్లు {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

ఉనికిలో ఉన్న టోకెన్ల మొత్తాన్ని తిరిగి ఇస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు కాంట్రాక్టు యొక్క స్థితిని సవరించదు. Solidityలో ఫ్లోట్‌లు లేవని గుర్తుంచుకోండి. అందువల్ల చాలా టోకెన్‌లు 18 దశాంశాలను అవలంబిస్తాయి మరియు 1 టోకెన్ కోసం మొత్తం సరఫరా మరియు ఇతర ఫలితాలను 1000000000000000000గా తిరిగి ఇస్తాయి. ప్రతి టోకెన్‌కు 18 దశాంశాలు ఉండవు మరియు టోకెన్‌లతో వ్యవహరించేటప్పుడు మీరు నిజంగా గమనించవలసిన విషయం ఇది.

```solidity
function balanceOf(address account) external view returns (uint256);
```

ఒక చిరునామా (`account`) యాజమాన్యంలో ఉన్న టోకెన్ల మొత్తాన్ని తిరిగి ఇస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు కాంట్రాక్టు యొక్క స్థితిని సవరించదు.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 ప్రామాణికం ఒక చిరునామా నుండి టోకెన్‌లను తిరిగి పొందగలిగేలా మరొక చిరునామాకు అనుమతి ఇవ్వడానికి ఒక చిరునామాను అనుమతిస్తుంది. `owner` తరపున `spender` ఖర్చు చేయడానికి అనుమతించబడే మిగిలిన టోకెన్‌ల సంఖ్యను ఈ గెట్టర్ తిరిగి ఇస్తుంది. ఈ ఫంక్షన్ ఒక గెట్టర్ మరియు కాంట్రాక్టు యొక్క స్థితిని మార్చదు మరియు డిఫాల్ట్‌గా 0ని తిరిగి ఇవ్వాలి.

## ఫంక్షన్స్ {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ఫంక్షన్ కాలర్ చిరునామా (`msg.sender`) నుండి గ్రహీత చిరునామాకు టోకెన్ల `amount`ను తరలిస్తుంది. ఈ ఫంక్షన్ తరువాత నిర్వచించిన `Transfer` ఈవెంట్‌ను వెలువరిస్తుంది. బదిలీ సాధ్యమైతే అది ట్రూ (నిజం) అని తిరిగి ఇస్తుంది.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

ఫంక్షన్ కాలర్ (`msg.sender`) బ్యాలెన్స్ నుండి `spender` బదిలీ చేయడానికి అనుమతించబడిన `allowance` మొత్తాన్ని సెట్ చేస్తుంది. ఈ ఫంక్షన్ Approval ఈవెంట్‌ను వెలువరిస్తుంది. అనుమతి విజయవంతంగా సెట్ చేయబడిందా లేదా అనేదాన్ని ఫంక్షన్ తిరిగి ఇస్తుంది.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

అనుమతి యంత్రాంగాన్ని ఉపయోగించి `sender` నుండి `recipient`కి టోకెన్‌ల `amount`ను తరలిస్తుంది. ఆ తర్వాత కాలర్ యొక్క అనుమతి నుండి amount తీసివేయబడుతుంది. ఈ ఫంక్షన్ `Transfer` ఈవెంట్‌ను వెలువరిస్తుంది.

## ఈవెంట్‌లు {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

టోకెన్‌ల మొత్తం (value) `from` చిరునామా నుండి `to` చిరునామాకు పంపబడినప్పుడు ఈ ఈవెంట్ వెలువడుతుంది.

కొత్త టోకెన్‌లను మింటింగ్ చేసే సందర్భంలో, బదిలీ సాధారణంగా `from` 0x00..0000 చిరునామా నుండి ఉంటుంది, అయితే టోకెన్‌లను బర్న్ చేసే సందర్భంలో బదిలీ `to` 0x00..0000 చిరునామాకు ఉంటుంది.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

`spender` ద్వారా ఉపయోగించబడటానికి `owner` ద్వారా టోకెన్‌ల మొత్తం (`value`) ఆమోదించబడినప్పుడు ఈ ఈవెంట్ వెలువడుతుంది.

## ERC-20 టోకెన్‌ల యొక్క ఒక ప్రాథమిక అమలు {#a-basic-implementation-of-erc-20-tokens}

మీ ERC-20 టోకెన్‌ను ఆధారంగా చేసుకోవడానికి అత్యంత సరళమైన కోడ్ ఇక్కడ ఉంది:

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

ERC-20 టోకెన్ ప్రామాణికం యొక్క మరొక అద్భుతమైన అమలు [ఓపెన్‌జెప్పెలిన్ ERC-20 అమలు](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
