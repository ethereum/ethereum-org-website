---
title: ERC-1363 చెల్లించదగిన టోకెన్ ప్రమాణం
description: ERC-1363 అనేది ERC-20 టోకెన్‌ల కోసం ఒక విస్తరణ ఇంటర్‌ఫేస్, ఇది బదిలీల తర్వాత గ్రహీత ఒప్పందంపై లేదా ఆమోదాల తర్వాత ఖర్చు చేసే ఒప్పందంపై కస్టమ్ లాజిక్‌ను అమలు చేయడానికి మద్దతు ఇస్తుంది, అన్నీ ఒకే లావాదేవీలోనే.
lang: te
---

## పరిచయం {#introduction}

### ERC-1363 అంటే ఏమిటి? {#what-is-erc1363}

ERC-1363 అనేది ERC-20 టోకెన్‌ల కోసం ఒక విస్తరణ ఇంటర్‌ఫేస్, ఇది బదిలీల తర్వాత గ్రహీత ఒప్పందంపై లేదా ఆమోదాల తర్వాత ఖర్చు చేసే ఒప్పందంపై కస్టమ్ లాజిక్‌ను అమలు చేయడానికి మద్దతు ఇస్తుంది, అన్నీ ఒకే లావాదేవీలోనే.

### ERC-20 నుండి తేడాలు {#erc20-differences}

`transfer`, `transferFrom` మరియు `approve` వంటి ప్రామాణిక ERC-20 కార్యకలాపాలు, ప్రత్యేక లావాదేవీ లేకుండా గ్రహీత లేదా ఖర్చు చేసే ఒప్పందంపై కోడ్ అమలును అనుమతించవు.
ఇది UI అభివృద్ధిలో సంక్లిష్టతను మరియు స్వీకరణలో ఘర్షణను పరిచయం చేస్తుంది ఎందుకంటే వినియోగదారులు మొదటి లావాదేవీ అమలు అయ్యే వరకు వేచి ఉండి, ఆపై రెండవదాన్ని సమర్పించాలి.
వారు రెండుసార్లు GAS కూడా చెల్లించాలి.

ERC-1363 ఫంగిబుల్ టోకెన్‌లు చర్యలను మరింత సులభంగా నిర్వహించగల సామర్థ్యాన్ని కలిగి ఉండేలా చేస్తుంది మరియు ఏ ఆఫ్-చైన్ లిజనర్‌ను ఉపయోగించకుండా పనిచేస్తుంది.
ఇది ఒకే లావాదేవీలో, బదిలీ లేదా ఆమోదం తర్వాత, రిసీవర్ లేదా స్పెండర్ ఒప్పందంపై క్యాల్‌బ్యాక్ చేయడానికి అనుమతిస్తుంది.

## అవసరాలు {#prerequisites}

ఈ పేజీని బాగా అర్థం చేసుకోవడానికి, మీరు ముందుగా వీటి గురించి చదవాలని మేము సిఫార్సు చేస్తున్నాము:

