---
title: ERC-223 టోకెన్ ప్రమాణం
description: ERC-223 ఫంగిబుల్ టోకెన్ ప్రమాణం యొక్క అవలోకనం, అది ఎలా పనిచేస్తుంది, మరియు ERC-20తో పోలిక.
lang: te
---

## పరిచయం {#introduction}

### ERC-223 అంటే ఏమిటి? {#what-is-erc223}

ERC-223 అనేది ERC-20 ప్రమాణాన్ని పోలిన, ఫంగిబుల్ టోకెన్ల కోసం ఒక ప్రమాణం. ప్రధాన వ్యత్యాసం ఏమిటంటే, ERC-223 టోకెన్ APIని మాత్రమే కాకుండా, పంపినవారి నుండి గ్రహీతకు టోకెన్‌లను బదిలీ చేయడానికి లాజిక్‌ను కూడా నిర్వచిస్తుంది. ఇది గ్రహీత వైపు టోకెన్ బదిలీలను నిర్వహించడానికి అనుమతించే కమ్యూనికేషన్ నమూనాని పరిచయం చేస్తుంది.

### ERC-20 నుండి తేడాలు {#erc20-differences}

ERC-223, ERC-20 యొక్క కొన్ని పరిమితులను పరిష్కరిస్తుంది మరియు టోకెన్ కాంట్రాక్ట్ మరియు టోకెన్‌లను స్వీకరించగల కాంట్రాక్ట్ మధ్య పరస్పర చర్య యొక్క కొత్త పద్ధతిని పరిచయం చేస్తుంది. ERC-223తో సాధ్యమయ్యే కొన్ని విషయాలు ఉన్నాయి కానీ ERC-20తో సాధ్యం కావు:

- గ్రహీత వైపు టోకెన్ బదిలీ నిర్వహణ: ERC-223 టోకెన్ డిపాజిట్ చేయబడుతోందని గ్రహీతలు గుర్తించగలరు.
- సరిగ్గా పంపని టోకెన్‌ల తిరస్కరణ: ఒక వినియోగదారుడు టోకెన్‌లను స్వీకరించకూడని కాంట్రాక్ట్‌కు ERC-223 టోకెన్‌లను పంపితే, కాంట్రాక్ట్ ఆ లావాదేవీని తిరస్కరించగలదు, తద్వారా టోకెన్ నష్టాన్ని నివారిస్తుంది.
- బదిలీలలో మెటాడేటా: ERC-223 టోకెన్‌లు మెటాడేటాను కలిగి ఉంటాయి, ఇది టోకెన్ లావాదేవీలకు ఏకపక్ష సమాచారాన్ని జోడించడానికి అనుమతిస్తుంది.

## అవసరాలు {#prerequisites}

- [ఖాతాలు](/developers/docs/accounts)
- [స్మార్ట్ కాంట్రాక్టులు](/developers/docs/smart-contracts/)
- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## బాడీ {#body}

ERC-223 అనేది స్మార్ట్ కాంట్రాక్టులలో టోకెన్‌ల కోసం APIని అమలు చేసే ఒక టోకెన్ ప్రమాణం. ఇది ERC-223 టోకెన్‌లను స్వీకరించాల్సిన కాంట్రాక్టుల కోసం ఒక APIని కూడా ప్రకటిస్తుంది. ERC-223 రిసీవర్ APIకి మద్దతు ఇవ్వని కాంట్రాక్టులు ERC-223 టోకెన్‌లను స్వీకరించలేవు, వినియోగదారుడి పొరపాటును నివారిస్తాయి.

ఒక స్మార్ట్ కాంట్రాక్ట్ కింది పద్ధతులు మరియు ఈవెంట్‌లను అమలు చేస్తే, దానిని ERC-223 అనుకూల టోకెన్ కాంట్రాక్ట్ అని పిలుస్తారు. ఒకసారి డిప్లాయ్ చేసిన తర్వాత, అది
Ethereumలో సృష్టించబడిన టోకెన్‌లను ట్రాక్ చేయడానికి బాధ్యత వహిస్తుంది.

కాంట్రాక్ట్ కేవలం ఈ ఫంక్షన్‌లను మాత్రమే కలిగి ఉండవలసిన అవసరం లేదు మరియు ఒక డెవలపర్ ఈ కాంట్రాక్ట్‌కు వేర్వేరు టోకెన్ ప్రమాణాల నుండి ఏదైనా ఇతర ఫీచర్‌ను జోడించవచ్చు. ఉదాహరణకు, `approve` మరియు `transferFrom` ఫంక్షన్లు ERC-223 ప్రమాణంలో భాగం కావు కానీ అవసరమైతే ఈ ఫంక్షన్లను అమలు చేయవచ్చు.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) నుండి:

