---
title: Sử dụng không tri thức cho một trạng thái bí mật
description: Các trò chơi trên chuỗi bị hạn chế vì chúng không thể giữ bất kỳ thông tin ẩn nào. Sau khi đọc hướng dẫn này, người đọc sẽ có thể kết hợp các bằng chứng không kiến thức và các thành phần máy chủ để tạo ra các trò chơi có thể xác minh với một thành phần trạng thái bí mật, ngoài chuỗi. Kỹ thuật để thực hiện điều này sẽ được chứng minh bằng cách tạo ra một trò chơi dò mìn.
author: Ori Pomerantz
tags:
  - máy chủ
  - ngoài chuỗi
  - tập trung
  - không tri thức
  - Zokrates
  - MUD
  - quyền riêng tư
skill: advanced
breadcrumb: Trạng thái bí mật ZK
lang: vi
published: 2025-03-15
---

_Không có bí mật nào trên chuỗi khối_. Mọi thứ được đăng trên chuỗi khối đều mở cho mọi người đọc. Điều này là cần thiết, bởi vì chuỗi khối dựa trên việc bất kỳ ai cũng có thể xác minh nó. Tuy nhiên, các trò chơi thường dựa vào trạng thái bí mật. Ví dụ, trò chơi [dò mìn](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) hoàn toàn vô nghĩa nếu bạn chỉ cần vào một trình khám phá khối và xem bản đồ.

Giải pháp đơn giản nhất là sử dụng một [thành phần máy chủ](/developers/tutorials/server-components/) để giữ trạng thái bí mật. Tuy nhiên, lý do chúng ta sử dụng chuỗi khối là để ngăn chặn việc gian lận từ nhà phát triển trò chơi. Chúng ta cần đảm bảo tính trung thực của thành phần máy chủ. Máy chủ có thể cung cấp một mã băm của trạng thái, và sử dụng [bằng chứng không kiến thức](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) để chứng minh rằng trạng thái được sử dụng để tính toán kết quả của một nước đi là chính xác.

Sau khi đọc bài viết này, bạn sẽ biết cách tạo ra loại máy chủ giữ trạng thái bí mật này, một máy khách để hiển thị trạng thái, và một thành phần trên chuỗi để giao tiếp giữa hai bên. Các công cụ chính mà chúng ta sử dụng sẽ là:

