---
title: "స్మార్ట్ కాంట్రాక్ట్‌ల నిర్మాణం"
description: "స్మార్ట్ కాంట్రాక్ట్ నిర్మాణం గురించి లోతైన పరిశీలన – ఫంక్షన్‌లు, డేటా మరియు వేరియబుల్స్."
lang: te
---

స్మార్ట్ కాంట్రాక్ట్ అనేది ఎథీరియంపై ఒక చిరునామా వద్ద రన్ అయ్యే ప్రోగ్రామ్. అవి లావాదేవీని స్వీకరించినప్పుడు అమలు చేయగల డేటా మరియు ఫంక్షన్‌లతో రూపొందించబడ్డాయి. స్మార్ట్ కాంట్రాక్ట్‌ను రూపొందించే వాటి యొక్క అవలోకనం ఇక్కడ ఉంది.

## ముందస్తు అవసరాలు {#prerequisites}

ముందుగా మీరు [స్మార్ట్ కాంట్రాక్ట్‌ల](/developers/docs/smart-contracts/) గురించి చదివారని నిర్ధారించుకోండి. మీకు ఇప్పటికే JavaScript లేదా Python వంటి ప్రోగ్రామింగ్ భాషల గురించి తెలుసని ఈ డాక్యుమెంట్ భావిస్తుంది.

## డేటా {#data}

ఏదైనా కాంట్రాక్ట్ డేటా తప్పనిసరిగా ఒక స్థానానికి కేటాయించబడాలి: `storage` లేదా `memory` కి. స్మార్ట్ కాంట్రాక్ట్‌లో స్టోరేజ్‌ని సవరించడం ఖర్చుతో కూడుకున్నది, కాబట్టి మీ డేటా ఎక్కడ ఉండాలో మీరు పరిగణించాలి.

### స్టోరేజ్ {#storage}

నిరంతర డేటాను స్టోరేజ్ అని పిలుస్తారు మరియు ఇది స్థితి వేరియబుల్స్ ద్వారా సూచించబడుతుంది. ఈ విలువలు బ్లాక్‌చైన్‌లో శాశ్వతంగా నిల్వ చేయబడతాయి. మీరు రకాన్ని (type) ప్రకటించాలి, తద్వారా కాంట్రాక్ట్ కంపైల్ అయినప్పుడు బ్లాక్‌చైన్‌లో దానికి ఎంత స్టోరేజ్ అవసరమో ట్రాక్ చేయగలదు.

```solidity
// Solidity ఉదాహరణ
contract SimpleStorage {
    uint storedData; // స్థితి వేరియబుల్
    // ...
}
```

```python
# Vyper ఉదాహరణ
storedData: int128
```

మీరు ఇప్పటికే ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషలను ప్రోగ్రామ్ చేసి ఉంటే, మీకు చాలా రకాల గురించి తెలిసి ఉంటుంది. అయితే, మీరు [ఎథీరియం](/) డెవలప్‌మెంట్‌కు కొత్త అయితే `address` మీకు కొత్తగా ఉండాలి.

`address` రకం ఎథీరియం చిరునామాను కలిగి ఉంటుంది, ఇది 20 బైట్‌లు లేదా 160 బిట్‌లకు సమానం. ఇది ముందు 0x తో హెక్సాడెసిమల్ సంజ్ఞామానంలో తిరిగి వస్తుంది.

ఇతర రకాలు ఇవి:

- బూలియన్ (boolean)
- పూర్ణాంకం (integer)
- ఫిక్స్‌డ్ పాయింట్ నంబర్‌లు
- ఫిక్స్‌డ్-సైజ్ బైట్ అర్రేలు
- డైనమిక్‌గా సైజ్ చేయబడిన బైట్ అర్రేలు
- రేషనల్ మరియు ఇంటిజర్ లిటరల్స్
- స్ట్రింగ్ లిటరల్స్
- హెక్సాడెసిమల్ లిటరల్స్
- ఎనమ్స్ (enums)

మరింత వివరణ కోసం, డాక్యుమెంట్లను చూడండి:

- [Vyper రకాలను చూడండి](https://docs.vyperlang.org/en/stable/types.html#value-types)
- [Solidity రకాలను చూడండి](https://docs.soliditylang.org/en/latest/types.html#value-types)

### మెమరీ {#memory}

కాంట్రాక్ట్ ఫంక్షన్ అమలు చేయబడే జీవితకాలం వరకు మాత్రమే నిల్వ చేయబడే విలువలని మెమరీ వేరియబుల్స్ అంటారు. ఇవి బ్లాక్‌చైన్‌లో శాశ్వతంగా నిల్వ చేయబడవు కాబట్టి, వీటిని ఉపయోగించడం చాలా చౌక.

EVM డేటాను (స్టోరేజ్, మెమరీ మరియు స్టాక్) ఎలా నిల్వ చేస్తుందో [Solidity డాక్యుమెంట్లలో](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) మరింత తెలుసుకోండి.

### ఎన్విరాన్‌మెంట్ వేరియబుల్స్ {#environment-variables}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించే వేరియబుల్స్‌తో పాటు, కొన్ని ప్రత్యేక గ్లోబల్ వేరియబుల్స్ ఉన్నాయి. ఇవి ప్రధానంగా బ్లాక్‌చైన్ లేదా ప్రస్తుత లావాదేవీ గురించి సమాచారాన్ని అందించడానికి ఉపయోగించబడతాయి.

ఉదాహరణలు:

| **ప్రాప్ (Prop)** | **స్థితి వేరియబుల్** | **వివరణ** |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | ప్రస్తుత బ్లాక్ ఎపోక్ టైమ్‌స్టాంప్        |
| `msg.sender`      | address            | సందేశం పంపినవారు (ప్రస్తుత కాల్) |

## ఫంక్షన్‌లు {#functions}

అతి సరళమైన పదాలలో చెప్పాలంటే, ఇన్‌కమింగ్ లావాదేవీలకు ప్రతిస్పందనగా ఫంక్షన్‌లు సమాచారాన్ని పొందగలవు లేదా సమాచారాన్ని సెట్ చేయగలవు.

ఫంక్షన్ కాల్స్‌లో రెండు రకాలు ఉన్నాయి:

- `internal` – ఇవి EVM కాల్‌ను సృష్టించవు
  - అంతర్గత ఫంక్షన్‌లు మరియు స్థితి వేరియబుల్స్‌ను అంతర్గతంగా మాత్రమే యాక్సెస్ చేయవచ్చు (అంటే, ప్రస్తుత కాంట్రాక్ట్ లేదా దాని నుండి ఉద్భవించిన కాంట్రాక్ట్‌ల లోపల నుండి)
- `external` – ఇవి EVM కాల్‌ను సృష్టిస్తాయి
  - బాహ్య ఫంక్షన్‌లు కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లో భాగం, అంటే వాటిని ఇతర కాంట్రాక్ట్‌ల నుండి మరియు లావాదేవీల ద్వారా కాల్ చేయవచ్చు. బాహ్య ఫంక్షన్ `f` ని అంతర్గతంగా కాల్ చేయడం సాధ్యపడదు (అంటే, `f()` పని చేయదు, కానీ `this.f()` పని చేస్తుంది).

అవి `public` లేదా `private` కూడా కావచ్చు

- `public` ఫంక్షన్‌లను కాంట్రాక్ట్ లోపల నుండి అంతర్గతంగా లేదా సందేశాల ద్వారా బాహ్యంగా కాల్ చేయవచ్చు
- `private` ఫంక్షన్‌లు అవి నిర్వచించబడిన కాంట్రాక్ట్‌కు మాత్రమే కనిపిస్తాయి మరియు ఉద్భవించిన కాంట్రాక్ట్‌లలో కనిపించవు

ఫంక్షన్‌లు మరియు స్థితి వేరియబుల్స్ రెండింటినీ పబ్లిక్ లేదా ప్రైవేట్‌గా చేయవచ్చు

కాంట్రాక్ట్‌లో స్థితి వేరియబుల్‌ను అప్‌డేట్ చేయడానికి ఇక్కడ ఒక ఫంక్షన్ ఉంది:

```solidity
// Solidity ఉదాహరణ
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` రకానికి చెందిన పారామీటర్ `value` ఫంక్షన్‌లోకి పంపబడుతుంది: `update_name`
- ఇది `public` గా ప్రకటించబడింది, అంటే ఎవరైనా దీన్ని యాక్సెస్ చేయవచ్చు
- ఇది `view` గా ప్రకటించబడలేదు, కాబట్టి ఇది కాంట్రాక్ట్ స్థితిని సవరించగలదు

### వ్యూ ఫంక్షన్‌లు (View functions) {#view-functions}

ఈ ఫంక్షన్‌లు కాంట్రాక్ట్ డేటా యొక్క స్థితిని సవరించవని వాగ్దానం చేస్తాయి. సాధారణ ఉదాహరణలు "గెట్టర్ (getter)" ఫంక్షన్‌లు – ఉదాహరణకు వినియోగదారు బ్యాలెన్స్‌ను స్వీకరించడానికి మీరు దీన్ని ఉపయోగించవచ్చు.

```solidity
// Solidity ఉదాహరణ
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

స్థితిని సవరించడంగా పరిగణించబడేవి:

1. స్థితి వేరియబుల్స్‌కు రాయడం.
2. [ఈవెంట్‌లను విడుదల చేయడం](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [ఇతర కాంట్రాక్ట్‌లను సృష్టించడం](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` ని ఉపయోగించడం.
5. కాల్స్ ద్వారా ఈథర్‌ను పంపడం.
6. `view` లేదా `pure` అని మార్క్ చేయని ఏదైనా ఫంక్షన్‌ను కాల్ చేయడం.
7. లో-లెవల్ కాల్స్‌ను ఉపయోగించడం.
8. నిర్దిష్ట ఆప్‌కోడ్‌లను కలిగి ఉన్న ఇన్‌లైన్ అసెంబ్లీని ఉపయోగించడం.

### కన్స్ట్రక్టర్ ఫంక్షన్‌లు {#constructor-functions}

కాంట్రాక్ట్ మొదటిసారి డిప్లాయ్ చేయబడినప్పుడు `constructor` ఫంక్షన్‌లు ఒక్కసారి మాత్రమే అమలు చేయబడతాయి. అనేక క్లాస్-ఆధారిత ప్రోగ్రామింగ్ భాషలలోని `constructor` లాగానే, ఈ ఫంక్షన్‌లు తరచుగా స్థితి వేరియబుల్స్‌ను వాటి నిర్దేశిత విలువలకు ఇనిషియలైజ్ చేస్తాయి.

```solidity
// Solidity ఉదాహరణ
// కాంట్రాక్ట్ డేటాను ఇనిషియలైజ్ చేస్తుంది, `owner`ను సెట్ చేస్తుంది
// కాంట్రాక్ట్ సృష్టికర్త చిరునామాకు.
constructor() public {
    // అన్ని స్మార్ట్ కాంట్రాక్ట్‌లు వాటి ఫంక్షన్‌లను ట్రిగ్గర్ చేయడానికి బాహ్య లావాదేవీలపై ఆధారపడతాయి.
    // `msg` అనేది ఇచ్చిన లావాదేవీకి సంబంధించిన సంబంధిత డేటాను కలిగి ఉండే గ్లోబల్ వేరియబుల్,
    // పంపినవారి చిరునామా మరియు లావాదేవీలో చేర్చబడిన ETH విలువ వంటివి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper ఉదాహరణ

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### అంతర్నిర్మిత ఫంక్షన్‌లు {#built-in-functions}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించే వేరియబుల్స్ మరియు ఫంక్షన్‌లతో పాటు, కొన్ని ప్రత్యేక అంతర్నిర్మిత ఫంక్షన్‌లు ఉన్నాయి. అత్యంత స్పష్టమైన ఉదాహరణ:

- `address.send()` – Solidity
- `send(address)` – Vyper

ఇవి ఇతర ఖాతాలకు ETH పంపడానికి కాంట్రాక్ట్‌లను అనుమతిస్తాయి.

## ఫంక్షన్‌లను రాయడం {#writing-functions}

మీ ఫంక్షన్‌కు ఇవి అవసరం:

- పారామీటర్ వేరియబుల్ మరియు రకం (ఇది పారామీటర్‌లను అంగీకరిస్తే)
- అంతర్గత/బాహ్య ప్రకటన (internal/external)
- ప్యూర్/వ్యూ/పేయబుల్ ప్రకటన (pure/view/payable)
- రిటర్న్స్ రకం (ఇది విలువను తిరిగి ఇస్తే)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // స్థితి వేరియబుల్

    // కాంట్రాక్ట్ డిప్లాయ్ చేయబడినప్పుడు కాల్ చేయబడుతుంది మరియు విలువను ఇనిషియలైజ్ చేస్తుంది
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get ఫంక్షన్
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set ఫంక్షన్
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

పూర్తి కాంట్రాక్ట్ ఈ విధంగా ఉండవచ్చు. ఇక్కడ `constructor` ఫంక్షన్ `dapp_name` వేరియబుల్ కోసం ప్రారంభ విలువను అందిస్తుంది.

## ఈవెంట్‌లు మరియు లాగ్‌లు {#events-and-logs}

ఈవెంట్‌లు మీ స్మార్ట్ కాంట్రాక్ట్‌ను మీ ఫ్రంటెండ్ లేదా ఇతర సబ్‌స్క్రైబ్ చేసుకున్న అప్లికేషన్‌లతో కమ్యూనికేట్ చేయడానికి అనుమతిస్తాయి. లావాదేవీ ధృవీకరించబడి, బ్లాక్‌కి జోడించబడిన తర్వాత, స్మార్ట్ కాంట్రాక్ట్‌లు ఈవెంట్‌లను విడుదల చేయగలవు మరియు సమాచారాన్ని లాగ్ చేయగలవు, ఆ తర్వాత ఫ్రంటెండ్ వాటిని ప్రాసెస్ చేసి ఉపయోగించుకోగలదు.

## ఉల్లేఖన ఉదాహరణలు {#annotated-examples}

ఇవి Solidity లో వ్రాయబడిన కొన్ని ఉదాహరణలు. మీరు కోడ్‌తో ప్రయోగాలు చేయాలనుకుంటే, మీరు వాటితో [Remix](https://remix.ethereum.org) లో ఇంటరాక్ట్ అవ్వవచ్చు.

### హలో వరల్డ్ {#hello-world}

```solidity
// సెమాంటిక్ వెర్షనింగ్‌ని ఉపయోగించి, Solidity వెర్షన్‌ను నిర్దేశిస్తుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` పేరుతో ఒక కాంట్రాక్ట్‌ను నిర్వచిస్తుంది.
// కాంట్రాక్ట్ అనేది ఫంక్షన్‌లు మరియు డేటా (దాని స్థితి) యొక్క సమాహారం.
// డిప్లాయ్ చేయబడిన తర్వాత, కాంట్రాక్ట్ ఎథీరియం బ్లాక్‌చైన్‌లోని ఒక నిర్దిష్ట చిరునామా వద్ద ఉంటుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` రకానికి చెందిన `message` అనే స్థితి వేరియబుల్‌ను ప్రకటిస్తుంది.
    // స్థితి వేరియబుల్స్ అంటే వాటి విలువలు కాంట్రాక్ట్ స్టోరేజ్‌లో శాశ్వతంగా నిల్వ చేయబడే వేరియబుల్స్.
    // `public` కీవర్డ్ వేరియబుల్స్‌ను కాంట్రాక్ట్ వెలుపల నుండి యాక్సెస్ చేయడానికి అనుమతిస్తుంది
    // మరియు విలువను యాక్సెస్ చేయడానికి ఇతర కాంట్రాక్ట్‌లు లేదా క్లయింట్‌లు కాల్ చేయగల ఫంక్షన్‌ను సృష్టిస్తుంది.
    string public message;

    // అనేక క్లాస్-ఆధారిత ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషల మాదిరిగానే, కన్స్ట్రక్టర్ అనేది
    // కాంట్రాక్ట్ సృష్టించినప్పుడు మాత్రమే అమలు చేయబడే ఒక ప్రత్యేక ఫంక్షన్.
    // కాంట్రాక్ట్ డేటాను ఇనిషియలైజ్ చేయడానికి కన్స్ట్రక్టర్‌లు ఉపయోగించబడతాయి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` అనే స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరిస్తుంది మరియు విలువను సెట్ చేస్తుంది
        // కాంట్రాక్ట్ యొక్క `message` స్టోరేజ్ వేరియబుల్‌లోకి).
        message = initMessage;
    }

    // స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరించే పబ్లిక్ ఫంక్షన్
    // మరియు `message` స్టోరేజ్ వేరియబుల్‌ను అప్‌డేట్ చేస్తుంది.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### టోకెన్ {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // ఒక `address` (చిరునామా) ఇమెయిల్ చిరునామాతో పోల్చదగినది - ఇది ఎథీరియంలో ఖాతాను గుర్తించడానికి ఉపయోగించబడుతుంది.
    // చిరునామాలు స్మార్ట్ కాంట్రాక్ట్ లేదా బాహ్య (వినియోగదారు) ఖాతాలను సూచించగలవు.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` అనేది ప్రాథమికంగా ఒక హాష్ టేబుల్ డేటా స్ట్రక్చర్.
    // ఈ `mapping` ఒక అన్‌సైన్డ్ ఇంటిజర్‌ను (టోకెన్ బ్యాలెన్స్) ఒక చిరునామాకు (టోకెన్ హోల్డర్) కేటాయిస్తుంది.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // బ్లాక్‌చైన్‌లో యాక్టివిటీని లాగింగ్ చేయడానికి ఈవెంట్‌లు అనుమతిస్తాయి.
    // కాంట్రాక్ట్ స్థితి మార్పులకు ప్రతిస్పందించడానికి ఎథీరియం క్లయింట్‌లు ఈవెంట్‌లను వినగలవు.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // కాంట్రాక్ట్ డేటాను ఇనిషియలైజ్ చేస్తుంది, `owner`ను సెట్ చేస్తుంది
    // కాంట్రాక్ట్ సృష్టికర్త చిరునామాకు.
    constructor() public {
        // అన్ని స్మార్ట్ కాంట్రాక్ట్‌లు వాటి ఫంక్షన్‌లను ట్రిగ్గర్ చేయడానికి బాహ్య లావాదేవీలపై ఆధారపడతాయి.
        // `msg` అనేది ఇచ్చిన లావాదేవీకి సంబంధించిన సంబంధిత డేటాను కలిగి ఉండే గ్లోబల్ వేరియబుల్,
        // పంపినవారి చిరునామా మరియు లావాదేవీలో చేర్చబడిన ETH విలువ వంటివి.
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // కొత్త టోకెన్‌ల మొత్తాన్ని సృష్టిస్తుంది మరియు వాటిని ఒక చిరునామాకు పంపుతుంది.
    function mint(address receiver, uint amount) public {
        // `require` అనేది కొన్ని షరతులను అమలు చేయడానికి ఉపయోగించే కంట్రోల్ స్ట్రక్చర్.
        // `require` స్టేట్‌మెంట్ `false`గా మూల్యాంకనం చేయబడితే, ఒక మినహాయింపు (exception) ట్రిగ్గర్ చేయబడుతుంది,
        // ఇది ప్రస్తుత కాల్ సమయంలో స్థితికి చేసిన అన్ని మార్పులను వెనక్కి (revert) తీసుకువెళుతుంది.
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // కాంట్రాక్ట్ యజమాని మాత్రమే ఈ ఫంక్షన్‌ను కాల్ చేయగలరు
        require(msg.sender == owner, "You are not the owner.");

        // గరిష్ట టోకెన్‌ల మొత్తాన్ని అమలు చేస్తుంది
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver` బ్యాలెన్స్‌ను `amount` ద్వారా పెంచుతుంది
        balances[receiver] += amount;
    }

    // ఏదైనా కాలర్ నుండి ఒక చిరునామాకు ఇప్పటికే ఉన్న టోకెన్‌ల మొత్తాన్ని పంపుతుంది.
    function transfer(address receiver, uint amount) public {
        // పంపడానికి పంపినవారి వద్ద తగినన్ని టోకెన్‌లు ఉండాలి
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // రెండు చిరునామాల టోకెన్ బ్యాలెన్స్‌లను సర్దుబాటు చేస్తుంది
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // ముందుగా నిర్వచించిన ఈవెంట్‌ను ఎమిట్ చేస్తుంది
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### ప్రత్యేక డిజిటల్ ఆస్తి {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// ఇతర ఫైల్‌ల నుండి ప్రస్తుత కాంట్రాక్ట్‌లోకి సింబల్స్‌ను దిగుమతి చేస్తుంది.
// ఈ సందర్భంలో, OpenZeppelin నుండి హెల్పర్ కాంట్రాక్ట్‌ల శ్రేణి.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// బాహ్య కాంట్రాక్ట్‌ల నుండి ఫంక్షన్‌లు మరియు కీవర్డ్‌లను వారసత్వంగా (inherit) పొందడానికి `is` కీవర్డ్ ఉపయోగించబడుతుంది.
// ఈ సందర్భంలో, `CryptoPizza` అనేది `IERC721` మరియు `ERC165` కాంట్రాక్ట్‌ల నుండి వారసత్వంగా పొందుతుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // అంకగణిత కార్యకలాపాలను సురక్షితంగా నిర్వహించడానికి OpenZeppelin యొక్క SafeMath లైబ్రరీని ఉపయోగిస్తుంది.
    // మరింత తెలుసుకోండి: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidityలోని స్థిరమైన (Constant) స్థితి వేరియబుల్స్ ఇతర భాషల మాదిరిగానే ఉంటాయి
    // కానీ మీరు కంపైల్ సమయంలో స్థిరంగా ఉండే ఎక్స్‌ప్రెషన్ నుండి కేటాయించాలి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // మీ స్వంత రకాన్ని నిర్వచించడానికి Struct రకాలు మిమ్మల్ని అనుమతిస్తాయి
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza స్ట్రక్ట్‌ల ఖాళీ శ్రేణిని (array) సృష్టిస్తుంది
    Pizza[] public pizzas;

    // పిజ్జా ID నుండి దాని యజమాని చిరునామాకు మ్యాపింగ్
    mapping(uint256 => address) public pizzaToOwner;

    // యజమాని చిరునామా నుండి స్వంత టోకెన్‌ల సంఖ్యకు మ్యాపింగ్
    mapping(address => uint256) public ownerPizzaCount;

    // టోకెన్ ID నుండి ఆమోదించబడిన చిరునామాకు మ్యాపింగ్
    mapping(uint256 => address) pizzaApprovals;

    // మీరు మ్యాపింగ్‌లను నెస్ట్ చేయవచ్చు, ఈ ఉదాహరణ యజమానిని ఆపరేటర్ ఆమోదాలకు మ్యాప్ చేస్తుంది
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // స్ట్రింగ్ (పేరు) మరియు DNA నుండి యాదృచ్ఛిక (random) పిజ్జాను సృష్టించడానికి అంతర్గత ఫంక్షన్
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` కీవర్డ్ అంటే ఈ ఫంక్షన్ మాత్రమే కనిపిస్తుంది
        // ఈ కాంట్రాక్ట్ మరియు ఈ కాంట్రాక్ట్ నుండి ఉద్భవించిన కాంట్రాక్ట్‌ల లోపల
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` అనేది పిజ్జా ఇప్పటికే ఉందో లేదో తనిఖీ చేసే ఫంక్షన్ మాడిఫైయర్
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // పిజ్జాల శ్రేణికి (array) పిజ్జాను జోడిస్తుంది మరియు idని పొందుతుంది
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // పిజ్జా యజమాని ప్రస్తుత వినియోగదారుతో సమానంగా ఉన్నారో లేదో తనిఖీ చేస్తుంది
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0) అనేది జీరో చిరునామా అని గమనించండి,
        // ఇది pizza[id] ఇంకా నిర్దిష్ట వినియోగదారుకు కేటాయించబడలేదని సూచిస్తుంది.

        assert(pizzaToOwner[id] == address(0));

        // పిజ్జాను యజమానికి మ్యాప్ చేస్తుంది
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // స్ట్రింగ్ (పేరు) నుండి యాదృచ్ఛిక పిజ్జాను సృష్టిస్తుంది
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // స్ట్రింగ్ (పేరు) మరియు యజమాని (సృష్టికర్త) చిరునామా నుండి యాదృచ్ఛిక DNAని ఉత్పత్తి చేస్తుంది
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`గా గుర్తించబడిన ఫంక్షన్‌లు స్థితి నుండి చదవవని లేదా సవరించవని వాగ్దానం చేస్తాయి
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // స్ట్రింగ్ (పేరు) + చిరునామా (యజమాని) నుండి యాదృచ్ఛిక uintని ఉత్పత్తి చేస్తుంది
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // యజమాని కనుగొన్న పిజ్జాల శ్రేణిని (array) తిరిగి ఇస్తుంది
    function getPizzasByOwner(address _owner)
        public
        // `view`గా గుర్తించబడిన ఫంక్షన్‌లు స్థితిని సవరించవని వాగ్దానం చేస్తాయి
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // విలువలను నిల్వ చేయడానికి `memory` స్టోరేజ్ స్థానాన్ని ఉపయోగిస్తుంది, ఇది కేవలం
        // ఈ ఫంక్షన్ కాల్ యొక్క జీవితచక్రం (lifecycle) కోసం మాత్రమే.
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // పిజ్జా మరియు యాజమాన్యాన్ని ఇతర చిరునామాకు బదిలీ చేస్తుంది
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // దిగుమతి చేయబడిన IERC721 కాంట్రాక్ట్‌లో నిర్వచించబడిన ఈవెంట్‌ను ఎమిట్ చేస్తుంది
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * ఇచ్చిన టోకెన్ ID యొక్క యాజమాన్యాన్ని సురక్షితంగా మరొక చిరునామాకు బదిలీ చేస్తుంది
     * లక్ష్య చిరునామా కాంట్రాక్ట్ అయితే, అది తప్పనిసరిగా `onERC721Received`ని అమలు చేయాలి,
     * ఇది సురక్షిత బదిలీపై కాల్ చేయబడుతుంది మరియు మ్యాజిక్ విలువను తిరిగి ఇస్తుంది
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * లేకపోతే, బదిలీ వెనక్కి (revert) తీసుకోబడుతుంది.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * ఇచ్చిన టోకెన్ ID యొక్క యాజమాన్యాన్ని సురక్షితంగా మరొక చిరునామాకు బదిలీ చేస్తుంది
     * లక్ష్య చిరునామా కాంట్రాక్ట్ అయితే, అది తప్పనిసరిగా `onERC721Received`ని అమలు చేయాలి,
     * ఇది సురక్షిత బదిలీపై కాల్ చేయబడుతుంది మరియు మ్యాజిక్ విలువను తిరిగి ఇస్తుంది
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * లేకపోతే, బదిలీ వెనక్కి (revert) తీసుకోబడుతుంది.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * లక్ష్య చిరునామాపై `onERC721Received`ని ప్రారంభించడానికి అంతర్గత ఫంక్షన్
     * లక్ష్య చిరునామా కాంట్రాక్ట్ కాకపోతే కాల్ అమలు చేయబడదు
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // పిజ్జాను బర్న్ చేస్తుంది - టోకెన్‌ను పూర్తిగా నాశనం చేస్తుంది
    // `external` ఫంక్షన్ మాడిఫైయర్ అంటే ఈ ఫంక్షన్
    // కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లో భాగం మరియు ఇతర కాంట్రాక్ట్‌లు దీనిని కాల్ చేయగలవు
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // చిరునామా ద్వారా పిజ్జాల సంఖ్యను తిరిగి ఇస్తుంది
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id ద్వారా కనుగొనబడిన పిజ్జా యజమానిని తిరిగి ఇస్తుంది
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // పిజ్జా యాజమాన్యాన్ని బదిలీ చేయడానికి ఇతర చిరునామాను ఆమోదిస్తుంది
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // నిర్దిష్ట పిజ్జా కోసం ఆమోదించబడిన చిరునామాను తిరిగి ఇస్తుంది
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * ఇచ్చిన టోకెన్ ID యొక్క ప్రస్తుత ఆమోదాన్ని క్లియర్ చేయడానికి ప్రైవేట్ ఫంక్షన్
     * ఇచ్చిన చిరునామా నిజంగా టోకెన్ యజమాని కాకపోతే వెనక్కి (revert) తీసుకుంటుంది
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * ఇచ్చిన ఆపరేటర్ ఆమోదాన్ని సెట్ చేస్తుంది లేదా అన్‌సెట్ చేస్తుంది
     * పంపినవారి తరపున వారి అన్ని టోకెన్‌లను బదిలీ చేయడానికి ఆపరేటర్ అనుమతించబడతారు
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // ఇచ్చిన యజమాని ద్వారా ఆపరేటర్ ఆమోదించబడ్డారో లేదో చెబుతుంది
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // పిజ్జా యాజమాన్యాన్ని తీసుకుంటుంది - ఆమోదించబడిన వినియోగదారులకు మాత్రమే
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // పిజ్జా ఉందో లేదో తనిఖీ చేస్తుంది
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // చిరునామా యజమానినా లేదా పిజ్జాను బదిలీ చేయడానికి ఆమోదించబడిందా అని తనిఖీ చేస్తుంది
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // దీని కారణంగా solium తనిఖీని నిలిపివేయండి
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // పిజ్జా ప్రత్యేకమైనదా మరియు ఇంకా ఉనికిలో లేదో తనిఖీ చేయండి
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // లక్ష్య చిరునామా కాంట్రాక్ట్ అవునా కాదా అని తిరిగి ఇస్తుంది
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // ప్రస్తుతం ఒక చిరునామాలో కాంట్రాక్ట్ ఉందో లేదో తనిఖీ చేయడానికి ఇంతకంటే మంచి మార్గం లేదు
        // ఆ చిరునామాలోని కోడ్ పరిమాణాన్ని తనిఖీ చేయడం కంటే.
        // https://ethereum.stackexchange.com/a/14016/36603 చూడండి
        // ఇది ఎలా పనిచేస్తుందనే దాని గురించి మరిన్ని వివరాల కోసం.
        // TODO Serenity విడుదలకు ముందు దీన్ని మళ్లీ తనిఖీ చేయండి, ఎందుకంటే అప్పుడు అన్ని చిరునామాలు
        // కాంట్రాక్ట్‌లు అవుతాయి.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## మరింత పఠనం {#further-reading}

స్మార్ట్ కాంట్రాక్ట్‌ల గురించి మరింత పూర్తి అవగాహన కోసం Solidity మరియు Vyper డాక్యుమెంటేషన్‌ను చూడండి:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## సంబంధిత అంశాలు {#related-topics}

- [స్మార్ట్ కాంట్రాక్ట్‌లు](/developers/docs/smart-contracts/)
- [ఎథీరియం వర్చువల్ మెషిన్](/developers/docs/evm/)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [కాంట్రాక్ట్ పరిమాణ పరిమితిని ఎదుర్కోవడానికి కాంట్రాక్ట్‌లను తగ్గించడం](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– మీ స్మార్ట్ కాంట్రాక్ట్ పరిమాణాన్ని తగ్గించడానికి కొన్ని ఆచరణాత్మక చిట్కాలు._
- [ఈవెంట్‌లతో స్మార్ట్ కాంట్రాక్ట్‌ల నుండి డేటాను లాగ్ చేయడం](/developers/tutorials/logging-events-smart-contracts/) _– స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లకు పరిచయం మరియు డేటాను లాగ్ చేయడానికి మీరు వాటిని ఎలా ఉపయోగించవచ్చో వివరిస్తుంది._
- [Solidity నుండి ఇతర కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడం](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి._
