---
title: "స్కామ్ టోకెన్‌లు ఉపయోగించే కొన్ని ఉపాయాలు మరియు వాటిని ఎలా గుర్తించాలి"
description: ఈ ట్యుటోరియల్‌లో స్కామర్లు ఆడే కొన్ని ఉపాయాలు, వారు వాటిని ఎలా అమలు చేస్తారు మరియు మనం వాటిని ఎలా గుర్తించవచ్చో చూడటానికి మేము ఒక స్కామ్ టోకెన్‌ను విడదీస్తాము.
author: ఓరి పోమెరాంట్జ్
tags:
  [
    "స్కామ్",
    "దృఢత్వం",
    "erc-20",
    "జావాస్క్రిప్ట్",
    "typescript"
  ]
skill: మధ్యస్థ
published: 2023-09-15
lang: te
---

ఈ ట్యుటోరియల్‌లో స్కామర్‌లు ఆడే కొన్ని ఉపాయాలు మరియు వారు వాటిని ఎలా అమలు చేస్తారో చూడటానికి మేము [ఒక స్కామ్ టోకెన్‌ను](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) విడదీస్తాము. ట్యుటోరియల్ ముగిసేనాటికి మీరు ERC-20 టోకెన్ కాంట్రాక్టులు, వాటి సామర్థ్యాలు మరియు సంశయవాదం ఎందుకు అవసరమో అనే దానిపై మరింత సమగ్రమైన దృక్పథాన్ని కలిగి ఉంటారు. ఆ తర్వాత మేము ఆ స్కామ్ టోకెన్ ద్వారా వెలువడే ఈవెంట్‌లను పరిశీలించి, అది చట్టబద్ధమైనది కాదని మేము స్వయంచాలకంగా ఎలా గుర్తించగలమో చూస్తాము.

## స్కామ్ టోకెన్లు - అవి ఏమిటి, ప్రజలు వాటిని ఎందుకు చేస్తారు మరియు వాటిని ఎలా నివారించాలి {#scam-tokens}

Ethereumకు అత్యంత సాధారణ ఉపయోగాలలో ఒకటి ఒక సమూహం వ్యాపారం చేయగల టోకెన్‌ను సృష్టించడం, ఒక రకంగా చెప్పాలంటే వారి స్వంత కరెన్సీ. అయినప్పటికీ, చాలా చోట్ల మంచిగా విలువ తెచ్చే విధంగా ఉంటాయి, దీనితో పాటు దొంగలు కూడా దీనిని దొంగతనం చేయాలి అని చూస్తున్నారు అవి వాళ్ళకి విలువ ని ఇస్తాయి.

మీరు ఈ విషయం గురించి వినియోగదారుడి దృష్టికోణం నుండి [ethereum.orgలో వేరే చోట](/guides/how-to-id-scam-tokens/) మరింత చదవవచ్చు. ఈ ట్యుటోరియల్ ఒక స్కామ్ టోకెన్‌ను విడదీసి అది ఎలా చేయబడుతుంది మరియు ఎలా గుర్తించబడుతుంది అని చూడటంపై దృష్టి పెడుతుంది.

### wARB ఒక స్కామ్ అని నాకు ఎలా తెలుసు? {#warb-scam}

మేము విడదీసే టోకెన్ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), ఇది చట్టబద్ధమైన [ARB టోకెన్‌కు](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) సమానమైనదిగా నటిస్తుంది.

