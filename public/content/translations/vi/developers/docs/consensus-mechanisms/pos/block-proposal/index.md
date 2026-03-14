---
title: "Khối đề xuất"
description: "Giải thích cách các khối được đề xuất trong Ethereum bằng chứng cổ phần."
lang: vi
---

Các khối là những đơn vị cơ bản của chuỗi khối. Các khối là những đơn vị thông tin riêng biệt được chuyển qua lại giữa các nút, được đồng thuận và được thêm vào cơ sở dữ liệu của mỗi nút. Trang này giải thích cách chúng được tạo ra.

## Điều kiện tiên quyết {#prerequisites}

Việc đề xuất khối là một phần của giao thức bằng chứng cổ phần. Để giúp bạn hiểu trang này, chúng tôi khuyên bạn nên đọc về [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/) và [kiến trúc khối](/developers/docs/blocks/).

## Ai tạo ra các khối? {#who-produces-blocks}

Các tài khoản trình xác thực đề xuất các khối. Các tài khoản trình xác thực được quản lý bởi các nhà điều hành nút, những người chạy phần mềm trình xác thực như một phần của máy khách thực thi và máy khách đồng thuận của họ và đã ký gửi ít nhất 32 ETH vào hợp đồng ký gửi. Tuy nhiên, mỗi trình xác thực chỉ thỉnh thoảng chịu trách nhiệm đề xuất một khối. Ethereum đo lường thời gian bằng slot và epoch. Mỗi slot dài mười hai giây, và 32 slot (6,4 phút) tạo thành một epoch. Mỗi slot là một cơ hội để thêm một khối mới trên Ethereum.

### Lựa chọn ngẫu nhiên {#random-selection}

Một trình xác thực duy nhất được chọn một cách giả ngẫu nhiên để đề xuất một khối trong mỗi slot. Không có cái gọi là sự ngẫu nhiên thực sự trong một chuỗi khối bởi vì nếu mỗi nút tạo ra các số ngẫu nhiên thực sự, chúng sẽ không thể đạt được sự đồng thuận. Thay vào đó, mục đích là làm cho quy trình lựa chọn trình xác thực không thể đoán trước được. Sự ngẫu nhiên được thực hiện trên Ethereum bằng cách sử dụng một thuật toán gọi là RANDAO, thuật toán này trộn một hàm băm từ người đề xuất khối với một hạt giống được cập nhật mỗi khối. Giá trị này được sử dụng để chọn một người xác thực cụ thể từ tổng bộ người xác thực. Việc lựa chọn trình xác thực được ấn định trước hai epoch như một cách để bảo vệ chống lại một số loại thao túng hạt giống nhất định.

Mặc dù các trình xác thực thêm vào RANDAO trong mỗi slot, giá trị RANDAO toàn cục chỉ được cập nhật một lần mỗi epoch. Để tính toán chỉ số của người đề xuất khối tiếp theo, giá trị RANDAO được trộn với số slot để tạo ra một giá trị duy nhất trong mỗi slot. Xác suất một trình xác thực cá nhân được chọn không đơn giản là `1/N` (với `N` = tổng số trình xác thực đang hoạt động). Thay vào đó, nó được tính trọng số theo số dư ETH hiệu quả của mỗi trình xác thực. Số dư hiệu quả tối đa là 32 ETH (điều này có nghĩa là `số dư < 32 ETH` dẫn đến trọng số thấp hơn so với `số dư == 32 ETH`, nhưng `số dư > 32 ETH` không dẫn đến trọng số cao hơn so với `số dư == 32 ETH`).

Chỉ một người đề xuất khối được chọn trong mỗi slot. Trong điều kiện bình thường, một người tạo khối duy nhất sẽ tạo và phát hành một khối duy nhất trong slot dành riêng cho họ. Việc tạo hai khối cho cùng một slot là một hành vi có thể bị cắt giảm, thường được gọi là "nhập nhằng".

## Khối được tạo ra như thế nào? {#how-is-a-block-created}

Người đề xuất khối dự kiến sẽ phát một khối beacon đã ký, khối này xây dựng trên đỉnh đầu gần đây nhất của chuỗi theo góc nhìn của thuật toán lựa chọn phân nhánh do họ tự chạy cục bộ. Thuật toán lựa chọn phân nhánh áp dụng bất kỳ sự chứng thực nào đang chờ trong hàng đợi còn sót lại từ slot trước, sau đó tìm khối có trọng lượng chứng thực tích lũy lớn nhất trong lịch sử của nó. Khối đó là khối cha của khối mới do người đề xuất tạo ra.

