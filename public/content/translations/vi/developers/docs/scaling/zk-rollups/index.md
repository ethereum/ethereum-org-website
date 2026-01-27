---
title: "Tổng hợp không cần kiến thức"
description: "Giới thiệu về tổng hợp không cần thông tin - một giải pháp mở rộng được sử dụng bởi cộng đồng Ethereum."
lang: vi
---

Rollup không kiến thức (rollup ZK) là các [giải pháp thay đổi quy mô](/developers/docs/scaling/) lớp 2 giúp tăng thông lượng trên Mạng chính Ethereum bằng cách chuyển việc tính toán và lưu trữ trạng thái ra ngoài chuỗi. ZK-rollups có thể xử lý hàng ngàn giao dịch thành 1 gói và sau đó chuyển một số dữ liệu tóm tắt tối thiếu lên Mạng chính. Các dữ liệu tóm tắt này xác định những thay đổi cần được thực hiện trên trạng thái Ethereum và một số mật mã chứng minh các thay đổi đó là chính xác.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2](/layer-2).

## Tổng hợp không cần thông tin là gì? {#what-are-zk-rollups}

**Rollup không kiến thức (rollup ZK)** gộp (hoặc 'cuộn lại') các giao dịch thành các lô được thực thi ngoài chuỗi. Tính toán ngoài chuỗi giúp giảm lượng dữ liệu phải đăng lên chuỗi khối. Những nhà vận hành ZK-rollup gửi bản tóm tắt các thay đổi cần thiết để thể hiện cho tất cả các giao dịch trong một đợt thay vì gửi từng giao dịch đơn lẻ. Chúng cũng tạo ra [bằng chứng hợp lệ](/glossary/#validity-proof) để chứng minh tính đúng đắn của các thay đổi.

Trạng thái của rollup ZK được duy trì bởi một hợp đồng thông minh được triển khai trên mạng Ethereum. Để cập nhật trạng thái này, các nút rollup ZK phải gửi bằng chứng hợp lệ để xác minh. Như đã đề cập, bằng chứng hợp lệ là một đảm bảo mật mã học rằng thay đổi trạng thái do rollup đề xuất thực sự là kết quả của việc thực thi một lô giao dịch nhất định. Điều này có nghĩa là các rollup ZK chỉ cần cung cấp bằng chứng hợp lệ để hoàn tất giao dịch trên Ethereum thay vì đăng tất cả dữ liệu giao dịch trên chuỗi như [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/).

Không có độ trễ khi chuyển tiền từ rollup ZK sang Ethereum vì các giao dịch rút tiền được thực thi ngay khi hợp đồng rollup ZK xác minh bằng chứng hợp lệ. Ngược lại, việc rút tiền từ các gộp giao dịch lạc quan phải chịu một độ trễ để cho phép bất kỳ ai thách thức giao dịch rút tiền bằng một [bằng chứng gian lận](/glossary/#fraud-proof).

Các rollup ZK ghi giao dịch vào Ethereum dưới dạng `calldata`. `calldata` là nơi dữ liệu được bao gồm trong các lệnh gọi bên ngoài đến các hàm của hợp đồng thông minh được lưu trữ. Thông tin trong `calldata` được công bố trên chuỗi khối, cho phép bất kỳ ai có thể tự tái tạo lại trạng thái của rollup một cách độc lập. Các rollup ZK sử dụng các kỹ thuật nén để giảm dữ liệu giao dịch—ví dụ, tài khoản được biểu thị bằng một chỉ mục thay vì một địa chỉ, giúp tiết kiệm 28 byte dữ liệu. Việc công bố dữ liệu trên chuỗi là một chi phí đáng kể đối với các rollup, do đó việc nén dữ liệu có thể giảm phí cho người dùng.

## Các rollup ZK tương tác với Ethereum như thế nào? {#zk-rollups-and-ethereum}

Một chuỗi rollup ZK là một giao thức ngoài chuỗi hoạt động trên chuỗi khối Ethereum và được quản lý bởi các hợp đồng thông minh Ethereum trên chuỗi. Các rollup ZK thực thi giao dịch bên ngoài Mạng chính, nhưng định kỳ cam kết các lô giao dịch ngoài chuỗi vào một hợp đồng rollup trên chuỗi. Bản ghi giao dịch này là bất biến, giống như chuỗi khối Ethereum, và tạo thành chuỗi rollup ZK.

Kiến trúc cốt lõi của rollup ZK bao gồm các thành phần sau:

1. **Các hợp đồng trên chuỗi**: Như đã đề cập, giao thức rollup ZK được kiểm soát bởi các hợp đồng thông minh chạy trên Ethereum. Điều này bao gồm hợp đồng chính lưu trữ các khối rollup, theo dõi các khoản tiền gửi và giám sát các bản cập nhật trạng thái. Một hợp đồng trên chuỗi khác (hợp đồng trình xác minh) xác minh các bằng chứng không kiến thức được gửi bởi các nhà sản xuất khối. Do đó, Ethereum đóng vai trò là lớp cơ sở hoặc "lớp 1" cho rollup ZK.

2. **Máy ảo ngoài chuỗi (VM)**: Trong khi giao thức rollup ZK tồn tại trên Ethereum, việc thực thi giao dịch và lưu trữ trạng thái diễn ra trên một máy ảo riêng biệt độc lập với [máy ảo Ethereum](/developers/docs/evm/). VM ngoài chuỗi này là môi trường thực thi cho các giao dịch trên rollup ZK và đóng vai trò là lớp thứ cấp hoặc "lớp 2" cho giao thức rollup ZK. Các bằng chứng hợp lệ được xác minh trên Mạng chính Ethereum đảm bảo tính đúng đắn của các chuyển đổi trạng thái trong VM ngoài chuỗi.

Các rollup ZK là "giải pháp thay đổi quy mô kết hợp"—các giao thức ngoài chuỗi hoạt động độc lập nhưng lấy được sự bảo mật từ Ethereum. Cụ thể, mạng Ethereum thực thi tính hợp lệ của các bản cập nhật trạng thái trên rollup ZK và đảm bảo tính sẵn có của dữ liệu đằng sau mỗi bản cập nhật cho trạng thái của rollup. Do đó, các rollup ZK an toàn hơn đáng kể so với các giải pháp thay đổi quy mô hoàn toàn ngoài chuỗi, chẳng hạn như [chuỗi bên](/developers/docs/scaling/sidechains/), vốn chịu trách nhiệm về các thuộc tính bảo mật của chúng, hoặc [validium](/developers/docs/scaling/validium/), vốn cũng xác minh các giao dịch trên Ethereum bằng các bằng chứng hợp lệ, nhưng lưu trữ dữ liệu giao dịch ở nơi khác.

Các rollup ZK dựa vào giao thức chính của Ethereum cho những điều sau đây:

### Tính khả dụng của dữ liệu {#data-availability}

Các rollup ZK công bố dữ liệu trạng thái cho mọi giao dịch được xử lý ngoài chuỗi tới Ethereum. Với dữ liệu này, các cá nhân hoặc doanh nghiệp có thể tái tạo trạng thái của rollup và tự xác thực chuỗi. Ethereum cung cấp dữ liệu này cho tất cả những người tham gia mạng dưới dạng `calldata`.

Các rollup ZK không cần công bố nhiều dữ liệu giao dịch trên chuỗi vì các bằng chứng hợp lệ đã xác minh tính xác thực của các chuyển đổi trạng thái. Tuy nhiên, việc lưu trữ dữ liệu trên chuỗi vẫn rất quan trọng vì nó cho phép xác minh độc lập, không cần cấp phép trạng thái của chuỗi L2, từ đó cho phép bất kỳ ai gửi các lô giao dịch, ngăn chặn các nhà khai thác độc hại kiểm duyệt hoặc đóng băng chuỗi.

Dữ liệu trên chuỗi là cần thiết để người dùng tương tác với rollup. Nếu không có quyền truy cập vào dữ liệu trạng thái, người dùng không thể truy vấn số dư tài khoản của họ hoặc khởi tạo các giao dịch (ví dụ: rút tiền) dựa vào thông tin trạng thái.

### Tính cuối cùng của giao dịch {#transaction-finality}

Ethereum hoạt động như một lớp thanh toán cho các rollup ZK: các giao dịch L2 chỉ được hoàn tất nếu hợp đồng L1 chấp nhận bằng chứng hợp lệ. Điều này loại bỏ rủi ro các nhà khai thác độc hại làm hỏng chuỗi (ví dụ: đánh cắp tiền của rollup) vì mọi giao dịch phải được phê duyệt trên Mạng chính. Ngoài ra, Ethereum đảm bảo rằng các hoạt động của người dùng không thể bị đảo ngược sau khi được hoàn tất trên L1.

### Chống kiểm duyệt {#censorship-resistance}

Hầu hết các rollup ZK sử dụng một "siêu nút" (nhà khai thác) để thực thi giao dịch, sản xuất các lô và gửi các khối đến L1. Mặc dù điều này đảm bảo hiệu quả, nó làm tăng rủi ro bị kiểm duyệt: các nhà khai thác rollup ZK độc hại có thể kiểm duyệt người dùng bằng cách từ chối đưa giao dịch của họ vào các lô.

Như một biện pháp bảo mật, các rollup ZK cho phép người dùng gửi giao dịch trực tiếp đến hợp đồng rollup trên Mạng chính nếu họ nghĩ rằng mình đang bị nhà khai thác kiểm duyệt. Điều này cho phép người dùng buộc thoát khỏi rollup ZK để về Ethereum mà không cần phải dựa vào sự cho phép của nhà khai thác.

## ZK-rollups hoạt động như thế nào? {#how-do-zk-rollups-work}

### Các giao dịch {#transactions}

Người dùng trong rollup ZK ký giao dịch và gửi cho các nhà khai thác L2 để xử lý và đưa vào lô tiếp theo. Trong một số trường hợp, nhà khai thác là một thực thể tập trung, được gọi là trình sắp xếp thứ tự, người thực thi giao dịch, tổng hợp chúng thành các lô và gửi đến L1. Trình sắp xếp thứ tự trong hệ thống này là thực thể duy nhất được phép sản xuất các khối L2 và thêm các giao dịch rollup vào hợp đồng rollup ZK.

Các rollup ZK khác có thể luân chuyển vai trò nhà khai thác bằng cách sử dụng một tập hợp trình xác thực [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Các nhà khai thác tiềm năng gửi tiền vào hợp đồng rollup, với kích thước của mỗi khoản cổ phần ảnh hưởng đến cơ hội của người đặt cược được chọn để sản xuất lô rollup tiếp theo. Cổ phần của nhà khai thác có thể bị cắt giảm nếu họ hành động độc hại, điều này khuyến khích họ đăng các khối hợp lệ.

#### Cách các rollup ZK công bố dữ liệu giao dịch trên Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Như đã giải thích, dữ liệu giao dịch được công bố trên Ethereum dưới dạng `calldata`. `calldata` là một vùng dữ liệu trong một hợp đồng thông minh được sử dụng để truyền các đối số cho một hàm và hoạt động tương tự như [bộ nhớ](/developers/docs/smart-contracts/anatomy/#memory). Mặc dù `calldata` không được lưu trữ như một phần của trạng thái Ethereum, nó vẫn tồn tại trên chuỗi như một phần của [nhật ký lịch sử](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) của chuỗi Ethereum. `calldata` không ảnh hưởng đến trạng thái của Ethereum, khiến nó trở thành một cách rẻ tiền để lưu trữ dữ liệu trên chuỗi.

Từ khóa `calldata` thường xác định phương thức hợp đồng thông minh đang được gọi bởi một giao dịch và giữ các đầu vào cho phương thức dưới dạng một chuỗi byte tùy ý. Các rollup ZK sử dụng `calldata` để công bố dữ liệu giao dịch đã nén trên chuỗi; nhà khai thác rollup chỉ cần thêm một lô mới bằng cách gọi hàm yêu cầu trong hợp đồng rollup và truyền dữ liệu đã nén dưới dạng các đối số của hàm. Điều này giúp giảm chi phí cho người dùng vì một phần lớn phí rollup được dùng để lưu trữ dữ liệu giao dịch trên chuỗi.

### Cam kết trạng thái {#state-commitments}

Trạng thái của rollup ZK, bao gồm các tài khoản và số dư L2, được biểu diễn dưới dạng một [cây Merkle](/whitepaper/#merkle-trees). Một hàm băm mật mã học của gốc cây Merkle (gốc Merkle) được lưu trữ trong hợp đồng trên chuỗi, cho phép giao thức rollup theo dõi các thay đổi trong trạng thái của rollup ZK.

Rollup chuyển sang một trạng thái mới sau khi thực hiện một tập hợp các giao dịch mới. Nhà khai thác đã khởi tạo quá trình chuyển đổi trạng thái được yêu cầu tính toán một gốc trạng thái mới và gửi đến hợp đồng trên chuỗi. Nếu bằng chứng hợp lệ liên quan đến lô được xác thực bởi hợp đồng trình xác minh, gốc Merkle mới sẽ trở thành gốc trạng thái chính tắc của rollup ZK.

Bên cạnh việc tính toán các gốc trạng thái, nhà khai thác rollup ZK cũng tạo ra một gốc lô—gốc của một cây Merkle bao gồm tất cả các giao dịch trong một lô. Khi một lô mới được gửi, hợp đồng rollup sẽ lưu trữ gốc lô, cho phép người dùng chứng minh một giao dịch (ví dụ: một yêu cầu rút tiền) đã được bao gồm trong lô. Người dùng sẽ phải cung cấp chi tiết giao dịch, gốc lô và một [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) cho thấy đường dẫn bao gồm.

### Bằng chứng hợp lệ {#validity-proofs}

Gốc trạng thái mới mà nhà khai thác rollup ZK gửi đến hợp đồng L1 là kết quả của các bản cập nhật cho trạng thái của rollup. Giả sử Alice gửi 10 token cho Bob, nhà khai thác chỉ cần giảm số dư của Alice đi 10 và tăng số dư của Bob lên 10. Sau đó, nhà khai thác sẽ băm dữ liệu tài khoản đã cập nhật, xây dựng lại cây Merkle của rollup và gửi gốc Merkle mới đến hợp đồng trên chuỗi.

Nhưng hợp đồng rollup sẽ không tự động chấp nhận cam kết trạng thái được đề xuất cho đến khi nhà khai thác chứng minh rằng gốc Merkle mới là kết quả của các bản cập nhật chính xác cho trạng thái của rollup. Nhà khai thác rollup ZK thực hiện điều này bằng cách tạo ra một bằng chứng hợp lệ, một cam kết mật mã học ngắn gọn xác minh tính đúng đắn của các giao dịch đã được gộp thành lô.

Bằng chứng hợp lệ cho phép các bên chứng minh tính đúng đắn của một tuyên bố mà không tiết lộ chính tuyên bố đó—do đó, chúng còn được gọi là bằng chứng không kiến thức. Các rollup ZK sử dụng bằng chứng hợp lệ để xác nhận tính đúng đắn của các chuyển đổi trạng thái ngoài chuỗi mà không cần phải thực thi lại các giao dịch trên Ethereum. Những bằng chứng này có thể ở dạng [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Bằng chứng tri thức ngắn gọn không tương tác không kiến thức) hoặc [ZK-STARK](https://eprint.iacr.org/2018/046) (Bằng chứng tri thức minh bạch có thể mở rộng không kiến thức).

Cả SNARK và STARK đều giúp chứng thực tính toàn vẹn của việc tính toán ngoài chuỗi trong các rollup ZK, mặc dù mỗi loại bằng chứng đều có những đặc điểm riêng biệt.

**ZK-SNARKs**

Để giao thức ZK-SNARK hoạt động, việc tạo ra một Chuỗi tham chiếu chung (CRS) là cần thiết: CRS cung cấp các tham số công khai để chứng minh và xác minh các bằng chứng hợp lệ. Tính bảo mật của hệ thống chứng minh phụ thuộc vào việc thiết lập CRS; nếu thông tin được sử dụng để tạo các tham số công khai rơi vào tay các tác nhân độc hại, chúng có thể tạo ra các bằng chứng hợp lệ giả.

Một số rollup ZK cố gắng giải quyết vấn đề này bằng cách sử dụng một [nghi thức tính toán đa bên (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), liên quan đến các cá nhân đáng tin cậy, để tạo ra các tham số công khai cho mạch ZK-SNARK. Mỗi bên đóng góp một chút ngẫu nhiên (được gọi là "chất thải độc hại") vào việc xây dựng CRS, mà họ phải phá hủy ngay lập tức.

Các thiết lập đáng tin cậy được sử dụng vì chúng làm tăng tính bảo mật của việc thiết lập CRS. Miễn là có một người tham gia trung thực phá hủy đầu vào của họ, tính bảo mật của hệ thống ZK-SNARK được đảm bảo. Tuy nhiên, cách tiếp cận này đòi hỏi phải tin tưởng những người liên quan sẽ xóa đi sự ngẫu nhiên đã lấy mẫu của họ và không làm suy yếu các đảm bảo bảo mật của hệ thống.

Ngoài các giả định về sự tin cậy, ZK-SNARK phổ biến vì kích thước bằng chứng nhỏ và thời gian xác minh không đổi. Vì việc xác minh bằng chứng trên L1 chiếm phần lớn chi phí vận hành một rollup ZK, các L2 sử dụng ZK-SNARK để tạo ra các bằng chứng có thể được xác minh nhanh chóng và rẻ tiền trên Mạng chính.

**ZK-STARKs**

Giống như ZK-SNARK, ZK-STARK chứng minh tính hợp lệ của việc tính toán ngoài chuỗi mà không tiết lộ các đầu vào. Tuy nhiên, ZK-STARK được coi là một cải tiến so với ZK-SNARK vì khả năng mở rộng và tính minh bạch của chúng.

ZK-STARK 'minh bạch', vì chúng có thể hoạt động mà không cần thiết lập đáng tin cậy của một Chuỗi tham chiếu chung (CRS). Thay vào đó, ZK-STARK dựa vào sự ngẫu nhiên có thể xác minh công khai để thiết lập các tham số cho việc tạo và xác minh bằng chứng.

ZK-STARK cũng cung cấp khả năng mở rộng cao hơn vì thời gian cần thiết để chứng minh và xác minh bằng chứng hợp lệ tăng _gần như tuyến tính_ so với độ phức tạp của phép tính toán cơ bản. Với ZK-SNARK, thời gian chứng minh và xác minh thay đổi quy mô _tuyến tính_ so với kích thước của phép tính toán cơ bản. Điều này có nghĩa là ZK-STARK đòi hỏi ít thời gian hơn ZK-SNARK để chứng minh và xác minh khi có liên quan đến các bộ dữ liệu lớn, làm cho chúng hữu ích cho các ứng dụng có khối lượng lớn.

ZK-STARK cũng an toàn trước các máy tính lượng tử, trong khi Mật mã đường cong Elliptic (ECC) được sử dụng trong ZK-SNARK được nhiều người tin là dễ bị tấn công bởi máy tính lượng tử. Nhược điểm của ZK-STARK là chúng tạo ra kích thước bằng chứng lớn hơn, đắt hơn để xác minh trên Ethereum.

#### Bằng chứng hợp lệ hoạt động như thế nào trong các rollup ZK? {#validity-proofs-in-zk-rollups}

##### Tạo bằng chứng

Trước khi chấp nhận giao dịch, nhà khai thác sẽ thực hiện các kiểm tra thông thường. Điều này bao gồm việc xác nhận rằng:

- Các tài khoản người gửi và người nhận là một phần của cây trạng thái.
- Người gửi có đủ tiền để xử lý giao dịch.
- Giao dịch là chính xác và khớp với khóa công khai của người gửi trên rollup.
- Nonce của người gửi là chính xác, v.v.

Khi nút rollup ZK có đủ giao dịch, nó sẽ tổng hợp chúng thành một lô và biên dịch các đầu vào cho mạch chứng minh để biên dịch thành một bằng chứng ZK ngắn gọn. Điều này bao gồm:

- Một gốc cây Merkle bao gồm tất cả các giao dịch trong lô.
- Các bằng chứng Merkle cho các giao dịch để chứng minh việc bao gồm trong lô.
- Các bằng chứng Merkle cho mỗi cặp người gửi-người nhận trong các giao dịch để chứng minh các tài khoản đó là một phần của cây trạng thái của rollup.
- Một tập hợp các gốc trạng thái trung gian, được lấy từ việc cập nhật gốc trạng thái sau khi áp dụng các bản cập nhật trạng thái cho mỗi giao dịch (tức là, giảm tài khoản người gửi và tăng tài khoản người nhận).

Mạch chứng minh tính toán bằng chứng hợp lệ bằng cách "lặp" qua mỗi giao dịch và thực hiện các kiểm tra tương tự mà nhà khai thác đã hoàn thành trước khi xử lý giao dịch. Đầu tiên, nó xác minh tài khoản của người gửi là một phần của gốc trạng thái hiện có bằng cách sử dụng bằng chứng Merkle được cung cấp. Sau đó, nó giảm số dư của người gửi, tăng nonce của họ, băm dữ liệu tài khoản đã cập nhật và kết hợp nó với bằng chứng Merkle để tạo ra một gốc Merkle mới.

Gốc Merkle này phản ánh sự thay đổi duy nhất trong trạng thái của rollup ZK: một sự thay đổi trong số dư và nonce của người gửi. Điều này có thể thực hiện được vì bằng chứng Merkle được sử dụng để chứng minh sự tồn tại của tài khoản được sử dụng để lấy ra gốc trạng thái mới.

Mạch chứng minh thực hiện quy trình tương tự trên tài khoản của người nhận. Nó kiểm tra xem tài khoản của người nhận có tồn tại dưới gốc trạng thái trung gian không (sử dụng bằng chứng Merkle), tăng số dư của họ, băm lại dữ liệu tài khoản và kết hợp nó với bằng chứng Merkle để tạo ra một gốc trạng thái mới.

Quá trình này lặp lại cho mọi giao dịch; mỗi "vòng lặp" tạo ra một gốc trạng thái mới từ việc cập nhật tài khoản của người gửi và một gốc mới tiếp theo từ việc cập nhật tài khoản của người nhận. Như đã giải thích, mỗi bản cập nhật cho gốc trạng thái đại diện cho một phần của cây trạng thái của rollup đang thay đổi.

Mạch chứng minh ZK lặp lại trên toàn bộ lô giao dịch, xác minh chuỗi các bản cập nhật dẫn đến một gốc trạng thái cuối cùng sau khi giao dịch cuối cùng được thực thi. Gốc Merkle cuối cùng được tính toán sẽ trở thành gốc trạng thái chính tắc mới nhất của rollup ZK.

##### Xác minh bằng chứng

Sau khi mạch chứng minh xác minh tính đúng đắn của các bản cập nhật trạng thái, nhà khai thác L2 gửi bằng chứng hợp lệ đã được tính toán đến hợp đồng trình xác minh trên L1. Mạch xác minh của hợp đồng sẽ xác minh tính hợp lệ của bằng chứng và cũng kiểm tra các đầu vào công khai là một phần của bằng chứng:

- **Gốc trạng thái trước**: Gốc trạng thái cũ của rollup ZK (tức là, trước khi các giao dịch được gộp thành lô được thực thi), phản ánh trạng thái hợp lệ cuối cùng được biết của chuỗi L2.

- **Gốc trạng thái sau**: Gốc trạng thái mới của rollup ZK (tức là, sau khi thực thi các giao dịch được gộp thành lô), phản ánh trạng thái mới nhất của chuỗi L2. Gốc trạng thái sau là gốc cuối cùng được lấy ra sau khi áp dụng các bản cập nhật trạng thái trong mạch chứng minh.

- **Gốc lô**: Gốc Merkle của lô, được lấy ra bằng cách _merklize_ các giao dịch trong lô và băm gốc của cây.

- **Đầu vào giao dịch**: Dữ liệu liên quan đến các giao dịch được thực thi như một phần của lô đã gửi.

Nếu bằng chứng thỏa mãn mạch (tức là, nó hợp lệ), điều đó có nghĩa là tồn tại một chuỗi các giao dịch hợp lệ chuyển rollup từ trạng thái trước đó (được đánh dấu bằng mật mã bởi gốc trạng thái trước) sang một trạng thái mới (được đánh dấu bằng mật mã bởi gốc trạng thái sau). Nếu gốc trạng thái trước khớp với gốc được lưu trữ trong hợp đồng rollup, và bằng chứng là hợp lệ, hợp đồng rollup sẽ lấy gốc trạng thái sau từ bằng chứng và cập nhật cây trạng thái của nó để phản ánh trạng thái đã thay đổi của rollup.

### Vào và thoát {#entries-and-exits}

Người dùng tham gia vào rollup ZK bằng cách gửi token vào hợp đồng của rollup được triển khai trên chuỗi L1. Giao dịch này được xếp hàng đợi vì chỉ có các nhà khai thác mới có thể gửi giao dịch đến hợp đồng rollup.

Nếu hàng đợi tiền gửi đang chờ bắt đầu đầy, nhà khai thác rollup ZK sẽ lấy các giao dịch tiền gửi và gửi chúng đến hợp đồng rollup. Khi tiền của người dùng đã ở trong rollup, họ có thể bắt đầu giao dịch bằng cách gửi giao dịch cho nhà khai thác để xử lý. Người dùng có thể xác minh số dư trên rollup bằng cách băm dữ liệu tài khoản của họ, gửi hàm băm đến hợp đồng rollup và cung cấp một bằng chứng Merkle để xác minh so với gốc trạng thái hiện tại.

Rút tiền từ một rollup ZK về L1 rất đơn giản. Người dùng khởi tạo giao dịch rút tiền bằng cách gửi tài sản của họ trên rollup đến một tài khoản được chỉ định để đốt. Nếu nhà khai thác bao gồm giao dịch trong lô tiếp theo, người dùng có thể gửi yêu cầu rút tiền đến hợp đồng trên chuỗi. Yêu cầu rút tiền này sẽ bao gồm:

- Bằng chứng Merkle chứng minh việc bao gồm giao dịch của người dùng vào tài khoản đốt trong một lô giao dịch

- Dữ liệu giao dịch

- Gốc lô

- Địa chỉ L1 để nhận tiền đã gửi

Hợp đồng rollup băm dữ liệu giao dịch, kiểm tra xem gốc lô có tồn tại không và sử dụng bằng chứng Merkle để kiểm tra xem hàm băm giao dịch có phải là một phần của gốc lô không. Sau đó, hợp đồng thực hiện giao dịch rút tiền và gửi tiền đến địa chỉ đã chọn của người dùng trên L1.

## Rollup ZK và khả năng tương thích với EVM {#zk-rollups-and-evm-compatibility}

Không giống như các gộp giao dịch lạc quan, các rollup ZK không dễ dàng tương thích với [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Việc chứng minh các phép tính EVM đa dụng trong các mạch khó khăn và tốn nhiều tài nguyên hơn so với việc chứng minh các phép tính đơn giản (như việc chuyển token được mô tả trước đó).

Tuy nhiên, [những tiến bộ trong công nghệ không kiến thức](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) đang khơi dậy sự quan tâm mới đối với việc gói gọn các phép tính EVM trong các bằng chứng không kiến thức. Những nỗ lực này hướng tới việc tạo ra một triển khai EVM không kiến thức (zkEVM) có thể xác minh hiệu quả tính đúng đắn của việc thực thi chương trình. Một zkEVM tái tạo các mã vận hành EVM hiện có để chứng minh/xác minh trong các mạch, cho phép thực thi các hợp đồng thông minh.

Giống như EVM, một zkEVM chuyển đổi giữa các trạng thái sau khi phép tính được thực hiện trên một số đầu vào. Sự khác biệt là zkEVM cũng tạo ra các bằng chứng không kiến thức để xác minh tính đúng đắn của mỗi bước trong quá trình thực thi chương trình. Bằng chứng hợp lệ có thể xác minh tính đúng đắn của các hoạt động chạm đến trạng thái của VM (bộ nhớ, ngăn xếp, lưu trữ) và chính phép tính (tức là, hoạt động có gọi đúng mã vận hành và thực thi chúng một cách chính xác không?).

Sự ra đời của các rollup ZK tương thích với EVM được kỳ vọng sẽ giúp các nhà phát triển tận dụng các đảm bảo về khả năng mở rộng và bảo mật của các bằng chứng không kiến thức. Quan trọng hơn, khả năng tương thích với cơ sở hạ tầng gốc của Ethereum có nghĩa là các nhà phát triển có thể xây dựng các ứng dụng phi tập trung thân thiện với ZK bằng cách sử dụng các bộ công cụ và ngôn ngữ quen thuộc (và đã được thử nghiệm thực tế).

## Phí rollup ZK hoạt động như thế nào? {#how-do-zk-rollup-fees-work}

Số tiền người dùng phải trả cho các giao dịch trên các rollup ZK phụ thuộc vào phí gas, giống như trên Mạng chính Ethereum. Tuy nhiên, phí gas hoạt động khác nhau trên L2 và bị ảnh hưởng bởi các chi phí sau:

1. **Ghi trạng thái**: Có một chi phí cố định để ghi vào trạng thái của Ethereum (tức là, gửi một giao dịch trên chuỗi khối Ethereum). Các rollup ZK giảm chi phí này bằng cách gộp các giao dịch thành lô và phân bổ chi phí cố định cho nhiều người dùng.

2. **Công bố dữ liệu**: Các rollup ZK công bố dữ liệu trạng thái cho mọi giao dịch tới Ethereum dưới dạng `calldata`. Chi phí `calldata` hiện được điều chỉnh bởi [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), quy định chi phí là 16 gas cho các byte khác không và 4 gas cho các byte bằng không của `calldata`. Chi phí phải trả cho mỗi giao dịch bị ảnh hưởng bởi lượng `calldata` cần được đăng trên chuỗi cho nó.

3. **Phí nhà khai thác L2**: Đây là số tiền trả cho nhà khai thác rollup để bù đắp cho các chi phí tính toán phát sinh trong quá trình xử lý giao dịch, giống như [phí giao dịch "phí ưu tiên (tiền boa)"](/developers/docs/gas/#how-are-gas-fees-calculated) trên Mạng chính Ethereum.

4. **Tạo và xác minh bằng chứng**: Các nhà khai thác rollup ZK phải tạo ra các bằng chứng hợp lệ cho các lô giao dịch, điều này tốn nhiều tài nguyên. Việc xác minh các bằng chứng không kiến thức trên Mạng chính cũng tốn gas (~ 500.000 gas).

Ngoài việc gộp các giao dịch thành lô, các rollup ZK còn giảm phí cho người dùng bằng cách nén dữ liệu giao dịch. Bạn có thể [xem tổng quan theo thời gian thực](https://l2fees.info/) về chi phí sử dụng các rollup ZK của Ethereum.

## Các rollup ZK thay đổi quy mô của Ethereum như thế nào? {#scaling-ethereum-with-zk-rollups}

### Nén dữ liệu giao dịch {#transaction-data-compression}

Các rollup ZK mở rộng thông lượng trên lớp cơ sở của Ethereum bằng cách đưa việc tính toán ra ngoài chuỗi, nhưng sự thúc đẩy thực sự cho việc thay đổi quy mô đến từ việc nén dữ liệu giao dịch. [Kích thước khối](/developers/docs/blocks/#block-size) của Ethereum giới hạn dữ liệu mà mỗi khối có thể chứa và do đó, số lượng giao dịch được xử lý trên mỗi khối. Bằng cách nén dữ liệu liên quan đến giao dịch, các rollup ZK tăng đáng kể số lượng giao dịch được xử lý trên mỗi khối.

Các rollup ZK có thể nén dữ liệu giao dịch tốt hơn các gộp giao dịch lạc quan vì chúng không phải đăng tất cả dữ liệu cần thiết để xác thực mỗi giao dịch. Chúng chỉ phải đăng dữ liệu tối thiểu cần thiết để xây dựng lại trạng thái mới nhất của các tài khoản và số dư trên rollup.

### Bằng chứng đệ quy {#recursive-proofs}

Một lợi thế của các bằng chứng không kiến thức là các bằng chứng có thể xác minh các bằng chứng khác. Ví dụ, một ZK-SNARK duy nhất có thể xác minh các ZK-SNARK khác. Những "bằng chứng của bằng chứng" như vậy được gọi là bằng chứng đệ quy và làm tăng đáng kể thông lượng trên các rollup ZK.

Hiện tại, các bằng chứng hợp lệ được tạo ra trên cơ sở từng khối và được gửi đến hợp đồng L1 để xác minh. Tuy nhiên, việc xác minh các bằng chứng khối đơn lẻ giới hạn thông lượng mà các rollup ZK có thể đạt được vì chỉ có một khối có thể được hoàn tất khi nhà khai thác gửi một bằng chứng.

Tuy nhiên, các bằng chứng đệ quy cho phép hoàn tất nhiều khối với một bằng chứng hợp lệ duy nhất. Điều này là do mạch chứng minh tổng hợp đệ quy nhiều bằng chứng khối cho đến khi một bằng chứng cuối cùng được tạo ra. Nhà khai thác L2 gửi bằng chứng đệ quy này, và nếu hợp đồng chấp nhận nó, tất cả các khối liên quan sẽ được hoàn tất ngay lập tức. Với các bằng chứng đệ quy, số lượng giao dịch rollup ZK có thể được hoàn tất trên Ethereum theo từng khoảng thời gian sẽ tăng lên.

### Ưu và nhược điểm của rollup ZK {#zk-rollups-pros-and-cons}

| Ưu điểm                                                                                                                                                                                                                                      | Nhược điểm                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Các bằng chứng hợp lệ đảm bảo tính đúng đắn của các giao dịch ngoài chuỗi và ngăn các nhà khai thác thực hiện các chuyển đổi trạng thái không hợp lệ.                                                                        | Chi phí liên quan đến việc tính toán và xác minh bằng chứng hợp lệ là đáng kể và có thể làm tăng phí cho người dùng rollup.                                                                              |
| Cung cấp tính cuối cùng của giao dịch nhanh hơn vì các bản cập nhật trạng thái được phê duyệt ngay khi các bằng chứng hợp lệ được xác minh trên L1.                                                                          | Việc xây dựng các rollup ZK tương thích với EVM rất khó khăn do sự phức tạp của công nghệ không kiến thức.                                                                                               |
| Dựa vào các cơ chế mật mã học phi tín nhiệm để bảo mật, không phải sự trung thực của các tác nhân được khuyến khích như với [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Việc tạo ra các bằng chứng hợp lệ đòi hỏi phần cứng chuyên dụng, điều này có thể khuyến khích sự kiểm soát tập trung của chuỗi bởi một vài bên.                                                          |
| Lưu trữ dữ liệu cần thiết để khôi phục trạng thái ngoài chuỗi trên L1, đảm bảo tính bảo mật, chống kiểm duyệt và phi tập trung hóa.                                                                                          | Các nhà khai thác tập trung (trình sắp xếp thứ tự) có thể ảnh hưởng đến thứ tự của các giao dịch.                                                                                     |
| Người dùng được hưởng lợi từ hiệu quả vốn cao hơn và có thể rút tiền từ L2 mà không có sự chậm trễ.                                                                                                                          | Các yêu cầu về phần cứng có thể làm giảm số lượng người tham gia có thể buộc chuỗi phải tiến triển, làm tăng nguy cơ các nhà khai thác độc hại đóng băng trạng thái của rollup và kiểm duyệt người dùng. |
| Không phụ thuộc vào các giả định về tính sống động và người dùng không phải xác thực chuỗi để bảo vệ tiền của họ.                                                                                                            | Một số hệ thống chứng minh (ví dụ: ZK-SNARK) yêu cầu một thiết lập đáng tin cậy, nếu bị xử lý sai, có thể gây nguy hiểm cho mô hình bảo mật của một rollup ZK.        |
| Việc nén dữ liệu tốt hơn có thể giúp giảm chi phí công bố `calldata` trên Ethereum và giảm thiểu phí rollup cho người dùng.                                                                                                  |                                                                                                                                                                                                                          |

### Giải thích trực quan về các rollup ZK {#zk-video}

Xem Finematics giải thích về các rollup ZK:

<YouTube id="7pWxCklcNsU" start="406" />

## Ai đang làm việc trên một zkEVM? {#zkevm-projects}

Các dự án đang làm việc trên zkEVM bao gồm:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM là một dự án được tài trợ bởi Ethereum Foundation để phát triển một rollup ZK tương thích với EVM và một cơ chế để tạo ra các bằng chứng hợp lệ cho các khối Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _là một ZK Rollup phi tập trung trên mạng chính Ethereum đang làm việc trên một Máy ảo Ethereum không kiến thức (zkEVM) thực thi các giao dịch Ethereum một cách minh bạch, bao gồm cả các hợp đồng thông minh với các xác thực bằng chứng không kiến thức._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll là một công ty định hướng công nghệ đang làm việc để xây dựng một Giải pháp Lớp 2 zkEVM gốc cho Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko là một rollup ZK phi tập trung, tương đương với Ethereum (một [ZK-EVM Loại 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era là một ZK Rollup tương thích với EVM được xây dựng bởi Matter Labs, được cung cấp bởi zkEVM của riêng nó._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet là một giải pháp thay đổi quy mô lớp 2 tương thích với EVM được xây dựng bởi StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph là một giải pháp thay đổi quy mô rollup kết hợp sử dụng bằng chứng zk để giải quyết vấn đề thách thức về trạng thái Lớp 2._

- **[Linea](https://linea.build)** - _Linea là một Lớp 2 zkEVM tương đương Ethereum được xây dựng bởi Consensys, hoàn toàn phù hợp với hệ sinh thái Ethereum._

## Đọc thêm về rollup ZK {#further-reading-on-zk-rollups}

- [Rollup không kiến thức là gì?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [Rollup không kiến thức là gì?](https://alchemy.com/blog/zero-knowledge-rollups)
- [Hướng dẫn thực hành về các gộp giao dịch Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs so với SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM là gì?](https://www.alchemy.com/overviews/zkevm)
- [Các loại ZK-EVM: Tương đương Ethereum, tương đương EVM, Loại 1, Loại 4 và các từ thông dụng khó hiểu khác](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Giới thiệu về zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [L2 ZK-EVM là gì?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Tài nguyên Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS dưới góc nhìn kỹ thuật](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Làm thế nào SNARK có thể tồn tại?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
