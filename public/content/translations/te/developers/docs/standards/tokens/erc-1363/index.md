---
title: ERC-1363 చెల్లించదగిన టోకెన్ ప్రమాణం
description: ERC-1363 అనేది ERC-20 టోకెన్‌ల కోసం ఒక పొడిగింపు ఇంటర్‌ఫేస్, ఇది బదిలీల తర్వాత స్వీకరించే కాంట్రాక్ట్‌పై లేదా ఆమోదాల తర్వాత ఖర్చు చేసే కాంట్రాక్ట్‌పై కస్టమ్ లాజిక్‌ను అమలు చేయడానికి మద్దతు ఇస్తుంది, ఇదంతా ఒకే లావాదేవీలో జరుగుతుంది.
lang: te
---

## పరిచయం {#introduction}

### ERC-1363 అంటే ఏమిటి? {#what-is-erc1363}

ERC-1363 అనేది ERC-20 టోకెన్‌ల కోసం ఒక పొడిగింపు ఇంటర్‌ఫేస్, ఇది బదిలీల తర్వాత స్వీకరించే కాంట్రాక్ట్‌పై లేదా ఆమోదాల తర్వాత ఖర్చు చేసే కాంట్రాక్ట్‌పై కస్టమ్ లాజిక్‌ను అమలు చేయడానికి మద్దతు ఇస్తుంది, ఇదంతా ఒకే లావాదేవీలో జరుగుతుంది.

### ERC-20 నుండి తేడాలు {#erc20-differences}

సాధారణ ERC-20 ఆపరేషన్లు అయిన `transfer`, `transferFrom` మరియు `approve` వంటివి, ప్రత్యేక లావాదేవీ లేకుండా స్వీకరించే లేదా ఖర్చు చేసే కాంట్రాక్ట్‌పై కోడ్ అమలును అనుమతించవు.
వినియోగదారులు మొదటి లావాదేవీ అమలు అయ్యే వరకు వేచి ఉండి, ఆపై రెండవదాన్ని సమర్పించాల్సి ఉంటుంది కాబట్టి ఇది UI అభివృద్ధిలో సంక్లిష్టతను మరియు స్వీకరణలో ఘర్షణను పరిచయం చేస్తుంది.
వారు గ్యాస్ (GAS) కూడా రెండుసార్లు చెల్లించాలి.

ERC-1363 ఫంగిబుల్ టోకెన్‌లు చర్యలను మరింత సులభంగా నిర్వహించడానికి మరియు ఏ ఆఫ్‌చైన్ లిజనర్‌ను ఉపయోగించకుండా పనిచేయడానికి వీలు కల్పిస్తుంది.
ఇది బదిలీ లేదా ఆమోదం తర్వాత, ఒకే లావాదేవీలో రిసీవర్ లేదా స్పెండర్ కాంట్రాక్ట్‌పై కాల్‌బ్యాక్ చేయడానికి అనుమతిస్తుంది.

## ముందస్తు అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా వీటి గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము:

- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## ప్రధాన భాగం {#body}

ERC-1363 అనేది `transfer`, `transferFrom` లేదా `approve` తర్వాత స్మార్ట్ కాంట్రాక్ట్‌లతో ఇంటరాక్ట్ అవ్వడానికి ERC-20 టోకెన్‌ల కోసం ఒక ప్రామాణిక APIని పరిచయం చేస్తుంది.

ఈ ప్రమాణం టోకెన్‌లను బదిలీ చేయడానికి ప్రాథమిక కార్యాచరణను అందిస్తుంది, అలాగే టోకెన్‌లను ఆమోదించడానికి అనుమతిస్తుంది, తద్వారా వాటిని మరొక ఆన్‌చైన్ థర్డ్ పార్టీ ఖర్చు చేయవచ్చు మరియు ఆపై రిసీవర్ లేదా స్పెండర్ కాంట్రాక్ట్‌పై కాల్‌బ్యాక్ చేయవచ్చు.

ERC-20 కాల్‌బ్యాక్‌లను అంగీకరించగల స్మార్ట్ కాంట్రాక్ట్‌ల యొక్క అనేక ప్రతిపాదిత ఉపయోగాలు ఉన్నాయి.

ఉదాహరణలు ఇవి కావచ్చు:

- **క్రౌడ్‌సేల్స్**: పంపిన టోకెన్‌లు తక్షణ ప్రతిఫలం కేటాయింపును ప్రేరేపిస్తాయి.
- **సేవలు**: చెల్లింపు ఒకే దశలో సేవా ప్రాప్యతను సక్రియం చేస్తుంది.
- **ఇన్‌వాయిస్‌లు**: టోకెన్‌లు ఇన్‌వాయిస్‌లను స్వయంచాలకంగా పరిష్కరిస్తాయి.
- **సబ్‌స్క్రిప్షన్‌లు**: వార్షిక రేటును ఆమోదించడం మొదటి నెల చెల్లింపులోనే సబ్‌స్క్రిప్షన్‌ను సక్రియం చేస్తుంది.

