---
title: स्थानीय, मल्टी-क्लाइंट टेस्टनेट पर विकेंद्रीकृत एप्लिकेशन (dapp) कैसे विकसित और परीक्षण करें
description: यह मार्गदर्शिका आपको सबसे पहले यह बताएगी कि विकेंद्रीकृत एप्लिकेशन (dapp) को तैनात करने और परीक्षण करने के लिए टेस्टनेट का उपयोग करने से पहले मल्टी-क्लाइंट स्थानीय इथेरियम टेस्टनेट को कैसे इंस्टेंटिएट और कॉन्फ़िगर किया जाए।
author: टेडी मितिकु
tags:
  [
    "क्लाइंट्स",
    "नोड्स",
    "स्मार्ट अनुबंध",
    "संयोज्यता",
    "सर्वसम्मति परत",
    "निष्पादन परत",
    "परीक्षण",
  ]
skill: intermediate
breadcrumb: मल्टी-क्लाइंट टेस्टनेट
lang: hi
published: 2023-04-11
---

## परिचय {#introduction}

यह मार्गदर्शिका आपको एक कॉन्फ़िगर करने योग्य स्थानीय इथेरियम टेस्टनेट को इंस्टेंटिएट करने, उस पर एक स्मार्ट अनुबंध तैनात करने, और अपने विकेंद्रीकृत एप्लिकेशन (dapp) के विरुद्ध परीक्षण चलाने के लिए टेस्टनेट का उपयोग करने की प्रक्रिया के बारे में बताती है। यह मार्गदर्शिका उन dapp डेवलपर्स के लिए डिज़ाइन की गई है जो लाइव टेस्टनेट या मेननेट पर तैनात करने से पहले विभिन्न नेटवर्क कॉन्फ़िगरेशन के विरुद्ध स्थानीय रूप से अपने dapps को विकसित और परीक्षण करना चाहते हैं।

इस मार्गदर्शिका में, आप:

