---
title: "Bản cuộn không tri thức"
description: "Giới thiệu về bản cuộn không tri thức—một giải pháp mở rộng quy mô được cộng đồng Ethereum sử dụng."
lang: vi
---

Bản cuộn không tri thức (ZK-rollup) là các [giải pháp mở rộng quy mô](/developers/docs/scaling/) lớp 2 (l2) giúp tăng thông lượng trên Mạng chính [Ethereum](/) bằng cách chuyển tính toán và lưu trữ trạng thái ra ngoài chuỗi. Các ZK-rollup có thể xử lý hàng ngàn giao dịch trong một lô và sau đó chỉ đăng một số dữ liệu tóm tắt tối thiểu lên Mạng chính. Dữ liệu tóm tắt này xác định các thay đổi cần được thực hiện đối với trạng thái Ethereum và một số bằng chứng mật mã học rằng những thay đổi đó là chính xác.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2 (l2)](/layer-2).

## Bản cuộn không tri thức là gì? {#what-are-zk-rollups}

**Bản cuộn không tri thức (ZK-rollup)** gom (hoặc 'cuộn lại') các giao dịch thành các lô được thực thi ngoài chuỗi. Tính toán ngoài chuỗi làm giảm lượng dữ liệu phải được đăng lên Chuỗi khối. Các nhà điều hành ZK-rollup gửi một bản tóm tắt các thay đổi cần thiết để đại diện cho tất cả các giao dịch trong một lô thay vì gửi từng giao dịch riêng lẻ. Họ cũng tạo ra các [bằng chứng tính hợp lệ](/glossary/#validity-proof) để chứng minh tính chính xác của các thay đổi của họ.

Trạng thái của ZK-rollup được duy trì bởi một hợp đồng thông minh được triển khai trên mạng lưới Ethereum. Để cập nhật trạng thái này, các nút ZK-rollup phải gửi một bằng chứng tính hợp lệ để xác minh. Như đã đề cập, bằng chứng tính hợp lệ là một sự đảm bảo mật mã học rằng thay đổi trạng thái do Rollup đề xuất thực sự là kết quả của việc thực thi lô giao dịch đã cho. Điều này có nghĩa là các ZK-rollup chỉ cần cung cấp các bằng chứng tính hợp lệ để chốt các giao dịch trên Ethereum thay vì đăng tất cả dữ liệu giao dịch trên chuỗi như [các bản cuộn optimistic](/developers/docs/scaling/optimistic-rollups/).

Không có sự chậm trễ nào khi chuyển tiền từ ZK-rollup sang Ethereum vì các giao dịch thoát được thực thi ngay khi hợp đồng ZK-rollup xác minh bằng chứng tính hợp lệ. Ngược lại, việc rút tiền từ các bản cuộn optimistic phải chịu một khoảng thời gian trễ để cho phép bất kỳ ai thách thức giao dịch thoát bằng một [bằng chứng gian lận](/glossary/#fraud-proof).

Các ZK-rollup ghi các giao dịch lên Ethereum dưới dạng `calldata`. `calldata` là nơi lưu trữ dữ liệu được bao gồm trong các lệnh gọi bên ngoài đến các hàm của hợp đồng thông minh. Thông tin trong `calldata` được xuất bản trên Chuỗi khối, cho phép bất kỳ ai tái tạo lại trạng thái của Rollup một cách độc lập. Các ZK-rollup sử dụng các kỹ thuật nén để giảm dữ liệu giao dịch—ví dụ: các Tài khoản được biểu diễn bằng một chỉ số thay vì một Địa chỉ, giúp tiết kiệm 28 byte dữ liệu. Việc xuất bản dữ liệu trên chuỗi là một chi phí đáng kể đối với các bản cuộn, vì vậy việc nén dữ liệu có thể giảm phí cho người dùng.

## Các ZK-rollup tương tác với Ethereum như thế nào? {#zk-rollups-and-ethereum}

Chuỗi ZK-rollup là một Giao thức ngoài chuỗi hoạt động trên Chuỗi khối Ethereum và được quản lý bởi các hợp đồng thông minh Ethereum trên chuỗi. Các ZK-rollup thực thi các giao dịch bên ngoài Mạng chính, nhưng định kỳ cam kết các lô giao dịch ngoài chuỗi vào một hợp đồng Rollup trên chuỗi. Bản ghi giao dịch này là bất biến, rất giống với Chuỗi khối Ethereum và tạo thành chuỗi ZK-rollup.

Kiến trúc cốt lõi của ZK-rollup được tạo thành từ các thành phần sau:

1. **Các hợp đồng trên chuỗi**: Như đã đề cập, Giao thức ZK-rollup được kiểm soát bởi các hợp đồng thông minh chạy trên Ethereum. Điều này bao gồm hợp đồng chính lưu trữ các khối Rollup, theo dõi các khoản tiền gửi và giám sát các bản cập nhật trạng thái. Một hợp đồng trên chuỗi khác (hợp đồng trình xác minh) xác minh các Bằng chứng không kiến thức do các nhà sản xuất khối gửi. Do đó, Ethereum đóng vai trò là lớp cơ sở hoặc "lớp 1 (l1)" cho ZK-rollup.

2. **Máy ảo ngoài chuỗi (VM)**: Mặc dù Giao thức ZK-rollup tồn tại trên Ethereum, việc thực thi giao dịch và lưu trữ trạng thái diễn ra trên một máy ảo riêng biệt độc lập với [EVM](/developers/docs/evm/). Máy ảo ngoài chuỗi này là môi trường thực thi cho các giao dịch trên ZK-rollup và đóng vai trò là lớp phụ hoặc "lớp 2 (l2)" cho Giao thức ZK-rollup. Các bằng chứng tính hợp lệ được xác minh trên Mạng chính Ethereum đảm bảo tính chính xác của các quá trình chuyển đổi trạng thái trong máy ảo ngoài chuỗi.

Các ZK-rollup là "các giải pháp mở rộng quy mô lai"—các Giao thức ngoài chuỗi hoạt động độc lập nhưng lấy bảo mật từ Ethereum. Cụ thể, mạng lưới Ethereum thực thi tính hợp lệ của các bản cập nhật trạng thái trên ZK-rollup và đảm bảo tính khả dụng của dữ liệu đằng sau mỗi bản cập nhật đối với trạng thái của Rollup. Do đó, các ZK-rollup an toàn hơn đáng kể so với các giải pháp mở rộng quy mô ngoài chuỗi thuần túy, chẳng hạn như [sidechain](/developers/docs/scaling/sidechains/), vốn tự chịu trách nhiệm về các thuộc tính bảo mật của chúng, hoặc [validium](/developers/docs/scaling/validium/), cũng xác minh các giao dịch trên Ethereum bằng các bằng chứng tính hợp lệ, nhưng lưu trữ dữ liệu giao dịch ở nơi khác.

Các ZK-rollup dựa vào Giao thức Ethereum chính cho những điều sau:

### Data availability {#data-availability}

Các ZK-rollup xuất bản dữ liệu trạng thái cho mọi giao dịch được xử lý ngoài chuỗi lên Ethereum. Với dữ liệu này, các cá nhân hoặc doanh nghiệp có thể tái tạo lại trạng thái của Rollup và tự mình xác thực chuỗi. Ethereum cung cấp dữ liệu này cho tất cả những người tham gia mạng lưới dưới dạng `calldata`.

Các ZK-rollup không cần xuất bản nhiều dữ liệu giao dịch trên chuỗi vì các bằng chứng tính hợp lệ đã xác minh tính xác thực của các quá trình chuyển đổi trạng thái. Tuy nhiên, việc lưu trữ dữ liệu trên chuỗi vẫn quan trọng vì nó cho phép xác minh độc lập, không cần cấp phép đối với trạng thái của chuỗi L2, từ đó cho phép bất kỳ ai gửi các lô giao dịch, ngăn chặn các nhà điều hành độc hại kiểm duyệt hoặc đóng băng chuỗi.

Dữ liệu trên chuỗi là bắt buộc để người dùng tương tác với Rollup. Nếu không có quyền truy cập vào dữ liệu trạng thái, người dùng không thể truy vấn số dư Tài khoản của họ hoặc bắt đầu các giao dịch (ví dụ: rút tiền) dựa trên thông tin trạng thái.

### Transaction finality {#transaction-finality}

Ethereum hoạt động như một lớp quyết toán cho các ZK-rollup: Các giao dịch L2 chỉ được chốt nếu hợp đồng L1 chấp nhận bằng chứng tính hợp lệ. Điều này loại bỏ rủi ro các nhà điều hành độc hại làm hỏng chuỗi (ví dụ: đánh cắp tiền của Rollup) vì mọi giao dịch đều phải được phê duyệt trên Mạng chính. Ngoài ra, Ethereum đảm bảo rằng các hoạt động của người dùng không thể bị đảo ngược một khi đã chung cuộc trên L1.

### Censorship resistance {#censorship-resistance}

Hầu hết các ZK-rollup sử dụng một "siêu nút" (nhà điều hành) để thực thi các giao dịch, tạo ra các lô và gửi các khối lên L1. Mặc dù điều này đảm bảo tính hiệu quả, nhưng nó làm tăng rủi ro kiểm duyệt: các nhà điều hành ZK-rollup độc hại có thể kiểm duyệt người dùng bằng cách từ chối đưa các giao dịch của họ vào các lô.

Như một biện pháp bảo mật, các ZK-rollup cho phép người dùng gửi các giao dịch trực tiếp đến hợp đồng Rollup trên Mạng chính nếu họ cho rằng mình đang bị nhà điều hành kiểm duyệt. Điều này cho phép người dùng buộc phải thoát khỏi ZK-rollup sang Ethereum mà không cần phải dựa vào sự cho phép của nhà điều hành.

## Các ZK-rollup hoạt động như thế nào? {#how-do-zk-rollups-work}

### Transactions {#transactions}

Người dùng trong ZK-rollup ký các giao dịch và gửi cho các nhà điều hành L2 để xử lý và đưa vào lô tiếp theo. Trong một số trường hợp, nhà điều hành là một thực thể tập trung, được gọi là bộ sắp xếp, người thực thi các giao dịch, tổng hợp chúng thành các lô và gửi lên L1. Bộ sắp xếp trong hệ thống này là thực thể duy nhất được phép tạo ra các khối L2 và thêm các giao dịch Rollup vào hợp đồng ZK-rollup.

Các ZK-rollup khác có thể luân phiên vai trò nhà điều hành bằng cách sử dụng một tập hợp trình xác thực [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/). Các nhà điều hành tiềm năng gửi tiền vào hợp đồng Rollup, với quy mô của mỗi khoản đặt cọc ảnh hưởng đến cơ hội của người đặt cọc được chọn để tạo ra lô Rollup tiếp theo. Khoản đặt cọc của nhà điều hành có thể bị phạt cắt giảm nếu họ hành động ác ý, điều này khuyến khích họ đăng các khối hợp lệ.

#### Các ZK-rollup xuất bản dữ liệu giao dịch trên Ethereum như thế nào {#how-zk-rollups-publish-transaction-data-on-ethereum}

Như đã giải thích, dữ liệu giao dịch được xuất bản trên Ethereum dưới dạng `calldata`. `calldata` là một vùng dữ liệu trong một hợp đồng thông minh được sử dụng để truyền các đối số cho một hàm và hoạt động tương tự như [bộ nhớ](/developers/docs/smart-contracts/anatomy/#memory). Mặc dù `calldata` không được lưu trữ như một phần của trạng thái Ethereum, nó vẫn tồn tại trên chuỗi như một phần của [nhật ký lịch sử](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) của chuỗi Ethereum. `calldata` không ảnh hưởng đến trạng thái của Ethereum, khiến nó trở thành một cách rẻ tiền để lưu trữ dữ liệu trên chuỗi.

Từ khóa `calldata` thường xác định phương thức hợp đồng thông minh đang được gọi bởi một giao dịch và chứa các đầu vào cho phương thức dưới dạng một chuỗi byte tùy ý. Các ZK-rollup sử dụng `calldata` để xuất bản dữ liệu giao dịch đã nén trên chuỗi; nhà điều hành Rollup chỉ cần thêm một lô mới bằng cách gọi hàm được yêu cầu trong hợp đồng Rollup và truyền dữ liệu đã nén dưới dạng các đối số của hàm. Điều này giúp giảm chi phí cho người dùng vì một phần lớn phí Rollup được dùng để lưu trữ dữ liệu giao dịch trên chuỗi.

### State commitments {#state-commitments}

Trạng thái của ZK-rollup, bao gồm các Tài khoản và số dư L2, được biểu diễn dưới dạng một [cây Merkle](/whitepaper/#merkle-trees). Một Mã băm mật mã học của gốc cây Merkle (gốc Merkle) được lưu trữ trong hợp đồng trên chuỗi, cho phép Giao thức Rollup theo dõi các thay đổi trong trạng thái của ZK-rollup.

Rollup chuyển sang một trạng thái mới sau khi thực thi một tập hợp các giao dịch mới. Nhà điều hành đã khởi tạo quá trình chuyển đổi trạng thái được yêu cầu tính toán một gốc trạng thái mới và gửi cho hợp đồng trên chuỗi. Nếu bằng chứng tính hợp lệ được liên kết với lô được xác thực bởi hợp đồng trình xác minh, gốc Merkle mới sẽ trở thành gốc trạng thái chính tắc của ZK-rollup.

Bên cạnh việc tính toán các gốc trạng thái, nhà điều hành ZK-rollup cũng tạo ra một gốc lô—gốc của một cây Merkle bao gồm tất cả các giao dịch trong một lô. Khi một lô mới được gửi, hợp đồng Rollup lưu trữ gốc lô, cho phép người dùng chứng minh một giao dịch (ví dụ: một yêu cầu rút tiền) đã được đưa vào lô. Người dùng sẽ phải cung cấp chi tiết giao dịch, gốc lô và một [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) hiển thị đường dẫn bao gồm.

### Validity proofs {#validity-proofs}

Gốc trạng thái mới mà nhà điều hành ZK-rollup gửi cho hợp đồng L1 là kết quả của các bản cập nhật đối với trạng thái của Rollup. Giả sử Alice chuyển 10 token cho Bob, nhà điều hành chỉ cần giảm số dư của Alice đi 10 và tăng số dư của Bob lên 10. Sau đó, nhà điều hành băm dữ liệu Tài khoản đã cập nhật, xây dựng lại cây Merkle của Rollup và gửi gốc Merkle mới cho hợp đồng trên chuỗi.

Nhưng hợp đồng Rollup sẽ không tự động chấp nhận cam kết trạng thái được đề xuất cho đến khi nhà điều hành chứng minh gốc Merkle mới là kết quả của các bản cập nhật chính xác đối với trạng thái của Rollup. Nhà điều hành ZK-rollup thực hiện điều này bằng cách tạo ra một bằng chứng tính hợp lệ, một cam kết mật mã học ngắn gọn xác minh tính chính xác của các giao dịch được gom lô.

Các bằng chứng tính hợp lệ cho phép các bên chứng minh tính chính xác của một tuyên bố mà không tiết lộ bản thân tuyên bố đó—do đó, chúng cũng được gọi là Bằng chứng không kiến thức. Các ZK-rollup sử dụng các bằng chứng tính hợp lệ để xác nhận tính chính xác của các quá trình chuyển đổi trạng thái ngoài chuỗi mà không cần phải thực thi lại các giao dịch trên Ethereum. Những bằng chứng này có thể ở dạng [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) hoặc [ZK-STARK](https://eprint.iacr.org/2018/046) (Zero-Knowledge Scalable Transparent Argument of Knowledge).

Cả SNARK và STARK đều giúp chứng thực tính toàn vẹn của tính toán ngoài chuỗi trong các ZK-rollup, mặc dù mỗi loại bằng chứng có các tính năng đặc biệt.

**ZK-SNARKs**

Để Giao thức ZK-SNARK hoạt động, việc tạo Chuỗi tham chiếu chung (CRS) là cần thiết: CRS cung cấp các tham số công khai để chứng minh và xác minh các bằng chứng tính hợp lệ. Bảo mật của hệ thống chứng minh phụ thuộc vào thiết lập CRS; nếu thông tin được sử dụng để tạo các tham số công khai rơi vào tay các tác nhân độc hại, họ có thể tạo ra các bằng chứng tính hợp lệ giả mạo.

Một số ZK-rollup cố gắng giải quyết vấn đề này bằng cách sử dụng một [buổi lễ tính toán đa bên (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), liên quan đến các cá nhân đáng tin cậy, để tạo ra các tham số công khai cho mạch ZK-SNARK. Mỗi bên đóng góp một số tính ngẫu nhiên (được gọi là "chất thải độc hại") để xây dựng CRS, thứ mà họ phải tiêu hủy ngay lập tức.

Các thiết lập tin cậy được sử dụng vì chúng làm tăng tính bảo mật của thiết lập CRS. Miễn là có một người tham gia trung thực tiêu hủy đầu vào của họ, bảo mật của hệ thống ZK-SNARK được đảm bảo. Tuy nhiên, cách tiếp cận này yêu cầu phải tin tưởng những người liên quan sẽ xóa tính ngẫu nhiên được lấy mẫu của họ và không làm suy yếu các đảm bảo bảo mật của hệ thống.

Bỏ qua các giả định tin cậy, ZK-SNARK phổ biến vì kích thước bằng chứng nhỏ và thời gian xác minh không đổi. Vì việc xác minh bằng chứng trên L1 cấu thành chi phí lớn hơn trong việc vận hành một ZK-rollup, các L2 sử dụng ZK-SNARK để tạo ra các bằng chứng có thể được xác minh nhanh chóng và rẻ trên Mạng chính.

**ZK-STARKs**

Giống như ZK-SNARK, ZK-STARK chứng minh tính hợp lệ của tính toán ngoài chuỗi mà không tiết lộ các đầu vào. Tuy nhiên, ZK-STARK được coi là một sự cải tiến so với ZK-SNARK vì khả năng mở rộng và tính minh bạch của chúng.

ZK-STARK 'minh bạch', vì chúng có thể hoạt động mà không cần thiết lập tin cậy của Chuỗi tham chiếu chung (CRS). Thay vào đó, ZK-STARK dựa vào tính ngẫu nhiên có thể xác minh công khai để thiết lập các tham số cho việc tạo và xác minh các bằng chứng.

ZK-STARK cũng cung cấp khả năng mở rộng cao hơn vì thời gian cần thiết để chứng minh và xác minh các bằng chứng tính hợp lệ tăng _gần như tuyến tính_ so với độ phức tạp của tính toán cơ bản. Với ZK-SNARK, thời gian chứng minh và xác minh mở rộng _tuyến tính_ so với quy mô của tính toán cơ bản. Điều này có nghĩa là ZK-STARK yêu cầu ít thời gian hơn ZK-SNARK để chứng minh và xác minh khi liên quan đến các tập dữ liệu lớn, khiến chúng trở nên hữu ích cho các ứng dụng có khối lượng lớn.

ZK-STARK cũng an toàn trước các máy tính lượng tử, trong khi Mật mã học đường cong elliptic (ECC) được sử dụng trong ZK-SNARK được nhiều người tin là dễ bị tấn công bởi điện toán lượng tử. Nhược điểm của ZK-STARK là chúng tạo ra kích thước bằng chứng lớn hơn, tốn kém hơn để xác minh trên Ethereum.

#### Các bằng chứng tính hợp lệ hoạt động như thế nào trong các ZK-rollup? {#validity-proofs-in-zk-rollups}

##### Proof generation
Trước khi chấp nhận các giao dịch, nhà điều hành sẽ thực hiện các kiểm tra thông thường. Điều này bao gồm việc xác nhận rằng:

- Các Tài khoản người gửi và người nhận là một phần của cây trạng thái.
- Người gửi có đủ tiền để xử lý giao dịch.
- Giao dịch là chính xác và khớp với khóa công khai của người gửi trên Rollup.
- nonce của người gửi là chính xác, v.v.

Khi nút ZK-rollup có đủ các giao dịch, nó sẽ tổng hợp chúng thành một lô và biên dịch các đầu vào cho mạch chứng minh để biên dịch thành một bằng chứng ZK ngắn gọn. Điều này bao gồm:

- Một gốc cây Merkle bao gồm tất cả các giao dịch trong lô.
- Các bằng chứng Merkle cho các giao dịch để chứng minh việc được đưa vào lô.
- Các bằng chứng Merkle cho mỗi cặp người gửi-người nhận trong các giao dịch để chứng minh các Tài khoản đó là một phần của cây trạng thái của Rollup.
- Một tập hợp các gốc trạng thái trung gian, bắt nguồn từ việc cập nhật gốc trạng thái sau khi áp dụng các bản cập nhật trạng thái cho mỗi giao dịch (tức là giảm Tài khoản người gửi và tăng Tài khoản người nhận).

Mạch chứng minh tính toán bằng chứng tính hợp lệ bằng cách "lặp" qua từng giao dịch và thực hiện các kiểm tra tương tự mà nhà điều hành đã hoàn thành trước khi xử lý giao dịch. Đầu tiên, nó xác minh Tài khoản của người gửi là một phần của gốc trạng thái hiện tại bằng cách sử dụng bằng chứng Merkle được cung cấp. Sau đó, nó giảm số dư của người gửi, tăng nonce của họ, băm dữ liệu Tài khoản đã cập nhật và kết hợp nó với bằng chứng Merkle để tạo ra một gốc Merkle mới.

Gốc Merkle này phản ánh thay đổi duy nhất trong trạng thái của ZK-rollup: sự thay đổi trong số dư và nonce của người gửi. Điều này là có thể vì bằng chứng Merkle được sử dụng để chứng minh sự tồn tại của Tài khoản được sử dụng để lấy ra gốc trạng thái mới.

Mạch chứng minh thực hiện quy trình tương tự trên Tài khoản của người nhận. Nó kiểm tra xem Tài khoản của người nhận có tồn tại dưới gốc trạng thái trung gian hay không (sử dụng bằng chứng Merkle), tăng số dư của họ, băm lại dữ liệu Tài khoản và kết hợp nó với bằng chứng Merkle để tạo ra một gốc trạng thái mới.

Quá trình lặp lại cho mọi giao dịch; mỗi "vòng lặp" tạo ra một gốc trạng thái mới từ việc cập nhật Tài khoản của người gửi và một gốc mới tiếp theo từ việc cập nhật Tài khoản của người nhận. Như đã giải thích, mỗi bản cập nhật đối với gốc trạng thái đại diện cho một phần của cây trạng thái của Rollup đang thay đổi.

Mạch chứng minh ZK lặp qua toàn bộ lô giao dịch, xác minh chuỗi các bản cập nhật dẫn đến một gốc trạng thái cuối cùng sau khi giao dịch cuối cùng được thực thi. Gốc Merkle cuối cùng được tính toán trở thành gốc trạng thái chính tắc mới nhất của ZK-rollup.

##### Proof verification
Sau khi mạch chứng minh xác minh tính chính xác của các bản cập nhật trạng thái, nhà điều hành L2 gửi bằng chứng tính hợp lệ đã tính toán cho hợp đồng trình xác minh trên L1. Mạch xác minh của hợp đồng xác minh tính hợp lệ của bằng chứng và cũng kiểm tra các đầu vào công khai tạo thành một phần của bằng chứng:

- **Gốc tiền trạng thái**: Gốc trạng thái cũ của ZK-rollup (tức là trước khi các giao dịch được gom lô được thực thi), phản ánh trạng thái hợp lệ được biết đến cuối cùng của chuỗi L2.

- **Gốc hậu trạng thái**: Gốc trạng thái mới của ZK-rollup (tức là sau khi thực thi các giao dịch được gom lô), phản ánh trạng thái mới nhất của chuỗi L2. Gốc hậu trạng thái là gốc cuối cùng bắt nguồn sau khi áp dụng các bản cập nhật trạng thái trong mạch chứng minh.

- **Gốc lô**: Gốc Merkle của lô, bắt nguồn từ việc _merkle hóa_ các giao dịch trong lô và băm gốc của cây.

- **Đầu vào giao dịch**: Dữ liệu được liên kết với các giao dịch được thực thi như một phần của lô đã gửi.

Nếu bằng chứng thỏa mãn mạch (tức là nó hợp lệ), điều đó có nghĩa là tồn tại một chuỗi các giao dịch hợp lệ chuyển đổi Rollup từ trạng thái trước đó (được lấy dấu vân tay mật mã học bởi gốc tiền trạng thái) sang một trạng thái mới (được lấy dấu vân tay mật mã học bởi gốc hậu trạng thái). Nếu gốc tiền trạng thái khớp với gốc được lưu trữ trong hợp đồng Rollup và bằng chứng là hợp lệ, hợp đồng Rollup sẽ lấy gốc hậu trạng thái từ bằng chứng và cập nhật cây trạng thái của nó để phản ánh trạng thái đã thay đổi của Rollup.

### Entries and exits {#entries-and-exits}

Người dùng tham gia ZK-rollup bằng cách gửi token vào hợp đồng của Rollup được triển khai trên chuỗi L1. Giao dịch này được xếp hàng đợi vì chỉ các nhà điều hành mới có thể gửi các giao dịch đến hợp đồng Rollup.

Nếu hàng đợi tiền gửi đang chờ xử lý bắt đầu đầy, nhà điều hành ZK-rollup sẽ lấy các giao dịch tiền gửi và gửi chúng đến hợp đồng Rollup. Khi tiền của người dùng đã ở trong Rollup, họ có thể bắt đầu giao dịch bằng cách gửi các giao dịch cho nhà điều hành để xử lý. Người dùng có thể xác minh số dư trên Rollup bằng cách băm dữ liệu Tài khoản của họ, gửi Mã băm đến hợp đồng Rollup và cung cấp một bằng chứng Merkle để xác minh với gốc trạng thái hiện tại.

Việc rút tiền từ ZK-rollup sang L1 rất đơn giản. Người dùng bắt đầu giao dịch thoát bằng cách chuyển tài sản của họ trên Rollup đến một Tài khoản được chỉ định để đốt. Nếu nhà điều hành đưa giao dịch vào lô tiếp theo, người dùng có thể gửi một yêu cầu rút tiền đến hợp đồng trên chuỗi. Yêu cầu rút tiền này sẽ bao gồm những điều sau:

- Bằng chứng Merkle chứng minh việc đưa giao dịch của người dùng đến Tài khoản đốt vào một lô giao dịch

- Dữ liệu giao dịch

- Gốc lô

- Địa chỉ L1 để nhận tiền đã gửi

Hợp đồng Rollup băm dữ liệu giao dịch, kiểm tra xem gốc lô có tồn tại hay không và sử dụng bằng chứng Merkle để kiểm tra xem mã băm giao dịch có phải là một phần của gốc lô hay không. Sau đó, hợp đồng thực thi giao dịch thoát và chuyển tiền đến Địa chỉ mà người dùng đã chọn trên L1.

## ZK-rollups and EVM compatibility {#zk-rollups-and-evm-compatibility}

Không giống như các bản cuộn optimistic, các ZK-rollup không dễ dàng tương thích với [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Việc chứng minh tính toán EVM đa mục đích trong các mạch khó khăn và tốn nhiều tài nguyên hơn so với việc chứng minh các tính toán đơn giản (như việc chuyển token được mô tả trước đó).

Tuy nhiên, [những tiến bộ trong công nghệ không tri thức](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) đang khơi dậy sự quan tâm mới đối với việc bọc tính toán EVM trong các Bằng chứng không kiến thức. Những nỗ lực này hướng tới việc tạo ra một triển khai EVM không tri thức (zkEVM) có thể xác minh hiệu quả tính chính xác của việc thực thi chương trình. Một zkEVM tái tạo các opcode EVM hiện có để chứng minh/xác minh trong các mạch, cho phép thực thi các hợp đồng thông minh.

Giống như EVM, một zkEVM chuyển đổi giữa các trạng thái sau khi tính toán được thực hiện trên một số đầu vào. Sự khác biệt là zkEVM cũng tạo ra các Bằng chứng không kiến thức để xác minh tính chính xác của mọi bước trong quá trình thực thi của chương trình. Các bằng chứng tính hợp lệ có thể xác minh tính chính xác của các hoạt động chạm đến trạng thái của máy ảo (bộ nhớ, ngăn xếp, lưu trữ) và bản thân tính toán (tức là, hoạt động có gọi đúng các opcode và thực thi chúng một cách chính xác không?).

Sự ra đời của các ZK-rollup tương thích với EVM được kỳ vọng sẽ giúp các nhà phát triển tận dụng khả năng mở rộng và các đảm bảo bảo mật của các Bằng chứng không kiến thức. Quan trọng hơn, khả năng tương thích với cơ sở hạ tầng Ethereum gốc có nghĩa là các nhà phát triển có thể xây dựng các ứng dụng phi tập trung (dapp) thân thiện với ZK bằng cách sử dụng các công cụ và ngôn ngữ quen thuộc (và đã được thử nghiệm thực tế).

## Phí ZK-rollup hoạt động như thế nào? {#how-do-zk-rollup-fees-work}

Số tiền người dùng trả cho các giao dịch trên ZK-rollup phụ thuộc vào phí gas, giống như trên Mạng chính Ethereum. Tuy nhiên, phí gas hoạt động khác nhau trên L2 và bị ảnh hưởng bởi các chi phí sau:

1. **Ghi trạng thái**: Có một chi phí cố định cho việc ghi vào trạng thái của Ethereum (tức là gửi một giao dịch trên Chuỗi khối Ethereum). Các ZK-rollup giảm chi phí này bằng cách gom lô các giao dịch và phân bổ chi phí cố định cho nhiều người dùng.

2. **Xuất bản dữ liệu**: Các ZK-rollup xuất bản dữ liệu trạng thái cho mọi giao dịch lên Ethereum dưới dạng `calldata`. Chi phí `calldata` hiện được điều chỉnh bởi [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), quy định chi phí tương ứng là 16 Gas cho các byte khác không và 4 Gas cho các byte bằng không của `calldata`. Chi phí phải trả cho mỗi giao dịch bị ảnh hưởng bởi lượng `calldata` cần được đăng trên chuỗi cho giao dịch đó.

3. **Phí nhà điều hành L2**: Đây là số tiền được trả cho nhà điều hành Rollup như một khoản bồi thường cho các chi phí tính toán phát sinh trong quá trình xử lý các giao dịch, rất giống với ["phí ưu tiên (tiền boa)" của giao dịch](/developers/docs/gas/#how-are-gas-fees-calculated) trên Mạng chính Ethereum.

4. **Tạo và xác minh bằng chứng**: Các nhà điều hành ZK-rollup phải tạo ra các bằng chứng tính hợp lệ cho các lô giao dịch, điều này tốn nhiều tài nguyên. Việc xác minh các Bằng chứng không kiến thức trên Mạng chính cũng tốn Gas (~ 500.000 Gas).

Ngoài việc gom lô các giao dịch, các ZK-rollup giảm phí cho người dùng bằng cách nén dữ liệu giao dịch. Bạn có thể [xem tổng quan theo thời gian thực](https://l2fees.info/) về chi phí sử dụng các ZK-rollup của Ethereum.

## Các ZK-rollup mở rộng quy mô Ethereum như thế nào? {#scaling-ethereum-with-zk-rollups}

### Transaction data compression {#transaction-data-compression}

Các ZK-rollup mở rộng thông lượng trên lớp cơ sở của Ethereum bằng cách đưa tính toán ra ngoài chuỗi, nhưng sự thúc đẩy thực sự cho việc mở rộng quy mô đến từ việc nén dữ liệu giao dịch. [Kích thước khối](/developers/docs/blocks/#block-size) của Ethereum giới hạn dữ liệu mà mỗi khối có thể chứa và, theo nghĩa rộng hơn, là số lượng giao dịch được xử lý trên mỗi khối. Bằng cách nén dữ liệu liên quan đến giao dịch, các ZK-rollup làm tăng đáng kể số lượng giao dịch được xử lý trên mỗi khối.

Các ZK-rollup có thể nén dữ liệu giao dịch tốt hơn các bản cuộn optimistic vì chúng không phải đăng tất cả dữ liệu cần thiết để xác thực từng giao dịch. Chúng chỉ phải đăng dữ liệu tối thiểu cần thiết để xây dựng lại trạng thái mới nhất của các Tài khoản và số dư trên Rollup.

### Recursive proofs {#recursive-proofs}

Một lợi thế của các Bằng chứng không kiến thức là các bằng chứng có thể xác minh các bằng chứng khác. Ví dụ: một ZK-SNARK duy nhất có thể xác minh các ZK-SNARK khác. Những "bằng chứng của bằng chứng" như vậy được gọi là các bằng chứng đệ quy và làm tăng đáng kể thông lượng trên các ZK-rollup.

Hiện tại, các bằng chứng tính hợp lệ được tạo trên cơ sở từng khối và được gửi đến hợp đồng L1 để xác minh. Tuy nhiên, việc xác minh các bằng chứng khối đơn lẻ làm giới hạn thông lượng mà các ZK-rollup có thể đạt được vì chỉ có một khối có thể được chốt khi nhà điều hành gửi một bằng chứng.

Tuy nhiên, các bằng chứng đệ quy giúp có thể chốt nhiều khối bằng một bằng chứng tính hợp lệ. Điều này là do mạch chứng minh tổng hợp đệ quy nhiều bằng chứng khối cho đến khi một bằng chứng cuối cùng được tạo ra. Nhà điều hành L2 gửi bằng chứng đệ quy này và nếu hợp đồng chấp nhận nó, tất cả các khối có liên quan sẽ được chốt ngay lập tức. Với các bằng chứng đệ quy, số lượng giao dịch ZK-rollup có thể được chốt trên Ethereum theo từng khoảng thời gian sẽ tăng lên.

### Ưu điểm và nhược điểm của ZK-rollup {#zk-rollups-pros-and-cons}

| Ưu điểm                                                                                                                                                                                                   | Nhược điểm                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Các bằng chứng tính hợp lệ đảm bảo tính chính xác của các giao dịch ngoài chuỗi và ngăn chặn các nhà điều hành thực thi các quá trình chuyển đổi trạng thái không hợp lệ.                                                                           | Chi phí liên quan đến việc tính toán và xác minh các bằng chứng tính hợp lệ là đáng kể và có thể làm tăng phí cho người dùng Rollup.                                                                            |
| Cung cấp tính chung cuộc của giao dịch nhanh hơn vì các bản cập nhật trạng thái được phê duyệt ngay khi các bằng chứng tính hợp lệ được xác minh trên L1.                                                                                              | Việc xây dựng các ZK-rollup tương thích với EVM rất khó khăn do sự phức tạp của công nghệ không tri thức.                                                                                                    |
| Dựa vào các cơ chế mật mã học không cần tin cậy để bảo mật, không phải sự trung thực của các tác nhân được khuyến khích như với [các bản cuộn optimistic](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Việc tạo ra các bằng chứng tính hợp lệ yêu cầu phần cứng chuyên dụng, điều này có thể khuyến khích sự kiểm soát tập trung của chuỗi bởi một vài bên.                                                                    |
| Lưu trữ dữ liệu cần thiết để khôi phục trạng thái ngoài chuỗi trên L1, điều này đảm bảo tính bảo mật, khả năng chống kiểm duyệt và sự phi tập trung.                                                                       | Các nhà điều hành tập trung (bộ sắp xếp) có thể ảnh hưởng đến việc sắp xếp các giao dịch.                                                                                                                     |
| Người dùng được hưởng lợi từ hiệu quả sử dụng vốn cao hơn và có thể rút tiền từ L2 mà không bị chậm trễ.                                                                                                           | Các yêu cầu về phần cứng có thể làm giảm số lượng người tham gia có thể buộc chuỗi phải tiến triển, làm tăng rủi ro các nhà điều hành độc hại đóng băng trạng thái của Rollup và kiểm duyệt người dùng. |
| Không phụ thuộc vào các giả định về tính hoạt động và người dùng không phải xác thực chuỗi để bảo vệ tiền của họ.                                                                                              | Một số hệ thống chứng minh (ví dụ: ZK-SNARK) yêu cầu một thiết lập tin cậy mà nếu xử lý sai, có khả năng làm tổn hại đến mô hình bảo mật của ZK-rollup.                                                     |
| Việc nén dữ liệu tốt hơn có thể giúp giảm chi phí xuất bản `calldata` trên Ethereum và giảm thiểu phí Rollup cho người dùng.                                                                             |                                                                                                                                                                                                    |

### Giải thích trực quan về ZK-rollup {#zk-video}

Xem Finematics giải thích về ZK-rollup:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Ai đang làm việc trên zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM cho L2 so với L1</AlertTitle>
<AlertDescription>
Các dự án dưới đây sử dụng công nghệ zkEVM để xây dựng các bản cuộn Lớp 2. Cũng có nghiên cứu về việc sử dụng zkEVM cho [xác minh khối L1](/roadmap/zkevm/), điều này sẽ cho phép các trình xác thực xác minh các khối Ethereum mà không cần thực thi lại các giao dịch.
</AlertDescription>
</AlertContent>
</Alert>

Các dự án đang làm việc trên zkEVM bao gồm:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM là một dự án được tài trợ bởi Tổ chức Ethereum để phát triển một ZK-rollup tương thích với EVM và một cơ chế để tạo ra các bằng chứng tính hợp lệ cho các khối Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _là một ZK Rollup phi tập trung trên Mạng chính Ethereum hoạt động trên Máy ảo Ethereum không tri thức (zkEVM) thực thi các giao dịch Ethereum một cách minh bạch, bao gồm các hợp đồng thông minh với các xác thực Bằng chứng không kiến thức._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll là một công ty định hướng công nghệ đang làm việc để xây dựng một Giải pháp Lớp 2 zkEVM gốc cho Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko là một ZK-rollup phi tập trung, tương đương với Ethereum (một [ZK-EVM Loại 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era là một ZK Rollup tương thích với EVM được xây dựng bởi Matter Labs, được cung cấp sức mạnh bởi zkEVM của riêng nó._

- **[Starknet](https://starkware.co/starknet/)** - _Starknet là một giải pháp mở rộng quy mô lớp 2 tương thích với EVM được xây dựng bởi StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph là một giải pháp mở rộng quy mô Rollup lai sử dụng bằng chứng ZK để giải quyết vấn đề thách thức trạng thái Lớp 2._

- **[Linea](https://linea.build)** - _Linea là một Lớp 2 zkEVM tương đương với Ethereum được xây dựng bởi ConsenSys, hoàn toàn phù hợp với hệ sinh thái Ethereum._

## Đọc thêm về ZK-rollup {#further-reading-on-zk-rollups}

- [Bản cuộn không tri thức là gì?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Bản cuộn không tri thức là gì?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Hướng dẫn thực tế về các bản cuộn Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARK so với SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM là gì?](https://www.alchemy.com/overviews/zkevm)
- [Các loại ZK-EVM: Tương đương Ethereum, tương đương EVM, Loại 1, Loại 4 và các từ thông dụng khó hiểu khác](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Giới thiệu về zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Các L2 ZK-EVM là gì?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Các tài nguyên Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARK hoạt động như thế nào](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Làm thế nào SNARK có thể thực hiện được?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Hướng dẫn: Quyền riêng tư & không tri thức trên Ethereum {#tutorials}

- [Sử dụng không tri thức cho một trạng thái bí mật](/developers/tutorials/secret-state/) _– Cách sử dụng các bằng chứng ZK và các thành phần máy chủ ngoài chuỗi để duy trì trạng thái trò chơi bí mật trên chuỗi._
- [Sử dụng Địa chỉ ẩn danh](/developers/tutorials/stealth-addr/) _– Cách các Địa chỉ ẩn danh ERC-5564 cho phép chuyển ETH ẩn danh bằng cách sử dụng dẫn xuất khóa mật mã học._
- [Sử dụng Ethereum để xác thực Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Cách tích hợp các chữ ký Ví Ethereum với các hệ thống xác thực Web2 dựa trên SAML._