- [టోకెన్ ప్రమాణాలు](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## బాడీ {#body}

ERC-1363, `transfer`, `transferFrom` లేదా `approve` తర్వాత స్మార్ట్ కాంట్రాక్ట్‌లతో పరస్పర చర్య చేయడానికి ERC-20 టోకెన్‌ల కోసం ఒక ప్రామాణిక APIని పరిచయం చేస్తుంది.

ఈ ప్రమాణం టోకెన్‌లను బదిలీ చేయడానికి ప్రాథమిక కార్యాచరణను అందిస్తుంది, అలాగే టోకెన్‌లను ఆమోదించడానికి అనుమతిస్తుంది, తద్వారా వాటిని మరొక ఆన్-చైన్ మూడవ పక్షం ఖర్చు చేయవచ్చు, ఆపై రిసీవర్ లేదా స్పెండర్ ఒప్పందంపై క్యాల్‌బ్యాక్ చేయవచ్చు.

ERC-20 క్యాల్‌బ్యాక్‌లను అంగీకరించగల స్మార్ట్ కాంట్రాక్ట్‌ల యొక్క అనేక ప్రతిపాదిత ఉపయోగాలు ఉన్నాయి.

ఉదాహరణలు కావచ్చు:

- **క్రౌడ్‌సేల్స్**: పంపిన టోకెన్‌లు తక్షణ రివార్డ్ కేటాయింపును ప్రేరేపిస్తాయి.
- **సేవలు**: చెల్లింపు ఒకే దశలో సేవా యాక్సెస్‌ను సక్రియం చేస్తుంది.
- **ఇన్‌వాయిస్‌లు**: టోకెన్‌లు ఇన్‌వాయిస్‌లను స్వయంచాలకంగా పరిష్కరిస్తాయి.
- **చందాలు**: వార్షిక రేటును ఆమోదించడం మొదటి నెల చెల్లింపులోనే చందాను సక్రియం చేస్తుంది.

ఈ కారణాల వల్ల దీనికి మొదట **"చెల్లించదగిన టోకెన్"** అని పేరు పెట్టారు.

క్యాల్‌బ్యాక్ ప్రవర్తన దాని ప్రయోజనాన్ని మరింత విస్తరిస్తుంది, ఇలాంటి అతుకులు లేని పరస్పర చర్యలను ప్రారంభిస్తుంది:

- **స్టేకింగ్**: బదిలీ చేయబడిన టోకెన్‌లు స్టేకింగ్ ఒప్పందంలో ఆటోమేటిక్ లాకింగ్‌ను ప్రేరేపిస్తాయి.
- **ఓటింగ్**: స్వీకరించిన టోకెన్‌లు పరిపాలన వ్యవస్థలో ఓట్లను నమోదు చేస్తాయి.
- **స్వాపింగ్**: టోకెన్ ఆమోదాలు ఒకే దశలో స్వాప్ లాజిక్‌ను సక్రియం చేస్తాయి.

బదిలీ లేదా ఆమోదం స్వీకరించిన తర్వాత క్యాల్‌బ్యాక్ అమలు చేయాల్సిన అన్ని సందర్భాల్లో నిర్దిష్ట ప్రయోజనాల కోసం ERC-1363 టోకెన్‌లను ఉపయోగించవచ్చు.
గ్రహీత టోకెన్‌లను నిర్వహించగల సామర్థ్యాన్ని ధృవీకరించడం ద్వారా స్మార్ట్ కాంట్రాక్ట్‌లలో టోకెన్ నష్టం లేదా టోకెన్ లాకింగ్‌ను నివారించడానికి కూడా ERC-1363 ఉపయోగపడుతుంది.

ఇతర ERC-20 పొడిగింపు ప్రతిపాదనల మాదిరిగా కాకుండా, ERC-1363 ERC-20 `transfer` మరియు `transferFrom` పద్ధతులను భర్తీ చేయదు మరియు ERC-20తో వెనుకబడిన అనుకూలతను కొనసాగిస్తూ అమలు చేయాల్సిన ఇంటర్‌ఫేస్ IDలను నిర్వచిస్తుంది.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) నుండి:

### పద్ధతులు {#methods}

ERC-1363 ప్రమాణాన్ని అమలు చేసే స్మార్ట్ కాంట్రాక్టులు `ERC1363` ఇంటర్‌ఫేస్‌లోని అన్ని ఫంక్షన్‌లను, అలాగే `ERC20` మరియు `ERC165` ఇంటర్‌ఫేస్‌లను **తప్పక** అమలు చేయాలి.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 టోకెన్‌ల కోసం ఒక విస్తరణ ఇంటర్‌ఫేస్, ఇది `transfer` లేదా `transferFrom` తర్వాత గ్రహీత ఒప్పందంపై కోడ్‌ను అమలు చేయడానికి, లేదా `approve` తర్వాత ఖర్చు చేసే ఒప్పందంపై కోడ్‌ను, ఒకే లావాదేవీలో అమలు చేయడానికి మద్దతు ఇస్తుంది.
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
   * @dev కాలర్ ఖాతా నుండి `to`కి `value` మొత్తంలో టోకెన్‌లను తరలిస్తుంది
   * ఆపై `to`పై `ERC1363Receiver::onTransferReceived`ని పిలుస్తుంది.
   * @param to టోకెన్‌లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయవలసిన టోకెన్‌ల మొత్తం.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev కాలర్ ఖాతా నుండి `to`కి `value` మొత్తంలో టోకెన్‌లను తరలిస్తుంది
   * ఆపై `to`పై `ERC1363Receiver::onTransferReceived`ని పిలుస్తుంది.
   * @param to టోకెన్‌లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయవలసిన టోకెన్‌ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `to`కి కాల్‌లో పంపబడుతుంది.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev అలవెన్స్ మెకానిజం ఉపయోగించి `from` నుండి `to`కి `value` మొత్తంలో టోకెన్‌లను తరలిస్తుంది
   * ఆపై `to`పై `ERC1363Receiver::onTransferReceived`ని పిలుస్తుంది.
   * @param from టోకెన్‌లను పంపవలసిన చిరునామా.
   * @param to టోకెన్‌లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయవలసిన టోకెన్‌ల మొత్తం.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev అలవెన్స్ మెకానిజం ఉపయోగించి `from` నుండి `to`కి `value` మొత్తంలో టోకెన్‌లను తరలిస్తుంది
   * ఆపై `to`పై `ERC1363Receiver::onTransferReceived`ని పిలుస్తుంది.
   * @param from టోకెన్‌లను పంపవలసిన చిరునామా.
   * @param to టోకెన్‌లు బదిలీ చేయబడుతున్న చిరునామా.
   * @param value బదిలీ చేయవలసిన టోకెన్‌ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `to`కి కాల్‌లో పంపబడుతుంది.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev కాలర్ యొక్క టోకెన్‌లపై `spender` యొక్క అలవెన్స్‌గా `value` మొత్తంలో టోకెన్‌లను సెట్ చేస్తుంది
   * ఆపై `spender`పై `ERC1363Spender::onApprovalReceived`ని పిలుస్తుంది.
   * @param spender నిధులను ఖర్చు చేసే చిరునామా.
   * @param value ఖర్చు చేయవలసిన టోకెన్‌ల మొత్తం.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev కాలర్ యొక్క టోకెన్‌లపై `spender` యొక్క అలవెన్స్‌గా `value` మొత్తంలో టోకెన్‌లను సెట్ చేస్తుంది
   * ఆపై `spender`పై `ERC1363Spender::onApprovalReceived`ని పిలుస్తుంది.
   * @param spender నిధులను ఖర్చు చేసే చిరునామా.
   * @param value ఖర్చు చేయవలసిన టోకెన్‌ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా, `spender`కి కాల్‌లో పంపబడుతుంది.
   * @return థ్రోయింగ్ చేయకపోతే ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్ విలువ.
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

