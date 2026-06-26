---
title: "స్థానిక, బహుళ-క్లయింట్ టెస్ట్‌నెట్‌లో dappను ఎలా అభివృద్ధి చేయాలి మరియు పరీక్షించాలి"
description: "ఈ గైడ్ ముందుగా బహుళ-క్లయింట్ స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఎలా ఇన్‌స్టాన్షియేట్ చేయాలో మరియు కాన్ఫిగర్ చేయాలో వివరిస్తుంది, ఆపై వికేంద్రీకృత అప్లికేషన్ (dapp)ను డిప్లాయ్ చేయడానికి మరియు పరీక్షించడానికి ఆ టెస్ట్‌నెట్‌ను ఎలా ఉపయోగించాలో చూపుతుంది."
author: "టెడీ మిటికు"
tags:
  [
    "క్లయింట్లు",
    "నోడ్‌లు",
    "స్మార్ట్ కాంట్రాక్ట్‌లు",
    "కూర్చదగిన సామర్థ్యం",
    "ఏకాభిప్రాయ పొర",
    "అమలు పొర",
    "పరీక్షించడం",
  ]
skill: intermediate
breadcrumb: "బహుళ-క్లయింట్ టెస్ట్‌నెట్"
lang: te
published: 2023-04-11
---

## పరిచయం {#introduction}

ఈ గైడ్ కాన్ఫిగర్ చేయగల స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఇన్‌స్టాన్షియేట్ చేయడం, దానికి స్మార్ట్ కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడం మరియు మీ వికేంద్రీకృత అప్లికేషన్ (dapp)పై పరీక్షలను అమలు చేయడానికి టెస్ట్‌నెట్‌ను ఉపయోగించే ప్రక్రియను వివరిస్తుంది. లైవ్ టెస్ట్‌నెట్ లేదా మెయిన్‌నెట్‌కు డిప్లాయ్ చేయడానికి ముందు వివిధ నెట్‌వర్క్ కాన్ఫిగరేషన్‌లకు వ్యతిరేకంగా తమ dappలను స్థానికంగా అభివృద్ధి చేసి, పరీక్షించాలనుకునే dapp డెవలపర్‌ల కోసం ఈ గైడ్ రూపొందించబడింది.

ఈ గైడ్‌లో, మీరు వీటిని చేస్తారు:

