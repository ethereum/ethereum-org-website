---
title: स्थानिक, मल्टी-क्लायंट टेस्टनेटवर विकेंद्रित ॲप्लिकेशन (dapp) कसे विकसित आणि तपासले जावे
description: हे मार्गदर्शक तुम्हाला विकेंद्रित ॲप्लिकेशन (dapp) प्रस्थापित आणि तपासण्यासाठी टेस्टनेट वापरण्यापूर्वी मल्टी-क्लायंट स्थानिक इथेरियम टेस्टनेट कसे सुरू आणि कॉन्फिगर करावे हे दाखवेल.
author: "टेडी मितिकू"
tags:
  [
    "क्लायंट्स",
    "नोड्स",
    "स्मार्ट कॉन्ट्रॅक्ट्स",
    "संयोज्यता",
    "सहमती स्तर",
    "अंमलबजावणी स्तर",
    "चाचणी",
  ]
skill: intermediate
breadcrumb: मल्टी-क्लायंट टेस्टनेट
lang: mr
published: 2023-04-11
---

## परिचय {#introduction}

हे मार्गदर्शक तुम्हाला कॉन्फिगर करण्यायोग्य स्थानिक इथेरियम टेस्टनेट सुरू करण्याची, त्यावर स्मार्ट कॉन्ट्रॅक्ट प्रस्थापित करण्याची आणि तुमच्या विकेंद्रित ॲप्लिकेशन (dapp) ची चाचणी घेण्यासाठी टेस्टनेट वापरण्याची प्रक्रिया समजावून सांगते. हे मार्गदर्शक अशा dapp डेव्हलपर्ससाठी डिझाइन केले आहे ज्यांना थेट टेस्टनेट किंवा मुख्यनेटवर प्रस्थापित करण्यापूर्वी वेगवेगळ्या नेटवर्क कॉन्फिगरेशनवर त्यांचे dapps स्थानिक पातळीवर विकसित आणि तपासायचे आहेत.

या मार्गदर्शकामध्ये, तुम्ही:

- [Kurtosis](https://www.kurtosis.com/) वापरून [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) सह स्थानिक इथेरियम टेस्टनेट सुरू कराल,
- dapp संकलित करण्यासाठी, प्रस्थापित करण्यासाठी आणि तपासण्यासाठी तुमचे Hardhat dapp डेव्हलपमेंट वातावरण स्थानिक टेस्टनेटशी कनेक्ट कराल, आणि
- विविध नेटवर्क कॉन्फिगरेशनवर डेव्हलपमेंट आणि चाचणी वर्कफ्लो सक्षम करण्यासाठी नोड्सची संख्या आणि विशिष्ट EL/CL क्लायंट जोड्यांसारख्या पॅरामीटर्ससह स्थानिक टेस्टनेट कॉन्फिगर कराल.

### Kurtosis म्हणजे काय? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ही मल्टी-कंटेनर चाचणी वातावरणे कॉन्फिगर करण्यासाठी डिझाइन केलेली एक संयोज्य बिल्ड प्रणाली आहे. हे विशेषतः डेव्हलपर्सना ब्लॉकचेन टेस्टनेटसारख्या डायनॅमिक सेटअप लॉजिकची आवश्यकता असलेली पुनरुत्पादक वातावरणे तयार करण्यास सक्षम करते.

या मार्गदर्शकामध्ये, Kurtosis eth-network-package [`geth`](https://geth.ethereum.org/) अंमलबजावणी स्तर (EL) क्लायंट, तसेच [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), आणि [`lodestar`](https://lodestar.chainsafe.io/) सहमती स्तर (CL) क्लायंट्सच्या समर्थनासह स्थानिक इथेरियम टेस्टनेट सुरू करते. हे पॅकेज Hardhat Network, Ganache आणि Anvil सारख्या फ्रेमवर्क्समधील नेटवर्क्ससाठी कॉन्फिगर करण्यायोग्य आणि संयोज्य पर्याय म्हणून काम करते. Kurtosis डेव्हलपर्सना ते वापरत असलेल्या टेस्टनेट्सवर अधिक नियंत्रण आणि लवचिकता देते, हेच एक प्रमुख कारण आहे की [इथेरियम फाउंडेशनने द मर्ज तपासण्यासाठी Kurtosis वापरले](https://www.kurtosis.com/blog/testing-the-ethereum-merge) आणि नेटवर्क अपग्रेड्स तपासण्यासाठी त्याचा वापर करणे सुरू ठेवले आहे.

## Kurtosis सेट करणे {#setting-up-kurtosis}

पुढे जाण्यापूर्वी, तुमच्याकडे खालील गोष्टी असल्याची खात्री करा:

- तुमच्या स्थानिक मशीनवर [Docker इंजिन स्थापित आणि सुरू केले आहे](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI स्थापित केले आहे](https://docs.kurtosis.com/install#ii-install-the-cli) (किंवा तुमच्याकडे आधीपासूनच CLI स्थापित असल्यास ते नवीनतम आवृत्तीवर अपग्रेड केले आहे)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), आणि [npx](https://www.npmjs.com/package/npx) स्थापित केले आहे (तुमच्या dapp वातावरणासाठी)

## स्थानिक इथेरियम टेस्टनेट सुरू करणे {#instantiate-testnet}

स्थानिक इथेरियम टेस्टनेट सुरू करण्यासाठी, हे रन करा:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

टीप: ही कमांड `--enclave` फ्लॅग वापरून तुमच्या नेटवर्कला "local-eth-testnet" असे नाव देते.

Kurtosis सूचनांचा अर्थ लावण्यासाठी, प्रमाणित करण्यासाठी आणि नंतर त्यांची अंमलबजावणी करण्यासाठी काम करत असताना अंतर्गतपणे घेत असलेल्या पायऱ्या प्रिंट करेल. शेवटी, तुम्हाला खालीलप्रमाणे आउटपुट दिसेल:

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

अभिनंदन! तुम्ही Docker वर CL (`lighthouse`) आणि EL क्लायंट (`geth`) सह स्थानिक इथेरियम टेस्टनेट सुरू करण्यासाठी Kurtosis वापरले.

### आढावा {#review-instantiate-testnet}

या विभागात, तुम्ही एक कमांड कार्यान्वित केली जिने Kurtosis ला Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) मध्ये स्थानिक इथेरियम टेस्टनेट सुरू करण्यासाठी [GitHub वर दूरस्थपणे होस्ट केलेले `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) वापरण्याचे निर्देश दिले. तुमच्या एन्क्लेव्हमध्ये, तुम्हाला "file artifacts" आणि "user services" दोन्ही मिळतील.

तुमच्या एन्क्लेव्हमधील [File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) मध्ये EL आणि CL क्लायंट्स बूटस्ट्रॅप करण्यासाठी व्युत्पन्न केलेला आणि वापरलेला सर्व डेटा समाविष्ट आहे. हा डेटा या [Docker इमेज](https://github.com/ethpandaops/ethereum-genesis-generator) मधून तयार केलेली `prelaunch-data-generator` सेवा वापरून तयार केला गेला होता.

वापरकर्ता सेवा तुमच्या एन्क्लेव्हमध्ये कार्यरत असलेल्या सर्व कंटेनराइज्ड सेवा प्रदर्शित करतात. तुमच्या लक्षात येईल की EL क्लायंट आणि CL क्लायंट दोन्ही वैशिष्ट्यीकृत करणारा एकच नोड तयार केला गेला आहे.

## तुमचे dapp डेव्हलपमेंट वातावरण स्थानिक इथेरियम टेस्टनेटशी कनेक्ट करा {#connect-your-dapp}

### dapp डेव्हलपमेंट वातावरण सेट करा {#set-up-dapp-env}

आता तुमच्याकडे कार्यरत स्थानिक टेस्टनेट असल्याने, तुम्ही तुमचे स्थानिक टेस्टनेट वापरण्यासाठी तुमचे dapp डेव्हलपमेंट वातावरण कनेक्ट करू शकता. या मार्गदर्शकामध्ये तुमच्या स्थानिक टेस्टनेटवर ब्लॅकजॅक dapp प्रस्थापित करण्यासाठी Hardhat फ्रेमवर्क वापरले जाईल.

तुमचे dapp डेव्हलपमेंट वातावरण सेट करण्यासाठी, आमचे नमुना dapp असलेल्या रिपॉझिटरीचे क्लोन करा आणि त्याचे अवलंबित्व स्थापित करा, हे रन करा:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

येथे वापरलेल्या [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) फोल्डरमध्ये [Hardhat](https://hardhat.org/) फ्रेमवर्क वापरणाऱ्या dapp डेव्हलपरसाठी सामान्य सेटअप आहे:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) मध्ये ब्लॅकजॅक dapp साठी काही सोपे स्मार्ट कॉन्ट्रॅक्ट्स आहेत
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) मध्ये तुमच्या स्थानिक इथेरियम नेटवर्कवर टोकन कॉन्ट्रॅक्ट प्रस्थापित करण्यासाठी एक स्क्रिप्ट आहे
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) मध्ये तुमच्या टोकन कॉन्ट्रॅक्टसाठी एक साधी .js चाचणी आहे जी आमच्या ब्लॅकजॅक dapp मधील प्रत्येक खेळाडूसाठी 1000 मिंट केले आहेत याची पुष्टी करते
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) तुमचा Hardhat सेटअप कॉन्फिगर करते

### स्थानिक टेस्टनेट वापरण्यासाठी Hardhat कॉन्फिगर करा {#configure-hardhat}

तुमचे dapp डेव्हलपमेंट वातावरण सेट केल्यावर, तुम्ही आता Kurtosis वापरून व्युत्पन्न केलेले स्थानिक इथेरियम टेस्टनेट वापरण्यासाठी Hardhat कनेक्ट कराल. हे साध्य करण्यासाठी, तुमच्या `hardhat.config.ts` कॉन्फिग फाइलमधील `localnet` स्ट्रक्टमधील `<$YOUR_PORT>` ला कोणत्याही `el-client-<num>` सेवेच्या rpc uri आउटपुटच्या पोर्टने बदला. या नमुना प्रकरणात, पोर्ट `64248` असेल. तुमचा पोर्ट वेगळा असेल.

`hardhat.config.ts` मधील उदाहरण:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT ला ETH नेटवर्क Kurtosis पॅकेजद्वारे तयार केलेल्या नोड URI च्या पोर्टने बदला

// या eth-network-package द्वारे तयार केलेल्या पूर्व-निधीत चाचणी खात्यांशी संबंधित खाजगी की आहेत
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

एकदा तुम्ही तुमची फाइल सेव्ह केली की, तुमचे Hardhat dapp डेव्हलपमेंट वातावरण आता तुमच्या स्थानिक इथेरियम टेस्टनेटशी कनेक्ट झाले आहे! तुम्ही हे रन करून तुमचे टेस्टनेट काम करत आहे याची पडताळणी करू शकता:

```python
npx hardhat balances --network localnet
```

आउटपुट यासारखे काहीतरी दिसावे:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

हे पुष्टी करते की Hardhat तुमचे स्थानिक टेस्टनेट वापरत आहे आणि `eth-network-package` द्वारे तयार केलेली पूर्व-निधी असलेली खाती शोधते.

### तुमचे dapp स्थानिक पातळीवर प्रस्थापित करा आणि तपासा {#deploy-and-test-dapp}

dapp डेव्हलपमेंट वातावरण स्थानिक इथेरियम टेस्टनेटशी पूर्णपणे कनेक्ट झाल्यामुळे, तुम्ही आता स्थानिक टेस्टनेट वापरून तुमच्या dapp वर डेव्हलपमेंट आणि चाचणी वर्कफ्लो चालवू शकता.

स्थानिक प्रोटोटायपिंग आणि डेव्हलपमेंटसाठी `ChipToken.sol` स्मार्ट कॉन्ट्रॅक्ट संकलित आणि प्रस्थापित करण्यासाठी, हे रन करा:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

आउटपुट यासारखे काहीतरी दिसावे:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

आता आमच्या ब्लॅकजॅक dapp मधील प्रत्येक खेळाडूसाठी 1000 मिंट केले आहेत याची पुष्टी करण्यासाठी तुमच्या स्थानिक dapp वर `simple.js` चाचणी चालवण्याचा प्रयत्न करा:

आउटपुट यासारखे काहीतरी दिसावे:

```python
npx hardhat test --network localnet
```

आउटपुट यासारखे काहीतरी दिसावे:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### आढावा {#review-dapp-workflows}

या टप्प्यावर, तुम्ही आता एक dapp डेव्हलपमेंट वातावरण सेट केले आहे, ते Kurtosis द्वारे तयार केलेल्या स्थानिक इथेरियम नेटवर्कशी कनेक्ट केले आहे, आणि तुमच्या dapp वर एक साधी चाचणी संकलित, प्रस्थापित आणि चालवली आहे.

आता आपण वेगवेगळ्या नेटवर्क कॉन्फिगरेशन अंतर्गत आमच्या dapps ची चाचणी घेण्यासाठी अंतर्निहित नेटवर्क कसे कॉन्फिगर करू शकता ते पाहूया.

## स्थानिक इथेरियम टेस्टनेट कॉन्फिगर करणे {#configure-testnet}

### क्लायंट कॉन्फिगरेशन आणि नोड्सची संख्या बदलणे {#configure-client-config-and-num-nodes}

तुम्हाला विकसित किंवा चाचणी करायच्या असलेल्या परिस्थिती आणि विशिष्ट नेटवर्क कॉन्फिगरेशनवर अवलंबून, तुमचे स्थानिक इथेरियम टेस्टनेट भिन्न EL आणि CL क्लायंट जोड्या, तसेच नोड्सची भिन्न संख्या वापरण्यासाठी कॉन्फिगर केले जाऊ शकते. याचा अर्थ असा की, एकदा सेट केल्यावर, तुम्ही सानुकूलित स्थानिक टेस्टनेट सुरू करू शकता आणि सर्वकाही अपेक्षेप्रमाणे कार्य करत असल्याची खात्री करण्यासाठी विविध नेटवर्क कॉन्फिगरेशन अंतर्गत समान वर्कफ्लो (प्रस्थापना, चाचण्या इ.) चालवण्यासाठी त्याचा वापर करू शकता. तुम्ही सुधारित करू शकणाऱ्या इतर पॅरामीटर्सबद्दल अधिक जाणून घेण्यासाठी, या लिंकला भेट द्या.

प्रयत्न करून पहा! तुम्ही JSON फाइलद्वारे `eth-network-package` ला विविध कॉन्फिगरेशन पर्याय पास करू शकता. ही नेटवर्क पॅरामीटर्स JSON फाइल विशिष्ट कॉन्फिगरेशन प्रदान करते जे Kurtosis स्थानिक इथेरियम नेटवर्क सेट करण्यासाठी वापरेल.

डीफॉल्ट कॉन्फिगरेशन फाइल घ्या आणि भिन्न EL/CL जोड्यांसह दोन नोड्स सुरू करण्यासाठी ती संपादित करा:

- `geth`/`lighthouse` सह नोड 1
- `geth`/`lodestar` सह नोड 2
- `geth`/`teku` सह नोड 3

हे कॉन्फिगरेशन तुमच्या dapp च्या चाचणीसाठी इथेरियम नोड अंमलबजावणीचे एक विषम नेटवर्क तयार करते. तुमची कॉन्फिगरेशन फाइल आता अशी दिसली पाहिजे:

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

प्रत्येक `participants` स्ट्रक्ट नेटवर्कमधील नोडशी मॅप करते, त्यामुळे 3 `participants` स्ट्रक्ट्स Kurtosis ला तुमच्या नेटवर्कमध्ये 3 नोड्स सुरू करण्यास सांगतील. प्रत्येक `participants` स्ट्रक्ट तुम्हाला त्या विशिष्ट नोडसाठी वापरलेली EL आणि CL जोडी निर्दिष्ट करण्याची अनुमती देईल.

`network_params` स्ट्रक्ट नेटवर्क सेटिंग्ज कॉन्फिगर करते ज्याचा वापर प्रत्येक नोडसाठी जेनेसिस फाइल्स तयार करण्यासाठी तसेच नेटवर्कच्या प्रति स्लॉट सेकंदांसारख्या इतर सेटिंग्जसाठी केला जातो.

तुमची संपादित पॅरामीटर्स फाइल तुम्हाला हव्या असलेल्या कोणत्याही डिरेक्टरीमध्ये सेव्ह करा (खालील उदाहरणात, ती डेस्कटॉपवर सेव्ह केली आहे) आणि नंतर हे रन करून तुमचे Kurtosis पॅकेज चालवण्यासाठी त्याचा वापर करा:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

टीप: नवीन सुरू करण्यापूर्वी जुने टेस्टनेट आणि त्यातील सामग्री नष्ट करण्यासाठी Kurtosis ला सूचना देण्यासाठी येथे `kurtosis clean -a` कमांड वापरली जाते.

पुन्हा, Kurtosis थोडा वेळ काम करेल आणि होत असलेल्या वैयक्तिक पायऱ्या प्रिंट करेल. शेवटी, आउटपुट यासारखे काहीतरी दिसावे:

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

अभिनंदन! तुम्ही तुमचे स्थानिक टेस्टनेट 1 ऐवजी 3 नोड्स असण्यासाठी यशस्वीरित्या कॉन्फिगर केले आहे. तुमच्या dapp वर तुम्ही आधी केलेले समान वर्कफ्लो (प्रस्थापित आणि चाचणी) चालवण्यासाठी, तुमच्या नवीन, 3-नोड स्थानिक टेस्टनेटमधील कोणत्याही `el-client-<num>` सेवेच्या rpc uri आउटपुटच्या पोर्टसह तुमच्या `hardhat.config.ts` कॉन्फिग फाइलमधील `localnet` स्ट्रक्टमधील `<$YOUR_PORT>` बदलून आम्ही आधी केलेल्या समान ऑपरेशन्स करा.

## निष्कर्ष {#conclusion}

आणि एवढेच! या लहान मार्गदर्शकाचा सारांश सांगायचा तर, तुम्ही:

- Kurtosis वापरून Docker वर स्थानिक इथेरियम टेस्टनेट तयार केले
- तुमचे स्थानिक dapp डेव्हलपमेंट वातावरण स्थानिक इथेरियम नेटवर्कशी कनेक्ट केले
- स्थानिक इथेरियम नेटवर्कवर dapp प्रस्थापित केले आणि त्यावर एक साधी चाचणी चालवली
- अंतर्निहित इथेरियम नेटवर्क 3 नोड्स असण्यासाठी कॉन्फिगर केले

तुमच्यासाठी काय चांगले झाले, काय सुधारले जाऊ शकते याबद्दल तुमच्याकडून ऐकायला किंवा तुमच्या कोणत्याही प्रश्नांची उत्तरे द्यायला आम्हाला आवडेल. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) द्वारे संपर्क साधण्यास किंवा [आम्हाला ईमेल करण्यास](mailto:feedback@kurtosistech.com) संकोच करू नका!

### इतर उदाहरणे आणि मार्गदर्शके {#other-examples-guides}

आम्ही तुम्हाला आमचे [क्विकस्टार्ट](https://docs.kurtosis.com/quickstart) (जिथे तुम्ही Postgres डेटाबेस आणि त्यावर API तयार कराल) आणि आमच्या [awesome-kurtosis रिपॉझिटरीमधील](https://github.com/kurtosis-tech/awesome-kurtosis) आमची इतर उदाहरणे तपासण्यासाठी प्रोत्साहित करतो जिथे तुम्हाला काही उत्तम उदाहरणे मिळतील, ज्यामध्ये खालील पॅकेजेस समाविष्ट आहेत:

- [तेच स्थानिक इथेरियम टेस्टनेट सुरू करणे](https://github.com/kurtosis-tech/eth2-package), परंतु व्यवहार स्पॅमर (व्यवहारांचे अनुकरण करण्यासाठी), फोर्क मॉनिटर आणि कनेक्ट केलेले Grafana आणि Prometheus इन्स्टन्स यांसारख्या अतिरिक्त सेवा कनेक्ट केलेल्या आहेत
- त्याच स्थानिक इथेरियम नेटवर्कवर [सब-नेटवर्किंग चाचणी](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) करणे