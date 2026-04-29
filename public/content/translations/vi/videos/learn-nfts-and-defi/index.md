---
title: "NFT là gì và chúng có thể được sử dụng như thế nào trong tài chính phi tập trung?"
description: "Hiểu cơ chế của các token không thể thay thế (NFT) trên Ethereum và cách chúng được sử dụng trong các ứng dụng tài chính phi tập trung (DeFi)."
lang: vi
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "cho vay"
format: explainer
author: Finematics
breadcrumb: "NFT và DeFi"
---

Một video giải thích của **Finematics** bao gồm cơ chế của các token không thể thay thế (NFT) trên Ethereum và cách chúng giao thoa với tài chính phi tập trung (DeFi), bao gồm các tiêu chuẩn token, các trường hợp sử dụng và cho vay thế chấp bằng NFT.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=Xdkkux6OxfM) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Có thể thay thế và không thể thay thế (0:00) {#fungible-vs-non-fungible-000}

Hãy bắt đầu với từ "có thể thay thế" (fungible). Có thể thay thế có nghĩa là các đơn vị riêng lẻ của một tài sản có thể hoán đổi cho nhau và không thể phân biệt được với nhau. Một ví dụ điển hình về tài sản có thể thay thế là tiền tệ. Một tờ năm đô la luôn có giá trị bằng với bất kỳ tờ năm đô la nào khác. Bạn không thực sự quan tâm mình nhận được tờ năm đô la cụ thể nào vì tất cả chúng đều có giá trị như nhau.

Tuy nhiên, khi nói đến các tài sản không thể thay thế, mỗi đơn vị là duy nhất và không thể bị thay thế trực tiếp bằng một đơn vị khác. Một ví dụ điển hình là vé máy bay. Mặc dù vé máy bay có thể trông giống nhau, nhưng mỗi vé mang một tên hành khách, điểm đến, thời gian khởi hành và số ghế khác nhau. Việc cố gắng hoán đổi một vé máy bay này cho một vé máy bay khác có thể dẫn đến một số vấn đề nghiêm trọng.

Một ví dụ khác là thẻ giao dịch (trading cards). Mặc dù chúng có thể trông giống nhau, nhưng mỗi thẻ có các thuộc tính khác nhau. Các yếu tố như năm sản xuất hoặc cách bảo quản thẻ có thể tạo ra sự khác biệt. Một ví dụ cực đoan về một thứ không thể thay thế là một tác phẩm nghệ thuật — ví dụ, một bức tranh thường chỉ được tạo ra dưới dạng một bản gốc duy nhất.

#### Các thuộc tính của NFT (2:13) {#properties-of-nfts-213}

Bây giờ chúng ta đã biết "không thể thay thế" có nghĩa là gì, hãy cùng xem xét các thuộc tính phổ biến nhất của NFT.

- **Độc nhất** — mỗi NFT có các thuộc tính khác nhau thường được lưu trữ trong siêu dữ liệu của token
- **Sự khan hiếm có thể chứng minh** — thường có một số lượng giới hạn các NFT, với một ví dụ cực đoan là chỉ có một bản sao duy nhất; số lượng token có thể được xác minh trên Chuỗi khối
- **Không thể chia nhỏ** — hầu hết các NFT không thể được chia thành các mệnh giá nhỏ hơn, vì vậy bạn không thể mua hoặc chuyển một phần NFT của mình

Tương tự như các token tiêu chuẩn, NFT cũng đảm bảo quyền sở hữu tài sản, dễ dàng chuyển nhượng và chống gian lận.

#### Các tiêu chuẩn token: ERC-20, ERC-721 và ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Mặc dù NFT có thể được triển khai trên bất kỳ Chuỗi khối nào hỗ trợ lập trình hợp đồng thông minh, các tiêu chuẩn đáng chú ý nhất là ERC-721 và ERC-1155 trên Ethereum. Trước khi chúng ta đi sâu vào các tiêu chuẩn NFT, hãy tóm tắt nhanh về ERC-20, vì nó sẽ hữu ích cho việc so sánh.

**ERC-20** là một tiêu chuẩn nổi tiếng để tạo token trên Chuỗi khối Ethereum. Các ví dụ bao gồm các stablecoin như USDT hoặc DAI, và các token DeFi như LEND, YFI, SNX và UNI. ERC-20 cho phép tạo ra các token có thể thay thế — tất cả các token được tạo theo tiêu chuẩn này hoàn toàn không thể phân biệt được. Không quan trọng việc bạn nhận USDT từ một người bạn hay từ một sàn giao dịch; giá trị của mỗi token là như nhau.

**ERC-721** là tiêu chuẩn để tạo các token không thể thay thế. Nó cho phép tạo ra các hợp đồng sản xuất các token có thể phân biệt được với các thuộc tính khác nhau. Một ví dụ phổ biến là CryptoKitties nổi tiếng — một trò chơi cho phép thu thập và nhân giống những chú mèo con ảo.

**ERC-1155** là bước tiếp theo trong việc tạo token không thể thay thế. Tiêu chuẩn này cho phép tạo ra các hợp đồng hỗ trợ cả token có thể thay thế và không thể thay thế. Nó được tạo ra bởi Enjin, một dự án tập trung vào trò chơi dựa trên Chuỗi khối. Trong nhiều trò chơi như World of Warcraft, người chơi có thể giữ cả các vật phẩm không thể thay thế — kiếm, khiên, áo giáp — và các vật phẩm có thể thay thế như vàng hoặc mũi tên. ERC-1155 cho phép các nhà phát triển định nghĩa cả token có thể thay thế và không thể thay thế, đồng thời quyết định số lượng của mỗi loại nên tồn tại.

#### Các trường hợp sử dụng NFT (5:28) {#nft-use-cases-528}

Bên cạnh CryptoKitties, có một số trò chơi phổ biến khác tận dụng NFT, chẳng hạn như Gods Unchained và Decentraland. Decentraland là một ví dụ thú vị vì người chơi có thể mua các mảnh đất kỹ thuật số mà sau này có thể được bán lại hoặc thậm chí được sử dụng làm không gian quảng cáo trong trò chơi.

Các ví dụ khác bao gồm các thị trường nghệ thuật kỹ thuật số, chẳng hạn như Rarible và SuperRare, và thậm chí cả các công cụ tổng hợp thị trường như OpenSea. Một ví dụ khác về một thứ khan hiếm có thể được đại diện dưới dạng NFT là tên miền — ví dụ: Ethereum Name Service với đuôi .eth và Unstoppable Domains với đuôi .crypto.

Một số NFT có thể cực kỳ đắt đỏ. CryptoKitty đắt nhất, Dragon, đã được bán với giá 600 ETH vào cuối năm 2017 — trị giá khoảng một trăm bảy mươi nghìn đô la vào thời điểm đó. Các tên miền khan hiếm như exchange.eth có thể trị giá lên tới hơn năm trăm nghìn đô la.

#### NFT như tài sản thế chấp trong DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Khi nói đến DeFi, NFT có thể mở khóa nhiều tiềm năng hơn nữa cho tài chính phi tập trung. Hiện tại, phần lớn các giao thức cho vay DeFi đều được thế chấp. Một trong những ý tưởng thú vị nhất là sử dụng NFT làm tài sản thế chấp. Điều này có nghĩa là bạn có thể cung cấp một NFT đại diện cho một tác phẩm nghệ thuật, đất kỹ thuật số hoặc thậm chí là bất động sản được token hóa làm tài sản thế chấp, và vay tiền dựa trên nó.

Điều này nghe có vẻ hứa hẹn, nhưng có một vấn đề. Trong các nền tảng cho vay và vay mượn DeFi tiêu chuẩn như Compound hoặc Aave, giá trị của tài sản thế chấp được cung cấp có thể dễ dàng được đo lường bằng cách tích hợp các oracle giá. Chúng tổng hợp giá từ nhiều nguồn có Thanh khoản, chẳng hạn như các sàn giao dịch tập trung và phi tập trung. Khi nói đến NFT, thị trường cho các token cụ thể thường rất kém Thanh khoản, điều này làm cho quá trình khám phá giá trở nên phức tạp.

Để hiểu rõ hơn về vấn đề này, hãy tưởng tượng ai đó mua một CryptoKitty hiếm với giá 10 ETH. NFT này sau đó được sử dụng làm tài sản thế chấp, và người vay rút ra 1.700 DAI — giả sử rằng 10 ETH trị giá 3.500 đô la và NFT cụ thể này có tỷ lệ cho vay trên giá trị (loan-to-value ratio) là 50%. Sau đó, nếu không có ai khác sẵn sàng mua CryptoKitty cụ thể này, thị trường cho NFT này sẽ kém Thanh khoản hoặc thậm chí không tồn tại. Giả định duy nhất là NFT vẫn có giá trị bằng với số tiền nó được bán lần cuối — đây không phải là một giả định an toàn, vì giá trị của NFT có thể thay đổi khá đáng kể.

Đây là lý do tại sao một số dự án cung cấp các khoản vay thế chấp bằng NFT sử dụng một mô hình hơi khác: các khoản vay ngang hàng. Trong mô hình thị trường này, người vay có thể cung cấp NFT của họ làm tài sản thế chấp, và người cho vay có thể chọn NFT nào họ sẵn sàng chấp nhận trước khi khởi tạo một khoản vay. NFT được sử dụng làm tài sản thế chấp được giữ trong một hợp đồng ký quỹ (escrow contract), và nếu người vay vỡ nợ do không hoàn trả số tiền đã vay cộng với tiền lãi đúng hạn, NFT sẽ được chuyển cho người cho vay. Không gian này còn mới, nhưng một trong những công ty sử dụng mô hình này là NFTfi.

#### NFT như các sản phẩm tài chính (9:32) {#nfts-as-financial-products-932}

Bên cạnh việc được sử dụng làm tài sản thế chấp, NFT cũng có thể đại diện cho các sản phẩm tài chính phức tạp hơn như bảo hiểm, trái phiếu hoặc quyền chọn. Yinsure từ Yearn Finance là một ví dụ điển hình về việc sử dụng NFT trong không gian bảo hiểm. Trong Yinsure, mỗi hợp đồng bảo hiểm được đại diện dưới dạng một NFT cũng có thể được giao dịch trên thị trường thứ cấp như Rarible.

Gần đây, chúng ta cũng bắt đầu thấy các khái niệm gốc của DeFi như khai thác Thanh khoản được sử dụng bởi các dự án NFT. Ví dụ, Rarible đã bắt đầu thưởng cho người dùng của mình bằng các token Quản trị RARI cho việc tạo, mua và bán NFT trên nền tảng của họ.

#### Thị trường NFT đang phát triển (10:30) {#the-growing-nft-market-1030}

Với hơn 100 triệu đô la giá trị NFT được giao dịch và 6 triệu đô la chỉ riêng trong tháng gần đây nhất, không gian NFT là một trong những ngách phát triển nhanh nhất trong tiền mã hóa. Nó có tiềm năng to lớn trải dài từ những chú mèo con kỹ thuật số đến các sản phẩm tài chính phức tạp.