`transferAndCall` లేదా `transferFromAndCall` ద్వారా ERC-1363 టోకెన్‌లను అంగీకరించాలనుకునే స్మార్ట్ కాంట్రాక్ట్ **తప్పక** `ERC1363Receiver` ఇంటర్‌ఫేస్‌ను అమలు చేయాలి:

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 టోకెన్ కాంట్రాక్ట్‌ల నుండి `transferAndCall` లేదా `transferFromAndCall`కు మద్దతు ఇవ్వాలనుకునే ఏ కాంట్రాక్ట్ కోసం అయినా ఇంటర్‌ఫేస్.
 */
interface ERC1363Receiver {
  /**
   * @dev `operator` ద్వారా `from` నుండి `ERC1363::transferAndCall` లేదా `ERC1363::transferFromAndCall` ద్వారా ఈ కాంట్రాక్ట్‌కు ERC-1363 టోకెన్‌లు బదిలీ చేయబడినప్పుడల్లా
   * ఈ ఫంక్షన్ పిలువబడుతుంది.
   *
   * గమనిక: బదిలీని అంగీకరించడానికి, ఇది తప్పక తిరిగి ఇవ్వాలి
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (అంటే 0x88a7ca5c, లేదా దాని స్వంత ఫంక్షన్ సెలెక్టర్).
   *
   * @param operator `transferAndCall` లేదా `transferFromAndCall` ఫంక్షన్‌ను పిలిచిన చిరునామా.
   * @param from టోకెన్‌లు బదిలీ చేయబడిన చిరునామా.
   * @param value బదిలీ చేయబడిన టోకెన్‌ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా.
   * @return బదిలీ అనుమతించబడితే `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` థ్రోయింగ్ చేయకపోతే.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` ద్వారా ERC-1363 టోకెన్‌లను అంగీకరించాలనుకునే స్మార్ట్ కాంట్రాక్ట్ **తప్పక** `ERC1363Spender` ఇంటర్‌ఫేస్‌ను అమలు చేయాలి:

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 టోకెన్ కాంట్రాక్ట్‌ల నుండి `approveAndCall`కు మద్దతు ఇవ్వాలనుకునే ఏ కాంట్రాక్ట్ కోసం అయినా ఇంటర్‌ఫేస్.
 */
interface ERC1363Spender {
  /**
   * @dev ఒక ERC-1363 టోకెన్ల `owner` ఈ కాంట్రాక్ట్‌ను `ERC1363::approveAndCall` ద్వారా ఆమోదించినప్పుడల్లా
   * వారి టోకెన్‌లను ఖర్చు చేయడానికి, ఈ ఫంక్షన్ పిలువబడుతుంది.
   *
   * గమనిక: ఆమోదాన్ని అంగీకరించడానికి, ఇది తప్పక తిరిగి ఇవ్వాలి
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (అంటే 0x7b04a2d0, లేదా దాని స్వంత ఫంక్షన్ సెలెక్టర్).
   *
   * @param owner `approveAndCall` ఫంక్షన్‌ను పిలిచి, గతంలో టోకెన్‌లను కలిగి ఉన్న చిరునామా.
   * @param value ఖర్చు చేయవలసిన టోకెన్‌ల మొత్తం.
   * @param data నిర్దిష్ట ఫార్మాట్ లేని అదనపు డేటా.
   * @return ఆమోదం అనుమతించబడితే `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` థ్రోయింగ్ చేయకపోతే.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## మరింత సమాచారం {#further-reading}

- [ERC-1363: చెల్లించదగిన టోకెన్ ప్రమాణం](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub రెపో](https://github.com/vittominacori/erc1363-payable-token)
