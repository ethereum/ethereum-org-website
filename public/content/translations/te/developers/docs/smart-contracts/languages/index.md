---
title: స్మార్ట్ కాంట్రాక్ట్ భాషలు
description: రెండు ప్రధాన స్మార్ట్ కాంట్రాక్ట్ భాషలైన Solidity మరియు Vyper యొక్క అవలోకనం మరియు పోలిక.
lang: te
---

[ఎథీరియం](/) గురించిన ఒక గొప్ప విషయం ఏమిటంటే, డెవలపర్‌లకు అనుకూలమైన భాషలను ఉపయోగించి స్మార్ట్ కాంట్రాక్ట్‌లను ప్రోగ్రామ్ చేయవచ్చు. మీకు Python లేదా ఏదైనా [కర్లీ-బ్రాకెట్ భాష](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)తో అనుభవం ఉంటే, మీకు తెలిసిన సింటాక్స్‌తో కూడిన భాషను మీరు కనుగొనవచ్చు.

అత్యంత చురుకైన మరియు నిర్వహించబడుతున్న రెండు భాషలు:

- Solidity
- Vyper

Solidity మరియు Vyper రెండింటిలోనూ కాంట్రాక్ట్‌లను సృష్టించడానికి మరియు పరీక్షించడానికి Remix IDE ఒక సమగ్ర డెవలప్‌మెంట్ వాతావరణాన్ని అందిస్తుంది. కోడింగ్ ప్రారంభించడానికి [ఇన్-బ్రౌజర్ Remix IDEని ప్రయత్నించండి](https://remix.ethereum.org).

మరింత అనుభవజ్ఞులైన డెవలపర్‌లు [ఎథీరియం వర్చువల్ మెషీన్ (EVM)](/developers/docs/evm/) కోసం ఇంటర్మీడియట్ భాష అయిన Yul లేదా Yulకి పొడిగింపు అయిన Yul+ని కూడా ఉపయోగించాలనుకోవచ్చు.

మీకు ఆసక్తి ఉండి, ఇంకా భారీ అభివృద్ధిలో ఉన్న కొత్త భాషలను పరీక్షించడంలో సహాయపడాలనుకుంటే, మీరు ప్రస్తుతం ప్రారంభ దశలో ఉన్న అభివృద్ధి చెందుతున్న స్మార్ట్ కాంట్రాక్ట్ భాష అయిన Feతో ప్రయోగాలు చేయవచ్చు.

## ముందస్తు అవసరాలు {#prerequisites}

ప్రోగ్రామింగ్ భాషల గురించి, ముఖ్యంగా JavaScript లేదా Python గురించి మునుపటి జ్ఞానం, స్మార్ట్ కాంట్రాక్ట్ భాషలలోని తేడాలను అర్థం చేసుకోవడంలో మీకు సహాయపడుతుంది. భాషా పోలికలలోకి లోతుగా వెళ్లే ముందు స్మార్ట్ కాంట్రాక్ట్‌లను ఒక కాన్సెప్ట్‌గా అర్థం చేసుకోవాలని కూడా మేము సిఫార్సు చేస్తున్నాము. [స్మార్ట్ కాంట్రాక్ట్‌ల పరిచయం](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- స్మార్ట్ కాంట్రాక్ట్‌లను అమలు చేయడానికి ఆబ్జెక్ట్-ఓరియెంటెడ్, హై-లెవల్ భాష.
- C++ ద్వారా అత్యంత లోతుగా ప్రభావితమైన కర్లీ-బ్రాకెట్ భాష.
- స్టాటికల్లీ టైప్ చేయబడింది (వేరియబుల్ యొక్క రకం కంపైల్ సమయంలో తెలుస్తుంది).
- వీటికి మద్దతు ఇస్తుంది:
  - ఇన్‌హెరిటెన్స్ (మీరు ఇతర కాంట్రాక్ట్‌లను విస్తరించవచ్చు).
  - లైబ్రరీలు (మీరు వివిధ కాంట్రాక్ట్‌ల నుండి కాల్ చేయగల పునర్వినియోగ కోడ్‌ను సృష్టించవచ్చు - ఇతర ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ భాషలలోని స్టాటిక్ క్లాస్‌లోని స్టాటిక్ ఫంక్షన్‌ల వలె).
  - సంక్లిష్టమైన వినియోగదారు-నిర్వచించిన రకాలు.

### ముఖ్యమైన లింక్‌లు {#important-links}

- [డాక్యుమెంటేషన్](https://docs.soliditylang.org/en/latest/)
- [Solidity లాంగ్వేజ్ పోర్టల్](https://soliditylang.org/)
- [ఉదాహరణ ద్వారా Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity మ్యాట్రిక్స్ చాట్‌రూమ్](https://matrix.to/#/#ethereum_solidity:gitter.im)కి బ్రిడ్జ్ చేయబడిన [Solidity Gitter చాట్‌రూమ్](https://gitter.im/ethereum/solidity)
- [చీట్ షీట్](https://reference.auditless.com/cheatsheet)
- [Solidity బ్లాగ్](https://blog.soliditylang.org/)
- [Solidity ట్విట్టర్](https://twitter.com/solidity_lang)

### ఉదాహరణ కాంట్రాక్ట్ {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" అనే కీవర్డ్ వేరియబుల్స్‌ను
    // ఇతర కాంట్రాక్ట్‌ల నుండి యాక్సెస్ చేయడానికి వీలు కల్పిస్తుంది
    address public minter;
    mapping (address => uint) public balances;

    // ఈవెంట్‌లు క్లయింట్‌లను నిర్దిష్ట
    // మీరు ప్రకటించే కాంట్రాక్ట్ మార్పులకు ప్రతిస్పందించడానికి అనుమతిస్తాయి
    event Sent(address from, address to, uint amount);

    // కన్‌స్ట్రక్టర్ కోడ్ కాంట్రాక్ట్
    // సృష్టించబడినప్పుడు మాత్రమే రన్ అవుతుంది
    constructor() {
        minter = msg.sender;
    }

    // కొత్తగా సృష్టించబడిన నాణేల మొత్తాన్ని ఒక అడ్రస్‌కు పంపుతుంది
    // కాంట్రాక్ట్ సృష్టికర్త ద్వారా మాత్రమే కాల్ చేయబడుతుంది
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // ఇప్పటికే ఉన్న నాణేల మొత్తాన్ని పంపుతుంది
    // ఏ కాలర్ నుండి అయినా ఒక అడ్రస్‌కు
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

ఈ ఉదాహరణ మీకు Solidity కాంట్రాక్ట్ సింటాక్స్ ఎలా ఉంటుందో ఒక అవగాహనను ఇస్తుంది. ఫంక్షన్‌లు మరియు వేరియబుల్స్ యొక్క మరింత వివరణాత్మక వర్ణన కోసం, [డాక్స్‌ని చూడండి](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- పైథానిక్ ప్రోగ్రామింగ్ భాష
- స్ట్రాంగ్ టైపింగ్
- చిన్న మరియు అర్థమయ్యే కంపైలర్ కోడ్
- సమర్థవంతమైన బైట్‌కోడ్ ఉత్పత్తి
- కాంట్రాక్ట్‌లను మరింత సురక్షితంగా మరియు ఆడిట్ చేయడానికి సులభతరం చేసే లక్ష్యంతో ఉద్దేశపూర్వకంగా Solidity కంటే తక్కువ ఫీచర్‌లను కలిగి ఉంది. Vyper వీటికి మద్దతు ఇవ్వదు:
  - మాడిఫైయర్‌లు
  - ఇన్‌హెరిటెన్స్
  - ఇన్‌లైన్ అసెంబ్లీ
  - ఫంక్షన్ ఓవర్‌లోడింగ్
  - ఆపరేటర్ ఓవర్‌లోడింగ్
  - రికర్సివ్ కాలింగ్
  - అనంతమైన-పొడవు లూప్‌లు
  - బైనరీ ఫిక్స్‌డ్ పాయింట్‌లు

మరింత సమాచారం కోసం, [Vyper హేతుబద్ధతను చదవండి](https://vyper.readthedocs.io/en/latest/index.html).

### ముఖ్యమైన లింక్‌లు {#important-links-1}

- [డాక్యుమెంటేషన్](https://vyper.readthedocs.io)
- [ఉదాహరణ ద్వారా Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [ఉదాహరణ ద్వారా మరిన్ని Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper కమ్యూనిటీ డిస్కార్డ్ చాట్](https://discord.gg/SdvKC79cJk)
- [చీట్ షీట్](https://reference.auditless.com/cheatsheet)
- [Vyper కోసం స్మార్ట్ కాంట్రాక్ట్ డెవలప్‌మెంట్ ఫ్రేమ్‌వర్క్‌లు మరియు సాధనాలు](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper స్మార్ట్ కాంట్రాక్ట్‌లను సురక్షితం చేయడం మరియు హ్యాక్ చేయడం నేర్చుకోండి](https://github.com/SupremacyTeam/VyperPunk)
- [అభివృద్ధి కోసం Vyper హబ్](https://github.com/zcor/vyper-dev)
- [Vyper గ్రేటెస్ట్ హిట్స్ స్మార్ట్ కాంట్రాక్ట్ ఉదాహరణలు](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [అద్భుతమైన Vyper క్యూరేటెడ్ వనరులు](https://github.com/spadebuilders/awesome-vyper)

### ఉదాహరణ {#example}

```python
# ఓపెన్ వేలం

# వేలం పారామితులు
# లబ్ధిదారుడు అత్యధిక బిడ్డర్ నుండి డబ్బును పొందుతాడు
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# వేలం యొక్క ప్రస్తుత స్థితి
highestBidder: public(address)
highestBid: public(uint256)

# చివరిలో true కి సెట్ చేయబడుతుంది, ఎలాంటి మార్పును అనుమతించదు
ended: public(bool)

# మేము విత్‌డ్రా ప్యాట్రన్‌ను అనుసరించడానికి వీలుగా రీఫండ్ చేయబడిన బిడ్‌లను ట్రాక్ చేయండి
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` తో ఒక సాధారణ వేలాన్ని సృష్టించండి
# సెకన్ల బిడ్డింగ్ సమయం, వీరి తరపున
# లబ్ధిదారుని అడ్రస్ `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# పంపిన విలువతో వేలంలో బిడ్ చేయండి
# ఈ లావాదేవీతో పాటు.
# ఒకవేళ వేలంలో గెలవకపోతే మాత్రమే
# విలువ రీఫండ్ చేయబడుతుంది.
@external
@payable
def bid():
    # బిడ్డింగ్ సమయం ముగిసిందో లేదో తనిఖీ చేయండి.
    assert block.timestamp < self.auctionEnd
    # బిడ్ తగినంత ఎక్కువగా ఉందో లేదో తనిఖీ చేయండి
    assert msg.value > self.highestBid
    # మునుపటి అత్యధిక బిడ్డర్ కోసం రీఫండ్‌ను ట్రాక్ చేయండి
    self.pendingReturns[self.highestBidder] += self.highestBid
    # కొత్త అత్యధిక బిడ్‌ను ట్రాక్ చేయండి
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# గతంలో రీఫండ్ చేయబడిన బిడ్‌ను విత్‌డ్రా చేయండి. విత్‌డ్రా ప్యాట్రన్
# భద్రతా సమస్యను నివారించడానికి ఇక్కడ ఉపయోగించబడింది. ఒకవేళ రీఫండ్‌లు నేరుగా
# bid() లో భాగంగా పంపబడితే, ఒక హానికరమైన బిడ్డింగ్ కాంట్రాక్ట్ ఆ రీఫండ్‌లను
# బ్లాక్ చేయగలదు మరియు తద్వారా కొత్త అత్యధిక బిడ్‌లు రాకుండా నిరోధించగలదు.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# వేలాన్ని ముగించి, అత్యధిక బిడ్‌ను పంపండి
# లబ్ధిదారునికి.
@external
def endAuction():
    # ఇంటరాక్ట్ అయ్యే ఫంక్షన్‌లను నిర్మించడం ఒక మంచి మార్గదర్శకం
    # ఇతర కాంట్రాక్ట్‌లతో (అంటే, అవి ఫంక్షన్‌లను కాల్ చేస్తాయి లేదా ఈథర్‌ను పంపుతాయి)
    # మూడు దశలుగా:
    # 1. షరతులను తనిఖీ చేయడం
    # 2. చర్యలను నిర్వహించడం (షరతులను మార్చే అవకాశం ఉంది)
    # 3. ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడం
    # ఈ దశలు కలిసిపోతే, ఇతర కాంట్రాక్ట్ ప్రస్తుత కాంట్రాక్ట్‌లోకి
    # తిరిగి కాల్ చేయగలదు మరియు స్థితిని సవరించగలదు లేదా
    # ప్రభావాలు (ఈథర్ చెల్లింపు) బహుళ సార్లు జరిగేలా చేయగలదు.
    # అంతర్గతంగా కాల్ చేయబడిన ఫంక్షన్‌లు బాహ్య కాంట్రాక్ట్‌లతో ఇంటరాక్షన్‌ను కలిగి ఉంటే,
    # వాటిని కూడా బాహ్య కాంట్రాక్ట్‌లతో ఇంటరాక్షన్‌గా
    # పరిగణించాలి.

    # 1. షరతులు
    # వేలం ముగింపు సమయం చేరుకుందో లేదో తనిఖీ చేయండి
    assert block.timestamp >= self.auctionEnd
    # ఈ ఫంక్షన్ ఇప్పటికే కాల్ చేయబడిందో లేదో తనిఖీ చేయండి
    assert not self.ended

    # 2. ప్రభావాలు
    self.ended = True

    # 3. ఇంటరాక్షన్
    send(self.beneficiary, self.highestBid)
```

ఈ ఉదాహరణ మీకు Vyper కాంట్రాక్ట్ సింటాక్స్ ఎలా ఉంటుందో ఒక అవగాహనను ఇస్తుంది. ఫంక్షన్‌లు మరియు వేరియబుల్స్ యొక్క మరింత వివరణాత్మక వర్ణన కోసం, [డాక్స్‌ని చూడండి](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul మరియు Yul+ {#yul}

మీరు ఎథీరియంకి కొత్త అయితే మరియు స్మార్ట్ కాంట్రాక్ట్ భాషలతో ఇంకా ఎలాంటి కోడింగ్ చేయకపోతే, Solidity లేదా Vyperతో ప్రారంభించాలని మేము సిఫార్సు చేస్తున్నాము. మీరు స్మార్ట్ కాంట్రాక్ట్ భద్రతా ఉత్తమ పద్ధతులు మరియు EVMతో పనిచేయడం గురించిన ప్రత్యేకతలతో పరిచయం పెంచుకున్న తర్వాత మాత్రమే Yul లేదా Yul+ని పరిశీలించండి.

**Yul**

- ఎథీరియం కోసం ఇంటర్మీడియట్ భాష.
- [EVM](/developers/docs/evm) మరియు ఎథీరియం ఫ్లేవర్డ్ WebAssembly అయిన [Ewasm](https://github.com/ewasm)కి మద్దతు ఇస్తుంది మరియు రెండు ప్లాట్‌ఫారమ్‌ల యొక్క ఉపయోగించదగిన సాధారణ హారంగా రూపొందించబడింది.
- EVM మరియు Ewasm ప్లాట్‌ఫారమ్‌ల రెండింటికీ సమానంగా ప్రయోజనం చేకూర్చే హై-లెవల్ ఆప్టిమైజేషన్ దశలకు మంచి లక్ష్యం.

**Yul+**

- Yulకి తక్కువ-స్థాయి, అత్యంత సమర్థవంతమైన పొడిగింపు.
- ప్రారంభంలో [ఆశావాద రోలప్](/developers/docs/scaling/optimistic-rollups/) కాంట్రాక్ట్ కోసం రూపొందించబడింది.
- Yul+ని Yulకి ప్రయోగాత్మక అప్‌గ్రేడ్ ప్రతిపాదనగా చూడవచ్చు, దానికి కొత్త ఫీచర్‌లను జోడిస్తుంది.

### ముఖ్యమైన లింక్‌లు {#important-links-2}

- [Yul డాక్యుమెంటేషన్](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ డాక్యుమెంటేషన్](https://github.com/fuellabs/yulp)
- [Yul+ పరిచయ పోస్ట్](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### ఉదాహరణ కాంట్రాక్ట్ {#example-contract-2}

కింది సాధారణ ఉదాహరణ పవర్ ఫంక్షన్‌ను అమలు చేస్తుంది. దీన్ని `solc --strict-assembly --bin input.yul` ఉపయోగించి కంపైల్ చేయవచ్చు. ఉదాహరణను input.yul ఫైల్‌లో నిల్వ చేయాలి.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

మీకు ఇప్పటికే స్మార్ట్ కాంట్రాక్ట్‌లతో మంచి అనుభవం ఉంటే, Yulలో పూర్తి ERC-20 అమలును [ఇక్కడ](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) కనుగొనవచ్చు.

## Fe {#fe}

- ఎథీరియం వర్చువల్ మెషీన్ (EVM) కోసం స్టాటికల్లీ టైప్ చేయబడిన భాష.
- Python మరియు Rust ద్వారా ప్రేరణ పొందింది.
- ఎథీరియం పర్యావరణ వ్యవస్థకు కొత్త అయిన డెవలపర్‌లకు కూడా -- నేర్చుకోవడానికి సులభంగా ఉండాలని లక్ష్యంగా పెట్టుకుంది.
- Fe అభివృద్ధి ఇంకా ప్రారంభ దశలోనే ఉంది, ఈ భాష జనవరి 2021లో దాని ఆల్ఫా విడుదలను కలిగి ఉంది.

### ముఖ్యమైన లింక్‌లు {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe ప్రకటన](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 రోడ్‌మ్యాప్](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe డిస్కార్డ్ చాట్](https://discord.com/invite/ywpkAXFjZH)
- [Fe ట్విట్టర్](https://twitter.com/official_fe)

### ఉదాహరణ కాంట్రాక్ట్ {#example-contract-3}

కిందిది Feలో అమలు చేయబడిన ఒక సాధారణ కాంట్రాక్ట్.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## ఎలా ఎంచుకోవాలి {#how-to-choose}

మరేదైనా ప్రోగ్రామింగ్ భాష మాదిరిగానే, ఇది ఎక్కువగా సరైన పని కోసం సరైన సాధనాన్ని ఎంచుకోవడంతో పాటు వ్యక్తిగత ప్రాధాన్యతలకు సంబంధించినది.

మీరు ఇంకా ఏ భాషలనూ ప్రయత్నించకపోతే పరిగణించవలసిన కొన్ని విషయాలు ఇక్కడ ఉన్నాయి:

### Solidity గురించి గొప్ప విషయం ఏమిటి? {#solidity-advantages}

- మీరు అనుభవశూన్యుడు అయితే, అక్కడ అనేక ట్యుటోరియల్స్ మరియు అభ్యాస సాధనాలు ఉన్నాయి. [కోడింగ్ ద్వారా నేర్చుకోండి](/developers/learning-tools/) విభాగంలో దాని గురించి మరింత చూడండి.
- మంచి డెవలపర్ టూలింగ్ అందుబాటులో ఉంది.
- Solidity పెద్ద డెవలపర్ కమ్యూనిటీని కలిగి ఉంది, అంటే మీరు మీ ప్రశ్నలకు చాలా త్వరగా సమాధానాలను కనుగొనే అవకాశం ఉంది.

### Vyper గురించి గొప్ప విషయం ఏమిటి? {#vyper-advatages}

- స్మార్ట్ కాంట్రాక్ట్‌లను వ్రాయాలనుకునే Python డెవలపర్‌లు ప్రారంభించడానికి గొప్ప మార్గం.
- Vyper తక్కువ సంఖ్యలో ఫీచర్‌లను కలిగి ఉంది, ఇది ఆలోచనల యొక్క శీఘ్ర ప్రోటోటైపింగ్‌కు గొప్పగా చేస్తుంది.
- Vyper ఆడిట్ చేయడానికి సులభంగా మరియు గరిష్టంగా మానవులు చదవగలిగేలా ఉండాలని లక్ష్యంగా పెట్టుకుంది.

### Yul మరియు Yul+ గురించి గొప్ప విషయం ఏమిటి? {#yul-advantages}

- సరళమైన మరియు ఫంక్షనల్ తక్కువ-స్థాయి భాష.
- ముడి EVMకి మరింత దగ్గరగా వెళ్లడానికి అనుమతిస్తుంది, ఇది మీ కాంట్రాక్ట్‌ల గ్యాస్ వినియోగాన్ని ఆప్టిమైజ్ చేయడంలో సహాయపడుతుంది.

## భాషా పోలికలు {#language-comparisons}

ప్రాథమిక సింటాక్స్, కాంట్రాక్ట్ జీవితచక్రం, ఇంటర్‌ఫేస్‌లు, ఆపరేటర్‌లు, డేటా స్ట్రక్చర్‌లు, ఫంక్షన్‌లు, కంట్రోల్ ఫ్లో మరియు మరిన్నింటి పోలికల కోసం [Auditless ద్వారా ఈ చీట్‌షీట్‌ని](https://reference.auditless.com/cheatsheet/) తనిఖీ చేయండి.

## తదుపరి పఠనం {#further-reading}

- [ఓపెన్‌జెప్పెలిన్ ద్వారా Solidity కాంట్రాక్ట్‌ల లైబ్రరీ](https://docs.openzeppelin.com/contracts/5.x/)
- [ఉదాహరణ ద్వారా Solidity](https://solidity-by-example.org)