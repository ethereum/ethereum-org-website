---
title: స్మార్ట్ కాంట్రాక్టుల నిర్మాణం
description: స్మార్ట్ కాంట్రాక్ట్ నిర్మాణంపై లోతైన పరిశీలన - విధులు, డేటా మరియు వేరియబుల్స్.
lang: te
---

స్మార్ట్ కాంట్రాక్ట్ అనేది ఇతీరియములోని ఒక చిరునామాలో నడిచే ఒక ప్రోగ్రామ్. అవి లావాదేవీని స్వీకరించిన తర్వాత అమలు చేయగల డేటా మరియు ఫంక్షన్లతో రూపొందించబడ్డాయి. స్మార్ట్ కాంట్రాక్ట్‌ను రూపొందించే దాని యొక్క అవలోకనం ఇక్కడ ఉంది.

## అవసరాలు {#prerequisites}

ముందుగా మీరు [స్మార్ట్ కాంట్రాక్టుల](/developers/docs/smart-contracts/) గురించి చదివారని నిర్ధారించుకోండి. ఈ డాక్యుమెంట్ మీరు ఇప్పటికే జావాస్క్రిప్ట్ లేదా పైథాన్ వంటి ప్రోగ్రామింగ్ భాషలతో సుపరిచితులని భావిస్తుంది.

## డేటా {#data}

ఏదైనా కాంట్రాక్ట్ డేటాను ఒక ప్రదేశానికి కేటాయించాలి: `storage` లేదా `memory`. స్మార్ట్ కాంట్రాక్ట్‌లో స్టోరేజీని సవరించడం ఖర్చుతో కూడుకున్నది, కనుక మీ డేటా ఎక్కడ ఉండాలో మీరు పరిగణించాలి.

### నిల్వ {#storage}

శాశ్వత డేటాను స్టోరేజ్ అని పిలుస్తారు మరియు ఇది స్టేట్ వేరియబుల్స్ ద్వారా సూచించబడుతుంది. ఈ విలువలు బ్లాక్ చైనులో శాశ్వతంగా నిల్వ చేయబడతాయి. మీరు రకాన్ని ప్రకటించాలి, తద్వారా కాంట్రాక్ట్ కంపైల్ అయినప్పుడు బ్లాక్‌చైన్‌లో ఎంత స్టోరేజ్ అవసరమో ట్రాక్ చేయగలదు.

```solidity
// సొలిడిటీ ఉదాహరణ
contract SimpleStorage {
    uint storedData; // స్టేట్ వేరియబుల్
    // ...
}
```

```python
# వైపర్ ఉదాహరణ
storedData: int128
```

మీరు ఇప్పటికే ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషలను ప్రోగ్రామ్ చేసి ఉంటే, మీరు చాలా రకాలతో సుపరిచితులుగా ఉండే అవకాశం ఉంది. అయితే, మీరు Ethereum డెవలప్‌మెంట్‌కు కొత్త అయితే `address` మీకు కొత్తగా ఉండాలి.

ఒక `address` రకం 20 బైట్లు లేదా 160 బిట్‌లకు సమానమైన Ethereum చిరునామాను కలిగి ఉంటుంది. ఇది ప్రముఖ 0xతో హెక్సాడెసిమల్ సంజ్ఞామానంలో తిరిగి వస్తుంది.

ఇతర రకాలు:

- బూలియన్
- పూర్ణాంకం
- ఫిక్స్డ్ పాయింట్ సంఖ్యలు
- ఫిక్స్డ్-సైజ్ బైట్ అర్రేలు
- డైనమిక్‌గా పరిమాణంలో ఉండే బైట్ శ్రేణులు
- రేషనల్ మరియు పూర్ణాంక లిటరల్స్
- స్ట్రింగ్ లిటరల్స్
- హెక్సాడెసిమల్ లిటరల్స్
- ఎన్యుమ్స్

మరింత వివరణ కోసం, డాక్స్ చూడండి:

- [వైపర్ రకాలను చూడండి](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [సొలిడిటీ రకాలను చూడండి](https://docs.soliditylang.org/en/latest/types.html#value-types)

### మెమరీ {#memory}

కాంట్రాక్ట్ ఫంక్షన్ ఎగ్జిక్యూషన్ యొక్క జీవితకాలం కోసం మాత్రమే నిల్వ చేయబడిన విలువలను మెమరీ వేరియబుల్స్ అంటారు. ఇవి బ్లాక్‌చైన్‌లో శాశ్వతంగా నిల్వ చేయబడవు కాబట్టి, వాటిని ఉపయోగించడం చాలా చౌక.

[సొలిడిటీ డాక్స్‌](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)లో EVM డేటాను (స్టోరేజ్, మెమరీ మరియు స్టాక్) ఎలా నిల్వ చేస్తుందో మరింత తెలుసుకోండి.

### ఎన్విరాన్‌మెంట్ వేరియబుల్స్ {#environment-variables}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించిన వేరియబుల్స్‌తో పాటు, కొన్ని ప్రత్యేక గ్లోబల్ వేరియబుల్స్ ఉన్నాయి. అవి ప్రధానంగా బ్లాక్‌చైన్ లేదా ప్రస్తుత లావాదేవీ గురించి సమాచారాన్ని అందించడానికి ఉపయోగించబడతాయి.

ఉదాహరణలు:

| **ప్రాప్**        | **స్టేట్ వేరియబుల్** | **వివరణ**                                           |
| ----------------- | -------------------- | --------------------------------------------------- |
| `block.timestamp` | uint256              | ప్రస్తుత బ్లాక్ ఎపోక్ టైమ్‌స్టాంప్                  |
| `msg.sender`      | చిరునామా             | సందేశం పంపినవారు (ప్రస్తుత కాల్) |

## ఫంక్షన్స్ {#functions}

చాలా సరళమైన పరంగా చెప్పాలంటే, ఇన్‌కమింగ్ లావాదేవీలకు ప్రతిస్పందనగా ఫంక్షన్‌లు సమాచారాన్ని పొందగలవు లేదా సమాచారాన్ని సెట్ చేయగలవు.

ఫంక్షన్ కాల్స్‌లో రెండు రకాలు ఉన్నాయి:

- `internal` – ఇవి EVM కాల్‌ను సృష్టించవు
  - అంతర్గత ఫంక్షన్‌లు మరియు స్టేట్ వేరియబుల్స్ అంతర్గతంగా మాత్రమే యాక్సెస్ చేయబడతాయి (అంటే, ప్రస్తుత కాంట్రాక్ట్ లేదా దాని నుండి పొందిన కాంట్రాక్ట్‌ల నుండి)
- `external` – ఇవి EVM కాల్‌ను సృష్టిస్తాయి
  - బాహ్య ఫంక్షన్‌లు కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లో భాగంగా ఉంటాయి, అంటే వాటిని ఇతర కాంట్రాక్ట్‌ల నుండి మరియు లావాదేవీల ద్వారా కాల్ చేయవచ్చు. ఒక బాహ్య ఫంక్షన్ `f`ని అంతర్గతంగా కాల్ చేయలేము (అంటే, `f()` పని చేయదు, కానీ `this.f()` పని చేస్తుంది).

అవి `public` లేదా `private` కూడా కావచ్చు

- `public` ఫంక్షన్‌లను కాంట్రాక్ట్ లోపల అంతర్గతంగా లేదా సందేశాల ద్వారా బాహ్యంగా కాల్ చేయవచ్చు
- `private` ఫంక్షన్‌లు అవి నిర్వచించబడిన కాంట్రాక్ట్‌కు మాత్రమే కనిపిస్తాయి మరియు ఉత్పన్నమైన కాంట్రాక్ట్‌లలో కనిపించవు

ఫంక్షన్‌లు మరియు స్టేట్ వేరియబుల్స్ రెండింటినీ పబ్లిక్ లేదా ప్రైవేట్‌గా చేయవచ్చు

ఒక కాంట్రాక్ట్‌లోని స్టేట్ వేరియబుల్‌ను అప్‌డేట్ చేయడానికి ఇక్కడ ఒక ఫంక్షన్ ఉంది:

```solidity
// సొలిడిటీ ఉదాహరణ
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` రకం యొక్క `value` పరామితి ఫంక్షన్‌లోకి పంపబడుతుంది: `update_name`
- ఇది `public`గా ప్రకటించబడింది, అంటే ఎవరైనా దీన్ని యాక్సెస్ చేయవచ్చు
- ఇది `view`గా ప్రకటించబడలేదు, కాబట్టి ఇది కాంట్రాక్ట్ స్టేట్‌ను సవరించగలదు

### వ్యూ ఫంక్షన్‌లు {#view-functions}

ఈ ఫంక్షన్‌లు కాంట్రాక్ట్ డేటా యొక్క స్థితిని సవరించబోమని వాగ్దానం చేస్తాయి. సాధారణ ఉదాహరణలు "గెట్టర్" ఫంక్షన్‌లు – ఉదాహరణకు, వినియోగదారుడి బ్యాలెన్స్‌ను స్వీకరించడానికి మీరు దీన్ని ఉపయోగించవచ్చు.

```solidity
// సొలిడిటీ ఉదాహరణ
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

స్థితిని సవరించడంగా ఏమి పరిగణించబడుతుంది:

1. స్టేట్ వేరియబుల్స్‌కి రాయడం.
2. [ఈవెంట్‌లను విడుదల చేయడం](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [ఇతర కాంట్రాక్ట్‌లను సృష్టించడం](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` ఉపయోగించడం.
5. కాల్స్ ద్వారా ఈథర్‌ను పంపడం.
6. `view` లేదా `pure` అని మార్క్ చేయని ఏ ఫంక్షన్‌ను అయినా కాల్ చేయడం.
7. తక్కువ-స్థాయి కాల్స్‌ను ఉపయోగించడం.
8. కొన్ని ఆప్‌కోడ్‌లను కలిగి ఉన్న ఇన్‌లైన్ అసెంబ్లీని ఉపయోగించడం.

### కన్స్ట్రక్టర్ ఫంక్షన్‌లు {#constructor-functions}

`constructor` ఫంక్షన్‌లు కాంట్రాక్ట్‌ను మొదటిసారి డిప్లాయ్ చేసినప్పుడు ఒకసారి మాత్రమే అమలు చేయబడతాయి. అనేక క్లాస్-ఆధారిత ప్రోగ్రామింగ్ భాషలలో `constructor` లాగా, ఈ ఫంక్షన్‌లు తరచుగా స్టేట్ వేరియబుల్స్‌ను వాటి పేర్కొన్న విలువలకు ప్రారంభిస్తాయి.

```solidity
// సొలిడిటీ ఉదాహరణ
// కాంట్రాక్ట్ యొక్క డేటాను ప్రారంభిస్తుంది, `owner`ను సెట్ చేస్తుంది
// కాంట్రాక్ట్ సృష్టికర్త యొక్క చిరునామాకు.
constructor() public {
    // అన్ని స్మార్ట్ కాంట్రాక్ట్‌లు దాని ఫంక్షన్‌లను ప్రేరేపించడానికి బాహ్య లావాదేవీలపై ఆధారపడతాయి.
    // `msg` అనేది ఇచ్చిన లావాదేవీపై సంబంధిత డేటాను కలిగి ఉన్న గ్లోబల్ వేరియబుల్,
    // పంపినవారి చిరునామా మరియు లావాదేవీలో చేర్చబడిన ETH విలువ వంటివి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# వైపర్ ఉదాహరణ

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### అంతర్నిర్మిత ఫంక్షన్‌లు {#built-in-functions}

మీ కాంట్రాక్ట్‌లో మీరు నిర్వచించిన వేరియబుల్స్ మరియు ఫంక్షన్‌లతో పాటు, కొన్ని ప్రత్యేక అంతర్నిర్మిత ఫంక్షన్‌లు ఉన్నాయి. అత్యంత స్పష్టమైన ఉదాహరణ:

- `address.send()` – సొలిడిటీ
- `send(address)` – వైపర్

ఇవి కాంట్రాక్ట్‌లను ఇతర ఖాతాలకు ETH పంపడానికి అనుమతిస్తాయి.

## ఫంక్షన్‌లను రాయడం {#writing-functions}

మీ ఫంక్షన్‌కు అవసరం:

- పరామితి వేరియబుల్ మరియు రకం (ఇది పరామితులను అంగీకరిస్తే)
- అంతర్గత/బాహ్య యొక్క ప్రకటన
- `pure`/`view`/`payable` యొక్క ప్రకటన
- రిటర్న్స్ రకం (ఇది ఒక విలువను తిరిగి ఇస్తే)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // స్టేట్ వేరియబుల్

    // కాంట్రాక్ట్ డిప్లాయ్ చేయబడినప్పుడు కాల్ చేయబడుతుంది మరియు విలువను ప్రారంభిస్తుంది
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // గెట్ ఫంక్షన్
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // సెట్ ఫంక్షన్
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

ఒక పూర్తి కాంట్రాక్ట్ ఇలా ఉండవచ్చు. ఇక్కడ `constructor` ఫంక్షన్ `dapp_name` వేరియబుల్ కోసం ప్రారంభ విలువను అందిస్తుంది.

## ఈవెంట్‌లు మరియు లాగ్‌లు {#events-and-logs}

ఈవెంట్‌లు మీ స్మార్ట్ కాంట్రాక్ట్ మీ ఫ్రంటెండ్ లేదా ఇతర సబ్‌స్క్రైబ్ చేసే అప్లికేషన్‌లతో కమ్యూనికేట్ చేయడానికి వీలు కల్పిస్తాయి. ఒక లావాదేవీ ధృవీకరించబడి, బ్లాక్‌కి జోడించబడిన తర్వాత, స్మార్ట్ కాంట్రాక్ట్‌లు ఈవెంట్‌లను విడుదల చేయగలవు మరియు సమాచారాన్ని లాగ్ చేయగలవు, దానిని ఫ్రంటెండ్ ప్రాసెస్ చేసి, ఉపయోగించుకోగలదు.

## వివరణాత్మక ఉదాహరణలు {#annotated-examples}

ఇవి Solidity లో వ్రాసిన కొన్ని ఉదాహరణలు. మీరు కోడ్‌తో ఆడాలనుకుంటే, మీరు [Remix](http://remix.ethereum.org)లో వాటితో ఇంటరాక్ట్ అవ్వవచ్చు.

### హలో వరల్డ్ {#hello-world}

```solidity
// సిమాంటిక్ వెర్షనింగ్ ఉపయోగించి Solidity యొక్క వెర్షన్‌ను నిర్దేశిస్తుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` అనే కాంట్రాక్ట్‌ను నిర్వచిస్తుంది.
// కాంట్రాక్ట్ అనేది ఫంక్షన్‌లు మరియు డేటా (దాని స్టేట్) యొక్క సమాహారం.
// డిప్లాయ్ చేసిన తర్వాత, కాంట్రాక్ట్ Ethereum బ్లాక్‌చైన్‌లోని ఒక నిర్దిష్ట చిరునామాలో ఉంటుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` రకం యొక్క `message` అనే స్టేట్ వేరియబుల్‌ను ప్రకటిస్తుంది.
    // స్టేట్ వేరియబుల్స్ అనేవి కాంట్రాక్ట్ స్టోరేజ్‌లో శాశ్వతంగా నిల్వ చేయబడిన విలువలు కలిగిన వేరియబుల్స్.
    // `public` అనే కీవర్డ్ వేరియబుల్స్‌ను కాంట్రాక్ట్ బయటి నుండి యాక్సెస్ చేయడానికి వీలు కల్పిస్తుంది
    // మరియు ఇతర కాంట్రాక్ట్‌లు లేదా క్లయింట్లు విలువను యాక్సెస్ చేయడానికి కాల్ చేయగల ఫంక్షన్‌ను సృష్టిస్తుంది.
    string public message;

    // అనేక క్లాస్-ఆధారిత ఆబ్జెక్ట్-ఓరియెంటెడ్ భాషల మాదిరిగానే, కన్స్ట్రక్టర్ అనేది
    // కాంట్రాక్ట్ సృష్టిపై మాత్రమే అమలు చేయబడే ఒక ప్రత్యేక ఫంక్షన్.
    // కాంట్రాక్ట్ యొక్క డేటాను ప్రారంభించడానికి కన్స్ట్రక్టర్లు ఉపయోగించబడతాయి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // `initMessage` అనే స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరిస్తుంది మరియు విలువను సెట్ చేస్తుంది
        // కాంట్రాక్ట్ యొక్క `message` స్టోరేజ్ వేరియబుల్‌లోకి).
        message = initMessage;
    }

    // ఒక స్ట్రింగ్ ఆర్గ్యుమెంట్‌ను అంగీకరించే పబ్లిక్ ఫంక్షన్
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
    // ఒక `చిరునామా` ఇమెయిల్ చిరునామాతో పోల్చదగినది - ఇది Ethereum లో ఒక ఖాతాను గుర్తించడానికి ఉపయోగించబడుతుంది.
    // చిరునామాలు ఒక స్మార్ట్ కాంట్రాక్ట్ లేదా బాహ్య (వినియోగదారు) ఖాతాలను సూచిస్తాయి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // ఒక `మ్యాపింగ్` ముఖ్యంగా ఒక హాష్ టేబుల్ డేటా నిర్మాణం.
    // ఈ `మ్యాపింగ్` ఒక సైన్ చేయని పూర్ణాంకాన్ని (టోకెన్ బ్యాలెన్స్) ఒక చిరునామాకు (టోకెన్ హోల్డర్) కేటాయిస్తుంది.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ఈవెంట్‌లు బ్లాక్‌చైన్‌లో కార్యాచరణను లాగింగ్ చేయడానికి అనుమతిస్తాయి.
    // కాంట్రాక్ట్ స్టేట్ మార్పులకు ప్రతిస్పందించడానికి Ethereum క్లయింట్లు ఈవెంట్‌లను వినగలవు.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // కాంట్రాక్ట్ డేటాను ప్రారంభిస్తుంది, `ఓనర్` ను
    // కాంట్రాక్ట్ సృష్టికర్త యొక్క చిరునామాకు సెట్ చేస్తుంది.
    constructor() public {
        // అన్ని స్మార్ట్ కాంట్రాక్ట్‌లు దాని ఫంక్షన్‌లను ప్రేరేపించడానికి బాహ్య లావాదేవీలపై ఆధారపడతాయి.
        // `msg` అనేది ఇచ్చిన లావాదేవీపై సంబంధిత డేటాను కలిగి ఉన్న గ్లోబల్ వేరియబుల్,
        // పంపినవారి చిరునామా మరియు లావాదేవీలో చేర్చబడిన ETH విలువ వంటివి.
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // కొత్త టోకెన్ల మొత్తాన్ని సృష్టించి, వాటిని ఒక చిరునామాకు పంపుతుంది.
    function mint(address receiver, uint amount) public {
        // `require` అనేది కొన్ని షరతులను అమలు చేయడానికి ఉపయోగించే ఒక నియంత్రణ నిర్మాణం.
        // ఒక `require` స్టేట్‌మెంట్ `false`గా మూల్యాంకనం చేస్తే, ఒక మినహాయింపు ప్రేరేపించబడుతుంది,
        // ఇది ప్రస్తుత కాల్ సమయంలో స్టేట్‌లో చేసిన అన్ని మార్పులను తిరిగి మారుస్తుంది.
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // కాంట్రాక్ట్ యజమాని మాత్రమే ఈ ఫంక్షన్‌ను కాల్ చేయగలరు
        require(msg.sender == owner, "మీరు యజమాని కాదు.");

        // టోకెన్ల గరిష్ట మొత్తాన్ని అమలు చేస్తుంది
        require(amount < 1e60, "గరిష్ట జారీ మించిపోయింది");

        // `రిసీవర్` బ్యాలెన్స్‌ను `మొత్తం` ద్వారా పెంచుతుంది
        balances[receiver] += amount;
    }

    // ఏ కాలర్ నుండి అయినా ఇప్పటికే ఉన్న టోకెన్ల మొత్తాన్ని ఒక చిరునామాకు పంపుతుంది.
    function transfer(address receiver, uint amount) public {
        // పంపినవారికి పంపడానికి తగినన్ని టోకెన్లు ఉండాలి
        require(amount <= balances[msg.sender], "తగినంత బ్యాలెన్స్ లేదు.");

        // రెండు చిరునామాల టోకెన్ బ్యాలెన్స్‌లను సర్దుబాటు చేస్తుంది
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // ముందుగా నిర్వచించిన ఈవెంట్‌ను విడుదల చేస్తుంది
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### ప్రత్యేక డిజిటల్ ఆస్తి {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// ప్రస్తుత కాంట్రాక్ట్‌లోకి ఇతర ఫైళ్ల నుండి చిహ్నాలను దిగుమతి చేస్తుంది.
// ఈ సందర్భంలో, OpenZeppelin నుండి సహాయక కాంట్రాక్టుల శ్రేణి.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// బాహ్య కాంట్రాక్టుల నుండి ఫంక్షన్‌లు మరియు కీవర్డ్‌లను వారసత్వంగా పొందడానికి `is` కీవర్డ్ ఉపయోగించబడుతుంది.
// ఈ సందర్భంలో, `CryptoPizza` `IERC721` మరియు `ERC165` కాంట్రాక్టుల నుండి వారసత్వంగా పొందుతుంది.
// మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // అంకగణిత కార్యకలాపాలను సురక్షితంగా నిర్వహించడానికి OpenZeppelin యొక్క SafeMath లైబ్రరీని ఉపయోగిస్తుంది.
    // మరింత తెలుసుకోండి: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity లోని స్థిరమైన స్టేట్ వేరియబుల్స్ ఇతర భాషల మాదిరిగానే ఉంటాయి
    // కానీ మీరు కంపైల్ సమయంలో స్థిరంగా ఉండే ఒక ఎక్స్‌ప్రెషన్ నుండి కేటాయించాలి.
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // స్ట్రక్ట్ రకాలు మీ స్వంత రకాన్ని నిర్వచించడానికి మిమ్మల్ని అనుమతిస్తాయి
    // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza స్ట్రక్ట్‌ల యొక్క ఖాళీ శ్రేణిని సృష్టిస్తుంది
    Pizza[] public pizzas;

    // పిజ్జా ID నుండి దాని యజమాని చిరునామాకు మ్యాపింగ్
    mapping(uint256 => address) public pizzaToOwner;

    // యజమాని చిరునామా నుండి యాజమాన్యంలోని టోకెన్ సంఖ్యకు మ్యాపింగ్
    mapping(address => uint256) public ownerPizzaCount;

    // టోకెన్ ID నుండి ఆమోదించబడిన చిరునామాకు మ్యాపింగ్
    mapping(uint256 => address) pizzaApprovals;

    // మీరు మ్యాపింగ్‌లను నెస్ట్ చేయవచ్చు, ఈ ఉదాహరణ ఆపరేటర్ ఆమోదాలకు యజమానిని మ్యాప్ చేస్తుంది
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // స్ట్రింగ్ (పేరు) మరియు DNA నుండి యాదృచ్ఛిక పిజ్జాను సృష్టించడానికి అంతర్గత ఫంక్షన్
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` కీవర్డ్ అంటే ఈ ఫంక్షన్ కేవలం
        // ఈ కాంట్రాక్ట్ మరియు ఈ కాంట్రాక్ట్‌ను పొందే కాంట్రాక్ట్‌లలో మాత్రమే కనిపిస్తుంది
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` అనేది ఒక ఫంక్షన్ మాడిఫైయర్, ఇది పిజ్జా ఇప్పటికే ఉందో లేదో తనిఖీ చేస్తుంది
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // పిజ్జాల శ్రేణికి పిజ్జాను జోడించి, id పొందుతుంది
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // పిజ్జా యజమాని ప్రస్తుత వినియోగదారుతో సమానంగా ఉన్నారని తనిఖీ చేస్తుంది
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // గమనించండి, చిరునామా(0) అనేది సున్నా చిరునామా,
        // ఇది pizza[id] ఇంకా ఒక నిర్దిష్ట వినియోగదారుకు కేటాయించబడలేదని సూచిస్తుంది.

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

    // స్ట్రింగ్ (పేరు) మరియు యజమాని (సృష్టికర్త) చిరునామా నుండి యాదృచ్ఛిక DNAను ఉత్పత్తి చేస్తుంది
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`గా గుర్తించబడిన ఫంక్షన్‌లు స్టేట్ నుండి చదవడం లేదా సవరించడం చేయమని వాగ్దానం చేస్తాయి
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // స్ట్రింగ్ (పేరు) + చిరునామా (యజమాని) నుండి యాదృచ్ఛిక uintను ఉత్పత్తి చేస్తుంది
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // యజమాని ద్వారా కనుగొనబడిన పిజ్జాల శ్రేణిని తిరిగి ఇస్తుంది
    function getPizzasByOwner(address _owner)
        public
        // `view`గా గుర్తించబడిన ఫంక్షన్‌లు స్టేట్‌ను సవరించమని వాగ్దానం చేస్తాయి
        // మరింత తెలుసుకోండి: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // ఈ ఫంక్షన్ కాల్ యొక్క జీవితకాలం కోసం మాత్రమే విలువలను నిల్వ చేయడానికి
        // `memory` స్టోరేజ్ స్థానాన్ని ఉపయోగిస్తుంది.
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
        require(_from != address(0) && _to != address(0), "చెల్లని చిరునామా.");
        require(_exists(_pizzaId), "పిజ్జా ఉనికిలో లేదు.");
        require(_from != _to, "అదే చిరునామాకు బదిలీ చేయలేము.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "చిరునామా ఆమోదించబడలేదు.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // దిగుమతి చేసుకున్న IERC721 కాంట్రాక్ట్‌లో నిర్వచించిన ఈవెంట్‌ను విడుదల చేస్తుంది
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * ఒక టోకెన్ ID యొక్క యాజమాన్యాన్ని సురక్షితంగా మరొక చిరునామాకు బదిలీ చేస్తుంది
     * లక్ష్య చిరునామా ఒక కాంట్రాక్ట్ అయితే, అది `onERC721Received`ను అమలు చేయాలి,
     * ఇది సురక్షిత బదిలీపై పిలవబడుతుంది మరియు మేజిక్ విలువను తిరిగి ఇవ్వాలి
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * లేకపోతే, బదిలీ తిరిగి తీసుకోబడుతుంది.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * ఒక టోకెన్ ID యొక్క యాజమాన్యాన్ని సురక్షితంగా మరొక చిరునామాకు బదిలీ చేస్తుంది
     * లక్ష్య చిరునామా ఒక కాంట్రాక్ట్ అయితే, అది `onERC721Received`ను అమలు చేయాలి,
     * ఇది సురక్షిత బదిలీపై పిలవబడుతుంది మరియు మేజిక్ విలువను తిరిగి ఇవ్వాలి
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * లేకపోతే, బదిలీ తిరిగి తీసుకోబడుతుంది.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "onERC721Receivedను తప్పనిసరిగా అమలు చేయాలి.");
    }

    /**
     * లక్ష్య చిరునామాపై `onERC721Received`ను ప్రారంభించడానికి అంతర్గత ఫంక్షన్
     * లక్ష్య చిరునామా ఒక కాంట్రాక్ట్ కాకపోతే కాల్ అమలు చేయబడదు
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

    // ఒక పిజ్జాను కాల్చివేస్తుంది - టోకెన్‌ను పూర్తిగా నాశనం చేస్తుంది
    // `external` ఫంక్షన్ మాడిఫైయర్ అంటే ఈ ఫంక్షన్
    // కాంట్రాక్ట్ ఇంటర్‌ఫేస్‌లో భాగం మరియు ఇతర కాంట్రాక్ట్‌లు దీనిని కాల్ చేయవచ్చు
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "చెల్లని చిరునామా.");
        require(_exists(_pizzaId), "పిజ్జా ఉనికిలో లేదు.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "చిరునామా ఆమోదించబడలేదు.");

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
        require(owner != address(0), "చెల్లని పిజ్జా ID.");
        return owner;
    }

    // పిజ్జా యాజమాన్యాన్ని బదిలీ చేయడానికి ఇతర చిరునామాను ఆమోదిస్తుంది
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "పిజ్జా యజమాని అయి ఉండాలి.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // నిర్దిష్ట పిజ్జా కోసం ఆమోదించబడిన చిరునామాను తిరిగి ఇస్తుంది
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "పిజ్జా ఉనికిలో లేదు.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * ఇచ్చిన టోకెన్ ID యొక్క ప్రస్తుత ఆమోదాన్ని క్లియర్ చేయడానికి ప్రైవేట్ ఫంక్షన్
     * ఇచ్చిన చిరునామా నిజంగా టోకెన్ యజమాని కాకపోతే రివర్ట్ అవుతుంది
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "పిజ్జా యజమాని అయి ఉండాలి.");
        require(_exists(_pizzaId), "పిజ్జా ఉనికిలో లేదు.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * ఇచ్చిన ఆపరేటర్ యొక్క ఆమోదాన్ని సెట్ చేస్తుంది లేదా అన్సెట్ చేస్తుంది
     * ఒక ఆపరేటర్ వారి తరపున పంపినవారి అన్ని టోకెన్లను బదిలీ చేయడానికి అనుమతించబడ్డాడు
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "సొంత చిరునామాను ఆమోదించలేరు");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // ఒక ఆపరేటర్ ఇచ్చిన యజమానిచే ఆమోదించబడిందో లేదో చెబుతుంది
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // పిజ్జా యాజమాన్యాన్ని తీసుకుంటుంది - ఆమోదించబడిన వినియోగదారులకు మాత్రమే
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "చిరునామా ఆమోదించబడలేదు.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // పిజ్జా ఉందో లేదో తనిఖీ చేస్తుంది
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // చిరునామా యజమాని లేదా పిజ్జాను బదిలీ చేయడానికి ఆమోదించబడిందో లేదో తనిఖీ చేస్తుంది
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // పిజ్జా ప్రత్యేకమైనది మరియు ఇంకా ఉనికిలో లేదో తనిఖీ చేయండి
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
        require(result, "అటువంటి పేరుతో పిజ్జా ఇప్పటికే ఉంది.");
        _;
    }

    // లక్ష్య చిరునామా ఒక కాంట్రాక్ట్ కాదో తిరిగి ఇస్తుంది
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // ప్రస్తుతం ఒక చిరునామాలో కాంట్రాక్ట్ ఉందో లేదో తనిఖీ చేయడానికి ఇంతకంటే మంచి మార్గం లేదు
        // ఆ చిరునామాలోని కోడ్ పరిమాణాన్ని తనిఖీ చేయడం కంటే.
        // ఇది ఎలా పనిచేస్తుందనే దాని గురించి మరిన్ని వివరాల కోసం https://ethereum.stackexchange.com/a/14016/36603 చూడండి.
        // TODO సెరినిటీ విడుదలయ్యే ముందు దీన్ని మళ్లీ తనిఖీ చేయండి, ఎందుకంటే అప్పుడు అన్ని చిరునామాలు
        // కాంట్రాక్టులు అవుతాయి.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## మరింత సమాచారం {#further-reading}

స్మార్ట్ కాంట్రాక్టుల యొక్క మరింత పూర్తి అవలోకనం కోసం సొలిడిటీ మరియు వైపర్ యొక్క డాక్యుమెంటేషన్‌ను చూడండి:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## సంబంధిత అంశాలు {#related-topics}

- [స్మార్ట్ కాంట్రాక్టులు](/developers/docs/smart-contracts/)
- [Ethereum వర్చువల్ మెషీన్](/developers/docs/evm/)

## సంబంధిత ట్యుటోరియల్స్ {#related-tutorials}

- [కాంట్రాక్ట్ పరిమాణ పరిమితితో పోరాడటానికి కాంట్రాక్టులను తగ్గించడం](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– మీ స్మార్ట్ కాంట్రాక్ట్ పరిమాణాన్ని తగ్గించడానికి కొన్ని ఆచరణాత్మక చిట్కాలు._
- [ఈవెంట్‌లతో స్మార్ట్ కాంట్రాక్టుల నుండి డేటాను లాగింగ్ చేయడం](/developers/tutorials/logging-events-smart-contracts/) _– స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌లకు ఒక పరిచయం మరియు డేటాను లాగ్ చేయడానికి మీరు వాటిని ఎలా ఉపయోగించవచ్చు._
- [సొలిడిటీ నుండి ఇతర కాంట్రాక్టులతో ఇంటరాక్ట్ అవ్వండి](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– ఇప్పటికే ఉన్న కాంట్రాక్ట్ నుండి స్మార్ట్ కాంట్రాక్ట్‌ను ఎలా డిప్లాయ్ చేయాలి మరియు దానితో ఎలా ఇంటరాక్ట్ అవ్వాలి._
