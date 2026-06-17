---
title: "Jak vyvíjet a testovat dApp na lokálním testnetu s více klienty"
description: "Tento průvodce vás nejprve provede tím, jak vytvořit a nakonfigurovat lokální testnet Etherea s více klienty, a poté tento testnet použijete k nasazení a testování dApp."
author: "Tedi Mitiku"
tags:
  [
    "klienti",
    "uzly",
    "chytré kontrakty",
    "komponovatelnost",
    "vrstva konsensu",
    "exekuční vrstva",
    "testování",
  ]
skill: intermediate
breadcrumb: "Testnet s více klienty"
lang: cs
published: 2023-04-11
---

## Úvod {#introduction}

Tento průvodce vás provede procesem vytvoření konfigurovatelného lokálního testnetu Etherea, nasazení chytrého kontraktu na něj a použitím testnetu ke spouštění testů vaší decentralizované aplikace (dapp). Tento průvodce je určen pro vývojáře dapp, kteří chtějí vyvíjet a testovat své dapp lokálně proti různým konfiguracím sítě před nasazením na živý testnet nebo Mainnet.

V tomto průvodci budete:

- Vytvářet lokální testnet Etherea pomocí [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) s využitím nástroje [Kurtosis](https://www.kurtosis.com/),
- Připojovat své vývojové prostředí Hardhat pro dapp k lokálnímu testnetu za účelem kompilace, nasazení a testování dapp, a
- Konfigurovat lokální testnet, včetně parametrů jako je počet uzlů a specifické párování klientů EL/CL, abyste umožnili vývojové a testovací procesy proti různým konfiguracím sítě.

### Co je Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) je komponovatelný sestavovací systém navržený pro konfiguraci testovacích prostředí s více kontejnery. Konkrétně umožňuje vývojářům vytvářet reprodukovatelná prostředí, která vyžadují dynamickou logiku nastavení, jako jsou testnety blockchainu.

V tomto průvodci balíček Kurtosis eth-network-package spustí lokální testnet Etherea s podporou klienta exekuční vrstvy (EL) [`geth`](https://geth.ethereum.org/) a také klientů vrstvy konsensu (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) a [`lodestar`](https://lodestar.chainsafe.io/). Tento balíček slouží jako konfigurovatelná a komponovatelná alternativa k sítím ve frameworcích jako Hardhat Network, Ganache a Anvil. Kurtosis nabízí vývojářům větší kontrolu a flexibilitu nad testnety, které používají, což je hlavní důvod, proč [Nadace Ethereum použila Kurtosis k testování Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) a nadále jej používá k testování upgradů sítě.

## Nastavení Kurtosis {#setting-up-kurtosis}

Než budete pokračovat, ujistěte se, že máte:

- [Nainstalovaný a spuštěný Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) na vašem lokálním počítači
- [Nainstalované Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (nebo aktualizované na nejnovější verzi, pokud již máte CLI nainstalované)
- Nainstalované [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) a [npx](https://www.npmjs.com/package/npx) (pro vaše prostředí dapp)

## Vytvoření lokálního testnetu Etherea {#instantiate-testnet}

Chcete-li spustit lokální testnet Etherea, spusťte:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Poznámka: Tento příkaz pojmenuje vaši síť: „local-eth-testnet“ pomocí příznaku `--enclave`.

Kurtosis vypíše kroky, které provádí na pozadí, když pracuje na interpretaci, validaci a následném provedení instrukcí. Na konci byste měli vidět výstup, který se podobá následujícímu:

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

Gratulujeme! Použili jste Kurtosis k vytvoření lokálního testnetu Etherea s klientem CL (`lighthouse`) a EL (`geth`) přes Docker.

### Shrnutí {#review-instantiate-testnet}

V této části jste provedli příkaz, který nařídil Kurtosis použít [`eth-network-package` hostovaný vzdáleně na GitHubu](https://github.com/kurtosis-tech/eth-network-package) ke spuštění lokálního testnetu Etherea v rámci [Enklávy](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Uvnitř vaší enklávy najdete jak „souborové artefakty“ (file artifacts), tak „uživatelské služby“ (user services).

[Souborové artefakty](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) ve vaší enklávě zahrnují všechna data vygenerovaná a využitá k inicializaci klientů EL a CL. Data byla vytvořena pomocí služby `prelaunch-data-generator` sestavené z tohoto [obrazu Dockeru](https://github.com/ethpandaops/ethereum-genesis-generator)

Uživatelské služby zobrazují všechny kontejnerizované služby fungující ve vaší enklávě. Všimnete si, že byl vytvořen jeden uzel, který obsahuje jak klienta EL, tak klienta CL.

## Připojení vašeho vývojového prostředí dapp k lokálnímu testnetu Etherea {#connect-your-dapp}

### Nastavení vývojového prostředí dapp {#set-up-dapp-env}

Nyní, když máte běžící lokální testnet, můžete připojit své vývojové prostředí dapp, aby váš lokální testnet využívalo. V tomto průvodci bude použit framework Hardhat k nasazení blackjack dapp na váš lokální testnet.

Chcete-li nastavit své vývojové prostředí dapp, naklonujte repozitář, který obsahuje naši ukázkovou dapp, a nainstalujte její závislosti spuštěním:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Zde použitá složka [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) obsahuje typické nastavení pro vývojáře dapp používajícího framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) obsahuje několik jednoduchých chytrých kontraktů pro blackjack dapp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) obsahuje skript pro nasazení kontraktu tokenu do vaší lokální sítě Etherea
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) obsahuje jednoduchý .js test pro váš kontrakt tokenu, který potvrzuje, že každý hráč v naší blackjack dapp má pro sebe vyraženo 1000 tokenů
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje vaše nastavení Hardhat

### Konfigurace Hardhat pro použití lokálního testnetu {#configure-hardhat}

S nastaveným vývojovým prostředím dapp nyní připojíte Hardhat, aby používal lokální testnet Etherea vygenerovaný pomocí Kurtosis. Abyste toho dosáhli, nahraďte `<$YOUR_PORT>` ve struktuře `localnet` ve vašem konfiguračním souboru `hardhat.config.ts` portem z výstupu rpc uri z jakékoli služby `el-client-<num>`. V tomto ukázkovém případě by port byl `64248`. Váš port se bude lišit.

Příklad v `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: NAHRAĎTE $YOUR_PORT PORTEM URI UZLU VYTVOŘENÉHO BALÍČKEM ETH NETWORK KURTOSIS

// Toto jsou soukromé klíče spojené s předplacenými testovacími účty vytvořenými balíčkem eth-network-package
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

Jakmile soubor uložíte, vaše vývojové prostředí Hardhat pro dapp je nyní připojeno k vašemu lokálnímu testnetu Etherea! Můžete ověřit, že váš testnet funguje, spuštěním:

```python
npx hardhat balances --network localnet
```

Výstup by měl vypadat nějak takto:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

To potvrzuje, že Hardhat používá váš lokální testnet a detekuje předem financované účty vytvořené pomocí `eth-network-package`.

### Nasazení a testování vaší dapp lokálně {#deploy-and-test-dapp}

S vývojovým prostředím dapp plně připojeným k lokálnímu testnetu Etherea nyní můžete spouštět vývojové a testovací procesy proti vaší dapp pomocí lokálního testnetu.

Chcete-li zkompilovat a nasadit chytrý kontrakt `ChipToken.sol` pro lokální prototypování a vývoj, spusťte:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Výstup by měl vypadat nějak takto:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Nyní zkuste spustit test `simple.js` proti vaší lokální dapp, abyste potvrdili, že každý hráč v naší blackjack dapp má pro sebe vyraženo 1000 tokenů:

Výstup by měl vypadat nějak takto:

```python
npx hardhat test --network localnet
```

Výstup by měl vypadat nějak takto:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Shrnutí {#review-dapp-workflows}

V tomto okamžiku jste nastavili vývojové prostředí dapp, připojili jej k lokální síti Etherea vytvořené pomocí Kurtosis a zkompilovali, nasadili a spustili jednoduchý test proti vaší dapp.

Nyní se podívejme, jak můžete konfigurovat podkladovou síť pro testování našich dapp v různých konfiguracích sítě.

## Konfigurace lokálního testnetu Etherea {#configure-testnet}

### Změna konfigurací klientů a počtu uzlů {#configure-client-config-and-num-nodes}

Váš lokální testnet Etherea lze nakonfigurovat tak, aby používal různé páry klientů EL a CL, stejně jako různý počet uzlů, v závislosti na scénáři a konkrétní konfiguraci sítě, kterou chcete vyvíjet nebo testovat. To znamená, že po nastavení můžete spustit přizpůsobený lokální testnet a použít jej ke spuštění stejných procesů (nasazení, testy atd.) v různých konfiguracích sítě, abyste se ujistili, že vše funguje podle očekávání. Chcete-li se dozvědět více o dalších parametrech, které můžete upravit, navštivte tento odkaz.

Vyzkoušejte to! Různé možnosti konfigurace můžete předat do `eth-network-package` prostřednictvím souboru JSON. Tento soubor JSON s parametry sítě poskytuje specifické konfigurace, které Kurtosis použije k nastavení lokální sítě Etherea.

Vezměte výchozí konfigurační soubor a upravte jej tak, aby spustil dva uzly s různými páry EL/CL:

- Uzel 1 s `geth`/`lighthouse`
- Uzel 2 s `geth`/`lodestar`
- Uzel 3 s `geth`/`teku`

Tato konfigurace vytváří heterogenní síť implementací uzlů Etherea pro testování vaší dapp. Váš konfigurační soubor by nyní měl vypadat takto:

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

Každá struktura `participants` se mapuje na uzel v síti, takže 3 struktury `participants` řeknou Kurtosis, aby ve vaší síti spustil 3 uzly. Každá struktura `participants` vám umožní specifikovat pár EL a CL použitý pro daný konkrétní uzel.

Struktura `network_params` konfiguruje nastavení sítě, která se používají k vytvoření souborů genesis pro každý uzel, a také další nastavení, jako jsou sekundy na slot sítě.

Uložte svůj upravený soubor s parametry do libovolného adresáře (v níže uvedeném příkladu je uložen na ploše) a poté jej použijte ke spuštění balíčku Kurtosis spuštěním:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Poznámka: příkaz `kurtosis clean -a` se zde používá k tomu, aby dal Kurtosis pokyn zničit starý testnet a jeho obsah před spuštěním nového.

Kurtosis bude opět chvíli pracovat a vypíše jednotlivé kroky, které probíhají. Nakonec by výstup měl vypadat nějak takto:

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

Gratulujeme! Úspěšně jste nakonfigurovali svůj lokální testnet tak, aby měl 3 uzly místo 1. Chcete-li spustit stejné procesy jako dříve proti vaší dapp (nasazení a testování), proveďte stejné operace jako dříve nahrazením `<$YOUR_PORT>` ve struktuře `localnet` ve vašem konfiguračním souboru `hardhat.config.ts` portem z výstupu rpc uri z jakékoli služby `el-client-<num>` ve vašem novém lokálním testnetu se 3 uzly.

## Závěr {#conclusion}

A to je vše! Abychom shrnuli tohoto krátkého průvodce, vy jste:

- Vytvořili lokální testnet Etherea přes Docker pomocí Kurtosis
- Připojili své lokální vývojové prostředí dapp k lokální síti Etherea
- Nasadili dapp a spustili proti ní jednoduchý test na lokální síti Etherea
- Nakonfigurovali podkladovou síť Etherea tak, aby měla 3 uzly

Rádi od vás uslyšíme, co se vám povedlo, co by se dalo zlepšit, nebo zodpovíme jakékoli vaše dotazy. Neváhejte se na nás obrátit přes [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) nebo nám [napište e-mail](mailto:feedback@kurtosistech.com)!

### Další příklady a průvodci {#other-examples-guides}

Doporučujeme vám podívat se na náš [rychlý start](https://docs.kurtosis.com/quickstart) (kde postavíte databázi Postgres a nad ní API) a naše další příklady v našem [repozitáři awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), kde najdete několik skvělých příkladů, včetně balíčků pro:

- [Spuštění stejného lokálního testnetu Etherea](https://github.com/kurtosis-tech/eth2-package), ale s připojenými dalšími službami, jako je spammer transakcí (pro simulaci transakcí), monitor forků a připojená instance Grafana a Prometheus
- Provedení [testu podsítí](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) proti stejné lokální síti Etherea