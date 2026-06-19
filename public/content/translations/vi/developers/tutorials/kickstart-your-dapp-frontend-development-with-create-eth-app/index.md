---
title: Khởi đầu việc phát triển frontend cho dapp của bạn với create-eth-app
description: Tổng quan về cách sử dụng create-eth-app và các tính năng của nó
author: "Markus Waas"
tags:
  ["frontend", "javascript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: vi
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Lần trước chúng ta đã xem xét [bức tranh toàn cảnh về Solidity](https://soliditydeveloper.com/solidity-overview-2020) và đã đề cập đến [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Bây giờ bạn sẽ tìm hiểu cách sử dụng nó, những tính năng nào được tích hợp và các ý tưởng bổ sung về cách mở rộng nó. Được khởi xướng bởi Paul Razvan Berg, người sáng lập [Sablier](https://sablier.com/), ứng dụng này sẽ khởi đầu việc phát triển frontend của bạn và đi kèm với một số tích hợp tùy chọn để bạn lựa chọn.

## Cài đặt {#installation}

Việc cài đặt yêu cầu Yarn 0.25 trở lên (`npm install yarn --global`). Nó đơn giản như việc chạy lệnh:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Nó sử dụng [create-react-app](https://github.com/facebook/create-react-app) ở bên trong. Để xem ứng dụng của bạn, hãy mở `http://localhost:3000/`. Khi bạn đã sẵn sàng triển khai lên môi trường sản xuất, hãy tạo một gói thu nhỏ (minified bundle) bằng lệnh yarn build. Một cách dễ dàng để lưu trữ ứng dụng này là [Netlify](https://www.netlify.com/). Bạn có thể tạo một kho lưu trữ GitHub, thêm nó vào Netlify, thiết lập lệnh build và bạn đã hoàn tất! Ứng dụng của bạn sẽ được lưu trữ và mọi người đều có thể sử dụng. Và tất cả đều miễn phí.

## Các tính năng {#features}

### React & create-react-app {#react--create-react-app}

Trước hết là trái tim của ứng dụng: React và tất cả các tính năng bổ sung đi kèm với _create-react-app_. Chỉ sử dụng công cụ này cũng là một lựa chọn tuyệt vời nếu bạn không muốn tích hợp Ethereum. Bản thân [React](https://react.dev/) làm cho việc xây dựng các giao diện người dùng (UI) tương tác trở nên thực sự dễ dàng. Nó có thể không thân thiện với người mới bắt đầu như [Vue](https://vuejs.org/), nhưng nó vẫn được sử dụng nhiều nhất, có nhiều tính năng hơn và quan trọng nhất là có hàng ngàn thư viện bổ sung để lựa chọn. _create-react-app_ cũng giúp việc bắt đầu với nó trở nên thực sự dễ dàng và bao gồm:

- Hỗ trợ cú pháp React, JSX, ES6, TypeScript, Flow.
- Các phần mở rộng ngôn ngữ vượt ra ngoài ES6 như toán tử object spread.
- CSS tự động thêm tiền tố (autoprefixed), vì vậy bạn không cần -webkit- hoặc các tiền tố khác.
- Trình chạy kiểm thử đơn vị (unit test) tương tác nhanh với hỗ trợ tích hợp sẵn cho báo cáo mức độ bao phủ (coverage reporting).
- Một máy chủ phát triển trực tiếp cảnh báo về các lỗi phổ biến.
- Một tập lệnh build để đóng gói JS, CSS và hình ảnh cho môi trường sản xuất, với các mã băm (hashes) và sourcemaps.

Đặc biệt, _create-eth-app_ đang sử dụng [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) mới. Một phương pháp để viết các thành phần chức năng (functional components) mạnh mẽ nhưng rất nhỏ gọn. Xem phần bên dưới về Apollo để biết cách chúng được sử dụng trong _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) cho phép bạn có nhiều gói (packages), nhưng có thể quản lý tất cả chúng từ thư mục gốc và cài đặt các phần phụ thuộc (dependencies) cho tất cả cùng một lúc bằng cách sử dụng `yarn install`. Điều này đặc biệt có ý nghĩa đối với các gói bổ sung nhỏ hơn như quản lý địa chỉ/ABI của hợp đồng thông minh (thông tin về nơi bạn đã triển khai hợp đồng thông minh nào và cách giao tiếp với chúng) hoặc tích hợp The Graph, cả hai đều là một phần của `create-eth-app`.

### ethers.js {#ethersjs}

Mặc dù [Web3](https://docs.web3js.org/) vẫn được sử dụng chủ yếu, [Ethers.js](https://docs.ethers.io/) đã thu hút được nhiều sự chú ý hơn như một giải pháp thay thế trong năm qua và là công cụ được tích hợp vào _create-eth-app_. Bạn có thể làm việc với công cụ này, đổi sang Web3 hoặc cân nhắc nâng cấp lên [Ethers.js v5](https://docs.ethers.org/v5/) hiện gần như đã thoát khỏi giai đoạn beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) là một cách thay thế để xử lý dữ liệu so với [Restful API](https://restfulapi.net/). Chúng có một số lợi thế so với Restful API, đặc biệt là đối với dữ liệu Chuỗi khối phi tập trung. Nếu bạn quan tâm đến lý do đằng sau điều này, hãy xem qua bài viết [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Thông thường, bạn sẽ tìm nạp dữ liệu trực tiếp từ hợp đồng thông minh của mình. Bạn muốn đọc thời gian của giao dịch mới nhất? Chỉ cần gọi `MyContract.methods.latestTradeTime().call()` để tìm nạp dữ liệu từ một nút Ethereum vào ứng dụng phi tập trung (dapp) của bạn. Nhưng điều gì sẽ xảy ra nếu bạn cần hàng trăm điểm dữ liệu khác nhau? Điều đó sẽ dẫn đến hàng trăm lần tìm nạp dữ liệu đến nút, mỗi lần đều yêu cầu một [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) khiến dapp của bạn trở nên chậm chạp và kém hiệu quả. Một cách giải quyết có thể là một hàm gọi tìm nạp (fetcher call function) bên trong hợp đồng của bạn để trả về nhiều dữ liệu cùng một lúc. Tuy nhiên, điều này không phải lúc nào cũng lý tưởng.

Và sau đó bạn cũng có thể quan tâm đến dữ liệu lịch sử. Bạn muốn biết không chỉ thời gian giao dịch cuối cùng, mà còn cả thời gian cho tất cả các giao dịch mà chính bạn đã từng thực hiện. Hãy sử dụng gói đồ thị con của _create-eth-app_, đọc [tài liệu](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) và điều chỉnh nó cho các hợp đồng của riêng bạn. Nếu bạn đang tìm kiếm các hợp đồng thông minh phổ biến, thậm chí có thể đã có sẵn một đồ thị con. Hãy kiểm tra [trình khám phá đồ thị con](https://thegraph.com/explorer/).

Khi bạn có một đồ thị con, nó cho phép bạn viết một truy vấn đơn giản trong dapp của mình để truy xuất tất cả dữ liệu Chuỗi khối quan trọng bao gồm cả dữ liệu lịch sử mà bạn cần, chỉ yêu cầu một lần tìm nạp.

### Apollo {#apollo}

Nhờ tích hợp [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), bạn có thể dễ dàng tích hợp The Graph vào dapp React của mình. Đặc biệt khi sử dụng [React hooks và Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), việc tìm nạp dữ liệu đơn giản như viết một truy vấn GraphQL duy nhất trong thành phần (component) của bạn:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Các mẫu (Templates) {#templates}

Hơn thế nữa, bạn có thể chọn từ một số mẫu khác nhau. Cho đến nay, bạn có thể sử dụng tích hợp Aave, Compound, Uniswap hoặc Sablier. Tất cả chúng đều thêm các địa chỉ hợp đồng thông minh dịch vụ quan trọng cùng với các tích hợp đồ thị con được tạo sẵn. Chỉ cần thêm mẫu vào lệnh tạo như `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) là một thị trường cho vay tiền phi tập trung. Người gửi tiền cung cấp thanh khoản cho thị trường để kiếm thu nhập thụ động, trong khi người đi vay có thể vay bằng cách sử dụng tài sản thế chấp. Một tính năng độc đáo của Aave là các [khoản vay chớp nhoáng](https://aave.com/docs/developers/flash-loans) cho phép bạn vay tiền mà không cần bất kỳ tài sản thế chấp nào, miễn là bạn hoàn trả khoản vay trong vòng một giao dịch. Điều này có thể hữu ích, ví dụ như cung cấp cho bạn thêm tiền mặt trong giao dịch chênh lệch giá (arbitrage trading).

Các token được giao dịch giúp bạn kiếm lãi được gọi là _aTokens_.

Khi bạn chọn tích hợp Aave với _create-eth-app_, bạn sẽ nhận được một [tích hợp đồ thị con](https://docs.aave.com/developers/getting-started/using-graphql). Aave sử dụng The Graph và đã cung cấp cho bạn một số đồ thị con sẵn sàng sử dụng trên [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) và [Mạng chính](https://thegraph.com/explorer/subgraph/aave/protocol) ở dạng [thô (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) hoặc [đã định dạng (formatted)](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) cũng tương tự như Aave. Bản tích hợp đã bao gồm [Đồ thị con Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) mới. Các token kiếm lãi ở đây được gọi một cách đáng ngạc nhiên là _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) là một sàn giao dịch phi tập trung (DEX). Các nhà cung cấp thanh khoản có thể kiếm được phí bằng cách cung cấp các token hoặc ether cần thiết cho cả hai bên của một giao dịch. Nó được sử dụng rộng rãi và do đó có một trong những mức thanh khoản cao nhất cho một phạm vi rất rộng các token. Bạn có thể dễ dàng tích hợp nó vào dapp của mình, ví dụ: để cho phép người dùng hoán đổi ETH của họ lấy DAI.

Thật không may, tại thời điểm viết bài này, việc tích hợp chỉ dành cho Uniswap v1 chứ không phải [v2 vừa mới phát hành](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) cho phép người dùng truyền phát (streaming) các khoản thanh toán tiền. Thay vì một ngày trả lương duy nhất, bạn thực sự nhận được tiền của mình liên tục mà không cần quản trị thêm sau lần thiết lập ban đầu. Bản tích hợp bao gồm [đồ thị con riêng](https://thegraph.com/explorer/subgraph/sablierhq/sablier) của nó.

## Bước tiếp theo là gì? {#whats-next}

Nếu bạn có thắc mắc về _create-eth-app_, hãy truy cập [máy chủ cộng đồng Sablier](https://discord.gg/bsS8T47), nơi bạn có thể liên hệ với các tác giả của _create-eth-app_. Đối với một số bước tiếp theo đầu tiên, bạn có thể muốn tích hợp một framework UI như [Material UI](https://mui.com/material-ui/), viết các truy vấn GraphQL cho dữ liệu mà bạn thực sự cần và thiết lập việc triển khai.