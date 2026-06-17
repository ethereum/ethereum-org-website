---
title: "ERC-223 టోకెన్ ప్రమాణం"
description: "ERC-223 ఫంజిబుల్ టోకెన్ ప్రమాణం, అది ఎలా పనిచేస్తుంది మరియు ERC-20తో పోలిక గురించిన అవలోకనం."
lang: te
---

## పరిచయం {#introduction}

### ERC-223 అంటే ఏమిటి? {#what-is-erc223}

ERC-223 అనేది ఫంజిబుల్ టోకెన్‌ల కోసం ఒక ప్రమాణం, ఇది ERC-20 ప్రమాణాన్ని పోలి ఉంటుంది. ప్రధాన వ్యత్యాసం ఏమిటంటే, ERC-223 టోకెన్ APIని మాత్రమే కాకుండా పంపినవారి నుండి స్వీకర్తకు టోకెన్‌లను బదిలీ చేసే లాజిక్‌ను కూడా నిర్వచిస్తుంది. ఇది టోకెన్ బదిలీలను స్వీకర్త వైపు నిర్వహించడానికి అనుమతించే కమ్యూనికేషన్ మోడల్‌ను పరిచయం చేస్తుంది.

### ERC-20 నుండి వ్యత్యాసాలు {#erc20-differences}

ERC-223 అనేది ERC-20 యొక్క కొన్ని పరిమితులను పరిష్కరిస్తుంది మరియు టోకెన్ కాంట్రాక్ట్ మరియు టోకెన్‌లను స్వీకరించే కాంట్రాక్ట్ మధ్య పరస్పర చర్య యొక్క కొత్త పద్ధతిని పరిచయం చేస్తుంది. ERC-223తో సాధ్యమయ్యే కానీ ERC-20తో సాధ్యంకాని కొన్ని విషయాలు ఉన్నాయి:

- స్వీకర్త వైపు టోకెన్ బదిలీ నిర్వహణ: ERC-223 టోకెన్ డిపాజిట్ చేయబడుతోందని స్వీకర్తలు గుర్తించగలరు.
- సరిగ్గా పంపని టోకెన్‌ల తిరస్కరణ: ఒక వినియోగదారు టోకెన్‌లను స్వీకరించకూడని కాంట్రాక్ట్‌కు ERC-223 టోకెన్‌లను పంపితే, ఆ కాంట్రాక్ట్ లావాదేవీని తిరస్కరించగలదు, తద్వారా టోకెన్ నష్టాన్ని నివారించవచ్చు.
- బదిలీలలో మెటాడేటా: ERC-223 టోకెన్‌లు మెటాడేటాను చేర్చగలవు, తద్వారా టోకెన్ లావాదేవీలకు ఏకపక్ష సమాచారాన్ని జోడించడానికి అనుమతిస్తుంది.

## ముందస్తు అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts)
- [స్మార్ట్ కాంట్రాక్ట్‌లు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## ప్రధాన భాగం {#body}

ERC-223 అనేది స్మార్ట్ కాంట్రాక్ట్‌లలోని టోకెన్‌ల కోసం APIని అమలు చేసే టోకెన్ ప్రమాణం. ఇది ERC-223 టోకెన్‌లను స్వీకరించాల్సిన కాంట్రాక్ట్‌ల కోసం APIని కూడా ప్రకటిస్తుంది. ERC-223 రిసీవర్ APIకి మద్దతు ఇవ్వని కాంట్రాక్ట్‌లు ERC-223 టోకెన్‌లను స్వీకరించలేవు, తద్వారా వినియోగదారు లోపాన్ని నివారిస్తుంది.

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే దానిని ERC-223 అనుకూల టోకెన్ కాంట్రాక్ట్ అని పిలవవచ్చు. డిప్లాయ్ చేసిన తర్వాత, ఎథీరియంలో సృష్టించబడిన టోకెన్‌లను ట్రాక్ చేయడానికి ఇది బాధ్యత వహిస్తుంది.

కాంట్రాక్ట్ ఈ ఫంక్షన్‌లను మాత్రమే కలిగి ఉండాల్సిన అవసరం లేదు మరియు డెవలపర్ వివిధ టోకెన్ ప్రమాణాల నుండి ఏదైనా ఇతర ఫీచర్‌ను ఈ కాంట్రాక్ట్‌కు జోడించవచ్చు. ఉదాహరణకు, `approve` మరియు `transferFrom` ఫంక్షన్‌లు ERC-223 ప్రమాణంలో భాగం కావు కానీ అవసరమైతే ఈ ఫంక్షన్‌లను అమలు చేయవచ్చు.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) నుండి:

### పద్ధతులు {#methods}

ERC-223 టోకెన్ కింది పద్ధతులను అమలు చేయాలి:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 టోకెన్‌లను స్వీకరించాల్సిన కాంట్రాక్ట్ కింది పద్ధతిని అమలు చేయాలి:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

`tokenReceived(..)` ఫంక్షన్‌ను అమలు చేయని కాంట్రాక్ట్‌కు ERC-223 టోకెన్‌లు పంపబడితే, బదిలీ విఫలం కావాలి మరియు పంపినవారి బ్యాలెన్స్ నుండి టోకెన్‌లు తరలించబడకూడదు.

### ఈవెంట్‌లు {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### ఉదాహరణలు {#examples}

ERC-223 టోకెన్ యొక్క API ERC-20ని పోలి ఉంటుంది, కాబట్టి UI డెవలప్‌మెంట్ కోణం నుండి ఎటువంటి తేడా లేదు. ఇక్కడ ఉన్న ఏకైక మినహాయింపు ఏమిటంటే, ERC-223 టోకెన్‌లు `approve` + `transferFrom` ఫంక్షన్‌లను కలిగి ఉండకపోవచ్చు, ఎందుకంటే ఈ ప్రమాణానికి ఇవి ఐచ్ఛికం.

#### Solidity ఉదాహరణలు {#solidity-example}

ప్రాథమిక ERC-223 టోకెన్ కాంట్రాక్ట్ ఎలా పనిచేస్తుందో కింది ఉదాహరణ వివరిస్తుంది:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

ఇప్పుడు tokenA అనేది ERC-223 టోకెన్ అని ఊహిస్తూ, `tokenA` డిపాజిట్‌లను అంగీకరించడానికి మరొక కాంట్రాక్ట్ కావాలి. కాంట్రాక్ట్ tokenAని మాత్రమే అంగీకరించాలి మరియు ఇతర టోకెన్‌లను తిరస్కరించాలి. కాంట్రాక్ట్ tokenAని స్వీకరించినప్పుడు అది `Deposit()` ఈవెంట్‌ను విడుదల చేయాలి మరియు అంతర్గత `deposits` వేరియబుల్ విలువను పెంచాలి.

కోడ్ ఇక్కడ ఉంది:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // మనం అంగీకరించాలనుకుంటున్న ఏకైక టోకెన్.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // ఈ ఫంక్షన్ లోపల ఇది అర్థం చేసుకోవడం ముఖ్యం
        // msg.sender అనేది స్వీకరించబడుతున్న టోకెన్ యొక్క చిరునామా,
        // చాలా సందర్భాలలో టోకెన్ కాంట్రాక్ట్ ఈథర్‌ను కలిగి ఉండదు లేదా పంపదు కాబట్టి msg.value ఎల్లప్పుడూ 0 గా ఉంటుంది,
        // _from అనేది టోకెన్ బదిలీని పంపినవారు,
        // _value అనేది డిపాజిట్ చేయబడిన టోకెన్ల మొత్తం.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## తరచుగా అడిగే ప్రశ్నలు {#faq}

### మనం కాంట్రాక్ట్‌కు కొంత tokenBని పంపితే ఏమవుతుంది? {#sending-tokens}

లావాదేవీ విఫలమవుతుంది మరియు టోకెన్‌ల బదిలీ జరగదు. టోకెన్‌లు పంపినవారి చిరునామాకు తిరిగి ఇవ్వబడతాయి.

### మనం ఈ కాంట్రాక్ట్‌కు డిపాజిట్ ఎలా చేయవచ్చు? {#contract-deposits}

`RecipientContract` యొక్క చిరునామాను పేర్కొంటూ, ERC-223 టోకెన్ యొక్క `transfer(address,uint256)` లేదా `transfer(address,uint256,bytes)` ఫంక్షన్‌ను కాల్ చేయండి.

### మనం ఈ కాంట్రాక్ట్‌కు ERC-20 టోకెన్‌ను బదిలీ చేస్తే ఏమవుతుంది? {#erc-20-transfers}

ఒకవేళ ERC-20 టోకెన్ `RecipientContract`కి పంపబడితే, టోకెన్‌లు బదిలీ చేయబడతాయి, కానీ బదిలీ గుర్తించబడదు (`Deposit()` ఈవెంట్ ఫైర్ చేయబడదు మరియు డిపాజిట్‌ల విలువ మారదు). అవాంఛిత ERC-20 డిపాజిట్‌లను ఫిల్టర్ చేయడం లేదా నిరోధించడం సాధ్యం కాదు.