### పద్ధతులు {#methods}

ERC-223 టోకెన్ తప్పనిసరిగా క్రింది పద్ధతులను అమలు చేయాలి:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 టోకెన్‌లను స్వీకరించాల్సిన ఒక కాంట్రాక్ట్ తప్పనిసరిగా క్రింది పద్ధతిని అమలు చేయాలి:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

`tokenReceived(..)` ఫంక్షన్‌ను అమలు చేయని కాంట్రాక్ట్‌కు ERC-223 టోకెన్‌లు పంపబడితే, బదిలీ విఫలం కావాలి మరియు టోకెన్‌లు పంపినవారి బ్యాలెన్స్ నుండి కదలకూడదు.

### ఈవెంట్‌లు {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### ఉదాహరణలు {#examples}

ERC-223 టోకెన్ యొక్క API, ERC-20 మాదిరిగానే ఉంటుంది, కాబట్టి UI అభివృద్ధి కోణం నుండి ఎటువంటి తేడా లేదు. ఇక్కడ ఉన్న ఏకైక మినహాయింపు ఏమిటంటే, ERC-223 టోకెన్‌లకు `approve` + `transferFrom` ఫంక్షన్‌లు ఉండకపోవచ్చు, ఎందుకంటే ఈ ప్రమాణానికి ఇవి ఐచ్ఛికం.

#### Solidity ఉదాహరణలు {#solidity-example}

కింది ఉదాహరణ ఒక ప్రాథమిక ERC-223 టోకెన్ కాంట్రాక్ట్ ఎలా పనిచేస్తుందో వివరిస్తుంది:

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

ఇప్పుడు tokenA ఒక ERC-223 టోకెన్ అని భావించి, `tokenA` డిపాజిట్లను అంగీకరించడానికి మాకు మరొక కాంట్రాక్ట్ కావాలి. కాంట్రాక్ట్ కేవలం tokenAని మాత్రమే అంగీకరించాలి మరియు ఏవైనా ఇతర టోకెన్‌లను తిరస్కరించాలి. కాంట్రాక్ట్ tokenAని స్వీకరించినప్పుడు అది ఒక `Deposit()` ఈవెంట్‌ను విడుదల చేయాలి మరియు అంతర్గత `deposits` వేరియబుల్ విలువను పెంచాలి.

ఇదిగో కోడ్:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // మేము అంగీకరించాలనుకుంటున్న ఏకైక టోకెన్.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // ఈ ఫంక్షన్‌లో ఇది అర్థం చేసుకోవడం ముఖ్యం
        // msg.sender అనేది స్వీకరించబడుతున్న టోకెన్ యొక్క చిరునామా,
        // టోకెన్ కాంట్రాక్ట్ చాలా సందర్భాలలో ఈథర్‌ను కలిగి ఉండదు లేదా పంపదు కాబట్టి msg.value ఎల్లప్పుడూ 0గా ఉంటుంది,
        // _from అనేది టోకెన్ బదిలీని పంపినవారు,
        // _value అనేది డిపాజిట్ చేయబడిన టోకెన్‌ల మొత్తం.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## తరచుగా అడిగే ప్రశ్నలు {#faq}

### మనం కాంట్రాక్ట్‌కు కొంత tokenBని పంపితే ఏమి జరుగుతుంది? {#sending-tokens}

లావాదేవీ విఫలమవుతుంది, మరియు టోకెన్‌ల బదిలీ జరగదు. టోకెన్‌లు పంపినవారి చిరునామాకు తిరిగి ఇవ్వబడతాయి.

### ఈ కాంట్రాక్ట్‌కు మనం ఎలా డిపాజిట్ చేయవచ్చు? {#contract-deposits}

`RecipientContract` యొక్క చిరునామాను పేర్కొంటూ, ERC-223 టోకెన్ యొక్క `transfer(address,uint256)` లేదా `transfer(address,uint256,bytes)` ఫంక్షన్‌ను కాల్ చేయండి.

### మనం ఈ కాంట్రాక్ట్‌కు ఒక ERC-20 టోకెన్‌ను బదిలీ చేస్తే ఏమి జరుగుతుంది? {#erc-20-transfers}

`RecipientContract`కు ఒక ERC-20 టోకెన్ పంపబడితే, టోకెన్‌లు బదిలీ చేయబడతాయి, కానీ బదిలీ గుర్తించబడదు (`Deposit()` ఈవెంట్ ఫైర్ చేయబడదు, మరియు డిపాజిట్ల విలువ మారదు). అవాంఛిత ERC-20 డిపాజిట్లను ఫిల్టర్ చేయడం లేదా నిరోధించడం సాధ్యం కాదు.

