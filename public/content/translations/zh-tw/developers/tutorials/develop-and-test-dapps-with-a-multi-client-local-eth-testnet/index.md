---
title: 如何在本地多客戶端測試網上開發與測試去中心化應用程式 (dapp)
description: 本指南將首先引導您如何實例化並設定多客戶端本地以太坊測試網，然後使用該測試網部署與測試去中心化應用程式 (dapp)。
author: "泰迪·米提庫"
tags:
  [
    "客戶端",
    "節點",
    "智能合約",
    "可組合性",
    "共識層",
    "執行層",
    "測試",
  ]
skill: intermediate
breadcrumb: 多客戶端測試網
lang: zh-tw
published: 2023-04-11
---

## 簡介 {#introduction}

本指南將引導您完成實例化可設定的本地以太坊測試網、向其部署智能合約，並使用該測試網對您的去中心化應用程式 (dapp) 執行測試的過程。本指南專為希望在部署到即時測試網或主網之前，針對不同網路設定在本地開發與測試其 dapp 的 dapp 開發人員而設計。

在本指南中，您將：

- 使用 [Kurtosis](https://www.kurtosis.com/) 透過 [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) 實例化本地以太坊測試網，
- 將您的 Hardhat dapp 開發環境連接到本地測試網，以編譯、部署和測試 dapp，以及
- 設定本地測試網，包括節點數量和特定的執行層 (EL) / 共識層 (CL) 客戶端配對等參數，以針對各種網路設定啟用開發與測試工作流程。

### 什麼是 Kurtosis？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) 是一個可組合的建置系統，專為設定多容器測試環境而設計。它特別能讓開發人員建立需要動態設定邏輯的可重現環境，例如區塊鏈測試網。

在本指南中，Kurtosis eth-network-package 啟動了一個本地以太坊測試網，支援 [`geth`](https://geth.ethereum.org/) 執行層 (EL) 客戶端，以及 [`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/) 和 [`lodestar`](https://lodestar.chainsafe.io/) 共識層 (CL) 客戶端。此套件可作為 Hardhat Network、Ganache 和 Anvil 等框架中網路的可設定且可組合的替代方案。Kurtosis 為開發人員提供了對其所使用測試網的更大控制權和靈活性，這也是[以太坊基金會使用 Kurtosis 測試合併](https://www.kurtosis.com/blog/testing-the-ethereum-merge)並繼續使用它來測試網路升級的主要原因。

## 設定 Kurtosis {#setting-up-kurtosis}

在繼續之前，請確保您已：

- 在您的本地機器上[安裝並啟動 Docker 引擎](https://docs.kurtosis.com/install/#i-install--start-docker)
- [安裝 Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli)（如果您已經安裝了 CLI，請將其升級到最新版本）
- 安裝 [Node.js](https://nodejs.org/en)、[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) 和 [npx](https://www.npmjs.com/package/npx)（用於您的去中心化應用程式 (dapp) 環境）

## 實例化本地以太坊測試網 {#instantiate-testnet}

要啟動本地以太坊測試網，請執行：

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

注意：此命令使用 `--enclave` 標誌將您的網路命名為：「local-eth-testnet」。

Kurtosis 在解釋、驗證並執行指令時，會印出其在底層執行的步驟。最後，您應該會看到類似以下的輸出：

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

恭喜！您已使用 Kurtosis 透過 Docker 實例化了一個包含共識層 (CL) (`lighthouse`) 和執行層 (EL) 客戶端 (`geth`) 的本地以太坊測試網。

### 回顧 {#review-instantiate-testnet}

在本節中，您執行了一個命令，指示 Kurtosis 使用[遠端託管在 GitHub 上的 `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)，在 Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) 內啟動本地以太坊測試網。在您的 enclave 中，您會找到「檔案工件 (file artifacts)」和「使用者服務 (user services)」。

您的 enclave 中的[檔案工件](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)包含所有產生並用於引導 EL 和 CL 客戶端的資料。這些資料是使用從此 [Docker 映像檔](https://github.com/ethpandaops/ethereum-genesis-generator)建置的 `prelaunch-data-generator` 服務所建立的。

使用者服務會顯示在您的 enclave 中運作的所有容器化服務。您會注意到已經建立了一個同時具備 EL 客戶端和 CL 客戶端的單一節點。

## 將您的去中心化應用程式 (dapp) 開發環境連接到本地以太坊測試網 {#connect-your-dapp}

### 設定 dapp 開發環境 {#set-up-dapp-env}

現在您已經有一個正在運作的本地測試網，您可以連接您的 dapp 開發環境來使用您的本地測試網。本指南將使用 Hardhat 框架將一個二十一點 (blackjack) dapp 部署到您的本地測試網。

要設定您的 dapp 開發環境，請複製包含我們範例 dapp 的儲存庫並安裝其依賴項，請執行：

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

此處使用的 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 資料夾包含使用 [Hardhat](https://hardhat.org/) 框架的 dapp 開發人員的典型設定：

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) 包含幾個用於二十一點 dapp 的簡單智能合約
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) 包含一個將代幣合約部署到本地以太坊網路的腳本
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) 包含一個針對您的代幣合約的簡單 .js 測試，以確認我們二十一點 dapp 中的每位玩家都鑄造了 1000 個代幣
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) 設定您的 Hardhat 環境

### 設定 Hardhat 以使用本地測試網 {#configure-hardhat}

設定好 dapp 開發環境後，您現在將連接 Hardhat 以使用透過 Kurtosis 產生的本地以太坊測試網。為此，請將 `hardhat.config.ts` 設定檔中 `localnet` 結構裡的 `<$YOUR_PORT>` 替換為任何 `el-client-<num>` 服務輸出的 rpc uri 連接埠。在這個範例中，連接埠將是 `64248`。您的連接埠會有所不同。

`hardhat.config.ts` 中的範例：

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: 將 $YOUR_PORT 替換為由 ETH 網路 KURTOSIS 套件產生的節點 URI 通訊埠

// 這些是與 eth-network-package 建立的預先注資測試帳戶相關聯的私鑰
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

儲存檔案後，您的 Hardhat dapp 開發環境現在已連接到您的本地以太坊測試網！您可以透過執行以下命令來驗證您的測試網是否正常運作：

```python
npx hardhat balances --network localnet
```

輸出應該類似於以下內容：

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

這確認了 Hardhat 正在使用您的本地測試網，並偵測到由 `eth-network-package` 建立的預先注資帳戶。

### 在本地部署與測試您的 dapp {#deploy-and-test-dapp}

隨著 dapp 開發環境完全連接到本地以太坊測試網，您現在可以使用本地測試網針對您的 dapp 執行開發與測試工作流程。

要編譯並部署 `ChipToken.sol` 智能合約以進行本地原型設計和開發，請執行：

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

輸出應該類似於：

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

現在嘗試針對您的本地 dapp 執行 `simple.js` 測試，以確認我們二十一點 dapp 中的每位玩家都鑄造了 1000 個代幣：

輸出應該類似於以下內容：

```python
npx hardhat test --network localnet
```

輸出應該類似於以下內容：

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 回顧 {#review-dapp-workflows}

至此，您已經設定了一個 dapp 開發環境，將其連接到由 Kurtosis 建立的本地以太坊網路，並針對您的 dapp 編譯、部署並執行了一個簡單的測試。

現在讓我們探討如何設定底層網路，以便在不同的網路設定下測試我們的 dapp。

## 設定本地以太坊測試網 {#configure-testnet}

### 變更客戶端設定與節點數量 {#configure-client-config-and-num-nodes}

您的本地以太坊測試網可以設定為使用不同的 EL 和 CL 客戶端配對，以及不同數量的節點，具體取決於您想要開發或測試的場景和特定網路設定。這意味著，一旦設定完成，您就可以啟動自訂的本地測試網，並使用它在各種網路設定下執行相同的工作流程（部署、測試等），以確保一切按預期運作。要了解有關您可以修改的其他參數的更多資訊，請造訪此連結。

試試看吧！您可以透過 JSON 檔案將各種設定選項傳遞給 `eth-network-package`。此網路參數 JSON 檔案提供了 Kurtosis 將用來設定本地以太坊網路的特定設定。

採用預設設定檔並對其進行編輯，以啟動具有不同 EL/CL 配對的兩個節點：

- 節點 1 使用 `geth`/`lighthouse`
- 節點 2 使用 `geth`/`lodestar`
- 節點 3 使用 `geth`/`teku`

此設定建立了一個由不同以太坊節點實作組成的異質網路，用於測試您的去中心化應用程式 (dapp)。您的設定檔現在應該如下所示：

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

每個 `participants` 結構對應網路中的一個節點，因此 3 個 `participants` 結構將指示 Kurtosis 在您的網路中啟動 3 個節點。每個 `participants` 結構將允許您指定該特定節點所使用的 EL 和 CL 配對。

`network_params` 結構設定了用於為每個節點建立創世檔案的網路設定，以及網路的每個時槽秒數等其他設定。

將您編輯後的參數檔案儲存在您希望的任何目錄中（在下面的範例中，它被儲存到桌面），然後透過執行以下命令使用它來執行您的 Kurtosis 套件：

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

注意：此處使用 `kurtosis clean -a` 命令來指示 Kurtosis 在啟動新的測試網之前銷毀舊的測試網及其內容。

同樣地，Kurtosis 會運作一會兒並印出正在發生的各個步驟。最終，輸出應該類似於：

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

恭喜！您已成功將本地測試網設定為具有 3 個節點而不是 1 個。要針對您的 dapp 執行與之前相同的工作流程（部署與測試），請執行與之前相同的操作，將 `hardhat.config.ts` 設定檔中 `localnet` 結構裡的 `<$YOUR_PORT>` 替換為新的 3 節點本地測試網中任何 `el-client-<num>` 服務輸出的 rpc uri 連接埠。

## 結論 {#conclusion}

就是這樣！總結這篇簡短的指南，您：

- 使用 Kurtosis 透過 Docker 建立了一個本地以太坊測試網
- 將您的本地去中心化應用程式 (dapp) 開發環境連接到本地以太坊網路
- 在本地以太坊網路上部署了一個 dapp 並對其執行了簡單的測試
- 將底層以太坊網路設定為具有 3 個節點

我們很樂意聽取您的意見，了解哪些方面對您有幫助、哪些方面可以改進，或者回答您的任何問題。請隨時透過 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) 或[電子郵件](mailto:feedback@kurtosistech.com)與我們聯絡！

### 其他範例與指南 {#other-examples-guides}

我們鼓勵您查看我們的[快速入門](https://docs.kurtosis.com/quickstart)（您將在其中建置 Postgres 資料庫和頂層 API）以及我們 [awesome-kurtosis 儲存庫](https://github.com/kurtosis-tech/awesome-kurtosis)中的其他範例，您將在其中找到一些很棒的範例，包括用於以下用途的套件：

- [啟動相同的本地以太坊測試網](https://github.com/kurtosis-tech/eth2-package)，但連接了額外的服務，例如交易發送器 (transaction spammer)（用於模擬交易）、分叉監控器，以及連接的 Grafana 和 Prometheus 實例
- 針對相同的本地以太坊網路執行[子網路測試](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)