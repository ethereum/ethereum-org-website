---
title: "స్కామ్ టోకెన్‌లు ఉపయోగించే కొన్ని ఉపాయాలు మరియు వాటిని ఎలా గుర్తించాలి"
description: "ఈ ట్యుటోరియల్‌లో స్కామర్‌లు ఆడే కొన్ని ఉపాయాలు, వారు వాటిని ఎలా అమలు చేస్తారు మరియు వాటిని మనం ఎలా గుర్తించగలమో చూడటానికి ఒక స్కామ్ టోకెన్‌ను విశ్లేషిస్తాము."
author: "ఓరి పోమెరాంట్జ్"
tags:
  - స్కామ్
  - Solidity
  - ERC-20
  - JavaScript
  - TypeScript
skill: intermediate
breadcrumb: "స్కామ్ టోకెన్ ఉపాయాలు"
published: 2023-09-15
lang: te
---

ఈ ట్యుటోరియల్‌లో స్కామర్‌లు ఆడే కొన్ని ఉపాయాలు మరియు వారు వాటిని ఎలా అమలు చేస్తారో చూడటానికి మేము [ఒక స్కామ్ టోకెన్‌ను](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) విశ్లేషిస్తాము. ట్యుటోరియల్ ముగిసే సమయానికి మీకు ERC-20 టోకెన్ కాంట్రాక్ట్‌లు, వాటి సామర్థ్యాలు మరియు సందేహం ఎందుకు అవసరం అనే దాని గురించి మరింత సమగ్రమైన అవగాహన ఉంటుంది. ఆ తర్వాత ఆ స్కామ్ టోకెన్ ద్వారా వెలువడే ఈవెంట్‌లను పరిశీలిస్తాము మరియు అది చట్టబద్ధమైనది కాదని మనం స్వయంచాలకంగా ఎలా గుర్తించగలమో చూస్తాము.

## స్కామ్ టోకెన్‌లు - అవి ఏమిటి, ప్రజలు వాటిని ఎందుకు చేస్తారు మరియు వాటిని ఎలా నివారించాలి {#scam-tokens}

ఎథీరియం యొక్క అత్యంత సాధారణ ఉపయోగాలలో ఒకటి, ఒక సమూహం వర్తకం చేయదగిన టోకెన్‌ను సృష్టించడం, ఒక రకంగా చెప్పాలంటే వారి స్వంత కరెన్సీని సృష్టించడం. అయినప్పటికీ, విలువను తీసుకువచ్చే చట్టబద్ధమైన వినియోగ సందర్భాలు ఎక్కడ ఉన్నా, ఆ విలువను తమ కోసం దొంగిలించడానికి ప్రయత్నించే నేరస్థులు కూడా ఉంటారు.

వినియోగదారు కోణం నుండి మీరు ఈ విషయం గురించి మరింత సమాచారాన్ని [ethereum.org లోని ఇతర చోట్ల](/guides/how-to-id-scam-tokens/) చదవవచ్చు. ఈ ట్యుటోరియల్ ఒక స్కామ్ టోకెన్‌ను విశ్లేషించడం ద్వారా అది ఎలా జరుగుతుంది మరియు దానిని ఎలా గుర్తించవచ్చు అనే దానిపై దృష్టి పెడుతుంది.

### wARB ఒక స్కామ్ అని నాకు ఎలా తెలుస్తుంది? {#warb-scam}

మనం విశ్లేషించే టోకెన్ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), ఇది చట్టబద్ధమైన [ARB టోకెన్‌కు](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) సమానమైనదిగా నటిస్తుంది.

