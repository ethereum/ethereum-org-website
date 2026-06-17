---
title: உள்ளூர், பல-கிளையண்ட் சோதனை வலையமைப்பில் ஒரு பரவலாக்கப்பட்ட செயலியை (dapp) உருவாக்கி சோதிப்பது எப்படி
description: இந்த வழிகாட்டி முதலில் பல-கிளையண்ட் உள்ளூர் எத்திரியம் சோதனை வலையமைப்பை எவ்வாறு தொடங்குவது மற்றும் கட்டமைப்பது என்பதை விளக்கும், பின்னர் அந்த சோதனை வலையமைப்பைப் பயன்படுத்தி ஒரு பரவலாக்கப்பட்ட செயலியை (dapp) நிலைநிறுத்தி சோதிப்பதைக் காண்பிக்கும்.
author: டெடி மிட்டிக்கு
tags:
  [
    "கிளையண்டுகள்",
    "கணுக்கள்",
    "திறன் ஒப்பந்தங்கள்",
    "தொகுக்கக்கூடிய தன்மை",
    "கருத்தொருமிப்பு அடுக்கு",
    "செயலாக்க அடுக்கு",
    "சோதனை",
  ]
skill: intermediate
breadcrumb: பல-கிளையண்ட் சோதனை வலையமைப்பு
lang: ta
published: 2023-04-11
---

## அறிமுகம் {#introduction}

இந்த வழிகாட்டி கட்டமைக்கக்கூடிய உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்குவது, அதில் ஒரு திறன் ஒப்பந்தத்தை நிலைநிறுத்துவது மற்றும் உங்கள் பரவலாக்கப்பட்ட செயலிக்கு (dapp) எதிராக சோதனைகளை இயக்க சோதனை வலையமைப்பைப் பயன்படுத்துவது ஆகிய செயல்முறைகளை விளக்குகிறது. நேரடி சோதனை வலையமைப்பு அல்லது முதன்மை வலைப்பின்னலில் நிலைநிறுத்துவதற்கு முன்பு, வெவ்வேறு பிணைய உள்ளமைவுகளுக்கு எதிராக தங்கள் பரவலாக்கப்பட்ட செயலிகளை (dapps) உள்ளூரில் உருவாக்கி சோதிக்க விரும்பும் dapp டெவலப்பர்களுக்காக இந்த வழிகாட்டி வடிவமைக்கப்பட்டுள்ளது.

இந்த வழிகாட்டியில், நீங்கள் பின்வருவனவற்றைச் செய்வீர்கள்:

