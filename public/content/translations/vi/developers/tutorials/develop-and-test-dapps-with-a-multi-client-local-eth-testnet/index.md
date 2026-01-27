---
title: Cách phát triển và thử nghiệm một dApp trên mạng thử nghiệm đa máy khách cục bộ
description: Hướng dẫn này trước tiên sẽ chỉ cho bạn cách khởi tạo và định cấu hình mạng thử nghiệm Ethereum đa máy khách cục bộ trước khi sử dụng mạng thử nghiệm này để triển khai và kiểm tra một dApp.
author: "Tedi Mitiku"
tags:
  [
    "máy khách",
    "nút",
    "hợp đồng thông minh",
    "khả năng tổng hợp",
    "lớp đồng thuận",
    "lớp thực thi",
    "kiểm thử"
  ]
skill: intermediate
lang: vi
published: 2023-04-11
---

## Giới thiệu {#introduction}

Hướng dẫn này sẽ chỉ cho bạn quy trình khởi tạo mạng thử nghiệm Ethereum cục bộ có thể định cấu hình, triển khai hợp đồng thông minh trên đó và sử dụng mạng thử nghiệm để chạy thử nghiệm trên dApp của bạn. Hướng dẫn này được thiết kế dành cho các nhà phát triển dApp muốn phát triển và thử nghiệm các dApp của họ cục bộ so với các cấu hình mạng khác nhau trước khi triển khai lên mạng thử nghiệm trực tiếp hoặc mạng chính.

Trong hướng dẫn này, bạn sẽ:

