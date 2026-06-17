---
title: Cancun-Deneb (Dencun)
metaTitle: Câu hỏi thường gặp về Cancun-Deneb (Dencun)
description: Các câu hỏi thường gặp về bản nâng cấp mạng lưới Cancun-Deneb (Dencun)
lang: vi
---

Cancun-Deneb (Dencun) là một bản nâng cấp cho mạng lưới Ethereum, kích hoạt **Proto-Danksharding (EIP-4844)**, giới thiệu các **khối dữ liệu** (blob) tạm thời để lưu trữ bản cuộn [lớp 2 (l2)](/glossary/#layer-2) với chi phí rẻ hơn.

Một loại giao dịch mới cho phép các nhà cung cấp bản cuộn lưu trữ dữ liệu hiệu quả hơn về mặt chi phí trong cái được gọi là "khối dữ liệu". Các khối dữ liệu được đảm bảo sẽ có sẵn trên mạng lưới trong khoảng 18 ngày (chính xác hơn là 4096 [Kỷ nguyên](/glossary/#epoch)). Sau khoảng thời gian này, các khối dữ liệu sẽ bị cắt tỉa khỏi mạng lưới, nhưng các ứng dụng vẫn có thể xác minh tính hợp lệ của dữ liệu bằng cách sử dụng các bằng chứng. 

Điều này làm giảm đáng kể chi phí của các bản cuộn, hạn chế sự gia tăng của Chuỗi và giúp hỗ trợ nhiều người dùng hơn trong khi vẫn duy trì tính bảo mật và một tập hợp phi tập trung các nhà điều hành nút.

## Khi nào chúng ta có thể kỳ vọng các bản cuộn sẽ phản ánh mức phí thấp hơn nhờ Proto-Danksharding? {#when}

- Bản nâng cấp này đã được kích hoạt tại Kỷ nguyên 269568, vào lúc **13:55 (UTC) ngày 13 tháng 3 năm 2024**
- Tất cả các nhà cung cấp bản cuộn lớn, chẳng hạn như Arbitrum hoặc Optimism, đã báo hiệu rằng các khối dữ liệu sẽ được hỗ trợ ngay sau bản nâng cấp
- Dòng thời gian hỗ trợ cho từng bản cuộn riêng lẻ có thể khác nhau, vì mỗi nhà cung cấp phải cập nhật hệ thống của họ để tận dụng không gian khối dữ liệu mới

## Làm thế nào để chuyển đổi ETH sau Phân nhánh cứng? {#scam-alert}

- **Không cần thực hiện hành động nào đối với ETH của bạn**: Sau bản nâng cấp Dencun của Ethereum, bạn không cần phải chuyển đổi hoặc nâng cấp ETH của mình. Số dư Tài khoản của bạn sẽ giữ nguyên và số ETH bạn hiện đang nắm giữ vẫn có thể truy cập được ở dạng hiện tại sau Phân nhánh cứng.
- **Cảnh giác với lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố lừa đảo bạn.** Bạn không cần phải làm bất cứ điều gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, luôn cập nhật thông tin là cách phòng vệ tốt nhất chống lại các trò lừa đảo.

[Tìm hiểu thêm về cách nhận biết và phòng tránh lừa đảo](/security/)

## Bản nâng cấp mạng lưới Dencun giải quyết vấn đề gì? {#network-impact}

Dencun chủ yếu giải quyết vấn đề **khả năng mở rộng** (xử lý nhiều người dùng và nhiều giao dịch hơn) với **mức phí phải chăng**, trong khi vẫn **duy trì sự phi tập trung** của mạng lưới.

Cộng đồng Ethereum đã và đang thực hiện cách tiếp cận "lấy bản cuộn làm trung tâm" cho sự phát triển của mình, đặt các bản cuộn lớp 2 (l2) làm phương tiện chính để hỗ trợ nhiều người dùng hơn một cách an toàn.

Các mạng lưới bản cuộn xử lý (hoặc "thực thi") các giao dịch tách biệt với Mạng chính và sau đó công bố một bằng chứng mật mã và/hoặc dữ liệu giao dịch đã nén của các kết quả trở lại Mạng chính để lưu trữ hồ sơ. Việc lưu trữ các bằng chứng này đi kèm với một khoản chi phí (dưới dạng [Gas](/glossary/#gas)), mà trước khi có Proto-Danksharding, phải được lưu trữ vĩnh viễn bởi tất cả các nhà điều hành nút mạng lưới, khiến nó trở thành một tác vụ đắt đỏ.

Việc giới thiệu Proto-Danksharding trong bản nâng cấp Dencun bổ sung khả năng lưu trữ dữ liệu rẻ hơn cho các bằng chứng này bằng cách chỉ yêu cầu các nhà điều hành nút lưu trữ dữ liệu này trong khoảng 18 ngày, sau đó dữ liệu có thể được xóa một cách an toàn để ngăn chặn việc mở rộng các yêu cầu về phần cứng. Bởi vì các bản cuộn thường có thời gian rút tiền là 7 ngày, mô hình bảo mật của chúng không thay đổi miễn là các khối dữ liệu có sẵn trên l1 trong khoảng thời gian này. Khoảng thời gian cắt tỉa 18 ngày cung cấp một bộ đệm đáng kể cho giai đoạn này.

[Tìm hiểu thêm về việc mở rộng quy mô Ethereum](/roadmap/scaling/)

## Dữ liệu khối dữ liệu cũ được truy cập như thế nào? {#historical-access}

Mặc dù các nút Ethereum thông thường sẽ luôn giữ _trạng thái hiện tại_ của mạng lưới, dữ liệu khối dữ liệu lịch sử có thể bị loại bỏ khoảng 18 ngày sau khi được giới thiệu. Trước khi loại bỏ dữ liệu này, Ethereum đảm bảo rằng nó đã được cung cấp cho tất cả những người tham gia mạng lưới, cho phép có thời gian để:

- Các bên quan tâm tải xuống và lưu trữ dữ liệu.
- Hoàn thành tất cả các giai đoạn thử thách của bản cuộn.
- Hoàn tất các giao dịch bản cuộn.

Dữ liệu khối dữ liệu _lịch sử_ có thể được mong muốn vì nhiều lý do khác nhau và có thể được lưu trữ cũng như truy cập bằng cách sử dụng một số Giao thức phi tập trung:

- **Các Giao thức lập chỉ số của bên thứ ba**, chẳng hạn như The Graph, lưu trữ dữ liệu này thông qua một mạng lưới phi tập trung gồm các nhà điều hành nút được khuyến khích bởi các cơ chế kinh tế tiền mã hóa.
- **BitTorrent** là một Giao thức phi tập trung nơi các tình nguyện viên có thể lưu giữ và phân phối dữ liệu này cho những người khác.
- **[Portal Network của Ethereum](/developers/docs/networking-layer/portal-network/)** nhằm mục đích cung cấp quyền truy cập vào tất cả dữ liệu Ethereum thông qua một mạng lưới phi tập trung gồm các nhà điều hành nút bằng cách phân phối dữ liệu giữa những người tham gia tương tự như BitTorrent.
- **Người dùng cá nhân** luôn có quyền tự do lưu trữ các bản sao dữ liệu của riêng họ mà họ muốn để tham khảo lịch sử.
- **Các nhà cung cấp bản cuộn** được khuyến khích lưu trữ dữ liệu này để nâng cao trải nghiệm người dùng cho bản cuộn của họ.
- **Các trình khám phá khối** thường chạy các nút lưu trữ để lập chỉ số và lưu trữ tất cả thông tin này nhằm dễ dàng tham khảo lịch sử, người dùng có thể truy cập thông qua giao diện web.

Điều quan trọng cần lưu ý là việc khôi phục trạng thái lịch sử hoạt động dựa trên **mô hình tin cậy 1-trong-N**. Điều này có nghĩa là bạn chỉ cần dữ liệu từ _một nguồn đáng tin cậy duy nhất_ để xác minh tính chính xác của nó bằng cách sử dụng trạng thái hiện tại của mạng lưới.

## Bản nâng cấp này đóng góp như thế nào vào lộ trình Ethereum rộng lớn hơn? {#roadmap-impact}

Proto-Danksharding tạo tiền đề cho việc triển khai đầy đủ [danksharding](/roadmap/danksharding/). Danksharding được thiết kế để phân phối việc lưu trữ dữ liệu bản cuộn trên các nhà điều hành nút, do đó mỗi nhà điều hành chỉ cần xử lý một phần nhỏ trong tổng số dữ liệu. Sự phân phối này sẽ làm tăng số lượng khối dữ liệu trên mỗi khối, điều này rất cần thiết để mở rộng quy mô Ethereum nhằm xử lý nhiều người dùng và giao dịch hơn.

Khả năng mở rộng này rất quan trọng để [hỗ trợ hàng tỷ người dùng trên Ethereum](/roadmap/scaling/) với mức phí phải chăng và các ứng dụng tiên tiến hơn, trong khi vẫn duy trì một mạng lưới phi tập trung. Nếu không có những thay đổi này, nhu cầu phần cứng đối với các nhà điều hành nút sẽ leo thang, dẫn đến nhu cầu về thiết bị ngày càng đắt đỏ. Điều này có thể loại bỏ các nhà điều hành nhỏ hơn do chi phí, dẫn đến sự tập trung quyền kiểm soát mạng lưới vào một vài nhà điều hành lớn, đi ngược lại nguyên tắc của sự phi tập trung.

## Bản nâng cấp này có ảnh hưởng đến tất cả các máy khách đồng thuận và trình xác thực Ethereum không? {#client-impact}

Có, Proto-Danksharding (EIP-4844) yêu cầu cập nhật cho cả máy khách thực thi và máy khách đồng thuận. Tất cả các máy khách Ethereum chính đều đã phát hành các phiên bản hỗ trợ bản nâng cấp. Để duy trì sự đồng bộ hóa với mạng lưới Ethereum sau khi nâng cấp, các nhà điều hành nút phải đảm bảo họ đang chạy một phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách có tính nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết thông tin chi tiết hiện tại nhất. [Xem chi tiết về các bản phát hành máy khách được hỗ trợ](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Các máy khách đồng thuận xử lý phần mềm _trình xác thực_, tất cả đều đã được cập nhật để phù hợp với bản nâng cấp.

## Cancun-Deneb (Dencun) ảnh hưởng như thế nào đến các mạng thử nghiệm Ethereum? {#testnet-impact}

- Các mạng phát triển (devnet), Sepolia và Holesky đều đã trải qua bản nâng cấp Dencun và có Proto-Danksharding hoạt động đầy đủ
- Các nhà phát triển bản cuộn có thể sử dụng các mạng lưới này để thử nghiệm EIP-4844
- Hầu hết người dùng sẽ hoàn toàn không bị ảnh hưởng bởi thay đổi này đối với mỗi mạng thử nghiệm

## Liệu tất cả các giao dịch trên l2 hiện nay sẽ sử dụng không gian khối dữ liệu tạm thời hay bạn sẽ có thể lựa chọn? {#calldata-vs-blobs}

Các giao dịch bản cuộn trên lớp 2 (l2) của Ethereum có tùy chọn sử dụng hai loại lưu trữ dữ liệu: không gian khối dữ liệu tạm thời hoặc dữ liệu lệnh gọi hợp đồng thông minh vĩnh viễn. Không gian khối dữ liệu là một lựa chọn tiết kiệm, cung cấp khả năng lưu trữ tạm thời với chi phí thấp hơn. Nó đảm bảo tính khả dụng của dữ liệu cho tất cả các giai đoạn thử thách cần thiết. Mặt khác, dữ liệu lệnh gọi hợp đồng thông minh cung cấp khả năng lưu trữ vĩnh viễn nhưng đắt đỏ hơn.

Quyết định giữa việc sử dụng không gian khối dữ liệu hay dữ liệu lệnh gọi chủ yếu do các nhà cung cấp bản cuộn đưa ra. Họ dựa trên quyết định này vào nhu cầu hiện tại đối với không gian khối dữ liệu. Nếu không gian khối dữ liệu có nhu cầu cao, các bản cuộn có thể chọn dữ liệu lệnh gọi để đảm bảo dữ liệu được đăng tải kịp thời.

Mặc dù về mặt lý thuyết, người dùng có thể chọn loại lưu trữ ưa thích của họ, nhưng các nhà cung cấp bản cuộn thường quản lý lựa chọn này. Việc cung cấp tùy chọn này cho người dùng sẽ làm tăng thêm sự phức tạp, đặc biệt là trong các giao dịch gộp hiệu quả về chi phí. Để biết chi tiết cụ thể về lựa chọn này, người dùng nên tham khảo tài liệu do từng nhà cung cấp bản cuộn cung cấp.

## EIP-4844 có làm giảm Gas l1 không? {#l1-fee-impact}

Không đáng kể. Một thị trường Gas mới được giới thiệu dành riêng cho không gian khối dữ liệu, để các nhà cung cấp bản cuộn sử dụng. _Mặc dù phí trên l1 có thể giảm bằng cách chuyển dữ liệu bản cuộn sang các khối dữ liệu, bản nâng cấp này chủ yếu tập trung vào việc giảm phí l2. Việc giảm phí trên l1 (Mạng chính) có thể xảy ra như một hiệu ứng thứ cấp ở mức độ thấp hơn._

- Việc giảm Gas l1 sẽ tỷ lệ thuận với việc áp dụng/sử dụng dữ liệu khối dữ liệu của các nhà cung cấp bản cuộn
- Gas l1 có khả năng vẫn cạnh tranh từ các hoạt động không liên quan đến bản cuộn
- Các bản cuộn áp dụng việc sử dụng không gian khối dữ liệu sẽ yêu cầu ít Gas l1 hơn, giúp đẩy phí Gas l1 xuống trong thời gian tới
- Không gian khối dữ liệu vẫn còn hạn chế, vì vậy nếu các khối dữ liệu trong một khối bị bão hòa/đầy, thì các bản cuộn có thể được yêu cầu đăng dữ liệu của họ dưới dạng dữ liệu vĩnh viễn trong thời gian chờ đợi, điều này sẽ đẩy giá Gas l1 và l2 lên cao

## Điều này có làm giảm phí trên các blockchain lớp 1 EVM khác không? {#alt-l1-fee-impact}

Không. Những lợi ích của Proto-Danksharding dành riêng cho các bản cuộn lớp 2 (l2) của Ethereum lưu trữ bằng chứng của chúng trên lớp 1 (Mạng chính).

Việc chỉ tương thích với Máy ảo Ethereum (EVM) không có nghĩa là một mạng lưới sẽ thấy bất kỳ lợi ích nào từ bản nâng cấp này. Các mạng lưới hoạt động độc lập với Ethereum (cho dù có tương thích với EVM hay không) không lưu trữ dữ liệu của chúng trên Ethereum và sẽ không thấy bất kỳ lợi ích nào từ bản nâng cấp này.

[Tìm hiểu thêm về các bản cuộn lớp 2 (l2)](/layer-2/)

## Bạn thích học qua hình ảnh hơn? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Mở khóa khả năng mở rộng của Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 với Domothy — Bankless_

## Đọc thêm {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Giao dịch khối dữ liệu phân mảnh (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Thông báo Mạng chính Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog của Ethereum Foundation_
- [Cẩm nang quá giang vào Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Câu hỏi thường gặp về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Giải thích chuyên sâu về EIP-4844: Cốt lõi của bản nâng cấp Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Cập nhật AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_