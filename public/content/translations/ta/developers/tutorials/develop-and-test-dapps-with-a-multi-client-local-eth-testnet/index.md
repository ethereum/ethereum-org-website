---
title: "ஒரு உள்ளூர், பல-கிளையன்ட் டெஸ்ட்நெட்டில் ஒரு dApp-ஐ உருவாக்குவது மற்றும் சோதிப்பது எப்படி"
description: "இந்த வழிகாட்டி, டெஸ்ட்நெட்டைப் பயன்படுத்தி ஒரு dApp-ஐ வரிசைப்படுத்தி & சோதிப்பதற்கு முன், ஒரு பல-கிளையன்ட் உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை எப்படி துவக்குவது மற்றும் கட்டமைப்பது என்பதை முதலில் உங்களுக்கு விளக்கும்."
author: "Tedi Mitiku"
tags:
  [
    "கிளையண்டுகள்",
    "முனைகள்",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "இணைதிறன்",
    "ஒருமித்த கருத்து அடுக்கு",
    "செயலாக்க அடுக்கு",
    "சோதனை"
  ]
skill: intermediate
lang: ta
published: 2023-04-11
---

## அறிமுகம் {#introduction}

இந்த வழிகாட்டியானது, கட்டமைக்கக்கூடிய உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்குதல், அதில் ஒரு ஸ்மார்ட் ஒப்பந்தத்தை வரிசைப்படுத்துதல் மற்றும் உங்கள் dApp-க்கு எதிராக சோதனைகளை இயக்க டெஸ்ட்நெட்டைப் பயன்படுத்துதல் ஆகிய செயல்முறைகளை உங்களுக்கு விளக்குகிறது. நேரடி டெஸ்ட்நெட் அல்லது மெயின்நெட்டில் வரிசைப்படுத்துவதற்கு முன், வெவ்வேறு நெட்வொர்க் கட்டமைப்புகளுக்கு எதிராக தங்கள் dApp-களை உள்ளூரில் உருவாக்கி சோதிக்க விரும்பும் dApp உருவாக்குநர்களுக்காக இந்த வழிகாட்டி வடிவமைக்கப்பட்டுள்ளது.

இந்த வழிகாட்டியில், நீங்கள்:

