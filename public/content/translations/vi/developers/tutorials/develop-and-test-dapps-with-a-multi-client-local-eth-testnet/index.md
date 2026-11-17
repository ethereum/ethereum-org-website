---
title: "Cách phát triển và kiểm thử một dApp trên mạng thử nghiệm đa máy khách cục bộ"
description: "Hướng dẫn này trước tiên sẽ chỉ cho bạn cách khởi tạo và cấu hình một mạng thử nghiệm Ethereum cục bộ đa máy khách trước khi sử dụng mạng thử nghiệm này để triển khai và kiểm thử một dApp."
author: "Tedi Mitiku"
tags:
  [
    "máy khách",
    "nút",
    "hợp đồng thông minh",
    "khả năng kết hợp",
    "lớp đồng thuận",
    "lớp thực thi",
    "kiểm thử",
  ]
skill: intermediate
breadcrumb: "Mạng thử nghiệm đa máy khách"
lang: vi
published: 2023-04-11
---

## Giới thiệu {#introduction}

Hướng dẫn này sẽ chỉ cho bạn quy trình khởi tạo một mạng thử nghiệm Ethereum cục bộ có thể cấu hình, triển khai một hợp đồng thông minh lên đó và sử dụng mạng thử nghiệm để chạy các bài kiểm thử cho ứng dụng phi tập trung (dapp) của bạn. Hướng dẫn này được thiết kế dành cho các nhà phát triển dapp muốn phát triển và kiểm thử dapp của họ cục bộ với các cấu hình mạng lưới khác nhau trước khi triển khai lên một mạng thử nghiệm thực tế hoặc Mạng chính.

Trong hướng dẫn này, bạn sẽ:

- Khởi tạo một mạng thử nghiệm Ethereum cục bộ với [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) bằng cách sử dụng [Kurtosis](https://www.kurtosis.com/),
- Kết nối môi trường phát triển dapp Hardhat của bạn với mạng thử nghiệm cục bộ để biên dịch, triển khai và kiểm thử một dapp, và
- Cấu hình mạng thử nghiệm cục bộ, bao gồm các tham số như số lượng nút và các cặp máy khách EL/CL cụ thể, để cho phép các quy trình phát triển và kiểm thử với nhiều cấu hình mạng lưới khác nhau.

### Kurtosis là gì? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) là một hệ thống xây dựng có khả năng kết hợp được thiết kế để cấu hình các môi trường kiểm thử đa vùng chứa (multi-container). Nó đặc biệt cho phép các nhà phát triển tạo ra các môi trường có thể tái tạo yêu cầu logic thiết lập động, chẳng hạn như các mạng thử nghiệm Chuỗi khối.

Trong hướng dẫn này, `ethereum-package` của Kurtosis, được duy trì bởi [ethPandaOps](https://ethpandaops.io/), sẽ khởi chạy một mạng thử nghiệm Ethereum cục bộ. Nó hỗ trợ tất cả các máy khách Lớp thực thi (EL) chính, chẳng hạn như [`geth`](https://geth.ethereum.org/), và các máy khách Lớp đồng thuận (CL), chẳng hạn như [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), và [`lodestar`](https://lodestar.chainsafe.io/). Gói này đóng vai trò như một giải pháp thay thế có thể cấu hình và có khả năng kết hợp cho các mạng lưới trong các framework như Hardhat Network và Anvil. Kurtosis cung cấp cho các nhà phát triển quyền kiểm soát và tính linh hoạt cao hơn đối với các mạng thử nghiệm mà họ sử dụng, đây là lý do chính khiến các nhóm máy khách Ethereum sử dụng nó để kiểm thử các bản nâng cấp mạng lưới.

## Thiết lập Kurtosis {#setting-up-kurtosis}

Trước khi tiếp tục, hãy đảm bảo bạn đã:

- [Cài đặt và khởi động Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) trên máy cục bộ của bạn
- [Cài đặt Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (hoặc nâng cấp lên bản phát hành mới nhất, nếu bạn đã cài đặt CLI)
- Cài đặt [Node.js](https://nodejs.org/en) (cho môi trường dapp của bạn)

## Khởi tạo một mạng thử nghiệm Ethereum cục bộ {#instantiate-testnet}

Để khởi chạy một mạng thử nghiệm Ethereum cục bộ, hãy chạy:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Lưu ý: Lệnh này đặt tên cho mạng lưới của bạn là "local-eth-testnet" bằng cách sử dụng cờ `--enclave`.

Kurtosis sẽ in ra các bước mà nó đang thực hiện bên trong hệ thống khi nó diễn giải, xác thực và sau đó thực thi các lệnh. Cuối cùng, nó in ra một bản tóm tắt về enclave mà nó đã tạo. Bản tóm tắt bao gồm một danh sách các **tệp tạo tác (files artifacts)** và một danh sách các **dịch vụ người dùng (user services)**. Với cấu hình mặc định, các dịch vụ người dùng bao gồm một nút duy nhất:

- `el-1-geth-lighthouse`, máy khách thực thi `geth`
- `cl-1-lighthouse-geth`, nút Beacon `lighthouse`
- `vc-1-geth-lighthouse`, máy khách trình xác thực `lighthouse`

Mỗi dịch vụ được liệt kê cùng với các cổng mà nó mở và cổng cục bộ mà mỗi cổng được ánh xạ tới. Ví dụ, cổng `rpc` của dịch vụ `el-1-geth-lighthouse` là điểm cuối JSON-RPC mà các công cụ dapp của bạn sẽ sử dụng. Các dịch vụ và số cổng chính xác sẽ khác nhau trên máy của bạn.

Bạn có thể xem lại bản tóm tắt này bất cứ lúc nào bằng cách chạy:

```sh
kurtosis enclave inspect local-eth-testnet
```

Xin chúc mừng! Bạn đã sử dụng Kurtosis để khởi tạo một mạng thử nghiệm Ethereum cục bộ, với một máy khách CL (`lighthouse`) và EL (`geth`), thông qua Docker.

### Ôn tập {#review-instantiate-testnet}

Trong phần này, bạn đã thực thi một lệnh chỉ đạo Kurtosis sử dụng [`ethereum-package` được lưu trữ từ xa trên GitHub](https://github.com/ethpandaops/ethereum-package) để khởi chạy một mạng thử nghiệm Ethereum cục bộ bên trong một [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) của Kurtosis. Bên trong enclave của bạn, bạn sẽ tìm thấy cả "tệp tạo tác" và "dịch vụ người dùng".

Các [Tệp tạo tác](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) trong enclave của bạn bao gồm tất cả dữ liệu được tạo và sử dụng để khởi động các máy khách EL và CL, chẳng hạn như các tệp genesis và khóa trình xác thực. Dữ liệu genesis được tạo bằng cách sử dụng [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Dịch vụ người dùng hiển thị tất cả các dịch vụ được đóng gói trong vùng chứa (containerized) đang hoạt động trong enclave của bạn. Bạn sẽ nhận thấy rằng một nút duy nhất, bao gồm cả máy khách EL và máy khách CL, đã được tạo.

## Kết nối môi trường phát triển dapp của bạn với mạng thử nghiệm Ethereum cục bộ {#connect-your-dapp}

### Thiết lập môi trường phát triển dapp {#set-up-dapp-env}

Bây giờ bạn đã có một mạng thử nghiệm cục bộ đang chạy, bạn có thể kết nối môi trường phát triển ứng dụng phi tập trung (dapp) của mình để sử dụng mạng thử nghiệm cục bộ. Framework Hardhat sẽ được sử dụng trong hướng dẫn này để triển khai một dapp blackjack lên mạng thử nghiệm cục bộ của bạn.

Để thiết lập môi trường phát triển dapp của bạn, hãy sao chép (clone) kho lưu trữ chứa dapp mẫu của chúng tôi và cài đặt các phần phụ thuộc của nó, hãy chạy:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Cờ `--legacy-peer-deps` là cần thiết vì một số plugin Hardhat của dự án mẫu khai báo các phiên bản phụ thuộc ngang hàng (peer dependency) xung đột nhau.

Thư mục [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) được sử dụng ở đây chứa thiết lập điển hình cho một nhà phát triển dapp sử dụng framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) chứa một vài hợp đồng thông minh đơn giản cho một dapp Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) chứa một tập lệnh để triển khai một hợp đồng token lên mạng lưới Ethereum cục bộ của bạn
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) chứa một bài kiểm thử .js đơn giản cho hợp đồng token của bạn để xác nhận mỗi người chơi trong dapp Blackjack của chúng ta đã được đúc (mint) 1000 token cho họ
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) cấu hình thiết lập Hardhat của bạn

### Cấu hình Hardhat để sử dụng mạng thử nghiệm cục bộ {#configure-hardhat}

Với môi trường phát triển dapp đã được thiết lập, bây giờ bạn sẽ kết nối Hardhat để sử dụng mạng thử nghiệm Ethereum cục bộ được tạo bằng Kurtosis. Đầu tiên, hãy tìm Địa chỉ cục bộ của điểm cuối JSON-RPC của máy khách thực thi:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Đầu ra là một URL chẳng hạn như `http://127.0.0.1:32769`. Cổng của bạn sẽ khác. Thay thế `<PORT>` trong cấu trúc `localnet` trong tệp cấu hình `hardhat.config.ts` của bạn bằng cổng này.

Ví dụ trong `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: THAY THẾ <PORT> BẰNG CỔNG CỦA URI NÚT ĐƯỢC TẠO BỞI GÓI KURTOSIS MẠNG LƯỚI ETH
  // Đây là các khóa riêng tư liên kết với các tài khoản thử nghiệm đã được cấp vốn trước được tạo bởi eth-network-package
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

Các khóa riêng tư này là các khóa kiểm thử được công khai. Không bao giờ sử dụng chúng trên Mạng chính hoặc bất kỳ mạng lưới công khai nào.

Sau khi bạn lưu tệp của mình, môi trường phát triển dapp Hardhat của bạn hiện đã được kết nối với mạng thử nghiệm Ethereum cục bộ! Bạn có thể xác minh rằng mạng thử nghiệm của mình đang hoạt động bằng cách chạy:

```sh
npx hardhat balances --network localnet
```

Đầu ra liệt kê Địa chỉ và số dư của từng tài khoản ở trên. Ví dụ, dòng đầu tiên sẽ trông như thế này:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Điều này xác nhận rằng Hardhat đang sử dụng mạng thử nghiệm cục bộ của bạn và phát hiện các tài khoản đã được cấp vốn trước do `ethereum-package` tạo ra.

### Triển khai và kiểm thử dapp của bạn cục bộ {#deploy-and-test-dapp}

Với môi trường phát triển dapp được kết nối hoàn toàn với mạng thử nghiệm Ethereum cục bộ, giờ đây bạn có thể chạy các quy trình phát triển và kiểm thử cho dapp của mình bằng cách sử dụng mạng thử nghiệm cục bộ.

Để biên dịch và triển khai hợp đồng thông minh `ChipToken.sol` cho việc tạo nguyên mẫu và phát triển cục bộ, hãy chạy:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Đầu ra sẽ trông giống như:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Bây giờ hãy thử chạy bài kiểm thử `ChipToken.js` cho dapp cục bộ của bạn để xác nhận mỗi người chơi trong dapp Blackjack của chúng ta đã được đúc 1000 token cho họ. Bài kiểm thử mẫu vẫn sử dụng hàm `deployed()` của ethers v5, mà ethers v6 đã thay thế bằng `waitForDeployment()`, vì vậy hãy cập nhật nó trước:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Sau đó chạy bài kiểm thử:

```sh
npx hardhat test --network localnet
```

Đầu ra sẽ trông giống như thế này:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Ôn tập {#review-dapp-workflows}

Tại thời điểm này, bạn đã thiết lập xong một môi trường phát triển dapp, kết nối nó với một mạng lưới Ethereum cục bộ do Kurtosis tạo ra, và đã biên dịch, triển khai, cũng như chạy một bài kiểm thử đơn giản cho dapp của bạn.

Bây giờ hãy cùng khám phá cách bạn có thể cấu hình mạng lưới cơ sở để kiểm thử các dapp của chúng ta dưới các cấu hình mạng lưới khác nhau.

## Cấu hình mạng thử nghiệm Ethereum cục bộ {#configure-testnet}

### Thay đổi cấu hình máy khách và số lượng nút {#configure-client-config-and-num-nodes}

Mạng thử nghiệm Ethereum cục bộ của bạn có thể được cấu hình để sử dụng các cặp máy khách EL và CL khác nhau, cũng như số lượng nút khác nhau, tùy thuộc vào kịch bản và cấu hình mạng lưới cụ thể mà bạn muốn phát triển hoặc kiểm thử. Điều này có nghĩa là, sau khi được thiết lập, bạn có thể khởi chạy một mạng thử nghiệm cục bộ tùy chỉnh và sử dụng nó để chạy các quy trình tương tự (việc triển khai, kiểm thử, v.v.) dưới nhiều cấu hình mạng lưới khác nhau để đảm bảo mọi thứ hoạt động như mong đợi. Để tìm hiểu thêm về các tham số khác mà bạn có thể sửa đổi, hãy xem [tài liệu cấu hình `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Hãy thử xem! Bạn có thể truyền các tùy chọn cấu hình khác nhau cho `ethereum-package` thông qua một tệp YAML. Tệp tham số mạng lưới này cung cấp các cấu hình cụ thể mà Kurtosis sẽ sử dụng để thiết lập mạng lưới Ethereum cục bộ.

Tạo một tệp có tên `network_params.yaml` để khởi chạy ba nút với các cặp EL/CL khác nhau:

- Nút 1 với `geth`/`lighthouse`
- Nút 2 với `geth`/`lodestar`
- Nút 3 với `geth`/`teku`

Cấu hình này tạo ra một mạng lưới không đồng nhất gồm các triển khai nút Ethereum để kiểm thử dapp của bạn. Tệp cấu hình của bạn sẽ trông giống như:

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

Mỗi mục trong `participants` ánh xạ tới một nút trong mạng lưới, vì vậy 3 mục `participants` sẽ báo cho Kurtosis khởi chạy 3 nút trong mạng lưới của bạn. Mỗi mục cho phép bạn chỉ định cặp EL và CL được sử dụng cho nút cụ thể đó. Bất kỳ tham số nào bạn không chỉ định sẽ giữ nguyên giá trị mặc định của chúng.

Cấu trúc `network_params` cấu hình các cài đặt mạng lưới được sử dụng để tạo các tệp genesis cho mỗi nút cũng như các cài đặt khác như số giây mỗi khe của mạng lưới.

Lưu tệp tham số của bạn và sau đó sử dụng nó để chạy gói Kurtosis của bạn bằng cách chạy:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Lưu ý: lệnh `kurtosis clean -a` được sử dụng ở đây để hướng dẫn Kurtosis phá hủy mạng thử nghiệm cũ và nội dung của nó trước khi khởi động một mạng mới.

Một lần nữa, Kurtosis sẽ hoạt động một lúc và in ra các bước riêng lẻ đang diễn ra. Cuối cùng, nó in ra bản tóm tắt enclave. Lần này, các dịch vụ người dùng bao gồm ba nút, ví dụ `el-1-geth-lighthouse`, `el-2-geth-lodestar`, và `el-3-geth-teku` cho các máy khách thực thi, cùng với các máy khách đồng thuận và trình xác thực tương ứng.

Xin chúc mừng! Bạn đã cấu hình thành công mạng thử nghiệm cục bộ của mình để có 3 nút thay vì 1. Để chạy các quy trình tương tự như bạn đã làm trước đây cho dapp của mình (triển khai và kiểm thử), hãy thực hiện các thao tác tương tự như chúng ta đã làm trước đó bằng cách thay thế `<PORT>` trong cấu trúc `localnet` trong tệp cấu hình `hardhat.config.ts` của bạn bằng cổng `rpc` của bất kỳ dịch vụ `el-<num>-...` nào trong mạng thử nghiệm cục bộ 3 nút mới của bạn.

## Kết luận {#conclusion}

Và thế là xong! Để tóm tắt lại hướng dẫn ngắn này, bạn đã:

- Tạo một mạng thử nghiệm Ethereum cục bộ qua Docker bằng cách sử dụng Kurtosis
- Kết nối môi trường phát triển dapp cục bộ của bạn với mạng lưới Ethereum cục bộ
- Triển khai một dapp và chạy một bài kiểm thử đơn giản cho nó trên mạng lưới Ethereum cục bộ
- Cấu hình mạng lưới Ethereum cơ sở để có 3 nút

Chúng tôi rất muốn nghe ý kiến từ bạn về những gì đã diễn ra suôn sẻ, những gì có thể được cải thiện, hoặc để trả lời bất kỳ câu hỏi nào của bạn. Đừng ngần ngại liên hệ qua [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Các ví dụ và hướng dẫn khác {#other-examples-guides}

Chúng tôi khuyến khích bạn xem qua [hướng dẫn bắt đầu nhanh](https://docs.kurtosis.com/quickstart) của chúng tôi và các ví dụ khác trong [kho lưu trữ awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) của chúng tôi.

`ethereum-package` cũng có thể khởi động các dịch vụ bổ sung cùng với mạng lưới của bạn, chẳng hạn như một trình tạo giao dịch rác (để mô phỏng các giao dịch), một trình khám phá khối, và các phiên bản Grafana và Prometheus được kết nối. Để kích hoạt chúng, hãy liệt kê chúng dưới mục `additional_services` trong tệp tham số của bạn, như được mô tả trong [tài liệu của gói](https://github.com/ethpandaops/ethereum-package#configuration).