ఏది చట్టబద్ధమైన టోకెన్ అని తెలుసుకోవడానికి సులభమైన మార్గం, దానిని సృష్టించిన సంస్థ అయిన [Arbitrum](https://arbitrum.foundation/) ను చూడటం. చట్టబద్ధమైన చిరునామాలు [వారి డాక్యుమెంటేషన్‌లో](https://docs.arbitrum.foundation/deployment-addresses#token) పేర్కొనబడ్డాయి.

### సోర్స్ కోడ్ ఎందుకు అందుబాటులో ఉంది? {#why-source}

సాధారణంగా ఇతరులను మోసం చేయడానికి ప్రయత్నించే వ్యక్తులు రహస్యంగా ఉంటారని మనం ఆశిస్తాము మరియు నిజానికి అనేక స్కామ్ టోకెన్‌ల కోడ్ అందుబాటులో ఉండదు (ఉదాహరణకు, [ఇది](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) మరియు [ఇది](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

అయినప్పటికీ, చట్టబద్ధమైన టోకెన్‌లు సాధారణంగా వాటి సోర్స్ కోడ్‌ను ప్రచురిస్తాయి, కాబట్టి చట్టబద్ధమైనవిగా కనిపించడానికి స్కామ్ టోకెన్‌ల రచయితలు కూడా కొన్నిసార్లు అదే విధంగా చేస్తారు. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) అనేది సోర్స్ కోడ్ అందుబాటులో ఉన్న అటువంటి టోకెన్‌లలో ఒకటి, ఇది దానిని అర్థం చేసుకోవడాన్ని సులభతరం చేస్తుంది.

కాంట్రాక్ట్ డిప్లాయర్‌లు సోర్స్ కోడ్‌ను ప్రచురించాలా వద్దా అని ఎంచుకోగలిగినప్పటికీ, వారు తప్పు సోర్స్ కోడ్‌ను ప్రచురించలేరు (_can't_). బ్లాక్ ఎక్స్‌ప్లోరర్ అందించిన సోర్స్ కోడ్‌ను స్వతంత్రంగా కంపైల్ చేస్తుంది మరియు దానికి ఖచ్చితమైన అదే బైట్‌కోడ్ రాకపోతే, అది ఆ సోర్స్ కోడ్‌ను తిరస్కరిస్తుంది. [దీని గురించి మీరు Etherscan సైట్‌లో మరింత చదవవచ్చు](https://etherscan.io/verifyContract).

## చట్టబద్ధమైన ERC-20 టోకెన్‌లతో పోలిక {#compare-legit-erc20}

మేము ఈ టోకెన్‌ను చట్టబద్ధమైన ERC-20 టోకెన్‌లతో పోల్చబోతున్నాము. చట్టబద్ధమైన ERC-20 టోకెన్‌లు సాధారణంగా ఎలా వ్రాయబడతాయో మీకు తెలియకపోతే, [ఈ ట్యుటోరియల్‌ని చూడండి](/developers/tutorials/erc20-annotated-code/).

### ప్రత్యేక హక్కులు గల చిరునామాల కోసం స్థిరాంకాలు {#constants-for-privileged-addresses}

కాంట్రాక్ట్‌లకు కొన్నిసార్లు ప్రత్యేక హక్కులు గల చిరునామాలు అవసరం. దీర్ఘకాలిక ఉపయోగం కోసం రూపొందించబడిన కాంట్రాక్ట్‌లు ఆ చిరునామాలను మార్చడానికి కొన్ని ప్రత్యేక హక్కులు గల చిరునామాలను అనుమతిస్తాయి, ఉదాహరణకు కొత్త మల్టీసిగ్ కాంట్రాక్ట్ వినియోగాన్ని ప్రారంభించడానికి. దీన్ని చేయడానికి అనేక మార్గాలు ఉన్నాయి.

[`HOP` టోకెన్ కాంట్రాక్ట్](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) ప్యాటర్న్‌ను ఉపయోగిస్తుంది. ప్రత్యేక హక్కులు గల చిరునామా నిల్వలో, `_owner` అనే ఫీల్డ్‌లో ఉంచబడుతుంది (మూడవ ఫైల్, `Ownable.sol` చూడండి).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` టోకెన్ కాంట్రాక్ట్](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) నేరుగా ప్రత్యేక హక్కులు గల చిరునామాను కలిగి ఉండదు. అయినప్పటికీ, దానికి అది అవసరం లేదు. ఇది [చిరునామా `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) వద్ద [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) వెనుక ఉంటుంది. ఆ కాంట్రాక్ట్ అప్‌గ్రేడ్‌ల కోసం ఉపయోగించబడే ప్రత్యేక హక్కులు గల చిరునామాను (నాల్గవ ఫైల్, `ERC1967Upgrade.sol` చూడండి) కలిగి ఉంటుంది.

```solidity
    /**
     * @dev EIP1967 అడ్మిన్ స్లాట్‌లో కొత్త చిరునామాను నిల్వ చేస్తుంది.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

దీనికి విరుద్ధంగా, `wARB` కాంట్రాక్ట్ హార్డ్ కోడ్ చేయబడిన `contract_owner` ను కలిగి ఉంటుంది.

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

[ఈ కాంట్రాక్ట్ యజమాని](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) వేర్వేరు సమయాల్లో వేర్వేరు ఖాతాల ద్వారా నియంత్రించబడే కాంట్రాక్ట్ కాదు, కానీ ఇది ఒక [బాహ్యంగా స్వంతమైన ఖాతా (externally owned account)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). దీని అర్థం ఇది బహుశా విలువైనదిగా ఉండే ERC-20 ని నియంత్రించడానికి దీర్ఘకాలిక పరిష్కారంగా కాకుండా, ఒక వ్యక్తి ద్వారా స్వల్పకాలిక ఉపయోగం కోసం రూపొందించబడి ఉండవచ్చు.

మరియు నిజానికి, మనం Etherscan లో చూస్తే, స్కామర్ ఈ కాంట్రాక్ట్‌ను మే 19, 2023 న కేవలం 12 గంటల పాటు మాత్రమే ([మొదటి లావాదేవీ](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) నుండి [చివరి లావాదేవీ](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) వరకు) ఉపయోగించినట్లు మనం చూస్తాము.

### నకిలీ `_transfer` ఫంక్షన్ {#the-fake-transfer-function}

వాస్తవ బదిలీలు [అంతర్గత `_transfer` ఫంక్షన్‌ను](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) ఉపయోగించి జరగడం ప్రామాణికం.

`wARB` లో ఈ ఫంక్షన్ దాదాపు చట్టబద్ధమైనదిగా కనిపిస్తుంది:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

అనుమానాస్పద భాగం ఏమిటంటే:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

కాంట్రాక్ట్ యజమాని టోకెన్‌లను పంపితే, `Transfer` ఈవెంట్ అవి `deployer` నుండి వచ్చినట్లు ఎందుకు చూపుతుంది?

అయినప్పటికీ, మరింత ముఖ్యమైన సమస్య ఉంది. ఈ `_transfer` ఫంక్షన్‌ను ఎవరు పిలుస్తారు? దీనిని బయటి నుండి పిలవలేము, ఇది `internal` గా గుర్తించబడింది. మరియు మన వద్ద ఉన్న కోడ్‌లో `_transfer` కి ఎలాంటి కాల్‌లు లేవు. స్పష్టంగా, ఇది ఇక్కడ ఒక ఎరగా (decoy) ఉంది.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

టోకెన్‌లను బదిలీ చేయడానికి పిలువబడే ఫంక్షన్‌లను, `transfer` మరియు `transferFrom` లను మనం చూసినప్పుడు, అవి పూర్తిగా భిన్నమైన ఫంక్షన్ అయిన `_f_` ని పిలుస్తాయని మనం చూస్తాము.

### అసలైన `_f_` ఫంక్షన్ {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

ఈ ఫంక్షన్‌లో రెండు సంభావ్య ప్రమాద సంకేతాలు (red flags) ఉన్నాయి.

- [ఫంక్షన్ మాడిఫైయర్](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` యొక్క ఉపయోగం. అయినప్పటికీ, మనం సోర్స్ కోడ్‌ని పరిశీలించినప్పుడు `_mod_` వాస్తవానికి హానిచేయనిదని మనం చూస్తాము.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- మనం `_transfer` లో చూసిన అదే సమస్య, అంటే `contract_owner` టోకెన్‌లను పంపినప్పుడు అవి `deployer` నుండి వచ్చినట్లు కనిపిస్తాయి.

### నకిలీ ఈవెంట్‌ల ఫంక్షన్ `dropNewTokens` {#the-fake-events-function-dropnewtokens}

ఇప్పుడు మనం అసలు స్కామ్ లాగా కనిపించే దానికి వస్తాము. చదవడానికి వీలుగా నేను ఫంక్షన్‌ను కొద్దిగా సవరించాను, కానీ ఇది క్రియాత్మకంగా సమానంగా ఉంటుంది.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

ఈ ఫంక్షన్ `auth()` మాడిఫైయర్‌ను కలిగి ఉంది, అంటే దీనిని కాంట్రాక్ట్ యజమాని మాత్రమే పిలవగలరు.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

ఈ పరిమితి ఖచ్చితంగా అర్థవంతంగా ఉంటుంది, ఎందుకంటే యాదృచ్ఛిక ఖాతాలు టోకెన్‌లను పంపిణీ చేయాలని మనం కోరుకోము. అయినప్పటికీ, మిగిలిన ఫంక్షన్ అనుమానాస్పదంగా ఉంది.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

పూల్ ఖాతా నుండి రిసీవర్‌ల శ్రేణికి (array) మొత్తాల శ్రేణిని బదిలీ చేసే ఫంక్షన్ ఖచ్చితంగా అర్థవంతంగా ఉంటుంది. పేరోల్, ఎయిర్‌డ్రాప్‌లు మొదలైన ఒకే మూలం నుండి బహుళ గమ్యస్థానాలకు టోకెన్‌లను పంపిణీ చేయాలనుకునే అనేక వినియోగ సందర్భాలు ఉన్నాయి. బహుళ లావాదేవీలను జారీ చేయడానికి బదులుగా ఒకే లావాదేవీలో చేయడం లేదా అదే లావాదేవీలో భాగంగా వేరొక కాంట్రాక్ట్ నుండి ERC-20 ని బహుళ సార్లు పిలవడం కంటే ఇది (గ్యాస్ పరంగా) చౌకైనది.

అయినప్పటికీ, `dropNewTokens` అలా చేయదు. ఇది [`Transfer` ఈవెంట్‌లను](https://eips.ethereum.org/EIPS/eip-20#transfer-1) వెలువరిస్తుంది, కానీ వాస్తవానికి ఎలాంటి టోకెన్‌లను బదిలీ చేయదు. నిజంగా జరగని బదిలీ గురించి ఆఫ్‌చైన్ అప్లికేషన్‌లకు చెప్పడం ద్వారా వాటిని గందరగోళానికి గురిచేయడానికి ఎటువంటి చట్టబద్ధమైన కారణం లేదు.

### దహనం చేసే (burning) `Approve` ఫంక్షన్ {#the-burning-approve-function}

ERC-20 కాంట్రాక్ట్‌లు అనుమతి మొత్తాల కోసం [ఒక `approve` ఫంక్షన్‌ను](/developers/tutorials/erc20-annotated-code/#approve) కలిగి ఉండాలి మరియు నిజానికి మన స్కామ్ టోకెన్ అటువంటి ఫంక్షన్‌ను కలిగి ఉంది మరియు అది సరైనది కూడా. అయినప్పటికీ, Solidity అనేది C నుండి ఉద్భవించినందున ఇది కేస్ సెన్సిటివ్ (case significant). "Approve" మరియు "approve" అనేవి వేర్వేరు స్ట్రింగ్‌లు.

అలాగే, దీని కార్యాచరణ `approve` కి సంబంధించినది కాదు.

```solidity
    function Approve(
        address[] memory holders)
```

టోకెన్ హోల్డర్‌ల చిరునామాల శ్రేణితో ఈ ఫంక్షన్ పిలువబడుతుంది.

```solidity
    public approver() {
```

`approver()` మాడిఫైయర్ ఈ ఫంక్షన్‌ను పిలవడానికి `contract_owner` మాత్రమే అనుమతించబడుతుందని నిర్ధారిస్తుంది (క్రింద చూడండి).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

ప్రతి హోల్డర్ చిరునామా కోసం ఫంక్షన్ హోల్డర్ యొక్క మొత్తం బ్యాలెన్స్‌ను `0x00...01` చిరునామాకు తరలిస్తుంది, దానిని సమర్థవంతంగా దహనం చేస్తుంది (ప్రమాణంలోని అసలు `burn` మొత్తం సరఫరాను కూడా మారుస్తుంది మరియు టోకెన్‌లను `0x00...00` కి బదిలీ చేస్తుంది). దీని అర్థం `contract_owner` ఏ వినియోగదారు ఆస్తులనైనా తీసివేయగలదు. ఇది మీరు పరిపాలనా టోకెన్‌లో కోరుకునే ఫీచర్‌లా అనిపించదు.

### కోడ్ నాణ్యత సమస్యలు {#code-quality-issues}

ఈ కోడ్ నాణ్యత సమస్యలు ఈ కోడ్ ఒక స్కామ్ అని నిరూపించవు (_prove_), కానీ అవి దీనిని అనుమానాస్పదంగా కనిపించేలా చేస్తాయి. Arbitrum వంటి వ్యవస్థీకృత కంపెనీలు సాధారణంగా ఇంత చెత్త కోడ్‌ను విడుదల చేయవు.

#### `mount` ఫంక్షన్ {#the-mount-function}

ఇది [ప్రమాణంలో](https://eips.ethereum.org/EIPS/eip-20) పేర్కొనబడనప్పటికీ, సాధారణంగా చెప్పాలంటే కొత్త టోకెన్‌లను సృష్టించే ఫంక్షన్‌ను [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) అని పిలుస్తారు.

మనం `wARB` కన్స్ట్రక్టర్‌లో చూస్తే, టైమ్ మింట్ ఫంక్షన్ ఏదో కారణం చేత `mount` గా పేరు మార్చబడిందని మరియు సామర్థ్యం కోసం మొత్తం మొత్తానికి ఒకసారి కాకుండా, ప్రారంభ సరఫరాలో ఐదవ వంతుతో ఐదుసార్లు పిలువబడిందని మనం చూస్తాము.

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

`require` ని చూస్తే, కాంట్రాక్ట్ యజమాని మాత్రమే ముద్రించడానికి అనుమతించబడతారని మనం చూస్తాము. అది చట్టబద్ధమైనది. కానీ ఎర్రర్ సందేశం _యజమాని మాత్రమే ముద్రించడానికి అనుమతించబడతారు (only owner is allowed to mint)_ లేదా అలాంటిదేదైనా ఉండాలి. దానికి బదులుగా, ఇది అసంబద్ధమైన _ERC20: శూన్య చిరునామాకు ముద్రించు (ERC20: mint to the zero address)_ అని ఉంది. శూన్య చిరునామాకు ముద్రించడం కోసం సరైన పరీక్ష `require(account != address(0), "<error message>")`, దీనిని తనిఖీ చేయడానికి కాంట్రాక్ట్ ఎప్పుడూ ప్రయత్నించదు.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

ముద్రించడానికి నేరుగా సంబంధించిన మరో రెండు అనుమానాస్పద వాస్తవాలు ఉన్నాయి:

- `account` పారామీటర్ ఉంది, ఇది బహుశా ముద్రించిన మొత్తాన్ని స్వీకరించాల్సిన ఖాతా కావచ్చు. కానీ వాస్తవానికి పెరిగే బ్యాలెన్స్ `contract_owner` కి చెందినది.

- పెరిగిన బ్యాలెన్స్ `contract_owner` కి చెందినది అయినప్పటికీ, వెలువడిన ఈవెంట్ `account` కి బదిలీని చూపుతుంది.

### `auth` మరియు `approver` రెండూ ఎందుకు? ఏమీ చేయని `mod` ఎందుకు? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

ఈ కాంట్రాక్ట్ మూడు మాడిఫైయర్‌లను కలిగి ఉంది: `_mod_`, `auth`, మరియు `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` మూడు పారామీటర్‌లను తీసుకుంటుంది మరియు వాటితో ఏమీ చేయదు. అది ఎందుకు ఉండాలి?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` మరియు `approver` మరింత అర్థవంతంగా ఉంటాయి, ఎందుకంటే కాంట్రాక్ట్ `contract_owner` ద్వారా పిలువబడిందో లేదో అవి తనిఖీ చేస్తాయి. ముద్రించడం వంటి కొన్ని ప్రత్యేక చర్యలు ఆ ఖాతాకు మాత్రమే పరిమితం చేయబడతాయని మనం ఆశిస్తాము. అయినప్పటికీ, _ఖచ్చితంగా ఒకే పనిని_ చేసే రెండు వేర్వేరు ఫంక్షన్‌లను కలిగి ఉండటంలో అర్థం ఏమిటి?

## మనం స్వయంచాలకంగా దేనిని గుర్తించగలము? {#what-can-we-detect-automatically}

Etherscan ని చూడటం ద్వారా `wARB` ఒక స్కామ్ టోకెన్ అని మనం చూడవచ్చు. అయినప్పటికీ, అది కేంద్రీకృత పరిష్కారం. సిద్ధాంతపరంగా, Etherscan ని అణచివేయవచ్చు లేదా హ్యాక్ చేయవచ్చు. టోకెన్ చట్టబద్ధమైనదో కాదో స్వతంత్రంగా తెలుసుకోగలగడం మంచిది.

ERC-20 టోకెన్ వెలువరించే ఈవెంట్‌లను చూడటం ద్వారా అది అనుమానాస్పదమైనదని (స్కామ్ లేదా చాలా దారుణంగా వ్రాయబడినది) గుర్తించడానికి మనం ఉపయోగించగల కొన్ని ఉపాయాలు ఉన్నాయి.

## అనుమానాస్పద `Approval` ఈవెంట్‌లు {#suspicious-approval-events}

[`Approval` ఈవెంట్‌లు](https://eips.ethereum.org/EIPS/eip-20#approval) ప్రత్యక్ష అభ్యర్థనతో మాత్రమే జరగాలి (అనుమతి మొత్తం ఫలితంగా జరిగే [`Transfer` ఈవెంట్‌లకు](https://eips.ethereum.org/EIPS/eip-20#transfer-1) విరుద్ధంగా). ఈ సమస్య యొక్క వివరణాత్మక వివరణ కోసం మరియు అభ్యర్థనలు కాంట్రాక్ట్ ద్వారా మధ్యవర్తిత్వం వహించకుండా ఎందుకు ప్రత్యక్షంగా ఉండాలి అనే దాని కోసం [Solidity డాక్యుమెంట్‌లను చూడండి](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin).

దీని అర్థం [బాహ్యంగా స్వంతమైన ఖాతా](/developers/docs/accounts/#types-of-account) నుండి ఖర్చు చేయడానికి ఆమోదించే `Approval` ఈవెంట్‌లు ఆ ఖాతాలో ఉద్భవించే లావాదేవీల నుండి రావాలి మరియు వాటి గమ్యం ERC-20 కాంట్రాక్ట్ అయి ఉండాలి. బాహ్యంగా స్వంతమైన ఖాతా నుండి వచ్చే మరే ఇతర రకమైన ఆమోదమైనా అనుమానాస్పదమే.

టైప్ సేఫ్టీతో కూడిన JavaScript వేరియంట్ అయిన [Viem](https://viem.sh/) మరియు [TypeScript](https://www.typescriptlang.org/docs/) ని ఉపయోగించి [ఈ రకమైన ఈవెంట్‌ను గుర్తించే ప్రోగ్రామ్](https://github.com/qbzzt/20230915-scam-token-detection) ఇక్కడ ఉంది. దీన్ని రన్ చేయడానికి:

1. `.env.example` ని `.env` కి కాపీ చేయండి.
2. ఎథీరియం మెయిన్‌నెట్ నోడ్‌కు URL ని అందించడానికి `.env` ని సవరించండి.
3. అవసరమైన ప్యాకేజీలను ఇన్‌స్టాల్ చేయడానికి `pnpm install` ని రన్ చేయండి.
4. అనుమానాస్పద ఆమోదాల కోసం వెతకడానికి `pnpm susApproval` ని రన్ చేయండి.

లైన్ బై లైన్ వివరణ ఇక్కడ ఉంది:

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

`viem` నుండి టైప్ డెఫినిషన్‌లు, ఫంక్షన్‌లు మరియు చైన్ డెఫినిషన్‌ను దిగుమతి చేయండి.

```typescript
import { config } from "dotenv"
config()
```

URL ని పొందడానికి `.env` ని చదవండి.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Viem క్లయింట్‌ను సృష్టించండి. మనం బ్లాక్‌చైన్ నుండి మాత్రమే చదవాలి, కాబట్టి ఈ క్లయింట్‌కు ప్రైవేట్ కీ అవసరం లేదు.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

అనుమానాస్పద ERC-20 కాంట్రాక్ట్ యొక్క చిరునామా మరియు మనం ఈవెంట్‌ల కోసం వెతికే బ్లాక్‌లు. బ్యాండ్‌విడ్త్ ఖరీదైనది కావచ్చు కాబట్టి నోడ్ ప్రొవైడర్‌లు సాధారణంగా ఈవెంట్‌లను చదివే మన సామర్థ్యాన్ని పరిమితం చేస్తారు. అదృష్టవశాత్తూ `wARB` పద్దెనిమిది గంటల వ్యవధిలో వాడుకలో లేదు, కాబట్టి మనం అన్ని ఈవెంట్‌ల కోసం వెతకవచ్చు (మొత్తం 13 మాత్రమే ఉన్నాయి).

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

ఈవెంట్ సమాచారం కోసం Viem ని అడగడానికి ఇది మార్గం. ఫీల్డ్ పేర్లతో సహా ఖచ్చితమైన ఈవెంట్ సంతకాన్ని మనం దానికి అందించినప్పుడు, అది మన కోసం ఈవెంట్‌ను పార్స్ చేస్తుంది.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

మన అల్గారిథమ్ బాహ్యంగా స్వంతమైన ఖాతాలకు మాత్రమే వర్తిస్తుంది. `client.getBytecode` ద్వారా ఏదైనా బైట్‌కోడ్ అందించబడితే, ఇది ఒక కాంట్రాక్ట్ అని అర్థం మరియు మనం దానిని దాటవేయాలి.

మీరు ఇంతకు ముందు TypeScript ని ఉపయోగించకుంటే, ఫంక్షన్ డెఫినిషన్ కొంచెం వింతగా అనిపించవచ్చు. మొదటి (మరియు ఏకైక) పారామీటర్‌ను `addr` అని పిలుస్తారని మాత్రమే కాకుండా, అది `Address` రకానికి చెందినదని కూడా మనం దానికి చెబుతాము. అదేవిధంగా, `: boolean` భాగం ఫంక్షన్ యొక్క రిటర్న్ విలువ బూలియన్ అని TypeScript కి చెబుతుంది.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

ఈ ఫంక్షన్ ఈవెంట్ నుండి లావాదేవీ రశీదును పొందుతుంది. లావాదేవీ గమ్యం ఏమిటో మనకు తెలుసని నిర్ధారించుకోవడానికి మనకు రశీదు అవసరం.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

ఇది అత్యంత ముఖ్యమైన ఫంక్షన్, ఈవెంట్ అనుమానాస్పదమైనదా కాదా అని వాస్తవానికి నిర్ణయించేది ఇదే. రిటర్న్ రకం, `(Event | null)`, ఈ ఫంక్షన్ `Event` లేదా `null` ని అందించగలదని TypeScript కి చెబుతుంది. ఈవెంట్ అనుమానాస్పదంగా లేకుంటే మనం `null` ని అందిస్తాము.

```typescript
const owner = ev.args._owner
```

Viem ఫీల్డ్ పేర్లను కలిగి ఉంది, కాబట్టి ఇది మన కోసం ఈవెంట్‌ను పార్స్ చేసింది. `_owner` అనేది ఖర్చు చేయాల్సిన టోకెన్‌ల యజమాని.

```typescript
// కాంట్రాక్ట్‌ల ద్వారా ఆమోదాలు అనుమానాస్పదమైనవి కావు
if (await isContract(owner)) return null
```

యజమాని కాంట్రాక్ట్ అయితే, ఈ ఆమోదం అనుమానాస్పదమైనది కాదని భావించండి. కాంట్రాక్ట్ ఆమోదం అనుమానాస్పదమైనదా కాదా అని తనిఖీ చేయడానికి, అది ఎప్పుడైనా యజమాని కాంట్రాక్ట్‌కు చేరుకుందో లేదో మరియు ఆ కాంట్రాక్ట్ నేరుగా ERC-20 కాంట్రాక్ట్‌ను పిలిచిందో లేదో చూడటానికి మనం లావాదేవీ యొక్క పూర్తి అమలును ట్రేస్ చేయాలి. మనం చేయాలనుకుంటున్న దానికంటే ఇది చాలా ఎక్కువ వనరులను ఖర్చు చేస్తుంది.

```typescript
const txn = await getEventTxn(ev)
```

ఆమోదం బాహ్యంగా స్వంతమైన ఖాతా నుండి వస్తే, దానికి కారణమైన లావాదేవీని పొందండి.

```typescript
// ఆమోదం లావాదేవీ యొక్క `from` కాని EOA యజమాని నుండి వస్తే అది అనుమానాస్పదంగా ఉంటుంది
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

చిరునామాలు హెక్సాడెసిమల్ కాబట్టి మనం స్ట్రింగ్ సమానత్వం కోసం మాత్రమే తనిఖీ చేయలేము, కాబట్టి అవి అక్షరాలను కలిగి ఉంటాయి. కొన్నిసార్లు, ఉదాహరణకు `txn.from` లో, ఆ అక్షరాలన్నీ చిన్నబడిలో (lowercase) ఉంటాయి. ఇతర సందర్భాల్లో, `ev.args._owner` వంటి వాటిలో, చిరునామా [లోపాలను గుర్తించడం కోసం మిక్స్‌డ్-కేస్‌లో](https://eips.ethereum.org/EIPS/eip-55) ఉంటుంది.

కానీ లావాదేవీ యజమాని నుండి కాకపోతే మరియు ఆ యజమాని బాహ్యంగా స్వంతమైన ఖాతా అయితే, అప్పుడు మనకు అనుమానాస్పద లావాదేవీ ఉన్నట్లు.

```typescript
// లావాదేవీ గమ్యస్థానం మనం
// పరిశీలిస్తున్న ERC-20 కాంట్రాక్ట్ కాకపోతే ఇది కూడా అనుమానాస్పదంగా ఉంటుంది
if (txn.to.toLowerCase() != testedAddress) return ev
```

అదేవిధంగా, లావాదేవీ యొక్క `to` చిరునామా, అంటే పిలువబడిన మొదటి కాంట్రాక్ట్, దర్యాప్తులో ఉన్న ERC-20 కాంట్రాక్ట్ కాకపోతే అది అనుమానాస్పదమైనది.

```typescript
    // అనుమానించడానికి ఎటువంటి కారణం లేకపోతే, nullని తిరిగి ఇవ్వండి.
    return null
}
```

ఏ షరతు నిజం కాకపోతే `Approval` ఈవెంట్ అనుమానాస్పదమైనది కాదు.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[ఒక `async` ఫంక్షన్](https://www.w3schools.com/js/js_async.asp) `Promise` ఆబ్జెక్ట్‌ను అందిస్తుంది. సాధారణ సింటాక్స్ `await x()` తో, ప్రాసెసింగ్‌ను కొనసాగించడానికి ముందు ఆ `Promise` నెరవేరే వరకు మనం వేచి ఉంటాము. ఇది ప్రోగ్రామ్ చేయడానికి మరియు అనుసరించడానికి సులభం, కానీ ఇది అసమర్థమైనది కూడా. నిర్దిష్ట ఈవెంట్ కోసం `Promise` నెరవేరే వరకు మనం వేచి ఉన్నప్పుడు, మనం ఇప్పటికే తదుపరి ఈవెంట్‌పై పని చేయడం ప్రారంభించవచ్చు.

ఇక్కడ మనం `Promise` ఆబ్జెక్ట్‌ల శ్రేణిని సృష్టించడానికి [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ని ఉపయోగిస్తాము. ఆ తర్వాత ఆ ప్రామిస్‌లన్నీ పరిష్కరించబడే వరకు వేచి ఉండటానికి మనం [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) ని ఉపయోగిస్తాము. అనుమానాస్పదంగా లేని ఈవెంట్‌లను తీసివేయడానికి మనం ఆ ఫలితాలను [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) చేస్తాము.

### అనుమానాస్పద `Transfer` ఈవెంట్‌లు {#suspicious-transfer-events}

స్కామ్ టోకెన్‌లను గుర్తించడానికి మరొక మార్గం ఏమిటంటే, వాటికి ఏవైనా అనుమానాస్పద బదిలీలు ఉన్నాయో లేదో చూడటం. ఉదాహరణకు, అంతగా టోకెన్‌లు లేని ఖాతాల నుండి బదిలీలు. [ఈ పరీక్షను ఎలా అమలు చేయాలో](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts) మీరు చూడవచ్చు, కానీ `wARB` కి ఈ సమస్య లేదు.

## ముగింపు {#conclusion}

ERC-20 స్కామ్‌ల స్వయంచాలక గుర్తింపు [ఫాల్స్ నెగటివ్‌లతో (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) బాధపడుతుంది, ఎందుకంటే ఒక స్కామ్ నిజమైన దేనినీ సూచించని ఖచ్చితమైన సాధారణ ERC-20 టోకెన్ కాంట్రాక్ట్‌ను ఉపయోగించవచ్చు. కాబట్టి మీరు ఎల్లప్పుడూ _విశ్వసనీయ మూలం నుండి టోకెన్ చిరునామాను పొందడానికి_ ప్రయత్నించాలి.

అనేక టోకెన్‌లు ఉన్న మరియు వాటిని స్వయంచాలకంగా నిర్వహించాల్సిన వికేంద్రీకృత ఫైనాన్స్ (DeFi) భాగాల వంటి కొన్ని సందర్భాల్లో స్వయంచాలక గుర్తింపు సహాయపడుతుంది. కానీ ఎప్పటిలాగే [కొనుగోలుదారులే జాగ్రత్త వహించాలి (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), మీ స్వంత పరిశోధన చేయండి మరియు మీ వినియోగదారులను కూడా అలాగే చేయమని ప్రోత్సహించండి.

[నా మరిన్ని పనుల కోసం ఇక్కడ చూడండి](https://cryptodocguy.pro/).