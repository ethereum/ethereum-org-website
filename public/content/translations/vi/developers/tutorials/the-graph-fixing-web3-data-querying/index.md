---
title: "The Graph: Khắc phục vấn đề truy vấn dữ liệu Web3"
description: Chuỗi khối giống như một cơ sở dữ liệu nhưng không có SQL. Tất cả dữ liệu đều ở đó, nhưng không có cách nào để truy cập. Hãy để tôi chỉ cho bạn cách khắc phục điều này với The Graph và GraphQL.
author: Markus Waas
lang: vi
tags: ["solidity", "hợp đồng thông minh", "truy vấn", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Lần này chúng ta sẽ xem xét kỹ hơn về The Graph, thứ về cơ bản đã trở thành một phần của bộ công cụ tiêu chuẩn để phát triển các ứng dụng phi tập trung (dapp) trong năm qua. Trước tiên, hãy xem chúng ta sẽ làm mọi thứ theo cách truyền thống như thế nào...

## Nếu không có The Graph... {#without-the-graph}

Vì vậy, hãy đi vào một ví dụ đơn giản để minh họa. Tất cả chúng ta đều thích trò chơi, vì vậy hãy tưởng tượng một trò chơi đơn giản với người dùng đặt cược:

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

Bây giờ giả sử trong dapp của chúng ta, chúng ta muốn hiển thị tổng số tiền cược, tổng số trò chơi thua/thắng và cũng cập nhật nó bất cứ khi nào có người chơi lại. Cách tiếp cận sẽ là:

1. Tìm nạp `totalGamesPlayerWon`.
2. Tìm nạp `totalGamesPlayerLost`.
3. Đăng ký nhận các sự kiện `BetPlaced`.

Chúng ta có thể lắng nghe [sự kiện trong Web3](https://docs.web3js.org/api/web3/class/Contract#events) như được hiển thị ở bên phải, nhưng nó đòi hỏi phải xử lý khá nhiều trường hợp.

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
    // giao dịch bị từ chối
});
```

Bây giờ điều này vẫn phần nào ổn đối với ví dụ đơn giản của chúng ta. Nhưng giả sử bây giờ chúng ta muốn hiển thị số tiền cược thua/thắng chỉ cho người chơi hiện tại. Chà, chúng ta không may rồi, tốt hơn là bạn nên triển khai một hợp đồng mới lưu trữ các giá trị đó và tìm nạp chúng. Và bây giờ hãy tưởng tượng một hợp đồng thông minh và dapp phức tạp hơn nhiều, mọi thứ có thể trở nên lộn xộn một cách nhanh chóng.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Bạn có thể thấy điều này không tối ưu như thế nào:

- Không hoạt động đối với các hợp đồng đã được triển khai.
- Tốn thêm chi phí Gas để lưu trữ các giá trị đó.
- Yêu cầu một lệnh gọi khác để tìm nạp dữ liệu cho một nút Ethereum.

![Thats not good enough](./not-good-enough.jpg)

Bây giờ hãy xem xét một giải pháp tốt hơn.

## Hãy để tôi giới thiệu với bạn về GraphQL {#let-me-introduce-to-you-graphql}

Đầu tiên hãy nói về GraphQL, ban đầu được thiết kế và triển khai bởi Facebook. Bạn có thể đã quen thuộc với mô hình REST API truyền thống. Bây giờ hãy tưởng tượng thay vào đó bạn có thể viết một truy vấn cho chính xác dữ liệu mà bạn muốn:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Hai hình ảnh này gần như nắm bắt được bản chất của GraphQL. Với truy vấn ở bên phải, chúng ta có thể xác định chính xác dữ liệu chúng ta muốn, vì vậy ở đó chúng ta nhận được mọi thứ trong một yêu cầu và không có gì nhiều hơn chính xác những gì chúng ta cần. Một máy chủ GraphQL xử lý việc tìm nạp tất cả dữ liệu được yêu cầu, vì vậy nó cực kỳ dễ sử dụng cho phía người dùng frontend. [Đây là một lời giải thích hay](https://www.apollographql.com/blog/graphql-explained) về cách chính xác máy chủ xử lý một truy vấn nếu bạn quan tâm.

Bây giờ với kiến thức đó, cuối cùng hãy bước vào không gian Chuỗi khối và The Graph.

## The Graph là gì? {#what-is-the-graph}

Chuỗi khối là một cơ sở dữ liệu phi tập trung, nhưng trái ngược với những gì thường xảy ra, chúng ta không có ngôn ngữ truy vấn cho cơ sở dữ liệu này. Các giải pháp để truy xuất dữ liệu rất khó khăn hoặc hoàn toàn không thể. The Graph là một Giao thức phi tập trung để lập chỉ mục và truy vấn dữ liệu Chuỗi khối. Và bạn có thể đã đoán ra, nó đang sử dụng GraphQL làm ngôn ngữ truy vấn.

![The Graph](./thegraph.png)

Các ví dụ luôn là cách tốt nhất để hiểu một điều gì đó, vì vậy hãy sử dụng The Graph cho ví dụ GameContract của chúng ta.

## Cách tạo một đồ thị con {#how-to-create-a-subgraph}

Định nghĩa về cách lập chỉ mục dữ liệu được gọi là đồ thị con. Nó yêu cầu ba thành phần:

1. Manifest (`subgraph.yaml`)
2. Schema (`schema.graphql`)
3. Mapping (`mapping.ts`)

### Manifest (`subgraph.yaml`) {#manifest}

Manifest là tệp cấu hình của chúng ta và xác định:

- các hợp đồng thông minh nào cần lập chỉ mục (Địa chỉ, mạng lưới, ABI...)
- các sự kiện nào cần lắng nghe
- những thứ khác cần lắng nghe như các lệnh gọi hàm hoặc các khối
- các hàm mapping được gọi (xem `mapping.ts` bên dưới)

Bạn có thể xác định nhiều hợp đồng và trình xử lý ở đây. Một thiết lập điển hình sẽ có một thư mục đồ thị con bên trong dự án Hardhat với kho lưu trữ riêng của nó. Sau đó, bạn có thể dễ dàng tham chiếu ABI.

Vì lý do thuận tiện, bạn cũng có thể muốn sử dụng một công cụ mẫu như mustache. Sau đó, bạn tạo một `subgraph.template.yaml` và chèn các Địa chỉ dựa trên các lần triển khai mới nhất. Để có một ví dụ thiết lập nâng cao hơn, hãy xem ví dụ [kho lưu trữ đồ thị con Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

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

### Schema (`schema.graphql`) {#schema}

Schema là định nghĩa dữ liệu GraphQL. Nó sẽ cho phép bạn xác định các thực thể nào tồn tại và các kiểu của chúng. Các kiểu được hỗ trợ từ The Graph là

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Bạn cũng có thể sử dụng các thực thể làm kiểu để xác định các mối quan hệ. Trong ví dụ của chúng ta, chúng ta xác định mối quan hệ 1-nhiều từ người chơi đến các cược. Dấu ! có nghĩa là giá trị không thể trống. Tài liệu đầy đủ có thể được xem [tại đây](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Mapping (`mapping.ts`) {#mapping}

Tệp mapping trong The Graph xác định các hàm của chúng ta để chuyển đổi các sự kiện đến thành các thực thể. Nó được viết bằng AssemblyScript, một tập hợp con của TypeScript. Điều này có nghĩa là nó có thể được biên dịch thành WASM (WebAssembly) để thực thi mapping hiệu quả và linh hoạt hơn.

Bạn sẽ cần xác định từng hàm được đặt tên trong tệp `subgraph.yaml`, vì vậy trong trường hợp của chúng ta, chúng ta chỉ cần một: `handleNewBet`. Đầu tiên, chúng ta cố gắng tải thực thể Player từ Địa chỉ người gửi dưới dạng id. Nếu nó không tồn tại, chúng ta tạo một thực thể mới và điền vào đó các giá trị ban đầu.

Sau đó, chúng ta tạo một thực thể Bet mới. Id cho thực thể này sẽ là `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` đảm bảo luôn là một giá trị duy nhất. Chỉ sử dụng Mã băm là không đủ vì ai đó có thể gọi hàm placeBet nhiều lần trong một giao dịch thông qua một hợp đồng thông minh.

Cuối cùng, chúng ta có thể cập nhật thực thể Player với tất cả dữ liệu. Các mảng không thể được đẩy trực tiếp vào mà cần được cập nhật như hiển thị ở đây. Chúng ta sử dụng id để tham chiếu đến cược. Và `.save()` được yêu cầu ở cuối để lưu trữ một thực thể.

Tài liệu đầy đủ có thể được xem tại đây: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Bạn cũng có thể thêm đầu ra ghi nhật ký vào tệp mapping, xem [tại đây](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

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

## Sử dụng nó trong Frontend {#using-it-in-the-frontend}

Sử dụng một công cụ như Apollo Boost, bạn có thể dễ dàng tích hợp The Graph vào dapp React của mình (hoặc Apollo-Vue). Đặc biệt khi sử dụng React hooks và Apollo, việc tìm nạp dữ liệu đơn giản như viết một truy vấn GraphQL duy nhất trong thành phần của bạn. Một thiết lập điển hình có thể trông như thế này:

```javascript
// Xem tất cả các đồ thị con: https://thegraph.com/explorer/
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

