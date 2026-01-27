---
title: "The Graph: Sửa lỗi truy vấn dữ liệu Web3"
description: Chuỗi khối giống như một cơ sở dữ liệu nhưng không có SQL. Tất cả dữ liệu đều ở đó, nhưng không có cách nào để truy cập. Hãy để tôi chỉ cho bạn cách khắc phục sự cố này bằng The Graph và GraphQL.
author: Markus Waas
lang: vi
tags:
  [
    "solidity",
    "hợp đồng thông minh",
    "truy vấn",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Lần này, chúng ta sẽ xem xét kỹ hơn về The Graph, vốn đã trở thành một phần của ngăn xếp tiêu chuẩn để phát triển các ứng dụng phi tập trung trong năm ngoái. Trước tiên, hãy xem cách chúng ta thực hiện theo cách truyền thống...

## Nếu không có The Graph... {#without-the-graph}

Vậy hãy bắt đầu với một ví dụ đơn giản cho mục đích minh họa. Tất cả chúng ta đều thích trò chơi, vì vậy hãy tưởng tượng một trò chơi đơn giản với những người dùng đặt cược:

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Bây giờ, giả sử trong ứng dụng phi tập trung của chúng ta, chúng ta muốn hiển thị tổng số cược, tổng số ván thua/thắng và cũng cập nhật nó bất cứ khi nào ai đó chơi lại. Cách tiếp cận sẽ là:

1. Tìm nạp `totalGamesPlayerWon`.
2. Tìm nạp `totalGamesPlayerLost`.
3. Đăng ký các sự kiện `BetPlaced`.

Chúng ta có thể nghe [sự kiện trong Web3](https://docs.web3js.org/api/web3/class/Contract#events) như hiển thị ở bên phải, nhưng nó đòi hỏi phải xử lý một vài trường hợp.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // sự kiện được kích hoạt
})
.on('changed', function(event) {
    // sự kiện đã bị xóa một lần nữa
})
.on('error', function(error, receipt) {
    // tx bị từ chối
});
```

Hiện tại, điều này vẫn ổn đối với ví dụ đơn giản của chúng ta. Nhưng giả sử bây giờ chúng ta muốn hiển thị số tiền cược thua/thắng chỉ cho người chơi hiện tại. Chà, chúng ta không gặp may rồi, tốt hơn hết bạn nên triển khai một hợp đồng mới lưu trữ các giá trị đó và tìm nạp chúng. Và bây giờ hãy tưởng tượng một hợp đồng thông minh và một ứng dụng phi tập trung phức tạp hơn nhiều, mọi thứ có thể trở nên lộn xộn nhanh chóng.

![Không thể truy vấn đơn giản như vậy](./one-does-not-simply-query.jpg)

Bạn có thể thấy điều này không tối ưu như thế nào:

- Không hoạt động đối với các hợp đồng đã được triển khai.
- Tăng chi phí gas để lưu trữ các giá trị đó.
- Yêu cầu một lệnh gọi khác để tìm nạp dữ liệu cho một nút Ethereum.

![Như vậy là chưa đủ tốt](./not-good-enough.jpg)

Bây giờ chúng ta hãy xem một giải pháp tốt hơn.

## Để tôi giới thiệu cho bạn về GraphQL {#let-me-introduce-to-you-graphql}

Đầu tiên, hãy nói về GraphQL, được Facebook thiết kế và triển khai ban đầu. Bạn có thể đã quen thuộc với mô hình REST API truyền thống. Bây giờ hãy tưởng tượng thay vào đó bạn có thể viết một truy vấn cho chính xác dữ liệu bạn muốn:

![GraphQL API so với REST API](./graphql.jpg)

![](./graphql-query.gif)

Hai hình ảnh này thể hiện khá rõ bản chất của GraphQL. Với truy vấn ở bên phải, chúng ta có thể xác định chính xác dữ liệu mình muốn, vì vậy chúng ta nhận được mọi thứ trong một yêu cầu và không có gì hơn ngoài những gì chúng ta cần. Một máy chủ GraphQL xử lý việc tìm nạp tất cả dữ liệu được yêu cầu, vì vậy phía người tiêu dùng giao diện người dùng cực kỳ dễ sử dụng. [Đây là một lời giải thích hay](https://www.apollographql.com/blog/graphql-explained) về cách máy chủ xử lý chính xác một truy vấn nếu bạn quan tâm.

Bây giờ với kiến thức đó, cuối cùng hãy cùng tìm hiểu về không gian chuỗi khối và The Graph.

## The Graph là gì? {#what-is-the-graph}

Chuỗi khối là một cơ sở dữ liệu phi tập trung, nhưng trái ngược với trường hợp thông thường, chúng ta không có ngôn ngữ truy vấn cho cơ sở dữ liệu này. Các giải pháp để truy xuất dữ liệu rất khó khăn hoặc hoàn toàn không thể. The Graph là một giao thức phi tập trung để lập chỉ mục và truy vấn dữ liệu chuỗi khối. Và bạn có thể đã đoán ra, nó đang sử dụng GraphQL làm ngôn ngữ truy vấn.

![The Graph](./thegraph.png)

Ví dụ luôn là cách tốt nhất để hiểu điều gì đó, vì vậy hãy sử dụng The Graph cho ví dụ GameContract của chúng ta.

## Cách tạo Subgraph {#how-to-create-a-subgraph}

Định nghĩa về cách lập chỉ mục dữ liệu được gọi là subgraph. Nó yêu cầu ba thành phần:

1. Tệp kê khai (`subgraph.yaml`)
2. Lược đồ (`schema.graphql`)
3. Ánh xạ (`mapping.ts`)

### Tệp kê khai (`subgraph.yaml`) {#manifest}

Tệp kê khai là tệp cấu hình của chúng ta và xác định:

- hợp đồng thông minh nào sẽ được lập chỉ mục (địa chỉ, mạng, ABI...)
- sự kiện nào cần lắng nghe
- những thứ khác cần lắng nghe như lệnh gọi hàm hoặc khối
- các hàm ánh xạ được gọi (xem `mapping.ts` bên dưới)

Bạn có thể xác định nhiều hợp đồng và trình xử lý tại đây. Một thiết lập điển hình sẽ có một thư mục subgraph bên trong dự án Hardhat với kho lưu trữ riêng. Sau đó, bạn có thể dễ dàng tham chiếu ABI.

Vì lý do tiện lợi, bạn cũng có thể muốn sử dụng một công cụ tạo mẫu như mustache. Sau đó, bạn tạo một `subgraph.template.yaml` và chèn các địa chỉ dựa trên các lần triển khai mới nhất. Để có một ví dụ thiết lập nâng cao hơn, hãy xem ví dụ kho lưu trữ subgraph Aave [tại đây](https://github.com/aave/aave-protocol/tree/master/thegraph).

Và tài liệu đầy đủ có thể được xem [tại đây](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### Lược đồ (`schema.graphql`) {#schema}

Lược đồ là định nghĩa dữ liệu GraphQL. Nó sẽ cho phép bạn xác định thực thể nào tồn tại và các loại của chúng. Các loại được The Graph hỗ trợ là

- Byte
- ID
- Chuỗi
- Boolean
- Int
- BigInt
- BigDecimal

Bạn cũng có thể sử dụng các thực thể làm loại để xác định mối quan hệ. Trong ví dụ của chúng ta, chúng ta xác định mối quan hệ 1-nhiều từ người chơi đến các lần đặt cược. Dấu ! có nghĩa là giá trị không được để trống. Tài liệu đầy đủ có thể được xem [tại đây](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### Ánh xạ (`mapping.ts`) {#mapping}

Tệp ánh xạ trong The Graph xác định các hàm của chúng ta để chuyển đổi các sự kiện đến thành các thực thể. Nó được viết bằng AssemblyScript, một tập hợp con của Typescript. Điều này có nghĩa là nó có thể được biên dịch thành WASM (WebAssembly) để thực thi ánh xạ hiệu quả và di động hơn.

Bạn sẽ cần xác định từng hàm được đặt tên trong tệp `subgraph.yaml`, vì vậy trong trường hợp của chúng ta, chúng ta chỉ cần một hàm: `handleNewBet`. Đầu tiên, chúng ta cố gắng tải thực thể Player từ địa chỉ người gửi dưới dạng id. Nếu nó không tồn tại, chúng ta tạo một thực thể mới và điền các giá trị ban đầu cho nó.

Sau đó, chúng ta tạo một thực thể Bet mới. Id cho mục này sẽ là `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` để đảm bảo giá trị luôn là duy nhất. Chỉ sử dụng hàm băm là không đủ vì ai đó có thể gọi hàm placeBet nhiều lần trong một giao dịch thông qua một hợp đồng thông minh.

Cuối cùng, chúng ta có thể cập nhật thực thể Player với tất cả dữ liệu. Các mảng không thể được đẩy trực tiếp vào mà cần được cập nhật như được hiển thị ở đây. Chúng ta sử dụng id để tham chiếu đến lần đặt cược. Và `.save()` được yêu cầu ở cuối để lưu trữ một thực thể.

Bạn có thể xem tài liệu đầy đủ tại đây: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Bạn cũng có thể thêm đầu ra ghi nhật ký vào tệp ánh xạ, xem [tại đây](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // tạo nếu chưa tồn tại
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // cập nhật mảng như thế này
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Sử dụng trong Giao diện người dùng {#using-it-in-the-frontend}

Sử dụng một thứ gì đó như Apollo Boost, bạn có thể dễ dàng tích hợp The Graph vào ứng dụng phi tập trung React của mình (hoặc Apollo-Vue). Đặc biệt khi sử dụng các hook React và Apollo, việc tìm nạp dữ liệu cũng đơn giản như viết một truy vấn GraphQL duy nhất trong thành phần của bạn. Một thiết lập điển hình có thể trông như thế này:

```javascript
// Xem tất cả các subgraph: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