ఈ కారణాల వల్ల దీనికి మొదట **"చెల్లించదగిన టోకెన్" (Payable Token)** అని పేరు పెట్టారు.

కాల్‌బ్యాక్ ప్రవర్తన దాని ప్రయోజనాన్ని మరింత విస్తరిస్తుంది, ఇలాంటి అతుకులు లేని పరస్పర చర్యలను అనుమతిస్తుంది:

- **స్టేకింగ్**: బదిలీ చేయబడిన టోకెన్‌లు స్టేకింగ్ కాంట్రాక్ట్‌లో స్వయంచాలక లాకింగ్‌ను ప్రేరేపిస్తాయి.
- **ఓటింగ్**: స్వీకరించిన టోకెన్‌లు పరిపాలన సిస్టమ్‌లో ఓట్లను నమోదు చేస్తాయి.
- **మార్పిడి**: టోకెన్ ఆమోదాలు ఒకే దశలో మార్పిడి లాజిక్‌ను సక్రియం చేస్తాయి.

బదిలీ లేదా ఆమోదం పొందిన తర్వాత కాల్‌బ్యాక్ అమలు చేయాల్సిన అవసరం ఉన్న అన్ని సందర్భాల్లో నిర్దిష్ట ప్రయోజనాల కోసం ERC-1363 టోకెన్‌లను ఉపయోగించవచ్చు.
టోకెన్‌లను నిర్వహించగల స్వీకర్త సామర్థ్యాన్ని ధృవీకరించడం ద్వారా స్మార్ట్ కాంట్రాక్ట్‌లలో టోకెన్ నష్టం లేదా టోకెన్ లాకింగ్‌ను నివారించడానికి కూడా ERC-1363 ఉపయోగపడుతుంది.

ఇతర ERC-20 పొడిగింపు ప్రతిపాదనల వలె కాకుండా, ERC-1363 ERC-20 `transfer` మరియు `transferFrom` పద్ధతులను భర్తీ చేయదు మరియు ERC-20తో బ్యాక్‌వర్డ్ అనుకూలతను కొనసాగిస్తూ అమలు చేయాల్సిన ఇంటర్‌ఫేస్ IDలను నిర్వచిస్తుంది.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) నుండి:

### పద్ధతులు {#methods}

ERC-1363 ప్రమాణాన్ని అమలు చేసే స్మార్ట్ కాంట్రాక్ట్‌లు **తప్పనిసరిగా** `ERC1363` ఇంటర్‌ఫేస్‌లోని అన్ని ఫంక్షన్‌లను, అలాగే `ERC20` మరియు `ERC165` ఇంటర్‌ఫేస్‌లను అమలు చేయాలి.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ఒకే లావాదేవీలో `transfer` లేదా `transferFrom` తర్వాత స్వీకరించే కాంట్రాక్ట్ పై కోడ్‌ను అమలు చేయడానికి లేదా `approve` తర్వాత ఖర్చు చేసే కాంట్రాక్ట్ పై కోడ్‌ను అమలు చేయడానికి మద్దతు ఇచ్చే ERC-20 టోకెన్ ల కోసం ఒక పొడిగింపు ఇంటర్‌ఫేస్.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * గమనిక: ఈ ఇంటర్‌ఫేస్ కోసం ERC-165 ఐడెంటిఫైయర్ 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev కాలర్ ఖాతా నుండి `to` కు `value` మొత్తం టోకెన్ లను తరలిస్తుంది
   * ఆపై `to` పై `ERC1363Receiver::onTransferReceived` ను కాల్ చేస్తుంది.
   * @param to టోకెన్ లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయాల్సిన టోకెన్ ల మొత్తం.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev కాలర్ ఖాతా నుండి `to` కు `value` మొత్తం టోకెన్ లను తరలిస్తుంది
   * ఆపై `to` పై `ERC1363Receiver::onTransferReceived` ను కాల్ చేస్తుంది.
   * @param to టోకెన్ లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయాల్సిన టోకెన్ ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `to` కు కాల్‌లో పంపబడుతుంది.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev అలవెన్స్ యంత్రాంగాన్ని ఉపయోగించి `from` నుండి `to` కు `value` మొత్తం టోకెన్ లను తరలిస్తుంది
   * ఆపై `to` పై `ERC1363Receiver::onTransferReceived` ను కాల్ చేస్తుంది.
   * @param from టోకెన్ లను పంపాల్సిన చిరునామా.
   * @param to టోకెన్ లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయాల్సిన టోకెన్ ల మొత్తం.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev అలవెన్స్ యంత్రాంగాన్ని ఉపయోగించి `from` నుండి `to` కు `value` మొత్తం టోకెన్ లను తరలిస్తుంది
   * ఆపై `to` పై `ERC1363Receiver::onTransferReceived` ను కాల్ చేస్తుంది.
   * @param from టోకెన్ లను పంపాల్సిన చిరునామా.
   * @param to టోకెన్ లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయాల్సిన టోకెన్ ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `to` కు కాల్‌లో పంపబడుతుంది.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev కాలర్ యొక్క టోకెన్ లపై `spender` యొక్క అలవెన్స్‌గా `value` మొత్తం టోకెన్ లను సెట్ చేస్తుంది
   * ఆపై `spender` పై `ERC1363Spender::onApprovalReceived` ను కాల్ చేస్తుంది.
   * @param spender నిధులను ఖర్చు చేసే చిరునామా.
   * @param value ఖర్చు చేయాల్సిన టోకెన్ ల మొత్తం.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev కాలర్ యొక్క టోకెన్ లపై `spender` యొక్క అలవెన్స్‌గా `value` మొత్తం టోకెన్ లను సెట్ చేస్తుంది
   * ఆపై `spender` పై `ERC1363Spender::onApprovalReceived` ను కాల్ చేస్తుంది.
   * @param spender నిధులను ఖర్చు చేసే చిరునామా.
   * @param value ఖర్చు చేయాల్సిన టోకెన్ ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `spender` కు కాల్‌లో పంపబడుతుంది.
   * @return త్రో చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