Và bây giờ chúng ta có thể viết ví dụ một truy vấn như thế này. Điều này sẽ tìm nạp cho chúng ta

- số lần người dùng hiện tại đã thắng
- số lần người dùng hiện tại đã thua
- một danh sách các dấu thời gian với tất cả các cược trước đó của họ

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

![Magic](./magic.jpg)

Nhưng chúng ta đang thiếu một mảnh ghép cuối cùng và đó là máy chủ. Bạn có thể tự chạy nó hoặc sử dụng dịch vụ được lưu trữ.

## Máy chủ The Graph {#the-graph-server}

### Graph Explorer: Dịch vụ được lưu trữ {#graph-explorer-the-hosted-service}

Cách dễ nhất là sử dụng dịch vụ được lưu trữ. Làm theo các hướng dẫn [tại đây](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/) để triển khai một đồ thị con. Đối với nhiều dự án, bạn thực sự có thể tìm thấy các đồ thị con hiện có trong [trình khám phá](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Chạy nút của riêng bạn {#running-your-own-node}

Ngoài ra, bạn có thể chạy nút của riêng mình. Tài liệu [tại đây](https://github.com/graphprotocol/graph-node#quick-start). Một lý do để làm điều này có thể là sử dụng một mạng lưới không được hỗ trợ bởi dịch vụ được lưu trữ. Các mạng lưới hiện được hỗ trợ [có thể được tìm thấy tại đây](https://thegraph.com/docs/en/developing/supported-networks/).

## Tương lai phi tập trung {#the-decentralized-future}

GraphQL cũng hỗ trợ các luồng cho các sự kiện mới đến. Chúng được hỗ trợ trên the graph thông qua [Substreams](https://thegraph.com/docs/en/substreams/) hiện đang trong giai đoạn thử nghiệm mở (open beta).

Vào năm [2021](https://thegraph.com/blog/mainnet-migration/), The Graph đã bắt đầu quá trình chuyển đổi sang một mạng lưới lập chỉ mục phi tập trung. Bạn có thể đọc thêm về kiến trúc của mạng lưới lập chỉ mục phi tập trung này [tại đây](https://thegraph.com/docs/en/network/explorer/).

Hai khía cạnh chính là:

1. Người dùng trả tiền cho các trình lập chỉ mục (indexer) cho các truy vấn.
2. Các trình lập chỉ mục đặt cọc Graph Tokens (GRT).