- [Kurtosis](https://www.kurtosis.com/)ని ఉపయోగించి [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)తో స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఇన్‌స్టాన్షియేట్ చేస్తారు,
- ఒక dappను కంపైల్ చేయడానికి, డిప్లాయ్ చేయడానికి మరియు పరీక్షించడానికి మీ Hardhat dapp అభివృద్ధి వాతావరణాన్ని స్థానిక టెస్ట్‌నెట్‌కు కనెక్ట్ చేస్తారు, మరియు
- వివిధ నెట్‌వర్క్ కాన్ఫిగరేషన్‌లకు వ్యతిరేకంగా అభివృద్ధి మరియు పరీక్షా వర్క్‌ఫ్లోలను ప్రారంభించడానికి, నోడ్‌ల సంఖ్య మరియు నిర్దిష్ట EL/CL క్లయింట్ జతల వంటి పారామితులతో సహా స్థానిక టెస్ట్‌నెట్‌ను కాన్ఫిగర్ చేస్తారు.

### Kurtosis అంటే ఏమిటి? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) అనేది బహుళ-కంటైనర్ పరీక్షా వాతావరణాలను కాన్ఫిగర్ చేయడానికి రూపొందించబడిన ఒక కూర్చదగిన నిర్మాణ వ్యవస్థ. ఇది ప్రత్యేకంగా బ్లాక్‌చైన్ టెస్ట్‌నెట్‌ల వంటి డైనమిక్ సెటప్ లాజిక్ అవసరమయ్యే పునరుత్పత్తి చేయగల వాతావరణాలను సృష్టించడానికి డెవలపర్‌లను అనుమతిస్తుంది.

ఈ గైడ్‌లో, Kurtosis eth-network-package అనేది [`geth`](https://geth.ethereum.org/) అమలు పొర (EL) క్లయింట్‌తో పాటు [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), మరియు [`lodestar`](https://lodestar.chainsafe.io/) ఏకాభిప్రాయ పొర (CL) క్లయింట్‌ల మద్దతుతో స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ప్రారంభిస్తుంది. ఈ ప్యాకేజీ Hardhat Network, Ganache, మరియు Anvil వంటి ఫ్రేమ్‌వర్క్‌లలోని నెట్‌వర్క్‌లకు కాన్ఫిగర్ చేయగల మరియు కూర్చదగిన ప్రత్యామ్నాయంగా పనిచేస్తుంది. Kurtosis డెవలపర్‌లు ఉపయోగించే టెస్ట్‌నెట్‌లపై వారికి మరింత నియంత్రణ మరియు సౌలభ్యాన్ని అందిస్తుంది, అందుకే [ఎథీరియం ఫౌండేషన్ ది మెర్జ్‌ను పరీక్షించడానికి Kurtosisని ఉపయోగించింది](https://www.kurtosis.com/blog/testing-the-ethereum-merge) మరియు నెట్‌వర్క్ అప్‌గ్రేడ్‌లను పరీక్షించడానికి దీనిని ఉపయోగించడం కొనసాగిస్తోంది.

## Kurtosisని సెటప్ చేయడం {#setting-up-kurtosis}

మీరు కొనసాగడానికి ముందు, మీ వద్ద ఇవి ఉన్నాయని నిర్ధారించుకోండి:

- మీ స్థానిక మెషీన్‌లో [Docker ఇంజిన్‌ను ఇన్‌స్టాల్ చేసి, ప్రారంభించడం](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLIని ఇన్‌స్టాల్ చేయడం](https://docs.kurtosis.com/install#ii-install-the-cli) (లేదా మీరు ఇప్పటికే CLIని ఇన్‌స్టాల్ చేసి ఉంటే, దాన్ని తాజా విడుదలకు అప్‌గ్రేడ్ చేయడం)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), మరియు [npx](https://www.npmjs.com/package/npx) ఇన్‌స్టాల్ చేయడం (మీ dapp వాతావరణం కోసం)

## స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఇన్‌స్టాన్షియేట్ చేయడం {#instantiate-testnet}

స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ప్రారంభించడానికి, దీన్ని అమలు చేయండి:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

గమనిక: ఈ కమాండ్ `--enclave` ఫ్లాగ్‌ని ఉపయోగించి మీ నెట్‌వర్క్‌కు "local-eth-testnet" అని పేరు పెడుతుంది.

సూచనలను అర్థం చేసుకోవడానికి, ధృవీకరించడానికి మరియు అమలు చేయడానికి Kurtosis అంతర్గతంగా తీసుకుంటున్న దశలను ప్రింట్ చేస్తుంది. చివరగా, మీరు కింది విధంగా ఉండే అవుట్‌పుట్‌ను చూడాలి:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

అభినందనలు! మీరు Docker ద్వారా CL (`lighthouse`) మరియు EL క్లయింట్ (`geth`)తో స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఇన్‌స్టాన్షియేట్ చేయడానికి Kurtosisని ఉపయోగించారు.

### సమీక్ష {#review-instantiate-testnet}

ఈ విభాగంలో, Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) లోపల స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ప్రారంభించడానికి [GitHubలో రిమోట్‌గా హోస్ట్ చేయబడిన `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)ని ఉపయోగించమని Kurtosisని నిర్దేశించే కమాండ్‌ను మీరు అమలు చేశారు. మీ ఎన్‌క్లేవ్ లోపల, మీరు "ఫైల్ ఆర్టిఫ్యాక్ట్‌లు" మరియు "వినియోగదారు సేవలు" రెండింటినీ కనుగొంటారు.

మీ ఎన్‌క్లేవ్‌లోని [ఫైల్ ఆర్టిఫ్యాక్ట్‌లు](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) EL మరియు CL క్లయింట్‌లను బూట్‌స్ట్రాప్ చేయడానికి రూపొందించబడిన మరియు ఉపయోగించబడిన మొత్తం డేటాను కలిగి ఉంటాయి. ఈ [Docker ఇమేజ్](https://github.com/ethpandaops/ethereum-genesis-generator) నుండి నిర్మించబడిన `prelaunch-data-generator` సేవను ఉపయోగించి డేటా సృష్టించబడింది.

వినియోగదారు సేవలు మీ ఎన్‌క్లేవ్‌లో పనిచేస్తున్న అన్ని కంటైనరైజ్డ్ సేవలను ప్రదర్శిస్తాయి. EL క్లయింట్ మరియు CL క్లయింట్ రెండింటినీ కలిగి ఉన్న ఒకే నోడ్ సృష్టించబడిందని మీరు గమనించవచ్చు.

## మీ dapp అభివృద్ధి వాతావరణాన్ని స్థానిక ఎథీరియం టెస్ట్‌నెట్‌కు కనెక్ట్ చేయండి {#connect-your-dapp}

### dapp అభివృద్ధి వాతావరణాన్ని సెటప్ చేయండి {#set-up-dapp-env}

ఇప్పుడు మీరు నడుస్తున్న స్థానిక టెస్ట్‌నెట్‌ను కలిగి ఉన్నందున, మీ స్థానిక టెస్ట్‌నెట్‌ను ఉపయోగించడానికి మీ dapp అభివృద్ధి వాతావరణాన్ని కనెక్ట్ చేయవచ్చు. మీ స్థానిక టెస్ట్‌నెట్‌కు బ్లాక్‌జాక్ dappను డిప్లాయ్ చేయడానికి ఈ గైడ్‌లో Hardhat ఫ్రేమ్‌వర్క్ ఉపయోగించబడుతుంది.

మీ dapp అభివృద్ధి వాతావరణాన్ని సెటప్ చేయడానికి, మా నమూనా dappని కలిగి ఉన్న రిపోజిటరీని క్లోన్ చేయండి మరియు దాని డిపెండెన్సీలను ఇన్‌స్టాల్ చేయండి, దీన్ని అమలు చేయండి:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

ఇక్కడ ఉపయోగించిన [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) ఫోల్డర్ [Hardhat](https://hardhat.org/) ఫ్రేమ్‌వర్క్‌ను ఉపయోగించే dapp డెవలపర్ కోసం సాధారణ సెటప్‌ను కలిగి ఉంటుంది:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) బ్లాక్‌జాక్ dapp కోసం కొన్ని సాధారణ స్మార్ట్ కాంట్రాక్ట్‌లను కలిగి ఉంటుంది
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) మీ స్థానిక ఎథీరియం నెట్‌వర్క్‌కు టోకెన్ కాంట్రాక్ట్‌ను డిప్లాయ్ చేయడానికి ఒక స్క్రిప్ట్‌ను కలిగి ఉంటుంది
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) మా బ్లాక్‌జాక్ dappలోని ప్రతి క్రీడాకారుడికి 1000 ముద్రించబడిందని నిర్ధారించడానికి మీ టోకెన్ కాంట్రాక్ట్ కోసం ఒక సాధారణ .js పరీక్షను కలిగి ఉంటుంది
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) మీ Hardhat సెటప్‌ను కాన్ఫిగర్ చేస్తుంది

### స్థానిక టెస్ట్‌నెట్‌ను ఉపయోగించడానికి Hardhatని కాన్ఫిగర్ చేయండి {#configure-hardhat}

మీ dapp అభివృద్ధి వాతావరణం సెటప్ చేయబడినందున, మీరు ఇప్పుడు Kurtosisని ఉపయోగించి రూపొందించబడిన స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ఉపయోగించడానికి Hardhatని కనెక్ట్ చేస్తారు. దీన్ని సాధించడానికి, మీ `hardhat.config.ts` కాన్ఫిగరేషన్ ఫైల్‌లోని `localnet` స్ట్రక్ట్‌లోని `<$YOUR_PORT>`ని ఏదైనా `el-client-<num>` సేవ నుండి rpc uri అవుట్‌పుట్ యొక్క పోర్ట్‌తో భర్తీ చేయండి. ఈ నమూనా సందర్భంలో, పోర్ట్ `64248` అవుతుంది. మీ పోర్ట్ భిన్నంగా ఉంటుంది.

`hardhat.config.ts`లో ఉదాహరణ:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ETH నెట్‌వర్క్ Kurtosis ప్యాకేజీ ద్వారా ఉత్పత్తి చేయబడిన ఒక నోడ్ URI యొక్క పోర్ట్‌తో $YOUR_PORT ని భర్తీ చేయండి

// ఇవి eth-network-package ద్వారా సృష్టించబడిన ముందుగా ఫండ్ చేయబడిన టెస్ట్ ఖాతాలకు సంబంధించిన ప్రైవేట్ కీలు
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

మీరు మీ ఫైల్‌ను సేవ్ చేసిన తర్వాత, మీ Hardhat dapp అభివృద్ధి వాతావరణం ఇప్పుడు మీ స్థానిక ఎథీరియం టెస్ట్‌నెట్‌కు కనెక్ట్ చేయబడింది! దీన్ని అమలు చేయడం ద్వారా మీ టెస్ట్‌నెట్ పనిచేస్తుందో లేదో మీరు ధృవీకరించవచ్చు:

```python
npx hardhat balances --network localnet
```

అవుట్‌పుట్ ఈ విధంగా ఉండాలి:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Hardhat మీ స్థానిక టెస్ట్‌నెట్‌ను ఉపయోగిస్తోందని మరియు `eth-network-package` ద్వారా సృష్టించబడిన ప్రీ-ఫండెడ్ ఖాతాలను గుర్తిస్తుందని ఇది నిర్ధారిస్తుంది.

### మీ dappను స్థానికంగా డిప్లాయ్ చేయండి మరియు పరీక్షించండి {#deploy-and-test-dapp}

dapp అభివృద్ధి వాతావరణం స్థానిక ఎథీరియం టెస్ట్‌నెట్‌కు పూర్తిగా కనెక్ట్ చేయబడినందున, మీరు ఇప్పుడు స్థానిక టెస్ట్‌నెట్‌ను ఉపయోగించి మీ dappపై అభివృద్ధి మరియు పరీక్షా వర్క్‌ఫ్లోలను అమలు చేయవచ్చు.

స్థానిక ప్రోటోటైపింగ్ మరియు అభివృద్ధి కోసం `ChipToken.sol` స్మార్ట్ కాంట్రాక్ట్‌ను కంపైల్ చేయడానికి మరియు డిప్లాయ్ చేయడానికి, దీన్ని అమలు చేయండి:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

అవుట్‌పుట్ ఈ విధంగా ఉండాలి:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

ఇప్పుడు మా బ్లాక్‌జాక్ dappలోని ప్రతి క్రీడాకారుడికి 1000 ముద్రించబడిందని నిర్ధారించడానికి మీ స్థానిక dappపై `simple.js` పరీక్షను అమలు చేయడానికి ప్రయత్నించండి:

అవుట్‌పుట్ ఈ విధంగా ఉండాలి:

```python
npx hardhat test --network localnet
```

అవుట్‌పుట్ ఈ విధంగా ఉండాలి:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### సమీక్ష {#review-dapp-workflows}

ఈ సమయంలో, మీరు ఇప్పుడు dapp అభివృద్ధి వాతావరణాన్ని సెటప్ చేసారు, Kurtosis ద్వారా సృష్టించబడిన స్థానిక ఎథీరియం నెట్‌వర్క్‌కు దాన్ని కనెక్ట్ చేసారు మరియు మీ dappపై ఒక సాధారణ పరీక్షను కంపైల్ చేసారు, డిప్లాయ్ చేసారు మరియు అమలు చేసారు.

ఇప్పుడు వివిధ నెట్‌వర్క్ కాన్ఫిగరేషన్‌ల క్రింద మా dappలను పరీక్షించడానికి అంతర్లీన నెట్‌వర్క్‌ను మీరు ఎలా కాన్ఫిగర్ చేయవచ్చో అన్వేషిద్దాం.

## స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను కాన్ఫిగర్ చేయడం {#configure-testnet}

### క్లయింట్ కాన్ఫిగరేషన్‌లు మరియు నోడ్‌ల సంఖ్యను మార్చడం {#configure-client-config-and-num-nodes}

మీరు అభివృద్ధి చేయాలనుకుంటున్న లేదా పరీక్షించాలనుకుంటున్న దృశ్యం మరియు నిర్దిష్ట నెట్‌వర్క్ కాన్ఫిగరేషన్‌పై ఆధారపడి, విభిన్న EL మరియు CL క్లయింట్ జతలను, అలాగే వివిధ సంఖ్యలో నోడ్‌లను ఉపయోగించడానికి మీ స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను కాన్ఫిగర్ చేయవచ్చు. దీని అర్థం, ఒకసారి సెటప్ చేసిన తర్వాత, మీరు అనుకూలీకరించిన స్థానిక టెస్ట్‌నెట్‌ను ప్రారంభించవచ్చు మరియు ప్రతిదీ ఆశించిన విధంగా పనిచేస్తుందని నిర్ధారించుకోవడానికి వివిధ నెట్‌వర్క్ కాన్ఫిగరేషన్‌ల క్రింద అదే వర్క్‌ఫ్లోలను (డిప్లాయ్‌మెంట్, పరీక్షలు మొదలైనవి) అమలు చేయడానికి దాన్ని ఉపయోగించవచ్చు. మీరు సవరించగల ఇతర పారామితుల గురించి మరింత తెలుసుకోవడానికి, ఈ లింక్‌ను సందర్శించండి.

దీన్ని ప్రయత్నించండి! మీరు JSON ఫైల్ ద్వారా `eth-network-package`కి వివిధ కాన్ఫిగరేషన్ ఎంపికలను పంపవచ్చు. ఈ నెట్‌వర్క్ పారామితుల JSON ఫైల్ స్థానిక ఎథీరియం నెట్‌వర్క్‌ను సెటప్ చేయడానికి Kurtosis ఉపయోగించే నిర్దిష్ట కాన్ఫిగరేషన్‌లను అందిస్తుంది.

డిఫాల్ట్ కాన్ఫిగరేషన్ ఫైల్‌ను తీసుకోండి మరియు విభిన్న EL/CL జతలతో రెండు నోడ్‌లను ప్రారంభించడానికి దాన్ని సవరించండి:

- `geth`/`lighthouse`తో నోడ్ 1
- `geth`/`lodestar`తో నోడ్ 2
- `geth`/`teku`తో నోడ్ 3

ఈ కాన్ఫిగరేషన్ మీ dappను పరీక్షించడం కోసం ఎథీరియం నోడ్ అమలుల యొక్క భిన్నమైన నెట్‌వర్క్‌ను సృష్టిస్తుంది. మీ కాన్ఫిగరేషన్ ఫైల్ ఇప్పుడు ఈ విధంగా ఉండాలి:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

ప్రతి `participants` స్ట్రక్ట్ నెట్‌వర్క్‌లోని ఒక నోడ్‌కు మ్యాప్ చేయబడుతుంది, కాబట్టి 3 `participants` స్ట్రక్ట్‌లు మీ నెట్‌వర్క్‌లో 3 నోడ్‌లను ప్రారంభించమని Kurtosisకి చెబుతాయి. ప్రతి `participants` స్ట్రక్ట్ ఆ నిర్దిష్ట నోడ్ కోసం ఉపయోగించే EL మరియు CL జతను పేర్కొనడానికి మిమ్మల్ని అనుమతిస్తుంది.

`network_params` స్ట్రక్ట్ ప్రతి నోడ్ కోసం జెనెసిస్ ఫైల్‌లను సృష్టించడానికి ఉపయోగించే నెట్‌వర్క్ సెట్టింగ్‌లను అలాగే నెట్‌వర్క్ యొక్క సెకన్ల పర్ స్లాట్ వంటి ఇతర సెట్టింగ్‌లను కాన్ఫిగర్ చేస్తుంది.

మీరు సవరించిన పారామితుల ఫైల్‌ను మీకు కావలసిన ఏదైనా డైరెక్టరీలో సేవ్ చేయండి (దిగువ ఉదాహరణలో, ఇది డెస్క్‌టాప్‌లో సేవ్ చేయబడింది) ఆపై దీన్ని అమలు చేయడం ద్వారా మీ Kurtosis ప్యాకేజీని అమలు చేయడానికి దాన్ని ఉపయోగించండి:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

గమనిక: కొత్తదాన్ని ప్రారంభించడానికి ముందు పాత టెస్ట్‌నెట్‌ను మరియు దాని కంటెంట్‌లను నాశనం చేయమని Kurtosisని ఆదేశించడానికి ఇక్కడ `kurtosis clean -a` కమాండ్ ఉపయోగించబడుతుంది.

మళ్ళీ, Kurtosis కొద్దిసేపు పని చేస్తుంది మరియు జరుగుతున్న వ్యక్తిగత దశలను ప్రింట్ చేస్తుంది. చివరగా, అవుట్‌పుట్ ఈ విధంగా ఉండాలి:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

అభినందనలు! మీరు మీ స్థానిక టెస్ట్‌నెట్‌ను 1కి బదులుగా 3 నోడ్‌లను కలిగి ఉండేలా విజయవంతంగా కాన్ఫిగర్ చేసారు. మీ dappపై మీరు ఇంతకు ముందు చేసిన అదే వర్క్‌ఫ్లోలను (డిప్లాయ్ & పరీక్ష) అమలు చేయడానికి, మీ కొత్త, 3-నోడ్ స్థానిక టెస్ట్‌నెట్‌లోని ఏదైనా `el-client-<num>` సేవ నుండి rpc uri అవుట్‌పుట్ యొక్క పోర్ట్‌తో మీ `hardhat.config.ts` కాన్ఫిగరేషన్ ఫైల్‌లోని `localnet` స్ట్రక్ట్‌లోని `<$YOUR_PORT>`ని భర్తీ చేయడం ద్వారా మేము ఇంతకు ముందు చేసిన అదే ఆపరేషన్‌లను నిర్వహించండి.

## ముగింపు {#conclusion}

అంతే! ఈ చిన్న గైడ్‌ను సంగ్రహించడానికి, మీరు:

- Kurtosisని ఉపయోగించి Docker ద్వారా స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను సృష్టించారు
- మీ స్థానిక dapp అభివృద్ధి వాతావరణాన్ని స్థానిక ఎథీరియం నెట్‌వర్క్‌కు కనెక్ట్ చేసారు
- స్థానిక ఎథీరియం నెట్‌వర్క్‌లో dappను డిప్లాయ్ చేసారు మరియు దానిపై ఒక సాధారణ పరీక్షను అమలు చేసారు
- 3 నోడ్‌లను కలిగి ఉండేలా అంతర్లీన ఎథీరియం నెట్‌వర్క్‌ను కాన్ఫిగర్ చేసారు

మీకు ఏది బాగా పనిచేసింది, దేనిని మెరుగుపరచవచ్చు అనే దానిపై మీ నుండి వినడానికి లేదా మీ ఏవైనా ప్రశ్నలకు సమాధానం ఇవ్వడానికి మేము ఇష్టపడతాము. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) ద్వారా సంప్రదించడానికి లేదా [మాకు ఇమెయిల్ చేయడానికి](mailto:feedback@kurtosistech.com) వెనుకాడవద్దు!

### ఇతర ఉదాహరణలు మరియు గైడ్‌లు {#other-examples-guides}

మా [క్విక్‌స్టార్ట్](https://docs.kurtosis.com/quickstart) (ఇక్కడ మీరు పైన Postgres డేటాబేస్ మరియు APIని నిర్మిస్తారు) మరియు మా [awesome-kurtosis రిపోజిటరీ](https://github.com/kurtosis-tech/awesome-kurtosis)లోని మా ఇతర ఉదాహరణలను తనిఖీ చేయమని మేము మిమ్మల్ని ప్రోత్సహిస్తున్నాము, ఇక్కడ మీరు వీటి కోసం ప్యాకేజీలతో సహా కొన్ని గొప్ప ఉదాహరణలను కనుగొంటారు:

- [అదే స్థానిక ఎథీరియం టెస్ట్‌నెట్‌ను ప్రారంభించడం](https://github.com/kurtosis-tech/eth2-package), కానీ లావాదేవీల స్పామర్ (లావాదేవీలను అనుకరించడానికి), ఫోర్క్ మానిటర్ మరియు కనెక్ట్ చేయబడిన Grafana మరియు Prometheus ఇన్‌స్టాన్స్ వంటి అదనపు సేవలు కనెక్ట్ చేయబడి ఉంటాయి
- అదే స్థానిక ఎథీరియం నెట్‌వర్క్‌పై [సబ్-నెట్‌వర్కింగ్ పరీక్ష](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)ను నిర్వహించడం