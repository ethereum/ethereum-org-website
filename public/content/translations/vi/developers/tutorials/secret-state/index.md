---
title: "Sử dụng không kiến thức cho một trạng thái bí mật"
description: "các trò chơi trên chuỗi bị giới hạn vì chúng không thể giữ bất kỳ thông tin ẩn nào. Sau khi đọc hướng dẫn này, người đọc sẽ có thể kết hợp các bằng chứng không kiến thức và các thành phần máy chủ để tạo ra các trò chơi có thể xác minh với một trạng thái bí mật, thành phần ngoài chuỗi. Kỹ thuật để làm điều này sẽ được minh họa bằng cách tạo ra một trò chơi dò mìn."
author: Ori Pomerantz
tags:
  [
    "máy chủ",
    "ngoài chuỗi",
    "tập trung",
    "không tiết lộ thông tin",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: vi
published: 2025-03-15
---

_Không có bí mật nào trên chuỗi khối_. Mọi thứ được đăng trên chuỗi khối đều công khai cho mọi người đọc. Điều này là cần thiết, bởi vì chuỗi khối dựa trên việc bất kỳ ai cũng có thể xác minh nó. Tuy nhiên, các trò chơi thường dựa vào trạng thái bí mật. Ví dụ, trò chơi [dò mìn](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) hoàn toàn vô nghĩa nếu bạn chỉ có thể vào một trình duyệt khối và xem bản đồ.

Giải pháp đơn giản nhất là sử dụng một [thành phần máy chủ](/developers/tutorials/server-components/) để giữ trạng thái bí mật. Tuy nhiên, lý do chúng ta sử dụng chuỗi khối là để ngăn chặn việc gian lận bởi nhà phát triển trò chơi. Chúng ta cần đảm bảo tính trung thực của thành phần máy chủ. Máy chủ có thể cung cấp một hàm băm của trạng thái, và sử dụng [bằng chứng không kiến thức](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) để chứng minh rằng trạng thái được sử dụng để tính toán kết quả của một nước đi là đúng.

Sau khi đọc bài viết này, bạn sẽ biết cách tạo ra loại máy chủ giữ trạng thái bí mật này, một ứng dụng để hiển thị trạng thái và một thành phần trên chuỗi để giao tiếp giữa hai bên. Các công cụ chính chúng tôi sẽ sử dụng là:

| Công cụ                                       | Mục đích                                          |              Đã xác minh trên phiên bản |
| --------------------------------------------- | ------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Bằng chứng không kiến thức và việc xác minh chúng |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Ngôn ngữ lập trình cho cả máy chủ và ứng dụng     |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Chạy máy chủ                                      | 20.18.2 |
| [Viem](https://viem.sh/)                      | Giao tiếp với Chuỗi khối                          |  2.9.20 |
| [MUD](https://mud.dev/)                       | Quản lý dữ liệu trên chuỗi                        |  2.0.12 |
| [React](https://react.dev/)                   | Giao diện người dùng ứng dụng                     |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Phục vụ mã ứng dụng                               |   4.2.1 |

## Ví dụ về Dò mìn {#minesweeper}

[Dò mìn](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) là một trò chơi có bản đồ bí mật với một bãi mìn. Người chơi chọn đào ở một vị trí cụ thể. Nếu vị trí đó có mìn, trò chơi kết thúc. Nếu không, người chơi sẽ nhận được số lượng mìn trong tám ô xung quanh vị trí đó.

Ứng dụng này được viết bằng [MUD](https://mud.dev/), một framework cho phép chúng ta lưu trữ dữ liệu trên chuỗi bằng cách sử dụng [cơ sở dữ liệu khóa-giá trị](https://aws.amazon.com/nosql/key-value/) và tự động đồng bộ hóa dữ liệu đó với các thành phần ngoài chuỗi. Ngoài việc đồng bộ hóa, MUD giúp dễ dàng cung cấp kiểm soát truy cập và cho phép những người dùng khác [mở rộng](https://mud.dev/guides/extending-a-world) ứng dụng của chúng tôi một cách không cần cấp phép.

### Chạy ví dụ dò mìn {#running-minesweeper-example}

Để chạy ví dụ dò mìn:

1. Hãy chắc chắn rằng bạn đã [cài đặt các điều kiện tiên quyết](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), và [`mprocs`](https://github.com/pvolok/mprocs).

2. Sao chép kho lưu trữ.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Cài đặt các gói.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Nếu Foundry được cài đặt như một phần của `pnpm install`, bạn cần khởi động lại shell dòng lệnh.

4. Biên dịch các hợp đồng

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Khởi động chương trình (bao gồm một chuỗi khối [anvil](https://book.getfoundry.sh/anvil/)) và chờ đợi.

   ```sh copy
   mprocs
   ```

   Lưu ý rằng quá trình khởi động mất nhiều thời gian. Để xem tiến trình, trước tiên hãy sử dụng phím mũi tên xuống để cuộn đến tab _contracts_ để xem các hợp đồng MUD đang được triển khai. Khi bạn nhận được thông báo _Waiting for file changes…_, các hợp đồng đã được triển khai và tiến trình tiếp theo sẽ diễn ra trong tab _server_. Ở đó, bạn đợi cho đến khi nhận được thông báo _Verifier address: 0x...._.

   Nếu bước này thành công, bạn sẽ thấy màn hình `mprocs`, với các quy trình khác nhau ở bên trái và đầu ra của bảng điều khiển cho quy trình hiện được chọn ở bên phải.

   ![Màn hình mprocs](./mprocs.png)

   Nếu có vấn đề với `mprocs`, bạn có thể chạy bốn quy trình theo cách thủ công, mỗi quy trình trong cửa sổ dòng lệnh riêng của nó:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Các hợp đồng**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Máy chủ**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Ứng dụng**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Bây giờ bạn có thể duyệt đến [ứng dụng](http://localhost:3000), nhấp vào **New Game**, và bắt đầu chơi.

### Bảng {#tables}

Chúng ta cần [một vài bảng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) trên chuỗi.

- `Configuration`: Bảng này là một singleton, nó không có khóa và chỉ có một bản ghi duy nhất. Nó được dùng để chứa thông tin cấu hình trò chơi:
  - `height`: Chiều cao của một bãi mìn
  - `width`: Chiều rộng của một bãi mìn
  - `numberOfBombs`: Số lượng bom trong mỗi bãi mìn

- `VerifierAddress`: Bảng này cũng là một singleton. Nó được sử dụng để giữ một phần của cấu hình, địa chỉ của hợp đồng xác minh (`verifier`). Chúng ta có thể đã đặt thông tin này trong bảng `Configuration`, nhưng nó được thiết lập bởi một thành phần khác, máy chủ, vì vậy việc đặt nó trong một bảng riêng sẽ dễ dàng hơn.

- `PlayerGame`: Khóa là địa chỉ của người chơi. Dữ liệu là:

  - `gameId`: giá trị 32 byte là hàm băm của bản đồ mà người chơi đang chơi (định danh trò chơi).
  - `win`: một giá trị boolean cho biết liệu người chơi đã thắng trò chơi hay chưa.
  - `lose`: một giá trị boolean cho biết liệu người chơi đã thua trò chơi hay chưa.
  - `digNumber`: số lần đào thành công trong trò chơi.

- `GamePlayer`: Bảng này giữ ánh xạ ngược, từ `gameId` đến địa chỉ người chơi.

- `Map`: Khóa là một bộ ba giá trị:

  - `gameId`: giá trị 32 byte là hàm băm của bản đồ mà người chơi đang chơi (định danh trò chơi).
  - tọa độ `x`
  - tọa độ `y`

  Giá trị là một số duy nhất. Nó là 255 nếu một quả bom được phát hiện. Nếu không, nó là số lượng bom xung quanh vị trí đó cộng một. Chúng tôi không thể chỉ sử dụng số lượng bom, bởi vì theo mặc định, tất cả bộ nhớ trong máy ảo Ethereum và tất cả các giá trị hàng trong MUD đều bằng không. Chúng ta cần phân biệt giữa "người chơi chưa đào ở đây" và "người chơi đã đào ở đây, và thấy có không có quả bom nào xung quanh".

Ngoài ra, việc giao tiếp giữa ứng dụng và máy chủ diễn ra thông qua thành phần trên chuỗi. Điều này cũng được thực hiện bằng cách sử dụng các bảng.

- `PendingGame`: Các yêu cầu chưa được phục vụ để bắt đầu một trò chơi mới.
- `PendingDig`: Các yêu cầu chưa được phục vụ để đào tại một vị trí cụ thể trong một trò chơi cụ thể. Đây là một [bảng ngoài chuỗi](https://mud.dev/store/tables#types-of-tables), có nghĩa là nó không được ghi vào bộ nhớ máy ảo Ethereum, nó chỉ có thể được đọc ngoài chuỗi bằng các sự kiện.

### Luồng thực thi và dữ liệu {#execution-data-flows}

Các luồng này điều phối việc thực thi giữa ứng dụng, thành phần trên chuỗi và máy chủ.

#### Khởi tạo {#initialization-flow}

Khi bạn chạy `mprocs`, các bước sau sẽ xảy ra:

1. [`mprocs`](https://github.com/pvolok/mprocs) chạy bốn thành phần:

   - [Anvil](https://book.getfoundry.sh/anvil/), chạy một chuỗi khối cục bộ
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), biên dịch (nếu cần) và triển khai các hợp đồng cho MUD
   - [Ứng dụng](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), chạy [Vite](https://vitejs.dev/) để phục vụ giao diện người dùng và mã ứng dụng cho các trình duyệt web.
   - [Máy chủ](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), thực hiện các hành động của máy chủ

2. Gói `contracts` triển khai các hợp đồng MUD và sau đó chạy [tập lệnh `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Tập lệnh này thiết lập cấu hình. Mã từ github chỉ định [một bãi mìn 10x5 với tám quả mìn trong đó](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Máy chủ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) bắt đầu bằng cách [thiết lập MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Trong số những thứ khác, điều này kích hoạt đồng bộ hóa dữ liệu, để một bản sao của các bảng liên quan tồn tại trong bộ nhớ của máy chủ.

4. Máy chủ đăng ký một hàm để được thực thi [khi bảng `Configuration` thay đổi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Hàm này](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) được gọi sau khi `PostDeploy.s.sol` thực thi và sửa đổi bảng.

5. Khi hàm khởi tạo máy chủ có cấu hình, [nó gọi `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) để khởi tạo [phần không kiến thức của máy chủ](#using-zokrates-from-typescript). Điều này không thể xảy ra cho đến khi chúng ta nhận được cấu hình vì các hàm không kiến thức phải có chiều rộng và chiều cao của bãi mìn làm hằng số.

6. Sau khi phần không kiến thức của máy chủ được khởi tạo, bước tiếp theo là [triển khai hợp đồng xác minh không kiến thức lên chuỗi khối](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) và đặt địa chỉ của người được xác minh trong MUD.

7. Cuối cùng, chúng tôi đăng ký các bản cập nhật để chúng tôi sẽ thấy khi người chơi yêu cầu [bắt đầu một trò chơi mới](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) hoặc [đào trong một trò chơi hiện có](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Trò chơi mới {#new-game-flow}

Đây là những gì xảy ra khi người chơi yêu cầu một trò chơi mới.

1. Nếu không có trò chơi nào đang diễn ra cho người chơi này, hoặc có một trò chơi nhưng với gameId bằng không, ứng dụng sẽ hiển thị một [nút trò chơi mới](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Khi người dùng nhấn nút này, [React sẽ chạy hàm `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) là một lệnh gọi `System`. Trong MUD, tất cả các lệnh gọi đều được định tuyến thông qua hợp đồng `World`, và trong hầu hết các trường hợp, bạn gọi `<namespace>__<tên hàm>`. Trong trường hợp này, lệnh gọi là `app__newGame`, mà MUD sau đó sẽ định tuyến đến [`newGame` trong `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Hàm trên chuỗi kiểm tra xem người chơi có đang trong một trò chơi hay không, và nếu không có, nó sẽ [thêm yêu cầu vào bảng `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Máy chủ phát hiện thay đổi trong `PendingGame` và [chạy hàm đã đăng ký](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Hàm này gọi [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), và hàm này lại gọi [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Điều đầu tiên `createGame` làm là [tạo một bản đồ ngẫu nhiên với số lượng mìn phù hợp](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Sau đó, nó gọi [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) để tạo một bản đồ với các đường viền trống, điều này là cần thiết cho Zokrates. Cuối cùng, `createGame` gọi [`calculateMapHash`](#calculateMapHash), để lấy hàm băm của bản đồ, được sử dụng làm ID trò chơi.

6. Hàm `newGame` thêm trò chơi mới vào `gamesInProgress`.

7. Điều cuối cùng máy chủ làm là gọi [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), một hàm trên chuỗi. Hàm này nằm trong một `System` khác, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), để cho phép kiểm soát truy cập. Kiểm soát truy cập được định nghĩa trong [tệp cấu hình MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Danh sách truy cập chỉ cho phép một địa chỉ duy nhất gọi `System`. Điều này hạn chế quyền truy cập vào các chức năng của máy chủ cho một địa chỉ duy nhất, vì vậy không ai có thể mạo danh máy chủ.

8. Thành phần trên chuỗi cập nhật các bảng liên quan:

   - Tạo trò chơi trong `PlayerGame`.
   - Thiết lập ánh xạ ngược trong `GamePlayer`.
   - Xóa yêu cầu khỏi `PendingGame`.

9. Máy chủ xác định sự thay đổi trong `PendingGame`, nhưng không làm gì vì [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) là false.

10. Trên ứng dụng [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) được đặt thành mục `PlayerGame` cho địa chỉ của người chơi. Khi `PlayerGame` thay đổi, `gameRecord` cũng thay đổi.

11. Nếu có giá trị trong `gameRecord`, và trò chơi chưa thắng hay thua, ứng dụng sẽ [hiển thị bản đồ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Đào {#dig-flow}

1. Người chơi [nhấp vào nút của ô trên bản đồ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), hành động này sẽ gọi [hàm `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Hàm này gọi [`dig` trên chuỗi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Thành phần trên chuỗi [thực hiện một số kiểm tra tính hợp lệ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), và nếu thành công, nó sẽ thêm yêu cầu đào vào [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Máy chủ [phát hiện sự thay đổi trong `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Nếu nó hợp lệ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), nó sẽ [gọi mã không kiến thức](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (được giải thích bên dưới) để tạo ra cả kết quả và một bằng chứng rằng nó hợp lệ.

4. [Máy chủ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) gọi [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) trên chuỗi.

5. `digResponse` thực hiện hai việc. Đầu tiên, nó kiểm tra [bằng chứng không kiến thức](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Sau đó, nếu bằng chứng được xác minh, nó sẽ gọi [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) để thực sự xử lý kết quả.

6. `processDigResult` kiểm tra xem trò chơi đã [thua](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) hay [thắng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), và [cập nhật `Map`, bản đồ trên chuỗi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Ứng dụng tự động nhận các bản cập nhật và [cập nhật bản đồ hiển thị cho người chơi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), và nếu có thể, thông báo cho người chơi biết họ thắng hay thua.

## Sử dụng Zokrates {#using-zokrates}

Trong các luồng đã giải thích ở trên, chúng ta đã bỏ qua các phần không kiến thức, coi chúng như một hộp đen. Bây giờ hãy mở nó ra và xem mã đó được viết như thế nào.

### Băm bản đồ {#hashing-map}

Chúng ta có thể sử dụng [mã JavaScript này](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) để triển khai [Poseidon](https://www.poseidon-hash.info), hàm băm Zokrates mà chúng ta sử dụng. Tuy nhiên, mặc dù cách này sẽ nhanh hơn, nhưng nó cũng sẽ phức tạp hơn so với việc chỉ sử dụng hàm băm Zokrates để thực hiện. Đây là một hướng dẫn, vì vậy mã được tối ưu hóa cho sự đơn giản, không phải cho hiệu suất. Do đó, chúng ta cần hai chương trình Zokrates khác nhau, một chương trình chỉ để tính toán hàm băm của một bản đồ (`hash`) và một chương trình khác để thực sự tạo ra một bằng chứng không kiến thức về kết quả của việc đào tại một vị trí trên bản đồ (`dig`).

### Hàm băm {#hash-function}

Đây là hàm tính toán hàm băm của một bản đồ. Chúng ta sẽ xem qua từng dòng mã này.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Hai dòng này nhập hai hàm từ [thư viện chuẩn Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Hàm đầu tiên](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) là một [hàm băm Poseidon](https://www.poseidon-hash.info/). Nó nhận một mảng các phần tử [`field`](https://zokrates.github.io/language/types.html#field) và trả về một `field`.

Phần tử trường trong Zokrates thường nhỏ hơn 256 bit, nhưng không nhiều. Để đơn giản hóa mã, chúng tôi giới hạn bản đồ ở mức tối đa 512 bit và băm một mảng gồm bốn trường, và trong mỗi trường, chúng tôi chỉ sử dụng 128 bit. [Hàm `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) thay đổi một mảng 128 bit thành một `field` cho mục đích này.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Dòng này bắt đầu định nghĩa một hàm. `hashMap` nhận một tham số duy nhất có tên là `map`, một mảng `bool`(ean) hai chiều. Kích thước của bản đồ là `width+2` nhân `height+2` vì những lý do được [giải thích bên dưới](#why-map-border).

Chúng ta có thể sử dụng `${width+2}` và `${height+2}` vì các chương trình Zokrates được lưu trữ trong ứng dụng này dưới dạng [chuỗi mẫu](https://www.w3schools.com/js/js_string_templates.asp). Mã giữa `${` và `}` được đánh giá bởi JavaScript, và bằng cách này, chương trình có thể được sử dụng cho các kích thước bản đồ khác nhau. Tham số bản đồ có một đường viền rộng một vị trí bao quanh nó mà không có quả bom nào, đó là lý do chúng ta cần thêm hai vào chiều rộng và chiều cao.

Giá trị trả về là một `field` chứa hàm băm.

```
   bool[512] mut map1d = [false; 512];
```

Bản đồ là hai chiều. Tuy nhiên, hàm `pack128` không hoạt động với mảng hai chiều. Vì vậy, trước tiên chúng ta làm phẳng bản đồ thành một mảng 512 byte, sử dụng `map1d`. Theo mặc định, các biến Zokrates là hằng số, nhưng chúng ta cần gán giá trị cho mảng này trong một vòng lặp, vì vậy chúng ta định nghĩa nó là [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Chúng ta cần khởi tạo mảng vì Zokrates không có `undefined`. Biểu thức `[false; 512]` có nghĩa là [một mảng gồm 512 giá trị `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Chúng ta cũng cần một bộ đếm để phân biệt giữa các bit chúng ta đã điền vào `map1d` và những bit chưa điền.

```
   for u32 x in 0..${width+2} {
```

Đây là cách bạn khai báo một [vòng lặp `for`](https://zokrates.github.io/language/control_flow.html#for-loops) trong Zokrates. Một vòng lặp `for` của Zokrates phải có giới hạn cố định, bởi vì mặc dù nó có vẻ là một vòng lặp, trình biên dịch thực sự "mở rộng" nó. Biểu thức `${width+2}` là một hằng số tại thời điểm biên dịch vì `width` được thiết lập bởi mã TypeScript trước khi nó gọi trình biên dịch.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Đối với mỗi vị trí trong bản đồ, đặt giá trị đó vào mảng `map1d` và tăng bộ đếm.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` để tạo một mảng gồm bốn giá trị `field` từ `map1d`. Trong Zokrates, `array[a..b]` có nghĩa là lát cắt của mảng bắt đầu tại `a` và kết thúc tại `b-1`.

```
    return poseidon(hashMe);
}
```

Sử dụng `poseidon` để chuyển đổi mảng này thành một hàm băm.

### Chương trình băm {#hash-program}

Máy chủ cần gọi `hashMap` trực tiếp để tạo định danh trò chơi. Tuy nhiên, Zokrates chỉ có thể gọi hàm `main` trên một chương trình để bắt đầu, vì vậy chúng tôi tạo một chương trình với một `main` gọi hàm băm.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Chương trình đào {#dig-program}

Đây là trung tâm của phần không kiến thức của ứng dụng, nơi chúng tôi tạo ra các bằng chứng được sử dụng để xác minh kết quả đào.

```
${hashFragment}

// Số lượng mìn tại vị trí (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Tại sao lại có đường viền bản đồ {#why-map-border}

Bằng chứng không kiến thức sử dụng [mạch số học](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), không có cách tương đương dễ dàng với một câu lệnh `if`. Thay vào đó, chúng sử dụng tương đương của [toán tử điều kiện](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Nếu `a` có thể là không hoặc một, bạn có thể tính `if a { b } else { c }` là `ab+(1-a)c`.

Vì điều này, một câu lệnh `if` của Zokrates luôn đánh giá cả hai nhánh. Ví dụ, nếu bạn có mã này:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Nó sẽ báo lỗi, bởi vì nó cần tính toán `arr[10]`, mặc dù giá trị đó sau đó sẽ được nhân với không.

Đây là lý do chúng ta cần một đường viền rộng một vị trí bao quanh bản đồ. Chúng ta cần tính tổng số mìn xung quanh một vị trí, và điều đó có nghĩa là chúng ta cần xem vị trí ở hàng trên và dưới, bên trái và bên phải của vị trí chúng ta đang đào. Điều đó có nghĩa là những vị trí đó phải tồn tại trong mảng bản đồ mà Zokrates được cung cấp.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Theo mặc định, các bằng chứng Zokrates bao gồm các đầu vào của chúng. Sẽ không có ích gì khi biết có năm quả mìn xung quanh một điểm trừ khi bạn thực sự biết đó là điểm nào (và bạn không thể chỉ khớp nó với yêu cầu của mình, bởi vì khi đó người chứng minh có thể sử dụng các giá trị khác nhau và không cho bạn biết về điều đó). Tuy nhiên, chúng ta cần giữ bí mật bản đồ, trong khi cung cấp nó cho Zokrates. Giải pháp là sử dụng một tham số `private`, một tham số _không_ được tiết lộ bởi bằng chứng.

Điều này mở ra một con đường khác để lạm dụng. Người chứng minh có thể sử dụng các tọa độ chính xác, nhưng tạo ra một bản đồ với bất kỳ số lượng mìn nào xung quanh vị trí đó, và có thể cả tại chính vị trí đó. Để ngăn chặn sự lạm dụng này, chúng tôi làm cho bằng chứng không kiến thức bao gồm cả hàm băm của bản đồ, đó là định danh trò chơi.

```
   return (hashMap(map),
```

Giá trị trả về ở đây là một tuple bao gồm mảng băm bản đồ cũng như kết quả đào.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Chúng tôi sử dụng 255 làm giá trị đặc biệt trong trường hợp chính vị trí đó có bom.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Nếu người chơi không trúng mìn, hãy cộng số lượng mìn cho khu vực xung quanh vị trí đó và trả về kết quả đó.

### Sử dụng Zokrates từ TypeScript {#using-zokrates-from-typescript}

Zokrates có một giao diện dòng lệnh, nhưng trong chương trình này chúng ta sử dụng nó trong [mã TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Thư viện chứa các định nghĩa Zokrates được gọi là [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Nhập [các ràng buộc JavaScript của Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Chúng ta chỉ cần hàm [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) vì nó trả về một promise giải quyết thành tất cả các định nghĩa của Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Tương tự như chính Zokrates, chúng tôi cũng chỉ xuất một hàm, cũng là [bất đồng bộ](https://www.w3schools.com/js/js_async.asp). Khi cuối cùng nó trả về, nó cung cấp một số hàm như chúng ta sẽ thấy bên dưới.

```typescript
const zokrates = await zokratesInitialize()
```

Khởi tạo Zokrates, nhận mọi thứ chúng ta cần từ thư viện.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Tiếp theo, chúng ta có hàm băm và hai chương trình Zokrates mà chúng ta đã thấy ở trên.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Ở đây chúng ta biên dịch các chương trình đó.

```typescript
// Tạo các khóa để xác minh không kiến thức.
// Trên một hệ thống sản xuất, bạn sẽ muốn sử dụng một nghi lễ thiết lập.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Trên một hệ thống sản xuất, chúng ta có thể sử dụng một [nghi lễ thiết lập](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) phức tạp hơn, nhưng điều này đủ tốt cho một bản demo. Không thành vấn đề khi người dùng có thể biết khóa của người chứng minh - họ vẫn không thể sử dụng nó để chứng minh những điều không đúng sự thật. Bởi vì chúng ta chỉ định entropy (tham số thứ hai, `""`), kết quả sẽ luôn giống nhau.

**Lưu ý:** Việc biên dịch các chương trình Zokrates và tạo khóa là những quá trình chậm. Không cần phải lặp lại chúng mỗi lần, chỉ khi kích thước bản đồ thay đổi. Trên một hệ thống sản xuất, bạn sẽ thực hiện chúng một lần, và sau đó lưu trữ đầu ra. Lý do duy nhất tôi không làm điều đó ở đây là vì sự đơn giản.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Hàm [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) thực sự chạy chương trình Zokrates. Nó trả về một cấu trúc với hai trường: `output`, là đầu ra của chương trình dưới dạng chuỗi JSON, và `witness`, là thông tin cần thiết để tạo ra một bằng chứng không kiến thức của kết quả. Ở đây chúng ta chỉ cần đầu ra.

Đầu ra là một chuỗi có dạng `"31337"`, một số thập phân được đặt trong dấu ngoặc kép. Nhưng đầu ra chúng ta cần cho `viem` là một số thập lục phân có dạng `0x60A7`. Vì vậy, chúng ta sử dụng `.slice(1,-1)` để loại bỏ dấu ngoặc kép và sau đó `BigInt` để chạy chuỗi còn lại, là một số thập phân, thành một [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` chuyển đổi `BigInt` này thành một chuỗi thập lục phân, và `"0x"+` thêm dấu hiệu cho các số thập lục phân.

```typescript
// Đào và trả về một bằng chứng không kiến thức của kết quả
// (mã phía máy chủ)
```

Bằng chứng không kiến thức bao gồm các đầu vào công khai (`x` và `y`) và kết quả (hàm băm của bản đồ và số lượng bom).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Kiểm tra xem một chỉ số có nằm ngoài giới hạn trong Zokrates hay không là một vấn đề, vì vậy chúng ta thực hiện nó ở đây.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Thực thi chương trình đào.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Sử dụng [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) và trả về bằng chứng.

```typescript
const solidityVerifier = `
        // Kích thước bản đồ: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Một trình xác minh Solidity, một hợp đồng thông minh mà chúng ta có thể triển khai lên chuỗi khối và sử dụng để xác minh các bằng chứng được tạo ra bởi `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Cuối cùng, trả về mọi thứ mà mã khác có thể cần.

## Kiểm tra bảo mật {#security-tests}

Kiểm tra bảo mật là quan trọng vì một lỗi chức năng cuối cùng sẽ tự lộ ra. Nhưng nếu ứng dụng không an toàn, điều đó có khả năng sẽ bị che giấu trong một thời gian dài trước khi nó bị tiết lộ bởi một người gian lận và lấy đi các tài nguyên thuộc về người khác.

### Quyền {#permissions}

Có một thực thể có đặc quyền trong trò chơi này, đó là máy chủ. Đó là người dùng duy nhất được phép gọi các hàm trong [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Chúng ta có thể sử dụng [`cast`](https://book.getfoundry.sh/cast/) để xác minh rằng các lệnh gọi đến các hàm có quyền chỉ được phép khi là tài khoản máy chủ.

[Khóa riêng tư của máy chủ nằm trong `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Trên máy tính chạy `anvil` (chuỗi khối), hãy đặt các biến môi trường này.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Sử dụng `cast` để cố gắng đặt địa chỉ trình xác minh là một địa chỉ không được ủy quyền.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Không chỉ `cast` báo cáo lỗi, mà bạn có thể mở **MUD Dev Tools** trong trò chơi trên trình duyệt, nhấp vào **Tables**, và chọn **app\_\_VerifierAddress**. Xem rằng địa chỉ không phải là không.

3. Đặt địa chỉ trình xác minh là địa chỉ của máy chủ.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Địa chỉ trong **app\_\_VerifiedAddress** bây giờ phải là không.

Tất cả các hàm MUD trong cùng một `System` đều đi qua cùng một kiểm soát truy cập, vì vậy tôi cho rằng thử nghiệm này là đủ. Nếu bạn không nghĩ vậy, bạn có thể kiểm tra các hàm khác trong [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Các hành vi lạm dụng không kiến thức {#zero-knowledge-abuses}

Phần toán học để xác minh Zokrates nằm ngoài phạm vi của hướng dẫn này (và khả năng của tôi). Tuy nhiên, chúng ta có thể chạy các kiểm tra khác nhau trên mã không kiến thức để xác minh rằng nếu nó không được thực hiện đúng cách, nó sẽ thất bại. Tất cả các bài kiểm tra này sẽ yêu cầu chúng ta thay đổi [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) và khởi động lại toàn bộ ứng dụng. Việc khởi động lại quy trình máy chủ là không đủ, bởi vì nó đặt ứng dụng vào một trạng thái không thể thực hiện (người chơi có một trò chơi đang diễn ra, nhưng trò chơi đó không còn khả dụng cho máy chủ).

#### Câu trả lời sai {#wrong-answer}

Khả năng đơn giản nhất là cung cấp câu trả lời sai trong bằng chứng không kiến thức. Để làm điều đó, chúng ta vào bên trong `zkDig` và [sửa đổi dòng 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Điều này có nghĩa là chúng ta sẽ luôn tuyên bố có một quả bom, bất kể câu trả lời đúng là gì. Hãy thử chơi với phiên bản này, và bạn sẽ thấy trong tab **server** của màn hình `pnpm dev` có lỗi này:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Vì vậy, loại gian lận này thất bại.

#### Bằng chứng sai {#wrong-proof}

Điều gì sẽ xảy ra nếu chúng ta cung cấp thông tin chính xác, nhưng chỉ có dữ liệu bằng chứng sai? Bây giờ, hãy thay thế dòng 91 bằng:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Nó vẫn thất bại, nhưng bây giờ nó thất bại mà không có lý do vì nó xảy ra trong quá trình gọi trình xác minh.

### Làm thế nào một người dùng có thể xác minh mã tin cậy không kiến thức? {#user-verify-zero-trust}

Các hợp đồng thông minh tương đối dễ xác minh. Thông thường, nhà phát triển xuất bản mã nguồn lên một trình duyệt khối, và trình duyệt khối xác minh rằng mã nguồn đó thực sự biên dịch thành mã trong [giao dịch triển khai hợp đồng](/developers/docs/smart-contracts/deploying/). Trong trường hợp của các `System` MUD, điều này [phức tạp hơn một chút](https://mud.dev/cli/verify), nhưng không nhiều.

Điều này khó hơn với không kiến thức. Trình xác minh bao gồm một số hằng số và chạy một số tính toán trên chúng. Điều này không cho bạn biết điều gì đang được chứng minh.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Giải pháp, ít nhất cho đến khi các trình duyệt khối thêm xác minh Zokrates vào giao diện người dùng của họ, là các nhà phát triển ứng dụng cung cấp các chương trình Zokrates, và ít nhất một số người dùng tự biên dịch chúng với khóa xác minh thích hợp.

Để làm như vậy:

1. [Cài đặt Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Tạo một tệp, `dig.zok`, với chương trình Zokrates. Mã dưới đây giả định bạn giữ nguyên kích thước bản đồ ban đầu, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Số lượng mìn tại vị trí (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Biên dịch mã Zokrates và tạo khóa xác minh. Khóa xác minh phải được tạo với cùng một entropy được sử dụng trong máy chủ ban đầu, [trong trường hợp này là một chuỗi rỗng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Tự tạo trình xác minh Solidity và xác minh rằng nó giống hệt về mặt chức năng với trình xác minh trên chuỗi khối (máy chủ thêm một nhận xét, nhưng điều đó không quan trọng).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Các quyết định thiết kế {#design}

Trong bất kỳ ứng dụng đủ phức tạp nào, đều có những mục tiêu thiết kế cạnh tranh đòi hỏi sự đánh đổi. Hãy xem xét một số đánh đổi và tại sao giải pháp hiện tại lại được ưu tiên hơn các tùy chọn khác.

### Tại sao lại là không kiến thức {#why-zero-knowledge}

Đối với trò chơi dò mìn, bạn không thực sự cần không kiến thức. Máy chủ luôn có thể giữ bản đồ, và sau đó chỉ cần tiết lộ toàn bộ nó khi trò chơi kết thúc. Sau đó, vào cuối trò chơi, hợp đồng thông minh có thể tính toán hàm băm của bản đồ, xác minh rằng nó khớp, và nếu không khớp sẽ phạt máy chủ hoặc bỏ qua hoàn toàn trò chơi.

Tôi không sử dụng giải pháp đơn giản này vì nó chỉ hoạt động cho các trò chơi ngắn với trạng thái kết thúc được xác định rõ ràng. Khi một trò chơi có khả năng vô hạn (chẳng hạn như trường hợp của [các thế giới tự trị](https://0xparc.org/blog/autonomous-worlds)), bạn cần một giải pháp chứng minh trạng thái _mà không_ tiết lộ nó.

Là một hướng dẫn, bài viết này cần một trò chơi ngắn dễ hiểu, nhưng kỹ thuật này hữu ích nhất cho các trò chơi dài hơn.

### Tại sao lại là Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) không phải là thư viện không kiến thức duy nhất có sẵn, nhưng nó tương tự như một ngôn ngữ lập trình thông thường, [mệnh lệnh](https://en.wikipedia.org/wiki/Imperative_programming) và hỗ trợ các biến boolean.

Đối với ứng dụng của bạn, với các yêu cầu khác nhau, bạn có thể thích sử dụng [Circum](https://docs.circom.io/getting-started/installation/) hoặc [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Khi nào biên dịch Zokrates {#when-compile-zokrates}

Trong chương trình này, chúng tôi biên dịch các chương trình Zokrates [mỗi khi máy chủ khởi động](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Điều này rõ ràng là lãng phí tài nguyên, nhưng đây là một hướng dẫn, được tối ưu hóa cho sự đơn giản.

Nếu tôi đang viết một ứng dụng ở cấp độ sản xuất, tôi sẽ kiểm tra xem tôi có một tệp với các chương trình Zokrates đã biên dịch ở kích thước bãi mìn này không, và nếu có thì sử dụng nó. Điều tương tự cũng đúng đối với việc triển khai một hợp đồng xác minh trên chuỗi.

### Tạo khóa xác minh và khóa chứng minh {#key-creation}

[Tạo khóa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) là một tính toán thuần túy khác không cần phải thực hiện nhiều hơn một lần cho một kích thước bãi mìn nhất định. Một lần nữa, nó chỉ được thực hiện một lần vì mục đích đơn giản.

Ngoài ra, chúng ta có thể sử dụng [một nghi lễ thiết lập](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Ưu điểm của một nghi lễ thiết lập là bạn cần hoặc entropy hoặc một số kết quả trung gian từ mỗi người tham gia để gian lận trong bằng chứng không kiến thức. Nếu ít nhất một người tham gia nghi lễ trung thực và xóa thông tin đó, các bằng chứng không kiến thức sẽ an toàn trước một số cuộc tấn công nhất định. Tuy nhiên, _không có cơ chế_ nào để xác minh rằng thông tin đã được xóa khỏi mọi nơi. Nếu bằng chứng không kiến thức là cực kỳ quan trọng, bạn muốn tham gia vào nghi lễ thiết lập.

Ở đây chúng ta dựa vào [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), đã có hàng chục người tham gia. Nó có lẽ đủ an toàn, và đơn giản hơn nhiều. Chúng tôi cũng không thêm entropy trong quá trình tạo khóa, điều này giúp người dùng [xác minh cấu hình không kiến thức](#user-verify-zero-trust) dễ dàng hơn.

### Xác minh ở đâu {#where-verification}

Chúng ta có thể xác minh các bằng chứng không kiến thức trên chuỗi (tốn gas) hoặc trong ứng dụng (sử dụng [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Tôi đã chọn cách đầu tiên, vì điều này cho phép bạn [xác minh người xác minh](#user-verify-zero-trust) một lần và sau đó tin tưởng rằng nó không thay đổi miễn là địa chỉ hợp đồng của nó vẫn giữ nguyên. Nếu việc xác minh được thực hiện trên ứng dụng, bạn sẽ phải xác minh mã bạn nhận được mỗi khi tải xuống ứng dụng.

Ngoài ra, trong khi trò chơi này là một người chơi, rất nhiều trò chơi chuỗi khối là nhiều người chơi. xác minh trên chuỗi có nghĩa là bạn chỉ xác minh bằng chứng không kiến thức một lần. Thực hiện nó trong ứng dụng sẽ yêu cầu mỗi ứng dụng phải xác minh độc lập.

### Làm phẳng bản đồ trong TypeScript hay Zokrates? {#where-flatten}

Nói chung, khi quá trình xử lý có thể được thực hiện trong TypeScript hoặc Zokrates, tốt hơn là nên thực hiện trong TypeScript, nhanh hơn nhiều và không yêu cầu bằng chứng không kiến thức. Đây là lý do, ví dụ, chúng ta không cung cấp cho Zokrates hàm băm và yêu cầu nó xác minh rằng nó là chính xác. Việc băm phải được thực hiện bên trong Zokrates, nhưng sự khớp nối giữa hàm băm được trả về và hàm băm trên chuỗi có thể xảy ra bên ngoài nó.

Tuy nhiên, chúng ta vẫn [làm phẳng bản đồ trong Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), trong khi chúng ta có thể đã làm điều đó trong TypeScript. Lý do là các lựa chọn khác, theo tôi, tệ hơn.

- Cung cấp một mảng boolean một chiều cho mã Zokrates, và sử dụng một biểu thức như `x*(height+2)
  +y` để lấy bản đồ hai chiều. Điều này sẽ làm cho [mã](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) phức tạp hơn một chút, vì vậy tôi đã quyết định rằng việc tăng hiệu suất không đáng để làm trong một hướng dẫn.

- Gửi cho Zokrates cả mảng một chiều và mảng hai chiều. Tuy nhiên, giải pháp này không mang lại cho chúng ta bất cứ điều gì. Mã Zokrates sẽ phải xác minh rằng mảng một chiều mà nó được cung cấp thực sự là biểu diễn chính xác của mảng hai chiều. Vì vậy, sẽ không có bất kỳ sự tăng hiệu suất nào.

- Làm phẳng mảng hai chiều trong Zokrates. Đây là lựa chọn đơn giản nhất, vì vậy tôi đã chọn nó.

### Lưu trữ bản đồ ở đâu {#where-store-maps}

Trong ứng dụng này, [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) chỉ đơn giản là một biến trong bộ nhớ. Điều này có nghĩa là nếu máy chủ của bạn bị lỗi và cần phải khởi động lại, tất cả thông tin nó lưu trữ sẽ bị mất. Người chơi không chỉ không thể tiếp tục trò chơi của mình, họ thậm chí không thể bắt đầu một trò chơi mới vì thành phần trên chuỗi nghĩ rằng họ vẫn đang trong một trò chơi.

Đây rõ ràng là một thiết kế tồi cho một hệ thống sản xuất, trong đó bạn sẽ lưu trữ thông tin này trong một cơ sở dữ liệu. Lý do duy nhất tôi sử dụng một biến ở đây là vì đây là một hướng dẫn và sự đơn giản là yếu tố chính cần xem xét.

## Kết luận: Kỹ thuật này phù hợp trong những điều kiện nào? {#conclusion}

Vì vậy, bây giờ bạn đã biết cách viết một trò chơi với một máy chủ lưu trữ trạng thái bí mật không thuộc về trên chuỗi. Nhưng trong những trường hợp nào bạn nên làm điều đó? Có hai yếu tố chính cần xem xét.

- _Trò chơi kéo dài_: [Như đã đề cập ở trên](#why-zero-knowledge), trong một trò chơi ngắn, bạn có thể chỉ cần công bố trạng thái khi trò chơi kết thúc và có mọi thứ được xác minh sau đó. Nhưng đó không phải là một lựa chọn khi trò chơi kéo dài hoặc vô thời hạn, và trạng thái cần phải được giữ bí mật.

- _Một số sự tập trung có thể chấp nhận được_: Bằng chứng không kiến thức có thể xác minh tính toàn vẹn, rằng một thực thể không giả mạo kết quả. Điều mà chúng không thể làm là đảm bảo rằng thực thể đó sẽ vẫn có sẵn và trả lời các thông điệp. Trong các tình huống mà tính khả dụng cũng cần được phi tập trung, bằng chứng không kiến thức không phải là một giải pháp đủ, và bạn cần [tính toán đa bên](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).

### Ghi nhận {#acknowledgements}

- Alvaro Alonso đã đọc bản nháp của bài viết này và làm sáng tỏ một số hiểu lầm của tôi về Zokrates.

Bất kỳ lỗi còn lại nào đều là trách nhiệm của tôi.