- Khởi tạo một mạng thử nghiệm Ethereum cục bộ bằng [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) có sử dụng [Kurtosis](https://www.kurtosis.com/),
- Kết nối môi trường phát triển dApp Hardhat của bạn với mạng thử nghiệm cục bộ để biên dịch, triển khai và thử nghiệm một dApp, và
- Cấu hình mạng thử nghiệm cục bộ, bao gồm các tham số như số lượng nút và các cặp máy khách EL/CL cụ thể, để cho phép quy trình phát triển và thử nghiệm so với các cấu hình mạng khác nhau.

### Kurtosis là gì? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) là một hệ thống xây dựng có thể kết hợp được thiết kế để định cấu hình các môi trường thử nghiệm đa vùng chứa. Nó đặc biệt cho phép các nhà phát triển tạo ra các môi trường có thể tái tạo yêu cầu logic thiết lập động, chẳng hạn như mạng thử nghiệm chuỗi khối.

Trong hướng dẫn này, gói mạng eth Kurtosis khởi động một mạng thử nghiệm Ethereum cục bộ có hỗ trợ cho ứng dụng lớp thực thi (EL) [`geth`](https://geth.ethereum.org/), cũng như các ứng dụng lớp đồng thuận (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) và [`lodestar`](https://lodestar.chainsafe.io/). Gói này phục vụ như một giải pháp thay thế có thể định cấu hình và có thể kết hợp cho các mạng trong các khuôn khổ như Hardhat Network, Ganache, và Anvil. Kurtosis cung cấp cho các nhà phát triển sự kiểm soát và linh hoạt cao hơn đối với các mạng thử nghiệm mà họ sử dụng, đây là lý do chính tại sao [Ethereum Foundation đã sử dụng Kurtosis để thử nghiệm The Merge](https://www.kurtosis.com/blog/testing-the-ethereum-merge) và tiếp tục sử dụng nó để thử nghiệm các bản nâng cấp mạng.

## Thiết lập Kurtosis {#setting-up-kurtosis}

Trước khi tiếp tục, hãy đảm bảo bạn có:

- [Đã cài đặt và khởi động công cụ Docker](https://docs.kurtosis.com/install/#i-install--start-docker) trên máy cục bộ của bạn
- [Đã cài đặt Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (hoặc nâng cấp nó lên bản phát hành mới nhất, nếu bạn đã cài đặt CLI)
- Đã cài đặt [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), và [npx](https://www.npmjs.com/package/npx) (cho môi trường dApp của bạn)

## Khởi tạo mạng thử nghiệm Ethereum cục bộ {#instantiate-testnet}

Để khởi động mạng thử nghiệm Ethereum cục bộ, hãy chạy:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Lưu ý: Lệnh này đặt tên cho mạng của bạn: \"local-eth-testnet\” bằng cách sử dụng cờ `--enclave`.

Kurtosis sẽ in các bước mà nó đang thực hiện ngầm khi nó hoạt động để diễn giải, xác thực, và sau đó thực thi các hướng dẫn. Cuối cùng, bạn sẽ thấy một kết quả đầu ra giống như sau:

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

Xin chúc mừng! Bạn đã sử dụng Kurtosis để khởi tạo một mạng thử nghiệm Ethereum cục bộ, với một ứng dụng CL (`lighthouse`) và một ứng dụng EL (`geth`), trên Docker.

### Đánh giá lại {#review-instantiate-testnet}

Trong phần này, bạn đã thực thi một lệnh hướng Kurtosis sử dụng [`eth-network-package` được lưu trữ từ xa trên GitHub](https://github.com/kurtosis-tech/eth-network-package) để khởi động một mạng thử nghiệm Ethereum cục bộ trong một [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Bên trong enclave của bạn, bạn sẽ tìm thấy cả \"tệp tạo tác\" và \"dịch vụ người dùng\".

[Tệp tạo tác](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) trong enclave của bạn bao gồm tất cả dữ liệu được tạo và sử dụng để khởi động các ứng dụng EL và CL. Dữ liệu được tạo bằng cách sử dụng dịch vụ `prelaunch-data-generator` được xây dựng từ [hình ảnh Docker](https://github.com/ethpandaops/ethereum-genesis-generator) này

Các dịch vụ người dùng hiển thị tất cả các dịch vụ được đóng gói đang hoạt động trong enclave của bạn. Bạn sẽ nhận thấy rằng một nút duy nhất, có cả ứng dụng EL và ứng dụng CL, đã được tạo.

## Kết nối môi trường phát triển dApp của bạn với mạng thử nghiệm Ethereum cục bộ {#connect-your-dapp}

### Thiết lập môi trường phát triển dApp {#set-up-dapp-env}

Bây giờ bạn đã có một mạng thử nghiệm cục bộ đang chạy, bạn có thể kết nối môi trường phát triển dApp của mình để sử dụng mạng thử nghiệm cục bộ. Khuôn khổ Hardhat sẽ được sử dụng trong hướng dẫn này để triển khai một dApp blackjack tới mạng thử nghiệm cục bộ của bạn.

Để thiết lập môi trường phát triển dApp của bạn, hãy sao chép kho lưu trữ chứa dApp mẫu của chúng tôi và cài đặt các phần phụ thuộc của nó, hãy chạy:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Thư mục [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) được sử dụng ở đây chứa thiết lập điển hình cho một nhà phát triển dApp sử dụng khuôn khổ [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) chứa một vài hợp đồng thông minh đơn giản cho một dApp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) chứa một tập lệnh để triển khai hợp đồng mã thông báo cho mạng Ethereum cục bộ của bạn
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) chứa một bài kiểm tra .js đơn giản cho hợp đồng mã thông báo của bạn để xác nhận mỗi người chơi trong dApp Blackjack của chúng tôi có 1000 được đúc cho họ
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) cấu hình thiết lập Hardhat của bạn

### Cấu hình Hardhat để sử dụng mạng thử nghiệm cục bộ {#configure-hardhat}

Với môi trường phát triển dApp đã được thiết lập, bây giờ bạn sẽ kết nối Hardhat để sử dụng mạng thử nghiệm Ethereum cục bộ được tạo bằng Kurtosis. Để thực hiện điều này, hãy thay thế `<$YOUR_PORT>` trong cấu trúc `localnet` trong tệp cấu hình `hardhat.config.ts` của bạn bằng cổng của đầu ra rpc uri từ bất kỳ dịch vụ `el-client-<num>` nào. Trong trường hợp mẫu này, cổng sẽ là `64248`. Cổng của bạn sẽ khác.

Ví dụ trong `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: THAY THẾ $YOUR_PORT BẰNG CỔNG CỦA MỘT URI NÚT DO GÓI MẠNG KURTOSIS ETH TẠO RA

// Đây là các khóa riêng được liên kết với các tài khoản thử nghiệm được cấp vốn trước do gói mạng eth tạo ra
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

Sau khi bạn lưu tệp của mình, môi trường phát triển dApp Hardhat của bạn hiện đã được kết nối với mạng thử nghiệm Ethereum cục bộ của bạn! Bạn có thể xác minh rằng mạng thử nghiệm của mình đang hoạt động bằng cách chạy:

```python
npx hardhat balances --network localnet
```

Kết quả đầu ra sẽ trông giống như sau:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Điều này xác nhận rằng Hardhat đang sử dụng mạng thử nghiệm cục bộ của bạn và phát hiện các tài khoản được cấp vốn trước được tạo bởi `eth-network-package`.

### Triển khai và thử nghiệm dApp của bạn cục bộ {#deploy-and-test-dapp}

Với môi trường phát triển dApp được kết nối hoàn toàn với mạng thử nghiệm Ethereum cục bộ, giờ đây bạn có thể chạy quy trình phát triển và thử nghiệm trên dApp của mình bằng cách sử dụng mạng thử nghiệm cục bộ.

Để biên dịch và triển khai hợp đồng thông minh `ChipToken.sol` để tạo mẫu và phát triển cục bộ, hãy chạy:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Đầu ra sẽ trông giống như:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Bây giờ, hãy thử chạy thử nghiệm `simple.js` trên dApp cục bộ của bạn để xác nhận mỗi người chơi trong dApp Blackjack của chúng tôi có 1000 được đúc cho họ:

Kết quả đầu ra sẽ trông giống như sau:

```python
npx hardhat test --network localnet
```

Kết quả đầu ra sẽ trông giống như sau:

```python
ChipToken
    mint
      ✔ nên đúc 1000 chip cho PLAYER ONE

  1 vượt qua (654ms)
```

### Đánh giá lại {#review-dapp-workflows}

Tại thời điểm này, bạn đã thiết lập một môi trường phát triển dApp, kết nối nó với một mạng Ethereum cục bộ được tạo bởi Kurtosis, và đã biên dịch, triển khai và chạy một thử nghiệm đơn giản trên dApp của bạn.

Bây giờ, chúng ta hãy khám phá cách bạn có thể cấu hình mạng cơ bản để thử nghiệm các dApp của chúng tôi trong các cấu hình mạng khác nhau.

## Cấu hình mạng thử nghiệm Ethereum cục bộ {#configure-testnet}

### Thay đổi cấu hình ứng dụng khách và số lượng nút {#configure-client-config-and-num-nodes}

Mạng thử nghiệm Ethereum cục bộ của bạn có thể được cấu hình để sử dụng các cặp ứng dụng EL và CL khác nhau, cũng như một số lượng nút khác nhau, tùy thuộc vào kịch bản và cấu hình mạng cụ thể mà bạn muốn phát triển hoặc thử nghiệm. Điều này có nghĩa là, sau khi thiết lập, bạn có thể khởi động một mạng thử nghiệm cục bộ tùy chỉnh và sử dụng nó để chạy các quy trình công việc tương tự (triển khai, thử nghiệm, v.v.) trong các cấu hình mạng khác nhau để đảm bảo mọi thứ hoạt động như mong đợi. Để tìm hiểu thêm về các tham số khác mà bạn có thể sửa đổi, hãy truy cập liên kết này.

Hãy thử xem! Bạn có thể chuyển các tùy chọn cấu hình khác nhau cho `eth-network-package` thông qua một tệp JSON. Tệp JSON tham số mạng này cung cấp các cấu hình cụ thể mà Kurtosis sẽ sử dụng để thiết lập mạng Ethereum cục bộ.

Lấy tệp cấu hình mặc định và chỉnh sửa nó để khởi động hai nút với các cặp EL/CL khác nhau:

- Nút 1 với `geth`/`lighthouse`
- Nút 2 với `geth`/`lodestar`
- Nút 3 với `geth`/`teku`

Cấu hình này tạo ra một mạng lưới không đồng nhất gồm các triển khai nút Ethereum để thử nghiệm dApp của bạn. Tệp cấu hình của bạn bây giờ sẽ trông như sau:

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

Mỗi cấu trúc `participants` ánh xạ tới một nút trong mạng, vì vậy 3 cấu trúc `participants` sẽ cho Kurtosis biết để khởi động 3 nút trong mạng của bạn. Mỗi cấu trúc `participants` sẽ cho phép bạn chỉ định cặp EL và CL được sử dụng cho nút cụ thể đó.

Cấu trúc `network_params` cấu hình các cài đặt mạng được sử dụng để tạo các tệp genesis cho mỗi nút cũng như các cài đặt khác như số giây mỗi slot của mạng.

Lưu tệp tham số đã chỉnh sửa của bạn vào bất kỳ thư mục nào bạn muốn (trong ví dụ bên dưới, nó được lưu vào màn hình nền) và sau đó sử dụng nó để chạy gói Kurtosis của bạn bằng cách chạy:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Lưu ý: lệnh `kurtosis clean -a` được sử dụng ở đây để hướng dẫn Kurtosis hủy mạng thử nghiệm cũ và nội dung của nó trước khi khởi động một mạng mới.

Một lần nữa, Kurtosis sẽ hoạt động một chút và in ra các bước riêng lẻ đang diễn ra. Cuối cùng, đầu ra sẽ trông giống như:

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

Xin chúc mừng! Bạn đã cấu hình thành công mạng thử nghiệm cục bộ của mình để có 3 nút thay vì 1. Để chạy các quy trình công việc tương tự như bạn đã làm trước đây trên dApp của mình (triển khai & thử nghiệm), hãy thực hiện các thao tác tương tự như chúng tôi đã làm trước đây bằng cách thay thế `<$YOUR_PORT>` trong cấu trúc `localnet` trong tệp cấu hình `hardhat.config.ts` của bạn bằng cổng của đầu ra rpc uri từ bất kỳ dịch vụ `el-client-<num>` nào trong mạng thử nghiệm cục bộ 3 nút mới của bạn.

## Kết luận {#conclusion}

Vậy là xong! Tóm lại hướng dẫn ngắn này, bạn đã:

- Đã tạo một mạng thử nghiệm Ethereum cục bộ trên Docker bằng Kurtosis
- Đã kết nối môi trường phát triển dApp cục bộ của bạn với mạng Ethereum cục bộ
- Đã triển khai một dApp và chạy một thử nghiệm đơn giản trên nó trên mạng Ethereum cục bộ
- Đã cấu hình mạng Ethereum cơ bản để có 3 nút

Chúng tôi rất muốn nghe từ bạn về những gì đã diễn ra tốt đẹp với bạn, những gì có thể được cải thiện, hoặc để trả lời bất kỳ câu hỏi nào của bạn. Đừng ngần ngại liên hệ qua [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) hoặc [gửi email cho chúng tôi](mailto:feedback@kurtosistech.com)!

### Các ví dụ và hướng dẫn khác {#other-examples-guides}

Chúng tôi khuyến khích bạn xem qua [bắt đầu nhanh](https://docs.kurtosis.com/quickstart) của chúng tôi (nơi bạn sẽ xây dựng một cơ sở dữ liệu Postgres và Giao diện Lập trình Ứng dụng trên đó) và các ví dụ khác của chúng tôi trong [kho lưu trữ awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) nơi bạn sẽ tìm thấy một số ví dụ tuyệt vời, bao gồm các gói cho:

- [Khởi động cùng một mạng thử nghiệm Ethereum cục bộ](https://github.com/kurtosis-tech/eth2-package), nhưng với các dịch vụ bổ sung được kết nối như trình spam giao dịch (để mô phỏng giao dịch), trình theo dõi phân nhánh và một phiên bản Grafana và Prometheus được kết nối
- Thực hiện [thử nghiệm mạng con](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) trên cùng một mạng Ethereum cục bộ
