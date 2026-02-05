---
title: "如何在本地多用戶端測試網上開發和測試 dApp"
description: "本指南將首先引導您完成如何實例化和設定多用戶端的本地以太坊測試網，然後再使用該測試網來部署與測試 dApp。"
author: "Tedi Mitiku"
tags: [ "用戶端", "節點", "智能合約", "可組合性", "共識層", "執行層", "測試" ]
skill: intermediate
lang: zh-tw
published: 2023-04-11
---

## 介紹 {#introduction}

本指南將引導您完成實例化可設定的本地以太坊測試網、將智能合約部署到其中，並使用該測試網對您的 dApp 執行測試的過程。 本指南專為希望在部署到即時測試網或主網之前，針對不同的網路設定在本地開發和測試其 dApp 的 dApp 開發者而設計。

在本指南中，您將會：

- 使用 [Kurtosis](https://www.kurtosis.com/) 和 [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) 實例化一個本地以太坊測試網，
- 將您的 Hardhat dApp 開發環境連接到本地測試網以編譯、部署和測試 dApp，以及
- 設定本地測試網，包括節點數量和特定的 EL/CL 用戶端配對等參數，以實現針對各種網路設定的開發和測試工作流程。

### 什麼是 Kurtosis？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) 是一個可組合的建構系統，專為設定多容器測試環境而設計。 它特別允許開發者創建需要動態設定邏輯的可重現環境，例如區塊鏈測試網。

在本指南中，Kurtosis eth-network-package 會啟動一個本地以太坊測試網，支援 [`geth`](https://geth.ethereum.org/) 執行層 (EL) 用戶端，以及 [`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/) 和 [`lodestar`](https://lodestar.chainsafe.io/) 共識層 (CL) 用戶端。 此套件可作為 Hardhat Network、Ganache 和 Anvil 等框架中網路的可設定和可組合替代方案。 Kurtosis 為開發者提供了對其使用的測試網更大的控制權和靈活性，這也是[以太坊基金會使用 Kurtosis 測試合併](https://www.kurtosis.com/blog/testing-the-ethereum-merge)並繼續使用它來測試網路升級的主要原因。

## 設定 Kurtosis {#setting-up-kurtosis}

在繼續之前，請確定您已經：

- 在您的本地機器上[安裝並啟動 Docker 引擎](https://docs.kurtosis.com/install/#i-install--start-docker)
- [安裝 Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli)（如果您已安裝 CLI，則將其升級到最新版本）
- 安裝 [Node.js](https://nodejs.org/en)、[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) 和 [npx](https://www.npmjs.com/package/npx)（為您的 dApp 環境）

## 實例化本地以太坊測試網 {#instantiate-testnet}

要啟動本地以太坊測試網，請執行：

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

注意：此命令使用 `--enclave` 標誌將您的網路命名為「local-eth-testnet」。

Kurtosis 在解譯、驗證和執行指令時，會印出其在幕後執行的步驟。 最後，您應該會看到類似以下的輸出：

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

恭喜！ 您透過 Docker 使用 Kurtosis 實例化了一個本地以太坊測試網，其中包含一個 CL（`lighthouse`）和一個 EL 用戶端（`geth`）。

### 回顧 {#review-instantiate-testnet}

在本節中，您執行了一個指令，指示 Kurtosis 使用[遠端託管在 GitHub 上的 `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) 在 Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) 中啟動一個本地以太坊測試網。 在您的 enclave 中，您會找到「檔案成品」和「使用者服務」。

您 enclave 中的[檔案成品](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)包含所有用於啟動 EL 和 CL 用戶端的已生成和已使用的資料。 這些資料是使用從這個 [Docker 映像檔](https://github.com/ethpandaops/ethereum-genesis-generator)建構的 `prelaunch-data-generator` 服務建立的

使用者服務會顯示在您 enclave 中運作的所有容器化服務。 您會注意到已建立一個單一節點，該節點同時具有 EL 用戶端和 CL 用戶端。

## 將您的 dApp 開發環境連接到本地以太坊測試網 {#connect-your-dapp}

### 設定 dApp 開發環境 {#set-up-dapp-env}

既然您已擁有一個正在運行的本地測試網，您可以將您的 dApp 開發環境連接到本地測試網來使用。 本指南將使用 Hardhat 框架將一個二十一點 dApp 部署到您的本地測試網。

要設定您的 dApp 開發環境，請複製包含我們的範例 dApp 的儲存庫並安裝其相依性，執行：

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

這裡使用的 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 資料夾包含使用 [Hardhat](https://hardhat.org/) 框架的 dApp 開發者的典型設定：

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) 包含一些用於二十一點 dApp 的簡單智能合約
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) 包含一個用於將代幣合約部署到您的本地以太坊網路的腳本
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) 包含一個針對您的代幣合約的簡單 .js 測試，以確認我們的二十一點 dApp 中的每個玩家都已為他們鑄造了 1000 個代幣
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) 設定您的 Hardhat

### 設定 Hardhat 以使用本地測試網 {#configure-hardhat}

設定好您的 dApp 開發環境後，您現在將連接 Hardhat 以使用 Kurtosis 產生的本地以太坊測試網。 為此，請將您的 `hardhat.config.ts` 設定檔中 `localnet` 結構中的 `<$YOUR_PORT>` 替換為任何 `el-client-<num>` 服務輸出的 RPC URI 的連接埠。 在這個範例中，連接埠會是 `64248`。 您的連接埠會不同。

`hardhat.config.ts` 中的範例：

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO：將 $YOUR_PORT 替換為 ETH NETWORK KURTOSIS 套件產生的節點 URI 的連接埠

// 這些是與 eth-network-package 創建的預先注資測試帳戶相關的私鑰
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

儲存檔案後，您的 Hardhat dApp 開發環境現在已連接到您的本地以太坊測試網！ 您可以透過執行以下命令來驗證您的測試網是否正常運作：

```python
npx hardhat balances --network localnet
```

輸出應該類似這樣：

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

這證實了 Hardhat 正在使用您的本地測試網，並偵測到由 `eth-network-package` 創建的預先注資帳戶。

### 在本地部署和測試您的 dApp {#deploy-and-test-dapp}

在 dApp 開發環境完全連接到本地以太坊測試網後，您現在可以使用本地測試網對您的 dApp 執行開發和測試工作流程。

要編譯和部署 `ChipToken.sol` 智能合約以進行本地原型設計和開發，請執行：

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

輸出應該看起來像：

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

現在嘗試對您的本地 dApp 執行 `simple.js` 測試，以確認我們的二十一點 dApp 中的每個玩家都已為他們鑄造了 1000 個代幣：

輸出應該類似這樣：

```python
npx hardhat test --network localnet
```

輸出應該類似這樣：

```python
ChipToken
    mint
      ✔ 應為玩家一號鑄造 1000 枚籌碼

  1 個通過 (654ms)
```

### 回顧 {#review-dapp-workflows}

至此，您已經設定了一個 dApp 開發環境，將其連接到由 Kurtosis 創建的本地以太坊網路，並已對您的 dApp 進行了編譯、部署和簡單的測試。

現在讓我們來探索如何設定底層網路，以便在不同的網路設定下測試我們的 dApp。

## 設定本地以太坊測試網 {#configure-testnet}

### 變更用戶端設定和節點數量 {#configure-client-config-and-num-nodes}

您的本地以太坊測試網可以設定為使用不同的 EL 和 CL 用戶端配對，以及不同數量的節點，這取決於您要開發或測試的場景和特定的網路設定。 這意味著，一旦設定完成，您就可以啟動一個客製化的本地測試網，並用它來執行相同的工作流程（部署、測試等） 在各種網路設定下，確保一切如預期般運作。 要了解更多關於您可以修改的其他參數，請造訪此連結。

試試看！ 您可以透過 JSON 檔案將各種設定選項傳遞給 `eth-network-package`。 這個網路參數 JSON 檔案提供了 Kurtosis 用於設定本地以太坊網路的特定設定。

取得預設設定檔案並進行編輯，以啟動兩個具有不同 EL/CL 配對的節點：

- 節點 1 使用 `geth`/`lighthouse`
- 節點 2 使用 `geth`/`lodestar`
- 節點 3 使用 `geth`/`teku`

此設定建立了一個異構的以太坊節點實作網路，用於測試您的 dApp。 您的設定檔現在應該如下所示：

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

每個 `participants` 結構對應網路中的一個節點，因此 3 個 `participants` 結構將告知 Kurtosis 在您的網路中啟動 3 個節點。 每個 `participants` 結構將允許您指定該特定節點使用的 EL 和 CL 配對。

`network_params` 結構設定了用於為每個節點建立創世檔的網路設定，以及其他設定，例如網路的每時隙秒數。

將您編輯的參數檔案儲存到您希望的任何目錄中（在下面的範例中，它被儲存到桌面），然後透過執行以下命令來執行您的 Kurtosis 套件：

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

注意：這裡使用 `kurtosis clean -a` 命令來指示 Kurtosis 在啟動新的測試網之前銷毀舊的測試網及其內容。

同樣，Kurtosis 會運作一會兒，並印出正在進行的各個步驟。 最終，輸出應該會像這樣：

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

恭喜！ 您已成功將您的本地測試網設定為擁有 3 個節點，而不是 1 個。 要在您的 dApp 上執行與之前相同的工作流程（部署和測試），請執行與之前相同的操作，將您的 `hardhat.config.ts` 設定檔中 `localnet` 結構中的 `<$YOUR_PORT>` 替換為您的新的 3 節點本地測試網中任何 `el-client-<num>` 服務輸出的 RPC URI 的連接埠。

## 結論 {#conclusion}

就是這樣！ 總結一下本簡短指南，您：

- 使用 Kurtosis 透過 Docker 建立了一個本地以太坊測試網
- 將您的本地 dApp 開發環境連接到本地以太坊網路
- 在本地以太坊網路上部署了一個 dApp 並對其進行了簡單的測試
- 將底層以太坊網路設定為擁有 3 個節點

我們很樂意聽取您對哪些方面進展順利、哪些方面可以改進的意見，或回答您的任何問題。 請隨時透過 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) 或[發送電子郵件給我們](mailto:feedback@kurtosistech.com)與我們聯絡！

### 其他範例和指南 {#other-examples-guides}

我們鼓勵您查看我們的[快速入門](https://docs.kurtosis.com/quickstart)（您將在其中建構 Postgres 資料庫和 API）以及我們 [awesome-kurtosis 儲存庫](https://github.com/kurtosis-tech/awesome-kurtosis)中的其他範例，您將在那裡找到一些很棒的範例，包括以下套件：

- [啟動相同的本地以太坊測試網](https://github.com/kurtosis-tech/eth2-package)，但連接了額外的服務，例如交易發送器（以模擬交易）、分叉監視器，以及一個已連接的 Grafana 和 Prometheus 實例
- 對相同的本地以太坊網路執行[子網路測試](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test)