- [Kurtosis](https://www.kurtosis.com/) का उपयोग करके [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) के साथ एक स्थानीय इथेरियम टेस्टनेट को इंस्टेंटिएट करेंगे,
- एक dapp को संकलित करने, तैनात करने और परीक्षण करने के लिए अपने Hardhat dapp विकास वातावरण को स्थानीय टेस्टनेट से जोड़ेंगे, और
- विभिन्न नेटवर्क कॉन्फ़िगरेशन के विरुद्ध विकास और परीक्षण वर्कफ़्लो को सक्षम करने के लिए, नोड्स की संख्या और विशिष्ट EL/CL क्लाइंट पेयरिंग जैसे मापदंडों सहित स्थानीय टेस्टनेट को कॉन्फ़िगर करेंगे।

### Kurtosis क्या है? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) एक संयोज्य बिल्ड सिस्टम है जिसे मल्टी-कंटेनर परीक्षण वातावरण को कॉन्फ़िगर करने के लिए डिज़ाइन किया गया है। यह विशेष रूप से डेवलपर्स को ऐसे प्रतिलिपि प्रस्तुत करने योग्य वातावरण बनाने में सक्षम बनाता है जिनके लिए गतिशील सेटअप लॉजिक की आवश्यकता होती है, जैसे कि ब्लॉकचेन टेस्टनेट।

इस मार्गदर्शिका में, Kurtosis eth-network-package [`geth`](https://geth.ethereum.org/) निष्पादन परत (EL) क्लाइंट, साथ ही [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), और [`lodestar`](https://lodestar.chainsafe.io/) सर्वसम्मति परत (CL) क्लाइंट्स के समर्थन के साथ एक स्थानीय इथेरियम टेस्टनेट शुरू करता है। यह पैकेज Hardhat Network, Ganache, और Anvil जैसे फ्रेमवर्क में नेटवर्क के लिए एक कॉन्फ़िगर करने योग्य और संयोज्य विकल्प के रूप में कार्य करता है। Kurtosis डेवलपर्स को उनके द्वारा उपयोग किए जाने वाले टेस्टनेट पर अधिक नियंत्रण और लचीलापन प्रदान करता है, जो एक प्रमुख कारण है कि [एथेरियम फाउंडेशन ने द मर्ज का परीक्षण करने के लिए Kurtosis का उपयोग किया](https://www.kurtosis.com/blog/testing-the-ethereum-merge) और नेटवर्क अपग्रेड के परीक्षण के लिए इसका उपयोग करना जारी रखा है।

## Kurtosis सेट अप करना {#setting-up-kurtosis}

आगे बढ़ने से पहले, सुनिश्चित करें कि आपके पास:

- अपनी स्थानीय मशीन पर [Docker इंजन स्थापित और शुरू कर लिया है](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI स्थापित कर लिया है](https://docs.kurtosis.com/install#ii-install-the-cli) (या यदि आपके पास पहले से ही CLI स्थापित है, तो इसे नवीनतम रिलीज़ में अपग्रेड कर लिया है)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), और [npx](https://www.npmjs.com/package/npx) स्थापित कर लिया है (आपके dapp वातावरण के लिए)

## एक स्थानीय इथेरियम टेस्टनेट को इंस्टेंटिएट करना {#instantiate-testnet}

एक स्थानीय इथेरियम टेस्टनेट शुरू करने के लिए, चलाएं:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

नोट: यह कमांड `--enclave` फ़्लैग का उपयोग करके आपके नेटवर्क को नाम देता है: "local-eth-testnet”।

Kurtosis निर्देशों की व्याख्या करने, मान्य करने और फिर निष्पादित करने के लिए काम करते समय आंतरिक रूप से उठाए जा रहे कदमों को प्रिंट करेगा। अंत में, आपको एक आउटपुट दिखाई देना चाहिए जो निम्नलिखित जैसा दिखता है:

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

बधाई हो! आपने Docker पर CL (`lighthouse`) और EL क्लाइंट (`geth`) के साथ एक स्थानीय इथेरियम टेस्टनेट को इंस्टेंटिएट करने के लिए Kurtosis का उपयोग किया।

### समीक्षा {#review-instantiate-testnet}

इस अनुभाग में, आपने एक कमांड निष्पादित किया जिसने Kurtosis को Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) के भीतर एक स्थानीय इथेरियम टेस्टनेट शुरू करने के लिए [GitHub पर दूरस्थ रूप से होस्ट किए गए `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) का उपयोग करने का निर्देश दिया। आपके एन्क्लेव के अंदर, आपको "फ़ाइल आर्टिफैक्ट्स" और "उपयोगकर्ता सेवाएँ" दोनों मिलेंगे।

आपके एन्क्लेव में [फ़ाइल आर्टिफैक्ट्स](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) में EL और CL क्लाइंट्स को बूटस्ट्रैप करने के लिए उत्पन्न और उपयोग किया गया सभी डेटा शामिल है। डेटा इस [Docker छवि](https://github.com/ethpandaops/ethereum-genesis-generator) से निर्मित `prelaunch-data-generator` सेवा का उपयोग करके बनाया गया था।

उपयोगकर्ता सेवाएँ आपके एन्क्लेव में काम कर रही सभी कंटेनरीकृत सेवाओं को प्रदर्शित करती हैं। आप देखेंगे कि एक एकल नोड बनाया गया है, जिसमें EL क्लाइंट और CL क्लाइंट दोनों शामिल हैं।

## अपने dapp विकास वातावरण को स्थानीय इथेरियम टेस्टनेट से कनेक्ट करें {#connect-your-dapp}

### dapp विकास वातावरण सेट अप करें {#set-up-dapp-env}

अब जब आपके पास एक चालू स्थानीय टेस्टनेट है, तो आप अपने स्थानीय टेस्टनेट का उपयोग करने के लिए अपने dapp विकास वातावरण को कनेक्ट कर सकते हैं। इस मार्गदर्शिका में आपके स्थानीय टेस्टनेट पर एक ब्लैकजैक dapp तैनात करने के लिए Hardhat फ्रेमवर्क का उपयोग किया जाएगा।

अपना dapp विकास वातावरण सेट अप करने के लिए, उस रिपॉजिटरी को क्लोन करें जिसमें हमारा नमूना dapp है और इसकी निर्भरताएँ स्थापित करें, चलाएं:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

यहाँ उपयोग किए गए [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) फ़ोल्डर में [Hardhat](https://hardhat.org/) फ्रेमवर्क का उपयोग करने वाले dapp डेवलपर के लिए विशिष्ट सेटअप शामिल है:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) में ब्लैकजैक dapp के लिए कुछ सरल स्मार्ट अनुबंध शामिल हैं
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) में आपके स्थानीय इथेरियम नेटवर्क पर एक टोकन अनुबंध तैनात करने के लिए एक स्क्रिप्ट शामिल है
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) में आपके टोकन अनुबंध के लिए एक सरल .js परीक्षण शामिल है ताकि यह पुष्टि की जा सके कि हमारे ब्लैकजैक dapp में प्रत्येक खिलाड़ी के लिए 1000 मिंट किए गए हैं
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) आपके Hardhat सेटअप को कॉन्फ़िगर करता है

### स्थानीय टेस्टनेट का उपयोग करने के लिए Hardhat को कॉन्फ़िगर करें {#configure-hardhat}

अपना dapp विकास वातावरण सेट अप करने के साथ, अब आप Kurtosis का उपयोग करके उत्पन्न स्थानीय इथेरियम टेस्टनेट का उपयोग करने के लिए Hardhat को कनेक्ट करेंगे। इसे पूरा करने के लिए, अपनी `hardhat.config.ts` कॉन्फ़िगरेशन फ़ाइल में `localnet` संरचना में `<$YOUR_PORT>` को किसी भी `el-client-<num>` सेवा से rpc uri आउटपुट के पोर्ट से बदलें। इस नमूना मामले में, पोर्ट `64248` होगा। आपका पोर्ट अलग होगा।

`hardhat.config.ts` में उदाहरण:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT को ETH नेटवर्क Kurtosis पैकेज द्वारा निर्मित नोड URI के पोर्ट से बदलें

// ये eth-network-package द्वारा बनाए गए प्रीफंडेड टेस्ट खातों से जुड़ी निजी कुंजियाँ हैं
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

एक बार जब आप अपनी फ़ाइल सहेज लेते हैं, तो आपका Hardhat dapp विकास वातावरण अब आपके स्थानीय इथेरियम टेस्टनेट से जुड़ जाता है! आप यह सत्यापित कर सकते हैं कि आपका टेस्टनेट काम कर रहा है, इसे चलाकर:

```python
npx hardhat balances --network localnet
```

आउटपुट कुछ इस तरह दिखना चाहिए:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

यह पुष्टि करता है कि Hardhat आपके स्थानीय टेस्टनेट का उपयोग कर रहा है और `eth-network-package` द्वारा बनाए गए पूर्व-वित्त पोषित खातों का पता लगाता है।

### अपने dapp को स्थानीय रूप से तैनात और परीक्षण करें {#deploy-and-test-dapp}

dapp विकास वातावरण पूरी तरह से स्थानीय इथेरियम टेस्टनेट से जुड़े होने के साथ, अब आप स्थानीय टेस्टनेट का उपयोग करके अपने dapp के विरुद्ध विकास और परीक्षण वर्कफ़्लो चला सकते हैं।

स्थानीय प्रोटोटाइपिंग और विकास के लिए `ChipToken.sol` स्मार्ट अनुबंध को संकलित और तैनात करने के लिए, चलाएं:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

आउटपुट कुछ इस तरह दिखना चाहिए:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

अब यह पुष्टि करने के लिए कि हमारे ब्लैकजैक dapp में प्रत्येक खिलाड़ी के लिए 1000 मिंट किए गए हैं, अपने स्थानीय dapp के विरुद्ध `simple.js` परीक्षण चलाने का प्रयास करें:

आउटपुट कुछ इस तरह दिखना चाहिए:

```python
npx hardhat test --network localnet
```

आउटपुट कुछ इस तरह दिखना चाहिए:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### समीक्षा {#review-dapp-workflows}

इस बिंदु पर, आपने अब एक dapp विकास वातावरण सेट अप कर लिया है, इसे Kurtosis द्वारा बनाए गए एक स्थानीय इथेरियम नेटवर्क से जोड़ दिया है, और अपने dapp के विरुद्ध एक सरल परीक्षण संकलित, तैनात और चलाया है।

अब आइए जानें कि आप विभिन्न नेटवर्क कॉन्फ़िगरेशन के तहत हमारे dapps के परीक्षण के लिए अंतर्निहित नेटवर्क को कैसे कॉन्फ़िगर कर सकते हैं।

## स्थानीय इथेरियम टेस्टनेट को कॉन्फ़िगर करना {#configure-testnet}

### क्लाइंट कॉन्फ़िगरेशन और नोड्स की संख्या बदलना {#configure-client-config-and-num-nodes}

आपके स्थानीय इथेरियम टेस्टनेट को उस परिदृश्य और विशिष्ट नेटवर्क कॉन्फ़िगरेशन के आधार पर जिसे आप विकसित या परीक्षण करना चाहते हैं, विभिन्न EL और CL क्लाइंट पेयरिंग, साथ ही अलग-अलग संख्या में नोड्स का उपयोग करने के लिए कॉन्फ़िगर किया जा सकता है। इसका मतलब यह है कि, एक बार सेट अप हो जाने के बाद, आप एक अनुकूलित स्थानीय टेस्टनेट शुरू कर सकते हैं और यह सुनिश्चित करने के लिए कि सब कुछ अपेक्षित रूप से काम करता है, विभिन्न नेटवर्क कॉन्फ़िगरेशन के तहत समान वर्कफ़्लो (तैनाती, परीक्षण, आदि) चलाने के लिए इसका उपयोग कर सकते हैं। अन्य मापदंडों के बारे में अधिक जानने के लिए जिन्हें आप संशोधित कर सकते हैं, इस लिंक पर जाएँ।

इसे आज़माएं! आप JSON फ़ाइल के माध्यम से `eth-network-package` को विभिन्न कॉन्फ़िगरेशन विकल्प पास कर सकते हैं। यह नेटवर्क पैरामीटर JSON फ़ाइल विशिष्ट कॉन्फ़िगरेशन प्रदान करती है जिसका उपयोग Kurtosis स्थानीय इथेरियम नेटवर्क सेट अप करने के लिए करेगा।

डिफ़ॉल्ट कॉन्फ़िगरेशन फ़ाइल लें और विभिन्न EL/CL पेयरिंग के साथ दो नोड्स शुरू करने के लिए इसे संपादित करें:

- `geth`/`lighthouse` के साथ नोड 1
- `geth`/`lodestar` के साथ नोड 2
- `geth`/`teku` के साथ नोड 3

यह कॉन्फ़िगरेशन आपके dapp के परीक्षण के लिए इथेरियम नोड कार्यान्वयन का एक विषम नेटवर्क बनाता है। आपकी कॉन्फ़िगरेशन फ़ाइल अब इस तरह दिखनी चाहिए:

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

प्रत्येक `participants` संरचना नेटवर्क में एक नोड को मैप करती है, इसलिए 3 `participants` संरचनाएं Kurtosis को आपके नेटवर्क में 3 नोड्स शुरू करने के लिए कहेंगी। प्रत्येक `participants` संरचना आपको उस विशिष्ट नोड के लिए उपयोग किए जाने वाले EL और CL पेयरिंग को निर्दिष्ट करने की अनुमति देगी।

`network_params` संरचना उन नेटवर्क सेटिंग्स को कॉन्फ़िगर करती है जिनका उपयोग प्रत्येक नोड के लिए जेनेसिस फ़ाइलें बनाने के साथ-साथ नेटवर्क के प्रति स्लॉट सेकंड जैसी अन्य सेटिंग्स के लिए किया जाता है।

अपनी संपादित पैरामीटर फ़ाइल को अपनी इच्छानुसार किसी भी निर्देशिका में सहेजें (नीचे दिए गए उदाहरण में, इसे डेस्कटॉप पर सहेजा गया है) और फिर इसे चलाकर अपने Kurtosis पैकेज को चलाने के लिए इसका उपयोग करें:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

नोट: `kurtosis clean -a` कमांड का उपयोग यहाँ Kurtosis को एक नया टेस्टनेट शुरू करने से पहले पुराने टेस्टनेट और उसकी सामग्री को नष्ट करने का निर्देश देने के लिए किया जाता है।

फिर से, Kurtosis थोड़ी देर के लिए काम करेगा और हो रहे व्यक्तिगत चरणों को प्रिंट करेगा। अंततः, आउटपुट कुछ इस तरह दिखना चाहिए:

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

बधाई हो! आपने अपने स्थानीय टेस्टनेट को 1 के बजाय 3 नोड्स रखने के लिए सफलतापूर्वक कॉन्फ़िगर किया है। अपने dapp (तैनाती और परीक्षण) के विरुद्ध पहले किए गए समान वर्कफ़्लो को चलाने के लिए, अपने नए, 3-नोड स्थानीय टेस्टनेट में किसी भी `el-client-<num>` सेवा से rpc uri आउटपुट के पोर्ट के साथ अपनी `hardhat.config.ts` कॉन्फ़िगरेशन फ़ाइल में `localnet` संरचना में `<$YOUR_PORT>` को बदलकर वही संचालन करें जो हमने पहले किया था।

## निष्कर्ष {#conclusion}

और बस इतना ही! इस संक्षिप्त मार्गदर्शिका को संक्षेप में बताने के लिए, आपने:

- Kurtosis का उपयोग करके Docker पर एक स्थानीय इथेरियम टेस्टनेट बनाया
- अपने स्थानीय dapp विकास वातावरण को स्थानीय इथेरियम नेटवर्क से जोड़ा
- एक dapp तैनात किया और स्थानीय इथेरियम नेटवर्क पर इसके विरुद्ध एक सरल परीक्षण चलाया
- अंतर्निहित इथेरियम नेटवर्क को 3 नोड्स रखने के लिए कॉन्फ़िगर किया

हम आपसे यह सुनना पसंद करेंगे कि आपके लिए क्या अच्छा रहा, क्या सुधारा जा सकता है, या आपके किसी भी प्रश्न का उत्तर देना चाहेंगे। [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) के माध्यम से संपर्क करने या [हमें ईमेल करने](mailto:feedback@kurtosistech.com) में संकोच न करें!

### अन्य उदाहरण और मार्गदर्शिकाएँ {#other-examples-guides}

हम आपको हमारे [क्विकस्टार्ट](https://docs.kurtosis.com/quickstart) (जहाँ आप शीर्ष पर एक Postgres डेटाबेस और API बनाएंगे) और हमारे [awesome-kurtosis रिपॉजिटरी](https://github.com/kurtosis-tech/awesome-kurtosis) में हमारे अन्य उदाहरणों को देखने के लिए प्रोत्साहित करते हैं जहाँ आपको कुछ बेहतरीन उदाहरण मिलेंगे, जिनमें इनके लिए पैकेज शामिल हैं:

- [वही स्थानीय इथेरियम टेस्टनेट शुरू करना](https://github.com/kurtosis-tech/eth2-package), लेकिन अतिरिक्त सेवाओं के साथ जैसे कि एक लेन-देन स्पैमर (लेन-देन का अनुकरण करने के लिए), एक फ़ोर्क मॉनिटर, और एक कनेक्टेड Grafana और Prometheus इंस्टेंस
- उसी स्थानीय इथेरियम नेटवर्क के विरुद्ध एक [सब-नेटवर्किंग परीक्षण](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) करना