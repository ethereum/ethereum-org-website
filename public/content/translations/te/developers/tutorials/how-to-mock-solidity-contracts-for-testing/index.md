---
title: టెస్టింగ్ కోసం Solidity స్మార్ట్ కాంట్రాక్ట్‌లను మాక్ చేయడం ఎలా
description: టెస్టింగ్ చేసేటప్పుడు మీరు మీ కాంట్రాక్ట్‌లను ఎందుకు మాక్ చేయాలి
author: మార్కస్ వాస్
lang: te
tags: ["Solidity", "స్మార్ట్ కాంట్రాక్ట్‌లు", "టెస్టింగ్", "మాకింగ్"]
skill: intermediate
breadcrumb: కాంట్రాక్ట్‌లను మాక్ చేయడం
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

ఆబ్జెక్ట్-ఓరియెంటెడ్ ప్రోగ్రామింగ్‌లో [మాక్ ఆబ్జెక్ట్‌లు (Mock objects)](https://wikipedia.org/wiki/Mock_object) అనేవి ఒక సాధారణ డిజైన్ ప్యాటర్న్. 'ఎగతాళి చేయడం' అనే అర్థం ఉన్న పాత ఫ్రెంచ్ పదం 'mocquer' నుండి వచ్చి, ఇది 'నిజమైన దేనినైనా అనుకరించడం'గా పరిణామం చెందింది, ప్రోగ్రామింగ్‌లో మనం వాస్తవానికి చేసేది ఇదే. మీకు కావాలంటే మాత్రమే మీ స్మార్ట్ కాంట్రాక్ట్‌లను ఎగతాళి చేయండి, కానీ వీలైనప్పుడల్లా వాటిని మాక్ చేయండి. ఇది మీ పనిని సులభతరం చేస్తుంది.

## మాక్స్‌తో కాంట్రాక్ట్‌లను యూనిట్-టెస్టింగ్ చేయడం {#unit-testing-contracts-with-mocks}

కాంట్రాక్ట్‌ను మాక్ చేయడం అంటే ప్రాథమికంగా ఆ కాంట్రాక్ట్ యొక్క రెండవ వెర్షన్‌ను సృష్టించడం, ఇది అసలు దానిలాగే ప్రవర్తిస్తుంది, కానీ డెవలపర్ సులభంగా నియంత్రించగలిగే విధంగా ఉంటుంది. మీరు తరచుగా సంక్లిష్టమైన కాంట్రాక్ట్‌లను కలిగి ఉంటారు, అక్కడ మీరు [కాంట్రాక్ట్ యొక్క చిన్న భాగాలను మాత్రమే యూనిట్-టెస్ట్](/developers/docs/smart-contracts/testing/) చేయాలనుకుంటారు. సమస్య ఏమిటంటే, ఈ చిన్న భాగాన్ని పరీక్షించడానికి చాలా నిర్దిష్టమైన కాంట్రాక్ట్ స్థితి అవసరమైతే, దాన్ని చేరుకోవడం కష్టంగా ఉంటే ఏమి చేయాలి?

కాంట్రాక్ట్‌ను అవసరమైన స్థితికి తీసుకువచ్చే సంక్లిష్టమైన టెస్ట్ సెటప్ లాజిక్‌ను మీరు ప్రతిసారీ వ్రాయవచ్చు లేదా మీరు ఒక మాక్‌ను వ్రాయవచ్చు. ఇన్‌హెరిటెన్స్‌తో కాంట్రాక్ట్‌ను మాక్ చేయడం సులభం. అసలు దాని నుండి ఇన్‌హెరిట్ అయ్యే రెండవ మాక్ కాంట్రాక్ట్‌ను సృష్టించండి. ఇప్పుడు మీరు మీ మాక్‌కి ఫంక్షన్‌లను ఓవర్‌రైడ్ చేయవచ్చు. దీన్ని ఒక ఉదాహరణతో చూద్దాం.

## ఉదాహరణ: ప్రైవేట్ ERC-20 {#example-private-erc20}

ప్రారంభ ప్రైవేట్ సమయాన్ని కలిగి ఉన్న ఒక ఉదాహరణ ERC-20 కాంట్రాక్ట్‌ను మనం ఉపయోగిస్తాము. యజమాని ప్రైవేట్ వినియోగదారులను నిర్వహించగలరు మరియు ప్రారంభంలో వారు మాత్రమే టోకెన్‌లను స్వీకరించడానికి అనుమతించబడతారు. కొంత సమయం గడిచిన తర్వాత, ప్రతి ఒక్కరూ టోకెన్‌లను ఉపయోగించడానికి అనుమతించబడతారు. మీకు ఆసక్తి ఉంటే, మేము కొత్త ఓపెన్‌జెప్పెలిన్ కాంట్రాక్ట్‌లు v3 నుండి [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) హుక్‌ని ఉపయోగిస్తున్నాము.

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

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

మరియు ఇప్పుడు దాన్ని మాక్ చేద్దాం.

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

మీరు కింది ఎర్రర్ సందేశాలలో ఒకదాన్ని పొందుతారు:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

మనం కొత్త 0.6 Solidity వెర్షన్‌ని ఉపయోగిస్తున్నందున, ఓవర్‌రైడ్ చేయగల ఫంక్షన్‌ల కోసం `virtual` కీవర్డ్‌ని మరియు ఓవర్‌రైడింగ్ ఫంక్షన్ కోసం override ని జోడించాలి. కాబట్టి వాటిని రెండు `isPublic` ఫంక్షన్‌లకు జోడిద్దాం.

ఇప్పుడు మీ యూనిట్ టెస్ట్‌లలో, మీరు దానికి బదులుగా `PrivateERC20Mock` ని ఉపయోగించవచ్చు. మీరు ప్రైవేట్ వినియోగ సమయంలో ప్రవర్తనను పరీక్షించాలనుకున్నప్పుడు, `setIsPublic(false)` ని ఉపయోగించండి మరియు పబ్లిక్ వినియోగ సమయాన్ని పరీక్షించడానికి అదేవిధంగా `setIsPublic(true)` ని ఉపయోగించండి. వాస్తవానికి మన ఉదాహరణలో, సమయాలను తదనుగుణంగా మార్చడానికి మనం [టైమ్ హెల్పర్‌లను (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) కూడా ఉపయోగించవచ్చు. కానీ మాకింగ్ యొక్క ఆలోచన ఇప్పుడు స్పష్టంగా ఉండాలి మరియు సమయాన్ని ముందుకు తీసుకెళ్లినంత సులభం కాని సందర్భాలను మీరు ఊహించవచ్చు.

## అనేక కాంట్రాక్ట్‌లను మాక్ చేయడం {#mocking-many-contracts}

మీరు ప్రతి ఒక్క మాక్ కోసం మరొక కాంట్రాక్ట్‌ను సృష్టించవలసి వస్తే అది గందరగోళంగా మారుతుంది. ఇది మీకు ఇబ్బందిగా అనిపిస్తే, మీరు [MockContract](https://github.com/gnosis/mock-contract) లైబ్రరీని పరిశీలించవచ్చు. ఇది కాంట్రాక్ట్‌ల ప్రవర్తనలను అప్పటికప్పుడే (on-the-fly) ఓవర్‌రైడ్ చేయడానికి మరియు మార్చడానికి మిమ్మల్ని అనుమతిస్తుంది. అయితే, ఇది మరొక కాంట్రాక్ట్‌కి కాల్‌లను మాక్ చేయడానికి మాత్రమే పని చేస్తుంది, కాబట్టి ఇది మన ఉదాహరణకు పని చేయదు.

## మాకింగ్ మరింత శక్తివంతమైనదిగా ఉంటుంది {#mocking-can-be-even-more-powerful}

మాకింగ్ యొక్క శక్తులు అక్కడితో ముగియవు.

- ఫంక్షన్‌లను జోడించడం: నిర్దిష్ట ఫంక్షన్‌ను ఓవర్‌రైడ్ చేయడం మాత్రమే కాదు, అదనపు ఫంక్షన్‌లను జోడించడం కూడా ఉపయోగకరంగా ఉంటుంది. టోకెన్‌ల కోసం ఒక మంచి ఉదాహరణ ఏమిటంటే, ఏ వినియోగదారుకైనా ఉచితంగా కొత్త టోకెన్‌లను పొందేందుకు అనుమతించే అదనపు `mint` ఫంక్షన్‌ను కలిగి ఉండటం.
- టెస్ట్‌నెట్‌లలో వినియోగం: మీరు మీ వికేంద్రీకృత అప్లికేషన్ (dapp) తో పాటు టెస్ట్‌నెట్‌లలో మీ కాంట్రాక్ట్‌లను డిప్లాయ్ చేసి పరీక్షించినప్పుడు, మాక్ చేయబడిన వెర్షన్‌ను ఉపయోగించడాన్ని పరిగణించండి. మీకు నిజంగా అవసరమైతే తప్ప ఫంక్షన్‌లను ఓవర్‌రైడ్ చేయడాన్ని నివారించండి. మీరు అసలు లాజిక్‌ను పరీక్షించాలనుకుంటున్నారు కదా. కానీ ఉదాహరణకు రీసెట్ ఫంక్షన్‌ను జోడించడం ఉపయోగకరంగా ఉంటుంది, ఇది కాంట్రాక్ట్ స్థితిని ప్రారంభానికి రీసెట్ చేస్తుంది, కొత్త డిప్లాయ్‌మెంట్ అవసరం లేదు. స్పష్టంగా మీరు మెయిన్‌నెట్ కాంట్రాక్ట్‌లో దానిని కలిగి ఉండాలని కోరుకోరు.