### టోకెన్ డిపాజిట్ పూర్తయిన తర్వాత మనం ఏదైనా ఫంక్షన్‌ను ఎగ్జిక్యూట్ చేయాలనుకుంటే ఏమి చేయాలి? {#function-execution}

అలా చేయడానికి అనేక మార్గాలు ఉన్నాయి. ఈ ఉదాహరణలో మనం ERC-223 బదిలీలను ఈథర్ బదిలీలతో సమానంగా చేసే పద్ధతిని అనుసరిస్తాము:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // మేము అంగీకరించాలనుకుంటున్న ఏకైక టోకెన్.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // ఇన్‌కమింగ్ లావాదేవీని హ్యాండిల్ చేయండి మరియు తదుపరి ఫంక్షన్ కాల్‌ను నిర్వహించండి.
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

`RecipientContract` ఒక ERC-223 టోకెన్‌ను స్వీకరించినప్పుడు, ఈథర్ లావాదేవీలు ఫంక్షన్ కాల్స్‌ను లావాదేవీ `data`గా ఎలా ఎన్‌కోడ్ చేస్తాయో అదే విధంగా, టోకెన్ లావాదేవీ యొక్క `_data` పారామీటర్‌గా ఎన్‌కోడ్ చేయబడిన ఒక ఫంక్షన్‌ను కాంట్రాక్ట్ ఎగ్జిక్యూట్ చేస్తుంది. మరింత సమాచారం కోసం [డేటా ఫీల్డ్](/developers/docs/transactions/#the-data-field) చదవండి.

పై ఉదాహరణలో `transfer(address,uin256,bytes calldata _data)` ఫంక్షన్‌తో `RecipientContract` చిరునామాకు ఒక ERC-223 టోకెన్ బదిలీ చేయబడాలి. డేటా పారామీటర్ `0xc2985578` (`foo()` ఫంక్షన్ యొక్క సిగ్నేచర్) అయితే, టోకెన్ డిపాజిట్ స్వీకరించిన తర్వాత foo() ఫంక్షన్ ఇన్వోక్ చేయబడుతుంది మరియు Foo() ఈవెంట్ ఫైర్ చేయబడుతుంది.

టోకెన్ బదిలీ యొక్క `data`లో పారామీటర్లను కూడా ఎన్‌కోడ్ చేయవచ్చు, ఉదాహరణకు మనం `_someNumber` కోసం 12345 విలువతో bar() ఫంక్షన్‌ను కాల్ చేయవచ్చు. ఈ సందర్భంలో `data` తప్పనిసరిగా `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ఉండాలి, ఇక్కడ `0x0423a132` అనేది `bar(uint256)` ఫంక్షన్ యొక్క సిగ్నేచర్ మరియు `00000000000000000000000000000000000000000000000000000000000004d2` అనేది uint256గా 12345.

## పరిమితులు {#limitations}

ERC-223 ప్రమాణంలో కనుగొనబడిన అనేక సమస్యలను ERC-223 పరిష్కరించినప్పటికీ, దానికి కూడా కొన్ని పరిమితులు ఉన్నాయి:

- అంగీకారం మరియు అనుకూలత: ERC-223 ఇంకా విస్తృతంగా ఆమోదించబడలేదు, ఇది ఇప్పటికే ఉన్న టూల్స్ మరియు ప్లాట్‌ఫారమ్‌లతో దాని అనుకూలతను పరిమితం చేయవచ్చు.
- బ్యాక్‌వర్డ్ కంపాటిబిలిటీ: ERC-223, ERC-20తో బ్యాక్‌వర్డ్ కంపాటిబుల్ కాదు, అంటే ఇప్పటికే ఉన్న ERC-20 కాంట్రాక్టులు మరియు టూల్స్ మార్పులు లేకుండా ERC-223 టోకెన్‌లతో పనిచేయవు.
- గ్యాస్ ఖర్చులు: ERC-223 బదిలీలలో అదనపు తనిఖీలు మరియు కార్యాచరణలు ERC-20 లావాదేవీలతో పోలిస్తే అధిక గ్యాస్ ఖర్చులకు దారితీయవచ్చు.

## మరింత సమాచారం {#further-reading}

- [EIP-223: ERC-223 టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-223)
- [ప్రారంభ ERC-223 ప్రతిపాదన](https://github.com/ethereum/eips/issues/223)
