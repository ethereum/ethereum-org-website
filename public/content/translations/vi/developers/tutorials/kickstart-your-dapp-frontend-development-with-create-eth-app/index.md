---
title: "Bắt đầu phát triển giao diện người dùng cho ứng dụng phi tập trung của bạn với create-eth-app"
description: "Tổng quan về cách sử dụng create-eth-app và các tính năng của nó"
author: "Markus Waas"
tags:
  [
    "frontend",
    "javascript",
    "ethers.js",
    "the graph",
    "tài chính phi tập trung"
  ]
skill: beginner
lang: vi
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Lần trước chúng ta đã xem xét [bức tranh toàn cảnh về Solidity](https://soliditydeveloper.com/solidity-overview-2020) và đã đề cập đến [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Bây giờ bạn sẽ tìm hiểu cách sử dụng nó, những tính năng được tích hợp và các ý tưởng bổ sung về cách mở rộng nó. Được khởi tạo bởi Paul Razvan Berg, người sáng lập [Sablier](http://sablier.com/), ứng dụng này sẽ giúp bạn bắt đầu phát triển giao diện người dùng và đi kèm với một số tích hợp tùy chọn để bạn lựa chọn.

## Cài đặt {#installation}

Việc cài đặt yêu cầu Yarn 0.25 trở lên (`npm install yarn --global`). Chỉ đơn giản là chạy:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Nó đang sử dụng [create-react-app](https://github.com/facebook/create-react-app) bên dưới. Để xem ứng dụng của bạn, hãy mở `http://localhost:3000/`. Khi bạn đã sẵn sàng triển khai cho sản phẩm, hãy tạo một gói rút gọn bằng lệnh yarn build. Một cách dễ dàng để lưu trữ là sử dụng [Netlify](https://www.netlify.com/). Bạn có thể tạo một kho lưu trữ GitHub, thêm nó vào Netlify, thiết lập lệnh xây dựng và thế là xong! Ứng dụng của bạn sẽ được lưu trữ và mọi người đều có thể sử dụng. Và tất cả đều miễn phí.

## Các tính năng {#features}

### React & create-react-app {#react--create-react-app}

Trước hết là trung tâm của ứng dụng: React và tất cả các tính năng bổ sung đi kèm với _create-react-app_. Chỉ sử dụng cái này là một lựa chọn tuyệt vời nếu bạn không muốn tích hợp Ethereum. Bản thân [React](https://react.dev/) giúp việc xây dựng giao diện người dùng tương tác trở nên thực sự dễ dàng. Nó có thể không thân thiện với người mới bắt đầu như [Vue](https://vuejs.org/), nhưng nó vẫn được sử dụng chủ yếu, có nhiều tính năng hơn và quan trọng nhất là có hàng nghìn thư viện bổ sung để lựa chọn. _create-react-app_ cũng giúp bạn bắt đầu với nó rất dễ dàng và bao gồm:

- Hỗ trợ cú pháp React, JSX, ES6, TypeScript, Flow.
- Các tính năng ngôn ngữ bổ sung ngoài ES6 như toán tử trải đối tượng (object spread operator).
- CSS được tự động thêm tiền tố, vì vậy bạn không cần `-webkit-` hoặc các tiền tố khác.
- Một trình chạy kiểm thử đơn vị tương tác nhanh với hỗ trợ tích hợp cho báo cáo phạm vi bao phủ.
- Một máy chủ phát triển trực tiếp cảnh báo về các lỗi phổ biến.
- Một tập lệnh xây dựng để đóng gói JS, CSS và hình ảnh cho sản phẩm, với các hàm băm và sơ đồ nguồn.

Cụ thể, _create-eth-app_ đang sử dụng [hiệu ứng hook](https://legacy.reactjs.org/docs/hooks-effect.html) mới. Một phương pháp để viết các thành phần chức năng mạnh mẽ nhưng rất nhỏ. Xem phần bên dưới về Apollo để biết cách chúng được sử dụng trong _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) cho phép bạn có nhiều gói, nhưng có thể quản lý tất cả chúng từ thư mục gốc và cài đặt các phụ thuộc cho tất cả cùng một lúc bằng `yarn install`. Điều này đặc biệt có ý nghĩa đối với các gói bổ sung nhỏ hơn như quản lý địa chỉ/Giao diện nhị phân ứng dụng của hợp đồng thông minh (thông tin về nơi bạn đã triển khai hợp đồng thông minh nào và cách giao tiếp với chúng) hoặc tích hợp a graph, cả hai đều là một phần của `create-eth-app`.

### ethers.js {#ethersjs}

Mặc dù [Web3](https://docs.web3js.org/) vẫn được sử dụng chủ yếu, [ethers.js](https://docs.ethers.io/) đã nhận được nhiều sự chú ý hơn như một giải pháp thay thế trong năm qua và là cái được tích hợp vào _create-eth-app_. Bạn có thể làm việc với cái này, thay đổi nó thành Web3 hoặc cân nhắc nâng cấp lên [ethers.js v5](https://docs.ethers.org/v5/) sắp ra khỏi phiên bản beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) là một cách xử lý dữ liệu thay thế so với [API Restful](https://restfulapi.net/). Chúng có một số lợi thế so với các API Restful, đặc biệt là đối với dữ liệu chuỗi khối phi tập trung. Nếu bạn quan tâm đến lý do đằng sau điều này, hãy xem [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Thông thường, bạn sẽ lấy dữ liệu trực tiếp từ hợp đồng thông minh của mình. Bạn muốn đọc thời gian của giao dịch gần đây nhất? Chỉ cần gọi `MyContract.methods.latestTradeTime().call()` để lấy dữ liệu từ một nút Ethereum vào ứng dụng phi tập trung của bạn. Nhưng điều gì sẽ xảy ra nếu bạn cần hàng trăm điểm dữ liệu khác nhau? Điều đó sẽ dẫn đến hàng trăm lần tìm nạp dữ liệu đến nút, mỗi lần yêu cầu một [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) khiến ứng dụng phi tập trung của bạn chạy chậm và không hiệu quả. Một giải pháp có thể là một hàm gọi trình tìm nạp bên trong hợp đồng của bạn để trả về nhiều dữ liệu cùng một lúc. Tuy nhiên, điều này không phải lúc nào cũng lý tưởng.

Và sau đó bạn cũng có thể quan tâm đến dữ liệu lịch sử. Bạn không chỉ muốn biết thời gian giao dịch cuối cùng, mà còn cả thời gian của tất cả các giao dịch mà bạn đã từng tự thực hiện. Sử dụng gói đồ thị con _create-eth-app_, đọc [tài liệu tham khảo](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) và điều chỉnh nó cho các hợp đồng của riêng bạn. Nếu bạn đang tìm kiếm các hợp đồng thông minh phổ biến, thậm chí có thể đã có một đồ thị con. Hãy xem [trình khám phá đồ thị con](https://thegraph.com/explorer/).

Khi bạn đã có một đồ thị con, nó cho phép bạn viết một truy vấn đơn giản trong ứng dụng phi tập trung của mình để truy xuất tất cả dữ liệu chuỗi khối quan trọng bao gồm cả dữ liệu lịch sử mà bạn cần, chỉ cần một lần tìm nạp.

### Apollo {#apollo}

Nhờ tích hợp [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), bạn có thể dễ dàng tích hợp a graph vào ứng dụng phi tập trung React của mình. Đặc biệt khi sử dụng [React hooks và Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), việc tìm nạp dữ liệu đơn giản như viết một truy vấn GraphQl duy nhất trong thành phần của bạn:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Mẫu {#templates}

Trên hết, bạn có thể chọn từ một số mẫu khác nhau. Cho đến nay, bạn có thể sử dụng tích hợp Aave, Compound, UniSwap hoặc sablier. Tất cả chúng đều thêm các địa chỉ hợp đồng thông minh dịch vụ quan trọng cùng với các tích hợp đồ thị con được tạo sẵn. Chỉ cần thêm mẫu vào lệnh tạo như `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) là một thị trường cho vay tiền phi tập trung. Người gửi tiền cung cấp thanh khoản cho thị trường để kiếm thu nhập thụ động, trong khi người đi vay có thể vay mượn bằng tài sản thế chấp. Một tính năng độc đáo của Aave là [khoản vay nhanh](https://aave.com/docs/developers/flash-loans) cho phép bạn vay mượn tiền mà không cần bất kỳ tài sản thế chấp nào, miễn là bạn trả lại khoản vay trong một giao dịch. Điều này có thể hữu ích, ví dụ như để cung cấp cho bạn thêm tiền mặt khi giao dịch chênh lệch giá.

Các token được giao dịch mang lại cho bạn tiền lãi được gọi là _aTokens_.

Khi bạn chọn tích hợp Aave với _create-eth-app_, bạn sẽ nhận được một [tích hợp đồ thị con](https://docs.aave.com/developers/getting-started/using-graphql). Aave sử dụng The Graph và đã cung cấp cho bạn một số đồ thị con sẵn sàng sử dụng trên [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) và [Mạng chính](https://thegraph.com/explorer/subgraph/aave/protocol) ở dạng [thô](https://thegraph.com/explorer/subgraph/aave/protocol-raw) hoặc [đã định dạng](https://thegraph.com/explorer/subgraph/aave/protocol).

![Ảnh chế Khoản vay nhanh Aave – "Yeahhh, nếu tôi có thể giữ khoản vay nhanh của mình lâu hơn 1 giao dịch thì thật tuyệt"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) tương tự như Aave. Tích hợp này đã bao gồm [Đồ thị con Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) mới. Các token kiếm lãi ở đây được gọi một cách đáng ngạc nhiên là _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) là một Sàn phi tập trung (DEX). Các nhà cung cấp thanh khoản có thể kiếm được phí bằng cách cung cấp các token hoặc ether cần thiết cho cả hai bên của một giao dịch. Nó được sử dụng rộng rãi và do đó có một trong những mức thanh khoản cao nhất cho một loạt các token. Bạn có thể dễ dàng tích hợp nó vào ứng dụng phi tập trung của mình để, ví dụ, cho phép người dùng hoán đổi ETH của họ lấy DAI.

Thật không may, tại thời điểm viết bài này, tích hợp chỉ dành cho Uniswap v1 chứ không phải [phiên bản v2 vừa được phát hành](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) cho phép người dùng phát trực tuyến các khoản thanh toán tiền. Thay vì một ngày trả lương duy nhất, bạn thực sự nhận được tiền của mình liên tục mà không cần quản lý thêm sau khi thiết lập ban đầu. Tích hợp này bao gồm [đồ thị con riêng](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Tiếp theo là gì? {#whats-next}

Nếu bạn có câu hỏi về _create-eth-app_, hãy truy cập [máy chủ cộng đồng Sablier](https://discord.gg/bsS8T47), nơi bạn có thể liên hệ với các tác giả của _create-eth-app_. Một vài bước tiếp theo đầu tiên, bạn có thể muốn tích hợp một khung giao diện người dùng như [Material UI](https://mui.com/material-ui/), viết các truy vấn GraphQL cho dữ liệu bạn thực sự cần và thiết lập triển khai.
