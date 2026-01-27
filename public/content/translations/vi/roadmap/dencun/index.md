---
title: "Các câu hỏi thường gặp về Cancun-Deneb (Dencun)"
description: "Các câu hỏi thường gặp về bản nâng cấp mạng Cancun-Deneb (Dencun)"
lang: vi
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) là một bản nâng cấp cho mạng Ethereum, kích hoạt **Proto-Danksharding (EIP-4844)**, giới thiệu các **blob** dữ liệu tạm thời để lưu trữ rollup [lớp 2 (L2)](/glossary/#layer-2) rẻ hơn.

Một loại giao dịch mới cho phép các nhà cung cấp rollup lưu trữ dữ liệu hiệu quả hơn về chi phí trong cái được gọi là "blob". Các blob được đảm bảo có sẵn cho mạng trong khoảng 18 ngày (chính xác hơn là 4096 [tham số epoch](/glossary/#epoch)). Sau khoảng thời gian này, các blob sẽ bị cắt bớt khỏi mạng, nhưng các ứng dụng vẫn có thể xác minh tính hợp lệ của dữ liệu bằng các bằng chứng.

Điều này giúp giảm đáng kể chi phí của các rollup, hạn chế sự phát triển của chuỗi và giúp hỗ trợ nhiều người dùng hơn trong khi vẫn duy trì bảo mật và một tập hợp các nhà khai thác nút phi tập trung.

## Khi nào chúng ta có thể mong đợi các rollup phản ánh mức phí thấp hơn nhờ Proto-Danksharding? {#when}

- Bản nâng cấp này đã được kích hoạt tại tham số epoch 269568, vào **ngày 13 tháng 3 năm 2024 lúc 13:55 (UTC)**
- Tất cả các nhà cung cấp rollup lớn, như Arbitrum hay Optimism, đều đã báo hiệu rằng các blob sẽ được hỗ trợ ngay sau khi nâng cấp
- Lịch trình hỗ trợ cho từng rollup có thể khác nhau, vì mỗi nhà cung cấp phải cập nhật hệ thống của họ để tận dụng không gian blob mới

## Làm thế nào để chuyển đổi ETH sau phân nhánh cứng? {#scam-alert}

- **Không cần hành động gì đối với ETH của bạn**: Sau bản nâng cấp Dencun của Ethereum, bạn không cần phải chuyển đổi hay nâng cấp ETH của mình. Số dư tài khoản của bạn sẽ không thay đổi, và ETH bạn đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau phân nhánh cứng.
- **Cẩn thận với lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố gắng lừa đảo bạn.** Bạn không cần phải làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, luôn cập nhật thông tin là cách phòng chống lừa đảo tốt nhất.

[Tìm hiểu thêm về cách nhận biết và tránh lừa đảo](/security/)

## Bản nâng cấp mạng Dencun giải quyết vấn đề gì? {#network-impact}

Dencun chủ yếu giải quyết **khả năng mở rộng** (xử lý nhiều người dùng và nhiều giao dịch hơn) với **mức phí phải chăng**, đồng thời **duy trì tính phi tập trung** của mạng.

Cộng đồng Ethereum đã và đang thực hiện cách tiếp cận "lấy rollup làm trung tâm" cho sự phát triển của mình, trong đó đặt các rollup lớp 2 làm phương tiện chính để hỗ trợ an toàn cho nhiều người dùng hơn.

Các mạng rollup xử lý việc _xử lý_ (hay "thực thi") các giao dịch tách biệt khỏi Mạng chính và sau đó công bố bằng chứng mật mã và/hoặc dữ liệu giao dịch nén của kết quả trở lại Mạng chính để lưu trữ hồ sơ. Việc lưu trữ các bằng chứng này tốn một khoản chi phí (dưới dạng [gas](/glossary/#gas)), mà trước Proto-Danksharding, tất cả các nhà khai thác nút mạng phải lưu trữ vĩnh viễn, khiến nó trở thành một nhiệm vụ tốn kém.

Sự ra đời của Proto-Danksharding trong bản nâng cấp Dencun bổ sung thêm khả năng lưu trữ dữ liệu rẻ hơn cho các bằng chứng này bằng cách chỉ yêu cầu các nhà khai thác nút lưu trữ dữ liệu này trong khoảng 18 ngày, sau đó dữ liệu có thể được xóa một cách an toàn để ngăn chặn việc mở rộng các yêu cầu về phần cứng.  Bởi vì các rollup thường có thời gian rút tiền là 7 ngày, mô hình bảo mật của chúng không thay đổi miễn là các blob có sẵn trên L1 trong khoảng thời gian này. Cửa sổ cắt bớt 18 ngày cung cấp một vùng đệm đáng kể cho khoảng thời gian này.

[Tìm hiểu thêm về việc thay đổi quy mô của Ethereum](/roadmap/scaling/)

## Dữ liệu blob cũ được truy cập như thế nào? {#historical-access}

Trong khi các nút Ethereum thông thường sẽ luôn giữ _trạng thái hiện tại_ của mạng, dữ liệu blob lịch sử có thể bị loại bỏ sau khoảng 18 ngày kể từ khi được giới thiệu. Trước khi loại bỏ dữ liệu này, Ethereum đảm bảo rằng nó đã được cung cấp cho tất cả những người tham gia mạng, cho phép thời gian để:

- Các bên quan tâm tải xuống và lưu trữ dữ liệu.
- Hoàn thành tất cả các giai đoạn thử thách của rollup.
- Hoàn tất các giao dịch rollup.

Dữ liệu blob _lịch sử_ có thể được mong muốn vì nhiều lý do và có thể được lưu trữ và truy cập bằng một số giao thức phi tập trung:

- **Các giao thức lập chỉ mục của bên thứ ba**, chẳng hạn như The Graph, lưu trữ dữ liệu này thông qua một mạng phi tập trung gồm các nhà khai thác nút được khuyến khích bởi các cơ chế kinh tế tiền mã hóa.
- **BitTorrent** là một giao thức phi tập trung nơi các tình nguyện viên có thể lưu giữ và phân phối dữ liệu này cho người khác.
- **[Mạng cổng Ethereum](/developers/docs/networking-layer/portal-network/)** nhằm mục đích cung cấp quyền truy cập vào tất cả dữ liệu Ethereum thông qua một mạng phi tập trung gồm các nhà khai thác nút bằng cách phân phối dữ liệu giữa những người tham gia tương tự như BitTorrent.
- **Người dùng cá nhân** luôn có thể tự do lưu trữ các bản sao của bất kỳ dữ liệu nào họ muốn để tham khảo lịch sử.
- **Các nhà cung cấp rollup** được khuyến khích lưu trữ dữ liệu này để nâng cao trải nghiệm người dùng của rollup của họ.
- **Các trình duyệt khối** thường chạy các nút lưu trữ để lập chỉ mục và lưu trữ tất cả thông tin này để dễ dàng tham khảo lịch sử, có thể truy cập được cho người dùng thông qua giao diện web.

Điều quan trọng cần lưu ý là việc khôi phục trạng thái lịch sử hoạt động trên **mô hình tin cậy 1-trong-N**. Điều này có nghĩa là bạn chỉ cần dữ liệu từ _một nguồn đáng tin cậy duy nhất_ để xác minh tính đúng đắn của nó bằng cách sử dụng trạng thái hiện tại của mạng.

## Bản nâng cấp này đóng góp như thế nào vào lộ trình Ethereum rộng lớn hơn? {#roadmap-impact}

Proto-Danksharding tạo tiền đề cho việc triển khai đầy đủ [Danksharding](/roadmap/danksharding/). Danksharding được thiết kế để phân phối việc lưu trữ dữ liệu rollup cho các nhà khai thác nút, do đó mỗi nhà khai thác chỉ cần xử lý một phần nhỏ trong tổng số dữ liệu. Sự phân phối này sẽ làm tăng số lượng blob dữ liệu trên mỗi khối, điều này rất cần thiết để thay đổi quy mô Ethereum nhằm xử lý nhiều người dùng và giao dịch hơn.

Khả năng mở rộng này rất quan trọng để [hỗ trợ hàng tỷ người dùng trên Ethereum](/roadmap/scaling/) với mức phí phải chăng và các ứng dụng tiên tiến hơn, trong khi vẫn duy trì một mạng phi tập trung. Nếu không có những thay đổi này, các yêu cầu về phần cứng cho các nhà khai thác nút sẽ leo thang, dẫn đến nhu cầu về thiết bị ngày càng đắt đỏ. Điều này có thể loại bỏ các nhà khai thác nhỏ hơn do giá cao, dẫn đến sự tập trung quyền kiểm soát mạng vào một vài nhà khai thác lớn, điều này đi ngược lại nguyên tắc về tính phi tập trung.

## Bản nâng cấp này có ảnh hưởng đến tất cả các máy khách đồng thuận và máy khách trình xác thực của Ethereum không? {#client-impact}

Có, Proto-Danksharding (EIP-4844) yêu cầu cập nhật cho cả máy khách thực thi và máy khách đồng thuận. Tất cả các máy khách Ethereum chính đã phát hành các phiên bản hỗ trợ bản nâng cấp. Để duy trì đồng bộ hóa với mạng Ethereum sau nâng cấp, các nhà khai thác nút phải đảm bảo họ đang chạy phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách rất nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết chi tiết hiện tại nhất. [Xem chi tiết về các bản phát hành máy khách được hỗ trợ](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Các máy khách đồng thuận xử lý phần mềm _Trình xác thực_, tất cả đều đã được cập nhật để phù hợp với bản nâng cấp.

## Cancun-Deneb (Dencun) ảnh hưởng đến các mạng thử nghiệm của Ethereum như thế nào? {#testnet-impact}

- Devnets, Sepolia và Holesky đều đã trải qua bản nâng cấp Dencun và có Proto-Danksharding hoạt động đầy đủ
- Các nhà phát triển rollup có thể sử dụng các mạng này để thử nghiệm EIP-4844
- Hầu hết người dùng sẽ hoàn toàn không bị ảnh hưởng bởi thay đổi này đối với mỗi mạng thử nghiệm

## Liệu tất cả các giao dịch trên L2 bây giờ sẽ sử dụng không gian blob tạm thời, hay bạn sẽ có thể lựa chọn? {#calldata-vs-blobs}

Các giao dịch rollup trên Lớp 2 (L2) của Ethereum có tùy chọn sử dụng hai loại lưu trữ dữ liệu: không gian blob tạm thời hoặc calldata hợp đồng thông minh vĩnh viễn. Không gian blob là một lựa chọn kinh tế, cung cấp lưu trữ tạm thời với chi phí thấp hơn. Nó đảm bảo tính sẵn có của dữ liệu cho tất cả các giai đoạn thử thách cần thiết. Mặt khác, calldata hợp đồng thông minh cung cấp lưu trữ vĩnh viễn nhưng đắt hơn.

Quyết định giữa việc sử dụng không gian blob hoặc calldata chủ yếu được đưa ra bởi các nhà cung cấp rollup. Họ đưa ra quyết định này dựa trên nhu cầu hiện tại về không gian blob. Nếu không gian blob có nhu cầu cao, các rollup có thể chọn calldata để đảm bảo dữ liệu được đăng một cách kịp thời.

Mặc dù về mặt lý thuyết, người dùng có thể chọn loại lưu trữ ưa thích của mình, các nhà cung cấp rollup thường quản lý lựa chọn này. Việc cung cấp tùy chọn này cho người dùng sẽ làm tăng thêm độ phức tạp, đặc biệt là trong việc gộp các giao dịch một cách hiệu quả về chi phí. Để biết chi tiết cụ thể về lựa chọn này, người dùng nên tham khảo tài liệu do các nhà cung cấp rollup cá nhân cung cấp.

## EIP-4844 có làm giảm phí gas L1 không? {#l1-fee-impact}

Không đáng kể. Một thị trường gas mới được giới thiệu dành riêng cho không gian blob, để các nhà cung cấp rollup sử dụng. _Mặc dù phí trên L1 có thể được giảm bằng cách chuyển dữ liệu rollup sang các blob, bản nâng cấp này chủ yếu tập trung vào việc giảm phí L2. Việc giảm phí trên L1 (Mạng chính) có thể xảy ra như một hiệu ứng thứ cấp ở mức độ thấp hơn._

- Việc giảm gas L1 sẽ tỷ lệ thuận với việc áp dụng/sử dụng dữ liệu blob của các nhà cung cấp rollup
- Phí gas L1 có khả năng vẫn cạnh tranh từ các hoạt động không liên quan đến rollup
- Các rollup áp dụng việc sử dụng không gian blob sẽ yêu cầu ít gas L1 hơn, giúp đẩy phí gas L1 xuống trong ngắn hạn
- Không gian blob vẫn còn hạn chế, vì vậy nếu các blob trong một khối bị bão hòa/đầy, thì các rollup có thể được yêu cầu đăng dữ liệu của họ dưới dạng dữ liệu vĩnh viễn trong thời gian chờ đợi, điều này sẽ đẩy giá gas L1 và L2 lên

## Điều này có làm giảm phí trên các chuỗi khối lớp 1 EVM khác không? {#alt-l1-fee-impact}

Không. Các lợi ích của Proto-Danksharding chỉ dành riêng cho các rollup lớp 2 của Ethereum lưu trữ bằng chứng của họ trên lớp 1 (Mạng chính).

Việc chỉ tương thích với Máy ảo Ethereum (EVM) không có nghĩa là một mạng sẽ nhận được bất kỳ lợi ích nào từ bản nâng cấp này. Các mạng hoạt động độc lập với Ethereum (dù có tương thích với EVM hay không) không lưu trữ dữ liệu của họ trên Ethereum và sẽ không nhận được bất kỳ lợi ích nào từ bản nâng cấp này.

[Tìm hiểu thêm về các rollup lớp 2](/layer-2/)

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Mở khóa khả năng thay đổi quy mô của Ethereum, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 với Domothy — Bankless_

## Đọc thêm {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Giao dịch blob phân mảnh (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Thông báo về Mạng chính Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog của Ethereum Foundation_
- [Cẩm nang người đi nhờ xe đến Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Các câu hỏi thường gặp về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Giải thích chuyên sâu về EIP-4844: Cốt lõi của Bản nâng cấp Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Cập nhật AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