- [Kurtosis](https://www.kurtosis.com/) ஐப் பயன்படுத்தி [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) உடன் ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்கவும்,
- ஒரு dApp-ஐ தொகுத்து, வரிசைப்படுத்தி, சோதிக்க உங்கள் Hardhat dApp மேம்பாட்டு சூழலை உள்ளூர் டெஸ்ட்நெட்டுடன் இணைக்கவும், மற்றும்
- பல்வேறு நெட்வொர்க் கட்டமைப்புகளுக்கு எதிரான மேம்பாடு மற்றும் சோதனை பணிப்பாய்வுகளை இயக்க, முனைகளின் எண்ணிக்கை மற்றும் குறிப்பிட்ட EL/CL கிளையன்ட் இணைப்புகள் போன்ற அளவுருக்கள் உட்பட உள்ளூர் டெஸ்ட்நெட்டை உள்ளமைக்கவும்.

### Kurtosis என்றால் என்ன? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) என்பது பல-கொள்கலன் சோதனை சூழல்களை கட்டமைப்பதற்காக வடிவமைக்கப்பட்ட ஒரு தொகுக்கக்கூடிய கட்டமைப்பு அமைப்பாகும். இது குறிப்பாக உருவாக்குநர்கள் பிளாக்செயின் டெஸ்ட்நெட்கள் போன்ற மாறும் அமைப்பு தர்க்கம் தேவைப்படும் மீண்டும் உருவாக்கக்கூடிய சூழல்களை உருவாக்க உதவுகிறது.

இந்த வழிகாட்டியில், Kurtosis eth-network-package ஆனது [`geth`](https://geth.ethereum.org/) செயலாக்க அடுக்கு (EL) கிளையன்ட், மற்றும் [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), மற்றும் [`lodestar`](https://lodestar.chainsafe.io/) ஒருமித்த கருத்து அடுக்கு (CL) கிளையன்ட்களுக்கான ஆதரவுடன் ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்குகிறது. இந்த தொகுப்பு Hardhat Network, Ganache, மற்றும் Anvil போன்ற கட்டமைப்புகளில் உள்ள நெட்வொர்க்குகளுக்கு ஒரு கட்டமைக்கக்கூடிய மற்றும் தொகுக்கக்கூடிய மாற்றாக செயல்படுகிறது. [Ethereum Foundation ஆனது The Merge-ஐ சோதிக்க Kurtosis-ஐப் பயன்படுத்தியது](https://www.kurtosis.com/blog/testing-the-ethereum-merge) மற்றும் நெட்வொர்க் மேம்படுத்தல்களைச் சோதிக்க தொடர்ந்து அதைப் பயன்படுத்துகிறது என்பதற்கு முக்கிய காரணம், Kurtosis உருவாக்குநர்களுக்கு அவர்கள் பயன்படுத்தும் டெஸ்ட்நெட்கள் மீது அதிக கட்டுப்பாடு மற்றும் நெகிழ்வுத்தன்மையை வழங்குகிறது.

## Kurtosis-ஐ அமைத்தல் {#setting-up-kurtosis}

நீங்கள் தொடர்வதற்கு முன், உங்களிடம் இருப்பதை உறுதிசெய்யவும்:

- உங்கள் உள்ளூர் கணினியில் [Docker engine-ஐ நிறுவித் தொடங்கியுள்ளீர்கள்](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI-ஐ நிறுவியுள்ளீர்கள்](https://docs.kurtosis.com/install#ii-install-the-cli) (அல்லது நீங்கள் ஏற்கனவே CLI-ஐ நிறுவியிருந்தால், அதை சமீபத்திய வெளியீட்டிற்கு மேம்படுத்தியுள்ளீர்கள்)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), மற்றும் [npx](https://www.npmjs.com/package/npx) ஐ நிறுவியுள்ளீர்கள் (உங்கள் dApp சூழலுக்காக)

## ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்குதல் {#instantiate-testnet}

ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை இயக்க, இயக்கவும்:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

குறிப்பு: இந்த கட்டளை உங்கள் நெட்வொர்க்கிற்கு "local-eth-testnet" என்று `--enclave` கொடியைப் பயன்படுத்தி பெயரிடுகிறது.

Kurtosis அறிவுறுத்தல்களைப் புரிந்துகொண்டு, சரிபார்த்து, பின்னர் செயல்படுத்தும் போது, அது மேற்கொள்ளும் படிகளை அச்சிடும். இறுதியில், பின்வருவனவற்றைப் போன்ற ஒரு வெளியீட்டைக் காண்பீர்கள்:

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

வாழ்த்துக்கள்! நீங்கள் Kurtosis-ஐப் பயன்படுத்தி, ஒரு CL (`lighthouse`) மற்றும் EL கிளையன்ட் (`geth`) உடன், Docker-ல் ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்கினீர்கள்.

### மதிப்பாய்வு {#review-instantiate-testnet}

இந்த பிரிவில், ஒரு Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) க்குள் ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்க [GitHub இல் தொலைவில் ஹோஸ்ட் செய்யப்பட்ட `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ஐப் பயன்படுத்த Kurtosis-க்கு வழிகாட்டும் ஒரு கட்டளையை நீங்கள் செயல்படுத்தினீர்கள். உங்கள் enclave-க்குள், "கோப்பு கலைப்பொருட்கள்" மற்றும் "பயனர் சேவைகள்" இரண்டையும் நீங்கள் காண்பீர்கள்.

உங்கள் enclave-ல் உள்ள [கோப்பு கலைப்பொருட்கள்](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) EL மற்றும் CL கிளையன்ட்களைத் துவக்க உருவாக்கப்பட்ட மற்றும் பயன்படுத்தப்பட்ட எல்லாத் தரவையும் உள்ளடக்கியது. இந்த [Docker இமேஜிலிருந்து](https://github.com/ethpandaops/ethereum-genesis-generator) உருவாக்கப்பட்ட `prelaunch-data-generator` சேவையைப் பயன்படுத்தி இந்தத் தரவு உருவாக்கப்பட்டது

பயனர் சேவைகள் உங்கள் enclave-ல் இயங்கும் கொள்கலன் சேவைகளைக் காட்டுகின்றன. ஒரு EL கிளையன்ட் மற்றும் ஒரு CL கிளையன்ட் இரண்டையும் கொண்ட ஒரு ஒற்றை முனை உருவாக்கப்பட்டுள்ளதை நீங்கள் கவனிப்பீர்கள்.

## உங்கள் dApp மேம்பாட்டு சூழலை உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டுடன் இணைக்கவும் {#connect-your-dapp}

### dApp மேம்பாட்டு சூழலை அமைக்கவும் {#set-up-dapp-env}

இப்போது உங்களிடம் இயங்கும் உள்ளூர் டெஸ்ட்நெட் இருப்பதால், உங்கள் உள்ளூர் டெஸ்ட்நெட்டைப் பயன்படுத்த உங்கள் dApp மேம்பாட்டு சூழலை இணைக்கலாம். இந்த வழிகாட்டியில், உங்கள் உள்ளூர் டெஸ்ட்நெட்டில் ஒரு பிளாக்ஜாக் dApp-ஐ வரிசைப்படுத்த Hardhat கட்டமைப்பு பயன்படுத்தப்படும்.

உங்கள் dApp மேம்பாட்டு சூழலை அமைக்க, எங்கள் மாதிரி dApp-ஐக் கொண்டிருக்கும் களஞ்சியத்தை குளோன் செய்து அதன் சார்புகளை நிறுவ, இயக்கவும்:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

இங்கு பயன்படுத்தப்படும் [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) கோப்புறை [Hardhat](https://hardhat.org/) கட்டமைப்பைப் பயன்படுத்தும் ஒரு dApp உருவாக்குநருக்கான பொதுவான அமைப்பைக் கொண்டுள்ளது:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) ஒரு பிளாக்ஜாக் dApp-க்கான சில எளிய ஸ்மார்ட் ஒப்பந்தங்களைக் கொண்டுள்ளது
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) உங்கள் உள்ளூர் எத்தேரியம் நெட்வொர்க்கில் ஒரு டோக்கன் ஒப்பந்தத்தை வரிசைப்படுத்துவதற்கான ஒரு ஸ்கிரிப்டைக் கொண்டுள்ளது
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) எங்கள் பிளாக்ஜாக் dApp-ல் உள்ள ஒவ்வொரு வீரருக்கும் 1000 டோக்கன்கள் அச்சிடப்பட்டதா என்பதை உறுதிப்படுத்த உங்கள் டோக்கன் ஒப்பந்தத்திற்கான ஒரு எளிய .js சோதனையைக் கொண்டுள்ளது
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) உங்கள் Hardhat அமைப்பை உள்ளமைக்கிறது

### உள்ளூர் டெஸ்ட்நெட்டைப் பயன்படுத்த Hardhat-ஐ உள்ளமைக்கவும் {#configure-hardhat}

உங்கள் dApp மேம்பாட்டு சூழல் அமைக்கப்பட்டவுடன், நீங்கள் இப்போது Kurtosis-ஐப் பயன்படுத்தி உருவாக்கப்பட்ட உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டைப் பயன்படுத்த Hardhat-ஐ இணைப்பீர்கள். இதைச் செய்ய, உங்கள் `hardhat.config.ts` உள்ளமைவு கோப்பில் உள்ள `localnet` அமைப்பில் `<$YOUR_PORT>` என்பதை ஏதேனும் `el-client-<num>` சேவையிலிருந்து வரும் rpc uri வெளியீட்டின் போர்ட்டுடன் மாற்றவும். இந்த மாதிரி வழக்கில், போர்ட் `64248` ஆக இருக்கும். உங்கள் போர்ட் வித்தியாசமாக இருக்கும்.

`hardhat.config.ts`-ல் எடுத்துக்காட்டு:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ETH நெட்வொர்க் கர்டோசிஸ் தொகுப்பினால் உருவாக்கப்பட்ட ஒரு முனை URI-யின் போர்ட்டுடன் $YOUR_PORT-ஐ மாற்றவும்

// இவை eth-network-package-ஆல் உருவாக்கப்பட்ட முன்-நிதியளிக்கப்பட்ட சோதனை கணக்குகளுடன் தொடர்புடைய தனிப்பட்ட விசைகள்
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

உங்கள் கோப்பைச் சேமித்தவுடன், உங்கள் Hardhat dApp மேம்பாட்டுச் சூழல் இப்போது உங்கள் உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டுடன் இணைக்கப்பட்டுள்ளது! உங்கள் டெஸ்ட்நெட் செயல்படுகிறதா என்பதை இயக்குவதன் மூலம் சரிபார்க்கலாம்:

```python
npx hardhat balances --network localnet
```

வெளியீடு இதுபோல இருக்கும்:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

இது Hardhat உங்கள் உள்ளூர் டெஸ்ட்நெட்டைப் பயன்படுத்துவதையும் `eth-network-package`-ஆல் உருவாக்கப்பட்ட முன்-நிதியளிக்கப்பட்ட கணக்குகளைக் கண்டறிவதையும் உறுதிப்படுத்துகிறது.

### உங்கள் dApp-ஐ உள்ளூரில் வரிசைப்படுத்தி சோதிக்கவும் {#deploy-and-test-dapp}

dApp மேம்பாட்டு சூழல் உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டுடன் முழுமையாக இணைக்கப்பட்டிருப்பதால், நீங்கள் இப்போது உள்ளூர் டெஸ்ட்நெட்டைப் பயன்படுத்தி உங்கள் dApp-க்கு எதிராக மேம்பாடு மற்றும் சோதனை பணிப்பாய்வுகளை இயக்கலாம்.

உள்ளூர் முன்மாதிரி மற்றும் மேம்பாட்டிற்காக `ChipToken.sol` ஸ்மார்ட் ஒப்பந்தத்தை தொகுத்து வரிசைப்படுத்த, இயக்கவும்:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

வெளியீடு இதுபோல இருக்கும்:

```python
ChipToken இங்கு வரிசைப்படுத்தப்பட்டது: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

இப்போது எங்கள் Blackjack dApp-ல் உள்ள ஒவ்வொரு வீரருக்கும் 1000 அச்சிடப்பட்டதா என்பதை உறுதிப்படுத்த உங்கள் உள்ளூர் dApp-க்கு எதிராக `simple.js` சோதனையை இயக்கவும்:

வெளியீடு இதுபோல இருக்கும்:

```python
npx hardhat test --network localnet
```

வெளியீடு இதுபோல இருக்கும்:

```python
ChipToken
    அச்சிடுதல்
      ✔ வீரர் ஒருவருக்கு 1000 சிப்களை அச்சிட வேண்டும்

  1 வெற்றி (654ms)
```

### மதிப்பாய்வு {#review-dapp-workflows}

இந்த கட்டத்தில், நீங்கள் ஒரு dApp மேம்பாட்டு சூழலை அமைத்துள்ளீர்கள், அதை Kurtosis ஆல் உருவாக்கப்பட்ட உள்ளூர் எத்தேரியம் நெட்வொர்க்குடன் இணைத்துள்ளீர்கள், மேலும் உங்கள் dApp-க்கு எதிராக ஒரு எளிய சோதனையை தொகுத்து, வரிசைப்படுத்தி, இயக்கியுள்ளீர்கள்.

இப்போது மாறுபட்ட நெட்வொர்க் கட்டமைப்புகளின் கீழ் எங்கள் dApp-களைச் சோதிக்க அடிப்படை நெட்வொர்க்கை எவ்வாறு உள்ளமைக்கலாம் என்பதை ஆராய்வோம்.

## உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உள்ளமைத்தல் {#configure-testnet}

### கிளையன்ட் கட்டமைப்புகள் மற்றும் முனைகளின் எண்ணிக்கையை மாற்றுதல் {#configure-client-config-and-num-nodes}

உங்கள் உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை நீங்கள் உருவாக்க அல்லது சோதிக்க விரும்பும் காட்சி மற்றும் குறிப்பிட்ட நெட்வொர்க் கட்டமைப்பைப் பொறுத்து, வெவ்வேறு EL மற்றும் CL கிளையன்ட் ஜோடிகளைப் பயன்படுத்தவும், அத்துடன் மாறுபட்ட எண்ணிக்கையிலான முனைகளைப் பயன்படுத்தவும் உள்ளமைக்க முடியும். இதன் பொருள், ஒருமுறை அமைக்கப்பட்டதும், நீங்கள் ஒரு தனிப்பயனாக்கப்பட்ட உள்ளூர் டெஸ்ட்நெட்டைத் தொடங்கி, அதே பணிப்பாய்வுகளை (வரிசைப்படுத்தல், சோதனைகள் போன்றவை) இயக்க அதைப் பயன்படுத்தலாம். எல்லாம் எதிர்பார்த்தபடி செயல்படுவதை உறுதிசெய்ய பல்வேறு நெட்வொர்க் கட்டமைப்புகளின் கீழ். நீங்கள் மாற்றக்கூடிய பிற அளவுருக்களைப் பற்றி மேலும் அறிய, இந்த இணைப்பைப் பார்வையிடவும்.

முயற்சி செய்து பாருங்கள்! ஒரு JSON கோப்பு வழியாக `eth-network-package`-க்கு பல்வேறு உள்ளமைவு விருப்பங்களை நீங்கள் அனுப்பலாம். இந்த நெட்வொர்க் அளவுருக்கள் JSON கோப்பு, உள்ளூர் எத்தேரியம் நெட்வொர்க்கை அமைக்க Kurtosis பயன்படுத்தும் குறிப்பிட்ட உள்ளமைவுகளை வழங்குகிறது.

இயல்புநிலை உள்ளமைவுக் கோப்பை எடுத்து, வெவ்வேறு EL/CL ஜோடிகளுடன் இரண்டு முனைகளை உருவாக்க அதைத் திருத்தவும்:

- முனை 1 `geth`/`lighthouse` உடன்
- முனை 2 `geth`/`lodestar` உடன்
- முனை 3 `geth`/`teku` உடன்

இந்த உள்ளமைவு உங்கள் dApp-ஐ சோதிப்பதற்காக எத்தேரியம் முனை செயலாக்கங்களின் ஒரு பன்முக நெட்வொர்க்கை உருவாக்குகிறது. உங்கள் உள்ளமைவுக் கோப்பு இப்போது இப்படி இருக்க வேண்டும்:

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

ஒவ்வொரு `participants` அமைப்பும் நெட்வொர்க்கில் உள்ள ஒரு முனைக்கு வரைபடமாகிறது, எனவே 3 `participants` அமைப்புகள் உங்கள் நெட்வொர்க்கில் 3 முனைகளை உருவாக்க Kurtosis-க்குச் சொல்லும். ஒவ்வொரு `participants` அமைப்பும் அந்தக் குறிப்பிட்ட முனைக்கு பயன்படுத்தப்படும் EL மற்றும் CL ஜோடியைக் குறிப்பிட உங்களை அனுமதிக்கும்.

`network_params` அமைப்பு ஒவ்வொரு முனைக்கும் ஜெனிசிஸ் கோப்புகளை உருவாக்கப் பயன்படுத்தப்படும் நெட்வொர்க் அமைப்புகளையும், நெட்வொர்க்கின் ஒரு ஸ்லாட்டிற்கான வினாடிகள் போன்ற பிற அமைப்புகளையும் உள்ளமைக்கிறது.

உங்கள் திருத்தப்பட்ட அளவுருக்கள் கோப்பை நீங்கள் விரும்பும் எந்த கோப்பகத்திலும் சேமிக்கவும் (கீழேயுள்ள எடுத்துக்காட்டில், இது டெஸ்க்டாப்பில் சேமிக்கப்பட்டுள்ளது) பின்னர் உங்கள் Kurtosis தொகுப்பை இயக்க அதைப் பயன்படுத்தவும்:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

குறிப்பு: `kurtosis clean -a` கட்டளை இங்கு பழைய டெஸ்ட்நெட் மற்றும் அதன் உள்ளடக்கங்களை அழித்துவிட்டு புதிய ஒன்றைத் தொடங்குமாறு Kurtosis-க்கு அறிவுறுத்தப் பயன்படுகிறது.

மீண்டும், Kurtosis சிறிது நேரம் வேலை செய்து, நடைபெறும் தனிப்பட்ட படிகளை அச்சிடும். இறுதியில், வெளியீடு இதுபோல இருக்கும்:

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

வாழ்த்துக்கள்! உங்கள் உள்ளூர் டெஸ்ட்நெட்டை 1 முனைக்கு பதிலாக 3 முனைகளைக் கொண்டிருக்குமாறு வெற்றிகரமாக உள்ளமைத்துள்ளீர்கள். உங்கள் dApp-க்கு எதிராக (வரிசைப்படுத்துதல் & சோதனை) நீங்கள் முன்பு செய்த அதே பணிப்பாய்வுகளை இயக்க, உங்கள் புதிய, 3-முனை உள்ளூர் டெஸ்ட்நெட்டில் உள்ள எந்தவொரு `el-client-<num>` சேவையிலிருந்தும் வரும் rpc uri வெளியீட்டின் போர்ட்டுடன் உங்கள் `hardhat.config.ts` உள்ளமைவுக் கோப்பில் உள்ள `localnet` அமைப்பில் `<$YOUR_PORT>`-ஐ மாற்றுவதன் மூலம் நாங்கள் முன்பு செய்த அதே செயல்பாடுகளைச் செய்யவும்.

## முடிவுரை {#conclusion}

அவ்வளவுதான்! இந்த குறுகிய வழிகாட்டியை சுருக்கமாகக் கூற:

- Kurtosis-ஐப் பயன்படுத்தி Docker-ல் ஒரு உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்கினீர்கள்
- உங்கள் உள்ளூர் dApp மேம்பாட்டு சூழலை உள்ளூர் எத்தேரியம் நெட்வொர்க்குடன் இணைத்தீர்கள்
- ஒரு dApp-ஐ வரிசைப்படுத்தி, உள்ளூர் எத்தேரியம் நெட்வொர்க்கில் அதற்கு எதிராக ஒரு எளிய சோதனையை ஓட்டினீர்கள்
- அடிப்படை எத்தேரியம் நெட்வொர்க்கை 3 முனைகளைக் கொண்டிருக்குமாறு உள்ளமைத்தீர்கள்

உங்களுக்கு என்ன நன்றாகப் போனது, எதை மேம்படுத்தலாம் அல்லது உங்கள் கேள்விகளுக்கு பதிலளிக்க உங்களிடமிருந்து கேட்க விரும்புகிறோம். [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) வழியாக எங்களைத் தொடர்புகொள்ள அல்லது [எங்களுக்கு மின்னஞ்சல் அனுப்ப](mailto:feedback@kurtosistech.com) தயங்க வேண்டாம்!

### பிற எடுத்துக்காட்டுகள் மற்றும் வழிகாட்டிகள் {#other-examples-guides}

எங்கள் [விரைவு தொடக்கம்](https://docs.kurtosis.com/quickstart) (அங்கு நீங்கள் ஒரு Postgres தரவுத்தளம் மற்றும் API-ஐ உருவாக்குவீர்கள்) மற்றும் எங்கள் [awesome-kurtosis களஞ்சியத்தில்](https://github.com/kurtosis-tech/awesome-kurtosis) உள்ள எங்கள் மற்ற எடுத்துக்காட்டுகளைப் பார்க்க உங்களை ஊக்குவிக்கிறோம், அங்கு நீங்கள் சில சிறந்த எடுத்துக்காட்டுகளைக் காண்பீர்கள், இதில் பின்வருவனவற்றிற்கான தொகுப்புகள் அடங்கும்:

- [அதே உள்ளூர் எத்தேரியம் டெஸ்ட்நெட்டை உருவாக்குதல்](https://github.com/kurtosis-tech/eth2-package), ஆனால் பரிவர்த்தனைகளைப் போலச் செய்ய ஒரு பரிவர்த்தனை ஸ்பேமர், ஒரு ஃபோர்க் கண்காணிப்பான் மற்றும் இணைக்கப்பட்ட கிராஃபானா மற்றும் ப்ரோமிதியஸ் நிகழ்வு போன்ற கூடுதல் சேவைகளுடன்.
- அதே உள்ளூர் எத்தேரியம் நெட்வொர்க்கிற்கு எதிராக ஒரு [துணை-நெட்வொர்க்கிங் சோதனையை](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) செய்தல்
