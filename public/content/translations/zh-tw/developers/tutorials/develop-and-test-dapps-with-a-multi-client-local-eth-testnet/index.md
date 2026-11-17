---
title: "如何在本地多客戶端測試網上開發與測試去中心化應用程式 (dapp)"
description: "本指南將首先引導您如何實例化並設定多客戶端本地以太坊測試網，然後使用該測試網部署與測試去中心化應用程式 (dapp)。"
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
breadcrumb: "多客戶端測試網"
lang: zh-tw
published: 2023-04-11
---

## 簡介 {#introduction}

本指南將引導您完成實例化可設定的本地以太坊測試網、向其部署智能合約，並使用該測試網對您的去中心化應用程式 (dapp) 執行測試的過程。本指南專為希望在部署到即時測試網或主網之前，針對不同網路設定在本地開發與測試其 dapp 的 dapp 開發人員而設計。

在本指南中，您將：

- 使用 [Kurtosis](https://www.kurtosis.com/) 透過 [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) 實例化本地以太坊測試網，
- 將您的 Hardhat dapp 開發環境連接到本地測試網，以編譯、部署和測試 dapp，以及
- 設定本地測試網，包括節點數量和特定的執行層 (EL) / 共識層 (CL) 客戶端配對等參數，以實現針對各種網路設定的開發與測試工作流程。

### 什麼是 Kurtosis？ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) 是一個可組合的建置系統，專為設定多容器測試環境而設計。它特別能讓開發人員建立需要動態設定邏輯的可重現環境，例如區塊鏈測試網。

在本指南中，由 [ethPandaOps](https://ethpandaops.io/) 維護的 Kurtosis `ethereum-package` 將啟動一個本地以太坊測試網。它支援所有主要的執行層 (EL) 客戶端，例如 [`geth`](https://geth.ethereum.org/)，以及共識層 (CL) 客戶端，例如 [`teku`](https://consensys.io/teku)、[`lighthouse`](https://lighthouse.sigmaprime.io/) 和 [`lodestar`](https://lodestar.chainsafe.io/)。此套件可作為 Hardhat Network 和 Anvil 等框架中網路的可設定且可組合的替代方案。Kurtosis 為開發人員提供了對其使用的測試網更大的控制權和靈活性，這也是以太坊客戶端團隊使用它來測試網路升級的主要原因。

## 設定 Kurtosis {#setting-up-kurtosis}

在繼續之前，請確保您已：

- 在您的本地機器上[安裝並啟動了 Docker 引擎](https://docs.kurtosis.com/install/#i-install--start-docker)
- [安裝了 Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli)（如果您已經安裝了 CLI，請將其升級到最新版本）
- 安裝了 [Node.js](https://nodejs.org/en)（用於您的 dapp 環境）

## 實例化本地以太坊測試網 {#instantiate-testnet}

要啟動本地以太坊測試網，請執行：

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

注意：此命令使用 `--enclave` 標誌將您的網路命名為「local-eth-testnet」。

Kurtosis 在解釋、驗證並執行指令時，會印出其在底層執行的步驟。最後，它會印出其建立的 enclave（飛地）摘要。該摘要包含**檔案工件 (files artifacts)** 列表和**使用者服務 (user services)** 列表。在預設設定下，使用者服務包含單一節點：

- `el-1-geth-lighthouse`，`geth` 執行客戶端
- `cl-1-lighthouse-geth`，`lighthouse` 信標節點
- `vc-1-geth-lighthouse`，`lighthouse` 驗證者客戶端

每個服務都會列出其公開的連接埠以及每個連接埠對應的本地連接埠。例如，`el-1-geth-lighthouse` 服務的 `rpc` 連接埠是您的 dapp 工具將使用的 JSON-RPC 端點。您機器上的確切服務和連接埠號碼會有所不同。

您可以隨時透過執行以下命令再次檢視此摘要：

```sh
kurtosis enclave inspect local-eth-testnet
```

恭喜！您已使用 Kurtosis 透過 Docker 實例化了一個包含共識層 (CL) (`lighthouse`) 和執行層 (EL) 客戶端 (`geth`) 的本地以太坊測試網。

### 回顧 {#review-instantiate-testnet}

在本節中，您執行了一個命令，指示 Kurtosis 使用[遠端託管在 GitHub 上的 `ethereum-package`](https://github.com/ethpandaops/ethereum-package)，在 Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) 內啟動本地以太坊測試網。在您的 enclave 中，您會找到「檔案工件」和「使用者服務」。

您的 enclave 中的[檔案工件](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)包含產生並用於引導 EL 和 CL 客戶端的所有資料，例如創世檔案和驗證者金鑰。創世資料是使用 [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator) 建立的。

使用者服務顯示在您的 enclave 中運作的所有容器化服務。您會注意到已經建立了一個同時具備 EL 客戶端和 CL 客戶端的單一節點。

## 將您的 dapp 開發環境連接到本地以太坊測試網 {#connect-your-dapp}

### 設定 dapp 開發環境 {#set-up-dapp-env}

現在您已經有一個正在運作的本地測試網，您可以連接您的 dapp 開發環境以使用您的本地測試網。本指南將使用 Hardhat 框架將一個二十一點 dapp 部署到您的本地測試網。

要設定您的 dapp 開發環境，請複製包含我們範例 dapp 的儲存庫並安裝其相依套件，請執行：

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

需要 `--legacy-peer-deps` 標誌，因為範例專案的一些 Hardhat 外掛程式宣告了衝突的對等相依套件版本。

此處使用的 [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) 資料夾包含使用 [Hardhat](https://hardhat.org/) 框架的 dapp 開發人員的典型設定：

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) 包含幾個用於二十一點 dapp 的簡單智能合約
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) 包含一個將代幣合約部署到您的本地以太坊網路的指令碼
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) 包含一個針對您的代幣合約的簡單 .js 測試，以確認已為我們二十一點 dapp 中的每位玩家鑄造了 1000 個代幣
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) 設定您的 Hardhat 環境

### 設定 Hardhat 以使用本地測試網 {#configure-hardhat}

設定好 dapp 開發環境後，您現在將連接 Hardhat 以使用透過 Kurtosis 產生的本地以太坊測試網。首先，找到執行客戶端 JSON-RPC 端點的本地地址：

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

輸出將是一個 URL，例如 `http://127.0.0.1:32769`。您的連接埠會有所不同。將 `hardhat.config.ts` 設定檔中 `localnet` 結構裡的 `<PORT>` 替換為此連接埠。

`hardhat.config.ts` 中的範例：

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: 將 <PORT> 替換為 ETH 網路 Kurtosis 套件所產生的節點 URI 連接埠
  // 這些是與 eth-network-package 建立的預先注資測試帳戶相關的私鑰
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

這些私鑰是公開已知的測試金鑰。切勿在主網或任何公共網路上使用它們。

儲存檔案後，您的 Hardhat dapp 開發環境現在已連接到您的本地以太坊測試網！您可以透過執行以下命令來驗證您的測試網是否正常運作：

```sh
npx hardhat balances --network localnet
```

輸出會列出上述每個帳戶的地址和餘額。例如，第一行應如下所示：

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

這確認了 Hardhat 正在使用您的本地測試網，並偵測到由 `ethereum-package` 建立的預先注資帳戶。

### 在本地部署與測試您的 dapp {#deploy-and-test-dapp}

隨著 dapp 開發環境完全連接到本地以太坊測試網，您現在可以使用本地測試網針對您的 dapp 執行開發與測試工作流程。

要編譯並部署 `ChipToken.sol` 智能合約以進行本地原型設計和開發，請執行：

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

輸出應類似於：

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

現在嘗試針對您的本地 dapp 執行 `ChipToken.js` 測試，以確認已為我們二十一點 dapp 中的每位玩家鑄造了 1000 個代幣。範例測試仍使用 ethers v5 的 `deployed()` 函數，而 ethers v6 已將其替換為 `waitForDeployment()`，因此請先更新它：

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

然後執行測試：

```sh
npx hardhat test --network localnet
```

輸出應類似於以下內容：

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### 回顧 {#review-dapp-workflows}

至此，您已經設定了 dapp 開發環境，將其連接到由 Kurtosis 建立的本地以太坊網路，並已編譯、部署且針對您的 dapp 執行了簡單的測試。

現在讓我們探討如何設定底層網路，以便在不同的網路設定下測試我們的 dapp。

## 設定本地以太坊測試網 {#configure-testnet}

### 變更客戶端設定與節點數量 {#configure-client-config-and-num-nodes}

您的本地以太坊測試網可以設定為使用不同的 EL 和 CL 客戶端配對，以及不同數量的節點，具體取決於您想要開發或測試的場景和特定網路設定。這意味著，一旦設定完成，您就可以啟動自訂的本地測試網，並使用它在各種網路設定下執行相同的工作流程（部署、測試等），以確保一切按預期運作。要了解有關您可以修改的其他參數的更多資訊，請參閱 [`ethereum-package` 設定文件](https://github.com/ethpandaops/ethereum-package#configuration)。

試試看吧！您可以透過 YAML 檔案將各種設定選項傳遞給 `ethereum-package`。此網路參數檔案提供了 Kurtosis 將用來設定本地以太坊網路的特定設定。

建立一個名為 `network_params.yaml` 的檔案，該檔案將啟動三個具有不同 EL/CL 配對的節點：

- 節點 1 使用 `geth`/`lighthouse`
- 節點 2 使用 `geth`/`lodestar`
- 節點 3 使用 `geth`/`teku`

此設定建立了一個由以太坊節點實作組成的異質網路，用於測試您的 dapp。您的設定檔應如下所示：

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

`participants` 中的每個項目都對應到網路中的一個節點，因此 3 個 `participants` 項目將告訴 Kurtosis 在您的網路中啟動 3 個節點。每個項目都允許您指定用於該特定節點的 EL 和 CL 配對。您未指定的任何參數都將保留其預設值。

`network_params` 結構設定了用於為每個節點建立創世檔案的網路設定，以及網路的每個時槽秒數等其他設定。

儲存您的參數檔案，然後透過執行以下命令使用它來執行您的 Kurtosis 套件：

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

注意：此處使用 `kurtosis clean -a` 命令來指示 Kurtosis 在啟動新的測試網之前銷毀舊的測試網及其內容。

同樣地，Kurtosis 會運作一會兒並印出正在發生的各個步驟。最後，它會印出 enclave 摘要。這次，使用者服務包含三個節點，例如執行客戶端的 `el-1-geth-lighthouse`、`el-2-geth-lodestar` 和 `el-3-geth-teku`，以及相符的共識和驗證者客戶端。

恭喜！您已成功將本地測試網設定為具有 3 個節點而不是 1 個。要針對您的 dapp 執行與之前相同的工作流程（部署與測試），請執行與之前相同的操作，將 `hardhat.config.ts` 設定檔中 `localnet` 結構裡的 `<PORT>` 替換為新的 3 節點本地測試網中任何 `el-<num>-...` 服務的 `rpc` 連接埠。

## 結論 {#conclusion}

就是這樣！回顧這篇簡短的指南，您：

- 使用 Kurtosis 透過 Docker 建立了一個本地以太坊測試網
- 將您的本地 dapp 開發環境連接到本地以太坊網路
- 在本地以太坊網路上部署了 dapp 並對其執行了簡單的測試
- 將底層以太坊網路設定為具有 3 個節點

我們很樂意聽取您的意見，了解哪些方面對您有幫助、哪些方面可以改進，或者回答您的任何問題。請隨時透過 [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) 與我們聯絡！

### 其他範例與指南 {#other-examples-guides}

我們鼓勵您查看我們的[快速入門](https://docs.kurtosis.com/quickstart)以及我們 [awesome-kurtosis 儲存庫](https://github.com/kurtosis-tech/awesome-kurtosis)中的其他範例。

`ethereum-package` 還可以在您的網路旁邊啟動其他服務，例如交易發送器（用於模擬交易）、區塊鏈瀏覽器，以及連接的 Grafana 和 Prometheus 實例。要啟用它們，請將它們列在參數檔案中的 `additional_services` 下，如[套件文件](https://github.com/ethpandaops/ethereum-package#configuration)中所述。
