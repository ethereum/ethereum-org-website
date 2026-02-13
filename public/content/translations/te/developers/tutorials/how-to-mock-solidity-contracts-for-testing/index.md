---
title: "పరీక్షించడం కోసం సొలిడిటీ స్మార్ట్ కాంట్రాక్ట్‌లను ఎలా మాక్ చేయాలి"
description: "పరీక్షిస్తున్నప్పుడు మీ కాంట్రాక్టులను ఎందుకు ఎగతాళి చేయాలి"
author: Markus Waas
lang: te
tags:
  [
    "దృఢత్వం",
    "స్మార్ట్ కాంట్రాక్టులు",
    "పరీక్షించడం",
    "మాకింగ్"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[మాక్ ఆబ్జెక్ట్‌లు](https://wikipedia.org/wiki/Mock_object) అనేవి ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్‌లో ఒక సాధారణ డిజైన్ ప్యాటర్న్. పాత ఫ్రెంచ్ పదం 'mocquer' నుండి 'ఎగతాళి చేయడం' అనే అర్థంతో వచ్చిన ఇది, 'నిజమైన దాన్ని అనుకరించడం'గా పరిణామం చెందింది, ఇది వాస్తవానికి మనం ప్రోగ్రామింగ్‌లో చేసే పని. దయచేసి మీకు కావాలనుకుంటేనే మీ స్మార్ట్ కాంట్రాక్ట్‌లను ఎగతాళి చేయండి, కానీ మీకు వీలైనప్పుడల్లా వాటిని మాక్ చేయండి. ఇది మీ జీవితాన్ని సులభతరం చేస్తుంది.

## మాక్స్‌తో కాంట్రాక్ట్‌లను యూనిట్-టెస్టింగ్ చేయడం {#unit-testing-contracts-with-mocks}

ఒక కాంట్రాక్ట్‌ను మాక్ చేయడం అంటే ఆ కాంట్రాక్ట్ యొక్క రెండవ వెర్షన్‌ను సృష్టించడం, ఇది అసలైన దానికి చాలా పోలి ఉంటుంది, కానీ డెవలపర్ సులభంగా నియంత్రించగల విధంగా ఉంటుంది. మీరు తరచుగా సంక్లిష్టమైన కాంట్రాక్టులతో ముగుస్తారు, అక్కడ మీరు [కాంట్రాక్టులోని చిన్న భాగాలను మాత్రమే యూనిట్-టెస్ట్ చేయాలనుకుంటారు](/developers/docs/smart-contracts/testing/). సమస్య ఏమిటంటే, ఈ చిన్న భాగాన్ని పరీక్షించడానికి ఒక నిర్దిష్ట కాంట్రాక్ట్ స్టేట్ అవసరమై, దాన్ని చేరుకోవడం కష్టమైతే ఏం చేయాలి?

కాంట్రాక్ట్‌ను అవసరమైన స్టేట్‌లోకి తీసుకువచ్చే సంక్లిష్టమైన టెస్ట్ సెటప్ లాజిక్‌ను మీరు ప్రతిసారీ వ్రాయవచ్చు లేదా మీరు ఒక మాక్‌ను వ్రాయవచ్చు. ఇన్హెరిటెన్స్‌తో ఒక కాంట్రాక్ట్‌ను మాక్ చేయడం సులభం. అసలు కాంట్రాక్ట్ నుండి ఇన్హెరిట్ అయ్యే రెండవ మాక్ కాంట్రాక్ట్‌ను సృష్టించండి. ఇప్పుడు మీరు మీ మాక్‌కు ఫంక్షన్‌లను ఓవర్‌రైడ్ చేయవచ్చు. ఒక ఉదాహరణతో చూద్దాం.

## ఉదాహరణ: ప్రైవేట్ ERC20 {#example-private-erc20}

మేము ఒక ఉదాహరణ ERC-20 కాంట్రాక్ట్‌ను ఉపయోగిస్తాము, దీనికి ప్రారంభ ప్రైవేట్ సమయం ఉంటుంది. యజమాని ప్రైవేట్ వినియోగదారులను నిర్వహించగలరు మరియు ప్రారంభంలో టోకెన్‌లను స్వీకరించడానికి వారికి మాత్రమే అనుమతి ఉంటుంది. ఒక నిర్దిష్ట సమయం గడిచిన తర్వాత, ప్రతి ఒక్కరూ టోకెన్‌లను ఉపయోగించడానికి అనుమతించబడతారు. మీకు ఆసక్తి ఉంటే, మేము కొత్త OpenZeppelin కాంట్రాక్టులు v3 నుండి [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) హుక్‌ను ఉపయోగిస్తున్నాము.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: చెల్లని గ్రహీత");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

ఇప్పుడు దానిని మాక్ చేద్దాం.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

మీకు కింది దోష సందేశాలలో ఒకటి వస్తుంది:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

మనం కొత్త 0.6 సొలిడిటీ వెర్షన్‌ను ఉపయోగిస్తున్నందున, ఓవర్‌రైడ్ చేయగల ఫంక్షన్‌ల కోసం `virtual` కీవర్డ్‌ను మరియు ఓవర్‌రైడ్ చేస్తున్న ఫంక్షన్ కోసం `override`ను జోడించాలి. కాబట్టి ఆ రెండింటినీ `isPublic` ఫంక్షన్‌లకు జోడిద్దాం.

ఇప్పుడు మీ యూనిట్ టెస్టులలో, మీరు బదులుగా `PrivateERC20Mock`ని ఉపయోగించవచ్చు. మీరు ప్రైవేట్ వినియోగ సమయంలో ప్రవర్తనను పరీక్షించాలనుకున్నప్పుడు, `setIsPublic(false)` ఉపయోగించండి మరియు అదేవిధంగా పబ్లిక్ వినియోగ సమయాన్ని పరీక్షించడానికి `setIsPublic(true)`ని ఉపయోగించండి. అయితే మన ఉదాహరణలో, సమయాలను తదనుగుణంగా మార్చడానికి మనం [టైమ్ హెల్పర్‌లను](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) కూడా ఉపయోగించవచ్చు. అయితే ఇప్పుడు మాకింగ్ యొక్క ఆలోచన స్పష్టంగా ఉండాలి మరియు సమయాన్ని కేవలం ముందుకు జరపడం అంత సులభం కాని సందర్భాలను మీరు ఊహించగలరు.

## అనేక కాంట్రాక్టులను మాక్ చేయడం {#mocking-many-contracts}

ప్రతి ఒక్క మాక్ కోసం మీరు మరొక కాంట్రాక్ట్‌ను సృష్టించవలసి వస్తే అది గందరగోళంగా మారవచ్చు. ఇది మీకు ఇబ్బందిగా అనిపిస్తే, మీరు [మాక్‌కాంట్రాక్ట్](https://github.com/gnosis/mock-contract) లైబ్రరీని చూడవచ్చు. ఇది కాంట్రాక్ట్‌ల ప్రవర్తనలను అప్పటికప్పుడు ఓవర్‌రైడ్ చేయడానికి మరియు మార్చడానికి మిమ్మల్ని అనుమతిస్తుంది. అయితే, ఇది మరొక కాంట్రాక్ట్‌కు కాల్స్‌ను మాక్ చేయడానికి మాత్రమే పనిచేస్తుంది, కాబట్టి ఇది మన ఉదాహరణకు పనిచేయదు.

## మాకింగ్ మరింత శక్తివంతంగా ఉంటుంది {#mocking-can-be-even-more-powerful}

మాకింగ్ యొక్క శక్తులు అంతటితో ముగియవు.

- ఫంక్షన్‌లను జోడించడం: ఒక నిర్దిష్ట ఫంక్షన్‌ను ఓవర్‌రైడ్ చేయడం మాత్రమే కాదు, అదనపు ఫంక్షన్‌లను జోడించడం కూడా ఉపయోగకరంగా ఉంటుంది. టోకెన్‌లకు ఒక మంచి ఉదాహరణ, అదనంగా ఒక `mint` ఫంక్షన్‌ను కలిగి ఉండటం. ఇది ఏ వినియోగదారుడైనా ఉచితంగా కొత్త టోకెన్‌లను పొందడానికి అనుమతిస్తుంది.
- టెస్టునెట్‌లలో వాడకం: మీరు మీ డాప్‌తో పాటు టెస్టునెట్‌లలో మీ కాంట్రాక్టులను డిప్లాయ్ చేసి, పరీక్షించేటప్పుడు, మాక్ చేసిన వెర్షన్‌ను ఉపయోగించడాన్ని పరిగణించండి. మీకు నిజంగా అవసరమైతే తప్ప ఫంక్షన్‌లను ఓవర్‌రైడ్ చేయడం మానుకోండి. అంతిమంగా, మీరు నిజమైన లాజిక్‌ను పరీక్షించాలనుకుంటున్నారు. కానీ ఉదాహరణకు, ఒక రీసెట్ ఫంక్షన్‌ను జోడించడం ఉపయోగకరంగా ఉంటుంది, ఇది కాంట్రాక్ట్ స్టేట్‌ను ప్రారంభానికి రీసెట్ చేస్తుంది, కొత్త డిప్లాయ్‌మెంట్ అవసరం లేదు. సహజంగానే మీరు ఒక Mainnet కాంట్రాక్ట్‌లో దానిని కలిగి ఉండాలని కోరుకోరు.
