---
title: Jinsi ya kuendeleza na kujaribu dApp kwenye testnet ya ndani, yenye wateja wengi
description: Mwongozo huu kwanza utakuelekeza jinsi ya kuanzisha na kusanidi testnet ya ndani ya Ethereum yenye wateja wengi kabla ya kutumia testnet kupeleka na kujaribu dApp.
author: "Tedi Mitiku"
tags:
  [
    "wateja",
    "nodi",
    "mikataba erevu",
    "utunzi",
    "safu ya makubaliano",
    "safu ya utekelezaji",
    "majaribio"
  ]
skill: intermediate
lang: sw
published: 2023-04-11
---

## Utangulizi {#introduction}

Mwongozo huu unakuelekeza katika mchakato wa kuanzisha testnet ya Ethereum ya ndani inayoweza kusanidiwa, kupeleka mkataba-erevu kwayo, na kutumia testnet kufanya majaribio dhidi ya dApp yako. Mwongozo huu umeundwa kwa ajili ya wasanidi programu wa dApp wanaotaka kuendeleza na kujaribu dApps zao ndani dhidi ya usanidi tofauti wa mtandao kabla ya kupeleka kwenye testnet hai au Mtandao Mkuu.

Katika mwongozo huu, utaweza:

- Anzisha testnet ya Ethereum ya ndani na [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ukitumia [Kurtosis](https://www.kurtosis.com/),
- Unganisha mazingira yako ya uendelezaji wa dApp ya Hardhat kwenye testnet ya ndani ili kuandaa, kupeleka, na kujaribu dApp, na
- Sanidi testnet ya ndani, ikijumuisha vigezo kama idadi ya nodi na jozi maalum za mteja wa EL/CL, ili kuwezesha mtiririko wa kazi wa uendelezaji na upimaji dhidi ya usanidi mbalimbali wa mtandao.

### Kurtosis ni nini? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ni mfumo wa ujenzi unaoweza kuunganishwa ulioundwa kwa ajili ya kusanidi mazingira ya majaribio ya makontena mengi. Inawawezesha wasanidi programu kuunda mazingira yanayoweza kurudiwa ambayo yanahitaji mantiki ya usanidi inayobadilika, kama vile testnets za mnyororo wa bloku.

Katika mwongozo huu, kifurushi cha eth-network cha Kurtosis kinawasha testnet ya ndani ya Ethereum inayotumia mteja wa Safu ya Utekelezaji (EL) wa [`geth`](https://geth.ethereum.org/), pamoja na wateja wa Safu ya Makubaliano (CL) wa [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), na [`lodestar`](https://lodestar.chainsafe.io/). Kifurushi hiki kinatumika kama mbadala unaoweza kusanidiwa na kuunganishwa kwa mitandao katika mifumo kama vile Mtandao wa Hardhat, Ganache, na Anvil. Kurtosis huwapa wasanidi programu udhibiti na wepesi zaidi juu ya testnets wanazotumia, ambayo ni sababu kubwa kwa nini [Msingi wa Ethereum ulitumia Kurtosis kupima Muungano](https://www.kurtosis.com/blog/testing-the-ethereum-merge) na unaendelea kuitumia kwa kupima masasisho ya mtandao.

## Kusanidi Kurtosis {#setting-up-kurtosis}

Kabla ya kuendelea, hakikisha una:

- [Umesakinisha na kuanzisha injini ya Docker](https://docs.kurtosis.com/install/#i-install--start-docker) kwenye mashine yako ya ndani
- [Umesakinisha Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (au umeisasisha hadi toleo jipya zaidi, ikiwa tayari una CLI iliyosakinishwa)
- Umesakinisha [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), na [npx](https://www.npmjs.com/package/npx) (kwa mazingira yako ya dApp)

## Kuanzisha testnet ya Ethereum ya ndani {#instantiate-testnet}

Ili kuwasha testnet ya Ethereum ya ndani, endesha:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Kumbuka: Amri hii inaupa mtandao wako jina: \"local-eth-testnet\" kwa kutumia kiashiria cha `--enclave`.

Kurtosis itachapisha hatua inazochukua chinichini inapofanya kazi ya kufasiri, kuhakiki, na kisha kutekeleza maagizo. Mwishowe, unapaswa kuona matokeo yanayofanana na yafuatayo:

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

Hongera! Ulitumia Kurtosis kuanzisha testnet ya Ethereum ya ndani, na mteja wa CL (`lighthouse`) na EL (`geth`), juu ya Docker.

### Mapitio {#review-instantiate-testnet}

Katika sehemu hii, ulitekeleza amri iliyoelekeza Kurtosis kutumia [`eth-network-package` iliyohifadhiwa mbali kwenye GitHub](https://github.com/kurtosis-tech/eth-network-package) kuwasha testnet ya Ethereum ya ndani ndani ya [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) ya Kurtosis. Ndani ya enclave yako, utapata "file artifacts" na "user services".

[Vifaa vya Faili](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) katika enclave yako vinajumuisha data zote zilizozalishwa na kutumika kuanzisha wateja wa EL na CL. Data iliundwa kwa kutumia huduma ya `prelaunch-data-generator` iliyojengwa kutoka kwa [picha hii ya Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Huduma za mtumiaji huonyesha huduma zote zilizowekwa kwenye kontena zinazofanya kazi katika enclave yako. Utaona kwamba nodi moja, yenye mteja wa EL na mteja wa CL, imeundwa.

## Unganisha mazingira yako ya uendelezaji wa dApp kwenye testnet ya Ethereum ya ndani {#connect-your-dapp}

### Sanidi mazingira ya uendelezaji wa dApp {#set-up-dapp-env}

Sasa kwa kuwa una testnet ya ndani inayofanya kazi, unaweza kuunganisha mazingira yako ya uendelezaji wa dApp ili kutumia testnet yako ya ndani. Mfumo wa Hardhat utatumika katika mwongozo huu kupeleka dApp ya blackjack kwenye testnet yako ya ndani.

Ili kusanidi mazingira yako ya uendelezaji wa dApp, nakili hazina iliyo na sampuli yetu ya dApp na usakinishe vitegemezi vyake, endesha:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Folda ya [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) inayotumiwa hapa ina usanidi wa kawaida kwa msanidi programu wa dApp anayetumia mfumo wa [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) ina mikataba-erevu michache rahisi kwa ajili ya dApp ya Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) ina hati ya kupeleka mkataba wa tokeni kwenye mtandao wako wa ndani wa Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) ina jaribio rahisi la .js kwa mkataba wako wa tokeni ili kuthibitisha kila mchezaji katika dApp yetu ya Blackjack ametengenezewa 1000
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) inasanidi usanidi wako wa Hardhat

### Sanidi Hardhat ili itumie testnet ya ndani {#configure-hardhat}

Pamoja na mazingira yako ya uendelezaji wa dApp yakiwa yamesanidiwa, sasa utaunganisha Hardhat ili itumie testnet ya Ethereum ya ndani iliyoundwa kwa kutumia Kurtosis. Ili kufanikisha hili, badilisha `<$YOUR_PORT>` katika muundo wa `localnet` katika faili yako ya usanidi ya `hardhat.config.ts` na bandari ya matokeo ya rpc uri kutoka huduma yoyote ya `el-client-<num>`. Katika kisa hiki cha sampuli, bandari itakuwa `64248`. Bandari yako itakuwa tofauti.

Mfano katika `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: BADILISHA $YOUR_PORT NA BANDARI YA URI YA NODI ILIYOTOLEWA NA KIFURUSHI CHA MTANDAO WA ETH CHA KURTOSIS

// Hizi ni funguo za faragha zinazohusiana na akaunti za majaribio zilizofadhiliwa awali zilizoundwa na kifurushi cha eth-network
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

Mara tu unapohifadhi faili yako, mazingira yako ya uendelezaji wa dApp ya Hardhat sasa yameunganishwa na testnet yako ya Ethereum ya ndani! Unaweza kuthibitisha kwamba testnet yako inafanya kazi kwa kuendesha:

```python
npx hardhat balances --network localnet
```

Matokeo yanapaswa kuonekana kama hivi:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Hii inathibitisha kuwa Hardhat inatumia testnet yako ya ndani na inagundua akaunti zilizofadhiliwa awali zilizoundwa na `eth-network-package`.

### Peleka na ujaribu dApp yako ndani {#deploy-and-test-dapp}

Wakati mazingira ya uendelezaji wa dApp yameunganishwa kikamilifu kwenye testnet ya Ethereum ya ndani, sasa unaweza kuendesha mtiririko wa kazi wa uendelezaji na upimaji dhidi ya dApp yako ukitumia testnet ya ndani.

Ili kuandaa na kupeleka mkataba-erevu wa `ChipToken.sol` kwa ajili ya uundaji wa mfano wa ndani na uendelezaji, endesha:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Matokeo yanapaswa kuonekana kama:

```python
ChipToken imepelekwa kwa: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Sasa jaribu kuendesha jaribio la `simple.js` dhidi ya dApp yako ya ndani ili kuthibitisha kila mchezaji katika dApp yetu ya Blackjack ametengenezewa 1000:

Matokeo yanapaswa kuonekana kama hivi:

```python
npx hardhat test --network localnet
```

Matokeo yanapaswa kuonekana kama hivi:

```python
ChipToken
    tengeneza
      ✔ inapaswa kutengeneza chipu 1000 kwa MCHEZAJI MMOJA

  1 imepita (654ms)
```

### Mapitio {#review-dapp-workflows}

Kufikia hapa, sasa umesanidi mazingira ya uendelezaji wa dApp, umeiunganisha kwenye mtandao wa Ethereum wa ndani ulioundwa na Kurtosis, na umeandaa, umepeleka, na umeendesha jaribio rahisi dhidi ya dApp yako.

Sasa hebu tuchunguze jinsi unavyoweza kusanidi mtandao wa msingi kwa ajili ya kupima dApps zetu chini ya usanidi mbalimbali wa mtandao.

## Kusanidi testnet ya Ethereum ya ndani {#configure-testnet}

### Kubadilisha usanidi wa mteja na idadi ya nodi {#configure-client-config-and-num-nodes}

Testnet yako ya Ethereum ya ndani inaweza kusanidiwa kutumia jozi tofauti za wateja wa EL na CL, pamoja na idadi tofauti ya nodi, kulingana na hali na usanidi maalum wa mtandao unaotaka kuendeleza au kupima. Hii inamaanisha kuwa, mara tu itakaposanidiwa, unaweza kuwasha testnet ya ndani iliyobinafsishwa na kuitumia kuendesha mtiririko sawa wa kazi (upelekaji, majaribio, n.k.) chini ya usanidi mbalimbali wa mtandao ili kuhakikisha kila kitu kinafanya kazi kama inavyotarajiwa. Ili kujifunza zaidi kuhusu vigezo vingine unavyoweza kurekebisha, tembelea kiungo hiki.

Jaribu! Unaweza kupitisha chaguo mbalimbali za usanidi kwa `eth-network-package` kupitia faili ya JSON. Faili hii ya JSON ya vigezo vya mtandao hutoa usanidi maalum ambao Kurtosis utatumia kusanidi mtandao wa ndani wa Ethereum.

Chukua faili chaguo-msingi ya usanidi na uihariri ili kuwasha nodi mbili zenye jozi tofauti za EL/CL:

- Nodi ya 1 na `geth`/`lighthouse`
- Nodi ya 2 na `geth`/`lodestar`
- Nodi ya 3 na `geth`/`teku`

Usanidi huu unaunda mtandao wenye utekelezaji mchanganyiko wa nodi za Ethereum kwa ajili ya kupima dApp yako. Faili yako ya usanidi sasa inapaswa kuonekana hivi:

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

Kila muundo wa `participants` unahusiana na nodi moja katika mtandao, kwa hivyo miundo 3 ya `participants` itaiambia Kurtosis iwashe nodi 3 kwenye mtandao wako. Kila muundo wa `participants` utakuruhusu kubainisha jozi ya EL na CL inayotumika kwa nodi hiyo maalum.

Muundo wa `network_params` unasanidi mipangilio ya mtandao inayotumika kuunda faili za genesis kwa kila nodi pamoja na mipangilio mingine kama sekunde kwa kila slot ya mtandao.

Hifadhi faili yako ya vigezo iliyohaririwa katika saraka yoyote unayotaka (katika mfano hapa chini, imehifadhiwa kwenye eneo-kazi) na kisha itumie kuendesha kifurushi chako cha Kurtosis kwa kuendesha:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package \"$(cat ~/eth-network-params.json)\"
```

Kumbuka: amri ya `kurtosis clean -a` inatumika hapa kuielekeza Kurtosis kuharibu testnet ya zamani na yaliyomo kabla ya kuanzisha mpya.

Tena, Kurtosis itafanya kazi kwa muda mfupi na kuchapisha hatua za kibinafsi zinazofanyika. Hatimaye, matokeo yanapaswa kuonekana kama:

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

Hongera! Umefanikiwa kusanidi testnet yako ya ndani iwe na nodi 3 badala ya 1. Ili kuendesha mtiririko sawa wa kazi uliofanya hapo awali dhidi ya dApp yako (kupeleka na kupima), fanya shughuli zilezile tulizofanya hapo awali kwa kubadilisha `<$YOUR_PORT>` katika muundo wa `localnet` katika faili yako ya usanidi ya `hardhat.config.ts` na bandari ya matokeo ya rpc uri kutoka huduma yoyote ya `el-client-<num>` katika testnet yako mpya ya ndani yenye nodi 3.

## Hitimisho {#conclusion}

Na ndivyo hivyo! Ili kufupisha mwongozo huu mfupi, wewe:

- Uliunda testnet ya Ethereum ya ndani juu ya Docker ukitumia Kurtosis
- Uliunganisha mazingira yako ya uendelezaji wa dApp ya ndani kwenye mtandao wa Ethereum wa ndani
- Ulipeleka dApp na kuendesha jaribio rahisi dhidi yake kwenye mtandao wa Ethereum wa ndani
- Ulisanidi mtandao wa msingi wa Ethereum uwe na nodi 3

Tungependa kusikia kutoka kwako juu ya kile kilichokwenda vizuri kwako, kile kinachoweza kuboreshwa, au kujibu maswali yako yoyote. Usisite kuwasiliana kupitia [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) au [tutumie barua pepe](mailto:feedback@kurtosistech.com)!

### Mifano na miongozo mingine {#other-examples-guides}

Tunakuhimiza uangalie [mwongozo wetu wa haraka](https://docs.kurtosis.com/quickstart) (ambapo utajenga hifadhidata ya Postgres na API juu yake) na mifano yetu mingine katika [hazina yetu ya awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) ambapo utapata mifano mizuri, ikijumuisha vifurushi vya:

- [Kuwasha testnet ileile ya ndani ya Ethereum](https://github.com/kurtosis-tech/eth2-package), lakini na huduma za ziada zilizounganishwa kama vile mtumaji taka wa miamala (kuiga miamala), kifuatiliaji cha uma, na nakala iliyounganishwa ya Grafana na Prometheus
- Kufanya [jaribio la mtandao-ndogo](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) dhidi ya mtandao uleule wa ndani wa Ethereum
