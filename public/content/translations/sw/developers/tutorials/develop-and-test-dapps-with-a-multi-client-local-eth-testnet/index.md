---
title: Jinsi ya kuunda na kujaribu dapp kwenye mtandao wa majaribio wa ndani, wa wateja wengi
description: Mwongozo huu kwanza utakuelekeza jinsi ya kuanzisha na kusanidi mtandao wa majaribio wa ndani wa Ethereum wa wateja wengi kabla ya kutumia mtandao wa majaribio kusambaza na kujaribu dapp.
author: "Tedi Mitiku"
tags:
  [
    "wateja",
    "nodi",
    "mikataba mahiri",
    "uwezo wa kuunganishwa",
    "tabaka la mwafaka",
    "tabaka la utekelezaji",
    "majaribio",
  ]
skill: intermediate
breadcrumb: Mtandao wa majaribio wa wateja wengi
lang: sw
published: 2023-04-11
---

## Utangulizi {#introduction}

Mwongozo huu unakuelekeza katika mchakato wa kuanzisha mtandao wa majaribio wa ndani wa Ethereum unaoweza kusanidiwa, kusambaza mkataba mahiri kwake, na kutumia mtandao wa majaribio kuendesha majaribio dhidi ya programu tumizi iliyogatuliwa (dapp) yako. Mwongozo huu umeundwa kwa ajili ya wasanidi wa dapp wanaotaka kuunda na kujaribu dapp zao ndani ya nchi dhidi ya usanidi tofauti wa mtandao kabla ya kusambaza kwenye mtandao wa majaribio wa moja kwa moja au Mtandao Mkuu.

Katika mwongozo huu, uta:

- Kuanzisha mtandao wa majaribio wa ndani wa Ethereum na [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ukitumia [Kurtosis](https://www.kurtosis.com/),
- Kuunganisha mazingira yako ya uundaji wa dapp ya Hardhat kwenye mtandao wa majaribio wa ndani ili kukusanya, kusambaza, na kujaribu dapp, na
- Kusanidi mtandao wa majaribio wa ndani, ikijumuisha vigezo kama vile idadi ya nodi na uoanishaji maalum wa wateja wa EL/CL, ili kuwezesha mtiririko wa kazi wa uundaji na majaribio dhidi ya usanidi mbalimbali wa mtandao.

### Kurtosis ni nini? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ni mfumo wa ujenzi unaoweza kuunganishwa ulioundwa kwa ajili ya kusanidi mazingira ya majaribio ya kontena nyingi. Huwawezesha wasanidi programu haswa kuunda mazingira yanayoweza kuzalishwa tena ambayo yanahitaji mantiki ya usanidi inayobadilika, kama vile mitandao ya majaribio ya mnyororo wa vitalu.

Katika mwongozo huu, kifurushi cha mtandao cha eth cha Kurtosis kinaanzisha mtandao wa majaribio wa ndani wa Ethereum kwa usaidizi wa mteja wa tabaka la utekelezaji (EL) wa [`geth`](https://geth.ethereum.org/), pamoja na wateja wa tabaka la mwafaka (CL) wa [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), na [`lodestar`](https://lodestar.chainsafe.io/). Kifurushi hiki hutumika kama mbadala unaoweza kusanidiwa na unaoweza kuunganishwa kwa mitandao katika mifumo kama vile Hardhat Network, Ganache, na Anvil. Kurtosis inawapa wasanidi udhibiti mkubwa na unyumbufu juu ya mitandao ya majaribio wanayotumia, ambayo ni sababu kuu kwa nini [Taasisi ya Ethereum ilitumia Kurtosis kujaribu Unganisho](https://www.kurtosis.com/blog/testing-the-ethereum-merge) na inaendelea kuitumia kwa majaribio ya uboreshaji wa mtandao.

## Kusanidi Kurtosis {#setting-up-kurtosis}

Kabla ya kuendelea, hakikisha una:

- [Umesakinisha na kuanzisha injini ya Docker](https://docs.kurtosis.com/install/#i-install--start-docker) kwenye mashine yako ya ndani
- [Umesakinisha Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (au umeiboresha hadi toleo la hivi punde, ikiwa tayari umesakinisha CLI)
- Umesakinisha [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), na [npx](https://www.npmjs.com/package/npx) (kwa mazingira yako ya dapp)

## Kuanzisha mtandao wa majaribio wa ndani wa Ethereum {#instantiate-testnet}

Ili kuanzisha mtandao wa majaribio wa ndani wa Ethereum, endesha:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Kumbuka: Amri hii inaupa jina mtandao wako: "local-eth-testnet” kwa kutumia alama ya `--enclave`.

Kurtosis itachapisha hatua inazochukua kiufundi inapofanya kazi kutafsiri, kuthibitisha, na kisha kutekeleza maagizo. Mwishoni, unapaswa kuona matokeo yanayofanana na yafuatayo:

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

Hongera! Umetumia Kurtosis kuanzisha mtandao wa majaribio wa ndani wa Ethereum, ukiwa na mteja wa CL (`lighthouse`) na EL (`geth`), kupitia Docker.

### Mapitio {#review-instantiate-testnet}

Katika sehemu hii, ulitekeleza amri iliyoelekeza Kurtosis kutumia [`eth-network-package` iliyopangishwa kwa mbali kwenye GitHub](https://github.com/kurtosis-tech/eth-network-package) ili kuanzisha mtandao wa majaribio wa ndani wa Ethereum ndani ya [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) ya Kurtosis. Ndani ya enclave yako, utapata "file artifacts" na "user services".

[File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) katika enclave yako inajumuisha data yote iliyozalishwa na kutumika kuanzisha wateja wa EL na CL. Data iliundwa kwa kutumia huduma ya `prelaunch-data-generator` iliyojengwa kutoka kwa [taswira hii ya Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Huduma za mtumiaji zinaonyesha huduma zote zilizowekwa kwenye kontena zinazofanya kazi katika enclave yako. Utagundua kuwa nodi moja, inayoangazia mteja wa EL na mteja wa CL, imeundwa.

## Unganisha mazingira yako ya uundaji wa dapp kwenye mtandao wa majaribio wa ndani wa Ethereum {#connect-your-dapp}

### Sanidi mazingira ya uundaji wa dapp {#set-up-dapp-env}

Kwa kuwa sasa una mtandao wa majaribio wa ndani unaofanya kazi, unaweza kuunganisha mazingira yako ya uundaji wa dapp ili kutumia mtandao wako wa majaribio wa ndani. Mfumo wa Hardhat utatumika katika mwongozo huu kusambaza dapp ya blackjack kwenye mtandao wako wa majaribio wa ndani.

Ili kusanidi mazingira yako ya uundaji wa dapp, nakili hazina iliyo na sampuli yetu ya dapp na usakinishe vitegemezi vyake, endesha:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Folda ya [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) inayotumika hapa ina usanidi wa kawaida kwa msanidi wa dapp anayetumia mfumo wa [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) ina mikataba mahiri michache rahisi kwa dapp ya Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) ina hati ya kusambaza mkataba wa tokeni kwenye mtandao wako wa ndani wa Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) ina jaribio rahisi la .js kwa mkataba wako wa tokeni ili kuthibitisha kila mchezaji katika dapp yetu ya Blackjack ana 1000 zilizotengenezwa kwa ajili yao
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) inasanidi usanidi wako wa Hardhat

### Sanidi Hardhat kutumia mtandao wa majaribio wa ndani {#configure-hardhat}

Ukiwa na mazingira yako ya uundaji wa dapp yaliyosanidiwa, sasa utaunganisha Hardhat ili kutumia mtandao wa majaribio wa ndani wa Ethereum uliotengenezwa kwa kutumia Kurtosis. Ili kukamilisha hili, badilisha `<$YOUR_PORT>` katika muundo wa `localnet` kwenye faili yako ya usanidi ya `hardhat.config.ts` na lango la matokeo ya rpc uri kutoka kwa huduma yoyote ya `el-client-<num>`. Katika sampuli hii, lango litakuwa `64248`. Lango lako litakuwa tofauti.

Mfano katika `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: BADILISHA $YOUR_PORT NA LANGO LA URI YA NODI ILIYOZALISHWA NA KIFURUSHI CHA KURTOSIS CHA MTANDAO WA ETH

// Hizi ni funguo za siri zinazohusiana na akaunti za majaribio zilizowekewa fedha mapema zilizoundwa na eth-network-package
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

Mara tu unapohifadhi faili yako, mazingira yako ya uundaji wa dapp ya Hardhat sasa yameunganishwa kwenye mtandao wako wa majaribio wa ndani wa Ethereum! Unaweza kuthibitisha kuwa mtandao wako wa majaribio unafanya kazi kwa kuendesha:

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

Hii inathibitisha kuwa Hardhat inatumia mtandao wako wa majaribio wa ndani na inatambua akaunti zilizofadhiliwa mapema zilizoundwa na `eth-network-package`.

### Sambaza na ujaribu dapp yako ndani ya nchi {#deploy-and-test-dapp}

Huku mazingira ya uundaji wa dapp yakiwa yameunganishwa kikamilifu kwenye mtandao wa majaribio wa ndani wa Ethereum, sasa unaweza kuendesha mtiririko wa kazi wa uundaji na majaribio dhidi ya dapp yako ukitumia mtandao wa majaribio wa ndani.

Ili kukusanya na kusambaza mkataba mahiri wa `ChipToken.sol` kwa ajili ya uundaji wa mfano na uundaji wa ndani, endesha:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Matokeo yanapaswa kuonekana kama:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Sasa jaribu kuendesha jaribio la `simple.js` dhidi ya dapp yako ya ndani ili kuthibitisha kila mchezaji katika dapp yetu ya Blackjack ana 1000 zilizotengenezwa kwa ajili yao:

Matokeo yanapaswa kuonekana kama hivi:

```python
npx hardhat test --network localnet
```

Matokeo yanapaswa kuonekana kama hivi:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Mapitio {#review-dapp-workflows}

Kufikia hapa, sasa umesanidi mazingira ya uundaji wa dapp, ukayaunganisha kwenye mtandao wa ndani wa Ethereum ulioundwa na Kurtosis, na umekusanya, kusambaza, na kuendesha jaribio rahisi dhidi ya dapp yako.

Sasa hebu tuchunguze jinsi unavyoweza kusanidi mtandao wa msingi kwa ajili ya kujaribu dapp zetu chini ya usanidi tofauti wa mtandao.

## Kusanidi mtandao wa majaribio wa ndani wa Ethereum {#configure-testnet}

### Kubadilisha usanidi wa mteja na idadi ya nodi {#configure-client-config-and-num-nodes}

Mtandao wako wa majaribio wa ndani wa Ethereum unaweza kusanidiwa kutumia jozi tofauti za wateja wa EL na CL, pamoja na idadi tofauti ya nodi, kulingana na hali na usanidi maalum wa mtandao unaotaka kuunda au kujaribu. Hii inamaanisha kuwa, ukishasanidiwa, unaweza kuanzisha mtandao wa majaribio wa ndani uliobinafsishwa na kuutumia kuendesha mtiririko wa kazi sawa (usambazaji, majaribio, n.k.) chini ya usanidi mbalimbali wa mtandao ili kuhakikisha kila kitu kinafanya kazi kama inavyotarajiwa. Ili kujifunza zaidi kuhusu vigezo vingine unavyoweza kurekebisha, tembelea kiungo hiki.

Ijaribu! Unaweza kupitisha chaguo mbalimbali za usanidi kwa `eth-network-package` kupitia faili ya JSON. Faili hii ya JSON ya vigezo vya mtandao hutoa usanidi maalum ambao Kurtosis itatumia kusanidi mtandao wa ndani wa Ethereum.

Chukua faili ya usanidi chaguomsingi na uihariri ili kuanzisha nodi mbili zilizo na jozi tofauti za EL/CL:

- Nodi 1 yenye `geth`/`lighthouse`
- Nodi 2 yenye `geth`/`lodestar`
- Nodi 3 yenye `geth`/`teku`

Usanidi huu unaunda mtandao tofauti wa utekelezaji wa nodi za Ethereum kwa ajili ya kujaribu dapp yako. Faili yako ya usanidi sasa inapaswa kuonekana kama:

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

Kila muundo wa `participants` unalingana na nodi katika mtandao, kwa hivyo miundo 3 ya `participants` itaiambia Kurtosis kuanzisha nodi 3 katika mtandao wako. Kila muundo wa `participants` utakuruhusu kubainisha jozi ya EL na CL inayotumika kwa nodi hiyo maalum.

Muundo wa `network_params` unasanidi mipangilio ya mtandao inayotumika kuunda faili za mwanzo kwa kila nodi pamoja na mipangilio mingine kama vile sekunde kwa kila sloti ya mtandao.

Hifadhi faili yako ya vigezo iliyohaririwa katika saraka yoyote unayotaka (katika mfano hapa chini, imehifadhiwa kwenye eneo-kazi) na kisha uitumie kuendesha kifurushi chako cha Kurtosis kwa kuendesha:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Kumbuka: amri ya `kurtosis clean -a` inatumika hapa kuelekeza Kurtosis kuharibu mtandao wa majaribio wa zamani na yaliyomo kabla ya kuanzisha mpya.

Tena, Kurtosis itafanya kazi kwa muda na kuchapisha hatua za kibinafsi zinazofanyika. Hatimaye, matokeo yanapaswa kuonekana kama:

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

Hongera! Umefanikiwa kusanidi mtandao wako wa majaribio wa ndani kuwa na nodi 3 badala ya 1. Ili kuendesha mtiririko wa kazi sawa na uliofanya hapo awali dhidi ya dapp yako (kusambaza na kujaribu), fanya shughuli sawa na tulizofanya hapo awali kwa kubadilisha `<$YOUR_PORT>` katika muundo wa `localnet` kwenye faili yako ya usanidi ya `hardhat.config.ts` na lango la matokeo ya rpc uri kutoka kwa huduma yoyote ya `el-client-<num>` katika mtandao wako mpya wa majaribio wa ndani wa nodi 3.

## Hitimisho {#conclusion}

Na ndivyo hivyo! Ili kurejelea mwongozo huu mfupi, wewe:

- Umeunda mtandao wa majaribio wa ndani wa Ethereum kupitia Docker ukitumia Kurtosis
- Umeunganisha mazingira yako ya uundaji wa dapp ya ndani kwenye mtandao wa ndani wa Ethereum
- Umesambaza dapp na kuendesha jaribio rahisi dhidi yake kwenye mtandao wa ndani wa Ethereum
- Umesanidi mtandao wa msingi wa Ethereum kuwa na nodi 3

Tungependa kusikia kutoka kwako kuhusu kile kilichokwenda vizuri kwako, kile kinachoweza kuboreshwa, au kujibu maswali yako yoyote. Usisite kuwasiliana kupitia [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) au [tutumie barua pepe](mailto:feedback@kurtosistech.com)!

### Mifano na miongozo mingine {#other-examples-guides}

Tunakuhimiza uangalie [mwongozo wetu wa kuanza haraka](https://docs.kurtosis.com/quickstart) (ambapo utajenga hifadhidata ya Postgres na API juu yake) na mifano yetu mingine katika [hazina yetu ya awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) ambapo utapata mifano mizuri, ikijumuisha vifurushi vya:

- [Kuanzisha mtandao wa majaribio wa ndani wa Ethereum sawa](https://github.com/kurtosis-tech/eth2-package), lakini ukiwa na huduma za ziada zilizounganishwa kama vile mtumaji taka wa miamala (ili kuiga miamala), kichunguzi cha mchepuo, na mfano uliounganishwa wa Grafana na Prometheus
- Kufanya [jaribio la mtandao mdogo](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) dhidi ya mtandao wa ndani wa Ethereum sawa