Người đề xuất khối tạo ra một khối bằng cách thu thập dữ liệu từ cơ sở dữ liệu cục bộ và góc nhìn về chuỗi của riêng nó. Nội dung của khối được hiển thị trong đoạn mã dưới đây:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Trường `randao_reveal` nhận một giá trị ngẫu nhiên có thể xác minh mà người đề xuất khối tạo ra bằng cách ký vào số epoch hiện tại. `eth1_data` là một phiếu bầu cho góc nhìn của người đề xuất khối về hợp đồng ký gửi, bao gồm gốc của cây Merkle ký gửi và tổng số lượng ký gửi cho phép các khoản ký gửi mới được xác minh. `graffiti` là một trường tùy chọn có thể được sử dụng để thêm một thông điệp vào khối. `proposer_slashings` và `attester_slashings` là các trường chứa bằng chứng cho thấy một số trình xác thực nhất định đã thực hiện các hành vi có thể bị cắt giảm theo góc nhìn của người đề xuất về chuỗi. `deposits` là một danh sách các khoản ký gửi của trình xác thực mới mà người đề xuất khối biết, và `voluntary_exits` là một danh sách các trình xác thực muốn thoát mà người đề xuất khối đã nghe nói đến trên mạng gossip của lớp đồng thuận. `sync_aggregate` là một vector cho thấy những trình xác thực nào trước đây đã được chỉ định vào một ủy ban đồng bộ (một tập hợp con các trình xác thực phục vụ dữ liệu máy khách nhẹ) và đã tham gia vào việc ký dữ liệu.

`execution_payload` cho phép thông tin về các giao dịch được chuyển qua lại giữa máy khách thực thi và máy khách đồng thuận. `execution_payload` là một khối dữ liệu thực thi được lồng vào bên trong một khối beacon. Các trường bên trong `execution_payload` phản ánh cấu trúc khối được nêu trong Sách vàng Ethereum, ngoại trừ việc không có ommer và `prev_randao` tồn tại thay cho `difficulty`. Máy khách thực thi có quyền truy cập vào một nhóm giao dịch cục bộ mà nó đã nghe được trên mạng gossip của riêng mình. Các giao dịch này được thực thi cục bộ để tạo ra một cây trie trạng thái được cập nhật, được gọi là trạng thái sau. Các giao dịch được bao gồm trong `execution_payload` dưới dạng một danh sách được gọi là `transactions` và trạng thái sau được cung cấp trong trường `state-root`.

Tất cả các dữ liệu này được thu thập trong một khối beacon, được ký và phát đến các máy ngang hàng của người đề xuất khối, những máy này sẽ lan truyền nó đến các máy ngang hàng của họ, v.v.

Đọc thêm về [cấu trúc của các khối](/developers/docs/blocks).

## Điều gì xảy ra với khối? {#what-happens-to-blocks}

Khối được thêm vào cơ sở dữ liệu cục bộ của người đề xuất khối và được phát đến các máy ngang hàng qua mạng gossip của lớp đồng thuận. Khi một trình xác thực nhận được khối, nó sẽ xác minh dữ liệu bên trong đó, bao gồm việc kiểm tra rằng khối đó có khối cha chính xác, tương ứng với slot chính xác, chỉ số người đề xuất là chỉ số được mong đợi, việc tiết lộ RANDAO là hợp lệ và người đề xuất không bị cắt giảm. `execution_payload` được tách ra, và máy khách thực thi của trình xác thực sẽ thực thi lại các giao dịch trong danh sách để kiểm tra sự thay đổi trạng thái được đề xuất. Giả sử khối vượt qua tất cả các kiểm tra này, mỗi trình xác thực sẽ thêm khối đó vào chuỗi chính tắc của riêng mình. Quy trình sau đó bắt đầu lại trong slot tiếp theo.

## Phần thưởng khối {#block-rewards}

Người đề xuất khối nhận được thanh toán cho công việc của họ. Có một `base_reward` được tính như một hàm của số lượng trình xác thực đang hoạt động và số dư hiệu quả của chúng. Người đề xuất khối sau đó nhận được một phần của `base_reward` cho mỗi sự chứng thực hợp lệ có trong khối; càng nhiều trình xác thực chứng thực cho khối, phần thưởng của người đề xuất khối càng lớn. Cũng có một phần thưởng cho việc báo cáo các trình xác thực nên bị cắt giảm, bằng `1/512 * số dư hiệu quả` cho mỗi trình xác thực bị cắt giảm.

[Thông tin thêm về phần thưởng và hình phạt](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Đọc thêm {#further-reading}

- [Giới thiệu về các khối](/developers/docs/blocks/)
- [Giới thiệu về Cơ chế bảo chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)
- [Thông số kỹ thuật đồng thuận của Ethereum](https://github.com/ethereum/consensus-specs)
- [Giới thiệu về Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Nâng cấp Ethereum](https://eth2book.info/)