### టోకెన్ డిపాజిట్ పూర్తయిన తర్వాత మనం ఏదైనా ఫంక్షన్‌ను అమలు చేయాలనుకుంటే ఏమి చేయాలి? {#function-execution}

అలా చేయడానికి బహుళ మార్గాలు ఉన్నాయి. ఈ ఉదాహరణలో మనం ERC-223 బదిలీలను ఈథర్ బదిలీలకు సమానంగా చేసే పద్ధతిని అనుసరిస్తాము:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // మనం అంగీకరించాలనుకుంటున్న ఏకైక టోకెన్.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // ఇన్‌కమింగ్ లావాదేవీని నిర్వహించండి మరియు తదుపరి ఫంక్షన్ కాల్‌ను అమలు చేయండి.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

`RecipientContract` ERC-223 టోకెన్‌ను స్వీకరించినప్పుడు, ఈథర్ లావాదేవీలు ఫంక్షన్ కాల్‌లను లావాదేవీ `data`గా ఎలా ఎన్‌కోడ్ చేస్తాయో అదే విధంగా, కాంట్రాక్ట్ టోకెన్ లావాదేవీ యొక్క `_data` పారామీటర్‌గా ఎన్‌కోడ్ చేయబడిన ఫంక్షన్‌ను అమలు చేస్తుంది. మరింత సమాచారం కోసం [డేటా ఫీల్డ్](/developers/docs/transactions/#the-data-field) చదవండి.

పై ఉదాహరణలో ERC-223 టోకెన్ `transfer(address,uin256,bytes calldata _data)` ఫంక్షన్‌తో `RecipientContract` చిరునామాకు బదిలీ చేయబడాలి. డేటా పారామీటర్ `0xc2985578` (`foo()` ఫంక్షన్ యొక్క సంతకం) అయితే, టోకెన్ డిపాజిట్ స్వీకరించిన తర్వాత foo() ఫంక్షన్ ప్రారంభించబడుతుంది మరియు Foo() ఈవెంట్ ఫైర్ చేయబడుతుంది.

పారామీటర్‌లను టోకెన్ బదిలీ యొక్క `data`లో కూడా ఎన్‌కోడ్ చేయవచ్చు, ఉదాహరణకు మనం `_someNumber` కోసం 12345 విలువతో bar() ఫంక్షన్‌ను కాల్ చేయవచ్చు. ఈ సందర్భంలో `data` తప్పనిసరిగా `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` అయి ఉండాలి, ఇక్కడ `0x0423a132` అనేది `bar(uint256)` ఫంక్షన్ యొక్క సంతకం మరియు `00000000000000000000000000000000000000000000000000000000000004d2` అనేది uint256గా 12345.

## పరిమితులు {#limitations}

ERC-223 అనేది ERC-20 ప్రమాణంలో కనుగొనబడిన అనేక సమస్యలను పరిష్కరిస్తున్నప్పటికీ, ఇది దాని స్వంత పరిమితులు లేకుండా లేదు:

- స్వీకరణ మరియు అనుకూలత: ERC-223 ఇంకా విస్తృతంగా స్వీకరించబడలేదు, ఇది ఇప్పటికే ఉన్న సాధనాలు మరియు ప్లాట్‌ఫారమ్‌లతో దాని అనుకూలతను పరిమితం చేయవచ్చు.
- బ్యాక్‌వర్డ్ అనుకూలత: ERC-223 అనేది ERC-20తో బ్యాక్‌వర్డ్ అనుకూలతను కలిగి లేదు, అంటే ఇప్పటికే ఉన్న ERC-20 కాంట్రాక్ట్‌లు మరియు సాధనాలు మార్పులు లేకుండా ERC-223 టోకెన్‌లతో పనిచేయవు.
- గ్యాస్ ఖర్చులు: ERC-223 బదిలీలలోని అదనపు తనిఖీలు మరియు కార్యాచరణల వల్ల ERC-20 లావాదేవీలతో పోలిస్తే అధిక గ్యాస్ ఖర్చులు ఉండవచ్చు.

## మరింత చదవడానికి {#further-reading}

- [EIP-223: ERC-223 టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-223)
- [ప్రారంభ ERC-223 ప్రతిపాదన](https://github.com/ethereum/eips/issues/223)