| Công cụ                                          | Mục đích                                                 | Đã xác minh trên phiên bản |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Bằng chứng không kiến thức và việc xác minh chúng            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Ngôn ngữ lập trình cho cả máy chủ và máy khách |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Chạy máy chủ                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | Giao tiếp với Chuỗi khối                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | Quản lý dữ liệu trên chuỗi                                 |              2.0.12 |
| [React](https://react.dev/)                   | Giao diện người dùng máy khách                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Phục vụ mã máy khách                                 |               4.2.1 |

## Ví dụ về Minesweeper {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) là một trò chơi bao gồm một bản đồ bí mật với một bãi mìn. Người chơi chọn đào ở một vị trí cụ thể. Nếu vị trí đó có mìn, trò chơi kết thúc. Nếu không, người chơi sẽ nhận được số lượng mìn trong tám ô vuông xung quanh vị trí đó.

Ứng dụng này được viết bằng [MUD](https://mud.dev/), một framework cho phép chúng ta lưu trữ dữ liệu trên chuỗi bằng cách sử dụng [cơ sở dữ liệu khóa-giá trị](https://aws.amazon.com/nosql/key-value/) và tự động đồng bộ hóa dữ liệu đó với các thành phần ngoài chuỗi. Ngoài việc đồng bộ hóa, MUD giúp dễ dàng cung cấp quyền kiểm soát truy cập và cho phép những người dùng khác [mở rộng](https://mud.dev/guides/extending-a-world) ứng dụng của chúng ta một cách không phép.

### Chạy ví dụ Minesweeper {#running-minesweeper-example}

Để chạy ví dụ Minesweeper:

1. Đảm bảo bạn [đã cài đặt các điều kiện tiên quyết](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), và [`mprocs`](https://github.com/pvolok/mprocs).

2. Sao chép (clone) kho lưu trữ.

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

   Lưu ý rằng quá trình khởi động mất nhiều thời gian. Để xem tiến trình, trước tiên hãy sử dụng mũi tên xuống để cuộn đến tab _contracts_ nhằm xem các hợp đồng MUD đang được triển khai. Khi bạn nhận được thông báo _Waiting for file changes…_, các hợp đồng đã được triển khai và tiến trình tiếp theo sẽ diễn ra trong tab _server_. Tại đó, bạn chờ cho đến khi nhận được thông báo _Verifier address: 0x...._.

   Nếu bước này thành công, bạn sẽ thấy màn hình `mprocs`, với các tiến trình khác nhau ở bên trái và đầu ra bảng điều khiển cho tiến trình hiện được chọn ở bên phải.

   ![The mprocs screen](./mprocs.png)

   Nếu có sự cố với `mprocs`, bạn có thể chạy thủ công bốn tiến trình, mỗi tiến trình trong cửa sổ dòng lệnh riêng của nó:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Hợp đồng** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Bây giờ bạn có thể duyệt đến [client](http://localhost:3000), nhấp vào **New Game** và bắt đầu chơi.

### Các bảng {#tables}

Chúng ta cần [một vài bảng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) trên chuỗi.

- `Configuration`: Bảng này là một đơn thể, nó không có khóa và chỉ có một bản ghi duy nhất. Nó được sử dụng để lưu giữ thông tin cấu hình trò chơi:
  - `height`: Chiều cao của bãi mìn
  - `width`: Chiều rộng của bãi mìn
  - `numberOfBombs`: Số lượng bom trong mỗi bãi mìn
- `VerifierAddress`: Bảng này cũng là một đơn thể. Nó được sử dụng để lưu giữ một phần của cấu hình, địa chỉ của hợp đồng trình xác minh (`verifier`). Chúng ta có thể đã đặt thông tin này vào bảng `Configuration`, nhưng nó được thiết lập bởi một thành phần khác là máy chủ, vì vậy sẽ dễ dàng hơn khi đặt nó vào một bảng riêng biệt.

- `PlayerGame`: Khóa là địa chỉ của người chơi. Dữ liệu là:

  - `gameId`: Giá trị 32-byte là mã băm của bản đồ mà người chơi đang chơi (định danh trò chơi).
  - `win`: một giá trị boolean cho biết người chơi đã thắng trò chơi hay chưa.
  - `lose`: một giá trị boolean cho biết người chơi đã thua trò chơi hay chưa.
  - `digNumber`: số lần đào thành công trong trò chơi.

- `GamePlayer`: Bảng này chứa ánh xạ ngược, từ `gameId` sang địa chỉ người chơi.

- `Map`: Khóa là một tuple gồm ba giá trị:

  - `gameId`: Giá trị 32-byte là mã băm của bản đồ mà người chơi đang chơi (định danh trò chơi).
  - Tọa độ `x`
  - Tọa độ `y`

  Giá trị là một số duy nhất. Nó là 255 nếu phát hiện có bom. Nếu không, nó là số lượng bom xung quanh vị trí đó cộng thêm một. Chúng ta không thể chỉ sử dụng số lượng bom, vì theo mặc định, tất cả bộ nhớ trong EVM và tất cả các giá trị hàng trong MUD đều là số không. Chúng ta cần phân biệt giữa "người chơi chưa đào ở đây" và "người chơi đã đào ở đây, và thấy không có quả bom nào xung quanh".

Ngoài ra, giao tiếp giữa client và máy chủ diễn ra thông qua thành phần trên chuỗi. Điều này cũng được triển khai bằng cách sử dụng các bảng.

- `PendingGame`: Các yêu cầu bắt đầu trò chơi mới chưa được phục vụ.
- `PendingDig`: Các yêu cầu đào ở một vị trí cụ thể trong một trò chơi cụ thể chưa được phục vụ. Đây là một [bảng ngoài chuỗi](https://mud.dev/store/tables#types-of-tables), có nghĩa là nó không được ghi vào bộ nhớ EVM, nó chỉ có thể đọc được ngoài chuỗi bằng cách sử dụng các sự kiện.

### Luồng thực thi và dữ liệu {#execution-data-flows}

Các luồng này điều phối việc thực thi giữa client, thành phần trên chuỗi và máy chủ.

#### Khởi tạo {#initialization-flow}

Khi bạn chạy `mprocs`, các bước sau sẽ diễn ra:

1. [`mprocs`](https://github.com/pvolok/mprocs) chạy bốn thành phần:

   - [Anvil](https://book.getfoundry.sh/anvil/), chạy một chuỗi khối cục bộ
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), biên dịch (nếu cần) và triển khai các hợp đồng cho MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), chạy [Vite](https://vitejs.dev/) để phục vụ giao diện người dùng (UI) và mã client cho các trình duyệt web.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), thực hiện các hành động của máy chủ

2. Gói `contracts` triển khai các hợp đồng MUD và sau đó chạy [tập lệnh `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Tập lệnh này thiết lập cấu hình. Mã từ GitHub chỉ định [một bãi mìn 10x5 với tám quả mìn trong đó](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Máy chủ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) bắt đầu bằng cách [thiết lập MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Cùng với những thứ khác, điều này kích hoạt đồng bộ hóa dữ liệu, để một bản sao của các bảng liên quan tồn tại trong bộ nhớ của máy chủ.

4. Máy chủ đăng ký một hàm để thực thi [khi bảng `Configuration` thay đổi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Hàm này](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) được gọi sau khi `PostDeploy.s.sol` thực thi và sửa đổi bảng.

5. Khi hàm khởi tạo máy chủ có cấu hình, [nó gọi `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) để khởi tạo [phần không tri thức của máy chủ](#using-zokrates-from-typescript). Điều này không thể xảy ra cho đến khi chúng ta nhận được cấu hình vì các hàm không tri thức phải có chiều rộng và chiều cao của bãi mìn dưới dạng hằng số.

6. Sau khi phần không tri thức của máy chủ được khởi tạo, bước tiếp theo là [triển khai hợp đồng xác minh không tri thức lên chuỗi khối](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) và thiết lập địa chỉ của bên được xác minh trong MUD.

7. Cuối cùng, chúng ta đăng ký nhận các bản cập nhật để có thể thấy khi nào người chơi yêu cầu [bắt đầu một trò chơi mới](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) hoặc [đào trong một trò chơi hiện có](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Trò chơi mới {#new-game-flow}

Đây là những gì xảy ra khi người chơi yêu cầu một trò chơi mới.

1. Nếu không có trò chơi nào đang diễn ra cho người chơi này, hoặc có một trò chơi nhưng với gameId bằng không, client sẽ hiển thị một [nút trò chơi mới](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Khi người dùng nhấn nút này, [React sẽ chạy hàm `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) là một lệnh gọi `System`. Trong MUD, tất cả các lệnh gọi đều được định tuyến qua hợp đồng `World`, và trong hầu hết các trường hợp, bạn gọi `<namespace>__<function name>`. Trong trường hợp này, lệnh gọi là tới `app__newGame`, sau đó MUD định tuyến tới [`newGame` trong `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Hàm trên chuỗi kiểm tra xem người chơi có trò chơi nào đang diễn ra hay không, và nếu không có, nó sẽ [thêm yêu cầu vào bảng `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Máy chủ phát hiện sự thay đổi trong `PendingGame` và [chạy hàm đã đăng ký](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Hàm này gọi [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), sau đó hàm này lại gọi [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Điều đầu tiên `createGame` làm là [tạo một bản đồ ngẫu nhiên với số lượng mìn thích hợp](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Sau đó, nó gọi [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) để tạo một bản đồ có viền trống, điều này là cần thiết cho Zokrates. Cuối cùng, `createGame` gọi [`calculateMapHash`](#calculatemaphash), để lấy mã băm của bản đồ, được sử dụng làm ID trò chơi.

6. Hàm `newGame` thêm trò chơi mới vào `gamesInProgress`.

7. Điều cuối cùng máy chủ làm là gọi [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), nằm trên chuỗi. Hàm này nằm trong một `System` khác, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), để kích hoạt kiểm soát truy cập. Kiểm soát truy cập được định nghĩa trong [tệp cấu hình MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Danh sách truy cập chỉ cho phép một địa chỉ duy nhất gọi `System`. Điều này hạn chế quyền truy cập vào các hàm của máy chủ cho một địa chỉ duy nhất, vì vậy không ai có thể mạo danh máy chủ.

8. Thành phần trên chuỗi cập nhật các bảng liên quan:

   - Tạo trò chơi trong `PlayerGame`.
   - Thiết lập ánh xạ ngược trong `GamePlayer`.
   - Xóa yêu cầu khỏi `PendingGame`.

9. Máy chủ nhận dạng sự thay đổi trong `PendingGame`, nhưng không làm gì cả vì [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) là false.

10. Trên client, [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) được đặt thành mục nhập `PlayerGame` cho địa chỉ của người chơi. Khi `PlayerGame` thay đổi, `gameRecord` cũng thay đổi theo.

11. Nếu có một giá trị trong `gameRecord`, và trò chơi chưa phân thắng bại, client sẽ [hiển thị bản đồ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Đào {#dig-flow}

1. Người chơi [nhấp vào nút của ô bản đồ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), thao tác này sẽ gọi [hàm `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Hàm này gọi [`dig` trên chuỗi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Thành phần trên chuỗi [thực hiện một số kiểm tra tính hợp lệ (sanity checks)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), và nếu thành công sẽ thêm yêu cầu đào vào [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Máy chủ [phát hiện sự thay đổi trong `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Nếu nó hợp lệ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), nó [gọi mã không tri thức](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (được giải thích bên dưới) để tạo ra cả kết quả và bằng chứng cho thấy nó hợp lệ.

4. [Máy chủ](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) gọi [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) trên chuỗi.

5. `digResponse` thực hiện hai việc. Đầu tiên, nó kiểm tra [bằng chứng không kiến thức](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Sau đó, nếu bằng chứng hợp lệ, nó gọi [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) để thực sự xử lý kết quả.

6. `processDigResult` kiểm tra xem trò chơi đã [thua](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) hay [thắng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), và [cập nhật `Map`, bản đồ trên chuỗi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Client tự động nhận các bản cập nhật và [cập nhật bản đồ hiển thị cho người chơi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), và nếu có thể, sẽ thông báo cho người chơi biết họ thắng hay thua.

## Sử dụng Zokrates {#using-zokrates}

Trong các luồng được giải thích ở trên, chúng ta đã bỏ qua các phần không tri thức, coi chúng như một hộp đen. Bây giờ hãy mở nó ra và xem mã đó được viết như thế nào.

### Quá trình băm bản đồ {#hashing-map}

Chúng ta có thể sử dụng [mã JavaScript này](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) để triển khai [Poseidon](https://www.poseidon-hash.info), hàm băm Zokrates mà chúng ta sử dụng. Tuy nhiên, mặc dù cách này sẽ nhanh hơn, nhưng nó cũng sẽ phức tạp hơn so với việc chỉ sử dụng hàm băm Zokrates để thực hiện. Đây là một hướng dẫn, và do đó mã được tối ưu hóa cho sự đơn giản, không phải cho hiệu suất. Vì vậy, chúng ta cần hai chương trình Zokrates khác nhau, một chương trình chỉ để tính toán mã băm của một bản đồ (`hash`) và một chương trình để thực sự tạo ra một bằng chứng không kiến thức về kết quả của việc đào tại một vị trí trên bản đồ (`dig`).

### Hàm băm {#hash-function}

Đây là hàm tính toán mã băm của một bản đồ. Chúng ta sẽ đi qua mã này từng dòng một.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Hai dòng này nhập hai hàm từ [thư viện chuẩn Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Hàm đầu tiên](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) là một [mã băm Poseidon](https://www.poseidon-hash.info/). Nó nhận một mảng các [phần tử `field`](https://zokrates.github.io/language/types.html#field) và trả về một `field`.

Phần tử trường (field element) trong Zokrates thường dài dưới 256 bit, nhưng không ít hơn nhiều. Để đơn giản hóa mã, chúng ta giới hạn bản đồ ở mức tối đa 512 bit và băm một mảng gồm bốn trường, và trong mỗi trường chúng ta chỉ sử dụng 128 bit. [Hàm `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) thay đổi một mảng 128 bit thành một `field` cho mục đích này.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Dòng này bắt đầu một định nghĩa hàm. `hashMap` nhận một tham số duy nhất gọi là `map`, một mảng `bool`(ean) hai chiều. Kích thước của bản đồ là `width+2` nhân `height+2` vì những lý do được [giải thích bên dưới](#why-map-border).

Chúng ta có thể sử dụng `${width+2}` và `${height+2}` vì các chương trình Zokrates được lưu trữ trong ứng dụng này dưới dạng [chuỗi mẫu (template strings)](https://www.w3schools.com/js/js_string_templates.asp). Mã giữa `${` và `}` được đánh giá bởi JavaScript, và theo cách này, chương trình có thể được sử dụng cho các kích thước bản đồ khác nhau. Tham số bản đồ có một đường viền rộng một vị trí xung quanh nó mà không có bất kỳ quả bom nào, đó là lý do chúng ta cần cộng thêm hai vào chiều rộng và chiều cao.

Giá trị trả về là một `field` chứa mã băm.

```
bool[512] mut map1d = [false; 512];
```

Bản đồ là hai chiều. Tuy nhiên, hàm `pack128` không hoạt động với các mảng hai chiều. Vì vậy, trước tiên chúng ta làm phẳng bản đồ thành một mảng 512 byte, sử dụng `map1d`. Theo mặc định, các biến Zokrates là hằng số, nhưng chúng ta cần gán giá trị cho mảng này trong một vòng lặp, vì vậy chúng ta định nghĩa nó là [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Chúng ta cần khởi tạo mảng vì Zokrates không có `undefined`. Biểu thức `[false; 512]` có nghĩa là [một mảng gồm 512 giá trị `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Chúng ta cũng cần một bộ đếm để phân biệt giữa các bit chúng ta đã điền vào `map1d` và những bit chưa điền.

```
for u32 x in 0..${width+2} {
```

Đây là cách bạn khai báo một [vòng lặp `for`](https://zokrates.github.io/language/control_flow.html#for-loops) trong Zokrates. Một vòng lặp `for` của Zokrates phải có các giới hạn cố định, bởi vì mặc dù nó có vẻ là một vòng lặp, trình biên dịch thực sự "mở cuộn" (unroll) nó. Biểu thức `${width+2}` là một hằng số tại thời điểm biên dịch vì `width` được thiết lập bởi mã TypeScript trước khi nó gọi trình biên dịch.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Đối với mỗi vị trí trong bản đồ, hãy đặt giá trị đó vào mảng `map1d` và tăng bộ đếm.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Sử dụng `pack128` để tạo một mảng gồm bốn giá trị `field` từ `map1d`. Trong Zokrates, `array[a..b]` có nghĩa là lát cắt của mảng bắt đầu tại `a` và kết thúc tại `b-1`.

```
return poseidon(hashMe);
}
```

Sử dụng `poseidon` để chuyển đổi mảng này thành một mã băm.

### Chương trình băm {#hash-program}

Máy chủ cần gọi trực tiếp `hashMap` để tạo các định danh trò chơi. Tuy nhiên, Zokrates chỉ có thể gọi hàm `main` trên một chương trình để bắt đầu, vì vậy chúng ta tạo một chương trình với một `main` gọi hàm băm.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Chương trình đào {#dig-program}

Đây là trung tâm của phần không tri thức của ứng dụng, nơi chúng ta tạo ra các bằng chứng được sử dụng để xác minh kết quả đào.

```
${hashFragment}

// Số lượng mìn ở vị trí (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Tại sao lại có viền bản đồ {#why-map-border}

Các bằng chứng không kiến thức sử dụng [mạch số học (arithmetic circuits)](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), vốn không có một cấu trúc tương đương dễ dàng cho câu lệnh `if`. Thay vào đó, chúng sử dụng cấu trúc tương đương của [toán tử điều kiện](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Nếu `a` có thể là không hoặc một, bạn có thể tính toán `if a { b } else { c }` dưới dạng `ab+(1-a)c`.

Vì lý do này, một câu lệnh `if` của Zokrates luôn đánh giá cả hai nhánh. Ví dụ, nếu bạn có đoạn mã này:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Nó sẽ báo lỗi, bởi vì nó cần tính toán `arr[10]`, mặc dù giá trị đó sau này sẽ được nhân với không.

Đây là lý do chúng ta cần một đường viền rộng một vị trí xung quanh bản đồ. Chúng ta cần tính tổng số mìn xung quanh một vị trí, và điều đó có nghĩa là chúng ta cần xem vị trí ở một hàng phía trên và phía dưới, bên trái và bên phải của vị trí mà chúng ta đang đào. Điều đó có nghĩa là những vị trí đó phải tồn tại trong mảng bản đồ mà Zokrates được cung cấp.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Theo mặc định, các bằng chứng Zokrates bao gồm các đầu vào của chúng. Sẽ không có ích gì khi biết có năm quả mìn xung quanh một điểm trừ khi bạn thực sự biết điểm đó là điểm nào (và bạn không thể chỉ khớp nó với yêu cầu của mình, bởi vì khi đó trình chứng minh có thể sử dụng các giá trị khác nhau và không cho bạn biết về điều đó). Tuy nhiên, chúng ta cần giữ bí mật bản đồ, trong khi vẫn cung cấp nó cho Zokrates. Giải pháp là sử dụng một tham số `private`, một tham số _không_ được tiết lộ bởi bằng chứng.

Điều này mở ra một cơ hội khác cho việc lạm dụng. Trình chứng minh có thể sử dụng tọa độ chính xác, nhưng tạo ra một bản đồ với bất kỳ số lượng mìn nào xung quanh vị trí đó, và có thể tại chính vị trí đó. Để ngăn chặn sự lạm dụng này, chúng ta làm cho bằng chứng không kiến thức bao gồm mã băm của bản đồ, đây chính là định danh của trò chơi.

```
return (hashMap(map),
```

Giá trị trả về ở đây là một tuple bao gồm mảng mã băm bản đồ cũng như kết quả đào.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Chúng ta sử dụng 255 như một giá trị đặc biệt trong trường hợp bản thân vị trí đó có một quả bom.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Nếu người chơi chưa chạm phải mìn, hãy cộng số lượng mìn cho khu vực xung quanh vị trí đó và trả về kết quả.

### Sử dụng Zokrates từ TypeScript {#using-zokrates-from-typescript}

Zokrates có một giao diện dòng lệnh, nhưng trong chương trình này, chúng ta sử dụng nó trong [mã TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Thư viện chứa các định nghĩa Zokrates được gọi là [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Nhập [các ràng buộc JavaScript của Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Chúng ta chỉ cần hàm [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) vì nó trả về một promise sẽ phân giải thành tất cả các định nghĩa Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Tương tự như bản thân Zokrates, chúng ta cũng chỉ xuất một hàm duy nhất, hàm này cũng [bất đồng bộ](https://www.w3schools.com/js/js_async.asp). Khi nó trả về kết quả, nó cung cấp một số hàm như chúng ta sẽ thấy bên dưới.

```typescript
const zokrates = await zokratesInitialize()
```

Khởi tạo Zokrates, lấy mọi thứ chúng ta cần từ thư viện.

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

Tại đây chúng ta biên dịch các chương trình đó.

```typescript
// Tạo các khóa để xác minh không tri thức.
// Trên hệ thống sản xuất, bạn sẽ muốn sử dụng một nghi thức thiết lập.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Trên một hệ thống sản xuất, chúng ta có thể sử dụng một [nghi thức thiết lập (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) phức tạp hơn, nhưng điều này là đủ tốt cho một bản trình diễn. Việc người dùng có thể biết khóa của trình chứng minh không phải là vấn đề - họ vẫn không thể sử dụng nó để chứng minh mọi thứ trừ khi chúng là sự thật. Bởi vì chúng ta chỉ định entropy (tham số thứ hai, `""`), kết quả sẽ luôn giống nhau.

**Lưu ý:** Việc biên dịch các chương trình Zokrates và tạo khóa là những quá trình chậm. Không cần phải lặp lại chúng mỗi lần, chỉ khi kích thước bản đồ thay đổi. Trên một hệ thống sản xuất, bạn sẽ thực hiện chúng một lần, và sau đó lưu trữ đầu ra. Lý do duy nhất tôi không làm điều đó ở đây là vì sự đơn giản.

#### `calculateMapHash` {#calculatemaphash}

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

Hàm [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) thực sự chạy chương trình Zokrates. Nó trả về một cấu trúc với hai trường: `output`, là đầu ra của chương trình dưới dạng chuỗi JSON, và `witness`, là thông tin cần thiết để tạo ra một bằng chứng không kiến thức về kết quả. Ở đây chúng ta chỉ cần đầu ra.

Đầu ra là một chuỗi có dạng `"31337"`, một số thập phân được đặt trong dấu ngoặc kép. Nhưng đầu ra chúng ta cần cho `viem` là một số thập lục phân có dạng `0x60A7`. Vì vậy, chúng ta sử dụng `.slice(1,-1)` để loại bỏ dấu ngoặc kép và sau đó `BigInt` để chạy chuỗi còn lại, là một số thập phân, thành một [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` chuyển đổi `BigInt` này thành một chuỗi thập lục phân, và `"0x"+` thêm điểm đánh dấu cho các số thập lục phân.

```typescript
// Đào và trả về một bằng chứng không kiến thức của kết quả
// (mã phía máy chủ)
```

Bằng chứng không kiến thức bao gồm các đầu vào công khai (`x` và `y`) và kết quả (mã băm của bản đồ và số lượng bom).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Việc kiểm tra xem một chỉ số có nằm ngoài giới hạn trong Zokrates hay không là một vấn đề, vì vậy chúng ta thực hiện nó ở đây.

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
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Một trình xác minh Solidity, một hợp đồng thông minh mà chúng ta có thể triển khai lên chuỗi khối và sử dụng để xác minh các bằng chứng được tạo bởi `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Cuối cùng, trả về mọi thứ mà mã khác có thể cần.

## Các bài kiểm tra bảo mật {#security-tests}

Các bài kiểm tra bảo mật rất quan trọng vì một lỗi chức năng cuối cùng sẽ tự bộc lộ. Nhưng nếu ứng dụng không an toàn, điều đó có khả năng bị ẩn giấu trong một thời gian dài trước khi bị phát hiện bởi một kẻ gian lận nào đó và chiếm đoạt các tài nguyên thuộc về người khác.

### Quyền hạn {#permissions}

Có một thực thể có đặc quyền trong trò chơi này, đó là máy chủ. Đây là người dùng duy nhất được phép gọi các hàm trong [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Chúng ta có thể sử dụng [`cast`](https://book.getfoundry.sh/cast/) để xác minh các lệnh gọi đến các hàm có cấp phép chỉ được cho phép dưới dạng tài khoản máy chủ.

[Khóa riêng tư của máy chủ nằm trong `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Trên máy tính chạy `anvil` (chuỗi khối), hãy thiết lập các biến môi trường này.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Sử dụng `cast` để thử đặt địa chỉ trình xác minh thành một địa chỉ không được ủy quyền.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Không chỉ `cast` báo cáo lỗi, mà bạn còn có thể mở **MUD Dev Tools** trong trò chơi trên trình duyệt, nhấp vào **Tables**, và chọn **app\_\_VerifierAddress**. Hãy xem rằng địa chỉ không phải là số không.

3. Đặt địa chỉ trình xác minh thành địa chỉ của máy chủ.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Địa chỉ trong **app\_\_VerifiedAddress** bây giờ sẽ là số không.

Tất cả các hàm MUD trong cùng một `System` đều đi qua cùng một cơ chế kiểm soát truy cập, vì vậy tôi coi bài kiểm tra này là đủ. Nếu bạn không nghĩ vậy, bạn có thể kiểm tra các hàm khác trong [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Lạm dụng không tri thức {#zero-knowledge-abuses}

Toán học để xác minh Zokrates nằm ngoài phạm vi của hướng dẫn này (và khả năng của tôi). Tuy nhiên, chúng ta có thể chạy nhiều kiểm tra khác nhau trên mã không tri thức để xác minh rằng nếu nó không được thực hiện chính xác thì nó sẽ thất bại. Tất cả các bài kiểm tra này sẽ yêu cầu chúng ta thay đổi [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) và khởi động lại toàn bộ ứng dụng. Việc chỉ khởi động lại tiến trình máy chủ là không đủ, vì nó đặt ứng dụng vào một trạng thái bất khả thi (người chơi đang có một trò chơi đang diễn ra, nhưng trò chơi đó không còn khả dụng đối với máy chủ nữa).

#### Câu trả lời sai {#wrong-answer}

Khả năng đơn giản nhất là cung cấp câu trả lời sai trong bằng chứng không kiến thức. Để làm điều đó, chúng ta đi vào bên trong `zkDig` và [sửa đổi dòng 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Điều này có nghĩa là chúng ta sẽ luôn khẳng định có một quả bom, bất kể câu trả lời đúng là gì. Hãy thử chơi với phiên bản này, và bạn sẽ thấy trong tab **server** của màn hình `pnpm dev` có lỗi này:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Vì vậy, kiểu gian lận này sẽ thất bại.

#### Bằng chứng sai {#wrong-proof}

Điều gì xảy ra nếu chúng ta cung cấp thông tin chính xác, nhưng lại có dữ liệu bằng chứng sai? Bây giờ, hãy thay thế dòng 91 bằng:

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

Nó vẫn thất bại, nhưng bây giờ nó thất bại mà không có lý do vì điều đó xảy ra trong quá trình gọi trình xác minh.

### Làm thế nào người dùng có thể xác minh mã zero trust? {#user-verify-zero-trust}

Các hợp đồng thông minh tương đối dễ xác minh. Thông thường, nhà phát triển công bố mã nguồn lên một trình khám phá khối, và trình khám phá khối sẽ xác minh rằng mã nguồn thực sự biên dịch thành mã trong [giao dịch triển khai hợp đồng](/developers/docs/smart-contracts/deploying/). Trong trường hợp của các `System` MUD, điều này [phức tạp hơn một chút](https://mud.dev/cli/verify), nhưng không nhiều.

Điều này khó hơn với không tri thức. Trình xác minh bao gồm một số hằng số và chạy một số tính toán trên chúng. Điều này không cho bạn biết những gì đang được chứng minh.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Giải pháp, ít nhất là cho đến khi các trình khám phá khối thêm tính năng xác minh Zokrates vào giao diện người dùng của họ, là các nhà phát triển ứng dụng phải cung cấp sẵn các chương trình Zokrates, và ít nhất một số người dùng phải tự biên dịch chúng với khóa xác minh phù hợp.

Để làm như vậy:

1. [Cài đặt Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Tạo một tệp, `dig.zok`, với chương trình Zokrates. Mã bên dưới giả định rằng bạn đã giữ nguyên kích thước bản đồ ban đầu là 10x5.

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


    // Số lượng mìn ở vị trí (x,y)
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

3. Biên dịch mã Zokrates và tạo khóa xác minh. Khóa xác minh phải được tạo với cùng entropy được sử dụng trong máy chủ ban đầu, [trong trường hợp này là một chuỗi rỗng](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Tự tạo trình xác minh Solidity và xác minh rằng nó giống hệt về mặt chức năng với trình xác minh trên chuỗi khối (máy chủ có thêm một bình luận, nhưng điều đó không quan trọng).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Các quyết định thiết kế {#design}

Trong bất kỳ ứng dụng nào đủ phức tạp, luôn có những mục tiêu thiết kế cạnh tranh nhau đòi hỏi sự đánh đổi. Hãy cùng xem xét một số sự đánh đổi và lý do tại sao giải pháp hiện tại lại được ưu tiên hơn các lựa chọn khác.

### Tại sao lại là không tri thức {#why-zero-knowledge}

Đối với trò chơi dò mìn, bạn không thực sự cần công nghệ không tri thức. Máy chủ luôn có thể giữ bản đồ, và sau đó chỉ cần tiết lộ toàn bộ khi trò chơi kết thúc. Sau đó, vào cuối trò chơi, hợp đồng thông minh có thể tính toán mã băm của bản đồ, xác minh xem nó có khớp hay không, và nếu không khớp thì sẽ phạt máy chủ hoặc hủy bỏ hoàn toàn trò chơi.

Tôi đã không sử dụng giải pháp đơn giản hơn này vì nó chỉ hoạt động đối với các trò chơi ngắn có trạng thái kết thúc được xác định rõ ràng. Khi một trò chơi có khả năng kéo dài vô tận (chẳng hạn như trường hợp của [các thế giới tự trị](https://0xparc.org/blog/autonomous-worlds)), bạn cần một giải pháp chứng minh trạng thái _mà không_ tiết lộ nó.

Vì là một bài hướng dẫn, bài viết này cần một trò chơi ngắn gọn và dễ hiểu, nhưng kỹ thuật này hữu ích nhất đối với các trò chơi dài hơn.

### Tại sao lại là Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) không phải là thư viện không tri thức duy nhất hiện có, nhưng nó tương tự như một ngôn ngữ lập trình [mệnh lệnh](https://en.wikipedia.org/wiki/Imperative_programming) thông thường và hỗ trợ các biến boolean.

Đối với ứng dụng của bạn, với các yêu cầu khác nhau, bạn có thể muốn sử dụng [Circum](https://docs.circom.io/getting-started/installation/) hoặc [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Khi nào nên biên dịch Zokrates {#when-compile-zokrates}

Trong chương trình này, chúng tôi biên dịch các chương trình Zokrates [mỗi khi máy chủ khởi động](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Điều này rõ ràng là lãng phí tài nguyên, nhưng đây là một bài hướng dẫn, được tối ưu hóa cho sự đơn giản.

Nếu tôi đang viết một ứng dụng cấp độ sản xuất, tôi sẽ kiểm tra xem mình có tệp chứa các chương trình Zokrates đã biên dịch ở kích thước bãi mìn này hay không, và nếu có thì sử dụng tệp đó. Điều tương tự cũng áp dụng cho việc triển khai một hợp đồng trình xác minh trên chuỗi.

### Tạo khóa trình xác minh và trình chứng minh {#key-creation}

[Việc tạo khóa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) là một phép tính thuần túy khác không cần thực hiện nhiều hơn một lần cho một kích thước bãi mìn nhất định. Một lần nữa, nó chỉ được thực hiện một lần vì mục đích đơn giản hóa.

Ngoài ra, chúng ta có thể sử dụng [một buổi lễ thiết lập](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Ưu điểm của buổi lễ thiết lập là bạn cần entropy hoặc một số kết quả trung gian từ mỗi người tham gia để gian lận bằng chứng không kiến thức. Nếu có ít nhất một người tham gia buổi lễ trung thực và xóa thông tin đó, các bằng chứng không kiến thức sẽ an toàn trước một số cuộc tấn công nhất định. Tuy nhiên, _không có cơ chế nào_ để xác minh rằng thông tin đã bị xóa khỏi mọi nơi. Nếu các bằng chứng không kiến thức cực kỳ quan trọng, bạn sẽ muốn tham gia vào buổi lễ thiết lập.

Ở đây chúng ta dựa vào [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), vốn có hàng chục người tham gia. Nó có lẽ đủ an toàn và đơn giản hơn nhiều. Chúng ta cũng không thêm entropy vào trong quá trình tạo khóa, điều này giúp người dùng dễ dàng [xác minh cấu hình không tri thức](#user-verify-zero-trust) hơn.

### Xác minh ở đâu {#where-verification}

Chúng ta có thể xác minh các bằng chứng không kiến thức trên chuỗi (tốn Gas) hoặc trong máy khách (sử dụng [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Tôi đã chọn cách đầu tiên, vì điều này cho phép bạn [xác minh trình xác minh](#user-verify-zero-trust) một lần và sau đó tin tưởng rằng nó không thay đổi miễn là địa chỉ hợp đồng của nó vẫn giữ nguyên. Nếu việc xác minh được thực hiện trên máy khách, bạn sẽ phải xác minh mã bạn nhận được mỗi khi tải xuống máy khách.

Ngoài ra, mặc dù trò chơi này là chơi đơn, nhưng rất nhiều trò chơi chuỗi khối là nhiều người chơi. Việc xác minh trên chuỗi có nghĩa là bạn chỉ xác minh bằng chứng không kiến thức một lần. Thực hiện điều đó trong máy khách sẽ yêu cầu mỗi máy khách phải xác minh một cách độc lập.

### Làm phẳng bản đồ trong TypeScript hay Zokrates? {#where-flatten}

Nhìn chung, khi quá trình xử lý có thể được thực hiện bằng TypeScript hoặc Zokrates, tốt hơn là nên thực hiện bằng TypeScript, vì nó nhanh hơn rất nhiều và không yêu cầu các bằng chứng không kiến thức. Đây là lý do, ví dụ, tại sao chúng ta không cung cấp cho Zokrates mã băm và bắt nó xác minh xem mã băm đó có chính xác hay không. Quá trình băm phải được thực hiện bên trong Zokrates, nhưng việc khớp giữa mã băm được trả về và mã băm trên chuỗi có thể diễn ra bên ngoài nó.

Tuy nhiên, chúng ta vẫn [làm phẳng bản đồ trong Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), trong khi chúng ta có thể đã làm điều đó trong TypeScript. Lý do là theo ý kiến của tôi, các lựa chọn khác còn tệ hơn.

- Cung cấp một mảng boolean một chiều cho mã Zokrates và sử dụng một biểu thức như `x*(height+2)
+y` để lấy bản đồ hai chiều. Điều này sẽ làm cho [mã](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) phức tạp hơn một chút, vì vậy tôi quyết định rằng mức tăng hiệu suất không đáng giá đối với một bài hướng dẫn.

- Gửi cho Zokrates cả mảng một chiều và mảng hai chiều. Tuy nhiên, giải pháp này không mang lại cho chúng ta bất cứ điều gì. Mã Zokrates sẽ phải xác minh rằng mảng một chiều mà nó được cung cấp thực sự là biểu diễn chính xác của mảng hai chiều. Vì vậy, sẽ không có bất kỳ sự gia tăng hiệu suất nào.

- Làm phẳng mảng hai chiều trong Zokrates. Đây là lựa chọn đơn giản nhất, vì vậy tôi đã chọn nó.

### Lưu trữ bản đồ ở đâu {#where-store-maps}

Trong ứng dụng này, [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) chỉ đơn giản là một biến trong bộ nhớ. Điều này có nghĩa là nếu máy chủ của bạn bị sập và cần khởi động lại, tất cả thông tin mà nó lưu trữ sẽ bị mất. Người chơi không chỉ không thể tiếp tục trò chơi của họ, mà họ thậm chí không thể bắt đầu một trò chơi mới vì thành phần trên chuỗi nghĩ rằng họ vẫn đang có một trò chơi đang diễn ra.

Đây rõ ràng là một thiết kế tồi đối với một hệ thống sản xuất, trong đó bạn sẽ lưu trữ thông tin này trong cơ sở dữ liệu. Lý do duy nhất tôi sử dụng một biến ở đây là vì đây là một bài hướng dẫn và sự đơn giản là yếu tố được cân nhắc chính.

## Kết luận: Kỹ thuật này phù hợp trong những điều kiện nào? {#conclusion}

Vậy là bây giờ bạn đã biết cách viết một trò chơi với một máy chủ lưu trữ trạng thái bí mật không thuộc về trên chuỗi. Nhưng bạn nên làm điều đó trong những trường hợp nào? Có hai cân nhắc chính.

- _Trò chơi kéo dài_: [Như đã đề cập ở trên](#why-zero-knowledge), trong một trò chơi ngắn, bạn có thể chỉ cần công bố trạng thái sau khi trò chơi kết thúc và mọi thứ sẽ được xác minh sau đó. Nhưng đó không phải là một lựa chọn khi trò chơi diễn ra trong một thời gian dài hoặc không xác định, và trạng thái cần được giữ bí mật.

- _Chấp nhận một mức độ tập trung nhất định_: Bằng chứng không kiến thức có thể xác minh tính toàn vẹn, rằng một thực thể không làm giả kết quả. Điều chúng không thể làm là đảm bảo rằng thực thể đó sẽ luôn khả dụng và trả lời các thông điệp. Trong những tình huống mà tính khả dụng cũng cần được phi tập trung, bằng chứng không kiến thức không phải là một giải pháp đủ tốt, và bạn cần [tính toán đa bên](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).

### Lời cảm ơn {#acknowledgements}

- Alvaro Alonso đã đọc bản nháp của bài viết này và làm rõ một số hiểu lầm của tôi về Zokrates.

Mọi sai sót còn lại đều thuộc trách nhiệm của tôi.