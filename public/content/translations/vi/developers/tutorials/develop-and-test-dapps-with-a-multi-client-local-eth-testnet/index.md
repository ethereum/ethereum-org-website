---
title: "Cách phát triển và thử nghiệm dapp trên mạng thử nghiệm đa máy khách cục bộ"
description: "Hướng dẫn này trước tiên sẽ chỉ cho bạn cách khởi tạo và cấu hình mạng thử nghiệm Ethereum đa máy khách cục bộ trước khi sử dụng mạng thử nghiệm đó để triển khai và thử nghiệm dapp."
author: "Tedi Mitiku"
tags:
  [
    "máy khách",
    "nút",
    "hợp đồng thông minh",
    "khả năng kết hợp",
    "lớp đồng thuận",
    "lớp thực thi",
    "thử nghiệm",
  ]
skill: intermediate
breadcrumb: "Mạng thử nghiệm đa máy khách"
lang: vi
published: 2023-04-11
---

## Giới thiệu {#introduction}

Hướng dẫn này sẽ chỉ cho bạn quy trình khởi tạo mạng thử nghiệm Ethereum cục bộ có thể cấu hình, triển khai hợp đồng thông minh lên đó và sử dụng mạng thử nghiệm để chạy các bài kiểm tra cho ứng dụng phi tập trung (dapp) của bạn. Hướng dẫn này được thiết kế dành cho các nhà phát triển dapp muốn phát triển và thử nghiệm dapp của họ cục bộ với các cấu hình mạng lưới khác nhau trước khi triển khai lên mạng thử nghiệm trực tiếp hoặc Mạng chính.

Trong hướng dẫn này, bạn sẽ:

