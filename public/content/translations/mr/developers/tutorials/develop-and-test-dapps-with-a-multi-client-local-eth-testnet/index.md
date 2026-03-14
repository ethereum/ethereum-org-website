---
title: "स्थानिक, मल्टी-क्लायंट टेस्टनेटवर dApp कसे विकसित आणि चाचणी करावे"
description: "हे मार्गदर्शक तुम्हाला dApp तैनात आणि चाचणी करण्यासाठी टेस्टनेट वापरण्यापूर्वी, मल्टी-क्लायंट स्थानिक Ethereum टेस्टनेट कसे इन्स्टॅन्शिएट आणि कॉन्फिगर करावे यासाठी मार्गदर्शन करेल."
author: "Tedi Mitiku"
tags:
  [
    "क्लायंट्स",
    "नोड्स",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "कंपोझेबिलिटी",
    "कन्सेंसस लेयर",
    "एक्झिक्यूशन लेयर",
    "चाचणी"
  ]
skill: intermediate
lang: mr
published: 2023-04-11
---

## प्रस्तावना {#introduction}

हे मार्गदर्शक तुम्हाला कॉन्फिगर करण्यायोग्य स्थानिक Ethereum टेस्टनेट इन्स्टॅन्शिएट करणे, त्यावर एक स्मार्ट कॉन्ट्रॅक्ट तैनात करणे आणि तुमच्या dApp विरुद्ध चाचण्या चालवण्यासाठी टेस्टनेट वापरण्याच्या प्रक्रियेत मार्गदर्शन करते. हे मार्गदर्शक अशा dApp डेव्हलपर्ससाठी डिझाइन केले आहे ज्यांना लाइव्ह टेस्टनेट किंवा मेननेटवर तैनात करण्यापूर्वी त्यांचे dApps स्थानिक पातळीवर वेगवेगळ्या नेटवर्क कॉन्फिगरेशनवर विकसित आणि चाचणी करायचे आहेत.

या मार्गदर्शकामध्ये, तुम्ही हे कराल:

- [Kurtosis](https://www.kurtosis.com/) वापरून [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) सह स्थानिक Ethereum टेस्टनेट इन्स्टॅन्शिएट करा,
- dApp कंपाईल, तैनात आणि चाचणी करण्यासाठी तुमचे Hardhat dApp डेव्हलपमेंट एन्व्हायर्नमेंट स्थानिक टेस्टनेटशी कनेक्ट करा, आणि
- विविध नेटवर्क कॉन्फिगरेशनवर डेव्हलपमेंट आणि टेस्टिंग वर्कफ्लो सक्षम करण्यासाठी, नोड्सची संख्या आणि विशिष्ट EL/CL क्लायंट पेअरिंग्ज यासारख्या पॅरामीटर्ससह स्थानिक टेस्टनेट कॉन्फिगर करा.

### Kurtosis काय आहे? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ही मल्टी-कंटेनर चाचणी एन्व्हायर्नमेंट कॉन्फिगर करण्यासाठी डिझाइन केलेली एक कंपोझेबल बिल्ड सिस्टीम आहे. हे विशेषतः डेव्हलपर्सना पुनरुत्पादक एन्व्हायर्नमेंट तयार करण्यास सक्षम करते ज्यांना डायनॅमिक सेटअप लॉजिकची आवश्यकता असते, जसे की ब्लॉकचेन टेस्टनेट्स.

या मार्गदर्शकामध्ये, Kurtosis eth-network-package [`geth`](https://geth.ethereum.org/) एक्झिक्यूशन लेअर (EL) क्लायंट, तसेच [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), आणि [`lodestar`](https://lodestar.chainsafe.io/) कन्सेंसस लेअर (CL) क्लायंट्सच्या सपोर्टसह एक स्थानिक Ethereum टेस्टनेट सुरू करतो. हे पॅकेज Hardhat Network, Ganache, आणि Anvil सारख्या फ्रेमवर्कमधील नेटवर्क्ससाठी एक कॉन्फिगर करण्यायोग्य आणि कंपोझेबल पर्याय म्हणून काम करते. Kurtosis डेव्हलपर्सना ते वापरत असलेल्या टेस्टनेट्सवर अधिक नियंत्रण आणि लवचिकता देते, आणि हे एक प्रमुख कारण आहे की [Ethereum फाउंडेशनने द मर्जची चाचणी घेण्यासाठी Kurtosis चा वापर केला](https://www.kurtosis.com/blog/testing-the-ethereum-merge) आणि नेटवर्क अपग्रेडच्या चाचणीसाठी त्याचा वापर सुरू ठेवला आहे.

## Kurtosis सेटअप करणे {#setting-up-kurtosis}

पुढे जाण्यापूर्वी, तुमच्याकडे हे असल्याची खात्री करा:

- तुमच्या स्थानिक मशीनवर [डॉकर इंजिन इंस्टॉल आणि सुरू केले आहे](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI इंस्टॉल केले आहे](https://docs.kurtosis.com/install#ii-install-the-cli) (किंवा तुमच्याकडे आधीच CLI इंस्टॉल असल्यास, ते नवीनतम रिलीझवर अपग्रेड केले आहे)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), आणि [npx](https://www.npmjs.com/package/npx) (तुमच्या dApp एन्व्हायर्नमेंटसाठी) इंस्टॉल केले आहे

## स्थानिक Ethereum टेस्टनेट इन्स्टॅन्शिएट करणे {#instantiate-testnet}

स्थानिक Ethereum टेस्टनेट सुरू करण्यासाठी, चालवा:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

टीप: ही कमांड `--enclave` फ्लॅग वापरून तुमच्या नेटवर्कला नाव देते: "local-eth-testnet".

Kurtosis सूचनांचा अर्थ लावणे, प्रमाणित करणे आणि नंतर कार्यान्वित करण्याचे काम करत असताना पडद्यामागे घेत असलेले टप्पे प्रिंट करेल. शेवटी, तुम्हाला खालीलप्रमाणे दिसणारे आउटपुट दिसेल:

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

अभिनंदन! तुम्ही Docker वर, एका CL (`lighthouse`) आणि EL क्लायंट (`geth`) सह स्थानिक Ethereum टेस्टनेट इन्स्टॅन्शिएट करण्यासाठी Kurtosis वापरले.

### पुनरावलोकन {#review-instantiate-testnet}

या विभागात, तुम्ही एक कमांड कार्यान्वित केली जी Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) मध्ये स्थानिक Ethereum टेस्टनेट सुरू करण्यासाठी GitHub वर दूरस्थपणे होस्ट केलेल्या [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) चा वापर करण्यास निर्देशित करते. तुमच्या एन्क्लेव्हमध्ये, तुम्हाला "फाइल आर्टिफॅक्ट्स" आणि "यूझर सर्व्हिसेस" दोन्ही आढळतील.

तुमच्या एन्क्लेव्हमधील [फाइल आर्टिफॅक्ट्स](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) मध्ये EL आणि CL क्लायंट बूटस्ट्रॅप करण्यासाठी तयार केलेला आणि वापरलेला सर्व डेटा समाविष्ट आहे. हा डेटा या [डॉकर इमेज](https://github.com/ethpandaops/ethereum-genesis-generator) पासून बनवलेल्या `prelaunch-data-generator` सेवेचा वापर करून तयार केला गेला आहे.

यूझर सर्व्हिसेस तुमच्या एन्क्लेव्हमध्ये कार्यरत असलेल्या सर्व कंटेनराइज्ड सेवा प्रदर्शित करतात. तुमच्या लक्षात येईल की एकच नोड, ज्यामध्ये EL क्लायंट आणि CL क्लायंट दोन्ही आहेत, तयार केला गेला आहे.

## तुमचे dApp डेव्हलपमेंट एन्व्हायर्नमेंट स्थानिक Ethereum टेस्टनेटशी कनेक्ट करा {#connect-your-dapp}

### dApp डेव्हलपमेंट एन्व्हायर्नमेंट सेटअप करा {#set-up-dapp-env}

आता तुमच्याकडे एक चालू स्थानिक टेस्टनेट असल्यामुळे, तुम्ही तुमचा स्थानिक टेस्टनेट वापरण्यासाठी तुमचे dApp डेव्हलपमेंट एन्व्हायर्नमेंट कनेक्ट करू शकता. या मार्गदर्शकामध्ये तुमच्या स्थानिक टेस्टनेटवर एक ब्लॅकजॅक dApp तैनात करण्यासाठी Hardhat फ्रेमवर्कचा वापर केला जाईल.

तुमचे dApp डेव्हलपमेंट एन्व्हायर्नमेंट सेटअप करण्यासाठी, आमचे सॅम्पल dApp असलेल्या रिपॉझिटरीला क्लोन करा आणि त्याच्या डिपेन्डन्सीज इंस्टॉल करा, चालवा:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

येथे वापरलेल्या [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) फोल्डरमध्ये [Hardhat](https://hardhat.org/) फ्रेमवर्क वापरणाऱ्या dApp डेव्हलपरसाठी एक सामान्य सेटअप आहे:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) मध्ये ब्लॅकजॅक dApp साठी काही सोपे स्मार्ट कॉन्ट्रॅक्ट्स आहेत
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) मध्ये तुमच्या स्थानिक Ethereum नेटवर्कवर टोकन कॉन्ट्रॅक्ट तैनात करण्यासाठी एक स्क्रिप्ट आहे
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) मध्ये तुमच्या टोकन कॉन्ट्रॅक्टसाठी एक सोपी .js चाचणी आहे, जी निश्चित करते की आमच्या ब्लॅकजॅक dApp मधील प्रत्येक खेळाडूसाठी 1000 मिंट केले आहेत
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) तुमचा Hardhat सेटअप कॉन्फिगर करते

### स्थानिक टेस्टनेट वापरण्यासाठी Hardhat कॉन्फिगर करा {#configure-hardhat}

तुमचे dApp डेव्हलपमेंट एन्व्हायर्नमेंट सेटअप झाल्यावर, तुम्ही आता Kurtosis वापरून तयार केलेला स्थानिक Ethereum टेस्टनेट वापरण्यासाठी Hardhat कनेक्ट कराल. हे पूर्ण करण्यासाठी, तुमच्या `hardhat.config.ts` कॉन्फिग फाइलमधील `localnet` स्ट्रक्टमध्ये `<$YOUR_PORT>` च्या जागी कोणत्याही `el-client-<num>` सेवेच्या rpc uri आउटपुटचा पोर्ट टाका. या नमुना केसमध्ये, पोर्ट `64248` असेल. तुमचा पोर्ट वेगळा असेल.

`hardhat.config.ts` मधील उदाहरण:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT च्या जागी ETH नेटवर्क KURTOSIS पॅकेजद्वारे तयार केलेल्या नोड URI चा पोर्ट टाका

// हे eth-network-package द्वारे तयार केलेल्या प्रीफंडेड टेस्ट अकाउंट्सशी संबंधित प्रायव्हेट की आहेत
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

एकदा तुम्ही तुमची फाइल सेव्ह केली की, तुमचे Hardhat dApp डेव्हलपमेंट एन्व्हायर्नमेंट आता तुमच्या स्थानिक Ethereum टेस्टनेटशी कनेक्ट झाले आहे! तुम्ही हे चालवून तुमचा टेस्टनेट कार्यरत असल्याची खात्री करू शकता:

```python
npx hardhat balances --network localnet
```

आउटपुट काहीसे असे दिसेल:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

हे निश्चित करते की Hardhat तुमचा स्थानिक टेस्टनेट वापरत आहे आणि `eth-network-package` द्वारे तयार केलेली प्री-फंडेड अकाउंट्स शोधत आहे.

### तुमचे dApp स्थानिक पातळीवर तैनात आणि चाचणी करा {#deploy-and-test-dapp}

dApp डेव्हलपमेंट एन्व्हायर्नमेंट स्थानिक Ethereum टेस्टनेटशी पूर्णपणे कनेक्ट झाल्यावर, तुम्ही आता स्थानिक टेस्टनेट वापरून तुमच्या dApp वर डेव्हलपमेंट आणि टेस्टिंग वर्कफ्लो चालवू शकता.

`ChipToken.sol` स्मार्ट कॉन्ट्रॅक्ट स्थानिक प्रोटोटाइपिंग आणि डेव्हलपमेंटसाठी कंपाईल आणि तैनात करण्यासाठी, चालवा:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

आउटपुट काहीसे असे दिसेल:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

आता तुमच्या स्थानिक dApp वर `simple.js` चाचणी चालवून हे निश्चित करा की आमच्या ब्लॅकजॅक dApp मधील प्रत्येक खेळाडूसाठी 1000 मिंट केले आहेत:

आउटपुट काहीसे असे दिसेल:

```python
npx hardhat test --network localnet
```

आउटपुट काहीसे असे दिसेल:

```python
ChipToken
    mint
      ✔ PLAYER ONE साठी 1000 चिप्स मिंट केले पाहिजेत

  1 उत्तीर्ण (654ms)
```

### पुनरावलोकन {#review-dapp-workflows}

या टप्प्यावर, तुम्ही आता एक dApp डेव्हलपमेंट एन्व्हायर्नमेंट सेटअप केले आहे, ते Kurtosis द्वारे तयार केलेल्या स्थानिक Ethereum नेटवर्कशी कनेक्ट केले आहे, आणि तुमच्या dApp वर एक सोपी चाचणी कंपाईल, तैनात आणि चालवली आहे.

आता आपण पाहूया की वेगवेगळ्या नेटवर्क कॉन्फिगरेशनमध्ये आमचे dApps चाचणीसाठी तुम्ही मूळ नेटवर्क कसे कॉन्फिगर करू शकता.

## स्थानिक Ethereum टेस्टनेट कॉन्फिगर करणे {#configure-testnet}

### क्लायंट कॉन्फिगरेशन आणि नोड्सची संख्या बदलणे {#configure-client-config-and-num-nodes}

तुमचा स्थानिक Ethereum टेस्टनेट तुम्ही कोणत्या परिस्थितीत आणि कोणत्या विशिष्ट नेटवर्क कॉन्फिगरेशनवर विकसित किंवा चाचणी करू इच्छिता यावर अवलंबून, वेगवेगळे EL आणि CL क्लायंट पेअर्स तसेच वेगवेगळ्या संख्येने नोड्स वापरण्यासाठी कॉन्फिगर केला जाऊ शकतो. याचा अर्थ, एकदा सेटअप झाल्यावर, तुम्ही एक सानुकूलित स्थानिक टेस्टनेट सुरू करू शकता आणि तेच वर्कफ्लो (तैनाती, चाचण्या, इत्यादी) चालवण्यासाठी त्याचा वापर करू शकता. सर्वकाही अपेक्षेप्रमाणे कार्य करते याची खात्री करण्यासाठी विविध नेटवर्क कॉन्फिगरेशन अंतर्गत. तुम्ही सुधारित करू शकता अशा इतर पॅरामीटर्सबद्दल अधिक जाणून घेण्यासाठी, या लिंकला भेट द्या.

प्रयत्न करून पहा! तुम्ही एका JSON फाइलद्वारे `eth-network-package` ला विविध कॉन्फिगरेशन पर्याय पास करू शकता. ही नेटवर्क पॅराम्स JSON फाइल विशिष्ट कॉन्फिगरेशन्स प्रदान करते जे Kurtosis स्थानिक Ethereum नेटवर्क सेटअप करण्यासाठी वापरेल.

डीफॉल्ट कॉन्फिगरेशन फाइल घ्या आणि ती वेगवेगळ्या EL/CL पेअर्ससह तीन नोड्स सुरू करण्यासाठी संपादित करा:

- नोड 1 `geth`/`lighthouse` सह
- नोड 2 `geth`/`lodestar` सह
- नोड 3 `geth`/`teku` सह

हे कॉन्फिगरेशन तुमच्या dApp च्या चाचणीसाठी Ethereum नोड अंमलबजावणीचे एक विषम नेटवर्क तयार करते. तुमची कॉन्फिगरेशन फाइल आता अशी दिसली पाहिजे:

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

प्रत्येक `participants` स्ट्रक्ट नेटवर्कमधील एका नोडला मॅप करतो, म्हणून 3 `participants` स्ट्रक्ट्स Kurtosis ला तुमच्या नेटवर्कमध्ये 3 नोड्स सुरू करण्यास सांगतील. प्रत्येक `participants` स्ट्रक्ट तुम्हाला त्या विशिष्ट नोडसाठी वापरलेली EL आणि CL जोडी निर्दिष्ट करण्याची परवानगी देईल.

`network_params` स्ट्रक्ट नेटवर्क सेटिंग्ज कॉन्फिगर करतो ज्या प्रत्येक नोडसाठी जेनेसिस फाइल्स तयार करण्यासाठी वापरल्या जातात, तसेच नेटवर्कच्या प्रति स्लॉट सेकंद यासारख्या इतर सेटिंग्ज.

तुमची संपादित पॅराम्स फाइल तुम्हाला पाहिजे त्या डिरेक्टरीमध्ये सेव्ह करा (खालील उदाहरणात, ती डेस्कटॉपवर सेव्ह केली आहे) आणि नंतर तुमचे Kurtosis पॅकेज चालवण्यासाठी खालील कमांड चालवून त्याचा वापर करा:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

टीप: `kurtosis clean -a` कमांड येथे Kurtosis ला नवीन टेस्टनेट सुरू करण्यापूर्वी जुने टेस्टनेट आणि त्यातील सामग्री नष्ट करण्याचा निर्देश देण्यासाठी वापरली आहे.

पुन्हा, Kurtosis थोडा वेळ काम करेल आणि होत असलेले वैयक्तिक टप्पे प्रिंट करेल. अखेरीस, आउटपुट काहीसे असे दिसेल:

```python
Starlark कोड यशस्वीरित्या चालला. कोणतेही आउटपुट परत आले नाही.
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

अभिनंदन! तुम्ही तुमचे स्थानिक टेस्टनेट 1 ऐवजी 3 नोड्स ठेवण्यासाठी यशस्वीरित्या कॉन्फिगर केले आहे. तुमच्या dApp वर तुम्ही पूर्वी केलेले तेच वर्कफ्लो (तैनात आणि चाचणी) चालवण्यासाठी, तुमच्या `hardhat.config.ts` कॉन्फिग फाइलमधील `localnet` स्ट्रक्टमध्ये `<$YOUR_PORT>` च्या जागी तुमच्या नवीन, 3-नोड स्थानिक टेस्टनेटमधील कोणत्याही `el-client-<num>` सेवेच्या rpc uri आउटपुटचा पोर्ट टाकून आम्ही पूर्वी केलेल्या त्याच क्रिया करा.

## निष्कर्ष {#conclusion}

आणि झाले! या छोट्या मार्गदर्शकाचा सारांश, तुम्ही:

- Kurtosis वापरून Docker वर एक स्थानिक Ethereum टेस्टनेट तयार केले
- तुमचे स्थानिक dApp डेव्हलपमेंट एन्व्हायर्नमेंट स्थानिक Ethereum नेटवर्कशी कनेक्ट केले
- स्थानिक Ethereum नेटवर्कवर एक dApp तैनात केले आणि त्यावर एक सोपी चाचणी चालवली
- मूळ Ethereum नेटवर्कला 3 नोड्स ठेवण्यासाठी कॉन्फिगर केले

तुमच्यासाठी काय चांगले झाले, काय सुधारले जाऊ शकते, यावर आम्हाला तुमच्याकडून ऐकायला आवडेल, किंवा तुमच्या कोणत्याही प्रश्नांची उत्तरे द्यायला आवडेल. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) द्वारे किंवा [आम्हाला ईमेल करा](mailto:feedback@kurtosistech.com) यावर संपर्क साधण्यास संकोच करू नका!

### इतर उदाहरणे आणि मार्गदर्शक {#other-examples-guides}

आम्ही तुम्हाला आमचे [क्विकस्टार्ट](https://docs.kurtosis.com/quickstart) (जिथे तुम्ही एक Postgres डेटाबेस आणि API तयार कराल) आणि आमच्या [awesome-kurtosis रिपॉझिटरी](https://github.com/kurtosis-tech/awesome-kurtosis) मधील आमची इतर उदाहरणे तपासण्यासाठी प्रोत्साहित करतो, जिथे तुम्हाला काही उत्तम उदाहरणे मिळतील, ज्यात यांसाठी पॅकेजेस आहेत:

- [तेच स्थानिक Ethereum टेस्टनेट सुरू करणे](https://github.com/kurtosis-tech/eth2-package), परंतु ट्रान्झॅक्शन स्पॅमर (ट्रान्झॅक्शन सिम्युलेट करण्यासाठी), एक फोर्क मॉनिटर, आणि एक कनेक्टेड Grafana आणि Prometheus इन्स्टन्स यासारख्या अतिरिक्त सेवा कनेक्ट केलेल्या.
- त्याच स्थानिक Ethereum नेटवर्कवर [सब-नेटवर्किंग चाचणी](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) करणे
