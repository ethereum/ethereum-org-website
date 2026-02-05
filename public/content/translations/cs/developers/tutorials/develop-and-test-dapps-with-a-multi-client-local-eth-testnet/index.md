---
title: Jak vyvíjet a testovat dApp na lokálním, multi-klientském testnetu
description: Tento průvodce vás nejprve provede vytvořením instance a konfigurací lokálního Ethereum testnetu s více klienty a následně použitím testnetu k nasazení a testování dApp.
author: "Tedi Mitiku"
tags:
  [
    "klienti",
    "uzly",
    "smart kontrakt účty",
    "složitelnost",
    "konsensuální vrstva",
    "exekuční vrstva",
    "testování"
  ]
skill: intermediate
lang: cs
published: 2023-04-11
---

## Úvod {#introduction}

Tato příručka vás provede procesem vytvoření instance konfigurovatelného lokálního Ethereum testnetu, nasazením chytrého kontraktu a použitím testnetu ke spuštění testů vaší dApp. Tato příručka je určena pro vývojáře dApps, kteří chtějí lokálně vyvíjet a testovat své dApps s různými konfiguracemi sítě před nasazením na živý testnet nebo mainnet.

V této příručce:

- Vytvoříte instanci lokálního Ethereum testnetu s [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) pomocí [Kurtosis](https://www.kurtosis.com/),
- Připojíte své vývojové prostředí Hardhat dApp k lokálnímu testnetu pro kompilaci, nasazení a testování dApp a
- Nakonfigurujete lokální testnet, včetně parametrů, jako je počet uzlů a konkrétní párování EL/CL klientů, abyste umožnili vývoj a testování s různými konfiguracemi sítě.

### Co je Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) je skládací systém sestavení určený pro konfiguraci vícekontejnerových testovacích prostředí. Umožňuje vývojářům vytvářet reprodukovatelná prostředí, která vyžadují logiku dynamického nastavení, jako jsou například blockchainové testnety.

V této příručce balíček Kurtosis eth-network-package spouští lokální Ethereum testnet s podporou klienta [`geth`](https://geth.ethereum.org/) exekuční vrstvy (EL) a také klientů [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) a [`lodestar`](https://lodestar.chainsafe.io/) konsensuální vrstvy (CL). Tento balíček slouží jako konfigurovatelná a skládací alternativa k sítím v rámcích jako Hardhat Network, Ganache a Anvil. Kurtosis nabízí vývojářům větší kontrolu a flexibilitu nad testnety, které používají, což je hlavní důvod, proč [nadace Ethereum použila Kurtosis k testování Sloučení](https://www.kurtosis.com/blog/testing-the-ethereum-merge) a nadále ho používá k testování upgradů sítě.

## Nastavení Kurtosis {#setting-up-kurtosis}

Než budete pokračovat, ujistěte se, že máte:

- [Nainstalovaný a spuštěný Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) na vašem lokálním počítači
- [Nainstalovaný Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (nebo aktualizovaný na nejnovější verzi, pokud již máte CLI nainstalovaný)
- Nainstalovaný [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) a [npx](https://www.npmjs.com/package/npx) (pro vaše prostředí dApp)

## Vytvoření instance lokálního Ethereum testnetu {#instantiate-testnet}

Pro spuštění lokálního Ethereum testnetu spusťte:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Poznámka: Tento příkaz pojmenuje vaši síť: „local-eth-testnet“ pomocí příznaku `--enclave`.

Kurtosis bude průběžně vypisovat kroky, které provádí, zatímco interpretuje, ověřuje a následně provádí pokyny. Na konci byste měli vidět výstup, který se podobá následujícímu:

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

Gratulujeme! Použili jste Kurtosis k vytvoření instance lokálního Ethereum testnetu s klientem CL (`lighthouse`) a EL (`geth`) přes Docker.

### Rekapitulace {#review-instantiate-testnet}

V této části jste spustili příkaz, který nařídil Kurtosisu, aby použil [`eth-network-package` hostovaný vzdáleně na GitHubu](https://github.com/kurtosis-tech/eth-network-package) ke spuštění lokálního Ethereum testnetu v rámci Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/). Uvnitř vaší enklávy najdete jak „souborové artefakty“, tak „uživatelské služby“.

[Souborové artefakty](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) ve vaší enklávě obsahují všechna data vygenerovaná a využitá k zavedení klientů EL a CL. Data byla vytvořena pomocí služby `prelaunch-data-generator` sestavené z tohoto [obrazu Dockeru](https://github.com/ethpandaops/ethereum-genesis-generator)

Uživatelské služby zobrazují všechny kontejnerizované služby běžící ve vaší enklávě. Všimnete si, že byl vytvořen jediný uzel, který obsahuje klienta EL i klienta CL.

## Připojení vývojového prostředí dApp k lokálnímu Ethereum testnetu {#connect-your-dapp}

### Nastavení vývojového prostředí dApp {#set-up-dapp-env}

Nyní, když máte spuštěný lokální testnet, můžete k němu připojit své vývojové prostředí dApp. V této příručce bude použit framework Hardhat k nasazení blackjack dApp na váš lokální testnet.

Chcete-li nastavit vývojové prostředí dApp, naklonujte repozitář, který obsahuje naši ukázkovou dApp, a nainstalujte její závislosti spuštěním:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Složka [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) použitá zde obsahuje typické nastavení pro vývojáře dApp používajícího framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) obsahuje několik jednoduchých chytrých kontraktů pro Blackjack dApp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) obsahuje skript pro nasazení tokenového kontraktu do vaší lokální sítě Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) obsahuje jednoduchý .js test pro váš tokenový kontrakt, který potvrdí, že každý hráč v naší Blackjack dApp má pro sebe vyraženo 1000 tokenů
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje vaše nastavení Hardhat

### Konfigurace Hardhatu pro použití lokálního testnetu {#configure-hardhat}

S nastaveným vývojovým prostředím dApp nyní připojíte Hardhat k lokálnímu Ethereum testnetu vygenerovanému pomocí Kurtosis. Chcete-li toho dosáhnout, nahraďte `<$YOUR_PORT>` ve struktuře `localnet` v konfiguračním souboru `hardhat.config.ts` portem z výstupu RPC URI libovolné služby `el-client-<num>`. V tomto ukázkovém případě by port byl `64248`. Váš port bude jiný.

Příklad v `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: NAHRAĎTE $YOUR_PORT PORTEM Z URI UZLU, KTERÝ VYTVOŘIL BALÍČEK KURTOSIS ETH-NETWORK-PACKAGE

// Toto jsou soukromé klíče spojené s předem financovanými testovacími účty vytvořenými balíčkem eth-network-package
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

Jakmile soubor uložíte, vaše vývojové prostředí Hardhat dApp je nyní připojeno k vašemu lokálnímu Ethereum testnetu! Funkčnost vašeho testnetu můžete ověřit spuštěním:

```python
npx hardhat balances --network localnet
```

Výstup by měl vypadat přibližně takto:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

To potvrzuje, že Hardhat používá váš lokální testnet a detekuje předfinancované účty vytvořené balíčkem `eth-network-package`.

### Lokální nasazení a testování vaší dApp {#deploy-and-test-dapp}

S vývojovým prostředím dApp plně připojeným k lokálnímu Ethereum testnetu nyní můžete spouštět vývojové a testovací pracovní postupy proti své dApp pomocí lokálního testnetu.

Pro kompilaci a nasazení chytrého kontraktu `ChipToken.sol` pro lokální prototypování a vývoj spusťte:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Výstup by měl vypadat nějak takto:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Nyní zkuste spustit test `simple.js` proti vaší lokální dApp, abyste potvrdili, že každý hráč v naší Blackjack dApp má pro sebe vyraženo 1000 tokenů:

Výstup by měl vypadat přibližně takto:

```python
npx hardhat test --network localnet
```

Výstup by měl vypadat přibližně takto:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Rekapitulace {#review-dapp-workflows}

V tomto bodě jste nastavili vývojové prostředí dApp, připojili jste ho k lokální síti Ethereum vytvořené pomocí Kurtosis a zkompilovali, nasadili a spustili jste jednoduchý test proti vaší dApp.

Nyní se podívejme, jak můžete konfigurovat podkladovou síť pro testování našich dApps v různých konfiguracích sítě.

## Konfigurace lokálního Ethereum testnetu {#configure-testnet}

### Změna konfigurací klientů a počtu uzlů {#configure-client-config-and-num-nodes}

Váš lokální Ethereum testnet lze nakonfigurovat tak, aby používal různé páry klientů EL a CL, stejně jako různý počet uzlů, v závislosti na scénáři a specifické konfiguraci sítě, kterou chcete vyvíjet nebo testovat. To znamená, že po nastavení můžete spustit přizpůsobený lokální testnet a použít jej ke spuštění stejných pracovních postupů (nasazení, testy atd.) v různých konfiguracích sítě, abyste se ujistili, že vše funguje podle očekávání. Chcete-li se dozvědět více o dalších parametrech, které můžete upravit, navštivte tento odkaz.

Vyzkoušejte to! Prostřednictvím souboru JSON můžete balíčku `eth-network-package` předat různé možnosti konfigurace. Tento soubor JSON s parametry sítě poskytuje specifické konfigurace, které Kurtosis použije k nastavení lokální sítě Ethereum.

Vezměte výchozí konfigurační soubor a upravte jej tak, aby se spustily dva uzly s různými páry EL/CL:

- Uzel 1 s `geth`/`lighthouse`
- Uzel 2 s `geth`/`lodestar`
- Uzel 3 s `geth`/`teku`

Tato konfigurace vytváří heterogenní síť implementací uzlů Ethereum pro testování vaší dApp. Váš konfigurační soubor by nyní měl vypadat takto:

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

Každá struktura `participants` odpovídá jednomu uzlu v síti, takže 3 struktury `participants` řeknou Kurtosisu, aby spustil 3 uzly ve vaší síti. Každá struktura `participants` vám umožní určit pár EL a CL použitý pro daný konkrétní uzel.

Struktura `network_params` konfiguruje nastavení sítě, která se používají k vytvoření genesis souborů pro každý uzel, a také další nastavení, jako jsou sekundy na slot sítě.

Uložte si upravený soubor parametrů do libovolného adresáře (v níže uvedeném příkladu je uložen na plochu) a poté ho použijte ke spuštění balíčku Kurtosis spuštěním:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Poznámka: příkaz `kurtosis clean -a` se zde používá k tomu, aby Kurtosis zničil starý testnet a jeho obsah před spuštěním nového.

Kurtosis bude opět chvíli pracovat a vypisovat jednotlivé kroky, které probíhají. Nakonec by výstup měl vypadat nějak takto:

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

Gratulujeme! Úspěšně jste nakonfigurovali svůj lokální testnet tak, aby měl 3 uzly místo 1. Chcete-li spustit stejné pracovní postupy jako dříve proti vaší dApp (nasazení a testování), proveďte stejné operace jako dříve tak, že nahradíte `<$YOUR_PORT>` ve struktuře `localnet` v konfiguračním souboru `hardhat.config.ts` portem z výstupu RPC URI libovolné služby `el-client-<num>` ve vašem novém, 3uzlovém lokálním testnetu.

## Závěr {#conclusion}

A to je vše! Abychom shrnuli tuto krátkou příručku:

- Vytvořili jste lokální Ethereum testnet přes Docker pomocí Kurtosis
- Připojili jste své lokální vývojové prostředí dApp k lokální síti Ethereum
- Nasadili jste dApp a spustili jste na ní jednoduchý test v lokální síti Ethereum
- Nakonfigurovali jste podkladovou síť Ethereum tak, aby měla 3 uzly

Rádi bychom od vás slyšeli, co se vám povedlo, co by se dalo vylepšit, nebo abychom zodpověděli jakékoli vaše dotazy. Neváhejte se nám ozvat přes [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) nebo nám [napište e-mail](mailto:feedback@kurtosistech.com)!

### Další příklady a průvodci {#other-examples-guides}

Doporučujeme vám podívat se na náš [rychlý start](https://docs.kurtosis.com/quickstart) (kde si na něm postavíte databázi Postgres a API) a naše další příklady v našem [repozitáři awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), kde najdete několik skvělých příkladů, včetně balíčků pro:

- Spuštění stejného lokálního Ethereum testnetu, ale s připojenými dalšími službami, jako je spammer transakcí (pro simulaci transakcí), monitor větví a připojená instance Grafana a Prometheus
- Provedení [testu podsíťování](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) proti stejné lokální síti Ethereum