`transferAndCall` లేదా `transferFromAndCall` ద్వారా ERC-1363 టోకెన్‌లను అంగీకరించాలనుకునే స్మార్ట్ కాంట్రాక్ట్ **తప్పనిసరిగా** `ERC1363Receiver` ఇంటర్‌ఫేస్‌ను అమలు చేయాలి:

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 టోకెన్ కాంట్రాక్ట్ ల నుండి `transferAndCall` లేదా `transferFromAndCall` కు మద్దతు ఇవ్వాలనుకునే ఏదైనా కాంట్రాక్ట్ కోసం ఇంటర్‌ఫేస్.
 */
interface ERC1363Receiver {
  /**
   * @dev `from` నుండి `operator` ద్వారా `ERC1363::transferAndCall` లేదా `ERC1363::transferFromAndCall` ద్వారా ఈ కాంట్రాక్ట్ కు ERC-1363 టోకెన్ లు బదిలీ చేయబడినప్పుడల్లా, ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.
   *
   * గమనిక: బదిలీని అంగీకరించడానికి, ఇది తప్పనిసరిగా
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (అంటే 0x88a7ca5c, లేదా దాని స్వంత ఫంక్షన్ సెలెక్టర్) ను తిరిగి ఇవ్వాలి.
   *
   * @param operator `transferAndCall` లేదా `transferFromAndCall` ఫంక్షన్‌ను కాల్ చేసిన చిరునామా.
   * @param from టోకెన్ లు బదిలీ చేయబడిన చిరునామా.
   * @param value బదిలీ చేయబడిన టోకెన్ ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా.
   * @return త్రో చేయకపోతే బదిలీ అనుమతించబడితే `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` ద్వారా ERC-1363 టోకెన్‌లను అంగీకరించాలనుకునే స్మార్ట్ కాంట్రాక్ట్ **తప్పనిసరిగా** `ERC1363Spender` ఇంటర్‌ఫేస్‌ను అమలు చేయాలి:

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 టోకెన్ కాంట్రాక్ట్ ల నుండి `approveAndCall` కు మద్దతు ఇవ్వాలనుకునే ఏదైనా కాంట్రాక్ట్ కోసం ఇంటర్‌ఫేస్.
 */
interface ERC1363Spender {
  /**
   * @dev ERC-1363 టోకెన్ ల `owner` తమ టోకెన్ లను ఖర్చు చేయడానికి `ERC1363::approveAndCall` ద్వారా ఈ కాంట్రాక్ట్ ను ఆమోదించినప్పుడల్లా, ఈ ఫంక్షన్ కాల్ చేయబడుతుంది.
   *
   * గమనిక: ఆమోదాన్ని అంగీకరించడానికి, ఇది తప్పనిసరిగా
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (అంటే 0x7b04a2d0, లేదా దాని స్వంత ఫంక్షన్ సెలెక్టర్) ను తిరిగి ఇవ్వాలి.
   *
   * @param owner `approveAndCall` ఫంక్షన్‌ను కాల్ చేసిన మరియు గతంలో టోకెన్ లను కలిగి ఉన్న చిరునామా.
   * @param value ఖర్చు చేయాల్సిన టోకెన్ ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా.
   * @return త్రో చేయకపోతే ఆమోదం అనుమతించబడితే `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## మరింత చదవడానికి {#further-reading}

- [ERC-1363: చెల్లించదగిన టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub రెపో](https://github.com/vittominacori/erc1363-payable-token)