Và bây giờ chúng ta có thể viết ví dụ một truy vấn như thế này. Thao tác này sẽ tìm nạp cho chúng ta

- số lần người dùng hiện tại đã thắng
- số lần người dùng hiện tại đã thua
- một danh sách các dấu thời gian với tất cả các lần đặt cược trước đó của họ

Tất cả trong một yêu cầu duy nhất đến máy chủ GraphQL.

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Phép màu](./magic.jpg)

Nhưng chúng ta đang thiếu mảnh ghép cuối cùng và đó là máy chủ. Bạn có thể tự chạy nó hoặc sử dụng dịch vụ được lưu trữ.

## Máy chủ The Graph {#the-graph-server}

### Graph Explorer: Dịch vụ được lưu trữ {#graph-explorer-the-hosted-service}

Cách dễ nhất là sử dụng dịch vụ được lưu trữ. Làm theo hướng dẫn [tại đây](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) để triển khai một subgraph. Đối với nhiều dự án, bạn thực sự có thể tìm thấy các subgraph hiện có trong [explorer](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Chạy nút của riêng bạn {#running-your-own-node}

Ngoài ra, bạn có thể chạy nút của riêng mình. Tài liệu [tại đây](https://github.com/graphprotocol/graph-node#quick-start). Một lý do để làm điều này có thể là sử dụng một mạng không được hỗ trợ bởi dịch vụ được lưu trữ. Các mạng hiện được hỗ trợ [có thể được tìm thấy ở đây](https://thegraph.com/docs/en/developing/supported-networks/).

## Tương lai phi tập trung {#the-decentralized-future}

GraphQL cũng hỗ trợ các luồng cho các sự kiện mới đến. Những tính năng này được hỗ trợ trên The Graph thông qua [Substreams](https://thegraph.com/docs/en/substreams/), hiện đang ở phiên bản beta mở.

Vào [năm 2021](https://thegraph.com/blog/mainnet-migration/), The Graph đã bắt đầu quá trình chuyển đổi sang một mạng lập chỉ mục phi tập trung. Bạn có thể đọc thêm về kiến trúc của mạng lập chỉ mục phi tập trung này [tại đây](https://thegraph.com/docs/en/network/explorer/).

Hai khía cạnh chính là:

1. Người dùng trả tiền cho người lập chỉ mục cho các truy vấn.
2. Người lập chỉ mục đặt cọc Graph Token (GRT).