- [Kurtosis](https://www.kurtosis.com/) ஐப் பயன்படுத்தி [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) உடன் ஒரு உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்குவீர்கள்,
- ஒரு பரவலாக்கப்பட்ட செயலியை (dapp) தொகுக்க, நிலைநிறுத்த மற்றும் சோதிக்க உங்கள் Hardhat dapp மேம்பாட்டுச் சூழலை உள்ளூர் சோதனை வலையமைப்புடன் இணைப்பீர்கள், மற்றும்
- பல்வேறு பிணைய உள்ளமைவுகளுக்கு எதிராக மேம்பாடு மற்றும் சோதனை பணிப்பாய்வுகளைச் செயல்படுத்த, கணுக்களின் எண்ணிக்கை மற்றும் குறிப்பிட்ட EL/CL கிளையண்ட் இணைப்புகள் போன்ற அளவுருக்கள் உட்பட உள்ளூர் சோதனை வலையமைப்பைக் கட்டமைப்பீர்கள்.

### Kurtosis என்றால் என்ன? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) என்பது பல-கண்டெய்னர் சோதனைச் சூழல்களை உள்ளமைக்க வடிவமைக்கப்பட்ட ஒரு தொகுக்கக்கூடிய உருவாக்க அமைப்பாகும். தொகுதிச்சங்கிலி சோதனை வலையமைப்புகள் போன்ற மாறும் அமைப்பு தர்க்கம் தேவைப்படும் மீண்டும் உருவாக்கக்கூடிய சூழல்களை உருவாக்க இது டெவலப்பர்களுக்கு குறிப்பாக உதவுகிறது.

இந்த வழிகாட்டியில், Kurtosis eth-network-package ஆனது [`geth`](https://geth.ethereum.org/) செயலாக்க அடுக்கு (EL) கிளையண்ட், அத்துடன் [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), மற்றும் [`lodestar`](https://lodestar.chainsafe.io/) கருத்தொருமிப்பு அடுக்கு (CL) கிளையண்டுகளுக்கான ஆதரவுடன் ஒரு உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்குகிறது. இந்தத் தொகுப்பு Hardhat Network, Ganache மற்றும் Anvil போன்ற கட்டமைப்புகளில் உள்ள பிணையங்களுக்கு கட்டமைக்கக்கூடிய மற்றும் தொகுக்கக்கூடிய மாற்றாகச் செயல்படுகிறது. Kurtosis டெவலப்பர்கள் பயன்படுத்தும் சோதனை வலையமைப்புகளின் மீது அதிக கட்டுப்பாட்டையும் நெகிழ்வுத்தன்மையையும் வழங்குகிறது, இதுவே [எத்தீரியம் அறக்கட்டளை ஒருங்கிணைப்பைச் சோதிக்க Kurtosis ஐப் பயன்படுத்தியதற்கும்](https://www.kurtosis.com/blog/testing-the-ethereum-merge) பிணைய மேம்படுத்தல்களைச் சோதிக்க அதைத் தொடர்ந்து பயன்படுத்துவதற்கும் ஒரு முக்கிய காரணமாகும்.

## Kurtosis ஐ அமைத்தல் {#setting-up-kurtosis}

நீங்கள் தொடர்வதற்கு முன், உங்களிடம் பின்வருவன இருப்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்:

- உங்கள் உள்ளூர் கணினியில் [Docker இயந்திரத்தை நிறுவி தொடங்கியுள்ளீர்கள்](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI ஐ நிறுவியுள்ளீர்கள்](https://docs.kurtosis.com/install#ii-install-the-cli) (அல்லது நீங்கள் ஏற்கனவே CLI ஐ நிறுவியிருந்தால், அதை சமீபத்திய வெளியீட்டிற்கு மேம்படுத்தியுள்ளீர்கள்)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), மற்றும் [npx](https://www.npmjs.com/package/npx) ஆகியவற்றை நிறுவியுள்ளீர்கள் (உங்கள் dapp சூழலுக்காக)

## உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்குதல் {#instantiate-testnet}

உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்க, இதை இயக்கவும்:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

குறிப்பு: இந்தக் கட்டளை `--enclave` கொடியைப் பயன்படுத்தி உங்கள் பிணையத்திற்கு "local-eth-testnet" என்று பெயரிடுகிறது.

Kurtosis வழிமுறைகளை விளக்கவும், சரிபார்க்கவும், பின்னர் செயல்படுத்தவும் செயல்படும்போது, அது உள்நாட்டில் எடுக்கும் படிகளை அச்சிடும். முடிவில், பின்வருவனவற்றை ஒத்த ஒரு வெளியீட்டை நீங்கள் காண வேண்டும்:

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

வாழ்த்துக்கள்! Docker மூலம் ஒரு CL (`lighthouse`) மற்றும் EL கிளையண்டுடன் (`geth`) உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்க Kurtosis ஐப் பயன்படுத்தியுள்ளீர்கள்.

### மதிப்பாய்வு {#review-instantiate-testnet}

இந்தப் பிரிவில், Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) க்குள் உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்க [GitHub இல் தொலைவிலிருந்து ஹோஸ்ட் செய்யப்பட்ட `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ஐப் பயன்படுத்த Kurtosis ஐ இயக்கும் கட்டளையை நீங்கள் செயல்படுத்தினீர்கள். உங்கள் என்கிளேவிற்குள், "கோப்பு கலைப்பொருட்கள்" (file artifacts) மற்றும் "பயனர் சேவைகள்" (user services) இரண்டையும் நீங்கள் காண்பீர்கள்.

உங்கள் என்கிளேவில் உள்ள [கோப்பு கலைப்பொருட்கள்](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) EL மற்றும் CL கிளையண்டுகளைத் துவக்க உருவாக்கப்பட்ட மற்றும் பயன்படுத்தப்பட்ட அனைத்து தரவையும் உள்ளடக்கியது. இந்த [Docker படத்திலிருந்து](https://github.com/ethpandaops/ethereum-genesis-generator) உருவாக்கப்பட்ட `prelaunch-data-generator` சேவையைப் பயன்படுத்தி தரவு உருவாக்கப்பட்டது.

பயனர் சேவைகள் உங்கள் என்கிளேவில் இயங்கும் அனைத்து கண்டெய்னராக்கப்பட்ட சேவைகளையும் காண்பிக்கின்றன. EL கிளையண்ட் மற்றும் CL கிளையண்ட் இரண்டையும் கொண்ட ஒரு கணு உருவாக்கப்பட்டுள்ளதை நீங்கள் கவனிப்பீர்கள்.

## உங்கள் dapp மேம்பாட்டுச் சூழலை உள்ளூர் எத்திரியம் சோதனை வலையமைப்புடன் இணைக்கவும் {#connect-your-dapp}

### dapp மேம்பாட்டுச் சூழலை அமைத்தல் {#set-up-dapp-env}

இப்போது உங்களிடம் இயங்கும் உள்ளூர் சோதனை வலையமைப்பு இருப்பதால், உங்கள் உள்ளூர் சோதனை வலையமைப்பைப் பயன்படுத்த உங்கள் dapp மேம்பாட்டுச் சூழலை இணைக்கலாம். உங்கள் உள்ளூர் சோதனை வலையமைப்பில் ஒரு பிளாக்ஜாக் (blackjack) dapp ஐ நிலைநிறுத்த இந்த வழிகாட்டியில் Hardhat கட்டமைப்பு பயன்படுத்தப்படும்.

உங்கள் dapp மேம்பாட்டுச் சூழலை அமைக்க, எங்கள் மாதிரி dapp ஐக் கொண்ட களஞ்சியத்தை குளோன் செய்து அதன் சார்புகளை நிறுவவும், இதை இயக்கவும்:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

இங்கு பயன்படுத்தப்படும் [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) கோப்புறையானது [Hardhat](https://hardhat.org/) கட்டமைப்பைப் பயன்படுத்தும் ஒரு dapp டெவலப்பருக்கான வழக்கமான அமைப்பைக் கொண்டுள்ளது:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) ஒரு பிளாக்ஜாக் dapp க்கான சில எளிய திறன் ஒப்பந்தங்களைக் கொண்டுள்ளது
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) உங்கள் உள்ளூர் எத்திரியம் பிணையத்தில் ஒரு வில்லை ஒப்பந்தத்தை நிலைநிறுத்துவதற்கான ஸ்கிரிப்டைக் கொண்டுள்ளது
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) எங்கள் பிளாக்ஜாக் dapp இல் உள்ள ஒவ்வொரு வீரருக்கும் 1000 வில்லைகள் உருவாக்கப்பட்டுள்ளதை உறுதிப்படுத்த உங்கள் வில்லை ஒப்பந்தத்திற்கான எளிய .js சோதனையைக் கொண்டுள்ளது
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) உங்கள் Hardhat அமைப்பைக் கட்டமைக்கிறது

### உள்ளூர் சோதனை வலையமைப்பைப் பயன்படுத்த Hardhat ஐ உள்ளமைக்கவும் {#configure-hardhat}

உங்கள் dapp மேம்பாட்டுச் சூழல் அமைக்கப்பட்டவுடன், Kurtosis ஐப் பயன்படுத்தி உருவாக்கப்பட்ட உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைப் பயன்படுத்த இப்போது Hardhat ஐ இணைப்பீர்கள். இதைச் செய்ய, உங்கள் `hardhat.config.ts` உள்ளமைவு கோப்பில் உள்ள `localnet` கட்டமைப்பில் உள்ள `<$YOUR_PORT>` ஐ ஏதேனும் `el-client-<num>` சேவையிலிருந்து வெளியாகும் rpc uri இன் போர்ட்டுடன் மாற்றவும். இந்த மாதிரி வழக்கில், போர்ட் `64248` ஆக இருக்கும். உங்கள் போர்ட் வித்தியாசமாக இருக்கும்.

`hardhat.config.ts` இல் உதாரணம்:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ETH பிணையம் Kurtosis தொகுப்பால் உருவாக்கப்பட்ட ஒரு கணு URI இன் போர்ட்டைக் கொண்டு $YOUR_PORT என்பதை மாற்றவும்

// இவை eth-network-package ஆல் உருவாக்கப்பட்ட, முன்கூட்டியே நிதியளிக்கப்பட்ட சோதனை கணக்குகளுடன் தொடர்புடைய தனிப்பட்ட திறவுகோல்கள் ஆகும்
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

உங்கள் கோப்பைச் சேமித்தவுடன், உங்கள் Hardhat dapp மேம்பாட்டுச் சூழல் இப்போது உங்கள் உள்ளூர் எத்திரியம் சோதனை வலையமைப்புடன் இணைக்கப்பட்டுள்ளது! இதை இயக்குவதன் மூலம் உங்கள் சோதனை வலையமைப்பு செயல்படுகிறதா என்பதை நீங்கள் சரிபார்க்கலாம்:

```python
npx hardhat balances --network localnet
```

வெளியீடு இதுபோன்று இருக்க வேண்டும்:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Hardhat உங்கள் உள்ளூர் சோதனை வலையமைப்பைப் பயன்படுத்துகிறது என்பதையும், `eth-network-package` ஆல் உருவாக்கப்பட்ட முன்-நிதியளிக்கப்பட்ட கணக்குகளைக் கண்டறிகிறது என்பதையும் இது உறுதிப்படுத்துகிறது.

### உங்கள் dapp ஐ உள்ளூரில் நிலைநிறுத்தி சோதிக்கவும் {#deploy-and-test-dapp}

dapp மேம்பாட்டுச் சூழல் உள்ளூர் எத்திரியம் சோதனை வலையமைப்புடன் முழுமையாக இணைக்கப்பட்டுள்ளதால், உள்ளூர் சோதனை வலையமைப்பைப் பயன்படுத்தி உங்கள் dapp க்கு எதிராக மேம்பாடு மற்றும் சோதனை பணிப்பாய்வுகளை இப்போது நீங்கள் இயக்கலாம்.

உள்ளூர் முன்மாதிரி மற்றும் மேம்பாட்டிற்காக `ChipToken.sol` திறன் ஒப்பந்தத்தை தொகுத்து நிலைநிறுத்த, இதை இயக்கவும்:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

வெளியீடு இதுபோன்று இருக்க வேண்டும்:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

இப்போது எங்கள் பிளாக்ஜாக் dapp இல் உள்ள ஒவ்வொரு வீரருக்கும் 1000 வில்லைகள் உருவாக்கப்பட்டுள்ளதை உறுதிப்படுத்த உங்கள் உள்ளூர் dapp க்கு எதிராக `simple.js` சோதனையை இயக்க முயற்சிக்கவும்:

வெளியீடு இதுபோன்று இருக்க வேண்டும்:

```python
npx hardhat test --network localnet
```

வெளியீடு இதுபோன்று இருக்க வேண்டும்:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### மதிப்பாய்வு {#review-dapp-workflows}

இந்த கட்டத்தில், நீங்கள் இப்போது ஒரு dapp மேம்பாட்டுச் சூழலை அமைத்துள்ளீர்கள், Kurtosis ஆல் உருவாக்கப்பட்ட உள்ளூர் எத்திரியம் பிணையத்துடன் அதை இணைத்துள்ளீர்கள், மேலும் உங்கள் dapp க்கு எதிராக ஒரு எளிய சோதனையைத் தொகுத்து, நிலைநிறுத்தி, இயக்கியுள்ளீர்கள்.

இப்போது பல்வேறு பிணைய உள்ளமைவுகளின் கீழ் எங்கள் dapps ஐச் சோதிப்பதற்காக அடிப்படை பிணையத்தை எவ்வாறு கட்டமைக்கலாம் என்பதை ஆராய்வோம்.

## உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைக் கட்டமைத்தல் {#configure-testnet}

### கிளையண்ட் உள்ளமைவுகள் மற்றும் கணுக்களின் எண்ணிக்கையை மாற்றுதல் {#configure-client-config-and-num-nodes}

நீங்கள் உருவாக்க அல்லது சோதிக்க விரும்பும் காட்சி மற்றும் குறிப்பிட்ட பிணைய உள்ளமைவைப் பொறுத்து, வெவ்வேறு EL மற்றும் CL கிளையண்ட் இணைகள், அத்துடன் மாறுபட்ட கணுக்களின் எண்ணிக்கையைப் பயன்படுத்த உங்கள் உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைக் கட்டமைக்க முடியும். இதன் பொருள், அமைக்கப்பட்டவுடன், நீங்கள் தனிப்பயனாக்கப்பட்ட உள்ளூர் சோதனை வலையமைப்பைத் தொடங்கலாம் மற்றும் எல்லாம் எதிர்பார்த்தபடி செயல்படுவதை உறுதிசெய்ய பல்வேறு பிணைய உள்ளமைவுகளின் கீழ் அதே பணிப்பாய்வுகளை (நிலைநிறுத்தம், சோதனைகள் போன்றவை) இயக்க அதைப் பயன்படுத்தலாம். நீங்கள் மாற்றக்கூடிய பிற அளவுருக்கள் பற்றி மேலும் அறிய, இந்த இணைப்பைப் பார்வையிடவும்.

முயற்சி செய்து பாருங்கள்! JSON கோப்பு வழியாக `eth-network-package` க்கு பல்வேறு உள்ளமைவு விருப்பங்களை நீங்கள் அனுப்பலாம். இந்த பிணைய அளவுருக்கள் JSON கோப்பு உள்ளூர் எத்திரியம் பிணையத்தை அமைக்க Kurtosis பயன்படுத்தும் குறிப்பிட்ட உள்ளமைவுகளை வழங்குகிறது.

வெவ்வேறு EL/CL இணைகளுடன் இரண்டு கணுக்களைத் தொடங்க இயல்புநிலை உள்ளமைவு கோப்பை எடுத்து அதைத் திருத்தவும்:

- `geth`/`lighthouse` உடன் கணு 1
- `geth`/`lodestar` உடன் கணு 2
- `geth`/`teku` உடன் கணு 3

இந்த உள்ளமைவு உங்கள் dapp ஐச் சோதிப்பதற்காக எத்திரியம் கணு செயலாக்கங்களின் பன்முக பிணையத்தை உருவாக்குகிறது. உங்கள் உள்ளமைவு கோப்பு இப்போது இதுபோன்று இருக்க வேண்டும்:

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

ஒவ்வொரு `participants` கட்டமைப்பும் பிணையத்தில் உள்ள ஒரு கணுவுடன் வரைபடமாக்கப்படுகிறது, எனவே 3 `participants` கட்டமைப்புகள் உங்கள் பிணையத்தில் 3 கணுக்களைத் தொடங்க Kurtosis க்குச் சொல்லும். ஒவ்வொரு `participants` கட்டமைப்பும் அந்த குறிப்பிட்ட கணுவிற்குப் பயன்படுத்தப்படும் EL மற்றும் CL இணையை குறிப்பிட உங்களை அனுமதிக்கும்.

`network_params` கட்டமைப்பானது ஒவ்வொரு கணுவிற்கும் தொடக்கக் கோப்புகளை (genesis files) உருவாக்கப் பயன்படுத்தப்படும் பிணைய அமைப்புகளையும், பிணையத்தின் ஒரு நேரப்பகுதிக்கான விநாடிகள் (seconds per slot) போன்ற பிற அமைப்புகளையும் கட்டமைக்கிறது.

நீங்கள் திருத்திய அளவுருக்கள் கோப்பை நீங்கள் விரும்பும் எந்த கோப்பகத்திலும் சேமிக்கவும் (கீழே உள்ள எடுத்துக்காட்டில், இது டெஸ்க்டாப்பில் சேமிக்கப்பட்டுள்ளது) பின்னர் இதை இயக்குவதன் மூலம் உங்கள் Kurtosis தொகுப்பை இயக்க அதைப் பயன்படுத்தவும்:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

குறிப்பு: புதியதைத் தொடங்குவதற்கு முன் பழைய சோதனை வலையமைப்பையும் அதன் உள்ளடக்கங்களையும் அழிக்க Kurtosis க்கு அறிவுறுத்த `kurtosis clean -a` கட்டளை இங்கு பயன்படுத்தப்படுகிறது.

மீண்டும், Kurtosis சிறிது நேரம் வேலை செய்யும் மற்றும் நடைபெறும் தனிப்பட்ட படிகளை அச்சிடும். இறுதியில், வெளியீடு இதுபோன்று இருக்க வேண்டும்:

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

வாழ்த்துக்கள்! உங்கள் உள்ளூர் சோதனை வலையமைப்பை 1 க்கு பதிலாக 3 கணுக்களைக் கொண்டிருக்குமாறு வெற்றிகரமாகக் கட்டமைத்துள்ளீர்கள். உங்கள் dapp க்கு எதிராக நீங்கள் முன்பு செய்த அதே பணிப்பாய்வுகளை (நிலைநிறுத்தம் மற்றும் சோதனை) இயக்க, உங்கள் புதிய, 3-கணு உள்ளூர் சோதனை வலையமைப்பில் உள்ள ஏதேனும் `el-client-<num>` சேவையிலிருந்து வெளியாகும் rpc uri இன் போர்ட்டுடன் உங்கள் `hardhat.config.ts` உள்ளமைவு கோப்பில் உள்ள `localnet` கட்டமைப்பில் உள்ள `<$YOUR_PORT>` ஐ மாற்றுவதன் மூலம் நாங்கள் முன்பு செய்த அதே செயல்பாடுகளைச் செய்யவும்.

## முடிவுரை {#conclusion}

அவ்வளவுதான்! இந்த குறுகிய வழிகாட்டியை சுருக்கமாகக் கூற, நீங்கள்:

- Kurtosis ஐப் பயன்படுத்தி Docker மூலம் ஒரு உள்ளூர் எத்திரியம் சோதனை வலையமைப்பை உருவாக்கினீர்கள்
- உங்கள் உள்ளூர் dapp மேம்பாட்டுச் சூழலை உள்ளூர் எத்திரியம் பிணையத்துடன் இணைத்தீர்கள்
- உள்ளூர் எத்திரியம் பிணையத்தில் ஒரு dapp ஐ நிலைநிறுத்தி அதற்கு எதிராக ஒரு எளிய சோதனையை இயக்கினீர்கள்
- அடிப்படை எத்திரியம் பிணையத்தை 3 கணுக்களைக் கொண்டிருக்குமாறு கட்டமைத்தீர்கள்

உங்களுக்கு எது நன்றாக வேலை செய்தது, எதை மேம்படுத்தலாம் என்பது குறித்து உங்களிடமிருந்து கேட்க அல்லது உங்கள் கேள்விகளுக்கு பதிலளிக்க நாங்கள் விரும்புகிறோம். [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) வழியாகத் தொடர்புகொள்ளவோ அல்லது [எங்களுக்கு மின்னஞ்சல் அனுப்பவோ](mailto:feedback@kurtosistech.com) தயங்க வேண்டாம்!

### பிற எடுத்துக்காட்டுகள் மற்றும் வழிகாட்டிகள் {#other-examples-guides}

எங்கள் [விரைவுத் தொடக்கத்தை](https://docs.kurtosis.com/quickstart) (அதில் நீங்கள் ஒரு Postgres தரவுத்தளத்தையும் அதன் மேல் API ஐயும் உருவாக்குவீர்கள்) மற்றும் எங்கள் [awesome-kurtosis களஞ்சியத்தில்](https://github.com/kurtosis-tech/awesome-kurtosis) உள்ள பிற எடுத்துக்காட்டுகளைப் பார்க்க உங்களை ஊக்குவிக்கிறோம், அங்கு நீங்கள் பின்வருவனவற்றிற்கான தொகுப்புகள் உட்பட சில சிறந்த எடுத்துக்காட்டுகளைக் காண்பீர்கள்:

- [அதே உள்ளூர் எத்திரியம் சோதனை வலையமைப்பைத் தொடங்குதல்](https://github.com/kurtosis-tech/eth2-package), ஆனால் பரிவர்த்தனை ஸ்பேமர் (பரிவர்த்தனைகளை உருவகப்படுத்த), ஒரு கவை (fork) மானிட்டர் மற்றும் இணைக்கப்பட்ட Grafana மற்றும் Prometheus நிகழ்வு போன்ற கூடுதல் சேவைகளுடன் இணைக்கப்பட்டுள்ளது
- அதே உள்ளூர் எத்திரியம் பிணையத்திற்கு எதிராக ஒரு [துணை-பிணைய சோதனையை](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) செய்தல்