- Khởi tạo mạng thử nghiệm Ethereum cục bộ với [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) bằng cách sử dụng [Kurtosis](https://www.kurtosis.com/),
- Kết nối môi trường phát triển dapp Hardhat của bạn với mạng thử nghiệm cục bộ để biên dịch, triển khai và thử nghiệm dapp, và
- Cấu hình mạng thử nghiệm cục bộ, bao gồm các thông số như số lượng nút và các cặp máy khách EL/CL cụ thể, để cho phép các quy trình phát triển và thử nghiệm với nhiều cấu hình mạng lưới khác nhau.

### Kurtosis là gì? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) là một hệ thống xây dựng có khả năng kết hợp được thiết kế để cấu hình các môi trường thử nghiệm đa vùng chứa (multi-container). Nó đặc biệt cho phép các nhà phát triển tạo ra các môi trường có thể tái tạo yêu cầu logic thiết lập động, chẳng hạn như các mạng thử nghiệm Chuỗi khối.

Trong hướng dẫn này, gói eth-network-package của Kurtosis sẽ khởi chạy một mạng thử nghiệm Ethereum cục bộ có hỗ trợ máy khách lớp thực thi (EL) [`geth`](https://geth.ethereum.org/), cũng như các máy khách lớp đồng thuận (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), và [`lodestar`](https://lodestar.chainsafe.io/). Gói này đóng vai trò như một giải pháp thay thế có khả năng kết hợp và cấu hình được cho các mạng lưới trong các framework như Hardhat Network, Ganache và Anvil. Kurtosis cung cấp cho các nhà phát triển quyền kiểm soát và tính linh hoạt cao hơn đối với các mạng thử nghiệm mà họ sử dụng, đây là lý do chính khiến [Tổ chức Ethereum đã sử dụng Kurtosis để thử nghiệm The Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) và tiếp tục sử dụng nó để thử nghiệm các bản nâng cấp mạng lưới.

## Thiết lập Kurtosis {#setting-up-kurtosis}

Trước khi tiếp tục, hãy đảm bảo bạn đã:

- [Cài đặt và khởi động Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) trên máy cục bộ của bạn
- [Cài đặt Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (hoặc nâng cấp lên phiên bản mới nhất, nếu bạn đã cài đặt CLI)
- Cài đặt [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), và [npx](https://www.npmjs.com/package/npx) (cho môi trường dapp của bạn)

## Khởi tạo mạng thử nghiệm Ethereum cục bộ {#instantiate-testnet}

Để khởi chạy một mạng thử nghiệm Ethereum cục bộ, hãy chạy:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Lưu ý: Lệnh này đặt tên cho mạng lưới của bạn là: "local-eth-testnet” bằng cách sử dụng cờ `--enclave`.

Kurtosis sẽ in ra các bước mà nó đang thực hiện bên trong hệ thống khi nó diễn giải, xác thực và sau đó thực thi các lệnh. Cuối cùng, bạn sẽ thấy một đầu ra tương tự như sau:

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

Xin chúc mừng! Bạn đã sử dụng Kurtosis để khởi tạo một mạng thử nghiệm Ethereum cục bộ, với một máy khách CL (`lighthouse`) và EL (`geth`), thông qua Docker.

### Đánh giá {#review-instantiate-testnet}

Trong phần này, bạn đã thực thi một lệnh chỉ đạo Kurtosis sử dụng [`eth-network-package` được lưu trữ từ xa trên GitHub](https://github.com/kurtosis-tech/eth-network-package) để khởi chạy một mạng thử nghiệm Ethereum cục bộ bên trong một [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) của Kurtosis. Bên trong enclave của bạn, bạn sẽ tìm thấy cả "file artifacts" (tệp tạo tác) và "user services" (dịch vụ người dùng).

Các [File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) trong enclave của bạn bao gồm tất cả dữ liệu được tạo và sử dụng để khởi động các máy khách EL và CL. Dữ liệu được tạo bằng dịch vụ `prelaunch-data-generator` được xây dựng từ [Docker image](https://github.com/ethpandaops/ethereum-genesis-generator) này

Các dịch vụ người dùng hiển thị tất cả các dịch vụ được đóng gói trong vùng chứa đang hoạt động trong enclave của bạn. Bạn sẽ nhận thấy rằng một nút duy nhất, bao gồm cả máy khách EL và máy khách CL, đã được tạo.

## Kết nối môi trường phát triển dapp của bạn với mạng thử nghiệm Ethereum cục bộ {#connect-your-dapp}

### Thiết lập môi trường phát triển dapp {#set-up-dapp-env}

Bây giờ bạn đã có một mạng thử nghiệm cục bộ đang chạy, bạn có thể kết nối môi trường phát triển dapp của mình để sử dụng mạng thử nghiệm cục bộ đó. Framework Hardhat sẽ được sử dụng trong hướng dẫn này để triển khai một dapp blackjack lên mạng thử nghiệm cục bộ của bạn.

Để thiết lập môi trường phát triển dapp của bạn, hãy sao chép kho lưu trữ chứa dapp mẫu của chúng tôi và cài đặt các phần phụ thuộc của nó, chạy:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Thư mục [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) được sử dụng ở đây chứa thiết lập điển hình cho một nhà phát triển dapp sử dụng framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) chứa một vài hợp đồng thông minh đơn giản cho một dapp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) chứa một tập lệnh để triển khai hợp đồng token lên mạng lưới Ethereum cục bộ của bạn
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) chứa một bài kiểm tra .js đơn giản cho hợp đồng token của bạn để xác nhận mỗi người chơi trong dapp Blackjack của chúng tôi đã được đúc 1000 token
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) cấu hình thiết lập Hardhat của bạn

### Cấu hình Hardhat để sử dụng mạng thử nghiệm cục bộ {#configure-hardhat}

Với môi trường phát triển dapp đã được thiết lập, bây giờ bạn sẽ kết nối Hardhat để sử dụng mạng thử nghiệm Ethereum cục bộ được tạo bằng Kurtosis. Để thực hiện việc này, hãy thay thế `<$YOUR_PORT>` trong cấu trúc `localnet` ở tệp cấu hình `hardhat.config.ts` của bạn bằng cổng của rpc uri được xuất ra từ bất kỳ dịch vụ `el-client-<num>` nào. Trong trường hợp mẫu này, cổng sẽ là `64248`. Cổng của bạn sẽ khác.

Ví dụ trong `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: THAY THẾ $YOUR_PORT BẰNG CỔNG CỦA URI NÚT ĐƯỢC TẠO BỞI GÓI KURTOSIS MẠNG LƯỚI ETH

// Đây là các khóa riêng tư liên kết với các tài khoản thử nghiệm đã được cấp vốn trước được tạo bởi eth-network-package
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

Sau khi bạn lưu tệp, môi trường phát triển dapp Hardhat của bạn hiện đã được kết nối với mạng thử nghiệm Ethereum cục bộ! Bạn có thể xác minh rằng mạng thử nghiệm của mình đang hoạt động bằng cách chạy:

```python
npx hardhat balances --network localnet
```

Đầu ra sẽ trông giống như thế này:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Điều này xác nhận rằng Hardhat đang sử dụng mạng thử nghiệm cục bộ của bạn và phát hiện các tài khoản đã được cấp vốn trước do `eth-network-package` tạo ra.

### Triển khai và thử nghiệm dapp của bạn cục bộ {#deploy-and-test-dapp}

Với môi trường phát triển dapp được kết nối hoàn toàn với mạng thử nghiệm Ethereum cục bộ, giờ đây bạn có thể chạy các quy trình phát triển và thử nghiệm cho dapp của mình bằng cách sử dụng mạng thử nghiệm cục bộ.

Để biên dịch và triển khai hợp đồng thông minh `ChipToken.sol` cho việc tạo nguyên mẫu và phát triển cục bộ, hãy chạy:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Đầu ra sẽ trông giống như:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Bây giờ hãy thử chạy bài kiểm tra `simple.js` cho dapp cục bộ của bạn để xác nhận mỗi người chơi trong dapp Blackjack của chúng tôi đã được đúc 1000 token:

Đầu ra sẽ trông giống như thế này:

```python
npx hardhat test --network localnet
```

Đầu ra sẽ trông giống như thế này:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Đánh giá {#review-dapp-workflows}

Tại thời điểm này, bạn đã thiết lập xong môi trường phát triển dapp, kết nối nó với mạng lưới Ethereum cục bộ do Kurtosis tạo ra, đồng thời đã biên dịch, triển khai và chạy một bài kiểm tra đơn giản cho dapp của bạn.

Bây giờ hãy cùng khám phá cách bạn có thể cấu hình mạng lưới cơ sở để thử nghiệm các dapp của chúng ta dưới các cấu hình mạng lưới khác nhau.

## Cấu hình mạng thử nghiệm Ethereum cục bộ {#configure-testnet}

### Thay đổi cấu hình máy khách và số lượng nút {#configure-client-config-and-num-nodes}

Mạng thử nghiệm Ethereum cục bộ của bạn có thể được cấu hình để sử dụng các cặp máy khách EL và CL khác nhau, cũng như số lượng nút khác nhau, tùy thuộc vào kịch bản và cấu hình mạng lưới cụ thể mà bạn muốn phát triển hoặc thử nghiệm. Điều này có nghĩa là, sau khi được thiết lập, bạn có thể khởi chạy một mạng thử nghiệm cục bộ tùy chỉnh và sử dụng nó để chạy các quy trình tương tự (việc triển khai, thử nghiệm, v.v.) dưới nhiều cấu hình mạng lưới khác nhau để đảm bảo mọi thứ hoạt động như mong đợi. Để tìm hiểu thêm về các thông số khác mà bạn có thể sửa đổi, hãy truy cập liên kết này.

Hãy thử xem! Bạn có thể truyền các tùy chọn cấu hình khác nhau cho `eth-network-package` thông qua một tệp JSON. Tệp JSON chứa các thông số mạng lưới này cung cấp các cấu hình cụ thể mà Kurtosis sẽ sử dụng để thiết lập mạng lưới Ethereum cục bộ.

Lấy tệp cấu hình mặc định và chỉnh sửa nó để khởi chạy hai nút với các cặp EL/CL khác nhau:

- Nút 1 với `geth`/`lighthouse`
- Nút 2 với `geth`/`lodestar`
- Nút 3 với `geth`/`teku`

Cấu hình này tạo ra một mạng lưới không đồng nhất gồm các triển khai nút Ethereum để thử nghiệm dapp của bạn. Tệp cấu hình của bạn bây giờ sẽ trông giống như:

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

Mỗi cấu trúc `participants` ánh xạ tới một nút trong mạng lưới, vì vậy 3 cấu trúc `participants` sẽ yêu cầu Kurtosis khởi chạy 3 nút trong mạng lưới của bạn. Mỗi cấu trúc `participants` sẽ cho phép bạn chỉ định cặp EL và CL được sử dụng cho nút cụ thể đó.

Cấu trúc `network_params` cấu hình các cài đặt mạng lưới được sử dụng để tạo các tệp genesis cho mỗi nút cũng như các cài đặt khác như số giây mỗi khe của mạng lưới.

Lưu tệp thông số đã chỉnh sửa của bạn vào bất kỳ thư mục nào bạn muốn (trong ví dụ bên dưới, nó được lưu vào màn hình nền) và sau đó sử dụng nó để chạy gói Kurtosis của bạn bằng cách chạy:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Lưu ý: lệnh `kurtosis clean -a` được sử dụng ở đây để hướng dẫn Kurtosis phá hủy mạng thử nghiệm cũ và nội dung của nó trước khi khởi động một mạng mới.

Một lần nữa, Kurtosis sẽ hoạt động một lúc và in ra các bước riêng lẻ đang diễn ra. Cuối cùng, đầu ra sẽ trông giống như:

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

Xin chúc mừng! Bạn đã cấu hình thành công mạng thử nghiệm cục bộ của mình để có 3 nút thay vì 1. Để chạy các quy trình tương tự như bạn đã làm trước đây cho dapp của mình (triển khai và thử nghiệm), hãy thực hiện các thao tác tương tự như chúng ta đã làm trước đây bằng cách thay thế `<$YOUR_PORT>` trong cấu trúc `localnet` ở tệp cấu hình `hardhat.config.ts` của bạn bằng cổng của rpc uri được xuất ra từ bất kỳ dịch vụ `el-client-<num>` nào trong mạng thử nghiệm cục bộ 3 nút mới của bạn.

## Kết luận {#conclusion}

Và thế là xong! Để tóm tắt hướng dẫn ngắn này, bạn đã:

- Tạo một mạng thử nghiệm Ethereum cục bộ thông qua Docker bằng cách sử dụng Kurtosis
- Kết nối môi trường phát triển dapp cục bộ của bạn với mạng lưới Ethereum cục bộ
- Triển khai một dapp và chạy một bài kiểm tra đơn giản cho nó trên mạng lưới Ethereum cục bộ
- Cấu hình mạng lưới Ethereum cơ sở để có 3 nút

Chúng tôi rất muốn nghe ý kiến từ bạn về những gì đã diễn ra tốt đẹp, những gì có thể được cải thiện hoặc để trả lời bất kỳ câu hỏi nào của bạn. Đừng ngần ngại liên hệ qua [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) hoặc [gửi email cho chúng tôi](mailto:feedback@kurtosistech.com)!

### Các ví dụ và hướng dẫn khác {#other-examples-guides}

Chúng tôi khuyến khích bạn xem qua [hướng dẫn bắt đầu nhanh](https://docs.kurtosis.com/quickstart) của chúng tôi (nơi bạn sẽ xây dựng một cơ sở dữ liệu Postgres và API trên đó) và các ví dụ khác trong [kho lưu trữ awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) của chúng tôi, nơi bạn sẽ tìm thấy một số ví dụ tuyệt vời, bao gồm các gói cho:

- [Khởi chạy cùng một mạng thử nghiệm Ethereum cục bộ](https://github.com/kurtosis-tech/eth2-package), nhưng có kết nối thêm các dịch vụ bổ sung như trình tạo thư rác giao dịch (để mô phỏng các giao dịch), trình giám sát phân nhánh, cùng với một phiên bản Grafana và Prometheus được kết nối
- Thực hiện một [bài kiểm tra mạng con](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) trên cùng một mạng lưới Ethereum cục bộ