ఏది చట్టబద్ధమైన టోకెన్ అని తెలుసుకోవడానికి సులభమైన మార్గం, దానిని ప్రారంభించిన సంస్థ, [ఆర్బిట్రమ్‌ను](https://arbitrum.foundation/) చూడటమే. చట్టబద్ధమైన చిరునామాలు [వారి డాక్యుమెంటేషన్‌లో](https://docs.arbitrum.foundation/deployment-addresses#token) పేర్కొనబడ్డాయి.

### సోర్స్ కోడ్ ఎందుకు అందుబాటులో ఉంది? {#why-source}

సాధారణంగా ఇతరులను మోసం చేయడానికి ప్రయత్నించే వ్యక్తులు రహస్యంగా ఉంటారని మేము ఆశిస్తాము, మరియు నిజానికి చాలా స్కామ్ టోకెన్‌లకు వాటి కోడ్ అందుబాటులో ఉండదు (ఉదాహరణకు, [ఇది](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) మరియు [ఇది](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

అయితే, చట్టబద్ధమైన టోకెన్లు సాధారణంగా వాటి సోర్స్ కోడ్‌ను ప్రచురిస్తాయి, కాబట్టి చట్టబద్ధంగా కనిపించడానికి స్కామ్ టోకెన్‌ల రచయితలు కూడా కొన్నిసార్లు అదే పని చేస్తారు. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) అనేది సోర్స్ కోడ్ అందుబాటులో ఉన్న ఆ టోకెన్‌లలో ఒకటి, ఇది దానిని అర్థం చేసుకోవడాన్ని సులభతరం చేస్తుంది.

కాంట్రాక్ట్ డిప్లాయర్లు సోర్స్ కోడ్‌ను ప్రచురించాలా వద్దా అని ఎంచుకోగలిగినప్పటికీ, వారు తప్పుడు సోర్స్ కోడ్‌ను ప్రచురించ _లేరు_. బ్లాక్ ఎక్స్‌ప్లోరర్ అందించిన సోర్స్ కోడ్‌ను స్వతంత్రంగా కంపైల్ చేస్తుంది మరియు అది ఖచ్చితమైన అదే బైట్‌కోడ్‌ను పొందకపోతే, అది ఆ సోర్స్ కోడ్‌ను తిరస్కరిస్తుంది. [మీరు దీని గురించి ఈథర్‌స్కాన్ సైట్‌లో మరింత చదవవచ్చు](https://etherscan.io/verifyContract).

## చట్టబద్ధమైన ERC-20 టోకెన్లతో పోలిక {#compare-legit-erc20}

మేము ఈ టోకెన్‌ను చట్టబద్ధమైన ERC-20 టోకెన్‌లతో పోల్చబోతున్నాము. చట్టబద్ధమైన ERC-20 టోకెన్లు సాధారణంగా ఎలా వ్రాయబడతాయో మీకు తెలిసి ఉండకపోతే, [ఈ ట్యుటోరియల్ చూడండి](/developers/tutorials/erc20-annotated-code/).

### విశేషాధికార చిరునామాలకు స్థిరాంకాలు {#constants-for-privileged-addresses}

కాంట్రాక్టులకు కొన్నిసార్లు విశేషాధికార చిరునామాలు అవసరం. దీర్ఘకాలిక ఉపయోగం కోసం రూపొందించబడిన కాంట్రాక్టులు కొన్ని విశేషాధికార చిరునామాలను మార్చడానికి అనుమతిస్తాయి, ఉదాహరణకు కొత్త మల్టీసిగ్ కాంట్రాక్ట్ వాడకాన్ని ప్రారంభించడానికి. ఇది చేయడానికి అనేక మార్గాలు ఉన్నాయి.

[`HOP` టోకెన్ కాంట్రాక్ట్](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) నమూనాని ఉపయోగిస్తుంది. విశేషాధికార చిరునామా `_owner` అని పిలవబడే ఫీల్డ్‌లో, స్టోరేజ్‌లో ఉంచబడుతుంది (మూడవ ఫైల్, `Ownable.sol` చూడండి).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` టోకెన్ కాంట్రాక్ట్‌కు](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) నేరుగా విశేషాధికార చిరునామా లేదు. అయితే, దానికి ఒకటి అవసరం లేదు. ఇది [చిరునామా `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) వద్ద ఉన్న [`ప్రాక్సీ`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) వెనుక ఉంటుంది. ఆ కాంట్రాక్ట్‌కు విశేషాధికార చిరునామా ఉంది (నాలుగవ ఫైల్, `ERC1967Upgrade.sol` చూడండి) ఇది అప్‌గ్రేడ్‌ల కోసం ఉపయోగించబడుతుంది.

```solidity
    /**
     * @dev EIP1967 అడ్మిన్ స్లాట్‌లో కొత్త చిరునామాను నిల్వ చేస్తుంది.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: కొత్త అడ్మిన్ సున్నా చిరునామా");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

దీనికి విరుద్ధంగా, `wARB` కాంట్రాక్ట్‌లో హార్డ్ కోడెడ్ `contract_owner` ఉంది.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[ఈ కాంట్రాక్ట్ యజమాని](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) అనేది వేర్వేరు సమయాల్లో వేర్వేరు ఖాతాల ద్వారా నియంత్రించబడే కాంట్రాక్ట్ కాదు, కానీ ఒక [బాహ్యంగా యాజమాన్యం గల ఖాతా](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). దీనర్థం ఇది బహుశా ఒక వ్యక్తి ద్వారా స్వల్పకాలిక ఉపయోగం కోసం రూపొందించబడింది, విలువైనదిగా మిగిలిపోయే ఒక ERC-20ని నియంత్రించడానికి దీర్ఘకాలిక పరిష్కారంగా కాకుండా.

మరియు నిజానికి, మనం ఈథర్‌స్కాన్‌లో చూస్తే, మోసగాడు ఈ కాంట్రాక్ట్‌ను మే 19, 2023న కేవలం 12 గంటలు మాత్రమే ([మొదటి లావాదేవీ](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) నుండి [చివరి లావాదేవీ](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) వరకు) ఉపయోగించినట్లు మనం చూస్తాము.

### నకిలీ `_transfer` ఫంక్షన్ {#the-fake-transfer-function}

వాస్తవ బదిలీలు [అంతర్గత `_transfer` ఫంక్షన్‌ను](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) ఉపయోగించి జరగడం అనేది ప్రామాణికం.

`wARB`లో ఈ ఫంక్షన్ దాదాపు చట్టబద్ధంగా కనిపిస్తుంది:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: సున్నా చిరునామా నుండి బదిలీ");
        require(recipient != address(0), "ERC20: సున్నా చిరునామాకు బదిలీ");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: బదిలీ మొత్తం బ్యాలెన్స్‌ను మించిపోయింది");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

అనుమానాస్పద భాగం:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

కాంట్రాక్ట్ యజమాని టోకెన్లను పంపితే, `Transfer` ఈవెంట్ అవి `deployer` నుండి వచ్చినట్లు ఎందుకు చూపిస్తుంది?

అయితే, ఒక మరింత ముఖ్యమైన సమస్య ఉంది. ఈ `_transfer` ఫంక్షన్‌ను ఎవరు పిలుస్తారు? దీనిని బయటి నుండి పిలవలేరు, ఇది `internal`గా గుర్తించబడింది. మరియు మన వద్ద ఉన్న కోడ్‌లో `_transfer`కు ఏ కాల్స్ లేవు. స్పష్టంగా, ఇది ఇక్కడ ఒక ఎరగా ఉంది.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: బదిలీ మొత్తం అనుమతిని మించిపోయింది"));
        return true;
    }
```

టోకెన్‌లను బదిలీ చేయడానికి పిలవబడే ఫంక్షన్‌లైన `transfer` మరియు `transferFrom`ను మనం చూసినప్పుడు, అవి `_f_` అనే పూర్తిగా భిన్నమైన ఫంక్షన్‌ను పిలుస్తాయని మనం చూస్తాము.

### నిజమైన `_f_` ఫంక్షన్ {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: సున్నా చిరునామా నుండి బదిలీ");
        require(recipient != address(0), "ERC20: సున్నా చిరునామాకు బదిలీ");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: బదిలీ మొత్తం బ్యాలెన్స్‌ను మించిపోయింది");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

ఈ ఫంక్షన్‌లో రెండు సంభావ్య రెడ్ ఫ్లాగ్‌లు ఉన్నాయి.

- [ఫంక్షన్ మాడిఫైయర్](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` యొక్క ఉపయోగం. అయితే, మనం సోర్స్ కోడ్‌ను చూసినప్పుడు `_mod_` వాస్తవానికి హానిరహితమైనదని మనం చూస్తాము.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`లో మనం చూసిన అదే సమస్య, అంటే `contract_owner` టోకెన్లను పంపినప్పుడు అవి `deployer` నుండి వచ్చినట్లు కనిపించడం.

### నకిలీ ఈవెంట్‌ల ఫంక్షన్ `dropNewTokens` {#the-fake-events-function-dropNewTokens}

ఇప్పుడు మనం అసలు స్కామ్ లాగా కనిపించే ఒక విషయానికి వస్తాము. చదవడానికి వీలుగా నేను ఫంక్షన్‌ను కొద్దిగా సవరించాను, కానీ ఇది ఫంక్షనల్‌గా సమానమైనది.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

ఈ ఫంక్షన్‌కు `auth()` మాడిఫైయర్ ఉంది, అంటే దీనిని కేవలం కాంట్రాక్ట్ యజమాని మాత్రమే పిలవగలరు.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "సంభాషించడానికి అనుమతి లేదు");
    _;
}
```

ఈ పరిమితి చాలా అర్ధవంతమైనది, ఎందుకంటే యాదృచ్ఛిక ఖాతాలు టోకెన్‌లను పంపిణీ చేయడాన్ని మేము కోరుకోము. అయితే, ఫంక్షన్‌లో మిగిలిన భాగం అనుమానాస్పదంగా ఉంది.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

ఒక పూల్ ఖాతా నుండి స్వీకర్తల శ్రేణికి మొత్తాల శ్రేణిని బదిలీ చేసే ఫంక్షన్ చాలా అర్ధవంతమైనది. పేరోల్, ఎయిర్‌డ్రాప్‌లు మొదలైన అనేక వినియోగ సందర్భాలలో మీరు ఒకే మూలం నుండి బహుళ గమ్యస్థానాలకు టోకెన్‌లను పంపిణీ చేయాలనుకుంటారు. బహుళ లావాదేవీలను జారీ చేయడం లేదా ఒకే లావాదేవీలో భాగంగా వేరొక కాంట్రాక్ట్ నుండి ERC-20ని చాలాసార్లు కాల్ చేయడం కంటే ఒకే లావాదేవీలో చేయడం చౌకగా (గ్యాస్‌లో) ఉంటుంది.

అయితే, `dropNewTokens` అలా చేయదు. ఇది [`Transfer` ఈవెంట్‌లను](https://eips.ethereum.org/EIPS/eip-20#transfer-1) విడుదల చేస్తుంది, కానీ వాస్తవానికి ఏ టోకెన్‌లను బదిలీ చేయదు. నిజంగా జరగని బదిలీ గురించి ఆఫ్‌చైన్ అప్లికేషన్‌లకు చెప్పి వాటిని గందరగోళానికి గురి చేయడానికి ఎలాంటి చట్టబద్ధమైన కారణం లేదు.

### దహనం చేసే `Approve` ఫంక్షన్ {#the-burning-approve-function}

ERC-20 కాంట్రాక్టులు అనుమతుల కోసం [ఒక `approve` ఫంక్షన్‌ను](/developers/tutorials/erc20-annotated-code/#approve) కలిగి ఉండాలి, మరియు నిజానికి మా స్కామ్ టోకెన్‌కు అలాంటి ఫంక్షన్ ఉంది, మరియు అది సరిగ్గా కూడా ఉంది. అయితే, సాలిడిటీ C నుండి వచ్చింది కాబట్టి ఇది కేస్ సిగ్నిఫికెంట్. "Approve" మరియు "approve" వేర్వేరు స్ట్రింగ్‌లు.

అలాగే, ఫంక్షనాలిటీ `approve`కి సంబంధించినది కాదు.

```solidity
    function Approve(
        address[] memory holders)
```

ఈ ఫంక్షన్‌ను టోకెన్ హోల్డర్‌ల చిరునామాల శ్రేణితో పిలుస్తారు.

```solidity
    public approver() {
```

`approver()` మాడిఫైయర్ ఈ ఫంక్షన్‌ను కేవలం `contract_owner` మాత్రమే పిలవడానికి అనుమతిస్తుందని నిర్ధారిస్తుంది (క్రింద చూడండి).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: బర్న్ మొత్తం బ్యాలెన్స్‌ను మించిపోయింది");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

ప్రతి హోల్డర్ చిరునామా కోసం ఫంక్షన్ హోల్డర్ యొక్క మొత్తం బ్యాలెన్స్‌ను `0x00...01` చిరునామాకు తరలిస్తుంది, దానిని సమర్థవంతంగా కాల్చివేస్తుంది (ప్రామాణికంలో వాస్తవ `burn` కూడా మొత్తం సరఫరాను మారుస్తుంది మరియు టోకెన్‌లను `0x00...00`కు బదిలీ చేస్తుంది). దీనర్థం `contract_owner` ఏ యూజర్ ఆస్తులైనా తీసివేయగలరు. అది మీరు ఒక పాలనా టోకెన్‌లో కోరుకునే ఫీచర్ లాగా అనిపించదు.

### కోడ్ నాణ్యత సమస్యలు {#code-quality-issues}

ఈ కోడ్ నాణ్యత సమస్యలు ఈ కోడ్ ఒక స్కామ్ అని _నిరూపించవు_, కానీ అవి దానిని అనుమానాస్పదంగా చూపిస్తాయి. ఆర్బిట్రమ్ వంటి వ్యవస్థీకృత కంపెనీలు సాధారణంగా ఇంత చెడ్డ కోడ్‌ను విడుదల చేయవు.

#### `mount` ఫంక్షన్ {#the-mount-function}

[ప్రామాణికంలో](https://eips.ethereum.org/EIPS/eip-20) పేర్కొనబడనప్పటికీ, సాధారణంగా కొత్త టోకెన్లను సృష్టించే ఫంక్షన్‌ను [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) అంటారు.

మనం `wARB` కన్‌స్ట్రక్టర్‌లో చూస్తే, మింట్ ఫంక్షన్ పేరును ఏదో ఒక కారణం చేత `mount`గా మార్చారని, మరియు సమర్థత కోసం మొత్తం మొత్తానికి బదులుగా ప్రాథమిక సరఫరాలో ఐదవ వంతుతో ఐదుసార్లు పిలవబడిందని మనం చూస్తాము.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` ఫంక్షన్ కూడా అనుమానాస్పదంగా ఉంది.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`ని చూస్తే, కేవలం కాంట్రాక్ట్ యజమాని మాత్రమే మింట్ చేయడానికి అనుమతించబడ్డారని మనం చూస్తాము. అది చట్టబద్ధమైనది. కానీ ఎర్రర్ మెసేజ్ _కేవలం యజమాని మాత్రమే మింట్ చేయడానికి అనుమతించబడ్డారు_ లేదా అలాంటిది ఉండాలి. బదులుగా, ఇది సంబంధం లేని _ERC20: సున్నా చిరునామాకు మింట్_. సున్నా చిరునామాకు మింట్ చేయడం కోసం సరైన పరీక్ష `require(account != address(0), "<error message>")`, దీనిని కాంట్రాక్ట్ ఎప్పుడూ తనిఖీ చేయదు.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

మింటింగ్‌కు నేరుగా సంబంధించిన మరో రెండు అనుమానాస్పద వాస్తవాలు ఉన్నాయి:

- ఒక `account` పారామీటర్ ఉంది, ఇది బహుశా మింట్ చేయబడిన మొత్తాన్ని అందుకోవలసిన ఖాతా. కానీ పెరిగే బ్యాలెన్స్ వాస్తవానికి `contract_owner`ది.

- పెరిగిన బ్యాలెన్స్ `contract_owner`కి చెందినదైతే, విడుదలైన ఈవెంట్ `account`కు బదిలీని చూపిస్తుంది.

### `auth` మరియు `approver` రెండూ ఎందుకు? ఏమీ చేయని `mod` ఎందుకు? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

ఈ కాంట్రాక్ట్‌లో మూడు మాడిఫైయర్లు ఉన్నాయి: `_mod_`, `auth`, మరియు `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` మూడు పారామీటర్లను తీసుకుంటుంది మరియు వాటితో ఏమీ చేయదు. అది ఎందుకు ఉండాలి?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "సంభాషించడానికి అనుమతి లేదు");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "సంభాషించడానికి అనుమతి లేదు");
        _;
    }
```

`auth` మరియు `approver` మరింత అర్ధవంతంగా ఉన్నాయి, ఎందుకంటే అవి కాంట్రాక్ట్‌ను `contract_owner` పిలిచారని తనిఖీ చేస్తాయి. మింటింగ్ వంటి కొన్ని విశేషాధికార చర్యలు ఆ ఖాతాకు పరిమితం చేయబడాలని మేము ఆశిస్తాము. అయితే, _ఖచ్చితంగా అదే పని_ చేసే రెండు వేర్వేరు ఫంక్షన్‌లు ఉండటంలో అర్థం ఏమిటి?

## మేము స్వయంచాలకంగా ఏమి గుర్తించగలము? {#what-can-we-detect-automatically}

ఈథర్‌స్కాన్‌ను చూడటం ద్వారా `wARB` ఒక స్కామ్ టోకెన్ అని మనం చూడవచ్చు. అయితే, అది కేంద్రీకృత పరిష్కారం. సిద్ధాంతపరంగా, ఈథర్‌స్కాన్‌ను పడగొట్టవచ్చు లేదా హ్యాక్ చేయవచ్చు. ఒక టోకెన్ చట్టబద్ధమైనదా కాదా అని స్వతంత్రంగా గుర్తించగలగడం మంచిది.

ఒక ERC-20 టోకెన్ అనుమానాస్పదంగా (ఒక స్కామ్ లేదా చాలా చెడ్డగా వ్రాయబడినది) ఉందని గుర్తించడానికి, అవి విడుదల చేసే ఈవెంట్‌లను చూడటం ద్వారా మనం ఉపయోగించగల కొన్ని ఉపాయాలు ఉన్నాయి.

## అనుమానాస్పద `Approval` ఈవెంట్లు {#suspicious-approval-events}

[`Approval` ఈవెంట్లు](https://eips.ethereum.org/EIPS/eip-20#approval) కేవలం ఒక ప్రత్యక్ష అభ్యర్థనతో మాత్రమే జరగాలి (అనుమతి ఫలితంగా జరగగల [`Transfer` ఈవెంట్‌లకు](https://eips.ethereum.org/EIPS/eip-20#transfer-1) విరుద్ధంగా). ఈ సమస్యపై మరియు అభ్యర్థనలు ఒక కాంట్రాక్ట్ ద్వారా మధ్యవర్తిత్వం చేయబడటానికి బదులుగా ప్రత్యక్షంగా ఉండవలసిన అవసరంపై వివరణాత్మక వివరణ కోసం [సాలిడిటీ డాక్స్‌ను చూడండి](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

దీనర్థం [బాహ్యంగా యాజమాన్యం గల ఖాతా](/developers/docs/accounts/#types-of-account) నుండి ఖర్చును ఆమోదించే `Approval` ఈవెంట్లు ఆ ఖాతాలో ఉద్భవించిన లావాదేవీల నుండి రావాలి మరియు దీని గమ్యస్థానం ERC-20 కాంట్రాక్ట్. బాహ్యంగా యాజమాన్యం గల ఖాతా నుండి ఏ ఇతర రకమైన ఆమోదం అయినా అనుమానాస్పదమే.

ఇక్కడ [viem](https://viem.sh/) మరియు [TypeScript](https://www.typescriptlang.org/docs/) (టైప్ సేఫ్టీ ఉన్న ఒక జావాస్క్రిప్ట్ వేరియంట్) ఉపయోగించి, [ఈ రకమైన ఈవెంట్‌ను గుర్తించే ప్రోగ్రామ్](https://github.com/qbzzt/20230915-scam-token-detection) ఉంది. దానిని నడపడానికి:

1. `.env.example`ని `.env`కి కాపీ చేయండి.
2. Ethereum మెయిన్‌నెట్ నోడ్‌కు URLను అందించడానికి `.env`ను సవరించండి.
3. అవసరమైన ప్యాకేజీలను ఇన్‌స్టాల్ చేయడానికి `pnpm install` నడపండి.
4. అనుమానాస్పద ఆమోదాల కోసం చూడటానికి `pnpm susApproval` నడపండి.

ఇక్కడ లైన్-బై-లైన్ వివరణ ఉంది:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem` నుండి టైప్ నిర్వచనాలు, ఫంక్షన్‌లు, మరియు చైన్ నిర్వచనాన్ని దిగుమతి చేయండి.

```typescript
import { config } from "dotenv"
config()
```

URLను పొందడానికి `.env`ను చదవండి.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

ఒక Viem క్లయింట్‌ను సృష్టించండి. మనకు కేవలం బ్లాక్‌చైన్ నుండి చదవాలి, కాబట్టి ఈ క్లయింట్‌కు ప్రైవేట్ కీ అవసరం లేదు.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

అనుమానాస్పద ERC-20 కాంట్రాక్ట్ చిరునామా, మరియు ఈవెంట్‌ల కోసం మనం వెతకబోయే బ్లాక్‌లు. బ్యాండ్‌విడ్త్ ఖరీదైనది కావడంతో నోడ్ ప్రొవైడర్లు సాధారణంగా ఈవెంట్‌లను చదివే మన సామర్థ్యాన్ని పరిమితం చేస్తారు. అదృష్టవశాత్తూ `wARB` పద్దెనిమిది గంటల కాలం పాటు ఉపయోగంలో లేదు, కాబట్టి మనం అన్ని ఈవెంట్‌ల కోసం చూడవచ్చు (మొత్తం 13 మాత్రమే ఉన్నాయి).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Viem నుండి ఈవెంట్ సమాచారం అడగడానికి ఇది మార్గం. మనం దీనికి ఫీల్డ్ పేర్లతో సహా ఖచ్చితమైన ఈవెంట్ సంతకాన్ని అందించినప్పుడు, అది మన కోసం ఈవెంట్‌ను పార్స్ చేస్తుంది.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

మా అల్గారిథమ్ కేవలం బాహ్యంగా యాజమాన్యం గల ఖాతాలకు మాత్రమే వర్తిస్తుంది. `client.getBytecode` ద్వారా ఏదైనా బైట్‌కోడ్ తిరిగి వస్తే, అది ఒక కాంట్రాక్ట్ అని అర్థం మరియు మనం దానిని వదిలివేయాలి.

మీరు ఇంతకుముందు TypeScriptని ఉపయోగించకపోతే, ఫంక్షన్ నిర్వచనం కొంచెం వింతగా కనిపించవచ్చు. మనం కేవలం మొదటి (మరియు ఏకైక) పారామీటర్‌ను `addr` అని పిలుస్తామని మాత్రమే చెప్పము, కానీ అది `Address` రకానికి చెందినదని కూడా చెబుతాము. అదేవిధంగా, `: boolean` భాగం ఫంక్షన్ యొక్క తిరిగి వచ్చే విలువ ఒక బూలియన్ అని TypeScriptకు చెబుతుంది.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

ఈ ఫంక్షన్ ఒక ఈవెంట్ నుండి లావాదేవీ రసీదును పొందుతుంది. లావాదేవీ గమ్యం ఏమిటో తెలుసుకోవడానికి మనకు రసీదు అవసరం.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

ఇది అత్యంత ముఖ్యమైన ఫంక్షన్, ఒక ఈవెంట్ అనుమానాస్పదమైనదా కాదా అని నిర్ణయించేది. రిటర్న్ రకం, `(Event | null)`, ఈ ఫంక్షన్ ఒక `Event` లేదా `null`ను తిరిగి ఇవ్వగలదని TypeScriptకు చెబుతుంది. ఈవెంట్ అనుమానాస్పదంగా లేకపోతే మనం `null`ను తిరిగి ఇస్తాము.

```typescript
const owner = ev.args._owner
```

Viemకు ఫీల్డ్ పేర్లు ఉన్నాయి, కాబట్టి అది మన కోసం ఈవెంట్‌ను పార్స్ చేసింది. `_owner` ఖర్చు చేయవలసిన టోకెన్‌ల యజమాని.

```typescript
// కాంట్రాక్టుల ద్వారా ఆమోదాలు అనుమానాస్పదమైనవి కావు
if (await isContract(owner)) return null
```

యజమాని ఒక కాంట్రాక్ట్ అయితే, ఈ ఆమోదం అనుమానాస్పదమైనది కాదని ఊహించండి. ఒక కాంట్రాక్ట్ ఆమోదం అనుమానాస్పదమైనదా కాదా అని తనిఖీ చేయడానికి, లావాదేవీ యొక్క పూర్తి అమలును ట్రేస్ చేయాలి, అది ఎప్పుడైనా యజమాని కాంట్రాక్ట్‌కు చేరిందో లేదో, మరియు ఆ కాంట్రాక్ట్ నేరుగా ERC-20 కాంట్రాక్ట్‌ను పిలిచిందో లేదో చూడాలి. అది మనం చేయాలనుకునే దానికంటే చాలా ఎక్కువ వనరులను ఖర్చు చేస్తుంది.

```typescript
const txn = await getEventTxn(ev)
```

ఆమోదం బాహ్యంగా యాజమాన్యం గల ఖాతా నుండి వస్తే, దానికి కారణమైన లావాదేవీని పొందండి.

```typescript
// లావాదేవీ యొక్క `from` కాని EOA యజమాని నుండి వస్తే ఆమోదం అనుమానాస్పదంగా ఉంటుంది
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

మనం కేవలం స్ట్రింగ్ సమానత్వం కోసం తనిఖీ చేయలేము ఎందుకంటే చిరునామాలు హెక్సాడెసిమల్, కాబట్టి వాటిలో అక్షరాలు ఉంటాయి. కొన్నిసార్లు, ఉదాహరణకు `txn.from`లో, ఆ అక్షరాలు అన్నీ చిన్న అక్షరాలలో ఉంటాయి. ఇతర సందర్భాల్లో, `ev.args._owner` వంటివి, చిరునామా [దోష గుర్తింపు కోసం మిశ్రమ-కేస్‌లో](https://eips.ethereum.org/EIPS/eip-55) ఉంటుంది.

కానీ లావాదేవీ యజమాని నుండి కాకపోతే, మరియు ఆ యజమాని బాహ్యంగా యాజమాన్యం గలవాడైతే, అప్పుడు మనకు అనుమానాస్పద లావాదేవీ ఉంది.

```typescript
// లావాదేవీ గమ్యం మనం పరిశోధిస్తున్న ERC-20 కాంట్రాక్ట్ కాకపోయినా కూడా అనుమానాస్పదమే
// పరిశోధిస్తున్నాము
if (txn.to.toLowerCase() != testedAddress) return ev
```

అదేవిధంగా, లావాదేవీ యొక్క `to` చిరునామా, మొదట పిలవబడిన కాంట్రాక్ట్, పరిశోధనలో ఉన్న ERC-20 కాంట్రాక్ట్ కాకపోతే అది అనుమానాస్పదమైనది.

```typescript
    // అనుమానించడానికి ఏ కారణం లేకపోతే, nullని తిరిగి ఇవ్వండి.
    return null
}
```

ఏ షరతు కూడా నిజం కాకపోతే, `Approval` ఈవెంట్ అనుమానాస్పదమైనది కాదు.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[ఒక `async` ఫంక్షన్](https://www.w3schools.com/js/js_async.asp) ఒక `Promise` ఆబ్జెక్ట్‌ను తిరిగి ఇస్తుంది. సాధారణ సింటాక్స్‌తో, `await x()`, మనం ప్రాసెసింగ్‌ను కొనసాగించే ముందు ఆ `Promise` నెరవేరే వరకు వేచి ఉంటాము. ఇది ప్రోగ్రామ్ చేయడానికి మరియు అనుసరించడానికి సులభం, కానీ ఇది అసమర్థమైనది కూడా. ఒక నిర్దిష్ట ఈవెంట్ కోసం `Promise` నెరవేరే వరకు మనం వేచి ఉన్నప్పుడు, మనం ఇప్పటికే తదుపరి ఈవెంట్‌పై పని చేయవచ్చు.

ఇక్కడ మనం `Promise` ఆబ్జెక్ట్‌ల శ్రేణిని సృష్టించడానికి [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ఉపయోగిస్తాము. ఆ తర్వాత ఆ వాగ్దానాలన్నీ పరిష్కరించబడటానికి వేచి ఉండటానికి [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) ఉపయోగిస్తాము. ఆ తర్వాత అనుమానాస్పదంగా లేని ఈవెంట్‌లను తీసివేయడానికి ఆ ఫలితాలను [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) చేస్తాము.

### అనుమానాస్పద `Transfer` ఈవెంట్లు {#suspicious-transfer-events}

స్కామ్ టోకెన్‌లను గుర్తించడానికి మరొక సంభావ్య మార్గం వాటికి ఏవైనా అనుమానాస్పద బదిలీలు ఉన్నాయో లేదో చూడటం. ఉదాహరణకు, అంతగా టోకెన్లు లేని ఖాతాల నుండి బదిలీలు. మీరు [ఈ పరీక్షను ఎలా అమలు చేయాలో చూడవచ్చు](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), కానీ `wARB`కి ఈ సమస్య లేదు.

## ముగింపు {#conclusion}

ERC-20 స్కామ్‌ల స్వయంచాలక గుర్తింపు [తప్పుడు ప్రతికూలతల](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)తో బాధపడుతుంది, ఎందుకంటే ఒక స్కామ్ పూర్తిగా సాధారణ ERC-20 టోకెన్ కాంట్రాక్ట్‌ను ఉపయోగించవచ్చు, అది కేవలం ఏమీ వాస్తవాన్ని సూచించదు. కాబట్టి మీరు ఎల్లప్పుడూ _విశ్వసనీయ మూలం నుండి టోకెన్ చిరునామాను పొందడానికి_ ప్రయత్నించాలి.

స్వయంచాలక గుర్తింపు DeFi భాగాల వంటి కొన్ని సందర్భాల్లో సహాయపడుతుంది, ఇక్కడ చాలా టోకెన్‌లు ఉంటాయి మరియు వాటిని స్వయంచాలకంగా నిర్వహించాలి. కానీ ఎప్పటిలాగే [కేవియట్ ఎంపటర్](https://www.investopedia.com/terms/c/caveatemptor.asp), మీ స్వంత పరిశోధన చేయండి, మరియు మీ వినియోగదారులను కూడా అదే విధంగా ప్రోత్సహించండి.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).
